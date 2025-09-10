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

-   Move the buttons for the two colors and the X into a `div` that is above the drawing area. To the right of the X you can put the button for Deleta All, Upload, and Download. They should all be in one row. If they need the space, they can extend past the drawing area further to the right.
-   button changes:
    -   change "Daten hochladen" to an upload icon
    -   change "Daten speichern" to a download icon
    -   change the "Alles löschen" to the current "X" icon
    -   change the current "X" icon to an erase icon
    -   use emoji utf-8 icons
-   Hide the navbar (with "Spielplatz für maschinelles Lernen") so that it doesn't take up any space, also shows no shadow
-   The algorithm selector on the right with the five algorithms: ensure that it makes space for 3 columns on a normal desktop screen.

-   the "Trainieren" button: make it wider so that the text doesn't extend beyond the right side of the button.

---

-   With the translation into German, a lot of the words have gotten longer and. So now the buttons and some of the other icons don't really look so nice. What would you suggest?

---

(For Gemini)

-   I have a couple translation issues here. Look for the "the good" and "the bad" and "TL;DR" and "Learn more...".
-   In the long explanations of the various algorithms, please adapt the language and content to a 6th-grade level (and keep it German, of course)
