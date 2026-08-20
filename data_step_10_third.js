/* Step-by-step ladders, 10 — third pass. The same handful of shapes once more, in
   contexts nobody has used yet, plus the tiny variations that catch people out. */
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

  ladder('Step by step · again, with a library', 'sp-b1', [
    ['Store the list of book titles in a name called books', "books = ['Dune', 'Emma']"],
    ['Add the title Ivanhoe to the end of books', "books.append('Ivanhoe')"],
    ['Count how many books there are', 'len(books)'],
    ['Test whether Emma is in the books list', "'Emma' in books"],
    ['Find the position of Emma in the books list', "books.index('Emma')"],
    ['Remove Emma from the books list', "books.remove('Emma')"],
    ['Put the books into alphabetical order', 'books.sort()'],
    ['Print the books numbered from 1', 'for i, book in enumerate(books, start=1):\n    print(i, book)'],
    ['Build a list of the books with titles longer than 4 letters', '[b for b in books if len(b) > 4]'],
    ['Build a list of the book titles in capitals', '[b.upper() for b in books]'],
    ['Store which member has which book in a dictionary called loans', "loans = {'Dune': 'Ann'}"],
    ['Record that Bob has borrowed Emma', "loans['Emma'] = 'Bob'"],
    ['Find out who has Dune, or the words on the shelf', "loans.get('Dune', 'on the shelf')"],
    ['Test whether Emma is currently on loan', "'Emma' in loans"],
    ['Give Emma back by removing it from loans', "del loans['Emma']"],
    ['Count how many books are on loan', 'len(loans)'],
    ['Print each book and who has it', 'for book, member in loans.items():\n    print(book, member)'],
    ['Build a list of the books Ann has out', "[book for book, member in loans.items() if member == 'Ann']"],
    ['Write a function is_overdue that says whether days_out is over 14', 'def is_overdue(days_out):\n    return days_out > 14'],
    ['Write a function fine_for that charges 20p a day past 14 days', 'def fine_for(days_out):\n    if days_out <= 14:\n        return 0\n    return (days_out - 14) * 0.2']
  ]);

  ladder('Step by step · again, with a step counter', 'sp-b2', [
    ['Store the list of daily steps in a name called steps', 'steps = [4000, 9000, 12000]'],
    ['Add up the steps for the week', 'sum(steps)'],
    ['Find the best day', 'max(steps)'],
    ['Find the worst day', 'min(steps)'],
    ['Work out the average steps per day', 'sum(steps) / len(steps)'],
    ['Count how many days beat 10000 steps', 'sum(1 for s in steps if s > 10000)'],
    ['Build a list of the days that beat 10000 steps', '[s for s in steps if s > 10000]'],
    ['Build a list saying good when a day beat 10000, otherwise poor', "['good' if s > 10000 else 'poor' for s in steps]"],
    ['Work out what percentage of days beat 10000', 'sum(1 for s in steps if s > 10000) / len(steps) * 100'],
    ['Print each day numbered with its step count', 'for day, s in enumerate(steps, start=1):\n    print(day, s)'],
    ['Print the best day number as well as the count', 'best = max(steps)\nprint(steps.index(best) + 1, best)'],
    ['Round the average to the nearest whole number', 'round(sum(steps) / len(steps))'],
    ['Build a running total of steps across the week', 'total = 0\nfor s in steps:\n    total += s\n    print(total)'],
    ['Find the first day that beat 10000 and stop looking', 'for s in steps:\n    if s > 10000:\n        print(s)\n        break'],
    ['Test whether every day beat 5000 steps', 'all(s > 5000 for s in steps)'],
    ['Test whether any day beat 20000 steps', 'any(s > 20000 for s in steps)'],
    ['Sort the days from best to worst', 'sorted(steps, reverse=True)'],
    ['Get the top three days', 'sorted(steps, reverse=True)[:3]'],
    ['Write a function met_goal that says whether a day reached the goal', 'def met_goal(day_steps, goal):\n    return day_steps >= goal'],
    ['Write a function weekly_average that gives 0 for an empty week', 'def weekly_average(week):\n    if not week:\n        return 0\n    return sum(week) / len(week)']
  ]);

  ladder('Step by step · the small things that catch people out', 'sp-gt', [
    ['Print the number 5 as text joined to the word age, without an error', "print('age ' + str(5))", 'Text and numbers cannot be added directly. str() converts, or use an f-string.'],
    ['Join the age number onto text using an f-string instead of str', "f'age {age}'"],
    ['Turn the text 5 into a number before adding 1 to it', "int('5') + 1"],
    ['Get a whole number from dividing 7 by 2', '7 // 2', 'A single slash would give 3.5.'],
    ['Ask whether a and b hold the same number, without changing either', 'a == b', 'One equals sign would store b in a, which is a different thing entirely.'],
    ['Compare text ignoring capital letters', 'a.lower() == b.lower()'],
    ['Get the LAST item of items without knowing how long it is', 'items[-1]'],
    ['Get the last item of items using its length instead', 'items[len(items) - 1]', 'Both work. The minus one version is what Python people write.'],
    ['Copy the list items so changing the copy leaves the original alone', 'copy = items[:]', 'copy = items would make two names for the SAME list.'],
    ['Copy the dictionary row safely', 'copy = dict(row)'],
    ['Loop over a copy of items so you can remove from the original safely', 'for item in items[:]:', 'Removing from a list while looping over it skips items.'],
    ['Make an empty set, not an empty dictionary', 'seen = set()', '{} on its own is a dictionary.'],
    ['Test whether a number is between two others the readable way', '1 <= n <= 10'],
    ['Round 2.675 to 2 places and accept that it may not be 2.68', 'round(2.675, 2)', 'Binary floating point cannot hold 2.675 exactly. For money, work in pence.'],
    ['Compare two decimals allowing for floating point error', 'math.isclose(a, b)'],
    ['Check a list is not empty before dividing by its length', 'if nums:\n    average = sum(nums) / len(nums)'],
    ['Get a value from a dictionary without risking a KeyError', "row.get('city')"],
    ['Get an item from a list without risking an IndexError', 'items[0] if items else None'],
    ['Turn the True or False in flag into the number 1 or 0', 'int(flag)'],
    ['Count the trues in a list of True and False values', 'sum(flags)', 'True is 1 and False is 0, so summing counts them.'],
    ['Stop input() giving you text when you wanted a number', "n = int(input('number: '))"],
    ['Strip the new line off the end of a line read from a file', 'line.strip()'],
    ['Test that the lists first and second match item for item, in order', 'first == second', 'Lists compare item by item, so this is all it takes.'],
    ['Test that first and second hold the same items in any order', 'sorted(first) == sorted(second)'],
    ['Make a number print with exactly 2 decimal places', "f'{n:.2f}'"]
  ]);
})();
