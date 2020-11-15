---
layout: post
title: "HTML/CSS - Mettre en forme du texte"
date: 2020-10-24 15:00:00 +0200
categories: [html, css]
---

# Mettre en forme du texte

Nous allons voir ici, au travers d'exercices, comment mettre en forme du texte.

## Distinction entre propriétés CSS de police et propriétés CSS de texte
Il va falloir distinguer les propriétés CSS qui agissent sur la police d'un texte (le type de police, sa "graisse", si elle est italique, soulignée) et les propriétés CSS qui agissent sur le texte en lui-même (s'il est centré, justifié, les espaces entre les mots, entre les lignes...).

## Propriétés CSS de police
Il y en a plusieurs, mais les principales qui vont nous intéresser aujourd'hui sont les suivantes :

- [`font-family`](https://developer.mozilla.org/fr/docs/Web/CSS/font-family) : spécifie la police à utiliser ;
- [`font-size`](https://developer.mozilla.org/fr/docs/Web/CSS/font-size) : spécifie la taille du texte ;
- [`font-style`](https://developer.mozilla.org/fr/docs/Web/CSS/font-style) : spécifie s'il faut afficher la version normale, italique ou bien oblique de la police courante ;
- [`font-weight`](https://developer.mozilla.org/fr/docs/Web/CSS/font-weight) : spécifie la graisse du texte ;
- [`line-height`](https://developer.mozilla.org/fr/docs/Web/CSS/line-height) : spécifie la hauteur de ligne d'un texte.

### Exercices - `font-family`
La propriété `font-family` s'utilise comme suit :

```css
font-family: "Open Sans";
```

Par exemple, si je veux que tout mon site utilise la police "Open Sans", alors il suffira que j'applique `font-family` au `body` :

```css
body {
    font-family: "Open Sans";
}
```
#### Exercice 1
Dans le CodePen suivant, appliquez la police `"'Xanh Mono', monospace"` à la section d'id `maSection` : [https://codepen.io/nugetchar/pen/eYzxXmJ](https://codepen.io/nugetchar/pen/eYzxXmJ).

#### Exercice 2
Dans le CodePen suivant, appliquez désormais la police `"'Xanh Mono', monospace"` uniquement aux éléments de texte ayant la classe `specialText` : [https://codepen.io/nugetchar/pen/wvWNOWO](https://codepen.io/nugetchar/pen/wvWNOWO).

### Exercices - `font-size`
La propriété `font-size` s'utilise comme suit :

```css
/* 
    on peut utiliser des px, des %, des em, rem... 
    nous verrons ces unités plus tard.
*/
font-size: 12px;
```
Par exemple, si je veux spécifier une taille pour mes titres `h1` :

```css
h1 {
    /* c'est gros */
    font-size: 72px;
}
```

#### Exercice 1
Dans le CodePen suivant, spécifiez les tailles de texte suivantes :

- `14px` pour tout le `body` ;
- `48px` pour le `h1` ;
- `28px` pour les `h2` ;
- `20px` pour les `h3` ;
- `16px` pour les `h4` ; 

[https://codepen.io/nugetchar/pen/gOMqEzy](https://codepen.io/nugetchar/pen/gOMqEzy)

#### Exercice 2
Dans le CodePen suivant, affectez les tailles de texte suivantes :

- `14px` pour tout le `body` ;
- `3em` pour le `h1` ;
- `2em` pour les `h2` ;
- `2rem` pour les `h3` ;
- `1.2rem` pour les `h4` ;

[https://codepen.io/nugetchar/pen/dyXaLMr](https://codepen.io/nugetchar/pen/dyXaLMr)


### Exercices - `font-style` et `font-weight`

Les propriétés `font-style` et `font-weight` s'utilisent comme suit :

```css
font-style: normal | italic | oblique;
font-weight: 100 | 200 | ... | 900 | bold | bolder | lighter | normal;
```

Pour `font-style` : `italic` et `oblique` peuvent avoir le même comportement, sauf si la police utilisée possède une version dite `oblique`, auquel cas il sera possible de spécifier l'angle d'inclinaison.

<br/>

Pour `font-weight`, les valeurs `100` à `900` peuvent ne montrer aucune différence, par exemple entre `200` et `300`, si la police utilisée ne propose pas toutes les variations de graisse possible.
De plus : `normal` équivaut au niveau `400` et `bold` au niveau `700`.

Plus d'info : [`font-weight` sur MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight).

#### Exercice
Dans le CodePen suivant, on utilise une police ayant quelques variations pour `oblique`.

Affectez les styles et graisses suivantes :

- `italic` pour les éléments de classe `italic` ;
- `oblique 30deg` (oblique avec une orientation de 30degrés) pour les éléments de classe `oblique-30deg` ;
- `oblique 20deg` pour les éléments de classe `oblique-20deg` ;
- une graisse de `100` pour les éléments de classe `weight-100` ;
- une graisse de `800` pour les éléments de classe `weight-800` ;
- une graisse `bolder` pour les éléments de classe `weight-bolder` ;
- une graisse `lighter` pour les éléments de classe `weight-lighter`.

[https://codepen.io/nugetchar/pen/GRqzaZm](https://codepen.io/nugetchar/pen/GRqzaZm).


### Exercices - `line-height`
La propriété `line-height` s'utilise comme suit :

```css
line-height: 150% ;
line-height: 2 ;
line-height: 3em ;
line-height: 30px ;
```

Dans le CodePen suivant, spécifiez les hauteurs de lignes suivantes :

- `20px` pour la classe `line-height-20px` ;
- `2` pour la classe `line-height-2` ;
- `3em` pour la classe `line-height-3em` ;
- `1000%` pour la classe `line-height-1000-percent`.

[https://codepen.io/nugetchar/pen/MWeLdBM](https://codepen.io/nugetchar/pen/MWeLdBM)


## Propriétés CSS de texte
Les propriétés CSS pour manipuler du texte dans son ensemble et qui vont nous intéresser aujourd'hui sont listées sur cette page : [propriétés CSS Text](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Text).

### Souligner du texte
Outre la balise `<u></u>` connue pour permettre de souligner du texte, il existe la propriété CSS [`text-decoration`](https://developer.mozilla.org/fr/docs/Web/CSS/text-decoration) qui offre plus de fonctionnalités.

Elle s'utilise comme suit :

```css
text-decoration: underline dotted black;
```

Dans le CodePen suivant, et suivez les instructions décrites dans le HTML : [https://codepen.io/nugetchar/pen/yLJwBLx](https://codepen.io/nugetchar/pen/yLJwBLx).

### Alignement du texte

La propriété CSS `text-align` indique l'alignement d'un texte. Ses principales valeurs possibles sont `left` (défaut), `center`, `right` et `justify`. Cette dernière indique que chaque ligne de texte doit prendre la largeur disponible. Attention également : du texte justifié peut rendre la lecture difficile à certaines personnes, atteintes par exemple de dyslexie ou de troubles cognitifs.

#### Exercice
Sur le CodePen suivant, rendez le deuxième paragraphe aligné à droite, le troisième centré et le quatrième justifié.

[https://codepen.io/nugetchar/pen/QWEYXjX](https://codepen.io/nugetchar/pen/QWEYXjX)

### Indentation du texte
L'indentation du texte se fait avec la propriété `text-indent`. Elle définit l'espacement du texte par rapport à la gauche.
Elle s'utilise comme suit :

```css
text-indent: 20% | 12px | -2em;
```

Il est possible de rajouter des mots-clefs, comme expliqué sur [la documentation MDN](https://developer.mozilla.org/fr/docs/Web/CSS/text-indent).

#### Exercice
Sur le CodePen suivant, appliquez les styles de textes suivants :

- indentation de `10%` pour la classe `indent-10pc` ;
- indentation de `15px` pour la classe `indent-15px` ;
- indentation de `4em` pour la classe `indent-4em` ;
- indentation de `-12px` pour la classe `indent--12px`.

[https://codepen.io/nugetchar/pen/QWEYXzy](https://codepen.io/nugetchar/pen/QWEYXzy)


### Transformation du texte et tabulation
On peut utiliser la propriété `text-transform` pour transformer du texte : mise en majuscule, en minuscules, juste la première lettre de chaque mot en capitale... Sa documentation se trouve ici : [`text-transform` sur MDN](https://developer.mozilla.org/fr/docs/Web/CSS/text-transform).
D'autre part, avec la propriété `tab-size`, on peut formater du texte pour spécifier la taille, en terme de caractères "espace", d'une tabulation. Cette propriété sera par exemple très utile pour formater du code sur une page web : [`tab-size` sur MDN](https://developer.mozilla.org/fr/docs/Web/CSS/tab-size).

#### Exercice - `text-transform`
Sur le CodePen suivant :

- mettez tous les titres en majuscule avec `text-transform` ;
- mettez le titre `h1` en `capitalize` ;
- faites en sorte que chaque lettre de début de chaque paragraphe ait une taille de `130%` et soit en majuscule.

[https://codepen.io/nugetchar/pen/mdEvNrb](https://codepen.io/nugetchar/pen/mdEvNrb)

#### Exercice - `tab-size`
Sur le CodePen suivant, affectez les tailles de tabulation suivantes :

- taille de `4` pour le premier bloc ;
- taille de `2` pour le deuxième bloc ;
- taille de `6` pour le troisième bloc.

Note : essayez d'appliquer les différents styles **sans** toucher au code HTML.
[https://codepen.io/nugetchar/pen/pobGMwW](https://codepen.io/nugetchar/pen/pobGMwW)

### Espacements entre les mots, césures et traitement des `white spaces`
D'autres propriétés CSS existent pour gérer le formatage d'un texte !

- [`overflow-wrap`](https://developer.mozilla.org/fr/docs/Web/CSS/overflow-wrap) est utilisée pour dire au navigateur s'il peut faire la césure à l'intérieur même d'un mot qui dépasserait de son conteneur ;
- [`word-break`](https://developer.mozilla.org/fr/docs/Web/CSS/word-break) est également utilisée pour spécifier le comportement à adopter en cas de césure (les différences entre les deux sont minimes) ;
- [`white-space`](https://developer.mozilla.org/fr/docs/Web/CSS/white-space) permet de gérer les blancs au sein d'un élément ;
- [`word-spacing`](https://developer.mozilla.org/fr/docs/Web/CSS/word-spacing) permet de gérer les espacements entre les mots.



## Exercice d'entraînement
Ecrivez votre CV ou bien un article de blog sur un sujet qui vous passionne, en HTML, et ajoutez-y un peu de style avec les balises vues tout au long des exercices. Pensez à garder une sémantique correcte dans votre HTML.