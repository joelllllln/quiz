/* Quickfire cards — pandas: picking out the rows and columns you actually want. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var SEL = 'pandas · select columns & rows';
  var FIL = 'pandas · filter rows';
  var ORD = 'pandas · sort & rank';

  window.SNIPPETS.push(

    /* ---- selecting ---- */
    { id: 'pd-col', group: SEL, lvl: 1,
      ask: 'Select the single column "age" as a Series',
      a: "df['age']",
      alts: ['df.age'],
      note: 'Square brackets always work; dot access breaks on spaces, digits and names like "count".' },

    { id: 'pd-cols-two', group: SEL, lvl: 1,
      ask: 'Select the columns "age" and "city" as a DataFrame',
      a: "df[['age', 'city']]",
      note: 'A list inside the brackets — the double bracket trips everyone up once.' },

    { id: 'pd-col-frame', group: SEL, lvl: 2,
      ask: 'Select "age" but keep it as a one-column DataFrame, not a Series',
      a: "df[['age']]",
      note: 'One bracket → Series, two → DataFrame. Scikit-learn usually wants the DataFrame.' },

    { id: 'pd-loc-cell', group: SEL, lvl: 1,
      ask: 'Get the value in row label 3, column "age", by label',
      a: "df.loc[3, 'age']",
      note: 'loc is label-based: row label first, then column label.' },

    { id: 'pd-iloc-cell', group: SEL, lvl: 1,
      ask: 'Get the value in the 4th row, 2nd column, by position',
      a: 'df.iloc[3, 1]',
      note: 'iloc is position-based and zero-indexed — the 4th row is index 3.' },

    { id: 'pd-iloc-row', group: SEL, lvl: 1,
      ask: 'Get the very first row of df, by position',
      a: 'df.iloc[0]',
      note: 'Comes back as a Series, with the column names as its index.' },

    { id: 'pd-iloc-rows', group: SEL, lvl: 1,
      ask: 'Get the first ten rows of df by position, as a DataFrame',
      a: 'df.iloc[:10]',
      alts: ['df.iloc[0:10]'],
      note: 'Same slicing rules as a Python list — the end is excluded.' },

    { id: 'pd-iloc-last', group: SEL, lvl: 2,
      ask: 'Get the last row of df',
      a: 'df.iloc[-1]',
      note: 'Negative positions count from the end, exactly like lists.' },

    { id: 'pd-iloc-block', group: SEL, lvl: 2,
      ask: 'Get rows 10 to 19 and the first three columns, by position',
      a: 'df.iloc[10:20, :3]',
      note: 'Rows before the comma, columns after — both position-based.' },

    { id: 'pd-loc-rows-cols', group: SEL, lvl: 2,
      ask: 'Get all rows but only the columns "age" and "city", using loc',
      a: "df.loc[:, ['age', 'city']]",
      note: 'The bare colon means "every row".' },

    { id: 'pd-loc-slice', group: SEL, lvl: 3,
      ask: 'Using loc, get every column from "age" through to "city" inclusive',
      a: "df.loc[:, 'age':'city']",
      note: 'loc slices are inclusive of the end label — unlike every other slice in Python.' },

    { id: 'pd-at', group: SEL, lvl: 2,
      ask: 'Read a single cell fast: row label 5, column "age"',
      a: "df.at[5, 'age']",
      note: 'at/iat are the scalar-only versions of loc/iloc, and much quicker in a loop.' },

    { id: 'pd-iat', group: SEL, lvl: 3,
      ask: 'Read the cell at row position 0, column position 2, as fast as possible',
      a: 'df.iat[0, 2]',
      note: 'Positional twin of .at.' },

    { id: 'pd-select-dtypes', group: SEL, lvl: 2,
      ask: 'Select only the numeric columns of df',
      a: "df.select_dtypes(include='number')",
      alts: ["df.select_dtypes(include=['number'])", 'df.select_dtypes(include=np.number)'],
      note: 'The tidy way to feed a model only what it can handle.' },

    { id: 'pd-select-obj', group: SEL, lvl: 2,
      ask: 'Select only the text (object) columns of df',
      a: "df.select_dtypes(include='object')",
      note: 'Pair it with exclude= to get everything else.' },

    { id: 'pd-filter-like', group: SEL, lvl: 3,
      ask: 'Select every column whose name contains "amount"',
      a: "df.filter(like='amount')",
      note: 'df.filter(regex=...) takes a pattern instead; axis=0 filters row labels.' },

    { id: 'pd-drop-col', group: SEL, lvl: 1,
      ask: 'Drop the column "id" from df, returning a new DataFrame',
      a: "df.drop(columns=['id'])",
      alts: ["df.drop(columns='id')", "df.drop('id', axis=1)"],
      note: 'columns= is clearer than axis=1 and harder to get backwards.' },

    { id: 'pd-drop-rows', group: SEL, lvl: 2,
      ask: 'Drop the rows with index labels 0 and 1',
      a: 'df.drop(index=[0, 1])',
      alts: ['df.drop([0, 1])'],
      note: 'By label, not position — after a filter those are not the same thing.' },

    { id: 'pd-rename', group: SEL, lvl: 1,
      ask: 'Rename the column "old" to "new"',
      a: "df.rename(columns={'old': 'new'})",
      note: 'A dict of just the ones you are changing; the rest are left alone.' },

    { id: 'pd-rename-all', group: SEL, lvl: 2,
      ask: 'Replace every column name with the list `new_names`',
      a: 'df.columns = new_names',
      note: 'Positional — the list must be exactly as long as the frame is wide.' },

    { id: 'pd-cols-lower', group: SEL, lvl: 2,
      ask: 'Lowercase every column name in df',
      a: 'df.columns = df.columns.str.lower()',
      note: 'The .str accessor works on the columns Index too — chain .str.replace(\' \', \'_\') for tidy names.' },

    { id: 'pd-cols-strip', group: SEL, lvl: 3,
      ask: 'Strip whitespace from every column name',
      a: 'df.columns = df.columns.str.strip()',
      note: 'Trailing spaces in headers are the classic "KeyError on a column I can see".' },

    { id: 'pd-add-col', group: SEL, lvl: 1,
      ask: 'Add a new column "total" equal to price times quantity',
      a: "df['total'] = df['price'] * df['quantity']",
      note: 'Vectorised — no loop, and it lines up on the index automatically.' },

    { id: 'pd-assign', group: SEL, lvl: 3,
      ask: 'Add a "total" column of price times quantity using assign, so the chain keeps flowing',
      a: "df.assign(total=df['price'] * df['quantity'])",
      note: 'assign returns a new frame, which keeps method chains readable and side-effect free.' },

    { id: 'pd-insert', group: SEL, lvl: 3,
      ask: 'Insert the Series `s` as a new column called "flag" in position 0',
      a: "df.insert(0, 'flag', s)",
      note: 'The only way to control where a new column lands. It modifies df in place.' },

    { id: 'pd-set-index', group: SEL, lvl: 2,
      ask: 'Make the "id" column the index of df',
      a: "df.set_index('id')",
      note: 'Add inplace=True or reassign; on its own it returns a copy.' },

    { id: 'pd-reset-index', group: SEL, lvl: 1,
      ask: 'Turn the index back into a normal column',
      a: 'df.reset_index()',
      note: 'The other half of set_index — and what you almost always want after a groupby.' },

    { id: 'pd-reset-drop', group: SEL, lvl: 1,
      ask: 'Renumber the index 0,1,2… after filtering, throwing the old index away',
      a: 'df.reset_index(drop=True)',
      note: 'drop=True stops the old index becoming a stray column.' },

    /* ---- filtering ---- */
    { id: 'pd-mask-gt', group: FIL, lvl: 1,
      ask: 'Keep only the rows where "age" is over 30',
      a: "df[df['age'] > 30]",
      note: 'The bracket holds a boolean Series — one True/False per row.' },

    { id: 'pd-mask-eq', group: FIL, lvl: 1,
      ask: 'Keep only the rows where "city" equals "London"',
      a: "df[df['city'] == 'London']",
      note: 'Two equals signs — one would try to assign.' },

    { id: 'pd-mask-ne', group: FIL, lvl: 1,
      ask: 'Keep the rows where "status" is not "closed"',
      a: "df[df['status'] != 'closed']" },

    { id: 'pd-mask-and', group: FIL, lvl: 1,
      ask: 'Keep rows where "age" is over 30 AND "city" is "London"',
      a: "df[(df['age'] > 30) & (df['city'] == 'London')]",
      note: 'Use & not "and", and bracket each condition — & binds tighter than >.' },

    { id: 'pd-mask-or', group: FIL, lvl: 1,
      ask: 'Keep rows where "city" is "London" OR "Leeds"',
      a: "df[(df['city'] == 'London') | (df['city'] == 'Leeds')]",
      note: 'For more than two, isin() reads far better.' },

    { id: 'pd-mask-not', group: FIL, lvl: 2,
      ask: 'Keep the rows where "active" is not True, using the NOT operator',
      a: "df[~df['active']]",
      note: '~ is elementwise NOT. Python\'s "not" only works on single values.' },

    { id: 'pd-isin', group: FIL, lvl: 1,
      ask: 'Keep rows where "city" is one of London, Leeds or Bath',
      a: "df[df['city'].isin(['London', 'Leeds', 'Bath'])]",
      note: 'The readable alternative to a chain of ORs.' },

    { id: 'pd-not-isin', group: FIL, lvl: 2,
      ask: 'Keep rows where "city" is NOT one of the values in `bad_cities`',
      a: "df[~df['city'].isin(bad_cities)]",
      note: 'Tilde on the outside — negate the whole mask.' },

    { id: 'pd-between', group: FIL, lvl: 2,
      ask: 'Keep rows where "age" is between 18 and 65 inclusive',
      a: "df[df['age'].between(18, 65)]",
      note: 'Inclusive at both ends by default; inclusive=\'neither\' changes that.' },

    { id: 'pd-notna-filter', group: FIL, lvl: 1,
      ask: 'Keep only rows where "email" is not missing',
      a: "df[df['email'].notna()]",
      alts: ["df[df['email'].notnull()]"],
      note: 'notna() is the positive twin of isna().' },

    { id: 'pd-isna-filter', group: FIL, lvl: 1,
      ask: 'Keep only the rows where "email" IS missing',
      a: "df[df['email'].isna()]",
      note: 'Look at these rows before you decide how to fill them.' },

    { id: 'pd-query', group: FIL, lvl: 2,
      ask: 'Filter df to age over 30 using query()',
      a: "df.query('age > 30')",
      note: 'Reads like SQL; @name refers to a Python variable inside the string.' },

    { id: 'pd-query-var', group: FIL, lvl: 3,
      ask: 'Use query() to keep rows where "age" is above the Python variable `cutoff`',
      a: "df.query('age > @cutoff')",
      note: 'The @ is what lets a query string see your local variables.' },

    { id: 'pd-str-contains', group: FIL, lvl: 2,
      ask: 'Keep rows where "name" contains "smith", case-insensitively',
      a: "df[df['name'].str.contains('smith', case=False, na=False)]",
      note: 'na=False stops missing values raising; without it you get a NaN-in-mask error.' },

    { id: 'pd-str-startswith', group: FIL, lvl: 2,
      ask: 'Keep rows where "code" starts with "AB"',
      a: "df[df['code'].str.startswith('AB', na=False)]" },

    { id: 'pd-nlargest', group: FIL, lvl: 1,
      ask: 'Get the 10 rows with the biggest "amount"',
      a: "df.nlargest(10, 'amount')",
      note: 'Faster and clearer than sort_values().head(10).' },

    { id: 'pd-nsmallest', group: FIL, lvl: 2,
      ask: 'Get the 5 rows with the smallest "amount"',
      a: "df.nsmallest(5, 'amount')" },

    { id: 'pd-loc-mask-col', group: FIL, lvl: 2,
      ask: 'Get the "email" column only for rows where "age" is over 30',
      a: "df.loc[df['age'] > 30, 'email']",
      note: 'Mask for the rows, label for the columns — one clean loc.' },

    { id: 'pd-loc-set', group: FIL, lvl: 2,
      ask: 'Set "status" to "senior" for every row where "age" is over 65',
      a: "df.loc[df['age'] > 65, 'status'] = 'senior'",
      note: 'Assign through .loc. Chained assignment — df[mask][\'status\'] = … — silently does nothing.' },

    { id: 'pd-where', group: FIL, lvl: 3,
      ask: 'Keep "amount" where it is under 1000 and put NaN everywhere else',
      a: "df['amount'].where(df['amount'] < 1000)",
      note: 'where keeps the True cells; mask() is its mirror image and blanks them.' },

    { id: 'pd-mask-method', group: FIL, lvl: 3,
      ask: 'Replace "amount" with NaN wherever it is negative, using mask()',
      a: "df['amount'].mask(df['amount'] < 0)",
      note: 'mask blanks the True cells — the opposite of where.' },

    { id: 'pd-any-mask', group: FIL, lvl: 2,
      ask: 'Check whether any row has "amount" above 1,000,000',
      a: "(df['amount'] > 1000000).any()",
      note: '.all() asks the same question of every row.' },

    { id: 'pd-sum-mask', group: FIL, lvl: 1,
      ask: 'Count how many rows have "amount" above 100',
      a: "(df['amount'] > 100).sum()",
      note: 'Summing a boolean counts the Trues — the quickest count in pandas.' },

    /* ---- sorting & ranking ---- */
    { id: 'pd-sort-values', group: ORD, lvl: 1,
      ask: 'Sort df by "amount", smallest first',
      a: "df.sort_values('amount')",
      note: 'Ascending by default; it returns a new frame.' },

    { id: 'pd-sort-desc', group: ORD, lvl: 1,
      ask: 'Sort df by "amount", biggest first',
      a: "df.sort_values('amount', ascending=False)",
      note: 'The one you want for "top spenders" questions.' },

    { id: 'pd-sort-multi', group: ORD, lvl: 2,
      ask: 'Sort by "city" A–Z, then by "amount" biggest first within each city',
      a: "df.sort_values(['city', 'amount'], ascending=[True, False])",
      note: 'ascending takes a list matching the columns.' },

    { id: 'pd-sort-index', group: ORD, lvl: 2,
      ask: 'Sort df by its index',
      a: 'df.sort_index()',
      note: 'Essential after a groupby or a concat that scrambled the order.' },

    { id: 'pd-sort-na', group: ORD, lvl: 3,
      ask: 'Sort by "amount" putting the missing values first',
      a: "df.sort_values('amount', na_position='first')",
      note: 'NaNs go last by default, whichever direction you sort.' },

    { id: 'pd-rank', group: ORD, lvl: 2,
      ask: 'Rank the "score" column, best score getting rank 1',
      a: "df['score'].rank(ascending=False)",
      note: 'method=\'dense\' avoids gaps after ties; \'min\' gives competition ranking.' },

    { id: 'pd-cumsum', group: ORD, lvl: 2,
      ask: 'Running total of the "amount" column',
      a: "df['amount'].cumsum()",
      note: 'cummax, cummin and cumprod follow the same pattern.' },

    { id: 'pd-pct-of-total', group: ORD, lvl: 2,
      ask: 'Each row\'s "amount" as a share of the column total',
      a: "df['amount'] / df['amount'].sum()",
      note: 'Multiply by 100 for a percentage.' }
  );
})();
