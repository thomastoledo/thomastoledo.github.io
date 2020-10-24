---
layout: post
title:  "The cost of CSS selectors"
date:   2019-12-15 12:15:11 +0200
categories: [css]
---

When writing CSS, you are likely to find yourself having to write some selectors. For instance, let us say you have the following HTML structure:

```html
<section class="info">
   <div id="avatar"></div>
   <ul>
      <li>John Doe</li>
      <li>42 y.o</li>
   </ul>
</section>
<section class="feed">
   <div class="post">
      <p>....</p>
   </div>
   <div class="post">
      <p>....</p>
   </div>
   <div class="post">
      <p>....</p>
   </div>
</section>
```

If you were to add some CSS to your elements, how would you write your selectors?

## Go full selectors
If, like me, you are a bit of a maniac, you might have a tendency to use _a lot_ of selectors.
Naively, you would write something like that:

```css
section.info { /* css rules */ }

section.info > #avatar { /* css rules */ }

section.info > ul { /* css rules */ }

section.info > ul > li { /* css rules */ }

section.info > ul > li:nth-of-type(1) { /* css rules */ }

section.feed { /* css rules */ }

section.feed > div.post { /* css rules */ }
```

**Pros**
- we know where every rule is applied;
- no or little risk of side-effects;
- more specific;
- every selector allows me to use those classes on other elements and apply different CSS rules.


**Cons**
- a lot of work for the browser;
- poor performances;
- some selectors are useless (like `section.info > #avatar`);
- if I decide, for instance, to change my sections for divs, then my CSS will not work until I change it too.

## Performance is important
Now, we sure do want to have a clean and readable code. But we also want to have a fast website! So, what could we do?

First of all, we could change that awful selector `section.info > #avatar` by `#avatar`. In fact: an ID is always unique on a page. So, unless your stylesheet might be used on other pages where your avatar has a different style and is located elsewhere (i.e: has another selector), there is **absolutely** no need to specify a full selector when `#avatar` is enough.

Secondly, let us remove the `section.info` and use, instead, `.info`. The same goes for `section.feed` and `div.post`. We can obviously just use `.feed` and `.post`.

So, we would have the following CSS:

```css
.info { /* css rules */ }

#avatar { /* css rules */ }

.info > ul { /* css rules */ }

.info > ul > li { /* css rules */ }

.info > ul > li:nth-of-type(1) { /* css rules */ }

.feed { /* css rules */ }

.feed > .post { /* css rules */ }
```

It is shorter, and still readable. Plus, it is more performant, because the browser will not have to look for every section, then every section which have the class "info" or "feed": it will just go straight to the elements having the classe "info" or "feed" and basicaly apply the style on them.

But now, why is this code more performant than the previous one?

## CSS Specificity

CSS Specifity is a concept we all need to understand when we write CSS.
In CSS, it is possible to point the same element with two or more different CSS rules.

For instance, if we have the following HTML structure:

```html
<section id="container">
 <!-- some html code inside -->
</section>
```

As we only have one section, we could either use `section {}` or `#container {}`. In this case, it will render the same thing. But there is one option that is more performant than the other.
In fact, selecting an element by its ID is **far more** specific, thus performant, than selecting an element with an element selector.

### Specifics values
In CSS, there are specifics values regarding the type of selectors we use:

- **inline style** has a specific value of **1000** (that's why it can be used on performance purposes);
- **id selector** has a specific value of **100**;
- **class, pseudo-class and attribute selectors** have a specific value of **10**;
- **element and pseudo-element selectors** have a specific value of **1**;
- the universal selector `*` has a specific value of **0**;
- the `!important` keyword gives a **1000** specific value to your CSS rules.

Knowing this, we can now understand how a browser does work when it come to choose between to selectors: it will simply, and always, use the selector with the strongest specific value. In our previous example, `section {}` had a specific value of **1**, whereas `#container {}` had a specific value of 100, thus will be choosen by the browser.

I just explained how the browser were choosing between two selectors, based on the concept of specificities and specifics values.
But how having more specific selectors ensure we have better performances? And what happens when we combine selectors?

### Selectors combination

Consider the previous code

```html
<section class="info">
   <div id="avatar"></div>
   <ul>
      <li>John Doe</li>
      <li>42 y.o</li>
   </ul>
</section>
<section class="feed">
   <div class="post">
      <p>....</p>
   </div>
   <div class="post">
      <p>....</p>
   </div>
   <div class="post">
      <p>....</p>
   </div>
</section>
```

and the following CSS:


```css
.info { /* css rules */ }

#avatar { /* css rules */ }

.info > ul { /* css rules */ }

.info > ul > li { /* css rules */ }

.info > ul > li:nth-of-type(1) { /* css rules */ }

.feed { /* css rules */ }

.feed > .post { /* css rules */ }
```

What are the specifics values for each selectors ?

- `.info { /* css rules */ }`: **10**;
- `#avatar { /* css rules */ }`: **100**;
- `.info > ul { /* css rules */ }`: **10** + **1** => **11**;
- `.info > ul > li { /* css rules */ }`: **10** + **1** + **1** => **12**;
- `.info > ul > li:nth-of-type(1) { /* css rules */ }`: **13**;
- `.feed`: **10**
- `.feed > .post`: **20**;

As you can see, the selectors with element selectors are the weakest, while the ID selector is the one with a higher specific value.

### Performance FTW (?)

In our case, we first had more specific selectors and then less specific selectors, and yet the second version of the CSS code was more performant. Why is that?
Well, in the first version, the browser had to lookup every `section` tag, then find those with a specific class on it, etc, etc. Although it was more specific, it would also bring slower performances, because of the element selector.
Beside, it was useless in this case.

By removing it, we give the browser the only useful amount of information it needs.

But wait! If specifics values are greater with IDs, and if IDs are unique in a page, why don't we simply use IDs? Or better, why don't we just use inline style?

## Semantic over performance
A code that brings a lot of performance is nothing if nobody can understand it. In my opinion, you need to **always** make the readability of your code your priority. Your code is not finished once you wrote it.
Your code will live after you, and someone will take care of it: if we cannot read it, then it will likely go to the trash.

A code with a good semantic is of better quality than a code with bad semantic. A good compromise that we use a lot is classes: classes do have a less specific value than IDs, but they bring semantic information and have greater specific value than elements.

So, unless you are working for Amazon or Google, performance might not be your #1 priority: you might first want to focus on writing proper selectors, and, of course proper CSS rules.

## Further readings

- [In French - 30 sélecteurs à connaître](https://code.tutsplus.com/fr/tutorials/the-30-css-selectors-you-must-memorize--net-16048?fbclid=IwAR1ODm7G_eupSyrXbL4DgXT3M_QYg3LI9i62sHvA1E01CYFwaUA_Xjpilzc)
- [Google PageSpeed Insight](https://developers.google.com/speed/docs/insights/v5/get-started)
- [Mozilla Code Guideline for CSS](https://developer.mozilla.org/en-US/docs/MDN/Contribute/Guidelines/Code_guidelines/CSS#Dont_use_preprocessors)
- [CSS Tricks on CSS3 Efficiency](https://css-tricks.com/efficiently-rendering-css/)
- [CSS Tricks on Specificity](https://css-tricks.com/specifics-on-css-specificity/)

