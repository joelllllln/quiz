/* Quickfire cards — pandas at the level people get caught out at: the warnings,
   the copies, the speed, and the questions an interviewer asks after "can you use pandas". */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var GOT = 'pandas · gotchas & copies';
  var SPD = 'pandas · speed & memory';
  var IDX = 'pandas · the index & multi-index';

  window.SNIPPETS.push(

    /* ---- gotchas & copies ---- */
    { id: 'pg-copy', group: GOT, lvl: 2,
      ask: 'Take the rows of df where "age" is over 30 as a slice you can safely edit, with no SettingWithCopyWarning',
      a: "small = df[df['age'] > 30].copy()",
      note: 'The warning means pandas cannot tell whether you are editing a view or a copy. .copy() settles it.' },

    { id: 'pg-loc-assign', group: GOT, lvl: 2,
      ask: 'Set "band" to high for the rows where "score" is above 90, in place, the safe way',
      a: "df.loc[df['score'] > 90, 'band'] = 'high'",
      note: 'One .loc call does the selecting and the assigning together. Chained brackets are what causes the warning.' },

    { id: 'pg-chained-bad', group: GOT, lvl: 3,
      ask: 'Name the pattern that causes SettingWithCopyWarning, in three words',
      a: 'chained indexing assignment',
      note: 'df[mask]["col"] = x — the first bracket may already have made a copy, so the write can vanish.' },

    { id: 'pg-inplace', group: GOT, lvl: 2,
      ask: 'Rebind df to a version with missing values dropped, without using inplace',
      a: 'df = df.dropna()',
      note: 'inplace=True saves no memory, returns nothing, and is being retired. Reassigning is the house style now.' },

    { id: 'pg-and-brackets', group: GOT, lvl: 2,
      ask: 'Filter df where "age" is over 30 AND "city" is Leeds',
      a: "df[(df['age'] > 30) & (df['city'] == 'Leeds')]",
      note: 'Use & and |, not and/or, and bracket each condition — & binds tighter than the comparison.' },

    { id: 'pg-nan-compare', group: GOT, lvl: 3,
      ask: 'Count the missing values in "age" — remembering NaN does not equal itself',
      a: "df['age'].isna().sum()",
      note: "df['age'] == np.nan is always False. Every missing-value test goes through isna/notna." },

    { id: 'pg-merge-indicator', group: GOT, lvl: 3,
      ask: 'Left-join customers onto orders on "customer_id", marking which side each row came from',
      a: "orders.merge(customers, on='customer_id', how='left', indicator=True)",
      note: 'The _merge column tells you what failed to match — check it before you trust any join.' },

    { id: 'pg-merge-rows-check', group: GOT, lvl: 2,
      ask: 'Check a merge did not multiply your rows, by comparing shapes before and after',
      a: 'before = len(df)\nafter = len(merged)',
      note: 'A many-to-many join silently explodes row counts. Compare the counts every single time.' },

    { id: 'pg-reset-drop', group: GOT, lvl: 2,
      ask: 'Reset the index of df without keeping the old one as a column',
      a: 'df = df.reset_index(drop=True)',
      note: 'Forget drop=True and you collect index columns every time you filter.' },

    { id: 'pg-sort-stable', group: GOT, lvl: 3,
      ask: 'Sort df by "score" descending, putting missing values last',
      a: "df.sort_values('score', ascending=False, na_position='last')",
      note: 'na_position defaults to last already — say it out loud when it matters to the answer.' },

    { id: 'pg-apply-axis', group: GOT, lvl: 3,
      ask: 'Apply the function `score_row` to each ROW of df, not each column',
      a: 'df.apply(score_row, axis=1)',
      note: 'axis=1 means "across the columns, row by row". Getting the axis backwards is the most common pandas bug.' },

    /* ---- speed & memory ---- */
    { id: 'ps-vectorise', group: SPD, lvl: 2,
      ask: 'Double every value in "price" without a loop or apply',
      a: "df['price'] * 2",
      note: 'Vectorised arithmetic runs in C over the whole column — typically 100x faster than apply.' },

    { id: 'ps-np-where', group: SPD, lvl: 2,
      ask: 'Make a "band" column that is high where "score" beats 90 and low otherwise, vectorised',
      a: "df['band'] = np.where(df['score'] > 90, 'high', 'low')",
      note: 'The vectorised if/else. For more than two outcomes, np.select or pd.cut.' },

    { id: 'ps-select', group: SPD, lvl: 3,
      ask: 'Choose between the vectorised outcomes in `choices` by the tests in `conditions`, falling back to other',
      a: "np.select(conditions, choices, default='other')",
      note: 'The clean replacement for a chain of if/elif inside apply.' },

    { id: 'ps-map-dict', group: SPD, lvl: 2,
      ask: 'Translate the codes in "code" through the lookup dict `lookup`',
      a: "df['code'].map(lookup)",
      note: 'A dict lookup through map beats apply with a function, and unmapped values become NaN.' },

    { id: 'ps-usecols', group: SPD, lvl: 2,
      ask: 'Read only the "date" and "amount" columns from a big sales.csv',
      a: "pd.read_csv('sales.csv', usecols=['date', 'amount'])",
      note: 'The cheapest speed-up on a wide file: never load what you will not use.' },

    { id: 'ps-chunksize', group: SPD, lvl: 3,
      ask: 'Read sales.csv in blocks of 100000 rows instead of all at once',
      a: "pd.read_csv('sales.csv', chunksize=100000)",
      note: 'You get an iterator of frames — loop, aggregate each, and combine at the end.' },

    { id: 'ps-dtype-read', group: SPD, lvl: 3,
      ask: 'Read sales.csv telling pandas that "id" is a string',
      a: "pd.read_csv('sales.csv', dtype={'id': 'str'})",
      note: 'Stops ids with leading zeros losing them, and saves pandas guessing.' },

    { id: 'ps-parquet-save', group: SPD, lvl: 2,
      ask: 'Save df to parquet at "sales.parquet" without the index',
      a: "df.to_parquet('sales.parquet', index=False)",
      note: 'Smaller, faster and it keeps the dtypes — the right format for anything you will read again.' },

    { id: 'ps-concat-once', group: SPD, lvl: 3,
      ask: 'Combine the list of frames `frames` into one, in a single call',
      a: 'pd.concat(frames, ignore_index=True)',
      note: 'Collect frames in a list and concat once. Concatenating inside a loop copies everything, every time.' },

    /* ---- the index & multi-index ---- */
    { id: 'pi-set-index', group: IDX, lvl: 2,
      ask: 'Make "customer_id" the index of df',
      a: "df = df.set_index('customer_id')",
      note: 'A meaningful index makes .loc lookups and joins both faster and clearer.' },

    { id: 'pi-loc-label', group: IDX, lvl: 2,
      ask: 'Get the row whose index label is C123',
      a: "df.loc['C123']",
      note: '.loc is by LABEL, .iloc is by POSITION. That one sentence answers most index questions.' },

    { id: 'pi-iloc-pos', group: IDX, lvl: 1,
      ask: 'Get the third row of df by position',
      a: 'df.iloc[2]',
      note: 'Counting from zero, so the third row is index 2.' },

    { id: 'pi-index-unique', group: IDX, lvl: 3,
      ask: 'Check whether the index of df has any repeated labels',
      a: 'df.index.is_unique',
      note: 'A duplicated index makes .loc return a frame instead of a row, which breaks code downstream.' },

    { id: 'pi-sort-index', group: IDX, lvl: 2,
      ask: 'Sort df into index order',
      a: 'df = df.sort_index()',
      note: 'Required before slicing a multi-index by range, and it silences the performance warning.' },

    { id: 'pi-groupby-two', group: IDX, lvl: 2,
      ask: 'Total "amount" by "region" and "month" together',
      a: "df.groupby(['region', 'month'])['amount'].sum()",
      note: 'Grouping by two keys gives you a multi-index — one level per key.' },

    { id: 'pi-multi-select', group: IDX, lvl: 3,
      ask: 'Get the rows of the multi-indexed df where the first level is North',
      a: "df.loc['North']",
      note: 'For deeper levels: df.loc[("North", "May")], or df.xs("May", level="month").' },

    { id: 'pi-xs', group: IDX, lvl: 3,
      ask: 'Take a cross-section of df where the "month" level equals May',
      a: "df.xs('May', level='month')",
      note: 'The clean way to slice one level without spelling out the ones above it.' },

    { id: 'pi-droplevel', group: IDX, lvl: 3,
      ask: 'Flatten a grouped result back into ordinary columns',
      a: 'grouped.reset_index()',
      note: 'Nearly always what you want before plotting or writing to a file.' },

    { id: 'pi-flatten-cols', group: IDX, lvl: 3,
      ask: 'Flatten the two-level column names of `agg` into single underscored names',
      a: "agg.columns = ['_'.join(c) for c in agg.columns]",
      note: 'What you need after a groupby().agg() with several functions per column.' },

    { id: 'pi-align', group: IDX, lvl: 3,
      ask: 'Explain in one word why adding two Series can produce unexpected NaNs',
      a: 'alignment',
      note: 'pandas lines Series up by INDEX before adding, not by position. Reset both indexes if you meant position.' }
  );
})();
