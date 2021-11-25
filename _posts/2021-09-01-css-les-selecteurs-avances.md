---
layout: post
title: "Cours Développement Frontend - Les sélecteurs avancés"
date: 2021-09-01 12:23:11 +0200
categories: [cours, 1A, frontend]
---

# Cours Développement Frontend - Les sélecteurs avancés
Nous avons vu les sélecteurs simples ainsi que leurs spécificités. Nous allons maintenant voir les sélecteurs avancés.

Un sélecteur avancé n'est autre qu'une combinaison de sélecteurs simples. Il y a plusieurs types de combinaisons.

## Les combinaisons
### Le sélecteur de descendants
Ce sélecteur permet de sélectionner les noeuds (éléments) qui sont les descendant d'un ou plusieurs autres éléments.

Par exemple, dans le code suivant :

```html
<div id="favorites">
	<h2>Boissons favorites</h2>
	<ul>
		<li>Lait d'avoine</li>
		<li>Chocolat Chaud</li>
		<li>Huile de moteur</li>
	</ul>
	
	<h2>Plats favoris</h2>
	<ul>
		<li>Bourguignon</li>
		<li>Pizza</li>
		<li>Quiche</li>
	</ul>
</div>

<div id="activities">
	<h2>Activités</h2>
	<ul>
		<li>Boxe</li>
		<li>Escalade</li>
		<li>Peinture</li>
		<li>Ecriture</li>
	</ul>
</div>
```

On pourrait sélectionner tous les éléments `li` en utilisant le sélecteur suivant :
```css
li {
/* on mettrait ensuite les instructions CSS que l'on veut*/
}
```
Mais comment faire pour sélectionner **uniquement** les éléments `li` de la `div` d'ID `favorites` ?

Dans ce cas là, le **sélecteur de descendants** pourra être très utile. On aura ainsi le sélecteur suivant :

```css
#favorites li {
/* on mettrait ensuite les instructions CSS que l'on veut*/
}
```

Le sélecteur de descendants est donc **un simple espace** entre deux sélecteurs simples.

**Question :** à votre avis, quelle est la spécificité, dans notre cas, d'un tel sélecteur ?

### Le sélecteur d'éléments enfants
Un peu plus spécifique que le précédent, ce sélecteur ne va atteindre que les descendants directs. Son symbole est un chevron ouvrant (signe supérieur `>`).

Si on reprend le code HTML suivant :

```html
<div id="favorites">
	<h2>Boissons favorites</h2>
	<ul>
		<li>Lait d'avoine</li>
		<li>Chocolat Chaud</li>
		<li>Huile de moteur</li>
	</ul>
	
	<h2>Plats favoris</h2>
	<ul>
		<li>Bourguignon</li>
		<li>Pizza</li>
		<li>Quiche</li>
	</ul>
</div>

<div id="activities">
	<h2>Activités</h2>
	<ul>
		<li>Boxe</li>
		<li>Escalade</li>
		<li>Peinture</li>
		<li>Ecriture</li>
	</ul>
</div>
```

Si pour sélectionner les éléments `li` au sein de la `div` d'ID `favorites` j'écris le sélecteur CSS suivant :

```css
#favorites > li {}
```

Mon sélecteur n'atteindra aucun élément : en effet, **aucun des éléments descendants directs** de la `div` d'ID `favorites` n'est un élément `li`. Pour les atteindre en utilisant le sélecteurs d'éléments enfants, il faudrait écrire :

```css
#favorites > ul > li {}
```

**Question 1 :** à votre avis, quelle est la spécificité, dans notre cas, d'un tel sélecteur ?
**Question 2 :** En partant du code HTML précédent, et en vous basant sur le code CSS suivant, quelle sera la taille de police d'écriture des éléments `li` ?

```css
#favorites ul > li {
	font-size: 20px;
}

#favorites > ul > li {
	font-size: 16px;
}

#favorites li {
	font-size: 24px;
}
```

### Le sélecteur de voisins
Tout comme le sélecteur de descendants permet de sélectionner des éléments descendants, peu importe leur hiérarchie au sein de l'élément parent, le sélecteur de voisins permet de sélectionner des éléments voisins, peu importe leur position.

Le symbole de ce sélecteur est la tilde `~`.

Prenons le code HTML suivant :
```html
<section>
	<h1>Contract List</h1>
	<p>Your contract List</p>
	<ul>
		<li>
			<p>Contract 1</p>
			<p>Description contract 1</p>
			<p>Bénéficiaires : ...</p>
		</li>
		<li>
			<p>Contract 2</p>
			<p>Description contract 3</p>
			<p>Bénéficiaires : ...</p>
		</li>
		<li>
			<p>Contract 3</p>
			<p>Description contract 3</p>
			<p>Bénéficiaires : ...</p>
		</li>
	</ul>
</section>
```

Pour sélectionner chaque paragraphe suivant le titre d'un contrat, on pourrait faire :

```css
p ~ p {/*...*/}
```


### Le sélecteur de voisins directs
De la même manière que le sélecteur d'enfants directs permet de sélectionner les éléments enfants directs, ce sélecteur permet de sélectionner les voisins directs.
Son symbole est le signe `+`.

**Question :** En reprenant le code suivant, comment faire pour ne sélectionner QUE le second paragraphe de chaque élément de liste.

## Appliquer un même style pour plusieurs sélecteurs
Pour appliquer un même style pour plusieurs sélecteurs, il suffira d'utiliser la virgule :

```css
sélecteur1, sélecteur2, ..., sélecteurn {}
```

## Exercices - calcul de spécificités 

Pour chaque cas ci-dessous, calculez la spécificité correspondante.

```html
<section>
	<h2>Favoris</h2>
	<h3 id="title-favorite-activities">Activités favorites</h3>
	<ul class="favorite-list">
		<li>Lire</li>
		<li>Peindre</li>
		<li class="highlight">Coder</li>
		<li>Twitch</li>
	</ul>

	<h3 id="title-favorite-drinks">Boissons préférées</h3>
	<ul id="drink-list">
		<li class="drink-item">Jus d'orange</li>
		<li class="drink-item highlight">Jus de mangue</li>
		<li class="drink-item">Thé</li>
	</ul>
<section>
```

### Cas 1
```css
.favorite-list li.highlight {}
```

### Cas2
```css
section > ul > li.highlight {} 
```

### Cas 3
```css
section > ul .highlight {} 
```

### Cas 4
```css
.title-favorite-activities {}
```

### Cas 5
```css
section .drink-list > .drink-item.highlight {}
```
