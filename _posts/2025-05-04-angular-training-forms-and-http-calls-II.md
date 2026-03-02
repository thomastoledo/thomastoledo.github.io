---
layout: post
title:  "Angular Training - Forms and HTTP calls"
date:   2025-05-05
categories: [angular, training]
---

# Angular Training - Forms and HTTP Calls II

In our [previous article](https://thomastoledo.github.io/angular/training/2025/05/05/angular-training-forms-and-http-calls.html), we saw:
* How to declare and use reactive forms in Angular using FormGroup and FormControl;
* How to create a strongly typed form factory with NullableValue and NullableFormControls;
* How to structure and type a form based on a backend DTO (CreateRoutineDto);
* How to use Angular validators like Validators.required, Validators.min and custom ones (e.g., password strength);
* How to build a feature form component (RoutineFormComponent) and reuse it across the app;
* How to communicate between a parent container and a form component using @Input and @Output;
* How to submit a form and trigger an HTTP POST call via a domain service (RoutineService);
* How to configure HttpClient with query parameters to support filtering and pagination;
* How to navigate programmatically with Angular’s Router;
* How to handle loading states and submission feedback in a reactive way.

In this article, we will focus on:
* editing an existing routine and preloading its data into the form;
* reusing the same RoutineFormComponent for both creation and edition;
* handling PATCH requests and differences with POST;
* display an error message for invalid controls;
* implement a routine edition;
* handle a local state with shared services.

Let’s get back to it.

## The structure
We are still working on our favorite repository: [Angular Training](https://github.com/thomastoledo/angular-training). This time, we will use the folder **3-create-edit-filter**.

Do not forget to do `npm install` in both the backend and the frontend, and to launch the backend with `npm run start`.

The structure is the same as in the previous lesson.

## The routing
So far, our routing only allows us to go on `/new` to create a new routine, and we would like to create a new route and to reuse our `RoutineEditorPageComponent` in order to allow the edition of a routine.

Go into the `src/app.route.ts` file and add the following route:

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  /**
   * Already existing
   */
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  /**
   * Already existing
   */
  {
    path: 'list',
    loadComponent: () =>
      import('../features/homepage/homepage.component').then(
        (m) => m.HomepageComponent
      ),
  },
  /**
   * Already existing
   */
  {
    path: 'new',
    loadComponent: () =>
      import(
        '../features/routine-editor-page/routine-editor-page.component'
      ).then((m) => m.RoutineEditorPageComponent),
    data: {
      mode: 'new',
    },
  },
  // ADD THIS ROUTE
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        '../features/routine-editor-page/routine-editor-page.component'
      ).then((m) => m.RoutineEditorPageComponent),
    data: {
      mode: 'edit',
    },
  },
  /**
   * Already existing
   */
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];

```

You can see three things:

- this route uses the same component as the `/new` route;
- it contains a path param `:id`;
- it also contains a `data` field, that I did not talk about in our previous lesson.

Let's cover these points.

### Using the same component
One of Angular's strength is the routing, which allows to easily reuse components for pages. By doing so, the `RoutineEditorPageComponent` will be loaded when we go on `/new` or `/edit/:id`.

### The `data` field
You can pass static data through a route to a component by using this field. It is useful to know in which context you load a component, especially if this component can be accessible via more than one route. Here, we will use this data to know if we need to pre-fill the form (edit mode) or not (create mode).

### Path params
As you can see, we wrote `/edit/:id`. Those of you who already used Spring or NestJS will understand what the `:id` part is all about. For those of you are not familiar with it: the `:id` part is what we call a `path param`, which is basically a portion of the route path that can take any value we want. This will allow us to pass the ID of any routine to the route, only to retrieve it when loading the component.

This way, a route as simple as `/edit/:id` can become many routes such as:

- `/edit/1`;
- `/edit/2`;
- `/edit/-1`;
- `/edit/undefined`.

And now you can see there might be a problem: our path param allows us to make our route generic, but it also allows for dumb errors with IDs like `-1` or `undefined`, which should not exist.

A naive approach would be to use a guard to avoid that: but a good UX approach would be to actually display an error message if the resource is not found. In order to do so, we need to change a bit our `RoutineEditorPageComponent`.

### `RoutineEditorPageComponent`

What do we want to achieve, in this component?

- know in which mode we are: `new` or `edit`;
- retrieve the resource if we are in `edit` mode;
- pass the resource to the form to prefill it;
- when submitting the form, either call create or patch, regarding the mode we're in.

#### Retrieve the mode
The mode can be retrieved thanks to `ActivatedRoute`. This class provides with informations about the current routing state. We need to inject it and use it as follow:

```ts
private readonly route = inject(ActivatedRoute);

readonly mode: 'new' | 'edit' = this.route.snapshot.data['mode'];
```
#### Retrieve the resource
To achieve that, we will also need the `ActivatedRoute`, as well as the `RoutineEditorPageService`, that is already injected in our component.

```ts
private readonly id = this.route.snapshot.paramMap.get('id');
```

The previous line retrieves the ID from the param map. Now, we need to enrich the `RoutineEditorPageService` with a method to get a routine by its ID. So, in the service:

```ts
getRoutine(id: string): Observable<RoutineDto> {
  return this.routineService.getRoutine(id);
}
```

and, in the component:

```ts
readonly routine = this.id ? toSignal(this.routineEditorPageService.getRoutine(this.id)) : signal(null);
```

#### The form component

Now, we need to pass the resource to the form. Our `RoutineFormComponent` does not allow for an initial value to be passed, yet.
In our `RoutineFormComponent`, add an input for an initial value:

```ts
initialValue = input<RoutineFormGroupValues | null>();
```

And, in our constructor, we are going to use an effect so we can patch the form value when the initialValue changes:

```ts
constructor() {
  effect(() => {
    // Retrieving the value. Since we use input(), it is a signal and
    // will be added to the dependencies of this effect
    // meaning everytime it changes, the effect is ran.
    const initialValue = this.initialValue();
    if (initialValue) {
      const patchedValued = {
        ...initialValue,
        startingDate: new Date(initialValue.startingDate),
        endingDate: new Date(initialValue.endingDate),
      };
      this.routineForm.patchValue(patchedValued)
    }
  });
}
```

Your `RoutineEditorFormComponent` should look like this:

```ts
import { Component, computed, effect, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { createRoutineForm, RoutineFormGroupValues } from './routine-form.factory';

@Component({
  selector: 'app-routine-form',
  imports: [ReactiveFormsModule],
  templateUrl: './routine-form.component.html',
  styleUrl: './routine-form.component.scss',
})
export class RoutineFormComponent {
  initialValue = input<RoutineFormGroupValues | null>();
  onSubmit = output<any>();

  routineForm = createRoutineForm();

  constructor() {
    effect(() => {
      const initialValue = this.initialValue();
      if (initialValue) {
        const patchedValued = {
          ...initialValue,
          startingDate: new Date(initialValue.startingDate),
          endingDate: new Date(initialValue.endingDate),
        };
        this.routineForm.patchValue(patchedValued)
      }
    });
  }
  submit() {
    this.onSubmit.emit(this.routineForm.getRawValue());
  }
}
```

This is great and all, but we could add a few more things to our HTML template, such as error messages when a field is not valid.
I've talked about it in our last lesson, so we can do it now.

In case you do not remember it properly, here is our form factory:

```ts
export function createRoutineForm(): RoutineFormGroup {
  return new FormGroup<NullableFormControls<RoutineFormGroupValues>>({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    startingDate: new FormControl<Date | null>(null, [Validators.required]),
    endingDate: new FormControl<Date | null>(null, [Validators.required]),
    reccurence: new FormControl<
      'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'
    >('day', [Validators.required]),
    reccurenceCoef: new FormControl<number | null>(1, [
      Validators.required,
      Validators.min(1),
    ]),
  });
}
```

We can see we have a few validators on our fields: `Validators.required` and `Validators.min(1)`. In our form HTML template, we could have something like this:

```html
<form [formGroup]="routineForm" (ngSubmit)="submit()" class="routine-form">
    <div class="form-group">
        <label for="name">Name</label>
        <input id="name" type="text" formControlName="name" />
        @if (routineForm.controls.name.touched && routineForm.controls.name.errors.required) {
        <div class="error">This field is required</div>
        }
    </div>

    <!-- ...rest of the form -->
</form>
```

And that would work pretty well. Except, if one day we have more than one validator, we would need to do something like this:

```html
<form [formGroup]="routineForm" (ngSubmit)="submit()" class="routine-form">
    <div class="form-group">
        <label for="name">Name</label>
        <input id="name" type="text" formControlName="name" />

        <!-- duplicating code is not a good approach -->
        @if (routineForm.controls.name.touched && routineForm.controls.name.errors.required) {
        <div class="error">This field is required</div>
        }

        @if (routineForm.controls.name.touched && routineForm.controls.name.errors.anotherValidator) {
        <div class="error">This field is ba bla bla</div>
        }

        @if (routineForm.controls.name.touched && routineForm.controls.name.errors.anotherValidator2) {
        <div class="error">This field is ba bla bla 2</div>
        }
    </div>

    <!-- ...rest of the form -->
</form>
```

To avoid that, we can do a shared pipe that will take an errors object as an input, and return an error message regarding the errors.



## What you have learned

In this article, you have learned:

By the end of this article, you should now be able to:

* Understand how to propagate backend DTOs and endpoints into the frontend
* Use utility types (Omit, Partial, custom NullableValue, NullableFormControls) to create cleaner and more scalable types
* Implement HTTP calls in a dedicated domain service and handle query parameters for pagination and filtering
* Create and manage a complex reactive form in Angular using FormGroup, FormControl, and validators
* Build a form factory function with strong typings for reusability and maintainability
* Use custom validators to enforce specific rules (e.g., password strength)
* Structure your app using feature modules, separating UI concerns from logic
* Set up form inputs and outputs to communicate between parent and child components
* Perform programmatic navigation with Angular's Router
* Submit a form and trigger HTTP calls to the backend upon form submission
* Implement routing using loadComponent for standalone components
* Create reusable, encapsulated form components (RoutineFormComponent)
* Understand the importance of form validation, loading state handling, and proper component communication


## Next lesson
In the next lesson, we will continue on the same folder in the repo and will implement the following features:

* display an error message for invalid controls;
* implement a routine edition;
* retrieve data from routing;
* handle a local state with shared services.