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

})();
