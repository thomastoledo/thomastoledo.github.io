---
layout: post
title:  "Angular Training - List routines"
date:   2025-05-05
categories: [angular, training]
---

# Angular Training - List routines

In our [previous article](https://thomastoledo.github.io/formation/angular/typescript/javascript/training/2025/04/30/angular-training-modules-standalone-components.html), we saw the differences between modules and standalone components. We learned why nowadays we use standalone components and how to use them. In this article, we are going to implement a small feature in our app. This will allow us to see structural directives such as `@for` and `@if ... @else` (legacy are `*ngFor` and `*ngIf; else`).

We will do a first version with the legacy ones, and then a second version with modern notation. The first one will seem painful to learn, but I believe it is necessary for two reasons:
- you will learn the history behind it and will fully understand why the modern notation was a big improvement;
- I suffered while learning it; you will too 🤗.

Let's have some fun!

## The structure
We are still working on our favorite repository: [Angular Training](https://github.com/thomastoledo/angular-training). This time, we will use the folder **2-list-routines**.
In this folder, there are **a lot of things**.

We have a backend folder, which your can browse if you are interested in NestJs. It is a simple CRUD API, with only a GET endpoint. We will use this API to retrieve a list that is stored in an SQL Lite database (a simple file called `training.db`). You can launch the backend by going into the `backend` folder with a terminal and launching `npm run start:dev`.
This command will start the server at `http://localhost:3000`.

If you go to `http://localhost:3000/api/routine/list`, you will see a bunch of routines.

We also have a frontend folder, which is what we will be interested in. In this folder, every component is a standalone component. We do not use modules anymore.

So, what is new this time?

You can see we have three new folders we did not have last time:
- `domains`: when working in real-world Angular projects, an often-faced issue is:"My service A for the domain A that I use on my page X is also needed for the page Y, how do I do it?". For instance:"My routine details page, which is in a totally other folder than my routine list page, also needs the RoutineService to retrieve details of the current routine".

This brings the following concerns: how do we properly structure our app in order not to have inconsistant coupling between features? The answer is actually quite simple: you can have a folder, right under `src`, named `domain`, containing folders for each domain, and in the features folders, a dedicated feature service which will use the domain services;

This gives us a structure similar to this:

```text
app/
├── homepage/
│   ├── homepage.component.html
│   ├── homepage.component.scss
│   ├── homepage.component.spec.ts
│   ├── homepage.service.spec.ts
│   ├── homepage.service.ts
│   └── homepage.component.ts
├── domain/
│   ├── routine/
│   │   ├── routine.service.ts
│   │   └── routine.model.ts
```

- `environments`: it contains two files, consisting in `environment.ts` and `environment.prod.ts`. If you go check in your `angular.json` file, you will find, line 38, a field called `fileReplacement`. This part of the file specifies that, regarding the build environment (dev or production), we will use one file or the other. Each file specifies if we are in prod environment or not (`true`/`false`) and the base URL of our API. The one specified in `environment.prod.ts` is fake, obviously;

- and in our `homepage` folder, we have a `homepage.service.ts` which is nothing more than a feature service. A feature service purpose is to avoid technical services (such as `RoutineService`) to be poluted by feature-related logic. It is a cleaner and more scalable alternative to a `services` folder based at the root of the app. We call that a *facade*.

So here is our structure so far:

```text
src/
└── app/
    ├── app.component.html
    ├── app.component.scss
    ├── app.component.spec.ts
    ├── app.component.ts
    ├── app.config.ts
    ├── app.routes.ts
    ├── domains/
    │   └── routine/
    │       ├── routine.model.ts
    │       ├── routine.service.spec.ts
    │       └── routine.service.ts
    ├── environments/
    │   ├── environment.prod.ts
    │   └── environment.ts
    ├── homepage/
    │   ├── homepage.component.html
    │   ├── homepage.component.scss
    │   ├── homepage.component.spec.ts
    │   ├── homepage.component.ts
    │   ├── homepage.service.spec.ts
    │   └── homepage.service.ts
    ├── index.html
    ├── main.ts
    └── styles.scss
```

## The implementation
You have been waiting for it. Let's code.

The feature is:
```cucumber
As a user
I want to arrive on the app
AND
I want to see the list of my routines
```
### The component
We have a `homepage.component.ts`. This component does nothing, and we need it to get the list of our routines.

In the component, inject the `HomepageService` and retrieve the routines:

```ts
@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  private readonly homepageService = inject(HomepageService); // <= injecting the service with the "inject" function Angular provides
  readonly routines = this.homepageService.getRoutines(); // <= retrieving the routines using our feature service (or facade)
}
```

This is nice and all, but nowadays, we like to use signals in Angular. And this service returns an Observable.

#### What are signals?
I could do a whole presentation about signals, but I prefer to talk about them here and probably later in the training as we continue together.

Historicaly, Angular (from version 2), embeds [RxJs](https://rxjs.dev/), a powerfull library to manipulate Observables. An Observable is a data structure that meets the designe pattern called **observable/observers**. If you are not familiar with Observables, worry not, as we will encounter them more than enough during our training lessons. You can think of them as object emitting events, to which you can subscribe, in order to receive notifications when an event is emitted. This is particularly usefull to manipulate stream events, combine them, manipulate user interactions as well...

An Observable is *push-based*, meaning if you subscribe, you **do not have to fetch the data**, as it will be pushed to you. The counterpart is you have to **unsubscribe when you do not need it anymore**, or else you will have **memory leaks**. We will see an example in due time.

Observables are really powerfull, but they have some downsides (non-exhaustive list):
- you have to think about unsubscribing if you do not want memory leaks;
- you have to subscribe to an Observable to get values;
- managing states can become very verbose.

This is where Signals come in handy: while they do not allow to work with stream events, they allow to better handle state management.
Also, they are **great for rendering the component when needed**.

If you are not familiar with how Angular render its components in the DOM, here is a quick walkthrough:
Angular renders components by replacing their selectors with their templates in the DOM. The view is only updated when an `@Input()` changes, an observable used in the template emits, or manual change detection is triggered — which is why using `ChangeDetectionStrategy.OnPush` is a recommended best practice for performance.
We will cover this in a future lesson.

What you can note is that we will use Signals instead of Observables.
Signals are *pull-based* and will only be evaluated when called in the code. This might not seem like a big deal for you if you are starting, but trust me for now: it is.

So, we need to tweak a bit our component:

```ts
import { Component, inject } from '@angular/core';
import { HomepageService } from './homepage.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  private readonly homepageService = inject(HomepageService);
  readonly routines = toSignal(this.homepageService.getRoutines()); // <= we added "toSignal"
}

```

`toSignal` is part of the `rxjs-interop` package of Angular: this function and its counterpart, `toObservable`, allows interoperability between Observables and Signals.

**Warning**: it can only be used in an injection context, i.e: constructor of class declaration.

### The HTML template
It is now time for us to implement the HTML template. What we want to do is to list the routines we just created. Historically, we would use the `*ngFor` structural directive. This directive needed to be used **directly on an HTML tag**, and would repeat this tag for each element of the array we would loop over.

So, let us say we wanted to display a simple unordered list. We would write some HTML like this:

```html
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</ul>
```

In an Angular component, for a given array (let's say `readonly array = ['toto', 'tata', 'titi']`), we would write:

```html
<ul>
  <li *ngFor="let name of array">
    {{name}}
  </li>
</ul>
```

OK so what is going on here?
First of all, we have `*ngFor="let name of array"`: you can think of it as the equivalent of a `for` loop in JavaScript. This is how we specify we are going to iterate over the array.
Then, we have `{{name}}`: here, we use the local variable `name` we specified in the previous line to display it via interpolation, using `{{}}`.

So, given that, we can easily use our `routines` array to display it in an `*ngFor` loop.

```html
<ul>
  <li *ngFor="let routine of routines">
    {{routine}}
  </li>
</ul>
```

But, hold one... There are a few things that are wrong, here...

First of all, `*ngFor` is part of the Angular `CommonModule`, meaning we need to import it to be able to use it. If your remember our previous lesson, you know you need to import it like that:

```ts
@Component({
  selector: 'app-homepage',
  imports: [CommonModule], // <= import it there
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  private readonly homepageService = inject(HomepageService);
  readonly routines = toSignal(this.homepageService.getRoutines());
}
```

Then `routines` is not an array... but a Signal encapsulating an array. And to read a Signal, wether it is in HTML or in TypeScript, we must call it like a function: `routines()`. This way, the Signal is evaluated and its value is pulled and read.

So our code becomes:

```html
<ul>
  <li *ngFor="let routine of routines()">
    {{routine}}
  </li>
</ul>
```

FInally, we try to interpolate `routine`, but `routine` is an object. Doing `{{routine}}` will only display `[object Object]`.

If we check our `Routine` model, we can see we have:

```ts
export interface RoutineDto {
  id: string;
  name: string;
  description: string;
  startingDate: Date;
  endingDate: Date;
  reccurence: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
  reccurenceCoef: number;
}
```
So far, we can display the name by doing: `{{routine.name}}`.

```html
<ul>
    <li *ngFor="let routine of routines()">
        {{routine.name}}
    </li>
</ul>
```

But there is one problem... if you try to launch the app, at best you will see a blank page. Where is our list?

### The routing
Routing is an essential part of Angular. It is the cornerstone of your app. It might be a bit scary at first, but is actually pretty simple and super powerfull.
The problem we have right now is that we cannot access our list. What we want, in this training, is to access it via the root URL. To configure it, open the `app.routes.ts` file. In this file, there is just one empty array called `routes`. It is of type `Routes`, which is the equivalent to `Route[]`. A `Route` has many fields to specify, but today we will need only two.

In the array, create an object like so:

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../homepage/homepage.component').then(m => m.HomepageComponent)
    }
];
```

- `path` specifies the path from which we will load a component;
- `loadComponent` is an arrow function that specifies a `lazy-loaded component`. This term, `lazy-loaded`, means the component will be loaded ONLY when accessing the URL specified previously. It is a best practice to use it to improve performance and to avoid loading too much components at a time.

Now, try and launch the app: you should still have a problem, if you look into your browser console.

```text
ERROR NullInjectorError: R3InjectorError(Standalone[_HomepageComponent])[_HomepageService -> _HomepageService -> _RoutineService -> _HttpClient -> _HttpClient]: 
  NullInjectorError: No provider for _HttpClient!
```

We are, indeed, missing two more things: this error is a common error when starting with Angular. It means your dependencies cannot be injected, as the right classes were not provided properly.

- `HttpClient`: the `HttpClient` must be provided at the root of your app, by adding in you `app.config.ts` the `provideHttpClient()` provider function.

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), //<= add it there
  ]
};
```

- `RoutineService` is needed in the `HomepageComponent`, but is not provided either. Add it to your list of providers in `homepage.component.ts`:

```ts
import { Component, inject } from '@angular/core';
import { HomepageService } from './homepage.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RoutineService } from '@domain/routine/routine.service';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule],
  providers: [RoutineService], // <= add it there
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  private readonly homepageService = inject(HomepageService);
  readonly routines = toSignal(this.homepageService.getRoutines());
}
```
Now, if you try to access your app, your should see a list of routines names.

## Refactor
We are going to do a small refactor: we are going to use `@for` instead of `*ngFor`. In your `homepage.component.html` file, do the following:

```html
<ul>
    @for (routine of routines(); track routine.id) {
        <li>
            {{routine.name}}
        </li>
    }
</ul>
```

As you can see, `@for` is **not specified on an HTML tag**. Instead, it is a more readable notation. The `track routine.id` part is **very** important. I did not use it previously, but it also exists on `*ngFor` and should never be neglected. The `track` keyword in `@for` tells Angular how to uniquely identify each item in a list, so it can update the DOM more efficiently when the data changes.

This notation is the modern one, as I am writing this article.

## Conclusion of this article
We finally developed a first and succinct version of our feature. It might not be pretty, it might not to much, but just doing this allowed us to learn a gread deal of Angular.

Voici une proposition pour ta section finale **"## What you have learned"**, claire, pédagogique et fidèle à la progression de ton article :

## What you have learned

In this article, you have learned:

* How to structure an Angular application with `domain` and `feature` folders;
* What a feature service (or facade) is and how it helps separating concerns;
* The difference between Observables and Signals, and when to use each;
* How to convert an Observable into a Signal using `toSignal`;
* How to display a list with `*ngFor` and its modern replacement `@for`;
* Why using `trackBy` (or `track`) improves performance when rendering lists;
* How Angular change detection works and why `OnPush` strategy is a best practice;
* How to configure routing using `loadComponent` for standalone components;
* How to fix common dependency injection errors (like `No provider for HttpClient`);
* How to provide `HttpClient` globally in a standalone app using `provideHttpClient()`.

You've now seen in practice how Angular standalone APIs and modern syntax can simplify and improve frontend development.


## Next lesson
In the next lesson, we will put some SCSS on our list, and we will add a form to add a routine. We will also sort the routines so the users can see the ones they have to do today. By doing so, we are going to know a bit more about Observables, Signals, forms and state management. 