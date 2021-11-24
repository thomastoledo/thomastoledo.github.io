---
layout: post
title: "Cours Développement Frontend - Les pseudo-classes et les pseudo-éléments"
date: 2021-09-01 12:23:11 +0200
categories: [cours, 1A, frontend]
---

# Cours Développement Frontend - Les pseudo-classes et les pseudo-éléments

Aujourd'hui, nous allons voir les pseudo-classes et les pseudo-éléments.

## Les pseudo-classes
Comme indiqué dans la documentation MDN [https://developer.mozilla.org/fr/docs/Web/CSS/Pseudo-classes](https://developer.mozilla.org/fr/docs/Web/CSS/Pseudo-classes) :

> Une pseudo-classe est un mot-clé qui peut être ajouté à un sélecteur afin d'indiquer l'état spécifique dans lequel l'élément doit être pour être ciblé par la déclaration. La pseudo-classe :hover, par exemple, permettra d'appliquer une mise en forme spécifique lorsque l'utilisateur survole l'élément ciblé par le sélecteur (changer la couleur d'un bouton par exemple).

### Syntaxe
Une pseudo-classe s'ajoute à la fin d'un sélecteur avec deux points :

Exemple :
```css
button:hover {
	background-color: black;
	color: white;
}
```

Le code précédent va indiquer que les boutons, au survol de la souris, auront un fond noir et une couleur d'écriture blanche.

## Les pseudo-éléments
[https://developer.mozilla.org/fr/docs/Web/CSS/Pseudo-elements](https://developer.mozilla.org/fr/docs/Web/CSS/Pseudo-elements)
Si une pseudo-classe permet de spécifier l'état dans lequel un élément doit être pour être ciblé par la déclaration, un pseudo-élément, quant à lui, désigne une partie spécifique d'un élément.
Cette partie est donc "virtuelle", dans le sens où ce n'est pas un véritable élément du DOM. Les plus connus sont `::after` et `::before`, qui permettent de rajouter, respectivement, un pseudo-élément après et avant l'élément ciblé.

### Syntaxe
Un pseudo-élément s'ajoute à la fin d'un sélecteur avec deux fois deux points :

Exemple :
```css
input[type="checkbox"]::before {
	content: '';
	width: 10px;
	height: 10px;
	border: 1px solid black
}
```

## Pratique et exercices
Pour se familiariser avec les pseudo-classes et les pseudo-éléments, rien de tel que de pratiquer !

### Exercice sur les pseudo-classes

En vous aidant de la documentation sur les pseudo-classes et en vous basant sur les commentaires dans le code, essayez de trouver celles qu'il faut ajouter au code CSS : [https://codepen.io/nugetchar/pen/MWvzoPK](https://codepen.io/nugetchar/pen/MWvzoPK).

Cherchez du côté de [hover](https://developer.mozilla.org/fr/docs/Web/CSS/:hover), [active](https://developer.mozilla.org/fr/docs/Web/CSS/:active) et [nth-child](https://developer.mozilla.org/fr/docs/Web/CSS/:nth-child).

### Exercice sur les pseudo-éléments
En vous aidant de la documentation sur les pseudo-éléments :

- ajoutez l'émoticon "📬" à côté des liens portant la classe `contact` ;
- ajoutez l'émoticon "🌔" avant les liens portant la classe `moon` ;
- ajouter l'émoticon "⚡" avant et après les liens portant la classe `whatsnew`.

sur le CodePen suivant : [https://codepen.io/nugetchar/pen/wvqQPjO](https://codepen.io/nugetchar/pen/wvqQPjO).