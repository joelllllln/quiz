/* Quickfire cards — pandas: grouping, aggregating and summarising. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var GRP = 'pandas · group & aggregate';
  var SUM = 'pandas · cross-tabs & summaries';

  window.SNIPPETS.push(

    { id: 'pd-gb-mean', group: GRP, lvl: 1,
      ask: 'Average "salary" for each "department"',
      a: "df.groupby('department')['salary'].mean()",
      note: 'Group, pick the column, aggregate — the three-step shape of every groupby.' },

    { id: 'pd-gb-sum', group: GRP, lvl: 1,
      ask: 'Total "amount" for each "city"',
      a: "df.groupby('city')['amount'].sum()" },

    { id: 'pd-gb-count', group: GRP, lvl: 1,
      ask: 'How many rows are in each "city"?',
      a: "df.groupby('city').size()",
      note: 'size() counts rows including NaN; count() counts non-missing values per column.' },

    { id: 'pd-gb-count-col', group: GRP, lvl: 2,
      ask: 'Count the non-missing "email" values per "city"',
      a: "df.groupby('city')['email'].count()",
      note: 'The gap between this and .size() is exactly the missing-value count.' },

    { id: 'pd-gb-nunique', group: GRP, lvl: 2,
      ask: 'Count the distinct "customer_id" values in each "city"',
      a: "df.groupby('city')['customer_id'].nunique()",
      note: 'The "how many different customers" question, in one line.' },

    { id: 'pd-gb-reset', group: GRP, lvl: 1,
      ask: 'Mean "salary" per "department", returned as a flat DataFrame rather than an indexed Series',
      a: "df.groupby('department')['salary'].mean().reset_index()",
      alts: ["df.groupby('department', as_index=False)['salary'].mean()"],
      note: 'reset_index() after a groupby is the most-typed follow-up in pandas.' },

    { id: 'pd-gb-multi', group: GRP, lvl: 2,
      ask: 'Total "amount" for each combination of "city" and "product"',
      a: "df.groupby(['city', 'product'])['amount'].sum()",
      note: 'A list of keys gives you a MultiIndex result.' },

    { id: 'pd-gb-agg-list', group: GRP, lvl: 2,
      ask: 'Get both the mean and the max "salary" per "department"',
      a: "df.groupby('department')['salary'].agg(['mean', 'max'])",
      note: 'A list of function names gives you one column per function.' },

    { id: 'pd-gb-agg-dict', group: GRP, lvl: 2,
      ask: 'Per "city": mean of "amount" and max of "age", in one aggregation',
      a: "df.groupby('city').agg({'amount': 'mean', 'age': 'max'})",
      note: 'A dict lets each column get its own aggregation.' },

    { id: 'pd-gb-named', group: GRP, lvl: 3,
      ask: 'Per "city", produce a column named avg_amount holding the mean of "amount" (named aggregation)',
      a: "df.groupby('city').agg(avg_amount=('amount', 'mean'))",
      note: 'Named aggregation gives you clean column names instead of a MultiIndex to flatten.' },

    { id: 'pd-gb-custom', group: GRP, lvl: 3,
      ask: 'Per "city", get the range of "amount" (max minus min) with a lambda',
      a: "df.groupby('city')['amount'].agg(lambda s: s.max() - s.min())",
      note: 'Any function that turns a Series into one number works in agg.' },

    { id: 'pd-gb-transform', group: GRP, lvl: 3,
      ask: 'Add a column holding each row\'s department mean salary, aligned to the original rows',
      a: "df['dept_mean'] = df.groupby('department')['salary'].transform('mean')",
      note: 'transform returns one value per ROW, so it lines up with df; agg returns one per group.' },

    { id: 'pd-gb-zscore', group: GRP, lvl: 3,
      ask: 'Z-score "salary" within each "department" using transform',
      a: "df.groupby('department')['salary'].transform(lambda s: (s - s.mean()) / s.std())",
      note: 'Group-wise standardisation — the classic transform example.' },

    { id: 'pd-gb-filter', group: GRP, lvl: 3,
      ask: 'Keep only rows belonging to a "city" with more than 100 rows',
      a: "df.groupby('city').filter(lambda g: len(g) > 100)",
      note: 'groupby.filter keeps or drops whole groups, returning rows — not an aggregate.' },

    { id: 'pd-gb-apply', group: GRP, lvl: 3,
      ask: 'Take the top 3 rows by "amount" within each "city"',
      a: "df.groupby('city').apply(lambda g: g.nlargest(3, 'amount'))",
      note: 'apply is the escape hatch: slowest, but it can return anything.' },

    { id: 'pd-gb-first', group: GRP, lvl: 2,
      ask: 'Get the first row of each "customer_id" group',
      a: "df.groupby('customer_id').first()",
      note: 'first() skips missing values per column; head(1) returns the literal first row.' },

    { id: 'pd-gb-idxmax', group: GRP, lvl: 3,
      ask: 'For each "city", the index label of the row with the biggest "amount"',
      a: "df.groupby('city')['amount'].idxmax()",
      note: 'Feed the result to df.loc[...] to pull out those whole rows.' },

    { id: 'pd-gb-sort-agg', group: GRP, lvl: 2,
      ask: 'Total "amount" per "city", sorted biggest first',
      a: "df.groupby('city')['amount'].sum().sort_values(ascending=False)",
      note: 'The bread-and-butter "top categories" line.' },

    { id: 'pd-gb-dropna', group: GRP, lvl: 3,
      ask: 'Group by "city" but keep rows where "city" is missing as their own group',
      a: "df.groupby('city', dropna=False)",
      note: 'groupby silently drops NaN keys by default — a classic quiet data loss.' },

    { id: 'pd-gb-describe', group: GRP, lvl: 2,
      ask: 'Full summary statistics of "amount" for every "city"',
      a: "df.groupby('city')['amount'].describe()" },

    { id: 'pd-gb-mean-all', group: GRP, lvl: 2,
      ask: 'Mean of every numeric column per "city"',
      a: "df.groupby('city').mean(numeric_only=True)",
      note: 'numeric_only=True skips text columns rather than erroring.' },

    { id: 'pd-gb-agg-round', group: GRP, lvl: 2,
      ask: 'Mean "salary" per "department", rounded to whole numbers',
      a: "df.groupby('department')['salary'].mean().round()",
      note: 'Aggregations return a Series — every Series method is still available afterwards.' },

    { id: 'pd-gb-pct', group: GRP, lvl: 3,
      ask: 'Each city\'s share of the total "amount", as a proportion',
      a: "df.groupby('city')['amount'].sum() / df['amount'].sum()",
      note: 'Group total over grand total.' },

    /* ---- pivots, cross-tabs and wide summaries ---- */
    { id: 'pd-pivot-table', group: SUM, lvl: 2,
      ask: 'Mean "amount" with "city" down the side and "product" across the top',
      a: "df.pivot_table(index='city', columns='product', values='amount', aggfunc='mean')",
      note: 'pivot_table aggregates duplicates; pivot() refuses them.' },

    { id: 'pd-pivot-total', group: SUM, lvl: 3,
      ask: 'Same pivot of "amount" by city and product, but with row and column totals',
      a: "df.pivot_table(index='city', columns='product', values='amount', margins=True)",
      note: 'margins=True adds the "All" row and column.' },

    { id: 'pd-pivot-fill', group: SUM, lvl: 3,
      ask: 'Pivot "amount" by city and product, showing 0 where a combination never occurs',
      a: "df.pivot_table(index='city', columns='product', values='amount', fill_value=0)",
      note: 'Otherwise empty cells come back as NaN.' },

    { id: 'pd-crosstab', group: SUM, lvl: 2,
      ask: 'Count rows for every combination of "city" and "product" with a cross-tab',
      a: "pd.crosstab(df['city'], df['product'])",
      note: 'crosstab is the frequency-table shortcut — no values column needed.' },

    { id: 'pd-crosstab-norm', group: SUM, lvl: 3,
      ask: 'Cross-tab of "city" against "churn" showing row percentages',
      a: "pd.crosstab(df['city'], df['churn'], normalize='index')",
      note: 'normalize=\'index\' makes each row sum to 1 — the right view for a rate.' },

    { id: 'pd-value-counts-two', group: SUM, lvl: 3,
      ask: 'Count the rows for each pair of "city" and "product" using value_counts',
      a: "df[['city', 'product']].value_counts()",
      note: 'Since pandas 1.1 value_counts works on a whole DataFrame.' },

    { id: 'pd-agg-multi-flat', group: SUM, lvl: 3,
      ask: 'Flatten a MultiIndex column result into single names joined by underscores',
      a: "df.columns = ['_'.join(c) for c in df.columns]",
      alts: ["df.columns = ['_'.join(col) for col in df.columns]"],
      note: 'The standard cleanup after an agg with several functions.' },

    { id: 'pd-groupby-unstack', group: SUM, lvl: 3,
      ask: 'Turn the second grouping level of a grouped Series into columns',
      a: 'grouped.unstack()',
      note: 'unstack pivots an index level up into columns; stack does the reverse.' }
  );
})();
