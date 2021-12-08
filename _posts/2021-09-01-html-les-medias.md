---
layout: post
title: "Cours Développement Frontend - Les médias"
date: 2021-12-04 12:25:11 +0200
categories: [cours, 1A, frontend]
---
# HTML - Les médias

Nous allons aujourd'hui nous intéresser aux médias en HTML. Nous allons voir les images, les vidéos et l'audio.

## Les images
Les images peuvent être vectorielles (.svg) ou matricielles (.png, .jpg, .gif, etc).
Elles sont inclues grâce à la balise `<img src="path/to/my/image" alt="Texte alternatif">`.

Pour être inclue, le chemin indiqué dans l'attribut `src` doit pointer soit vers un fichier existant sur le même serveur que votre site, soit vers une ressource externe : dans le cas d'une ressource externe accessible via HTTP, il faudra mettre l'URL entière.

Par exemple :

```html
<img src="https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Image d'une éclipse">
```

Il est possible de définir la taille d'une image, en jouant directement sur sa balise. Exemple :
```html
<img  src="path/to/my/image"  alt="Texte alternatif"  width="150"  height="150">
```

**\/!\\** Nous avons vu en cours qu'il était préférable de mettre le style CSS dans un fichier séparé. Dans le cas des images, il n'y a pas de réponse toute faite. Cependant, il faut noter ceci :

- utiliser les attributs `width` et `height` n'est pas une bonne pratique : votre CSS pourrait se substituer à ces attributs et donner une image déformée ;
- il est alors préférable soit d'utiliser du CSS, soit d'utiliser l'attribut `style` comme suit :

```html
<img  src="path/to/my/image"  alt="Texte alternatif"  style="width:150px;height:auto;">
```

**Faut-il utiliser l'attribut `style` ou bien du CSS ?**
Tout va dépendre du besoin. Dans une optique de performance, il est peut-être préférable d'utiliser l'attribut `style`. Dans une optique de qualité de code et donc de découplage du style et du HTML, on aurait plus tendance à faire comme suit :
```html
<img  class="bigImage"  src="path/to/my/image"  alt="Texte alternatif">
```
Et dans un fichier de style CSS

```css
.bigImage {
	width: 300px; /* une largeur en px */
	height: auto; /* on laisse la hauteur se dimensionner automatiquement pour garder le ratio */
}
```
Les deux façons de faire son valables, il faut simplement comprendre pourquoi on choisit l'une et pas l'autre.

*Quelques remarques :*
- il est préférable de pointer vers des images qui se trouvent sur la même machine que votre fichier HTML (performance) ;
- il est important de spécifier un texte alternatif à afficher le temps que l'image charge, ou bien si l'image ne s'affiche pas, avec l'attribut `alt` ;
- je vous recommande de respecter la sémantique et d'utiliser la balise `<figure></figure>` pour y placer votre `<img ...>` et la balise `<figcaption></figcaption>` si vous voulez lui spécifier une légende.

### Exercice 1
Créez un fichier `index.html` et un fichier `style.css`, et rendez-vous sur le site [https://unsplash.com](https://unsplash.com). Choisissez deux photos : une que vous allez télécharger, l'autre dont vous allez prendre l'URL.

Dans votre fichier `index.html`, incluez les deux images pour que votre page web les affiche.
Une fois que cela est fait, redimensionnez-les via CSS en leur appliquant une hauteur et une largeur de `200px`.

### Exercice 2
Vous devriez alors voir que vos images sont plus ou moins déformées ! En effet, en leur appliquant un format carré, nous ne tenons pas compte de leur échelle hauteur/largeur réelle !

Pour palier cela, retournez dans votre CSS, et mettez **une largeur de `200px`** et une hauteur à `auto` ou `100%`.

Essayez maintenant de **ne pas** spécifier de hauteur : qu'est-ce que cela change ?

Mettez maintenant la hauteur à `200px` et la largeur à `100%`. Quel est le rendu visuel ?

Vous devriez alors remarquer que **la largeur prévaut sur la hauteur**.

### Exercice 3

Dans le CodePen suivant, redimensionnez les images pour qu'elles tiennent toutes les trois dans la largeur de la page.
[https://codepen.io/nugetchar/pen/qBPNaKO](https://codepen.io/nugetchar/pen/qBPNaKO).

## Les vidéos
Les vidéos peuvent être intégrées de plusieurs manières.

### Les vidéos en provenance d'autres sites
Bien entendu, il est possible d'intégrer des vidéos, en provenance par exemple de YouTube, avec des `<iframe></iframe>`. Ce n'est pas ce que nous allons voir dans ce cours.

```html
<iframe  width="560"  height="315"  src="https://www.youtube.com/embed/XkvrHQNmigs"  frameborder="0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"  allowfullscreen></iframe>
```
#### La balise `<video></video>`
Une vidéo s'inclue dans une page HTML à l'aide de la balise `<video></video>`. De la même manière que pour les images, on aura tendance à jouer sur les dimensions soit avec l'attribut `style`

```html
<!-- Dimensionnement avec l'attribut style -->
<video  src="path/to/my/video"  style="width:150px; height:auto">
</video>
```

soit avec du CSS :
```html
<video  src="path/to/my/video"  class="bigVideo">
</video>
```
```css

.bigVideo {
	width: 500px;
	height: auto;
}
```

#### Les différents attributs 
 Il est possible de personnaliser le comportement d'un lecteur vidéo de base avec les attributs spécifiques à la balise `<video></video>`. En voici quelques-uns :

-  `src` : indique l'emplacement de la vidéo
-  `controls` : permet d'afficher les contrôles de la vidéo (play/pause, le son, mode plein écran)
-  `autoplay` : indique que la vidéo doit démarrer dès que possible
-  `poster` : permet de spécifier une image de preview avant que l'utilisateur ne joue la vidéo
-  `preload` : indique au navigateur à quel moment les données de la vidéo doivent être chargées : dès le chargement de la page, uniquement les metadata ou au moment où l'utilisateur décide de jouer la vidéo

#### Le problème des codecs
Pour pouvoir lire un format donné de vidéo, un navigateur a besoin de **codecs**. Tous les navigateurs ne disposent pas forcément des bons codecs. C'est pour cela qu'il est intéressant d'utiliser la balise `<source></source>` afin de proposer un ensemble de formats que le navigateur pourra lire :

```html
<video>
	<source  src="./assets/drone.mp4"  type="video/mp4">
	<source  src="./assets/drone.ogg"  type="video/ogg">
	<p>Ce texte s'affichera si aucun format n'est supporté</p>
</video>
```

## Les medias audio
À l'instar des vidéos, on utilisera la balise `<audio></audio>` pour incorporer un media audio dans un document HTML. Cette balise offre des attributs similaires, et permet également de travailler avec la balise `<source></source>` pour spécifier l'emplacement de divers formats.
