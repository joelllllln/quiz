/* The coding path — stages 01 to 04, before pandas is mentioned at all.
   Printing, names, containers, loops, functions and what a DataFrame actually is.
   Same four steps as everything else: see it, spot it, build it, write it. */
(function () {
  window.CODETASKS = window.CODETASKS || [];
  function T(o) { o.lvl = o.lvl || 1; window.CODETASKS.push(o); }
  var A = '01 · Your first lines';
  var B = '02 · Lists and dictionaries';
  var C = '03 · Loops and functions';
  var D = '04 · What a DataFrame is';

  /* ---- 01 · Your first lines ---- */
  T({ key: 'z-print', group: A, title: 'Print something',
    ask: 'Print the word hello.',
    why: 'Everything you write is eventually checked by printing it. This is the whole of your first program.',
    mcq: { q: 'Which line prints hello?',
      correct: "print('hello')",
      wrong: ['print(hello)', "print 'hello'", "echo('hello')"],
      whyWrong: [
        'Without quotes Python looks for a VARIABLE called hello and raises NameError.',
        'That is Python 2. Since Python 3 print is a function, so it needs brackets.',
        'echo is a shell command, not Python.'],
      explain: "print('hello') — the function, brackets, and the text in quotes." },
    lines: ["print('hello')"],
    decoys: ['print(hello)', "echo('hello')"],
    written: { prompt: 'Write the line that prints hello.', solution: "print('hello')", must: ["print('hello')"] },
    walk: [["print('hello')", 'Quotes mean "this is text". Without them Python goes looking for a name.']] });

  T({ key: 'z-name', group: A, title: 'Store something in a name',
    ask: 'Store the number 30 in a name called age, then print it.',
    why: 'A name holds a value so you can use it again. Everything from a number to a whole table works this way.',
    mcq: { q: 'Which pair stores it and prints it?',
      correct: 'age = 30\nprint(age)',
      wrong: ['30 = age\nprint(age)', "age = 30\nprint('age')", 'age == 30\nprint(age)'],
      whyWrong: [
        'The name goes on the LEFT and the value on the right. This way round is a syntax error.',
        "Quotes make it text, so this prints the word age rather than the number 30.",
        'Two equals signs ASK whether they are equal; they store nothing, so age never exists.'],
      explain: 'One equals sign puts the value into the name. Printing the name with no quotes shows what is inside it.' },
    lines: ['age = 30', 'print(age)'],
    decoys: ['30 = age', "print('age')"],
    written: { prompt: 'Write two lines: put 30 into age, then print age.', solution: 'age = 30\nprint(age)', must: ['age = 30', 'print(age)'] },
    walk: [['age = 30', 'Name on the left, value on the right.'], ['print(age)', 'No quotes, so Python looks the name up.']] });

  T({ key: 'z-maths', group: A, title: 'Do some arithmetic',
    ask: 'Work out the total of price times quantity and store it in total.',
    why: 'The same arithmetic works on one number now and on a whole column later.',
    mcq: { q: 'Which line stores the total?',
      correct: 'total = price * quantity',
      wrong: ['total = price x quantity', 'total = price ** quantity', 'price * quantity = total'],
      whyWrong: [
        'The multiplication sign in Python is *, never x — x would be read as a variable name.',
        'Two stars is "to the power of", which is a very different and much larger number.',
        'The name being assigned to always goes on the left.'],
      explain: 'total = price * quantity. Plus, minus, star and slash cover almost everything.' },
    lines: ['total = price * quantity'],
    decoys: ['total = price x quantity', 'total = price ** quantity'],
    written: { prompt: 'Write the line storing price times quantity in total.', solution: 'total = price * quantity', must: ['total = price * quantity'] },
    walk: [['total = price * quantity', 'The right-hand side is worked out first, then the answer goes into the name.']] });

  T({ key: 'z-fstring', group: A, title: 'Put a value inside text',
    ask: 'Build the message "total: 42" from a name called total.',
    why: 'Every report line, chart title and print statement you write from here on uses this.',
    mcq: { q: 'Which builds the message?',
      correct: "f'total: {total}'",
      wrong: ["'total: {total}'", "'total: ' + total", "f'total: total'"],
      whyWrong: [
        'Without the f in front, the curly brackets are just characters — you get the literal text {total}.',
        'Adding a number to text raises TypeError. str(total) would fix it, but the f-string is easier.',
        'Nothing is in curly brackets, so this is just the word total twice.'],
      explain: "An f in front of the quotes lets you drop a value in curly brackets: f'total: {total}'." },
    lines: ["message = f'total: {total}'", 'print(message)'],
    decoys: ["message = 'total: {total}'", "message = 'total: ' + total"],
    written: { prompt: 'Write two lines: build the f-string message, then print it.', solution: "message = f'total: {total}'\nprint(message)", must: ["f'total: {total}'", 'print(message)'] },
    walk: [["message = f'total: {total}'", 'The f is the whole trick. Without it, nothing is substituted.'],
           ['print(message)', 'And out it comes, with the number in place.']] });

  T({ key: 'z-comment', group: A, title: 'Leave a note in the code',
    ask: 'Add a comment above a line explaining what it does.',
    why: 'Six months later, the comment is the only thing that tells you why the number is 0.2.',
    mcq: { q: 'Which line is a comment?',
      correct: '# hold back a fifth of the rows for testing',
      wrong: ['// hold back a fifth of the rows for testing', '/* hold back a fifth of the rows */', '-- hold back a fifth of the rows'],
      whyWrong: [
        'Double slashes are JavaScript and C. In Python they are a syntax error.',
        'That block form belongs to C and Java. Python uses # per line, or triple quotes for a docstring.',
        'Two dashes are SQL comments.'],
      explain: 'A hash starts a comment, and everything after it on that line is ignored by Python.' },
    lines: ['# hold back a fifth of the rows for testing', 'test_size = 0.2'],
    decoys: ['// hold back a fifth of the rows', '-- hold back a fifth of the rows'],
    written: { prompt: 'Write a comment line and then set test_size to 0.2.', solution: '# hold back a fifth of the rows for testing\ntest_size = 0.2', must: ['#', 'test_size = 0.2'] },
    walk: [['# hold back a fifth of the rows for testing', 'Say WHY, not what — the code already says what.'],
           ['test_size = 0.2', 'The line itself.']] });

  T({ key: 'z-type', group: A, lvl: 2, title: 'Find out what something is',
    ask: 'Check what type of thing is stored in the name value.',
    why: 'Half of all beginner errors are a value being a different type from the one you assumed.',
    mcq: { q: 'Which tells you the type?',
      correct: 'type(value)',
      wrong: ['value.type()', 'typeof(value)', 'value.dtype'],
      whyWrong: [
        'type is a built-in FUNCTION you call on the value, not a method the value has.',
        'typeof is a JavaScript operator; Python has no such keyword and this raises NameError.',
        '.dtype belongs to a pandas column or a NumPy array, not to a plain Python value.'],
      explain: "type(value) tells you whether you have an int, a float, a str, a list or something else." },
    lines: ['print(type(value))'],
    decoys: ['print(value.type())', 'print(typeof(value))'],
    written: { prompt: 'Write the line printing the type of value.', solution: 'print(type(value))', must: ['type(value)'] },
    walk: [['print(type(value))', "<class 'str'> when you expected a number is the answer to a lot of confusing errors."]] });

  /* ---- 02 · Lists and dictionaries ---- */
  T({ key: 'z-list', group: B, title: 'Make a list',
    ask: 'Store the three numbers 10, 20 and 30 in a list called nums.',
    why: 'A list is the simplest way to hold several things — and a DataFrame column behaves a lot like one.',
    mcq: { q: 'Which makes the list?',
      correct: 'nums = [10, 20, 30]',
      wrong: ['nums = (10, 20, 30)', 'nums = {10, 20, 30}', 'nums = list[10, 20, 30]'],
      whyWrong: [
        'Round brackets make a TUPLE, which cannot be changed afterwards.',
        'Curly brackets make a SET, which has no order and drops duplicates.',
        'list is a function, so it would need round brackets — and it takes one iterable, not three numbers.'],
      explain: 'Square brackets, values separated by commas. That is a list.' },
    lines: ['nums = [10, 20, 30]'],
    decoys: ['nums = (10, 20, 30)', 'nums = {10, 20, 30}'],
    written: { prompt: 'Write the line making a list of 10, 20 and 30 called nums.', solution: 'nums = [10, 20, 30]', must: ['nums = [10, 20, 30]'] },
    walk: [['nums = [10, 20, 30]', 'Ordered, changeable, and countable with len().']] });

  T({ key: 'z-index', group: B, title: 'Take one item out',
    ask: 'Get the FIRST item of the list nums.',
    why: 'Counting from zero is the rule that catches everyone once — and it is the same rule in pandas.',
    mcq: { q: 'Which gives the first item?',
      correct: 'nums[0]',
      wrong: ['nums[1]', 'nums(0)', 'nums.first()'],
      whyWrong: [
        'That is the SECOND item. Python counts from zero.',
        'Round brackets try to call the list as a function.',
        'Lists have no .first() method.'],
      explain: 'nums[0] is the first, nums[1] the second, nums[-1] the last however long it is.' },
    lines: ['first = nums[0]', 'last = nums[-1]'],
    decoys: ['first = nums(0)', 'first = nums.first()'],
    written: { prompt: 'Write two lines taking the first item into first and the last into last.', solution: 'first = nums[0]\nlast = nums[-1]', must: ['nums[0]', 'nums[-1]'] },
    walk: [['first = nums[0]', 'Zero is the first.'], ['last = nums[-1]', 'Minus one counts back from the end.']] });

  T({ key: 'z-append', group: B, title: 'Add to a list',
    ask: 'Add the number 40 to the end of nums.',
    why: 'Collecting results into a list as you go is the shape of half the code you will ever write.',
    mcq: { q: 'Which adds it to the end?',
      correct: 'nums.append(40)',
      wrong: ['nums = nums.append(40)', 'nums.add(40)', 'nums + 40'],
      whyWrong: [
        'append changes the list and returns None, so assigning its result throws the list away entirely.',
        'add belongs to a set. Lists use append.',
        'You cannot add a number to a list; nums + [40] would work and makes a NEW list.'],
      explain: 'nums.append(40) changes the list in place. Do not assign the result.' },
    lines: ['nums.append(40)'],
    decoys: ['nums = nums.append(40)', 'nums.add(40)'],
    written: { prompt: 'Write the line adding 40 to the end of nums.', solution: 'nums.append(40)', must: ['nums.append(40)'] },
    walk: [['nums.append(40)', 'In place. The list is longer; nothing is handed back.']] });

  T({ key: 'z-dict', group: B, title: 'Make a dictionary',
    ask: 'Store a person with the name Ann and the age 30 in a dictionary called person.',
    why: 'A row of data is a dictionary — and a DataFrame is basically a stack of them.',
    mcq: { q: 'Which makes the dictionary?',
      correct: "person = {'name': 'Ann', 'age': 30}",
      wrong: ["person = ['name': 'Ann', 'age': 30]", "person = {'name' = 'Ann', 'age' = 30}", "person = {name: 'Ann', age: 30}"],
      whyWrong: [
        'Square brackets make a list, which has no keys.',
        'Inside a dictionary the separator is a colon, not an equals sign.',
        'Without quotes, name and age are read as variables — which do not exist.'],
      explain: 'Curly brackets, key colon value, pairs separated by commas.' },
    lines: ["person = {'name': 'Ann', 'age': 30}"],
    decoys: ["person = ['name': 'Ann']", "person = {name: 'Ann', age: 30}"],
    written: { prompt: 'Write the line making the person dictionary.', solution: "person = {'name': 'Ann', 'age': 30}", must: ["{'name': 'Ann'", "'age': 30}"] },
    walk: [["person = {'name': 'Ann', 'age': 30}", 'Look things up by LABEL rather than by position.']] });

  T({ key: 'z-dict-get', group: B, title: 'Look something up',
    ask: "Get the name out of the person dictionary, or the word unknown if there is no name.",
    why: 'A missing key raises. .get is the version that copes, and you will use it constantly.',
    mcq: { q: 'Which is safe when the key is missing?',
      correct: "person.get('name', 'unknown')",
      wrong: ["person['name']", "person.get('name')", "person['name'] or 'unknown'"],
      whyWrong: [
        'Square brackets raise KeyError when the key is not there.',
        'That gives None when it is missing, not the word unknown.',
        'It raises before the `or` is ever reached, because the lookup fails first.'],
      explain: ".get(key, fallback) never raises: you get the value, or your fallback." },
    lines: ["name = person.get('name', 'unknown')"],
    decoys: ["name = person['name']", "name = person.get('name')"],
    written: { prompt: 'Write the line getting the name with unknown as the fallback.', solution: "name = person.get('name', 'unknown')", must: ["person.get('name', 'unknown')"] },
    walk: [["name = person.get('name', 'unknown')", 'The same idea appears again as .fillna() once you reach pandas.']] });

  T({ key: 'z-len', group: B, title: 'Count what is in there',
    ask: 'Count how many items are in nums.',
    why: 'One function counts characters, list items, dictionary keys and DataFrame rows.',
    mcq: { q: 'Which counts the items?',
      correct: 'len(nums)',
      wrong: ['nums.len()', 'nums.count()', 'length(nums)'],
      whyWrong: [
        'len is a built-in function, not a method on the list.',
        '.count(x) counts how many times ONE value appears, and needs that value.',
        'There is no length() in Python.'],
      explain: 'len(x) works on anything with a length: text, lists, dicts, DataFrames.' },
    lines: ['print(len(nums))'],
    decoys: ['print(nums.len())', 'print(length(nums))'],
    written: { prompt: 'Write the line printing how many items nums holds.', solution: 'print(len(nums))', must: ['len(nums)'] },
    walk: [['print(len(nums))', 'Later, len(df) gives the row count of a whole table.']] });

  /* ---- 03 · Loops and functions ---- */
  T({ key: 'z-for', group: C, title: 'Do something to each item',
    ask: 'Print every number in the list nums, one per line.',
    why: 'pandas will do the looping for you later — but you need to recognise the shape first.',
    mcq: { q: 'Which prints each one?',
      correct: 'for n in nums:\n    print(n)',
      wrong: ['for n in nums\n    print(n)', 'for n in nums:\nprint(n)', 'foreach n in nums:\n    print(n)'],
      whyWrong: [
        'The colon at the end of the for line is not optional.',
        'The body has to be indented, or Python does not know it belongs to the loop.',
        'Python spells it for, not foreach.'],
      explain: 'for name in thing: then an indented body. Four spaces is the convention.' },
    lines: ['for n in nums:', '    print(n)'],
    decoys: ['foreach n in nums:', 'for n in nums'],
    written: { prompt: 'Write the two lines printing each number in nums.', solution: 'for n in nums:\n    print(n)', must: ['for n in nums:', 'print(n)'] },
    walk: [['for n in nums:', 'n holds one item at a time.'], ['    print(n)', 'Indented, so it runs once per item.']] });

  T({ key: 'z-total', group: C, title: 'Add them up with a loop',
    ask: 'Total the numbers in nums using a running total.',
    why: 'Start at zero, add each one, use it after: the shape behind every aggregate in pandas.',
    mcq: { q: 'Which totals the list?',
      correct: 'total = 0\nfor n in nums:\n    total += n',
      wrong: ['for n in nums:\n    total = 0\n    total += n', 'total = 0\nfor n in nums:\ntotal += n', 'total = 0\nfor n in nums:\n    total = n'],
      whyWrong: [
        'Resetting the total INSIDE the loop starts again every time, so you end up with the last number only.',
        'The body is not indented, so Python raises IndentationError.',
        'That replaces the total each time instead of adding to it.'],
      explain: 'The reset goes outside the loop, the addition inside. sum(nums) does the same thing in one word.' },
    lines: ['total = 0', 'for n in nums:', '    total += n'],
    decoys: ['    total = n', 'total = total'],
    written: { prompt: 'Write the three lines totalling nums into total.', solution: 'total = 0\nfor n in nums:\n    total += n', must: ['total = 0', 'for n in nums:', 'total += n'] },
    walk: [['total = 0', 'Outside the loop, or it restarts every turn.'],
           ['for n in nums:', 'One number at a time.'],
           ['    total += n', 'Add it on. After the loop, total holds the answer.']] });

  T({ key: 'z-if', group: C, title: 'Only sometimes',
    ask: 'Print the word big when n is over 100.',
    why: 'Filtering a table is this same condition, applied to every row at once.',
    mcq: { q: 'Which prints only for big numbers?',
      correct: "if n > 100:\n    print('big')",
      wrong: ["if n > 100\n    print('big')", "if n = 100:\n    print('big')", "if (n > 100) {\n    print('big')\n}"],
      whyWrong: [
        'Missing the colon at the end of the if line.',
        'One equals sign assigns; asking a question needs == (or > here).',
        'Curly braces are C and JavaScript. Python uses indentation.'],
      explain: 'if condition: then an indented body. Add else: for the other case.' },
    lines: ['if n > 100:', "    print('big')"],
    decoys: ['if n = 100:', 'if (n > 100) {'],
    written: { prompt: 'Write the two lines printing big when n is over 100.', solution: "if n > 100:\n    print('big')", must: ['if n > 100:', "print('big')"] },
    walk: [['if n > 100:', 'The question, with a colon.'], ["    print('big')", 'Only runs when the answer is yes.']] });

  T({ key: 'z-def', group: C, title: 'Write a function',
    ask: 'Write a function called double that takes n and gives back twice it.',
    why: 'Anything you do more than twice belongs in a function — including every cleaning step.',
    mcq: { q: 'Which defines it correctly?',
      correct: 'def double(n):\n    return n * 2',
      wrong: ['def double(n):\n    print(n * 2)', 'function double(n):\n    return n * 2', 'def double(n)\n    return n * 2'],
      whyWrong: [
        'print SHOWS the value; return HANDS IT BACK. This function returns None, which is the most common beginner bug.',
        'Python spells it def, not function.',
        'Missing the colon at the end of the def line.'],
      explain: 'def name(parameters): then an indented body, and return to give the answer back.' },
    lines: ['def double(n):', '    return n * 2'],
    decoys: ['function double(n):', '    print(n * 2)'],
    written: { prompt: 'Write the two lines defining double.', solution: 'def double(n):\n    return n * 2', must: ['def double(n):', 'return n * 2'] },
    walk: [['def double(n):', 'The name and what it takes.'], ['    return n * 2', 'return, not print — or the caller gets None.']] });

  T({ key: 'z-call', group: C, title: 'Use your function',
    ask: 'Call double with 21 and print what comes back.',
    why: 'Defining a function runs nothing. Calling it is a separate step.',
    mcq: { q: 'Which calls it and prints the answer?',
      correct: 'print(double(21))',
      wrong: ['print(double)', 'print(double 21)', 'double(21)'],
      whyWrong: [
        'Without brackets you print the function object itself, something like <function double>.',
        'The argument goes inside brackets.',
        'That calls it, but the answer is thrown away because nothing prints or stores it.'],
      explain: 'double(21) runs it; print(...) shows what came back.' },
    lines: ['print(double(21))'],
    decoys: ['print(double)', 'double(21)'],
    written: { prompt: 'Write the line calling double with 21 and printing the result.', solution: 'print(double(21))', must: ['print(double(21))'] },
    walk: [['print(double(21))', 'Brackets mean "run it". No brackets means "the function itself".']] });

  T({ key: 'z-import', group: C, title: 'Import something',
    ask: 'Import the maths module and print the square root of 16.',
    why: 'Every library you will use — pandas, numpy, matplotlib — arrives through a line exactly like this.',
    mcq: { q: 'Which imports it and uses it?',
      correct: 'import math\nprint(math.sqrt(16))',
      wrong: ['import math\nprint(sqrt(16))', 'from math import\nprint(math.sqrt(16))', 'include math\nprint(math.sqrt(16))'],
      whyWrong: [
        'Imported this way the function lives inside math, so it has to be called as math.sqrt. Bare sqrt raises NameError.',
        'The from form needs to name what to import: from math import sqrt.',
        'include is C. Python imports.'],
      explain: 'import math brings the module in; math.sqrt reaches inside it.' },
    lines: ['import math', 'print(math.sqrt(16))'],
    decoys: ['include math', 'print(sqrt(16))'],
    written: { prompt: 'Write the two lines importing math and printing the square root of 16.', solution: 'import math\nprint(math.sqrt(16))', must: ['import math', 'math.sqrt(16)'] },
    walk: [['import math', 'Once, at the top of the file.'], ['print(math.sqrt(16))', 'Module dot function. Same shape as pd.read_csv later.']] });

  /* ---- 04 · What a DataFrame is ---- */
  T({ key: 'z-df-build', group: D, lvl: 2, title: 'Build a small table by hand',
    ask: 'Build a DataFrame called df with a name column holding Ann and Bob, and an age column holding 30 and 25.',
    why: 'Making one by hand is the quickest way to see that a DataFrame is a dictionary of columns.',
    mcq: { q: 'Which builds the frame?',
      correct: "df = pd.DataFrame({'name': ['Ann', 'Bob'], 'age': [30, 25]})",
      wrong: ["df = pd.DataFrame(['name', 'Ann', 'Bob'], ['age', 30, 25])", "df = pd.DataFrame({'name': 'Ann', 'age': 30})", "df = pd.dataframe({'name': ['Ann', 'Bob'], 'age': [30, 25]})"],
      whyWrong: [
        'Two separate lists have no column names attached, so pandas cannot tell what is what.',
        'Single values with no list around them raise "If using all scalar values, you must pass an index".',
        'The class is DataFrame, with two capitals. Python is case-sensitive.'],
      explain: 'A dictionary of column name to list of values. Each list becomes a column, and they must be the same length.' },
    lines: ["df = pd.DataFrame({'name': ['Ann', 'Bob'],", "                   'age': [30, 25]})", 'print(df)'],
    decoys: ["df = pd.dataframe({'name': ['Ann', 'Bob']})", "df = pd.DataFrame({'name': 'Ann'})"],
    written: { prompt: 'Write the lines building df from that dictionary and printing it.', solution: "df = pd.DataFrame({'name': ['Ann', 'Bob'],\n                   'age': [30, 25]})\nprint(df)", must: ['pd.DataFrame({', "'name': ['Ann', 'Bob']", "'age': [30, 25]"] },
    walk: [["df = pd.DataFrame({'name': ['Ann', 'Bob'],", 'One key per column.'],
           ["                   'age': [30, 25]})", 'Both lists the same length — one entry per row.'],
           ['print(df)', 'Two rows, two columns, and an index of 0 and 1 you never asked for.']] });

  T({ key: 'z-series', group: D, lvl: 2, title: 'A column is a Series',
    ask: 'Take the age column out of df and check what type of object it is.',
    why: 'One name gives a Series, a list of names gives a DataFrame. That one rule explains a lot of confusing errors.',
    mcq: { q: 'Which takes the column and reports its type?',
      correct: "print(type(df['age']))",
      wrong: ["print(type(df[['age']]))", "print(type(df.age()))", "print(df['age'].type)"],
      whyWrong: [
        'Double brackets give a one-column DATAFRAME, not a Series — a real difference when you pass it on.',
        'df.age works as an attribute, but calling it with brackets tries to run the column as a function.',
        'There is no .type attribute; use type(x) or .dtype for the data type.'],
      explain: "df['age'] is a Series: one column, with the index alongside it." },
    lines: ["print(type(df['age']))", "print(type(df[['age']]))"],
    decoys: ["print(df['age'].type)", 'print(type(df.age()))'],
    written: { prompt: "Write the two lines printing the type of df['age'] and of df[['age']].", solution: "print(type(df['age']))\nprint(type(df[['age']]))", must: ["type(df['age'])", "type(df[['age']])"] },
    walk: [["print(type(df['age']))", "<class 'pandas.core.series.Series'> — one column."],
           ["print(type(df[['age']]))", 'A DataFrame. Same data, different container, and some functions care.']] });

  T({ key: 'z-index-col', group: D, lvl: 2, title: 'The index down the side',
    ask: 'Print the index of df, then the list of its column names.',
    why: 'Rows have labels too. Knowing that saves you when a join or a comparison lines up strangely.',
    mcq: { q: 'Which prints the row labels and the column names?',
      correct: 'print(df.index)\nprint(list(df.columns))',
      wrong: ['print(df.rows)\nprint(df.columns)', 'print(df.index())\nprint(df.columns())', 'print(df.keys())\nprint(df.values())'],
      whyWrong: [
        'There is no .rows attribute — the row labels live in .index.',
        'Both are attributes, so the brackets raise.',
        '.keys() gives the columns and .values gives the raw numbers; neither shows the index.'],
      explain: 'df.index is the row labels, df.columns is the column names. Neither takes brackets.' },
    lines: ['print(df.index)', 'print(list(df.columns))'],
    decoys: ['print(df.rows)', 'print(df.index())'],
    written: { prompt: 'Write the two lines printing the index and the column names.', solution: 'print(df.index)\nprint(list(df.columns))', must: ['df.index', 'list(df.columns)'] },
    walk: [['print(df.index)', 'A RangeIndex of 0, 1, 2 unless you set something else.'],
           ['print(list(df.columns))', 'The names, exactly as they are spelled.']] });

  T({ key: 'z-df-from-rows', group: D, lvl: 2, title: 'A table from a list of records',
    ask: 'Build a DataFrame from rows, a list of dictionaries each holding name and age.',
    why: 'This is the shape data arrives in from an API — and pandas turns it into a table in one call.',
    mcq: { q: 'Which builds the frame from the records?',
      correct: 'df = pd.DataFrame(rows)',
      wrong: ['df = pd.DataFrame([rows])', 'df = pd.DataFrame.from_dict(rows)', 'df = pd.DataFrame(rows.values())'],
      whyWrong: [
        'Wrapping the list in another list gives one row whose cells are dictionaries.',
        'from_dict expects a dictionary, not a list of them — it raises here.',
        'A list has no .values(); that is a dictionary method.'],
      explain: 'pd.DataFrame(list_of_dicts) uses the keys as column names and each dictionary as a row.' },
    lines: ['df = pd.DataFrame(rows)', 'print(df.head())'],
    decoys: ['df = pd.DataFrame([rows])', 'df = pd.DataFrame.from_dict(rows)'],
    written: { prompt: 'Write the two lines building df from rows and showing the head.', solution: 'df = pd.DataFrame(rows)\nprint(df.head())', must: ['pd.DataFrame(rows)', 'head()'] },
    walk: [['df = pd.DataFrame(rows)', 'Keys become columns; missing keys become NaN.'],
           ['print(df.head())', 'Check the column names came out as you expected.']] });

  T({ key: 'z-df-vs-list', group: D, lvl: 2, title: 'Why not just use a list?',
    ask: 'Add 10 to every age — first the plain-Python way, then the pandas way.',
    why: 'Seeing the two side by side is the moment pandas starts to make sense.',
    mcq: { q: 'Which pair does the same job in both styles?',
      correct: "ages = [a + 10 for a in ages]\ndf['age'] = df['age'] + 10",
      wrong: ["ages = ages + 10\ndf['age'] = df['age'] + 10", "ages = [a + 10 for a in ages]\ndf['age'] + 10", "for a in ages:\n    a += 10"],
      whyWrong: [
        'Adding a number to a plain LIST raises TypeError — that shortcut only works on a column.',
        'The pandas half computes the new values and throws them away; it has to be assigned back.',
        'Changing the loop variable does not change the list — a is a copy of the value, not the slot.'],
      explain: 'A list needs a comprehension or a loop; a column takes the arithmetic directly. That is the whole appeal.' },
    lines: ['ages = [a + 10 for a in ages]', "df['age'] = df['age'] + 10"],
    decoys: ['ages = ages + 10', "df['age'] + 10"],
    written: { prompt: 'Write the two lines: the list comprehension, then the column version.', solution: "ages = [a + 10 for a in ages]\ndf['age'] = df['age'] + 10", must: ['[a + 10 for a in ages]', "df['age'] = df['age'] + 10"] },
    walk: [['ages = [a + 10 for a in ages]', 'Plain Python: you write the loop.'],
           ["df['age'] = df['age'] + 10", 'pandas: the loop happens in C, and the code says what you meant.']] });
})();
