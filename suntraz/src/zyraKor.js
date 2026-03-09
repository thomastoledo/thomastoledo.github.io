const DEFAULT_REVEAL_DURATION = 12000;

export function startZyraKorReveal({ container = document.body, duration = DEFAULT_REVEAL_DURATION } = {}) {
    return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        canvas.className = "zyra-kor-canvas";
        container.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            resolve();
            return;
        }

        let width = 0;
        let height = 0;
        let segments = [];
        const startTime = performance.now();

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = Math.max(1, window.innerWidth);
            height = Math.max(1, window.innerHeight);

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            segments = buildCitadelSegments(width, height);
        };

        const draw = (timestamp) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(1, elapsed / duration);

            renderFrame(ctx, width, height, segments, progress);

            if (progress >= 1) {
                window.removeEventListener("resize", resize);
                resolve();
                return;
            }

            window.requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener("resize", resize);
        window.requestAnimationFrame(draw);
    });
}

function renderFrame(ctx, width, height, segments, progress) {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
    ctx.fillRect(0, 0, width, height);

    drawAmbientNoise(ctx, width, height, progress);
    drawCitadelLines(ctx, segments, progress);
    drawGlitchBands(ctx, width, height, progress);
}

function drawAmbientNoise(ctx, width, height, progress) {
    const particles = Math.floor(22 + progress * 42);
    for (let i = 0; i < particles; i += 1) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() < 0.8 ? 1 : 2;
        const alpha = 0.015 + Math.random() * 0.05;
        ctx.fillStyle = `rgba(225, 225, 225, ${alpha.toFixed(3)})`;
        ctx.fillRect(x, y, size, 1);
    }
}

function drawCitadelLines(ctx, segments, progress) {
    const visible = segments.length * progress;
    const fullCount = Math.floor(visible);
    const partial = visible - fullCount;

    ctx.lineCap = "square";

    for (let i = 0; i < fullCount; i += 1) {
        drawSegment(ctx, segments[i], 1);
    }

    if (segments[fullCount]) {
        drawSegment(ctx, segments[fullCount], partial);
    }

    if (progress > 0.7) {
        const ghostAlpha = (progress - 0.7) * 0.08;
        ctx.strokeStyle = `rgba(230, 230, 230, ${ghostAlpha.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(segments[0].x1, segments[0].y1);
        for (let i = 1; i < segments.length; i += 6) {
            ctx.lineTo(segments[i].x2, segments[i].y2);
        }
        ctx.stroke();
    }
}

function drawSegment(ctx, segment, amount) {
    if (amount <= 0) {
        return;
    }

    const x2 = segment.x1 + (segment.x2 - segment.x1) * amount;
    const y2 = segment.y1 + (segment.y2 - segment.y1) * amount;
    const alpha = segment.alpha * (0.76 + Math.random() * 0.24);

    ctx.strokeStyle = `rgba(216, 216, 216, ${alpha.toFixed(3)})`;
    ctx.lineWidth = segment.weight;
    ctx.beginPath();
    ctx.moveTo(segment.x1, segment.y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawGlitchBands(ctx, width, height, progress) {
    const bandChance = 0.14 + progress * 0.12;

    if (Math.random() > bandChance) {
        return;
    }

    const bands = 2 + Math.floor(Math.random() * 4);
    for (let i = 0; i < bands; i += 1) {
        const y = Math.random() * height;
        const h = 1 + Math.random() * 3;
        const alpha = 0.03 + Math.random() * 0.12;
        const shift = (Math.random() - 0.5) * 14;

        ctx.fillStyle = `rgba(235, 235, 235, ${alpha.toFixed(3)})`;
        ctx.fillRect(0, y, width, h);

        ctx.globalAlpha = alpha * 0.8;
        ctx.drawImage(
            ctx.canvas,
            0,
            y,
            width,
            h,
            shift,
            y,
            width,
            h
        );
        ctx.globalAlpha = 1;
    }
}

function buildCitadelSegments(width, height) {
    const cx = width * 0.5;
    const horizon = height * 0.8;
    const unit = Math.min(width, height) * 0.08;
    const segments = [];

    const add = (x1, y1, x2, y2, weight = 1, alpha = 0.3) => {
        segments.push({ x1, y1, x2, y2, weight, alpha });
    };

    const towers = [
        { x: cx - unit * 3.8, w: unit * 0.9, h: unit * 3.4, skew: -unit * 0.2 },
        { x: cx - unit * 2.2, w: unit * 1.0, h: unit * 4.3, skew: -unit * 0.12 },
        { x: cx - unit * 0.7, w: unit * 1.2, h: unit * 5.7, skew: -unit * 0.08 },
        { x: cx + unit * 1.0, w: unit * 1.15, h: unit * 5.1, skew: unit * 0.1 },
        { x: cx + unit * 2.9, w: unit * 0.95, h: unit * 3.8, skew: unit * 0.2 }
    ];

    towers.forEach((tower, index) => {
        const left = tower.x - tower.w / 2;
        const right = tower.x + tower.w / 2;
        const top = horizon - tower.h;
        const skewTopLeft = left + tower.skew;
        const skewTopRight = right + tower.skew;

        add(left, horizon, right, horizon, 1.3, 0.33);
        add(left, horizon, skewTopLeft, top, 1.15, 0.36);
        add(right, horizon, skewTopRight, top, 1.15, 0.36);
        add(skewTopLeft, top, skewTopRight, top, 1.1, 0.38);

        add((left + right) / 2, horizon, (skewTopLeft + skewTopRight) / 2, top, 0.9, 0.31);

        const braceCount = 4;
        for (let i = 1; i <= braceCount; i += 1) {
            const t = i / (braceCount + 1);
            const y = horizon - tower.h * t;
            const skew = tower.skew * t;
            add(left + skew, y, right + skew, y, 0.85, 0.26);
        }

        const spireY = top - unit * (0.65 + index * 0.08);
        add((skewTopLeft + skewTopRight) / 2, top, tower.x + tower.skew * 1.15, spireY, 1.05, 0.4);
        add(tower.x + tower.skew * 1.15, spireY, tower.x + tower.skew * 1.15 + unit * 0.12, spireY + unit * 0.32, 0.8, 0.31);
        add(tower.x + tower.skew * 1.15, spireY, tower.x + tower.skew * 1.15 - unit * 0.12, spireY + unit * 0.32, 0.8, 0.31);
    });

    const bridgeY = horizon - unit * 2.8;
    add(cx - unit * 3.1, bridgeY + unit * 0.25, cx + unit * 2.3, bridgeY - unit * 0.45, 1.05, 0.34);
    add(cx - unit * 2.5, bridgeY + unit * 0.75, cx + unit * 3.0, bridgeY + unit * 0.05, 0.95, 0.3);
    add(cx - unit * 1.7, bridgeY + unit * 1.05, cx + unit * 1.9, bridgeY - unit * 0.6, 0.9, 0.28);

    const baseDepth = unit * 2.6;
    add(cx - unit * 5.1, horizon + unit * 0.55, cx + unit * 5.0, horizon + unit * 0.55, 1.2, 0.26);
    add(cx - unit * 4.6, horizon + unit * 1.2, cx + unit * 4.4, horizon + unit * 1.2, 1.2, 0.24);
    add(cx - unit * 3.9, horizon + unit * 1.75, cx + unit * 3.8, horizon + unit * 1.75, 1.1, 0.22);

    for (let i = 0; i < 8; i += 1) {
        const t = i / 7;
        const xLeft = cx - unit * (5 - t * 1.8);
        const xRight = cx + unit * (4.9 - t * 1.6);
        const y = horizon + unit * 0.56 + t * baseDepth;
        add(xLeft, y, xLeft + unit * 0.45, y + unit * 0.68, 0.85, 0.2);
        add(xRight, y, xRight - unit * 0.4, y + unit * 0.68, 0.85, 0.2);
    }

    const floating = [
        { x: cx - unit * 1.2, y: horizon - unit * 5.9 },
        { x: cx + unit * 2.1, y: horizon - unit * 4.9 }
    ];
    floating.forEach((node, idx) => {
        const size = unit * (0.75 - idx * 0.12);
        add(node.x - size, node.y, node.x + size, node.y, 0.9, 0.24);
        add(node.x - size, node.y, node.x, node.y + size * 0.85, 0.85, 0.24);
        add(node.x + size, node.y, node.x, node.y + size * 0.85, 0.85, 0.24);
        add(node.x, node.y + size * 0.85, cx + unit * (idx === 0 ? -0.9 : 1.0), horizon - unit * 4.5, 0.8, 0.19);
    });

    return segments;
}
