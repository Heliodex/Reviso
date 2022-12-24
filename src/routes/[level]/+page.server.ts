import questions from "$lib/questions.json"
import { error } from "@sveltejs/kit"

/** @type {import("@sveltejs/kit").PageServerLoad} */
export const load = async ({ params }) => {
	if (["n5", "h", "ah"].includes(params.level)) {
		let result = questions.filter(v => v.level == params.level)

		let subjects: string[] = []
		for (let i of result) {
			if (!subjects.includes(i.subject)) subjects.push(i.subject)
		}

		return { subjects }
	}

	throw error(404, "Not found")
}
