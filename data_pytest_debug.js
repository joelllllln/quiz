/* Python coding test — problem bank 3: debugging.
   The starter code is already written, and already wrong. These questions test
   whether you can read someone else's code and find the fault — which is most of
   the job, and a whole section of many screening tests. */
(function () {
  window.PYTESTS = window.PYTESTS || [];

  window.PYTESTS.push(

    { id: 'pt-bug-average', group: 'Debugging', lvl: 1,
      title: 'The average is wrong',
      fn: 'average',
      brief: 'This function should return the mean of a list of numbers, and 0 for an empty list.\n\nIt is wrong. Find the fault and fix it — keep the same function name and signature.',
      sig: 'def average(nums: list[float]) -> float',
      starter: 'def average(nums):\n    total = 0\n    for n in nums:\n        total += n\n        return total / len(nums)\n',
      examples: [
        { in: 'average([1, 2, 3])', out: '2.0', note: 'the buggy version returns 0.333…' }],
      tests: [
        { call: 'average([1, 2, 3])', expect: '2.0' },
        { call: 'average([10])', expect: '10.0' },
        { call: 'average([])', expect: '0', name: 'empty list' },
        { call: 'average([2, 4, 6, 8])', expect: '5.0', hidden: true },
        { call: 'average([-1, 1])', expect: '0.0', hidden: true }],
      hint: 'Look at the indentation of the return statement, and at what happens when the list is empty.',
      solution: 'def average(nums):\n    if not nums:\n        return 0\n    total = 0\n    for n in nums:\n        total += n\n    return total / len(nums)\n',
      walk: 'Two faults. The return is indented INSIDE the loop, so it fires after the first number — returning 1/3 instead of 2. And an empty list divides by zero, so it needs an explicit guard. Indentation bugs like this are invisible in a code review and obvious in a debugger.',
      complexity: 'O(n) time, O(1) space.' },

    { id: 'pt-bug-count', group: 'Debugging', lvl: 2,
      title: 'The counter counts wrong',
      fn: 'count_words',
      brief: 'This should count how many times each word appears, case-insensitively.\n\nIt double-counts and it misses the first occurrence of each word. Fix it.',
      sig: 'def count_words(words: list[str]) -> dict[str, int]',
      starter: "def count_words(words):\n    counts = {}\n    for w in words:\n        if w in counts:\n            counts[w] = counts[w] + 2\n    return counts\n",
      examples: [
        { in: "count_words(['a', 'A', 'b'])", out: "{'a': 2, 'b': 1}" }],
      tests: [
        { call: "count_words(['a', 'A', 'b'])", expect: "{'a': 2, 'b': 1}" },
        { call: "count_words([])", expect: '{}' },
        { call: "count_words(['x', 'x', 'x'])", expect: "{'x': 3}" },
        { call: "count_words(['One', 'one', 'ONE', 'two'])", expect: "{'one': 3, 'two': 1}", hidden: true },
        { call: "count_words(['a'])", expect: "{'a': 1}", hidden: true, name: 'first occurrence must count' }],
      hint: 'Three things: lowercase the word, add 1 rather than 2, and handle the word you have never seen before.',
      solution: "def count_words(words):\n    counts = {}\n    for w in words:\n        key = w.lower()\n        counts[key] = counts.get(key, 0) + 1\n    return counts\n",
      walk: 'The `if w in counts` branch means a first sighting is never recorded at all, so nothing ever reaches 1. .get(key, 0) + 1 collapses both branches into one line and removes the bug class entirely. The case-insensitivity has to happen before the key is used, not after.',
      complexity: 'O(n) time, O(k) space.' },

    { id: 'pt-bug-mutable', group: 'Debugging', lvl: 3,
      title: 'The list that remembers',
      fn: 'add_item',
      brief: 'add_item should return a NEW list with the item appended. Called twice with no starting list, it should give ["a"] then ["b"].\n\nIt does not. Fix it.',
      sig: 'def add_item(item, items=None) -> list',
      starter: "def add_item(item, items=[]):\n    items.append(item)\n    return items\n",
      examples: [
        { in: "add_item('a'); add_item('b')", out: "['b']", note: "the buggy version gives ['a', 'b']" }],
      tests: [
        { call: "add_item('a')", expect: "['a']" },
        { call: "(add_item('a'), add_item('b'))[1]", expect: "['b']", name: 'the second call must start fresh' },
        { call: "add_item('c', ['x'])", expect: "['x', 'c']", name: 'an explicit list still works' },
        { call: "[add_item(str(i)) for i in range(3)][2]", expect: "['2']", hidden: true },
        { call: "(lambda base: (add_item('q', base), base)[1])(['p'])", expect: "['p', 'q']", hidden: true, name: 'the caller sees the append' }],
      hint: 'The default value is created once, when the function is defined — not on each call. The fix is the standard None sentinel.',
      solution: "def add_item(item, items=None):\n    if items is None:\n        items = []\n    items.append(item)\n    return items\n",
      walk: 'The most famous gotcha in Python: a mutable default is a single shared object, so every call that relies on it appends to the same list. Default to None and build the real list inside the function. Note the last test — when a list IS passed in, appending to it in place is the expected behaviour.',
      complexity: 'O(1) per call.' },

    { id: 'pt-bug-loop-remove', group: 'Debugging', lvl: 3,
      title: 'Removing while looping',
      fn: 'drop_negatives',
      brief: 'This should return a list with the negative numbers removed.\n\nIt skips some of them, because the list is being changed while it is being walked. Fix it.',
      sig: 'def drop_negatives(nums: list[int]) -> list[int]',
      starter: 'def drop_negatives(nums):\n    for n in nums:\n        if n < 0:\n            nums.remove(n)\n    return nums\n',
      examples: [
        { in: 'drop_negatives([1, -1, -2, 3])', out: '[1, 3]', note: 'the buggy version leaves -2 behind' }],
      tests: [
        { call: 'drop_negatives([1, -1, -2, 3])', expect: '[1, 3]' },
        { call: 'drop_negatives([-1, -2, -3])', expect: '[]' },
        { call: 'drop_negatives([])', expect: '[]' },
        { call: 'drop_negatives([0, -1])', expect: '[0]', hidden: true, name: 'zero is not negative' },
        { call: 'drop_negatives([1, 2, 3])', expect: '[1, 2, 3]', hidden: true }],
      hint: 'Do not mutate a list while iterating it. Build a new list instead — a comprehension is one line.',
      solution: 'def drop_negatives(nums):\n    return [n for n in nums if n >= 0]\n',
      walk: 'When you remove an element, everything after it shifts left, but the loop\'s internal position keeps advancing — so the element that moved into the gap is never examined. Two adjacent negatives is the smallest case that exposes it. Building a new list sidesteps the whole problem, and reads better besides.',
      complexity: 'O(n) time, O(n) space.' },

    { id: 'pt-bug-boundary', group: 'Debugging', lvl: 2,
      title: 'Off by one',
      fn: 'last_n',
      brief: 'last_n should return the last n items of a list, in their original order.\n\nIt returns the wrong slice. Fix it, and make sure n = 0 returns an empty list.',
      sig: 'def last_n(items: list, n: int) -> list',
      starter: 'def last_n(items, n):\n    return items[-n - 1:]\n',
      examples: [
        { in: 'last_n([1, 2, 3, 4], 2)', out: '[3, 4]' }],
      tests: [
        { call: 'last_n([1, 2, 3, 4], 2)', expect: '[3, 4]' },
        { call: 'last_n([1, 2, 3], 0)', expect: '[]', name: 'n = 0' },
        { call: 'last_n([1, 2], 5)', expect: '[1, 2]', name: 'n bigger than the list' },
        { call: 'last_n([], 3)', expect: '[]', hidden: true },
        { call: 'last_n([1, 2, 3], 3)', expect: '[1, 2, 3]', hidden: true }],
      hint: 'items[-n:] is nearly right — but think about what -0 does in a slice.',
      solution: 'def last_n(items, n):\n    if n <= 0:\n        return []\n    return items[-n:]\n',
      walk: 'The -n - 1 takes one item too many. Swapping to items[-n:] fixes that but introduces a subtler bug: -0 is 0, so items[-0:] returns the WHOLE list rather than nothing. That is why the n = 0 case needs its own guard — a genuine off-by-one hiding behind a sign.',
      complexity: 'O(n) for the slice.' },

    { id: 'pt-bug-return', group: 'Debugging', lvl: 1,
      title: 'It always returns None',
      fn: 'double_all',
      brief: 'double_all should return a new list with every number doubled.\n\nEvery test comes back None. Fix it.',
      sig: 'def double_all(nums: list[float]) -> list[float]',
      starter: 'def double_all(nums):\n    doubled = []\n    for n in nums:\n        doubled.append(n * 2)\n',
      examples: [
        { in: 'double_all([1, 2])', out: '[2, 4]' }],
      tests: [
        { call: 'double_all([1, 2])', expect: '[2, 4]' },
        { call: 'double_all([])', expect: '[]' },
        { call: 'double_all([-3])', expect: '[-6]' },
        { call: 'double_all([0.5])', expect: '[1.0]', hidden: true },
        { call: 'len(double_all(list(range(100))))', expect: '100', hidden: true }],
      hint: 'The work is all there. Something at the end is missing.',
      solution: 'def double_all(nums):\n    return [n * 2 for n in nums]\n',
      walk: 'No return statement, so Python hands back None. It is the most common single cause of "every test failed at once" in a coding test — when everything fails identically, check the return before you question the logic.',
      complexity: 'O(n) time and space.' },

    { id: 'pt-bug-string-build', group: 'Debugging', lvl: 2,
      title: 'The string that will not build',
      fn: 'initials',
      brief: 'initials should turn a full name into upper-case initials joined by dots: "ada lovelace" → "A.L".\n\nIt is wrong in two ways. Fix it.',
      sig: 'def initials(name: str) -> str',
      starter: "def initials(name):\n    out = ''\n    for word in name.split():\n        out.join(word[0])\n    return out.upper()\n",
      examples: [
        { in: "initials('ada lovelace')", out: "'A.L'" }],
      tests: [
        { call: "initials('ada lovelace')", expect: "'A.L'" },
        { call: "initials('grace')", expect: "'G'", name: 'one word, no dot' },
        { call: "initials('')", expect: "''" },
        { call: "initials('a b c')", expect: "'A.B.C'", hidden: true },
        { call: "initials('  spaced   name  ')", expect: "'S.N'", hidden: true }],
      hint: "join is a method on the separator and it RETURNS a string — it never modifies anything in place.",
      solution: "def initials(name):\n    return '.'.join(w[0] for w in name.split()).upper()\n",
      walk: "out.join(word[0]) throws its result away and joins on the wrong thing — the separator should be '.', and the pieces should be the initials. Building the list of initials and joining once is both correct and the idiomatic shape. A single word produces no separator at all, which is exactly what the second test wants.",
      complexity: 'O(n) time and space.' },

    { id: 'pt-bug-compare', group: 'Debugging', lvl: 2,
      title: 'The filter lets everything through',
      fn: 'in_range',
      brief: 'in_range should keep the numbers between low and high inclusive.\n\nIt keeps everything. Fix it.',
      sig: 'def in_range(nums: list[float], low: float, high: float) -> list[float]',
      starter: 'def in_range(nums, low, high):\n    return [n for n in nums if low < n or n < high]\n',
      examples: [
        { in: 'in_range([1, 5, 10], 2, 8)', out: '[5]' }],
      tests: [
        { call: 'in_range([1, 5, 10], 2, 8)', expect: '[5]' },
        { call: 'in_range([1, 2, 3], 2, 3)', expect: '[2, 3]', name: 'inclusive at both ends' },
        { call: 'in_range([], 0, 1)', expect: '[]' },
        { call: 'in_range([0, 5], 5, 5)', expect: '[5]', hidden: true, name: 'a single-value range' },
        { call: 'in_range([-5, 0, 5], -1, 1)', expect: '[0]', hidden: true }],
      hint: 'Two faults: the wrong logical operator, and strict comparisons where the brief says inclusive.',
      solution: 'def in_range(nums, low, high):\n    return [n for n in nums if low <= n <= high]\n',
      walk: '`or` lets a number through if EITHER side holds, which for a sane range is always. It needs `and` — and Python lets you chain the comparison, low <= n <= high, which reads exactly like the brief and cannot be got backwards. "Inclusive" means <=, not <.',
      complexity: 'O(n) time and space.' }
  );
})();
