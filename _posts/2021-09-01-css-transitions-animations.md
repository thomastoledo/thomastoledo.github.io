---
layout: post
title: "Cours Développement Frontend - Transitions et Animations"
date: 2022-02-24 12:26:11 +0200
categories: [cours, 1A, frontend]
---
# CSS - Transitions et animations
Il est désormais temps de passer à un chapitre de CSS qui va très certainement vous plaire : les transitions et les animations !

Jusqu'à présent, nous avons vu comment gérer les espacements entre nos blocs, comme gérer leur affichage, leurs marges (internes et externes), leurs bordures, comme mettre des médias, comment les positionner, etc.
Mais nous n'avons pas encore vu comment rajouter des effets de transition et d'animations sur nos éléments !

Les transitions et les animations vont vous permettre de rendre vos sites plus dynamiques, en quelques lignes de CSS seulement !

## Les transitions
Commençons avec le plus simple : les transitions.
Toute la documentation peut être retrouvée ici : [https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions).

Les transitions sont un moyen d'animer le passage d'un état d'un élément à un autre état. Par exemple, dans le CodePen suivant : [https://codepen.io/nugetchar/pen/dyZKEZO](https://codepen.io/nugetchar/pen/dyZKEZO),  lorsque l'on passe la souris sur le carré au milieu de la page, ce dernier s'agrandit et du texte apparaît.
Il passe de son état "normal" à l'était *hover* (passage de la souris), et une transition s'exécute ! C'est ce qui donne cet effet d'animation.

Voyons maintenant la syntaxe d'une transition !

### La syntaxe
Une transition s'écrit avec la propriété `transition`. Sa documentation est disponible ici : [https://developer.mozilla.org/fr/docs/Web/CSS/transition](https://developer.mozilla.org/fr/docs/Web/CSS/transition).

Sa syntaxe est la suivante : 

```css
.un_selecteur_quelconque {
	transition: <propriété 1> <durée en s ou ms> <fonction timing> <délai>, ..., <propriété n> <durée> <fonction timing> <délai>
}
```

Plusieurs points sont à noter sur cette syntaxe :

**Premièrement**, il est possible de définir des transitions différentes pour les diverses propriétés CSS spécifiées sur un sélecteur, en les séparant par des virgules.

Par exemple, dans le code suivant, nous avons deux transitions : une pour la propriété `height`, et l'autre pour la propriété `width`.

```html
<div class="square">
</div>
```

```css
/* Le style de base : un carré rouge */
.square {
	height: 30px;
	width: 30px;
	background-color: red;
	/* 
	Ici, la transition ne sert à rien en tant que telle.
	C'est lorsque les éléments ciblés par ce sélecteur
	changeront d'état, qu'elle s'appliquera
	*/
	transition: height 1s ease, width 500ms ease;
}

.square:hover {
	height: 300px;
	width: 300px;
} 
```

Ici, nous retrouvons bien la syntaxe donnée précédemment, avec des transitions différentes pour les propriétés `height` et `width`. 

**Deuxièmement**, si jamais on veut appliquer un seul et même modèle de transition pour **toutes** les propriétés CSS spécifiées sur un sélecteur, alors on peut utiliser le mot-clef `all`.

Exemple :

```html
<div class="square">
</div>
```

```css
.square {
	height: 30px;
	width: 30px;
	background-color: red;
	transition: all 1s ease;
}

.square:hover {
	height: 300px;
	width: 300px;
} 
```

Ici, la transition va concerner `height`, `width` et `background-color`. À noter, cependant : pour le deuxième sélecteur, seules les propriétés `height` et `width` sont spécifiées : `background-color` ne sera donc pas animée.

**Troisièmement**, et enfin : qu'est-ce que **la fonction de timing** ? 
La **fonction de timing** pourrait être plus proprement traduite par **effet de transition**.
Il s'agit en effet de la manière dont **la transition va se dérouler**.

Pour bien comprendre, je vous invite à aller sur le CodePen suivant, et à modifier l'effet de transition avec les valeurs suivantes, afin de voir les différents effets :

- `linear` ;
- `ease-in` ;
- `ease-out` ;
- `ease-in-out`.

Si les différences vous semblent trop subtiles, remplacez `ease` par ceci : `cubic-bezier(.75,.11,.19,1.21)`.
Vous devriez voir que l'animation est différente !

**Que s'est-il passé ?**
On peut, pour les effets de transition, utiliser ce que l'on appelle des fonctions de Bezier. Malheureusement, calculer une fonction de Bezier peut s'avérer pour le moins ardu.

Voilà pourquoi il existe des sites tels que [https://cubic-bezier.com](https://cubic-bezier.com), qui permettent de trouver très simplement l'effet de transition qui nous convient.

### Exercices

#### Votre première transition
En partant du code du CodePen suivant, faites en sorte que, au passage de la souris sur les éléments de classe `box`, ces derniers prennent une largeur de `100%` et une hauteur de `100px`.
Ce changement d'état doit déclencher les transitions suivantes :

- une transition pour la largeur qui dure une seconde, avec l'effet de transition `ease` ;
- une transition pour la hauteur qui dure une seconde, avec l'effet de transition `ease` et un délai de une seconde.

CodePen : [https://codepen.io/nugetchar/pen/abVjbJW](https://codepen.io/nugetchar/pen/abVjbJW)

#### Bordures et effet fluide

Dans le CodePen suivant, vous voyez plusieurs `div` imbriquées les unes dans les autres.

CodePen : [https://codepen.io/nugetchar/pen/bGYjGqy?editors=1100](https://codepen.io/nugetchar/pen/bGYjGqy?editors=1100).

En CSS, faites en sorte que :

- au passage de la souris sur chaque `div`, cette dernière et toutes ses descendantes `div` deviennent des cercles ;
- au passage de la souris sur chaque `div`, cette dernière ait une bordure rouge ;
- au passage de la souris sur chaque `div`, cette dernière subisse une légère transformation avec la règle CSS suivant : `transform: scale(1.1)`.

**Note** : nous n'avons pas encore vu la propriété CSS `transform`. Elle permet d'appliquer des transformations aux éléments HTML. Sa documentation peut être trouvée ici : [https://developer.mozilla.org/fr/docs/Web/CSS/transform](https://developer.mozilla.org/fr/docs/Web/CSS/transform).
Ici, `transform: scale(1.1)` redimensionne l'élément avec un facteur `1.1`.

#### Bidule et JavaScript
Dans cet exercice, nous allons commencer à entrevoir JavaScript, en plus des transitions.

Rendez-vous sur le CodePen suivant : [https://codepen.io/nugetchar/pen/JjOBjZM](https://codepen.io/nugetchar/pen/JjOBjZM).

Dans ce CodePen, nous avons un simple carré noir sur la gauche de l'écran. Le but de cet exercice va être, au clic sur le carré, de le faire allé sur le côté opposé.

Analysons le code déjà présent !

**HTML**
Le code HTML est très simple :

```html
<div class="container">
  <div class="bidule"></div>
</div>
```
Nous avons un *container* dans lequel se trouve une `div` de classe `bidule`. Rien de très complexe : le "bidule" est le petit carré noir qu'il faudra faire bouger.

**CSS**
Le CSS est un peu plus fourni, mais n'offre pas non plus, pour le moment, de grosse complexité :

```css
body {
  margin: 0;
}

.container {
  display: grid;
  place-items: center start;
  height: calc(100vh - 8px);
  padding: 4px;
}

.bidule {
  width: 30px;
  height: 30px;
  background-color: black;
}
```
- nous avons enlevé les marges du `body` ;
- notre *container* fait toute la taille de la page et est utilisé comme grille pour placer notre "bidule" au milieu à gauche ;
- le "bidule" fait `30px` sur `30px` et a un fond noir.

**JavaScript**
Enfin ! Après des mois de cours, nous voyons JavaScript !
Le code est le suivant :

```js
const bidule = document.querySelector('.bidule');
bidule.addEventListener('click', () => {
  bidule.classList.toggle('move-right');
  bidule.classList.toggle('expand');
  setTimeout(() => bidule.classList.toggle('expand'), 300);
});
```

Analysons-le ligne par ligne : je vais ici m'efforcer de vous expliquer au mieux ce que fait chaque ligne, tout en restant assez superficiel pour ne pas vous bombarder avec trop d'information.

<u>Première ligne :</u>
```js
const bidule = document.querySelector('.bidule');
```
Ici, nous créons une **constante**, appelée **bidule**. Nous lui affectons une valeur particulière : `document.querySelector('.bidule')`. Cette instruction va **chercher** dans le **document** (la page web) le **premier élément** ciblé par un **sélecteur CSS** (passé entre parenthèses).

Nous stockons donc, dans notre **constante** appelée **bidule**, le **premier élément** ciblé par le **sélecteur CSS** `.bidule`.


<u>Deuxième ligne (l'instruction se ferme à la dernière ligne) :</u>

```js
bidule.addEventListener('click', () => {
});
```
Il est possible, en JavaScript, de rattacher des traitements à exécuter lors du déclenchement d'événements.
Ici, la méthode `addEventListener` permet de faire cela. Elle prend deux paramètres :
- le nom de l'événement à écouter ;
- une fonction à exécuter à chaque fois que cet événement est déclenché.

Ici, l'événement écouté est **click**, et la fonction à exécuter est la suivante :

```js
() => {
  bidule.classList.toggle('move-right');
  bidule.classList.toggle('expand');
  setTimeout(() => bidule.classList.toggle('expand'), 300);
}
```

On indique donc au navigateur qu'au **clic** sur **bidule**, on exécutera une fonction.

<u>La fonction à exécuter</u>

Nous allons pouvoir terminer cette analyse de JavaScript avec les trois lignes de notre fonction.

```js
bidule.classList.toggle('move-right');
```
En JavaScript, il est possible d'ajouter ou de retirer des classes aux éléments du DOM.
Cette instruction ajoute la classe `move-right` si elle n'y est pas encore, et la retire sinon.

```js
bidule.classList.toggle('expand');
```
Pareil ici, mais pour la classe `expand`.

```js
setTimeout(() => bidule.classList.toggle('expand'), 300);
```

Celle-ci paraît un peu plus complexe, pourtant : on retrouve l'instruction permettant d'ajouter ou enlever la classe `expand`. Elle se trouve simplement dans un `setTimeout` : un `setTimeout` est une fonction qui exécute un traitement après un temps donné en millisecondes.

Ici, il exécutera la fonction après `300ms`.

Pour résumer le code JavaScript :
Nous récupérer l'élément du DOM "bidule", et nous faisons en sorte que, à chaque clic dessus, un traitement s'exécute.
Ce traitement va, un coup, ajouter la classe `move-right` à l'élément, pour l'enlever au prochain clic.
Il ajoutera également la classe `expand` avant de l'enlever `300ms` plus tard.

##### À vous de coder !
Nous avons donc ici un comportement déjà défini en JavaScript, mais qui ne se retrouve pas au niveau du CSS : en effet, il n'y a aucun sélecteur de classe `move-right` ou `expand`, et aucune transition n'est appliquée.

Tout ce que l'on sait, c'est qu'au clic sur l'élément "bidule", ce dernier doit aller vers la droite (et revenir vers la gauche au clic suivant), et s'étendre avant de reprendre sa taille normale.

Voici donc les consignes.
Écrivez le CSS manquant, sachant que :
- pour le sélecteur de classe `expand`, la largeur doit faire `100px` ;
- pour le sélecteur de classe `move-right`, il doit y avoir **un décalage** de `100% - 30px` par rapport à la gauche ;
- pour le sélecteur de classe `bidule`, il doit y avoir deux transitions :
	- une transition pour le décalage de `800ms` avec l'effet de transition `ease` ;
	- une transition pour la largeur de  `500ms` avec l'effet de transition `ease`.

Une fois cet exercice terminé, essayez de recréer les animations vues en cours pour bien comprendre leur fonctionnement, et n'hésitez pas à en créer des nouvelles pour vous entraîner !

## Les animations

Si les transitions sont un type d'animations pour caractériser le passage d'éléments d'un état à un autre, les animations offrent une plus grande richesse, mais sont également parfois plus compliquées.

La documentation complète à leur sujet peut être trouvée ici : [https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Animations/Using_CSS_animations](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Animations/Using_CSS_animations).

### Structure d'une animation en CSS
En CSS, une animation va avoir deux parties :

- la propriété CSS animation : [https://developer.mozilla.org/fr/docs/Web/CSS/animation](https://developer.mozilla.org/fr/docs/Web/CSS/animation) ;
- la description de l'animation en tant que telle.

#### La propriété CSS
La propriété CSS `animation` est, comme pour `transition` et d'autres propriétés que nous avons vu dans les cours précédents, une **propriété raccourcie**.
Elle permet de spécifier un certain nombre d'autres propriétés, plus nombreuses que pour les transitions, et qui offrent un plus grand éventail d'animations.

Voyons plutôt l'exemple suivant : [https://codepen.io/nugetchar/pen/qBVypzz](https://codepen.io/nugetchar/pen/qBVypzz).

Dans cet exemple, le code HTML est, encore une fois, très simple :

```html
<div class="container">
  <div class="star"></div>
</div>
```

Le code CSS, en revanche, est plus intéressant, notamment à partir du sélecteur de classe `star` :

```css
.star {
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  animation: pulseStar 1s ease infinite alternate;
}

@keyframes pulseStar {
  from { box-shadow: 0px 0px 10px 1px white; }
  25% { box-shadow: 0px 0px 30px 1px white; }
  to { box-shadow: 0px 0px 10px 1px white; }
}
```

On retrouve ici la propriété CSS `animation`, avec, de spécifié :
- le nom de l'animation que l'on souhaite appliquer : `pulseStar` ;
- la durée de l'animation : `1s` ;
- l'effet d'animation : `ease` ;
- le nombre de fois que l'on veut qu'elle se joue : `infinite` ;
- le sens de lecture de l'animation : `alternate`.

Pour le nom, la durée et l'effet d'animation, ce sont les mêmes fonctionnements que pour les transitions. En revanche, deux nouvelles propriétés viennent s'ajouter : le nombre d'itération et le sens de lecture.

Le nombre d'itérations peut être un nombre, ou bien le mot-clef `infinite` si l'on désire que l'animation ne s'arrête jamais.

Le sens de lecture de l'animation peut être `normal`, `reverse`, `alternate` ou encore `alternate-reverse` (commencera depuis la fin vers le début et alternera ensuite).

#### L'animation en tant que telle

L'animation en tant que telle est définie par le code suivant :
```css
@keyframes pulseStar {
  from { box-shadow: 0px 0px 10px 1px white; }
  25% { box-shadow: 0px 0px 30px 1px white; }
  to { box-shadow: 0px 0px 10px 1px white; }
}
```

- le mot-clef `@keyframes` indique que l'on va définir une animation ;
- `pulseStar` est le nom que l'on donne à cette animation ;
- `from`, `25%` et `to` sont des étapes pour lesquelles on spécifie l'évolution du CSS.

### Exercice 
La consigne est simple, l'exécution sans doute moins. Reproduisez, en vous aidant le moins possible du code disponible, le CodePen suivant : [https://codepen.io/nugetchar/pen/mdqjXpm](https://codepen.io/nugetchar/pen/mdqjXpm)

Si vous le souhaitez, vous pouvez commencer à partir du code suivant :

```html
<div class="container">
  <div class="spinner-base">
    <div class="spinner"></div>
  </div>
</div>
```

```css
body {
  margin: 0;
}

.container {
  height: 100vh;
  background-color: black;
  display: grid;
  place-items: center;
}

.spinner-base {
  width: 100px;
  height: 100px;
  border: 15px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.spinner {
  width: 15px;
  position: absolute;
  top: -15px;
  left: -15px;
  border-top: 15px solid white;
}
```

C'est tout pour les animations, du moins aujourd'hui ! À notre niveau, nous n'avons pas forcément besoin d'aller plus en détail, d'autant plus qu'il reste encore beaucoup de choses à voir, notamment avec JavaScript !
