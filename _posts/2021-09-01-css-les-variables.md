---
layout: post
title: "Cours Développement Frontend - Les variables en CSS"
date: 2022-03-01 12:26:11 +0200
categories: [cours, 1A, frontend]
---
# CSS - Les variables
Depuis le début de l'année, nous écrivons notre CSS en donnant des valeurs qui, parfois, peuvent sembler arbitraires.

L'un des cas qui revient le plus souvent est le suivant :

```html
<header>...</header>
<main>...</main>
```

```css
header {
	height: 50px;
}

main {
	min-height: calc(100vh - 50px);
}
```

Ici, on donne au `main` une hauteur minimale, calculée de sorte à ce que le `main` ne déborde pas de l'écran, à moins d'avoir beaucoup de contenu à l'intérieur.
L'inconvénient d'une telle notation est que, si jamais on décide de changer la hauteur du `header`, alors il faudra également changer la valeur `50px` située dans la fonction `calc`.

De même, admettons que nous ayons un site avec plusieurs pages : pour une cohérence UI, on aura souvent des valeurs pour les marges (internes et externes), les couleurs ou encore les textes qui seront les mêmes selon les composants.

De la documentation sur les variables CSS peut être trouvée ici : [https://developer.mozilla.org/fr/docs/Web/CSS/Using_CSS_custom_properties](https://developer.mozilla.org/fr/docs/Web/CSS/Using_CSS_custom_properties).

Nous allons maintenant voir la syntaxe, et comment réorganiser notre code autour des variables CSS pour plus de maintenabilité et de lisibilité.

## La syntaxe
La syntaxe la plus rencontrée est la suivante :

```css
:root {
	--ma-variable: uneValeur;
}
```

Exemple :

```css
:root {
	--header-height: 50px;
	--main-min-height: calc(100vh - var(--header-height));
}
```

Vous remarquez deux choses :

- pour utiliser ma variable `header-height`, j'ai dû écrire `var(--header-height)` ;
- désormais, si je veux changer la hauteur du `header`, je n'ai plus qu'à modifier la valeur **à un seul endroit**, et les changements seront automatiquement répercutés.

Le code montré au début du cours deviendra donc :

```css
:root {
	--header-height: 50px;
	--main-min-height: calc(100vh - var(--header-height));
}

header {
	height: var(--header-height);
}

main {
	min-height: var(--main-min-height);
}
```

## Exercice

Allez dans le CodePen suivant, et regroupez le plus possible les valeurs qui se répètent sous la forme de variables : [https://codepen.io/nugetchar/pen/xxPoWYr](https://codepen.io/nugetchar/pen/xxPoWYr).

### Commencez par les marges !
Très souvent, on retrouve des valeurs, pour les marges, étant des multiples de `8`. Commencez donc par créer une variable, que vous appellerez `--base-unit`, et donnez-lui la valeur `8px`.

Puis créez ensuite trois autres variables :
- `--margin`, qui est égale à `--base-unit` ;
- `--padding`, qui est égale à `--base-unit` ;
- `--padding-2X`, qui est égale à `2 * --base-unit`.

Ensuite, partout où vous voyez des `margin` et  `padding` portant les valeurs `8px` et `16px`, utilisez la bonne variable parmi les trois précédentes.

### Ensuite, les couleurs

Il y a six couleurs :
- `white` ;
- `rgb(225, 230, 235)` (un gris léger) ;
- `#838383` (un gris moyen) ;
- `#3a3a44` (un gris foncé) ;
- `#111111` (un noir léger) ;
- `black`.

Déclarez une variable pour chaque couleur, en leur donnant chacune le nom que vous voulez, et utilisez ensuite les variables aux bons endroits dans le CSS.

### Les largeurs min et max
Dans le CSS, sont utilisées une largeur max de `900px` et une largeur min de `320px`. Déclarez une variable pour chacune de ces valeurs et utilisez-les.

### La hauteur du `header` et du `main`
- la hauteur du `header` est de `100px` : faites-en une variable ;
- la hauteur minimale du `main` est de `100vh - 100px` : faites-en une variable en utilisant celle créée juste avant pour le `header` ;

### Les autres variables possibles
Il peut être également pertinent de faire une variable pour la hauteur de la barre de recherche, ainsi qu'une variable pour la taille d'écriture.

