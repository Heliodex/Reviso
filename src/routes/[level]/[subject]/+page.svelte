<script lang="ts">
	export let data: any
	console.log(data)
</script>

<svelte:head>
	<title>Question • sqappq</title>
</svelte:head>

<h1>Question</h1>

{data.level} {data.subject}
<br />
<br />
{data.pre || ""}
<br />

{#each data.c as question}
	{question.q}
	<br />
	{question.post || ""}
{/each}

<style lang="sass">
</style>