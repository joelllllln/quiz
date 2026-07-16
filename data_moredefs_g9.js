/* More definitions (batch 9): stacking, model evaluation, performance optimisation,
   scikit-learn, k-means, hierarchical clustering, DBSCAN, PCA, t-SNE. Standard glossary
   terms, each DEFS-tagged with a reveal so it flows into the Definitions filter,
   flashcards and read+recall. Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function def(qk, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1;
  }

  /* ===================== Stacking & Voting (stack1) — 4 ===================== */

  def("stack1",
    "What is multi-level (deep) stacking?",
    "Stacking repeated in layers: one level's meta-predictions become the next level's inputs.",
    ["Training the same base model several times on the same data and averaging the copies.",
     "Stacking models of increasing tree depth so each level is strictly more complex.",
     "A voting ensemble whose weights are chosen separately for each class label.",
     "Splitting the features into groups and training one base model per group."],
    "Multi-level stacking",
    "Level-0 models feed a level-1 meta-learner, whose out-of-fold outputs can in turn feed a level-2 learner, and so on — each layer trained on the honest (out-of-fold) predictions of the layer below.",
    "Famous from Kaggle-winning pipelines, extra levels add diminishing returns and multiply the leakage bookkeeping: every layer needs its own out-of-fold discipline or the stack quietly overfits.",
    "Stacking on top of stacking: the referee's verdicts become evidence for a higher referee.");

  def("stack1",
    "What do scikit-learn's StackingClassifier and StackingRegressor automate?",
    "Generating out-of-fold base-model predictions via internal CV and fitting a final estimator on them.",
    ["Searching over every possible subset of base models to find the best-scoring combination.",
     "Weighting each base model's vote by its training accuracy without any meta-learner.",
     "Distilling a trained ensemble into a single small model with equivalent predictions.",
     "Calibrating each base model's probabilities before averaging them uniformly."],
    "StackingClassifier / StackingRegressor",
    "You pass a list of base estimators and a final_estimator; the class runs cross_val_predict internally to build leak-free meta-features, fits the meta-learner on them, then refits the bases on all data for inference.",
    "The built-in CV plumbing is the point — hand-rolled stacking most often goes wrong by training the meta-learner on in-sample base predictions, exactly the leak this API prevents by construction.",
    "The library runs the whole honest-stacking recipe for you: folds, out-of-fold predictions, meta-model, refits.");

  def("stack1",
    "In a weighted-average ensemble, how are good weights for the base models usually found?",
    "By optimising them on validation or out-of-fold predictions rather than training scores.",
    ["By setting each weight to the model's accuracy on its own training data.",
     "By assigning weights proportional to each model's number of parameters.",
     "By giving every model the same weight, since optimisation always overfits.",
     "By letting each model set its own weight from its internal confidence."],
    "Weight optimisation for ensembles",
    "Weights are hyperparameters of the combination: fit them on held-out predictions — via a constrained linear model, grid search, or simplex methods — so the blend rewards genuine validation skill, not training-set flattery.",
    "Tuning weights on training predictions favours the most overfit base model. Done on out-of-fold outputs, even a coarse weight search often beats the uniform average when base-model quality varies.",
    "Let held-out data vote on how much to trust each model — never the data those models memorised.");

  def("stack1",
    "What distinguishes a heterogeneous ensemble from a homogeneous one?",
    "It combines different algorithm families, rather than many copies of one algorithm.",
    ["It mixes classification and regression targets inside a single combined model.",
     "It trains each member on data from a different source or time period.",
     "It uses a different random seed for each member of the same model class.",
     "It contains models of different sizes, from tiny stumps to deep trees."],
    "Heterogeneous vs homogeneous ensembles",
    "Random forests are homogeneous (many trees, diversity via randomness); stacking and voting are typically heterogeneous, blending, say, a linear model, a boosted forest and a neighbour method whose errors differ structurally.",
    "Combination helps only where members disagree; different algorithm families bring different inductive biases, so their mistakes decorrelate more deeply than reseeded copies of one algorithm ever can.",
    "A committee of different specialists beats a committee of clones — they make different mistakes.");

  /* ===================== Model Evaluation (metrics1) — 4 ===================== */

  def("metrics1",
    "What does normalising a confusion matrix (e.g. by true row) show?",
    "Per-class rates such as recall, making classes of very different sizes comparable.",
    ["The statistical significance of each cell under a chi-squared independence test.",
     "The monetary cost of each error type multiplied by how often it occurs.",
     "The matrix the classifier would produce if the classes were perfectly balanced.",
     "The correlation between each pair of predicted class labels."],
    "Normalised confusion matrix",
    "Dividing each row by its true-class total turns raw counts into conditional rates: the diagonal becomes per-class recall, off-diagonals show exactly where each class leaks. Column-normalising gives per-class precision instead.",
    "Raw counts hide minority classes — 950 vs 50 examples makes the small class's cell visually negligible even when it is 100% wrong. Rates put every class on the same 0–1 scale.",
    "Turn counts into percentages per class, so the rare class's mistakes are as visible as the common class's.");

  def("metrics1",
    "What is a cost matrix in classification evaluation?",
    "A table assigning a specific cost to each (true class, predicted class) pair, so models minimise expected cost.",
    ["The confusion matrix divided by the total number of predictions made on the test set.",
     "A matrix recording the compute time each model spends on each class of examples.",
     "The penalty term added to the loss function to shrink large model weights.",
     "A table of thresholds, one per class, at which predictions become positive."],
    "Cost matrix (expected-cost evaluation)",
    "Real errors rarely cost the same: a missed cancer is not a false alarm. A cost matrix C[i,j] prices predicting j when truth is i; multiplying it cell-wise with the confusion matrix gives total expected cost, a business-aligned score.",
    "Costs also set the optimal threshold analytically — predict positive when p × cost(FN) exceeds (1−p) × cost(FP) — turning vague 'recall matters more' talk into an explicit, defensible number.",
    "Put a price tag on every kind of mistake, then judge models by the total bill instead of raw accuracy.");

  def("metrics1",
    "What does scikit-learn's classification_report summarise?",
    "Per-class precision, recall, F1 and support, plus averaged totals, in one table.",
    ["The ROC curve coordinates for every threshold the classifier can produce.",
     "The training history of the model: loss per epoch and convergence warnings.",
     "The learned weights of the model ranked by absolute magnitude.",
     "Cross-validation scores for each fold together with their standard deviation."],
    "Classification report",
    "One call prints the working dashboard: each class's precision, recall, F1 and support (true count), with micro/macro/weighted averages beneath — the fastest way to spot a class the model quietly sacrifices.",
    "Reading it per class is the habit that catches imbalance problems: overall accuracy can look fine while one row shows recall 0.12. Support tells you how much to trust each row's estimate.",
    "The one-page report card: how well each class is found, how pure the calls are, and how many examples back each number.");

  def("metrics1",
    "ROC-AUC has a probabilistic interpretation. What is it?",
    "The probability that a random positive example is scored higher than a random negative one.",
    ["The probability that the classifier's accuracy exceeds the majority-class baseline.",
     "The expected fraction of predictions whose probability is within 5% of the true rate.",
     "The chance that two random examples from the same class receive equal scores.",
     "The proportion of thresholds at which precision exceeds recall."],
    "AUC as ranking probability",
    "AUC = P(score(random positive) > score(random negative)) — a pure ranking statistic, blind to the threshold and to calibration. 1.0 means perfect ordering; 0.5 means the ordering is coin-flip.",
    "This reading explains AUC's strengths and limits in one line: it measures whether the model sorts positives above negatives, not whether its probabilities are honest or whether any particular threshold performs well.",
    "Pick one sick patient and one healthy at random — AUC is the chance the model ranks the sick one as riskier.");

  /* ===================== Performance Optimisation (perf1) — 4 ===================== */

  def("perf1",
    "What is validation-set overfitting?",
    "After many tuning rounds, choices fit the validation set's quirks, so its score turns optimistic.",
    ["The model memorises the validation set because it was accidentally included in training.",
     "The validation loss falls below the training loss, indicating a data-loading bug.",
     "Using a validation set that is too large, leaving too little data for training.",
     "Evaluating on the validation set less often than once per training epoch."],
    "Validation-set overfitting",
    "Every hyperparameter decision uses the validation score, so the score stops being an unbiased estimate: with enough trials you select noise. The held-out test set — touched once, at the end — exists precisely to reveal this gap.",
    "It is overfitting by proxy: no weights see the validation data, but the human (or the search loop) does. Cross-validation, fewer tuning rounds, and a locked test set are the standard defences.",
    "Peek at the same exam enough times while tuning and you're studying for that exam, not for the subject.");

  def("perf1",
    "What does 'patience' mean in an early-stopping rule?",
    "How many rounds without validation improvement to tolerate before stopping.",
    ["The minimum number of epochs that must always run before any stopping is allowed.",
     "The learning-rate value below which the optimiser is considered to have converged.",
     "The number of times training restarts from scratch after a bad initialisation.",
     "The gap between training and validation loss at which training halts."],
    "Patience (early stopping)",
    "Validation curves are noisy, so stopping at the first uptick quits too soon. Patience waits N consecutive non-improving evaluations before stopping, then typically restores the best checkpoint seen.",
    "It trades compute for reliability: larger patience rides out noise and plateaus but trains longer past the true optimum. Boosting libraries expose the same idea as early_stopping_rounds.",
    "Don't quit on one bad round — give the model N chances to beat its record, then call it.");

  def("perf1",
    "How does the bias-variance decomposition break down expected squared error?",
    "Into bias², variance across training sets, and irreducible noise.",
    ["Into training error, validation error and their difference, the generalisation gap.",
     "Into the error caused by features, by labels, and by the optimiser respectively.",
     "Into underfitting on easy examples plus overfitting on hard examples.",
     "Into one term per feature, weighted by that feature's importance."],
    "Bias-variance decomposition of MSE",
    "E[(y − ŷ)²] = Bias(ŷ)² + Var(ŷ) + σ²: systematic error of the average model, sensitivity of the fitted model to the particular training draw, and noise no model can remove.",
    "It is the theory beneath the practice: regularisation trades variance down for bias up, ensembling attacks variance, more data shrinks variance, better features attack bias — and σ² sets the floor nobody beats.",
    "Three sources of error: aiming at the wrong spot, shaky hands, and a target that genuinely wobbles.");

  def("perf1",
    "Your model underperforms. When does getting more data help, versus improving the model?",
    "More data fixes high variance; a high-bias model needs more capacity or better features instead.",
    ["More data always helps equally, so collecting it should precede any modelling work.",
     "More data only ever helps deep learning; classical models saturate after a few hundred rows.",
     "More data fixes high bias, while high-variance models need their datasets shrunk.",
     "Neither helps until the classes are exactly balanced by resampling."],
    "More data vs better model (sample efficiency)",
    "Learning curves give the diagnosis: a large train-validation gap (variance) narrows as data grows, so collection pays; two curves converged at a poor score (bias) mean the model family has hit its ceiling — add capacity or features.",
    "Data collection is often the most expensive lever, so pointing it at a bias problem wastes the budget: an underfitting linear model stays poor at any dataset size.",
    "Shaky model? Feed it more examples. Too-simple model? More examples just repeat the same lesson it can't learn.");

  /* ===================== Advanced Scikit-learn (skl1) — 4 ===================== */

  def("skl1",
    "What does sklearn's PolynomialFeatures transformer do?",
    "Expands the feature matrix with powers and interaction products up to a chosen degree.",
    ["Fits a polynomial regression model directly and outputs its predictions as a feature.",
     "Smooths noisy features by fitting a low-degree polynomial through each column.",
     "Selects the features whose relationship with the target is most curved.",
     "Bins each feature into intervals whose boundaries follow a polynomial spacing."],
    "PolynomialFeatures",
    "From [a, b] at degree 2 it generates [1, a, b, a², ab, b²] — the raw material that lets a linear model fit curves and interactions. interaction_only=True keeps just the cross-terms.",
    "The column count grows combinatorially with degree and width, so pair it with regularisation or selection; inside a Pipeline it becomes the classic recipe for polynomial regression via LinearRegression.",
    "It manufactures the squares and cross-products so a straight-line model can bend.");

  def("skl1",
    "What does KBinsDiscretizer do to a continuous feature?",
    "Splits it into k bins (uniform, quantile or k-means edges) and encodes bin membership.",
    ["Removes the k most extreme values from each tail before scaling the remainder.",
     "Rounds every value to k significant digits to reduce measurement noise.",
     "Clusters the rows into k groups and replaces the feature with the cluster label.",
     "Selects the k features whose histograms deviate most from a normal distribution."],
    "KBinsDiscretizer",
    "A binning transformer: choose the number of bins, an edge strategy (equal width, equal frequency, or 1-D k-means) and an output encoding (ordinal or one-hot), and continuous columns become categorical steps.",
    "Binning lets linear models capture non-linear step effects and tames outliers, at the price of resolution and edge artefacts; quantile strategy is the robust default on skewed data.",
    "Chop a number line into buckets and tell the model only which bucket each value fell in.");

  def("skl1",
    "What does PowerTransformer (Box-Cox / Yeo-Johnson) do, and how does it differ from StandardScaler?",
    "It reshapes skewed distributions toward Gaussian via a learned power transform, not just recentring and rescaling.",
    ["It raises every feature to the same fixed power chosen by the user in advance.",
     "It clips extreme values to percentile limits before applying a standard scaling.",
     "It transforms the target variable only, leaving the feature columns untouched.",
     "It is identical to StandardScaler except that it also handles sparse matrices."],
    "PowerTransformer",
    "It fits a per-feature power parameter (Box-Cox for positive data, Yeo-Johnson for any sign) that makes the distribution as Gaussian as possible, then standardises. Scaling changes units; a power transform changes shape.",
    "StandardScaler leaves a long tail long — just relocated. For heavily skewed features feeding linear or distance-based models, reshaping toward symmetry is often the difference that actually matters.",
    "StandardScaler moves and stretches the histogram; PowerTransformer actually unbends it.");

  def("skl1",
    "What is sklearn's HistGradientBoostingClassifier?",
    "A fast gradient-boosting estimator that bins features into histograms, LightGBM-style, with native missing-value support.",
    ["A random forest whose trees are visualised as histograms for interpretability.",
     "A gradient-boosting model restricted to features that are already discrete counts.",
     "A voting ensemble of one histogram-based model per feature in the dataset.",
     "A calibration wrapper that reshapes a boosted model's probability histogram."],
    "HistGradientBoosting",
    "Sklearn's modern boosting engine: continuous features are pre-binned into (max 255) integer buckets, so split-finding scans small histograms instead of sorted arrays — orders of magnitude faster on large data, with missing values and early stopping handled natively.",
    "Prefer it over the legacy GradientBoostingClassifier for anything beyond ~10k rows; it also accepts categorical features directly, avoiding a one-hot blow-up.",
    "The same boosting idea, but numbers are first sorted into buckets so each split decision is a quick histogram scan.");

  /* ===================== K-Means (kmeans1) — 4 ===================== */

  def("kmeans1",
    "What does the n_init parameter of KMeans control, and why does it exist?",
    "How many times the algorithm restarts from different initial centroids, keeping the best run.",
    ["The number of iterations allowed before each individual run is forced to stop.",
     "How many centroids are initialised beyond k, with extras pruned during training.",
     "The number of nearest points used to compute each centroid's first position.",
     "How many features are considered when the first assignment step runs."],
    "n_init (multiple restarts)",
    "K-means only finds a local optimum determined by its starting centroids. n_init runs the whole algorithm several times from different seeds and returns the clustering with the lowest inertia.",
    "Restarts are the practical insurance against a bad draw: k-means++ makes good starts likely, and taking the best of ten makes an unlucky final answer rare — at a linear cost in compute.",
    "Run the whole thing ten times from different starting guesses and keep the best answer.");

  def("kmeans1",
    "Why can two k-means runs on the same data give different final clusterings?",
    "The objective has many local minima, and which one you reach depends on initialisation.",
    ["Because the algorithm samples a different bootstrap of the rows on every run.",
     "Because the distance metric is re-drawn at random at the start of each run.",
     "Because ties in assignment are broken by the current system clock.",
     "Because k itself is re-estimated from a random subsample each time."],
    "Local minima in k-means",
    "Inertia is non-convex in the centroid positions: Lloyd's algorithm monotonically improves until no reassignment helps, but that stopping point is only locally optimal — e.g. two centroids sharing one true cluster while another true cluster is split.",
    "This is the root cause behind k-means++ and n_init, and a reason to distrust any single run: global optimisation is NP-hard, so practice relies on good starts plus restarts.",
    "The algorithm always walks downhill, but which valley it lands in depends on where it started.");

  def("kmeans1",
    "What shape assumption does k-means implicitly make about clusters?",
    "Roughly spherical, similar-sized blobs, because assignment uses straight-line distance to centroids.",
    ["Clusters may be any shape, since assignments follow the data's estimated density.",
     "Elongated parallel stripes, because centroids align along the principal component.",
     "Nested rings, because centroid updates naturally trace circular contours.",
     "Tree-shaped hierarchies, because each split halves the previous cluster."],
    "Isotropic cluster assumption",
    "Nearest-centroid assignment carves space into Voronoi cells, which favours compact, isotropic, comparably sized clusters. Elongated, curved or very unequal-variance groups get cut across their true boundaries.",
    "Matching algorithm to geometry is the real skill: crescents and rings call for DBSCAN or spectral clustering; ellipsoids of different spread call for Gaussian mixtures. K-means excels exactly on blob-like structure.",
    "K-means sees the world as round blobs of similar size — hand it moons or rings and it cuts them wrong.");

  def("kmeans1",
    "Two k-means runs produce 'the same' clustering but with labels 0 and 1 swapped. What does this illustrate?",
    "Cluster labels are arbitrary identifiers with no meaning across runs; only the grouping matters.",
    ["The algorithm failed to converge, and one more iteration would align the labels.",
     "The data contains exactly two duplicated rows that anchor opposite clusters.",
     "The random seed controls which cluster is denser, flipping the numbering.",
     "One of the runs used k-means++ while the other used random initialisation."],
    "Label permutation (arbitrary cluster IDs)",
    "Unsupervised labels are names, not classes: cluster '0' this run may be cluster '2' next run. Comparing clusterings therefore needs permutation-invariant measures — ARI, NMI — or an explicit label-matching step.",
    "This trips up naive evaluation against ground truth: accuracy computed on raw cluster labels can read 0% for a perfect clustering. It also means downstream code must never hard-code meaning onto a cluster number.",
    "The groups are real; the numbers on them are just stickers that can land differently every run.");

  /* ===================== Hierarchical Clustering (hier1) — 4 ===================== */

  def("hier1",
    "What does the distance_threshold parameter in AgglomerativeClustering do?",
    "Stops merging once clusters are farther apart than the threshold, so k emerges from the data.",
    ["Removes any point whose nearest neighbour is farther away than the threshold before clustering.",
     "Sets the minimum size a cluster must reach before it may absorb another cluster.",
     "Caps the height of the dendrogram plot without changing the clustering itself.",
     "Defines the radius used to decide whether a point is noise, as in DBSCAN."],
    "distance_threshold (cutting by height)",
    "Instead of demanding n_clusters up front, you specify the linkage distance at which merging stops — equivalent to cutting the dendrogram at that height; the number of clusters is then a result, not an input.",
    "It shifts the question from 'how many groups?' to 'how different must groups be?', which is often easier to answer from domain knowledge (e.g. 'merge stores within 5km').",
    "Don't tell it how many clusters — tell it how far apart things must be to stay separate, and count what remains.");

  def("hier1",
    "What is the linkage matrix produced by scipy's linkage() function?",
    "A (n−1)×4 record of every merge: the two clusters joined, their distance, and the new cluster's size.",
    ["The n×n matrix of pairwise distances recomputed after every single merge step.",
     "A binary matrix marking which points ended up in the same final cluster.",
     "The coordinates at which each cluster's centroid sat when it was created.",
     "A per-point list of the cluster labels assigned at each level of the tree."],
    "Linkage matrix (scipy)",
    "Each row i encodes merge i: indices of the two clusters combined (new clusters get ids n, n+1, …), the linkage distance between them, and the member count of the result — the complete dendrogram in numeric form.",
    "Everything downstream reads this one structure: dendrogram() draws it, fcluster() cuts it into flat labels, cophenet() scores it. Understanding its four columns makes the whole scipy hierarchy toolkit legible.",
    "The full merge diary: who joined whom, at what distance, and how big the union was — one line per merge.");

  def("hier1",
    "Why does Ward linkage require Euclidean distance?",
    "Its merge criterion minimises the increase in within-cluster variance, a quantity defined via squared Euclidean geometry.",
    ["Because Euclidean is the only metric that can be stored in a condensed distance matrix.",
     "Because Ward's method predates all other distance metrics historically.",
     "Because non-Euclidean metrics make the dendrogram heights come out negative.",
     "Because Ward operates on centroids, which only exist for binary features under Euclidean distance."],
    "Ward requires Euclidean distance",
    "Ward chooses the merge that least increases total within-cluster sum of squares — an objective built from squared Euclidean distances to cluster means. With another metric, 'variance' loses its meaning and the criterion is no longer valid.",
    "Practically: cosine or Manhattan affinities pair with average/complete linkage, not Ward — a constraint sklearn enforces. Ward's variance framing is also why it behaves like a hierarchical cousin of k-means.",
    "Ward's whole rule is 'keep variance small', and variance is a Euclidean idea — change the ruler and the rule stops making sense.");

  def("hier1",
    "With thousands of points, a full dendrogram is unreadable. What does truncating it (e.g. truncate_mode='lastp') show?",
    "Only the last p merges, with earlier subtrees collapsed into single labelled leaves.",
    ["A random sample of p complete branches drawn from across the full tree.",
     "The p individual points that joined clusters at the greatest linkage distances.",
     "Only merges whose linkage distance exceeds the mean of all merge distances.",
     "The subtree containing the p points closest to the overall data centroid."],
    "Truncated dendrogram",
    "Truncation renders just the top of the hierarchy — the final p merges — with each collapsed subtree drawn as one leaf annotated with its member count, keeping the big-structure story readable.",
    "The top merges carry the decisions that matter (how many major groups, at what separation); the bottom thousands of tiny merges are visual noise. Truncation keeps the signal, drops the haystack.",
    "Show only the final few big joins, folding the crowded lower branches into counted bundles.");

  /* ===================== DBSCAN (dbscan1) — 4 ===================== */

  def("dbscan1",
    "What is the OPTICS algorithm?",
    "A density method that orders points by reachability, exposing cluster structure across many density levels at once.",
    ["A grid-based clusterer that assigns points to the cells of a fixed spatial lattice.",
     "A faster exact re-implementation of DBSCAN that returns identical labels.",
     "A method that optimises eps by cross-validating DBSCAN's silhouette score.",
     "A supervised variant of DBSCAN that uses labels to set per-class densities."],
    "OPTICS algorithm",
    "OPTICS walks the data in density order and records each point's reachability distance, producing a reachability plot whose valleys are clusters. Cutting the plot at different levels recovers DBSCAN results for a whole range of eps values.",
    "It answers DBSCAN's sorest limitation — one global eps — by deferring the choice: clusters of different densities appear as valleys of different depths, extractable after the single expensive pass.",
    "Instead of one density cutoff, it draws the whole density landscape and lets you read clusters off the valleys.");

  def("dbscan1",
    "Why can a border point's cluster assignment depend on the order in which DBSCAN processes the data?",
    "A border point within eps of cores from two clusters is claimed by whichever cluster expands first.",
    ["Because eps is re-estimated after each cluster completes, shifting later boundaries.",
     "Because noise points are relabelled at the end in reverse processing order.",
     "Because core points are demoted to border status once their cluster is full.",
     "Because the distance metric accumulates floating-point error over iterations."],
    "Border-point order dependence",
    "Core points and noise are deterministic, but a border point reachable from two different clusters is assigned to the first that reaches it during expansion — a small, real non-determinism in classic DBSCAN.",
    "The effect touches only contested border points, so results are stable in the large; but exact reproducibility across implementations or row orders isn't guaranteed, which matters for tests and audits.",
    "A house on the boundary between two towns belongs to whichever town's surveyor arrives first.");

  def("dbscan1",
    "What is a common rule of thumb for choosing DBSCAN's min_samples?",
    "Around twice the number of dimensions, raised for noisy data.",
    ["Exactly the square root of the number of points, rounded to the nearest integer.",
     "Always 2, since any pair of nearby points should be allowed to form a cluster.",
     "One tenth of the expected size of the smallest cluster you hope to find.",
     "Equal to the number of clusters you expect, plus one for the noise label."],
    "min_samples rule of thumb (≈ 2 × dims)",
    "Literature suggests min_samples ≥ dimensions + 1, with 2 × dimensions as a practical default; larger values demand denser evidence, yielding fewer, more robust clusters and more noise labels.",
    "It is the less sensitive of DBSCAN's two knobs: fix min_samples by this rule first, then read eps off the k-distance plot with k = min_samples — the standard tuning recipe in that order.",
    "Start at double the feature count: in 5 dimensions, ask for about 10 neighbours before calling anywhere 'dense'.");

  def("dbscan1",
    "How does DBSCAN's runtime behave, and what makes it fast in practice?",
    "Naively O(n²) from pairwise region queries, but ~O(n log n) with a spatial index answering them.",
    ["Always O(n³), because every triple of points must be tested for density connectivity.",
     "Exactly linear in n regardless of data, since each point is visited exactly once.",
     "Exponential in the number of clusters, which is why k must stay small.",
     "Dominated by sorting the labels, hence O(k log k) in the cluster count."],
    "DBSCAN complexity and spatial indexing",
    "The algorithm's core cost is one eps-neighbourhood query per point. Answered by brute force, that's n² distance computations; answered by a k-d tree or ball tree in low dimensions, each query is ~log n.",
    "The caveat is the curse of dimensionality: tree indexes degrade toward brute force as dimensions grow, so high-dimensional DBSCAN is genuinely expensive — reduce dimensions first or use approximate neighbours.",
    "Its speed hinges on one question — 'who is within eps of me?' — and a spatial index answers that in a flash.");

  /* ===================== PCA (pca1) — 4 ===================== */

  def("pca1",
    "Why should features usually be standardised before PCA?",
    "PCA maximises variance, so unscaled large-unit features dominate the components regardless of structure.",
    ["Because the eigendecomposition is numerically undefined for values greater than one.",
     "Because PCA can only rotate data whose covariance matrix is the identity.",
     "Because unscaled data makes the components non-orthogonal to each other.",
     "Because explained-variance ratios cannot be computed on raw units."],
    "Scaling before PCA (correlation vs covariance)",
    "A salary column in the tens of thousands carries vastly more raw variance than a rating out of 5, so PC1 simply becomes 'salary'. Standardising first — equivalently, running PCA on the correlation matrix — gives every feature an equal vote.",
    "The exception proves the rule: when all features share meaningful units (pixel intensities, spectra), covariance PCA is legitimate and scale differences are signal, not artefact.",
    "Without scaling, PCA just points at whichever column has the biggest numbers.");

  def("pca1",
    "Two PCA runs return the same component with all its signs flipped. Why is this not a bug?",
    "Each component defines an axis, and either direction along it is an equally valid eigenvector.",
    ["The second run must have iterated an odd number of times before converging.",
     "The data was re-centred with the opposite sign convention on the second run.",
     "A negative eigenvalue forces the corresponding component to invert.",
     "The components were sorted in descending rather than ascending variance order."],
    "Sign ambiguity of components",
    "If v is a unit eigenvector, so is −v: the variance captured is identical. Solvers land on one sign or the other by numerical accident, so loadings and transformed coordinates can flip wholesale between runs or library versions.",
    "It matters when interpreting or comparing: 'high PC1' means nothing absolute until you check the loadings' signs. Deterministic sign conventions (e.g. forcing the largest loading positive) are how libraries stabilise output.",
    "An axis has two ends; PCA doesn't care which one it labels positive.");

  def("pca1",
    "In what sense does PCA give the best low-rank approximation of a data matrix?",
    "Keeping the top-k components minimises total squared reconstruction error among all rank-k approximations.",
    ["It is the only decomposition whose factors contain no negative numbers.",
     "It minimises the maximum single-entry error rather than the total squared error.",
     "It guarantees the approximation preserves all pairwise distances exactly.",
     "It compresses the matrix to exactly k bits per original entry."],
    "Low-rank approximation (Eckart–Young)",
    "The Eckart–Young theorem: truncating the SVD at k terms — exactly what PCA does — yields the rank-k matrix closest to the original in squared (Frobenius) error. No other rank-k matrix reconstructs the data better.",
    "This is PCA's optimality certificate and its compression story in one: k components are not just a heuristic summary but the provably best linear one, which is why 'reconstruction error' and 'variance kept' are two views of the same number.",
    "Among all k-ingredient summaries of the table, PCA's is mathematically the closest to the real thing.");

  def("pca1",
    "How can PCA be used to denoise data?",
    "Keep the high-variance components and reconstruct, discarding low-variance directions that are mostly noise.",
    ["Subtract the first principal component, which by definition contains the noise.",
     "Cluster the components and delete any cluster with fewer than two members.",
     "Whiten the data so every direction, including the noise, has equal variance.",
     "Project onto the components with negative loadings, where noise concentrates."],
    "PCA as a noise filter",
    "When signal is shared across features and noise is independent per feature, signal concentrates in a few leading components while noise spreads thinly across the rest. Projecting onto the top k and mapping back (inverse_transform) keeps the shared structure and drops the fuzz.",
    "The assumption is doing the work: if the interesting effect is subtle and low-variance, this filter deletes it. Denoising by PCA is a bet that variance ranks importance.",
    "Keep the loud shared melody, drop the per-instrument hiss, and replay the cleaned-up song.");

  /* ===================== t-SNE (tsne1) — 4 ===================== */

  def("tsne1",
    "Why is data commonly reduced with PCA (to ~50 dimensions) before running t-SNE?",
    "It cuts noise and pairwise-distance cost while keeping the structure t-SNE needs.",
    ["Because t-SNE is mathematically undefined for inputs with more than 50 features.",
     "Because t-SNE's gradients can only be computed on orthogonal input axes.",
     "Because PCA guarantees the final t-SNE map will be perfectly reproducible.",
     "Because perplexity values above 50 are otherwise silently ignored."],
    "PCA pre-reduction before t-SNE",
    "t-SNE's input cost is dominated by high-dimensional neighbour computations, and distances in thousands of raw dimensions are noise-ridden. A PCA pass to ~50 components preserves the dominant structure, denoises distances, and speeds everything up.",
    "It's the standard pipeline (and sklearn's documented advice) for images, embeddings and expression data: PCA does the coarse, linear compression; t-SNE spends its effort on the fine, non-linear neighbourhood layout.",
    "First squash thousands of noisy dimensions to 50 solid ones, then let t-SNE draw the map from those.");

  def("tsne1",
    "What happens if t-SNE's gradient descent runs for too few iterations?",
    "The embedding is unconverged — often a featureless blob or spurious shapes not present in the data.",
    ["The algorithm raises an error and refuses to return any embedding at all.",
     "The map converges to PCA's linear projection as a safe fallback.",
     "Only global structure is affected; local neighbourhoods are always correct.",
     "Perplexity is automatically increased to compensate for the missing steps."],
    "Iteration count and convergence (n_iter)",
    "t-SNE optimises its layout iteratively (default ~1000 steps); stopped early — especially during or just after early exaggeration — points haven't separated into their true neighbourhood structure, and the map's shapes are optimisation artefacts.",
    "Under-iterated maps are a classic source of false readings: 'clusters' that are just unfinished physics. Signs include pinched or streaky layouts; the fix is more iterations and checking the KL divergence has plateaued.",
    "Stop the simulation mid-settle and you photograph the shuffle, not the seating plan.");

  def("tsne1",
    "Why is it recommended to run t-SNE with several perplexity values rather than one?",
    "Each perplexity shows structure at one neighbourhood scale; only patterns stable across values are trustworthy.",
    ["Because averaging the maps from all perplexities yields the single correct embedding.",
     "Because the optimal perplexity equals the true cluster count, found by trying each.",
     "Because small perplexities handle rows and large ones handle columns of the data.",
     "Because each run consumes its perplexity, requiring a fresh value every time."],
    "Perplexity sweep",
    "Perplexity is an effective neighbourhood size: small values resolve fine local detail (and can shatter clusters), large values emphasise broader arrangement (and can merge them). A sweep — e.g. 5, 30, 50, 100 — separates real structure from parameter artefact.",
    "The reading rule: features that persist across the sweep reflect the data; features that appear at exactly one setting reflect the setting. One-perplexity conclusions are the most common t-SNE misreading after cluster-size claims.",
    "Look at the map through several zoom levels — trust only what survives every zoom.");

  def("tsne1",
    "What does the trustworthiness score measure for an embedding like t-SNE's?",
    "How well the low-dimensional neighbourhoods match true high-dimensional neighbours, penalising intruders.",
    ["The fraction of the original variance that the two map axes jointly explain.",
     "The probability that a rerun with a new seed reproduces the same layout.",
     "Agreement between the map's clusters and known ground-truth class labels.",
     "The numerical stability of the gradient descent across iterations."],
    "Trustworthiness score",
    "For each point, it checks whether its k nearest neighbours in the map were also near it in the original space; points that intrude into a map neighbourhood without being true neighbours cost score. 1.0 = fully faithful local structure.",
    "It gives t-SNE the quantitative check its pictures lack: comparing trustworthiness across perplexities or against UMAP replaces 'this map looks nicer' with a number — well matched to t-SNE, which only promises local fidelity anyway.",
    "Do the map's neighbours match reality's neighbours? Trustworthiness is the score out of one.");

})();
