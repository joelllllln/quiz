/* Quickfire cards — turning raw columns into model inputs: encoding, binning,
   scaling, dates, aggregates and the leakage rules that go with them. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var ENC = 'Features · encoding & binning';
  var DER = 'Features · deriving columns';
  var SEL = 'Features · selecting & leakage';

  window.SNIPPETS.push(

    /* ---- encoding & binning ---- */
    { id: 'fe-dummies-drop', group: ENC, lvl: 2,
      ask: 'One-hot encode "city" in df, dropping one level to avoid collinearity',
      a: "pd.get_dummies(df, columns=['city'], drop_first=True)",
      note: 'Linear models need drop_first; trees do not care.' },

    { id: 'fe-map-ordinal', group: ENC, lvl: 2,
      ask: 'Map the ordered sizes small, medium and large to 0, 1 and 2 in "size"',
      a: "df['size'] = df['size'].map({'small': 0, 'medium': 1, 'large': 2})",
      note: 'Only encode as numbers when the order genuinely means something. Otherwise one-hot.' },

    { id: 'fe-cat-codes', group: ENC, lvl: 3,
      ask: 'Turn the categorical column "city" into integer codes',
      a: "df['city'].astype('category').cat.codes",
      note: 'Fast and compact, but it invents an ordering — safe for trees, misleading for linear models.' },

    { id: 'fe-freq-encode', group: ENC, lvl: 3,
      ask: 'Replace each "city" with how often that city appears (frequency encoding)',
      a: "df['city'].map(df['city'].value_counts())",
      note: 'Keeps high-cardinality columns to one feature. Compute the counts on the training set only.' },

    { id: 'fe-target-mean', group: ENC, lvl: 3,
      ask: 'Replace each "city" with the mean target of that city (target encoding)',
      a: "df.groupby('city')['target'].transform('mean')",
      note: 'Powerful and leaky — do it inside cross-validation folds, or you are encoding the answer.' },

    { id: 'fe-cut-labels', group: ENC, lvl: 2,
      ask: 'Bin "age" into child, adult and senior at the edges 0, 18, 65, 120',
      a: "pd.cut(df['age'], bins=[0, 18, 65, 120], labels=['child', 'adult', 'senior'])",
      note: 'cut takes the edges you choose; the labels list must be one shorter than the bins.' },

    { id: 'fe-qcut-labels', group: ENC, lvl: 2,
      ask: 'Split "income" into four equal-sized groups labelled Q1 to Q4',
      a: "pd.qcut(df['income'], 4, labels=['Q1', 'Q2', 'Q3', 'Q4'])",
      note: 'qcut gives equal COUNTS per bin; cut gives equal WIDTHS.' },

    { id: 'fe-binary-flag', group: ENC, lvl: 1,
      ask: 'Make a 0/1 column "is_uk" from whether "country" equals UK',
      a: "df['is_uk'] = (df['country'] == 'UK').astype(int)",
      note: 'A boolean cast to int is the cheapest flag there is.' },

    { id: 'fe-missing-flag', group: ENC, lvl: 2,
      ask: 'Add an "income_missing" column marking which rows had a missing "income", before you fill it',
      a: "df['income_missing'] = df['income'].isna().astype(int)",
      note: 'Missingness is often predictive in itself — record it before you impute it away.' },

    { id: 'fe-rare-bucket', group: ENC, lvl: 3,
      ask: 'Replace any "city" appearing fewer than 10 times with the word other',
      a: "df['city'] = df['city'].mask(df['city'].map(df['city'].value_counts()) < 10, 'other')",
      note: 'Stops rare categories exploding your one-hot matrix and overfitting to a handful of rows.' },

    /* ---- deriving columns ---- */
    { id: 'fe-ratio', group: DER, lvl: 1,
      ask: 'Add a "spend_per_visit" column from "spend" divided by "visits"',
      a: "df['spend_per_visit'] = df['spend'] / df['visits']",
      note: 'Ratios are usually more informative than either column alone — and watch for a zero divisor.' },

    { id: 'fe-safe-ratio', group: DER, lvl: 3,
      ask: 'Divide "spend" by "visits" turning any division by zero into NaN',
      a: "df['spend'] / df['visits'].replace(0, np.nan)",
      note: 'pandas gives inf rather than raising — and inf will break most models silently.' },

    { id: 'fe-log', group: DER, lvl: 2,
      ask: 'Log-transform the skewed column "income", handling zeros',
      a: "np.log1p(df['income'])",
      note: 'log1p is log(1 + x), which copes with zeros. Use expm1 to get back.' },

    { id: 'fe-date-parts', group: DER, lvl: 2,
      ask: 'Add month and weekday columns from the datetime column "date"',
      a: "df['month'] = df['date'].dt.month\ndf['weekday'] = df['date'].dt.dayofweek",
      note: 'Calendar features carry most of the seasonality a model can use.' },

    { id: 'fe-is-weekend', group: DER, lvl: 2,
      ask: 'Add a 0/1 "is_weekend" column from the datetime column "date"',
      a: "df['is_weekend'] = (df['date'].dt.dayofweek >= 5).astype(int)",
      note: 'Monday is 0, so 5 and 6 are Saturday and Sunday.' },

    { id: 'fe-tenure', group: DER, lvl: 2,
      ask: 'Add a "days_since" column measuring days from "signup" to today',
      a: "df['days_since'] = (pd.Timestamp.now() - df['signup']).dt.days",
      note: 'Use a fixed reference date rather than "now" if the model must be reproducible.' },

    { id: 'fe-group-mean-feature', group: DER, lvl: 3,
      ask: 'Add a "customer_mean" column holding each row\'s average spend across its "customer_id"',
      a: "df['customer_mean'] = df.groupby('customer_id')['spend'].transform('mean')",
      note: 'transform keeps one value per row, so it lines up. Computed over all data, it leaks — fit it on train only.' },

    { id: 'fe-diff-from-mean', group: DER, lvl: 3,
      ask: 'Work out how far each row\'s spend sits above its "customer_id" average',
      a: "df['spend'] - df.groupby('customer_id')['spend'].transform('mean')",
      note: 'Deviation-from-group is one of the most reliably useful engineered features there is.' },

    { id: 'fe-lag-feature', group: DER, lvl: 3,
      ask: 'Add a "prev_value" column holding the previous "value" for each "customer_id"',
      a: "df['prev_value'] = df.groupby('customer_id')['value'].shift(1)",
      note: 'Always shift within the group, and only ever backwards — shift(-1) is the future.' },

    { id: 'fe-rolling-feature', group: DER, lvl: 3,
      ask: "Add a 3-period rolling mean of \"value\" within each \"customer_id\"",
      a: "df.groupby('customer_id')['value'].transform(lambda s: s.rolling(3).mean())",
      note: 'Rolling inside a group is the standard way to build a trend feature per entity.' },

    { id: 'fe-count-feature', group: DER, lvl: 2,
      ask: 'Add an "n_orders" column holding how many rows each "customer_id" has',
      a: "df['n_orders'] = df.groupby('customer_id')['customer_id'].transform('size')",
      note: 'Frequency features are cheap and often among the strongest a model has.' },

    { id: 'fe-text-length', group: DER, lvl: 1,
      ask: 'Add a "desc_len" column holding the character length of "description"',
      a: "df['desc_len'] = df['description'].str.len()",
      note: 'Length, word count and "contains a digit" are the first three text features to try.' },

    { id: 'fe-word-count', group: DER, lvl: 2,
      ask: 'Add an "n_words" column holding the number of words in "description"',
      a: "df['n_words'] = df['description'].str.split().str.len()" },

    /* ---- selecting & leakage ---- */
    { id: 'fe-corr-target', group: SEL, lvl: 2,
      ask: 'Rank every numeric column by its correlation with "target"',
      a: "df.corr(numeric_only=True)['target'].sort_values(ascending=False)",
      note: 'A first pass only — it misses anything non-linear and ignores interactions.' },

    { id: 'fe-drop-constant', group: SEL, lvl: 3,
      ask: 'Drop every column of df that holds only one distinct value',
      a: 'df = df.loc[:, df.nunique() > 1]',
      note: 'A constant column carries no information and can upset scaling.' },

    { id: 'fe-drop-corr', group: SEL, lvl: 3,
      ask: 'List the numeric columns correlated above 0.95 with an earlier column',
      a: "upper = df.corr(numeric_only=True).abs().where(np.triu(np.ones(df.corr(numeric_only=True).shape), k=1).astype(bool))\ndrop = [c for c in upper.columns if (upper[c] > 0.95).any()]",
      note: 'Near-duplicate features destabilise linear coefficients — keep one of each pair.' },

    { id: 'fe-select-k', group: SEL, lvl: 3,
      ask: 'Import the scikit-learn selector that keeps the k best features',
      a: 'from sklearn.feature_selection import SelectKBest',
      note: 'Fit it inside a pipeline, or the selection itself leaks the test set.' },

    { id: 'fe-fit-train-only', group: SEL, lvl: 2,
      ask: 'Fit the scaler on the training features only, then apply it to both halves',
      a: 'scaler.fit(X_train)\nX_train_s = scaler.transform(X_train)\nX_test_s = scaler.transform(X_test)',
      note: 'The rule behind every leakage question: learn from train, apply to both.' },

    { id: 'fe-leak-check', group: SEL, lvl: 3,
      ask: 'Drop the leaky column "cancelled_date" — recorded after the churn you are predicting — from df',
      a: "df = df.drop(columns=['cancelled_date'])",
      note: 'A cancellation date, a refund flag, a closing balance: any column that could not exist at prediction time is a leak, however well it scores. Drop it before you are impressed by the score.' },

    { id: 'fe-time-split', group: SEL, lvl: 3,
      ask: 'Import the splitter that respects time order instead of shuffling',
      a: 'from sklearn.model_selection import TimeSeriesSplit',
      note: 'On anything with a date, a random split trains on the future and reports a score you will never see again.' },

    { id: 'fe-pipeline-select', group: SEL, lvl: 3,
      ask: 'Get the feature names out of a fitted ColumnTransformer',
      a: 'pre.get_feature_names_out()',
      note: 'The only sane way to line coefficients or importances back up with columns after one-hot encoding.' }
  );
})();
