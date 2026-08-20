/* The course, stages 02–04 — working with data, machine learning, and sitting the test.
   Everything here assumes stage 01: you can write a loop, a function and a dict. */
(function () {
  window.COURSE = window.COURSE || { stages: [] };

  window.COURSE.stages.push({
    key: 'data', no: '04', name: 'Working with data',
    blurb: 'NumPy and pandas: loading a file, cleaning it, grouping it, joining it, and drawing it.',
    units: [

      { key: 'd1', name: 'NumPy: arrays and vectorised thinking',
        blurb: 'One type, one block of memory, no loops.',
        needs: 'lists, loops',
        steps: [
          { t: 'read', title: 'Why not just use a list?', body: [
            'A Python list can hold anything, which makes it flexible and slow. A **NumPy array** holds one type in one block of memory, which makes it rigid and fast — and lets you do arithmetic on the whole thing at once:',
            ['code', "import numpy as np\n\na = np.array([1, 2, 3])\na * 2          # array([2, 4, 6])   — every element\na + a          # array([2, 4, 6])   — elementwise\n[1, 2, 3] * 2  # [1, 2, 3, 1, 2, 3]  — a list REPEATS instead", 'That difference is the whole reason NumPy exists. Writing `a * 2` instead of a loop is called **vectorising**, and it runs in C rather than in Python.'],
            'Arrays have a shape, and reshaping is cheap:',
            ['code', "a.shape          # (3,)\na.reshape(3, 1)  # a column\na.reshape(-1, 1) # -1 means: you work out the other side", 'That last one is the exact fix for scikit-learn\'s "Expected 2D array, got 1D array instead".'],
            'Selecting works by condition, not by loop:',
            ['code', "a[a > 1]            # array([2, 3])   — a boolean mask\nnp.where(a > 1, 1, 0)  # array([0, 1, 1]) — vectorised if/else", 'This mask idea is exactly what pandas borrows for filtering rows, so it is worth getting comfortable here first.'],
            'Two gotchas to carry forward: a slice of an array is a **view**, so writing to it changes the original (use `.copy()`); and `np.nan` is never equal to itself, so missing values are tested with `np.isnan`, never with `==`.'
          ] },
          { t: 'quick', title: 'Making and inspecting arrays', groups: ['NumPy · make & inspect arrays'] },
          { t: 'quick', title: 'Indexing and maths', groups: ['NumPy · indexing & maths'] },
          { t: 'quiz', title: 'Array behaviour', ids: ['pq-np-broadcast', 'pq-np-view', 'pq-np-nan', 'pq4-np-axis', 'pq4-np-int-div'] },
          { t: 'problem', id: 'pt-column-means' }
        ] },

      { key: 'd2', name: 'Loading data, and the first look',
        blurb: 'read_csv, head, info, describe — the first five minutes with any file.',
        needs: 'NumPy basics',
        steps: [
          { t: 'read', title: 'The first five minutes with a new dataset', body: [
            'pandas gives you a **DataFrame**: a table with named columns, each column an array of one type. It is the object you will spend most of your working life in.',
            ['code', "import pandas as pd\n\ndf = pd.read_csv('data.csv')", '`read_csv` works out the separator, the header row and the column types for you. Its arguments handle almost every awkward file: `sep`, `header`, `names`, `usecols`, `nrows`, `parse_dates`, `dtype`, `na_values`.'],
            'Then, before anything else, four lines. Always these four:',
            ['code', "df.head()        # what does a row look like?\ndf.shape         # how many rows and columns?\ndf.info()        # what type is each column, and how much is missing?\ndf.describe()    # min, max, mean, quartiles of the numbers", 'Read `describe()` from the outside in: the min and the max are where impossible values live — a negative age, a price of 9999999, a date in 1900.'],
            'Then the two questions that decide how much cleaning you face:',
            ['code', "df.isna().sum()             # how much is missing, per column\ndf['city'].value_counts(dropna=False)   # what values does this column actually take?", '`dropna=False` matters: without it, `value_counts` hides the missing values — which are usually the thing you most need to see.'],
            ['aside', 'Type `df.head()` before you type anything else, every single time. Half the bugs in data work come from believing the file is shaped the way the documentation says.']
          ] },
          { t: 'quick', title: 'Loading and saving', groups: ['pandas · load & save'] },
          { t: 'quick', title: 'The first look', groups: ['pandas · look at the data'] },
          { t: 'problem', id: 'pt-parse-csv' }
        ] },

      { key: 'd3', name: 'Selecting and filtering',
        blurb: 'Columns, rows, loc and iloc, and boolean masks.',
        needs: 'the first look',
        steps: [
          { t: 'read', title: 'Getting at the part you want', body: [
            'Columns come out by name, rows by condition:',
            ['code', "df['age']              # one column — a Series\ndf[['age', 'city']]    # several columns — a DataFrame\ndf[df['age'] > 30]     # the rows where the condition is True", 'One bracket gives a Series, two give a DataFrame. The inner brackets in the second line are a list of names, not a typo.'],
            'The condition inside is a **boolean mask** — one True or False per row, exactly like NumPy:',
            ['code', "mask = df['age'] > 30\ndf[mask & (df['city'] == 'London')]", 'Use `&` and `|`, not `and` and `or`, and bracket each condition — `&` binds tighter than `>` and the brackets are what stop it going wrong.'],
            '`.loc` takes labels and `.iloc` takes positions. `.loc` is the one to reach for, because it does rows and columns in a single, readable step:',
            ['code', "df.loc[df['age'] > 30, ['name', 'age']]   # rows by mask, columns by name\ndf.iloc[0]                                # the first row, by position\ndf.iloc[:5, :3]                           # first 5 rows, first 3 columns"],
            'And it is how you assign safely:',
            ['code', "df.loc[df['age'] > 65, 'status'] = 'senior'", 'Assigning through a filtered copy — `df[df[\'age\'] > 65][\'status\'] = ...` — silently does nothing. That is the SettingWithCopyWarning, and it is telling you the truth.'],
            'For a big set of allowed values, `isin` beats a chain of ORs, and `~` negates a whole mask: `df[~df[\'city\'].isin(bad_cities)]`.'
          ] },
          { t: 'quick', title: 'Selecting columns and rows', groups: ['pandas · select columns & rows'] },
          { t: 'quick', title: 'Filtering rows', groups: ['pandas · filter rows'] },
          { t: 'quick', title: 'Sorting and ranking', groups: ['pandas · sort & rank'] },
          { t: 'quiz', title: 'Views, copies and assignment', ids: ['pq-pd-copy-warning', 'pq4-pd-sort-index'] },
          { t: 'problem', id: 'pt-pd-filter' },
          { t: 'problem', id: 'pt-pd-newcol' }
        ] },

      { key: 'd4', name: 'Cleaning',
        blurb: 'Missing values, wrong types, duplicates and messy text.',
        needs: 'selecting and filtering',
        steps: [
          { t: 'read', title: 'Most of the job', body: [
            'Real data arrives broken. Four kinds of broken, and what to do about each.',
            '**Missing values.** Find them first, decide second:',
            ['code', "df.isna().sum()                          # count per column\ndf.dropna(subset=['email'])              # drop rows missing a key field\ndf['age'].fillna(df['age'].median())     # fill with a sensible value\ndf.groupby('city')['age'].transform('median')  # fill by group", 'Never fill without looking. A column that is 80% missing is telling you something about how the data was collected, and filling it hides that.'],
            '**Wrong types.** A number stored as text sorts alphabetically and will not add up:',
            ['code', "pd.to_numeric(df['price'], errors='coerce')   # bad values become NaN\npd.to_datetime(df['date'])                    # text → real dates\ndf['id'].astype(str)                          # keep leading zeros", "`errors='coerce'` is the rescue for a numeric column polluted by '£3.50' or 'N/A' — it converts what it can and marks the rest missing."],
            '**Duplicates.** Count before you delete:',
            ['code', "df.duplicated().sum()\ndf.drop_duplicates(subset=['customer_id'], keep='last')"],
            '**Messy text.** The `.str` accessor gives you every string method, vectorised:',
            ['code', "df['city'] = df['city'].str.strip().str.title()\ndf.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')", "Trailing spaces in a header are the usual cause of a KeyError on a column you can plainly see. Tidy the column names the moment you load the file."],
            ['aside', 'Write down the row count before and after every cleaning step. A join or a dropna that quietly halves your data is the most expensive mistake in this job, and it never announces itself.']
          ] },
          { t: 'quick', title: 'Missing values', groups: ['pandas · missing values'] },
          { t: 'quick', title: 'Types and conversion', groups: ['pandas · types & conversion'] },
          { t: 'quick', title: 'Duplicates and replacing', groups: ['pandas · duplicates & replace'] },
          { t: 'quick', title: 'Text columns', groups: ['pandas · text columns'] },
          { t: 'quiz', title: 'What pandas does with missing values', ids: ['pq-pd-mean-nan', 'pq-pd-value-counts-na', 'pq4-pd-string-num', 'pq4-pd-astype-int'] },
          { t: 'problem', id: 'pt-pd-missing' },
          { t: 'problem', id: 'pt-pd-clean' },
          { t: 'problem', id: 'pt-clean-records' },
          { t: 'problem', id: 'pt-missing-fill' }
        ] },

      { key: 'd4b', name: 'When pandas surprises you',
        blurb: 'Copies, views, the warning everyone ignores, and the joins that quietly multiply rows.',
        needs: 'selecting and cleaning',
        steps: [
          { t: 'read', title: 'The five surprises', body: [
            '**One: SettingWithCopyWarning.** It appears when you write through something pandas cannot prove is the original frame:',
            ['code', "df[df['age'] > 30]['band'] = 'older'    # may change nothing at all\n\ndf.loc[df['age'] > 30, 'band'] = 'older'   # one .loc call — always correct\nsmall = df[df['age'] > 30].copy()          # or take an explicit copy first", 'Chained brackets are the cause. One `.loc` that does the selecting and the assigning together is the cure.'],
            '**Two: `and` is not `&`.** A Series has no single truth value, so Python\'s `and` raises. Use `&`, `|` and `~`, and bracket every condition.',
            '**Three: NaN is not equal to itself.** Every missing-value test goes through `isna()` and `notna()`, never `== np.nan`.',
            '**Four: a merge can multiply rows.** If the right-hand key is not unique, every match makes a new row:',
            ['code', "before = len(orders)\nmerged = orders.merge(customers, on='customer_id', how='left', indicator=True)\nprint(before, len(merged))\nprint(merged['_merge'].value_counts())", '`indicator=True` adds a `_merge` column telling you which side each row came from — the fastest way to see what failed to match.'],
            '**Five: `inplace=True` is not the saving you think it is.** It returns nothing, saves no memory and is on its way out. Reassign instead: `df = df.dropna()`.',
            ['aside', 'A habit worth keeping: print the shape after every step that could change the row count, or assert it. Most silent data bugs are a row count nobody looked at.']
          ] },
          { t: 'quick', title: 'Gotchas and copies', groups: ['pandas · gotchas & copies'] },
          { t: 'problem', id: 'pt-pd-safe-band' }
        ] },

      { key: 'd5', name: 'Grouping and aggregating',
        blurb: 'Split, apply, combine — the question every stakeholder asks.',
        needs: 'cleaning',
        steps: [
          { t: 'read', title: 'Split, apply, combine', body: [
            'Almost every question you are asked has the shape "X per Y": revenue per region, average score per student, orders per day. That is a **groupby**.',
            ['code', "df.groupby('region')['amount'].sum()", 'Three steps in one line: split the rows by region, apply `sum` to the amount column of each group, combine the answers into one Series indexed by region.'],
            'Add `.reset_index()` to get a normal DataFrame back, or `as_index=False` to skip the step:',
            ['code', "df.groupby('region', as_index=False)['amount'].sum()"],
            'Several aggregations at once, with names you choose:',
            ['code', "df.groupby('region').agg(\n    orders=('amount', 'size'),\n    total=('amount', 'sum'),\n    average=('amount', 'mean'),\n)", 'This is **named aggregation**, and it saves you flattening a MultiIndex afterwards. `size` counts rows including missing values; `count` skips them.'],
            'The distinction that takes a while to click: **agg gives one row per group, transform gives one row per ORIGINAL row.**',
            ['code', "df.groupby('city')['age'].mean()                  # one value per city\ndf.groupby('city')['age'].transform('mean')       # one value per row, repeated", 'Use `transform` whenever the result has to line back up with the frame — filling missing values by group, or computing a within-group z-score.'],
            ['aside', 'groupby silently drops rows whose key is missing. If those rows matter — and they usually do — pass `dropna=False` and see them.']
          ] },
          { t: 'quick', title: 'Group and aggregate', groups: ['pandas · group & aggregate'] },
          { t: 'quick', title: 'Cross-tabs and summaries', groups: ['pandas · cross-tabs & summaries'] },
          { t: 'quiz', title: 'What groupby does with gaps', ids: ['pq-pd-groupby-nan', 'pq4-pd-apply-vs-vector'] },
          { t: 'problem', id: 'pt-pd-groupby' },
          { t: 'problem', id: 'pt-avg-by-key' },
          { t: 'problem', id: 'pt-top-n' },
          { t: 'problem', id: 'pt-pd-summary' },
          { t: 'problem', id: 'pt-pd-monthly' }
        ] },

      { key: 'd5b', name: 'The index, and grouping deeper',
        blurb: 'loc against iloc, multi-indexes, unstack, and getting back to flat columns.',
        needs: 'grouping',
        steps: [
          { t: 'read', title: 'The thing every row is filed under', body: [
            'Every DataFrame has an **index** — the labels down the side. `.loc` works by label, `.iloc` by position, and mixing them up is behind a lot of confusion:',
            ['code', "df.loc['C123']       # the row LABELLED C123\ndf.iloc[2]           # the THIRD row, whatever it is called\ndf.loc[df['age'] > 30, ['name', 'age']]   # mask for rows, names for columns"],
            'Grouping by two keys gives you a **multi-index** — one level per key:',
            ['code', "totals = df.groupby(['region', 'month'])['amount'].sum()\ntotals.loc['North']              # everything in one region\ntotals.xs('May', level='month')  # one month, across regions\ntotals.unstack()                 # months become columns", '`unstack` pivots an index level out into columns; `stack` folds them back. That pair is most of reshaping.'],
            'Nearly always, the last step is to get back to ordinary columns:',
            ['code', "flat = totals.reset_index()\nagg.columns = ['_'.join(c) for c in agg.columns]   # after a multi-function agg()", 'The second line is what you need after `groupby().agg()` with several functions, which produces two-level column names.'],
            'And the one that catches everybody: pandas lines Series up **by index**, not by position:',
            ['code', "a + b     # matched on the index — mismatched labels become NaN", 'If you meant "by position", reset both indexes first.'],
            ['aside', 'A duplicated index makes `.loc` return a frame where you expected a row. `df.index.is_unique` is worth checking whenever a lookup behaves strangely.']
          ] },
          { t: 'quick', title: 'The index and multi-index', groups: ['pandas · the index & multi-index'] },
          { t: 'problem', id: 'pt-pd-region-month' }
        ] },

      { key: 'd6', name: 'Joining and reshaping',
        blurb: 'Merges that do not lose rows, and long versus wide.',
        needs: 'grouping',
        steps: [
          { t: 'read', title: 'Putting two tables together', body: [
            'A **merge** is a join, and the two things to get right are the key and the kind:',
            ['code', "orders.merge(customers, on='customer_id', how='left')", "`how='left'` keeps every order whether or not its customer exists. The default is `inner`, which silently drops the unmatched — and silently losing rows is the mistake that costs the most."],
            'When the key is named differently on each side, say so explicitly:',
            ['code', "orders.merge(customers, left_on='customer_id', right_on='id', how='left')"],
            'Two habits that catch join bugs before they reach a report:',
            ['code', "before = len(orders)\njoined = orders.merge(customers, on='id', how='left', indicator=True)\nprint(before, len(joined))\nprint(joined['_merge'].value_counts())", "`indicator=True` adds a column saying which side each row came from. If the row count went UP, your key is not unique on the right — `validate='one_to_one'` would have raised instead."],
            'Stacking rather than joining is `pd.concat([df1, df2], ignore_index=True)`.',
            '**Reshaping** moves between long and wide:',
            ['code', "df.pivot_table(index='city', columns='product', values='amount', aggfunc='sum')  # long → wide\ndf.melt(id_vars=['id'], var_name='metric', value_name='score')                  # wide → long", 'Wide is for reading; long is for plotting and modelling. Being able to move between them on demand is a genuine skill.']
          ] },
          { t: 'quick', title: 'Combining frames', groups: ['pandas · combine frames'] },
          { t: 'quick', title: 'Reshaping', groups: ['pandas · reshape'] },
          { t: 'quiz', title: 'Alignment and joins', ids: ['pq-pd-index-align'] },
          { t: 'problem', id: 'pt-pd-merge' },
          { t: 'problem', id: 'pt-join-records' },
          { t: 'problem', id: 'pt-pd-topn' },
          { t: 'problem', id: 'pt-pd-latest' }
        ] },

      { key: 'd6b', name: 'Asking the database instead',
        blurb: 'SQL: the same questions you have been asking in pandas, one layer earlier.',
        needs: 'grouping, joining',
        steps: [
          { t: 'read', title: 'The same four questions, in SQL', body: [
            'Most data does not start in a CSV — it starts in a database, and a data-role test nearly always has a SQL half. The good news is that you already know the questions; only the spelling changes.',
            ['code', "-- filter\nSELECT * FROM orders WHERE amount > 100;\n-- pandas: df[df['amount'] > 100]\n\n-- group and aggregate\nSELECT region, SUM(amount) FROM orders GROUP BY region;\n-- pandas: df.groupby('region')['amount'].sum()\n\n-- join\nSELECT * FROM orders o LEFT JOIN customers c ON o.customer_id = c.id;\n-- pandas: orders.merge(customers, left_on='customer_id', right_on='id', how='left')", 'Filter, group, join, sort. Four verbs, two languages.'],
            'Three things trip people up, and all three are asked about deliberately.',
            '**WHERE versus HAVING.** WHERE filters rows before grouping; HAVING filters the groups afterwards. You cannot put an aggregate in a WHERE.',
            ['code', "SELECT region, SUM(amount) FROM orders\nWHERE order_date >= '2024-01-01'   -- which rows count\nGROUP BY region\nHAVING SUM(amount) > 1000;         -- which groups survive"],
            '**NULL is not a value.** It is unknown, so nothing equals it — not even another NULL.',
            ['code', "WHERE email IS NULL      -- correct\nWHERE email = NULL       -- matches nothing, ever\nCOALESCE(email, 'unknown')  -- the SQL fillna"],
            '**Window functions keep every row.** GROUP BY collapses; OVER (PARTITION BY ...) computes alongside. That is what makes "the latest row per customer" answerable in one query:',
            ['code', "SELECT * FROM (\n  SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn\n  FROM orders\n) t WHERE rn = 1;", 'Number the rows within each customer, then keep number one. Learn this shape — it is the most-asked advanced SQL question there is.'],
            ['aside', 'The clauses run FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. That order explains why a SELECT alias works in ORDER BY but not in WHERE.']
          ] },
          { t: 'quick', title: 'Querying', groups: ['SQL · querying'] },
          { t: 'quick', title: 'Grouping and aggregates', groups: ['SQL · grouping & aggregates'] },
          { t: 'quick', title: 'Joins and subqueries', groups: ['SQL · joins & subqueries'] },
          { t: 'quick', title: 'Window functions', groups: ['SQL · window functions'] }
        ] },

      { key: 'd6c', name: 'SQL: dates, text and NULLs',
        blurb: 'The functions every reporting query needs, and the three-valued logic behind NULL.',
        needs: 'SELECT, GROUP BY, JOIN',
        steps: [
          { t: 'read', title: 'The parts a real query is made of', body: [
            'Most reporting questions are a date function, a text tidy-up and a NULL decision away from being answered.',
            ['code', "SELECT DATE_TRUNC('month', order_date) AS month,\n       SUM(amount) AS total\nFROM orders\nGROUP BY month\nORDER BY month", 'That is the single most-asked SQL question there is. `EXTRACT(YEAR FROM order_date)` pulls one part out; `DATE_TRUNC` keeps a real date you can sort.'],
            'Filter dates by comparing the column to a computed value — never by wrapping the column in a function, which stops the index being used:',
            ['code', "WHERE order_date >= CURRENT_DATE - INTERVAL '30 days'"],
            'Text: `UPPER`, `LOWER`, `TRIM`, `LENGTH`, `REPLACE`, `SUBSTRING`, and `||` to join. Untrimmed keys are the usual reason a join matches nothing.',
            '**NULL is not a value, it is the absence of one.** It is never equal to anything, including itself:',
            ['code', "WHERE email IS NOT NULL          -- not != NULL, which matches nothing\nCOALESCE(email, 'unknown')       -- a fallback\ntotal / NULLIF(count, 0)         -- avoid dividing by zero\nCOUNT(email)  vs  COUNT(*)       -- one skips NULLs, one counts rows", 'That last pair is a favourite interview question. `COUNT(column)` ignores NULLs; `COUNT(*)` counts every row.'],
            ['aside', 'Integer divided by integer is integer division in most engines: 3/4 gives 0. Multiply by 1.0 when you want a rate.']
          ] },
          { t: 'quick', title: 'Dates, text and nulls', groups: ['SQL · dates, text & nulls'] }
        ] },

      { key: 'd6d', name: 'SQL: windows in depth',
        blurb: 'Ranking, lag and lead, running totals and the frame clause.',
        needs: 'GROUP BY',
        steps: [
          { t: 'read', title: 'Keeping every row and adding an answer', body: [
            'A `GROUP BY` collapses rows; a **window** keeps every row and adds a value calculated over a group of them. That one sentence is the whole idea:',
            ['code', "SELECT customer_id,\n       amount,\n       COUNT(*)  OVER (PARTITION BY customer_id) AS their_orders,\n       SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS running_total\nFROM orders", '`PARTITION BY` is the grouping; `ORDER BY` inside the OVER clause is what makes a running total run.'],
            'The ranking family differs only in how it treats ties:',
            ['code', "ROW_NUMBER()  -- 1, 2, 3, 4  — never ties\nRANK()        -- 1, 1, 3     — ties share, then it skips\nDENSE_RANK()  -- 1, 1, 2     — ties share, no gap\nNTILE(4)      -- quartiles"],
            'The standard deduplication in SQL is ROW_NUMBER inside a subquery:',
            ['code', "SELECT * FROM (\n  SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn\n  FROM orders\n) t\nWHERE rn = 1", 'One row per customer — their latest. Learn this shape; it answers a whole family of questions.'],
            '`LAG` and `LEAD` reach to the row before and after, which is how you measure a gap between events. And the frame clause turns a window into a moving average:',
            ['code', "AVG(amount) OVER (PARTITION BY customer_id ORDER BY order_date\n                  ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)"],
            ['aside', 'You cannot filter on a window function in the same WHERE clause — the window runs after WHERE. Wrap it in a subquery or a CTE, as above.']
          ] },
          { t: 'quick', title: 'Windows in depth', groups: ['SQL · windows in depth'] }
        ] },

      { key: 'd6e', name: 'SQL: shaping and changing data',
        blurb: 'CTEs, self joins, EXISTS, pivots with CASE, and the statements that write.',
        needs: 'joins',
        steps: [
          { t: 'read', title: 'Building a query someone can read', body: [
            'A **CTE** turns a nest of subqueries into a sequence of named steps, and it is the single easiest way to look competent in a SQL interview:',
            ['code', "WITH monthly AS (\n  SELECT customer_id, DATE_TRUNC('month', order_date) AS month, SUM(amount) AS total\n  FROM orders GROUP BY 1, 2\n), ranked AS (\n  SELECT *, RANK() OVER (PARTITION BY month ORDER BY total DESC) AS r\n  FROM monthly\n)\nSELECT * FROM ranked WHERE r <= 3", 'Each CTE can use the ones before it. Read top to bottom, like a paragraph.'],
            'Three shapes worth recognising instantly:',
            ['code', "-- a self join: each person beside their manager\nSELECT e.name, m.name AS manager\nFROM employees e JOIN employees m ON e.manager_id = m.id;\n\n-- EXISTS: customers who have ordered at least once\nSELECT * FROM customers c\nWHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);\n\n-- conditional aggregation: a pivot without a PIVOT clause\nSELECT SUM(CASE WHEN region = 'N' THEN amount ELSE 0 END) AS north FROM orders;"],
            'And the statements that change things. Write the `WHERE` first, every time:',
            ['code', "INSERT INTO customers (id, name) VALUES (1, 'Ann');\nUPDATE customers SET region = 'N' WHERE id = 1;\nDELETE FROM orders WHERE amount = 0;", 'An UPDATE or DELETE without a WHERE hits every row, and there is no undo. Run it as a SELECT first and read the count.'],
            'Finally, the order a query actually executes in — FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT. That is why a SELECT alias cannot be used in WHERE, and why HAVING filters groups while WHERE filters rows.',
            ['aside', 'Asked to make a query faster: EXPLAIN it first. Then index what you filter and join on, and stop selecting columns you do not use.']
          ] },
          { t: 'quick', title: 'Shaping and writing data', groups: ['SQL · shaping & writing data'] }
        ] },

      { key: 'd7', name: 'Dates and time series',
        blurb: 'Parsing dates, the .dt accessor, resampling and rolling windows.',
        needs: 'cleaning, grouping',
        steps: [
          { t: 'read', title: 'Time is a type, not a string', body: [
            'Until you convert them, dates are text: they sort alphabetically, they cannot be subtracted, and none of the useful methods exist.',
            ['code', "df['date'] = pd.to_datetime(df['date'])\ndf['date'] = pd.to_datetime(df['date'], format='%d/%m/%Y')   # explicit is faster and safer", 'Give the format when you know it — it removes any chance of the day and month being read the American way round.'],
            'Then the `.dt` accessor opens up:',
            ['code', "df['date'].dt.year\ndf['date'].dt.month\ndf['date'].dt.day_name()\ndf['date'].dt.dayofweek     # Monday = 0, so >= 5 is the weekend"],
            'Subtracting two datetimes gives a duration:',
            ['code', "(df['end'] - df['start']).dt.days"],
            'With the dates as the index, whole-period questions become one line:',
            ['code', "df = df.set_index('date')\ndf['amount'].resample('M').sum()      # monthly totals\ndf['value'].rolling(7).mean()         # 7-period moving average", '`resample` is groupby for time; `rolling` slides a window along it. Both need the index to be datetimes and the rows to be in order.'],
            'The three that keep coming up in feature engineering:',
            ['code', "df['value'].shift(1)        # the previous row's value\ndf['value'].diff()          # the change since then\ndf['value'].pct_change()    # that change as a fraction", 'Inside a grouped dataset, always shift within the group — `df.groupby(\'id\')[\'value\'].shift(1)` — or one customer\'s history leaks into the next one\'s.']
          ] },
          { t: 'quick', title: 'Dates and times', groups: ['pandas · dates & times'] },
          { t: 'quick', title: 'Time series', groups: ['pandas · time series'] },
          { t: 'problem', id: 'pt-days-between' },
          { t: 'problem', id: 'pt-weekdays' },
          { t: 'problem', id: 'pt-moving-average' }
        ] },

      { key: 'd7b', name: 'Turning columns into features',
        blurb: 'Encoding, binning, ratios, dates and group aggregates — and the leak that ruins them.',
        needs: 'grouping, dates',
        steps: [
          { t: 'read', title: 'Feature engineering, and the one rule that matters', body: [
            'A model can only use what you give it. Feature engineering is the work of turning the columns you have into the columns a model can learn from — and it moves scores far more than swapping algorithms does.',
            '**Categories have to become numbers.** How you do it depends on whether the order means anything:',
            ['code', "pd.get_dummies(df, columns=['city'], drop_first=True)          # no order — one column per value\ndf['size'].map({'small': 0, 'medium': 1, 'large': 2})           # a real order — keep it", 'Encoding an unordered category as 1, 2, 3 tells a linear model that "large is three times small", which is nonsense it will happily learn.'],
            '**Continuous columns can become bands** when the relationship is not a straight line:',
            ['code', "pd.cut(df['age'], bins=[0, 18, 65, 120], labels=['child', 'adult', 'senior'])   # edges you choose\npd.qcut(df['income'], 4)                                                       # equal-sized groups"],
            '**The strongest features are usually derived, not raw:**',
            ['code', "df['spend_per_visit'] = df['spend'] / df['visits']                        # a ratio\ndf['is_weekend'] = (df['date'].dt.dayofweek >= 5).astype(int)              # a calendar flag\ndf['customer_mean'] = df.groupby('customer_id')['spend'].transform('mean') # a group aggregate\ndf['prev_value'] = df.groupby('customer_id')['value'].shift(1)             # a lag", 'Ratios, calendar parts, group averages and lags cover most of what wins competitions and most of what works at work.'],
            'Now the rule that governs all of it. **Anything learned from the data must be learned from the training set only** — the scaler\'s mean, the imputer\'s median, the target encoding, the feature selection. Learn it on train, apply it to both halves. A pipeline enforces this for you; doing it by hand before the split is the single most common way a model looks brilliant in a notebook and fails in production.',
            'And the leak that no pipeline can catch: a column that would not exist at prediction time. A cancellation date when you are predicting churn, a refund flag when you are predicting fraud. If it scores suspiciously well, ask when the value was recorded.',
            ['aside', 'On anything with a date, split by time rather than at random. A shuffled split trains on the future, and the score it reports is one you will never see again.']
          ] },
          { t: 'quick', title: 'Encoding and binning', groups: ['Features · encoding & binning'] },
          { t: 'quick', title: 'Deriving columns', groups: ['Features · deriving columns'] },
          { t: 'quick', title: 'Selecting, and avoiding leakage', groups: ['Features · selecting & leakage'] },
          { t: 'problem', id: 'pt-pd-features' },
          { t: 'problem', id: 'pt-pd-encode' },
          { t: 'problem', id: 'pt-pd-bin' },
          { t: 'problem', id: 'pt-pd-lag' }
        ] },

      { key: 'd8b', name: 'Making pandas fast',
        blurb: 'Vectorising, reading less, and the memory tricks that turn a crash into a run.',
        needs: 'grouping, cleaning',
        steps: [
          { t: 'read', title: 'Stop looping', body: [
            'The rule: **the loop belongs to pandas, not to you.** Anything you write as a Python loop over rows is being done one value at a time in the slowest language in the stack:',
            ['code', "df['total'] = df['price'] * df['qty']              # vectorised — in C\ndf['band'] = np.where(df['score'] > 90, 'high', 'low')   # vectorised if/else\ndf['label'] = np.select(conditions, choices, default='other')   # many branches\ndf['name'] = df['code'].map(lookup)                # a dict translation", '`apply` with a Python function is the slow fallback, not the first choice. If you must loop, `itertuples()` beats `iterrows()` several times over.'],
            'Then: **read less in the first place.**',
            ['code', "pd.read_csv('sales.csv', usecols=['date', 'amount'])\npd.read_csv('sales.csv', dtype={'id': 'str'})\npd.read_csv('sales.csv', chunksize=100000)   # an iterator of frames", 'Chunking is how you aggregate a file bigger than memory: loop the chunks, aggregate each, combine at the end.'],
            'And **store it properly**. Parquet is smaller and faster than CSV and keeps the dtypes:',
            ['code', "df.to_parquet('sales.parquet', index=False)"],
            'One more that often halves the memory of a real dataset: a repetitive text column becomes a `category`, and `df.memory_usage(deep=True)` shows you where the space actually went.',
            ['aside', 'Measure before you optimise. `%timeit` on the slow cell, then change one thing. Most "pandas is slow" turns out to be one `apply` over a million rows.']
          ] },
          { t: 'quick', title: 'Speed and memory', groups: ['pandas · speed & memory'] },
          { t: 'problem', id: 'pt-pd-vectorise' }
        ] },

      { key: 'd8', name: 'Drawing it',
        blurb: 'matplotlib and seaborn: the four charts you will draw most.',
        needs: 'pandas basics',
        steps: [
          { t: 'read', title: 'A chart is an argument, not decoration', body: [
            'Four charts answer most questions. Learn these before anything fancy:',
            ['code', "import matplotlib.pyplot as plt\n\nplt.hist(df['age'], bins=30)        # what does one column look like?\nplt.scatter(df['age'], df['income']) # how do two relate?\nplt.plot(df['date'], df['value'])    # how does it change over time?\nplt.bar(labels, values)              # how do categories compare?", 'Then label it. An unlabelled axis makes a chart unreadable to everyone except the person who drew it:'],
            ['code', "plt.figure(figsize=(10, 6))\nplt.hist(df['age'], bins=30)\nplt.title('Age distribution')\nplt.xlabel('Age')\nplt.ylabel('Customers')\nplt.tight_layout()\nplt.show()", '`figure(figsize=...)` goes BEFORE the plot; `tight_layout()` stops labels overlapping; `savefig` must come before `show`, which clears the figure.'],
            'seaborn sits on top and does the grouping for you:',
            ['code', "import seaborn as sns\n\nsns.boxplot(data=df, x='department', y='salary')\nsns.scatterplot(data=df, x='age', y='income', hue='group')\nsns.heatmap(df.corr(numeric_only=True), annot=True)", '`hue=` colouring by a category is seaborn\'s single best trick — it turns one chart into a comparison.'],
            'And straight from pandas, when you just want to look:',
            ['code', "df['value'].plot()\ndf['city'].value_counts().plot(kind='bar')\ndf.hist(figsize=(12, 10))     # every numeric column at once", 'That last line is the fastest first look at a new dataset there is.']
          ] },
          { t: 'quick', title: 'matplotlib', groups: ['Plotting · matplotlib'] },
          { t: 'quick', title: 'seaborn and pandas plotting', groups: ['Plotting · seaborn & pandas'] }
        ] },

      { key: 'd9', name: 'Describing it honestly',
        blurb: 'Mean versus median, spread, outliers and the tests behind an A/B result.',
        needs: 'pandas basics',
        steps: [
          { t: 'read', title: 'The numbers behind the summary', body: [
            'The **mean** is the balance point and the **median** is the middle value. On anything skewed — money, durations, counts — they disagree, and the median is usually the honest one to quote.',
            ['code', "s.mean()      # pulled by outliers\ns.median()    # not\ns.std()       # typical distance from the mean\ns.quantile([0.25, 0.5, 0.75])"],
            'Spread matters as much as the middle. Two teams with the same average delivery time and very different standard deviations are not the same business.',
            'For outliers, two conventions:',
            ['code', "# z-score: more than 3 standard deviations out\n((s - s.mean()).abs() > 3 * s.std()).sum()\n\n# IQR: outside 1.5 × the middle 50%\niqr = s.quantile(0.75) - s.quantile(0.25)", 'Neither is a law. Look at the rows they flag before deleting anything — outliers are often the most interesting customers you have.'],
            'When comparing two groups, the difference in means is the effect; a **significance test** says whether it could plausibly be noise:',
            ['code', "from scipy import stats\n\nstats.ttest_ind(a, b, equal_var=False)   # two independent groups\nstats.mannwhitneyu(a, b)                  # same question, no normality assumed\nstats.chi2_contingency(table)             # two categorical variables", 'A p-value is not the chance you are right, and a significant difference is not necessarily a difference worth acting on. Quote the effect size next to it.'],
            ['aside', 'Correlation is not causation, and a correlation of 0 only rules out a STRAIGHT-LINE relationship. Always look at the scatter plot.']
          ] },
          { t: 'quick', title: 'Describing and testing', groups: ['Statistics · describe & test'] },
          { t: 'quick', title: 'Random numbers and summary statistics', groups: ['NumPy · random & statistics'] },
          { t: 'problem', id: 'pt-median' },
          { t: 'problem', id: 'pt-std' },
          { t: 'problem', id: 'pt-normalise' }
        ] },

      { key: 'd9b', name: 'Experiments, A/B tests and p-values',
        blurb: 'Designing a test, reading a result honestly, and the traps that make one meaningless.',
        needs: 'describing data',
        steps: [
          { t: 'read', title: 'What a significant result actually says', body: [
            'A significance test starts from the **null hypothesis** — the assumption that there is no difference — and asks how surprising your data would be if that were true. The p-value is that surprise:',
            ['code', "from scipy import stats\n\nstats.ttest_ind(a, b, equal_var=False)   # Welch's t-test: two groups, means\nstats.mannwhitneyu(a, b)                 # the same question without assuming normality\nstats.chi2_contingency(table)            # two categorical variables", 'A p-value is the probability of a result this extreme IF the null is true. It is not the probability that the null is true, and not the chance you are wrong.'],
            'Report the **effect size** alongside it. With enough data, a difference too small to care about is still significant:',
            ['code', "mean = s.mean()\nse = s.std() / np.sqrt(len(s))\nci = (mean - 1.96 * se, mean + 1.96 * se)", 'A 95% confidence interval says: 95 intervals built this way in 100 would contain the true value.'],
            'Designing an A/B test is four decisions, all made **before** you look:',
            'One — randomise, because that is the only thing that lets you claim cause. Two — fix the success metric in advance. Three — work out the sample size you need. Four — fix when you will stop.',
            '**Peeking** breaks it. Checking every day and stopping the moment it looks significant inflates the false positive rate well past 5%. So does testing twenty metrics and reporting the one that worked — that is what the Bonferroni correction is for.',
            ['aside', 'Two you will be asked to name: a confounder drives both the treatment and the outcome, and Simpson\'s paradox is when a trend in every subgroup reverses once you pool them. Always look at the result split by the obvious confounder.']
          ] },
          { t: 'quick', title: 'Experiments and inference', groups: ['Statistics · experiments & inference'] },
          { t: 'problem', id: 'pt-ml-cost' }
        ] },

      { key: 'd10', name: 'Working like a professional',
        blurb: 'Notebooks, environments, timing, debugging and reproducibility.',
        steps: [
          { t: 'read', title: 'The shell around the code', body: [
            'Two habits separate an analysis that survives from one that does not.',
            '**Pin your environment.** A notebook that ran last year and does not run today is usually a version problem, not a code problem:',
            ['code', "python -m venv .venv\npip install pandas==2.2.0\npip freeze > requirements.txt", 'Install into a virtual environment, pin the versions, and write them down.'],
            '**Seed everything that samples.** Without it, "the model got worse" might just be a different train/test split:',
            ['code', "np.random.seed(42)\ntrain_test_split(X, y, random_state=42)"],
            'Then the small tools that save hours:',
            ['code', "%timeit my_function()      # how slow is it, really?\n%%time                     # ... for the whole cell\nbreakpoint()               # stop here and look around\n%debug                     # open the debugger on the last error\npd.merge?                  # read the documentation without leaving the notebook"],
            'And the cheapest debugging habit in data work — a labelled shape print after every step that could lose rows:',
            ['code', "print(f'after merge: {df.shape}')", 'When a number surprises you, that line tells you which step to look at. Assertions do the same job automatically: `assert len(df) == before`.'],
            ['aside', 'Restart the kernel and run the notebook top to bottom before you show anyone. Out-of-order cells hide broken code behind variables that only exist in your session.']
          ] },
          { t: 'quick', title: 'Notebook and environment', groups: ['Working habits · notebook & environment'] },
          { t: 'problem', id: 'pt-validate-rows' }
        ] }
    ]
  });

  window.COURSE.stages.push({
    key: 'ml', no: '05', name: 'Machine learning with scikit-learn',
    blurb: 'The same four verbs for every model, and the discipline that keeps a score honest.',
    units: [

      { key: 'm1', name: 'The workflow',
        blurb: 'Split, scale, fit, predict, score — in that order, every time.',
        needs: 'pandas',
        steps: [
          { t: 'read', title: 'Four verbs, every model', body: [
            'Every scikit-learn model works the same way, which is the library\'s great gift: learn the shape once and every algorithm is available to you.',
            ['code', "from sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\n\nX = df.drop(columns=['target'])   # the questions\ny = df['target']                   # the answers\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\n\nmodel = RandomForestClassifier(random_state=42)\nmodel.fit(X_train, y_train)                 # learn\ny_pred = model.predict(X_test)              # apply\nprint(accuracy_score(y_test, y_pred))       # judge", 'Instantiate, `fit`, `predict`, score. Swapping the model means changing one line.'],
            'The first move is the honest one: **hold data back**. A score on data the model has already seen is not a score, it is a memory test.',
            ['code', "train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)", '`stratify=y` keeps the class balance the same in both halves — essential when one class is rare. `random_state` makes the split repeatable, so tomorrow\'s comparison is fair.'],
            'Anything the model learns must be learned from the TRAINING half only. That includes scaling:',
            ['code', "scaler = StandardScaler()\nX_train_s = scaler.fit_transform(X_train)   # learn the means and spreads, and apply\nX_test_s = scaler.transform(X_test)         # apply the TRAINING statistics", "Calling `fit_transform` on the test set — or scaling before the split — leaks information from the future into the past. Your score goes up and your model gets worse. This is the mistake interviewers ask about most."],
            ['aside', 'The trailing underscore on `model.coef_` or `model.feature_importances_` means "learned during fit". If it does not exist yet, you have not fitted the model.']
          ] },
          { t: 'quick', title: 'Where everything lives', groups: ['scikit-learn · imports'] },
          { t: 'quick', title: 'Fit and predict', groups: ['scikit-learn · fit & predict'] },
          { t: 'problem', id: 'pt-ml-split' },
          { t: 'problem', id: 'pt-ml-distance' },
          { t: 'task', key: 'split' },
          { t: 'task', key: 'scale' },
          { t: 'task', key: 'knn' },
          { t: 'problem', id: 'pt-ml-knn' }
        ] },

      { key: 'm2', name: 'Preparing features',
        blurb: 'Imputing, encoding and pipelines that cannot leak.',
        needs: 'the workflow',
        steps: [
          { t: 'read', title: 'Getting the data into a shape a model accepts', body: [
            'Models want numbers, with no gaps. Three transformers do most of it:',
            ['code', "from sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\n\nSimpleImputer(strategy='median')       # fill the gaps\nStandardScaler()                        # centre and scale\nOneHotEncoder(handle_unknown='ignore')  # categories → 0/1 columns", "`handle_unknown='ignore'` stops a category the model has never seen from crashing prediction in production — which it will, eventually."],
            'Each has the same two methods as a model: `fit` learns from the training data, `transform` applies what was learned. Getting that pairing wrong is exactly the leak from the last unit.',
            'A **pipeline** removes the chance of the mistake entirely by chaining the steps into one object:',
            ['code', "from sklearn.pipeline import Pipeline\n\npipe = Pipeline([\n    ('impute', SimpleImputer(strategy='median')),\n    ('scale', StandardScaler()),\n    ('model', LogisticRegression(max_iter=1000)),\n])\npipe.fit(X_train, y_train)\npipe.score(X_test, y_test)", 'Now `fit` fits every step on the training data in order, and `predict` applies them in the same order. Cross-validation over a pipeline refits the preprocessing inside each fold, which is the only way the score is honest.'],
            'When different columns need different treatment, `ColumnTransformer` routes them:',
            ['code', "from sklearn.compose import ColumnTransformer\n\npre = ColumnTransformer([\n    ('num', StandardScaler(), numeric_cols),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), category_cols),\n])"],
            ['aside', 'Save the whole pipeline, not just the model: `joblib.dump(pipe, \'model.joblib\')`. A model without its preprocessing is unusable, and rebuilding that preprocessing from memory in six months is how production bugs are born.']
          ] },
          { t: 'quick', title: 'Preprocessing', groups: ['scikit-learn · preprocessing'] },
          { t: 'problem', id: 'pt-ml-standardise' },
          { t: 'task', key: 'impute' },
          { t: 'task', key: 'encode' },
          { t: 'task', key: 'pipeline' }
        ] },

      { key: 'm3', name: 'Judging a model',
        blurb: 'Accuracy is not enough: precision, recall, the matrix and cross-validation.',
        needs: 'the workflow',
        steps: [
          { t: 'read', title: 'What "good" actually means', body: [
            'Accuracy is the share of predictions that were right. On imbalanced data it is nearly useless: if 1% of transactions are fraud, a model that says "never fraud" is 99% accurate and worth nothing.',
            'The confusion matrix names the four outcomes:',
            ['code', "from sklearn.metrics import confusion_matrix, classification_report\n\nconfusion_matrix(y_test, y_pred)     # [[TN, FP], [FN, TP]]\nprint(classification_report(y_test, y_pred))", 'Truth first, predictions second — every scikit-learn metric takes that order, and swapping them silently reports the wrong numbers.'],
            'From those four come the two numbers that matter:',
            ['code', "precision_score(y_test, y_pred)   # of the ones we flagged, how many were right\nrecall_score(y_test, y_pred)      # of the ones that mattered, how many we caught\nf1_score(y_test, y_pred)          # their harmonic mean", 'Which one you optimise is a business decision, not a technical one. Missing a fraud costs differently from annoying a customer, and the model cannot know that.'],
            'The threshold is yours to move. `predict` uses 0.5; that is a default, not a law:',
            ['code', "y_proba = model.predict_proba(X_test)[:, 1]\ny_pred = (y_proba >= 0.3).astype(int)     # buy recall, pay in precision\nroc_auc_score(y_test, y_proba)             # quality across ALL thresholds", 'Feed ROC-AUC probabilities, never hard 0/1 predictions — that quietly understates your model.'],
            'And one number from one split is a rumour. Cross-validation gives you a range:',
            ['code', "scores = cross_val_score(pipe, X, y, cv=5, scoring='roc_auc')\nprint(scores.mean(), scores.std())", 'Report the mean AND the spread. A model that scores 0.82 ± 0.01 is a different proposition from one that scores 0.82 ± 0.09.']
          ] },
          { t: 'quick', title: 'Evaluation and tuning', groups: ['scikit-learn · evaluation & tuning'] },
          { t: 'problem', id: 'pt-ml-accuracy' },
          { t: 'problem', id: 'pt-ml-confusion' },
          { t: 'problem', id: 'pt-ml-precision-recall' },
          { t: 'problem', id: 'pt-ml-f1' },
          { t: 'problem', id: 'pt-ml-mae' },
          { t: 'task', key: 'metrics' },
          { t: 'task', key: 'prf' },
          { t: 'task', key: 'cv' },
          { t: 'task', key: 'rocauc' },
          { t: 'problem', id: 'pt-ml-crossval-folds' }
        ] },

      { key: 'm3b', name: 'Choosing and reading a metric',
        blurb: 'Which number to lead on, why, and the trade-off you say out loud.',
        needs: 'judging a model',
        steps: [
          { t: 'read', title: 'The number depends on the cost of being wrong', body: [
            'Accuracy answers "how often were we right", which is nearly useless when one class is rare. The two that matter:',
            ['code', "precision = TP / (TP + FP)   # of everything we FLAGGED, how much was right\nrecall    = TP / (TP + FN)   # of everything that WAS positive, how much we caught", 'F1 is their harmonic mean, so one bad number drags it down — you cannot hide a terrible recall behind lovely precision.'],
            'Then answer the actual question with a trade-off, not a number:',
            'For **fraud**, a miss costs far more than a false alarm, so lead on recall and say the limit is how many alerts the review team can handle. For a **spam filter**, binning a real email is the worst outcome, so lead on precision. Interviewers often ask both in a row to see whether you noticed they are opposites.',
            'The **threshold** is yours to choose, and choosing it is half the job:',
            ['code', "y_proba = model.predict_proba(X_test)[:, 1]\ny_pred = (y_proba >= 0.3).astype(int)   # lower threshold: more recall, less precision", '0.5 is a convention, not a decision.'],
            'ROC AUC judges the RANKING rather than the threshold — the chance a random positive is ranked above a random negative. When positives are rare, prefer the precision-recall curve: ROC looks flatteringly good because true negatives are easy and plentiful.',
            'For regression: RMSE punishes big misses hardest because it squares the errors, MAE treats every pound the same, R-squared is the share of variance explained, and MAPE is readable for a business audience but explodes near zero.',
            ['aside', 'Whatever you report, report the baseline beside it. "92% accurate" means nothing until you say the majority class is 90%.']
          ] },
          { t: 'quick', title: 'Choosing and reading a metric', groups: ['Modelling · choosing and reading a metric'] },
          { t: 'problem', id: 'pt-ml-threshold' }
        ] },

      { key: 'm4', name: 'Making it better',
        blurb: 'Baselines, tuning, imbalance and knowing when to stop.',
        needs: 'evaluation',
        steps: [
          { t: 'read', title: 'Improving honestly', body: [
            'Start with a **baseline**. Without one you cannot tell whether your model is good or merely complicated:',
            ['code', "from sklearn.dummy import DummyClassifier\n\nDummyClassifier(strategy='most_frequent').fit(X_train, y_train).score(X_test, y_test)", 'That number is the score to beat. Plenty of models in production do not beat it.'],
            'Then tune, over a pipeline, with cross-validation:',
            ['code', "from sklearn.model_selection import GridSearchCV\n\ngrid = GridSearchCV(pipe, {'model__C': [0.1, 1, 10]}, cv=5, scoring='roc_auc', n_jobs=-1)\ngrid.fit(X_train, y_train)\ngrid.best_params_, grid.best_score_", 'The double underscore addresses a step inside the pipeline. `RandomizedSearchCV` gives better value once there are more than two or three parameters to try.'],
            'For imbalance, try the free thing first:',
            ['code', "LogisticRegression(class_weight='balanced')\nRandomForestClassifier(class_weight='balanced')", 'Weighting the rare class costs nothing and often does as well as resampling. If you do resample, do it inside the cross-validation folds, never before splitting.'],
            'Know the two failure modes. **Underfitting** is bad on training and test alike — the model is too simple. **Overfitting** is excellent on training and poor on test — it memorised. A learning curve tells you which one you have, and therefore whether more data or more model is the answer.',
            ['aside', 'Every time you look at the test set and change something, you leak a little information into your decisions. Keep a final holdout you touch once — and stop when the improvement stops mattering to the decision the model supports.']
          ] },
          { t: 'problem', id: 'pt-ml-majority' },
          { t: 'problem', id: 'pt-ml-gini' },
          { t: 'task', key: 'baseline' },
          { t: 'task', key: 'grid' },
          { t: 'task', key: 'imbal' },
          { t: 'task', key: 'threshold' },
          { t: 'task', key: 'save' }
        ] },

      { key: 'm5', name: 'Choosing a model',
        blurb: 'Linear, tree, forest, boosting — what each is good at, and how little the choice usually matters.',
        needs: 'the workflow, evaluation',
        steps: [
          { t: 'read', title: 'Which model, and does it matter?', body: [
            'Less than people think. On tabular data, the gap between a well-prepared dataset and a badly-prepared one is almost always larger than the gap between two reasonable algorithms. Get the features and the validation right first.',
            'That said, four families cover nearly everything you will do:',
            ['code', "LogisticRegression / LinearRegression   # a weighted sum — fast, and you can read the coefficients\nDecisionTreeClassifier                   # nested yes/no questions — readable, and it overfits alone\nRandomForestClassifier                   # many trees on random subsets, averaged — a strong default\nHistGradientBoostingClassifier           # trees built on each other's errors — usually the best on tabular data"],
            '**Start linear.** It is fast, it needs scaling, and its coefficients are an explanation you can take to a stakeholder. If a linear model does well, the problem was linear and you have saved yourself a lot of trouble.',
            '**Reach for a forest next.** It needs no scaling, copes with mixed types and interactions, rarely embarrasses you, and gives feature importances for free.',
            '**Boosting when the score matters.** Gradient boosting usually wins on tabular data, at the cost of more tuning and less interpretability.',
            '**Keep a decision tree for explaining.** One shallow tree drawn on a slide explains a rule better than any importance chart.',
            'Two habits matter more than the choice. Always compare against the baseline from the last unit. And always compare models under the SAME cross-validation, on the same folds — a score from a different split is not a comparison.',
            ['aside', 'Regularisation is the dial that decides how much a linear model is allowed to fit: smaller C (or larger alpha) means simpler. Ridge keeps every feature small; Lasso pushes some to exactly zero and so does feature selection for you.']
          ] },
          { t: 'task', key: 'logreg' },
          { t: 'task', key: 'ridge' },
          { t: 'task', key: 'rf' },
          { t: 'task', key: 'histgb' },
          { t: 'task', key: 'permimp' }
        ] },

      { key: 'm5b', name: 'The ideas they ask you to explain',
        blurb: 'Overfitting, the bias-variance trade-off, regularisation, imbalance and drift — in your own words.',
        needs: 'the workflow',
        steps: [
          { t: 'read', title: 'The vocabulary of the interview', body: [
            '**Overfitting** is high training accuracy and poor test accuracy: the model learned the noise. **Underfitting** is bad at both: too simple, or the features do not carry the signal. Between them sits the **bias-variance trade-off**, and nearly everything you tune moves along that line.',
            '**Regularisation** is the standard cure: penalise large coefficients so the model stays simple:',
            ['code', "from sklearn.linear_model import Ridge, Lasso\n\nRidge(alpha=1.0)     # L2 — shrinks coefficients towards zero\nLasso(alpha=0.1)     # L1 — drives some to exactly zero, so it selects features\nLogisticRegression(C=0.1)   # C is the INVERSE: smaller C, more regularisation"],
            '**Which models need scaling?** Anything using distances or gradients — kNN, SVM, linear models, neural networks. Trees do not, because they split on thresholds and units are irrelevant.',
            '**Class imbalance** is when 99% of rows are one class and accuracy means nothing. Answer it with precision and recall, `class_weight="balanced"`, resampling, and a deliberate threshold. If you resample, do it on the training fold only — SMOTE before the split leaks the answer straight into the test set.',
            '**Ensembles**: bagging (a random forest) averages many trees built on bootstrap samples to cut variance; boosting builds each tree on the errors of the last and is usually the strongest thing on tabular data.',
            'And the two that come up about deployment: **drift**, where the world changes and a live model quietly gets worse, and **explainability**, where global importances say what the model uses and SHAP says why this particular row got this answer.',
            ['aside', 'Every one of these is a "explain it to a non-technical colleague" question in disguise. Practise saying each in two sentences with a concrete example.']
          ] },
          { t: 'quick', title: 'The ideas they ask about', groups: ['Modelling · the ideas they ask about'] },
          { t: 'problem', id: 'pt-ml-precision-at-k' }
        ] },

      { key: 'm6', name: 'Validating properly',
        blurb: 'Folds that respect groups and time, learning curves, and the searches that do not cheat.',
        needs: 'evaluation',
        steps: [
          { t: 'read', title: 'The ways a validation score lies', body: [
            'A cross-validation score is a promise about data you have not seen. Four situations break that promise, and each has a splitter that fixes it.',
            '**Imbalanced classes** → StratifiedKFold, so every fold keeps the class balance. It is the default for classifiers, and worth stating anyway.',
            '**Repeated entities** → GroupKFold. If the same customer appears in ten rows, a random split puts some of their rows in train and some in test, and the model scores brilliantly by recognising the customer rather than the pattern.',
            ['code', "from sklearn.model_selection import GroupKFold\ncv = GroupKFold(n_splits=5)\ncross_val_score(pipe, X, y, cv=cv, groups=df['customer_id'])"],
            '**Anything with a date** → TimeSeriesSplit, which always trains on the past and tests on the future. A shuffled split on time-ordered data trains on tomorrow to predict yesterday.',
            '**Tuning on the test set** → nested cross-validation, or simply a holdout you touch once. Every time you look at the test score and change something, you have used it for training a little.',
            'And two diagnostics worth running before you reach for a bigger model:',
            ['code', "from sklearn.model_selection import learning_curve, validation_curve", 'A learning curve says whether more DATA would help; a validation curve says whether more MODEL would. If training and validation scores are both poor, the model is too simple and more rows will not save you.']
          ] },
          { t: 'task', key: 'kfold' },
          { t: 'task', key: 'skfold' },
          { t: 'task', key: 'groupkfold' },
          { t: 'task', key: 'tssplit' },
          { t: 'task', key: 'nestedcv' },
          { t: 'task', key: 'lcurve' },
          { t: 'task', key: 'valcurve' },
          { t: 'task', key: 'pipegrid' },
          { t: 'task', key: 'rsearch' }
        ] },

      { key: 'm7', name: 'Beyond accuracy',
        blurb: 'Regression metrics, probabilities you can trust, multi-metric scoring and feature selection.',
        needs: 'evaluation',
        steps: [
          { t: 'read', title: 'Scores that answer the actual question', body: [
            'Classification and regression ask different questions of a metric, and both have a "which number do I report" problem.',
            '**Regression.** RMSE punishes large misses hardest, MAE treats every pound the same, R² says how much of the variation you explained. Report RMSE or MAE in the units of the target — a stakeholder understands "out by £2 on average"; nobody has ever acted on an R² of 0.61.',
            '**Probabilities.** A model can rank perfectly and still be badly calibrated: predicting 0.9 for things that happen half the time. If the number itself will be used — expected value, a risk threshold, a price — check calibration and fix it with CalibratedClassifierCV. If only the ranking matters, ROC-AUC is enough.',
            ['code', "from sklearn.calibration import CalibratedClassifierCV", 'Log loss is the metric that punishes confident wrong answers, which is exactly what a badly calibrated model produces.'],
            '**Several metrics at once.** cross_validate takes a list, so you can watch precision and recall move together as you tune instead of chasing one and wrecking the other.',
            '**Feature selection** belongs inside the pipeline. Selecting the "best" features by looking at the whole dataset — and then cross-validating — leaks, and the score it produces is fiction.',
            ['aside', 'Whatever you optimise is what you get. Choose the metric with whoever owns the decision, before you tune anything.']
          ] },
          { t: 'task', key: 'regmetrics' },
          { t: 'task', key: 'logloss' },
          { t: 'task', key: 'calib' },
          { t: 'task', key: 'cvmulti' },
          { t: 'task', key: 'fsel' },
          { t: 'task', key: 'full' }
        ] },

      { key: 'm8', name: 'Unsupervised learning',
        blurb: 'Clustering when there are no labels, and reducing dimensions to see what is there.',
        needs: 'the workflow',
        steps: [
          { t: 'read', title: 'When there is no answer column', body: [
            'Sometimes there is no target — you want to know what groups exist, or to squeeze forty columns into two you can plot.',
            '**k-Means** puts every point in exactly one of k round clusters, and needs you to choose k up front:',
            ['code', "from sklearn.cluster import KMeans\nlabels = KMeans(n_clusters=4, n_init=10, random_state=42).fit_predict(X_scaled)", 'Scale first — k-Means measures distance, so an unscaled column in thousands decides everything. The silhouette score and the elbow chart are how you argue for a k.'],
            '**DBSCAN** finds clusters of any shape by density, decides the number itself, and labels sparse points as noise (-1). It trades choosing k for choosing eps.',
            '**Hierarchical clustering** builds a tree of merges, which you cut at whatever height you like — the dendrogram is the most explainable output of the three.',
            '**PCA** is not clustering: it finds the directions the data varies in most, so you can keep 95% of the variation in a fraction of the columns, or plot two of them.',
            ['code', "from sklearn.decomposition import PCA\npca = PCA(n_components=0.95)\nX_small = pca.fit_transform(X_scaled)\npca.explained_variance_ratio_.cumsum()"],
            'The honest caveat: unsupervised results have no accuracy to check them against. A clustering is useful when the groups mean something to someone who knows the business — not when the silhouette score is 0.6.',
            ['aside', 't-SNE and UMAP make beautiful two-dimensional pictures, but the distances between clusters in them mean nothing. Use them to look, never to conclude.']
          ] },
          { t: 'task', key: 'kmeans' },
          { t: 'task', key: 'silhouette' },
          { t: 'task', key: 'dbscan' },
          { t: 'task', key: 'hier' },
          { t: 'task', key: 'pca' }
        ] },

      { key: 'm9', name: 'When it will not work',
        blurb: 'The six errors every scikit-learn user meets, and what each one is telling you.',
        needs: 'the workflow',
        steps: [
          { t: 'read', title: 'Reading scikit-learn\'s complaints', body: [
            'scikit-learn\'s error messages are unusually good once you know what they are pointing at. These six cover most of a first year.',
            ['code', "NotFittedError: This StandardScaler instance is not fitted yet", 'You called transform or predict before fit. In a pipeline this usually means you built the object but never fitted the pipeline.'],
            ['code', "ValueError: could not convert string to float: 'London'", 'A text column reached a model. Encode it — one-hot or ordinal — or route it through a ColumnTransformer.'],
            ['code', "ValueError: Expected 2D array, got 1D array instead", 'A single feature or a single row was passed as a flat list. Reshape it: X.reshape(-1, 1) for one column, X.reshape(1, -1) for one row.'],
            ['code', "ConvergenceWarning: lbfgs failed to converge", 'Usually unscaled features, sometimes just too few iterations. Scale first, then raise max_iter — in that order, because scaling normally fixes it.'],
            ['code', "ValueError: Input contains NaN", 'Impute inside the pipeline. Filling before the split leaks; filling by hand after it is one more thing to get wrong at prediction time.'],
            ['code', "AttributeError: predict_proba is not available when probability=False", "SVC needs probability=True to give probabilities, and it costs a lot of time. If you only need a ranking, use decision_function instead."],
            'And the error that never appears: a score that is too good. If your model is 0.99 on a problem nobody has solved, look for a leaked column before you celebrate.'
          ] },
          { t: 'task', key: 'fixnotfit' },
          { t: 'task', key: 'fixstring' },
          { t: 'task', key: 'fixshape' },
          { t: 'task', key: 'fixconverge' },
          { t: 'task', key: 'fixproba' },
          { t: 'task', key: 'fixleak' }
        ] }
    ]
  });

  window.COURSE.stages.push({
    key: 'test', no: '06', name: 'Sitting a Python coding test',
    blurb: 'What these tests look like, how to work through one, and enough practice to make it dull.',
    units: [

      { key: 't1', name: 'How these tests work',
        blurb: 'The format, the clock, and how to spend the first two minutes.',
        needs: 'stage 01',
        steps: [
          { t: 'read', title: 'What you are walking into', body: [
            'A Python screening test is usually 45 to 90 minutes in a browser, and looks like this: a short brief, a function signature you must keep, some example cases, and a Run button that marks you against test cases — some of which you cannot see.',
            'That format rewards a specific way of working.',
            '**Read the brief twice, and look at the examples first.** The examples are the specification; the prose is the summary. When they disagree, the examples win, because that is what the tests were written from.',
            '**Say the edge cases out loud before you write anything.** Empty input, one item, duplicates, negative numbers, zero, ties, the boundary value in "between 18 and 65". Hidden tests are almost always these — not clever inputs, just the obvious ones you forgot.',
            ['code', "def top_customers(rows, n):\n    # what if rows is empty?\n    # what if n is bigger than len(rows)?\n    # what if two customers tie?\n    ...", 'Three comments, thirty seconds, most of the hidden tests.'],
            '**Write the simple version first, and run it.** A working O(n²) answer scores more than an elegant unfinished one. If a hidden case then times out, you know exactly what to improve and why — and you can say so in a comment.',
            '**Read the failures properly.** The runner tells you the call, what was expected and what you returned. `None` for everything means a missing `return`. One failing case usually means a boundary.',
            '**Watch the clock.** Roughly: a fifth of the time on understanding, half on writing, and the rest on edge cases and tidying. Leave something working on every question rather than perfecting one.',
            ['aside', 'If you are stuck at ten minutes on a question, move on and come back. The marks are per test case, not per question, and a half-finished answer that passes three cases beats a blank one.']
          ] },
          { t: 'problem', id: 'pt-sum-evens' },
          { t: 'problem', id: 'pt-digits' }
        ] },

      { key: 't2', name: 'Counting and dictionaries',
        blurb: 'The single most common shape in a data screen.',
        needs: 'dicts',
        steps: [
          { t: 'read', title: 'If in doubt, it is a dictionary', body: [
            'A striking share of screening questions are the same question wearing different clothes: walk through some data once, keep a running record in a dictionary, then read the answer out of it.',
            ['code', "counts = {}\nfor item in items:\n    counts[item] = counts.get(item, 0) + 1", 'Word frequencies, sales per region, the first non-repeating character, "have I seen this before" — all this shape.'],
            'Two variants are worth having in your fingers:',
            ['code', "from collections import Counter, defaultdict\n\nCounter(items).most_common(3)     # the top three, counted for you\ngroups = defaultdict(list)         # every new key starts as an empty list\ngroups[key].append(row)"],
            'And the trick that turns a slow answer into a fast one: **remember what you have already passed**, so you never search backwards.',
            ['code', "seen = {}\nfor i, n in enumerate(nums):\n    if target - n in seen:\n        return [seen[target - n], i]\n    seen[n] = i", 'The nested-loop version is O(n²); this is O(n). When a hidden test mentions size, that is what it is testing.'],
            'Checking membership in a set or dict is instant; in a list it is a scan. Swapping one for the other is the most common single-line speed-up there is.'
          ] },
          { t: 'problem', id: 'pt-word-count' },
          { t: 'problem', id: 'pt-first-unique' },
          { t: 'problem', id: 'pt-two-sum' },
          { t: 'problem', id: 'pt-anagram' },
          { t: 'problem', id: 'pt-pairs-target' }
        ] },

      { key: 't3', name: 'Strings and parsing',
        blurb: 'Splitting, joining, cleaning and reading structured text.',
        needs: 'strings',
        steps: [
          { t: 'read', title: 'Text questions, and where they hide their traps', body: [
            'String questions look easy and fail on details. The recurring ones:',
            ['code', "'a  b'.split(' ')   # ['a', '', 'b']  — keeps the empty piece\n'a  b'.split()      # ['a', 'b']      — collapses whitespace", 'Use the no-argument version for sentences unless the brief says otherwise. It also strips the ends for you.'],
            ['code', "s.strip('mip')   # a SET of characters to remove, not a substring", 'Everyone reads this as "remove that word" once.'],
            'Normalise before you compare — lowercase, strip, and remove punctuation — and do it in one place so both sides get the same treatment:',
            ['code', "import re\nwords = re.findall(r'[a-z0-9]+', text.lower())", "Splitting on spaces leaves 'hello,' and 'hello' as different words. A regex of letter-runs solves it in one line."],
            'And build strings by joining a list, not by adding in a loop:',
            ['code', "''.join(pieces)", 'Each `+=` on a string builds a whole new string; on a long loop that is the difference between instant and slow.'],
            ['aside', 'Reversing a string is `s[::-1]`. Checking a palindrome is `cleaned == cleaned[::-1]`. Those two lines answer a surprising number of questions.']
          ] },
          { t: 'problem', id: 'pt-title-case' },
          { t: 'problem', id: 'pt-caesar' },
          { t: 'problem', id: 'pt-format-money' },
          { t: 'problem', id: 'pt-log-parse' },
          { t: 'problem', id: 'pt-common-prefix' },
          { t: 'problem', id: 'pt-roman' }
        ] },

      { key: 't4', name: 'Algorithms under time pressure',
        blurb: 'Two pointers, sliding windows, binary search, and what O(n) means for your score.',
        needs: 'loops, lists',
        steps: [
          { t: 'read', title: 'Enough complexity to pass', body: [
            'You do not need a computer science degree. You need to recognise four shapes and know why the slow version fails.',
            '**Nested loop → O(n²).** Fine on 100 items, hopeless on 100,000. Any question whose hidden test mentions a large input is testing whether you avoided one.',
            '**Remembering as you go → O(n).** A dict or set of what you have seen turns a backwards search into a lookup.',
            '**Sliding window → O(n).** When the question asks about every consecutive run of k items, do not re-sum each window: add the number entering and subtract the one leaving.',
            ['code', "window = sum(nums[:k])\nbest = window\nfor i in range(k, len(nums)):\n    window += nums[i] - nums[i - k]\n    best = max(best, window)"],
            '**Sorted data → O(log n).** Binary search halves the search space each step. Two details make or break it:',
            ['code', "while low <= high:          # <=, so a single remaining element is checked\n    mid = (low + high) // 2\n    if nums[mid] < target:\n        low = mid + 1        # mid + 1, not mid, or it never shrinks\n    else:\n        high = mid - 1"],
            'When you cannot see a fast answer, write the slow one, get it passing, and say what you would do instead. "This is O(n²); with a dict of seen values it becomes O(n)" is worth real marks in a review, and costs you thirty seconds.'
          ] },
          { t: 'problem', id: 'pt-binary-search' },
          { t: 'problem', id: 'pt-max-window' },
          { t: 'problem', id: 'pt-fib' },
          { t: 'problem', id: 'pt-parens' },
          { t: 'problem', id: 'pt-missing-number' },
          { t: 'problem', id: 'pt-topk-heap' },
          { t: 'problem', id: 'pt-merge-sorted' },
          { t: 'problem', id: 'pt-rotate-matrix' },
          { t: 'problem', id: 'pt-group-anagrams' }
        ] },

      { key: 't4b', name: 'What it costs: complexity',
        blurb: 'Big-O without the maths degree, and the numbers that tell you which answer they want.',
        needs: 'loops, lists, dicts',
        steps: [
          { t: 'read', title: 'Counting the work, not the seconds', body: [
            'Big-O says how the work grows as the input grows. You need six of them:',
            ['code', "O(1)       a dict or set lookup, an append, arithmetic\nO(log n)   binary search, pushing onto a heap\nO(n)       one pass over the data, `x in my_list`, a slice\nO(n log n) sorting\nO(n^2)     a loop inside a loop, building a string with += in a loop\nO(2^n)     every subset — exponential, and a warning sign"],
            'Constants and lower terms are dropped: 3n + 100 is O(n). What matters is the shape.',
            'In a test, the input SIZE tells you which answer is wanted. A hidden test with 200,000 items is not decoration — it is there to fail the O(n²) solution:',
            ['code', "# O(n^2): re-summing every window\nbest = max(sum(nums[i:i + k]) for i in range(len(nums) - k + 1))\n\n# O(n): slide it\nwindow = sum(nums[:k])\nbest = window\nfor i in range(k, len(nums)):\n    window += nums[i] - nums[i - k]\n    best = max(best, window)"],
            'Space counts too. "O(n) time, O(1) space" is a complete answer; giving only the time is half of one. A recursion n calls deep uses O(n) space on the call stack even if it allocates nothing.',
            ['aside', 'Say the complexity out loud when you finish, before they ask. It is the difference between "it works" and "I know why it works".']
          ] },
          { t: 'quick', title: 'Cost and complexity', groups: ['Algorithms · cost & complexity'] },
          { t: 'problem', id: 'pt-dsa-first-bad' }
        ] },

      { key: 't4c', name: 'The patterns that solve most questions',
        blurb: 'Two pointers, sliding windows, seen-sets, monotonic stacks and intervals.',
        needs: 'complexity',
        steps: [
          { t: 'read', title: 'Six shapes, most of the question bank', body: [
            'Screening questions repeat a small number of shapes. Recognising which one you are looking at is most of the work.',
            '**A seen-set or seen-dict** turns an O(n²) scan into one pass. Two-sum, first duplicate, longest run without a repeat — all the same move:',
            ['code', "seen = {}\nfor i, n in enumerate(nums):\n    if target - n in seen:\n        return [seen[target - n], i]\n    seen[n] = i"],
            '**Two pointers** walk in from both ends of a sorted list — palindromes, pair sums, reversing in place:',
            ['code', "left, right = 0, len(items) - 1\nwhile left < right:\n    ...\n    left += 1\n    right -= 1"],
            '**A sliding window** keeps a running total instead of re-summing, and its left edge only ever moves forwards.',
            '**A monotonic stack** holds the items still waiting for an answer — "how many days until it is warmer" and "the next larger element" are the same question.',
            '**Sort first** when the question mentions overlaps, ranges or "in order": merging intervals is a sort followed by one pass. And **binary search** applies whenever a condition goes false, false, then true and never flips back — that includes searching for an answer, not just for a value.',
            ['aside', 'Say which pattern you are reaching for before you type. "This is a sliding window, so it will be O(n) with constant extra space" is the sentence they are listening for.']
          ] },
          { t: 'quick', title: 'The patterns', groups: ['Algorithms · the patterns'] },
          { t: 'problem', id: 'pt-dsa-longest-unique' },
          { t: 'problem', id: 'pt-dsa-warmer' },
          { t: 'problem', id: 'pt-dsa-intervals' }
        ] },

      { key: 't4d', name: 'Stacks, queues and graphs',
        blurb: 'Depth-first, breadth-first, visited sets, and the grid questions in disguise.',
        needs: 'the patterns',
        steps: [
          { t: 'read', title: 'Searching something with connections', body: [
            'A graph in a coding test is almost always a dict of node to list of neighbours. Two searches cover nearly every question about one:',
            ['code', "# depth-first: a stack. Goes deep first. Answers \"can I get there?\"\nstack, seen = [start], set()\nwhile stack:\n    node = stack.pop()\n    if node in seen:\n        continue\n    seen.add(node)\n    stack.extend(graph.get(node, []))\n\n# breadth-first: a deque. Level by level. Answers \"what is the SHORTEST way?\"\nfrom collections import deque\nqueue, seen = deque([(start, 0)]), {start}\nwhile queue:\n    node, dist = queue.popleft()\n    ...", 'The `seen` set is not optional: without it a cycle runs forever. Mark nodes when you QUEUE them, not when you pop them.'],
            'Use BFS when the question says shortest, fewest or nearest. Use DFS when it asks whether something is reachable, or asks you to explore a whole region.',
            'A **grid is a graph**. Counting islands, flood fill, shortest path through a maze — all the same code with the neighbours computed instead of looked up:',
            ['code', "for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):\n    ny, nx = y + dy, x + dx\n    if 0 <= ny < rows and 0 <= nx < cols and grid[ny][nx] == '1':\n        ...", 'Those four offsets and the bounds check are worth memorising as one unit.'],
            ['aside', 'A stack is a list with append and pop. A queue is a deque with append and popleft. Using `list.pop(0)` for a queue is correct but O(n) each time, and on a big input that is the difference between passing and timing out.']
          ] },
          { t: 'problem', id: 'pt-dsa-dfs-reach' },
          { t: 'problem', id: 'pt-dsa-bfs-steps' },
          { t: 'problem', id: 'pt-dsa-islands' }
        ] },

      { key: 't4e', name: 'Recursion, trees and memoisation',
        blurb: 'Base cases, traversals, and turning an exponential answer into a linear one.',
        needs: 'graphs',
        steps: [
          { t: 'read', title: 'Answer the small case, then use it', body: [
            'Every recursive function is two lines of thinking: what is the answer when there is nothing left, and how does the whole reduce to the parts?',
            ['code', "def depth(node):\n    if node is None:      # the base case — write it FIRST\n        return 0\n    return 1 + max(depth(node['left']), depth(node['right']))", 'Without a base case you get RecursionError — Python stops you at about a thousand frames deep.'],
            'A tree traversal is the same three lines in a different order. In-order gives a binary search tree back in sorted order:',
            ['code', "def in_order(node):\n    if node is None:\n        return []\n    return in_order(node['left']) + [node['value']] + in_order(node['right'])", 'Move the middle line to the front for pre-order, to the end for post-order.'],
            'Plain recursion is often exponential because it recomputes the same sub-answers. **Memoisation** fixes that in one line:',
            ['code', "from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)", 'Or build the answers upwards with a loop and two variables — the same complexity, and no stack to overflow.'],
            '**Dynamic programming** is that idea with a table: an answer for every smaller amount, built up to the one you want. Fewest coins, ways up the stairs, longest common subsequence — the trick is spotting that greedy is wrong and every option has to be tried.',
            ['aside', 'For subsets and permutations, use `itertools.combinations` and `itertools.permutations` rather than writing the recursion — then say out loud that it is O(2ⁿ) or O(n!) and cannot be better.']
          ] },
          { t: 'quick', title: 'Recursion and trees', groups: ['Algorithms · recursion & trees'] },
          { t: 'problem', id: 'pt-dsa-tree-depth' },
          { t: 'problem', id: 'pt-dsa-inorder' },
          { t: 'problem', id: 'pt-dsa-stairs' },
          { t: 'problem', id: 'pt-dsa-coins' },
          { t: 'problem', id: 'pt-dsa-subsets' }
        ] },

      { key: 't5', name: 'Debugging someone else\'s code',
        blurb: 'A whole section of many tests: here is the code, here is the failure, fix it.',
        needs: 'errors',
        steps: [
          { t: 'read', title: 'How to find a bug on the clock', body: [
            'Debugging questions give you working-looking code and failing tests. Work in this order rather than reading the code from the top.',
            '**1. Look at what failed.** Every case failing usually means a missing `return` or a wrong function name. One case failing means a boundary — the empty input, the single item, the tie.',
            '**2. Check the obvious suspects.** In Python, the same handful of bugs come round again and again:',
            ['code', "return inside the loop        # answers after the first pass\nno return at all              # every case gives None\nitems.sort() assigned         # sort returns None\ndef f(x, items=[])            # the default list is shared between calls\nmutating a list while looping # removals skip elements\nlow < high / items[-n:]       # off-by-one and the -0 trap\nif value:                     # a genuine 0 treated as missing", 'Nine debugging questions in ten are on that list.'],
            '**3. Print the state, do not stare at the code.** One `print(x, type(x))` in the loop beats five minutes of reading.',
            '**4. Fix one thing, then run.** Two changes at once and you no longer know which one worked.',
            ['aside', 'Read the brief again after you fix it. Half of "broken" code is doing exactly what it says — just not what was asked for.']
          ] },
          { t: 'problem', id: 'pt-bug-count' },
          { t: 'problem', id: 'pt-bug-mutable' },
          { t: 'problem', id: 'pt-bug-loop-remove' },
          { t: 'problem', id: 'pt-bug-compare' },
          { t: 'problem', id: 'pt-bug-string-build' }
        ] },

      { key: 't6', name: 'Data questions',
        blurb: 'The take-home flavour: records in, an answer out.',
        needs: 'dicts, pandas',
        steps: [
          { t: 'read', title: 'When the test is about data, not puzzles', body: [
            'A data-flavoured test asks you to do in code what you would otherwise do in SQL or pandas: group, join, deduplicate, validate, rank. The data usually arrives as a list of dictionaries — one per row.',
            ['code', "rows = [\n    {'customer': 'a', 'amount': 10, 'updated': '2024-01-01'},\n    {'customer': 'a', 'amount': 5,  'updated': '2024-06-01'},\n]"],
            'Four patterns cover nearly all of them:',
            ['code', "# 1. group and total\ntotals[row['region']] = totals.get(row['region'], 0) + row['amount']\n\n# 2. join — build a lookup first, never a nested loop\nnames = {c['id']: c['name'] for c in customers}\n\n# 3. keep the latest per key — ISO dates compare as text\nif key not in best or row['updated'] >= best[key]['updated']:\n\n# 4. rank or top-N — sort by a tuple to break ties\nsorted(totals.items(), key=lambda kv: (-kv[1], kv[0]))"],
            'Be careful with the small print, because it is where the hidden tests live: does a tie keep the first or the last? Is the range inclusive? Should a missing customer be dropped or kept with a blank? Ask if you can; assume out loud in a comment if you cannot.',
            'And if the test allows pandas, the same four questions are one line each — but only reach for it when the brief invites it. On a plain-Python test, importing pandas to sum a list reads badly.'
          ] },
          { t: 'problem', id: 'pt-latest-per-key' },
          { t: 'problem', id: 'pt-sessionise' },
          { t: 'problem', id: 'pt-rank-scores' },
          { t: 'problem', id: 'pt-cooccurrence' },
          { t: 'problem', id: 'pt-running-total' }
        ] },

      { key: 't6b', name: 'Put it all together',
        blurb: 'Four longer briefs with several requirements each — the take-home shape.',
        needs: 'everything above',
        steps: [
          { t: 'read', title: 'Holding four requirements at once', body: [
            'The questions in this unit are longer than anything so far, and deliberately so. Nothing in them needs an idea you have not already met — the difficulty is holding several requirements in your head at the same time and covering the edges of each.',
            'Work them the way you would a take-home:',
            '**Turn the brief into a checklist first.** Four bullet points in the brief means four things to satisfy, and usually four or five hidden tests. Write them as comments before you write any code, and tick them off.',
            ['code', "def report(sales):\n    # total, rounded to 2dp\n    # per-region totals\n    # top customer, ties alphabetical\n    # distinct customer count\n    # ignore rows with a bad amount\n    ..."],
            '**Do one pass, then answer the questions.** Almost every one of these is: walk the data once building a couple of dictionaries, then read the answers out of them. Trying to compute four things in four separate loops is slower to write and easier to get wrong.',
            '**Return the same shape whatever happens.** An empty input must still return a dict with all four keys, not None — otherwise the caller breaks on the day the file arrives empty. That is nearly always one of the visible tests, and it is telling you something about how the function will be used.',
            '**Read the type rules twice.** "Non-numeric amounts are ignored" means you have to think about `True`, which is an int in Python, and about a string that looks like a number. The hidden tests will contain exactly those.',
            ['aside', 'When you finish one, read the model solution beside your own — not for the answer, which you already have, but for the shape. On a take-home, how the code reads is half of what is being marked.']
          ] },
          { t: 'problem', id: 'pt-cap-report' },
          { t: 'problem', id: 'pt-cap-text' },
          { t: 'problem', id: 'pt-cap-clean' },
          { t: 'problem', id: 'pt-cap-knn-pipeline' }
        ] },

      { key: 't7', name: 'Sit one, properly',
        blurb: 'Timed sittings under real conditions, then read the report.',
        needs: 'everything above',
        steps: [
          { t: 'read', title: 'Before you start the clock', body: [
            'Do these under real conditions: no notes, no searching, one sitting, phone away. The value is entirely in finding out what falls apart under time pressure — and the only way to find that out is to be under time pressure.',
            'After each sitting, read the report properly. For every question you did not fully solve, decide which it was:',
            '**Did not know the shape** → go back to the unit that teaches it and drill the quickfire cards until the line comes cold.\n**Knew it, wrote it wrong** → it is a fluency problem, and fluency comes from repetition, not from reading.\n**Ran out of time** → you spent too long on one question. Practise leaving something working and moving on.\n**Missed an edge case** → write the edge-case comments before you code, next time. Every time.',
            'Sit the short screen until 45 minutes feels comfortable, then the standard test. When you are passing most cases with time left over, you are ready for the real thing.',
            ['aside', 'A real test also watches how you work: readable names, a sensible structure, a comment where a choice was not obvious. Write as though a person will read it, because one will.']
          ] },
          { t: 'mock', n: 3, mins: 45, mix: [1, 2, 2] },
          { t: 'mock', n: 4, mins: 60, mix: [1, 2, 2, 3] },
          { t: 'mock', n: 4, mins: 60, mix: [1, 2, 2, 3], pkg: true },
          { t: 'read', title: 'What to do now', body: [
            'If you have worked through the whole path, you have written a few hundred lines of Python that had to run, recalled several hundred lines from memory, and sat a timed test more than once. That is a genuine base.',
            'Three things keep it:',
            '**Quickfire, little and often.** The cards track what has gone stale — a ten-card round on the way to work is worth more than an hour at the weekend. Weak spots first.',
            '**Sit a mock before every real test.** Not to learn anything new, but so that the format is boring by the time it counts.',
            '**Write something of your own.** A script that reads a file you care about, cleans it and prints five numbers. Every gap it exposes is a real one, and fixing it teaches more than any exercise here.',
            'And when you meet something this course did not cover — and you will — you now have the thing that matters: you can read the error, look up the method, try the small version first, and tell whether the answer is right.',
            ['aside', 'The reference modes stay open for good: Coding for quickfire and the four-level drills, Python tests for the problem bank and timed sittings, Data Science for the theory behind the models.']
          ] }
        ] }
    ]
  });
})();
