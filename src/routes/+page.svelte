<svelte:head>
	<title>Home • Reviso</title>
</svelte:head>

<h1>Levels</h1>

<div id="grid">
	<a href="/N5">N5</a>
</div>

<h1>About</h1>

<p>
	Reviso is a site that provides random SQA past paper questions for revision.
	It also provides marking schemes and answers for questions.
	<br />
	<br />
	At the moment, Reviso only supports a few questions from a few N5 subjects, but
	more are added regularly.
	<br />
	<br />
	Pick a level and subject and a question can be shown, reload the page to get
	a different question. If you want to keep the question or send the link to someone,
	you can use the "Question link" button at the bottom of the page.
	<br />
	<br />
	<br />
	The
	<a
		href="https://dynamicmaths.co.uk/QuestionBank/"
		target="_blank"
		rel="noopener noreferrer">
		Dynamic Maths Question Bank
	</a>
	is also a similarly great site for revision, but focusses only on mathematics.
	<br />
	<br />
	Reviso is open-source and its code is public domain.
	<a
		href="https://github.com/Heliodex/Reviso"
		target="_blank"
		rel="noopener noreferrer">
		See the source code!
	</a>
</p>

<style lang="sass">
	p
		text-align: justify
		max-width: 50rem
	#grid
		display: grid
		grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr))
		a
			text-decoration: none
			text-align: center
			font-size: 1.5rem
			color: white
			background: #333
			padding: 1rem
			margin: 0.5rem
			border-radius: 1rem
</style>
