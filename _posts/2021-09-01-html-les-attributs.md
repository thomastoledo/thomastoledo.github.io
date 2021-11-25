---
layout: post
title: "Cours Développement Frontend - Les attributs"
date: 2021-09-01 12:20:11 +0200
categories: [cours, 1A, frontend]
---

# Cours Développement Frontend - Les attributs
En HTML, toutes les balises peuvent **porter des attributs**. Un attribut est un mot-clef auquel on affecte une valeur.

Voici un exemple :

```html
<p id="un_id"></p>
```

Ici, j'ai ouvert une balise de paragraphe avant de la refermer : sur la balise ouvrante, j'ai posé **un attribut**, à savoir `id`. La valeur de cet attribut est "un_id".
**Un attribut sera toujours déclaré sur la balise ouvrante**.

## À quoi servent les attributs ?
Les attributs ont plusieurs fonctions :

- permettre de sélectionner un ou plusieurs éléments pour leur appliquer du style (CSS) ;
- permettre de sélectionner un ou plusieurs éléments pour les manipuler (JavaScript) ;
- indiquer des valeurs pour les metadata ;
- indiquer des comportements pour certains éléments. Par exemple, l'attribut `disabled` appliqué sur un bouton le désactive et empêche l'utilisateur de cliquer dessus.

## Quels sont les attributs existant ?

Certains attributs peuvent se retrouver sur n'importe quelles balises. C'est le cas par exemple des attributs `id` et `class`, qui permettent de spécifier respectivement un identifiant unique par élément et par page, et un ensemble de groupes auxquels peuvent appartenir plusieurs éléments. Nous y reviendront plus en détail quand nous attaqueront le CSS.

D'autres attributs sont quant à eux spécifiques à certaines balises. Leur liste complète peut être lue ici : [https://developer.mozilla.org/fr/docs/Web/HTML/Attributes](https://developer.mozilla.org/fr/docs/Web/HTML/Attributes). 
Certains ne sont plus à utiliser car obsolètes, d'autres si. Nous les verrons au fur et à mesure des séances.

## Quelques exemples

Voici quelques exemples pour illustrer la manière dont s'utilisent les attributs :

**Appliquer un identifiant unique pour un élément**
```html
<div id="uneDiv">
Ceci est une div quelconque
</div>
```

**Appliquer plusieurs classes à plusieurs éléments**
```html
<main>
	<h1 class="big-title">Titre principal</h1>
	<h2 class="secondary-title red-title">Titre secondaire 1</h2>
	<p>...</p>
	<h2 class="secondary-title red-title">Titre secondaire 2</h2>
	<p>...</p>
</main>
```
Ici, vous voyez que les classes `secondary-title` et `red-title` sont appliquées à plusieurs éléments. Vous remarquez également que pour appliquer plusieurs classes à un élément, il suffit de spécifier les noms des classes séparés par un espace.

**Désactiver un bouton**
```html
<button disabled>Ce bouton est désactivé</button>
```

**Indiquer le type d'un champ**
```html
<input type="number">
```
Ici, on ne pourra taper que des chiffres dans ce champ.


## Conclusion

Vous venez de voir la syntaxe pour ajouter des attributs sur des balises. Tout ceci peut paraître encore un peu abstrait : nous verrons l'utilité des attributs, notamment `id` et `class`, lorsque nous ferons du CSS et du JavaScript.
