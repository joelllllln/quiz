/* Better questions for the analytics tasks, stages 01–05.
   Two changes per task: the wrong answers are now mistakes people actually make
   (not invented methods you could rule out without knowing pandas), and each one
   carries its own explanation, so picking it tells you what it would really do.
   Also adds `avoid` — wrong turns caught at the write-it level even when every
   required piece is present. Loads after the task files. */
(function () {
  var M = {

    daload: {
      wrong: [
        "df = pd.read_csv(sales.csv)\ndf.head()",
        "df = pd.read_csv('sales.csv')\nhead(df)",
        "df = pd.read_csv('sales.csv')\ndf.head"],
      why: [
        "Without quotes, Python reads sales.csv as a variable name and raises NameError before pandas is even involved. File paths are text.",
        "head is a METHOD on the frame — df.head() — not a standalone function. There is no bare head().",
        "df.head with no brackets prints a description of the method rather than running it. Easy to miss, because it does not raise."],
      avoid: [["pd.read_csv(sales", "The file name needs quotes: pd.read_csv('sales.csv'). Without them Python looks for a variable called sales."]] },

    dahead: {
      wrong: [
        "df.head(3)\ndf.tail(-2)",
        "df.head(3)\ndf[-2:]",
        "df.head[3]\ndf.tail[2]"],
      why: [
        "tail(-2) does not mean 'the last two' — a negative count means 'everything except the first two', so you get almost the whole frame.",
        "df[-2:] does give the last two rows, but as a SLICE rather than through tail — it works, yet it is the one that breaks the moment the index is not a plain range.",
        "Square brackets on a method are a TypeError. Methods are called with round brackets."] },

    dashape: {
      wrong: [
        "print(df.size)\nprint(df.columns)\nprint(df.dtypes)",
        "print(df.shape())\nprint(df.columns())\nprint(df.dtypes())",
        "print(len(df))\nprint(df.columns)\nprint(df.info())"],
      why: [
        "df.size is rows TIMES columns — a single number like 4000, not the (rows, columns) pair you wanted.",
        "shape, columns and dtypes are attributes, not methods: the brackets raise 'tuple object is not callable'.",
        "len(df) gives the row count but says nothing about the columns, and info() PRINTS rather than returning — so printing it shows None underneath."] },

    dainfo: {
      wrong: [
        "df.info()\ndf.describe(include='all')",
        "df.info\ndf.describe",
        "df.describe()\ndf.info()"],
      why: [
        "include='all' mixes text and number columns into one table with lots of NaN — readable in a pinch, but it is not the plain numeric summary asked for.",
        "No brackets, so neither one runs: you get the method objects printed instead.",
        "Both lines are right, but the order is back to front — you want the structure before the statistics, or you are reading numbers without knowing what is missing."] },

    damissing: {
      wrong: [
        "df.isna().count().sort_values(ascending=False)",
        "df.isna().sum(axis=1).sort_values(ascending=False)",
        "df.notna().sum().sort_values(ascending=False)"],
      why: [
        "count() counts every row regardless of what is in it, so every column comes back with the same number — the row count.",
        "axis=1 sums ACROSS each row, giving one number per row rather than per column. Useful for 'how incomplete is this record', not for this question.",
        "notna() counts what is PRESENT. Sorted descending, the fullest columns come first — the exact opposite of what you asked for."] },

    davalues: {
      wrong: [
        "df['city'].value_counts()",
        "df['city'].value_counts(normalize=True)",
        "df.groupby('city').size()"],
      why: [
        "This is the right method, but it quietly leaves the missing values out — and the missing ones are exactly what you asked to see. Add dropna=False.",
        "normalize gives proportions rather than counts, and it still drops the missing values.",
        "groupby().size() counts per city but also drops the rows with no city, so the totals will not add up to len(df)."] },

    daunique: {
      wrong: [
        "df['customer_id'].unique()",
        "df['customer_id'].count()",
        "len(df['customer_id'].value_counts())"],
      why: [
        "unique() gives you the VALUES themselves — an array of every id — not how many there are. Wrap it in len() and it works.",
        "count() counts the non-missing rows, repeats included. On a table with one row per order that is the order count, not the customer count.",
        "This one is actually correct — value_counts has one row per distinct value — but it builds the whole tally to get a length nunique() gives directly."] },

    dacols: {
      wrong: [
        "small = df['customer', 'amount', 'city']",
        "small = df[['customer'], ['amount'], ['city']]",
        "small = df.loc['customer', 'amount', 'city']"],
      why: [
        "One set of brackets with commas is read as a single tuple key, and pandas raises KeyError. The names have to be in a list.",
        "Three separate lists is a syntax error in the brackets — it is ONE list of names, not a list per column.",
        ".loc takes rows first and then columns, so this asks for a row labelled 'customer'. It raises."] },

    dafilter: {
      wrong: [
        "big = df['amount'] > 100",
        "big = df[df['amount'] > 100].copy",
        "big = df.query('amount > 100')"],
      why: [
        "This is only the MASK — a column of True and False, one per row. It is the ingredient, not the filtered frame.",
        "The .copy without brackets never runs, so big holds the method rather than a frame. Any use of it afterwards is confusing.",
        "This works and is perfectly good style. It is not wrong — just a different spelling of the same filter, and the bracket form is the one to know first."] },

    dafilter2: {
      wrong: [
        "df[df['amount'] > 100 and df['city'] == 'London']",
        "df[df['amount'] > 100 & df['city'] == 'London']",
        "df[df['amount'] > 100][df['city'] == 'London']"],
      why: [
        "`and` asks for one true-or-false answer from a whole column, so pandas raises 'The truth value of a Series is ambiguous'. Use & for row-by-row and.",
        "Right operator, missing brackets: & binds tighter than >, so Python evaluates 100 & df['city'] first and the whole thing falls over.",
        "Filtering twice looks reasonable but the second mask was built from the ORIGINAL frame, so it no longer lines up with the rows you kept — pandas either raises or silently misaligns."],
      avoid: [[" and df[", "Use & rather than `and` between two column conditions — `and` raises on a Series."]] },

    daisin: {
      wrong: [
        "north = df[df['city'] in cities]\nrest = df[df['city'] not in cities]",
        "north = df[df['city'].isin(cities)]\nrest = df[not df['city'].isin(cities)]",
        "north = df[df['city'].str.contains('|'.join(cities))]\nrest = df[~df['city'].str.contains('|'.join(cities))]"],
      why: [
        "`in` on a Series asks a single yes/no question about the whole column, so it raises. isin() is the row-by-row version.",
        "The first line is right; `not` on a Series raises the same 'truth value is ambiguous' error. The elementwise not is ~.",
        "contains does a SUBSTRING match, so a city called 'New London' would be counted as London — and missing values raise unless you pass na=False."] },

    daloc: {
      wrong: [
        "df[df['amount'] > 100][['customer', 'amount']]",
        "df.iloc[df['amount'] > 100, ['customer', 'amount']]",
        "df.loc[df['amount'] > 100]['customer', 'amount']"],
      why: [
        "This gives the right answer, but it builds an intermediate frame first — and if you later assign to it you get the SettingWithCopyWarning. One .loc avoids both.",
        ".iloc is by POSITION: it cannot take a boolean mask with column names, and raises.",
        "The .loc part is fine, then the second bracket passes a tuple as a column key and raises KeyError. Put the columns inside the same .loc, after a comma."] },

    dasort: {
      wrong: [
        "df.sort_values('amount')\ndf.nlargest(10, 'amount')",
        "df.sort_values('amount', reverse=True)\ndf.head(10)",
        "df.sort_values(by='amount', ascending=False)\ndf.tail(10)"],
      why: [
        "The first line sorts SMALLEST first — the default. The top-ten line is right, but the sort is the wrong way round.",
        "reverse=True is the argument sorted() takes for a plain list; pandas calls it ascending, and this raises TypeError.",
        "The sort is right, but tail(10) then takes the ten SMALLEST — the bottom of a descending sort. head(10) is the top."] },

    dacount: {
      wrong: [
        "(df['amount'] > 100).count()\n(df['amount'] > 100).mean()",
        "len(df[df['amount'] > 100])\nlen(df[df['amount'] > 100]) / len(df) * 100",
        "df['amount'].sum() > 100\ndf['amount'].mean() > 100"],
      why: [
        "count() counts every row in the mask — True and False alike — so it always gives the length of the frame. sum() counts only the Trues.",
        "Both lines are correct, and the second even gives a percentage. It just builds a whole filtered frame twice to count rows a mask could count directly.",
        "These compare the TOTAL and the AVERAGE against 100 — two single true/false answers about the column, not a count of the rows above it."] },

    daclean_names: {
      wrong: [
        "df.columns = df.columns.strip().lower().str.replace(' ', '_')",
        "df.columns = [c.strip().lower().replace(' ', '_') for c in df.columns]",
        "df = df.rename(columns={' Order Amount ': 'order_amount'})"],
      why: [
        "df.columns is an Index, not a string: .strip() and .lower() on it raise AttributeError. Every text method needs .str in front of it.",
        "This works perfectly — a plain comprehension over the names. It is the same answer written without the .str accessor, and it is fine to prefer it.",
        "Renaming one column by hand fixes one column. Fine for a one-off, hopeless for a file with forty."] },

    danull_drop: {
      wrong: [
        "clean = df.dropna()",
        "clean = df[df['amount'] != None]",
        "clean = df.dropna(subset='amount')"],
      why: [
        "A bare dropna() removes any row with a gap in ANY column. On a wide table that can be most of the file, and you would never know from the code.",
        "Nothing is ever == or != to None in pandas, so this keeps every row. Missing values are tested with isna() and notna().",
        "This actually works in current pandas — subset accepts a single name as well as a list — but the list form is the one that survives when you add a second column."] },

    danull_fill: {
      wrong: [
        "df['amount'] = df['amount'].fillna(df['amount'].mean())\ndf['city'] = df['city'].fillna('unknown')",
        "df['amount'].fillna(df['amount'].median())\ndf['city'].fillna('unknown')",
        "df['amount'] = df['amount'].fillna(0)\ndf['city'] = df['city'].fillna(df['city'].mode()[0])"],
      why: [
        "The mean is dragged upwards by a handful of huge orders, so it fills the gaps with a number bigger than most real rows. The median resists that.",
        "fillna returns a NEW column and changes nothing in place — without assigning back, both lines do precisely nothing.",
        "Filling amounts with 0 invents a fact (that nothing was spent), and filling the city with the most common city invents data that will then show up in your groupby."],
      avoid: [["fillna(df['amount'].mean())", "Prefer the median for a skewed money column — the mean is pulled up by the big orders."]] },

    dadupes: {
      wrong: [
        "df = df.drop_duplicates(subset=['order_id'], keep='last')",
        "df = df.sort_values('date').drop_duplicates(keep='last')",
        "df = df.groupby('order_id').last()"],
      why: [
        "Without the sort, 'last' means the last row as the file happened to be ordered — which is not necessarily the newest.",
        "Without subset, only rows identical in EVERY column count as duplicates, so a corrected version of the same order survives alongside the original.",
        "groupby().last() takes the last non-missing value of each column separately, so it can assemble a row that never existed in the data."] },

    datypes: {
      wrong: [
        "df['amount'] = df['amount'].astype(float)",
        "df['amount'] = pd.to_numeric(df['amount'], errors='ignore')",
        "df['amount'] = df['amount'].str.replace('£', '').astype(float)"],
      why: [
        "astype raises on the first value it cannot convert and stops, so one stray '£12' takes the whole script down with no report of how many were bad.",
        "errors='ignore' swallows the failure and leaves the entire column as text — the worst outcome, because everything downstream looks fine until it silently does nothing.",
        "Stripping the pound sign is a good instinct, but it only handles that one problem and still raises on 'n/a'. Coerce first, then look at what failed."] },

    datext: {
      wrong: [
        "df['city'] = df['city'].str.lower()",
        "df['city'] = df['city'].strip().lower()",
        "df['city'] = df['city'].str.strip().str.title()"],
      why: [
        "Lower-casing alone leaves 'london ' and 'london' as two different groups — the trailing space is invisible and just as damaging.",
        "Without .str these are string methods called on a Series, which raises AttributeError.",
        "Title case is a display choice, not a standardisation: 'London' and 'LONDON' both become 'London', but so does 'LoNDon ' only after the strip — and you have now changed the values people will read."] },

    daoutlier: {
      wrong: [
        "df = df[(df['amount'] >= 0) & (df['amount'] <= 10000)]",
        "df['amount'] = df['amount'].clip(0, 10000, inplace=True)",
        "df['amount'] = df['amount'].where(df['amount'].between(0, 10000))"],
      why: [
        "This DELETES the offending rows, losing everything else they contained. Capping keeps the row and its other columns, which is usually what you want.",
        "clip has no inplace argument here, and assigning the result of an inplace call would set the column to None.",
        "where() blanks the offending values into NaN rather than pulling them to the bounds. A defensible choice — but it is 'make them missing', not 'cap them'."] },

    danewcol: {
      wrong: [
        "df['total'] = df['price'] * df['quantity'].round(2)",
        "df.total = (df['price'] * df['quantity']).round(2)",
        "df['total'] = round(df['price'] * df['quantity'], 2)"],
      why: [
        "The brackets put the rounding on QUANTITY before the multiplication, so the total is not rounded at all.",
        "Assigning with a dot makes an attribute, not a column — df['total'] raises KeyError afterwards, and pandas warns you about it.",
        "Python's built-in round on a Series raises TypeError. The Series has its own .round() method."] },

    daratio: {
      wrong: [
        "df['spend_per_visit'] = df['spend'] / df['visits']",
        "df['spend_per_visit'] = df['spend'] / df['visits'].fillna(1)",
        "df['spend_per_visit'] = df[df['visits'] > 0]['spend'] / df['visits']"],
      why: [
        "pandas does not raise on divide-by-zero: it produces inf, which then makes every mean, sum and chart that touches the column meaningless.",
        "fillna only touches MISSING visits — a recorded 0 is still a zero divisor, so the infinities remain.",
        "Filtering one side but not the other leaves two differently-shaped objects; pandas aligns them on the index and fills the gaps with NaN in a way that is very hard to spot."],
      avoid: [["df['visits'].fillna(", "fillna only fixes MISSING visits — a recorded 0 still divides to infinity. Use .replace(0, np.nan) on the divisor."]] },

    daflag: {
      wrong: [
        "df['big_order'] = df['total'] > 100",
        "df['big_order'] = (df['total'] > 100).astype(str)",
        "df['big_order'] = df['total'].apply(lambda t: 1 if t > 100 else 0)"],
      why: [
        "True/False works for filtering and even sums correctly, but as soon as it is written to CSV or read by another tool you get the words True and False instead of 1 and 0.",
        "As text it can no longer be summed or averaged — the two things a flag exists for.",
        "This gives exactly the right answer, just row by row in Python. On a large frame the vectorised comparison is many times faster for the same result."] },

    daband: {
      wrong: [
        "pd.cut(df['age'], bins=[0, 18, 65, 120], labels=['child', 'adult', 'senior'])",
        "pd.cut(df['age'], bins=[0, 18, 65], labels=['child', 'adult', 'senior'])",
        "pd.qcut(df['age'], 3, labels=['child', 'adult', 'senior'])"],
      why: [
        "Without right=False the bands include their RIGHT edge, so an 18-year-old is filed as a child and a 65-year-old as an adult — off by one at every boundary.",
        "Three labels need four edges. This raises: 'Bin labels must be one fewer than the number of bin edges'.",
        "qcut makes three groups of EQUAL SIZE, so the cut points depend on your data rather than on what child, adult and senior mean."] },

    damap: {
      wrong: [
        "df['region_name'] = df['region'].replace(names)",
        "df['region_name'] = df['region'].map(names)",
        "df['region_name'] = df['region'].apply(lambda r: names[r])"],
      why: [
        "replace leaves anything not in the dictionary UNCHANGED, so a typo like 'n ' passes through looking like a real value.",
        "This is the right first step — but on its own it leaves NaN wherever the code was unknown. The question also asked for those to be labelled.",
        "Indexing the dictionary directly raises KeyError on the first unexpected code, taking the whole script down rather than reporting the problem."] },

    dapct: {
      wrong: [
        "df['share'] = (100 * df['amount'] / df['amount'].mean()).round(2)",
        "df['share'] = df['amount'].pct_change().round(2)",
        "df['share'] = (100 * df['amount'] / len(df)).round(2)"],
      why: [
        "Dividing by the mean gives 'how many average orders is this' — a real measure, but not a share, and the column will not add up to 100.",
        "pct_change is the change from the PREVIOUS ROW, which depends entirely on the order the rows happen to be in.",
        "Dividing by the row count gives an amount per row, not a proportion of the total."] },

    dagroup: {
      wrong: [
        "df.groupby('region').sum()['amount'].sort_values(ascending=False)",
        "df.groupby('region')['amount'].sum().sort_values()",
        "df.groupby('amount')['region'].sum().sort_values(ascending=False)"],
      why: [
        "This gives the right numbers, but it sums EVERY numeric column first and throws all but one away — slow on a wide table, and it raises on text columns in older pandas.",
        "Right totals, wrong order: sort_values() with no argument goes smallest first.",
        "Grouping by amount makes one group per distinct amount and then tries to add up text. It raises."] },

    dagroupmulti: {
      wrong: [
        "df.groupby('region')['amount'].agg('count', 'sum', 'mean')",
        "df.groupby('region').agg({'amount': ['count', 'sum', 'mean']})",
        "df.groupby('region')['amount'].describe()"],
      why: [
        "Passing them as separate arguments is a TypeError — agg takes ONE list of what you want.",
        "This works and gives the same three numbers, but it produces two-level column names you then have to flatten before anything else is readable.",
        "describe() gives eight statistics including quartiles, when three were asked for. Not wrong, just not an answer anybody wants to read."] },

    dagroupcount: {
      wrong: [
        "df.groupby('region').count().reset_index()",
        "df['region'].value_counts().reset_index()",
        "df.groupby('region').size()"],
      why: [
        "count() gives one count PER COLUMN, so you get a wide table of nearly identical numbers instead of one count per region.",
        "This is a reasonable answer — but it drops rows whose region is missing, and the column names it produces have changed between pandas versions.",
        "The counts are right, but they come back as a Series with the regions as its index, so it cannot be charted or joined until you reset_index."] }
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
