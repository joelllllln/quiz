/* Why-wrong notes: Feature Engineering, Feature Selection, Model Selection, XGBoost. Keyed by exact question stem; one entry per distractor, same order as choices[1..]. */
(function () {
  var W = (window.WHYNOT = window.WHYNOT || {});

  /* ---------- feng: Feature Engineering ---------- */

  W["What is feature engineering?"] = [
    "That's model selection; feature engineering shapes the input data, not which algorithm you pick.",
    "That's hyperparameter tuning — adjusting training knobs, not preparing the input columns.",
    "That's data collection; it adds more examples, not better-shaped input columns.",
    "That's model evaluation, which happens after training, not preparing inputs before it."
  ];

  W["In machine learning, what is a 'feature'?"] = [
    "That's the model's output (the prediction); a feature is an input the model reads.",
    "A row is one example; a feature is a column describing every example.",
    "That's the learning algorithm, not a data column the model reads.",
    "That's the loss or residual — a measure of wrongness, not an input column."
  ];

  W["What does one-hot encoding do to a categorical column like Color (red / green / blue)?"] = [
    "That's integer (label) encoding, which invents a fake order between unordered colors.",
    "Colors have no rank to order; one-hot builds indicator columns instead of ranking anything.",
    "That's standardization, a numeric scaling step, not a way to encode categories.",
    "Nothing is deleted — one-hot converts the text column into usable 0/1 numbers."
  ];

  W["What is ordinal encoding?"] = [
    "That's one-hot encoding, used for unordered categories, not rank-reflecting integers.",
    "That's min-max normalization of numeric values, not an encoding of ordered categories.",
    "That's row-dropping data cleaning, not a way to encode category values.",
    "That's target (mean) encoding, which uses the label rather than the categories' rank."
  ];

  W["What is feature scaling?"] = [
    "That's feature selection; scaling changes ranges, it doesn't keep or delete columns.",
    "That's one-hot encoding for categorical data, not rescaling numeric ranges.",
    "That's imputation, which fills gaps rather than adjusting numeric ranges.",
    "A log transform reshapes skew in some columns; scaling means putting features on comparable ranges."
  ];

  W["What is standardization (z-score scaling) of a feature?"] = [
    "That's min-max normalization; z-scores have no fixed 0-to-1 bounds.",
    "That's a rank transform, which throws away magnitudes instead of centering and rescaling them.",
    "That's a log transform for skew, not subtracting the mean and dividing by the std.",
    "That's one-hot encoding of categories, unrelated to rescaling a numeric column."
  ];

  W["What is min-max normalization?"] = [
    "That's standardization (z-scores), which centers on 0 but has no fixed 0-to-1 range.",
    "That's a log transform for skew, not mapping values into a fixed 0-to-1 range.",
    "That's binning (discretization), which groups values instead of rescaling them.",
    "That's target encoding, which uses the label; min-max only uses the column's min and max."
  ];

  W["What is imputation?"] = [
    "That deletes whole useful columns; imputation fills the gaps so data is kept, not thrown out.",
    "That's min-max scaling, which changes ranges, not missing values.",
    "That's one-hot encoding of categories, not filling in blanks.",
    "That's feature selection, unrelated to handling missing entries."
  ];

  W["A k-nearest-neighbours model uses income (0–100,000) and age (0–100) with no scaling. Why do its distances become almost meaningless?"] = [
    "Backwards: kNN works directly on numbers; one-hot encoding is for categories, not numeric columns.",
    "Correlation doesn't break the distance formula; the problem is the mismatched ranges.",
    "Backwards: distances are computed on numbers; categories are what would need encoding.",
    "kNN has no such mechanism — the small-range feature gets drowned out, not deliberately ignored."
  ];

  W["You switch from kNN to a decision tree / random forest. Do you still need to scale income and age first?"] = [
    "Trees never compute distances; they compare a single feature to a threshold at each split.",
    "Trees have no range requirement; a split threshold works at any scale.",
    "Trees do no hidden scaling — they're unaffected because thresholds simply shift with the scale.",
    "Split choice is by impurity reduction, not magnitude, so a large range gives a feature no advantage."
  ];

  W["House prices are heavily right-skewed: most are cheap, a few are enormous. Which transform usually makes the distribution more symmetric and easier to model?"] = [
    "Squaring stretches large values even more, making the right-skew worse, not better.",
    "One-hot is for categories; it would turn each price into a meaningless indicator, not fix skew.",
    "Multiplying by a constant rescales everything equally, leaving the distribution's shape unchanged.",
    "Rounding just coarsens the values; the long right tail stays exactly where it was."
  ];

  W["A numeric column is missing 3% of its values. Which is a reasonable, simple first strategy?"] = [
    "Deleting a 97%-complete column throws away lots of useful signal over a few gaps.",
    "That overwrites the 97% of real values too, not just the blanks.",
    "An extreme filler becomes a fake outlier that badly distorts the column's distribution.",
    "Nearly every real dataset has some gaps; that rule would delete most of your features."
  ];

  W["Your data has a raw timestamp like 2026-07-13 09:00. Which engineered features are most likely to help predict store sales?"] = [
    "A model can't parse calendar patterns out of a raw text string; the structure stays hidden.",
    "Timestamp length is nearly constant and carries no calendar information at all.",
    "Every row has a date, so that flag is constant and carries zero signal.",
    "That product has no calendar meaning — it's arbitrary noise, not a pattern."
  ];

  W["A column City has values New York, Paris, and Tokyo with no natural order. Which encoding is appropriate?"] = [
    "Ordinal codes invent a rank (Tokyo 2 > New York 0) that simply doesn't exist for cities.",
    "You can't compute the mean of city names; standardization applies to numeric columns.",
    "Logarithms need positive numbers; they can't be applied to text labels.",
    "Most models need numeric input; raw text strings can't be used in the math directly."
  ];

  W["Why might you bin a continuous 'age' feature into groups like child / adult / senior?"] = [
    "Slower training is never a goal; binning is about exposing stage-like effects.",
    "Backwards: models handle numeric columns fine; binning is a choice, not a requirement.",
    "No transform guarantees higher accuracy; binning trades fine detail for robustness.",
    "Binning groups values into ranges; it has nothing to do with dates."
  ];

  W["What is binning (discretization)?"] = [
    "That's standardization; binning groups values into buckets rather than rescaling them.",
    "That's one-hot encoding of existing categories; binning creates groups from a continuous number.",
    "That's imputation, which fills gaps, not grouping a continuous value into ranges.",
    "That's building an interaction feature, not discretizing one column."
  ];

  W["What is an interaction feature?"] = [
    "That's min-max scaling of one column, not capturing two features' joint effect.",
    "That's one-hot encoding of a single categorical column, not a combination of features.",
    "That's a feature-importance idea, not a new column built by combining two features.",
    "That's imputation; no combining of features is involved."
  ];

  W["What is a log transform of a feature?"] = [
    "Min-max scaling preserves the distribution's shape; it can't pull in a skewed tail like a log does.",
    "That's binning, which discretizes; a log keeps values continuous while compressing the big ones.",
    "That's one-hot encoding for categoricals, unrelated to compressing large numeric values.",
    "That's target encoding, which uses the label, not a math transform of the values themselves."
  ];

  W["What is feature extraction?"] = [
    "That's feature selection — keeping a subset of existing columns, not creating new ones.",
    "That's row-level data cleaning; extraction builds new columns, it doesn't drop rows.",
    "That's standardization, which rescales an existing column rather than deriving new ones.",
    "That's model selection, not turning raw data into usable features."
  ];

  W["Hour-of-day runs 0…23, but hour 23 and hour 0 are actually adjacent. How do you encode this so the model knows midnight wraps around?"] = [
    "On a straight 0–23 line, 23 and 0 look 23 apart even though they're one hour apart — the wrap is lost.",
    "One-hot treats every hour as unrelated, throwing away the ordering and adjacency entirely.",
    "Logs compress large values; they don't connect hour 23 back around to hour 0.",
    "Standardizing shifts and rescales the line, but 23 and 0 still sit at opposite ends."
  ];

  W["A column has 5,000 unique product IDs. Why is plain one-hot encoding a poor choice here?"] = [
    "Backwards: one-hot is exactly for categorical values; the problem is scale, not data type.",
    "One-hot imposes no order at all; ranking isn't the issue, the exploding width is.",
    "One-hot keeps a column for every category; it drops nothing automatically.",
    "One-hot never touches the target; that's target encoding."
  ];

  W["You standardize your features using the mean and standard deviation of the ENTIRE dataset, then split into train/test. What is wrong?"] = [
    "It seems more accurate, but the test set has now influenced the transform, inflating your test score.",
    "Standardization itself is fine and often helpful; the mistake is which data the statistics come from.",
    "That's even worse leakage — the statistics must come from the training split only.",
    "Per-row scaling is meaningless: mean and std are column statistics fit once on training data."
  ];

  W["A category column has 50 values, but 40 of them appear fewer than 5 times each. A common fix is to…"] = [
    "That throws away good rows whose other columns are still perfectly informative.",
    "Forty near-empty columns invite overfitting and unseen-category failures at test time.",
    "Random numbers destroy all the column's information, not just the noisy rare labels.",
    "Category labels aren't numbers; standardization doesn't apply and wouldn't fix rarity anyway."
  ];

  W["A straight-line model underfits data that clearly curves. Adding x² and x³ as new features lets it…"] = [
    "Adding powers increases the feature count; nothing gets reduced.",
    "The opposite risk: high-degree polynomial features are a classic route into overfitting.",
    "Polynomial features change the inputs, not the target's type.",
    "Powers actually spread value ranges wider, making scaling more important, not less."
  ];

  W["What is a polynomial feature?"] = [
    "That's min-max scaling, not raising a feature to a power or crossing features.",
    "That's one-hot encoding of categories, not powers or products of numeric features.",
    "That's imputation, not a derived power or product column.",
    "That's a feature-importance notion, not a column built from powers or products."
  ];

  W["What is target (mean) encoding of a categorical feature?"] = [
    "That's one-hot encoding; target encoding collapses the column to one number using the label.",
    "That's an arbitrary ordinal code — alphabet order carries no target information.",
    "Standardizing counts involves no target statistic, so it isn't target encoding.",
    "Target encoding keeps the column's signal as a number; dropping it discards the signal entirely."
  ];

  W["What does TF-IDF do to a piece of text?"] = [
    "Character count says nothing about which words distinguish a document.",
    "TF-IDF is a numeric weighting scheme for words, not translation.",
    "There's no such truncation; TF-IDF weights every word by frequency and rarity.",
    "A word's alphabet position carries no information about its importance in a document."
  ];

  W["What is feature hashing (the 'hashing trick')?"] = [
    "The hash is used for dimensionality control, not encryption or security.",
    "No importance is computed; the hash just assigns each category a fixed column slot.",
    "It encodes categories into columns; it doesn't touch missing values.",
    "That's row deduplication — a different job; feature hashing maps categories to columns."
  ];

  W["Target encoding uses the label, so it can leak information from the target into the features. What is the standard defense?"] = [
    "Using the test set is worse leakage — the encoding must never see test data.",
    "That bakes test labels into the features, exactly the leakage you're defending against.",
    "Without a split you can't measure generalization at all; leakage gets worse, not better.",
    "Noising the label corrupts training and still lets a row's own label reach its feature."
  ];

  W["What is the cleanest way to guarantee every transform — scaling, imputation, encoding — is fit on training data only during cross-validation?"] = [
    "Transforming before splitting lets test rows influence the transforms — the very leakage to prevent.",
    "Same leakage: transforms fit on all the data have already seen the future test folds.",
    "Test statistics are precisely what must stay unseen; transforms fit on train only.",
    "Skipping CV loses your performance estimate; it hides the leakage problem, not solves it."
  ];

  /* ---------- fsel: Feature Selection ---------- */

  W["What is feature selection?"] = [
    "That's feature engineering — creating new columns, not choosing among the ones you have.",
    "That's feature scaling; it changes units, not which columns you keep.",
    "That's data splitting for evaluation; selection is about columns, not rows.",
    "That's imputation, a cleaning step, not choosing a subset of columns."
  ];

  W["Why bother REMOVING features instead of just keeping every column you have?"] = [
    "More features often hurt — irrelevant columns add noise the model can overfit to.",
    "Removing features usually lowers training fit slightly; the payoff is on new data, never a guarantee.",
    "Disk space is a minor perk; the real wins are less overfitting, speed, and interpretability.",
    "You still need held-out data to evaluate; selection never replaces validation."
  ];

  W["What is a FILTER method for feature selection?"] = [
    "That describes a wrapper method; filters never train a model during selection.",
    "That's an embedded method (like Lasso), where one model selects while it fits.",
    "That's outlier cleaning on rows; filters score and keep columns.",
    "That's signal smoothing to remove measurement noise, not feature selection at all."
  ];

  W["What is a WRAPPER method for feature selection?"] = [
    "That's a filter method; wrappers train the actual model to judge each subset.",
    "That's an embedded method like Lasso, not a search over subsets with retraining.",
    "That's feature scaling; the 'wrap' means wrapping the model in a search, not a scaler.",
    "Wrappers select columns, not rows; outlier removal is a different step entirely."
  ];

  W["What is an EMBEDDED method for feature selection?"] = [
    "That's a filter method — scoring before training, the opposite of selecting during it.",
    "That's a wrapper method; embedded selection needs just one training run.",
    "That's manual, domain-driven selection, not the model selecting as it fits.",
    "That's vector embeddings for representing data — a different meaning of the word."
  ];

  W["What is UNIVARIATE feature selection?"] = [
    "Testing combinations is a subset search (wrapper-style); univariate means one feature at a time.",
    "Univariate selection scores each feature against the target, not against other features.",
    "That's dimensionality reduction like PCA, which builds new columns instead of testing existing ones.",
    "Univariate selection uses a statistical test, not random picks."
  ];

  W["What does a VARIANCE THRESHOLD do?"] = [
    "It never looks at the target; it only measures a column's own spread across rows.",
    "It acts on columns, not rows, and it ignores the target entirely.",
    "Backwards: near-constant, low-variance columns are exactly what it removes.",
    "That's scaling; a variance threshold removes columns, it doesn't rescale them."
  ];

  W["A column records the temperature on Mars for each of your loan applicants. It has nothing to do with whether they repay. What kind of feature is this?"] = [
    "Redundant means duplicating a useful column; Mars weather has no repayment signal to duplicate.",
    "A leaky feature secretly encodes the answer; this column has no link to the target at all.",
    "Varying a lot doesn't make it useful — variance with no link to the target is just noise.",
    "An interaction feature helps in combination; Mars weather helps in no combination."
  ];

  W["A REDUNDANT feature differs from an IRRELEVANT one because a redundant feature is..."] = [
    "That's the definition of an irrelevant feature, not a redundant one.",
    "Missing values are a data-quality issue, unrelated to redundancy.",
    "Scale is fixable by rescaling; redundancy is about duplicated information, not units.",
    "The most important feature is the one you keep — not a duplicate you'd drop."
  ];

  W["A feature is strongly correlated with the target. Does that guarantee it will improve your model?"] = [
    "Usefulness is marginal: if a kept column already carries that signal, this one adds nothing new.",
    "Correlation flags candidates; a model needs NEW information, which a duplicate doesn't provide.",
    "Too strong — correlation is a useful screening statistic, just not a promise of value.",
    "Features far below 1.0 can be very useful; a perfect 1.0 would actually suggest leakage."
  ];

  W["What is FEATURE IMPORTANCE?"] = [
    "That's a feature-to-feature redundancy check, not how much the model relied on a feature.",
    "Missing-value counts describe data quality, not predictive contribution.",
    "Column order in a file is arbitrary and says nothing about usefulness.",
    "Importance measures predictive contribution — it is never proof of causation."
  ];

  W["Besides accuracy, why do teams often prefer a model built on FEWER features?"] = [
    "Fewer features can also cost accuracy; the benefits are practical, not a guaranteed score boost.",
    "Every model needs held-out validation regardless of how many features it uses.",
    "Hyperparameter tuning is about the model's knobs; a lean feature set doesn't remove it.",
    "Backwards: fewer inputs mean less computation, so predictions genuinely get faster."
  ];

  W["What does scikit-learn's SelectKBest do?"] = [
    "SelectKBest never trains models; it scores features with a chosen statistic.",
    "It selects columns (features), not representative rows.",
    "It keeps existing features; building new ones is feature engineering.",
    "It ranks by score — random picks would be a baseline, not SelectKBest."
  ];

  W["You must choose between a FILTER method and a WRAPPER method on a big dataset with limited time. What is the core trade-off?"] = [
    "Backwards: filters are the fast ones, and wrappers often find the stronger subsets.",
    "Filters train no models during selection while wrappers train many — a huge cost difference.",
    "Backwards: repeatedly training the model is exactly what makes wrappers expensive.",
    "Both approaches work for regression and classification; no such restriction exists."
  ];

  W["What is the 'curse of dimensionality' and why does it motivate feature selection?"] = [
    "There's no crash threshold at 1000 columns; the problem is data sparsity growing gradually.",
    "Storage is fine — the issue is statistical: points spread thin, not disk limits.",
    "It's a statistical problem solved by fewer features or more data, not by buying RAM.",
    "Backwards: the curse says extra features can hurt because the data becomes sparse."
  ];

  W["What is MUTUAL INFORMATION as a feature-selection score?"] = [
    "Backwards: MI's whole advantage is catching non-linear links that Pearson correlation misses.",
    "That's a co-occurrence count, not a measure of reduced uncertainty about the target.",
    "A variance ratio says nothing about the dependence between a feature and the target.",
    "Missing-value counts have nothing to do with information shared with the target."
  ];

  W["What is CORRELATION-BASED feature selection?"] = [
    "Backwards: correlation among features marks redundancy to remove; target correlation is what you keep.",
    "Target correlation is the signal you want; removing it would leave only useless columns.",
    "Unique-value counts aren't correlation and say nothing about relevance or redundancy.",
    "That's PCA — creating new combined columns, not selecting among existing ones."
  ];

  W["What is Recursive Feature Elimination (RFE)?"] = [
    "That's a filter; RFE's defining trait is retraining after every removal.",
    "That's forward selection — the opposite direction from RFE's backward elimination.",
    "RFE eliminates feature columns, not outlier rows.",
    "RFE removes the weakest feature by model importance, never at random."
  ];

  W["Why is RFE often described as computationally EXPENSIVE?"] = [
    "Memory isn't the bottleneck; the repeated full retraining is.",
    "RFE runs on any hardware — it's slow from many trainings, not GPU requirements.",
    "It uses the model's own importances, not a special slow test; the cost is the retraining.",
    "The data is already labeled; no manual labeling happens between steps."
  ];

  W["How does LASSO (L1) regression perform feature selection?"] = [
    "That's a pre-training filter; Lasso selects during fitting through its penalty.",
    "The opposite: Lasso's penalty geometry drives weak coefficients exactly to zero.",
    "That's Ridge (L2), which shrinks coefficients but never reaches exactly zero.",
    "Lasso penalizes coefficients; it doesn't remove rows."
  ];

  W["As you raise Lasso's penalty, which coefficients hit exactly zero FIRST, and what does that tell you?"] = [
    "Backwards: strong features buy accuracy worth their penalty cost, so they survive longest.",
    "Coefficients drop out gradually along the penalty path, not all at one value.",
    "Missingness plays no role; the penalty acts on how useful each coefficient is.",
    "The order is systematic — weakest first — which is exactly why it works as a ranking."
  ];

  W["You run feature selection on the WHOLE dataset, then do cross-validation on the selected features. Why is your reported accuracy too optimistic?"] = [
    "CV is honest when selection happens inside each fold; the timing of selection is the whole issue.",
    "Selection doesn't change row counts; the bias comes from leakage, not sample size.",
    "The score really is biased upward; speed isn't the issue at all.",
    "It's a classic leakage mistake — selection must happen inside each training fold."
  ];

  W["Two features in your data are correlated 0.98 (near-duplicates). What is the sensible move?"] = [
    "Correlation between two features means duplication, not double importance; the second adds ~nothing.",
    "One of them still carries the real signal; dropping both throws that away.",
    "That adds a third redundant column, making the multicollinearity worse.",
    "Deleting rows loses data and does nothing about the duplicated column."
  ];

  W["What is MULTICOLLINEARITY?"] = [
    "Feature-to-target correlation is relevance — a good thing; multicollinearity is among predictors.",
    "That's multiclass classification, unrelated to correlation between features.",
    "Different scales are fixed by rescaling; multicollinearity is about inter-feature correlation.",
    "More rows than columns is the normal, healthy shape for data — not a collinearity problem."
  ];

  W["What is PERMUTATION IMPORTANCE?"] = [
    "That's split-count ('weight') importance from trees, not shuffle-and-measure.",
    "Coefficient size is a linear-model-specific measure, not shuffling a column.",
    "Permutation importance needs a trained model; a pre-training correlation is a filter score.",
    "Unique-value counts describe the column itself, not the model's reliance on it."
  ];

  W["A random ID-like column with thousands of unique values gets a HIGH tree impurity importance. Why is this a known trap?"] = [
    "A random ID predicts nothing on new data; its high score is an artifact of the bias.",
    "It computes fine at any cardinality — that's the trap; the score is just biased upward.",
    "No memory failure is involved; the bias is a property of impurity scoring itself.",
    "No importance measure deliberately inflates random columns; the inflation is unwanted bias."
  ];

  W["You screen 10,000 candidate columns on the full dataset, keep the 20 that best predict the target, then report cross-validated accuracy. Why can this look great yet be worthless?"] = [
    "Speed isn't the problem; the score itself is invalid because chance fits taint every fold.",
    "The number kept isn't the issue; screening on all the data before CV is.",
    "CV works fine after screening — provided the screening happens inside each fold (nested).",
    "Scaling doesn't remove chance correlations; the leakage remains."
  ];

  W["You rerun feature selection on several random subsamples of your data and each run picks a DIFFERENT set. What does this instability mean?"] = [
    "Instability signals noisy or interchangeable choices, not that the features carry no signal.",
    "It's a real warning: a set picked on one split may not hold up on new data.",
    "Adding features gives selection more noise to ride; it doesn't stabilize anything.",
    "No run is privileged — each is equally driven by its own subsample's noise."
  ];

  W["Two features are nearly perfect copies of each other, and both truly drive the target. What does PERMUTATION importance report for each, and why?"] = [
    "Shuffling one at a time lets the intact twin cover, so neither shows a large accuracy drop.",
    "Permutation doesn't allocate credit to one twin; both just show small drops from compensation.",
    "Permutation importance measures features on the trained model; it never drops them first.",
    "Permutation importances aren't percentages that sum; the twin effect deflates them, not inflates."
  ];

  W["Your target depends on an INTERACTION between two features (their combination flips the answer). A univariate FILTER keeps missing them. Why, and what selects them better?"] = [
    "Filters are fast; the failure is conceptual — one-at-a-time scoring — not a speed limit.",
    "Univariate filters work for classification too; their blind spot is interactions, not task type.",
    "Wrappers and embedded methods routinely capture interactions; only one-at-a-time filters can't.",
    "Scaling doesn't change a filter's one-feature-at-a-time view; the interaction stays invisible."
  ];

  /* ---------- msel: Model Selection ---------- */

  W["What is model selection?"] = [
    "That's just overfitting one model — zero training error means memorization, not a comparison.",
    "That's feature engineering; model selection compares candidate models, not columns.",
    "Training speed ignores accuracy; candidates must be judged on held-out performance.",
    "That's ensembling — combining models — not choosing among them."
  ];

  W["What is a baseline model?"] = [
    "The baseline comes first as a reference point, not last as the shipped product.",
    "A baseline is deliberately trivial; a giant model is the opposite of a reference floor.",
    "No model may ever train on the test set — that destroys the test's honesty.",
    "That's an ensemble, not a trivial reference guess."
  ];

  W["What is a train / validation / test split?"] = [
    "The piles have different jobs (and usually sizes); you don't train a separate model per pile.",
    "The split is across rows (examples), not across columns (features).",
    "That's repeated random evaluation, not assigning three distinct roles to the data.",
    "Calendar splitting is a time-series technique, not the definition of the three roles."
  ];

  W["What is a holdout (validation) set?"] = [
    "Backwards: a holdout is precisely the slice kept OUT of training.",
    "A copy of training data shows nothing about generalization; the point is unseen examples.",
    "It's a representative slice of data, not one hand-picked hard case.",
    "That's fresh production data for retraining; the holdout is set aside before training."
  ];

  W["What is cross-validation?"] = [
    "Two runs on the same data measure the luck of a run, not generalization across splits.",
    "A different project's dataset changes the task; CV rotates slices of your own data.",
    "Model agreement says nothing about accuracy — both could be wrong together.",
    "That's data cleaning; 'validation' here means measuring model performance on held-out data."
  ];

  W["What is k-fold cross-validation?"] = [
    "Retraining on identical data measures nothing new; the held-out fold must rotate.",
    "k counts folds, not a percentage; each fold takes its turn as the validation slice.",
    "k-fold evaluates one model k times; it's not a race between k algorithms.",
    "No repeated halving happens; the data is cut once into k equal folds."
  ];

  W["What is hyperparameter tuning?"] = [
    "Weights are learned parameters; hyperparameters are knobs the model can't set for itself.",
    "Editing outputs after the fact isn't tuning; tuning changes settings before training.",
    "That's data collection, not adjusting the model's settings.",
    "That's an engineering speed-up, not a search over candidate setting values."
  ];

  W["What is Occam's razor (parsimony) in modelling?"] = [
    "Backwards: Occam's razor cuts complexity that hasn't earned its keep.",
    "Beating the baseline is a separate sanity check, not what parsimony means.",
    "Training speed isn't the criterion; simplicity given equal performance is.",
    "Ensembling adds complexity — the opposite of preferring the simpler equal performer."
  ];

  W["Why must you NOT use the test set to choose between models — only look at it once, at the very end?"] = [
    "Size isn't the issue; even a huge test set loses honesty once you tune against it.",
    "Every evaluation set has labels; the problem is repeated peeking, not the labels.",
    "Nothing is physically erased — the damage is statistical: your choices absorb its quirks.",
    "It's a statistical principle about honest estimates, not a legal requirement."
  ];

  W["You compared two models with a single 80/20 holdout and model B won by 2 points. A colleague warns this could be luck. What is the more reliable way to compare them?"] = [
    "Rerunning the identical split gives the identical answer; the split's luck never averages away.",
    "A 2-point gap on one split is easily noise; it can flip on a different split.",
    "Training scores reward memorization and can't rank models on generalization.",
    "Speed is a fine tiebreaker later, but first the accuracy comparison itself needs stabilizing."
  ];

  W["Two models are essentially tied on validation accuracy: a 3-line logistic regression and a giant black-box ensemble. Which should you generally ship?"] = [
    "Complexity buys nothing here — the scores tied — and it adds cost, opacity, and failure modes.",
    "Retraining on the same data mostly reshuffles noise; the tie itself is the answer.",
    "Training scores reward memorization; the ensemble would win that contest meaninglessly.",
    "Serving two models doubles complexity and makes behavior inconsistent, with no gain."
  ];

  W["What are the distinct roles of the validation set versus the test set?"] = [
    "Exactly backwards: tuning uses validation, and the test set gives the one final score.",
    "Once a set is consulted repeatedly it can no longer play the untouched-test role.",
    "The roles are about when each set is consulted, not the task type.",
    "Neither held-out set ever trains the model — that's the training set's job."
  ];

  W["Your model reports 88% accuracy. Before celebrating, what single fact do you most need to judge whether that's good?"] = [
    "Code length says nothing about whether 88% beats an easy guess.",
    "Training time doesn't tell you whether the score beats a trivial guess.",
    "The number of knobs is irrelevant to whether 88% is actually good.",
    "The model family gives the number no context; the baseline does."
  ];

  W["You're tuning the number of neighbours k in k-NN. Concretely, what does 'tuning' this hyperparameter involve?"] = [
    "k is a hyperparameter — k-NN has no mechanism to learn it during training.",
    "There's no rule linking k to the feature count; the right k is found empirically.",
    "k=1 always looks perfect on training data — that's exactly the trap.",
    "Tuning means comparing candidate values, not committing to one blind guess."
  ];

  W["Why can't you select the best model by simply picking whichever one scores highest on the training data?"] = [
    "Backwards: training scores run high, not low — which is exactly why they mislead.",
    "Data quality isn't the issue; memorization inflating the score is.",
    "Training scores exist for classification too; the problem applies to both task types.",
    "Backwards: the most complex, memorizing models tend to top the training score."
  ];

  W["What is grid search for hyperparameters?"] = [
    "That's random search, not exhaustively evaluating a fixed grid.",
    "Hyperparameters are your knobs; models can't adjust them during training.",
    "Others' settings are starting hints, not a systematic evaluation on your data.",
    "That's one-knob-at-a-time tuning, which misses the combinations a grid covers."
  ];

  W["What is random search for hyperparameters?"] = [
    "One random draw isn't a search; random search compares many trials and keeps the best.",
    "Shuffling training data is part of training, not hyperparameter search.",
    "A random forest is a model; it doesn't tune another model's hyperparameters.",
    "That's still a full grid search; random search samples freely and stops at a budget."
  ];

  W["What is stratified k-fold cross-validation?"] = [
    "Sorting by target would make folds unrepresentative — the opposite of mirroring the class mix.",
    "Folds split rows; there's no per-feature cross-validation to average.",
    "Fold counts don't vary by class; the class proportions inside each fold are what's controlled.",
    "A single-class fold is the worst case stratification prevents — you can't evaluate on one class."
  ];

  W["You're forecasting next month's sales from past months. Why is ordinary shuffled k-fold the wrong way to validate, and what should you use instead?"] = [
    "More folds don't fix the leakage; shuffling still trains on the future.",
    "A random 80/20 split has the same future-leakage flaw; speed was never the issue.",
    "Leave-one-out on random rows is still shuffled — future rows leak into training regardless.",
    "Time series validate fine with forward-chaining splits; training scores are never a substitute."
  ];

  W["You have 6 hyperparameters to tune and a fixed compute budget. Why do practitioners often prefer random search over a full grid here?"] = [
    "Random search has no optimality guarantee; its edge is better coverage per trial.",
    "Grids handle any number of knobs in principle — they just get exponentially expensive.",
    "Per-trial cost is the same either way; the difference is how the budget is spread.",
    "Grid search is task-agnostic; there's no such regression-only restriction."
  ];

  W["You tried 200 model variants and picked the one with the best validation score. Why is that winning validation score likely too optimistic?"] = [
    "Set sizes aren't the issue, and the bias here is upward, not a low reading.",
    "Order doesn't matter; the bias comes from taking the max of many noisy scores.",
    "Time has no effect on scores; the optimism comes from the number of comparisons.",
    "The training data is untouched; it's the validation estimate that gets overfit."
  ];

  W["Your learning curve shows validation accuracy has flattened out and adding more training data barely helps. What does this tell you to do next?"] = [
    "A plateau means this model has extracted what it can; the curve won't spontaneously jump.",
    "Shrinking the data only moves you back down the curve.",
    "A simpler model has less capacity — likely worse; the ceiling calls for more capability.",
    "Flat means more data won't help — not that the current accuracy is good enough."
  ];

  W["On a 200-row test set, model A scores 84% and model B scores 85%. A teammate declares B the winner. What's the sound response?"] = [
    "Sample size sets the noise; on 200 rows the ~±5-point noise band dwarfs a 1-point gap.",
    "Nothing says A is smaller, and the real issue is that the gap is within noise.",
    "Repeated testing on the same 200 rows never removes that particular sample's luck.",
    "One small sample can't prove anything about all future data."
  ];

  W["What is the one-standard-error rule in model selection?"] = [
    "Ignoring the variance is exactly what the rule corrects — the top score may be riding noise.",
    "The rule compares to the best score's error band, not to zero.",
    "No score is adjusted; the standard error just defines a tie band around the best.",
    "Training time has nothing to do with the rule; it's about the spread of CV scores."
  ];

  W["What is nested cross-validation?"] = [
    "Repeating identical folds averages nothing new; nesting puts a tuning loop inside an estimating loop.",
    "Ordinary k-fold already does that; nesting adds an inner tuning loop, not one extra split.",
    "The loops aren't unrelated: the inner one tunes inside each outer training fold by design.",
    "The outer loop evaluates the whole tuned model; both loops involve training models."
  ];

  W["What is the bias-variance tradeoff?"] = [
    "That's a compute trade-off, not the two sources of prediction error.",
    "That's a statistics-estimation topic, not model complexity's effect on error.",
    "That's a data-splitting decision, not the decomposition of prediction error.",
    "A real tension, but a different one; bias-variance is about two kinds of error, not explainability."
  ];

  W["What does the No Free Lunch theorem say about model selection?"] = [
    "On a given problem models genuinely differ; equality only holds averaged over ALL problems.",
    "NFL denies any universal winner — complex models included.",
    "NFL is about algorithms across problems, not about data quantity.",
    "CV estimates the candidates you tried; it can't guarantee a global optimum."
  ];

  W["You want to BOTH tune hyperparameters AND report an honest performance estimate. Why isn't a single cross-validation loop enough — why add an outer loop?"] = [
    "The outer loop adds cost, not speed; it exists to keep the reported estimate honest.",
    "Shuffling isn't the point; separating tuning data from scoring data is.",
    "A single CV loop can tune many hyperparameters; the problem is biased reporting, not capacity.",
    "Retraining on the full data for deployment is a separate final step, not the outer loop's job."
  ];

  W["A deep tree nails the training data but flops on new data, while a stump underperforms on both. Through the bias-variance lens, what's the fix?"] = [
    "A perfect training fit is the symptom of high variance, not the goal.",
    "Simplicity isn't automatically right; the stump's high bias makes it miss the pattern.",
    "More capacity raises variance further — the direction that's already failing.",
    "More training doesn't cure overfitting; the tree already fits the training data perfectly."
  ];

  W["Given the No Free Lunch theorem, what's the practical strategy when starting a new prediction problem?"] = [
    "Wins on other problems don't transfer; NFL says your own data must be the judge.",
    "Complexity isn't a default winner; evidence on your specific problem decides.",
    "A different problem can favor a different model; convenience isn't evidence.",
    "Benchmarks come from other datasets; only testing on your data is decisive."
  ];

  /* ---------- xgb: XGBoost ---------- */

  W["What is XGBoost?"] = [
    "XGBoost builds many small trees; one deep memorizing tree is the opposite of its design.",
    "That describes deep-learning libraries; XGBoost is tree-based and aimed at tabular data.",
    "Clustering is unsupervised; XGBoost is a supervised learner that uses labels.",
    "Boosted trees fit non-linear patterns; XGBoost is not a single straight-line fit."
  ];

  W["What is gradient boosting (the idea XGBoost is built on)?"] = [
    "That's bagging (random forests); boosting builds trees in sequence, each fixing prior errors.",
    "That's model selection; boosting keeps and combines all its models.",
    "That's one overgrown decision tree, not an additive ensemble.",
    "That's neural-network training — a different algorithm family entirely."
  ];

  W["What is regularized boosting (what the 'regularized' in XGBoost adds)?"] = [
    "Regularization penalizes complexity; removing randomness is about reproducibility, a separate matter.",
    "That resembles hard-example mining; the penalty changes the objective, not which rows are used.",
    "Trees stay free-form; the penalty discourages complexity, it doesn't fix their shape.",
    "No penalty guarantees anything — validation is still essential."
  ];

  W["What is the learning rate (eta) in XGBoost?"] = [
    "That's n_estimators; eta scales each tree's contribution instead of counting trees.",
    "That's max_depth; eta is a step-size multiplier, not a tree-size cap.",
    "That's subsample; eta shrinks tree outputs rather than sampling data.",
    "That's a classification decision threshold applied after prediction, not during boosting."
  ];

  W["What does n_estimators (number of boosting rounds) control?"] = [
    "That's max_depth, a per-tree limit, not the ensemble's tree count.",
    "That's the learning rate (eta), not the number of boosting rounds.",
    "That's a colsample-style setting, not the round count.",
    "That's min_child_weight territory, not the size of the ensemble."
  ];

  W["What does the max_depth hyperparameter control in XGBoost?"] = [
    "That's n_estimators; max_depth limits split levels within one tree.",
    "That's gamma (min_split_loss), a gain threshold, not a depth cap.",
    "That's the learning rate (eta), not tree structure.",
    "That's colsample_bytree, not how deep a tree can grow."
  ];

  W["What is the objective function in XGBoost?"] = [
    "Which features are available is a data/colsample matter, not the loss being minimized.",
    "The tree count comes from n_estimators and early stopping, not the objective.",
    "The random seed controls reproducibility, not what training minimizes.",
    "Row order doesn't define wrongness; the objective is a loss formula."
  ];

  W["What is early stopping in XGBoost?"] = [
    "That's a feature-elimination scheme like RFE, not halting the boosting rounds.",
    "That's the depth cap acting inside one tree, not stopping the whole training run.",
    "Training error keeps improving even while overfitting, so it can't be the stop signal.",
    "Rows aren't skipped; early stopping is about when to stop adding trees."
  ];

  W["Why does XGBoost add regularization on top of plain gradient boosting?"] = [
    "Slowness has no value in itself; the penalty targets complexity, and XGBoost is built for speed.",
    "Backwards: regularization sacrifices some training fit to generalize better.",
    "Regularization reduces overfitting but never replaces validation.",
    "Regularization discourages complexity; forcing every feature into each tree would add it."
  ];

  W["When XGBoost adds a new tree, what is that tree actually trained to predict?"] = [
    "Restarting would ignore all progress; each tree corrects what the ensemble still gets wrong.",
    "The targets aren't random; they're the loss gradients of the current predictions.",
    "The ensemble already has its combined prediction; the new tree fits the leftover error instead.",
    "Trees predict corrections to the loss, not the values of any feature."
  ];

  W["You lower the learning rate (eta) from 0.3 to 0.03. What else should you usually change?"] = [
    "Backwards: smaller steps do less per tree, so you need more trees, not fewer.",
    "Any eta can overfit given enough trees; the validation set stays essential.",
    "Depth is a separate knob; deeper trees would add overfitting, not offset a smaller step size.",
    "They trade off directly: smaller steps need more of them to reach the same fit."
  ];

  W["A row has a missing value for one feature. How does XGBoost handle it at a split?"] = [
    "XGBoost keeps rows with missing values; native handling is one of its selling points.",
    "No imputation happens; a learned default direction is used instead of the mean.",
    "It trains fine with missing values; no error is raised.",
    "The direction is learned per split from the data, not fixed by any convention."
  ];

  W["Your XGBoost model scores 99% on training but 74% on validation. Which change is LEAST likely to help?"] = [
    "This would actually help: shallower trees have less room to memorize, shrinking the gap.",
    "This would actually help: smaller steps plus stopping at the validation peak curb overfitting.",
    "This would actually help: sampling rows and columns decorrelates trees and regularizes.",
    "This would actually help: stronger complexity penalties directly fight overfitting."
  ];

  W["Why does XGBoost tend to dominate on tabular (spreadsheet-like) data?"] = [
    "Data volume isn't the reason; its fit to tabular structure is.",
    "No image conversion happens; XGBoost splits directly on feature thresholds.",
    "Backwards: trees are scale-invariant and need no distributional assumptions.",
    "Exact memorization is overfitting — the very thing its regularization exists to prevent."
  ];

  W["To use early stopping, what must you provide to XGBoost?"] = [
    "Training error keeps falling even while overfitting, so it can't signal when to stop.",
    "That defeats the purpose — early stopping exists to find the tree count for you.",
    "A copy of the training data scores like training data; it reveals no overfitting.",
    "Early stopping compares the model to its own earlier rounds, not to another model."
  ];

  W["What is a DMatrix in XGBoost?"] = [
    "A confusion matrix summarizes predictions after the fact; DMatrix is the input data container.",
    "Importances are a training output; DMatrix holds the inputs.",
    "Hyperparameters go in a separate params object; DMatrix carries the data.",
    "XGBoost never computes pairwise row distances; it's a tree method, not a distance one."
  ];

  W["What does the scale_pos_weight parameter do?"] = [
    "That's feature scaling; this parameter weights a class, not the columns.",
    "Eta is global; scale_pos_weight changes the class's gradient weight, not a per-row learning rate.",
    "There's no such leaf quota; it rebalances the loss contributions of the classes.",
    "It acts during training on the loss, not on the output probabilities afterwards."
  ];

  W["What does subsample = 0.8 do in XGBoost?"] = [
    "That's colsample_bytree; subsample draws rows, not columns.",
    "All trained trees contribute at prediction time; the sampling happens during training.",
    "There's no accuracy target; 0.8 is a fraction of rows, not a stopping score.",
    "Row sampling doesn't zero leaf weights; that would be an L1-penalty-style effect."
  ];

  W["What does colsample_bytree = 0.6 control?"] = [
    "That's subsample; colsample_bytree draws columns, not rows.",
    "Every tree votes at prediction time; the sampling is per tree during training.",
    "That confuses it with a gain threshold like gamma — and gamma is an absolute amount, not a percent.",
    "Leaf shrinkage comes from eta and lambda, not from column sampling."
  ];

  W["What does the gamma (min_split_loss) parameter do?"] = [
    "That's eta; gamma is a split-gain threshold, not a step size.",
    "That's n_estimators; gamma acts on individual splits, not the tree count.",
    "That's scale_pos_weight; gamma has nothing to do with class balance.",
    "That's min_child_weight; gamma demands a minimum loss reduction instead of a row count."
  ];

  W["What does min_child_weight do in XGBoost?"] = [
    "Eta has no such minimum setting; min_child_weight constrains what a leaf must hold.",
    "Trees have no parent-child tree relationships; the 'child' is a split's resulting node.",
    "Row recency plays no role; the 'weight' is the total instance weight in a leaf.",
    "Feature limits come from the colsample parameters, not min_child_weight."
  ];

  W["You are detecting fraud: 1% of transactions are fraud. Your XGBoost model predicts 'not fraud' for almost everything. Best first fix?"] = [
    "Memorizing individual fraud rows is overfitting; it won't generalize to new fraud.",
    "Validation data isn't withheld fraud knowledge; removing it just blinds you to overfitting.",
    "It's a binary classification task; switching to regression doesn't address the imbalance.",
    "Ten tiny steps give a barely-trained model, making the fraud class even more ignored."
  ];

  W["Why does XGBoost's histogram tree method (tree_method='hist') speed up training?"] = [
    "'hist' still builds trees; it only changes how candidate splits are found.",
    "It uses all the rows; binning reduces split candidates, not the data.",
    "Regularization is untouched; only the granularity of the split search changes.",
    "Predictions change every round as trees are added; the speedup comes from binned split search."
  ];

  W["You set n_estimators = 5000 but pass a validation set with early_stopping_rounds = 50. What happens?"] = [
    "With early stopping, n_estimators is only a ceiling; training halts when validation stalls.",
    "The 50 is the patience — stalled rounds tolerated — not a tree count.",
    "The two settings are designed to work together: a cap plus a stopping rule.",
    "Trees are built until validation stalls; the kept model is the best iteration, not the first 50."
  ];

  W["What is 'gain' as a feature-importance measure in XGBoost?"] = [
    "That's 'weight' (frequency) importance, not the loss reduction the splits achieved.",
    "That's 'cover', not the improvement in the objective.",
    "Correlation is a model-free statistic; gain is measured from the model's actual splits.",
    "XGBoost has no linear coefficients; gain sums split-level loss reductions."
  ];

  W["XGBoost can report importance as gain, cover, or weight. How do these differ?"] = [
    "They measure different things and can rank features quite differently.",
    "The definitions are scrambled: gain is loss reduction, cover is rows affected, weight is split count.",
    "All three exist for any task; they aren't split between regression and classification.",
    "They frequently disagree — a much-used feature can still have low gain."
  ];

  W["XGBoost offers both L2 (reg_lambda) and L1 (reg_alpha) regularization on leaf weights. How do they differ?"] = [
    "Both act on leaf weights; neither removes trees or rows.",
    "Those are eta and n_estimators; lambda and alpha are penalties on leaf weights.",
    "Both apply to any objective; there's no regression/classification split.",
    "They differ — smooth shrinkage versus exact zeros — and can be used together."
  ];

  W["XGBoost uses second-order information (the Hessian) when fitting each tree. What is the benefit?"] = [
    "Gradients are still required; the Hessian is used in addition, not instead.",
    "Second-order information doesn't constrain tree depth at all.",
    "The Hessian is derived FROM the objective; you still have to choose one.",
    "The model stays a tree ensemble; only the per-step math becomes Newton-like."
  ];

  W["You must control overfitting on a noisy dataset. Which combined strategy is soundest?"] = [
    "That maximizes capacity and step size — a recipe for severe overfitting, not control.",
    "A single unregularized deep tree is the classic overfitting model.",
    "Piling on trees with no other controls just fits the noise ever harder.",
    "Without validation you lose early stopping and any warning that you're overfitting."
  ];

  W["A stakeholder points out feature 'customer_id' has the highest 'weight' importance in your XGBoost model. Why be cautious?"] = [
    "Weight only counts split frequency — it's the importance type most fooled by high-cardinality IDs.",
    "Frequent splits on a near-unique ID usually mean row memorization, not predictive power.",
    "Weight importance works for any target type; that's not the reason for caution.",
    "The stat alone doesn't dictate action — check gain and leakage first, then decide."
  ];
})();
