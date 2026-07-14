/* Extra definition questions — appended to existing levels; tagged as definitions. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function add(qk, obj) { (Q[qk] = Q[qk] || []).push(obj); D[obj.q] = 1; }

  add("found1", {
    q: "In machine learning, what is supervised learning?",
    choices: [
      "Learning a mapping from inputs to outputs using examples that are each already labelled with the correct answer",
      "Finding hidden structure inside data that carries no labels at all, such as grouping broadly similar items together",
      "Learning purely by trial and error from the rewards and penalties gathered while acting within an environment",
      "Compressing a wide dataset down to far fewer columns while preserving as much of its variation as is possible",
      "Hand-writing a fixed set of rigid if-then rules and then running each of them quickly over a very large dataset"
    ],
    explain: "Supervised learning trains a model on input-output pairs where every training example carries a known target (the label), so the algorithm can learn the relationship that maps inputs to those targets. Classification (discrete labels) and regression (numeric labels) are its two main forms. Because the correct answers are supplied during training, the model's errors can be measured directly and minimised.",
    simple: "It is like learning with an answer key: you show the computer thousands of questions together with their right answers, and it works out the pattern that connects them. Later it can answer brand-new questions on its own.",
    widget: {
      type: "curveStatic", title: "Learning from labelled answers",
      world: "The same model trained on more and more examples that each come with the correct label attached.",
      xlab: "labelled examples seen →", xs: [0,1,2,3,4], labels: ["10","100","1k","10k","100k"], dec: 0, yunit: "%",
      series: [ { name: "test accuracy (%)", ys: [58, 71, 82, 89, 93] } ],
      knob: { label: "Labelled examples", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A handful of labelled cases barely teaches the mapping — the model guesses little better than chance.", tone: "info" },
        { max: 3, text: "Each labelled example is a worked answer. Feed in more and the model pins down the input→output rule ever more sharply.", tone: "info" },
        { max: 4, text: "🤯 The whole climb rests on one thing: every example arrived WITH its correct answer. That is exactly what makes learning 'supervised'.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Supervised learning", formula: "labelled examples (input, correct output) → learned mapping",
        text: "When every training row carries the right answer, the model can learn to reproduce it on new rows." }
    }
  });

  add("found1", {
    q: "In machine learning, what is unsupervised learning?",
    choices: [
      "Finding structure or patterns in data that has no labels, such as grouping similar points or reducing dimensions",
      "Learning a direct input-to-output mapping from examples that each already carry the one correct target label",
      "Learning a policy purely by collecting rewards and penalties while repeatedly taking actions in an environment",
      "Tuning the configuration settings you fix before training begins so that final validation accuracy is as high as possible",
      "Measuring an already-trained model against a held-back test set to estimate how well it will perform out in the wild"
    ],
    explain: "Unsupervised learning works on data with no target labels; the goal is to uncover hidden structure the data contains on its own. Clustering (grouping similar examples) and dimensionality reduction (compressing many features into a few) are the classic tasks. Because there are no correct answers to compare against, success is judged by how coherent or useful the discovered structure is.",
    simple: "Here nobody hands the computer an answer key. You just pour in raw data and let it find the natural groupings or patterns by itself — like sorting a pile of mixed photos into look-alike stacks without being told the categories.",
    widget: {
      type: "curveStatic", title: "Structure with no answer key",
      world: "An algorithm sifting unlabelled data, allowed to look for progressively more of the structure hiding inside it.",
      xlab: "structure the algorithm may use →", xs: [0,1,2,3,4], labels: ["none","little","some","more","full"], dec: 0, yunit: "",
      series: [ { name: "cluster quality (silhouette ×100)", ys: [5, 28, 47, 61, 68] } ],
      knob: { label: "Structure sought", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Treat every point as unrelated and there is nothing to see — no groups, no pattern.", tone: "info" },
        { max: 3, text: "Let the algorithm compare points and natural clusters emerge, even though no label ever said which group is which.", tone: "info" },
        { max: 4, text: "🤯 All this structure was pulled from data with zero labels. Discovering pattern without answers IS unsupervised learning.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Unsupervised learning", formula: "unlabelled data → discovered structure (clusters, components)",
        text: "No targets are given; the model reveals the patterns the data already holds." }
    }
  });

  add("found1", {
    q: "In machine learning, what is a hyperparameter?",
    choices: [
      "A configuration setting you choose before training that controls the learning process, rather than being learned from data",
      "A weight living inside the model whose value the training algorithm keeps adjusting automatically to slowly fit the data closely",
      "A single column of the raw input data describing exactly one measurable numeric property belonging to each individual example",
      "The final accuracy score that a fully trained model happens to achieve when it is checked on the held-out test set",
      "A single row of the dataset representing one recorded example that the model actually learns its pattern from"
    ],
    explain: "A hyperparameter is a knob set before training begins — things like the learning rate, the number of trees, k in k-nearest-neighbours, or a regularisation strength. Unlike ordinary parameters (the weights) which the algorithm learns from the data, hyperparameters are chosen by you and govern HOW the learning happens. They are usually tuned by trying several values and keeping whichever gives the best validation performance.",
    simple: "Think of the dials on an oven you set before baking — temperature, timer. You pick them up front; they shape the result but the cake itself is what actually comes out. Hyperparameters are those pre-set dials for a learning algorithm.",
    widget: {
      type: "curveStatic", title: "A dial set before training",
      world: "Sweeping one hyperparameter (say, model complexity) across values you fix in advance, then training each time.",
      xlab: "hyperparameter value →", xs: [0,1,2,3,4], labels: ["tiny","low","mid","high","huge"], dec: 0, yunit: "%",
      series: [ { name: "validation accuracy (%)", ys: [70, 82, 88, 83, 74] } ],
      knob: { label: "Hyperparameter value", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Set the dial too low and the model underfits — it never had the capacity to learn much.", tone: "info" },
        { max: 3, text: "There is a sweet spot in the middle. You did not learn this value from the data; you chose it before training.", tone: "info" },
        { max: 4, text: "🤯 Crank it too far and performance falls again. This whole curve is swept by hand — that is what makes the setting a hyperparameter.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Hyperparameter", formula: "chosen before training · controls learning · not learned from data",
        text: "You tune hyperparameters; the algorithm learns the parameters." }
    }
  });

  add("found1", {
    q: "In machine learning, what is a loss function?",
    choices: [
      "A function that measures how far a model's predictions are from the true targets, giving one number to minimise",
      "The procedure that repeatedly nudges the model's weights a little downhill until the error finally stops falling",
      "A configuration setting fixed before training begins that controls how the learning algorithm actually behaves",
      "The fraction of held-out test predictions that a fully trained classifier happens to get exactly correct",
      "A table cross-tabulating a classifier's predicted class labels against the true actual classes cell by cell"
    ],
    explain: "A loss function quantifies the mismatch between predictions and the true answers, collapsing the model's total error into a single number that training tries to make as small as possible. Common choices include mean squared error for regression and cross-entropy for classification. The learning algorithm reads this number (and its gradient) to decide how to adjust the model.",
    simple: "It is the model's scorecard for being wrong: the bigger the number, the worse the predictions. Training is just the effort to push that score as low as it will go.",
    widget: {
      type: "curveStatic", title: "How wrong is the model?",
      world: "Predictions drifting further from the true target, watched through the number the loss function reports.",
      xlab: "prediction error size →", xs: [0,1,2,3,4], labels: ["spot on","close","off","far","way off"], dec: 0, yunit: "",
      series: [ { name: "loss (squared error)", ys: [0, 10, 40, 90, 160] } ],
      knob: { label: "Prediction error", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Predictions land on the target: the loss is essentially zero — nothing to punish.", tone: "info" },
        { max: 3, text: "As predictions drift, the loss climbs. This single rising number is what training reads to know it is doing badly.", tone: "info" },
        { max: 4, text: "🤯 Way-off predictions get an enormous loss. Minimising exactly this number is the entire aim of training — that IS the loss function.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Loss function", formula: "loss = penalty for the gap between prediction and truth (minimise it)",
        text: "One number scoring how wrong the model is; learning drives it down." }
    }
  });

  add("found1", {
    q: "In machine learning, what is gradient descent?",
    choices: [
      "An iterative optimisation method that repeatedly adjusts the weights in the direction that lowers the loss the fastest",
      "A scoring function that measures how far the model's current predictions sit from the true target values",
      "A fixed rule for splitting a dataset into separate training and test portions before any learning starts",
      "A penalty term added onto the loss so that the model keeps all of its weights small and thereby avoids overfitting badly",
      "A way to combine several deliberately weak models together into one much stronger prediction by simply averaging their votes"
    ],
    explain: "Gradient descent minimises the loss by computing its gradient — the direction of steepest increase — and stepping the weights the opposite way, then repeating. The step size is set by the learning rate. Over many iterations the loss falls toward a minimum, which is how most modern models, from logistic regression to neural networks, are actually trained.",
    simple: "Imagine standing on a foggy hillside and wanting the lowest point: you feel which way is downhill and take a step, then repeat. Gradient descent does that on the model's error surface until it reaches the bottom.",
    widget: {
      type: "curveStatic", title: "Walking downhill on the error",
      world: "Each step of gradient descent nudges the weights downhill; watch the loss fall iteration by iteration.",
      xlab: "training steps →", xs: [0,1,2,3,4], labels: ["start","step 5","step 20","step 50","step 100"], dec: 0, yunit: "",
      series: [ { name: "loss", ys: [100, 55, 30, 16, 9] } ],
      knob: { label: "Steps taken", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "At the start the loss is high — the weights are basically random.", tone: "info" },
        { max: 3, text: "Each step moves the weights opposite the gradient, so the loss keeps dropping. That downhill step is the whole idea.", tone: "info" },
        { max: 4, text: "🤯 After many steps the loss flattens near a minimum. Repeatedly stepping down the gradient of the loss IS gradient descent.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Gradient descent", formula: "weights ← weights − learning_rate × gradient(loss)",
        text: "Follow the loss's slope downhill, step after step, to fit the model." }
    }
  });

  add("logreg1", {
    q: "In machine learning, what is the sigmoid (logistic) function?",
    choices: [
      "A function that squashes any real number into a value between 0 and 1, giving an S-shaped curve, via 1/(1+e^-z)",
      "A function that turns a whole vector of scores into a probability distribution that sums to one across many classes",
      "A penalty term added to the loss that shrinks large weights and thereby helps to curb overfitting on new data",
      "The perfectly straight boundary that a linear classifier draws to separate two classes within a feature space",
      "The total number of times that a training algorithm passes over the entire dataset from start to finish"
    ],
    explain: "The sigmoid function, 1/(1+e^-z), maps the whole real line onto the open interval (0,1) with a smooth S shape. In logistic regression it converts the model's raw weighted score z into a probability of the positive class. Its output is near 0 for very negative inputs, near 1 for very positive inputs, and exactly 0.5 at z = 0.",
    simple: "It takes any number — huge, tiny, negative — and gently squeezes it into the 0-to-1 range so it can be read as a probability. Big positive inputs come out near 1, big negative near 0, and zero lands right in the middle at 0.5.",
    widget: {
      type: "curveStatic", title: "Squashing a score into 0–1",
      world: "Sliding the raw input score z from very negative to very positive and reading the sigmoid's output.",
      xlab: "input score z →", xs: [0,1,2,3,4], labels: ["-4","-2","0","+2","+4"], dec: 0, yunit: "%",
      series: [ { name: "sigmoid output (probability %)", ys: [2, 12, 50, 88, 98] } ],
      knob: { label: "Input score z", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A very negative score is squashed to almost 0 — the positive class is deemed nearly impossible.", tone: "info" },
        { max: 3, text: "Right at z = 0 the output is exactly 0.5, the point of maximum uncertainty. The curve rises smoothly through it.", tone: "info" },
        { max: 4, text: "🤯 A large positive score saturates near 1 but never quite reaches it. That bounded S-shape is exactly the sigmoid.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Sigmoid function", formula: "σ(z) = 1 / (1 + e^-z), output ∈ (0, 1)",
        text: "Turns any real score into a probability between 0 and 1." }
    }
  });

  add("metrics1", {
    q: "In machine learning, what is a confusion matrix?",
    choices: [
      "A table cross-tabulating predicted classes against actual classes, showing counts of true and false positives and negatives",
      "A curve plotting the true-positive rate against the false-positive rate measured across every possible decision threshold value",
      "The single overall fraction of all of the predictions that a given classifier happens to get exactly correct out of the total",
      "A penalty term added to the loss function during training to discourage the model from becoming overly complex",
      "A ranked list of all the input features ordered by how strongly each individual one influences the prediction"
    ],
    explain: "A confusion matrix lays out, for a classifier, how many examples of each actual class were predicted as each class. For binary problems it has four cells: true positives, false positives, false negatives, and true negatives. Nearly every classification metric — precision, recall, accuracy, F1 — is computed directly from these counts.",
    simple: "It is a scorecard grid that says exactly which kinds of mistakes a classifier made: how often it cried wolf, how often it missed a real wolf, and how often it got things right. The diagonal is correct calls; everything off it is an error.",
    widget: {
      type: "curveStatic", title: "Where the mistakes live",
      world: "As a classifier improves, watch the off-diagonal cells of its confusion matrix — the misclassified counts — shrink.",
      xlab: "classifier quality →", xs: [0,1,2,3,4], labels: ["poor","weak","ok","good","great"], dec: 0, yunit: "",
      series: [ { name: "off-diagonal errors (count)", ys: [180, 120, 70, 32, 10] } ],
      knob: { label: "Classifier quality", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A poor classifier scatters many counts off the diagonal — lots of false positives and false negatives.", tone: "info" },
        { max: 3, text: "As it improves, more examples land on the correct diagonal and the error cells thin out.", tone: "info" },
        { max: 4, text: "🤯 A great classifier concentrates counts on the diagonal, leaving the error cells nearly empty. Reading those four cells IS the confusion matrix.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Confusion matrix", formula: "rows = actual class · columns = predicted class · cells = counts (TP, FP, FN, TN)",
        text: "The count table every classification metric is computed from." }
    }
  });

  add("metrics1", {
    q: "In machine learning, what is the F1 score?",
    choices: [
      "The harmonic mean of precision and recall, giving a single balanced score that is high only when both are high",
      "The plain fraction of all predictions that the classifier gets correct out of the total number of predictions made",
      "The whole area sitting under the curve of the true-positive rate plotted against the false-positive rate over thresholds",
      "The number of correct positive predictions divided by the total number of genuinely actual positive cases",
      "The average squared difference between each predicted numeric value and its true actual numeric value"
    ],
    explain: "The F1 score combines precision and recall into one number using their harmonic mean: 2·(precision·recall)/(precision+recall). Because the harmonic mean is dragged down by the smaller of the two, F1 is high only when precision and recall are both high. It is especially useful on imbalanced data where plain accuracy can be misleading.",
    simple: "It is a single fairness score that rewards a model only if it is good at BOTH catching the real positives and not raising false alarms. Ace one but flunk the other and F1 stays low.",
    widget: {
      type: "curveStatic", title: "One score for both",
      world: "Sweeping a classifier's decision threshold from lenient to strict and reading the F1 blend of precision and recall.",
      xlab: "decision threshold →", xs: [0,1,2,3,4], labels: ["lax","mild","balanced","strict","extreme"], dec: 0, yunit: "%",
      series: [ { name: "F1 score (%)", ys: [45, 66, 80, 68, 42] } ],
      knob: { label: "Threshold", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Too lax: recall is high but precision is poor, so their harmonic mean — F1 — stays modest.", tone: "info" },
        { max: 3, text: "F1 peaks where precision and recall are well balanced. It refuses to reward lopsided models.", tone: "info" },
        { max: 4, text: "🤯 Too strict and precision soars while recall collapses — F1 falls again. Only balance keeps it high, because it is their harmonic mean.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "F1 score", formula: "F1 = 2 · (precision · recall) / (precision + recall)",
        text: "A balanced single metric, high only when precision and recall are both high." }
    }
  });

  add("metrics1", {
    q: "In machine learning, what is an ROC curve?",
    choices: [
      "A plot of the true-positive rate against the false-positive rate as the decision threshold is varied across its range",
      "A square table listing the raw counts of true positives, false positives, false negatives, and true negatives",
      "A curve showing the training loss steadily falling as the total number of gradient-descent steps increases",
      "The harmonic mean of precision and recall summarised together as one single balanced number between zero and one",
      "A plot of overall model error against model complexity showing where underfitting gives way to overfitting"
    ],
    explain: "The ROC (Receiver Operating Characteristic) curve traces a classifier's true-positive rate versus its false-positive rate as the decision threshold sweeps from strict to lenient. Each threshold gives one point; connecting them shows the whole trade-off between catching positives and raising false alarms. The area under it (AUC) summarises overall ranking quality, with 1.0 perfect and 0.5 no better than chance.",
    simple: "It is a curve that shows, for every possible strictness setting, how many real positives you catch versus how many false alarms you set off. A curve hugging the top-left corner means a great classifier.",
    widget: {
      type: "curveStatic", title: "Catches vs false alarms",
      world: "Loosening the decision threshold so more cases are flagged, tracing the true-positive rate against the false-positive rate.",
      xlab: "false-positive rate →", xs: [0,1,2,3,4], labels: ["0%","10%","30%","60%","100%"], dec: 0, yunit: "%",
      series: [ { name: "true-positive rate (%)", ys: [0, 55, 78, 92, 100] } ],
      knob: { label: "Threshold loosened", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A very strict threshold flags almost nothing: few false alarms, but also few catches — bottom-left corner.", tone: "info" },
        { max: 3, text: "Loosen the threshold and you catch far more positives, at the cost of some false alarms. The curve bows toward the top-left.", tone: "info" },
        { max: 4, text: "🤯 Flag everything and you catch all positives but every negative is a false alarm — top-right. Sweeping the threshold traces the whole ROC curve.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "ROC curve", formula: "y = true-positive rate vs x = false-positive rate, across all thresholds",
        text: "Shows the full catch-vs-false-alarm trade-off; AUC summarises it in one number." }
    }
  });

  add("perf1", {
    q: "In machine learning, what is the bias-variance tradeoff?",
    choices: [
      "The tension whereby simpler models risk high bias (underfitting) and complex ones risk high variance (overfitting), with total error lowest in between",
      "The mistaken rule that a model's training error must always exactly equal its own test error once enough training data has finally been collected",
      "The forced choice between optimising precision at the direct expense of recall whenever you set a single fixed decision threshold on a classifier",
      "The engineering balance between how fast a model can be trained and how much memory it ends up consuming at prediction time in production",
      "The conceptual difference between a general learning algorithm and the one specific fitted model that it happens to produce from a training dataset"
    ],
    explain: "A model's expected error decomposes into bias (error from overly simple assumptions that underfit) and variance (error from sensitivity to the particular training sample, which overfits), plus irreducible noise. Reducing one tends to raise the other: increasing complexity cuts bias but inflates variance. The best generalisation comes from the complexity that minimises their sum.",
    simple: "Too simple a model misses the real pattern (high bias); too complex a model chases every wiggle in the training data and fails on new data (high variance). The trick is finding the middle ground where total error is smallest.",
    widget: {
      type: "curveStatic", title: "The U-shaped total error",
      world: "Dialing model complexity from too simple to too flexible, watching the total generalisation error.",
      xlab: "model complexity →", xs: [0,1,2,3,4], labels: ["very simple","simple","balanced","complex","very complex"], dec: 0, yunit: "%",
      series: [ { name: "total test error (%)", ys: [70, 45, 32, 44, 68] } ],
      knob: { label: "Model complexity", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A very simple model underfits: high bias, high error. It cannot capture the pattern.", tone: "info" },
        { max: 3, text: "Add complexity and bias falls, error drops — until variance starts creeping in. The sweet spot sits in the middle.", tone: "info" },
        { max: 4, text: "🤯 Too complex and the model overfits: variance explodes and error climbs again. That U-shape IS the bias-variance tradeoff.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Bias-variance tradeoff", formula: "error ≈ bias² + variance + noise (balance the first two)",
        text: "Pick the complexity that minimises the sum, not either part alone." }
    }
  });

  add("perf1", {
    q: "In machine learning, what is cross-validation?",
    choices: [
      "A resampling method that rotates the data through several train/test splits and averages the scores to estimate performance reliably",
      "A penalty term added directly to the loss function that shrinks large weights in order to prevent the model overfitting",
      "The single fixed split of the data into exactly one training set and one held-out test set that is used just the once",
      "The iterative procedure of repeatedly stepping the model weights downhill along the computed gradient of the loss surface",
      "A square table cross-tabulating a classifier's predicted class labels against the genuinely true labels cell by cell"
    ],
    explain: "Cross-validation estimates how well a model generalises by splitting the data into k folds, training on k−1 of them and testing on the remaining one, then rotating so every fold serves as the test set once. Averaging the k scores gives a more stable, less luck-dependent estimate than a single train/test split, and it uses all the data for both roles.",
    simple: "Instead of trusting one lucky train/test split, you slice the data into several parts and take turns holding each part out for testing. Averaging the results gives a much fairer sense of how the model really performs.",
    widget: {
      type: "curveStatic", title: "More folds, steadier estimate",
      world: "Increasing the number of folds k, so each split's luck averages out and the performance estimate settles.",
      xlab: "number of folds k →", xs: [0,1,2,3,4], labels: ["1 (single split)","2","5","10","20"], dec: 0, yunit: "%",
      series: [ { name: "estimate reliability (%)", ys: [58, 72, 84, 90, 92] } ],
      knob: { label: "Folds k", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A single train/test split is at the mercy of which rows happened to fall where — a shaky estimate.", tone: "info" },
        { max: 3, text: "Rotating through more folds averages out that luck, so the estimate of true performance grows more trustworthy.", tone: "info" },
        { max: 4, text: "🤯 With many folds every row is tested exactly once and the scores are averaged. That rotation IS cross-validation.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Cross-validation", formula: "split into k folds · train on k−1, test on 1 · rotate · average the scores",
        text: "A reliable, data-efficient estimate of how a model will generalise." }
    }
  });

  add("perf1", {
    q: "In machine learning, what is regularization?",
    choices: [
      "Adding a penalty on model complexity (such as the size of the weights) to the loss so the model generalises better and overfits less",
      "Rescaling every input feature so that it has zero mean and unit variance across the data before any training begins",
      "Rotating the whole dataset through several different train/test splits and then averaging all of the resulting scores",
      "Combining the separate predictions of many independently trained models into one single aggregated overall prediction",
      "Converting a single categorical column into several distinct 0/1 indicator columns, using exactly one column per category"
    ],
    explain: "Regularization discourages a model from becoming too complex by adding a penalty term to the loss — commonly the sum of squared weights (L2/ridge) or absolute weights (L1/lasso). This shrinks the weights toward zero, trading a little extra training error for better performance on unseen data. It is one of the main tools for combating overfitting.",
    simple: "It is a leash on the model: you fine it for getting too complicated, which stops it from memorising quirks in the training data. A slightly humbler model usually does better on new data.",
    widget: {
      type: "curveStatic", title: "Penalising complexity",
      world: "Turning up the regularization strength, which penalises large weights, and watching error on unseen data.",
      xlab: "regularization strength →", xs: [0,1,2,3,4], labels: ["none","light","moderate","strong","extreme"], dec: 0, yunit: "%",
      series: [ { name: "test error (%)", ys: [60, 42, 33, 41, 58] } ],
      knob: { label: "Penalty strength", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With no penalty the model overfits — it memorises training quirks and stumbles on new data.", tone: "info" },
        { max: 3, text: "A moderate penalty shrinks the weights, curbing overfitting and lowering test error to its best point.", tone: "info" },
        { max: 4, text: "🤯 Too strong a penalty over-shrinks the weights and the model underfits, so error rises again. That complexity penalty IS regularization.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Regularization", formula: "minimise: loss + λ · (penalty on weight size)",
        text: "Trade a little training fit for a lot less overfitting." }
    }
  });

  add("kmeans1", {
    q: "In k-means clustering, what is inertia?",
    choices: [
      "The total sum of squared distances from each point to the centroid of the cluster it was assigned to",
      "The number of clusters k that you yourself must choose up front before the k-means algorithm even runs",
      "The average straight-line distance measured between the separate centroids of the different clusters",
      "The total count of data points that end up left unassigned to any cluster after the algorithm converges",
      "The number of full iterations that the algorithm takes before all of its centroids finally stop moving"
    ],
    explain: "Inertia (also called within-cluster sum of squares) measures how tightly k-means clusters are packed: for every point it takes the squared distance to its cluster's centroid and adds them all up. Lower inertia means tighter, more compact clusters. It always decreases as k grows, which is why the 'elbow' in the inertia-versus-k plot is used to pick a sensible k rather than the minimum.",
    simple: "It is a tightness score for the clusters: add up how far each point sits from its group's centre. Small inertia means the groups are nice and compact; large means they are loose and spread out.",
    widget: {
      type: "curveStatic", title: "Tighter clusters, lower inertia",
      world: "Raising the number of clusters k and measuring the total squared distance of points to their centroids.",
      xlab: "number of clusters k →", xs: [0,1,2,3,4], labels: ["1","2","3","4","5"], dec: 0, yunit: "",
      series: [ { name: "inertia (within-cluster SS)", ys: [100, 55, 30, 20, 15] } ],
      knob: { label: "Clusters k", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With one big cluster, points are far from the single centroid — inertia is at its highest.", tone: "info" },
        { max: 3, text: "Add clusters and each point sits closer to a nearer centroid, so the summed squared distances drop sharply.", tone: "info" },
        { max: 4, text: "🤯 Past the 'elbow' the gains shrink — extra clusters barely tighten things. That total squared distance to centroids IS inertia.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Inertia (k-means)", formula: "inertia = Σ ‖point − its centroid‖²",
        text: "Lower means tighter clusters; the elbow in its curve helps pick k." }
    }
  });

  add("pca1", {
    q: "In PCA, what does 'variance explained' mean?",
    choices: [
      "The fraction of the data's total variance that a principal component (or set of them) captures",
      "The total number of original input features that were dropped from the dataset before the analysis began",
      "The straight-line distance between two given data points measured along the very first principal axis",
      "The penalty term added onto the loss that keeps each of the principal component weights suitably small",
      "The overall proportion of examples that PCA directly assigns to the one correct class label each time"
    ],
    explain: "Each principal component captures some share of the total variance in the data, and 'variance explained' is that share, usually written as a percentage. Components are ordered so the first explains the most, the second the next most, and so on. Summing the explained variance of the components you keep tells you how much of the original information you have retained after reducing dimensions.",
    simple: "It is how much of the data's spread each new direction accounts for. Keep the top few directions and add up their shares to see what percentage of the whole picture you have kept while throwing away the rest.",
    widget: {
      type: "curveStatic", title: "How much spread you keep",
      world: "Adding principal components one at a time and accumulating the share of total variance they explain.",
      xlab: "principal components kept →", xs: [0,1,2,3,4], labels: ["1","2","3","4","5"], dec: 0, yunit: "%",
      series: [ { name: "cumulative variance explained (%)", ys: [45, 68, 82, 93, 100] } ],
      knob: { label: "Components kept", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "The first component alone captures the biggest single chunk of the data's spread.", tone: "info" },
        { max: 3, text: "Each added component explains a bit more, and the cumulative curve climbs toward 100%.", tone: "info" },
        { max: 4, text: "🤯 Keep enough components and you recover essentially all the variance. That captured share IS 'variance explained'.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Variance explained (PCA)", formula: "explained variance ratio = component's variance / total variance",
        text: "Sum it over kept components to see how much information you retained." }
    }
  });

}());
