---
layout: post
title:  "Exercices Transitions et Animations en CSS"
date:   2021-03-24 12:15:11 +0200
categories: [cours, 1A, css]
---
# Exercices Animations et Transitions

Voici plusieurs exercices pour vous entraîner avec les animations et les transitions en CSS.

## Exercice I
Sur le [CodePen suivant](https://codepen.io/nugetchar/pen/GRNVxPp), faites en sorte qu'au passage de la souris sur la Lune au centre de la page, cette dernière : 

- aie une largeur et une hauteur de `300px` ;
- la taille de la police d'écriture soit de `2em` ;
- ces deux changements s'appliquent avec une `transition` de `300ms` avec la [timing function](https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function) suivante : `cubic-bezier(.26,-0.23,.26,1.75)`.

**Correction [ici](https://codepen.io/nugetchar/pen/GRrEPQz)**

## Exercice II
Sur le [CodePen suivant](https://codepen.io/nugetchar/pen/eYgZeQX), faites en sorte qu'au clic sur sur le bouton central, l'animation suivante se lance :

- le bouton effectue une [rotation](https://developer.mozilla.org/fr/docs/Web/CSS/transform-function/rotate%28%29) de `180` degrés puis qui revient à sa position d'origine ;
- cette rotation + retour s'effectuent avec une [`animation`](https://developer.mozilla.org/fr/docs/Web/CSS/animation) de `1s` avec la [timing function](https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function) suivante : `cubic-bezier(.26,-0.23,.26,1.75)`.
    - à `50%` de l'animation, le bouton est tourné de 180 degrés ;
    - à `100%` de l'animation, le bouton est revenu à 0 degrés.

**Correction [ici](https://codepen.io/nugetchar/pen/gOgRZjy)**

## Exercice III
Pour cet exercice, allez sur le [CodePen suivant](https://codepen.io/nugetchar/pen/eYgZwyL).

Le but est, au clic sur le bouton central : 

- de faire effectuer une **rotation à 360 degrés** de ce dernier ;
- la rotation doit s'effectuer à l'aide d'une animation ;
- l'animation doit durer **1.5s** ;
- l'animation doit suivre la [timing function](https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function) suivante : `cubic-bezier(.26,-0.23,.26,1.75)` ;
- le bouton doit également passer de la couleur `#387c6d` à la couleur `#343f56` grâce à une `transition`, de durée **1.5s** et avec la *timing-function* `ease` ;
- les deux parties doivent "s'ouvrir"
    - cela doit se faire via des transitions ;
    - chaque transition doit durer **2s** ;
    - chaque transition doit se lancer après un [délai](https://developer.mozilla.org/fr/docs/Web/CSS/animation-delay) de **1.5s** ;
    - chaque transition doit suivre la *timing-function* `ease` ;

**Correction [ici](https://codepen.io/nugetchar/pen/jOywXeW)**