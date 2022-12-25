<script lang="ts">
	import { math, display } from "mathlifier"
	import { marked } from "marked"

	export let data: any

	function parse(txt: string) {
		txt = marked.parse(txt)
		let bits: string[] = []

		let txt2 = txt.split(/(\${1,2})/g)
		// For every two strings in this array, combine them together:
		for (let i = 1; i < txt2.length; i += 2) {
			txt2[i] = txt2[i] + (txt2[i + 1] || "") + (txt2[i + 2] || "")
			txt2.splice(i + 1, 2)
		}
		txt2 = txt2.filter(x => !(x == "$$" || x == "$"))

		for (let i = 0; i < txt2.length; i++) {
			if (txt2[i].startsWith("$$")) bits.push(display(txt2[i].slice(2, -2)))
			else if (txt2[i].startsWith("$")) bits.push(math(txt2[i].slice(1, -1)))
			else bits.push(txt2[i])
		}

		let txt3 = bits.join("").replace(/~(\d)/g, `<a href="/figs/n5/maths1/2022/${data.qn}-$1.svg" target="_blank"><img src="/figs/n5/maths1/2022/${data.qn}-$1.svg" /></a>`).replace(/~/g, `<a href="/figs/n5/maths1/2022/${data.qn}.svg" target="_blank"><img src="/figs/n5/maths1/2022/${data.qn}.svg" /></a>`)

		return txt3
	}
</script>

<svelte:head>
	<title>Question • sqappq</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossorigin="anonymous" />
</svelte:head>

<h1>Question</h1>
<div>
	{data.level.toUpperCase()}
</div>

{#if data.pre}
	{@html parse(data.pre)}
	<br />
{/if}

{#each data.c as question}
	{@html parse(question.q)}
	<br />
	{#if question.post}
		{@html parse(question.post)}
		<br />
	{/if}
{/each}

<style lang="sass">
	:global(img)
		margin-top: 3rem
		filter: invert(1)

	:global(a)
		display: block
		width: fit-content
		margin: auto
</style>
