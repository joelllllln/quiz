# DataSense — a field manual for practical machine learning

Open `index.html` in a browser. No build, no dependencies.

## Course

The spine of the app: one ordered path from *what a variable is* to sitting a timed Python test. Four stages, 40 units, ~285 steps.

- **01 First steps in Python** — printing and naming, types, decisions, loops, lists, text, dicts, functions, errors and tracebacks, comprehensions, files and a first class.
- **02 Working with data** — NumPy, loading a file, selecting, cleaning, grouping, joining, SQL, dates, feature engineering, plotting, statistics, working habits.
- **03 Machine learning** — the four verbs, preparing features, judging a model, improving it, choosing between models, validating properly, metrics beyond accuracy, unsupervised learning, and the six errors scikit-learn actually gives you.
- **04 Sitting a coding test** — how these tests work, counting problems, strings, algorithms under time, debugging, data questions, capstones and timed mocks.

Each unit reads you into the idea, drills the lines until you can type them cold, checks you can predict what Python does, then makes you write something that has to run.

Every drill has a **View** twin beside its **Test**: the cards with their answers showing, the quiz snippets with the output and the reason, a problem walked through with its test cases explained. Viewing never ticks a step off — it is the help, not the test — and each view ends by offering the same set to be tested on.

Nothing is locked — but a single Continue button always knows what comes next, and progress is tracked per step.

## Data Science

Interactive exercises across k-Nearest Neighbours, Logistic Regression, Naive Bayes, Decision Trees, Support Vector Machines, ensembles, clustering, dimensionality reduction, model evaluation and performance optimisation — plus definitions, flashcards, study notes, comparison pages and order-the-steps drills.

Miss a question and you get: the answer in plain English, a hands-on lab (one slider, live measurements, the concept named last), a two-question quick check, then a retake.

## Coding

**Quickfire** — one small ask, one line of code typed from memory: *"how do I check the head of a data source?"* → `df.head()`. Spacing, quote style and a wrapping `print()` are ignored, capitals are flagged rather than failed, and a one-character typo asks you to try again. Rounds are built weakest-first, and the search box doubles as a cheat-sheet. Cards cover pandas, NumPy, plain Python, plotting, scikit-learn, statistics and the working habits around a notebook.

**Practice** — one chronological path of 109 tasks, from `df.head()` to a tuned model. Seventeen numbered stages: first look at the data, selecting and filtering, cleaning, adding columns, grouping, joining and reshaping, dates, charts, honest statistics, getting data ready for a model, then the modelling stages — core workflow, fitting, tuning, evaluating, unsupervised, fixing bugs, and a whole project. Each task is worked in four steps: read the worked example, spot the right code out of lookalikes, build it from blocks (with decoys), then write it out. *Carry on the path* jumps to the first level you have not finished. **Reference** is every model solution, searchable. **Dashboard** is progress.

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
