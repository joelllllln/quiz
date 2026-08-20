/* The course, stage 01 — one tiny step at a time.
   This is the slow lane, and it is meant to be. Every unit teaches ONE small thing,
   drills it until it is automatic, then asks for it again in a different scenario.
   Nothing in here assumes anything from the unit before except the thing it drilled. */
(function () {
  window.COURSE = window.COURSE || { stages: [] };

  window.COURSE.stages.push({
    key: 'step', no: '01', name: 'One tiny step at a time',
    blurb: 'From your very first print to reading a spreadsheet — in the smallest steps we can make. Each unit adds one idea and then repeats it until it is boring.',
    units: [

      { key: 's1', name: 'Printing',
        blurb: 'One line. Then the same line with something else in it.',
        needs: 'nothing at all',
        steps: [
          { t: 'read', title: 'The whole of your first program', body: [
            'A Python program is a list of instructions, run top to bottom. This is a complete one:',
            ['code', "print('hello')", 'Say it out loud: print, open bracket, quote, hello, quote, close bracket.'],
            'The **quotes** say "this is text". Without them Python would look for something CALLED hello and complain that there is no such thing.',
            ['code', "print('hello')   # hello — the text\nprint(5)         # 5     — a number needs no quotes\nprint()          #       — a blank line"],
            'Two prints make two lines, in the order they are written:',
            ['code', "print('top')\nprint('bottom')"],
            'You can print more than one thing at a time by separating them with a comma. print puts a space between them:',
            ['code', "print('hello', 'world')   # hello world\nprint('score', 10)        # score 10"],
            ['aside', 'That is genuinely all you need for the next twenty cards. Each one changes one word, and you type the whole line every time — typing it is the point.']
          ] },
          { t: 'quick', title: 'Drill: printing', groups: ['Step by step · printing'], size: 12 },
          { t: 'quiz', title: 'What does it print?', ids: ['qs-print-word', 'qs-print-number', 'qs-print-two', 'qs-print-plus', 'qs-print-sep', 'qs-print-blank'] },
          { t: 'problem', id: 'st-give-five' }
        ] },

      { key: 's2', name: 'Names for things',
        blurb: 'Put a value into a name; get it back out. Then do it again with different values.',
        needs: 'printing',
        steps: [
          { t: 'read', title: 'A name is a label, not a box', body: [
            'One equals sign puts a value into a name:',
            ['code', "name = 'Ann'\nage = 30\nprice = 19.99", 'The name goes on the LEFT, the value on the right. Names have no quotes; text values do.'],
            'Then you can use the name anywhere the value would go:',
            ['code', "print(name)         # Ann\nprint(age)          # 30\nprint(name, age)    # Ann 30"],
            'Printing the name in quotes is a different thing entirely — that prints the WORD:',
            ['code', "print('name')   # name\nprint(name)     # Ann"],
            'Assigning again replaces what was there, and you can build a new value out of the old one:',
            ['code', "age = 30\nage = age + 1   # 31\nage += 1        # 32 — exactly the same thing, written shorter"],
            ['aside', 'Names can hold anything: text, numbers, lists, whole tables. The line you are learning here never changes shape, however big the thing on the right gets.']
          ] },
          { t: 'quick', title: 'Drill: names and values', groups: ['Step by step · names & values'], size: 12 },
          { t: 'quiz', title: 'What is in the name now?', ids: ['qs-name-print', 'qs-name-quotes', 'qs-name-replace', 'qs-name-plusequals', 'qs-name-swap', 'qs-name-copy-number'] },
          { t: 'problem', id: 'st-give-back' },
          { t: 'problem', id: 'st-add-one' }
        ] },

      { key: 's3', name: 'Sums',
        blurb: 'Plus, minus, times, divide — then the two that surprise people.',
        needs: 'names',
        steps: [
          { t: 'read', title: 'Arithmetic, and two odd ones', body: [
            'The four you expect work as they do on paper:',
            ['code', 'a + b     # add\na - b     # take away\na * b     # times\na / b     # divide'],
            'Two more come up constantly and are worth learning now:',
            ['code', '7 // 2    # 3 — whole-number division, decimals thrown away\n7 % 2     # 1 — the REMAINDER, what is left over', 'A remainder of 0 means it divided exactly, which is how "is it even" and "every third one" are always written.'],
            'One trap: a single slash ALWAYS gives a decimal, even when it divides exactly. 6 / 2 is 3.0, not 3.',
            'Multiplication and division happen before addition and subtraction, so brackets matter:',
            ['code', 'print(2 + 3 * 4)     # 14\nprint((2 + 3) * 4)   # 20'],
            'And rounding is a function you call, with the places as a second argument:',
            ['code', 'round(2.567)      # 3\nround(2.567, 1)   # 2.6\nround(2.567, 2)   # 2.57']
          ] },
          { t: 'quick', title: 'Drill: numbers', groups: ['Step by step · numbers'], size: 12 },
          { t: 'quiz', title: 'What does the sum give?', ids: ['qs-num-add', 'qs-num-divide', 'qs-num-intdivide', 'qs-num-mod', 'qs-num-mod-zero', 'qs-num-power', 'qs-num-order', 'qs-num-round', 'qs-num-int-cut'] },
          { t: 'problem', id: 'st-add-ten' },
          { t: 'problem', id: 'st-double-it' },
          { t: 'problem', id: 'st-add-two-nums' },
          { t: 'problem', id: 'st-subtract' },
          { t: 'problem', id: 'st-multiply' }
        ] },

      { key: 's4', name: 'Text, one method at a time',
        blurb: 'Upper, lower, length, first letter, last letter — one card each.',
        needs: 'names',
        steps: [
          { t: 'read', title: 'Things text can do to itself', body: [
            'A **method** is something a value can do, written with a dot:',
            ['code', "name.upper()     # 'ANN'\nname.lower()     # 'ann'\nname.strip()     # spaces off both ends\nname.replace('a', 'b')", 'Every one of these gives back NEW text. The original never changes — text in Python cannot be edited in place.'],
            'Length and position are the other half:',
            ['code', "len(name)     # how many characters\nname[0]       # the FIRST character — counting starts at 0\nname[1]       # the second\nname[-1]      # the last, however long it is\nname[:3]      # the first three\nname[2:]      # everything from position 2 on"],
            'Say the counting rule out loud once: **positions start at zero, and a slice stops before the number you give.**',
            ['code', "'hello'[0]     # 'h'\n'hello'[:3]    # 'hel'  — positions 0, 1, 2\n'hello'[-1]    # 'o'"],
            ['aside', 'These same square brackets work on lists in two units\' time. Learning them here means lists arrive half-known.']
          ] },
          { t: 'quick', title: 'Drill: text', groups: ['Step by step · text'], size: 14 },
          { t: 'quiz', title: 'What comes out of the text?', ids: ['qs-txt-upper', 'qs-txt-len', 'qs-txt-index0', 'qs-txt-index1', 'qs-txt-index-last', 'qs-txt-slice', 'qs-txt-slice-from', 'qs-txt-reverse', 'qs-txt-repeat', 'qs-txt-strip', 'qs-txt-replace', 'qs-txt-split', 'qs-txt-case-compare'] },
          { t: 'problem', id: 'st-shout-text' },
          { t: 'problem', id: 'st-whisper-text' },
          { t: 'problem', id: 'st-text-length' },
          { t: 'problem', id: 'st-first-letter' },
          { t: 'problem', id: 'st-last-letter' },
          { t: 'problem', id: 'st-initials-one' }
        ] },

      { key: 's5', name: 'Building a sentence',
        blurb: 'f-strings: drop a value into some text, then format it.',
        needs: 'text',
        steps: [
          { t: 'read', title: 'Putting a value inside text', body: [
            'Put an **f** in front of the quotes and you can drop names into the text in curly brackets:',
            ["code", "name = 'Ann'\nage = 30\n\nf'hello {name}'          # 'hello Ann'\nf'{name} is {age}'       # 'Ann is 30'\nf'next year: {age + 1}'  # 'next year: 31'", 'Anything inside the curly brackets is worked out first, including whole sums.'],
            'Without the f, nothing happens — you get the brackets themselves. That is the first thing to check when an f-string looks wrong.',
            'After a colon you can say how to show the value:',
            ['code', "f'{price:.2f}'    # 19.99  — two decimal places\nf'£{price:.2f}'   # £19.99\nf'{n:,}'          # 1,234,567\nf'{rate:.1%}'     # 12.3%"],
            ['aside', 'You will use `f\'{x:.2f}\'` more than almost any other line in this course. Money, averages, percentages — anything a person reads.']
          ] },
          { t: 'quick', title: 'Drill: f-strings', groups: ['Step by step · f-strings'], size: 10 },
          { t: 'quiz', title: 'What does the f-string build?', ids: ['qs-txt-fstring', 'qs-txt-fstring-format'] },
          { t: 'problem', id: 'st-greet-name' },
          { t: 'problem', id: 'st-repeat-text' },
          { t: 'problem', id: 'st-round-money' }
        ] },

      { key: 's6', name: 'True or false',
        blurb: 'Every comparison, one card at a time.',
        needs: 'numbers and text',
        steps: [
          { t: 'read', title: 'Asking a question in code', body: [
            'A comparison gives back True or False, and nothing else:',
            ['code', 'a == b     # the same?\na != b     # different?\na > b      # bigger?\na >= b     # bigger or the same?\na < b\na <= b'],
            '**One equals sign stores. Two equals signs ask.** That is the single most common beginner mistake there is.',
            'You can join two questions:',
            ['code', "age > 18 and age < 65     # both must be true\ncity == 'London' or city == 'Leeds'   # either will do\nnot age > 18              # the opposite", 'Python lets you write the first one the way you would say it: 18 < age < 65.'],
            'in asks whether something is inside something else, and works on text, lists and dictionaries:',
            ['code', "'cat' in text\n3 in nums\n'city' in row"],
            'And a comparison can be stored, printed or returned like any other value:',
            ['code', 'adult = age > 18\nprint(adult)   # True or False']
          ] },
          { t: 'quick', title: 'Drill: true or false', groups: ['Step by step · true or false'], size: 12 },
          { t: 'quiz', title: 'True, or false?', ids: ['qs-txt-in', 'qs-lst-in', 'qs-dic-in'] },
          { t: 'problem', id: 'st-is-even' },
          { t: 'problem', id: 'st-is-positive' },
          { t: 'problem', id: 'st-remainder' }
        ] },

      { key: 's7', name: 'Choosing what to do',
        blurb: 'if, else, elif — and the four spaces that decide what belongs to what.',
        needs: 'true or false',
        steps: [
          { t: 'read', title: 'if, and the indentation', body: [
            'An if runs the indented lines underneath it, but only when its question is true:',
            ['code', "if age > 18:\n    print('adult')", 'Colon at the end of the if line. Four spaces in front of everything that belongs to it.'],
            'else covers everything the if did not catch, and takes no question of its own:',
            ['code', "if age > 18:\n    print('adult')\nelse:\n    print('child')"],
            'elif — "else, if" — is checked only when the ones above it were false. The FIRST true one wins:',
            ['code', "if score >= 80:\n    print('A')\nelif score >= 60:\n    print('B')\nelse:\n    print('C')", 'Order matters: put the highest bar first, or everything falls into the first branch.'],
            'The indentation is not decoration. These two programs do different things:',
            ['code', "for n in nums:\n    total += n\n    print(total)   # prints every time round\n\nfor n in nums:\n    total += n\nprint(total)       # prints once, at the end"],
            ['aside', 'When the whole choice is about picking a value, the one-line form is tidier: `status = \'adult\' if age > 18 else \'child\'`.']
          ] },
          { t: 'quick', title: 'Drill: if', groups: ['Step by step · if'], size: 12 },
          { t: 'quiz', title: 'Which branch runs?', ids: ['qs-if-else', 'qs-if-elif', 'qs-if-empty-list'] },
          { t: 'problem', id: 'st-bigger-of-two' },
          { t: 'problem', id: 'st-average-two' }
        ] },

      { key: 's8', name: 'Lists',
        blurb: 'Make one, add to it, get things out of it — one card per move.',
        needs: 'text positions',
        steps: [
          { t: 'read', title: 'A list is many things under one name', body: [
            ['code', "nums = [1, 2, 3]\nnames = ['Ann', 'Bob']\nitems = []            # empty, ready to fill"],
            'Getting things out uses exactly the square brackets you learned on text:',
            ['code', 'nums[0]     # first\nnums[-1]    # last\nnums[:2]    # the first two\nlen(nums)   # how many'],
            'Changing a list happens in place — the list itself changes, and nothing is handed back:',
            ['code', "nums.append(4)      # add to the end\nnums.insert(0, 0)   # add at a position\nnums.remove(3)      # remove the first 3\nnums.pop()          # take the last one OFF and give it to you\nnums.sort()         # rearrange in place — returns None!"],
            'That last point catches everyone: `nums.sort()` sorts and gives back nothing, while `sorted(nums)` leaves the list alone and gives back a new one. The same split runs through the whole language.',
            'And the summary functions work straight off a list:',
            ['code', 'sum(nums)\nmax(nums)\nmin(nums)\nlen(nums)']
          ] },
          { t: 'quick', title: 'Drill: lists', groups: ['Step by step · lists, one step at a time'], size: 14 },
          { t: 'quiz', title: 'What is the list now?', ids: ['qs-lst-index', 'qs-lst-last', 'qs-lst-len', 'qs-lst-append', 'qs-lst-append-return', 'qs-lst-sum', 'qs-lst-slice', 'qs-lst-sorted', 'qs-lst-sort-return', 'qs-lst-alias'] },
          { t: 'problem', id: 'st-first-item' },
          { t: 'problem', id: 'st-last-item' },
          { t: 'problem', id: 'st-how-many' },
          { t: 'problem', id: 'st-total-list' },
          { t: 'problem', id: 'st-largest' },
          { t: 'problem', id: 'st-smallest' }
        ] },

      { key: 's9', name: 'The loop line',
        blurb: 'Just the first line, ten different ways.',
        needs: 'lists',
        steps: [
          { t: 'read', title: 'for something in something', body: [
            'Every loop starts the same way: a name for one item, and the thing to walk through.',
            ['code', 'for n in nums:        # one number at a time\nfor word in words:    # one word at a time\nfor ch in text:       # one CHARACTER at a time\nfor row in rows:      # one row at a time'],
            'The name after `for` is yours to choose, and it exists only inside the loop.',
            'To repeat a fixed number of times, loop over a range:',
            ['code', 'for i in range(5):       # 0, 1, 2, 3, 4\nfor i in range(1, 6):    # 1, 2, 3, 4, 5\nfor i in range(5, 0, -1) # 5, 4, 3, 2, 1', 'range stops BEFORE its second number, exactly like a slice.'],
            'And three helpers that come up constantly:',
            ['code', 'for i, n in enumerate(nums):        # position and item\nfor a, b in zip(names, scores):    # two lists side by side\nfor key, value in prices.items():  # a dictionary, both halves']
          ] },
          { t: 'quick', title: 'Drill: the loop line', groups: ['Step by step · the loop line'], size: 12 },
          { t: 'quiz', title: 'What does the loop walk over?', ids: ['qs-loop-range', 'qs-loop-range-two', 'qs-loop-list', 'qs-loop-enumerate'] }
        ] },

      { key: 's10', name: 'Inside the loop',
        blurb: 'The same loop line, with something different underneath it.',
        needs: 'the loop line',
        steps: [
          { t: 'read', title: 'What goes under the colon', body: [
            'Everything indented under the for line runs once per item:',
            ['code', 'for n in nums:\n    print(n)\n\nfor n in nums:\n    print(n * 2)\n\nfor name in names:\n    print(name.upper())'],
            'An if inside a for gives you two levels of indentation, and that is as deep as most code ever needs to go:',
            ['code', 'for n in nums:\n    if n > 10:\n        print(n)'],
            'Two words change the flow:',
            ['code', 'continue   # skip the rest of THIS turn, carry on with the next\nbreak      # leave the loop entirely, now'],
            'And a loop inside a loop walks every combination — the inner one runs completely for each turn of the outer:',
            ['code', 'for row in rows:\n    for item in row:\n        print(item)']
          ] },
          { t: 'quick', title: 'Drill: inside the loop', groups: ['Step by step · inside the loop'], size: 12 },
          { t: 'quiz', title: 'What does the loop print?', ids: ['qs-loop-break', 'qs-loop-continue', 'qs-while'] }
        ] },

      { key: 's11', name: 'Counting and totalling',
        blurb: 'The two most useful loops there are, drilled until they are automatic.',
        needs: 'inside the loop',
        steps: [
          { t: 'read', title: 'Start at zero, add as you go', body: [
            'Counting is three lines, and they never change:',
            ['code', 'count = 0\nfor n in nums:\n    if n > 10:\n        count += 1', 'Start OUTSIDE the loop, add INSIDE it, use it after.'],
            'Totalling is the same three lines with += n instead of += 1:',
            ['code', 'total = 0\nfor n in nums:\n    total += n'],
            'The commonest bug in both is indentation: put the print inside the loop and it runs every time; put the reset inside and it starts again every time.',
            ['code', "total = 0\nfor n in nums:\n    total += n\nprint(total)     # once, at the end — the print is NOT indented"],
            'Once the shape is automatic, the one-line versions read easily:',
            ['code', 'sum(nums)\nsum(1 for n in nums if n > 10)\nsum(n for n in nums if n > 0)']
          ] },
          { t: 'quick', title: 'Drill: counting and totalling', groups: ['Step by step · counting with a loop'], size: 12 },
          { t: 'quiz', title: 'Where does the total end up?', ids: ['qs-loop-total', 'qs-loop-total-inside'] },
          { t: 'problem', id: 'st-count-above' },
          { t: 'problem', id: 'st-average-list' }
        ] },

      { key: 's12', name: 'Collecting into a new list',
        blurb: 'Empty list, loop, append — then the one-line version of the same thing.',
        needs: 'counting',
        steps: [
          { t: 'read', title: 'Building something as you go', body: [
            'The collecting shape is the counting shape with a list instead of a number:',
            ['code', 'out = []\nfor n in nums:\n    out.append(n * 2)'],
            'Add an if and you are filtering instead of changing:',
            ['code', 'out = []\nfor n in nums:\n    if n > 10:\n        out.append(n)'],
            'Both have a one-line form. It is the SAME code, rearranged:',
            ['code', '[n * 2 for n in nums]            # change every item\n[n for n in nums if n > 10]      # keep some items\n[n * 2 for n in nums if n > 10]  # both at once', 'Read it as: what you want, then where it comes from, then which ones.'],
            'Finding is the third shape — walk until you find one, then stop:',
            ['code', 'found = None\nfor n in nums:\n    if n > 100:\n        found = n\n        break'],
            ['aside', 'Change, keep, find. Almost every loop you will ever write is one of those three with different words in the middle.']
          ] },
          { t: 'quick', title: 'Drill: collecting', groups: ['Step by step · collecting with a loop'], size: 14 },
          { t: 'quiz', title: 'What does the comprehension build?', ids: ['qs-lst-comp', 'qs-lst-comp-if'] },
          { t: 'problem', id: 'st-double-each' },
          { t: 'problem', id: 'st-only-positive' },
          { t: 'problem', id: 'st-sort-list' },
          { t: 'problem', id: 'st-reverse-list' },
          { t: 'problem', id: 'st-has-item' }
        ] },

      { key: 's13', name: 'Dictionaries',
        blurb: 'Labels instead of positions — one move per card.',
        needs: 'lists',
        steps: [
          { t: 'read', title: 'Looking things up by name', body: [
            'A list finds things by POSITION. A dictionary finds them by LABEL:',
            ['code', "person = {'name': 'Ann', 'age': 30}\n\nperson['name']       # 'Ann'\nperson['age'] = 31   # change it\nperson['city'] = 'London'   # or add a new one"],
            'Asking for a key that is not there raises KeyError. `.get()` is the safe version:',
            ['code', "person.get('city')             # None if missing\nperson.get('city', 'unknown')  # your own fallback\ncounts.get('tea', 0)           # the one that makes counting work"],
            'Which gives the single most useful four lines in beginner Python — counting how many times each thing appears:',
            ['code', 'counts = {}\nfor word in words:\n    counts[word] = counts.get(word, 0) + 1'],
            'And the three views:',
            ['code', 'person.keys()     # the labels\nperson.values()   # the values\nperson.items()    # both, in pairs — for key, value in person.items():']
          ] },
          { t: 'quick', title: 'Drill: dictionaries', groups: ['Step by step · dictionaries'], size: 14 },
          { t: 'quiz', title: 'What does the dictionary do?', ids: ['qs-dic-get', 'qs-dic-missing', 'qs-dic-get-default', 'qs-dic-add', 'qs-dic-len', 'qs-dic-loop', 'qs-dic-items', 'qs-dic-tally', 'qs-dic-order'] },
          { t: 'problem', id: 'st-dict-lookup' },
          { t: 'problem', id: 'st-dict-total' },
          { t: 'problem', id: 'st-tally' }
        ] },

      { key: 's14', name: 'Your own functions',
        blurb: 'def, then return, then one more parameter — a card at a time.',
        needs: 'everything so far',
        steps: [
          { t: 'read', title: 'Wrapping work up under a name', body: [
            'A function is a piece of work with a name, so you can do it again without retyping it:',
            ['code', "def greet(name):\n    return f'hello {name}'\n\ngreet('Ann')     # 'hello Ann'", 'def, the name, the parameters in brackets, a colon — then the body, indented.'],
            '**return hands the value back. print only shows it on screen.** A function that prints but does not return gives back None, and that is the most common reason a test says "expected 5, got None".',
            ['code', 'def double(n):\n    print(n * 2)     # shows it — but returns None\n\ndef double(n):\n    return n * 2     # hands it back'],
            'More parameters go in the brackets, separated by commas, and arrive in order:',
            ['code', 'def add(a, b):\n    return a + b\n\nadd(2, 3)     # 2 goes into a, 3 into b'],
            'Deal with the awkward case first, then get on with the normal one:',
            ['code', 'def average(nums):\n    if not nums:\n        return 0\n    return sum(nums) / len(nums)', 'An early return keeps the rest of the function free of extra indentation.']
          ] },
          { t: 'quick', title: 'Drill: functions', groups: ['Step by step · functions'], size: 14 },
          { t: 'problem', id: 'st-area' },
          { t: 'problem', id: 'st-percent-of' },
          { t: 'problem', id: 'st-add-vat' },
          { t: 'problem', id: 'st-join-words' },
          { t: 'problem', id: 'st-split-words' },
          { t: 'problem', id: 'st-count-word' }
        ] },

      { key: 's15', name: 'Asking someone to type something',
        blurb: 'input, and the conversion everybody forgets.',
        needs: 'functions',
        steps: [
          { t: 'read', title: 'input always gives you text', body: [
            ['code', "name = input('what is your name? ')\nprint(f'hello {name}')"],
            'The catch is that **input always hands back text**, even when the person typed digits:',
            ['code', "age = input('age? ')\nage + 1        # TypeError — text plus a number\n\nage = int(input('age? '))\nage + 1        # fine"],
            'And what people type is messy, so tidy it as it arrives:',
            ['code', "name = input('name: ').strip()\nanswer = input('yes or no? ').strip().lower()"],
            ['aside', 'Coding tests rarely use input() — they call your function directly. It matters here because it is how you play with your own code while learning.']
          ] },
          { t: 'quick', title: 'Drill: asking the user', groups: ['Step by step · asking the user'], size: 10 },
          { t: 'quiz', title: 'Text or number?', ids: ['qs-num-text-add', 'qs-num-mix', 'qs-num-str-int'] }
        ] },

      { key: 's16', name: 'When it goes wrong',
        blurb: 'The eight errors you will actually meet, and what each one means.',
        needs: 'everything so far',
        steps: [
          { t: 'read', title: 'Read the bottom line first', body: [
            'An error message is long, but only the LAST line names the problem. Read that first, then look at the line number above it.',
            ['code', "NameError          # a name Python has never seen — usually a typo\nTypeError          # wrong kind of thing — 'age: ' + 30\nValueError         # right kind, wrong value — int('abc')\nIndexError         # position 5 of a list of 3\nKeyError           # a dictionary key that is not there\nZeroDivisionError  # dividing by nothing\nIndentationError   # missing or extra spaces\nSyntaxError        # Python could not read the line at all"],
            'For a SyntaxError, look at the line ABOVE the one it names — a missing bracket or colon is usually reported one line late.',
            'When you expect something to fail, catch it:',
            ['code', "try:\n    n = int(text)\nexcept ValueError:\n    n = 0", 'Catch the specific error you expect. A bare `except:` hides typos and makes debugging much harder.'],
            ['aside', 'Errors are not the enemy. A program that stops with a clear message beats one that quietly produces a wrong number, every time.']
          ] },
          { t: 'quick', title: 'Drill: when it goes wrong', groups: ['Step by step · when it goes wrong'], size: 12 },
          { t: 'quick', title: 'Drill: files and imports', groups: ['Step by step · files and imports'], size: 10 },
          { t: 'problem', id: 'st-record-field' }
        ] },

      { key: 's17', name: 'The same things again, new scenarios',
        blurb: 'No new ideas at all — the same lines, asked about different data.',
        needs: 'everything so far',
        steps: [
          { t: 'read', title: 'Recognising the shape', body: [
            'Everything from here is repetition, and repetition is the point. The skill being built is not "knowing about lists" — it is seeing a new question and recognising which of five shapes it is.',
            'The five shapes, in full:',
            ['code', "total = 0\nfor x in things:\n    total += x            # 1. total something up\n\ncount = 0\nfor x in things:\n    if condition:\n        count += 1        # 2. count the ones that qualify\n\nout = []\nfor x in things:\n    out.append(do(x))     # 3. change every one\n\nout = []\nfor x in things:\n    if condition:\n        out.append(x)     # 4. keep some of them\n\nfor x in things:\n    if condition:\n        found = x\n        break             # 5. find the first one"],
            'A shopping basket, a class register, football scores, a bank statement — every one of those questions is one of these five with different words. The drills that follow ask the same things about different data until the words stop mattering.',
            ['aside', 'If a question in a real test looks new, ask yourself which of the five it is before you type anything. It is nearly always one of them.']
          ] },
          { t: 'quick', title: 'Drill: same idea, new scenario', groups: ['Step by step · same idea, new scenario'], size: 14 },
          { t: 'quick', title: 'Drill: a bank account', groups: ['Step by step · again, with a bank account'], size: 12 },
          { t: 'quick', title: 'Drill: a recipe', groups: ['Step by step · again, with a recipe'], size: 10 },
          { t: 'problem', id: 'st-names-list' },
          { t: 'problem', id: 'st-filter-records' },
          { t: 'problem', id: 'st-sum-field' }
        ] },

      { key: 's18', name: 'And again',
        blurb: 'Third pass. Football, libraries, step counters — same five shapes.',
        needs: 'the five shapes',
        steps: [
          { t: 'quick', title: 'Drill: football scores', groups: ['Step by step · again, with football scores'], size: 12 },
          { t: 'quick', title: 'Drill: a library', groups: ['Step by step · again, with a library'], size: 12 },
          { t: 'quick', title: 'Drill: a step counter', groups: ['Step by step · again, with a step counter'], size: 12 },
          { t: 'problem', id: 'st-best-record' }
        ] },

      { key: 's19', name: 'The small things that catch people out',
        blurb: 'Every trap you have met so far, one card each.',
        needs: 'everything so far',
        steps: [
          { t: 'read', title: 'The dozen that cost the most time', body: [
            '**Text and numbers do not mix.** `\'age \' + 30` is a TypeError. Convert with `str()`, or use an f-string.',
            '**input() gives text.** Wrap it in `int()` when you want a number.',
            '**One equals stores, two equals ask.** `=` puts something in a name; `==` asks a question.',
            '**Counting starts at zero, slices stop early.** `items[0]` is the first, `items[:3]` gives three items, `items[-1]` is the last.',
            '**b = a does not copy a list.** Both names then point at the SAME list; use `list(a)` or `a[:]` for an independent one.',
            '**.sort() returns None.** It rearranges in place. `sorted(x)` is the one that gives back a list.',
            '**.append() returns None too.** `nums = nums.append(3)` throws your list away.',
            '**A function without return gives back None.** Printing is not returning.',
            '**Dividing by zero, indexing past the end, and missing dictionary keys all raise.** Guard with an if, or use `.get()`.',
            '**Decimals are not exact.** `0.1 + 0.2 == 0.3` is False. Round for display, and compare with a tolerance.',
            ['aside', 'Everything in this list has bitten every Python programmer alive. Meeting them here, on purpose, is much cheaper than meeting them in a test.']
          ] },
          { t: 'quick', title: 'Drill: the traps', groups: ['Step by step · the small things that catch people out'], size: 14 },
          { t: 'quiz', title: 'The traps, in code', ids: ['qs-name-copy-number', 'qs-lst-append-return', 'qs-lst-sort-return', 'qs-lst-alias'] }
        ] },

      { key: 's20', name: 'A first look at a table',
        blurb: 'pandas, at the same small step size: read it, look at it, count it.',
        needs: 'lists and dictionaries',
        steps: [
          { t: 'read', title: 'The first five minutes with a file', body: [
            'A **DataFrame** is a table: named columns, many rows. Reading one is a single line:',
            ['code', "import pandas as pd\n\ndf = pd.read_csv('sales.csv')"],
            'Then the same four lines, every time, before anything else:',
            ['code', 'df.head()      # what does a row look like?\ndf.shape       # how many rows and columns?\ndf.info()      # what type is each column, what is missing?\ndf.describe()  # min, max, average of the numbers'],
            'And the two questions that decide how much cleaning you face:',
            ['code', "df.isna().sum()                       # how much is missing, per column\ndf['city'].value_counts(dropna=False)  # what values does this column take?"],
            ['aside', 'Type `df.head()` before you type anything else, always. Half of all data bugs come from believing a file is shaped the way someone said it was.']
          ] },
          { t: 'quick', title: 'Drill: first look at a table', groups: ['Step by step · first look at a table'], size: 14 },
          { t: 'quick', title: 'Drill: one column at a time', groups: ['Step by step · one column at a time'], size: 14 }
        ] },

      { key: 's21', name: 'Picking rows out of a table',
        blurb: 'One condition, then two, then a sort — one card each.',
        needs: 'a first look',
        steps: [
          { t: 'read', title: 'Filtering, in one shape', body: [
            'Every filter has the same shape: a question about a column, inside the square brackets.',
            ['code', "df[df['amount'] > 100]\ndf[df['city'] == 'London']\ndf[df['city'].isin(['London', 'Leeds'])]\ndf[df['amount'].isna()]"],
            'Two conditions need `&` for and, `|` for or, and brackets around each half:',
            ['code', "df[(df['amount'] > 100) & (df['city'] == 'London')]", 'The brackets are not optional — `&` binds tighter than `>`, so without them Python reads it wrongly and raises.'],
            'Counting how many rows match uses the same condition without the outer brackets:',
            ['code', "(df['amount'] > 100).sum()     # how many\n(df['amount'] > 100).mean()    # what fraction", 'True counts as 1, so summing counts the rows and averaging gives the proportion.'],
            'And sorting:',
            ['code', "df.sort_values('amount')\ndf.sort_values('amount', ascending=False)\ndf.nlargest(5, 'amount')"]
          ] },
          { t: 'quick', title: 'Drill: picking rows', groups: ['Step by step · picking rows'], size: 14 },
          { t: 'quick', title: 'Drill: tidying a column', groups: ['Step by step · tidying a column'], size: 12 }
        ] },

      { key: 's22', name: 'Totals per group',
        blurb: 'groupby, the same line with one word changed each time.',
        needs: 'picking rows',
        steps: [
          { t: 'read', title: 'One line, three choices', body: [
            'Grouping is one line with three decisions in it: what to group BY, which column to work on, and what to work out.',
            ['code', "df.groupby('city')['amount'].sum()\ndf.groupby('city')['amount'].mean()\ndf.groupby('region')['amount'].sum()\ndf.groupby('product')['quantity'].sum()", 'Change one word at a time and the answer changes to match. That is the whole drill.'],
            'Counting rows per group has its own word:',
            ['code', "df.groupby('city').size()"],
            'And the two things you nearly always want afterwards:',
            ['code', "df.groupby('city')['amount'].sum().sort_values(ascending=False)   # biggest first\ndf.groupby('city')['amount'].sum().reset_index()                  # back to a normal table"],
            ['aside', 'This one line answers most "which X has the most Y" questions you will ever be asked. It is worth being able to type it without thinking.']
          ] },
          { t: 'quick', title: 'Drill: grouping', groups: ['Step by step · grouping'], size: 12 },
          { t: 'quick', title: 'Drill: a spreadsheet of sales', groups: ['Step by step · again, with a spreadsheet of sales'], size: 12 }
        ] },

      { key: 's23', name: 'Dates, two tables, arrays and a chart',
        blurb: 'The last of the small steps, before the main course starts.',
        needs: 'grouping',
        steps: [
          { t: 'read', title: 'Four more one-liners', body: [
            '**Dates** are text until you convert them, and then a whole family of parts opens up:',
            ['code', "df['date'] = pd.to_datetime(df['date'])\ndf['date'].dt.year\ndf['date'].dt.month\ndf['date'].dt.day_name()"],
            '**Two tables** are joined on the column they share:',
            ['code', "orders.merge(customers, on='customer_id', how='left')", 'A left join keeps every row on the left. Check the row count before and after, every time.'],
            '**Arrays** are what pandas is built on, and behave the same way without the column names:',
            ['code', 'import numpy as np\n\na = np.array([1, 2, 3])\na * 2        # every element\na[a > 1]     # the same mask idea as filtering rows'],
            '**A chart** is three lines:',
            ['code', "import matplotlib.pyplot as plt\n\ndf.groupby('city')['amount'].sum().plot(kind='bar')\nplt.show()"],
            ['aside', 'That is the end of the slow lane. Stage 02 starts again from the top at a normal pace — and everything in it will now look familiar.']
          ] },
          { t: 'quick', title: 'Drill: dates in a table', groups: ['Step by step · dates in a table'], size: 12 },
          { t: 'quick', title: 'Drill: two tables', groups: ['Step by step · two tables'], size: 10 },
          { t: 'quick', title: 'Drill: arrays', groups: ['Step by step · arrays'], size: 12 },
          { t: 'quick', title: 'Drill: a first chart', groups: ['Step by step · a first chart'], size: 12 }
        ] }
    ]
  });
})();
