<script>
    import {pokemon} from "../stores/pokestore.js";
    import MonCard from "../components/monCard.svelte";
</script>
<svelte:head>
    <title>Svelte Kit Pokedex</title>
</svelte:head>
<h1 class="text-4xl text-center my-8 uppercase">Svelte Kit Pokedex</h1>

{#each $pokemon as mon}
    <MonCard mon={pokemon}/>
<!-- <p>{mon.name}</p> -->
{/each}