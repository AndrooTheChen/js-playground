<script>
    import Nav from "../components/nav.svelte"
    import "../app.css";
</script>
<!-- This adds some padding of 8, sets a max width, then centers all children inside of it-->
<div class="p-8 max -w-6xl mx-auto">
    <Nav />
    <slot></slot>
</div>
