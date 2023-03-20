<script>
    import {pokemon} from "../stores/pokestore.js";
    import MonCard from "../components/monCard.svelte";

    let searchTerm = "";
    let filteredPokemon = [];

    $: {
        // console.log(searchTerm);
        if (searchTerm) {
            // search the Pokemon, make sure we set both to lower case so search is case insensitive.
            filteredPokemon = $pokemon.filter(mon => mon.name.toLowerCase().includes(searchTerm.toLowerCase()));
        } else {
            // Copies over all pokemon returned from pokestore into filteredPokemon. This is
            // because we don't want to just show zero results while someone is in the middle of
            // typing a query -- we still want to show them all until this query is matched.
            // 
            // We use the rest operator here `...` to pass in $pokemon as a list of n arguments. 
            // This is just a shorthand way to say we're copying everything in the array over to 
            // this list that we are then assigning to `filteredPokemon`.
            filteredPokemon = [... $pokemon]
        }
    }
</script>
<svelte:head>
    <title>Svelte Kit Pokedex</title>
</svelte:head>
<h1 class="text-4xl text-center my-8 uppercase">Svelte Kit Pokedex</h1>

<input class="w-full rounded-md text-lg p-4 border-2" type="text" bind:value={searchTerm} placeholder="Search Pokemon">

<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
    {#each filteredPokemon as mon}
        <!-- We init each  item in this list as a `mon` and pass it to the
        variable (that's owned by the component?) called `mon_card` where
        it's rendered in that component.-->
        <MonCard mon_card={mon}/>
    <!-- <p>{mon.name}</p> -->
    {/each}
</div>
