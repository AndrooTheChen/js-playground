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

We can add the tab header part with `svelte:head` under the `<script>` tags, ex:
```
<svelte:head>
    <title>Svelte Kit Pokedex</title>
</svelte:head>
```

## Components
Create in a different directory from `routes/`, instead do `src/components/`.

We can manually import components one at a time in the `<script>` part of each `.svelte`
file in routes and call the actual component similar to how we do it in React.

## Pokemon API
How did I not know that this existed?? [5]

## Stores
Apparently these are simliar to ContextAPI in React and do some stuff that Redux does I 
think? I'm not really sure I still have no idea what Redux does.

Anywaythese let us share data across the component tree without the need for props drilling
(which is just passing props down multipole layers because React is nice like that /s).

Here we create a set to store all the Pokemon we retrieve from the Pokemon API with
```
import { writable } from 'svelte/store';

export const pokemon = writable([]);
```

And load all the returned data into the `pokemon` Store.

Initially I tried using TS for this project but switched to JS because seeing the interface
required to take in a Pokemon object is kinda disgusting.

Also apparently importing the `fetchPokemon` promise and using the `#each` block from the
Svelte file is not enough to actually call the function. Had to add `fetchPokemon();` write
under the function definition in the pokestore.js file.

## Tailwind CSS
Popular CSS framework. Apparently there's a JIT compiler that's *kinda* new and pretty 
hype.

Installation instructions here [6]. Looks like it was basically just copy/pasting some 
lines of code in the app and some setup in tailwindconfig.cjs, but the config setup was
simplified by some `npm` and `npx` commands in the setup.

So the nice thing about it is that you can define classes inline with many options on a
single line.

```
<h1 class="text-4xl text-center my-8 uppercase">Svelte Kit Pokedex</h1>
```

For example here we can adjust text size with `text-4xl` and we can modify margin with 
`my-8` (this modified y margin, x margin would be `mx-8`). Font sizes have different 
labels from Tailwind [7].

## Making the Pokemon cards (no not the TCG but the CSS cards)
At the top of the file we add an `export let mon` in `<script>` tags to grab the variable
we initialized from the variable we initialized from `src/routes/+page.svelte`

Some CSS props to make the cards look nice:
- `p-6` - padding all around of 6
- `bg-gray-100` - light grey background
- `text-gray-800` - set text to darker gray
- `text-center` - centre the text in the container
- `rounded-md` - round the corners/edges of the container
- `shadow-sm` - add a small shadow effect
- `hover:shadow-md ` - make the shadows bigger (medium) when we hover
- `flex` - display a flex
- `flex-col` - set flex direction as flex column
- `items-center` - center the items in the column

This actually works out to make the pokemon cards look quite pretty. To style them in a
grid nicely though, we need to make a container that wraps around all of the card elements
and this is done with a grid back in our top-level `src/routes/+page.svelte` file.

In the top-level container add a class `grid` with the following props:
- `py-4` - vertical padding of 4
- `gap-4` - have a gap on all 4 sides (top, bottom, left, right)
- `md:grid-cols-2` - if we have medium or bigger screens, we want 2 side-by-side columns
- `grid-cols-1` - otherwise we just have a single grid

We can also upsize the pokemon card images themselves by adding the following class
in the `<img>` tag: `class="h-40 w-40"` -- this adds 40px of padding on hw

Next we also wanna make the text bigger and all caps, we can do that to the header by
adding this class to the `<h2>` tag: `class="uppercase text-2xl"`

## Adding Search feature
We start off with a simple search bar on the home page in `src/+page.svelte` using a
`<input type="text">` 

CSS used for the searchbox:
- `rounded-md` - i guess this is even rounder than the other rounded edges on the cards?
- `w-full` - make this take up the whole width of the page
- NOT PART OF CLASSES, PART OF INPUT, `placeholder=` - placeholder text in the searchbox

### 2-ways binding
We can do 2 way binding by simply using `vind:value={variable}` and sticking that in the
searchbox and apparently that'll handle changes to that `variable` that we initialize
in the `<script>` tag section. This removes the boilerplate from vanillajs of having to
create an EventListener for that variable and updating the rendering component. In this
case we use `searchTerm` as the variable that is 2-way bound. Example:

Svelte:
```
<script>
  let name = 'John';
</script>

<input bind:value={name}>
<p>Hello {name}!</p>
```

VanillaJS:
```
<script>
  let name = 'John';
  const nameInput = document.getElementById('name-input');
  const greeting = document.getElementById('greeting');

  nameInput.value = name;

  nameInput.addEventListener('input', event => {
    name = event.target.value;
    greeting.innerText = `Hello ${name}!`;
  });
</script>

<input type="text" id="name-input">
<p id="greeting"></p>
```

### Reacting to changes
In the `<script>` section we can simply add:
```
$: {
    console.log(variable)
}
```

And this will get run each time there is a change to `variable`. holy frick. This is
apparently similar to a `useEffect()` from React -- not that I really know what that does.

*NOTE: random thing to remember but stores have a `$` in the front, saying this because
I keep forgetting.

## Dynamic SSR routing
Look at this stuff, im too lazy to write rn https://kit.svelte.dev/docs/load

### Fade effect
Small thing, but pretty cool amd quick thing to add just by importing and adding to the
anchor tag field, see `src/components/monCard.svelte` for an example.

[0] https://vitejs.dev/
[1] https://youtu.be/uEJ-Rnm2yOE?t=82
[2] https://kit.svelte.dev/docs/routing
[3] https://kit.svelte.dev/docs/routing#layout-layout-server-js
[4] https://kit.svelte.dev/docs/load
[5] https://pokeapi.co/docs/v2
[6] https://tailwindcss.com/docs/guides/sveltekit
[7] https://tailwindcss.com/docs/font-size
