/* The coding path, one small lesson at a time — stages 01 to 06.
   Every task is ONE line of code and one idea. The next task changes one thing.
   Same four steps as always: see it, spot it, build it, write it. */
(function () {
  window.CODETASKS = window.CODETASKS || [];
  function T(o) { o.lvl = o.lvl || 1; window.CODETASKS.push(o); }
  var S1 = '01 · Open a file';
  var S2 = '02 · Look at it';
  var S3 = '03 · How big, and what is in it';
  var S4 = '04 · What is missing';
  var S5 = '05 · One column at a time';
  var S6 = '06 · Sums on a column';

  /* ---------------- 01 · Open a file ---------------- */
  T({ key: 's-import-pd', group: S1, title: 'Import pandas',
    ask: 'Bring pandas in under the name everybody uses.',
    why: 'Every line that follows starts with pd. Getting the nickname right is what makes your code look like everyone else\'s.',
    mcq: { q: 'Which line imports pandas the standard way?',
      correct: 'import pandas as pd',
      wrong: ['import pandas', 'from pandas import *', 'import pd as pandas'],
      whyWrong: [
        'This works, but then every call has to be written pandas.read_csv(...) — nobody does that, and examples you copy will not match.',
        'Star imports dump every pandas name into your file, so a variable called sum or max silently shadows something. Never do it in a script.',
        'The two names are the wrong way round: you import pandas and nickname it pd, not the other way about.'],
      explain: 'import pandas as pd. The nickname is a convention so strong that every tutorial, answer and colleague assumes it.' },
    lines: ['import pandas as pd'],
    decoys: ['import pd as pandas', 'from pandas import *'],
    written: { prompt: 'Write the import line for pandas, with its usual nickname.', solution: 'import pandas as pd', must: ['import pandas as pd'] },
    walk: [['import pandas as pd', 'One line, once per file, at the top. pd is the name the whole world uses.']] });

  T({ key: 's-read-csv', group: S1, title: 'Read a CSV',
    ask: 'Load the file sales.csv into a DataFrame called df.',
    why: 'One line gets a spreadsheet into Python. It is the door everything else goes through.',
    mcq: { q: 'Which line reads sales.csv into df?',
      correct: "df = pd.read_csv('sales.csv')",
      wrong: ["df = pd.read_csv(sales.csv)", "df = read_csv('sales.csv')", "df = pd.read('sales.csv')"],
      whyWrong: [
        'Without quotes Python looks for a variable called sales and raises NameError. A file name is text.',
        'read_csv lives on pandas, so it needs the pd. prefix unless you imported it by name.',
        'There is no pd.read — the function names the format: read_csv, read_excel, read_parquet, read_json.'],
      explain: "pd.read_csv('sales.csv') — the function, then the path as text. It works out the separator, the header and the types for you." },
    lines: ["df = pd.read_csv('sales.csv')"],
    decoys: ["df = pd.read_csv(sales.csv)", "df = pd.read('sales.csv')"],
    written: { prompt: 'Write the line that reads sales.csv into a frame called df.', solution: "df = pd.read_csv('sales.csv')", must: ['read_csv', "'sales.csv'"] },
    walk: [["df = pd.read_csv('sales.csv')", 'The whole file becomes one object called df — rows, columns, names and types.']] });

  T({ key: 's-read-excel', group: S1, title: 'Read an Excel file',
    ask: 'Load the first sheet of sales.xlsx into df.',
    why: 'The same move, one word different — which is the point. Most "new" pandas is an old line with one word changed.',
    mcq: { q: 'Which line reads an Excel file?',
      correct: "df = pd.read_excel('sales.xlsx')",
      wrong: ["df = pd.read_csv('sales.xlsx')", "df = pd.read_xlsx('sales.xlsx')", "df = pd.open_excel('sales.xlsx')"],
      whyWrong: [
        'read_csv reads TEXT files. An .xlsx is a zip archive of XML, so this raises a decoding error.',
        'The function is named after the program, not the extension: read_excel.',
        'There is no open_excel. Everything that loads data in pandas starts with read_.'],
      explain: 'pd.read_excel for spreadsheets. Add sheet_name= when the workbook has more than one sheet.' },
    lines: ["df = pd.read_excel('sales.xlsx')"],
    decoys: ["df = pd.read_xlsx('sales.xlsx')", "df = pd.read_csv('sales.xlsx')"],
    written: { prompt: 'Write the line that reads sales.xlsx into df.', solution: "df = pd.read_excel('sales.xlsx')", must: ['read_excel', "'sales.xlsx'"] },
    walk: [["df = pd.read_excel('sales.xlsx')", 'Same shape as read_csv. Needs the openpyxl package installed behind the scenes.']] });

  T({ key: 's-read-sheet', group: S1, lvl: 2, title: 'Read one named sheet',
    ask: 'Load the sheet called Orders out of sales.xlsx.',
    why: 'Workbooks nearly always have more than one sheet, and the first one is nearly always the summary you do not want.',
    mcq: { q: 'Which line reads the sheet named Orders?',
      correct: "df = pd.read_excel('sales.xlsx', sheet_name='Orders')",
      wrong: ["df = pd.read_excel('sales.xlsx', sheet='Orders')", "df = pd.read_excel('sales.xlsx')['Orders']", "df = pd.read_excel('sales.xlsx', 'Orders')['Orders']"],
      whyWrong: [
        'The argument is sheet_name, not sheet. Anything else raises TypeError.',
        'Reading first and then indexing looks for a COLUMN called Orders in the first sheet.',
        'The positional form does work, but then indexing the result by name looks for a column and raises.'],
      explain: "sheet_name='Orders' picks the sheet by name. sheet_name=None gives you a dict of every sheet at once." },
    lines: ["df = pd.read_excel('sales.xlsx', sheet_name='Orders')"],
    decoys: ["df = pd.read_excel('sales.xlsx', sheet='Orders')", "df = pd.read_excel('sales.xlsx')['Orders']"],
    written: { prompt: 'Write the line that reads the Orders sheet from sales.xlsx into df.', solution: "df = pd.read_excel('sales.xlsx', sheet_name='Orders')", must: ['read_excel', "sheet_name='Orders'"] },
    walk: [["df = pd.read_excel('sales.xlsx', sheet_name='Orders')", 'One extra argument. Everything else about the line is unchanged.']] });

  T({ key: 's-read-cols', group: S1, lvl: 2, title: 'Read only the columns you need',
    ask: 'Read just the date and amount columns from sales.csv.',
    why: 'The cheapest speed-up there is on a wide file: never load what you will not use.',
    mcq: { q: 'Which line loads only those two columns?',
      correct: "df = pd.read_csv('sales.csv', usecols=['date', 'amount'])",
      wrong: ["df = pd.read_csv('sales.csv', columns=['date', 'amount'])", "df = pd.read_csv('sales.csv')[['date', 'amount']]", "df = pd.read_csv('sales.csv', usecols='date, amount')"],
      whyWrong: [
        'The argument is usecols. columns= is not a read_csv argument and raises.',
        'This gives the right answer but reads the WHOLE file first — on a big file that is the cost you were trying to avoid.',
        'usecols takes a list of names, not one comma-separated string.'],
      explain: 'usecols=[...] filters the columns as the file is parsed, so the memory is never used in the first place.' },
    lines: ["df = pd.read_csv('sales.csv', usecols=['date', 'amount'])"],
    decoys: ["df = pd.read_csv('sales.csv', columns=['date', 'amount'])", "df = pd.read_csv('sales.csv')[['date', 'amount']]"],
    written: { prompt: 'Write the line that reads only date and amount from sales.csv.', solution: "df = pd.read_csv('sales.csv', usecols=['date', 'amount'])", must: ['read_csv', 'usecols=', "'date'", "'amount'"] },
    walk: [["df = pd.read_csv('sales.csv', usecols=['date', 'amount'])", 'Add one argument to the line you already know. Same for nrows=1000 when you only want a taste of a huge file.']] });

  T({ key: 's-to-csv', group: S1, title: 'Save it back out',
    ask: 'Write df to tidy.csv without the index.',
    why: 'The other end of the pipe — and index=False is the argument everyone forgets exactly once.',
    mcq: { q: 'Which line saves df properly?',
      correct: "df.to_csv('tidy.csv', index=False)",
      wrong: ["df.to_csv('tidy.csv')", "pd.to_csv(df, 'tidy.csv')", "df.save('tidy.csv')"],
      whyWrong: [
        'Without index=False the row numbers are written as a first, unnamed column — which then reappears as "Unnamed: 0" the next time anyone reads the file.',
        'to_csv is a method on the frame, not a function on pandas.',
        'There is no .save. Saving in pandas is always to_something: to_csv, to_excel, to_parquet.'],
      explain: "df.to_csv('tidy.csv', index=False) — the frame writes itself, and index=False keeps the row numbers out of the file." },
    lines: ["df.to_csv('tidy.csv', index=False)"],
    decoys: ["df.to_csv('tidy.csv')", "df.save('tidy.csv')"],
    written: { prompt: 'Write the line that saves df to tidy.csv with no index column.', solution: "df.to_csv('tidy.csv', index=False)", must: ['to_csv', "'tidy.csv'", 'index=False'] },
    walk: [["df.to_csv('tidy.csv', index=False)", 'Reading is pd.read_csv; writing is df.to_csv. One is a function, one is a method.']] });

  /* ---------------- 02 · Look at it ---------------- */
  T({ key: 's-head', group: S2, title: 'The first rows',
    ask: 'Show the first five rows of df.',
    why: 'The first thing you type after loading anything, every single time, for the rest of your career.',
    mcq: { q: 'Which line shows the first five rows?',
      correct: 'df.head()',
      wrong: ['df.head', 'head(df)', 'df.first()'],
      whyWrong: [
        'Without brackets you print a description of the method rather than running it — and it does not raise, so it is easy to miss.',
        'head is a method on the frame, not a standalone function.',
        'There is no .first() for this. head() is the one.'],
      explain: 'df.head() gives the first five rows. Pass a number for more or fewer.' },
    lines: ['df.head()'],
    decoys: ['df.first()', 'head(df)'],
    written: { prompt: 'Write the line that shows the first five rows of df.', solution: 'df.head()', must: ['head()'] },
    walk: [['df.head()', 'Five rows, all columns. Enough to see the shape of a row and spot anything obviously wrong.']] });

  T({ key: 's-head-n', group: S2, title: 'The first three rows',
    ask: 'Show just the first three rows of df.',
    why: 'The same call with a number in it — and on a wide table three rows is often all that fits on screen.',
    mcq: { q: 'Which line shows three rows?',
      correct: 'df.head(3)',
      wrong: ['df.head[3]', 'df.head(n=-3)', 'df[0:3].head()'],
      whyWrong: [
        'Square brackets on a method raise TypeError — methods take round brackets.',
        'A negative number means "everything except the last three", which on a big frame is nearly all of it.',
        'This works, but slicing first and then calling head is doing the same job twice.'],
      explain: 'df.head(3) — the number goes inside the brackets. df.head(20) when you want a longer look.' },
    lines: ['df.head(3)'],
    decoys: ['df.head[3]', 'df.head(n=-3)'],
    written: { prompt: 'Write the line that shows the first three rows of df.', solution: 'df.head(3)', must: ['head(3)'] },
    walk: [['df.head(3)', 'One number changed from the last lesson. That is the whole difference.']] });

  T({ key: 's-tail', group: S2, title: 'The last rows',
    ask: 'Show the last five rows of df.',
    why: 'The end of a file is where the totals row, the blank rows and someone\'s notes are hiding.',
    mcq: { q: 'Which line shows the last five rows?',
      correct: 'df.tail()',
      wrong: ['df.head(-5)', 'df.last()', 'df.bottom()'],
      whyWrong: [
        'head(-5) means "all but the last five" — very nearly the opposite of what you asked for.',
        '.last() exists only for time-based selection on a datetime index, and it needs an offset like "5D".',
        'There is no .bottom(). The pair is head and tail.'],
      explain: 'df.tail() mirrors df.head(). Always look at both before you trust a file.' },
    lines: ['df.tail()'],
    decoys: ['df.bottom()', 'df.head(-5)'],
    written: { prompt: 'Write the line that shows the last five rows of df.', solution: 'df.tail()', must: ['tail()'] },
    walk: [['df.tail()', 'The mirror of head. Between them you see how a file starts and how it ends.']] });

  T({ key: 's-sample', group: S2, lvl: 2, title: 'A random handful',
    ask: 'Show five random rows of df.',
    why: 'The top and bottom are often sorted or special. A random five is the honest look at the middle.',
    mcq: { q: 'Which line shows five random rows?',
      correct: 'df.sample(5)',
      wrong: ['df.sample(frac=5)', 'df.random(5)', 'df.sample()'],
      whyWrong: [
        'frac is a FRACTION, so frac=5 asks for five times the file and raises unless you allow replacement.',
        'There is no .random method on a frame.',
        'With no argument sample gives exactly one row — fine, but not the five you asked for.'],
      explain: 'df.sample(5) draws five rows at random. Add random_state=42 when you want the same five every run.' },
    lines: ['df.sample(5)'],
    decoys: ['df.random(5)', 'df.sample(frac=5)'],
    written: { prompt: 'Write the line that shows five random rows of df.', solution: 'df.sample(5)', must: ['sample(5)'] },
    walk: [['df.sample(5)', 'Rows from anywhere in the file. Run it twice and you get two different fives.']] });

  T({ key: 's-info', group: S2, title: 'The structure in one line',
    ask: 'Print the structure of df: the columns, their types, and how many values each one has.',
    why: 'One line answers "what have I got" and "how much is missing" at the same time.',
    mcq: { q: 'Which line prints the structure?',
      correct: 'df.info()',
      wrong: ['df.info', 'df.describe()', 'print(df)'],
      whyWrong: [
        'No brackets, so nothing runs — you print the method object instead.',
        'describe() gives statistics for the number columns, not the structure of all of them.',
        'Printing the frame shows the DATA, truncated. It says nothing about types or missing values.'],
      explain: 'df.info() lists every column with its type and its non-null count. The row count at the top lets you work out what is missing by subtraction.' },
    lines: ['df.info()'],
    decoys: ['df.info', 'df.details()'],
    written: { prompt: 'Write the line that prints the structure of df.', solution: 'df.info()', must: ['info()'] },
    walk: [['df.info()', 'Column name, non-null count, dtype. An object dtype where you expected a number means text got in.']] });

  T({ key: 's-describe', group: S2, title: 'Statistics for the numbers',
    ask: 'Show the count, mean, spread and quartiles of every number column in df.',
    why: 'The min and max rows are where impossible values live — a negative age, a price of 9999999.',
    mcq: { q: 'Which line summarises the number columns?',
      correct: 'df.describe()',
      wrong: ['df.describe', 'df.summary()', 'df.stats()'],
      whyWrong: [
        'Without brackets it does not run.',
        'There is no .summary() in pandas — that is R.',
        'And no .stats() either. describe() is the one.'],
      explain: 'df.describe() gives eight numbers per numeric column. Read it from the outside in: the min and the max first.' },
    lines: ['df.describe()'],
    decoys: ['df.summary()', 'df.stats()'],
    written: { prompt: 'Write the line that summarises the numeric columns of df.', solution: 'df.describe()', must: ['describe()'] },
    walk: [['df.describe()', 'count, mean, std, min, 25%, 50%, 75%, max — for the numbers only.']] });

  T({ key: 's-describe-obj', group: S2, lvl: 2, title: 'Statistics for the text',
    ask: 'Summarise the TEXT columns of df instead of the numbers.',
    why: 'For a label column, "how many distinct values and what is the most common" is the whole first look.',
    mcq: { q: 'Which line summarises the text columns?',
      correct: "df.describe(include='object')",
      wrong: ["df.describe(exclude='object')", "df.describe(include='text')", "df.describe(object=True)"],
      whyWrong: [
        'exclude leaves the text columns OUT — this gives you the numbers again.',
        "The dtype is called object, not text.",
        'There is no object= argument; the switch is include=.'],
      explain: "include='object' switches describe over to the text columns: count, unique, top and freq." },
    lines: ["df.describe(include='object')"],
    decoys: ["df.describe(exclude='object')", "df.describe(include='text')"],
    written: { prompt: 'Write the line that summarises the text columns of df.', solution: "df.describe(include='object')", must: ['describe(', "include='object'"] },
    walk: [["df.describe(include='object')", 'unique tells you how many different values; top and freq tell you the most common one and how often it appears.']] });

  /* ---------------- 03 · How big, and what is in it ---------------- */
  T({ key: 's-shape', group: S3, title: 'How many rows and columns',
    ask: 'Get the size of df as rows and columns.',
    why: 'The number you check after every filter, merge and drop — because that is where rows quietly disappear.',
    mcq: { q: 'Which one gives (rows, columns)?',
      correct: 'df.shape',
      wrong: ['df.shape()', 'df.size', 'len(df.columns)'],
      whyWrong: [
        'shape is an attribute, not a method — the brackets raise "tuple object is not callable".',
        'df.size is rows TIMES columns, one number, which is rarely what anyone wants.',
        'That is the column count only, and it says nothing about the rows.'],
      explain: 'df.shape gives a pair: rows first, columns second. No brackets.' },
    lines: ['df.shape'],
    decoys: ['df.shape()', 'df.size'],
    written: { prompt: 'Write the expression that gives the shape of df.', solution: 'df.shape', must: ['df.shape'] },
    walk: [['df.shape', 'A tuple like (5000, 12). Read it as rows by columns.']] });

  T({ key: 's-nrows', group: S3, title: 'Just the row count',
    ask: 'Get only the number of rows in df.',
    why: 'Half of all data bugs are a row count nobody looked at.',
    mcq: { q: 'Which gives the row count on its own?',
      correct: 'len(df)',
      wrong: ['len(df.columns)', 'df.count()', 'df.size'],
      whyWrong: [
        'len(df.columns) counts the COLUMNS — usually about a dozen, however many rows there are.',
        'count() gives one number per column — the non-missing values in each — not a single row count.',
        'size is rows times columns.'],
      explain: 'len(df) is the row count. df.shape[0] is the same thing spelled differently.' },
    lines: ['len(df)'],
    decoys: ['df.size', 'len(df.columns)'],
    written: { prompt: 'Write the expression that gives the number of rows in df.', solution: 'len(df)', must: ['len(df)'] },
    walk: [['len(df)', 'Short, obvious, and the one to print before and after anything that could drop rows.']] });

  T({ key: 's-columns', group: S3, title: 'The column names',
    ask: 'Get the column names of df as a plain list.',
    why: 'You cannot type a column name correctly until you have seen exactly how it is spelled.',
    mcq: { q: 'Which gives the names as a list you can read?',
      correct: 'list(df.columns)',
      wrong: ['df.columns()', 'df.names', 'df.keys'],
      whyWrong: [
        'columns is an attribute — the brackets raise.',
        'There is no .names on a DataFrame.',
        'df.keys is a method and needs brackets; even then it just returns the columns Index again.'],
      explain: 'df.columns is an Index; wrapping it in list() prints it in a form you can read and copy.' },
    lines: ['list(df.columns)'],
    decoys: ['df.columns()', 'df.names'],
    written: { prompt: 'Write the expression that gives df\'s column names as a list.', solution: 'list(df.columns)', must: ['list(df.columns)'] },
    walk: [['list(df.columns)', 'Now you can see the trailing spaces and the capital letters that are about to cause a KeyError.']] });

  T({ key: 's-dtypes', group: S3, title: 'The type of each column',
    ask: 'Show what type pandas thinks each column of df is.',
    why: 'A numeric column stored as text silently breaks every sum, sort and model that touches it.',
    mcq: { q: 'Which shows the type of every column?',
      correct: 'df.dtypes',
      wrong: ['df.dtype', 'df.types', 'type(df)'],
      whyWrong: [
        'Singular dtype belongs to a single column (a Series), not to the whole frame.',
        'There is no .types attribute.',
        'That tells you df is a DataFrame — true, and useless here.'],
      explain: 'df.dtypes lists every column and its type. object means text (or mixed), which is the one to look for.' },
    lines: ['df.dtypes'],
    decoys: ['df.types', 'df.dtype'],
    written: { prompt: 'Write the expression that shows the dtype of every column of df.', solution: 'df.dtypes', must: ['df.dtypes'] },
    walk: [['df.dtypes', 'int64, float64, object, datetime64. An object where you expected a number is your next job.']] });

  T({ key: 's-index', group: S3, lvl: 2, title: 'Reset a messy index',
    ask: 'Renumber the rows of df from zero after filtering, without keeping the old numbering.',
    why: 'Filtered frames keep their original row numbers, which then trip up anything that joins or compares by position.',
    mcq: { q: 'Which line renumbers the rows cleanly?',
      correct: 'df = df.reset_index(drop=True)',
      wrong: ['df = df.reset_index()', 'df.reset_index(drop=True)', 'df = df.set_index(range(len(df)))'],
      whyWrong: [
        'Without drop=True the old numbering is KEPT as a new column called index, and you collect one every time you filter.',
        'reset_index gives back a new frame; without assigning it, nothing changes.',
        'set_index would make those numbers the index rather than renumbering, and it takes a column name or a Series.'],
      explain: 'reset_index(drop=True) renumbers from 0 and throws the old numbers away. Assign the result back.' },
    lines: ['df = df.reset_index(drop=True)'],
    decoys: ['df = df.reset_index()', 'df.reset_index(drop=True)'],
    written: { prompt: 'Write the line that renumbers df\'s rows from zero, dropping the old index.', solution: 'df = df.reset_index(drop=True)', must: ['reset_index(drop=True)', 'df ='] },
    walk: [['df = df.reset_index(drop=True)', 'Do this after any filter whose result you are going to keep.']] });

  /* ---------------- 04 · What is missing ---------------- */
  T({ key: 's-isna-sum', group: S4, title: 'Count the gaps per column',
    ask: 'Count how many values are missing in each column of df.',
    why: 'This one number per column decides your whole cleaning plan.',
    mcq: { q: 'Which line counts missing values per column?',
      correct: 'df.isna().sum()',
      wrong: ['df.isna().count()', 'df.isna()', 'df.notna().sum()'],
      whyWrong: [
        'count() counts every row regardless, so every column comes back with the same number.',
        'That gives a whole frame of True and False — the ingredient, not the answer.',
        'notna() counts what is PRESENT, which is the opposite question.'],
      explain: 'isna() marks each cell True or False; sum() counts the Trues down each column, because True counts as 1.' },
    lines: ['df.isna().sum()'],
    decoys: ['df.isna().count()', 'df.notna().sum()'],
    written: { prompt: 'Write the expression that counts the missing values in each column of df.', solution: 'df.isna().sum()', must: ['isna()', '.sum()'] },
    walk: [['df.isna().sum()', 'One number per column. Sorting it descending puts the columns that need a decision at the top.']] });

  T({ key: 's-isna-col', group: S4, title: 'Gaps in one column',
    ask: 'Count how many rows of df have no amount.',
    why: 'The same idea narrowed to the column you actually care about.',
    mcq: { q: 'Which counts the missing amounts?',
      correct: "df['amount'].isna().sum()",
      wrong: ["df['amount'].isna()", "df['amount'] == None", "df['amount'].isnull().count()"],
      whyWrong: [
        'That is the True/False column itself, not the count.',
        'Nothing is ever equal to None in pandas — this returns False for every row, always.',
        'isnull is the same as isna, but count() counts all the rows rather than the missing ones.'],
      explain: "df['amount'].isna().sum() — pick the column, mark the gaps, count them." },
    lines: ["df['amount'].isna().sum()"],
    decoys: ["df['amount'] == None", "df['amount'].isna().count()"],
    written: { prompt: 'Write the expression that counts the missing values in the amount column.', solution: "df['amount'].isna().sum()", must: ["df['amount']", 'isna()', '.sum()'] },
    walk: [["df['amount'].isna().sum()", 'Same three parts as the whole-frame version, with one column named.']] });

  T({ key: 's-dropna', group: S4, title: 'Drop rows with no amount',
    ask: 'Remove the rows of df where amount is missing, leaving other gaps alone.',
    why: 'Dropping is fine — as long as it is aimed at one column and you say how many went.',
    mcq: { q: 'Which line drops only the rows missing an amount?',
      correct: "df = df.dropna(subset=['amount'])",
      wrong: ['df = df.dropna()', "df = df.drop(df['amount'].isna())", "df = df.dropna(axis=1)"],
      whyWrong: [
        'A bare dropna() removes any row with a gap in ANY column — on a wide table that can be most of the file.',
        'drop takes labels to remove, not a True/False mask, so this raises or removes the wrong rows.',
        'axis=1 drops COLUMNS that contain gaps, which is a very different and usually drastic move.'],
      explain: "dropna(subset=['amount']) requires that one column, and ignores gaps elsewhere." },
    lines: ["df = df.dropna(subset=['amount'])"],
    decoys: ['df = df.dropna()', 'df = df.dropna(axis=1)'],
    written: { prompt: 'Write the line that drops rows with a missing amount from df.', solution: "df = df.dropna(subset=['amount'])", must: ['dropna(subset=', "'amount'"] },
    walk: [["df = df.dropna(subset=['amount'])", 'Print len(df) before and after. A cleaning step you cannot quantify is one nobody can check.']] });

  T({ key: 's-fillna', group: S4, title: 'Fill the gaps with a value',
    ask: 'Replace the missing cities in df with the word unknown.',
    why: 'For a category, an explicit label is honest — and it stops the rows vanishing from a groupby.',
    mcq: { q: 'Which line fills the missing cities?',
      correct: "df['city'] = df['city'].fillna('unknown')",
      wrong: ["df['city'].fillna('unknown')", "df['city'] = df['city'].replace(None, 'unknown')", "df['city'] = df['city'].fillna()"],
      whyWrong: [
        'fillna returns a NEW column and changes nothing in place, so without assigning it back this line does nothing at all.',
        'replace(None, ...) does not match NaN — missing values are matched with isna, not by comparing to None.',
        'fillna needs to know what to fill WITH.'],
      explain: "Assign the result back: df['city'] = df['city'].fillna('unknown')." },
    lines: ["df['city'] = df['city'].fillna('unknown')"],
    decoys: ["df['city'].fillna('unknown')", "df['city'] = df['city'].fillna()"],
    written: { prompt: 'Write the line that fills missing cities with the word unknown.', solution: "df['city'] = df['city'].fillna('unknown')", must: ["df['city'] =", "fillna('unknown')"] },
    walk: [["df['city'] = df['city'].fillna('unknown')", 'The assignment is the half people forget. Nearly every pandas method hands back a copy.']] });

  T({ key: 's-fillna-median', group: S4, lvl: 2, title: 'Fill numbers with the median',
    ask: 'Fill the missing amounts in df with the median amount.',
    why: 'The median resists the handful of huge orders that would drag a mean upwards.',
    mcq: { q: 'Which line fills the gaps with the middle value?',
      correct: "df['amount'] = df['amount'].fillna(df['amount'].median())",
      wrong: ["df['amount'] = df['amount'].fillna(df['amount'].mean())", "df['amount'] = df['amount'].fillna(0)", "df['amount'] = df['amount'].median()"],
      whyWrong: [
        'The mean is pulled up by the big orders, so it fills the gaps with a number bigger than most real rows.',
        'Filling with 0 invents a fact — that nothing was spent — and drags every later average down.',
        'That replaces the WHOLE column with a single number.'],
      explain: 'fillna(df[col].median()) — compute the middle value, then use it for the gaps.' },
    lines: ["df['amount'] = df['amount'].fillna(df['amount'].median())"],
    decoys: ["df['amount'] = df['amount'].fillna(df['amount'].mean())", "df['amount'] = df['amount'].median()"],
    written: { prompt: 'Write the line that fills missing amounts with the median amount.', solution: "df['amount'] = df['amount'].fillna(df['amount'].median())", must: ['fillna(', 'median()'] },
    walk: [["df['amount'] = df['amount'].fillna(df['amount'].median())", 'Record which rows were missing FIRST if the missingness itself might matter.']] });

  /* ---------------- 05 · One column at a time ---------------- */
  T({ key: 's-one-col', group: S5, title: 'Take one column',
    ask: 'Get the amount column out of df.',
    why: 'A single column is a Series, and nearly every calculation starts by taking one.',
    mcq: { q: 'Which gives the amount column?',
      correct: "df['amount']",
      wrong: ["df('amount')", "df[amount]", "df['Amount']"],
      whyWrong: [
        'Round brackets try to CALL the frame, which is not a function.',
        'Without quotes Python looks for a variable called amount.',
        'Column names are case-sensitive: Amount and amount are different, and the wrong one raises KeyError.'],
      explain: "df['amount'] — square brackets, name in quotes, exactly as it is spelled in df.columns." },
    lines: ["df['amount']"],
    decoys: ["df('amount')", "df[amount]"],
    written: { prompt: 'Write the expression that gives the amount column of df.', solution: "df['amount']", must: ["df['amount']"] },
    walk: [["df['amount']", 'One column, every row. This is a Series: the index, and one value per row.']] });

  T({ key: 's-two-cols', group: S5, title: 'Take several columns',
    ask: 'Get the date and amount columns of df as a smaller frame.',
    why: 'Cutting a wide table down to the columns in play makes everything after it readable.',
    mcq: { q: 'Which gives both columns?',
      correct: "df[['date', 'amount']]",
      wrong: ["df['date', 'amount']", "df['date']['amount']", "df[('date', 'amount')]"],
      whyWrong: [
        'One set of brackets with a comma is read as a single tuple key, and raises KeyError.',
        'That takes the date column and then looks for a row labelled amount inside it.',
        'A tuple is treated as one key, the same as the first option.'],
      explain: 'Two sets of brackets: the outer selects, the inner is a LIST of names. The order you list them is the order you get.' },
    lines: ["df[['date', 'amount']]"],
    decoys: ["df['date', 'amount']", "df[('date', 'amount')]"],
    written: { prompt: 'Write the expression that takes the date and amount columns of df.', solution: "df[['date', 'amount']]", must: ["[['date', 'amount']]"] },
    walk: [["df[['date', 'amount']]", 'One name gives a Series; a list of names gives a DataFrame. That is the whole rule.']] });

  T({ key: 's-value-counts', group: S5, title: 'How often each value appears',
    ask: 'Count how many rows of df have each city.',
    why: 'For any label column this is the first question, and it takes one call.',
    mcq: { q: 'Which counts each city?',
      correct: "df['city'].value_counts()",
      wrong: ["df['city'].count()", "df['city'].unique()", "df['city'].sum()"],
      whyWrong: [
        'count() gives one number: how many rows have a city at all.',
        'unique() lists the distinct values but says nothing about how often each appears.',
        'Summing text either joins it all together or raises — not a count.'],
      explain: 'value_counts() gives one row per distinct value, biggest first.' },
    lines: ["df['city'].value_counts()"],
    decoys: ["df['city'].count()", "df['city'].sum()"],
    written: { prompt: 'Write the expression that counts each city in df.', solution: "df['city'].value_counts()", must: ['value_counts()'] },
    walk: [["df['city'].value_counts()", 'A single category covering 95% of rows changes what any chart or model can tell you.']] });

  T({ key: 's-value-counts-na', group: S5, lvl: 2, title: 'Counting the missing ones too',
    ask: 'Count the cities in df, including the rows where the city is missing.',
    why: 'The default hides the missing values — which are usually exactly what you need to see.',
    mcq: { q: 'Which counts the gaps as well?',
      correct: "df['city'].value_counts(dropna=False)",
      wrong: ["df['city'].value_counts()", "df['city'].value_counts(na=True)", "df['city'].fillna('missing').value_counts()"],
      whyWrong: [
        'This is the right method but it silently leaves the missing values out of the table.',
        'The argument is dropna, not na.',
        'This works and is sometimes clearer — but it CHANGES the column to get there, which dropna=False does not.'],
      explain: 'dropna=False puts NaN in the table as its own row, so the counts add up to len(df).' },
    lines: ["df['city'].value_counts(dropna=False)"],
    decoys: ["df['city'].value_counts(na=True)", "df['city'].value_counts()"],
    written: { prompt: 'Write the expression that counts cities including the missing ones.', solution: "df['city'].value_counts(dropna=False)", must: ['value_counts(', 'dropna=False'] },
    walk: [["df['city'].value_counts(dropna=False)", 'Check the total against len(df). If it matches, nothing is hiding.']] });

  T({ key: 's-nunique', group: S5, title: 'How many different ones',
    ask: 'Count how many DIFFERENT customers appear in df.',
    why: 'Distinct counts tell you the grain of the table: one row per order, or one per customer.',
    mcq: { q: 'Which counts the distinct customers?',
      correct: "df['customer_id'].nunique()",
      wrong: ["df['customer_id'].unique()", "df['customer_id'].count()", "len(df)"],
      whyWrong: [
        'unique() gives the VALUES; wrap it in len() and you have the count.',
        'count() counts non-missing rows, repeats included.',
        'That is the row count, which is only the same thing if nobody appears twice.'],
      explain: 'nunique() is the count of distinct values; unique() is the values themselves.' },
    lines: ["df['customer_id'].nunique()"],
    decoys: ["df['customer_id'].unique()", "df['customer_id'].count()"],
    written: { prompt: 'Write the expression that counts distinct customer_ids in df.', solution: "df['customer_id'].nunique()", must: ['nunique()'] },
    walk: [["df['customer_id'].nunique()", 'Compare it with len(df): equal means one row each, far apart means many rows per customer.']] });

  T({ key: 's-unique', group: S5, title: 'List the different values',
    ask: 'List the distinct regions that appear in df.',
    why: 'This is where you find "North", "north" and "N " living in the same column.',
    mcq: { q: 'Which lists the distinct regions?',
      correct: "df['region'].unique()",
      wrong: ["df['region'].nunique()", "set(df['region'].value_counts())", "df['region'].drop_duplicates().count()"],
      whyWrong: [
        'nunique() gives the NUMBER of distinct values, not the values.',
        'That makes a set of the COUNTS, not of the regions.',
        'drop_duplicates() gets there, but count() then reduces it back to a number.'],
      explain: 'unique() returns an array of every distinct value, in the order first seen.' },
    lines: ["df['region'].unique()"],
    decoys: ["df['region'].nunique()", "df['region'].drop_duplicates().count()"],
    written: { prompt: 'Write the expression that lists the distinct regions in df.', solution: "df['region'].unique()", must: ['unique()'] },
    walk: [["df['region'].unique()", 'Read the list. Every near-duplicate you see here is a group that will split in two later.']] });

  /* ---------------- 06 · Sums on a column ---------------- */
  T({ key: 's-sum', group: S6, title: 'Add a column up',
    ask: 'Total the amount column of df.',
    why: 'The first number anybody asks for, and the shape every other statistic follows.',
    mcq: { q: 'Which totals the column?',
      correct: "df['amount'].sum()",
      wrong: ["sum(df['amount'])", "df.sum('amount')", "df['amount'].total()"],
      whyWrong: [
        "Python's built-in sum works, but it loops in Python instead of in C — noticeably slower, and it raises on missing values.",
        'df.sum() takes an axis, not a column name.',
        'There is no .total() method.'],
      explain: "df['amount'].sum() — pick the column, then say what to work out. Missing values are skipped." },
    lines: ["df['amount'].sum()"],
    decoys: ["df.sum('amount')", "df['amount'].total()"],
    written: { prompt: 'Write the expression that totals the amount column.', solution: "df['amount'].sum()", must: ["df['amount'].sum()"] },
    walk: [["df['amount'].sum()", 'NaNs are ignored rather than poisoning the total — which is convenient, and worth knowing.']] });

  T({ key: 's-mean', group: S6, title: 'The average',
    ask: 'Get the average amount in df.',
    why: 'Same shape as the last lesson, one word changed.',
    mcq: { q: 'Which gives the mean?',
      correct: "df['amount'].mean()",
      wrong: ["df['amount'].average()", "df['amount'].sum() / df['amount'].count()", "df.mean()"],
      whyWrong: [
        'There is no .average() in pandas.',
        'That is the same number the long way round — and it is easy to get wrong by dividing by len(df) instead.',
        'That averages EVERY numeric column, which answers a different question.'],
      explain: "df['amount'].mean() skips missing values, so it is the average of the values that exist." },
    lines: ["df['amount'].mean()"],
    decoys: ["df['amount'].average()", 'df.mean()'],
    written: { prompt: 'Write the expression that gives the average amount.', solution: "df['amount'].mean()", must: ["df['amount'].mean()"] },
    walk: [["df['amount'].mean()", 'One word different from sum(). Every summary works this way: pick the column, name the statistic.']] });

  T({ key: 's-median', group: S6, title: 'The middle value',
    ask: 'Get the median amount in df.',
    why: 'On money data the median is usually the honest "typical" — the mean is dragged by the big orders.',
    mcq: { q: 'Which gives the median?',
      correct: "df['amount'].median()",
      wrong: ["df['amount'].middle()", "df['amount'].mode()", "df['amount'].quantile()"],
      whyWrong: [
        'There is no .middle() in pandas — the method is median(), the same word statisticians use.',
        'The mode is the most COMMON value, which on continuous money data is usually meaningless.',
        'quantile() with no argument does give the median — the default is 0.5 — but nobody reading it can tell that at a glance.'],
      explain: 'median() is the middle value once sorted. Quote it alongside the mean whenever the two differ a lot.' },
    lines: ["df['amount'].median()"],
    decoys: ["df['amount'].middle()", "df['amount'].mode()"],
    written: { prompt: 'Write the expression that gives the median amount.', solution: "df['amount'].median()", must: ["df['amount'].median()"] },
    walk: [["df['amount'].median()", 'Mean far above median means a long tail to the right, which is what money always looks like.']] });

  T({ key: 's-minmax', group: S6, title: 'The biggest and the smallest',
    ask: 'Get the largest amount in df.',
    why: 'The max is where the impossible values are: the £9,999,999 order, the age of 200.',
    mcq: { q: 'Which gives the largest amount?',
      correct: "df['amount'].max()",
      wrong: ["max(df)", "df.max()", "df['amount'].largest()"],
      whyWrong: [
        'max(df) takes the maximum of the COLUMN NAMES, alphabetically — a surprising but real gotcha.',
        'That gives the max of every column at once.',
        'There is no .largest(); nlargest exists but takes a count.'],
      explain: "df['amount'].max(), and .min() for the other end. Look at both before trusting a column." },
    lines: ["df['amount'].max()"],
    decoys: ['max(df)', "df['amount'].largest()"],
    written: { prompt: 'Write the expression that gives the largest amount.', solution: "df['amount'].max()", must: ["df['amount'].max()"] },
    walk: [["df['amount'].max()", 'If this number is impossible, stop and find out why before you calculate anything else.']] });

  T({ key: 's-round-stat', group: S6, lvl: 2, title: 'Round a statistic for reading',
    ask: 'Print the average amount rounded to 2 decimal places.',
    why: 'Fourteen decimal places is noise. Round at the very end, for display only.',
    mcq: { q: 'Which prints the average to 2 places?',
      correct: "print(round(df['amount'].mean(), 2))",
      wrong: ["print(df['amount'].round(2).mean())", "print(round(df['amount'], 2).mean())", "print(df['amount'].mean(2))"],
      whyWrong: [
        'This rounds every VALUE first and then averages, which is a slightly different number and more work.',
        'Python\'s round on a whole Series raises TypeError.',
        'mean() takes no such argument — the 2 would be read as the axis.'],
      explain: 'Work the statistic out, then round the single number that comes out of it.' },
    lines: ["print(round(df['amount'].mean(), 2))"],
    decoys: ["print(df['amount'].mean(2))", "print(round(df['amount'], 2).mean())"],
    written: { prompt: 'Write the line that prints the average amount rounded to 2 decimal places.', solution: "print(round(df['amount'].mean(), 2))", must: ['round(', "df['amount'].mean()", '2)'] },
    walk: [["print(round(df['amount'].mean(), 2))", 'Rounding is a presentation decision, so it belongs at the end of the pipeline, never in the middle.']] });
})();
