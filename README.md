# DataSense — a field manual for practical machine learning

Open `index.html` in a browser. No build, no dependencies.

## Course

The spine of the app: one ordered path from *what a variable is* to sitting a timed Python test. Four stages, 32 units, ~200 steps. Each unit reads you into the idea, drills the lines until you can type them cold, checks you can predict what Python does, then makes you write something that has to run.

Nothing is locked — but a single Continue button always knows what comes next, and progress is tracked per step.

## Data Science

Interactive exercises across k-Nearest Neighbours, Logistic Regression, Naive Bayes, Decision Trees, Support Vector Machines, ensembles, clustering, dimensionality reduction, model evaluation and performance optimisation — plus definitions, flashcards, study notes, comparison pages and order-the-steps drills.

Miss a question and you get: the answer in plain English, a hands-on lab (one slider, live measurements, the concept named last), a two-question quick check, then a retake.

## Coding

**Quickfire** — one small ask, one line of code typed from memory: *"how do I check the head of a data source?"* → `df.head()`. Spacing, quote style and a wrapping `print()` are ignored, capitals are flagged rather than failed, and a one-character typo asks you to try again. Rounds are built weakest-first, and the search box doubles as a cheat-sheet. Cards cover pandas, NumPy, plain Python, plotting, scikit-learn, statistics and the working habits around a notebook.

**Practice** — each task in four steps: read the worked example, spot the right code, build it from blocks, then write it out. **Reference** is every model solution, searchable. **Dashboard** is progress.

## Python tests

A hiring test rather than a lesson. Your code really runs: CPython is fetched into the browser (Pyodide) the first time you press *Run tests*.

- **Practice** — a brief, a signature, worked examples, an editor and test cases. Failures show the call, what was expected and what you gave back; syntax and runtime errors report your own line number; anything you print is captured.
- **Mock test** — a timed sitting with a countdown, hidden test cases, question navigation and a marked report card at the end. It survives a refresh and can be resumed.
- **Output quiz** — "what does this print?", the multiple-choice section a test opens with.
- **Results** — solved counts, per-group progress and mock history.

With no connection the problems still open and you mark your own answer against the expected results.

## Data files

`index.html` loads `data_*.js` in order, then `app.js`. Question banks push onto arrays, so an extras file must load after the file that assigns them. `build_sw.js` regenerates the service worker's precache list from `index.html` — run it after adding a file.

The coding-test problems and the output-quiz snippets are verified by running them: every model solution must pass its own tests, every starter must fail at least one, and each quiz answer is the snippet's real output.
