/* Step-by-step ladders, 2 — text, f-strings, asking the user, and true or false. */
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

  /* ---------------- working with text ---------------- */
  ladder('Step by step · text', 'sp-tx', [
    ['Make all of the text in name UPPER CASE', 'name.upper()', 'A method is a thing text can do to itself: name DOT upper, then brackets.'],
    ['Make all of the text in name lower case', 'name.lower()'],
    ['Make all of the text in city upper case', 'city.upper()', 'Same method, different piece of text. Nothing else changes.'],
    ['Make just the first letter of name a capital', 'name.capitalize()'],
    ['Make the first letter of every word in name a capital', 'name.title()'],
    ['Count how many characters are in name', 'len(name)'],
    ['Count how many characters are in city', 'len(city)'],
    ['Get the FIRST character of name', 'name[0]', 'Python counts from 0, so the first character is number 0.'],
    ['Get the SECOND character of name', 'name[1]'],
    ['Get the LAST character of name', 'name[-1]', 'Minus one means "one from the end" — much easier than counting.'],
    ['Get the SECOND TO LAST character of name', 'name[-2]'],
    ['Get the first three characters of name', 'name[:3]', 'Up to but NOT including position 3.'],
    ['Get the first five characters of name', 'name[:5]'],
    ['Get everything in name from position 3 onwards', 'name[3:]'],
    ['Get characters 2, 3 and 4 of name', 'name[2:5]', 'Start is included, end is not: 2, 3, 4.'],
    ['Get everything in name except the last character', 'name[:-1]'],
    ['Get the last three characters of name', 'name[-3:]'],
    ['Reverse the text in name', 'name[::-1]', 'A step of minus one walks the text backwards.'],
    ['Remove the spaces from both ends of name', 'name.strip()', 'The first thing you do to anything typed in by a person.'],
    ['Remove spaces from the LEFT end of name only', 'name.lstrip()'],
    ['Remove spaces from the RIGHT end of name only', 'name.rstrip()'],
    ['Swap every letter a in name for the letter b', "name.replace('a', 'b')"],
    ['Remove every space from inside name', "name.replace(' ', '')", 'Replacing with nothing is how you delete something.'],
    ['Swap every dash in code for a space', "code.replace('-', ' ')"],
    ['Split the sentence in text into a list of words', 'text.split()', 'With no argument, split cuts on any run of spaces.'],
    ['Split the text in line wherever there is a comma', "line.split(',')"],
    ['Split the text in line wherever there is a dash', "line.split('-')"],
    ['Join the list of words in words back into a sentence with spaces', "' '.join(words)", 'The separator goes FIRST, then .join(the list).'],
    ['Join the list of words in words with commas between them', "','.join(words)"],
    ['Join the list of words in words with nothing between them', "''.join(words)"],
    ['Test whether name contains the letter a', "'a' in name", 'in gives back True or False.'],
    ['Test whether the sentence in text contains the word cat', "'cat' in text"],
    ['Test whether name starts with the letter A', "name.startswith('A')"],
    ['Test whether the filename in f ends with .csv', "f.endswith('.csv')"],
    ['Find the position of the first letter a in name', "name.find('a')", 'Gives back -1 when it is not there, rather than raising an error.'],
    ['Count how many times the letter a appears in name', "name.count('a')"],
    ['Test whether everything in code is a digit', 'code.isdigit()'],
    ['Test whether everything in name is letters', 'name.isalpha()'],
    ['Pad the text in name out to 10 characters with spaces on the right', 'name.ljust(10)', 'Handy for lining columns up in a printed report.'],
    ['Pad the number text in n out to 3 characters with zeros on the left', "n.zfill(3)", 'Turns 7 into 007.']
  ]);

  /* ---------------- f-strings ---------------- */
  ladder('Step by step · f-strings', 'sp-fs', [
    ['Build the text hello Ann by putting name inside an f-string', "f'hello {name}'", 'An f in front of the quotes lets you drop a name in curly brackets.'],
    ['Build the text hi Ann using an f-string', "f'hi {name}'"],
    ['Build the text welcome to London by putting city inside an f-string', "f'welcome to {city}'"],
    ['Print hello followed by what is in name, using an f-string', "print(f'hello {name}')"],
    ['Print what is in name followed by the words is here, using an f-string', "print(f'{name} is here')"],
    ['Build the text Ann is 30 using name and age in one f-string', "f'{name} is {age}'", 'As many curly brackets as you like in one piece of text.'],
    ['Build the text Ann lives in London using name and city', "f'{name} lives in {city}'"],
    ['Print the total using an f-string that says total: then the number', "print(f'total: {total}')"],
    ['Print the count using an f-string that says count = then the number', "print(f'count = {count}')"],
    ['Build an f-string holding the sum of a and b, worked out inside the brackets', "f'{a + b}'", 'You can put a whole calculation inside the curly brackets.'],
    ['Build an f-string saying the total is, then price times quantity', "f'the total is {price * quantity}'"],
    ['Show the number in price to exactly 2 decimal places in an f-string', "f'{price:.2f}'", 'The bit after the colon says how to format it. .2f means two decimals.'],
    ['Show the number in price to 1 decimal place', "f'{price:.1f}'"],
    ['Show the number in price to 2 decimals with a pound sign in front', "f'£{price:.2f}'"],
    ['Show the big number in n with commas between the thousands', "f'{n:,}'"],
    ['Show the fraction in rate as a percentage with 1 decimal place', "f'{rate:.1%}'", 'The percent format multiplies by 100 and adds the sign for you.'],
    ['Show the text in name padded out to 10 characters on the right', "f'{name:<10}'", 'Less-than means "push it left".'],
    ['Show the text in name pushed to the right in 10 characters', "f'{name:>10}'"],
    ['Show the number in n padded with zeros to three digits', "f'{n:03d}'"],
    ['Show what is in name with its quotes visible, using an f-string', "f'{name!r}'", '!r shows it the way Python would — quotes and all. Perfect for spotting stray spaces.']
  ]);

  /* ---------------- asking the user ---------------- */
  ladder('Step by step · asking the user', 'sp-in', [
    ['Ask the user to type something and store it in answer', 'answer = input()', 'input() waits for someone to type and press enter.'],
    ['Ask what is your name and store the reply in name', "name = input('what is your name? ')", 'The text in the brackets is the prompt they see.'],
    ['Ask how old are you and store the reply in age_text', "age_text = input('how old are you? ')"],
    ['Ask for a number and store it as a whole number in n', "n = int(input('enter a number: '))", 'input ALWAYS gives text back, so wrap it in int() when you want a number.'],
    ['Ask for a price and store it as a decimal number in price', "price = float(input('enter a price: '))"],
    ['Ask for a name and store it with the spaces trimmed off', "name = input('name: ').strip()", 'Trim what people type, always.'],
    ['Ask for a name and store it in lower case', "name = input('name: ').lower()"],
    ['Ask for a yes or no and store just the first letter in lower case', "answer = input('yes or no? ').lower()[0]"],
    ['Ask for two numbers on one line and split them into a list', "parts = input('two numbers: ').split()"],
    ['Print hello followed by what the user typed into name, with an f-string', "print(f'hello {name}')"]
  ]);

  /* ---------------- true or false ---------------- */
  ladder('Step by step · true or false', 'sp-bool', [
    ['Test whether a is the same as b', 'a == b', 'Two equals signs asks a question. One equals sign puts something into a name.'],
    ['Test whether a is NOT the same as b', 'a != b'],
    ['Test whether age is bigger than 18', 'age > 18'],
    ['Test whether age is 18 or bigger', 'age >= 18'],
    ['Test whether price is less than 10', 'price < 10'],
    ['Test whether price is 10 or less', 'price <= 10'],
    ['Test whether n is exactly 0', 'n == 0'],
    ['Test whether name is exactly the word Ann', "name == 'Ann'"],
    ['Test whether name is NOT the word Ann', "name != 'Ann'"],
    ['Test whether age is over 18 AND under 65', 'age > 18 and age < 65', 'Both halves have to be true.'],
    ['Test whether age is between 18 and 65 by chaining the comparison', '18 < age < 65', 'Python lets you write it the way you would say it.'],
    ['Test whether city is London OR Leeds', "city == 'London' or city == 'Leeds'", 'Either one being true is enough.'],
    ['Test whether city is one of London, Leeds or York, using in', "city in ('London', 'Leeds', 'York')", 'Much shorter than three ors.'],
    ['Test whether age is NOT over 18', 'not age > 18'],
    ['Test whether the list nums is empty', 'not nums', 'An empty list counts as false, so "not nums" means "nothing in it".'],
    ['Test whether the list nums has anything in it', 'len(nums) > 0'],
    ['Test whether the value in answer is None', 'answer is None', 'Use is, not ==, when you are comparing to None.'],
    ['Test whether the value in answer is NOT None', 'answer is not None'],
    ['Store the answer to "is age over 18" in a name called adult', 'adult = age > 18', 'A comparison gives back True or False, which you can store like anything else.'],
    ['Turn the truth of "n is over 10" into 1 or 0', 'int(n > 10)', 'True counts as 1 and False as 0 — the cheapest way to count things.']
  ]);
})();
