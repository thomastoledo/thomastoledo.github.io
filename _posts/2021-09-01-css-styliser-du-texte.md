---
layout: post
title: "Cours Développement Frontend - Styliser du texte"
date: 2021-12-04 12:23:11 +0200
categories: [cours, 1A, frontend]
---
# CSS - Styliser du texte

Nous allons voir dans ce cours les différentes manières de styliser du texte. Les propriétés CSS que nous allons voir concerneront :
- le style de la police d'écriture ;
- le style du texte en lui-même.

Voici les propriétés CSS que nous allons voir :
- `font-family`: [https://developer.mozilla.org/fr/docs/Web/CSS/font-family](https://developer.mozilla.org/fr/docs/Web/CSS/font-family) ;
- `font-size` : [https://developer.mozilla.org/fr/docs/Web/CSS/font-size](https://developer.mozilla.org/fr/docs/Web/CSS/font-size) ;
- `font-style` : [https://developer.mozilla.org/fr/docs/Web/CSS/font-style](https://developer.mozilla.org/fr/docs/Web/CSS/font-style) ;
- `font-weight` : [https://developer.mozilla.org/fr/docs/Web/CSS/font-weight](https://developer.mozilla.org/fr/docs/Web/CSS/font-weight) ;
- `line-height` : [https://developer.mozilla.org/fr/docs/Web/CSS/line-height](https://developer.mozilla.org/fr/docs/Web/CSS/line-height) ;
- `text-decoration` : [https://developer.mozilla.org/fr/docs/Web/CSS/text-decoration](https://developer.mozilla.org/fr/docs/Web/CSS/text-decoration) ;
- `text-align` : [https://developer.mozilla.org/fr/docs/Web/CSS/text-align](https://developer.mozilla.org/fr/docs/Web/CSS/text-align) ;
- `text-transform` : [https://developer.mozilla.org/fr/docs/Web/CSS/text-transform](https://developer.mozilla.org/fr/docs/Web/CSS/text-transform) 

## Styliser la police d'écriture

### Comment modifier sa police d'écriture ?
Pour commencer, voyons la propriété CSS `font-family` ([https://developer.mozilla.org/fr/docs/Web/CSS/font-family](https://developer.mozilla.org/fr/docs/Web/CSS/font-family)). Cette propriété CSS permet de spécifier la police d'écriture qui sera utilisée sur tout ou partie du site web.

Elle permet de définir une liste de polices d'écritures à utiliser, par ordre de préférence.

#### Les polices inclues dans le navigateur
Un exemple permet de voir comment cela fonctionne : [https://codepen.io/nugetchar/pen/ExwxZXg](https://codepen.io/nugetchar/pen/ExwxZXg).
Dans cet exemple, nous avons la structure HTML suivante :

```html
<main class="container">
  <h1 class="arial">Exemple font-family - this title is in Arial</h1>
  <section class="georgia">
    <h2>This title is in Trebuchet MS</h2>
    <p>And this paragraph is in Georgia</p>
  </section>
  <section>
    <h2 class="garamond">This title should be in Garamond (but is in Arial)</h2>
    <p>And this paragraph? It's in Courier New</p>
  </section>
</main>
```

Et le CSS suivant :

```css
.container {font-family: 'Courier New';}
.arial {font-family: 'arial';}
.georgia {font-family: 'Georgia';}
h2 {font-family: 'Trebuchet MS';}
.garamond {font-family: 'Garamond', arial;}
```
L'élément de classe `container` porte la police d'écriture `Courier New`, qui est une police d'écriture "inclue" dans votre navigateur. Ainsi, et normalement, tous ses éléments descendants doivent adopter la même police d'écriture.

Pourtant, ce n'est pas le cas !
En effet, les éléments descendants sont quasiment tous affectés par une autre police d'écriture :

- le titre `h1` par la police `arial` ;
- les éléments de la section de classe `georgia` par la police `georgia` ;
- le premier titre `h2` par la police `Trebuchet MS` ;
- le deuxième titre `h2` par la police `arial` (j'y reviendrai juste après) ;
- le tout dernier paragraphe, enfin, est quant à lui bel et bien affecté par la police du `main`, à savoir `Courier New`.

Avec ce comportement, on peut donc formaliser la manière dont tout ou partie de l'arborescence de la page va être affectée par la police d'écriture :

La **police d'écriture** d'un élément, si elle ne lui est **pas spécifiée**, sera celle du **premier de ses ancêtres** ayant lui-même une **police d'écriture spécifiée**. Si **aucun** ancêtre ne **correspond**, alors **l'élément** en question aura la **police d'écriture** par défaut du **navigateur**.

Il reste un dernier point quant à notre exemple : le deuxième titre `h2`, portant la classe `Garamond`, n'est pourtant pas affecté de la police `Garamond`, mais de la police `arial`. Au début de cette partie, j'ai indiqué que la **propriété CSS** `font-family` pouvait recevoir une **liste de polices d'écriture**. Cela permet d'avoir ce que l'on appelle un **fallback**.

En somme, lorsque la première police n'est pas disponible sur le navigateur, c'est la suivante qui est appliquée. Et si aucune de celles spécifiées n'est appliquée, alors la police appliquée est déterminée par la règle que nous avons formalisé précédemment.

#### Les polices dites "custom"
Toutes les polices ne sont pas prises en charge par votre navigateur, et heureusement ! Ce dernier, grâce à CSS, peut néanmoins traiter des polices de votre propre création ou de quelqu'un d'autre.

Pour nous entraîner, nous allons voir comment importer une police d'écriture dans un site web.
Il existe des sites proposant des polices d'écriture gratuites et payantes.

Voici une liste de sites proposant des polices d'écriture gratuites :

- [https://www.dafont.com/fr/](https://www.dafont.com/fr/) ;
- [https://www.fontsquirrel.com/](https://www.fontsquirrel.com/) ;
- [https://fonts.google.com/](https://fonts.google.com/).

Dans l'exemple suivant [https://codepen.io/nugetchar/pen/zYEYwpV?](https://codepen.io/nugetchar/pen/zYEYwpV), j'utilise Google Font pour importer différentes polices d'écritures.

**Exercice :** à votre tour, suivez les instructions ci-après pour vous faire la main et apprendre à importer des polices d'écriture avec Google Font.

- allez sur le CodePen [https://codepen.io/nugetchar/pen/RwLwVOg](https://codepen.io/nugetchar/pen/RwLwVOg) ;
- ouvrez également un onglet sur [fonts.google.com/](http://fonts.google.com/);
- sur Google Fonts, cherchez une police d'écriture qui vous convient, et cliquez dessus ;
- vous arrivez alors sur la page de détail de la police d'écriture : choisissez les styles qui vous conviennent !
- en bas à droite se trouve deux options : `<link>` et `@import`. La première est pour inclure les ressources via le HTML, la seconde pour les inclure directement dans le CSS ;
- enfin, le code à écrire se trouve tout en bas (il faut probablement scroller un peu) ;
- utilisez ce code pour appliquer votre police d'écriture au titre ainsi qu'aux paragraphes sur le CodePen.


### Modifier la taille de la police
Pour modifier la taille d'une police, on utilise la propriété CSS `font-size`.

`font-size` prend des valeurs numériques positives, et accepte des unités diverses : `px`, `em`, `rem`, `%`...
Etant donné qu'il n'est pas rare de retrouver des unités différentes d'un projet à l'autre, voici quelques exercices pour vous familiariser avec.

#### Exercice 1
Dans le CodePen suivant, spécifiez les tailles de texte suivantes :

-   `14px` pour tout le `body` ;
-   `48px` pour le `h1` ;
-   `32px` pour les `h2` ;
-   `20px` pour les `h3` ;
-   `16px` pour les `h4`.

[https://codepen.io/nugetchar/pen/gOMqEzy](https://codepen.io/nugetchar/pen/gOMqEzy)

#### Exercice 2
Dans cet exercice, nous allons travailler avec les unités de mesure `em` et `rem`.
Dans le CodePen suivant, affectez les tailles de texte suivantes :

[https://codepen.io/nugetchar/pen/dyXaLMr](https://codepen.io/nugetchar/pen/dyXaLMr)

-   `3em` pour le `h1` ;
-   `2em` pour les `h2` ;

Jusque là, vous devriez voir que les tailles des titres `h1` et `h2` sont les mêmes que lors du précédent exercice. Pour vous en convaincre, remplacez `3em` par `48px` et `2em` par `32px`.
Vous verrez alors que la taille ne change pas ! 
La raison est la suivante : l'unité de mesure `em` est particulière car c'est une unité de mesure dite **relative**. Mais **relative à quoi** ?

Dans une arborescence HTML, si un parent a une taille d'écriture de `n` pixels, alors son enfant qui aura une taille de `x` `em` aura en réalité une taille d'écriture de **`n` fois `x` pixels**.
Exemple :

```html
<div class="container">
	Du texte en dehors du pragraphe
	<p>Un paragraphe</p>
</div>

<style>
	div.container {
		font-size: 12px;
	}
	p {
		font-size: 2em;
	}
</style>
```
Ici, la taille **en pixels** du texte **dans le pragraphe** sera donc de **2 fois 12 pixels**, soit **24 pixels**, tandis que celle du texte en dehors du paragraphe sera de 

On peut donc formaliser ce comportement en disant que **si un texte a une taille spécifiée en `em`, alors elle sera égale à `x` fois la taille de son parent en pixels**.

Mais une question subsiste : que se passe-t-il si le parent a une taille également spécifiée en `em`, voire aucune taille de spécifiée ?

Que se passe-t-il dans le cas de figure suivant ?
```html
<div class="container">
	Du texte en dehors du pragraphe
	<p>Un paragraphe</p>
</div>
<style>
	p {
		font-size: 2em;
	}
</style>
```

La seule différence entre ce cas là et le précédent, c'est qu'ici je n'ai pas spécifié de taille pour la `div` de classe `container`.

il faut savoir que le navigateur propose une `font-size` par défaut pour l'élément `<html></html>`. Généralement, cette taille est de `16px`. Ainsi, par défaut, la taille d'un texte dans un navigateur (excepté titres) est de `16px`.

Sachant cela, voilà comment formaliser la manière dont le navigateur fonctionne pour les tailles de texte :

**La taille d'un texte spécifié en `em` sera calculée par rapport à la taille de texte du premier élément ancêtre ayant une taille spécifiée. Si aucun élément ancêtre n'a de taille spécifiée, alors cela se fera par rapport à la taille par défaut du navigateur**.

Poursuivons maintenant l'exercice :

-   `2rem` pour les `h3` ;
-   `1.2rem` pour les `h4` ;

Vous voyez que la taille du `h3` (`2rem`) n'est pas la même que celle du `h2` (`2em`) : nous voyons ici une différence entre `rem` et `em` : une taille spécifiée en `rem` sera toujours **relative à la taille de la racine du document HTML, à savoir l'élément `html`, ou encore la taille par défaut du navigateur**.

-   `14px` pour tout le `body`.

Au travers de cet exercice, vous pouvez déjà vous faire une idée sur l'unité que vous allez vouloir utiliser lorsque vous mettrez en forme vos textes. Personnellement, je n'utilise jamais l'unité de mesure `em`, que je trouve très "casse-figure", et très occasionnellement l'unité de mesure `rem`. Je préfère m'en tenir aux `px`, mais cela reste subjectif. 

### Mettre du texte en gras et en italique
Pour mettre du texte en gras et en italique, on serait tenté d'utiliser les balises `<b></b>` ([https://developer.mozilla.org/fr/docs/Web/HTML/Element/b](https://developer.mozilla.org/fr/docs/Web/HTML/Element/b)) et `<i></i>` ([https://developer.mozilla.org/fr/docs/Web/HTML/Element/i](https://developer.mozilla.org/fr/docs/Web/HTML/Element/i)).

Ces deux balises étaient historiquement utilisées à ces fins : aujourd'hui, on préfèrera utiliser les propriétés CSS `font-weight` ([https://developer.mozilla.org/fr/docs/Web/CSS/font-weight](https://developer.mozilla.org/fr/docs/Web/CSS/font-weight)) et `font-style`([https://developer.mozilla.org/fr/docs/Web/CSS/font-style](https://developer.mozilla.org/fr/docs/Web/CSS/font-style)).

Les propriétés `font-style` et `font-weight` s’utilisent comme suit :

```
font-style: normal | italic | oblique;
font-weight: 100 | 200 | ... | 900 | bold | bolder | lighter | normal;
```

Pour `font-style` : `italic` et `oblique` peuvent avoir le même comportement, sauf si la police utilisée possède une version dite `oblique`, auquel cas il sera possible de spécifier l’angle d’inclinaison.
  

Pour `font-weight`, les valeurs `100` à `900` peuvent ne montrer aucune différence, par exemple entre `200` et `300`, si la police utilisée ne propose pas toutes les variations de graisse possible. De plus : `normal` équivaut au niveau `400` et `bold` au niveau `700`.

#### Exercice

Dans le CodePen suivant, on utilise une police ayant quelques variations pour `oblique`.

Affectez les styles et graisses suivantes :

-   `italic` pour les éléments de classe `italic` ;
-   `oblique 30deg` (oblique avec une orientation de 30degrés) pour les éléments de classe `oblique-30deg` ;
-   `oblique 20deg` pour les éléments de classe `oblique-20deg` ;
-   une graisse de `100` pour les éléments de classe `weight-100` ;
-   une graisse de `800` pour les éléments de classe `weight-800` ;
-   une graisse `bolder` pour les éléments de classe `weight-bolder` ;
-   une graisse `lighter` pour les éléments de classe `weight-lighter`.

[https://codepen.io/nugetchar/pen/GRqzaZm](https://codepen.io/nugetchar/pen/GRqzaZm).


### Modifier la hauteur d'une ligne
Pour améliorer la lisibilité d'un texte, on peut modifier la hauteur des lignes avec la propriété `line-height`.

La propriété `line-height` s’utilise comme suit :

```
line-height: 150% ;
line-height: 2 ;
line-height: 3em ;
line-height: 30px ;
```

Dans le CodePen suivant, spécifiez les hauteurs de lignes suivantes :

-   `20px` pour la classe `line-height-20px` ;
-   `2` pour la classe `line-height-2` ;
-   `3em` pour la classe `line-height-3em` ;
-   `1000%` pour la classe `line-height-1000-percent`.

[https://codepen.io/nugetchar/pen/MWeLdBM](https://codepen.io/nugetchar/pen/MWeLdBM)

Vous remarquez alors plusieurs choses :
- pour la hauteur de `20px`, sans surprise : c'est `20px` ;
- pour la hauteur de `2`, sans unité spécifiée, il y a également un effet : j'expliquerai juste après comment le navigateur traite ce cas particulier ;
- pour la hauteur de `3em`, cela fonctionne comme pour `font-size` ;
- enfin, pour la hauteur de ligne de `1000%`, cela se fera par rapport à la taille d'écriture ;

## Styliser du texte
Nous venons de voir comment modifier la police d'écriture d'un texte. Nous allons maintenant voir, au travers d'exemples, comment styliser du texte de manière globale.

### Souligner du texte
Outre la balise `<u></u>` connue pour permettre de souligner du texte, il existe la propriété CSS `text-decoration` ([https://developer.mozilla.org/fr/docs/Web/CSS/text-decoration](https://developer.mozilla.org/fr/docs/Web/CSS/text-decoration)) qui offre plus de fonctionnalités.

Elle s’utilise comme suit :
```
text-decoration: underline dotted black;
```

Dans le CodePen suivant, et suivez les instructions décrites dans le HTML : [https://codepen.io/nugetchar/pen/yLJwBLx](https://codepen.io/nugetchar/pen/yLJwBLx).

### Alignement du texte

La propriété CSS `text-align` indique l’alignement d’un texte. Ses principales valeurs possibles sont `left` (défaut), `center`, `right` et `justify`. Cette dernière indique que chaque ligne de texte doit prendre la largeur disponible. Attention également : du texte justifié peut rendre la lecture difficile à certaines personnes, atteintes par exemple de dyslexie ou de troubles cognitifs.

#### Exercice

Sur le CodePen suivant, rendez le deuxième paragraphe aligné à droite, le troisième centré et le quatrième justifié. Pour cela, vous pouvez mettre une classe ou un ID à chaque paragraphe, ou bien vous pouvez essayer d'utiliser la pseudo-classe `:nth-of-type()` ([https://developer.mozilla.org/fr/docs/Web/CSS/:nth-of-type](https://developer.mozilla.org/fr/docs/Web/CSS/:nth-of-type)).

[https://codepen.io/nugetchar/pen/QWEYXjX](https://codepen.io/nugetchar/pen/QWEYXjX)


### Transformation du texte

On peut utiliser la propriété `text-transform` pour transformer du texte : mise en majuscule, en minuscules, juste la première lettre de chaque mot en capitale… Sa documentation se trouve ici : [`text-transform` sur MDN](https://developer.mozilla.org/fr/docs/Web/CSS/text-transform).

#### Exercice 

Sur le CodePen suivant :

-   mettez tous les titres en majuscule avec `text-transform` ;
-   mettez le titre `h1` en `capitalize` ;
-   faites en sorte que chaque lettre de début de chaque paragraphe ait une taille de `130%` et soit en majuscule ; pour cela, aidez-vous du pseudo-élément `::first-letter` ([https://developer.mozilla.org/fr/docs/Web/CSS/::first-letter](https://developer.mozilla.org/fr/docs/Web/CSS/::first-letter))

[https://codepen.io/nugetchar/pen/mdEvNrb](https://codepen.io/nugetchar/pen/mdEvNrb)

