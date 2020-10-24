---
layout: post
title:  "Debounce and Throttle"
date:   2020-08-04 23:15:11 +0200
categories: [javascript]
---

### The problem
Recently, a student of mine was facing a performance challenge: he had a treatment to trigger when the user would resize the browser window.

What he first did was something like this:

```js
function treatment() {
  if (window.innerWidth >= 1000) {
    // do some stuff
  }
}

window.onresize = treatment;
```

He then noticed the `treatment` function was being executed for every tiny resizing the user would make, causing slow performances. According to this, he wanted to find a better solution: he actually wanted to trigger the treatment *only for a given screen size*.

So, he put some `if` conditions.
It was a good step: the treatment would only be executed when the screen size would meet the condition.
But it was not enough: what if, there was a way to reduce drastically the number of executions, and still have the treatment done properly?

### Debounce and Throttle

Debounce and Throttle are two **operators** you can find in some libraries. You can, also, implement them by yourself.
They anwser to a need for performance, by reducing the trigger count of a function.

Throttle allows you to execute a function **only** if a certain **amount of time** has passed **since the last execution**.
Let's say we have a *throttled* function:

```js
function displayName(name) {
  console.log(`Name is ${name}`);
}

// We want the execution to be done at least 1s after the last execution
const throttled = throttle((name) => displayName(name), 1000);
throttled('Thomas'); // will execute displayName and display 'Thomas'
setTimeout(() => throttled('Bastien'), 1500); // will execute displayName and display 'Bastien'
throttled('Antoine'); // will not execute displayName
```

That might solve our problem... or not!
This will prevent intempestive executions: but while it does, it might also prevent crucial executions. If the user resize the window *within the time interval*, meet the condition and stop resizing *before a new interval begins*, the treatment will never be triggered.

We cannot risk it.

This is where `debounce` comes in handy.
Debounce **will** execute the function, only it will **reset the interval** everytime the **event is dispatched** and, once the user has finished to do whatever s.he wanted to do, the function will finally be executed.

This guarantee us the function **will be executed** soon or later. The downside, however, is you cannot expect graphic treatments to be executed properly with this operator, as there is literally **a timeout** before the treatment can be done.

Let's take the previous example and change `throttle` for `debounce`:

```js
function displayName(name) {
  console.log(`Name is ${name}`);
}

// We want the execution to be done at least 1s after the last execution
const debounced = debounce((name) => displayName(name), 1000);

debounced('Thomas'); // (1) SHOULD execute displayName and display 'Thomas' AFTER 1s
setTimeout(() => debounced('Bastien'), 1500); // (2) will trigger after 1.5s, execute displayName and display 'Bastien'
debounced('Antoine'); // (3) will cancel (1) and set a new timeout.
```

As we can see, `debounce` allows the `displayName` function to be properly executed.
And so, in our case, we might want something like that:

```js
function treatment() {
  if (window.innerWidth >= 1000) {
    // do some stuff
  }
}

window.onresize = debounce(() => treatment(), 100);
```

### Operators implementation

I found the implementation in the excellent book [Discover Functional JavaScript](https://www.freecodecamp.org/news/discover-functional-programming-in-javascript-with-this-thorough-introduction-a2ad9af2d645/) by [**Cristian Salcescu**](https://twitter.com/cristi_salcescu).

#### Throttle

```js
function throttle(fn, interval) {
  let lastTime;
  return (...args) => {
    if(!lastTime || ((Date.now() - lastTime) >= interval)) {
      fn(...args);
      lastTime = Date.now();
    }
  }
}
```

#### Debounce

```js
function debounce(fn, wait) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  }
}
```
