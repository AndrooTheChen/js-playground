<script lang="ts">
    // Fetching data from the server and server svelte files.
    import type { PageData } from './$types';
    
    export let data: PageData;


    // Fetching data from a page store
    import { page } from '$app/stores';
</script>

<h1>{data.title}</h1>
<button>Click me</button>
<p>{data.content}</p>

{$page.data.text}