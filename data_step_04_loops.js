/* Step-by-step ladders, 4 — loops, one tiny variation at a time: the loop line,
   then the body, then counting, then totalling, then collecting, then finding. */
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

  /* ---------------- the loop line itself ---------------- */
  ladder('Step by step · the loop line', 'sp-lp', [
    ['Write the loop line that goes through each item of nums, calling it n', 'for n in nums:', 'The name after "for" is yours to choose — it holds one item at a time.'],
    ['Write the loop line that goes through each word of words, calling it word', 'for word in words:'],
    ['Write the loop line that goes through each name in names, calling it name', 'for name in names:'],
    ['Write the loop line that goes through each row of rows, calling it row', 'for row in rows:'],
    ['Write the loop line that goes through each character of text, calling it ch', 'for ch in text:', 'Looping over text gives you one character at a time.'],
    ['Write the loop line that repeats 5 times, using i as the counter', 'for i in range(5):', 'range(5) gives 0, 1, 2, 3, 4 — five turns.'],
    ['Write the loop line that repeats 10 times', 'for i in range(10):'],
    ['Write the loop line that counts from 1 to 5', 'for i in range(1, 6):'],
    ['Write the loop line that counts from 1 to 10', 'for i in range(1, 11):'],
    ['Write the loop line that counts down from 5 to 1', 'for i in range(5, 0, -1):', 'A step of minus one counts backwards.'],
    ['Write the loop line that goes through nums but also gives the position, as i and n', 'for i, n in enumerate(nums):', 'enumerate hands you the position and the item together.'],
    ['Write the loop line that numbers the items of nums starting at 1', 'for i, n in enumerate(nums, start=1):'],
    ['Write the loop line that walks names and scores together, as name and score', 'for name, score in zip(names, scores):', 'zip pairs two lists up, item by item.'],
    ['Write the loop line that goes through nums backwards', 'for n in reversed(nums):'],
    ['Write the loop line that goes through nums in sorted order', 'for n in sorted(nums):'],
    ['Write the loop line that goes through the keys of the dict prices', 'for key in prices:', 'Looping a dict gives you the KEYS.'],
    ['Write the loop line that goes through the values of the dict prices', 'for value in prices.values():'],
    ['Write the loop line that goes through the keys and values of prices together', 'for key, value in prices.items():'],
    ['Write the loop line that keeps going while n is above 0', 'while n > 0:', 'A while loop keeps going until its condition stops being true.'],
    ['Write the loop line that keeps going forever until something breaks out', 'while True:', 'Only ever with a break inside it, or it never stops.']
  ]);

  /* ---------------- doing something each time ---------------- */
  ladder('Step by step · inside the loop', 'sp-lb', [
    ['Print every item of nums, one per line', 'for n in nums:\n    print(n)'],
    ['Print every word in words, one per line', 'for word in words:\n    print(word)'],
    ['Print every name in names in capitals, one per line', 'for name in names:\n    print(name.upper())'],
    ['Print each number of nums doubled', 'for n in nums:\n    print(n * 2)'],
    ['Print the numbers 1 to 5, one per line', 'for i in range(1, 6):\n    print(i)'],
    ['Print the word hello five times', "for i in range(5):\n    print('hello')", 'When the counter is never used, some people write _ instead of i.'],
    ['Print each item of nums with its position, using an f-string', "for i, n in enumerate(nums):\n    print(f'{i}: {n}')"],
    ['Print each name with its score, walking both lists together', "for name, score in zip(names, scores):\n    print(f'{name}: {score}')"],
    ['Print every key and value of the dict prices, one pair per line', "for key, value in prices.items():\n    print(key, value)"],
    ['Print only the numbers in nums that are above 10', 'for n in nums:\n    if n > 10:\n        print(n)', 'An if inside a for: two levels of indentation.'],
    ['Print only the even numbers in nums', 'for n in nums:\n    if n % 2 == 0:\n        print(n)'],
    ['Print only the names in names that start with the letter A', "for name in names:\n    if name.startswith('A'):\n        print(name)"],
    ['Print only the words in words longer than 3 characters', 'for word in words:\n    if len(word) > 3:\n        print(word)'],
    ['Skip to the next turn of the loop when n is 0', 'if n == 0:\n    continue', 'continue means "nothing more to do with this one".'],
    ['Stop the loop completely as soon as n is negative', 'if n < 0:\n    break', 'break leaves the loop there and then.'],
    ['Stop the loop the first time the word cat appears in words', "for word in words:\n    if word == 'cat':\n        break"],
    ['Print each row of a list of lists on its own line', 'for row in rows:\n    print(row)'],
    ['Print each item of every inner list in rows, using two loops', 'for row in rows:\n    for item in row:\n        print(item)', 'A loop inside a loop — the inner one runs completely for every turn of the outer.'],
    ['Print a line of stars, one more star each time, for 5 rows', "for i in range(1, 6):\n    print('*' * i)"],
    ['Count down from 3 printing each number, then print go', "for i in range(3, 0, -1):\n    print(i)\nprint('go')"]
  ]);

  /* ---------------- counting and totalling ---------------- */
  ladder('Step by step · counting with a loop', 'sp-lc', [
    ['Start a counter at 0 before a loop', 'count = 0', 'Every counting loop starts with this line.'],
    ['Add 1 to count', 'count += 1'],
    ['Count how many items are in nums using a loop', 'count = 0\nfor n in nums:\n    count += 1', 'len(nums) does it in one go — but this is the shape everything else is built on.'],
    ['Count how many numbers in nums are above 10', 'count = 0\nfor n in nums:\n    if n > 10:\n        count += 1'],
    ['Count how many numbers in nums are even', 'count = 0\nfor n in nums:\n    if n % 2 == 0:\n        count += 1'],
    ['Count how many names in names start with A', "count = 0\nfor name in names:\n    if name.startswith('A'):\n        count += 1"],
    ['Count how many words in words are longer than 3 characters', 'count = 0\nfor word in words:\n    if len(word) > 3:\n        count += 1'],
    ['Count how many times the letter a appears in text', "count = 0\nfor ch in text:\n    if ch == 'a':\n        count += 1"],
    ['Start a total at 0 before a loop', 'total = 0'],
    ['Add n onto total', 'total += n'],
    ['Add up every number in nums with a loop', 'total = 0\nfor n in nums:\n    total += n', 'sum(nums) is the one-line version of exactly this.'],
    ['Add up only the numbers in nums that are above 0', 'total = 0\nfor n in nums:\n    if n > 0:\n        total += n'],
    ['Add up the lengths of all the words in words', 'total = 0\nfor word in words:\n    total += len(word)'],
    ['Work out the average of nums using a loop and then dividing', 'total = 0\nfor n in nums:\n    total += n\naverage = total / len(nums)'],
    ['Multiply every number in nums together, starting from 1', 'product = 1\nfor n in nums:\n    product *= n', 'A product starts at 1, not 0 — starting at 0 would keep it at 0 forever.'],
    ['Build up a running total that prints after every item', 'total = 0\nfor n in nums:\n    total += n\n    print(total)'],
    ['Count the items in nums, but stop counting at the first negative number', 'count = 0\nfor n in nums:\n    if n < 0:\n        break\n    count += 1'],
    ['Count how many rows in rows have a price above 100', "count = 0\nfor row in rows:\n    if row['price'] > 100:\n        count += 1"],
    ['Add up the price of every row in rows', "total = 0\nfor row in rows:\n    total += row['price']"],
    ['Count how many keys the dict prices has, using a loop', 'count = 0\nfor key in prices:\n    count += 1']
  ]);

  /* ---------------- collecting and finding ---------------- */
  ladder('Step by step · collecting with a loop', 'sp-lg', [
    ['Start an empty list called out before a loop', 'out = []'],
    ['Add n onto the end of the list out', 'out.append(n)'],
    ['Collect every number in nums doubled into out, using a loop', 'out = []\nfor n in nums:\n    out.append(n * 2)', 'The three-line collecting shape: empty list, loop, append.'],
    ['Build a list of every number in nums squared', 'out = []\nfor n in nums:\n    out.append(n ** 2)'],
    ['Build a list of every name in names in capitals', 'out = []\nfor name in names:\n    out.append(name.upper())'],
    ['Build a list of the lengths of every word in words', 'out = []\nfor word in words:\n    out.append(len(word))'],
    ['Build a list of only the numbers in nums above 10', 'out = []\nfor n in nums:\n    if n > 10:\n        out.append(n)'],
    ['Build a list of only the even numbers in nums', 'out = []\nfor n in nums:\n    if n % 2 == 0:\n        out.append(n)'],
    ['Write the same "double every number in nums" as a one-line comprehension', '[n * 2 for n in nums]', 'A list comprehension: the same three lines, written as one.'],
    ['Build a list of every number in nums squared, in one line', '[n ** 2 for n in nums]'],
    ['Build a list of every name in names in capitals, in one line', '[name.upper() for name in names]'],
    ['Build a list of the lengths of every word in words, in one line', '[len(word) for word in words]'],
    ['Build a list of only the numbers in nums above 10, in one line', '[n for n in nums if n > 10]', 'The if goes on the END of a comprehension.'],
    ['Build a list of only the even numbers in nums, in one line', '[n for n in nums if n % 2 == 0]'],
    ['Build a list of only the names starting with A, in one line', "[name for name in names if name.startswith('A')]"],
    ['Build a list of each price in prices with 20 percent added, in one line', '[p * 1.2 for p in prices]'],
    ['Start a "biggest so far" at the first item of nums', 'best = nums[0]', 'Starting at 0 would be wrong the moment every number is negative.'],
    ['Find the biggest number in nums with a loop', 'best = nums[0]\nfor n in nums:\n    if n > best:\n        best = n'],
    ['Find the smallest number in nums with a loop', 'lowest = nums[0]\nfor n in nums:\n    if n < lowest:\n        lowest = n'],
    ['Find the longest word in words with a loop', 'longest = words[0]\nfor word in words:\n    if len(word) > len(longest):\n        longest = word'],
    ['Find the first number in nums above 100 and stop looking', 'found = None\nfor n in nums:\n    if n > 100:\n        found = n\n        break'],
    ['Test whether ANY number in nums is above 100, in one line', 'any(n > 100 for n in nums)', 'any stops as soon as it finds one.'],
    ['Test whether EVERY number in nums is above 0, in one line', 'all(n > 0 for n in nums)'],
    ['Count how many numbers in nums are above 10, in one line', 'sum(1 for n in nums if n > 10)', 'Adding up a 1 for each hit is the one-line way to count.'],
    ['Add up only the positive numbers in nums, in one line', 'sum(n for n in nums if n > 0)']
  ]);
})();
