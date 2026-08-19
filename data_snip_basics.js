/* Quickfire cards — the very first things. Nothing here assumes you have written
   Python before: printing, naming things, types, asking for input, and reading the
   error messages Python gives you back. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var ONE = 'First steps · printing & naming';
  var TWO = 'First steps · types & converting';
  var THREE = 'First steps · operators';
  var ERR = 'First steps · reading errors';

  window.SNIPPETS.push(

    /* ---- printing and naming ---- */
    { id: 'b-print', group: ONE, lvl: 1,
      ask: 'Print the words Hello, world!',
      a: "print('Hello, world!')",
      note: 'print puts something on the screen. The brackets hold what you want shown; the quotes make it text.' },

    { id: 'b-print-var', group: ONE, lvl: 1,
      ask: 'Print whatever is stored in the variable `total`',
      a: 'print(total)',
      note: 'No quotes round a name — quotes would print the word "total" instead of its contents.' },

    { id: 'b-print-two', group: ONE, lvl: 1,
      ask: 'Print the variables `name` and `age` side by side in one line',
      a: 'print(name, age)',
      note: 'print takes as many things as you like, separated by commas, and puts a space between them.' },

    { id: 'b-print-label', group: ONE, lvl: 1,
      ask: 'Print the word Total: followed by the variable `total`',
      a: "print('Total:', total)",
      note: 'Text in quotes, names without — that mix is most of everyday printing.' },

    { id: 'b-assign', group: ONE, lvl: 1,
      ask: 'Store the number 5 in a variable called x',
      a: 'x = 5',
      note: 'One equals sign means "put this into that". Two means "are these the same?".' },

    { id: 'b-assign-str', group: ONE, lvl: 1,
      ask: 'Store the text Ada in a variable called name',
      a: "name = 'Ada'",
      note: 'Quotes make it text. Single or double, as long as they match.' },

    { id: 'b-assign-float', group: ONE, lvl: 1,
      ask: 'Store the number 3.5 in a variable called price',
      a: 'price = 3.5',
      note: 'A number with a decimal point is a float; without one it is an int.' },

    { id: 'b-assign-bool', group: ONE, lvl: 1,
      ask: 'Store true in a variable called active',
      a: 'active = True',
      note: 'Capital T. True and False are Python words, not text — no quotes.' },

    { id: 'b-assign-none', group: ONE, lvl: 1,
      ask: 'Store "nothing yet" in a variable called result',
      a: 'result = None',
      note: 'None is Python\'s word for "no value". It is not 0 and not an empty string.' },

    { id: 'b-assign-two', group: ONE, lvl: 2,
      ask: 'Give a the value 1 and b the value 2 on a single line',
      a: 'a, b = 1, 2',
      note: 'Names on the left, values on the right, in the same order.' },

    { id: 'b-assign-list', group: ONE, lvl: 1,
      ask: 'Store the three numbers 1, 2 and 3 in a variable called nums',
      a: 'nums = [1, 2, 3]',
      note: 'Square brackets make a list — an ordered box you can add to later.' },

    { id: 'b-comment', group: ONE, lvl: 1,
      ask: 'Write a comment saying: work out the average',
      a: '# work out the average',
      note: 'Python ignores everything after a #. Comments say WHY, not what.' },

    { id: 'b-increment', group: ONE, lvl: 1,
      ask: 'Add 1 to the variable `count`, keeping the result in count',
      a: 'count += 1',
      note: 'Shorthand for count = count + 1. The counter line in almost every loop.' },

    { id: 'b-decrement', group: ONE, lvl: 2,
      ask: 'Take 1 away from the variable `lives`',
      a: 'lives -= 1',
      note: '-=, *= and /= all follow the same shape.' },

    { id: 'b-input', group: ONE, lvl: 1,
      ask: 'Ask the person to type their name, storing it in `name`',
      a: "name = input('Your name: ')",
      note: 'input always hands back text, even if they typed digits.' },

    { id: 'b-input-int', group: ONE, lvl: 2,
      ask: 'Ask for a number and store it as a whole number in `age`',
      a: "age = int(input('Your age: '))",
      note: 'Wrap input in int() or the "number" is really the text "30" and arithmetic breaks.' },

    { id: 'b-fstring-basic', group: ONE, lvl: 1,
      ask: 'Print Hello, then the variables `first` and `last`, using an f-string',
      a: "print(f'Hello, {first} {last}')",
      note: 'The f before the quote lets you drop names straight into the text in curly braces.' },

    { id: 'b-multiline-string', group: ONE, lvl: 2,
      ask: 'Store a string that spans several lines in `text`',
      a: "text = '''line one\nline two'''",
      alts: ['text = """line one\nline two"""'],
      note: 'Three quotes open and close a string that can contain real line breaks.' },

    { id: 'b-quote-inside', group: ONE, lvl: 2,
      ask: "Store the text It's fine in a variable called msg",
      a: 'msg = "It\'s fine"',
      note: 'Use double quotes round text containing an apostrophe — or escape it as \\\'.' },

    { id: 'b-newline', group: ONE, lvl: 2,
      ask: 'Print a and b on two separate lines with one print call',
      a: "print('a\\nb')",
      note: '\\n is the newline character. \\t is a tab.' },

    { id: 'b-print-sep', group: ONE, lvl: 3,
      ask: 'Print `a` and `b` separated by a comma instead of a space',
      a: "print(a, b, sep=', ')",
      note: 'sep changes what goes BETWEEN; end changes what goes after.' },

    { id: 'b-print-end', group: ONE, lvl: 3,
      ask: 'Print `x` without starting a new line afterwards',
      a: "print(x, end='')",
      note: 'end defaults to a newline — set it to nothing to keep printing on the same line.' },

    { id: 'b-run-script', group: ONE, lvl: 1,
      ask: 'Run the file script.py from a terminal',
      a: 'python script.py',
      note: 'On some machines it is python3. If Python cannot be found, that is a PATH problem, not a code problem.' },

    { id: 'b-indent', group: ONE, lvl: 1,
      ask: 'How many spaces does Python convention use for one level of indentation?',
      a: '4',
      note: 'Indentation is not decoration in Python — it is what says which lines belong to the if or the loop.' },

    /* ---- types and converting ---- */
    { id: 'b-type', group: TWO, lvl: 1,
      ask: 'Print what type of thing `x` is',
      a: 'print(type(x))',
      note: 'Returns int, float, str, bool, list, dict… The first question to ask when something behaves oddly.' },

    { id: 'b-to-int', group: TWO, lvl: 1,
      ask: "Turn the text '30' into the whole number 30",
      a: "int('30')",
      note: "int('30') gives 30. int('thirty') raises ValueError." },

    { id: 'b-to-float', group: TWO, lvl: 1,
      ask: "Turn the text '3.5' into a decimal number",
      a: "float('3.5')" },

    { id: 'b-to-str', group: TWO, lvl: 1,
      ask: "Glue the text 'Total: ' onto the number in `n`",
      a: "'Total: ' + str(n)",
      note: 'You cannot add text to a number — str() converts it first. print(\'Total:\', n) sidesteps the whole problem.' },

    { id: 'b-to-list', group: TWO, lvl: 2,
      ask: 'Turn the string `s` into a list of its characters',
      a: 'list(s)',
      note: "list('abc') gives ['a', 'b', 'c']." },

    { id: 'b-to-bool', group: TWO, lvl: 2,
      ask: 'Ask whether the value in `x` counts as true',
      a: 'bool(x)',
      note: 'Empty things — 0, "", [], {}, None — are False. Everything else is True.' },

    { id: 'b-int-float', group: TWO, lvl: 2,
      ask: 'Turn the float 3.9 into the whole number 3',
      a: 'int(3.9)',
      note: 'int() chops the decimal off rather than rounding. round(3.9) would give 4.' },

    { id: 'b-len-basic', group: TWO, lvl: 1,
      ask: 'Count the characters in the text `word`',
      a: 'len(word)',
      note: 'len works on strings, lists, dicts, sets — anything with a length.' },

    { id: 'b-isinstance-basic', group: TWO, lvl: 2,
      ask: 'Check whether `x` is a number of the whole-number kind',
      a: 'isinstance(x, int)',
      note: 'Prefer isinstance over comparing type(x) == int — it also accepts subclasses.' },

    { id: 'b-int-div-basic', group: TWO, lvl: 2,
      ask: 'Show why 3 / 2 and 3 // 2 differ — write the one that gives 1.5',
      a: '3 / 2',
      note: 'A single slash always gives a float; a double slash floors to a whole number.' },

    /* ---- operators ---- */
    { id: 'b-add', group: THREE, lvl: 1,
      ask: 'Add the variables a and b together',
      a: 'a + b',
      note: 'On numbers it adds; on strings and lists it joins.' },

    { id: 'b-multiply', group: THREE, lvl: 1,
      ask: 'Multiply `price` by `quantity`',
      a: 'price * quantity' },

    { id: 'b-str-repeat', group: THREE, lvl: 2,
      ask: 'Make a line of 20 dashes',
      a: "'-' * 20",
      note: 'Multiplying a string repeats it — the quickest separator in a printout.' },

    { id: 'b-equals', group: THREE, lvl: 1,
      ask: 'Check whether x is the same as 10',
      a: 'x == 10',
      note: 'Two equals signs to compare, one to assign. Mixing them up is the first bug everyone writes.' },

    { id: 'b-not-equals', group: THREE, lvl: 1,
      ask: 'Check whether `status` is anything other than the text ok',
      a: "status != 'ok'" },

    { id: 'b-and', group: THREE, lvl: 1,
      ask: 'Check that age is over 18 AND status is the text ok',
      a: "age > 18 and status == 'ok'",
      note: 'In plain Python it is the word `and`. The symbol & is for pandas masks and bitwise work.' },

    { id: 'b-or', group: THREE, lvl: 1,
      ask: 'Check that `role` is admin OR `owner` is true',
      a: "role == 'admin' or owner",
      note: 'or is happy with either side; and needs both.' },

    { id: 'b-not', group: THREE, lvl: 1,
      ask: 'Check that `active` is NOT true',
      a: 'not active',
      note: 'Reads like English, and beats comparing with == False.' },

    { id: 'b-in-basic', group: THREE, lvl: 1,
      ask: 'Check whether the value 3 appears in the list `nums`',
      a: '3 in nums',
      note: 'The same word works on strings, lists, dicts (keys) and sets.' },

    { id: 'b-ge', group: THREE, lvl: 1,
      ask: 'Check whether `score` is at least 50',
      a: 'score >= 50',
      note: '>= is "greater than or equal to". The equals sign comes second.' },

    { id: 'b-between-basic', group: THREE, lvl: 2,
      ask: 'Check that `age` is between 18 and 65 inclusive, in one chained comparison',
      a: '18 <= age <= 65',
      note: 'Python lets you chain comparisons — it reads exactly like the maths.' },

    { id: 'b-is-none', group: THREE, lvl: 2,
      ask: 'Check whether `result` holds nothing yet',
      a: 'result is None',
      note: 'Use `is` for None, True and False. Use == for values.' },

    /* ---- reading errors ---- */
    { id: 'b-err-name', group: ERR, lvl: 1,
      ask: 'Which error does Python raise when you use a name it has never seen?',
      a: 'NameError',
      note: 'Usually a typo, or a variable created inside something that has finished.' },

    { id: 'b-err-type', group: ERR, lvl: 1,
      ask: "Which error is raised by 'age: ' + 30 ?",
      a: 'TypeError',
      note: 'You cannot add text to a number. Convert first: \'age: \' + str(30).' },

    { id: 'b-err-value', group: ERR, lvl: 1,
      ask: "Which error is raised by int('abc') ?",
      a: 'ValueError',
      note: 'Right type, impossible value — the classic dirty-data error.' },

    { id: 'b-err-index', group: ERR, lvl: 1,
      ask: 'Which error is raised by asking a 3-item list for item number 10?',
      a: 'IndexError',
      note: 'Remember the first item is at 0, so the last of three is at 2.' },

    { id: 'b-err-key', group: ERR, lvl: 1,
      ask: 'Which error is raised by asking a dict for a key it does not have?',
      a: 'KeyError',
      note: 'Use d.get(key) instead when the key might be missing.' },

    { id: 'b-err-zero', group: ERR, lvl: 1,
      ask: 'Which error is raised by dividing by zero?',
      a: 'ZeroDivisionError',
      note: 'Guard the divisor whenever it comes from data: if n: total / n.' },

    { id: 'b-err-indent', group: ERR, lvl: 1,
      ask: 'Which error means your spacing at the start of a line is wrong?',
      a: 'IndentationError',
      note: 'Almost always a mix of tabs and spaces, or a block that lost its indent.' },

    { id: 'b-err-syntax', group: ERR, lvl: 1,
      ask: 'Which error means Python could not even read your code — a missing colon or bracket?',
      a: 'SyntaxError',
      note: 'Look at the line BEFORE the one reported: an unclosed bracket points at the next line.' },

    { id: 'b-err-attr', group: ERR, lvl: 2,
      ask: "Which error is raised by calling .upper() on a number?",
      a: 'AttributeError',
      note: '"This kind of thing has no such method" — often because a variable holds None.' },

    { id: 'b-err-module', group: ERR, lvl: 2,
      ask: 'Which error means the package you imported is not installed?',
      a: 'ModuleNotFoundError',
      note: 'pip install it — and check you are installing into the same Python you are running.' },

    { id: 'b-err-last-line', group: ERR, lvl: 2,
      ask: 'Which line of a traceback names the actual problem — the first or the last?',
      a: 'the last',
      note: 'Read a traceback bottom-up: the last line is the error, the lines above it are how you got there.' },

    { id: 'b-err-try', group: ERR, lvl: 2,
      ask: 'Catch a ValueError so the program can carry on (the clause, not the try line)',
      a: 'except ValueError:',
      note: 'It follows a try: block. Name the error you expect — a bare except hides real bugs.' }
  );
})();
