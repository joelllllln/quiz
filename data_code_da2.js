/* Coding tasks — data analytics, stage 03 and 04: cleaning what arrived, and
   adding the columns the question actually needs. */
(function () {
  window.CODETASKS = window.CODETASKS || [];
  var S3 = '27 · Cleaning, all together';
  var S4 = '28 · New columns, all together';

  window.CODETASKS.push(

    { key: 'daclean-names', group: S3, lvl: 1, title: 'Tidy the column names',
      ask: 'Make every column name of df lower case, trimmed, with spaces turned into underscores.',
      why: 'A column called " Order Amount " has to be typed exactly, spaces and all. Tidy names once and everything after is easier.',
      mcq: {
        q: 'Which line tidies every column name in one go?',
        correct: "df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')",
        wrong: [
          "df.columns = df.columns.strip().lower().replace(' ', '_')",
          "df.columns = df.columns.str.strip().str.lower().replace(' ', '_')",
          "df.rename(columns=str.lower).strip()"],
        explain: "df.columns is an Index, so the text methods live behind .str — all three of them. Dropping the .str on the last call would try to replace a whole column NAME rather than the characters inside it." },
      lines: [
        "df.columns = (df.columns.str.strip()",
        "                        .str.lower()",
        "                        .str.replace(' ', '_'))",
        "print(list(df.columns))"],
      decoys: ["df.columns = df.columns.strip().lower()", "df.columns = df.columns.str.replace(' ', '')"],
      written: {
        prompt: 'Write the code: strip, lower-case and underscore every column name of df, then print the new names.',
        solution: "df.columns = (df.columns.str.strip()\n                        .str.lower()\n                        .str.replace(' ', '_'))\nprint(list(df.columns))",
        must: ['df.columns', 'str.strip()', 'str.lower()', "str.replace(' ', '_')"] },
      walk: [
        ["df.columns = (df.columns.str.strip()", "Assigning to df.columns replaces the whole set of names at once."],
        ["                        .str.lower()", "Lower case means you never have to remember whether it was Amount or amount."],
        ["                        .str.replace(' ', '_'))", "Underscores let you use the name without quotes in .query() and as an attribute."],
        ["print(list(df.columns))", "Read them back. This is the moment to spot the duplicate name or the stray unnamed column."]] },

    { key: 'danull-drop', group: S3, lvl: 1, title: 'Drop the rows you cannot use',
      ask: 'Drop the rows of df where amount is missing, and report how many rows went.',
      why: 'Dropping is fine — but only when you say how many, and only on the columns that matter.',
      mcq: {
        q: 'Which line drops rows missing an amount, and leaves other gaps alone?',
        correct: "clean = df.dropna(subset=['amount'])",
        wrong: [
          "clean = df.dropna()",
          "clean = df.dropna(columns=['amount'])",
          "clean = df.drop(df['amount'].isna())"],
        explain: "subset= names the columns that must be present. A bare dropna() throws away any row with a gap ANYWHERE, which on a wide table can be most of the file. The argument is subset, not columns." },
      lines: [
        "before = len(df)",
        "clean = df.dropna(subset=['amount'])",
        "print(before - len(clean), 'rows dropped')"],
      decoys: ["clean = df.dropna()", "clean = df.dropna(columns=['amount'])"],
      written: {
        prompt: 'Write the code: remember the row count, drop rows with a missing amount into clean, then print how many rows were dropped.',
        solution: "before = len(df)\nclean = df.dropna(subset=['amount'])\nprint(before - len(clean), 'rows dropped')",
        must: ['dropna(subset=', "'amount'", 'before'] },
      walk: [
        ["before = len(df)", "Count first. A cleaning step you cannot quantify is a cleaning step nobody can check."],
        ["clean = df.dropna(subset=['amount'])", "Only the amount column is required; a missing city or note keeps its row."],
        ["print(before - len(clean), 'rows dropped')", "If this number is big, dropping was the wrong choice — fill or investigate instead."]] },

    { key: 'danull-fill', group: S3, lvl: 2, title: 'Fill the gaps sensibly',
      ask: 'Fill missing amounts in df with the median amount, and missing cities with the word unknown.',
      why: 'Median for numbers, an explicit label for categories — and a flag column so the fill never disappears without trace.',
      mcq: {
        q: 'Which pair fills the numbers with the median and the text with a label?',
        correct: "df['amount'] = df['amount'].fillna(df['amount'].median())\ndf['city'] = df['city'].fillna('unknown')",
        wrong: [
          "df['amount'] = df['amount'].fillna(df['amount'].mean())\ndf['city'] = df['city'].fillna(0)",
          "df['amount'].fillna(df['amount'].median())\ndf['city'].fillna('unknown')",
          "df['amount'] = df['amount'].replace(np.nan)\ndf['city'] = df['city'].replace(np.nan, 'unknown')"],
        explain: "The median resists the huge outliers that drag a mean around. And fillna gives back a NEW column — without assigning it back, nothing changes at all." },
      lines: [
        "df['amount_missing'] = df['amount'].isna().astype(int)",
        "df['amount'] = df['amount'].fillna(df['amount'].median())",
        "df['city'] = df['city'].fillna('unknown')",
        "print(df.isna().sum().sum(), 'gaps left')"],
      decoys: ["df['amount'].fillna(df['amount'].median())", "df['amount'] = df['amount'].fillna(0)"],
      written: {
        prompt: 'Write the code: flag which rows had a missing amount, fill amounts with the median, fill cities with unknown, then print how many gaps are left in total.',
        solution: "df['amount_missing'] = df['amount'].isna().astype(int)\ndf['amount'] = df['amount'].fillna(df['amount'].median())\ndf['city'] = df['city'].fillna('unknown')\nprint(df.isna().sum().sum(), 'gaps left')",
        must: ['isna().astype(int)', 'fillna(', 'median()', "'unknown'"] },
      walk: [
        ["df['amount_missing'] = df['amount'].isna().astype(int)", "Record the missingness BEFORE you fill it. Whether a value was missing is often predictive in itself."],
        ["df['amount'] = df['amount'].fillna(df['amount'].median())", "Assign it back, or the fill is thrown away. Median rather than mean, because one enormous order should not move the filler."],
        ["df['city'] = df['city'].fillna('unknown')", "For a category, an explicit label is honest. Filling with the most common city would invent data."],
        ["print(df.isna().sum().sum(), 'gaps left')", "The double sum totals every gap in the frame — a one-number check that the cleaning did what you think."]] },

    { key: 'dadupes', group: S3, lvl: 1, title: 'Find and remove duplicates',
      ask: 'Count the fully duplicated rows in df, then remove them; then keep only the newest row per order_id.',
      why: 'Duplicated rows quietly double a total. Duplicated keys quietly multiply a join.',
      mcq: {
        q: 'Which line keeps only the newest row for each order_id?',
        correct: "df = df.sort_values('date').drop_duplicates(subset=['order_id'], keep='last')",
        wrong: [
          "df = df.drop_duplicates(subset=['order_id'], keep='last')",
          "df = df.sort_values('date').drop_duplicates(keep='last')",
          "df = df.groupby('order_id').last()"],
        explain: "keep='last' keeps the last row it MEETS, so the sort is what makes it the newest one. Without subset it only removes rows identical in every column, which is a different job." },
      lines: [
        "print(df.duplicated().sum(), 'exact duplicates')",
        "df = df.drop_duplicates()",
        "df = df.sort_values('date').drop_duplicates(subset=['order_id'], keep='last')",
        "print(df['order_id'].is_unique)"],
      decoys: ["df = df.drop_duplicates(subset='all')", "df = df.groupby('order_id').last()"],
      written: {
        prompt: 'Write the code: print how many exact duplicates there are, drop them, then keep the newest row per order_id and confirm order_id is now unique.',
        solution: "print(df.duplicated().sum(), 'exact duplicates')\ndf = df.drop_duplicates()\ndf = df.sort_values('date').drop_duplicates(subset=['order_id'], keep='last')\nprint(df['order_id'].is_unique)",
        must: ['duplicated().sum()', 'drop_duplicates()', "subset=['order_id']", "keep='last'"] },
      walk: [
        ["print(df.duplicated().sum(), 'exact duplicates')", "duplicated() marks every row that has appeared before. Count them before you delete anything."],
        ["df = df.drop_duplicates()", "Removes rows identical across every column — the safe, obvious ones."],
        ["df = df.sort_values('date').drop_duplicates(subset=['order_id'], keep='last')", "Now the judgement call: same order recorded twice, keep the later version."],
        ["print(df['order_id'].is_unique)", "True means one row per order. This is the check to run before any join."]] },

    { key: 'datypes', group: S3, lvl: 2, title: 'Fix the column types',
      ask: 'Turn amount into a real number even though some rows contain text, and make id a string.',
      why: 'A numeric column stored as text silently breaks every sum, sort and model that touches it.',
      mcq: {
        q: 'Which line converts amount to numbers and turns the unconvertible values into NaN?',
        correct: "df['amount'] = pd.to_numeric(df['amount'], errors='coerce')",
        wrong: [
          "df['amount'] = df['amount'].astype(float)",
          "df['amount'] = pd.to_numeric(df['amount'], errors='ignore')",
          "df['amount'] = float(df['amount'])"],
        explain: "astype(float) raises on the first bad value and stops. errors='coerce' turns the bad ones into NaN so you can count them and decide; errors='ignore' quietly leaves the whole column as text." },
      lines: [
        "df['amount'] = pd.to_numeric(df['amount'], errors='coerce')",
        "print(df['amount'].isna().sum(), 'values would not convert')",
        "df['id'] = df['id'].astype(str)",
        "print(df.dtypes)"],
      decoys: ["df['amount'] = float(df['amount'])", "df['amount'] = pd.to_numeric(df['amount'], errors='ignore')"],
      written: {
        prompt: 'Write the code: coerce amount to numeric, print how many values failed, cast id to string, and print the dtypes.',
        solution: "df['amount'] = pd.to_numeric(df['amount'], errors='coerce')\nprint(df['amount'].isna().sum(), 'values would not convert')\ndf['id'] = df['id'].astype(str)\nprint(df.dtypes)",
        must: ['pd.to_numeric', "errors='coerce'", "astype(str)"] },
      walk: [
        ["df['amount'] = pd.to_numeric(df['amount'], errors='coerce')", "Everything that is not a number becomes NaN — pound signs, commas, the word 'n/a'."],
        ["print(df['amount'].isna().sum(), 'values would not convert')", "This count IS the finding. Twelve bad rows is a typo; twelve thousand is a format problem upstream."],
        ["df['id'] = df['id'].astype(str)", "Ids are labels, not quantities. As text they keep their leading zeros and never get averaged by accident."],
        ["print(df.dtypes)", "The confirmation. object where you expected float64 means the conversion did not take."]] },

    { key: 'datext', group: S3, lvl: 1, title: 'Standardise a text column',
      ask: 'Trim and lower-case the city column of df, then check how many distinct cities are left.',
      why: '"London", "london " and "LONDON" are three groups in a groupby and one city in real life.',
      mcq: {
        q: 'Which line standardises the column?',
        correct: "df['city'] = df['city'].str.strip().str.lower()",
        wrong: [
          "df['city'] = df['city'].strip().lower()",
          "df['city'] = df['city'].str.strip.str.lower",
          "df['city'] = str(df['city']).strip().lower()"],
        explain: "Text methods on a whole column live behind .str, and each one needs its own .str. Without it you are calling a string method on a Series, which does not exist." },
      lines: [
        "print(df['city'].nunique(), 'before')",
        "df['city'] = df['city'].str.strip().str.lower()",
        "print(df['city'].nunique(), 'after')"],
      decoys: ["df['city'] = df['city'].strip().lower()", "df['city'] = df['city'].str.title().str.strip"],
      written: {
        prompt: 'Write the code: print the distinct city count, strip and lower-case the column, then print the distinct count again.',
        solution: "print(df['city'].nunique(), 'before')\ndf['city'] = df['city'].str.strip().str.lower()\nprint(df['city'].nunique(), 'after')",
        must: ['str.strip()', 'str.lower()', 'nunique()'] },
      walk: [
        ["print(df['city'].nunique(), 'before')", "The before-and-after is the point: if the count drops from 63 to 48, you just merged fifteen phantom cities."],
        ["df['city'] = df['city'].str.strip().str.lower()", "Trim first, then lower. Both are cheap and both are needed."],
        ["print(df['city'].nunique(), 'after')", "Now the groupby you are about to run will actually group."]] },

    { key: 'daoutlier', group: S3, lvl: 2, title: 'Deal with the impossible values',
      ask: 'Find the rows of df where amount is negative or above 10000, and cap the column at those bounds instead of deleting them.',
      why: 'An impossible value is a data-quality finding, not something to quietly delete.',
      mcq: {
        q: 'Which line caps the column into a sensible range?',
        correct: "df['amount'] = df['amount'].clip(lower=0, upper=10000)",
        wrong: [
          "df['amount'] = df['amount'].clip(0, 10000, inplace=True)",
          "df['amount'] = df[df['amount'].between(0, 10000)]",
          "df['amount'] = df['amount'].round(0, 10000)"],
        explain: "clip pulls anything below the lower bound up and anything above the upper bound down, keeping every row. between() gives a True/False mask, which is for filtering rather than capping." },
      lines: [
        "odd = df[(df['amount'] < 0) | (df['amount'] > 10000)]",
        "print(len(odd), 'impossible values')",
        "df['amount'] = df['amount'].clip(lower=0, upper=10000)",
        "print(df['amount'].min(), df['amount'].max())"],
      decoys: ["df['amount'] = df['amount'].clip(0, 10000, inplace=True)", "odd = df[df['amount'] < 0 | df['amount'] > 10000]"],
      written: {
        prompt: 'Write the code: count the rows below 0 or above 10000, cap the amount column at those bounds, then print the new min and max.',
        solution: "odd = df[(df['amount'] < 0) | (df['amount'] > 10000)]\nprint(len(odd), 'impossible values')\ndf['amount'] = df['amount'].clip(lower=0, upper=10000)\nprint(df['amount'].min(), df['amount'].max())",
        must: ['|', 'clip(lower=0', 'upper=10000', 'len(odd)'] },
      walk: [
        ["odd = df[(df['amount'] < 0) | (df['amount'] > 10000)]", "Pipe for OR, brackets round each half — the same rule as AND."],
        ["print(len(odd), 'impossible values')", "Report it. Negative amounts usually mean refunds recorded in the same column, which is a real finding."],
        ["df['amount'] = df['amount'].clip(lower=0, upper=10000)", "Capping keeps the row and its other columns, which deleting would lose."],
        ["print(df['amount'].min(), df['amount'].max())", "The range is now what you said it was."]] },

    { key: 'danewcol', group: S4, lvl: 1, title: 'Add a computed column',
      ask: 'Add a total column to df holding price times quantity, rounded to 2 decimal places.',
      why: 'The whole-column calculation, with no loop in sight — the move pandas exists for.',
      mcq: {
        q: 'Which line adds the column?',
        correct: "df['total'] = (df['price'] * df['quantity']).round(2)",
        wrong: [
          "df['total'] = df['price'] * df['quantity'].round(2)",
          "df.total = (df['price'] * df['quantity']).round(2)",
          "df['total'] = df.apply(lambda r: r['price'] * r['quantity'], axis=1).round(2)"],
        explain: "Round the RESULT, not the quantity — the brackets decide which. Assigning with a dot creates an attribute rather than a column, and the apply version is correct but far slower for no benefit." },
      lines: [
        "df['total'] = (df['price'] * df['quantity']).round(2)",
        "print(df[['price', 'quantity', 'total']].head())"],
      decoys: ["df.total = df['price'] * df['quantity']", "df['total'] = df['price'] * df['quantity'].round(2)"],
      written: {
        prompt: 'Write the code: add a rounded total column of price times quantity, then show the three columns side by side.',
        solution: "df['total'] = (df['price'] * df['quantity']).round(2)\nprint(df[['price', 'quantity', 'total']].head())",
        must: ["df['total'] =", "df['price'] * df['quantity']", '.round(2)'] },
      walk: [
        ["df['total'] = (df['price'] * df['quantity']).round(2)", "Two columns multiplied row by row, in C, with no loop. The brackets make sure the ROUND applies to the answer."],
        ["print(df[['price', 'quantity', 'total']].head())", "Eyeball five rows of the arithmetic. It takes two seconds and catches a wrong column name instantly."]] },

    { key: 'daratio', group: S4, lvl: 2, title: 'A ratio that survives a zero',
      ask: 'Add a spend_per_visit column to df from spend divided by visits, without infinities where visits is 0.',
      why: 'pandas does not raise on divide-by-zero — it gives you inf, which then poisons every average downstream.',
      mcq: {
        q: 'Which line divides safely?',
        correct: "df['spend_per_visit'] = df['spend'] / df['visits'].replace(0, np.nan)",
        wrong: [
          "df['spend_per_visit'] = df['spend'] / df['visits']",
          "df['spend_per_visit'] = df['spend'] / df['visits'].fillna(0)",
          "df['spend_per_visit'] = df['spend'] // df['visits']"],
        explain: "Turning the zero divisor into NaN makes the answer NaN — honest, and ignored by mean() later. Plain division gives inf, which is not ignored and quietly makes every summary infinite." },
      lines: [
        "df['spend_per_visit'] = df['spend'] / df['visits'].replace(0, np.nan)",
        "print(df['spend_per_visit'].isna().sum(), 'rows had no visits')",
        "print(df['spend_per_visit'].describe())"],
      decoys: ["df['spend_per_visit'] = df['spend'] / df['visits']", "df['spend_per_visit'] = df['spend'] // df['visits']"],
      written: {
        prompt: 'Write the code: divide spend by visits treating 0 visits as missing, print how many rows that affected, and describe the new column.',
        solution: "df['spend_per_visit'] = df['spend'] / df['visits'].replace(0, np.nan)\nprint(df['spend_per_visit'].isna().sum(), 'rows had no visits')\nprint(df['spend_per_visit'].describe())",
        must: ['replace(0, np.nan)', "df['spend'] /", 'isna().sum()'] },
      walk: [
        ["df['spend_per_visit'] = df['spend'] / df['visits'].replace(0, np.nan)", "Replace the divisor's zeros first, and the division takes care of itself."],
        ["print(df['spend_per_visit'].isna().sum(), 'rows had no visits')", "Those rows are a finding too — customers who spent without visiting need explaining."],
        ["print(df['spend_per_visit'].describe())", "A max of inf here is the classic sign that the replace was skipped."]] },

    { key: 'daflag', group: S4, lvl: 1, title: 'A yes/no column',
      ask: 'Add a big_order column to df holding 1 where total is over 100 and 0 otherwise.',
      why: 'A 0/1 flag can be summed (how many), averaged (what share) and grouped — three answers from one column.',
      mcq: {
        q: 'Which line makes the flag?',
        correct: "df['big_order'] = (df['total'] > 100).astype(int)",
        wrong: [
          "df['big_order'] = df['total'] > 100 astype(int)",
          "df['big_order'] = int(df['total'] > 100)",
          "df['big_order'] = df['total'].apply(lambda t: 1 if t > 100 else 0).astype(str)"],
        explain: "The comparison already gives True/False; .astype(int) turns those into 1 and 0. int() on a whole Series raises, and a flag stored as TEXT cannot be summed or averaged." },
      lines: [
        "df['big_order'] = (df['total'] > 100).astype(int)",
        "print(df['big_order'].sum(), 'big orders')",
        "print(round(100 * df['big_order'].mean(), 1), '% of all orders')"],
      decoys: ["df['big_order'] = int(df['total'] > 100)", "df['big_order'] = (df['total'] > 100).astype(str)"],
      written: {
        prompt: 'Write the code: add a 0/1 big_order flag for totals over 100, print how many, then print the share as a percentage to 1 decimal place.',
        solution: "df['big_order'] = (df['total'] > 100).astype(int)\nprint(df['big_order'].sum(), 'big orders')\nprint(round(100 * df['big_order'].mean(), 1), '% of all orders')",
        must: ["(df['total'] > 100)", 'astype(int)', '.sum()', '.mean()'] },
      walk: [
        ["df['big_order'] = (df['total'] > 100).astype(int)", "Brackets round the comparison, then cast. As an integer it behaves like a number everywhere."],
        ["print(df['big_order'].sum(), 'big orders')", "Summing 1s and 0s counts them."],
        ["print(round(100 * df['big_order'].mean(), 1), '% of all orders')", "Averaging 1s and 0s gives the proportion. One column, both answers."]] },

    { key: 'daband', group: S4, lvl: 2, title: 'Put the numbers into bands',
      ask: 'Add an age_band column to df: child under 18, adult 18 to 64, senior 65 and over.',
      why: 'Bands turn a scatter of numbers into a table a person can read — and into a grouping column.',
      mcq: {
        q: 'Which call bands the ages correctly?',
        correct: "pd.cut(df['age'], bins=[0, 18, 65, 120], labels=['child', 'adult', 'senior'], right=False)",
        wrong: [
          "pd.cut(df['age'], bins=[0, 18, 65], labels=['child', 'adult', 'senior'])",
          "pd.qcut(df['age'], 3, labels=['child', 'adult', 'senior'])",
          "pd.cut(df['age'], bins=['child', 'adult', 'senior'])"],
        explain: "There is always one more edge than there are labels, so three bands need four edges. right=False makes 18 an adult rather than the top of the child band. qcut would make three EQUAL-SIZED groups, which is a different question." },
      lines: [
        "edges = [0, 18, 65, 120]",
        "names = ['child', 'adult', 'senior']",
        "df['age_band'] = pd.cut(df['age'], bins=edges, labels=names, right=False)",
        "print(df['age_band'].value_counts())"],
      decoys: ["df['age_band'] = pd.qcut(df['age'], 3, labels=names)", "edges = [18, 65]"],
      written: {
        prompt: 'Write the code: name the four edges and the three labels, cut age into an age_band column with right=False, then count the bands.',
        solution: "edges = [0, 18, 65, 120]\nnames = ['child', 'adult', 'senior']\ndf['age_band'] = pd.cut(df['age'], bins=edges, labels=names, right=False)\nprint(df['age_band'].value_counts())",
        must: ['pd.cut', 'bins=', 'labels=', 'right=False'] },
      walk: [
        ["edges = [0, 18, 65, 120]", "Four edges make three bands. The last edge has to be above the biggest value or those rows come out as NaN."],
        ["names = ['child', 'adult', 'senior']", "One fewer label than edges — the commonest error message pd.cut gives is about exactly this."],
        ["df['age_band'] = pd.cut(df['age'], bins=edges, labels=names, right=False)", "right=False means each band includes its left edge: 18 is the first adult."],
        ["print(df['age_band'].value_counts())", "Check the counts. An empty band usually means the edges do not match the data you actually have."]] },

    { key: 'damap', group: S4, lvl: 1, title: 'Translate the codes',
      ask: 'Turn the region codes N, S, E and W in df into their full names, leaving anything unexpected as unknown.',
      why: 'Mapping through a dictionary is faster than apply and, more importantly, tells you what it could not translate.',
      mcq: {
        q: 'Which line translates the codes and handles anything unexpected?',
        correct: "df['region_name'] = df['region'].map(names).fillna('unknown')",
        wrong: [
          "df['region_name'] = df['region'].replace(names).fillna('unknown')",
          "df['region_name'] = df['region'].apply(names)",
          "df['region_name'] = names[df['region']]"],
        explain: "map looks each value up in the dictionary and gives NaN for anything missing — which fillna then labels. replace would leave unknown codes UNCHANGED, so a typo would slip through looking like real data." },
      lines: [
        "names = {'N': 'North', 'S': 'South', 'E': 'East', 'W': 'West'}",
        "df['region_name'] = df['region'].map(names)",
        "print(df.loc[df['region_name'].isna(), 'region'].unique())",
        "df['region_name'] = df['region_name'].fillna('unknown')"],
      decoys: ["df['region_name'] = df['region'].replace(names)", "df['region_name'] = names[df['region']]"],
      written: {
        prompt: 'Write the code: build the code-to-name dictionary, map the region column, print any codes that failed to translate, then fill those with unknown.',
        solution: "names = {'N': 'North', 'S': 'South', 'E': 'East', 'W': 'West'}\ndf['region_name'] = df['region'].map(names)\nprint(df.loc[df['region_name'].isna(), 'region'].unique())\ndf['region_name'] = df['region_name'].fillna('unknown')",
        must: ['.map(names)', "'N': 'North'", 'isna()', "fillna('unknown')"] },
      walk: [
        ["names = {'N': 'North', 'S': 'South', 'E': 'East', 'W': 'West'}", "The lookup lives in one obvious place, where the next person can correct it."],
        ["df['region_name'] = df['region'].map(names)", "Anything not in the dictionary becomes NaN rather than being silently kept."],
        ["print(df.loc[df['region_name'].isna(), 'region'].unique())", "This line is the reason to use map: it shows you the codes nobody told you about."],
        ["df['region_name'] = df['region_name'].fillna('unknown')", "Now, and only now, label the leftovers."]] },

    { key: 'dapct', group: S4, lvl: 2, title: 'Share of the total',
      ask: 'Add a share column to df giving each row\'s amount as a percentage of the whole file, to 2 decimal places.',
      why: 'Percentages of a total are what turns raw numbers into a sentence someone will read.',
      mcq: {
        q: 'Which line adds the share column?',
        correct: "df['share'] = (100 * df['amount'] / df['amount'].sum()).round(2)",
        wrong: [
          "df['share'] = (100 * df['amount'] / df['amount']).round(2)",
          "df['share'] = (100 * df['amount'].sum() / df['amount']).round(2)",
          "df['share'] = df['amount'].pct_change().round(2)"],
        explain: "Each row's amount divided by the TOTAL of the column. pct_change is the change from the previous row — a completely different measure that people reach for by mistake." },
      lines: [
        "total = df['amount'].sum()",
        "df['share'] = (100 * df['amount'] / total).round(2)",
        "print(df['share'].sum())"],
      decoys: ["df['share'] = df['amount'].pct_change()", "total = df['amount'].mean()"],
      written: {
        prompt: 'Write the code: take the column total, add a rounded percentage share column, then print the sum of the shares as a check.',
        solution: "total = df['amount'].sum()\ndf['share'] = (100 * df['amount'] / total).round(2)\nprint(df['share'].sum())",
        must: ["df['amount'].sum()", "df['share']", '100 *', 'round(2)'] },
      walk: [
        ["total = df['amount'].sum()", "Work the total out once rather than inside every row."],
        ["df['share'] = (100 * df['amount'] / total).round(2)", "Multiply by 100 before rounding, or two decimal places would throw away everything interesting."],
        ["print(df['share'].sum())", "It should come to about 100. Anything else means missing values, or a filter you forgot you applied."]] }
  );
})();
