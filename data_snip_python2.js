/* Quickfire cards — core Python, part 2: lists, dicts, sets, tuples and comprehensions.
   This is the material most Python coding tests actually lean on. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var LST = 'Python · lists';
  var DCT = 'Python · dicts, sets & tuples';
  var CMP = 'Python · comprehensions';

  window.SNIPPETS.push(

    /* ---- lists ---- */
    { id: 'py-list-new', group: LST, lvl: 1,
      ask: 'Make an empty list called items',
      a: 'items = []',
      alts: ['items = list()'] },

    { id: 'py-append', group: LST, lvl: 1,
      ask: 'Add the value x to the end of the list `items`',
      a: 'items.append(x)',
      note: 'append adds one element; extend adds every element of another list.' },

    { id: 'py-extend', group: LST, lvl: 2,
      ask: 'Add every element of `more` onto the end of `items`',
      a: 'items.extend(more)',
      alts: ['items += more'],
      note: 'items.append(more) would nest the whole list as a single element.' },

    { id: 'py-insert', group: LST, lvl: 2,
      ask: 'Insert x at the front of the list `items`',
      a: 'items.insert(0, x)',
      note: 'Position first, value second. Inserting at the front is O(n) — a deque is better.' },

    { id: 'py-pop', group: LST, lvl: 1,
      ask: 'Remove and return the last element of `items`',
      a: 'items.pop()',
      note: 'items.pop(0) takes from the front instead.' },

    { id: 'py-remove', group: LST, lvl: 2,
      ask: 'Remove the first occurrence of the value x from `items`',
      a: 'items.remove(x)',
      note: 'By value, not position — raises ValueError if x is not there.' },

    { id: 'py-index-list', group: LST, lvl: 2,
      ask: 'Find the position of the value x in `items`',
      a: 'items.index(x)' },

    { id: 'py-in-list', group: LST, lvl: 1,
      ask: 'Check whether x is in the list `items`',
      a: 'x in items',
      note: 'O(n) on a list; O(1) on a set — that swap is a common test optimisation.' },

    { id: 'py-count-list', group: LST, lvl: 2,
      ask: 'Count how many times x appears in `items`',
      a: 'items.count(x)' },

    { id: 'py-sort-inplace', group: LST, lvl: 1,
      ask: 'Sort the list `items` in place',
      a: 'items.sort()',
      note: 'Returns None. Assigning its result is the classic beginner bug.' },

    { id: 'py-sorted', group: LST, lvl: 1,
      ask: 'Get a sorted copy of `items`, leaving the original alone',
      a: 'sorted(items)',
      note: 'sorted() works on any iterable and always returns a list.' },

    { id: 'py-sorted-desc', group: LST, lvl: 1,
      ask: 'Sort `items` from largest to smallest',
      a: 'sorted(items, reverse=True)' },

    { id: 'py-sorted-key', group: LST, lvl: 2,
      ask: 'Sort the list of strings `words` by length',
      a: 'sorted(words, key=len)',
      note: 'key takes a function applied to each element before comparing.' },

    { id: 'py-sorted-lambda', group: LST, lvl: 2,
      ask: 'Sort the list of dicts `people` by their "age" key',
      a: "sorted(people, key=lambda p: p['age'])",
      note: 'The single most useful lambda in Python.' },

    { id: 'py-sorted-tuple', group: LST, lvl: 3,
      ask: 'Sort `people` by "age" descending, then by "name" ascending',
      a: "sorted(people, key=lambda p: (-p['age'], p['name']))",
      note: 'Negate a numeric key to flip just that one field.' },

    { id: 'py-slice-list', group: LST, lvl: 1,
      ask: 'Get the first three elements of `items`',
      a: 'items[:3]' },

    { id: 'py-last-n', group: LST, lvl: 2,
      ask: 'Get the last three elements of `items`',
      a: 'items[-3:]' },

    { id: 'py-every-other', group: LST, lvl: 3,
      ask: 'Get every second element of `items`',
      a: 'items[::2]' },

    { id: 'py-copy-list', group: LST, lvl: 2,
      ask: 'Take a copy of the list `items`',
      a: 'items.copy()',
      alts: ['items[:]', 'list(items)'],
      note: 'new = items just makes a second name for the same list.' },

    { id: 'py-reverse-list', group: LST, lvl: 2,
      ask: 'Reverse the list `items` in place',
      a: 'items.reverse()',
      note: 'items[::-1] returns a reversed copy instead.' },

    { id: 'py-len-list', group: LST, lvl: 1,
      ask: 'Get the number of elements in `items`',
      a: 'len(items)' },

    { id: 'py-unpack', group: LST, lvl: 2,
      ask: 'Unpack the two-element list `pair` into a and b',
      a: 'a, b = pair' },

    { id: 'py-star-unpack', group: LST, lvl: 3,
      ask: 'Unpack `items` into its first element and a list of the rest',
      a: 'first, *rest = items',
      note: 'Star unpacking soaks up whatever is left over.' },

    { id: 'py-swap', group: LST, lvl: 2,
      ask: 'Swap the values of a and b in one line',
      a: 'a, b = b, a',
      note: 'No temporary variable needed — the right side is built first.' },

    { id: 'py-nested-list', group: LST, lvl: 2,
      ask: 'Flatten the list of lists `nested` into one list',
      a: 'flat = [x for sub in nested for x in sub]',
      note: 'Loops read left to right, exactly as if they were nested.' },

    { id: 'py-list-range', group: LST, lvl: 1,
      ask: 'Make a list of the numbers 0 to 9',
      a: 'list(range(10))',
      note: 'range on its own is lazy — it only produces numbers as you ask for them.' },

    /* ---- dicts, sets, tuples ---- */
    { id: 'py-dict-new', group: DCT, lvl: 1,
      ask: 'Make an empty dictionary called counts',
      a: 'counts = {}',
      alts: ['counts = dict()'] },

    { id: 'py-dict-set', group: DCT, lvl: 1,
      ask: 'Set the key "a" to 1 in the dict `d`',
      a: "d['a'] = 1",
      note: 'Assignment creates the key if it is missing.' },

    { id: 'py-dict-get', group: DCT, lvl: 1,
      ask: 'Read the key "a" from the dict `d`',
      a: "d['a']",
      note: 'Raises KeyError if the key is absent — use .get() when it might be.' },

    { id: 'py-dict-get-default', group: DCT, lvl: 1,
      ask: 'Read "a" from d, returning 0 when the key is missing',
      a: "d.get('a', 0)",
      note: 'The single most useful dict method — no try/except needed.' },

    { id: 'py-dict-keys', group: DCT, lvl: 1,
      ask: 'Get all the keys of the dict `d`',
      a: 'd.keys()',
      alts: ['list(d.keys())'] },

    { id: 'py-dict-values', group: DCT, lvl: 1,
      ask: 'Get all the values of the dict `d`',
      a: 'd.values()' },

    { id: 'py-dict-items', group: DCT, lvl: 1,
      ask: 'Get the (key, value) pairs of the dict `d`',
      a: 'd.items()' },

    { id: 'py-dict-in', group: DCT, lvl: 1,
      ask: 'Check whether the key "a" exists in the dict `d`',
      a: "'a' in d",
      note: '`in` checks keys, not values — and it is O(1).' },

    { id: 'py-dict-del', group: DCT, lvl: 2,
      ask: 'Delete the key "a" from the dict `d`',
      a: "del d['a']",
      alts: ["d.pop('a')"],
      note: 'd.pop(\'a\', None) is the version that will not raise.' },

    { id: 'py-dict-update', group: DCT, lvl: 2,
      ask: 'Merge the dict `other` into `d`',
      a: 'd.update(other)',
      alts: ['d |= other'],
      note: 'Python 3.9+ also has d | other for a merged copy.' },

    { id: 'py-dict-setdefault', group: DCT, lvl: 3,
      ask: 'Append x to the list stored at key k in `d`, creating the list if needed',
      a: 'd.setdefault(k, []).append(x)',
      note: 'The one-line grouping idiom — defaultdict(list) is the tidier alternative.' },

    { id: 'py-dict-count', group: DCT, lvl: 2,
      ask: 'Increment the count for key k in the dict `counts`, starting from 0',
      a: 'counts[k] = counts.get(k, 0) + 1',
      note: 'The manual word-count line every test seems to want.' },

    { id: 'py-dict-sort-value', group: DCT, lvl: 3,
      ask: 'Sort the items of `d` by value, biggest first',
      a: 'sorted(d.items(), key=lambda kv: kv[1], reverse=True)',
      note: 'kv[1] is the value; kv[0] would sort by key.' },

    { id: 'py-dict-max-value', group: DCT, lvl: 3,
      ask: 'Get the key with the largest value in the dict `d`',
      a: 'max(d, key=d.get)',
      note: 'Iterating a dict gives keys, and key=d.get scores each one by its value.' },

    { id: 'py-set-new', group: DCT, lvl: 1,
      ask: 'Make a set from the list `items`',
      a: 'set(items)',
      note: 'Deduplicates and gives O(1) membership tests — but loses the order.' },

    { id: 'py-set-add', group: DCT, lvl: 2,
      ask: 'Add x to the set `seen`',
      a: 'seen.add(x)',
      note: 'add takes one element; update takes an iterable.' },

    { id: 'py-set-intersect', group: DCT, lvl: 2,
      ask: 'Get the values present in both sets a and b',
      a: 'a & b',
      alts: ['a.intersection(b)'] },

    { id: 'py-set-union', group: DCT, lvl: 2,
      ask: 'Get everything in either set a or set b',
      a: 'a | b',
      alts: ['a.union(b)'] },

    { id: 'py-set-diff', group: DCT, lvl: 2,
      ask: 'Get the values in set a that are not in set b',
      a: 'a - b',
      alts: ['a.difference(b)'] },

    { id: 'py-dedupe-order', group: DCT, lvl: 3,
      ask: 'Remove duplicates from `items` while keeping the original order',
      a: 'list(dict.fromkeys(items))',
      note: 'Dicts keep insertion order since 3.7, so this beats set() when order matters.' },

    { id: 'py-tuple', group: DCT, lvl: 1,
      ask: 'Make a tuple holding 1 and 2',
      a: 'point = (1, 2)',
      note: 'Immutable, so it can be a dict key or a set member.' },

    { id: 'py-tuple-one', group: DCT, lvl: 3,
      ask: 'Make a tuple with a single element, the number 1',
      a: 'single = (1,)',
      note: 'The trailing comma is what makes it a tuple — (1) is just the number.' },

    /* ---- comprehensions & functional bits ---- */
    { id: 'py-listcomp', group: CMP, lvl: 1,
      ask: 'Build a list of every number in `nums` doubled',
      a: 'doubled = [n * 2 for n in nums]',
      note: 'Expression first, then the loop. This is the comprehension shape everything else builds on.' },

    { id: 'py-listcomp-if', group: CMP, lvl: 1,
      ask: 'Build a list of just the even numbers in `nums`',
      a: 'evens = [n for n in nums if n % 2 == 0]',
      note: 'The filter goes at the end.' },

    { id: 'py-listcomp-ifelse', group: CMP, lvl: 2,
      ask: 'Build a list labelling each n in `nums` "even" or "odd"',
      a: "labels = ['even' if n % 2 == 0 else 'odd' for n in nums]",
      note: 'When there is an else, the conditional moves to the FRONT — it is now an expression.' },

    { id: 'py-listcomp-method', group: CMP, lvl: 1,
      ask: 'Build a list of every word in `words`, uppercased',
      a: 'upper = [w.upper() for w in words]' },

    { id: 'py-dictcomp', group: CMP, lvl: 2,
      ask: 'Build a dict mapping each word in `words` to its length',
      a: 'lengths = {w: len(w) for w in words}',
      note: 'Same shape as a list comprehension, with key: value in front.' },

    { id: 'py-dictcomp-invert', group: CMP, lvl: 3,
      ask: 'Invert the dict `d` so values become keys',
      a: 'inv = {v: k for k, v in d.items()}',
      note: 'Only safe when the values are unique.' },

    { id: 'py-setcomp', group: CMP, lvl: 2,
      ask: 'Build a set of the lengths of every word in `words`',
      a: 'sizes = {len(w) for w in words}',
      note: 'Curly braces with no colon gives a set comprehension.' },

    { id: 'py-gencomp', group: CMP, lvl: 3,
      ask: 'Sum the squares of `nums` without building a list in memory',
      a: 'total = sum(n ** 2 for n in nums)',
      note: 'A generator expression — lazy, and the brackets are optional inside a call.' },

    { id: 'py-zip-dict', group: CMP, lvl: 2,
      ask: 'Build a dict from the parallel lists `keys` and `values`',
      a: 'd = dict(zip(keys, values))' },

    { id: 'py-map', group: CMP, lvl: 2,
      ask: 'Apply int() to every element of `strings` using map',
      a: 'nums = list(map(int, strings))',
      note: 'map is lazy — wrap it in list() to see anything.' },

    { id: 'py-filter', group: CMP, lvl: 3,
      ask: 'Keep the truthy elements of `items` using filter',
      a: 'kept = list(filter(None, items))',
      note: 'filter(None, ...) drops everything falsy — 0, \'\', None, empty lists.' },

    { id: 'py-any-py', group: CMP, lvl: 2,
      ask: 'Check whether any number in `nums` is negative',
      a: 'any(n < 0 for n in nums)',
      note: 'any/all short-circuit — they stop at the first answer.' },

    { id: 'py-all-py', group: CMP, lvl: 2,
      ask: 'Check whether every number in `nums` is positive',
      a: 'all(n > 0 for n in nums)' },

    { id: 'py-counter', group: CMP, lvl: 2,
      ask: 'Count how often each element appears in `items`, using collections',
      a: 'from collections import Counter',
      note: 'Then Counter(items) gives the counts and .most_common(3) the top three.' },

    { id: 'py-counter-use', group: CMP, lvl: 2,
      ask: 'Build the counts of `items` with Counter',
      a: 'counts = Counter(items)',
      note: 'counts.most_common(1)[0][0] pulls out the single most common value.' },

    { id: 'py-counter-top', group: CMP, lvl: 2,
      ask: 'Get the three most common elements and their counts from the Counter `counts`',
      a: 'counts.most_common(3)',
      note: 'Returns a list of (value, count) tuples, biggest first.' },

    { id: 'py-defaultdict', group: CMP, lvl: 3,
      ask: 'Import defaultdict from collections',
      a: 'from collections import defaultdict',
      note: 'defaultdict(list) gives every new key an empty list automatically.' },

    { id: 'py-defaultdict-use', group: CMP, lvl: 3,
      ask: 'Make a dict whose missing keys start as empty lists',
      a: 'groups = defaultdict(list)',
      note: 'Then groups[k].append(x) just works, with no setup.' },

    { id: 'py-deque', group: CMP, lvl: 3,
      ask: 'Import deque, the double-ended queue',
      a: 'from collections import deque',
      note: 'O(1) appends and pops at both ends — the right structure for BFS.' },

    { id: 'py-itertools-comb', group: CMP, lvl: 3,
      ask: 'Get every pair of items from `items` using itertools',
      a: 'from itertools import combinations',
      note: 'combinations(items, 2) yields each pair once; permutations counts order.' },

    { id: 'py-enumerate-start', group: CMP, lvl: 2,
      ask: 'Loop over `items` numbering them from 1',
      a: 'for i, item in enumerate(items, 1):',
      note: 'The second argument of enumerate is the starting number.' }
  );
})();
