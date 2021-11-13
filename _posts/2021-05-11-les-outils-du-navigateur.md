---
layout: post
title: "Cours Développement Frontend - Les outils du navigateur"
date: 2021-05-11 12:17:11 +0200
categories: [cours, 1A, frontend]
---
# Cours Développement Frontend - Les outils du navigateur
Les développeurs et développeuses front-end ont à leur disposition plusieurs outils pour s'assurer de la qualité de leur travail.

Parmi ces outils, le navigateur est le principal. Il permet de :
- visualiser le rendu (logique) ;
- modifier en live le rendu ;
- exécuter des scripts directement dans sa console ;
- mesurer les performances d'une page web (temps de chargement, ressources) ;
- vérifier si une page est *responsive* ;
- regarder les différentes requêtes HTTP.

## Exercice
Pour vous familiariser avec cet outil, prenez le navigateur de votre choix. Ici, j'utiliserai Firefox.
Allez sur n'importe quel site (allociné, instagram, twitter, youtube, spotify...), et suivez les étapes suivantes :

 1. faites un clic-droit sur la page, et choisissez "inspecter" : l'inspecteur d'élément du navigateur va s'ouvrir. Vous aurez alors le choix entre plusieurs onglets : "inspecteur", "console", "débogueur", "réseau". Il est possible que les noms des onglets soient en anglais. D'autres onglets sont disponibles mais ne sont pas utiles pour nous, pour le moment;
 ![inspecter]({{ site.url }}/assets/inspecter.png)
 2. dans "inspecteur", vous pouvez dérouler ce qui s'appelle le DOM (Document Object Model), qui est une représentation de votre page sous forme de code ;
 ![inspecter]({{ site.url }}/assets/inspecter2.png)
 3. pour chaque élément du DOM, il est possible de **voir et modifier** le style de cet élément. Cela est particulièrement utile lorsque vous voulez faire des vérifications rapides et / ou des tests directement sur votre page web ;
 4. dans "console", vous pourrez voir les erreurs JavaScript et également exécuter du code. Nous verrons cela plus tard dans l'année ;
 5. le "débogueur" permet d'exécuter du code JavaScript pas à pas ;
 6. "réseau" permet de superviser les requêtes HTTP.


