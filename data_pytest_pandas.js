/* Python coding test — problem bank 4: pandas.
   Data-analyst and data-scientist tests almost always include a pandas section.
   These need the pandas package, which the runner downloads on first use — it is a
   big download, so they are grouped together and excluded from the timed mocks. */
(function () {
  window.PYTESTS = window.PYTESTS || [];
  var NEEDS = ['pandas', 'numpy'];
  var SETUP = 'import pandas as pd\nimport numpy as np\n';

  window.PYTESTS.push(

    { id: 'pt-pd-filter', group: 'pandas', lvl: 1,
      title: 'Filter and select',
      fn: 'big_orders', needs: NEEDS, setup: SETUP, noMock: true, budget: 30,
      brief: 'Given a DataFrame with columns "customer", "amount" and "region", return a DataFrame holding only the rows where amount is over 100, with just the "customer" and "amount" columns, in that order.\n\nDo not change the original frame.',
      sig: 'def big_orders(df: pd.DataFrame) -> pd.DataFrame',
      starter: "import pandas as pd\n\ndef big_orders(df):\n    # your code here\n    pass\n",
      examples: [
        { in: "big_orders(df) where df has amounts [50, 150]", out: "one row, columns ['customer', 'amount']" }],
      tests: [
        { call: "list(big_orders(pd.DataFrame({'customer': ['a', 'b'], 'amount': [50, 150], 'region': ['N', 'S']})).columns)", expect: "['customer', 'amount']" },
        { call: "len(big_orders(pd.DataFrame({'customer': ['a', 'b'], 'amount': [50, 150], 'region': ['N', 'S']})))", expect: '1' },
        { call: "big_orders(pd.DataFrame({'customer': ['a'], 'amount': [100], 'region': ['N']})).empty", expect: 'True', name: 'over 100, not 100 or more' },
        { call: "big_orders(pd.DataFrame({'customer': [], 'amount': [], 'region': []})).empty", expect: 'True', hidden: true },
        { call: "list(big_orders(pd.DataFrame({'customer': ['a','b','c'], 'amount': [500, 20, 300], 'region': ['N','S','E']}))['customer'])", expect: "['a', 'c']", hidden: true }],
      hint: 'A boolean mask inside the brackets filters rows; a list of column names selects columns.',
      solution: "import pandas as pd\n\ndef big_orders(df):\n    return df.loc[df['amount'] > 100, ['customer', 'amount']]\n",
      walk: "One .loc does both halves: the mask picks the rows, the list picks the columns in the order you write them. Chaining df[df['amount'] > 100][['customer', 'amount']] gives the same answer but goes through an intermediate frame and can raise SettingWithCopyWarning if you later assign to it.",
      complexity: 'O(n) over the rows.' },

    { id: 'pt-pd-newcol', group: 'pandas', lvl: 1,
      title: 'Add a computed column',
      fn: 'add_total', needs: NEEDS, setup: SETUP, noMock: true, budget: 30,
      brief: 'Given a DataFrame with "price" and "quantity", return a copy with a new column "total" equal to price × quantity, rounded to 2 decimal places.\n\nThe frame you are given must not be modified.',
      sig: 'def add_total(df: pd.DataFrame) -> pd.DataFrame',
      starter: "import pandas as pd\n\ndef add_total(df):\n    # your code here\n    pass\n",
      examples: [
        { in: "add_total(df)['total']", out: '[8.0, 15.0] for prices [2, 3] and quantities [4, 5]' }],
      tests: [
        { call: "list(add_total(pd.DataFrame({'price': [2.0, 3.0], 'quantity': [4, 5]}))['total'])", expect: '[8.0, 15.0]' },
        { call: "list(add_total(pd.DataFrame({'price': [1.005], 'quantity': [1]}))['total'])", expect: '[1.0]', name: 'rounded to 2dp' },
        { call: "'total' in pd.DataFrame({'price': [1.0], 'quantity': [1]}).pipe(lambda d: (add_total(d), d)[1]).columns", expect: 'False', name: 'the original is untouched' },
        { call: "len(add_total(pd.DataFrame({'price': [], 'quantity': []})))", expect: '0', hidden: true },
        { call: "list(add_total(pd.DataFrame({'price': [2.5, 0.0], 'quantity': [2, 9]}))['total'])", expect: '[5.0, 0.0]', hidden: true }],
      hint: 'Copy the frame first, then assign the new column — or use .assign(), which copies for you.',
      solution: "import pandas as pd\n\ndef add_total(df):\n    return df.assign(total=(df['price'] * df['quantity']).round(2))\n",
      walk: "The multiplication is vectorised — no loop, and it aligns on the index automatically. .assign() returns a NEW frame, which is what keeps the caller's copy clean; writing df['total'] = ... would modify the frame that was passed in, and that side effect is what this question is actually testing.",
      complexity: 'O(n) over the rows.' },

    { id: 'pt-pd-groupby', group: 'pandas', lvl: 2,
      title: 'Revenue by region',
      fn: 'revenue_by_region', needs: NEEDS, setup: SETUP, noMock: true, budget: 30,
      brief: 'Given a DataFrame with "region" and "amount", return a dict of region → total amount, sorted so the biggest region comes first.\n\n(Python dicts keep their insertion order, so the order you build it in is the order it keeps.)',
      sig: 'def revenue_by_region(df: pd.DataFrame) -> dict',
      starter: "import pandas as pd\n\ndef revenue_by_region(df):\n    # your code here\n    pass\n",
      examples: [
        { in: "revenue_by_region(df)", out: "{'S': 30, 'N': 12}" }],
      tests: [
        { call: "revenue_by_region(pd.DataFrame({'region': ['N', 'S', 'N'], 'amount': [10, 30, 2]}))", expect: "{'S': 30, 'N': 12}" },
        { call: "list(revenue_by_region(pd.DataFrame({'region': ['A', 'B'], 'amount': [1, 99]})))[0]", expect: "'B'", name: 'biggest first' },
        { call: "revenue_by_region(pd.DataFrame({'region': [], 'amount': []}))", expect: '{}' },
        { call: "revenue_by_region(pd.DataFrame({'region': ['X'], 'amount': [5]}))", expect: "{'X': 5}", hidden: true },
        { call: "len(revenue_by_region(pd.DataFrame({'region': list('abcabc'), 'amount': [1]*6})))", expect: '3', hidden: true }],
      hint: 'groupby(...)[col].sum() gives a Series; sort it, then .to_dict().',
      solution: "import pandas as pd\n\ndef revenue_by_region(df):\n    totals = df.groupby('region')['amount'].sum().sort_values(ascending=False)\n    return totals.to_dict()\n",
      walk: "Group, aggregate, sort, convert — four small steps in one chain. .to_dict() on a Series gives index → value, which is exactly the shape asked for. On an empty frame the groupby returns an empty Series and the dict comes out empty, so no special case is needed.",
      complexity: 'O(n) to group, O(k log k) to sort k regions.' },

    { id: 'pt-pd-missing', group: 'pandas', lvl: 2,
      title: 'Fill missing ages by group',
      fn: 'fill_ages', needs: NEEDS, setup: SETUP, noMock: true, budget: 30,
      brief: 'Given a DataFrame with "city" and "age", where some ages are missing, return a copy where each missing age is filled with the MEDIAN age of that row\'s city.\n\nIf a city has no known ages at all, leave its rows missing.',
      sig: 'def fill_ages(df: pd.DataFrame) -> pd.DataFrame',
      starter: "import pandas as pd\n\ndef fill_ages(df):\n    # your code here\n    pass\n",
      examples: [
        { in: "fill_ages(df)['age']", out: '[10, 20, 15] — the missing London age becomes the London median' }],
      tests: [
        { call: "list(fill_ages(pd.DataFrame({'city': ['L', 'L', 'L'], 'age': [10.0, 20.0, None]}))['age'])", expect: '[10.0, 20.0, 15.0]' },
        { call: "list(fill_ages(pd.DataFrame({'city': ['L', 'M'], 'age': [10.0, None]}))['age'].isna())", expect: '[False, True]', name: 'a city with nothing to learn from' },
        { call: "len(fill_ages(pd.DataFrame({'city': ['L'], 'age': [7.0]})))", expect: '1' },
        { call: "list(fill_ages(pd.DataFrame({'city': ['A','A','B','B'], 'age': [2.0, None, 8.0, None]}))['age'])", expect: '[2.0, 2.0, 8.0, 8.0]', hidden: true },
        { call: "float(fill_ages(pd.DataFrame({'city': ['A','A','A'], 'age': [1.0, 3.0, None]}))['age'].iloc[2])", expect: '2.0', hidden: true }],
      hint: 'groupby(...).transform returns one value per ROW, so it lines straight back up with the frame.',
      solution: "import pandas as pd\n\ndef fill_ages(df):\n    out = df.copy()\n    medians = out.groupby('city')['age'].transform('median')\n    out['age'] = out['age'].fillna(medians)\n    return out\n",
      walk: "transform is the whole answer: .median() would give one row per city, which no longer aligns with the frame, while .transform('median') broadcasts each city's median back across its own rows. A city with only missing ages gets NaN as its median, and filling with NaN leaves the value missing — which is exactly the behaviour the brief asks for.",
      complexity: 'O(n) over the rows.' },

    { id: 'pt-pd-merge', group: 'pandas', lvl: 2,
      title: 'Join orders to customers',
      fn: 'attach_names', needs: NEEDS, setup: SETUP, noMock: true, budget: 30,
      brief: 'Given orders (columns "customer_id", "amount") and customers (columns "id", "name"), return the orders with a "name" column attached.\n\nKeep every order, even one whose customer is missing from the customer list — its name should come back as NaN.',
      sig: 'def attach_names(orders: pd.DataFrame, customers: pd.DataFrame) -> pd.DataFrame',
      starter: "import pandas as pd\n\ndef attach_names(orders, customers):\n    # your code here\n    pass\n",
      examples: [
        { in: 'attach_names(orders, customers)', out: 'orders plus a "name" column' }],
      tests: [
        { call: "list(attach_names(pd.DataFrame({'customer_id': [1, 2], 'amount': [5, 6]}), pd.DataFrame({'id': [1, 2], 'name': ['Ann', 'Bob']}))['name'])", expect: "['Ann', 'Bob']" },
        { call: "len(attach_names(pd.DataFrame({'customer_id': [1, 9], 'amount': [5, 6]}), pd.DataFrame({'id': [1], 'name': ['Ann']})))", expect: '2', name: 'unmatched orders are kept' },
        { call: "bool(attach_names(pd.DataFrame({'customer_id': [9], 'amount': [5]}), pd.DataFrame({'id': [1], 'name': ['Ann']}))['name'].isna().all())", expect: 'True' },
        { call: "'amount' in attach_names(pd.DataFrame({'customer_id': [1], 'amount': [5]}), pd.DataFrame({'id': [1], 'name': ['Ann']})).columns", expect: 'True', hidden: true },
        { call: "int(attach_names(pd.DataFrame({'customer_id': [1, 1], 'amount': [5, 7]}), pd.DataFrame({'id': [1], 'name': ['Ann']}))['amount'].sum())", expect: '12', hidden: true, name: 'no rows duplicated' }],
      hint: 'A left merge keeps every row of the left frame. The key has a different name on each side.',
      solution: "import pandas as pd\n\ndef attach_names(orders, customers):\n    return orders.merge(customers, left_on='customer_id', right_on='id', how='left')\n",
      walk: "how='left' is what keeps the unmatched orders — the default inner join would silently drop them, and silently losing rows in a join is one of the most expensive mistakes in this job. left_on / right_on handle the differently-named keys. Dropping the redundant 'id' column afterwards would be tidier still.",
      complexity: 'O(n + m) with a hash join.' },

    { id: 'pt-pd-topn', group: 'pandas', lvl: 3,
      title: 'Top seller in each region',
      fn: 'top_per_region', needs: NEEDS, setup: SETUP, noMock: true, budget: 30,
      brief: 'Given a DataFrame with "region", "seller" and "sales", return a dict of region → the seller with the highest sales in that region.\n\nAssume no ties.',
      sig: 'def top_per_region(df: pd.DataFrame) -> dict',
      starter: "import pandas as pd\n\ndef top_per_region(df):\n    # your code here\n    pass\n",
      examples: [
        { in: 'top_per_region(df)', out: "{'N': 'ann', 'S': 'cat'}" }],
      tests: [
        { call: "top_per_region(pd.DataFrame({'region': ['N','N','S'], 'seller': ['ann','bob','cat'], 'sales': [9, 3, 4]}))", expect: "{'N': 'ann', 'S': 'cat'}" },
        { call: "top_per_region(pd.DataFrame({'region': ['E'], 'seller': ['dee'], 'sales': [1]}))", expect: "{'E': 'dee'}" },
        { call: "len(top_per_region(pd.DataFrame({'region': ['A','B','C'], 'seller': ['x','y','z'], 'sales': [1,2,3]})))", expect: '3' },
        { call: "top_per_region(pd.DataFrame({'region': ['N','N'], 'seller': ['a','b'], 'sales': [1, 100]}))", expect: "{'N': 'b'}", hidden: true },
        { call: "top_per_region(pd.DataFrame({'region': ['N','S','N','S'], 'seller': ['a','b','c','d'], 'sales': [5, 6, 7, 2]}))", expect: "{'N': 'c', 'S': 'b'}", hidden: true }],
      hint: 'groupby(...)["sales"].idxmax() gives the index label of each winning row. Then look those rows up.',
      solution: "import pandas as pd\n\ndef top_per_region(df):\n    winners = df.loc[df.groupby('region')['sales'].idxmax()]\n    return dict(zip(winners['region'], winners['seller']))\n",
      walk: "idxmax on a grouped Series returns the index LABEL of each group's maximum, so df.loc[...] pulls back those whole rows in one go. Sorting by sales and taking the last row per group works too, but does more work. dict(zip(...)) is the neat way to turn two columns into a mapping.",
      complexity: 'O(n) to group, plus the lookup.' },

    { id: 'pt-pd-clean', group: 'pandas', lvl: 2,
      title: 'Tidy the column names',
      fn: 'tidy_columns', needs: NEEDS, setup: SETUP, noMock: true, budget: 30,
      brief: 'Return a copy of the DataFrame whose column names are stripped of surrounding whitespace, lowercased, and have inner spaces replaced with underscores.\n\n" Customer Name " becomes "customer_name".',
      sig: 'def tidy_columns(df: pd.DataFrame) -> pd.DataFrame',
      starter: "import pandas as pd\n\ndef tidy_columns(df):\n    # your code here\n    pass\n",
      examples: [
        { in: "tidy_columns(df).columns", out: "['customer_name', 'total']" }],
      tests: [
        { call: "list(tidy_columns(pd.DataFrame({' Customer Name ': [1], 'TOTAL': [2]})).columns)", expect: "['customer_name', 'total']" },
        { call: "list(tidy_columns(pd.DataFrame({'a': [1]})).columns)", expect: "['a']", name: 'already tidy' },
        { call: "int(tidy_columns(pd.DataFrame({' X ': [7]}))['x'].iloc[0])", expect: '7', name: 'the data comes along' },
        { call: "list(tidy_columns(pd.DataFrame({'One  Two': [1]})).columns)", expect: "['one__two']", hidden: true, name: 'each space becomes an underscore' },
        { call: "list(pd.DataFrame({' A ': [1]}).pipe(lambda d: (tidy_columns(d), d)[1]).columns)", expect: "[' A ']", hidden: true, name: 'the original is untouched' }],
      hint: 'df.columns has a .str accessor, exactly like a text column.',
      solution: "import pandas as pd\n\ndef tidy_columns(df):\n    out = df.copy()\n    out.columns = out.columns.str.strip().str.lower().str.replace(' ', '_')\n    return out\n",
      walk: "The order matters: strip the ends BEFORE replacing spaces, or the outer spaces become underscores too. Working on a copy keeps the caller's frame intact. Untidy headers — trailing spaces especially — are the usual cause of a KeyError on a column you can plainly see in the output.",
      complexity: 'O(k) in the number of columns.' },

    { id: 'pt-pd-summary', group: 'pandas', lvl: 3,
      title: 'Summary table',
      fn: 'summarise', needs: NEEDS, setup: SETUP, noMock: true, budget: 30,
      brief: 'Given a DataFrame with "region" and "amount", return a DataFrame indexed by region with two columns: "orders" (how many rows) and "total" (the sum of amount), sorted by total, biggest first.',
      sig: 'def summarise(df: pd.DataFrame) -> pd.DataFrame',
      starter: "import pandas as pd\n\ndef summarise(df):\n    # your code here\n    pass\n",
      examples: [
        { in: 'summarise(df)', out: 'a two-column table, one row per region' }],
      tests: [
        { call: "list(summarise(pd.DataFrame({'region': ['N','N','S'], 'amount': [1, 2, 10]})).columns)", expect: "['orders', 'total']" },
        { call: "list(summarise(pd.DataFrame({'region': ['N','N','S'], 'amount': [1, 2, 10]})).index)", expect: "['S', 'N']", name: 'sorted by total' },
        { call: "int(summarise(pd.DataFrame({'region': ['N','N'], 'amount': [1, 2]}))['orders'].iloc[0])", expect: '2' },
        { call: "int(summarise(pd.DataFrame({'region': ['N','N'], 'amount': [1, 2]}))['total'].iloc[0])", expect: '3', hidden: true },
        { call: "len(summarise(pd.DataFrame({'region': ['A','B','C'], 'amount': [1,2,3]})))", expect: '3', hidden: true }],
      hint: 'Named aggregation gives you the column names directly: .agg(orders=("amount", "size"), total=("amount", "sum")).',
      solution: "import pandas as pd\n\ndef summarise(df):\n    out = df.groupby('region').agg(orders=('amount', 'size'), total=('amount', 'sum'))\n    return out.sort_values('total', ascending=False)\n",
      walk: "Named aggregation is the modern way to build a summary table: each keyword becomes a column, each value says which column to aggregate and how. It avoids the MultiIndex columns you get from .agg(['size', 'sum']) and the flattening dance that follows. 'size' counts rows including NaN; 'count' would skip missing amounts.",
      complexity: 'O(n) to group, O(k log k) to sort.' }
  );
})();
