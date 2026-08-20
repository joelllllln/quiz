/* Quickfire cards — statistics in Python, and the working habits around a notebook:
   environment, timing, debugging and the everyday shell of the job. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var STAT = 'Statistics · describe & test';
  var ENV = 'Working habits · notebook & environment';

  window.SNIPPETS.push(

    /* ---- statistics ---- */
    { id: 'st-import-stats', group: STAT, lvl: 2,
      ask: 'Import the statistics functions from SciPy under the usual name',
      a: 'from scipy import stats',
      note: 'stats.ttest_ind, stats.pearsonr, stats.chi2_contingency all live here.' },

    { id: 'st-mean-py', group: STAT, lvl: 1,
      ask: 'Mean of the list `nums` using the standard-library statistics module',
      a: 'statistics.mean(nums)',
      note: 'import statistics. Fine for small data; NumPy is faster for large arrays.' },

    { id: 'st-median-py', group: STAT, lvl: 1,
      ask: 'Median of `nums` using the statistics module',
      a: 'statistics.median(nums)' },

    { id: 'st-stdev-py', group: STAT, lvl: 2,
      ask: 'Sample standard deviation of `nums` using the statistics module',
      a: 'statistics.stdev(nums)',
      note: 'stdev is the sample version (n − 1); pstdev is the population one.' },

    { id: 'st-mode-py', group: STAT, lvl: 2,
      ask: 'Most common value in `nums` using the statistics module',
      a: 'statistics.mode(nums)',
      note: 'Raises on an empty list; multimode() returns every tied winner.' },

    { id: 'st-var', group: STAT, lvl: 2,
      ask: 'Variance of the pandas Series s',
      a: 's.var()',
      note: 'Variance is the standard deviation squared — same information, different units.' },

    { id: 'st-skew', group: STAT, lvl: 3,
      ask: 'Skewness of the pandas Series s',
      a: 's.skew()',
      note: 'Positive means a long right tail — the usual shape of money.' },

    { id: 'st-kurt', group: STAT, lvl: 3,
      ask: 'Kurtosis of the pandas Series s',
      a: 's.kurt()',
      note: 'High kurtosis means fat tails: extremes happen more often than a normal curve predicts.' },

    { id: 'st-zscore', group: STAT, lvl: 2,
      ask: 'Z-score every value in the pandas Series s by hand',
      a: '(s - s.mean()) / s.std()',
      note: 'How many standard deviations from the mean each value sits. |z| > 3 is the usual outlier rule of thumb.' },

    { id: 'st-iqr', group: STAT, lvl: 2,
      ask: 'Interquartile range of the Series s',
      a: 's.quantile(0.75) - s.quantile(0.25)',
      note: 'The middle 50%. Outlier fences sit at Q1 − 1.5·IQR and Q3 + 1.5·IQR.' },

    { id: 'st-outliers', group: STAT, lvl: 3,
      ask: 'Count the values in s more than 3 standard deviations from the mean',
      a: '((s - s.mean()).abs() > 3 * s.std()).sum()',
      note: 'A quick outlier census before you decide whether to cap, drop or keep them.' },

    { id: 'st-corr-p', group: STAT, lvl: 3,
      ask: 'Pearson correlation and p-value between x and y with SciPy',
      a: 'stats.pearsonr(x, y)',
      note: 'Returns (r, p). spearmanr is the rank-based version for non-linear but monotonic relationships.' },

    { id: 'st-spearman', group: STAT, lvl: 3,
      ask: 'Spearman rank correlation between x and y',
      a: 'stats.spearmanr(x, y)',
      note: 'Correlates the ranks rather than the values — immune to outliers and to any monotonic transformation.' },

    { id: 'st-ttest', group: STAT, lvl: 3,
      ask: 'Two-sample t-test comparing groups a and b',
      a: 'stats.ttest_ind(a, b)',
      note: 'Returns (statistic, p-value). equal_var=False gives Welch\'s test, which is the safer default.' },

    { id: 'st-ttest-rel', group: STAT, lvl: 3,
      ask: 'Paired t-test on before and after measurements',
      a: 'stats.ttest_rel(before, after)',
      note: 'Paired means the same subjects measured twice — it removes the between-subject variation.' },

    { id: 'st-chi2', group: STAT, lvl: 3,
      ask: 'Chi-squared test on the contingency table `table`',
      a: 'stats.chi2_contingency(table)',
      note: 'For two categorical variables — pd.crosstab builds the table for you.' },

    { id: 'st-mannwhitney', group: STAT, lvl: 3,
      ask: 'Non-parametric test comparing two independent samples a and b',
      a: 'stats.mannwhitneyu(a, b)',
      note: 'The rank-based alternative to a t-test when the data is nowhere near normal.' },

    { id: 'st-shapiro', group: STAT, lvl: 3,
      ask: 'Test whether the sample x is normally distributed',
      a: 'stats.shapiro(x)',
      note: 'On big samples it rejects normality for trivial deviations — look at a histogram or Q-Q plot too.' },

    { id: 'st-norm-pdf', group: STAT, lvl: 3,
      ask: 'Probability density of the standard normal at x',
      a: 'stats.norm.pdf(x)',
      note: '.cdf is the cumulative version, .ppf the inverse — the one that gives you critical values.' },

    { id: 'st-norm-ppf', group: STAT, lvl: 3,
      ask: 'The z value with 97.5% of the standard normal below it',
      a: 'stats.norm.ppf(0.975)',
      note: 'Gives 1.96 — the number behind every 95% confidence interval.' },

    { id: 'st-conf-int', group: STAT, lvl: 3,
      ask: 'Standard error of the mean of the Series s',
      a: 's.std() / np.sqrt(len(s))',
      alts: ['s.sem()'],
      note: 'Multiply by 1.96 for the half-width of a 95% confidence interval.' },

    { id: 'st-sample-mean-diff', group: STAT, lvl: 2,
      ask: 'Difference in mean "spend" between the A and B groups of df',
      a: "df.groupby('group')['spend'].mean().diff()",
      note: 'A groupby and a diff — the whole of a simple A/B readout, before the significance test.' },

    { id: 'st-bootstrap', group: STAT, lvl: 3,
      ask: 'Draw one bootstrap resample of the Series s',
      a: 's.sample(len(s), replace=True)',
      note: 'Resampling WITH replacement, same size as the original — repeat it a thousand times for a confidence interval.' },

    { id: 'st-value-share', group: STAT, lvl: 2,
      ask: 'Percentage of rows in df where "churn" is 1',
      a: "100 * df['churn'].mean()",
      note: 'The mean of a 0/1 column is its rate — multiply by 100 for a percentage.' },

    /* ---- working habits ---- */
    { id: 'env-version', group: ENV, lvl: 1,
      ask: 'Print the running Python version from inside a script',
      a: 'sys.version',
      note: 'import sys. sys.executable tells you WHICH Python — the usual answer to "but I installed it".' },

    { id: 'env-pip-list', group: ENV, lvl: 2,
      ask: 'List the installed packages from a notebook cell',
      a: '!pip list',
      note: '!pip freeze > requirements.txt writes them out in a form you can reinstall from.' },

    { id: 'env-pip-version', group: ENV, lvl: 2,
      ask: 'Install exactly version 2.2.0 of pandas',
      a: 'pip install pandas==2.2.0',
      note: 'Double equals. Pinning versions is what makes an analysis reproducible next year.' },

    { id: 'env-venv', group: ENV, lvl: 2,
      ask: 'Create a virtual environment called .venv',
      a: 'python -m venv .venv',
      note: 'Then source .venv/bin/activate on Mac and Linux.' },

    { id: 'env-timeit', group: ENV, lvl: 2,
      ask: 'Time a single line in a notebook cell',
      a: '%timeit my_function()',
      note: 'One percent for one line, two (%%timeit) for the whole cell.' },

    { id: 'env-time-cell', group: ENV, lvl: 2,
      ask: 'Time the whole notebook cell',
      a: '%%time',
      note: 'Must be the very first line of the cell.' },

    { id: 'env-who', group: ENV, lvl: 3,
      ask: 'List the variables currently defined in the notebook',
      a: '%who',
      note: '%whos gives the same list with types and sizes.' },

    { id: 'env-reset', group: ENV, lvl: 3,
      ask: 'Clear every variable from the notebook session',
      a: '%reset -f',
      note: 'The honest way to check your notebook still runs top to bottom.' },

    { id: 'env-autoreload', group: ENV, lvl: 3,
      ask: 'Make a notebook pick up edits to imported modules automatically',
      a: '%load_ext autoreload',
      note: 'Then %autoreload 2. Saves restarting the kernel while you develop a helper module.' },

    { id: 'env-debug', group: ENV, lvl: 3,
      ask: 'Drop into the debugger at this line',
      a: 'breakpoint()',
      note: 'Built in since Python 3.7 — n for next, c to continue, p to print, q to quit.' },

    { id: 'env-pdb-post', group: ENV, lvl: 3,
      ask: 'Open the debugger on the exception that just happened in a notebook',
      a: '%debug',
      note: 'Post-mortem debugging: run it in the next cell after a traceback.' },

    { id: 'env-assert-shape', group: ENV, lvl: 2,
      ask: 'Assert that df has exactly 1000 rows',
      a: 'assert len(df) == 1000',
      note: 'Cheap guardrails in a pipeline catch a bad join long before the model does.' },

    { id: 'env-logging', group: ENV, lvl: 3,
      ask: 'Log the informational message: starting the run',
      a: "logging.info('starting the run')",
      note: 'import logging. Better than print() in anything scheduled — it carries timestamps and levels.' },

    { id: 'env-tqdm', group: ENV, lvl: 3,
      ask: 'Wrap a loop over `items` in a progress bar',
      a: 'for item in tqdm(items):',
      note: 'from tqdm import tqdm. Worth it the moment a loop takes more than a few seconds.' },

    { id: 'env-seed-all', group: ENV, lvl: 2,
      ask: 'Set the NumPy seed to 0 so a notebook reproduces exactly',
      a: 'np.random.seed(0)',
      note: 'Seed everything that samples — NumPy, Python\'s random, and any random_state argument.' },

    { id: 'env-shape-check', group: ENV, lvl: 1,
      ask: 'Print the shape of df with a label, using an f-string',
      a: "print(f'df: {df.shape}')",
      note: 'A labelled shape print after every merge is the cheapest debugging habit in data work.' },

    { id: 'env-help', group: ENV, lvl: 1,
      ask: 'Read the documentation for pd.merge in a notebook',
      a: 'pd.merge?',
      note: 'One question mark for the docstring, two (??) for the source code.' },

    { id: 'env-path-append', group: ENV, lvl: 3,
      ask: 'Add the folder "src" to where Python looks for modules',
      a: "sys.path.append('src')",
      note: 'The quick fix for "ModuleNotFoundError" on your own code. A proper package install is the real one.' },

    { id: 'env-main-script', group: ENV, lvl: 2,
      ask: 'Run the file script.py from a notebook cell',
      a: '!python script.py',
      alts: ['%run script.py'],
      note: '%run executes it inside the notebook\'s own namespace, so its variables stick around afterwards.' }
  );
})();
