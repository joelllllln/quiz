/* Better questions for the analytics tasks, stages 05–10 — same two changes:
   wrong answers that are real mistakes, each with its own explanation. */
(function () {
  var M = {

    dagrouptop: {
      wrong: [
        "df.groupby('region')['amount'].max()",
        "df.groupby('region').max()",
        "df.sort_values('amount').drop_duplicates(subset=['region'])"],
      why: [
        "This gives the biggest AMOUNT per region but loses the row it came from, so you cannot say which customer it was.",
        "Taking the max of every column separately builds a row that never existed: the biggest amount next to some other customer's name.",
        "Right shape, wrong direction — sorting ascending means the first row kept per region is the SMALLEST order."] },

    dapivot: {
      wrong: [
        "pd.pivot_table(df, index='region', columns='month', values='amount')",
        "df.pivot(index='region', columns='month', values='amount')",
        "pd.pivot_table(df, index='month', columns='region', values='amount', aggfunc='sum', fill_value=0)"],
      why: [
        "Without aggfunc you get the MEAN of each cell, not the total — and the empty combinations stay as NaN.",
        "Plain pivot cannot combine several rows into one cell: with more than one order per region per month it raises 'Index contains duplicate entries'.",
        "The right table, transposed: months down the side and regions across the top. Read the question — index is what goes down."] },

    dashare: {
      wrong: [
        "df['region_total'] = df.groupby('region')['amount'].sum()",
        "df['region_total'] = df.groupby('region')['amount'].agg('sum')",
        "df['region_total'] = df['amount'].sum()"],
      why: [
        "sum() gives one row per REGION, so assigning it as a column aligns on the index and fills almost everything with NaN.",
        "Same problem: agg('sum') is one value per group, not per row. transform is the one that keeps the frame's shape.",
        "That is the total for the WHOLE file repeated on every row — the share would then be of everything, not of the region."] },

    dagroupfilter: {
      wrong: [
        "big = df[df.groupby('region')['region'].transform('size') > 50]",
        "big = df[df.groupby('region').size() > 50]",
        "big = df.groupby('region').mean(numeric_only=True).query('amount > 50')"],
      why: [
        "This is actually correct — transform('size') puts each group's row count on every row. It is the faster idiom; filter() is the readable one.",
        "groupby().size() has one entry per region, so comparing it to the frame aligns on the wrong axis and raises.",
        "This filters on the average AMOUNT being over 50, not on how many rows the group has. Different question entirely."] },

    damerge: {
      wrong: [
        "merged = orders.merge(customers, on='customer_id')",
        "merged = orders.merge(customers, on='customer_id', how='outer')",
        "merged = orders.join(customers, on='customer_id')"],
      why: [
        "The default is an INNER join, so any order whose customer is missing from the other table is silently dropped — and the row count quietly falls.",
        "An outer join also keeps customers who never ordered, adding rows with no order data. Useful sometimes; not what 'keep every order' asked for.",
        ".join works on the INDEX of the right-hand frame, so unless customer_id is that frame's index this either raises or matches nothing."],
      avoid: [["how='inner'", "An inner join drops orders whose customer is missing. Use how='left' to keep every order."]] },

    damergecheck: {
      wrong: [
        "orders.merge(customers, on='customer_id', how='left', indicator=True)",
        "orders.merge(customers, on='customer_id', how='left', validate='one_to_one')",
        "orders.merge(customers.drop_duplicates('customer_id'), on='customer_id', how='left')"],
      why: [
        "indicator only REPORTS where each row matched. It never raises, so a duplicated key still multiplies your rows and you have to notice the count yourself.",
        "one_to_one demands that customer_id is unique on BOTH sides — but many orders share a customer, so this raises on perfectly good data.",
        "Dropping duplicates first hides the problem rather than reporting it: you silently pick one customer record and never learn there were two."] },

    daconcat: {
      wrong: [
        "all_months = pd.concat(frames)",
        "all_months = pd.concat(frames, axis=1)",
        "all_months = frames[0].append(frames[1:])"],
      why: [
        "Right stack, but without ignore_index every frame keeps its own 0, 1, 2… so the index repeats twelve times and any .loc lookup returns twelve rows.",
        "axis=1 glues them SIDE BY SIDE, matching on the index — you get twelve times the columns and mostly NaN.",
        ".append was removed in pandas 2.0. It raises AttributeError now, and concat was always the faster way to combine many frames."] },

    damelt: {
      wrong: [
        "pd.melt(df, id_vars=['jan', 'feb', 'mar'], value_vars=['region'], var_name='month', value_name='amount')",
        "pd.melt(df, value_vars=['jan', 'feb', 'mar'], var_name='month', value_name='amount')",
        "df.set_index('region').stack().reset_index()"],
      why: [
        "id_vars and value_vars are the wrong way round: this keeps the three months as identifiers and folds the region down into rows.",
        "Without id_vars the region column is dropped entirely, so you get months and amounts with no idea which region they belong to.",
        "This does reshape it, but the new columns come out unnamed (level_1 and 0), so you have to rename them afterwards anyway."] },

    dawide: {
      wrong: [
        "wide = long.pivot(index='month', columns='region', values='amount').fillna(0)",
        "wide = long.pivot_table(index='region', columns='month', values='amount')",
        "wide = long.groupby(['region', 'month'])['amount'].sum().reset_index()"],
      why: [
        "Transposed: months down the side, regions across the top. The mirror image of what was asked for.",
        "This works, but pivot_table averages any duplicates and quietly hides that there were duplicates at all. pivot raises instead, which is what you want here.",
        "That is a long table again — one row per region-month — not the wide shape a reader wants."] },

    dalatest: {
      wrong: [
        "latest = df.drop_duplicates(subset=['customer_id'], keep='last')",
        "df = df.sort_values('date', ascending=False)\nlatest = df.drop_duplicates(subset=['customer_id'], keep='last')",
        "latest = df.sort_values('date').groupby('customer_id').last()"],
      why: [
        "No sort, so 'last' means last in file order — which has nothing to do with which row is newest.",
        "Sorted newest-first and then keeping the LAST row per customer gives you their OLDEST record. Match the sort to the keep.",
        "Nearly right, and often used — but .last() takes the last non-missing value of each column separately, so a row with a gap can pick up a value from an earlier record."] },

    dadates: {
      wrong: [
        "df['date'] = pd.to_datetime(df['date'])",
        "df['date'] = pd.to_datetime(df['date'], errors='ignore')",
        "df['date'] = df['date'].astype('datetime64[ns]')"],
      why: [
        "The right function, but one unreadable value raises and stops the whole script instead of telling you how many were bad.",
        "errors='ignore' leaves the entire column as TEXT if anything fails — so it looks like it worked and every date operation afterwards misbehaves.",
        "astype cannot parse mixed or unusual formats and raises. to_datetime exists precisely because dates arrive messy."] },

    dadateparts: {
      wrong: [
        "df['year'] = df['date'].year\ndf['month'] = df['date'].month\ndf['weekday'] = df['date'].day_name()",
        "df['year'] = df['date'].dt.year()\ndf['month'] = df['date'].dt.month()\ndf['weekday'] = df['date'].dt.day_name",
        "df['year'] = df['date'].dt.strftime('%Y')\ndf['month'] = df['date'].dt.strftime('%m')\ndf['weekday'] = df['date'].dt.strftime('%A')"],
      why: [
        "Date parts on a whole column live behind .dt — without it, AttributeError on the first line.",
        "Exactly backwards: year and month are attributes (no brackets), day_name is a method (brackets). This raises on line one.",
        "This works, but everything comes out as TEXT — so '02' sorts before '10' correctly, yet you can no longer do arithmetic or compare years as numbers."] },

    damonthly: {
      wrong: [
        "df.groupby(df['date'].dt.month)['amount'].sum()",
        "df.groupby(df['date'].dt.strftime('%B'))['amount'].sum()",
        "df.resample('M', on='date')['amount'].sum()"],
      why: [
        "The month number alone merges January 2023 with January 2024 into one row — a classic way to make a trend disappear.",
        "The month NAME sorts alphabetically, so your chart runs April, August, December… and looks like nonsense.",
        "This is correct and arguably nicer — resample keeps empty months in the series. It needs a real datetime column, which is the only reason it is not the answer here."] },

    darolling: {
      wrong: [
        "daily['rolling7'] = daily['amount'].rolling(7)",
        "daily['rolling7'] = daily['amount'].rolling(7).mean().shift(1)",
        "daily['rolling7'] = daily['amount'].rolling('7D').mean()"],
      why: [
        "A rolling object is a recipe, not numbers — assigning it as a column raises.",
        "The extra shift moves every average one day later, so today's row shows the week ending YESTERDAY. Sometimes deliberate; here it is off by one.",
        "The '7D' form works only on a datetime index and means 'seven days of clock time', which differs from seven ROWS when days are missing."] },

    dalag: {
      wrong: [
        "monthly['prev'] = monthly['amount'].shift(-1)\nmonthly['change'] = monthly['amount'].pct_change() * 100",
        "monthly['prev'] = monthly['amount'].shift(1)\nmonthly['change'] = monthly['amount'].diff()",
        "monthly['prev'] = monthly['amount'].shift(1)\nmonthly['change'] = (monthly['amount'] / monthly['prev']) * 100"],
      why: [
        "shift(-1) reaches into the FUTURE — every row would be compared with the month after it, which in a forecast is a leak.",
        "diff() gives the absolute change in pounds, not the percentage. Both are useful; only one was asked for.",
        "This is the ratio, not the change: an unchanged month shows 100 instead of 0. Subtract 1 before multiplying, or use pct_change."] },

    dawindow: {
      wrong: [
        "cutoff = pd.Timestamp.now() - pd.Timedelta(days=90)\nrecent = df[df['date'] > cutoff]",
        "recent = df[df['date'] > df['date'].max() - 90]",
        "recent = df.sort_values('date').tail(90)"],
      why: [
        "Anchoring to today means the same script gives a different answer tomorrow — and if the data is a month old, it may return nothing at all.",
        "Subtracting a plain number from a date raises. A length of time has to be a Timedelta.",
        "tail(90) takes 90 ROWS, not 90 days. On busy data that is a few hours; on sparse data it is years."] },

    daplotbar: {
      wrong: [
        "totals.plot(kind='bar')\nplt.title('Total sales by region')\nplt.ylabel('Amount (£)')\nplt.show()",
        "totals.sort_values(ascending=False).plot(kind='bar')\nplt.show()\nplt.title('Total sales by region')",
        "plt.bar(totals)\nplt.title('Total sales by region')\nplt.show()"],
      why: [
        "Labelled properly, but unsorted — the reader has to do the ranking themselves, which is the one job a bar chart is for.",
        "Everything after plt.show() lands on a NEW, empty figure, so the title never appears on the chart you just drew.",
        "plt.bar needs the labels and the heights separately: plt.bar(totals.index, totals.values). The Series' own .plot already knows both."] },

    daplotline: {
      wrong: [
        "monthly.plot(kind='bar', marker='o')\nplt.show()",
        "monthly.plot(kind='line')\nplt.show()",
        "plt.plot(monthly)\nplt.xlabel('Month')\nplt.show()"],
      why: [
        "Bars say 'these are separate categories'. For a monthly series you want a line, which says 'this is one thing changing over time'.",
        "This draws the right chart but leaves the axes unlabelled, so nobody can tell what is being measured or in what units.",
        "It plots, but against the row NUMBER rather than the month labels, so the x axis reads 0, 1, 2 instead of the months."] },

    daplothist: {
      wrong: [
        "df['amount'].plot(kind='hist')",
        "df['amount'].value_counts().plot(kind='bar')",
        "df.plot(kind='hist', bins=30)"],
      why: [
        "The default of ten bins is usually too coarse to show a long tail, which is the main thing a histogram of money is for.",
        "One bar per distinct amount — with continuous data that is thousands of one-row bars and no visible shape at all.",
        "Without naming a column, pandas draws EVERY numeric column on the same axes, overlapping and unreadable."] },

    daplotgroup: {
      wrong: [
        "df.boxplot(column='region', by='amount')",
        "df.groupby('region')['amount'].mean().plot(kind='bar')",
        "df.plot(kind='box', column='amount', by='region')"],
      why: [
        "column has to be the NUMBER and by the label. This way round asks for a box plot of text, which raises.",
        "A bar of averages is the chart this task exists to replace: it hides the spread, so two regions with the same mean look identical.",
        ".plot(kind='box') does not take column and by — that pair belongs to .boxplot()."] },

    daplotscatter: {
      wrong: [
        "df.plot(kind='scatter', x='amount', y='quantity', alpha=0.3)",
        "df.plot(kind='scatter', x='quantity', y='amount')",
        "df[['quantity', 'amount']].plot(kind='line')"],
      why: [
        "Axes swapped: the thing you are explaining (amount) belongs on y, the thing explaining it on x.",
        "Right chart, but with thousands of solid points the middle becomes one black blob — alpha is what makes the density visible.",
        "A line chart joins the points in row order, drawing a scribble that implies a sequence which is not there."] },

    daplotsave: {
      wrong: [
        "totals.plot(kind='bar', figsize=(8, 4))\nplt.show()\nplt.savefig('sales.png', dpi=150)",
        "totals.plot(kind='bar', figsize=(8, 4))\nplt.savefig('sales.png')",
        "totals.plot(kind='bar', size=(8, 4))\nplt.tight_layout()\nplt.savefig('sales.png', dpi=150)"],
      why: [
        "show() clears the figure, so the file that gets written is blank — the single most common matplotlib bug there is.",
        "It saves, but at the default 100 dpi and without tight_layout, so rotated labels get cut off at the edges.",
        "The argument is figsize, not size — this raises before anything is drawn."],
      avoid: [["plt.show()", "Save BEFORE show(): plt.show() clears the figure, so anything saved afterwards is a blank image."]] },

    dacentre: {
      wrong: [
        "print(df['amount'].mean(), df['amount'].mode())",
        "print(df['amount'].mean(), df['amount'].quantile(0.5))",
        "print(df.mean(), df.median())"],
      why: [
        "The mode is the most COMMON value, which on continuous money data is usually meaningless — often just whichever price repeats.",
        "quantile(0.5) IS the median, so this is right — just spelled the long way. Worth knowing they are the same thing.",
        "Without naming the column you get a value for every numeric column at once, which answers a different question and prints a wall of numbers."] },

    daspread: {
      wrong: [
        "df['amount'].quantile(0.25, 0.5, 0.75)",
        "df['amount'].quantile([25, 50, 75])",
        "df['amount'].describe()[['25%', '50%', '75%']]"],
      why: [
        "quantile takes ONE list, not three separate arguments — the second argument is actually the interpolation method, so this raises.",
        "Quantiles are fractions between 0 and 1. Asking for the 25th quantile is out of range and raises.",
        "This does pull the three quartiles out, but only after computing eight statistics you did not ask for."] },

    daoutlier_iqr: {
      wrong: [
        "low = q1 - 1.5 * q1\nhigh = q3 + 1.5 * q3",
        "low = mean - 3 * std\nhigh = mean + 3 * std",
        "low = df['amount'].quantile(0.01)\nhigh = df['amount'].quantile(0.99)"],
      why: [
        "The multiplier applies to the interquartile RANGE — the gap between the quartiles — not to each quartile separately.",
        "That is the three-sigma rule, a different convention. It also uses the mean and standard deviation, which the outliers themselves distort.",
        "Trimming the top and bottom 1% always removes 2% of the rows, whether or not any of them are unusual. The IQR rule adapts to the data."] },

    dacorr: {
      wrong: [
        "df.corr()['amount'].sort_values(ascending=False)",
        "df.corr(numeric_only=True)['amount']",
        "df.corr(numeric_only=True).sort_values('amount', ascending=False)"],
      why: [
        "Without numeric_only=True this raises as soon as there is a text column — which there always is.",
        "Right numbers, but unsorted, so on twenty columns you are left reading a list by eye.",
        "This sorts the ROWS of the whole matrix but still hands back the entire grid, when one column was what you wanted."] },

    dagroupdiff: {
      wrong: [
        "stats.ttest_ind(a, b)",
        "stats.ttest_rel(a, b)",
        "stats.ttest_1samp(a, b.mean())"],
      why: [
        "The default assumes both groups have the same variance. They rarely do, and Welch's version costs nothing — pass equal_var=False.",
        "ttest_rel is for PAIRED data: the same people measured twice. Two separate groups of customers are not pairs, and it raises if they differ in size.",
        "A one-sample test compares one group against a fixed number, treating the other group's mean as if it were known exactly rather than estimated."] },

    daci: {
      wrong: [
        "se = df['amount'].std() / len(df)",
        "se = df['amount'].std()",
        "se = df['amount'].sem() * 1.96"],
      why: [
        "Dividing by n rather than by its square root makes the interval far too narrow — it would claim precision you do not have.",
        "That is the spread of the DATA, not of the estimate. Using it would give an interval covering most individual orders instead of the average.",
        "sem() is exactly the standard error, so this is nearly right — but the 1.96 has been folded in early, and then multiplying again in the bounds double-counts it."] },

    dasegment: {
      wrong: [
        "seg['share'] = (100 * seg['total'] / len(df)).round(1)",
        "seg['share'] = seg['total'].pct_change().round(1)",
        "seg['share'] = (100 * seg['total'] / seg['customers']).round(1)"],
      why: [
        "Dividing by the number of ROWS gives an amount per row, not a share of the money — and the column will not add to 100.",
        "pct_change compares each region with the one above it in the table, which depends entirely on the sort order.",
        "That is revenue per customer — a genuinely useful column, but not a share of the total."] },

    dasplitxy: {
      wrong: [
        "X = df\ny = df['churn']",
        "X = df.drop('churn')\ny = df['churn']",
        "X = df.drop(columns=['churn'])\ny = df[['churn']]"],
      why: [
        "The target is still inside X, so the model can read the answer straight off the input and will score perfectly — until it meets real data.",
        "Without columns=, drop looks for a ROW labelled 'churn' and raises KeyError.",
        "Double brackets make y a one-column FRAME rather than a Series. Many estimators warn or misbehave, and predictions come back the wrong shape."],
      avoid: [["X = df[['churn'", "X must be the features WITHOUT the target. Drop churn from X and keep it only in y."]] },

    dadummies: {
      wrong: [
        "X = pd.get_dummies(df, columns=['city', 'region'])",
        "X = pd.get_dummies(df)",
        "X = df.copy()\nX['city'] = X['city'].astype('category').cat.codes"],
      why: [
        "Every level gets a column, so each set is perfectly predictable from the others — harmless for trees, but it makes linear coefficients unstable.",
        "Encoding the whole frame catches every text column, including ids and free-text notes, which can explode into thousands of columns.",
        "Integer codes imply an ORDER — that city 3 is somehow more than city 1. Fine for a tree, misleading for anything linear."] },

    datimesplit: {
      wrong: [
        "train, test = train_test_split(df, test_size=0.2, random_state=42)",
        "train = df.head(int(0.8 * len(df)))\ntest = df.tail(int(0.2 * len(df)))",
        "train = df[df['date'] < cutoff]\ntest = df[df['date'] < cutoff]"],
      why: [
        "A random split scatters future rows into training, so the model learns from days it will not have seen in production. The score comes out far too good.",
        "This only works if the frame happens to be sorted by date already — and nothing here guarantees that, which is exactly how it bites you.",
        "Both halves use the same condition, so the test set IS the training set. The score would be a memory test."],
      avoid: [["train_test_split(", "On dated data, split at a date rather than at random — a random split trains on the future."]] },

    dabaseline_num: {
      wrong: [
        "guess = y_test.mean()\nbaseline = mean_absolute_error(y_test, [guess] * len(y_test))",
        "guess = y_train.mean()\nbaseline = mean_absolute_error(y_train, [guess] * len(y_train))",
        "baseline = mean_absolute_error(y_test, y_train[:len(y_test)])"],
      why: [
        "Taking the mean of the TEST set is leakage: the baseline has seen the answers, so it flatters itself and sets the bar too high.",
        "Scoring on the training data tells you nothing about held-out performance — and it is the comparison every model would then look good against.",
        "Comparing the test answers against a slice of the training answers compares two unrelated lists of numbers."] }
  };

  (window.CODETASKS || []).forEach(function (t) {
    var key = t.key.replace(/-/g, '_');
    var m = M[t.key] || M[key];
    if (!m) return;
    if (m.wrong) t.mcq.wrong = m.wrong;
    if (m.why) t.mcq.whyWrong = m.why;
    if (m.avoid) t.written.avoid = m.avoid;
  });
})();
