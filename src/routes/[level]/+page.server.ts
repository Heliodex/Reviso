import YAML from "yamljs"
import { error } from "@sveltejs/kit"

const questions = YAML.load("src/lib/questions.yaml")

/** @type {import("@sveltejs/kit").PageServerLoad} */
export const load = async ({ params }: { params: any }) => {
	params.level = params.level.toUpperCase()
	if (["N4", "N5", "H", "AH"].includes(params.level)) {
		let result = questions.filter((v: any) => v.level == params.level)

		let subjects: string[] = []
		for (let i of result) {
			if (!subjects.includes(i.subject)) subjects.push(i.subject)
		}

		return { subjects }
	}

	throw error(404, "Not found")
}
