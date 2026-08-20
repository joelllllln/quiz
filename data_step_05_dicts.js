/* Step-by-step ladders, 5 — dictionaries and functions, a rung at a time. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  function ladder(group, prefix, rows) {
    rows.forEach(function (r, i) {
      var card = { id: prefix + '-' + (i + 1), group: group, lvl: 1, ask: r[0], a: r[1] };
      if (r[2]) card.note = r[2];
      if (r[3]) card.alts = r[3];
      window.SNIPPETS.push(card);
    });
  }

  ladder('Step by step · dictionaries', 'sp-dc', [
    ['Start an empty dictionary called counts', 'counts = {}', 'Curly brackets. A dictionary is a set of labels, each with a value.'],
    ['Make a dictionary called person with the key name holding Ann', "person = {'name': 'Ann'}", 'Key first, then a colon, then the value.'],
    ['Make a dictionary called person with name Ann and age 30', "person = {'name': 'Ann', 'age': 30}"],
    ['Make a dictionary called prices with tea at 2 and jam at 3', "prices = {'tea': 2, 'jam': 3}"],
    ['Get the value stored under name in person', "person['name']", 'Square brackets, with the KEY inside — not a position.'],
    ['Get the value stored under age in person', "person['age']"],
    ['Get the price of tea out of prices', "prices['tea']"],
    ['Store the word London under the key city in person', "person['city'] = 'London'", 'The same line adds a new key OR changes an existing one.'],
    ['Change the age in person to 31', "person['age'] = 31"],
    ['Add 1 to the number stored under tea in counts', "counts['tea'] += 1", 'This only works if the key is already there.'],
    ['Get the value under city from person, or None if there is no city', "person.get('city')", 'get never raises — it hands back None when the key is missing.'],
    ['Get the value under city from person, or the word unknown if it is missing', "person.get('city', 'unknown')"],
    ['Get the count for tea from counts, treating a missing key as 0', "counts.get('tea', 0)", 'The standard way to start a tally without checking first.'],
    ['Add 1 to the count for tea, even when tea is not there yet', "counts['tea'] = counts.get('tea', 0) + 1", 'The whole counting pattern on one line.'],
    ['Test whether person has a key called city', "'city' in person", 'in on a dictionary looks at the KEYS.'],
    ['Test whether person has NO key called city', "'city' not in person"],
    ['Remove the key city from person', "del person['city']"],
    ['Remove the key city from person and store its value in c', "c = person.pop('city')"],
    ['Count how many keys person has', 'len(person)'],
    ['Get all the keys of person as something you can loop over', 'person.keys()'],
    ['Get all the values of person', 'person.values()'],
    ['Get all the key and value pairs of person', 'person.items()'],
    ['Get a list of the keys of person', 'list(person)', 'Turning a dictionary into a list gives you its keys.'],
    ['Loop over person printing each key', 'for key in person:\n    print(key)'],
    ['Loop over person printing each key and its value', 'for key, value in person.items():\n    print(key, value)'],
    ['Add up all the values in the dictionary prices', 'sum(prices.values())'],
    ['Find the biggest value in the dictionary prices', 'max(prices.values())'],
    ['Find the key with the biggest value in prices', 'max(prices, key=prices.get)', 'key= tells max what to compare on — here, each key\'s value.'],
    ['Sort the keys of prices into order', 'sorted(prices)'],
    ['Build a dictionary counting how many times each word appears in words', 'counts = {}\nfor word in words:\n    counts[word] = counts.get(word, 0) + 1', 'The most-asked beginner exercise there is, in four lines.'],
    ['Make a copy of person that is safe to change', 'copy = dict(person)'],
    ['Merge the dictionary extra into person, overwriting clashes', 'person.update(extra)'],
    ['Make a dictionary from the two lists keys and values', 'dict(zip(keys, values))'],
    ['Get the name out of the dictionary row, defaulting to an empty string', "row.get('name', '')"],
    ['Loop over the list of dictionaries rows printing each name', "for row in rows:\n    print(row['name'])"],
    ['Add up the price of every dictionary in rows', "total = 0\nfor row in rows:\n    total += row['price']"],
    ['Build a list of the name from every dictionary in rows, in one line', "[row['name'] for row in rows]"],
    ['Build a list of only the rows whose price is above 100', "[row for row in rows if row['price'] > 100]"],
    ['Make a set called seen with nothing in it', 'seen = set()', 'Empty curly brackets would make a dictionary, so a set needs set().'],
    ['Add the word Ann to the set seen', "seen.add('Ann')"]
  ]);

  ladder('Step by step · functions', 'sp-fn', [
    ['Write the first line of a function called greet that takes nothing', 'def greet():', 'def, the name, brackets, colon.'],
    ['Write the first line of a function called greet that takes a name', 'def greet(name):'],
    ['Write the first line of a function called add that takes a and b', 'def add(a, b):'],
    ['Write the first line of a function called area that takes width and height', 'def area(width, height):'],
    ['Write a function greet that prints hello', "def greet():\n    print('hello')", 'The body is indented under the def line.'],
    ['Write a function greet that prints hello and then the name it was given', "def greet(name):\n    print(f'hello {name}')"],
    ['Write a function add that gives back a plus b', 'def add(a, b):\n    return a + b', 'return HANDS THE VALUE BACK. print only shows it on screen.'],
    ['Write a function double that gives back n times 2', 'def double(n):\n    return n * 2'],
    ['Write a function square that gives back n times itself', 'def square(n):\n    return n ** 2'],
    ['Write a function area that gives back width times height', 'def area(width, height):\n    return width * height'],
    ['Write a function shout that gives back text in capitals', 'def shout(text):\n    return text.upper()'],
    ['Write a function first that gives back the first item of items', 'def first(items):\n    return items[0]'],
    ['Write a function total that gives back the sum of nums', 'def total(nums):\n    return sum(nums)'],
    ['Write a function count_items that gives back how many items are in items', 'def count_items(items):\n    return len(items)'],
    ['Call the function greet with no arguments', 'greet()'],
    ['Call the function greet with the word Ann', "greet('Ann')"],
    ['Call add with 2 and 3 and store the answer in result', 'result = add(2, 3)'],
    ['Call double with what is in n and print the answer', 'print(double(n))'],
    ['Write a function greet whose name defaults to the word friend', "def greet(name='friend'):", 'A default lets the caller leave that argument out.'],
    ['Write a function add whose second number defaults to 0', 'def add(a, b=0):'],
    ['Call area passing width and height by name', 'area(width=3, height=4)', 'Naming the arguments makes the call read like a sentence.'],
    ['Write a function is_even that gives back True when n divides by 2', 'def is_even(n):\n    return n % 2 == 0', 'No if needed — the comparison is already True or False.'],
    ['Write a function is_adult that gives back True when age is 18 or more', 'def is_adult(age):\n    return age >= 18'],
    ['Write a function bigger that gives back whichever of a and b is larger', 'def bigger(a, b):\n    return a if a > b else b'],
    ['Write a function safe_divide that gives back 0 when b is 0', 'def safe_divide(a, b):\n    if b == 0:\n        return 0\n    return a / b', 'Deal with the awkward case first, then get on with the normal one.'],
    ['Write a function average that gives back 0 for an empty list', 'def average(nums):\n    if not nums:\n        return 0\n    return sum(nums) / len(nums)'],
    ['Write a function that gives back two things at once, a and b', 'return a, b', 'Returning a pair. The caller can unpack it into two names.'],
    ['Take the two values a function gave back into the names lo and hi', 'lo, hi = get_range()'],
    ['Write a one-line function called double using lambda', 'double = lambda n: n * 2', 'A lambda is a tiny nameless function. Fine as a sort key, rarely worth naming.'],
    ['Write the docstring line under a def that says what greet does', "\"\"\"Say hello to someone by name.\"\"\"", 'Three quotes. The first line of a function should say what it does, not how.']
  ]);
})();
