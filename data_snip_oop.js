/* Quickfire cards — writing your own building blocks: classes properly, iterators
   and generators, and the testing habits an interviewer expects to see. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var CLS = 'Python · classes in depth';
  var GEN = 'Python · iterators & generators';
  var TST = 'Python · testing & assertions';

  window.SNIPPETS.push(

    /* ---- classes in depth ---- */
    { id: 'oo-init-args', group: CLS, lvl: 1,
      ask: 'Write the constructor line that stores a name on a new object',
      a: 'def __init__(self, name):\n    self.name = name',
      note: '__init__ runs when the object is created. self is the object itself, and it is always the first parameter.' },

    { id: 'oo-method', group: CLS, lvl: 1,
      ask: 'Write a method `greet` on a class that returns "hello " plus the stored name',
      a: "def greet(self):\n    return 'hello ' + self.name",
      note: 'A method is just a function that takes the object as its first argument.' },

    { id: 'oo-instance', group: CLS, lvl: 1,
      ask: 'Make an object `p` of the class Person, passing the name Ann',
      a: "p = Person('Ann')",
      note: 'You never pass self — Python supplies it.' },

    { id: 'oo-default-attr', group: CLS, lvl: 2,
      ask: 'Store an empty list of orders on the object inside the constructor',
      a: 'self.orders = []',
      note: 'Build mutable defaults inside __init__, never as a class-level default — one list would be shared by every object.' },

    { id: 'oo-repr', group: CLS, lvl: 2,
      ask: 'Write the method that decides how the object prints in the console, showing the stored name',
      a: "def __repr__(self):\n    return f'Person({self.name!r})'",
      note: '__repr__ is for developers and shows in lists and debuggers; __str__ is the friendly one for users.' },

    { id: 'oo-eq', group: CLS, lvl: 3,
      ask: 'Write the method that makes two objects compare equal when their ids match',
      a: 'def __eq__(self, other):\n    return self.id == other.id',
      note: 'Define __hash__ too if the objects need to go in a set or be dict keys.' },

    { id: 'oo-len', group: CLS, lvl: 3,
      ask: 'Make len() on your object report the length of its stored `items`',
      a: 'def __len__(self):\n    return len(self.items)',
      note: 'The dunder methods are how you plug into Python\'s own syntax — len, in, [], +, and so on.' },

    { id: 'oo-getitem', group: CLS, lvl: 3,
      ask: 'Make square-bracket indexing on your object read from its stored `items`',
      a: 'def __getitem__(self, i):\n    return self.items[i]',
      note: 'Add this and your object becomes loopable for free.' },

    { id: 'oo-inherit', group: CLS, lvl: 2,
      ask: 'Declare a class Manager that inherits from Employee',
      a: 'class Manager(Employee):',
      note: 'The parent goes in the brackets. Everything the parent can do, the child can do.' },

    { id: 'oo-override', group: CLS, lvl: 2,
      ask: 'Name what it is called when a child class redefines a parent method',
      a: 'overriding',
      note: 'The child version wins. Call super().the_method() inside it if you want the parent behaviour as well.' },

    { id: 'oo-classmethod', group: CLS, lvl: 3,
      ask: 'Decorate an alternative constructor that builds the object from a dict',
      a: '@classmethod\ndef from_dict(cls, d):',
      note: 'A classmethod gets the CLASS as its first argument, so it can call cls(...) to build one.' },

    { id: 'oo-staticmethod', group: CLS, lvl: 3,
      ask: 'Decorate a helper on a class that needs neither the object nor the class',
      a: '@staticmethod',
      note: 'It is a plain function that happens to live on the class, for tidiness.' },

    { id: 'oo-property', group: CLS, lvl: 3,
      ask: 'Decorate a method so it can be read like an attribute, without brackets',
      a: '@property',
      note: 'Lets you turn an attribute into a computed value later without changing any calling code.' },

    { id: 'oo-dataclass-use', group: CLS, lvl: 2,
      ask: 'Declare a dataclass Point holding x and y as floats',
      a: '@dataclass\nclass Point:\n    x: float\n    y: float',
      note: 'You get the constructor, a readable repr and equality checking, all from the annotations.' },

    { id: 'oo-isinstance', group: CLS, lvl: 2,
      ask: 'Check whether `p` is an object of the class Person',
      a: 'isinstance(p, Person)',
      note: 'Prefer isinstance over type(p) == Person: it also accepts subclasses.' },

    { id: 'oo-attrs', group: CLS, lvl: 3,
      ask: 'List every attribute and method available on the object `p`',
      a: 'dir(p)',
      note: 'Together with type(p) and help(p), this is how you explore an unfamiliar object in a console.' },

    { id: 'oo-getattr-default', group: CLS, lvl: 3,
      ask: 'Read the attribute "email" off `p`, falling back to None if it has none',
      a: "getattr(p, 'email', None)",
      note: 'The object equivalent of dict.get — no exception when the attribute is missing.' },

    { id: 'oo-vars', group: CLS, lvl: 3,
      ask: 'Get the object `p` as a plain dict of its attributes',
      a: 'vars(p)',
      note: 'Handy for turning objects into rows for a DataFrame. On a dataclass, dataclasses.asdict(p) is neater.' },

    /* ---- iterators & generators ---- */
    { id: 'gn-yield', group: GEN, lvl: 2,
      ask: 'Write the keyword that hands one value out of a function and pauses it',
      a: 'yield',
      note: 'Any function containing yield is a generator: calling it runs no code, it hands you an object to loop over.' },

    { id: 'gn-simple-gen', group: GEN, lvl: 2,
      ask: 'Write a generator function `squares` yielding the square of every number in `nums`',
      a: 'def squares(nums):\n    for n in nums:\n        yield n * n',
      note: 'Same shape as a list-building function, but nothing is stored — values come out one at a time.' },

    { id: 'gn-genexp', group: GEN, lvl: 2,
      ask: 'Write a generator expression for the squares of `nums`, without building a list',
      a: '(n * n for n in nums)',
      note: 'Round brackets instead of square: lazy, constant memory, perfect inside sum() or max().' },

    { id: 'gn-sum-lazy', group: GEN, lvl: 2,
      ask: 'Total the lengths of every line in `lines` without building an intermediate list',
      a: 'sum(len(line) for line in lines)',
      note: 'When a generator expression is the only argument, you can drop its brackets.' },

    { id: 'gn-next', group: GEN, lvl: 2,
      ask: 'Pull the next value out of the generator `gen`',
      a: 'next(gen)',
      note: 'When it runs out it raises StopIteration — which is exactly what a for loop catches for you.' },

    { id: 'gn-next-default', group: GEN, lvl: 3,
      ask: 'Get the first value from `gen`, or None if there is nothing',
      a: 'next(gen, None)',
      note: 'The second argument is the fallback, and it is the neat way to write "the first match, if any".' },

    { id: 'gn-first-match', group: GEN, lvl: 3,
      ask: 'Get the first number in `nums` above 100, or None if there is none',
      a: 'next((n for n in nums if n > 100), None)',
      note: 'Stops as soon as it finds one, unlike a list comprehension followed by [0].' },

    { id: 'gn-iter', group: GEN, lvl: 3,
      ask: 'Turn the list `items` into an iterator by hand',
      a: 'iter(items)',
      note: 'A for loop calls iter() then next() repeatedly. Knowing that explains most iteration questions.' },

    { id: 'gn-enumerate-start', group: GEN, lvl: 2,
      ask: 'Number the `items` as you loop, starting the count at 1',
      a: 'for i, item in enumerate(items, start=1):',
      note: 'The start argument saves the i + 1 that everyone otherwise writes in the print.' },

    { id: 'gn-zip-strict', group: GEN, lvl: 3,
      ask: 'Pair up `names` and `scores`, raising if they are different lengths',
      a: 'zip(names, scores, strict=True)',
      note: 'Python 3.10 and later. Plain zip silently stops at the shorter one, which hides bugs.' },

    { id: 'gn-islice', group: GEN, lvl: 3,
      ask: 'Take the first five values from the generator `gen`',
      a: 'itertools.islice(gen, 5)',
      note: 'You cannot slice a generator with [:5] — islice is the lazy equivalent.' },

    { id: 'gn-chain', group: GEN, lvl: 3,
      ask: 'Loop over `list_a` then `list_b` as if they were one sequence',
      a: 'itertools.chain(list_a, list_b)',
      note: 'No copying — it just walks one after the other.' },

    { id: 'gn-groupby-sorted', group: GEN, lvl: 3,
      ask: 'Group the already-sorted `rows` by the key function `key_fn` using itertools',
      a: 'itertools.groupby(rows, key=key_fn)',
      note: 'It only groups NEIGHBOURING equal keys, so sort by the same key first or you get fragments.' },

    { id: 'gn-yield-lines', group: GEN, lvl: 3,
      ask: 'Write a generator `read_lines` that yields each stripped line of the file at `path`',
      a: "def read_lines(path):\n    with open(path) as f:\n        for line in f:\n            yield line.strip()",
      note: 'The reason generators matter for data work: this handles a 10GB file in constant memory.' },

    { id: 'gn-generator-once', group: GEN, lvl: 3,
      ask: 'Turn the generator `gen` into a list so you can loop over it twice',
      a: 'list(gen)',
      note: 'A generator is exhausted after one pass — the second loop sees nothing. Materialise it if you need it twice.' },

    /* ---- testing & assertions ---- */
    { id: 'ts-assert', group: TST, lvl: 1,
      ask: 'Assert that `total` equals 10',
      a: 'assert total == 10',
      note: 'The cheapest test there is. A failing assert raises AssertionError and stops the program.' },

    { id: 'ts-assert-message', group: TST, lvl: 2,
      ask: 'Assert that `total` is positive, with the message "total must be positive"',
      a: "assert total > 0, 'total must be positive'",
      note: 'The message after the comma is what you will actually read at 2am.' },

    { id: 'ts-test-function', group: TST, lvl: 2,
      ask: 'Write a pytest test checking that add(2, 3) gives 5',
      a: 'def test_add():\n    assert add(2, 3) == 5',
      note: 'pytest collects any function whose name starts with test_. No class, no boilerplate.' },

    { id: 'ts-run-pytest', group: TST, lvl: 1,
      ask: 'Run the whole test suite from the command line',
      a: 'pytest',
      note: 'pytest -q for quiet, pytest -x to stop at the first failure, pytest -k name to run matching tests.' },

    { id: 'ts-pytest-raises', group: TST, lvl: 3,
      ask: 'Assert that calling divide(1, 0) raises ZeroDivisionError',
      a: 'with pytest.raises(ZeroDivisionError):\n    divide(1, 0)',
      note: 'Testing the failure path matters as much as the happy one.' },

    { id: 'ts-approx', group: TST, lvl: 3,
      ask: 'Assert that `result` is 0.3 allowing for floating point error',
      a: 'assert result == pytest.approx(0.3)',
      note: '0.1 + 0.2 is not 0.3 in binary floating point — approx is how you test numeric code honestly.' },

    { id: 'ts-parametrize', group: TST, lvl: 3,
      ask: 'Decorate a test so it runs once for each pair in `cases`',
      a: "@pytest.mark.parametrize('given,expected', cases)",
      note: 'One test body, many cases, and each failure is reported separately.' },

    { id: 'ts-fixture', group: TST, lvl: 3,
      ask: 'Decorate a function that supplies the same test data to several tests',
      a: '@pytest.fixture',
      note: 'Ask for it by putting its name in the test\'s parameter list.' },

    { id: 'ts-edge-cases', group: TST, lvl: 2,
      ask: 'Name the three inputs to test first on any function that takes a list',
      a: 'empty, one item, duplicates',
      note: 'Then: all negative, already sorted, and something huge. Interviewers listen for exactly this list.' },

    { id: 'ts-doctest', group: TST, lvl: 3,
      ask: 'Run the examples written inside your docstrings as tests',
      a: 'python -m doctest my_module.py',
      note: 'Docstring examples that are also tests can never drift out of date.' },

    { id: 'ts-copy-input', group: TST, lvl: 3,
      ask: 'Copy `items` inside a function so sorting it cannot change the caller\'s list',
      a: 'items = list(items)',
      note: 'Mutating an argument is the bug tests catch most often. Copy first, or return a new list.' },

    { id: 'ts-timeit', group: TST, lvl: 3,
      ask: 'Time a small snippet from the command line 1000 times',
      a: "python -m timeit -n 1000 'sum(range(100))'",
      note: 'In a notebook it is %timeit. Measure before you optimise anything.' }
  );
})();
