/* Python coding test — "what does this print?", part 4.
   The middle of the course: strings and lists at working level, functions, and more
   of the pandas and NumPy behaviour that decides whether a number is right. */
(function () {
  window.PYQUIZ = window.PYQUIZ || [];
  var PD = ['pandas', 'numpy'];

  window.PYQUIZ.push(

    { id: 'pq4-strip-vs-replace', group: 'Strings', lvl: 2,
      code: "s = ' a b '\nprint(repr(s.strip()))\nprint(repr(s.replace(' ', '')))",
      correct: "'a b'\n'ab'",
      wrong: ["'ab'\n'ab'", "'a b'\n'a b'", "' a b'\n'ab'"],
      explain: 'strip only touches the ends; replace removes every occurrence, including the one in the middle.' },

    { id: 'pq4-title-case', group: 'Strings', lvl: 2,
      code: "print('hello world'.title())\nprint('MCDONALD'.title())",
      correct: 'Hello World\nMcdonald',
      wrong: ['Hello World\nMCDONALD', 'Hello world\nMcdonald', 'HELLO WORLD\nMcdonald'],
      explain: 'title() capitalises the first letter of each word and lowercases the rest — which mangles names like McDonald. Real name-casing needs more care.' },

    { id: 'pq4-in-vs-find', group: 'Strings', lvl: 2,
      code: "s = 'hello'\nprint('ell' in s)\nprint(s.find('ell'))\nprint(s.find('xyz'))",
      correct: 'True\n1\n-1',
      wrong: ['True\n1\n0', 'True\n2\n-1', 'True\nTrue\nFalse'],
      explain: 'find returns the position, or -1 when it is absent. index() does the same but raises instead — which is why `in` is the safer test.' },

    { id: 'pq4-string-compare-case', group: 'Strings', lvl: 2,
      code: "print('Ada' == 'ada')\nprint('Ada'.lower() == 'ada')",
      correct: 'False\nTrue',
      wrong: ['True\nTrue', 'False\nFalse', 'True\nFalse'],
      explain: 'String comparison is exact, including case. Normalise both sides before comparing anything a human typed.' },

    { id: 'pq4-list-extend-str', group: 'Lists & mutation', lvl: 3,
      code: "items = ['a']\nitems.extend('bc')\nprint(items)",
      correct: "['a', 'b', 'c']",
      wrong: ["['a', 'bc']", "['a', ['b', 'c']]", 'TypeError'],
      explain: 'extend takes any iterable, and a string iterates character by character. To add the whole word, use append.' },

    { id: 'pq4-sort-mixed', group: 'Sorting & comparing', lvl: 3,
      code: "try:\n    print(sorted([1, 'a']))\nexcept TypeError:\n    print('TypeError')",
      correct: 'TypeError',
      wrong: ["[1, 'a']", "['a', 1]", 'None'],
      explain: 'Python 3 refuses to compare numbers with strings. A column of mixed types — the classic result of a messy CSV — will blow up exactly here.' },

    { id: 'pq4-list-index-slice', group: 'Lists & mutation', lvl: 2,
      code: 'items = [1, 2, 3]\nprint(items[1:1])\nprint(items[3:])',
      correct: '[]\n[]',
      wrong: ['[2]\n[]', '[]\nIndexError', '[2]\n[3]'],
      explain: 'A slice whose start and stop are equal is empty, and a slice starting past the end is empty too. Slices never raise — only direct indexing does.' },

    { id: 'pq4-tuple-unpack', group: 'Functions & scope', lvl: 2,
      code: 'def stats(nums):\n    return min(nums), max(nums)\n\nlow, high = stats([3, 1, 2])\nprint(low, high)\nprint(type(stats([1])))',
      correct: "1 3\n<class 'tuple'>",
      wrong: ["1 3\n<class 'list'>", "3 1\n<class 'tuple'>", "(1, 3)\n<class 'tuple'>"],
      explain: 'Returning several values really returns one tuple; the brackets are optional. Unpacking it into two names is what makes it read as two results.' },

    { id: 'pq4-nested-function', group: 'Functions & scope', lvl: 3,
      code: 'def outer():\n    total = 0\n    def inner():\n        return total + 1\n    return inner()\n\nprint(outer())',
      correct: '1',
      wrong: ['0', 'NameError', 'None'],
      explain: 'An inner function can READ the enclosing function\'s names. Assigning to one would create a new local instead, unless you declare it `nonlocal`.' },

    { id: 'pq4-default-none', group: 'Functions & scope', lvl: 2,
      code: 'def add(x, items=None):\n    if items is None:\n        items = []\n    items.append(x)\n    return items\n\nprint(add(1))\nprint(add(2))',
      correct: '[1]\n[2]',
      wrong: ['[1]\n[1, 2]', '[1]\n[1]', 'TypeError'],
      explain: 'This is the fix for the mutable-default trap: None as the default, and a fresh list built inside the call.' },

    { id: 'pq4-recursion-base', group: 'Functions & scope', lvl: 3,
      code: 'def countdown(n):\n    if n <= 0:\n        return []\n    return [n] + countdown(n - 1)\n\nprint(countdown(3))',
      correct: '[3, 2, 1]',
      wrong: ['[1, 2, 3]', '[3, 2, 1, 0]', 'RecursionError'],
      explain: 'The base case returns an empty list and stops the recursion; each call puts its own number in front of whatever the rest returns.' },

    { id: 'pq4-try-else', group: 'Errors', lvl: 3,
      code: "try:\n    x = int('5')\nexcept ValueError:\n    print('bad')\nelse:\n    print('good', x)",
      correct: 'good 5',
      wrong: ['bad', 'good 5\nbad', '5'],
      explain: "A try's else block runs only when nothing was raised. It keeps the risky line by itself, so the except cannot accidentally catch an error from the follow-up code." },

    { id: 'pq4-raise-custom', group: 'Errors', lvl: 2,
      code: "def check(n):\n    if n < 0:\n        raise ValueError('negative')\n    return n\n\ntry:\n    check(-1)\nexcept ValueError as e:\n    print('caught:', e)",
      correct: 'caught: negative',
      wrong: ['caught: ValueError', 'negative', "caught: ValueError('negative')"],
      explain: 'Printing the exception object shows its message. Raising with a specific message is what lets the caller tell your failures apart.' },

    { id: 'pq4-counter-order', group: 'Dicts & sets', lvl: 3,
      code: "from collections import Counter\nc = Counter('aabbbc')\nprint(c.most_common(2))",
      correct: "[('b', 3), ('a', 2)]",
      wrong: ["[('a', 2), ('b', 3)]", "[('b', 3), ('c', 1)]", "['b', 'a']"],
      explain: 'most_common sorts by count, biggest first, and returns (value, count) pairs. Ties keep the order they were first seen in.' },

    { id: 'pq4-dict-update-order', group: 'Dicts & sets', lvl: 2,
      code: "a = {'x': 1}\nb = {'x': 2, 'y': 3}\na.update(b)\nprint(a)",
      correct: "{'x': 2, 'y': 3}",
      wrong: ["{'x': 1, 'y': 3}", "{'x': 3, 'y': 3}", "{'x': 1, 'x': 2, 'y': 3}"],
      explain: 'update overwrites the keys it shares and adds the ones it does not. The argument wins every clash.' },

    { id: 'pq4-set-ops', group: 'Sets & membership', lvl: 2,
      code: 'a = {1, 2, 3}\nb = {2, 3, 4}\nprint(sorted(a & b), sorted(a - b), sorted(a | b))',
      correct: '[2, 3] [1] [1, 2, 3, 4]',
      wrong: ['[1] [2, 3] [1, 2, 3, 4]', '[2, 3] [4] [1, 2, 3, 4]', '[2, 3] [1] [1, 2, 3]'],
      explain: '& is in both, - is in the first only, | is in either. Sorting them just makes the output predictable.' },

    { id: 'pq4-int-str-sort', group: 'Sorting & comparing', lvl: 2,
      code: "vals = ['10', '9', '100']\nprint(sorted(vals))\nprint(sorted(vals, key=int))",
      correct: "['10', '100', '9']\n['9', '10', '100']",
      wrong: ["['9', '10', '100']\n['9', '10', '100']", "['10', '100', '9']\n['10', '100', '9']", "['100', '10', '9']\n['9', '10', '100']"],
      explain: 'Numbers stored as text sort alphabetically — "10" before "9". key=int fixes the sort; converting the column fixes the cause.' },

    { id: 'pq4-any-empty', group: 'Loops & iteration', lvl: 3,
      code: 'print(any([]))\nprint(all([]))',
      correct: 'False\nTrue',
      wrong: ['False\nFalse', 'True\nTrue', 'True\nFalse'],
      explain: 'any of nothing is False — there is no true item. all of nothing is True, because there is no counter-example. That second one surprises people and matters when a filter empties a list.' },

    { id: 'pq4-nested-loop-count', group: 'Loops & iteration', lvl: 2,
      code: "count = 0\nfor i in range(3):\n    for j in range(2):\n        count += 1\nprint(count)",
      correct: '6',
      wrong: ['5', '3', '2'],
      explain: 'The inner loop runs fully for each pass of the outer one: 3 × 2. That multiplication is why a nested loop over a big list is O(n²).' },

    { id: 'pq4-enumerate-unpack', group: 'Loops & iteration', lvl: 2,
      code: "for pair in enumerate(['a', 'b']):\n    print(pair)",
      correct: "(0, 'a')\n(1, 'b')",
      wrong: ["0 a\n1 b", "['a', 'b']", "(1, 'a')\n(2, 'b')"],
      explain: 'enumerate yields tuples. Writing `for i, item in ...` unpacks each one — without the unpacking you get the pair itself.' },

    { id: 'pq4-np-axis', group: 'NumPy & pandas', lvl: 2, needs: PD,
      code: 'import numpy as np\na = np.array([[1, 2], [3, 4]])\nprint(a.sum(axis=0))\nprint(a.sum(axis=1))',
      correct: '[4 6]\n[3 7]',
      wrong: ['[3 7]\n[4 6]', '[4 6]\n[4 6]', '[10]\n[10]'],
      explain: 'axis=0 collapses the ROWS, giving one number per column; axis=1 collapses the columns. Say "the axis that disappears" and it stops being confusing.' },

    { id: 'pq4-np-int-div', group: 'NumPy & pandas', lvl: 3, needs: PD,
      code: 'import numpy as np\na = np.array([1, 2, 3])\nprint(a / 2)\nprint(a.dtype, (a / 2).dtype)',
      correct: '[0.5 1.  1.5]\nint64 float64',
      wrong: ['[0 1 1]\nint64 int64', '[0.5 1.  1.5]\nfloat64 float64', '[0.5 1. 1.5]\nint64 int64'],
      explain: 'Dividing an integer array produces a float array — the dtype changes under you. That is usually what you want, and occasionally what breaks a memory budget.' },

    { id: 'pq4-pd-astype-int', group: 'NumPy & pandas', lvl: 3, needs: PD,
      code: "import pandas as pd\nimport numpy as np\ns = pd.Series([1.0, 2.0, np.nan])\ntry:\n    print(s.astype(int))\nexcept (ValueError, pd.errors.IntCastingNaNError):\n    print('cannot cast NaN to int')",
      correct: 'cannot cast NaN to int',
      wrong: ['0    1\n1    2\n2    0', '[1, 2, nan]', '0    1\n1    2\n2    NaN'],
      explain: 'A plain int column cannot hold a missing value. Fill the gaps first, or use the nullable "Int64" dtype with a capital I.' },

    { id: 'pq4-pd-sort-index', group: 'NumPy & pandas', lvl: 3, needs: PD,
      code: "import pandas as pd\ndf = pd.DataFrame({'a': [3, 1, 2]})\nsub = df[df['a'] > 1]\nprint(list(sub.index))\nprint(list(sub.reset_index(drop=True).index))",
      correct: '[0, 2]\n[0, 1]',
      wrong: ['[0, 1]\n[0, 1]', '[1, 2]\n[0, 1]', '[0, 2]\n[0, 2]'],
      explain: 'Filtering keeps the ORIGINAL index labels, with gaps. That is why .loc and .iloc then disagree, and why reset_index(drop=True) belongs after most filters.' },

    { id: 'pq4-pd-string-num', group: 'NumPy & pandas', lvl: 2, needs: PD,
      code: "import pandas as pd\ns = pd.Series(['1', '2', 'x'])\nprint(pd.to_numeric(s, errors='coerce').tolist())",
      correct: '[1.0, 2.0, nan]',
      wrong: ["['1', '2', 'x']", '[1, 2, 0]', 'ValueError'],
      explain: "errors='coerce' converts what it can and marks the rest missing — the standard rescue for a numeric column with junk in it. Without it, the whole call raises." },

    { id: 'pq4-pd-apply-vs-vector', group: 'NumPy & pandas', lvl: 3, needs: PD,
      code: "import pandas as pd\ns = pd.Series([1, 2, 3])\nprint((s * 2).tolist())\nprint(s.apply(lambda x: x * 2).tolist())",
      correct: '[2, 4, 6]\n[2, 4, 6]',
      wrong: ['[2, 4, 6]\n[1, 2, 3]', '[1, 2, 3]\n[2, 4, 6]', 'TypeError'],
      explain: 'Same answer, very different speed: the vectorised version runs in C over the whole array, while apply calls your Python function once per row. Reach for apply only when no vectorised equivalent exists.' }
  );
})();
