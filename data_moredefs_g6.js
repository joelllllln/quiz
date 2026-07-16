/* More definitions: PCA, t-SNE, feature engineering, feature selection. Standard glossary terms,
   each DEFS-tagged with a reveal so it flows into the Definitions filter, flashcards and read+recall.
   Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function def(qk, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1;
  }

  /* ---------- PCA (pca1) ---------- */

  def("pca1",
    "What is singular value decomposition (SVD)?",
    "A factorisation X = UEV^T whose singular values and vectors yield PCA.",
    [
      "A greedy routine that repeatedly assigns points to the nearest centroid and then moves each centroid to its cluster's mean.",
      "A supervised filter that ranks raw input columns by how strongly each one correlates with the prediction target.",
      "A rule for splitting a table row-by-row into ever purer groups.",
      "A penalty added to a loss to shrink model coefficients toward zero."
    ],
    "Singular value decomposition (SVD)",
    "SVD factorises a data matrix X into three matrices; the right singular vectors are PCA's principal directions and the singular values encode the variance along them.",
    "It rewrites your data table as three simpler matrices, and that rewrite hands you the principal components directly.",
    "It is the linear-algebra engine most PCA implementations actually run under the hood.");

  def("pca1",
    "What is a singular value in PCA?",
    "A non-negative number giving the variance captured along a principal direction.",
    [
      "The angle between two eigenvectors that determines whether the components are orthogonal to each other.",
      "The count of principal components you must keep to reconstruct the original data with no error at all.",
      "A number that penalises large coefficients.",
      "The mean of a feature subtracted before projection."
    ],
    "Singular value",
    "Each singular value from SVD is the square root of an eigenvalue of the covariance matrix; larger singular values mark directions holding more of the data's variance.",
    "A bigger singular value means that direction carries more of the spread in your data.",
    "They rank the principal components from most to least informative.");

  def("pca1",
    "What is eigendecomposition in the context of PCA?",
    "Factorising the covariance matrix into its eigenvectors and eigenvalues.",
    [
      "Splitting the dataset into training and testing partitions before any principal components are computed.",
      "Repeatedly projecting the data onto random directions until the reconstruction error stops improving.",
      "Removing features whose variance falls below a threshold.",
      "Scaling every feature to unit variance."
    ],
    "Eigendecomposition",
    "PCA can be computed by eigendecomposing the covariance matrix: its eigenvectors are the principal directions and its eigenvalues are the variances along them.",
    "It cracks the covariance matrix open into directions (eigenvectors) and their importances (eigenvalues).",
    "It is the classic alternative to SVD for finding principal components.");

  def("pca1",
    "What is mean centering before PCA?",
    "Subtracting each feature's mean so the data is centred on the origin.",
    [
      "Dividing every feature by its standard deviation so that all columns end up on a comparable scale.",
      "Replacing missing entries with the average of the observed values in that same column before fitting.",
      "Rotating the axes to align with the components.",
      "Discarding the smallest principal components."
    ],
    "Mean centering",
    "PCA assumes data is centred at the origin, so each feature's mean is subtracted first; without centring the first component can point at the data's offset rather than its spread.",
    "You shift the cloud of points so its centre sits at zero before finding the directions of spread.",
    "It is a required first step so components describe variation, not location.");

  def("pca1",
    "What does it mean that principal components form an orthonormal basis?",
    "They are mutually perpendicular unit-length directions.",
    [
      "They are ordered so that each successive component captures less variance than the one before it.",
      "They are linear combinations of the original features chosen to maximise correlation with the target.",
      "They can be negative or positive without any constraint.",
      "They must be standardised before use."
    ],
    "Orthonormal basis",
    "Each principal component is a unit vector (length one) and every pair is orthogonal (dot product zero), so together they form an orthonormal coordinate system for the data.",
    "The components are all at right angles to each other and each has length one, like clean new axes.",
    "This is why projecting onto them simply rotates the data without distortion.");

  def("pca1",
    "What is cumulative explained variance in PCA?",
    "The running total of variance ratios as components are added.",
    [
      "The single largest proportion of variance that any one individual principal component manages to capture.",
      "The amount of variance that is irretrievably lost when the smallest components are discarded from the model.",
      "The variance of the raw target variable.",
      "The average loading across all features."
    ],
    "Cumulative explained variance",
    "Summing the explained-variance ratios of the first k components gives the fraction of total variance those components retain; it is used to choose how many components to keep (e.g. 95%).",
    "Add up how much spread each kept component explains to see the total you have retained.",
    "Plotting it against the number of components helps you pick a cut-off.");

  def("pca1",
    "What does the n_components setting control in PCA?",
    "How many principal components to keep.",
    [
      "The number of times the algorithm restarts from different random initialisations to avoid local optima.",
      "The threshold below which a feature's variance is considered too small to be worth retaining at all.",
      "The learning rate used during the projection.",
      "The distance metric used to compare points."
    ],
    "n_components",
    "n_components sets the target dimensionality: how many top principal directions PCA projects onto. It can be an integer, or a fraction meaning 'enough components to explain that much variance'.",
    "It is the dial for how many new compressed dimensions you want out of PCA.",
    "Set it to keep the top few components or to hit a variance target.");

  def("pca1",
    "What is kernel PCA?",
    "A version of PCA that finds nonlinear components via a kernel function.",
    [
      "A variant that processes the data in small mini-batches so it can scale to datasets too large for memory.",
      "A method that keeps only the components whose eigenvalues exceed the average eigenvalue across all directions.",
      "PCA applied separately to each class label.",
      "PCA that skips the centring step entirely."
    ],
    "Kernel PCA",
    "Kernel PCA applies the kernel trick to implicitly map data into a higher-dimensional space and run PCA there, letting it capture curved structure that ordinary linear PCA cannot.",
    "It is PCA that can bend, using a kernel to catch curved patterns straight PCA would miss.",
    "Use it when the important structure in your data is nonlinear.");

  def("pca1",
    "What is a biplot in PCA?",
    "A plot showing samples and feature loadings together on the components.",
    [
      "A chart of cumulative explained variance used to decide how many principal components should be retained.",
      "A scatter of the data before and after centring, drawn side by side to show the effect of the shift.",
      "A plot of eigenvalues in descending order.",
      "A grid of every pairwise feature correlation."
    ],
    "Biplot",
    "A biplot overlays the projected data points and arrows for the original features (their loadings) on the first two principal components, showing both where samples fall and how features drive each axis.",
    "It shows your points and arrows for the features on the same picture, so you see what each axis means.",
    "Long arrows aligned with an axis tell you which features define that component.");

  def("pca1",
    "What is incremental PCA?",
    "PCA fitted in batches so all data need not fit in memory at once.",
    [
      "PCA that adds one component at a time and stops as soon as the explained variance target is comfortably reached.",
      "A supervised form of PCA that rotates components to line up with the known class labels of the samples.",
      "PCA computed with randomised matrix sketches.",
      "PCA that whitens its output components."
    ],
    "Incremental PCA",
    "IncrementalPCA processes the data in mini-batches, updating the components as it goes, so it can handle datasets too large to load into memory while approximating ordinary PCA closely.",
    "It learns the components a chunk at a time, so huge datasets that will not fit in RAM are no problem.",
    "Reach for it when your data is too big to hold all at once.");

  /* ---------- t-SNE (tsne1) ---------- */

  def("tsne1",
    "Why does t-SNE use a Student's t-distribution in the low-dimensional map?",
    "Its heavy tails give distant points more room, easing the crowding problem.",
    [
      "Because it is the only distribution whose parameters can be estimated in closed form from the pairwise distances.",
      "Because it forces every embedded cluster to end up exactly the same physical size on the final plot.",
      "Because it makes the optimisation fully deterministic.",
      "Because it removes the need to choose a perplexity."
    ],
    "Student's t-distribution (low-D similarities)",
    "In the map, t-SNE models similarities with a heavy-tailed Student-t (one degree of freedom); the fat tails let moderately dissimilar points spread out, relieving the crowding that a Gaussian would cause.",
    "The heavy-tailed curve gives faraway points extra elbow room, so clusters do not all get squashed together.",
    "It is the fix that stops everything piling on top of everything else in 2-D.");

  def("tsne1",
    "What is the Barnes-Hut approximation in t-SNE?",
    "A tree trick that approximates far-away forces to speed up t-SNE.",
    [
      "A preprocessing step that first reduces the data with PCA before the neighbour probabilities are computed.",
      "A schedule that multiplies the early similarities by a large factor for the first few optimisation iterations.",
      "A method for embedding brand-new points after fitting.",
      "A rule for picking the perplexity automatically."
    ],
    "Barnes-Hut approximation",
    "Barnes-Hut groups distant points and treats each group as a single source of repulsive force, cutting t-SNE's cost from quadratic to about n log n and making larger datasets feasible.",
    "It bundles far-off points together instead of computing every pair, which makes t-SNE much faster.",
    "It is what lets t-SNE run on tens of thousands of points in reasonable time.");

  def("tsne1",
    "Why can two t-SNE runs on the same data give different pictures?",
    "It starts from a random initialisation, so results vary by seed.",
    [
      "Because it recomputes the perplexity from scratch on every iteration of the gradient descent procedure.",
      "Because it uses a different random subset of the features each time it builds the neighbour graph.",
      "Because it always converges to one unique global optimum.",
      "Because the input data is shuffled between the two runs."
    ],
    "Non-determinism (random_state)",
    "t-SNE optimises a non-convex objective from a random start, so different seeds land in different local optima; fixing random_state (or using init='pca') makes runs reproducible.",
    "It begins from a random layout and can settle differently each time unless you fix the seed.",
    "Set random_state if you need the same plot twice.");

  def("tsne1",
    "Why can't standard t-SNE embed new points after fitting?",
    "It has no learned mapping; it only positions the points it was given.",
    [
      "Because it discards the original high-dimensional coordinates as soon as the neighbour graph is constructed.",
      "Because adding a point would require recomputing the eigenvectors of the entire covariance matrix again.",
      "Because new points always fall outside the plotted range.",
      "Because it can only handle two output dimensions."
    ],
    "Cannot transform new points",
    "t-SNE optimises the positions of a fixed set of points rather than learning a reusable function, so there is no transform() for unseen data; you must refit with the new points included (UMAP does support transform).",
    "t-SNE places the exact points you gave it and learns no rule, so it cannot slot in a fresh point later.",
    "For out-of-sample embedding you need a parametric method like UMAP instead.");

  def("tsne1",
    "What does it mean that t-SNE preserves local but not global structure?",
    "Nearby points stay close, but gaps between clusters aren't meaningful.",
    [
      "Every pairwise distance in the original space is reproduced faithfully on the two-dimensional output map.",
      "The absolute positions of clusters encode how the classes are ordered in the original feature space.",
      "Only the largest cluster is drawn accurately.",
      "The output always matches what PCA would produce."
    ],
    "Global structure (not preserved)",
    "t-SNE is tuned to keep each point near its true neighbours, so within-cluster structure is trustworthy; the distances and arrangement between separate clusters, however, carry little reliable meaning.",
    "Trust which points sit together, but don't read anything into how far apart the separate blobs are.",
    "That is why you shouldn't interpret the space between clusters on a t-SNE plot.");

  def("tsne1",
    "Why are cluster sizes on a t-SNE plot not meaningful?",
    "t-SNE expands dense regions and shrinks sparse ones, distorting size.",
    [
      "Because every cluster is deliberately rescaled so that all of them occupy an identical area on the plot.",
      "Because the algorithm draws each cluster in proportion to the number of features rather than samples.",
      "Because clusters are always drawn as perfect circles.",
      "Because size depends only on the chosen colour map."
    ],
    "Cluster sizes are meaningless",
    "Because of the heavy-tailed similarity and adaptive density handling, t-SNE stretches tight clusters and compresses loose ones, so a cluster's visual area does not reflect how many points or how much variance it holds.",
    "A big blob on the plot doesn't mean a big or spread-out cluster; the sizes are an artefact.",
    "Don't compare how large clusters look to judge their real spread.");

  def("tsne1",
    "Why shouldn't you read distances between t-SNE clusters literally?",
    "Between-cluster gaps are not calibrated to true separations.",
    [
      "Because the gaps are scaled by the learning rate, which changes on every single iteration of the run.",
      "Because two clusters that appear far apart were actually merged together earlier in the optimisation.",
      "Because distances are measured only along one axis.",
      "Because the plot uses a logarithmic distance scale."
    ],
    "Inter-cluster distances are meaningless",
    "t-SNE's objective cares about preserving neighbourhoods, not global geometry, so the amount of empty space between two clusters does not reliably indicate how different those groups are.",
    "How far apart two clusters look tells you little about how different they really are.",
    "Judge grouping from t-SNE, but get real distances from another method.");

  def("tsne1",
    "How does t-SNE arrive at its final layout?",
    "By gradient descent that minimises a divergence between similarities.",
    [
      "By solving a single eigenvalue equation in closed form, exactly as principal component analysis does.",
      "By repeatedly merging the two closest points until only a handful of clusters remain on the map.",
      "By sampling random layouts and keeping the best one.",
      "By sorting points along their first principal component."
    ],
    "Gradient descent optimisation",
    "t-SNE iteratively moves the low-dimensional points using gradient descent to reduce the KL divergence between high- and low-dimensional similarity distributions, which is why runs are iterative and seed-dependent.",
    "It nudges the points step by step downhill until the low-D similarities best match the high-D ones.",
    "The iterative optimisation is why t-SNE is slow and not deterministic.");

  def("tsne1",
    "How does t-SNE measure similarity between points in the original high-dimensional space?",
    "With Gaussian-based conditional probabilities of picking each neighbour.",
    [
      "By counting how many raw features the two points happen to share exactly the same value on.",
      "By computing the straight-line Euclidean distance and using it directly as the similarity with no transformation.",
      "By a heavy-tailed Student-t distribution.",
      "By the cosine of the angle between the vectors."
    ],
    "High-dimensional affinities (Gaussian)",
    "In the input space t-SNE converts distances into probabilities using a Gaussian kernel whose width is set per point by the perplexity; these conditional probabilities express how likely each point is to be a neighbour.",
    "It turns distances into 'chance of being a neighbour' using a bell curve around each point.",
    "The low-D map instead uses a heavy-tailed t-distribution, and the mismatch is deliberate.");

  def("tsne1",
    "What is the symmetrised similarity in t-SNE?",
    "Averaging the two directional neighbour probabilities into one joint value.",
    [
      "Forcing every point to have exactly the same number of neighbours as all of the other points do.",
      "Making the low-dimensional map perfectly symmetric about the origin after each optimisation step.",
      "Using the same colour for symmetric clusters.",
      "Reflecting the final plot to remove any handedness."
    ],
    "Symmetric SNE",
    "t-SNE symmetrises the pairwise affinities so that p(i,j) equals p(j,i), forming a single joint probability distribution; this simplifies the gradient and avoids the outlier problems that plain SNE had.",
    "It combines 'i sees j' and 'j sees i' into one shared closeness number.",
    "The symmetric joint distribution is what t-SNE's objective actually compares.");

  def("tsne1",
    "What does n_components usually mean in t-SNE?",
    "The number of output dimensions, almost always two or three.",
    [
      "The number of nearest neighbours each point is compared against when the affinities are constructed.",
      "The number of optimisation iterations allowed before the algorithm is forced to stop and return.",
      "The perplexity value used for the run.",
      "The random seed controlling the initial layout."
    ],
    "Output dimensionality (n_components)",
    "n_components sets how many dimensions t-SNE embeds into; because it is a visualisation tool the value is essentially always 2 (or 3), unlike PCA where many components may be kept.",
    "It is just how many dimensions you want the picture in, normally two.",
    "t-SNE is for eyes, so this is nearly always 2 or 3.");

  def("tsne1",
    "How can t-SNE's optimisation be understood as forces between points?",
    "Neighbours attract while all points repel, balancing into clusters.",
    [
      "Every point is pulled toward the single global centre of mass of the entire embedded point cloud.",
      "Points push apart only when they belong to different known class labels in the supervised setting.",
      "Points move purely at random until the plot stabilises.",
      "Only the two closest points ever exert any force."
    ],
    "Attractive and repulsive forces",
    "The t-SNE gradient acts like a physical system: similar points feel an attractive pull that draws true neighbours together, while a repulsive push spreads all points apart, and the equilibrium forms the clusters.",
    "Similar points tug together and everything shoves apart, and the tug-of-war settles into clusters.",
    "This spring-like picture explains why well-separated groups emerge.");

  def("tsne1",
    "Why is t-SNE called a non-parametric embedding?",
    "It learns point positions directly, not a reusable mapping function.",
    [
      "Because it has no hyperparameters that the user is ever required to set before running the algorithm.",
      "Because it assumes the data follows a specific parametric probability distribution such as the Gaussian.",
      "Because it keeps every original feature unchanged.",
      "Because it never uses any random numbers at all."
    ],
    "No parametric mapping",
    "Standard t-SNE optimises the coordinates of each training point without fitting parameters of a function from input to output, so it produces an embedding but not a model you can apply to new data.",
    "It works out where the given points go, but never a rule you could reuse on fresh points.",
    "This is the flip side of why it can't transform new data.");

  def("tsne1",
    "What is meant by distance distortion in a t-SNE map?",
    "Plotted distances don't map linearly to the original distances.",
    [
      "The original coordinates are perfectly recoverable from the plot by inverting a simple scaling factor.",
      "The distortion can be completely removed afterward by rescaling the whole plot by one constant number.",
      "Only points at the plot's edges are distorted.",
      "Distances are preserved but angles are not."
    ],
    "Metric distortion",
    "t-SNE deliberately warps distances, stretching some and compressing others to preserve neighbourhood identity, so you cannot convert a measured distance on the plot back into a meaningful original distance.",
    "The map bends distances on purpose, so a ruler on the plot doesn't give real distances.",
    "Read t-SNE for who-is-near-whom, not for how-far.");

  /* ---------- Feature engineering (feng1) ---------- */

  def("feng1",
    "What is frequency encoding of a categorical feature?",
    "Replacing each category with how often it appears in the data.",
    [
      "Replacing each category with the average value of the target variable observed for that category.",
      "Creating a separate new binary column for every distinct category that the feature can take on.",
      "Mapping categories to evenly spaced integers.",
      "Hashing categories into a fixed number of buckets."
    ],
    "Frequency encoding",
    "Frequency (or count) encoding maps each category to its count or proportion in the training data, turning a categorical column into one numeric column while retaining information about how common each level is.",
    "Swap each category for how many times it shows up, giving one handy number per row.",
    "It is a compact alternative to one-hot for high-cardinality columns.");

  def("feng1",
    "What is binary encoding of a high-cardinality categorical feature?",
    "Encoding category integers as bits across a few binary columns.",
    [
      "Splitting the feature into two groups: the single most common category and everything else combined.",
      "Replacing each category with the mean target value computed only on out-of-fold training rows.",
      "Turning every category into its own indicator column.",
      "Keeping only categories that appear above a set count."
    ],
    "Binary encoding",
    "Binary encoding assigns each category an integer, writes that integer in base-2, and spreads its bits across log2(k) columns, giving far fewer columns than one-hot for high-cardinality features while staying collision-free.",
    "Number the categories, write those numbers in binary, and use the bits as columns.",
    "It is a middle ground between one-hot (many columns) and hashing (collisions).");

  def("feng1",
    "What are aggregation features?",
    "New features summarising groups, like a customer's mean spend.",
    [
      "Features built by multiplying two existing columns together to capture their combined effect on the target.",
      "Features created by raising a single numeric column to higher powers such as its square and its cube.",
      "Features that flag whether a value was originally missing.",
      "Features that split a date into year, month and day."
    ],
    "Aggregation features",
    "Aggregation features summarise many rows for an entity into one value, such as the count, sum, mean, min or max of a group, and are common when relating transaction-level data to a customer or session level.",
    "Roll many rows up into a summary per group, like each user's average purchase.",
    "They bring group-level context into a row-level model.");

  def("feng1",
    "What are domain-knowledge features?",
    "Features hand-crafted from expert understanding of the problem.",
    [
      "Features generated automatically by trying every possible arithmetic combination of the raw columns.",
      "Features obtained by projecting the data onto its highest-variance principal component directions.",
      "Features restricted to only the calendar and time columns.",
      "Features that have been scaled to zero mean and unit variance."
    ],
    "Domain features",
    "Domain features encode insight a subject expert brings, for example body-mass index from height and weight, or debt-to-income ratio in credit scoring; they often help more than any generic transformation.",
    "Use what an expert knows to build a smarter column, like BMI from height and weight.",
    "Good domain features often beat fancy algorithms.");

  def("feng1",
    "What is the Box-Cox transformation?",
    "A power transform that makes positive skewed data more normal.",
    [
      "A rescaling that shifts and stretches a feature so its values all fall between exactly zero and one.",
      "A method that replaces extreme outliers with the nearest value inside a chosen percentile range.",
      "A way to encode cyclical time features using sine and cosine.",
      "A test for whether a feature is statistically useful."
    ],
    "Box-Cox transform",
    "Box-Cox applies a parametrised power transform (choosing the exponent by maximum likelihood) to strictly positive data to reduce skew and stabilise variance, making it more suitable for models that assume normality.",
    "It bends skewed positive numbers into a more bell-shaped spread by finding the best power to raise them to.",
    "It only works on positive values; use Yeo-Johnson if you have zeros or negatives.");

  def("feng1",
    "What is the Yeo-Johnson transformation?",
    "A power transform for reducing skew that also allows zero and negatives.",
    [
      "A transform that maps each value to its rank position among all the observed values in the column.",
      "A transform that groups continuous values into a fixed number of equal-width interval buckets.",
      "A transform that centres a feature on its median.",
      "A transform that one-hot encodes ordinal categories."
    ],
    "Yeo-Johnson transform",
    "Yeo-Johnson is a power transform like Box-Cox that reduces skewness and stabilises variance, but it is defined for zero and negative values too, making it the more general-purpose choice.",
    "Like Box-Cox for de-skewing, but it also copes with zeros and negative numbers.",
    "Reach for it when Box-Cox can't apply because your data isn't strictly positive.");

  def("feng1",
    "What is quantile (equal-frequency) binning?",
    "Splitting a numeric feature into bins holding equal counts of rows.",
    [
      "Splitting a numeric feature into bins of equal width regardless of how many points land in each one.",
      "Replacing each numeric value with the average of the target among rows sharing its value.",
      "Standardising a feature to zero mean and unit variance.",
      "Removing the top and bottom one percent of values."
    ],
    "Quantile binning",
    "Quantile binning chooses cut points so each bin contains roughly the same number of observations (e.g. deciles), which handles skew better than equal-width bins because no bin ends up nearly empty.",
    "Cut a column so every bucket has about the same number of rows, using the data's quantiles.",
    "It is the skew-robust alternative to equal-width binning.");

  def("feng1",
    "What are ratio features?",
    "New features formed by dividing one column by another.",
    [
      "New features formed by adding a small constant to a column before taking its natural logarithm.",
      "New features formed by counting how many other columns share a missing value in the same row.",
      "New features formed from sine and cosine of an angle.",
      "New features that flag values above a fixed threshold."
    ],
    "Ratio features",
    "A ratio feature divides one quantity by another to expose relative rather than absolute information, such as debt-to-income or price-per-square-metre; ratios often carry more signal than either raw column alone.",
    "Divide one column by another to get a telling proportion, like price per square metre.",
    "Ratios capture 'per unit' relationships raw numbers miss.");

  def("feng1",
    "What is a lag feature in time-series feature engineering?",
    "A past value of a series used as an input for the present.",
    [
      "A feature computed as the average of a series over a sliding window of the most recent observations.",
      "A feature that measures how much a series has changed since the previous recorded time step in percent.",
      "A feature encoding the month as sine and cosine.",
      "A feature marking whether a timestamp is a weekend."
    ],
    "Lag features",
    "A lag feature copies a value from an earlier time step (e.g. yesterday's sales) into the current row, giving the model recent history; care is needed to avoid leaking future information.",
    "Feed the model what happened before, like using yesterday's number to predict today's.",
    "Only past lags are safe; using future values would leak.");

  def("feng1",
    "What is a rolling-window feature?",
    "A statistic over a moving window of recent values, e.g. a 7-day mean.",
    [
      "A single value taken from one fixed point in the past and copied forward into the present row.",
      "A feature that records the calendar quarter in which each observation happened to occur.",
      "A feature scaled so its window sums to one.",
      "A feature that flags the largest value ever seen."
    ],
    "Rolling-window features",
    "Rolling (or moving) window features summarise a sliding span of recent observations, such as a 7-day moving average or rolling standard deviation, smoothing noise and capturing local trend for time-series models.",
    "Summarise the last few time steps as they slide along, like a 7-day average.",
    "They give the model a smoothed sense of recent behaviour.");

  def("feng1",
    "What is a missingness-indicator feature?",
    "A binary column flagging whether a value was originally missing.",
    [
      "A column that stores the average of all the non-missing values used to fill the gaps during imputation.",
      "A column that counts the total number of features missing across the entire dataset for each column.",
      "A column that removes any row containing a missing value.",
      "A column that replaces missing values with zero."
    ],
    "Missingness indicator",
    "Adding a 0/1 indicator for whether a feature was missing lets the model learn from the fact of missingness itself, which is useful when data is not missing at random and the missingness carries signal.",
    "Keep a yes/no column noting where data was missing, because that fact can itself be informative.",
    "Pair it with imputation so you don't lose the missingness signal.");

  def("feng1",
    "What is winsorising (outlier clipping) as a feature-engineering step?",
    "Capping extreme values at chosen percentile limits.",
    [
      "Deleting entire rows whenever any one of their feature values lies beyond a chosen percentile cut-off.",
      "Replacing extreme values with the mean of the target variable among similar neighbouring rows.",
      "Taking the logarithm of a feature to compress its range.",
      "Standardising a feature so extreme values become z-scores."
    ],
    "Outlier clipping (winsorising)",
    "Winsorising limits the influence of outliers by capping values below the lower and above the upper percentile at those thresholds, keeping the rows while reducing the pull of extreme values on the model.",
    "Squash the wildest highs and lows to sensible limits instead of throwing the rows away.",
    "It tames outliers without discarding data, unlike simply dropping them.");

  /* ---------- Feature selection (fsel1) ---------- */

  def("fsel1",
    "How is the chi-square test used in feature selection?",
    "It scores how dependent a categorical feature is on the target.",
    [
      "It measures the linear correlation between two continuous features and drops whichever one is redundant.",
      "It fits a model repeatedly, each time removing the weakest feature, until only the best subset remains.",
      "It thresholds features by their variance.",
      "It ranks features by a tree's impurity decrease."
    ],
    "Chi-square test",
    "The chi-square filter tests whether each (non-negative) categorical feature is independent of the class label; a high statistic means strong dependence, so those features are kept as more informative.",
    "It checks which category columns are linked to the label and keeps the linked ones.",
    "It is a filter method for categorical features and targets.");

  def("fsel1",
    "What does the ANOVA F-test measure in feature selection?",
    "Whether a numeric feature's mean differs across the target classes.",
    [
      "Whether two features are so highly correlated that keeping both adds no information over keeping one.",
      "How much the model's cross-validated score drops when a feature's values are randomly shuffled.",
      "How many bits of information a feature shares with the label.",
      "How much variance a feature has before any scaling."
    ],
    "ANOVA F-test",
    "The ANOVA F-test (f_classif) compares the between-class variance to the within-class variance of a numeric feature; a large F means the feature's average shifts across classes, marking it as discriminative.",
    "It asks whether a number's typical value changes from one class to another.",
    "It is the standard univariate filter for numeric-feature, categorical-target problems.");

  def("fsel1",
    "What is forward feature selection?",
    "Starting empty and adding the feature that most improves the model.",
    [
      "Starting with every feature and removing the least useful one at each step until performance drops.",
      "Ranking all features once by a univariate score and keeping a fixed top fraction of them.",
      "Fitting a single L1-penalised model and keeping non-zero weights.",
      "Removing features whose variance is below a threshold."
    ],
    "Forward selection",
    "Forward selection is a greedy wrapper that begins with no features and repeatedly adds the one giving the biggest validated improvement, stopping when no addition helps; it is cheaper than an exhaustive search.",
    "Build the feature set up one at a time, always adding whichever helps most next.",
    "It is a wrapper method, so it can be slow but accounts for feature interactions.");

  def("fsel1",
    "What is backward elimination in feature selection?",
    "Starting with all features and dropping the least useful each round.",
    [
      "Starting from an empty set and adding features one by one until the validated score stops improving.",
      "Testing each feature independently against the target and keeping only the highest-scoring handful.",
      "Shrinking coefficients toward zero with an L1 penalty.",
      "Grouping rare categories before any features are ranked."
    ],
    "Backward elimination",
    "Backward elimination is a greedy wrapper starting from the full feature set and removing the least helpful feature at each step until further removal hurts performance; it can catch redundancy that forward selection misses early.",
    "Begin with everything, then peel off the least useful feature again and again.",
    "It is the mirror image of forward selection.");

  def("fsel1",
    "What does RFECV add over plain recursive feature elimination?",
    "It uses cross-validation to pick how many features to keep.",
    [
      "It replaces the model's coefficients with permutation importances before ranking the features to remove.",
      "It restricts the elimination to categorical features and leaves all numeric features untouched throughout.",
      "It fits an L1-penalised model instead of eliminating.",
      "It selects features purely by their mutual information."
    ],
    "RFECV (RFE with cross-validation)",
    "RFECV runs recursive feature elimination inside a cross-validation loop, scoring each subset size, so instead of you fixing the number of features to keep it automatically chooses the count that cross-validates best.",
    "It is RFE that figures out the best number of features for you using cross-validation.",
    "Use it when you don't know how many features to target.");

  def("fsel1",
    "What does SelectPercentile do?",
    "Keeps the top-scoring given percentage of features by a filter score.",
    [
      "Keeps a fixed integer number of the highest-scoring features rather than a percentage of them.",
      "Removes features one at a time by refitting a model until a target feature count is reached.",
      "Keeps features whose variance exceeds a set cut-off.",
      "Keeps features with non-zero lasso coefficients."
    ],
    "SelectPercentile",
    "SelectPercentile is a univariate filter that ranks features by a scoring function (e.g. ANOVA F or mutual information) and retains the highest-scoring percentile you specify, unlike SelectKBest which keeps a fixed count.",
    "Keep the best-scoring slice of your features, given as a percentage.",
    "It is SelectKBest's percentage-based sibling.");

  def("fsel1",
    "What is SelectFromModel in scikit-learn?",
    "It keeps features whose model-derived importance exceeds a threshold.",
    [
      "It scores each feature independently with a statistical test and keeps a fixed number of the best ones.",
      "It exhaustively evaluates every possible subset of features and returns the single best-scoring combination.",
      "It removes features that are highly correlated with each other.",
      "It bins continuous features before selecting among them."
    ],
    "SelectFromModel",
    "SelectFromModel is an embedded meta-transformer that fits an estimator exposing coefficients or feature importances and keeps only the features whose importance passes a threshold, e.g. non-zero lasso weights or high tree importances.",
    "Let a fitted model rate the features, then keep the ones it rates highly.",
    "It is the general embedded-method wrapper in scikit-learn.");

  def("fsel1",
    "What is the Boruta feature-selection method?",
    "It keeps features that beat randomised shadow copies of themselves.",
    [
      "It ranks features by the linear correlation coefficient each has with the continuous target variable.",
      "It iteratively adds the single most helpful feature until validation performance stops improving.",
      "It drops features whose variance falls below a threshold.",
      "It keeps only features with non-zero L1 coefficients."
    ],
    "Boruta",
    "Boruta creates shuffled 'shadow' copies of every feature and, using a random forest's importances, keeps only real features that consistently outperform the best shadow feature, marking the rest as unimportant.",
    "It races each feature against a shuffled fake of itself and keeps the ones that clearly win.",
    "It is an all-relevant wrapper built around random-forest importances.");

  def("fsel1",
    "What does the variance inflation factor (VIF) measure?",
    "How much a feature is linearly predicted by the other features.",
    [
      "How much the target variable's variance is reduced when a particular feature is added to the model.",
      "How much a model's accuracy falls when the values of one feature are randomly permuted across rows.",
      "How much variance a single feature has before scaling.",
      "How many bits a feature shares with the label."
    ],
    "Variance inflation factor (VIF)",
    "VIF quantifies multicollinearity: for each feature it regresses that feature on all the others and reports 1/(1-R-squared); a high VIF means the feature is largely redundant, guiding which correlated features to drop.",
    "It flags a feature that the other features can already predict, i.e. a redundant one.",
    "High VIF is a signal to remove a collinear feature.");

  def("fsel1",
    "What is stability selection?",
    "Selecting features chosen consistently across many resampled subsets.",
    [
      "Selecting features by fitting one model on the full data and reading off its coefficient magnitudes.",
      "Selecting features by exhaustively scoring every subset and keeping the best one on the training set.",
      "Selecting features by their variance alone.",
      "Selecting features by a single chi-square test."
    ],
    "Stability selection",
    "Stability selection repeatedly subsamples the data, runs a selection method (often lasso) on each subsample, and keeps features selected in a high fraction of runs, giving more robust, reproducible choices than one fit.",
    "Trust the features that keep getting picked no matter which slice of data you use.",
    "It guards against the fragility of selecting from a single fit.");

  def("fsel1",
    "What does mRMR (minimum redundancy, maximum relevance) aim for?",
    "Features highly relevant to the target but not redundant with each other.",
    [
      "Features that individually score highest against the target, regardless of overlap between them.",
      "Features removed one at a time by refitting a model until a chosen count remains in the set.",
      "Features with the largest raw variance in the data.",
      "Features with non-zero coefficients in a lasso fit."
    ],
    "mRMR (minimum redundancy maximum relevance)",
    "mRMR selects a subset that maximises relevance to the target while minimising redundancy among the chosen features, so it avoids picking several features that all carry the same information, unlike pure univariate ranking.",
    "Pick features that each matter for the label but don't repeat one another.",
    "It balances usefulness against overlap, which univariate filters ignore.");

  def("fsel1",
    "What is sequential feature selection (SFS)?",
    "A greedy wrapper that adds or removes features one at a time.",
    [
      "A filter that scores all features once with a statistical test and keeps a fixed top fraction of them.",
      "An embedded method that reads feature importances straight from a single fitted tree ensemble.",
      "A method that thresholds features on their variance.",
      "A method that hashes categories into fixed buckets."
    ],
    "Sequential feature selection",
    "Sequential feature selection is a wrapper (scikit-learn's SequentialFeatureSelector) that greedily builds a feature set forward or backward, using cross-validated model performance to decide each add or drop.",
    "Grow or shrink the feature set step by step, judging each move by model score.",
    "Forward and backward selection are its two directions.");
})();
