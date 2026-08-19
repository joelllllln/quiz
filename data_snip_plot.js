/* Quickfire cards — plotting: matplotlib and seaborn, the charts you actually draw. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var MPL = 'Plotting · matplotlib';
  var SNS = 'Plotting · seaborn & pandas';

  window.SNIPPETS.push(

    { id: 'plt-import', group: MPL, lvl: 1,
      ask: 'Import matplotlib\'s plotting interface under its usual name',
      a: 'import matplotlib.pyplot as plt' },

    { id: 'plt-inline', group: MPL, lvl: 2,
      ask: 'Make plots appear inline in a Jupyter notebook',
      a: '%matplotlib inline',
      note: 'Rarely needed now — modern Jupyter does it by default.' },

    { id: 'plt-line', group: MPL, lvl: 1,
      ask: 'Draw a line chart of y against x',
      a: 'plt.plot(x, y)',
      note: 'The default chart type; pass one list only and it plots against 0,1,2…' },

    { id: 'plt-show', group: MPL, lvl: 1,
      ask: 'Display the figure you have built',
      a: 'plt.show()',
      note: 'Also clears the current figure, so the next plot starts fresh.' },

    { id: 'plt-scatter', group: MPL, lvl: 1,
      ask: 'Draw a scatter plot of y against x',
      a: 'plt.scatter(x, y)',
      note: 'The first chart to draw when you want to see a relationship.' },

    { id: 'plt-hist', group: MPL, lvl: 1,
      ask: 'Draw a histogram of the values in `data` with 30 bins',
      a: 'plt.hist(data, bins=30)',
      note: 'Change the bin count before you believe the shape.' },

    { id: 'plt-bar', group: MPL, lvl: 1,
      ask: 'Draw a bar chart with categories `labels` and heights `values`',
      a: 'plt.bar(labels, values)',
      note: 'plt.barh for horizontal bars — much better for long category names.' },

    { id: 'plt-boxplot', group: MPL, lvl: 2,
      ask: 'Draw a box plot of `data`',
      a: 'plt.boxplot(data)' },

    { id: 'plt-title', group: MPL, lvl: 1,
      ask: 'Give the current plot the title "Sales by month"',
      a: "plt.title('Sales by month')" },

    { id: 'plt-xlabel', group: MPL, lvl: 1,
      ask: 'Label the x axis "Month"',
      a: "plt.xlabel('Month')",
      note: 'plt.ylabel does the vertical one. An unlabelled axis is an unfinished chart.' },

    { id: 'plt-legend', group: MPL, lvl: 1,
      ask: 'Show the legend on the current plot',
      a: 'plt.legend()',
      note: 'It picks up the label= you passed to each plot call.' },

    { id: 'plt-label-series', group: MPL, lvl: 2,
      ask: 'Plot y against x labelled "train" so it appears in the legend',
      a: "plt.plot(x, y, label='train')" },

    { id: 'plt-figsize', group: MPL, lvl: 1,
      ask: 'Start a new figure 10 by 6 inches',
      a: 'plt.figure(figsize=(10, 6))',
      note: 'Call it BEFORE the plot — afterwards it makes an empty second figure.' },

    { id: 'plt-subplots', group: MPL, lvl: 2,
      ask: 'Create a figure and a single axes object, unpacked into fig and ax',
      a: 'fig, ax = plt.subplots()',
      note: 'The object-oriented style — what you want for anything beyond a quick look.' },

    { id: 'plt-subplots-grid', group: MPL, lvl: 2,
      ask: 'Create a 2 by 2 grid of subplots, 12 by 8 inches',
      a: 'fig, axes = plt.subplots(2, 2, figsize=(12, 8))',
      note: 'axes is a 2-D array; axes.flatten() makes looping over them easy.' },

    { id: 'plt-ax-plot', group: MPL, lvl: 2,
      ask: 'Plot y against x onto the axes object ax',
      a: 'ax.plot(x, y)',
      note: 'On an axes, the label setters gain a "set_" prefix: ax.set_title(...).' },

    { id: 'plt-ax-title', group: MPL, lvl: 2,
      ask: 'Set the title of the axes ax to "Residuals"',
      a: "ax.set_title('Residuals')" },

    { id: 'plt-tight', group: MPL, lvl: 2,
      ask: 'Stop subplot labels overlapping each other',
      a: 'plt.tight_layout()',
      note: 'The last line before show() on any multi-panel figure.' },

    { id: 'plt-savefig', group: MPL, lvl: 2,
      ask: 'Save the current figure to "plot.png" at 300 dpi',
      a: "plt.savefig('plot.png', dpi=300)",
      note: 'bbox_inches=\'tight\' crops the whitespace. Save before show(), not after.' },

    { id: 'plt-xticks-rot', group: MPL, lvl: 2,
      ask: 'Rotate the x tick labels by 45 degrees',
      a: 'plt.xticks(rotation=45)',
      note: 'The fix for a crowded category axis.' },

    { id: 'plt-ylim', group: MPL, lvl: 2,
      ask: 'Set the y axis to run from 0 to 100',
      a: 'plt.ylim(0, 100)',
      note: 'Starting a bar chart\'s y axis anywhere but 0 misleads the reader.' },

    { id: 'plt-grid', group: MPL, lvl: 2,
      ask: 'Turn on the grid lines',
      a: 'plt.grid(True)' },

    { id: 'plt-axhline', group: MPL, lvl: 3,
      ask: 'Draw a dashed horizontal reference line at y = 0',
      a: "plt.axhline(0, linestyle='--')",
      note: 'axvline is the vertical twin — good for marking a threshold or a date.' },

    { id: 'plt-annotate', group: MPL, lvl: 3,
      ask: 'Write the text "peak" at the point (3, 10)',
      a: "plt.text(3, 10, 'peak')" },

    { id: 'plt-style', group: MPL, lvl: 3,
      ask: 'Switch matplotlib to the ggplot style',
      a: "plt.style.use('ggplot')",
      note: 'plt.style.available lists the rest.' },

    { id: 'plt-color-alpha', group: MPL, lvl: 2,
      ask: 'Scatter x against y in semi-transparent grey',
      a: "plt.scatter(x, y, color='grey', alpha=0.5)",
      note: 'alpha is the cure for an overplotted scatter.' },

    { id: 'plt-close', group: MPL, lvl: 3,
      ask: 'Close every open matplotlib figure',
      a: "plt.close('all')",
      note: 'Stops a loop of plots eating memory.' },

    /* ---- seaborn and pandas plotting ---- */
    { id: 'sns-import', group: SNS, lvl: 1,
      ask: 'Import seaborn under its usual short name',
      a: 'import seaborn as sns' },

    { id: 'sns-histplot', group: SNS, lvl: 2,
      ask: 'Draw a seaborn histogram of the "age" column of df',
      a: "sns.histplot(data=df, x='age')",
      note: 'Add kde=True to overlay a smooth density curve.' },

    { id: 'sns-scatter', group: SNS, lvl: 2,
      ask: 'Seaborn scatter of "income" against "age" from df',
      a: "sns.scatterplot(data=df, x='age', y='income')",
      note: 'hue=\'group\' colours the points by a category — seaborn\'s best trick.' },

    { id: 'sns-hue', group: SNS, lvl: 2,
      ask: 'Same scatter of income against age, coloured by the "group" column',
      a: "sns.scatterplot(data=df, x='age', y='income', hue='group')" },

    { id: 'sns-box', group: SNS, lvl: 2,
      ask: 'Seaborn box plot of "salary" split by "department"',
      a: "sns.boxplot(data=df, x='department', y='salary')",
      note: 'The fastest way to compare a distribution across groups.' },

    { id: 'sns-count', group: SNS, lvl: 2,
      ask: 'Seaborn bar chart counting the rows in each "city"',
      a: "sns.countplot(data=df, x='city')",
      note: 'value_counts() as a chart.' },

    { id: 'sns-heatmap-corr', group: SNS, lvl: 2,
      ask: 'Draw a correlation heatmap of df with the numbers written in',
      a: 'sns.heatmap(df.corr(numeric_only=True), annot=True)',
      note: 'cmap=\'coolwarm\' with center=0 is the readable choice for correlations.' },

    { id: 'sns-pairplot', group: SNS, lvl: 3,
      ask: 'Draw every pairwise scatter of the columns of df',
      a: 'sns.pairplot(df)',
      note: 'Wonderful on 5 columns, unusable on 50.' },

    { id: 'sns-barplot', group: SNS, lvl: 2,
      ask: 'Seaborn bar chart of mean "amount" per "city"',
      a: "sns.barplot(data=df, x='city', y='amount')",
      note: 'Seaborn aggregates for you — the bar is the mean, the whisker its confidence interval.' },

    { id: 'sns-lineplot', group: SNS, lvl: 2,
      ask: 'Seaborn line chart of "value" over "date"',
      a: "sns.lineplot(data=df, x='date', y='value')" },

    { id: 'sns-theme', group: SNS, lvl: 3,
      ask: 'Apply seaborn\'s default styling to every chart',
      a: 'sns.set_theme()',
      note: 'It restyles matplotlib globally, so your plt charts get it too.' },

    { id: 'pd-plot', group: SNS, lvl: 1,
      ask: 'Plot the "value" column of df straight from pandas',
      a: "df['value'].plot()",
      note: 'pandas wraps matplotlib — quickest chart in the language.' },

    { id: 'pd-plot-hist', group: SNS, lvl: 1,
      ask: 'Histogram of df["age"] straight from pandas',
      a: "df['age'].hist()",
      alts: ["df['age'].plot(kind='hist')"] },

    { id: 'pd-plot-bar', group: SNS, lvl: 2,
      ask: 'Bar chart of the value counts of "city", straight from pandas',
      a: "df['city'].value_counts().plot(kind='bar')",
      note: 'kind takes line, bar, barh, hist, box, kde, area, pie and scatter.' },

    { id: 'pd-plot-scatter', group: SNS, lvl: 2,
      ask: 'Scatter "income" against "age" straight from a DataFrame',
      a: "df.plot(kind='scatter', x='age', y='income')" },

    { id: 'pd-hist-all', group: SNS, lvl: 2,
      ask: 'Histogram every numeric column of df at once',
      a: 'df.hist(figsize=(12, 10))',
      note: 'The fastest possible first look at a new dataset\'s distributions.' }
  );
})();
