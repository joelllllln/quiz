/* Python coding test — problem bank 10: the capstones.
   Longer briefs with several requirements, the way a take-home is actually written.
   Nothing here needs an idea you have not already met; the difficulty is holding
   four requirements in your head at once and covering the edges of each. */
(function () {
  window.PYTESTS = window.PYTESTS || [];
  var G = 'Capstones';

  window.PYTESTS.push(

    { id: 'pt-cap-report', group: G, lvl: 3,
      title: 'Sales report',
      fn: 'report',
      brief: 'Given a list of sales records — dicts with "region", "customer" and "amount" — return a summary dict with four keys:\n\n· "total" — the total amount, rounded to 2 decimal places\n· "by_region" — a dict of region → total, rounded to 2dp\n· "top_customer" — the customer with the highest total, ties broken alphabetically, or None if there are no sales\n· "n_customers" — how many distinct customers appear\n\nRecords with a missing or non-numeric amount are ignored entirely.',
      sig: 'def report(sales: list[dict]) -> dict',
      starter: 'def report(sales):\n    # your code here\n    pass\n',
      examples: [
        { in: "report([{'region': 'N', 'customer': 'a', 'amount': 10}, {'region': 'S', 'customer': 'b', 'amount': 5}])",
          out: "{'total': 15, 'by_region': {'N': 10, 'S': 5}, 'top_customer': 'a', 'n_customers': 2}" }],
      tests: [
        { call: "report([{'region': 'N', 'customer': 'a', 'amount': 10}, {'region': 'S', 'customer': 'b', 'amount': 5}])['total']", expect: '15' },
        { call: "report([{'region': 'N', 'customer': 'a', 'amount': 10}, {'region': 'N', 'customer': 'b', 'amount': 5}])['by_region']", expect: "{'N': 15}" },
        { call: "report([])", expect: "{'total': 0, 'by_region': {}, 'top_customer': None, 'n_customers': 0}", name: 'nothing at all' },
        { call: "report([{'region': 'N', 'customer': 'b', 'amount': 5}, {'region': 'N', 'customer': 'a', 'amount': 5}])['top_customer']", expect: "'a'", name: 'a tie goes alphabetically' },
        { call: "report([{'region': 'N', 'customer': 'a', 'amount': None}, {'region': 'N', 'customer': 'a', 'amount': 'x'}, {'region': 'N', 'customer': 'a', 'amount': 4}])['total']", expect: '4', hidden: true, name: 'bad amounts are ignored' },
        { call: "report([{'region': 'N', 'customer': 'a', 'amount': 1.005}, {'region': 'N', 'customer': 'a', 'amount': 1.005}])['total']", expect: '2.01', hidden: true, name: 'rounded to the penny' },
        { call: "report([{'region': 'N', 'customer': 'a', 'amount': 1}, {'region': 'S', 'customer': 'a', 'amount': 1}])['n_customers']", expect: '1', hidden: true, name: 'distinct customers, not rows' }],
      hint: 'Do one pass that skips the bad rows and fills two dicts and a set. Then answer the four questions from those.',
      solution: "def report(sales):\n    by_region = {}\n    by_customer = {}\n    total = 0\n    for row in sales:\n        amount = row.get('amount')\n        if not isinstance(amount, (int, float)) or isinstance(amount, bool):\n            continue\n        region, customer = row.get('region'), row.get('customer')\n        total += amount\n        by_region[region] = by_region.get(region, 0) + amount\n        by_customer[customer] = by_customer.get(customer, 0) + amount\n    if by_customer:\n        best = max(by_customer.values())\n        top = sorted(c for c in by_customer if by_customer[c] == best)[0]\n    else:\n        top = None\n    return {\n        'total': round(total, 2),\n        'by_region': {k: round(v, 2) for k, v in by_region.items()},\n        'top_customer': top,\n        'n_customers': len(by_customer),\n    }\n",
      walk: 'One pass, three accumulators. The validity check has to exclude bools as well as strings, because True is an int in Python and would quietly add 1 to your total. The tie-break needs stating explicitly — max() alone would decide it by insertion order — and the empty case has to return the same SHAPE of dict, or the caller breaks.',
      complexity: 'O(n) time, O(k) space.' },

    { id: 'pt-cap-text', group: G, lvl: 3,
      title: 'Text statistics',
      fn: 'analyse',
      brief: 'Given a piece of text, return a dict with:\n\n· "words" — how many words there are\n· "unique" — how many distinct words, ignoring case and punctuation\n· "longest" — the longest word (lower-cased, punctuation stripped), ties going to the one that appears first\n· "top" — a list of the three most common words, most common first, ties broken alphabetically\n\nWords are runs of letters and digits. Empty text gives 0, 0, None and an empty list.',
      sig: 'def analyse(text: str) -> dict',
      starter: 'def analyse(text):\n    # your code here\n    pass\n',
      examples: [
        { in: "analyse('the cat the dog')", out: "{'words': 4, 'unique': 3, 'longest': 'the', 'top': ['the', 'cat', 'dog']}" }],
      tests: [
        { call: "analyse('the cat the dog')['words']", expect: '4' },
        { call: "analyse('the cat the dog')['unique']", expect: '3' },
        { call: "analyse('the cat the dog')['top']", expect: "['the', 'cat', 'dog']" },
        { call: "analyse('')", expect: "{'words': 0, 'unique': 0, 'longest': None, 'top': []}", name: 'nothing to analyse' },
        { call: "analyse('Hello, hello! HELLO?')['unique']", expect: '1', hidden: true, name: 'case and punctuation ignored' },
        { call: "analyse('a bb ccc dd')['longest']", expect: "'ccc'", hidden: true },
        { call: "analyse('aa bb aa bb cc')['top']", expect: "['aa', 'bb', 'cc']", hidden: true, name: 'the tie is alphabetical' }],
      hint: 'One regex gives you the word list. Everything else is len, set, max with a key, and a sort on (-count, word).',
      solution: "import re\nfrom collections import Counter\n\ndef analyse(text):\n    words = re.findall(r'[a-z0-9]+', text.lower())\n    if not words:\n        return {'words': 0, 'unique': 0, 'longest': None, 'top': []}\n    counts = Counter(words)\n    ordered = sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))\n    return {\n        'words': len(words),\n        'unique': len(counts),\n        'longest': max(words, key=len),\n        'top': [word for word, _ in ordered[:3]],\n    }\n",
      walk: 'Lowercasing and extracting in the same line means every later step inherits clean words. max(..., key=len) returns the first of any tie, which is what the brief asks. The (-count, word) sort key is the standard way to rank by one thing and break ties by another.',
      complexity: 'O(n log n) from the sort, O(n) otherwise.' },

    { id: 'pt-cap-clean', group: G, lvl: 3,
      title: 'Clean, deduplicate, summarise',
      fn: 'process',
      brief: 'Given customer records — dicts with "id", "email", "spend" and "updated" (an ISO date) — return a summary dict:\n\n· drop records with no id\n· keep only the newest record per id (a tie keeps the one later in the list)\n· treat a spend that is missing or non-numeric as 0\n· lower-case and strip the email; a missing one becomes None\n\nThen return {"customers": how many survived, "total_spend": their total rounded to 2dp, "missing_email": how many have no email}.',
      sig: 'def process(rows: list[dict]) -> dict',
      starter: 'def process(rows):\n    # your code here\n    pass\n',
      examples: [
        { in: "process([{'id': 1, 'email': ' A@B.C ', 'spend': 10, 'updated': '2024-01-01'}])",
          out: "{'customers': 1, 'total_spend': 10, 'missing_email': 0}" }],
      tests: [
        { call: "process([{'id': 1, 'email': ' A@B.C ', 'spend': 10, 'updated': '2024-01-01'}])", expect: "{'customers': 1, 'total_spend': 10, 'missing_email': 0}" },
        { call: "process([])", expect: "{'customers': 0, 'total_spend': 0, 'missing_email': 0}" },
        { call: "process([{'id': 1, 'spend': 5, 'updated': '2024-01-01'}, {'id': 1, 'spend': 7, 'updated': '2024-06-01'}])['total_spend']", expect: '7', name: 'only the newest record counts' },
        { call: "process([{'id': None, 'spend': 5, 'updated': '2024-01-01'}])['customers']", expect: '0', name: 'no id, no record' },
        { call: "process([{'id': 1, 'spend': 'x', 'updated': '2024-01-01'}])['total_spend']", expect: '0', hidden: true, name: 'a bad spend counts as zero' },
        { call: "process([{'id': 1, 'spend': 1, 'updated': '2024-01-01'}, {'id': 2, 'spend': 2, 'updated': '2024-01-01'}])['missing_email']", expect: '2', hidden: true },
        { call: "process([{'id': 1, 'spend': 1, 'updated': '2024-01-01'}, {'id': 1, 'spend': 2, 'updated': '2024-01-01'}])['total_spend']", expect: '2', hidden: true, name: 'same date keeps the later row' }],
      hint: 'Clean each row into a tidy dict first, then keep the newest per id in a second dict, then answer the three questions from what is left.',
      solution: "def process(rows):\n    best = {}\n    for row in rows:\n        key = row.get('id')\n        if key is None:\n            continue\n        spend = row.get('spend')\n        if isinstance(spend, bool) or not isinstance(spend, (int, float)):\n            spend = 0\n        email = row.get('email')\n        email = email.strip().lower() if isinstance(email, str) and email.strip() else None\n        updated = row.get('updated') or ''\n        if key not in best or updated >= best[key]['updated']:\n            best[key] = {'spend': spend, 'email': email, 'updated': updated}\n    return {\n        'customers': len(best),\n        'total_spend': round(sum(r['spend'] for r in best.values()), 2),\n        'missing_email': sum(1 for r in best.values() if r['email'] is None),\n    }\n",
      walk: 'Cleaning and deduplicating in one pass keeps it readable: normalise the row, then decide whether it beats what you have for that id. `>=` on the date is what makes a tie keep the later row, and ISO dates compare correctly as plain strings. Everything after the loop is arithmetic on a dictionary you can trust.',
      complexity: 'O(n) time, O(k) space for k customers.' },

    { id: 'pt-cap-knn-pipeline', group: G, lvl: 3,
      title: 'A whole model, by hand',
      fn: 'evaluate',
      brief: 'Put stage 03 together in one function. Given rows of features X, labels y, a test fraction and a k:\n\n1. split off the LAST fraction as the test set (at least one row each side when there are two or more rows)\n2. standardise each feature column using the TRAINING mean and standard deviation only\n3. predict every test row by k-nearest-neighbours majority vote, ties going to the alphabetically first label\n4. return the accuracy on the test set, rounded to 4 decimal places\n\nA column with no spread in training is left alone rather than divided by zero. Fewer than two rows returns 0.',
      sig: 'def evaluate(X: list[list[float]], y: list, test_size: float, k: int) -> float',
      starter: 'def evaluate(X, y, test_size, k):\n    # your code here\n    pass\n',
      examples: [{ in: 'evaluate([[0], [10], [0], [10]], [0, 1, 0, 1], 0.5, 1)', out: '1.0' }],
      tests: [
        { call: 'evaluate([[0], [10], [0], [10]], [0, 1, 0, 1], 0.5, 1)', expect: '1.0' },
        { call: 'evaluate([[0]], [0], 0.5, 1)', expect: '0', name: 'too little data' },
        { call: 'evaluate([], [], 0.2, 3)', expect: '0' },
        { call: 'evaluate([[0], [0], [10], [10]], [0, 0, 1, 1], 0.5, 1)', expect: '0.0', name: 'data sorted by class: the training half never sees class 1' },
        { call: 'evaluate([[5], [5], [5], [5]], [0, 0, 0, 0], 0.5, 1)', expect: '1.0', hidden: true, name: 'a constant column must not divide by zero' },
        { call: 'evaluate([[0, 0], [9, 9], [0, 1], [9, 8]], [0, 1, 0, 1], 0.5, 1)', expect: '1.0', hidden: true, name: 'two features' }],
      hint: 'Write it as four small steps and test each in your head: split, learn the scaling from train, apply it to both, then vote. Reuse the pieces you wrote earlier in this stage.',
      solution: "from collections import Counter\n\ndef evaluate(X, y, test_size, k):\n    n = len(X)\n    if n < 2:\n        return 0\n    n_test = max(1, min(n - 1, int(n * test_size)))\n    cut = n - n_test\n    X_train, X_test = X[:cut], X[cut:]\n    y_train, y_test = y[:cut], y[cut:]\n\n    n_cols = len(X_train[0])\n    means, sds = [], []\n    for c in range(n_cols):\n        col = [row[c] for row in X_train]\n        mean = sum(col) / len(col)\n        sd = (sum((v - mean) ** 2 for v in col) / len(col)) ** 0.5\n        means.append(mean)\n        sds.append(sd if sd else 1.0)\n\n    def scale(row):\n        return [(v - means[c]) / sds[c] for c, v in enumerate(row)]\n\n    train = [scale(row) for row in X_train]\n    right = 0\n    for row, truth in zip(X_test, y_test):\n        point = scale(row)\n        dists = sorted(zip(train, y_train), key=lambda pair: sum((a - b) ** 2 for a, b in zip(pair[0], point)))\n        labels = [label for _, label in dists[:k]]\n        counts = Counter(labels)\n        best = max(counts.values())\n        pred = sorted(l for l in counts if counts[l] == best)[0]\n        if pred == truth:\n            right += 1\n    return round(right / len(y_test), 4)\n",
      walk: 'This is the whole of stage 03 in one function, and the lines that matter most are the least exciting: the scaling statistics come from the training columns only, and a zero standard deviation becomes 1 rather than a division by zero. Get either wrong and the function still returns a number — just not an honest one.\n\nThe fourth test is the real lesson. The data is sorted by class, so taking the last half as test leaves a training set that has never seen class 1 — and the accuracy is 0 however good the code is. That is why train_test_split shuffles, and why stratify=y exists.',
      complexity: 'O(test × train × features).' }
  );
})();
