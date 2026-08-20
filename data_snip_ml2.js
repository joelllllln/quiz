/* Quickfire cards — the reasoning half of the job: designing an experiment,
   reading a result honestly, and the modelling ideas interviewers ask you to explain. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var EXP = 'Statistics · experiments & inference';
  var CON = 'Modelling · the ideas they ask about';
  var EVA = 'Modelling · choosing and reading a metric';

  window.SNIPPETS.push(

    /* ---- experiments & inference ---- */
    { id: 'st2-null', group: EXP, lvl: 2,
      ask: 'Name the hypothesis a significance test actually tests: the one that says there is no difference',
      a: 'the null hypothesis',
      note: 'You never prove it. You either reject it or fail to reject it.' },

    { id: 'st2-pvalue-meaning', group: EXP, lvl: 2,
      ask: 'Complete the definition: a p-value is the probability of a result this extreme if the null is ___',
      a: 'true',
      note: 'It is NOT the probability that the null is true, and not the probability you are wrong. Interviewers check this.' },

    { id: 'st2-alpha', group: EXP, lvl: 2,
      ask: 'Give the significance threshold that is conventional in most business testing',
      a: '0.05',
      note: 'A convention, not a law of nature. Choose it before you look at the data.' },

    { id: 'st2-type-one', group: EXP, lvl: 3,
      ask: 'Name the error where you declare an effect that is not really there',
      a: 'a type I error',
      alts: ['a false positive'],
      note: 'Its rate is your alpha. Type II is the opposite: missing a real effect.' },

    { id: 'st2-type-two', group: EXP, lvl: 3,
      ask: 'Name the error where you miss an effect that really exists',
      a: 'a type II error',
      alts: ['a false negative'],
      note: 'Its rate is beta, and 1 - beta is the power of the test.' },

    { id: 'st2-power', group: EXP, lvl: 3,
      ask: 'Name the quantity that is the chance of detecting a real effect, usually aimed at 80%',
      a: 'power',
      note: 'Power rises with sample size and with effect size, and falls as the variance rises.' },

    { id: 'st2-ci-meaning', group: EXP, lvl: 3,
      ask: 'Say what a 95% confidence interval means in terms of repeated samples',
      a: '95 intervals in 100 would contain the true value',
      note: 'It is a statement about the PROCEDURE. Any single interval either contains the value or does not.' },

    { id: 'st2-ci-code', group: EXP, lvl: 3,
      ask: 'Build a 95% confidence interval for the mean of `s` using the normal approximation',
      a: "mean = s.mean()\nse = s.std() / np.sqrt(len(s))\nci = (mean - 1.96 * se, mean + 1.96 * se)",
      note: '1.96 is the 97.5th percentile of the normal — the number worth remembering.' },

    { id: 'st2-clt', group: EXP, lvl: 3,
      ask: 'Name the theorem saying sample MEANS are normally distributed even when the data are not',
      a: 'the central limit theorem',
      note: 'It is why t-tests survive skewed data at a decent sample size — and why they do not at n = 8.' },

    { id: 'st2-sample-size', group: EXP, lvl: 3,
      ask: 'Say what happens to the width of a confidence interval when you take four times as much data',
      a: 'it halves',
      note: 'Precision improves with the SQUARE ROOT of n. Four times the data for twice the precision.' },

    { id: 'st2-ab-randomise', group: EXP, lvl: 2,
      ask: 'Name the one design step that lets you claim an A/B test measured cause, not correlation',
      a: 'randomisation',
      note: 'Randomly assigned groups differ only by chance, so a difference in outcome points at the treatment.' },

    { id: 'st2-ab-metric', group: EXP, lvl: 3,
      ask: 'Name what you must fix BEFORE an A/B test starts, along with the sample size',
      a: 'the success metric',
      note: 'Choosing the metric after seeing the data is how any test can be made to "work".' },

    { id: 'st2-peeking', group: EXP, lvl: 3,
      ask: 'Name the mistake of stopping an A/B test the moment it looks significant',
      a: 'peeking',
      note: 'Repeated looks inflate the false positive rate well past 5%. Fix the horizon in advance or use a sequential test.' },

    { id: 'st2-multiple-testing', group: EXP, lvl: 3,
      ask: 'Name the correction that divides alpha by the number of tests you ran',
      a: 'Bonferroni',
      note: 'Test twenty metrics at 0.05 and one will look significant by luck alone.' },

    { id: 'st2-effect-size', group: EXP, lvl: 3,
      ask: 'Name what a p-value does NOT tell you, which is why you also report the difference and its interval',
      a: 'the effect size',
      note: 'With a big enough sample, a meaningless difference is significant. Always report how big, not just whether.' },

    { id: 'st2-simpson', group: EXP, lvl: 3,
      ask: 'Name the paradox where a trend in every subgroup reverses once the groups are pooled',
      a: "Simpson's paradox",
      note: 'The reason to look at a result split by the obvious confounder before you present it.' },

    { id: 'st2-confounder', group: EXP, lvl: 2,
      ask: 'Name a variable that drives both the treatment and the outcome, faking a relationship between them',
      a: 'a confounder',
      note: 'Randomisation deals with confounders you have not even thought of. Nothing else does.' },

    { id: 'st2-survivorship', group: EXP, lvl: 3,
      ask: 'Name the bias from analysing only the cases that made it into your data',
      a: 'survivorship bias',
      note: 'Churned customers, failed orders and rejected applicants are missing from most tables by design.' },

    { id: 'st2-ttest-code', group: EXP, lvl: 3,
      ask: 'Run a two-sample t-test not assuming equal variances',
      a: 'stats.ttest_ind(a, b, equal_var=False)',
      note: "Welch's t-test. It is the safer default and costs almost nothing." },

    { id: 'st2-proportions', group: EXP, lvl: 3,
      ask: 'Import the statsmodels test for comparing two conversion rates',
      a: 'from statsmodels.stats.proportion import proportions_ztest',
      note: 'Conversion rates are proportions, not means — this is the right test for an A/B funnel.' },

    { id: 'st2-bootstrap-ci', group: EXP, lvl: 3,
      ask: 'Get a bootstrap 95% interval from the array of resampled means `boot`',
      a: 'np.percentile(boot, [2.5, 97.5])',
      note: 'Resample with replacement a few thousand times and read the percentiles. No distribution assumed.' },

    /* ---- the ideas they ask about ---- */
    { id: 'ml2-overfit', group: CON, lvl: 1,
      ask: 'Name what has happened when training accuracy is high and test accuracy is poor',
      a: 'overfitting',
      note: 'The model learned the noise. More data, fewer features, more regularisation, simpler model.' },

    { id: 'ml2-underfit', group: CON, lvl: 2,
      ask: 'Name what has happened when the model scores badly on BOTH training and test data',
      a: 'underfitting',
      note: 'Too simple, or the features do not carry the signal. Add capacity or better features.' },

    { id: 'ml2-bias-variance', group: CON, lvl: 3,
      ask: 'Name the trade-off between a model too simple to fit and one too sensitive to its training data',
      a: 'the bias-variance trade-off',
      note: 'High bias is underfitting; high variance is overfitting. Everything you tune moves along this line.' },

    { id: 'ml2-regularisation', group: CON, lvl: 3,
      ask: 'Name the technique that penalises large coefficients to keep a model simple',
      a: 'regularisation',
      note: 'L2 (ridge) shrinks coefficients; L1 (lasso) drives some to exactly zero and so selects features.' },

    { id: 'ml2-l1', group: CON, lvl: 3,
      ask: 'Build a logistic regression with L1 regularisation, using the liblinear solver that supports it',
      a: "LogisticRegression(penalty='l1', solver='liblinear')",
      note: 'L1 needs a solver that supports it — the default one does not.' },

    { id: 'ml2-c-param', group: CON, lvl: 3,
      ask: 'Say which way to move C in a logistic regression to make it regularise MORE',
      a: 'down',
      note: 'C is the INVERSE of regularisation strength — the opposite of alpha in ridge and lasso.' },

    { id: 'ml2-ridge', group: CON, lvl: 3,
      ask: 'Import the linear regression with L2 regularisation built in',
      a: 'from sklearn.linear_model import Ridge',
      note: 'Lasso is the L1 version; ElasticNet mixes the two.' },

    { id: 'ml2-scaling-needed', group: CON, lvl: 2,
      ask: 'Name the model family that does NOT need its features scaled',
      a: 'trees',
      note: 'Trees split on thresholds, so units do not matter. Distance and gradient methods — kNN, SVM, linear, neural — all need scaling.' },

    { id: 'ml2-supervised', group: CON, lvl: 1,
      ask: 'Name the kind of learning that has labelled examples to learn from',
      a: 'supervised learning',
      note: 'Unsupervised has no labels — clustering, dimensionality reduction, anomaly detection.' },

    { id: 'ml2-classification-vs', group: CON, lvl: 1,
      ask: 'Name the task type when the target is a number rather than a category',
      a: 'regression',
      note: 'Predicting spend is regression; predicting whether they churn is classification.' },

    { id: 'ml2-imbalance', group: CON, lvl: 3,
      ask: 'Name the problem when 99% of rows are one class and accuracy therefore means nothing',
      a: 'class imbalance',
      note: 'Answer it with precision/recall, class weights, resampling and a threshold you chose deliberately.' },

    { id: 'ml2-smote', group: CON, lvl: 3,
      ask: 'Name the resampling method that invents synthetic minority-class rows',
      a: 'SMOTE',
      note: 'Fit it on the TRAINING fold only. Resampling before the split leaks the answer straight into the test set.' },

    { id: 'ml2-cv-why', group: CON, lvl: 2,
      ask: 'Name what cross-validation gives you that a single train/test split does not',
      a: 'a more reliable estimate',
      note: 'Every row is tested exactly once, and you get a spread as well as a mean.' },

    { id: 'ml2-cv-timeseries', group: CON, lvl: 3,
      ask: 'Name the cross-validation scheme to use when the rows are ordered in time',
      a: 'a rolling forward split',
      alts: ['time series split'],
      note: 'Always train on the past and test on the future. A shuffled split leaks tomorrow into today.' },

    { id: 'ml2-ensemble', group: CON, lvl: 3,
      ask: 'Name what a random forest does with many decision trees to beat any one of them',
      a: 'averaging',
      alts: ['bagging'],
      note: 'Bagging: many trees on bootstrap samples, votes averaged. Boosting instead builds trees on the previous errors.' },

    { id: 'ml2-boosting', group: CON, lvl: 3,
      ask: 'Name the ensemble method where each new model is trained on the errors of the last',
      a: 'boosting',
      note: 'XGBoost, LightGBM and gradient boosting. Usually the strongest thing on tabular data.' },

    { id: 'ml2-hyperparam', group: CON, lvl: 2,
      ask: 'Name the kind of setting you choose before fitting, like tree depth or k',
      a: 'a hyperparameter',
      note: 'Parameters are learned from the data; hyperparameters are chosen by you and tuned on validation data.' },

    { id: 'ml2-curse', group: CON, lvl: 3,
      ask: 'Name the problem where distances stop being meaningful once there are hundreds of features',
      a: 'the curse of dimensionality',
      note: 'It hits kNN and clustering hardest. Reduce the dimensions or choose a model that does not use distance.' },

    { id: 'ml2-baseline', group: CON, lvl: 2,
      ask: 'Name the first thing to build so you can tell whether a model is worth anything',
      a: 'a baseline',
      note: 'Predict the majority class, or the mean. A model that cannot beat it has told you nothing.' },

    { id: 'ml2-explain-shap', group: CON, lvl: 3,
      ask: 'Name the method that attributes one prediction to each feature\'s contribution',
      a: 'SHAP',
      note: 'Global importances say what the model uses; SHAP says why THIS row got THIS answer.' },

    { id: 'ml2-drift', group: CON, lvl: 3,
      ask: 'Name what has happened when a live model quietly gets worse as the world changes',
      a: 'drift',
      note: 'Monitor the input distributions as well as the score, and retrain on a schedule.' },

    /* ---- choosing and reading a metric ---- */
    { id: 'me-precision-words', group: EVA, lvl: 2,
      ask: 'Complete it: precision is, of everything we FLAGGED, how much ___',
      a: 'was right',
      note: 'Precision = TP / (TP + FP). It is the metric that cares about false alarms.' },

    { id: 'me-recall-words', group: EVA, lvl: 2,
      ask: 'Complete it: recall is, of everything that WAS positive, how much we ___',
      a: 'caught',
      note: 'Recall = TP / (TP + FN). It is the metric that cares about misses.' },

    { id: 'me-f1-words', group: EVA, lvl: 2,
      ask: 'Name what the F1 score is, of precision and recall',
      a: 'the harmonic mean',
      note: 'Harmonic, so one bad number drags it down — you cannot hide a terrible recall behind lovely precision.' },

    { id: 'me-fraud-metric', group: EVA, lvl: 3,
      ask: 'Name the metric to lead on for fraud detection, where a miss costs far more than a false alarm',
      a: 'recall',
      note: 'Say the trade-off out loud: we accept more false alarms to catch more fraud, and review capacity is the limit.' },

    { id: 'me-spam-metric', group: EVA, lvl: 3,
      ask: 'Name the metric to lead on for a spam filter, where wrongly binning real mail is the worst outcome',
      a: 'precision',
      note: 'The mirror image of the fraud answer, and interviewers often ask both back to back.' },

    { id: 'me-roc-vs-pr', group: EVA, lvl: 3,
      ask: 'Name the curve to prefer over ROC when positives are rare',
      a: 'the precision-recall curve',
      note: 'ROC AUC looks flatteringly high on imbalanced data because true negatives are easy and plentiful.' },

    { id: 'me-auc-meaning', group: EVA, lvl: 3,
      ask: 'Say what ROC AUC measures, in terms of ranking a random positive against a random negative',
      a: 'the chance the positive is ranked higher',
      note: '0.5 is a coin toss, 1.0 is perfect ranking. It judges the ORDER, not the threshold.' },

    { id: 'me-threshold', group: EVA, lvl: 3,
      ask: 'Name the thing you tune AFTER training to trade precision against recall',
      a: 'the threshold',
      note: 'The default 0.5 is a convention, not a decision. Pick it from the cost of each error.' },

    { id: 'me-rmse-vs-mae', group: EVA, lvl: 3,
      ask: 'Name the regression metric that punishes big misses hardest',
      a: 'RMSE',
      note: 'It squares the errors, so outliers dominate. MAE treats every pound of error the same.' },

    { id: 'me-r2-meaning', group: EVA, lvl: 2,
      ask: 'Say what R-squared measures, in terms of variance',
      a: 'the share of variance explained',
      note: '0 means no better than predicting the mean; it can go negative on test data, which is worth knowing.' },

    { id: 'me-mape', group: EVA, lvl: 3,
      ask: 'Name the error metric expressed as a percentage of the actual value',
      a: 'MAPE',
      note: 'Readable for a business audience, but it explodes when the actual value is near zero.' },

    { id: 'me-report-both', group: EVA, lvl: 2,
      ask: 'Name what you report ALONGSIDE the model score to show it is worth deploying',
      a: 'the baseline score',
      note: '"92% accurate" means nothing until you say the majority class is 90%.' }
  );
})();
