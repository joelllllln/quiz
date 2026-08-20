/* Quickfire cards — the tools around the code: the shell, git, environments, and
   the file formats you have to move data through. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var SH = 'Tooling · the command line';
  var GIT = 'Tooling · git';
  var ENV = 'Tooling · environments & packages';
  var FMT = 'Tooling · files, JSON & dates';

  window.SNIPPETS.push(

    /* ---- the command line ---- */
    { id: 'sh-run-script', group: SH, lvl: 1,
      ask: 'Run the script clean.py from the command line',
      a: 'python clean.py',
      note: 'On some machines it is python3. If in doubt, check with python --version.' },

    { id: 'sh-list', group: SH, lvl: 1,
      ask: 'List the files in the current folder, including hidden ones, with details',
      a: 'ls -la',
      note: 'ls on its own is the quick look; -la is the one you actually type.' },

    { id: 'sh-cd', group: SH, lvl: 1,
      ask: 'Move into the folder data from the shell',
      a: 'cd data',
      note: 'cd .. goes up one, cd - goes back to where you were.' },

    { id: 'sh-pwd', group: SH, lvl: 1,
      ask: 'Print which folder the shell is currently in',
      a: 'pwd',
      note: 'The first thing to check when a "file not found" makes no sense.' },

    { id: 'sh-head-file', group: SH, lvl: 2,
      ask: 'Show the first 5 lines of sales.csv without opening it',
      a: 'head -5 sales.csv',
      note: 'The fastest way to see a file\'s header and separator before pandas touches it.' },

    { id: 'sh-wc', group: SH, lvl: 2,
      ask: 'Count how many lines sales.csv has',
      a: 'wc -l sales.csv',
      note: 'One more than the row count if the file has a header.' },

    { id: 'sh-grep', group: SH, lvl: 2,
      ask: 'Find every line in app.log containing the word ERROR',
      a: 'grep ERROR app.log',
      note: 'grep -c to count them, grep -i to ignore case, grep -r to search a whole folder.' },

    { id: 'sh-redirect', group: SH, lvl: 2,
      ask: 'Send the output of a script into the file out.txt',
      a: 'python clean.py > out.txt',
      note: '> overwrites, >> appends, 2> catches the error stream.' },

    { id: 'sh-pipe', group: SH, lvl: 3,
      ask: 'Count the lines in app.log that mention ERROR, in one command',
      a: 'grep ERROR app.log | wc -l',
      note: 'The pipe feeds one command\'s output into the next — the whole idea of the shell.' },

    { id: 'sh-args', group: SH, lvl: 3,
      ask: 'Read the first argument passed to your script from the command line',
      a: 'sys.argv[1]',
      note: 'argv[0] is the script name itself. For anything more, use argparse.' },

    { id: 'sh-argparse', group: SH, lvl: 3,
      ask: 'Import the standard library tool for proper command line options',
      a: 'import argparse',
      note: 'Gives you --flags, help text and type checking for about five lines of setup.' },

    { id: 'sh-main-guard', group: SH, lvl: 2,
      ask: 'Write the guard that runs main() only when the file is run directly',
      a: "if __name__ == '__main__':\n    main()",
      note: 'Without it, importing your script would run it. Every professional script has this line.' },

    { id: 'sh-env-var', group: SH, lvl: 3,
      ask: 'Read the environment variable API_KEY inside Python, with no default',
      a: "os.environ['API_KEY']",
      alts: ["os.getenv('API_KEY')"],
      note: 'Secrets live in the environment, never in the code you commit.' },

    /* ---- git ---- */
    { id: 'git-status', group: GIT, lvl: 1,
      ask: 'See which files you have changed',
      a: 'git status',
      note: 'The command to run before and after everything else.' },

    { id: 'git-add-all', group: GIT, lvl: 1,
      ask: 'Stage every change in the folder ready to commit',
      a: 'git add .',
      note: 'Check git status first — "." also stages files you did not mean to include.' },

    { id: 'git-commit-m', group: GIT, lvl: 1,
      ask: 'Commit the staged changes with the message "clean the sales data"',
      a: "git commit -m 'clean the sales data'",
      note: 'Write what changed and why, in the present tense.' },

    { id: 'git-push', group: GIT, lvl: 1,
      ask: 'Send your commits up to the remote',
      a: 'git push',
      note: 'The first push of a new branch needs git push -u origin branch-name.' },

    { id: 'git-pull', group: GIT, lvl: 1,
      ask: 'Bring down everybody else\'s commits',
      a: 'git pull',
      note: 'Pull before you start work; it saves most merge pain.' },

    { id: 'git-branch-new', group: GIT, lvl: 2,
      ask: 'Make a branch called feature-x and move onto it in one command',
      a: 'git checkout -b feature-x',
      alts: ['git switch -c feature-x'],
      note: 'switch is the newer, clearer spelling; checkout -b is what most people still type.' },

    { id: 'git-log-short', group: GIT, lvl: 2,
      ask: 'See the commit history one line per commit',
      a: 'git log --oneline',
      note: 'Add --graph to see how the branches joined up.' },

    { id: 'git-diff', group: GIT, lvl: 2,
      ask: 'See exactly what you changed but have not staged yet',
      a: 'git diff',
      note: 'git diff --staged shows what you HAVE staged. Read it before every commit.' },

    { id: 'git-discard-file', group: GIT, lvl: 3,
      ask: 'Throw away your uncommitted changes to notes.md',
      a: 'git checkout -- notes.md',
      alts: ['git restore notes.md'],
      note: 'There is no undo for this one — the changes are gone.' },

    { id: 'git-unstage', group: GIT, lvl: 3,
      ask: 'Take notes.md back out of the staging area, keeping the edits',
      a: 'git restore --staged notes.md',
      note: 'The older spelling is git reset HEAD notes.md.' },

    { id: 'git-clone', group: GIT, lvl: 1,
      ask: 'Copy the repository at `url` onto your machine',
      a: 'git clone url',
      note: 'It arrives as a folder, already a git repository, already pointing at the remote.' },

    { id: 'git-ignore', group: GIT, lvl: 2,
      ask: 'Name the file that lists what git should never track',
      a: '.gitignore',
      note: 'Data files, notebooks\' checkpoints, .env, and anything with a credential in it.' },

    { id: 'git-merge-main', group: GIT, lvl: 3,
      ask: 'Bring the latest main into the branch you are on',
      a: 'git merge main',
      note: 'Do this often on a long branch: small conflicts beat one enormous one.' },

    /* ---- environments & packages ---- */
    { id: 'env-venv-activate', group: ENV, lvl: 2,
      ask: 'Activate the .venv environment on Mac or Linux',
      a: 'source .venv/bin/activate',
      note: 'On Windows it is .venv\\Scripts\\activate. The prompt changes when it worked.' },

    { id: 'env-pip-install', group: ENV, lvl: 1,
      ask: 'Install pandas with pip',
      a: 'pip install pandas',
      note: 'Inside a notebook, %pip install pandas installs into the kernel actually running.' },

    { id: 'env-pip-freeze', group: ENV, lvl: 2,
      ask: 'Write your exact installed versions into requirements.txt',
      a: 'pip freeze > requirements.txt',
      note: 'This file is what makes your work reproducible on someone else\'s machine.' },

    { id: 'env-pip-restore', group: ENV, lvl: 2,
      ask: 'Install everything listed in requirements.txt',
      a: 'pip install -r requirements.txt',
      note: 'The other half of the pair. Commit the file, never the environment folder.' },

    { id: 'env-which-python', group: ENV, lvl: 3,
      ask: 'Find out which Python executable is actually running your code',
      a: 'sys.executable',
      note: 'Solves the classic "but I installed it!" — you installed it into a different interpreter.' },

    { id: 'env-conda-create', group: ENV, lvl: 3,
      ask: 'Create a conda environment called ds running Python 3.11',
      a: 'conda create -n ds python=3.11',
      note: 'conda activate ds afterwards. Conda handles non-Python dependencies that pip cannot.' },

    /* ---- files, JSON & dates ---- */
    { id: 'fm-json-import', group: FMT, lvl: 1,
      ask: 'Import the module for reading and writing JSON',
      a: 'import json',
      note: 'The standard exchange format for anything that came from an API.' },

    { id: 'fm-json-loads', group: FMT, lvl: 2,
      ask: 'Turn the JSON string `raw` into Python objects',
      a: 'json.loads(raw)',
      note: 'loads is from a STRING; load is from an open FILE. The s is the only difference.' },

    { id: 'fm-json-load-file', group: FMT, lvl: 2,
      ask: 'Read the JSON file at "config.json" into a dict',
      a: "with open('config.json') as f:\n    config = json.load(f)",
      note: 'The with block closes the file for you even if the parse fails.' },

    { id: 'fm-json-dumps', group: FMT, lvl: 2,
      ask: 'Turn the dict `config` into a nicely indented JSON string',
      a: 'json.dumps(config, indent=2)',
      note: 'indent makes it readable and diff-able; leave it off for compact machine output.' },

    { id: 'fm-json-write', group: FMT, lvl: 3,
      ask: 'Write the dict `config` out to "config.json"',
      a: "with open('config.json', 'w') as f:\n    json.dump(config, f)",
      note: "'w' overwrites. Use 'a' to append, and always open through a with block." },

    { id: 'fm-csv-module', group: FMT, lvl: 3,
      ask: 'Read "sales.csv" row by row as dicts, without pandas',
      a: "with open('sales.csv') as f:\n    rows = list(csv.DictReader(f))",
      note: 'Coding tests often ban pandas. DictReader uses the header as the keys.' },

    { id: 'fm-path-exists', group: FMT, lvl: 2,
      ask: 'Check whether the file at `path` exists before reading it',
      a: 'Path(path).exists()',
      note: 'Or wrap the read in try/except FileNotFoundError — often the tidier choice.' },

    { id: 'fm-strptime', group: FMT, lvl: 3,
      ask: 'Parse the text "2024-05-01" into a datetime',
      a: "datetime.strptime('2024-05-01', '%Y-%m-%d')",
      note: 'strPtime PARSES text; strFtime FORMATS a datetime. The p and the f are the memory hook.' },

    { id: 'fm-strftime', group: FMT, lvl: 3,
      ask: 'Format the datetime `dt` as day/month/year text',
      a: "dt.strftime('%d/%m/%Y')",
      note: '%Y is the four-digit year, %m the month number, %d the day, %H:%M the time.' },

    { id: 'fm-timedelta', group: FMT, lvl: 2,
      ask: 'Import the class that represents a length of time, and get the date 7 days from now',
      a: 'from datetime import timedelta\ndatetime.now() + timedelta(days=7)',
      note: 'Subtracting two datetimes gives a timedelta; .days and .total_seconds() get the number out.' },

    { id: 'fm-iso', group: FMT, lvl: 3,
      ask: 'Turn the datetime `dt` into the standard ISO text form',
      a: 'dt.isoformat()',
      note: 'The format to store and exchange dates in: unambiguous, sortable as text.' }
  );
})();
