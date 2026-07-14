/* Decision / contrast flashcards for the expanded topics — "when to pick", "X vs Y" intuition cards
   (like Euclidean-vs-Manhattan). These are NOT tagged definitions; they PUSH onto the new topic qks,
   so they must load AFTER data_defs_new.js which first assigns those arrays. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  function card(qk, q, correct, distractors, name, text, explain, simple, formula) {
    (Q[qk] = Q[qk] || []).push({
      q: q, choices: [correct].concat(distractors), explain: explain, simple: simple,
      widget: { reveal: { name: name, formula: formula || '', text: text } }
    });
  }

  /* ---------------- Interpretability & Explainability ---------------- */
  card("interp",
    "You need to explain individual predictions from a tree model. When would you reach for SHAP rather than LIME?",
    "Use SHAP for exact, consistent per-feature attributions that sum to the prediction (fast and exact on trees); use LIME for a quick, model-agnostic local approximation when SHAP is too slow",
    ["LIME is always strictly more accurate than SHAP on every single kind of model there is, so SHAP is only ever worth reaching for on the very simplest of linear models and never on any tree-based ensembles at all",
     "SHAP can only ever explain the whole dataset at a global level and is completely unable to attribute anything to one single individual prediction",
     "They are completely identical methods under the hood, computing the very same attribution numbers, so the only real difference between the two is the name on the package",
     "SHAP requires the underlying model to be fully retrained from scratch every single time you want a fresh explanation, which is what makes it so much slower than LIME"],
    "SHAP vs LIME — which explainer?",
    "SHAP gives exact, additive, consistent attributions (fast on trees) — trust it for per-feature credit. LIME fits a quick local surrogate: model-agnostic but less stable. SHAP for rigour, LIME for a fast any-model peek.",
    "Both explain a single prediction. SHAP's attributions are exact and add up to the output (and are fast for tree models); LIME approximates locally and works on any model but wobbles more between runs. Reach for SHAP when you need trustworthy per-feature credit, LIME when you want a quick, model-agnostic look.",
    "SHAP = precise and consistent (great for trees). LIME = quick-and-rough, works on anything. Rigour → SHAP; speed on any model → LIME.");

  card("interp",
    "Which explainability tools answer a GLOBAL question about a model versus a LOCAL one?",
    "Global: feature importances and partial dependence plots (how the model behaves overall). Local: SHAP or LIME on one row (why this particular prediction)",
    ["Global questions are answered by running SHAP on one single row, while local questions are instead answered with partial dependence plots over all the rows",
     "Both the global and the local kinds of question are always answered using exactly the same set of explanation tools every single time you ask",
     "Global explanation tools always need the true labels in order to run, whereas the local explanation tools never require any labels at all to work",
     "Local explanation tools such as SHAP and LIME only ever work when the underlying model that is being explained happens to be a simple linear one"],
    "Global vs local explainers",
    "Global tools (feature importance, partial dependence) describe the model overall; local tools (SHAP, LIME on one row) explain a single prediction. Match the tool to the question you're asking.",
    "If the question is 'how does this model behave in general?', use global tools: overall feature importance, partial dependence plots. If it's 'why did it decide THIS for this case?', use local tools: SHAP or LIME on that row.",
    "'In general' → importances / PDP. 'Why this one case?' → SHAP / LIME. Pick the tool that matches the question.");

  /* ---------------- Class Imbalance ---------------- */
  card("imbal",
    "Your classifier ignores a rare positive class. What are your three main levers, and how do they differ?",
    "Resample the data (SMOTE / over- / under-sampling), reweight the loss (class weights), or move the decision threshold — each shifts attention to the minority without new labels",
    ["The only thing that can ever genuinely help with this is going out and collecting a great deal more labelled training data for both of the classes, since nothing else can touch it",
     "Engineer and add a whole batch of extra input features that are computed only for the rows belonging to the minority class, in the hope of separating them",
     "Abandon the classification setup entirely and switch the whole problem over to an unsupervised clustering approach instead, quietly dropping the labels",
     "Increase the optimiser learning rate specifically for the rare-class examples so that each of their gradient updates ends up counting for a great deal more"],
    "Fixing imbalance: resample vs reweight vs threshold",
    "Three levers: (1) resample — SMOTE / over- / under-sampling changes the data; (2) class weights — penalise minority errors more, changing the loss; (3) move the threshold — trade precision for recall at predict time. Try weights and threshold first; they don't distort the data.",
    "You can rebalance the data (SMOTE, over/undersample), tell the loss that minority mistakes cost more (class weights), or simply lower the decision threshold so more cases are flagged. Weights and threshold-moving are the gentlest because they leave the data untouched.",
    "Change the data (resample), change the loss (class weights), or change the cutoff (threshold). Reach for weights/threshold first — they don't fake data.");

  card("imbal",
    "On a 99% / 1% split a model scores 99% accuracy but catches no positives. What happened, and what should you measure instead?",
    "Accuracy is dominated by the majority class, so 'always predict majority' looks great; use recall, precision, PR-AUC, balanced accuracy or MCC instead",
    ["The model has badly overfit the tiny minority class, so the correct fix from here is to go and collect and keep even fewer positive examples than before",
     "Accuracy is a perfectly fine metric to use here and the reported score genuinely means that the model is excellent at the job it was built for",
     "The input features simply need to be rescaled onto a common numeric range, and nothing else about the setup or the metric is actually wrong",
     "Nothing at all has gone wrong here, because ninety-nine percent is essentially the very best score that any possible model could ever hope to achieve"],
    "Why accuracy lies on imbalanced data",
    "When one class is rare, accuracy rewards always-guess-majority. Switch the scoreboard to recall, precision, PR-AUC, balanced accuracy or MCC — metrics that actually reflect minority-class performance.",
    "With 99% negatives, a model that always says 'negative' is 99% accurate and useless. Accuracy hides the failure because it's swamped by the majority. Judge the model on metrics that see the rare class: recall, precision, PR-AUC, balanced accuracy, MCC.",
    "'Always say the common class' scores 99% and catches nothing. Accuracy is the wrong scoreboard — use recall / PR-AUC / balanced accuracy / MCC.");

  /* ---------------- Extra Evaluation Metrics ---------------- */
  card("evalx",
    "Positives are rare (fraud, disease). Why might PR-AUC tell you more than ROC-AUC?",
    "PR-AUC tracks precision and recall of the rare positive and ignores the huge pile of true negatives, so it isn't inflated by them the way ROC-AUC can be",
    ["ROC-AUC simply cannot be computed at all whenever the two classes in the data happen to be even slightly imbalanced against each other, so it is useless on rare-positive problems",
     "PR-AUC is really just the ordinary ROC-AUC score measured only on the rows that belong to the large majority class in the data",
     "The two metrics always end up giving you the exact same number in the end, regardless of how heavily skewed the two classes are",
     "PR-AUC mostly rewards a model for confidently predicting the common majority class on as many of the individual rows as it possibly can"],
    "ROC-AUC vs PR-AUC",
    "ROC-AUC uses the true-negative-heavy false-positive rate, so it can look high even when positives are missed. PR-AUC (average precision) follows precision vs recall of the rare class — prefer it when positives are scarce.",
    "ROC-AUC's false-positive-rate axis is dominated by the many true negatives, so it can stay flatteringly high while the model misses positives. PR-AUC only involves the positive class (precision and recall), so it exposes poor rare-class performance.",
    "When positives are needle-in-a-haystack rare, ROC-AUC looks too good. PR-AUC only cares about the needles — trust it more.");

  card("evalx",
    "When does recall matter more than precision, and when is it the other way round?",
    "Favour recall when missing a positive is costly (disease screening, fraud); favour precision when false alarms are costly (spam, flagging users). Moving the threshold trades one for the other",
    ["Precision is always the single more important metric of the two to optimise for, no matter what the application happens to be or how costly each of the two kinds of error might turn out to be",
     "Recall and precision always rise and fall together in perfect lockstep, so improving one of them automatically improves the other one by the very same amount too",
     "You can always straightforwardly maximise both recall and precision at the very same time, with no genuine trade-off ever existing between the two of them",
     "The choice between the two metrics depends only on the sheer size of the dataset, and has nothing at all to do with the relative cost of the different errors"],
    "Precision vs recall — which to favour",
    "Recall = catch all the positives (screening, fraud — a miss is dangerous). Precision = be right when you flag (spam, alerts — false alarms annoy). The threshold trades one for the other; pick by which error hurts more.",
    "If a missed positive is the expensive mistake — an undetected tumour or fraud — push for recall. If a false alarm is the expensive mistake — good email in the spam bin, wrongly flagged user — push for precision. The decision threshold slides between them.",
    "Missing a real case is worse → chase recall. Crying wolf is worse → chase precision. The threshold is the dial between them.");

  card("evalx",
    "You want ONE number to summarise an imbalanced classifier. How do F1, balanced accuracy and MCC differ?",
    "F1 balances precision and recall of the positive class; balanced accuracy averages per-class recall; MCC uses all four confusion cells and is the hardest to fool, so it's the most robust single summary",
    ["They are really just three completely different names for one and the very same underlying formula, always computed in precisely the same way and therefore always giving you identical numbers on absolutely any dataset",
     "All three of these metrics completely ignore the rare minority class and end up scoring the model only on how well it happens to do on the majority class",
     "Balanced accuracy is defined simply as the precision multiplied by the recall of the positive class, taken together as one single product figure",
     "MCC is a metric that only ever works for regression problems and cannot be applied to a classification task of any kind at all"],
    "F1 vs balanced accuracy vs MCC",
    "F1 = harmonic mean of precision and recall (positive class only). Balanced accuracy = mean of per-class recall. MCC = a correlation from all four cells, high only when BOTH classes are handled well — the most fool-proof single score on skewed data.",
    "F1 focuses on the positive class's precision and recall. Balanced accuracy averages how well each class is recalled. MCC folds in all four confusion-matrix cells and only rewards getting both classes right, so it resists the tricks that fool accuracy and even F1.",
    "F1 = positive-class precision+recall. Balanced accuracy = average recall per class. MCC = uses all four cells, hardest to fool — the safest single number.");

  /* ---------------- Regression & Boosting ---------------- */
  card("regr",
    "Your features are many and correlated. How do Ridge, Lasso and Elastic Net differ, and which fits best?",
    "Ridge (L2) shrinks but keeps all features (stable when correlated); Lasso (L1) zeroes some out (sparse, but erratic under correlation); Elastic Net blends both — sparse AND stable, the usual pick for correlated features",
    ["All three of these methods will always produce exactly identical coefficient values no matter what the underlying data happens to look like, so the specific choice between the three can never really matter at all in practice",
     "Lasso is the method that always keeps every single feature in the final model, while Ridge is instead the one that drives whole features all the way down to exactly zero",
     "Elastic Net is the particular option that removes all of the regularisation from the model entirely, leaving every one of the fitted coefficients completely unpenalised",
     "Ridge regression is a technique that can only ever be applied to classification problems, and it can never be used on an ordinary regression one"],
    "Ridge vs Lasso vs Elastic Net",
    "Ridge (L2): shrinks all weights, keeps every feature, stable when features are correlated. Lasso (L1): zeroes weights for a sparse model, but picks arbitrarily among correlated features. Elastic Net: blends both — sparse and stable. Correlated features → Elastic Net.",
    "Ridge gently shrinks every coefficient and keeps all features — steady when predictors overlap. Lasso zeroes some coefficients for a sparse, readable model, but with correlated features it picks one almost at random. Elastic Net mixes the two to get sparsity without that instability.",
    "Ridge = shrink all, keep all. Lasso = drop some (but jumpy when features overlap). Elastic Net = drop some AND stay steady. Correlated features → Elastic Net.",
    "L1 (sparse) + L2 (stable)");

  card("regr",
    "XGBoost, LightGBM and CatBoost are all gradient-boosting libraries. When would you reach for each?",
    "XGBoost: the battle-tested default; LightGBM: fastest and lightest on large tabular data (leaf-wise, histogram-based); CatBoost: best when you have many categorical features (native handling, ordered boosting)",
    ["They are really all just the same single underlying library, simply repackaged and then sold on under three different brand names, with no meaningful difference between any of the three in how they actually work",
     "XGBoost is the only one of the three that is actually able to handle ordinary tabular data, while the other two of them can only take in images or raw text",
     "CatBoost is actually a deep-learning model that was designed for image recognition, rather than being any kind of gradient boosting on tabular data",
     "LightGBM is reliably slower to train than both of the other two libraries on every single dataset that you could ever possibly try running it on"],
    "XGBoost vs LightGBM vs CatBoost",
    "XGBoost — robust default with many tuning knobs. LightGBM — fastest and lightest on big tables (leaf-wise growth, histograms). CatBoost — shines with many categoricals (native categorical handling + ordered boosting). All strong; choose by data size and categorical load.",
    "All three boost trees on the residuals. XGBoost is the reliable all-rounder. LightGBM grows trees leaf-wise and bins features, so it's fastest and lightest on large datasets. CatBoost handles categorical columns natively and guards against target leakage, so it's the pick when categoricals dominate.",
    "XGBoost = safe default. LightGBM = speed on big tables. CatBoost = lots of categorical columns. Pick by size and how many categoricals you have.");

  card("regr",
    "How do RMSE and MAE differ as regression error metrics, and when does the choice matter?",
    "RMSE squares errors, so it punishes large misses harder and is outlier-sensitive; MAE treats every error linearly and is robust to outliers — use MAE when big errors shouldn't dominate the score",
    ["MAE is the metric that ends up punishing large errors far more heavily than RMSE ever does, precisely because it is the one that squares each of the individual errors first before averaging them",
     "The two metrics turn out to be completely identical to one another as soon as you take the square root of one of them, so the choice between them makes no difference",
     "RMSE completely ignores the sign of each of the errors while MAE instead keeps the sign, so with RMSE the negative errors simply cancel out the positive ones",
     "MAE is a metric that can only ever be used on classification problems and is left entirely undefined for any kind of numeric regression target"],
    "RMSE vs MAE",
    "RMSE squares before averaging → large errors dominate, so it's outlier-sensitive. MAE is the mean absolute error → every error counts linearly, robust to outliers. Outliers you care about → RMSE; outliers you want to shrug off → MAE.",
    "RMSE squares each error first, so one big miss can swamp the score — useful when large errors are especially bad. MAE just averages the absolute errors, treating a big miss proportionally, so it's steadier when a few outliers shouldn't dominate.",
    "RMSE = big misses hurt a lot (outlier-sensitive). MAE = every error counts the same (outlier-robust). Choose by whether big errors should dominate.",
    "RMSE penalises outliers · MAE shrugs them off");

  /* ---------------- Validation ---------------- */
  card("valid",
    "How do plain k-fold, group k-fold and a time-series split differ in the leakage each one prevents?",
    "Plain k-fold shuffles randomly (fine for independent rows); group k-fold keeps each entity in one fold (stops same-subject leakage); time-series split trains on the past and tests on the future (stops look-ahead leakage)",
    ["All three of these are really just three completely different names for the one exact same random shuffling procedure under the hood, and so they each prevent precisely the very same kinds of leakage as one another in every single case",
     "Group k-fold is a technique that is only ever appropriate for data which is strictly ordered in time, and it is never suitable for anything else at all",
     "A time-series split always shuffles every one of the rows thoroughly at random first, before it then goes on to divide them up into the separate folds",
     "Plain random k-fold automatically prevents all look-ahead leakage entirely on its own, even in the case where the underlying data is strictly ordered in time"],
    "k-fold vs group k-fold vs time-series split",
    "Plain k-fold: random folds — assumes independent rows. Group k-fold: one entity never spans folds — stops same-user/patient leakage. Time-series split: past → future only — stops look-ahead leakage. Match the split to the way your data is NOT independent.",
    "Random k-fold is right only when rows are independent. If many rows share an entity (a user, a patient), group k-fold keeps that entity wholly on one side so the model can't memorise it. If rows are ordered in time, a time-series split trains on earlier data and tests on later, so the model never peeks at the future.",
    "Independent rows → plain k-fold. Repeated entities → group k-fold. Time order → time-series split. Match the split to how the data is linked.");

  card("valid",
    "When is leave-one-out cross-validation (LOOCV) worth its cost over 5- or 10-fold?",
    "LOOCV trains n times for a nearly unbiased but high-variance estimate; it's mainly worth it on very small datasets where you can't spare any rows for validation",
    ["LOOCV is reliably much faster to run than ordinary 5-fold or 10-fold cross-validation, because it only ever needs to train the underlying model one single time from start to finish",
     "LOOCV is at its very best and its most computationally efficient precisely on the largest datasets that you happen to have, where its total cost stays reassuringly low",
     "LOOCV removes any need at all to train the model more than one single time, since it manages to evaluate every one of the rows together in one pass",
     "LOOCV completely eliminates all of the variance in the resulting performance estimate, so it gives you a perfectly stable and repeatable final number"],
    "When to use LOOCV",
    "LOOCV = n folds of one row each: almost unbiased but costly (n model fits) and high-variance. Worth it on tiny datasets where every row counts; otherwise 5–10-fold is cheaper and usually a better trade-off.",
    "Leave-one-out trains the model once per row, so on a big dataset it's painfully slow and its score bounces around (high variance). On a very small dataset, though, it lets you use almost every row for training each time, which is exactly when you can't afford to hold much out.",
    "Tiny dataset where every row is precious → LOOCV. Otherwise it's slow and jumpy; 5–10-fold wins.");
})();
