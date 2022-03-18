---
layout: post
title: "Cours Développement Frontend - Les objets"
date: 2022-03-14 12:26:11 +0200
categories: [cours, 1A, frontend]
---
# JavaScript - Les objets
  
Si les types primitifs sont bien utiles, on peut vite se retrouver limités dans notre façon de représenter les choses lorsque nous codons. Pour cela, nous allons voir aujourd'hui les objets en JavaScript.

## La notion de Prototype
Comme il s'agit d'un cours pour débuter avec JavaScript, je vais rapidement expliquer ce qu'est un "prototype" en JavaScript.

Tout langage de programmation est basé sur un ou plusieurs **paradigmes**. Un paradigme est une **manière de penser**. En JavaScript, nous pensons en terme de **prototypes**.

Vous pouvez voir, pour le moment, un **prototype** comme étant un ensemble de propriétés et de méthodes (fonctions).

Et c'est exactement ce que sont les objets : des ensembles de propriétés et de méthodes permettant la représentation, sous forme de code, de concepts.

Le prototype le plus "haut", duquel héritent tous les autres prototypes, est le prototype `Object`. Il ne peut rien faire de particulier, et à vrai dire nous ne nous en serviront pas par la suite.

## Créer un objet

La manière la plus simple de créer un objet est la suivante :

```js
const obj = {};
```
Ici, nous créons ce que l'on appelle un **objet littéral** vide. Il ne possède aucune propriété et aucune méthode.

Pour créer un objet avec des propriétés, on peut faire comme suit :

```js
const user = {
	username: 'jdoe08',
	age: 27
}
```
Un objet n'est autre qu'un ensemble de propriétés, et une propriété est une paire **clef-valeur**.

## Lire et modifier les propriétés

L'accès aux propriétés d'un objet peut se faire de deux façons :

- avec la notation en point : `obj.myProperty` ;
- avec la notation en tableau : `obj['myProperty']`.

Pour modifier ou créer une nouvelle propriété sur un objet existant, on peut utiliser ces mêmes notations :

```js
const user = {
	username: 'jdoe08',
	age: 27
}

user.firstname = 'John';
user['lastname'] = 'DOE';
```

## Objets imbriqués

Il est également possible d'imbriquer des objets entre eux.

```js
const info = {
	firstname: 'John',
	lastname: 'DOE'
}

const user = {
	username: 'jdoe08',
	age: 27,
	info: info
}

console.log(user); // {username: 'jdoe08', age: 27, info: {firstname: 'John', lastname: 'DOE'} }
```

Une petite subtilité : vous voyez dans l'exemple ci-dessus que j'affecte la constante `info` à la propriété `info`. Il se trouve qu'en JavaScript, lorsqu'une variable a le même nom que la propriété à laquelle on veut l'affecter, on peut simplement donner le nom de la propriété :

```js
const info = {
	firstname: 'John',
	lastname: 'DOE'
}

const user = {
	username: 'jdoe08',
	age: 27,
	info // équivaut à "info: info"
}
```

## Supprimer des propriétés

On peut également supprimer des propriétés d'un objet avec l'opérateur `delete`.

```js
const user = {
	username: 'jdoe08',
	age: 27
};

delete user.age:
console.log(user); // {username: 'jdoe08'}
```

## Ajouter des fonctions à un objet

Bien évidemment, les propriétés d'un objet peuvent aussi être des fonctions. 

```js
const user = {
	username: 'jdoe08',
	firstname: 'John',
	lastname: 'DOE',
	age: 27,
	getFullname: function() {
		return this.firstname + ' ' + this.lastname
	}
}
```

Vous remarquez ici plusieurs choses :

- ma fonction est *anonyme* : il n'y a pas de nom spécifié entre le mot-clef `function` et les parenthèses ;
- pour me référer aux propriétés `firstname` et `lastname` de l'objet, j'utilise un nouveau mot-clef : le mot-clef `this`.

## Le mot-clef `this`

La notion de `this` en JavaScript peut parfois déstabiliser les débutants et les débutantes.
Ce mot-clef permet de faire référence à **l'objet courant**.

Dans l'exemple précédent, dans la méthode `getFullname`, le mot-clef `this` fait référence à l'objet courant, à savoir `user`.

Il y a néanmoins un cas pour lequel cela n'est pas vrai : les **fonctions fléchées**. 
Prenons l'exemple suivant :

```js
const user = {
	username: 'jdoe08',
	firstname: 'John',
	lastname: 'DOE',
	age: 27,
	getFullname: () => {
		return this.firstname + ' ' + this.lastname
	}
}
```
En remplaçant notre fonction par une fonction fléchée, vous vous rendez-compte que `user.getFullname()` ne retourne plus `"John DOE"`, mais `"undefined undefined"`.

Je ne rentrerai pas dans les détails dans ce cours, mais : dans une **fonction fléchée**, le mot-clef `this` fait référence au *scope* **englobant**.

Cela signifie que, lorsque vous utilisez `this` dans une fonction fléchée, ce mot-clef ne référencera pas l'objet qui appellera la fonction.

## Lister les clefs et les valeurs d'un objet

Il est possible de transformer, sous forme de liste, les clefs et les valeurs d'un objet. Cela peut se faire via trois méthodes :

- `Object.keys(obj)` : retourne un tableau contenant le nom des propriétés d'un objet `obj` ;
- `Object.values(obj)` : retourne un tableau contenant les valeurs des propriétés d'un objet `obj` ;
- `Object.entries(obj)` : retourne un tableau contenant des paires (clef-valeur) des propriétés d'un objet.

Exemple :

```js
const user = {
	username: 'jdoe08',
	firstname: 'John',
	lastname: 'DOE',
	age: 27,
	getFullname: function() {
		return this.firstname + ' ' + this.lastname
	}
}

const properties = Object.keys(user);
const propertiesValues = Object.values(user);
const entries = Object.entries(user);

console.log(properties); // ['username', 'firstname', 'lastname', 'age', 'getFullname']
console.log(propertiesValues); // ['jdoe08', 'John', 'DOE', 27, getFullname()]
console.log(entries); // [ ['username', 'jdoe08'], ['firstname', 'John'], ['lastname', 'DOE'], ['age', 27], ['getFullname', getFullname()]
``` 

## Le *spread operator*

[https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

Le *spread operator* est un opérateur sous la forme de points de suspensions : `...`
Concernant les objets, il permet de les fusionner entre eux.

Par exemple :

```js
const profile = {firstname: 'John', profileComplete: false};
const updatedProfile = {
	...profile,
	lastname: 'DOE',
	profileComplete: true
}
```

Dans cet exemple, nous fusionnons les données déjà présentes dans l'objet `profile` dans l'objet `updatedProfile`. Le *spread operator* nous permet de reprendre tout ce qu'il y a dans le premier objet, et de le copier dans le deuxième.

## Le *destructuring*

Il s'agit d'une syntaxe permettant de récupérer les propriétés d'un objet sous la forme de variables.

Exemple :

```js
const user = {username: 'jdoe08', age: 27, name: 'John DOE'};

const {username, ...rest} = user;
console.log(username); // 'jdoe08'
console.log(rest); // {age: 27, name: 'John DOE'}
```

Cette syntaxe est particulièrement utile lorsque l'on souhaite récupérer tout ou partie d'un objet sans avoir à écrire plusieurs lignes de déclaration de variables.

## Conclusion

Il y aurait encore beaucoup à dire sur les objets !
Plus tard, nous verrons les classes, qui permettent de gérer plus simplement les structures complexes. 

Pour le moment, cette manière de créer des objets et de les gérer devra être assez pour commencer à utiliser JavaScript dans vos pages Web.



