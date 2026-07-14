/* Study notes — Foundations, k-Nearest Neighbours, Logistic Regression.
   Read-through revision, tiny chunks, in order. Grounded in the DataSense app. */
(function () {
  window.NOTES = window.NOTES || {};

  window.NOTES["found"] = {
    key: "found", name: "Machine Learning Foundations",
    intro: "The base every other topic builds on: what a model is, how it learns from data, and how to judge whether it actually works.",
    groups: [
      { h: "What machine learning is", items: [
        { t: "Learning rules from examples", d: "In traditional software a human writes every rule by hand. In ML you supply solved examples and the procedure discovers the rules itself." },
        { t: "When to reach for it", d: "Use ML only when the rules are too complex or too fuzzy to write out — spotting spam, recognising faces. If you can state the rules, just state them." },
        { t: "Algorithm vs model", d: "The algorithm is the recipe (decision tree, gradient descent); the model is the cake it bakes from your data.", f: "algorithm + data → model" },
        { t: "Not memorising", d: "A good model extracts a general pattern it can apply to brand-new inputs, rather than storing and looking up past cases." }
      ] },
      { h: "The raw material: data", items: [
        { t: "Dataset", d: "An organised record of the past, shaped as a table.", f: "rows = past cases · columns = facts recorded" },
        { t: "Example (row)", d: "One complete case — one email, one house sale, one patient visit — with all its facts on a single line. Models learn by seeing many." },
        { t: "Feature", d: "An input column: a fact you will KNOW at prediction time (square footage, word count, age). The model's raw material." },
        { t: "Label", d: "The answer column: the thing you want predicted. Known for past rows, unknown for new ones.", f: "in code: X = features · y = label" },
        { t: "Supervised vs unsupervised", d: "Labels present means supervised learning; labels absent means unsupervised (finding structure, not predicting an answer)." }
      ] },
      { h: "How a model learns", items: [
        { t: "Model", d: "A learned function: features go in, a prediction comes out. Nothing more mystical than a recipe fitted to data." },
        { t: "Training", d: "Adjust the model's internal numbers to shrink its error on the examples shown.", f: "measure loss → nudge downhill → repeat" },
        { t: "Parameters vs hyperparameters", d: "Parameters are learned by fit(); hyperparameters (like tree depth) are set before fit() and tuned on validation data." },
        { t: "Prediction", d: "Run a NEW row — features only, no label — through the trained model to get its best guess at the missing label." }
      ] },
      { h: "The one goal: generalisation", items: [
        { t: "Generalise, don't memorise", d: "The value of a model is its performance on inputs it has never seen. Memorising the past is easy and worthless." },
        { t: "Train/test split", d: "Split BEFORE training, fit on the train part, and report scores only on the never-touched test part.", f: "split → fit on train → test once" },
        { t: "Underfitting vs overfitting", d: "Too rigid and both scores are poor (underfit); too flexible and train score climbs while held-out score falls (overfit)." },
        { t: "Bias–variance trade-off", d: "Total error splits into bias (too simple), variance (too twitchy) and noise you can't remove.", f: "error ≈ bias² + variance + noise" }
      ] },
      { h: "Judging a model honestly", items: [
        { t: "Accuracy hides mistakes", d: "One accuracy number crushes two very different errors together, so a '95% accurate' filter can still bin your real emails." },
        { t: "Precision and recall", d: "Two error-specific scores: precision is how many of your flagged cases were actually right; recall is how many of the real cases you managed to catch. F1 blends them.", f: "precision = correct/all flags · recall = caught/all real" },
        { t: "Baselines", d: "A score means nothing alone. A model's worth is how far it beats the best dumb rule (majority class, last value).", f: "value = score − baseline score" },
        { t: "Classification vs regression", d: "Predicting a finite category is classification; predicting a continuous quantity is regression." }
      ] },
      { h: "Watch out for", items: [
        { t: "Data leakage", d: "Split first, fit all preprocessing on train only. Sneaking test info into training gives a rosy score that collapses in production." },
        { t: "Correlation vs causation", d: "Models learn P(y|x) — what tends to co-occur — not the effect of CHANGING x. Don't read a weight as a lever to pull." },
        { t: "Class imbalance", d: "When one class vastly outnumbers the other (say 1% fraud, 99% normal). Reweight or resample and evaluate on the minority, since plain accuracy rewards ignoring it." },
        { t: "Distribution shift", d: "When live data no longer matches the distribution the model trained on, so its accuracy silently decays. Monitor inputs and live metrics, then retrain on alert or schedule." }
      ] }
    ]
  };

  window.NOTES["knn"] = {
    key: "knn", name: "k-Nearest Neighbours",
    intro: "Classify a new case by looking at the training points closest to it and letting them vote — no training-time model, just similarity.",
    groups: [
      { h: "The idea", items: [
        { t: "Similar things are near", d: "Plot every example as a point, one axis per feature. Things alike in their features land close together." },
        { t: "Feature space", d: "The n-dimensional space where each axis is one feature and every example is a single point. k-NN reasons about it purely geometrically — by distances between points." },
        { t: "Ask the neighbours", d: "To label a new point, find the training points closest to it — their labels are evidence about its label." },
        { t: "Lazy learning", d: "kNN does no work at training time; it just stores the data. All the effort is at prediction time, searching for neighbours." }
      ] },
      { h: "How a prediction is made", items: [
        { t: "Measure distance", d: "Compute how far the new point is from each training point. Small distance means similar example.", f: "small distance = more alike" },
        { t: "Pick the k nearest", d: "Keep the k training points with the smallest distances; these are the neighbours that get a say." },
        { t: "Majority vote", d: "For classification, the k neighbours each vote their own label and the most common label wins." },
        { t: "Regression variant", d: "For a numeric target, average the neighbours' values instead of voting on a class." }
      ] },
      { h: "Measuring distance", items: [
        { t: "Euclidean distance", d: "Straight-line 'as the crow flies' distance: square the gap on each axis, sum them, take the root. It's Pythagoras on the features.", f: "d = √Σ(aᵢ − bᵢ)²" },
        { t: "Manhattan distance", d: "Add the absolute gaps along each axis instead of the straight-line root — city-block steps along a grid.", f: "d = Σ |aᵢ − bᵢ|" },
        { t: "Choosing a metric", d: "Picking Euclidean vs Manhattan is choosing how you define 'similar'. Both run on the same (scaled) features; it's a hyperparameter — try both and validate." },
        { t: "When to pick Euclidean", d: "The default: low-dimensional, continuous features on a comparable scale, where straight-line closeness means similar." },
        { t: "When to pick Manhattan", d: "Prefer it in high dimensions (distances concentrate less than Euclidean) and when one axis has big gaps/outliers — L1 adds the gap, L2 squares it." },
        { t: "Weighted voting", d: "Let closer neighbours count more, e.g. weight each vote by 1/distance, so a very near point outweighs a distant one." }
      ] },
      { h: "The knob: k", items: [
        { t: "k is a hyperparameter", d: "You choose k before running; kNN never learns it. k=1 asks only the single closest point, k=15 polls a committee." },
        { t: "Small k", d: "A tiny neighbourhood follows the data closely but is jumpy: one mislabeled point acts like a loud, wrong voter." },
        { t: "Large k", d: "A big neighbourhood smooths the prediction but blurs fine detail, eventually just echoing the majority class." },
        { t: "Tuning k", d: "Sweep k on validation data and keep the value that generalises best; odd k avoids ties in two-class votes." }
      ] },
      { h: "Feature scaling (do not skip)", items: [
        { t: "Why it matters", d: "Distance sums every feature's gap, so the feature with the biggest units silently decides the outcome." },
        { t: "The fix", d: "Put features on comparable ranges first (standardise or min-max) so each contributes fairly to the distance.", f: "z = (x − mean) / std" },
        { t: "Not deletion", d: "If one feature dominates, rescale it — don't drop it. Both features may still carry real signal." }
      ] },
      { h: "The decision boundary", items: [
        { t: "What it is", d: "The invisible line in feature space where the predicted label flips from one class to another." },
        { t: "k shapes it", d: "Small k draws a jagged boundary that hugs individual points; large k smooths it into gentle curves." },
        { t: "Curse of dimensionality", d: "Add many features and points spread out until distances all look alike, so 'nearest' stops meaning much." },
        { t: "Junk features hurt", d: "Irrelevant columns add noise to every distance, drowning the useful axes; select or weight features before trusting kNN." }
      ] }
    ]
  };

  window.NOTES["logreg"] = {
    key: "logreg", name: "Logistic Regression",
    intro: "A linear model for classification: weigh the features into a score, squash it into a probability, then threshold to a decision.",
    groups: [
      { h: "The idea", items: [
        { t: "Regression in name only", d: "It outputs a probability, then a class label — a classifier built from a linear score.", f: "score → probability → label" },
        { t: "Weighted score", d: "Multiply each feature by its weight, add them up, add the intercept. One number summarising the case.", f: "score = w1x1 + w2x2 + … + b" },
        { t: "Weight = influence", d: "Each weight says how much, and in which direction, its feature pushes the prediction." },
        { t: "Intercept (bias)", d: "The baseline score before any feature speaks — the model's opinion when all features are zero.", f: "x = 0 ⇒ log-odds = b" }
      ] },
      { h: "From score to probability", items: [
        { t: "Probability, not verdict", d: "The output is a belief between 0% and 100% — 'how likely', not a hard yes/no." },
        { t: "Why not a straight line", d: "A raw score runs from −∞ to +∞, but a probability must stay in (0,1); a line would spill outside that range." },
        { t: "The sigmoid", d: "An S-shaped curve converts any score into a probability between 0 and 1.", f: "p = 1 / (1 + e^(−score))" },
        { t: "Odds", d: "The same belief as a ratio: 75% probability is odds of 3:1, three yeses per no.", f: "odds = p / (1 − p)" },
        { t: "Log-odds (logit)", d: "The log of the odds is the currency the model thinks in; in log-odds it is a perfectly straight line.", f: "log(p/(1−p)) = w·x + b" }
      ] },
      { h: "Reading the model", items: [
        { t: "Weight signs are directions", d: "w > 0 raises the probability of the positive class, w < 0 lowers it, w = 0 means the feature is irrelevant." },
        { t: "Odds ratios", d: "Exponentiate a weight to read it: one unit of the feature multiplies the odds by that factor.", f: "e^w = odds multiplier" },
        { t: "Compare fairly", d: "Raw weights depend on each feature's units; scale features (or use w × sd) before ranking importance." },
        { t: "Linear boundary", d: "The classes are split by a straight line or flat plane where the score crosses zero.", f: "boundary: w·x + b = 0" }
      ] },
      { h: "How it learns", items: [
        { t: "Log-loss", d: "Training minimises cross-entropy: it heavily punishes confident wrong probabilities.", f: "−Σ [y·log(p) + (1−y)·log(1−p)]" },
        { t: "One global minimum", d: "Log-loss is convex, so gradient descent slides to a single best answer with no local traps.", f: "w ← w − η·∇loss" },
        { t: "Well-calibrated by design", d: "Because log-loss is a proper scoring rule, minimising it pushes predicted probabilities toward true frequencies." }
      ] },
      { h: "The decision threshold", items: [
        { t: "Turning p into a class", d: "Predict positive when the probability clears a cutoff, by default 0.5.", f: "predict + if p ≥ t" },
        { t: "Moving the threshold", d: "Raising or lowering t trades one kind of mistake for the other — fewer false alarms but more misses, or vice versa." },
        { t: "Cost-sensitive choice", d: "When errors cost differently, pick the threshold that minimises expected cost, not the default 0.5." }
      ] },
      { h: "Regularisation & gotchas", items: [
        { t: "Why regularise", d: "A penalty on big weights stops the model over-trusting any one feature and helps it generalise." },
        { t: "L2 vs L1", d: "L2 shrinks weights toward small-but-alive; L1 drives weak weights to exact zero, doing feature selection.", f: "L2 = λΣw² · L1 = λΣ|w|" },
        { t: "The C parameter", d: "In sklearn, C is inverse strength: smaller C means a stronger penalty and more shrinkage." },
        { t: "Separable data diverges", d: "If classes are perfectly separable with no penalty, weights blow up to infinity; any regularisation restores a finite fit." },
        { t: "Scale your features", d: "Always standardise inputs first: it keeps the solver stable and makes weights and penalties comparable across features." },
        { t: "Curves need expansion", d: "The boundary is straight in the given features; add terms like x² or x₁·x₂ to bend it where the data curves." }
      ] }
    ]
  };
})();
