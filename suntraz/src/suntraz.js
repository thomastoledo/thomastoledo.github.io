import { startZyraKorReveal } from "./zyraKor.js";

const JUPITER_ENDPOINT = "/jupiter";
const ORBITAL_NOISE_PATH = "/orbital-noise";
const FRAVEN_PATH = "/fraven";
const HIDDEN_BRANCH_DELAY_MS = 108000;
const JUPITER_GROW_MS = 1000;
const JUPITER_VIEWPORT_RATIO = 0.28;
const JUPITER_SCENE_PADDING = 100;
const JUPITER_SIZE_MIN = 140;
const JUPITER_SIZE_MAX = 260;
const COSMOS_STAR_COUNT_MIN = 70;
const COSMOS_STAR_COUNT_MAX = 140;
const COSMOS_STAR_SIZE_MAX = 10;
const SATELLITE_BURST_INTERVAL_MS = 5000;
const SATELLITE_BURST_COUNT_MIN = 4;
const SATELLITE_BURST_COUNT_MAX = 10;
const SATELLITE_DURATION_MIN_MS = 9000;
const SATELLITE_DURATION_MAX_MS = 19000;
const MANTRA_TEXT = "Thra vel\u00ebn su naer";
let isCosmosRevealed = false;

const scene = document.getElementById("scene");

if (!scene) {
    throw new Error("Missing #scene mount");
}

const state = {
    primaryPosition: { x: 0, y: 0 },
    jupiterCenter: { x: 0, y: 0 },
    jupiterSize: 150,
    interactionStarted: false,
    jupiterFormed: false,
    jupiterShrunk: false,
    hiddenBranchTriggered: false,
    hiddenTimerId: null,
    buttonTimerId: null,
    cosmosVisible: false,
    satellitesStarted: false,
    satelliteBurstIntervalId: null,
    satelliteLaunchTimeoutIds: new Set(),
    activeSatellites: new Set()
};

window.suntrazExitMessage = null;

const cosmosLayer = document.createElement("div");
cosmosLayer.className = "cosmos-layer";
cosmosLayer.setAttribute("aria-hidden", "true");

const satelliteLayer = document.createElement("div");
satelliteLayer.className = "satellite-layer";
satelliteLayer.setAttribute("aria-hidden", "true");

const primaryStar = document.createElement("div");
primaryStar.className = "primary-star";

const citadelButton = document.createElement("button");
citadelButton.type = "button";
citadelButton.className = "citadel-button";
citadelButton.textContent = `Say "Hi" to Jupiter!`;

const betelgeuse = document.createElement("div");
betelgeuse.className = "betelgeuse";
betelgeuse.setAttribute("aria-hidden", "true");

scene.append(cosmosLayer, satelliteLayer, primaryStar, citadelButton);

initialize();

function initialize() {
    placePrimaryStarRandomly();
    scene.style.setProperty("--jupiter-transition-ms", `${JUPITER_GROW_MS}ms`);
    syncJupiterCssVars();
    state.hiddenTimerId = window.setTimeout(() => triggerHiddenBranch(), HIDDEN_BRANCH_DELAY_MS);

    window.addEventListener("resize", handleResize);
    primaryStar.addEventListener("mouseover", handlePrimaryStarMouseOver);
    primaryStar.addEventListener("mouseout", handlePrimaryStarMouseOut);
    citadelButton.addEventListener("mouseover", handleCitadelMouseOver);
    citadelButton.addEventListener("mouseout", handleCitadelMouseOut);
    citadelButton.addEventListener("click", handleCitadelClick);
    betelgeuse.addEventListener("click", () => {
        window.location.href = ORBITAL_NOISE_PATH;
    });
}

function handlePrimaryStarMouseOver() {
    if (state.hiddenBranchTriggered) {
        return;
    }

    if (!state.interactionStarted) {
        beginJupiterFormation();
        return;
    }

    if (state.jupiterFormed) {
        expandJupiter();
    }
}

function handlePrimaryStarMouseOut(event) {
    if (!state.jupiterFormed || state.hiddenBranchTriggered) {
        return;
    }

    if (isJupiterInteractionTarget(event.relatedTarget)) {
        return;
    }

    shrinkJupiter();
}

function handleCitadelMouseOver() {
    if (!state.jupiterFormed || state.hiddenBranchTriggered) {
        return;
    }

    expandJupiter();
}

function handleCitadelMouseOut(event) {
    if (!state.jupiterFormed || state.hiddenBranchTriggered) {
        return;
    }

    if (isJupiterInteractionTarget(event.relatedTarget)) {
        return;
    }

    shrinkJupiter();
}

function placePrimaryStarRandomly() {
    state.primaryPosition = {
        x: randomInt(0, Math.max(0, window.innerWidth - 1)),
        y: randomInt(0, Math.max(0, window.innerHeight - 1))
    };
    primaryStar.style.left = `${state.primaryPosition.x}px`;
    primaryStar.style.top = `${state.primaryPosition.y}px`;
}

function beginJupiterFormation() {
    if (state.interactionStarted || state.hiddenBranchTriggered) {
        return;
    }

    state.interactionStarted = true;
    cancelHiddenTimer();

    state.jupiterSize = getTargetJupiterSize();
    const width = window.innerWidth;
    const height = window.innerHeight;
    const bounds = getJupiterBounds(width, height, state.jupiterSize);

    state.jupiterCenter = {
        x: clamp(state.primaryPosition.x, bounds.xMin, bounds.xMax),
        y: clamp(state.primaryPosition.y, bounds.yMin, bounds.yMax)
    };

    syncJupiterCssVars();
    primaryStar.classList.add("jupiter");

    window.clearTimeout(state.buttonTimerId);
    state.buttonTimerId = window.setTimeout(() => {
        if (state.hiddenBranchTriggered) {
            return;
        }
        state.buttonTimerId = null;
        state.jupiterFormed = true;
        positionButton();
        citadelButton.classList.add("visible");
    }, JUPITER_GROW_MS);
}

function positionButton() {
    const y = state.jupiterCenter.y;
    citadelButton.style.left = `${state.jupiterCenter.x}px`;
    citadelButton.style.top = `${Math.round(y)}px`;
}

function handleCitadelClick() {
    if (state.hiddenBranchTriggered) {
        return;
    }

    cancelHiddenTimer();

    requestExitMessage();
}

async function requestExitMessage() {
    try {
        const response = await fetch(`https://orbital-noise-backend-1aa0a8498a3c.herokuapp.com${JUPITER_ENDPOINT}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        });

        if (hasCosmosHeader(response) && !isCosmosRevealed) {
            revealCosmos();
            spawnBetelgeuse();
            console.log(`Cosmos revealed, good job! Enjoy the view and the secret you found :)`);
            console.log(`Fun fact: Betelgeuse is actually a dead star, but its light is still traveling through space and can be seen from Earth. In a way, it's like a cosmic ghost! And ghost stars are pretty fitting for a hidden branch, don't you think?`);
            isCosmosRevealed = true;
        }

        const data = await readJsonResponse(response);
        if (data && typeof data.message === "string") {
            window.suntrazExitMessage = data.message;
        }
    } catch (error) {
        console.error("Suntraz /jupiter request failed:", error);
    }
}

function spawnBetelgeuse() {
    if (state.hiddenBranchTriggered) {
        return;
    }

    if (!betelgeuse.isConnected) {
        scene.appendChild(betelgeuse);
    }

    betelgeuse.classList.remove("discoverable", "gone");

    requestAnimationFrame(() => {
        betelgeuse.classList.add("active");
        if (state.jupiterShrunk) {
            betelgeuse.classList.add("discoverable");
        }
    });
}

function hasCosmosHeader(response) {
    const headerValue = response.headers.get("X-Cosmos");

    return typeof headerValue === "string" && headerValue.trim().toLowerCase() === "true";
}

async function readJsonResponse(response) {
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        return null;
    }

    try {
        return await response.json();
    } catch {
        return null;
    }
}

function revealCosmos() {
    if (state.hiddenBranchTriggered) {
        return;
    }

    if (!cosmosLayer.childElementCount) {
        renderCosmosStars();
    }

    state.cosmosVisible = true;
    cosmosLayer.classList.add("active");
    satelliteLayer.classList.add("active");
    startSatelliteTraffic();
}

function renderCosmosStars() {
    const fragment = document.createDocumentFragment();
    const width = window.innerWidth;
    const height = window.innerHeight;
    const viewportArea = width * height;
    const densityCount = Math.round(viewportArea / 18000);
    const starCount = clamp(densityCount, COSMOS_STAR_COUNT_MIN, COSMOS_STAR_COUNT_MAX);
    const palette = [
        { color: "rgba(255, 252, 246, 0.96)", glow: "rgba(255, 245, 222, 0.78)" },
        { color: "rgba(212, 232, 255, 0.94)", glow: "rgba(168, 204, 255, 0.74)" },
        { color: "rgba(255, 228, 207, 0.92)", glow: "rgba(255, 193, 145, 0.7)" }
    ];
    const rhythmClasses = ["rhythm-a", "rhythm-b", "rhythm-c"];

    for (let i = 0; i < starCount; i += 1) {
        const star = document.createElement("div");
        const size = randomInt(1, COSMOS_STAR_SIZE_MAX);
        const tone = palette[randomInt(0, palette.length - 1)];
        const dimOpacity = randomFloat(0.14, 0.52);
        const midOpacity = clamp(dimOpacity + randomFloat(0.06, 0.16), 0.2, 0.76);
        const peakOpacity = clamp(dimOpacity + randomFloat(0.2, 0.4), 0.28, 0.95);
        const glowNear = `${(size * randomFloat(1.8, 3.8)).toFixed(1)}px`;
        const glowFar = `${(size * randomFloat(4.5, 8.5)).toFixed(1)}px`;
        const glowInset = `${Math.ceil(size * randomFloat(1.4, 2.2))}px`;
        const rhythmClass = rhythmClasses[randomInt(0, rhythmClasses.length - 1)];

        star.className = `cosmos-star ${rhythmClass}`;
        star.style.left = `${randomFloat(0, width).toFixed(1)}px`;
        star.style.top = `${randomFloat(0, height).toFixed(1)}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty("--star-color", tone.color);
        star.style.setProperty("--star-glow-color", tone.glow);
        star.style.setProperty("--star-dim-opacity", dimOpacity.toFixed(2));
        star.style.setProperty("--star-mid-opacity", midOpacity.toFixed(2));
        star.style.setProperty("--star-peak-opacity", peakOpacity.toFixed(2));
        star.style.setProperty("--star-glow-dim-opacity", clamp(dimOpacity * 0.44, 0.06, 0.32).toFixed(2));
        star.style.setProperty("--star-glow-mid-opacity", clamp(midOpacity * 0.64, 0.14, 0.52).toFixed(2));
        star.style.setProperty("--star-glow-peak-opacity", clamp(peakOpacity * 0.92, 0.24, 0.88).toFixed(2));
        star.style.setProperty("--star-glow-near", glowNear);
        star.style.setProperty("--star-glow-far", glowFar);
        star.style.setProperty("--star-glow-inset", glowInset);
        star.style.setProperty("--star-duration", `${randomInt(1600, 5400)}ms`);
        star.style.setProperty("--star-delay", `${randomInt(-4800, 0)}ms`);
        fragment.appendChild(star);
    }

    cosmosLayer.replaceChildren(fragment);
}

function startSatelliteTraffic() {
    if (state.satellitesStarted) {
        return;
    }

    state.satellitesStarted = true;
    queueSatelliteBurst();
    state.satelliteBurstIntervalId = window.setInterval(queueSatelliteBurst, SATELLITE_BURST_INTERVAL_MS);
}

function stopSatelliteTraffic() {
    state.satellitesStarted = false;

    if (state.satelliteBurstIntervalId) {
        window.clearInterval(state.satelliteBurstIntervalId);
        state.satelliteBurstIntervalId = null;
    }

    state.satelliteLaunchTimeoutIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
    });
    state.satelliteLaunchTimeoutIds.clear();

    state.activeSatellites.forEach((satellite) => {
        if (satellite.frameId) {
            window.cancelAnimationFrame(satellite.frameId);
            satellite.frameId = null;
        }
        satellite.element.remove();
    });
    state.activeSatellites.clear();
    satelliteLayer.replaceChildren();
}

function queueSatelliteBurst() {
    if (!state.cosmosVisible || state.hiddenBranchTriggered || !state.satellitesStarted) {
        return;
    }

    const count = randomInt(SATELLITE_BURST_COUNT_MIN, SATELLITE_BURST_COUNT_MAX);
    const burstWindow = Math.max(0, SATELLITE_BURST_INTERVAL_MS - 400);

    for (let i = 0; i < count; i += 1) {
        const delayMs = randomInt(0, burstWindow);
        scheduleSatelliteLaunch(delayMs);
    }
}

function scheduleSatelliteLaunch(delayMs) {
    if (!state.cosmosVisible || state.hiddenBranchTriggered || !state.satellitesStarted) {
        return;
    }

    const timeoutId = window.setTimeout(() => {
        state.satelliteLaunchTimeoutIds.delete(timeoutId);

        if (!state.cosmosVisible || state.hiddenBranchTriggered || !state.satellitesStarted) {
            return;
        }

        launchSatellite();
    }, delayMs);

    state.satelliteLaunchTimeoutIds.add(timeoutId);
}

function launchSatellite() {
    if (!state.cosmosVisible || state.hiddenBranchTriggered || !state.satellitesStarted) {
        return;
    }

    const satellite = {
        element: document.createElement("div"),
        frameId: null
    };
    const path = createSatellitePath();
    const duration = randomInt(SATELLITE_DURATION_MIN_MS, SATELLITE_DURATION_MAX_MS);
    const size = randomInt(3, 8);
    const peakOpacity = randomFloat(0.62, 0.96);
    const glowNear = `${Math.round(size * randomFloat(1.8, 2.8))}px`;
    const glowFar = `${Math.round(size * randomFloat(3.5, 5.2))}px`;

    satellite.element.className = "satellite visible";
    satellite.element.style.width = `${size}px`;
    satellite.element.style.height = `${size}px`;
    satellite.element.style.setProperty("--satellite-glow-near", glowNear);
    satellite.element.style.setProperty("--satellite-glow-far", glowFar);
    satelliteLayer.appendChild(satellite.element);
    state.activeSatellites.add(satellite);

    const startTime = performance.now();

    const animate = (timestamp) => {
        if (!state.cosmosVisible || state.hiddenBranchTriggered || !state.satellitesStarted) {
            state.activeSatellites.delete(satellite);
            satellite.element.remove();
            satellite.frameId = null;
            return;
        }

        const progress = Math.min((timestamp - startTime) / duration, 1);
        const point = quadraticPoint(path.start, path.control, path.end, progress);
        const opacityEnvelope = Math.sin(Math.PI * progress);
        const opacity = peakOpacity * Math.pow(opacityEnvelope, 0.85);

        satellite.element.style.opacity = opacity.toFixed(2);
        satellite.element.style.transform = `translate3d(${point.x.toFixed(1)}px, ${point.y.toFixed(1)}px, 0)`;

        if (progress < 1) {
            satellite.frameId = window.requestAnimationFrame(animate);
            return;
        }

        satellite.frameId = null;
        state.activeSatellites.delete(satellite);
        satellite.element.remove();
    };

    satellite.frameId = window.requestAnimationFrame(animate);
}

function createSatellitePath() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const fromLeft = Math.random() >= 0.5;
    const edgeOffset = 80;
    const startY = randomFloat(height * 0.06, height * 0.58);
    const endY = clamp(
        startY + randomFloat(-height * 0.2, height * 0.2),
        height * 0.04,
        height * 0.74
    );

    return {
        start: {
            x: fromLeft ? -edgeOffset : width + edgeOffset,
            y: startY
        },
        control: {
            x: randomFloat(width * 0.2, width * 0.8),
            y: clamp(
                (startY + endY) / 2 + randomFloat(-height * 0.24, height * 0.24),
                height * 0.02,
                height * 0.82
            )
        },
        end: {
            x: fromLeft ? width + edgeOffset : -edgeOffset,
            y: endY
        }
    };
}

function quadraticPoint(start, control, end, progress) {
    const inverse = 1 - progress;
    return {
        x: inverse * inverse * start.x + 2 * inverse * progress * control.x + progress * progress * end.x,
        y: inverse * inverse * start.y + 2 * inverse * progress * control.y + progress * progress * end.y
    };
}

function isJupiterInteractionTarget(target) {
    return target === primaryStar || target === citadelButton;
}

function shrinkJupiter() {
    if (state.jupiterShrunk || state.hiddenBranchTriggered) {
        return;
    }

    state.jupiterShrunk = true;
    primaryStar.classList.add("shrunk");
    citadelButton.classList.remove("visible");
    betelgeuse.classList.add("discoverable");
}

function expandJupiter() {
    if (!state.jupiterShrunk || state.hiddenBranchTriggered) {
        return;
    }

    state.jupiterShrunk = false;
    primaryStar.classList.remove("shrunk");
    citadelButton.classList.add("visible");
    betelgeuse.classList.remove("discoverable");
}

function hideCosmos() {
    state.cosmosVisible = false;
    cosmosLayer.classList.remove("active");
    satelliteLayer.classList.remove("active");
    stopSatelliteTraffic();
}

async function triggerHiddenBranch() {
    if (state.hiddenBranchTriggered) {
        return;
    }

    state.hiddenBranchTriggered = true;
    cancelHiddenTimer();
    window.clearTimeout(state.buttonTimerId);
    hideCosmos();

    primaryStar.classList.add("gone");
    citadelButton.classList.remove("visible");
    betelgeuse.classList.add("gone");

    await runGlitchPrelude();
    await startZyraKorReveal({
        container: scene,
        duration: 12000
    });
    renderFravenElements();
}

function runGlitchPrelude() {
    return new Promise((resolve) => {
        const overlay = document.createElement("div");
        overlay.className = "glitch-overlay";
        scene.appendChild(overlay);

        const bars = [];
        for (let i = 0; i < 18; i += 1) {
            const bar = document.createElement("div");
            bar.className = "glitch-bar";
            overlay.appendChild(bar);
            bars.push(bar);
        }

        const randomizeBars = () => {
            bars.forEach((bar) => {
                const y = Math.random() * window.innerHeight;
                const alpha = 0.06 + Math.random() * 0.2;
                const stretch = 1 + Math.random() * 3;
                bar.style.top = `${Math.round(y)}px`;
                bar.style.opacity = alpha.toFixed(2);
                bar.style.transform = `scaleY(${stretch.toFixed(2)})`;
            });
        };

        randomizeBars();
        overlay.classList.add("active");
        const intervalId = window.setInterval(randomizeBars, 110);

        window.setTimeout(() => {
            window.clearInterval(intervalId);
            overlay.classList.remove("active");
            window.setTimeout(() => {
                overlay.remove();
                resolve();
            }, 300);
        }, 2500);
    });
}

function renderFravenElements() {
    const mantra = document.createElement("div");
    mantra.className = "mantra";
    mantra.textContent = MANTRA_TEXT;

    const fravenLink = document.createElement("a");
    fravenLink.className = "fraven-link";
    fravenLink.href = FRAVEN_PATH;
    fravenLink.textContent = "fraven";

    scene.append(mantra, fravenLink);

    requestAnimationFrame(() => {
        mantra.classList.add("visible");
        fravenLink.classList.add("visible");
    });
}

function handleResize() {
    if (state.hiddenBranchTriggered) {
        return;
    }

    if (!state.interactionStarted) {
        state.primaryPosition.x = clamp(state.primaryPosition.x, 0, Math.max(0, window.innerWidth - 1));
        state.primaryPosition.y = clamp(state.primaryPosition.y, 0, Math.max(0, window.innerHeight - 1));
        primaryStar.style.left = `${state.primaryPosition.x}px`;
        primaryStar.style.top = `${state.primaryPosition.y}px`;
        return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    state.jupiterSize = getTargetJupiterSize(width, height);
    const bounds = getJupiterBounds(width, height, state.jupiterSize);

    state.jupiterCenter.x = clamp(state.jupiterCenter.x, bounds.xMin, bounds.xMax);
    state.jupiterCenter.y = clamp(state.jupiterCenter.y, bounds.yMin, bounds.yMax);

    syncJupiterCssVars();
    positionButton();

    if (state.cosmosVisible) {
        renderCosmosStars();
        stopSatelliteTraffic();
        startSatelliteTraffic();
    }
}

function syncJupiterCssVars() {
    scene.style.setProperty("--jupiter-size", `${state.jupiterSize}px`);
    scene.style.setProperty("--jupiter-left", `${state.jupiterCenter.x}px`);
    scene.style.setProperty("--jupiter-top", `${state.jupiterCenter.y}px`);
}

function getTargetJupiterSize(width = window.innerWidth, height = window.innerHeight) {
    const targetSize = Math.round(Math.min(width, height) * JUPITER_VIEWPORT_RATIO);
    return clamp(targetSize, JUPITER_SIZE_MIN, JUPITER_SIZE_MAX);
}

function getJupiterBounds(width, height, size) {
    const half = size / 2;
    const xMin = half + JUPITER_SCENE_PADDING;
    const xMax = Math.max(xMin, width - half - JUPITER_SCENE_PADDING);
    const yMin = half + JUPITER_SCENE_PADDING;
    const yMax = Math.max(yMin, height - half - JUPITER_SCENE_PADDING);

    return { xMin, xMax, yMin, yMax };
}

function cancelHiddenTimer() {
    if (state.hiddenTimerId) {
        window.clearTimeout(state.hiddenTimerId);
        state.hiddenTimerId = null;
    }
}

function randomInt(min, max) {
    if (max <= min) {
        return min;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
    if (max <= min) {
        return min;
    }
    return Math.random() * (max - min) + min;
}

function clamp(value, min, max) {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}
