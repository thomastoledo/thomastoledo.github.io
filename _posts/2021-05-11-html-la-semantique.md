---
layout: post
title: "Cours Développement Frontend - Introduction"
date: 2021-05-11 12:19:11 +0200
categories: [cours, 1A, frontend]
---
# Cours Développement Frontend - La sémantique

## Qu'est-ce que la sémantique ?
La sémantique est une partie importante du HTML : elle garanti que votre code aura du sens pour la machine.

Mais qu'est-ce que cela signifie, "avoir du sens pour la machine" ?

Lorsque l'on écrit du code HTML, il faut distinguer deux choses : 
- la syntaxe ;
- la sémantique.

La syntaxe est le fait d'écrire du code correct et qui fonctionnera. Comme lorsque vous écrivez une phrase dans n'importe quelle langue, il y a une syntaxe à respecter. En HTML, c'est pareil !

Si j'écris par exemple :

```html
<!DOCTYPE html>
<html>
	<head>
	</head>
	<body>
	</body>
</html>
```

la syntaxe est correcte.

Mais si j'écris :

```html
<html>
	<head>
	<body>
	</head>
	</body>
</html>
```

la syntaxe est complètement fausse, puisque j'ai ouvert la balise `head`, puis j'ai ouvert une balise `body`, et j'ai ensuite fermé la balise `head ` avant de fermer la balise `body`. De plus, le `head` **ne peut pas** contenir le `body` !

Maintenant, revenons sur la sémantique.
Le premier morceau de code était syntaxiquement et sémantiquement correct. La sémantique désigne le sens délivré par une phrase. Dans un code HTML, la sémantique peut être fausse tandis que la syntaxe est juste !

Dans l'exemple suivant, j'utilise deux nouvelles balises : `h1` et `p`. La première permet de spécifier un titre principal, et la seconde de spécifier un paragraphe.

Si j'ai le code suivant :

```html
<h1>Mon titre principal <p>un paragraphe</p></h1>
```
La syntaxe est correcte : j'ai mes balises qui sont correctement ouvertes et fermées. Néanmoins, la **sémantique** est fausse : en effet, avoir un paragraphe à l'intérieur d'un titre *n'a pas de sens*.

Il convient donc de toujours s'assurer du sens que porte notre code.

## Pourquoi la sémantique ?
C'est bien joli cette histoire de sémantique, mais si on doit passer des heures à savoir si telle ou telle balise est sémantique, on risque de ne jamais terminer nos projets.

Alors **pourquoi la sémantique** ?
Lorsque les différents bots de référencement vont parcourir votre site web, ils vont noter la sémantique de votre code. Lorsque des personnes handicapées (aveugles, notamment) vont naviguer sur votre site avec des outils d'aide, ils vont avoir besoin de cette sémantique.

La sémantique de votre code offrira des information sur la signification du contenu de votre site web.

Pour bien l'illustrer, voici deux morceaux de code, l'un sans sémantique, et l'autre avec sémantique :

```html
<p>
Présentation
Bonjour, et bienvenue sur ce site.  Ici, vous trouverez tout ce qu'il y a à savoir sur qui je suis, mes projets et mon parcours.

Qui suis-je ?
Je m'appelle John DOE, et je suis designer en freelance depuis maintenant 20 ans !

Mes projets
Je travaille généralement sur des projets d'entreprises. Retrouvez-les sur mon Behance !

Mon parcours
Cliquez ici pour dérouler mon parcours !
</p>
```

Et voici le même contenu, mais avec des balises apportant de la sémantique :

```html

<h1>Présentation</h1>
<p>Bonjour, et bienvenue sur ce site.  Ici, vous trouverez tout ce qu'il y a à savoir sur qui je suis, mes projets et mon parcours.</p>

<h2>Qui suis-je ?</h2>
<p>Je m'appelle John DOE, et je suis designer en freelance depuis maintenant 20 ans !</p>

<h2>Mes projets</h2>
<p>Je travaille généralement sur des projets d'entreprises. Retrouvez-les sur mon Behance !</p>

<h2>Mon parcours</h2>
<p>Cliquez ici pour dérouler mon parcours !</p>
```

Dans le deuxième cas, on met en évidence quelles portions du texte sont des titres, et quelles portions sont des paragraphes. Ainsi, la machine, autrement dit les outils et bots qui vont "lire" votre page web, auront connaissance de la signification de votre contenu.

## Les balises sémantiques

Parmi les balises HTML, plusieurs portent une valeur sémantique.

### Les balises de titres

Les balises de titre indiquent l'importance d'un titre dans une page.
Elles vont de  `h1` à `h6` .

Il ne doit y avoir qu'un seul `h1` par page ou par article. Il peut y avoir plusieurs `h2`...`h6`.

Elles seront utilisées en fonction de l'importance de votre contenu.

**Exercice** : créez un document HTML, placez-y le texte suivant (tiré d'un journal) et, en utilisant les balises de titre, essayez de lui donner une sémantique correcte. Plusieurs manières de faire sont possibles.

```txt
Le ZEvent récolte 10 millions d'euros pour Action contre la faim

Marathon caritatif diffusé sur Twitch depuis vendredi soir, le ZEvent, qui regroupe les communautés du streaming, du gaming et de l'esport, a de nouveau pulvérisé son record de dons, établi l'an dernier. Plus de dix millions d'euros ont été récoltés pour Action contre la faim.

Record battu
Pour la sixième édition de l’événement caritatif – la cinquième sous le nom de « Z Event » –, les plus grandes stars françaises du streaming de jeux vidéo ont récolté plus de 10 millions d’euros de dons auprès de leurs fans, a annoncé l’un des organisateurs, lundi 1er novembre.

Propos sexistes
Seule ombre au tableau : l’un des participants, Inoxtag, considéré comme l’un des plus prometteurs de la nouvelle génération de youtubeurs et parmi le top 5 des personnalités ayant levé le plus de fonds lors de cet événement, a tenu des propos sexistes lors de son live.

Des faits dénoncés par l’une des autres participantes, la streameuse Ultia :

« C’est scandaleux ce qu’il se passe. Et nous, on l’applaudit ? Et on applaudit quelqu’un, parce que tout le monde est en train de la fétichiser, la sexualiser, parce qu’elle ne parle pas français, parce qu’elle comprend rien »
```

### Les balises de section
#### La balise `header`
La balise `header` est utilisée dans deux cas :

- pour spécifier l'en-tête de votre site (bannière, contenu introductif) ;
- pour spécifier l'introduction d'une balise `article` (que l'on verra juste après).

#### La balise `section`
La balise `section` va permettre de regrouper les contenus qui sont sur un même sujet.

#### La balise `footer`
La balise `footer` est utilisée dans deux cas :
- pour spécifier le pied de page de votre site ;
- pour spécifier la conclusion d'une balise `article`.

#### La balise `main`
La balise `main` va permettre de spécifier quel est le contenu principal de votre page Web.

#### La balise `aside`
La balise `aside` va permettre d'informer que le contenu qu'elle englobe est complémentaire par rapport au contenu principal.

#### La balise `nav`
La balise `nav` indique une section offrant des liens de navigation.

#### La balise `article`
La balise `article` est particulière : elle spécifie du contenu qui, sémantiquement, pourrait être indépendant de la page web. Un `article` peut avoir son propre `h1`, son propre `header`, `main` et `footer`.

#### Autre balises
D'autres balises existent, parmi lesquelles

- `time`;
- `summary`;
- `mark`;
- `details`;
- `figcaption`;
- `figure`.


### Les tableaux
Les tableaux ont souvent été utilisés pour autre chose que de la sémantique : il y a plusieurs années de cela, on les utilisait pour avoir une certaine disposition graphique. Aujourd'hui, nous n'avons plus besoin d'eux pour autre chose que de la sémantique et des cas particuliers où les données sont tabulaires (qui peuvent être utilisées dans un tableau).

La structure classique d'un tableau est la suivante :

```html
<table>
 <!-- En-tête du tableau -->
	<thead>
		<!-- ligne -->
		<tr>
			<!-- Cellule d'en-tête -->
			<th>En-tête col1</th>
			<th>En-tête col2</th>
			<!-- on peut mettre autant de cellules d'en-têtes qu'on le souhaite -->
		</tr>
	</thead>
	<!-- Corps du tableau -->
	<tbody>
		<!-- ligne 1 -->
		<tr>
			<!-- Cellule (attention, ici c'est "td" et pas "th" !) -->
			<td>Cellule ligne 1 colonne 1</td>
			<td>Cellule ligne 1 colonne 2</td>
		</tr>
		
		<!-- ligne 2 -->
		<tr>
			<td>Cellule ligne 2 colonne 1</td>
			<td>Cellule ligne 2 colonne 2</td>
		</tr>
	</tbody>
</table>
```

**Exercice** : En vous basant sur la structure précédente et les données suivantes, écrivez un tableau HTML .

Données :
```txt
Principe du tableau : afficher la proportion d'étudiant.e.s dans chaque spécialité sur les trois dernières années.

Noms des colonnes : Initial, Dev, Design et E-business
Années : 2021, 2020 et 2019

Proportions : 
2019 >
		Initial > 15 %
		Dev > 25 %
		Design > 35 %
		E-business > 25 %
2020 >
		Initial > 25 %
		Dev > 33 %
		Design > 30 %
		E-business > 12 %
2021 >
		Initial > 0%
		Dev > 20 %
		Design > 35 %
		E-business > 45%
```

### Les listes
Les listes, comme leur nom l'indique, vont servir à lister des éléments.
Il existe deux types de listes : les listes ordonnées et les listes non-ordonnées.

#### Les listes ordonnées
```html
<ol>
	<li>item 1</li>
	<li>item 2</li>
</ol>
```
Elles sont utilisées pour donner une idée d'ordre aux éléments qui la constituent.

#### Les listes non-ordonnées

```html
<ul>
	<li>item 1</li>
	<li>item 2</li>
</ul>
```

Les listes non-ordonnées, au contraire des listes ordonnées, ne portent aucune notion d'ordre en elles. Elles sont celles qu'on retrouve le plus souvent.

**Exercice** : pour les listes suivantes, choisissez quel type de liste convient le mieux.

```txt
Liste 1 : classement des crypto-monnaies en terme de ranking sur CMC
- Bitcoin
- Ethereum
- Binance Coin
- Tether
- Cardano
- Solana

Liste 2 : liste de courses
- courgettes
- tomates
- laurier
- thym
- butternut
- lait d'avoine

Liste 3 : todo list
- ranger sa chambre
- nettoyer la salle de bain
- préparer les achats de Noël
- faire les courses
- avoir 20 en HTML - CSS - JavaScript

Liste 4 : liste des compétences
- JavaScript
- TypeScript
- Intégration CSS
- Java
- NodeJS
```

### Les formulaires
Un formulaire se définit avec les balises`<form></form>`. Nous les verrons en détail plus tard (et vous les verrez également en PHP).
Un formulaire contient des champs, définis avec `<input>`, et des boutons, définis avec `<button></button>`.

#### Les liens
Un lien hypertexte est ce qui vous permet de naviguer entre les pages d'un site, voire de site en site.

Un lien se définit avec la balise `<a></a>` et a besoin de l'attribut `href` pour fonctionner.

Exemple :

```html
<a href="eemi.com">EEMI</a>
```

**Exercice** : écrivez, en HTML, un lien qui redirige vers Google. Cherchez également comment faire pour que ce lien s'ouvre dans un nouvel onglet.

## Conclusion
Nous venons de voir plusieurs balises sémantiques pendant ce cours. D'autres balises existent, mais celles-ci sont les principales.

Pour finir, voici deux balises **qui ne sont pas sémantiques** : `div` et `span`.
Ces deux balises sont ce que l'on appelle **des conteneurs**. Leur but est simplement de contenir d'autres balises et portions de page, pour ensuite y appliquer du CSS. Nous verrons tout cela plus en détail avec le cours sur le **modèle en boîte**.
