<header>
	<div>
		<a id="logo" href="/"> sqappq </a>
		<div class="right">
			<a href="/">Home</a>
			<a href="/about">About</a>
			<a href="/privacy">Privacy</a>
		</div>
	</div>
</header>

<style lang="sass">
	#logo
		visibility: hidden
		width: 0
		font-size: 1.5rem

	header
		z-index: 9
		width: 100%
		font-size: 1.2rem
		height: 3rem
		display: flex
		position: fixed
		top: 0

		background-color: #333231
		backdrop-filter: blur(10px)

		div
			width: 100%
			max-width: 1200px
			margin: auto

			display: flex

			.right
				justify-content: flex-end

			a
				margin: 0 1.5rem
				color: white
				text-decoration: none

	@media screen and (min-width: 600px)
		#logo
			width: auto
			margin: 0
			padding: 0
			visibility: visible
			margin-left: 3rem
</style>
