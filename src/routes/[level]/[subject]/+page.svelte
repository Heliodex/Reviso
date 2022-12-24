<script lang="ts">
	import Katex from "svelte-katex"
	import SvelteMarkdown from "svelte-markdown"
	export let data: any

	function katexify(str: string) {
		if (!str) return ""

		if (str.includes("$$")) return str.replace(/\$\$(.*?)\$\$/g, (_, p1) => {
			return `<Katex displayMode>${p1}</Katex>`
		})

		return str.replace(/\$(.*?)\$/g, (_, p1) => {
			return `<Katex>${p1}</Katex>`
		})


	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossorigin="anonymous" />
	<title>Question • sqappq</title>
</svelte:head>

<h1>Question</h1>
{data.level} {data.subject}
<br />
<br />
{katexify(data.pre)}
<br />

{#each data.c as question}
	<SvelteMarkdown source={katexify(question.q)} />
	<SvelteMarkdown source={katexify(question.post)} />
{/each}

<style lang="sass">
</style>
