---
layout: post
title: "Cours Développement Frontend - Media Queries"
date: 2022-02-24 12:25:11 +0200
categories: [cours, 1A, frontend]
---
# CSS - *Media Queries*

Nous allons voir aujourd'hui une fonctionnalité de CSS : les *media queries*.

Les *media queries* répondent au besoin suivant : modifier l'apparence générale d'un site web en fonction de la taille de l'écran sur lequel il est affiché. Par exemple, si vous allez sur Twitter, l'affichage du site ne sera pas le même selon que vous avez un grand écran ou un petit écran : dans le premier cas, vous aurez de la place pour afficher et disposer un nombre conséquent d'informations sur la page, et dans le second, vous allez devoir prioriser les éléments à afficher.

Votre *layout* (disposition) va donc changer en fonction de la taille de votre écran.

**Ok, mais on ne pouvait pas déjà changer la disposition avec Grid ou Flexbox ?**
Effectivement, Grid et Flexbox permettent de modifier la disposition, mais ne vous permettent pas de gérer précisément le style de tous les éléments de votre page selon l'écran.

Ici, les *media queries*, comme nous allons le voir, vont permettre de littéralement modifier le CSS de notre page.

## Syntaxe des *media queries*
Pour commencer, toute la documentation sur les *media queries* peut-être trouvée ici : [https://developer.mozilla.org/fr/docs/Web/CSS/Media_Queries/Using_media_queries](https://developer.mozilla.org/fr/docs/Web/CSS/Media_Queries/Using_media_queries).

Une *media query* va s'écrire dans un fichier CSS, et commencera toujours par `@media`.

Voici un exemple de *media query* : [https://codepen.io/nugetchar/pen/zYPWxyG](https://codepen.io/nugetchar/pen/zYPWxyG).

Dans cet exemple très simple, vous remarquez le code CSS suivant : 
```css
.square {
  width: 300px;
  height: 300px;
  background-color: red;
}

@media (min-width: 700px) {
  .square {
    background-color: blue;
  }
}
```

Ici, la *media query* indique un style à n'appliquer que pour **les tailles d'écrans d'au-moins 700px** de largeur.

Un autre exemple est disponible ici : [https://codepen.io/nugetchar/pen/wvPejeM](https://codepen.io/nugetchar/pen/wvPejeM) .

Cet exemple, déjà plus fourni, permet de spécifier des styles relativement différents selon que la personne soit en format *desktop* ou *mobile*.

Mais ce n'est pas tout ! Une *media query* doit également se voir préciser :

- son ou ses types;
- sa ou ses caractéristiques;
- zéro ou plusieurs opérateurs logiques pour combiner types et caractéristiques.

### Le type d'une *media query*
Il en existe quatre :

- `all` :  concernera absolument tous les appareils;
-  `print` : concernera la mise en forme pour l'impression;
- `screen` : concernera les appareils dotés d'un écran;
- `speech` : concernera les outils de synthèse vocale.

Par défaut, le type de média utilisé est **all**.

### Les caractéristiques d'une *media query*
Il y en a beaucoup trop pour les lister ici, et celles que nous verrons cette année seront les suivantes :

- `min-width` et `max-width` : permettent de définir la taille minimale ou maximale à partir de laquelle une *media query* va s'appliquer ;
- `orientation` : permet de définir l'orientation de l'écran pour laquelle la *media query* s'applique.

### Les opérateurs logiques
Il est possible de combiner plusieurs *media queries* avec ce que l'on appelle des **opérateurs logiques**.
Ces opérateurs logiques sont les suivants : 

- `and` permet de combiner plusieurs sous-requêtes en une seule ;
- `not` permet de traiter l'inverse d'une requête ;
- `only` pour spécifier que **l'intégralité de la requête** doit être vraie pour être appliquée ;
- la virgule `,` qui agit comme un `OU` inclusif.

## Exercices
Il est dorénavant temps de passer à la pratique !

Cette suite d'exercice a pour but de vous familiariser avec l'écriture des *media queries*. Le but est, à chaque fois, d'écrire la bonne *media query* et d'y placer le bon code CSS.

### Exercice 1
En partant du CodePen suivant, faites en sorte que le CSS donné ci-après ne s'applique que **pour les tailles d'écran** supérieures à `45Opx` de largeur. 

CodePen : [https://codepen.io/nugetchar/pen/MWOVyGe](https://codepen.io/nugetchar/pen/MWOVyGe)

CSS : 
```css

header {
  height: auto;
}

.header__info {
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap-reverse;
}

.header__logo {
  position: relative;
  width: auto;
  height: 50px;
}
```
 Pour cela, aidez-vous de la syntaxe donnée en exemple au début du cours. Pour vérifier que votre code fonctionne correctement, redimensionnez la zone de rendu sur CodePen !


### Exercice 2

Cette fois-ci, partez du CodePen suivant et faites en sorte que le CSS donné ci-après ne s'applique que pour les tailles d'écran inférieures à `600px`.

CodePen : [https://codepen.io/nugetchar/pen/KKyoeJd](https://codepen.io/nugetchar/pen/KKyoeJd)

CSS :
```css
main {
  padding: 0;
  min-height: calc(100vh - 32px);
  height: auto;
}
.container {
  flex-direction: column;
  height: auto;
}
.container > img {
  flex: auto;
}
```

### Exercice 3
En partant du CodePen suivant, faites en sorte que le CSS donné ci-après ne s'applique que lorsque l'orientation de l'écran est en mode "paysage" (`landscape`).

CodePen : [https://codepen.io/nugetchar/pen/LYOdBoK](https://codepen.io/nugetchar/pen/LYOdBoK)

CSS : 
```css
.weekly__review > table {
  display: none;
}

.chart-container {
  display: block;
  margin: auto;
}
```

## *Mobile first* vs *Desktop first*
Lorsque l'on développe un site web ou bien une application web, il est très important de le rendre *responsive*. Comme expliqué en cours, *responsive* signifie que le site s'adaptera à un maximum de tailles d'écrans : des plus petits écrans de nos *smartphones* aux plus grands écrans.

Pour cela, lorsque l'on développe un site, il existe deux approches : *mobile first* et *desktop first*. La première consiste à se focaliser sur l'apparence que va prendre le site sur les petits écrans, pour ensuite aller vers les grandes tailles.

C'est ce que nous avons fait dans le premier exercice : le CSS s'appliquait déjà pour une taille d'écran relativement petite, et la *media query* ajoutée permettait d'avoir un style différent et plus adapté aux grandes tailles d'écran.

Le seconde, quant à elle, consiste à considérer que la taille *desktop* sera la plus représentative de la complexité du site ou de l'app que nous développons. C'est ce que nous avons fait lors du deuxième exercice.

Il y a des avantages aux deux approches, ainsi que des inconvénients, mais voici ce qu'il faut retenir avant de privilégier l'une ou l'autre : **une expérience sur mobile n'est jamais la même que sur desktop**.
Cela signifie que votre version *desktop* ne sera pas une version "plus grande" de votre version mobile, et inversement ! Les deux versions de votre site / app peuvent, et doivent être différentes !

Du fait des contraintes d'affichage sur mobile, vous aurez à réagencer l'information !
Sur *desktop*, il sera tentant de rendre vos pages trop riches, ou à l'inverse trop pauvres de peur de les surcharger.

En tant que *designers*, votre rôle sera de proposer des solutions optimales pour les différentes tailles d'écrans.
En tant que développeurs et développeuses, vous aurez à prendre en considération :
- la maintenance de votre code ;
- la taille de votre code ;

Pour aller plus loin sur ce point, je vous invite à lire l'article d'**Ahmad Shadeed** qui explique sa vision avec clarté : [https://ishadeed.com/article/the-state-of-mobile-first-and-desktop-first/](https://ishadeed.com/article/the-state-of-mobile-first-and-desktop-first/).
