/* Python coding test — "what does this print?", part 3: the beginner set.
   Every one of these is a misunderstanding that costs people marks in their first
   months: assignment versus comparison, indexing from zero, input returning text,
   printing versus returning. */
(function () {
  window.PYQUIZ = window.PYQUIZ || [];

  window.PYQUIZ.push(

    { id: 'pq0-print-quotes', group: 'First steps', lvl: 1,
      code: "name = 'Ada'\nprint('name')\nprint(name)",
      correct: 'name\nAda',
      wrong: ['Ada\nAda', 'name\nname', "'name'\nAda"],
      explain: 'Quotes make it literal text. Without them, Python looks up the variable and prints what is inside it.' },

    { id: 'pq0-assign-order', group: 'First steps', lvl: 1,
      code: 'x = 5\nx = 10\nprint(x)',
      correct: '10',
      wrong: ['5', '15', '5\n10'],
      explain: 'Assignment replaces. The second line throws the 5 away — a variable holds one value at a time.' },

    { id: 'pq0-plus-strings', group: 'First steps', lvl: 1,
      code: "print(2 + 3)\nprint('2' + '3')",
      correct: '5\n23',
      wrong: ['5\n5', '23\n23', "5\n'23'"],
      explain: 'The same + means "add" for numbers and "join" for text. Which one you get depends entirely on the types.' },

    { id: 'pq0-str-int', group: 'First steps', lvl: 1,
      code: "try:\n    print('age: ' + 30)\nexcept TypeError:\n    print('TypeError')",
      correct: 'TypeError',
      wrong: ['age: 30', 'age: ', '30'],
      explain: 'Python will not silently turn a number into text. Convert it — \'age: \' + str(30) — or let print do it: print(\'age:\', 30).' },

    { id: 'pq0-input-type', group: 'First steps', lvl: 1,
      code: "age = '30'\nprint(type(age))\nprint(age + '1')",
      correct: "<class 'str'>\n301",
      wrong: ["<class 'int'>\n31", "<class 'str'>\n31", "<class 'int'>\n301"],
      explain: 'input() always hands back a string, exactly like this. Adding to it joins rather than sums — wrap it in int() at the point you read it.' },

    { id: 'pq0-index-zero', group: 'First steps', lvl: 1,
      code: "items = ['a', 'b', 'c']\nprint(items[0])\nprint(items[2])",
      correct: 'a\nc',
      wrong: ['b\nc', 'a\nb', "['a']\n['c']"],
      explain: 'Counting starts at 0, so the third item is at index 2 — and index 3 would raise IndexError.' },

    { id: 'pq0-len-vs-index', group: 'First steps', lvl: 1,
      code: "items = ['a', 'b', 'c']\nprint(len(items))\nprint(items[-1])",
      correct: '3\nc',
      wrong: ['3\na', '2\nc', '3\nNone'],
      explain: 'len counts from 1 but indexes start at 0 — so the last index is always len - 1, or simply -1.' },

    { id: 'pq0-equals', group: 'First steps', lvl: 1,
      code: 'x = 5\nprint(x == 5)\nprint(x == 6)\nprint(x)',
      correct: 'True\nFalse\n5',
      wrong: ['True\nFalse\n6', 'True\nTrue\n5', '5\n5\n5'],
      explain: 'One equals sign assigns, two compare. Comparing gives back True or False and changes nothing — x is still 5 afterwards. Writing `x = 6` inside an if-statement is a SyntaxError, which is Python protecting you from the classic slip.' },

    { id: 'pq0-print-return', group: 'First steps', lvl: 1,
      code: 'def add(a, b):\n    print(a + b)\n\nresult = add(2, 3)\nprint(result)',
      correct: '5\nNone',
      wrong: ['5\n5', 'None\n5', '5'],
      explain: 'Printing shows a value; returning hands it back. This function prints and returns nothing, so result is None — the classic reason a coding test says every case failed.' },

    { id: 'pq0-indent-block', group: 'First steps', lvl: 1,
      code: "for i in [1, 2]:\n    print('in')\nprint('out')",
      correct: 'in\nin\nout',
      wrong: ['in\nout\nin\nout', 'in\nout', 'in\nin\nout\nout'],
      explain: 'Indentation decides what belongs to the loop. The indented line runs each time round; the unindented one runs once, after the loop.' },

    { id: 'pq0-empty-falsy', group: 'First steps', lvl: 1,
      code: "items = []\nif items:\n    print('something')\nelse:\n    print('empty')",
      correct: 'empty',
      wrong: ['something', 'None', 'False'],
      explain: 'An empty list is falsy, so the else branch runs. `if items:` is the idiomatic way to ask whether there is anything there.' },

    { id: 'pq0-augmented', group: 'First steps', lvl: 1,
      code: 'count = 0\nfor i in range(3):\n    count += 1\nprint(count)',
      correct: '3',
      wrong: ['0', '1', '2'],
      explain: 'The counter starts outside the loop and grows inside it. Start it inside and it would reset to 0 every pass and print 1.' },

    { id: 'pq0-range-end', group: 'First steps', lvl: 1,
      code: 'print(list(range(3)))\nprint(list(range(1, 4)))',
      correct: '[0, 1, 2]\n[1, 2, 3]',
      wrong: ['[1, 2, 3]\n[1, 2, 3, 4]', '[0, 1, 2, 3]\n[1, 2, 3]', '[0, 1, 2]\n[1, 2, 3, 4]'],
      explain: 'range starts at 0 and stops BEFORE the number you give it. To include n, ask for range(1, n + 1).' },

    { id: 'pq0-float-div', group: 'First steps', lvl: 1,
      code: 'print(10 / 5)\nprint(type(10 / 5))',
      correct: "2.0\n<class 'float'>",
      wrong: ["2\n<class 'int'>", "2.0\n<class 'int'>", "2\n<class 'float'>"],
      explain: 'Division always produces a float in Python 3, even when it divides evenly. Use // if you want a whole number back.' },

    { id: 'pq0-fstring', group: 'First steps', lvl: 1,
      code: "n = 3\nprint('n is {n}')\nprint(f'n is {n}')",
      correct: 'n is {n}\nn is 3',
      wrong: ['n is 3\nn is 3', 'n is {n}\nn is {n}', 'SyntaxError'],
      explain: 'The curly braces only mean anything when the string is prefixed with f. Without it they are just characters.' },

    { id: 'pq0-none-print', group: 'First steps', lvl: 1,
      code: 'x = None\nprint(x)\nprint(x is None)',
      correct: 'None\nTrue',
      wrong: ['\nTrue', 'None\nFalse', 'null\nTrue'],
      explain: 'None is a real value meaning "nothing here". It prints as None, and you test for it with `is None`.' },

    { id: 'pq0-string-index', group: 'First steps', lvl: 1,
      code: "s = 'python'\nprint(s[0], s[-1])\nprint(s[0:3])",
      correct: 'p n\npyt',
      wrong: ['p n\npyth', 'y n\npyt', 'p o\npyt'],
      explain: 'Strings index and slice exactly like lists: from 0, negative counts back from the end, and a slice stops before its second number.' },

    { id: 'pq0-list-append', group: 'First steps', lvl: 1,
      code: "items = ['a']\nitems.append('b')\nprint(items)\nprint(len(items))",
      correct: "['a', 'b']\n2",
      wrong: ["['a']\n1", "['a', ['b']]\n2", "['b']\n1"],
      explain: 'append adds one item to the end and changes the list in place — it returns None, so never write items = items.append(x).' },

    { id: 'pq0-dict-access', group: 'First steps', lvl: 1,
      code: "person = {'name': 'Ada', 'age': 36}\nprint(person['name'])\nprint(len(person))",
      correct: 'Ada\n2',
      wrong: ['name\n2', 'Ada\n36', "'Ada'\n2"],
      explain: 'A dict is looked up by key rather than by position, and len() counts the keys.' },

    { id: 'pq0-if-elif', group: 'First steps', lvl: 1,
      code: "score = 85\nif score >= 50:\n    print('pass')\nelif score >= 70:\n    print('merit')\nelse:\n    print('fail')",
      correct: 'pass',
      wrong: ['merit', 'pass\nmerit', 'fail'],
      explain: 'The first matching branch wins and the rest are skipped — so a band order that goes upwards can never reach the higher grades. Test the highest first.' },

    { id: 'pq0-while', group: 'First steps', lvl: 2,
      code: 'n = 3\nwhile n > 0:\n    print(n)\n    n -= 1',
      correct: '3\n2\n1',
      wrong: ['3\n2\n1\n0', '2\n1\n0', '3'],
      explain: 'The condition is checked before each pass. Forget the n -= 1 and it never stops — which is exactly what the runner\'s timeout is there to catch.' },

    { id: 'pq0-function-args', group: 'First steps', lvl: 2,
      code: "def describe(name, age=0):\n    return f'{name} is {age}'\n\nprint(describe('Ada'))\nprint(describe('Bob', 36))",
      correct: 'Ada is 0\nBob is 36',
      wrong: ['Ada is 0\nBob is 0', 'TypeError', 'Ada is None\nBob is 36'],
      explain: 'A default value fills in when the argument is left out. Arguments with defaults must come after the ones without.' }
  );
})();
