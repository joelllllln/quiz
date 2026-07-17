/* Hard mode: "which statement is actually TRUE?" questions. The hardest MCQ format —
   every option is a subtle technical claim that must be evaluated on its own; four are
   quietly false. Added to Part III question sets, one topic batch per hardening pass.
   Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  function tq(qk, q, correct, distractors, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple });
  }

  /* ===== K-Means (kmeans3) — pass 1 ===== */

  tq("kmeans3",
    "Which ONE of these statements about k-means convergence is actually TRUE?",
    "K-means always terminates, but only at a local optimum — the result can depend entirely on the starting centroids.",
    ["Given enough iterations, k-means is guaranteed to reach the globally optimal clustering for the chosen k.",
     "K-means can oscillate forever between two assignments unless an iteration cap forces it to stop.",
     "The k-means objective can increase during an update step whenever a cluster loses several members at once.",
     "Runs restarted from different seeds always converge to the same final inertia, just via different paths."],
    "Both steps can only lower inertia, and a bounded quantity that never increases must settle — so termination is guaranteed. But it settles in whichever basin the initial centroids chose: local optimum, not global, which is why different seeds give different answers (and why n_init exists).",
    "It always stops — but where it stops depends on where it started.");

  tq("kmeans3",
    "Which ONE of these statements about inertia and choosing k is actually TRUE?",
    "The best achievable inertia never increases as k grows — and at k = n it reaches exactly zero.",
    ["Inertia is minimised at the elbow, rising again once k passes the number of true clusters in the data.",
     "The silhouette score behaves like inertia, improving steadily as more clusters are added.",
     "Inertia is scale-invariant, so standardising the features beforehand leaves its value unchanged.",
     "When two runs use different k, the run with lower inertia found the better cluster structure."],
    "Each extra centroid can only help the objective, so best-case inertia falls monotonically until every point is its own centroid at zero. That's exactly why raw inertia can't choose k (there is no minimum at the 'right' k — only a bend), why silhouette (which can peak) exists, and why comparing inertia across different k is meaningless.",
    "More centroids can only ever tighten the fit — which is precisely why inertia alone can't pick k.");

  tq("kmeans3",
    "Which ONE of these statements about empty clusters in k-means is actually TRUE?",
    "A centroid can end an assignment step with no points at all — implementations must handle the empty-cluster case explicitly.",
    ["Every centroid always retains at least the single point that lies nearest to it after each assignment step.",
     "Empty clusters can only ever occur when k has been set larger than the number of data points.",
     "Using k-means++ initialisation makes empty clusters mathematically impossible in later iterations.",
     "An empty cluster makes the mean update undefined, so the algorithm automatically restarts from new seeds."],
    "Nothing reserves points for a centroid — every point goes to its nearest centre, and an unlucky centroid can be closest to nobody even with k far below n and k-means++ seeding. Libraries patch the case by re-seeding that centroid (commonly on a far point); it is a handled edge case, not an automatic restart.",
    "A centre can be left with an empty room even in a crowded house — the algorithm needs a rule for it.");

  tq("kmeans3",
    "Which ONE of these statements about k-means on one-hot encoded categoricals is actually TRUE?",
    "The computation runs fine — but the centroids stop being interpretable, becoming fractional blends like 0.3 London, 0.4 Paris.",
    ["Scikit-learn's KMeans raises an error when it detects that input columns contain only zeros and ones.",
     "Euclidean distance is mathematically undefined between binary vectors, so the assignment step cannot run.",
     "On one-hot data, k-means and k-modes are equivalent and always return identical cluster assignments.",
     "Centroids computed on one-hot columns always snap to valid category patterns of a single 1 per group."],
    "Means of 0/1 columns are perfectly computable — that's the trap. The result is a 'centroid' that is 30% one city and 40% another: not a customer that can exist. Nothing errors, nothing snaps to legal patterns, and k-modes (which uses modes and matching distance) genuinely differs — which is why it exists.",
    "The maths runs happily; it's the meaning that breaks.");

  tq("kmeans3",
    "Which ONE of these statements about MiniBatchKMeans is actually TRUE?",
    "It typically lands at slightly higher inertia than full k-means — the speed-up is bought with a small quality cost.",
    ["With the same random seed it is guaranteed to produce exactly the same clustering as full k-means.",
     "It usually reaches lower inertia than full k-means, because batch noise helps it escape local minima.",
     "It processes each data point exactly once, which is what makes its running time predictable.",
     "It requires class labels to construct balanced batches, making it partially supervised."],
    "Mini-batches give noisy centroid updates, so the final objective is usually a little worse than Lloyd's full passes — a trade the documentation states openly. The noise does not systematically beat full k-means, points can be sampled repeatedly across batches, and no labels are involved anywhere.",
    "Minutes instead of hours, in exchange for a slightly looser fit — that's the deal.");

  /* ===== k-Nearest Neighbours (hard) — pass 2 ===== */

  tq("hard",
    "Which ONE of these statements about KNN at k = 1 is actually TRUE?",
    "Training-set accuracy is 100% by construction — each point is its own nearest neighbour — which is exactly why training accuracy can't choose k.",
    ["At k = 1 the model underfits badly, since a single neighbour smooths away all of the local detail.",
     "Training accuracy peaks at a moderate k and falls off toward both extremes of the k range.",
     "At k = n, every prediction is decided by the single farthest training point from the query.",
     "Training accuracy is undefined for KNN, because the algorithm has no real training step to score."],
    "Score a training point and its own stored copy sits at distance zero — a guaranteed self-match, hence a perfect score that says nothing about generalisation. k=1 is maximum flexibility (overfitting, not underfitting), k=n is a global majority vote, and 'no training step' doesn't stop you scoring stored data.",
    "Everyone's nearest neighbour is themselves — so the exam is rigged and k must be chosen on held-out data.");

  tq("hard",
    "Which ONE of these statements about irrelevant features in KNN is actually TRUE?",
    "Adding a pure-noise feature can genuinely reduce accuracy, even though the informative features are untouched — distances get diluted by the noise dimension.",
    ["KNN automatically down-weights any feature that carries no signal about the label.",
     "Irrelevant features leave neighbour rankings unchanged, because their random differences average out across dimensions.",
     "Extra features can only help or do nothing, since distance then draws on strictly more evidence.",
     "Irrelevant features hurt KNN only when they happen to be correlated with the class label."],
    "Distance treats every dimension as equally meaningful — a noise axis adds random spread that can reorder who counts as 'nearest'. Nothing in vanilla KNN learns weights, the random differences add variance rather than cancelling, and an uncorrelated noise feature is precisely the harmful kind.",
    "The ruler measures every direction, including the meaningless ones — junk directions scramble the neighbours.");

  tq("hard",
    "Which ONE of these statements about KNN's decision boundary is actually TRUE?",
    "It is piecewise linear — stitched from segments of Voronoi-cell edges and their k-neighbour generalisations — however nonlinear the data.",
    ["It is always smooth, because averaging k votes rounds off any sharp corners in the boundary.",
     "With Euclidean distance the boundary reduces to a single separating hyperplane between the classes.",
     "The boundary passes exactly through every training point of the minority class by construction.",
     "For odd values of k, the boundary around each class is guaranteed to be convex."],
    "Regions of constant prediction are intersections of half-spaces (comparisons of squared distances are linear), so the boundary is a patchwork of flat pieces — jagged, not smooth; many pieces, not one hyperplane; and free to be wildly non-convex around any class.",
    "Zoom in and it's all straight little fence segments — arranged into as crooked a fence as the data demands.");

  tq("hard",
    "Which ONE of these statements about feature scaling and KNN is actually TRUE?",
    "Standardising can change which points are 'nearest' — the same data and k can yield a genuinely different classifier after scaling.",
    ["Scaling multiplies every pairwise distance by one shared constant, leaving all neighbour rankings intact.",
     "Only min-max scaling affects neighbour order; z-score standardisation preserves it exactly.",
     "Scaling changes KNN regression's predictions but never those of KNN classification.",
     "Neighbour rankings are invariant under any transformation that is monotone within each feature."],
    "Scaling stretches axes by different factors, so relative distances — and therefore neighbour rankings — genuinely change; that's the entire point of doing it. A single shared constant would preserve order, but per-feature scaling isn't one; both scaler families and both task types are equally affected.",
    "Change the units and you change the neighbours — that's why scaling is a modelling decision, not cosmetics.");

  tq("hard",
    "Which ONE of these statements about distance-weighted KNN is actually TRUE?",
    "It makes the exact choice of k less critical — distant neighbours receive vanishing weight, so extra neighbours contribute little.",
    ["It makes tied votes between classes more common, since weights rarely coincide exactly.",
     "It is undefined unless every feature has first been normalised onto the same scale.",
     "Its predictions become entirely independent of k once the weighting is applied.",
     "Weighting by distance turns KNN into a parametric model with a fixed set of learned weights."],
    "With 1/d-style weights, far neighbours barely register, so enlarging k adds near-zero influence — the k dial loses its sharp edge (and exact vote ties become vanishingly rare, the opposite of more common). k still matters at small values, no normalisation is mathematically required, and the 'weights' are computed per query, not learned parameters.",
    "Let closeness set the volume and the far seats can't shout — so how many seats you invite matters less.");

  /* ===== Logistic Regression (logreg3) — pass 2 ===== */

  tq("logreg3",
    "Which ONE of these statements about accuracy versus log loss is actually TRUE?",
    "Two models with identical accuracy can have very different log losses — accuracy ignores confidence while log loss prices it.",
    ["Log loss and accuracy always rank a set of competing models in exactly the same order.",
     "Log loss equals one minus accuracy whenever the model's probabilities are well calibrated.",
     "Improving a model's calibration necessarily changes at least some of its predicted labels.",
     "Log loss can be computed from the confusion matrix alone, without the raw probabilities."],
    "A model saying 0.51 and one saying 0.99 on the same correct predictions share an accuracy but differ hugely in log loss. The metrics can rank models differently, there is no algebraic identity linking them, calibration can shift probabilities without crossing the 0.5 line, and the confusion matrix has already thrown the probabilities away.",
    "Right for 51p and right for 99p count the same to accuracy — log loss checks the receipt.");

  tq("logreg3",
    "You double every weight AND the intercept of a fitted logistic regression. Which ONE statement is actually TRUE?",
    "Every predicted label at the 0.5 threshold stays the same, but every probability becomes more extreme.",
    ["All predicted probabilities remain unchanged, because the sigmoid renormalises the score.",
     "Labels near the decision boundary flip, while confident predictions stay as they were.",
     "This situation cannot arise: training constrains the weight vector to unit length.",
     "The effective decision threshold halves, moving from 0.5 down to 0.25."],
    "Doubling all coefficients doubles the log-odds z; sign(z) — and hence every 0.5-threshold label — is preserved, while σ(2z) pushes each probability further from ½. The sigmoid does not renormalise, nothing constrains the norm, and the threshold lives on the probability scale, untouched.",
    "Same verdicts, shouted louder.");

  tq("logreg3",
    "Which ONE of these statements about L2 regularisation and collinear features is actually TRUE?",
    "With an L2 penalty the optimum is unique even under perfect collinearity — the penalty breaks the tie among equivalent solutions.",
    ["Perfect collinearity always crashes the solver, penalty or not, because the problem is singular.",
     "The L2 penalty resolves a collinear pair by driving exactly one of the two weights to zero.",
     "Regularisation removes the collinearity from the data itself before the model is fitted.",
     "Under collinear features the predicted probabilities become mathematically undefined."],
    "Unpenalised, infinitely many weight vectors achieve the same fit on collinear features; adding λ‖w‖² selects the smallest-norm one — a unique minimum, typically splitting weight across the pair (it's L1 that zeroes one out). The data is untouched, the fit is stable, and predictions remain perfectly well defined.",
    "The penalty is the tie-breaker: among equally good answers, take the smallest one.");

  tq("logreg3",
    "Which ONE of these statements about odds ratios is actually TRUE?",
    "An odds ratio of 1.05 per unit can be an enormous effect — over 100 units the odds multiply by 1.05¹⁰⁰, roughly 131-fold.",
    ["Odds ratios are scale-free, so the size of a 'unit' never affects how they should be read.",
     "An odds ratio below 2 is by convention treated as statistically insignificant.",
     "An odds ratio of 1.05 means the probability rises by five percentage points per unit.",
     "Odds ratios compound additively: one hundred units raises the odds by 100 × 0.05 = 5."],
    "Per-unit effects compound multiplicatively, so a tiny-sounding ratio over a wide-ranging feature (income in pounds!) can be huge. The unit is everything, significance is about standard errors rather than any threshold of 2, odds are not probabilities, and the compounding is exponential, not additive.",
    "Five percent per step, a hundred steps — that's not five percent any more.");

  tq("logreg3",
    "Which ONE of these statements about class_weight='balanced' is actually TRUE?",
    "It changes the learned boundary AND distorts the predicted probabilities — recalibrate afterwards if you need honest risks.",
    ["It only moves the decision threshold at prediction time, leaving the fitted weights untouched.",
     "It physically duplicates minority rows in memory until the two classes are equal in size.",
     "The probabilities remain calibrated, since only the loss weighting changed and not the data.",
     "It is exactly equivalent to threshold tuning and therefore has no effect on the coefficients."],
    "Reweighting the loss tilts the whole fit toward the minority class — coefficients move, and the model now behaves as if the minority were common, so its probabilities overstate minority risk relative to reality. No rows are copied, and threshold moving is a genuinely different (post-fit) operation.",
    "The map was redrawn for a world with more fraud than yours — readjust before trusting its percentages.");

  /* ===== Naive Bayes (bayes3) — pass 2 ===== */

  tq("bayes3",
    "Which ONE of these statements about correlated features in Naive Bayes is actually TRUE?",
    "Correlated features double-count evidence, sharpening the posteriors — often without changing which class wins the argmax.",
    ["Correlated features flip the winning class first, and only later begin to distort the calibration.",
     "Naive Bayes probabilities are calibrated by construction, because Bayes' theorem itself is exact.",
     "The double-counting cancels symmetrically between the classes, leaving the posteriors honest.",
     "Feature correlation matters for GaussianNB but is irrelevant to the discrete NB variants."],
    "Counting near-duplicate evidence twice pushes posteriors toward 0 and 1 — overconfidence — while the ranking frequently survives, which is the classic 'good accuracy, poor calibration' signature. Bayes' theorem is exact only if the likelihood model is right, the distortion does not cancel, and every NB variant makes the same independence assumption.",
    "Hearing the same rumour from two friends isn't twice the evidence — but NB books it twice.");

  tq("bayes3",
    "Which ONE of these statements about GaussianNB's likelihoods is actually TRUE?",
    "A likelihood DENSITY can exceed 1 for a feature value — densities aren't probabilities, and the computation remains perfectly valid.",
    ["A density above 1 signals that the class's variance was estimated incorrectly from the data.",
     "GaussianNB clips any density at 1.0 so the posterior arithmetic cannot overflow.",
     "The probability of observing a temperature of exactly 98.6° equals its density value.",
     "Densities above 1 propagate through Bayes' rule and make the final posterior exceed 1."],
    "A narrow Gaussian (tiny variance) towers above 1 — only areas under the curve are probabilities, and point probabilities of continuous values are zero. Nothing is clipped, nothing is buggy, and the posterior normalisation step guarantees the final class probabilities still sum to one.",
    "Tall thin bells poke above 1 legally — height isn't probability, area is.");

  tq("bayes3",
    "Push MultinomialNB's smoothing alpha towards infinity. Which ONE statement is actually TRUE?",
    "The per-class likelihoods flatten toward uniform, and predictions collapse to whichever class has the larger PRIOR.",
    ["Predictions become uniform across the classes, since infinite smoothing erases all information.",
     "Enormous alpha amplifies the influence of rare words, since they gain the most pseudo-counts.",
     "Alpha modifies the class priors rather than the likelihoods, so predictions barely change.",
     "The model degenerates to predicting whichever class contains the greater number of distinct words."],
    "Infinite pseudo-counts drown the real counts, so every word becomes equally likely in every class — the likelihood term goes inert. What remains is the prior, which alpha never touches: predictions become 'always the majority class', not 'uniformly random'.",
    "Blur the evidence completely and the verdict defaults to the base rates.");

  tq("bayes3",
    "Which ONE of these statements about training Naive Bayes is actually TRUE?",
    "It needs no iterative optimisation at all — the parameters are closed-form counts, means and variances from one pass over the data.",
    ["Scikit-learn's implementations run gradient descent on the log loss beneath the counting interface.",
     "Fitting GaussianNB requires inverting the feature covariance matrix for each of the classes.",
     "Training iterates an expectation-maximisation loop until the class priors stop changing.",
     "The counting pass must be repeated once per class, making training quadratic in class count."],
    "NB's maximum-likelihood estimates ARE the counts and per-class means/variances — written down directly, no loop, no gradient, no convergence question. GaussianNB's independence assumption means per-feature variances only (no covariance matrix), and one pass tallies every class simultaneously.",
    "Training is bookkeeping, not search — that's why it's near-instant at any scale.");

  tq("bayes3",
    "Which ONE of these statements about Naive Bayes and logistic regression is actually TRUE?",
    "In log space MultinomialNB's decision function is linear in the counts — the two share a hypothesis family and differ in how it's fitted.",
    ["For two classes, MultinomialNB's decision boundary is quadratic in the word counts.",
     "Naive Bayes' decision boundaries form a strictly larger family than logistic regression's.",
     "The two models share a fitting procedure but draw their boundaries from different families.",
     "Naive Bayes' boundary is piecewise constant, changing only at integer count thresholds."],
    "Log-posteriors are sums of per-word weights times counts — linear scores, softmax-shaped posteriors: structurally logistic regression's family, but with weights estimated generatively by counting instead of discriminatively by optimisation. (Quadratic boundaries belong to Gaussian NB with unequal variances.)",
    "Same shape of boundary, different way of choosing it — counted rather than optimised.");

  /* ===== Decision Trees (trees3) — pass 3 ===== */

  tq("trees3",
    "Which ONE of these statements about a fully grown decision tree's capacity is actually TRUE?",
    "It reaches 100% training accuracy on any data free of contradictions (identical features, different labels) — capacity is never a tree's problem; generalisation is.",
    ["Unpruned trees still underfit noisy datasets, because greedy splitting stops at locally best questions.",
     "Deep trees cannot fit XOR-style interactions at any depth, which is why boosting exists.",
     "Growth guarantees perfect training accuracy on every dataset, including rows that share features but disagree on labels.",
     "The greedy search means at least a few training points always end up misclassified."],
    "Left unchecked, splitting continues until each leaf is pure — a lookup table of the training set. The only obstruction is genuine contradiction: two identical rows with different labels can never be split apart. Greedy choice affects WHICH tree you get, not whether purity is reachable.",
    "Given free rein it just memorises everything memorisable — the fight is against that, not for it.");

  tq("trees3",
    "Which ONE of these statements about a tree's feature_importances_ is actually TRUE?",
    "They sum to 1 by construction — an importance of 0.4 means 40% of the total impurity reduction, not a 40-point accuracy contribution.",
    ["They are the features' correlations with the target, rescaled onto the unit interval.",
     "An importance of exactly zero proves the feature is statistically independent of the target.",
     "Any single importance above 0.5 is a reliable indicator of target leakage in that feature.",
     "They are computed on held-out data by default, making them safe generalisation evidence."],
    "Importance is each feature's share of impurity reduction across the tree's splits — shares of a whole, hence the sum of 1. A zero can simply mean a correlated rival was picked first (masking); a big share can be legitimate; and everything is measured on the training data.",
    "It's a pie chart of credit for the splits — slices of one pie, nothing more.");

  tq("trees3",
    "Which ONE of these statements about transforming features for a tree is actually TRUE?",
    "Monotone transforms (log, rank, min-max) leave the fitted tree effectively unchanged — thresholds relocate, but splits, structure and predictions don't.",
    ["Log-transforming skewed features materially improves a tree's accuracy, as it does for linear models.",
     "Trees need standardised features for numerical stability once depth grows beyond ten or so.",
     "Rank-transforming a feature breaks the Gini computation, which requires raw measurement units.",
     "Monotone transforms usually change which feature wins each split, reshaping the whole tree."],
    "A tree only asks 'is x above this cutoff?' — any order-preserving transform has an equivalent cutoff, so the same partitions of the data remain available and chosen. This is precisely why the log-transform advice that matters for linear models is a no-op for trees.",
    "Bend the ruler however you like — as long as order survives, the tree asks the same questions.");

  tq("trees3",
    "Which ONE of these statements about cost-complexity pruning is actually TRUE?",
    "Pruning can only delete subtrees — it never re-chooses a better split higher up, so a bad early split is beyond its power to fix.",
    ["Pruning revisits the upper splits and replaces them where a better question has become apparent.",
     "A pruned tree always generalises at least as well as any depth-capped tree of equal leaf count.",
     "Setting ccp_alpha to zero removes roughly half of a fully grown tree's leaves.",
     "Pruning is interleaved with growth, trimming each level as soon as the next one is added."],
    "Post-pruning walks the grown tree removing branches whose gain doesn't pay their complexity rent — subtraction only, on a structure the greedy grower already committed to. Alpha at zero removes nothing, growth and pruning are separate phases, and no guarantee ranks it above pre-pruning.",
    "The editor can only cut scenes — never reshoot the opening.");

  tq("trees3",
    "Two features each carry ZERO individual signal about the label. Which ONE statement is actually TRUE?",
    "A depth-2 tree can still represent their XOR exactly — interactions are within a tree's reach but invisible to univariate feature filters.",
    ["No decision tree at any depth can represent XOR, because splits examine one feature at a time.",
     "A univariate filter such as SelectKBest would correctly keep both features for their joint signal.",
     "Representing XOR requires oblique splits on weighted combinations of the two features.",
     "A tree can only fit XOR if the interaction term x₁·x₂ is added as an explicit column first."],
    "Split on x₁, then on x₂ inside each branch: four leaves, XOR solved — axis-aligned questions in sequence build the interaction. The genuine subtlety is the search: the first split shows ~zero gain, so the greedy grower needs zero-gain splits permitted. Univariate filters, scoring features alone, would throw both away.",
    "One question can't see it; two stacked questions can.");

  /* ===== Support Vector Machines (svm3) — pass 3 ===== */

  tq("svm3",
    "Which ONE of these statements about support vectors is actually TRUE?",
    "Delete a NON-support-vector point and refit: the solution is exactly unchanged — the model depends on the support vectors alone.",
    ["Removing any training point shifts the fitted margin at least slightly after refitting.",
     "That sparsity property holds for hard-margin SVMs only, never for the soft-margin case.",
     "It is the support vectors that can be discarded harmlessly, since the margin already encodes them.",
     "Deleting points is safe only if C is retuned to compensate for the smaller dataset."],
    "Points outside the margin have zero Lagrange multipliers — they impose no active constraint, so the identical optimum satisfies the reduced problem. The property defines soft-margin SVMs too (violators and margin points are the support vectors); discarding the support vectors themselves destroys the solution.",
    "The fence is held up by the posts touching it — everyone else could go home.");

  tq("svm3",
    "Which ONE of these statements about RBF-SVM capacity is actually TRUE?",
    "With large enough gamma, an RBF-SVM can perfectly separate ANY training set of distinct points — its capacity is effectively unbounded.",
    ["RBF kernels can only separate classes that form compact, roughly blob-shaped groups.",
     "Perfect training separation plus the maximum-margin property together guarantee strong generalisation.",
     "Raising gamma broadens each point's influence, which makes perfect separation harder to achieve.",
     "Capacity is capped by the number of support vectors the implementation permits."],
    "Shrink each point's similarity bubble far enough and every point gets its own island — any labelling becomes separable. That's precisely why big gamma means memorisation, and why 'perfectly separated with a wide margin IN THE KERNEL SPACE' promises nothing about new data. Gamma up = influence narrower, not broader.",
    "Enough zoom separates anything — which is exactly the warning, not the feature.");

  tq("svm3",
    "Which ONE of these statements about the hinge loss is actually TRUE?",
    "Correctly classified points beyond the margin contribute exactly ZERO loss — the fit literally ignores its easy points.",
    ["Every training point contributes at least some loss, however small, to the objective.",
     "Log loss shares this property, assigning exactly zero to confidently correct predictions.",
     "The hinge penalty grows quadratically once a point violates the margin.",
     "Zero-loss points are physically removed from the working set and never rechecked."],
    "Hinge is max(0, 1 − y·score): clear the margin and you're flat at zero — the source of sparsity, since only margin-touchers and violators shape the solution. Log loss never quite reaches zero (asymptotic), the standard hinge grows linearly, and easy points remain checked — they just cost nothing.",
    "Comfortably right earns silence; the loss only speaks to the borderline and the wrong.");

  tq("svm3",
    "Which ONE of these statements about SVM probability outputs is actually TRUE?",
    "decision_function returns margin distances, not probabilities — probability=True bolts a sigmoid onto them afterwards (Platt scaling), at extra cross-validation cost.",
    ["decision_function returns calibrated probabilities scaled onto the interval from −1 to +1.",
     "Enabling probability=True refits the margin itself, so the decision boundary moves as well.",
     "Platt's sigmoid is estimated inside the margin optimisation as one of its constraints.",
     "SVMs cannot produce probability estimates by any post-processing method."],
    "The SVM optimises a margin, not a likelihood, so its raw scores are unbounded distances. Platt scaling learns sigmoid(a·score + b) on internal cross-validated scores — a separate, post-hoc model; predict()'s boundary is untouched, and the extra CV is why probability=True slows training noticeably.",
    "The machine outputs distances; the percentages are a translator trained afterwards.");

  tq("svm3",
    "Which ONE of these statements about SVM scaling behaviour is actually TRUE?",
    "Kernelised SVMs strain as ROWS grow (the n×n Gram matrix) yet shrug at high dimensionality — the opposite stress profile to many models.",
    ["SVMs scale linearly with sample count but exponentially with the number of dimensions.",
     "The Gram matrix is d×d, so very wide datasets are what exhaust the memory budget.",
     "The number of support vectors stays roughly constant no matter how large n grows.",
     "Linear SVMs share the kernelised solver's quadratic-in-n cost, differing only in accuracy."],
    "Training touches data through pairwise kernel values — n² of them — while dimensionality only affects the cost of each single kernel evaluation. On messy data the support-vector count tends to grow WITH n, compounding the pain; linear SVMs escape via primal solvers (the whole point of LinearSVC).",
    "It fears a million rows far more than a million columns.");

  /* ===== Random Forests (rf3) — pass 3 ===== */

  tq("rf3",
    "Which ONE of these statements about the out-of-bag (OOB) score is actually TRUE?",
    "It is a nearly-free stand-in for cross-validation — each row scored only by trees that never sampled it — yet it cannot catch leakage already baked into the features.",
    ["OOB works by holding out a third of the TREES, whose votes are compared with the rest.",
     "OOB is optimistically biased because the trees share training rows, so cross-validation always scores lower.",
     "Computing the OOB score requires reserving a separate validation split before fitting.",
     "OOB detects target leakage automatically, since leaky features dominate the importances."],
    "The bootstrap leaves each row out of ~37% of trees; those trees form its private jury — honest with respect to sampling, no extra data spent. But a leaky FEATURE is present for jury and defendant alike: OOB, like CV, validates the sampling, not the meaning of the columns.",
    "A free honest examiner — who still can't spot that the exam answers were printed on the question sheet.");

  tq("rf3",
    "Which ONE of these statements about a random forest's probabilities is actually TRUE?",
    "They tend to be better calibrated than a single tree's, yet systematically shy of 0 and 1 — averaging many votes pulls estimates inward.",
    ["The averaging theorem guarantees a forest's vote shares are perfectly calibrated probabilities.",
     "Forest probabilities are MORE extreme than a single tree's, since agreement compounds.",
     "Calibration is meaningless for forests, because voting produces only hard labels.",
     "As n_estimators grows to infinity, vote shares converge to the true class probabilities."],
    "Averaging hundreds of 0/1-ish leaf outputs smooths the wild extremes a lone deep tree produces — but unanimous 1.0 requires EVERY tree to agree, so forests rarely commit fully: the characteristic S-shaped calibration curve. No theorem promises honesty; more trees converge to the ensemble's own expectation, not to truth.",
    "The committee is saner than any member — and constitutionally incapable of certainty.");

  tq("rf3",
    "Which ONE of these statements about max_features is actually TRUE?",
    "Raising it makes each tree individually stronger but the trees more alike — and the ENSEMBLE can get worse even as every member gets better.",
    ["Stronger individual trees always translate into a stronger forest, by the averaging argument.",
     "max_features affects only training speed; the fitted forest is statistically unchanged.",
     "Inter-tree correlation is determined entirely by the bootstrap, not by feature sampling.",
     "Setting max_features to 1 maximises forest accuracy, since it maximises tree diversity."],
    "Ensemble error depends on member strength AND member correlation: give every split the full feature menu and all trees chase the same dominant splits — variance reduction evaporates. Feature sampling exists precisely to manage that correlation; at the other extreme, max_features=1 buys diversity with members too weak to help.",
    "A choir of soloists singing the same line is just one loud soloist.");

  tq("rf3",
    "Which ONE of these statements about bootstrap sampling in forests is actually TRUE?",
    "Each tree's sample contains about 63% of the distinct rows — and some rows appear MULTIPLE times within one tree's sample.",
    ["Each tree receives exactly 63% of the rows, allocated by stratified assignment.",
     "Duplicate draws are removed, so every tree trains on a clean subset of unique rows.",
     "Every row is guaranteed to appear at least once in every tree's bootstrap sample.",
     "The ~37% a tree misses is the same fixed set of rows for every tree in the forest."],
    "Sampling n times WITH replacement leaves each row out with probability (1−1/n)ⁿ ≈ e⁻¹ ≈ 37% — an expectation, not a quota — while lucky rows are drawn twice or thrice and weigh more in that tree. Each tree draws independently, so every tree misses a different 37%: the fact OOB scoring depends on.",
    "Each tree deals itself a hand with repeats — and every tree's missing cards differ.");

  tq("rf3",
    "Which ONE of these statements about permutation importance is actually TRUE?",
    "It can legitimately come out NEGATIVE — shuffling a feature sometimes improves the score, a sign the model was slightly overfitting that noise.",
    ["A negative value indicates a bug in the computation, since destroying information cannot help.",
     "Permutation importances are clipped at zero by definition in every implementation.",
     "A negative importance means the feature's values should be inverted before refitting.",
     "Any feature used in at least one split is guaranteed a strictly positive importance."],
    "If a feature is pure noise the model leaned on, breaking its link with the target can nudge the score UP — small negative importances are ordinary and informative (candidates for deletion). Nothing clips them, nothing needs inverting, and being used in splits proves usage, not usefulness.",
    "Sometimes the model does better without a 'clue' — which tells you what that clue was worth.");

})();
