/* Quickfire cards — pandas: cleaning. Missing values, types, duplicates, text. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var MIS = 'pandas · missing values';
  var TYP = 'pandas · types & conversion';
  var DUP = 'pandas · duplicates & replace';
  var STR = 'pandas · text columns';

  window.SNIPPETS.push(

    /* ---- missing ---- */
    { id: 'pd-dropna', group: MIS, lvl: 1,
      ask: 'Drop every row that has any missing value',
      a: 'df.dropna()',
      note: 'Blunt: on a wide frame this can delete almost everything. Count first.' },

    { id: 'pd-dropna-subset', group: MIS, lvl: 2,
      ask: 'Drop rows where "email" is missing, ignoring gaps in other columns',
      a: "df.dropna(subset=['email'])",
      note: 'subset is what you want nine times out of ten.' },

    { id: 'pd-dropna-cols', group: MIS, lvl: 2,
      ask: 'Drop any COLUMN that contains a missing value',
      a: 'df.dropna(axis=1)',
      note: 'axis=1 works on columns; axis=0 (the default) on rows.' },

    { id: 'pd-dropna-thresh', group: MIS, lvl: 3,
      ask: 'Keep only rows with at least 3 non-missing values',
      a: 'df.dropna(thresh=3)',
      note: 'thresh counts what must be PRESENT, not what may be missing.' },

    { id: 'pd-dropna-all', group: MIS, lvl: 3,
      ask: 'Drop only the rows that are completely empty',
      a: "df.dropna(how='all')",
      note: 'how=\'any\' is the default; how=\'all\' is the gentle version.' },

    { id: 'pd-fillna-0', group: MIS, lvl: 1,
      ask: 'Fill every missing value in df with 0',
      a: 'df.fillna(0)',
      note: 'Only honest when zero really means "none" — otherwise it invents data.' },

    { id: 'pd-fillna-mean', group: MIS, lvl: 1,
      ask: 'Fill missing "age" values with the mean age',
      a: "df['age'].fillna(df['age'].mean())",
      note: 'In a model, fit the imputer on train only — this line leaks if you run it before splitting.' },

    { id: 'pd-fillna-median', group: MIS, lvl: 1,
      ask: 'Fill missing "income" values with the median income',
      a: "df['income'].fillna(df['income'].median())",
      note: 'Median beats mean on skewed money columns.' },

    { id: 'pd-fillna-mode', group: MIS, lvl: 2,
      ask: 'Fill missing "city" values with the most common city',
      a: "df['city'].fillna(df['city'].mode()[0])",
      note: 'mode() returns a Series because of possible ties.' },

    { id: 'pd-fillna-dict', group: MIS, lvl: 2,
      ask: 'Fill "age" with 0 and "city" with "unknown" in one call',
      a: "df.fillna({'age': 0, 'city': 'unknown'})",
      note: 'A dict keyed by column — one pass, one line.' },

    { id: 'pd-ffill', group: MIS, lvl: 2,
      ask: 'Fill gaps by carrying the last known value forward',
      a: 'df.ffill()',
      alts: ["df.fillna(method='ffill')"],
      note: 'The natural move on a time series. bfill() fills backwards from the next value.' },

    { id: 'pd-bfill', group: MIS, lvl: 2,
      ask: 'Fill gaps using the next known value, working backwards',
      a: 'df.bfill()',
      note: 'Careful on time series: it lets the future leak into the past.' },

    { id: 'pd-interpolate', group: MIS, lvl: 3,
      ask: 'Fill gaps in a numeric series by linear interpolation',
      a: 'df.interpolate()',
      note: 'Straight-line between known points. method=\'time\' respects an uneven date index.' },

    { id: 'pd-fillna-group', group: MIS, lvl: 3,
      ask: 'Fill missing "age" with the mean age of that row\'s "city"',
      a: "df['age'] = df.groupby('city')['age'].transform(lambda s: s.fillna(s.mean()))",
      note: 'transform keeps the original shape, so it lines straight back up with df.' },

    { id: 'pd-nan-const', group: MIS, lvl: 2,
      ask: 'Write a literal missing value in a Python expression, NumPy style',
      a: 'np.nan',
      note: 'NaN never equals itself: np.nan == np.nan is False. Always test with isna().' },

    { id: 'pd-replace-nan', group: MIS, lvl: 3,
      ask: 'Turn every empty string in df into a proper missing value',
      a: "df.replace('', np.nan)",
      note: 'Empty strings are not NaN — isna() will not see them until you convert.' },

    /* ---- types ---- */
    { id: 'pd-astype-int', group: TYP, lvl: 1,
      ask: 'Convert the "count" column to integer',
      a: "df['count'] = df['count'].astype(int)",
      note: 'astype fails loudly on NaN — fill or use the nullable "Int64" first.' },

    { id: 'pd-astype-float', group: TYP, lvl: 1,
      ask: 'Convert the "price" column to float',
      a: "df['price'] = df['price'].astype(float)" },

    { id: 'pd-astype-str', group: TYP, lvl: 1,
      ask: 'Convert the "id" column to string',
      a: "df['id'] = df['id'].astype(str)",
      note: 'Do this before any .str operation on a numeric-looking code.' },

    { id: 'pd-astype-cat', group: TYP, lvl: 2,
      ask: 'Convert the "city" column to the categorical dtype',
      a: "df['city'] = df['city'].astype('category')",
      note: 'Big memory win on repeated text, and some models handle it natively.' },

    { id: 'pd-to-numeric', group: TYP, lvl: 2,
      ask: 'Convert "price" to a number, turning anything unparseable into NaN',
      a: "df['price'] = pd.to_numeric(df['price'], errors='coerce')",
      note: 'The standard rescue for a numeric column polluted by "N/A" or "£3.50".' },

    { id: 'pd-to-datetime-col', group: TYP, lvl: 1,
      ask: 'Convert the "date" column to real datetimes',
      a: "df['date'] = pd.to_datetime(df['date'])",
      note: 'Until you do this, .dt does not exist and sorting is alphabetical.' },

    { id: 'pd-to-datetime-fmt', group: TYP, lvl: 2,
      ask: 'Parse "date" using the explicit format day/month/year',
      a: "df['date'] = pd.to_datetime(df['date'], format='%d/%m/%Y')",
      note: 'Explicit format is both faster and safe from the US/UK day-month flip.' },

    { id: 'pd-astype-bool', group: TYP, lvl: 2,
      ask: 'Convert the "flag" column to boolean',
      a: "df['flag'] = df['flag'].astype(bool)",
      note: 'Watch out: the string "False" is truthy — map it explicitly instead.' },

    { id: 'pd-nullable-int', group: TYP, lvl: 3,
      ask: 'Convert "count" to an integer type that can still hold missing values',
      a: "df['count'] = df['count'].astype('Int64')",
      note: 'Capital-I Int64 is the nullable one; lowercase int64 cannot hold NA.' },

    { id: 'pd-convert-dtypes', group: TYP, lvl: 3,
      ask: 'Let pandas pick the best possible dtype for every column',
      a: 'df = df.convert_dtypes()',
      note: 'Moves you to the nullable dtypes in one go.' },

    { id: 'pd-round', group: TYP, lvl: 1,
      ask: 'Round the "price" column to 2 decimal places',
      a: "df['price'] = df['price'].round(2)",
      note: 'df.round(2) rounds every numeric column at once.' },

    { id: 'pd-clip', group: TYP, lvl: 3,
      ask: 'Cap the "amount" column between 0 and 1000',
      a: "df['amount'].clip(0, 1000)",
      note: 'Winsorising: pull outliers to the boundary instead of deleting the rows.' },

    { id: 'pd-abs', group: TYP, lvl: 2,
      ask: 'Take the absolute value of every number in the "delta" column',
      a: "df['delta'].abs()" },

    /* ---- duplicates & replace ---- */
    { id: 'pd-drop-dups', group: DUP, lvl: 1,
      ask: 'Remove fully duplicated rows from df',
      a: 'df.drop_duplicates()',
      note: 'Keeps the first copy of each.' },

    { id: 'pd-drop-dups-subset', group: DUP, lvl: 2,
      ask: 'Keep one row per "customer_id", the first one seen',
      a: "df.drop_duplicates(subset=['customer_id'], keep='first')",
      alts: ["df.drop_duplicates(subset='customer_id')"],
      note: 'keep=\'last\' takes the most recent instead; keep=False drops every duplicate.' },

    { id: 'pd-dups-rows', group: DUP, lvl: 2,
      ask: 'Show the duplicated rows themselves, all copies included',
      a: 'df[df.duplicated(keep=False)]',
      note: 'keep=False marks every member of a duplicate group, not just the extras.' },

    { id: 'pd-replace-val', group: DUP, lvl: 1,
      ask: 'Replace the value "Yes" with True everywhere in df',
      a: "df.replace('Yes', True)" },

    { id: 'pd-replace-dict', group: DUP, lvl: 2,
      ask: 'Map "Y" to 1 and "N" to 0 in the "flag" column using a dictionary',
      a: "df['flag'] = df['flag'].map({'Y': 1, 'N': 0})",
      note: 'map turns anything not in the dict into NaN — which is a useful way to spot surprises.' },

    { id: 'pd-replace-regex', group: DUP, lvl: 3,
      ask: 'Strip the pound sign out of "price" with a regex replace',
      a: "df['price'] = df['price'].replace('£', '', regex=True)",
      note: 'Then to_numeric(errors=\'coerce\') to finish the job.' },

    { id: 'pd-map-else', group: DUP, lvl: 2,
      ask: 'Make a new column "big" that is 1 when amount is over 100 and 0 otherwise',
      a: "df['big'] = (df['amount'] > 100).astype(int)",
      alts: ["df['big'] = np.where(df['amount'] > 100, 1, 0)"],
      note: 'A boolean cast to int is the cheapest possible if/else in pandas.' },

    { id: 'pd-np-where3', group: DUP, lvl: 2,
      ask: 'Add a "band" column reading high when amount is over 100 and low otherwise',
      a: "df['band'] = np.where(df['amount'] > 100, 'high', 'low')",
      note: 'np.where is the vectorised ternary: condition, value if true, value if false.' },

    { id: 'pd-np-select', group: DUP, lvl: 3,
      ask: 'Set a "band" column from the conditions `conds` and `labels`, defaulting to other, with np.select',
      a: "df['band'] = np.select(conds, labels, default='other')",
      note: 'The clean way to write a multi-branch rule without nesting np.where.' },

    { id: 'pd-cut', group: DUP, lvl: 2,
      ask: 'Bin "age" into the bands 0-18, 18-65, 65-120',
      a: "df['band'] = pd.cut(df['age'], bins=[0, 18, 65, 120])",
      note: 'cut = fixed edges you choose. Add labels=[...] to name the bands.' },

    { id: 'pd-qcut', group: DUP, lvl: 2,
      ask: 'Split "income" into four equal-sized quartile groups',
      a: "df['quartile'] = pd.qcut(df['income'], 4)",
      note: 'qcut = equal counts per bin; cut = equal-width bins.' },

    { id: 'pd-apply-col', group: DUP, lvl: 2,
      ask: 'Apply the function `clean` to every value of the "name" column',
      a: "df['name'] = df['name'].apply(clean)",
      note: 'Fine for one column; reach for a vectorised .str method first if one exists.' },

    { id: 'pd-apply-row', group: DUP, lvl: 3,
      ask: 'Apply a function `score` across each row of df',
      a: 'df.apply(score, axis=1)',
      note: 'axis=1 hands your function one row at a time. It is slow — a last resort.' },

    { id: 'pd-lambda-col', group: DUP, lvl: 2,
      ask: 'Double every value in "price" with a lambda',
      a: "df['price'].apply(lambda x: x * 2)",
      note: 'df[\'price\'] * 2 does the same thing far faster — but the lambda shape is worth knowing.' },

    /* ---- text ---- */
    { id: 'pd-str-lower', group: STR, lvl: 1,
      ask: 'Lowercase every value in the "name" column',
      a: "df['name'].str.lower()",
      note: 'The .str accessor gives you Python string methods, vectorised.' },

    { id: 'pd-str-upper', group: STR, lvl: 1,
      ask: 'Uppercase every value in the "code" column',
      a: "df['code'].str.upper()" },

    { id: 'pd-str-strip', group: STR, lvl: 1,
      ask: 'Trim leading and trailing whitespace in the "name" column',
      a: "df['name'].str.strip()",
      note: 'Do this before any grouping — " London" and "London" are different keys.' },

    { id: 'pd-str-replace', group: STR, lvl: 1,
      ask: 'Replace every hyphen with a space in "code"',
      a: "df['code'].str.replace('-', ' ')",
      note: 'Add regex=False when the pattern is a literal with special characters.' },

    { id: 'pd-str-split', group: STR, lvl: 2,
      ask: 'Split "full_name" on a space into separate columns',
      a: "df['full_name'].str.split(' ', expand=True)",
      note: 'expand=True is what turns the lists into columns.' },

    { id: 'pd-str-get', group: STR, lvl: 2,
      ask: 'Take the first part of "email" before the @ sign',
      a: "df['email'].str.split('@').str.get(0)",
      alts: ["df['email'].str.split('@').str[0]"],
      note: 'Without expand=True you get lists, and .str[0] indexes into them.' },

    { id: 'pd-str-len', group: STR, lvl: 1,
      ask: 'Get the length of each string in "name"',
      a: "df['name'].str.len()" },

    { id: 'pd-str-cat', group: STR, lvl: 2,
      ask: 'Join "first" and "last" into one column separated by a space',
      a: "df['first'] + ' ' + df['last']",
      note: 'Plain + concatenates strings elementwise. Any NaN poisons that row.' },

    { id: 'pd-str-extract', group: STR, lvl: 3,
      ask: 'Extract the digits from "code" with a regex capture group',
      a: "df['code'].str.extract(r'(\\d+)')",
      note: 'One capture group in, one column out; several groups give several columns.' },

    { id: 'pd-str-title', group: STR, lvl: 2,
      ask: 'Title-case the "city" column',
      a: "df['city'].str.title()",
      note: 'Good enough for city names; it mangles "McDonald" — watch for that.' },

    { id: 'pd-str-pad', group: STR, lvl: 3,
      ask: 'Pad "code" with leading zeros to 5 characters',
      a: "df['code'].str.zfill(5)",
      note: 'Restores account and postcode-style identifiers that lost their zeros.' },

    { id: 'pd-str-slice', group: STR, lvl: 2,
      ask: 'Take the first three characters of every "postcode"',
      a: "df['postcode'].str[:3]",
      note: '.str slices exactly like a Python string slice.' }
  );
})();
