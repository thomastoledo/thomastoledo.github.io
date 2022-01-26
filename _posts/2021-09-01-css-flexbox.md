---
layout: post
title: "Cours Développement Frontend - Flexbox"
date: 2021-12-23 12:24:11 +0200
categories: [cours, 1A, frontend]
---
# CSS - Flexbox

Jusqu'à présent, nous avons vu de nombreuses choses, que cela soit en HTML ou en CSS : la sémantique, les sélecteurs, les marges, les positions, comment styliser du texte.
Aujourd'hui, nous allons voir un module CSS qui va être l'une des pièces maîtresses dans l'intégration CSS de vos pages web.

Il s'agit du module **Flexbox**. Tout sa documentation complète peut être trouvée ici : [https://developer.mozilla.org/fr/docs/Learn/CSS/CSS_layout/Flexbox](https://developer.mozilla.org/fr/docs/Learn/CSS/CSS_layout/Flexbox).

## Pourquoi Flexbox ?
Flexbox est un module répondant à un besoin simple : disposer des éléments, au sein d'un conteneur, de manière équitable sans avoir à (trop) jouer sur les marges et les positions.

Par exemple : centrer un élément verticalement au sein d'un conteneur, sans Flexbox, peut relever de l'impossible si vous n'avez pas de taille fixe pour ledit conteneur.
De même, s'assurer que des éléments prennent toute la place restante, ou bien restent autant que possible sur une ligne, ne sera pas possible sans Flexbox (ou alors très ardu).

Cette disposition  d'éléments se fera selon deux axes : le *main axis* et le *cross axis*.

## Les concepts
Flexbox vient avec plusieurs concepts : 

- le conteneur, ou élément parent ;
- les éléments enfants ;
- le *main axis* ;
- le *cross axis*
- tout ce qui caractérise les deux axes : taille, début et fin.

Un article de rappel complet est également disponible ici : [https://css-tricks.com/snippets/css/a-guide-to-flexbox/](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

### Le conteneur, ou élément parent
Comme dit plus haut, le but de Flexbox est de vous permettre de disposer vos éléments de manière plus simple selon deux axes. 
Pour disposer des éléments grâce à Flexbox, ceux-ci doivent se trouver dans un **conteneur Flexbox**. Prenons l'exemple suivant :

```html
<div id="conteneur-flexbox">
	<div></div>
	<div></div>
	<div></div>
</div>

<style>
	#conteneur-flexbox {
		width: 100%;
		border: 2px solid black;
		padding: 4px;
	}
	
	#conteneur-flexbox > div {
		background-color: red;
		border: 1px solid black;
		width: 100%;
		height: 100px;
		margin: 4px;
	}
</style>
```
Avec ce code là, nous aurons un conteneur faisant 100% de la largeur de la page, avec une bordure de `2px` noire et une marge interne de `4px`. Dans ce conteneur, nous aurons trois éléments rouges, portant une bordure de `1px` noire, de largeur 100% et de hauteur `100px` et espacés de `4px` entre eux.

Mais, surtout, chaque **élément enfant** ira **à la ligne**, puisqu'il s'agira d'un élément de type *block*.

Pour vous en convaincre, vous pouvez copier/coller ce code dans un [CodePen](http://codepen.io/) ou un fichier HTML, et regarder le résultat dans un navigateur.

Enfin, pour le moment, le conteneur **n'est pas** un **conteneur flex**. 

**Exercice**
Copiez/collez le code précédent dans un fichier HTML ou un CodePen, et rajoutez la règle CSS suivante au conteneur : `display: flex`.

Quels changements remarquez-vous ?

**Explications**
Le fait d'appliquer `display: flex` à l'élément parent permet de le définir en tant que **conteneur flex**. Cela a plusieurs répercussions sur l'affichage de ses enfants :

- tous les enfants se retrouvent sur une seule ligne par défaut ;
- leur taille diminue afin qu'ils tiennent tous sur une seule ligne ;

Vous venez de transformer un conteneur en **conteneur flex**, et par conséquent avez modifié la manière dont vous allez pouvoir gérer la disposition des éléments à l'intérieur.

Voyons les propriétés CSS qui existent pour un conteneur flex !

#### La direction - `flex-direction`

La propriété `flex-direction` permet de spécifier si vous voulez que vos éléments s'affichent :

- de gauche à droite ;
- de droite à gauche ;
- de haut en bas ;
- de bas en haut.

Sa documentation complète peut être trouvée ici : [https://developer.mozilla.org/fr/docs/Web/CSS/flex-direction](https://developer.mozilla.org/fr/docs/Web/CSS/flex-direction).

**Elle s'applique au conteneur.**

**Attention**
Vous vous rappelez que j'ai dis que Flexbox disposait des éléments selon deux axes ? Pour être correct, il convient de dire qu'il les dispose selon un seul axe, le *main axis*, et qu'il va gérer l'espacement entre eux selon deux axes (*main axis* et *cross axis*).

Cette précision est importante pour comprendre ce qu'il se passe avec `flex-direction` : selon la valeur donnée, le navigateur va **placer le main axis** d'une certaine manière.

Voici un tableau récapitulatif des différentes valeurs possibles et de leurs effets :

|valeur| effet | direction du *main-axis* |
|--|--|--|
| row (par défaut) | place les éléments en lignes | de gauche à droite |
| row-reverse | place les éléments en lignes | de **droite à gauche** |
| column | place les éléments en colonnes | de haut en bas |
| column-reverse | place les éléments en colonnes | de **bas en haut** |

**Exercice**
Créez un CodePen ou un fichier HTML avec le code suivant, et faites en sorte de disposer les éléments enfants de **haut en bas**.

```html
<div id="conteneur-flexbox">
	<div>Div 1</div>
	<div>Div 2</div>
	<div>Div 3</div>
</div>

<style>
	#conteneur-flexbox {
		width: 100%;
		border: 2px solid black;
		padding: 4px;
		display: flex;
	}
	
	#conteneur-flexbox > div {
		background-color: red;
		border: 1px solid black;
		width: 100%;
		height: 100px;
		margin: 4px;
	}
</style>
```

#### Le retour à la ligne - `flex-wrap`
 Cette propriété CSS va permettre de spécifier de quelle manière les éléments doivent aller à la ligne dans un conteneur flex.
La documentation complète peut être trouvée ici : [https://developer.mozilla.org/fr/docs/Web/CSS/flex-wrap](https://developer.mozilla.org/fr/docs/Web/CSS/flex-wrap).

Les différentes valeurs sont les suivantes :

- `nowrap` : par défaut, aucun élément n'ira à la ligne ;
- `wrap` : s'il y a besoin, les éléments iront à la ligne ;
- `wrap-reverse` : s'il y a besoin, les éléments iront à la ligne, mais de manière inversée.

De là, au moins deux questions se posent : quand est-ce que le navigateur juge qu'il y a besoin d'aller à la ligne, et quel est l'effet visuel de chaque valeur ? Pour y répondre, allez sur le CodePen suivant, et faites les modifications suivantes :
[https://codepen.io/nugetchar/pen/NWaQQVm](https://codepen.io/nugetchar/pen/NWaQQVm)

1. spécifiez `flex-wrap: wrap` au conteneur ;
2. pour les éléments enfants, changez leur largeur de `100%` vers `20%` ;
3. mettez maintenant une largeur de `40%` ;
4. changez maintenant votre `flex-wrap` pour lui attribuer la valeur `wrap-reverse`.

Vous venez donc de voir :
- l'effet visuel de chaque valeur ;
- comment le navigateur décide s'il y a besoin d'aller à la ligne ou non : en fonction de la largeur des éléments, le navigateur en met simplement autant qu'il peut sur une ligne, et, lorsqu'il n'y a plus de place, il va à la ligne si c'est autorisé avec `flex-wrap`.

#### La propriété `flex-flow`
Comme les propriétés `flex-direction` et `flex-wrap` sont souvent utilisées ensemble, une **propriété raccourcie** existe : `flex-flow`.

Elle s'utilise comme suit :

`flex-flow: direction retour-ligne`.

**Exemple**
```css
#conteneur-flexbox {
	display: flex;
	flex-flow: column wrap-reverse;
}
``` 

#### La disposition selon le *main-axis*
La disposition selon le *main-axis* se fait grâce à `justify-content`.

La documentation peut être trouvée ici : 
- [https://developer.mozilla.org/fr/docs/Web/CSS/justify-content](https://developer.mozilla.org/fr/docs/Web/CSS/justify-content)

Cette propriété va vous permettre de spécifier la manière dont l'espace entre vos éléments va être réparti.

Reprenons le CodePen suivant : [https://codepen.io/nugetchar/pen/NWaQQVm](https://codepen.io/nugetchar/pen/NWaQQVm).

Donnez une largeur de `30%` aux éléments enfants, et, sur le conteneur, testez les différentes valeurs possibles pour `justify-content` :

- `flex-start` (par défaut) ;
- `flex-end` ;
- `center` ;
- `space-between` ;
- `space-around` ;
- `space-evenly`.

Il existe d'autres valeurs, un peu plus subtiles, qui ne nous intéressent pas pour le moment.

Vous remarquez que les trois dernières valeurs que je vous ai donné ont des comportement similaires quoique portant quelques différences.

`space-between` va répartir l'espace disponible au sein du conteneur entre les éléments enfants.
`space-around` va répartir l'espace disponible au sein du conteneur **autour** de chaque élément enfant.
`space-evenly` va répartir l'espace disponible au sein du conteneur de sorte à ce que l'espace entre chaque élément et entre les bordures et les éléments extrêmes soit le même.

#### La disposition selon le *cross axis*
De la même manière que l'on peut gérer la disposition selon le *main-axis*, on va également pouvoir le faire selon le *cross-axis*. Pour cela, deux propriétés vont nous intéresser : `align-items` et `align-content`.

Leurs documentations sont consultables ici : 

- [https://developer.mozilla.org/fr/docs/Web/CSS/align-items](https://developer.mozilla.org/fr/docs/Web/CSS/align-items) ;
- [https://developer.mozilla.org/fr/docs/Web/CSS/align-content](https://developer.mozilla.org/fr/docs/Web/CSS/align-content).

La première est généralement plus utilisée que la deuxième.

Pour `align-items` :
Les différentes valeurs seront : `stretch` (par défaut), `flex-start`, `flex-end`, `center`, `baseline`.

Pour `align-content` :
Vous allez retrouver des valeurs similaires à `justify-content`, puisqu'il s'agit de gérer l'espacement selon le *cross-axis* : `flex-start` (par défaut), `flex-end`, `center`, `space-between`, `space-around`, et `stretch` pour remplir l'espace entre les lignes.

**Quelle différence entre `align-content` et `align-items` ?**
Pour commencer, `align-content` ne fonctionnera que s'il y a plusieurs "lignes" (avec `flex-wrap` à `wrap`ou `wrap-reverse`). Ensuite, `align-content` va gérer l'espace entre ces lignes, tandis que `align-items` va déplacer les éléments sans nécessairement changer l'espace entre eux.

**Exemple**
Reprenez ce CodePen : [https://codepen.io/nugetchar/pen/NWaQQVm](https://codepen.io/nugetchar/pen/NWaQQVm), et cette fois-ci appliquez les modifications suivantes :

1. `flex-wrap: wrap` ;
2. `width: 45%` pour les éléments enfants ;
3. `height: 500px` pour le conteneur ;
4. sur le conteneur, spécifiez la règle CSS `align-items: center` ;
5. changez maintenant `align-items: center` pour `align-content: center` et regardez la différence entre les deux.

 #### L'espace **entre** les éléments flex
 On peut bien évidemment jouer avec les marges comme nous l'avons vu, et il est également possible, avec Flexbox, de spécifier les écarts entre les éléments flex.
 Cet écart se fera uniquement entre eux, et pas sur les côtés.

Pour spécifier un tel écart, on peut utiliser les propriétés suivantes :

- `gap` : pour spécifier l'écart entre les lignes et les colonnes ;
- `row-gap` : pour spécifier l'écart entre les lignes ;
- `column-gap` : pour spécifier l'écart entre les colonnes.

La documentation de cette propriété est disponible ici : [https://developer.mozilla.org/fr/docs/Web/CSS/gap](https://developer.mozilla.org/fr/docs/Web/CSS/gap)


### Les éléments enfants
Nous venons de voir ce qu'était le conteneur, ou élément parent, et les différentes propriétés CSS Flexbox qui pouvaient s'appliquer sur celui-ci. Nous allons maintenant voir les propriétés CSS pouvant s'appliquer sur un ou plusieurs éléments enfants.

En effet, il peut arriver que l'on veuille qu'un ou plusieurs éléments enfants aient un comportement un peu plus spécifique que les autres.

#### L'odre d'affichage des enfants
On peut vouloir afficher des éléments dans un ordre autre que celui dans lequel ils se trouvent dans le HTML. Par exemple, une liste de tâches à faire pour un technicien, qui doit d'abord afficher les plus prioritaires.

Voici un exemple : [https://codepen.io/nugetchar/pen/QWOLWbp](https://codepen.io/nugetchar/pen/QWOLWbp).

Dans cet exemple, je génère, avec JavaScript, des tâches à afficher. Chaque tâche se voit affecter une priorité, de manière aléatoire. Ici, vous pouvez bien entendu regarder ce que fait le script, mais ce n'est pas le sujet.

Si vous allez dans le CSS, vous remarquez que j'ai écrit le code suivant :

```css

.task.low {
  order: 0;
  background-color: green;
}
.task.medium {
  order: 1;
  background-color: yellow;
}
.task.severe {
  order: 2;
  background-color: red;
}
```

Ce sont les règles CSS `order: 0`, `order: 1` et `order: 2` qui me permettent d'afficher en premier les tâches de plus haute priorité. Mais alors, comment fonctionne cette propriété CSS `order` ?

Dans un conteneur flex, par défaut, tous les éléments ont un `order` dont la valeur vaut `0`. Et donc, par défaut, tous nos éléments flex s'affichent comme ils sont dans le HTML.
La propriété `order` prend des valeurs entières positives, nulles ou négatives. **Les éléments de plus faible `order` seront affichés avant les éléments de plus grand `order`.**

Les valeurs n'ont pas d'unité.

**Un instant !**
Dans l'exemple que j'ai donné, les tâches de priorité `severe` ont l'`order` le plus grand, et pourtant elles s'affichent **avant** ! Rien d'incohérent là-dedans, puisqu'en réalité, j'ai, sur le **conteneur**, placé la règle CSS suivante : `flex-wrap: wrap-reverse`, ce qui fait que mes éléments vont à la ligne... mais vers le haut !

#### Prendre plus ou moins de place

Parfois, vous allez vouloir que certains éléments en particulier prennent plus de place que d'autres.

Peut-être vous rappelez-vous cet exercice : [https://codepen.io/nugetchar/pen/MWvzoPK](https://codepen.io/nugetchar/pen/MWvzoPK), que nous avions vu lors du cours sur les pseudo-classes et pseudo-éléments ([https://nugetchar.github.io/cours/1a/frontend/2021/09/01/css-pseudo-classes-et-pseudo-elements.html](https://nugetchar.github.io/cours/1a/frontend/2021/09/01/css-pseudo-classes-et-pseudo-elements.html)).

Dans cet exercice, l'idée était qu'au passage de la souris sur un élément rouge, celui-ci devait prendre plus de place. Ce mécanisme est implémenté avec Flexbox.

**Prendre plus de place**
La propriété `flex-grow` permet de spécifier la part d'espace que vont prendre un ou plusieurs éléments enfants d'un conteneur flex.

[https://developer.mozilla.org/fr/docs/Web/CSS/flex-grow](https://developer.mozilla.org/fr/docs/Web/CSS/flex-grow)

Prenons l'exemple suivant : [https://codepen.io/nugetchar/pen/ZEaEKrW](https://codepen.io/nugetchar/pen/ZEaEKrW).
Dans cet exemple, un conteneur flex contient trois éléments, dont un est plus gros que les deux autres. Dans le CSS, vous voyez que pour le sélecteur `.container > div`, j'ai appliqué la règle CSS `flex-grow: 1`.

Pour le sélecteur `.container > div.bigger`, j'ai appliqué la règle CSS `flex-grow: 3`. Ainsi, l'élément du milieu, qui porte la classe `bigger`, va se retrouver à être **trois fois plus grand** que les deux autres éléments.

Si on mettait `flex-grow: 2` au premier sélecteur, alors l'élément du milieu serait `3/2 = 1.5` fois plus grand que les deux autres.

On peut donc formaliser ce comportement en disant que **`flex-grow` permet d'allouer l'espace restant entre les éléments, selon les proportions spécifiées**.

**Faites l'essai** : pour le premier sélecteur, spécifiez une largeur minimale `min-width: 50px` avec un `flex-grow: 0` et regardez comment l'affichage évolue. 
Gardez ensuite le `flex-grow: 0` et enlevez la largeur minimale.

**Prendre moins de place**
De la même manière que l'on peut spécifier à un ou plusieurs éléments la place en plus qu'ils peuvent prendre, on peut également définir leur capacité à se rétrécir si besoin est.


Pour cela, on peut utiliser la propriété `flex-shrink`. Comme pour `flex-grow`, cette propriété CSS accepte des valeurs entières égales ou supérieures à `0`.
[https://developer.mozilla.org/fr/docs/Web/CSS/flex-shrink](https://developer.mozilla.org/fr/docs/Web/CSS/flex-shrink)

Un exemple est disponible ici : [https://codepen.io/nugetchar/pen/vYWYdqQ](https://codepen.io/nugetchar/pen/vYWYdqQ)

**La taille de base**
On peut donc spécifier le comportement des éléments pour qu'ils prennent plus ou moins de place. Mais on peut également leur spécifier leur taille de base !
La propriété `flex-basis` permet de spécifier la taille initiale de l'élément **avant** que l'espace restant ne soit redistribué entre les différents éléments.

La documentation peut-être trouvée ici : [https://developer.mozilla.org/fr/docs/Web/CSS/flex-basis](https://developer.mozilla.org/fr/docs/Web/CSS/flex-basis).

Voici un exemple avec des images : [https://codepen.io/nugetchar/pen/LYOYrPb](https://codepen.io/nugetchar/pen/LYOYrPb).

Dans cet exemple, j'applique la règle CSS `flex-basis: 350px` aux éléments contenant les images afin que leur largeur de base soit de 350px. Et, juste en-dessous, en utilisant la règle CSS `flex-grow: 1`, j'indique que s'ils ont de la place, ils peuvent prendre plus que `350px` de largeur.

Le fait qu'ils puissent passer à la ligne est dû au `flex-wrap: wrap` ajouté sur le conteneur.

**La propriété `flex`**
Cela peut être rébarbatif d'écrire à chaque fois les trois propriétés `flex-grow`, `flex-shrink` et `flex-basis`. C'est pour cela qu'il existe la propriété `flex`, qui permet d'indiquer les trois en une seule ligne de code :

```css
selecteur {
	flex: <flex-grow> <flex-shrink> <flex-basis>;
}
```

#### Aligner un seul élément
De la même manière que la propriété `align-items` se place sur le conteneur et aligne les éléments sur le *cross-axis*, la propriété `align-self` se place sur un ou plusieurs éléments et permet de les aligner indépendamment de l'alignement spécifié avec `align-items`.


## Exercices
Pour bien nous entraîner, nous allons faire plusieurs exercices ainsi qu'un TP qui sera à rendre.

### Froggy Flexbox
Froggy Flexbox est une suite de mini exercices dont le but est de toujours placer les grenouilles sur les bons nénufars. Rendez-vous ici : [http://flexboxfroggy.com/#fr](http://flexboxfroggy.com/#fr)

### Le TP
Ce TP va mettre à contribution ce que nous avons vu auparavant, ainsi que les concepts de Flexbox.

J'ai développé un site en apparence très simple, qui génère des messages de façon automatique : [https://confident-wright-758699.netlify.app/](https://confident-wright-758699.netlify.app/). La version en ligne fonctionne et est ce vers quoi vous allez devoir tendre.

De votre côté, je vous donne une base de travail : [TP Flexbox]({{ site.url }}/assets/tp_flexbox/TP_Flexbox.zip).
Dans cette base de travail, les messages sont également générés (partie JavaScript fonctionnelle), mais l'intégration CSS est complètement cassée ! En mettant en œuvre les notions vues en cours concernant les positions, les marges (internes, externes), et bien évidemment Flexbox que nous venons de voir, essayez de reproduire un site à l'identique de celui que je vous ai fourni.

#### Méthodologie
Avant de foncer tête baissée, voyons comment est faite l'architecture de ce site :

- un fichier `index.html` contient tout le site. Dans le code, on peut voir un `main` dans lequel on trouve une `div` de classe `message-list`. Cette dernière `div` est le bloc qui contient tous les messages ;
- dans le fichier `scripts/app.js` se trouve toute la mécanique de génération des messages. Ce fichier ne nous intéresse pas ici ;
- dans le fichier `styles/style.css` se trouve le style que vous allez devoir compléter pour menez à bien votre objectif.

**Quelles sont les besoins ?**

1. le `main` doit avoir des **marges internes** de `8px` de chaque côté ;
2. le `main` doit avoir une **hauteur** qui prend **toute la hauteur de la fenêtre** (pensez aux marges internes et à utiliser [`calc`](https://developer.mozilla.org/fr/docs/Web/CSS/calc%28%29)) ;
3. le `main` doit être un **conteneur flex** ;
4. les éléments à l'intérieur du `main` doivent être **centrés** horizontalement et verticalement ;
5. les éléments à l'intérieur du `main` doivent pouvoir **aller à la ligne** si besoin ;
6. il doit y avoir un **espacement** entre les éléments du `main` de `8px` (lignes comme colonnes) ;
7. la **liste de messages** doit avoir une **largeur** de `90%` de la largeur disponible ;
8. elle doit avoir une **hauteur** de `80%` de son parent ;
9. elle doit être un **conteneur flex** ;
10. les éléments qui la constituent doivent pouvoir **aller à la ligne** (`flex-wrap`);
11. il doit y avoir un `row-gap` de `8px` ;
12. selon le *cross-axis*, les éléments doivent être **remontés vers le haut** (`align-content`) ;
13. les messages doivent avoir **une largeur** de `100%` ;
14. ils doivent également avoir une **hauteur minimale** de `75px` ;
15. ils doivent avoir une **marge interne** de `8px` ;
16. les messages de type `notice` doivent être indépendants du scroll *et* conserver leur emplacement dans le flux d'affichage ;
17. les `notices` doivent également avoir un décalage par rapport au haut de `0` ;
18. leur **ordre d'affichage** doit être avant celui des messages classiques ;
19. ils doivent également s'afficher **au-dessus** des messages classiques lorsque l'on fait défiler les messages ;
20. le bouton de fermeture d'une notice doit être sorti du flux d'affichage et avoir un décalage de `8px` par rapport au haut et à la droite.
