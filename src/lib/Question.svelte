<script lang="ts">
	import QuestionPart from "./QuestionPart.svelte"
	import parse from "$lib/parse"

	type Question = {
		pre?: string
		q: string
		post?: string
		marks: number
		mi?: number
		answer?: string
		c?: [Question]
	}

	export let data: {
		level: string
		subject: string
		paper: number
		year: number
		qn: number | string
		pre?: string
		c: [Question]
	}

	export let parts: [Question] = data.c
	export let markScheme = false
	export let depth = 0

	if (typeof data.qn == "string" && /[a-z]$/.test(data.qn)) depth++
</script>

{#if parts.length > 1}
	<ol type={depth == 0 ? "a" : depth == 1 ? "i" : "A"}>
		{#each parts as part}
			<li>
				{#if part.pre}
					{@html parse(data, part.pre)}
				{/if}
				{#if part.q}
					<QuestionPart {data} {part} {markScheme} />
				{:else}
					<svelte:self
						{data}
						parts={part.c}
						{parse}
						{markScheme}
						depth={depth + 1} />
				{/if}
			</li>
		{/each}
	</ol>
{:else if parts[0] && parts[0].q}
	{#if parts[0].q}
		<QuestionPart {data} part={parts[0]} {markScheme} />
	{:else}
		<svelte:self
			{data}
			parts={parts[0].c}
			{parse}
			{markScheme}
			depth={depth + 1} />
	{/if}
{/if}

<style lang="sass">
	:global(li)
		padding: 0.2rem 1rem
</style>
