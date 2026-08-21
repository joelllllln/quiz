/* Coding tasks — data analytics, stage 09 and 10: describing a dataset honestly,
   and turning a tidy table into something a model can be fitted to. */
(function () {
  window.CODETASKS = window.CODETASKS || [];
  var S9 = '33 · Describing it honestly';
  var S10 = '34 · Getting data ready for a model';

  window.CODETASKS.push(

    { key: 'dacentre', group: S9, lvl: 1, title: 'Mean, median, and which to quote',
      ask: 'Report the mean, median and standard deviation of amount, and show why the two centres differ.',
      why: 'Quoting a mean on skewed money data overstates the typical customer, every time.',
      mcq: {
        q: 'Which line shows the mean and median side by side?',
        correct: "print(df['amount'].mean(), df['amount'].median())",
        wrong: [
          "print(df['amount'].mean(), df['amount'].mode())",
          "print(df['amount'].average(), df['amount'].median())",
          "print(mean(df['amount']), median(df['amount']))"],
        explain: "mean and median are both methods on the column. There is no .average(), and the plain functions mean()/median() are not built in — they come from statistics or numpy." },
      lines: [
        "print('mean  ', round(df['amount'].mean(), 2))",
        "print('median', round(df['amount'].median(), 2))",
        "print('std   ', round(df['amount'].std(), 2))",
        "print('skew  ', round(df['amount'].skew(), 2))"],
      decoys: ["print(df['amount'].average())", "print(df['amount'].mode())"],
      written: {
        prompt: 'Write the code: print the rounded mean, median, standard deviation and skew of the amount column, each labelled.',
        solution: "print('mean  ', round(df['amount'].mean(), 2))\nprint('median', round(df['amount'].median(), 2))\nprint('std   ', round(df['amount'].std(), 2))\nprint('skew  ', round(df['amount'].skew(), 2))",
        must: ['.mean()', '.median()', '.std()', '.skew()'] },
      walk: [
        ["print('mean  ', round(df['amount'].mean(), 2))", "The average — pulled about by every large order."],
        ["print('median', round(df['amount'].median(), 2))", "The middle value. When these two are far apart, the median is the honest 'typical'."],
        ["print('std   ', round(df['amount'].std(), 2))", "The spread. A standard deviation bigger than the mean is a sign of a long tail."],
        ["print('skew  ', round(df['amount'].skew(), 2))", "Positive means a tail to the right, which is what money data almost always looks like."]] },

    { key: 'daspread', group: S9, lvl: 2, title: 'Quartiles and the middle half',
      ask: 'Report the 25th, 50th and 75th percentiles of amount, and the interquartile range.',
      why: 'Percentiles survive outliers, so they describe a skewed column far better than a mean and a standard deviation.',
      mcq: {
        q: 'Which line gives the three quartiles at once?',
        correct: "df['amount'].quantile([0.25, 0.5, 0.75])",
        wrong: [
          "df['amount'].quantile(0.25, 0.5, 0.75)",
          "df['amount'].percentile([25, 50, 75])",
          "df['amount'].describe(percentiles=[25, 50, 75])"],
        explain: "quantile takes a LIST of fractions between 0 and 1 — not several arguments, and not whole-number percentages. There is no .percentile method on a Series." },
      lines: [
        "q = df['amount'].quantile([0.25, 0.5, 0.75])",
        "iqr = q[0.75] - q[0.25]",
        "print(q.round(2))",
        "print('middle half spans', round(iqr, 2))"],
      decoys: ["q = df['amount'].percentile([25, 50, 75])", "iqr = q[0.75] + q[0.25]"],
      written: {
        prompt: 'Write the code: take the three quartiles of amount, work out the interquartile range, print the quartiles rounded and then the range.',
        solution: "q = df['amount'].quantile([0.25, 0.5, 0.75])\niqr = q[0.75] - q[0.25]\nprint(q.round(2))\nprint('middle half spans', round(iqr, 2))",
        must: ['quantile([0.25, 0.5, 0.75])', 'q[0.75] - q[0.25]'] },
      walk: [
        ["q = df['amount'].quantile([0.25, 0.5, 0.75])", "A quarter of the rows are below the first number, half below the second, three quarters below the third."],
        ["iqr = q[0.75] - q[0.25]", "The interquartile range: the width of the middle half, unmoved by the extremes."],
        ["print(q.round(2))", "Three numbers that describe the shape without pretending it is symmetric."],
        ["print('middle half spans', round(iqr, 2))", "A sentence a non-technical reader can use: half of all orders sit within this range."]] },

    { key: 'daoutlier-iqr', group: S9, lvl: 2, title: 'Flag the outliers by rule',
      ask: 'Flag the rows of df whose amount is more than 1.5 interquartile ranges outside the quartiles, and report how many.',
      why: 'A stated rule beats "it looked too big" — and it is the same rule the whiskers on a box plot use.',
      mcq: {
        q: 'Which pair of bounds implements the 1.5 IQR rule?',
        correct: "low = q1 - 1.5 * iqr\nhigh = q3 + 1.5 * iqr",
        wrong: [
          "low = q1 - 1.5 * q3\nhigh = q3 + 1.5 * q1",
          "low = mean - 1.5 * std\nhigh = mean + 1.5 * std",
          "low = q1 * 1.5\nhigh = q3 * 1.5"],
        explain: "The rule is one and a half INTERQUARTILE RANGES beyond each quartile. The mean-and-standard-deviation version is a different rule, and it is the one outliers themselves distort." },
      lines: [
        "q1, q3 = df['amount'].quantile([0.25, 0.75])",
        "iqr = q3 - q1",
        "low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr",
        "outliers = df[(df['amount'] < low) | (df['amount'] > high)]",
        "print(len(outliers), 'outliers outside', round(low, 2), 'to', round(high, 2))"],
      decoys: ["low, high = q1 * 1.5, q3 * 1.5", "outliers = df[df['amount'] < low & df['amount'] > high]"],
      written: {
        prompt: 'Write the code: take the two quartiles, work out the IQR and the 1.5-IQR bounds, select the rows outside them, and print how many and where the bounds are.',
        solution: "q1, q3 = df['amount'].quantile([0.25, 0.75])\niqr = q3 - q1\nlow, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr\noutliers = df[(df['amount'] < low) | (df['amount'] > high)]\nprint(len(outliers), 'outliers outside', round(low, 2), 'to', round(high, 2))",
        must: ['quantile([0.25, 0.75])', 'q3 - q1', '1.5 * iqr', '|'] },
      walk: [
        ["q1, q3 = df['amount'].quantile([0.25, 0.75])", "Two values unpacked into two names in one line."],
        ["iqr = q3 - q1", "The width of the middle half."],
        ["low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr", "The standard rule, and exactly what a box plot's whiskers draw."],
        ["outliers = df[(df['amount'] < low) | (df['amount'] > high)]", "Below OR above, brackets round each half."],
        ["print(len(outliers), 'outliers outside', round(low, 2), 'to', round(high, 2))", "Report the count AND the bounds, so the reader can judge the rule for themselves."]] },

    { key: 'dacorr', group: S9, lvl: 2, title: 'What moves with what',
      ask: 'Rank the numeric columns of df by how strongly they correlate with amount.',
      why: 'The first pass at "what drives this" — as long as you say out loud what correlation cannot tell you.',
      mcq: {
        q: 'Which line ranks every numeric column by its correlation with amount?',
        correct: "df.corr(numeric_only=True)['amount'].sort_values(ascending=False)",
        wrong: [
          "df.corr()['amount'].sort_values(ascending=False)",
          "df.corr(numeric_only=True).sort_values('amount')",
          "df['amount'].corr().sort_values(ascending=False)"],
        explain: "numeric_only=True skips the text columns, which otherwise raise in current pandas. Taking the ['amount'] column of the matrix is what turns a grid into a ranking." },
      lines: [
        "corr = df.corr(numeric_only=True)['amount']",
        "corr = corr.drop('amount').sort_values(ascending=False)",
        "print(corr.round(2))"],
      decoys: ["corr = df['amount'].corr()", "corr = df.corr(numeric_only=True).sort_values('amount')"],
      written: {
        prompt: 'Write the code: take the correlations with amount, drop amount itself, sort them strongest first and print them rounded.',
        solution: "corr = df.corr(numeric_only=True)['amount']\ncorr = corr.drop('amount').sort_values(ascending=False)\nprint(corr.round(2))",
        must: ['corr(numeric_only=True)', "['amount']", 'sort_values'] },
      walk: [
        ["corr = df.corr(numeric_only=True)['amount']", "One column out of the correlation matrix: everything against amount."],
        ["corr = corr.drop('amount').sort_values(ascending=False)", "Drop the 1.0 where amount meets itself, then rank."],
        ["print(corr.round(2))", "Two decimal places is plenty. And say the sentence out loud: correlation measures a STRAIGHT-LINE relationship, and it is not evidence of cause."]] },

    { key: 'dagroupdiff', group: S9, lvl: 3, title: 'Is the gap between two groups real?',
      ask: 'Compare the average amount of group A and group B, and test whether the difference could be chance.',
      why: 'Two averages that differ is not a finding. Two averages that differ by more than the noise is.',
      mcq: {
        q: 'Which test compares the means of two independent groups without assuming equal variances?',
        correct: "stats.ttest_ind(a, b, equal_var=False)",
        wrong: [
          "stats.ttest_ind(a, b)",
          "stats.ttest_rel(a, b)",
          "stats.chi2_contingency(a, b)"],
        explain: "Welch's t-test (equal_var=False) is the safer default for two separate groups. ttest_rel is for PAIRED measurements — the same customers before and after — and chi-squared is for counts in categories." },
      lines: [
        "a = df.loc[df['group'] == 'A', 'amount']",
        "b = df.loc[df['group'] == 'B', 'amount']",
        "print(round(a.mean() - b.mean(), 2), 'difference in means')",
        "t, p = stats.ttest_ind(a, b, equal_var=False)",
        "print('p =', round(p, 4), '| n =', len(a), len(b))"],
      decoys: ["t, p = stats.ttest_rel(a, b)", "print(stats.chi2_contingency(a, b))"],
      written: {
        prompt: 'Write the code: pull the amounts for group A and group B, print the difference in means, run a Welch t-test, and print the p-value with both group sizes.',
        solution: "a = df.loc[df['group'] == 'A', 'amount']\nb = df.loc[df['group'] == 'B', 'amount']\nprint(round(a.mean() - b.mean(), 2), 'difference in means')\nt, p = stats.ttest_ind(a, b, equal_var=False)\nprint('p =', round(p, 4), '| n =', len(a), len(b))",
        must: ['ttest_ind', 'equal_var=False', 'mean()', 'len(a)'] },
      walk: [
        ["a = df.loc[df['group'] == 'A', 'amount']", "One column of numbers per group — .loc picks the rows and the column together."],
        ["b = df.loc[df['group'] == 'B', 'amount']", "The same for the other group."],
        ["print(round(a.mean() - b.mean(), 2), 'difference in means')", "The effect size comes FIRST. A p-value with no effect size is half an answer."],
        ["t, p = stats.ttest_ind(a, b, equal_var=False)", "Welch's version, because two real groups rarely have matching spreads."],
        ["print('p =', round(p, 4), '| n =', len(a), len(b))", "Report the group sizes too: with 50,000 rows a meaningless gap will still be significant."]] },

    { key: 'daci', group: S9, lvl: 3, title: 'How sure are you of that average?',
      ask: 'Report the average amount with a 95% confidence interval around it.',
      why: '"£43.10" invites false confidence. "£43.10, give or take £1.80" is what you actually know.',
      mcq: {
        q: 'Which line gives the standard error of the mean?',
        correct: "se = df['amount'].std() / np.sqrt(len(df))",
        wrong: [
          "se = df['amount'].std() / len(df)",
          "se = df['amount'].std() * np.sqrt(len(df))",
          "se = df['amount'].mean() / np.sqrt(len(df))"],
        explain: "The standard error is the standard deviation divided by the SQUARE ROOT of the sample size — which is why four times the data only halves the interval." },
      lines: [
        "mean = df['amount'].mean()",
        "se = df['amount'].std() / np.sqrt(len(df))",
        "low, high = mean - 1.96 * se, mean + 1.96 * se",
        "print(round(mean, 2), '(', round(low, 2), 'to', round(high, 2), ')')"],
      decoys: ["se = df['amount'].std() / len(df)", "low, high = mean - se, mean + se"],
      written: {
        prompt: 'Write the code: take the mean, the standard error, the 95% bounds at 1.96 standard errors, and print the mean with its interval.',
        solution: "mean = df['amount'].mean()\nse = df['amount'].std() / np.sqrt(len(df))\nlow, high = mean - 1.96 * se, mean + 1.96 * se\nprint(round(mean, 2), '(', round(low, 2), 'to', round(high, 2), ')')",
        must: ['np.sqrt(len(df))', '1.96', 'mean -', 'mean +'] },
      walk: [
        ["mean = df['amount'].mean()", "The estimate."],
        ["se = df['amount'].std() / np.sqrt(len(df))", "How much that estimate would wobble if you took another sample this size."],
        ["low, high = mean - 1.96 * se, mean + 1.96 * se", "1.96 is the 95% number for a normal distribution and is worth memorising."],
        ["print(round(mean, 2), '(', round(low, 2), 'to', round(high, 2), ')')", "Say it as: 95 intervals built this way in 100 would contain the true average."]] },

    { key: 'dasegment', group: S9, lvl: 2, title: 'A segment table people can read',
      ask: 'Build a table by region showing the number of customers, the total amount, the average amount and each region\'s share of the total.',
      why: 'This one table answers most first-round stakeholder questions, and it is four lines.',
      mcq: {
        q: 'Which line adds each region\'s share of the overall total?',
        correct: "seg['share'] = (100 * seg['total'] / seg['total'].sum()).round(1)",
        wrong: [
          "seg['share'] = (100 * seg['total'] / seg['customers'].sum()).round(1)",
          "seg['share'] = seg['total'].pct_change().round(1)",
          "seg['share'] = (100 * seg['total'] / len(df)).round(1)"],
        explain: "Each region's total divided by the sum of the totals. Dividing by the row count or by a different column gives a number that looks plausible and means nothing." },
      lines: [
        "seg = df.groupby('region').agg(customers=('customer_id', 'nunique'),",
        "                               total=('amount', 'sum'),",
        "                               average=('amount', 'mean'))",
        "seg['share'] = (100 * seg['total'] / seg['total'].sum()).round(1)",
        "print(seg.round(2).sort_values('total', ascending=False))"],
      decoys: ["seg['share'] = seg['total'].pct_change().round(1)", "                               total=('amount', 'count'),"],
      written: {
        prompt: 'Write the code: aggregate distinct customers, total and average amount per region with named columns, add a rounded share of total, and print it sorted by total.',
        solution: "seg = df.groupby('region').agg(customers=('customer_id', 'nunique'),\n                               total=('amount', 'sum'),\n                               average=('amount', 'mean'))\nseg['share'] = (100 * seg['total'] / seg['total'].sum()).round(1)\nprint(seg.round(2).sort_values('total', ascending=False))",
        must: ['groupby', 'nunique', "('amount', 'sum')", "seg['share']"] },
      walk: [
        ["seg = df.groupby('region').agg(customers=('customer_id', 'nunique'),", "Named aggregation: the column name you want, then the column and the function. No renaming afterwards."],
        ["                               total=('amount', 'sum'),", "One line per statistic keeps it readable."],
        ["                               average=('amount', 'mean'))", "Customers, total and average together tell three different stories."],
        ["seg['share'] = (100 * seg['total'] / seg['total'].sum()).round(1)", "Share of the whole — the column stakeholders read first."],
        ["print(seg.round(2).sort_values('total', ascending=False))", "Sorted by size, rounded for reading. A finished deliverable."]] },

    { key: 'dasplitxy', group: S10, lvl: 1, title: 'Split the table into X and y',
      ask: 'Separate df into the features X and the target y, where the target column is churn.',
      why: 'Every model in scikit-learn takes exactly this pair, and getting the target into X is the classic leak.',
      mcq: {
        q: 'Which pair separates features from target correctly?',
        correct: "X = df.drop(columns=['churn'])\ny = df['churn']",
        wrong: [
          "X = df\ny = df['churn']",
          "X = df.drop('churn')\ny = df['churn']",
          "X = df[['churn']]\ny = df.drop(columns=['churn'])"],
        explain: "The target must NOT be in X — leaving it in lets the model read the answer and score perfectly. df.drop('churn') without columns= tries to drop a ROW with that label." },
      lines: [
        "X = df.drop(columns=['churn'])",
        "y = df['churn']",
        "print(X.shape, y.shape)",
        "print(y.value_counts(normalize=True).round(3))"],
      decoys: ["X = df.drop('churn')", "X = df"],
      written: {
        prompt: 'Write the code: drop the churn column into X, take churn into y, print both shapes, then print the class balance as proportions.',
        solution: "X = df.drop(columns=['churn'])\ny = df['churn']\nprint(X.shape, y.shape)\nprint(y.value_counts(normalize=True).round(3))",
        must: ["drop(columns=['churn'])", "y = df['churn']", 'X.shape', 'value_counts'] },
      walk: [
        ["X = df.drop(columns=['churn'])", "Everything except the answer. columns= is what makes it drop a column rather than a row."],
        ["y = df['churn']", "The answer, on its own, in the same row order as X."],
        ["print(X.shape, y.shape)", "The row counts must match. If they do not, something was filtered on one side only."],
        ["print(y.value_counts(normalize=True).round(3))", "The class balance decides your metric. 97% one class means accuracy is already useless."]] },

    { key: 'dadummies', group: S10, lvl: 1, title: 'Turn categories into numbers',
      ask: 'One-hot encode the city and region columns of df, dropping the first level of each.',
      why: 'Models take numbers. One-hot encoding is the honest way to hand them a category.',
      mcq: {
        q: 'Which line encodes both columns and avoids the redundant level?',
        correct: "X = pd.get_dummies(df, columns=['city', 'region'], drop_first=True)",
        wrong: [
          "X = pd.get_dummies(df, columns=['city', 'region'])",
          "X = df[['city', 'region']].astype('category').cat.codes",
          "X = pd.get_dummies(df['city'], df['region'], drop_first=True)"],
        explain: "drop_first removes one level per column, which linear models need to avoid perfect collinearity. Integer codes would invent an ORDER — fine for trees, misleading for anything linear." },
      lines: [
        "X = pd.get_dummies(df, columns=['city', 'region'], drop_first=True)",
        "print(df.shape, '->', X.shape)",
        "print([c for c in X.columns if c.startswith('city_')][:5])"],
      decoys: ["X = pd.get_dummies(df, columns=['city', 'region'])", "X = df[['city', 'region']].cat.codes"],
      written: {
        prompt: 'Write the code: one-hot encode city and region dropping the first level, print the shape before and after, then show the first few new city columns.',
        solution: "X = pd.get_dummies(df, columns=['city', 'region'], drop_first=True)\nprint(df.shape, '->', X.shape)\nprint([c for c in X.columns if c.startswith('city_')][:5])",
        must: ['get_dummies', "columns=['city', 'region']", 'drop_first=True'] },
      walk: [
        ["X = pd.get_dummies(df, columns=['city', 'region'], drop_first=True)", "One new 0/1 column per level, minus one per original column."],
        ["print(df.shape, '->', X.shape)", "Watch the column count. A high-cardinality column such as postcode can turn 20 columns into 2,000."],
        ["print([c for c in X.columns if c.startswith('city_')][:5])", "Read the new names back — they are what your coefficients or importances will be labelled with."]] },

    { key: 'datimesplit', group: S10, lvl: 3, title: 'Split by time, not at random',
      ask: 'Split a dated frame into training and test sets by date, training on everything before the last 90 days.',
      why: 'On anything with a date, a random split trains on the future and reports a score you will never see again.',
      mcq: {
        q: 'Which pair splits at a date instead of at random?',
        correct: "train = df[df['date'] <= cutoff]\ntest = df[df['date'] > cutoff]",
        wrong: [
          "train, test = train_test_split(df, test_size=0.2, random_state=42)",
          "train = df.sample(frac=0.8)\ntest = df.drop(train.index)",
          "train = df.head(int(0.8 * len(df)))\ntest = df.tail(int(0.2 * len(df)))"],
        explain: "Everything before the cutoff trains, everything after is the test — the same order the model will meet in production. Taking the head and tail only works if the frame is already sorted by date, which is exactly the assumption that bites you." },
      lines: [
        "df = df.sort_values('date')",
        "cutoff = df['date'].max() - pd.Timedelta(days=90)",
        "train = df[df['date'] <= cutoff]",
        "test = df[df['date'] > cutoff]",
        "print(len(train), len(test), '| test starts', test['date'].min().date())"],
      decoys: ["train, test = train_test_split(df, test_size=0.2)", "train = df.sample(frac=0.8)"],
      written: {
        prompt: 'Write the code: sort by date, set a cutoff 90 days before the last date, split into train and test either side of it, and print both sizes with the test start date.',
        solution: "df = df.sort_values('date')\ncutoff = df['date'].max() - pd.Timedelta(days=90)\ntrain = df[df['date'] <= cutoff]\ntest = df[df['date'] > cutoff]\nprint(len(train), len(test), '| test starts', test['date'].min().date())",
        must: ['pd.Timedelta(days=90)', "df['date'] <= cutoff", "df['date'] > cutoff"] },
      walk: [
        ["df = df.sort_values('date')", "Order first, so the split means what you think."],
        ["cutoff = df['date'].max() - pd.Timedelta(days=90)", "Anchored to the data, so the same code gives the same split next month."],
        ["train = df[df['date'] <= cutoff]", "The past."],
        ["test = df[df['date'] > cutoff]", "The future, which the model must never have seen."],
        ["print(len(train), len(test), '| test starts', test['date'].min().date())", "State the split in the write-up. A reviewer's first question about any time-series score is where you cut it."]] },

    { key: 'dabaseline-num', group: S10, lvl: 2, title: 'The number to beat',
      ask: 'Before fitting anything, work out the error you would get by always predicting the training mean.',
      why: 'A model that cannot beat "always guess the average" has told you nothing, and you need that number first.',
      mcq: {
        q: 'Which pair gives the baseline error on the test set?',
        correct: "guess = y_train.mean()\nbaseline = mean_absolute_error(y_test, [guess] * len(y_test))",
        wrong: [
          "guess = y_test.mean()\nbaseline = mean_absolute_error(y_test, [guess] * len(y_test))",
          "guess = y_train.mean()\nbaseline = mean_absolute_error(y_train, [guess] * len(y_train))",
          "baseline = mean_absolute_error(y_test, y_train)"],
        explain: "The guess must come from the TRAINING data — using the test mean is leakage, and scoring on train tells you nothing about held-out performance." },
      lines: [
        "guess = y_train.mean()",
        "baseline = mean_absolute_error(y_test, [guess] * len(y_test))",
        "print('always guess', round(guess, 2), '-> MAE', round(baseline, 2))"],
      decoys: ["guess = y_test.mean()", "baseline = mean_absolute_error(y_train, y_test)"],
      written: {
        prompt: 'Write the code: take the training mean as the guess, score it against y_test with mean absolute error, and print both numbers rounded.',
        solution: "guess = y_train.mean()\nbaseline = mean_absolute_error(y_test, [guess] * len(y_test))\nprint('always guess', round(guess, 2), '-> MAE', round(baseline, 2))",
        must: ['y_train.mean()', 'mean_absolute_error', 'y_test'] },
      walk: [
        ["guess = y_train.mean()", "The dumbest possible model: one number, learned from the training half only."],
        ["baseline = mean_absolute_error(y_test, [guess] * len(y_test))", "The same guess repeated for every test row."],
        ["print('always guess', round(guess, 2), '-> MAE', round(baseline, 2))", "Write this number down. Every model you fit afterwards gets reported next to it, or the score means nothing."]] }
  );
})();
