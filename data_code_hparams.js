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
})();
