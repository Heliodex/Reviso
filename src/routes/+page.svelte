<svelte:head>
	<title>Home • sqappq</title>
</svelte:head>

<h1>Levels</h1>

<div id="grid">
	<a href="/N5">N5</a>
</div>

<style lang="sass">
	#grid
		display: grid
		grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr))
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