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
It is now time for us to use 

## Next lesson
In the next lesson, we will keep on building our feature.