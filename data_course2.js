/* The course, stages 02–04 — working with data, machine learning, and sitting the test.
   Everything here assumes stage 01: you can write a loop, a function and a dict. */
(function () {
  window.COURSE = window.COURSE || { stages: [] };

  window.COURSE.stages.push({
    key: 'data', no: '02', name: 'Working with data',
    blurb: 'NumPy and pandas: loading a file, cleaning it, grouping it, joining it, and drawing it.',
    units: [

      { key: 'd1', name: 'NumPy: arrays and vectorised thinking',
        blurb: 'One type, one block of memory, no loops.',
        needs: 'lists, loops',
        steps: [
          { t: 'read', title: 'Why not just use a list?', body: [
            'A Python list can hold anything, which makes it flexible and slow. A **NumPy array** holds one type in one block of memory, which makes it rigid and fast — and lets you do arithmetic on the whole thing at once:',
            ['code', "import numpy as np\n\na = np.array([1, 2, 3])\na * 2          # array([2, 4, 6])   — every element\na + a          # array([2, 4, 6])   — elementwise\n[1, 2, 3] * 2  # [1, 2, 3, 1, 2, 3]  — a list REPEATS instead", 'That difference is the whole reason NumPy exists. Writing `a * 2` instead of a loop is called **vectorising**, and it runs in C rather than in Python.'],
            'Arrays have a shape, and reshaping is cheap:',
            ['code', "a.shape          # (3,)\na.reshape(3, 1)  # a column\na.reshape(-1, 1) # -1 means: you work out the other side", 'That last one is the exact fix for scikit-learn\'s "Expected 2D array, got 1D array instead".'],
            'Selecting works by condition, not by loop:',
            ['code', "a[a > 1]            # array([2, 3])   — a boolean mask\nnp.where(a > 1, 1, 0)  # array([0, 1, 1]) — vectorised if/else", 'This mask idea is exactly what pandas borrows for filtering rows, so it is worth getting comfortable here first.'],
            'Two gotchas to carry forward: a slice of an array is a **view**, so writing to it changes the original (use `.copy()`); and `np.nan` is never equal to itself, so missing values are tested with `np.isnan`, never with `==`.'
          ] },
          { t: 'quick', title: 'Making and inspecting arrays', groups: ['NumPy · make & inspect arrays'] },
          { t: 'quick', title: 'Indexing and maths', groups: ['NumPy · indexing & maths'] },
          { t: 'quiz', title: 'Array behaviour', ids: ['pq-np-broadcast', 'pq-np-view', 'pq-np-nan'] },
          { t: 'problem', id: 'pt-column-means' }
        ] },

      { key: 'd2', name: 'Loading data, and the first look',
        blurb: 'read_csv, head, info, describe — the first five minutes with any file.',
        needs: 'NumPy basics',
        steps: [
          { t: 'read', title: 'The first five minutes with a new dataset', body: [
            'pandas gives you a **DataFrame**: a table with named columns, each column an array of one type. It is the object you will spend most of your working life in.',
            ['code', "import pandas as pd\n\ndf = pd.read_csv('data.csv')", '`read_csv` works out the separator, the header row and the column types for you. Its arguments handle almost every awkward file: `sep`, `header`, `names`, `usecols`, `nrows`, `parse_dates`, `dtype`, `na_values`.'],
            'Then, before anything else, four lines. Always these four:',
            ['code', "df.head()        # what does a row look like?\ndf.shape         # how many rows and columns?\ndf.info()        # what type is each column, and how much is missing?\ndf.describe()    # min, max, mean, quartiles of the numbers", 'Read `describe()` from the outside in: the min and the max are where impossible values live — a negative age, a price of 9999999, a date in 1900.'],
            'Then the two questions that decide how much cleaning you face:',
            ['code', "df.isna().sum()             # how much is missing, per column\ndf['city'].value_counts(dropna=False)   # what values does this column actually take?", '`dropna=False` matters: without it, `value_counts` hides the missing values — which are usually the thing you most need to see.'],
            ['aside', 'Type `df.head()` before you type anything else, every single time. Half the bugs in data work come from believing the file is shaped the way the documentation says.']
          ] },
          { t: 'quick', title: 'Loading and saving', groups: ['pandas · load & save'] },
          { t: 'quick', title: 'The first look', groups: ['pandas · look at the data'] },
          { t: 'problem', id: 'pt-parse-csv' }
        ] },

      { key: 'd3', name: 'Selecting and filtering',
        blurb: 'Columns, rows, loc and iloc, and boolean masks.',
        needs: 'the first look',
        steps: [
          { t: 'read', title: 'Getting at the part you want', body: [
            'Columns come out by name, rows by condition:',
            ['code', "df['age']              # one column — a Series\ndf[['age', 'city']]    # several columns — a DataFrame\ndf[df['age'] > 30]     # the rows where the condition is True", 'One bracket gives a Series, two give a DataFrame. The inner brackets in the second line are a list of names, not a typo.'],
            'The condition inside is a **boolean mask** — one True or False per row, exactly like NumPy:',
            ['code', "mask = df['age'] > 30\ndf[mask & (df['city'] == 'London')]", 'Use `&` and `|`, not `and` and `or`, and bracket each condition — `&` binds tighter than `>` and the brackets are what stop it going wrong.'],
            '`.loc` takes labels and `.iloc` takes positions. `.loc` is the one to reach for, because it does rows and columns in a single, readable step:',
            ['code', "df.loc[df['age'] > 30, ['name', 'age']]   # rows by mask, columns by name\ndf.iloc[0]                                # the first row, by position\ndf.iloc[:5, :3]                           # first 5 rows, first 3 columns"],
            'And it is how you assign safely:',
            ['code', "df.loc[df['age'] > 65, 'status'] = 'senior'", 'Assigning through a filtered copy — `df[df[\'age\'] > 65][\'status\'] = ...` — silently does nothing. That is the SettingWithCopyWarning, and it is telling you the truth.'],
            'For a big set of allowed values, `isin` beats a chain of ORs, and `~` negates a whole mask: `df[~df[\'city\'].isin(bad_cities)]`.'
          ] },
          { t: 'quick', title: 'Selecting columns and rows', groups: ['pandas · select columns & rows'] },
          { t: 'quick', title: 'Filtering rows', groups: ['pandas · filter rows'] },
          { t: 'quick', title: 'Sorting and ranking', groups: ['pandas · sort & rank'] },
          { t: 'quiz', title: 'Views, copies and assignment', ids: ['pq-pd-copy-warning'] },
          { t: 'problem', id: 'pt-pd-filter' },
          { t: 'problem', id: 'pt-pd-newcol' }
        ] },

      { key: 'd4', name: 'Cleaning',
        blurb: 'Missing values, wrong types, duplicates and messy text.',
        needs: 'selecting and filtering',
        steps: [
          { t: 'read', title: 'Most of the job', body: [
            'Real data arrives broken. Four kinds of broken, and what to do about each.',
            '**Missing values.** Find them first, decide second:',
            ['code', "df.isna().sum()                          # count per column\ndf.dropna(subset=['email'])              # drop rows missing a key field\ndf['age'].fillna(df['age'].median())     # fill with a sensible value\ndf.groupby('city')['age'].transform('median')  # fill by group", 'Never fill without looking. A column that is 80% missing is telling you something about how the data was collected, and filling it hides that.'],
            '**Wrong types.** A number stored as text sorts alphabetically and will not add up:',
            ['code', "pd.to_numeric(df['price'], errors='coerce')   # bad values become NaN\npd.to_datetime(df['date'])                    # text → real dates\ndf['id'].astype(str)                          # keep leading zeros", "`errors='coerce'` is the rescue for a numeric column polluted by '£3.50' or 'N/A' — it converts what it can and marks the rest missing."],
            '**Duplicates.** Count before you delete:',
            ['code', "df.duplicated().sum()\ndf.drop_duplicates(subset=['customer_id'], keep='last')"],
            '**Messy text.** The `.str` accessor gives you every string method, vectorised:',
            ['code', "df['city'] = df['city'].str.strip().str.title()\ndf.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')", "Trailing spaces in a header are the usual cause of a KeyError on a column you can plainly see. Tidy the column names the moment you load the file."],
            ['aside', 'Write down the row count before and after every cleaning step. A join or a dropna that quietly halves your data is the most expensive mistake in this job, and it never announces itself.']
          ] },
          { t: 'quick', title: 'Missing values', groups: ['pandas · missing values'] },
          { t: 'quick', title: 'Types and conversion', groups: ['pandas · types & conversion'] },
          { t: 'quick', title: 'Duplicates and replacing', groups: ['pandas · duplicates & replace'] },
          { t: 'quick', title: 'Text columns', groups: ['pandas · text columns'] },
          { t: 'quiz', title: 'What pandas does with missing values', ids: ['pq-pd-mean-nan', 'pq-pd-value-counts-na'] },
          { t: 'problem', id: 'pt-pd-missing' },
          { t: 'problem', id: 'pt-pd-clean' },
          { t: 'problem', id: 'pt-clean-records' },
          { t: 'problem', id: 'pt-missing-fill' }
        ] },

      { key: 'd5', name: 'Grouping and aggregating',
        blurb: 'Split, apply, combine — the question every stakeholder asks.',
        needs: 'cleaning',
        steps: [
          { t: 'read', title: 'Split, apply, combine', body: [
            'Almost every question you are asked has the shape "X per Y": revenue per region, average score per student, orders per day. That is a **groupby**.',
            ['code', "df.groupby('region')['amount'].sum()", 'Three steps in one line: split the rows by region, apply `sum` to the amount column of each group, combine the answers into one Series indexed by region.'],
            'Add `.reset_index()` to get a normal DataFrame back, or `as_index=False` to skip the step:',
            ['code', "df.groupby('region', as_index=False)['amount'].sum()"],
            'Several aggregations at once, with names you choose:',
            ['code', "df.groupby('region').agg(\n    orders=('amount', 'size'),\n    total=('amount', 'sum'),\n    average=('amount', 'mean'),\n)", 'This is **named aggregation**, and it saves you flattening a MultiIndex afterwards. `size` counts rows including missing values; `count` skips them.'],
            'The distinction that takes a while to click: **agg gives one row per group, transform gives one row per ORIGINAL row.**',
            ['code', "df.groupby('city')['age'].mean()                  # one value per city\ndf.groupby('city')['age'].transform('mean')       # one value per row, repeated", 'Use `transform` whenever the result has to line back up with the frame — filling missing values by group, or computing a within-group z-score.'],
            ['aside', 'groupby silently drops rows whose key is missing. If those rows matter — and they usually do — pass `dropna=False` and see them.']
          ] },
          { t: 'quick', title: 'Group and aggregate', groups: ['pandas · group & aggregate'] },
          { t: 'quick', title: 'Cross-tabs and summaries', groups: ['pandas · cross-tabs & summaries'] },
          { t: 'quiz', title: 'What groupby does with gaps', ids: ['pq-pd-groupby-nan'] },
          { t: 'problem', id: 'pt-pd-groupby' },
          { t: 'problem', id: 'pt-avg-by-key' },
          { t: 'problem', id: 'pt-top-n' },
          { t: 'problem', id: 'pt-pd-summary' }
        ] },

      { key: 'd6', name: 'Joining and reshaping',
        blurb: 'Merges that do not lose rows, and long versus wide.',
        needs: 'grouping',
        steps: [
          { t: 'read', title: 'Putting two tables together', body: [
            'A **merge** is a join, and the two things to get right are the key and the kind:',
            ['code', "orders.merge(customers, on='customer_id', how='left')", "`how='left'` keeps every order whether or not its customer exists. The default is `inner`, which silently drops the unmatched — and silently losing rows is the mistake that costs the most."],
            'When the key is named differently on each side, say so explicitly:',
            ['code', "orders.merge(customers, left_on='customer_id', right_on='id', how='left')"],
            'Two habits that catch join bugs before they reach a report:',
            ['code', "before = len(orders)\njoined = orders.merge(customers, on='id', how='left', indicator=True)\nprint(before, len(joined))\nprint(joined['_merge'].value_counts())", "`indicator=True` adds a column saying which side each row came from. If the row count went UP, your key is not unique on the right — `validate='one_to_one'` would have raised instead."],
            'Stacking rather than joining is `pd.concat([df1, df2], ignore_index=True)`.',
            '**Reshaping** moves between long and wide:',
            ['code', "df.pivot_table(index='city', columns='product', values='amount', aggfunc='sum')  # long → wide\ndf.melt(id_vars=['id'], var_name='metric', value_name='score')                  # wide → long", 'Wide is for reading; long is for plotting and modelling. Being able to move between them on demand is a genuine skill.']
          ] },
          { t: 'quick', title: 'Combining frames', groups: ['pandas · combine frames'] },
          { t: 'quick', title: 'Reshaping', groups: ['pandas · reshape'] },
          { t: 'quiz', title: 'Alignment and joins', ids: ['pq-pd-index-align'] },
          { t: 'problem', id: 'pt-pd-merge' },
          { t: 'problem', id: 'pt-join-records' },
          { t: 'problem', id: 'pt-pd-topn' }
        ] },

      { key: 'd7', name: 'Dates and time series',
        blurb: 'Parsing dates, the .dt accessor, resampling and rolling windows.',
        needs: 'cleaning, grouping',
        steps: [
          { t: 'read', title: 'Time is a type, not a string', body: [
            'Until you convert them, dates are text: they sort alphabetically, they cannot be subtracted, and none of the useful methods exist.',
            ['code', "df['date'] = pd.to_datetime(df['date'])\ndf['date'] = pd.to_datetime(df['date'], format='%d/%m/%Y')   # explicit is faster and safer", 'Give the format when you know it — it removes any chance of the day and month being read the American way round.'],
            'Then the `.dt` accessor opens up:',
            ['code', "df['date'].dt.year\ndf['date'].dt.month\ndf['date'].dt.day_name()\ndf['date'].dt.dayofweek     # Monday = 0, so >= 5 is the weekend"],
            'Subtracting two datetimes gives a duration:',
            ['code', "(df['end'] - df['start']).dt.days"],
            'With the dates as the index, whole-period questions become one line:',
            ['code', "df = df.set_index('date')\ndf['amount'].resample('M').sum()      # monthly totals\ndf['value'].rolling(7).mean()         # 7-period moving average", '`resample` is groupby for time; `rolling` slides a window along it. Both need the index to be datetimes and the rows to be in order.'],
            'The three that keep coming up in feature engineering:',
            ['code', "df['value'].shift(1)        # the previous row's value\ndf['value'].diff()          # the change since then\ndf['value'].pct_change()    # that change as a fraction", 'Inside a grouped dataset, always shift within the group — `df.groupby(\'id\')[\'value\'].shift(1)` — or one customer\'s history leaks into the next one\'s.']
          ] },
          { t: 'quick', title: 'Dates and times', groups: ['pandas · dates & times'] },
          { t: 'quick', title: 'Time series', groups: ['pandas · time series'] },
          { t: 'problem', id: 'pt-days-between' },
          { t: 'problem', id: 'pt-weekdays' },
          { t: 'problem', id: 'pt-moving-average' }
        ] },

      { key: 'd8', name: 'Drawing it',
        blurb: 'matplotlib and seaborn: the four charts you will draw most.',
        needs: 'pandas basics',
        steps: [
          { t: 'read', title: 'A chart is an argument, not decoration', body: [
            'Four charts answer most questions. Learn these before anything fancy:',
            ['code', "import matplotlib.pyplot as plt\n\nplt.hist(df['age'], bins=30)        # what does one column look like?\nplt.scatter(df['age'], df['income']) # how do two relate?\nplt.plot(df['date'], df['value'])    # how does it change over time?\nplt.bar(labels, values)              # how do categories compare?", 'Then label it. An unlabelled axis makes a chart unreadable to everyone except the person who drew it:'],
            ['code', "plt.figure(figsize=(10, 6))\nplt.hist(df['age'], bins=30)\nplt.title('Age distribution')\nplt.xlabel('Age')\nplt.ylabel('Customers')\nplt.tight_layout()\nplt.show()", '`figure(figsize=...)` goes BEFORE the plot; `tight_layout()` stops labels overlapping; `savefig` must come before `show`, which clears the figure.'],
            'seaborn sits on top and does the grouping for you:',
            ['code', "import seaborn as sns\n\nsns.boxplot(data=df, x='department', y='salary')\nsns.scatterplot(data=df, x='age', y='income', hue='group')\nsns.heatmap(df.corr(numeric_only=True), annot=True)", '`hue=` colouring by a category is seaborn\'s single best trick — it turns one chart into a comparison.'],
            'And straight from pandas, when you just want to look:',
            ['code', "df['value'].plot()\ndf['city'].value_counts().plot(kind='bar')\ndf.hist(figsize=(12, 10))     # every numeric column at once", 'That last line is the fastest first look at a new dataset there is.']
          ] },
          { t: 'quick', title: 'matplotlib', groups: ['Plotting · matplotlib'] },
          { t: 'quick', title: 'seaborn and pandas plotting', groups: ['Plotting · seaborn & pandas'] }
        ] },

      { key: 'd9', name: 'Describing it honestly',
        blurb: 'Mean versus median, spread, outliers and the tests behind an A/B result.',
        needs: 'pandas basics',
        steps: [
          { t: 'read', title: 'The numbers behind the summary', body: [
            'The **mean** is the balance point and the **median** is the middle value. On anything skewed — money, durations, counts — they disagree, and the median is usually the honest one to quote.',
            ['code', "s.mean()      # pulled by outliers\ns.median()    # not\ns.std()       # typical distance from the mean\ns.quantile([0.25, 0.5, 0.75])"],
            'Spread matters as much as the middle. Two teams with the same average delivery time and very different standard deviations are not the same business.',
            'For outliers, two conventions:',
            ['code', "# z-score: more than 3 standard deviations out\n((s - s.mean()).abs() > 3 * s.std()).sum()\n\n# IQR: outside 1.5 × the middle 50%\niqr = s.quantile(0.75) - s.quantile(0.25)", 'Neither is a law. Look at the rows they flag before deleting anything — outliers are often the most interesting customers you have.'],
            'When comparing two groups, the difference in means is the effect; a **significance test** says whether it could plausibly be noise:',
            ['code', "from scipy import stats\n\nstats.ttest_ind(a, b, equal_var=False)   # two independent groups\nstats.mannwhitneyu(a, b)                  # same question, no normality assumed\nstats.chi2_contingency(table)             # two categorical variables", 'A p-value is not the chance you are right, and a significant difference is not necessarily a difference worth acting on. Quote the effect size next to it.'],
            ['aside', 'Correlation is not causation, and a correlation of 0 only rules out a STRAIGHT-LINE relationship. Always look at the scatter plot.']
          ] },
          { t: 'quick', title: 'Describing and testing', groups: ['Statistics · describe & test'] },
          { t: 'quick', title: 'Random numbers and summary statistics', groups: ['NumPy · random & statistics'] },
          { t: 'problem', id: 'pt-median' },
          { t: 'problem', id: 'pt-std' },
          { t: 'problem', id: 'pt-normalise' }
        ] },

      { key: 'd10', name: 'Working like a professional',
        blurb: 'Notebooks, environments, timing, debugging and reproducibility.',
        steps: [
          { t: 'read', title: 'The shell around the code', body: [
            'Two habits separate an analysis that survives from one that does not.',
            '**Pin your environment.** A notebook that ran last year and does not run today is usually a version problem, not a code problem:',
            ['code', "python -m venv .venv\npip install pandas==2.2.0\npip freeze > requirements.txt", 'Install into a virtual environment, pin the versions, and write them down.'],
            '**Seed everything that samples.** Without it, "the model got worse" might just be a different train/test split:',
            ['code', "np.random.seed(42)\ntrain_test_split(X, y, random_state=42)"],
            'Then the small tools that save hours:',
            ['code', "%timeit my_function()      # how slow is it, really?\n%%time                     # ... for the whole cell\nbreakpoint()               # stop here and look around\n%debug                     # open the debugger on the last error\npd.merge?                  # read the documentation without leaving the notebook"],
            'And the cheapest debugging habit in data work — a labelled shape print after every step that could lose rows:',
            ['code', "print(f'after merge: {df.shape}')", 'When a number surprises you, that line tells you which step to look at. Assertions do the same job automatically: `assert len(df) == before`.'],
            ['aside', 'Restart the kernel and run the notebook top to bottom before you show anyone. Out-of-order cells hide broken code behind variables that only exist in your session.']
          ] },
          { t: 'quick', title: 'Notebook and environment', groups: ['Working habits · notebook & environment'] },
          { t: 'problem', id: 'pt-validate-rows' }
        ] }
    ]
  });

  window.COURSE.stages.push({
    key: 'ml', no: '03', name: 'Machine learning with scikit-learn',
    blurb: 'The same four verbs for every model, and the discipline that keeps a score honest.',
    units: [

      { key: 'm1', name: 'The workflow',
        blurb: 'Split, scale, fit, predict, score — in that order, every time.',
        needs: 'pandas',
        steps: [
          { t: 'read', title: 'Four verbs, every model', body: [
            'Every scikit-learn model works the same way, which is the library\'s great gift: learn the shape once and every algorithm is available to you.',
            ['code', "from sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\n\nX = df.drop(columns=['target'])   # the questions\ny = df['target']                   # the answers\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\n\nmodel = RandomForestClassifier(random_state=42)\nmodel.fit(X_train, y_train)                 # learn\ny_pred = model.predict(X_test)              # apply\nprint(accuracy_score(y_test, y_pred))       # judge", 'Instantiate, `fit`, `predict`, score. Swapping the model means changing one line.'],
            'The first move is the honest one: **hold data back**. A score on data the model has already seen is not a score, it is a memory test.',
            ['code', "train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)", '`stratify=y` keeps the class balance the same in both halves — essential when one class is rare. `random_state` makes the split repeatable, so tomorrow\'s comparison is fair.'],
            'Anything the model learns must be learned from the TRAINING half only. That includes scaling:',
            ['code', "scaler = StandardScaler()\nX_train_s = scaler.fit_transform(X_train)   # learn the means and spreads, and apply\nX_test_s = scaler.transform(X_test)         # apply the TRAINING statistics", "Calling `fit_transform` on the test set — or scaling before the split — leaks information from the future into the past. Your score goes up and your model gets worse. This is the mistake interviewers ask about most."],
            ['aside', 'The trailing underscore on `model.coef_` or `model.feature_importances_` means "learned during fit". If it does not exist yet, you have not fitted the model.']
          ] },
          { t: 'quick', title: 'Where everything lives', groups: ['scikit-learn · imports'] },
          { t: 'quick', title: 'Fit and predict', groups: ['scikit-learn · fit & predict'] },
          { t: 'problem', id: 'pt-ml-split' },
          { t: 'problem', id: 'pt-ml-distance' },
          { t: 'task', key: 'split' },
          { t: 'task', key: 'scale' },
          { t: 'task', key: 'knn' },
          { t: 'problem', id: 'pt-ml-knn' }
        ] },

      { key: 'm2', name: 'Preparing features',
        blurb: 'Imputing, encoding and pipelines that cannot leak.',
        needs: 'the workflow',
        steps: [
          { t: 'read', title: 'Getting the data into a shape a model accepts', body: [
            'Models want numbers, with no gaps. Three transformers do most of it:',
            ['code', "from sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\n\nSimpleImputer(strategy='median')       # fill the gaps\nStandardScaler()                        # centre and scale\nOneHotEncoder(handle_unknown='ignore')  # categories → 0/1 columns", "`handle_unknown='ignore'` stops a category the model has never seen from crashing prediction in production — which it will, eventually."],
            'Each has the same two methods as a model: `fit` learns from the training data, `transform` applies what was learned. Getting that pairing wrong is exactly the leak from the last unit.',
            'A **pipeline** removes the chance of the mistake entirely by chaining the steps into one object:',
            ['code', "from sklearn.pipeline import Pipeline\n\npipe = Pipeline([\n    ('impute', SimpleImputer(strategy='median')),\n    ('scale', StandardScaler()),\n    ('model', LogisticRegression(max_iter=1000)),\n])\npipe.fit(X_train, y_train)\npipe.score(X_test, y_test)", 'Now `fit` fits every step on the training data in order, and `predict` applies them in the same order. Cross-validation over a pipeline refits the preprocessing inside each fold, which is the only way the score is honest.'],
            'When different columns need different treatment, `ColumnTransformer` routes them:',
            ['code', "from sklearn.compose import ColumnTransformer\n\npre = ColumnTransformer([\n    ('num', StandardScaler(), numeric_cols),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), category_cols),\n])"],
            ['aside', 'Save the whole pipeline, not just the model: `joblib.dump(pipe, \'model.joblib\')`. A model without its preprocessing is unusable, and rebuilding that preprocessing from memory in six months is how production bugs are born.']
          ] },
          { t: 'quick', title: 'Preprocessing', groups: ['scikit-learn · preprocessing'] },
          { t: 'problem', id: 'pt-ml-standardise' },
          { t: 'task', key: 'impute' },
          { t: 'task', key: 'encode' },
          { t: 'task', key: 'pipeline' }
        ] },

      { key: 'm3', name: 'Judging a model',
        blurb: 'Accuracy is not enough: precision, recall, the matrix and cross-validation.',
        needs: 'the workflow',
        steps: [
          { t: 'read', title: 'What "good" actually means', body: [
            'Accuracy is the share of predictions that were right. On imbalanced data it is nearly useless: if 1% of transactions are fraud, a model that says "never fraud" is 99% accurate and worth nothing.',
            'The confusion matrix names the four outcomes:',
            ['code', "from sklearn.metrics import confusion_matrix, classification_report\n\nconfusion_matrix(y_test, y_pred)     # [[TN, FP], [FN, TP]]\nprint(classification_report(y_test, y_pred))", 'Truth first, predictions second — every scikit-learn metric takes that order, and swapping them silently reports the wrong numbers.'],
            'From those four come the two numbers that matter:',
            ['code', "precision_score(y_test, y_pred)   # of the ones we flagged, how many were right\nrecall_score(y_test, y_pred)      # of the ones that mattered, how many we caught\nf1_score(y_test, y_pred)          # their harmonic mean", 'Which one you optimise is a business decision, not a technical one. Missing a fraud costs differently from annoying a customer, and the model cannot know that.'],
            'The threshold is yours to move. `predict` uses 0.5; that is a default, not a law:',
            ['code', "y_proba = model.predict_proba(X_test)[:, 1]\ny_pred = (y_proba >= 0.3).astype(int)     # buy recall, pay in precision\nroc_auc_score(y_test, y_proba)             # quality across ALL thresholds", 'Feed ROC-AUC probabilities, never hard 0/1 predictions — that quietly understates your model.'],
            'And one number from one split is a rumour. Cross-validation gives you a range:',
            ['code', "scores = cross_val_score(pipe, X, y, cv=5, scoring='roc_auc')\nprint(scores.mean(), scores.std())", 'Report the mean AND the spread. A model that scores 0.82 ± 0.01 is a different proposition from one that scores 0.82 ± 0.09.']
          ] },
          { t: 'quick', title: 'Evaluation and tuning', groups: ['scikit-learn · evaluation & tuning'] },
          { t: 'problem', id: 'pt-ml-accuracy' },
          { t: 'problem', id: 'pt-ml-confusion' },
          { t: 'problem', id: 'pt-ml-precision-recall' },
          { t: 'problem', id: 'pt-ml-f1' },
          { t: 'problem', id: 'pt-ml-mae' },
          { t: 'task', key: 'metrics' },
          { t: 'task', key: 'prf' },
          { t: 'task', key: 'cv' },
          { t: 'task', key: 'rocauc' },
          { t: 'problem', id: 'pt-ml-crossval-folds' }
        ] },

      { key: 'm4', name: 'Making it better',
        blurb: 'Baselines, tuning, imbalance and knowing when to stop.',
        needs: 'evaluation',
        steps: [
          { t: 'read', title: 'Improving honestly', body: [
            'Start with a **baseline**. Without one you cannot tell whether your model is good or merely complicated:',
            ['code', "from sklearn.dummy import DummyClassifier\n\nDummyClassifier(strategy='most_frequent').fit(X_train, y_train).score(X_test, y_test)", 'That number is the score to beat. Plenty of models in production do not beat it.'],
            'Then tune, over a pipeline, with cross-validation:',
            ['code', "from sklearn.model_selection import GridSearchCV\n\ngrid = GridSearchCV(pipe, {'model__C': [0.1, 1, 10]}, cv=5, scoring='roc_auc', n_jobs=-1)\ngrid.fit(X_train, y_train)\ngrid.best_params_, grid.best_score_", 'The double underscore addresses a step inside the pipeline. `RandomizedSearchCV` gives better value once there are more than two or three parameters to try.'],
            'For imbalance, try the free thing first:',
            ['code', "LogisticRegression(class_weight='balanced')\nRandomForestClassifier(class_weight='balanced')", 'Weighting the rare class costs nothing and often does as well as resampling. If you do resample, do it inside the cross-validation folds, never before splitting.'],
            'Know the two failure modes. **Underfitting** is bad on training and test alike — the model is too simple. **Overfitting** is excellent on training and poor on test — it memorised. A learning curve tells you which one you have, and therefore whether more data or more model is the answer.',
            ['aside', 'Every time you look at the test set and change something, you leak a little information into your decisions. Keep a final holdout you touch once — and stop when the improvement stops mattering to the decision the model supports.']
          ] },
          { t: 'problem', id: 'pt-ml-majority' },
          { t: 'problem', id: 'pt-ml-gini' },
          { t: 'task', key: 'baseline' },
          { t: 'task', key: 'grid' },
          { t: 'task', key: 'imbal' },
          { t: 'task', key: 'threshold' },
          { t: 'task', key: 'save' }
        ] }
    ]
  });

  window.COURSE.stages.push({
    key: 'test', no: '04', name: 'Sitting a Python coding test',
    blurb: 'What these tests look like, how to work through one, and enough practice to make it dull.',
    units: [

      { key: 't1', name: 'How these tests work',
        blurb: 'The format, the clock, and how to spend the first two minutes.',
        needs: 'stage 01',
        steps: [
          { t: 'read', title: 'What you are walking into', body: [
            'A Python screening test is usually 45 to 90 minutes in a browser, and looks like this: a short brief, a function signature you must keep, some example cases, and a Run button that marks you against test cases — some of which you cannot see.',
            'That format rewards a specific way of working.',
            '**Read the brief twice, and look at the examples first.** The examples are the specification; the prose is the summary. When they disagree, the examples win, because that is what the tests were written from.',
            '**Say the edge cases out loud before you write anything.** Empty input, one item, duplicates, negative numbers, zero, ties, the boundary value in "between 18 and 65". Hidden tests are almost always these — not clever inputs, just the obvious ones you forgot.',
            ['code', "def top_customers(rows, n):\n    # what if rows is empty?\n    # what if n is bigger than len(rows)?\n    # what if two customers tie?\n    ...", 'Three comments, thirty seconds, most of the hidden tests.'],
            '**Write the simple version first, and run it.** A working O(n²) answer scores more than an elegant unfinished one. If a hidden case then times out, you know exactly what to improve and why — and you can say so in a comment.',
            '**Read the failures properly.** The runner tells you the call, what was expected and what you returned. `None` for everything means a missing `return`. One failing case usually means a boundary.',
            '**Watch the clock.** Roughly: a fifth of the time on understanding, half on writing, and the rest on edge cases and tidying. Leave something working on every question rather than perfecting one.',
            ['aside', 'If you are stuck at ten minutes on a question, move on and come back. The marks are per test case, not per question, and a half-finished answer that passes three cases beats a blank one.']
          ] },
          { t: 'problem', id: 'pt-sum-evens' },
          { t: 'problem', id: 'pt-digits' }
        ] },

      { key: 't2', name: 'Counting and dictionaries',
        blurb: 'The single most common shape in a data screen.',
        needs: 'dicts',
        steps: [
          { t: 'read', title: 'If in doubt, it is a dictionary', body: [
            'A striking share of screening questions are the same question wearing different clothes: walk through some data once, keep a running record in a dictionary, then read the answer out of it.',
            ['code', "counts = {}\nfor item in items:\n    counts[item] = counts.get(item, 0) + 1", 'Word frequencies, sales per region, the first non-repeating character, "have I seen this before" — all this shape.'],
            'Two variants are worth having in your fingers:',
            ['code', "from collections import Counter, defaultdict\n\nCounter(items).most_common(3)     # the top three, counted for you\ngroups = defaultdict(list)         # every new key starts as an empty list\ngroups[key].append(row)"],
            'And the trick that turns a slow answer into a fast one: **remember what you have already passed**, so you never search backwards.',
            ['code', "seen = {}\nfor i, n in enumerate(nums):\n    if target - n in seen:\n        return [seen[target - n], i]\n    seen[n] = i", 'The nested-loop version is O(n²); this is O(n). When a hidden test mentions size, that is what it is testing.'],
            'Checking membership in a set or dict is instant; in a list it is a scan. Swapping one for the other is the most common single-line speed-up there is.'
          ] },
          { t: 'problem', id: 'pt-word-count' },
          { t: 'problem', id: 'pt-first-unique' },
          { t: 'problem', id: 'pt-two-sum' },
          { t: 'problem', id: 'pt-anagram' },
          { t: 'problem', id: 'pt-pairs-target' }
        ] },

      { key: 't3', name: 'Strings and parsing',
        blurb: 'Splitting, joining, cleaning and reading structured text.',
        needs: 'strings',
        steps: [
          { t: 'read', title: 'Text questions, and where they hide their traps', body: [
            'String questions look easy and fail on details. The recurring ones:',
            ['code', "'a  b'.split(' ')   # ['a', '', 'b']  — keeps the empty piece\n'a  b'.split()      # ['a', 'b']      — collapses whitespace", 'Use the no-argument version for sentences unless the brief says otherwise. It also strips the ends for you.'],
            ['code', "s.strip('mip')   # a SET of characters to remove, not a substring", 'Everyone reads this as "remove that word" once.'],
            'Normalise before you compare — lowercase, strip, and remove punctuation — and do it in one place so both sides get the same treatment:',
            ['code', "import re\nwords = re.findall(r'[a-z0-9]+', text.lower())", "Splitting on spaces leaves 'hello,' and 'hello' as different words. A regex of letter-runs solves it in one line."],
            'And build strings by joining a list, not by adding in a loop:',
            ['code', "''.join(pieces)", 'Each `+=` on a string builds a whole new string; on a long loop that is the difference between instant and slow.'],
            ['aside', 'Reversing a string is `s[::-1]`. Checking a palindrome is `cleaned == cleaned[::-1]`. Those two lines answer a surprising number of questions.']
          ] },
          { t: 'problem', id: 'pt-title-case' },
          { t: 'problem', id: 'pt-caesar' },
          { t: 'problem', id: 'pt-format-money' },
          { t: 'problem', id: 'pt-log-parse' },
          { t: 'problem', id: 'pt-common-prefix' },
          { t: 'problem', id: 'pt-roman' }
        ] },

      { key: 't4', name: 'Algorithms under time pressure',
        blurb: 'Two pointers, sliding windows, binary search, and what O(n) means for your score.',
        needs: 'loops, lists',
        steps: [
          { t: 'read', title: 'Enough complexity to pass', body: [
            'You do not need a computer science degree. You need to recognise four shapes and know why the slow version fails.',
            '**Nested loop → O(n²).** Fine on 100 items, hopeless on 100,000. Any question whose hidden test mentions a large input is testing whether you avoided one.',
            '**Remembering as you go → O(n).** A dict or set of what you have seen turns a backwards search into a lookup.',
            '**Sliding window → O(n).** When the question asks about every consecutive run of k items, do not re-sum each window: add the number entering and subtract the one leaving.',
            ['code', "window = sum(nums[:k])\nbest = window\nfor i in range(k, len(nums)):\n    window += nums[i] - nums[i - k]\n    best = max(best, window)"],
            '**Sorted data → O(log n).** Binary search halves the search space each step. Two details make or break it:',
            ['code', "while low <= high:          # <=, so a single remaining element is checked\n    mid = (low + high) // 2\n    if nums[mid] < target:\n        low = mid + 1        # mid + 1, not mid, or it never shrinks\n    else:\n        high = mid - 1"],
            'When you cannot see a fast answer, write the slow one, get it passing, and say what you would do instead. "This is O(n²); with a dict of seen values it becomes O(n)" is worth real marks in a review, and costs you thirty seconds.'
          ] },
          { t: 'problem', id: 'pt-binary-search' },
          { t: 'problem', id: 'pt-max-window' },
          { t: 'problem', id: 'pt-fib' },
          { t: 'problem', id: 'pt-parens' },
          { t: 'problem', id: 'pt-missing-number' },
          { t: 'problem', id: 'pt-topk-heap' },
          { t: 'problem', id: 'pt-merge-sorted' },
          { t: 'problem', id: 'pt-rotate-matrix' },
          { t: 'problem', id: 'pt-group-anagrams' }
        ] },

      { key: 't5', name: 'Debugging someone else\'s code',
        blurb: 'A whole section of many tests: here is the code, here is the failure, fix it.',
        needs: 'errors',
        steps: [
          { t: 'read', title: 'How to find a bug on the clock', body: [
            'Debugging questions give you working-looking code and failing tests. Work in this order rather than reading the code from the top.',
            '**1. Look at what failed.** Every case failing usually means a missing `return` or a wrong function name. One case failing means a boundary — the empty input, the single item, the tie.',
            '**2. Check the obvious suspects.** In Python, the same handful of bugs come round again and again:',
            ['code', "return inside the loop        # answers after the first pass\nno return at all              # every case gives None\nitems.sort() assigned         # sort returns None\ndef f(x, items=[])            # the default list is shared between calls\nmutating a list while looping # removals skip elements\nlow < high / items[-n:]       # off-by-one and the -0 trap\nif value:                     # a genuine 0 treated as missing", 'Nine debugging questions in ten are on that list.'],
            '**3. Print the state, do not stare at the code.** One `print(x, type(x))` in the loop beats five minutes of reading.',
            '**4. Fix one thing, then run.** Two changes at once and you no longer know which one worked.',
            ['aside', 'Read the brief again after you fix it. Half of "broken" code is doing exactly what it says — just not what was asked for.']
          ] },
          { t: 'problem', id: 'pt-bug-count' },
          { t: 'problem', id: 'pt-bug-mutable' },
          { t: 'problem', id: 'pt-bug-loop-remove' },
          { t: 'problem', id: 'pt-bug-compare' },
          { t: 'problem', id: 'pt-bug-string-build' }
        ] },

      { key: 't6', name: 'Data questions',
        blurb: 'The take-home flavour: records in, an answer out.',
        needs: 'dicts, pandas',
        steps: [
          { t: 'read', title: 'When the test is about data, not puzzles', body: [
            'A data-flavoured test asks you to do in code what you would otherwise do in SQL or pandas: group, join, deduplicate, validate, rank. The data usually arrives as a list of dictionaries — one per row.',
            ['code', "rows = [\n    {'customer': 'a', 'amount': 10, 'updated': '2024-01-01'},\n    {'customer': 'a', 'amount': 5,  'updated': '2024-06-01'},\n]"],
            'Four patterns cover nearly all of them:',
            ['code', "# 1. group and total\ntotals[row['region']] = totals.get(row['region'], 0) + row['amount']\n\n# 2. join — build a lookup first, never a nested loop\nnames = {c['id']: c['name'] for c in customers}\n\n# 3. keep the latest per key — ISO dates compare as text\nif key not in best or row['updated'] >= best[key]['updated']:\n\n# 4. rank or top-N — sort by a tuple to break ties\nsorted(totals.items(), key=lambda kv: (-kv[1], kv[0]))"],
            'Be careful with the small print, because it is where the hidden tests live: does a tie keep the first or the last? Is the range inclusive? Should a missing customer be dropped or kept with a blank? Ask if you can; assume out loud in a comment if you cannot.',
            'And if the test allows pandas, the same four questions are one line each — but only reach for it when the brief invites it. On a plain-Python test, importing pandas to sum a list reads badly.'
          ] },
          { t: 'problem', id: 'pt-latest-per-key' },
          { t: 'problem', id: 'pt-sessionise' },
          { t: 'problem', id: 'pt-rank-scores' },
          { t: 'problem', id: 'pt-cooccurrence' },
          { t: 'problem', id: 'pt-running-total' }
        ] },

      { key: 't7', name: 'Sit one, properly',
        blurb: 'Timed sittings under real conditions, then read the report.',
        needs: 'everything above',
        steps: [
          { t: 'read', title: 'Before you start the clock', body: [
            'Do these under real conditions: no notes, no searching, one sitting, phone away. The value is entirely in finding out what falls apart under time pressure — and the only way to find that out is to be under time pressure.',
            'After each sitting, read the report properly. For every question you did not fully solve, decide which it was:',
            '**Did not know the shape** → go back to the unit that teaches it and drill the quickfire cards until the line comes cold.\n**Knew it, wrote it wrong** → it is a fluency problem, and fluency comes from repetition, not from reading.\n**Ran out of time** → you spent too long on one question. Practise leaving something working and moving on.\n**Missed an edge case** → write the edge-case comments before you code, next time. Every time.',
            'Sit the short screen until 45 minutes feels comfortable, then the standard test. When you are passing most cases with time left over, you are ready for the real thing.',
            ['aside', 'A real test also watches how you work: readable names, a sensible structure, a comment where a choice was not obvious. Write as though a person will read it, because one will.']
          ] },
          { t: 'mock', n: 3, mins: 45, mix: [1, 2, 2] },
          { t: 'mock', n: 4, mins: 60, mix: [1, 2, 2, 3] },
          { t: 'mock', n: 4, mins: 60, mix: [1, 2, 2, 3], pkg: true }
        ] }
    ]
  });
})();
