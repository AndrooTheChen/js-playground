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

# Notes
Svelte uses Vite [0] as a frontend build tool that's apparently super fast.

The original directory structure we get is just
```
src/
|\
| - routes/
|   | - +page.svelte
| - app.html
| - app.d.ts
```

Any files listed under the `routes/` directory is automatically served as a new route. Guess this means we don't really need something like react-router-dom?

### CSS modules
Apparently SvelteKit is shipped with CSS modules by default. This makes CSS scoped
so that in each component, defining some CSS will be contained only for that particular 
component. It does this by auto-generating some data to the end of class names to ensure
that they are unique.

### Routing
Okay so routing wasn't as simple as I thought, especially since they updated it. This 
video segment summarizes it perfectly [1] and honestly it makes no sense in the beginning
and isn't super clear to me just from skimming the documentation [2] (i also suck at reading tho)
but the consistency is kinda nice actually.

Okay so seems to work though is inside the routes directory, for each route we will have
another directory and that is the route to the component. Those directories will have
one or some of thes efiles (I think +page is mandatory):
- +page.svelte - component will be server rendered, pulled by client, and hydrated (SSR).
- +error.svelte - custom error page 
- +layout.svelte - pages in svelte are treated as isolated components so this lets us define and use layouts across several components
- +server.svelte - define API routes (holy frick)

Also to run a layout's `load` function in server, apparently it needs to be moved to
`+layout.server.js` [3]

These components can also fetch data by having files like `+page.ts` that `+page.svelte` would read from or `+layout.ts` for `layout.svelte` to read from [4].

Apparently we can mix and match rendering styles by adding a script to the +page.svelte:
```
<script lang="ts">
    export const prerender = true;  // render at build tim
    export const ssr = false;       // disable server rendering
    export const csr = false;       // disable Javascript hydration

</script>
```



[0] https://vitejs.dev/
[1] https://youtu.be/uEJ-Rnm2yOE?t=82
[2] https://kit.svelte.dev/docs/routing
[3] https://kit.svelte.dev/docs/routing#layout-layout-server-js
[4] https://kit.svelte.dev/docs/load
