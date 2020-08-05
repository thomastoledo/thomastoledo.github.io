---
layout: post
title:  "Why I use semantic HTML"
date:   2019-11-18 12:15:11 +0200
categories: html semantic web
---

Wether you are a beginner, or an expert in development, there is one thing you are likely to forget when it comes to coding HTML documents, and that thing is **semantic HTML**.

Until a few years back, I did not know much about that. To me, HTML was all about `div` and `span`, maybe some classes and ids, a bit of CSS, and that was it.
But one day, I wanted to have a new job in a new company. During the interview, the recruiters asked me to explain, starting from a mock-up, how I would organize an HTML document in order to obtain the same result as shown in the said mock-up.

## Divs and spans are not enough

Of course, as a young developer, with not much knowledge, and because I never learnt much more, I started to use a lot of divs. Then, they asked me what CSS rules I would apply to which elements, and how. That part was a bit harder, as I was not really at ease with CSS.
And finally, they tested me on JavaScript (that part was my favorite).

I though I did good.
I did not. But why is that? Was I too junior for them? Was I lacking any skills?

Well, yes and no. Of course, I was a junior, but apparently I did good in JavaScript and CSS. So, if I did good, that meant I was not lacking any skills, was I? Wrong again!
Because there was one thing I did, regarding the HTML part of the test. A tiny, little, thing: I only used divs and spans.

Of course, divs are important! They are containers, that can be used to apply massive amount of CSS on many elements, and can be easily manipulated by JavaScript! They are so cool, so easy to use! What is a div? A div is just a div. A simple box, where you put anything you want inside.
They are perfect. I love divs.

And it is the same for spans. I also love spans. They do not have any dimension: they do not require any space on a page, unlike divs, so they can be used to wrap some texts and then apply CSS rules and/or JavaScript treatments to them.

I love spans.

But divs and spans have a problem, and a big one: **they are not semantic**. They do not bring **any** information regarding the meaning of your content. Would you have three divs containing two divs each, or one big div containing five divs, and that would be the same: no meaning, just boxes.

And that is why I failed my test: I did not use anything else to organize my page, so it meant I did not know how to use properly HTML.

## Divs and spans are meaningless

As I said, divs and spans do not bring any semantic to your page. It means that, by using only those kind of containers, you are drowning your content into a nest of meaningless code.

It also means that your content, if it is not for the layout, can do without any of your divs.


## Semantic HTML to the rescue

HTML5 comes with a lot of semantic tags: `section`, `article`, `header`, `nav`, `time`, are some of them.

Their primary use is to bring meaning to our HTML pages. It also allows us to organize more clearly our documents.

Let us take an example:

Which one of those two snippets tells you the most about how your page is organized and what part is supposed to be?

*Example 1*

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Some page</title>
    <meta charset="utf-8">
    <meta name="author" content="Thomas Toledo">
    <noscript>JavaScript not supported!</noscript>
  </head>
  <body>
    <div>
      <a href="#">link 1</a>
      <a href="#">link 2</a>
      <a href="#">link 3</a>
    </div>
    <div>
      <div>
        <p>Some text</p>
      </div>
      <div>
        <p>Some content</p>
        <ul>
          <li>list item 1</li>
          <li>list item 2</li>
          <li>list item 3</li>
        </ul>
      </div>
      <div>
        <div>
          <figure>
            <img src="...">
            <figcaption>some legend</figcaption>
          </figure>
          <p>Some text</p>
        </div>
        <p>
          Some text
        </p>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>header 1</th>
              <th>header 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>data 1</td>
              <td>data 2</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        Some text
      </div>
    </div>
  </body>
</html>
```

*Example 2*

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Some page</title>
    <meta charset="utf-8">
    <meta name="author" content="Thomas Toledo">
    <noscript>JavaScript not supported!</noscript>
  </head>
  <body>
    <nav>
      <a href="#">link 1</a>
      <a href="#">link 2</a>
      <a href="#">link 3</a>
    </nav>
    <article>
      <header>
        <p>Some text</p>
      </header>
      <section>
        <p>Some content</p>
        <ul>
          <li>list item 1</li>
          <li>list item 2</li>
          <li>list item 3</li>
        </ul>
      </section>
      <section>
        <div>
          <figure>
            <img src="...">
            <figcaption>some legend</figcaption>
          </figure>
          <p>Some text</p>
        </div>
        <p>
          Some text
        </p>
      </section>
      <section>
        <table>
          <thead>
            <tr>
              <th>header 1</th>
              <th>header 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>data 1</td>
              <td>data 2</td>
            </tr>
          </tbody>
        </table>
      </section>
      <footer>
        Some text
      </footer>
    </article>
  </body>
</html>
```

In the first snippet of code, you could easily spot a global `div`, which would have had one purpose: containing everything. But then? Nothing tells me I am going to have a header, three sections and a footer. I could as well have a global `div`, organized in three sections. Something like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Some page</title>
    <meta charset="utf-8">
    <meta name="author" content="Thomas Toledo">
    <noscript>JavaScript not supported!</noscript>
  </head>
  <body>
    <nav>
      <a href="#">link 1</a>
      <a href="#">link 2</a>
      <a href="#">link 3</a>
    </nav>
    <div>
      <div>
        <p>Some text</p>
      </div>
      <section>
        <p>Some content</p>
        <ul>
          <li>list item 1</li>
          <li>list item 2</li>
          <li>list item 3</li>
        </ul>
      </section>
      <section>
        <div>
          <figure>
            <img src="...">
            <figcaption>some legend</figcaption>
          </figure>
          <p>Some text</p>
        </div>
        <p>
          Some text
        </p>
      </section>
      <section>
        <table>
          <thead>
            <tr>
              <th>header 1</th>
              <th>header 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>data 1</td>
              <td>data 2</td>
            </tr>
          </tbody>
        </table>
      </section>
      <div>
        Some text
      </div>
    </div>
  </body>
</html>
```

And that would still be okay.
The only difference would be the meaning of my HTML code: in the first case, there is no meaning. I don't know what is what - there are only divs.
In the second case, it's obviously an article.
In the third case, it's simply a container with three sections, each independant from the others.

Yet, the structure remains the same: only the semantic changes.

## But is it still ok to use divs and spans?

The answer is yes.
If `div` (and `span`) were not OK to use anymore, we would not find them anywhere.
But, the thing is: we find them everywhere. Why is that?

I see a few reasons:

- it is easier to use divs without having to think about how your page is going to be semantically organized;
- nowadays, we have a lot of layout needs, and divs are perfect for layout divs;
- developers seem not to know enough about semantic HTML;
- they are still usefull when you do not have any specific semantic for an element: in that case, just use `div` and, eventually, put some classes on it with semantic names;

I still use divs in my code (and more than I would admit), but I try to keep them only for layout purposes.
Moreover, semantic tags can **also** be styled with CSS.

So, given the fact they bring more semantic to the page and help you have a clearer view of its organization, I go with semantic tags. It does not cost anything, and have a real impact both on code quality and [SEO](https://qr.ae/T9zFip).

If you are interested in semantic HTML, you can start with the [MDN page](https://developer.mozilla.org/en-US/docs/Glossary/semantics) about it, and then start to use it, step by step, in your code!

