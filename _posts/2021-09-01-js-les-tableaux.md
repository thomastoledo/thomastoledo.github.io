---
layout: post
title: "Cours Développement Frontend - Les tableaux"
date: 2022-03-14 12:27:11 +0200
categories: [cours, 1A, frontend]
---
# JavaScript - Les tableaux  
  
Les tableaux sont des structures bien particulières en JavaScript, et très utilisées : ils permettent de stocker, transformer et filtrer des listes de données très simplement.  
  
## Déclarer un tableau  
  
Un tableau se déclare de la manière suivante :  
  
```js  
const monTableau = [];  
```  
  
Ici, je déclare un tableau vide.

Mais il est également possible de déclarer un tableau avec des données dedans : 

```js
const monTableau = [12,13, 81, 0, -16];
```

De même, comme JavaScript n'est pas un langage fortement typé, un tableau peut stocker des données de différents types :

```js
const monTableau = [
	'toto', 
	12, 
	true, 
	false, 
	{username: 'jdoe'}, 
	[
		null, 
		undefined, 
		13
	]
];
```

Ici, je stocke des nombres, des chaînes de caractères, des booléens, un objet, `null`, `undefined`, et même un autre tableau !

## Le prototype `Array`

Les tableaux héritent du prototype `Array` : cela signifie donc qu'ils ont des propriétés et des méthodes, que nous allons voir maintenant.

## La propriété `length`

Un tableau possède une longueur, qui peut être consultée avec la propriété `length`.

Exemple : 
```js
const t = [1, 2, 3];
console.log(t.length); // affichera 3
```

Cette propriété est *read-write* : cela signifie qu'elle permet également de supprimer des éléments du tableau.

Exemple :

```js
const t = [1, 2, 3];
t.length = 1;
console.log(t); // affichera [1];
```

## Les méthodes

### Ajouter des données - `push`

[https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/push](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/push).

La méthode `push` permet d'ajouter des données à un tableau. Elle prend en paramètre un nombre indéfini d'arguments, et les ajoute au tableau.

Exemple :

```js
const t = [1, 2, 3];
t.push(4, 5, 6);
console.log(t); // affichera [1, 2, 3, 4, 5, 6]
```

### La boucle `forEach`
[https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/foreach](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/foreach) 

Cette méthode permet d'exécuter une fonction sur tous les éléments d'un tableau. Elle prend en paramètre une **callback** (une fonction).

La syntaxe est la suivante :

```js
function displayName(name) {
	console.log(name);
}

const t = ['Achraf', 'Coumba', 'Wacil', 
'Antony', 'Joshua', 'Samy', 'Lucas'];

t.forEach(displayName);
```

Ici, vous voyez que je crée un tableau comportant des prénoms. Puis, juste après, j'appelle **la méthode** `forEach` en luis passant une fonction : la fonction `displayName`.

Vous remarquez également que, lorsque je passe la fonction `displayName`, je **ne mets pas de parenthèses**.

En effet, si j'écrivais 

```js
t.forEach(displayName());
```

Mon code ne fonctionnerait pas : d'abord, la fonction `displayName` serait appelée, et son résultat serait ensuite passé à la méthode `forEach`. Comme elle ne retourne rien, `t.forEach()` recevrait `undefined` et déclencherait une erreur.

Une manière parfois plus compréhensible de l'écrire est :

```js
function displayName(name) {
	console.log(name);
}

const t = ['Achraf', 'Coumba', 'Wacil', 
'Antony', 'Joshua', 'Samy', 'Lucas'];

t.forEach((value) => {
	displayName(value)
});
```

Sous ses airs un peu compliqués, cette syntaxe est en réalité très simple : ici, entre les parenthèses du `forEach`, nous passons simplement une fonction :

```js
(value) => {
	displayName(value);
}
```

Cette fonction est **anonyme** et sera exécutée à chaque tour de boucle.

**Exercice**

Dans l'exemple suivant, faites en sorte de n'afficher QUE les nombres pairs du tableau :

```js
function displayNumber(number) {
	console.log(number);
}

const t = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

### Le *mapping* de données  - `map`

[https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

S'il est possible de parcourir un tableau, il est également possible d'en créer un nouveau avec des données transformées : c'est ce que permet de faire la méthode `map` !

Elle fonctionne comme suit :

```js
const t = [1, 2, 3, 4, 5, 6];
const u = t.map((x) => {
	return x * 2;
});

console.log(u); // affichera [2, 4, 6, 8, 10, 12]
```

Ici, la méthode `map` a reçu en paramètre une **callback**, qui, pour tout élément du tableau `t`, a retourné cet élément multiplié par 2. Cela a retourné un **nouveau tableau**, ce qui signifie que le tableau de base est **resté intact**.

#### Exercice 1

À partir du tableau suivant, utilisez la fonction `map` pour créer un nouveau tableau de nombres élevés au carré.

```js
const t = [1, 2, -6, -100, 46, 30];
```

#### Exercice 2
À partir du tableau suivant, utilisez la fonction `map` pour créer un nouveau tableau ne comportant que des chaînes de caractère.

```js
const t = [1, 2, -6, -100, 46, 30];
```

#### Exercice 3

À partir du tableau suivant, utilisez la fonction `map` pour créer un nouveau tableau ne comportant que le nom et le prénom des utilisateurs.

```js
const users = [
	{firstname: 'Armand', lastname: 'LOISELIER', age: 35},
	{firstname: 'Priya', lastname: 'KANDASAMI', age: 28},
	{firstname: 'Emmanuelle', lastname: 'REHANNA', age: 30},
	{firstname: 'Yzar', lastname: 'COHEN', age: 54},
	{firstname: 'Ahmed', lastname: 'SADAOUI', age: 23},
];
```

#### Exercice 4

À partir du tableau suivant, utilisez la fonction `map` pour créer un tableau comportant les noms et prénoms dans des `<h1></h1>`, et les métiers dans des `<h2></h2>`.

```js
const members = [
	{firstname: 'Jessica', lastname: 'BOUTEILLER', job: 'Digital Content Marketing'},
	{firstname: 'Robin', lastname: 'LANAUD', job: 'Coffee Technical Officer'},
	{firstname: 'Antony', lastname: 'LANGLOIS', job: 'In The Sauce'},
	{firstname: 'Thomas', lastname: 'TOLEDO', job: 'Sauce Chief'},
	{firstname: 'Olivier', lastname: 'KRAKUS', job: 'Sauce Chief'},
];

/**
Résultat attendu :

[
	'<h1>Jessica BOUTEILLER</h1><h2>Digital Content Marketing</h2>',
	'<h1>Robin LANAUD</h1><h2>Coffee Technical Officer</h2>',
	'<h1>Antony LANGLOIS</h1><h2>In The Sauce</h2>',
	'<h1>Thomas TOLEDO</h1><h2>Sauce Chief</h2>',
	'<h1>Olivier KRAKUS</h1><h2>Sauce Chief</h2>',
]
**/
```

### Filtrer des données - `filter`

[https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

Il peut arriver que l'on veuille filtrer des données avant d'effectuer des traitement dessus. Pour cela, la méthode `filter` va grandement nous aider.

Voici comment cette méthode fonctionne :

```js
const fruits = [
	{title: 'banana', stock: 1200, price: '0.5'},
	{title: 'orange', stock: 0, price: '2'},
	{title: 'kiwi', stock: 800, price: '1.3'},
	{title: 'mango', stock: 0, price: '3'},
]

const fruitsInStock = fruits.filter((fruit) => {
	return fruit.stock > 0;
});
```

Dans cet exemple, nous avons un tableau contenant des objets représentant des stocks de fruits. Nous souhaitons récupérer la liste des fruits ayant un stock supérieur à `0`. Pour cela, la méthode `filter` prend en paramètre une **callback** qui doit retourner un booléen.

À chaque tour de boucle, si le booléen est `true`, alors l'élément est gardé dans le nouveau tableau qui est en train d'être créé, et sinon il est ignoré.

#### Exercice 1

Utilisez la méthode `filter` pour ne récupérer que les utilisateurs dont le nom d'utilisateur, le prénom ou bien le nom de famille contiennent la chaîne de caractère `'e'`.

Pour cela, aidez-vous de la méthode `includes` du **prototype String** : [https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/includes](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/includes).

```js
const users = [
	{firstname: 'Hoani', lastname: 'PRIAM', username: 'hpriam'},
	{firstname: 'Jules', lastname: 'DELTEIL', username: 'jdelteil'},
	{firstname: 'Imène', lastname: 'BENDACHA', username: 'ibendacha'},
	{firstname: 'Thomas', lastname: 'BONALDI', username: 'tbonaldi'},
	{firstname: 'Thomas', lastname: 'GEOFFROY', username: 'tgeoffroy'},
	{firstname: 'Justine', lastname: 'QUERE', username: 'jquere'},
	{firstname: 'Shelly', lastname: 'LAGZIEL', username: 'slagziel'},
	{firstname: 'Pyanossa', lastname: 'NDENGWE', username: 'pndengwe'},
	{firstname: 'Benoit', lastname: 'OLIFIRENKOFF', username: 'bolifirenkoff'},
];
```

#### Exercice 2

Partez du même tableau que précédemment, et faites en sorte que le filtrage fonctionne pour n'importe quelle chaîne de caractères.

Pour cela, écrivez une fonction `searchUser`, qui prendra en paramètre un argument `value` et un argument `users` (qui sera un tableau d'utilisateurs), et retournera un nouveau tableau filtré.


### Réduire un tableau à un seul élément - `reduce`

[https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).

Cette méthode est sans doute la moins intuitive : pourtant, elle est très pratique et, une fois comprise, vous adorerez l'utiliser.

La syntaxe est la suivante :

```js
const t = [10, 20, 30, 40, 50];
const sum = t.reduce((accumulator, currentValue) => {
	return currentValue + accumulator;
}, 0);
```
Ici, nous avons un tableau de nombres.
Nous utilisons la méthode `reduce` pour transformer ce tableau de nombre en une seule valeur.

Analysons la **callback** : 

```js
(accumulator, currentValue) => {
	return currentValue + accumulator;
}
```

Elle prend deux arguments, que j'ai appelé `currentValue` et `accumulator`.
Elle retourne la somme des deux arguments.

Mais que valent `currentValue` et `accumulator` ?

En fait, à chaque tour de boucle, `currentValue` va prendre la valeur de l'élément courant dans le tableau. Donc, au premier tour de boucle, `currentValue` vaudra `10`, puis au deuxième elle vaudra `20`, et ainsi de suite jusqu'à `50`.

L'argument `accumulator`, quant à lui, sera égal au **résultat cumulé** des tours précédents.
Donc, au premier tour de boucle, il vaudra `0`, puis au deuxième il vaudra `10`, au troisième `30`, au quatrième `60`, et au cinquième `100`.

Ainsi, à chaque tour de boucle, on **accumule** les valeurs dans une variable, et on retourne le résultat final.


#### Exercice

À partir du tableau suivant, retournez le produit de tous les nombres du tableau.

```js
const t = [1, 2, 3, 4, 5];
```

Le résultat devrait être `1*2*3*4*5 = 120`.


#### Exercice

Faites de même, mais en faisant attention à ce que les valeurs nulles ne soient pas prises en compte.

```js
const t = [1, 29, 63, 7, 2, 0, 0, 32, 0, 23, -1];
```

Le résultat devrait être `-18 825 408`


### Les prédicats `some` et `every`
Il est également possible de vérifier qu'un tableau contient ou non certaines valeurs, avec les prédicats `some` et `every`.

- `every` va vérifier que **tous les éléments** d'un tableau vérifient une ou plusieurs conditions ;
- `some` va vérifier qu'**au moins un élément** va vérifier une ou plusieurs conditions.

Exemple :

```js
const t = [1, 2, 3, 4, 5];

const hasAtLeastOneEvenNumber = t.some((x) => {
	return x % 2 === 0;
});

const hasNoZero = t.every((x) => {
	return x !==0;
});
```

### Copier des tableaux

Très souvent, nous sommes amenés à copier des tableaux ou encore à les concaténer. 
Pour cela, il existe deux notations.

#### La méthode `concat`

[https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/concat](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

La méthode `concat` du prototype `Array` permet de concaténer deux tableaux en un seul :

```js
const t = [1, 2, 3, 4];
const u = [4, 5, 6, 8];

const v = t.concat(u);
console.log(v); // [1, 2, 3, 4, 5, 6, 7, 8]
```

#### Le *spread operator*
Il s'agit d'une notation plus concise, très utilisée aujourd'hui :

```js
const t = [1, 2, 3, 4];
const u = [4, 5, 6, 8];

const v = [...t, ...u];
console.log(v); // [1, 2, 3, 4, 5, 6, 7, 8]
```

La différence ici, est qu'au lieu d'utiliser `concat`, je crée un tableau `[]`, dans lequel je vais mettre le contenu de `t` et le contenu de `u`. Pour ce faire, j'utilise le *spread operator*, qui est représenté par trois points de suspension `...` juste avant chaque tableau.

Vous pouvez voir cela comme le fait de "dézipper" un tableau et de placer les un après les autres les éléments qui le composent.

### Trouver un élément - `find`

[https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

La méthode `find` permet de trouver un élément dans un tableau, selon une condition.

Elle prend en paramètre une **callback** qui doit retourner `true` ou `false`.

Exemple :

```js
const users = [
	{username: 'toto'},
	{username: 'toto2'},
	{username: 'tata'},
	{username: 'titi'},
	{username: 'tutu'},
]

const userToto = users.find((user) => {
	return user.username.includes('toto');
});
```

Dans cet exemple, nous avons un tableau d'utilisateurs. Nous souhaitons récupérer l'utilisateur qui a un *username* contenant `"toto"`. 
Pour cela, nous appelons la méthode `find` en lui passant une **callback**, qui prendra en paramètre un user, et qui retournera `true` si son *username* contient `"toto"`, `false` sinon.

Dans le tableau, cependant, il existe deux utilisateurs dont le *username* contient cette chaîne de caractères : en fait, la méthode `find` s'arrête au premier élément vérifiant la condition.


### Trier un tableau

[https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

La méthode `sort` permet de trier des tableaux.

Elle prend en paramètre une **callback** qui va retourner trois valeurs :

- une valeur `> 0` ;
- une valeur `< 0` ;
- la valeur `0`.

Voici un exemple :

```js
const t = ['b', 'c', 'd', 'a'];
const sorted = t.sort((x, y) => {
	if (x > y) {
		return 1;
	} else if (x < y) {
		return -1;
	} else {
		return 0;
	}
});
```

Ici, la **callback** passée en paramètre à la méthode `sorted` doit prendre deux arguments (que j'ai arbitrairement nommé `x` et `y`).
J'ai également et volontairement utilisé une écriture exhaustive pour que l'on comprenne bien ce qu'il se passe.

La méthode `sort` va, à chaque tour, comparer ce que l'on appelle un **tuple** (une paire) de valeurs du tableau : si le premier élément doit être placé **après** le deuxième, on doit renvoyer une valeur **supérieure à zéro**, s'il doit être placé **avant**, on doit renvoyer une valeur **inférieure à zéro**. Si les deux éléments sont égaux, on doit renvoyer **zéro**.

Cela vaut pour un ordre **ascendant**. Pour un ordre **descendant**, c'est l'inverse.

Pour vous en assurer, exécutez le code suivant :

```js
const t = ['b', 'c', 'd', 'a'];
const sorted = t.sort((x, y) => {
	if (x > y) {
		console.log(`${x} > ${y}`);
		return 1;
	} else if (x < y) {
		console.log(`${x} < ${y}`);
		return -1;
	} else {
		console.log(`${x} === ${y}`);
		return 0;
	}
});
```

Vous verrez alors qu'à chaque comparaison, on retourne les valeurs énoncées précédemment.

Sachant cela, il est possible de réduire la notation précédente au profit de celle-ci :

```js
const t = ['b', 'c', 'd', 'a'];
const sorted = t.sort((x, y) => {
	return x - y;
});
```

**Attention !**
La méthode `sort` modifie directement le tableau et n'en crée pas de nouveau !

### Inverser un tableau - `reverse`

[https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

La méthode `reverse` permet tout simplement d'inverse l'ordre d'un tableau.

```js
const t = [1, 2, 3, 4];

const reversed = t.reverse();
```

**Attention !**
La méthode `reverse` modifie directement le tableau et n'en crée pas de nouveau !


## Conclusion

Il existe d'autres méthodes pour le prototype `Array`. Celles que nous avons vu pour le moment seront suffisantes pour la suite des cours, et constituent déjà une base importante pour mener à bien nos développements.
