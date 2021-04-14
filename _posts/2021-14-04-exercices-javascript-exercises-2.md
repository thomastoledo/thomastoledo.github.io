---
layout: post
title:  "Exercices JavaScript #2"
date:   2021-04-14 12:15:11 +0200
categories: [cours, 1A, javascript]
---

# Exercices JavaScript #2

Voici des exercices de syntaxe et d'algorithmie en JavaScript.

## Les conditions

### Exercice 1
```js
if ((3 + 5) === 8 ) {
	// L'instruction suivante s'exécute-t-elle ?
	console.log('Vrai');
}
```

### Exercice 2
```js
if ((3 + 5) !== 9 ) {
	// L'instruction suivante s'exécute-t-elle ?
	console.log('Vrai');
}
```

### Exercice 3
```js
if ((3 + 5) <= 8 ) {
	// L'instruction suivante s'exécute-t-elle ?
	console.log('Vrai');
}
```

### Exercice 4
```js
if ((3 + 5) < 8 ) {
	// L'instruction suivante s'exécute-t-elle ?
	console.log('Vrai');
}
```

### Exercice 5
```js
if ((3 + 5) >= 8 ) {
	// L'instruction suivante s'exécute-t-elle ?
	console.log('Vrai');
}
```

### Exercice 6
```js
if ((3 + 5) > 8 ) {
	// L'instruction suivante s'exécute-t-elle ?
	console.log('Vrai');
}
```

### Exercice 7
```js
const age = 17;
if (age >= 18 ) {
	// L'instruction suivante s'exécute-t-elle ?
	console.log('Vrai');
} else {
	// Ou bien est-ce cette instruction qui va s'exécuter ?
	console.log('Faux');
}
```

### Exercice 8
```js
const age = -18;
if (age >= 8 ) {
	// L'instruction suivante s'exécute-t-elle ?
	console.log('Vrai');
} else if (age >=0 ) {
	// Ou bien est-ce celle-ci ?
	console.log('Faux');
} else {
	// Ou bien est-ce cette instruction qui s'exécutera ?
	console.log('age invalide !');
}
```

### Exercice 9
```js
const age = 18;
const isMajor = age >= 18;
if (isMajor) {
	// L'instruction suivante s'exécute-t-elle ?
	console.log('Vrai');
} else {
	// Ou bien est-ce l'instruction suivante ?
	console.log('Faux');
}
```

### Exercice 10
```js
const age = 18;
const isMajor = age >= 18;
if (!isMajor) {
	// L'instruction suivante s'exécute-t-elle ?
	console.log('Vrai');
} else {
	// Ou bien est-ce l'instruction suivante ?
	console.log('Faux');
}
```

## Les boucles

### Exercice 1

```js
 const temperatures = 
 [0, 12, 13, 14.7, 24, 27, 29.5, 33, 36, 38, 39];
 
// Ecrivez une boucle for dans laquelle on affiche chaque élément du tableau
```
 ### Exercice 2

```js
 const temperatures = 
 [0, 12, -13, 1, 4, -27, 129.5, 33, 36, 38, -39];
 
 let minTemp;
 
// À l'aide d'une boucle for, retrouvez la plus petite température dans le tableau.
```
 ### Exercice 3
```js
 const temperatures = 
 [0, 12, -13, 1, 4, -27, 129.5, 33, 36, 38, -39];
// À l'aide d'une boucle for, faites en sorte de n'afficher que les valeurs strictement supérieures à 0
```
 ### Exercice 4
```js
const temperatures = 
[0, 12, -13, 1, 4, -27, 129.5, 33, 36, 38, -39];
// Triez ce tableau par ordre décroissant
```
### Exercice 5
```js
 const temperatures = 
 [0, 12, -13, 1, 4, -27, 129.5, 33, 36, 38, -39];

// Implémentez cette fonction de sorte à ce que,
// pour un tableau "array" contenant des valeurs numériques,
// on retourne la plus grande valeur inférieure à "value"
function closestMin(array, value) {
}

// L'appel de ci-dessous doit par exemple retourner 38
const res = closestMin(temperatures, 100);
console.log(res);
```
 
## Les tableaux

### Exercice 1

```js
// En utilisant la méthode find 
// (https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
// Ecrivez une fonction qui prend en paramètre
// un tableau de users, un login, et qui retourne l'élément
// du tableau qui a ce login

const users = [
	{login: 'jteraire', firstname: 'julie', lastname: 'teraire'},
	{login: 'micament', firstname: 'mohammed', lastname: 'icament'},
	{login: 'rtehel', firstname: 'romain', lastname: 'tehel'},
	{login: 'hgon', firstname: 'hawa', lastname: 'gon'},
	{login: 'saongle', firstname: 'selim', lastname: 'aongle'},
];
```

### Exercice 2

```js
// En utilisant la méthode find 
// (https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
// Ecrivez une fonction "authent" qui prend en paramètre
// un tableau de users, un login, un mot de passe, et qui retourne l'élément
// du tableau qui a ce login et ce mot de passe

const users = [
	{login: 'jteraire', firstname: 'julie', lastname: 'teraire', password: 'nevergonna'},
	{login: 'micament', firstname: 'mohammed', lastname: 'icament' password: 'giveyouup'},
	{login: 'rtehel', firstname: 'romain', lastname: 'tehel' password: 'nevergonna'},
	{login: 'hgon', firstname: 'hawa', lastname: 'gon' password: 'letyoudown'},
	{login: 'saongle', firstname: 'selim', lastname: 'aongle' password: 'rickrolled'},
];
```

### Exercice 3

```js
// On a un tableau de stocks de fruits
const products = [
	{idProduct: 1, product: 'Pomme', stock: 100_000},
	{idProduct: 2, product: 'Poire', stock: 105_000},
	{idProduct: 3, product: 'Mangue', stock: 30_000},
	{idProduct: 4, product: 'Banane', stock: 200_000},
	{idProduct: 5, product: 'Orange', stock: 506_869},
	{idProduct: 6, product: 'Figue', stock: 88_099},
	{idProduct: 7, product: 'Grenade', stock: 207_500},
	{idProduct: 8, product: 'Melon', stock: 199_000},
	{idProduct: 9, product: 'Pastèque', stock: 600_000},
	{idProduct: 10, product: 'Raisin', stock: 400_000},
];

// En vous aidant de "filter" 
// (https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
// Ecrivez une fonction "filterStocks" qui prend en paramètre un tableau
// ainsi qu'un stock, et retourne un nouveau tableau contenant
// uniquement les produits dont le stock est inférieur

// Un exemple de ce que cela devrait donner :
const res = filterStocks(products, 200_000);
/* 
doit afficher "[
	{idProduct: 1, product: 'Pomme', stock: 100_000},
	{idProduct: 2, product: 'Poire', stock: 105_000},
	{idProduct: 3, product: 'Mangue', stock: 30_000},
	{idProduct: 6, product: 'Figue', stock: 88_099},
	{idProduct: 8, product: 'Melon', stock: 199_000},
]"
*/
console.log(res);
```

### Exercice 4

```js
// On a un tableau de stocks de fruits
const products = [
	{idProduct: 1, product: 'Pomme', stock: 100_000},
	{idProduct: 2, product: 'Poire', stock: 105_000},
	{idProduct: 3, product: 'Mangue', stock: 30_000},
	{idProduct: 4, product: 'Banane', stock: 200_000},
	{idProduct: 5, product: 'Orange', stock: 506_869},
	{idProduct: 6, product: 'Figue', stock: 88_099},
	{idProduct: 7, product: 'Grenade', stock: 207_500},
	{idProduct: 8, product: 'Melon', stock: 199_000},
	{idProduct: 9, product: 'Pastèque', stock: 600_000},
	{idProduct: 10, product: 'Raisin', stock: 400_000},
];
// Faites une fonction
// productsToIds qui prend en paramètre un tableau de produits
// et qui retourne un nouveau tableau ne contenant que leurs IDs
// Aidez-vous de la fonction map
// (https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

// Un exemple de ce que cela devrait donner :
const res = productsToIds(products);
/* 
doit afficher "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
*/
console.log(res);
```

### Exercice 5

```js
// On a un tableau de stocks de fruits
const products = [
	{idProduct: 1, product: 'Pomme', stock: 100_000},
	{idProduct: 2, product: 'Poire', stock: 105_000},
	{idProduct: 3, product: 'Mangue', stock: 30_000},
	{idProduct: 4, product: 'Banane', stock: 200_000},
	{idProduct: 5, product: 'Orange', stock: 506_869},
	{idProduct: 6, product: 'Figue', stock: 88_099},
	{idProduct: 7, product: 'Grenade', stock: 207_500},
	{idProduct: 8, product: 'Melon', stock: 199_000},
	{idProduct: 9, product: 'Pastèque', stock: 600_000},
	{idProduct: 10, product: 'Raisin', stock: 400_000},
];

// En vous basant sur les deux fonctions précédemment écrites
// (filterStocks et productsToIds)
// Quel appel, entre les deux ci-dessous, est le plus performant
// en terme de temps et de complexité ?

// 1
productsToIds(filterStocks(products, 200_000));
// 2
filterStocks(productsToIds(products), 200_000);
```

### Exercice 6
```js
// On a un tableau de stocks de fruits (encore)
const products = [
	{idProduct: 1, product: 'Pomme', stock: 100_000},
	{idProduct: 2, product: 'Poire', stock: 105_000},
	{idProduct: 3, product: 'Mangue', stock: 30_000},
	{idProduct: 4, product: 'Banane', stock: 200_000},
	{idProduct: 5, product: 'Orange', stock: 506_869},
	{idProduct: 6, product: 'Figue', stock: 88_099},
	{idProduct: 7, product: 'Grenade', stock: 207_500},
	{idProduct: 8, product: 'Melon', stock: 199_000},
	{idProduct: 9, product: 'Pastèque', stock: 600_000},
	{idProduct: 10, product: 'Raisin', stock: 400_000},
];

// En vous aidant de reduce
// (https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
// Ecrivez une fonction "totalStock" qui prend en paramètre un tableau de produits
// et retourne le stock total

// Un exemple de ce que cela devrait donner :
const res = totalStock(products);
/* 
doit afficher "2436468"
*/
console.log(res);
```

### Exercice 7

```js
// On a un tableau de stocks de fruits
// Mais cette fois-ci, certains produits n'ont pas de stock indiqué
const products = [
	{idProduct: 1, product: 'Pomme', stock: 100_000},
	{idProduct: 2, product: 'Poire'},
	{idProduct: 3, product: 'Mangue'},
	{idProduct: 4, product: 'Banane', stock: 200_000},
	{idProduct: 5, product: 'Orange', stock: 506_869},
	{idProduct: 6, product: 'Figue', stock: 88_099},
	{idProduct: 7, product: 'Grenade'},
	{idProduct: 8, product: 'Melon', stock: 199_000},
	{idProduct: 9, product: 'Pastèque', stock: 600_000},
	{idProduct: 10, product: 'Raisin', stock: 400_000},
];

/* Avec la fonction "reduce", implémentez une function totalStock2 qui prend en paramètre 
	un tableau de produits, et qui retourne le stock total.
	Si un de produits n'a pas de stock indiqué, il faut additionner 0 à la place
*/

// Un exemple de ce que cela devrait donner :
const res = totalStock2(products);
/* 
doit afficher "2093968"
*/
console.log(res);
```

## Les objets

### Exercice 1
```js
/* 
	Ecrivez une fonction "createContact" qui prend en paramètre un prénom,
	un nom, un email et un numéro de téléphone, et qui retourne un 
	nouveau contact.
	Un contact a les propriétés suivantes :
	- firstname
	- lastname
	- email
	- phoneNumber
*/ 

// Par exemple :
const contact = createContact('john', 'doe', 'johndoe@mail.com', '0667598230');

// devrait afficher 
// "{ firstname: 'John', lastname: 'Doe', email: 'johndoe@mail.com', phoneNumber: '0665389230'}"
console.log(contact);
```

### Exercice 2

```js
// On a l'objet suivant 
const contact = {
	firstname: 'John',
	lastname: 'Doe',
	email: 'johndoe@mail.com',
	phoneNumber: '0665389230'
}

// Implémentez une fonction "editContactFirstname" qui prend en paramètre
// un contact, un prénom, et retourne un nouvel objet contenant les 
// informations du contact et le prénom mis à jour

// Par exemple :
const updatedContact = editContactFirstname(contact, 'toto');
// Doit afficher "toto"
console.log(updatedContact.firstname);
```

### Exercice 3

```js
// On a les objets suivants 
const contact = {
	firstname: 'John',
	lastname: 'Doe',
	email: 'johndoe@mail.com',
	phoneNumber: '0665389230'
}

const newInfo = {
	firstname: 'Jean',
	lastname: 'Doux'
}

// Faites en sorte que "updatedContact" contienne les 
// valeurs de "contact" et les valeurs de "newInfo"
const updatedContact = ...
```

### Exercice 4
```js
// On a l'objet suivant 
const contact = {
	firstname: 'John',
	lastname: 'Doe',
	email: 'johndoe@mail.com',
	phoneNumber: '0665389230'
}

// Implémentez une fonction "updateContact"
// qui prend en paramètres un contact, ainsi qu'un objet quelconque 
// (càd ayant n'importe quelles propriétés)
// Cette fonction devra retourner un nouveau contact mis à jour
// possédant les propriétés du contact et de l'autre objet

// Par exemple :

/* devrait retourner 
{ 
	firstname: 'John', 
	lastname: 'Doe', 
	email: 'johndoe@free.fr', 
	phoneNumber: '0665389230' 
}
*/
const updatedContact = updateContact(contact, {email: 'johndoe@free.fr'});

/* devrait retourner 
{ 
	firstname: 'John', 
	lastname: 'Wick', 
	email: 'johndoe@mail.com', 
	phoneNumber: '0665389230', 
	age: 25 
}
*/
const updatedContact2 = updateContact(contact, {age: 25, lastname: 'Wick'});
 
```

### Exercice 5
Qu'affichera le code suivant dans la console du navigateur ?
```js
// On a l'objet suivant 
const contact = {
	firstname: 'John',
	lastname: 'Doe',
	email: 'johndoe@mail.com',
	phoneNumber: '0665389230'
}

console.log(contact.age);
```

### Exercice 6
Qu'affichera le code suivant dans la console du navigateur ?
```js
// On a l'objet suivant 
const contact = {
	firstname: 'John',
	lastname: 'Doe',
	email: 'johndoe@mail.com',
	phoneNumber: '0665389230'
}

console.log(contact['firstname']);
```

### Exercice 7
Qu'affichera le code suivant dans la console du navigateur ?
```js
// On a l'objet suivant 
const contact = {
	firstname: 'John',
	lastname: 'Doe',
	email: 'johndoe@mail.com',
	phoneNumber: '0665389230'
}

contact.age = 12;

console.log(contact.age);
```

### Exercice 8
Qu'affichera le code suivant dans la console du navigateur ?
```js
// On a l'objet suivant 
const contact = {
	firstname: 'John',
	lastname: 'Doe',
}

const propertyName = 'age';

const newContact = {
	...contact,
	propertyName: 18
}

console.log(contact.age);
```

### Exercice 9
Qu'affichera le code suivant dans la console du navigateur ?
```js
// On a l'objet suivant 
const contact = {
	firstname: 'John',
	lastname: 'Doe',
}

const propertyName = 'age';

const newContact = {
	...contact,
	[propertName]: 18
}

console.log(contact.age);
```

## Les Dates
Dans tous les langages de programmation, la gestion des dates est, disons-le clairement, une **véritable tanée**.
JavaScript n'échappe pas à la règle.

Voici la documentation à ce sujet : [Prototype Date](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date).

### Exercice 1

```js
// Affectez à la constante ci-dessous la date du 29 février 2016
const whenDiCaprioFinallyWonAnOscar;
```

### Exercice 2
Pour avoir la date du jour, rien de plus simple : il suffit simplement d'instancier une nouvelle date avec `new Date()`.

```js
// Affectez à la constance ci-dessous la date du jour
const today;
```
### Exercice 3
Il est possible de calculer un temps entre deux dates, avec la soustraction. Par exemple :

```js
const today = new Date();
const birthdate = new Date('2000-08-02');

// timePassed donnera un nombre.
// Il s'agira du nombre de millisecondes passées entre les deux dates.
const timePassed = today - birthdate;

// Sachant qu'il s'agit de millisecondes, affectez à la constante ci-dessous
// le nombre d'année passées entre ces deux dates
const yearsPassed;
```

## Les classes

Une classe est un ensemble de propriétés et de méthodes (fonctions). Il s'agit d'une notation plus riche et puissante que la notation que nous avons vu précédemment. Nous avons également vu les classes lors du TP Admin.

Pour rappel :

```js
// Une classe se définit avec le mot-clef "class" et un nom de classe
// par convention avec une majuscule au début, suivi de deux accolades (comme pour les fonctions)

// Exemple :
class Student {}

// Une classe prend un constructeur. 
// Un constructeur est une fonction qui sera appelée quand on créera un nouvel objet

// Exemple :
class Student {
	// par défaut, le constructeur est vide
	constructor() {}
}

// Un constructeur peut prendre autant d'arguments que l'on veut
// Ces arguments sont ensuite affectés aux propriétés de l'objet
// À l'intérieur d'une classe, on référence l'objet courant avec "this"

// Exemple :
class Student {
	constructor(firstname, lastname) {
		this.firstname = firstname;
		this.lastname = lastname;
	}
}

// On instancie un nouvel objet d'une classe avec le mot-clef "new"

// Exemple :
const student = new Student('john', 'doe');

// Une classe possède des méthodes (fonctions)
// qui permettent de faire des modifications sur ses propriétés
// et d'obtenir des informatiosn calculées

// Exemple :
class Student {
	constructor(firstname, lastname, birthdate) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.birthdate = birthdate;
	}
 
	 getAge() {
		 return Math.floor((new Date() - this.birthdate) / 1000 / 3600 / 24 / 365);
	 }

	 updateBirthdate(birthdate) {
	 	this.birthdate = birthdate;
	 }
}

const student = new Student('john', 'doe', new Date('2000-08-15'));
console.log(student.getAge()); // doit afficher "20"


```

### Exercice 1

Déclarez une classe `Contact` qui sera pour le moment vide

### Exercice 2
Reprenez la classe `Contact` et spécifiez-lui un constructeur qui prendra un nom, un prénom, un email, et un numéro de téléphone.

### Exercice 3
Reprenez la classe `Contact` et spécifiez-lui les méthodes suivantes :

- `updateFirstname`, qui prend en paramètre un prénom et qui met à jour le prénom du contact ;
- `updateLasttname`, qui prend en paramètre un prénom et qui met à jour le nom du contact ;
- `updateEmail`, qui prend en paramètre un prénom et qui met à jour l'email du contact ;
- `updatePhone`, qui prend en paramètre un prénom et qui met à jour le numéro de téléphone du contact ;

### Exercice 4
Reprenez la classe `Contact` et spécifiez lui la méthode suivante :

- `update`, qui prend en paramètre un object et qui met à jour le contact en fonction des propriétés de l'objet ;

### Exercice 5
Enfin, testez que tout fonctionne avec le code suivant :

```js
const contact = new Contact('john', 'doe', 'johndoe@mail.com', '0676953280');

console.log(contact.firstname); // devrait afficher "john"

contact.updateFirstname('jean');
contact.updateLasttname('doe');
contact.updateEmail('jeandoe@mail.com');
contact.updatePhone('0756352467');

console.log(contact.firstname); // devrait afficher "jean"
console.log(contact.lastname); // devrait afficher "doe"
console.log(contact.email); // devrait afficher "jeandoe@mail.com"
console.log(contact.phoneNumber); // devrait afficher "0756352467"

contact.update({email: 'jeandoe@free.fr', phoneNumber: '0658762456'});
console.log(contact.email); // devrait afficher "jeandoe@free.fr"
console.log(contact.phoneNumber); // devrait afficher "0658762456"
````  