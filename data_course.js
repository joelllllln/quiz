/* The course, stage 01 — First steps in Python.
   Assumes nothing at all. Each unit reads you into one idea, drills the lines until
   you can type them cold, checks you can predict what Python does, then makes you
   write a small program that has to actually run. */
(function () {
  window.COURSE = window.COURSE || { stages: [] };

  window.COURSE.stages.push({
    key: 'py', no: '01', name: 'First steps in Python',
    blurb: 'From "what is a variable" to writing small programs that run. No prior coding assumed.',
    units: [

      { key: 'py1', name: 'Your first lines',
        blurb: 'Printing, storing things in names, and running a file.',
        steps: [
          { t: 'read', title: 'What a program actually is', body: [
            'A Python program is a list of instructions, run top to bottom, one line at a time. That is the whole model. Everything else in this course is detail on top of it.',
            'The first instruction worth knowing puts something on the screen:',
            ['code', "print('Hello, world!')", 'print is a **function**: a named piece of behaviour you use by writing its name and a pair of brackets. What goes inside the brackets is what it acts on.'],
            'The quotes matter. Anything in quotes is **text** — Python calls it a *string* — and Python will not look inside it or try to make sense of it. It just hands it back.',
            'The second thing to know is how to keep a value so you can use it again. You give it a name:',
            ['code', "name = 'Ada'\nage = 36\nprint(name)\nprint(age)", 'The single `=` means "put the thing on the right into the name on the left". It is not the equals of maths — it is an instruction, not a statement of fact.'],
            'Naming things is most of programming. A name holds one value at a time; assigning again replaces what was there.',
            ['code', "count = 1\ncount = 2\nprint(count)", 'Prints 2. The 1 is gone — nothing remembers it.'],
            'When you print several things at once, separate them with commas and Python puts a space between them:',
            ['code', "print('Total:', 42)", 'Text in quotes, names and numbers without. Mixing the two is most of everyday printing.'],
            ['aside', 'A file of Python is run from a terminal with `python script.py`. In this course you will type code straight into the page instead, and it runs in your browser — but it is the same Python underneath.']
          ] },
          { t: 'quick', title: 'Printing and naming', groups: ['First steps · printing & naming'], size: 14 },
          { t: 'quiz', title: 'Quotes, names and assignment', ids: ['pq0-print-quotes', 'pq0-assign-order', 'pq0-fstring', 'pq0-none-print'] },
          { t: 'problem', id: 'pt-add-two' },
          { t: 'problem', id: 'pt-greet' }
        ] },

      { key: 'py2', name: 'Types, and turning one into another',
        blurb: 'Numbers, text, True and False — and why 2 + 2 is sometimes 22.',
        steps: [
          { t: 'read', title: 'Everything has a type', body: [
            'Every value in Python is of some **type**, and the type decides what the value can do. Four of them cover almost everything early on:',
            ['code', "n = 5          # int   — a whole number\nprice = 3.99   # float — a number with a decimal point\nname = 'Ada'   # str   — text\nactive = True  # bool  — True or False", 'You never declare types in Python; it works them out from what you wrote. `type(x)` tells you what it decided.'],
            'The type is why the same symbol can do two different jobs:',
            ['code', "print(2 + 3)       # 5   — addition\nprint('2' + '3')   # 23  — joining text", 'Both are `+`. On numbers it adds; on strings it sticks them together. Nothing is wrong here — Python is doing exactly what the types imply.'],
            'Mixing them is the error you will hit most often in your first week:',
            ['code', "'age: ' + 30", "**TypeError**. Python refuses to guess whether you meant text or arithmetic. Convert first with `str(30)`, or let print handle it: `print('age:', 30)`."],
            'Converting is done with the type name as a function:',
            ['code', "int('30')     # 30    text  → whole number\nfloat('3.5')  # 3.5   text  → decimal\nstr(30)       # '30'  number → text\nint(3.9)      # 3     chops the decimal off, it does not round", 'These raise a **ValueError** when the text is not a number at all — `int(\'thirty\')` cannot work, and Python says so rather than inventing an answer.'],
            'One trap worth meeting now: anything typed in by a person arrives as text, even when it looks like a number. Convert it at the moment you read it, and the rest of your program can trust it.'
          ] },
          { t: 'quick', title: 'Types and converting', groups: ['First steps · types & converting'] },
          { t: 'quick', title: 'Numbers and maths', groups: ['Python · numbers & maths'] },
          { t: 'quiz', title: 'What type is that?', ids: ['pq0-plus-strings', 'pq0-str-int', 'pq0-input-type', 'pq0-float-div', 'pq-bool-int'] },
          { t: 'problem', id: 'pt-celsius' },
          { t: 'problem', id: 'pt-count-list' }
        ] },

      { key: 'py3', name: 'Making decisions',
        blurb: 'Comparisons, if / elif / else, and what counts as true.',
        needs: 'printing, variables, types',
        steps: [
          { t: 'read', title: 'Asking a question, then branching', body: [
            'A comparison is a question whose answer is `True` or `False`:',
            ['code', "x = 5\nx == 5    # True   — are these the same?\nx != 5    # False  — are they different?\nx > 3     # True\nx >= 5    # True   — greater than OR equal", 'Two equals signs to compare, one to assign. Getting those the wrong way round is the first bug everybody writes.'],
            'An `if` statement runs a block of code only when the answer is True:',
            ['code', "if score >= 50:\n    print('pass')\nelse:\n    print('fail')", 'The colon opens the block, and the **indentation** — four spaces — is what says which lines are inside it. In Python that spacing is not decoration; it is the syntax.'],
            'For more than two outcomes, use `elif` (short for "else if"). The first branch that matches wins and the rest are skipped:',
            ['code', "if score >= 70:\n    grade = 'A'\nelif score >= 50:\n    grade = 'B'\nelse:\n    grade = 'C'", 'Order matters enormously. Put the 50 test first and a score of 85 would come out as a B, because it matches that branch before it ever reaches the 70 one.'],
            'Conditions can be combined with the words `and`, `or` and `not`:',
            ['code', "if age >= 18 and country == 'UK':\n    print('eligible')", '`and` needs both sides; `or` is happy with either; `not` flips one. Python also lets you chain: `18 <= age <= 65` reads exactly like the maths.'],
            'Finally: Python treats "empty" things as False without you asking. An empty list, an empty string, `0` and `None` are all falsy; everything else is truthy.',
            ['code', "items = []\nif items:\n    print('we have some')\nelse:\n    print('nothing here')", 'This is the idiomatic way to ask whether there is anything to work with — shorter than `len(items) > 0` and read the same way by everyone.']
          ] },
          { t: 'quick', title: 'Operators and comparisons', groups: ['First steps · operators'] },
          { t: 'quiz', title: 'Which branch runs?', ids: ['pq0-if-elif', 'pq0-empty-falsy', 'pq0-equals', 'pq-truthy', 'pq-or-default'] },
          { t: 'problem', id: 'pt-is-even' },
          { t: 'problem', id: 'pt-grade' },
          { t: 'problem', id: 'pt-rectangle' },
          { t: 'problem', id: 'pt-clamp' }
        ] },

      { key: 'py4', name: 'Doing it again: loops',
        blurb: 'for, while, range, and the counter that grows.',
        needs: 'if / else, indentation',
        steps: [
          { t: 'read', title: 'Repeating without repeating yourself', body: [
            'A `for` loop takes each thing in a collection, one at a time, and runs the block for it:',
            ['code', "for name in ['Ada', 'Bob', 'Cat']:\n    print('Hello,', name)", 'Python loops over the THINGS, not over their positions. Most other languages make you manage an index; here you rarely need one.'],
            'When you do want plain numbers, `range` produces them:',
            ['code', "for i in range(3):\n    print(i)      # 0, 1, 2", '`range(3)` stops **before** 3. To count 1 to 10 inclusive you write `range(1, 11)` — the off-by-one that catches everyone.'],
            'The other everyday shape is a running total. Notice where the variable lives:',
            ['code', "total = 0\nfor n in [1, 2, 3]:\n    total += n\nprint(total)     # 6", 'The accumulator starts **before** the loop and is printed **after** it. Start it inside and it resets every pass; print it inside and you see every step instead of the answer. `total += n` is shorthand for `total = total + n`.'],
            'A `while` loop runs as long as its condition stays true. Use it when you do not know how many passes you need:',
            ['code', "n = 3\nwhile n > 0:\n    print(n)\n    n -= 1", 'Something inside the loop must eventually make the condition false — here `n -= 1`. Forget it and the loop never ends.'],
            'Two words steer a loop from inside: `break` leaves it immediately, `continue` skips to the next pass.',
            ['aside', 'When you want the position as well as the value, `enumerate` gives you both: `for i, name in enumerate(names):`. Reach for that before you reach for `range(len(names))`.']
          ] },
          { t: 'quick', title: 'Loops, step by step', groups: ['First steps · loops in practice'] },
          { t: 'quick', title: 'Loops and conditions', groups: ['Python · loops & conditions'] },
          { t: 'quiz', title: 'How many times does it run?', ids: ['pq0-indent-block', 'pq0-augmented', 'pq0-range-end', 'pq0-while', 'pq-range-lazy'] },
          { t: 'problem', id: 'pt-sum-loop' },
          { t: 'problem', id: 'pt-fizz-simple' },
          { t: 'problem', id: 'pt-fizzbuzz' },
          { t: 'problem', id: 'pt-count-above' },
          { t: 'problem', id: 'pt-first-match' },
          { t: 'problem', id: 'pt-fizz-count' },
          { t: 'problem', id: 'pt-primes' }
        ] },

      { key: 'py5', name: 'Lists',
        blurb: 'Ordered collections: building them, reading them, changing them.',
        needs: 'loops',
        steps: [
          { t: 'read', title: 'A box with an order', body: [
            'A list holds several values in a fixed order, and you get at them by position:',
            ['code', "items = ['a', 'b', 'c']\nitems[0]     # 'a'  — counting starts at ZERO\nitems[2]     # 'c'\nitems[-1]    # 'c'  — negative counts back from the end\nlen(items)   # 3", 'Because counting starts at 0, the last index is always `len - 1`. Asking for `items[3]` here raises an **IndexError**.'],
            'A **slice** takes a range of positions. The start is included, the end is not:',
            ['code', "items[:2]    # ['a', 'b']  — the first two\nitems[1:]    # ['b', 'c']  — everything from position 1\nitems[::-1]  # ['c', 'b', 'a'] — reversed", 'Slicing never raises for out-of-range numbers; it just gives you what exists.'],
            'Lists can be changed after they are made — that is what makes them different from text:',
            ['code', "items.append('d')      # add one to the end\nitems.remove('a')      # delete the first match\nitems.sort()           # sort IN PLACE, returns None\nsorted(items)          # returns a NEW sorted list", 'Watch that pair: `.sort()` changes the list and hands back nothing, while `sorted()` leaves it alone and hands back a new one. Writing `items = items.sort()` throws your list away.'],
            'One more thing to be careful about, because it causes real bugs:',
            ['code', "a = [1, 2, 3]\nb = a          # NOT a copy — another name for the same list\nb.append(4)\nprint(a)       # [1, 2, 3, 4]", 'To get a genuine copy, use `a.copy()` or `a[:]`. Assignment never copies a list; it only adds a second label to it.']
          ] },
          { t: 'quick', title: 'Lists, step by step', groups: ['First steps · lists in practice'] },
          { t: 'quick', title: 'Working with lists', groups: ['Python · lists'] },
          { t: 'quiz', title: 'Indexes, copies and sorting', ids: ['pq0-index-zero', 'pq0-len-vs-index', 'pq0-list-append', 'pq-sort-return', 'pq-list-alias', 'pq-copy-slice', 'pq-slice-step'] },
          { t: 'problem', id: 'pt-last-item' },
          { t: 'problem', id: 'pt-double-list' },
          { t: 'problem', id: 'pt-second-largest' },
          { t: 'problem', id: 'pt-list-stats' },
          { t: 'problem', id: 'pt-odd-even-split' },
          { t: 'problem', id: 'pt-remove-item' },
          { t: 'problem', id: 'pt-max-consecutive' },
          { t: 'problem', id: 'pt-chunk' }
        ] },

      { key: 'py6', name: 'Text',
        blurb: 'Slicing, splitting, joining and formatting strings.',
        needs: 'lists',
        steps: [
          { t: 'read', title: 'Strings, and the fact that they never change', body: [
            'A string indexes and slices exactly like a list, because it is a sequence of characters:',
            ['code', "s = 'python'\ns[0]      # 'p'\ns[-1]     # 'n'\ns[:3]     # 'pyt'\nlen(s)    # 6"],
            'But unlike a list, a string can never be modified. Every string method returns a **new** string:',
            ['code', "s = 'hello'\ns.upper()      # 'HELLO'\nprint(s)       # 'hello'  — s is unchanged!\ns = s.upper()  # this is how you keep the result", 'Forgetting to keep the result is one of the most common early mistakes, and it fails silently: no error, just no change.'],
            'The methods you will use constantly:',
            ['code', "'  spaced  '.strip()        # 'spaced'      — trim both ends\n'a,b,c'.split(',')          # ['a', 'b', 'c'] — text  → list\n' '.join(['a', 'b'])       # 'a b'          — list  → text\n'hello'.replace('l', 'L')   # 'heLLo'\n'Hello'.lower()             # 'hello'", 'Note the shape of `join`: it is a method on the **separator**, and the list goes inside the brackets. Everyone writes it backwards once.'],
            '`split()` with no argument is special: it splits on any run of whitespace and throws the empty pieces away, which is almost always what you want for a sentence.',
            'To build a string out of values, use an f-string — the f before the quote lets you drop names straight in:',
            ['code', "name = 'Ada'\nscore = 0.8567\nprint(f'{name} scored {score:.1%}')   # Ada scored 85.7%", 'The bit after the colon is a format spec: `.2f` for two decimal places, `,` for thousands separators, `.1%` for a percentage.']
          ] },
          { t: 'quick', title: 'String methods', groups: ['Python · strings'] },
          { t: 'quiz', title: 'What does the string do?', ids: ['pq0-string-index', 'pq-string-immutable', 'pq-join-type', 'pq-split-empty', 'pq-slice-oob', 'pq-fstring-fmt'] },
          { t: 'problem', id: 'pt-shout' },
          { t: 'problem', id: 'pt-count-letter' },
          { t: 'problem', id: 'pt-swap-case' },
          { t: 'problem', id: 'pt-longest-word' },
          { t: 'problem', id: 'pt-vowel-free' },
          { t: 'problem', id: 'pt-repeat-word' },
          { t: 'problem', id: 'pt-palindrome' }
        ] },

      { key: 'py7', name: 'Dictionaries, sets and tuples',
        blurb: 'Looking things up by name, deduplicating, and fixed pairs.',
        needs: 'lists',
        steps: [
          { t: 'read', title: 'When position is the wrong way to find something', body: [
            'A **dictionary** stores values under keys, so you look things up by name rather than by position:',
            ['code', "person = {'name': 'Ada', 'age': 36}\nperson['name']        # 'Ada'\nperson['city'] = 'London'   # adds a new key\nlen(person)           # 3", "Asking for a key that is not there raises a **KeyError**. When it might be missing, use `.get()`: `person.get('city', 'unknown')` hands back a default instead of raising."],
            'Looping over a dict gives you the keys; `.items()` gives you both halves:',
            ['code', "for key, value in person.items():\n    print(key, '=', value)"],
            'The single most useful dictionary pattern in data work is counting:',
            ['code', "counts = {}\nfor word in words:\n    counts[word] = counts.get(word, 0) + 1", "`.get(word, 0)` says \"however many I have seen, or zero if this is the first\". That one line replaces a whole if/else. (`collections.Counter(words)` does the same job in one call.)"],
            'A **set** holds each value once, in no particular order, and answers "is this in here?" instantly:',
            ['code', "seen = set(['a', 'b', 'a'])   # {'a', 'b'}\n'a' in seen                   # True, and fast even on millions", 'Swapping a list for a set when you are repeatedly asking `in` is one of the standard ways to turn a slow program into a fast one.'],
            'A **tuple** is a list that cannot be changed, written with round brackets: `point = (1, 2)`. Because it is fixed, it can be used as a dictionary key — and functions that return several values are really returning tuples.'
          ] },
          { t: 'quick', title: 'Dictionaries, step by step', groups: ['First steps · dictionaries in practice'] },
          { t: 'quick', title: 'Dicts, sets and tuples', groups: ['Python · dicts, sets & tuples'] },
          { t: 'quiz', title: 'Keys, order and membership', ids: ['pq0-dict-access', 'pq-dict-get', 'pq-dict-order', 'pq-set-dedupe', 'pq-set-literal', 'pq-in-dict', 'pq-string-in-list'] },
          { t: 'problem', id: 'pt-group-sum' },
          { t: 'problem', id: 'pt-mode-value' },
          { t: 'problem', id: 'pt-dedupe-order' },
          { t: 'problem', id: 'pt-tally-letters' },
          { t: 'problem', id: 'pt-initial-sum' },
          { t: 'problem', id: 'pt-reverse-dict' },
          { t: 'problem', id: 'pt-intersection' }
        ] },

      { key: 'py8', name: 'Functions',
        blurb: 'Packaging work under a name, arguments, and returning a result.',
        needs: 'everything above',
        steps: [
          { t: 'read', title: 'Naming a piece of behaviour', body: [
            'A function is a named block of code that takes inputs and hands back a result:',
            ['code', "def area(width, height):\n    return width * height\n\nprint(area(3, 4))    # 12", '`def` names it, the brackets list the **parameters**, the colon and indentation mark the body, and `return` hands a value back to whoever called it.'],
            'The difference between printing and returning is worth being precise about, because it is the most common reason a coding test marks everything wrong:',
            ['code', "def add(a, b):\n    print(a + b)      # shows it on screen\n\nresult = add(2, 3)  # prints 5\nprint(result)       # None — nothing was returned!", 'A function with no `return` hands back `None`. Printing is for humans; returning is for the rest of your program — and for the test that is marking you.'],
            'Parameters can have defaults, which makes them optional:',
            ['code', "def greet(name, greeting='Hello'):\n    return f'{greeting}, {name}!'\n\ngreet('Ada')              # 'Hello, Ada!'\ngreet('Ada', 'Morning')   # 'Morning, Ada!'", 'Parameters with defaults must come after those without. Never use a list or a dict as a default — it is created once and shared by every call, which surprises everyone exactly once.'],
            'Names created inside a function belong to that function and vanish when it ends. That isolation is the point: you can read a function on its own and know it cannot quietly change something elsewhere — unless you hand it something mutable, like a list, and it changes that.',
            ['aside', 'Write the function so it takes what it needs as arguments and returns what it produces. Functions that reach out to variables defined elsewhere are the ones that break when you move them.']
          ] },
          { t: 'quick', title: 'Functions, step by step', groups: ['First steps · functions in practice'] },
          { t: 'quick', title: 'Defining and calling functions', groups: ['Python · functions'] },
          { t: 'quiz', title: 'Arguments, returns and scope', ids: ['pq0-print-return', 'pq0-function-args', 'pq-return-none', 'pq-scope', 'pq-args-mutable', 'pq-mutable-default'] },
          { t: 'problem', id: 'pt-biggest' },
          { t: 'problem', id: 'pt-initials' },
          { t: 'problem', id: 'pt-reverse-words' }
        ] },

      { key: 'py9', name: 'When things go wrong',
        blurb: 'Reading a traceback, the errors you will actually meet, and try / except.',
        needs: 'functions',
        steps: [
          { t: 'read', title: 'Errors are the most useful output you get', body: [
            'When Python cannot carry on it stops and prints a **traceback**. Read it from the BOTTOM: the last line names the error and says what was wrong; the lines above show how you got there.',
            ['code', "Traceback (most recent call last):\n  File \"script.py\", line 12, in <module>\n    total = price + quantity\nTypeError: can only concatenate str (not \"int\") to str", 'This says: on line 12, `price` was text and `quantity` was a number. Not a mystery — an instruction to convert one of them.'],
            'The handful you will meet again and again:',
            ['code', "NameError          # a name Python has never seen — usually a typo\nTypeError          # right idea, wrong kind of thing ('age: ' + 30)\nValueError         # right kind, impossible value (int('abc'))\nIndexError         # asked a 3-item list for item 10\nKeyError           # asked a dict for a key it does not have\nZeroDivisionError  # divided by zero\nAttributeError     # .upper() on a number, or on something that is None\nIndentationError   # your spacing does not line up\nSyntaxError        # Python could not even read the line", 'A **SyntaxError** often points at the line AFTER the real mistake — an unclosed bracket swallows the next line before Python notices.'],
            'Sometimes an error is expected and you want to carry on anyway. That is what `try` / `except` is for:',
            ['code', "try:\n    age = int(value)\nexcept ValueError:\n    age = None", 'Catch the narrowest error you can name. A bare `except:` swallows everything — including the typo you have not found yet — and turns a loud failure into a silent wrong answer.'],
            ['aside', 'The most valuable debugging habit in this whole course: when something is wrong, print the thing and its type. `print(x, type(x))` answers more questions than an hour of staring.']
          ] },
          { t: 'quick', title: 'Reading errors', groups: ['First steps · reading errors'] },
          { t: 'quick', title: 'Errors and files', groups: ['Python · errors & files'] },
          { t: 'quiz', title: 'Which error, and when?', ids: ['pq-except-order', 'pq-index-error', 'pq-finally', 'pq-mutable-key'] },
          { t: 'problem', id: 'pt-bug-return' },
          { t: 'problem', id: 'pt-bug-average' },
          { t: 'problem', id: 'pt-safe-divide' },
          { t: 'problem', id: 'pt-bug-boundary' }
        ] },

      { key: 'py10', name: 'Writing it the Python way',
        blurb: 'Comprehensions, enumerate, zip — the shapes fluent Python is made of.',
        needs: 'loops, lists, dicts',
        steps: [
          { t: 'read', title: 'The same work, in one readable line', body: [
            'You now know enough to write anything. This unit is about writing it the way Python programmers do — which matters, because it is what an interviewer is reading for.',
            'A **list comprehension** builds a new list from an old one:',
            ['code', "# the long way\ndoubled = []\nfor n in nums:\n    doubled.append(n * 2)\n\n# the Python way\ndoubled = [n * 2 for n in nums]", 'Expression first, then the loop. Read it as "n times two, for every n in nums".'],
            'Add a condition on the end to filter:',
            ['code', "evens = [n for n in nums if n % 2 == 0]", 'A trailing `if` FILTERS. An `if/else` at the FRONT transforms instead, and keeps every element: `[n if n > 0 else 0 for n in nums]`.'],
            'The same shape builds dicts and sets:',
            ['code', "lengths = {w: len(w) for w in words}    # dict\nsizes   = {len(w) for w in words}       # set", 'A colon inside the braces makes it a dict; without one it is a set.'],
            'Two built-ins remove most remaining loops-with-counters:',
            ['code', "for i, name in enumerate(names):      # position AND value\n    print(i, name)\n\nfor name, age in zip(names, ages):    # two lists in step\n    print(name, age)", '`zip` stops at the shorter list, silently. If a length mismatch would be a bug, say so: `zip(a, b, strict=True)`.'],
            'And the small ones worth knowing by name: `sum`, `min`, `max`, `sorted`, `any`, `all`, `len`. Reaching for one of these instead of writing a loop is usually both shorter and faster.',
            ['aside', 'A comprehension that no longer fits on one line, or that needs two conditions and a nested loop, has stopped being clearer than the loop. Write the loop.']
          ] },
          { t: 'quick', title: 'Comprehensions and idioms', groups: ['Python · comprehensions'] },
          { t: 'quiz', title: 'Reading a comprehension', ids: ['pq-comp-filter', 'pq-comp-scope', 'pq-comp-nested', 'pq-enumerate-start', 'pq-zip-short', 'pq-generator-once'] },
          { t: 'problem', id: 'pt-count-vowels' },
          { t: 'problem', id: 'pt-longest-streak' },
          { t: 'problem', id: 'pt-fill-forward' },
          { t: 'problem', id: 'pt-word-lengths' },
          { t: 'problem', id: 'pt-flatten' }
        ] },

      { key: 'py11', name: 'Files, modules and a first class',
        blurb: 'Reading a file, importing code, and what a class is for.',
        needs: 'functions, errors',
        steps: [
          { t: 'read', title: 'Code that outlives one script', body: [
            'Reading a file uses a `with` block, which closes the file for you even if something goes wrong inside:',
            ['code', "with open('data.txt') as f:\n    for line in f:\n        print(line.strip())", "Looping over the file hands you one line at a time without loading the whole thing into memory. `.strip()` removes the newline character each line carries."],
            "Writing takes a mode: `'w'` replaces the file, `'a'` adds to the end.",
            ['code', "with open('out.txt', 'w') as f:\n    f.write('first line\\n')", '`write` does not add a newline of its own — you supply it.'],
            'Everything Python does not have built in comes from a **module**, brought in with `import`:',
            ['code', "import math\nmath.sqrt(16)             # 4.0\n\nfrom datetime import datetime\ndatetime.now()\n\nimport pandas as pd       # imported under a shorter name", 'The `as` form is a rename on the way in. `pd`, `np`, `plt` and `sns` are conventions so universal that using anything else makes your code look wrong.'],
            'A **class** bundles data with the behaviour that belongs to it. You will use classes constantly — every DataFrame and every model is one — long before you need to write your own:',
            ['code', "class Account:\n    def __init__(self):\n        self.balance = 0\n\n    def deposit(self, amount):\n        self.balance += amount\n\na = Account()\na.deposit(10)\nprint(a.balance)     # 10", '`__init__` runs when the object is created; `self` is the object itself, handed to every method automatically. Attributes hang off `self`, so each object keeps its own.'],
            ['aside', 'A rule of thumb: reach for a class when you have data and behaviour that always travel together. Otherwise a function is simpler, and simpler is better.']
          ] },
          { t: 'quick', title: 'Classes and modules', groups: ['Python · classes & modules'] },
          { t: 'quick', title: 'The standard library', groups: ['Python · standard library'] },
          { t: 'quiz', title: 'Objects and imports', ids: ['pq-class-shared', 'pq-self', 'pq-is-vs-eq'] },
          { t: 'problem', id: 'pt-parse-kv' },
          { t: 'problem', id: 'pt-class-account' },
          { t: 'problem', id: 'pt-class-stats' }
        ] }
    ]
  });
})();
