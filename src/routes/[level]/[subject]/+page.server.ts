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

export const load = async ({ params, url, setHeaders }) => {
	params.level = params.level.toUpperCase()
	if (!["N4", "N5", "H", "AH"].includes(params.level))
		throw error(404, "Not found")

	const result = questions.filter(
		v => v.level == params.level && v.subject == params.subject
	)

	const reqYear = parseInt(url.searchParams.get("y") || "")
	const reqQuestion = parseInt(url.searchParams.get("q") || "")
	if (reqYear && reqQuestion) {
		const res = result.filter(
			v => v.year == reqYear && v.qn == reqQuestion
		)[0]
		if (res) return res
		throw error(404, "Invalid question!")
	}

	const randQ = result[Math.floor(Math.random() * result.length)]

	setHeaders({
		path: `/${params.level}/${params.subject}?q=${result.indexOf(randQ)}`,
	})

	type x = typeof randQ

	return randQ
}
