/* Coding tasks — data analytics, stage 05 and 06: summarising by group, and
   putting two tables together. */
(function () {
  window.CODETASKS = window.CODETASKS || [];
  var S5 = '29 · Grouping, all together';
  var S6 = '30 · Joining and reshaping, together';

  window.CODETASKS.push(

    { key: 'dagroup', group: S5, lvl: 1, title: 'Total per group',
      ask: 'Total the amount column of df for each region, biggest first.',
      why: 'The single most-asked question in analytics: which group has the most.',
      mcq: {
        q: 'Which line totals amount per region, biggest first?',
        correct: "df.groupby('region')['amount'].sum().sort_values(ascending=False)",
        wrong: [
          "df.groupby('region').sum('amount').sort_values(ascending=False)",
          "df.groupby('amount')['region'].sum().sort_values(ascending=False)",
          "df['amount'].groupby('region').sum().sort_values(ascending=False)"],
        explain: "Group by the LABEL column, pick the NUMBER column, then say what to work out. Grouping by amount would make one group per distinct amount, which is nonsense." },
      lines: [
        "totals = df.groupby('region')['amount'].sum()",
        "totals = totals.sort_values(ascending=False)",
        "print(totals)"],
      decoys: ["totals = df.groupby('amount')['region'].sum()", "totals = df['amount'].groupby('region').sum()"],
      written: {
        prompt: 'Write the code: total amount per region into totals, sort biggest first, and print it.',
        solution: "totals = df.groupby('region')['amount'].sum()\ntotals = totals.sort_values(ascending=False)\nprint(totals)",
        must: ["groupby('region')", "['amount']", '.sum()', 'sort_values'] },
      walk: [
        ["totals = df.groupby('region')['amount'].sum()", "Three decisions in one line: group by region, look at amount, add it up."],
        ["totals = totals.sort_values(ascending=False)", "Sorted, because nobody reads an unsorted league table."],
        ["print(totals)", "The result is a Series with the regions as its index — .reset_index() turns it back into an ordinary table when you need one."]] },

    { key: 'dagroupmulti', group: S5, lvl: 2, title: 'Several numbers per group',
      ask: 'For each region of df, report the number of orders, the total amount and the average amount, with tidy column names.',
      why: 'One line that answers three questions at once is what a summary table actually is.',
      mcq: {
        q: 'Which call produces count, total and mean per region?',
        correct: "df.groupby('region')['amount'].agg(['count', 'sum', 'mean'])",
        wrong: [
          "df.groupby('region')['amount'].count().sum().mean()",
          "df.groupby('region').agg('count', 'sum', 'mean')",
          "df.groupby('region')['amount'].apply(['count', 'sum', 'mean'])"],
        explain: "agg takes a LIST of what you want and gives one column per entry. Chaining count().sum().mean() would collapse the answer to a single number." },
      lines: [
        "summary = df.groupby('region')['amount'].agg(['count', 'sum', 'mean'])",
        "summary.columns = ['orders', 'total', 'average']",
        "summary = summary.round(2).sort_values('total', ascending=False)",
        "print(summary)"],
      decoys: ["summary = df.groupby('region').agg('count', 'sum', 'mean')", "summary.columns = ['total']"],
      written: {
        prompt: 'Write the code: aggregate count, sum and mean of amount per region, rename the columns to orders, total and average, round to 2 places and sort by total.',
        solution: "summary = df.groupby('region')['amount'].agg(['count', 'sum', 'mean'])\nsummary.columns = ['orders', 'total', 'average']\nsummary = summary.round(2).sort_values('total', ascending=False)\nprint(summary)",
        must: ["agg(['count', 'sum', 'mean'])", 'summary.columns', 'round(2)', 'sort_values'] },
      walk: [
        ["summary = df.groupby('region')['amount'].agg(['count', 'sum', 'mean'])", "One row per region, one column per statistic."],
        ["summary.columns = ['orders', 'total', 'average']", "Rename them into the words your audience uses. 'count' means nothing to a reader; 'orders' does."],
        ["summary = summary.round(2).sort_values('total', ascending=False)", "Round for display and sort by the column the question is about."],
        ["print(summary)", "This table, with those column names, is a finished answer."]] },

    { key: 'dagroupcount', group: S5, lvl: 1, title: 'How many in each group',
      ask: 'Count how many rows of df fall in each region, as a proper two-column table.',
      why: 'The counts have to come out as a table you can join, chart or export — not as an index nobody can use.',
      mcq: {
        q: 'Which line gives a two-column table of region and count?',
        correct: "df.groupby('region').size().reset_index(name='orders')",
        wrong: [
          "df.groupby('region').count().reset_index(name='orders')",
          "df.groupby('region').size().rename('orders')",
          "df['region'].value_counts().reset_index(name='orders')"],
        explain: "size() counts ROWS per group, including ones with missing values, and reset_index(name=...) names the count column. count() gives one count per column instead of one number per group." },
      lines: [
        "counts = df.groupby('region').size().reset_index(name='orders')",
        "counts = counts.sort_values('orders', ascending=False)",
        "print(counts)"],
      decoys: ["counts = df.groupby('region').count()", "counts = df.groupby('region').size().rename('orders')"],
      written: {
        prompt: 'Write the code: count the rows per region into a table with an orders column, sort biggest first, and print it.',
        solution: "counts = df.groupby('region').size().reset_index(name='orders')\ncounts = counts.sort_values('orders', ascending=False)\nprint(counts)",
        must: ['groupby', '.size()', "reset_index(name='orders')"] },
      walk: [
        ["counts = df.groupby('region').size().reset_index(name='orders')", "size() is the row count; reset_index turns the group labels back into a normal column."],
        ["counts = counts.sort_values('orders', ascending=False)", "Now it sorts like any other table, because it IS one."],
        ["print(counts)", "Two columns, ready to chart or to merge onto something else."]] },

    { key: 'dagrouptop', group: S5, lvl: 2, title: 'The best in each group',
      ask: 'Find the single biggest order in each region of df, keeping the customer name.',
      why: '"Top item per category" is a question you will be asked constantly, and the tidy answer is one line.',
      mcq: {
        q: 'Which line keeps the highest-amount row per region?',
        correct: "df.sort_values('amount', ascending=False).drop_duplicates(subset=['region'])",
        wrong: [
          "df.groupby('region')['amount'].max()",
          "df.drop_duplicates(subset=['region']).sort_values('amount', ascending=False)",
          "df.groupby('region').max()"],
        explain: "Sorting first and then keeping the first row per region gives you the WHOLE row, customer name and all. groupby().max() gives only the number, and taking the max of every column separately invents rows that never existed." },
      lines: [
        "ranked = df.sort_values('amount', ascending=False)",
        "best = ranked.drop_duplicates(subset=['region'])",
        "print(best[['region', 'customer', 'amount']])"],
      decoys: ["best = df.groupby('region').max()", "best = df.drop_duplicates(subset=['region']).sort_values('amount')"],
      written: {
        prompt: 'Write the code: sort df by amount biggest first, keep one row per region, and print region, customer and amount.',
        solution: "ranked = df.sort_values('amount', ascending=False)\nbest = ranked.drop_duplicates(subset=['region'])\nprint(best[['region', 'customer', 'amount']])",
        must: ['sort_values', 'ascending=False', "drop_duplicates(subset=['region'])"] },
      walk: [
        ["ranked = df.sort_values('amount', ascending=False)", "Biggest first, so the first row of each region is its winner."],
        ["best = ranked.drop_duplicates(subset=['region'])", "keep defaults to 'first', which after that sort means the largest."],
        ["print(best[['region', 'customer', 'amount']])", "The whole row survived, so you can say WHO the biggest order belonged to."]] },

    { key: 'dapivot', group: S5, lvl: 2, title: 'A cross-tab of two things',
      ask: 'Build a table of total amount with one row per region and one column per month, zeros where there was nothing.',
      why: 'Rows down, categories across — the shape every spreadsheet report ends up in.',
      mcq: {
        q: 'Which call builds that table?',
        correct: "pd.pivot_table(df, index='region', columns='month', values='amount', aggfunc='sum', fill_value=0)",
        wrong: [
          "pd.pivot_table(df, index='region', columns='month', values='amount')",
          "df.pivot(index='region', columns='month', values='amount')",
          "pd.crosstab(df['region'], df['month'], values='amount')"],
        explain: "pivot_table AGGREGATES, which is what you need when a region has several rows in a month; plain pivot raises on duplicates. Without aggfunc you get the mean, and without fill_value the empty cells are NaN." },
      lines: [
        "table = pd.pivot_table(df, index='region', columns='month',",
        "                       values='amount', aggfunc='sum', fill_value=0)",
        "print(table)"],
      decoys: ["table = df.pivot(index='region', columns='month', values='amount')", "                       values='amount', aggfunc='count')"],
      written: {
        prompt: 'Write the code: pivot df to region down the side, month across the top, summed amount inside, and zeros for the gaps.',
        solution: "table = pd.pivot_table(df, index='region', columns='month',\n                       values='amount', aggfunc='sum', fill_value=0)\nprint(table)",
        must: ['pivot_table', "index='region'", "columns='month'", "aggfunc='sum'", 'fill_value=0'] },
      walk: [
        ["table = pd.pivot_table(df, index='region', columns='month',", "index is what goes down the side, columns is what goes across the top."],
        ["                       values='amount', aggfunc='sum', fill_value=0)", "values is what fills the cells, aggfunc is how several rows are combined, fill_value handles the combinations that never happened."],
        ["print(table)", "A month with a whole column of zeros usually means the data stops there — worth knowing before you present it."]] },

    { key: 'dashare', group: S5, lvl: 3, title: 'Each row against its own group',
      ask: 'Add a column to df giving each order\'s amount as a share of its own region\'s total.',
      why: 'transform gives a group answer back on every row, which is how you compare a row to its peers without a join.',
      mcq: {
        q: 'Which line gives each row its region total, ready to divide by?',
        correct: "df['region_total'] = df.groupby('region')['amount'].transform('sum')",
        wrong: [
          "df['region_total'] = df.groupby('region')['amount'].sum()",
          "df['region_total'] = df.groupby('region')['amount'].agg('sum')",
          "df['region_total'] = df.groupby('region').sum()['amount']"],
        explain: "transform hands back one value PER ROW, lined up with the frame. sum() and agg() give one value per GROUP, which is a shorter object and cannot be assigned as a column." },
      lines: [
        "df['region_total'] = df.groupby('region')['amount'].transform('sum')",
        "df['share_of_region'] = (100 * df['amount'] / df['region_total']).round(2)",
        "print(df.groupby('region')['share_of_region'].sum())"],
      decoys: ["df['region_total'] = df.groupby('region')['amount'].sum()", "df['share_of_region'] = df['amount'] / df['amount'].sum()"],
      written: {
        prompt: 'Write the code: put each row\'s region total on the row with transform, work out the share as a rounded percentage, then check each region sums to 100.',
        solution: "df['region_total'] = df.groupby('region')['amount'].transform('sum')\ndf['share_of_region'] = (100 * df['amount'] / df['region_total']).round(2)\nprint(df.groupby('region')['share_of_region'].sum())",
        must: ["transform('sum')", "df['share_of_region']", '100 *'] },
      walk: [
        ["df['region_total'] = df.groupby('region')['amount'].transform('sum')", "Same length as the frame, so it drops straight in as a column."],
        ["df['share_of_region'] = (100 * df['amount'] / df['region_total']).round(2)", "Now every row knows how big it is compared to its own region."],
        ["print(df.groupby('region')['share_of_region'].sum())", "Every region should come to 100. It is the cheapest possible check that the transform lined up."]] },

    { key: 'dagroupfilter', group: S5, lvl: 2, title: 'Only the groups that matter',
      ask: 'Keep only the regions of df with more than 50 orders, and report their average amount.',
      why: 'A group of three rows will produce a spectacular average and mean nothing. Filter small groups out before you compare.',
      mcq: {
        q: 'Which pair keeps only the big regions and averages them?',
        correct: "big = df.groupby('region').filter(lambda g: len(g) > 50)\nbig.groupby('region')['amount'].mean()",
        wrong: [
          "big = df.groupby('region').apply(lambda g: len(g) > 50)\nbig.groupby('region')['amount'].mean()",
          "big = df[df.groupby('region').size() > 50]\nbig.groupby('region')['amount'].mean()",
          "big = df.groupby('region').mean().filter(lambda g: len(g) > 50)"],
        explain: "groupby().filter() keeps the ROWS of the groups that pass the test, so the frame that comes out can be grouped again. Comparing df to a group-sized Series does not line up and raises." },
      lines: [
        "big = df.groupby('region').filter(lambda g: len(g) > 50)",
        "print(big['region'].nunique(), 'of', df['region'].nunique(), 'regions kept')",
        "print(big.groupby('region')['amount'].mean().round(2))"],
      decoys: ["big = df[df.groupby('region').size() > 50]", "big = df.groupby('region').apply(lambda g: len(g) > 50)"],
      written: {
        prompt: 'Write the code: keep the rows of regions with more than 50 orders, print how many regions survived, then print their rounded average amount.',
        solution: "big = df.groupby('region').filter(lambda g: len(g) > 50)\nprint(big['region'].nunique(), 'of', df['region'].nunique(), 'regions kept')\nprint(big.groupby('region')['amount'].mean().round(2))",
        must: ['groupby', '.filter(', 'len(g) > 50', 'mean()'] },
      walk: [
        ["big = df.groupby('region').filter(lambda g: len(g) > 50)", "The lambda is handed each group as a frame; return True to keep all of its rows."],
        ["print(big['region'].nunique(), 'of', df['region'].nunique(), 'regions kept')", "Say what you excluded. A comparison over five of forty regions is a very different claim."],
        ["print(big.groupby('region')['amount'].mean().round(2))", "Now the averages rest on enough rows to be worth reading."]] },

    { key: 'damerge', group: S6, lvl: 1, title: 'Join two tables',
      ask: 'Attach the customer name from customers onto every row of orders, keeping every order.',
      why: 'The join is where analytics goes wrong most often — and the fix is always to check the row count.',
      mcq: {
        q: 'Which line keeps every order and adds the customer columns?',
        correct: "merged = orders.merge(customers, on='customer_id', how='left')",
        wrong: [
          "merged = orders.merge(customers, on='customer_id', how='inner')",
          "merged = orders.join(customers, on='customer_id')",
          "merged = pd.concat([orders, customers], axis=1)"],
        explain: "A LEFT join keeps every row of the left frame whether or not it matched; inner would silently drop unmatched orders. concat glues frames side by side by position and ignores the key entirely." },
      lines: [
        "before = len(orders)",
        "merged = orders.merge(customers, on='customer_id', how='left')",
        "print(before, len(merged))",
        "print(merged['name'].isna().sum(), 'orders had no matching customer')"],
      decoys: ["merged = pd.concat([orders, customers], axis=1)", "merged = orders.merge(customers, how='inner')"],
      written: {
        prompt: 'Write the code: record the row count, left-join customers onto orders by customer_id, print the counts before and after, then count the unmatched rows.',
        solution: "before = len(orders)\nmerged = orders.merge(customers, on='customer_id', how='left')\nprint(before, len(merged))\nprint(merged['name'].isna().sum(), 'orders had no matching customer')",
        must: ['.merge(', "on='customer_id'", "how='left'", 'len(merged)'] },
      walk: [
        ["before = len(orders)", "The number to compare against. Every join deserves this line."],
        ["merged = orders.merge(customers, on='customer_id', how='left')", "Left join: every order survives, matched or not."],
        ["print(before, len(merged))", "MORE rows than before means the right-hand key is not unique and the join multiplied your data."],
        ["print(merged['name'].isna().sum(), 'orders had no matching customer')", "The unmatched rows. A handful is a data-quality note; thousands is a broken key."]] },

    { key: 'damergecheck', group: S6, lvl: 3, title: 'Prove the join behaved',
      ask: 'Join orders to customers and prove it neither dropped rows nor duplicated them.',
      why: 'A silently multiplied join is the most expensive mistake in analytics, and the check costs one argument.',
      mcq: {
        q: 'Which call makes pandas itself raise if a customer_id is repeated in customers?',
        correct: "orders.merge(customers, on='customer_id', how='left', validate='many_to_one')",
        wrong: [
          "orders.merge(customers, on='customer_id', how='left', verify_integrity=True)",
          "orders.merge(customers, on='customer_id', how='left', indicator=True)",
          "orders.merge(customers.drop_duplicates(), on='customer_id', how='left')"],
        explain: "validate='many_to_one' says many orders, one customer — and raises if that is not true. indicator only ADDS a column telling you where each row came from; dropping duplicates first hides the problem instead of reporting it." },
      lines: [
        "merged = orders.merge(customers, on='customer_id', how='left',",
        "                      validate='many_to_one', indicator=True)",
        "assert len(merged) == len(orders)",
        "print(merged['_merge'].value_counts())"],
      decoys: ["                      validate='one_to_one', indicator=True)", "assert len(merged) == len(customers)"],
      written: {
        prompt: 'Write the code: left-join with validate="many_to_one" and indicator=True, assert the row count is unchanged, then print the counts of the _merge column.',
        solution: "merged = orders.merge(customers, on='customer_id', how='left',\n                      validate='many_to_one', indicator=True)\nassert len(merged) == len(orders)\nprint(merged['_merge'].value_counts())",
        must: ["validate='many_to_one'", 'indicator=True', 'assert len(merged) == len(orders)'] },
      walk: [
        ["merged = orders.merge(customers, on='customer_id', how='left',", "The join you meant to write."],
        ["                      validate='many_to_one', indicator=True)", "validate turns a silent duplication into a loud error; indicator records which side each row matched on."],
        ["assert len(merged) == len(orders)", "A one-line contract. If it ever fails, the script stops instead of producing a wrong report."],
        ["print(merged['_merge'].value_counts())", "left_only rows are orders with no customer — the number to put in the data-quality note."]] },

    { key: 'daconcat', group: S6, lvl: 1, title: 'Stack files on top of each other',
      ask: 'Combine the monthly frames in the list frames into one, with a clean index and a column saying which file each row came from.',
      why: 'Twelve monthly exports into one table is a weekly job, and the source column is what saves you when one file is wrong.',
      mcq: {
        q: 'Which line stacks the frames and renumbers the index?',
        correct: "all_months = pd.concat(frames, ignore_index=True)",
        wrong: [
          "all_months = pd.concat(frames, axis=1)",
          "all_months = frames.concat(ignore_index=True)",
          "all_months = pd.merge(frames, ignore_index=True)"],
        explain: "concat with a list stacks them vertically; ignore_index renumbers so you do not end up with the number 0 twelve times. axis=1 would put them side by side, and merge is for matching on a key." },
      lines: [
        "for name, frame in zip(names, frames):",
        "    frame['source'] = name",
        "all_months = pd.concat(frames, ignore_index=True)",
        "print(all_months.shape, all_months['source'].nunique())"],
      decoys: ["all_months = pd.concat(frames, axis=1)", "all_months = pd.merge(frames)"],
      written: {
        prompt: 'Write the code: tag each frame with its source name, concatenate the list with a fresh index, then print the shape and how many sources there are.',
        solution: "for name, frame in zip(names, frames):\n    frame['source'] = name\nall_months = pd.concat(frames, ignore_index=True)\nprint(all_months.shape, all_months['source'].nunique())",
        must: ['pd.concat(frames', 'ignore_index=True', "'source'"] },
      walk: [
        ["for name, frame in zip(names, frames):", "Walk the names and the frames together."],
        ["    frame['source'] = name", "Tag before stacking. Afterwards you cannot tell which row came from which file."],
        ["all_months = pd.concat(frames, ignore_index=True)", "One frame, renumbered from zero."],
        ["print(all_months.shape, all_months['source'].nunique())", "Twelve sources and roughly twelve times the rows: the sanity check that no file was missed."]] },

    { key: 'damelt', group: S6, lvl: 2, title: 'Wide table into long',
      ask: 'Turn the columns jan, feb and mar of df into two columns — month and amount — keeping region.',
      why: 'Charts, groupbys and models all want long data. Spreadsheets always arrive wide.',
      mcq: {
        q: 'Which call reshapes it correctly?',
        correct: "pd.melt(df, id_vars=['region'], value_vars=['jan', 'feb', 'mar'], var_name='month', value_name='amount')",
        wrong: [
          "pd.melt(df, id_vars=['jan', 'feb', 'mar'], value_vars=['region'], var_name='month', value_name='amount')",
          "df.pivot(index='region', columns='month', values='amount')",
          "pd.melt(df, columns=['jan', 'feb', 'mar'])"],
        explain: "id_vars are the columns to KEEP as they are; value_vars are the ones to fold down into rows. Swapping them turns the months into identifiers, which is exactly backwards." },
      lines: [
        "long = pd.melt(df, id_vars=['region'],",
        "               value_vars=['jan', 'feb', 'mar'],",
        "               var_name='month', value_name='amount')",
        "print(long.head(), long.shape)"],
      decoys: ["long = pd.melt(df, id_vars=['jan', 'feb', 'mar'], value_vars=['region'])", "long = df.pivot(index='region', columns='month')"],
      written: {
        prompt: 'Write the code: melt jan, feb and mar into month and amount columns while keeping region, then show the head and the shape.',
        solution: "long = pd.melt(df, id_vars=['region'],\n               value_vars=['jan', 'feb', 'mar'],\n               var_name='month', value_name='amount')\nprint(long.head(), long.shape)",
        must: ['pd.melt', "id_vars=['region']", 'value_vars=', "var_name='month'", "value_name='amount'"] },
      walk: [
        ["long = pd.melt(df, id_vars=['region'],", "region stays as a column and is repeated once per month."],
        ["               value_vars=['jan', 'feb', 'mar'],", "These three columns become rows."],
        ["               var_name='month', value_name='amount')", "Name the two new columns now; renaming afterwards is one more step to forget."],
        ["print(long.head(), long.shape)", "Three times as many rows and three fewer columns — that is what melting looks like."]] },

    { key: 'dawide', group: S6, lvl: 2, title: 'Long table back into wide',
      ask: 'Turn a long frame of region, month and amount into one row per region with a column per month.',
      why: 'The other direction: long data is for computing, wide data is for reading.',
      mcq: {
        q: 'Which line goes from long back to wide?',
        correct: "wide = long.pivot(index='region', columns='month', values='amount').fillna(0)",
        wrong: [
          "wide = long.pivot(index='month', columns='region', values='amount').fillna(0)",
          "wide = pd.melt(long, id_vars=['region'])",
          "wide = long.groupby(['region', 'month']).sum()"],
        explain: "pivot puts index down the side and columns across the top. Grouping by both would give a multi-index instead of a wide table — useful, but not the shape asked for." },
      lines: [
        "wide = long.pivot(index='region', columns='month', values='amount')",
        "wide = wide.fillna(0).reset_index()",
        "print(wide)"],
      decoys: ["wide = long.pivot(index='month', columns='region', values='amount')", "wide = pd.melt(long, id_vars=['region'])"],
      written: {
        prompt: 'Write the code: pivot the long frame to region down the side and month across, fill the gaps with 0, reset the index and print it.',
        solution: "wide = long.pivot(index='region', columns='month', values='amount')\nwide = wide.fillna(0).reset_index()\nprint(wide)",
        must: ['.pivot(', "index='region'", "columns='month'", 'fillna(0)'] },
      walk: [
        ["wide = long.pivot(index='region', columns='month', values='amount')", "pivot needs one value per index/column pair — if there can be several, pivot_table with aggfunc is the one you want."],
        ["wide = wide.fillna(0).reset_index()", "Fill the months that never happened, and put region back as an ordinary column."],
        ["print(wide)", "The shape a stakeholder will ask you to paste into a slide."]] },

    { key: 'dalatest', group: S6, lvl: 2, title: 'One row per key, the newest',
      ask: 'From a history table with several rows per customer, keep only each customer\'s most recent row.',
      why: 'Turning a history into a "current state" table is a weekly job, and it is two lines.',
      mcq: {
        q: 'Which pair keeps the newest row per customer?',
        correct: "df = df.sort_values('date')\nlatest = df.drop_duplicates(subset=['customer_id'], keep='last')",
        wrong: [
          "latest = df.drop_duplicates(subset=['customer_id'], keep='last')",
          "df = df.sort_values('date')\nlatest = df.groupby('customer_id').max()",
          "latest = df.groupby('customer_id').tail()"],
        explain: "The sort is what makes 'last' mean 'newest'. groupby().max() takes the maximum of every column separately, which can invent a row that never existed." },
      lines: [
        "df = df.sort_values('date')",
        "latest = df.drop_duplicates(subset=['customer_id'], keep='last')",
        "print(len(df), '->', len(latest))",
        "print(latest['customer_id'].is_unique)"],
      decoys: ["latest = df.groupby('customer_id').max()", "latest = df.drop_duplicates(keep='first')"],
      written: {
        prompt: 'Write the code: sort by date, keep the last row per customer_id, print the before and after row counts, and confirm the key is unique.',
        solution: "df = df.sort_values('date')\nlatest = df.drop_duplicates(subset=['customer_id'], keep='last')\nprint(len(df), '->', len(latest))\nprint(latest['customer_id'].is_unique)",
        must: ["sort_values('date')", "drop_duplicates(subset=['customer_id']", "keep='last'"] },
      walk: [
        ["df = df.sort_values('date')", "Oldest first, so the last row for each customer is the newest one."],
        ["latest = df.drop_duplicates(subset=['customer_id'], keep='last')", "One row per customer, and it is a WHOLE row from the original data."],
        ["print(len(df), '->', len(latest))", "The drop tells you how much history there was per customer on average."],
        ["print(latest['customer_id'].is_unique)", "True, or the next join will multiply everything."]] }
  );
})();
