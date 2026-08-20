/* Quickfire cards — pandas: getting data in, and the first look at it.
   Each card: one small ask, one line of code typed from memory.
   { id, group, lvl, ask, setup?, a, alts?, hint?, note }  — pushes onto window.SNIPPETS. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var LOAD = 'pandas · load & save';
  var LOOK = 'pandas · look at the data';

  window.SNIPPETS.push(

    /* ---- load & save ---- */
    { id: 'pd-import', group: LOAD, lvl: 1,
      ask: 'Import pandas under its usual short name',
      a: 'import pandas as pd',
      note: 'Everyone writes pd. Sticking to the convention makes your code readable by anyone.' },

    { id: 'pd-read-csv', group: LOAD, lvl: 1,
      ask: 'Read the CSV file "data.csv" into a DataFrame called df',
      a: "df = pd.read_csv('data.csv')",
      note: 'read_csv is the workhorse — it sniffs the separator, types and header row for you.' },

    { id: 'pd-read-csv-sep', group: LOAD, lvl: 1,
      ask: 'Read "data.tsv", which is tab-separated, into df',
      a: "df = pd.read_csv('data.tsv', sep='\\t')",
      alts: ["df = pd.read_table('data.tsv')"],
      note: 'sep takes any delimiter. sep=None with engine=\'python\' asks pandas to guess.' },

    { id: 'pd-read-csv-nohead', group: LOAD, lvl: 2,
      ask: 'Read "data.csv" when the file has no header row',
      a: "df = pd.read_csv('data.csv', header=None)",
      note: 'Columns then come out as 0,1,2… Pass names=[...] at the same time to label them.' },

    { id: 'pd-read-csv-names', group: LOAD, lvl: 2,
      ask: 'Read "data.csv" with no header, naming the two columns id and score',
      a: "df = pd.read_csv('data.csv', header=None, names=['id', 'score'])",
      note: 'names= sets the column labels; with header=None it also tells pandas row 0 is data.' },

    { id: 'pd-read-csv-index', group: LOAD, lvl: 2,
      ask: 'Read "data.csv" using its first column as the index',
      a: "df = pd.read_csv('data.csv', index_col=0)",
      alts: ["df = pd.read_csv('data.csv', index_col='id')"],
      note: 'index_col takes a position or a column name.' },

    { id: 'pd-read-csv-usecols', group: LOAD, lvl: 2,
      ask: 'Read only the columns "id" and "amount" from "data.csv"',
      a: "df = pd.read_csv('data.csv', usecols=['id', 'amount'])",
      note: 'usecols is the cheapest way to cut memory on a wide file — it never loads the rest.' },

    { id: 'pd-read-csv-nrows', group: LOAD, lvl: 2,
      ask: 'Read just the first 1000 rows of "big.csv"',
      a: "df = pd.read_csv('big.csv', nrows=1000)",
      note: 'The standard first move on an unfamiliar large file: peek before you commit.' },

    { id: 'pd-read-csv-dates', group: LOAD, lvl: 2,
      ask: 'Read "data.csv" and parse the "date" column as dates',
      a: "df = pd.read_csv('data.csv', parse_dates=['date'])",
      note: 'Parsing at read time beats converting later — one pass, and the dtype is right from the start.' },

    { id: 'pd-read-csv-na', group: LOAD, lvl: 3,
      ask: 'Read "data.csv" treating the strings "NA" and "-" as missing',
      a: "df = pd.read_csv('data.csv', na_values=['NA', '-'])",
      note: 'Otherwise those land as text and quietly poison the column dtype.' },

    { id: 'pd-read-csv-chunks', group: LOAD, lvl: 3,
      ask: 'Read "big.csv" in chunks of 10,000 rows',
      a: "chunks = pd.read_csv('big.csv', chunksize=10000)",
      note: 'chunksize returns an iterator of DataFrames — loop over it and aggregate as you go.' },

    { id: 'pd-read-csv-dtype', group: LOAD, lvl: 2,
      ask: 'Read "data.csv" forcing the "id" column to be read as a string',
      a: "df = pd.read_csv('data.csv', dtype={'id': str})",
      note: 'Saves leading zeros on codes and account numbers, which int parsing eats.' },

    { id: 'pd-read-excel', group: LOAD, lvl: 1,
      ask: 'Read the sheet "Sales" from the Excel file "book.xlsx"',
      a: "df = pd.read_excel('book.xlsx', sheet_name='Sales')",
      note: 'Needs openpyxl installed. sheet_name=None reads every sheet into a dict.' },

    { id: 'pd-read-json', group: LOAD, lvl: 2,
      ask: 'Read "data.json" into a DataFrame',
      a: "df = pd.read_json('data.json')",
      note: 'For nested JSON, pd.json_normalize(obj) flattens it into columns instead.' },

    { id: 'pd-json-normalize', group: LOAD, lvl: 3,
      ask: 'Flatten the list of nested dicts `records` into a DataFrame',
      a: 'df = pd.json_normalize(records)',
      note: 'Nested keys become dotted column names: user.name, user.id.' },

    { id: 'pd-read-parquet', group: LOAD, lvl: 2,
      ask: 'Read the Parquet file "data.parquet" into df',
      a: "df = pd.read_parquet('data.parquet')",
      note: 'Parquet keeps dtypes and is far smaller and faster than CSV — the default at work.' },

    { id: 'pd-read-sql', group: LOAD, lvl: 3,
      ask: 'Run the SQL string `query` against connection `conn` into a DataFrame',
      a: 'df = pd.read_sql(query, conn)',
      alts: ['df = pd.read_sql_query(query, conn)'],
      note: 'Let the database do the filtering and joining; pull back only what you need.' },

    { id: 'pd-read-clip', group: LOAD, lvl: 3,
      ask: 'Read a table you have just copied to the clipboard',
      a: 'df = pd.read_clipboard()',
      note: 'Handy for a quick paste out of a spreadsheet or a webpage.' },

    { id: 'pd-read-html', group: LOAD, lvl: 3,
      ask: 'Pull every HTML table on the page at `url` into a list of DataFrames',
      a: 'tables = pd.read_html(url)',
      note: 'Returns a list — tables[0] is usually the one you want.' },

    { id: 'pd-to-csv', group: LOAD, lvl: 1,
      ask: 'Write df to "out.csv" without the index column',
      a: "df.to_csv('out.csv', index=False)",
      note: 'Forget index=False and you get a stray unnamed column every round trip.' },

    { id: 'pd-to-excel', group: LOAD, lvl: 2,
      ask: 'Write df to "out.xlsx", sheet "Results", without the index',
      a: "df.to_excel('out.xlsx', sheet_name='Results', index=False)",
      note: 'Same index=False habit as CSV.' },

    { id: 'pd-to-parquet', group: LOAD, lvl: 2,
      ask: 'Save df as "out.parquet"',
      a: "df.to_parquet('out.parquet')",
      note: 'Round-trips dtypes exactly — CSV does not.' },

    { id: 'pd-df-from-dict', group: LOAD, lvl: 1,
      ask: 'Build a DataFrame from the dict {"a": [1, 2], "b": [3, 4]}',
      a: "df = pd.DataFrame({'a': [1, 2], 'b': [3, 4]})",
      note: 'Keys become column names, values become the columns.' },

    { id: 'pd-df-from-rows', group: LOAD, lvl: 2,
      ask: 'Build a DataFrame from the list of rows `rows` with columns "a" and "b"',
      a: "df = pd.DataFrame(rows, columns=['a', 'b'])",
      note: 'rows can be a list of lists, tuples, or dicts.' },

    { id: 'pd-series-make', group: LOAD, lvl: 1,
      ask: 'Make a Series from the list [1, 2, 3]',
      a: 's = pd.Series([1, 2, 3])',
      note: 'A Series is one column with an index — a DataFrame is a dict of Series.' },

    /* ---- the first look ---- */
    { id: 'pd-head', group: LOOK, lvl: 1,
      ask: 'Check the head of the data source — show the first five rows of df',
      a: 'df.head()',
      alts: ['df.head(5)'],
      note: 'The single most-typed line in data science. head() defaults to 5 rows.' },

    { id: 'pd-head-n', group: LOOK, lvl: 1,
      ask: 'Show the first 20 rows of df',
      a: 'df.head(20)',
      note: 'Any number works — df.head(1) when you only need the shape of a row.' },

    { id: 'pd-tail', group: LOOK, lvl: 1,
      ask: 'Show the last five rows of df',
      a: 'df.tail()',
      alts: ['df.tail(5)'],
      note: 'Worth a look on any file that might be appended to — footers and totals hide here.' },

    { id: 'pd-sample', group: LOOK, lvl: 1,
      ask: 'Show 5 random rows of df',
      a: 'df.sample(5)',
      note: 'Fairer than head() on sorted data — the top of a file is rarely typical.' },

    { id: 'pd-sample-seed', group: LOOK, lvl: 2,
      ask: 'Take a random sample of 100 rows from df, reproducibly with seed 42',
      a: 'df.sample(100, random_state=42)',
      note: 'random_state makes the same sample come back every run.' },

    { id: 'pd-sample-frac', group: LOOK, lvl: 2,
      ask: 'Take a random 10% of the rows of df',
      a: 'df.sample(frac=0.1)',
      note: 'frac=1 shuffles the whole frame.' },

    { id: 'pd-shape', group: LOOK, lvl: 1,
      ask: 'How many rows and columns does df have?',
      a: 'df.shape',
      note: 'A tuple: (rows, columns). df.shape[0] is the row count.' },

    { id: 'pd-nrows', group: LOOK, lvl: 1,
      ask: 'Get just the number of rows in df',
      a: 'df.shape[0]',
      alts: ['len(df)'],
      note: 'len(df) is the same number and reads more like Python.' },

    { id: 'pd-info', group: LOOK, lvl: 1,
      ask: 'Show the column names, dtypes, non-null counts and memory use of df',
      a: 'df.info()',
      note: 'The one-command health check: what is here, what type it is, what is missing.' },

    { id: 'pd-describe', group: LOOK, lvl: 1,
      ask: 'Show summary statistics (count, mean, std, quartiles) for the numeric columns of df',
      a: 'df.describe()',
      note: 'Read the min and max first — that is where the impossible values show up.' },

    { id: 'pd-describe-all', group: LOOK, lvl: 2,
      ask: 'Summarise every column of df, text columns included',
      a: 'df.describe(include=\'all\')',
      note: 'Text columns then report count, unique, top and freq.' },

    { id: 'pd-describe-obj', group: LOOK, lvl: 2,
      ask: 'Describe only the object (text) columns of df',
      a: "df.describe(include='object')",
      alts: ["df.describe(include=['object'])"],
      note: 'include / exclude both take a dtype or a list of them.' },

    { id: 'pd-columns', group: LOOK, lvl: 1,
      ask: 'List the column names of df',
      a: 'df.columns',
      alts: ['df.columns.tolist()', 'list(df.columns)'],
      note: 'df.columns is an Index; .tolist() gives a plain Python list.' },

    { id: 'pd-dtypes', group: LOOK, lvl: 1,
      ask: 'Show the data type of every column in df',
      a: 'df.dtypes',
      note: 'object usually means text — or a numeric column poisoned by one stray string.' },

    { id: 'pd-index', group: LOOK, lvl: 1,
      ask: 'Show the index of df',
      a: 'df.index',
      note: 'The row labels. Reset it with df.reset_index(drop=True) after filtering.' },

    { id: 'pd-values', group: LOOK, lvl: 2,
      ask: 'Get the underlying NumPy array of df',
      a: 'df.values',
      alts: ['df.to_numpy()'],
      note: 'to_numpy() is the modern spelling and the one to prefer.' },

    { id: 'pd-nunique', group: LOOK, lvl: 1,
      ask: 'Count the distinct values in each column of df',
      a: 'df.nunique()',
      note: 'A column with nunique() == 1 carries no information; == len(df) is an ID.' },

    { id: 'pd-unique', group: LOOK, lvl: 1,
      ask: 'List the distinct values in the "city" column',
      a: "df['city'].unique()",
      note: 'Returns them in order of appearance, as an array.' },

    { id: 'pd-value-counts', group: LOOK, lvl: 1,
      ask: 'Count how many rows fall in each "city"',
      a: "df['city'].value_counts()",
      note: 'Sorted biggest first, and it drops NaN unless you ask for it.' },

    { id: 'pd-value-counts-na', group: LOOK, lvl: 2,
      ask: 'Count the values in "city", including the missing ones',
      a: "df['city'].value_counts(dropna=False)",
      note: 'The fastest way to see how much of a column is actually empty.' },

    { id: 'pd-value-counts-norm', group: LOOK, lvl: 2,
      ask: 'Show the share (proportion) of each value in "city"',
      a: "df['city'].value_counts(normalize=True)",
      note: 'Proportions rather than counts — multiply by 100 for percentages.' },

    { id: 'pd-isna-sum', group: LOOK, lvl: 1,
      ask: 'Count the missing values in each column of df',
      a: 'df.isna().sum()',
      alts: ['df.isnull().sum()'],
      note: 'isna() gives a True/False frame; summing counts the Trues per column.' },

    { id: 'pd-isna-mean', group: LOOK, lvl: 2,
      ask: 'Get the fraction of values missing in each column of df',
      a: 'df.isna().mean()',
      note: 'The mean of a boolean column is its proportion of Trues.' },

    { id: 'pd-isna-any', group: LOOK, lvl: 2,
      ask: 'Check whether df has any missing values at all',
      a: 'df.isna().any().any()',
      alts: ['df.isna().values.any()'],
      note: 'First any() reduces to a column-wise answer; the second collapses that to one True/False.' },

    { id: 'pd-duplicated-sum', group: LOOK, lvl: 1,
      ask: 'Count the fully duplicated rows in df',
      a: 'df.duplicated().sum()',
      note: 'duplicated() marks every copy after the first.' },

    { id: 'pd-memory', group: LOOK, lvl: 2,
      ask: 'Show how much memory each column of df uses, counting text properly',
      a: 'df.memory_usage(deep=True)',
      note: 'Without deep=True, object columns only report the pointer size.' },

    { id: 'pd-corr', group: LOOK, lvl: 1,
      ask: 'Compute the correlation matrix of the numeric columns of df',
      a: 'df.corr(numeric_only=True)',
      alts: ['df.corr()'],
      note: 'numeric_only=True skips text columns instead of erroring on them.' },

    { id: 'pd-corr-pair', group: LOOK, lvl: 2,
      ask: 'Correlation between the columns "age" and "income"',
      a: "df['age'].corr(df['income'])",
      note: 'Series.corr gives you the single number rather than the whole matrix.' },

    { id: 'pd-mean-col', group: LOOK, lvl: 1,
      ask: 'Mean of the "salary" column',
      a: "df['salary'].mean()",
      note: 'Skips NaN by default — that is usually what you want, but know it is happening.' },

    { id: 'pd-median-col', group: LOOK, lvl: 1,
      ask: 'Median of the "salary" column',
      a: "df['salary'].median()",
      note: 'Report the median next to the mean on any skewed money column.' },

    { id: 'pd-sum-col', group: LOOK, lvl: 1,
      ask: 'Total of the "amount" column',
      a: "df['amount'].sum()" },

    { id: 'pd-min-max', group: LOOK, lvl: 1,
      ask: 'Largest value in the "amount" column',
      a: "df['amount'].max()",
      note: 'min(), max(), sum(), mean(), std(), var() all follow the same shape.' },

    { id: 'pd-std-col', group: LOOK, lvl: 1,
      ask: 'Standard deviation of the "amount" column',
      a: "df['amount'].std()",
      note: 'pandas uses the sample standard deviation (ddof=1); NumPy defaults to the population one.' },

    { id: 'pd-quantile', group: LOOK, lvl: 2,
      ask: 'The 95th percentile of the "amount" column',
      a: "df['amount'].quantile(0.95)",
      note: 'Pass a list for several at once: quantile([0.25, 0.5, 0.75]).' },

    { id: 'pd-mode', group: LOOK, lvl: 2,
      ask: 'The most common value in the "city" column',
      a: "df['city'].mode()[0]",
      alts: ["df['city'].mode().iloc[0]", "df['city'].value_counts().idxmax()"],
      note: 'mode() returns a Series because ties are possible — take [0] for one answer.' },

    { id: 'pd-idxmax', group: LOOK, lvl: 2,
      ask: 'The index label of the row with the largest "score"',
      a: "df['score'].idxmax()",
      note: 'df.loc[df[\'score\'].idxmax()] then gives you the whole winning row.' },

    { id: 'pd-count-col', group: LOOK, lvl: 1,
      ask: 'Count the non-missing values in the "email" column',
      a: "df['email'].count()",
      note: 'count() ignores NaN; len(df) does not.' },

    { id: 'pd-empty', group: LOOK, lvl: 2,
      ask: 'Check whether df has no rows at all',
      a: 'df.empty',
      note: 'Cleaner than len(df) == 0, and it reads as English in an if-statement.' },

    { id: 'pd-set-maxcols', group: LOOK, lvl: 3,
      ask: 'Tell pandas to display all columns instead of truncating with "…"',
      a: "pd.set_option('display.max_columns', None)",
      note: 'display.max_rows and display.width are the other two you will reach for.' },

    { id: 'pd-set-float', group: LOOK, lvl: 3,
      ask: 'Display floats to two decimal places',
      a: "pd.set_option('display.float_format', '{:.2f}'.format)",
      note: 'Display only — the stored values keep their full precision.' },

    { id: 'pd-version', group: LOOK, lvl: 1,
      ask: 'Print the installed pandas version',
      a: 'pd.__version__',
      note: 'First thing to check when a documented argument does not exist.' }
  );
})();
