/* Step-by-step ladders, 6 — reading errors, files, imports, and the small habits
   that stop a beginner getting stuck. */
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

  ladder('Step by step · when it goes wrong', 'sp-er', [
    ['Name the error Python gives when you use a name it has never seen', 'NameError', 'Nearly always a typo, or a line that has not run yet.'],
    ['Name the error you get from adding a number to text', 'TypeError', "'age: ' + 30 — convert the number with str() first."],
    ['Name the error from int() when the text is not a number', 'ValueError', "int('abc') — the right kind of thing, the wrong value."],
    ['Name the error from asking a list for an item that is not there', 'IndexError', 'Position 5 of a list with 3 items.'],
    ['Name the error from asking a dictionary for a key it does not have', 'KeyError'],
    ['Name the error from dividing by zero', 'ZeroDivisionError'],
    ['Name the error from opening a file that does not exist', 'FileNotFoundError'],
    ['Name the error from getting the indentation wrong', 'IndentationError', 'Usually a missing four spaces under an if or a for.'],
    ['Name the error from forgetting the colon at the end of an if', 'SyntaxError', 'Python could not even read the line. Look at the line ABOVE the one it names.'],
    ['Say which end of a long error message to read first', 'the bottom', 'The last line names the error. The lines above show how it got there.'],
    ['Write the first line of a try block', 'try:'],
    ['Catch a ValueError and print the words not a number', "except ValueError:\n    print('not a number')"],
    ['Try to turn text into a number, printing not a number if it fails', "try:\n    n = int(text)\nexcept ValueError:\n    print('not a number')"],
    ['Try to divide a by b, giving 0 back when b is zero', 'try:\n    result = a / b\nexcept ZeroDivisionError:\n    result = 0'],
    ['Try to read a file, printing no file when it is not there', "try:\n    text = open(path).read()\nexcept FileNotFoundError:\n    print('no file')"],
    ['Catch an error and keep the message in a name called err', 'except ValueError as err:'],
    ['Print the error message held in err', 'print(err)'],
    ['Write the block that runs whether or not there was an error', 'finally:'],
    ['Raise your own ValueError saying age cannot be negative', "raise ValueError('age cannot be negative')", 'Better a clear error of your own than a confusing one three functions later.'],
    ['Check something is true and stop with a message if it is not', "assert total > 0, 'total must be positive'"]
  ]);

  ladder('Step by step · files and imports', 'sp-fi', [
    ['Import the whole random module', 'import random'],
    ['Import just the sqrt function out of the math module', 'from math import sqrt'],
    ['Import pandas the way everybody does', 'import pandas as pd', 'as pd is a nickname. Everyone uses the same one, so keep to it.'],
    ['Import numpy the way everybody does', 'import numpy as np'],
    ['Get a random whole number between 1 and 6', 'random.randint(1, 6)', 'Both ends are included, unlike range.'],
    ['Pick one random item out of the list items', 'random.choice(items)'],
    ['Shuffle the list items into a random order', 'random.shuffle(items)'],
    ['Open the file at path for reading, safely', 'with open(path) as f:', 'The with block closes the file for you, even if something goes wrong.'],
    ['Read the whole of the open file f into one piece of text', 'text = f.read()'],
    ['Read the open file f into a list of lines', 'lines = f.readlines()'],
    ['Loop over the open file f one line at a time', 'for line in f:', 'The memory-friendly way: one line at a time, whatever the file size.'],
    ['Open the file at path for writing', "with open(path, 'w') as f:", "'w' wipes the file first. 'a' adds to the end instead."],
    ['Write the word done into the open file f, with a new line', "f.write('done\\n')", 'write does NOT add a new line for you.'],
    ['Read every line of the file at path, stripped of its line ending', 'with open(path) as f:\n    lines = [line.strip() for line in f]'],
    ['Write every word in words into the open file f, one per line', "for word in words:\n    f.write(word + '\\n')"]
  ]);

  /* Same skills, new scenarios — the point is that nothing new is being taught. */
  ladder('Step by step · same idea, new scenario', 'sp-sc', [
    ['A shop: add up the prices in the list basket', 'sum(basket)'],
    ['A shop: count how many items are in the list basket', 'len(basket)'],
    ['A shop: find the most expensive price in basket', 'max(basket)'],
    ['A shop: add 20 percent VAT to the total in total', 'total * 1.2'],
    ['A shop: print the total to 2 decimal places with a pound sign', "print(f'£{total:.2f}')"],
    ['A shop: count how many prices in basket are over 10', 'count = 0\nfor price in basket:\n    if price > 10:\n        count += 1'],
    ['A class register: count how many pupils are in the list pupils', 'len(pupils)'],
    ['A class register: print every pupil name on its own line', 'for pupil in pupils:\n    print(pupil)'],
    ['A class register: find the pupils whose name starts with S', "[p for p in pupils if p.startswith('S')]"],
    ['A class register: work out the average of the marks in marks', 'sum(marks) / len(marks)'],
    ['A class register: count how many marks are 50 or more', 'sum(1 for m in marks if m >= 50)'],
    ['A class register: put the marks in order, highest first', 'sorted(marks, reverse=True)'],
    ['Weather: find the hottest reading in the list temps', 'max(temps)'],
    ['Weather: find the coldest reading in temps', 'min(temps)'],
    ['Weather: work out the average temperature in temps', 'sum(temps) / len(temps)'],
    ['Weather: count how many days in temps were above 20', 'sum(1 for t in temps if t > 20)'],
    ['Weather: build a list of the readings in temps rounded to 1 decimal place', '[round(t, 1) for t in temps]'],
    ['Weather: print each day number and its temperature, numbered from 1', "for day, t in enumerate(temps, start=1):\n    print(f'day {day}: {t}')"],
    ['A to-do list: add the word shopping to the end of the list todo', "todo.append('shopping')"],
    ['A to-do list: remove the word shopping from todo', "todo.remove('shopping')"],
    ['A to-do list: test whether shopping is already on the list todo', "'shopping' in todo"],
    ['A to-do list: print how many jobs are left in todo', 'print(len(todo))'],
    ['A phone book: get the number stored under Ann in the dictionary book', "book['Ann']"],
    ['A phone book: add Bob with the number 12345 to the dictionary book', "book['Bob'] = '12345'"],
    ['A phone book: get the number for Cat, or the words not found', "book.get('Cat', 'not found')"],
    ['A phone book: print every name and number in the dictionary book', 'for name, number in book.items():\n    print(name, number)'],
    ['A phone book: test whether Ann is in the dictionary book', "'Ann' in book"],
    ['A survey: count how many times each answer appears in the list answers', 'counts = {}\nfor answer in answers:\n    counts[answer] = counts.get(answer, 0) + 1'],
    ['A survey: find the answer given most often, using the counts dictionary', 'max(counts, key=counts.get)'],
    ['A survey: work out what percentage of answers were yes', "sum(1 for a in answers if a == 'yes') / len(answers) * 100"]
  ]);
})();
