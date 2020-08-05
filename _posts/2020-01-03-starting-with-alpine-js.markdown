---
layout: post
title:  "Starting with AlpineJS"
date:   2020-01-02 12:15:11 +0200
categories: code javascript frontend alpinejs library
---


Note: The sources can be found on [my Github](https://github.com/nugetchar/alpine-todo-list).

Today, a lot of JavaScript frameworks, libraries and tools are rising, and it is often hard to know which one to choose.

I personally like to work with [Angular](http://angular.io/), but [React](https://reactjs.org/) gained more popularity, alongside with [Vue](https://vuejs.org/). Some, like [KnockoutJS](https://knockoutjs.com/), are almost forgotten nowadays, while others like [Reason](https://reasonml.github.io/) (more a language than a framework) and [SvelteJS](https://svelte.dev/) are gaining in popularity.

So, while I was going to start and learn React (it would be about time), I could not help but try a new challenger, which came out about a month ago.

Please welcome [AlpineJS](https://github.com/alpinejs/alpine)!

AlpineJS is meant to be a much lighter library than Vue or React, while having a syntax entirely borrowed from Vue (to quote the author).

## Why AlpineJS?
You are right: why would you bother learning, AGAIN, a new tool while there are so many others, with such huge communities around them?

Well here are a few pros:

- you get to follow the evolution of a library from the beginning, and, why not, contribute;
- I have got a hunch AlpineJS will surely gain some popularity during 2020;
- while React and Vue are acclaimed by a lot of developers, AlpineJS present a much lighter way of doing front-end Web, much more closer to the basics than today's framework (and I do love the basics).

Cons:

- it is new, so not everything is perfect about it;
- you might struggle a bit before figuring how it actually works;
- I told you I got a hunch about this framework's future popularity, but you cannot be certain of that.

## How does it work?

Let us write our first component! We are going to write a *really simple* and *minimalist* TodoList. This first article WILL NOT provide a full solution, as AlpineJS is still in development as I am writing these lines.
Updates will follow.

### Setting up the env
So, first, let us install AlpineJS.

```shell
npm i alpinejs
```

We are going to use the node package AlpineJS in this example, but you can also use the CDN.
As said in the documentation, we need to add some polyfills for IE11.

So, create a directory called `src`. We will create all of our app files in it from now on. Then, create an `index.html` with the following code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>TODO LIST - ALPINEJS</title>
    <link rel="stylesheet" href="./css/tasks.css">
    <script src="https://polyfill.io/v3/polyfill.min.js?features=MutationObserver%2CArray.from%2CArray.prototype.forEach%2CMap%2CSet%2CArray.prototype.includes%2CString.prototype.includes%2CPromise%2CNodeList.prototype.forEach%2CObject.values%2CReflect%2CReflect.set"></script>
    <script src="https://cdn.jsdelivr.net/npm/proxy-polyfill@0.3.0/proxy.min.js"></script>
</head>
<body>
    <section id="add-task-container">
        <form>
            <input type="text">
            <button type="submit">Add task</button>
        </form>
    </section>
    <section id="list-tasks-container">
    </section> 
</body>
</html>
```

Ok so we have our `index.html`, which is good. Now, we need to import the AlpineJS module.
As we installed it as a node module, a way to import it is to create an `app.js` file in a directory named `cjs-modules` and to use the [CommonJS](http://www.commonjs.org/) norm as following:

```javascript
'use strict'
let Alpine = require('alpinejs');

// DO NOT WRITE Alpine.start(); or every event will fire twice
```

But now, our `app.js` file is a node module and cannot be used in front-end scripts and HTML pages, can it?
Well fortunately for us, there is a node package called [gulp-bro](https://www.npmjs.com/package/gulp-bro) (`gulp-browserify` is now blacklisted by NPM). This package allows us to use [Browserify](http://browserify.org/), a powerfull tool for using node modules in our front-end apps.

So in your terminal:

```shell
npm install -D gulp gulp-bro
```

Why are we using `gulp`? It is purely an arbitrary choice I made. You could use `grunt`, `webpack`, or anything else. We are also going to use a package called [browser-sync](https://www.browsersync.io/docs/gulp/). BrowserSync allows you to live-refresh your browser when you modify your code.

```shell
npm install -D browser-sync
```

So now, back into our `index.html` file.
Just add the following: 

```html
<script src="./app.js"></script>
```

Before testing anything, we still need to set our dev environment. We are going to create a gulp job in a `gulpfile.js` located at the root of your project.

Write the following:

```javascript
// src and dest are for moving files
// watch is for Gulp to trigger tasks anytime the watched files are modified
// task is to register a task in Gulp
const { src, dest, watch, task } = require('gulp');

// bro is for browserify
const bro = require('gulp-bro');

// browserSync
const browserSync = require('browser-sync').create();

// our build function
function _build() {
    // take every commonJS module, browserify them and put them into ./dist
    src('./src/cjs-modules/*.js')
        .pipe(bro())
        .pipe(dest('./dist'));
    
    // take every JS script, and put them into ./dist
    src('./src/scripts/**/*.js')
        .pipe(dest('./dist'));

    // take every HTML and CSS and put them into ./dist
    src(['./src/**/*.html', './src/**/*.css'])
        .pipe(dest('./dist'));
}

// our watch function
function _watch() {
    watch(['src/*/*.js', 'src/**/*.html'], _build);
    watch(['src/*/*.js', 'src/**/*.html']).on('change', browserSync.reload);
}

// our serve function
function _serve() {
    _build();
    browserSync.init({
        server: "./dist"
    });

    _watch();
}

// registering a 'serve' task so we can trigger the building and serving with
// gulp serve
task('serve', _serve);
```

Ok so, here we are. This should be your minimum setting before testing anything. But we're not entirely done. In your `package.json` file, add the following script:

```json
"start": "gulp serve"
```

That way, you can launch the build and the app by typing either `npm start` or `gulp serve`.

### First launch

Launch the app with `npm start` or `gulp serve`. If everything is good, you should see a page with an input, a button, and **no error in your browser console**.

### Data binding

AlpineJS **does not** use any *Virtual DOM*. This is quite the challenge, but it allows us to develop faster apps.

So, first, how does AlpineJS work with data binding?

According to [the documentation](https://github.com/alpinejs/alpine), you have a few directives you can use. One of them is `x-data`. This directive allows you to declare the variables you are going to use in you page / component.

Here, we are going to use two variables:

- task, which will first only contain a label;
- tasks, which will be an array for all the tasks we will create;

So, on the `<body>` or a `<section>` container, write:

```html
<body x-data="{tasks: [], task: {label: ''}}">
```

We will use those variables later.

Now, we would like to bind some data to our form. As in Angular, AlpineJS provides a directive called `x-model`, which we can use as double binding. Here, we are going to bind `task` (declared with `x-data`) to our input. Update your HTML as follow:

```html
<input type="text" x-model="task.label">
```

Now, everything we type in the input will be affected to the `label` property of our `task` variable.

That's great and all, but there is still a problem (amongst others): when we click on "submit", the page is reloaded. This is because of the default behavior of a form and a submit button.
Lucky for us! AlpineJS provides an [`x-on`](https://github.com/alpinejs/alpine#x-on) directive in order to play with events!

One of its features is `x-on:[event name].prevent`, which does the same as `event.preventDefault()`.
So, on your `<form>` tag, add the following:

```html
<form x-on:submit.prevent>
```

That way, the page should not reload anymore when hitting the submit button.

### Adding the tasks

As AlpineJS is not complete yet, we will have to do a bit of a work in order to achieve what we want to do.

First of all, we want to bind a behavior to a click event, for when we submit the form. So:

```html
<button type="submit" x-on:click="tasks = addTask(task, tasks);">Add task</button>
```

Now, we need to implement the `addTask` method.

Create a directory called `scripts`, and inside, create a script called `functions.js`. We are going to keep it simple and store every function in that file for now.

In this file, create a function called `addTask`. This function will take two arguments: the task to add, and the list to which add the task.

```javascript
function addTask(task, tasks) {
    // if we do something like [...tasks, task], then we will
    // still have a reference over the task object, which is bound with
    // x-model, making our list to have multiple references to this object
    // And we do not want that.
    return [...tasks, {...task}]
}
```

Do not forget to link it to your HTML:

```html
<script src="./functions.js"></script>
```

Before going further: why don't we simply use `tasks.push(task)`? Well, for now, if we do that, the bound variable in our HTML will not be updated, and we will not be able to display its content. So, we need to return an updated copy of it, and then re-affect it, so our HTML is updated.

### Displaying the tasks

Unfortunately, AlpineJS does not provide yet a `x-for` feature (as explained [here](https://twitter.com/calebporzio/status/1213197599899041793)). There is a PR regarding an `x-html` directive right [here](https://github.com/alpinejs/alpine/pull/44).

We can still display our data by doing this:

```html
<section id="list-tasks-container" x-text="JSON.stringify(tasks)">
</section>
```

Normally, everytime you push the "submit" button, the data will be refreshed and displayed.

## Contributing

AlpineJS is on the rise, but still needs your help and support. Feel free to contribute to this very promising framework, to test and try it.

This article will be updated from time to time as AlpineJS evolves.

Please feel free to tell me if anything was unclear in my instructions, or if you did another way. I am also interested about your thoughts about what should be the best practices when developing with AlpineJS.

Thanks for reading!