/* Quickfire cards — pandas: joining frames together and changing their shape. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var JOIN = 'pandas · combine frames';
  var SHP = 'pandas · reshape';

  window.SNIPPETS.push(

    { id: 'pd-concat-rows', group: JOIN, lvl: 1,
      ask: 'Stack the DataFrames df1 and df2 on top of each other',
      a: 'pd.concat([df1, df2])',
      note: 'Same columns assumed; mismatches become NaN. Add ignore_index=True to renumber.' },

    { id: 'pd-concat-reset', group: JOIN, lvl: 2,
      ask: 'Stack df1 and df2 and renumber the index from scratch',
      a: 'pd.concat([df1, df2], ignore_index=True)',
      note: 'Without it you get repeated index labels, which breaks .loc later.' },

    { id: 'pd-concat-cols', group: JOIN, lvl: 2,
      ask: 'Glue df1 and df2 side by side, matching on the index',
      a: 'pd.concat([df1, df2], axis=1)',
      note: 'axis=1 joins columns. Index alignment decides which rows line up.' },

    { id: 'pd-merge-inner', group: JOIN, lvl: 1,
      ask: 'Inner-join orders and customers on "customer_id"',
      a: "pd.merge(orders, customers, on='customer_id')",
      alts: ["orders.merge(customers, on='customer_id')"],
      note: 'Inner is the default: only keys present in both survive.' },

    { id: 'pd-merge-left', group: JOIN, lvl: 1,
      ask: 'Left-join customers onto orders on "customer_id", keeping every order',
      a: "orders.merge(customers, on='customer_id', how='left')",
      note: 'how= takes left, right, inner, outer and cross.' },

    { id: 'pd-merge-outer', group: JOIN, lvl: 2,
      ask: 'Full outer join of df1 and df2 on "id"',
      a: "df1.merge(df2, on='id', how='outer')",
      note: 'Keeps everything from both sides, filling the gaps with NaN.' },

    { id: 'pd-merge-keys', group: JOIN, lvl: 2,
      ask: 'Join df1 and df2 where the key is "id" on the left and "customer_id" on the right',
      a: "df1.merge(df2, left_on='id', right_on='customer_id')",
      note: 'For differently named keys. left_index=True joins on the index instead.' },

    { id: 'pd-merge-suffix', group: JOIN, lvl: 3,
      ask: 'Merge df1 and df2 on "id", labelling clashing columns _left and _right',
      a: "df1.merge(df2, on='id', suffixes=('_left', '_right'))",
      note: 'Defaults are _x and _y, which nobody can read a week later.' },

    { id: 'pd-merge-indicator', group: JOIN, lvl: 3,
      ask: 'Outer-merge df1 and df2 on "id", adding a column showing which side each row came from',
      a: "df1.merge(df2, on='id', how='outer', indicator=True)",
      note: 'The _merge column (left_only / right_only / both) is the fastest join audit there is.' },

    { id: 'pd-merge-many', group: JOIN, lvl: 3,
      ask: 'Merge on "id" while checking the relationship really is one-to-one',
      a: "df1.merge(df2, on='id', validate='one_to_one')",
      note: 'validate raises instead of silently multiplying your row count.' },

    { id: 'pd-join', group: JOIN, lvl: 2,
      ask: 'Join df2 onto df1 using both frames\' indexes',
      a: 'df1.join(df2)',
      note: 'join is the index-based shorthand for merge.' },

    { id: 'pd-map-lookup', group: JOIN, lvl: 2,
      ask: 'Add a "city_name" column by looking "city_code" up in the dict `codes`',
      a: "df['city_name'] = df['city_code'].map(codes)",
      note: 'For a simple lookup, map beats a merge — no key duplication risk.' },

    { id: 'pd-combine-first', group: JOIN, lvl: 3,
      ask: 'Fill the gaps in df1 with the matching values from df2',
      a: 'df1.combine_first(df2)',
      note: 'Patch one frame with another, cell by cell, on the shared index.' },

    { id: 'pd-append-row', group: JOIN, lvl: 2,
      ask: 'Add a single row from the dict `row` to the end of df',
      a: 'df = pd.concat([df, pd.DataFrame([row])], ignore_index=True)',
      note: 'df.append() was removed in pandas 2.0 — this is the replacement.' },

    { id: 'pd-align-check', group: JOIN, lvl: 3,
      ask: 'Check whether two frames are equal, NaNs included',
      a: 'df1.equals(df2)',
      note: '== compares cell by cell and says NaN != NaN; equals() does the sensible thing.' },

    /* ---- reshape ---- */
    { id: 'pd-melt', group: SHP, lvl: 2,
      ask: 'Melt df from wide to long, keeping "id" as the identifier column',
      a: "df.melt(id_vars=['id'])",
      alts: ["pd.melt(df, id_vars=['id'])"],
      note: 'Wide → long: every other column becomes a variable/value pair.' },

    { id: 'pd-melt-named', group: SHP, lvl: 3,
      ask: 'Melt df keeping "id", naming the output columns "metric" and "score"',
      a: "df.melt(id_vars=['id'], var_name='metric', value_name='score')",
      note: 'Naming them up front saves a rename straight afterwards.' },

    { id: 'pd-pivot', group: SHP, lvl: 2,
      ask: 'Pivot long data to wide: "id" down the side, "metric" across, "score" in the cells',
      a: "df.pivot(index='id', columns='metric', values='score')",
      note: 'Long → wide. Errors on duplicate index/column pairs — use pivot_table for those.' },

    { id: 'pd-stack', group: SHP, lvl: 3,
      ask: 'Push the columns of df down into the index',
      a: 'df.stack()',
      note: 'Wide → long, index-first. The result is usually a Series.' },

    { id: 'pd-unstack', group: SHP, lvl: 3,
      ask: 'Pull the innermost index level up into columns',
      a: 'df.unstack()',
      note: 'The inverse of stack. unstack(0) chooses a different level.' },

    { id: 'pd-transpose', group: SHP, lvl: 1,
      ask: 'Flip the rows and columns of df',
      a: 'df.T',
      alts: ['df.transpose()'],
      note: 'df.describe().T is the readable way to look at a wide summary.' },

    { id: 'pd-explode', group: SHP, lvl: 3,
      ask: 'Turn the lists in the "tags" column into one row per tag',
      a: "df.explode('tags')",
      note: 'The fix for a column of lists — one row per element, index repeated.' },

    { id: 'pd-get-dummies', group: SHP, lvl: 2,
      ask: 'One-hot encode the "city" column',
      a: "pd.get_dummies(df, columns=['city'])",
      note: 'drop_first=True removes one level to avoid perfect collinearity in a linear model.' },

    { id: 'pd-get-dummies-series', group: SHP, lvl: 2,
      ask: 'One-hot encode the Series df["city"] on its own',
      a: "pd.get_dummies(df['city'])",
      note: 'Returns a frame of 0/1 columns, one per distinct value.' },

    { id: 'pd-squeeze', group: SHP, lvl: 3,
      ask: 'Turn a one-column DataFrame into a Series',
      a: 'df.squeeze()',
      note: 'Handy when a selection returned a frame and the next step wants a Series.' },

    { id: 'pd-copy', group: SHP, lvl: 1,
      ask: 'Take a real, independent copy of df',
      a: 'df.copy()',
      note: 'Without it you hold a view, and edits raise SettingWithCopyWarning — or silently do nothing.' },

    { id: 'pd-pipe', group: SHP, lvl: 3,
      ask: 'Pass df through your own function `clean` inside a method chain',
      a: 'df.pipe(clean)',
      note: 'pipe keeps custom steps inside the chain instead of breaking it in half.' },

    { id: 'pd-iterrows', group: SHP, lvl: 2,
      ask: 'Loop over df one row at a time, getting the index and the row',
      a: 'for idx, row in df.iterrows():',
      note: 'Know it, then avoid it — it is slow and hands you copies. Vectorise instead.' },

    { id: 'pd-itertuples', group: SHP, lvl: 3,
      ask: 'Loop over the rows of df the fast way, as named tuples',
      a: 'for row in df.itertuples():',
      note: 'Several times faster than iterrows, and it keeps dtypes.' },

    { id: 'pd-to-dict', group: SHP, lvl: 2,
      ask: 'Convert df to a list of row dictionaries',
      a: "df.to_dict('records')",
      alts: ["df.to_dict(orient='records')"],
      note: 'The shape most JSON APIs want.' },

    { id: 'pd-tolist', group: SHP, lvl: 1,
      ask: 'Get the values of the "city" column as a plain Python list',
      a: "df['city'].tolist()",
      alts: ["list(df['city'])"] }
  );
})();
