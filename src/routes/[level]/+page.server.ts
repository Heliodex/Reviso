import YAML from "yamljs"
import questionsRaw from "$lib/questions.yaml?raw"
// import questions from "$lib/questions.json"
import { error } from "@sveltejs/kit"

const questions: {
	level: string
	subject: string
	paper: number
	year: number
	qn: number
	pre?: string
	c: [
		{
			q: string
			post?: string
			marks: number
			mi?: number
			answer?: string
		}
	]
}[] = YAML.parse(questionsRaw)

export const load = async ({ params }) => {
	params.level = params.level.toUpperCase()
	if (!["N4", "N5", "H", "AH"].includes(params.level))
		throw error(404, "Not found")

	const result = questions.filter(v => v.level == params.level)

	const subjects: string[] = []
	for (const i of result)
		if (!subjects.includes(i.subject)) subjects.push(i.subject)

	subjects.sort()

	return { subjects }
}
