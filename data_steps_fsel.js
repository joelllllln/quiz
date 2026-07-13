/* Feature Selection — answer-breakdown ladders (ground-up). */
window.STEPS = window.STEPS || {};

/* ===================== fsel1 — Foundations ===================== */

window.STEPS["What is feature selection?"] = [
  { "q": "In a data table, what is a 'feature'?", "ok": "One input column the model reads", "no": ["One row of the dataset", "The answer you predict"] },
  { "q": "Do you usually need every column to predict well?", "ok": "No — many add little or nothing", "no": ["Yes, more is always better", "Only if scaled first"] },
  { "q": "So what do you do with the columns that don't help?", "ok": "Keep a useful subset and drop the rest", "no": ["Create new columns from them", "Rescale them all"] },
  { "q": "When does this picking happen?", "ok": "Before or during training", "no": ["Only after deployment", "Only on the test set"] },
  { "q": "Which choice defines feature selection?", "ok": "Choosing a useful subset of the input columns to keep, and discarding the rest, before or during training", "no": ["Creating brand-new columns by combining the existing ones", "Rescaling every column to the same range"] }
];

window.STEPS["Why bother REMOVING features instead of just keeping every column you have?"] = [
  { "q": "What can a useless extra column give the model?", "ok": "More noise to latch onto", "no": ["Guaranteed higher accuracy", "Free extra signal"] },
  { "q": "Fitting noise in training hurts what?", "ok": "Performance on new data (overfitting)", "no": ["Nothing at all", "Only disk usage"] },
  { "q": "What happens to compute as columns pile up?", "ok": "Training and prediction get slower", "no": ["It stays exactly the same", "It always gets faster"] },
  { "q": "How do fewer inputs affect explaining the model?", "ok": "Easier to interpret", "no": ["Harder to interpret", "No effect"] },
  { "q": "So why remove features?", "ok": "Fewer, well-chosen features reduce overfitting, cut compute cost, and make the model easier to interpret", "no": ["More features always help, so only drop ones with missing values", "The only reason is to save disk space"] }
];

window.STEPS["What is a FILTER method for feature selection?"] = [
  { "q": "Does a filter method train a model to decide?", "ok": "No — it uses a cheap statistic", "no": ["Yes, many times", "Yes, once per subset"] },
  { "q": "What kind of statistic scores each feature?", "ok": "Correlation, chi-squared, mutual info", "no": ["The model's validation loss", "A trained coefficient"] },
  { "q": "Is each feature judged alone or in combination?", "ok": "Independently, one at a time", "no": ["Always in combination", "In pairs only"] },
  { "q": "After scoring, which features do you keep?", "ok": "The top scorers", "no": ["The lowest scorers", "A random handful"] },
  { "q": "Which describes a filter method?", "ok": "It scores each feature with a quick statistic (like correlation with the target) independently of any model, then keeps the top scorers", "no": ["It trains a model on many subsets and keeps the best", "It smooths each column with a moving average"] }
];

window.STEPS["What is a WRAPPER method for feature selection?"] = [
  { "q": "Does a wrapper use a real trained model to judge subsets?", "ok": "Yes, it trains the model", "no": ["No, only a statistic", "No, never a model"] },
  { "q": "What does it score each candidate subset by?", "ok": "The model's validation performance", "no": ["A cheap correlation", "The number of columns"] },
  { "q": "How many times does it train the model?", "ok": "Many times, over different subsets", "no": ["Exactly once", "Never"] },
  { "q": "What's the downside of all that retraining?", "ok": "It's slow / expensive", "no": ["It's the fastest option", "It ignores the target"] },
  { "q": "Which describes a wrapper method?", "ok": "It repeatedly trains a model on different feature subsets and keeps the subset that gives the best validation score", "no": ["It scores each feature once and never trains a model", "It wraps every feature in a scaler"] }
];

window.STEPS["What is an EMBEDDED method for feature selection?"] = [
  { "q": "When does an embedded method select features?", "ok": "During the model's own training", "no": ["Before any training", "After many retrainings"] },
  { "q": "How many training runs does it need?", "ok": "One — selection is built in", "no": ["Many separate runs", "Zero"] },
  { "q": "Which model does selection as it fits?", "ok": "Lasso (L1) — weak weights hit zero", "no": ["Plain linear regression", "k-nearest neighbours"] },
  { "q": "Which describes an embedded method?", "ok": "Selection happens automatically DURING a single model's training, as part of how that model fits", "no": ["Selection is done with a cheap statistic before any model is trained", "Selection requires training the model many separate times"] }
];

window.STEPS["What is UNIVARIATE feature selection?"] = [
  { "q": "'Univariate' means it looks at how many features at once?", "ok": "One at a time", "no": ["All together", "Two at a time"] },
  { "q": "Each feature is scored against what?", "ok": "The target", "no": ["The other features", "The row count"] },
  { "q": "Which pass the test and get kept?", "ok": "Those above a statistical threshold", "no": ["Those below the threshold", "A random subset"] },
  { "q": "What can it never see, judging one feature alone?", "ok": "Interactions between features", "no": ["The target values", "Missing data"] },
  { "q": "Which describes univariate selection?", "ok": "Testing each feature ONE AT A TIME against the target and keeping those that pass a statistical threshold", "no": ["Testing every combination of features together", "Reducing many columns into a few components"] }
];

window.STEPS["What does a VARIANCE THRESHOLD do?"] = [
  { "q": "Variance measures what about a column?", "ok": "How much its values change across rows", "no": ["Its link to the target", "Its number of rows"] },
  { "q": "A column that's nearly the same for every row carries how much info?", "ok": "Almost none", "no": ["The most of any column", "Exactly half"] },
  { "q": "Does a variance threshold even need the target?", "ok": "No", "no": ["Yes, always", "Only for regression"] },
  { "q": "So which columns does it drop?", "ok": "Near-constant, low-variance ones", "no": ["High-variance ones", "The target column"] },
  { "q": "Which describes a variance threshold?", "ok": "It drops features whose values barely change across rows, since a near-constant column carries almost no information", "no": ["It drops features that correlate too strongly with the target", "It keeps only the lowest-variance features"] }
];

window.STEPS["A column records the temperature on Mars for each of your loan applicants. It has nothing to do with whether they repay. What kind of feature is this?"] = [
  { "q": "Does Mars temperature relate to loan repayment?", "ok": "No, not at all", "no": ["Yes, strongly", "Only for some rows"] },
  { "q": "Does knowing it change your best guess of repayment?", "ok": "Never", "no": ["Always", "Sometimes"] },
  { "q": "Is it a duplicate of another useful column, or just no signal?", "ok": "No signal at all", "no": ["A duplicate of another column", "Contains the hidden answer"] },
  { "q": "Keeping such a column can only do what?", "ok": "Add noise to overfit", "no": ["Boost accuracy", "Speed up training"] },
  { "q": "What kind of feature is it?", "ok": "An IRRELEVANT feature — it carries no information about the target and only adds noise", "no": ["A REDUNDANT feature that repeats another column", "A leaky feature that contains the answer"] }
];

window.STEPS["A REDUNDANT feature differs from an IRRELEVANT one because a redundant feature is..."] = [
  { "q": "On its own, does a redundant feature relate to the target?", "ok": "Yes, it's genuinely related", "no": ["No, unrelated", "Only to other features"] },
  { "q": "Why might you still drop it?", "ok": "Another kept column already gives that info", "no": ["It has no signal at all", "It's on the wrong scale"] },
  { "q": "An irrelevant feature relates to the target how?", "ok": "Not at all", "no": ["Duplicates it", "Perfectly"] },
  { "q": "So the key word for redundant is...", "ok": "Duplicate", "no": ["Noise", "Missing"] },
  { "q": "A redundant feature is...", "ok": "Related to the target, but it only repeats information another kept feature already gives you", "no": ["Completely unrelated to the target and pure noise", "A feature with too many missing values"] }
];

window.STEPS["A feature is strongly correlated with the target. Does that guarantee it will improve your model?"] = [
  { "q": "Correlation with the target flags a feature as what?", "ok": "Promising / a candidate", "no": ["Guaranteed useful", "Guaranteed useless"] },
  { "q": "What really matters is what a feature adds given the others — call it its...", "ok": "Marginal value", "no": ["Raw correlation", "Variance"] },
  { "q": "If another kept column already says the same thing, it adds what?", "ok": "Nothing new", "no": ["Twice the signal", "A guaranteed boost"] },
  { "q": "So does high correlation guarantee improvement?", "ok": "No — it may just duplicate a feature you already have, or the link may vanish once other features are present", "no": ["Yes — any correlated feature is always worth keeping", "Only if the correlation is exactly 1.0"] }
];

window.STEPS["What is FEATURE IMPORTANCE?"] = [
  { "q": "Feature importance attaches a number to each what?", "ok": "Feature", "no": ["Row", "Fold"] },
  { "q": "That number reflects what?", "ok": "How much the model relied on it", "no": ["Its missing-value count", "Its column position"] },
  { "q": "Does high importance prove the feature CAUSES the outcome?", "ok": "No, just predictive contribution", "no": ["Yes, proves causation", "Yes, always"] },
  { "q": "What is feature importance?", "ok": "A score for each feature saying how much it contributed to the model's predictions", "no": ["The correlation between two features", "The number of missing values a feature has"] }
];

window.STEPS["Besides accuracy, why do teams often prefer a model built on FEWER features?"] = [
  { "q": "Each feature at prediction time costs what?", "ok": "Extra compute / latency", "no": ["Nothing", "Higher accuracy"] },
  { "q": "Every feature is also a column someone must do what?", "ok": "Collect, clean, store", "no": ["Ignore", "Randomise"] },
  { "q": "Fewer inputs make the model's behaviour how?", "ok": "Easier to explain and audit", "no": ["Impossible to describe", "Less accurate by rule"] },
  { "q": "So besides accuracy, why prefer fewer features?", "ok": "It predicts faster, costs less to collect data for, and is far easier to explain to stakeholders", "no": ["A smaller set always gives a higher accuracy score", "Fewer features removes the need to validate the model"] }
];

window.STEPS["What does scikit-learn's SelectKBest do?"] = [
  { "q": "What does the 'K' in SelectKBest stand for?", "ok": "How many features to keep", "no": ["How many models to train", "How many folds to use"] },
  { "q": "It scores each feature with what?", "ok": "A chosen statistic", "no": ["The full model's loss", "A random number"] },
  { "q": "After scoring, which K does it keep?", "ok": "The K highest-scoring", "no": ["The K lowest-scoring", "K at random"] },
  { "q": "Is it a filter or a wrapper?", "ok": "A univariate filter", "no": ["A wrapper", "An embedded method"] },
  { "q": "What does SelectKBest do?", "ok": "It scores every feature with a chosen statistic and keeps the K highest-scoring ones", "no": ["It trains K different models and keeps the best one", "It selects the K most representative rows"] }
];

window.STEPS["You must choose between a FILTER method and a WRAPPER method on a big dataset with limited time. What is the core trade-off?"] = [
  { "q": "Which trains the model many times?", "ok": "The wrapper", "no": ["The filter", "Neither"] },
  { "q": "So which is much faster?", "ok": "The filter", "no": ["The wrapper", "They're equal"] },
  { "q": "What can a filter miss, judging features alone?", "ok": "Feature interactions", "no": ["The target", "Row order"] },
  { "q": "What can a wrapper find that a filter can't?", "ok": "Stronger subsets using interactions", "no": ["Nothing extra", "Only faster subsets"] },
  { "q": "What is the core trade-off?", "ok": "Filters are much faster but ignore feature interactions; wrappers are slower but can find stronger subsets", "no": ["Filters are slower but more accurate; wrappers are always worse", "There is no difference between them"] }
];

window.STEPS["What is the 'curse of dimensionality' and why does it motivate feature selection?"] = [
  { "q": "As you add feature columns, the space grows how?", "ok": "Vastly larger", "no": ["Smaller", "Unchanged"] },
  { "q": "With the same rows in a bigger space, points become what?", "ok": "Spread thin / sparse", "no": ["Packed tighter", "Identical"] },
  { "q": "Does 'nearby' still mean much when everything is far apart?", "ok": "No, patterns get harder to learn", "no": ["Yes, it's easier", "No change"] },
  { "q": "How does cutting features help?", "ok": "Shrinks the space, packs data denser", "no": ["Adds more RAM", "Speeds disk writes"] },
  { "q": "What is the curse of dimensionality?", "ok": "As feature count grows with fixed data, points spread thin so patterns get harder to learn — fewer features help", "no": ["Adding features always crashes training past 1000 columns", "It means data is impossible to store"] }
];

/* ===================== fsel2 — Practice ===================== */

window.STEPS["What is MUTUAL INFORMATION as a feature-selection score?"] = [
  { "q": "Mutual information measures reduction in what?", "ok": "Uncertainty about the target", "no": ["Variance of a column", "Number of missing rows"] },
  { "q": "When is mutual information zero?", "ok": "When feature and target are independent", "no": ["When they're linearly related", "Always"] },
  { "q": "Does it only catch straight-line links, like correlation?", "ok": "No — it catches non-linear ones too", "no": ["Yes, linear only", "No, none at all"] },
  { "q": "What is mutual information as a score?", "ok": "A measure of how much knowing a feature reduces uncertainty about the target, capturing even non-linear links", "no": ["A measure that only detects straight-line relationships", "The variance of a feature over the target's"] }
];

window.STEPS["What is CORRELATION-BASED feature selection?"] = [
  { "q": "Which features does it favour keeping?", "ok": "Those correlated with the target", "no": ["Those unrelated to the target", "Those with most missing values"] },
  { "q": "Among features that are correlated with EACH OTHER, it keeps how many?", "ok": "Just one — the rest are redundant", "no": ["All of them", "None of them"] },
  { "q": "It balances relevance against what?", "ok": "Redundancy", "no": ["Row count", "Scale"] },
  { "q": "What is correlation-based feature selection?", "ok": "Keeping features that correlate well with the target while removing ones that are highly correlated with each other", "no": ["Keeping only features that correlate with each other, ignoring the target", "Removing every feature correlated with the target"] }
];

window.STEPS["What is Recursive Feature Elimination (RFE)?"] = [
  { "q": "RFE starts by training a model, then does what?", "ok": "Drops the weakest feature", "no": ["Adds the best feature", "Drops the best feature"] },
  { "q": "After dropping one, what does it do next?", "ok": "Retrains and repeats", "no": ["Stops immediately", "Never retrains"] },
  { "q": "It works in which direction?", "ok": "Backwards — removing features", "no": ["Forwards — adding features", "Neither"] },
  { "q": "When does it stop?", "ok": "At the desired number of features", "no": ["When accuracy hits 100%", "After one pass"] },
  { "q": "What is RFE?", "ok": "It trains a model, drops the weakest feature, retrains, and repeats until the desired number of features remains", "no": ["It scores every feature once and keeps the top ones without retraining", "It adds features one at a time from an empty set"] }
];

window.STEPS["Why is RFE often described as computationally EXPENSIVE?"] = [
  { "q": "After each feature it removes, RFE does what?", "ok": "Retrains the whole model", "no": ["Nothing more", "Deletes a row"] },
  { "q": "With 200 features, roughly how many trainings?", "ok": "About 200", "no": ["Just one", "About two"] },
  { "q": "So total cost scales with what?", "ok": "The number of features", "no": ["The number of classes", "Disk size"] },
  { "q": "Why is RFE expensive?", "ok": "It retrains the whole model once for (roughly) every feature it removes, so cost grows with the feature count", "no": ["It stores the dataset in memory many times over", "It requires a GPU most laptops lack"] }
];

window.STEPS["How does LASSO (L1) regression perform feature selection?"] = [
  { "q": "Lasso adds which penalty to the loss?", "ok": "An L1 (absolute-value) penalty", "no": ["An L2 (squared) penalty", "No penalty"] },
  { "q": "What does that penalty do to weak coefficients?", "ok": "Shrinks them to exactly zero", "no": ["Shrinks them but never to zero", "Doubles them"] },
  { "q": "A coefficient of exactly zero means the feature is what?", "ok": "Dropped", "no": ["Kept and doubled", "Scaled up"] },
  { "q": "Filter, wrapper, or embedded?", "ok": "Embedded — fits and selects together", "no": ["Filter", "Wrapper"] },
  { "q": "How does Lasso select features?", "ok": "Its L1 penalty shrinks weak coefficients to EXACTLY zero, so those features drop out automatically", "no": ["It ranks features by correlation and deletes the bottom half", "It adds a squared penalty that never reaches zero"] }
];

window.STEPS["As you raise Lasso's penalty, which coefficients hit exactly zero FIRST, and what does that tell you?"] = [
  { "q": "The L1 penalty costs the same per unit of coefficient — so weak features are what to sacrifice?", "ok": "The cheapest", "no": ["The most expensive", "Impossible"] },
  { "q": "So which coefficients hit zero at low penalty?", "ok": "The weakest, least useful", "no": ["The strongest", "All at once"] },
  { "q": "Strong features hold on until when?", "ok": "Much higher penalty", "no": ["The very start", "Never change"] },
  { "q": "So the drop-out order gives you what?", "ok": "An importance ranking", "no": ["A random shuffle", "Nothing useful"] },
  { "q": "Which hit zero first and what does it tell you?", "ok": "The weakest, least useful features zero out first while strong ones survive — so survival order ranks features", "no": ["The strongest zero out first because the penalty targets big coefficients", "All coefficients hit zero simultaneously"] }
];

window.STEPS["You run feature selection on the WHOLE dataset, then do cross-validation on the selected features. Why is your reported accuracy too optimistic?"] = [
  { "q": "Selecting on the whole dataset means selection saw what?", "ok": "The rows that later serve as test folds", "no": ["Only training rows", "No rows"] },
  { "q": "So are those test folds still truly unseen?", "ok": "No — info leaked into them", "no": ["Yes, fully unseen", "Only half"] },
  { "q": "The features were hand-picked to fit what?", "ok": "That very test data", "no": ["Random data", "The training data only"] },
  { "q": "The correct fix is to select where?", "ok": "Inside each training fold", "no": ["On the whole dataset once", "On the test fold"] },
  { "q": "Why is the reported accuracy too optimistic?", "ok": "The selection already peeked at the test folds, so information leaked and each fold is no longer truly unseen", "no": ["Cross-validation always overestimates regardless of when you select", "Selecting first trains on fewer rows, inflating the score"] }
];

window.STEPS["Two features in your data are correlated 0.98 (near-duplicates). What is the sensible move?"] = [
  { "q": "At 0.98 correlation, how much new info does the second add?", "ok": "Almost none", "no": ["Twice as much", "All of it"] },
  { "q": "Keeping both raises what for no benefit?", "ok": "Dimensionality and cost", "no": ["Accuracy", "Signal"] },
  { "q": "For linear models, near-duplicates cause what?", "ok": "Unstable coefficients", "no": ["Perfect stability", "Faster training"] },
  { "q": "So the sensible move is...", "ok": "Drop one of them — keeping both adds almost no information but doubles cost and can destabilise coefficients", "no": ["Always keep both since 0.98 means both are important", "Drop both, since any correlation means they're useless"] }
];

window.STEPS["What is MULTICOLLINEARITY?"] = [
  { "q": "Multicollinearity is about correlation among what?", "ok": "The features (predictors)", "no": ["Feature and target", "The rows"] },
  { "q": "Can a linear model separate their individual effects?", "ok": "No", "no": ["Yes, easily", "Only for two features"] },
  { "q": "What happens to their coefficients?", "ok": "Large, unstable, may flip sign", "no": ["Fixed and reliable", "Always zero"] },
  { "q": "What is multicollinearity?", "ok": "When two or more features are so correlated that a linear model can't tell their effects apart, making coefficients unstable", "no": ["When a single feature is strongly correlated with the target", "When features are measured on different scales"] }
];

/* ===================== fsel3 — Advanced ===================== */

window.STEPS["What is PERMUTATION IMPORTANCE?"] = [
  { "q": "Permutation importance is computed on what?", "ok": "An already-trained model", "no": ["Raw data before training", "The target alone"] },
  { "q": "What do you do to one feature's column?", "ok": "Shuffle its values", "no": ["Delete every row", "Scale it to 0-1"] },
  { "q": "Shuffling breaks that feature's link to what?", "ok": "The target", "no": ["The other features", "The row index"] },
  { "q": "A big drop in accuracy after shuffling means what?", "ok": "The feature was important", "no": ["It was useless", "It was a duplicate"] },
  { "q": "What is permutation importance?", "ok": "Shuffle one feature's values and measure how much the model's accuracy drops — a bigger drop means a more important feature", "no": ["Count how many times a feature splits in a decision tree", "The size of a feature's coefficient in a linear model"] }
];

window.STEPS["A random ID-like column with thousands of unique values gets a HIGH tree impurity importance. Why is this a known trap?"] = [
  { "q": "A column with thousands of unique values offers a tree what?", "ok": "Many possible split points", "no": ["No split points", "Exactly one split"] },
  { "q": "With so many splits, even a random column can do what to training data?", "ok": "Carve it into pure little groups by chance", "no": ["Nothing at all", "Predict perfectly on new data"] },
  { "q": "Does that inflated importance generalise?", "ok": "No", "no": ["Yes, always", "Only for IDs"] },
  { "q": "What avoids the trap?", "ok": "Permutation importance on held-out data", "no": ["Higher cardinality still", "Bigger trees"] },
  { "q": "Why is the high impurity importance a trap?", "ok": "Impurity importance is biased toward high-cardinality features, which offer many split points to fit noise", "no": ["High-cardinality features are always genuinely most predictive", "Impurity importance only works on low-cardinality features"] }
];

window.STEPS["You screen 10,000 candidate columns on the full dataset, keep the 20 that best predict the target, then report cross-validated accuracy. Why can this look great yet be worthless?"] = [
  { "q": "Among 10,000 random columns, will some match the target by pure chance?", "ok": "Yes, some will", "no": ["No, never", "Only if scaled"] },
  { "q": "You screened using which data?", "ok": "All of it, before cross-validation", "no": ["Only a held-out fold", "None of it"] },
  { "q": "So that chance correlation is present in how many folds?", "ok": "Every fold", "no": ["No folds", "Just one"] },
  { "q": "The proper fix is to screen features where?", "ok": "Inside each training fold (nested)", "no": ["On the whole dataset once", "On the test fold"] },
  { "q": "Why can it look great yet be worthless?", "ok": "With enough random columns, some will fit the target by chance; screening on all data bakes that luck into every fold", "no": ["Screening 10,000 columns is just slow, but the score is valid", "Keeping 20 features is too few, the only issue"] }
];

window.STEPS["You rerun feature selection on several random subsamples of your data and each run picks a DIFFERENT set. What does this instability mean?"] = [
  { "q": "If each subsample picks a different set, the choice is driven by what?", "ok": "Noise", "no": ["Strong signal", "The target directly"] },
  { "q": "Which conditions commonly cause this?", "ok": "Small data or correlated features", "no": ["Huge data and clean features", "Perfect signal"] },
  { "q": "Should you trust an unstable set to generalise?", "ok": "No", "no": ["Yes, fully", "Only the first run"] },
  { "q": "What does this instability mean?", "ok": "The selection is unstable — often from small data or correlated features — so the chosen set may not generalise", "no": ["It proves all the features are useless", "It's expected and irrelevant; only one split matters"] }
];

window.STEPS["Two features are nearly perfect copies of each other, and both truly drive the target. What does PERMUTATION importance report for each, and why?"] = [
  { "q": "Permutation importance shuffles how many features at a time?", "ok": "One", "no": ["Both at once", "All of them"] },
  { "q": "When you shuffle one, its intact twin still provides what?", "ok": "The same information", "no": ["Nothing", "Random noise"] },
  { "q": "So how far does accuracy drop?", "ok": "Barely at all", "no": ["To zero", "By half"] },
  { "q": "So each feature scores as what, despite mattering?", "ok": "Unimportant", "no": ["Extremely important", "Exactly zero and 100%"] },
  { "q": "What does permutation importance report for each, and why?", "ok": "Both look UNimportant, because shuffling one leaves its twin to compensate, so accuracy barely drops", "no": ["Both look extremely important, since each correlates with the target", "One gets all the importance and the other exactly zero"] }
];

window.STEPS["Your target depends on an INTERACTION between two features (their combination flips the answer). A univariate FILTER keeps missing them. Why, and what selects them better?"] = [
  { "q": "A univariate filter tests each feature how?", "ok": "Alone, on its own", "no": ["In combination", "In pairs"] },
  { "q": "A feature that only helps combined shows what individual signal?", "ok": "Weak signal", "no": ["Strong signal", "Perfect signal"] },
  { "q": "So the filter does what with it?", "ok": "Drops it", "no": ["Keeps it", "Scales it"] },
  { "q": "What method can see features working together?", "ok": "Embedded or wrapper (model-based)", "no": ["Another univariate filter", "A variance threshold"] },
  { "q": "Why does the filter miss it, and what selects it better?", "ok": "Filters score each feature alone and can't see interactions; embedded or wrapper methods that use the model can", "no": ["Filters are too slow to reach the interacting features in time", "Interactions can never be captured by any method"] }
];
