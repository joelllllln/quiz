/* The course, stage 02 — the Python you write yourself.
   Everything here sits between "I can write a loop" and "I can clean a dataset":
   your own classes, generators, regex, the standard library, tests and the tools
   around the code. */
(function () {
  window.COURSE = window.COURSE || { stages: [] };

  window.COURSE.stages.push({
    key: 'core', no: '02', name: 'The Python you write yourself',
    blurb: 'Classes, generators, regular expressions, the standard library, tests, the shell and git — the step between "it runs" and "someone else can use it".',
    units: [

      { key: 'c1', name: 'Classes, properly',
        blurb: 'State and behaviour in one place, and the dunder methods that make it feel like Python.',
        needs: 'functions, dicts',
        steps: [
          { t: 'read', title: 'When a dict is not enough', body: [
            'A class bundles **data** and the **behaviour that belongs to it**. You have already met the shape:',
            ['code', "class Account:\n    def __init__(self, owner):\n        self.owner = owner\n        self.balance = 0\n\n    def deposit(self, amount):\n        self.balance += amount\n\n    def __repr__(self):\n        return f'Account({self.owner!r}, {self.balance})'", '`__init__` runs when the object is created. `self` is the object itself and is always the first parameter — you never pass it in.'],
            'The rule of thumb: reach for a class when several pieces of data always travel together AND there are operations that only make sense on them. A row of data on its own is happier as a dict.',
            'One trap worth learning once. A **mutable class attribute is shared by every instance**:',
            ['code', "class Dog:\n    tricks = []        # ONE list, shared by every dog\n\nclass Dog:\n    def __init__(self):\n        self.tricks = []   # a fresh list per dog — what you meant", 'Per-object state belongs in `__init__`. This exact question turns up in interviews.'],
            'The **dunder** (double underscore) methods plug your object into Python\'s own syntax:',
            ['code', "def __repr__(self): ...   # how it prints in a list or a debugger\ndef __eq__(self, other): ...   # what == means\ndef __len__(self): ...    # what len() returns\ndef __getitem__(self, i): ...  # what obj[i] does — and makes it loopable", 'Without `__eq__`, two objects are equal only if they are literally the same object.'],
            'For a class that is mostly data, let the standard library write all of that for you:',
            ['code', "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n\nPoint(1, 2) == Point(1, 2)   # True — __eq__ came free", '`@dataclass` generates `__init__`, `__repr__` and `__eq__` from the annotations.'],
            ['aside', 'Inheritance is worth knowing but rarely worth using in data work. `class Child(Parent):` then `super().__init__(...)` inside the child constructor. If you find yourself three levels deep, a plain function was probably the answer.']
          ] },
          { t: 'quick', title: 'Classes in depth', groups: ['Python · classes in depth'] },
          { t: 'quiz', title: 'How objects really behave', ids: ['pq5-class-attr-shared', 'pq5-class-shadow', 'pq5-repr-default', 'pq5-eq-default', 'pq5-super-call', 'pq5-dataclass-eq'] },
          { t: 'problem', id: 'pt-cls-basket' }
        ] },

      { key: 'c2', name: 'Functions: the traps',
        blurb: 'Default arguments, scope, mutation, and why your change did not stick.',
        needs: 'functions',
        steps: [
          { t: 'read', title: 'Four ways a function surprises you', body: [
            '**One: a default argument is created once.** Not once per call — once, when the function is defined:',
            ['code', "def add(item, bag=[]):     # WRONG\n    bag.append(item)\n    return bag\n\nadd(1)   # [1]\nadd(2)   # [1, 2]  — the same list, still there\n\ndef add(item, bag=None):   # right\n    if bag is None:\n        bag = []\n    bag.append(item)\n    return bag"],
            '**Two: assigning inside a function makes a new local name.** It does not touch the outer one:',
            ['code', "count = 0\n\ndef bump():\n    count = 1    # a NEW local variable\n\nbump()\nprint(count)     # still 0", 'Declaring `global count` would change it, but passing the value in and returning the new one is nearly always the better answer.'],
            '**Three: rebinding a parameter is not mutating it.**',
            ['code', "def wipe(items):\n    items = []       # rebinds the local name only\n\ndef wipe(items):\n    items.clear()    # mutates the caller's list", 'The first leaves the caller\'s list alone; the second empties it. Know which one you are doing.'],
            '**Four: a function with no return gives you None.** Computing a value is not the same as handing it back.',
            'And the one that catches everyone with lambdas — they look their variables up when they are CALLED, not when they are created:',
            ['code', "fns = [lambda: i for i in range(3)]\n[f() for f in fns]        # [2, 2, 2], not [0, 1, 2]\n\nfns = [lambda i=i: i for i in range(3)]\n[f() for f in fns]        # [0, 1, 2] — captured by default argument"],
            ['aside', 'The general rule behind all four: names are labels, not boxes. Assignment moves a label; mutation changes the thing a label points at.']
          ] },
          { t: 'quiz', title: 'Scope and mutation', ids: ['pq5-default-mutable', 'pq5-late-binding', 'pq5-global-rebind', 'pq5-arg-mutation', 'pq5-return-none', 'pq5-kwargs'] },
          { t: 'problem', id: 'pt-fn-no-mutate' }
        ] },

      { key: 'c3', name: 'Generators, and doing it lazily',
        blurb: 'yield, generator expressions, and handling a file bigger than your memory.',
        needs: 'loops, comprehensions',
        steps: [
          { t: 'read', title: 'Values one at a time', body: [
            'A function containing `yield` is a **generator**. Calling it runs none of the body — it hands you an object that produces values on demand:',
            ['code', "def squares(nums):\n    for n in nums:\n        yield n * n\n\ng = squares([1, 2, 3])   # nothing has run yet\nnext(g)                  # 1  — now the first pass runs\nlist(g)                  # [4, 9] — the rest"],
            'The same idea in expression form — round brackets instead of square:',
            ['code', "[n * n for n in nums]    # a list: every value built and stored\n(n * n for n in nums)    # a generator: nothing stored\n\nsum(len(line) for line in lines)   # the brackets can be dropped inside a call", 'Constant memory, and it stops early when whatever consumes it stops.'],
            'That is what makes this possible on a file far larger than your memory:',
            ['code', "def read_lines(path):\n    with open(path) as f:\n        for line in f:\n            yield line.strip()", 'One line is in memory at a time, however big the file is.'],
            'Two things to remember. A generator is **exhausted after one pass** — loop it twice and the second loop sees nothing; call `list(gen)` if you need it again. And you cannot slice one:',
            ['code', "from itertools import islice, chain\n\nislice(gen, 5)             # the first five, lazily\nchain(list_a, list_b)      # walk one then the other\nnext((n for n in nums if n > 100), None)   # first match, or None"],
            ['aside', 'In a coding test, "make this work on a very large input" almost always means: stop building the whole list, and yield instead.']
          ] },
          { t: 'quick', title: 'Iterators and generators', groups: ['Python · iterators & generators'] },
          { t: 'quiz', title: 'Lazy behaviour', ids: ['pq5-gen-lazy', 'pq5-gen-exhausted', 'pq5-zip-shorter', 'pq5-enumerate-start', 'pq5-islice', 'pq5-next-default'] },
          { t: 'problem', id: 'pt-gen-chunks' },
          { t: 'problem', id: 'pt-gen-running-max' }
        ] },

      { key: 'c4', name: 'Regular expressions: the basics',
        blurb: 'search, findall, sub — and the raw string that makes them work.',
        needs: 'strings',
        steps: [
          { t: 'read', title: 'Describing a shape of text', body: [
            'A regex describes a **shape** rather than an exact string: four digits, an @ with something either side, a word at the start of a line. Four functions do almost everything:',
            ['code', "import re\n\nre.search(pat, text)    # first match anywhere, or None\nre.findall(pat, text)   # a list of every match\nre.sub(pat, new, text)  # find and replace\nre.split(pat, text)     # split on a pattern", '`re.match` only looks at the START of the string, and `re.fullmatch` requires the WHOLE string to match. Confusing search with match is the most common mistake there is.'],
            'Always write patterns as **raw strings** so Python leaves the backslashes for the regex engine:',
            ['code', "re.findall(r'\\d+', 'a1 b22')    # ['1', '22']\nre.findall('\\d+', 'a1 b22')     # works by luck; do not rely on it"],
            'A match object carries the pieces:',
            ['code', "m = re.search(r'order (\\d+)', text)\nif m:                 # ALWAYS check — no match gives None\n    m.group()         # 'order 123' — the whole match\n    m.group(1)        # '123'       — the first bracketed group", 'Calling `.group()` on None is the AttributeError you will meet first.'],
            'Two small habits that save a lot of pain: `re.escape(word)` before putting anything a user typed into a pattern, and `re.IGNORECASE` rather than lowercasing the whole document.',
            ['aside', 'A regex is the right tool for pulling structure out of text you did not design. It is the wrong tool for parsing HTML, JSON or CSV — those have proper parsers.']
          ] },
          { t: 'quick', title: 'The regex basics', groups: ['Regex · the basics'] },
          { t: 'quiz', title: 'search, match and sub', ids: ['pq5-re-match-vs-search', 'pq5-re-sub-count'] },
          { t: 'problem', id: 'pt-re-ids' }
        ] },

      { key: 'c5', name: 'Regular expressions: the patterns',
        blurb: 'Classes, quantifiers, anchors, groups, greed — and regex inside pandas.',
        needs: 'the regex basics',
        steps: [
          { t: 'read', title: 'The pieces a pattern is made of', body: [
            'There are only a handful of pieces, and everything else is a combination of them:',
            ['code', "\\d  a digit        \\w  letter, digit or _      \\s  whitespace\n.   any character  [a-z] a class          [^0-9] not a digit\n+   one or more    *   zero or more        ?   optional\n{4} exactly four   {2,4} two to four       {2,} two or more\n^   start          $   end                 \\b  word boundary\n|   either/or      ( )  capture             (?: ) group without capturing"],
            'Put together, they read like a specification:',
            ['code', "r'^\\d+$'            # nothing but digits, start to end\nr'\\bcat\\b'          # the word cat, not concatenate\nr'ORD-\\d{4}\\b'      # ORD- and exactly four digits\nr'(?P<year>\\d{4})'  # a named capture group"],
            '**Greed** is the one behaviour that surprises people. `*` and `+` take as much as they can:',
            ['code', "re.findall(r'<.*>', '<a><b>')    # ['<a><b>']  — greedy\nre.findall(r'<.*?>', '<a><b>')   # ['<a>', '<b>'] — lazy", 'Adding `?` after a quantifier makes it stop at the first opportunity.'],
            'In pandas the same patterns live on `.str`:',
            ['code', "df[df['email'].str.contains(pat, na=False)]\ndf['ref'].str.extract(r'(?P<year>\\d{4})')\ndf['phone'].str.replace(r'\\D', '', regex=True)", '`na=False` stops missing values raising, and since pandas 2.0 `regex=True` must be explicit on `.str.replace`.'],
            ['aside', 'Write the pattern against three real examples and one that must NOT match. A regex that only ever saw matching input is a regex you have not tested.']
          ] },
          { t: 'quick', title: 'Patterns worth knowing', groups: ['Regex · patterns worth knowing'] },
          { t: 'quick', title: 'Regex inside pandas', groups: ['Regex · in pandas'] },
          { t: 'quiz', title: 'Groups, greed and splitting', ids: ['pq5-re-findall-groups', 'pq5-re-greedy', 'pq5-re-split'] },
          { t: 'problem', id: 'pt-re-mask' },
          { t: 'problem', id: 'pt-re-log-levels' }
        ] },

      { key: 'c6', name: 'Files, JSON and dates',
        blurb: 'Reading and writing without pandas, and getting dates right.',
        needs: 'loops, dicts',
        steps: [
          { t: 'read', title: 'Getting data in and out by hand', body: [
            'Coding tests often ban pandas, and plenty of real jobs start before pandas is appropriate. Files open through a `with` block, which closes them even if something goes wrong:',
            ['code', "with open('notes.txt') as f:\n    text = f.read()          # the whole thing\n\nwith open('notes.txt') as f:\n    for line in f:           # one line at a time — any size of file\n        process(line.strip())\n\nwith open('out.txt', 'w') as f:\n    f.write('done\\n')", "Modes: 'r' read (the default), 'w' overwrite, 'a' append."],
            'JSON is how almost everything arrives from an API:',
            ['code', "import json\n\nrecord = json.loads(raw_text)         # from a string\nwith open('config.json') as f:\n    config = json.load(f)             # from a file\n\njson.dumps(config, indent=2)          # back to a string, readable", 'The `s` is the only difference: `loads`/`dumps` for strings, `load`/`dump` for files.'],
            'Dates deserve real date objects, never string slicing:',
            ['code', "from datetime import datetime, timedelta\n\nd = datetime.strptime('2024-05-01', '%Y-%m-%d')   # PARSE text\nd.strftime('%d/%m/%Y')                            # FORMAT it back\nd + timedelta(days=7)                             # a week later\n(later - earlier).days                            # the gap, in days", '`strptime` validates the calendar — it rejects the 30th of February, which `text[:7]` would happily accept.'],
            'And paths, so your code runs on someone else\'s machine:',
            ['code', "from pathlib import Path\n\npath = Path('data') / 'sales.csv'\npath.exists()"],
            ['aside', 'CSV without pandas: `csv.DictReader(f)` gives you one dict per row using the header as keys. It is the answer to at least one question in most test banks.']
          ] },
          { t: 'quick', title: 'Files, JSON and dates', groups: ['Tooling · files, JSON & dates'] },
          { t: 'problem', id: 'pt-json-defaults' },
          { t: 'problem', id: 'pt-json-flatten' },
          { t: 'problem', id: 'pt-dates-month-counts' },
          { t: 'problem', id: 'pt-dates-gap' }
        ] },

      { key: 'c7', name: 'The collections that save you time',
        blurb: 'Counter, defaultdict, deque, heapq, sets — and when each one is the answer.',
        needs: 'dicts, lists',
        steps: [
          { t: 'read', title: 'Pick the container, and the code gets short', body: [
            'Most "clever" solutions are really just the right container. Five carry nearly everything:',
            ['code', "from collections import Counter, defaultdict, deque\nimport heapq\n\nCounter(words).most_common(3)   # tallying, and the top n\ndefaultdict(list)               # grouping without checking the key first\ndeque()                         # a queue: popleft() is O(1)\nheapq.heappush(h, x)            # a heap: the smallest is always on top\nset(items)                      # membership tests in O(1)"],
            'The grouping pattern is worth memorising outright:',
            ['code', "groups = defaultdict(list)\nfor row in rows:\n    groups[row['city']].append(row)", 'Without defaultdict this is three more lines of `if key not in groups`.'],
            'And the cost is why the container matters at all:',
            ['code', "x in my_list    # O(n) — checks every element\nx in my_set     # O(1) — hashes straight to it\nlist.pop(0)     # O(n) — shuffles everything down\ndeque.popleft() # O(1)", 'Swapping a list for a set is the single most common way a slow solution becomes a fast one.'],
            'A heap gives you "the smallest so far" without keeping anything sorted — which is how you take the top k out of a stream of a million rows while holding only k of them.',
            ['aside', '`Counter` compares equal to a plain dict, so you can return one straight out of a function. Wrap it in `dict()` if the output is going in front of a person.']
          ] },
          { t: 'quick', title: 'The structures', groups: ['Algorithms · the structures'] },
          { t: 'quiz', title: 'Collections in practice', ids: ['pq5-counter-most-common', 'pq5-defaultdict', 'pq5-deque-maxlen', 'pq5-heapq-order', 'pq5-setdefault', 'pq5-dict-order'] },
          { t: 'problem', id: 'pt-dsa-queue-sim' },
          { t: 'problem', id: 'pt-dsa-min-stack' }
        ] },

      { key: 'c8', name: 'Numbers, strings and the small print',
        blurb: 'Formatting, rounding, floating point and the comparisons that surprise you.',
        needs: 'types',
        steps: [
          { t: 'read', title: 'The details that decide the answer', body: [
            'f-strings do the formatting, and everything after the colon is a spec:',
            ['code', "f'{x:.2f}'      # two decimal places\nf'{n:,}'        # 1,234,567 — thousands grouped\nf'{p:.1%}'      # 12.3% — a fraction as a percentage\nf'{name!r}'     # repr, so the quotes stay visible\nf'{label:>10}'  # right-aligned in ten characters"],
            '**Floating point is not decimal.** This is not a Python quirk; it is how binary fractions work:',
            ['code', "0.1 + 0.2 == 0.3           # False\nmath.isclose(0.1 + 0.2, 0.3)   # True — compare with a tolerance\nround(0.5), round(2.5)     # 0, 2 — halves go to the nearest EVEN", 'For money, use `decimal.Decimal` or work in whole pence.'],
            'Integer arithmetic has two behaviours worth knowing before a test asks:',
            ['code', "7 // 2, 7 % 2      # 3, 1\n-7 // 2, -7 % 2    # -4, 1  — floors down, remainder follows the divisor\ndivmod(17, 5)      # (3, 2) — both at once"],
            'And the string methods you will use every day:',
            ['code', "'a-b-c'.split('-', 1)    # ['a', 'b-c'] — maxsplit\n'xxhixx'.strip('x')      # 'hi' — any of those characters, from both ends\n'-'.join(str(n) for n in nums)   # join only takes strings", "`strip` removes CHARACTERS, not a substring — `'hello'.strip('lo')` gives `'he'`."],
            ['aside', 'Chained comparisons mean "and": `1 < x < 10` is exactly `1 < x and x < 10`. Handy, and occasionally the answer to a trick question.']
          ] },
          { t: 'quiz', title: 'The small print', ids: ['pq5-fstring-format', 'pq5-fstring-repr', 'pq5-split-maxsplit', 'pq5-strip-chars', 'pq5-join-nums', 'pq5-round-half', 'pq5-float-sum', 'pq5-divmod', 'pq5-negative-mod', 'pq5-chained-compare'] },
          { t: 'problem', id: 'pt-str-report-line' }
        ] },

      { key: 'c9', name: 'Errors, and testing what you wrote',
        blurb: 'try/except/else/finally, assertions, and pytest in ten minutes.',
        needs: 'functions, errors',
        steps: [
          { t: 'read', title: 'Failing well, and proving it works', body: [
            'The full shape of a try block has four parts, and each has a job:',
            ['code', "try:\n    n = int(text)          # the risky line, and only that line\nexcept ValueError:\n    n = 0                  # a specific error you expected\nelse:\n    print('parsed', n)     # runs only if nothing was raised\nfinally:\n    close_things()         # runs either way — cleanup lives here"],
            'Catch the narrowest exception you can name. A bare `except:` hides typos, interrupts and everything else you would rather have heard about. And when you catch one to re-raise a clearer one, keep the original: `raise ValueError(\'bad row\') from err`.',
            'Testing starts with a single line, and it is worth writing even in a coding test:',
            ['code', "assert add(2, 3) == 5, 'add is broken'"],
            'pytest is barely more than that. Any function called `test_something` is a test:',
            ['code', "# test_add.py\ndef test_add():\n    assert add(2, 3) == 5\n\ndef test_add_negative():\n    assert add(-1, 1) == 0", 'Run the lot with `pytest`. Add `-x` to stop at the first failure, `-k name` to run matching tests.'],
            'Three extras cover most of what you need after that:',
            ['code', "with pytest.raises(ZeroDivisionError):   # the failure path matters too\n    divide(1, 0)\n\nassert result == pytest.approx(0.3)      # floating point, honestly\n\n@pytest.mark.parametrize('given,expected', cases)   # one test, many cases"],
            ['aside', 'Asked "how would you test this?", answer with the edge cases before the framework: empty, one item, duplicates, all negative, already sorted, and something enormous.']
          ] },
          { t: 'quick', title: 'Testing and assertions', groups: ['Python · testing & assertions'] },
          { t: 'quiz', title: 'Control flow when things go wrong', ids: ['pq5-try-finally', 'pq5-try-else', 'pq5-except-order', 'pq5-loop-else'] },
          { t: 'problem', id: 'pt-test-average-guard' }
        ] },

      { key: 'c10', name: 'The command line',
        blurb: 'Running scripts, looking at files, pipes, and arguments.',
        needs: 'nothing',
        steps: [
          { t: 'read', title: 'Ten commands is enough', body: [
            'You do not need to be a shell expert. You need about ten commands:',
            ['code', "pwd                 # where am I\nls -la              # what is here\ncd data             # go into a folder (cd .. goes up)\nhead -5 sales.csv   # the first five lines\nwc -l sales.csv     # how many lines\ngrep ERROR app.log  # every line containing ERROR\npython clean.py     # run a script"],
            'Two operators make them into a toolkit:',
            ['code', "python clean.py > out.txt          # send output to a file (>> appends)\ngrep ERROR app.log | wc -l        # feed one command into the next", 'That last line counts the errors in a log without opening it — the shell in one line.'],
            'A script that takes arguments needs two things:',
            ['code', "import sys\n\npath = sys.argv[1]        # the first argument (argv[0] is the script name)\n\nif __name__ == '__main__':\n    main()", 'The guard means the file can be imported without running everything. Every professional script has it.'],
            'For anything more than one argument, `argparse` gives you `--flags`, type checking and a help page for a few lines of setup.',
            ['aside', 'Secrets belong in the environment, not the code: `os.environ["API_KEY"]`. A key committed to git is a key you have to rotate.']
          ] },
          { t: 'quick', title: 'The command line', groups: ['Tooling · the command line'] }
        ] },

      { key: 'c11', name: 'git, without the fear',
        blurb: 'The six commands you use daily, and the two that get you out of trouble.',
        needs: 'the command line',
        steps: [
          { t: 'read', title: 'Save points for your work', body: [
            'Six commands cover nearly every day:',
            ['code', "git status                 # what have I changed\ngit diff                   # exactly what, line by line\ngit add .                  # stage it\ngit commit -m 'message'    # save it\ngit push                   # send it up\ngit pull                   # bring theirs down", 'Read `git diff` before every commit. It is the cheapest code review there is.'],
            'Branches keep unfinished work out of everyone else\'s way:',
            ['code', "git checkout -b feature-x     # make one and move onto it\ngit checkout main             # go back\ngit merge main                # bring main into your branch", 'Merge main into a long-running branch often: several small conflicts are far easier than one enormous one.'],
            'And two for when it has gone wrong:',
            ['code', "git restore --staged notes.md   # unstage, keep the edits\ngit checkout -- notes.md        # throw the edits away (no undo)"],
            'A `.gitignore` file lists what git must never track: data files, `.env`, notebook checkpoints, virtual environments. Anything with a credential in it goes here **before** the first commit.',
            ['aside', 'Commit messages are written for the person reading them in six months, which is you. "fix" tells that person nothing; "drop rows with a negative price before aggregating" tells them everything.']
          ] },
          { t: 'quick', title: 'git', groups: ['Tooling · git'] }
        ] },

      { key: 'c12', name: 'Environments and packages',
        blurb: 'venv, pip, requirements.txt — and why "it works on my machine" happens.',
        needs: 'the command line',
        steps: [
          { t: 'read', title: 'One environment per project', body: [
            'A virtual environment is a private set of packages for one project, so upgrading pandas here cannot break the project next door:',
            ['code', "python -m venv .venv\nsource .venv/bin/activate      # Windows: .venv\\Scripts\\activate\npip install pandas", 'The prompt changes when it worked. `.venv` goes in `.gitignore` — never commit it.'],
            'Reproducibility is two commands:',
            ['code', "pip freeze > requirements.txt      # write down exactly what you have\npip install -r requirements.txt    # rebuild it somewhere else", 'Commit the file. It is what lets a colleague — or a deployment — run your code and get your results.'],
            'When something is "not installed" but you know you installed it, you are almost certainly in a different interpreter:',
            ['code', "import sys\nsys.executable      # which python is actually running this\npd.__version__      # which pandas it found", 'In a notebook, `%pip install pandas` installs into the kernel that is actually running, which is the fix for that whole class of confusion.'],
            ['aside', 'conda instead of venv when you need non-Python dependencies too: `conda create -n ds python=3.11`, then `conda activate ds`. Same idea, wider reach.']
          ] },
          { t: 'quick', title: 'Environments and packages', groups: ['Tooling · environments & packages'] }
        ] }
    ]
  });
})();
