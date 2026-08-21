/* Coding tasks — data analytics, stage 01 and 02: the first look at a file, and
   getting at the part of it you want. Same four steps as every other task:
   see it, spot it, build it, write it. Loads before the ML task files. */
(function () {
  window.CODETASKS = window.CODETASKS || [];
  var S1 = '25 · The first look, all together';
  var S2 = '26 · Selecting and filtering, together';

  window.CODETASKS.push(

    { key: 'daload', group: S1, lvl: 1, title: 'Read a CSV into a DataFrame',
      ask: 'Load the file sales.csv into a DataFrame called df, and check it arrived.',
      why: 'Nothing else happens until the file is in. Getting the read right — and looking straight away — saves hours later.',
      mcq: {
        q: 'Which pair of lines loads sales.csv and shows the first rows?',
        correct: "df = pd.read_csv('sales.csv')\ndf.head()",
        wrong: [
          "df = pd.open('sales.csv')\ndf.head()",
          "df = pd.read_csv(sales.csv)\ndf.head()",
          "df = pd.read_csv('sales.csv')\ndf.first()"],
        explain: "read_csv is the function, and the file name is TEXT so it needs quotes. There is no pd.open and no .first() — the first rows come from .head()." },
      lines: [
        "import pandas as pd",
        "df = pd.read_csv('sales.csv')",
        "print(df.shape)",
        "df.head()"],
      decoys: ["df = pd.read_csv(sales.csv)", "df = pd.open('sales.csv')"],
      written: {
        prompt: 'Write the code: import pandas as pd, read sales.csv into df, print its shape, then show the first rows.',
        solution: "import pandas as pd\ndf = pd.read_csv('sales.csv')\nprint(df.shape)\ndf.head()",
        must: ['import pandas as pd', 'read_csv', 'sales.csv', 'df.shape', 'head'] },
      walk: [
        ["import pandas as pd", "The nickname pd is a convention everybody follows. Use it and your code reads like everyone else's."],
        ["df = pd.read_csv('sales.csv')", "read_csv works out the separator, the header row and the column types for you. The file name is text, so it is in quotes."],
        ["print(df.shape)", "Rows first, then columns. If this number surprises you, stop and find out why before doing anything else."],
        ["df.head()", "The first five rows. Type this before you type anything else, every single time."]] },

    { key: 'dahead', group: S1, lvl: 1, title: 'Look at the top and the bottom',
      ask: 'Show the first three rows of df, and then the last two.',
      why: 'The top tells you the shape of a row. The bottom catches the totals row, the blank rows and the "notes" someone left at the end of the file.',
      mcq: {
        q: 'Which pair shows the first three rows and then the last two?',
        correct: "df.head(3)\ndf.tail(2)",
        wrong: [
          "df.head[3]\ndf.tail[2]",
          "df.first(3)\ndf.last(2)",
          "df.top(3)\ndf.bottom(2)"],
        explain: "head and tail are methods, so they take round brackets with the number of rows inside. Square brackets are for selecting columns and rows, not for calling a method." },
      lines: ["df.head(3)", "df.tail(2)"],
      decoys: ["df.head[3]", "df.first(3)"],
      written: {
        prompt: 'Write the code: the first three rows of df, then the last two.',
        solution: "df.head(3)\ndf.tail(2)",
        must: ['head(3)', 'tail(2)'] },
      walk: [
        ["df.head(3)", "With no number you get five rows. With a number you get that many."],
        ["df.tail(2)", "The end of a file is where the surprises hide: a totals row, a stray header, or rows in a different format."]] },

    { key: 'dashape', group: S1, lvl: 1, title: 'How big is it, and what is in it',
      ask: 'Report the number of rows and columns in df, list the column names, and show each column\'s type.',
      why: 'Three facts you need before any analysis: how much data, what it is called, and what type pandas thinks each column is.',
      mcq: {
        q: 'Which set of lines reports the size, the column names and the types?',
        correct: "print(df.shape)\nprint(list(df.columns))\nprint(df.dtypes)",
        wrong: [
          "print(df.size)\nprint(df.names)\nprint(df.types)",
          "print(df.shape())\nprint(df.columns())\nprint(df.dtypes())",
          "print(len(df.shape))\nprint(df.column)\nprint(df.dtype)"],
        explain: "shape, columns and dtypes are ATTRIBUTES — no brackets. df.size is a different thing (rows times columns), and there is no df.names or df.types." },
      lines: [
        "print(df.shape)",
        "print(list(df.columns))",
        "print(df.dtypes)"],
      decoys: ["print(df.shape())", "print(df.size)"],
      written: {
        prompt: 'Write the code: print the shape of df, the column names as a list, and the dtype of every column.',
        solution: "print(df.shape)\nprint(list(df.columns))\nprint(df.dtypes)",
        must: ['df.shape', 'df.columns', 'df.dtypes'] },
      walk: [
        ["print(df.shape)", "A pair: (rows, columns). df.shape[0] on its own is the row count."],
        ["print(list(df.columns))", "columns is an Index; wrapping it in list() prints it in a form you can read and copy."],
        ["print(df.dtypes)", "An object dtype on a column you expected to be numeric means text has sneaked in — a date, a comma, or the word 'unknown'."]] },

    { key: 'dainfo', group: S1, lvl: 1, title: 'info and describe',
      ask: 'Show the structure of df with one line, then the summary statistics of its number columns.',
      why: 'info() answers "what and how much is missing"; describe() answers "are these numbers plausible".',
      mcq: {
        q: 'Which two lines give the structure and then the numeric summary?',
        correct: "df.info()\ndf.describe()",
        wrong: [
          "df.info\ndf.describe",
          "df.summary()\ndf.stats()",
          "info(df)\ndescribe(df)"],
        explain: "Both are methods on the frame and need brackets. Without the brackets you print the method itself rather than running it — a surprisingly common typo." },
      lines: ["df.info()", "df.describe()", "df.describe(include='object')"],
      decoys: ["df.summary()", "describe(df)"],
      written: {
        prompt: 'Write the code: df.info(), then describe() for the numbers, then describe() for the text columns.',
        solution: "df.info()\ndf.describe()\ndf.describe(include='object')",
        must: ['df.info()', 'df.describe()', "include='object'"] },
      walk: [
        ["df.info()", "One line per column: its name, how many values are NOT missing, and its type. The row count at the top tells you how much is missing by subtraction."],
        ["df.describe()", "count, mean, std, min, the quartiles and max — for the NUMBER columns only."],
        ["df.describe(include='object')", "The text columns instead: how many, how many distinct, the most common value and its count."]] },

    { key: 'damissing', group: S1, lvl: 1, title: 'Count what is missing',
      ask: 'Count the missing values in each column of df, and show the columns with the most missing first.',
      why: 'Missingness decides your whole cleaning plan — and a column that is 90% empty is usually a column to drop.',
      mcq: {
        q: 'Which line counts missing values per column, worst first?',
        correct: "df.isna().sum().sort_values(ascending=False)",
        wrong: [
          "df.isnull().count().sort_values(ascending=False)",
          "df.isna().sum(axis=1).sort_values(ascending=False)",
          "df.dropna().sum().sort_values(ascending=False)"],
        explain: "isna() marks every cell True or False; sum() then counts the Trues DOWN each column. count() would count the non-missing values instead, and axis=1 would count across each row." },
      lines: [
        "missing = df.isna().sum()",
        "missing = missing.sort_values(ascending=False)",
        "print(missing[missing > 0])"],
      decoys: ["missing = df.isna().count()", "missing = df.dropna().sum()"],
      written: {
        prompt: 'Write the code: count the missing values per column of df, sort them biggest first, and print only the columns that have any.',
        solution: "missing = df.isna().sum().sort_values(ascending=False)\nprint(missing[missing > 0])",
        must: ['isna()', '.sum()', 'sort_values', 'ascending=False'] },
      walk: [
        ["missing = df.isna().sum()", "True counts as 1, so summing a frame of True/False counts the missing values in each column."],
        ["missing = missing.sort_values(ascending=False)", "Worst first, so the columns that need a decision are at the top."],
        ["print(missing[missing > 0])", "Filtering the result keeps the output short — most columns usually have nothing missing at all."]] },

    { key: 'davalues', group: S1, lvl: 1, title: 'What values does this column take?',
      ask: 'Show how often each value appears in the city column of df, including the missing ones, and as a percentage.',
      why: 'For any label column this is the first question: what are the categories, how lopsided are they, and how much is missing.',
      mcq: {
        q: 'Which line counts each value INCLUDING the missing ones?',
        correct: "df['city'].value_counts(dropna=False)",
        wrong: [
          "df['city'].value_counts()",
          "df['city'].count(dropna=False)",
          "df['city'].unique(dropna=False)"],
        explain: "value_counts() quietly leaves the missing values out, which is exactly when you most want to see them. dropna=False puts NaN in the table as its own row." },
      lines: [
        "df['city'].value_counts(dropna=False)",
        "df['city'].value_counts(normalize=True).round(3)"],
      decoys: ["df['city'].count(dropna=False)", "df['city'].values()"],
      written: {
        prompt: 'Write the code: count the values of the city column including missing ones, then the same counts as proportions rounded to 3 places.',
        solution: "df['city'].value_counts(dropna=False)\ndf['city'].value_counts(normalize=True).round(3)",
        must: ['value_counts', 'dropna=False', 'normalize=True'] },
      walk: [
        ["df['city'].value_counts(dropna=False)", "Biggest category first. A single value covering 95% of the rows changes what any model or chart can tell you."],
        ["df['city'].value_counts(normalize=True).round(3)", "normalize turns the counts into proportions — easier to talk about, and comparable between datasets of different sizes."]] },

    { key: 'daunique', group: S1, lvl: 1, title: 'How many different ones are there?',
      ask: 'Count the distinct customers in df, list the distinct regions, and check whether customer_id repeats.',
      why: 'Distinct counts tell you the grain of the table: one row per order, per customer, or per customer per day.',
      mcq: {
        q: 'Which line counts how many DIFFERENT customers appear?',
        correct: "df['customer_id'].nunique()",
        wrong: [
          "df['customer_id'].unique()",
          "df['customer_id'].count()",
          "len(df['customer_id'])"],
        explain: "nunique() gives the NUMBER of distinct values; unique() gives the values themselves. count() and len() count rows, repeats included." },
      lines: [
        "print(df['customer_id'].nunique())",
        "print(df['region'].unique())",
        "print(len(df), df['customer_id'].nunique())"],
      decoys: ["print(df['customer_id'].unique().sum())", "print(df['region'].nunique().values)"],
      written: {
        prompt: 'Write the code: print how many distinct customer_ids there are, list the distinct regions, then print the row count beside the distinct customer count.',
        solution: "print(df['customer_id'].nunique())\nprint(df['region'].unique())\nprint(len(df), df['customer_id'].nunique())",
        must: ['nunique()', 'unique()', 'len(df)'] },
      walk: [
        ["print(df['customer_id'].nunique())", "How many different customers the file covers."],
        ["print(df['region'].unique())", "The actual values — where you spot 'North', 'north' and 'N ' living in the same column."],
        ["print(len(df), df['customer_id'].nunique())", "Rows against distinct customers. Equal means one row each; far apart means many rows per customer, and that changes every average you are about to calculate."]] },

    { key: 'dacols', group: S2, lvl: 1, title: 'Pick the columns you need',
      ask: 'Take just the customer, amount and city columns of df into a new frame called small.',
      why: 'Cutting a wide table down to the handful of columns you are actually using makes everything after it easier to read.',
      mcq: {
        q: 'Which line takes three columns into a new frame?',
        correct: "small = df[['customer', 'amount', 'city']]",
        wrong: [
          "small = df['customer', 'amount', 'city']",
          "small = df('customer', 'amount', 'city')",
          "small = df.columns[['customer', 'amount', 'city']]"],
        explain: "Two sets of square brackets: the outer one selects, the inner one is the LIST of names. One set with commas inside is a syntax error in pandas." },
      lines: [
        "cols = ['customer', 'amount', 'city']",
        "small = df[cols]",
        "print(small.shape)"],
      decoys: ["small = df['customer', 'amount', 'city']", "small = df.get(cols)"],
      written: {
        prompt: 'Write the code: put the three column names in a list, select them from df into small, and print its shape.',
        solution: "cols = ['customer', 'amount', 'city']\nsmall = df[cols]\nprint(small.shape)",
        must: ['[cols]', "'customer'", "'amount'", "'city'", 'shape'] },
      walk: [
        ["cols = ['customer', 'amount', 'city']", "Naming the list first keeps the selection line short and lets you reuse the same set of columns later."],
        ["small = df[cols]", "A list of names gives a FRAME back. A single name in one set of brackets would give a Series instead."],
        ["print(small.shape)", "Confirms three columns arrived — and that you spelled them all correctly."]] },

    { key: 'dafilter', group: S2, lvl: 1, title: 'Keep the rows that qualify',
      ask: 'Keep only the rows of df where amount is over 100, and report how many that is.',
      why: 'Filtering is the single most-used move in analytics, and every filter has the same shape.',
      mcq: {
        q: 'Which line keeps the rows where amount is over 100?',
        correct: "big = df[df['amount'] > 100]",
        wrong: [
          "big = df['amount'] > 100",
          "big = df[df['amount'] > 100, :]",
          "big = df.where(df['amount'] > 100)"],
        explain: "The condition alone gives a column of True/False; putting it inside df[...] uses it to pick rows. .where() keeps every row and blanks the ones that fail, which is a different job." },
      lines: [
        "big = df[df['amount'] > 100]",
        "print(len(big), 'of', len(df))"],
      decoys: ["big = df['amount'] > 100", "big = df.where(df['amount'] > 100)"],
      written: {
        prompt: 'Write the code: filter df to the rows where amount is above 100 into big, then print how many rows that is out of the total.',
        solution: "big = df[df['amount'] > 100]\nprint(len(big), 'of', len(df))",
        must: ["df[df['amount'] > 100]", 'len(big)', 'len(df)'] },
      walk: [
        ["big = df[df['amount'] > 100]", "Read it inside out: the condition makes a True/False column, and the outer brackets keep the True rows."],
        ["print(len(big), 'of', len(df))", "Always look at how much you kept. A filter that leaves 3 rows out of 50,000 usually means the condition is wrong, not the data."]] },

    { key: 'dafilter2', group: S2, lvl: 1, title: 'Two conditions at once',
      ask: 'Keep the rows of df where amount is over 100 AND city is London.',
      why: 'The brackets and the & are where nearly everyone slips the first few times.',
      mcq: {
        q: 'Which line correctly combines the two conditions?',
        correct: "df[(df['amount'] > 100) & (df['city'] == 'London')]",
        wrong: [
          "df[df['amount'] > 100 and df['city'] == 'London']",
          "df[df['amount'] > 100 & df['city'] == 'London']",
          "df[(df['amount'] > 100), (df['city'] == 'London')]"],
        explain: "Use & for and, | for or — the plain word `and` raises \"truth value of a Series is ambiguous\". The brackets around each half are required, because & binds tighter than > and == do." },
      lines: [
        "mask = (df['amount'] > 100) & (df['city'] == 'London')",
        "big_london = df[mask]",
        "print(mask.sum(), 'rows match')"],
      decoys: ["mask = df['amount'] > 100 and df['city'] == 'London'", "big_london = df[mask, :]"],
      written: {
        prompt: 'Write the code: build a mask for amount over 100 and city equal to London, apply it to df, and print how many rows matched.',
        solution: "mask = (df['amount'] > 100) & (df['city'] == 'London')\nbig_london = df[mask]\nprint(mask.sum(), 'rows match')",
        must: ['&', "df['amount'] > 100", "df['city'] == 'London'", 'mask'] },
      walk: [
        ["mask = (df['amount'] > 100) & (df['city'] == 'London')", "Naming the mask makes the filter line readable and lets you count the matches without repeating yourself."],
        ["big_london = df[mask]", "Exactly the same move as a single condition — the mask just happens to have been built from two."],
        ["print(mask.sum(), 'rows match')", "True is 1, so summing the mask counts the matching rows."]] },

    { key: 'daisin', group: S2, lvl: 1, title: 'One of several values',
      ask: 'Keep the rows of df whose city is London, Leeds or York — and then the rows whose city is none of those.',
      why: 'isin replaces a chain of ORs, and the ~ in front of it is how you say "everything else".',
      mcq: {
        q: 'Which pair keeps the three cities, then everything else?',
        correct: "north = df[df['city'].isin(cities)]\nrest = df[~df['city'].isin(cities)]",
        wrong: [
          "north = df[df['city'] in cities]\nrest = df[df['city'] not in cities]",
          "north = df[df['city'].isin(cities)]\nrest = df[not df['city'].isin(cities)]",
          "north = df[df['city'].contains(cities)]\nrest = df[!df['city'].contains(cities)]"],
        explain: "isin takes a list and answers per row. The opposite is ~ (a tilde), not `not` and not `!` — those do not work elementwise on a Series." },
      lines: [
        "cities = ['London', 'Leeds', 'York']",
        "north = df[df['city'].isin(cities)]",
        "rest = df[~df['city'].isin(cities)]",
        "print(len(north), len(rest), len(df))"],
      decoys: ["north = df[df['city'] in cities]", "rest = df[not df['city'].isin(cities)]"],
      written: {
        prompt: 'Write the code: list the three cities, keep the rows in them, keep the rows NOT in them, and print the three row counts.',
        solution: "cities = ['London', 'Leeds', 'York']\nnorth = df[df['city'].isin(cities)]\nrest = df[~df['city'].isin(cities)]\nprint(len(north), len(rest), len(df))",
        must: ['isin(cities)', '~', 'len(north)', 'len(rest)'] },
      walk: [
        ["cities = ['London', 'Leeds', 'York']", "A named list is easier to change later than three conditions joined by ORs."],
        ["north = df[df['city'].isin(cities)]", "isin answers True for each row whose value appears anywhere in the list."],
        ["rest = df[~df['city'].isin(cities)]", "The tilde flips every True to False. Missing cities land here too, which is usually what you want — but check."],
        ["print(len(north), len(rest), len(df))", "The two halves should add up to the whole. If they do not, missing values are involved."]] },

    { key: 'daloc', group: S2, lvl: 1, title: 'Rows and columns in one step',
      ask: 'From df, take the customer and amount columns for the rows where amount is over 100.',
      why: '.loc does the row filter and the column choice together — and it is the assignment-safe way to change values later.',
      mcq: {
        q: 'Which line selects those rows and just those two columns?',
        correct: "df.loc[df['amount'] > 100, ['customer', 'amount']]",
        wrong: [
          "df[df['amount'] > 100]['customer', 'amount']",
          "df.iloc[df['amount'] > 100, ['customer', 'amount']]",
          "df.loc[df['amount'] > 100]['customer', 'amount']"],
        explain: ".loc takes rows first, then columns, separated by a comma — labels for both. .iloc is by POSITION and cannot take a mask of labels like this." },
      lines: [
        "cols = ['customer', 'amount']",
        "big = df.loc[df['amount'] > 100, cols]",
        "print(big.head())"],
      decoys: ["big = df.iloc[df['amount'] > 100, cols]", "big = df[df['amount'] > 100]['customer', 'amount']"],
      written: {
        prompt: 'Write the code: use .loc to take the customer and amount columns for rows where amount is over 100, and show the head.',
        solution: "cols = ['customer', 'amount']\nbig = df.loc[df['amount'] > 100, cols]\nprint(big.head())",
        must: ['df.loc[', "df['amount'] > 100", 'cols'] },
      walk: [
        ["cols = ['customer', 'amount']", "The column order you write is the column order you get back."],
        ["big = df.loc[df['amount'] > 100, cols]", "Rows before the comma, columns after it. One step, no intermediate frame."],
        ["print(big.head())", "Check it before moving on: right rows, right columns, right order."]] },

    { key: 'dasort', group: S2, lvl: 1, title: 'Sort it, and take the top',
      ask: 'Sort df by amount with the biggest first, and separately take the 10 biggest rows.',
      why: '"Show me the top ten" is half the questions an analyst is ever asked.',
      mcq: {
        q: 'Which pair sorts biggest-first and takes the top ten?',
        correct: "df.sort_values('amount', ascending=False)\ndf.nlargest(10, 'amount')",
        wrong: [
          "df.sort_values('amount')\ndf.nlargest(10, 'amount')",
          "df.sort('amount', ascending=False)\ndf.top(10, 'amount')",
          "df.sort_values('amount', reverse=True)\ndf.head(10)"],
        explain: "sort_values defaults to smallest-first, so biggest needs ascending=False — the argument is not called reverse. nlargest does the sort and the head in one, and is faster on a big frame." },
      lines: [
        "ranked = df.sort_values('amount', ascending=False)",
        "top10 = df.nlargest(10, 'amount')",
        "print(top10[['customer', 'amount']])"],
      decoys: ["ranked = df.sort_values('amount', reverse=True)", "top10 = df.top(10, 'amount')"],
      written: {
        prompt: 'Write the code: sort df by amount biggest first, take the ten biggest rows with nlargest, and print their customer and amount.',
        solution: "ranked = df.sort_values('amount', ascending=False)\ntop10 = df.nlargest(10, 'amount')\nprint(top10[['customer', 'amount']])",
        must: ['sort_values', 'ascending=False', 'nlargest(10'] },
      walk: [
        ["ranked = df.sort_values('amount', ascending=False)", "A new frame, sorted. The original is untouched — sort_values is not in place unless you ask it to be."],
        ["top10 = df.nlargest(10, 'amount')", "The same answer as sorting and taking head(10), in one call."],
        ["print(top10[['customer', 'amount']])", "Print only the columns that answer the question; nobody wants forty columns of context."]] },

    { key: 'dacount', group: S2, lvl: 1, title: 'How many, and what share',
      ask: 'Report how many rows of df have amount over 100, and what fraction of all rows that is.',
      why: 'A count on its own means nothing. "1,200 rows — 4% of the file" is an answer.',
      mcq: {
        q: 'Which pair gives the count and the share?',
        correct: "(df['amount'] > 100).sum()\n(df['amount'] > 100).mean()",
        wrong: [
          "(df['amount'] > 100).count()\n(df['amount'] > 100).mean()",
          "df['amount'].sum() > 100\ndf['amount'].mean() > 100",
          "len(df['amount'] > 100)\nlen(df['amount'] > 100) / len(df)"],
        explain: "True counts as 1, so summing the mask counts the matching rows and averaging it gives the proportion. .count() counts every row regardless, and len() of a mask is just the number of rows." },
      lines: [
        "mask = df['amount'] > 100",
        "print(mask.sum(), 'rows')",
        "print(round(100 * mask.mean(), 1), '%')"],
      decoys: ["print(mask.count(), 'rows')", "print(len(mask) / len(df))"],
      written: {
        prompt: 'Write the code: build the mask for amount over 100, print how many rows match, then print the percentage to 1 decimal place.',
        solution: "mask = df['amount'] > 100\nprint(mask.sum(), 'rows')\nprint(round(100 * mask.mean(), 1), '%')",
        must: ['mask.sum()', 'mask.mean()', 'round('] },
      walk: [
        ["mask = df['amount'] > 100", "One True or False per row."],
        ["print(mask.sum(), 'rows')", "Summing Trues counts them."],
        ["print(round(100 * mask.mean(), 1), '%')", "The average of a True/False column IS the proportion. Times 100 and rounded, it is the number you put in the email."]] }
  );
})();
