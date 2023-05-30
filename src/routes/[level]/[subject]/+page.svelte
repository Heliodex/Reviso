<script lang="ts">
	import { math, display } from "mathlifier"
	import { marked } from "marked"
	import { page } from "$app/stores"
	import { invalidateAll } from "$app/navigation"
	import Question from "$lib/Question.svelte"

	export let data: any

	function parse(txt: string) {
		txt = marked.parse(txt, {
			mangle: false,
			headerIds: false,
		})
		let bits: string[] = []

		let txt2 = txt.split(/(\${1,2})/g)
		// For every two strings in this array, combine them together:
		for (let i = 1; i < txt2.length; i += 2) {
			txt2[i] = txt2[i] + (txt2[i + 1] || "") + (txt2[i + 2] || "")
			txt2.splice(i + 1, 2)
		}
		txt2 = txt2.filter(x => !(x == "$$" || x == "$"))

		for (let i = 0; i < txt2.length; i++)
			if (txt2[i].startsWith("$$"))
				bits.push(display(txt2[i].slice(2, -2)))
			else if (txt2[i].startsWith("$"))
				bits.push(math(txt2[i].slice(1, -1)))
			else bits.push(txt2[i])

		let txt3 = bits
			.join("")
			.replace(
				/~(\d)/g,
				`<a href="/${data.level}/${data.subject}/${data.year}/${data.qn}-$1.svg" target="_blank"  rel="noreferrer"><img src="/${data.level}/${data.subject}/${data.year}/${data.qn}-$1.svg" /></a>`
			)
			// .replace(/¬(\d)/g, `<a href="/${data.level}/${data.subject}/${data.year}/${data.qn}-$1.jpg" target="_blank"  rel="noreferrer"><img src="/${data.level}/${data.subject}/${data.year}/${data.qn}-$1.jpg" /></a>`)
			.replace(
				/~/g,
				`<a href="/${data.level}/${data.subject}/${data.year}/${data.qn}.svg" target="_blank"  rel="noreferrer"><img src="/${data.level}/${data.subject}/${data.year}/${data.qn}.svg" /></a>`
			)
			.replace(
				/¬/g,
				`<a class="img2" href="/${data.level}/${data.subject}/${data.year}/${data.qn}.jpg" target="_blank"  rel="noreferrer"><img class="img2" src="/${data.level}/${data.subject}/${data.year}/${data.qn}.jpg" /></a>`
			)

		return txt3
	}

	let markScheme = false
</script>

<svelte:head>
	<title>Question • Reviso</title>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css"
		integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ"
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

{#if data.pre}
	{@html parse(data.pre)}
{/if}

{#if data.c.length > 1}
	<ol type="a">
		{#each data.c as part}
			<li>
				<Question {data} part={part.p} {markScheme} {parse} />
			</li>
		{/each}
	</ol>
{:else}
	<Question {data} part={data.c[0].p} {markScheme} {parse} />
{/if}

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
