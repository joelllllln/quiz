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
    ["decision_function returns calibrated probabilities, rescaled by convention onto the interval from −1 to +1 for readability.",
     "Enabling probability=True refits the margin itself, so the decision boundary moves as well.",
     "Platt's sigmoid is estimated inside the margin optimisation itself, entering the dual problem as an extra constraint.",
     "SVMs cannot produce probability estimates by any post-processing method, which is why they are avoided for risk scoring."],
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

  /* ---- pass 4: gradient boosting ---- */

  tq("gb3",
    "Which ONE of these statements about the learning rate (shrinkage) in gradient boosting is actually TRUE?",
    "Lowering the learning rate and raising the number of rounds together usually generalises better — but the rate does NOT change what any single tree looks like; it only scales how much of each tree gets added.",
    ["The learning rate multiplies the residuals before each tree is fitted, so a lower rate makes every individual tree shallower and more conservative.",
     "Halving the learning rate while keeping rounds fixed leaves the final model unchanged, because the ensemble renormalises the tree weights at the end.",
     "The learning rate only matters during the first few rounds; once the residuals shrink, its effect on later trees becomes exactly zero.",
     "A learning rate above 1.0 is mathematically impossible in gradient boosting, since the loss would no longer be differentiable."],
    "Shrinkage scales the CONTRIBUTION of each fitted tree (F += η·tree), not the tree-fitting itself — each tree is still grown on the current residuals at full size. Small η takes many cautious steps, which acts as regularisation and usually wins with enough rounds. Halving η without adding rounds genuinely underfits (no renormalisation exists); the rate applies every round equally; and η>1 is legal, just usually unwise.",
    "The learning rate is the sip size, not the recipe of the drink — smaller sips, more sips, steadier result.");

  tq("gb3",
    "Which ONE of these statements about early stopping in boosting is actually TRUE?",
    "The number of boosting rounds chosen by early stopping is itself a hyperparameter fitted to the monitoring set — so that set can no longer serve as an unbiased final test.",
    ["Early stopping halts when TRAINING loss stops improving, which is why it needs no held-out data at all.",
     "Because early stopping only removes rounds rather than adding them, it can bias the reported score downward but never upward.",
     "Early stopping makes the learning rate irrelevant, since the stopping round automatically compensates for any step size.",
     "A model stopped early is guaranteed to generalise at least as well as the same model run to completion."],
    "Whatever data picks the stopping round has influenced the model — quoting that same data's score harvests its lucky wiggles (upward bias, not downward). Training loss almost never stops improving, so stopping on it would never trigger; the learning rate still matters enormously (it sets how fine-grained the stopping choice can be); and early stopping usually helps but guarantees nothing on any single dataset.",
    "The judge who helped build the model can't also grade it — pick the round on validation, grade once on test.");

  tq("gb3",
    "Which ONE of these statements about boosting versus bagging is actually TRUE?",
    "Boosting fits trees SEQUENTIALLY, each depending on all previous ones — so unlike a random forest, its trees cannot be trained in parallel with one another.",
    ["Boosted trees are typically grown much deeper than forest trees, because boosting relies on each tree being a strong standalone learner.",
     "Boosting reduces variance while leaving bias untouched, whereas bagging reduces bias while leaving variance untouched.",
     "Adding more boosting rounds, like adding more forest trees, can plateau but essentially never overfits.",
     "Because each boosted tree sees the same rows, boosting provides out-of-bag estimates just as a forest does."],
    "Round t fits the residuals left by rounds 1..t−1 — an inherently sequential chain (engines parallelise WITHIN a tree's split search, not across trees). The other four invert reality: boosted trees are typically SHALLOW weak learners; boosting mainly attacks bias while bagging attacks variance; more rounds absolutely can overfit (hence early stopping); and standard boosting has no bootstrap, so no OOB.",
    "A forest is a crowd voting at once; boosting is a relay race — each runner starts where the last one stumbled.");

  tq("gb3",
    "Which ONE of these statements about XGBoost's regularisation is actually TRUE?",
    "Its objective explicitly penalises each tree's structure — the number of leaves (γ) and the leaf values (λ) — so a split is only made when its gain exceeds a real threshold, not whenever gain is positive.",
    ["XGBoost regularises solely through the learning rate; its objective function contains no penalty terms of any kind.",
     "The λ parameter penalises the depth of each tree directly, which is why max_depth becomes redundant once λ is set.",
     "Regularisation in XGBoost applies only to the first tree; later trees are exempt because the residuals are already small.",
     "The γ penalty removes rows with large gradients from training, trimming outliers before each round begins."],
    "XGBoost's per-tree objective adds γ·(number of leaves) + ½λ·Σ(leaf values²): γ makes each split pay rent (gain must beat γ or the split is pruned), λ shrinks leaf outputs where evidence is thin via the −Σg/(Σh+λ) formula. It applies to every tree; λ penalises leaf VALUES not depth; γ prices splits, it doesn't drop rows.",
    "Every split must pay rent (γ), every leaf speaks with a damped voice (λ) — greed taxed at the source.");

  tq("gb3",
    "Which ONE of these statements about fitting residuals is actually TRUE?",
    "For squared-error loss the 'residuals' each round fits ARE the plain errors y−F — but for other losses the trees fit the loss's negative gradient, which need not equal the raw error at all.",
    ["Every gradient boosting round fits the raw errors y−F regardless of the loss function; the loss only changes the final aggregation step.",
     "For absolute-error loss the fitted targets are the squared residuals, which is what makes the method robust to outliers.",
     "The residuals passed to each new tree are always positive, since a squared loss cannot produce a negative gradient.",
     "After enough rounds the residuals become exactly zero on the training set, at which point boosting provably terminates."],
    "The general recipe is 'fit the negative gradient of the loss at current predictions'. Squared error is the special case where that gradient coincides with y−F — the origin of the 'fit the residuals' shorthand. Absolute error fits SIGNS (±1, whence its robustness), gradients are signed for every loss, and training residuals approach but rarely hit exact zero — nothing terminates by itself.",
    "'Fit the residuals' is the nursery-rhyme version; the grown-up rule is 'fit the loss's gradient' — they rhyme only for squared error.");

  /* ---- pass 4: stacking & voting ---- */

  tq("stack3",
    "Which ONE of these statements about out-of-fold predictions in stacking is actually TRUE?",
    "The meta-model must be trained on predictions each base model made for rows it did NOT train on — otherwise the meta-model learns to trust memorisation, and the stack's CV score becomes fiction.",
    ["Out-of-fold prediction is only needed for overfitting-prone base models like deep trees; a regularised linear base model can safely predict its own training rows.",
     "The out-of-fold procedure exists to speed up training, since predicting held-out rows requires fewer computations than predicting seen rows.",
     "Base models in a stack must never be refitted on the full dataset afterwards, because that would invalidate the out-of-fold predictions already generated.",
     "Out-of-fold discipline applies to the meta-model's own features too, so the raw input columns must also be cross-validated before passthrough."],
    "A base model predicting its own training rows reports memorised, unrealistically good numbers; a meta-model calibrated on those over-trusts it in production. The rule applies to EVERY base model (even linear ones score better on seen rows); it costs more, not less, compute; standard practice refits base models on all data for deployment (the oof predictions were only meta-TRAINING material); raw features aren't predictions and need no oof treatment.",
    "The chairperson must watch the experts sit exams they haven't seen — otherwise it's grading memory, not skill.");

  tq("stack3",
    "Which ONE of these statements about hard versus soft voting is actually TRUE?",
    "Soft voting can pick a class that NO individual member ranked first — three members leaning 0.4 toward class B can outvote one member certain of class A.",
    ["Hard voting and soft voting always agree whenever the number of committee members is odd, since ties are then impossible.",
     "Soft voting requires all members to share the same model family, because probabilities from different algorithms cannot be averaged.",
     "Hard voting is strictly more accurate than soft voting when the members are well calibrated, because discrete votes discard calibration noise.",
     "Soft voting weights each member by its validation accuracy automatically; hard voting is the only mode where members count equally."],
    "Averaging probabilities lets accumulated lean beat isolated certainty: A at (0.9, 0.2, 0.2, 0.2) averages 0.375 while B's steady 0.4s win — no member had B on top. Odd membership doesn't force agreement between the two modes; probabilities from any mix of calibrated models average fine; calibrated members make SOFT voting the better mode (it uses strictly more information); and neither mode auto-weights by accuracy unless you configure weights.",
    "Four quiet 'probably B's can beat one loud 'definitely A' — that's soft voting's whole superpower.");

  tq("stack3",
    "Which ONE of these statements about ensemble diversity is actually TRUE?",
    "Averaging identical models achieves nothing — ensemble gains come from members making DIFFERENT errors, so a weaker but different model can improve a committee that a stronger clone cannot.",
    ["Diversity means using different random seeds; two models of the same family with different seeds are as diverse as an ensemble ever needs.",
     "Adding any model with above-chance accuracy always improves the ensemble, since extra information can never hurt an average.",
     "The ideal committee members are perfectly correlated in their errors, so their mistakes reinforce and can be subtracted off afterwards.",
     "Diversity only matters for classification ensembles; regression averages improve with member count regardless of correlation."],
    "The variance-reduction algebra depends on error CORRELATION: average n members with correlation ρ and variance falls toward ρσ² — clones (ρ=1) gain nothing, decorrelated members gain a lot. Hence a mediocre-but-different KNN can help a committee of trees while a third boosted model doesn't. Seeds add mild diversity, far less than changing family/features; an above-chance but highly correlated model can still worsen a weighted vote; perfectly correlated errors are the worst case, and regression obeys the same ρ arithmetic.",
    "Hire people who are wrong in different places — a committee of clones is one opinion in five voices.");

  tq("stack3",
    "Which ONE of these statements about the meta-model's job is actually TRUE?",
    "The meta-model in stacking is usually kept deliberately SIMPLE (often regularised logistic regression) — its input space is tiny and its training data is limited to one out-of-fold prediction per row.",
    ["The meta-model should be the most powerful model in the stack, since it makes the final decision and must out-think every base model.",
     "The meta-model is trained on the true labels of the validation set only, never on base-model predictions, which are too noisy to learn from.",
     "A stacking meta-model cannot use regularisation, because shrinking its weights would erase the base models' contributions entirely.",
     "The meta-model must be retrained online after every production prediction, since base-model trust shifts with each new case."],
    "The meta-model sees only a handful of prediction columns and has exactly n out-of-fold rows to learn from — a wide, powerful learner there overfits the base models' quirks. Its inputs ARE base predictions (paired with true labels as targets); regularisation is standard and shrinks weights toward sensible blending rather than erasing anyone; and stacks are trained offline like any model — no per-prediction refit.",
    "The chairperson needs judgement, not genius — five columns of expert opinion don't require a deep network to blend.");

  tq("stack3",
    "Which ONE of these statements about blending versus stacking is actually TRUE?",
    "Blending fits the meta-model on a single held-out slice instead of out-of-fold predictions — simpler and leak-resistant, but the meta-model learns from fewer rows and the slice's quirks carry more weight.",
    ["Blending and stacking are two names for exactly the same procedure; the terms are used interchangeably in every textbook and library.",
     "Blending eliminates the need for base-model diversity, because the held-out slice teaches the meta-model to decorrelate the members itself.",
     "Blending is the more data-efficient of the two, since the held-out slice can also be reused as the final test set without bias.",
     "Stacking's out-of-fold machinery exists to make the base models more accurate; blending skips it because its base models are already strong."],
    "Blending: carve off (say) 15%, train bases on the rest, fit the meta-model on that slice's predictions. No fold bookkeeping, minimal leak surface — but the meta-model only ever sees the slice (fewer rows, one draw of luck), while stacking's oof machinery gives it a prediction for EVERY training row. The oof step serves honest meta-training, not base accuracy; the slice used for blending is spent and cannot double as an unbiased test; diversity matters identically in both.",
    "Blending trades meta-training data for simplicity — one clean rehearsal slice instead of the full fold choreography.");

  /* ---- pass 4: model evaluation ---- */

  tq("metrics3",
    "Which ONE of these statements about ROC-AUC is actually TRUE?",
    "AUC equals the probability that a randomly chosen positive case scores HIGHER than a randomly chosen negative one — it grades ranking only, and is untouched by changing the decision threshold.",
    ["AUC measures the fraction of predictions on the correct side of the 0.5 threshold, which is why recalibrating probabilities changes it.",
     "An AUC of 0.5 means the model gets half its predictions right, the same as 50% accuracy on a balanced dataset.",
     "AUC below 0.5 is impossible on real data, since a classifier can never rank worse than random ordering over a full test set.",
     "Doubling the number of negative cases in the test set halves the AUC, because the false-positive rate's denominator doubles."],
    "AUC's probabilistic reading (the Mann-Whitney statistic) is its cleanest definition: sample one positive and one negative, AUC = P(positive ranked above negative). Thresholds and monotone recalibration leave the ranking — and hence AUC — untouched. 0.5 means ranking at chance (not 50% accuracy); below 0.5 happens whenever a model is systematically inverted; and class ratios don't change ranking probability, which is precisely why AUC is popular under imbalance.",
    "AUC is a ranking bet: pick one sick and one healthy patient at random — how often does the model score the sick one higher?");

  tq("metrics3",
    "Which ONE of these statements about precision and recall is actually TRUE?",
    "Precision and recall share the SAME numerator (true positives) but different denominators — precision divides by everything you flagged, recall by everything you should have flagged.",
    ["Precision and recall must always sum to at most 1.0, which is why improving one necessarily degrades the other.",
     "Recall depends on how many true negatives the model produces, since missing negatives shrinks its denominator.",
     "Raising the decision threshold always increases recall, because the surviving alerts are the model's most confident ones.",
     "A model can have high precision and high recall only if the classes are balanced; imbalance caps their product at the base rate."],
    "Both metrics count the same catches (TP); they differ in what they answer for — precision: TP/(TP+FP), 'of my alerts, how many were real?'; recall: TP/(TP+FN), 'of the real ones, how many did I catch?'. They can both be high on any base rate (a near-perfect model on 1% fraud has both near 1); they don't sum to 1; recall's formula contains no TN at all; raising the threshold trades recall AWAY for precision, not toward it.",
    "Same trophies, two questions: what fraction of my shots hit (precision), and what fraction of the targets got hit (recall).");

  tq("metrics3",
    "Which ONE of these statements about the F1 score is actually TRUE?",
    "F1 is the HARMONIC mean of precision and recall, so it is dragged toward the weaker of the two — a model at 0.9 precision and 0.1 recall scores 0.18, not the 0.5 an arithmetic mean would report.",
    ["F1 is the arithmetic mean of precision and recall, chosen because it weights both errors equally on a linear scale.",
     "F1 incorporates true negatives through its denominator, which is what distinguishes it from plain accuracy.",
     "F1 is threshold-independent: like AUC, it summarises the model's quality across every possible operating point at once.",
     "An F1 of 0.5 always means precision and recall are both exactly 0.5, since the harmonic mean is invertible."],
    "Harmonic averaging punishes imbalance between the two components: 2PR/(P+R) collapses toward the minimum, so you can't buy a good F1 with one inflated side. F1 never sees TN (its blind spot); it's computed at ONE threshold (change the cutoff, change F1 — unlike AUC); and many (P,R) pairs share an F1 of 0.5 — e.g. 0.9 and 0.35 — so the score isn't invertible to its parts.",
    "The harmonic mean is the chain-and-weakest-link average: shine at one metric, fail the other, and F1 sides with the failure.");

  tq("metrics3",
    "Which ONE of these statements about accuracy under class imbalance is actually TRUE?",
    "Accuracy's baseline moves with the base rate — on 99/1 data, 99% accuracy may represent ZERO skill, so accuracy is only interpretable relative to the majority-class strategy's score.",
    ["Accuracy systematically understates performance on imbalanced data, because the rare class contributes too few correct predictions to the numerator.",
     "On imbalanced data accuracy and recall become identical, since both reduce to the fraction of majority-class cases handled correctly.",
     "Accuracy is undefined when a class has fewer than 30 examples, which is why imbalanced benchmarks report F1 instead.",
     "Weighting the rare class more heavily during training makes accuracy imbalance-proof, since the model then treats both classes equally."],
    "The do-nothing strategy ('predict majority for everyone') scores 99% on 99/1 data — so a model's 99% may mean literally nothing. The cure is anchoring: compare against that baseline (or use chance-anchored metrics like MCC/kappa). Accuracy OVERSTATES, not understates, under imbalance; it never equals recall in general; it's defined for any sample size; and class weighting changes the MODEL's behaviour, not the metric's blindness.",
    "In a town where it rains once a year, 'never rains' is 99.7% accurate — the number is real, the skill is zero.");

  tq("metrics3",
    "Which ONE of these statements about test-set reuse is actually TRUE?",
    "Every decision you let the test set influence — model choice, threshold, stopping round, feature set — spends some of its validity, and the damage accumulates silently across decisions even when each single peek looks harmless.",
    ["A test set only loses validity if the model is retrained on its rows; reading its score to pick between models leaves it perfectly unbiased.",
     "Test-set validity regenerates over time: after enough new models, earlier peeks at the data become statistically irrelevant.",
     "Reusing a test set is safe as long as its size exceeds 10,000 rows, since large samples cannot be overfitted by selection.",
     "The bias from test-set reuse is always smaller than the bias from a too-small validation set, so reuse is the lesser evil."],
    "Adaptive overfitting: each choice made BY the test score selects for configurations lucky on those particular rows, and the optimism compounds decision by decision — no retraining required. Nothing regenerates the set (the information leaked stays leaked); size slows but doesn't stop the rot (selection pressure scales with the number of adaptive queries); and the comparison in the last option is a false dilemma — the fix is a fresh holdout or nested CV, not embracing reuse.",
    "The exam leaks a little every time you glance at it — one glance per question, and eventually you're grading your memory of the answers.");

})();
