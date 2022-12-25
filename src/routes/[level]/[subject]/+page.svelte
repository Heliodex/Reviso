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

		let txt3 = bits.join("").replace(/~(\d)/g, `<a class="img" href="/${data.level}/${data.subject}/${data.year}/${data.qn}-$1.svg" target="_blank"  rel="noreferrer"><img src="/${data.level}/${data.subject}/${data.year}/${data.qn}-$1.svg" /></a>`).replace(/~/g, `<a class="img"  href="/${data.level}/${data.subject}/${data.year}/${data.qn}.svg" target="_blank"  rel="noreferrer"><img src="/${data.level}/${data.subject}/${data.year}/${data.qn}.svg" /></a>`)

		return txt3
	}

	let markScheme = false
</script>

<svelte:head>
	<title>Question • sqappq</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossorigin="anonymous" />
</svelte:head>
<div class="row">
	<h1>Question</h1>
	<div>
		{data.level.toUpperCase()}
		{data.subject}
		{data.year} paper, question {data.qn}
	</div>
</div>

{#if data.pre}
	{@html parse(data.pre)}
{/if}

{#if data.c.length > 1}
	<ol type="a">
		{#each data.c as question}
			<li>
				{@html parse(question.q)}
				{#if question.post}
					{@html parse(question.post)}
				{/if}
				<p class="marks">
					{question.marks}
					{question.marks == 1 ? "mark" : "marks"}
				</p>
				{#if markScheme}
					<img src="/{data.level}/{data.subject}/{data.year}/mi{question.mi}.svg" alt="Mark scheme" />
				{/if}
			</li>
		{/each}
	</ol>
{:else}
	{@html parse(data.c[0].q)}
	{#if data.c[0].post}
		{@html parse(data.c[0].post)}
	{/if}
	<p class="marks">
		{data.c[0].marks}
		{data.c[0].marks == 1 ? "mark" : "marks"}
	</p>
	{#if markScheme}
		<img class="" src="/{data.level}/{data.subject}/{data.year}/mi{data.c[0].mi}.svg" alt="Mark scheme" />
	{/if}
{/if}

<div class="row">
	<a class="button" href="/{data.level}/{data.subject}?y={data.year}&q={data.qn}">Question link</a>
	<button
		on:click={() => {
			markScheme = !markScheme
		}}>{markScheme ? "Hide" : "Show"} mark schemes</button
	>
</div>

<style lang="sass">
	:global(img)
		filter: invert(1)

	:global(.img)
		display: block
		width: fit-content
		margin: 3rem auto

	.row
		display: flex
		justify-content: space-between
		align-items: center

	button
		border: none
		font-size: 1rem
		cursor: pointer

	.button, button
		text-decoration: none
		color: #fff
		background-color: #444
		padding: 0.5rem 1rem
		border-radius: 0.5rem

	.marks
		text-align: right
		color: #5f5
</style>
