<script>
	let counter = 0
</script>

I'm counting ... {counter}
<button
	on:click={() => {
		counter++
	}}>Count up</button
>

<style lang="sass">
    button
        background: green
        color:#FFF
</style>
