/* Coding mode — "Know the knobs": a hyperparameter guide, one page per model.
   For every model the coding drills use: the constructor signature, then each
   hyperparameter with WHAT IT MEANS (plain English) and WHAT IT DOES (which way
   to turn the dial, and what happens at each end). Rendered by app.js as the
   first breakdown on the Coding practice page. Loads before app.js. */
(function () {
  var H = (window.CODE_HPARAMS = window.CODE_HPARAMS || []);

  H.push({
    key: 'knn', model: 'k-Nearest Neighbours', cls: 'KNeighborsClassifier',
    imp: 'from sklearn.neighbors import KNeighborsClassifier',
    sig: "KNeighborsClassifier(n_neighbors=5, weights='uniform', metric='minkowski', p=2, algorithm='auto')",
    intro: 'Predicts by asking the k closest training points to vote. Every knob is about WHO counts as close and HOW MUCH their vote weighs — and none of them can save you if the features are not scaled first.',
    params: [
      { name: 'n_neighbors', def: '5',
        means: 'How many nearby training points get a vote on each prediction — the k in kNN.',
        does: 'Small k (1–3): jagged boundary that chases every noisy point — low bias, high variance, overfit risk. Big k: smooth boundary that can blur real structure toward the majority class — underfit risk. Use odd values to avoid tied votes, and tune it with cross-validation; it is THE knob for this model.' },
      { name: 'weights', def: "'uniform'",
        means: 'Whether every neighbour\'s vote counts equally, or closer neighbours count for more.',
        does: "'uniform': all k votes weigh the same. 'distance': votes are weighted by 1/distance, so a next-door neighbour outvotes one at the edge of the neighbourhood. 'distance' makes large k much safer (far neighbours fade out) and helps where class regions have different densities." },
      { name: 'metric + p', def: "'minkowski', p=2",
        means: 'The definition of "close" — how distance between two rows is measured.',
        does: 'p=2 is Euclidean (straight-line) distance, p=1 is Manhattan (grid-walk) distance, which is less dominated by one large coordinate difference. The metric only means anything when features share a scale — an unscaled income column (thousands) will drown an age column (tens), so StandardScaler comes first, always.' },
      { name: 'algorithm', def: "'auto'",
        means: 'The data structure used to FIND the neighbours: brute force, k-d tree, or ball tree.',
        does: 'Speed only — every option returns the same neighbours, so predictions never change. \'auto\' picks sensibly (trees for low-dimensional data, brute force for high-dimensional or sparse). Touch it only when prediction is too slow.' },
      { name: 'n_jobs', def: 'None',
        means: 'How many CPU cores the neighbour search may use.',
        does: '-1 uses every core. Pure speed knob: results are identical, the search just finishes sooner. Worth setting on big datasets, since kNN does all its work at prediction time.' }
    ]
  });

  H.push({
    key: 'logreg', model: 'Logistic Regression', cls: 'LogisticRegression',
    imp: 'from sklearn.linear_model import LogisticRegression',
    sig: "LogisticRegression(C=1.0, penalty='l2', solver='lbfgs', max_iter=100, class_weight=None)",
    intro: 'A linear score squashed through a sigmoid into a probability. The knobs are mostly one story: how hard the coefficients are squeezed toward zero (regularisation), and the machinery that fits them.',
    params: [
      { name: 'C', def: '1.0',
        means: 'INVERSE regularisation strength — how much the model is allowed to trust the training data.',
        does: 'The counter-intuitive one: SMALL C = STRONG squeeze (coefficients shrink toward zero, simpler model, underfit risk), BIG C = weak squeeze (coefficients grow freely, overfit risk). Tune on a log grid like 0.01, 0.1, 1, 10, 100 — and remember regularisation is only fair once features are scaled.' },
      { name: 'penalty', def: "'l2'",
        means: 'The SHAPE of the squeeze applied to the coefficients.',
        does: "'l2' shrinks every coefficient smoothly (the default, almost always fine). 'l1' drives weak coefficients to EXACTLY zero — built-in feature selection for wide, sparse data. 'elasticnet' blends the two. Each penalty needs a compatible solver: l1 wants liblinear or saga, elasticnet wants saga." },
      { name: 'solver', def: "'lbfgs'",
        means: 'The optimisation algorithm that actually finds the best coefficients.',
        does: 'Changes speed and which penalties are available — almost never the answer itself, since the loss has one global optimum. lbfgs: the default, great with l2. liblinear: small datasets, supports l1. saga: very large datasets, supports every penalty including elasticnet.' },
      { name: 'max_iter', def: '100',
        means: 'The optimiser\'s step budget — how long it may keep improving the fit before stopping.',
        does: 'Too low shows the famous "failed to converge" warning: the answer was not reached, not that it does not exist. Raise it (1000 costs little) or scale the features, which makes the optimisation landscape far easier to descend.' },
      { name: 'class_weight', def: 'None',
        means: 'How much each class\'s mistakes cost during fitting.',
        does: "The built-in imbalance lever: 'balanced' weights errors inversely to class frequency, so missing a rare positive hurts as much as missing many common negatives. The decision boundary shifts toward catching the minority — usually more recall, less precision." },
      { name: 'random_state', def: 'None',
        means: 'Seed for the solvers that shuffle data while fitting.',
        does: 'lbfgs is deterministic, but saga and liblinear shuffle — set a seed there for run-to-run reproducibility. Never affects model quality, only repeatability.' }
    ]
  });

  H.push({
    key: 'bayes', model: 'Naive Bayes', cls: 'MultinomialNB · GaussianNB · BernoulliNB',
    imp: 'from sklearn.naive_bayes import MultinomialNB, GaussianNB, BernoulliNB',
    sig: 'MultinomialNB(alpha=1.0, fit_prior=True)  ·  GaussianNB(var_smoothing=1e-9)  ·  BernoulliNB(alpha=1.0, binarize=0.0)',
    intro: 'Priors times independent per-feature likelihoods. Naive Bayes has famously few knobs — the ones it has are all about steadying probability estimates when counts are thin.',
    params: [
      { name: 'alpha', def: '1.0  (Multinomial / Bernoulli)',
        means: 'Laplace smoothing: fake extra sightings added to every feature count before probabilities are estimated.',
        does: 'alpha→0 trusts raw counts completely — sharp evidence but rare words get brutal near-zero likelihoods (and exactly 0 invites the zero-veto). Huge alpha drowns real counts, flattens every likelihood ratio toward ×1 and predictions sag toward the priors. Tune a log grid (0.01, 0.1, 1, 10) by cross-validation; sparse noisy data earns a bigger alpha.' },
      { name: 'fit_prior', def: 'True',
        means: 'Whether class priors are learned from the training class frequencies.',
        does: 'True: a 90/10 training split becomes a 90/10 prior — usually right. False: uniform priors, giving every class the same head start; useful when the training mix is artificial and no better estimate exists.' },
      { name: 'class_prior / priors', def: 'None',
        means: 'Hand-set priors that override the learned ones (class_prior on the count models, priors on GaussianNB).',
        does: 'The lever for training-vs-deployment base-rate mismatch: trained on balanced data but deploying where positives are 1%? Set the true rates here and the posterior arithmetic respects reality instead of the training folder mix.' },
      { name: 'var_smoothing', def: '1e-9  (Gaussian)',
        means: 'A pinch of the largest feature variance added to every per-class variance before fitting the bells.',
        does: 'Guards against near-zero variances: a feature that barely varies within a class would otherwise form an absurdly spiky bell whose density explodes or collapses off-spike. Raising it (1e-9 → 1e-8 → …) widens all the bells and calms overconfident likelihoods — GaussianNB\'s version of smoothing.' },
      { name: 'binarize', def: '0.0  (Bernoulli)',
        means: 'The threshold that converts each feature into the present/absent flag BernoulliNB requires.',
        does: 'Values above the threshold become 1, the rest 0 — so counts collapse to presence. Set None only when inputs are already 0/1. Remember Bernoulli also uses absence as evidence, which the threshold therefore defines.' }
    ]
  });

  H.push({
    key: 'tree', model: 'Decision Tree', cls: 'DecisionTreeClassifier',
    imp: 'from sklearn.tree import DecisionTreeClassifier',
    sig: "DecisionTreeClassifier(max_depth=None, min_samples_split=2, min_samples_leaf=1, criterion='gini', ccp_alpha=0.0, random_state=None)",
    intro: 'Greedy yes/no questions until the leaves are pure. Left alone it memorises the training set — so nearly every knob is a different way of saying STOP earlier.',
    params: [
      { name: 'max_depth', def: 'None',
        means: 'A hard cap on how many questions may be chained from root to leaf.',
        does: 'None grows until leaves are pure — on real data that means memorising noise (training accuracy 100%, validation sagging). Small depth = few questions = simple, possibly underfit. The first knob to tune: sweep 2…15 and watch the validation curve hump.' },
      { name: 'min_samples_leaf', def: '1',
        means: 'The minimum number of training rows every leaf must keep.',
        does: 'The default 1 permits leaves built around a single (possibly mislabelled) row — pure memorisation. Raising it to 5–50 outlaws those micro-leaves, forcing every prediction to rest on a real group of examples. One of the most effective single regularisers a tree has.' },
      { name: 'min_samples_split', def: '2',
        means: 'How many rows a node must contain before it is even allowed to ask another question.',
        does: 'Sibling of min_samples_leaf, acting a level higher: nodes smaller than this become leaves as-is. Raising it prunes the deep, thin branches that only ever served a handful of rows.' },
      { name: 'criterion', def: "'gini'",
        means: 'The impurity measure that scores candidate splits — how "mixed" a node is.',
        does: "'gini' and 'entropy' (or 'log_loss') almost always choose the same splits; gini skips a logarithm so it is marginally faster. Not the knob that fixes anything — tune depth and leaf sizes instead." },
      { name: 'max_features', def: 'None',
        means: 'How many features each split is allowed to consider when hunting the best question.',
        does: 'None considers everything — the greedy classic. Restricting it (e.g. \'sqrt\') injects randomness so different features get a turn; on a lone tree it is a mild regulariser, but inside a random forest it is THE decorrelation lever that makes averaging work.' },
      { name: 'ccp_alpha', def: '0.0',
        means: 'Cost-complexity pruning strength: how much accuracy a branch must earn to justify existing.',
        does: 'The grow-then-snip alternative to stopping early: at 0 nothing is pruned; raising it deletes branches whose improvement does not pay their complexity rent, shrinking the tree after the fact. Tune with a small grid alongside — or instead of — max_depth.' },
      { name: 'class_weight', def: 'None',
        means: 'How much each class\'s rows count when scoring splits.',
        does: "'balanced' makes rare-class rows count more, so splits that isolate the minority look worthwhile — the same imbalance lever as logistic regression, applied to impurity." },
      { name: 'random_state', def: 'None',
        means: 'Seed for tie-breaks between equally good splits (and for max_features sampling).',
        does: 'Trees are deterministic except for those ties — set a seed and the same data always yields the same tree. Essential for debugging and honest comparisons.' }
    ]
  });

  H.push({
    key: 'rf', model: 'Random Forest', cls: 'RandomForestClassifier',
    imp: 'from sklearn.ensemble import RandomForestClassifier',
    sig: "RandomForestClassifier(n_estimators=100, max_features='sqrt', max_depth=None, bootstrap=True, oob_score=False, n_jobs=None)",
    intro: 'Many deliberately different deep trees, averaged. The knobs split into two families: how MANY and how DIFFERENT the trees are (that is where the magic lives), and the usual per-tree stopping rules.',
    params: [
      { name: 'n_estimators', def: '100',
        means: 'How many trees are grown and averaged.',
        does: 'More trees = a smoother, more stable average — and unlike boosting, adding trees CANNOT overfit; the curve just flattens. The only cost is time and memory, so pick the largest count your patience affords (100–500 typical) and spend your tuning budget elsewhere.' },
      { name: 'max_features', def: "'sqrt'",
        means: 'How many randomly-chosen features each split may consider — the decorrelation lever.',
        does: 'THE knob that makes a forest more than bagged trees: restricting each split\'s menu ("sqrt" ≈ √p features) forces trees to use different evidence, so their errors disagree and averaging cancels them. Larger values → stronger but more similar trees; smaller → weaker but more diverse. The forest\'s main tuning knob after size.' },
      { name: 'bootstrap', def: 'True',
        means: 'Whether each tree trains on a bootstrap resample (drawn with replacement) instead of the full training set.',
        does: 'True gives every tree its own ~63%-unique sample of rows — the "bagging" half of the recipe, adding a second source of tree-to-tree disagreement. False trains every tree on identical rows, leaving max_features as the only randomness.' },
      { name: 'max_depth / min_samples_leaf', def: 'None / 1',
        means: 'The per-tree stopping rules — identical to a lone decision tree\'s knobs.',
        does: 'Forests deliberately grow trees DEEP (high variance is fine — averaging cancels it), so the defaults stay loose on purpose. Raise min_samples_leaf or cap depth mainly to cut memory and prediction time, or when data is extremely noisy.' },
      { name: 'oob_score', def: 'False',
        means: 'Score each tree on the ~37% of rows its bootstrap sample missed (out-of-bag rows).',
        does: 'True gives a free, honest validation estimate (.oob_score_) without touching your test set or running cross-validation — every row is judged only by the trees that never trained on it. Nearly free lunch; costs a little fit time.' },
      { name: 'n_jobs / random_state', def: 'None / None',
        means: 'Cores used to grow trees in parallel; seed for the bootstrap and feature sampling.',
        does: 'Trees are independent, so n_jobs=-1 parallelises beautifully. The seed makes the whole ensemble reproducible — same data, same forest.' }
    ]
  });

  H.push({
    key: 'gboost', model: 'Gradient Boosting', cls: 'GradientBoostingClassifier',
    imp: 'from sklearn.ensemble import GradientBoostingClassifier',
    sig: 'GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3, subsample=1.0)',
    intro: 'Small trees added one at a time, each fitting the errors the ensemble still makes. Because every round chases residuals, MORE of almost anything can overfit — the knobs are brakes, and the big two trade against each other.',
    params: [
      { name: 'learning_rate', def: '0.1',
        means: 'The shrinkage (eta): how much of each new tree\'s correction is actually applied.',
        does: 'The brake. Small values (0.01–0.1) mean each tree fixes only a sliver of the remaining error — slower learning, more rounds needed, almost always better generalisation. Large values sprint and overshoot. Classic recipe: lower the rate, raise the rounds, let validation pick the pair.' },
      { name: 'n_estimators', def: '100',
        means: 'How many boosting rounds — trees added to the chain.',
        does: 'Opposite personality to a forest\'s tree count: because each round fits what is left of the error, TOO MANY ROUNDS OVERFITS — training loss keeps falling while validation turns back up. Tune together with learning_rate, ideally with early stopping watching a validation set.' },
      { name: 'max_depth', def: '3',
        means: 'Depth of each individual weak learner.',
        does: 'Boosting wants SHALLOW trees (2–5): depth controls how many features may interact in one correction. Deep trees per round make a chain of strong learners that memorises fast. If a lone tree needs depth 10+, boosting will usually beat it with depth 3 and patience.' },
      { name: 'subsample', def: '1.0',
        means: 'The fraction of training rows each round sees (below 1.0 = stochastic gradient boosting).',
        does: 'Sampling rows each round (0.5–0.8) injects randomness that decorrelates successive corrections — a genuine regulariser that often lifts validation accuracy, and it trains faster too.' },
      { name: 'min_samples_leaf', def: '1',
        means: 'Minimum rows per leaf inside each small tree.',
        does: 'Same guard as in a lone tree: raising it stops rounds from carving corrections around single noisy rows. A secondary brake worth a small grid (1, 5, 20).' },
      { name: 'n_iter_no_change / validation_fraction', def: 'None / 0.1',
        means: 'Built-in early stopping: hold out a slice and stop when validation score stalls.',
        does: 'Set n_iter_no_change (e.g. 10) and the model stops adding rounds once the held-out slice stops improving — n_estimators becomes a ceiling instead of a promise, and the overfitting tail is cut off automatically.' }
    ]
  });

  H.push({
    key: 'xgb', model: 'XGBoost', cls: 'XGBClassifier',
    imp: 'from xgboost import XGBClassifier',
    sig: 'XGBClassifier(n_estimators=100, learning_rate=0.3, max_depth=6, subsample=1.0, colsample_bytree=1.0, reg_lambda=1.0, gamma=0)',
    intro: 'Gradient boosting, industrialised: same chain-of-corrections idea, plus explicit regularisation inside the objective and sampling on both axes. The knobs group into pace (rate × rounds), tree shape, sampling, and penalty.',
    params: [
      { name: 'learning_rate (eta)', def: '0.3',
        means: 'Shrinkage on each round\'s correction — XGBoost\'s default is deliberately fast.',
        does: 'Same brake as sklearn boosting but defaulting to 0.3: fine for quick experiments, usually lowered to 0.01–0.1 for serious fits (with more rounds). The single most impactful knob.' },
      { name: 'n_estimators + early_stopping_rounds', def: '100 / None',
        means: 'Boosting rounds, and the patience for stopping when an eval set stalls.',
        does: 'Set a big ceiling (1000+) and let early_stopping_rounds (e.g. 50) with an eval_set decide the real count: training halts when validation has not improved for that many rounds, and the best iteration is kept. Rounds without early stopping = overfitting risk, exactly like GradientBoosting.' },
      { name: 'max_depth', def: '6',
        means: 'Depth of each tree in the chain.',
        does: 'Deeper = higher-order feature interactions per round and faster overfitting; 3–8 is the practical band. Lower it before reaching for stronger penalties — shape first, then regularise.' },
      { name: 'subsample / colsample_bytree', def: '1.0 / 1.0',
        means: 'Fraction of ROWS each round sees, and fraction of COLUMNS each tree may use.',
        does: 'The two sampling dials: 0.6–0.9 on each injects forest-style disagreement into the chain, regularising and speeding training. colsample also stops one dominant feature from starring in every round — the boosting cousin of max_features.' },
      { name: 'reg_lambda / reg_alpha', def: '1.0 / 0',
        means: 'L2 and L1 penalties on the leaf weights, written directly into the training objective.',
        does: 'What the "regularised" in XGBoost refers to: lambda smoothly shrinks leaf outputs (on by default), alpha can zero some out entirely. Raise them when validation lags training and the sampling dials alone have not closed the gap.' },
      { name: 'gamma (min_split_loss)', def: '0',
        means: 'The minimum loss reduction a split must achieve before it is allowed to happen.',
        does: 'A pruning tax on splits: at 0 any improvement passes; raising it deletes marginal splits, making every tree in the chain more conservative. Tune on a log-ish grid (0, 0.1, 1, 5) when trees look too eager.' },
      { name: 'scale_pos_weight', def: '1',
        means: 'A multiplier on the positive class\'s gradient — XGBoost\'s imbalance lever.',
        does: 'Rule of thumb: set it near count(negatives)/count(positives) so the rare class\'s errors weigh as much as the common class\'s. The XGBoost counterpart of class_weight=\'balanced\'.' }
    ]
  });

  H.push({
    key: 'svm', model: 'Support Vector Machine', cls: 'SVC',
    imp: 'from sklearn.svm import SVC',
    sig: "SVC(C=1.0, kernel='rbf', gamma='scale', probability=False, class_weight=None)",
    intro: 'Draw the widest street between the classes; kernels let the street bend. Two knobs rule everything — C (how hard the margin is) and gamma (how local the kernel is) — and both are meaningless without scaled features.',
    params: [
      { name: 'C', def: '1.0',
        means: 'The price of a margin violation — how hard the margin is.',
        does: 'Small C: a wide, soft street that tolerates points inside or across it — strong regularisation, smoother boundary, underfit risk. Big C: violations punished severely, so the boundary contorts to classify every training point — overfit risk. Tune on a log grid (0.01…100), always jointly with gamma.' },
      { name: 'kernel', def: "'rbf'",
        means: 'The similarity function that implicitly lifts the data into a richer space where a line can separate it.',
        does: "'linear': a flat boundary — best for wide, sparse data (text) and huge feature counts. 'rbf': local bumps of similarity, the flexible default for tabular data. 'poly': polynomial interactions of a chosen degree. Start linear if p is large, rbf otherwise." },
      { name: 'gamma', def: "'scale'",
        means: 'The reach of the RBF kernel: how far one training point\'s influence extends.',
        does: 'BIG gamma = tiny reach: each support vector wraps a tight bump around itself, giving jagged islands — overfitting. SMALL gamma = broad reach: influences overlap into a nearly flat, almost linear boundary — underfitting. \'scale\' (1/(p·Var)) is a sane start; tune the C×gamma pair as one grid, never separately.' },
      { name: 'degree', def: '3',
        means: 'Polynomial order — used only when kernel=\'poly\'.',
        does: 'Higher degree = higher-order feature interactions and a bendier boundary, with overfitting arriving fast past 3–4. Ignored entirely by rbf and linear kernels.' },
      { name: 'probability', def: 'False',
        means: 'Whether predict_proba is available — SVMs natively output margins (decision_function), not probabilities.',
        does: 'True bolts on Platt scaling via an internal cross-validation: fitting gets noticeably slower and probabilities are calibrated approximations. Leave False when the class label or margin is all the pipeline needs.' },
      { name: 'class_weight', def: 'None',
        means: 'Per-class multiplier on C — how expensive each class\'s violations are.',
        does: "'balanced' raises the price of rare-class mistakes inversely to frequency, pushing the street toward the majority side so the minority is not swallowed. The SVM's imbalance lever." }
    ]
  });

  H.push({
    key: 'kmeans', model: 'k-Means', cls: 'KMeans',
    imp: 'from sklearn.cluster import KMeans',
    sig: "KMeans(n_clusters=8, init='k-means++', n_init='auto', max_iter=300, random_state=None)",
    intro: 'Place k centroids, assign points to the nearest, move centroids to the mean, repeat. You must choose k yourself — and because "nearest" is a distance, unscaled features quietly rig every assignment.',
    params: [
      { name: 'n_clusters', def: '8',
        means: 'The k — how many clusters the algorithm is ORDERED to find (it will find exactly that many, structure or not).',
        does: 'The decision the algorithm cannot make for you: sweep several k values and read the elbow of inertia or the peak of silhouette score. Too small merges real groups; too large slices real groups into arbitrary shards. Never trust a single unexamined k.' },
      { name: 'init', def: "'k-means++'",
        means: 'How the starting centroids are chosen before the first iteration.',
        does: "'k-means++' seeds centroids spread apart (each new seed prefers points far from existing ones), which mostly avoids the terrible starts random seeding produces — two centroids born inside one true cluster. Keep the default; 'random' exists mainly for teaching the failure." },
      { name: 'n_init', def: "'auto'",
        means: 'How many complete restarts to run, keeping the best result (lowest inertia).',
        does: 'k-Means only finds a LOCAL optimum — where it ends depends on where it starts. Multiple restarts with different seeds are the insurance policy; \'auto\' resolves sensibly (1 for k-means++, 10 for random). Raise it when clusterings look unstable between runs.' },
      { name: 'max_iter', def: '300',
        means: 'The cap on assign-then-move rounds within a single run.',
        does: 'Convergence (assignments stop changing) usually arrives long before 300 — this is a safety net, not a tuning knob. If runs genuinely hit the cap, the data likely has no clean k-cluster structure at that k.' },
      { name: 'random_state', def: 'None',
        means: 'Seed for the centroid seeding (and restarts).',
        does: 'Fix it and the same data gives the same clusters every run — essential once cluster labels feed anything downstream, since labels can otherwise permute or shift between runs.' }
    ]
  });

  H.push({
    key: 'hier', model: 'Hierarchical Clustering', cls: 'AgglomerativeClustering',
    imp: 'from sklearn.cluster import AgglomerativeClustering',
    sig: "AgglomerativeClustering(n_clusters=2, linkage='ward', metric='euclidean', distance_threshold=None)",
    intro: 'Start with every point as its own cluster and repeatedly merge the closest pair — the full merge history is a tree (dendrogram), and the knobs decide what "closest" means and where the tree is cut.',
    params: [
      { name: 'n_clusters', def: '2',
        means: 'Where to cut the merge tree — how many clusters to read off it.',
        does: 'Unlike k-Means the tree is built once and any cut is available afterwards; plot the dendrogram and cut where the vertical gaps are tallest (merges that cost the most). The default 2 is a placeholder, not a recommendation.' },
      { name: 'linkage', def: "'ward'",
        means: 'The definition of the distance BETWEEN two clusters (not between two points).',
        does: "The personality knob. 'ward': merge the pair whose union grows total variance least — compact, similar-sized blobs. 'complete': farthest-points distance, tight clusters. 'average': in between. 'single': nearest-points distance — follows chains and finds elongated shapes, but one noisy bridge can weld two real clusters together." },
      { name: 'metric', def: "'euclidean'",
        means: 'The point-to-point distance underneath the linkage.',
        does: "Ward mathematically requires 'euclidean'; the other linkages accept manhattan, cosine and friends — cosine is the classic choice for text vectors where direction matters more than length. And as ever with distances: scale the features first." },
      { name: 'distance_threshold', def: 'None',
        means: 'Cut the tree at a HEIGHT (merge distance) instead of at a cluster count.',
        does: 'Set it (with n_clusters=None) and the data decides how many clusters survive: everything closer than the threshold merges, everything farther stays split. Read a sensible height straight off the dendrogram\'s big gaps.' }
    ]
  });

  H.push({
    key: 'dbscan', model: 'DBSCAN', cls: 'DBSCAN',
    imp: 'from sklearn.cluster import DBSCAN',
    sig: "DBSCAN(eps=0.5, min_samples=5, metric='euclidean')",
    intro: 'Clusters are regions dense enough to matter; everything else is noise. No k at all — instead two knobs jointly DEFINE what "dense" means, and both read distances, so scaling is not optional.',
    params: [
      { name: 'eps', def: '0.5',
        means: 'The neighbourhood radius: how close two points must be to count as neighbours.',
        does: 'A REAL distance in feature units — meaningless before scaling. Too small: nothing reaches min_samples neighbours, everything is noise. Too large: neighbourhoods overlap everywhere and clusters fuse into one blob. Pick it from the k-distance plot: sort each point\'s distance to its k-th neighbour and take the elbow.' },
      { name: 'min_samples', def: '5',
        means: 'How many neighbours (within eps, self included) a point needs to qualify as a CORE point.',
        does: 'The density bar. Raising it demands denser regions: more points become border or noise, and thin bridges between blobs stop welding them together. Rule of thumb: at least the data\'s dimensionality + 1, higher on noisy data.' },
      { name: 'metric', def: "'euclidean'",
        means: 'The distance definition eps is measured in.',
        does: 'Change it and eps changes meaning entirely (an eps tuned for euclidean is nonsense under cosine). Choose the metric first, scale the features, then tune eps — in that order.' },
      { name: '(no n_clusters)', def: '—',
        means: 'DBSCAN has no cluster-count knob: the count EMERGES from density, and label -1 marks noise.',
        does: 'The trade for not choosing k: you choose density instead. Points in no dense region stay labelled -1 — outliers are allowed to remain outliers rather than being forced into the nearest cluster, which is half the reason to pick DBSCAN at all.' }
    ]
  });

  H.push({
    key: 'pca', model: 'PCA', cls: 'PCA',
    imp: 'from sklearn.decomposition import PCA',
    sig: 'PCA(n_components=None, whiten=False, svd_solver=\'auto\', random_state=None)',
    intro: 'Rotate the axes to point along the directions of greatest variance, then keep only the first few. One knob truly matters — how much to keep — and because variance is the whole criterion, standardise first or the biggest-unit feature wins the rotation.',
    params: [
      { name: 'n_components', def: 'None',
        means: 'How much of the rotated space to keep — a count of components, or a target share of variance.',
        does: 'The knob. An int keeps that many components (2 for plotting); a FLOAT between 0 and 1 is the elegant form — n_components=0.95 keeps however many components it takes to retain 95% of the variance, letting the data choose the count. None keeps everything (pure rotation, no reduction).' },
      { name: 'whiten', def: 'False',
        means: 'After projecting, rescale each kept component to unit variance.',
        does: 'Off, components keep their natural sizes (component 1 dominates). On, they are equalised — useful when a downstream model assumes comparable scales, at the cost of throwing away the very variance ordering PCA discovered. Leave off unless the next stage asks for it.' },
      { name: 'svd_solver', def: "'auto'",
        means: 'The linear-algebra route used to find the components: exact decomposition or fast randomised approximation.',
        does: "Speed only, in practice: 'auto' picks exact for small data and 'randomized' for big wide matrices, which is dramatically faster and accurate enough. Results are the same directions to within tiny numerical wiggle (and sign flips, which mean nothing)." },
      { name: 'random_state', def: 'None',
        means: 'Seed for the randomised solver.',
        does: 'Only meaningful when svd_solver ends up randomised — set it so repeated fits give identical components. Exact solvers ignore it.' }
    ]
  });

  H.push({
    key: 'tsne', model: 't-SNE', cls: 'TSNE',
    imp: 'from sklearn.manifold import TSNE',
    sig: "TSNE(n_components=2, perplexity=30.0, learning_rate='auto', init='pca', random_state=None)",
    intro: 'A map-drawing tool, not a model: it arranges points in 2-D so that NEIGHBOURS stay neighbours, sacrificing global distances to do it. The knobs steer what "neighbourhood" means and whether the optimisation lands well.',
    params: [
      { name: 'perplexity', def: '30.0',
        means: 'Roughly, the effective number of neighbours each point tries to keep close — the size of the neighbourhood being preserved.',
        does: 'THE t-SNE knob. Small (5): ultra-local focus — real clusters shatter into confetti. Large (50+): broader structure, local detail blurred, and it must stay below the number of points. Honest practice is to run several perplexities and only trust what persists across them.' },
      { name: 'learning_rate', def: "'auto'",
        means: 'The optimisation step size for laying points onto the map.',
        does: 'Badly set, the map lies in characteristic ways: too low and points crumple into one dense ball; too high and the layout explodes into evenly-spread noise. \'auto\' (n/early_exaggeration heuristic) largely retired this failure mode — keep it.' },
      { name: 'init', def: "'pca'",
        means: 'The starting arrangement the optimisation refines.',
        does: "'pca' starts from the linear map, so global placement is more stable and repeatable; 'random' starts from scratch and can scatter the same clusters differently every run. PCA init is simply the better default." },
      { name: 'n_components', def: '2',
        means: 'The dimensionality of the output map.',
        does: '2 for plots, occasionally 3. t-SNE is for LOOKING — its axes and inter-cluster distances carry no meaning, so its output is not a sensible feature set for downstream models (use PCA for that).' },
      { name: 'random_state', def: 'None',
        means: 'Seed for the initial layout and optimisation randomness.',
        does: 'Different seeds give visibly different (equally valid) maps — fix it for reproducible figures, and remember that cluster POSITIONS and BETWEEN-cluster gaps would differ next run: read grouping, never geometry.' }
    ]
  });

  H.push({
    key: 'stacking', model: 'Stacking', cls: 'StackingClassifier',
    imp: 'from sklearn.ensemble import StackingClassifier',
    sig: 'StackingClassifier(estimators=[...], final_estimator=LogisticRegression(), cv=5, stack_method=\'auto\', passthrough=False)',
    intro: 'Train diverse base models, then train a meta-learner ON THEIR PREDICTIONS. The whole design question is leakage: the meta-learner must only ever see predictions made on data the base model had not seen.',
    params: [
      { name: 'estimators', def: '(required)',
        means: 'The named base models whose predictions become the meta-learner\'s features.',
        does: 'Diversity is the point: models that err DIFFERENTLY (a linear model + trees + kNN) give the meta-learner disagreements worth arbitrating. Five similar tree ensembles stack poorly — their errors align, so there is nothing to reconcile.' },
      { name: 'final_estimator', def: 'LogisticRegression()',
        means: 'The meta-learner that combines the base predictions into the final answer.',
        does: 'Keep it SIMPLE: with only a handful of prediction-features and out-of-fold rows to learn from, a complex meta-learner just overfits the base models\' quirks. Logistic regression — effectively learned, well-calibrated weighted voting — is the default for good reason.' },
      { name: 'cv', def: '5',
        means: 'The internal cross-validation that generates OUT-OF-FOLD base predictions to train the meta-learner on.',
        does: 'The anti-leakage heart of stacking: each base model predicts each row from a fold it was not trained on, so the meta-learner sees honest predictions, not memorised ones. Skip this discipline (fit base models on everything, stack their training predictions) and the meta-learner learns to trust whoever memorised hardest.' },
      { name: 'stack_method', def: "'auto'",
        means: 'WHICH output of each base model feeds the meta-learner: probabilities, decision scores, or hard labels.',
        does: "'auto' prefers predict_proba, then decision_function, then predict. Probabilities carry confidence — a 0.51 and a 0.99 'yes' are very different evidence — so richer methods usually stack better than hard 0/1 votes." },
      { name: 'passthrough', def: 'False',
        means: 'Whether the meta-learner also receives the ORIGINAL features alongside the base predictions.',
        does: 'False: the meta-learner judges only the models\' opinions. True: it can learn "trust the kNN in this region of feature space" — occasionally a real win, always a bigger overfitting surface. Try False first.' }
    ]
  });
})();
