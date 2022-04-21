---
layout: post
title: "Cours Développement Frontend - Manipulation du DOM"
date: 2022-03-14 12:28:11 +0200
categories: [cours, 1A, frontend]
---
# JavaScript - Manipulation du DOM

Nous allons désormais voir comment manipuler le DOM avec JavaScript. Au travers d'un TP, nous verrons comment créer, modifier et supprimer des éléments HTML. Nous verrons également comment gérer des interactions avec les utilisateurs et les utilisatrices.

## Mise en place de l'environnement

Pour mener à bien ce TP, il va falloir mettre en place votre environnement de travail.

Dans un dossier dédié au TP, créez trois fichiers :

- `index.html` ;
- `style.css` ;
- `app.js`.

Dans votre fichier HTML, écrivez la structure de base (DOCTYPE, html, header et body), et incluez-y votre fichier `style.css`.

## Inclure un fichier JavaScript

Nous allons directement inclure notre fichier JavaScript, même s'il est vide pour le moment.

Pour inclure un fichier JavaScript, il suffit d'utiliser les balises `<script></script>`.

Entre les balises `<head></head>` de votre page web, écrivez :

```html
<script defer src="./app.js"></script>
```

Voyons ensemble les attributs de cette balise.

- l'attribut `src` est assez clair : il permet de spécifier le chemin vers la ressource à inclure :
- l'attribut `defer`, en revanche, est encore inconnu !

Ce dernier attribut permet de s'assurer **que le DOM sera construit** lorsque le script **sera chargé et exécuté**.

En fait, lorsque votre page HTML charge, le navigateur va fonctionner de manière bête et méchante : il va lire ligne par ligne votre fichier, et va construire le DOM comme ça.

Ainsi, si jamais vous voulez charger en même temps un script JavaScript, il sera chargé **avant** que le DOM ne soit construit si jamais vous ne mettez pas l'attribut `defer`.
Pour illustrer le problème que cela peut causer, prenons le code suivant :

```html
<!DOCTYPE html>
<html>
<head>
  <script src="./app.js"></script>
</head>
<body>
  <button id="btn">click me</button>
</body>
</html>
```
*index.html*

```js
const btn = document.getElementById('btn');
btn.addEventListener('click', () => console.log('clicked'));
```
*app.js*

Dans ce cas de figure, le navigateur va fonctionner comme suit :

- il va lire la première instruction, le `DOCTYPE` ;
- puis la balise `<html>`, et va construire le DOM avec le premier *noeud* ;
- il va ensuite lire la balise `<head>` et va rajouter un deuxième *noeud*.
- il arrive ensuite à la balise `<script>` : de là, le navigateur bloque le rendu de la page, et charge le script JavaScript et **l'exécute**. Cela signifie donc que les deux lignes de code du script vont s'exécuter comme suit :
- récupérer l'élément d'ID `btn` ;
- essayer d'y attacher un gestionnaire d'événements.

Et à cette dernière étape, une erreur est lancée. Pourquoi ?
En réalité, lorsque le script essaye de récupérer l'élément d'ID `btn`, ce dernier n'est pas encore construit dans le DOM (puisque le chargement de la page est bloquée, le temps d'exécuter le script) : du coup, au lieu d'avoir l'élément demandé dans la constante `btn`, on se retrouve avec la valeur `null`.
C'est cette valeur qui cause une erreur lorsque l'on essaye d'y attacher un gestionnaire d'événements.

Voilà pourquoi, sur votre balise `<script>`, lorsque vous voulez charger un script JavaScript, il est préférable de mettre l'attribut `defer`.

## Manipuler le DOM

### Créer des éléments
Pour commencer, nous allons **créer des éléments** du DOM avec JavaScript.

Dans votre fichier `index.html`, rajoutez le code suivant :

```html
<main>
  <button id="addBtn">Add a square</button>
  <div class="square-list"></div>
</main>
```
*index.html*

Dans votre fichier `style.css`, rajoutez le code suivant :

```css
body {
  margin: 0;
}

main {
  min-height: 100vh;
  display: grid;
  place-items: center;
  gap: 16px;
}

.square-list {
  display: flex;
  flex-wrap: wrap-reverse;
  gap: 8px;
  width: 100%
}

.square {
  height: 100px;
  background-color: red;
  animation: appears 1s ease forwards;
}

#addBtn {
  position: sticky;
  top: 0;
  width: 100%;
  height: 200px;
  align-self: start;
  font-size: 3rem;
}

@keyframes appears {
  from {
    flex: 0;
  }
  
  to {
    flex: 1 0 100px;
  }
}
```
*style.css*

Maintenant, tout le code que vous allez écrire sera dans le fichier `app.js`. L'idée ici est très simple : nous allons écrire un petit script qui nous permettra de générer des carrés et rectangles rouges.

#### Récupérer le bouton

La première chose que nous allons faire sera de récupérer le bouton d'ID `addBtn` en JavaScript.
Pour cela, il existe une méthode : `document.getElementById('id')`. Cette méthode permet, pour un identifiant donné, de récupérer l'élément correspondant.

Ici, écrivez : `document.getElementById('addBtn');`.
Stockez également le résultat de cet appel dans une constante appelée `addBtn`.

#### Surveiller un événement

Désormais, nous souhaitons ajouter un carré ou un rectangle dès lors que l'on clique sur le bouton.

Pour cela, nous allons :

- surveiller l'événement "click" du bouton ;
- créer un carré à insérer dans le DOM.

Pour le premier point, nous allons utiliser la méthode `addEventListener` : [https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener). Cette méthode prend deux arguments en paramètres : le nom de l'événement à surveiller, et une fonction (**callback**) à exécuter dès que cet événement est déclenché.

Ici, écrivez :

```js
addBtn.addEventListener('click', () => {

});
```

Ici, nous écoutons l'événement "click" sur le bouton `addBtn`, et lui passons une **callback** `() => {}` qui, pour le moment, ne fait rien. Il va nous falloir désormais écrire le code de cette fonction.

#### Créer un élément

[https://developer.mozilla.org/fr/docs/Web/API/Document/createElement](https://developer.mozilla.org/fr/docs/Web/API/Document/createElement)

La méthode permettant de créer un élément du DOM est la suivante :

```js
document.createElement('element');
```

où "element" est le nom de l'élément.

Pour nos carrés et rectangles, nous allons utiliser de simples `div`. Ecrivez donc, dans la fonction de notre *event listener* :

```js
const square = document.createElement('div');
```

Ici, nous créons une `div` que nous stockons dans une constante nommée `square`.

Malheureusement, cela ne suffit pas ! En effet, notre élément est créé, mais pas encore ajouté dans l'arborescence de notre page !

De plus, aucun style ne lui est encore appliqué !

Heureusement, nous avons, dans notre CSS, du style pour un sélecteur `.square`. Il nous suffit donc d'ajouter une classe à notre élément nouvellement créé.

#### Ajouter une classe à un élément

Pour ajouter une classe à un élément, il suffit d'utiliser `classList` et sa méthode `add()`.

[https://developer.mozilla.org/fr/docs/Web/API/Element/classList](https://developer.mozilla.org/fr/docs/Web/API/Element/classList)

Cette propriété et sa méthode fonctionnent ainsi : pour un élément `e`, on peut lui rajouter une classe CSS en faisant `e.classList.add('classeCss')`.

Ainsi, dans notre cas, nous allons faire :

```js
square.classList.add('square');
```
Ici, nous rajoutons simplement la classe CSS `square` à notre élément nouvellement créé.

Il ne nous reste plus qu'à le rajouter dans l'arborescence de notre page web.

#### Insérer un élément dans la page

Mais où insérer notre élément ?
Dans notre HTML, nous avons une `div` portant la classe `square-list`. C'est donc ici que nous allons l'insérer.

Pour cela, récupérez la `square-list`, mais cette fois-ci avec la méthode `querySelector`. Cette méthode permet de récupérer le premier élément correspondant à un sélecteur CSS donné.

[https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector](https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector).

Dans notre cas, écrivez :

```js
const squareList = document.querySelector('.square-list');
```

Ici, nous récupérons le premier élément de notre page web correspondant au sélecteur `.square-list`, et nous le stockons dans une constante nommée `squareList`.

Une fois cela fait, il ne reste plus qu'à y insérer notre carré ou rectangle créé/
Nous utiliserons les méthodes `appendChild` ou `append`

- [https://developer.mozilla.org/fr/docs/Web/API/Node/appendChild](https://developer.mozilla.org/fr/docs/Web/API/Node/appendChild) ;
- [https://developer.mozilla.org/en-US/docs/Web/API/Element/append](https://developer.mozilla.org/en-US/docs/Web/API/Element/append)

Ces deux méthodes prennent en argument des éléments HTML. Ainsi, nous pouvons écrire :

```js
squareList.appendChild(square);
```

#### Testez !

Vous pouvez désormais tester !
Cliquez sur le bouton pour voir apparaître des carrés et rectangles rouges.

Une correction est disponible ici : [https://codepen.io/nugetchar/pen/VwyeXVN](https://codepen.io/nugetchar/pen/VwyeXVN)

#### En résumé

- `document.getElementById()` permet de récupérer un élément à partir de son ID ;
- `element.addEventListener()` permet d'écouter un événement et d'exécuter une ou plusieurs fonctions dès qu'il se déclenche ;
- `document.createElement()` permet de créer un élément **sans l'insérer dans le DOM** ;
- `element.classList` permet de gérer les classes CSS d'un élément du DOM ;
- `element.classList.add()` permet de rajouter une ou plusieurs classes CSS à un élément du DOM ;
- `document.querySelector()` permet de récupérer le premier élément correspondant au sélecteur CSS passé en paramètre ;
- `element.appendChild()` permet d'insérer un nouvel élément.

### Supprimer des éléments

Maintenant, nous allons faire en sorte qu'au clic sur un carré, ce dernier disparaisse !

Pour rappel, en JavaScript, nous avons le code suivant :

```js
const addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', () => {
  const square = document.createElement('div');
  square.classList.add('square');
  
  const squareList = document.querySelector('.square-list');
  squareList.appendChild(square);
});
```

Dans notre *event listener*, nous avons accès à chaque carré lors de sa création.
Nous pouvons également y associer un événement !

Juste après la ligne `square.classList.add`, associez l'événement "click" sur le carré avec la méthode `addEventListener`. La callback que vous lui passerez sera, pour le moment, vide.

#### Suppression du DOM

Dans la **callback**, il va falloir dire à notre navigateur que l'on veut supprimer l'élément sur lequel nous venons de cliquer.

Pour cela, nous allons utiliser la méthode `remove`, qui permet tout simplement de supprimer un élément du DOM.

[https://developer.mozilla.org/en-US/docs/Web/API/Element/remove](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove)

Ainsi, nous aurons `square.remove()` à ajouter dans notre **callback**.

#### En résumé

- il est possible de créer des *event listeners* sur des éléments nouvellement créé ;
- on peut supprimer un élément avec la méthode `remove()`.

Une correction est disponible ici : [https://codepen.io/nugetchar/pen/VwyexXe](https://codepen.io/nugetchar/pen/VwyexXe).

## Le TP

Il est désormais temps de passer au TP à proprement parler.
Faites une copie de votre dossier (par exemple pour vos futures révisions), et allez sur le CodePen suivant : 

- classe 1 : [https://codepen.io/nugetchar/pen/XWVXYPK](https://codepen.io/nugetchar/pen/XWVXYPK) ;
- classe 2 : [https://codepen.io/nugetchar/pen/ZEvPPpm](https://codepen.io/nugetchar/pen/ZEvPPpm) ;
- classe FT : [https://codepen.io/nugetchar/pen/MWrxxJz](https://codepen.io/nugetchar/pen/MWrxxJz).

Sur ce CodePen se trouve une app très basique : une liste de contacts affiche leurs noms, prénoms et numéro de téléphone, ainsi qu'une petite croix. Il y a également un bouton en bas à droite.

Le but de ce TP est de partir du CodePen, et d'implémenter, en JavaScript, les comportements suivants :

- lorsque l'on entre quelque chose dans la barre de recherche, seuls les éléments dont le nom, le prénom ou le numéro de téléphone comportent le texte tapé doivent s'afficher ;
- lorsque l'on clique sur la croix d'un contact, cela le ou la supprime de la liste ;
- lorsque l'on clique sur le bouton en bas à droite, un formulaire s'affiche et propose d'entrer un nouveau contact.

Nous allons faire ce TP ensemble, alors soyez attentifs et attentives ;) !