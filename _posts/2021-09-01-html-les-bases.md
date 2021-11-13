---
layout: post
title: "Cours Développement Frontend - Les bases"
date: 2021-09-01 12:18:11 +0200
categories: [cours, 1A, frontend]
---

# Cours Développement Frontend - Les bases
HTML est un langage né en 1991, inventé par Sir Tim Berners-Lee.
Il signifie Hyper Text Markup Language, et est dérivé d'un autre langage : le 	SGML (Standard Generalized Markup Language).

"Markup" signifie "tag" ou encore "balise" : il s'agit donc d'un langage écrit sous forme de balises.

Durant les années qui ont suivit, on vit apparaître le xHTML, qui fut rapidement abandonné. Aujourd'hui, lorsque l'on parle de HTML, on parle de HTML5.

## Le DOCTYPE
- il s'agit d'une instruction et non d'une balise ;
- il instruit le navigateur quant à la version de HTML à utiliser ;
- il se met toujours en début de fichier.
L'instruction est la suivante :

`<!DOCTYPE html>` <- spécifie que l'on va utiliser la version 5 de HTML

## Compatibilité entre navigateurs
Les langages du Web sont en constante évolution. Ainsi, des fonctionnalités sont ajoutées année après année, et, plus rarement, certaines devenues obsolètes sont marquées comme étant dépréciées.
Ainsi, il est possible que certaines nouvelles fonctionnalités ne soient par exemple disponibles que sous Chrome mais pas Firefox, et inversement.

Pour s'assurer de cela, le site [https://caniuse.com/](https://caniuse.com/) permet de voir sur quelles versions de quels navigateurs une fonctionnalité peut être supportée.

## Les balises de base

Nous allons créer notre premier document HTML.
Pour cela, nous allons utiliser un éditeur de texte. Je vous recommande d'installer Visual Studio Code, qui est complet et gratuit : [https://code.visualstudio.com/download](https://code.visualstudio.com/download).

Une fois que vous l'avez installé, créez un nouveau fichier nommé `index.html`. C'est dedans que nous allons écrire notre code HTML.

### Le DOCTYPE
Comme dit précédemment, le DOCTYPE est la première instruction d'un document HTML. Ecrivez donc, au début de votre fichier, l'instruction correspondante.

### La balise HTML
En-dessous du DOCTYPE, nous allons écrire nos premières balises : les balises HTML.
Elles s'écrivent comme suit :

```html
<html>
</html>
```

Si la coloration syntaxique n'est pas la même sur votre éditeur de texte, ce n'est pas grave.

Vous remarquez qu'il y a une balise avec un `/`, et une sans `/`. La première est ce que l'on appelle une **balise ouvrante**, et la seconde une **balise fermante**.

Certaines balises n'ont pas besoin de **balises fermantes** : elles sont ce que l'on appelle **auto-fermantes**.

La balise `<html>`est unique par page HTML. Elle est la racine de votre page. C'est entre la balise ouvrante et la balise fermante que nous allons écrire le reste de notre code.

### La balise HEAD
 Cette balise contient toutes les informations qui **décrivent** le document HTML. Elle ne contient aucune information affichée sur la page. On y trouvera le titre de l'onglet, la langue, le type d'encodage, et des inclusions de style et de scripts.
Elle se situe entre les balises `<html></html>`.

Elle s'écrit comme ceci : `<head></head>`.

### La balise BODY
Cette balise englobera tout le contenu de la page web. On pourra également y retrouver des inclusions de scripts, comme pour `head`.

Elle se situe entre les balises `<html></html>` et après les balises `<head></head>`.

### Exercice
En vous aidant des informations précédentes, créez une page web (qui n'affichera rien) respectant le squelette de base (doctype + balises de base).

## Les balises META

Entre les balises `<head></head>`, on retrouve souvent des balises `<meta>`. Plusieurs choses sont à noter :
- elles sont auto-fermantes ;
- elles indiquent des méta données relatives au document.
Par exemple, pour spécifier que l'encodage de la page est en UTF-8 (ce qui est 99% des fois le cas), on écrira : 

`<meta  charset="UTF-8">`

Toute la documentation sur les balises META peut être retrouvée ici : [https://developer.mozilla.org/fr/docs/Web/HTML/Element/meta](https://developer.mozilla.org/fr/docs/Web/HTML/Element/meta).


