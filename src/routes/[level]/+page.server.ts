import YAML from "yamljs"
import questionsRaw from "$lib/questions.yaml?raw"
import { error } from "@sveltejs/kit"

const questions = YAML.parse(questionsRaw)

export const load = async ({ params }) => {
	params.level = params.level.toUpperCase()
	if (["N4", "N5", "H", "AH"].includes(params.level)) {
		let result = questions.filter((v: any) => v.level == params.level)

		let subjects: string[] = []
		for (let i of result)
			if (!subjects.includes(i.subject)) subjects.push(i.subject)

		subjects.sort()

		return { subjects }
	}

	throw error(404, "Not found")
}
