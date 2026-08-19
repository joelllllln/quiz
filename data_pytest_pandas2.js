/* Python coding test — problem bank 9: pandas, the feature-engineering half.
   Deriving columns, encoding, binning, lags and a wide summary — the questions a
   data-analyst take-home asks once it is past filtering and grouping. */
(function () {
  window.PYTESTS = window.PYTESTS || [];
  var NEEDS = ['pandas', 'numpy'];
  var SETUP = 'import pandas as pd\nimport numpy as np\n';

  window.PYTESTS.push(

    { id: 'pt-pd-features', group: 'pandas', lvl: 2,
      title: 'Derive two features',
      fn: 'add_features', needs: NEEDS, setup: SETUP, noMock: true, budget: 30,
      brief: 'Given a DataFrame with "spend", "visits" and a datetime column "date", return a copy with two new columns:\n\n· "spend_per_visit" — spend divided by visits, with a divide by zero giving NaN rather than infinity\n· "is_weekend" — 1 when the date falls on a Saturday or Sunday, otherwise 0',
      sig: 'def add_features(df: pd.DataFrame) -> pd.DataFrame',
      starter: "import pandas as pd\nimport numpy as np\n\ndef add_features(df):\n    # your code here\n    pass\n",
      examples: [{ in: 'add_features(df)', out: 'the frame plus spend_per_visit and is_weekend' }],
      tests: [
        { call: "list(add_features(pd.DataFrame({'spend': [10.0], 'visits': [2], 'date': pd.to_datetime(['2024-01-06'])}))['spend_per_visit'])", expect: '[5.0]' },
        { call: "int(add_features(pd.DataFrame({'spend': [10.0], 'visits': [2], 'date': pd.to_datetime(['2024-01-06'])}))['is_weekend'].iloc[0])", expect: '1', name: 'a Saturday' },
        { call: "int(add_features(pd.DataFrame({'spend': [10.0], 'visits': [2], 'date': pd.to_datetime(['2024-01-08'])}))['is_weekend'].iloc[0])", expect: '0', name: 'a Monday' },
        { call: "bool(add_features(pd.DataFrame({'spend': [10.0], 'visits': [0], 'date': pd.to_datetime(['2024-01-08'])}))['spend_per_visit'].isna().iloc[0])", expect: 'True', hidden: true, name: 'zero visits must give NaN, not inf' },
        { call: "'spend_per_visit' in pd.DataFrame({'spend': [1.0], 'visits': [1], 'date': pd.to_datetime(['2024-01-01'])}).pipe(lambda d: (add_features(d), d)[1]).columns", expect: 'False', hidden: true, name: 'the original is untouched' }],
      hint: 'Replace the zero divisor with np.nan before dividing, and .dt.dayofweek >= 5 marks the weekend.',
      solution: "import pandas as pd\nimport numpy as np\n\ndef add_features(df):\n    out = df.copy()\n    out['spend_per_visit'] = out['spend'] / out['visits'].replace(0, np.nan)\n    out['is_weekend'] = (out['date'].dt.dayofweek >= 5).astype(int)\n    return out\n",
      walk: 'pandas returns inf rather than raising on a divide by zero, and inf will pass silently through your cleaning and break the model instead. Replacing the divisor with NaN keeps the failure visible. Monday is 0, so >= 5 is the weekend.',
      complexity: 'O(n).' },

    { id: 'pt-pd-encode', group: 'pandas', lvl: 2,
      title: 'One-hot encode a column',
      fn: 'encode', needs: NEEDS, setup: SETUP, noMock: true, budget: 30,
      brief: 'One-hot encode the "city" column of a DataFrame, dropping the first level, and return the resulting frame.\n\nEvery other column must survive unchanged.',
      sig: 'def encode(df: pd.DataFrame) -> pd.DataFrame',
      starter: "import pandas as pd\n\ndef encode(df):\n    # your code here\n    pass\n",
      examples: [{ in: "encode(df) with cities ['L', 'M']", out: "columns: amount, city_M" }],
      tests: [
        { call: "sorted(encode(pd.DataFrame({'amount': [1, 2], 'city': ['L', 'M']})).columns)", expect: "['amount', 'city_M']" },
        { call: "len(encode(pd.DataFrame({'amount': [1, 2], 'city': ['L', 'M']})))", expect: '2', name: 'no rows lost' },
        { call: "int(encode(pd.DataFrame({'amount': [1, 2], 'city': ['L', 'M']}))['city_M'].sum())", expect: '1' },
        { call: "sorted(encode(pd.DataFrame({'amount': [1], 'city': ['L']})).columns)", expect: "['amount']", hidden: true, name: 'one level leaves no dummy at all' },
        { call: "len(sorted(encode(pd.DataFrame({'amount': [1,2,3], 'city': ['A','B','C']})).columns))", expect: '3', hidden: true }],
      hint: 'pd.get_dummies with columns= and drop_first=True does the whole thing.',
      solution: "import pandas as pd\n\ndef encode(df):\n    return pd.get_dummies(df, columns=['city'], drop_first=True)\n",
      walk: 'drop_first removes one level because it is implied by the others — necessary for a linear model, harmless for a tree. Note the hidden case: a column with a single level produces no dummy columns at all, which is correct and surprises people.',
      complexity: 'O(n · k) for k distinct cities.' },

    { id: 'pt-pd-bin', group: 'pandas', lvl: 2,
      title: 'Band the ages',
      fn: 'age_bands', needs: NEEDS, setup: SETUP, noMock: true, budget: 30,
      brief: 'Band the "age" column into child (0–18), adult (18–65) and senior (65–120), and return a dict of band → how many rows fall in it.\n\nBands are open at the left and closed at the right, which is the pandas default: an age of exactly 18 is a child.',
      sig: 'def age_bands(df: pd.DataFrame) -> dict',
      starter: "import pandas as pd\n\ndef age_bands(df):\n    # your code here\n    pass\n",
      examples: [{ in: 'age_bands(df)', out: "{'child': 1, 'adult': 2, 'senior': 0}" }],
      tests: [
        { call: "age_bands(pd.DataFrame({'age': [10, 30, 40]}))", expect: "{'child': 1, 'adult': 2, 'senior': 0}" },
        { call: "age_bands(pd.DataFrame({'age': [18]}))['child']", expect: '1', name: 'the boundary belongs to the lower band' },
        { call: "age_bands(pd.DataFrame({'age': []}))", expect: "{'child': 0, 'adult': 0, 'senior': 0}", hidden: true },
        { call: "age_bands(pd.DataFrame({'age': [70, 80]}))['senior']", expect: '2', hidden: true },
        { call: "sum(age_bands(pd.DataFrame({'age': [5, 25, 75]})).values())", expect: '3', hidden: true, name: 'every row lands somewhere' }],
      hint: 'pd.cut with bins and labels, then value_counts — but make sure a band with no rows still appears with a zero.',
      solution: "import pandas as pd\n\ndef age_bands(df):\n    labels = ['child', 'adult', 'senior']\n    bands = pd.cut(df['age'], bins=[0, 18, 65, 120], labels=labels)\n    counts = bands.value_counts()\n    return {label: int(counts.get(label, 0)) for label in labels}\n",
      walk: 'Rebuilding the dict from the label list is what guarantees an empty band still reports 0 — value_counts on a categorical usually keeps every category, but relying on that is how a report ends up silently missing a row. int() converts out of NumPy\'s integer type so the dict compares cleanly.',
      complexity: 'O(n).' },

    { id: 'pt-pd-lag', group: 'pandas', lvl: 3,
      title: 'The previous value per customer',
      fn: 'add_lag', needs: NEEDS, setup: SETUP, noMock: true, budget: 30,
      brief: 'Given a DataFrame with "customer_id", "date" and "value", return a copy sorted by customer and date with a new column "prev_value": that customer\'s previous value, or NaN for their first row.\n\nOne customer\'s history must never leak into another\'s.',
      sig: 'def add_lag(df: pd.DataFrame) -> pd.DataFrame',
      starter: "import pandas as pd\n\ndef add_lag(df):\n    # your code here\n    pass\n",
      examples: [{ in: 'add_lag(df)', out: 'the frame plus prev_value' }],
      tests: [
        { call: "list(add_lag(pd.DataFrame({'customer_id': [1, 1], 'date': pd.to_datetime(['2024-01-01', '2024-02-01']), 'value': [10.0, 20.0]}))['prev_value'].fillna(-1))", expect: '[-1.0, 10.0]' },
        { call: "bool(add_lag(pd.DataFrame({'customer_id': [1, 2], 'date': pd.to_datetime(['2024-01-01', '2024-02-01']), 'value': [10.0, 20.0]}))['prev_value'].isna().all())", expect: 'True', name: 'no leaking between customers' },
        { call: "len(add_lag(pd.DataFrame({'customer_id': [1], 'date': pd.to_datetime(['2024-01-01']), 'value': [5.0]})))", expect: '1' },
        { call: "list(add_lag(pd.DataFrame({'customer_id': [1, 1], 'date': pd.to_datetime(['2024-02-01', '2024-01-01']), 'value': [20.0, 10.0]}))['prev_value'].fillna(-1))", expect: '[-1.0, 10.0]', hidden: true, name: 'unsorted input must still work' },
        { call: "int(add_lag(pd.DataFrame({'customer_id': [1, 1, 2], 'date': pd.to_datetime(['2024-01-01','2024-02-01','2024-01-01']), 'value': [1.0, 2.0, 3.0]}))['prev_value'].notna().sum())", expect: '1', hidden: true }],
      hint: 'Sort first, then groupby(...)[col].shift(1). Shifting without sorting trusts whatever order the file happened to arrive in.',
      solution: "import pandas as pd\n\ndef add_lag(df):\n    out = df.sort_values(['customer_id', 'date']).copy()\n    out['prev_value'] = out.groupby('customer_id')['value'].shift(1)\n    return out\n",
      walk: 'Two things make this correct: sorting inside the function rather than trusting the caller, and shifting WITHIN the group so the first row of each customer gets NaN instead of the last row of the previous one. That second mistake is a genuine leak, and it inflates a model\'s score without ever looking wrong.',
      complexity: 'O(n log n) for the sort.' },

    { id: 'pt-pd-monthly', group: 'pandas', lvl: 3,
      title: 'Monthly totals per region',
      fn: 'monthly_totals', needs: NEEDS, setup: SETUP, noMock: true, budget: 30,
      brief: 'Given "date", "region" and "amount", return a wide table of total amount with the month (as a "YYYY-MM" string) down the side and the region across the top.\n\nA month and region with no sales should read 0.',
      sig: 'def monthly_totals(df: pd.DataFrame) -> pd.DataFrame',
      starter: "import pandas as pd\n\ndef monthly_totals(df):\n    # your code here\n    pass\n",
      examples: [{ in: 'monthly_totals(df)', out: 'rows 2024-01, 2024-02; columns N, S' }],
      tests: [
        { call: "list(monthly_totals(pd.DataFrame({'date': pd.to_datetime(['2024-01-05','2024-02-05']), 'region': ['N','N'], 'amount': [1, 2]})).index)", expect: "['2024-01', '2024-02']" },
        { call: "list(monthly_totals(pd.DataFrame({'date': pd.to_datetime(['2024-01-05','2024-01-06']), 'region': ['N','S'], 'amount': [1, 2]})).columns)", expect: "['N', 'S']" },
        { call: "float(monthly_totals(pd.DataFrame({'date': pd.to_datetime(['2024-01-05','2024-01-06']), 'region': ['N','N'], 'amount': [1, 2]})).iloc[0, 0])", expect: '3.0', name: 'the month is totalled' },
        { call: "float(monthly_totals(pd.DataFrame({'date': pd.to_datetime(['2024-01-05','2024-02-06']), 'region': ['N','S'], 'amount': [1, 2]})).iloc[0, 1])", expect: '0.0', hidden: true, name: 'empty combinations read zero' },
        { call: "monthly_totals(pd.DataFrame({'date': pd.to_datetime(['2024-01-05']), 'region': ['N'], 'amount': [7]})).shape", expect: '(1, 1)', hidden: true }],
      hint: "Make a month column with .dt.strftime('%Y-%m'), then pivot_table with aggfunc='sum' and fill_value=0.",
      solution: "import pandas as pd\n\ndef monthly_totals(df):\n    out = df.copy()\n    out['month'] = out['date'].dt.strftime('%Y-%m')\n    return out.pivot_table(index='month', columns='region', values='amount', aggfunc='sum', fill_value=0)\n",
      walk: "The YYYY-MM string sorts correctly as text, which is why that format is worth preferring over 'Jan 2024'. fill_value=0 is what turns the missing combinations into zeros — without it they are NaN, and a report full of NaN is one nobody trusts.",
      complexity: 'O(n).' },

    { id: 'pt-pd-latest', group: 'pandas', lvl: 3,
      title: 'One row per customer, the latest',
      fn: 'latest_rows', needs: NEEDS, setup: SETUP, noMock: true, budget: 30,
      brief: 'Given "customer_id", "date" and "status", return one row per customer — their most recent one — with the index renumbered from 0.\n\nIf two rows share the newest date, keep the one that appears later in the frame.',
      sig: 'def latest_rows(df: pd.DataFrame) -> pd.DataFrame',
      starter: "import pandas as pd\n\ndef latest_rows(df):\n    # your code here\n    pass\n",
      examples: [{ in: 'latest_rows(df)', out: 'one row per customer' }],
      tests: [
        { call: "len(latest_rows(pd.DataFrame({'customer_id': [1, 1, 2], 'date': pd.to_datetime(['2024-01-01','2024-06-01','2024-01-01']), 'status': ['a','b','c']})))", expect: '2' },
        { call: "list(latest_rows(pd.DataFrame({'customer_id': [1, 1], 'date': pd.to_datetime(['2024-01-01','2024-06-01']), 'status': ['a','b']}))['status'])", expect: "['b']", name: 'the newest wins' },
        { call: "list(latest_rows(pd.DataFrame({'customer_id': [1, 1], 'date': pd.to_datetime(['2024-01-01','2024-01-01']), 'status': ['a','b']}))['status'])", expect: "['b']", name: 'a tie keeps the later row' },
        { call: "list(latest_rows(pd.DataFrame({'customer_id': [2, 1], 'date': pd.to_datetime(['2024-01-01','2024-01-01']), 'status': ['x','y']})).index)", expect: '[0, 1]', hidden: true, name: 'the index is renumbered' },
        { call: "len(latest_rows(pd.DataFrame({'customer_id': [], 'date': pd.to_datetime([]), 'status': []})))", expect: '0', hidden: true }],
      hint: "Sort by date, then drop_duplicates on the customer keeping the last — and reset_index(drop=True) at the end.",
      solution: "import pandas as pd\n\ndef latest_rows(df):\n    out = df.sort_values('date', kind='stable')\n    out = out.drop_duplicates(subset=['customer_id'], keep='last')\n    return out.reset_index(drop=True)\n",
      walk: "kind='stable' is the detail that makes the tie-break work: a stable sort leaves equal dates in their original order, so keep='last' then picks the row that came later in the frame. reset_index(drop=True) throws away the old index rather than leaving it as a column.",
      complexity: 'O(n log n).' }
  );
})();
