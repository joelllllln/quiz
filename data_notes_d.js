/* Study notes — Feature Engineering, Feature Selection, Model Selection.
   Read-through revision, tiny chunks, in order. Grounded in data_feng.js, data_fsel.js, data_msel.js + primers. */
(function () {
  window.NOTES = window.NOTES || {};

  /* ============================ Feature Engineering ============================ */
  window.NOTES["feng"] = {
    key: "feng", name: "Feature Engineering",
    intro: "Shaping raw data into informative input columns (features) so a model can read the patterns it needs.",
    groups: [
      { h: "The idea", items: [
        { t: "What it is", d: "Turning raw data into input columns (features) that help a model learn better — cleaning, encoding, scaling, combining, and deriving new columns." },
        { t: "What a feature is", d: "A single measurable input column the model reads, like age, price, or colour. Each row is one example; each describing column is a feature." },
        { t: "When it happens", d: "Before training, to prepare the inputs. Better features often lift accuracy more than swapping in a fancier algorithm." },
        { t: "Why it matters", d: "Same rows and same algorithm, but shaping the features can jump accuracy sharply — it is usually the biggest real-world lever." }
      ] },
      { h: "Encoding categories", items: [
        { t: "One-hot encoding", d: "Turn a category column into one 0/1 column per category, with exactly one column set to 1 per row. Use it for unordered categories.", f: "k categories → k 0/1 columns" },
        { t: "Ordinal encoding", d: "Map ordered categories to ranked integers (S=0, M=1, L=2). Use only when the order is genuine, or you invent a fake ranking." },
        { t: "Unordered means one-hot", d: "Cities like New York, Paris, Tokyo have no rank, so ordinal codes would falsely say Tokyo > New York. One-hot avoids the made-up order." },
        { t: "Target (mean) encoding", d: "Replace each category with the average target seen for it. Compact for high cardinality but leaks the label, so compute it out-of-fold.", f: "category → mean(target | category)" }
      ] },
      { h: "Scaling numbers", items: [
        { t: "Feature scaling", d: "Put numeric features onto a comparable range so no single big-numbered one dominates. Changes the scale, not the information." },
        { t: "Standardization", d: "Subtract the mean and divide by the standard deviation, giving mean 0 and spread 1. Values become z-scores.", f: "z = (x − mean) / std" },
        { t: "Min-max normalization", d: "Rescale so the smallest value is 0 and the largest is 1. Simple but sensitive to outliers stretching the range.", f: "x' = (x − min) / (max − min)" },
        { t: "Why it matters for kNN", d: "Distance models add up differences across features, so a feature spanning tens of thousands drowns one spanning tens. Scaling gives both a fair vote." },
        { t: "When NOT to scale", d: "Trees split one feature at a time by thresholds, so rescaling just moves the threshold. Tree-based models are scale-invariant." }
      ] },
      { h: "Missing values & transforms", items: [
        { t: "Imputation", d: "Fill missing values with a stand-in such as the column's mean or median, keeping the row instead of deleting it." },
        { t: "Median for a few gaps", d: "With only a small fraction missing, median imputation keeps every row and resists outliers. Avoid 0 or huge fills that distort the column." },
        { t: "Log transform", d: "Replace each value with its logarithm to compress large values and pull in a right-skewed tail toward symmetry. Needs positive inputs.", f: "x → log(x) (or log(x+1))" },
        { t: "Binning", d: "Group a continuous number into a few ordered buckets (child / adult / senior). Captures stage-like effects and curbs outliers, losing fine detail." }
      ] },
      { h: "Deriving new features", items: [
        { t: "Feature extraction", d: "Derive new, informative columns from raw text, images, or dates. It creates features, unlike selection which only keeps existing ones." },
        { t: "Datetime features", d: "Pull day-of-week, month, and is-weekend out of a raw timestamp to expose the seasonality a raw string hides.", f: "timestamp → day, month, is-weekend" },
        { t: "Interaction feature", d: "Combine two features, often as a product, to capture a joint effect neither explains alone — like price × quantity giving total spend." },
        { t: "Polynomial features", d: "Add powers and products (x², x³, x·y) so a linear model can fit curves. Too high a degree overfits, so tune the degree.", f: "add x², x³, x·y … then tune degree" },
        { t: "Cyclical encoding", d: "Encode a cyclic value as sine and cosine so its ends sit next to each other — 23:00 and 00:00 become adjacent on a circle.", f: "hour → (sin θ, cos θ)" }
      ] },
      { h: "Handling messy categories & text", items: [
        { t: "High-cardinality problem", d: "One-hot on 5,000 unique IDs makes 5,000 sparse, mostly-zero columns — huge and starved of examples. Use hashing or target encoding instead." },
        { t: "Rare-category grouping", d: "Fold categories seen only a few times into one 'Other' bucket for stable, well-populated columns and fewer overfitting or unseen-value issues." },
        { t: "Feature hashing", d: "Hash categories into a fixed number of columns, so width stays constant at any cardinality. Cheap on memory, at the cost of rare collisions.", f: "category → hash → fixed # cols" },
        { t: "TF-IDF", d: "Weight each word by how often it appears here times how rare it is across all documents. Common words fade, distinctive ones stand out.", f: "weight = TF × IDF" }
      ] },
      { h: "Watch out for", items: [
        { t: "Fit transforms on train only", d: "Computing a scaler's mean and std over all data leaks test info and inflates your score. Fit on train, then apply to test." },
        { t: "Use a Pipeline", d: "Wrap every transform and the model in one Pipeline and fit it inside cross-validation, so each fold relearns prep and leakage is impossible." },
        { t: "Target encoding leaks", d: "If a category's mean includes the row's own label, the feature encodes the answer. Compute means out-of-fold and smooth rare categories." }
      ] }
    ]
  };

  /* ============================ Feature Selection ============================ */
  window.NOTES["fsel"] = {
    key: "fsel", name: "Feature Selection",
    intro: "Keeping a useful subset of the input columns and discarding the rest, to train faster, overfit less, and stay interpretable.",
    groups: [
      { h: "The idea", items: [
        { t: "What it is", d: "Choosing a useful subset of the input columns to keep and dropping the rest, before or during training. It is about columns, not new columns or rescaling." },
        { t: "Why remove features", d: "Fewer, well-chosen features reduce overfitting, cut compute cost, and make the model easier to interpret. A carefully chosen subset often beats keeping everything." },
        { t: "Junk hurts", d: "Irrelevant columns give the model more ways to fit noise. Pile on enough useless columns and accuracy on new data steadily falls." },
        { t: "Cost & interpretability", d: "Each feature is a column someone must collect, clean, and store, and it adds prediction time. Fewer inputs are cheaper, faster, and easier to explain." }
      ] },
      { h: "Kinds of features", items: [
        { t: "Relevant feature", d: "A column that genuinely carries information about the target — knowing it changes your best guess." },
        { t: "Irrelevant feature", d: "A column with no real relationship to the target. Keeping it can only add noise for the model to overfit." },
        { t: "Redundant feature", d: "A column that IS relevant but merely repeats what another kept column already tells you, so it adds no new information." },
        { t: "Correlation is not usefulness", d: "A feature strongly correlated with the target may just duplicate a kept column. Judge by marginal gain — what it adds — not raw correlation.", f: "value = what it adds, not correlation" }
      ] },
      { h: "Three method families", items: [
        { t: "Filter method", d: "Score each feature with a cheap statistic (correlation, chi-squared, mutual information), independently of any model, then keep the top scorers. Fast but ignores interactions." },
        { t: "Wrapper method", d: "Repeatedly train the model on different feature subsets and keep the subset with the best validation score. Captures interactions but is slow." },
        { t: "Embedded method", d: "Selection happens automatically during a single model's training, as part of how it fits — like Lasso zeroing weak weights or trees giving importances." },
        { t: "Filter vs wrapper trade-off", d: "Filters are fast but shallow; wrappers are slow but thorough. On big data with little time, filters win; when you can afford it, wrappers dig deeper.", f: "filter = fast+shallow, wrapper = slow+deep" }
      ] },
      { h: "Common techniques", items: [
        { t: "Univariate selection", d: "Test each feature one at a time against the target with an F-test, chi-squared, or mutual info, and keep the top scorers. Blind to combinations." },
        { t: "SelectKBest", d: "A univariate filter: score every feature and keep the K highest. Too small a K starves the model; too large lets noise back in." },
        { t: "Variance threshold", d: "Drop features that barely change across rows, since a near-constant column carries almost no information. Needs no target." },
        { t: "Mutual information", d: "Measures how much knowing a feature reduces uncertainty about the target. Unlike correlation, it catches non-linear and curved links.", f: "MI = uncertainty removed about target" },
        { t: "Correlation-based selection", d: "Keep features that correlate well with the target while removing ones highly correlated with each other. Relevant, low-redundancy set." }
      ] },
      { h: "Model-driven selection", items: [
        { t: "Lasso (L1)", d: "The L1 penalty shrinks weak coefficients to exactly zero as it fits, so those features drop out. An embedded method — fit and select in one run.", f: "L1 penalty → coefficients hit zero" },
        { t: "Lasso path ranks features", d: "Raise the penalty and the weakest features zero out first while strong ones survive, so the drop-out order is itself an importance ranking." },
        { t: "RFE", d: "Recursive Feature Elimination trains the model, drops the weakest feature, refits, and repeats until the desired number remains. Thorough but slow.", f: "drop weakest, refit, repeat" },
        { t: "Why RFE is expensive", d: "It retrains the whole model roughly once per feature removed, so with hundreds of features that is hundreds of trainings. Cost scales with feature count." }
      ] },
      { h: "Measuring importance", items: [
        { t: "Feature importance", d: "A score for how much each feature contributed to the model's predictions. It reflects predictive contribution, not proof of causation." },
        { t: "Permutation importance", d: "Shuffle one feature's values and measure how far accuracy drops — a bigger drop means a more important feature. Model-agnostic.", f: "importance = accuracy lost when shuffled" },
        { t: "Impurity-importance bias", d: "Tree impurity importance is biased toward high-cardinality columns: many split points let even a random ID look important on training data." },
        { t: "Importance under correlation", d: "Shuffling one of two near-identical features leaves its twin to compensate, so both can look unimportant despite driving the target." }
      ] },
      { h: "Watch out for", items: [
        { t: "Selection leakage", d: "Selecting features on the whole dataset lets the test folds influence the choice, inflating the score. Select inside each training fold only." },
        { t: "Chance correlations", d: "Screen thousands of columns and some match the target by pure luck. Screen on all data and that luck bakes into every fold; use nested selection." },
        { t: "Multicollinearity", d: "When predictors are highly correlated, a linear model can't tell their effects apart, so coefficients swing wildly and become untrustworthy.", f: "correlated predictors = unstable weights" },
        { t: "Drop one of a correlated pair", d: "Two features correlated ~0.98 are near-duplicates; keep one. You lose almost no signal and gain a leaner, steadier model." },
        { t: "Selection stability", d: "If every data resample picks a different feature set, the choice rides noise and may not generalise. Stable picks across resamples earn trust." },
        { t: "Filters miss interactions", d: "A univariate filter scores each feature alone, so it drops features that only help in combination. Use embedded or wrapper methods for interactions." }
      ] }
    ]
  };

  /* ============================ Model Selection ============================ */
  window.NOTES["msel"] = {
    key: "msel", name: "Model Selection",
    intro: "Choosing which model and settings to use by comparing candidates on data they were not trained on.",
    groups: [
      { h: "The idea", items: [
        { t: "What it is", d: "Choosing which model and settings to use by comparing candidates on held-out data. Bigger is not automatically better — you hunt for the peak.", f: "pick argmax(held-out score)" },
        { t: "Never judge on training score", d: "A flexible model can memorise the training rows, including their noise, and still fail on new data. Judge candidates on data they didn't train on." },
        { t: "Baseline model", d: "A deliberately simple model (guess the common class or the average) whose score any real model must beat to earn its keep." },
        { t: "A score needs a baseline", d: "88% is meaningless alone: impressive if a trivial guess gets 60%, embarrassing if it gets 87%. The baseline turns a number into a judgement." }
      ] },
      { h: "Splitting the data", items: [
        { t: "Train / validation / test", d: "Cut the data into three roles: one to learn from, one to tune and compare on, and one to report the final honest score. Keep them separate.", f: "learn · tune · report" },
        { t: "Holdout (validation) set", d: "A slice kept out of training, used to compare candidates and pick settings. Looked at repeatedly, so it slowly loses its innocence." },
        { t: "Validation vs test roles", d: "The validation set is consulted again and again to choose; the test set is opened once at the very end for the honest score." },
        { t: "Touch the test set once", d: "Every peek lets you tune to the test set's quirks, so its score stops predicting the real world. Select on validation, report on test, then stop." }
      ] },
      { h: "Cross-validation", items: [
        { t: "Cross-validation", d: "Rotate which slice is held out so every row gets a turn as validation, then average the scores. Kills the luck of a single split.", f: "average over rotating held-out slices" },
        { t: "k-fold", d: "Cut the data into k equal folds; each fold takes a turn as validation while the rest train. Average the k scores. k=5 or 10 is common.", f: "k folds → train k times, average" },
        { t: "More folds, steadier estimate", d: "Higher k means more training data per run and less wobble between runs, but more compute. k=10 is a popular sweet spot." },
        { t: "Compare with cross-validation", d: "A 2-point win on one 80/20 split can flip on another. Compare average CV scores across folds, not a single lucky slice." },
        { t: "Stratified k-fold", d: "Build each fold to keep the whole dataset's class proportions, so no fold loses the rare class. The sensible default for classification." },
        { t: "Time-series split", d: "For forecasting, never shuffle — it leaks the future into training. Always train on the past and validate on later data.", f: "train on past, test on future" }
      ] },
      { h: "Tuning hyperparameters", items: [
        { t: "Hyperparameter", d: "A setting you choose before training, like tree depth or the k in k-NN. The model does not learn it; you pick it." },
        { t: "Hyperparameter tuning", d: "Try different values for a setting, score each on validation data, and keep the value that validates best.", f: "search settings → keep best validation score" },
        { t: "Grid search", d: "Evaluate every combination from a fixed grid of candidate values and keep the best. Exhaustive and simple, but combinations multiply fast." },
        { t: "Random search", d: "Sample random combinations for a fixed budget of trials and keep the best. Often beats a grid for the same budget when few knobs matter." },
        { t: "Grid vs random cost", d: "A grid's size is values^knobs and explodes with dimensions; random search spends a flat budget and covers the space better with many knobs.", f: "grid = values^knobs · random = fixed budget" }
      ] },
      { h: "Reading the results", items: [
        { t: "Occam's razor", d: "When two models fit about equally well on unseen data, prefer the simpler one — cheaper to run, easier to explain, less prone to overfit.", f: "tie on accuracy → simpler wins" },
        { t: "Simplest model that works", d: "A near-tie in accuracy is a landslide for the simple model once you weigh running cost, clarity, and risk." },
        { t: "One-standard-error rule", d: "Among models within one standard error of the best CV score — statistically tied — pick the simplest. Parsimony made rigorous." },
        { t: "Small gaps are noise", d: "On 200 rows the margin of error is roughly ±5 points, so a 1-point gap is a tie. A difference smaller than the noise band isn't a difference." },
        { t: "Overfitting the validation set", d: "Try enough models and the winner is partly the one that got the luckiest noise draw, so its score overstates its true quality. Confirm on a fresh test set." },
        { t: "Learning curves", d: "Plot performance against training-set size. Still rising? Get more data. Flat? Invest in better features or a more capable model." }
      ] },
      { h: "Deeper principles", items: [
        { t: "Bias-variance tradeoff", d: "Simple models err by being too rigid (bias); complex ones err by chasing noise (variance). Total error is U-shaped; the best balances the two.", f: "error = bias² + variance + noise" },
        { t: "Bias-variance in practice", d: "A deep tree is high-variance (memorises noise); a stump is high-bias (too rigid). Dial complexity to where validation error is lowest." },
        { t: "No Free Lunch theorem", d: "Averaged over all problems, every algorithm ties, so no model is best in the abstract. Test candidates on YOUR data and let evidence decide." },
        { t: "NFL, applied", d: "Shortlist a few genuinely different model families, compare them fairly with cross-validation on your data, and let the data pick the winner." },
        { t: "Nested cross-validation", d: "An outer CV loop estimates performance around an inner loop that tunes. Tuning never sees the outer test folds, so the estimate is honest but costly.", f: "outer loop estimates · inner loop tunes" },
        { t: "Why the outer loop", d: "Tuning and reporting on the same folds inflates the score, just like overfitting a validation set. The outer loop scores on untouched data." }
      ] }
    ]
  };

}());
