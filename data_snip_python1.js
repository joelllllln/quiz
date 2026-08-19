/* Quickfire cards — core Python, part 1: strings, numbers, and the shape of a program.
   The bits a Python coding test assumes you can type without thinking. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var STR = 'Python · strings';
  var NUM = 'Python · numbers & maths';
  var FLW = 'Python · loops & conditions';

  window.SNIPPETS.push(

    /* ---- strings ---- */
    { id: 'py-fstring', group: STR, lvl: 1,
      ask: 'Print "Hello, Joel" using an f-string with the variable `name`',
      a: "print(f'Hello, {name}')",
      note: 'f-strings are the default in modern Python — nothing else reads as well.' },

    { id: 'py-fstring-round', group: STR, lvl: 2,
      ask: 'Format the float `x` to two decimal places inside an f-string',
      a: "f'{x:.2f}'",
      note: '{x:,.2f} adds thousands separators; {x:.1%} formats as a percentage.' },

    { id: 'py-fstring-pct', group: STR, lvl: 3,
      ask: 'Format the fraction `p` as a percentage with one decimal place',
      a: "f'{p:.1%}'",
      note: '0.8567 becomes 85.7% — the formatter multiplies by 100 for you.' },

    { id: 'py-upper', group: STR, lvl: 1,
      ask: 'Uppercase the string s',
      a: 's.upper()' },

    { id: 'py-lower', group: STR, lvl: 1,
      ask: 'Lowercase the string s',
      a: 's.lower()',
      note: 'Standard first move before comparing user-entered text.' },

    { id: 'py-strip', group: STR, lvl: 1,
      ask: 'Remove whitespace from both ends of the string s',
      a: 's.strip()',
      note: 'lstrip / rstrip do one side. s.strip(\',\') strips a specific character.' },

    { id: 'py-split', group: STR, lvl: 1,
      ask: 'Split the string s into a list of words on whitespace',
      a: 's.split()',
      note: 'No argument splits on any run of whitespace and drops the empties.' },

    { id: 'py-split-comma', group: STR, lvl: 1,
      ask: 'Split the string s on commas',
      a: "s.split(',')" },

    { id: 'py-join', group: STR, lvl: 1,
      ask: 'Join the list of strings `words` into one string separated by commas',
      a: "','.join(words)",
      note: 'The separator goes first — it is a method on the separator, not on the list.' },

    { id: 'py-join-space', group: STR, lvl: 1,
      ask: 'Join the list `words` into a sentence separated by spaces',
      a: "' '.join(words)" },

    { id: 'py-replace', group: STR, lvl: 1,
      ask: 'Replace every "a" with "b" in the string s',
      a: "s.replace('a', 'b')",
      note: 'Strings are immutable — this returns a new one, it does not edit s.' },

    { id: 'py-in-str', group: STR, lvl: 1,
      ask: 'Check whether the string s contains "cat"',
      a: "'cat' in s",
      note: 'The `in` operator works on strings, lists, dicts and sets.' },

    { id: 'py-startswith', group: STR, lvl: 1,
      ask: 'Check whether s starts with "http"',
      a: "s.startswith('http')",
      note: 'endswith is the mirror image; both accept a tuple of options.' },

    { id: 'py-len-str', group: STR, lvl: 1,
      ask: 'Get the length of the string s',
      a: 'len(s)' },

    { id: 'py-reverse-str', group: STR, lvl: 2,
      ask: 'Reverse the string s',
      a: 's[::-1]',
      note: 'The negative-step slice — a coding-test favourite.' },

    { id: 'py-slice-str', group: STR, lvl: 1,
      ask: 'Get the first three characters of s',
      a: 's[:3]' },

    { id: 'py-last-char', group: STR, lvl: 1,
      ask: 'Get the last character of s',
      a: 's[-1]' },

    { id: 'py-find', group: STR, lvl: 2,
      ask: 'Find the position of "x" in s, returning -1 if it is absent',
      a: "s.find('x')",
      note: 's.index(\'x\') does the same but raises ValueError when it is missing.' },

    { id: 'py-count-str', group: STR, lvl: 2,
      ask: 'Count how many times "a" appears in the string s',
      a: "s.count('a')" },

    { id: 'py-title', group: STR, lvl: 2,
      ask: 'Capitalise the first letter of every word in s',
      a: 's.title()',
      note: 's.capitalize() only does the first letter of the whole string.' },

    { id: 'py-isdigit', group: STR, lvl: 2,
      ask: 'Check whether the string s is made only of digits',
      a: 's.isdigit()',
      note: 'isalpha, isalnum and isspace are its siblings.' },

    { id: 'py-zfill', group: STR, lvl: 3,
      ask: 'Pad the string s with leading zeros to 5 characters',
      a: 's.zfill(5)' },

    { id: 'py-splitlines', group: STR, lvl: 2,
      ask: 'Split the multi-line string s into a list of lines',
      a: 's.splitlines()',
      note: 'Handles \\n and \\r\\n without you thinking about it.' },

    { id: 'py-str-cast', group: STR, lvl: 1,
      ask: 'Convert the number n to a string',
      a: 'str(n)' },

    { id: 'py-int-cast', group: STR, lvl: 1,
      ask: 'Convert the string s to an integer',
      a: 'int(s)',
      note: 'Raises ValueError on anything that is not a clean whole number.' },

    { id: 'py-float-cast', group: STR, lvl: 1,
      ask: 'Convert the string s to a float',
      a: 'float(s)' },

    /* ---- numbers ---- */
    { id: 'py-intdiv', group: NUM, lvl: 1,
      ask: 'Divide a by b keeping only the whole number part',
      a: 'a // b',
      note: 'Floor division. 7 // 2 is 3; -7 // 2 is -4, not -3.' },

    { id: 'py-mod', group: NUM, lvl: 1,
      ask: 'Get the remainder of a divided by b',
      a: 'a % b',
      note: 'n % 2 == 0 is the standard even test.' },

    { id: 'py-pow', group: NUM, lvl: 1,
      ask: 'Raise a to the power of b',
      a: 'a ** b',
      note: 'Two stars. ^ is bitwise XOR in Python and will quietly give nonsense.' },

    { id: 'py-round', group: NUM, lvl: 1,
      ask: 'Round the float x to 2 decimal places',
      a: 'round(x, 2)',
      note: 'Python rounds halves to even: round(2.5) is 2, round(3.5) is 4.' },

    { id: 'py-abs', group: NUM, lvl: 1,
      ask: 'Absolute value of x',
      a: 'abs(x)' },

    { id: 'py-min-max', group: NUM, lvl: 1,
      ask: 'Largest value in the list `nums`',
      a: 'max(nums)',
      note: 'max(a, b) also works on loose arguments, and key= chooses what to compare on.' },

    { id: 'py-sum', group: NUM, lvl: 1,
      ask: 'Sum the list `nums`',
      a: 'sum(nums)' },

    { id: 'py-mean-manual', group: NUM, lvl: 1,
      ask: 'Average of the list `nums`, in plain Python',
      a: 'sum(nums) / len(nums)',
      note: 'statistics.mean(nums) exists too, but this is what tests expect.' },

    { id: 'py-divmod', group: NUM, lvl: 3,
      ask: 'Get the quotient and remainder of a divided by b in one call',
      a: 'divmod(a, b)',
      note: 'Returns a tuple — the tidy way to convert seconds to minutes and seconds.' },

    { id: 'py-math-import', group: NUM, lvl: 1,
      ask: 'Import the maths module',
      a: 'import math' },

    { id: 'py-math-sqrt', group: NUM, lvl: 1,
      ask: 'Square root of x using the maths module',
      a: 'math.sqrt(x)',
      alts: ['x ** 0.5'] },

    { id: 'py-math-ceil', group: NUM, lvl: 2,
      ask: 'Round x up to the next whole number',
      a: 'math.ceil(x)',
      note: 'math.floor rounds down.' },

    { id: 'py-inf', group: NUM, lvl: 3,
      ask: 'Write positive infinity, for use as a starting "worst" value',
      a: "float('inf')",
      alts: ['math.inf'],
      note: 'The usual initial value when searching for a minimum.' },

    { id: 'py-random-import', group: NUM, lvl: 2,
      ask: 'Import the random module',
      a: 'import random' },

    { id: 'py-random-int', group: NUM, lvl: 2,
      ask: 'Random whole number from 1 to 6 inclusive',
      a: 'random.randint(1, 6)',
      note: 'Unlike most Python ranges, randint includes both ends.' },

    { id: 'py-random-choice', group: NUM, lvl: 2,
      ask: 'Pick one random element from the list `items`',
      a: 'random.choice(items)' },

    { id: 'py-random-seed', group: NUM, lvl: 2,
      ask: 'Seed Python\'s random module with 42',
      a: 'random.seed(42)' },

    /* ---- control flow ---- */
    { id: 'py-if', group: FLW, lvl: 1,
      ask: 'Start an if-statement testing whether x is greater than 10',
      a: 'if x > 10:',
      note: 'Colon then an indented block — four spaces by convention.' },

    { id: 'py-elif', group: FLW, lvl: 1,
      ask: 'Write the "otherwise, if x is greater than 5" branch',
      a: 'elif x > 5:',
      note: 'Python spells it elif, not "else if".' },

    { id: 'py-ternary', group: FLW, lvl: 2,
      ask: 'Assign "big" to label if x is over 10, otherwise "small", on one line',
      a: "label = 'big' if x > 10 else 'small'",
      note: 'Value first, then the condition — the reverse of most languages.' },

    { id: 'py-for-list', group: FLW, lvl: 1,
      ask: 'Loop over every item in the list `items`',
      a: 'for item in items:',
      note: 'Python iterates over the things themselves, not over indexes.' },

    { id: 'py-for-range', group: FLW, lvl: 1,
      ask: 'Loop the numbers 0 to 9',
      a: 'for i in range(10):',
      note: 'range stops before the number you give it.' },

    { id: 'py-range-start', group: FLW, lvl: 1,
      ask: 'Loop the numbers 1 to 10 inclusive',
      a: 'for i in range(1, 11):' },

    { id: 'py-enumerate', group: FLW, lvl: 1,
      ask: 'Loop over `items` with both the index and the value',
      a: 'for i, item in enumerate(items):',
      note: 'enumerate(items, 1) starts counting at 1 instead of 0.' },

    { id: 'py-zip', group: FLW, lvl: 1,
      ask: 'Loop over two lists `names` and `ages` in step',
      a: 'for name, age in zip(names, ages):',
      note: 'zip stops at the shorter list, silently.' },

    { id: 'py-while', group: FLW, lvl: 1,
      ask: 'Start a while loop that runs while x is less than 10',
      a: 'while x < 10:' },

    { id: 'py-break', group: FLW, lvl: 1,
      ask: 'Leave the current loop immediately',
      a: 'break',
      note: 'continue skips to the next iteration instead.' },

    { id: 'py-continue', group: FLW, lvl: 1,
      ask: 'Skip the rest of this iteration and move to the next',
      a: 'continue' },

    { id: 'py-pass', group: FLW, lvl: 1,
      ask: 'Write a do-nothing placeholder body',
      a: 'pass',
      note: 'Python needs a statement in every block; pass is the empty one.' },

    { id: 'py-reversed', group: FLW, lvl: 2,
      ask: 'Loop over `items` backwards',
      a: 'for item in reversed(items):',
      alts: ['for item in items[::-1]:'] },

    { id: 'py-for-dict', group: FLW, lvl: 1,
      ask: 'Loop over a dict `d` getting both keys and values',
      a: 'for key, value in d.items():',
      note: 'Looping over d alone gives you the keys only.' },

    { id: 'py-range-step', group: FLW, lvl: 2,
      ask: 'Loop over the even numbers from 0 up to 20 exclusive',
      a: 'for i in range(0, 20, 2):' },

    { id: 'py-countdown', group: FLW, lvl: 3,
      ask: 'Loop from 10 down to 1',
      a: 'for i in range(10, 0, -1):',
      note: 'A negative step needs a stop that is lower than the start.' },

    { id: 'py-else-loop', group: FLW, lvl: 3,
      ask: 'Attach the block that runs only if a for loop finished without hitting break',
      a: 'else:',
      note: 'for/else — rare, but it appears in search problems and in quizzes.' }
  );
})();
