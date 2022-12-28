# Reviso

Reviso is a site that provides random SQA past paper questions for revision. It also provides marking schemes and answers for questions. It is available at [reviso.ml](https://reviso.ml/).

At the moment, Reviso only supports a few questions from a few N5 subjects, but more are added regularly.

Reviso is written in [SvelteKit](https://kit.svelte.dev/) and is hosted on [Netlify](https://netlify.com/).

The actual past paper questions are stored in src/lib/questions.yaml. 

## To begin editing the site, you will need

- Latest version of NodeJS installed
- Latest version of npm installed
- A terminal
- A modern web browser

Instructions:

- Clone the repository to your local machine
- Open a terminal and navigate to the directory of the repository
- Run `npm i -g pnpm` to install pnpm.
- Run `pnpm i` to install all dependencies. (You may use your preferred package manager instead if you wish.)

To start a local dev server, run `pnpm run dev` and navigate to the link shown in the terminal. Upon saving a file, your changes will be shown in the web browser.

To build for production, run `pnpm run build`, then `pnpm run preview` (or `pnpm run buildview`) to preview the final site.
