/* Output questions — the second half of the language: generators, classes, regex,
   scope and the small print of the standard library. What does this print? */
(function () {
  window.PYQUIZ = window.PYQUIZ || [];

  window.PYQUIZ.push(

    /* ---- generators & iteration ---- */
    { id: 'pq5-gen-lazy', group: 'Generators', lvl: 2,
      code: "def gen():\n    print('start')\n    yield 1\n\ng = gen()\nprint('made')\nprint(next(g))",
      correct: 'made\nstart\n1',
      wrong: ['start\nmade\n1', 'made\n1', 'start\n1\nmade'],
      explain: 'Calling a generator function runs none of its body — it hands back a generator object. The body only starts on the first next().' },

    { id: 'pq5-gen-exhausted', group: 'Generators', lvl: 2,
      code: 'g = (n for n in [1, 2])\nprint(sum(g))\nprint(sum(g))',
      correct: '3\n0',
      wrong: ['3\n3', '3\nNone', '0\n0'],
      explain: 'A generator can only be walked once. The second sum finds it already exhausted, so it totals nothing.' },

    { id: 'pq5-zip-shorter', group: 'Generators', lvl: 2,
      code: "a = [1, 2, 3]\nb = ['x', 'y']\nprint(list(zip(a, b)))",
      correct: "[(1, 'x'), (2, 'y')]",
      wrong: ["[(1, 'x'), (2, 'y'), (3, None)]", "[(1, 'x'), (2, 'y'), (3, '')]", 'ValueError'],
      explain: 'zip stops at the shortest input and says nothing about it. Pass strict=True if a length mismatch should raise.' },

    { id: 'pq5-enumerate-start', group: 'Generators', lvl: 1,
      code: "for i, c in enumerate('ab', start=1):\n    print(i, c)",
      correct: '1 a\n2 b',
      wrong: ['0 a\n1 b', '1 a\n2 b\n3 ', 'a 1\nb 2'],
      explain: 'enumerate yields (index, value) pairs, and start shifts where the counting begins.' },

    { id: 'pq5-islice', group: 'Generators', lvl: 3,
      code: 'from itertools import islice\n\nprint(list(islice(range(10), 3)))',
      correct: '[0, 1, 2]',
      wrong: ['[3]', '[0, 1, 2, 3]', '[1, 2, 3]'],
      explain: 'islice is slicing for anything lazy: it takes the first three values and stops there.' },

    { id: 'pq5-next-default', group: 'Generators', lvl: 3,
      code: 'nums = [1, 2, 3]\nprint(next((n for n in nums if n > 10), -1))',
      correct: '-1',
      wrong: ['None', 'StopIteration', '[]'],
      explain: 'next() with a second argument returns that fallback instead of raising when the generator is empty.' },

    /* ---- functions & scope ---- */
    { id: 'pq5-default-mutable', group: 'Functions & scope', lvl: 3,
      code: 'def add(item, bag=[]):\n    bag.append(item)\n    return bag\n\nprint(add(1))\nprint(add(2))',
      correct: '[1]\n[1, 2]',
      wrong: ['[1]\n[2]', '[1]\n[1]', '[1, 2]\n[1, 2]'],
      explain: 'The default list is created once, when the function is defined, so every call keeps appending to the same list. Use None as the default instead.' },

    { id: 'pq5-late-binding', group: 'Functions & scope', lvl: 3,
      code: 'fns = [lambda: i for i in range(3)]\nprint([f() for f in fns])',
      correct: '[2, 2, 2]',
      wrong: ['[0, 1, 2]', '[0, 0, 0]', '[3, 3, 3]'],
      explain: 'The lambdas look up i when they are CALLED, by which time the loop has finished and i is 2. Capture it with a default argument: lambda i=i: i.' },

    { id: 'pq5-global-rebind', group: 'Functions & scope', lvl: 2,
      code: 'count = 0\n\ndef bump():\n    count = 1\n\nbump()\nprint(count)',
      correct: '0',
      wrong: ['1', 'None', 'UnboundLocalError'],
      explain: 'Assigning inside a function makes a NEW local name. The outer count is untouched unless you declare global count.' },

    { id: 'pq5-arg-mutation', group: 'Functions & scope', lvl: 2,
      code: 'def wipe(items):\n    items = []\n\nnums = [1, 2]\nwipe(nums)\nprint(nums)',
      correct: '[1, 2]',
      wrong: ['[]', 'None', 'TypeError'],
      explain: 'Rebinding the parameter only changes the local name. items.clear() WOULD have emptied the caller\'s list — mutating and rebinding are different things.' },

    { id: 'pq5-return-none', group: 'Functions & scope', lvl: 1,
      code: 'def double(n):\n    n * 2\n\nprint(double(4))',
      correct: 'None',
      wrong: ['8', '0', 'nothing at all'],
      explain: 'A function with no return statement returns None. Computing a value is not the same as handing it back.' },

    { id: 'pq5-kwargs', group: 'Functions & scope', lvl: 3,
      code: "def show(**kwargs):\n    print(kwargs)\n\nshow(a=1, b=2)",
      correct: "{'a': 1, 'b': 2}",
      wrong: ['(1, 2)', "['a', 'b']", "{'a', 'b'}"],
      explain: '**kwargs collects keyword arguments into a dict; *args collects positional ones into a tuple.' },

    /* ---- classes ---- */
    { id: 'pq5-class-attr-shared', group: 'Classes', lvl: 3,
      code: 'class Dog:\n    tricks = []\n\na = Dog()\nb = Dog()\na.tricks.append("sit")\nprint(b.tricks)',
      correct: "['sit']",
      wrong: ['[]', "['sit', 'sit']", 'AttributeError'],
      explain: 'A mutable class attribute is shared by every instance. Per-object state belongs in __init__ as self.tricks = [].' },

    { id: 'pq5-class-shadow', group: 'Classes', lvl: 3,
      code: 'class C:\n    n = 1\n\nx = C()\nx.n = 5\nprint(C.n, x.n)',
      correct: '1 5',
      wrong: ['5 5', '1 1', '5 1'],
      explain: 'Assigning through the instance creates an instance attribute that shadows the class one. The class attribute itself never changed.' },

    { id: 'pq5-repr-default', group: 'Classes', lvl: 2,
      code: "class P:\n    def __init__(self, n):\n        self.n = n\n\n    def __repr__(self):\n        return f'P({self.n})'\n\nprint([P(1), P(2)])",
      correct: '[P(1), P(2)]',
      wrong: ['[1, 2]', '[<P>, <P>]', 'TypeError'],
      explain: 'Printing a list shows each element\'s __repr__, not __str__ — which is why __repr__ is the one worth defining.' },

    { id: 'pq5-eq-default', group: 'Classes', lvl: 3,
      code: 'class P:\n    def __init__(self, n):\n        self.n = n\n\nprint(P(1) == P(1))',
      correct: 'False',
      wrong: ['True', 'None', 'TypeError'],
      explain: 'Without __eq__, two objects are equal only if they are the same object. A dataclass writes that comparison for you.' },

    { id: 'pq5-super-call', group: 'Classes', lvl: 3,
      code: "class A:\n    def hi(self):\n        return 'A'\n\nclass B(A):\n    def hi(self):\n        return super().hi() + 'B'\n\nprint(B().hi())",
      correct: 'AB',
      wrong: ['A', 'B', 'BA'],
      explain: 'The child overrides the method, and super() lets it call the parent version first — so the two results join up.' },

    { id: 'pq5-dataclass-eq', group: 'Classes', lvl: 3,
      code: 'from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n\nprint(Point(1, 2) == Point(1, 2))',
      correct: 'True',
      wrong: ['False', 'TypeError', 'None'],
      explain: '@dataclass generates __init__, __repr__ and __eq__, so two points with the same values compare equal.' },

    /* ---- regex ---- */
    { id: 'pq5-re-findall-groups', group: 'Regex', lvl: 3,
      code: "import re\n\nprint(re.findall(r'(\\d)(\\d)', '12 34'))",
      correct: "[('1', '2'), ('3', '4')]",
      wrong: ["['12', '34']", "['1', '2', '3', '4']", "[('12',), ('34',)]"],
      explain: 'With capture groups, findall returns the groups rather than the whole matches — one tuple per match.' },

    { id: 'pq5-re-match-vs-search', group: 'Regex', lvl: 2,
      code: "import re\n\nprint(bool(re.match(r'\\d+', 'abc123')))\nprint(bool(re.search(r'\\d+', 'abc123')))",
      correct: 'False\nTrue',
      wrong: ['True\nTrue', 'False\nFalse', 'True\nFalse'],
      explain: 'match only anchors at the START of the string; search looks anywhere. That single difference causes a lot of wrong answers.' },

    { id: 'pq5-re-greedy', group: 'Regex', lvl: 3,
      code: "import re\n\nprint(re.findall(r'<.*>', '<a><b>'))\nprint(re.findall(r'<.*?>', '<a><b>'))",
      correct: "['<a><b>']\n['<a>', '<b>']",
      wrong: ["['<a>', '<b>']\n['<a><b>']", "['<a>', '<b>']\n['<a>', '<b>']", "['<a><b>']\n['<a><b>']"],
      explain: '.* is greedy and runs to the last possible bracket; .*? is lazy and stops at the first.' },

    { id: 'pq5-re-sub-count', group: 'Regex', lvl: 2,
      code: "import re\n\nprint(re.sub(r'a', '-', 'banana', count=2))",
      correct: 'b-n-na',
      wrong: ['b-n-n-', 'banana', '-----a'],
      explain: 'count caps the number of replacements, so only the first two a characters are replaced.' },

    { id: 'pq5-re-split', group: 'Regex', lvl: 3,
      code: "import re\n\nprint(re.split(r'\\s+', ' a  b '))",
      correct: "['', 'a', 'b', '']",
      wrong: ["['a', 'b']", "['', 'a', 'b']", "[' ', 'a', 'b', ' ']"],
      explain: 'A separator at the very start or end leaves an empty string on that side. text.split() with no argument would have trimmed them.' },

    /* ---- strings & formatting ---- */
    { id: 'pq5-fstring-format', group: 'Strings', lvl: 2,
      code: 'x = 3.14159\nprint(f"{x:.2f}")\nprint(f"{1234567:,}")',
      correct: '3.14\n1,234,567',
      wrong: ['3.14159\n1234567', '3.1\n1,234,567', '3.14\n1234567'],
      explain: 'The part after the colon is a format spec: .2f fixes two decimals, a comma groups thousands.' },

    { id: 'pq5-fstring-repr', group: 'Strings', lvl: 3,
      code: "name = 'Ada'\nprint(f'{name!r}')",
      correct: "'Ada'",
      wrong: ['Ada', 'name', '"Ada"'],
      explain: '!r formats using repr(), which keeps the quotes — invaluable when you are debugging whitespace.' },

    { id: 'pq5-split-maxsplit', group: 'Strings', lvl: 3,
      code: "print('a-b-c'.split('-', 1))",
      correct: "['a', 'b-c']",
      wrong: ["['a', 'b', 'c']", "['a']", "['a-b', 'c']"],
      explain: 'maxsplit stops after that many splits and leaves the rest of the string intact. rsplit does it from the right.' },

    { id: 'pq5-strip-chars', group: 'Strings', lvl: 3,
      code: "print('xxhelloxx'.strip('x'))\nprint('hello'.strip('lo'))",
      correct: 'hello\nhe',
      wrong: ['hello\nhello', 'helloxx\nhe', 'hello\nhel'],
      explain: 'strip removes any of the characters you list, from both ends, until it meets something else — it is not removing a substring.' },

    { id: 'pq5-join-nums', group: 'Strings', lvl: 2,
      code: "nums = [1, 2, 3]\nprint('-'.join(str(n) for n in nums))",
      correct: '1-2-3',
      wrong: ['123', "['1', '2', '3']", 'TypeError'],
      explain: 'join only takes strings, which is why the numbers are converted first. Joining them directly raises TypeError.' },

    /* ---- collections & the standard library ---- */
    { id: 'pq5-counter-most-common', group: 'Collections', lvl: 2,
      code: "from collections import Counter\n\nprint(Counter('mississippi').most_common(2))",
      correct: "[('i', 4), ('s', 4)]",
      wrong: ["[('s', 4), ('i', 4)]", "[('i', 4), ('p', 2)]", "[('m', 1), ('i', 4)]"],
      explain: 'most_common sorts by count, and ties keep the order the values were first seen — i appears before s.' },

    { id: 'pq5-defaultdict', group: 'Collections', lvl: 2,
      code: "from collections import defaultdict\n\nd = defaultdict(int)\nd['a'] += 1\nprint(dict(d))\nprint(d['zzz'])",
      correct: "{'a': 1}\n0",
      wrong: ["{'a': 1}\nKeyError", "{'a': 1, 'zzz': 0}\n0", "{}\n0"],
      explain: 'A missing key is created with the factory\'s value — int() is 0 — so += works on the first sighting and no KeyError happens.' },

    { id: 'pq5-deque-maxlen', group: 'Collections', lvl: 3,
      code: 'from collections import deque\n\nd = deque(maxlen=2)\nfor n in [1, 2, 3]:\n    d.append(n)\nprint(list(d))',
      correct: '[2, 3]',
      wrong: ['[1, 2]', '[1, 2, 3]', '[3]'],
      explain: 'A deque with maxlen quietly drops from the other end when it is full — a fixed-size window for free.' },

    { id: 'pq5-heapq-order', group: 'Collections', lvl: 3,
      code: 'import heapq\n\nh = [5, 1, 3]\nheapq.heapify(h)\nprint(heapq.heappop(h))',
      correct: '1',
      wrong: ['5', '3', '[1, 3, 5]'],
      explain: 'A heap always gives up its SMALLEST item first. For the largest, push the negatives or use heapq.nlargest.' },

    { id: 'pq5-setdefault', group: 'Collections', lvl: 3,
      code: "d = {}\nd.setdefault('a', []).append(1)\nd.setdefault('a', []).append(2)\nprint(d)",
      correct: "{'a': [1, 2]}",
      wrong: ["{'a': [2]}", "{'a': [1]}", "{'a': [[1], [2]]}"],
      explain: 'setdefault returns the existing value when the key is already there, so the second call appends to the same list.' },

    { id: 'pq5-dict-order', group: 'Collections', lvl: 2,
      code: "d = {'b': 1, 'a': 2}\nd['c'] = 3\nprint(list(d))",
      correct: "['b', 'a', 'c']",
      wrong: ["['a', 'b', 'c']", "['c', 'b', 'a']", "['b', 'a']"],
      explain: 'Since Python 3.7 a dict keeps insertion order — not sorted order. Looping a dict gives its KEYS.' },

    /* ---- errors & control flow ---- */
    { id: 'pq5-try-finally', group: 'Errors', lvl: 3,
      code: "def f():\n    try:\n        return 'try'\n    finally:\n        print('finally')\n\nprint(f())",
      correct: 'finally\ntry',
      wrong: ['try\nfinally', 'try', 'finally'],
      explain: 'finally runs before the function actually hands the value back — which is why it is the right place to close things.' },

    { id: 'pq5-try-else', group: 'Errors', lvl: 3,
      code: "try:\n    n = int('5')\nexcept ValueError:\n    print('bad')\nelse:\n    print('good', n)",
      correct: 'good 5',
      wrong: ['bad', 'good 5\nbad', '5'],
      explain: 'The else block of a try runs only when NO exception was raised — it keeps the risky line and the follow-up apart.' },

    { id: 'pq5-except-order', group: 'Errors', lvl: 3,
      code: "try:\n    1 / 0\nexcept ZeroDivisionError:\n    print('zero')\nexcept Exception:\n    print('general')",
      correct: 'zero',
      wrong: ['general', 'zero\ngeneral', 'ZeroDivisionError'],
      explain: 'The first matching except wins, so the specific one must come before the general one or it never runs.' },

    { id: 'pq5-loop-else', group: 'Errors', lvl: 3,
      code: "for n in [1, 2]:\n    if n == 3:\n        break\nelse:\n    print('never broke')",
      correct: 'never broke',
      wrong: ['nothing at all', 'broke', 'SyntaxError'],
      explain: 'A for loop\'s else runs when the loop finished WITHOUT a break — the "searched everything and found nothing" case.' },

    /* ---- numbers ---- */
    { id: 'pq5-round-half', group: 'Numbers', lvl: 3,
      code: 'print(round(0.5), round(1.5), round(2.5))',
      correct: '0 2 2',
      wrong: ['1 2 3', '0 1 2', '1 2 2'],
      explain: 'Python rounds halves to the nearest EVEN number, which keeps large sums unbiased. It surprises nearly everybody once.' },

    { id: 'pq5-float-sum', group: 'Numbers', lvl: 2,
      code: 'print(0.1 + 0.2 == 0.3)\nprint(round(0.1 + 0.2, 10) == 0.3)',
      correct: 'False\nTrue',
      wrong: ['True\nTrue', 'False\nFalse', 'True\nFalse'],
      explain: 'Binary floating point cannot hold 0.1 exactly. Compare with a tolerance — math.isclose or a round — never with ==.' },

    { id: 'pq5-divmod', group: 'Numbers', lvl: 2,
      code: 'print(divmod(17, 5))',
      correct: '(3, 2)',
      wrong: ['(2, 3)', '3.4', '(3.4, 2)'],
      explain: 'divmod hands back the whole-number quotient and the remainder in one go — 17 is three fives and two left over.' },

    { id: 'pq5-negative-mod', group: 'Numbers', lvl: 3,
      code: 'print(-7 // 2, -7 % 2)',
      correct: '-4 1',
      wrong: ['-3 -1', '-3 1', '-4 -1'],
      explain: 'Python floors the division towards minus infinity, and the remainder always takes the sign of the divisor.' },

    { id: 'pq5-chained-compare', group: 'Numbers', lvl: 2,
      code: 'x = 5\nprint(1 < x < 10)\nprint(x == 5 == True)',
      correct: 'True\nFalse',
      wrong: ['True\nTrue', 'False\nFalse', 'True\nNone'],
      explain: 'Chained comparisons mean "and": the second is 5 == 5 and 5 == True, and 5 is not equal to True even though it is truthy.' }
  );
})();
