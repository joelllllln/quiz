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

  /* ---- pass 5: performance optimisation ---- */

  tq("perf3",
    "Which ONE of these statements about grid search versus random search is actually TRUE?",
    "When only a few of many hyperparameters actually matter, random search wins — it tries a DIFFERENT value of each important parameter on every trial, while grid search wastes trials repeating the same few values.",
    ["Grid search is guaranteed to find the global optimum within its ranges, because it evaluates every point of the continuous search space.",
     "Random search cannot be reproduced between runs, since the draws depend on hardware timing rather than a controllable seed.",
     "Grid search scales linearly with the number of hyperparameters, which is why it remains the default for high-dimensional spaces.",
     "Random search must sample at least as many trials as the equivalent grid has cells before it can match the grid's best score."],
    "Bergstra & Bengio's argument: a 10×10 grid over two parameters tests only 10 distinct values of each; 100 random trials test ~100 distinct values of each. If one parameter dominates, random explores its axis 10× more finely for the same budget. Grids only cover their own lattice points (not the continuous space), random draws are seedable, grid cost grows EXPONENTIALLY with dimensions, and random typically matches grids with far fewer trials, not more.",
    "A grid marches in formation over the field; random scatter covers every lane — and usually only one lane holds the treasure.");

  tq("perf3",
    "Which ONE of these statements about parallelism (n_jobs) is actually TRUE?",
    "Cross-validation folds and forest trees parallelise cleanly because they are independent — but boosting ROUNDS cannot be parallelised across cores, since each round needs the previous round's output.",
    ["Setting n_jobs=-1 doubles training speed for every sklearn estimator, since all algorithms decompose into independent halves.",
     "Parallelism changes the fitted model slightly each run, which is why n_jobs must be 1 whenever reproducibility matters.",
     "Nested parallelism multiplies the speedups, so GridSearchCV(n_jobs=-1) over a forest with n_jobs=-1 runs fastest of all.",
     "n_jobs controls GPU usage in sklearn; on CPU-only machines it is silently ignored and everything runs single-threaded."],
    "Embarrassing parallelism needs independent units: CV folds and bagged trees qualify; boosting's sequential chain does not (its libraries parallelise WITHIN a round's split search instead). n_jobs=-1 helps only decomposable steps; results stay deterministic given seeds (parallelism reorders work, not randomness); nested -1 oversubscribes cores and often SLOWS things; and sklearn's n_jobs spreads CPU processes — it has nothing to do with GPUs.",
    "You can hire ten cooks for ten separate dishes — not for one recipe where each step needs the last step's pan.");

  tq("perf3",
    "Which ONE of these statements about caching in pipelines is actually TRUE?",
    "Pipeline(memory=...) caches fitted TRANSFORMERS, so a grid search that only varies the final model's parameters can skip re-running the expensive preprocessing for every candidate.",
    ["Pipeline caching stores the model's predictions per row, so repeated predict calls on the same data return instantly.",
     "The memory= argument keeps the entire training DataFrame in RAM between fits, which is why it speeds up wide searches.",
     "Caching only works when every step in the pipeline is stateless; a fitted scaler invalidates the cache on each run.",
     "Enabling memory= changes the CV scores slightly, because cached transformers are reused across folds instead of refitted."],
    "With memory set, each transformer's fit result is cached keyed on its parameters AND input data — so 50 classifier configs × 5 folds reuse the same 5 fitted preprocessing chains instead of fitting 250. It caches transformers, not predictions; it writes to DISK (joblib), not RAM-pinning your data; stateful transformers are exactly what benefits; and scores are identical because a cache hit requires identical inputs — folds differ, so folds never share fitted state.",
    "Cook the stock once, freeze it, and let fifty different soups start from the freezer — same stock, same taste, fifth of the time.");

  tq("perf3",
    "Which ONE of these statements about GPU acceleration for classical ML is actually TRUE?",
    "For small tabular datasets a GPU can be SLOWER than a CPU — transferring the data to device memory can cost more than the computation saves, so the win only appears at scale.",
    ["Any sklearn estimator runs on GPU once CUDA is installed, since numpy automatically dispatches its arrays to the device.",
     "GPUs speed up the maths of training but never inference, because prediction is a memory-bound operation by definition.",
     "Gradient boosting cannot use GPUs at all, since its sequential rounds leave no parallel work for the device to do.",
     "GPU training produces bit-identical results to CPU training, so switching hardware never needs revalidation of the model."],
    "GPUs win by amortising parallel throughput over lots of arithmetic; a 10k-row table spends more time crossing the PCIe bus than computing. Stock sklearn is CPU-only (GPU needs cuML/XGBoost/LightGBM device builds); inference accelerates fine at batch scale; boosting parallelises heavily WITHIN each round's histogram building (GPU XGBoost is standard); and floating-point reduction order differs across hardware, so results are close but not bit-identical.",
    "A freight train beats a van only when there's freight — for one box, loading the train IS the journey.");

  tq("perf3",
    "Which ONE of these statements about profiling before optimising is actually TRUE?",
    "In many 'slow training' investigations the model fit is NOT the bottleneck — data loading, feature engineering or redundant CV fits dominate, which is why you profile before touching the algorithm.",
    ["Optimisation should start with the model's mathematical core, since the algorithm always dominates a pipeline's runtime.",
     "Profilers change the code's relative timings so severely that their output cannot identify which stage is slowest.",
     "If total runtime is under an hour there is nothing worth profiling, since human time only outweighs compute time beyond that.",
     "Vectorising a pandas loop and switching to a faster model are equivalent fixes, since both target the same bottleneck."],
    "The empirical pattern: a row-wise pandas .apply, a CSV re-parsed every fold, or a grid refitting an uncached preprocessor often eats 10× the model's own time. Profilers (cProfile, line_profiler, %%time per stage) add overhead but preserve the RANKING of costs, which is all you need; 'always the algorithm' is exactly the assumption profiling exists to test; short-but-frequent runs are prime optimisation targets; and vectorising I/O-side code versus swapping the model attack DIFFERENT stages — only measurement tells you which stage is yours.",
    "Before buying a faster oven, time the kitchen: half the 'slow baking' complaints are really slow shopping.");

  /* ---- pass 5: advanced scikit-learn ---- */

  tq("skl3",
    "Which ONE of these statements about the fit/transform contract is actually TRUE?",
    "Calling fit_transform on the training set but only transform on the test set is not a stylistic choice — refitting on test data would leak its statistics into preprocessing and quietly inflate evaluation.",
    ["fit_transform and transform return identical results on any data once the transformer has been fitted somewhere beforehand.",
     "The test set should also get fit_transform, so its own statistics normalise it to the same distribution as the training data.",
     "transform may update the fitted statistics incrementally with each call, which keeps preprocessing adapted to drifting data.",
     "The contract only matters for scalers; encoders and imputers carry no fitted state and may be refitted anywhere freely."],
    "fit learns parameters (means, categories, imputation values) from training data; transform applies them frozen. Refitting on test data means the test set's own distribution shapes its preprocessing — information flowing backwards from evaluation into the pipeline. fit_transform ≠ transform when the input differs from the fitted data (it refits!); transform never updates state; and encoders and imputers hold exactly the kind of fitted state (category lists, fill statistics) the contract protects.",
    "Learn the rules from the practice papers, then grade the exam by those SAME rules — regrading by the exam's own answers is cheating.");

  tq("skl3",
    "Which ONE of these statements about ColumnTransformer is actually TRUE?",
    "Columns not named in any transformer are DROPPED by default — silently shrinking your feature set unless you pass remainder='passthrough' to keep them.",
    ["Unlisted columns pass through untouched by default, so ColumnTransformer can never accidentally lose features.",
     "Each column may appear in several transformers, but ColumnTransformer keeps only the last transformation of it.",
     "ColumnTransformer requires all outputs to be the same width as its inputs, which is why one-hot steps need padding.",
     "The transformers run sequentially, each seeing the previous one's output, exactly like the steps of a Pipeline."],
    "remainder='drop' is the default: forget a column in your lists and it vanishes without a warning — a classic silent bug caught only by inspecting output width or names. A column CAN feed multiple transformers (all outputs are kept, concatenated); output widths are arbitrary (one-hot legitimately widens); and the transformers run in PARALLEL on their own column slices — it's Pipeline that chains sequentially.",
    "It's a sorting office, not an assembly line — parcels go down parallel chutes, and unlabelled parcels land in the bin by default.");

  tq("skl3",
    "Which ONE of these statements about cross_val_predict is actually TRUE?",
    "It returns one out-of-fold prediction per training row — useful for confusion matrices and stacking inputs, but averaging a metric over these predictions is NOT the same as cross_val_score's mean.",
    ["cross_val_predict and cross_val_score always agree to the decimal, since both functions summarise identical folds of the same estimator using the same metric arithmetic.",
     "cross_val_predict returns predictions from a single model fitted once on the full dataset, which makes its outputs in-sample values unsuitable for any honest evaluation.",
     "The function requires a separate holdout set passed alongside the training data, because predictions on training rows would otherwise just be memorised answers.",
     "cross_val_predict refits the estimator once per individual row (leave-one-out style), which is why it is far too slow to run on datasets of any realistic size."],
    "Each row's prediction comes from the fold-model that did NOT train on it — honest per-row outputs, ideal for error inspection and stacking meta-features. But one global metric over the pooled predictions weights folds differently than averaging per-fold metrics (the docs warn they differ, especially for non-decomposable metrics like AUC). It fits k models, not one and not n; no holdout is needed because folds provide the separation.",
    "Every student is graded by a teacher who never taught them — but pooling all the marks into one class average is a different statistic from averaging the five classrooms.");

  tq("skl3",
    "Which ONE of these statements about class_weight='balanced' is actually TRUE?",
    "It reweights the LOSS inversely to class frequency — no rows are added, removed or duplicated, and the training data itself is untouched.",
    ["It oversamples the minority class by duplicating rows until both classes contribute equal row counts to training.",
     "It undersamples the majority class at fit time, discarding random rows so the classes reach parity before fitting.",
     "It adjusts the decision threshold after training, moving the cutoff toward the rare class without changing the fit.",
     "It generates synthetic minority examples by interpolation, which is why it needs the imblearn package installed."],
    "class_weight multiplies each class's contribution to the loss by n_samples/(n_classes·n_class) — errors on rare classes simply cost more during optimisation. Nothing is resampled (that's RandomOverSampler/undersampling), nothing synthetic is created (that's SMOTE, which does live in imblearn), and the threshold is untouched (post-hoc threshold moving is a separate, also-legitimate technique). Same rows, different prices on their mistakes.",
    "Don't add or remove voters — just make mistakes on the minority cost ten times more at training time.");

  tq("skl3",
    "Which ONE of these statements about sklearn's random_state is actually TRUE?",
    "Fixing random_state makes runs reproducible, but the choice of seed is itself a source of variance — conclusions that hold for seed 42 and fail for seed 7 were never real conclusions.",
    ["random_state only affects data splitting; model internals like forest bootstraps draw from an unrelated global generator.",
     "Leaving random_state unset makes sklearn default it to zero, so unseeded runs are already reproducible by accident.",
     "Setting random_state guarantees identical results across sklearn versions, machines and BLAS libraries alike.",
     "Choosing a 'lucky' seed that maximises the test score is legitimate tuning, since the seed is a hyperparameter like any other."],
    "A seed freezes ONE draw from the randomness distribution — good for debugging, insufficient for claims: robust results should survive several seeds (report mean ± spread). random_state feeds model internals too (bootstraps, initialisations, sub-sampling); unset means fresh entropy each run, not zero; cross-version/cross-BLAS bit-reproducibility is NOT guaranteed; and seed-shopping for the test score is textbook selection bias, not tuning — the seed changes no real property of the model.",
    "Nailing the dice to the table makes the game repeatable — it doesn't make one lucky roll a law of nature.");

  /* ---- pass 5: PCA & dimensionality ---- */

  tq("pca3",
    "Which ONE of these statements about scaling before PCA is actually TRUE?",
    "Without standardisation, PCA's components chase whichever features have the biggest UNITS — measure income in cents instead of thousands and PC1 changes, though no information did.",
    ["PCA is scale-invariant because variance ratios between features are preserved under any linear rescaling of columns.",
     "Standardising before PCA is harmful, since dividing by the standard deviation erases the variance PCA is meant to find.",
     "PCA requires features to be scaled to the [0,1] range specifically, which is why MinMaxScaler precedes it in pipelines.",
     "Scaling only matters when features are correlated; independent features contribute to components equally at any scale."],
    "PCA maximises absolute variance, and variance carries units squared — a feature measured in cents has 10,000× the variance of the same feature in dollars, and will dominate the components on bookkeeping grounds alone. Standardising (z-scores) gives every feature variance 1, letting CORRELATION structure decide instead; that removes nuisance scale, not information. No specific [0,1] range is required, and unit dominance strikes correlated and independent features alike.",
    "Measured in millimetres, the ant out-varies the elephant-in-kilometres — standardise, or PCA studies your units, not your data.");

  tq("pca3",
    "Which ONE of these statements about explained variance is actually TRUE?",
    "The 'first k components explain 95% of variance' figure says NOTHING about predictive value — it measures reconstruction of the INPUTS, and the discarded 5% may hold all the label signal.",
    ["Explained variance ratios measure how much of the target variable each component predicts, ranked from most to least.",
     "If ten components explain 95% of variance, any other ten directions chosen from the data must explain less than 90%.",
     "Explained variance percentages depend on the sign convention of the eigenvectors, so different libraries report different ratios.",
     "A component explaining under 1% of variance is statistically indistinguishable from noise and can always be dropped safely."],
    "Explained variance is a fraction of INPUT variance captured — a purely unsupervised bookkeeping of reconstruction, computed without ever seeing a label. Predictive relevance can hide in low-variance directions (the classic PCA failure mode). PCA's top-k is optimal, but other ten-direction sets can come arbitrarily close to it; sign flips leave variance unchanged (it's squared); and a sub-1% component can still be the one that separates the classes — 'small' is not 'noise'.",
    "'95% of the picture preserved' is a statement about the picture — the missing 5% might be the signature that proves who painted it.");

  tq("pca3",
    "Which ONE of these statements about PCA components is actually TRUE?",
    "Principal components are ORTHOGONAL by construction, and the scores they produce are UNCORRELATED — but uncorrelated is weaker than independent, which is why ICA exists as a separate method.",
    ["PCA components are statistically independent by construction, which is why ICA and PCA return identical directions.",
     "Orthogonality is an option toggled by a parameter; by default sklearn's PCA allows components to overlap freely.",
     "The components' signs are meaningful: a negative loading indicates the feature harms reconstruction quality.",
     "Each component is one of the original feature axes, selected greedily by variance — PCA is a feature selector."],
    "PCA delivers perpendicular directions and decorrelated projections — second-order cleanliness. Independence is a stronger, all-moments property: two uncorrelated variables can still be dependent, and ICA specifically hunts for independent (non-Gaussian) sources where PCA cannot. Orthogonality has no off-switch; each eigenvector's global sign is arbitrary (flipping it changes nothing); and components are weighted MIXTURES of all features — feature EXTRACTION, not selection.",
    "PCA untangles the ropes so none cross; ICA goes further and asks that no rope even tugs on another.");

  tq("pca3",
    "Which ONE of these statements about whitening is actually TRUE?",
    "whiten=True additionally rescales each component's scores to UNIT variance — useful when downstream algorithms assume isotropic inputs, at the cost of discarding the relative importance the variances encoded.",
    ["Whitening reorders the components from least to most variance, so that downstream models encounter the subtle low-variance directions before the dominant ones.",
     "Whitening centres the projected scores a second time after the rotation, which removes any residual mean that the first centering step failed to eliminate.",
     "Whitening is lossless relabelling: since it only divides each column by a constant, nothing of consequence about the learned representation changes at all.",
     "Whitening replaces PCA's eigenvectors with random orthogonal directions, which removes the method's built-in bias toward the highest-variance axes."],
    "Standard PCA scores retain each component's variance (PC1 spreads widest). Whitening divides each by its singular value so every direction has variance 1 — a sphere instead of an ellipsoid. Some downstream methods (certain clusterings, ICA preprocessing) want exactly that isotropy; but the variances WERE information (which directions dominate), and equalising them erases that ranking — a real modelling choice, not a relabelling. Order is unchanged, centering happens once, directions stay the eigenvectors.",
    "PCA lines the books up by size; whitening also shrinks them all to one height — tidier shelf, lost sense of which books were big.");

  tq("pca3",
    "Which ONE of these statements about PCA for visualisation is actually TRUE?",
    "A 2-D PCA plot can make well-separated clusters OVERLAP — separation living in the third component and beyond is flattened away, so overlap in the plot never proves overlap in the data.",
    ["If clusters overlap in the first two components, they overlap in the full space, since PC1 and PC2 capture the dominant structure.",
     "PCA plots preserve all pairwise distances exactly, which is what distinguishes them from t-SNE's distorted embeddings.",
     "The axes of a PCA scatter plot are two of the original measured features, chosen for having the highest variances.",
     "Clusters that appear in a PCA plot are guaranteed genuine, because linear projections cannot create apparent grouping."],
    "Projection is a shadow: distances can only shrink or stay, so groups distinct along discarded axes get pancaked together. The converse caution also holds — projections can visually compress unrelated regions into apparent 'clusters'. Overlap in 2-D proves nothing about 30-D; distances are NOT preserved exactly (that's the point of compression); the axes are learned linear combinations, not original columns; and 'looks grouped' is a hypothesis to test (silhouette, cluster stability), never a conclusion.",
    "Two aeroplanes' shadows can cross on the runway while the planes fly a mile apart — a flat picture of deep data proves nothing by itself.");

  /* ---- pass 6: hierarchical clustering ---- */

  tq("hier3",
    "Which ONE of these statements about dendrograms is actually TRUE?",
    "Cutting one dendrogram at different heights yields clusterings for EVERY k from a single run — but each cut is constrained to merges already made, so it can be worse than running a flat clusterer directly at that k.",
    ["A dendrogram must be rebuilt from scratch for every value of k you want to inspect, which is precisely why hierarchical methods cost so much more than a single k-means run does.",
     "Every horizontal cut of a dendrogram reproduces exactly the partition k-means would find for that number of clusters, since both optimise the same within-cluster objective.",
     "The left-to-right order of the leaves in a dendrogram ranks the points by their distance to the global centroid, from the most central member out to the farthest outlier.",
     "Two points drawn as adjacent leaves are always each other's nearest neighbours in the original feature space — adjacency in the drawing is a distance guarantee."],
    "One agglomerative run encodes all granularities: cut high for few clusters, low for many. But the tree is GREEDY — early merges are never undone, so the k-cluster cut inherits any early mistake, and a direct k-means at that k can beat it. No rebuild per k is needed; cuts don't reproduce k-means; and leaf order is largely arbitrary (subtrees can flip), so adjacency in the drawing implies neither centroid rank nor nearest-neighbour status.",
    "One tree, every zoom level — but the branches were welded greedily, and a weld made at step 3 can't be undone at step 300.");

  tq("hier3",
    "Which ONE of these statements about agglomerative versus divisive clustering is actually TRUE?",
    "Agglomerative (bottom-up) dominates practice largely for COMPUTATIONAL reasons — each step considers pairwise merges, while a divisive step must choose among exponentially many ways to split a cluster.",
    ["Divisive clustering is the standard in practice because splitting is computationally cheaper than merging: a single cut produces two clusters at once, halving the work per step.",
     "Agglomerative and divisive runs on the same data always produce exactly the same tree, just drawn upside-down from each other, so the choice between them is purely cosmetic.",
     "Divisive methods cannot produce a dendrogram at all, since successive splits create disconnected forests rather than the nested tree structure a dendrogram needs to draw.",
     "Agglomerative clustering is preferred because its merges are reversible, letting the algorithm detect and undo an early mistaken merge once later evidence contradicts it."],
    "Merging asks 'which pair of current clusters?' — O(n²) options; splitting asks 'which of 2^(m−1) bipartitions of this cluster?' — combinatorially explosive, so divisive methods need heuristics (e.g. bisecting k-means). The two directions generally give DIFFERENT trees; divisive splits nest perfectly well into dendrograms; and agglomerative merges are exactly as irreversible as splits — greediness is the shared weakness, not the difference.",
    "Gluing considers pairs; cutting considers every possible way to halve a crowd — that asymmetry decided which direction the field walks.");

  tq("hier3",
    "Which ONE of these statements about Ward linkage is actually TRUE?",
    "Ward merges the pair of clusters whose union INCREASES total within-cluster variance the least — the same objective family as k-means, which is why Ward trees and k-means partitions often broadly agree.",
    ["Ward linkage merges whichever two clusters currently have the closest centroids, which is the precise property that distinguishes it from what textbooks call centroid linkage.",
     "Ward maximises the variance inside each newly merged cluster, ensuring that every branch of the growing tree stays as internally diverse and representative as possible.",
     "Ward linkage works with any distance metric you configure, including cosine and Manhattan, in exactly the same flexible way as single and complete linkage do.",
     "Ward tends to produce one giant cluster plus a fringe of many singletons, since variance-based merging systematically favours deeply unbalanced tree shapes."],
    "Ward's criterion is minimum variance GROWTH: merge whichever pair costs least in added within-cluster sum of squares — k-means' objective pursued greedily and hierarchically, hence the frequent agreement and Ward's popularity as a k-means companion. Closest-centroids is centroid linkage (a different rule); Ward minimises, not maximises, internal spread; it is locked to Euclidean geometry; and its signature bias is BALANCED, similar-sized clusters — the opposite of singleton-spawning.",
    "Ward asks the k-means question — 'which merge bloats the spread least?' — one greedy wedding at a time.");

  tq("hier3",
    "Which ONE of these statements about hierarchical clustering's cost is actually TRUE?",
    "Standard agglomerative clustering needs the full pairwise distance matrix — O(n²) memory — so 100k points want ~40GB of distances before any merging even starts, which is why it's a small-to-medium-data tool.",
    ["Agglomerative clustering streams through the dataset in a single pass, holding only the current cluster centroids in memory, which is why it scales so comfortably to millions of rows.",
     "The memory cost grows linearly with the number of points, since each point needs to store only the one distance to its current nearest neighbour rather than a full matrix.",
     "Hierarchical clustering is cheaper than k-means at every scale, because building the tree once avoids the repeated relocation iterations that k-means must run to converge.",
     "The distance matrix can be discarded immediately after the first merge, since Lance-Williams updates are computed fresh from the raw points and need no previously stored distances."],
    "n(n−1)/2 pairwise distances is the entry fee: 100k points ≈ 5×10⁹ distances ≈ 40GB in float64 — the wall that pushes big-data users toward BIRCH, sampling, or MiniBatchKMeans. Nothing streams (that's BIRCH's innovation); memory is quadratic, not linear; k-means is O(nkd) per iteration and far cheaper at scale; and Lance-Williams works BY reusing the stored prior distances — the matrix is its input, not its waste.",
    "Before the first merge, you must price every handshake in the room — and handshakes grow with the square of the guest list.");

  tq("hier3",
    "Which ONE of these statements about choosing k from a dendrogram is actually TRUE?",
    "The 'largest vertical gap' heuristic — cut where merge heights jump most — is a visual guide, not a guarantee: merge heights depend on the linkage chosen, so different linkages can suggest different 'natural' k on the same data.",
    ["The largest vertical gap in a dendrogram identifies the true number of clusters with statistical certainty, which is why it is treated as a formal hypothesis test in practice.",
     "All linkage methods produce identical merge heights on the same data, so the gap-based choice of k is a property of the data alone and cannot shift when you swap linkages.",
     "The correct k always equals the number of leaves divided by the height of the tallest merge, rounded down to the nearest whole number — a closed-form answer needing no judgement.",
     "Dendrogram-based k selection is fully objective precisely because no parameter or preprocessing choices have any influence on the shape the tree finally takes."],
    "A big jump in merge height suggests 'the algorithm suddenly had to join things that were far apart' — a plausible cluster boundary. But heights are computed BY the linkage: single's chained heights, complete's max-pair heights and Ward's variance costs tell different stories about the same points, so the 'natural' gap moves. It's evidence to combine with silhouette scores and domain sense, not a certainty; the leaves-divided-by-height formula is invented nonsense; and linkage/metric choices shape everything.",
    "The 'obvious' place to cut the tree was drawn by your choice of ruler — swap rulers and the obvious place moves.");

  /* ---- pass 6: DBSCAN ---- */

  tq("dbscan3",
    "Which ONE of these statements about DBSCAN's point types is actually TRUE?",
    "Border points are assigned to whichever core point's cluster claims them FIRST — so DBSCAN's output can genuinely differ between runs on the same data with the same parameters, purely from processing order.",
    ["DBSCAN is fully deterministic in every respect: identical data with identical parameters always produces identical labels for every single point, whatever order they are processed in.",
     "Border points are excluded from the minPts quota of their neighbours' eps-balls, and it is precisely this exclusion that relegates them to second-class cluster membership.",
     "Noise points are permanently noise for that dataset: no alternative choice of eps or minPts could ever bring a point once labelled noise inside any cluster.",
     "A core point can belong to two clusters simultaneously whenever it happens to sit within eps of both of their centres, receiving a fractional label from each."],
    "A border point (within eps of a core point, but not core itself) reachable from TWO clusters goes to whichever expansion reached it first — the one order-dependence in an otherwise deterministic algorithm. Core points' labels never depend on order; border points DO count inside other points' eps-neighbourhoods when tallying minPts; 'noise' is parameter-relative (grow eps and noise points join clusters); and clusters of core points are disjoint by construction — no dual membership.",
    "The suburbs between two cities belong to whichever city's bus arrived first — the downtowns were never in doubt.");

  tq("dbscan3",
    "Which ONE of these statements about the k-distance plot is actually TRUE?",
    "You plot every point's distance to its k-th neighbour, SORTED — the elbow marks where 'cluster interior' distances end and 'noise' distances begin, and that height is your eps candidate.",
    ["The k-distance plot shows accuracy against k, and its peak selects the best number of clusters to request.",
     "Points are plotted in dataset order, and eps is read off wherever the curve first crosses its own average.",
     "The plot graphs eps against the resulting cluster count, so you choose the eps that yields the count you want.",
     "The elbow gives the optimal minPts; eps must then be found separately by a grid search over the data."],
    "Sort all points by their distance to the k-th nearest neighbour (k ≈ minPts) and plot the sorted curve: points inside clusters have small, similar values (the flat shelf); noise points' values climb steeply. The bend between regimes is the natural density threshold — read eps there. DBSCAN doesn't take a cluster count so there's none to select; sorting, not dataset order, creates the readable shape; and the plot chooses eps GIVEN minPts, not the other way round.",
    "Line everyone up by how far their k-th friend lives — the bend where distances take off is where 'resident' becomes 'drifter'.");

  tq("dbscan3",
    "Which ONE of these statements about DBSCAN and cluster shape is actually TRUE?",
    "DBSCAN finds arbitrarily-shaped clusters because it grows them by CONNECTIVITY — chains of overlapping dense neighbourhoods — with no centroid and no compactness assumption anywhere in the algorithm.",
    ["DBSCAN handles odd shapes by fitting a flexible boundary curve around each cluster after the density scan completes, smoothing the raw point memberships into a contour.",
     "DBSCAN first runs a lightweight k-means pass to seed provisional centroids, then reassigns points along local density gradients toward whichever centroid pulls hardest.",
     "Arbitrary shapes emerge because DBSCAN measures each point's distance to its cluster's running mean rather than between individual points, letting the mean wander freely.",
     "DBSCAN only appears shape-flexible from the outside: internally it approximates every cluster by an ellipse with variable axes, then assigns points by ellipse membership."],
    "A cluster is a maximal set of density-connected points: core points within eps of each other chain together, and the chain can snake, spiral or ring — any shape density can trace. There are no centroids, no means, no boundary models, no ellipses at any stage; that absence IS the mechanism. K-means-style 'distance to centre' reasoning is exactly what DBSCAN discards, which is why it succeeds on the moons and rings that defeat centroid methods.",
    "No centre, no shape template — just 'crowded touching crowded', link by link, wherever the crowd wanders.");

  tq("dbscan3",
    "Which ONE of these statements about minPts is actually TRUE?",
    "Raising minPts demands MORE evidence of density before any point counts as core — smoothing away thin bridges and reclassifying small, sparse groups as noise, at the price of losing genuinely small clusters.",
    ["minPts sets the maximum size a cluster may reach before DBSCAN splits it into two separate clusters, keeping every discovered group below the configured membership ceiling.",
     "minPts fixes exactly how many clusters DBSCAN returns, since each cluster requires precisely that many core points and the algorithm stops once the quota of clusters is filled.",
     "Lowering minPts all the way to 1 makes every point noise, because with so weak a requirement no point can gather the evidence needed to satisfy the core condition.",
     "minPts and eps are interchangeable dials: doubling one while halving the other always yields an identical clustering, since only their product enters the density test."],
    "minPts is the density quorum: a point is core only if its eps-ball holds that many points. Higher values suppress noise-chaining and flimsy micro-clusters, but a real cluster smaller than minPts can no longer produce a core and dissolves. It caps nothing and fixes no cluster count; at minPts=1 EVERY point is core (each ball contains itself), abolishing noise entirely; and the two parameters probe different things — a count quorum and a radius — with no exchange rate between them.",
    "It's the quorum rule: how many neighbours must show up before your meeting counts as an official chapter.");

  tq("dbscan3",
    "Which ONE of these statements about DBSCAN's noise label is actually TRUE?",
    "Labelling points as noise (-1) is a FEATURE, not a failure — but treating '-1' as a cluster in downstream code (averaging it, profiling it as a 'segment') is a real bug, since it's a heterogeneous catch-all.",
    ["The -1 label marks the largest discovered cluster, following sklearn's convention of numbering clusters in descending size order starting from -1 for the biggest.",
     "Every dataset yields at least some noise under DBSCAN, since the algorithm is required to reject a fixed minimum fraction of points as outliers on every run.",
     "Noise points are simply the algorithm's failures: a properly tuned pair of eps and minPts values always reduces the noise count to exactly zero on real data.",
     "Downstream models should treat the noise group as one coherent segment, since all of its members demonstrably share the distinguishing behavioural trait of isolation."],
    "Refusing to force outliers into clusters is DBSCAN's honesty — k-means has no such option. But the -1 group is 'everything that fit nowhere': scattered, unrelated points with no shared profile, so computing its 'segment mean' or targeting it as a cohort is meaningless. -1 is not a size rank; dense datasets can legitimately have zero noise; noise isn't mis-tuning (forcing it to zero often means a bloated eps); and 'shares isolation' is not a marketing segment.",
    "The lost-property bin is honest bookkeeping — but write a customer profile of 'the bin' and you've profiled an umbrella, a glove and a parrot.");

  /* ---- pass 6: t-SNE & UMAP ---- */

  tq("tsne3",
    "Which ONE of these statements about perplexity is actually TRUE?",
    "Perplexity is roughly the EFFECTIVE NUMBER OF NEIGHBOURS each point attends to — the same data can show fragmented micro-clusters at low perplexity and merged blobs at high, so honest analyses show several values.",
    ["Perplexity sets the output dimensionality of the finished map, with the default of 30 producing the standard two-dimensional layout and larger values adding further axes.",
     "Higher perplexity always yields a strictly more accurate map, since attending to more neighbours means strictly more of the data's information enters the final embedding.",
     "Perplexity is really a learning-rate schedule that only affects how quickly the layout converges during optimisation, never the shape the final converged picture takes.",
     "The perplexity value directly fixes the number of clusters t-SNE will draw in the map, at a rate of roughly one island for every multiple of ten perplexity units."],
    "Perplexity tunes each point's Gaussian bandwidth so its neighbour distribution has that effective size — small values privilege very local structure (risking shattered artefacts), large values blend neighbourhoods (risking merged clusters). It has nothing to do with output dimension, isn't monotonically 'better' with size, genuinely changes the final structure rather than convergence speed, and sets no cluster count. Since the 'right' value is unknowable a priori, robust workflows sweep it (e.g. 5, 30, 100) and trust only features stable across the sweep.",
    "It's the size of each point's social circle — tiny circles fragment the town into cliques, huge circles blur it into one crowd.");

  tq("tsne3",
    "Which ONE of these statements about reading t-SNE maps is actually TRUE?",
    "The apparent SIZE and DENSITY of clusters in a t-SNE map are artefacts — the algorithm expands dense regions and contracts sparse ones, so a big spread-out island is not evidence of a big or diverse cluster.",
    ["Cluster area in a t-SNE map is directly proportional to that cluster's variance in the original high-dimensional space, so bigger islands reliably indicate more spread-out groups.",
     "Denser-looking islands correspond to genuinely denser regions of the original data, since preserving relative densities is one of the properties the objective explicitly protects.",
     "Distances between islands can be read as a similarity scale: clusters drawn three times farther apart in the map are close to three times less alike in the original space.",
     "If two islands touch or overlap anywhere in the map, their member points must genuinely overlap in the original feature space as well — contact is preserved both ways."],
    "t-SNE's bandwidths adapt per point: crowded neighbourhoods get sharp kernels and spread out; sparse ones get wide kernels and tighten — normalising away true density and size. Between-island distances are likewise unreliable (the KL objective barely constrains them). So area, density, inter-island spacing, and touching are all decoration; the trustworthy content is co-membership — which points share an island. Verify anything more in the original space.",
    "The mapmaker inflates busy districts and shrinks empty ones so everything's readable — never measure acreage off a tourist map.");

  tq("tsne3",
    "Which ONE of these statements about t-SNE preprocessing is actually TRUE?",
    "Running PCA down to ~50 dimensions BEFORE t-SNE is standard practice — it strips high-dimensional noise and slashes pairwise-distance cost, usually improving both the map's quality and its runtime.",
    ["t-SNE must always receive the raw untouched features, since any prior reduction destroys the local structure it needs.",
     "PCA before t-SNE is redundant, because t-SNE's internal Gaussian kernel already performs an implicit linear projection.",
     "The correct pre-reduction target is 2 dimensions, letting t-SNE merely fine-tune PCA's finished two-dimensional layout.",
     "Standardising features before t-SNE is forbidden, as equalising scales removes the density differences t-SNE plots."],
    "The pipeline PCA→50D→t-SNE is in the original paper: the discarded tail components are mostly noise that corrupts neighbour distances, and t-SNE's O(n²)-ish distance work gets cheaper in 50-D than 5000-D. t-SNE contains no implicit linear projection; pre-reducing all the way to 2-D would leave t-SNE nothing to do but distort PCA's picture; and standardising beforehand is often SENSIBLE (unit dominance corrupts distances) — density in the map is artefact anyway.",
    "Sweep the noise off the workbench with the cheap broom before the expensive microscope goes to work.");

  tq("tsne3",
    "Which ONE of these statements about t-SNE randomness is actually TRUE?",
    "Two t-SNE runs on identical data can place clusters in completely different positions and orientations — the loss cares only about neighbour relationships, so the global arrangement is free to vary with the random init.",
    ["t-SNE is deterministic by construction: its optimisation problem is convex, so every run from any random starting point descends to the same unique global layout.",
     "Only the map's colour assignments change between repeated runs; the coordinates themselves are fully reproducible without setting any seed, because the layout is unique.",
     "Differing layouts between runs are a symptom that perplexity was set too low; once perplexity is chosen correctly, repeated runs become identical without any seeding.",
     "The map's orientation encodes real feature directions: the vertical axis is the first principal component and the horizontal axis the second, exactly as in a PCA plot."],
    "The KL objective is non-convex and invariant to rotation, reflection and island rearrangement — many layouts score identically, and gradient descent from random starts lands on different ones. Nothing about that implies mis-tuned perplexity; coordinates (not colours) are what change; and the axes carry NO meaning (unlike PCA's ordered components). Practical habits: fix random_state for reproducibility, and never interpret 'cluster X is top-left' as a finding.",
    "Ask two decorators to seat the same friend groups — both keep friends together, but the tables land in different corners.");

  tq("tsne3",
    "Which ONE of these statements about validating t-SNE clusters is actually TRUE?",
    "Visual clusters in a t-SNE map are HYPOTHESES — confirm them in the original feature space (silhouette on original distances, cluster stability, domain checks), because the map can both invent and hide structure.",
    ["A clear separation between islands in the map is itself statistical proof that distinct clusters exist in the data, since the objective cannot manufacture gaps that are not real.",
     "Validation is unnecessary whenever perplexity was swept across several values, since any structure shared across the whole sweep cannot possibly be an artefact of the method.",
     "Silhouette scores must be computed on the two t-SNE coordinates rather than the original features, since those map distances are the ones the viewer actually sees and judges.",
     "If domain experts can confidently name each island after inspecting its members, the clustering is thereby validated and no further quantitative check is needed at all."],
    "t-SNE can shatter continuous manifolds into fake islands and merge distinct groups — at any single perplexity, and occasionally across a sweep. So the map generates candidates; the verdict comes from the ORIGINAL space: silhouette/stability computed on original distances (scoring on t-SNE coordinates grades the distortion itself — circular), resampling reproducibility, and domain sense as a complement (naming things is post-hoc storytelling on its own). Pictures propose; originals dispose.",
    "The treasure map is a lead, not the treasure — dig at the original coordinates before telling anyone you're rich.");

  /* ---- pass 7: feature engineering ---- */

  tq("feng3",
    "Which ONE of these statements about target encoding is actually TRUE?",
    "Naive target encoding lets each row's own label leak into its feature — a category seen once encodes to exactly its target value — so honest implementations compute the means OUT-OF-FOLD and smooth rare categories toward the global mean.",
    ["Target encoding is leak-proof by construction, since replacing a category with a mean uses aggregate information rather than any individual row's label, and aggregates cannot transmit leakage.",
     "The leak in target encoding only appears for high-cardinality columns with thousands of levels; for a column with ten categories, encoding on the full dataset is perfectly safe at any size.",
     "Out-of-fold computation exists purely to speed up target encoding on large data by parallelising across folds; statistically it produces the same numbers as encoding on everything at once.",
     "Smoothing rare categories toward the global mean is a stylistic preference that trades away accuracy for tidiness, since a category's own mean is always the best available estimate of it."],
    "A singleton category's encoded value IS its label — the feature becomes a copy of the target for that row, and CV scores soar while production collapses. The leak operates through each row's own label being inside the mean, regardless of cardinality (rare levels in a 10-category column leak identically). Out-of-fold changes the NUMBERS (each row's encoding excludes its own fold), and smoothing is statistics, not style: a mean over 2 rows is noise, so shrinking it toward the global mean is the honest estimate.",
    "If Paris appears once, 'average outcome for Paris' is just that customer's answer written in invisible ink.");

  tq("feng3",
    "Which ONE of these statements about one-hot versus ordinal encoding is actually TRUE?",
    "Ordinal-encoding an UNORDERED category invents a fake ranking that linear models take literally — but tree models often shrug it off, since they can split the integer line anywhere and carve categories apart regardless.",
    ["Ordinal encoding of unordered categories corrupts every model class equally, since the invented ordering enters the data itself and no algorithm can recover the truth once the integers are assigned.",
     "One-hot encoding preserves category order while ordinal encoding destroys it, which is why ordered ratings like poor/fair/good must always be one-hot encoded to keep their ranking intact.",
     "Tree models require one-hot encoding to handle categories at all, because a split on an integer-coded column would be meaningless to the tree's threshold-based decision rule.",
     "One-hot and ordinal encodings always yield identical model accuracy, differing only in memory usage, so the choice between them is purely an engineering convenience."],
    "A linear model must assign one coefficient to 'city': coding Paris=1, Tokyo=2, Cairo=3 forces it to treat Tokyo as 'twice Paris' — structural nonsense. A tree can split at 1.5 and again at 2.5, isolating any category, so the fake order costs it far less (though it can still bias split choices). The corruption is model-DEPENDENT; ordered ratings are exactly where ordinal coding is RIGHT (one-hot discards their order); trees handle integer codes fine; and the encodings genuinely change accuracy, not just memory.",
    "Numbering unranked cities pretends third beats first — a line-drawer believes it; a fence-builder just fences each city off anyway.");

  tq("feng3",
    "Which ONE of these statements about feature scaling is actually TRUE?",
    "Tree-based models are indifferent to monotone feature scaling — a split at 30,000 works the same as one at 3 after dividing by 10,000 — while distance-based and gradient-based methods can change answers entirely.",
    ["Every model benefits from standardisation, including decision trees and random forests, because equalised variances always make the optimisation landscape smoother regardless of the algorithm.",
     "Scaling changes what k-nearest-neighbours predicts but never what a regularised linear model learns, since penalty terms are defined to be invariant to the units of every feature.",
     "StandardScaler and MinMaxScaler produce identical outputs on any data whose distribution is symmetric, so for roughly Gaussian features the two are fully interchangeable in a pipeline.",
     "Scaling must always be fitted on the combined train and test data together, so that both partitions land in exactly the same range and no distribution shift can enter the pipeline."],
    "Trees compare one feature to a threshold — rescaling the feature just rescales the threshold, same partition, same predictions. KNN's distances and SVM/regularised-regression penalties are NOT unit-invariant: a feature in grams dominates the same feature in kilograms, and L2 punishes coefficients whose scale-dependence the penalty inherits. Standard and MinMax scalers differ even on Gaussians (z-scores vs range squeeze); and fitting scalers on train+test is the classic leak — fit on train, apply to test.",
    "The fence-builder doesn't care if the field is measured in feet or metres — the runner measuring distances between points cares enormously.");

  tq("feng3",
    "Which ONE of these statements about datetime features is actually TRUE?",
    "Encoding hour-of-day as a plain number 0-23 tells the model 23:00 and 00:00 are maximally FAR apart — cyclical encoding (sin/cos of the angle) restores the fact that they are one hour apart on a circle.",
    ["Hour-of-day as a raw 0-23 integer is the correct representation, because midnight genuinely is the farthest moment of the day from 23:00 in every behavioural sense that matters to a model.",
     "Cyclical sin/cos encoding of the hour destroys the ordering of times inside a single day, which is why it can only ever be used for features that carry no meaningful order at all.",
     "The sin transform alone fully captures a cycle; the cos column is a redundant duplicate kept only by convention, and dropping it changes nothing about what the model can learn.",
     "Timestamps should always be fed to models as raw Unix epoch seconds, since that single column already contains the hour, weekday and month signals in recoverable form."],
    "On the clock face, 23:00 and 00:00 are neighbours; on the number line they're the two ends. Mapping hour h to (sin(2πh/24), cos(2πh/24)) places hours on a circle where distances match reality. Sin ALONE is ambiguous (sin is equal at h and 12−h — you need cos to disambiguate); the pair preserves, not destroys, within-day adjacency; and epoch seconds bury periodic structure in one monotone number that threshold or linear models cannot unfold into hour/weekday cycles by themselves.",
    "Draw the hours on a clock face, not a ruler — the model then knows 11pm and midnight share a border.");

  tq("feng3",
    "Which ONE of these statements about missing-value indicators is actually TRUE?",
    "The FACT that a value is missing can itself be predictive — imputing without adding a was-missing indicator column silently destroys that signal, which is why sklearn's imputers offer add_indicator=True.",
    ["Once a sensible imputation strategy fills in each gap, all the information connected to the missingness has been fully restored, so an extra indicator column can only add redundant noise.",
     "Missingness indicators are only justified when values are missing completely at random, since informative missingness would bias the indicator column and must never be exposed to a model.",
     "Adding indicator columns is invalid for tree models specifically, because a split on a 0/1 column conveys nothing a split on the imputed value would not already have conveyed.",
     "Mean imputation with an indicator is statistically identical to dropping every row containing a missing value, so the choice between the two approaches is purely computational."],
    "'Income is blank' often means something — self-employed, refused to answer, a failed sensor — and models can exploit that if you preserve it as a 0/1 column. Imputation REPLACES the gap with a plausible value, erasing the distinction between 'was 50k' and 'was blank, guessed 50k'. Informative missingness is exactly when the indicator helps MOST (the random case is when it's useless); trees can absolutely use the flag (the imputed value alone doesn't reveal which rows were imputed); and dropping rows discards data, changing sample and estimates entirely.",
    "The blank on the form is an answer too — fill it in without noting it was blank, and you've shredded a clue.");

  /* ---- pass 7: feature selection ---- */

  tq("fsel3",
    "Which ONE of these statements about L1 (Lasso) selection is actually TRUE?",
    "Among several highly correlated informative features, Lasso tends to keep ONE and zero out the rest quasi-arbitrarily — so a zeroed coefficient is evidence of redundancy given the kept set, not proof the feature carries no signal.",
    ["A feature that Lasso drives to zero has been proven to carry no information about the target, since the optimisation only removes coefficients whose predictive contribution is exactly nil.",
     "Lasso distributes weight evenly across a group of correlated features, giving each a small but stable nonzero coefficient, which is why it is preferred for correlated inputs over ridge.",
     "The set of features Lasso selects is independent of the regularisation strength, so tuning alpha changes coefficient sizes but never which columns survive with nonzero weights.",
     "Lasso's selections are perfectly stable across resamples of the same data, which is what qualifies it as a selection method rather than merely a regularised regression."],
    "The L1 penalty pays for total absolute weight, so it concentrates a correlated group's signal into one representative — which twin survives can flip with tiny data perturbations. Reading zeros as 'useless' is the classic misinterpretation: the dropped twin predicts nearly as well ALONE as the kept one. Even distribution across a correlated group is ridge/elastic-net behaviour; alpha directly controls the surviving set (that's the regularisation path); and instability under resampling is Lasso's known weakness, patched by stability selection.",
    "Two identical witnesses: the court hears one and sends the other home — sent home isn't the same as having nothing to say.");

  tq("fsel3",
    "Which ONE of these statements about recursive feature elimination is actually TRUE?",
    "RFE's rankings are only as good as the importance scores of the model driving it — feed it a model whose importances are biased (say, impurity importance on mixed-cardinality data) and RFE inherits and compounds that bias at every elimination round.",
    ["RFE is model-agnostic in the strong sense: the order in which it eliminates features is a property of the data alone, so any base estimator with importances produces the same final subset.",
     "RFE evaluates every possible subset of the requested size and returns the global optimum, which is what separates it from cheaper greedy heuristics like forward selection.",
     "Each RFE round removes the feature with the HIGHEST importance, on the logic that dominant features mask the subtler contributions the analyst is usually searching for.",
     "RFECV chooses the number of features by testing on the training rows it fitted, since a separate validation split would leave too little data for the repeated refits to converge."],
    "RFE is a loop: fit, read importances, drop the weakest, repeat — so importance bias (cardinality favouritism, correlation masking) propagates into which features survive, and an early wrong drop is never revisited. Different base estimators genuinely produce different subsets; RFE is greedy, not exhaustive (2^n subsets are unenumerable); it removes the LOWEST-ranked feature each round; and RFECV scores candidate sizes by cross-validation precisely to avoid grading on the training rows.",
    "A talent show judged by a biased judge, round after round — the bias doesn't average out, it compounds with every cut.");

  tq("fsel3",
    "Which ONE of these statements about variance thresholding is actually TRUE?",
    "Variance thresholding never looks at the target — it can only remove near-constant columns, and a low-variance feature can still be the most predictive one in the dataset (a rare-event flag, for instance).",
    ["Removing low-variance features is guaranteed safe for accuracy, since a column that barely varies mathematically cannot contribute predictive signal about any target variable.",
     "Variance thresholding examines each feature's correlation with the label and drops the weakest, making it the fastest of the supervised univariate selection methods available.",
     "The variance threshold is scale-free: a column's variance is unchanged by unit conversions, so the same cutoff works identically whether income is stored in cents or in thousands.",
     "A binary flag that is 1 for only two percent of rows will comfortably pass any reasonable variance threshold, since rare events produce the highest variances of all."],
    "It's an unsupervised janitor: sweep out columns that are (nearly) constant. But 'low spread' and 'low signal' are different — a fraud flag at 2% prevalence has variance 0.0196 and might be the best feature you own; a careless threshold deletes it. It never sees the label (so it isn't supervised anything); variance scales with units SQUARED (cents vs thousands changes it by 10 orders of magnitude — scale first); and rare binary flags produce among the LOWEST variances, which is exactly the danger.",
    "The janitor bins whatever barely moves — including, occasionally, the silent alarm that only rings for fires.");

  tq("fsel3",
    "Which ONE of these statements about mutual information is actually TRUE?",
    "Mutual information detects ANY statistical dependency, linear or not — a perfect U-shaped relationship that scores zero Pearson correlation scores high MI — at the cost of needing more data and giving no direction or sign.",
    ["Mutual information and Pearson correlation always rank features identically, since both ultimately measure the same underlying dependence between each feature and the target.",
     "A mutual information score of zero leaves open the possibility of a strong nonlinear relationship, which is why MI screening must always be followed by a polynomial check.",
     "Mutual information reports the direction of each relationship — positive for increasing, negative for decreasing — making it a drop-in replacement for correlation in reports.",
     "Because mutual information is estimated from binned or nearest-neighbour statistics, it needs less data than correlation to reach the same reliability on small samples."],
    "MI measures how much knowing X reduces uncertainty about Y — symmetric-in-dependence, blind to shape. A U-curve (young and old buy, middle-aged don't) is invisible to Pearson but bright to MI, so the two rankings genuinely diverge on nonlinear data. MI = 0 (truly) means independence — nothing nonlinear hides below it; it's non-negative and directionless (a U has no single direction to report); and its estimators are data-HUNGRIER than correlation, not lighter — the price of shape-blindness.",
    "Correlation asks 'does the line slope?'; mutual information asks 'does knowing one tell you anything at all about the other?'.");

  tq("fsel3",
    "Which ONE of these statements about selection inside cross-validation is actually TRUE?",
    "Feature selection is part of the MODEL — it must run inside each CV training fold (e.g. as a pipeline step), because selecting on the full dataset first lets every test fold influence which features the model gets to use.",
    ["Selecting features on the full dataset before cross-validation is acceptable whenever the selector is unsupervised, since methods that never see the label have no channel through which to leak it.",
     "Running the selector inside each fold produces a different feature subset per fold, which invalidates the cross-validation — the whole point of CV is scoring one fixed feature set.",
     "Pre-selecting features on all the data biases cross-validation scores downward, making the model look worse than it is, so the practice is conservative rather than dangerous.",
     "Selection outside CV is fine as long as the final model is retrained from scratch on the training portion only, since retraining resets any influence the test rows may have had."],
    "The selection DECISION is learned from data, so it must be learned inside each fold like any other fitted component (Pipeline(selector, model) does this automatically). Supervised selectors leak most, but even unsupervised choices tuned on all data mildly contaminate; per-fold subsets are CORRECT — CV scores the whole procedure, not one frozen set; the bias from pre-selection is UPWARD (test rows helped pick features that flatter them); and retraining doesn't reset the leak, because the feature list itself still remembers the test rows.",
    "Choosing your exam-cheat-sheet after reading the exam, then 'studying honestly' — the sheet already knows the questions.");

  /* ---- pass 7: model selection ---- */

  tq("msel3",
    "Which ONE of these statements about the bias-variance decomposition is actually TRUE?",
    "Expected squared error splits into bias² + variance + IRREDUCIBLE noise — so a model can be simultaneously unbiased and low-variance and still miss badly wherever the outcome is inherently random.",
    ["Expected error equals bias plus variance exactly, so any model driven to zero on both components achieves perfect prediction on every dataset regardless of how noisy the domain is.",
     "Bias and variance always move in opposite directions along every axis of model design, so any change that reduces one is mathematically guaranteed to increase the other by at least as much.",
     "The variance term in the decomposition refers to the variance of the input features, which is why standardising all columns to unit variance directly reduces a model's expected error.",
     "Irreducible noise can be eliminated by ensembling enough diverse models, since averaging over sufficiently many independent predictors cancels every source of randomness in the limit."],
    "The third term is the ceiling nobody escapes: if identical customers genuinely behave differently, no model — however perfectly specified — predicts them all. The decomposition is bias² + variance + σ², not a two-term identity; the tradeoff is a TENDENCY, not a law (more data cuts variance without raising bias; better features cut bias without raising variance); the variance is over TRAINING SETS (how much the fitted model wobbles across resamples), not feature variance; and ensembling averages away model variance only — the coin flip inside the world remains.",
    "Two dart players can both aim true and hold steady — the dartboard that jiggles on its own is the error nobody removes.");

  tq("msel3",
    "Which ONE of these statements about learning curves is actually TRUE?",
    "If training and validation scores have CONVERGED at a mediocre level, collecting more rows of the same data will barely help — the model has hit a bias/feature ceiling, and the fix is capacity or better features.",
    ["A persistent gap between high training and lower validation scores means the model is underfitting, and the standard remedy is to reduce its capacity until the two curves finally separate.",
     "Learning curves plot performance against training epochs, so their primary use is choosing when to stop gradient descent rather than deciding whether more data is worth collecting.",
     "More training data reliably improves any model's validation score at every point of the curve, which is why data acquisition is always the safest first investment on any project.",
     "Converged-but-mediocre learning curves indicate label noise in the validation split, and the correct response is to relabel the validation set before touching the model."],
    "The two-curve read: big train-validation gap = variance problem (more data or regularisation helps); curves converged low = bias problem (more of the SAME data is nearly worthless — the model already extracts all it can; add capacity, features, or a different family). A large gap is OVERfitting, and the remedy runs opposite to shrinking capacity further; sklearn's learning_curve varies TRAINING SET SIZE (epoch curves are a different tool); more data helping 'always' is precisely what the converged regime refutes; and convergence is a statement about the model, not an accusation against the labels.",
    "When both the practice scores and the real scores plateau together at a C-grade, more practice sheets won't help — the student needs a better method.");

  tq("msel3",
    "Which ONE of these statements about no-free-lunch is actually TRUE?",
    "Averaged over ALL possible problems no algorithm beats any other — practical algorithm choice works only because real-world problems are a structured subset, so matching a model's assumptions to your data is the whole game.",
    ["The no-free-lunch theorem proves benchmarking is pointless, since any measured ranking of algorithms on real datasets is guaranteed to invert on the next real dataset you encounter.",
     "No-free-lunch applies only to neural networks and other high-capacity models; simple models like linear regression are exempt and can dominate universally across all problem types.",
     "The theorem says every algorithm achieves identical accuracy on every individual dataset, which is why observed performance differences must always be attributed to random seeds.",
     "No-free-lunch implies hyperparameter tuning cannot help, since improving performance on one configuration of a problem must exactly degrade it on the same problem elsewhere."],
    "NFL's average runs over a space dominated by structureless noise-worlds where nothing generalises; real problems (smoothness, sparsity, hierarchy, locality) live in a thin structured slice, and there, assumption-matching creates real, reproducible rankings. Benchmarks on REPRESENTATIVE tasks remain informative; no model family is exempt; the theorem speaks about averages across problems, not identical scores within one; and tuning within one problem is untouched by it — NFL never traded performance inside a single dataset.",
    "Across every conceivable universe no compass beats another — but you live in THIS universe, where north exists and compasses work.");

  tq("msel3",
    "Which ONE of these statements about Occam's razor in model selection is actually TRUE?",
    "When two models score within noise of each other, prefer the simpler — not for elegance, but because it's cheaper to run, easier to debug and explain, and has fewer ways to break silently under drift.",
    ["Occam's razor is a proven theorem of statistics stating that the simpler of any two models always generalises better to unseen data, whatever the measured validation scores say.",
     "The razor applies only when the simpler model scores strictly higher; at equal validation performance, the complex model should win because its extra capacity is a free insurance policy.",
     "Simplicity preferences are obsolete in the era of cheap compute, since serving cost and debugging effort no longer scale with model complexity on modern infrastructure.",
     "Choosing the simpler of two statistically tied models is p-hacking, since the tie means the data has expressed no preference and the choice must instead be made at random."],
    "A statistical tie means predictive evidence has run out — so decide on the axes where evidence remains: latency, memory, retraining cost, explainability, failure modes, drift robustness. All favour simplicity systematically. The razor is a heuristic, not a theorem (complex models often DO win when data supports them); untapped capacity at equal performance is risk (more to overfit under drift), not insurance; complexity costs are alive and well in production budgets and 3am debugging; and choosing by legitimate secondary criteria after a tie is sound decision theory, not p-hacking.",
    "Two engines, same lap times — buy the one with fewer parts to snap, and let the tie-break be the mechanic's bill.");

  tq("msel3",
    "Which ONE of these statements about stratified splitting is actually TRUE?",
    "Stratification preserves the CLASS RATIO in every fold — vital when a class is rare (a 5-fold split of 3% fraud can otherwise land a fold with almost none) — but it does nothing about group leakage or time order.",
    ["Stratified k-fold is the universally safest splitter: because it balances the label distribution, it simultaneously protects against duplicated entities straddling folds and against future rows training past ones.",
     "Stratification equalises the SIZE of the folds rather than their label mix, which matters because unequal fold sizes are the main source of variance in cross-validation estimates.",
     "For regression targets stratification is impossible even in principle, since continuous values have no classes to balance and no binning scheme could ever approximate the idea.",
     "Stratifying is unnecessary above roughly ten thousand rows, because at that scale random folds are mathematically guaranteed to reproduce the class ratio to within any tolerance."],
    "Random folds of an imbalanced set can starve a fold of positives, making per-fold metrics wildly unstable; stratification pins each fold's ratio to the global one. But it shuffles rows freely — a patient's visits still straddle folds (GroupKFold's job) and future rows still train past ones (TimeSeriesSplit's job): three orthogonal protections. Fold sizes are near-equal under ANY k-fold; regression stratification works fine via target binning; and large n shrinks but never zeroes the imbalance risk — guarantees come from the splitter, not the row count.",
    "It fills every exam room with the same mix of easy and rare cases — it says nothing about siblings sitting in different rooms or tomorrow's paper leaking into today's.");

  /* ---- pass 7: XGBoost ---- */

  tq("xgb3",
    "Which ONE of these statements about XGBoost and missing values is actually TRUE?",
    "XGBoost handles NaN natively by LEARNING a default direction per split — during training it tries sending the missing rows left and right and keeps whichever improves the loss — so imputation is optional, not required.",
    ["XGBoost silently drops every row containing a missing value before training begins, which is why datasets with widespread missingness show mysteriously shrunken training set sizes.",
     "XGBoost mean-imputes each column internally as a preprocessing step before any tree is built, so passing NaN or passing mean-filled columns produces exactly the same fitted model.",
     "Missing values are always routed to the left child by a fixed convention, chosen because the left branch by construction holds the lower half of every split's threshold range.",
     "Native missing handling only functions for categorical features; numeric columns containing NaN still raise an error unless the user imputes them before constructing the DMatrix."],
    "At each split the algorithm evaluates both assignments of the missing rows and bakes the better one into the tree as that node's default direction — missingness becomes learnable signal (informative missingness is exploited automatically, like a free indicator). Nothing is dropped; nothing is mean-imputed (NaN and mean-filled models genuinely differ); the direction is learned per node, not fixed left; and numeric NaN is the primary supported case.",
    "At every fork the tree learned which way to wave the blank-form customers — sometimes the blank itself was the tell.");

  tq("xgb3",
    "Which ONE of these statements about scale_pos_weight is actually TRUE?",
    "Setting scale_pos_weight rebalances training by multiplying the positive class's gradient contributions — it typically improves recall-oriented metrics but DISTORTS predicted probabilities, which then need recalibration if used as real probabilities.",
    ["scale_pos_weight duplicates minority rows inside the training matrix until the classes are numerically balanced, so its effect is identical to random oversampling with replacement.",
     "The parameter adjusts the decision threshold applied after training rather than the training process itself, leaving the fitted trees and their leaf values completely unchanged.",
     "Setting scale_pos_weight equal to the negative-to-positive ratio makes the model's predicted probabilities MORE calibrated, since the correction exactly cancels the base-rate skew.",
     "scale_pos_weight affects only the first boosting round; later rounds see residuals rather than labels, so the weighting fades out of the ensemble as training proceeds deeper."],
    "It scales the loss gradients (and hessians) of positives — errors on the rare class push harder on every round's tree. That shifts the model's operating point toward catching positives, but the outputs now reflect a reweighted world: a stated 0.5 no longer means 50% in the real base rate (recalibrate, or threshold-tune instead). No rows are duplicated; training itself changes (not a post-hoc threshold); calibration gets WORSE, not better; and the weighting applies to every round's gradient computation, undiminished.",
    "Paying triple for missed frauds makes the guard vigilant — and makes his stated 'certainties' exaggerations you must translate back.");

  tq("xgb3",
    "Which ONE of these statements about early stopping in XGBoost is actually TRUE?",
    "With early_stopping_rounds, training halts when the validation metric fails to improve for that many consecutive rounds — and the returned model's best_iteration marks the peak, which predict() uses rather than the final overshot round.",
    ["Early stopping monitors the TRAINING loss and halts at its minimum, which is why no validation set needs to be passed to fit() for the mechanism to function correctly.",
     "Training halts the very first round the validation metric fails to improve, since any single non-improving round already proves the model has passed its generalisation peak.",
     "After early stopping triggers, predictions automatically use every round that was built including the non-improving tail, so the user must manually truncate the ensemble to the peak.",
     "early_stopping_rounds and n_estimators are mutually exclusive settings: providing both raises an error because a fixed tree count contradicts a data-driven stopping rule."],
    "The patience window matters: validation metrics wobble, so stopping at the FIRST non-improvement would quit on noise — the rule waits for a sustained plateau. It requires an eval_set (training loss essentially never stops improving); modern XGBoost predicts from the best iteration automatically; and n_estimators coexists happily as the ceiling the stopper may never reach. One subtlety worth remembering: the eval_set has now influenced model choice, so it's no longer a pristine test set.",
    "Give the metric a patience of fifty rounds: shrug off bad days, stop at genuine plateaus, and rewind to the best day when done.");

  tq("xgb3",
    "Which ONE of these statements about histogram-based tree building is actually TRUE?",
    "tree_method='hist' buckets each feature into ~256 bins and evaluates splits only at bin edges — a tiny approximation that slashes split-search cost and memory, usually with negligible accuracy loss; LightGBM made the same bet.",
    ["Histogram binning evaluates strictly more candidate thresholds than exact greedy search does, which is how it improves both accuracy and speed simultaneously over the exact method.",
     "The 'hist' method changes only memory layout and touches no numerical decisions, so exact and hist runs of the same configuration produce bit-identical trees on every dataset.",
     "Binning features into 256 buckets loses so much resolution that hist is only usable on datasets with fewer than a hundred distinct values per feature to begin with.",
     "The histogram method requires all features to be categorical, since continuous values cannot be meaningfully assigned to a fixed number of discrete buckets without supervision."],
    "Exact greedy sorts every feature and tests every distinct value as a threshold — O(n log n) per feature per node. Hist pre-buckets values into coarse quantile bins; candidate splits are the bin boundaries: hundreds of candidates instead of millions, integer-indexed, cache-friendly, plus the parent-minus-sibling histogram subtraction trick. Accuracy cost is tiny because a threshold's exact position between neighbours rarely matters. It tests FEWER candidates, produces slightly DIFFERENT (not identical) trees, and thrives precisely on continuous features with millions of distinct values.",
    "Stop auctioning at every penny — bid in whole pounds. The hammer falls almost identically, a hundred times faster.");

  tq("xgb3",
    "Which ONE of these statements about XGBoost versus LightGBM tree growth is actually TRUE?",
    "Classic XGBoost grows trees LEVEL-WISE (whole depth at a time) while LightGBM grows LEAF-WISE (always splitting the highest-gain leaf) — leaf-wise reaches lower loss with fewer leaves but overfits more readily, hence num_leaves as its key control.",
    ["LightGBM's leaf-wise strategy is a pure speed optimisation with no statistical consequences, since any tree built leaf-wise can be exactly reproduced by some level-wise growth schedule.",
     "Level-wise growth focuses effort on the single most promising region of the data, while leaf-wise growth spreads splits evenly across all branches to keep the tree balanced.",
     "Leaf-wise trees are shallower than level-wise trees of the same leaf count by construction, which is why LightGBM models resist overfitting more strongly than XGBoost models.",
     "The two growth strategies always produce identical ensembles whenever the learning rate and number of rounds match, differing only in the order the identical splits are discovered."],
    "Level-wise expands every node at the current depth (balanced, hardware-friendly, implicitly conservative); leaf-wise greedily splits wherever gain is highest, producing deep, lopsided trees that chase the loss efficiently — and chase noise just as efficiently on small data, so num_leaves (and min_data_in_leaf) replace max_depth as the crucial brake. The descriptions in the second option are swapped; leaf-wise trees are DEEPER and more overfit-prone, not less; and the strategies genuinely build different trees, not reordered identical ones.",
    "One gardener trims the whole hedge a layer at a time; the other keeps cutting wherever growth is wildest — sharper hedge, deeper holes.");

  /* ---- pass 8: work mode — digital assets ---- */

  tq("wcrypto",
    "Which ONE of these statements about smart contracts is actually TRUE?",
    "'Code is law' breaks down in practice: a smart contract executes exactly as WRITTEN, including its bugs — so the legal question of what parties actually AGREED can diverge from what the code did, and courts may still intervene.",
    ["Because a smart contract's execution is deterministic and tamper-resistant, its output is legally final in most jurisdictions, and no court can order a remedy that contradicts what the code produced.",
     "Smart contracts are legally binding contracts by definition, since the offer, acceptance and consideration are all encoded on-chain at deployment, satisfying contract formation automatically.",
     "A smart contract can halt its own execution when it detects that its behaviour has diverged from the parties' commercial intent, which is what distinguishes it from ordinary software.",
     "Smart contracts eliminate counterparty risk entirely, because both parties' obligations are locked into the code before execution and neither side retains any ability to default."],
    "The code executes mechanically — that's its virtue and its risk. A drafting bug (a reentrancy flaw, a mispriced oracle) executes as faithfully as the intended logic, and the transfer it makes may not match any agreement a court would recognise. Legal enforceability still depends on ordinary contract-law elements existing AROUND the code; the code has no access to 'commercial intent'; and counterparty risk migrates rather than vanishes — into code risk, oracle risk and key-management risk.",
    "The vending machine gives exactly what its wiring says — if the wiring's wrong, the law of contracts doesn't shrug and walk away.");

  tq("wcrypto",
    "Which ONE of these statements about stablecoins is actually TRUE?",
    "A stablecoin's peg is only as good as its BACKING and redemption mechanics — fiat-backed coins depend on reserve quality and access, while algorithmic designs have collapsed entirely, which is why regulators focus on reserves and redemption rights.",
    ["All stablecoins hold one unit of their reference currency in a bank account for every token issued, which is why depegging events are technically impossible for any coin using the label.",
     "The stability of a stablecoin derives from its blockchain's consensus mechanism, so a coin on a sufficiently decentralised chain cannot lose its peg whatever its reserves contain.",
     "Algorithmic stablecoins proved more resilient than fiat-backed ones in stress events, since code-driven supply adjustment reacts faster than any human treasury operation could.",
     "Regulators treat all stablecoins identically to volatile cryptoassets, since the peg makes no difference to the risks they pose to holders or to payment systems that adopt them."],
    "The label 'stable' is a claim, not a property: fiat-backed coins vary enormously in reserve quality (cash and T-bills vs commercial paper and loans) and in who may redeem, while TerraUSD's algorithmic design spiralled to zero in 2022. Hence the regulatory anatomy — reserve composition, segregation, audit, redemption at par — and hence stablecoins getting their own regimes (e.g. as payment instruments) distinct from volatile cryptoassets, because a payment-adopted coin that depegs transmits risk system-wide.",
    "'Stable' is a promise about what's in the vault and who may knock on it — some vaults held cash, one held a circular argument.");

  tq("wcrypto",
    "Which ONE of these statements about crypto custody is actually TRUE?",
    "Controlling the private key IS controlling the asset — so custody of cryptoassets means key management, and a custodian's failure (lost keys, commingled wallets, hacks) can lose client assets in ways traditional custody structures were built to prevent.",
    ["Cryptoasset custody is legally identical to holding client money in a segregated bank account, since both arrangements give the client a statutory right to recover their property from any insolvency.",
     "A lost private key can always be regenerated by the blockchain's validators upon proof of identity, so key loss is an operational inconvenience rather than a genuine risk to client assets.",
     "Custodians eliminate hacking risk by holding all client keys in a single hot wallet, where continuous online monitoring provides stronger protection than offline storage ever could.",
     "Because blockchain transactions are reversible within a settlement window, a custodian who transfers assets in error can recall them, making operational mistakes low-consequence events."],
    "Whoever holds the key spends the coin — there is no registrar to appeal to. Lost keys are unrecoverable by design (no validator can regenerate them); on-chain transfers are irreversible (no recall window); concentrating keys in one hot wallet is the classic exchange-hack pattern (cold storage plus key sharding is the standard); and client protections depend on the legal and operational structure the custodian actually built — segregation and trust status vary, which is exactly what regulators now probe.",
    "The key isn't a password to the vault — the key IS the vault. Drop it in the sea and the sea owns your gold.");

  tq("wcrypto",
    "Which ONE of these statements about public versus permissioned DLT is actually TRUE?",
    "Regulated finance mostly experiments with PERMISSIONED ledgers — known validators, controllable governance, no public-chain gas volatility — trading away the censorship-resistance that makes public chains interesting in the first place.",
    ["Permissioned ledgers are simply public blockchains run at a smaller scale, and any application built for one deploys onto the other unchanged, since the underlying data structures are identical.",
     "Public blockchains satisfy financial-sector requirements more easily than permissioned ones, because their openness maps directly onto regulators' demands for transparency and auditability.",
     "The defining feature of a permissioned ledger is that its contents are encrypted end to end, whereas public chains store all transactions in plaintext for anyone to read and copy.",
     "Permissioned DLT eliminates the need for governance arrangements, since the small validator set means disputes about upgrades and reversals can no longer arise between participants."],
    "Banks piloting settlement or bond issuance want known counterparties, legal accountability, predictable throughput and the power to fix errors — a permissioned validator set delivers those, at the price of reintroducing trusted parties (arguably the thing blockchains were invented to remove). Permissioned vs public is an access-and-governance distinction, not scale or encryption; public chains' openness clashes with data-protection and finality requirements; and governance becomes MORE explicit with known members, not unnecessary.",
    "A private club can vet members, keep minutes and fix mistakes — everything the open square can't promise, minus the reason crowds gathered there.");

  tq("wcrypto",
    "Which ONE of these statements about the UK's cryptoasset regime is actually TRUE?",
    "The perimeter is drawn by WHAT the token does, not what it's called — a token conferring share-like rights is a security whatever its branding, while genuinely unbacked exchange tokens historically sat outside most conduct rules except promotions and AML.",
    ["The UK regime classifies tokens by their marketing name: anything sold as a 'utility token' is exempt from securities regulation regardless of the rights it actually confers on the holder.",
     "All cryptoassets fall entirely outside the UK regulatory perimeter, including tokens that confer equity-like rights, which is why no crypto issuer has ever needed FCA authorisation.",
     "Financial promotion rules do not apply to cryptoasset marketing, since promotions regulation is triggered only by products that sit fully inside the regulatory perimeter already.",
     "A firm registered with the FCA for anti-money-laundering purposes is thereby authorised to conduct the full range of regulated financial activities involving cryptoassets."],
    "Substance over label is the organising principle: security tokens (ownership/debt-like rights) sit inside the perimeter like their traditional equivalents; e-money tokens under e-money rules; unbacked exchange tokens sat largely outside conduct regulation — but financial promotions rules were extended to reach their marketing, and AML registration applies. That registration is NOT authorisation — a distinction the FCA repeatedly stresses because firms have implied otherwise to customers.",
    "Call it a 'utility token' all you like — if it walks like a share and votes like a share, the perimeter reads the walk, not the label.");

  /* ---- pass 8: work mode — payments & fintech ---- */

  tq("wpay",
    "Which ONE of these statements about safeguarding is actually TRUE?",
    "Safeguarded customer funds at a payment or e-money firm are NOT deposits — no FSCS protection applies — the protection is segregation itself, so sloppy reconciliation or commingling directly translates into customer losses if the firm fails.",
    ["Funds held at an authorised e-money institution carry FSCS deposit protection up to the standard limit, exactly as a bank account does, which is why the safeguarding rules are largely a formality.",
     "Safeguarding requires firms to hold customer funds in their own working-capital account, so that the money is instantly available to meet customer payment instructions at any hour.",
     "A safeguarding audit is optional for e-money firms of every size, since the segregation requirement is self-certifying and reconciliations need only be performed at financial year-end.",
     "Customer funds at a failed payments firm rank alongside ordinary unsecured creditors in the insolvency, since segregation affects operations during trading but dissolves on failure."],
    "The deal is: your money is not a bank deposit (the firm can't lend it, and FSCS doesn't cover it) — instead it must sit segregated in designated accounts or be insured/guaranteed, so on insolvency it comes back to customers ahead of general creditors. That whole promise lives or dies on operational discipline: daily reconciliation, correctly designated accounts, no commingling — which is why safeguarding failures dominate FCA supervisory findings for payments firms.",
    "No safety net under the tightrope — the rule is that the rope itself must be kept perfect, and frayed rope IS the customer's loss.");

  tq("wpay",
    "Which ONE of these statements about open banking is actually TRUE?",
    "Open banking flips the default on bank data: with the CUSTOMER's consent, banks must let authorised third parties access accounts via APIs — the bank cannot refuse because the third party is a competitor, which is the point.",
    ["Open banking permits any registered company to query any UK bank account without the account holder's involvement, since the regime's purpose is transparency of the banking system itself.",
     "Under open banking, third-party providers access customer accounts by asking customers to share their online banking passwords, which the regime made legally safe to hand over.",
     "Banks may decline API access to third parties whose services compete with the bank's own offerings, since the regime protects innovation by incumbents and entrants symmetrically.",
     "Open banking data flows are one-way and read-only in every case: no authorised third party can initiate a payment from a customer's account, only view its transaction history."],
    "The regime (PSD2 in Europe, CMA Order plus FCA rules in the UK) compels account providers to open standardised APIs to authorised AISPs (data access) and PISPs (payment initiation) once the CUSTOMER consents — consent is the trigger, and competitive discomfort is not a refusal ground. Screen-scraping with shared passwords is what APIs replaced; and payment initiation (PISP) is precisely the second half of the regime, so 'read-only in every case' is wrong.",
    "Your account data stopped being the bank's moat — you can hand the keys to a rival app, and the bank must build the door.");

  tq("wpay",
    "Which ONE of these statements about APP fraud is actually TRUE?",
    "In authorised push payment fraud the CUSTOMER authorises the payment — tricked into sending it — which is why chargeback and unauthorised-transaction protections historically failed, and why the UK built a dedicated reimbursement regime.",
    ["APP fraud involves criminals initiating payments without the account holder's knowledge, which is why it has always been covered by the unauthorised-transaction refund rules in payments law.",
     "Because the customer authorised the transfer, APP fraud losses are legally unrecoverable in the UK, and no reimbursement framework exists or is planned for victims of such scams.",
     "APP fraud is confined to card payments, since push payments over Faster Payments settle too quickly for fraudsters to exploit the window between initiation and settlement.",
     "The APP reimbursement rules place the full cost of reimbursing victims on the sending bank alone, on the theory that only the sending side is positioned to detect a scam in progress."],
    "The signature of APP fraud is genuine authorisation obtained by deception (fake invoices, impersonated banks, romance scams) — so 'unauthorised transaction' refunds don't bite, and faster payments' speed plus irrevocability made it the UK's dominant fraud category. The response: a mandatory reimbursement regime for Faster Payments scams with costs SHARED between sending and receiving firms (receiving banks host the mule accounts), subject to limits and a customer-caution standard.",
    "The victim signs the transfer with their own hand — the con is upstream of the signature, which is why the old refund rules looked straight past it.");

  tq("wpay",
    "Which ONE of these statements about e-money versus bank deposits is actually TRUE?",
    "An e-money balance is a CLAIM on the issuer redeemable at par — the issuer cannot lend it out and it earns no interest as of right — whereas a bank deposit is lent onward and protected by FSCS: different legal animals behind similar-looking apps.",
    ["E-money issuers, like banks, fund lending from customer balances, and the interest margin they earn on that lending is the principal revenue model of the UK's e-money institutions.",
     "A customer balance in an e-money account is legally a deposit, which is why e-money institutions must obtain a full banking licence before issuing any prepaid balance at all.",
     "E-money balances are redeemable only at the issuer's discretion and at prevailing market rates, reflecting the investment risk customers accept when they load funds onto the product.",
     "The distinction between e-money and deposits was abolished in the UK when payment apps gained the ability to issue debit cards, since card issuance is the defining banking activity."],
    "E-money is prepaid value: issued on receipt of funds, redeemable at par on demand, safeguarded rather than lent (no maturity transformation — that's the licence boundary), no FSCS. Banks take deposits BECAUSE they lend them (hence prudential regulation and deposit insurance). The app screens look identical; the insolvency outcomes and legal rights are not — which is why regulators police firms that let customers believe an e-wallet is a bank account.",
    "One app holds your money in a locked box it may not touch; the other lends your money out and buys insurance for the promise — same screen, different machinery.");

  tq("wpay",
    "Which ONE of these statements about strong customer authentication is actually TRUE?",
    "SCA requires two INDEPENDENT factors from different categories — knowledge, possession, inherence — so a password plus a memorable answer fails (same category), and independence means one compromise mustn't break both.",
    ["Any two credentials satisfy SCA, including a password paired with a memorable word, since the rule counts the number of checks performed rather than the categories they come from.",
     "SCA applies uniformly to every electronic payment without exception, which is why low-value contactless transactions always require a PIN or biometric before they can complete.",
     "Biometric factors are excluded from SCA because they cannot be replaced if compromised, so compliant authentication must combine something known with something possessed only.",
     "The two SCA factors must be verified by different regulated firms, one by the card issuer and one by the merchant's bank, to guarantee the independence the regulation demands."],
    "Two from three distinct categories: something you know (password/PIN), have (phone, card), are (fingerprint, face). Two knowledge factors is one category twice — non-compliant; and the elements must be independent so a stolen phone doesn't yield both. Exemptions exist by design (low-value contactless within limits, trusted beneficiaries, transaction risk analysis) — that's why the corner-shop tap works; biometrics are the 'inherence' category, expressly included; and both factors are verified by the customer's payment service provider.",
    "A lock needs two different KINDS of key — two passwords is the same kind twice, and the burglar who reads your notebook has both.");

  /* ---- pass 8: work mode — cloud & AWS ---- */

  tq("waws",
    "Which ONE of these statements about the shared responsibility model is actually TRUE?",
    "AWS secures the infrastructure; the CUSTOMER secures what they build on it — misconfigured S3 buckets, over-broad IAM roles and unpatched instances are customer-side failures, which is why most cloud breaches are configuration, not provider, events.",
    ["Under shared responsibility, AWS assumes liability for any data breach occurring on its platform, including those caused by a customer leaving a storage bucket publicly readable.",
     "The model splits duties by data sensitivity: AWS secures all regulated or personal data workloads end to end, while customers secure only their non-sensitive development environments.",
     "Shared responsibility applies only to infrastructure-as-a-service; for managed services the provider takes over every security duty, including the customer's own access management.",
     "The division of responsibilities is negotiated separately in each enterprise agreement, so no general statement about who secures what in AWS can be made across customers."],
    "'Security OF the cloud' (facilities, hardware, hypervisor) belongs to AWS; 'security IN the cloud' (data, identity and access, network rules, patching what you control) belongs to you — and the boundary shifts with the service model (more managed = more provider-side, but access management and data classification NEVER leave the customer). The headline cloud incidents — public buckets, leaked keys, wildcard permissions — sit on the customer side, which is precisely what supervisors expect firms to evidence controls over.",
    "The landlord armours the building; you still lock your own flat — and nearly every burglary walks through a tenant's open door.");

  tq("waws",
    "Which ONE of these statements about regions and availability zones is actually TRUE?",
    "An availability zone is one or more isolated data centres; multi-AZ architecture protects against a facility failure, but a REGION-wide or control-plane event needs multi-region design — and data residency is a region choice with regulatory weight.",
    ["Availability zones within a region share the same physical building and power supply, with isolation provided purely by software partitions between customer workloads on shared racks.",
     "Deploying across two availability zones protects a workload against every possible AWS failure mode, since no incident in the provider's history has ever spanned multiple zones at once.",
     "Data stored in any AWS region replicates automatically to every other region worldwide for durability, which is why data-residency commitments cannot be made on public cloud platforms.",
     "Regions exist purely for latency optimisation, and the choice between them carries no legal or regulatory significance for a financial services firm holding customer data."],
    "AZs are physically separate facilities with independent power and networking, linked by low-latency fibre — the unit of fault isolation for building resilient systems. But regional service events happen, so critical workloads plan beyond one region; and data stays in the region YOU select (no automatic global replication), which is exactly why region choice is a data-residency and outsourcing-compliance decision, not just a latency one — supervisors ask where the data is and what fails together.",
    "Two fire-isolated warehouses in one city save you from a fire — not from the city flooding; and which country the city is in is a legal question.");

  tq("waws",
    "Which ONE of these statements about cloud concentration risk is actually TRUE?",
    "Regulators' concern scales beyond any single firm: when much of the financial sector depends on a handful of cloud providers, one provider's failure becomes a potential SYSTEMIC event — hence critical-third-party regimes reaching providers directly.",
    ["Concentration risk in cloud is purely a firm-level procurement issue, and no UK or international regime gives supervisors any direct powers over the technology providers themselves.",
     "The concentration concern was resolved by the shared responsibility model, since dividing security duties between provider and customer also divides the systemic dependency between them.",
     "Because each firm contracts with the cloud provider separately, simultaneous sector-wide disruption is contractually impossible, and supervisors treat multi-firm outages as inconceivable.",
     "Regulators require every financial firm to run identical workloads on at least three cloud providers simultaneously, which has eliminated concentration as a supervisory topic."],
    "One provider hosting core services for many banks, insurers and payment firms turns an outage into a sector event no single firm's resilience planning can contain — the gap that critical-third-parties regimes (e.g. under FSMA 2023, and DORA's oversight of ICT providers in the EU) exist to fill, giving authorities direct oversight of designated providers. Firm-level contracts don't prevent correlated failure; shared responsibility divides security work, not systemic dependency; and no triple-provider mandate exists (exit plans and substitutability analysis are what's actually expected).",
    "When every shop in town rents the same generator, the generator's bad day is the town's bad day — so the inspectors now visit the generator too.");

  tq("waws",
    "Which ONE of these statements about operational resilience is actually TRUE?",
    "The UK regime starts from the assumption that disruption WILL happen — firms must identify important business services, set impact tolerances, and prove through testing they can stay within them — a shift from preventing failure to surviving it.",
    ["Operational resilience rules require firms to guarantee uninterrupted service availability, and any outage of a customer-facing system is automatically a breach of the framework.",
     "The regime measures resilience at the level of individual IT systems, so a firm that patches its servers promptly has thereby discharged its operational resilience obligations in full.",
     "Impact tolerances are voluntary aspirations with no testing requirement attached, published mainly to reassure customers rather than to drive any internal investment decisions.",
     "Operational resilience obligations apply only to services a firm runs on-premises, since outsourced and cloud-hosted services fall exclusively under the provider's own regulatory duties."],
    "The framework (FCA/PRA, echoed by DORA) inverts the old posture: assume the failure, then ask 'which BUSINESS SERVICES matter, how much disruption is intolerable (the impact tolerance), and can we demonstrably remain within it under severe-but-plausible scenarios?'. It's service-level, not server-level — mapping people, processes, third parties AND clouds behind each service; tolerances must be tested against scenarios; outages aren't automatic breaches (exceeding a tolerance triggers scrutiny); and outsourcing never outsources accountability.",
    "Stop promising the ship won't hit weather — chart which cargo must survive the storm, and rehearse the storm until it does.");

  tq("waws",
    "Which ONE of these statements about cloud exit planning is actually TRUE?",
    "Supervisors expect REALISTIC exit plans for material cloud outsourcing — data portability, alternative arrangements, stressed-exit scenarios — because deep managed-service integration creates lock-in that makes 'we'd just migrate' an empty sentence.",
    ["Exit plans are required only at the point a firm actually decides to leave its provider, since drafting them earlier would waste effort on a scenario that may never materialise at all.",
     "A commitment in the outsourcing contract that the provider will return the firm's data on termination is, by itself, a complete exit plan satisfying UK supervisory expectations.",
     "Exit planning obligations apply only to the smallest firms, on the basis that larger institutions have the commercial leverage to prevent any provider relationship from failing.",
     "Using a provider's proprietary managed services reduces exit risk, since deeper integration obliges the provider to offer stronger migration assistance when the relationship ends."],
    "The expectation (SS2/21, EBA outsourcing guidelines, DORA) is a plan you could actually execute: where the data is and in what format, what substitutes exist, how long a stressed migration takes, and what runs degraded meanwhile — tested and maintained BEFORE any exit looms. A data-return clause retrieves bytes, not a working service; the obligation scales UP with materiality and firm importance; and proprietary managed services are the lock-in mechanism — rebuilding around them elsewhere is precisely the cost the plan must honestly price.",
    "The fire escape gets drawn before the fire, and 'the landlord will hand back our furniture' is not a plan for where the family sleeps.");

  /* ---- pass 8: work mode — AI in finance ---- */

  tq("wai",
    "Which ONE of these statements about model explainability is actually TRUE?",
    "Post-hoc explanations like SHAP APPROXIMATE a complex model's behaviour — they aid understanding but can mislead, so for high-stakes credit decisions the honest choice is often between an interpretable model and rigorously validated explanations.",
    ["SHAP values reveal the exact causal reasoning a model followed for each decision, so attaching them to any decision letter fully discharges a lender's obligation to explain adverse outcomes.",
     "A model accompanied by post-hoc explanations is by definition transparent, and regulators draw no distinction between inherently interpretable models and black boxes with explanations bolted on.",
     "Explainability concerns disappear when a model's accuracy is sufficiently high, since a demonstrably correct decision requires no account of how the decision was actually reached.",
     "Feature attributions are identical across all explanation methods applied to the same model and prediction, which is why the choice of explanation technique never requires justification."],
    "Attribution methods answer 'what did the model's output correlate with here?' — useful, but they are approximations with known failure modes (correlated features split credit oddly, attributions aren't causal, different methods disagree on the same prediction). Regulators care about the distinction: an inherently interpretable scorecard's logic IS its explanation, while a black box plus SHAP is a model plus a second model of the model. Accuracy doesn't buy exemption — adverse-decision explanation duties and Consumer Duty apply regardless.",
    "The commentary describes the chess engine's move — it isn't the engine's mind, and two commentators can describe one move differently.");

  tq("wai",
    "Which ONE of these statements about bias in ML systems is actually TRUE?",
    "Dropping protected characteristics from the features does NOT prevent discrimination — models reconstruct them through proxies like postcode and shopping patterns — so fairness must be MEASURED on outcomes, not assumed from blindness.",
    ["Removing protected attributes from the training data makes discriminatory outcomes impossible, since a model cannot act on information that is absent from its input columns.",
     "Bias in a model always traces back to bias held by the engineers who built it, so diverse development teams are both necessary and sufficient to guarantee fair model outcomes.",
     "A model trained on historical lending decisions inherits no bias from them, because the mathematical fitting process strips away human prejudice while retaining the predictive signal.",
     "UK equality law exempts algorithmic decisions from discrimination claims, since liability requires a human decision-maker exercising judgement about the specific individual affected."],
    "'Fairness through unawareness' fails because correlated features stand in for the removed attribute — the model learns the pattern without the label. Historical training data BAKES IN past discrimination (the model learns yesterday's decisions, prejudice included); team diversity helps but guarantees nothing measurable; and equality law applies to outcomes however produced — indirect discrimination doctrine fits proxy discrimination naturally. The workable posture: test outcome metrics across groups, document, monitor drift.",
    "Strike the word from the file and the postcode whispers it anyway — fairness is checked at the outcomes, not the inputs.");

  tq("wai",
    "Which ONE of these statements about generative AI in regulated firms is actually TRUE?",
    "LLMs generate plausible text with NO internal check of truth — hallucinated facts arrive fluently and confidently — so regulated use demands grounding in verified sources, human review proportionate to stakes, and controls on what data enters prompts.",
    ["Hallucination is a bug specific to early model versions that has been engineered out of current systems, so retrieval grounding and human review now persist only as legacy precautions.",
     "An LLM's confidence in its phrasing tracks the factual reliability of its output, so firms can safely automate any workflow where the model expresses itself without hedging language.",
     "Because LLM outputs are generated fresh rather than copied, they cannot misstate regulatory requirements, defame individuals, or leak confidential information from their prompts.",
     "Customer-facing chatbot output falls outside the financial promotions and Consumer Duty perimeter, since rules drafted for human communications cannot apply to machine-generated text."],
    "Next-token prediction optimises plausibility, not truth — fluency and confidence are stylistic properties, uncorrelated with accuracy, and hallucination remains inherent (mitigated, not cured, by retrieval grounding). Generated text can absolutely misstate rules, defame, or expose prompt contents; and regulatory perimeters attach to the COMMUNICATION and its effect on customers, not the authorship mechanism — a chatbot's advice-shaped output is the firm's output. Hence: grounding, logging, human-in-the-loop by stakes, and prompt-data governance.",
    "The eloquent intern never says 'I don't know' — brilliant drafting, zero fact-checking, and everything it signs goes out under YOUR letterhead.");

  tq("wai",
    "Which ONE of these statements about AI governance expectations is actually TRUE?",
    "The UK approach regulates AI through EXISTING frameworks — SM&CR accountability, model risk management, Consumer Duty — so 'the algorithm decided' is not a defence: a named senior manager owns the outcome, however automated the pipeline.",
    ["The UK enacted a single comprehensive AI statute for financial services that replaced sectoral rules, so firms now look to that Act rather than to the FCA handbook for AI obligations.",
     "Accountability for automated decisions rests with the model vendor rather than the regulated firm, since only the vendor understands the system well enough to answer for its behaviour.",
     "Model risk management principles apply only to traditional statistical models, and machine learning systems fall outside their scope precisely because their complexity resists validation.",
     "Because AI systems learn continuously, supervisors accept that their behaviour cannot be governed, and firms are excused from monitoring obligations that would apply to static software."],
    "The UK chose principles-through-existing-regimes over an omnibus statute (contrast the EU AI Act): the FCA/PRA read AI through model risk management (e.g. SS1/23), operational resilience, Consumer Duty and SM&CR — meaning identified senior managers carry personal accountability for AI-driven outcomes, vendors or not (outsourcing never transfers regulatory responsibility). ML sits squarely INSIDE model-risk scope, and continuous learning RAISES the monitoring bar (drift detection, periodic revalidation) rather than excusing it.",
    "No new rulebook — the old chain of accountability simply extends to the new machine, with a human name still bolted to every outcome.");

  tq("wai",
    "Which ONE of these statements about training data and privacy is actually TRUE?",
    "Personal data in ML pipelines stays regulated at every stage — UK GDPR demands a lawful basis, purpose limitation and data-minimisation for training uses — and models can MEMORISE and regurgitate training records, so anonymisation claims need real scrutiny.",
    ["Once personal data has been used to train a model, it ceases to be personal data in law, since the weights are a mathematical transformation from which no individual record could ever emerge.",
     "Consent collected for providing a service automatically covers using the same customer records to train unrelated models, since both activities occur within the same corporate group.",
     "Removing customers' names from a training dataset renders it anonymous within the meaning of data-protection law, whatever other identifying fields the records still contain.",
     "Data-protection law exempts machine learning from purpose limitation because model training is always a compatible further use of any lawfully collected personal dataset."],
    "Training on personal data is processing — it needs its own lawful basis, and 'we collected it for something else' is exactly what purpose limitation polices. Memorisation attacks extract verbatim training records from models, so 'the weights are anonymous' is a claim to test, not assume; stripping names leaves quasi-identifiers (birth date + postcode re-identifies most people); and no ML exemption to purpose limitation exists — compatibility is assessed, not presumed. Practical toolkit: DPIAs, minimisation, synthetic or properly anonymised data, and honest privacy notices.",
    "The model drank the database — and can sometimes recite it back. 'We deleted the spreadsheet afterwards' impresses no regulator.");

  /* ---- pass 9: foundations ---- */

  tq("found3",
    "Which ONE of these statements about overfitting is actually TRUE?",
    "Overfitting is diagnosed by the GAP between training and held-out performance, not by training accuracy alone — a model at 99% train / 98% test is healthier than one at 85% train / 70% test, despite 'memorising' more.",
    ["A training accuracy above roughly 95% is itself proof of overfitting, since no genuine signal in real-world data is ever clean enough to support scores at that level honestly.",
     "Overfitting means the model has too few parameters to capture the signal, which is why the standard remedy is adding capacity until training accuracy reaches its ceiling.",
     "A model that fits its training data perfectly must generalise perfectly too, since the test rows are drawn from the same distribution the training rows came from.",
     "Overfitting can be detected from the training loss curve alone: whenever the loss is still falling, the model is by definition still learning transferable structure."],
    "Overfitting is fitting noise AT THE EXPENSE of generalisation — visible only by comparing train to held-out performance. High train accuracy with high test accuracy just means the problem is learnable; a big gap is the disease. Too-few-parameters is UNDERfitting; same-distribution sampling doesn't make memorised noise transfer; and a falling training loss says nothing — it keeps falling long after validation loss turns, which is the whole reason validation curves exist.",
    "Memorising the textbook isn't the crime — flunking the exam after memorising the textbook is.");

  tq("found3",
    "Which ONE of these statements about the train/validation/test split is actually TRUE?",
    "The three sets answer three different questions — fit parameters, choose between models, estimate final performance — and the test set answers honestly only if it influenced NOTHING: one look to tune anything converts it into validation data.",
    ["Validation and test sets are interchangeable names for the same held-out rows, and the three-way split exists only for datasets too large for a simple two-way division to be practical.",
     "The test set should be consulted after each modelling decision so that every choice is grounded in the most realistic estimate of deployment performance available at that moment.",
     "Once a model is final, best practice is to fold the test set into training and refit, then quote the earlier test score for the new model, since more data can only have improved it.",
     "The proper split ratio is fixed at 60/20/20 by convention, and deviating from those proportions invalidates any comparison between studies that used the standard allocation."],
    "Parameters learn from training data; hyperparameters and model choice learn from validation performance; the test set exists to be spent ONCE on the final answer. Consulting it per-decision is adaptive overfitting; quoting an old test score for a refit model is quoting a measurement of a different model (refitting on train+val and testing once is fine — folding in the TEST set unmeasures the thing quoted); and ratios are pragmatic, sized to the data, not a law.",
    "Coursework, mock exam, real exam — glance at the real paper while revising and it silently becomes another mock.");

  tq("found3",
    "Which ONE of these statements about parametric versus non-parametric models is actually TRUE?",
    "'Non-parametric' doesn't mean no parameters — it means the effective complexity GROWS with the data (kNN carries the whole training set; trees grow deeper) — while a parametric model's form is fixed before any data arrives.",
    ["Non-parametric models are those trained without hyperparameters, which is why methods like kNN require no tuning choices at all before they can be applied to a dataset.",
     "A parametric model always outperforms a non-parametric one on small datasets, and always loses on large ones, so the choice reduces to reading the row count off the data.",
     "Linear regression is non-parametric because the fitted coefficient values are unknown before training, whereas neural networks are parametric because their architecture is designed by hand.",
     "Non-parametric methods make no assumptions whatsoever about the data, which is what frees them from the bias component of the bias-variance decomposition entirely."],
    "The distinction is whether model capacity is fixed in advance (linear regression's p coefficients, whatever the row count) or scales with data (kNN's memory IS the dataset; a tree's depth follows the sample). kNN famously has hyperparameters (k, the metric); small-data advantage is a tendency, not a theorem; unknown coefficient VALUES don't make a model non-parametric (the FORM is fixed); and non-parametric methods still assume things (kNN assumes local smoothness) and certainly still carry bias.",
    "One tailor cuts every suit from the same pattern; the other's pattern grows new panels with every customer measured.");

  tq("found3",
    "Which ONE of these statements about data leakage is actually TRUE?",
    "Leakage's signature is TOO-GOOD validation scores that evaporate in production — and its commonest forms are mundane: preprocessing fitted on all rows, duplicate records straddling splits, or a feature that quietly encodes the outcome.",
    ["Leakage only occurs when test rows are literally copied into the training set, so a pipeline whose train and test row indices never overlap is structurally immune to the problem.",
     "The tell-tale sign of leakage is unusually POOR validation performance, since contaminated features confuse the model with information it cannot reconcile with the labels.",
     "Leakage is a training-time inefficiency rather than an evaluation problem: a leaky pipeline wastes compute but its reported scores remain trustworthy estimates of deployment accuracy.",
     "Standard cross-validation automatically detects and corrects leakage, since any fold containing contaminated information will produce a visibly anomalous score in cv_results_."],
    "Leakage is future or outcome information reaching the model through any channel: a scaler fitted on the full dataset, the same customer's rows in both partitions, a 'days_until_churn' column, target encoding computed globally. Row indices not overlapping stops only the crudest form. The symptom is inflated (never deflated) scores — the model looks brilliant on data whose secrets it was slipped; scores are precisely what stop being trustworthy; and CV inherits the leak in every fold rather than flagging it, which is why leaky pipelines sail through review.",
    "The exam-day miracle student was marking their own paper all along — brilliance that collapses the first time the paper is sealed.");

  tq("found3",
    "Which ONE of these statements about generalisation is actually TRUE?",
    "Every supervised model implicitly assumes deployment data resembles training data — under distribution shift that assumption breaks silently, so a model can degrade badly while emitting confident predictions, which is why production monitoring exists.",
    ["A model that cross-validated well has proven it will perform at that level indefinitely, since cross-validation's repeated splits already simulate every way the world might change.",
     "Distribution shift announces itself through runtime errors and malformed predictions, so a production model that returns well-formed confident outputs is demonstrably still on-distribution.",
     "Generalisation concerns vanish for models retrained nightly, because a twenty-four-hour-old training distribution cannot meaningfully differ from the distribution encountered today.",
     "Models generalise by extracting universal truths that hold in any environment, which is why a fraud model trained in one country transfers to another without measurable degradation."],
    "CV estimates performance on the distribution you HAVE — it cannot speak for distributions you'll meet later (new customer mix, changed behaviour, adversaries adapting). The failure mode is silent: inputs still parse, confidence stays high, accuracy quietly rots — models don't know what they don't know. Nightly retraining narrows but doesn't close the gap (shifts happen within a day; sudden events break it entirely); and what models extract is dataset-specific correlation structure, which is exactly why cross-country transfer degrades.",
    "The map was surveyed last year — the confident line it draws through the new motorway is still drawn confidently.");

  /* ---- pass 9: validation ---- */

  tq("valid",
    "Which ONE of these statements about k-fold cross-validation is actually TRUE?",
    "The k models built during cross-validation are throwaways — CV estimates how well the PROCEDURE performs, and standard practice then refits one final model on all the training data, whose exact score no fold directly measured.",
    ["Cross-validation's output includes the single best of the k fitted models, and deploying that particular fold-winner is what the procedure is designed to enable and recommend.",
     "Each of the k models must be preserved and ensembled at deployment, since the CV estimate is only valid for the average of exactly those k fitted models predicting together.",
     "The final refit on all training data is forbidden, because a model fitted on more rows than any fold used would invalidate the cross-validated estimate already reported for the pipeline.",
     "Cross-validation guarantees the refit final model will achieve at least the mean fold score in deployment, since training on more data cannot perform worse than the fold models did."],
    "CV's product is a NUMBER (the procedure's estimated skill), not a model. Deploying the luckiest fold-winner bakes in selection bias; ensembling the folds is a legitimate but separate choice, not what the estimate means; refitting on everything is the standard final step (more data usually helps, and the CV number stands as the honest estimate of the procedure that produced it); and 'at least the mean' is a hope, not a guarantee — the estimate carries variance in both directions.",
    "Five rehearsals measure how good the production will be — then the real cast performs once, with everything it has.");

  tq("valid",
    "Which ONE of these statements about time-series validation is actually TRUE?",
    "TimeSeriesSplit trains on the past and validates on the future in expanding windows — shuffled folds would let models 'forecast' dates they trained on both sides of, scoring interpolation and calling it prediction.",
    ["Shuffled k-fold is preferable for time-series data because mixing eras into every fold exposes the model to a wider variety of temporal conditions during each training pass.",
     "TimeSeriesSplit works by reversing the series and predicting backwards, since a model able to retrodict the past has thereby proven it can also predict the future equally well.",
     "Temporal ordering matters only for financial data; for sensor or demand series, autocorrelation is weak enough that ordinary shuffled folds estimate deployment accuracy honestly.",
     "Time-series validation requires discarding all but the most recent tenth of the data, since older observations belong to distributions too stale to be worth training on at all."],
    "Deployment means predicting FORWARD from everything so far — the split must rehearse that: train on rows 1..t, validate on t+1..t+h, slide onward. Shuffling hands the model each target's temporal neighbours (including its future), producing gap-filling scores that production can never reproduce. Backwards prediction rehearses the wrong task; autocorrelation makes shuffling dishonest for ANY dependent series, not just finance; and old data is a modelling decision (windowing, weighting), not a validation rule.",
    "Rehearse the way you'll perform: always facing forward, never grading yourself on days you'd already seen from both sides.");

  tq("valid",
    "Which ONE of these statements about leave-one-out CV is actually TRUE?",
    "LOOCV is nearly unbiased but its estimate has HIGH VARIANCE — the n training sets overlap almost entirely, so the n little scores are strongly correlated and their average is far noisier than n independent measurements would be.",
    ["Averaging n scores makes LOOCV the lowest-variance validation scheme available, since variance of a mean always shrinks proportionally to the number of terms averaged together.",
     "LOOCV is cheaper than 10-fold cross-validation on any dataset, because each of its training runs uses a single row and therefore completes almost instantaneously every time.",
     "The n models fitted during LOOCV differ from each other substantially, which is why the procedure explores model diversity better than any smaller number of folds could.",
     "LOOCV's bias is the largest of all CV schemes, since training on n-1 rows systematically understates what a model trained on the full dataset would actually achieve."],
    "The 1/n variance-shrink formula assumes independent terms — LOOCV's folds share n−2 of n−1 training rows, so their scores move together and averaging buys little. Each run trains on n−1 rows (not one!), so cost is n full fits — the EXPENSIVE scheme; the near-identical training sets produce near-identical models (minimal diversity); and bias is LOOCV's strength — training on n−1 rows is as close to the full-data model as validation gets. 5–10 folds is the standard bias/variance/cost compromise.",
    "Polling the same friend group n times with one member swapped — many answers, almost one opinion.");

  tq("valid",
    "Which ONE of these statements about validation set size is actually TRUE?",
    "A validation set's verdicts are only as fine as its sample size — on 500 rows, an accuracy difference of a point or two sits inside sampling noise, so 'model A beat model B by 0.8%' on it is a coin-flip dressed as a finding.",
    ["Validation reliability depends on the fraction of data held out rather than the absolute count, so five hundred rows judge models exactly as sharply from a small dataset as fifty thousand do from a large one.",
     "Any validation set larger than thirty rows yields statistically conclusive comparisons, since the central limit theorem guarantees normality of the score estimate from that size onward.",
     "Small validation sets bias comparisons in favour of simpler models, which is why regularised baselines so often appear to win benchmarks conducted on limited data by small margins.",
     "Enlarging the validation set changes which model is genuinely better, so the choice of holdout size is itself a modelling decision that legitimately determines the winner."],
    "The standard error of an accuracy estimate scales as √(p(1−p)/n): at n=500 it's ±2 points — differences inside that band are noise, however exciting they look. What matters is the absolute count (500 rows judge equally coarsely whatever they were carved from); CLT normality doesn't shrink the error bar, it just shapes it; small sets add noise, not a systematic simplicity bias; and more validation data sharpens the MEASUREMENT of a fixed underlying difference — it doesn't change which model is truly better.",
    "A wobbly kitchen scale can't referee a half-gram bake-off — get a finer scale or stop announcing winners.");

  tq("valid",
    "Which ONE of these statements about repeated cross-validation is actually TRUE?",
    "Repeating k-fold CV with different shuffles averages away the luck of any single fold assignment — but it CANNOT fix bias from leakage or bad splitting, and the repeats are not independent, so error bars from them are optimistic.",
    ["Running 10-fold CV ten times yields one hundred independent scores, so the standard error of their mean is exactly one tenth of the single-run standard deviation observed.",
     "Repetition corrects leakage: contaminated information averages out across shuffles, so repeated CV of a leaky pipeline converges on the honest deployment estimate eventually.",
     "If repeated runs of cross-validation give visibly different mean scores, the model is broken and should be discarded before any further tuning effort is invested in it.",
     "One run of 100-fold CV and ten runs of 10-fold CV are statistically identical procedures, since both fit one hundred models to the same underlying training data overall."],
    "Different shuffles change which rows share folds, so averaging repeats smooths partition luck — genuinely useful on small data. But every repeat reuses the same rows: the hundred scores are correlated, so naive SE formulas overstate precision; a leak sits in EVERY shuffle identically (bias doesn't average out — repetition polishes a crooked measurement); run-to-run wobble is expected sampling behaviour, not model breakage; and 100-fold vs 10×10-fold differ in training-set sizes and structure — related, not identical.",
    "Shuffle the deck and re-deal all you like — if the deck was marked, every deal repeats the cheat more smoothly.");

  /* ---- pass 9: regression ---- */

  tq("regr",
    "Which ONE of these statements about R² is actually TRUE?",
    "On held-out data R² can be NEGATIVE — the model predicts worse than a horizontal line at the mean — because the test-set formula carries no lower bound, and sklearn's score() will happily report it.",
    ["R² is bounded between zero and one by mathematical construction, so any negative value appearing in a metrics report can only be the result of a software defect in the library.",
     "An R² of 0.9 means ninety percent of the model's predictions land within one standard deviation of their true values, giving the number a direct per-prediction accuracy reading.",
     "R² always increases when any feature is added, including on held-out evaluation data, which is why adjusted R² exists to correct test-set scores specifically for model width.",
     "A negative R² proves the target variable is intrinsically unpredictable, since no relationship can exist in data on which one candidate model has scored below the baseline."],
    "R² = 1 − SSE/SST: on training data with an intercept it stays in [0,1], but on NEW data a bad model's squared errors can exceed the mean-baseline's, pushing the ratio past 1 and R² below zero — a routine sight with overfit or drifted models. It's variance-explained, not a per-prediction distance statement; the always-increases property is a TRAINING-set artefact (held-out R² falls when junk is added — adjusted R² patches the training formula); and one model scoring below baseline indicts that model, not the target.",
    "Below zero just means 'worse than guessing the average every time' — an achievement bad models unlock regularly.");

  tq("regr",
    "Which ONE of these statements about multicollinearity is actually TRUE?",
    "Correlated predictors can leave PREDICTIONS perfectly fine while making individual COEFFICIENTS unstable and uninterpretable — huge, opposite-signed weights that swap on tiny data changes, because many weight combinations fit equally well.",
    ["Multicollinearity's primary damage is to predictive accuracy on new data, while the fitted coefficients remain stable and interpretable since each is estimated from its own column alone.",
     "Two features correlated above 0.9 make ordinary least squares mathematically unsolvable, which is why software refuses to fit regressions containing near-duplicate predictors.",
     "Multicollinearity is detected by inspecting each feature's correlation with the TARGET, and any pair of features that both correlate strongly with the outcome must be collinear.",
     "The presence of correlated predictors means the true coefficients are zero for all but one of them, so dropping every correlated feature except the strongest is always statistically safe."],
    "When X₁ and X₂ move together, (β₁=5, β₂=0) and (β₁=105, β₂=−100) predict almost identically — the data can't tell them apart, so estimates balloon and flip while the fitted surface (and predictions) barely moves. Accuracy is the part that survives; OLS stays solvable short of PERFECT collinearity (just ill-conditioned); detection is feature-vs-FEATURE correlation and VIF, not target correlation; and 'all but one are truly zero' is unwarranted — the shared signal may genuinely belong to several (ridge shrinks; domain knowledge decides).",
    "Two rowers in perfect sync: the boat's speed is measurable, but the ledger crediting each oar is fiction that rewrites itself.");

  tq("regr",
    "Which ONE of these statements about extrapolation is actually TRUE?",
    "Tree-based regressors PLATEAU outside the training range — a leaf's prediction is an average of training rows, so beyond the observed x-range every input gets the edge leaf's constant — while linear models extend their trend line indefinitely.",
    ["Random forests extrapolate trends smoothly beyond the training range, since averaging many trees interpolates the slope of the data outward past the observed boundary values.",
     "Linear models refuse to predict outside the training range, raising errors on out-of-range inputs, which is why trees are the standard choice for forecasting beyond observed data.",
     "All regression models converge to the training-set mean as inputs move far from the data, a stabilising property that makes extreme extrapolations the most trustworthy predictions.",
     "Extrapolation risk applies only to the time dimension in forecasting, and models applied to inputs with unusually large feature values face no analogous distributional danger."],
    "A tree can only output values assembled from training targets: past the largest observed x, every point lands in the same terminal leaf, so predictions go FLAT (forests average flat trees — still flat). Linear models happily extend the line — sometimes usefully, sometimes into nonsense, but neither family raises errors: both answer confidently, which is the danger. Not all models revert to the mean; and extrapolation is a FEATURE-SPACE concept — a never-seen income level is extrapolation with no time axis in sight.",
    "The tree has never seen past the fence, so it repeats the last thing it saw; the line strides over the fence — both without a flicker of doubt.");

  tq("regr",
    "Which ONE of these statements about MAE versus RMSE is actually TRUE?",
    "RMSE punishes large errors quadratically, so it diverges from MAE exactly when big misses exist — the gap between the two on the same predictions is itself a diagnostic of how much your error is concentrated in outliers.",
    ["RMSE and MAE are the same quantity expressed in different units, so converting one into the other requires only multiplying by a constant factor that depends on the dataset's size.",
     "MAE is always the larger of the two on any set of predictions, since taking absolute values before averaging inflates errors that squaring and rooting would have moderated.",
     "Optimising MAE and optimising RMSE lead a model toward the same fitted predictions, since both are minimised by matching the conditional mean of the target at every input point.",
     "RMSE should be avoided in reporting because squaring makes it uninterpretable, whereas MAE's units are the target's own, making it the only defensible headline error metric."],
    "Squaring makes one 10-unit miss cost what a hundred 1-unit misses cost — RMSE ≥ MAE always, with equality only when all errors are equal, so a wide RMSE-MAE gap says 'your error budget is spent on a few disasters'. They're not unit-convertible by a constant; MAE is the SMALLER (or equal); their optima differ structurally — squared error targets the conditional MEAN, absolute error the conditional MEDIAN (a real modelling choice under skew); and RMSE is in target units too (the root restores them) — report both.",
    "One judge fines every foul equally; the other fines the square — compare their bills and you learn where your fouls live.");

  tq("regr",
    "Which ONE of these statements about residual plots is actually TRUE?",
    "A healthy residual plot is structureless noise — visible patterns are unmodelled signal: a curve means missing nonlinearity, a funnel means variance grows with the prediction, and either invalidates naive confidence in the fit.",
    ["Residual plots exist to confirm the residuals sum to zero, a property that must be checked manually after every ordinary least squares fit before the model can be used at all.",
     "A funnel shape in the residuals is the signature of a well-calibrated model, since prediction uncertainty should rightly widen wherever the predicted values become larger.",
     "Patterns in residuals are harmless as long as the R² is high, because explained variance above ninety percent means whatever structure remains is too small to matter in practice.",
     "Residual analysis applies only to linear regression; tree and boosting models produce residuals whose patterns carry no information about what the model failed to capture."],
    "Residuals are what the model COULDN'T explain — if structure remains (curvature, funnels, clusters, autocorrelation), explainable signal was left on the table and error assumptions are violated (funnels wreck constant-variance inference; a log-transform or weighted fit responds). The sum-to-zero property is automatic with an intercept, not a check; funnels are a warning, not calibration; high R² can coexist with systematic regional bias — exactly what the plot exposes; and residuals from ANY regressor repay inspection: unmodelled pattern is unmodelled pattern.",
    "The leftovers tell you what the recipe missed — leftovers with a shape mean the recipe still owes you a dish.");

  /* ---- pass 9: evaluation extras ---- */

  tq("evalx",
    "Which ONE of these statements about decision thresholds is actually TRUE?",
    "The 0.5 threshold is an arbitrary default, not part of the model — the fitted scores are the model's actual output, and the threshold is a BUSINESS decision that should be set from the relative cost of false alarms versus misses.",
    ["The 0.5 cutoff is statistically optimal for any properly trained classifier, since a calibrated probability above one half always indicates the positive class is more likely than not.",
     "Changing the decision threshold requires retraining the model from scratch, because the fitted parameters were optimised specifically for classifications made at the default cutoff.",
     "Thresholds below 0.5 are invalid, since accepting cases the model rates as less-likely-than-not would mean deliberately acting against the model's own probability estimates.",
     "The threshold should always be chosen to maximise accuracy on the validation set, since accuracy is the metric that balances both error types in exactly the proportion that matters."],
    "Even with perfect calibration, 'more likely than not' is only the right action rule when both error types cost the same — miss a £50k fraud to avoid a £5 review and the maths says flag at 0.1. Thresholding is free post-processing on unchanged scores (no retraining); low thresholds are exactly how cost asymmetries are expressed; and maximising accuracy re-imports the equal-cost assumption through the back door — the right objective is expected cost or a chosen precision/recall operating point.",
    "The smoke detector's sensitivity dial isn't physics — it's how you price a burnt house against a false alarm at 3am.");

  tq("evalx",
    "Which ONE of these statements about the confusion matrix is actually TRUE?",
    "A confusion matrix is threshold-specific — one matrix per operating point — so quoting 'the' confusion matrix without its threshold is incomplete, and sweeping the threshold traces out entire curves (ROC, PR) from the same scores.",
    ["The confusion matrix summarises a classifier's behaviour across all possible thresholds at once, which is what distinguishes it from single-threshold summaries like accuracy or F1.",
     "For a fixed model and test set there exists exactly one confusion matrix, since the fitted parameters determine every cell count irrespective of any post-processing choices made.",
     "Confusion matrices only exist for balanced binary problems; multi-class tasks and skewed class ratios both make the four-cell structure mathematically impossible to construct.",
     "The four cells of a confusion matrix are independent quantities, so improving the true-positive count leaves the false-negative count unchanged for the same set of predictions."],
    "Freeze a threshold and every prediction lands in a cell; move the threshold and the cells reshuffle — ROC and PR curves are precisely the confusion matrix animated across thresholds. It's the single-threshold snapshot, not the all-threshold summary; multi-class matrices are simply k×k; and within a fixed positive set, TP and FN are complements (TP+FN = all positives) — one rises exactly as the other falls, the dependency that makes recall a single number.",
    "It's one frame of the film — the ROC curve is what you get when you let the projector run.");

  tq("evalx",
    "Which ONE of these statements about discrimination versus calibration is actually TRUE?",
    "Discrimination (ranking, AUC) and calibration (honest probabilities) are separate virtues — a model can rank perfectly while its probabilities are wildly exaggerated, and monotone recalibration fixes the probabilities without moving the AUC.",
    ["A model with an AUC of 0.95 necessarily produces trustworthy probabilities, since ranking that accurately is only possible when the scores themselves are numerically honest.",
     "Calibrating a model's probabilities with a monotone mapping changes its AUC substantially, which is why calibration must be weighed against the ranking quality it destroys.",
     "Calibration and discrimination are measured by the same statistic, so any model dominant on one axis is mathematically guaranteed to be dominant on the other axis as well.",
     "Poorly calibrated probabilities are only a cosmetic issue, since every practical use of a classifier consumes its ranking rather than the numerical values of its scores."],
    "AUC sees only ORDER: multiply every score's odds by ten and the ranking — hence AUC — is untouched, while every stated probability becomes a lie. Monotone maps (Platt, isotonic) preserve order by construction: calibration repaired, AUC unchanged — that's the whole trick of post-hoc calibration. The two virtues need separate measurement (AUC + calibration curve/Brier); and numerical scores are consumed constantly — expected-cost thresholds, pricing, triage — where exaggerated probabilities do real damage.",
    "A pundit can rank every match correctly while quoting absurd odds — order and honesty are different talents.");

  tq("evalx",
    "Which ONE of these statements about model comparison is actually TRUE?",
    "Comparing models on the SAME folds and testing the per-fold DIFFERENCES is far more sensitive than comparing two independent averages — shared fold difficulty cancels in the difference, shrinking the variance of the comparison.",
    ["Models must be compared on freshly drawn random splits for each candidate, since letting two models share the same folds contaminates both estimates with correlated sampling noise.",
     "The model with the higher mean CV score is the better model whenever the gap exceeds one tenth of a point, a threshold below which differences are conventionally ignored as noise.",
     "Paired comparisons are invalid when models share training folds, because statistical tests universally require the two samples being compared to be fully independent of each other.",
     "Comparing more than two models needs no multiplicity adjustment, since each pairwise comparison is a separate experiment whose error rate is unaffected by the others being run."],
    "Fold difficulty is shared noise: if fold 3 is hard, BOTH models suffer there, and differencing subtracts that shared component — classic paired-test logic, which is why cross_val_score(model, cv=same_kfold) comparisons pair naturally. Fresh splits per model ADD noise; fixed numeric thresholds ignore the actual variance (0.1 can be signal on huge data, noise on small); pairing is what the paired t-test is FOR (independence is required BETWEEN pairs, not within); and many pairwise comparisons inflate false-positive rates — multiplicity is real.",
    "Make both students sit the same five papers and mark the per-paper gap — hard papers punish both, so the gap speaks cleanly.");

  tq("evalx",
    "Which ONE of these statements about offline versus online evaluation is actually TRUE?",
    "A model can win every offline metric and still fail its A/B test — offline evaluation scores predictions against LOGGED outcomes, while deployment changes behaviour (interventions, feedback loops) that the logs never contained.",
    ["Offline metrics are strictly conservative: a model that beats the incumbent on held-out logged data is guaranteed to perform at least that well once its predictions start driving decisions.",
     "A/B testing exists only to measure engineering latency, since the statistical questions about model quality are fully settled by offline evaluation before any deployment begins.",
     "The gap between offline and online results indicates a bug in the serving infrastructure, since a correctly deployed model reproduces its offline metrics by mathematical necessity.",
     "Online evaluation is obsolete for models trained on large datasets, because sufficient training data makes offline estimates converge exactly to deployment performance."],
    "Logged data records the world under the OLD policy: a recommender trained on logs is graded on 'would they have clicked what they were shown', not 'what happens when we show different things'. Deployment intervenes — users adapt, feedback loops form, the action changes the outcome — none of which logs can rehearse. Offline wins are hypotheses, not guarantees; the offline-online gap is usually the intervention gap, not a serving bug; and no training-set size closes it: it's a difference in what QUESTION is being answered, hence the A/B test.",
    "The chess engine studied games where nobody followed its advice — the real test starts when the moves get played.");

  /* ---- pass 9: imbalanced data ---- */

  tq("imbal",
    "Which ONE of these statements about SMOTE is actually TRUE?",
    "SMOTE must run INSIDE the training folds only — oversampling before splitting lets synthetic points (interpolated from real minority rows) sit in the test set while their parent rows sit in training, leaking the test set's neighbourhood into the fit.",
    ["Applying SMOTE to the full dataset before cross-validation is the recommended order of operations, since balanced folds make every fold's metric directly comparable to the others.",
     "SMOTE creates new minority examples by exactly duplicating randomly chosen existing rows, which is why it is described as a synthetic technique in the imbalanced-learning literature.",
     "Because SMOTE's synthetic points are interpolations rather than copies, their presence in a test fold alongside their parent rows in training causes no leakage of any kind.",
     "The test set should also be rebalanced with SMOTE, so that the reported metrics describe the model's behaviour on the class ratio it was trained to expect at deployment."],
    "A synthetic point is a blend of two real minority neighbours: split AFTER oversampling and a test-set synthetic can be a near-copy of a training row — the model is graded on its own training neighbourhood, and scores inflate. Correct order: split first, SMOTE the training portion only (imblearn's Pipeline does this per fold). SMOTE interpolates rather than duplicates (that's RandomOverSampler); interpolation is exactly WHY the leak exists; and the test set must keep the REAL class ratio — deployment's ratio, the one your metrics must describe.",
    "The forged exam answers were traced from real students' papers — let forgeries into the exam hall and the tracing IS the cheat.");

  tq("imbal",
    "Which ONE of these statements about undersampling is actually TRUE?",
    "Random undersampling buys balance by THROWING AWAY majority-class information — sometimes an excellent trade on huge datasets, but on small ones the discarded rows contained boundary detail the model needed, and performance drops.",
    ["Undersampling is information-neutral, since the discarded majority rows are statistically redundant duplicates of the retained ones by definition of belonging to the same class.",
     "Undersampling should always be preferred to oversampling, because a smaller training set both trains faster and generalises better on every dataset where imbalance appears.",
     "The discarded majority rows must be moved into the test set rather than deleted, which simultaneously balances training and enlarges evaluation without any statistical cost.",
     "Undersampling the majority class changes the base rate the model observes but leaves its learned decision boundary exactly where full-data training would have placed it."],
    "Deleting majority rows is a real cost: class members aren't duplicates of each other, and boundary-adjacent majority examples are precisely what defines where the classes meet. On millions of rows the loss is affordable (and speed is a genuine win); on thousands it bites. 'Always prefer' oversimplifies a context-dependent trade; moving discards into the test set changes ITS distribution (now unrepresentative of deployment); and shifting the observed base rate shifts the fitted boundary — that's the entire mechanism by which resampling works.",
    "Balancing the seesaw by sending half one team home works — unless the players you sent home were the ones marking the line.");

  tq("imbal",
    "Which ONE of these statements about when imbalance matters is actually TRUE?",
    "Imbalance is not automatically a problem to fix — a well-calibrated model on 95/5 data may serve perfectly through a tuned threshold — the real question is whether your MODEL and METRIC handle the skew, not whether the skew exists.",
    ["Any class ratio beyond seventy-thirty mandates resampling before model training can begin, since no learning algorithm converges correctly once the majority class outnumbers two to one.",
     "The purpose of rebalancing is to make accuracy a valid metric again, since a model trained on balanced data can be evaluated on balanced accuracy without further adjustment anywhere.",
     "Class imbalance is a property of bad data collection, and the correct remedy is always to gather more minority examples until the natural ratio reaches parity in the raw dataset.",
     "Rebalancing to exactly fifty-fifty is optimal in every case, since equal class frequencies are the assumption under which classification algorithms were mathematically derived."],
    "Rare classes are usually the WORLD's ratio, not a data defect — fraud is rare because fraud is rare. Many models learn fine from skewed data; the failures are typically metric failures (accuracy flattering the do-nothing model) and threshold failures (0.5 assuming equal costs) — fixable by choosing PR/MCC and tuning the cutoff, no resampling required. No 70/30 law exists; rebalancing doesn't launder accuracy (deployment keeps the real ratio); more minority data is great when possible but parity isn't the goal; and 50/50 optimality is a myth.",
    "Rare isn't broken — the question is whether your ruler and your alarm threshold respect the rarity, not whether you can vote it away.");

  tq("imbal",
    "Which ONE of these statements about evaluating imbalanced classifiers is actually TRUE?",
    "The evaluation set must keep the DEPLOYMENT class ratio even when training data was rebalanced — and probabilities from a model trained on altered ratios are shifted, needing recalibration before they read as real-world risks.",
    ["Once training data has been rebalanced, evaluation should use the same balanced ratio, since fairness requires that a model be graded under the conditions it was optimised for.",
     "A model trained on balanced data outputs probabilities that remain correct for the original skewed population, since calibration is a property of the algorithm rather than the data mix.",
     "Rebalanced training makes threshold selection unnecessary, since the balanced model's 0.5 cutoff is automatically the optimal operating point back in the imbalanced world.",
     "Precision measured on an artificially balanced test set transfers directly to deployment, because precision's formula contains no term sensitive to the prevalence of the classes."],
    "Metrics exist to predict deployment, so the test set must look like deployment — grade on a balanced set and precision especially becomes fiction, because precision depends heavily on PREVALENCE (fewer real negatives per positive means fewer false alarms per catch). Training on 50/50 teaches the model a world where positives are common: its stated probabilities are inflated for the real 95/5 world (recalibrate or adjust with the prior ratio), and 0.5 on the balanced scale is not the deployment optimum — threshold work remains.",
    "Train in the gym however you like — the match is played at the real score-line, and the odds you quote must be match odds.");

  tq("imbal",
    "Which ONE of these statements about anomaly detection versus classification is actually TRUE?",
    "When positives are vanishingly rare or genuinely novel — new fraud patterns, unseen failures — supervised classification runs out of examples to learn from, and one-class/anomaly methods that model NORMALITY and flag deviations become the right frame.",
    ["Anomaly detection is simply classification with the threshold set very low, so any binary classifier converts into an anomaly detector by adjusting its cutoff without retraining anything.",
     "Supervised classifiers detect novel attack patterns as reliably as known ones, since generalisation means recognising categories of behaviour the training labels never contained.",
     "One-class methods require balanced samples of anomalies for training, which is why isolation forests are fitted on datasets containing equal numbers of normal and abnormal rows.",
     "The choice between classification and anomaly detection is settled by dataset size alone: below ten thousand rows use anomaly methods, above it use supervised classification."],
    "Supervised learning interpolates between labelled examples — with a handful of positives (or positives whose future forms differ from past ones) there's nothing to interpolate. One-class SVMs, isolation forests and autoencoder-reconstruction methods learn the shape of NORMAL and score departure from it — no anomaly labels needed (that's their defining trait, opposite of balanced-anomaly training). Threshold-twiddling doesn't convert a classifier (it still only knows labelled patterns); novelty is precisely where label-bound generalisation fails; and the decision axis is label availability and novelty, not a row-count rule.",
    "You can't study a burglar who hasn't invented his trick yet — so learn every corner of the house, and investigate whatever doesn't belong.");

  /* ---- pass 9: interpretability ---- */

  tq("interp",
    "Which ONE of these statements about SHAP values is actually TRUE?",
    "SHAP attributions are ADDITIVE by construction — each prediction's feature contributions sum exactly to the gap between that prediction and the base value — but additive credit for correlated features can split in unintuitive ways.",
    ["SHAP values report the causal effect of intervening on each feature, so a large SHAP value for income proves that raising a customer's income would change the model's decision accordingly.",
     "The SHAP values for one prediction are free-floating importance scores with no arithmetic relationship to the model's output, which is why they cannot be compared across features numerically.",
     "SHAP assigns correlated features their credit by alphabetical priority, giving the earlier-named column the full contribution and the later-named column exactly zero in every explanation.",
     "Computing exact Shapley values is fast for any model class, since the calculation touches each feature once, which is why approximation methods were never needed in practice."],
    "The additivity axiom is SHAP's signature: base value + Σφᵢ = prediction, making explanations audit-ready. But the values describe the MODEL's behaviour, not causal reality (association in, association out); correlated features share credit through the coalitional averaging — sometimes splitting a joint effect oddly between twins, never alphabetically; and exact Shapley computation is exponential in features — TreeSHAP's polynomial algorithm for trees and sampling approximations elsewhere are what make it usable.",
    "The receipt's line items genuinely sum to the bill — how the till splits a two-for-one deal between the two items is murkier.");

  tq("interp",
    "Which ONE of these statements about partial dependence plots is actually TRUE?",
    "A PDP shows the AVERAGE effect of a feature across the dataset — it can flatten two opposing subgroup effects into a misleading nothing, which is why ICE curves (one line per row) are the standard companion diagnostic.",
    ["Partial dependence plots display the effect of a feature for every individual row separately, which is what distinguishes them from ICE curves that show only the dataset average.",
     "A flat PDP proves the feature is unused by the model, since averaging cannot hide effects that exist, only reveal the ones too small to see in individual predictions.",
     "PDPs are computed by deleting the feature and refitting the model, so the plotted curve reflects how a genuinely feature-free model would behave across the value range.",
     "The PDP's construction respects feature correlations, evaluating the model only at realistic combinations of values that occur together in the actual training data."],
    "PDP sweeps one feature's value while averaging model output over everyone else's actual rows — an average that can cancel: if age raises risk for one segment and lowers it for another, the mean line sits flat while both effects rage underneath (ICE draws every row's line, exposing the split). The definitions in the first option are swapped; a flat PDP therefore proves nothing; no refitting occurs (the FITTED model is probed); and the sweep famously IGNORES correlations, evaluating impossible combinations — a known weakness, addressed by accumulated local effects (ALE).",
    "The town's average opinion is 'indifferent' — half love it, half hate it. Poll the individuals before reporting the shrug.");

  tq("interp",
    "Which ONE of these statements about global versus local explanations is actually TRUE?",
    "Global importance and local explanation answer DIFFERENT questions — a feature can rank low globally yet dominate one specific decision — so a customer's adverse-action letter needs the local story, not the model's overall league table.",
    ["A feature ranked first in global importance is necessarily the largest contributor to every individual prediction, since global rankings are computed by aggregating identical local ones.",
     "Local explanations are approximations while global importances are exact, so any conflict between the two views should always be resolved in favour of the global ranking.",
     "The global importance ranking changes from one prediction to the next, which is why model documentation must recompute and republish it for every scoring request received.",
     "Providing a customer with the model's global feature ranking satisfies any obligation to explain their individual decision, since the ranking describes the model that decided."],
    "Global views (permutation importance, mean |SHAP|) describe average behaviour across the population; a specific decision can hinge on a globally-minor feature that happens to be extreme for THIS case. Aggregation loses the individual story — which is exactly what an adverse-decision explanation must tell. Global rankings don't map onto each row; neither view is 'exact' versus 'approximate' in that sense; global rankings are stable properties of the model (not per-request); and handing a customer the league table explains the model, not their decision.",
    "The league table says strikers score most goals — this match was decided by the goalkeeper's one mistake, and the fan asked about this match.");

  tq("interp",
    "Which ONE of these statements about surrogate models is actually TRUE?",
    "A surrogate — a simple model trained to MIMIC a complex one's predictions — explains only as well as it imitates: its fidelity (agreement with the black box) must be reported, because a low-fidelity surrogate explains a model that doesn't exist.",
    ["Training a decision tree to reproduce a neural network's outputs yields exact explanations of the network's reasoning, since matching the predictions entails matching the internal logic.",
     "Surrogate models are fitted on the original ground-truth labels rather than the black box's predictions, since the goal is a second opinion on the task rather than an imitation.",
     "A surrogate with 70% agreement to the black box is a trustworthy explainer, since fidelity above chance level demonstrates the surrogate has captured the essential decision logic.",
     "Global surrogates and the LIME method are unrelated techniques, since LIME fits its interpretable model to the original training data rather than to any black-box outputs locally."],
    "The surrogate's training TARGET is the black box's predictions — that's what makes it an explainer rather than a competitor — and its explanatory license extends exactly as far as its fidelity: at 70% agreement, three decisions in ten are 'explained' by a model that disagrees with the thing being explained. Matching outputs never guarantees matching mechanism (different logic can produce similar predictions); and LIME IS the local version of the idea — an interpretable model fitted to black-box outputs in one neighbourhood.",
    "The impressionist explains the politician only where the impression is accurate — measure the impression before trusting the routine.");

  tq("interp",
    "Which ONE of these statements about the accuracy-interpretability trade-off is actually TRUE?",
    "The 'trade-off' is often smaller than advertised — on many tabular problems, well-built interpretable models (GAMs, scorecards, small trees) land within noise of black boxes — so the gap should be MEASURED per problem, not assumed.",
    ["Complex models outperform interpretable ones by a wide margin on every dataset, so choosing an interpretable model always means knowingly sacrificing substantial predictive accuracy.",
     "Interpretability and accuracy are formally inversely proportional, with the product of the two held constant by an information-theoretic law that no modelling choice can circumvent.",
     "Because post-hoc explanation tools exist, inherent interpretability offers no advantage, and the interpretable-model tradition survives only through regulatory inertia in a few industries.",
     "Deep learning's dominance on images and text demonstrates that black boxes dominate on tabular business data equally, since architecture advantages transfer unchanged across data types."],
    "Rudin's argument, borne out repeatedly: on structured/tabular data with meaningful features, carefully built interpretable models (generalised additive models, well-engineered scorecards) frequently match boosted black boxes within the error bars — the honest move is to benchmark an interpretable candidate, not concede by assumption. No inverse-proportionality law exists; post-hoc tools approximate rather than replace inherent transparency (the model-of-a-model gap); and deep learning's image/text dominance conspicuously does NOT transfer to tabular problems, where trees still reign.",
    "Before paying the opacity tax, check the price list — half the time the glass-box model was within a rounding error all along.");

})();
