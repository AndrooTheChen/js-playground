import type { PageLoad } from './$types';

// Can add this to the page to prerender it at build time to cache it in a CDN.
// Problem is if the page is dynamic, it will be cached and not updated until we rebuild and
// redeploy the site.
// export const prerender = true;

// Disables hydration on the client side. This is useful for pages that are not dynamic and
// don't need to be interactive since we load less Javascript.
// export const csr = false;

export const load = (async () => {
    return {
        title: 'About',
        content: 'This is the about page.',
    };
}) satisfies PageLoad;