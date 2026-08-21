/* The coding path, one small lesson at a time — stages 14 to 20. */
(function () {
  window.CODETASKS = window.CODETASKS || [];
  function T(o) { o.lvl = o.lvl || 1; window.CODETASKS.push(o); }
  var S14 = '14 · Two numbers per group';
  var S15 = '15 · Two tables';
  var S16 = '16 · Change the shape';
  var S17 = '17 · Dates';
  var S18 = '18 · A first chart';
  var S19 = '19 · Honest numbers';
  var S20 = '20 · Ready for a model';

  /* ---- 14 · Two numbers per group ---- */
  T({ key: 's-agg-list', group: S14, lvl: 2, title: 'Several statistics at once',
    ask: 'For each region of df, get the count, total and average amount.',
    why: 'One line that answers three questions is what a summary table actually is.',
    mcq: { q: 'Which gives all three?',
      correct: "df.groupby('region')['amount'].agg(['count', 'sum', 'mean'])",
      wrong: ["df.groupby('region')['amount'].agg('count', 'sum', 'mean')", "df.groupby('region')['amount'].count().sum().mean()", "df.groupby('region')['amount'].apply(['count', 'sum', 'mean'])"],
      whyWrong: [
        'agg takes ONE list. Separate arguments are read as other options and raise.',
        'Chaining them collapses the answer to a single number — count, then the sum of those counts, then its mean.',
        'apply expects a function, not a list of names.'],
      explain: "agg(['count', 'sum', 'mean']) gives one column per statistic and one row per group." },
    lines: ["df.groupby('region')['amount'].agg(['count', 'sum', 'mean'])"],
    decoys: ["df.groupby('region')['amount'].agg('count', 'sum', 'mean')", "df.groupby('region')['amount'].apply(['count'])"],
    written: { prompt: 'Write the expression giving count, sum and mean of amount per region.', solution: "df.groupby('region')['amount'].agg(['count', 'sum', 'mean'])", must: ['groupby', "agg(['count', 'sum', 'mean'])"] },
    walk: [["df.groupby('region')['amount'].agg(['count', 'sum', 'mean'])", 'Three columns out. Rename them afterwards into words a reader uses.']] });

  T({ key: 's-agg-named', group: S14, lvl: 2, title: 'Name the output columns',
    ask: 'Summarise df by region into columns called orders and total.',
    why: 'Named aggregation saves the rename step and makes the code say what it produces.',
    mcq: { q: 'Which names the columns as it aggregates?',
      correct: "df.groupby('region').agg(orders=('amount', 'count'), total=('amount', 'sum'))",
      wrong: ["df.groupby('region').agg({'orders': 'count', 'total': 'sum'})", "df.groupby('region').agg(orders='count', total='sum')", "df.groupby('region').agg(('amount', 'count'), ('amount', 'sum'))"],
      whyWrong: [
        'That dict form names the COLUMNS to aggregate, not the outputs — so it looks for columns called orders and total.',
        'Without naming the source column pandas has no idea what to count.',
        'Bare tuples with no output names raise.'],
      explain: 'new_name=(column, function) — the output name on the left, the source and the statistic on the right.' },
    lines: ["df.groupby('region').agg(orders=('amount', 'count'), total=('amount', 'sum'))"],
    decoys: ["df.groupby('region').agg({'orders': 'count'})", "df.groupby('region').agg(orders='count')"],
    written: { prompt: 'Write the expression producing orders and total columns per region.', solution: "df.groupby('region').agg(orders=('amount', 'count'), total=('amount', 'sum'))", must: ['groupby', "orders=('amount', 'count')", "total=('amount', 'sum')"] },
    walk: [["df.groupby('region').agg(orders=('amount', 'count'), total=('amount', 'sum'))", 'The table comes out ready to read, with no renaming afterwards.']] });

  T({ key: 's-group-two', group: S14, lvl: 2, title: 'Group by two things',
    ask: 'Total amount for each region and month together.',
    why: 'Two keys in a list — and the result gets one index level per key.',
    mcq: { q: 'Which groups by both?',
      correct: "df.groupby(['region', 'month'])['amount'].sum()",
      wrong: ["df.groupby('region', 'month')['amount'].sum()", "df.groupby('region').groupby('month')['amount'].sum()", "df.groupby(['region'], ['month'])['amount'].sum()"],
      whyWrong: [
        'The second positional argument is the axis, not another key — the names go in one list.',
        'A groupby result cannot be grouped again like that; it raises.',
        'Two separate lists is not the argument shape groupby takes.'],
      explain: 'A list of keys gives a multi-level index: one level per grouping column.' },
    lines: ["df.groupby(['region', 'month'])['amount'].sum()"],
    decoys: ["df.groupby('region', 'month')['amount'].sum()", "df.groupby('region').groupby('month')['amount'].sum()"],
    written: { prompt: 'Write the expression totalling amount by region and month.', solution: "df.groupby(['region', 'month'])['amount'].sum()", must: ["groupby(['region', 'month'])", '.sum()'] },
    walk: [["df.groupby(['region', 'month'])['amount'].sum()", 'Add .unstack() to turn the inner level into columns, or .reset_index() for a flat table.']] });

  T({ key: 's-nunique-group', group: S14, lvl: 2, title: 'Distinct count per group',
    ask: 'Count how many different customers each region has.',
    why: '"How many customers" and "how many orders" are different questions, and this is the one people get wrong.',
    mcq: { q: 'Which counts distinct customers per region?',
      correct: "df.groupby('region')['customer_id'].nunique()",
      wrong: ["df.groupby('region')['customer_id'].count()", "df.groupby('region').size()", "df.groupby('region')['customer_id'].unique()"],
      whyWrong: [
        'count() counts ROWS with a customer id, so a customer who ordered ten times counts ten times.',
        'size() is the row count per region — the number of orders, not of customers.',
        'unique() gives the list of ids per region, not how many.'],
      explain: 'nunique() per group answers "how many different ones", which is nearly always the business question.' },
    lines: ["df.groupby('region')['customer_id'].nunique()"],
    decoys: ["df.groupby('region')['customer_id'].count()", "df.groupby('region')['customer_id'].unique()"],
    written: { prompt: 'Write the expression counting distinct customers per region.', solution: "df.groupby('region')['customer_id'].nunique()", must: ['groupby', 'nunique()'] },
    walk: [["df.groupby('region')['customer_id'].nunique()", 'Put it beside size() and the ratio is orders per customer — a free insight.']] });

  /* ---- 15 · Two tables ---- */
  T({ key: 's-merge-left', group: S15, lvl: 2, title: 'Attach another table',
    ask: 'Attach the customer details from customers onto orders, keeping every order.',
    why: 'A join is where analytics goes wrong most often, and how= is the argument that decides.',
    mcq: { q: 'Which keeps every order?',
      correct: "orders.merge(customers, on='customer_id', how='left')",
      wrong: ["orders.merge(customers, on='customer_id')", "orders.merge(customers, how='left')", "pd.concat([orders, customers], axis=1)"],
      whyWrong: [
        'The default is an INNER join, so orders whose customer is missing are silently dropped.',
        'Without on=, pandas guesses from the shared column names — and raises if there are none or several.',
        'concat glues frames side by side by position and ignores the key entirely.'],
      explain: "how='left' keeps every row on the left, filling the unmatched ones with NaN." },
    lines: ["merged = orders.merge(customers, on='customer_id', how='left')"],
    decoys: ["merged = pd.concat([orders, customers], axis=1)", "merged = orders.merge(customers, how='left')"],
    written: { prompt: 'Write the line left-joining customers onto orders by customer_id.', solution: "merged = orders.merge(customers, on='customer_id', how='left')", must: ['.merge(', "on='customer_id'", "how='left'"] },
    walk: [["merged = orders.merge(customers, on='customer_id', how='left')", 'Left keeps everything on the left. Inner keeps only the matches. Those two cover most jobs.']] });

  T({ key: 's-merge-check', group: S15, lvl: 2, title: 'Check the join behaved',
    ask: 'Print the row count of orders before and after a merge.',
    why: 'More rows after a join means the key was not unique and your data just multiplied.',
    mcq: { q: 'Which check catches a multiplying join?',
      correct: "print(len(orders), len(merged))",
      wrong: ["print(merged.shape[1])", "print(merged.isna().sum())", "print(len(customers), len(merged))"],
      whyWrong: [
        'That is the COLUMN count, which of course went up — it says nothing about rows.',
        'Missing values tell you about unmatched rows, not about duplicated ones.',
        'Comparing with the right-hand table does not tell you whether the left one grew.'],
      explain: 'Compare the left table before with the merged frame after. Equal is good; bigger means duplication.' },
    lines: ['print(len(orders), len(merged))'],
    decoys: ['print(merged.shape[1])', 'print(len(customers), len(merged))'],
    written: { prompt: 'Write the line printing the row count before and after the merge.', solution: 'print(len(orders), len(merged))', must: ['len(orders)', 'len(merged)'] },
    walk: [['print(len(orders), len(merged))', 'Two numbers, one line, and it catches the most expensive mistake in analytics.']] });

  T({ key: 's-concat', group: S15, title: 'Stack two tables',
    ask: 'Stack the frames jan and feb on top of each other with a fresh index.',
    why: 'Twelve monthly exports into one table is a weekly job.',
    mcq: { q: 'Which stacks them?',
      correct: "both = pd.concat([jan, feb], ignore_index=True)",
      wrong: ["both = pd.concat([jan, feb])", "both = pd.concat([jan, feb], axis=1)", "both = jan.merge(feb)"],
      whyWrong: [
        'Right stack, but both frames keep their own row numbers, so the index repeats and .loc lookups return two rows.',
        'axis=1 puts them SIDE BY SIDE, matching on the index — twice the columns, mostly NaN.',
        'merge matches on a key; it does not stack.'],
      explain: 'concat takes a LIST of frames. ignore_index renumbers the result from zero.' },
    lines: ['both = pd.concat([jan, feb], ignore_index=True)'],
    decoys: ['both = pd.concat([jan, feb], axis=1)', 'both = jan.merge(feb)'],
    written: { prompt: 'Write the line stacking jan and feb with a fresh index.', solution: 'both = pd.concat([jan, feb], ignore_index=True)', must: ['pd.concat([jan, feb]', 'ignore_index=True'] },
    walk: [['both = pd.concat([jan, feb], ignore_index=True)', 'Tag each frame with its source first if you will ever need to tell them apart.']] });

  /* ---- 16 · Change the shape ---- */
  T({ key: 's-pivot', group: S16, lvl: 2, title: 'Rows down, categories across',
    ask: 'Build a table of total amount with one row per region and one column per month.',
    why: 'The shape every spreadsheet report ends up in.',
    mcq: { q: 'Which builds it?',
      correct: "pd.pivot_table(df, index='region', columns='month', values='amount', aggfunc='sum')",
      wrong: ["pd.pivot_table(df, index='month', columns='region', values='amount', aggfunc='sum')", "df.pivot(index='region', columns='month', values='amount')", "pd.pivot_table(df, index='region', columns='month', values='amount')"],
      whyWrong: [
        'Transposed: months down the side, regions across the top.',
        'Plain pivot cannot combine several rows into one cell — with more than one order per region-month it raises.',
        'Without aggfunc you get the MEAN, not the total.'],
      explain: 'index goes down the side, columns across the top, values fill the cells, aggfunc says how to combine.' },
    lines: ["pd.pivot_table(df, index='region', columns='month', values='amount', aggfunc='sum')"],
    decoys: ["df.pivot(index='region', columns='month', values='amount')", "pd.pivot_table(df, index='region', columns='month', values='amount')"],
    written: { prompt: 'Write the expression pivoting region down, month across, summed amount inside.', solution: "pd.pivot_table(df, index='region', columns='month', values='amount', aggfunc='sum')", must: ['pivot_table', "index='region'", "columns='month'", "aggfunc='sum'"] },
    walk: [["pd.pivot_table(df, index='region', columns='month', values='amount', aggfunc='sum')", 'Add fill_value=0 for the combinations that never happened.']] });

  T({ key: 's-melt', group: S16, lvl: 2, title: 'Wide table into long',
    ask: 'Fold the jan, feb and mar columns of df down into month and amount columns, keeping region.',
    why: 'Charts, groupbys and models all want long data. Spreadsheets always arrive wide.',
    mcq: { q: 'Which reshapes it?',
      correct: "pd.melt(df, id_vars=['region'], value_vars=['jan', 'feb', 'mar'], var_name='month', value_name='amount')",
      wrong: ["pd.melt(df, id_vars=['jan', 'feb', 'mar'], value_vars=['region'], var_name='month', value_name='amount')", "pd.melt(df, value_vars=['jan', 'feb', 'mar'])", "df.pivot(index='region', columns='month')"],
      whyWrong: [
        'id_vars and value_vars are swapped — this keeps the months as identifiers and folds the region down.',
        'Without id_vars the region is dropped, so the amounts belong to nobody.',
        'pivot goes the other way, from long to wide.'],
      explain: 'id_vars are what you KEEP; value_vars are what folds down into rows. Name the two new columns as you go.' },
    lines: ["long = pd.melt(df, id_vars=['region'], value_vars=['jan', 'feb', 'mar'], var_name='month', value_name='amount')"],
    decoys: ["long = pd.melt(df, value_vars=['jan', 'feb', 'mar'])", "long = df.pivot(index='region', columns='month')"],
    written: { prompt: 'Write the line melting jan, feb and mar into month and amount, keeping region.', solution: "long = pd.melt(df, id_vars=['region'], value_vars=['jan', 'feb', 'mar'], var_name='month', value_name='amount')", must: ['pd.melt', "id_vars=['region']", "var_name='month'", "value_name='amount'"] },
    walk: [["long = pd.melt(df, id_vars=['region'], value_vars=['jan', 'feb', 'mar'], var_name='month', value_name='amount')", 'Three times the rows, three fewer columns. That is what melting looks like.']] });

  T({ key: 's-drop-dupes', group: S16, title: 'Remove duplicate rows',
    ask: 'Remove the fully duplicated rows from df.',
    why: 'Duplicated rows quietly double a total, and nobody notices until the numbers are questioned.',
    mcq: { q: 'Which removes exact duplicates?',
      correct: 'df = df.drop_duplicates()',
      wrong: ['df.drop_duplicates()', 'df = df.drop_duplicates(keep=False)', 'df = df.unique()'],
      whyWrong: [
        'It returns a new frame; without assigning it back, nothing changes.',
        'keep=False removes EVERY copy including the first, so genuinely repeated rows vanish entirely.',
        'unique() belongs to a Series, not a DataFrame.'],
      explain: 'drop_duplicates() keeps the first of each identical row. Check df.duplicated().sum() first to see how many there are.' },
    lines: ['df = df.drop_duplicates()'],
    decoys: ['df.drop_duplicates()', 'df = df.unique()'],
    written: { prompt: 'Write the line removing exact duplicate rows from df.', solution: 'df = df.drop_duplicates()', must: ['drop_duplicates()', 'df ='] },
    walk: [['df = df.drop_duplicates()', 'Add subset=[...] to dedupe on a key rather than on the whole row.']] });

  /* ---- 17 · Dates ---- */
  T({ key: 's-dt-year', group: S17, title: 'Pull the year out',
    ask: 'Add a year column to df from its date column.',
    why: 'Date parts live behind .dt, exactly as text methods live behind .str',
    mcq: { q: 'Which adds the year?',
      correct: "df['year'] = df['date'].dt.year",
      wrong: ["df['year'] = df['date'].year", "df['year'] = df['date'].dt.year()", "df['year'] = year(df['date'])"],
      whyWrong: [
        'Without .dt this raises AttributeError — a Series has no year.',
        'year is an attribute, not a method: the brackets raise.',
        'There is no bare year() function.'],
      explain: '.dt.year, .dt.month, .dt.day — attributes, no brackets. .dt.day_name() is a method, so it has them.' },
    lines: ["df['year'] = df['date'].dt.year"],
    decoys: ["df['year'] = df['date'].year", "df['year'] = df['date'].dt.year()"],
    written: { prompt: 'Write the line adding a year column from the date column.', solution: "df['year'] = df['date'].dt.year", must: ['dt.year'] },
    walk: [["df['year'] = df['date'].dt.year", 'Only works once the column is a real datetime — convert it first.']] });

  T({ key: 's-dt-month', group: S17, title: 'And the month',
    ask: 'Add a month column to df from its date column.',
    why: 'Same line, one word changed — which is the point of doing them next to each other.',
    mcq: { q: 'Which adds the month number?',
      correct: "df['month'] = df['date'].dt.month",
      wrong: ["df['month'] = df['date'].dt.months", "df['month'] = df['date'].month", "df['month'] = df['date'].dt.strftime('%m')"],
      whyWrong: [
        'The attribute is singular: month.',
        'Missing .dt, so it raises.',
        'That works but gives TEXT like "03", which then sorts as text and cannot be compared as a number.'],
      explain: '.dt.month gives 1 to 12 as a number. Use .dt.to_period("M") when you need the year with it.' },
    lines: ["df['month'] = df['date'].dt.month"],
    decoys: ["df['month'] = df['date'].dt.months", "df['month'] = df['date'].month"],
    written: { prompt: 'Write the line adding a month column from the date column.', solution: "df['month'] = df['date'].dt.month", must: ['dt.month'] },
    walk: [["df['month'] = df['date'].dt.month", 'Grouping on this alone merges the same month across different years — remember that.']] });

  T({ key: 's-date-filter', group: S17, lvl: 2, title: 'Rows after a date',
    ask: 'Keep the rows of df dated 2024 or later.',
    why: 'Once the column is a real date, filtering it is the same as filtering a number.',
    mcq: { q: 'Which keeps 2024 onwards?',
      correct: "df[df['date'] >= '2024-01-01']",
      wrong: ["df[df['date'] >= 2024]", "df[df['date'].dt.year >= '2024']", "df[df['date'] > '01/01/2024']"],
      whyWrong: [
        'Comparing a datetime with a plain number raises.',
        'The year is a NUMBER, so comparing it with text raises.',
        'An ambiguous date format like this may be read as the 1st of January or as a failure — the ISO form never is.'],
      explain: 'pandas parses an ISO date string for you, so a plain comparison works. Always write dates as YYYY-MM-DD.' },
    lines: ["df[df['date'] >= '2024-01-01']"],
    decoys: ["df[df['date'] >= 2024]", "df[df['date'] > '01/01/2024']"],
    written: { prompt: 'Write the expression keeping rows dated 2024 or later.', solution: "df[df['date'] >= '2024-01-01']", must: ["df['date'] >=", "'2024-01-01'"] },
    walk: [["df[df['date'] >= '2024-01-01']", 'ISO dates sort correctly as text too, which is why the format is worth insisting on.']] });

  T({ key: 's-month-total', group: S17, lvl: 2, title: 'Totals per month',
    ask: 'Total amount by calendar month, keeping the months in date order.',
    why: 'The most requested table in any reporting job.',
    mcq: { q: 'Which totals by month, in order?',
      correct: "df.groupby(df['date'].dt.to_period('M'))['amount'].sum().sort_index()",
      wrong: ["df.groupby(df['date'].dt.month)['amount'].sum()", "df.groupby(df['date'].dt.day_name())['amount'].sum()", "df.groupby('date')['amount'].sum()"],
      whyWrong: [
        'The month number alone merges January 2023 with January 2024 into one row.',
        'That groups by the day of the WEEK, which is a different question entirely.',
        'Grouping by the raw date gives one row per day, not per month.'],
      explain: "to_period('M') keeps the year with the month, so different years stay apart and the sort is chronological." },
    lines: ["df.groupby(df['date'].dt.to_period('M'))['amount'].sum().sort_index()"],
    decoys: ["df.groupby(df['date'].dt.month)['amount'].sum()", "df.groupby('date')['amount'].sum()"],
    written: { prompt: 'Write the expression totalling amount per calendar month in date order.', solution: "df.groupby(df['date'].dt.to_period('M'))['amount'].sum().sort_index()", must: ["to_period('M')", '.sum()', 'sort_index()'] },
    walk: [["df.groupby(df['date'].dt.to_period('M'))['amount'].sum().sort_index()", 'A gap in the middle of the series is worth chasing before anyone charts it.']] });

  /* ---- 18 · A first chart ---- */
  T({ key: 's-plot-import', group: S18, title: 'Import matplotlib',
    ask: 'Bring in the plotting library under its usual nickname.',
    why: 'One line, and it is the same one in every notebook you will ever open.',
    mcq: { q: 'Which is the standard import?',
      correct: 'import matplotlib.pyplot as plt',
      wrong: ['import matplotlib as plt', 'import pyplot as plt', 'from matplotlib import plt'],
      whyWrong: [
        'The plotting functions live in the pyplot SUBMODULE, so this gives you a module with no plot() on it.',
        'pyplot is not a top-level package; it has to be reached through matplotlib.',
        'There is no name called plt inside matplotlib to import.'],
      explain: 'import matplotlib.pyplot as plt — the full path, nicknamed plt.' },
    lines: ['import matplotlib.pyplot as plt'],
    decoys: ['import matplotlib as plt', 'from matplotlib import plt'],
    written: { prompt: 'Write the standard matplotlib import line.', solution: 'import matplotlib.pyplot as plt', must: ['import matplotlib.pyplot as plt'] },
    walk: [['import matplotlib.pyplot as plt', 'pandas draws through matplotlib, so this import is needed even when you only use df.plot().']] });

  T({ key: 's-plot-bar', group: S18, title: 'Draw a bar chart',
    ask: 'Draw the Series totals as a bar chart.',
    why: 'pandas hands the Series straight to matplotlib: labels from the index, heights from the values.',
    mcq: { q: 'Which draws the bars?',
      correct: "totals.plot(kind='bar')",
      wrong: ['plt.bar(totals)', "totals.plot(type='bar')", 'totals.bar()'],
      whyWrong: [
        'plt.bar needs the labels and the heights as two arguments; a Series on its own is not enough.',
        'The argument is kind, not type.',
        'A Series has no .bar() method — the chart type goes inside plot().'],
      explain: "kind='bar' for categories. Also 'line', 'hist', 'box', 'scatter', 'barh'." },
    lines: ["totals.plot(kind='bar')"],
    decoys: ['plt.bar(totals)', "totals.plot(type='bar')"],
    written: { prompt: 'Write the line drawing totals as a bar chart.', solution: "totals.plot(kind='bar')", must: ["plot(kind='bar')"] },
    walk: [["totals.plot(kind='bar')", 'Sort the Series before plotting — an unsorted bar chart makes the reader do the ranking.']] });

  T({ key: 's-plot-title', group: S18, title: 'Label the chart',
    ask: 'Put the title Sales by region on the chart and label the y axis Amount.',
    why: 'A chart with no title and no units gets sent back. Two lines fix it.',
    mcq: { q: 'Which labels it?',
      correct: "plt.title('Sales by region')\nplt.ylabel('Amount')",
      wrong: ["plt.title = 'Sales by region'\nplt.ylabel = 'Amount'", "plt.set_title('Sales by region')\nplt.set_ylabel('Amount')", "plt.label('Sales by region')\nplt.y('Amount')"],
      whyWrong: [
        'These are FUNCTIONS to call, not attributes to assign — assigning silently replaces them and draws nothing.',
        'set_title belongs to an Axes object (ax.set_title), not to plt.',
        'Neither of those functions exists.'],
      explain: 'plt.title, plt.xlabel, plt.ylabel — call each with the text. Then plt.show().' },
    lines: ["plt.title('Sales by region')", "plt.ylabel('Amount')"],
    decoys: ["plt.title = 'Sales by region'", "plt.set_title('Sales by region')"],
    written: { prompt: 'Write the two lines titling the chart and labelling the y axis.', solution: "plt.title('Sales by region')\nplt.ylabel('Amount')", must: ["plt.title('Sales by region')", "plt.ylabel('Amount')"] },
    walk: [["plt.title('Sales by region')", 'What the chart shows.'], ["plt.ylabel('Amount')", 'And in what units. Both before plt.show().']] });

  T({ key: 's-plot-show', group: S18, title: 'Show it, or save it',
    ask: 'Save the current chart to sales.png rather than showing it.',
    why: 'Saving after show() writes a blank image — the single most common matplotlib bug.',
    mcq: { q: 'Which actually saves the chart?',
      correct: "plt.savefig('sales.png')",
      wrong: ["plt.show()\nplt.savefig('sales.png')", "plt.save('sales.png')", "plt.savefig()"],
      whyWrong: [
        'show() clears the figure, so the file written afterwards is empty.',
        'The function is savefig, not save.',
        'It needs a filename to write to.'],
      explain: 'savefig BEFORE show. Add dpi=150 and call plt.tight_layout() first so nothing is clipped.' },
    lines: ['plt.tight_layout()', "plt.savefig('sales.png', dpi=150)"],
    decoys: ['plt.show()', "plt.save('sales.png')"],
    written: { prompt: 'Write the two lines that tighten the layout and save the chart to sales.png at 150 dpi.', solution: "plt.tight_layout()\nplt.savefig('sales.png', dpi=150)", must: ['tight_layout()', "savefig('sales.png'", 'dpi=150'] },
    walk: [['plt.tight_layout()', 'Pulls rotated labels inside the edges.'], ["plt.savefig('sales.png', dpi=150)", 'Written to disk, sharp enough to print.']] });

  /* ---- 19 · Honest numbers ---- */
  T({ key: 's-quantile', group: S19, lvl: 2, title: 'Quartiles',
    ask: 'Get the 25th, 50th and 75th percentiles of the amount column.',
    why: 'Percentiles survive outliers, so they describe a skewed column far better than a mean.',
    mcq: { q: 'Which gives all three?',
      correct: "df['amount'].quantile([0.25, 0.5, 0.75])",
      wrong: ["df['amount'].quantile(25, 50, 75)", "df['amount'].quantile([25, 50, 75])", "df['amount'].percentile([0.25, 0.5, 0.75])"],
      whyWrong: [
        'quantile takes ONE list; the second argument is the interpolation method.',
        'Quantiles are fractions between 0 and 1, so 25 is out of range and raises.',
        'There is no .percentile on a Series — that is NumPy.'],
      explain: 'A list of fractions gives a Series of cut points. The 0.5 one is the median.' },
    lines: ["df['amount'].quantile([0.25, 0.5, 0.75])"],
    decoys: ["df['amount'].quantile([25, 50, 75])", "df['amount'].percentile([0.25, 0.5, 0.75])"],
    written: { prompt: 'Write the expression giving the three quartiles of amount.', solution: "df['amount'].quantile([0.25, 0.5, 0.75])", must: ['quantile([0.25, 0.5, 0.75])'] },
    walk: [["df['amount'].quantile([0.25, 0.5, 0.75])", 'The gap between the outer two is the interquartile range — the width of the middle half.']] });

  T({ key: 's-corr-two', group: S19, lvl: 2, title: 'Do two columns move together?',
    ask: 'Get the correlation between the amount and quantity columns of df.',
    why: 'One number for the straight-line part of a relationship — and only that part.',
    mcq: { q: 'Which gives the correlation of the two?',
      correct: "df['amount'].corr(df['quantity'])",
      wrong: ["df.corr()", "df['amount'].corr()", "corr(df['amount'], df['quantity'])"],
      whyWrong: [
        'That gives the whole matrix of every numeric pair — more than you asked for.',
        'corr on one column needs another column to compare with.',
        'There is no bare corr() function.'],
      explain: 'Series.corr(other) gives one number between -1 and 1. Draw the scatter too — the number alone hides curves.' },
    lines: ["df['amount'].corr(df['quantity'])"],
    decoys: ['df.corr()', "df['amount'].corr()"],
    written: { prompt: 'Write the expression giving the correlation of amount and quantity.', solution: "df['amount'].corr(df['quantity'])", must: ["df['amount'].corr(df['quantity'])"] },
    walk: [["df['amount'].corr(df['quantity'])", 'And say it out loud: correlation is not evidence of cause.']] });

  T({ key: 's-share-pct', group: S19, title: 'What share of the rows',
    ask: 'Work out what fraction of df has an amount over 100, as a percentage.',
    why: 'A count means little without the denominator. The mask gives you both.',
    mcq: { q: 'Which gives the percentage?',
      correct: "100 * (df['amount'] > 100).mean()",
      wrong: ["100 * (df['amount'] > 100).sum()", "(df['amount'] > 100).sum() / df['amount'].sum() * 100", "100 * df['amount'].mean()"],
      whyWrong: [
        'That is the count times 100, which is not a percentage of anything.',
        'Dividing the matching ROW COUNT by the total MONEY mixes two different units.',
        'That is the average amount scaled up, not a share of rows.'],
      explain: 'The mean of a True/False column IS the proportion, because True counts as 1. Times 100 for a percentage.' },
    lines: ["100 * (df['amount'] > 100).mean()"],
    decoys: ["100 * (df['amount'] > 100).sum()", "100 * df['amount'].mean()"],
    written: { prompt: 'Write the expression giving the percentage of rows with amount over 100.', solution: "100 * (df['amount'] > 100).mean()", must: ["(df['amount'] > 100).mean()", '100 *'] },
    walk: [["100 * (df['amount'] > 100).mean()", 'Round it for reading, and always say what the denominator was.']] });

  /* ---- 20 · Ready for a model ---- */
  T({ key: 's-xy', group: S20, lvl: 2, title: 'Split into features and target',
    ask: 'Separate df into features X and target y, where the target column is churn.',
    why: 'Every model in scikit-learn takes exactly this pair — and leaving the target in X is the classic leak.',
    mcq: { q: 'Which separates them?',
      correct: "X = df.drop(columns=['churn'])\ny = df['churn']",
      wrong: ["X = df\ny = df['churn']", "X = df.drop('churn')\ny = df['churn']", "X = df['churn']\ny = df.drop(columns=['churn'])"],
      whyWrong: [
        'The target is still inside X, so the model reads the answer and scores perfectly on nothing.',
        "Without columns=, drop looks for a ROW labelled churn and raises KeyError.",
        'X and y are the wrong way round — this trains on the answer to predict the questions.'],
      explain: 'X is everything except the target; y is the target alone, in the same row order.' },
    lines: ["X = df.drop(columns=['churn'])", "y = df['churn']"],
    decoys: ["X = df.drop('churn')", 'X = df'],
    written: { prompt: 'Write the two lines separating features X from target y (churn).', solution: "X = df.drop(columns=['churn'])\ny = df['churn']", must: ["drop(columns=['churn'])", "y = df['churn']"] },
    walk: [["X = df.drop(columns=['churn'])", 'Everything except the answer.'], ["y = df['churn']", 'The answer, on its own, in the same order.']] });

  T({ key: 's-dummies', group: S20, lvl: 2, title: 'Categories into numbers',
    ask: 'One-hot encode the city column of df, dropping the first level.',
    why: 'Models take numbers. One-hot is the honest way to hand them a category.',
    mcq: { q: 'Which encodes it?',
      correct: "X = pd.get_dummies(df, columns=['city'], drop_first=True)",
      wrong: ["X = pd.get_dummies(df, columns=['city'])", "X = df['city'].astype('category').cat.codes", "X = pd.get_dummies(df['city'], drop_first=True)"],
      whyWrong: [
        'Without drop_first every level gets a column, so each is perfectly predictable from the others — unstable for linear models.',
        'Integer codes invent an ORDER: city 3 is not more than city 1.',
        'That encodes the column on its own, losing every other column in the frame.'],
      explain: 'get_dummies on the frame, naming the columns to encode. drop_first removes one level per column.' },
    lines: ["X = pd.get_dummies(df, columns=['city'], drop_first=True)"],
    decoys: ["X = pd.get_dummies(df, columns=['city'])", "X = df['city'].astype('category').cat.codes"],
    written: { prompt: 'Write the line one-hot encoding city with the first level dropped.', solution: "X = pd.get_dummies(df, columns=['city'], drop_first=True)", must: ['get_dummies', "columns=['city']", 'drop_first=True'] },
    walk: [["X = pd.get_dummies(df, columns=['city'], drop_first=True)", 'Watch the column count afterwards — a high-cardinality column can explode it.']] });

  T({ key: 's-split-basic', group: S20, lvl: 2, title: 'Hold some data back',
    ask: 'Split X and y into training and test sets, 80/20, reproducibly.',
    why: 'The first honest move of every project: keep data the model never sees.',
    mcq: { q: 'Which splits them correctly?',
      correct: 'X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)',
      wrong: ['X_train, y_train, X_test, y_test = train_test_split(X, y, test_size=0.2, random_state=42)', 'X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.2, random_state=42)', 'X_train, X_test = train_test_split(X, test_size=0.2)\ny_train, y_test = train_test_split(y, test_size=0.2)'],
      whyWrong: [
        'The order is X halves first, then y halves. This puts the test features where the training labels belong.',
        'train_size=0.2 trains on a fifth and tests on the rest — the split the wrong way round.',
        'Two separate calls shuffle differently, so the rows and their labels no longer match.'],
      explain: 'One call, four outputs, in that order. random_state makes the same split happen every run.' },
    lines: ['X_train, X_test, y_train, y_test = train_test_split(', '    X, y, test_size=0.2, random_state=42)'],
    decoys: ['X_train, y_train, X_test, y_test = train_test_split(X, y)', '    X, y, train_size=0.2, random_state=42)'],
    written: { prompt: 'Write the split line: X and y, 80/20, random_state 42.', solution: 'X_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)', must: ['train_test_split', 'X_train', 'X_test', 'y_train', 'y_test', 'test_size=0.2', 'random_state=42'] },
    walk: [['X_train, X_test, y_train, y_test = train_test_split(', 'Four names, always in this order.'],
           ['    X, y, test_size=0.2, random_state=42)', 'A fifth held back, and the same fifth every time you run it.']] });

  T({ key: 's-baseline-share', group: S20, lvl: 2, title: 'The number to beat',
    ask: 'Before fitting anything, work out what share of y is the majority class.',
    why: 'A model that cannot beat "always guess the common answer" has told you nothing.',
    mcq: { q: 'Which gives the majority-class share?',
      correct: 'y.value_counts(normalize=True).max()',
      wrong: ['y.value_counts().max()', 'y.mean()', 'y.value_counts(normalize=True).sum()'],
      whyWrong: [
        'That is the COUNT of the biggest class, not its share — you would still have to divide by the total.',
        'The mean only equals the positive rate for a 0/1 target, and even then it is the minority share when positives are rare.',
        'Proportions always sum to 1, so this is 1 every time.'],
      explain: 'normalize=True turns the counts into shares; max() takes the biggest. That is the accuracy of always guessing it.' },
    lines: ['print(y.value_counts(normalize=True).max())'],
    decoys: ['print(y.value_counts().max())', 'print(y.mean())'],
    written: { prompt: 'Write the line printing the majority-class share of y.', solution: 'print(y.value_counts(normalize=True).max())', must: ['value_counts(normalize=True)', '.max()'] },
    walk: [['print(y.value_counts(normalize=True).max())', 'Write the number down. Every score you report afterwards goes next to it.']] });
})();
