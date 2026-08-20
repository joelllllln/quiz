/* Output questions, one tiny step at a time. Two lines of code, one small idea,
   and the next question changes exactly one thing. */
(function () {
  window.PYQUIZ = window.PYQUIZ || [];
  function Q(id, group, code, correct, wrong, explain) {
    window.PYQUIZ.push({ id: id, group: group, lvl: 1, code: code, correct: correct, wrong: wrong, explain: explain });
  }
  var A = 'One step · printing and names';
  var B = 'One step · numbers';
  var C = 'One step · text';
  var D = 'One step · lists';
  var E = 'One step · loops and ifs';
  var F = 'One step · dictionaries';

  /* ---- printing and names ---- */
  Q('qs-print-word', A, "print('hello')", 'hello', ["'hello'", 'print(hello)', 'nothing'],
    'print shows what is inside the quotes. The quotes themselves are not part of the text — they only mark where it starts and ends.');
  Q('qs-print-number', A, 'print(5)', '5', ["'5'", 'print(5)', '5.0'],
    'A number with no quotes prints as a number. Nothing is added and nothing is rounded.');
  Q('qs-print-two', A, "print('a', 'b')", 'a b', ['ab', "a, b", "'a' 'b'"],
    'Two things separated by a comma print with a single space between them, because that is what print puts between its arguments by default.');
  Q('qs-print-plus', A, "print('a' + 'b')", 'ab', ['a b', 'a+b', 'ab '],
    'Plus glues text together with nothing in between. Comma adds a space; plus does not.');
  Q('qs-print-sep', A, "print('a', 'b', sep='-')", 'a-b', ['a b', 'ab', 'a - b'],
    'sep replaces what goes BETWEEN the things being printed — here a dash instead of the usual space.');
  Q('qs-print-blank', A, "print('a')\nprint()\nprint('b')", 'a\n\nb', ['a\nb', 'a b', 'a\n\n\nb'],
    'print() with nothing in it prints an empty line, so a blank line appears between the two letters.');
  Q('qs-name-print', A, "name = 'Ann'\nprint(name)", 'Ann', ['name', "'Ann'", 'Ann Ann'],
    'Without quotes, Python looks the name up and prints what is stored in it.');
  Q('qs-name-quotes', A, "name = 'Ann'\nprint('name')", 'name', ['Ann', "'name'", 'nothing'],
    'With quotes it is just text, so the word name is printed rather than the value stored under it.');
  Q('qs-name-replace', A, 'x = 1\nx = 2\nprint(x)', '2', ['1', '3', '1\n2'],
    'Assigning again replaces what was there. A name holds exactly one value at a time.');
  Q('qs-name-plusequals', A, 'x = 1\nx += 4\nprint(x)', '5', ['1', '4', '14'],
    '+= adds to what is already there. It is the same as x = x + 4.');
  Q('qs-name-swap', A, 'a = 1\nb = 2\na, b = b, a\nprint(a, b)', '2 1', ['1 2', '2 2', '1 1'],
    'The right-hand side is worked out first, so both values are captured before either name changes — which is why no temporary variable is needed.');
  Q('qs-name-copy-number', A, 'a = 1\nb = a\na = 9\nprint(b)', '1', ['9', '0', 'None'],
    'b was given the VALUE that a held at the time. Changing a afterwards does not reach back and change b.');

  /* ---- numbers ---- */
  Q('qs-num-add', B, 'print(2 + 3)', '5', ['23', "'5'", '6'],
    'Two numbers add up. If they had been text in quotes, the same + would have joined them into 23.');
  Q('qs-num-text-add', B, "print('2' + '3')", '23', ['5', "'23'", 'TypeError'],
    'The same plus sign means "join" for text. This is why numbers typed by a user have to be converted before you do sums.');
  Q('qs-num-mix', B, "print('2' + 3)", 'TypeError', ['23', '5', "'23'"],
    'Text and a number cannot be added. Convert one of them first: int(\'2\') + 3, or \'2\' + str(3).');
  Q('qs-num-divide', B, 'print(6 / 2)', '3.0', ['3', '3.5', '2'],
    'A single slash always gives a decimal, even when the division is exact.');
  Q('qs-num-intdivide', B, 'print(7 // 2)', '3', ['3.5', '4', '3.0'],
    'Two slashes throw the decimals away and give a whole number.');
  Q('qs-num-mod', B, 'print(7 % 2)', '1', ['3', '3.5', '0'],
    'The percent sign gives the remainder — 2 goes into 7 three times with 1 left over.');
  Q('qs-num-mod-zero', B, 'print(10 % 5)', '0', ['2', '5', '1'],
    'A remainder of 0 means it divided exactly, which is how "is it a multiple of" is always tested.');
  Q('qs-num-power', B, 'print(2 ** 3)', '8', ['6', '9', '5'],
    'Two stars is "to the power of". 2 to the power of 3 is 2 times 2 times 2.');
  Q('qs-num-order', B, 'print(2 + 3 * 4)', '14', ['20', '9', '24'],
    'Multiplication happens before addition, exactly as in school maths. Brackets change it: (2 + 3) * 4 is 20.');
  Q('qs-num-round', B, 'print(round(2.567, 1))', '2.6', ['2.5', '2.57', '3'],
    'The second argument is how many decimal places to keep, and it rounds rather than chopping.');
  Q('qs-num-int-cut', B, 'print(int(2.9))', '2', ['3', '2.9', '2.0'],
    'int() chops the decimal part off — it does not round. round(2.9) would give 3.');
  Q('qs-num-str-int', B, "print(int('12') + 1)", '13', ["'121'", '121', 'TypeError'],
    'int() turns the text into a real number first, so the plus adds instead of joining.');

  /* ---- text ---- */
  Q('qs-txt-upper', C, "print('ann'.upper())", 'ANN', ['ann', 'Ann', "'ANN'"],
    '.upper() gives back a new piece of text in capitals. The original is unchanged, because text can never be edited in place.');
  Q('qs-txt-len', C, "print(len('hello'))", '5', ['4', '6', "'5'"],
    'len() counts characters, starting from one — even though positions start from zero.');
  Q('qs-txt-index0', C, "print('hello'[0])", 'h', ['e', 'o', "'h'"],
    'Positions count from 0, so [0] is the first character.');
  Q('qs-txt-index1', C, "print('hello'[1])", 'e', ['h', 'l', 'ell'],
    'One step along from the last question: [1] is the SECOND character.');
  Q('qs-txt-index-last', C, "print('hello'[-1])", 'o', ['h', 'l', 'olleh'],
    'A minus counts from the end, so [-1] is the last character whatever the length.');
  Q('qs-txt-slice', C, "print('hello'[:3])", 'hel', ['hell', 'llo', 'he'],
    'A slice stops BEFORE the number you give, so [:3] takes positions 0, 1 and 2.');
  Q('qs-txt-slice-from', C, "print('hello'[2:])", 'llo', ['he', 'hel', 'lo'],
    'With the start given and the end left off, the slice runs to the end of the text.');
  Q('qs-txt-reverse', C, "print('abc'[::-1])", 'cba', ['abc', 'a', 'cb'],
    'A step of minus one walks backwards through the whole thing.');
  Q('qs-txt-repeat', C, "print('ab' * 2)", 'abab', ['ab ab', 'abab ', 'TypeError'],
    'Multiplying text repeats it with nothing in between.');
  Q('qs-txt-strip', C, "print('  hi  '.strip() + '!')", 'hi!', ['  hi  !', 'hi  !', '  hi!'],
    'strip() removes whitespace from BOTH ends and leaves the middle alone.');
  Q('qs-txt-replace', C, "print('a-b-c'.replace('-', ''))", 'abc', ['a-b-c', 'abc-', 'a b c'],
    'Replacing with an empty string is how you delete every copy of something.');
  Q('qs-txt-split', C, "print('a b'.split())", "['a', 'b']", ["'a b'", "['a b']", "['a', ' ', 'b']"],
    'split() with no argument cuts on whitespace and gives back a LIST of the pieces.');
  Q('qs-txt-in', C, "print('ell' in 'hello')", 'True', ['False', "'ell'", '2'],
    'in asks whether one piece of text appears inside another, and answers True or False.');
  Q('qs-txt-fstring', C, "name = 'Ann'\nprint(f'hi {name}')", 'hi Ann', ['hi {name}', 'hi name', 'hiAnn'],
    'The f before the quotes is what makes the curly brackets get replaced. Without it you would see the brackets themselves.');
  Q('qs-txt-fstring-format', C, "n = 3.14159\nprint(f'{n:.2f}')", '3.14', ['3.14159', '3.1', '3'],
    'The part after the colon is a format instruction: .2f means two decimal places.');
  Q('qs-txt-case-compare', C, "print('Ann' == 'ann')", 'False', ['True', 'None', 'Error'],
    'Comparing text is case-sensitive. Lower-case both sides when you want to ignore capitals.');

  /* ---- lists ---- */
  Q('qs-lst-index', D, 'nums = [10, 20, 30]\nprint(nums[0])', '10', ['20', '1', '30'],
    'Lists count from 0 exactly as text does, so [0] is the first item.');
  Q('qs-lst-last', D, 'nums = [10, 20, 30]\nprint(nums[-1])', '30', ['10', '20', '3'],
    'Minus one is the last item — no need to know how long the list is.');
  Q('qs-lst-len', D, 'nums = [10, 20, 30]\nprint(len(nums))', '3', ['30', '2', '6'],
    'len() counts the ITEMS in a list, not their size.');
  Q('qs-lst-append', D, 'nums = [1, 2]\nnums.append(3)\nprint(nums)', '[1, 2, 3]', ['[3, 1, 2]', '[1, 2]', '[1, 2, [3]]'],
    'append adds one item to the END and changes the list in place — it gives nothing back.');
  Q('qs-lst-append-return', D, 'nums = [1, 2]\nresult = nums.append(3)\nprint(result)', 'None', ['[1, 2, 3]', '3', '[1, 2]'],
    'append changes the list and returns None. Assigning its result is a common beginner bug that quietly loses the list.');
  Q('qs-lst-sum', D, 'print(sum([1, 2, 3]))', '6', ['123', '[1, 2, 3]', '3'],
    'sum adds the numbers up. On a list of text it would raise a TypeError.');
  Q('qs-lst-slice', D, 'nums = [1, 2, 3, 4]\nprint(nums[:2])', '[1, 2]', ['[1, 2, 3]', '[2, 3]', '[3, 4]'],
    'The same slicing rule as text: up to, but not including, position 2.');
  Q('qs-lst-in', D, 'print(2 in [1, 2, 3])', 'True', ['False', '1', '2'],
    'in checks membership and answers True or False.');
  Q('qs-lst-sorted', D, 'nums = [3, 1, 2]\nprint(sorted(nums))', '[1, 2, 3]', ['[3, 2, 1]', 'None', '[3, 1, 2]'],
    'sorted() hands back a NEW sorted list and leaves the original alone.');
  Q('qs-lst-sort-return', D, 'nums = [3, 1, 2]\nprint(nums.sort())', 'None', ['[1, 2, 3]', '[3, 1, 2]', '3'],
    '.sort() rearranges the list in place and returns None. sorted(nums) is the one to print.');
  Q('qs-lst-alias', D, 'a = [1, 2]\nb = a\nb.append(3)\nprint(a)', '[1, 2, 3]', ['[1, 2]', '[3]', '[1, 2, [3]]'],
    'b = a makes a second NAME for the same list, not a copy. Use list(a) or a[:] when you want an independent one.');
  Q('qs-lst-comp', D, 'print([n * 2 for n in [1, 2, 3]])', '[2, 4, 6]', ['[1, 2, 3]', '6', '[2, 4, 6, 2, 4, 6]'],
    'A comprehension makes a new list by doing something to every item.');
  Q('qs-lst-comp-if', D, 'print([n for n in [1, 2, 3, 4] if n % 2 == 0])', '[2, 4]', ['[1, 3]', '[2]', '[True, False]'],
    'The if at the end decides which items are kept. Nothing is changed here — only filtered.');

  /* ---- loops and ifs ---- */
  Q('qs-loop-range', E, 'for i in range(3):\n    print(i)', '0\n1\n2', ['1\n2\n3', '0\n1\n2\n3', '3'],
    'range(3) counts 0, 1, 2 — three numbers, starting at zero and stopping before three.');
  Q('qs-loop-range-two', E, 'for i in range(1, 4):\n    print(i)', '1\n2\n3', ['1\n2\n3\n4', '0\n1\n2\n3', '1\n4'],
    'With two numbers, range starts at the first and stops BEFORE the second.');
  Q('qs-loop-list', E, "for x in ['a', 'b']:\n    print(x)", 'a\nb', ["['a', 'b']", 'a b', '0\n1'],
    'Looping a list hands you one ITEM at a time, not the positions.');
  Q('qs-loop-enumerate', E, "for i, x in enumerate(['a', 'b']):\n    print(i, x)", '0 a\n1 b', ['1 a\n2 b', 'a 0\nb 1', 'a\nb'],
    'enumerate gives the position and the item together, and the position starts at 0 unless you say otherwise.');
  Q('qs-loop-total', E, 'total = 0\nfor n in [1, 2, 3]:\n    total += n\nprint(total)', '6', ['3', '123', '1\n3\n6'],
    'The running-total shape: start at 0, add each item, print once at the END — the print is outside the loop.');
  Q('qs-loop-total-inside', E, 'total = 0\nfor n in [1, 2, 3]:\n    total += n\n    print(total)', '1\n3\n6', ['6', '1\n2\n3', '0\n1\n3'],
    'One extra level of indentation moves the print INSIDE the loop, so it runs on every turn. Indentation is not decoration.');
  Q('qs-loop-break', E, 'for n in [1, 2, 3]:\n    if n == 2:\n        break\n    print(n)', '1', ['1\n2', '1\n3', '1\n2\n3'],
    'break leaves the loop immediately, so 2 is never printed and 3 is never reached.');
  Q('qs-loop-continue', E, 'for n in [1, 2, 3]:\n    if n == 2:\n        continue\n    print(n)', '1\n3', ['1', '1\n2\n3', '2'],
    'continue skips the rest of THIS turn and carries on with the next one.');
  Q('qs-if-else', E, "n = 5\nif n > 10:\n    print('big')\nelse:\n    print('small')", 'small', ['big', 'big\nsmall', 'nothing'],
    'Only one branch ever runs. 5 is not above 10, so the else does.');
  Q('qs-if-elif', E, "n = 5\nif n > 10:\n    print('big')\nelif n > 3:\n    print('medium')\nelse:\n    print('small')", 'medium', ['small', 'big', 'medium\nsmall'],
    'The first true branch wins and the rest are skipped, which is why the order of the tests matters.');
  Q('qs-if-empty-list', E, "items = []\nif items:\n    print('some')\nelse:\n    print('none')", 'none', ['some', 'True', 'False'],
    'An empty list counts as false, so "if items" reads naturally as "if there is anything in it".');
  Q('qs-while', E, 'n = 3\nwhile n > 0:\n    print(n)\n    n -= 1', '3\n2\n1', ['3\n2\n1\n0', '0\n1\n2', '3'],
    'The while checks BEFORE each turn, so it stops as soon as n reaches 0 rather than printing it.');

  /* ---- dictionaries ---- */
  Q('qs-dic-get', F, "prices = {'tea': 2}\nprint(prices['tea'])", '2', ["'tea'", "{'tea': 2}", 'None'],
    'Square brackets with the KEY inside gives you the value stored under it.');
  Q('qs-dic-missing', F, "prices = {'tea': 2}\nprint(prices['jam'])", 'KeyError', ['None', '0', "''"],
    'Asking for a key that is not there raises KeyError. .get() is the version that hands back None instead.');
  Q('qs-dic-get-default', F, "prices = {'tea': 2}\nprint(prices.get('jam', 0))", '0', ['KeyError', 'None', 'jam'],
    'The second argument to .get is the fallback used when the key is missing.');
  Q('qs-dic-add', F, "d = {}\nd['a'] = 1\nprint(d)", "{'a': 1}", ['{}', "{'a'}", 'KeyError'],
    'Assigning to a key that does not exist yet CREATES it — no separate step needed.');
  Q('qs-dic-len', F, "print(len({'a': 1, 'b': 2}))", '2', ['1', '4', '3'],
    'len() on a dictionary counts the keys.');
  Q('qs-dic-loop', F, "for k in {'a': 1, 'b': 2}:\n    print(k)", 'a\nb', ['1\n2', "a 1\nb 2", "('a', 1)"],
    'Looping a dictionary gives the KEYS. Use .values() or .items() for the other two views.');
  Q('qs-dic-items', F, "for k, v in {'a': 1}.items():\n    print(k, v)", 'a 1', ['a', '1', "('a', 1)"],
    '.items() hands you the key and the value together, which is why the loop takes two names.');
  Q('qs-dic-tally', F, "counts = {}\nfor w in ['a', 'b', 'a']:\n    counts[w] = counts.get(w, 0) + 1\nprint(counts)", "{'a': 2, 'b': 1}", ["{'a': 1, 'b': 1}", "{'a': 3}", "{'a': 2}"],
    'The counting pattern in full: .get(w, 0) treats a word never seen before as 0, so the first sighting becomes 1.');
  Q('qs-dic-in', F, "print('a' in {'a': 1})", 'True', ['False', '1', "'a'"],
    'in on a dictionary looks at the KEYS, not the values.');
  Q('qs-dic-order', F, "d = {'b': 1}\nd['a'] = 2\nprint(list(d))", "['b', 'a']", ["['a', 'b']", "['b']", "{'b', 'a'}"],
    'A dictionary keeps the order things were ADDED, not alphabetical order. Turning it into a list gives the keys.');
})();
