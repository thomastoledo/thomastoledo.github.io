---
layout: post
title: "Cours Développement Frontend - Les sélecteurs simples"
date: 2021-05-11 12:21:11 +0200
categories: [cours, 1A, frontend]
---

# Cours Développement Frontend - Les sélecteurs simples
 
 Il est désormais temps de nous attaquer au CSS !
 
## Qu'est-ce que le CSS ?
Le CSS est le langage utilisé pour appliquer du style aux éléments d'une page web.

CSS signifie *Cascading Style Sheet*. 

Un fichier CSS porte l'extension `.css`

Un fichier CSS comporte des sélecteurs auxquels on applique des règles CSS. Une règle CSS est définie par une propriété et une valeur.

Par exemple :

```css
h1 {
	color: red;
}
```
Ici, le sélecteur est **h1**. Ce sélecteur comporte une règle CSS, qui est `color: red`. Dans cette règle CSS, la propriété est `color`, et la valeur est `red`.

Dans ce cours, nous allons plutôt nous concentrer sur les différents sélecteurs qui existent et comment ils fonctionnent. 
Mais avant cela, nous allons mettre en place notre environnement de travail !

## Mise en place de l'environnement de travail

Créez, dans un nouveau dossier sur votre ordinateur, un fichier `index.html`, et donnez-lui le contenu suivant :

```html
<!DOCTYPE  html>
<html>
	<head>
	<meta  charset="UTF-8">
	<meta  http-equiv="X-UA-Compatible"  content="IE=edge">
	<meta  name="viewport"  content="width=device-width, initial-scale=1.0">
	<title>Mon CV HTML</title>
	</head>
	<body>
		<header>
			<div>
				<h1>Thomas TOLEDO</h1>
				<p  class="header__subtitle">Développeur frontend passionné</p>
			</div>
			<nav id="menu" class="menu">
				<ul class="menu__list">
					<li><a href="./index.html">Accueil</a></li>
					<li><a href="./work.html">Mon travail</a></li>
					<li><a href="./contact.html">Contact</a></li>
				</ul>
			</nav>
		</header>
		<main>
			<div class="main__container">
				<section>
					<h2>Infos personnelles</h2>
					<ul>
						<li important>email : thomas.toledo[at]eemi.com</li>
						<li important>téléphone : 06.99.99.99.99</li>
						<li>github & dev.to : @nugetchar</li>
						<li>blog technique : nugetchar.github.io/</li>
					</ul>
				</section>
			</div>
		</main>
	</body>
</html>
```

Créez, à côté, un fichier nommé `style.css`. C'est dans ce fichier que nous allons écrire notre code CSS.

## Inclure le fichier CSS
Tel qu'il est, notre code n'inclut pas le fichier CSS. Peu importe ce que nous écrirons dedans , donc, cela n'aura aucun effet sur notre page web. 
Pour que cela fonctionne, entre les balises `<head></head>` du HTML, ajoutez la balise suivante :

```html
<link rel="stylesheet" href="style.css">
```

La balise `link` permet d'inclure des ressources externes dans un fichier HTML.

Une fois que cela est fait, nous pouvons voir les différents sélecteurs.

## Le sélecteur d'éléments

Le sélecteur le plus simple est **le sélecteur d'éléments**. Un sélecteur d'éléments permet d'appliquer un style à **tous les éléments HTML correspondant**.

Pour tester cela, écrivez le code suivant dans votre fichier `style.css`, et ouvrez le fichier `index.html` dans votre navigateur pour voir le résultat :

```css
h1 {
	color: red;
}

h2 {
	color: blue;
}
``` 

Ici, nous sélectionnons tous les éléments `h1` et leur appliquons la couleur rouge. Puis nous sélectionnons tous les éléments `h2` et leur appliquons la couleur bleue.

**Exercice :** appliquez la règle CSS suivante à tous les paragraphes
```css
font-size: 20px;
```

## Le sélecteur de classe
Dans notre code HTML, plusieurs éléments portent l'attribut `class`. 

Nous allons mettre un peu de style sur l'élément portant la classe `header__subtitle`.

Recopiez le code suivant dans votre fichier CSS :
```css
.header__subtitle {
	font-style: italic;
}
```

Vous remarquez que le sélecteur pour une classe n'est pas le même que celui pour un élément : il est préfixé d'un point.

**Exercice :** appliquez le style suivant aux éléments de classe `main__container`

```css
border: 1px solid black;
```

## Le sélecteur d'attributs

Un peu moins utilisé mais tout aussi utile, le sélecteur d'attribut permet de sélectionner des éléments portant un attribut avec une certaine valeur.

Dans le code HTML, j'ai placé deux attributs `important`. Ces attributs ne sont pas natifs HTML, cela signifie que je leur ai donné un nom complètement arbitraire (j'aurais pu marquer `toto`).

Pour appliquer du style aux éléments portant cet attribut, on écrira, par exemple :
```css
[important] {
	font-weight: 800;
}
```
Pour sélectionner des attributs, donc, il faudra utiliser les crochets.

## Le sélecteur d'ID

Pour sélectionner un élément portant un certain ID, par exemple `menu` dans notre code HTML, on utilise un dièse :

```css
#menu {
	background: #4776E6;
	background: -webkit-linear-gradient(to right, #8E54E9, #4776E6);
	background: linear-gradient(to right, #8E54E9, #4776E6);
}
```

## Le sélecteur global
Il existe un sélecteur global : `*`.
Ce sélecteur permet de sélectionner **absolument tous les éléments** de la page. Il est très peu utilisé tel quel, mais peut s'avérer utile pour, par exemple, sélectionner tous les éléments d'un conteneur.
