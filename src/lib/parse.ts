	import { math, display } from "mathlifier"
	import { marked } from "marked"

export default function(data: any, txt: string) {
	txt = marked.parse(txt, {
		mangle: false,
		headerIds: false,
	})
	let bits: string[] = []

	let txt2 = txt.split(/(\${1,2})/g)
	// For every two strings in this array, combine them together:
	for (let i = 1; i < txt2.length; i += 2) {
		txt2[i] = txt2[i] + (txt2[i + 1] || "") + (txt2[i + 2] || "")
		txt2.splice(i + 1, 2)
	}
	txt2 = txt2.filter(x => !(x == "$$" || x == "$"))

	for (let i = 0; i < txt2.length; i++)
		if (txt2[i].startsWith("$$")) bits.push(display(txt2[i].slice(2, -2)))
		else if (txt2[i].startsWith("$")) bits.push(math(txt2[i].slice(1, -1)))
		else bits.push(txt2[i])

	let txt3 = bits
		.join("")
		.replace(
			/~(\d)/g,
			`<a href="/${data.level}/${data.subject}/${data.year}/${data.qn}-$1.svg" target="_blank"  rel="noreferrer"><img src="/${data.level}/${data.subject}/${data.year}/${data.qn}-$1.svg" /></a>`
		)
		// .replace(/¬(\d)/g, `<a href="/${data.level}/${data.subject}/${data.year}/${data.qn}-$1.jpg" target="_blank"  rel="noreferrer"><img src="/${data.level}/${data.subject}/${data.year}/${data.qn}-$1.jpg" /></a>`)
		.replace(
			/~/g,
			`<a href="/${data.level}/${data.subject}/${data.year}/${data.qn}.svg" target="_blank"  rel="noreferrer"><img src="/${data.level}/${data.subject}/${data.year}/${data.qn}.svg" /></a>`
		)
		.replace(
			/¬/g,
			`<a class="img2" href="/${data.level}/${data.subject}/${data.year}/${data.qn}.jpg" target="_blank"  rel="noreferrer"><img class="img2" src="/${data.level}/${data.subject}/${data.year}/${data.qn}.jpg" /></a>`
		)

	return txt3
}
