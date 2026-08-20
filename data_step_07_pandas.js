/* Step-by-step ladders, 7 — pandas from a standing start. Same line, new column,
   new condition, new frame: nothing new is introduced until the last one is automatic. */
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

  ladder('Step by step · first look at a table', 'sp-pd', [
    ['Import pandas under its usual nickname', 'import pandas as pd'],
    ['Read the file sales.csv into a frame called df', "df = pd.read_csv('sales.csv')"],
    ['Read the file customers.csv into a frame called customers', "customers = pd.read_csv('customers.csv')"],
    ['Read the Excel file sales.xlsx into df', "df = pd.read_excel('sales.xlsx')"],
    ['Look at the first five rows of df', 'df.head()', 'The first thing you type, every single time.'],
    ['Look at the first ten rows of df', 'df.head(10)'],
    ['Look at the first three rows of df', 'df.head(3)'],
    ['Look at the LAST five rows of df', 'df.tail()'],
    ['Look at the last two rows of df', 'df.tail(2)'],
    ['See how many rows and columns df has', 'df.shape', 'Gives back a pair: rows first, then columns.'],
    ['Get just the number of rows in df, out of the shape', 'df.shape[0]'],
    ['Get just the number of columns in df', 'df.shape[1]'],
    ['Count the rows of df with len', 'len(df)'],
    ['See the column names of df', 'df.columns'],
    ['Get the column names of df as a plain list', 'list(df.columns)'],
    ['See the type of each column of df, and how much is missing', 'df.info()'],
    ['See the min, max and average of every number column of df', 'df.describe()'],
    ['See the type of each column of df on its own', 'df.dtypes'],
    ['Count how many values are missing in each column of df', 'df.isna().sum()', 'isna() marks each cell true or false; sum() counts the trues per column.'],
    ['Count the missing values in the amount column only', "df['amount'].isna().sum()"],
    ['See what values the city column takes, and how often', "df['city'].value_counts()"],
    ['See the city counts including the missing ones', "df['city'].value_counts(dropna=False)", 'Without dropna=False, the missing values are quietly left out.'],
    ['Count how many DIFFERENT cities appear in df', "df['city'].nunique()"],
    ['List the different cities in df', "df['city'].unique()"],
    ['Take a random 5 rows out of df to look at', 'df.sample(5)'],
    ['Save df to the file out.csv without the index', "df.to_csv('out.csv', index=False)", 'index=False stops an unnamed extra column appearing in the file.']
  ]);

  ladder('Step by step · one column at a time', 'sp-pc', [
    ['Get the amount column out of df', "df['amount']"],
    ['Get the city column out of df', "df['city']"],
    ['Get the amount and city columns together', "df[['amount', 'city']]", 'Two sets of brackets: the inner one is a LIST of names.'],
    ['Add up the amount column', "df['amount'].sum()"],
    ['Get the average of the amount column', "df['amount'].mean()"],
    ['Get the middle value of the amount column', "df['amount'].median()"],
    ['Get the biggest value in the amount column', "df['amount'].max()"],
    ['Get the smallest value in the amount column', "df['amount'].min()"],
    ['Count the non-missing values in the amount column', "df['amount'].count()"],
    ['Get the spread of the amount column as a standard deviation', "df['amount'].std()"],
    ['Get the min, max and average of the amount column in one go', "df['amount'].describe()"],
    ['Round the amount column to 2 decimal places', "df['amount'].round(2)"],
    ['Add up the quantity column', "df['quantity'].sum()", 'Same method, different column. That is all that changed.'],
    ['Get the average of the price column', "df['price'].mean()"],
    ['Get the biggest value in the score column', "df['score'].max()"],
    ['Add a new column called total holding price times quantity', "df['total'] = df['price'] * df['quantity']"],
    ['Add a new column called with_vat holding amount times 1.2', "df['with_vat'] = df['amount'] * 1.2"],
    ['Add a new column called half holding amount divided by 2', "df['half'] = df['amount'] / 2"],
    ['Add a new column called flag holding the number 1 for every row', "df['flag'] = 1"],
    ['Make the city column all upper case', "df['city'] = df['city'].str.upper()", 'Text methods on a column live behind .str'],
    ['Make the city column all lower case', "df['city'] = df['city'].str.lower()"],
    ['Trim the spaces off both ends of every value in the city column', "df['city'] = df['city'].str.strip()"],
    ['Get the length of each value in the city column', "df['city'].str.len()"],
    ['Rename the column amt to amount', "df = df.rename(columns={'amt': 'amount'})"],
    ['Drop the column notes from df', "df = df.drop(columns=['notes'])"],
    ['Drop the columns notes and temp from df', "df = df.drop(columns=['notes', 'temp'])"],
    ['Turn the amount column into whole numbers', "df['amount'] = df['amount'].astype(int)"],
    ['Turn the id column into text', "df['id'] = df['id'].astype(str)"],
    ['Turn the date column into real dates', "df['date'] = pd.to_datetime(df['date'])"],
    ['Fill the missing values in the amount column with 0', "df['amount'] = df['amount'].fillna(0)"]
  ]);

  ladder('Step by step · picking rows', 'sp-pr2', [
    ['Keep only the rows of df where amount is over 100', "df[df['amount'] > 100]", 'The condition inside the brackets is true or false for every row.'],
    ['Keep only the rows where amount is 100 or more', "df[df['amount'] >= 100]"],
    ['Keep only the rows where amount is under 50', "df[df['amount'] < 50]"],
    ['Keep only the rows where quantity is above 0', "df[df['quantity'] > 0]"],
    ['Keep only the rows where city is exactly London', "df[df['city'] == 'London']", 'Two equals signs, and the text in quotes.'],
    ['Keep only the rows where city is NOT London', "df[df['city'] != 'London']"],
    ['Keep only the rows where city is London or Leeds', "df[df['city'].isin(['London', 'Leeds'])]", 'isin takes a list — far tidier than two conditions joined with an or.'],
    ['Keep only the rows where city is NOT London or Leeds', "df[~df['city'].isin(['London', 'Leeds'])]", 'The squiggle means "not" for a whole column at once.'],
    ['Keep the rows where amount is over 100 AND city is London', "df[(df['amount'] > 100) & (df['city'] == 'London')]", 'Ampersand for and, and brackets round each half — both are required.'],
    ['Keep the rows where amount is over 100 OR city is London', "df[(df['amount'] > 100) | (df['city'] == 'London')]"],
    ['Keep the rows where amount is between 50 and 100', "df[df['amount'].between(50, 100)]", 'between includes both ends.'],
    ['Keep the rows where amount is missing', "df[df['amount'].isna()]"],
    ['Keep the rows where amount is NOT missing', "df[df['amount'].notna()]"],
    ['Keep the rows where city contains the word don', "df[df['city'].str.contains('don', na=False)]", 'na=False stops missing values causing an error.'],
    ['Keep the rows where city starts with the letter L', "df[df['city'].str.startswith('L', na=False)]"],
    ['Count how many rows have amount over 100', "(df['amount'] > 100).sum()", 'True counts as 1, so summing the trues counts the rows.'],
    ['Work out what fraction of rows have amount over 100', "(df['amount'] > 100).mean()", 'The average of a column of trues is the proportion — multiply by 100 for a percentage.'],
    ['Keep the rows where amount is over 100, and only the city and amount columns', "df.loc[df['amount'] > 100, ['city', 'amount']]", 'One .loc does rows and columns together.'],
    ['Get the very first row of df, by its position', 'df.iloc[0]'],
    ['Get the first three rows of df by position', 'df.iloc[:3]'],
    ['Get the value in the first row of the amount column', "df['amount'].iloc[0]"],
    ['Put df in order of amount, smallest first', "df.sort_values('amount')"],
    ['Put df in order of amount, biggest first', "df.sort_values('amount', ascending=False)"],
    ['Sort df by city and then by amount', "df.sort_values(['city', 'amount'])"],
    ['Get the 5 rows of df with the biggest amount', "df.nlargest(5, 'amount')", 'Sorting and taking the top five, in one step.'],
    ['Get the 3 rows of df with the smallest amount', "df.nsmallest(3, 'amount')"],
    ['Drop the rows of df that have any missing value', 'df = df.dropna()'],
    ['Drop the rows where amount is missing, leaving other gaps alone', "df = df.dropna(subset=['amount'])"],
    ['Remove the duplicate rows from df', 'df = df.drop_duplicates()'],
    ['Remove rows with a repeated customer_id, keeping the first', "df = df.drop_duplicates(subset=['customer_id'])"]
  ]);

  ladder('Step by step · grouping', 'sp-pg', [
    ['Add up amount for each city', "df.groupby('city')['amount'].sum()", 'Group by the label column, pick the number column, then say what to work out.'],
    ['Get the average amount for each city', "df.groupby('city')['amount'].mean()"],
    ['Get the biggest amount for each city', "df.groupby('city')['amount'].max()"],
    ['Count the rows in each city', "df.groupby('city').size()", 'size() counts rows, including ones with missing values.'],
    ['Add up amount for each region', "df.groupby('region')['amount'].sum()", 'Same line, different grouping column.'],
    ['Get the average score for each pupil', "df.groupby('pupil')['score'].mean()"],
    ['Add up quantity for each product', "df.groupby('product')['quantity'].sum()"],
    ['Add up amount for each city and product together', "df.groupby(['city', 'product'])['amount'].sum()"],
    ['Get both the total and the average amount for each city', "df.groupby('city')['amount'].agg(['sum', 'mean'])"],
    ['Get the total amount and the row count for each city', "df.groupby('city')['amount'].agg(['sum', 'count'])"],
    ['Add up amount for each city, then sort biggest first', "df.groupby('city')['amount'].sum().sort_values(ascending=False)"],
    ['Add up amount for each city and turn the answer back into a normal table', "df.groupby('city')['amount'].sum().reset_index()", 'reset_index turns the group labels back into an ordinary column.'],
    ['Get the top 3 cities by total amount', "df.groupby('city')['amount'].sum().nlargest(3)"],
    ['Count how many rows each city has, as a column named count', "df.groupby('city').size().reset_index(name='count')"],
    ['Get the average amount per city, rounded to 2 decimals', "df.groupby('city')['amount'].mean().round(2)"]
  ]);
})();
