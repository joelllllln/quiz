/* Why-wrong notes: Random Forests & Bagging, Gradient Boosting & XGBoost, Stacking & Voting. Keyed by exact question stem; one entry per distractor, same order as choices[1..]. */
(function () {
  var W = (window.WHYNOT = window.WHYNOT || {});
  // --- Random Forests & Bagging ---
  W["A random forest is built from many DECISION TREES. What is a single decision tree, at heart?"] = [
    "A single straight boundary is a linear classifier; a tree carves the space with a chain of threshold questions, not one line.",
    "A weighted sum through an activation describes a neural-network neuron, not a tree of splits.",
    "Storing rows for later lookup is k-nearest-neighbours; a tree keeps split rules, not the raw data.",
    "Trees don't track recent labels; after training they are a fixed flowchart of questions."
  ];
  W["A trained random forest has 300 trees. How does it turn 300 tree outputs into ONE final prediction?"] = [
    "The forest never crowns one tree; every tree's answer enters the pooled vote or average.",
    "Chaining trees so each fixes the last is boosting; forest trees are independent and never see each other's errors.",
    "Lowest training error would just reward the most overfit tree; the forest pools all trees instead of picking one.",
    "Multiplying probabilities would let one near-zero tree veto everything; forests average votes, never multiply them."
  ];
  W["A random forest's max_features setting controls what, exactly, at each split?"] = [
    "Rows drawn per bootstrap is a separate setting (bootstrap/max_samples), not max_features.",
    "Tree depth is controlled by max_depth, a different knob.",
    "The number of trees is n_estimators, not max_features.",
    "max_features caps what a split MAY consider; it never forces any feature to be used anywhere."
  ];
  W["Before any 'forest', the base idea is an ENSEMBLE. In one sentence, what is an ensemble model?"] = [
    "Training one model longer is still a single model; no predictions get combined.",
    "Nightly retraining is a deployment schedule, not a combination of multiple models.",
    "Choosing one winner is model selection; an ensemble keeps all members and merges their outputs.",
    "Using many feature columns doesn't make an ensemble; the term is about many MODELS, not many inputs."
  ];
  W["Ensembles only help models with one particular flaw. Which flaw does averaging many trees actually cure?"] = [
    "Averaging keeps whatever error the trees share, so a too-simple model stays too simple; bias barely moves.",
    "Ensembles multiply training work; speed is not what averaging fixes.",
    "Pooling votes does nothing about gaps in the data; missing values are a preprocessing/tree-handling issue.",
    "Trees are already insensitive to feature scale, and averaging rescales nothing."
  ];
  W["Put it together: what, precisely, is a RANDOM FOREST?"] = [
    "One deep tree has no committee to average — it's exactly the unstable model forests were built to fix.",
    "Random split thresholds describe ExtraTrees' twist; a random forest still optimises its cut points.",
    "A chain of trees each fixing the last is boosting; forest trees are trained independently, in parallel.",
    "Regrowing on new data describes an online learner; a trained forest is static."
  ];
  W["A random forest hands you 'feature importances'. As a beginner, how should you read a number like income = 0.41?"] = [
    "Importance sums impurity reductions; it isn't a percentage of predictions that used the feature.",
    "It's not a correlation coefficient — it tallies how useful the feature's splits were inside this forest.",
    "Split usefulness shows association within the model; proving causation needs experiments, not split tallies.",
    "Forests have no coefficients; the score doesn't translate into any linear-model weight."
  ];
  W["More trees in a forest — does adding them ever cause OVERFITTING the way a deeper single tree does?"] = [
    "New trees are averaged in, not stacked as extra capacity; the ensemble mean only gets steadier.",
    "No such threshold exists; extra trees keep refining the average at any count.",
    "Forest trees are typically grown deep; the safety comes from averaging, not from shallowness.",
    "Sequential training describes boosting; forest trees are parallel by definition, so the condition never applies."
  ];
  W["Five models each score 86% alone, yet their combined vote scores 91%. What single condition made that possible?"] = [
    "Members are trained independently and stay 86% alone; grouping them changes nothing about each one.",
    "Averaging identical models gains nothing; the lift appears only when their errors differ.",
    "Unanimous models would score exactly 86% together; it's their disagreement that raised the score.",
    "There is no automatic per-voter bonus; five clones score the same as one."
  ];
  W["Bagging trains each model on a 'bootstrap sample': n rows drawn from the n training rows WITH replacement. What does one such sample look like?"] = [
    "Every row exactly once is a shuffle (sampling WITHOUT replacement); replacement creates repeats and gaps.",
    "About 63% of rows appear, but the sample is full size n WITH repeats — not a repeat-free two-thirds.",
    "Duplicating hard cases is boosting's trick (AdaBoost); bootstrap draws are uniformly random.",
    "Synthetic neighbours describe SMOTE-style augmentation; a bootstrap only resamples existing rows."
  ];
  W["Bagging: many trees, each trained on its own bootstrap sample, votes averaged. Which weakness of single trees is this aimed squarely at?"] = [
    "Averaging can't remove a shared systematic blind spot; bagging targets variance, not bias.",
    "Averaged trees still cut axis-by-axis; softening boundaries isn't bagging's aim.",
    "Deep trees overfit rather than underfit, and averaging can't deepen anyone's fit.",
    "Trees never needed scaled features in the first place."
  ];
  W["Each bagged tree never saw ~37% of the rows. Those left-out rows enable a famous free lunch. Which?"] = [
    "The left-out rows are precisely NOT in that tree's training set; training on them would destroy the honesty.",
    "Nothing in bagging scales features; the leftovers are used for scoring, not preprocessing.",
    "Forests don't early-stop tree growth; that's a boosting practice.",
    "OOB rows score the forest; standard forests aren't pruned, and the leftovers trim nothing."
  ];
  W["A random forest goes one step beyond bagging: at every split, each tree may only consider a RANDOM SUBSET of the features. Why add that?"] = [
    "Scanning fewer candidates is a minor side bonus; speed alone would never justify deliberately weaker trees.",
    "Each tree still overfits its own sample happily; the subset changes WHICH features trees use, not how hard they fit.",
    "Nothing guarantees every feature appears; weak features may never win a single split.",
    "Handling more features than rows isn't the motive; the trick exists to break tree correlation even with few features."
  ];
  W["What is a random forest?"] = [
    "A single pruned tree is one model, not an ensemble — there is nothing to vote or average.",
    "Trees trained in sequence to fix prior errors describe gradient boosting, not a forest.",
    "Forests don't grow one tree per class; every tree predicts all classes and the votes are pooled.",
    "A branching hierarchy of clusters is hierarchical clustering — unsupervised, not a supervised forest."
  ];
  W["What is bagging (bootstrap aggregating)?"] = [
    "Re-weighting misclassified rows each pass is boosting (AdaBoost), not bagging.",
    "Bagging resamples ROWS; splitting up columns is the random-subspace idea, not bootstrap aggregating.",
    "Shrinking a model's memory footprint is model compression, unrelated to resampling and voting.",
    "Pruning parameters slims one model; bagging trains many resampled copies instead."
  ];
  W["What is a bootstrap sample?"] = [
    "A holdout is carved out once, without replacement, and excluded from training; a bootstrap is a full-size random redraw.",
    "Features chosen at a split is the max_features mechanism; a bootstrap resamples rows, not columns.",
    "Stratification preserves class balance deliberately; bootstrap draws are uniform, so balance can drift.",
    "The first few rows aren't random and aren't full-size; they have none of the repeats-and-gaps structure."
  ];
  W["What is out-of-bag (OOB) error?"] = [
    "'Out-of-bag' means outside a tree's bootstrap sample, not outside the feature range — that's extrapolation.",
    "Training error is measured on rows the trees DID see, which is exactly what OOB is designed to avoid.",
    "Running out of features isn't a defined error; OOB is a scoring scheme, not a tree-growth failure.",
    "OOB scores the whole ensemble row by row; it isn't the spread between individual trees."
  ];
  W["What is feature bagging (the random subspace method)?"] = [
    "Discarding weak features once up front is feature selection; feature bagging keeps everything and randomises per split.",
    "A random subset of ROWS is bootstrap sampling; feature bagging randomises the columns at each split.",
    "Averaging values creates new compressed features; nothing is averaged in feature bagging.",
    "Trees aren't assigned a feature type; every tree redraws its candidate features at each split."
  ];
  W["In an ensemble, what does 'variance reduction' mean?"] = [
    "Shrinking feature ranges is scaling/normalisation — about inputs, not prediction stability.",
    "Cutting features is dimensionality reduction; variance here means how predictions wobble across retrains.",
    "A smaller training set raises variance if anything, and training speed is beside the point.",
    "Identical trees defeat the purpose; variance falls by averaging DIVERSE trees, not by cloning them."
  ];
  W["In random forests, what is 'tree decorrelation'?"] = [
    "Removing correlated columns is data preprocessing; decorrelation here concerns the TREES' errors, not the features.",
    "An average doesn't care about ordering; arranging trees changes nothing.",
    "Equal depth would make trees MORE alike; decorrelation seeks difference, not comparability.",
    "Rotating axes (PCA-style) transforms inputs; it isn't how forests make their trees disagree."
  ];
  W["In a random forest, what is the n_estimators hyperparameter?"] = [
    "Maximum tree depth is max_depth, a different hyperparameter.",
    "Features considered per split is max_features, not n_estimators.",
    "Bootstrap sample size is set by max_samples, not the tree count.",
    "The number of classes comes from the labels; no hyperparameter sets it."
  ];
  W["How does a random forest aggregate its trees' predictions for CLASSIFICATION (majority voting)?"] = [
    "Forests combine PREDICTIONS; raw feature values are never averaged or thresholded.",
    "No single tree decides; confidence grants no extra authority in a majority vote.",
    "Class labels aren't numbers to multiply; that garbles categories and matches no voting scheme.",
    "Depth confers no authority; every tree casts one equal vote."
  ];
  W["How does a random forest aggregate its trees' predictions for REGRESSION (averaging)?"] = [
    "Picking one tree by training error rewards the biggest overfitter; the forest averages everyone.",
    "Split thresholds are internal parameters, not predictions; nothing aggregates them.",
    "A raw sum grows with the tree count; the forest reports the mean, not a total.",
    "The min-to-max range measures spread, not a central estimate; the forest reports the mean."
  ];
  W["A random forest reports feature importances: income 0.41, age 0.22, postcode-ID 0.19… What is that impurity-based number actually measuring?"] = [
    "It tallies split gains inside the forest; it isn't a correlation statistic with the target.",
    "Shuffling a feature and watching validation drop is PERMUTATION importance — a different, sturdier method.",
    "It sums gains from splits at every depth, not just appearances at the root.",
    "Distinct-value counts aren't measured; high cardinality biases the score, but that's a flaw, not the metric."
  ];
  W["max_features controls how many features each split may consider. Sweep it from 1 to all 8 on a random forest — what is this knob really trading?"] = [
    "Compute and memory are side effects; the knob's real currency is how alike the trees end up.",
    "max_features doesn't set depth or a single tree's bias-variance; the trade plays out BETWEEN trees.",
    "Tree count and depth have their own knobs (n_estimators, max_depth); max_features touches neither.",
    "The setting is class-agnostic; it doesn't nudge votes toward the majority class."
  ];
  W["ExtraTrees ('extremely randomized trees') looks like a random forest with the dials turned further. What exactly does it randomise that a random forest doesn't?"] = [
    "A fixed per-tree feature pool is the random-subspace method; ExtraTrees still redraws features per split like a forest.",
    "ExtraTrees actually skips the bootstrap by default; its novelty is in the cut points, not row sampling.",
    "Stopping depth is normal hyperparameter territory; ExtraTrees doesn't randomise where trees halt.",
    "Votes stay equal; no variant randomises the trees' ballot weights."
  ];
  W["A random forest REGRESSOR predicts house prices. Each tree is a staircase of flat steps — so what does averaging 300 of them produce, and which tree limitation survives the averaging?"] = [
    "Averaging can't extrapolate: beyond the data every tree still outputs a training-leaf average, so the forest stays flat.",
    "Trees split in different places, so their steps land at different spots and the average genuinely smooths.",
    "Outside the range every tree flatlines at its edge leaf, so the average is flat there, not oscillating.",
    "Trees are piecewise-constant; no amount of averaging turns steps into one globally sloped line."
  ];
  W["Same tabular dataset, two strong candidates: random forest or gradient boosting. What's the honest one-line decision guide between them?"] = [
    "Swapped: forests train their trees in parallel; boosting is the sequential one.",
    "Reversed: forests average away variance, while boosting accumulates corrections to cut bias.",
    "Backwards on both counts: forests are the low-tuning option, and boosting overfits readily.",
    "No such size rule exists, and forest trees parallelise across cores trivially."
  ];
  W["A forest's feature_importances_ ranks a random 10,000-level customer ID hash ABOVE genuinely predictive features. What bias in impurity-based importances does this expose?"] = [
    "The bias runs the other way: MORE distinct values mean more candidate cuts and more unearned split wins.",
    "Importance sums gains across all depths; being tested near the root isn't why a random hash scores high.",
    "Impurity gain is scale-invariant for trees; raw integer magnitude never inflates the score.",
    "The cardinality bias is systematic, not sampling noise; hundreds more trees reproduce the same inflated ranking."
  ];
  W["Income and savings correlate at 0.9. Permutation importance gives income 0.31 and savings 0.02 — yet dropping BOTH craters the model far more than 0.33 suggests. What's the correlated-features trap, and its remedy?"] = [
    "Permutation UNDER-credits correlated twins (the intact one covers); nothing is double-counted, so dividing makes it worse.",
    "The distortion happens at permutation time, not split time; forcing split order is neither possible nor a fix.",
    "Nothing cancels inside the vote; subtracting the two scores has no statistical meaning.",
    "Backwards — leaning on the intact twin UNDERSTATES income, and shuffling both identically preserves the very link the test must break."
  ];
  W["A 500-tree forest almost never says '0%' or '100%' — its probabilities huddle between 10% and 90%, and reliability curves show an S-shape. Why does AVERAGING cause this signature, and when must you correct it?"] = [
    "Backwards: averaging diverse votes pulls scores toward the middle, since extremes need near-unanimity — under-confidence, not spikes.",
    "500 trees give fine-grained vote fractions, not coarse steps, and 'more classes' is no calibration remedy.",
    "Bootstrap draws are unbiased on average; there is no systematic drift below 50%.",
    "Forests average votes or probabilities, not impurity scores, and hard voting discards information rather than calibrating it."
  ];
  W["The OOB score promises 'free cross-validation' — each tree judged on the ~37% of rows its bootstrap missed. When is that promise honest, and in which two situations does OOB mislead?"] = [
    "More trees make OOB MORE reliable, and OOB rows stay unseen by their judges at any forest size — it never converges to training accuracy.",
    "Class imbalance isn't OOB's failure mode, and trees don't care about feature scaling at all.",
    "Deep trees still predict left-out rows sensibly; memorising the bootstrap doesn't zero their OOB scores.",
    "The ~37% left-out fraction is 1/e regardless of dataset size, and OOB works fine for classification."
  ];
  W["Isolation Forest flips the forest idea to hunt anomalies WITHOUT labels: random splits, and a score based on each point's average PATH DEPTH. Why does depth measure weirdness?"] = [
    "Inverted: outliers get cornered in FEW random cuts, so anomalies have SHORT paths, not long ones.",
    "Isolation Forest is unsupervised; there is no learned class boundary for a point to sit beyond.",
    "Depth counts the splits needed to isolate a point, not how many neighbours share its leaf.",
    "No centroids exist; the forest makes random splits and never computes distances."
  ];
  W["A demand-forecasting forest predicts 120 units, but ops needs 'we're 90% sure demand ≤ X' to set safety stock. Quantile Regression Forests answer this. What do they keep that ordinary forests throw away?"] = [
    "QRF is distribution-free; it never assumes normality or fits a Gaussian per prediction.",
    "It stores each leaf's raw target values, not residuals; no bootstrap of errors happens.",
    "The 500 tree MEANS cluster tightly; their spread badly understates the target's true distribution.",
    "One global symmetric band ignores that uncertainty varies per input; QRF reads quantiles from each point's own pooled targets."
  ];
  // --- Gradient Boosting & XGBoost ---
  W["Gradient boosting is an ENSEMBLE method. What does building an 'ensemble' mean?"] = [
    "Training one deep model longer never creates a group; an ensemble needs multiple members combined.",
    "Keeping one winner is model selection; an ensemble keeps and combines all members.",
    "Copies of the same model make identical errors, so averaging them changes nothing.",
    "Exhaustive threshold scanning is a single-tree training detail, not a way of combining models."
  ];
  W["A model scores 99% on its training data but only 71% on new unseen data. What is this gap called?"] = [
    "An underfit model scores poorly on BOTH sets; here training accuracy is near-perfect.",
    "Over-regularisation would depress the training score too; 99% on train shows no heavy penalty.",
    "Convergence means training settled — it says nothing about a 28-point generalisation gap.",
    "Imbalance distorts both scores alike; it doesn't open a train-versus-test chasm."
  ];
  W["In gradient boosting, what happens during a single BOOSTING ROUND?"] = [
    "Earlier trees are frozen the moment they're added; boosting never retrains them.",
    "No averaging or member pruning happens; trees are summed and all of them are kept.",
    "Cross-validation is an evaluation tool, not a step inside the boosting loop.",
    "The learning rate stays fixed during training; a round fits a tree to the current errors, not a schedule tweak."
  ];
  W["Boosting builds a 'weak learner' at each step. What does WEAK actually mean here?"] = [
    "Weak means low capacity by design, not the strongest model on a short clock.",
    "'Weak' describes the model's size, not the quality of the features it sees.",
    "Scaling predictions down is the learning rate's job; weakness is a property of the tree itself.",
    "Weak learners start shallow on purpose; there is no grow-deep-then-prune step."
  ];
  W["Gradient boosting trains its trees on the RESIDUALS. What is a residual, in plain terms?"] = [
    "The average prediction is the ensemble's OUTPUT, not the gap between it and the truth.",
    "Data held back for checking is a validation set; residuals are per-row training errors.",
    "Confidence measures certainty; a residual measures how far off the prediction is.",
    "Importance scores rank features; a residual is the leftover error on one example."
  ];
  W["Bagging (forests) and boosting both combine trees. What is the ONE structural difference between them?"] = [
    "Depth is a convention, not the structure — boosting typically uses SHALLOWER trees anyway.",
    "Averaging and majority voting both belong to bagging; boosting SUMS sequential corrections instead.",
    "Both methods are supervised; bagging fits labels just as much as boosting does.",
    "Both handle classification and regression alike; no task split exists."
  ];
  W["The learning rate in gradient boosting is set to 0.1. What does that small number do?"] = [
    "Dropping rows per tree is the subsample setting, a separate knob.",
    "Keeping a fraction of features is colsample-style sampling, not the learning rate.",
    "No error-threshold stop exists; the number of rounds is chosen by early stopping.",
    "Shrinkage applies to each tree DURING training; the final summed prediction stays full-scale."
  ];
  W["Unlike adding trees to a forest, adding boosting rounds CAN overfit. How do you pick when to stop?"] = [
    "A fixed round count ignores the data; the right stopping point differs per problem.",
    "Perfect training accuracy is the signature of overfitting — the very thing you're avoiding.",
    "The learning rate is constant; it never decays to zero to end training.",
    "Tree depth is fixed by a hyperparameter and has nothing to do with when to stop."
  ];
  W["Boosting also builds many models — but sequentially, not in parallel. What does each new member train to do?"] = [
    "Independent bootstrap samples are bagging's recipe; boosting members depend on the prior members' errors.",
    "Boosting targets the remaining ERRORS via residuals; it doesn't reweight the input features.",
    "No member averages the others; each one adds a fresh correction to the running sum.",
    "Members train on the leftover errors, not on the ensemble's certainty."
  ];
  W["Bagging and boosting both combine many trees, yet they cure opposite diseases. Which pairing is right?"] = [
    "Swapped: averaging independent fits calms variance, while sequential accumulation cuts bias.",
    "Only bagging cuts variance via bootstrap averaging; boosting's members are dependent, not independent fits.",
    "Bagging doesn't chase bias, and neither method grows progressively deeper trees.",
    "Moving one of the two is each method's whole point — bagging drops variance, boosting drops bias."
  ];
  W["In GRADIENT boosting specifically, what does each new tree get fitted to?"] = [
    "Bootstrap resamples of labels belong to bagging; gradient boosting targets the current errors.",
    "Upweighting hard cases on the original labels is AdaBoost's scheme, not gradient boosting's residual fit.",
    "Trees never copy structure; each fits fresh targets computed from the loss.",
    "Importance rankings are diagnostics, never a tree's training target."
  ];
  W["Gradient boosting's learning rate is set to 0.1 instead of 1.0, so each tree's correction counts only a tenth. Why would anyone slow learning down on purpose?"] = [
    "Opposite: shrinking each step means MORE trees are needed to converge, not fewer.",
    "The learning rate scales outputs; tree shape is set by depth parameters, not by shrinkage.",
    "Each round costs the same compute; a smaller multiplier changes nothing about speed.",
    "Overfitting is still possible at any rate; the validation curve can bend up, which is why early stopping remains needed."
  ];
  W["Boosting keeps adding trees, and after round 180 validation accuracy starts sliding while training accuracy still climbs. What's the standard response?"] = [
    "Bigger steps aggravate the overfitting that has already begun.",
    "Extra late-round capacity memorises noise even faster.",
    "Raising subsample toward 1.0 REDUCES randomness, and no added variety fixes an overgrown round count.",
    "Throwing away the validation set removes the only honest warning signal you have."
  ];
  W["What is gradient boosting?"] = [
    "Many deep trees in parallel on bootstrap samples is a random forest — boosting's structural opposite.",
    "Deepening one tree is not an ensemble and just overfits; no residual chain exists.",
    "The gradients act on PREDICTIONS in function space, not on the input features.",
    "Gradient boosting is supervised prediction, not a clustering method."
  ];
  W["What is boosting?"] = [
    "Independent learners trained in parallel and averaged is bagging, not boosting.",
    "The name has nothing to do with growing step sizes; the learning rate stays fixed.",
    "Clones add nothing; boosting builds DIFFERENT sequential specialists, not duplicates.",
    "'Boost' refers to strengthening weak learners, not upscaling the inputs' resolution."
  ];
  W["In gradient boosting, what is the learning rate (shrinkage)?"] = [
    "Tree depth is max_depth, a different hyperparameter.",
    "The row fraction per round is subsample, not the learning rate.",
    "The tree count is n_estimators (or the early-stopped round count), not the learning rate.",
    "Nothing about data streaming or memory; it's a multiplier on each tree's output."
  ];
  W["In boosting, what is an 'additive model'?"] = [
    "One tree plus a constant is still a single model; additive means MANY base learners summed stagewise.",
    "The additions happen to the PREDICTION, not to the dataset's feature columns.",
    "Combining two finished classifiers once isn't a stagewise sum built term by term to cut error.",
    "Noise injection is a robustness trick, unrelated to additive model structure."
  ];
  W["In boosting, what does 'sequential training' mean?"] = [
    "The order of training ROWS is irrelevant; the sequence is over learners, not data.",
    "Members all train on the same dataset, not on successive slices of a timeline.",
    "Adding features one at a time is stepwise feature selection, not boosting's learner dependency.",
    "Simultaneous training is impossible here: each learner needs its predecessors' errors before it can start."
  ];
  W["In gradient boosting, what is the 'loss gradient' (pseudo-residual) that each new tree is fit to?"] = [
    "Largest-minus-smallest is a range statistic; the gradient is a per-row derivative of the loss.",
    "Decision boundaries are geometric; this gradient is taken with respect to each prediction value.",
    "The derivative is with respect to PREDICTIONS, not to the feature values across the dataset.",
    "The learning rate doesn't decay in standard boosting; the pseudo-residual is a loss derivative, not a schedule."
  ];
  W["What is a decision stump?"] = [
    "A root with no splits makes one constant prediction; a stump has exactly ONE split and two leaves.",
    "Stumps are grown tiny on purpose, not left over after removing a split.",
    "Splitting on every feature once builds a much bigger tree; a stump uses one feature and one threshold total.",
    "Its two leaves predict DIFFERENT outputs; identical leaves would make the split pointless."
  ];
  W["In gradient boosting, what is 'early stopping'?"] = [
    "Depth limits cap one tree's growth; early stopping caps how many TREES the ensemble adds.",
    "The learning rate is constant; there is no decay-based stopping trigger.",
    "Early stopping halts additions; it never removes trees that were already added.",
    "Perfect training classification signals overfitting; the trigger is a stalled VALIDATION score."
  ];
  W["In gradient boosting, what does 'regularization' refer to?"] = [
    "Standardising features is preprocessing; trees don't need it and it constrains no complexity.",
    "No method requires evenly spaced training rows; that's not a real constraint.",
    "Rounding outputs is display formatting, not a limit on model complexity.",
    "Forcing identical trees would destroy the ensemble; regularisation limits complexity, not variety."
  ];
  W["What is subsampling in stochastic gradient boosting?"] = [
    "Downsampling the majority class targets label skew; subsampling draws uniformly from ALL rows.",
    "Coarse feature bins are histogram split-finding — a speed trick on columns, not row sampling.",
    "Merging consecutive rows creates new data points; subsampling only selects existing ones.",
    "Sampling a finished model's predictions is post-hoc uncertainty estimation, not a training-time regulariser."
  ];
  W["XGBoost took gradient boosting and made it the competition-winning standard. Which additions are its signature?"] = [
    "Independent deep trees on bootstrap samples is a random forest; XGBoost remains sequential boosting.",
    "XGBoost's base learners stay shallow trees (or linear terms), never small neural networks.",
    "Depth and learning rate are fully tunable in XGBoost; nothing is fixed at six.",
    "XGBoost's hallmark is SECOND-order (Newton) leaf solving per leaf — not first-order with one global line search."
  ];
  W["On 10 million rows, XGBoost-family libraries find splits dramatically faster than classic exact search. What's the core speed trick?"] = [
    "Presorting was the old exact method's optimisation — it still scans every unique value; histograms replaced it.",
    "Split finding uses all in-node rows; a 1% subsample would make the gain estimates far too noisy.",
    "Each round grows a fresh tree on new residuals, so old splits can't be recycled.",
    "All candidate features are still evaluated; only the per-feature CUT candidates shrink to bucket edges."
  ];
  W["Stochastic gradient boosting sets subsample=0.7, so each tree trains on a random 70% of rows. Why would deliberately showing each tree LESS data help?"] = [
    "It isn't just speed — validation accuracy typically IMPROVES below 1.0; the regularising effect is the point.",
    "Draws are random each round; rows recur across many trees and some get skipped repeatedly.",
    "The trees are binary regardless; row sampling doesn't touch split arity.",
    "Shrinkage and row sampling regularise in different ways; libraries use both together, not one instead of the other."
  ];
  W["Boosting libraries default to shallow trees — depth 3 to 6 — while a random forest happily grows its trees deep. Why does boosting specifically want WEAK learners?"] = [
    "Any tree's leaf outputs can be summed; addition doesn't care about depth.",
    "Residual gradients come from predictions and the loss; tree depth doesn't affect that math or convergence.",
    "Depth profoundly changes bias-variance behaviour; it's not a mere storage detail.",
    "No tree fits the gradient exactly; shallow trees are chosen to keep each step SMALL, not precise."
  ];
  W["XGBoost, LightGBM, CatBoost — three battle-tested gradient-boosting libraries. They share the same core algorithm, so what actually distinguishes them?"] = [
    "All three support the same standard (and custom) losses; objectives are shared, not proprietary.",
    "All three boost decision trees; none swaps in linear models or neural nets by default.",
    "LightGBM is gradient boosting through and through — the 'GBM' in its name says so.",
    "CatBoost is a tabular booster; its specialty is CATEGORICAL columns, not images or text."
  ];
  W["Gradient boosting is 'gradient descent in function space' — the loss is a plug-in module. Squared error, absolute error, Huber: how does the loss choice change what each boosting round chases?"] = [
    "The loss changes the GRADIENT each tree fits, so training targets differ per loss — it isn't just reporting.",
    "Depth is a separate hyperparameter; the loss shapes the residual targets, not the tree size.",
    "Trees can fit any numeric target; libraries boost absolute and Huber losses directly, no conversion needed.",
    "Regression losses differ exactly as described — squared and absolute error react to outliers very differently."
  ];
  W["XGBoost's stated edge over classic gradient boosting: it uses the loss's SECOND derivative too (Newton boosting). What do the second-order terms buy at each round?"] = [
    "Still one tree per round; the hessian refines that tree's LEAF VALUES, not the number of trees.",
    "Earlier trees stay frozen; Newton information shapes only the new tree's step, never a global re-solve.",
    "Shrinkage remains standard in XGBoost; eta is honoured, not made redundant.",
    "Log-loss has a non-constant hessian p(1-p); classification is precisely where Newton steps help."
  ];
  W["Your GBM denies a loan and the regulator asks 'why, for THIS applicant?'. Global importances can't answer. SHAP values can. What do they guarantee that ad-hoc explanations don't?"] = [
    "Split-frequency rankings are global importances — the very thing that can't answer a per-applicant question.",
    "SHAP decomposes the score among features; it says nothing about the model's uncertainty.",
    "SHAP gives every feature a signed share; collapsing to one headline cause abandons the additivity guarantee.",
    "A locally retrained surrogate is LIME's approach; SHAP values come from the actual model with exact additivity."
  ];
  W["You have 400 labelled examples and 40 features. XGBoost overfits within 30 rounds, whatever you set. When is gradient boosting the WRONG tool, and what actually wins on tiny tabular data?"] = [
    "No tuning conjures signal from 400 rows; the variance of sequential error-chasing remains whatever you set.",
    "Synthetic rows recycle the same information; they add no real signal and can amplify noise.",
    "Deep nets are even hungrier for data than boosting — the worst fit for a few hundred rows.",
    "Discarding 38 features throws away real signal, and hard boosting on 400 rows still overfits."
  ];
  W["LightGBM grows trees LEAF-WISE (always split the best leaf anywhere) while XGBoost historically grew LEVEL-WISE (complete each depth). Same split criterion — different growth order. What's the actual trade?"] = [
    "Balance doesn't guarantee generalisation; capped leaf-wise growth reaches lower loss per leaf and often wins.",
    "Gain-based best-leaf selection works for any differentiable loss, regression included.",
    "The greedy choices diverge — leaf-wise spends splits where level-wise wouldn't, producing genuinely different trees.",
    "LightGBM caps num_leaves, min_data_in_leaf and even max_depth; regularisation is very much available."
  ];
  W["You wire early stopping to your final TEST set ('stop when test error bottoms out') and report that bottom as the model's performance. The number is beautiful — and worthless. Why, and what's the clean protocol?"] = [
    "Early stopping itself is sound; the sin is stopping ON the very set you then report.",
    "No learning-rate value removes the selection bias of picking the test curve's minimum.",
    "A large test set shrinks the wiggle, but the reported minimum is still an optimistically selected point.",
    "A flat tail doesn't undo having chosen the best-looking point on that same data."
  ];
  // --- Stacking & Voting ---
  W["You have several trained models. An 'ensemble' does what with them?"] = [
    "Keeping one winner and discarding the rest is model selection, not an ensemble.",
    "Merging weights into one model isn't ensembling; PREDICTIONS get combined, not parameters.",
    "Members usually see the same data; partitioning features isn't what defines an ensemble.",
    "Ranking and reporting one top performer is a leaderboard, not a combination."
  ];
  W["Your models each predict a NUMBER (a price, not a class). How does an averaging ensemble combine them?"] = [
    "Picking one model's number discards the error-cancelling benefit that makes ensembles work.",
    "The maximum is biased upward; overshoots would never be damped.",
    "Exact numeric ties are vanishingly rare, so a 'most common number' barely ever exists.",
    "The training labels' median ignores the models' predictions entirely."
  ];
  W["In WEIGHTED voting, how is the final answer decided differently from plain voting?"] = [
    "Letting only the strongest vote reduces to one model; weighting keeps every vote, just scaled.",
    "Doubling everyone's votes changes neither the outcome nor the ties.",
    "No such turn-taking negotiation exists in voting ensembles.",
    "Weights adjust influence at combination time; no model gets retrained."
  ];
  W["In a stacking or voting ensemble, what are the 'base models'?"] = [
    "The base models are the whole committee, not a sole survivor after discarding.",
    "The blender is the META-model; the base models sit one level below it.",
    "Preprocessing transforms data; the base models are the predictors themselves.",
    "The training rows are data, not models; base models are trained ON those rows."
  ];
  W["What is 'blending' in ensemble learning?"] = [
    "Fixed equal-weight averaging trains nothing; blending FITS a meta-model on held-out predictions.",
    "Merging models' weights isn't blending; the models stay separate and only their predictions feed the blender.",
    "Retraining members on the previous one's residuals is boosting, not blending.",
    "Test data must stay untouched; blending's held-out slice comes from the TRAINING set."
  ];
  W["In stacking, what is the 'leakage' you must avoid?"] = [
    "Base models train independently on the features; peer predictions aren't part of their training or the danger.",
    "Test labels in the features is classic label leakage — real, but not stacking's specific trap.",
    "Training duration doesn't cause leakage; inflated in-sample scores do.",
    "Passing raw features to the meta-model is a legitimate option (passthrough), not leakage."
  ];
  W["The simplest way to combine models is VOTING. What does a voting ensemble actually do?"] = [
    "Keeping only the most accurate model is selection; voting counts EVERY model's answer.",
    "Training a model on the others' outputs is stacking — the upgrade beyond voting.",
    "The data isn't averaged; the models' predictions are tallied.",
    "Chaining models so each corrects the last is boosting, not a vote."
  ];
  W["Voting comes in 'hard' and 'soft' flavours. What's the difference?"] = [
    "Both flavours work with any classifier family; the split is labels versus probabilities, not trees versus linear.",
    "The difference is WHAT gets combined, not runtime; both are cheap tallies.",
    "Both are supervised combiners of trained classifiers; neither works without labels.",
    "Both handle any number of classes; there's no two-class restriction."
  ];
  W["Stacking trains a 'meta-model' on the base models' predictions. What job does the meta-model do?"] = [
    "Base models are frozen; the meta-model only learns to combine their outputs, never retrains them.",
    "Fixed equal weights is plain averaging — exactly what stacking replaces with LEARNED weights.",
    "Picking one winner wastes the other members; the meta-model blends all of them.",
    "Partitioning the data isn't its role; it consumes predictions, not rows."
  ];
  W["Stacking has a trap: how you generate the base predictions the meta-model trains on. What's the golden rule?"] = [
    "Predictions on a model's own training rows look near-perfect and teach the meta-model to over-trust memorisers.",
    "Training only on raw features abandons stacking; the base predictions ARE the meta-features.",
    "Pre-averaging collapses the information; the meta-model needs each model's separate opinion.",
    "Feeding the true labels as an input is total leakage — production data comes with no labels."
  ];
  W["An ensemble of five copies of the same model barely beats one copy. What single ingredient makes ensembles pay off?"] = [
    "Deep members can still share every blind spot; identical deep models gain nothing when combined.",
    "Five clones vote like one model; sheer count without disagreement is hollow.",
    "Training speed has no bearing on whether the members' errors cancel.",
    "Even near-perfect members fail together if identical; the payoff needs DIFFERENT errors, not just strong ones."
  ];
  W["Stacking goes beyond averaging: a logistic regression, a forest and a boosted model each make predictions, and then… what happens?"] = [
    "Multiplying and renormalising probabilities is a fixed formula; nothing is learned from data.",
    "Keeping only the most accurate model is selection, not combination.",
    "Retraining each model on the previous one's residuals is boosting; stacking's bases train independently.",
    "Fixed equal averaging is exactly what stacking exists to improve on with a LEARNED combination."
  ];
  W["Three classifiers vote on one case: model A says class 1 with 90% confidence; models B and C say class 0 — at 55% and 60%. Hard voting and soft voting now disagree. How does each decide?"] = [
    "The names are swapped: HARD is the label count, SOFT is the probability average.",
    "Hard voting never touches the stated confidences; it counts labels only.",
    "Vanilla soft voting doesn't weight members by validation accuracy, and hard voting doesn't average at all.",
    "Hard voting ignores confidence entirely, and soft voting needs no label majority — a strong average suffices."
  ];
  W["An ensemble only helps if its members make DIFFERENT mistakes. Ranked honestly, where does the strongest diversity come from?"] = [
    "Reseeded twins share their family's structural blind spots, so their errors stay heavily correlated.",
    "A stronger single member adds no NEW kinds of error; diversity is about disagreement, not lower bias.",
    "Identical inputs create no disagreement by themselves; varied families or data views are what add diversity.",
    "Clones vote in chorus; member count without disagreement adds almost nothing."
  ];
  W["What is stacking (stacked generalization)?"] = [
    "'Stacking' names model LEVELS; it isn't piling trees on each other to grow one deeper model.",
    "Fixed equal-weight averaging lacks the learned combiner that defines stacking.",
    "Training models in sequence on residuals is boosting, not stacking.",
    "Concatenating datasets stacks ROWS of data; stacking combines models' predictions."
  ];
  W["In a stacking ensemble, what is the meta-learner (blender)?"] = [
    "The meta-learner is a separate second-level model, not a promoted base member.",
    "A fixed always-average rule learns nothing; the blender is TRAINED on data.",
    "It consumes base predictions after they're made; it isn't a preprocessing step on raw data.",
    "Nothing is random; it learns one consistent combination from the data."
  ];
  W["In a voting ensemble, what is 'hard voting'?"] = [
    "Averaging probabilities is SOFT voting, not hard.",
    "Confidence plays no role in hard voting; it's one model, one label vote.",
    "Plain hard voting is unweighted — and training accuracy would be a leaky weight anyway.",
    "A plurality suffices; dissenting models still vote, they just lose."
  ];
  W["In a voting ensemble, what is 'soft voting'?"] = [
    "Counting discrete labels is HARD voting.",
    "No tie-breaking role exists; the averaged probability decides directly.",
    "Nothing is randomly selected; every member's probabilities enter the average.",
    "Rounding to 0/1 first destroys the confidence information — that just recreates hard voting."
  ];
  W["In stacking, what are 'out-of-fold predictions'?"] = [
    "Test-set predictions score the FINAL model; out-of-fold predictions cover the TRAINING rows via fold rotation.",
    "'Out-of-fold' refers to cross-validation folds, not values outside the valid probability range.",
    "All folds contribute equally; no fold is singled out as worst.",
    "Each row's prediction comes from the ONE model that didn't train on it, not from an average across folds."
  ];
  W["In ensembles, what is 'diversity' among the base models?"] = [
    "Hyperparameter search breadth describes tuning, not how the members' ERRORS correlate.",
    "Feature modality is a data property; diversity here is about the models' mistakes.",
    "Class balance describes the labels, not inter-model disagreement.",
    "Prediction speed says nothing about where the models err."
  ];
  W["In ensembles, what is 'model averaging'?"] = [
    "Averaging parameter weights needs identical architectures and isn't prediction averaging at all.",
    "Averaging accuracy scores produces a report, not a prediction.",
    "Blending datasets before one fit trains a single model; no models are combined.",
    "Picking the middling member combines nothing."
  ];
  W["In a voting ensemble, what is a 'weighted vote'?"] = [
    "Weights scale everyone's influence; no single member is handed the whole decision.",
    "Training-set size isn't a reliability measure and doesn't enter the tally.",
    "Training time doesn't indicate skill; weights typically track validation performance.",
    "Votes count for every class; no class-based filtering exists."
  ];
  W["What is a voting classifier (voting ensemble)?"] = [
    "Best-of-N restarts yields one model; a voting classifier keeps several distinct ones.",
    "A meta-model learning the combination is STACKING; voting uses a fixed rule.",
    "The models cast the votes, not the human user.",
    "Trees voting on row reweighting describes AdaBoost's loop, not a voting ensemble."
  ];
  W["When building the stacking meta-model's training data, the base models' predictions must come from OUT-OF-FOLD predictions. What goes wrong otherwise?"] = [
    "Correlated prediction columns are normal and harmless; the failure is inflated in-sample accuracy, not correlation.",
    "OOF stacking gives the meta-model a prediction for EVERY row; row starvation is blending's trade-off.",
    "Folds can be stratified; class balance isn't the leakage mechanism at work here.",
    "Backwards: in-sample predictions are unrealistically CLEAN, so the meta-model over-trusts — it doesn't underfit."
  ];
  W["Your best single model scores 91.0%. A carefully stacked 8-model ensemble reaches 92.1%. When is that 1.1-point gain worth shipping — and when isn't it?"] = [
    "A statistically real gain can still be a bad trade; serving cost and complexity always enter the decision.",
    "Distillation is one option, not a prerequisite; high-stakes settings can ship the stack as-is.",
    "The gain is real, not noise that extra models erase; the question is cost versus the price of errors.",
    "Stacked gains transfer to regression fine; task type isn't the deciding factor."
  ];
  W["Blending and stacking both train a meta-model on base-model predictions. The difference is WHERE those predictions come from. What's the actual distinction?"] = [
    "Reversed: BLENDING uses the single held-out slice, and STACKING rotates through the K folds.",
    "Blending trains a meta-model too; the difference is where its training predictions come from, not averaging.",
    "Both typically refit base models on the full data before deployment; that isn't the distinction.",
    "Neither method caps the number of base models."
  ];
  W["Kaggle winners sometimes stack in LAYERS: base models → meta-models → a final blender. Each extra layer adds less and risks more. What's the honest economics of deep stacks?"] = [
    "Gains shrink sharply after the first meta-layer; they don't compound or multiply.",
    "Each extra layer is another chance to fit validation noise; overfitting risk grows, it doesn't shrink.",
    "No universal three-layer sweet spot exists; most of the benefit arrives at layer one.",
    "Extra layers fit fine mechanically; the objection is economics and leakage risk, not mathematical impossibility."
  ];
  W["StackingClassifier has passthrough=True, which hands the meta-model the RAW FEATURES alongside the base predictions. When does that flag genuinely earn its keep?"] = [
    "Recalibration needs the probabilities themselves (plus labels); raw feature columns don't recalibrate anything.",
    "Extra raw columns INCREASE overfitting risk on small data; they add capacity, not regularisation.",
    "Agreement needs no tie-breaker; the flag's value is making trust depend on context.",
    "Passthrough does nothing about leakage; out-of-fold prediction remains mandatory."
  ];
  W["Stacking a demand forecaster, you generate out-of-fold predictions with standard shuffled 5-fold CV — on TIME-SERIES data. The stack's CV is stellar; production is a disaster. Where exactly did the time leak enter?"] = [
    "Scaling leakage is real but secondary; the collapse comes from folds letting base models train on the future.",
    "More shuffled folds still mix future into training; fold count doesn't restore time order.",
    "The meta-model isn't the leak; the base out-of-fold predictions were already future-informed.",
    "The stellar CV was computed before any final refit, so the optimism entered with the shuffled folds, not the refit."
  ];
  W["Soft voting averages predict_proba across members — but your committee mixes a calibrated logistic, an overconfident boosted model, and an under-confident forest. What silently goes wrong, and what's the pre-vote fix?"] = [
    "Backwards: timid mid-range scores get outvoted; it's the EXTREME, overconfident member that drags the average.",
    "All three already output 0-1 probabilities; the ranges match — it's their honesty that doesn't.",
    "Nothing is dropped from an average; moderate probabilities still count, they're just outshouted by extremes.",
    "The members' biases differ in direction and size, so nothing guarantees cancellation, and more members won't silence a systematic shouter."
  ];
  W["Your 12-model stack wins offline but can't ship: 40ms latency budget, one model's worth of memory. Knowledge distillation promises to keep (most of) the gain. What's the mechanism?"] = [
    "Hard 0/1 labels throw away the ensemble's graded confidence — the 'dark knowledge' that makes distillation work.",
    "The twelve models don't share one architecture, and weight averaging doesn't reproduce a function anyway.",
    "Pruning to three members still ships several models and loses more of the gain; that's ensemble pruning, not distillation.",
    "A per-row router must keep all twelve models loaded, blowing the one-model memory budget."
  ];
  W["Caruana's classic 'ensemble selection': from a library of 200 assorted fitted models, greedily add (WITH replacement) whichever model most improves the validation-set ensemble average; stop when nothing helps. Why does this crude loop beat elegant weight optimisation so often?"] = [
    "The search spaces differ fundamentally: greedy counts explore a tiny DISCRETE space, which is exactly why it overfits less.",
    "Averaging all 200 includes harmful models; selection's edge is choosing and zeroing members, not sheer count.",
    "Candidates are scored on the VALIDATION set; touching the test set would be malpractice, not the method.",
    "The library members are pre-fitted and frozen; nothing gets trained on residuals during selection."
  ];
})();
