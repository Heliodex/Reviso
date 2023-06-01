<script lang="ts">
	import parse from "$lib/parse"

	export let data: {
		level: string
		subject: string
		year: number
	}

	export let part: {
		q: string
		post?: string
		marks: number
		mi?: number
		answer?: string
	}

	export let markScheme = false
</script>

{@html parse(data, part.q)}
{@html parse(data, part.post || "")}

<p class="marks">
	{part.marks}
	{part.marks == 1 ? "mark" : "marks"}
</p>

{#if markScheme}
	{#if part.answer}
		<h3>
			Answer: {part.answer}
		</h3>
	{:else}
		<img
			class="markScheme"
			src="/{data.level}/{data.subject}/{data.year}/mi{part.mi}.svg"
			alt="Mark scheme" />
	{/if}
{/if}

<style lang="sass">
	:global(table)
		margin: auto
		margin-top: 2.5rem

	:global(table, th, td)
		border: 1px solid #ccc
		border-collapse: collapse
		padding: 0.5rem

	:global(img)
		display: block
		margin: 3rem auto
		filter: invert(1)

	:global(.img2) // jpgs that just give a bit of context
		border-radius: 1.5rem
		width: 50%
		min-width: 20rem
		filter: invert(0)

	h3
		text-align: center

	.markScheme
		position: relative
		left: 45%
		max-width: calc(100vw - 1rem)
		transform: translateX(-50%)
		margin: 3rem 1rem

	.marks
		text-align: right
		color: #5f5
</style>
