import YAML from "yamljs"
import questionsRaw from "$lib/questions.yaml?raw"
import { error } from "@sveltejs/kit"

const questions: {
	level: string
	subject: string
	paper: number
	year: number
	qn: number
}[] = YAML.parse(questionsRaw)

export const load = async ({ params, url, setHeaders }) => {
	params.level = params.level.toUpperCase()
	if (["N4", "N5", "H", "AH"].includes(params.level)) {
		let result = questions.filter(
			v => v.level == params.level && v.subject == params.subject
		)

		const reqYear = url.searchParams.get("y")
		const reqQuestion = url.searchParams.get("q")
		if (reqYear && reqQuestion) {
			let res = result.filter(
				(v: any) => v.year == reqYear && v.qn == reqQuestion
			)[0]
			if (res) return res
			throw error(404, "Invalid question!")
		}

		let randQ = result[Math.floor(Math.random() * result.length)]

		setHeaders({
			path: `/${params.level}/${params.subject}?q=${result.indexOf(
				randQ
			)}`,
		})

		return randQ
	}
	throw error(404, "Not found")
}
