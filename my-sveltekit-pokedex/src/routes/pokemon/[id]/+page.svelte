<script>
    export let data;
    const type = data.mon.types[0].type.name
</script>
<div class="flex flex-col items-center">
    <h1 class="text-4xl text-center my-8 uppercase">{data.mon.name}</h1>
    <p>Type: <strong>{type}</strong> | Height: <strong>{data.mon.height}</strong>
        | Weight: <strong>{data.mon.weight}</strong>
    </p>
    <img class="card-image h-80 w-80" src={data.mon.sprites['front_default']} 
    alt={data.mon.name}/>
</div>
