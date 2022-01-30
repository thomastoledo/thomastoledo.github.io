---
layout: post
title: "Cours Développement Frontend - Les positions et les empilements"
date: 2021-12-23 12:24:11 +0200
categories: [cours, 1A, frontend]
---
# CSS - Les positions et les empilements

Les positions sont un concept important en CSS. Parmi vous, certains et certaines ont probablement déjà entendu parler de `position: absolute`, sans pour autant comprendre les tenants et aboutissants de cette règle CSS.

Au travers de ce cours, nous allons manipuler la propriété CSS `position` et allons donc voir comment le navigateur gère cela.

## Le positionnement par défaut

Par défaut, le navigateur positionne les éléments HTML les uns à la suite des autres. Ils ont donc un emplacement qui leur est attribué.
Les éléments prennent une certaine place et se succèdent de manière linéaire.

On appelle ce positionnement, le **positionnement `static`**.

Il est géré grâce à la propriété CSS `position`.
Cette propriété CSS accepte plusieurs valeurs :
- `static` ;
- `relative` ;
- `absolute` ;
- `fixed` ;
- `sticky`.

## Le positionnement relatif
Il est possible de dire qu'un élément sera positionné de **manière relative**. Cela signifie que son emplacement sera toujours conservé, mais qu'il pourra être décalé. Pour illustrer cela, voyons l'exemple suivant : [https://codepen.io/nugetchar/pen/MWYrymK](https://codepen.io/nugetchar/pen/MWYrymK).

Dans cet exemple, nous avons trois éléments : *titi*, *tata*, *toto*. Chacun des éléments est positionné par défaut.

Néanmoins, pour le premier élément, vous voyez que j'y ai mis la règle CSS `position: static`. Essayez de modifier la valeur `static` par `relative`.
Vous voyez alors que l'élément se décale pour être placé tout en bas ! De plus, l'espace qu'il occupait tout en haut reste inchangé !

**Explications** :
Un positionnement **relatif** permet d'appliquer un décalage sur un élément, sans que son emplacement (l'espace utilisé initialement) ne soit modifié. Dans notre exemple, on décale l'élément vers le bas, et son emplacement (désormais vide) reste inoccupé.

### Les décalages
Depuis tout à l'heure, je vous parle de décalage. Pourtant, le fait de spécifier un positionnement à un élément **ne le décale pas forcément**. En fait, dans notre exemple précédent, ce qui appliquait un décalage, c'était la propriété CSS `top`.

Il existe quatre propriétés de décalage :
- `top` pour décaler vers le bas ;
- `left` pour décaler vers la droite ;
- `right` pour décaler vers la gauche ;
- `bottom` pour décaler vers le haut.

Chaque propriété peut avoir une valeur positive ou négative, et dans n'importe quelle unité (`px`, `em`, `rem`, `%`, `vh`, `vw`...).

- si l'on n'applique aucun décalage à l'élément, alors ce dernier ne bougera pas ;
- si l'on n'applique aucun positionnement à l'élément, alors les propriétés de décalage **n'auront aucun effet** ;
- un décalage n'est pas une marge !

## Le positionnement absolu
Il est possible de dire qu'un élément sera positionné de **manière absolue**. Cela signifie qu'il pourra être décalé, mais que **son emplacement ne sera pas conservé**. Pour illustrer cela, voyons l'exemple suivant : [https://codepen.io/nugetchar/pen/vYEevNZ](https://codepen.io/nugetchar/pen/vYEevNZ).

Dans cet exemple, nous avons cette fois-ci positionné l'élément vert en tant que `absolute`, et lui avons appliqué un décalage `top` de `100px`. Vous pouvez alors remarquer trois choses :

- son emplacement a été complété par les deux autres blocs qui sont "remontés" ;
- il est superposé à l'élément bleu ;
- comme chaque élément a une hauteur de 50px, et que son décalage est > 100px, il devrait se retrouver juste en-dessous du deuxième élément, mais ne l'est pas : **son référentiel a été modifié**.

Explicitons les trois points ci-dessus.
Lorsqu'un élément est positionné en `absolute`, son emplacement n'est pas conservé : les autres éléments vont alors "remonter" le flux d'affichage pour le compléter. C'est la **grande différence** avec le positionnement **relatif**.

L'élément vert se retrouve superposé à l'élément bleu. Cela implique que le navigateur gère la superposition d'éléments. Il la gère selon des règles simples que nous verrons juste après.

Enfin, j'ai dit que le **référentiel** de l'élément vert avait été **modifié**. En effet, lorsque l'on positionne un élément de manière **absolue**, on va en réalité le "sortir" de son flux d'affichage initial, pour ensuite le placer sur la page.

Pour vous en convaincre, rajoutez, à l'élément d'ID `tata`, la règle CSS suivante : `left: 0`. Vous verrez alors que l'élément vert va se placer tout à gauche de la page, et non tout à gauche du conteneur rouge.

Mais alors, que se passe-t-il si jamais un des éléments parents est lui-même positionné, que cela soit en relatif ou en absolu ? Pour le découvrir, placez l'élément d'ID `container` en relatif avec `position: relative`, et testez ensuite avec `position: absolute`.

En fait, on peut formaliser le référentiel d'un élément positionné de manière absolue de la façon suivante ;

**Un élément positionné en `absolute` aura comme référentiel le premier de ses éléments parents étant lui-même positionné autrement qu'en `static` (qui est le positionnement par défaut).**

## Le positionnement fixe
Le positionnement fixe a les mêmes propriétés que le positionnement absolu, à ceci près qu'un élément positionné de manière fixe est **indépendant du *scroll***. De plus, le **référentiel** de positionnement d'un élément "fixe" est directement la zone d'affichage.

Voici un exemple : [https://codepen.io/nugetchar/pen/XWJVxrm](https://codepen.io/nugetchar/pen/XWJVxrm).

Dans cet exemple, le deuxième élément (en bleu) est caché par le troisième élément. Pour le voir, il faut faire défiler la page : vous verrez alors que le premier et le troisième élément suivent le défilement, tandis que le deuxième reste en place.

## Le positionnement *sticky*
Le dernier positionnement que j'introduis dans ce cours est le positionnement *sticky*. Il s'agit d'un positionnement hybride qui combine à la fois les propriétés du positionnement relatif, et à la fois les propriétés du positionnement fixe.

Voyons de quoi il en retourne au travers d'un exemple : [https://codepen.io/nugetchar/pen/dyPJgKe](https://codepen.io/nugetchar/pen/dyPJgKe).

Ici, j'ai positionné l'élément bleu en tant que *sticky* avec la règle CSS suivante : `position: sticky`. Je lui ai également appliqué des décalages : `top: 0` et `left: 0`. Pourtant, lorsque vous faites défiler la page, que cela soit verticalement ou horizontalement, l'élément suit le défilement dans un premier temps pour ensuite se comporter comme un élément *fixed* une fois les bords de la page atteints.

Qu'est-ce que cela signifie ?
Cela signifique qu'un élément positionné de manière *sticky* va, par défaut, se comporter comme un élément positionné de manière relative. **Néanmoins**, si des décalages lui sont spécifiés (`top`, `right`, `bottom`, `left`), alors dès que l'élément **atteindra ces décalages** par rapport à son **référentiel**, il se comportera comme un élément **fixed**.

**Transposée à notre exemple**, cette définition signifie que l'élément bleu se comporte comme un élément positionné de manière relative, et dès qu'il atteint `0px` sur la gauche ou le haut de son référentiel, alors il passe en fixe.

## Les empilements

Nous venons de voir les différents positionnements possibles pour les éléments HTML. Nous avons également vu que certains s'empilaient sur ou sous d'autres !

Nous l'avons vu : notre navigateur a une manière bien à lui de gérer la manière dont les éléments doivent s'afficher. La manière dont ils s'empilent n'y fait pas exception. Voici comment le navigateur "décide" quels éléments seront dessus et quels éléments seront dessous.

- par défaut, tous les éléments `static` sont situés au même niveau ;
- si un élément a un positionnement autre que `static`, il sera positionné **au-dessus** des éléments `static` ;
- si deux éléments positionnés autrement qu'en `static` doivent se chevaucher, alors c'est le dernier qui sera au-dessus.

L'exemple suivant l'illustre très bien : [https://codepen.io/nugetchar/pen/LYEdEPa](https://codepen.io/nugetchar/pen/LYEdEPa).

Il existe, enfin, une propriété CSS qui permet de gérer manuellement l'empilement d'éléments se chevauchant. Cette propriété s'applique **uniquement** aux éléments étant **positionnés** autrement qu'en `static`. Elle n'a aucun effet sur les éléments positionnés en `static`.

Il s'agit de la propriété `z-index` : [https://developer.mozilla.org/fr/docs/Web/CSS/z-index](https://developer.mozilla.org/fr/docs/Web/CSS/z-index)

Deux éléments se chevauchant et étant positionnés autrement qu'en `static` pourront voir leur ordre d'empilement modifié avec la propriété `z-index`.

L'exemple suivant l'illustre tout autant : [https://codepen.io/nugetchar/pen/KKwodVd](https://codepen.io/nugetchar/pen/KKwodVd).


## TP
Il est désormais temps de mettre en pratique ce que nous venons de voir.

Pour commencer, récupérez le TP en cliquant sur le lien suivant : [TP Positions]({{ site.url }}/assets/tp_positions/TP_Positions.zip)

Ensuite, voici l'objectif.

### Objectif
J'ai développé un outil très rudimentaire qui permet de générer des images aléatoires très simples, ici : [https://randomcanvas.netlify.app/](https://randomcanvas.netlify.app/). Cet outil permet de les télécharger et également de les sauvegarder dans une galerie locale à votre navigateur (nous verrons comment cela fonctionne lorsque nous attaquerons JavaScript).

Dans le code que je vous ai fourni, j'ai volontairement enlevé les différentes positions et les différents empilements qui sont présentes et présents dans la version en ligne.
Votre but est de rétablir un CSS correct via ces positions et empilements.

### L'architecture du TP
Avant de vous plonger tête baissée dans le code, il faut comprendre l'architecture du TP.

#### Le HTML
Il y a deux pages pour cet outil : `index.html` et `gallery.html`. Chaque fichier correspond à une page du site. Rien de bien compliqué jusqu'à présent, donc.

#### Le JavaScript
Situés dans le dossier `scripts`, les fichiers JavaScript sont au nombre de 3 : `app.js`, `gallery.js` et `menu.js`. Vous n'avez pas à vous soucier de ces fichiers pour ce TP.

#### Le CSS
Pour plus de lisibilité, j'ai découpé le code CSS en plusieurs fichiers.
Ces fichiers sont situés dans le dossier `styles`. 

- `style.css` est utilisé dans `index.html`. Il importe les fichiers `global.css` et `header.css` ;
- `gallery.css` est utilisé dans `gallery.html`. Il importe les fichiers `global.css`, `header.css` et `overlay.css` ;
- `global.css` spécifie du style qui se retrouve de manière globale sur le site ;
- `header.css` spécifie le style du *header* et du menu ;
- `overlay.css` spécifie le style de l'image agrandie lorsque l'on clique sur une image depuis la galerie.

Les fichiers qui vont nous intéresser dans ce TP seront `overlay.css` et `header.css`.

### Les consignes
En vous basant sur les affirmations suivantes et en vous aidant du cours précédent, spécifiez le positionnement correct aux bons éléments.

- Le *header* doit être indépendant du *scroll* **et** garder son emplacement dans le flux d'affichage ;
- Le menu doit être indépendant du *scroll* ;
- La liste du menu doit conserver son emplacement ;
- Le bouton d'ouverture du menu doit être dépendant du *scroll* **mais** son emplacement ne doit pas être conservé ;
- Le bouton de fermeture du menu doit être dépendant du *scroll* **mais** son emplacement ne doit pas être conservé ;
- L'*overlay* doit être indépendant du *scroll*.
