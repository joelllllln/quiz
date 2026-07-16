/* More definitions (batch 10): feature engineering, feature selection, model selection,
   XGBoost, interpretability, class imbalance, extra evaluation metrics, regression &
   boosting, validation. Standard glossary terms, each DEFS-tagged with a reveal so it
   flows into the Definitions filter, flashcards and read+recall. Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function def(qk, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1;
  }

  /* ===================== Feature Engineering (feng1) — 4 ===================== */

  def("feng1",
    "What does unit-norm scaling (sklearn's Normalizer) do, and how does it differ from StandardScaler?",
    "It rescales each row to length 1, working per sample rather than per feature column.",
    ["It rescales each column so its largest absolute value becomes exactly one.",
     "It converts each feature to ranks and divides by the number of rows.",
     "It removes units by dividing every column by the dataset's global mean.",
     "It is identical to StandardScaler but skips the mean-subtraction step."],
    "Unit-norm scaling (Normalizer)",
    "Normalizer divides each sample vector by its own norm (L2 by default), so every row lands on the unit sphere — a per-row operation, unlike the per-column StandardScaler and MinMaxScaler.",
    "It makes direction, not magnitude, the signal: two documents with the same word proportions become identical regardless of length, which is why it pairs naturally with cosine-similarity and text pipelines.",
    "Shrink or grow each row until its arrow has length one — only the direction survives.");

  def("feng1",
    "What is stop-word removal in text feature engineering?",
    "Dropping very common function words like 'the' and 'of' that carry little topical signal.",
    ["Deleting any word that appears in only a single document of the corpus.",
     "Removing words flagged as offensive before the text is tokenised.",
     "Truncating every document after its first two hundred words.",
     "Filtering out words whose embeddings lie far from the corpus centroid."],
    "Stop-word removal",
    "Stop words are high-frequency grammatical glue present in nearly every document; removing them shrinks bag-of-words vocabularies and stops 'the'-style counts from swamping topical terms.",
    "It's a heuristic with sharp edges: 'not' is a stop word on many lists, yet deleting it flips sentiment. TF-IDF already down-weights ubiquitous terms, so aggressive stop lists matter less than they once did.",
    "Throw away the filler words so the model listens to the words that actually say something.");

  def("feng1",
    "What is the fit-on-train-only rule for preprocessing transformers?",
    "Learn scaling/imputation/encoding statistics from training data alone, then apply them unchanged to test data.",
    ["Fit each transformer separately on train and test so both are optimally scaled.",
     "Fit transformers on the full dataset once, since preprocessing is not a model.",
     "Refit every transformer after each cross-validation fold on the pooled folds.",
     "Only tree models need fitted transformers; linear models can skip fitting."],
    "Fit-on-train-only rule",
    "Every learned preprocessing statistic — means for scaling, medians for imputation, category maps for encoding — must come from the training split; the test split is transformed with those frozen values, never refitted.",
    "Fitting on all data leaks test-set information (its mean, its range, its categories) into training — a quiet optimism that inflates scores. Pipelines enforce the rule automatically inside cross-validation, which is their real point.",
    "The exam papers stay sealed: every recipe number is computed from the practice set only.");

  def("feng1",
    "What are recency features derived from dates?",
    "Elapsed-time gaps such as days since last purchase, turning raw timestamps into behaviour signals.",
    ["Flags marking whether a date falls inside the most recent calendar year.",
     "The raw Unix timestamp passed through unchanged as a numeric column.",
     "Counts of how many other rows share exactly the same date value.",
     "Random offsets added to dates to anonymise the individuals involved."],
    "Recency features (date differences)",
    "Subtracting timestamps yields durations — days since signup, time since last login, gap between orders — that encode engagement and lifecycle far better than absolute dates, which models read as meaningless large integers.",
    "Recency is routinely among the strongest predictors of churn, response and fraud (the R in RFM analysis). The reference point must be the observation time, not 'today', or the feature leaks the future and rots as time passes.",
    "Not 'when did they buy' but 'how long ago' — the gap is the signal.");

  /* ===================== Feature Selection (fsel1) — 4 ===================== */

  def("fsel1",
    "Where must feature selection happen relative to cross-validation, and why?",
    "Inside each fold, on that fold's training part only — otherwise selection leaks test information.",
    ["Before cross-validation, so every fold is scored on an identical feature set.",
     "After cross-validation, applying selection only to the final production model.",
     "Selection may use all data safely because it never sees the target values.",
     "Only wrapper methods need to be inside the folds; filters are always safe."],
    "Selection inside cross-validation",
    "Selecting features on the full dataset lets each fold's 'unseen' portion influence which features survive — a leak that can make pure noise look predictive. The fix: make selection a pipeline step so it refits within every training fold.",
    "This is the classic leak demonstrated in textbooks: on random data, select the 20 columns most correlated with the target, then cross-validate — the leaky protocol reports strong skill where none exists.",
    "If the held-out rows helped choose the features, they were never really held out.");

  def("fsel1",
    "What is the null-importance technique for feature selection?",
    "Compare each feature's real importance to its importances under shuffled targets to see what chance produces.",
    ["Setting each feature to zero in turn and keeping those that change predictions least.",
     "Ranking features by how many missing values they contain and dropping the worst.",
     "Selecting features whose importance is exactly zero in a lasso fit.",
     "Training on a random half of features and keeping whichever half scores better."],
    "Null importances",
    "Train repeatedly on data whose target has been shuffled: importances earned there are pure luck, forming a per-feature null distribution. A feature matters only if its true-target importance clearly exceeds its own null spread.",
    "It attacks importance's dirty secret — high-cardinality and noisy features score well by chance — with a calibrated benchmark, in the same spirit as Boruta's shadow features.",
    "Let the model 'explain' scrambled answers; anything it credits then is noise, and real features must beat that bar.");

  def("fsel1",
    "What does removing constant and quasi-constant features accomplish?",
    "It discards columns with (almost) no variation, which cannot help predictions but add cost and noise.",
    ["It removes the features most strongly correlated with each other, one per pair.",
     "It drops any feature whose mean is close to zero after standardisation.",
     "It removes features whose values repeat in consecutive rows, indicating duplication.",
     "It eliminates features whose importance is constant across cross-validation folds."],
    "Constant & quasi-constant feature removal",
    "A column that is one value for 100% (constant) or ~99% (quasi-constant) of rows carries essentially no discriminative information; VarianceThreshold is the standard first-pass filter that removes them cheaply.",
    "Such columns are common after joins, one-hot encoding of rare categories, and logging changes. They waste compute, can destabilise scaling (near-zero variance), and are the safest possible deletions — a natural first cleaning step.",
    "A question everyone answers identically tells you nothing about anyone — cut it.");

  def("fsel1",
    "What is univariate ROC-AUC screening for feature selection?",
    "Scoring each feature alone by the AUC it achieves as a single-variable ranker of the target.",
    ["Computing the AUC of the full model repeatedly with each feature removed in turn.",
     "Selecting features whose ROC curves are smoothest across thresholds.",
     "Ranking features by the area under their own histogram curves.",
     "Choosing features whose AUC equals exactly 0.5 to avoid bias."],
    "Univariate ROC-AUC screening",
    "Treat each numeric feature's raw values as prediction scores and compute AUC against the binary target: 0.5 means no ranking power alone, distance from 0.5 (either side — flipped features are informative too) means signal. Keep the top scorers.",
    "It's a filter method with a metric that matches ranking tasks and ignores scale and outliers (AUC is rank-based). Its blind spot is shared with all univariate filters: features useful only in combination score as useless.",
    "Audition each column solo: can it, by itself, sort positives above negatives better than chance?");

  /* ===================== Model Selection (msel1) — 4 ===================== */

  def("msel1",
    "What do AIC and BIC estimate, and how do they differ?",
    "Both score fit penalised by parameter count; BIC penalises complexity harder as data grows.",
    ["AIC measures training accuracy while BIC measures accuracy on a held-out test set.",
     "AIC applies to classification models and BIC to regression models exclusively.",
     "Both count parameters only, with AIC preferring larger models by convention.",
     "AIC is the Bayesian version of BIC, computed from the posterior distribution."],
    "Information criteria (AIC / BIC)",
    "AIC = 2k − 2ln(L̂), BIC = k·ln(n) − 2ln(L̂): each trades log-likelihood against parameter count k. BIC's ln(n) factor exceeds AIC's 2 once n > 7, so BIC selects more parsimonious models on large datasets.",
    "They enable model comparison without a validation split — valuable for small data and classical statistical models — but require a likelihood, so they suit regressions and mixture models more than arbitrary ML pipelines.",
    "Score = fit minus a complexity fine; BIC just charges a steeper fine the more data you have.");

  def("msel1",
    "What is the distinction between model selection and model assessment?",
    "Selection picks the best candidate; assessment estimates the chosen model's true error on fresh data.",
    ["Selection concerns hyperparameters while assessment concerns the learned weights.",
     "Selection uses regression metrics and assessment uses classification metrics.",
     "They are synonyms: whichever score selects the model also reports its error.",
     "Selection happens during training epochs while assessment happens between them."],
    "Model selection vs assessment",
    "Two different questions need two different datasets: validation data (or inner CV) compares candidates; test data (or outer CV) estimates the winner's generalisation error. The score that chose the winner is biased upward for reporting.",
    "Conflating them is the everyday version of the nested-CV problem: 'best validation score' is a maximum over trials, hence optimistic. The test set answers honestly precisely because it never voted.",
    "One dataset picks the champion; a different, untouched one measures how good the champion really is.");

  def("msel1",
    "Why should a tuned model's advantage be checked across several random seeds?",
    "Split and initialisation randomness can exceed small model differences, making one-seed wins unreliable.",
    ["Because most libraries produce incorrect results unless seeds are averaged.",
     "Because each seed tunes a different hyperparameter, covering the space faster.",
     "Because random seeds control the class balance of the training data.",
     "Because models legally require three seeds before production deployment."],
    "Seed sensitivity in model comparison",
    "Rerunning with different seeds varies the train/validation split, bootstrap draws and initialisations; if candidate A beats B by 0.4% but seeds swing scores by ±1%, the ranking is noise. Averages across seeds (or repeated CV) restore signal.",
    "Reporting a distribution — mean ± spread over seeds/folds — turns 'we improved the score' into a checkable claim, and is the cheap, practical cousin of formal significance testing.",
    "If reshuffling the deck changes who wins, one hand proved nothing — play several hands.");

  def("msel1",
    "In tuning, what is the difference between the search space and the tuning budget?",
    "The space defines which configurations exist; the budget caps how many the search may evaluate.",
    ["The space belongs to grid search and the budget belongs only to Bayesian methods.",
     "They are the same quantity expressed in different units of measurement.",
     "The space is set by the library while the budget is set by the algorithm itself.",
     "The budget defines parameter ranges while the space counts CPU hours."],
    "Search space vs tuning budget",
    "The space is the definition of possibility — which hyperparameters, over what ranges, on what scales; the budget is the resource cap — trials, time or compute. Grid search couples them rigidly; random and Bayesian search decouple them cleanly.",
    "The decoupling is why random search scales: adding a hyperparameter to the space costs a grid exponentially more trials, while a random search just spreads the same fixed budget over more dimensions.",
    "The space is the menu; the budget is how many dishes you can afford to taste.");

  /* ===================== XGBoost (xgb1) — 4 ===================== */

  def("xgb1",
    "What does XGBoost's base_score parameter set?",
    "The global initial prediction that all trees subsequently correct.",
    ["The minimum leaf score below which a tree's output is clamped to zero.",
     "The score a feature must reach before it is considered for any split.",
     "The baseline accuracy against which early stopping measures improvement.",
     "The weight given to the first tree relative to all later trees."],
    "base_score (initial prediction)",
    "Boosting starts from a constant (default 0.5 in probability terms, i.e. log-odds 0) and adds tree corrections to it. base_score sets that starting constant; recent versions can also estimate it from the training labels.",
    "It mostly matters for imbalanced data and short ensembles: starting at the true base rate means early trees model structure instead of spending rounds correcting a poor prior. With enough rounds, its effect washes out.",
    "The ensemble's opening guess before any tree has spoken — trees then edit that guess.");

  def("xgb1",
    "What do colsample_bylevel and colsample_bynode add beyond colsample_bytree?",
    "Feature subsampling repeated at each depth level or each split, not just once per tree.",
    ["Sampling of rows rather than columns, applied at different tree depths.",
     "Progressive removal of features that went unused in earlier trees.",
     "Separate column samples for the gradient and hessian computations.",
     "Column sampling applied only to categorical versus numeric features."],
    "colsample_bylevel / colsample_bynode",
    "XGBoost samples features hierarchically: bytree draws a subset per tree, bylevel re-draws per depth level within it, bynode re-draws per split. The fractions multiply, so 0.5 at all three levels leaves ~12.5% of features per split.",
    "bynode is the closest analogue of random forests' per-split max_features, injecting the strongest decorrelation; finer-grained sampling adds regularisation and speed on wide data at some cost in per-split strength.",
    "Reshuffle the allowed columns not just per tree, but again at every floor — or every single fork.");

  def("xgb1",
    "What does XGBoost's eval_metric parameter control?",
    "The metric computed on evaluation sets for monitoring and early stopping — separate from the training objective.",
    ["The loss function whose gradients the trees are fitted to during training.",
     "The metric used to choose the best split inside each individual tree.",
     "How feature importances are normalised in the final trained model.",
     "The statistic reported to the user when the model object is printed."],
    "eval_metric (monitoring metric)",
    "The objective (e.g. binary:logistic) defines the gradients trees fit; eval_metric (e.g. auc, logloss, rmse) defines what is scored on the watchlist each round — and early stopping halts on it, not on the objective.",
    "Decoupling them is practical power: train on smooth log loss but stop at the round with the best AUC, matching how the model will actually be judged. A mismatched eval_metric silently optimises stopping for the wrong goal.",
    "One dial says what the trees learn from; this dial says what the referee watches to call time.");

  def("xgb1",
    "XGBoost reports importance as 'weight', 'gain' or 'cover'. What does each mean?",
    "Weight counts a feature's splits, gain sums its loss improvements, cover sums the examples its splits touch.",
    ["They are the same number expressed in three different normalisations.",
     "Weight applies to linear boosters and gain and cover to tree boosters only.",
     "Weight measures training importance while gain and cover measure test importance.",
     "Gain counts positive-class splits and cover counts negative-class splits."],
    "Importance types: weight, gain, cover",
    "Three lenses on the same trees: how often a feature is used (weight), how much total loss reduction it delivered (gain), and how many (hessian-weighted) samples flowed through its splits (cover). Rankings can differ sharply between them.",
    "Weight over-credits high-cardinality features that split often for little value; gain is usually the most faithful to predictive contribution. Knowing which lens produced a ranking is prerequisite to trusting it.",
    "Count the appearances, weigh the winnings, or measure the audience — three different leaderboards from one forest.");

  /* ===================== Interpretability (interp) — 4 ===================== */

  def("interp",
    "What does a SHAP summary (beeswarm) plot display?",
    "Every example's SHAP value per feature, coloured by feature value — global importance plus direction at a glance.",
    ["The model's accuracy recomputed after each feature is permuted in turn.",
     "A dendrogram grouping features whose SHAP values correlate strongly.",
     "The training-loss curve annotated with the feature responsible for each drop.",
     "One bar per feature showing its split count across all trees."],
    "SHAP summary (beeswarm) plot",
    "Features are rows ranked by mean |SHAP|; each dot is one example's attribution, its position the impact size and sign, its colour the underlying feature value — so 'high values push predictions up' is visible as a red-right stripe.",
    "It compresses global importance, effect direction, non-linearity and outliers into one picture — the reason it has become the default first plot for explaining tree ensembles, where bar charts show ranking but hide direction.",
    "A swarm of dots per feature: where the dots sit shows push, their colour shows whether high or low values do the pushing.");

  def("interp",
    "What do SHAP force and waterfall plots explain?",
    "A single prediction: how each feature pushed it up or down from the base value to the final output.",
    ["The average importance of each feature across the entire test set.",
     "How the model's accuracy would change if each feature were removed and it were retrained.",
     "The interaction strength between every pair of features in the model.",
     "The training rounds at which each feature first entered the ensemble."],
    "Force / waterfall plot (local explanation)",
    "Both start from the base value (the average model output) and show per-feature SHAP contributions stacking toward this one example's prediction — waterfall as sequential bars, force as opposing arrows.",
    "This is the case-level answer — 'why was this claim flagged?' — required for appeals, debugging and regulation, complementing the summary plot's population view. Additivity guarantees the pieces sum exactly to the prediction.",
    "The receipt for one prediction: start at the average, itemise each feature's push, land on the final number.");

  def("interp",
    "What is fidelity in the context of explanation methods?",
    "How accurately the explanation reflects what the underlying model actually computes.",
    ["How consistent the explanation appears across different visual styles.",
     "How confident the model is in the prediction being explained.",
     "How closely the explanation matches what a human expert would have said.",
     "How quickly the explanation can be generated at inference time."],
    "Explanation fidelity",
    "An explanation can be clear, plausible and wrong about the model. Fidelity measures agreement with the model's true behaviour — e.g. whether a LIME surrogate matches the black box near the explained point.",
    "Low-fidelity explanations are worse than none: they manufacture false trust. Plausibility to humans and faithfulness to the model are different axes, and evaluation must test the second, not just the first.",
    "Is this the model's real reason, or just a comforting story? Fidelity is truth-to-the-model.");

  def("interp",
    "What is the Rashomon effect in machine learning?",
    "Many differently structured models can fit the same data near-equally well, each 'explaining' it differently.",
    ["The tendency of deep models to memorise rare examples verbatim.",
     "The impossibility of explaining any model that uses more than ten features.",
     "A visual artefact in saliency maps caused by input preprocessing.",
     "The drop in accuracy that occurs when a model is compressed."],
    "Rashomon effect (model multiplicity)",
    "Named for the film's contradictory testimonies: the set of near-optimal models on a task typically contains many members that rely on different features and yield different explanations — so 'the model's reason' is not 'the data's reason'.",
    "It cuts both ways: explanations of one model don't establish causal truths about the world; but the multiplicity means one can often pick an accurate model that is also simple, fair or monotone — grounds for favouring interpretable models when stakes are high.",
    "Several witnesses, same events, different stories — and all of them score the same on accuracy.");

  /* ===================== Class Imbalance (imbal) — 4 ===================== */

  def("imbal",
    "What is the imbalance ratio of a dataset?",
    "The size ratio between the majority and minority classes, e.g. 99:1.",
    ["The fraction of examples whose labels are suspected to be incorrect.",
     "The ratio of features to samples, which determines overfitting risk.",
     "The difference between training and test class distributions.",
     "The proportion of minority examples that lie near the decision boundary."],
    "Imbalance ratio",
    "The standard severity measure: majority count divided by minority count. 4:1 is mild; 100:1 or 10000:1 (fraud, rare disease) is extreme and changes which methods and metrics remain meaningful.",
    "It calibrates everything downstream: at 99:1, 'predict majority' scores 99% accuracy, so accuracy is void; resampling strength, class weights and achievable precision all key off this one number.",
    "How lopsided is the deck? Count the common class for every one rare example.");

  def("imbal",
    "What do combined resampling methods like SMOTEENN and SMOTETomek do?",
    "Oversample the minority synthetically, then clean the result by removing noisy or borderline examples.",
    ["Run SMOTE twice with different neighbour counts and merge the outputs.",
     "Oversample both classes equally so the dataset doubles while ratios persist.",
     "Alternate between over- and undersampling on successive training epochs.",
     "Apply SMOTE to features and ENN to the labels independently."],
    "Combined resampling (SMOTEENN / SMOTETomek)",
    "A two-stage pipeline: SMOTE interpolates new minority points, then an undersampling cleaner — Edited Nearest Neighbours or Tomek-link removal — deletes points that sit in the wrong neighbourhood, sharpening the class boundary SMOTE can blur.",
    "SMOTE alone happily synthesises points inside majority territory when minority outliers exist; the cleaning pass removes exactly that debris. As always, resample inside the training folds only.",
    "First invent new rare-class examples, then sweep away the ones that landed in enemy territory.");

  def("imbal",
    "How does ClusterCentroids undersampling reduce the majority class?",
    "It replaces majority examples with the centroids of k-means clusters fitted on them.",
    ["It keeps only the majority examples closest to the minority class boundary.",
     "It removes majority examples that participate in Tomek links with minority points.",
     "It deletes a uniformly random subset of majority examples until classes balance.",
     "It merges duplicate majority rows and drops those with missing values."],
    "ClusterCentroids undersampling",
    "Rather than discarding random majority rows, it clusters the majority class into as many groups as the target size and keeps one centroid per cluster — a compressed summary that preserves the class's overall shape.",
    "Random undersampling can delete informative regions wholesale; centroid summaries retain coverage of the majority distribution. The cost: centroids are synthetic points, and fine boundary detail is smoothed away.",
    "Shrink the big class by replacing crowds of similar points with their spokespeople.");

  def("imbal",
    "How does class_weight='balanced' compute its per-class weights?",
    "weight = n_samples / (n_classes × class_count), so each class contributes equally overall.",
    ["weight equals the inverse square root of the class frequency, capped at ten.",
     "weight is learned by gradient descent alongside the model's other parameters.",
     "weight equals the misclassification cost the user supplied per class.",
     "weight is one for the majority and n_classes for every minority class."],
    "The 'balanced' class-weight formula",
    "Each class's weight is inversely proportional to its frequency, normalised so total weighted mass is equal per class: with 900 vs 100 examples, weights are 0.56 and 5.0 — the minority's errors cost nine times more each.",
    "Its effect equals oversampling to parity but without duplicating data. Because the loss is tilted, predicted probabilities shift too — recalibrate if honest probabilities matter downstream.",
    "Rarity sets the price: a class ten times rarer gets mistakes charged ten times higher.");

  /* ===================== Extra Evaluation Metrics (evalx) — 4 ===================== */

  def("evalx",
    "What is partial AUC?",
    "The area under the ROC curve restricted to a relevant operating range, such as low false-positive rates.",
    ["The AUC computed on a random half of the test set for confidence estimation.",
     "The AUC of the model trained on a subset of the available features.",
     "The area between the ROC curve and the precision-recall curve.",
     "The AUC contribution of a single class in a multi-class problem."],
    "Partial AUC",
    "Full AUC averages ranking quality over all thresholds, including absurd ones. Partial AUC integrates only over the FPR band you could actually operate in (say 0–5%) and is usually rescaled to remain 0.5–1 comparable.",
    "Two models can tie on full AUC while differing sharply where it matters: a screening tool constrained to few false alarms should be compared in exactly that region, not on performance it will never use.",
    "Grade only the stretch of road you'll actually drive, not the whole map.");

  def("evalx",
    "What is a DET (Detection Error Tradeoff) curve?",
    "A plot of miss rate against false-alarm rate on normal-deviate scales, spreading out the low-error corner.",
    ["A curve showing detection accuracy as a function of training-set size.",
     "The ROC curve reflected so that both axes measure correct decisions.",
     "A plot of detection latency against error rate for streaming models.",
     "The difference between two models' ROC curves plotted per threshold."],
    "DET curve",
    "A ROC relative: false-negative rate versus false-positive rate, both axes warped by the probit transform. Near-Gaussian score distributions become near-straight lines, and differences between good systems become visible instead of crushed into the ROC's corner.",
    "It is the standard in speaker verification and biometrics, where all serious systems live at tiny error rates: on a DET plot, the equal-error-rate point is simply where the curve crosses the diagonal.",
    "Zoom the graph where the errors are rare — good systems become straight lines you can actually tell apart.");

  def("evalx",
    "What does the Fowlkes-Mallows index measure?",
    "Clustering-to-truth agreement as the geometric mean of pairwise precision and recall.",
    ["The compactness of clusters relative to the separation between their centroids.",
     "The proportion of variance in the labels explained by cluster membership.",
     "The stability of a clustering under bootstrap resampling of the data.",
     "The number of clusters two clusterings have in common."],
    "Fowlkes-Mallows index",
    "Over all pairs of points, precision = fraction of same-cluster pairs that share a true class, recall = fraction of same-class pairs the clustering kept together; FMI is their geometric mean, 1 for perfect agreement.",
    "Like ARI it is permutation-proof (pairs, not label names), and being precision/recall-shaped it stays interpretable when cluster counts differ — though unlike ARI it isn't chance-corrected, so random clusterings score above zero.",
    "Judge the grouping by pairs: were the right couples kept together, and were the couples it formed right?");

  def("evalx",
    "What does Fleiss' kappa measure, extending Cohen's kappa?",
    "Chance-corrected agreement among three or more raters, not just two.",
    ["Agreement between two raters weighted by how far apart their ratings are.",
     "The internal consistency of one rater labelling the same items twice.",
     "The correlation between rater confidence and rater accuracy.",
     "Agreement between a model and the majority vote of its ensemble members."],
    "Fleiss' kappa (multi-rater agreement)",
    "Where Cohen's kappa handles exactly two raters, Fleiss' kappa scores agreement across any number of raters assigning categories, still subtracting the agreement expected by chance from observed agreement.",
    "It is the standard tool for auditing label quality when several annotators build a dataset: low kappa warns that the 'ground truth' is contested, capping any model's measurable performance before training even starts.",
    "When a whole panel labels the data, this asks: do they agree more than dice would?");

  /* ===================== Regression & Boosting (regr) — 4 ===================== */

  def("regr",
    "What is RMSLE (root mean squared log error)?",
    "RMSE computed on log-transformed values, penalising relative errors and under-prediction of large values.",
    ["The RMSE divided by the logarithm of the number of test examples.",
     "The logarithm of the RMSE, used to compress very large error values for display.",
     "RMSE computed only on the examples whose targets exceed the median.",
     "The slope of the regression line between log-predictions and log-targets."],
    "RMSLE",
    "√mean((log(1+ŷ) − log(1+y))²): errors are measured as log-ratios, so predicting 900 for 1000 costs the same as 9 for 10 — a 10% miss either way. The +1 keeps zero targets finite.",
    "It suits wide-ranging positive targets (sales, views, prices) where relative accuracy matters; the log makes it asymmetric, punishing under-prediction more than over-prediction of the same absolute size.",
    "Percentage-style grading: being 10% off costs the same whether the true answer is ten or ten thousand.");

  def("regr",
    "What is Poisson regression designed for?",
    "Modelling count targets via a log link, with predictions that are always non-negative rates.",
    ["Predicting binary outcomes where the positive class is extremely rare.",
     "Modelling continuous targets whose noise follows a heavy-tailed distribution.",
     "Fitting a separate intercept for each categorical level of the target.",
     "Estimating quantiles of a skewed target rather than its mean."],
    "Poisson regression",
    "A GLM for counts (claims, arrivals, defects): it models log(expected count) as a linear function, so rates stay positive and variance is tied to the mean — matching how counts actually behave, unlike ordinary least squares.",
    "Boosting libraries expose it too (objective='count:poisson'), and an exposure offset handles unequal observation windows. When variance far exceeds the mean (overdispersion), negative binomial models are the next step.",
    "The regression built for 'how many events?' — never negative, never fractional in spirit.");

  def("regr",
    "What are residual plots used to diagnose in regression?",
    "Patterns in errors versus predictions — curvature, funnels or clusters that reveal violated assumptions.",
    ["Which features have the largest coefficients in the fitted model.",
     "Whether the training and test sets came from the same distribution.",
     "The convergence speed of the optimiser over training iterations.",
     "The correlation between each pair of predictor variables."],
    "Residual plot diagnostics",
    "Plot residuals against fitted values (or a feature): a healthy model shows a structureless band around zero. A curve means missed non-linearity, a funnel means non-constant variance, stripes or clusters mean an omitted grouping variable.",
    "R² compresses fit into one number; residual plots show where and how the model is wrong — often the fastest route to the fix (add a squared term, transform the target, add the missing feature).",
    "Look at the leftovers: any shape in the mistakes is structure the model failed to eat.");

  def("regr",
    "What does log-transforming a skewed regression target (fit on log(y), invert at prediction) accomplish?",
    "It turns multiplicative structure additive, tames tail leverage, and makes errors relative rather than absolute.",
    ["It guarantees the residuals become exactly normally distributed after fitting.",
     "It doubles the effective sample size by symmetrising the target's histogram.",
     "It removes the need for feature scaling anywhere else in the pipeline.",
     "It converts the regression problem into a classification over magnitude bins."],
    "Target transformation (log target)",
    "Prices and incomes vary by percentage, not by fixed amounts; fitting log(y) lets a linear model express that, and stops the few huge values from dominating squared loss. Predict, then invert with exp (sklearn: TransformedTargetRegressor).",
    "The subtlety is at inversion: exp(mean of logs) estimates the median, not the mean — a systematic low bias correctable with a smearing adjustment. Metrics should be computed on the original scale after inversion.",
    "Teach the model in percentages, then translate its answer back into pounds.");

  /* ===================== Validation (valid) — 4 ===================== */

  def("valid",
    "What is adversarial validation?",
    "Training a classifier to distinguish train from test rows; success reveals distribution shift and its drivers.",
    ["Adding adversarially perturbed examples to the validation set to test robustness.",
     "Having two teams tune the same model and comparing their validation scores.",
     "Validating on the examples the current model gets most badly wrong.",
     "Randomly flipping validation labels to measure sensitivity to noise."],
    "Adversarial validation",
    "Label training rows 0 and test rows 1, then train a classifier on the features: AUC ≈ 0.5 means the sets are indistinguishable; high AUC means shift, and the classifier's top features name the drifting columns.",
    "Beyond diagnosis, it builds better validation sets: training rows the classifier scores most 'test-like' form a validation split that mimics the test distribution — a staple trick when train and test come from different periods or sources.",
    "Ask a model to tell your two datasets apart — if it can, your validation story has a hole, and it will point at it.");

  def("valid",
    "What is the practical trade-off between k=5 and k=10 in k-fold cross-validation?",
    "More folds mean more training data per fold (less bias) but higher compute and often higher variance estimates from overlapping training sets.",
    ["k=10 always yields strictly more accurate models as well as better estimates.",
     "k=5 must be used for classification and k=10 for regression tasks.",
     "The choice only affects runtime; the resulting estimates are identical in expectation.",
     "Larger k reduces both bias and variance, limited only by memory."],
    "Choosing k (fold-count trade-off)",
    "At k=10 each model trains on 90% of the data, so error estimates are less pessimistic than k=5's 80%; but ten highly overlapping training sets produce correlated scores, and everything costs twice as much to run.",
    "Both are defensible defaults — 5 for expensive models and tuning loops, 10 for cheaper models and final reporting; repeated 5-fold often beats plain 10-fold for stability at the same budget.",
    "More slices: each rehearsal uses more of the data but the rehearsals cost more and echo each other.");

  def("valid",
    "How do you stratify train/test splits for a regression (continuous) target?",
    "Bin the target into quantiles and stratify on the bins, so each split spans the target's range.",
    ["Stratification is impossible for regression, so only random splits can be used.",
     "Sort by target and assign alternating rows to train and test sets.",
     "Split so the training set contains all extreme values and the test set the middle.",
     "Standardise the target first; stratification then happens automatically."],
    "Stratified splits for regression (target binning)",
    "Classification's stratify keeps class ratios; the regression analogue discretises y into quantile bins (e.g. via pd.qcut or KBinsDiscretizer) and passes the bin labels as the stratification key, then discards them.",
    "It defends against unlucky splits where the test set misses the tails — a real risk with skewed targets and small data — which otherwise makes error estimates swing on the draw rather than on the model.",
    "Chop the number line into bands and make sure every band shows up in both halves of the split.");

  def("valid",
    "Near-duplicate records end up in both the training and the test set. What does this cause?",
    "Leakage: the model is partly tested on data it has effectively seen, inflating scores.",
    ["Underfitting, because the duplicates dilute the gradient signal during training.",
     "No effect, provided the duplicates carry consistent labels in both sets.",
     "A runtime error in most libraries, which detect and reject duplicate rows.",
     "Improved calibration, since familiar examples anchor the probabilities."],
    "Duplicate leakage",
    "Random splitting assumes independent rows; duplicates (retweets, re-listed items, augmented copies, the same patient twice) violate that, so the test set partially restates the training set and memorisation is graded as skill.",
    "It is among the most common real-world leaks: the fix is deduplication before splitting, or grouped splits keyed on the entity (GroupKFold) so all copies of a thing stay on one side of the line.",
    "If the exam repeats the homework questions, the grade measures memory, not understanding.");

})();
