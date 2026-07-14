# DataSense — working agreement (read this first)

## Delivery (standing instruction from the owner)
- **Do NOT create, update, or publish the Claude "Artifact" for this app.** Do not call the Artifact tool. Do not mention it.
- **Do NOT ask about the artifact or about hosting.**
- After **every** change: commit and push to `claude/repo-reset-6fn869` **and** mirror to `main`, then give the user **only** the live GitHub Pages link to click:

  **https://joelllllln.github.io/quiz/**

  (Pages serves from `main`; it updates a minute or two after the push.)

## Branches
- Develop on `claude/repo-reset-6fn869`; mirror the same commit to `main` (`git branch -f main <branch> && git push origin main`).
- Never include the model identifier in commits/PRs/code.
- Commit trailer:
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`
  `Claude-Session: https://claude.ai/code/session_01XgojpaxFE2hEkUiR3E2XaW`

## App shape (quick orientation)
- Plain HTML/JS, no build step. `index.html` loads `data_*.js` then `app.js`.
- Questions: `{q, choices[5] (choices[0] correct, shuffled at render), explain, simple, widget}`; `window.DEFS[stem]=1` tags a definition.
- Flashcards come from a question's `widget.reveal.name` → to add a flashcard, add a question with a `reveal`.
- Study notes live in `data_notes_*.js` as `window.NOTES[key] = {name, intro, groups:[{h, items:[{t,d,f?}]}]}`.
- Compare pages: `window.COMPARES` in `data_compare.js`. Order-the-steps: `window.ORDERS` in `data_order.js`.
- Extra questions PUSH onto arrays and must load AFTER the base file that ASSIGNS them.

## Testing (no artifact needed)
- Validate data by loading every `data_*.js` in `index.html` script order with a mock `window` (node + `vm`).
- Browser-test against the real file: `file:///home/user/quiz/index.html` (all scripts are relative, so it runs as-is). `datasense.html` bundling is no longer required for delivery.
