/* Step-by-step ladders, 3 — if, else, and the small decisions that go with them. */
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

  ladder('Step by step · if', 'sp-if', [
    ['Write the first line of an if that checks whether age is over 18', 'if age > 18:', 'The colon at the end is not optional. Everything indented under it belongs to the if.'],
    ['Write the first line of an if that checks whether n is 0', 'if n == 0:'],
    ['Write the first line of an if that checks whether name is the word Ann', "if name == 'Ann':"],
    ['Write the first line of an if that checks whether the list nums is empty', 'if not nums:'],
    ['If age is over 18, print the word adult (two lines)', "if age > 18:\n    print('adult')", 'Four spaces of indentation is how Python knows what is inside the if.'],
    ['If n is 0, print the words nothing here', "if n == 0:\n    print('nothing here')"],
    ['If price is over 100, print the word expensive', "if price > 100:\n    print('expensive')"],
    ['If the word cat is in text, print the word found', "if 'cat' in text:\n    print('found')"],
    ['If age is over 18 print adult, otherwise print child', "if age > 18:\n    print('adult')\nelse:\n    print('child')", 'else has a colon too, and takes no condition.'],
    ['If n is 0 print none, otherwise print some', "if n == 0:\n    print('none')\nelse:\n    print('some')"],
    ['If score is 50 or more print pass, otherwise print fail', "if score >= 50:\n    print('pass')\nelse:\n    print('fail')"],
    ['Write the middle line that tests a second condition after an if', 'elif score >= 40:', 'elif is "else, if" — checked only when the ones above it were false.'],
    ['Print A for 80 or more, B for 60 or more, and C for anything else', "if score >= 80:\n    print('A')\nelif score >= 60:\n    print('B')\nelse:\n    print('C')", 'Order matters: the first true one wins, so put the highest bar first.'],
    ['Store the word adult in status if age is over 18, otherwise child, on ONE line', "status = 'adult' if age > 18 else 'child'", 'The one-line if. Read it as: this, if that, otherwise the other.'],
    ['Store the bigger of a and b in best, on one line without max', 'best = a if a > b else b'],
    ['Give price a discount of 10 percent only when quantity is 10 or more', 'if quantity >= 10:\n    price = price * 0.9'],
    ['If the answer typed in is empty, print please type something', "if not answer:\n    print('please type something')"],
    ['If n divides exactly by 2, print even', "if n % 2 == 0:\n    print('even')"],
    ['If n divides exactly by 2 print even, otherwise print odd', "if n % 2 == 0:\n    print('even')\nelse:\n    print('odd')"],
    ['If age is between 18 and 65, print working age', "if 18 <= age <= 65:\n    print('working age')"],
    ['If city is London or Leeds, print north or south', "if city in ('London', 'Leeds'):\n    print('north or south')"],
    ['Do nothing at all inside an if, without an error', 'pass', 'pass is a placeholder that means "nothing goes here yet".'],
    ['If the file name in f ends with .csv, print it is a csv', "if f.endswith('.csv'):\n    print('it is a csv')"],
    ['If n is bigger than the current best, replace best with n', 'if n > best:\n    best = n', 'The heart of every "find the largest" loop.'],
    ['If n is smaller than the current lowest, replace lowest with n', 'if n < lowest:\n    lowest = n'],
    ['Add 1 to count only when the word cat appears in text', "if 'cat' in text:\n    count += 1", 'The heart of every counting loop.'],
    ['Add price onto total only when quantity is above 0', 'if quantity > 0:\n    total += price'],
    ['If name is missing (None), replace it with the word unknown', "if name is None:\n    name = 'unknown'"],
    ['If the key city is in the dict row, print its value', "if 'city' in row:\n    print(row['city'])", 'Checking before you look something up is how you avoid a KeyError.'],
    ['Stop the whole function early and give back 0 when the list nums is empty', 'if not nums:\n    return 0', 'An early return keeps the rest of the function free of extra indentation.']
  ]);

  ladder('Step by step · lists, one step at a time', 'sp-ls', [
    ['Start an empty list called items, ready to add to', 'items = []', 'Square brackets with nothing in them. Nearly every collecting loop starts here.'],
    ['Make a list called nums holding 1, 2 and 3', 'nums = [1, 2, 3]'],
    ['Make a list called names holding the words Ann and Bob', "names = ['Ann', 'Bob']"],
    ['Make a list called prices holding 1.5 and 2.5', 'prices = [1.5, 2.5]'],
    ['Add the number 4 onto the end of nums', 'nums.append(4)', 'append always adds to the END.'],
    ['Add the word Cat onto the end of names', "names.append('Cat')"],
    ['Add the number 0 to the FRONT of nums', 'nums.insert(0, 0)', 'insert takes the position first, then the thing.'],
    ['Add all the items of more onto the end of nums', 'nums.extend(more)', 'extend adds each item; append would add the whole list as ONE item.'],
    ['Get the first item of nums', 'nums[0]'],
    ['Get the second item of nums', 'nums[1]'],
    ['Get the last item of nums', 'nums[-1]'],
    ['Get the second to last item of nums', 'nums[-2]'],
    ['Get the first three items of nums', 'nums[:3]'],
    ['Get everything except the first item of nums', 'nums[1:]'],
    ['Count how many items are in nums', 'len(nums)'],
    ['Change the first item of nums to 99', 'nums[0] = 99'],
    ['Change the last item of nums to 0', 'nums[-1] = 0'],
    ['Remove the first copy of the number 3 from nums', 'nums.remove(3)', 'remove works by VALUE and only takes the first one it finds.'],
    ['Remove the item at position 2 of nums', 'del nums[2]', 'del works by POSITION.'],
    ['Take the LAST item off nums and store it in last', 'last = nums.pop()', 'pop removes it AND gives it back to you.'],
    ['Take the FIRST item off nums and store it in first', 'first = nums.pop(0)'],
    ['Empty the list nums completely', 'nums.clear()'],
    ['Test whether the number 3 is in nums', '3 in nums'],
    ['Test whether the word Ann is in names', "'Ann' in names"],
    ['Count how many times the number 3 appears in nums', 'nums.count(3)'],
    ['Find the position of the number 3 in nums', 'nums.index(3)'],
    ['Sort nums into order, changing the list itself', 'nums.sort()', 'sort() changes the list and gives back nothing.'],
    ['Get a sorted copy of nums, leaving the original alone', 'sorted(nums)', 'sorted() gives you a NEW list.'],
    ['Sort nums from biggest to smallest', 'nums.sort(reverse=True)'],
    ['Sort the words in names into alphabetical order', 'names.sort()'],
    ['Reverse the order of nums, changing the list itself', 'nums.reverse()'],
    ['Get a reversed copy of nums using a slice', 'nums[::-1]'],
    ['Make a copy of nums that is safe to change', 'copy = list(nums)', 'Without the copy, both names point at the SAME list.'],
    ['Join the two lists a and b into one new list', 'a + b'],
    ['Add up the numbers in nums', 'sum(nums)'],
    ['Find the biggest number in nums', 'max(nums)'],
    ['Find the smallest number in nums', 'min(nums)'],
    ['Get a list of the numbers 0 to 4', 'list(range(5))', 'range(5) counts 0, 1, 2, 3, 4 — five numbers, starting at zero.'],
    ['Get a list of the numbers 1 to 5', 'list(range(1, 6))', 'The second number is where it STOPS, and it is not included.'],
    ['Get a list of every other number from 0 to 8', 'list(range(0, 10, 2))', 'The third number is the step.']
  ]);
})();
