/* Why-wrong notes: Logistic Regression, Naive Bayes. Keyed by exact question stem; one entry per distractor, same order as choices[1..]. */
(function () {
  var W = (window.WHYNOT = window.WHYNOT || {});

  /* ===== logreg ===== */

  W["Logistic regression has 'regression' in its name. What kind of task is it actually used for?"] = [
    "The 'regression' is only in the name — the final output is a category chosen by a threshold, not a continuous number.",
    "Clustering works on unlabelled data; logistic regression is supervised and needs labelled classes to learn from.",
    "Its probabilities can be sorted, but the job it's hired for is assigning each case a class, not producing an ordering.",
    "Forecasting projects a numeric value forward in time; this model hands back a class, not a numeric projection."
  ];

  W["What is the 'weighted score' that logistic regression computes for each case?"] = [
    "That's the sigmoid's output — the probability comes AFTER the weighted score, not instead of it.",
    "The model sums feature-times-weight products; it never merely counts how many features lean one way.",
    "No single term is singled out — every feature's product is added into the total.",
    "Features are each multiplied by their own weight and then ADDED, not multiplied together or averaged."
  ];

  W["What role does the intercept (bias) term play in logistic regression?"] = [
    "Rescaling features is preprocessing (standardisation); the intercept is just a constant added to the score.",
    "That's the decision threshold — a separate choice applied to the output probability, not a term in the score.",
    "The sigmoid's steepness comes from the size of the weights, not from the intercept.",
    "Nothing in the model counts features; the intercept is one fixed constant added no matter what the features are."
  ];

  W["In logistic regression, what are the 'odds' of an outcome?"] = [
    "That's just a percentage rescaling of probability; odds are a ratio running from 0 to infinity.",
    "The raw score is the LOG-odds (logit), one logarithm away from the odds themselves.",
    "Subtracting gives a difference; odds come from DIVIDING the yes-chance by the no-chance.",
    "Odds involve no logarithm — logging the ratio gives the logit, and this option logs the wrong thing anyway."
  ];

  W["What is the log-odds (logit) in logistic regression?"] = [
    "The sigmoid's output is the probability itself; the logit is what goes INTO the sigmoid.",
    "That ratio is the odds; the logit is the LOGARITHM of that ratio.",
    "A penalty on large weights is regularisation, unrelated to the logit scale.",
    "That's the decision threshold, a policy applied to the output, not the model's linear scale."
  ];

  W["A logistic regression model looks at a loan application. What does it actually output?"] = [
    "A label only appears after YOU apply a threshold; the model itself emits a probability.",
    "A signed distance from the boundary is the raw score idea (as in SVMs); here it's squashed into 0–1 first.",
    "The raw weighted sum is computed internally but passed through the sigmoid before anything is reported.",
    "A hard 0 or 1 is the result of thresholding; the model's own output is a smooth value in between."
  ];

  W["The model computes a raw score of +4.2 for one customer and −7.9 for another. Why doesn't it report those numbers directly?"] = [
    "Readability is a side benefit; the real problem is that raw scores are unbounded and aren't probabilities at all.",
    "The sigmoid is a deterministic squashing function; it performs no noise filtering.",
    "Negative scores are meaningful — they signal 'probably no'; they just aren't on a 0–1 probability scale.",
    "Both scores sit on the same log-odds scale and are perfectly comparable; that scale simply isn't 0–1."
  ];

  W["The model says a customer has a 62% probability of churning. How does that become a yes/no decision?"] = [
    "The base rate isn't the decision rule — you compare against a cutoff chosen for your costs, not the average churn rate.",
    "The model only supplies the probability; the yes/no call is a separate thresholding step that you control.",
    "Each customer is judged alone — another customer's score has nothing to do with this decision.",
    "Probabilities are never inflated past 100%; the number stays as-is and is simply compared to a line."
  ];

  W["In feature space, what shape is the decision boundary of plain logistic regression?"] = [
    "Bending toward the data is what flexible models like KNN do; a weighted sum set to zero can only be flat.",
    "Circular regions need squared feature terms, which plain logistic regression doesn't have.",
    "A staircase of axis-aligned cuts describes a decision tree, not a linear model.",
    "Plain logistic regression draws exactly ONE flat boundary, however the classes are arranged."
  ];

  W["One feature is 'emails sent per week'. Its learned weight is negative. What does that tell you?"] = [
    "Pushing the probability UP is what a POSITIVE weight means — the sign here points the other way.",
    "A near-ZERO weight would mean little contribution; a negative weight is real influence, just downward.",
    "Weights are fixed once training ends; the threshold never changes their sign.",
    "Scaling changes a weight's size, not the validity of its sign — negative still means 'pushes down'."
  ];

  W["Training adjusts the weights. What exactly does training try to minimise?"] = [
    "The error count is flat and jumpy — nudging a weight rarely flips a label, so gradient descent gets no signal from it.",
    "Squared error suits continuous targets and behaves badly with a sigmoid; it isn't this model's objective.",
    "Distance to a class centre describes centroid or clustering methods, not logistic regression's objective.",
    "Maximising the separating margin is the SVM's objective, not logistic regression's."
  ];

  W["Why not just fit ordinary linear regression to a 0/1 target and call it a day?"] = [
    "Least squares computes fine on 0/1 targets — the trouble is the fitted values, which stray outside 0 and 1.",
    "The line would still slope the right way; ranking isn't the problem, out-of-range predictions are.",
    "The intercept estimates perfectly well from 0/1 data; nothing blocks it.",
    "A straight line crosses 0.5 easily — its flaw is that it keeps going past 0 and 1."
  ];

  W["You give the model total freedom and its weights grow huge. It scores 99% on training data, 78% on validation. What's the standard fix?"] = [
    "More features add capacity, which usually makes overfitting worse, not better.",
    "The threshold changes which labels you assign, not the overconfident weights doing the memorising.",
    "A lower learning rate reaches the same overfit solution — it just gets there more slowly.",
    "Standardising helps optimisation and comparability but doesn't stop weights growing to fit noise."
  ];

  W["A hospital uses the model's probabilities to order follow-ups. Missing a real case is far worse than a false alarm. What should change?"] = [
    "Raising the cutoff flags FEWER patients, producing MORE missed cases — the opposite of what's needed.",
    "The model isn't the problem; the miss-versus-false-alarm trade-off is set by the cutoff policy, not the features.",
    "Raw scores change no decisions — a line still has to be drawn somewhere on them.",
    "Sigmoid steepness comes from the learned weights and wouldn't shift the miss/false-alarm trade-off anyway."
  ];

  W["A stakeholder asks: 'What does a one-unit increase in income do to the odds of approval?' Which property of logistic regression answers this directly?"] = [
    "The slope describes how fast probability changes locally, not a constant per-unit effect on the odds.",
    "The intercept is the baseline lean, not the per-unit effect of income.",
    "A raw weight is a change in LOG-odds, not a percentage; it must be exponentiated first.",
    "Correlation is a statistic of the data, not a property of the fitted model's coefficients."
  ];

  W["In machine learning, what is the sigmoid (logistic) function?"] = [
    "That's softmax, the multi-class generalisation — the sigmoid squashes a single score, not a vector.",
    "A penalty shrinking large weights is regularisation, part of the loss, not a squashing function.",
    "That describes the decision boundary, not the function that maps scores to probabilities.",
    "The number of passes over the dataset is an epoch, a training concept unrelated to the sigmoid."
  ];

  W["What is logistic regression?"] = [
    "Predicting a continuous value with a straight line is ordinary LINEAR regression.",
    "A tree of yes/no questions describes a decision tree.",
    "Voting among nearest neighbours describes KNN, which stores examples instead of learning weights.",
    "Grouping unlabelled points is clustering, an unsupervised task — logistic regression needs labels."
  ];

  W["In logistic regression, what is the sigmoid (logistic) function?"] = [
    "Summing absolute differences is Manhattan distance, a metric, not a squashing function.",
    "Returning the most common class among neighbours is KNN's voting rule.",
    "Scaling features to zero mean and unit variance is standardisation, a preprocessing step.",
    "A straight line is unbounded; the sigmoid deliberately bends so its output stays inside 0–1."
  ];

  W["In logistic regression, what is the decision threshold?"] = [
    "The weighted sum is the raw score (logit), computed before the probability, not the cutoff applied after it.",
    "The rate of weight updates is the learning rate, a training hyperparameter.",
    "Feature count describes the model's inputs, nothing to do with converting probability to a class.",
    "The intercept shifts the score inside the model; the threshold is applied outside, to the output."
  ];

  W["In logistic regression, what is a coefficient (weight)?"] = [
    "The probability is the model's OUTPUT, not a learned per-feature multiplier.",
    "The cutoff for converting probability to a class is the decision threshold, not a weight.",
    "Counts of training examples per class describe the data, not learned parameters.",
    "Distances between examples belong to KNN-style methods, not to a weight."
  ];

  W["In logistic regression, what is an odds ratio?"] = [
    "The probability is one case's output; the odds ratio describes a FEATURE's per-unit effect.",
    "The odds ratio multiplies odds; it isn't a difference between two probabilities.",
    "The ratio of correct to incorrect predictions is a performance measure, not a coefficient interpretation.",
    "Coefficients are exponentiated and read one at a time; summing them is meaningless."
  ];

  W["In logistic regression, what is the softmax function?"] = [
    "Squashing a single score into 0–1 is the sigmoid, the two-class special case.",
    "Picking the largest and discarding the rest is a hard argmax; softmax gives every class a graded share.",
    "Measuring distance between vectors is a metric, unrelated to converting scores to probabilities.",
    "Scaling features to unit variance is standardisation, a preprocessing step."
  ];

  W["In logistic regression, what is the log loss (cross-entropy) cost function?"] = [
    "Counting misclassifications ignores confidence and is too flat and jumpy for gradient-based training.",
    "Squaring differences of numeric values is mean squared error, linear regression's loss.",
    "Distances between nearest neighbours belong to KNN, not to any training loss.",
    "No loss rewards big coefficients — regularisation actually penalises them."
  ];

  W["In logistic regression, what is the (linear) decision boundary?"] = [
    "The S-curve is the sigmoid mapping scores to probabilities, not a surface in feature space.",
    "The probability cutoff is the threshold, a number applied to output, not a surface separating regions.",
    "Class averages are centroids; the boundary is where the score hits zero, not a mean point.",
    "The coefficients define the boundary's orientation but are parameters, not the boundary itself."
  ];

  W["In logistic regression, what is the intercept (bias) term?"] = [
    "A multiplier on a feature is an ordinary coefficient; the intercept multiplies nothing and is added alone.",
    "The probability output is the model's result, not a learned constant inside the score.",
    "The threshold for assigning a class is applied after prediction, outside the score.",
    "The learning rate is an optimiser setting, not a term in the model equation."
  ];

  W["In logistic regression, what is maximum likelihood estimation?"] = [
    "Directly minimising the misclassification count is a non-smooth objective that the fitting never targets.",
    "Keeping weights small is regularisation's job — an add-on penalty, not the likelihood principle.",
    "Threshold selection happens after fitting and doesn't determine the coefficients at all.",
    "Picking features by correlation is a preprocessing heuristic, not how the coefficients are estimated."
  ];

  W["Logistic regression is 'linear' — but the probability curve is clearly S-shaped. What exactly is linear about it?"] = [
    "The probability flattens near 0 and 1 along the S-curve; it is not a straight-line function of any feature.",
    "The sigmoid is only APPROXIMATELY straight near its middle — a local look, not the model's linearity.",
    "The score-to-probability map is the sigmoid, which is precisely the nonlinear step.",
    "How the error rate falls with more data is a learning-curve fact, unrelated to the model equation."
  ];

  W["Three classes — cat, dog, fox — and logistic regression still works, via softmax. What does softmax guarantee about the three outputs?"] = [
    "Softmax divides by the total, so the outputs MUST sum to exactly 1, not merely land in 0–1.",
    "With three close scores the winner can hold well under half — say 40/30/30.",
    "The outputs depend on the case's features, not on how often each class appears in the data overall.",
    "Softmax exponentiates before normalising; it is not a simple linear rescale of the raw scores."
  ];

  W["Training runs gradient descent on the log-loss. What does each update step actually do to the weights?"] = [
    "Trying random weight sets is random search; gradient descent follows the computed slope instead.",
    "Jumping straight to the optimum would need a closed-form solution, which log-loss doesn't have.",
    "Steps can move weights up OR down; the direction comes from the gradient, not a fixed upward scaling.",
    "Shrinking weights toward zero is what a regularisation term adds, not what a plain gradient step does."
  ];

  W["You switch the penalty from L2 (sum of squared weights) to L1 (sum of absolute weights). What famous behaviour appears?"] = [
    "Smooth shrinkage that never reaches zero is L2's behaviour; L1's corner makes exact zeros optimal.",
    "The L1-penalised log-loss remains convex — no fake valleys appear.",
    "L1 zeroes weak weights but leaves each survivor at its own value; nothing equalises them.",
    "The sigmoid bounds every output to (0,1) no matter which penalty is used."
  ];

  W["On a perfectly separable dataset, UNregularised logistic regression never quite finishes training. What's happening to the weights?"] = [
    "There is no stopping point — scaling the weights up always shaves a little more loss, forever.",
    "The weight DIRECTION stabilises; it's the magnitude that keeps growing.",
    "Zero weights give 50/50 outputs and high loss — the opposite of a minimum.",
    "Zero classification error doesn't zero the log-loss; extra confidence still lowers it, so updates continue."
  ];

  W["The fitted model is: log-odds = −3 + 0.8·(years of history). What does the intercept −3 mean, concretely?"] = [
    "A probability can't be minus three; the intercept lives on the log-odds scale, not the probability scale.",
    "A per-year change is the slope's job (here +0.8); the intercept is a one-off baseline, not a rate.",
    "The model has no hard requirements — it just assigns low odds at zero years, rising with each year.",
    "The intercept is not a centring device; it is the fitted log-odds when the feature equals zero."
  ];

  W["Income's weight is 0.00004 and age's weight is 0.3 — a colleague concludes age matters vastly more. Why is that comparison bogus?"] = [
    "A tiny per-pound weight can still mean a large effect per £10,000; the feature wasn't dropped.",
    "They CAN be compared — after standardising the features so a 'unit' means the same thing for both.",
    "Coefficients are interpreted individually; summing two unrelated weights is meaningless.",
    "There is no entry order — all weights are estimated jointly in one optimisation."
  ];

  W["Fraud is 1% of your data and logistic regression learns to predict tiny probabilities for everyone. What does class_weight='balanced' change inside training?"] = [
    "Duplicating rare rows is oversampling; class_weight reweights the loss, leaving the dataset untouched.",
    "Generating synthetic minority rows is SMOTE, a separate resampling technique.",
    "class_weight acts inside training on the loss; the decision threshold is not touched.",
    "Dropping majority rows is undersampling; no rows are removed."
  ];

  W["Among common classifiers, logistic regression's predicted probabilities tend to be unusually trustworthy out of the box. Why?"] = [
    "Merely bounding outputs to 0–1 doesn't make them match real frequencies — many bounded models are badly calibrated.",
    "Linear models CAN be wildly overconfident (huge weights on separable data); simplicity isn't the reason.",
    "Averaging sub-models describes ensembles like bagging; logistic regression is a single model.",
    "Nothing clips the output — probabilities near 0 or 1 are allowed whenever the evidence warrants them."
  ];

  W["The true boundary is curved, but you want to keep logistic regression. What's the classic trick?"] = [
    "Extra epochs only refine the same straight boundary; no amount of training bends a linear function.",
    "Regularisation shrinks weights, making the boundary flatter and simpler — never curved.",
    "Moving the threshold slides the straight boundary; the shape stays flat.",
    "Wiring several logistic units together is building a small neural network, not keeping logistic regression."
  ];

  W["Two near-duplicate features — 'income' and 'declared salary' (correlation 0.98) — enter a logistic regression. Predictions stay fine, but the coefficients go haywire: +8.2 on one, −7.9 on the other. What's happening?"] = [
    "Predictions stay stable and usable — the SUM of the twin weights is well pinned down even though the split isn't, so 'can't be trusted' overreaches.",
    "Leakage would show as too-good accuracy; two inputs mirroring each other says nothing about either copying the label.",
    "Overfitting would hurt fresh-data accuracy, but predictions stay fine — only the split of weight between twins is arbitrary.",
    "Scale isn't the issue at 0.98 correlation; standardising won't stop near-duplicates trading huge opposite weights."
  ];

  W["Medication helps young patients but harms elderly ones. A logistic regression with features [medication, age] insists the medication effect is one number for everyone. What's missing, and what's the classical fix?"] = [
    "Age-squared lets the AGE effect curve, but the medication weight stays one shared number for every patient.",
    "More data only pins down the same additive model more precisely — its form still can't express a sign flip.",
    "The 'never' is false: one model can carry the reversal once given the right term, and splitting wastes data on a hard age cut.",
    "Regularisation only shrinks magnitudes; removing it can't create an age-varying effect the feature set can't express."
  ];

  W["sklearn's LogisticRegression offers solvers: liblinear, lbfgs, saga, newton-cg. Training hangs or warns 'failed to converge' on your 2M-row, L1-penalised job. What's the practical solver map?"] = [
    "newton-cg doesn't support L1 at all, liblinear scales poorly to millions of rows, and these solvers have no learning rate to drop.",
    "Solvers differ in supported penalties and scaling; raising max_iter often just hides the usual real cause, unscaled features.",
    "It's backwards: saga (not liblinear) handles elastic-net and big data, and non-convergence usually means scaling, not inseparable classes.",
    "liblinear is the legacy small-data option, saga is not deprecated, and the loss stays convex at any scale."
  ];

  W["You need honest p-values and confidence intervals on coefficients for a regulatory report, and reach for sklearn's LogisticRegression. Two traps await. What are they?"] = [
    "sklearn is NOT unpenalised by default — C=1.0 applies L2 shrinkage that biases every coefficient.",
    "sklearn provides no p-values at all, so there is nothing of the sort to distrust or bootstrap around.",
    "sklearn does no internal standardisation; coefficients come out on the raw feature scales.",
    "The default penalty is precisely one of the traps, and no standard errors are supplied either — 'fine' is wrong twice."
  ];

  W["For a 4-class problem, logistic regression can be trained as one multinomial (softmax) model or as four one-vs-rest binary models. How do the two schemes actually differ in behaviour?"] = [
    "They optimise different objectives — four independent binary fits generally don't reproduce the joint softmax solution.",
    "This has the two schemes exactly swapped: OvR is the one with independent binary models needing renormalisation.",
    "Neither scheme reliably wins on accuracy; in practice the two usually perform similarly.",
    "Softmax normalises any number of classes by construction; its outputs can never drift above 1."
  ];

  W["Lasso (L1) on data with a GROUP of five correlated useful features behaves oddly: it picks one of the five at random and zeroes the rest. Elastic net was invented for exactly this. What does it do differently?"] = [
    "Bootstrapped repeated lasso is stability selection, a different procedure — elastic net changes the penalty, not the sampling.",
    "Elastic net keeps the true absolute-value term; smoothing it away would also destroy the exact zeros you want.",
    "Pre-clustering features with one weight per group is group-lasso thinking; elastic net never forms explicit groups.",
    "Deliberately zeroing useful correlated features throws away signal; the goal is keeping the group, not killing it."
  ];

  /* ===== bayes ===== */

  W["In probability, what does the notation P(A | B) — 'the probability of A given B' — mean?"] = [
    "The chance of both happening is the JOINT probability P(A and B), not a conditional.",
    "That's the reversed conditional P(B | A), which is generally a different number.",
    "The chance of either is P(A or B), the union — no conditioning involved.",
    "Ignoring B gives the plain unconditional P(A), throwing away exactly the information the '|' provides."
  ];

  W["Naive Bayes wants P(spam | words), but from training it can only easily measure P(words | spam). What lets it turn the second into the first?"] = [
    "The likelihood ratio compares two classes' likelihoods; it never reverses a conditional's direction.",
    "Independence lets NB multiply per-word terms, but it doesn't flip P(words|spam) into P(spam|words).",
    "Normalisation only rescales already-flipped scores to sum to one; it isn't the inversion itself.",
    "The prior is an ingredient the flip USES, but on its own it converts nothing."
  ];

  W["In Naive Bayes, what is meant by a piece of 'evidence'?"] = [
    "The final class probability is the POSTERIOR — the output, not an observed input.",
    "The odds held before seeing anything are the PRIOR, not a clue.",
    "NB learns counts, not error-minimising weights — and a learned parameter isn't an observation anyway.",
    "A threshold is a decision policy applied to the output, not something observed in the data."
  ];

  W["In Naive Bayes, what does the 'likelihood' of a clue measure?"] = [
    "How common each class is beforehand is the PRIOR, not a per-clue quantity.",
    "Dividing the two class likelihoods gives the likelihood RATIO, which is built from likelihoods, not one itself.",
    "The updated belief after the clue is the POSTERIOR, the result rather than the ingredient.",
    "How many clues an email contains describes its length, not any probability."
  ];

  W["What is a clue's 'likelihood ratio' in Naive Bayes?"] = [
    "Subtracting gives a difference; the multiplier that scales odds comes from DIVISION.",
    "Multiplying by the prior odds mixes in the base rate and heads toward the posterior; the ratio itself is prior-free.",
    "Averaging blends the two classes together and erases exactly the contrast the ratio measures.",
    "Summing across emails gives a corpus tally, not a comparison between the two classes."
  ];

  W["In Bayes' rule, what does the 'posterior' represent?"] = [
    "The starting belief before evidence is the PRIOR.",
    "A single clue's multiplier is a likelihood ratio — one input among many, not the result.",
    "A clue's frequency inside one class is a LIKELIHOOD, an ingredient rather than the answer.",
    "The cutoff that turns a belief into a label is a decision threshold, applied after the posterior exists."
  ];

  W["What makes Naive Bayes a 'generative' model?"] = [
    "Modelling the dividing boundary directly is the DISCRIMINATIVE approach, e.g. logistic regression.",
    "Storing every case and matching the nearest is instance-based learning like KNN.",
    "Error-driven weight tuning describes discriminative training; NB just counts per-class frequencies.",
    "'Generative' means it MODELS how each class's data arises — it never manufactures extra training emails."
  ];

  W["An email arrives containing the words 'FREE', 'winner' and 'meeting'. How does Naive Bayes decide whether it's spam?"] = [
    "Raw suspicious-word tallies ignore both the base rate and how diagnostic each individual word actually is.",
    "Dropping the base rate invites the base-rate fallacy; the prior is a core term in Bayes' rule.",
    "Choosing the class with more training emails uses the prior ALONE and ignores every word in the email.",
    "Copying the nearest past email's label is KNN, not Bayes' rule."
  ];

  W["The 'naive' in Naive Bayes refers to one specific assumption. Which?"] = [
    "Clues carry different strengths through their likelihood ratios; nothing assumes equal weight.",
    "The assumption is independence GIVEN the class; unconditional independence is a different claim entirely.",
    "NB explicitly multiplies in the class priors; they are never ignored.",
    "Bell-curve features are the extra assumption of the GAUSSIAN variant, not the 'naive' part."
  ];

  W["A disease affects 1 person in 100. A test multiplies the odds of having it by 20 when positive. Someone tests positive. Roughly how worried should they be?"] = [
    "That's the base-rate fallacy: 20× applied to 1:99 odds only reaches 20:99, about 17%, far from certainty.",
    "Treating the multiplier as the final probability skips the prior; the true figure is roughly 17%, not 95%.",
    "The test DOES matter — it lifted the chance from 1% to about 17%, well worth taking seriously.",
    "Evidence multiplies the prior odds rather than resetting them; nothing defaults to fifty-fifty."
  ];

  W["Where does Naive Bayes get a number like \"'FREE' is 4× more common in spam\" in the first place?"] = [
    "NB has no loss surface to descend — training is a single counting pass, no gradients involved.",
    "Nothing is pre-supplied; every likelihood is estimated from the training corpus itself.",
    "There are no iterations or validation-driven adjustments — the counts are computed once.",
    "Measuring distances between emails is KNN's approach, not a counting model's."
  ];

  W["The word 'blockchain' never appeared in any training spam. A new spam email contains it. What does raw (unsmoothed) Naive Bayes do?"] = [
    "A zero count estimates probability 0, not 1 — the product is annihilated, not left unchanged.",
    "Nothing skips unseen words; the zero estimate enters the product like any other factor and dominates it.",
    "A small default probability is exactly what SMOOTHING adds — raw NB has no such safeguard.",
    "Back-off to a fallback exists in some language models, but plain NB has no such mechanism."
  ];

  W["A long email has 300 words, each contributing a probability like 0.02. Multiplying 300 such numbers directly causes a practical problem. Which — and what's the standard fix?"] = [
    "Multiplying numbers below 1 SHRINKS the product — it collapses toward zero, not infinity.",
    "Rounding each factor first would destroy information; the failure is underflow of the final product, not per-factor precision.",
    "Three hundred multiplications are instantaneous; speed is not the issue.",
    "All the factors are positive, so nothing cancels — the product just shrinks below what floats can hold."
  ];

  W["You have only 200 labelled documents and 5,000 word-features. Which property makes Naive Bayes a strong first choice here?"] = [
    "With plentiful data flexible models usually overtake NB's plateau — its edge is specifically at SMALL sizes.",
    "NB estimates every feature regardless; smoothing softens weak counts but nothing gets discarded.",
    "NB's virtue is the opposite of flexibility — rigid assumptions are what let it cope with little data.",
    "NB is fully supervised and never goes out collecting extra examples on its own."
  ];

  W["A feature is continuous — say, transaction amount — rather than a word count. How does Gaussian Naive Bayes handle it?"] = [
    "Binning into ranges is a discretisation workaround; GaussianNB uses the continuous value directly.",
    "No rounding occurs — turning amounts into counts would throw away exactly the detail being modelled.",
    "Percentile ranking against training points is a nonparametric idea; GaussianNB fits parametric bell curves instead.",
    "A uniform 'equally likely' assumption would carry no class information; the assumed shape is a normal curve."
  ];

  W["Naive Bayes outputs P(spam) for each email. The security team wants to auto-delete only when very sure. What do they control?"] = [
    "The smoothing constant shapes how counts become probabilities during training, not what action fires on the output.",
    "Changing the prior shifts every probability — a blunt training-time tool, not a per-action policy lever.",
    "Vocabulary size changes the model's inputs, not when an action triggers.",
    "Per-word ratios are learned from data; hand-editing them rewires the model rather than setting a policy."
  ];

  W["Despite its false independence assumption, Naive Bayes often picks the RIGHT class anyway. Why?"] = [
    "Real features — words especially — correlate heavily; the assumption is usually false in practice.",
    "Smoothing only fixes zero counts; it does nothing about double-counted correlated evidence.",
    "The distortions don't reliably cancel — the probability VALUES really are skewed; only the winner tends to survive.",
    "Counting per-feature frequencies captures no interactions between features at all."
  ];

  W["What is Bayes' theorem?"] = [
    "Equal-weight averaging of feature probabilities is a made-up rule; Bayes' rule multiplies and normalises specific terms.",
    "A raw co-occurrence count isn't even a probability, and no belief gets updated anywhere in that procedure.",
    "Drawing the maximum-gap separating line is the support vector machine's idea.",
    "Repeatedly splitting on the most informative feature is decision-tree induction."
  ];

  W["In Naive Bayes, what is the 'prior probability' of a class?"] = [
    "The belief AFTER accounting for a case's features is the posterior, not the prior.",
    "A feature's chance given a known class is a likelihood (class-conditional probability).",
    "The evidence summed across classes is the marginal-likelihood denominator, not a class's head start.",
    "A per-feature odds multiplier is a likelihood ratio, not the class's starting probability."
  ];

  W["In Naive Bayes, what is the 'naive independence assumption'?"] = [
    "Uniform class frequencies are never assumed — NB reads the priors straight from the data.",
    "Bell-shaped features are GaussianNB's extra modelling choice, not the 'naive' assumption itself.",
    "Clean labels are never assumed; any mislabelling simply flows into the counts.",
    "That's the exact opposite — NB pretends features are NOT correlated once the class is known."
  ];

  W["In Naive Bayes, what is a 'class-conditional probability'?"] = [
    "The class given the features is the POSTERIOR — the flipped direction of the conditional.",
    "The class's chance before any features is the PRIOR.",
    "The evidence averaged over classes is the marginal-likelihood denominator.",
    "A fixed mistake rate is a performance measure, not a term inside the model."
  ];

  W["In Naive Bayes, what is Laplace (additive) smoothing?"] = [
    "Rescaling features to 0–1 is min-max scaling, a preprocessing step unrelated to counts.",
    "Averaging many models is ensembling (bagging), not an adjustment to count-based estimates.",
    "Removing rare features is feature selection; smoothing KEEPS rare features and just softens their estimates.",
    "Filling missing values with the mean is imputation, unrelated to zero counts."
  ];

  W["What is MultinomialNB (Multinomial Naive Bayes)?"] = [
    "Bell-curve continuous features describe GaussianNB.",
    "Binary present/absent features with absence penalised describe BernoulliNB.",
    "Boosted shallow trees on residuals is gradient boosting, not any Naive Bayes.",
    "Voting among nearest examples is k-nearest neighbours."
  ];

  W["What is GaussianNB (Gaussian Naive Bayes)?"] = [
    "Integer counts under a multinomial model describe MultinomialNB.",
    "Binary-only features describe BernoulliNB.",
    "Fitting Gaussian blobs to unlabelled data is a Gaussian mixture model — clustering, not classification.",
    "A straight line minimising squared error is ordinary linear regression."
  ];

  W["In Naive Bayes, what is the 'evidence' (marginal likelihood) term?"] = [
    "The class's chance before features is the PRIOR, a numerator ingredient, not the denominator.",
    "One feature's chance under a fixed class is a LIKELIHOOD.",
    "The final label is the prediction — an output, not a term in the formula.",
    "A majority-class count is a raw dataset statistic, not the normalising denominator of Bayes' rule."
  ];

  W["In Bayesian classification, what is the MAP (maximum a posteriori) estimate?"] = [
    "Choosing by prior alone ignores the observed evidence entirely.",
    "The most frequent feature value is a mode of the data, unrelated to picking a class.",
    "Averaging posteriors selects nothing; MAP takes the argmax over classes.",
    "Maximising the likelihood alone is the ML estimate, which drops the prior that MAP keeps."
  ];

  W["In text classification, what is the 'bag-of-words' representation?"] = [
    "Preserving exact sequence and grammar is precisely what bag-of-words throws away.",
    "It keeps counts for EVERY word, not just the single most frequent one.",
    "A dense learned vector is a neural embedding, a different representation altogether.",
    "Pairwise document distances form a distance matrix, not a per-document feature vector."
  ];

  W["sklearn ships three Naive Bayes flavours — MultinomialNB, BernoulliNB, GaussianNB. You're staring at a new dataset. What actually decides which one to use?"] = [
    "Dataset size doesn't change what SHAPE fits P(feature|class) — a count is a count at any corpus size.",
    "All three variants handle any number of classes; class count never picks the flavour.",
    "Imbalance is addressed through priors (or ComplementNB), not by switching distribution family.",
    "Every variant runs on few or thousands of features; dimensionality doesn't set the event model."
  ];

  W["A test email contains the word 'zumba', which never once appeared in your spam training emails. With no smoothing, what does this single word do to the spam score?"] = [
    "Unseen words are not skipped — their zero estimate enters the product and swamps everything else.",
    "NB has no additive penalties; factors MULTIPLY, and this factor is zero, so nothing else can carry the verdict.",
    "A word never seen in spam is evidence AGAINST spam — and unsmoothed it's treated as impossible, not mildly suggestive.",
    "Fallback default likelihoods are what smoothing supplies; unsmoothed NB has none."
  ];

  W["Laplace smoothing fixes the zero-veto by pretending every word was seen alpha extra times. Sweep alpha from 0 to 100 — what shape does validation accuracy trace?"] = [
    "Past the sweet spot the pseudo-counts drown the real frequencies, so accuracy turns back DOWN, not ever upward.",
    "Near alpha = 0 the unseen-word vetoes wreck accuracy, so a little smoothing clearly HELPS first.",
    "Alpha changes every estimated probability, so validation accuracy certainly moves with it.",
    "That's inverted — the two extremes are the bad ends and the middle is where accuracy peaks."
  ];

  W["GaussianNB is scoring a patient whose temperature is 99.5°F against two classes, healthy and flu. Mechanically, what did it learn per class, and how does it score?"] = [
    "No thresholds are learned — each class gets a whole distribution, and their densities are compared at the value.",
    "Storing every training value is instance-based (KNN-like); GaussianNB keeps only a mean and variance per class.",
    "Summed linear weights squashed through a logistic curve is logistic regression's mechanics, not GaussianNB's.",
    "A majority vote among the k nearest patients is k-nearest neighbours."
  ];

  W["A marketing dataset has features 'sale', 'discount', '% off' and 'bargain' — four near-synonyms that almost always appear together. Why does this specifically hurt Naive Bayes?"] = [
    "NB never drops features — it keeps all four, and that is exactly the problem.",
    "Zero-frequency vetoes come from UNSEEN words; frequently co-occurring synonyms are the opposite case.",
    "NB training stays one linear counting pass no matter how correlated the features are.",
    "Nothing merges them — each synonym multiplies the odds separately, stacking one signal four times."
  ];

  W["Your filter trained on a 50/50 spam/ham corpus, but in production only 1% of mail is spam. The same email now deserves a different probability. What's the correct, cheap fix?"] = [
    "The word likelihoods are still valid — only the class mix changed, so retraining from scratch discards good estimates for nothing.",
    "Moving the threshold reshapes decisions but leaves every stated probability wrong; the prior is the broken piece.",
    "Vocabulary pruning has nothing to do with a shifted class base rate.",
    "NB bakes the training prior into its posteriors, so a changed deployment mix directly skews them — it is not immune."
  ];

  W["Your Naive Bayes spam filter ranks emails brilliantly (great ROC-AUC), yet its stated probabilities cluster at 0.0001% and 99.999%. How should you treat its output?"] = [
    "Extreme stated probabilities are a known NB quirk from double-counted evidence; the excellent ranking is still valuable.",
    "Pulling everything toward 50% is arbitrary; proper calibration fits the correction to validation data instead.",
    "Those clustered extremes are exactly the untrustworthy numbers — thresholding on them directly is meaningless.",
    "More data doesn't fix the independence violation that causes the overconfidence."
  ];

  W["Inside a trained spam filter, the word 'viagra' multiplies the odds ×40 while 'the' multiplies by ×1.0. What property of a word determines its evidential power?"] = [
    "A word equally rare in BOTH classes still says nothing — rarity alone isn't discriminative.",
    "'the' has a huge raw spam count yet zero pull; without comparing against ham the count is uninformative.",
    "Bag-of-words Naive Bayes is completely blind to where a word appears in the email.",
    "Token length never enters the model at all."
  ];

  W["A support-ticket classifier must spot a category that's only 2% of tickets. Plain MultinomialNB keeps under-calling it. Which purpose-built variant targets exactly this, and how?"] = [
    "GaussianNB is for continuous features; fitting bell curves to word counts does nothing about class imbalance.",
    "BernoulliNB changes the event model to presence/absence; it has no special mechanism for starved classes.",
    "A rare-class-only model has nothing to contrast against, and blending by vote is an ad-hoc ensemble, not a purpose-built variant.",
    "No 'WeightedNB' estimator exists in sklearn, and inflating a prior only trades errors — it doesn't stabilise starved word estimates."
  ];

  W["You have 40 labelled examples — a weekend's hand-labelling — and a deadline. Logistic regression and Naive Bayes are both candidates. What does the classic learning-curve comparison say?"] = [
    "At 40 examples LR's extra flexibility starves — fewer assumptions HURT when data is this scarce, so it doesn't always win.",
    "NB's head start fades: with enough data the flexible model climbs to a higher plateau and overtakes.",
    "The curves differ from the very start and typically plateau at DIFFERENT heights.",
    "NB does useful work on tiny sets — that is precisely its calling card, so the comparison is far from moot."
  ];

  W["A 2,000-word email means multiplying 2,000 per-word probabilities, each perhaps 0.001. Every implementation refuses to do this literally. Why, and what do they do instead?"] = [
    "2,000 multiplications are trivially fast, and sampling 50 words would throw away most of the evidence.",
    "Tiny floats round toward zero, not up, and capping every product at the same floor would erase the differences you compare.",
    "The failure is deterministic underflow, not accumulated random error, and adding constants to probabilities corrupts the maths.",
    "Multiplication never becomes 'undefined'; chunking and averaging is invented and would change the answer."
  ];

  W["GaussianNB is often called a 'linear-ish' classifier, yet with per-class variances it can carve CURVED boundaries. When exactly is its boundary linear vs quadratic?"] = [
    "With UNEQUAL class variances the squared terms don't cancel, so the boundary genuinely curves — 'always linear' is false.",
    "Means set the boundary's POSITION; it is the variances whose equality or not decides straight versus curved.",
    "Priors only add a constant offset to the log-scores; they can shift the boundary but never bend it.",
    "No kernel is needed — unequal Gaussian variances alone already produce quadratic boundaries."
  ];

  W["Your spam filter must learn continuously from a never-ending stream — full retraining each night is too slow. Why is Naive Bayes uniquely suited to this, and what's the sklearn mechanism?"] = [
    "NB stores counts, not emails, and no sorting is involved anywhere.",
    "Count-based parameters update by simple increments; full retraining is exactly what NB gets to skip.",
    "NB has no learning rate or weights to nudge — updates are exact count increments, and no replay of old data is needed.",
    "NB streams natively by incrementing counters; no sliding-window retraining or neural machinery is required."
  ];

  W["A fraud dataset mixes word counts (transaction notes), yes/no flags, and continuous amounts. No single NB variant fits all three. What's the principled way to still use NB?"] = [
    "Bell curves badly misdescribe counts and binary flags, wrecking those features' likelihoods.",
    "Discretising amounts into fake tokens throws away information and distorts the multinomial model.",
    "Scores from differently-specified models aren't comparable across classes; variants should split by FEATURE type, not by class.",
    "Independence means each feature block can carry its own distribution; discarding two blocks needlessly throws away signal."
  ];

  W["On tweets (10–20 words), BernoulliNB often edges out MultinomialNB. The usual explanation involves what Bernoulli does with the words that DON'T appear. What is that mechanism?"] = [
    "Bernoulli ignores repetition entirely — it records only presence or absence, never extra counts.",
    "Both variants can be trained on the very same vocabulary; there are no hidden extra words.",
    "Word position never enters either model.",
    "Multinomial handles documents of any length; there is no 20-word floor."
  ];

  W["A strong team uses 'NB as a feature': they append MultinomialNB's log-odds output as an input column to a logistic regression (the NB-LR / NBSVM trick). Why does this hybrid beat both parents?"] = [
    "A derived feature adds no new labelled examples — all the information already came from the same training data.",
    "Nothing guarantees opposing errors; the gain comes from LR learning how much to weight NB's summary, not from cancellation.",
    "Feeding a transform of the LABELS in as a feature would be target leakage, and arbitrary added features don't reliably help.",
    "No renormalising layer sits in front of LR — it sees the raw log-odds column and simply learns a weight for it."
  ];
})();
