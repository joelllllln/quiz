/* Step-by-step ladders, 8 — dates, joins, missing values, NumPy and a first chart,
   all at the same small step size. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  function ladder(group, prefix, rows) {
    rows.forEach(function (r, i) {
      var card = { id: prefix + '-' + (i + 1), group: group, lvl: 1, ask: r[0], a: r[1] };
      if (r[2]) card.note = r[2];
      if (r[3]) card.alts = r[3];
      window.SNIPPETS.push(card);
    });
  }

  ladder('Step by step · tidying a column', 'sp-pt', [
    ['Fill the missing values in the city column with the word unknown', "df['city'] = df['city'].fillna('unknown')"],
    ['Fill the missing values in the amount column with its average', "df['amount'] = df['amount'].fillna(df['amount'].mean())"],
    ['Fill the missing values in the amount column with its middle value', "df['amount'] = df['amount'].fillna(df['amount'].median())", 'The median is the safer filler when a few huge values would drag the average up.'],
    ['Fill the missing values in the score column with 0', "df['score'] = df['score'].fillna(0)"],
    ['Carry the last value forward into the gaps in the price column', "df['price'] = df['price'].ffill()"],
    ['Swap every dash in the code column for a space', "df['code'] = df['code'].str.replace('-', ' ', regex=False)"],
    ['Cut the whitespace off both ends of every value in the name column', "df['name'] = df['name'].str.strip()"],
    ['Make the first letter of every name in the name column a capital', "df['name'] = df['name'].str.title()"],
    ['Split the full_name column on the space into a list per row', "df['full_name'].str.split(' ')"],
    ['Get the first 3 characters of every value in the postcode column', "df['postcode'].str[:3]"],
    ['Turn the amount column into numbers, making anything odd missing', "df['amount'] = pd.to_numeric(df['amount'], errors='coerce')", "errors='coerce' turns the rubbish into NaN instead of raising."],
    ['Make the whole of the city column lower case and trimmed, in one line', "df['city'] = df['city'].str.lower().str.strip()", 'Methods chain left to right.'],
    ['Replace every 0 in the price column with a missing value', "df['price'] = df['price'].replace(0, np.nan)"],
    ['Swap the values yes and no in the flag column for 1 and 0', "df['flag'] = df['flag'].map({'yes': 1, 'no': 0})", 'map translates through a dictionary.'],
    ['Make a new column band saying high when score is over 50, else low', "df['band'] = np.where(df['score'] > 50, 'high', 'low')", 'The whole-column version of if/else.']
  ]);

  ladder('Step by step · dates in a table', 'sp-pdt', [
    ['Convert the date column from text into real dates', "df['date'] = pd.to_datetime(df['date'])", 'Until you do this, a date is just text and cannot be sorted properly.'],
    ['Read sales.csv treating the date column as dates straight away', "df = pd.read_csv('sales.csv', parse_dates=['date'])"],
    ['Get the year out of the date column', "df['date'].dt.year", 'Date parts live behind .dt, the way text methods live behind .str'],
    ['Get the month number out of the date column', "df['date'].dt.month"],
    ['Get the day of the month out of the date column', "df['date'].dt.day"],
    ['Get the day of the week out of the date column, as a number', "df['date'].dt.dayofweek", 'Monday is 0, Sunday is 6.'],
    ['Get the name of the day out of the date column', "df['date'].dt.day_name()"],
    ['Add a year column to df from the date column', "df['year'] = df['date'].dt.year"],
    ['Add a month column to df from the date column', "df['month'] = df['date'].dt.month"],
    ['Keep only the rows dated 2024 or later', "df[df['date'] >= '2024-01-01']"],
    ['Keep only the rows dated in 2023', "df[df['date'].dt.year == 2023]"],
    ['Put df in date order, oldest first', "df.sort_values('date')"],
    ['Put df in date order, newest first', "df.sort_values('date', ascending=False)"],
    ['Get the earliest date in df', "df['date'].min()"],
    ['Get the latest date in df', "df['date'].max()"],
    ['Add up amount for each year', "df.groupby(df['date'].dt.year)['amount'].sum()"],
    ['Add up amount for each month name', "df.groupby(df['date'].dt.month)['amount'].sum()"],
    ['Work out how many days each row is after the first date', "(df['date'] - df['date'].min()).dt.days"]
  ]);

  ladder('Step by step · two tables', 'sp-pj', [
    ['Join orders onto customers where both have customer_id', "orders.merge(customers, on='customer_id')", 'merge is a join. on= names the column they share.'],
    ['Join orders onto customers keeping every order, matched or not', "orders.merge(customers, on='customer_id', how='left')", 'A left join keeps everything on the left and fills the gaps with NaN.'],
    ['Join orders onto products where both have product_id', "orders.merge(products, on='product_id', how='left')"],
    ['Join two frames on differently named id columns', "a.merge(b, left_on='cust_id', right_on='id', how='left')"],
    ['Stack the frames jan and feb on top of each other', 'pd.concat([jan, feb], ignore_index=True)', 'concat stacks; merge matches. Two different jobs.'],
    ['Stack the list of frames in frames into one', 'pd.concat(frames, ignore_index=True)'],
    ['Check how many rows a frame had before and after a join', 'before = len(orders)\nafter = len(merged)', 'A join that multiplies rows is the most common silent bug in data work.'],
    ['Find the rows of merged where the join found no match on name', "merged[merged['name'].isna()]"],
    ['Join and mark which side each row came from', "orders.merge(customers, on='customer_id', how='left', indicator=True)"],
    ['Count how many customer_ids in orders are missing from customers', "(~orders['customer_id'].isin(customers['customer_id'])).sum()"]
  ]);

  ladder('Step by step · arrays', 'sp-np', [
    ['Import numpy under its usual nickname', 'import numpy as np'],
    ['Make an array called a holding 1, 2 and 3', 'a = np.array([1, 2, 3])'],
    ['Make an array of ten zeros with numpy', 'np.zeros(10)'],
    ['Make an array of five ones', 'np.ones(5)'],
    ['Make an array counting 0 up to 9', 'np.arange(10)'],
    ['Make an array of the numbers 1 to 10', 'np.arange(1, 11)'],
    ['Double every number in the array a', 'a * 2', 'No loop needed: the operation happens to the whole array at once.'],
    ['Add 10 to every number in the array a', 'a + 10'],
    ['Square every number in the array a', 'a ** 2'],
    ['Add up the numbers in the array a', 'a.sum()'],
    ['Get the average of the array a', 'a.mean()'],
    ['Get the biggest number in the array a', 'a.max()'],
    ['Get the smallest number in the array a', 'a.min()'],
    ['Get the spread of a as a standard deviation', 'a.std()'],
    ['See how many items the array a holds', 'a.shape'],
    ['Keep only the numbers in a that are above 2', 'a[a > 2]', 'The same mask idea that pandas uses to filter rows.'],
    ['Count how many numbers in a are above 2', '(a > 2).sum()'],
    ['Get the position of the biggest number in a', 'a.argmax()'],
    ['Turn the list nums into an array', 'np.array(nums)'],
    ['Turn the array a back into a plain list', 'a.tolist()']
  ]);

  ladder('Step by step · a first chart', 'sp-pl', [
    ['Import the plotting library under its usual nickname', 'import matplotlib.pyplot as plt'],
    ['Draw a line chart of the numbers in nums', 'plt.plot(nums)'],
    ['Draw a line chart with x along the bottom and y up the side', 'plt.plot(x, y)'],
    ['Draw a bar chart of heights against labels', 'plt.bar(labels, heights)'],
    ['Draw a histogram of the numbers in nums', 'plt.hist(nums)'],
    ['Draw a scatter plot of the points x and y', 'plt.scatter(x, y)'],
    ['Put the title Sales on the chart', "plt.title('Sales')"],
    ['Label the bottom of the chart Month', "plt.xlabel('Month')"],
    ['Label the side of the chart Amount', "plt.ylabel('Amount')"],
    ['Show the chart on the screen', 'plt.show()'],
    ['Save the chart to the file chart.png', "plt.savefig('chart.png')"],
    ['Draw a line chart straight from the amount column of df', "df['amount'].plot()"],
    ['Draw a bar chart of the city counts in df', "df['city'].value_counts().plot(kind='bar')"],
    ['Draw a histogram of the amount column of df', "df['amount'].plot(kind='hist')"],
    ['Draw the total amount per city as a bar chart', "df.groupby('city')['amount'].sum().plot(kind='bar')"]
  ]);
})();
