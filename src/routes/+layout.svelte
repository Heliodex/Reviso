<script lang="ts">
	import Header from "$lib/Header.svelte"
	import "/src/global.sass"
</script>

<Header />

<div id="bg"></div>

<main>
	<slot />
</main>

<footer>
	sqappq
</footer>

<style lang="sass">
	main
		padding: 3rem 1rem 5rem 1rem
		box-sizing: border-box
		max-width: 60rem
		min-height: 82.5vh
		margin: auto

	footer
		height: 20vh
		width: 100vw
		padding: 1vh

		height: 9rem
		background: #121110
		display: flex
		justify-content: center
		align-items: center
		color: white
		font-size: 1.2rem

	#bg
		position: fixed
		z-index: -99
		top: 0
		left: 0
		width: 100%
		height: 100%
		background: linear-gradient(#000f, #3a1c7122), linear-gradient(90deg, #ffaf7b22, #00f7)
</style>