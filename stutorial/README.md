# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## User Management
We create the form in Svelte using the routes:
/login
|__ /photo
|__ /username

 We also use DaisyUI to make some of those presets such as `card-body`.

 Any child pages will be rendered inside of that card since we define it in the more top-level
 /routes/+layouts.svelte.

 We create a stepper (one of those things that show multiple steps in say a login page
 and tells us what step we're on) in the /login/+layout.svelte file.

 This file contains a layout at the top we use for the stepper along with a slot
 to encapuslate any other components for the child pages below later.

 The stepper uses a stepper component from Daisy UI which is just a `steps` class in a 
`<ul>` (unordered list) that contains `<a>` entries. Each `<a>` entry has an `href` to the
step that we are currently on and a `step` class. Daisy UI [link on stepper](https://daisyui.com/components/steps/)

The way we track which step we're on is by using Svelte stores. We import a simple store
called page via:
```
import { page } from "$app/stores";
```
within the initial `<script>` tag at the top of the file.

To precisely see what step we're on, for each `<a>` entry we have in the list we also
have a method that selects the "primary" step based on the current URL path. 
`$page.route.id?` uses the `?` operator to handle the case where the value is null. The 
match then simply checks to make sure that the route path has either `username` or `photo`
in it.

We can define transitions in Svelte using the transition module. We create a transition in
`/src/lib/components/AnimatedRoute.svelte` where we import the `fly` transition with
```
import { fly } from "svelte/transitions";
```

We create a `<div>` that uses the transition that makes the component "fly" in from x=-100
(meaning it comes from the left side of the screen) that lasts for 500ms.

We can also create an "out" animation for when the `<div>` is destroyed, but we won't be
using that here.

Svelte also has a mechanism called `key` that rebuilds all children encapsulated by it when
Svelte detects a change in the store. It's especially useful for applying animations.

Here we use the `key` to detect whenever there is a change in the URL which will then cause
the animation we defined here to run.

I was having an issue also where the steps component at the top would have the top layer
of pixels cut off. I resolved this by adding some padding to the component by simply adding
`p-1` to add 1 px of padding to the `steps` class. Apparently I can do this directionally
or also just with margins.

```
Tailwind also provides utilities for adding padding to specific sides of an element, such as pt-2 for top padding, pb-2 for bottom padding, pl-2 for left padding, and pr-2 for right padding
```

```
Tailwind also provides utilities for adding margin to specific sides of an element, such as mt-2 for top margin, mb-2 for bottom margin, ml-2 for left margin, and mr-2 for right margin daisyui.com.
```

### Authentication
Our logic currently lives in src/routes/login/+page.svelte, but technically we can probably
break this out into its own src/lib/component/... to handle more complex login logic.

We import some of the Firebase SDK stuffs given to us and imported in src/lib/firebase.ts
and add a button that class a sign on method that returns a JWT on that button's on-click
event.

The actual auth stuff that issues the JWT is in src/lib/firebase.ts. Here we use Svelte 
stores to let Svelte know who is currently logged in or not. This is a breakdown of what
goes on from GPT:

```
- It imports the writable function from the svelte/store module.
- It uses the writable function to create a writable store.
- The initial value of the store is set to auth?.currentUser ?? null. This is a conditional expression that checks if auth.currentUser is truthy. If it is, the value of the store will be auth.currentUser. Otherwise, the value will be null.
- The second argument of the writable function is a callback function that is executed when a subscriber subscribes to the store. Inside this callback function, it calls the onAuthStateChanged function with auth and a callback function as arguments.
- The onAuthStateChanged function is likely from a Firebase authentication library. It is used to listen for changes in the authentication state. When the authentication state changes, the callback function is called with the user object.
- Inside the callback function of onAuthStateChanged, it calls the set function provided by the writable store and passes the user object as the new value of the store.
- Finally, the function returns an object with a subscribe property that references the subscribe method of the writable store.

In summary, this userStore function creates a writable store that is initialized with the current user from the auth object. It listens for changes in the authentication state and updates the store value accordingly. Other parts of the application can subscribe to this store to get the latest user information codechips.me.
```

We also utilize another `unsubscribe` void function to only subscribe to the Auth state
only when it is used.

At the beginning we also check that `getAuth()` from Firestore is not `null` and also
that we are in a browser by getting the condition from `globalThis.window`. `globalThis` is
a global object that lets us view global scope regardless of what env the our Javascript
is running in. Checking the `window` property ensures that the code runs in a browser, 
otherwise if running in Node.js from the server-side that object would not evaluate to 
true.

Reactive declarations allow us to write "reactive" code in our HTML and JS. This can be
useful for things like form validation. They are usually created with a `$: <stuff>`


### Simple Data Fetching
simple example:
```
export const userData = writable<any>(null);

user.subscribe((user) => {

  if (user) {
    const docRef = doc(db, `users/${user.uid}`);
    onSnapshot(docRef, (snapshot) => {
      userData.set(snapshot.data());
    });
  } 
});
```

When subscribing to a store, it only triggers a document read once in Firestore, so it
usually is good to define these in your top-level +layout.svelte files as we do in
src/routes/+layout.svelte if we use the data globally.