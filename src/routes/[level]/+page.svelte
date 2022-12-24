<script lang="ts">
	import { page } from "$app/stores"
	export let data: any
</script>

<svelte:head>
	<title>Subjects • sqappq</title>
</svelte:head>

<h1>Subjects</h1>

<div id="grid">
	{#each data.subjects as subject}
		<a href="{$page.url.pathname}/{subject}">{subject}</a>
	{/each}
</div>

<style lang="sass">
	#grid
		display: grid
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))
		a
			text-decoration: none
			text-align: center
			font-size: 1.5rem
			color: white
			background: #333
			padding: 1rem
			margin: 0.5rem
			border-radius: 0.5rem
</style>