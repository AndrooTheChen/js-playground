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