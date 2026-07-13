/* Why-wrong notes: DBSCAN, PCA, t-SNE. Keyed by exact question stem; one entry per distractor, same order as choices[1..]. */
(function () {
  var W = (window.WHYNOT = window.WHYNOT || {});

  /* ===== DBSCAN ===== */

  W["k-means tends to find round, blob-shaped clusters. Why can DBSCAN instead trace long, curvy shapes like two crescent moons?"] = [
    "DBSCAN never fits any curve; it just chains neighbouring dense points, and the shape emerges from those links.",
    "No axis rotation happens; DBSCAN works with plain distances in the original feature space.",
    "That's the centre-and-radius picture of k-means; DBSCAN has no cluster centre to grow from.",
    "DBSCAN is a different algorithm entirely, not repeated k-means runs with merged blobs."
  ];

  W["DBSCAN is a 'density-based' clustering method. What does 'density' mean here?"] = [
    "The gap between clusters is separation, not density; density is about crowding inside a region.",
    "The cluster count is an output of the algorithm, not what 'density' measures.",
    "That describes uniformity across the whole dataset; density is local crowding in a small area.",
    "Distance to a cluster's mean is a centroid idea from k-means; DBSCAN never computes centres."
  ];

  W["DBSCAN labels some points 'border' points. What is a border point?"] = [
    "DBSCAN draws no dividing lines between clusters; border points are defined by neighbourhoods, not boundary lines.",
    "A point in no cluster is noise (label -1); a border point does belong to a cluster.",
    "A core point on the edge is still core; border points specifically lack minPts neighbours of their own.",
    "Equal distance to two centres is a k-means notion; DBSCAN has no cluster centres."
  ];

  W["How does the 'k-distance plot' help you choose DBSCAN's eps?"] = [
    "The maximum pairwise distance spans the whole dataset, giving a huge eps that merges everything.",
    "That would need many DBSCAN reruns; the k-distance plot requires no clustering runs at all.",
    "Averaging blends cluster interiors with noise, giving no clean cutoff; the elbow marks the real break.",
    "That plateau-of-counts idea is a different heuristic; the k-distance plot uses neighbour distances, not cluster sizes."
  ];

  W["DBSCAN's first parameter is 'eps'. What does eps mean?"] = [
    "DBSCAN never takes a cluster count; the number of clusters emerges from density.",
    "Minimum cluster size relates to the minPts threshold, not eps, which is a distance.",
    "No parameter caps the noise fraction; noise is whatever falls outside dense regions.",
    "DBSCAN does one expansion pass, and eps is a radius, not an iteration count."
  ];

  W["DBSCAN's second parameter is 'minPts' (or min_samples). What does it set?"] = [
    "There is no maximum cluster size in DBSCAN; clusters grow as far as density carries them.",
    "The number of clusters is discovered by the algorithm, never given as a parameter.",
    "Cluster separation is an outcome of density gaps in the data, not a knob you set.",
    "The feature count comes from the data itself; minPts is a neighbour headcount, not dimensionality."
  ];

  W["DBSCAN sorts points into three roles. What is a 'core' point?"] = [
    "A centre of gravity is a centroid from k-means; DBSCAN computes no such centre.",
    "Visit order doesn't confer core status; being core depends only on neighbour counts within eps.",
    "Cores sit inside dense interiors; a point on a boundary between clusters is closer to a border/noise case.",
    "Core status is a local threshold many points pass, not a title for the single densest point."
  ];

  W["After DBSCAN runs, some points are labelled −1. What does that mean, and why is it a feature?"] = [
    "-1 isn't a cluster; the points carrying it need not be near each other or dense at all.",
    "Core points always receive a real cluster label; -1 marks points in no dense region.",
    "DBSCAN visits every point; -1 is a deliberate verdict, not a timeout.",
    "Each point gets at most one cluster; -1 means it belongs to none, not to all."
  ];

  W["DBSCAN never asks for k. Instead it grows clusters from 'dense' points. What is its definition of a cluster?"] = [
    "A mean-centred ball is a centroid picture; DBSCAN clusters have no centre and no fixed radius.",
    "Nearest-centroid regions describe the k-means partition, not density-based clusters.",
    "A pruned dendrogram branch is hierarchical clustering; plain DBSCAN builds no merge tree.",
    "Members needn't all sit within one eps of each other — clusters chain through neighbours, so ends can be far apart."
  ];

  W["DBSCAN takes eps (radius) and minPts (neighbour quota). What happens as you grow eps from tiny to huge?"] = [
    "That's the sequence reversed — tiny eps gives all noise and huge eps gives one blob, not the other way round.",
    "Growing eps merges clusters rather than splitting them; fragmentation happens as eps shrinks.",
    "Small eps doesn't show true clusters at once; it first labels everything noise, then fragments.",
    "The count eventually falls to one as eps bridges every gap; it cannot rise without bound."
  ];

  W["Three of your points end up labelled −1 by DBSCAN. What is it telling you, and why is that a feature rather than a bug?"] = [
    "Border points always get attached to some cluster; -1 marks points reachable from no core at all.",
    "Core points sit in dense regions by definition, so they can never be labelled -1.",
    "Any density-reachable point is absorbed whatever the order; -1 means it was never reachable at all.",
    "Noise isn't a seam marker between clusters; -1 points are simply in no dense region, wherever they sit."
  ];

  W["Unlike k-means, DBSCAN discovers HOW MANY clusters exist. When is that autonomy most valuable?"] = [
    "If you can already supply k, centroid methods answer that question directly; the autonomy adds little.",
    "DBSCAN never balances cluster sizes; an equal-count requirement suits no density method.",
    "If the true group labels are already known, no clustering is needed at all.",
    "DBSCAN doesn't minimise the cluster count; the number falls out of density, not a fewest-groups goal."
  ];

  W["One tight, dense cluster and one sparse, spread-out cluster share a dataset. Why does this defeat DBSCAN's single eps?"] = [
    "The clash is over the eps radius, not minPts; no minPts choice can make one radius fit two spacings.",
    "Cross-cluster reachability isn't the issue; the trouble is one radius misreading one of the two densities.",
    "Sparse points can reach minPts neighbours if eps is large enough — but that same eps then merges everything.",
    "eps constrains distances, not core-point counts; nothing forces clusters to hold equal numbers of cores."
  ];

  W["What is DBSCAN?"] = [
    "Fixing k and iteratively moving centroids describes k-means, not DBSCAN.",
    "A full nested merge tree is agglomerative (hierarchical) clustering.",
    "Majority vote of labelled neighbours is k-NN classification, a supervised method.",
    "Projecting onto maximum-variance directions is PCA, a dimensionality reducer, not clustering."
  ];

  W["In DBSCAN, what is 'min_samples' (minPts)?"] = [
    "DBSCAN takes no cluster-count parameter; the number of clusters emerges from density.",
    "min_samples gates which points are core, not the smallest cluster size that gets reported.",
    "DBSCAN uses every point; nothing is sampled before it starts.",
    "The maximum neighbour distance is eps, the other parameter."
  ];

  W["In DBSCAN, what is a point's 'eps-neighbourhood'?"] = [
    "The single closest point regardless of distance is a nearest neighbour; the eps-neighbourhood is everyone inside a fixed radius.",
    "Cluster assignment is an output; the neighbourhood is a geometric set defined before any clustering.",
    "An average distance is one number, not a set of nearby points.",
    "Closer-to-p-than-any-centroid describes a Voronoi cell from k-means; DBSCAN has no centroids."
  ];

  W["In DBSCAN, what does it mean for a point to be 'directly density-reachable' from a core point?"] = [
    "The reached point needn't be core itself — border points are directly density-reachable too.",
    "It needn't be the closest neighbour; anything within eps of the core point qualifies.",
    "A multi-hop chain is plain density-reachability; 'directly' means a single hop.",
    "The relation starts from a core point's eps radius, not an exact distance from a border point."
  ];

  W["In DBSCAN, what does it mean for a point to be 'density-reachable' from a core point?"] = [
    "Lying within eps of one core point is DIRECT reachability; density-reachable allows chains of hops.",
    "Being within eps of just any point isn't enough — intermediate hops must pass through core points.",
    "Mere cluster co-membership isn't the definition; reachability requires a concrete chain of core-point hops.",
    "A noise point is reachable from no core point by definition, so it can never be density-reachable."
  ];

  W["In DBSCAN, what does it mean for two points to be 'density-connected'?"] = [
    "Direct closeness isn't required — a shared core point can link two points that sit far apart.",
    "Neither point needs to be core, and matching neighbour counts play no role.",
    "Being the two farthest cluster members is irrelevant; connection is about a shared core, not extremes.",
    "A noise point is reachable from no core, so it can't be density-connected to anything."
  ];

  W["In DBSCAN, what is a 'cluster'?"] = [
    "A fixed radius around a chosen centre is a ball; DBSCAN clusters have no centre and follow density, not a radius.",
    "min_samples is a per-point neighbour threshold, not the size of a seed group.",
    "Label -1 marks noise — precisely the points in NO cluster.",
    "Nearest-centroid groups describe k-means; DBSCAN has no centroids."
  ];

  W["What is the 'k-distance graph' used to choose eps in DBSCAN?"] = [
    "Inertia versus k is the k-means elbow method, a different plot entirely.",
    "The k-distance graph is drawn BEFORE clustering; it isn't a histogram of DBSCAN's results.",
    "A silhouette sweep over min_samples is a validation exercise, not the k-distance graph.",
    "It plots each point's k-th-neighbour distance, not distances between finished clusters."
  ];

  W["What is 'HDBSCAN'?"] = [
    "HDBSCAN uses all the data; its advance is a density hierarchy, not subsampling for speed.",
    "It's still unsupervised clustering, not a classifier trained on DBSCAN's output.",
    "min_samples heuristics exist, but HDBSCAN is a full algorithm, not a parameter-setting rule.",
    "HDBSCAN still labels sparse points as noise; it doesn't force everything into a cluster."
  ];

  W["DBSCAN's eps is notoriously hard to guess. The standard recipe: compute every point's distance to its k-th nearest neighbour, sort those distances, and plot them. What are you looking for?"] = [
    "The plateau shows typical interior gaps, but the operative boundary is the bend where distances leave that shelf, not the shelf itself.",
    "The steepest climb occurs among the sparse noise points — the opposite of the densest neighbourhoods.",
    "Averaging blends interior distances with far-off noise, giving an eps that matches neither regime.",
    "The far-right tail belongs to the worst outliers; eps set just below it would be huge and merge real clusters."
  ];

  W["Your data has one dense downtown cluster and one sprawling rural cluster. Any single eps either shreds the sprawl or merges the downtown. Which successors fix this, and how?"] = [
    "Rescaling features is a scaler's job and can't create per-region density thresholds; that's not how either method works.",
    "They don't auto-tune min_samples; they vary the density level, keeping min_samples as a user knob.",
    "There's no region-by-region rerun and stitching; one hierarchy over all density levels is built at once.",
    "They KEEP sparse clusters rather than discard them — handling varied density is the whole point."
  ];

  W["DBSCAN on customers with age (18–70) and income (£15k–£150k), unscaled. eps is one number applied to distances. What has income's scale done to the neighbourhoods?"] = [
    "DBSCAN does no internal rescaling; it uses raw distances exactly as given.",
    "The split isn't even — squared income gaps dwarf age gaps, so income supplies nearly all the distance.",
    "Points still find neighbours in income terms; scale skews the metric, it doesn't turn everyone into noise.",
    "Backwards — the large-range feature (income) dominates Euclidean distance, not the small-range one."
  ];

  W["Naive DBSCAN asks 'who is within eps of me?' for every point against every other point — O(n²). How do real implementations make this fast?"] = [
    "Caching all n-squared distances costs the very O(n²) time and memory you're trying to avoid.",
    "Sampling changes the answers; real implementations speed up exact radius queries instead.",
    "A one-axis sort misses neighbours that are close overall but distant along that axis; a 1-D window can't answer a radius query.",
    "Implementations don't secretly PCA your data; the speedup comes from spatial indexes on the full space."
  ];

  W["Run DBSCAN twice on the same data with the same settings but shuffled row order, and a few points swap cluster labels. Which points, and why is this considered harmless?"] = [
    "Core points can never be reassigned — their labels follow the density structure, not visit order.",
    "Noise points outside eps of every core stay noise in every order; they're never swept in.",
    "Core status depends only on neighbour counts within eps, which don't change with visiting order.",
    "No rounding is involved; the order effect is about which cluster claims a contested border point first."
  ];

  W["HDBSCAN is billed as 'DBSCAN without the eps headache'. It replaces the fixed radius with a hierarchy built on MUTUAL REACHABILITY distance. What problem does that redefined distance specifically solve?"] = [
    "Mutual reachability INFLATES sparse-region distances rather than shrinking dense ones, and the goal is many density levels, not one global eps.",
    "Shared-neighbour counts describe SNN similarity; mutual reachability is a maximum of distances and core-distances.",
    "It takes the MAXIMUM of the pair distance and both core-distances, not an average.",
    "No per-feature rescaling happens; the correction is per-point via core-distances, not stretching features by density."
  ];

  W["OPTICS doesn't output clusters directly — it produces a 'reachability plot', a 1-D bar chart from which clusters are then read. How does that plot encode the cluster structure at ALL density levels at once?"] = [
    "Backwards — the plot shows reachability distances, so dense clusters are LOW valleys, not peaks of neighbour counts.",
    "Ordering follows density connectivity, not distance from a global centroid; there's no outer-shell peeling.",
    "The bars are per-point reachability distances in cluster order, not the spanning tree's edge weights.",
    "The order is chosen by reachability, not raw processing time, and valleys mark dense clusters, not scan speed."
  ];

  W["Under the curse of dimensionality, DBSCAN quietly stops working long before it errors: in 50-D, choosing eps becomes near-impossible. What breaks, mechanically?"] = [
    "Distances concentrate at similar values rather than exploding; the curve flattens instead of climbing everywhere.",
    "Neighbour counts within a fixed eps SHRINK as volume spreads out in high dimensions; nothing collapses into one giant core cluster.",
    "Cost rises, but the killer is geometric — the elbow disappears — not merely a slow plot.",
    "The failure is distance concentration everywhere, not clusters physically touching on a hypersphere surface."
  ];

  W["A geospatial team clusters GPS pings (latitude, longitude) with DBSCAN and Euclidean distance. Clusters near the poles come out distorted and eps means different real distances at different latitudes. What's the correct fix?"] = [
    "Manhattan is still a flat-grid metric and warps with latitude just like Euclidean; the Earth needs a spherical metric.",
    "The cosine trick only patches longitude locally and still fails near the poles; haversine handles the sphere exactly.",
    "Standardising lat/long destroys their geographic meaning entirely; it doesn't make a flat grid spherical.",
    "min_samples adjusts the density threshold, not the metric — the distortion lives in the geometry, not the headcount."
  ];

  W["For a customer-similarity graph (nodes = customers, weighted edges = interaction strength), you want to find communities. Spectral clustering is the go-to. What is it fundamentally doing?"] = [
    "A leading-eigenvector ranking is centrality scoring (PageRank-style), not a Laplacian embedding into communities.",
    "Greedy edge-cutting is a different heuristic; spectral clustering embeds nodes via Laplacian eigenvectors before clustering them.",
    "That's PCA on node attributes; spectral clustering uses the graph Laplacian, which encodes connectivity, not feature covariance.",
    "Label propagation is a separate community algorithm; spectral clustering does an eigenvector embedding plus k-means, not diffusion from seeds."
  ];

  /* ===== PCA ===== */

  W["PCA scans your data to find directions of greatest spread. Does it use the target labels (the values you are trying to predict)?"] = [
    "PCA has no access to labels; its axes come from feature variance alone.",
    "No label-driven feature selection happens; every feature enters the variance computation unlabelled.",
    "Label type is irrelevant because PCA never reads the label column at all.",
    "Labels aren't standardised or used in any form; only the features are processed."
  ];

  W["Your data has 40 features, far too many to plot. How does PCA let you SEE the cloud on a 2-D scatter plot?"] = [
    "Widest raw range mostly reflects units; keeping just those 2 columns discards the blended structure PCA preserves.",
    "A plain average is one fixed recipe; PCA finds the two directions preserving the most spread, which an average generally isn't.",
    "Plotting two original columns ignores the other 38; components blend all features to keep more information.",
    "Clustering assigns group labels; it doesn't give each point 2-D coordinates to scatter."
  ];

  W["PCA talks about a dataset's 'dimensions'. In this sense, what are the dimensions?"] = [
    "Rows are samples; adding data points doesn't add dimensions.",
    "The number of components kept is PCA's output choice, not the dataset's original dimensionality.",
    "Cluster count describes grouping structure, not the number of coordinate axes.",
    "Spread along a feature is variance, not a count of dimensions."
  ];

  W["PCA produces a 'scree plot'. What does it show, and what is it for?"] = [
    "Loadings interpret what a component means; the scree plot shows variance per component instead.",
    "The PC1-versus-PC2 scatter is the projection plot, a different picture from the scree curve.",
    "Per-point reconstruction error is an anomaly-detection tool, not what a scree plot draws.",
    "Ranking features by correlation is a feature-selection aid; the scree plot ranks components by variance."
  ];

  W["In PCA-based anomaly detection you compute a point's 'reconstruction error'. What is it?"] = [
    "Distance from the mean ignores the round trip; a far-out point lying along PC1 can reconstruct perfectly.",
    "There's no per-point component count; the same fixed set of components is applied to every point.",
    "Discarded variance is a dataset-level total, not the per-point gap between original and rebuilt.",
    "No classifier or label is involved; reconstruction error is purely unsupervised."
  ];

  W["PCA works by 'projecting' data onto fewer directions. What does projecting a point onto a line mean?"] = [
    "Projection lands at the perpendicular foot on the line, not at any existing data point.",
    "Rounding coordinates is quantisation; projection changes dimensionality, not numeric precision.",
    "No point is deleted; every point gets a shadow position on the line.",
    "Rotating the dataset just changes axes; projection actively discards the off-line part."
  ];

  W["PCA's first output is the 'first principal component' (PC1). What is it?"] = [
    "PC1 is a blend of features, not one original column kept unchanged.",
    "The average of the points is the mean — a point, not a direction of spread.",
    "The line between the two farthest points chases two extremes; PC1 reflects all points' spread.",
    "Least variation is the LAST component — the direction PCA discards first."
  ];

  W["PCA ranks components by 'variance'. Why does more variance mean more useful information?"] = [
    "Variance measures the data's spread, not any model's prediction accuracy.",
    "Units inflating raw variance is the scaling pitfall — a reason to standardise, not why spread is information.",
    "Variance is average squared deviation from the mean, not a count of points on a line.",
    "High variance can include noise, but 'always noisier' is false — spread also carries the real differences between points."
  ];

  W["Each principal component comes with 'loadings'. What do loadings tell you?"] = [
    "Points don't 'fall on' components; loadings are feature weights, not point counts.",
    "PCA knows nothing of classifiers or accuracy; loadings are unsupervised weights.",
    "Component order comes from variance ranking, not from the loadings.",
    "Nearest-point distances have nothing to do with a component's feature recipe."
  ];

  W["Your dataset has 300 columns. Before any modelling, why would you deliberately throw dimensions away?"] = [
    "High dimensionality doesn't force features to correlate; correlation depends on the data, not the column count.",
    "The row count is unchanged by adding columns; the trouble is geometry and overfitting, not vanishing rows.",
    "Dropping columns doesn't erase outliers, and outlier removal isn't the goal of reduction.",
    "Databases store hundreds of columns without truncation; storage isn't the motivation."
  ];

  W["PCA must choose its FIRST axis — the single best line to flatten the data onto. Which line does it pick?"] = [
    "Minimising projected spread keeps the LEAST information — the exact opposite of PCA's goal.",
    "Least-squares regression minimises vertical errors to a target; PCA has no target and its line generally differs from the OLS fit.",
    "A mean-to-farthest-point line chases one outlier; PC1 reflects the whole cloud's spread.",
    "Tightest clustering of projections is MINIMUM variance — the direction PCA would keep last, not first."
  ];

  W["PC1 is fixed. Where does PCA put its SECOND component?"] = [
    "An axis aligned with PC1 adds nothing new; components are made perpendicular so each carries fresh information.",
    "PCA maximises variance, not point density; the densest region doesn't define an axis.",
    "Components sit at 90 degrees, not 45 — and which perpendicular direction wins depends on the data.",
    "The two closest points define a local accident, not the direction of the remaining spread."
  ];

  W["You run PCA on 50 features and get 50 components with their 'explained variance ratios'. How do you decide how many to KEEP?"] = [
    "Requiring 50% each would keep at most two components; the criterion is the cumulative sum, not individual shares.",
    "Below-the-mean components are the weakest; that rule keeps the noisy tail and drops the signal.",
    "Class labels have no connection to variance structure; PCA doesn't count classes.",
    "Past the flattest stretch lie the near-zero components; you keep the ones BEFORE the flattening, not after."
  ];

  W["You run PCA on raw features: income (tens of thousands) and satisfaction (1–10). PC1 comes out pointing almost exactly along income. Why?"] = [
    "PCA never counts unique values; cardinality is irrelevant to variance.",
    "PCA makes no reliability judgement; big numbers dominate mechanically through scale, not through any trust weighting.",
    "Centring removes the mean entirely, so income's mean can't dominate; it's the SPREAD in raw units that wins.",
    "No correlation with other features is needed; income wins on unit size alone."
  ];

  W["The data lies along a curved arc — like a bent wire. PCA keeps disappointing: no single axis captures it well. What's the structural reason?"] = [
    "PCA thrives on correlated inputs — correlation is exactly what it compresses; that's not the failure here.",
    "Variance along any straight direction is perfectly well defined for curved data; ranking isn't the problem.",
    "PCA discards nothing before choosing axes; it simply can't represent the arc with one straight line.",
    "A curve doesn't spread variance evenly; the issue is straightness of the axes, not a tie between directions."
  ];

  W["In PCA, what does 'variance explained' mean?"] = [
    "A count of dropped features is preprocessing bookkeeping, not a share of variance.",
    "A distance between two points is sample geometry, not a fraction of total variance.",
    "A penalty on weights describes regularisation, which PCA doesn't use.",
    "PCA assigns no class labels, so there's no 'correct class' proportion to report."
  ];

  W["What is Principal Component Analysis (PCA)?"] = [
    "Density-based grouping with noise labels is DBSCAN, not PCA.",
    "A supervised straight-boundary classifier describes logistic regression or a linear SVM.",
    "Bootstrap trees with averaged votes is a random forest.",
    "Searching hyper-parameter combinations is grid search, not a data transformation."
  ];

  W["What is a principal component?"] = [
    "Components are weighted blends of all features, not a single untouched column.",
    "The mean centres the data, but it's a point, not a direction of variation.",
    "PCA assigns points to no centres; that's clustering.",
    "PCA predicts no labels; it only re-expresses coordinates."
  ];

  W["What is the first principal component (PC1)?"] = [
    "The least-varying direction is the LAST component, the first to be discarded.",
    "Big raw numbers can hijack unscaled PCA, but PC1 is defined as a maximum-variance DIRECTION, not an original feature.",
    "The farthest-pair line reflects two extreme points; PC1 maximises variance over all the points.",
    "Every component is perpendicular to the others; PC1 specifically carries the MOST variance, not none."
  ];

  W["In PCA, what is an eigenvector of the covariance matrix?"] = [
    "The per-feature averages form the mean vector used for centring, not an eigenvector.",
    "An eigenvector is a direction, not a data point that happens to lie on a component.",
    "Unexplained variance relates to discarded eigenvalues, not to what an eigenvector is.",
    "PCA computes eigenvectors exactly by decomposition, not by refining random guesses with gradient descent."
  ];

  W["In PCA, what does the eigenvalue of a principal component tell you?"] = [
    "Angles to the original axes come from the eigenvector's entries (loadings), not from the eigenvalue.",
    "Every point projects onto every component; eigenvalues measure variance, not point counts.",
    "Per-feature weights are the loadings — entries of the eigenVECTOR, not the eigenvalue.",
    "Orthogonality holds by construction for all components; the eigenvalue doesn't encode it."
  ];

  W["In PCA, what is the explained-variance ratio of a component?"] = [
    "Points don't generally lie 'exactly on' a component; the ratio is about variance share, not point membership.",
    "Components always sit at 90 degrees to each other; no angle fraction is being reported.",
    "The count of non-zero loadings says nothing about the variance share.",
    "PCA is fit on all the supplied data; the ratio isn't a sampling percentage."
  ];

  W["What is a scree plot in PCA?"] = [
    "A PC1-versus-PC2 scatter is the projection view, not a scree plot.",
    "A bar chart of loadings interprets one component; the scree plot compares ALL components' variances.",
    "A covariance heatmap shows pairwise feature relationships, not per-component variance.",
    "Error versus number of trees belongs to ensemble tuning, nothing to do with PCA."
  ];

  W["In PCA, what is a loading?"] = [
    "A data point's coordinate along a component is its SCORE; loadings are feature weights.",
    "The eigenvalue is the component's variance — a separate quantity from its per-feature weights.",
    "How many components to keep is a retention choice, not a loading.",
    "Lost variance measures reconstruction quality; loadings define the direction itself."
  ];

  W["In PCA, what is the covariance matrix that gets decomposed?"] = [
    "The raw data table is rows-by-features and rectangular; the covariance matrix is a square feature-by-feature summary.",
    "Eigenvalues are outputs of decomposing the matrix, not the matrix itself.",
    "Projected scores are the transformed data — the decomposition's result, not its input.",
    "A confusion matrix compares predictions to labels; PCA has neither."
  ];

  W["In PCA, what does it mean that the principal components are orthogonal?"] = [
    "Components are generally rotated away from the original axes; parallel to them would mean no rotation happened.",
    "Unit length is normalisation — a separate property from being mutually perpendicular.",
    "Components are ranked LARGEST variance first, and ordering isn't what 'orthogonal' means anyway.",
    "Passing through the data mean concerns centring, not the angle between components."
  ];

  W["In PCA, what is whitening (sphering)?"] = [
    "Deleting small-eigenvalue components is truncation (dimension reduction), not whitening.",
    "Adding random noise is data corruption or augmentation, unrelated to rescaling components.",
    "Rotating back onto the original axes would undo PCA; whitening rescales the component scores instead.",
    "Using a correlation matrix means standardising the INPUTS before PCA, not rescaling the outputs afterwards."
  ];

  W["You compress 100 sensor channels to 12 principal components and reconstruct. The reconstruction is imperfect — yet often CLEANER than the original. How?"] = [
    "PCA doesn't average channels; components are variance-maximising blends, and the central limit theorem isn't the mechanism.",
    "Top components neither amplify signal nor shrink channels; the cleaning comes from omitting noise-dominated directions.",
    "There's no snapping to nearest components; reconstruction is a smooth linear projection.",
    "The gain isn't spread equally per channel; it comes specifically from dropping the low-variance noise directions."
  ];

  W["Two roads to fewer dimensions: feature SELECTION (keep 10 original columns) versus feature EXTRACTION like PCA (build 10 new blended axes). What's the real trade?"] = [
    "That's the trade reversed — selection keeps interpretable original columns; extraction is what maximises retained variance.",
    "Backwards: selection keeps a subset of the originals intact; extraction is the one that blends columns.",
    "Selection leaves correlations among the kept columns; PCA extraction is what yields uncorrelated axes.",
    "They keep different amounts — blended axes retain more variance per dimension than any same-size subset of columns."
  ];

  W["You add PCA before a classifier. Where must the PCA be FITTED, and why does this question feel familiar?"] = [
    "Being unsupervised doesn't stop leakage — fitting on test rows lets their distribution shape the components.",
    "Validation folds must stay unseen too; fitting on them leaks into model selection.",
    "Fitting on each test fold makes the transformation depend on test data — the definition of leakage.",
    "PCA is preprocessing fitted before the classifier; tuning it to the model's errors would peek at labels too."
  ];

  W["PCA on body measurements returns a first component with loadings: height 0.52, weight 0.55, arm span 0.50, shoe size 0.42, hair colour 0.03. How do you read this component?"] = [
    "Loadings are direction weights, not a ranking of features by predictive importance.",
    "It's no plain average — the weights differ and come from covariance structure, not value frequencies.",
    "A contrast needs mixed signs; these loadings all share the same positive sign.",
    "One axis summarising correlated features is PCA doing its job, not evidence you should delete four columns."
  ];

  W["On one dataset PC1 captures 50% of the variance; on another it captures 99.5%. What property of the FEATURES drives how much variance one component can absorb?"] = [
    "Raw scale can skew unstandardised PCA, but the SHARE of total variance one axis absorbs is driven by correlation, not range.",
    "Fewer features doesn't force a big PC1 share; two uncorrelated features still split variance evenly.",
    "Skewness shapes each distribution but doesn't determine how much variance a shared axis soaks up.",
    "Independence is the opposite case — uncorrelated features force variance to spread across many components."
  ];

  W["A fraud team compresses normal transactions with PCA (keeping a few components), then reconstructs each incoming transaction and measures the reconstruction error. Why does this catch anomalies?"] = [
    "Fraud needn't be extreme along PC1; it's OFF the normal directions, which is what the reconstruction gap captures.",
    "Components encode directions of variation, not just an average, and flagging happens via the reconstruction gap.",
    "PCA keeps the HIGH-variance components, and an anomaly's oddness lies outside the kept subspace, not in retained low-ranked ones.",
    "Reconstruction produces coordinates, not class probabilities; no classifier is involved."
  ];

  W["Vanilla PCA chokes: one dataset is 10M rows and won't fit in memory, another needs eigenvectors of a 20k-feature matrix, a third has structure that's curved, not linear. Which toolbox variants map to these three walls?"] = [
    "Roles swapped — IncrementalPCA handles streaming batches, randomized SVD handles huge matrices, KernelPCA handles curves.",
    "TruncatedSVD targets sparse matrices without centering, not out-of-core batches; SparsePCA sparsifies loadings, not big-matrix speed.",
    "SparsePCA sparsifies loadings and FastICA finds independent components; neither solves streaming or huge eigenproblems.",
    "KernelPCA is the nonlinear tool, not an out-of-core one; every assignment here is shuffled."
  ];

  W["Textbooks say PCA finds directions of maximum variance; other books say it finds the best low-rank reconstruction; a third says it's the SVD of the data matrix. Which is true?"] = [
    "Centering is required for the equivalence, but unit-variance rescaling isn't — that's an optional preprocessing choice.",
    "All three are exactly equivalent theorems, not approximations of one 'true' definition.",
    "SVD of the centered matrix gives the identical directions for any matrix shape; squareness is irrelevant.",
    "The equivalence holds in every dimension, not just 2-D."
  ];

  W["You want the top 10 principal components of a 500,000 × 20,000 matrix. Exact PCA would eigendecompose a 20,000² covariance matrix — hopeless. Randomized SVD gets the top 10 in seconds. What's the trick?"] = [
    "No random stand-in covariance matrix is built; the sketch comes from projecting the DATA onto a few random directions.",
    "Row subsampling ignores most of the data; randomized SVD uses every row via its random projections.",
    "One-at-a-time power iteration is a different, slower classic; the randomized method captures the whole subspace at once.",
    "There's no hashing or decoding step; it's random projection plus a small exact SVD inside the captured subspace."
  ];

  W["PCA gave a great low-dimensional embedding but the components are impossible to interpret — every one mixes all 200 features a little. A colleague suggests Non-negative Matrix Factorization (NMF) instead. What does NMF's constraint change?"] = [
    "PCA's components are ALREADY orthogonal; orthogonality is what NMF gives up, not what it adds.",
    "NMF components remain blends of several features, not single renamed columns; sparsity is a by-product, not one-feature-each.",
    "NMF factors are non-negative but not forced to sum to one; they aren't probability distributions.",
    "NMF's constraint is on SIGN (no negatives allowed), not on bounding magnitudes."
  ];

  W["A dataset has 100,000 mostly-empty columns (one-hot words, TF-IDF). You want to reduce dimensions, but sklearn's PCA errors or blows up memory. Why, and what's the drop-in fix?"] = [
    "Top-k truncated solvers exist for PCA too; the real killer is centering, which densifies the sparse matrix.",
    "sklearn's PCA doesn't rescale to unit variance; it subtracts the mean, and that centering is what destroys sparsity.",
    "PCA has no squareness or padding requirement; SVD handles rectangular matrices natively.",
    "Modern PCA uses SVD without forming a covariance matrix; the blow-up comes from densifying via mean subtraction."
  ];

  W["You standardize features, run PCA, keep 10 components, and feed them to a classifier — accuracy DROPS versus using raw features. How can 'keeping the high-variance directions' hurt prediction?"] = [
    "PCA is genuinely unsupervised — it has no label input at all, wrong or otherwise.",
    "Standardising equalises scales but doesn't flatten class signal into noise; the loss comes from discarding predictive low-variance directions.",
    "Blending is a linear recombination a classifier can handle; the damage comes from DISCARDED components, not merged ones.",
    "Classifiers cope fine with linearly recombined features; rotation alone doesn't hurt accuracy."
  ];

  /* ===== t-SNE ===== */

  W["t-SNE is called a 'nonlinear' method, while PCA is 'linear'. In plain terms, what does being nonlinear let t-SNE do?"] = [
    "t-SNE is actually slower than most methods; speed isn't what nonlinearity buys.",
    "t-SNE is stochastic — different seeds give different pictures; nonlinearity doesn't add reproducibility.",
    "t-SNE distorts global distances deliberately; you can't measure true distances off its map.",
    "Standard t-SNE has no reusable formula for new points; that's one of its weaknesses, not a nonlinear perk."
  ];

  W["How does t-SNE's running time behave as you feed it more and more data points?"] = [
    "Layout cost depends heavily on point count — the pairwise comparisons multiply as data grows.",
    "More points means more pairwise work each iteration, not faster settling.",
    "Input dimension matters far less than point count; pairwise comparisons over points dominate the cost.",
    "Perplexity sets neighbourhood size, not runtime; cost still climbs steeply with more points."
  ];

  W["In t-SNE, what does the 'learning rate' control?"] = [
    "The neighbour count is set by perplexity, not the learning rate.",
    "The number of passes is a separate setting (n_iter), not the learning rate.",
    "There's no pull-to-centre knob; the rate scales the size of each optimisation step.",
    "t-SNE doesn't subsample per update; the rate is about step size, not a sampling fraction."
  ];

  W["What does setting init='pca' do when you run t-SNE?"] = [
    "init affects the STARTING positions, not any cleanup after t-SNE finishes.",
    "The neighbour-probability machinery is unchanged; only the initial layout comes from PCA.",
    "Perplexity remains a separate knob you set; init='pca' doesn't choose it.",
    "t-SNE still runs its full optimisation; PCA only supplies the starting point."
  ];

  W["What is UMAP, the method often mentioned alongside t-SNE?"] = [
    "UMAP is a reducer in its own right, not a distance-measuring tool — and its map distances aren't literal either.",
    "UMAP doesn't tune t-SNE's perplexity; it's a separate algorithm with its own n_neighbors knob.",
    "UMAP builds embeddings itself rather than converting t-SNE maps into features.",
    "UMAP runs on raw high-dimensional data directly; PCA preprocessing is optional, not required."
  ];

  W["t-SNE and PCA both do 'dimensionality reduction'. In plain terms, what is that?"] = [
    "Deleting rows shrinks samples; dimensionality reduction shrinks feature columns.",
    "Rounding lowers precision, not the number of dimensions.",
    "Merging exact duplicates barely helps; reduction builds new axes summarising many differing columns.",
    "Cluster count is a property of grouping, not the number of feature dimensions."
  ];

  W["t-SNE produces a 2-D 'embedding' of the data. What is an embedding?"] = [
    "A compressed file preserves everything byte-for-byte; an embedding is new coordinates where closeness means similarity.",
    "An embedding gives each item several coordinates, not one summary number.",
    "A ranked feature list is feature-selection output, not positions in a space.",
    "The embedding IS the coordinates themselves, not a model trained to predict them."
  ];

  W["Run t-SNE twice on the same data and the two pictures can look different. Why, and how should you treat that?"] = [
    "It's expected behaviour, not a bug: optimisation from random starts legitimately lands in different layouts.",
    "The data is untouched; the randomness lives in t-SNE's initial positions.",
    "t-SNE doesn't overfit more on later runs; each run is an independent optimisation.",
    "Run-to-run variation reflects the random start, not missing structure — real clusters recur across runs."
  ];

  W["t-SNE makes those famous 2-D maps of high-dimensional data. What does it work hardest to preserve?"] = [
    "Exact pairwise distances are precisely what t-SNE sacrifices; only neighbour relations are kept.",
    "Variance along the original axes is PCA's objective, not t-SNE's.",
    "Cluster sizes and gaps are notorious artefacts on a t-SNE map, not preserved quantities.",
    "Global geometry is what t-SNE trades away in exchange for faithful neighbourhoods."
  ];

  W["t-SNE's main knob is 'perplexity' — roughly, how many neighbours each point considers its circle. What does setting it far too LOW do?"] = [
    "Merging groups into one blob is the TOO-HIGH perplexity failure, not too low.",
    "No setting makes t-SNE's pairwise distances accurate; the map never preserves exact distances.",
    "t-SNE never discards points; outliers stay on the map.",
    "Perplexity doesn't fix randomness; identical re-runs need a fixed seed or init, which low perplexity doesn't provide."
  ];

  W["On a finished t-SNE map, cluster A looks twice as big as cluster B, and C sits far away from both. What may you safely conclude?"] = [
    "Apparent area is an artefact — t-SNE equalises densities, so drawn size says nothing about variance.",
    "Between-cluster gaps are nearly meaningless; C's distance doesn't rank how different it is.",
    "t-SNE's axes are arbitrary optimisation outputs, not principal components.",
    "Trusting everything is the classic misreading — only the grouping itself is reliable."
  ];

  W["Why is t-SNE almost never used to make FEATURES for a downstream model, while PCA constantly is?"] = [
    "'Too precise' isn't the issue; coordinates simply don't exist for new data and are costly to recompute.",
    "PCA is the LINEAR method, and richness of structure isn't why t-SNE is excluded from pipelines.",
    "t-SNE outputs numeric coordinates fine; the problem is they can't be reproduced for unseen points.",
    "Models accept 2-D inputs happily; the barrier is the missing transform for new data."
  ];

  W["What is t-SNE (t-distributed Stochastic Neighbor Embedding)?"] = [
    "Keeping maximum-variance directions linearly is PCA.",
    "A supervised curved-boundary classifier describes something like a kernel SVM.",
    "Growing groups from dense seed points is DBSCAN, a clustering method.",
    "Tuning settings against a validation score is hyperparameter search."
  ];

  W["In t-SNE, what is perplexity?"] = [
    "Step size is the learning rate, a different knob.",
    "Output dimensionality is n_components, not perplexity.",
    "The starting layout comes from the random seed or init choice, not perplexity.",
    "The iteration budget is n_iter; perplexity sets neighbourhood size instead."
  ];

  W["What is nonlinear dimensionality reduction, the family t-SNE belongs to?"] = [
    "Deleting small-valued columns is a crude filter, not a learned mapping — and value size isn't even a sensible criterion.",
    "Weighted sums giving straight axes is the definition of LINEAR reduction like PCA.",
    "Adding polynomial combinations INCREASES dimensions — the opposite of reduction.",
    "Keeping only cluster labels is clustering, which discards geometry rather than mapping it to fewer axes."
  ];

  W["In t-SNE, what is neighbourhood preservation?"] = [
    "Keeping every pairwise distance exact is impossible in 2-D and isn't attempted; only neighbour relations are targeted.",
    "Uniform cluster sizes are a side effect of density equalisation, not the goal.",
    "The map's axes are arbitrary; no alignment with the original features is sought.",
    "The point count never changes; reduction acts on dimensions, not rows."
  ];

  W["In t-SNE, what does the KL-divergence objective measure?"] = [
    "Retained variance is PCA's yardstick; KL divergence compares probability distributions instead.",
    "Distance to cluster centres is a k-means-style quantity; t-SNE has no cluster centres.",
    "The neighbour count is governed by perplexity, not by the objective being minimised.",
    "No classifier is trained; the objective compares similarity distributions, not classification error."
  ];

  W["In t-SNE, what is the learning rate?"] = [
    "The neighbour count is perplexity's job, not the learning rate's.",
    "The output dimension is n_components, a separate setting.",
    "t-SNE uses soft neighbour probabilities, not a hard distance threshold — and a threshold isn't the learning rate anyway.",
    "All the data is used; the learning rate subsamples nothing."
  ];

  W["In t-SNE, what is meant by 'local structure'?"] = [
    "Shape and spacing across the whole map is GLOBAL structure — the part t-SNE sacrifices.",
    "The direction of most variance is PCA's concern, not a neighbourhood relation.",
    "Cluster count is a global summary, not the fine who-neighbours-whom detail.",
    "The drawing axes are arbitrary; local structure is about relationships among nearby points."
  ];

  W["In dimensionality reduction, what is the 'crowding problem' that t-SNE addresses?"] = [
    "Running out of memory is a resource limit, not the geometric squeeze of moderate distances into 2-D.",
    "Overlap from a too-high learning rate is an optimisation failure, not the crowding problem.",
    "Seed-dependent layouts are stochasticity, a separate issue.",
    "Feature scaling is preprocessing; crowding is about lost room in low dimensions, not units."
  ];

  W["In t-SNE, what is early exaggeration?"] = [
    "Starting from a PCA layout is init='pca', a starting-position choice, not early exaggeration.",
    "The exaggeration happens in the FIRST phase, not as extra iterations at the end.",
    "Perplexity stays fixed during the run; exaggeration multiplies attraction, not neighbourhood size.",
    "No noise is added; the trick temporarily scales up the neighbour attractions."
  ];

  W["In t-SNE, what does initialising with init='pca' do?"] = [
    "The neighbour optimisation still runs in full; PCA supplies only the starting layout.",
    "Perplexity is untouched by the init choice; you still set it yourself.",
    "No whitening or variance-equalising occurs; only the initial positions change.",
    "The learning rate is a separate parameter, not set from any principal component."
  ];

  W["UMAP is t-SNE's younger rival and often its replacement. In practice, what are UMAP's headline advantages — and what stays the same?"] = [
    "UMAP's map is still no scale drawing; pairwise distances remain unreliable artefacts.",
    "UMAP definitely has hyperparameters — n_neighbors and min_dist are its main knobs.",
    "UMAP uses a different loss and algorithm (cross-entropy on a fuzzy graph), not t-SNE renamed.",
    "Global arrangement improves but stays approximate; sizes, densities and distances still can't be read literally."
  ];

  W["Two t-SNE runs on the same data: one comes out as a single dense ball, the other as confetti of micro-fragments. Both used extreme learning rates. Which failure belongs to which extreme?"] = [
    "The pairing isn't reversed: tiny steps can't spread the initial huddle (ball); giant steps overshoot (shards).",
    "The rate changes step size, and extreme settings wreck the layout itself — both pictures are artefacts, not structure.",
    "The dense ball is an optimisation failure from tiny steps, not evidence of one true cluster.",
    "The confetti comes from overshooting attractions, not from hundreds of genuine micro-clusters."
  ];

  W["By default t-SNE scatters its initial point positions randomly, and two runs can put the islands in totally different places. What does init='pca' change, and why is it now the recommended default?"] = [
    "It changes the starting positions, not the seed; stability comes from a deterministic informative start, not seed-fixing.",
    "The gradient-descent optimisation still runs fully; the PCA layout is only the launch point.",
    "Perplexity must still be chosen; init doesn't replace that knob.",
    "The objective stays pure t-SNE; nothing morphs toward UMAP's loss."
  ];

  W["The standard recipe for t-SNE on 784-dimensional image data starts with a PCA step down to ~50 dimensions. Why preprocess with the 'rival' method first?"] = [
    "t-SNE runs on hundreds of dimensions without crashing — it's just slower and noisier; the PCA step is an optimisation, not a requirement.",
    "t-SNE itself produces the 2-D output; the ~50-D PCA step isn't what reaches two dimensions.",
    "PCA does no clustering or labelling; it just compresses and denoises the space t-SNE measures distances in.",
    "The step measurably speeds the run and cleans the distances; it's practical engineering, not ritual."
  ];

  W["Your t-SNE plot shows five crisp islands and the team is ready to announce 'five customer types'. What must happen before that becomes a claim rather than a picture?"] = [
    "Crisp islands can be artefacts of perplexity and seed; a single picture validates nothing.",
    "Zooming re-reads the same possibly-artefactual picture; the check must come from outside it.",
    "Recolouring the same embedding still rests on one run's layout; independent evidence is needed.",
    "Averaging coordinates across seeds is meaningless — layouts aren't aligned, so averages smear structure rather than confirm it."
  ];

  W["t-SNE deliberately uses a t-distribution (heavy tails) for the LOW-dimensional map but a Gaussian for the HIGH-dimensional similarities. This asymmetry is the whole trick. What problem does the heavy tail solve?"] = [
    "Convergence speed isn't the motivation; the tail fixes geometric crowding, not a stalling optimiser.",
    "Perplexity must still be chosen; the heavy tail doesn't set neighbourhood size automatically.",
    "The tail doesn't enforce round blobs; cluster shapes remain free.",
    "The cost is essentially unchanged; the tail alters geometry, not storage or compute."
  ];

  W["A researcher runs t-SNE on genomic data and publishes the map as 'the structure of the data'. A statistician objects that t-SNE optimises a specific divergence that BAKES IN a bias. Which, and what does it imply?"] = [
    "t-SNE doesn't minimise squared distance error — that's classical MDS — and its objective is not symmetric or unbiased.",
    "t-SNE doesn't maximise variance, and its between-cluster distances are notoriously unfaithful.",
    "The KL divergence is ASYMMETRIC — that asymmetry is exactly the baked-in local-over-global bias.",
    "t-SNE never sees labels; nothing is optimised against classification accuracy."
  ];

  W["For a real-time dashboard you need to embed NEW data points onto an EXISTING map as they stream in. Standard t-SNE can't do this at all, while UMAP can. What's the fundamental reason?"] = [
    "It's a structural gap, not speed: t-SNE defines no mapping to apply to a new point — positions only exist via joint optimisation.",
    "UMAP's transform optimises new points against its learned graph structure, not a nearest-neighbour coordinate copy.",
    "Both methods are unsupervised; labels have nothing to do with the difference.",
    "There's no batch-of-a-thousand mechanism; standard t-SNE must re-optimise the entire layout for any addition."
  ];

  W["Distilling Topics 15–16: PCA, t-SNE and UMAP all reduce dimensions, but a practitioner reaches for them in different situations. What's the honest three-way decision guide?"] = [
    "They're not interchangeable — t-SNE has no transform for new data and PCA can't unfold nonlinear structure.",
    "UMAP doesn't strictly dominate: PCA remains faster, linearly invertible and more interpretable for pipelines.",
    "None of the three is tied to a data type; the split is linear-vs-nonlinear and pipeline-vs-visualisation, not image/text/tabular.",
    "t-SNE is the WORST pipeline fit (no transform, slow); PCA and UMAP are current workhorses, not legacy."
  ];
})();
