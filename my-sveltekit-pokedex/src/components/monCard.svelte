<script>
    /**
	 * @type {{ name: any; }}
	 */
     export let mon_card;
</script>
<a class="list-none p-6 bg-gray-100 text-gray-800 text-center rounded-md 
shadow-sm hover:shadow-md flex flex-col items-center" href={`/pokemon/${mon_card.id}`}>
    <img class= "h-40 w-40" src={mon_card.image} alt={mon_card.name}>
    <h2 class="uppercase text-2xl">{mon_card.id}. {mon_card.name}</h2>
</a>
<!-- <p>
    {mon_card.name}
</p> -->
