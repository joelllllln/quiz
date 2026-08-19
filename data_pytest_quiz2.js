/* Python coding test — "what does this print?", part 2.
   Sorting and copying, comprehension scope, and the pandas/NumPy behaviours that
   catch people out in a data test. Snippets marked `needs` load a package first. */
(function () {
  window.PYQUIZ = window.PYQUIZ || [];
  var PD = ['pandas', 'numpy'];

  window.PYQUIZ.push(

    { id: 'pq-sorted-key', group: 'Sorting & comparing', lvl: 2,
      code: "words = ['bb', 'a', 'ccc']\nprint(sorted(words))\nprint(sorted(words, key=len))",
      correct: "['a', 'bb', 'ccc']\n['a', 'bb', 'ccc']",
      wrong: ["['a', 'bb', 'ccc']\n['ccc', 'bb', 'a']", "['bb', 'a', 'ccc']\n['a', 'bb', 'ccc']", "['a', 'bb', 'ccc']\n['bb', 'a', 'ccc']"],
      explain: 'Both give the same answer here — alphabetical and by-length happen to agree. The point is that key= changes what is compared, not what is returned.' },

    { id: 'pq-sort-tuple', group: 'Sorting & comparing', lvl: 3,
      code: "rows = [('b', 2), ('a', 2), ('c', 1)]\nprint(sorted(rows, key=lambda r: (r[1], r[0])))",
      correct: "[('c', 1), ('a', 2), ('b', 2)]",
      wrong: ["[('a', 2), ('b', 2), ('c', 1)]", "[('c', 1), ('b', 2), ('a', 2)]", "[('b', 2), ('a', 2), ('c', 1)]"],
      explain: 'A tuple key sorts by the first element, then breaks ties with the second: 1 comes before 2, and within the 2s "a" beats "b".' },

    { id: 'pq-sort-stable', group: 'Sorting & comparing', lvl: 3,
      code: "rows = [('b', 1), ('a', 1)]\nprint(sorted(rows, key=lambda r: r[1]))",
      correct: "[('b', 1), ('a', 1)]",
      wrong: ["[('a', 1), ('b', 1)]", "[('b', 1), ('b', 1)]", 'TypeError'],
      explain: "Python's sort is stable: items that compare equal keep their original order. That is what lets you sort by one column and then another to get a two-level sort." },

    { id: 'pq-max-key', group: 'Sorting & comparing', lvl: 2,
      code: "d = {'a': 3, 'b': 9}\nprint(max(d))\nprint(max(d, key=d.get))",
      correct: 'b\nb',
      wrong: ['a\nb', '9\nb', "('b', 9)\nb"],
      explain: 'max(d) compares the KEYS, so "b" wins alphabetically. max(d, key=d.get) scores each key by its value — here they agree, but on {"z": 1, "a": 9} they would not.' },

    { id: 'pq-min-empty', group: 'Sorting & comparing', lvl: 2,
      code: "try:\n    print(max([]))\nexcept ValueError:\n    print('ValueError')\nprint(max([], default=0))",
      correct: 'ValueError\n0',
      wrong: ['None\n0', '0\n0', 'ValueError\nValueError'],
      explain: 'max() on an empty sequence raises. The default= argument is the clean way to say "and if there is nothing, use this".' },

    { id: 'pq-str-compare', group: 'Sorting & comparing', lvl: 2,
      code: "print('Zebra' < 'apple')\nprint('10' < '9')",
      correct: 'True\nTrue',
      wrong: ['False\nFalse', 'True\nFalse', 'False\nTrue'],
      explain: 'Strings compare by character codes: every capital letter sorts before every lowercase one, and "10" loses to "9" because "1" < "9". Sorting numbers as text is a classic data bug.' },

    { id: 'pq-comp-scope', group: 'Comprehensions', lvl: 3,
      code: 'x = 10\nvals = [x for x in range(3)]\nprint(x, vals)',
      correct: '10 [0, 1, 2]',
      wrong: ['2 [0, 1, 2]', '10 [10, 10, 10]', 'UnboundLocalError'],
      explain: 'In Python 3 a comprehension has its own scope, so its loop variable never leaks. In Python 2 it did, and x would have come out as 2.' },

    { id: 'pq-comp-nested', group: 'Comprehensions', lvl: 3,
      code: 'pairs = [(a, b) for a in [1, 2] for b in "xy"]\nprint(len(pairs), pairs[0], pairs[-1])',
      correct: "4 (1, 'x') (2, 'y')",
      wrong: ["2 (1, 'x') (2, 'y')", "4 (1, 'x') (2, 'x')", "4 ('x', 1) ('y', 2)"],
      explain: 'Nested loops in a comprehension read left to right, exactly like nested for-statements: the leftmost is the outer loop.' },

    { id: 'pq-comp-filter', group: 'Comprehensions', lvl: 2,
      code: 'nums = [1, 2, 3, 4]\nprint([n for n in nums if n % 2])\nprint([n if n % 2 else 0 for n in nums])',
      correct: '[1, 3]\n[1, 0, 3, 0]',
      wrong: ['[1, 3]\n[1, 3]', '[2, 4]\n[1, 0, 3, 0]', '[1, 3]\n[0, 2, 0, 4]'],
      explain: 'A trailing `if` FILTERS; an if/else at the front TRANSFORMS every element and keeps the length. n % 2 is truthy for odd numbers.' },

    { id: 'pq-copy-slice', group: 'Copying', lvl: 2,
      code: 'a = [1, 2, 3]\nb = a\nc = a[:]\na.append(4)\nprint(len(b), len(c))',
      correct: '4 3',
      wrong: ['4 4', '3 3', '3 4'],
      explain: 'b is another name for the same list, so it grows too. c was copied before the append, so it did not.' },

    { id: 'pq-dict-copy', group: 'Copying', lvl: 3,
      code: "a = {'x': {'y': 1}}\nb = a.copy()\nb['x']['y'] = 99\nprint(a['x']['y'])",
      correct: '99',
      wrong: ['1', 'KeyError', 'None'],
      explain: '.copy() is shallow: the outer dict is new, but both dicts point at the SAME inner dict. copy.deepcopy() is what separates them.' },

    { id: 'pq-tuple-mutable-inside', group: 'Copying', lvl: 3,
      code: "t = ([1], 2)\nt[0].append(3)\nprint(t)",
      correct: '([1, 3], 2)',
      wrong: ['TypeError', '([1], 2)', '([3], 2)'],
      explain: 'A tuple fixes which objects it holds, not what those objects contain. The list inside is still mutable — which is also why this tuple cannot be a dict key.' },

    { id: 'pq-int-cache', group: 'Copying', lvl: 3,
      code: 'a = [1, 2]\nb = [1, 2]\nprint(a == b, a is b, a[0] is b[0])',
      correct: 'True False True',
      wrong: ['True True True', 'True False False', 'False False True'],
      explain: 'The lists are equal but separate objects. The small integers inside them are shared — CPython caches -5 to 256 — which is exactly why `is` must never be used for value comparison.' },

    { id: 'pq-set-order', group: 'Sets & membership', lvl: 2,
      code: "s = {3, 1, 2}\nprint(sorted(s))\nprint(2 in s, 5 in s)",
      correct: '[1, 2, 3]\nTrue False',
      wrong: ['{1, 2, 3}\nTrue False', '[3, 1, 2]\nTrue False', '[1, 2, 3]\nFalse False'],
      explain: 'A set has no order you should rely on, so sort it before printing. Membership is O(1), which is why sets are the fix for a slow `in` on a big list.' },

    { id: 'pq-string-in-list', group: 'Sets & membership', lvl: 2,
      code: "print('a' in ['ab', 'cd'])\nprint('a' in 'abc')",
      correct: 'False\nTrue',
      wrong: ['True\nTrue', 'False\nFalse', 'True\nFalse'],
      explain: '`in` on a LIST asks whether an element equals it — "a" is not "ab". `in` on a STRING asks whether it appears as a substring. Same operator, two meanings.' },

    { id: 'pq-chained-compare', group: 'Numbers & truthiness', lvl: 3,
      code: 'x = 5\nprint(1 < x < 10)\nprint(1 < x > 3)',
      correct: 'True\nTrue',
      wrong: ['True\nFalse', 'False\nTrue', 'SyntaxError'],
      explain: 'Python chains comparisons: a < b < c means (a < b) and (b < c), with b evaluated once. It works even when the directions are mixed, though that reads badly.' },

    { id: 'pq-or-default', group: 'Numbers & truthiness', lvl: 3,
      code: "def f(n=None):\n    n = n or 10\n    return n\n\nprint(f(), f(0), f(5))",
      correct: '10 10 5',
      wrong: ['10 0 5', 'None 0 5', '10 10 10'],
      explain: '`or` falls through on any falsy value, and 0 is falsy — so a genuine zero gets replaced by the default. Use `if n is None` when zero is a legitimate value.' },

    { id: 'pq-string-format-dict', group: 'Strings', lvl: 2,
      code: "d = {'n': 3}\nprint('count: {n}'.format(**d))\nprint(f\"count: {d['n']}\")",
      correct: 'count: 3\ncount: 3',
      wrong: ['count: {n}\ncount: 3', 'KeyError', "count: 3\ncount: {d['n']}"],
      explain: '**d unpacks the dict into keyword arguments for format(). The f-string does the same job inline and is usually clearer.' },

    { id: 'pq-strip-chars', group: 'Strings', lvl: 3,
      code: "print('xxhelloxx'.strip('x'))\nprint('mississippi'.strip('mip'))",
      correct: 'hello\nssiss',
      wrong: ['hello\nss', 'helloxx\nssiss', 'hello\nmississippi'],
      explain: 'strip() with an argument removes any of THOSE characters from both ends, repeatedly, and stops at the first character not in the set — it is a character set, not a substring. "mississippi" loses "mi" from the front and "ippi" from the back, leaving "ssiss".' },

    { id: 'pq-multiline-list', group: 'Lists & mutation', lvl: 3,
      code: 'grid = [[0] * 2] * 2\ngrid[0][0] = 9\nprint(grid)',
      correct: '[[9, 0], [9, 0]]',
      wrong: ['[[9, 0], [0, 0]]', '[[9, 9], [0, 0]]', '[[9, 9], [9, 9]]'],
      explain: 'Multiplying a list repeats the REFERENCE, so both rows are the same list. Build rows with a comprehension instead: [[0] * 2 for _ in range(2)].' },

    { id: 'pq-np-broadcast', group: 'NumPy & pandas', lvl: 2, needs: PD,
      code: 'import numpy as np\na = np.array([1, 2, 3])\nprint(a * 2)\nprint(a + np.array([10, 20, 30]))',
      correct: '[2 4 6]\n[11 22 33]',
      wrong: ['[1 2 3 1 2 3]\n[11 22 33]', '[2 4 6]\n[1 2 3 10 20 30]', 'TypeError'],
      explain: 'Arrays do arithmetic elementwise — unlike a Python list, where * repeats and + concatenates. That difference is the whole reason NumPy exists.' },

    { id: 'pq-np-view', group: 'NumPy & pandas', lvl: 3, needs: PD,
      code: 'import numpy as np\na = np.array([1, 2, 3])\nb = a[:2]\nb[0] = 99\nprint(a)',
      correct: '[99  2  3]',
      wrong: ['[1 2 3]', '[99 2]', '[99 99 3]'],
      explain: 'A NumPy slice is a VIEW onto the same memory, not a copy — so writing through it changes the original. a[:2].copy() is what detaches it. (Python list slices do copy.)' },

    { id: 'pq-np-nan', group: 'NumPy & pandas', lvl: 2, needs: PD,
      code: 'import numpy as np\nprint(np.nan == np.nan)\nprint(np.isnan(np.nan))',
      correct: 'False\nTrue',
      wrong: ['True\nTrue', 'False\nFalse', 'True\nFalse'],
      explain: 'NaN is not equal to anything, including itself — that is in the floating-point standard. Always test for missing values with isna/isnan, never with ==.' },

    { id: 'pq-pd-copy-warning', group: 'NumPy & pandas', lvl: 3, needs: PD,
      code: "import pandas as pd\ndf = pd.DataFrame({'a': [1, 2, 3]})\nsub = df[df['a'] > 1]\nsub['a'] = 0\nprint(list(df['a']))",
      correct: '[1, 2, 3]',
      wrong: ['[1, 0, 0]', '[0, 0, 0]', 'SettingWithCopyError'],
      explain: 'The filtered frame is a separate object, so the original is untouched — which is the point: assigning to a filtered copy silently changes nothing you can see. Use df.loc[mask, "a"] = 0 to edit the real frame.' },

    { id: 'pq-pd-mean-nan', group: 'NumPy & pandas', lvl: 2, needs: PD,
      code: "import pandas as pd\nimport numpy as np\ns = pd.Series([1, 2, np.nan])\nprint(s.mean())\nprint(s.sum())\nprint(len(s))",
      correct: '1.5\n3.0\n3',
      wrong: ['nan\nnan\n3', '1.0\n3.0\n3', '1.5\n3.0\n2'],
      explain: 'pandas skips missing values in mean() and sum() by default — so the mean divides by 2, not 3 — while len() still counts every row. NumPy would have returned nan for both.' },

    { id: 'pq-pd-index-align', group: 'NumPy & pandas', lvl: 3, needs: PD,
      code: "import pandas as pd\na = pd.Series([1, 2], index=['x', 'y'])\nb = pd.Series([10, 20], index=['y', 'z'])\nprint((a + b).to_dict())",
      correct: "{'x': nan, 'y': 12.0, 'z': nan}",
      wrong: ["{'x': 11.0, 'y': 22.0}", "{'y': 12.0}", "{'x': 1.0, 'y': 12.0, 'z': 20.0}"],
      explain: 'pandas aligns on the INDEX before doing arithmetic, not on position. Labels present in only one side come out as NaN — the usual cause of a column that mysteriously fills with missing values after a merge or a reset_index you forgot.' },

    { id: 'pq-pd-value-counts-na', group: 'NumPy & pandas', lvl: 2, needs: PD,
      code: "import pandas as pd\nimport numpy as np\ns = pd.Series(['a', 'a', np.nan])\nprint(s.value_counts().to_dict())\nprint(s.value_counts(dropna=False).to_dict())",
      correct: "{'a': 2}\n{'a': 2, nan: 1}",
      wrong: ["{'a': 2, nan: 1}\n{'a': 2, nan: 1}", "{'a': 2}\n{'a': 2}", "{'a': 3}\n{'a': 2, nan: 1}"],
      explain: 'value_counts() drops missing values unless you ask for them. If you are using it to audit a column, dropna=False is the version that tells the truth.' },

    { id: 'pq-pd-groupby-nan', group: 'NumPy & pandas', lvl: 3, needs: PD,
      code: "import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({'k': ['a', np.nan], 'v': [1, 2]})\nprint(int(df.groupby('k')['v'].sum().sum()))",
      correct: '1',
      wrong: ['3', '2', '0'],
      explain: 'groupby drops rows whose key is missing, so the row with value 2 vanishes from the total entirely. dropna=False keeps them as their own group. Quiet data loss like this is why you check row counts after every groupby.' }
  );
})();
