/* Coding tasks — data analytics, stage 07 and 08: time, and charts. */
(function () {
  window.CODETASKS = window.CODETASKS || [];
  var S7 = '27 · Dates and time series, together';
  var S8 = '28 · Charts, all together';

  window.CODETASKS.push(

    { key: 'dadates', group: S7, lvl: 1, title: 'Turn text into real dates',
      ask: 'Convert the date column of df into real dates, count the ones that failed, and report the range covered.',
      why: 'Until a date is a real date it sorts alphabetically, and 2024-10-01 comes before 2024-2-01.',
      mcq: {
        q: 'Which line converts the column and turns unparseable values into NaT rather than raising?',
        correct: "df['date'] = pd.to_datetime(df['date'], errors='coerce')",
        wrong: [
          "df['date'] = pd.to_datetime(df['date'])",
          "df['date'] = df['date'].astype('datetime')",
          "df['date'] = pd.Timestamp(df['date'])"],
        explain: "errors='coerce' turns anything it cannot read into NaT, so one bad row does not stop the script. Timestamp converts a single value, not a column." },
      lines: [
        "df['date'] = pd.to_datetime(df['date'], errors='coerce')",
        "print(df['date'].isna().sum(), 'dates would not parse')",
        "print(df['date'].min(), 'to', df['date'].max())"],
      decoys: ["df['date'] = df['date'].astype('datetime')", "print(df['date'].sum())"],
      written: {
        prompt: 'Write the code: coerce the date column to datetimes, print how many failed, then print the earliest and latest date.',
        solution: "df['date'] = pd.to_datetime(df['date'], errors='coerce')\nprint(df['date'].isna().sum(), 'dates would not parse')\nprint(df['date'].min(), 'to', df['date'].max())",
        must: ['pd.to_datetime', "errors='coerce'", '.min()', '.max()'] },
      walk: [
        ["df['date'] = pd.to_datetime(df['date'], errors='coerce')", "One line converts the whole column. Add format='%d/%m/%Y' when the dates are British and pandas guesses American."],
        ["print(df['date'].isna().sum(), 'dates would not parse')", "The failures are a finding, not an inconvenience — usually one system exporting a different format."],
        ["print(df['date'].min(), 'to', df['date'].max())", "The range is the first thing anybody will ask. A max in 2099 means a typo you need to find now."]] },

    { key: 'dadateparts', group: S7, lvl: 1, title: 'Pull the calendar apart',
      ask: 'Add year, month and weekday-name columns to df from its date column.',
      why: 'Almost every "when do we sell most" question is answered by grouping on one of these three.',
      mcq: {
        q: 'Which set of lines adds the three columns?',
        correct: "df['year'] = df['date'].dt.year\ndf['month'] = df['date'].dt.month\ndf['weekday'] = df['date'].dt.day_name()",
        wrong: [
          "df['year'] = df['date'].year\ndf['month'] = df['date'].month\ndf['weekday'] = df['date'].day_name()",
          "df['year'] = df['date'].dt.year()\ndf['month'] = df['date'].dt.month()\ndf['weekday'] = df['date'].dt.day_name",
          "df['year'] = year(df['date'])\ndf['month'] = month(df['date'])\ndf['weekday'] = weekday(df['date'])"],
        explain: "Date parts on a whole column live behind .dt — and year and month are attributes with no brackets, while day_name() is a method with them." },
      lines: [
        "df['year'] = df['date'].dt.year",
        "df['month'] = df['date'].dt.month",
        "df['weekday'] = df['date'].dt.day_name()",
        "print(df[['date', 'year', 'month', 'weekday']].head())"],
      decoys: ["df['year'] = df['date'].year", "df['month'] = df['date'].dt.month()"],
      written: {
        prompt: 'Write the code: add year, month and weekday-name columns from the date column, then show them beside the date.',
        solution: "df['year'] = df['date'].dt.year\ndf['month'] = df['date'].dt.month\ndf['weekday'] = df['date'].dt.day_name()\nprint(df[['date', 'year', 'month', 'weekday']].head())",
        must: ['dt.year', 'dt.month', 'dt.day_name()'] },
      walk: [
        ["df['year'] = df['date'].dt.year", "A plain number, ready to group by."],
        ["df['month'] = df['date'].dt.month", "1 to 12. Use dt.to_period('M') instead when you need month AND year together."],
        ["df['weekday'] = df['date'].dt.day_name()", "The name rather than the number, because 'Saturday' needs no explaining in a chart."],
        ["print(df[['date', 'year', 'month', 'weekday']].head())", "Five rows to check the parts match the dates."]] },

    { key: 'damonthly', group: S7, lvl: 2, title: 'Totals per month',
      ask: 'Total the amount column of df by calendar month, in date order.',
      why: 'The monthly trend is the most requested table in any reporting job.',
      mcq: {
        q: 'Which line totals by month and keeps the months in real order?',
        correct: "df.groupby(df['date'].dt.to_period('M'))['amount'].sum()",
        wrong: [
          "df.groupby(df['date'].dt.month)['amount'].sum()",
          "df.groupby(df['date'].dt.strftime('%B'))['amount'].sum()",
          "df.groupby('date')['amount'].sum()"],
        explain: "to_period('M') keeps the year with the month, so January 2023 and January 2024 stay apart and everything sorts properly. dt.month alone merges different years; the month NAME sorts alphabetically, putting April first." },
      lines: [
        "monthly = df.groupby(df['date'].dt.to_period('M'))['amount'].sum()",
        "monthly = monthly.sort_index()",
        "print(monthly)"],
      decoys: ["monthly = df.groupby(df['date'].dt.strftime('%B'))['amount'].sum()", "monthly = df.groupby('date')['amount'].sum()"],
      written: {
        prompt: 'Write the code: group df by the month period of its date column, total the amount, sort by month and print it.',
        solution: "monthly = df.groupby(df['date'].dt.to_period('M'))['amount'].sum()\nmonthly = monthly.sort_index()\nprint(monthly)",
        must: ["to_period('M')", "['amount'].sum()", 'sort_index()'] },
      walk: [
        ["monthly = df.groupby(df['date'].dt.to_period('M'))['amount'].sum()", "A period is a month-sized label that still knows what year it is."],
        ["monthly = monthly.sort_index()", "Chronological, because periods sort as dates rather than as text."],
        ["print(monthly)", "A gap in the middle of the series is worth chasing before anyone charts it."]] },

    { key: 'darolling', group: S7, lvl: 2, title: 'Smooth out the noise',
      ask: 'Add a 7-day rolling average of the daily column to a frame indexed by date.',
      why: 'Daily numbers are noisy. A rolling average is how you show a trend without hiding the data.',
      mcq: {
        q: 'Which line adds the 7-day rolling mean?',
        correct: "daily['rolling7'] = daily['amount'].rolling(7).mean()",
        wrong: [
          "daily['rolling7'] = daily['amount'].rolling(7)",
          "daily['rolling7'] = daily['amount'].mean(7)",
          "daily['rolling7'] = daily['amount'].resample(7).mean()"],
        explain: "rolling(7) makes the window and .mean() computes it — without the mean you get a rolling object, not numbers. resample takes a time rule like 'W', not a plain number." },
      lines: [
        "daily = df.set_index('date').resample('D')['amount'].sum()",
        "daily = daily.to_frame()",
        "daily['rolling7'] = daily['amount'].rolling(7).mean()",
        "print(daily.tail())"],
      decoys: ["daily['rolling7'] = daily['amount'].rolling(7)", "daily = df.set_index('date').resample(7).sum()"],
      written: {
        prompt: 'Write the code: resample df to daily totals by date, turn it into a frame, add a 7-day rolling mean column, and show the tail.',
        solution: "daily = df.set_index('date').resample('D')['amount'].sum()\ndaily = daily.to_frame()\ndaily['rolling7'] = daily['amount'].rolling(7).mean()\nprint(daily.tail())",
        must: ["resample('D')", 'rolling(7)', '.mean()'] },
      walk: [
        ["daily = df.set_index('date').resample('D')['amount'].sum()", "resample needs the date as the INDEX. 'D' gives one row per day, including days with no orders — which is exactly what you want for a trend."],
        ["daily = daily.to_frame()", "A Series becomes a frame so the rolling column has somewhere to live."],
        ["daily['rolling7'] = daily['amount'].rolling(7).mean()", "The first six rows come out NaN because there is not yet a full week behind them. That is correct, not a bug."],
        ["print(daily.tail())", "The end of the series is the part people care about."]] },

    { key: 'dalag', group: S7, lvl: 2, title: 'Compare with last time',
      ask: 'For the monthly totals in monthly, add last month\'s value and the percentage change.',
      why: '"Up 12% on last month" is the sentence the whole report exists to produce.',
      mcq: {
        q: 'Which pair adds the previous value and the percentage change?',
        correct: "monthly['prev'] = monthly['amount'].shift(1)\nmonthly['change'] = monthly['amount'].pct_change() * 100",
        wrong: [
          "monthly['prev'] = monthly['amount'].shift(-1)\nmonthly['change'] = monthly['amount'].pct_change() * 100",
          "monthly['prev'] = monthly['amount'].lag(1)\nmonthly['change'] = monthly['amount'].diff() * 100",
          "monthly['prev'] = monthly['amount'].shift(1)\nmonthly['change'] = monthly['amount'].diff() / 100"],
        explain: "shift(1) reaches BACKWARDS to the previous row; shift(-1) reaches into the future, which is a leak. pct_change gives the fractional change, so multiply by 100 for a percentage; diff gives the absolute change." },
      lines: [
        "monthly = monthly.sort_index()",
        "monthly['prev'] = monthly['amount'].shift(1)",
        "monthly['change'] = (monthly['amount'].pct_change() * 100).round(1)",
        "print(monthly.tail())"],
      decoys: ["monthly['prev'] = monthly['amount'].shift(-1)", "monthly['change'] = monthly['amount'].diff() / 100"],
      written: {
        prompt: 'Write the code: sort monthly by its index, add a prev column with last month\'s amount, add a rounded percentage change column, and show the tail.',
        solution: "monthly = monthly.sort_index()\nmonthly['prev'] = monthly['amount'].shift(1)\nmonthly['change'] = (monthly['amount'].pct_change() * 100).round(1)\nprint(monthly.tail())",
        must: ['shift(1)', 'pct_change()', 'sort_index()'] },
      walk: [
        ["monthly = monthly.sort_index()", "Shifting only means anything once the rows are in date order."],
        ["monthly['prev'] = monthly['amount'].shift(1)", "Every row can now see the month before it. The first row is NaN, correctly."],
        ["monthly['change'] = (monthly['amount'].pct_change() * 100).round(1)", "pct_change does the (new - old) / old for you."],
        ["print(monthly.tail())", "The last few months, with the change beside them — the table that goes in the email."]] },

    { key: 'dawindow', group: S7, lvl: 2, title: 'Just this period',
      ask: 'Keep only the rows of df dated in the last 90 days of the data, and count them.',
      why: 'Reports are nearly always about a window, and anchoring it to the data rather than to today keeps the numbers reproducible.',
      mcq: {
        q: 'Which pair keeps the last 90 days of the data itself?',
        correct: "cutoff = df['date'].max() - pd.Timedelta(days=90)\nrecent = df[df['date'] > cutoff]",
        wrong: [
          "cutoff = pd.Timestamp.now() - pd.Timedelta(days=90)\nrecent = df[df['date'] > cutoff]",
          "recent = df[df['date'] > df['date'].max() - 90]",
          "recent = df.tail(90)"],
        explain: "Anchoring to df['date'].max() gives the same answer whenever you run it; anchoring to now() gives a different answer tomorrow. Subtracting a plain 90 from a date raises — a Timedelta is the way to express a length of time. tail(90) takes 90 ROWS, not 90 days." },
      lines: [
        "cutoff = df['date'].max() - pd.Timedelta(days=90)",
        "recent = df[df['date'] > cutoff]",
        "print(cutoff.date(), len(recent), 'rows')"],
      decoys: ["cutoff = pd.Timestamp.now() - pd.Timedelta(days=90)", "recent = df.tail(90)"],
      written: {
        prompt: 'Write the code: work out a cutoff 90 days before the latest date, keep the rows after it, and print the cutoff and the row count.',
        solution: "cutoff = df['date'].max() - pd.Timedelta(days=90)\nrecent = df[df['date'] > cutoff]\nprint(cutoff.date(), len(recent), 'rows')",
        must: ['pd.Timedelta(days=90)', "df['date'].max()", 'len(recent)'] },
      walk: [
        ["cutoff = df['date'].max() - pd.Timedelta(days=90)", "Ninety days before the last date IN THE FILE — so the report says the same thing next week."],
        ["recent = df[df['date'] > cutoff]", "An ordinary filter; dates compare like numbers once they are real dates."],
        ["print(cutoff.date(), len(recent), 'rows')", "Print the window you used. A report that does not state its period is not a report."]] },

    { key: 'daplotbar', group: S8, lvl: 1, title: 'A bar chart of the totals',
      ask: 'Draw a bar chart of total amount per region, sorted, with a title and axis labels.',
      why: 'A bar chart with no title and no labels gets sent back. Four extra lines make it presentable.',
      mcq: {
        q: 'Which sequence draws and labels the chart?',
        correct: "totals.sort_values(ascending=False).plot(kind='bar')\nplt.title('Total sales by region')\nplt.ylabel('Amount (£)')\nplt.show()",
        wrong: [
          "plt.bar(totals)\nplt.title('Total sales by region')\nplt.show()",
          "totals.plot(kind='bar')\nplt.show()\nplt.title('Total sales by region')",
          "totals.sort_values().plot(kind='pie')\nplt.title('Total sales by region')\nplt.show()"],
        explain: "Draw, then label, then show — anything after plt.show() lands on a new empty figure. plt.bar needs x and height separately; the .plot method on a Series already has both." },
      lines: [
        "totals = df.groupby('region')['amount'].sum().sort_values(ascending=False)",
        "totals.plot(kind='bar')",
        "plt.title('Total sales by region')",
        "plt.ylabel('Amount (£)')",
        "plt.tight_layout()",
        "plt.show()"],
      decoys: ["plt.bar(totals)", "plt.legend(totals)"],
      written: {
        prompt: 'Write the code: total amount per region sorted biggest first, plot it as bars, add a title and a y label, tighten the layout and show it.',
        solution: "totals = df.groupby('region')['amount'].sum().sort_values(ascending=False)\ntotals.plot(kind='bar')\nplt.title('Total sales by region')\nplt.ylabel('Amount (£)')\nplt.tight_layout()\nplt.show()",
        must: ["kind='bar'", 'plt.title', 'plt.ylabel', 'plt.show()'] },
      walk: [
        ["totals = df.groupby('region')['amount'].sum().sort_values(ascending=False)", "Sort before plotting — an unsorted bar chart makes the reader do the ranking themselves."],
        ["totals.plot(kind='bar')", "pandas hands the Series straight to matplotlib: labels from the index, heights from the values."],
        ["plt.title('Total sales by region')", "Say what the chart shows, in the words the audience uses."],
        ["plt.ylabel('Amount (£)')", "Units. A number with no unit is not information."],
        ["plt.tight_layout()", "Stops the rotated labels being cut off when it is saved."],
        ["plt.show()", "Last. Anything after it draws on a fresh, empty figure."]] },

    { key: 'daplotline', group: S8, lvl: 1, title: 'A line chart over time',
      ask: 'Draw the monthly totals as a line chart with the months along the bottom.',
      why: 'Time goes on the x axis, always — and a line says "this is continuous" in a way bars do not.',
      mcq: {
        q: 'Which pair draws the monthly series as a line?',
        correct: "monthly.plot(kind='line', marker='o')\nplt.show()",
        wrong: [
          "monthly.plot(kind='bar', marker='o')\nplt.show()",
          "plt.line(monthly)\nplt.show()",
          "monthly.plot(x='amount', y='month')\nplt.show()"],
        explain: "kind='line' with a marker shows both the trend and where the actual data points are. There is no plt.line — the function is plt.plot." },
      lines: [
        "monthly.index = monthly.index.astype(str)",
        "monthly.plot(kind='line', marker='o')",
        "plt.title('Monthly sales')",
        "plt.xlabel('Month')",
        "plt.ylabel('Amount (£)')",
        "plt.show()"],
      decoys: ["plt.line(monthly)", "monthly.plot(x='amount', y='month')"],
      written: {
        prompt: 'Write the code: make the period index printable, plot the monthly series as a line with markers, label both axes and the title, then show it.',
        solution: "monthly.index = monthly.index.astype(str)\nmonthly.plot(kind='line', marker='o')\nplt.title('Monthly sales')\nplt.xlabel('Month')\nplt.ylabel('Amount (£)')\nplt.show()",
        must: ["kind='line'", "marker='o'", 'plt.xlabel', 'plt.ylabel'] },
      walk: [
        ["monthly.index = monthly.index.astype(str)", "Period labels print more cleanly as text on an axis."],
        ["monthly.plot(kind='line', marker='o')", "The marker matters: without it, twelve monthly points look like a continuous measurement."],
        ["plt.title('Monthly sales')", "What."],
        ["plt.xlabel('Month')", "When."],
        ["plt.ylabel('Amount (£)')", "How much, and in what units."],
        ["plt.show()", "Draw it."]] },

    { key: 'daplothist', group: S8, lvl: 1, title: 'The shape of one column',
      ask: 'Draw a histogram of the amount column with 30 bins, and say what the shape means.',
      why: 'A mean tells you one number; a histogram tells you whether that number means anything.',
      mcq: {
        q: 'Which line draws the distribution?',
        correct: "df['amount'].plot(kind='hist', bins=30)",
        wrong: [
          "df['amount'].plot(kind='bar', bins=30)",
          "df['amount'].hist(kind='hist', bins=30)",
          "df.plot(kind='hist', bins=30)"],
        explain: "kind='hist' buckets the values and counts them. A bar chart would draw one bar per ROW, which for 50,000 rows is unreadable. df.plot without picking a column tries to draw every numeric column at once." },
      lines: [
        "df['amount'].plot(kind='hist', bins=30)",
        "plt.title('Distribution of order amounts')",
        "plt.xlabel('Amount (£)')",
        "plt.show()",
        "print(df['amount'].skew().round(2))"],
      decoys: ["df.plot(kind='hist', bins=30)", "df['amount'].plot(kind='bar', bins=30)"],
      written: {
        prompt: 'Write the code: draw a 30-bin histogram of amount, title it, label the x axis, show it, then print the skew rounded to 2 places.',
        solution: "df['amount'].plot(kind='hist', bins=30)\nplt.title('Distribution of order amounts')\nplt.xlabel('Amount (£)')\nplt.show()\nprint(df['amount'].skew().round(2))",
        must: ["kind='hist'", 'bins=30', 'plt.xlabel', 'skew()'] },
      walk: [
        ["df['amount'].plot(kind='hist', bins=30)", "Too few bins hides the shape; too many turns it into noise. Thirty is a sensible starting point."],
        ["plt.title('Distribution of order amounts')", "Titles are not optional."],
        ["plt.xlabel('Amount (£)')", "The x axis is the value, the y axis is how many rows had it."],
        ["plt.show()", "Look at it: one long tail to the right means the mean is being dragged and the median is the honest summary."],
        ["print(df['amount'].skew().round(2))", "The number behind the shape. Above about 1 is strongly right-skewed."]] },

    { key: 'daplotgroup', group: S8, lvl: 2, title: 'Compare the groups',
      ask: 'Draw a box plot of amount by region so the spread of each region can be compared.',
      why: 'A bar of averages hides everything. A box plot shows the middle, the spread and the outliers at once.',
      mcq: {
        q: 'Which line draws amount by region as boxes?',
        correct: "df.boxplot(column='amount', by='region')",
        wrong: [
          "df.boxplot(column='region', by='amount')",
          "df['amount'].plot(kind='box', by='region')",
          "df.plot(kind='box', column='amount', by='region')"],
        explain: "column is the NUMBER being summarised and by is the grouping label — swapping them asks for a box plot of text, which cannot work." },
      lines: [
        "df.boxplot(column='amount', by='region')",
        "plt.title('Order amounts by region')",
        "plt.suptitle('')",
        "plt.ylabel('Amount (£)')",
        "plt.show()"],
      decoys: ["df.boxplot(column='region', by='amount')", "df['amount'].plot(kind='box', by='region')"],
      written: {
        prompt: 'Write the code: box-plot amount by region, set the title, clear the automatic suptitle, label the y axis and show it.',
        solution: "df.boxplot(column='amount', by='region')\nplt.title('Order amounts by region')\nplt.suptitle('')\nplt.ylabel('Amount (£)')\nplt.show()",
        must: ['boxplot', "column='amount'", "by='region'", 'suptitle'] },
      walk: [
        ["df.boxplot(column='amount', by='region')", "One box per region: the line is the median, the box is the middle half, the whiskers and dots are the rest."],
        ["plt.title('Order amounts by region')", "Your title."],
        ["plt.suptitle('')", "pandas adds its own heading above the chart; this clears it so you are left with just yours."],
        ["plt.ylabel('Amount (£)')", "Units again."],
        ["plt.show()", "Boxes of very different heights mean an average comparison would have been misleading."]] },

    { key: 'daplotscatter', group: S8, lvl: 2, title: 'Two numbers against each other',
      ask: 'Draw a scatter plot of amount against quantity, and report their correlation.',
      why: 'A scatter shows the relationship; the correlation number summarises it. Neither is enough alone.',
      mcq: {
        q: 'Which line draws the scatter?',
        correct: "df.plot(kind='scatter', x='quantity', y='amount', alpha=0.3)",
        wrong: [
          "df.plot(kind='scatter', x='amount', y='quantity', alpha='0.3')",
          "df['amount'].plot(kind='scatter', x='quantity')",
          "plt.scatter(df, x='quantity', y='amount')"],
        explain: "A scatter needs both columns named on the FRAME, not on one column. alpha is a number between 0 and 1 — at 0.3 the overlapping points show where the data is dense." },
      lines: [
        "df.plot(kind='scatter', x='quantity', y='amount', alpha=0.3)",
        "plt.title('Amount against quantity')",
        "plt.show()",
        "print(df[['quantity', 'amount']].corr().round(2))"],
      decoys: ["plt.scatter(df, x='quantity', y='amount')", "df['amount'].plot(kind='scatter', x='quantity')"],
      written: {
        prompt: 'Write the code: scatter amount against quantity with alpha 0.3, title it, show it, then print the rounded correlation of the two columns.',
        solution: "df.plot(kind='scatter', x='quantity', y='amount', alpha=0.3)\nplt.title('Amount against quantity')\nplt.show()\nprint(df[['quantity', 'amount']].corr().round(2))",
        must: ["kind='scatter'", "x='quantity'", "y='amount'", 'alpha', '.corr()'] },
      walk: [
        ["df.plot(kind='scatter', x='quantity', y='amount', alpha=0.3)", "x is the thing you think explains, y the thing being explained. alpha makes the crowded middle readable."],
        ["plt.title('Amount against quantity')", "Name both variables in the title so the chart stands alone."],
        ["plt.show()", "Look for the shape: a curve, a fan, or two separate clouds all change what the correlation number means."],
        ["print(df[['quantity', 'amount']].corr().round(2))", "One number for the straight-line part of the relationship — and only that part."]] },

    { key: 'daplotsave', group: S8, lvl: 1, title: 'Save it at a sensible size',
      ask: 'Draw the regional totals at a readable size and save the chart to sales.png instead of showing it.',
      why: 'A chart that goes in a document has to be saved, sized and tight — and saving after show() saves a blank image.',
      mcq: {
        q: 'Which order actually saves the chart?',
        correct: "totals.plot(kind='bar', figsize=(8, 4))\nplt.tight_layout()\nplt.savefig('sales.png', dpi=150)",
        wrong: [
          "totals.plot(kind='bar', figsize=(8, 4))\nplt.show()\nplt.savefig('sales.png', dpi=150)",
          "plt.savefig('sales.png', dpi=150)\ntotals.plot(kind='bar', figsize=(8, 4))",
          "totals.plot(kind='bar', size=(8, 4))\nplt.savefig('sales.png', dpi=150)"],
        explain: "show() clears the figure, so saving afterwards writes an empty file — the classic blank-image bug. The argument is figsize, and dpi controls how sharp the saved image is." },
      lines: [
        "totals.plot(kind='bar', figsize=(8, 4))",
        "plt.title('Total sales by region')",
        "plt.tight_layout()",
        "plt.savefig('sales.png', dpi=150)",
        "plt.close()"],
      decoys: ["plt.show()", "totals.plot(kind='bar', size=(8, 4))"],
      written: {
        prompt: 'Write the code: plot the totals as bars at 8 by 4, title it, tighten the layout, save to sales.png at 150 dpi and close the figure.',
        solution: "totals.plot(kind='bar', figsize=(8, 4))\nplt.title('Total sales by region')\nplt.tight_layout()\nplt.savefig('sales.png', dpi=150)\nplt.close()",
        must: ['figsize=(8, 4)', 'tight_layout()', "savefig('sales.png'", 'dpi=150'] },
      walk: [
        ["totals.plot(kind='bar', figsize=(8, 4))", "Size it for where it is going. The default is small and gets stretched in a document."],
        ["plt.title('Total sales by region')", "Everything the reader needs is on the image itself."],
        ["plt.tight_layout()", "Pulls the labels inside the edges so nothing is clipped."],
        ["plt.savefig('sales.png', dpi=150)", "Before show, never after. 150 dpi is crisp on screen and in print."],
        ["plt.close()", "Frees the figure — matters when a loop is saving thirty charts."]] }
  );
})();
