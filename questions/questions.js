// Converts ./questions.yaml to ./src/lib/questions.json

import { parse } from "yaml"
import { readdir, readFile, writeFile } from "fs/promises"

const directories = (await readdir("./questions", { withFileTypes: true }))
	.filter(dir => dir.isDirectory())
	.map(dir => dir.name)

const questions = []

for (const dir of directories) {
	const filenames = (await readdir(`./questions/${dir}`)).filter(file =>
		file.endsWith(".yaml")
	)

	for (const f of filenames) {
		const data = parse(await readFile(`./questions/${dir}/${f}`, "utf8"))

		for (const q of data) {
			q.level = dir
			q.subject = f.slice(0, -5)
		}

		questions.push(...data)
	}
}

await writeFile("./src/lib/questions.json", JSON.stringify(questions))
