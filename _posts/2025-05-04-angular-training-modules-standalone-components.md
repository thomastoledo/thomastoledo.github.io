---
layout: post
title:  "Angular Training - Modules and standalone components"
date:   2025-05-01 00:00:11 +0200
categories: [formation, angular, typescript, javascript, training]
---

# Angular Training - Modules and standalone components

In this article, we will see the differences between Modules and Standalone Components. Let's dive in it!

## The repository
We will still use the same repository: [Angular Training](https://github.com/thomastoledo/angular-training). This time, we will use the folder **1-modules-and-standalone-components**. Again, the exercises are on the **main** branch while the answers are on the **answers** branch. Pull the repository and open the project in your favorite IDE.

In your folder, **do not forget to execute the `npm install` command**.

Reminder: this app, called "routines", is all about setting up your routines. It will mainly be timers and stuff.

## Our first feature
Counter-intuitively enough, it is considered a bad practice to develop the login page first. A macro-roadmap should go like this: implement public pages -> add security -> implement private pages. Also, it is considered a bad practice to tackle security **after** having implemented private pages.
In our case, we will add the register and login features **after** developing a first version of our app. Our **first feature** will be a simple simple list of routines. It will not do much, since we do not have any routine created yet, but it will allow us to see some of the basics.

This page will be our homepage. This information is important for the rest of the training.

### The app architecture
A common mistake when we start developing in Angular is to architecture the app by layers: a folder for components, a folder for services, a folder for models, and so on...
Here, we will sort our files by pages and domains. Meaning, if we are about to implement the homepage, we will have a **homepage** folder right under `src`, at the same level as `app`.

With a terminal, go in the `src` folder and type the following command:
```shell
ng g component homepage
```

This command is a command made available by Angular CLI, that we installed in the previous article. It allows to generate an empty component.
This command will generate four files in a `homepage` folder:
- `homepage.component.html`: the HTML template of our component. This is where we will write the HTML of this page;
- `homepage.component.scss`: the style of our component;
- `homepage.component.ts`: our component *per se*;
- `homepage.component.spec.ts`: the tests of our component.

### The component *per se*
So far, our component's code should be something like this:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
```

The `@Component` annotation is called **a decorator** and is necessary so Angular knows what is a component and what is not.

An object is passed to the decorator:

```ts
{
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
}
```

- `selector`: this is the name of the HTML tag we will use to include our component in an HTML template, if necessary;
- `imports`: is used only for **standalone components**. This property declares all the dependencies our component will rely on;
- `templateUrl`: the relative path to our HTML template;
- `styleUrl`: the relative path to our component's style. You can specify an array of styles with `styleUrls` (note the `s` at the end).

In the previous list, I just said `imports` was for standalone components. Standalone components have been a huge revolution for Angular developers, and you know I need to talk about it.

### Standalone components vs Modules
Historically, we used to use modules in our Angular apps. It was just the way it was.
A module was nothing but a way to encapsulate many components, pipes, services and even other modules under a single category, and expose some or all of them to other modules.
Nowadays (since v19), components are standalone by default, meaning they do not need to be declared in a module.
A standalone component is self sufficient.

To understand how it worked, use a terminal and go right under the `src` folder.
Type the command below:

```shell
ng g module shared
```

This will generate a `shared` folder, just like the `ng g component homepage` command did, but with a slight difference in it: the folder contains **only one file**.

`shared.module.ts`.

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
```

We find another **decorator**: `@NgModule`, as well as an object in it, with properties such as `declarations` and `imports`. Here are some specificities about Angular modules I will ask you to duly note and memorize:

- in `declarations`, we declare **non-standalone components** that will be part of this module, as a non-standalone component cannot be declared in zero modules;
- `imports` works the same way as in our component;
- you can add the `providers` property in order to inject services, pipes, and basically everything that is an Injectable (we will cover this later);
- you can add the `exports` property, in order to explicit what parts of your module will be exposed for any other modules or components that will use it.

There are a few more properties, less used, that can be pointed out:
- `bootstrap`: is mostly used for the `AppModule`. Specifying a component in it says to Angular: load this component when the app is starting. You must have a corresponding HTML tag in your `index.html` file. There is no need to specify this property anywhere else than in the `AppModule`.
But where is my `AppModule`, you may ask. Good question: since a few versions of Angular, you no longer need an AppModule thanks to `bootstrapApplication()` – although it's still fully supported for backward compatibility. The bootstraping is done right in `main.ts` with the `bootstrapApplication` function.
- `schemas`: rare but usefull. Allows the usse of **non-angular** elements in your app.

**The following properties are deprecated / obsolete / removed**:
- `id`;
- `entryComponents`;
- `jit`;
- `transitiveModule`.

Now, still in our `shared` folder, let's generate a component that will be shared across the entire application. This component will consist of a simple button. We will implement it and style it later.
To do so, use the command we used to generate a component:

```shell
ng g component button --standalone=false
```

Here, we added `--standalone=false`: it is necessary to add it if we want to generate a non-standalone component.

So far, here is our structure:
```
/src
|___
    | app // component
        | app.component.html
        | app.component.scss
        | app.component.spec.ts
        | app.component.ts
|___   
    | homepage // standalone component
        | homepage.component.html
        | homepage.component.scss
        | homepage.component.spec.ts
        | homepage.component.ts
|___
    | shared // module
        | button // non-standalone component
            | button.component.html
            | button.component.scss
            | button.component.spec.ts
            | button.component.ts
```


I will now ask you to do the following:

- in your `app.component.html`, replace the content by the following code:

```html
<app-homepage></app-homepage>

<router-outlet />
```

This code will include our `HomepageComponent` in our `AppComponent`.

- in `app.component.ts`, add `HomeComponent` to the list of `imports` like this:

```ts
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomepageComponent], // <= here
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'routines';
}
```

- in `homepage.component.ts`, import the `ButtonComponent` as we did for `HomepageComponent` in the `app.component.ts` file:

```ts
import { Component } from '@angular/core';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-homepage',
  imports: [ButtonComponent], // <= here
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}

```

- once all of this is done, run `npm run build` again and see many beautiful compilation errors:

```shell
$ npm run build

> routines@0.0.0 build
> ng build

Application bundle generation failed. [2.332 seconds]

✘ [ERROR] TS-992011: The component 'ButtonComponent' appears in 'imports', but is not standalone and cannot be imported directly. It must be imported via an NgModule. [plugin angular-compiler]

    src/homepage/homepage.component.ts:6:12:
      6 │   imports: [ButtonComponent],
        ╵             ~~~~~~~~~~~~~~~


✘ [ERROR] TS-992010: 'imports' is only valid on a component that is standalone. [plugin angular-compiler]

    src/shared/button/button.component.ts:5:11:
      5 │   imports: [],
        ╵            ~~

  Did you forget to add 'standalone: true' to this @Component?

    src/shared/button/button.component.ts:10:13:
      10 │ export class ButtonComponent {
         ╵              ~~~~~~~~~~~~~~~
```

The issues are quite simple to understand: `ButtonComponent` **is not standalone**, therefore we should not import it directly in our `HomepageComponent`, event if this one is **standalone**. Instead, we are going to use our `SharedModule`.
In order to do so, go into your `shared.module.ts` and make sure the `ButtonComponent` can be found in the `declarations` array.
Once it is done, there is but one little thing to do: add the `ButtonComponent` to the `exports` array of this module, like so:

```ts
@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ButtonComponent]
})
export class SharedModule { }

``` 

By doing so, we are saying to Angular:"My SharedModule can expose ButtonComponent, so it can be used by consummers of my module". 
And now, in our `homepage.component.ts`, we can replace the use of `ButtonComponent` in our `imports` array by this:

```ts
@Component({
  selector: 'app-homepage',
  imports: [SharedModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
```

Now, we can run again `npm run build` and... it works!

## Conclusion of this article
We started to develop our first feature, and even if we did not develop much, we could see two core concepts of Angular: Modules and Standalone Components.

The first ones are less and less used, as standalone is now the default option. Modules can still be found in legacy projects or libraires, so Angular will keep retro-compatibility for now. They are a bit more verbose than Standalone Components.

The latter are now considered common and best practice. Maybe in a few years, we won't meet them and Angular will introduce a new type of components, but for now, you should stick to Standalone Components.

### What you have learned
- Modules tend to be legacy;
- Modules are just a way to encapsulate a feature, a part of the app, and to expose some resources (components, services, pipes) of that feature to other parts of the app;
- Modules can be imported in Standalone Components;
- Modules can be imported in other Modules;
- Non-standalone Components must belong to at least one module (`declarations` array);
- Non-standalone Components cannot be imported directly in Standalone Components and *vice-versa*;
- Standalone Components can be imported directly in other Standalone Components;
- Standalone components offer a more concise, modular, and flexible structure than traditional modules, especially for modern Angular apps;
- It is still OK to use Modules *for now*, but the Angular team seems to encourage the use of Standalone Components for better reusability.

### 🧩 Angular Modules vs Standalone Components

| Aspect                         | Angular Modules (`@NgModule`)                                   | Standalone Components (`standalone: true`)                        |
|-------------------------------|-------------------------------------------------------------------|-------------------------------------------------------------------|
| **Declaration**               | Components must be declared in `declarations`                    | Components are self-contained with `standalone: true`             |
| **Importing**                 | Done via `imports` in a module                                   | Done directly in other standalone components via `imports`        |
| **Encapsulation**             | Groups multiple resources (components, pipes, services...)       | Represents an independent functional unit                         |
| **Boilerplate**               | More verbose, requires module boilerplate                        | More concise and modular                                          |
| **Interoperability**          | Required for non-standalone components                           | Can still import modules like `CommonModule`, `RouterModule`      |
| **Recommended Usage**         | Still useful for grouping legacy or non-standalone components    | Recommended as the default since Angular v15, now default in v19  |
| **Lazy Loading**              | Uses `loadChildren` with a module                                | Uses `loadComponent` directly                                     |
| **Deprecation**               | Not deprecated yet, but considered legacy going forward          | Considered the modern, preferred approach by Angular team         |
| **Migration**                 | Legacy modules can coexist with standalone components            | Enables progressive migration from module-based architecture      |
| **Component Exposure**        | Requires `exports` to expose components                          | No need to export — components are directly importable            |


## Next lesson
In the next lesson, we will keep on building our feature.