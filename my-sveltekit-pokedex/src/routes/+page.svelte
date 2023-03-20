<script>
    import {pokemon} from "../stores/pokestore.js";
    import MonCard from "../components/monCard.svelte";
</script>
<svelte:head>
    <title>Svelte Kit Pokedex</title>
</svelte:head>
<h1 class="text-4xl text-center my-8 uppercase">Svelte Kit Pokedex</h1>

<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
    {#each $pokemon as mon}
        <!-- We init each  item in this list as a `mon` and pass it to the
        variable (that's owned by the component?) called `mon_card` where
        it's rendered in that component.-->
        <MonCard mon_card={mon}/>
    <!-- <p>{mon.name}</p> -->
    {/each}
</div>
