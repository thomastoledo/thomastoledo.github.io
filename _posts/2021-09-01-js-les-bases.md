---
layout: post
title: "Cours Développement Frontend - Les bases de JavaScript"
date: 2022-03-02 12:26:11 +0200
categories: [cours, 1A, frontend]
---
# JavaScript - Les bases

Nous allons désormais attaquer JavaScript !

JavaScript est un langage ayant vu le jour en 1995 par Brendan Eich, qui s'est inspiré de la syntaxe du Java (notamment) et a mis dix jours pour créer ce langage.

Au fil des ans, ce langage s'est enrichi de nombreuses fonctionnalités, et, aujourd'hui, une large communauté de développeurs et de développeuses travaille à le faire évoluer dans le bon sens.

Dans ce cours, nous allons voir les bases de JavaScript : comment déclarer des variables, les fonctions, les instructions de conditions et de boucles.
Dans les cours suivants nous verrons les objets et les tableaux, puis nous commencerons à voir comment manipuler le DOM, pour proposer aux utilisateurs et utilisatrices des comportement plus dynamiques.

## Où tester mon code ?
Dans un premier temps, nous allons écrire nos morceaux de code directement dans la console du navigateur : cela nous permettra de bien prendre en main JavaScript sans avoir à développer de site web. Vous pouvez également utiliser le site [https://runjs.co/](https://runjs.co/) pour vos essais.

## Les variables
Comme vous avez pu le voir en PHP, il est également possible, en JavaScript, de déclarer des variables.

### Le mot-clef `var`
Le mot-clef `var` permet de déclarer des variables. Aujourd'hui, son utilisation n'est plus  recommandée, à cause d'effets de bord qu'elle peut causer. Nous verrons plus tard pourquoi.

### Les mot-clefs `let` et `const`
Nous utiliserons ces mot-clefs dans ce cours. Ils permettent respectivement de créer une variable et une constante.

Voici un exemple :

```js
let age = 18;
const name = 'toto';
```

Dans cet exemple, nous créons une variable et une constante : `age` pourra recevoir de nouvelles valeurs, car il s'agit d'une variable. En revanche, `name` ne pourra pas recevoir de nouvelle valeur, car il s'agit d'une constante.

De manière générale, on aura tendance à n'utiliser les `let` que si la valeur est amenée à changer au cours de l'exécution du programme.

#### Les types de valeurs
Qui dit variable, dit valeur !

En JavaScript, il existe plusieurs types de valeurs. Ceux qui nous intéresseront pour ce cours seront les suivant :

- le type `Number` (entiers ou flottants) ;
- les chaînes de caractères (ou *string*) ;
- les booléens (`true` / `false`) ;
- le type `null` ;
- le type `undefined` ;
- le type `Object`.

Les cinq premiers sont ce que l'on appelle des **types primitifs** : vous pouvez voir cela comme étant des **types de base**, relativement simples.

Parmi ces types primitifs, `null` et `undefined` sont un peu particuliers. 
Le type `null` ne correspond qu'à une seule valeur : la valeur `null`.
Le type `undefined` correspond à la valeur que porte une variable avant qu'on lui affecte une quelconque valeur.

Exemple :

```js
let age;
age = 18;
age = null;
```

À la première ligne, nous déclarons une variable nommée `age`. Aucune valeur ne lui a encore été affectée, elle vaut donc `undefined` car elle est indéfinie.
À la deuxième ligne, nous affectons une valeur à cette variable : à ce moment-là, `age` porte la valeur `18` et est de type `Number`.
À la troisième ligne, nous lui affectons la valeur `null` : dans ce cas là, `age` reste définie, et elle ne vaut simplement **rien**.

Enfin, le type `Object`.
Il s'agit d'un type **non-primitif**, car permettant de représenter des structures plus complexes. Nous reviendrons dessus plus loin dans le cours.

#### Les différences en `let` et `const`

Au final, il existe peu de différences entre `let` et `const`. Le tableau suivant suffit à les résumer.

||`let`| `const` |
|--|--|--|
|Réaffecter des valeurs| oui | non |
|Déclarer sans affecter de valeur| oui | non |

#### Récapitulatif des types
De même, voici un tableau récapitulatif des types présentés précédemment

|type|valeurs acceptées|
|--|--|
|number|nombres entiers et flottants|
|string|chaînes de caractères|
|boolean| true / false|
|null|null|
|undefined|undefined|
|object|des structures complexes|


## Les instructions de conditions
On les retrouve dans quasiment tous les langages : les **instructions de conditions**.
Elles permettent tout simplement d'exécuter un bloc de code si une condition est respectée. Vous les avez déjà vues en PHP : `if` et `else`. En JavaScript, il existera également le `else if` accolé.

Voici un exemple :

```js
const age = 17;
if (age >= 18) {
	// faire quelque chose
} else if (age >= 16) {
	// faire autre chose
} else {
	// si aucune condition n'a été respectée, on passe ici
}
```

Dans cet exemple, nous déclarons une **constante** et lui affectons la valeur `17`. Puis nous effectuons un test :

- est-ce que la valeur est **supérieure ou égale** à `18` ?
- si non, est-ce que la valeur est **supérieure ou égale** à `16` ?
- si non, on fait autre chose.

On peut, bien évidemment, se passer du `else if` et du `else` si on ne veut rien faire en cas de non-respect de la condition :

```js
const age = 17;

if ( age >= 18 ) {
	// faire quelque chose
}
```

### Exercices

##### Exercice 1
Dans la console de votre navigateur, ou bien sur le site [https://runjs.co/](https://runjs.co/), recopiez le code suivant :

```js
function randomAge() {
  return Math.floor(Math.random() * 50);
}

const age = randomAge();
```
Puis, en utilisant les instructions de conditions, faites en sorte que le code suivant ne s'exécute que si l'âge généré est **supérieur à 16**.

```js
console.log('Accès autorisé');
```

Faites ensuite en sorte que le code suivant s'exécute si la condition n'est pas respectée :

```js
console.log('Accès non-autorisé');
```

##### Exercice 2
Toujours à partir du même morceau de code, faites maintenant en sorte que le code suivant ne s'exécute que si l'âge généré est situé entre **12** et **25** (inclus).

```js
console.log('Elligible à la réduction 12-25');
```
**Attention** 
Vous les avez normalement vu en PHP : les opérateurs logiques **&&** ("et") et **||** ("ou") permettent de combiner plusieurs conditions.

Exemple :

```js
const toto = 'toto';
if (toto === 'toto' || toto === 'tata') {
	// faire quelque chose
}
```

##### Exercice 3
Désormais, partez du code suivant :

```js
function throwDice() {
  return Math.floor((Math.random() * 6) + 1);
}

const dice = throwDice();
```

Puis, à l'aide d'une instruction de condition, faites en sorte que ce code ne s'exécute que si le résultat est égal à `3` ou `6`.


## Les opérateurs
Dans les exemples précédents, nous avons vu, sans en parler, ce que l'on appelle **des opérateurs**.
Il existe plusieurs types d'opérateurs : 

- les opérateurs binaires (avec deux opérandes) ;
- les opérateurs **unaires** (avec une opérande) ;
- les opérateurs **ternaires** (que nous verrons juste après) ;
- les opérateurs logiques (qui sont soit **binaires** soit **unaires**) ;
- les opérateurs d'affectation ;
- les opérateurs de comparaison ;
- les opérateurs arithmétiques.

Toute la liste complète peut-être trouvée ici : [https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_and_Operators](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_and_Operators).

Nous n'allons pas tous les voir aujourd'hui. Voici cependant ceux qui sont dans les exercices précédents :

| opérateur | type | nom | exemple |
|--|--|--|--|
|=| affectation | affectation | `const age `**`=`**` 18;` |
|==| comparaison | équivalence | `if(age `**`==`**` '18') {}` |
|===| comparaison | stricte égalité | `if(age `**`===`**` '18') {}` |
|>| comparaison | strictement supérieur | `if (age `**`>`**` 17) {}` |
|>=| comparaison | supérieur ou égal | `if (age`**`>=`**`18) {}` |
|<| comparaison | strictement inférieur | `if (age`**`<`**`18) {}` |
|<=| comparaison | inférieur ou égal| `if (age`**`<=`**`17) {}` |
|>=| comparaison | supérieur ou égal| `if (age`**`>=`**`18) {}` |
|&&| logique | ET| `if (age>=18 `**`&&`**` age <= 25) {}` |
|\|\|| logique | OU| `if (age>=18 `**`||`**` age <= 25) {}` |

### Les opérateur d'équivalence et de stricte égalité
En JavaScript, il est possible de faire des tests d'égalité avec les opérateurs suivants :

- `==` ;
- `===`.

*A priori*, ces deux opérateurs reviennent au même : une comparaison entre deux valeurs. Pourtant, on préfèrera utiliser le triple égal, pour des raisons de rigueur.
En effet, le double égal ne va faire qu'une **équivalence**, tandis que le triple fera une **égalité stricte**.

Exemple :

```js
if (18 == '18') {
	console.log('équivalence');
}

if (18 === '18') {
	console.log('stricte égalité');
}
```

Pour éviter tout risque lié à l'équivalence, nous utiliserons la stricte égalité.

### L'opérateur ternaire
L'opérateur ternaire est un peu particulier. Il n'est pas nécessaire de le comprendre dès le début, et je ne m'offusquerai pas de ne pas le voir dans vos rendus.
Il s'agit d'un opérateur permettant de réduire un test `if...else` en une seule ligne d'instruction.

Exemple :

```js
if (age >= 18) {
	console.log('La personne est majeure');
} else {
	console.log('La personne n\'est pas majeure');
}
```

devient :

```js
(age >= 18) 
? console.log('La personne est majeure'); 
: console.log('La personne n\'est pas majeure');
```

Le point d'interrogation précède le code à exécuter si la condition est vraie.
Les deux points précèdent le code à exécuter si la condition est fausse.

Cette notation peut parfois être confusante, c'est pourquoi on préfère parfois rester sur un simple `if...else`.


## Les instructions de boucle
Très souvent, on doit appliquer un même traitement à une liste de valeurs, ou encore effectuer un traitement tant qu'une condition est respectée. Pour ce faire, nous utilisons ce que l'on appelle **des boucles**.

Nous verrons, ici, un seul type de boucles : les boucles **`for`** et, plus tard, les boucles **`forEach`**.

Voici la syntaxe d'une boucle `for` :

```js
for(condition initiale; conditions d'exécution; incrémentation){
	// le code à exécuter
}
```

Une boucle `for` se déclare avec le mot-clef `for`, suivi de parenthèses. Dans ces parenthèses, on trouvera, séparées par des points-virgules :

- la condition initiale : c'est le point de départ de la boucle ;
- la ou les conditions d'exécutions : tant qu'elles sont respectées, la boucle continue de tourner ;
- l'incrémentation, si besoin.

Pour bien illustrer l'utilisation d'une boucle for, voici un exemple :

```js
console.log('Hello 0');
console.log('Hello 1');
console.log('Hello 2');
console.log('Hello 3');
console.log('Hello 4');
console.log('Hello 5');
```

Avec une boucle `for`, on pourra réduire le code en écrivant :

```js
for (let i = 0; i < 5; i++) {
	console.log('Hello ' + i);
}
```

### Exercice

En partant du code suivant, écrivez une boucle `for` qui permette d'afficher les éléments de la liste.

```js
const numbersList = [0, 15, 41, 1, 11, 23, 36, 96, 48, 777, 45, -89];
```

**Note**
Nous le verrons plus tard, mais pour accéder aux éléments d'un tableau `T`, on écrit `T[indice de l'élément]`.

Par exemple : `T[0]` permettra d'accéder au premier élément du tableau `T`.
