/* Quickfire cards — the second lap of the basics. Same ideas as the first, but in
   the shapes you actually type: a shopping list, a counter, a small function.
   These sit between "First steps" and the fuller Python groups. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var L = 'First steps · lists in practice';
  var LP = 'First steps · loops in practice';
  var F = 'First steps · functions in practice';
  var D = 'First steps · dictionaries in practice';

  window.SNIPPETS.push(

    /* ---- lists ---- */
    { id: 'b2-list-make', group: L, lvl: 1,
      ask: 'Make an empty shopping list called basket',
      a: 'basket = []',
      note: 'Empty square brackets. You fill it up later.' },

    { id: 'b2-list-append', group: L, lvl: 1,
      ask: "Add the word apple to the list `basket`",
      a: "basket.append('apple')",
      note: 'append puts one item on the end and changes the list where it stands.' },

    { id: 'b2-list-first', group: L, lvl: 1,
      ask: 'Get the first thing in `basket`',
      a: 'basket[0]',
      note: 'Counting starts at 0. The first item is number zero — get used to it early.' },

    { id: 'b2-list-last', group: L, lvl: 1,
      ask: 'Get the last thing in `basket`',
      a: 'basket[-1]',
      note: 'Negative numbers count back from the end, so -1 is always the last one.' },

    { id: 'b2-list-count', group: L, lvl: 1,
      ask: 'Count how many things are in `basket`',
      a: 'len(basket)' },

    { id: 'b2-list-remove', group: L, lvl: 1,
      ask: "Take apple out of `basket`",
      a: "basket.remove('apple')",
      note: 'remove works by value and only removes the first match. It raises if the value is not there.' },

    { id: 'b2-list-in', group: L, lvl: 1,
      ask: 'Check whether apple is in `basket`',
      a: "'apple' in basket" },

    { id: 'b2-list-empty-check', group: L, lvl: 1,
      ask: 'Check whether `basket` is empty, the Python way',
      a: 'not basket',
      alts: ['len(basket) == 0'],
      note: 'An empty list is falsy, so `if not basket:` reads as "if there is nothing in it".' },

    { id: 'b2-list-first-three', group: L, lvl: 1,
      ask: 'Get the first three things in `basket`',
      a: 'basket[:3]',
      note: 'A slice: from the start, up to but not including position 3.' },

    { id: 'b2-list-sorted-copy', group: L, lvl: 2,
      ask: 'Get an alphabetically sorted copy of `basket`, leaving the original alone',
      a: 'sorted(basket)',
      note: 'sorted() returns a new list. basket.sort() rearranges the original and returns None.' },

    { id: 'b2-list-total', group: L, lvl: 1,
      ask: 'Add up the numbers in the list `prices`',
      a: 'sum(prices)' },

    { id: 'b2-list-biggest', group: L, lvl: 1,
      ask: 'Find the biggest number in `prices`',
      a: 'max(prices)',
      note: 'min() is its twin. Both raise on an empty list — pass default=0 if that can happen.' },

    { id: 'b2-list-average', group: L, lvl: 1,
      ask: 'Work out the average of the numbers in `prices`',
      a: 'sum(prices) / len(prices)',
      note: 'Guard the empty case — dividing by len 0 raises ZeroDivisionError.' },

    { id: 'b2-list-join-words', group: L, lvl: 2,
      ask: 'Turn the list `basket` into one comma-separated line of text',
      a: "', '.join(basket)",
      note: 'The separator comes first, and everything in the list must already be text.' },

    { id: 'b2-list-split-line', group: L, lvl: 2,
      ask: 'Turn the comma-separated text in `line` into a list',
      a: "line.split(',')" },

    { id: 'b2-list-copy-real', group: L, lvl: 2,
      ask: 'Make a genuine copy of `basket` that can be changed independently',
      a: 'basket.copy()',
      alts: ['basket[:]', 'list(basket)'],
      note: 'new = basket does NOT copy — it just gives the same list a second name.' },

    { id: 'b2-list-of-lists', group: L, lvl: 2,
      ask: 'Get the second item of the first inner list in `grid`',
      a: 'grid[0][1]',
      note: 'Read it left to right: the first list, then its second item.' },

    { id: 'b2-list-index-of', group: L, lvl: 2,
      ask: "Find the position of apple in `basket`",
      a: "basket.index('apple')" },

    /* ---- loops ---- */
    { id: 'b2-loop-print', group: LP, lvl: 1,
      ask: 'Print every item in `basket`, one per line',
      a: 'for item in basket:\n    print(item)',
      note: 'The colon opens the block; the four spaces say what is inside it.' },

    { id: 'b2-loop-count-up', group: LP, lvl: 1,
      ask: 'Count a variable `total` up by each number in `prices`',
      a: 'for price in prices:\n    total += price',
      note: 'total must already exist before the loop, usually set to 0.' },

    { id: 'b2-loop-build-list', group: LP, lvl: 1,
      ask: 'Inside a loop, add the current `item` to a list called `kept`',
      a: 'kept.append(item)' },

    { id: 'b2-loop-if-inside', group: LP, lvl: 2,
      ask: 'Inside a loop over `prices`, skip to the next one when the price is 0',
      a: 'if price == 0:\n    continue',
      note: 'continue abandons this pass; break would leave the loop altogether.' },

    { id: 'b2-loop-first-match', group: LP, lvl: 2,
      ask: 'Inside a loop over `basket`, stop as soon as the item equals the target',
      a: 'if item == target:\n    break',
      note: 'break ends the loop then and there; everything after it in that pass is skipped.' },

    { id: 'b2-loop-range-len', group: LP, lvl: 1,
      ask: 'Loop the numbers 1 up to and including the variable `n`',
      a: 'for i in range(1, n + 1):',
      note: 'range stops BEFORE its second number, so n + 1 is what includes n itself.' },

    { id: 'b2-loop-index-value', group: LP, lvl: 2,
      ask: 'Loop over `basket` getting the position and the item together',
      a: 'for i, item in enumerate(basket):',
      note: 'Better than range(len(basket)) — shorter, and it cannot go out of range.' },

    { id: 'b2-loop-two-lists', group: LP, lvl: 2,
      ask: 'Loop over `names` and `scores` together, one pair at a time',
      a: 'for name, score in zip(names, scores):' },

    { id: 'b2-loop-nested', group: LP, lvl: 3,
      ask: 'Loop over every row of `grid`, then over each cell inside that row',
      a: 'for row in grid:\n    for cell in row:',
      note: 'The inner loop runs completely for each pass of the outer one.' },

    { id: 'b2-loop-while-input', group: LP, lvl: 2,
      ask: 'Keep looping while `answer` is not the word quit',
      a: "while answer != 'quit':",
      note: 'Something inside the loop must be able to change answer, or it never ends.' },

    { id: 'b2-loop-count-matches', group: LP, lvl: 2,
      ask: 'Count how many prices in `prices` are above 100, in one line',
      a: 'sum(1 for p in prices if p > 100)',
      alts: ['len([p for p in prices if p > 100])'],
      note: 'Counting matches without writing a loop body at all.' },

    { id: 'b2-loop-comprehension', group: LP, lvl: 2,
      ask: 'Build a list of every price in `prices` with 20% added',
      a: '[p * 1.2 for p in prices]',
      note: 'The comprehension is the same loop, written as one expression.' },

    /* ---- functions ---- */
    { id: 'b2-def-noargs', group: F, lvl: 1,
      ask: 'Define a function called main that takes no arguments',
      a: 'def main():' },

    { id: 'b2-def-two', group: F, lvl: 1,
      ask: 'Define a function total_price taking price and quantity',
      a: 'def total_price(price, quantity):' },

    { id: 'b2-return-product', group: F, lvl: 1,
      ask: 'Return the two arguments multiplied together',
      a: 'return price * quantity' },

    { id: 'b2-call', group: F, lvl: 1,
      ask: 'Call total_price with 3 and 4, keeping the answer in `cost`',
      a: 'cost = total_price(3, 4)',
      note: 'The brackets are what actually run it. Without them you get the function itself.' },

    { id: 'b2-return-early', group: F, lvl: 2,
      ask: 'Return 0 straight away when `nums` is empty',
      a: 'if not nums:\n    return 0',
      note: 'A guard clause: deal with the awkward case first, then the rest of the function is simple.' },

    { id: 'b2-default-arg', group: F, lvl: 2,
      ask: 'Define greet with a name and a greeting that defaults to Hello',
      a: "def greet(name, greeting='Hello'):",
      note: 'Arguments with defaults come after those without.' },

    { id: 'b2-return-two', group: F, lvl: 2,
      ask: 'Return both the count and the total from a function',
      a: 'return count, total',
      note: 'That is one tuple. Unpack it at the other end: count, total = summary(rows).' },

    { id: 'b2-call-keyword', group: F, lvl: 2,
      ask: 'Call greet with the name Ada and the greeting Hi, passing the greeting by name',
      a: "greet('Ada', greeting='Hi')",
      note: 'Keyword arguments make a call readable and stop you getting the order wrong.' },

    { id: 'b2-docstring-line', group: F, lvl: 2,
      ask: 'Write a one-line docstring saying: Return the total cost.',
      a: '"""Return the total cost."""',
      note: 'First line of the function, triple quotes, one sentence in the imperative.' },

    { id: 'b2-func-in-func', group: F, lvl: 2,
      ask: 'Inside a function, return the result of calling clean on `text`',
      a: 'return clean(text)',
      note: 'Small functions calling smaller ones is how a program stays readable.' },

    /* ---- dictionaries ---- */
    { id: 'b2-dict-make', group: D, lvl: 1,
      ask: 'Make a dictionary `person` holding the name Ada',
      a: "person = {'name': 'Ada'}",
      note: 'Curly braces, and each entry is key: value.' },

    { id: 'b2-dict-read', group: D, lvl: 1,
      ask: "Read the name out of `person`",
      a: "person['name']",
      note: 'Square brackets with the key inside. A key that is not there raises KeyError.' },

    { id: 'b2-dict-add', group: D, lvl: 1,
      ask: "Add the age 36 to `person`",
      a: "person['age'] = 36",
      note: 'Assigning to a key that does not exist creates it.' },

    { id: 'b2-dict-safe', group: D, lvl: 1,
      ask: "Read the city out of `person`, giving back the word unknown if it is missing",
      a: "person.get('city', 'unknown')" },

    { id: 'b2-dict-has', group: D, lvl: 1,
      ask: "Check whether `person` has an email key",
      a: "'email' in person",
      note: '`in` looks at the KEYS. To search the values, ask `in person.values()`.' },

    { id: 'b2-dict-loop', group: D, lvl: 2,
      ask: 'Loop over `person` getting each key and value',
      a: 'for key, value in person.items():' },

    { id: 'b2-dict-count-start', group: D, lvl: 2,
      ask: 'Make an empty dictionary called tally, using the dict function rather than braces',
      a: 'tally = dict()',
      note: 'tally = {} is the usual spelling; dict() is the same thing spelled out.' },

    { id: 'b2-dict-tally', group: D, lvl: 2,
      ask: 'Add one to the tally for `word` in the dictionary `counts`',
      a: 'counts[word] = counts.get(word, 0) + 1',
      note: 'The counting line. Learn it once and half of data work is easier.' },

    { id: 'b2-dict-keys-list', group: D, lvl: 2,
      ask: 'Get the keys of `person` as a plain list',
      a: 'list(person.keys())',
      alts: ['list(person)'] },

    { id: 'b2-dict-sort-by-value', group: D, lvl: 3,
      ask: 'Get the items of `counts` sorted by tally, biggest first',
      a: 'sorted(counts.items(), key=lambda kv: kv[1], reverse=True)',
      note: 'kv is each (key, value) pair; kv[1] is the tally.' },

    { id: 'b2-dict-nested-read', group: D, lvl: 3,
      ask: "Read the city out of the address inside `person`",
      a: "person['address']['city']",
      note: 'Nested lookups read left to right, and each level can raise KeyError.' },

    { id: 'b2-dict-from-lists', group: D, lvl: 3,
      ask: 'Build a dictionary from the parallel lists `keys` and `values`',
      a: 'dict(zip(keys, values))' }
  );
})();
