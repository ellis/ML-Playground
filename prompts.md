How should I run this project. When I use `pnpm build` and then `npx http-server -- .`, I can open the page at http://localhost:8080, but there is very little content. Contrast this to the working website [here](https://ml-playground.com/#).

---

Please use the playwright MCP server to continue investigation. Compare this version to the [original](https://ml-playground.com/).

---

We will iteratively make some changes to the website design.
I am already running `pnpm dev` and `npx http-server . -p 8080`.
Start the Playwright MCP server [here](http://localhost:8080), so we see the same thing.

---

-   Remove the part in the top right where it says fork me on GitHub. It's probably in an image. Remove that whole thing.
-   Remove the feedback button on the bottom right corner.
-   Remove the dialog boxes that pop up initially with a walkthrough (steps 1 thru 7).

---
