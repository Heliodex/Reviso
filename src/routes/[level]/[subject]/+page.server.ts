import questions from "$lib/questions.json"
import { error } from "@sveltejs/kit"

/** @type {import("@sveltejs/kit").PageServerLoad} */
export const load = async ({ params }) => {
	if (["n5", "h", "ah"].includes(params.level)) {

		let result = questions.filter(v => v.level == params.level && v.subject == params.subject)
		let randResult = result[Math.floor(Math.random() * result.length)]
		return randResult
	}

	throw error(404, "Not found")
}
