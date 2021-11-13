---
layout: post
title: "Cours Développement Frontend - La spécificité et les règles de priorité"
date: 2021-09-01 12:22:11 +0200
categories: [cours, 1A, frontend]
---

# Cours Développement Frontend - La spécificité et les règles de priorité
 
 Nous venons de voir les sélecteurs CSS simples. Avant de voir les sélecteurs avancés, il est important de voir **la spécificité** et les **règles de priorité** en CSS.

## Spécificité

La **spécificité** d'un sélecteur se détermine par son champ d'action.
Par exemple, si vous allez voir sur le CodePen suivant : [https://codepen.io/nugetchar/pen/abyRzLQ](https://codepen.io/nugetchar/pen/abyRzLQ).

Vous verrez qu'il y a plusieurs `div`, certaines avec des classes et une avec un ID.

Dans le code CSS, il y a un sélecteur d'élément : sa spécificité est déterminée par tous les éléments qu'il va pouvoir affecter, à savoir ici toutes les `div`.
Plus bas dans le code CSS, il y a des sélecteurs de classes : leur spécificité est plus élevée, puisque ce ne sont pas tous les éléments qui portent ces classes.
Et enfin, pour le sélecteur d'ID tout en bas, c'est encore plus spécifique, puisque le CSS ne sera appliqué que sur un seul et unique élément !

En plus de la spécificité, on retrouvera également des règles de priorité à connaître.

La spécificité se calcule via ce que l'on appelle des "poids".

Voici un tableau qui résume les poids selon les sélecteurs simples :

|!important|Style inline | Identifiant| Classe / Attribut | Element | Universel (*) |
|--|--|--|--|--|--|
|10000| 01000 | 00100 | 00010 | 00001 | 00000 |

Ces valeurs n'ont pas d'unité (ce ne sont pas des Kg, des Litres ou des Mètres), elle permettent juste de "classer" les sélecteurs du plus spécifique au moins spécifique.

**! Note !**
Vous remarquez également que j'ai rajouté deux cases à ce tableau : 
- le mot-clef `!important` : il se rajoute à la fin d'une instruction CSS et permet de "surcharger" tout autre style. 
- le **style inline**. Il est possible d'ajouter un attribut `style` sur une balise HTML et d'y écrire quelques instructions de CSS. Dans la pratique, on n'utilise cet attribut que dans certains cas spécifiques (comme la mise en page d'une newsletter).


##  Les règles de priorité

Comme il est possible d'écrire du style CSS dans l'ordre que l'on veut, le navigateur doit suivre un certain algorithme pour arriver à savoir quelle instruction va prévaloir sur une autre.

Il y a plusieurs cas de figures.

### Spécificités différentes
Si, pour une même instruction CSS, deux sélecteurs ont une spécificité différente, c'est la spécificité la plus forte qui l'importera.

Exemple dans le CodePen fourni au début du cours : le sélecteur d'élément `div` indique, entre autres choses, que le fond des `div` doit être vert. Pourtant, tous les autres sélecteurs sont plus spécifiques et indiquent d'autres couleurs de fond, du coup aucune `div` n'a de fond vert.

### Mêmes spécificités
Il est possible que deux sélecteurs se retrouvent avec la même spécificité : dans ce cas, celui qui l'emportera sera celui situé en dernier dans le fichier CSS.

Exemple, encore une fois dans le CodePen : les div 3 et 4 portent toutes les deux les classes `big` et `small`. Ces deux classes CSS indiquent des tailles différentes. Pourtant, seulement une taille est affichée à l'écran : la taille définie par le sélecteur `.big`, car il arrive après `.small`.


## En résumé
Chaque sélecteur possède une spécificité.
- Pour une même instruction CSS dans deux sélecteurs différents affectant des éléments en commun, la spécificité de plus grand "poids" l'emporte sur les autres.
- Pour une même instruction CSS dans deux sélecteurs différents affectant des éléments en commun, si la spécificité est la même, alors c'est l'ordre dans le fichier CSS qui comptera. 
