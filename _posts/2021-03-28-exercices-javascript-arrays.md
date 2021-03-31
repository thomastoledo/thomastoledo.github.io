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

## Exercice II - Générer un tableau
- Implémentez une fonction qui génère un tableau de `n` nombres, de `0` à `n` ;
- Implémentez une deuxième fonction, qui cette fois génère un tableau de `n` nombres entiers aléatoires ;
- Implémentez désormais une troisième fonction qui, cette fois, génère un tableau de `n` nombres aléatoires entre `0` et `n` ;
- Implémentez, enfin, une fonction qui génère un tableau de `n` nombres aléatoires entre deux valeurs `min` et `max`.

## Exercice III - `sort`
- Implémentez une fonction qui génère un tableau de `n` nombres aléatoires, entre deux valeurs `min` et `max`, et qui soit trié de manière ascendante ;
    - faites une solution sans la méthode `sort` ;
    - faites une solution avec la méthode `sort`.

## Exercice IV - `map`
- Implémentez une fonction qui prend en paramètre un tableau de nombres et qui retourne un nouveau tableau tel que, pour tout élément `x` du tableau, on ait `x²` ;
- Implémentez une fonction qui prend en paramètre un tableau de prénoms et qui retourne un nouveau tableau tel que, pour tout prénom `p` du tableau, la première lettre soit en majuscule et le reste en minuscules ;
- Implémentez une fonction qui prend en paramètre un tableau d'objets `{firstname: 'un prénom', lastname: 'un nom'}` et qui retourne un nouveau tableau comprenant une liste de noms complets. Par exemple : `[{firstname: 'John', lastname: 'Doe'}, {firstname: 'Jack', lastname: 'Doe'}]` deviendra `['John Doe', 'Jack Doe']`.

## Exercice V - `filter`
- Implémentez une fonction qui filtre les valeurs `null` et `undefined` de n'importe quel tableau et qui retourne un nouveau tableau filtré.

## Exercice VI - `reduce`
- Implémentez une fonction qui prend en paramètre un tableau de nombres et qui retourne la somme de tous ces nombres, sans utiliser de boucle `for`.
