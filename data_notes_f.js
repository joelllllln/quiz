/* Study notes — Unsupervised learning: clustering & dimensionality reduction.
   Read-through revision, tiny chunks, in order. */
(function () {
  window.NOTES = window.NOTES || {};

  window.NOTES["kmeans"] = {
    key: "kmeans", name: "K-Means",
    intro: "An unsupervised method that splits unlabelled data into k round clusters, each represented by its centre (centroid).",
    groups: [
      { h: "The idea", items: [
        { t: "What clustering is", d: "Finding groups in unlabelled data. There is no answer column; the structure you uncover IS the finding." },
        { t: "What a cluster is", d: "A group of points more similar to each other than to the rest of the data. K-means aims for compact, roughly round blobs." },
        { t: "What a centroid is", d: "A cluster's centre of gravity: the average position of its members. Each cluster is summarised by this one point." },
        { t: "Hard assignment", d: "Every point belongs to exactly one cluster — its nearest centroid. No partial or percentage memberships, even on a border." }
      ] },
      { h: "How it learns", items: [
        { t: "Two repeating steps", d: "K-means alternates an assignment step and an update step until nothing moves." },
        { t: "Assignment step", d: "Hold centroids fixed; attach each point to its nearest centroid. This carves the data into k groups.", f: "point → argmin distance to k centroids" },
        { t: "Update step", d: "Hold assignments fixed; move each centroid to the mean position of the points that just joined it." },
        { t: "Convergence", d: "Assign, update, repeat. When no point changes cluster, the centroids stop moving and the algorithm has converged." },
        { t: "Inertia", d: "Total squared distance from every point to its own centroid. K-means shrinks it each step; lower means tighter clusters.", f: "inertia = Σ (point − its centroid)²" }
      ] },
      { h: "Knobs that matter", items: [
        { t: "k", d: "How many clusters to find. YOU must choose it — the algorithm never volunteers a number." },
        { t: "k-means++ init", d: "The standard smart start: spread the initial centroids far apart, so the run rarely gets stuck in a bad arrangement." },
        { t: "n_init (restarts)", d: "Run several times from different starts and keep the lowest-inertia result, since one run can land in a poor local optimum." }
      ] },
      { h: "Choosing k", items: [
        { t: "Why inertia can't pick k", d: "Inertia always falls as k grows (more centres, smaller distances), so it can never choose k on its own." },
        { t: "The elbow", d: "Plot inertia for k = 1…8 and look for the bend where extra clusters stop paying off. That kink suggests a sensible k." },
        { t: "Silhouette score", d: "Compares each point's own-cluster distance with its nearest neighbouring cluster. It peaks at a good k and rewards clean separation." }
      ] },
      { h: "Preparation & pitfalls", items: [
        { t: "Always scale first", d: "Distance sums every feature. A big-range feature (income in pounds) swamps a small one (age), so clusters reflect it alone." },
        { t: "Unscaled = one feature rules", d: "Cluster on age (18–70) and income (£15k–£150k) unscaled and income silently decides every assignment." },
        { t: "Non-round shapes fail", d: "Run k=2 on two crescent moons and it slices straight across both. K-means assumes round blobs around a centre." },
        { t: "Categorical features", d: "One-hot encoding makes distances meaningless, so clusters look arbitrary. K-means expects continuous numeric features." },
        { t: "Random starts vary", d: "Different random seeds can give different, sometimes worse answers — another reason to use k-means++ and several restarts." }
      ] },
      { h: "When to use it", items: [
        { t: "Good fit", d: "Fast, simple exploration when clusters are roughly round, similar-sized, and features are scaled numerics." },
        { t: "MiniBatchKMeans", d: "For millions of rows, it uses small random batches to finish in minutes with near-identical clusters." },
        { t: "Colour quantisation", d: "Squeezing a photo's millions of colours down to k representative ones — vector quantisation is just k-means on pixels." },
        { t: "Inside supervised pipelines", d: "Fit clusters, then feed each row's cluster id (or distances) as new features to a classifier or regressor." }
      ] }
    ]
  };

  window.NOTES["hier"] = {
    key: "hier", name: "Hierarchical Clustering",
    intro: "Builds a full tree of nested clusters by repeatedly merging the closest pair, so you pick the number of clusters after fitting.",
    groups: [
      { h: "The idea", items: [
        { t: "Agglomerative = bottom-up", d: "Every point starts alone; the two closest clusters merge, again and again, until a single cluster remains." },
        { t: "The base ruler", d: "It first needs a distance between two points — for numeric features, the straight-line (Euclidean) distance.", f: "Euclidean = straight-line gap across all features" },
        { t: "No k up front", d: "Unlike k-means, you never pre-set the number of clusters. The whole tree is built first; you choose k afterwards." },
        { t: "The divisive alternative", d: "The mirror image: start with everything in one cluster and repeatedly split. Agglomerative (merging) is the common choice." }
      ] },
      { h: "Linkage: distance between clusters", items: [
        { t: "Why linkage is needed", d: "Clusters are groups, not points, so you must define the distance between two groups. That rule is called linkage." },
        { t: "Single linkage", d: "Distance = the CLOSEST pair of points across the two clusters. Can chain points into long straggly clusters." },
        { t: "Complete linkage", d: "Distance = the FARTHEST pair. Favours tight, compact clusters and resists chaining." },
        { t: "Average linkage", d: "Distance = the average over all cross-cluster point pairs — a compromise between single and complete." },
        { t: "Ward linkage", d: "Merge the pair whose union least increases within-cluster spread — the same objective k-means chases. The sklearn default." }
      ] },
      { h: "The dendrogram", items: [
        { t: "What it is", d: "The tree recording every merge and the height at which it happened. Not one clustering, but ALL of them at once." },
        { t: "Merge height", d: "How far apart two clusters were when joined. Low merges are confident; tall merges force dissimilar groups together." },
        { t: "Every grouping in one tree", d: "Because it holds all granularities, one fit gives you every possible k without re-running anything." }
      ] },
      { h: "Reading the result", items: [
        { t: "Cutting the tree", d: "Draw a horizontal line at some height; each branch still separate below it becomes a cluster. Height sets k." },
        { t: "The tallest gap", d: "A long stretch of height where nothing merges signals naturally separated groups. Cut inside it for the most defensible k." },
        { t: "Honest answer on k", d: "There is no single true number of clusters — it depends where you cut. The tree offers many, you justify one." }
      ] },
      { h: "Options & scaling", items: [
        { t: "Scale features first", d: "Distances add up each feature, so a wide-range feature (age 0–100) dominates a narrow one (height 0–2). Rescale for fairness." },
        { t: "Connectivity constraint", d: "An optional neighbour-graph rule: clusters may only merge if they actually touch, so they grow along the data's shape." },
        { t: "Effect of constraints", d: "It prevents distant blobs merging and follows curved manifolds, at the cost of ignoring some raw distances." }
      ] },
      { h: "Cost & when to use it", items: [
        { t: "Roughly n² cost", d: "It needs the full pairwise-distance picture, so memory and time grow with the square of the number of points." },
        { t: "Why k-means on big data", d: "That n² cost makes hierarchical clustering slow on large datasets; k-means scales far better." },
        { t: "Good fit", d: "Smaller datasets where you want the full nested structure, a dendrogram to inspect, or freedom to choose k afterwards." },
        { t: "Reading vs deciding", d: "Use it to explore hierarchy and separation; commit to a cut only after inspecting merge heights and the tallest gap." }
      ] }
    ]
  };

  window.NOTES["dbscan"] = {
    key: "dbscan", name: "DBSCAN",
    intro: "A density-based clustering method that finds crowds of any shape, decides the cluster count itself, and can label sparse points as noise.",
    groups: [
      { h: "The idea", items: [
        { t: "Density-based", d: "A cluster is a CROWDED region, whatever its shape. The sparse space between crowds is just empty space." },
        { t: "Arbitrary shapes", d: "Clusters grow by chaining dense neighbour to dense neighbour, so they can trace crescents, rings, or spirals." },
        { t: "No k needed", d: "Clusters emerge wherever density supports them. The number of clusters is an OUTPUT, never an input." },
        { t: "It can say nothing", d: "DBSCAN's superpower: a point reachable from no crowd is labelled noise — it is allowed to belong to nothing." }
      ] },
      { h: "The two knobs", items: [
        { t: "eps (radius)", d: "The neighbourhood radius: within this distance you count as 'near me'. It sets what walking distance means." },
        { t: "min_samples (minPts)", d: "How many points must sit within eps for a spot to count as crowded. With eps, this defines density." },
        { t: "Together they define density", d: "Wherever at least min_samples points fall inside eps, DBSCAN treats the region as dense enough to grow a cluster." }
      ] },
      { h: "The three point roles", items: [
        { t: "Core point", d: "Has at least min_samples neighbours within eps — standing in a crowd, so it can extend the cluster." },
        { t: "Border point", d: "Inside a core point's eps neighbourhood but not crowded itself. It joins the cluster's edge but can't recruit." },
        { t: "Noise point", d: "Reachable from no crowd; labelled −1. Not an error but a feature — these are the outliers." },
        { t: "How a cluster grows", d: "Start at a core point, absorb everything within eps, then repeat from each new core point until it stops spreading." }
      ] },
      { h: "Choosing eps", items: [
        { t: "eps is hard to guess", d: "One number applied to all distances — too small shreds clusters into noise, too large merges everything into one." },
        { t: "k-distance plot", d: "Sort every point's distance to its k-th nearest neighbour and plot it. The elbow reads a sensible eps off the data." },
        { t: "Growing eps", d: "Tiny eps: everything is noise. Huge eps: everything is one cluster. The interesting structure lives between." }
      ] },
      { h: "Weaknesses & gotchas", items: [
        { t: "Varying density defeats it", d: "One dense and one sparse cluster share a dataset: no single eps fits both, so one shreds while the other merges." },
        { t: "Scale features first", d: "eps is one radius over all features, so an unscaled big-range feature (income) dominates the neighbourhood entirely." },
        { t: "Border-point order", d: "A border point reachable from two clusters is assigned by processing order, so shuffling rows can swap a few labels." },
        { t: "Naive cost is O(n²)", d: "Checking who is within eps of everyone is quadratic; spatial indexes (KD-tree, ball-tree) speed it up in practice." }
      ] },
      { h: "When to use it", items: [
        { t: "Good fit", d: "Odd-shaped clusters, unknown cluster count, and data with genuine outliers you want flagged rather than forced into a group." },
        { t: "Best when autonomy helps", d: "Most valuable when you truly don't know how many clusters exist and don't want to pre-commit to k." },
        { t: "Poor fit", d: "Clusters of very different densities, or high-dimensional data where distances flatten and eps loses meaning." }
      ] }
    ]
  };

  window.NOTES["pca"] = {
    key: "pca", name: "PCA",
    intro: "A linear method that finds the directions of greatest spread, so you can compress or visualise many features while losing as little as possible.",
    groups: [
      { h: "The idea", items: [
        { t: "Dimensions = features", d: "One feature is one axis. A 50-column dataset lives in 50-dimensional space — unvisualisable, but the maths copes." },
        { t: "Unsupervised", d: "PCA ignores the target labels and reads only the features. It looks for spread, not for what predicts the answer." },
        { t: "Projection", d: "Flattening points onto a chosen axis, like casting shadows. Off-axis information is lost; pick the axis that loses least." },
        { t: "Variance = information", d: "Spread along a direction is information. An axis where every point projects to the same spot tells you nothing." }
      ] },
      { h: "Principal components", items: [
        { t: "PC1", d: "The single direction of greatest variance — the best line to flatten the data onto, keeping the most spread." },
        { t: "PC2 and beyond", d: "Each later component takes the most remaining variance while staying at right angles to the earlier ones.", f: "each PC ⊥ all earlier PCs" },
        { t: "Loadings", d: "A component's recipe: how much of each original feature it blends. Same-sign block = a shared factor; mixed signs = a contrast." },
        { t: "Reading loadings", d: "Loadings of height 0.52, weight 0.55, arm span 0.50 all one sign means PC1 is an overall 'size' factor." }
      ] },
      { h: "How much to keep", items: [
        { t: "Explained variance ratio", d: "The share of total spread each component carries. 'PC1: 62%' means one axis holds nearly two-thirds of the story." },
        { t: "Scree plot", d: "Explained variance per component, plotted. The elbow suggests how many components are worth keeping." },
        { t: "Choosing the count", d: "Keep enough components to reach a target cumulative variance (say 90–95%), then drop the rest." },
        { t: "Why throw dimensions away", d: "Fewer inputs mean less noise, faster models, easier plots, and relief from the curse of dimensionality." }
      ] },
      { h: "Scaling & pitfalls", items: [
        { t: "Scale features first", d: "PCA chases variance, so a large-unit feature (income in tens of thousands) hijacks PC1 over a 1–10 satisfaction score." },
        { t: "Only linear structure", d: "PCA finds straight-line directions. Data along a curved arc (a bent wire) needs a nonlinear method instead." },
        { t: "Variance depends on correlation", d: "PC1 grabs 99.5% when features are highly correlated (redundant) and only 50% when they carry independent information." },
        { t: "Fit on training only", d: "Fit PCA on the training set and reuse it on the test set. Fitting on everything leaks information — the familiar rule." }
      ] },
      { h: "Selection vs extraction", items: [
        { t: "Feature selection", d: "Keep a subset of the original columns. Interpretable, since surviving features keep their real-world meaning." },
        { t: "Feature extraction", d: "PCA builds new combined axes from all features. More compact, but the new axes are blends, harder to name." },
        { t: "The trade-off", d: "Extraction usually captures more variance in fewer dimensions; selection preserves interpretability." }
      ] },
      { h: "Anomaly detection & scaling up", items: [
        { t: "Reconstruction error", d: "Compress with few components, rebuild, and measure the damage. Normal points survive; anomalies don't.", f: "error = ‖original − reconstruction‖" },
        { t: "Fraud use case", d: "Fit PCA on normal transactions; incoming rows with high reconstruction error don't fit the pattern and get flagged." },
        { t: "IncrementalPCA", d: "For 10M rows that won't fit in memory, it fits PCA in mini-batches instead of all at once." },
        { t: "Randomised / sparse solvers", d: "For very wide data (20k features), approximate solvers find the top components far faster than full decomposition." }
      ] }
    ]
  };

  window.NOTES["tsne"] = {
    key: "tsne", name: "t-SNE",
    intro: "A nonlinear method that lays high-dimensional data out in 2-D so similar items land near each other — a map for the eyes, not a measurement.",
    groups: [
      { h: "The idea", items: [
        { t: "What reduction is", d: "Turning many features into a few, keeping what matters. t-SNE and PCA both do dimensionality reduction." },
        { t: "Embedding", d: "A low-dimensional (usually 2-D) arrangement built so similar high-dimensional points sit close. A map, not a measurement." },
        { t: "Nonlinear", d: "Unlike PCA's straight-line axes, t-SNE can unfold curved and tangled structure that no single flat projection captures." },
        { t: "Preserves local neighbourhoods", d: "What it actually protects is WHO IS NEAR WHOM. Sizes, gaps, and positions are all negotiable." }
      ] },
      { h: "The knobs", items: [
        { t: "Perplexity", d: "Roughly how many neighbours each point tries to keep close. Small = fine local detail (and fake islands); large = broader structure." },
        { t: "Perplexity extremes", d: "Too low can shatter data into confetti of micro-fragments; too high can smear it into a single dense ball." },
        { t: "Learning rate", d: "The step size of the layout optimisation. Too small and everything stays in a ball; too large and clusters shatter. 'auto' behaves." },
        { t: "init='pca'", d: "Start the layout from PCA coordinates instead of randomness — re-runs agree and the islands inherit real geometry." }
      ] },
      { h: "Reading the map", items: [
        { t: "Local, not global", d: "t-SNE nails cluster membership (local) and shrugs at which island is near which (global). Read it accordingly." },
        { t: "Don't read cluster size", d: "A cluster looking twice as big means nothing — t-SNE does not preserve size." },
        { t: "Don't read density", d: "How tightly packed an island looks is an artefact of the layout, not a fact about the data." },
        { t: "Don't read between-cluster distance", d: "How far apart two islands sit tells you nothing. These three — size, density, distance — are the cardinal sins." }
      ] },
      { h: "Stability", items: [
        { t: "Runs differ", d: "Random initialisation means two runs can place islands very differently. Treat any one picture as one view, not truth." },
        { t: "Reproducibility", d: "Fix the random seed and use init='pca' so re-runs agree and the arrangement is repeatable." },
        { t: "Verify before announcing", d: "Five crisp islands aren't automatically five real types — re-run, vary perplexity, and check against the raw features first." }
      ] },
      { h: "Cost & pipeline", items: [
        { t: "Scales poorly", d: "Running time grows steeply with the number of points, so t-SNE is slow on very large datasets." },
        { t: "PCA pre-step", d: "The standard recipe reduces, say, 784-dim images to ~50 dims with PCA first — cutting noise and speeding t-SNE up." },
        { t: "Not for features", d: "t-SNE gives no reusable transform for new points and distorts distances, so it's almost never used to make model features." },
        { t: "PCA makes features, t-SNE doesn't", d: "PCA yields a stable, reusable projection for downstream models; t-SNE is for visualisation only." }
      ] },
      { h: "When to use it & UMAP", items: [
        { t: "Good fit", d: "Exploring and visualising cluster structure in high-dimensional data, when you only need a picture, not coordinates." },
        { t: "UMAP", d: "The modern cousin: much faster, better global layout, and it can place new points on an existing map." },
        { t: "Same caveats", d: "UMAP still shouldn't be read for literal distances, size, or density — treat both as maps, not measurements." }
      ] }
    ]
  };
})();
