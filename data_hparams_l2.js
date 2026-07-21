/* Hyperparameters at Level 2 of every topic — one question per knob (or small
   knob group), each with a reveal so read+recall covers them as concepts.
   Pushed onto each topic's Part II array, so they sit at difficulty L2 in every
   mode's filter. Reveal names use the "<Model> knob: <param>" pattern to stay
   globally unique. Loads AFTER every base data file (before app.js). */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  function add(qk, q) { (Q[qk] = Q[qk] || []).push(q); }

  /* ===== kNN (Part II = medium) ===== */
  add('medium', {
    q: "kNN's n_neighbors is set very small (k=1). What behaviour follows?",
    choices: [
      "The boundary chases every training point, noise included — low bias, high variance, overfit risk",
      "The boundary becomes maximally smooth, blurring real class structure into the majority vote, no matter how the training points are arranged",
      "Predictions ignore the training data entirely and fall back on the overall class base rate",
      "Training slows dramatically because a single neighbour is much harder to index and find",
      "Ties become impossible to break, so the classifier refuses to answer on even-sized classes"
    ],
    explain: "k=1 copies the label of the single closest point — including mislabelled or noisy ones, so the decision boundary is jagged islands around individual examples. Big k has the opposite personality: smooth but potentially blurred. Tune k with cross-validation, using odd values to avoid ties.",
    simple: "One neighbour = one loud opinion. Whoever happens to be nearest decides everything, even if that point is a fluke. More neighbours = a calmer committee.",
    widget: { reveal: { name: "kNN knob: n_neighbors", formula: "small k → jagged/overfit · large k → smooth/underfit", text: "How many neighbours vote. Small k chases noise (high variance); large k blurs structure toward the majority (high bias). Tune by CV, prefer odd k." } }
  });
  add('medium', {
    q: "What does switching kNN's weights from 'uniform' to 'distance' change?",
    choices: [
      "Closer neighbours count for more — votes are weighted by 1/distance instead of equally",
      "The distance metric switches from Euclidean to Manhattan for every neighbour query and for every training point stored in the index",
      "Each feature is automatically rescaled so that all columns contribute equal distance",
      "The k parameter is chosen automatically from the local density around each point",
      "Faraway points are removed from the training set before any neighbours are searched"
    ],
    explain: "'uniform' gives every one of the k neighbours an equal vote; 'distance' weights each vote by 1/distance so a next-door neighbour outvotes one at the neighbourhood's edge. That makes large k much safer (distant members fade out) and helps where class regions differ in density.",
    simple: "Equal votes vs louder-when-closer. With 'distance', the neighbour standing next to you matters more than the one across the street.",
    widget: { reveal: { name: "kNN knob: weights", formula: "'uniform' = equal votes · 'distance' = votes × 1/d", text: "Whether all k neighbours vote equally or closer ones count more. 'distance' softens large k and handles uneven densities better." } }
  });
  add('medium', {
    q: "kNN's metric='minkowski' with p=2 versus p=1 — what is the difference, and what must be true before either means anything?",
    choices: [
      "p=2 is straight-line Euclidean, p=1 is grid-walk Manhattan — and the features must be scaled first",
      "p=2 doubles every distance while p=1 leaves them raw — and the labels must be one-hot encoded first",
      "p=2 is for two classes and p=1 for one-vs-rest — and the classes must be balanced first",
      "p=2 squares the vote weights while p=1 keeps them linear — and k must be even first",
      "p=2 uses two CPU cores and p=1 uses one — and the index must be a ball tree first"
    ],
    explain: "p is the Minkowski exponent: p=2 gives Euclidean distance, p=1 Manhattan — the latter is less dominated by one large coordinate difference. Either way distance is the whole model, so an unscaled income column (thousands) drowns an age column (tens): StandardScaler before kNN, always.",
    simple: "p picks how you measure 'close': as the crow flies, or along the streets. Neither is meaningful if one feature's units are a thousand times bigger than another's — scale first.",
    widget: { reveal: { name: "kNN knobs: metric & p", formula: "p=2 Euclidean · p=1 Manhattan · scale features first", text: "The definition of distance. Euclidean (p=2) or Manhattan (p=1) — and since distance IS the model, unscaled features rig every vote." } }
  });

  /* ===== Logistic Regression (logreg2) ===== */
  add('logreg2', {
    q: "Logistic regression's C is set to 0.01. What did you just ask for?",
    choices: [
      "STRONG regularisation — C is inverse strength, so small C squeezes coefficients hard toward zero",
      "Weak regularisation — small C lets the coefficients grow as large as the data suggests with no penalty term applied to them at all",
      "A learning rate of 0.01 for the gradient steps taken by the underlying solver",
      "A hard cap keeping every coefficient's absolute value below the number 0.01",
      "A class weighting where the positive class counts for one hundredth of the negative"
    ],
    explain: "C is the INVERSE of regularisation strength — the counter-intuitive part everyone trips on once. Small C = heavy squeeze = simpler model that may underfit; large C = light squeeze = trust the data, risk overfitting. Tune it on a log grid (0.01–100), with features scaled so the squeeze is fair.",
    simple: "Think of C as 'how much freedom the coefficients get'. C=0.01 is a tight leash; C=100 is a long one.",
    widget: { reveal: { name: "Logistic regression knob: C", formula: "small C = strong regularisation · big C = weak", text: "Inverse regularisation strength: small C squeezes coefficients toward zero (underfit risk), big C frees them (overfit risk). Log-grid tune with scaled features." } }
  });
  add('logreg2', {
    q: "When would you pick penalty='l1' over the default 'l2' in logistic regression?",
    choices: [
      "When you want built-in feature selection — l1 drives weak coefficients to exactly zero",
      "When you want every coefficient shrunk smoothly but none of them ever quite reaching zero",
      "When the classes are imbalanced and the minority needs its errors weighted more heavily",
      "When the solver keeps failing to converge and needs a larger iteration budget to finish",
      "When the features are unscaled and the penalty must adapt each column automatically"
    ],
    explain: "l2 shrinks all coefficients smoothly toward (but never to) zero. l1's absolute-value penalty has corners, so weak coefficients hit exactly zero — the model performs feature selection as it fits, ideal for wide sparse data. It needs a compatible solver (liblinear or saga); elasticnet blends both.",
    simple: "l2 turns every dial down a bit; l1 switches the least useful dials off entirely — leaving you a shorter list of features that matter.",
    widget: { reveal: { name: "Logistic regression knob: penalty", formula: "l2 = smooth shrink · l1 = exact zeros (selection) · elasticnet = blend", text: "The shape of the squeeze. l2 shrinks everything a little; l1 zeroes out weak features — free feature selection on wide data. Solver must match." } }
  });
  add('logreg2', {
    q: "Logistic regression warns 'failed to converge'. Which two knobs address it — and what do they actually govern?",
    choices: [
      "max_iter (the optimiser's step budget) and the solver choice — the fitting machinery, not the answer itself",
      "C and penalty — the warning means the regularisation is too strong for the data to support and must be relaxed before refitting",
      "class_weight and random_state — the warning means the classes were shuffled unevenly",
      "The learning_rate and n_estimators pair, exactly as in gradient boosting's tuning",
      "Nothing — the warning is cosmetic and the fitted model is always fully optimised anyway"
    ],
    explain: "The loss has a single global optimum; solvers differ only in how they reach it. 'Failed to converge' means the step budget ran out on the way — raise max_iter (1000 is cheap) or scale the features, which flattens the optimisation landscape. Solver choice (lbfgs default, liblinear small+l1, saga big+any penalty) governs speed and penalty support, rarely the result.",
    simple: "The warning says 'I ran out of steps before settling'. Give it more steps (max_iter) or an easier hill to descend (scaled features). The solver is the vehicle, not the destination.",
    widget: { reveal: { name: "Logistic regression knobs: solver & max_iter", formula: "convergence warning → raise max_iter, scale features", text: "The fitting machinery: solver picks the optimiser (and which penalties are legal); max_iter is its step budget. They change speed and convergence, not the target." } }
  });
  add('logreg2', {
    q: "What does class_weight='balanced' do to logistic regression on a 95/5 imbalanced dataset?",
    choices: [
      "Weights each class's errors inversely to its frequency, so rare-class mistakes cost ~19× more",
      "Resamples the training data by duplicating minority rows until both classes are equal in size",
      "Moves the decision threshold from 0.5 to the minority class's base rate of 0.05 at predict time",
      "Drops enough majority rows at random for the two classes to reach an exactly even split",
      "Rescales the features of the minority class so they spread across a wider numeric range"
    ],
    explain: "class_weight='balanced' multiplies each class's loss contribution by n_samples/(n_classes·count(class)) — no rows are added or removed; mistakes on the rare class simply cost more, so the fitted boundary shifts toward catching it. Typical effect: recall up, precision down on the minority. It is the in-model alternative to resampling.",
    simple: "Instead of copying rare examples or deleting common ones, it just makes rare-class errors more expensive — the model starts taking the 5% seriously.",
    widget: { reveal: { name: "Logistic regression knob: class_weight", formula: "'balanced' → error cost ∝ 1/class frequency", text: "The built-in imbalance lever: reweights the loss so rare-class mistakes hurt as much as many common-class ones. Boundary shifts toward the minority; recall rises, precision usually dips." } }
  });

  /* ===== Naive Bayes (bayes2) — alpha already covered; the remaining knobs ===== */
  add('bayes2', {
    q: "GaussianNB has almost no knobs — but var_smoothing exists. What problem does it patch?",
    choices: [
      "Near-zero class variances: it adds a pinch of the largest variance so no bell becomes an absurd spike",
      "The zero-count veto on unseen words, exactly as alpha does for the count-based variants like MultinomialNB and BernoulliNB on word counts",
      "Slow convergence of the mean estimates when features arrive in very different units",
      "Class imbalance: it smooths the priors toward uniform so rare classes are not ignored",
      "Correlated features: it inflates variances until the independence assumption holds true"
    ],
    explain: "If a feature barely varies within a class, its fitted bell is razor-thin — densities explode on the spike and vanish off it, making one feature dictate the whole posterior. var_smoothing adds a fraction (default 1e-9) of the LARGEST feature variance to every variance, widening all bells slightly. Raising it calms overconfident likelihoods — GaussianNB's cousin of Laplace smoothing.",
    simple: "A bell curve squeezed to a needle says 'impossible!' about perfectly ordinary values. var_smoothing fattens every bell a hair so no needle gets to veto the vote.",
    widget: { reveal: { name: "GaussianNB knob: var_smoothing", formula: "var += var_smoothing × max(feature variances)", text: "Adds a pinch of the largest variance to every per-class variance, so near-constant features can't form spiky bells with runaway densities. GaussianNB's version of smoothing." } }
  });
  add('bayes2', {
    q: "Naive Bayes was trained on a deliberately balanced 50/50 sample, but in production positives are 2%. Which knob fixes the mismatch?",
    choices: [
      "class_prior (or priors) — hand-set the real 2/98 base rates so the posterior respects deployment reality",
      "alpha — raise the smoothing until the balanced training mix stops influencing the likelihoods the model multiplies at predict time",
      "fit_prior=True — learning priors from the training folder automatically corrects the mismatch",
      "var_smoothing — widen the bells until both classes receive equal likelihood everywhere",
      "binarize — threshold the features so the balanced counts collapse into presence flags"
    ],
    explain: "fit_prior=True learns priors from training frequencies — which here are an artificial 50/50, so the model would massively over-predict positives. class_prior (priors on GaussianNB) overrides the learned priors with the truth: the likelihoods stay as trained, but the prior term in Bayes' rule reflects the 2% reality. fit_prior=False gives uniform priors — the same wrong answer here.",
    simple: "The model learned 'positives are half of everything' because that's what its training folder looked like. Tell it the real-world rate directly and the arithmetic snaps back to honest.",
    widget: { reveal: { name: "NB knobs: fit_prior & class_prior", formula: "fit_prior learns P(class) from training · class_prior overrides by hand", text: "Where the prior comes from: learned from training frequencies (fit_prior=True), uniform (False), or hand-set (class_prior/priors) — the lever for training-vs-deployment base-rate mismatch." } }
  });
  add('bayes2', {
    q: "BernoulliNB's binarize=0.0 does what to incoming word-count features?",
    choices: [
      "Turns each count into a present/absent flag: anything above the threshold becomes 1, the rest 0",
      "Removes every feature whose count is zero across the entire training corpus of documents, shrinking the vocabulary before fitting begins",
      "Caps every count at 1% of the document length so long documents cannot dominate",
      "Rounds every count to the nearest even integer to stabilise the probability estimates",
      "Standardises counts to zero mean and unit variance before the likelihoods are estimated"
    ],
    explain: "BernoulliNB models presence/absence, not counts — so binarize thresholds each feature first: values > 0.0 become 1 (present), the rest 0 (absent). Absence then acts as real evidence (an expected word that is missing counts against a class). Set binarize=None only when inputs are already 0/1. This threshold literally defines what 'present' means to the model.",
    simple: "Bernoulli only asks 'is the word there?'. binarize is the bar a count must clear to answer yes — and everything at or below the bar becomes an informative no.",
    widget: { reveal: { name: "BernoulliNB knob: binarize", formula: "value > threshold → 1, else 0 (None = already binary)", text: "The threshold converting counts to the 0/1 flags BernoulliNB needs. Defines what 'present' means — and therefore what counts as evidence-by-absence." } }
  });

  /* ===== Decision Trees (trees2) ===== */
  add('trees2', {
    q: "A decision tree with max_depth=None reaches 100% training accuracy. What is the knob's role in fixing the validation gap?",
    choices: [
      "It caps the question chain's length — bounding depth is the first, bluntest way to stop memorisation",
      "It increases the number of trees averaged together until the variance cancels out entirely across all of the resampled datasets",
      "It changes the split criterion from gini to entropy, which never overfits training data",
      "It reweights the classes so that the deep branches serve the minority class exclusively",
      "It has no effect on overfitting — depth only controls how fast the tree trains and predicts"
    ],
    explain: "Unlimited depth lets the tree keep asking questions until every leaf is pure — on real data that means branches built around individual noisy rows: 100% training accuracy, sagging validation. Capping depth bounds how specific the questions can get. Sweep 2–15 and watch the validation curve hump; combine with leaf-size minimums for finer control.",
    simple: "An unlimited game of twenty questions can single out every individual example — that's memorising, not learning. max_depth limits how many questions the tree may ask.",
    widget: { reveal: { name: "Tree knob: max_depth", formula: "None = grow till pure (memorise) · small = simple/underfit", text: "Hard cap on root-to-leaf question count. The first anti-overfitting knob: sweep it and pick the validation hump." } }
  });
  add('trees2', {
    q: "min_samples_leaf=25 changes a decision tree how?",
    choices: [
      "Every leaf must keep at least 25 training rows, so predictions always rest on a real group of examples",
      "Only nodes containing at least 25 rows may be split, but leaves themselves can hold a single row after the final split is made",
      "The tree keeps exactly 25 leaves in total, merging the least pure ones until the count fits",
      "Each split must consider at least 25 candidate features before it is allowed to happen",
      "The tree stops growing after 25 seconds of training time regardless of purity reached"
    ],
    explain: "min_samples_leaf is the leaf-size floor: any split that would create a leaf smaller than 25 rows is forbidden. That outlaws the one-row micro-leaves that pure memorisation builds around noise — one of the most effective single regularisers a tree has. Its sibling min_samples_split gates whether a node may even attempt a split.",
    simple: "No conclusions from a sample of one. Forcing every leaf to hold a couple of dozen rows means each prediction is backed by a crowd, not an anecdote.",
    widget: { reveal: { name: "Tree knobs: min_samples_leaf & min_samples_split", formula: "leaf floor / split gate — both outlaw micro-branches", text: "min_samples_leaf: the minimum rows every leaf keeps (kills one-row noise leaves). min_samples_split: the minimum rows a node needs to ask another question." } }
  });
  add('trees2', {
    q: "ccp_alpha=0.02 was set on a decision tree. What strategy is that, in contrast to max_depth?",
    choices: [
      "Grow the tree fully, then prune back every branch whose accuracy gain doesn't pay its complexity cost",
      "Stop growing early at a fixed depth chosen in advance of seeing any of the data's structure or how deep its useful patterns go",
      "Add 0.02 of Laplace smoothing to every leaf's class counts before predictions are made",
      "Randomly delete 2% of the training rows before fitting so the tree cannot memorise them",
      "Blend the tree's predictions with a logistic regression weighted at 0.02 of the vote"
    ],
    explain: "Cost-complexity pruning is grow-then-snip: build the full tree, then remove branches whose impurity improvement is less than alpha per leaf they add. Unlike early stopping (max_depth), pruning sees the whole tree before deciding what was worth keeping — a horizon-effect-free regulariser. Bigger alpha = harder tax = smaller tree; tune a small grid.",
    simple: "Instead of refusing to grow, let the tree sprawl — then charge every branch rent for the complexity it adds and evict the ones that don't earn it.",
    widget: { reveal: { name: "Tree knob: ccp_alpha", formula: "prune branch if gain < α × leaves added (grow, then snip)", text: "Cost-complexity pruning strength: 0 keeps everything; raising it deletes branches that don't pay their complexity rent. The after-the-fact alternative to depth caps." } }
  });
  add('trees2', {
    q: "Between criterion ('gini' vs 'entropy') and max_features, which is the impactful tree knob and why?",
    choices: [
      "max_features — restricting each split's menu injects randomness; gini vs entropy barely changes the splits",
      "criterion — entropy finds fundamentally better splits, while max_features only affects training speed on wide datasets",
      "Both equally — each one halves the tree's variance independently of the other's setting",
      "Neither — both are pure speed settings with no influence on the fitted tree at all",
      "criterion — but only because gini requires the features to be standardised beforehand first"
    ],
    explain: "Gini and entropy nearly always pick the same splits (gini skips a log, so it's marginally faster) — not the knob that fixes anything. max_features is different: limiting how many features each split may consider makes trees genuinely different from one another, which matters little alone but becomes THE decorrelation lever inside a random forest.",
    simple: "Gini vs entropy is two brands of the same ruler. max_features actually changes the game: each split only gets to look at some of the columns.",
    widget: { reveal: { name: "Tree knobs: criterion & max_features", formula: "gini ≈ entropy · max_features = the randomness lever", text: "criterion scores impurity (the options nearly always agree). max_features caps each split's feature menu — mild regulariser alone, the decorrelation engine inside forests." } }
  });

  /* ===== SVM (svm2) ===== */
  add('svm2', {
    q: "An SVM's C is cranked from 1 to 1000. What happens to the street?",
    choices: [
      "Violations become expensive, so the margin narrows and contorts to classify every training point — overfit risk",
      "The street widens generously, letting many training points sit inside it — underfit risk rather than any risk of overfitting",
      "Nothing changes until gamma is also raised, because C only acts through the kernel's reach",
      "The kernel switches from linear to RBF automatically once C crosses one hundred",
      "Class weights rebalance so that minority-class violations become one thousand times cheaper"
    ],
    explain: "C prices margin violations. Huge C punishes them severely, so the optimiser buys training accuracy at the cost of a narrow, wiggly street — classic overfitting. Small C tolerates violations, keeping the street wide and smooth even if a few points land inside or across it. Same 'inverse regularisation' direction as logistic regression's C — and tuned jointly with gamma, always on a log grid.",
    simple: "C is the fine for stepping onto the road. Tiny fine: relaxed wide street. Enormous fine: the road zigzags around every single pedestrian.",
    widget: { reveal: { name: "SVM knob: C (margin hardness)", formula: "small C = wide soft street · big C = narrow contorted street", text: "The price of a margin violation. Small C regularises (smooth, tolerant boundary); big C chases training points (overfit). Log-grid tune, jointly with gamma." } }
  });
  add('svm2', {
    q: "What does the RBF kernel's gamma control?",
    choices: [
      "The reach of each training point's influence — big gamma means tight local bumps, small means broad smooth ones",
      "The number of support vectors the optimiser is permitted to keep in the final model once the margin optimisation has finished running",
      "The polynomial degree used when the kernel lifts the data into a richer feature space",
      "The fraction of training rows sampled for each of the optimiser's internal iterations",
      "The price of violating the margin, exactly as the C parameter does on the other axis"
    ],
    explain: "gamma sets how quickly RBF similarity decays with distance. BIG gamma: influence dies fast, each support vector wraps a tight bump around itself — jagged islands, overfitting. SMALL gamma: influence spreads wide, bumps overlap into an almost linear boundary — underfitting. 'scale' (1/(p·Var)) is the sane start; tune C×gamma as one grid because they compensate for each other.",
    simple: "Each training point is a lamp; gamma is how far its light reaches. Short reach: a thousand tiny pools of light. Long reach: one big even glow.",
    widget: { reveal: { name: "SVM knob: gamma (kernel reach)", formula: "big γ = tight bumps/jagged · small γ = broad/near-linear", text: "How far one point's RBF influence extends. Big gamma overfits with tight islands; small gamma underfits toward a flat boundary. Tune jointly with C." } }
  });
  add('svm2', {
    q: "Choosing an SVM kernel for 30,000-dimensional sparse text features — which and why?",
    choices: [
      "'linear' — in very high dimensions the classes are usually already separable by a flat boundary, and it trains far faster",
      "'rbf' — more dimensions always demand more bumps, and the default is the default for a reason across every domain of data",
      "'poly' with degree 9 — text needs the highest-order feature interactions available",
      "Any kernel works identically here, because kernels only matter below one hundred dimensions",
      "'rbf' but with gamma set to zero so that its bumps flatten out into a plane"
    ],
    explain: "The kernel decides the boundary's vocabulary: 'linear' a flat hyperplane, 'rbf' local bumps, 'poly' interaction terms. In huge sparse spaces like bag-of-words, data is typically linearly separable already — RBF adds cost and overfitting surface for nothing. Heuristic: many features → linear first; modest features with curvy structure → rbf.",
    simple: "With thirty thousand columns you already have more directions than you know what to do with — a straight cut usually works. Save the bendy kernels for compact tabular data.",
    widget: { reveal: { name: "SVM knob: kernel", formula: "wide sparse data → linear · curvy tabular → rbf · interactions → poly", text: "The similarity function that shapes the boundary. Linear for high-dimensional sparse data (text); rbf as the flexible tabular default; poly for explicit interaction orders." } }
  });

  /* ===== Random Forest (rf2) ===== */
  add('rf2', {
    q: "Doubling a random forest's n_estimators from 200 to 400 does what?",
    choices: [
      "Smooths the average further and can only help accuracy (until it plateaus) — the cost is purely time and memory",
      "Doubles the overfitting risk, because a forest chases residual errors harder with every added tree that joins the ensemble",
      "Requires re-tuning max_features, since the two knobs must always be changed in tandem",
      "Halves each tree's depth automatically so that total model size stays exactly constant",
      "Nothing — extra trees beyond one hundred are silently discarded by the implementation"
    ],
    explain: "Forest trees are trained independently and averaged — adding more draws from the same distribution stabilises the average and monotonically improves (then plateaus). Unlike boosting rounds, trees can't compound into overfitting. So: set it as high as your compute tolerates and spend tuning effort on max_features instead.",
    simple: "It's asking more people the same question and averaging — more voices never make the average worse, they just take longer to poll.",
    widget: { reveal: { name: "Forest knob: n_estimators", formula: "more trees → smoother average, never overfits (just slower)", text: "How many independent trees are averaged. More is monotonically safe — the anti-knob. Contrast with boosting, where more rounds CAN overfit." } }
  });
  add('rf2', {
    q: "Why is max_features (default 'sqrt') called the forest's decorrelation lever?",
    choices: [
      "Limiting each split's feature menu forces trees to use different evidence, so their errors disagree and average away",
      "It removes the features that correlate with each other before any of the trees are grown",
      "It weights each tree's vote by how uncorrelated its predictions are with the other trees measured on the out-of-bag rows of the sample",
      "It shrinks the bootstrap sample so that no two trees can ever share a training row",
      "It decorrelates the classes by resampling until the labels are statistically independent"
    ],
    explain: "Averaging only cancels errors that DISAGREE. With every feature available, all trees split on the same dominant features and make the same mistakes — bagging alone leaves them correlated. Restricting each split to a random 'sqrt(p)' subset forces different trees down different paths; their diverse errors then cancel in the vote. Smaller = more diverse but weaker trees: the forest's main tuning knob.",
    simple: "A committee where everyone read the same one report agrees on the same wrong answer. Hand each member a different subset of the evidence and their mistakes stop lining up.",
    widget: { reveal: { name: "Forest knob: max_features", formula: "'sqrt' menu per split → diverse trees → errors cancel", text: "How many random features each split may consider. THE decorrelation lever: smaller menus make trees disagree, which is what makes averaging work." } }
  });
  add('rf2', {
    q: "What do bootstrap=True and oob_score=True jointly give a random forest?",
    choices: [
      "Per-tree resampled training sets, plus a free validation score from the rows each tree never saw",
      "Faster training on both counts, since each tree sees fewer rows and skips its validation pass over the held-out rows",
      "Guaranteed identical trees, since every bootstrap draw contains the same training rows",
      "A held-out test set carved from the data automatically, replacing train_test_split entirely",
      "Class rebalancing, because bootstrap draws oversample whichever class is rarest"
    ],
    explain: "bootstrap=True trains each tree on a with-replacement resample (~63% unique rows) — the 'bagging' half of the recipe and a second source of tree diversity. Each tree therefore missed ~37% of rows (its out-of-bag set); oob_score=True scores every row using only the trees that never trained on it: an honest, nearly-free validation estimate (.oob_score_) without touching your test set.",
    simple: "Every tree studies its own shuffled sample and skips about a third of the data — so that third can serve as that tree's exam. Pool the exams and the forest grades itself for free.",
    widget: { reveal: { name: "Forest knobs: bootstrap & oob_score", formula: "resample per tree (~63%) · OOB rows (~37%) = free validation", text: "bootstrap gives each tree its own resample (the bagging); oob_score turns the rows each tree missed into a free honest validation score." } }
  });

  /* ===== Gradient Boosting (gb2) ===== */
  add('gb2', {
    q: "Gradient boosting's learning_rate is dropped from 0.3 to 0.03. What is the standard accompanying move, and why?",
    choices: [
      "Raise n_estimators — each round now fixes a sliver of the error, so many more rounds are needed, and generalisation usually improves",
      "Lower n_estimators to match, keeping the product of the two knobs exactly constant for safety against accidental overfitting of the chain",
      "Raise max_depth to 10 so each individual round can compensate with far stronger corrections",
      "Switch the loss function, because small learning rates are incompatible with log-loss",
      "Nothing — the learning rate has no interaction with any other knob in boosting"
    ],
    explain: "learning_rate shrinks each new tree's contribution; at 0.03 each round applies only 3% of its correction, so reaching the same total fit needs roughly 10× the rounds of 0.3. The slow-and-many regime usually generalises better — small steps overshoot less. That is the classic recipe: lower the rate, raise the ceiling on rounds, and let a validation set (early stopping) pick where to stop.",
    simple: "Take smaller steps and you'll need more of them — but you're much less likely to trip. Turn the rate down, the rounds up, and let validation call time.",
    widget: { reveal: { name: "Boosting knob: learning_rate", formula: "shrinkage per round · lower rate ⇄ more rounds, better generalisation", text: "How much of each tree's correction is applied. The brake: small rates with many rounds nearly always generalise better than big greedy steps." } }
  });
  add('gb2', {
    q: "Why can gradient boosting's n_estimators overfit when a random forest's cannot?",
    choices: [
      "Boosting rounds fit what's LEFT of the error, so late rounds chase noise; forest trees are independent and just average",
      "Boosting trees are deeper by default, and depth is the only quantity that ever overfits in any tree-based ensemble method",
      "Forests use bootstrap sampling, which provably prevents any form of overfitting entirely",
      "Boosting lacks a random_state, so its extra rounds inject uncontrolled random variance",
      "It cannot — both ensembles behave identically as their tree counts increase without bound"
    ],
    explain: "The two knobs share a name and nothing else. Forest trees train independently on the same problem — averaging more of them only stabilises. Boosting is sequential: each round fits the CURRENT residuals, so once real signal is exhausted, further rounds fit noise — training loss keeps falling while validation turns upward. Cap rounds with early stopping (n_iter_no_change + validation_fraction) rather than faith.",
    simple: "A forest is a hundred people answering the same question — more people, steadier average. Boosting is one person obsessively correcting their own remaining errors — at some point the 'errors' left are just noise, and correcting those makes things worse.",
    widget: { reveal: { name: "Boosting knob: n_estimators (rounds)", formula: "rounds chase residuals → too many = overfit · use early stopping", text: "How many corrections are chained. Unlike forest trees, MORE ROUNDS CAN OVERFIT — pair with learning_rate and stop when validation stalls." } }
  });
  add('gb2', {
    q: "Boosting defaults to max_depth=3 while lone trees often need 10+. And subsample=0.7 — what are these two doing?",
    choices: [
      "Weak learners on purpose: shallow rounds each add a small correction, and row-sampling per round decorrelates the chain",
      "A speed hack only: shallow trees on partial data train faster but fit exactly the same model as the full-depth, full-data configuration",
      "Compensating for a small learning rate, which requires shallow trees by construction",
      "Preventing underflow: deep trees on full data would multiply probabilities below float range",
      "Matching the forest recipe: boosting and bagging always share identical tree settings"
    ],
    explain: "Boosting's power comes from CHAINING many weak corrections, so each tree is kept shallow (2–5 levels — depth bounds how many features interact per round). subsample < 1 is stochastic gradient boosting: each round sees a random ~70% of rows, injecting forest-style disagreement between successive corrections — a real regulariser that usually helps validation and always helps speed.",
    simple: "Lots of small dumb fixes beat a few big clever ones — that's the whole boosting bet. And letting each fix see a different sample of the data keeps the chain from marching in lockstep down a noise rabbit hole.",
    widget: { reveal: { name: "Boosting knobs: max_depth & subsample", formula: "shallow rounds (2–5) · rows sampled per round (<1 = stochastic)", text: "max_depth keeps each round weak (that's the point); subsample<1 gives every round a different row sample — stochastic boosting, a genuine regulariser." } }
  });

  /* ===== Stacking (stack2) ===== */
  add('stack2', {
    q: "StackingClassifier's cv=5 is described as the anti-leakage heart of stacking. What does it prevent?",
    choices: [
      "The meta-learner training on predictions the base models made about their OWN training rows — i.e. trusting whoever memorised hardest",
      "The base models sharing training rows with each other, which would correlate their errors and defeat the whole purpose of combining their votes",
      "The test set leaking into training, which is otherwise unavoidable in any ensemble",
      "The final estimator seeing the original features, which must remain hidden from it",
      "Class imbalance in the folds, which would bias the meta-learner toward the majority"
    ],
    explain: "The meta-learner must judge base models by how they predict UNSEEN rows. cv=5 generates out-of-fold predictions: each base model predicts each training row from a fold-fit that excluded it. Skip that (fit on everything, stack training predictions) and an overfit base model looks flawless — the meta-learner learns to trust the best memoriser, and the stack collapses on new data.",
    simple: "Never let a student grade their own homework. Each model's opinion about a row only counts if it hadn't studied that row — the chairperson then learns who is genuinely good, not who copied.",
    widget: { reveal: { name: "Stacking knob: cv (out-of-fold)", formula: "meta-learner trains on out-of-fold predictions only", text: "The internal CV that makes every base prediction an honest unseen-row prediction. Without it, stacking rewards memorisation and collapses at deployment." } }
  });
  add('stack2', {
    q: "Picking StackingClassifier's estimators and final_estimator — what's the guiding principle?",
    choices: [
      "Diverse bases (models that err differently) + a SIMPLE meta-learner, since it fits on few prediction-features",
      "Five copies of the strongest single model + a deep meta-learner to arbitrate their small differences in prediction",
      "Bases from the same family for consistency + a meta-learner at least as complex as the bases",
      "As many bases as possible regardless of kind + whichever meta-learner has the most parameters",
      "One base model only + an identical model stacked on top of it for double the fitting power"
    ],
    explain: "Stacking profits from DISAGREEMENT: a linear model, trees and kNN err in different places, giving the meta-learner real conflicts to arbitrate — five similar tree ensembles offer nothing to reconcile. And the meta-learner sees only a handful of prediction columns on out-of-fold rows, so complexity there just overfits the bases' quirks: logistic regression (learned, calibrated weighted voting) is the default for good reason.",
    simple: "Hire advisers who think differently, and make the chairperson simple: their whole job is deciding whom to trust when the advisers argue — not out-thinking the advisers.",
    widget: { reveal: { name: "Stacking knobs: estimators & final_estimator", formula: "diverse bases + simple meta (default LogisticRegression)", text: "Base models should err differently (diversity is the fuel); the meta-learner combining them should stay simple — it learns from few features and can only overfit their quirks." } }
  });
  add('stack2', {
    q: "What do stack_method='auto' and passthrough=False mean for what the meta-learner sees?",
    choices: [
      "It sees each base model's richest output (probabilities if available) and nothing but those predictions",
      "It sees hard 0/1 votes from every base model, plus every one of the original raw features from the training matrix",
      "It sees only the single most confident base model's output, chosen fresh for every row",
      "It sees the base models' training accuracies, which it uses as fixed voting weights",
      "It sees a random half of the base predictions each round, to regularise the combination"
    ],
    explain: "stack_method='auto' feeds the meta-learner each base's richest interface — predict_proba first, then decision_function, then plain predict. Probabilities carry confidence (a 0.51 'yes' and a 0.99 'yes' are different evidence), so richer beats harder votes. passthrough=False keeps the original features out: the meta-learner judges opinions only. True adds raw features — occasionally a win ('trust kNN in this region'), always a bigger overfitting surface.",
    simple: "The chairperson hears each adviser's confidence, not just their verdict — and by default doesn't get to peek at the raw case file, only at what the advisers concluded from it.",
    widget: { reveal: { name: "Stacking knobs: stack_method & passthrough", formula: "'auto' → probabilities in · passthrough adds raw features", text: "stack_method picks which base output feeds the meta-learner (probabilities carry confidence); passthrough optionally adds the original features — power and overfitting surface both." } }
  });

  /* ===== k-Means (kmeans2) ===== */
  add('kmeans2', {
    q: "k-Means' n_clusters must be chosen by you. What happens if the k is simply wrong, and how do you choose it?",
    choices: [
      "The algorithm still returns exactly k clusters, structure or not — so sweep k and read the inertia elbow or silhouette peak",
      "The algorithm detects the mismatch and returns fewer clusters, so any generous guess is safe to make in practice for most datasets",
      "Extra clusters stay empty and are dropped automatically, making overestimates harmless",
      "The run fails to converge, which is itself the standard signal that k was wrong",
      "Points that fit no cluster are labelled -1 as noise, so the wrong k is visible immediately"
    ],
    explain: "k-Means is obedient: order 7 clusters from 3-cluster data and it will manufacture 7, slicing real groups into shards (or merging them if k is too small) — with no error, no noise label, no complaint. The standard defence: run several k values and plot inertia (look for the elbow where improvement flattens) or silhouette score (look for the peak). Judgement, not automation, picks k.",
    simple: "Ask it for seven groups and you'll get seven, even if there are really three. It never argues — so you have to try a few k's and see where the numbers stop improving meaningfully.",
    widget: { reveal: { name: "k-Means knob: n_clusters", formula: "k is obeyed, never validated → sweep k, read elbow/silhouette", text: "The cluster count you must choose. k-Means always returns exactly k, so pick it by sweeping values and reading the inertia elbow or silhouette peak." } }
  });
  add('kmeans2', {
    q: "What do init='k-means++' and n_init guard against in k-Means?",
    choices: [
      "Bad starting centroids and unlucky local optima — smart spread-out seeding, plus restarts keeping the best of several runs",
      "Features on different scales, which the seeding procedure rescales before clustering starts so that no column dominates the distances",
      "Choosing the wrong k, which the restarts detect by comparing inertia across cluster counts",
      "Slow convergence on big datasets, which seeding fixes by starting from a random subsample",
      "Empty clusters, which can only ever appear when the seeds are drawn without replacement"
    ],
    explain: "k-Means only finds a LOCAL optimum — where it ends depends on where the centroids start. Random seeding can drop two centroids into one true cluster (permanently splitting it). 'k-means++' seeds spread apart: each new seed prefers points far from existing seeds. n_init runs the whole thing multiple times and keeps the lowest-inertia result — insurance against residual bad luck.",
    simple: "Where you place the first pins decides where the map settles. k-means++ spreads the pins sensibly; n_init throws the whole board a few times and keeps the best game.",
    widget: { reveal: { name: "k-Means knobs: init & n_init", formula: "k-means++ = spread seeds · n_init = restarts, keep best inertia", text: "Both fight local optima: k-means++ starts centroids spread apart; n_init restarts the algorithm and keeps the best run. Raise n_init if clusterings vary run to run." } }
  });
  add('kmeans2', {
    q: "k-Means' max_iter=300 and random_state — what do they actually govern?",
    choices: [
      "The safety cap on assign-and-move rounds per run, and the seed that makes the chosen clustering reproducible",
      "The number of clusters tried during the elbow sweep, and which silhouette variant scores them during model comparison",
      "The learning rate schedule of the centroid updates, and the momentum term stabilising them",
      "The maximum dataset size before subsampling kicks in, and which rows get subsampled",
      "The tree depth of the underlying index structure, and the hash seed of its buckets"
    ],
    explain: "Each run alternates assign-points → move-centroids until assignments stop changing; max_iter caps those rounds as a safety net (convergence usually arrives long before 300 — habitually hitting the cap hints the data lacks clean k-cluster structure). random_state seeds the centroid initialisation, making the whole clustering reproducible — vital once cluster labels feed anything downstream, since labels can permute between runs.",
    simple: "max_iter is 'stop fiddling after 300 rounds even if not settled'. random_state pins the shuffle so tomorrow's run gives today's clusters, not a relabelled remix.",
    widget: { reveal: { name: "k-Means knobs: max_iter & random_state", formula: "max_iter = round cap (safety) · seed = reproducible clusters", text: "max_iter caps assign/update rounds per run — a safety net, not a tuning knob. random_state pins seeding so the same data yields the same clusters and labels." } }
  });

  /* ===== Hierarchical (hier2) ===== */
  add('hier2', {
    q: "Agglomerative clustering's linkage knob is called its personality. What do 'ward' and 'single' each produce?",
    choices: [
      "ward: compact similar-sized blobs (least variance growth) · single: chains that trace elongated shapes but weld clusters over noise bridges",
      "ward: the fastest merges regardless of shape · single: the slowest merges but immune to any noise",
      "ward: clusters of exactly equal size by construction · single: one cluster per data point untouched",
      "ward: works on any distance metric freely · single: requires Euclidean distance and scaled data before any of the merging steps are allowed to begin running",
      "ward: bottom-up merging of points · single: top-down splitting from one root cluster"
    ],
    explain: "Linkage defines the distance BETWEEN clusters, and that choice is the algorithm's character. 'ward' merges the pair whose union grows total within-cluster variance least → compact, roundish, similar-sized groups (the default for a reason). 'single' uses the two closest points → it can follow chains and discover elongated shapes, but one noisy bridge of points welds two genuine clusters together. 'complete' (farthest points) and 'average' sit between.",
    simple: "How do you measure the distance between two GROUPS? By their closest members, farthest members, average, or by how much messier merging would make things. Each answer builds a differently-shaped family tree.",
    widget: { reveal: { name: "Hierarchical knob: linkage", formula: "ward = min variance growth · single = nearest points (chains)", text: "The cluster-to-cluster distance definition — the personality knob. ward: compact blobs; complete/average: middle ground; single: finds elongated shapes but chains across noise." } }
  });
  add('hier2', {
    q: "n_clusters=None with distance_threshold=12 — what way of cutting the dendrogram is that?",
    choices: [
      "Cut by HEIGHT: stop merging where merges would cost more than 12, letting the data decide how many clusters survive",
      "Cut by COUNT: return exactly 12 clusters regardless of how costly the merges were at any height of the dendrogram's tree",
      "No cut at all: return the full tree so every point remains its own singleton cluster",
      "Random cut: sample 12 candidate cuts and keep whichever gives the best silhouette",
      "Iterative cut: re-run the whole merge process 12 times and average the assignments"
    ],
    explain: "The tree is built once; the knobs only choose where to slice it. n_clusters slices to a fixed count. distance_threshold instead slices at a merge-cost height: everything closer than 12 merges, everything farther stays apart — so the cluster COUNT emerges from the data. Read a sensible height off the dendrogram where the vertical gaps are tallest (the merges that cost the most are the ones worth refusing).",
    simple: "Instead of demanding 'give me five groups', you say 'stop gluing things together once the glue gets expensive' — and however many groups that leaves is the answer.",
    widget: { reveal: { name: "Hierarchical knobs: n_clusters vs distance_threshold", formula: "cut by count, or cut by merge-cost height (data picks the count)", text: "Two ways to slice the one dendrogram: a fixed cluster count, or a distance threshold where the data decides the count. Read thresholds off the dendrogram's tall gaps." } }
  });
  add('hier2', {
    q: "Agglomerative clustering with linkage='ward' rejects metric='cosine'. Why, and where would cosine belong?",
    choices: [
      "Ward's variance mathematics only works in Euclidean space — cosine pairs with average/complete linkage, classically for text vectors",
      "Cosine is not a real metric anywhere in sklearn, so no linkage can ever accept it at all under any combination of settings whatsoever",
      "Ward requires unscaled data and cosine requires scaled data, so the two always conflict",
      "Cosine only works on binary features, which ward-linkage trees cannot split correctly",
      "It doesn't reject it — ward silently converts cosine distances to Euclidean internally"
    ],
    explain: "Ward merges to minimise the growth of within-cluster VARIANCE — a quantity defined via squared Euclidean distances, so metric='euclidean' is a mathematical requirement, not a preference. The other linkages (average, complete, single) compare raw pairwise distances and accept manhattan, cosine and friends. Cosine — direction over magnitude — is the classic choice for text/TF-IDF vectors, where document length shouldn't drive similarity.",
    simple: "Ward is built out of variance, and variance is built out of straight-line distance — no swapping the ruler. Want cosine for text? Use average or complete linkage instead.",
    widget: { reveal: { name: "Hierarchical knob: metric", formula: "ward ⇒ euclidean only · cosine + average/complete for text", text: "The point-to-point distance under the linkage. Ward mathematically requires Euclidean; other linkages accept cosine/manhattan — cosine being the text-vector classic." } }
  });

  /* ===== DBSCAN (dbscan2) ===== */
  add('dbscan2', {
    q: "How should DBSCAN's eps be chosen?",
    choices: [
      "From the k-distance plot: sort every point's distance to its k-th neighbour and take the elbow — after scaling the features",
      "Set it to 0.5 always, since the default is calibrated to any dataset's typical density",
      "Sweep it with the inertia elbow method, exactly as one chooses k for k-Means when the number of clusters is unknown in advance",
      "Derive it as the mean of all pairwise distances divided by the wanted cluster count",
      "Copy min_samples: the two parameters must always hold precisely the same value"
    ],
    explain: "eps is a REAL distance in feature units — the neighbourhood radius that defines 'close'. Too small: no point gathers min_samples neighbours, everything becomes noise. Too big: neighbourhoods overlap everywhere and clusters fuse. The k-distance plot makes the choice visual: distances to the k-th neighbour, sorted, bend sharply where dense regions end — that elbow is your eps. And since eps is a distance, unscaled features make it meaningless.",
    simple: "eps is the arm's length at which two points count as neighbours. Plot how far everyone's k-th neighbour is, look for where the curve suddenly climbs, and set your arm's length just below the climb.",
    widget: { reveal: { name: "DBSCAN knob: eps", formula: "neighbourhood radius → pick at the k-distance plot's elbow", text: "The radius defining 'neighbour' — a real distance, so scale first. Too small: all noise. Too big: one blob. The k-distance elbow is the standard picker." } }
  });
  add('dbscan2', {
    q: "Raising DBSCAN's min_samples from 5 to 25 does what?",
    choices: [
      "Raises the density bar for core points: sparser regions dissolve into noise and thin bridges stop welding clusters together",
      "Increases the neighbourhood radius so that each point reaches five times as many neighbours within the very same eps distance as before",
      "Forces the algorithm to return at least 25 clusters no matter how the density falls",
      "Only slows the neighbour search down, with no effect at all on the resulting clusters",
      "Converts the 25 densest points into fixed centroids around which clusters must form"
    ],
    explain: "min_samples is how many neighbours (within eps, itself included) a point needs to be CORE — the seeds clusters grow from. Raising it demands genuinely dense neighbourhoods: marginal regions lose their core status and fall to border or noise (-1), and a thin trickle of points between two blobs no longer carries a chain of cores that would weld them. Rule of thumb: at least dimensionality+1, higher on noisy data.",
    simple: "It's the bar for calling somewhere 'a crowd'. Raise the bar and thin gatherings stop counting — including the straggly line of points that was gluing two real crowds into one.",
    widget: { reveal: { name: "DBSCAN knob: min_samples", formula: "neighbours needed to be core · higher = stricter density, more noise", text: "The density bar: how many eps-neighbours make a core point. Raising it dissolves sparse regions into noise and cuts noise bridges between clusters." } }
  });
  add('dbscan2', {
    q: "Why must DBSCAN's metric be settled (and features scaled) BEFORE tuning eps?",
    choices: [
      "eps is measured IN that metric — an eps tuned under Euclidean is meaningless under cosine or on rescaled features",
      "The metric determines min_samples automatically, which in turn fixes eps by formula",
      "sklearn silently resets eps to 0.5 whenever the metric parameter is changed afterwards to protect users from mismatched settings",
      "Scaling changes the number of clusters DBSCAN is instructed to find, invalidating eps",
      "It needn't be — eps is a unitless ratio and survives any change of metric or scale"
    ],
    explain: "eps has units: it IS a distance under the chosen metric on the features as given. Change the metric (or rescale a feature) and every pairwise distance changes, so yesterday's carefully-elbowed eps now describes a different neighbourhood entirely. Order of operations: choose the metric, scale the features, then run the k-distance plot and tune eps — never the reverse.",
    simple: "eps is '0.5 of WHAT?' — half a metre means nothing if you switch to measuring in miles halfway through. Fix the ruler first, then choose the length.",
    widget: { reveal: { name: "DBSCAN knob: metric", formula: "metric first → scale → then tune eps (eps lives in that metric)", text: "The distance definition eps is measured in. Settle metric and scaling before tuning eps — changing either afterwards silently changes what eps means." } }
  });

  /* ===== PCA (pca2) ===== */
  add('pca2', {
    q: "PCA with n_components=0.95 (a float) keeps what?",
    choices: [
      "However many components it takes to retain 95% of the total variance — the data chooses the count",
      "Exactly 0.95 of the columns, rounded down to the nearest whole number of components",
      "The first component only, scaled up until it alone explains 95% of the variance",
      "All components whose individual explained-variance share exceeds ninety-five percent of the total variance",
      "95 components exactly, or every component when fewer than ninety-five exist"
    ],
    explain: "n_components is the one PCA knob that matters, and it has two modes: an int keeps that many components (2 for plotting); a float in (0,1) is a variance TARGET — keep adding components until their cumulative explained variance reaches 95%, letting the data decide the count. Check .explained_variance_ratio_ to see what each kept component actually carried. (And standardise first — PCA chases variance, so the biggest-unit feature otherwise wins the rotation.)",
    simple: "'Keep enough axes to preserve 95% of the story' — you set the level of detail, the data decides how many axes that takes.",
    widget: { reveal: { name: "PCA knob: n_components", formula: "int = count · float ∈ (0,1) = variance share to retain", text: "The only knob that matters: an integer keeps that many components; a float like 0.95 keeps however many are needed to retain that share of variance." } }
  });
  add('pca2', {
    q: "What does PCA's whiten=True add on top of the projection?",
    choices: [
      "Each kept component is rescaled to unit variance, equalising them for scale-sensitive downstream models",
      "The components are rotated back into the original feature space for interpretability by the people reading the results",
      "Noise components are deleted using a white-noise statistical significance test",
      "The projected data is shifted so every component has a strictly positive mean",
      "Nothing numerical — it only relabels the output columns with friendlier names"
    ],
    explain: "Plain PCA output keeps natural sizes: component 1 has the largest variance, and later ones shrink. whiten=True divides each component by its standard deviation, so all kept components come out with variance 1. Useful when the next stage assumes comparable scales (some clustering or distance-based models); the cost is discarding the very variance ordering PCA discovered. Leave it off unless the downstream step asks.",
    simple: "PCA hands you axes in order of loudness. Whitening turns all their volumes to the same level — handy for models that get distracted by loudness, wasteful when the loudness WAS the information.",
    widget: { reveal: { name: "PCA knob: whiten", formula: "divide each component by its std → all variances = 1", text: "Rescales kept components to unit variance. Helps scale-sensitive downstream models; erases the variance ordering PCA just found. Off by default for a reason." } }
  });
  add('pca2', {
    q: "PCA's svd_solver='auto' sometimes picks 'randomized'. What is being traded?",
    choices: [
      "Speed: randomised SVD is dramatically faster on big wide matrices, at the cost of tiny (harmless) numerical differences",
      "Accuracy: randomised results differ wildly between runs, and 'auto' accepts that noise for speed on sufficiently large data matrices",
      "Memory for interpretability: randomised components can no longer be mapped back to features",
      "Nothing: the two routes are byte-for-byte identical and 'auto' is a legacy alias only",
      "Bias for variance: randomised SVD regularises the components like ridge regression would"
    ],
    explain: "Exact SVD on a huge wide matrix is expensive; randomised SVD approximates the top components with high accuracy in a fraction of the time. 'auto' picks exact for small problems and randomised for big ones — in practice the same directions to within tiny numerical wiggle (plus meaningless sign flips). Set random_state when the randomised path is in play so repeated fits match exactly.",
    simple: "A shortcut through the linear algebra that lands within a hair of the exact answer, many times faster. For big data it's the sensible default — just pin the seed if you need identical reruns.",
    widget: { reveal: { name: "PCA knob: svd_solver", formula: "'auto': exact when small, randomized when big — speed only", text: "The linear-algebra route. Randomised SVD trades exactness for major speed on big matrices; directions agree to numerical wiggle. Seed it for reproducibility." } }
  });

  /* ===== t-SNE (tsne2) ===== */
  add('tsne2', {
    q: "t-SNE's perplexity is THE knob. What does setting it to 5 versus 50 change?",
    choices: [
      "The neighbourhood size being preserved: 5 fixates on ultra-local detail (clusters shatter), 50 favours broader structure (detail blurs)",
      "The learning rate of the layout optimiser: 5 crawls carefully while 50 sprints and overshoots past the arrangement it was trying to reach",
      "The number of output dimensions in the final map, from five axes up to fifty axes",
      "The random seed of the initial arrangement, restarting the optimisation five or fifty times",
      "The number of clusters the map is required to display when the layout finally settles"
    ],
    explain: "Perplexity is (roughly) the effective number of neighbours each point tries to keep close — the size of the neighbourhood whose geometry t-SNE preserves. Small values look through a microscope: fine local texture, but genuine clusters shatter into confetti. Large values step back: global grouping, local subtlety blurred (and perplexity must stay below the point count). Honest practice: run several perplexities and trust only the structure that persists across them.",
    simple: "It's the zoom level. Zoomed way in, every clique looks like its own island; zoomed out, only continents show. Look at a few zooms and believe what shows up in all of them.",
    widget: { reveal: { name: "t-SNE knob: perplexity", formula: "≈ effective neighbours preserved · small = shatter, large = blur", text: "THE t-SNE knob: the neighbourhood size being preserved. Run several values (5–50) and trust only clusters that persist across them." } }
  });
  add('tsne2', {
    q: "A t-SNE map came out as one dense crumpled ball. Which knob is the classic suspect?",
    choices: [
      "learning_rate set too low — the layout optimisation collapsed instead of spreading; 'auto' largely retired this failure",
      "perplexity above the number of points, which stacks every point onto a single spot at the very centre of the finished map",
      "n_components=2, which cannot help but crumple any data of more than two dimensions",
      "init='pca', which is known to fold the arrangement in half along the first component",
      "random_state unset, since unseeded runs always collapse toward the origin point"
    ],
    explain: "The layout is found by gradient optimisation, and learning_rate is its step size — with characteristic failure shapes: too LOW and points cannot spread apart, crumpling into a dense ball; too HIGH and the map explodes into structureless evenly-spread noise. learning_rate='auto' (a heuristic scaled to dataset size) has mostly retired both failures — keep it, and suspect it first when a map looks pathological.",
    simple: "Too-timid steps and everything stays huddled where it started; too-bold steps and the map flies apart. 'auto' picks a sane stride — crumpled or exploded maps say the stride was wrong.",
    widget: { reveal: { name: "t-SNE knob: learning_rate", formula: "too low → crumpled ball · too high → structureless spray · 'auto' fixes", text: "The layout optimiser's step size, with signature failure shapes at both extremes. The 'auto' heuristic is the modern default — keep it." } }
  });
  add('tsne2', {
    q: "Why prefer init='pca' and a fixed random_state for t-SNE — and what may STILL differ between runs?",
    choices: [
      "PCA init stabilises global placement and the seed makes runs repeatable — but cluster positions and gaps carry no meaning anyway",
      "They make the axes interpretable as principal components, so distances become meaningful across the whole of the finished embedding",
      "They guarantee identical maps at any perplexity, removing the need to try several values",
      "They let t-SNE output become features for downstream models, which random init forbids",
      "Nothing differs afterwards: seeded PCA-initialised t-SNE is fully deterministic forever"
    ],
    explain: "init='pca' starts the layout from the linear projection, so the coarse arrangement is stable and repeatable rather than scattered afresh each run; random_state pins the remaining stochasticity for reproducible figures. But read the fine print of t-SNE itself: axes, inter-cluster distances and absolute positions mean nothing — a different seed lawfully redraws the geography while preserving the grouping. Read WHICH points huddle together, never where or how far apart.",
    simple: "PCA-init and a seed give you the same picture tomorrow. Just remember what kind of picture it is: the neighbourhoods are real, the geography between them is decoration.",
    widget: { reveal: { name: "t-SNE knobs: init & random_state", formula: "init='pca' = stable start · seed = same map · geometry still ≠ meaning", text: "PCA initialisation stabilises the layout; the seed makes it reproducible. Even so: trust groupings, never axes, positions or between-cluster distances." } }
  });

  /* ===== XGBoost (xgb2) ===== */
  add('xgb2', {
    q: "XGBoost's eta (learning_rate) defaults to 0.3 — deliberately fast. What is the serious-fit recipe?",
    choices: [
      "Lower eta to 0.01–0.1, raise the round ceiling, and let early stopping on an eval set pick the true count",
      "Raise eta to 1.0 so that fewer rounds are needed and overfitting has less time to develop during the shortened training run",
      "Keep eta at 0.3 but double max_depth, which compensates for the shrinkage exactly",
      "Set eta equal to reg_lambda so the shrinkage and the penalty cancel each other out",
      "Randomise eta each round between 0 and 0.3 to decorrelate successive corrections"
    ],
    explain: "eta shrinks each round's correction — 0.3 suits quick experiments, but generalisation almost always improves in the slow-and-many regime: eta 0.01–0.1 with n_estimators set as a big ceiling (1000+) and early_stopping_rounds (e.g. 50) watching an eval_set. Training halts when validation stalls and keeps the best iteration — the rounds knob stops being a guess and becomes a measurement.",
    simple: "Turn the speed down, give it plenty of laps, and let the stopwatch (validation) say when to stop. The default 0.3 is for sketches, not final fits.",
    widget: { reveal: { name: "XGBoost knobs: eta & early_stopping_rounds", formula: "low eta + big round ceiling + early stopping on eval_set", text: "eta is shrinkage per round (default 0.3 is fast/rough); serious fits lower it and let early stopping on a validation set choose the round count." } }
  });
  add('xgb2', {
    q: "subsample=0.8 and colsample_bytree=0.8 in XGBoost — what are these two dials importing, and from where?",
    choices: [
      "Random-forest-style disagreement: each round sees a random 80% of rows, each tree a random 80% of columns — regularising the chain",
      "Nothing from anywhere: both are pure speed settings with no effect on the fitted model or on any of the predictions that it will go on to make",
      "Gradient clipping from deep learning: they cap the largest gradient contributions at 80%",
      "Class rebalancing from SMOTE: they resample the minority class up to 80% of the majority",
      "Pruning from decision trees: they delete 20% of the weakest branches after each round"
    ],
    explain: "They are the sampling dials: subsample draws a fresh row sample per round (stochastic gradient boosting), colsample_bytree a fresh column menu per tree — the boosting cousin of a forest's max_features. Both inject controlled disagreement into the chain: successive corrections stop marching in lockstep, one dominant feature can't star in every round, validation usually improves, and training gets faster into the bargain. 0.6–0.9 is the practical band.",
    simple: "Give every round a different sample of rows and a different subset of columns — forest tricks smuggled into boosting. Less lockstep, less overfitting, faster laps.",
    widget: { reveal: { name: "XGBoost knobs: subsample & colsample_bytree", formula: "row sample per round × column menu per tree (0.6–0.9)", text: "The two sampling dials: rows per round, columns per tree. Forest-style decorrelation inside the boosting chain — a real regulariser that also speeds training." } }
  });
  add('xgb2', {
    q: "reg_lambda, reg_alpha and gamma make XGBoost 'regularised' boosting. What does each penalise?",
    choices: [
      "lambda: L2 shrink on leaf weights · alpha: L1 that can zero leaves · gamma: a minimum gain a split must earn to exist",
      "lambda: the learning rate decay · alpha: the row sample rate · gamma: the column sample rate applied to each boosting round",
      "lambda: tree depth beyond six · alpha: rounds beyond one hundred · gamma: features beyond fifty",
      "All three cap the same quantity — total tree count — at three different strictness levels",
      "lambda: prediction magnitude · alpha: training time · gamma: memory usage of the booster"
    ],
    explain: "The penalties live INSIDE the objective — the 'regularised' in the name. reg_lambda (default 1, on by default) smoothly shrinks leaf output weights like ridge; reg_alpha (default 0) is the L1 twin that can zero some leaves entirely; gamma (min_split_loss) taxes structure itself — a split must reduce loss by at least gamma or it is not made, pruning as the tree grows. Reach for them when validation lags training and the sampling dials haven't closed the gap.",
    simple: "Two fines on how LOUD each leaf may speak (smooth shrink, or silence entirely), and one fine on whether a branch may exist at all unless it pulls its weight.",
    widget: { reveal: { name: "XGBoost knobs: reg_lambda, reg_alpha & gamma", formula: "L2 / L1 on leaf weights · gamma = minimum gain per split", text: "The in-objective penalties: lambda shrinks leaf weights (ridge-like), alpha can zero them (lasso-like), gamma is a split tax — no branch without at least that much gain." } }
  });
  add('xgb2', {
    q: "For a 1:40 imbalanced binary problem, what is XGBoost's scale_pos_weight and its rule-of-thumb value?",
    choices: [
      "A multiplier on the positive class's gradient — set it near count(negative)/count(positive), so about 40 here",
      "The ceiling on positive predictions per tree — set it to the positive class's row count observed in the training data split",
      "The probability threshold for the positive class — set it to 1/40 to match the base rate",
      "A duplicate-the-minority resampler — set it to 40 so positives are copied forty times",
      "The eta used only on positive rows — set it forty times smaller than the global eta"
    ],
    explain: "scale_pos_weight multiplies the loss gradient of positive examples, making each rare positive count as heavily as ~40 common negatives — the boosting equivalent of class_weight='balanced', applied inside the gradient computation rather than by resampling. neg/pos is the starting rule of thumb; tune around it against a metric that respects imbalance (PR-AUC, F1) rather than accuracy.",
    simple: "Make every rare 'yes' weigh as much as the forty 'no's it competes with. No rows copied, no rows deleted — the errors just cost accordingly.",
    widget: { reveal: { name: "XGBoost knob: scale_pos_weight", formula: "≈ count(neg)/count(pos) — reweights the positive gradient", text: "XGBoost's imbalance lever: multiplies the positive class's gradient. Start at neg/pos and tune against PR-AUC or F1, never plain accuracy." } }
  });

  /* ===== Model Selection (msel2) — the tuner's own knobs ===== */
  add('msel2', {
    q: "GridSearchCV's param_grid and cv together determine what?",
    choices: [
      "Which hyperparameter combinations get tried, and how honestly each one is scored (folds of cross-validation each)",
      "Which features enter the model, and how many components PCA keeps before the search",
      "How long training may run, and which random seed every candidate model must share",
      "The learning rate schedule, and the early-stopping patience of the winning model",
      "Which metric is optimised, and whether the winner is refitted on the full data at the end of the whole cross-validated search procedure"
    ],
    explain: "param_grid is the search space — every combination of the listed values is a candidate (so grids explode multiplicatively: 4 C's × 3 gammas × 2 kernels = 24 models × cv fits each). cv is how each candidate is judged: k-fold cross-validation, giving every combination an honest averaged score instead of one lucky split. Big grid × big cv = the compute bill; that trade IS the tool.",
    simple: "One knob lists everything you want tried; the other says how carefully each attempt is examined. Multiply them together and you've got your electricity bill.",
    widget: { reveal: { name: "GridSearchCV knobs: param_grid & cv", formula: "candidates = ∏ grid sizes · each scored by k-fold CV", text: "param_grid defines the combinations tried (they multiply!); cv scores each by k-fold cross-validation. Together: coverage × honesty = cost." } }
  });
  add('msel2', {
    q: "GridSearchCV's scoring='recall' with refit=True changes what about the search?",
    choices: [
      "Candidates are ranked by recall rather than the default score, and the winner is refitted on ALL training data ready to use",
      "The search reports recall alongside accuracy but still ranks every candidate by accuracy when it comes to choosing the final winning candidate",
      "Recall is maximised per fold while precision is maximised across folds simultaneously",
      "The winner is refitted repeatedly until its recall stops improving on the test set",
      "Nothing — scoring is cosmetic and refit merely re-verifies the already-chosen winner"
    ],
    explain: "scoring decides what 'best' MEANS — rank by recall and the search will happily trade precision away to catch positives; choose the metric that matches the problem's costs, or you tune toward the wrong goal efficiently. refit=True (default) then retrains the best combination on the entire training set, so .best_estimator_ is deployment-ready and .best_params_/.best_score_ record what won and by how much.",
    simple: "Tell the contest what winning means, or it crowns the wrong champion. Then refit hands you that champion retrained on everything, ready to work.",
    widget: { reveal: { name: "GridSearchCV knobs: scoring & refit", formula: "scoring = definition of 'best' · refit = winner retrained on all data", text: "scoring picks the metric candidates are ranked by (match it to the problem's costs); refit retrains the winner on the full training set for deployment." } }
  });
  add('msel2', {
    q: "RandomizedSearchCV's n_iter=50 buys what, compared to an exhaustive grid?",
    choices: [
      "Fifty random draws from the space — a fixed compute budget that samples broadly, often finding near-best settings a full grid can't afford to",
      "The fifty most promising combinations, chosen by a model of the search space's shape that is learned as the search progresses through the space",
      "Fifty repeats of the SAME best combination, averaging away the cross-validation noise",
      "A guarantee of finding the true optimum, since random search is exhaustive in the limit",
      "Fifty folds of cross-validation applied to every combination the full grid contains"
    ],
    explain: "Grid cost multiplies per knob; random search flips the deal — n_iter fixes the budget (50 sampled combinations, whatever the space's size), and parameters can be DISTRIBUTIONS (loguniform for C or eta) rather than hand-picked lists. Since a few knobs usually dominate, 50 random draws often land near-optimal where the equivalent grid would be unaffordably coarse or huge. Standard play: random search to find the neighbourhood, small grid to polish.",
    simple: "Instead of tasting every dish on an enormous menu, try fifty at random — you'll almost certainly find something excellent, at a price you chose in advance.",
    widget: { reveal: { name: "RandomizedSearchCV knob: n_iter", formula: "fixed budget of random draws · distributions allowed · then polish", text: "How many random combinations are sampled — cost is set by you, not by the grid's size. Broad random sweep first, small exact grid to finish." } }
  });

  /* ===== Feature Selection (fsel2) ===== */
  add('fsel2', {
    q: "SelectKBest(k=20) keeps which twenty features — and what is the k knob's blind spot?",
    choices: [
      "The 20 highest-scoring by a univariate test — judging each feature ALONE, so duos that only work together are missed",
      "The 20 that a full model fit found most important, interactions included at every step of the selection procedure it runs internally",
      "The first 20 columns of the dataframe, which is why column order matters so much",
      "A random 20, since the point of the transformer is to regularise by dropped features",
      "The 20 with the fewest missing values, breaking ties by each column's variance"
    ],
    explain: "SelectKBest scores every feature independently against the target (chi2, f_classif, mutual_info…) and keeps the top k. Fast and scale-friendly — but univariate: a feature that is useless alone yet powerful with a partner scores badly and gets cut, and one of two duplicated strong features is kept twice over. k itself is a hyperparameter: tune it by cross-validation inside a pipeline, not by taste.",
    simple: "It auditions every column solo and keeps the twenty best singers. Great bands whose members only shine together never make it past the audition.",
    widget: { reveal: { name: "SelectKBest knob: k", formula: "top-k by univariate score · blind to interactions · tune k by CV", text: "How many features survive the solo auditions. Univariate scoring is fast but misses feature teamwork — and k is itself a CV-tunable hyperparameter." } }
  });
  add('fsel2', {
    q: "RFE's n_features_to_select and step — what procedure do they steer?",
    choices: [
      "Fit the model, drop the weakest 'step' features, refit, repeat — until n_features_to_select remain",
      "Score all features once with a univariate test and keep the strongest n in a single pass over the columns",
      "Add features one at a time from an empty set until n are in, never removing any again",
      "Randomly mask features each round and keep whichever mask scored best after n rounds",
      "Cluster correlated features into n groups and keep each group's single best member"
    ],
    explain: "Recursive Feature Elimination works backwards from everything: fit the estimator, read its importances/coefficients, delete the weakest `step` features, refit on what's left, repeat until `n_features_to_select` survive. Because the model is refitted each round, features are judged in each other's COMPANY — interactions count, unlike univariate filters. The price is many refits; bigger step = faster but coarser. RFECV even chooses n for you by cross-validation.",
    simple: "Hold auditions with the whole orchestra playing: cut the least useful player, listen again, cut again — until the target headcount remains. Slower than solo auditions, but teamwork gets heard.",
    widget: { reveal: { name: "RFE knobs: n_features_to_select & step", formula: "fit → drop weakest 'step' → refit … until n remain", text: "Backwards elimination with refits: features judged in context (interactions count), at the cost of many fits. step trades speed for granularity; RFECV picks n by CV." } }
  });

  /* ===== Feature Engineering (feng2) ===== */
  add('feng2', {
    q: "OneHotEncoder(handle_unknown='ignore') — what deployment problem does that setting absorb?",
    choices: [
      "A category never seen in training appears in production — it encodes as all-zeros instead of crashing the pipeline",
      "Two categories collide into one column when their names differ only by capitalisation",
      "The encoder's output stops being sparse, which overflows memory on wide categoricals",
      "Missing values in numeric columns, which the encoder silently imputes with the mode",
      "Categories appearing in a different order at predict time, which permutes the columns of the encoded output matrix silently"
    ],
    explain: "The default (handle_unknown='error') throws the moment production data contains a category training never saw — 'Purple', a new store id, a typo — and pipelines fall over at 3am. 'ignore' encodes unknown categories as all-zeros: the row flows through with no signal from that feature rather than no service. The honest trade: silent zeros can hide upstream data drift you'd rather hear about — monitor for them.",
    simple: "Production will eventually send a value you've never seen. This knob decides between 'crash the request' and 'shrug, encode it as nothing, carry on' — and shrugging quietly is usually right, if you keep count of the shrugs.",
    widget: { reveal: { name: "OneHotEncoder knob: handle_unknown", formula: "'error' crashes on unseen category · 'ignore' → all-zero row", text: "What happens when prediction meets a category training never saw: crash, or encode as all-zeros and continue. 'ignore' keeps pipelines alive — monitor the zeros for drift." } }
  });
  add('feng2', {
    q: "SimpleImputer's strategy knob offers mean, median, most_frequent and constant. When does median beat mean?",
    choices: [
      "When the feature is skewed or has outliers — a few huge incomes drag the mean somewhere no real row lives, the median stays typical",
      "When the feature is categorical, since the mean of category codes is the natural centre",
      "When there are no missing values at all, as the median is then cheaper to compute",
      "Never — the mean is mathematically optimal for every distribution of missing data",
      "When missingness itself is informative, which the median encodes as a separate flag column that is appended to the transformed output matrix"
    ],
    explain: "Imputation fills gaps with a 'typical' value — and 'typical' is the knob. On skewed features (income, transaction size) a handful of extremes drag the mean above almost every actual row; the median stays where the data lives. most_frequent suits categoricals; constant (with add_indicator=True) is the honest choice when missingness itself carries signal. And like every fitted transformer: fit on train only, inside a pipeline.",
    simple: "Fill the blank with a 'normal' value — but 'normal' by which measure? Where a few billionaires skew the average, the median citizen is the better stand-in.",
    widget: { reveal: { name: "SimpleImputer knob: strategy", formula: "mean · median (skew-proof) · most_frequent · constant (+indicator)", text: "What 'typical' means when filling gaps: median resists skew/outliers, most_frequent serves categoricals, constant + add_indicator preserves 'was missing' as signal." } }
  });
  add('feng2', {
    q: "StandardScaler(with_mean=False) exists specifically for which situation?",
    choices: [
      "Sparse matrices (like bag-of-words) — subtracting the mean would turn every stored zero nonzero and explode memory",
      "Features already centred at zero, where subtracting the mean again would double-centre them",
      "Tree models, which require variance scaling but are broken by any mean subtraction applied to their input features beforehand",
      "Images, whose pixel means must be preserved for the colours to remain interpretable",
      "Small datasets, where estimating the mean is too noisy to be worth subtracting"
    ],
    explain: "A bag-of-words matrix is almost entirely zeros, stored sparsely — only the nonzeros exist in memory. Subtract each column's mean and every one of those zeros becomes a nonzero value: the sparse matrix densifies and memory detonates. with_mean=False scales by standard deviation only, preserving sparsity (zeros stay zero). The everyday reminder attached: whatever the settings, fit the scaler on the TRAINING split only and reuse it — fitting on everything leaks test statistics.",
    simple: "In a matrix that's 99.9% zeros, the zeros are free — until you subtract an average and they all become real numbers that need storing. Skip the centring, keep the scaling, keep your RAM.",
    widget: { reveal: { name: "StandardScaler knob: with_mean", formula: "False → scale only, zeros stay zero (sparse-safe)", text: "Turns off mean-centring so sparse data stays sparse — scaling by std alone. And always: fit on train only, apply everywhere." } }
  });
})();
