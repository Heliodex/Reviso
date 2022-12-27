<script lang="ts">
	export let data: any
	export let part: any
	export let markScheme = false
	export let parse: Function
</script>

{#if part.pre}
	{@html parse(part.pre)}
{/if}

{#if part.c.length > 1}
	<ol type="i">
		{#each part.c as question}
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
					{#if question.answer}
						<h3>
							Answer: {question.answer}
						</h3>
					{:else}
						<img class="markScheme" src="/{data.level}/{data.subject}/{data.year}/mi{question.mi}.svg" alt="Mark scheme" />
					{/if}
				{/if}
			</li>
		{/each}
	</ol>
{:else}
	{@html parse(part.c[0].q)}
	{#if part.c[0].post}
		{@html parse(part.c[0].post)}
	{/if}
	<p class="marks">
		{part.c[0].marks}
		{part.c[0].marks == 1 ? "mark" : "marks"}
	</p>
	{#if markScheme}
		{#if part.c[0].answer}
			<h3>
				Answer: {part.c[0].answer}
			</h3>
		{:else}
			<img class="markScheme" src="/{data.level}/{data.subject}/{data.year}/mi{part.c[0].mi}.svg" alt="Mark scheme" />
		{/if}
	{/if}
{/if}

<style lang="sass">
	:global(img)
		display: block
		margin: 3rem auto
		filter: invert(1)

	:global(table)
		margin: auto
		margin-top: 2.5rem

	:global(table, th, td)
		border: 1px solid #ccc
		border-collapse: collapse
		padding: 0.5rem

	:global(ol)
		list-style-type: upper-alpha

	:global(li)
		padding: 0.2rem 1rem
		
	h3
		text-align: center

	.markScheme
		display: block
		width: 75%
		margin: 3rem auto

	.marks
		text-align: right
		color: #5f5
</style>
