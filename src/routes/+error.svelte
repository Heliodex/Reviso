<script lang="ts">
	import { page } from "$app/stores"
</script>

<svelte:head>
	<title>Error {$page.status} • sqappq</title>
</svelte:head>

<div id="container">
	<h1>
		Error {$page.status}
	</h1>
	<br />
	{$page.error?.message}
</div>

<style lang="sass">
	h1
		margin: 0
	div
		margin: 15vh auto
		display: flex
		width: fit-content
		flex-direction: column
		align-items: center
		padding: 2rem
		border-radius: 1rem
		background: #333
</style>
