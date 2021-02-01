---
layout: post
title:  "Les positions en CSS - TP"
date:   2021-02-01 12:15:11 +0200
categories: [cours, 1A, css]
---

# Les positions en CSS
Le positionnement des éléments en CSS est souvent vu comme un casse-tête. Pourtant, une fois que l'on connaît les règles de positionnement et de superposition des éléments, l'utilisation des positions devient plus simple.

## Les différents types de positions
CSS propose aujourd'hui cinq types de positionnement :

-`static` (positionnement par défaut) ;
- `relative` ;
- `absolute` ;
- `fixed` ;
- `sticky` ;

### Le positionnement `static`
Il s'agit du <mark>positionnement par défaut</mark> ! Lorsqu'un élément n'a pas de positionnement spécifié, il est automatiquement mis en `position: static`. Mettre un élément en `position: static` indique que l'on souhaite qu'il soit géré automatiquement par le flux d'affichage du navigateur.

### Le positionnement `relative`
<mark>Le positionnement `relative` s'appelle ainsi car il permet d'appliquer des décalage sur un élément **relativement à sa position d'origine**.</mark>

Sur le [CodePen](https://codepen.io/nugetchar/pen/VwmwxmQ) suivant, un élément `#container` contient trois éléments, dont un portant un id `#relative` (le bloc en vert).
Sa position est définie sur `relative`, et un décalage de `10px` vers le haut et `50px` vers la droite lui a été appliqué.

Ainsi, comme il est positionné en `relative`, son décalage se fait **par rapport à sa position d'origine**.

### Le positionnement `absolute`
Le positionnement `absolute` va <mark>enlever l'élément de son emplacement par défaut</mark>. Comme il sera **en dehors du flux d'affichage par défaut**, les autres éléments prendront sa place.

Sur le [CodePen](https://codepen.io/nugetchar/pen/vYEevNZ) suivant, les éléments `tata`, `titi` et `toto` sont les uns à la suite des autres dans le HTML. Pourtant, dans l'affichage, comme `tata` est positionné en `absolute`, la place qu'il occupait n'existe plus et est prise par les éléments suivants.

De plus, un décalage `top: 100px` lui est affecté.
Or, en positions `absolute` et `fixed`, le décalage appliqué va suivre la règle suivante : l'élément sera décalé par rapport au **coin supérieur gauche** du **premier de ses éléments parents** qui aura une **position différente de `static`**.
Comme ici, aucun de ses parents n'a de position définie, <mark>son décalage se fera par rapport  au coin supérieur gauche de la fenêtre</mark>.

### Le positionnement `fixed`
Il fonctionne <mark>comme `absolute`</mark>, à la différence qu'un élément en position `fixed` sera <mark>indépendant du scroll</mark>.

Sur le [CodePen](https://codepen.io/nugetchar/pen/XWJVxrm) suivant, le deuxième élément est positionné en `fixed` : il est donc en-dehors du flux d'affichage par défaut, et est indépendant du scroll.

### Le positionnement `sticky`
Un élément positionné en `sticky` aura une <mark>position `relative` jusqu'à ce que le scroll le fasse atteindre un certain décalage : à ce moment, sa position devient `fixed`</mark> (mais sans être en-dehors du flux d'affichage).

Un exemple [ici](https://codepen.io/nugetchar/pen/dyPJgKe) : l'élément `titi` a une position `sticky` et un `top: 10px`. Tant qu'il ne se situe pas à `10px` du haut, il est `relative`, et dès qu'il atteint la limite, il devient indépendant du scroll.

## Exercice

### Pré-requis
Pour cet exercice, vous allez avoir besoin de vous créer un compte sur [CodePen](https://codepen.io/) ; ça aura l'avantage de vous faciliter certains petits rendus, et par la suite vous pourrez faire des tests sans avoir à créer de nouveaux fichiers à chaque fois.

Une fois que votre compte est créé, vous pouvez commencer un nouveau CodePen en allant [sur cette URL](https://codepen.io/pen/).
Vous avez trois blocs : HTML, CSS et JS pour entrer respectivement vos codes HTML, CSS et JavaScript.
Vous pouvez sauvegarder votre CodePen et ensuite le retrouver dans votre profil.

### Consignes
Créez un nouveau CodePen que vous nommerez "Sunset Cloud". Nous allons faire un simple nuage en CSS : ce petit exercice permettra de mieux comprendre les positions en CSS.

![questions angular]({{ site.url }}/assets/sunset-cloud.png)

#### Le ciel
Pour que l'on puisse bien distinguer notre nuage, nous allons commencer par faire un ciel.

Côté HTML, faite une `div` et donnez-lui une classe `sky`.
Dans le CSS, appliquez à la classe `sky` les règles CSS suivantes :

- `width: 100%` afin que la div prenne toute la largeur de l'écran ;
- `min-height: 100vh` afin que la div prenne <mark>au moins toute la hauteur initiale de la fenêtre</mark>. Note : l'unité de mesure `vh` signifie **viewport height**. `1vh` est égale à `1/100eme` de la hauteur du viewport (de la fenêtre). C'est une unité de mesure <mark>absolue</mark> ;

Pour le `background`, appliquez les règles CSS suivantes :

```css
background: #e96443;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #904e95, #e96443);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #904e95, #e96443); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
```

Note : ce background a été pris du site [UiGradients](https://uigradients.com/#DeepSpace), qui propose des dégradés gratuits. Il utilise ici une technique dite "de fallback". Elle consiste à spécifier dans un premier temps un `background` (première ligne). Ce background s'appliquera à tous les navigateurs, y compris les vieux navigateurs.
La deuxième ligne est pour les vieux navigateurs, et plus spécifiquement les vieilles versions de Chrome et Safari : vous voyez ici <mark>l'utilisation d'un préfix *-webkit-*</mark>. Pour en savoir plus sur les préfixes : [vendor prefixes](https://developer.mozilla.org/fr/docs/Glossaire/Pr%C3%A9fixe_Vendeur).
La troisième ligne est pour les navigateurs dits "modernes". 
Ainsi, on assure ses arrières avec ce que l'on appelle une "rétro compatibilité".

#### Le nuage
Laissons le ciel de côté pour nous concentrer sur notre nuage. Voici comment il sera construit : 
- une `div` contenant trois autres `div` ;
- la `div` parente aura une classe CSS `cloud`, et les trois `div` contenues dedans porteront chacune la classe `cloud__part` ;
- chaque élément aura une position définie.

Commencez donc par créer une `div` portant la classe CSS `cloud`. À l'intérieur, écrivez trois autres `div` portant toutes la classe CSS `cloud__part`.

Dans votre CSS, stylisez votre élément de classe `.cloud` en lui appliquant une largeur de `165px` et une hauteur de `150px`.
Pour le moment, appliquez-lui également une bordure `1px solid black` afin que vous puissiez le distinguer (ou un `background: blue` si la bordure n'est pas assez visible pour vous).

Le rendu devrait être le suivant : 

![questions angular]({{ site.url }}/assets/rendu-step1.png)

On va également vouloir centrer le nuage.
Si vous vous rappelez ce que l'on a vu lors du dernier TP, on peut centrer les éléments en utilisant Flexbox. Notre élément de classe `cloud` est contenu dans un élément de classe `sky`. L'élément "ciel" est donc le conteneur de l'élément "nuage". On peut donc spécifier l'élément "ciel" comme étant un <mark>conteneur Flexbox</mark>, et gérer ensuite la manière dont les éléments (ou en l'occurrence l'unique élément) contenus dedans.

Spécifiez l'élément de classe `sky` comme étant un conteneur Flexbox avec la propriété `display: flex`.

Maintenant que notre conteneur est `flex`, il est temps de spécifier la manière dont les éléments seront placés à l'intérieur ! 
Toujours sur l'élément de classe `sky`, spécifiez les propriétés suivantes :

```css
justify-content: center;
align-items: center;
```
- [`justify-content`](https://developer.mozilla.org/fr/docs/Web/CSS/justify-content) spécifie le placement sur l'axe horizontal (x-axe) ;
- [`align-items`](https://developer.mozilla.org/fr/docs/Web/CSS/align-items) spécifie le placement sur l'axe vertical (y-axe) ;

Le rendu devrait être le suivant :

![questions angular]({{ site.url }}/assets/rendu-step2.png)


Désormais, il va être temps de styliser les différentes parties du nuage.
Pour les éléments de classe `cloud__part`, affectez les dimensions suivantes :
```css
width: inherit;
height: inherit;
``` 
La valeur `inherit` signifie "hériter" en anglais, et indique simplement que les éléments auront la même largeur et la même hauteur que le premier élément parent ayant des tailles définies.

Affectez-leur également un `background: #ECE9E6` pour un léger gris.
Normalement, le rendu devrait être comme suit :

![questions angular]({{ site.url }}/assets/rendu-step3.png)

Vous voyez que les trois éléments du nuage dépassent et se mettent les uns à la suite des autres. On va donc vouloir les <mark>placer nous-mêmes</mark> et, pour cela, nous allons avoir besoin de les <mark>positionner</mark>.

Spécifiez une position `absolute` pour les éléments de classe `cloud__part`. Et, pour qu'ils soient bien arrondis, spécifiez un `border-radius: 50%`. Le rendu devrait être le suivant :

![questions angular]({{ site.url }}/assets/rendu-step4.png)

Il va maintenant être temps de placer chaque partie indépendamment :
- sur le premier élément de classe `cloud__part`, rajoutez une classe `cloud__part--left` ;
- sur le deuxième, rajoutez une classe `cloud__part--up`;
- sur le troisième, une classe `cloud__part__right`.
- pour la classe `cloud__part--left`, spécifiez un décalage de `-35%` vers la gauche avec la propriété [left](https://developer.mozilla.org/fr/docs/Web/CSS/left) et une ombre `box-shadow: 2px 2.5px 1px #545863` ;
- pour la classe `cloud__part--up`, spécifiez un décalage de `-35%` vers le haut avec la propriété [top](https://developer.mozilla.org/fr/docs/Web/CSS/top) ;
- pour la classe `cloud__part--right`, spécifiez un décalage de `35%` et une ombre `box-shadow: 2px 3px 1px #545863` ;

Le rendu devrait être le suivant :

![questions angular]({{ site.url }}/assets/rendu-step5.png)

Le seul rond blanc que l'on observe est la partie droite du nuage. Cela est dû au `position: absolute` : le décalage des parties du nuage se fait par rapport au <mark>coin supérieur gauche du premier élément parent positionné</mark>. Ici, le seul élément parent qui est positionné... il n'y en a pas pour le moment ! Du coup, les parties du nuage se décalent par rapport au coin supérieur gauche de la fenêtre.

Or, on souhaiterait qu'elles ne soient positionnées que par rapport à leur conteneur portant la classe `cloud`. Il faut donc le positionner également. Comme on souhaite qu'il garde sa place dans le flux d'affichage, on va le mettre en `position: relative`.
Le rendu devrait être le suivant : 

![questions angular]({{ site.url }}/assets/rendu-step6.png)

Il ne reste plus qu'à enlever le fond et / ou les bordures données à l'élément de classe `cloud`.

Voilà, on a un joli petit nuage tout doux.
Félicitations.
You geniuses.