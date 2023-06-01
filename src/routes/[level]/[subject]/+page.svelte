<script lang="ts">
	import { page } from "$app/stores"
	import { invalidateAll } from "$app/navigation"
	import Question from "$lib/Question.svelte"
	import parse from "$lib/parse"

	export let data

	let markScheme = false
</script>

<svelte:head>
	<title>Question • Reviso</title>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.css"
		integrity="sha384-3UiQGuEI4TTMaFmGIZumfRPtfKQ3trwQE2JgosJxCnGmQpL/lJdjpcHkaaFwHlcI"
		crossorigin="anonymous" />
</svelte:head>

<div id="row">
	<h1>Question</h1>
	<div>
		{data.level.toUpperCase()}
		{data.subject}
		{data.year} paper{data.paper ? " " + data.paper : ""}, question {data.qn}
	</div>
</div>

<div id="buttons">
	<a
		class="button"
		href="/{data.level}/{data.subject}?y={data.year}&q={data.qn}">
		Question link
	</a>
	{#if $page.url.searchParams.has("y")}
		<a class="button" href="/{data.level}/{data.subject}">
			New random question
		</a>
	{:else}
		<button
			on:click={() => {
				invalidateAll()
				markScheme = false
			}}>
			New random question
		</button>
	{/if}
	<button
		on:click={() => {
			markScheme = !markScheme
		}}>
		{markScheme ? "Hide" : "Show"} mark scheme / answer
	</button>
</div>

<noscript>
	<p>
		Some of these buttons rely on Javascript to work, which is currently
		disabled or failed to load.
	</p>
</noscript>

{#if data.pre}
	{@html parse(data, data.pre)}
{/if}

{#key data}
	<Question {data} {markScheme} />
{/key}

<style lang="sass">
	#row
		display: flex
		justify-content: space-between
		align-items: center
		div
			margin-left: 1rem
			text-align: right

	#buttons
		display: flex
		justify-content: center
		align-items: center
		flex-wrap: wrap

	noscript p
		margin: auto
		text-align: center
		font-size: 1.5rem
		
	.button, button
		display: flex
		width: fit-content
		text-align: center

		border: none
		margin: 0.2rem 0.2rem
		font-size: 1rem
		cursor: pointer
		text-decoration: none
		color: #fff
		background-color: #444
		padding: 0.5rem 1rem
		border-radius: 9rem
</style>
