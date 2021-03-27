---
layout: post
title:  "Exercices JavaScript : Variables, Objets et Fonctions"
date:   2021-03-26 12:15:11 +0200
categories: [cours, 1A, javascript]
---
# Exercices JavaScript - Variables, Objets et Fonctions

Voici plusieurs exercices pour vous entraîner avec les variables, objets et fonctions en JavaScript.
Pour exécuter le code, utilisez soit la console de votre navigateur, soit [RunJS](https://runjs.app/).

## Les variables
En JavaScript, on peut déclarer des variables de trois manières : 

- `const maVariable` ;
- `let maVariable` ;
- `var maVariable` ;

Le mot-clef `var`, cependant, est devenu peu utilisé aujourd'hui. Nous allons voir pourquoi.

### Les constantes
#### Exercice 1
Une constante est une variable particulière dont la valeur ne peux théoriquement pas changer au cours du temps. Ainsi, si on a le code suivant :

```js
const age = 18;
```

La constante `age` ne pourra être modifiée plus tard dans le code.

Sachant cela, à votre avis, que va donner l'exécution du code suivant dans la console de votre navigateur ?

```js
const age = 18;
age = 20;
```

#### Exercice 2
Egalement, une constante ne peut être redéclarée. Cela signifie que si nous avons la constante suivante : 

```js
const name = 'John Doe';
```

Nous ne pourrons pas la redéclarer. Sachant cela, que va donner l'exécution du code suivant dans la console de votre navigateur ?

```js
const name = 'John Doe';
const name = 'toto';
```

#### Exercice 3
Malheureusement, si s'arrêtait là, ça serait trop simple !
À votre avis, que va afficher le code suivant ?

```js
const utilisateur = {
    firstName: 'John',
    lastName: 'Doe',
    age: 42
};

utilisateur.firstName = 'Jet';
console.log(utilisateur.firstName);
```

On se rend alors compte qu'une constante, si elle ne peut pas voir sa propre valeur changer,  **peut voir ses propriétés changer**.

#### Exercice 4
Désormais, on a le code suivant :

```js
const firstName = 'john';
const lastName = 'doe';

const user = {
  firstName: firstName,
  lastName: lastName,
  age: 42
}

user.firstName = 'joe';
console.log(user.firstName);
```

Dans ce code, on crée un objet `user` auquel on affecte deux constantes : `firstName` et `lastName`. À votre avis, le code ci-dessus va-t-il fonctionner ? Et pourquoi ?

#### Exercice 5
On change un peu le code :

```js
const info = {
  firstName: 'john',
  lastName: 'doe',
  age: 42
}

const user = {
  info
}

console.log(user.info);
user.info = {};
console.log(user.info);
```

Le code fonctionne-t-il ? Si oui, qu'affiche-t-il ? Si non, pourquoi ?

#### Exercice 6
À votre tour : créez un objet `user` comportant les propriétés suivantes :
- un `login` (avec la valeur que vous souhaitez) ;
- un `password` (avec la valeur que vous souhaitez) ;

Puis affichez l'objet dans la console de votre navigateur avec la fonction `console.log`.

### Les variables `let` et `var`
Les mots-clefs `let` et `var` permettent tous les deux de déclarer des variables. Cependant, quelques subtilités existent entre les deux.

#### Exercice 1

```js
let age = 12;
age = 13;
console.log(age);
```

Que fait le code ci-dessus ?

#### Exercice 2

```js
let age = 12;
let age = 13;
console.log(age);
```

Que fait le code ci-dessus ?

#### Exercice 3

```js
var age = 12;
age = 13;
console.log(age);
```

Que fait le code ci-dessus ?

#### Exercice 4

```js
var age = 12;
var age = 13;
console.log(age);
```

Que fait le code ci-dessus ?


## Les fonctions

Il existe plusieurs types de fonctions en JavaScript.

### Les fonctions "classiques"
La manière la plus simple de déclarer une fonction est la suivante : 

```js
function add(x, y) {
    return x + y;
}
```

Une fonction se déclare avec le mot-clef `function`, suivi du nom de la fonction. Elle prend en paramètre des **arguments** et peut retourner un résultat.
La fonction ci-dessus, par exemple, prend en paramètre deux **arguments**, nommés `x` et `y`, et retourne un résultat, qui est `x + y`.

#### Exercice - arithmétique
Ecrivez quatre fonctions :

- une fonction `add` qui prend deux paramètres en entrée et qui retourne l'addition des deux ;
- une fonction `substract` qui prend deux paramètres en entrée et qui retourne la soustraction des deux ;
- une fonction `multiply` qui prend deux paramètres en entrée et qui retourne la multiplication des deux ;
- une fonction `divide` qui prend deux paramètres en entrée et qui retourne la division du premier par le second. Attention au cas de la division par 0 !

### Les fonctions anonymes et les callbacks
Une fonction anonyme, comme son nom l'indique, n'a pas de nom. Pourtant, le code suivant ne fonctionne pas :

```js
function(user) {
  console.log(user);
}
``` 

Une fonction anonyme **se stocke dans une variable** ou bien se passe en tant que **callback**.

Exemple : 

```js
// On crée une constante à laquelle on affecte une fonction anonyme
const displayUser = function(user) {
  console.log(user);
}

// Comme la valeur de "displayUser" est une fonction
// On peut l'appeler comme une fonction
displayUser('user 1');
```

L'autre type de cas que l'on peut retrouver sont **les callbacks**.

#### Les callbacks

Le terme "callback" peut-être littéralement traduit par "appeler en retour". Une *callback* est une fonction qui sera appelée dans une autre fonction. En voici un exemple :

```js
// On déclare une fonction
function displayHello() {
  console.log('Hello!');
}

// On la passe en paramètre à "setTimeout", en tant que callback
setTimeout(displayHello, 1000);
```

Ce code peut également s'écrire avec une fonction anonyme :

```js
setTimeout(function() {
  console.log('Hello!');
}, 1000);
```

#### Exercices - callbacks
- Ecrivez une fonction `compose`, qui prend en paramètre deux fonctions *callbacks* et retourne une **fonction composée**. On partira du principe que chaque *callback* ne prendra qu'un seul paramètre.

Pour rappel, une fonction composée est une fonction composée de *n* fonctions, telle que la fonction *n-1* s'exécute avec le résultat de la fonction *n*.

Voici un exemple de ce que l'on pourrait avoir comme comportement :

```js
function compose(f, g) {
  // à vous de coder le corps de la fonction
}

function double(x) {
  return x * 2;
}

function square(x) {
  return x * x;
}

const doubleAndSquare = compose(square, double);
// devrait faire square(double(2)), donc "16"
console.log(doubleAndSquare(2)); 

```

- Ecrivez une fonction `delay` qui prend en paramètre une fonction `f` et un nombre `n`, et qui n'exécutera `f` qu'après `n` millisecondes. Aidez-vous de `setTimeout`.

```js
function delay(f, n) {
  // à vous de coder le corps de la fonction
}

// n'affichera 'Hello!' qu'une seconde plus tard
delay(function() {console.log('Hello!')}, 1000);
```

### Les *arrow functions* ou "fonctions fléchées"

Il existe une notation particulière pour les fonctions, appelée "notation fléchée". La documentation à ce sujet peut être trouvée [ici](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

- les *arrow functions* sont anonymes ;
- les *arrow functions* peuvent être passées en *callbacks* à d'autres fonctions ;
- les *arrow functions* n'ont pas de *scope* qui leur est propre (une notion que nous verrons plus tard).

Voici des exemples de fonctions fléchées :

```js
// Ici, pour tout couple (x, y), on retourne x + y
const add = (x, y) => x + y;

// Quand on n'a qu'un seul paramètre, on peut
// ne pas mettre de parenthèses
const double = x => x * 2;

// Si le corps de la fonction contient plus d'une instruction,
// il est obligatoire de mettre des accolades "{}" autour.
const divide = (x, y) => {
  if (y === 0) {
    return x;
  } else {
    return x / y;
  }
}

// la fonction "compose" sous forme d'arrow function
const compose = (f, g) => (x) => f(g(x));
```