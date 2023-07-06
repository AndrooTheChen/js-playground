## Setup
`npm i` to install files and `npm run dev` in order to actually run the project in Node

Vite is the buildtool that bundles all the code and configs for it are contained in 
vite.config.ts.

`tsconfig.json` configures TypeScript

`svelte.config.js` configures Svelte

`static/` is for static assets.

Plugins to look at:
- Thunder Client -> lighweight REST API client for easy testing
- Inline Fold -> fold Tailwind CSS
- Web vitals -> perf testing for website

File type cheatsheet:

__Page__
- +page.svelte main UI for a route.
- +page.ts fetch data for a page, runs on client and server.
- +page.server.ts fetch data for a page, runs on server only.

__Layout__
- +layout.svelte share UI across multiple child routes.
- +layout.ts fetch data for a layout, runs on client and server.
- +layout.server.ts fetch data for a layout, runs on server only.

__Server__
- +server.ts used to build API routes that handle different HTTP verbs and non-HTML response types.

__Error__
- +error.svelte will be rendered if server-side data fetching or rendering fails.

## Data Fetching
+page.svelte only renders on client side, not server-side, and threfore is better for information
-sensitive stuff for the client such as authentication. This is because on server-side bots (such as
for web crawlers) have access to this and we don't want to give the server client auth information
to be scraped.

Again, +page.svelte renders stuff client-side while +page.server.ts loads stuff server side and passes
them to +page.svelte -- this is for more clear client/server isolation. We can get the best of both worlds,
however, with a page.ts file. 

page.ts lets us fetch data from server and subsequently only loads client side data, but after that just
loads client side JS so this is actually quite performant. This only is good for fetching stuff from a 
content management system -- something public. Since it renders both client + server side it's best to
use this for fetching public data due to being more performant, but private stuff should still stay in 
page.server.ts.

Note: +page.ts will be the default data fetcher. If both +page.server.ts and +page.ts exists with a `load()`
function, +page.svelte will default to fetching data from the `load()` function in +page.ts.

We can also use `load()` to handle API requests by passing `request` into the `async` method and also even
access cookies by passing `cookies` into the `async` method.

Actions and Enhance allow for easier backend mutations.

## Navigation
Lots of capabilities we can define to do pre/post or onload navigation stuff, see
https://fireship.io/courses/sveltekit/basics-navigation/

## Rendering and Caching
Sometimes in `load()` functions can be expensive from repetitive calls that provide no new updates, and 
so we can also set headers with a `setHeaders` object in the `load()` function that allows us to set
cache control headers (e.g. `cache-control: max-age=60`.)

## Firebase Stuff
There's the client (Javascript) SDK and also the Admin SDK.

The client SDK allows us to fetch client-side and implements Firestore security rules, but does NOT
let us do server-side auth. This means if we want to fetch data for an auth'd user and render on the
server we can't use this -- yet this shouldn't be too bad because it is primarily just used on the
client side anyway.

Admin SDK lets us do cookie authentication, but can't use client-side data nor can it do realtime data.
We put all the stuff pertaining to this in `src/lib/server/admin.ts`. This tells Svelte to only run this
code in the server.