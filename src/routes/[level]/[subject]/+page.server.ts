import questions from "$lib/questions.json"

import { error } from "@sveltejs/kit"

/** @type {import("@sveltejs/kit").PageServerLoad} */
export const load = async ({ params }: { params: any }) => {
	params.level = params.level.toUpperCase()
	if (["N4", "N5", "H", "AH"].includes(params.level)) {
		let result = questions.filter(v => v.level == params.level && v.subject == params.subject)
		let randQ = result[Math.floor(Math.random() * result.length)]

		return randQ
	}

	throw error(404, "Not found")
}
