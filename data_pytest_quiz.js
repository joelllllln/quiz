/* Python coding test — "what does this print?" multiple choice.
   The opening section of nearly every screening test: short snippets where the
   answer turns on how Python actually behaves. Every snippet here has been run;
   `correct` is its real output. */
(function () {
  window.PYQUIZ = window.PYQUIZ || [];

  window.PYQUIZ.push(

    { id: 'pq-intdiv', group: 'Numbers & truthiness', lvl: 1,
      code: 'print(7 / 2)\nprint(7 // 2)',
      correct: '3.5\n3',
      wrong: ['3\n3', '3.5\n3.5', '3\n3.5'],
      explain: 'A single slash always gives a float in Python 3, even when it divides evenly. Double slash is floor division and keeps the whole part.' },

    { id: 'pq-floor-neg', group: 'Numbers & truthiness', lvl: 3,
      code: 'print(-7 // 2)\nprint(-7 % 2)',
      correct: '-4\n1',
      wrong: ['-3\n-1', '-4\n-1', '-3\n1'],
      explain: 'Floor division rounds DOWN, not towards zero, so -3.5 becomes -4. Python\'s modulo then takes the sign of the divisor, which is why the remainder is +1.' },

    { id: 'pq-float-eq', group: 'Numbers & truthiness', lvl: 2,
      code: 'print(0.1 + 0.2 == 0.3)\nprint(round(0.1 + 0.2, 2) == 0.3)',
      correct: 'False\nTrue',
      wrong: ['True\nTrue', 'False\nFalse', 'True\nFalse'],
      explain: 'Binary floating point cannot store 0.1 exactly, so the sum is 0.30000000000000004. Never compare floats with == — round first, or use math.isclose.' },

    { id: 'pq-round-half', group: 'Numbers & truthiness', lvl: 3,
      code: 'print(round(2.5))\nprint(round(3.5))',
      correct: '2\n4',
      wrong: ['3\n4', '2\n3', '3\n3'],
      explain: 'Python uses banker\'s rounding: exact halves go to the nearest EVEN number. It keeps large sums unbiased, and it surprises everyone once.' },

    { id: 'pq-bool-int', group: 'Numbers & truthiness', lvl: 2,
      code: 'print(True + True)\nprint(sum([True, False, True]))',
      correct: '2\n2',
      wrong: ['TypeError', '1\n2', '2\n1'],
      explain: 'bool is a subclass of int: True is 1 and False is 0. That is exactly why summing a boolean mask counts the Trues.' },

    { id: 'pq-truthy', group: 'Numbers & truthiness', lvl: 2,
      code: "print(bool([]), bool([0]), bool(''), bool('0'))",
      correct: 'False True False True',
      wrong: ['False False False False', 'False True False False', 'True True False True'],
      explain: 'Empty containers and empty strings are falsy. A list holding a zero is NOT empty, and the string "0" is not empty either — both are truthy.' },

    { id: 'pq-none-eq', group: 'Numbers & truthiness', lvl: 2,
      code: 'x = None\nprint(x == None, x is None, bool(x))',
      correct: 'True True False',
      wrong: ['True True True', 'False True False', 'True False False'],
      explain: 'Both comparisons are True, but `is None` is the idiom — it checks identity and cannot be fooled by a class that overrides __eq__.' },

    { id: 'pq-string-immutable', group: 'Strings', lvl: 1,
      code: "s = 'hello'\ns.upper()\nprint(s)",
      correct: 'hello',
      wrong: ['HELLO', 'Hello', 'None'],
      explain: 'Strings are immutable. upper() returns a NEW string; ignoring the return value throws the change away. You needed s = s.upper().' },

    { id: 'pq-slice-oob', group: 'Strings', lvl: 2,
      code: "s = 'abc'\nprint(s[1:99])\nprint(s[99:])",
      correct: 'bc\n',
      wrong: ['IndexError', 'bc\nabc', 'bc\nc'],
      explain: 'Slicing never raises for out-of-range bounds — it clamps. Indexing with s[99] would raise IndexError; slicing just gives you what exists, here an empty string.' },

    { id: 'pq-split-empty', group: 'Strings', lvl: 3,
      code: "print('a  b'.split(' '))\nprint('a  b'.split())",
      correct: "['a', '', 'b']\n['a', 'b']",
      wrong: ["['a', 'b']\n['a', 'b']", "['a', '', 'b']\n['a', '', 'b']", "['a b']\n['a', 'b']"],
      explain: 'split(" ") splits on every single space and keeps the empty piece between doubled spaces. split() with no argument splits on runs of whitespace and drops the empties — almost always what you want.' },

    { id: 'pq-join-type', group: 'Strings', lvl: 2,
      code: "print('-'.join(['a', 'b', 'c']))",
      correct: 'a-b-c',
      wrong: ['abc', "['a', 'b', 'c']", 'a-b-c-'],
      explain: 'join is a method on the SEPARATOR, taking the list as its argument. No trailing separator is added.' },

    { id: 'pq-str-mult', group: 'Strings', lvl: 1,
      code: "print('ab' * 3)\nprint([0] * 3)",
      correct: 'ababab\n[0, 0, 0]',
      wrong: ['ab3\n[0, 0, 0]', 'TypeError', 'ababab\n[0]'],
      explain: 'Multiplying a sequence repeats it. [0] * 3 is the standard way to make a fixed-size list of zeros.' },

    { id: 'pq-fstring-fmt', group: 'Strings', lvl: 2,
      code: 'x = 3.14159\nprint(f"{x:.2f}")\nprint(f"{0.256:.1%}")',
      correct: '3.14\n25.6%',
      wrong: ['3.142\n25.6%', '3.14\n0.3%', '3.14\n26%'],
      explain: '.2f rounds to two decimal places; .1% multiplies by 100, adds the sign and rounds to one decimal.' },

    { id: 'pq-list-alias', group: 'Lists & mutation', lvl: 2,
      code: 'a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)',
      correct: '[1, 2, 3, 4]',
      wrong: ['[1, 2, 3]', '[4]', '[1, 2, 3, [4]]'],
      explain: 'b = a does not copy — both names point at the same list. Use a.copy(), a[:] or list(a) when you want a separate one.' },

    { id: 'pq-list-copy', group: 'Lists & mutation', lvl: 2,
      code: 'a = [1, 2, 3]\nb = a[:]\nb.append(4)\nprint(a, b)',
      correct: '[1, 2, 3] [1, 2, 3, 4]',
      wrong: ['[1, 2, 3, 4] [1, 2, 3, 4]', '[1, 2, 3] [4]', '[1, 2, 3] [1, 2, 3]'],
      explain: 'A full slice makes a shallow copy, so the two lists are now independent — at the top level at least.' },

    { id: 'pq-nested-copy', group: 'Lists & mutation', lvl: 3,
      code: 'a = [[1], [2]]\nb = a[:]\nb[0].append(99)\nprint(a)',
      correct: '[[1, 99], [2]]',
      wrong: ['[[1], [2]]', '[[1, 99], [2, 99]]', '[[99], [2]]'],
      explain: 'A shallow copy copies the OUTER list only — the inner lists are still shared. copy.deepcopy() is what fully detaches them.' },

    { id: 'pq-sort-return', group: 'Lists & mutation', lvl: 1,
      code: 'a = [3, 1, 2]\nb = a.sort()\nprint(a, b)',
      correct: '[1, 2, 3] None',
      wrong: ['[1, 2, 3] [1, 2, 3]', '[3, 1, 2] [1, 2, 3]', '[3, 1, 2] None'],
      explain: '.sort() sorts in place and returns None. sorted(a) is the one that returns a new list — assigning the result of .sort() is a classic bug.' },

    { id: 'pq-mutable-default', group: 'Lists & mutation', lvl: 3,
      code: 'def add(x, items=[]):\n    items.append(x)\n    return items\n\nprint(add(1))\nprint(add(2))',
      correct: '[1]\n[1, 2]',
      wrong: ['[1]\n[2]', '[1]\n[1]', '[1, 2]\n[1, 2]'],
      explain: 'The default list is created ONCE, when the function is defined, and then shared by every call. Use items=None and build a fresh list inside — this is the most-asked Python gotcha there is.' },

    { id: 'pq-list-remove-loop', group: 'Lists & mutation', lvl: 3,
      code: 'nums = [1, 2, 3, 4]\nfor n in nums:\n    if n % 2 == 0:\n        nums.remove(n)\nprint(nums)',
      correct: '[1, 3]',
      wrong: ['[1, 3, 4]', '[1, 2, 3, 4]', '[2, 4]'],
      explain: 'Here it happens to look right, but mutating a list while looping over it skips elements — the iterator keeps its position as items shift left. Build a new list instead: [n for n in nums if n % 2].' },

    { id: 'pq-extend-append', group: 'Lists & mutation', lvl: 2,
      code: "a = [1, 2]\na.append([3, 4])\nb = [1, 2]\nb.extend([3, 4])\nprint(a)\nprint(b)",
      correct: '[1, 2, [3, 4]]\n[1, 2, 3, 4]',
      wrong: ['[1, 2, 3, 4]\n[1, 2, 3, 4]', '[1, 2, [3, 4]]\n[1, 2, [3, 4]]', '[1, 2, 3, 4]\n[1, 2, [3, 4]]'],
      explain: 'append adds its argument as ONE element; extend adds each element of the iterable.' },

    { id: 'pq-slice-step', group: 'Lists & mutation', lvl: 2,
      code: 'a = [0, 1, 2, 3, 4, 5]\nprint(a[::2])\nprint(a[::-1])\nprint(a[-2:])',
      correct: '[0, 2, 4]\n[5, 4, 3, 2, 1, 0]\n[4, 5]',
      wrong: ['[0, 2, 4]\n[0, 1, 2, 3, 4, 5]\n[4, 5]', '[1, 3, 5]\n[5, 4, 3, 2, 1, 0]\n[4, 5]', '[0, 2, 4]\n[5, 4, 3, 2, 1, 0]\n[5]'],
      explain: 'The third slice number is the step. -1 walks backwards over the whole list; a negative start counts from the end.' },

    { id: 'pq-dict-order', group: 'Dicts & sets', lvl: 2,
      code: "d = {'b': 1, 'a': 2}\nd['c'] = 3\nprint(list(d))",
      correct: "['b', 'a', 'c']",
      wrong: ["['a', 'b', 'c']", "['c', 'b', 'a']", "['b', 'a']"],
      explain: 'Since Python 3.7 dicts keep insertion order — not sorted order. Iterating a dict gives its keys.' },

    { id: 'pq-dict-get', group: 'Dicts & sets', lvl: 1,
      code: "d = {'a': 1}\nprint(d.get('b'))\nprint(d.get('b', 0))",
      correct: 'None\n0',
      wrong: ['KeyError', '0\n0', 'None\nNone'],
      explain: '.get() returns None for a missing key instead of raising, and takes an optional default. d["b"] would raise KeyError.' },

    { id: 'pq-dict-dup-key', group: 'Dicts & sets', lvl: 2,
      code: "d = {'a': 1, 'b': 2, 'a': 3}\nprint(d)",
      correct: "{'a': 3, 'b': 2}",
      wrong: ["{'a': 1, 'b': 2}", "SyntaxError", "{'a': 1, 'b': 2, 'a': 3}"],
      explain: 'A repeated key is not an error — the last value simply wins, and the key keeps its ORIGINAL position.' },

    { id: 'pq-set-dedupe', group: 'Dicts & sets', lvl: 1,
      code: 'print(sorted(set([3, 1, 2, 3, 1])))\nprint(len({1, 1, 1}))',
      correct: '[1, 2, 3]\n1',
      wrong: ['[3, 1, 2]\n1', '[1, 2, 3]\n3', '[1, 1, 2, 3, 3]\n1'],
      explain: 'A set holds each value once and has no order — sorting it is how you get a predictable result to print.' },

    { id: 'pq-set-literal', group: 'Dicts & sets', lvl: 3,
      code: "print(type({}))\nprint(type({1}))",
      correct: "<class 'dict'>\n<class 'set'>",
      wrong: ["<class 'set'>\n<class 'set'>", "<class 'dict'>\n<class 'dict'>", "<class 'set'>\n<class 'dict'>"],
      explain: 'Empty curly braces make a DICT, not a set. The only way to write an empty set is set().' },

    { id: 'pq-tuple-immutable', group: 'Dicts & sets', lvl: 2,
      code: 't = (1, 2, 3)\ntry:\n    t[0] = 9\nexcept TypeError as e:\n    print("TypeError")\nprint(t)',
      correct: 'TypeError\n(1, 2, 3)',
      wrong: ['(9, 2, 3)', 'TypeError\n(9, 2, 3)', 'IndexError\n(1, 2, 3)'],
      explain: 'Tuples cannot be changed after they are made — that immutability is exactly what lets them be dict keys and set members.' },

    { id: 'pq-in-dict', group: 'Dicts & sets', lvl: 2,
      code: "d = {'a': 1, 'b': 2}\nprint('a' in d)\nprint(1 in d)",
      correct: 'True\nFalse',
      wrong: ['True\nTrue', 'False\nTrue', 'False\nFalse'],
      explain: '`in` on a dict checks the KEYS. To search the values you need `1 in d.values()`.' },

    { id: 'pq-scope', group: 'Functions & scope', lvl: 3,
      code: 'x = 10\n\ndef f():\n    x = 20\n\nf()\nprint(x)',
      correct: '10',
      wrong: ['20', 'None', 'UnboundLocalError'],
      explain: 'Assigning inside a function creates a NEW local name. Changing the module-level one would need `global x` — which is usually a sign to return a value instead.' },

    { id: 'pq-args-mutable', group: 'Functions & scope', lvl: 3,
      code: 'def f(items):\n    items.append(4)\n\na = [1, 2, 3]\nf(a)\nprint(a)',
      correct: '[1, 2, 3, 4]',
      wrong: ['[1, 2, 3]', 'None', '[4]'],
      explain: 'Arguments are passed by reference to the same object. Mutating a list inside a function is visible outside it; rebinding the name (items = [...]) would not be.' },

    { id: 'pq-return-none', group: 'Functions & scope', lvl: 1,
      code: 'def f(x):\n    y = x * 2\n\nprint(f(3))',
      correct: 'None',
      wrong: ['6', '0', 'Nothing is printed'],
      explain: 'A function with no return statement returns None. The forgotten `return` is the single most common reason a coding test fails on every case at once.' },

    { id: 'pq-lambda-late', group: 'Functions & scope', lvl: 3,
      code: 'fs = [lambda: i for i in range(3)]\nprint([f() for f in fs])',
      correct: '[2, 2, 2]',
      wrong: ['[0, 1, 2]', '[0, 0, 0]', '[3, 3, 3]'],
      explain: 'The lambdas capture the VARIABLE i, not its value at the time. By the time they run, the loop has finished and i is 2. The fix is a default argument: lambda i=i: i.' },

    { id: 'pq-args-count', group: 'Functions & scope', lvl: 2,
      code: 'def f(*args, **kwargs):\n    print(len(args), len(kwargs))\n\nf(1, 2, a=3)',
      correct: '2 1',
      wrong: ['3 0', '2 3', '1 2'],
      explain: '*args collects the positional arguments into a tuple, **kwargs the keyword ones into a dict.' },

    { id: 'pq-range-lazy', group: 'Loops & iteration', lvl: 2,
      code: 'r = range(3)\nprint(r)\nprint(list(r))',
      correct: 'range(0, 3)\n[0, 1, 2]',
      wrong: ['[0, 1, 2]\n[0, 1, 2]', '(0, 1, 2)\n[0, 1, 2]', '[0, 1, 2, 3]\n[0, 1, 2]'],
      explain: 'range is lazy — it generates numbers as you ask for them rather than storing a list. Wrap it in list() to see the values.' },

    { id: 'pq-enumerate-start', group: 'Loops & iteration', lvl: 2,
      code: "for i, ch in enumerate('ab', 1):\n    print(i, ch)",
      correct: '1 a\n2 b',
      wrong: ['0 a\n1 b', '1 a\n2 b\n3 ', 'a 1\nb 2'],
      explain: 'The second argument of enumerate sets the starting number. The index comes first in the pair.' },

    { id: 'pq-zip-short', group: 'Loops & iteration', lvl: 2,
      code: "print(list(zip([1, 2, 3], ['a', 'b'])))",
      correct: "[(1, 'a'), (2, 'b')]",
      wrong: ["[(1, 'a'), (2, 'b'), (3, None)]", 'ValueError', "[(1, 'a'), (2, 'b'), (3, '')]"],
      explain: 'zip stops at the shortest input, silently. If a length mismatch would be a bug, zip(..., strict=True) raises instead (Python 3.10+).' },

    { id: 'pq-generator-once', group: 'Loops & iteration', lvl: 3,
      code: 'g = (x for x in range(3))\nprint(sum(g))\nprint(sum(g))',
      correct: '3\n0',
      wrong: ['3\n3', '3\nNone', '0\n0'],
      explain: 'A generator is exhausted after one pass. The second sum sees nothing left. Lists can be walked again; generators cannot.' },

    { id: 'pq-break-else', group: 'Loops & iteration', lvl: 3,
      code: "for n in [1, 2, 3]:\n    if n == 5:\n        break\nelse:\n    print('not found')",
      correct: 'not found',
      wrong: ['Nothing is printed', 'found', 'SyntaxError'],
      explain: "A loop's else block runs when the loop finished WITHOUT hitting break. It reads badly, which is why most people write a flag or a function instead." },

    { id: 'pq-string-concat-loop', group: 'Loops & iteration', lvl: 2,
      code: "out = ''\nfor ch in 'abc':\n    out += ch.upper()\nprint(out)",
      correct: 'ABC',
      wrong: ['abc', 'CBA', 'A'],
      explain: 'Correct, but each += builds a whole new string. On long loops use a list and join at the end.' },

    { id: 'pq-except-order', group: 'Errors', lvl: 3,
      code: "try:\n    x = int('abc')\nexcept ValueError:\n    print('bad number')\nexcept Exception:\n    print('something else')",
      correct: 'bad number',
      wrong: ['something else', 'ValueError', 'bad number\nsomething else'],
      explain: 'The first matching except wins, and only one runs. Order them narrowest first — a bare Exception at the top would swallow everything.' },

    { id: 'pq-finally', group: 'Errors', lvl: 3,
      code: "def f():\n    try:\n        return 'try'\n    finally:\n        print('finally')\n\nprint(f())",
      correct: 'finally\ntry',
      wrong: ['try\nfinally', 'try', 'finally'],
      explain: 'finally runs even when the try block returns — and it runs BEFORE the value is handed back, which is why the printing happens first.' },

    { id: 'pq-index-error', group: 'Errors', lvl: 2,
      code: "a = [1, 2, 3]\ntry:\n    print(a[5])\nexcept IndexError:\n    print('IndexError')",
      correct: 'IndexError',
      wrong: ['None', '3', 'KeyError'],
      explain: 'Lists raise IndexError for a position that does not exist; dicts raise KeyError for a missing key.' },

    { id: 'pq-mutable-key', group: 'Errors', lvl: 3,
      code: "try:\n    d = {[1, 2]: 'x'}\nexcept TypeError:\n    print('unhashable')",
      correct: 'unhashable',
      wrong: ["{'[1, 2]': 'x'}", 'KeyError', 'ValueError'],
      explain: 'Dict keys must be hashable, and lists are mutable so they are not. A tuple (1, 2) would work perfectly.' },

    { id: 'pq-class-shared', group: 'Classes', lvl: 3,
      code: "class Dog:\n    tricks = []\n\n    def __init__(self, name):\n        self.name = name\n\na = Dog('a')\nb = Dog('b')\na.tricks.append('sit')\nprint(b.tricks)",
      correct: "['sit']",
      wrong: ['[]', "['sit', 'sit']", 'AttributeError'],
      explain: 'A list defined in the class body is shared by every instance — the same trap as a mutable default argument. Create it in __init__ instead: self.tricks = [].' },

    { id: 'pq-self', group: 'Classes', lvl: 2,
      code: "class C:\n    def __init__(self):\n        self.x = 1\n\n    def get(self):\n        return self.x\n\nprint(C().get())",
      correct: '1',
      wrong: ['TypeError', 'None', '0'],
      explain: 'C() creates the instance and runs __init__; calling .get() passes that instance in as self automatically.' },

    { id: 'pq-is-vs-eq', group: 'Classes', lvl: 3,
      code: 'a = [1, 2]\nb = [1, 2]\nprint(a == b, a is b)',
      correct: 'True False',
      wrong: ['True True', 'False False', 'False True'],
      explain: '== compares contents; `is` asks whether they are literally the same object in memory. Use `is` only for None, True and False.' }
  );
})();
