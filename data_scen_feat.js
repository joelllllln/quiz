/* Applied Scenarios — Feature Engineering, Feature Selection, Model Selection. choices[0] always correct (shuffled at render). */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  function q(qk, o) { (Q[qk] = Q[qk] || []).push(o); }
  function W(title, world, xlab, labels, name, ys, kl, insights, reveal, extra) {
    var w = { type: "curveStatic", title: title, world: world, xlab: xlab, xs: labels.map(function (_, i) { return i; }),
      labels: labels, dec: 0, yunit: "%", series: [{ name: name, ys: ys }],
      knob: { label: kl, min: 0, max: labels.length - 1, step: 1, init: 0 },
      insights: insights, extreme: { at: "max" }, reveal: reveal };
    if (extra && extra.series) w.series = w.series.concat(extra.series);
    if (extra && extra.extreme) w.extreme = extra.extreme;
    return w;
  }

  /* ===================== scen1 — Clear Calls (6) ===================== */

  q("scen1", {
    q: "You have a categorical column 'city' with 3 unevenly-populated but unordered values (Austin, Denver, Miami) feeding a logistic regression. How should you encode it?",
    choices: [
      "One-hot encode into indicator columns — the categories have no order, and 3 levels adds only a couple of columns",
      "Label-encode the three cities as 0, 1 and 2 so that the linear model treats the whole column as a single ordered numeric feature",
      "Drop the city column entirely from the data, because free-text category names simply cannot be used by a linear model of any kind",
      "Target-encode each city using its raw training-set mean, applying no smoothing and no cross-fitting so as to keep the pipeline simple",
      "Hash the three city strings into a thousand separate buckets ahead of time just to be safe against any brand-new categories later"
    ],
    explain: "The categories are nominal (no inherent order), so mapping them to 0/1/2 would falsely tell a linear model that Miami (2) is 'twice' Denver (1), inventing a ranking that does not exist. One-hot encoding creates one indicator per level so each city gets its own coefficient with no spurious ordering. With only 3 levels the added width is trivial, so there is no cardinality problem that would push you toward target or hash encoding.",
    simple: "Cities are names, not amounts. Give each its own on/off switch instead of pretending they sit on a number line.",
    widget: W("Ordinal vs one-hot for unordered categories", "See the spurious error a linear model inherits when nominal labels are forced onto a 0/1/2 axis.",
      "encoding choice →", ["label 0/1/2", "hashed", "one-hot"],
      "validation accuracy", [71, 78, 89], "Encoding",
      [{ max: 0, text: "Label encoding injects a fake order; the linear model fits a slope through unrelated categories.", tone: "info" },
       { max: 1, text: "Hashing avoids order but collides categories needlessly at this tiny cardinality.", tone: "info" },
       { max: 2, text: "🤯 One-hot lets each city move the prediction independently — no invented ranking.", tone: "wow" }],
      { name: "Nominal encoding", formula: "unordered + low cardinality → one-hot", text: "For a few unordered categories, one indicator per level beats a fake numeric order." })
  });

  q("scen1", {
    q: "A feature 'hour_of_day' runs 0 to 23. Your model keeps treating 23:00 and 00:00 as far apart, hurting a demand forecast. What transform fixes this?",
    choices: [
      "Encode the hour as two cyclical features, sin(2*pi*hour/24) and cos(2*pi*hour/24)",
      "Standardize the raw hour column so that it has a mean of 0 and a variance of 1 before it is fed to the model",
      "Log-transform the hour values to compress their range and pull the larger hours of the day closer together",
      "One-hot encode all 24 distinct hours into separate indicator columns and drop the original raw hour column",
      "Bin the hour into morning, afternoon and evening buckets and then label-encode those three as 0, 1 and 2"
    ],
    explain: "Hour is a cyclical quantity: 23 and 0 are adjacent in time but numerically 23 apart, so a raw or scaled column misleads the model about that boundary. Mapping the hour onto a circle with sin and cos gives two coordinates where 23:00 and 00:00 sit right next to each other, preserving true adjacency. Standardizing or logging only rescales the same broken straight line, and coarse binning throws away resolution.",
    simple: "A clock is a circle, not a ruler. Put the hours back on the circle so midnight and 11pm are neighbors again.",
    widget: W("Cyclical encoding closes the midnight gap", "Distance the model sees between 23:00 and 00:00 under each encoding.",
      "encoding →", ["raw 0-23", "standardized", "sin/cos"],
      "adjacency correctness", [15, 18, 92], "Encoding",
      [{ max: 0, text: "Raw hours put a cliff between 23 and 0 even though they are one hour apart.", tone: "info" },
       { max: 1, text: "Scaling shifts the numbers but the cliff stays.", tone: "info" },
       { max: 2, text: "🤯 On a sin/cos circle, midnight and 11pm are neighbors — the seam disappears.", tone: "wow" }],
      { name: "Cyclical features", formula: "periodic value → sin & cos pair", text: "Wrap-around quantities like hour or month belong on a circle, encoded with sin and cos." })
  });

  q("scen1", {
    q: "Your income feature is strongly right-skewed (most values small, a long tail of high earners) and you plan to use linear regression. What preprocessing helps most?",
    choices: [
      "Apply a log (or log1p) transform to compress the tail and make the distribution more symmetric",
      "Min-max scale the income feature into the 0-to-1 range and leave its lopsided distribution shape completely unchanged",
      "One-hot encode the continuous income variable into ten separate decile indicator columns before fitting the linear model",
      "Remove every single high-income row from the dataset as an outlier so that the long right tail disappears entirely",
      "Square all of the income values so that the gaps between them are spread out even further across the whole range"
    ],
    explain: "Linear models fit a straight-line relationship and are sensitive to a heavy right tail, where a few huge incomes dominate the loss and distort the slope. A log transform pulls the long tail in and makes multiplicative gaps look additive, so the relationship becomes more linear and residuals more even. Min-max scaling only shifts and stretches the same skewed shape, deleting the tail throws away real customers, and squaring makes the skew worse.",
    simple: "When a few giant values drown out the rest, take logs so the crowd and the giants sit on a fairer scale.",
    widget: W("Log transform tames right skew", "How close the income-vs-target relationship is to linear after each step.",
      "transform →", ["raw", "min-max scaled", "log1p"],
      "linearity of relationship", [40, 42, 88], "Transform",
      [{ max: 0, text: "Raw skew lets a handful of high earners bend the fitted line.", tone: "info" },
       { max: 1, text: "Scaling changes the axis numbers but not the lopsided shape.", tone: "info" },
       { max: 2, text: "🤯 Logs turn multiplicative gaps into additive ones — the line fits the middle again.", tone: "wow" }],
      { name: "Skew correction", formula: "heavy right tail → log / log1p", text: "Log-transform right-skewed positives so a linear model is not ruled by the tail." })
  });

  q("scen1", {
    q: "You have 40 candidate features and want a fast, model-agnostic first pass to drop obviously useless ones before any training. Which selection approach fits?",
    choices: [
      "A filter method — rank features by a cheap univariate score (correlation, mutual information, chi-squared) and cut the weakest",
      "Recursive feature elimination wrapped tightly around a slow gradient-boosted model that must be refitted at every single elimination step",
      "An exhaustive search over all 2^40 possible feature subsets, scoring each and every one of those subsets with a full cross-validation run",
      "Train the final deep neural network on all 40 features at once and then read the feature importances off its computed saliency maps",
      "Forward selection that refits the whole model from scratch after adding each candidate feature to the working set one at a time"
    ],
    explain: "A filter method scores each feature against the target with a cheap statistic and never trains the downstream model, so it is fast and model-agnostic — exactly what a quick first pass needs. Wrapper methods (RFE, forward selection) repeatedly retrain the model and are far more expensive, and exhaustively searching 2^40 subsets is computationally impossible. Filters can miss interactions, but as a coarse pre-screen before real modeling they are the right tool.",
    simple: "Before the real interviews, do a quick resume screen: cheaply rank each feature against the target and drop the clearly weak ones.",
    widget: W("Filter methods are the cheap first pass", "Relative compute cost to screen 40 features by each strategy.",
      "method →", ["filter", "forward select", "RFE + boosting", "exhaustive"],
      "compute cost", [8, 55, 75, 100], "Method",
      [{ max: 0, text: "A filter scores each feature once, without training the model — near-instant.", tone: "info" },
       { max: 2, text: "Wrappers retrain the model many times, paying for accuracy with compute.", tone: "info" },
       { max: 3, text: "🤯 Exhaustive search over 2^40 subsets never finishes — a filter first pass is the sane move.", tone: "wow" }],
      { name: "Filter selection", formula: "quick model-agnostic screen → filter by univariate score", text: "Use cheap univariate filters to prune obvious dead weight before expensive selection." })
  });

  q("scen1", {
    q: "Numeric features range wildly: age (0-90), income (0-200000), and you are training a k-nearest-neighbours classifier that uses Euclidean distance. What must you do first?",
    choices: [
      "Standardize or normalize the features so each contributes comparably to the distance",
      "Nothing at all is required first, because a KNN classifier handles wildly different raw feature scales completely automatically on its own",
      "One-hot encode each of the numeric columns into indicator variables so that the large scale difference between age and income is removed",
      "Log-transform only the target variable and leave every one of the numeric input features exactly as it is in its raw original units",
      "Steadily increase the neighbour count k until the huge scale difference between age and income finally stops mattering to the result"
    ],
    explain: "KNN measures similarity with Euclidean distance, which sums squared differences across features, so a feature with a huge numeric range dominates the distance regardless of its real importance. Income spanning 0-200000 would swamp age spanning 0-90, making neighbors effectively chosen by income alone. Standardizing (mean 0, variance 1) or min-max normalizing puts every feature on a comparable scale so distance reflects all of them. KNN has no built-in scaling, and raising k does not fix a distorted distance metric.",
    simple: "If one ruler is in miles and another in inches, the miles win every comparison. Put both on the same scale before measuring who is nearest.",
    widget: W("Scaling before distance-based models", "Share of the distance controlled by income as scaling is applied.",
      "state →", ["raw", "min-max", "standardized"],
      "balanced feature contribution", [20, 82, 90], "Scaling",
      [{ max: 0, text: "Unscaled, income's thousands drown age's tens — distance is basically income.", tone: "info" },
       { max: 1, text: "Min-max caps every feature to 0-1, evening out the vote.", tone: "info" },
       { max: 2, text: "🤯 After standardizing, each feature contributes on its own terms — neighbors make sense.", tone: "wow" }],
      { name: "Feature scaling", formula: "distance-based model → scale every feature first", text: "KNN, SVM and k-means need scaled features so no single range hijacks distance." })
  });

  q("scen1", {
    q: "You must impute missing values in a numeric column that is roughly symmetric with a few extreme outliers, and you want a simple, robust fill. Which statistic should you use?",
    choices: [
      "The median, because it is not pulled by the extreme outliers",
      "The mean, because it makes use of every single value present in the column",
      "Zero, since it is a neutral value that biases the column in no particular direction",
      "A random value freshly drawn from the column for each individual missing entry",
      "The maximum observed value, so as to stay deliberately conservative and high"
    ],
    explain: "The mean is dragged toward extreme outliers, so filling with it can bias every imputed row in the direction of a few unusual values. The median sits at the middle rank and ignores how far the outliers stretch, giving a robust central fill. Filling with zero injects a value that may be far from typical and distorts the distribution, and random or maximum fills add noise or a systematic upward bias.",
    simple: "To guess a typical value when a few readings are wild, use the middle one, not the average that those wild readings can yank around.",
    widget: W("Median resists outliers", "How close the imputed fill stays to the true center as outliers grow.",
      "outlier severity →", ["none", "mild", "severe"],
      "fill closeness to true center", [95, 70, 40], "Outliers",
      [{ max: 0, text: "With no outliers, mean and median agree.", tone: "info" },
       { max: 1, text: "As a few extreme values appear, the mean starts drifting toward them.", tone: "info" },
       { max: 2, text: "🤯 Under severe outliers the mean fill is badly off while the median barely moves.", tone: "wow" }],
      { name: "Robust imputation", formula: "outliers present → impute with median", text: "Fill missing numerics with the median when a heavy tail would distort the mean." })
  });

  /* ===================== scen2 — Weighing Trade-offs (6) ===================== */

  q("scen2", {
    q: "A ZIP-code feature has 4000 distinct values and clearly predicts churn. One-hot would add 4000 sparse columns; you need to keep width manageable. What is the best-balanced choice?",
    choices: [
      "Target-encode ZIP with cross-fitting and smoothing so rare ZIPs shrink toward the global mean",
      "One-hot encode all 4000 distinct ZIP codes into sparse indicator columns and simply let the model's regularization sort the whole mess out",
      "Label-encode the ZIP as the integers 0 through 3999 and feed that straight into the model as a single ordered numeric feature",
      "Drop the ZIP-code feature entirely from the dataset just to avoid having to deal with its very high cardinality altogether",
      "Naively target-encode ZIP using each code's raw churn mean computed on the full training set, with no folds and no smoothing"
    ],
    explain: "This trades information against dimensionality and leakage. One-hot at 4000 levels explodes width and leaves rare ZIPs with almost no signal, while label-encoding invents a meaningless order and dropping ZIP discards a real predictor. Target encoding collapses ZIP to a single informative number, but done naively it leaks the label and overfits rare ZIPs; cross-fitting (out-of-fold means) plus smoothing toward the global mean keeps the signal while controlling both problems.",
    simple: "For thousands of categories, summarize each by its churn rate instead of adding thousands of columns — but compute that rate out-of-fold and pull rare ones toward the average so you do not cheat.",
    widget: W("Target encoding trades width for leakage risk", "Validation gain from ZIP under each handling, balancing signal against overfit.",
      "handling →", ["drop ZIP", "one-hot 4000", "naive target", "cross-fit + smooth"],
      "held-out benefit", [40, 55, 45, 88], "Handling",
      [{ max: 1, text: "Dropping loses signal; one-hot at 4000 levels is sparse and unwieldy.", tone: "info" },
       { max: 2, text: "Naive target encoding leaks the label and overfits rare ZIPs — it can hurt held-out data.", tone: "info" },
       { max: 3, text: "🤯 Cross-fit means plus smoothing keep the signal without the leak — best of both.", tone: "wow" }],
      { name: "High-cardinality encoding", formula: "many levels → smoothed, cross-fit target encoding", text: "Target-encode high-cardinality categoricals out-of-fold and smooth rare levels toward the mean." })
  });

  q("scen2", {
    q: "Filter selection ranked 25 features by univariate correlation, but two of your strongest predictors only work together (an interaction) and each looks weak alone. You can afford some extra compute. What selection strategy balances this?",
    choices: [
      "Use a wrapper method like recursive feature elimination that evaluates features by their effect on the actual model, capturing joint value",
      "Trust the univariate correlation filter completely and drop both of the weak-looking features, since each one scores poorly on its own in isolation",
      "Keep only the single most highly correlated feature out of the whole set and discard every one of the remaining candidate features to stay simple",
      "Add every available feature into the model regardless of its univariate score, just to be completely safe against dropping anything useful",
      "Rank all the features by correlation exactly as before but keep the bottom-scoring features instead of the top-scoring ones this time around"
    ],
    explain: "Univariate filters score each feature in isolation, so two features that only help in combination each look weak and get cut — the filter is blind to interactions. Wrapper methods evaluate subsets by training the model and measuring its performance, so they can detect that the pair together lifts accuracy even though neither shines alone. The cost is more compute from repeated model fits, which you said you can afford; keeping everything or inverting the ranking ignores the signal entirely.",
    simple: "Two players who only score as a duo look useless in solo tryouts. Judge them by how the team plays with them, not by solo stats.",
    widget: W("Wrappers see interactions filters miss", "Detected value of an interaction pair under each selection lens.",
      "selection lens →", ["univariate filter", "top-1 only", "wrapper / RFE"],
      "interaction captured", [25, 15, 85], "Selection",
      [{ max: 0, text: "A filter scores each feature alone, so an interaction pair reads as two weak features.", tone: "info" },
       { max: 1, text: "Keeping only the top-1 feature guarantees you lose the partner.", tone: "info" },
       { max: 2, text: "🤯 A wrapper trains on subsets and sees the pair lift the model together.", tone: "wow" }],
      { name: "Filter vs wrapper", formula: "interactions matter + compute available → wrapper", text: "Filters are cheap but blind to interactions; wrappers cost more and catch joint value." })
  });

  q("scen2", {
    q: "You have 5000 rows and must choose between a linear model and a deep neural network. Both must be validated. What model-selection procedure gives a trustworthy comparison without wasting data?",
    choices: [
      "k-fold cross-validation (e.g. 5-fold) so every row serves as both training and validation across folds",
      "A single fixed 50/50 train-test split that is evaluated exactly once to compare the two candidate models against each other",
      "Train both of the models on all 5000 available rows and then directly compare the training-set accuracy that each one reports",
      "Simply pick whichever of the two models has the most free parameters, on the grounds that it is able to fit strictly more of the data",
      "Use full leave-one-out cross-validation on the deep neural network so that it is retrained a total of 5000 separate times over"
    ],
    explain: "With a moderate 5000 rows, a single split wastes half the data and gives a noisy, high-variance estimate that depends on which rows landed in the test set. k-fold cross-validation rotates the validation fold so every row is used for both training and testing, averaging out that noise and using the data efficiently. Comparing training accuracy rewards overfitting rather than generalization, choosing by parameter count ignores performance, and leave-one-out would retrain the expensive net thousands of times for little gain.",
    simple: "Instead of grading on one random quiz, rotate the quiz so everyone gets tested once and average the scores — a fairer read on which model really generalizes.",
    widget: W("Cross-validation stabilizes model choice", "Reliability of the model comparison as validation design improves.",
      "validation design →", ["single 50/50 split", "3-fold CV", "5-fold CV"],
      "estimate reliability", [45, 78, 90], "Design",
      [{ max: 0, text: "One split hinges on luck — a different test set could flip the winner.", tone: "info" },
       { max: 1, text: "A few folds already average out much of that noise.", tone: "info" },
       { max: 2, text: "🤯 5-fold reuses every row for training and testing — a stable, data-efficient verdict.", tone: "wow" }],
      { name: "Cross-validation design", formula: "moderate data → k-fold, not a single split", text: "Rotate validation folds so every row informs the estimate and comparisons stay stable." })
  });

  q("scen2", {
    q: "Grid search over your model's 6 hyperparameters would need 15625 fits; you have a limited compute budget and suspect only 2 of the 6 truly matter. What search strategy is the better trade-off?",
    choices: [
      "Random search over the hyperparameter space, which explores the important dimensions more efficiently under a fixed budget",
      "A full exhaustive grid search over all 6 hyperparameters at once, running every one of the 15625 fits regardless of your limited budget",
      "Tune just one hyperparameter at a time while freezing all of the others at their defaults, making only a single pass through the six",
      "Pick every one of the model's hyperparameters by their library default values and skip the tuning search entirely to save the compute",
      "Run a grid search but only over the 4 hyperparameters that you happen to suspect are the unimportant ones, leaving the key two fixed"
    ],
    explain: "When only a few hyperparameters actually matter, a grid wastes most of its fits sampling irrelevant dimensions at fixed values, and its cost explodes multiplicatively with the number of parameters. Random search draws each configuration from the whole space, so within the same budget it tries many distinct values of the important parameters instead of repeating them — it tends to find good settings faster. Full grid ignores the budget, one-at-a-time tuning misses interactions between parameters, and defaults skip tuning altogether.",
    simple: "If only two dials matter, do not methodically test every combination of all six. Sprinkle random guesses across the space and you will hit good settings of the two that count much sooner.",
    widget: W("Random search wins under a budget", "Best score found within a fixed number of fits, by search strategy.",
      "search strategy →", ["defaults", "one-at-a-time", "grid (partial)", "random search"],
      "best score in budget", [50, 62, 70, 88], "Strategy",
      [{ max: 1, text: "Defaults and one-at-a-time miss good regions and parameter interactions.", tone: "info" },
       { max: 2, text: "A partial grid spends its fits repeating values of parameters that do not matter.", tone: "info" },
       { max: 3, text: "🤯 Random search samples the whole space, so it varies the important dials far more per fit.", tone: "wow" }],
      { name: "Grid vs random search", formula: "few dials matter + tight budget → random search", text: "Random search explores the parameters that matter more efficiently than a grid of the same size." })
  });

  q("scen2", {
    q: "Cross-validation shows a complex model at 0.902 accuracy (SD 0.02 across folds) and a much simpler model at 0.888 (SD 0.02). You value robustness and easy deployment. Which does the one-standard-error rule favor?",
    choices: [
      "The simpler model, since 0.888 is within one standard error of the best score, so you prefer the least complex model in that band",
      "The complex model, purely because its cross-validation score of 0.902 is the numerically highest of the two and higher accuracy always wins",
      "Neither of the two qualifies, because in this situation you must always default to picking whichever model happens to have the most parameters",
      "The complex model, because a raw accuracy gap of 0.014 between the two is always decisive no matter how large the fold-to-fold variance is",
      "Simply average the two models' predictions together into an ensemble so that you neatly split the difference between their two scores"
    ],
    explain: "The one-standard-error rule says: find the best CV score, then among all models whose score is within one standard error of it, choose the simplest. Here one SE is about 0.02, and the simpler model's 0.888 is within 0.02 of the best 0.902, so the two are statistically indistinguishable. Given that tie, the rule favors the simpler model for its lower variance, better generalization, and easier deployment — chasing the tiny raw-accuracy edge risks overfitting to noise in the folds.",
    simple: "When two models are basically within measurement noise of each other, take the simpler one — the extra decimal on the complex model is probably luck.",
    widget: W("The one-standard-error rule", "CV accuracy with error bars; simplest model inside the top model's error band wins.",
      "model complexity →", ["simple", "medium", "complex"],
      "CV accuracy", [88, 89, 90], "Complexity",
      [{ max: 0, text: "The simple model lands only ~1 SE below the best — a statistical tie.", tone: "info" },
       { max: 1, text: "The extra complexity buys accuracy inside the noise band, not beyond it.", tone: "info" },
       { max: 2, text: "🤯 The rule says take the simplest model within one SE of the top — robustness over a noisy decimal.", tone: "wow" }],
      { name: "One-standard-error rule", formula: "within 1 SE of best → pick the simplest", text: "When scores tie inside one standard error, prefer the simpler, more robust model." })
  });

  q("scen2", {
    q: "Your regression model underfits: both training and validation error are high and close together (high bias). You must decide your next move under limited time. What is the right lever?",
    choices: [
      "Increase model capacity or add informative features — high bias means the model is too simple to capture the pattern",
      "Gather far more training rows for the model, on the principle that collecting additional data always fixes an underfitting problem like this",
      "Add much stronger L2 regularization to the regression so that the penalty term drives the overall error down toward a lower value",
      "Remove several of the input features from the model in order to simplify it even further than it already happens to be right now",
      "Switch over to an even simpler model than the current one so as to close the small remaining gap between training and validation error"
    ],
    explain: "High training error that is close to validation error is the signature of high bias: the model is too simple to represent the true relationship, so it errs even on data it has seen. The cure is more capacity — a richer model, engineered features, interaction terms, or fewer constraints — not more data, because extra rows do not help a model that cannot express the pattern. Adding regularization or removing features increases bias further, making underfitting worse.",
    simple: "If a model does poorly even on its practice questions, it is too simple to learn the material. Give it more power, not more practice sheets.",
    widget: W("Diagnosing bias vs variance", "Train and validation error as model capacity grows from underfit.",
      "model capacity →", ["too simple", "moderate", "well-fit"],
      "validation error", [55, 30, 18], "Capacity",
      [{ max: 0, text: "High error on both train and validation, close together — classic high bias.", tone: "info" },
       { max: 1, text: "Adding capacity or features lets the model express the real pattern.", tone: "info" },
       { max: 2, text: "🤯 More rows would not help here — underfitting is cured by capacity, not data volume.", tone: "wow" }],
      { name: "Bias in model selection", formula: "high train error ≈ high val error → add capacity", text: "Underfitting is a bias problem: add capacity or features rather than data or regularization.", },
      { extreme: { at: "min" }, series: [{ name: "training error", ys: [52, 26, 12] }] })
  });

  /* ===================== scen3 — Subtle Traps (6) ===================== */

  q("scen3", {
    q: "You standardize all numeric features using the mean and standard deviation computed over the entire dataset, then split into train and test. Validation looks great but production is worse. What went wrong?",
    choices: [
      "Data leakage — the scaler learned statistics from the test rows; fit the scaler on the training fold only and apply it to the rest",
      "You should have standardized the features after computing the model coefficients rather than before, and that ordering mistake is the whole problem",
      "Standardization is never actually appropriate for this kind of linear model, so it should be removed from the pipeline altogether to fix the drop",
      "The held-out test set you evaluated on was simply far too small for its reported score to be trusted in the first place, which fully explains it",
      "You used z-score standardization instead of min-max scaling on the features, and that specific choice of scaler is the real underlying bug here"
    ],
    explain: "Fitting the scaler on the full dataset lets the training pipeline peek at the test rows' mean and standard deviation, so the model is evaluated on data whose statistics it already absorbed — that is preprocessing leakage, and it inflates validation optimistically. In production the model faces genuinely unseen data whose statistics it never saw, so performance drops. The fix is to fit all preprocessing (scaler, imputer, encoder) on the training split alone and merely transform the validation and test sets, ideally inside a cross-validation pipeline.",
    simple: "If you peek at the test answers while setting up your study notes, your practice score lies. Learn the scaling from the training data only.",
    widget: W("Preprocessing leakage inflates validation", "Gap between validation score and true production score as leakage creeps in.",
      "scaler fit on →", ["train only", "train+some test", "full dataset"],
      "validation score", [86, 90, 94], "Leakage",
      [{ max: 0, text: "Fitting the scaler on train only gives an honest, slightly lower validation score.", tone: "info" },
       { max: 1, text: "Letting a little test data into the fit quietly nudges the score up.", tone: "info" },
       { max: 2, text: "🤯 Fit on the full set, validation looks best yet production sags — the extra points were leaked.", tone: "wow" }],
      { name: "Preprocessing leakage", formula: "fit transforms on train fold only", text: "Fit scalers, imputers and encoders on the training split, then transform the rest — never the whole set." })
  });

  q("scen3", {
    q: "You run feature selection (keeping the top 20 of 500 features by correlation with the target) on the full dataset, then cross-validate a model on those 20. CV accuracy is suspiciously high. What is the flaw?",
    choices: [
      "Selection leakage — features were chosen using the whole dataset including the CV test folds, so selection must happen inside each fold",
      "Twenty features out of the original five hundred is simply far too few, so the model just happened to get lucky on this one particular run",
      "Correlation was the wrong ranking statistic to use here, and switching to mutual information for the selection step would have avoided the whole problem",
      "The cross-validation just needs a larger number of folds in order to bring the suspiciously high accuracy back down to a more believable level",
      "You should have selected the bottom-ranked 20 features by correlation instead of the top-ranked 20, and that is what inflated the reported score"
    ],
    explain: "Choosing the 20 features on the entire dataset lets the selector see the labels of the very rows it will later be tested on, so those features are pre-tuned to the test folds — the cross-validation is no longer measuring generalization. This selection leakage inflates CV accuracy, sometimes dramatically, even when the features are pure noise. The correct procedure nests selection inside the CV loop: within each fold, select features using only that fold's training rows, then evaluate on its held-out rows.",
    simple: "If you pick your best features by peeking at the whole exam, the practice score is rigged. Choose features fresh inside each fold, using only that fold's training data.",
    widget: W("Selection outside CV leaks the answer", "CV accuracy on pure-noise features as selection is moved outside the fold.",
      "selection done →", ["inside each fold", "partly outside", "on full data first"],
      "reported CV accuracy", [50, 68, 85], "Leakage",
      [{ max: 0, text: "Selecting inside each fold, noise features score near chance — honest.", tone: "info" },
       { max: 1, text: "Peeking a little at the test folds already lifts the reported score.", tone: "info" },
       { max: 2, text: "🤯 Select on the full data and even random features can look 85% accurate — pure leakage.", tone: "wow" }],
      { name: "Selection leakage", formula: "feature selection belongs inside the CV loop", text: "Select features using only each fold's training rows, or CV will flatter noise." })
  });

  q("scen3", {
    q: "Two features, 'height_cm' and 'height_inches', are near-perfectly correlated and both fed into a linear regression. The coefficients come out huge, opposite in sign, and unstable across runs. What is happening and the fix?",
    choices: [
      "Multicollinearity — the redundant pair makes coefficients unstable; drop one or combine them (or use regularization)",
      "The model is clearly underfitting the data and simply needs more informative features exactly like these two redundant height columns added in",
      "The target variable you are predicting must be strongly non-linear, so the correct fix here is to abandon the linear model and switch to a tree",
      "The optimiser's learning rate has been set far too high, and that is what is causing the two coefficients to diverge and swing wildly between runs",
      "Nothing is actually wrong with the fit at all, because large coefficients of opposite sign always safely cancel each other out in the predictions"
    ],
    explain: "Height in centimeters and inches carry the same information, so the linear model cannot decide how to split credit between them; it can add a large positive weight to one and a nearly equal negative weight to the other, giving wildly unstable coefficients that swing between runs and samples. This multicollinearity does not necessarily hurt prediction but destroys interpretability and inflates coefficient variance. The remedy is to drop one of the redundant features, combine them, or apply L2 regularization to shrink and stabilize the shared weight.",
    simple: "You gave the model the same measurement twice in different units. It cannot decide which to credit, so the weights seesaw. Keep just one copy.",
    widget: W("Multicollinearity destabilizes coefficients", "Coefficient stability as a near-duplicate feature is added and then handled.",
      "feature setup →", ["one height col", "both raw", "both + regularized"],
      "coefficient stability", [90, 25, 80], "Setup",
      [{ max: 0, text: "With one height column, the weight is stable and readable.", tone: "info" },
       { max: 1, text: "Add its duplicate in other units and the two weights explode in opposite directions.", tone: "info" },
       { max: 2, text: "🤯 Dropping one or regularizing restabilizes the fit — same predictions, sane weights.", tone: "wow" }],
      { name: "Multicollinearity", formula: "redundant features → drop, combine, or regularize", text: "Near-duplicate features make linear coefficients huge and unstable; remove the redundancy." })
  });

  q("scen3", {
    q: "You tuned hyperparameters with grid search using cross-validation, then reported that same best CV score as your estimate of future performance. A colleague says it is optimistic. Why, and what fixes it?",
    choices: [
      "The CV score was used to choose hyperparameters, so it is optimistically biased; nested cross-validation (an outer loop for evaluation) gives an honest estimate",
      "Grid search itself is always inherently biased as a procedure, so you must switch over to random search instead in order to report a fair score",
      "The reported score is perfectly fine exactly as it stands, because a properly run cross-validation can never be optimistically biased in any way",
      "You simply need to add many more candidate hyperparameter values into the search grid, and that alone will make the reported best score honest",
      "The optimistic bias here comes purely from using too few folds, so simply switching the cross-validation up to 20 folds would remove it entirely"
    ],
    explain: "When you pick the hyperparameters that maximize the CV score, you are optimizing against that very score, so it becomes a biased, optimistic estimate of generalization — you have implicitly fit to the validation folds. Nested cross-validation separates the two jobs: an inner loop selects hyperparameters, and an untouched outer loop estimates performance on data never used for tuning. That outer estimate is unbiased; reporting the inner best score is not, no matter how many folds you add.",
    simple: "If you keep the setting that scored best on the practice tests, that best score is cherry-picked. Grade the finished model on a fresh test it never helped choose.",
    widget: W("Nested CV removes tuning-selection bias", "Optimism of the reported score as you tune on it without an outer loop.",
      "reporting method →", ["nested CV outer", "single held-out", "same tuning CV"],
      "reported vs true score gap", [3, 8, 20], "Method",
      [{ max: 0, text: "Nested CV's outer loop never saw the tuning, so its estimate is honest.", tone: "info" },
       { max: 1, text: "A single held-out set helps but is noisy with limited data.", tone: "info" },
       { max: 2, text: "🤯 Reporting the tuning CV's own best score bakes in optimism — you optimized that number.", tone: "wow" }],
      { name: "Nested cross-validation", formula: "tune inside, evaluate outside → nested CV", text: "The CV score you tuned on is optimistic; use a separate outer loop to estimate performance." })
  });

  q("scen3", {
    q: "For a churn model you engineer a feature 'account_closed_date'. It gives 0.99 CV accuracy. Before deploying, what should raise a red flag?",
    choices: [
      "Target leakage — the closed date only exists because the customer already churned, so the feature encodes the answer and won't be available at prediction time",
      "The 0.99 cross-validation accuracy simply proves that this engineered feature is excellent and it should be prioritized above all the others going forward",
      "The account-closed-date feature just needs to be one-hot encoded properly before the model can be trusted to make good use of the strong signal it carries",
      "The 0.99 accuracy is actually far too low to deploy on, and the real fix is to engineer several more powerful features just like this closed-date one",
      "The closed-date field should be scaled into the 0-to-1 range before training so that the model can make even better use of it than it already does now"
    ],
    explain: "An account's closed date is a consequence of churning, not a cause you know beforehand — at the moment you must predict whether a still-active customer will churn, that field is empty or in the future. Training on it leaks the label, producing an unrealistically high 0.99 that collapses in production because the feature is unavailable or always null for the customers you actually score. The tell is a single feature that is 'too good': always ask whether it would truly be known at prediction time.",
    simple: "The move-out date only exists after someone has already left. Using it to predict who will leave is reading tomorrow's newspaper today.",
    widget: W("Target leakage looks like a miracle feature", "CV accuracy vs realistic production accuracy as a post-outcome feature is added.",
      "feature added →", ["legit features", "+ weak proxy", "+ closed_date"],
      "CV accuracy", [78, 82, 99], "Feature",
      [{ max: 0, text: "Legitimate features give a believable score with headroom.", tone: "info" },
       { max: 1, text: "A borderline proxy nudges it up plausibly.", tone: "info" },
       { max: 2, text: "🤯 A post-outcome field rockets CV to 0.99 yet is blank in production — textbook leakage.", tone: "wow" }],
      { name: "Target leakage", formula: "feature known only after the outcome → drop it", text: "A single 'too good' feature usually leaks the label; check it exists at prediction time." })
  });

  q("scen3", {
    q: "Your dataset drifts over time (customer behavior in 2026 differs from 2023). You randomly shuffle all rows before making the train/test split and get strong CV scores. Why might this mislead you?",
    choices: [
      "Random shuffling lets future rows train the model that is tested on past rows; a time-based split respects the real forward-prediction task",
      "Random shuffling before the split is always the correct thing to do, and the drift in customer behaviour over time is entirely irrelevant to validation",
      "The cross-validation scores you are seeing are only this strong because you happen to need a larger number of folds to bring them back down to reality",
      "You should stratify the train-test split by the target label instead, which completely and fully solves the whole problem of temporal drift over years",
      "The presence of drift means you should simply remove all of the older 2023 data from the set and keep only the most recent 2026 rows for both parts"
    ],
    explain: "With temporal drift, the future does not look like the past, but random shuffling scatters 2026 rows into the training set while 2023 rows land in the test set, so the model effectively learns from the future to predict the past — an information advantage it will never have in deployment. That inflates CV scores and hides the model's real difficulty in extrapolating forward. A time-based (forward-chaining) split trains on earlier periods and tests on strictly later ones, mirroring how the model is actually used. Stratifying by target does not address the time ordering.",
    simple: "If you let the model peek at next year while quizzing it on last year, it looks brilliant. Test it the way it will really work: train on the past, predict the future.",
    widget: W("Random split leaks the future under drift", "Optimism of CV scores as the split ignores time ordering.",
      "split type →", ["time-based forward", "grouped by month", "random shuffle"],
      "score optimism gap", [4, 12, 28], "Split",
      [{ max: 0, text: "A forward split trains on the past and tests on the future — honest under drift.", tone: "info" },
       { max: 1, text: "Grouping helps but still can mix time periods.", tone: "info" },
       { max: 2, text: "🤯 Random shuffle lets 2026 rows teach the model that is graded on 2023 — inflated scores.", tone: "wow" }],
      { name: "Temporal validation", formula: "drift over time → time-based split, not random", text: "When data drifts, split by time so the model is tested on genuinely future rows." })
  });

})();
