/* Python coding test — problem bank 7: the harder, more job-shaped questions.
   Deduplicating by key, sessionising events, co-occurrence, top-k, validation
   reports — the kind of thing a take-home actually asks a data scientist to write. */
(function () {
  window.PYTESTS = window.PYTESTS || [];

  window.PYTESTS.push(

    { id: 'pt-latest-per-key', group: 'Working with records', lvl: 3,
      title: 'Keep the latest record per customer',
      fn: 'latest_per_customer',
      brief: 'Given records with "customer", "updated" (an ISO date string) and "status", keep only the most recent record for each customer.\n\nReturn a dict of customer → status. If two records share the same date, keep the one that appears later in the list.',
      sig: 'def latest_per_customer(rows: list[dict]) -> dict[str, str]',
      starter: 'def latest_per_customer(rows):\n    # your code here\n    pass\n',
      examples: [
        { in: "latest_per_customer([{'customer': 'a', 'updated': '2024-01-01', 'status': 'new'}, {'customer': 'a', 'updated': '2024-06-01', 'status': 'live'}])",
          out: "{'a': 'live'}" }],
      tests: [
        { call: "latest_per_customer([{'customer': 'a', 'updated': '2024-01-01', 'status': 'new'}, {'customer': 'a', 'updated': '2024-06-01', 'status': 'live'}])", expect: "{'a': 'live'}" },
        { call: "latest_per_customer([])", expect: '{}' },
        { call: "latest_per_customer([{'customer': 'b', 'updated': '2024-06-01', 'status': 'live'}, {'customer': 'b', 'updated': '2024-01-01', 'status': 'new'}])", expect: "{'b': 'live'}", name: 'out of order input' },
        { call: "latest_per_customer([{'customer': 'c', 'updated': '2024-01-01', 'status': 'first'}, {'customer': 'c', 'updated': '2024-01-01', 'status': 'second'}])", expect: "{'c': 'second'}", hidden: true, name: 'same date, later wins' },
        { call: "len(latest_per_customer([{'customer': str(i % 50), 'updated': '2024-01-01', 'status': 'x'} for i in range(500)]))", expect: '50', hidden: true }],
      hint: 'ISO dates compare correctly as plain strings. Keep a dict of the best row so far and replace it when you meet one that is at least as recent.',
      solution: "def latest_per_customer(rows):\n    best = {}\n    for row in rows:\n        key = row['customer']\n        if key not in best or row['updated'] >= best[key]['updated']:\n            best[key] = row\n    return {k: v['status'] for k, v in best.items()}\n",
      walk: "YYYY-MM-DD sorts correctly as text, which is the whole reason ISO is the format to store dates in. Using >= rather than > is what makes a later row win a tie, exactly as the brief asks — a one-character decision that the hidden test checks.",
      complexity: 'O(n) time, O(k) space.' },

    { id: 'pt-sessionise', group: 'Working with records', lvl: 3,
      title: 'Split events into sessions',
      fn: 'count_sessions',
      brief: 'Given a sorted list of event timestamps in seconds, count the sessions.\n\nA new session starts whenever the gap since the previous event is more than 30 minutes (1800 seconds). No events means no sessions.',
      sig: 'def count_sessions(times: list[int]) -> int',
      starter: 'def count_sessions(times):\n    # your code here\n    pass\n',
      examples: [
        { in: 'count_sessions([0, 60, 5000])', out: '2', note: 'the jump to 5000 opens a second session' }],
      tests: [
        { call: 'count_sessions([0, 60, 5000])', expect: '2' },
        { call: 'count_sessions([])', expect: '0' },
        { call: 'count_sessions([100])', expect: '1', name: 'one event is one session' },
        { call: 'count_sessions([0, 1800])', expect: '1', hidden: true, name: 'exactly 30 minutes is not a new session' },
        { call: 'count_sessions([0, 1801, 3602])', expect: '3', hidden: true }],
      hint: 'Every event either continues the previous session or starts a new one — so count the first event, then count each gap over the threshold.',
      solution: 'def count_sessions(times):\n    if not times:\n        return 0\n    sessions = 1\n    for previous, current in zip(times, times[1:]):\n        if current - previous > 1800:\n            sessions += 1\n    return sessions\n',
      walk: "zip(times, times[1:]) is the neat way to walk consecutive pairs without index arithmetic. The boundary matters: the brief says MORE than 30 minutes, so exactly 1800 continues the session — read that sentence twice in a real test, because both readings are defensible and only one is marked.",
      complexity: 'O(n) time, O(1) extra space if you pair with indices instead of a slice.' },

    { id: 'pt-cooccurrence', group: 'Working with records', lvl: 3,
      title: 'Bought together',
      fn: 'top_pair',
      brief: 'Given a list of baskets (each a list of product names), find the pair of products that appears together in the most baskets.\n\nReturn the pair as a tuple sorted alphabetically. If no basket holds two or more products, return None.',
      sig: 'def top_pair(baskets: list[list[str]]) -> tuple | None',
      starter: 'def top_pair(baskets):\n    # your code here\n    pass\n',
      examples: [
        { in: "top_pair([['a', 'b'], ['a', 'b', 'c'], ['c']])", out: "('a', 'b')" }],
      tests: [
        { call: "top_pair([['a', 'b'], ['a', 'b', 'c'], ['c']])", expect: "('a', 'b')" },
        { call: "top_pair([['x']])", expect: 'None', name: 'no pairs at all' },
        { call: "top_pair([])", expect: 'None' },
        { call: "top_pair([['b', 'a']])", expect: "('a', 'b')", hidden: true, name: 'sorted, whatever the basket order' },
        { call: "top_pair([['a','b'], ['b','a'], ['c','d']])", expect: "('a', 'b')", hidden: true, name: 'the same pair either way round' }],
      hint: 'itertools.combinations(sorted(basket), 2) gives each pair of a basket once, already in order. Count those pairs across every basket.',
      solution: "from collections import Counter\nfrom itertools import combinations\n\ndef top_pair(baskets):\n    counts = Counter()\n    for basket in baskets:\n        for pair in combinations(sorted(set(basket)), 2):\n            counts[pair] += 1\n    if not counts:\n        return None\n    return counts.most_common(1)[0][0]\n",
      walk: "Sorting each basket before pairing is what makes ('a','b') and ('b','a') the same key — otherwise the counts split in half. set() guards against a product listed twice in one basket. This is the whole of a naive market-basket analysis, in nine lines.",
      complexity: 'O(n · k²) for baskets of size k — fine for small baskets, and the reason real systems prune first.' },

    { id: 'pt-topk-heap', group: 'Algorithms', lvl: 3,
      title: 'Top k without sorting everything',
      fn: 'top_k',
      brief: 'Return the k largest numbers from a list, biggest first.\n\nIf k is bigger than the list, return everything sorted. k of 0 or less returns an empty list.',
      sig: 'def top_k(nums: list[int], k: int) -> list[int]',
      starter: 'def top_k(nums, k):\n    # your code here\n    pass\n',
      examples: [
        { in: 'top_k([5, 1, 9, 3], 2)', out: '[9, 5]' }],
      tests: [
        { call: 'top_k([5, 1, 9, 3], 2)', expect: '[9, 5]' },
        { call: 'top_k([1, 2], 5)', expect: '[2, 1]', name: 'k bigger than the list' },
        { call: 'top_k([1, 2], 0)', expect: '[]' },
        { call: 'top_k([3, 3, 1], 2)', expect: '[3, 3]', hidden: true, name: 'duplicates are kept' },
        { call: 'top_k(list(range(200000)), 3)', expect: '[199999, 199998, 199997]', hidden: true }],
      hint: 'heapq.nlargest(k, nums) does exactly this, in O(n log k) rather than sorting the whole list.',
      solution: 'import heapq\n\ndef top_k(nums, k):\n    if k <= 0:\n        return []\n    return heapq.nlargest(k, nums)\n',
      walk: 'Sorting is O(n log n) and returns far more order than you asked for; a heap of size k gives O(n log k) and is what a database does for a LIMIT clause. Knowing heapq exists is most of the answer — and nlargest already handles k larger than the input.',
      complexity: 'O(n log k) time, O(k) space.' },

    { id: 'pt-validate-rows', group: 'Working with records', lvl: 3,
      title: 'Data validation report',
      fn: 'validate',
      brief: 'Check a list of records against three rules and return a dict of rule name → how many rows broke it:\n\n· "missing_email" — the "email" key is absent, None or empty\n· "bad_age" — "age" is missing, or is not a whole number between 0 and 120\n· "duplicate_id" — an "id" value that has already been seen earlier in the list\n\nRules that nothing breaks must still appear, with a count of 0.',
      sig: 'def validate(rows: list[dict]) -> dict[str, int]',
      starter: 'def validate(rows):\n    # your code here\n    pass\n',
      examples: [
        { in: "validate([{'id': 1, 'email': '', 'age': 30}])", out: "{'missing_email': 1, 'bad_age': 0, 'duplicate_id': 0}" }],
      tests: [
        { call: "validate([{'id': 1, 'email': '', 'age': 30}])", expect: "{'missing_email': 1, 'bad_age': 0, 'duplicate_id': 0}" },
        { call: "validate([])", expect: "{'missing_email': 0, 'bad_age': 0, 'duplicate_id': 0}", name: 'every rule still reported' },
        { call: "validate([{'id': 1, 'email': 'a@b.c', 'age': 200}])['bad_age']", expect: '1' },
        { call: "validate([{'id': 7, 'email': 'a@b.c', 'age': 30}, {'id': 7, 'email': 'a@b.c', 'age': 30}])['duplicate_id']", expect: '1', hidden: true, name: 'only the second copy counts' },
        { call: "validate([{'id': 2, 'age': True, 'email': 'x@y.z'}])['bad_age']", expect: '1', hidden: true, name: 'True is not an age' }],
      hint: 'Start the counts at zero for all three rules, then walk the rows once, testing each rule independently — a row can break more than one.',
      solution: "def validate(rows):\n    counts = {'missing_email': 0, 'bad_age': 0, 'duplicate_id': 0}\n    seen = set()\n    for row in rows:\n        email = row.get('email')\n        if not email:\n            counts['missing_email'] += 1\n        age = row.get('age')\n        if isinstance(age, bool) or not isinstance(age, int) or not 0 <= age <= 120:\n            counts['bad_age'] += 1\n        key = row.get('id')\n        if key in seen:\n            counts['duplicate_id'] += 1\n        seen.add(key)\n    return counts\n",
      walk: "Seeding the dict with every rule is what makes the empty case behave — a report that silently omits a rule is worse than one that says zero. The bool check is the sharp edge: True is an int in Python, so isinstance(True, int) passes and an age of True would sneak through without it.",
      complexity: 'O(n) time, O(k) space for the ids seen.' },

    { id: 'pt-column-means', group: 'Working with records', lvl: 2,
      title: 'Column means from rows',
      fn: 'column_means',
      brief: 'Given a list of equal-length rows of numbers, return the mean of each column.\n\nAn empty list returns an empty list.',
      sig: 'def column_means(rows: list[list[float]]) -> list[float]',
      starter: 'def column_means(rows):\n    # your code here\n    pass\n',
      examples: [
        { in: 'column_means([[1, 2], [3, 4]])', out: '[2.0, 3.0]' }],
      tests: [
        { call: 'column_means([[1, 2], [3, 4]])', expect: '[2.0, 3.0]' },
        { call: 'column_means([])', expect: '[]' },
        { call: 'column_means([[5, 5, 5]])', expect: '[5.0, 5.0, 5.0]', name: 'one row' },
        { call: 'column_means([[0, 10], [10, 0]])', expect: '[5.0, 5.0]', hidden: true },
        { call: 'len(column_means([[1] * 50] * 10))', expect: '50', hidden: true }],
      hint: 'zip(*rows) hands you the columns; then it is one mean per column.',
      solution: 'def column_means(rows):\n    if not rows:\n        return []\n    return [sum(col) / len(col) for col in zip(*rows)]\n',
      walk: "zip(*rows) transposes: the star unpacks each row as a separate argument, and zip pairs them up position by position, which IS the columns. Guard the empty case — zip(*[]) yields nothing, so without it you would return [] anyway, but saying so is clearer than relying on it.",
      complexity: 'O(n · m) over every value.' },

    { id: 'pt-format-money', group: 'Text handling', lvl: 2,
      title: 'Format as money',
      fn: 'money',
      brief: 'Format a number as pounds: a £ sign, thousands separated by commas, always two decimal places.\n\nNegative amounts go in brackets, as an accountant would write them: -1234.5 becomes (£1,234.50).',
      sig: 'def money(amount: float) -> str',
      starter: 'def money(amount):\n    # your code here\n    pass\n',
      examples: [
        { in: 'money(1234.5)', out: "'£1,234.50'" },
        { in: 'money(-1234.5)', out: "'(£1,234.50)'" }],
      tests: [
        { call: 'money(1234.5)', expect: "'£1,234.50'" },
        { call: 'money(-1234.5)', expect: "'(£1,234.50)'" },
        { call: 'money(0)', expect: "'£0.00'" },
        { call: 'money(1000000)', expect: "'£1,000,000.00'", hidden: true },
        { call: 'money(0.005)', expect: "'£0.01'", hidden: true, name: 'rounds to the penny' }],
      hint: "An f-string can do the separators and the decimals in one go: f'{x:,.2f}'.",
      solution: "def money(amount):\n    body = f'£{abs(amount):,.2f}'\n    return f'({body})' if amount < 0 else body\n",
      walk: "The format spec ,.2f does the comma grouping and the two decimals together. Formatting the absolute value and adding the brackets afterwards keeps the minus sign out of the middle of the string. Note that 0.005 rounds to 0.01 here — float formatting rounds half away from zero, unlike round().",
      complexity: 'O(1).' },

    { id: 'pt-fill-forward', group: 'Working with records', lvl: 2,
      title: 'Carry the last value forward',
      fn: 'forward_fill',
      brief: 'Replace each None in a list with the last non-None value before it.\n\nLeading Nones, with nothing before them, stay as they are.',
      sig: 'def forward_fill(values: list) -> list',
      starter: 'def forward_fill(values):\n    # your code here\n    pass\n',
      examples: [
        { in: 'forward_fill([1, None, None, 2, None])', out: '[1, 1, 1, 2, 2]' }],
      tests: [
        { call: 'forward_fill([1, None, None, 2, None])', expect: '[1, 1, 1, 2, 2]' },
        { call: 'forward_fill([None, 1])', expect: '[None, 1]', name: 'nothing to carry yet' },
        { call: 'forward_fill([])', expect: '[]' },
        { call: 'forward_fill([None, None])', expect: '[None, None]', hidden: true },
        { call: 'forward_fill([0, None])', expect: '[0, 0]', hidden: true, name: 'zero is a real value' }],
      hint: 'Carry a "last seen" variable through the loop, starting at None. Test with `is not None`, not with truthiness.',
      solution: 'def forward_fill(values):\n    out = []\n    last = None\n    for v in values:\n        if v is not None:\n            last = v\n        out.append(last)\n    return out\n',
      walk: "This is pandas' ffill() in six lines. The trap is the zero: `if v:` would treat a genuine 0 as missing and carry the previous value over it, which is the hidden test. Leading Nones come out untouched because `last` starts as None.",
      complexity: 'O(n) time and space.' },

    { id: 'pt-rank-scores', group: 'Working with records', lvl: 3,
      title: 'Rank with ties',
      fn: 'rank_scores',
      brief: 'Given a list of scores, return each score\'s competition rank: the highest score is rank 1, equal scores share a rank, and the next distinct score skips the ranks used up.\n\nSo [10, 10, 8] ranks as [1, 1, 3].',
      sig: 'def rank_scores(scores: list[float]) -> list[int]',
      starter: 'def rank_scores(scores):\n    # your code here\n    pass\n',
      examples: [
        { in: 'rank_scores([10, 10, 8])', out: '[1, 1, 3]' }],
      tests: [
        { call: 'rank_scores([10, 10, 8])', expect: '[1, 1, 3]' },
        { call: 'rank_scores([5, 9, 7])', expect: '[3, 1, 2]', name: 'ranks follow the input order' },
        { call: 'rank_scores([])', expect: '[]' },
        { call: 'rank_scores([4, 4, 4])', expect: '[1, 1, 1]', hidden: true, name: 'everyone ties' },
        { call: 'rank_scores([1, 2, 2, 3])', expect: '[4, 2, 2, 1]', hidden: true }],
      hint: 'A score\'s rank is one more than the number of scores strictly greater than it — but do the counting once, not once per score.',
      solution: 'def rank_scores(scores):\n    ordered = sorted(set(scores), reverse=True)\n    rank_of = {}\n    used = 0\n    for value in ordered:\n        rank_of[value] = used + 1\n        used += scores.count(value)\n    return [rank_of[s] for s in scores]\n',
      walk: "Competition ranking (1, 1, 3) is what sport and league tables use; dense ranking (1, 1, 2) is the other convention, and pandas offers both through rank(method=...). Working from the distinct values in descending order, each one's rank is however many competitors have already been placed, plus one.",
      complexity: 'O(n·k) as written; O(n log n) if you count with a Counter instead of .count().' },

    { id: 'pt-longest-streak', group: 'Working with records', lvl: 3,
      title: 'Longest winning streak',
      fn: 'longest_streak',
      brief: 'Given a list of results in order, each "W", "L" or "D", return the length of the longest unbroken run of "W".',
      sig: 'def longest_streak(results: list[str]) -> int',
      starter: 'def longest_streak(results):\n    # your code here\n    pass\n',
      examples: [
        { in: "longest_streak(['W', 'W', 'L', 'W'])", out: '2' }],
      tests: [
        { call: "longest_streak(['W', 'W', 'L', 'W'])", expect: '2' },
        { call: "longest_streak(['L', 'D'])", expect: '0', name: 'no wins at all' },
        { call: "longest_streak([])", expect: '0' },
        { call: "longest_streak(['W', 'W', 'W'])", expect: '3', hidden: true, name: 'the streak runs to the end' },
        { call: "longest_streak(['W', 'D', 'W', 'W'])", expect: '2', hidden: true }],
      hint: 'Count up on a W, reset to zero on anything else, and remember the best you have seen.',
      solution: "def longest_streak(results):\n    best = current = 0\n    for r in results:\n        current = current + 1 if r == 'W' else 0\n        best = max(best, current)\n    return best\n",
      walk: 'Updating `best` inside the loop rather than after it is what catches a streak that runs right to the last element — the single most common bug in this shape of question. Both counters start at 0, so an empty list falls out correctly.',
      complexity: 'O(n) time, O(1) space.' }
  );
})();
