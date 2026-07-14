/* Feature Engineering — full topic (3 levels) + primer. choices[0] always correct (shuffled at render). */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  window.PRIMERS = window.PRIMERS || {};
  window.PRIMERS.feng = { terms: [
    { t: "Feature", d: "A single measurable input column a model reads, such as age, price, or color." },
    { t: "Feature engineering", d: "Turning raw data into informative input columns so a model can learn patterns more easily." },
    { t: "One-hot encoding", d: "Turning a category column into one 0/1 column per category, with a 1 marking each row's value." },
    { t: "Feature scaling", d: "Putting numeric features onto a comparable range so no single big-numbered feature dominates." },
    { t: "Standardization", d: "Rescaling a feature to have mean 0 and standard deviation 1 (the z-score)." },
    { t: "Imputation", d: "Filling in missing values with a stand-in such as the column's mean or median." },
    { t: "Binning", d: "Grouping a continuous number into a few ranges or buckets (for example child / adult / senior)." },
    { t: "Target encoding", d: "Replacing each category with the average target value observed for that category." }
  ] };
  function def(qk, o) { (Q[qk] = Q[qk] || []).push(o); D[o.q] = 1; }  // a DEFINITION question (tagged into the Definitions filter)
  function q(qk, o)   { (Q[qk] = Q[qk] || []).push(o); }             // a non-definition concept/scenario question

  /* ============================ feng1 — Part I · Foundations (15) ============================ */

  def("feng1", {
    q: "What is feature engineering?",
    choices: [
      "Transforming raw data into input columns (features) that help a model learn better",
      "Choosing which machine-learning algorithm to train, then picking its software library",
      "Tuning a model's hyperparameters such as the learning rate, tree depth, and batch size",
      "Collecting more rows of raw data from a database to enlarge the overall training set",
      "Measuring a trained model's accuracy on a held-out test set and reporting that score"
    ],
    explain: "Feature engineering is the craft of shaping raw data — cleaning, encoding, scaling, combining, and deriving new columns — so the patterns a model needs become easy to read. It happens before training and is often the biggest lever on real-world performance, more than the choice of algorithm. Better features frequently beat a fancier model on the same raw data.",
    simple: "It is prep-cooking for a model: raw ingredients rarely go straight in the pot. You chop, measure, and mix the data into features the model can actually digest.",
    widget: {
      type: "curveStatic", title: "Good features lift accuracy",
      world: "Sweep how much effort you put into shaping raw data into useful features and watch model accuracy.",
      xlab: "feature-engineering effort →", xs: [0,1,2,3,4],
      labels: ["raw data","tidy","+encoding","+scaling","+new feats"], dec: 0, yunit: "%",
      series: [ { name: "model accuracy", ys: [62,70,77,82,88] } ],
      knob: { label: "Feature work", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Just tidying the raw data already nudges accuracy up.", tone: "info" },
        { max: 3, text: "Encoding categories and scaling numbers lets the model read more of the signal.", tone: "info" },
        { max: 4, text: "🤯 Same rows, same algorithm — only the features changed, and accuracy jumped from 62% to 88%.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Feature engineering", formula: "raw data → informative features", text: "Reshaping data into good features often helps more than swapping in a fancier model." }
    }
  });

  def("feng1", {
    q: "In machine learning, what is a 'feature'?",
    choices: [
      "A single measurable input column the model reads, like age or price",
      "The final prediction the model outputs after reading all of its input columns",
      "One row of data representing a single labeled example in the training table",
      "The learning algorithm used to fit the data and estimate the model's weights",
      "The error between the prediction and the truth, averaged over the whole test set"
    ],
    explain: "A feature is one input variable — a column in your table — that describes each example, such as square footage, temperature, or category. A model learns a relationship from the features to the target it predicts. More informative features give the model more to work with.",
    simple: "Think of a spreadsheet: each row is one example, and each column describing it is a feature. Age, price, and color would each be separate features.",
    widget: {
      type: "curveStatic", title: "More features, more to see",
      world: "Add measurable columns describing each house and watch how much of the price the model can explain.",
      xlab: "features given to model →", xs: [0,1,2,3,4],
      labels: ["none","+size","+beds","+age","+location"], dec: 0, yunit: "%",
      series: [ { name: "price variance explained", ys: [0,40,58,70,80] } ],
      knob: { label: "Features added", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Size alone already explains a big chunk of price.", tone: "info" },
        { max: 3, text: "Each extra descriptive column adds another slice of explanation.", tone: "info" },
        { max: 4, text: "🤯 With no features the model is blind; every good feature is another window onto the answer.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Feature", formula: "one input column per example", text: "A feature is a measurable column describing each example; models learn from features to a target." }
    }
  });

  def("feng1", {
    q: "What does one-hot encoding do to a categorical column like Color (red / green / blue)?",
    choices: [
      "Creates one new 0/1 column per category, with a 1 marking the row's category",
      "Replaces each category with a single integer code such as 0, 1, or 2 in one column",
      "Ranks the categories from smallest to largest and stores their position as a number",
      "Scales the column so it has mean 0 and a standard deviation of exactly 1 per row",
      "Deletes the column entirely because most models cannot read raw text categories"
    ],
    explain: "One-hot encoding turns one category column into several 0/1 indicator columns — one per possible value — where exactly one column is 1 for each row. This lets a model use categories as numbers without inventing a false order between them. It is the standard encoding for unordered categories with few distinct values.",
    simple: "It gives every category its own on/off switch. A red row flips the 'red' switch to 1 and leaves 'green' and 'blue' at 0.",
    widget: {
      type: "curveStatic", title: "One column per category",
      world: "Grow the number of categories in a Color column and count the 0/1 columns one-hot creates.",
      xlab: "categories in column →", xs: [0,1,2,3,4],
      labels: ["1","2","3","4","5"], dec: 0, yunit: "cols",
      series: [ { name: "one-hot columns", ys: [1,2,3,4,5] } ],
      knob: { label: "Distinct categories", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Two categories become two 0/1 columns.", tone: "info" },
        { max: 3, text: "The column count grows one-for-one with the categories.", tone: "info" },
        { max: 4, text: "🤯 Exactly one column lights up per row — a tidy on/off switch for every category.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "One-hot encoding", formula: "k categories → k 0/1 columns", text: "Each category gets its own indicator column, avoiding any fake ordering." }
    }
  });

  def("feng1", {
    q: "What is ordinal encoding?",
    choices: [
      "Replacing ordered categories with integers that reflect their rank (small=0, medium=1, large=2)",
      "Creating a separate 0/1 indicator column for every distinct category and dropping the original",
      "Rescaling the raw numbers into the fixed range 0 to 1 using the column's minimum and maximum",
      "Removing every row that has a missing or blank category label before the model is ever trained",
      "Averaging the target value observed within each category and storing that mean as the new code"
    ],
    explain: "Ordinal encoding maps categories to integers whose order matches a real ranking, like sizes S < M < L < XL. It is appropriate only when the categories genuinely have an order, because the model will treat the numbers as ordered. Using it on unordered labels invents a false ranking.",
    simple: "It numbers categories that already come in order, like clothing sizes 0, 1, 2, 3. The numbers mean 'bigger', so use it only when bigger is real.",
    widget: {
      type: "curveStatic", title: "Codes follow the real order",
      world: "Encode ordered sizes S < M < L < XL < XXL and watch the integer code climb with the true order.",
      xlab: "size category →", xs: [0,1,2,3,4],
      labels: ["S","M","L","XL","XXL"], dec: 0, yunit: "",
      series: [ { name: "integer code", ys: [0,1,2,3,4] } ],
      knob: { label: "Size", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "S=0, M=1 — the codes rise as the sizes do.", tone: "info" },
        { max: 3, text: "The order of the numbers mirrors the order of the sizes.", tone: "info" },
        { max: 4, text: "🤯 Because the ranking is real, the model can use 'bigger number = bigger size' correctly.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Ordinal encoding", formula: "ordered category → ranked integer", text: "Map categories to integers only when their order is genuine." }
    }
  });

  def("feng1", {
    q: "What is feature scaling?",
    choices: [
      "Putting numeric features onto a comparable range so no single one dominates by sheer size",
      "Selecting which of the many features to keep and which ones to delete before any training",
      "Turning unordered category labels into separate 0/1 indicator columns, one per category value",
      "Filling in every missing value in the column with that column's arithmetic mean or median",
      "Taking the natural logarithm of every numeric column to squash its long right-hand tail"
    ],
    explain: "Feature scaling rescales numeric columns so they occupy comparable ranges, for example by standardization or min-max normalization. Without it, a feature measured in thousands can swamp one measured in single digits for models that use distances or gradients. It changes the numbers' scale, not their information.",
    simple: "It is like converting everyone's measurements to the same units before comparing. Otherwise a feature in dollars would shout over a feature in years.",
    widget: {
      type: "curveStatic", title: "Ranges made comparable",
      world: "Before scaling, income towers over age; sweep toward scaling and watch their ranges become comparable.",
      xlab: "scaling applied →", xs: [0,1,2,3,4],
      labels: ["none","light","half","most","full"], dec: 0, yunit: "",
      series: [ { name: "income spread", ys: [100,75,50,25,1] }, { name: "age spread", ys: [1,1,1,1,1] } ],
      knob: { label: "Scaling amount", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Unscaled, income's spread is ~100× age's.", tone: "info" },
        { max: 3, text: "As scaling kicks in, income's oversized range shrinks toward age's.", tone: "info" },
        { max: 4, text: "🤯 Fully scaled, both features share one range — neither can bully the other by size.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Feature scaling", formula: "features → comparable ranges", text: "Rescaling stops big-numbered features from dominating distance- and gradient-based models." }
    }
  });

  def("feng1", {
    q: "What is standardization (z-score scaling) of a feature?",
    choices: [
      "Subtracting the mean and dividing by the standard deviation, so it has mean 0 and spread 1",
      "Squeezing the values into the fixed range 0 to 1 using the column's minimum and maximum",
      "Replacing each value with its rank order position, so the smallest becomes 1 and so on up",
      "Taking the natural logarithm of every value to pull in a long, heavy right-hand tail",
      "Turning the numeric feature into several 0/1 category columns split at equal-width cutoffs"
    ],
    explain: "Standardization transforms a feature to z = (x − mean) / std, giving it mean 0 and standard deviation 1. Values then read as 'how many standard deviations from average', which suits many linear, distance, and gradient-based models. It does not bound values to a fixed range.",
    simple: "It re-centers a column on zero and stretches it so a spread of 1 is normal. A value of +2 then simply means 'two standard deviations above average'.",
    widget: {
      type: "curveStatic", title: "Mean → 0, spread → 1",
      world: "Standardize a feature and watch its mean slide to 0 while its spread settles to 1.",
      xlab: "standardization applied →", xs: [0,1,2,3,4],
      labels: ["raw","¼","½","¾","full"], dec: 0, yunit: "",
      series: [ { name: "mean", ys: [50,37,25,12,0] }, { name: "std", ys: [20,15,10,5,1] } ],
      knob: { label: "Amount applied", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Raw column sits at mean 50 with a wide spread.", tone: "info" },
        { max: 3, text: "The center drifts toward 0 and the spread tightens.", tone: "info" },
        { max: 4, text: "🤯 Fully standardized: mean exactly 0, spread exactly 1 — the z-score.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Standardization", formula: "z = (x − mean) / std", text: "Recenters to mean 0 and rescales to standard deviation 1; values become z-scores." }
    }
  });

  def("feng1", {
    q: "What is min-max normalization?",
    choices: [
      "Rescaling a feature so its smallest value becomes 0 and its largest becomes 1",
      "Subtracting the column mean and then dividing by its standard deviation to get a z-score",
      "Replacing each value with its natural logarithm to compress the largest numbers the most",
      "Grouping the continuous values into a handful of equal-width bins labeled low up to high",
      "Averaging the target value seen within each distinct value and storing that as the code"
    ],
    explain: "Min-max normalization maps a feature with x' = (x − min) / (max − min), placing every value into the fixed range 0 to 1. It preserves the shape of the distribution but is sensitive to outliers, since a single extreme value stretches the range. It is handy when a bounded 0–1 input is desired.",
    simple: "It stretches or squeezes a column so the smallest number lands on 0 and the biggest on 1, with everything else in between.",
    widget: {
      type: "curveStatic", title: "Smallest → 0, largest → 1",
      world: "Apply min-max scaling and watch the largest value slide to 1 and the smallest to 0.",
      xlab: "min-max applied →", xs: [0,1,2,3,4],
      labels: ["raw","¼","½","¾","full"], dec: 2, yunit: "",
      series: [ { name: "max value", ys: [200,150,100,50,1] }, { name: "min value", ys: [20,15,10,5,0] } ],
      knob: { label: "Amount applied", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Raw values run from 20 up to 200.", tone: "info" },
        { max: 3, text: "The range compresses toward the 0–1 window.", tone: "info" },
        { max: 4, text: "🤯 Fully normalized: min sits at 0 and max at 1, exactly.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Min-max normalization", formula: "x' = (x − min) / (max − min)", text: "Maps values into 0–1; simple but sensitive to outliers stretching the range." }
    }
  });

  def("feng1", {
    q: "What is imputation?",
    choices: [
      "Filling in missing values with a substitute such as the column's mean or median",
      "Deleting every column that contains even a single blank or missing entry anywhere in it",
      "Scaling the numeric features into the range 0 to 1 using their own minimum and maximum",
      "Encoding each unordered category as its own separate 0/1 indicator column of values",
      "Selecting only the handful of most predictive features and discarding the weaker columns"
    ],
    explain: "Imputation replaces missing entries with estimated stand-ins so the row can still be used, commonly the mean or median for numbers and the most frequent value for categories. It avoids throwing away otherwise-good rows. Like any transform, its statistics must be learned from the training data only.",
    simple: "When a cell is blank, imputation pencils in a sensible guess — often the column's typical value — instead of tossing out the whole row.",
    widget: {
      type: "curveStatic", title: "Impute vs delete rows",
      world: "Raise the fraction of missing values and compare how many rows survive if you impute vs drop them.",
      xlab: "% values missing →", xs: [0,1,2,3,4],
      labels: ["1%","5%","10%","20%","30%"], dec: 0, yunit: "%",
      series: [ { name: "rows kept if imputed", ys: [100,100,100,100,100] }, { name: "rows kept if dropped", ys: [95,80,65,40,20] } ],
      knob: { label: "Missingness", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With little missing data, dropping rows is nearly harmless.", tone: "info" },
        { max: 3, text: "As gaps spread, dropping rows quietly discards a lot of data.", tone: "info" },
        { max: 4, text: "🤯 At 30% missing, deleting rows throws away 80% of your data — imputation keeps it all.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Imputation", formula: "blank → estimated value (mean/median)", text: "Fill gaps instead of deleting rows; learn the fill value from training data only." }
    }
  });

  q("feng1", {
    q: "A k-nearest-neighbours model uses income (0–100,000) and age (0–100) with no scaling. Why do its distances become almost meaningless?",
    choices: [
      "Income's huge range dominates the distance, so age barely counts",
      "kNN cannot read numeric columns at all unless you one-hot encode each of them first",
      "Age and income are strongly correlated, which quietly breaks the distance formula itself",
      "Distances only ever work when every single feature in the table is a category label",
      "The model automatically decides to ignore the smaller-ranged feature all on its own"
    ],
    explain: "Distance-based models like kNN add up squared differences across features, so a feature spanning tens of thousands drowns out one spanning tens. Age differences become invisible next to income differences, and 'nearest' effectively means 'similar income'. Standardizing or normalizing first puts both features on equal footing.",
    simple: "If you measure closeness by adding dollars and years together, dollars win by a landslide. Scaling first lets age get a fair vote.",
    widget: {
      type: "curveStatic", title: "The big feature drowns the small",
      world: "Widen income's range while age stays 0–100 and watch age's share of the kNN distance vanish.",
      xlab: "income range (×1000) →", xs: [0,1,2,3,4],
      labels: ["×1","×10","×50","×100","×500"], dec: 0, yunit: "%",
      series: [ { name: "age's share of distance", ys: [50,20,5,2,0] } ],
      knob: { label: "Income scale", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "On equal ranges, age and income each contribute ~half.", tone: "info" },
        { max: 3, text: "As income's range grows, age's influence collapses.", tone: "info" },
        { max: 4, text: "🤯 With income 500× wider, age contributes ~0% — 'nearest' just means 'same income'.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Why scaling matters", formula: "distance ≈ dominated by widest feature", text: "Unscaled features let the largest-range column control distance-based models." }
    }
  });

  q("feng1", {
    q: "You switch from kNN to a decision tree / random forest. Do you still need to scale income and age first?",
    choices: [
      "No — trees split one feature at a time by thresholds, so feature scale does not matter",
      "Yes — trees also measure straight-line Euclidean distances between all of the data points",
      "Yes — trees simply fail to run unless every feature lies between exactly 0 and 1 first",
      "No — but only because tree libraries quietly scale the data for you behind the scenes",
      "Yes — otherwise the tree can only ever split on the single largest-ranged feature there"
    ],
    explain: "Trees split on questions like 'income > 50,000?', comparing a single feature to a threshold. Rescaling that feature just moves the threshold, so the resulting splits and predictions are unchanged. This scale-invariance is why tree-based models generally do not need feature scaling, unlike distance- and gradient-based ones.",
    simple: "A tree asks yes/no questions one feature at a time, so stretching a column's numbers does not change the answers. Scaling is optional for trees.",
    widget: {
      type: "curveStatic", title: "Trees shrug at scale",
      world: "Scale the features more and more and compare a tree's accuracy with kNN's.",
      xlab: "scaling applied →", xs: [0,1,2,3,4],
      labels: ["none","¼","½","¾","full"], dec: 0, yunit: "%",
      series: [ { name: "tree accuracy", ys: [85,85,85,85,85] }, { name: "kNN accuracy", ys: [60,68,74,80,85] } ],
      knob: { label: "Scaling amount", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "kNN starts weak on unscaled data; the tree is already fine.", tone: "info" },
        { max: 3, text: "Scaling steadily rescues kNN but does nothing to the tree.", tone: "info" },
        { max: 4, text: "🤯 The tree's line is flat — its threshold splits do not care about scale at all.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "When NOT to scale", formula: "tree split: feature > threshold", text: "Threshold-based trees are scale-invariant, so scaling helps distance/gradient models, not trees." }
    }
  });

  q("feng1", {
    q: "House prices are heavily right-skewed: most are cheap, a few are enormous. Which transform usually makes the distribution more symmetric and easier to model?",
    choices: [
      "Take the logarithm of price",
      "Square every price",
      "One-hot encode the price",
      "Multiply every price by 1000",
      "Round every price to the nearest thousand"
    ],
    explain: "A log transform compresses large values much more than small ones, pulling in a long right tail toward symmetry. That often stabilizes variance and helps linear models, which assume errors are not dominated by a few giant values. Squaring or rescaling by a constant does not change the shape of the skew.",
    simple: "Logs squash the giants and leave the small ones roughly alone, so a lopsided pile of prices becomes a tidier bell-ish shape.",
    widget: {
      type: "curveStatic", title: "Log tames the tail",
      world: "Apply a log transform to right-skewed prices and watch the skewness fall toward symmetric.",
      xlab: "log transform applied →", xs: [0,1,2,3,4],
      labels: ["raw","¼","½","¾","full"], dec: 1, yunit: "",
      series: [ { name: "skewness", ys: [3.0,2.2,1.4,0.7,0.1] } ],
      knob: { label: "Amount applied", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Raw prices are strongly right-skewed (skew ≈ 3).", tone: "info" },
        { max: 3, text: "Logging pulls the long tail in and the skew drops.", tone: "info" },
        { max: 4, text: "🤯 After a full log transform the distribution is nearly symmetric (skew ≈ 0).", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Log transform for skew", formula: "x → log(x)", text: "Logs compress large values, straightening a right-skewed feature toward symmetry." }
    }
  });

  q("feng1", {
    q: "A numeric column is missing 3% of its values. Which is a reasonable, simple first strategy?",
    choices: [
      "Fill the blanks with the column's median (impute)",
      "Delete the entire column",
      "Replace every value in the column with 0",
      "Set the missing entries to a random huge number",
      "Drop all columns that have any missing value at all"
    ],
    explain: "With only a small fraction missing, median imputation keeps every row and barely disturbs the column's center, and the median resists outliers better than the mean. Deleting the column throws away useful signal, and filling with 0 or a huge number distorts the distribution. The imputer's median must be learned from the training set.",
    simple: "For a few gaps, pencil in the column's middle value. It keeps all your rows and hardly moves the typical value.",
    widget: {
      type: "curveStatic", title: "Some fills distort, some don't",
      world: "Fill 3%-missing blanks with different values and watch how far the column's average drifts from the truth.",
      xlab: "fill strategy →", xs: [0,1,2,3,4],
      labels: ["median","mean","random","zero","huge#"], dec: 0, yunit: "",
      series: [ { name: "distortion of average", ys: [1,2,10,25,200] } ],
      knob: { label: "Strategy", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Median (and mean) barely move the column's average.", tone: "info" },
        { max: 3, text: "Random or zero fills start pulling the average off-target.", tone: "info" },
        { max: 4, text: "🤯 Filling gaps with a huge number wrecks the column's statistics — 200× distortion.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Missing-data strategy", formula: "few gaps → median impute", text: "Median imputation keeps rows and resists outliers; avoid 0 or arbitrary fills that distort the column." }
    }
  });

  q("feng1", {
    q: "Your data has a raw timestamp like 2026-07-13 09:00. Which engineered features are most likely to help predict store sales?",
    choices: [
      "Day-of-week, month, and is-weekend pulled from the timestamp",
      "The raw timestamp string fed straight into the model as unparsed text characters",
      "The number of characters in the timestamp string counted as a single numeric feature",
      "A single 0/1 column simply marking that some date value exists in that row at all",
      "The timestamp converted to a number and then multiplied by the row's index position"
    ],
    explain: "Sales patterns follow the calendar, so extracting day-of-week, month, and weekend flags exposes the seasonality a raw timestamp hides. The model can then learn 'weekends sell more' directly. The raw string or its character count carries none of that structure in usable form.",
    simple: "A timestamp is packed with clues — which day, which month, weekend or not. Unpacking those into their own columns hands the model the pattern.",
    widget: {
      type: "curveStatic", title: "Unpacking the calendar",
      world: "Pull more calendar parts out of a raw timestamp and watch how much sales signal becomes usable.",
      xlab: "date features extracted →", xs: [0,1,2,3,4],
      labels: ["raw stamp","+hour","+day-of-week","+month","+is-weekend"], dec: 0, yunit: "%",
      series: [ { name: "usable sales signal", ys: [10,35,60,75,85] } ],
      knob: { label: "Parts extracted", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "The raw stamp alone barely helps.", tone: "info" },
        { max: 3, text: "Day-of-week and month unlock the weekly and seasonal patterns.", tone: "info" },
        { max: 4, text: "🤯 A weekend flag pushes usable signal to 85% — all hidden inside one timestamp.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Datetime features", formula: "timestamp → day, month, is-weekend", text: "Extract calendar parts from timestamps to expose seasonality models can learn." }
    }
  });

  q("feng1", {
    q: "A column City has values New York, Paris, and Tokyo with no natural order. Which encoding is appropriate?",
    choices: [
      "One-hot encoding — the categories have no rank",
      "Ordinal encoding 0, 1, 2 — the model needs an order",
      "Standardization — subtract the mean city",
      "A log transform of the city names",
      "Leave the text as-is; models read words fine"
    ],
    explain: "Cities have no inherent ordering, so ordinal codes would falsely tell the model Tokyo (2) is 'greater than' New York (0). One-hot encoding gives each city its own indicator column and avoids inventing any ranking. For a handful of unordered categories this is the standard choice.",
    simple: "Since no city is 'more' than another, give each its own on/off column instead of numbering them 0, 1, 2 and implying a rank.",
    widget: {
      type: "curveStatic", title: "Ordinal invents a fake rank",
      world: "Ordinal-encode unordered cities (NY=0, Paris=1, …) and watch a meaningless 'rank' appear between them.",
      xlab: "ordinal code assigned →", xs: [0,1,2,3,4],
      labels: ["NY=0","Paris=1","Tokyo=2","Berlin=3","Cairo=4"], dec: 0, yunit: "",
      series: [ { name: "implied rank (meaningless)", ys: [0,1,2,3,4] } ],
      knob: { label: "City index", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "The model now reads Paris as 'greater than' New York.", tone: "info" },
        { max: 3, text: "The made-up order keeps climbing with no real meaning.", tone: "info" },
        { max: 4, text: "🤯 Ordinal says Cairo is '4× New York' — pure nonsense, which is why one-hot is right here.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "One-hot vs ordinal", formula: "unordered → one-hot", text: "Use one-hot for unordered categories; ordinal only when a real ranking exists." }
    }
  });

  q("feng1", {
    q: "Why might you bin a continuous 'age' feature into groups like child / adult / senior?",
    choices: [
      "To capture non-linear effects and blunt the impact of outliers",
      "To make the model train much more slowly on purpose for easier step-by-step debugging",
      "Because most models simply cannot read any raw numeric column without bucketing it first",
      "To guarantee strictly higher accuracy in every single case, with no possible downside at all",
      "To convert the plain age numbers into a proper calendar date the model can then parse"
    ],
    explain: "Binning turns a continuous value into ordered groups, letting a simple model capture effects that jump at certain ages rather than assuming a straight line. It also reduces the sway of extreme values by lumping them into an end bucket. The trade-off is some loss of fine-grained detail.",
    simple: "Sometimes what matters is the life stage, not the exact age. Grouping ages into child/adult/senior lets the model react to the stage and ignore odd outliers.",
    widget: {
      type: "curveStatic", title: "Bins catch a non-linear jump",
      world: "Bin a continuous age into buckets and watch the model capture a non-linear pattern a straight line missed.",
      xlab: "age bins used →", xs: [0,1,2,3,4],
      labels: ["1 (linear)","2","3","4","5"], dec: 0, yunit: "%",
      series: [ { name: "fit quality", ys: [60,72,80,84,85] } ],
      knob: { label: "Number of bins", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A single straight line underfits the age effect.", tone: "info" },
        { max: 3, text: "A few bins let the model bend at the right ages.", tone: "info" },
        { max: 4, text: "🤯 Grouping ages captures the jump between life stages a line could never bend to.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Binning benefit", formula: "continuous → ordered buckets", text: "Bins capture non-linear, stage-like effects and reduce outlier influence, at the cost of detail." }
    }
  });

  /* ============================ feng2 — Part II · Practice (9) ============================ */

  def("feng2", {
    q: "What is binning (discretization)?",
    choices: [
      "Grouping a continuous number into a small set of ranges or buckets",
      "Scaling a numeric feature so that it ends up with a mean of 0 and a standard deviation of 1",
      "Creating one separate 0/1 indicator column for each distinct category found in the data",
      "Filling in all of the missing values in a column with that column's own median value",
      "Multiplying two separate numeric features together to form a single new interaction term"
    ],
    explain: "Binning (discretization) cuts a continuous feature into intervals — such as ages 0–17, 18–64, 65+ — and represents each value by its bucket. This can expose stage-like effects and reduce outlier influence, though it discards within-bucket detail. Bins can be equal-width, equal-frequency, or chosen by domain knowledge.",
    simple: "It sorts a range of numbers into labeled boxes, like grouping ages into child, adult, and senior. Each value is then just 'which box'.",
    widget: {
      type: "curveStatic", title: "Slicing a range into boxes",
      world: "Cut a continuous feature into more buckets and watch how many distinct groups the model sees.",
      xlab: "number of bins →", xs: [0,1,2,3,4],
      labels: ["1","2","3","4","5"], dec: 0, yunit: "bins",
      series: [ { name: "buckets", ys: [1,2,3,4,5] } ],
      knob: { label: "Bins", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Two bins split the range into low and high.", tone: "info" },
        { max: 3, text: "More bins give finer groups but less data per bucket.", tone: "info" },
        { max: 4, text: "🤯 Bins trade exact numbers for tidy, robust groups the model can key off.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Binning", formula: "continuous → interval buckets", text: "Discretizes a number into ranges; exposes stage effects and curbs outliers, losing fine detail." }
    }
  });

  def("feng2", {
    q: "What is an interaction feature?",
    choices: [
      "A new feature made by combining two others (e.g., price × quantity) to capture their joint effect",
      "A single existing feature that has simply been rescaled into the fixed range 0 to 1 using min-max",
      "One unordered category column that has been turned into a set of separate 0/1 indicator columns",
      "The single most predictive feature in the whole dataset, ranked first by its own importance score",
      "An ordinary feature whose missing values have all been filled in with the column's mean value first"
    ],
    explain: "An interaction feature encodes how two features act together — often their product — capturing effects that neither explains alone, like price × quantity giving total spend. Linear models cannot represent such combined effects unless you build the interaction explicitly. Trees can find some interactions on their own.",
    simple: "It multiplies two clues into one, like price times quantity to get the total. The whole tells the model something the parts alone cannot.",
    widget: {
      type: "curveStatic", title: "Two features, joint effect",
      world: "Add an interaction term price×quantity and watch the model capture 'total spend' it couldn't from either alone.",
      xlab: "features used →", xs: [0,1,2,3,4],
      labels: ["price only","qty only","both sep.","+interaction","+scaled"], dec: 0, yunit: "%",
      series: [ { name: "revenue predicted", ys: [40,42,60,85,86] } ],
      knob: { label: "Feature set", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Price or quantity alone explains revenue poorly.", tone: "info" },
        { max: 3, text: "Both separately help, but the joint effect is still missing.", tone: "info" },
        { max: 4, text: "🤯 Adding price×quantity jumps the fit to 85% — the product is what revenue really is.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Interaction feature", formula: "new = feat_a × feat_b", text: "Combines two features to capture joint effects a linear model can't otherwise see." }
    }
  });

  def("feng2", {
    q: "What is a log transform of a feature?",
    choices: [
      "Replacing each value with its logarithm to compress large values and reduce right-skew",
      "Scaling the numeric feature into the range 0 to 1 using its own minimum and maximum values",
      "Splitting the continuous feature into several equal-width bins labeled from low up to high",
      "Turning the numeric feature into a set of separate 0/1 category indicator columns per bucket",
      "Averaging the observed target value within each level of the feature and storing that mean"
    ],
    explain: "A log transform maps x to log(x), shrinking big values far more than small ones and pulling in a long right tail. It stabilizes variance and helps models that assume roughly symmetric, additive effects. It requires positive values, so a small offset like log(x + 1) is common.",
    simple: "It replaces each number with its logarithm, squashing the giants so a lopsided column becomes more even.",
    widget: {
      type: "curveStatic", title: "Compressing the giants",
      world: "Apply a log transform and watch a huge value's dominance shrink next to ordinary ones.",
      xlab: "log applied →", xs: [0,1,2,3,4],
      labels: ["raw","¼","½","¾","full"], dec: 0, yunit: "×",
      series: [ { name: "biggest ÷ typical", ys: [1000,180,32,8,2] } ],
      knob: { label: "Amount applied", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Raw, the biggest value is 1000× a typical one.", tone: "info" },
        { max: 3, text: "Logging steadily shrinks that gap.", tone: "info" },
        { max: 4, text: "🤯 After a full log transform the giant is only ~2× typical — no longer a bully.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Log transform", formula: "x → log(x) (or log(x+1))", text: "Compresses large values, reducing right-skew and stabilizing variance; needs positive inputs." }
    }
  });

  def("feng2", {
    q: "What is feature extraction?",
    choices: [
      "Deriving new, more informative features from raw data such as text, images, or dates",
      "Selecting a smaller subset of the existing features and then deleting all of the rest of them",
      "Removing every row that happens to contain one or more missing values before any training",
      "Scaling the numeric features so that each ends up with a mean of 0 and a variance of exactly 1",
      "Choosing the single model with the highest measured accuracy on the held-out test set of rows"
    ],
    explain: "Feature extraction builds new representations from raw or complex data — for example word counts from text, edges from images, or day-of-week from a timestamp. It differs from feature selection, which keeps a subset of features you already have. The goal is to turn hard-to-use raw data into columns a model can learn from.",
    simple: "It mines useful new columns out of messy raw stuff like text or dates. Selection just picks among columns you already have; extraction creates them.",
    widget: {
      type: "curveStatic", title: "Mining features from raw data",
      world: "Derive new features from a raw text/date column and watch the model's usable inputs grow.",
      xlab: "extraction depth →", xs: [0,1,2,3,4],
      labels: ["raw text","+counts","+tf-idf","+length","+sentiment"], dec: 0, yunit: "",
      series: [ { name: "usable features", ys: [1,20,120,121,122] } ],
      knob: { label: "Extraction", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "One raw text column is nearly unusable on its own.", tone: "info" },
        { max: 3, text: "Word counts and TF-IDF turn it into many numeric features.", tone: "info" },
        { max: 4, text: "🤯 One text field becomes 100+ learnable columns — extraction, not selection.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Feature extraction", formula: "raw data → new derived features", text: "Creates informative columns from raw text/images/dates; distinct from selecting existing ones." }
    }
  });

  q("feng2", {
    q: "Hour-of-day runs 0…23, but hour 23 and hour 0 are actually adjacent. How do you encode this so the model knows midnight wraps around?",
    choices: [
      "Use the sine and cosine of the hour (cyclical encoding)",
      "Feed the raw hour value 0 to 23 straight into the model as one plain number",
      "One-hot encode the hour into 24 completely unrelated columns and simply stop there",
      "Take the natural logarithm of the hour value to compress the later hours of the day",
      "Standardize the hour so it has a mean of exactly 0 and a spread of exactly 1"
    ],
    explain: "Encoding an angle as (sin, cos) places 23:00 and 00:00 right next to each other on a circle, so the model sees them as similar. A raw number makes them look 23 apart, and plain one-hot treats every hour as unrelated, losing the ordering entirely. This cyclical trick suits hours, days-of-week, and months.",
    simple: "Put the clock on a circle instead of a line: then 11pm sits next to midnight, not 23 steps away. Sine and cosine draw that circle for the model.",
    widget: {
      type: "curveStatic", title: "Making midnight wrap around",
      world: "Change how you encode hour-of-day and watch the gap between 11pm and midnight collapse.",
      xlab: "encoding method →", xs: [0,1,2,3,4],
      labels: ["raw hour","one-hot","label","sin only","sin+cos"], dec: 1, yunit: "",
      series: [ { name: "11pm↔midnight distance", ys: [23,23,23,5,0.3] } ],
      knob: { label: "Encoding", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Raw and one-hot both treat 11pm and midnight as far apart.", tone: "info" },
        { max: 3, text: "Sine alone starts bringing them closer.", tone: "info" },
        { max: 4, text: "🤯 With sin+cos, 11pm and midnight are essentially adjacent — the clock finally wraps.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Cyclical encoding", formula: "hour → (sin θ, cos θ)", text: "Sine/cosine put cyclic values on a circle so the ends (23:00 and 00:00) sit next to each other." }
    }
  });

  q("feng2", {
    q: "A column has 5,000 unique product IDs. Why is plain one-hot encoding a poor choice here?",
    choices: [
      "It explodes into 5,000 sparse columns, bloating memory and hurting learning",
      "One-hot encoding only ever works on numeric columns, never on product ID labels like these",
      "One-hot would silently rank the 5,000 products into the wrong numerical order for the model",
      "One-hot automatically deletes the rare products, quietly dropping most of the 5,000 IDs first",
      "One-hot encoding actually requires access to the target column before it can run at all here"
    ],
    explain: "One-hot encoding adds one column per category, so 5,000 IDs create 5,000 mostly-zero columns — huge, sparse, and starved of examples per column. This inflates memory and can hurt models that struggle with very wide, sparse input. High-cardinality columns are better handled by target encoding, feature hashing, or grouping rare values.",
    simple: "Giving 5,000 IDs their own switch each makes a giant, nearly-empty table. For that many categories you need a smarter, more compact encoding.",
    widget: {
      type: "curveStatic", title: "One-hot explodes with cardinality",
      world: "Grow the number of unique product IDs and watch one-hot's column count explode.",
      xlab: "unique categories →", xs: [0,1,2,3,4],
      labels: ["10","100","1k","3k","5k"], dec: 0, yunit: "cols",
      series: [ { name: "one-hot columns", ys: [10,100,1000,3000,5000] } ],
      knob: { label: "Distinct IDs", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A handful of categories is perfectly fine for one-hot.", tone: "info" },
        { max: 3, text: "Thousands of categories mean thousands of sparse columns.", tone: "info" },
        { max: 4, text: "🤯 5,000 IDs → 5,000 columns, each almost all zeros — time for hashing or target encoding.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "High-cardinality encoding", formula: "5,000 cats → 5,000 sparse cols", text: "One-hot doesn't scale to many categories; use target encoding, hashing, or rare-grouping." }
    }
  });

  q("feng2", {
    q: "You standardize your features using the mean and standard deviation of the ENTIRE dataset, then split into train/test. What is wrong?",
    choices: [
      "Test information leaks into training; fit the scaler on train only, then apply it to test",
      "Nothing at all is wrong here — using every available row makes the scaling far more accurate",
      "You should never standardize any features under any circumstances, since it distorts them all",
      "The mean and standard deviation must instead be computed only from the held-out test set rows",
      "Scaling should really be redone from scratch separately for each and every single data row"
    ],
    explain: "Computing the mean and std over all data lets the test set influence the transform, so your test score is optimistically biased and won't hold up in production. The fix is to fit the scaler on the training split alone and merely apply the learned statistics to the test set. Wrapping steps in a Pipeline enforces this automatically inside cross-validation.",
    simple: "If your scaler has already peeked at the test data, the test score is a rehearsal, not an exam. Learn the scaling from training data only, then apply it.",
    widget: {
      type: "curveStatic", title: "Peeking inflates your score",
      world: "Let the scaler see more of the TEST set and watch the reported score drift dishonestly high.",
      xlab: "test data leaked into scaler →", xs: [0,1,2,3,4],
      labels: ["0% (right)","10%","30%","60%","100%"], dec: 0, yunit: "%",
      series: [ { name: "reported test accuracy", ys: [82,85,88,92,96] }, { name: "true accuracy", ys: [82,82,82,82,82] } ],
      knob: { label: "Leakage", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Fit on train only, reported score matches the truth.", tone: "info" },
        { max: 3, text: "As the scaler peeks at test data, the reported score creeps up.", tone: "info" },
        { max: 4, text: "🤯 Fit on everything, you 'score' 96% but really have 82% — a mirage that fails in production.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Leakage: fit on train only", formula: "scaler.fit(train); scaler.transform(test)", text: "Fitting transforms on all data leaks test info; fit on train, apply to test — a Pipeline enforces it." }
    }
  });

  q("feng2", {
    q: "A category column has 50 values, but 40 of them appear fewer than 5 times each. A common fix is to…",
    choices: [
      "Group the rare categories into a single 'Other' bucket",
      "Delete every row that has a rare category",
      "Give each rare category its own one-hot column and keep them all",
      "Replace the whole column with random numbers",
      "Standardize the category labels to mean 0"
    ],
    explain: "Categories seen only a few times give the model too little to learn from and can cause overfitting or unseen values at test time. Folding them into a shared 'Other' bucket yields stable, well-populated columns while preserving the common categories. This is a standard way to tame long-tailed categoricals.",
    simple: "Categories that show up only a handful of times are noise. Sweep them into one 'Other' pile so the model learns from groups big enough to trust.",
    widget: {
      type: "curveStatic", title: "Folding the long tail into 'Other'",
      world: "Fold rarely-seen categories into one 'Other' bucket and watch the flimsy columns shrink to something stable.",
      xlab: "rare-grouping applied →", xs: [0,1,2,3,4],
      labels: ["none","top-40","top-20","top-10","top-5+Other"], dec: 0, yunit: "cols",
      series: [ { name: "columns kept", ys: [50,40,20,10,6] } ],
      knob: { label: "Grouping", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Keeping all 50 categories means many nearly-empty columns.", tone: "info" },
        { max: 3, text: "Grouping the rarest ones cuts the column count fast.", tone: "info" },
        { max: 4, text: "🤯 Top-5 plus one 'Other' bucket: 6 solid columns instead of 50 flimsy ones.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Rare-category grouping", formula: "rare values → 'Other'", text: "Merge infrequent categories into one bucket for stable columns and fewer overfitting/unseen-value issues." }
    }
  });

  q("feng2", {
    q: "A straight-line model underfits data that clearly curves. Adding x² and x³ as new features lets it…",
    choices: [
      "Fit curved (non-linear) relationships while still using a linear model",
      "Reduce the total number of input features that the linear model has to consider at once",
      "Guarantee that the model will never overfit its training data no matter the chosen degree",
      "Convert the continuous numeric target column into a set of discrete category labels first",
      "Remove any need to scale the data because polynomial terms already share one common scale"
    ],
    explain: "Polynomial features (x², x³, cross terms) give a linear model extra inputs it can weight to bend its fit, capturing curvature without changing the algorithm. Raising the degree too far, though, lets the model chase noise and overfit — test error rises even as training error falls. The degree is a knob to tune.",
    simple: "Feed the model x, x², and x³ and it can draw curves instead of just straight lines. Go too high and it starts memorizing wiggles that aren't real.",
    widget: {
      type: "curveStatic", title: "Curvature, then overfitting",
      world: "Raise the polynomial degree and watch a curved pattern get fit — until the model starts overfitting.",
      xlab: "polynomial degree →", xs: [0,1,2,3,4],
      labels: ["1 (line)","2","3","4","10"], dec: 0, yunit: "%",
      series: [ { name: "train fit", ys: [60,80,90,95,99] }, { name: "test fit", ys: [60,82,88,84,70] } ],
      knob: { label: "Degree", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A straight line underfits a curved pattern.", tone: "info" },
        { max: 3, text: "Degrees 2–3 fit the real curve and generalize well.", tone: "info" },
        { max: 4, text: "🤯 At degree 10 training soars but test collapses — the model is memorizing noise.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Polynomial features", formula: "add x², x³, … then tune degree", text: "Powers let a linear model fit curves; too high a degree overfits, so tune the degree." }
    }
  });

  /* ============================ feng3 — Part III · Advanced Study (6) ============================ */

  def("feng3", {
    q: "What is a polynomial feature?",
    choices: [
      "A feature built by raising an existing feature to a power (x², x³) or multiplying features together",
      "An existing feature that has simply been rescaled into the fixed range 0 to 1 using min-max scaling",
      "An unordered category column that has been turned into several separate 0/1 indicator columns each",
      "An ordinary feature whose missing values have all been filled in using the column mean or median value",
      "The single most important feature in the whole dataset, as ranked first by its model importance score"
    ],
    explain: "Polynomial features are derived columns like x², x³, or x·y that let a linear model represent curves and interactions. Generating them up to a chosen degree expands the feature set quickly, so the degree trades expressive power against overfitting and cost. They are usually scaled, since powers spread the range widely.",
    simple: "It is an old feature raised to a power or multiplied by another, like x² or price×area. These give a straight-line model the ability to bend.",
    widget: {
      type: "curveStatic", title: "Terms multiply with degree",
      world: "Increase the degree and watch how many polynomial terms get generated from 2 base features.",
      xlab: "degree →", xs: [0,1,2,3,4],
      labels: ["1","2","3","4","5"], dec: 0, yunit: "terms",
      series: [ { name: "generated terms", ys: [2,5,9,14,20] } ],
      knob: { label: "Degree", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Degree 2 already adds squares and a cross term.", tone: "info" },
        { max: 3, text: "Each degree stacks on more powers and products.", tone: "info" },
        { max: 4, text: "🤯 From just 2 features, degree 5 spawns 20 terms — power at the price of overfitting risk.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Polynomial feature", formula: "x², x³, x·y, …", text: "Powers and products of features let linear models fit curves and interactions." }
    }
  });

  def("feng3", {
    q: "What is target (mean) encoding of a categorical feature?",
    choices: [
      "Replacing each category with the average target value seen for that category",
      "Creating one separate 0/1 indicator column for every distinct category value in the column",
      "Ranking all of the categories alphabetically and replacing each one with its integer position",
      "Scaling the raw category counts so that they end up with a mean of 0 and unit variance too",
      "Dropping the entire category column from the dataset because models cannot read text at all"
    ],
    explain: "Target encoding swaps each category for a statistic of the target within it — typically the mean — collapsing a high-cardinality column into a single informative number. It is compact and powerful but leaks the label, so it must be computed out-of-fold and smoothed toward the global mean for rare categories. Done naively it badly overfits.",
    simple: "Replace 'City = Paris' with the average outcome for Paris. One clever number instead of thousands of columns — but it must be computed carefully to avoid cheating.",
    widget: {
      type: "curveStatic", title: "5,000 columns down to one",
      world: "Swap high-cardinality one-hot for other encodings and watch the column count collapse while signal survives.",
      xlab: "encoding →", xs: [0,1,2,3,4],
      labels: ["one-hot","hash 500","hash 100","ordinal","target-mean"], dec: 0, yunit: "cols",
      series: [ { name: "columns used", ys: [5000,500,100,1,1] } ],
      knob: { label: "Encoding", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "One-hot needs thousands of columns for high cardinality.", tone: "info" },
        { max: 3, text: "Hashing shrinks it to a fixed width; ordinal to one (but fakes order).", tone: "info" },
        { max: 4, text: "🤯 Target encoding uses one column that still carries the signal — powerful, but leak-prone.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Target encoding", formula: "category → mean(target | category)", text: "Collapses high-cardinality categories into one number; compute out-of-fold to avoid leakage." }
    }
  });

  def("feng3", {
    q: "What does TF-IDF do to a piece of text?",
    choices: [
      "Weights each word by how often it appears here but how rare it is across all documents",
      "Counts only the total number of characters in the text and uses that single number as a feature",
      "Translates the whole piece of text into another language before the model ever reads any of it",
      "Keeps only the very first word of every sentence and throws away the entire rest of the text",
      "Replaces each word with its alphabetical rank position in a fixed, pre-sorted dictionary list"
    ],
    explain: "TF-IDF multiplies term frequency (how often a word appears in a document) by inverse document frequency (how rare the word is across the whole corpus). Words common everywhere, like 'the', get down-weighted, while distinctive words that mark a document stand out. It turns text into numeric feature vectors for models.",
    simple: "It scores a word high when it's frequent in this document but rare overall. So 'the' barely counts, while a telling word like 'refund' gets real weight.",
    widget: {
      type: "curveStatic", title: "Common down, distinctive up",
      world: "Sweep from raw counts toward full TF-IDF and watch a common word lose weight while a rare, telling word gains.",
      xlab: "weighting →", xs: [0,1,2,3,4],
      labels: ["raw count","+stop-list","+TF","+IDF","TF-IDF"], dec: 0, yunit: "",
      series: [ { name: "weight of 'the'", ys: [100,5,5,1,1] }, { name: "weight of 'refund'", ys: [8,8,12,30,40] } ],
      knob: { label: "Weighting", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Raw counts let ultra-common 'the' dominate.", tone: "info" },
        { max: 3, text: "IDF penalizes words that appear in every document.", tone: "info" },
        { max: 4, text: "🤯 Full TF-IDF flips it: 'the' near zero, distinctive 'refund' carries the signal.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "TF-IDF", formula: "weight = TF × IDF", text: "Boosts words frequent in a document but rare across the corpus; down-weights ubiquitous words." }
    }
  });

  def("feng3", {
    q: "What is feature hashing (the 'hashing trick')?",
    choices: [
      "Mapping categories to a fixed number of columns via a hash function, avoiding a giant one-hot matrix",
      "Encrypting each of the feature values for data security so the raw categories can no longer be read",
      "Sorting all of the features by their measured importance and keeping only the very top-ranked ones",
      "Filling every missing value in the row with a hash computed from that same row's other columns first",
      "Deleting all of the duplicate rows from the dataset by comparing a checksum of each full row first"
    ],
    explain: "Feature hashing runs each category through a hash function that assigns it to one of a fixed number of columns, so the output width stays constant no matter how many categories appear. It is memory-efficient and handles unseen categories, at the cost of occasional collisions where two categories share a slot. It suits very high-cardinality data.",
    simple: "It drops each category into one of a fixed set of buckets using a hash, so the table never grows even with millions of categories. Rarely, two categories land in the same bucket.",
    widget: {
      type: "curveStatic", title: "Fixed width, any cardinality",
      world: "Grow the number of unique categories and watch hashing hold the column count fixed while one-hot explodes.",
      xlab: "unique categories →", xs: [0,1,2,3,4],
      labels: ["100","1k","10k","100k","1M"], dec: 0, yunit: "cols",
      series: [ { name: "one-hot columns", ys: [100,1000,10000,100000,1000000] }, { name: "hashing columns", ys: [256,256,256,256,256] } ],
      knob: { label: "Distinct categories", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "At low cardinality both are small and manageable.", tone: "info" },
        { max: 3, text: "One-hot balloons with cardinality; hashing stays put at 256.", tone: "info" },
        { max: 4, text: "🤯 A million categories still fit in 256 hashed columns — a huge memory win.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Feature hashing", formula: "category → hash → fixed # cols", text: "Hashes categories into a fixed number of columns; constant memory, at the cost of rare collisions." }
    }
  });

  q("feng3", {
    q: "Target encoding uses the label, so it can leak information from the target into the features. What is the standard defense?",
    choices: [
      "Compute each category's mean out-of-fold (via cross-validation) and fit on train only",
      "Compute all of the category means directly on the held-out test set instead of the training set",
      "Use the whole combined dataset, including all the test rows, for extra stability in the encoding",
      "Never split the data into separate train and test sets at all, so every row can be encoded once",
      "Add a little random noise to the target column before training the model so as to hide any leakage"
    ],
    explain: "If a row's category mean includes that row's own label, the feature secretly encodes the answer and the model looks brilliant until deployment. The fix is out-of-fold encoding: compute each row's category mean from other folds only, often with smoothing toward the global mean for rare categories. All of this is fit on training data alone.",
    simple: "If Paris's average outcome already includes today's Paris row, you've told the model the answer. Compute the average from other rows only, so it can't peek at itself.",
    widget: {
      type: "curveStatic", title: "Out-of-fold closes the leak",
      world: "Add more out-of-fold discipline to target encoding and watch the dishonest score gap close.",
      xlab: "leakage control →", xs: [0,1,2,3,4],
      labels: ["fit-on-all","leaky","some CV","out-of-fold","OOF+smooth"], dec: 0, yunit: "%",
      series: [ { name: "reported score", ys: [97,94,89,85,84] }, { name: "honest score", ys: [84,84,84,84,84] } ],
      knob: { label: "Discipline", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Naive target encoding reports a dazzling 97% — mostly leakage.", tone: "info" },
        { max: 3, text: "Cross-validated encoding shrinks the fantasy toward reality.", tone: "info" },
        { max: 4, text: "🤯 Out-of-fold + smoothing lands at ~84%, matching the honest score you'll actually get.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Out-of-fold target encoding", formula: "mean from other folds, then smooth", text: "Compute category means out-of-fold so a row never sees its own label; fit on train only." }
    }
  });

  q("feng3", {
    q: "What is the cleanest way to guarantee every transform — scaling, imputation, encoding — is fit on training data only during cross-validation?",
    choices: [
      "Wrap all transforms and the model in a single Pipeline and fit it inside cross-validation",
      "Transform the full dataset exactly once, well before you ever split it into train and test sets",
      "Fit each of the transforms by hand on all of the data first, and only then split it into folds",
      "Scale every feature using the mean and standard deviation computed from the held-out test set",
      "Skip cross-validation entirely so that the leakage problem can never actually arise in the first place"
    ],
    explain: "A Pipeline chains preprocessing steps with the estimator so that, on each CV fold, every transform is fit on that fold's training portion and merely applied to its validation portion. This makes leakage structurally impossible and keeps the whole workflow reproducible. Fitting transforms outside the CV loop lets validation data influence them and inflates the score.",
    simple: "Bundle every prep step and the model into one Pipeline, then cross-validate that. Each fold re-learns the prep from its own training data, so no test information can sneak in.",
    widget: {
      type: "curveStatic", title: "Pipeline seals out leakage",
      world: "Move more preprocessing INSIDE a cross-validated Pipeline and watch the optimistic bias vanish.",
      xlab: "steps inside Pipeline →", xs: [0,1,2,3,4],
      labels: ["none","scaler","+imputer","+encoder","+model (all)"], dec: 0, yunit: "%",
      series: [ { name: "score gap from leakage", ys: [12,8,5,2,0] } ],
      knob: { label: "Inside Pipeline", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With prep done outside CV, the score is inflated by ~12 points.", tone: "info" },
        { max: 3, text: "Each step folded into the Pipeline shaves the leak.", tone: "info" },
        { max: 4, text: "🤯 Everything inside one Pipeline: the leakage gap hits 0 — the score is finally honest.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Pipeline prevents leakage", formula: "Pipeline([transforms…, model]) inside CV", text: "A Pipeline refits every transform on each fold's train split, making leakage structurally impossible." }
    }
  });

}());
