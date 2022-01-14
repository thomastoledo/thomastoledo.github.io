---
layout: post
title: "Cours Développement Frontend - Le modèle de boîtes"
date: 2021-12-22 12:24:11 +0200
categories: [cours, 1A, frontend]
---
# CSS - Le modèle de boîtes

En HTML, nous utilisons ce que l'on appelle le **modèle de boîtes**. Ce modèle va nous permettre de comprendre les différentes marges et les comportements des types de boîtes.

## Les types de boîtes
Nous avons vu, au début de l'année, qu'il existait deux types d'éléments : les éléments *inline* et les éléments *block*. C'est notamment la différence entre un élément `span` et un élément `div`.

Un élément `div` est un élément de type *block*.
Un élément `span` est un élément de type *inline*.

### Les éléments de type *inline*
Les éléments de type *inline* :

- se suivent sur une ligne ;
- se dimensionnent par rapport à leur contenu (donc pas de `width` ou de `height`) ;
- les marges internes et externes (que nous verrons juste après) ne provoqueront pas le déplacement des éléments autour.

### Les éléments de type *block*
Les éléments de type *block* ;
- prennent toute la largeur possible **par défaut** ;
- ne se suivent pas et retournent donc à la ligne ;
- peuvent être dimensionnés avec `width` et `height` ;
- les marges internes et externes auront des effets sur les éléments autour.

## Le modèle de boîtes
Il est désormais temps de passer enfin à ce fameux modèle !
Une "boîte" est donc un élément, *inline* ou *block*, qui aura les propriétés suivantes :

- une boîte de contenu, ayant une **largeur** et une **hauteur** ;
- une boîte de marges intérieures (les *paddings*) ;
- une boîte de bordures ;
- une boîte de marges extérieures (les *margin*).

On pourrait le schématiser comme suit :

![box model]({{ site.url }}/assets/modele_boite.png)

## Calculs de hauteurs et de largeurs

Pour calculer la hauteur totale d'une boîte, il faut faire le calcul suivant : 
- `hauteur totale = hauteur + padding haut + padding bas + bordure haute + bordure basse` ;
- `largeur totale = largeur + padding gauche + padding droite + bordure gauche + bordure droite`.

Vous remarquez qu'il peut devenir fastidieux de calculer la hauteur totale d'une boîte !
Fort heureusement, il existe un modèle de boîte dit "alternatif" : avec la propriété CSS `box-sizing: border-box`, on peut spécifier au navigateur que la zone d'effet des propriétés `width` et `height` sera la **boîte de bordure** et non la **boîte de contenu**.

L'exemple suivant montre le dimensionnement d'une `div` avec le modèle de boîte classique et le dimensionnement d'une autre `div` avec le modèle de boîte alternatif : [https://codepen.io/nugetchar/pen/LYzxVbE](https://codepen.io/nugetchar/pen/LYzxVbE).

Dans cet exemple, comment ferait-on, en CSS, pour que la deuxième `div` ait les mêmes dimensions que la première ?

## Les marges

Le modèle de boîtes implique des marges et des bordures. Nous allons ici voir les deux types de marges et leurs propriétés CSS, puis nous terminerons avec les bordures.

### Les marges internes - `padding`

Le mot anglais *padding* pourrait être traduit par "rembourrage". Il s'agit de la marge interne d'un bloc, ou encore sa zone de remplissage.

La documentation peut-être trouvée ici : [https://developer.mozilla.org/fr/docs/Web/CSS/padding](https://developer.mozilla.org/fr/docs/Web/CSS/padding).

On aura tendance à utiliser le *padding* pour gérer l'espacement entre le bord d'un bloc et son contenu.

La propriété `padding` est une **proriété raccourcie** qui permet de spécifier les marges internes des quatre bords :

- `padding-top` ;
- `padding-right`;
- `padding-bottom`;
- `padding-left`.

Elle possède plusieurs syntaxes :

```html
<div>
	Div de test
</div>

<style>
	div {
		/* padding-top: 10px; padding-right: 5px; padding-left: 7px; padding-bottom: 20px; */
		padding: 10px 5px 7px 20px;

		/* padding-top: 10px; padding-right et left: 5px; padding-bottom: 7px; */
		padding: 10px 5px 7px;
		
		/* padding-top et bottom: 10px; padding-right et left: 5px; */
		padding: 10px 5px;
		
		/* padding-top, bottom, right et left: 10px */
		padding: 10px;
	}
</style>
```

Ses valeurs sont toujours nulles ou positives.

###  Les marges externes - `margin`

Les marges externes sont utilisées pour gérer l'écart des blocs entre eux.

La documentation de cette propriété CSS peut-être trouvée ici [https://developer.mozilla.org/fr/docs/Web/CSS/margin](https://developer.mozilla.org/fr/docs/Web/CSS/margin).

De la même manière que `padding`, la propriété `margin` est une propriété raccourcie. Elle fonctionne avec une syntaxe similaire :
- `margin-top` ;
- `margin-right`;
- `margin-bottom`;
- `margin-left`.

Elle possède plusieurs syntaxes :

```html
<div>
	Div de test
</div>

<style>
	div {
		/* margin-top: 10px; margin-right: 5px; margin-left: 7px; margin-bottom: 20px; */
		margin: 10px 5px 7px 20px;

		/* margin-top: 10px; margin-right et left: 5px; margin-bottom: 7px; */
		margin: 10px 5px 7px;
		
		/* margin-top et bottom: 10px; margin-right et left: 5px; */
		margin: 10px 5px;
		
		/* margin-top, bottom, right et left: 10px */
		margin: 10px;
	}
</style>
```
## Les bordures
Pour terminer avec le modèle de boîtes, voyons les bordures.

Les bordures entourent la boîte de *padding*.

Elles se définissent avec les propriétés `border`, `border-top`, `border-right`, `border-bottom` et `border-left`.

La documentation est accessible ici : [https://developer.mozilla.org/fr/docs/Web/CSS/border](https://developer.mozilla.org/fr/docs/Web/CSS/border).

## Exercice

L'exercice suivant va permettre de mettre en pratique ce que nous avons vu lors des précédents cours avec ce que nous venons de voir aujourd'hui.

Ce CodePen : [https://codepen.io/nugetchar/pen/jOGwNGB](https://codepen.io/nugetchar/pen/jOGwNGB) indique le résultat attendu. Il propose également une solution.

Le but est de partir de ce CodePen : [https://codepen.io/nugetchar/pen/vYexGby](https://codepen.io/nugetchar/pen/vYexGby) et d'y arriver **en regardant le moins possible le code de la solution**.

Pour plus de facilité, je vous conseille de télécharger le code de départ en cliquant sur  le bouton gris "*export*" en bas à droite, puis *export .zip*. Vous obtiendrez alors un fichier .zip duquel il faudra extraire le dossier.

Dans ce dossier, vous aurez un dossier *dist* => supprimez-le. Vous aurez également deux fichiers *license* et *README* => supprimez-les également. Les deux fichiers que vous aurez à modifier seront dans le dossier *src*.

### Consignes
Voici les consignes à suivre pour arriver au résultat final !

#### L'élément de classe `container`
L'élément de classe `container` est celui qui contient les trois éléments de classe `card` et qui a un dégradé orangé.

Pour commencer, il n'est pas assez grand : donnez-lui une hauteur minimale de **`100vh`** avec la propriété CSS [**min-height**](https://developer.mozilla.org/fr/docs/Web/CSS/min-height).

Ensuite, vous remarquez qu'il y a une **marge** tout autour : il s'agit de l'élément `body`. Cet élément a, de base, une marge. On peut soit la mettre à **0**, soit appliquer le dégradé au `body` au lieu de l'appliquer à l'élément de classe `container`.
C'est vous qui choisissez (personnellement j'ai l'habitude de mettre la marge à **0**). 

#### Les éléments de classe `card`

Pour commencer, il faudrait mettre une bordure sur les trois `div` portant la classe `card` : pour cela, utilisez la propriété [`border`](https://developer.mozilla.org/fr/docs/Web/CSS/border).

Ensuite, les bords de chaque `card` sont arrondis : pour gérer cela, nous utilisons la propriété CSS [`border-radius`](https://developer.mozilla.org/fr/docs/Web/CSS/border-radius). À l'aide de la documentation, appliquez un arrondi de `16px` aux éléments de classe `card`. Essayez d'autres valeurs et d'autres unités pour voir le résultat !

C'est bien beau, mais le texte n'est pas centré, et il manque des **marges internes et externes**.

Centrez le texte avec ce que nous avons vu dans le cour pour [**styliser du texte**](https://nugetchar.github.io/cours/1a/frontend/2021/12/04/css-styliser-du-texte.html).

Et appliquez les marges suivantes :
- `16px` pour les marges externes ;
- `8px` pour les marges internes.

Il y a également un autre soucis : le fond est transparent ! Pour corriger cela, appliquez un **fond blanc** avec la propriété [`background-color`](https://developer.mozilla.org/fr/docs/Web/CSS/background-color). Pour appliquer un fond blanc, vous pouvez soit utiliser la valeur `white`, soit la valeur *hexadécimale* `#FFFFFF`.

#### Les éléments de classe `card` - au survol
Pour cette consigne, je vais faire exprès d'être moins précis que précédemment : 

Faites en sorte, qu'au **survol de la souris** sur les éléments de classe `card`, le `border-radius` passe à `1px` et la bordure à `10px solid black`.

#### Les éléments `h2`
Pour commencer, donnez la taille de `24px` à la police des éléments `h2`.

Ensuite, nous allons nous attaquer à l'effet de surlignage lorsque nous survolons un titre (barre rouge qui s'affiche).
Pour le moment, la barre prend toute la place et dépasse probablement des `cards`. Pour corriger cela : 
- appliquez la règle `width: fit-content`, qui permet de dire que la largeur d'un contenant est celle de son contenu ;
- appliquez la règle `margin: auto`, qui permet de centrer automatiquement un élément de type `block` lorsque sa largeur est déjà spécifiée.

## Pour aller plus loin
Dans le code CSS que je vous ai fourni, certaines choses étaient déjà en place : 

- [`position: relative`](https://developer.mozilla.org/fr/docs/Web/CSS/position);
- [`position: absolute`](https://developer.mozilla.org/fr/docs/Web/CSS/position) ;
- [`transition`](https://developer.mozilla.org/fr/docs/Web/CSS/transition) ;
- [`bottom`](https://developer.mozilla.org/fr/docs/Web/CSS/bottom) ;
- [`z-index`](https://developer.mozilla.org/fr/docs/Web/CSS/z-index).
Je vous invite à cliquer sur les liens ci-dessus pour parcourir la documentation et voir de quoi il en retourne. Bien que nous les aborderons par la suite, il est toujours bon de prendre un peu d'avance.

