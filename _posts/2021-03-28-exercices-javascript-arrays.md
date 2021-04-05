---
layout: post
title:  "Exercices JavaScript : les tableaux"
date:   2021-03-28 12:15:11 +0200
categories: [cours, 1A, javascript]
---
# Exercices JavaScript - Les tableaux

Voici plusieurs exercices pour vous familiariser avec les tableaux en JavaScript.

## Le prototype Array
Les tableaux, en JavaScript, appartiennent au [prototype Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array).

Ce prototype propose tout un ensemble de méthodes pour travailler avec les tableaux. Certaines sont font "muter" le tableau sur lequel elles s'appliquent, tandis que d'autres vont retourner un nouveau tableau.

Par exemple, la méthode `push` permet d'insérer un nouvel objet à la fin d'un tableau. On dit que la méthode fait "muter" le tableau, puisque son état va changer après l'appel de `push`.
À l'inverse, la méthode `filter` ne modifiera pas le tableau, mais en retournera un nouveau.

## Exercice I - Création d'un tableau

- Déclarez un tableau contenant 10 nombres, de 0 à 9 ;
- Déclarez un deuxième tableau contenant 100 nombres, de 0 à 99.


**Correction**

```javascript
// On peut déclarer un tableau de deux manières :
const t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const t2 = Array.from(1, 2, 3, 4, 5, 6, 7, 8, 9);

// Pour déclarer un tableau contenant 100 nombres, on ne va pas tout écrire :
const t3 = [];
for (let i = 0; i < 100; i++) {
    t3.push(i);
} 
```

## Exercice II - Générer un tableau
- Implémentez une fonction qui génère un tableau de `n` nombres, de `0` à `(n - 1)` ;
- Implémentez une deuxième fonction, qui cette fois génère un tableau de `n` nombres entiers aléatoires ;
- Implémentez désormais une troisième fonction qui, cette fois, génère un tableau de `n` nombres aléatoires entre `0` et `n` ;
- Implémentez, enfin, une fonction qui génère un tableau de `n` nombres aléatoires entre deux valeurs `min` et `max`.


**Correction**

```javascript
// Implémentez une fonction qui génère un tableau de n nombres, de 0 à (n - 1) :
function generateArrayWithNNumbers(n) {
    const t = [];
    for (let i = 0; i < n; i++) {
        t.push(i);
    }
    return t;
}


// Implémentez une deuxième fonction, qui cette fois génère un tableau de n nombres entiers aléatoires
function generateArrayWithNRandomNumbers(n) {
    const t = [];
    for (let i = 0; i < n; i++) {
        const randomNumber = Math.floor(Math.random() * 100);
        t.push(randomNumber);
    }
    return t;
}


// Implémentez désormais une troisième fonction qui, cette fois, génère un tableau de n nombres aléatoires entre 0 et n
function generateArrayWithNRandomNumbersBetween0AndN(n) {
     const t = [];
    for (let i = 0; i < n; i++) {
        const randomNumber = Math.floor(Math.random() * (n + 1));
        t.push(randomNumber);
    }
    return t;   
}

// Implémentez, enfin, une fonction qui génère un tableau de n nombres aléatoires entre deux valeurs min et max.
function generateArrayWithNRandomNumbersBetweenMinAndMax(n, min, max) {
     const t = [];
    for (let i = 0; i < n; i++) {
        const randomNumber = Math.floor(Math.random() * (max + 1 - min) + min);
        t.push(randomNumber);
    }
    return t;   
}
```

## Exercice III - `sort`
- Implémentez une fonction qui génère un tableau de `n` nombres aléatoires, entre deux valeurs `min` et `max`, et qui soit trié de manière ascendante ;
    - faites une solution sans la méthode `sort` ;
    - faites une solution avec la méthode `sort`.

**Correction**
        
```javascript
// avec .sort()
function sortNumbersArrayAsc(array) {
    return array.sort((a, b) => a - b);
}

// sans .sort()
function sortNumbersArrayAsc2(array) {
    const sortedArray = [];
    const copiedArray = [...array];

    const length = array.length;
    for (; sortedArray.length < length;) {
        const idx = findIdxOfMin(copiedArray);
        sortedArray.push(copiedArray[idx]);
        copiedArray.splice(idx, 1);
    }
    return sortedArray;
}

function findIdxOfMin(array) {
    let idx = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] < array[idx]) {
            idx = i;
        }
    }
    return idx;
}
```

## Exercice IV - `map`
- Implémentez une fonction qui prend en paramètre un tableau de nombres et qui retourne un nouveau tableau tel que, pour tout élément `x` du tableau, on ait `x²` ;
- Implémentez une fonction qui prend en paramètre un tableau de prénoms et qui retourne un nouveau tableau tel que, pour tout prénom `p` du tableau, la première lettre soit en majuscule et le reste en minuscules ;
- Implémentez une fonction qui prend en paramètre un tableau d'objets `{firstname: 'un prénom', lastname: 'un nom'}` et qui retourne un nouveau tableau comprenant une liste de noms complets. Par exemple : `[{firstname: 'John', lastname: 'Doe'}, {firstname: 'Jack', lastname: 'Doe'}]` deviendra `['John Doe', 'Jack Doe']`.

**Correction**
        
```javascript
function squareNumbers(numbers) {
    return numbers.map(x => x*x);
}

function capitalizeFirstNames(firstNames) {
    return firstNames.map(f => f.charAt(0).toUpperCase() + f.substring(1).toLowerCase())
}

function fullnames(names) {
    return names.map(name => name.firstname + ' ' + name.lastname);
}
```

## Exercice V - `filter`
- Implémentez une fonction qui filtre les valeurs `null` et `undefined` de n'importe quel tableau et qui retourne un nouveau tableau filtré.

**Correction**
        
```javascript
function filterNullAndUndefined(array) {
    return array.filter(value => value !== null && value !== undefined);
}
```


## Exercice VI - `reduce`
- Implémentez une fonction qui prend en paramètre un tableau de nombres et qui retourne la somme de tous ces nombres, sans utiliser de boucle `for`.

**Correction**
        
```javascript
function sum(numbers) {
    return sum.reduce((accumulator, currValue) => accumulator + currValue, 0);
}
```

