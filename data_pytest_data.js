/* Python coding test — problem bank 2: working with records.
   Lists of dicts, grouping, joining, cleaning and summarising — the questions a
   data-flavoured screening test asks when it does not want to assume pandas. */
(function () {
  window.PYTESTS = window.PYTESTS || [];

  window.PYTESTS.push(

    { id: 'pt-group-sum', group: 'Working with records', lvl: 2,
      title: 'Total sales per region',
      fn: 'total_by_region',
      brief: 'You are given a list of sales records, each a dict with "region" and "amount".\n\nReturn a dict of region → total amount. A region with no sales should not appear at all.',
      sig: 'def total_by_region(sales: list[dict]) -> dict[str, float]',
      starter: 'def total_by_region(sales):\n    # your code here\n    pass\n',
      examples: [
        { in: "total_by_region([{'region': 'N', 'amount': 10}, {'region': 'S', 'amount': 5}, {'region': 'N', 'amount': 2}])",
          out: "{'N': 12, 'S': 5}" }],
      tests: [
        { call: "total_by_region([{'region': 'N', 'amount': 10}, {'region': 'S', 'amount': 5}, {'region': 'N', 'amount': 2}])", expect: "{'N': 12, 'S': 5}" },
        { call: 'total_by_region([])', expect: '{}', name: 'no records' },
        { call: "total_by_region([{'region': 'E', 'amount': 0}])", expect: "{'E': 0}", name: 'a zero still counts' },
        { call: "total_by_region([{'region': 'N', 'amount': 1.5}, {'region': 'N', 'amount': 2.5}])", expect: "{'N': 4.0}", hidden: true },
        { call: "len(total_by_region([{'region': str(i % 3), 'amount': 1} for i in range(300)]))", expect: '3', hidden: true }],
      hint: 'dict.get(key, 0) gives you a starting value for a region you have not seen yet.',
      solution: "def total_by_region(sales):\n    totals = {}\n    for row in sales:\n        region = row['region']\n        totals[region] = totals.get(region, 0) + row['amount']\n    return totals\n",
      walk: "This is a groupby written by hand, and it is the single most-asked data question in a Python screen. .get(region, 0) removes the need to check whether the key exists. defaultdict(int) would do the same; a plain dict keeps the return type exactly as the brief asked.",
      complexity: 'O(n) time, O(k) space for k regions.' },

    { id: 'pt-avg-by-key', group: 'Working with records', lvl: 2,
      title: 'Average score per student',
      fn: 'average_scores',
      brief: 'Given a list of dicts with "name" and "score", return a dict of name → average score, rounded to one decimal place.',
      sig: 'def average_scores(rows: list[dict]) -> dict[str, float]',
      starter: 'def average_scores(rows):\n    # your code here\n    pass\n',
      examples: [
        { in: "average_scores([{'name': 'a', 'score': 10}, {'name': 'a', 'score': 5}, {'name': 'b', 'score': 8}])",
          out: "{'a': 7.5, 'b': 8.0}" }],
      tests: [
        { call: "average_scores([{'name': 'a', 'score': 10}, {'name': 'a', 'score': 5}, {'name': 'b', 'score': 8}])", expect: "{'a': 7.5, 'b': 8.0}" },
        { call: 'average_scores([])', expect: '{}' },
        { call: "average_scores([{'name': 'x', 'score': 1}, {'name': 'x', 'score': 2}])", expect: "{'x': 1.5}", hidden: true },
        { call: "average_scores([{'name': 'z', 'score': 7}])['z']", expect: '7.0', hidden: true, name: 'single record' }],
      hint: 'Collect the scores into a list per name first, then average each list at the end.',
      solution: "from collections import defaultdict\n\ndef average_scores(rows):\n    scores = defaultdict(list)\n    for row in rows:\n        scores[row['name']].append(row['score'])\n    return {name: round(sum(v) / len(v), 1) for name, v in scores.items()}\n",
      walk: 'Two passes: gather, then reduce. Trying to keep a running average in one pass is possible but fiddly and easy to get wrong. The dict comprehension at the end keeps the shape obvious. round(x, 1) makes the float comparison in the tests predictable.',
      complexity: 'O(n) time and space.' },

    { id: 'pt-top-n', group: 'Working with records', lvl: 2,
      title: 'Top N customers',
      fn: 'top_customers',
      brief: 'Given a list of dicts with "customer" and "spend", return the names of the top n customers by total spend, biggest first.\n\nBreak ties alphabetically by name.',
      sig: 'def top_customers(rows: list[dict], n: int) -> list[str]',
      starter: 'def top_customers(rows, n):\n    # your code here\n    pass\n',
      examples: [
        { in: "top_customers([{'customer': 'a', 'spend': 5}, {'customer': 'b', 'spend': 9}, {'customer': 'a', 'spend': 6}], 1)",
          out: "['a']", note: 'a totals 11, b totals 9' }],
      tests: [
        { call: "top_customers([{'customer': 'a', 'spend': 5}, {'customer': 'b', 'spend': 9}, {'customer': 'a', 'spend': 6}], 1)", expect: "['a']" },
        { call: "top_customers([{'customer': 'a', 'spend': 1}, {'customer': 'b', 'spend': 1}], 2)", expect: "['a', 'b']", name: 'tie broken by name' },
        { call: "top_customers([], 3)", expect: '[]' },
        { call: "top_customers([{'customer': 'x', 'spend': 1}], 5)", expect: "['x']", hidden: true, name: 'n bigger than the data' },
        { call: "top_customers([{'customer': 'c', 'spend': 3}, {'customer': 'a', 'spend': 3}, {'customer': 'b', 'spend': 9}], 2)", expect: "['b', 'a']", hidden: true }],
      hint: 'Total the spend per customer, then sort the items by (-total, name) and take the first n names.',
      solution: "def top_customers(rows, n):\n    totals = {}\n    for row in rows:\n        totals[row['customer']] = totals.get(row['customer'], 0) + row['spend']\n    ordered = sorted(totals.items(), key=lambda kv: (-kv[1], kv[0]))\n    return [name for name, _ in ordered[:n]]\n",
      walk: 'The tie-break is the real question. Sorting by a tuple sorts by the first element, then the second: negate the spend so it descends while the name still ascends. Slicing past the end of a list is safe, so n larger than the data needs no special case.',
      complexity: 'O(n + k log k) for k distinct customers.' },

    { id: 'pt-join-records', group: 'Working with records', lvl: 3,
      title: 'Join two lists of records',
      fn: 'join_orders',
      brief: 'You have orders (dicts with "customer_id" and "total") and customers (dicts with "id" and "name").\n\nReturn one list of dicts with "name" and "total" for every order whose customer exists — an inner join. Keep the original order of the orders. Ignore orders with no matching customer.',
      sig: 'def join_orders(orders: list[dict], customers: list[dict]) -> list[dict]',
      starter: 'def join_orders(orders, customers):\n    # your code here\n    pass\n',
      examples: [
        { in: "join_orders([{'customer_id': 1, 'total': 10}], [{'id': 1, 'name': 'Ann'}])",
          out: "[{'name': 'Ann', 'total': 10}]" }],
      tests: [
        { call: "join_orders([{'customer_id': 1, 'total': 10}], [{'id': 1, 'name': 'Ann'}])", expect: "[{'name': 'Ann', 'total': 10}]" },
        { call: "join_orders([{'customer_id': 9, 'total': 10}], [{'id': 1, 'name': 'Ann'}])", expect: '[]', name: 'no match is dropped' },
        { call: "join_orders([], [{'id': 1, 'name': 'Ann'}])", expect: '[]' },
        { call: "len(join_orders([{'customer_id': 1, 'total': i} for i in range(1000)], [{'id': 1, 'name': 'Ann'}]))", expect: '1000', hidden: true, name: 'must not be O(n*m)' },
        { call: "join_orders([{'customer_id': 2, 'total': 5}, {'customer_id': 1, 'total': 7}], [{'id': 1, 'name': 'Ann'}, {'id': 2, 'name': 'Bob'}])", expect: "[{'name': 'Bob', 'total': 5}, {'name': 'Ann', 'total': 7}]", hidden: true }],
      hint: 'Build a lookup dict of customer id → name first. Then one pass over the orders is enough.',
      solution: "def join_orders(orders, customers):\n    names = {c['id']: c['name'] for c in customers}\n    out = []\n    for order in orders:\n        name = names.get(order['customer_id'])\n        if name is not None:\n            out.append({'name': name, 'total': order['total']})\n    return out\n",
      walk: 'Searching the customer list inside the order loop is the O(n·m) trap the hidden test is watching for. Building the lookup dict once turns every match into O(1) — which is exactly what a database does when it hash-joins.',
      complexity: 'O(n + m) time, O(m) space for the lookup.' },

    { id: 'pt-clean-records', group: 'Working with records', lvl: 2,
      title: 'Clean the records',
      fn: 'clean',
      brief: 'Given a list of dicts with "name" and "age", return a cleaned list where:\n\n· names are stripped of surrounding whitespace and title-cased\n· age is an int (it may arrive as a string)\n· records with a missing or unparseable age are dropped entirely',
      sig: 'def clean(rows: list[dict]) -> list[dict]',
      starter: 'def clean(rows):\n    # your code here\n    pass\n',
      examples: [
        { in: "clean([{'name': ' ann ', 'age': '30'}, {'name': 'bob', 'age': None}])",
          out: "[{'name': 'Ann', 'age': 30}]" }],
      tests: [
        { call: "clean([{'name': ' ann ', 'age': '30'}, {'name': 'bob', 'age': None}])", expect: "[{'name': 'Ann', 'age': 30}]" },
        { call: "clean([{'name': 'cat', 'age': 'nine'}])", expect: '[]', name: 'unparseable age' },
        { call: "clean([])", expect: '[]' },
        { call: "clean([{'name': 'dee', 'age': 41}])", expect: "[{'name': 'Dee', 'age': 41}]", hidden: true, name: 'age already an int' },
        { call: "clean([{'name': '  jo ann ', 'age': ' 7 '}])", expect: "[{'name': 'Jo Ann', 'age': 7}]", hidden: true }],
      hint: 'Wrap the int() conversion in try/except — that is what turns "unparseable" into "skip this row" rather than a crash.',
      solution: "def clean(rows):\n    out = []\n    for row in rows:\n        try:\n            age = int(str(row.get('age')).strip())\n        except (TypeError, ValueError):\n            continue\n        out.append({'name': str(row.get('name', '')).strip().title(), 'age': age})\n    return out\n",
      walk: "int(None) raises TypeError and int('nine') raises ValueError, so catching both and using `continue` drops exactly the rows the brief says to drop. Doing the conversion BEFORE building the output dict means a bad row costs nothing. .strip() before .title() keeps the interior spacing tidy.",
      complexity: 'O(n) time and space.' },

    { id: 'pt-missing-fill', group: 'Working with records', lvl: 2,
      title: 'Fill the gaps with the median',
      fn: 'fill_missing',
      brief: 'Given a list of numbers where some entries are None, replace each None with the median of the values that are present.\n\nThe median of an even-length list is the mean of the two middle values. If every entry is None, return the list unchanged.',
      sig: 'def fill_missing(values: list) -> list',
      starter: 'def fill_missing(values):\n    # your code here\n    pass\n',
      examples: [
        { in: 'fill_missing([1, None, 3])', out: '[1, 2, 3]', note: 'median of [1, 3] is 2' }],
      tests: [
        { call: 'fill_missing([1, None, 3])', expect: '[1, 2, 3]' },
        { call: 'fill_missing([None, None])', expect: '[None, None]', name: 'nothing to learn from' },
        { call: 'fill_missing([5])', expect: '[5]' },
        { call: 'fill_missing([1, 2, 3, None])', expect: '[1, 2, 3, 2]', hidden: true, name: 'odd count of knowns' },
        { call: 'fill_missing([])', expect: '[]', hidden: true }],
      hint: 'Sort the known values, then pick the middle one (or average the two middles). Watch out for the all-None case before you divide.',
      solution: 'def fill_missing(values):\n    known = sorted(v for v in values if v is not None)\n    if not known:\n        return list(values)\n    mid = len(known) // 2\n    median = known[mid] if len(known) % 2 else (known[mid - 1] + known[mid]) / 2\n    return [median if v is None else v for v in values]\n',
      walk: "`v is not None` rather than `if v` — otherwise a genuine 0 gets treated as missing, which is the bug this question is really probing. Guard the empty case before computing the median, then rebuild the list in one comprehension.",
      complexity: 'O(n log n) for the sort, O(n) space.' },

    { id: 'pt-running-total', group: 'Working with records', lvl: 2,
      title: 'Running total',
      fn: 'running_total',
      brief: 'Return the running (cumulative) total of a list of numbers.\n\nThe result is the same length as the input.',
      sig: 'def running_total(nums: list[float]) -> list[float]',
      starter: 'def running_total(nums):\n    # your code here\n    pass\n',
      examples: [
        { in: 'running_total([1, 2, 3])', out: '[1, 3, 6]' }],
      tests: [
        { call: 'running_total([1, 2, 3])', expect: '[1, 3, 6]' },
        { call: 'running_total([])', expect: '[]' },
        { call: 'running_total([5])', expect: '[5]' },
        { call: 'running_total([1, -1, 1])', expect: '[1, 0, 1]', hidden: true, name: 'negatives' },
        { call: 'running_total(list(range(10000)))[-1]', expect: '49995000', hidden: true, name: 'must be one pass' }],
      hint: 'Keep a total outside the loop and append it after each addition.',
      solution: 'def running_total(nums):\n    out = []\n    total = 0\n    for n in nums:\n        total += n\n        out.append(total)\n    return out\n',
      walk: 'The naive version — sum(nums[:i+1]) inside a comprehension — is O(n²) and the ten-thousand-element test will crawl. Carrying the total forward makes it one pass. itertools.accumulate(nums) does the same thing in one call, and is worth knowing.',
      complexity: 'O(n) time, O(n) space.' },

    { id: 'pt-pairs-target', group: 'Working with records', lvl: 3,
      title: 'Count the pairs',
      fn: 'count_pairs',
      brief: 'Count how many unordered pairs of DIFFERENT positions in a list add up to a target.\n\nEach position may be used in several pairs, but (i, j) and (j, i) count once.',
      sig: 'def count_pairs(nums: list[int], target: int) -> int',
      starter: 'def count_pairs(nums, target):\n    # your code here\n    pass\n',
      examples: [
        { in: 'count_pairs([1, 2, 3, 4], 5)', out: '2', note: '1+4 and 2+3' },
        { in: 'count_pairs([1, 1, 1], 2)', out: '3', note: 'all three pairings of the three 1s' }],
      tests: [
        { call: 'count_pairs([1, 2, 3, 4], 5)', expect: '2' },
        { call: 'count_pairs([1, 1, 1], 2)', expect: '3' },
        { call: 'count_pairs([], 5)', expect: '0' },
        { call: 'count_pairs([5], 5)', expect: '0', hidden: true, name: 'cannot pair with itself' },
        { call: 'count_pairs([0, 0], 0)', expect: '1', hidden: true }],
      hint: 'Walk the list once. For each number, how many of the numbers you have ALREADY seen would complete the pair? Count those, then record this one.',
      solution: 'from collections import Counter\n\ndef count_pairs(nums, target):\n    seen = Counter()\n    pairs = 0\n    for n in nums:\n        pairs += seen[target - n]\n        seen[n] += 1\n    return pairs\n',
      walk: 'Counting before recording is what stops a number pairing with itself, and it also gets the duplicates right: the third 1 sees two earlier 1s, so [1,1,1] gives 1 + 2 = 3 pairs. Counter returns 0 for a value it has never seen, so no key checks are needed.',
      complexity: 'O(n) time, O(n) space — the nested-loop version is O(n²).' },

    { id: 'pt-mode-value', group: 'Working with records', lvl: 2,
      title: 'Most common value',
      fn: 'most_common',
      brief: 'Return the value that appears most often in a list.\n\nIf several tie, return the one that appeared first. An empty list returns None.',
      sig: 'def most_common(items: list) -> object',
      starter: 'def most_common(items):\n    # your code here\n    pass\n',
      examples: [
        { in: "most_common(['a', 'b', 'a'])", out: "'a'" },
        { in: "most_common(['x', 'y'])", out: "'x'", note: 'tie — x came first' }],
      tests: [
        { call: "most_common(['a', 'b', 'a'])", expect: "'a'" },
        { call: "most_common(['x', 'y'])", expect: "'x'" },
        { call: 'most_common([])', expect: 'None' },
        { call: 'most_common([1, 2, 2, 3, 3])', expect: '2', hidden: true, name: 'tie on counts, first wins' },
        { call: 'most_common([7])', expect: '7', hidden: true }],
      hint: 'Counter keeps insertion order, so max() over the original values with the count as the key naturally keeps the first of a tie.',
      solution: 'from collections import Counter\n\ndef most_common(items):\n    if not items:\n        return None\n    counts = Counter(items)\n    return max(counts, key=counts.get)\n',
      walk: "max() returns the FIRST maximum it meets, and Counter iterates in first-seen order, so the tie-break the brief asks for comes free. Counter.most_common(1) also works but its tie order is the same insertion order — worth saying out loud rather than relying on silently.",
      complexity: 'O(n) time, O(k) space.' }
  );
})();
