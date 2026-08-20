/* Step-by-step ladders, 1 — printing, names and numbers.
   Every card moves one inch from the one before it: the same idea in a slightly
   different scenario, again and again, until the line comes out without thinking. */
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

  /* ---------------- printing ---------------- */
  ladder('Step by step · printing', 'sp-pr', [
    ['Print the word hello', "print('hello')", 'print() puts something on the screen. The quotes mean "this is text".'],
    ['Print the word goodbye', "print('goodbye')", 'Same line, different word. That is the whole point of a ladder.'],
    ['Print the word yes', "print('yes')"],
    ['Print the two words hello there', "print('hello there')", 'A space inside the quotes is just part of the text.'],
    ['Print the words good morning', "print('good morning')"],
    ['Print hello with an exclamation mark after it', "print('hello!')"],
    ['Print the question what is your name, with a question mark', "print('what is your name?')"],
    ['Print the number 7 as a number, with no quotes', 'print(7)', 'No quotes means Python treats it as a number, not text.'],
    ['Print the number 100 as a number', 'print(100)'],
    ['Print the decimal number 2.5', 'print(2.5)'],
    ['Print the number 0', 'print(0)'],
    ['Print an empty line', 'print()', 'print() with nothing in it prints a blank line.'],
    ['Print the price 19.99 with a pound sign in front of it, as text', "print('£19.99')", 'Inside quotes, anything you type comes out exactly as it is.'],
    ['Print the two words hello and world as two separate things to print', "print('hello', 'world')", 'Two arguments, separated by a comma. print puts a space between them.'],
    ['Print the two numbers 1 and 2 as two separate things', 'print(1, 2)'],
    ['Print the word score and the number 10 as two separate things', "print('score', 10)", 'You can mix text and numbers as long as they are separate arguments.'],
    ['Print the words hello and world joined together with a plus', "print('hello' + 'world')", 'Plus glues text together with NO space — you get helloworld.'],
    ['Print hello and world joined with a plus and a space between them', "print('hello' + ' ' + 'world')", 'The space has to be text too.'],
    ['Print the words hello and world separated by a dash instead of a space', "print('hello', 'world', sep='-')", 'sep changes what goes BETWEEN the things you print.'],
    ['Print hello and world with nothing at all between them, using sep', "print('hello', 'world', sep='')", 'An empty sep glues them together.'],
    ['Print hello and world separated by a comma and a space, using sep', "print('hello', 'world', sep=', ')"],
    ['Print hello without moving to a new line afterwards', "print('hello', end='')", 'end changes what goes AFTER the line. The default is a new line.'],
    ['Print hello followed by a space instead of a new line', "print('hello', end=' ')"],
    ['Print hello then a full stop instead of a new line', "print('hello', end='.')"],
    ['Print the word line one, then the word line two, on two separate lines', "print('line one')\nprint('line two')", 'Two print calls make two lines.'],
    ['Print the words top and bottom on two separate lines, using two print calls', "print('top')\nprint('bottom')"],
    ['Print the two words a and b on separate lines with ONE print call', "print('a\\nb')", '\\n inside text means "new line here".'],
    ['Print the words first and second on separate lines with one print call', "print('first\\nsecond')"],
    ['Print the words name and age separated by a tab, in one print call', "print('name\\tage')", '\\t is a tab.'],
    ["Print the word don't, which has an apostrophe in it", 'print("don\'t")', 'Wrap it in double quotes so the apostrophe is not mistaken for the end.'],
    ['Print the sentence she said "hi" including the double quotes', 'print(\'she said "hi"\')', 'The other way round: double quotes inside, single quotes outside.'],
    ['Print the word hello three times on one line using multiplication', "print('hello' * 3)", 'Multiplying text repeats it.'],
    ['Print five dashes in a row using multiplication', "print('-' * 5)", 'The quick way to draw a line under something.'],
    ['Print twenty equals signs in a row', "print('=' * 20)"],
    ['Print the result of adding 2 and 3', 'print(2 + 3)', 'Python works out the sum first, then prints the answer: 5.'],
    ['Print the result of 10 take away 4', 'print(10 - 4)'],
    ['Print the result of 6 times 7', 'print(6 * 7)'],
    ['Print the result of 20 divided by 4', 'print(20 / 4)', 'Division always gives a decimal: 5.0, not 5.'],
    ['Print the word total, then the result of 2 plus 3, as two things', "print('total', 2 + 3)"],
    ['Print the sentence the answer is 42, all as one piece of text', "print('the answer is 42')"]
  ]);

  /* ---------------- names & values ---------------- */
  ladder('Step by step · names & values', 'sp-nm', [
    ['Store the word Ann in a name called first_name', "first_name = 'Ann'", 'One equals sign means "put this into that".'],
    ['Store the word Smith in a name called last_name', "last_name = 'Smith'"],
    ['Store the word London in a name called city', "city = 'London'"],
    ['Store the number 30 in a name called age', 'age = 30', 'No quotes, so it is a number you can do sums with.'],
    ['Store the number 5 in a name called count', 'count = 5'],
    ['Store the decimal 19.99 in a name called price', 'price = 19.99'],
    ['Store the number 0 in a name called total', 'total = 0', 'Starting a total at 0 is how nearly every counting loop begins.'],
    ['Print what is stored in first_name', 'print(first_name)', 'No quotes: quotes would print the WORD first_name instead of what is in it.'],
    ['Print what is stored in age', 'print(age)'],
    ['Print what is stored in price', 'print(price)'],
    ['Store the word Ann in name and then print it, on two lines', "name = 'Ann'\nprint(name)"],
    ['Store 30 in age and then print it, on two lines', 'age = 30\nprint(age)'],
    ['Change what is in age so it holds 31 instead', 'age = 31', 'Assigning again just replaces what was there.'],
    ['Add 1 to whatever is in age', 'age = age + 1', 'The right-hand side is worked out first, then put back into age.'],
    ['Add 1 to age using the shorter form', 'age += 1', '+= is exactly the same thing, written shorter.'],
    ['Add 10 to total using the short form', 'total += 10'],
    ['Take 1 away from count using the short form', 'count -= 1'],
    ['Double what is in price using the short form', 'price *= 2'],
    ['Store the sum of 2 and 3 in a name called total_now', 'total_now = 2 + 3'],
    ['Store the result of price times 2 in a name called doubled', 'doubled = price * 2'],
    ['Store first_name and last_name joined with a space in a name called full_name', "full_name = first_name + ' ' + last_name"],
    ['Store the word Ann in a name and the word Bob in b, on one line each', "a = 'Ann'\nb = 'Bob'"],
    ['Store 1 in x and 2 in y on a single line', 'x, y = 1, 2', 'Two names, two values, one line.'],
    ['Swap what is in x and y on one line', 'x, y = y, x', 'No temporary variable needed — Python builds the right-hand side first.'],
    ['Store the same value 0 in both wins and losses on one line', 'wins = losses = 0'],
    ['Print the sentence hello and then what is in first_name, as two things', "print('hello', first_name)"],
    ['Print what is in city followed by what is in age, as two things', 'print(city, age)'],
    ['Store nothing yet — put None into a name called answer', 'answer = None', 'None is Python\'s word for "no value yet".'],
    ['Check what type of thing is in price', 'type(price)', 'type() tells you whether Python sees text, a whole number or a decimal.'],
    ['Check what type of thing is in first_name', 'type(first_name)'],
    ['Store the text 5 — with quotes — in a name called five_text', "five_text = '5'", "'5' is TEXT that looks like a number. You cannot do sums with it until you convert it."],
    ['Turn the text in five_text into a whole number and store it in five', 'five = int(five_text)'],
    ['Turn the number in age into text and store it in age_text', 'age_text = str(age)'],
    ['Turn the text 3.5 stored in price_text into a decimal number', 'price = float(price_text)'],
    ['Turn the decimal in price into a whole number, throwing away the decimals', 'whole = int(price)', 'int() chops the decimals off rather than rounding.'],
    ['Round the number in price to the nearest whole number', 'rounded = round(price)'],
    ['Round the number in price to 2 decimal places', 'rounded = round(price, 2)'],
    ['Find out how many characters are in first_name', 'len(first_name)', 'len() counts characters in text and items in a list.'],
    ['Store how many characters are in first_name in a name called n', 'n = len(first_name)'],
    ['Delete the name temp so it no longer exists', 'del temp']
  ]);

  /* ---------------- numbers ---------------- */
  ladder('Step by step · numbers', 'sp-num', [
    ['Add a and b together', 'a + b'],
    ['Take b away from a', 'a - b'],
    ['Multiply a by b', 'a * b'],
    ['Divide a by b', 'a / b', 'A single slash always gives a decimal, even when it divides exactly.'],
    ['Divide a by b and throw away the decimals', 'a // b', 'Two slashes: whole-number division.'],
    ['Get the remainder when a is divided by b', 'a % b', 'The percent sign is "what is left over".'],
    ['Raise a to the power of b, using the two-star operator', 'a ** b', 'Two stars, not the ^ symbol — ^ means something else entirely in Python.'],
    ['Square the number in a', 'a ** 2'],
    ['Cube the number in a', 'a ** 3'],
    ['Get the square root of a using the power operator', 'a ** 0.5'],
    ['Add 10 percent to price', 'price * 1.1', 'Adding 10% is multiplying by 1.1.'],
    ['Take 20 percent off price', 'price * 0.8'],
    ['Work out 15 percent OF price', 'price * 0.15'],
    ['Work out what percentage part is of whole', 'part / whole * 100'],
    ['Get the whole number of times 7 goes into n', 'n // 7'],
    ['Get the remainder when n is divided by 7', 'n % 7'],
    ['Get the last digit of the whole number n', 'n % 10', 'The remainder after dividing by 10 is always the last digit.'],
    ['Test whether n divides exactly by 2', 'n % 2 == 0', 'A remainder of 0 means it divided exactly — which is how you test for even.'],
    ['Test whether n divides exactly by 5', 'n % 5 == 0'],
    ['Test whether n divides exactly by 3', 'n % 3 == 0'],
    ['Get the positive size of n, ignoring any minus sign', 'abs(n)'],
    ['Get the bigger of a and b', 'max(a, b)'],
    ['Get the smaller of a and b', 'min(a, b)'],
    ['Get the biggest of a, b and c', 'max(a, b, c)'],
    ['Round n to the nearest whole number', 'round(n)'],
    ['Round n to 1 decimal place', 'round(n, 1)'],
    ['Round n to the nearest 10', 'round(n, -1)', 'A negative number of places rounds to tens, hundreds and so on.'],
    ['Get the whole-number part and the remainder of a divided by b in one go', 'divmod(a, b)', 'Gives back both answers as a pair.'],
    ['Add up the numbers in the list nums', 'sum(nums)'],
    ['Find the biggest number in the list nums', 'max(nums)'],
    ['Find the smallest number in the list nums', 'min(nums)'],
    ['Count how many numbers are in the list nums', 'len(nums)'],
    ['Work out the average of the numbers in nums', 'sum(nums) / len(nums)', 'Total divided by how many. Guard against an empty list before you divide.'],
    ['Import the module for square roots and other maths', 'import math'],
    ['Get the square root of n using the maths module', 'math.sqrt(n)'],
    ['Round n UP to the next whole number', 'math.ceil(n)'],
    ['Round n DOWN to the whole number below', 'math.floor(n)'],
    ['Get the value of pi', 'math.pi'],
    ['Turn the decimal 0.256 stored in rate into a percentage rounded to 1 place', 'round(rate * 100, 1)'],
    ['Work out the total cost of quantity items at price each', 'quantity * price']
  ]);
})();
