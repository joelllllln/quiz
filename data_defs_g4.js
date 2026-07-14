/* Definition questions batch g4 (metrics1, perf1, skl1). */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function add(qk, obj) { (Q[qk] = Q[qk] || []).push(obj); D[obj.q] = 1; }

  /* ===================== metrics1 (12) ===================== */

  add("metrics1", {
    q: "In classification, what is accuracy?",
    choices: [
      "The fraction of all predictions the classifier gets correct — correct predictions divided by the total number of predictions",
      "The fraction of the cases the model flagged as positive that genuinely turn out to be positive once the labels are checked",
      "The fraction of the genuinely positive cases in the data that the classifier manages to correctly flag with a raised alert",
      "The average of the squared differences between each predicted number and its true numeric value taken across the dataset",
      "The area under the curve traced by the true-positive rate against the false-positive rate as the decision threshold varies"
    ],
    explain: "Accuracy is the simplest classification metric: it counts how many predictions match the truth and divides by the total number of predictions. It treats every class equally, which makes it easy to read but potentially misleading on imbalanced data, where always guessing the majority class can score high while being useless.",
    simple: "It is just the share of answers the model got right out of everything it guessed. Ninety right calls out of a hundred is 90% accuracy.",
    widget: {
      type: "curveStatic", title: "Share of correct calls",
      world: "As a classifier improves, watch the fraction of all its predictions that turn out correct.",
      xlab: "classifier quality →", xs: [0,1,2,3,4], labels: ["poor","weak","ok","good","great"], dec: 0, yunit: "%",
      series: [ { name: "accuracy (%)", ys: [52, 66, 78, 88, 96] } ],
      knob: { label: "Classifier quality", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A poor classifier barely beats a coin flip — about half its calls are wrong.", tone: "info" },
        { max: 3, text: "As it improves, a larger and larger share of all predictions land on the right answer.", tone: "info" },
        { max: 4, text: "🤯 A great model gets nearly every prediction right. That correct-out-of-total fraction IS accuracy.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Accuracy", formula: "accuracy = correct predictions / total predictions",
        text: "The overall hit rate — simple, but shaky on imbalanced classes." }
    }
  });

  add("metrics1", {
    q: "In classification, what is precision?",
    choices: [
      "Of the cases the model flagged as positive, the fraction that are actually positive — TP / (TP + FP)",
      "Of all the actual positive cases in the data, the fraction the model successfully flags with a raised alert — TP / (TP + FN)",
      "The fraction of all predictions, whether positive or negative, that the classifier gets exactly correct across the whole set",
      "The harmonic mean of recall and specificity, combining those two rates into a single balanced summary score",
      "The average straight-line distance between a single data point and the centre of the cluster it was assigned to"
    ],
    explain: "Precision answers 'when the model raises a flag, how often is it right?' — it divides true positives by all predicted positives (true plus false). High precision means few false alarms. It is the metric to watch when a false positive is costly, such as flagging a legitimate email as spam.",
    simple: "Out of everything the model called positive, precision is the share that really was positive. High precision means it rarely cries wolf.",
    widget: {
      type: "curveStatic", title: "How trustworthy is a flag?",
      world: "Tightening the decision threshold so the model only flags cases it is confident about, and reading precision.",
      xlab: "decision threshold →", xs: [0,1,2,3,4], labels: ["lax","mild","balanced","strict","extreme"], dec: 0, yunit: "%",
      series: [ { name: "precision (%)", ys: [45, 58, 72, 85, 96] } ],
      knob: { label: "Threshold", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A lax threshold flags almost anything, so many flags are false alarms — precision is low.", tone: "info" },
        { max: 3, text: "Raise the bar and the model only flags likely positives, so a larger share of flags are correct.", tone: "info" },
        { max: 4, text: "🤯 At an extreme threshold nearly every flag is right. That right-out-of-flagged fraction IS precision.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Precision", formula: "precision = TP / (TP + FP)",
        text: "Of the positives you predicted, how many were truly positive." }
    }
  });

  add("metrics1", {
    q: "In classification, what is recall?",
    choices: [
      "Of the actual positive cases, the fraction the model successfully flags — TP / (TP + FN)",
      "Of all the cases the model flagged positive, the fraction that genuinely turn out to be truly positive — TP / (TP + FP)",
      "The fraction of all predictions the model gets correct overall, counting both its positive and its negative calls together",
      "The average squared error between each predicted numeric value and its corresponding true target value in the data",
      "The total number of examples that happen to belong to a given class within the dataset being evaluated here"
    ],
    explain: "Recall answers 'of all the real positives out there, how many did the model catch?' — it divides true positives by all actual positives (true positives plus false negatives). High recall means few misses. It matters most when missing a positive is costly, such as failing to detect a disease.",
    simple: "Out of all the cases that really were positive, recall is the share the model managed to catch. High recall means it rarely lets a real one slip past.",
    widget: {
      type: "curveStatic", title: "How many real ones caught?",
      world: "Loosening the decision threshold so the model flags more cases, and reading how many true positives it catches.",
      xlab: "threshold loosened →", xs: [0,1,2,3,4], labels: ["strict","firm","balanced","loose","lax"], dec: 0, yunit: "%",
      series: [ { name: "recall (%)", ys: [40, 60, 75, 88, 97] } ],
      knob: { label: "Threshold loosened", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A strict threshold flags only the surest cases, so many real positives are missed — recall is low.", tone: "info" },
        { max: 3, text: "Loosen the bar and the model catches more of the actual positives, pushing recall up.", tone: "info" },
        { max: 4, text: "🤯 Flag almost everything and you catch nearly all real positives. That caught-out-of-actual fraction IS recall.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Recall (sensitivity)", formula: "recall = TP / (TP + FN)",
        text: "Of the real positives, how many the model actually caught." }
    }
  });

  add("metrics1", {
    q: "In classification, what is specificity?",
    choices: [
      "Of the actual negative cases, the fraction the model correctly labels negative — TN / (TN + FP)",
      "Of all the actual positive cases in the data, the fraction the model correctly flags with an alert — TP / (TP + FN)",
      "Of the cases the model flagged positive, the fraction that genuinely turn out to be truly positive when checked",
      "The overall fraction of predictions the model gets correct across both the positive and the negative classes",
      "The average absolute difference between each predicted value and its corresponding true numeric value in the data"
    ],
    explain: "Specificity, also called the true-negative rate, measures how well a classifier identifies the negatives: of all genuinely negative cases, how many it correctly leaves unflagged. It is the mirror image of recall (which focuses on positives) and equals one minus the false-positive rate. High specificity means the model rarely raises a false alarm on a true negative.",
    simple: "Out of all the cases that really were negative, specificity is the share the model correctly left alone. High specificity means it seldom sounds a false alarm.",
    widget: {
      type: "curveStatic", title: "How well are negatives spotted?",
      world: "Tightening the decision threshold so fewer negatives get wrongly flagged, and reading the true-negative rate.",
      xlab: "decision threshold →", xs: [0,1,2,3,4], labels: ["lax","mild","balanced","strict","extreme"], dec: 0, yunit: "%",
      series: [ { name: "specificity (%)", ys: [50, 64, 76, 88, 97] } ],
      knob: { label: "Threshold", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A lax threshold flags lots of true negatives by mistake, so specificity is low.", tone: "info" },
        { max: 3, text: "Raise the bar and more genuine negatives are correctly left unflagged.", tone: "info" },
        { max: 4, text: "🤯 At a strict threshold almost every true negative is spared. That correct-negatives fraction IS specificity.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Specificity", formula: "specificity = TN / (TN + FP) = 1 − false-positive rate",
        text: "Of the real negatives, how many the model correctly left alone." }
    }
  });

  add("metrics1", {
    q: "In classification, what is the false-positive rate?",
    choices: [
      "Of the actual negative cases, the fraction the model wrongly flags as positive — FP / (FP + TN)",
      "Of all the cases flagged positive, the fraction that turn out to be actually negative and thus false alarms",
      "Of all the actual positives in the data, the fraction the model misses and never flags — the miss rate",
      "The overall fraction of predictions the model gets wrong across both the positive and the negative classes",
      "The average squared error between each predicted numeric value and its corresponding true target value in the data"
    ],
    explain: "The false-positive rate is the share of genuinely negative cases that a classifier mistakenly flags as positive: false positives divided by all actual negatives. It equals one minus specificity and forms the x-axis of the ROC curve. A low false-positive rate means the model rarely raises false alarms on true negatives.",
    simple: "Out of all the cases that were really negative, it is the share the model wrongly flagged. It measures how often the model sounds a false alarm.",
    widget: {
      type: "curveStatic", title: "How often a false alarm?",
      world: "Loosening the decision threshold so more cases are flagged, and reading how many true negatives get flagged by mistake.",
      xlab: "threshold loosened →", xs: [0,1,2,3,4], labels: ["strict","firm","balanced","loose","lax"], dec: 0, yunit: "%",
      series: [ { name: "false-positive rate (%)", ys: [3, 12, 25, 45, 70] } ],
      knob: { label: "Threshold loosened", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A strict threshold flags almost nothing, so very few true negatives are wrongly caught — a tiny false-positive rate.", tone: "info" },
        { max: 3, text: "Loosen the bar and more genuine negatives get flagged by mistake, so the rate climbs.", tone: "info" },
        { max: 4, text: "🤯 Flag nearly everything and most true negatives become false alarms. That wrongly-flagged-negatives fraction IS the false-positive rate.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "False-positive rate", formula: "FPR = FP / (FP + TN) = 1 − specificity",
        text: "Of the real negatives, how many the model wrongly flagged." }
    }
  });

  add("metrics1", {
    q: "In classification, what is AUC (area under the ROC curve)?",
    choices: [
      "A single number, the area beneath the ROC curve, summarising how well the model ranks positives above negatives across all thresholds",
      "The fraction of all predictions the classifier gets correct at one single chosen decision threshold, ignoring how it ranks everything else",
      "The harmonic mean of precision and recall as measured at the default probability cutoff, blending those two rates into one balanced figure",
      "The average squared distance between the model's numeric predictions and their true continuous target values taken across the dataset",
      "The total number of positive examples that happen to be present within the particular test set used to evaluate the model here"
    ],
    explain: "AUC condenses the entire ROC curve into one value between 0 and 1: it equals the probability that the model scores a randomly chosen positive higher than a randomly chosen negative. An AUC of 1.0 is a perfect ranker, 0.5 is no better than chance, and it is threshold-independent, which makes it handy for comparing classifiers overall.",
    simple: "It is a single grade for how well the model separates positives from negatives, no matter where you set the cutoff. One is perfect, a half is pure guessing.",
    widget: {
      type: "curveStatic", title: "One grade for ranking",
      world: "As a classifier gets better at ranking positives above negatives, watch the area under its ROC curve grow.",
      xlab: "ranking ability →", xs: [0,1,2,3,4], labels: ["chance","weak","fair","strong","perfect"], dec: 2, yunit: "",
      series: [ { name: "AUC", ys: [0.50, 0.65, 0.78, 0.90, 0.99] } ],
      knob: { label: "Ranking ability", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "An AUC near 0.5 means the model ranks positives and negatives no better than a coin.", tone: "info" },
        { max: 3, text: "As the model learns to score positives higher than negatives, the ROC bows toward the top-left and its area grows.", tone: "info" },
        { max: 4, text: "🤯 An AUC near 1.0 means almost any positive outranks almost any negative. That area under the ROC IS the AUC.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "AUC (ROC)", formula: "AUC = P(score of a random positive > score of a random negative)",
        text: "Threshold-free grade of ranking quality: 1 perfect, 0.5 chance." }
    }
  });

  add("metrics1", {
    q: "In classification, what is a precision-recall curve?",
    choices: [
      "A plot of precision against recall as the decision threshold is varied, showing the trade-off between the two",
      "A plot of the true-positive rate against the false-positive rate measured across the full range of decision thresholds",
      "A table listing the counts of true positives, false positives, true negatives, and false negatives side by side",
      "A curve of the training loss falling steadily as the number of gradient-descent steps increases during fitting",
      "A bar chart showing how many individual examples happen to belong to each class within the dataset being used"
    ],
    explain: "A precision-recall curve traces how precision and recall move against each other as the classification threshold sweeps from strict to lenient. Typically precision is high when recall is low and falls as recall rises, because catching more positives means accepting more false alarms. It is especially informative on imbalanced data, where the ROC curve can look over-optimistic.",
    simple: "It is a curve showing the tug-of-war between precision and recall: as you push to catch more real positives, precision usually drops. It reveals the price of turning one dial up.",
    widget: {
      type: "curveStatic", title: "The precision–recall trade-off",
      world: "Loosening the threshold to raise recall, and watching precision give way as more false alarms slip in.",
      xlab: "recall →", xs: [0,1,2,3,4], labels: ["20%","40%","60%","80%","100%"], dec: 0, yunit: "%",
      series: [ { name: "precision (%)", ys: [98, 92, 80, 62, 35] } ],
      knob: { label: "Recall target", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Aim for only the surest positives (low recall) and almost every flag is right — precision is near perfect.", tone: "info" },
        { max: 3, text: "Push recall higher and precision starts to slip, because catching more positives lets in more false alarms.", tone: "info" },
        { max: 4, text: "🤯 Chase 100% recall and precision collapses. That falling precision as recall rises IS the precision-recall curve.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Precision-recall curve", formula: "y = precision vs x = recall, across all thresholds",
        text: "Shows the trade-off; precision typically falls as recall climbs." }
    }
  });

  add("metrics1", {
    q: "In classification, what is log loss (cross-entropy loss)?",
    choices: [
      "A metric that penalises a probabilistic classifier by the negative log of the probability it assigned to the true class",
      "A metric giving the fraction of predictions the classifier gets exactly correct once its output probabilities are thresholded",
      "A metric equal to the area under the true-positive-rate versus false-positive-rate curve swept across all decision thresholds",
      "A metric equal to the average absolute gap between each predicted numeric value and its corresponding true target value",
      "A metric that simply counts how many of the evaluation examples the classifier assigns to each of the possible classes"
    ],
    explain: "Log loss judges predicted probabilities, not just hard labels: for each example it takes the negative logarithm of the probability the model gave to the correct class and averages these. Confident correct predictions incur almost no penalty, while confident wrong predictions are punished heavily, so log loss rewards well-calibrated probabilities.",
    simple: "It scores how good the model's probabilities are, not just its yes/no calls. Being confident and right barely costs anything; being confident and wrong is punished hard.",
    widget: {
      type: "curveStatic", title: "Punishing confident mistakes",
      world: "Lowering the probability the model assigns to the true class, and watching the log-loss penalty for that example.",
      xlab: "probability given to true class →", xs: [0,1,2,3,4], labels: ["0.99","0.7","0.5","0.2","0.02"], dec: 2, yunit: "",
      series: [ { name: "log loss (per example)", ys: [0.01, 0.36, 0.69, 1.61, 3.91] } ],
      knob: { label: "Confidence in truth", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Assign 0.99 to the correct class and the penalty is almost zero — confident and right is nearly free.", tone: "info" },
        { max: 3, text: "As the probability on the true class drops, the negative-log penalty climbs steadily.", tone: "info" },
        { max: 4, text: "🤯 Give the truth only 0.02 and the penalty explodes. That negative log of the true-class probability IS log loss.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Log loss", formula: "log loss = −average( log(probability assigned to the true class) )",
        text: "Rewards calibrated probabilities; hammers confident errors." }
    }
  });

  add("metrics1", {
    q: "In regression, what is R-squared (the coefficient of determination)?",
    choices: [
      "The fraction of the variance in the target that the model explains, where 1 is perfect and 0 matches just predicting the mean",
      "The average of the squared differences between each predicted value and its actual observed value taken over the whole dataset",
      "The average of the absolute differences between each predicted value and its actual observed value taken over the whole dataset",
      "The fraction of the predictions that happen to fall exactly on the true target value with no error at all when rounded",
      "The area under the curve of the true-positive rate plotted against the false-positive rate across all decision thresholds"
    ],
    explain: "R-squared measures how much of the target's total variation a regression model accounts for, comparing its errors against the errors of a naive model that always predicts the mean. A value of 1 means the model explains all the variance, 0 means it does no better than the mean, and negative values mean it does worse. It gives a scale-free sense of fit.",
    simple: "It says what share of the ups and downs in the target the model manages to explain. One is a perfect fit; zero is no better than always guessing the average.",
    widget: {
      type: "curveStatic", title: "Share of variation explained",
      world: "As a regression model fits the target better, watch the fraction of its variance the model accounts for.",
      xlab: "goodness of fit →", xs: [0,1,2,3,4], labels: ["mean-only","weak","fair","strong","near-perfect"], dec: 2, yunit: "",
      series: [ { name: "R²", ys: [0.00, 0.30, 0.55, 0.82, 0.98] } ],
      knob: { label: "Goodness of fit", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "An R² of 0 means the model does no better than always predicting the average target value.", tone: "info" },
        { max: 3, text: "As the model captures more of the pattern, it explains a larger share of the target's variance.", tone: "info" },
        { max: 4, text: "🤯 An R² near 1 means the model accounts for nearly all the variation. That explained-variance fraction IS R-squared.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "R-squared", formula: "R² = 1 − (model's squared error / mean-model's squared error)",
        text: "Fraction of target variance explained; 1 perfect, 0 mean-level." }
    }
  });

  add("metrics1", {
    q: "In regression, what is mean squared error (MSE)?",
    choices: [
      "The average of the squared differences between predicted and actual values",
      "The average of the absolute differences between the predicted and the actual values taken across the whole dataset",
      "The fraction of the target's total variance that the model manages to explain relative to just predicting the mean",
      "The share of the predictions that happen to exactly match the true target value with no error at all when rounded",
      "The harmonic mean of precision and recall combined together into a single balanced summary score for the model"
    ],
    explain: "Mean squared error averages the squares of the gaps between predictions and truth. Squaring makes all errors positive and penalises large errors far more than small ones, so a few big misses dominate the score. It is a standard regression loss, though its units are the square of the target's units.",
    simple: "Take how far off each prediction is, square it, and average those. Squaring means big misses hurt much more than small ones.",
    widget: {
      type: "curveStatic", title: "Big misses hurt most",
      world: "Growing the size of a prediction's error, and watching the squared penalty MSE assigns to it.",
      xlab: "prediction error size →", xs: [0,1,2,3,4], labels: ["0","1","2","3","4"], dec: 0, yunit: "",
      series: [ { name: "squared error", ys: [0, 1, 4, 9, 16] } ],
      knob: { label: "Error size", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A tiny error contributes almost nothing once it is squared.", tone: "info" },
        { max: 3, text: "Double the error and the penalty quadruples — squaring makes larger misses count far more.", tone: "info" },
        { max: 4, text: "🤯 A big miss dominates the whole average. Averaging those squared gaps IS mean squared error.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Mean squared error", formula: "MSE = average( (prediction − truth)² )",
        text: "Averages squared errors; heavily penalises large misses." }
    }
  });

  add("metrics1", {
    q: "In regression, what is mean absolute error (MAE)?",
    choices: [
      "The average of the absolute differences between predicted and actual values",
      "The average of the squared differences between the predicted and the actual values taken across the whole dataset",
      "The fraction of the target's total variance that the model manages to explain relative to just predicting the mean",
      "The proportion of the predictions that happen to exactly hit the true target value with no error at all when rounded",
      "The area under the ROC curve traced out for a model that ranks its positive cases above the negative ones"
    ],
    explain: "Mean absolute error averages the sizes of the prediction errors, ignoring their sign. Because it does not square the gaps, it treats all errors in proportion to their magnitude and is less sensitive to outliers than mean squared error. It is reported in the same units as the target, which makes it easy to interpret.",
    simple: "Take how far off each prediction is, drop the minus sign, and average those distances. Unlike squaring, one big miss does not blow up the score.",
    widget: {
      type: "curveStatic", title: "Errors counted in proportion",
      world: "Growing the size of a prediction's error, and watching the absolute penalty MAE assigns to it.",
      xlab: "prediction error size →", xs: [0,1,2,3,4], labels: ["0","1","2","3","4"], dec: 0, yunit: "",
      series: [ { name: "absolute error", ys: [0, 1, 2, 3, 4] } ],
      knob: { label: "Error size", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A small error adds a small penalty — nothing dramatic.", tone: "info" },
        { max: 3, text: "The penalty grows in straight-line proportion to the error, not faster.", tone: "info" },
        { max: 4, text: "🤯 Even a big miss adds only its own size, so outliers do not dominate. Averaging those absolute gaps IS mean absolute error.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Mean absolute error", formula: "MAE = average( |prediction − truth| )",
        text: "Averages error magnitudes; robust to outliers, in target units." }
    }
  });

  add("metrics1", {
    q: "In a scikit-learn classification report, what is 'support'?",
    choices: [
      "The number of actual occurrences of each class in the dataset being evaluated",
      "The fraction of the predictions made for a class that ultimately turn out to be correct when checked against the labels",
      "The confidence probability the model attaches to each of the individual predictions that it happens to make",
      "The number of input features that were used by the model in order to make each individual prediction it produces",
      "The average squared error of the model's numeric predictions taken across all of the cases that were evaluated"
    ],
    explain: "Support is simply the count of true instances of each class in the evaluation set. It appears alongside precision, recall, and F1 in a classification report to show how many examples each per-class metric is based on. Small support warns that a class's metrics rest on few examples and may be unreliable.",
    simple: "It is just how many real examples of each class there were. It tells you how much data each score is standing on — a big number means a more trustworthy score.",
    widget: {
      type: "curveStatic", title: "How many examples per class",
      world: "Moving to classes that appear more often in the data, and reading how many true instances each one has.",
      xlab: "class frequency →", xs: [0,1,2,3,4], labels: ["rare","uncommon","typical","common","dominant"], dec: 0, yunit: "",
      series: [ { name: "support (count)", ys: [8, 40, 150, 500, 1800] } ],
      knob: { label: "Class frequency", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A rare class has tiny support — its precision and recall rest on just a handful of cases.", tone: "info" },
        { max: 3, text: "More frequent classes have larger support, so their metrics are computed from more examples.", tone: "info" },
        { max: 4, text: "🤯 A dominant class has huge support and very stable metrics. That count of true instances per class IS support.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Support", formula: "support(class) = number of true examples of that class",
        text: "How many real cases each per-class metric is based on." }
    }
  });

  /* ===================== perf1 (10) ===================== */

  add("perf1", {
    q: "In machine learning, what is a train/validation/test split?",
    choices: [
      "Dividing the data into three parts: one to train on, one to tune choices on, and one held back untouched to estimate final performance",
      "Rotating the entire dataset through many separate equal-sized folds in turn and averaging the validation scores that each of those rotations produces",
      "Splitting each individual feature column into a set of equal-width numeric bins before any of the modelling work begins",
      "Separating one single dataset into its positive cases and its negative cases so that each of the two groups can be studied on its own",
      "Breaking the model's total loss function apart into one distinct bias term and one distinct separate variance term"
    ],
    explain: "The three-way split gives each part a distinct job: the training set fits the model, the validation set guides choices like hyperparameters and model selection, and the test set is opened only once at the end to give an honest estimate of real-world performance. Keeping the test set untouched during development is what prevents optimistic, self-fooling results.",
    simple: "You cut the data into three piles: one to learn from, one to tune settings on, and one you lock away until the very end to see how you truly did.",
    widget: {
      type: "curveStatic", title: "Three sets, three jobs",
      world: "Moving from one pooled dataset toward a clean train/validation/test split, and reading how honest the final estimate is.",
      xlab: "separation of roles →", xs: [0,1,2,3,4], labels: ["all pooled","loose","partial","clean","strict"], dec: 0, yunit: "%",
      series: [ { name: "honesty of final estimate (%)", ys: [45, 60, 74, 88, 95] } ],
      knob: { label: "Separation of roles", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Evaluate on the same data you trained and tuned on and the score is wildly optimistic.", tone: "info" },
        { max: 3, text: "Giving validation and test their own separate roles makes the reported performance far more trustworthy.", tone: "info" },
        { max: 4, text: "🤯 A strictly untouched test set gives the most honest read on real-world performance. That three-way division IS the train/validation/test split.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Train/validation/test split", formula: "train → fit · validation → tune · test → judge once",
        text: "Separate roles keep the final performance estimate honest." }
    }
  });

  add("perf1", {
    q: "In machine learning, what is the generalization gap?",
    choices: [
      "The difference between a model's performance on the training data and its performance on unseen data",
      "The gap in calendar time between finishing the training of a model and actually deploying it into production",
      "The difference between precision and recall as measured at one single chosen decision threshold on the test set",
      "The number of input features that were removed from the data during a dimensionality-reduction step",
      "The straight-line distance measured between the centroids of two separate clusters out in the feature space"
    ],
    explain: "The generalization gap is the shortfall between how well a model does on data it was trained on versus data it has never seen — for instance, training accuracy minus test accuracy. A small gap suggests the model generalises well; a large gap is a hallmark of overfitting. Watching this gap is a core way to diagnose whether a model will hold up in the real world.",
    simple: "It is how much better a model does on its practice data than on fresh data. A big gap is a warning sign that it memorised rather than learned.",
    widget: {
      type: "curveStatic", title: "Practice score vs real score",
      world: "Increasing model complexity and measuring the gap between training accuracy and unseen-data accuracy.",
      xlab: "model complexity →", xs: [0,1,2,3,4], labels: ["simple","mild","balanced","complex","extreme"], dec: 0, yunit: "",
      series: [ { name: "train minus test accuracy (pts)", ys: [2, 4, 8, 18, 32] } ],
      knob: { label: "Model complexity", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A simple model performs almost the same on training and new data — the gap is tiny.", tone: "info" },
        { max: 3, text: "As complexity grows, training accuracy pulls ahead of test accuracy and the gap widens.", tone: "info" },
        { max: 4, text: "🤯 A big gap means the model shines on practice data but stumbles on fresh data. That difference IS the generalization gap.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Generalization gap", formula: "gap = training performance − unseen-data performance",
        text: "A wide gap flags overfitting; a narrow gap means it generalises." }
    }
  });

  add("perf1", {
    q: "In machine learning, what is a learning curve?",
    choices: [
      "A plot of model performance against the amount of training data used, showing how the score improves as data grows",
      "A plot of the true-positive rate against the false-positive rate measured across the full range of decision thresholds",
      "A curve tracing how precision steadily falls as recall is pushed higher by loosening the decision threshold",
      "A table listing the counts of true positives, false positives, true negatives, and false negatives together",
      "The characteristic S-shaped curve that the sigmoid activation function produces as its input sweeps through zero"
    ],
    explain: "A learning curve charts how a model's performance changes as it is given more and more training examples, usually plotting both training and validation scores. It reveals whether adding data would help, and whether the model is limited by high bias (curves plateau low and close together) or high variance (a wide gap between them). It is a key diagnostic for deciding next steps.",
    simple: "It shows how a model's score changes as you feed it more training data. If the curve is still climbing, more data should help; if it has flattened, more data won't.",
    widget: {
      type: "curveStatic", title: "More data, better score",
      world: "Feeding the model steadily more training examples and tracking its validation performance.",
      xlab: "training examples used →", xs: [0,1,2,3,4], labels: ["100","500","2k","10k","50k"], dec: 0, yunit: "%",
      series: [ { name: "validation accuracy (%)", ys: [62, 74, 83, 89, 91] } ],
      knob: { label: "Training examples", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With little data the model performs modestly — there is not much to learn from yet.", tone: "info" },
        { max: 3, text: "As the training set grows, performance rises steadily; the steep slope says more data still helps.", tone: "info" },
        { max: 4, text: "🤯 Eventually the curve flattens — extra data barely moves the score. This performance-versus-data-size plot IS a learning curve.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Learning curve", formula: "y = performance vs x = amount of training data",
        text: "Diagnoses whether more data would help, and bias vs variance." }
    }
  });

  add("perf1", {
    q: "In hyperparameter tuning, what is grid search?",
    choices: [
      "Exhaustively trying every combination from a predefined grid of hyperparameter values and keeping the best-scoring one",
      "Sampling hyperparameter combinations at random from specified ranges for a fixed number of trials and keeping the best one",
      "Adjusting the model's internal weights by repeatedly stepping downhill along the gradient of its loss function",
      "Splitting the data into k separate folds and then averaging the validation scores obtained across all of the folds",
      "Stopping the training process as soon as validation performance stops improving from one epoch to the next one"
    ],
    explain: "Grid search tunes hyperparameters by laying out a discrete grid of candidate values for each and evaluating every possible combination, usually with cross-validation, then selecting the combination that scores best. It is simple and thorough but its cost grows multiplicatively with the number of hyperparameters and values, so it can become expensive quickly.",
    simple: "You list a few values to try for each setting and test every possible combination, then keep the winner. Thorough, but the number of tries multiplies fast.",
    widget: {
      type: "curveStatic", title: "Every combination checked",
      world: "Adding more values per hyperparameter to the grid, and counting how many combinations grid search must evaluate.",
      xlab: "values per hyperparameter →", xs: [0,1,2,3,4], labels: ["1","2","3","4","5"], dec: 0, yunit: "",
      series: [ { name: "combinations tried (3 knobs)", ys: [1, 8, 27, 64, 125] } ],
      knob: { label: "Values per knob", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A single value each means just one model to fit — trivially cheap.", tone: "info" },
        { max: 3, text: "Every added value multiplies the count, because grid search tries all combinations across the knobs.", tone: "info" },
        { max: 4, text: "🤯 With several values across a few knobs the count explodes. Testing that whole grid exhaustively IS grid search.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Grid search", formula: "try every combination in the value grid · keep the best score",
        text: "Exhaustive and simple, but cost multiplies with each knob." }
    }
  });

  add("perf1", {
    q: "In hyperparameter tuning, what is random search?",
    choices: [
      "Sampling hyperparameter combinations at random from specified ranges for a fixed number of trials, keeping the best",
      "Exhaustively evaluating every single possible combination laid out on a predefined grid of hyperparameter values",
      "Combining the predictions of several separately trained models together by taking a simple majority vote among them",
      "Rescaling each feature so that it has zero mean and unit variance before the model is ever trained on the data",
      "Halting the training run once the validation loss stops falling across several successive iterations of training"
    ],
    explain: "Random search picks hyperparameter combinations at random from the specified ranges and evaluates a fixed budget of them. Because it does not waste trials on an exhaustive grid, it often finds good settings faster than grid search, especially when only a few hyperparameters really matter — random sampling covers each important dimension with many distinct values.",
    simple: "Instead of trying every combination, you just try a set number of random ones and keep the best. It often finds a good setting faster, especially when only a couple of knobs matter.",
    widget: {
      type: "curveStatic", title: "Best-so-far as trials grow",
      world: "Spending more random trials from the hyperparameter ranges and tracking the best validation score found so far.",
      xlab: "random trials budget →", xs: [0,1,2,3,4], labels: ["5","15","40","100","250"], dec: 0, yunit: "%",
      series: [ { name: "best score found (%)", ys: [78, 84, 88, 90, 91] } ],
      knob: { label: "Trials budget", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A handful of random draws already lands a decent configuration.", tone: "info" },
        { max: 3, text: "More trials keep improving the best-so-far score, with diminishing returns as good regions get sampled.", tone: "info" },
        { max: 4, text: "🤯 A fixed budget of random draws finds strong settings without checking every combination. That sampling IS random search.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Random search", formula: "sample N random combinations · keep the best-scoring one",
        text: "Cheaper than a full grid; efficient when few knobs matter." }
    }
  });

  add("perf1", {
    q: "In model training, what is early stopping?",
    choices: [
      "Halting training once performance on a validation set stops improving, to prevent overfitting",
      "Ending the training run the very instant the training loss first reaches exactly zero on the training data",
      "Removing any of the input features whose measured importance score happens to fall below a fixed chosen threshold",
      "Splitting the whole dataset into k separate equal-sized folds before any of the model training has begun",
      "Reducing the learning rate all the way down to zero right at the very start of the training run itself"
    ],
    explain: "Early stopping monitors a validation metric during iterative training and stops when that metric ceases to improve (often after a patience window), keeping the model from the point just before it began to overfit. It acts as a form of regularization: training long enough to learn the signal but not so long that it memorises noise.",
    simple: "You watch the score on a held-out set while training and stop the moment it stops getting better. That keeps the model from over-studying the training data.",
    widget: {
      type: "curveStatic", title: "Stop before it turns down",
      world: "Letting training run for more and more epochs, and watching validation performance rise, peak, then fall.",
      xlab: "training epochs →", xs: [0,1,2,3,4], labels: ["5","20","50 (peak)","100","200"], dec: 0, yunit: "%",
      series: [ { name: "validation accuracy (%)", ys: [76, 86, 91, 85, 78] } ],
      knob: { label: "Training epochs", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Early on, more training clearly helps — validation accuracy is still climbing.", tone: "info" },
        { max: 3, text: "Validation performance peaks, then starts to fall as the model begins overfitting the training data.", tone: "info" },
        { max: 4, text: "🤯 Keep going and it only gets worse. Halting right at the peak — before the decline — IS early stopping.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Early stopping", formula: "stop when validation performance stops improving",
        text: "A cheap regulariser: quit before the model overfits." }
    }
  });

  add("perf1", {
    q: "In machine learning, what is an L2 (ridge) penalty?",
    choices: [
      "A regularization term that adds the sum of the squared weights to the loss, shrinking all weights smoothly toward zero",
      "A term that adds the sum of the absolute values of the weights to the loss, driving some of them exactly to zero",
      "A rule that halts the training run just as soon as validation performance plateaus across several successive epochs",
      "The average squared difference between the model's predictions and the corresponding true numeric target values",
      "A method that averages together the predictions coming from many separately and independently trained models"
    ],
    explain: "An L2, or ridge, penalty adds the sum of squared weights (times a strength λ) to the loss function. This shrinks large weights more than small ones and pulls all of them smoothly toward zero without forcing any to vanish, which reduces variance and curbs overfitting. Unlike L1, it keeps every feature but with dampened influence.",
    simple: "It fines the model for having big weights, with the fine growing with the square of each weight. That gently shrinks all the weights and keeps the model from over-relying on any one thing.",
    widget: {
      type: "curveStatic", title: "Shrinking the weights",
      world: "Turning up the L2 penalty strength and watching the typical size of the model's weights shrink.",
      xlab: "L2 penalty strength →", xs: [0,1,2,3,4], labels: ["none","light","moderate","strong","extreme"], dec: 1, yunit: "",
      series: [ { name: "typical weight magnitude", ys: [8.0, 5.2, 3.1, 1.4, 0.4] } ],
      knob: { label: "Penalty strength", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With no penalty the weights are free to grow large and chase training-set quirks.", tone: "info" },
        { max: 3, text: "Raising the L2 strength squeezes the squared weights down, smoothly shrinking all of them toward zero.", tone: "info" },
        { max: 4, text: "🤯 A strong penalty leaves only tiny weights, none quite zero. That squared-weight shrinkage IS the L2 (ridge) penalty.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "L2 (ridge) penalty", formula: "loss + λ · Σ (weight²)",
        text: "Shrinks all weights smoothly toward zero; keeps every feature." }
    }
  });

  add("perf1", {
    q: "In machine learning, what is an L1 (lasso) penalty?",
    choices: [
      "A regularization term that adds the sum of the absolute weights to the loss, driving some weights exactly to zero and selecting features",
      "A term that adds the sum of the squared weights to the loss, shrinking every one of the weights smoothly toward zero but never fully to zero",
      "A rule for stopping the training run whenever the validation loss stops improving over a set patience window of epochs",
      "The average absolute difference between the model's numeric predictions and their corresponding true target values",
      "A method that combines many separate weak models together into one single much stronger overall prediction"
    ],
    explain: "An L1, or lasso, penalty adds the sum of the absolute values of the weights (times λ) to the loss. Its geometry pushes many weights all the way to exactly zero, effectively dropping those features, so L1 performs automatic feature selection and yields sparse models. This contrasts with L2, which shrinks weights but rarely zeroes them.",
    simple: "It fines the model for the total size of its weights, and this particular fine tends to snap unhelpful weights all the way to zero — quietly deleting useless features.",
    widget: {
      type: "curveStatic", title: "Zeroing out features",
      world: "Turning up the L1 penalty strength and counting how many feature weights get driven exactly to zero.",
      xlab: "L1 penalty strength →", xs: [0,1,2,3,4], labels: ["none","light","moderate","strong","extreme"], dec: 0, yunit: "",
      series: [ { name: "weights forced to zero (of 40)", ys: [0, 6, 15, 27, 36] } ],
      knob: { label: "Penalty strength", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With no penalty every feature keeps a nonzero weight — nothing is dropped.", tone: "info" },
        { max: 3, text: "As the L1 strength rises, more and more weights are snapped to exactly zero, removing those features.", tone: "info" },
        { max: 4, text: "🤯 A strong penalty leaves only a handful of features standing. That drive-weights-to-zero effect IS the L1 (lasso) penalty.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "L1 (lasso) penalty", formula: "loss + λ · Σ |weight|",
        text: "Sends weights to exact zero — sparse models and feature selection." }
    }
  });

  /* ===================== skl1 (10) ===================== */

  add("skl1", {
    q: "In scikit-learn, what does an estimator's .fit() method do?",
    choices: [
      "It trains the estimator on the given data, learning parameters from X (and y for supervised models) and storing them on the object",
      "It produces the output predictions for brand-new input data by applying a model that has already been fully trained on data",
      "It applies a previously learned transformation in order to reshape or rescale the incoming feature values before they reach the model",
      "It divides one single dataset into separate training and test portions before any of the model fitting takes place",
      "It computes a single overall score that summarises how well the fitted model performs on the data it is given"
    ],
    explain: "The .fit() method is where learning happens in scikit-learn: you pass it the training data (features X, and target y for supervised estimators) and it estimates the model's parameters, storing them as attributes on the object (conventionally with a trailing underscore). Calling .fit() again starts fresh. Nearly every estimator, from scalers to classifiers, exposes this method.",
    simple: "It is the 'learn from this data' button. You hand it the training examples and it figures out and remembers whatever it needs — coefficients, means, splits — inside the object.",
    widget: {
      type: "curveStatic", title: "Learning from the data",
      world: "Calling .fit() on more and more training rows, and watching how well the fitted model then does.",
      xlab: "training rows given to .fit() →", xs: [0,1,2,3,4], labels: ["50","200","1k","5k","20k"], dec: 0, yunit: "%",
      series: [ { name: "fitted model accuracy (%)", ys: [61, 73, 83, 89, 92] } ],
      knob: { label: "Rows fitted on", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Fit on very few rows and the learned parameters are shaky.", tone: "info" },
        { max: 3, text: "The more data .fit() sees, the better the parameters it estimates and stores on the object.", tone: "info" },
        { max: 4, text: "🤯 With plenty of data the fitted model is strong. That act of learning parameters from data IS .fit().", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: ".fit()", formula: "estimator.fit(X, y) → learns and stores parameters on the object",
        text: "The training step: turn data into learned model parameters." }
    }
  });

  add("skl1", {
    q: "In scikit-learn, what does an estimator's .predict() method do?",
    choices: [
      "It uses an already-fitted model to produce output predictions for new input samples X",
      "It trains the model from scratch by learning its parameters directly from the training data it is provided",
      "It rescales the features so that each one of them has zero mean and unit variance across the dataset",
      "It divides the full dataset into one separate training subset and one separate held-out test subset",
      "It reports the full probability distribution over all of the classes for each individual input sample"
    ],
    explain: "Once an estimator has been trained with .fit(), its .predict() method takes new feature data X and returns the model's predicted outputs — class labels for classifiers, numeric values for regressors, or cluster assignments for clusterers. It does not change the model; it only applies what was already learned to fresh inputs.",
    simple: "It is the 'now answer these' button. After the model has learned, you give it new examples and it hands back its best guesses.",
    widget: {
      type: "curveStatic", title: "Applying what was learned",
      world: "Feeding more new samples into .predict() on a trained model, and counting the predictions returned.",
      xlab: "new samples passed in →", xs: [0,1,2,3,4], labels: ["1","10","100","1k","10k"], dec: 0, yunit: "",
      series: [ { name: "predictions returned", ys: [1, 10, 100, 1000, 10000] } ],
      knob: { label: "Samples in", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Pass one sample and you get one prediction back — the model is just applying itself.", tone: "info" },
        { max: 3, text: "Hand it more samples and it returns exactly one prediction per row, using the already-learned parameters.", tone: "info" },
        { max: 4, text: "🤯 Predicting never retrains the model; it only maps inputs to outputs. That is exactly what .predict() does.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: ".predict()", formula: "fitted_estimator.predict(X) → one output per input row",
        text: "Applies the trained model to new data; does not retrain it." }
    }
  });

  add("skl1", {
    q: "In scikit-learn, what does .fit_transform() do?",
    choices: [
      "It fits a transformer to the data and then applies the learned transformation in a single call, returning the transformed data",
      "It trains a classifier on the given data and then immediately turns around and reports back its accuracy score on that same data",
      "It splits the data into separate training and test sets and then rescales both of them the exact same way afterwards",
      "It predicts the class probabilities for a whole set of input samples and returns them arranged as a matrix",
      "It combines several distinct trained models together into a single ensemble and then averages all of their predictions"
    ],
    explain: "For transformers like scalers or encoders, .fit_transform() is a convenience that first calls .fit() to learn the transformation's parameters from the data (for a StandardScaler, the mean and standard deviation) and then immediately applies .transform() to return the converted data. It is used on the training set; on new data you call only .transform() so the same learned parameters are reused.",
    simple: "It does two steps at once: learn the transformation from the data, then apply it, handing back the transformed data. You use it on the training set.",
    widget: {
      type: "curveStatic", title: "Learn then apply, in one call",
      world: "Sweeping across the two internal stages that .fit_transform() runs back-to-back on the training data.",
      xlab: "internal stage →", xs: [0,1,2,3,4], labels: ["raw","read stats","fit done","apply","transformed"], dec: 0, yunit: "%",
      series: [ { name: "work completed (%)", ys: [0, 25, 50, 75, 100] } ],
      knob: { label: "Internal stage", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "It begins by reading the data's statistics — the 'fit' half of the job.", tone: "info" },
        { max: 3, text: "Once fitting has learned the parameters, it immediately applies the transformation to the same data.", tone: "info" },
        { max: 4, text: "🤯 Both stages finish in one call, returning transformed data. That fit-then-transform combo IS .fit_transform().", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: ".fit_transform()", formula: "fit(X) then transform(X), in a single call → transformed X",
        text: "Learn the transform and apply it at once — used on training data." }
    }
  });

  add("skl1", {
    q: "In scikit-learn, what is a Pipeline?",
    choices: [
      "An object that chains preprocessing steps and a final estimator so the whole sequence fits and predicts as one unit",
      "A method that draws a diagram of the data flowing between the various transformers in a preprocessing workflow",
      "A grid of candidate hyperparameter values that a tuning search will then systematically evaluate one by one",
      "A single one-off division of the available data into one training portion and one separate held-out test portion",
      "A table that cross-tabulates the predicted class labels against the actual class labels for every single sample"
    ],
    explain: "A Pipeline bundles an ordered list of transformers followed by a final estimator into one object. Calling .fit() runs each step's fit and transform in turn, then fits the final estimator; calling .predict() pushes new data through the same steps. This guarantees identical preprocessing at train and prediction time and, crucially, prevents leakage when used inside cross-validation.",
    simple: "It is an assembly line that glues your data-prep steps and your model together into one thing. Fit it once and every step runs in order, the same way on new data.",
    widget: {
      type: "curveStatic", title: "Chaining steps into one",
      world: "Adding preprocessing steps ahead of the model inside a single Pipeline object, tracking how much runs as one unit.",
      xlab: "steps chained →", xs: [0,1,2,3,4], labels: ["model only","+scaler","+encoder","+select","+impute"], dec: 0, yunit: "",
      series: [ { name: "steps run as one unit", ys: [1, 2, 3, 4, 5] } ],
      knob: { label: "Steps chained", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With just the model, a single .fit() call trains one thing.", tone: "info" },
        { max: 3, text: "Chain preprocessing steps ahead of it and one .fit() runs them all in order — no manual bookkeeping.", tone: "info" },
        { max: 4, text: "🤯 The whole chain fits and predicts as a single object, applying identical steps to new data. That chaining IS a Pipeline.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Pipeline", formula: "Pipeline([step1, step2, …, final_estimator]) → fits/predicts as one",
        text: "Chains preprocessing and model; prevents leakage in CV." }
    }
  });

  add("skl1", {
    q: "In scikit-learn, what is StandardScaler?",
    choices: [
      "A transformer that rescales each feature to have zero mean and unit variance, using statistics learned during fit",
      "An estimator that predicts a single continuous numeric target value directly from the given input features",
      "A method that divides the available data into one separate training portion and one separate test portion",
      "A tool that combines several separate trained classifiers together into a single majority-vote ensemble model",
      "A systematic search across a predefined grid of candidate hyperparameter values for the best-scoring setting"
    ],
    explain: "StandardScaler standardises features: during .fit() it learns each column's mean and standard deviation, and during .transform() it subtracts the mean and divides by the standard deviation so every feature ends up centred at zero with unit variance. This puts features on a comparable scale, which helps distance- and gradient-based methods that are sensitive to differing ranges.",
    simple: "It puts every feature on the same footing by centring it at zero and giving it a standard spread of one. That stops a big-numbered column from drowning out small-numbered ones.",
    widget: {
      type: "curveStatic", title: "Putting features on one scale",
      world: "Applying StandardScaler more thoroughly, and watching how close each feature's spread gets to a standard deviation of one.",
      xlab: "standardisation applied →", xs: [0,1,2,3,4], labels: ["raw","start","partway","most","full"], dec: 1, yunit: "",
      series: [ { name: "feature standard deviation", ys: [42.0, 18.0, 6.0, 2.0, 1.0] } ],
      knob: { label: "Standardisation", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Raw features can have wildly different spreads, letting large-scale columns dominate.", tone: "info" },
        { max: 3, text: "Subtracting the mean and dividing by the standard deviation pulls every feature toward a common scale.", tone: "info" },
        { max: 4, text: "🤯 Fully standardised, each feature has zero mean and unit variance. Doing exactly that IS StandardScaler.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "StandardScaler", formula: "z = (x − mean) / standard deviation, per feature",
        text: "Centres features at 0 with unit variance for fair comparison." }
    }
  });

  add("skl1", {
    q: "In scikit-learn, what does train_test_split do?",
    choices: [
      "It randomly divides arrays or datasets into separate training and test subsets in a specified proportion",
      "It trains a model on the data and then evaluates that very same model in a single combined convenience call",
      "It rescales each of the features so that they all end up with zero mean and unit variance across the dataset",
      "It searches across a grid of candidate hyperparameters to find the single best-scoring combination among them",
      "It rotates the whole dataset through k separate folds and then averages the validation scores that it obtains"
    ],
    explain: "train_test_split is a utility that shuffles and partitions your features and target into a training set and a test set according to a chosen fraction (for example 80/20). It keeps X and y aligned, supports a random_state for reproducibility, and can stratify by class to preserve label proportions. It is the standard first step in setting up an honest evaluation.",
    simple: "It randomly cuts your data into a bigger pile to train on and a smaller pile to test on, keeping the features and labels matched up. One line, and your held-out set is ready.",
    widget: {
      type: "curveStatic", title: "Carving out a test set",
      world: "Choosing what fraction of the data train_test_split holds back for testing, and reading the test-set size.",
      xlab: "test fraction chosen →", xs: [0,1,2,3,4], labels: ["10%","20%","30%","40%","50%"], dec: 0, yunit: "%",
      series: [ { name: "share held out for testing (%)", ys: [10, 20, 30, 40, 50] } ],
      knob: { label: "Test fraction", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Hold back a small slice and most data stays for training, but the test estimate is noisier.", tone: "info" },
        { max: 3, text: "The chosen fraction is randomly split off, kept aligned with its labels and untouched during training.", tone: "info" },
        { max: 4, text: "🤯 Whatever fraction you pick becomes the held-out test set. Making that random division IS train_test_split.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "train_test_split", formula: "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=…)",
        text: "Randomly partitions data into aligned train and test sets." }
    }
  });

  add("skl1", {
    q: "In scikit-learn, what is GridSearchCV?",
    choices: [
      "A tool that searches every hyperparameter combination in a grid using cross-validation and refits the best one",
      "A transformer that rescales each feature to have zero mean and unit variance using statistics learned during fit",
      "A utility that divides the data into a single training set and a single held-out test set just one time",
      "A method that returns the predicted probability of each class for every one of the individual input samples",
      "A curve that plots the true-positive rate against the false-positive rate across all of the decision thresholds"
    ],
    explain: "GridSearchCV automates hyperparameter tuning: given an estimator and a grid of parameter values, it evaluates every combination with k-fold cross-validation, records the mean validation score for each, and (by default) refits the best-scoring configuration on all the data. It wraps model selection and cross-validation into a single fit/predict interface, and works cleanly around a Pipeline.",
    simple: "It automatically tries every combination of the settings you list, scoring each with cross-validation, and keeps the best one. Tuning by hand, done for you.",
    widget: {
      type: "curveStatic", title: "Search finds the best score",
      world: "Letting GridSearchCV evaluate more of the hyperparameter grid with cross-validation, tracking the best mean score found.",
      xlab: "grid combinations evaluated →", xs: [0,1,2,3,4], labels: ["2","6","12","24","48"], dec: 0, yunit: "%",
      series: [ { name: "best CV score found (%)", ys: [80, 85, 88, 90, 91] } ],
      knob: { label: "Combinations tried", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Checking only a couple of combinations gives a decent but improvable score.", tone: "info" },
        { max: 3, text: "As it cross-validates more combinations, it uncovers better settings and the best score rises.", tone: "info" },
        { max: 4, text: "🤯 It then refits the single best configuration on all the data. That cross-validated grid search IS GridSearchCV.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "GridSearchCV", formula: "for each param combo: cross-validate → pick best → refit",
        text: "Automated hyperparameter tuning with built-in cross-validation." }
    }
  });

  add("skl1", {
    q: "In scikit-learn, what does cross_val_score do?",
    choices: [
      "It runs cross-validation for an estimator and returns the array of scores, one per fold",
      "It permanently divides the data into one training set and one test set before any of the modelling begins",
      "It rescales all of the features so that each one of them has zero mean and unit variance across the data",
      "It fits a model to the data and then returns the learned coefficients that it estimated from that data",
      "It searches across a grid of candidate hyperparameters looking for the single best-scoring combination"
    ],
    explain: "cross_val_score is a convenience function that takes an estimator, features, and target, splits the data into k folds, trains and scores the estimator on each fold in turn, and returns the array of per-fold scores. Averaging those scores gives a stable estimate of generalisation performance without you managing the splits yourself.",
    simple: "It runs the model through several train/test rotations for you and hands back a score for each. Average them and you get a fair read on how it performs.",
    widget: {
      type: "curveStatic", title: "A score for every fold",
      world: "Increasing the number of folds cross_val_score uses, and counting how many per-fold scores it returns.",
      xlab: "folds requested →", xs: [0,1,2,3,4], labels: ["2","3","5","8","10"], dec: 0, yunit: "",
      series: [ { name: "per-fold scores returned", ys: [2, 3, 5, 8, 10] } ],
      knob: { label: "Folds", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Ask for a couple of folds and you get a couple of scores back.", tone: "info" },
        { max: 3, text: "Each fold trains and tests the estimator once, returning one score — more folds, more scores.", tone: "info" },
        { max: 4, text: "🤯 Averaging that returned array gives a stable performance estimate. Producing those per-fold scores IS cross_val_score.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "cross_val_score", formula: "cross_val_score(estimator, X, y, cv=k) → array of k scores",
        text: "One-line cross-validation returning a score per fold." }
    }
  });

  add("skl1", {
    q: "In scikit-learn, what does a classifier's predict_proba return?",
    choices: [
      "For each sample, the estimated probability of belonging to each class, with the row summing to one",
      "For each input sample it returns a single hard predicted class label rather than any probabilities at all",
      "The overall accuracy of the fitted classifier as measured on the held-out test set once training is done",
      "The learned coefficients of the fitted model, with one weight for each of the input feature columns",
      "The input features ranked in order of their measured importance to the model's individual predictions"
    ],
    explain: "predict_proba gives soft outputs rather than hard labels: for every input sample it returns a vector of class probabilities that sum to one, reflecting the model's confidence in each class. These probabilities let you apply a custom decision threshold, rank samples by likelihood, or compute metrics like log loss and AUC. Not every estimator provides it.",
    simple: "Instead of just saying 'class A', it gives the odds for each class — like 'A: 80%, B: 20%'. That lets you set your own cutoff or measure confidence.",
    widget: {
      type: "curveStatic", title: "Confidence, not just a label",
      world: "Moving across samples the model is increasingly sure are positive, and reading the probability predict_proba assigns.",
      xlab: "model's confidence →", xs: [0,1,2,3,4], labels: ["unsure","leaning","likely","strong","certain"], dec: 2, yunit: "",
      series: [ { name: "P(positive class)", ys: [0.50, 0.68, 0.82, 0.93, 0.99] } ],
      knob: { label: "Model confidence", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A borderline sample gets a probability near 0.5 — the model is genuinely unsure.", tone: "info" },
        { max: 3, text: "For clearer cases the probability climbs toward 1, expressing rising confidence rather than a bare yes/no.", tone: "info" },
        { max: 4, text: "🤯 Each sample's class probabilities always sum to one. Returning those soft probabilities IS predict_proba.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "predict_proba", formula: "predict_proba(X) → per-sample class probabilities (each row sums to 1)",
        text: "Soft confidence scores you can threshold, rank, or score." }
    }
  });

  add("skl1", {
    q: "In scikit-learn, what is the random_state parameter?",
    choices: [
      "A seed for the random number generator that makes operations with randomness reproducible across runs",
      "A hyperparameter that sets how complex the model is allowed to become",
      "The fraction of data reserved for the test set",
      "The number of folds used during cross-validation",
      "The learned probability the model assigns to the positive class"
    ],
    explain: "random_state fixes the seed of the pseudo-random number generator used by operations that involve randomness — shuffling in train_test_split, bootstrap sampling in a random forest, initialisation in k-means, and so on. Setting it to a constant makes those steps deterministic, so re-running the code reproduces exactly the same splits, models, and results, which is essential for debugging and fair comparison.",
    simple: "It is a fixed seed for anything random, so you get the same shuffle or split every time you run the code. Set it and your results become repeatable.",
    widget: {
      type: "curveStatic", title: "Same seed, same result",
      world: "Re-running the same randomised code with random_state held fixed, and checking whether each run reproduces the first.",
      xlab: "repeated runs (fixed seed) →", xs: [0,1,2,3,4], labels: ["run 1","run 2","run 3","run 4","run 5"], dec: 0, yunit: "%",
      series: [ { name: "match with first run (%)", ys: [100, 100, 100, 100, 100] } ],
      knob: { label: "Run number", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "The first run fixes a shuffle and split determined by the seed.", tone: "info" },
        { max: 3, text: "Every later run with the same random_state reproduces that split exactly — 100% identical.", tone: "info" },
        { max: 4, text: "🤯 Without a fixed seed each run would differ; pinning it keeps them all identical. That reproducibility seed IS random_state.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "random_state", formula: "random_state = fixed integer → deterministic, reproducible randomness",
        text: "Seeds the RNG so shuffles, splits, and models repeat exactly." }
    }
  });

  // 12 metrics1, 10 perf1, 10 skl1 = 32 total
}());
