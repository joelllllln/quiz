/* Python coding test — pandas, the second sitting: safe assignment, multi-level
   grouping and vectorising. These need the pandas package. */
(function () {
  window.PYTESTS = window.PYTESTS || [];
  var NEEDS = ['pandas', 'numpy'];
  var SETUP = 'import pandas as pd\nimport numpy as np\n';

  window.PYTESTS.push(

    { id: 'pt-pd-safe-band', group: 'pandas', lvl: 2,
      title: 'Band the rows without the warning',
      fn: 'band', needs: NEEDS, setup: SETUP, noMock: true, budget: 30,
      brief: 'Given a DataFrame with a "score" column, return a copy with a new "band" column: "high" where the score is above 90, "low" everywhere else.\n\nThe frame you are given must not be modified, and the code must not rely on chained assignment.',
      sig: 'def band(df: pd.DataFrame) -> pd.DataFrame',
      starter: 'import pandas as pd\n\ndef band(df):\n    # your code here\n    pass\n',
      examples: [
        { in: "list(band(df)['band'])", out: "['low', 'high'] for scores [50, 95]" }],
      tests: [
        { call: "list(band(pd.DataFrame({'score': [50, 95]}))['band'])", expect: "['low', 'high']" },
        { call: "list(band(pd.DataFrame({'score': [90]}))['band'])", expect: "['low']", name: 'above 90, not 90 itself' },
        { call: "'band' in pd.DataFrame({'score': [1]}).pipe(lambda d: (band(d), d)[1]).columns", expect: 'False', name: 'the original is untouched' },
        { call: "len(band(pd.DataFrame({'score': []})))", expect: '0', hidden: true, name: 'an empty frame' },
        { call: "list(band(pd.DataFrame({'score': [100, 91, 0]}))['band'])", expect: "['high', 'high', 'low']", hidden: true }],
      hint: 'np.where(condition, a, b) is the vectorised if/else. Assign it onto a copy, or use .assign() which copies for you.',
      solution: "import pandas as pd\nimport numpy as np\n\ndef band(df):\n    return df.assign(band=np.where(df['score'] > 90, 'high', 'low'))\n",
      walk: "`.assign` returns a new frame, which is what keeps the caller's copy clean — the hidden test checks exactly that. `np.where` does the whole column at once; an `apply` with a lambda gives the same answer far more slowly, and a loop with `df.loc[i, 'band'] = ...` is slower still and is where SettingWithCopyWarning usually comes from.",
      complexity: 'O(n) over the rows.' },

    { id: 'pt-pd-region-month', group: 'pandas', lvl: 3,
      title: 'Regions down, months across',
      fn: 'grid', needs: NEEDS, setup: SETUP, noMock: true, budget: 30,
      brief: 'Given a DataFrame with "region", "month" and "amount", return a DataFrame of total amount with one row per region and one column per month.\n\nCombinations with no data should be 0, and both rows and columns should be in sorted order.',
      sig: 'def grid(df: pd.DataFrame) -> pd.DataFrame',
      starter: 'import pandas as pd\n\ndef grid(df):\n    # your code here\n    pass\n',
      examples: [
        { in: "grid(df).loc['N', 'Jan']", out: '30 for two January rows in N of 10 and 20' }],
      tests: [
        { call: "grid(pd.DataFrame({'region': ['N', 'N', 'S'], 'month': ['Jan', 'Jan', 'Feb'], 'amount': [10, 20, 5]})).loc['N', 'Jan']", expect: '30' },
        { call: "grid(pd.DataFrame({'region': ['N', 'S'], 'month': ['Jan', 'Feb'], 'amount': [10, 5]})).loc['N', 'Feb']", expect: '0', name: 'a missing combination is zero' },
        { call: "list(grid(pd.DataFrame({'region': ['S', 'N'], 'month': ['Feb', 'Jan'], 'amount': [1, 2]})).index)", expect: "['N', 'S']", name: 'rows in order' },
        { call: "list(grid(pd.DataFrame({'region': ['N'], 'month': ['Mar'], 'amount': [7]})).columns)", expect: "['Mar']", hidden: true },
        { call: "int(grid(pd.DataFrame({'region': ['N', 'N'], 'month': ['Jan', 'Feb'], 'amount': [1, 2]})).values.sum())", expect: '3', hidden: true, name: 'nothing lost or double-counted' }],
      hint: 'groupby two keys, sum, then unstack the month level into columns — or pivot_table with aggfunc="sum" and fill_value=0.',
      solution: "import pandas as pd\n\ndef grid(df):\n    totals = df.groupby(['region', 'month'])['amount'].sum()\n    return totals.unstack(fill_value=0).sort_index().sort_index(axis=1)\n",
      walk: "Grouping by two keys gives a multi-index; `unstack` lifts the inner level out into columns, and `fill_value=0` handles the combinations that never happened. Sorting both axes makes the output stable — without it the order depends on what appeared in the data, and a test that compares columns will fail intermittently.",
      complexity: 'O(n) to group, plus the sort of the distinct keys.' },

    { id: 'pt-pd-vectorise', group: 'pandas', lvl: 2,
      title: 'Take the loop out',
      fn: 'net_totals', needs: NEEDS, setup: SETUP, noMock: true, budget: 30,
      brief: 'Given a DataFrame with "price", "quantity" and "discount" (a fraction between 0 and 1), return a Series of price × quantity × (1 - discount), rounded to 2 decimal places.\n\nA missing discount counts as no discount. Write it without looping over the rows.',
      sig: 'def net_totals(df: pd.DataFrame) -> pd.Series',
      starter: 'import pandas as pd\n\ndef net_totals(df):\n    # your code here\n    pass\n',
      examples: [
        { in: 'list(net_totals(df))', out: '[18.0] for price 10, quantity 2, discount 0.1' }],
      tests: [
        { call: "list(net_totals(pd.DataFrame({'price': [10.0], 'quantity': [2], 'discount': [0.1]})))", expect: '[18.0]' },
        { call: "list(net_totals(pd.DataFrame({'price': [10.0], 'quantity': [2], 'discount': [np.nan]})))", expect: '[20.0]', name: 'a missing discount is no discount' },
        { call: "list(net_totals(pd.DataFrame({'price': [], 'quantity': [], 'discount': []})))", expect: '[]', name: 'an empty frame' },
        { call: "list(net_totals(pd.DataFrame({'price': [3.333], 'quantity': [3], 'discount': [0.0]})))", expect: '[10.0]', hidden: true, name: 'rounded to 2dp' },
        { call: "len(net_totals(pd.DataFrame({'price': [1.0] * 50000, 'quantity': [2] * 50000, 'discount': [0.5] * 50000})))", expect: '50000', hidden: true, name: 'must be vectorised' }],
      hint: "Fill the missing discounts with 0 first, then multiply the three columns together and round the result.",
      solution: "import pandas as pd\n\ndef net_totals(df):\n    discount = df['discount'].fillna(0)\n    return (df['price'] * df['quantity'] * (1 - discount)).round(2)\n",
      complexity: 'O(n), and it runs in C rather than in Python.',
      walk: "Three columns multiplied together is one vectorised expression — no apply, no loop. `fillna(0)` before the arithmetic is what stops a single missing discount turning the whole row into NaN, which is the bug this question is really about. `.round(2)` at the end rounds the RESULT, which is the only place rounding belongs." }
  );
})();
