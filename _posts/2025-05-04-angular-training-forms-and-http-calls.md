---
layout: post
title:  "Angular Training - Forms and HTTP calls"
date:   2025-05-05
categories: [angular, training]
---

# Angular Training - Forms and HTTP Calls

In our [previous article](https://thomastoledo.github.io/angular/training/2025/05/05/angular-list-routines.html), we saw:

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

In this one, we will take a big step and we will:

* add a component to create a routine;
* listen to a form changes to trigger http calls and validations;
* learn more about forms
* learn more about utility types
* learn about inputs and outputs

Let's have some fun!

## The structure
We are still working on our favorite repository: [Angular Training](https://github.com/thomastoledo/angular-training). This time, we will use the folder **3-create-edit-filter**.

Do not forget to do `npm install` in both the backend and the frontend, and to launch the backend with `npm run start`.

In our backend, this time, I added a few endpoints in the `src/routine/routine.controller.ts` file:

- GET /:id -> to get a routine based on its ID;
- POST / -> to create a routine;
- PATCH /:id -> to partially update a routine;
- DELETE /:id -> to delete a routine. 

I also added two DTOs in `src/routine/dtos`:

- `create-routine.dto.ts`:

```ts
import { ApiProperty } from '@nestjs/swagger';
export class CreateRoutineDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    startingDate: Date;
    @ApiProperty()
    endingDate: Date;
    @ApiProperty()
    reccurence: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
    @ApiProperty()
    reccurenceCoef: number;
}
```

- `patch-routine.dto.ts`:

```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutineDto } from './create-routine.dto';
// Basically just a CreateRoutineDto with each property being optional
export class PatchRoutineDto extends PartialType(CreateRoutineDto) {}
```

In our `front` folder, nothing much have changed. I put some `TODOs` to indicate what miust be done in each file, but we will go over everything nonetheless.

## Propagate the back to the front
The first thing we want to do, is to propagate the backend to the front, so they both can properly communicate.

Fortunately, out DTOs and endpoints will allow us to do so in a very simple way.

### The DTOs
The backend specifies what it need from the front through its DTOs.
We need to implement those in our front. For the sake of not having too much files, let us say we will write them in the `src/domains/routine/routine.model.ts` file:

```ts
// Already existing
export interface RoutineDto {
  id: string;
  name: string;
  description?: string;
  startingDate: Date;
  endingDate: Date;
  reccurence: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
  reccurenceCoef: number;
}

// We will capitalize on RoutineDto and use utility types from TypeScript
export interface CreateRoutineDto extends Omit<RoutineDto, 'id'> {}
export interface PatchRoutineDto extends Partial<CreateRoutineDto> {}

```
A utility type, in TypeScript, is a type which takes in parameters an interface or another type, and returns a new type with some specificities. For instance, `Omit` takes a type or interface - here `RoutineDto`, as well as keys from this type we want to ignore. Here, the resulting type is `CreatinRoutineDto` which is basically a `RoutineDto` without an `id`. The other type, `PatchRoutineDto`, is a `CreateRoutineDto` which keys are all optional.
You can learn more about utility types here: [https://www.typescriptlang.org/docs/handbook/utility-types.html](https://www.typescriptlang.org/docs/handbook/utility-types.html).

### The domain service
Now that we have our DTOs, we need to add the missing calls from our `RoutineService`, located in `src/domains/routine/routine.service.ts`. Reminder: this service's only purpose is to call the backend. So, regarding our backend `RoutineController`, we need to add these methods: 

- `getRoutine(id: string): Observable<RoutineDto>`;
- `createRoutine(dto: CreateRoutineDto): Observable<RoutineDto>`;
- `patchRoutine(id: string, dto: PatchRoutineDto): Observable<RoutineDto>`;
- `deleteRoutine(id: string): Observable<void>`;

Each method's return type is based on what the backend actually sends back when being requested.

Here is the full code, with explainations.

```ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CreateRoutineDto, PatchRoutineDto, RoutineDto } from './routine.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  private readonly baseUrl = environment.baseUrl;
  private readonly httpClient = inject(HttpClient);

  // We already know this one
  // we use the httpClient service to fetch the whole list of routines
  getRoutines(): Observable<RoutineDto[]> {

    // the get<RoutineDto[]>() bears the type we expect to receive from the backend
    // while the "Observable<ROutineDto[]>" just above specifies what our own method
    // will return. These two can differ one from another. 

    // We could as well use query params if needed (?param1=something1&param2=something2&...)
    // for instance for filters and pagination
    return this.httpClient.get<RoutineDto[]>(`${this.baseUrl}/routine/list`);
  }

  getRoutine(id: string): Observable<RoutineDto> {
    // Here, we do a simple get as well, except we use a path parameter
    return this.httpClient.get<RoutineDto>(`${this.baseUrl}/routine/${id}`);
  }

  createRoutine(dto: CreateRoutineDto): Observable<RoutineDto> {
    // We simply pass the POST body as second argument
    return this.httpClient.post<RoutineDto>(`${this.baseUrl}/routine`, dto);
  }

  patchRoutine(id: string, dto: PatchRoutineDto): Observable<RoutineDto> {
    // We simply pass the PATCH body as second argument
    return this.httpClient.patch<RoutineDto>(
      `${this.baseUrl}/routine/${id}`,
      dto
    );
  }

  deleteRoutine(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/routine/${id}`);
  }
}
```

**Note**:
Regarding the `getRoutines(): Observable<RoutineDto[]>`, we retrieve the **whole list** of routines which, of course, can impact the performances. A better idea would be to paginate the whole thing as well as having a filtering mechanism.
A reasonable implementation could be as follow:

```ts
/**
   * Get routines with optional filters and pagination
   * @param filters an object containing filters like { search: 'morning' }
   * @param page the page number (starting from 1)
   * @param size the number of items per page
   */
  getRoutines(
    filters: { search?: string } = {},
    page = 1,
    size = 10
  ): Observable<RoutineDto[]> {
    // We instantiate here what is called `HttpParams`
    // This class is made for query params
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filters.search) {
      params = params.set('search', filters.search);
    }

    // You can see here, the query params are passed using params
    return this.httpClient.get<RoutineDto[]>(`${this.baseUrl}/routine/list`, { params });
  }
```

### The `RoutineEditorPage` feature
So far, our only feature is to display a list of routines. Now, we are going to allow the creation and edition of a routine. For the sake of reusability, we will implement a component that will serve both purposes.

With your terminal, go under the `src/features` folder and execute the following command:

```bash
ng g component routine-editor-page
```

A new folder named `routine-editor-page` is created, containing our new component. So far, the template is empty, and it is now time to write the HTML corresponding to the form that will allow us to create or edit a routine.

What do we need for our form are the following:
- an input for a name;
- a text area for a description (optional);
- a date picker for a starting date and a date picker for an end date;
- a dropdown to select the recurrence (minute, hour, day, week, month, year);
- an input to specify the recurrence coefficient (number of time per recurrence).

A classic HTML form would be something like that:

```html
<form>
  <label for="name">Name</label>
  <input id="name" type="text" />


  <label for="description">Description</label>
  <textarea id="description"></textarea>

  <label for="startingDate">Start date</label>
  <input id="startingDate" type="date" />
    
  <label for="endingDate">End date</label>
  <input id="endingDate" type="date" />
        
  <label for="reccurence">Recurrence unit (e.g. day)</label>
  <select id="reccurence">
      <option value="minute">Minute</option>
      <option value="hour">Hour</option>
      <option value="day">Day</option>
      <option value="week">Week</option>
      <option value="month">Month</option>
      <option value="year">Year</option>
  </select>
        
  <label for="reccurenceCoef">
      Times per unit
      <small>(e.g. 20 times per day)</small>
  </label>
  <input id="reccurenceCoef" type="number" min="1"/>
  <button type="submit">OK</button>
</form>
```

Now, this HTML is perfectly valid and fine, but it lacks *so many things* to be a properly crafted *HTML template*.
So far, here is what is missing:

- binding with the component: one of Angular's greatest strengths is to allow for a powerful form management through its binding and reactive forms. We will see about that in a moment;
- error handling: it could be nice to display custom error messages when a field is invalid;
- button is always enabled: we should disable it while the form is invalid and enable it only if it becomes valid;
- loading management: we will see about that a bit later too, but when editing a routine, if things go south regarding the network, we should at least display a text saying it is loading.

#### Template-driven forms vs Reactive forms

Angular comes with two ways of managing forms. The simplest is called *template-driven* and it is not the one we will cover right now. The one we will cover is called *reactive*. It consists in defining in the component the state of the form, its structure, and to bind it to the HTML template. Angular will then do all the magic and make sure both the template is hydrated with the component form data, and the component form data is updated with every action the user does.

But how do we set it up?

First, we need to import a module in our component: `ReactiveFormsModule`.
This module is native to Angular and allows the use of reactive forms.

```ts
@Component({
  ...
imports: [ReactiveFormsModule]
  ...
})
export class ...
```

Then, we need to create a new form in the component itself.

Here is how to do it (do not copy/paste yet, just read):

```ts
readonly form = new FormGroup({}); // this line instanciate a new form group, which corresponds to the <form></form> tag
```

But this is just an empty form group, and we need some inputs and stuff in it. We call that `controls`.

```ts
readonly form = new FormGroup({
  name: new FormControl('', Validators.required)
});
```
Here, we instanciate a form group containing one control, with an initial value of `''` and with a validator. A validator is a function you can provide to any form group or form control, which helps you deciding if a control is in a valid state or not. To learn more about validators, you can check here: [https://angular.dev/api/forms/Validators](https://angular.dev/api/forms/Validators).
The ones specified in the link above are all pre-built in Angular, but you can easily code a custom one. For instance, let us say we want to check a password strength when a user register in our app, here is how we would define a custom validator for that:

```ts
import {AbstractControl, ValidationErrors} from '@angular/forms';

// A validator takes in parameter a control, types as AbstractControl
// and it returns either a ValidationErrors object (which is basically a {key: boolean | object} object), or null
export function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return {enterAPassword: true};
  const errors: ValidationErrors = {};

  // For each spec, we set a new error if needed
  if (value.length < minLength) {
    errors['minLength'] = {
      requiredLength: minLength,
      actualLength: value.length,
    };
  }
  if (!/[a-z]/.test(value)) {
    errors['missingLowercase'] = true;
  }
  if (!/[A-Z]/.test(value)) {
    errors['missingUppercase'] = true;
  }
  if (!/[0-9]/.test(value)) {
    errors['missingDigit'] = true;
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    errors['missingSpecialChar'] = true;
  }
  return Object.keys(errors).length > 0 ? errors : null;
}
```

In our case, we do not need a custom validator: we just want to specify if a field is required, and Angular already provides with such validator.

So, according to what we just learned, here is how our form would look like:

```ts
readonly form = new FormGroup({
    name: new FormControl(initial?.name ?? null, Validators.required),
    description: new FormControl(initial?.description ?? null),
    startingDate: new FormControl(initial?.startingDate ?? null, Validators.required),
    endingDate: new FormControl(initial?.endingDate ?? null, Validators.required),
    reccurence: new FormControl(initial?.reccurence ?? 'day', Validators.required),
    reccurenceCoef: new FormControl(initial?.reccurenceCoef ?? 1, [
      Validators.required,
      Validators.min(1),
    ]),
  })
```

That is nice, but do not copy/paste it yet. We need (again) to change a few more things.
First, it would be nice to type our form group, so when we retrieve the value, we know what is its type.
Second, all of this form creation could be exported in a **form factory**.

So, at the same level as our component, create a file named `routine-form.factory.ts`.
In this file, create a function like so:

```ts
export function createRoutineForm(): any {
  // and here, just return the form creation
  return new FormGroup<NullableFormControls<CreateRoutineDto>>({
    name: new FormControl(initial?.name ?? null, Validators.required),
    description: new FormControl(initial?.description ?? null),
    startingDate: new FormControl(initial?.startingDate ?? null, Validators.required),
    endingDate: new FormControl(initial?.endingDate ?? null, Validators.required),
    reccurence: new FormControl(initial?.reccurence ?? 'day', Validators.required),
    reccurenceCoef: new FormControl(initial?.reccurenceCoef ?? 1, [
      Validators.required,
      Validators.min(1),
    ]),
  });
}
```

Our function returns `any`, which is not a very good practice. Let us declare some types specifically for our form so we can use them for our function and every other consumers of the form and its data.

In the same file, but above the function, add the following lines:

```ts
export type RoutineFormGroupValues = CreateRoutineDto;
export type RoutineFormGroup = FormGroup<RoutineFormGroupValues>;
```

That is not bad at all, but we have a problem (again): `CreateRoutineDto` awaits values that are non-null, but our form can, in fact, have `null` values (for instance the first time, before the user does anything to it).
Do you recall `utility types`? Like `Omit` and `Partial`, we saw a bit earlier in this article? We are going to implement our own, for the sake of static typing.

We will call this one `nullable-value` and it will take in parameter a generic type `T`, to return a type so **for each key of T, the associated value type is either the initial value type or null**:

```ts
export type NullableValue<T> = {
  [K in keyof T]: T[K] | null;
};
```
This type will be used for the **values of a form control**. To do things properly, we would also need a utility type that does the same, but for `FormControls`.

We would have:

```ts
export type NullableFormControls<T> = {
  [K in keyof T]: FormControl<T[K] | null>;
};
```

*Why do we need those two types?*
With `NullableValue`, we specify a type with nullable values for each key of the input type.
With `NullableFormControls`, we specify a type for form controls, which values can be null.

The first one is used to have nullable values.
The second one is used to transform those nullable values into `FormControl<T | null>`, properly typed for a `FormGroup`.
Of course, this might seem a bit "extreme" as we often do not see that, but it is a good practice to properly type our forms so the transpilation phase prevents more bugs.

and so, our two previous types become:

```ts
export type RoutineFormGroupValues = NullableValue<CreateRoutineDto>;
export type RoutineFormGroup = FormGroup<NullableFormControls<RoutineFormGroupValues>>;
```

You can keep these three types and the factory function in the same file if you want. In my solution, I keep the `NullableValue<T>` in a separate file, under a folder named `shared/models`.

The entire factory is:

```ts
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateRoutineDto } from '@domain/routine/routine.model';

// I moved them into separate files but you can keep them in this file if you want to
import { NullableFormControls } from 'shared/models/nullable-form-control';
import { NullableValue } from 'shared/models/nullable-value';

export type RoutineFormGroupValues = NullableValue<CreateRoutineDto>;
export type RoutineFormGroup = FormGroup<NullableFormControls<RoutineFormGroupValues>>;

export function createRoutineForm(): RoutineFormGroup {
  return new FormGroup<NullableFormControls<CreateRoutineDto>>({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null),
    startingDate: new FormControl(null, Validators.required),
    endingDate: new FormControl(null, Validators.required),
    reccurence: new FormControl('day', Validators.required),
    reccurenceCoef: new FormControl(1, [
      Validators.required,
      Validators.min(1),
    ]),
  });
}
```

#### Passing an initial value
You are going to hate me (if it is not already the case), but there is one tiny, subtle, little thing we can do before actually using this factory function in our component.

When we will edit a routine, we will need to feed our form with an initial value: the routine we want to edit. To do so, we can specify to our factory function an optional argument, that we will check to specify the initial value of each form control.

Example:

```ts
function myFactoryFunction(initialValue?: SomeTypeIDeclaredBefore): AnotherType {
  return new FormGroup({
    name: new FormControl(initialValue?.name ?? null, Validators.required)
  });
}
```
What do I do, here?
My factory function takes an initial argument **which is optional**. You can see that with the `?` operator before the `:` marker. It means I can call my function with or without this argument.
Since this argument is optional, I cannot simply do `new FormControl(initialValue.name)`: if I call my factory function without any argument, doint `initialValue.name` will throw an error as `initialValue` will be `undefined`. Instead, I will use the **optional chaining**, which basically says "Check if it is `undefined` or not. If not, keep evaluating the chaining until you retrieve the last value. If yes, then just return `undefined` for this value".

For instance:

```js
const user = {role: 'admin'};
console.log(user.info.name); // will throw an error
console.log(user?.info.name); // will throw an error
console.log(user?.info?.name); // will print "undefined"

user.info.name = 'toto'; // will throw an error
user.info = {};
user.info.name = 'toto';
console.log(user.info.name); // will display "toto"
```

This is the same mechanism here.
You can also see I use an operator `??`: this one is called **null coalescing operator**. It basically says:"If the left operand is `null` or `undefined`, then use the right operand. Else use the left one". It is more specific than the `||` operator that will check if the value of the left operand is `falsy` rather than `null` or `undefined`.
More about this operator here: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing).

So, given these examples, we can now have our final version of the factory:

```ts
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateRoutineDto } from '@domain/routine/routine.model';
import { NullableFormControls } from 'shared/models/nullable-form-control';
import { NullableValue } from 'shared/models/nullable-value';

export type RoutineFormGroupValues = NullableValue<CreateRoutineDto>;
export type RoutineFormGroup = FormGroup<NullableFormControls<RoutineFormGroupValues>>;

// An initial value that is optional
export function createRoutineForm(initial?: Partial<RoutineFormGroupValues>): RoutineFormGroup {
  return new FormGroup<NullableFormControls<CreateRoutineDto>>({
                          // optional chaining operator + null coalescing operator 
    name: new FormControl(initial?.name ?? null, Validators.required),
    description: new FormControl(initial?.description ?? null),
    startingDate: new FormControl(initial?.startingDate ?? null, Validators.required),
    endingDate: new FormControl(initial?.endingDate ?? null, Validators.required),
    reccurence: new FormControl(initial?.reccurence ?? 'day', Validators.required),
    reccurenceCoef: new FormControl(initial?.reccurenceCoef ?? 1, [
      Validators.required,
      Validators.min(1),
    ]),
  });
}
```

#### Using our factory
We spent a lot of time coding our factory, but we also saw a great deal of reactif forms.
Now, it is time to use it in our `routine-editor-page` component.

Go into the component and declare the form:

```ts
@Component({
  //...
})
export class RoutineEditorPageComponent {
  // here it is
  readonly form = createRoutineForm();
}
```

Great.
Now, in the HTML template, we can add a few things:

```html
<form [formGroup]="form"> <!-- We bind the form group -->

  <label for="name">Name</label>
  <input id="name" type="text" formControlName="name"/> <!-- We bind the "name" control of the form group to that input -->


  <label for="description">Description</label>
  <textarea id="description" formControlName="description"></textarea>

  <label for="startingDate">Start date</label>
  <input id="startingDate" type="date" formControlName="startingDate"/>
    
  <label for="endingDate">End date</label>
  <input id="endingDate" type="date" formControlName="endingDate"/>
        
  <label for="reccurence">Recurrence unit (e.g. day)</label>
  <select id="reccurence" formControlName="reccurence">
      <option value="minute">Minute</option>
      <option value="hour">Hour</option>
      <option value="day">Day</option>
      <option value="week">Week</option>
      <option value="month">Month</option>
      <option value="year">Year</option>
  </select>
        
  <label for="reccurenceCoef">
      Times per unit
      <small>(e.g. 20 times per day)</small>
  </label>
  <input id="reccurenceCoef" type="number" min="1" formControlName="reccurenceCoef"/>
  <button type="submit" [disabled]="form.invalid">OK</button> <!-- If our form is in an invalid state, the button is disabled -->
</form>
```

Now, our HTML form is bound to our reactive form, allowing for more control through our component.

#### Reusability for our form
This is all great and stuff, but a good practice would be to extract our form into a specialized component called, let us say, `routine-form` component.

So here we go: with your terminal, go under the `src/features/routine-editor-page` folder and run the following command line: `ng g component routine-form`.
In the HTML template of the newly generated component, put the HTML of the form.
Move the factory under the `routine-form` folder that has just been created.
Move the form declaration from `routine-editor-page.component.ts` to `routine-form.component.ts`.

Now, we just need to import `RoutineFormComponent` in `RoutineEditorPageComponent` to be able to use it in `routine-editor-page.component.html`:

```ts
@Component({
  selector: 'app-create-routine-page',
  imports: [CommonModule, RoutineFormComponent], // import it here
  templateUrl: './routine-editor-page.component.html',
  styleUrl: './routine-editor-page.component.scss',
})
export class RoutineEditorPageComponent {
  // ...
}
```

And, in the HTML template:

```html
<app-routine-form></app-routine-form>
```

**Why did we just moved our form into another child component?**
You may think this would add an unecessary layer to our app, but here is the thing: later on, we are going to implement the `edition` feature. This means we are going to need to know if we are in an `edit` mode or not, and if we pass an initial value or not to the form. This kind of logic should be wrapped into a single component, according to SOLID principles.

#### Routing to our component
It is now time for us to route the users to our component if they want to create a new routine.

In `app.routes.ts`, add a route so your file looks like this:

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('../features/homepage/homepage.component').then(
        (m) => m.HomepageComponent
      ),
  },
  // The route to add. When going to this URL, the RoutineEditorPageComponent
  // will be loaded and you will see the form.
  {
    path: 'new',
    loadComponent: () =>
      import(
        '../features/routine-editor-page/routine-editor-page.component'
      ).then((m) => m.RoutineEditorPageComponent),
    data: {
      mode: 'new',
    },
  }
  // If you do not have this, add it, it redirects any wrong url to the homepage
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];

```

#### Adding a button on our homepage
Our goal is to add a simple button to our homepage in order to redirect to the page we just created.
So, in `homepage.component.html`, go on and create a button like this:

```html
  <button>+ Create Routine</button>
```

There is a problem: when we click on the button, nothing happens.
Go into the `homepage.component.ts` file and implement do the following:

- inject the Angular router

```ts
  private readonly router = inject(Router);
```
The router is the cornerstone of an Angular app, as it handles every navigation event and allows for programatically made events as well.

- use the router in a method to redirect to our new page. 

```ts
  goToCreate() {
    this.router.navigate(['/new']);
  }
```

The `navigate` method of `router` fires a navigation event and virtually redirect to a new page. I say "virtually", as an Angular app is an SPA, where the whole page is not reloaded but rather the components in it are re-rendered.
More about routing in Angular: [https://angular.dev/guide/routing](https://angular.dev/guide/routing);

Go back in your HTML template and add what is called an `output` binding to your button:

```html
<button (click)="goToCreate()">+ Create Routine</button>
```

By doing so, we specify to Angular which method of our component is to be executed when a `click` event is fired on that button.

#### HTTP call and redirection when submitting the form
We now need to trigger an HTTP call when submitting our form.

The same way we did a `HomepageService`, we need to do a `RoutineEditorPageService`. This service will contain a single method (for now) to create a routine.

Under `src/features/routine-editor-page/services` (create the folder if it does not exist), run `ng g service routine-editor-page` to generate a service.
Inject the `RoutineService` in it and implement a `createRoutine` method that takes in paramaters an object of type `RoutineFormGroupValues`.

This method will map the object into a `CreateRoutineDto` object, call the `RoutineService` and return an `Observable<RoutineDto>`.

```ts
import { inject, Injectable } from '@angular/core';
import { CreateRoutineDto, PatchRoutineDto, RoutineDto } from '@domain/routine/routine.model';
import { RoutineService } from '@domain/routine/routine.service';
import { Observable } from 'rxjs';
import { RoutineFormGroupValues } from '../routine-form/routine-form.factory';
import { toCreateDto, toPatchDto } from '../mappers/routine-form-mapper';

@Injectable({
  providedIn: 'root',
})
export class RoutineEditorPageService {
  private readonly routineService = inject(RoutineService);

  createRoutine(
    formGroupValues: RoutineFormGroupValues
  ): Observable<RoutineDto> {
    const dto: CreateRoutineDto = toCreateDto(formGroupValues);
    return this.routineService.createRoutine(dto);
  }
}

// this function can be moved under a "src/features/routine-editor-page/mappers" folder for more reusability
// and a cleaner code
function toCreateDto(values: RoutineFormGroupValues): CreateRoutineDto {
  if (
    !values.name ||
    !values.startingDate ||
    !values.endingDate ||
    !values.reccurence ||
    values.reccurenceCoef == null
  ) {
    throw new Error('Cannot convert to DTO: missing required values.');
  }

  return {
    name: values.name,
    description: values.description ?? '',
    startingDate: new Date(values.startingDate),
    endingDate: new Date(values.endingDate),
    reccurence: values.reccurence,
    reccurenceCoef: values.reccurenceCoef,
  };
}
```

Once it is done, we just have to use this service in our component:

- bind a method to the `submit` event of the **form**;
- call the service's method;
- subscribe to the observable;
- when the observable emits the response, redirect to the homepage with router.

Let's go!
In our HTML template `routine-form.component.html`:

```html
<form [formGroup]="form" (ngSubmit)="submit()">
<!-- ... -->
</form>
```

In our `routine-form.component.ts` component, we need to communicate when the `submit` event is fired. We need to propagate it to our parent, i.e `routine-editor-page.component.ts`.
In `routine-form.component.ts`:

```ts
// we declare an output
private readonly formSubmit = output<RoutineFormGroupValues>();

submit() {
  // if our form is invalid, we simply return
  if (this.form.invalid) return;
  // else we call our output with the raw value of the form
  this.formSubmit.emit(this.routineForm().getRawValue());
}
```

Now, hold on, there!
I just write something that I haven't talked about since we started: `inputs` and `outputs`.
Angular, juste like other frameworks and libraries, needs to allow communication between components. This can be done through several mechanisms, and one of them is the input/output duet.
An `input` is how the parent passes data to the child.
An `output` is how the child propagates something to the parent.

Historically, we would use `@Input` and `@Output`. While this notation can still be found in the code, I recommend using the `signal notation` with `input<T>()` and `output<T>()`. This allows for better reactivity in your app.

Now, if we look at our code, what we just did is specifying a way for our `RoutineFormComponent` to propagate an event to its parent, `RoutineEditorPageComponent`.

And to catch this event in our parent, we need to do the following:
- bind the output to a method in `RoutineEditorPageComponent`;
- inject the `RoutineEditorPageService` in `RoutineEditorPageComponent`;
- call the service.

In `routine-editor-page.component.html`:

```html
<!-- The output takes the same name as declared in the child component -->
<app-routine-form (formSubmit)="submit($event)"></app-routine-form>
```

**Note:**
The `$event` references what is emitted by the output. In our case, the value of the form.

In `routine-editor-page.component.ts`:

```ts
@Component({
  //...
})
export class RoutineEditorPageComponent implements OnInit {
  private readonly routineEditorPageService = inject(RoutineEditorPageService);
  private readonly router: Router = inject(Router);

  // ...

  submit(formRawValues: RoutineFormGroupValues) {
    // Here, we call our service
    // Then we subscribe to the result
    // If it succeeds, we navigate back to the list
    this.routineEditorPageService.createRoutine(formRawValues).subscribe({
      next: () => this.router.navigate(['/list']),
      error: (err) => console.error('Failed to create routine', err),
    });
  }
}
```

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