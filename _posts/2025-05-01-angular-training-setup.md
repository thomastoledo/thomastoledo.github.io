---
layout: post
title:  "Angular Training - Setup"
date:   2025-05-01 00:00:11 +0200
categories: [formation, angular, typescript, javascript, training]
---

# Angular Training - Setup

This article aims to be the first of a serie of articles regarding Angular, allowing you to improve your skills rather quickly and efficiently.

At the time I am writing this article, I am basing its content on the **version 19** of Angular. I will try to update this training as versions evolve, but please keep in mind it is a long work and I will not necessarily have time to do it for every version.

For this training, you will need to fetch the repository: [Angular Training](https://github.com/thomastoledo/angular-training).
It is a free, open-source, open to contribution repository I have made to help people train on Angular. There are two branches: "main", with the exercises, and "answers", with the answers.

That being said, let's get our hands on it!


## What is Angular - a short history
Angular is one of the most popular frameworks there is for frontend development, alongside other frameworks and libraries such as React, Vue, Svelte or even Qwik. The first main version of Angular was called **Angular.js** and was a revolution for web development. You could bind javascript variables in HTML templates, use an injection mecanism to inject services just like in backend frameworks such as Spring (if you do not know this one as you're reading it, no problem), and other cool stuff. This would allow you to write web applications faster than with vanilla JS, and with less errors.

Only, Angular.js had performance issues and the Angular team, seeing Typescript was rising in popularity, decided to release the version 2, simply called **Angular**. So nowadays, when you hear *Angular.js*, you know it is refering to a very old version of the framework (2016 date of death). *Angular* has practically nothing in common with *Angular.js*. And as the framework evolved through the years, you can be sure the last version as little in common with the V2.

## Why learn Angular ?
Angular can be seen as difficult to learn, compared to React, Vue or Svelte. I disagree, in the sense that even if React (for instance) can be really easy to handle at first, it **does not exempt** you from developing according to common programmation principles, that must be respected, no matter the language, the library or the framework. In that sense, Angular is opiniated and offers a really straightforward way to code. There are clear guidelines regarding each part of Angular, which should be respected, alongside common best practices of programming.

## Can we see the basics now?
Not quite yet. We need to do a few things before that.

Let's start by installing Angular.
In order to do so, you need to install Node.js: [download Node.js](https://nodejs.org/en/download).
Once it is done, you can install Angular CLI, which is Angular's tool for generating Angular projects, components, modules, services, etc. **Installing Angular CLI does install Angular as well**.

```bash
npm i -g @angular/cli
```
Once it is installed, you can generate a new project. For the sake of this training, we are going to develop an Angular app which allows you to set up routines. We are going to call it "Routines" in a spirit of originality:

```bash
ng new routines
```

You will be asked with a few questions:

`Which stylesheet format would you like to use?` => choose `Sass (SCSS)` (the second option).
`Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)?` => good Lord, no. We do not. Choose `N`.
And then, boom: the project is generating. This part can take a bit of a moment. Once it is done:

```bash
cd routines
ng start
```

If you open your project with your favorite IDE (mine is still Visual Studio Code), you will see a whole lot of files. This can be frightening at first, but let's take a moment to see what they are all about.

### `tsconfig`
There are three files with "tsconfig" in their names:

- `tsconfig.json`;
- `tsconfig.app.json`;
- `tsconfig.spec.json`.
Those files are used by Angular when compiling both the app and the tests. In the first one, you will find base options, used for the app and the tests. In the second one, the options are specific to the app. You can see this line: `"extends": "./tsconfig.json"`. It means *it is taking the options specified in the first file, and is adding or overriding options*.
Same goes for the third one, except the options in it are specific to the tests.
For now, **you do not have to touch these files**.

### `package.json`
This file contains all the dependencies of our app. I will not go through all the properties that can be found in a `package.json`, so here is [some reading](https://docs.npmjs.com/cli/v11/configuring-npm/package-json).

### `angular.json`
This file contains the **description of the projet**: the type of the project, where does the root of the project is, the build configurations, the tests configurations, the serve configurations... At this point of the training, we do not need to touch it. Just leave it as it is.

### The sources
In `public`, there is a favicon. Leave it as it is for now.
In `src`, there are our sources. Where we will code.

`styles.scsss` is for global styles. They will apply overall the app, no matter the component.
`main.ts` is the entry point of our app.
`index.html` is the file where the app will be "injected".

There is a folder named `app`. In this folder, there are **six files**:
- `app.component.html`: the HTML template of our **AppComponent**. For now, it contains a placeholder code that you can remove. Just make sure to keep `<router-outlet />` in it. I will explain what it is later on this training;
- `app.component.scss`: the style of the HTML template. Empty for now;
- `app.component.ts`: the **AppComponent**: as you can see, it is just a class with a field called `title` and what we call a `Decorator`: `@Component({...})`. To learn more about what is a component, [please refer to the documentation](https://angular.dev/guide/components);
- `app.config.ts`: just the configuration of the app. It is used in the `main.ts` file to bootstrap the app;
- `app.routes.ts`: contains all the routes of the app. For now, it's empty but we will soon fill it with many routes.

And that's is for now.
If you start the app with the command `ng serve`, you will see you app is accessible at `localhost:4200`. The page will be blank, unless you left the placeholder in `app.component.html`. And that's it. So now, we can actually start coding.

## Next lesson
The next lesson will be about components, modules (and why we do not use them anymore), services, and all the basics of Angular.