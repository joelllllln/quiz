/* More definitions: k-Means, Hierarchical clustering, DBSCAN. Standard glossary terms, each
   DEFS-tagged with a reveal so it flows into the Definitions filter, flashcards and read+recall.
   Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function def(qk, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1;
  }

  /* ---------------- k-Means (kmeans1) — 10 ---------------- */

  def("kmeans1",
    "What is the between-cluster sum of squares (BCSS) in k-means?",
    "The variance between clusters: squared distances of centroids from the overall mean.",
    ["The total squared distance from every point to the single grand mean of the whole dataset before any clustering is done.",
     "The sum over all clusters of squared distances from each point to its own assigned centroid, minimised each round.",
     "The average squared distance between every pair of centroids, used to decide when two clusters should merge.",
     "The squared distance from each point to the nearest centroid of a different cluster than its own."],
    "Between-cluster sum of squares (BCSS)",
    "BCSS measures separation: how far the clusters' centroids sit from the global mean. Total variance = BCSS + WCSS, so maximising BCSS is the same as minimising within-cluster inertia.",
    "It is a measure of how spread apart the clusters are. Since total spread is fixed, pushing clusters apart (high BCSS) is the same as making each cluster tight.",
    "It tells you how well-separated the groups are. Bigger means the clusters sit further apart from each other.")

  def("kmeans1",
    "What is the convergence criterion for k-means?",
    "Stop when assignments (and centroids) stop changing between iterations.",
    ["Stop as soon as the inertia increases relative to the previous iteration, since the objective is guaranteed to rise over time.",
     "Stop when the number of clusters k equals the number of distinct points remaining in the largest cluster of the data.",
     "Stop once every point lies exactly on top of its assigned centroid, which for real data happens after a few passes.",
     "Stop when the silhouette score first exceeds a fixed user-chosen threshold such as one half."],
    "Convergence criterion (centroid stability)",
    "Lloyd's iteration alternates assignment and update; it converges when no point changes cluster (equivalently, centroids no longer move), or when inertia's decrease falls below a tolerance. Inertia never increases, so this always terminates.",
    "You keep repeating the two steps until nothing moves any more. When the labels stop changing, the algorithm is done.",
    "It's finished when running another round wouldn't change which point belongs to which group.")

  def("kmeans1",
    "What is the empty cluster problem in k-means?",
    "A cluster ends up with no points assigned, leaving its centroid undefined.",
    ["A situation where two centroids drift to the exact same location, so the two clusters become impossible to tell apart from each other.",
     "A cluster that contains only outliers and therefore has an inertia value far larger than all of the other clusters combined.",
     "A cluster whose points all share identical feature values, making its within-cluster sum of squares equal to exactly zero.",
     "A cluster whose centroid lies outside the convex hull of the entire dataset after the very first assignment step."],
    "Empty cluster problem",
    "During iteration a centroid can end up being nearest to no points, so its mean is undefined. Implementations handle it by reinitialising that centroid, often to the point furthest from its current cluster.",
    "Sometimes a cluster loses all its members and has nobody left to average. The algorithm then has to reseed that centroid somewhere useful.",
    "It's when a group ends up empty, so there's nothing to compute its centre from.")

  def("kmeans1",
    "What does 'distortion' refer to as the k-means objective?",
    "The total within-cluster squared distance that k-means minimises.",
    ["The gap between the true underlying cluster labels and the labels k-means produces, measured with the adjusted Rand index.",
     "The amount by which centroids move on each iteration, summed across all clusters until the algorithm finally converges.",
     "The distance a point must travel to reach the second-nearest centroid rather than its own assigned nearest one.",
     "The proportion of points that are reassigned to a different cluster between two consecutive iterations of the loop."],
    "Distortion (k-means objective)",
    "Distortion is another name for the objective k-means minimises: the sum of squared distances from points to their assigned centroids (the inertia / WCSS). Lower distortion means tighter clusters.",
    "It's just the quantity k-means tries to make as small as possible: how far points sit from their own centre.",
    "Distortion is the total squared error of the clustering; smaller is better.")

  def("kmeans1",
    "Why is finding the globally optimal k-means clustering NP-hard?",
    "The number of ways to partition points into k clusters grows combinatorially.",
    ["Because computing the distance between two points in high dimensions requires exponential time as the number of features increases.",
     "Because the objective function has no derivative, so gradient-based optimisation cannot be applied to it at all in practice.",
     "Because each iteration of Lloyd's algorithm must sort the entire dataset, which costs more time than any polynomial bound allows.",
     "Because the optimal number of clusters k must itself be searched over every integer value from one up to the sample size."],
    "NP-hardness of optimal k-means",
    "Exactly minimising the objective over all possible assignments is NP-hard, because the space of partitions is astronomically large. Lloyd's algorithm is only a fast heuristic that reaches a local optimum, not the guaranteed global one.",
    "There are far too many ways to split the points to check them all, so we settle for a good-enough answer instead of the perfect one.",
    "Finding the truly best grouping is computationally hopeless, so the algorithm just aims for a decent local solution.")

  def("kmeans1",
    "What is Forgy initialisation in k-means?",
    "Picking k actual data points at random to be the initial centroids.",
    ["Assigning every data point to a random cluster first and then computing the mean of each of those random groups as the starts.",
     "Spacing the initial centroids evenly along the first principal component of the data to spread them out from the beginning.",
     "Choosing the k points that are mutually furthest apart from one another to guarantee well-separated starting centroids.",
     "Running the algorithm many times and averaging together the centroids found across all of the separate restarts."],
    "Forgy initialisation",
    "The Forgy method seeds k-means by selecting k of the observations at random as the starting centroids. The 'random partition' method instead assigns points to random clusters first; both are weaker than k-means++.",
    "It just grabs k of your actual data points at random and uses them as the first centres.",
    "One simple way to start: pick k real points at random to be the initial cluster centres.")

  def("kmeans1",
    "What is the gap statistic used for in clustering?",
    "Choosing k by comparing inertia to that expected under a no-cluster reference.",
    ["Measuring the difference in inertia between the best and worst of several random restarts of the k-means algorithm.",
     "Quantifying the empty space between adjacent Voronoi cells so that overlapping clusters can be flagged and merged.",
     "Comparing the silhouette score of k-means against the silhouette score of hierarchical clustering on the same data.",
     "Estimating how far each cluster centroid has moved between the first and the final iteration of the fitting loop."],
    "Gap statistic",
    "The gap statistic compares the within-cluster dispersion for each k against the dispersion expected from a uniformly random (null) reference distribution. The k with the largest gap over the reference is chosen.",
    "It's a way to pick how many clusters by asking where real data clumps much more than random noise would.",
    "It helps choose k by seeing which number of clusters beats what you'd get from featureless random data by the most.")

  def("kmeans1",
    "What does the Davies-Bouldin index measure for a clustering?",
    "Average similarity of each cluster to its most similar other cluster (lower is better).",
    ["The ratio of the between-cluster variance to the within-cluster variance across the whole clustering, where higher scores are better.",
     "The average width of the silhouette computed over every single point in the dataset after the clusters are formed.",
     "The number of points that would change cluster if k were increased by one, normalised by the total sample size.",
     "The largest distance from any point to its assigned centroid divided by the smallest distance between two centroids."],
    "Davies-Bouldin index",
    "The Davies-Bouldin index averages, over clusters, the worst-case ratio of within-cluster scatter to between-cluster separation. Lower values indicate tight, well-separated clusters; it needs no ground-truth labels.",
    "It scores a clustering by how much each group overlaps its nearest neighbour group; smaller is tidier.",
    "A lower Davies-Bouldin number means clusters are compact and far apart from each other.")

  def("kmeans1",
    "What does the Calinski-Harabasz index measure?",
    "The ratio of between-cluster to within-cluster dispersion (higher is better).",
    ["The average squared distance from each point to the centroid of the second-closest cluster rather than its own cluster.",
     "The probability that two randomly chosen points from the same true class are placed into the same predicted cluster.",
     "The total number of iterations Lloyd's algorithm needs before the centroid positions finally stop moving at all.",
     "The proportion of the total dataset variance that is left unexplained once the clustering has been completed fully."],
    "Calinski-Harabasz index",
    "Also called the variance-ratio criterion, it divides between-cluster dispersion by within-cluster dispersion (with a degrees-of-freedom adjustment for k and n). Higher means denser, better-separated clusters.",
    "It's a score that goes up when clusters are tight inside and spread far apart; bigger is better.",
    "A higher Calinski-Harabasz value means well-separated, compact clusters.")

  def("kmeans1",
    "What is k-medoids (PAM)?",
    "A k-means variant whose cluster centres are actual data points (medoids).",
    ["A clustering method that allows each point to belong to several clusters at once with fractional membership weights summing to one.",
     "A version of k-means that replaces Euclidean distance with cosine similarity to better handle high-dimensional sparse text data.",
     "A hierarchical procedure that repeatedly merges the two closest medoids until the desired number of clusters remains.",
     "An algorithm that chooses k by adding one medoid at a time until the drop in inertia becomes negligible."],
    "k-medoids (PAM)",
    "k-medoids (Partitioning Around Medoids) uses real observations as cluster centres and minimises total distance to them. Because medoids are actual points and it can use any distance, it is more robust to outliers than k-means.",
    "Like k-means, but the 'centre' of each cluster must be one of your real data points, which makes it steadier against outliers.",
    "It groups data around representative real points instead of computed averages, so weird outliers hurt it less.")

  /* ---------------- Hierarchical clustering (hier1) — 12 ---------------- */

  def("hier1",
    "What is centroid linkage in hierarchical clustering?",
    "Merging clusters by the distance between their centroids (mean points).",
    ["Merging the two clusters whose closest pair of individual points are nearer than any other cross-cluster pair in the data.",
     "Merging the two clusters whose furthest pair of individual points are as close together as possible across the whole set.",
     "Merging clusters so that the increase in total within-cluster variance caused by the merge is kept to a minimum each step.",
     "Merging clusters based on the average distance computed over every pair of points drawn from the two clusters."],
    "Centroid linkage",
    "Centroid linkage defines the distance between two clusters as the distance between their centroids. Unlike single/complete/average linkage, it can produce non-monotonic dendrograms (inversions) because a merged centroid may sit closer than earlier merges.",
    "The gap between two groups is just the distance between their average points. Merge the pair of centres that are closest.",
    "It measures cluster distance centre-to-centre and joins the two whose centres are nearest.")

  def("hier1",
    "What is median linkage (WPGMC) in hierarchical clustering?",
    "Centroid linkage where the merged centre is the midpoint of the two merged clusters.",
    ["Linkage that uses the median rather than the mean of each cluster's points as the representative location for measuring distances.",
     "Linkage that joins the pair of clusters whose combined within-cluster sum of squared distances is the smallest available.",
     "Linkage that takes the median of all pairwise distances between the two clusters as the distance separating them entirely.",
     "Linkage that weights each cluster by its size before averaging the pairwise distances between their member points."],
    "Median linkage (WPGMC)",
    "Median (weighted centroid) linkage, WPGMC, updates the merged cluster's representative point as the unweighted midpoint of the two previous centroids, so cluster size does not bias the new centre. Like centroid linkage it can show inversions.",
    "It's centroid linkage that ignores how big each cluster is, placing the new centre halfway between the two old centres.",
    "A linkage rule where the merged group's centre is just the midpoint of the two groups that joined.")

  def("hier1",
    "What is weighted average linkage (WPGMA)?",
    "Average linkage where each existing cluster counts equally regardless of size.",
    ["Average linkage in which larger clusters contribute proportionally more to the computed distance between the two clusters.",
     "Linkage that weights each pairwise distance by the inverse of the distance itself before taking the overall average value.",
     "Linkage that uses the single closest pair of points but weights it by the total number of points across both clusters.",
     "Linkage that computes a variance-weighted mean of the two centroids to decide which pair of clusters to merge next."],
    "Weighted average linkage (WPGMA)",
    "WPGMA computes the distance to a newly merged cluster as the simple mean of the distances to its two components, giving each component equal weight even if one held far more points. UPGMA (unweighted) instead weights by cluster size.",
    "When two groups merge, the new distance is just the average of the two old distances, no matter how many points each held.",
    "An average-linkage variant that treats each existing cluster as equally important regardless of its point count.")

  def("hier1",
    "What is the chaining effect in single-linkage clustering?",
    "A tendency to form long, straggly clusters linked by chains of near points.",
    ["A tendency to split one natural cluster into many tiny fragments because the nearest-neighbour distance is used at every step.",
     "A tendency to merge clusters in a strictly monotonic order so that every merge height exceeds all previous merge heights.",
     "A tendency to produce perfectly compact, spherical clusters because only the closest pair of points ever drives a merge.",
     "A tendency for the dendrogram to become perfectly balanced with equal numbers of points on each side of every split."],
    "Chaining effect",
    "Because single linkage merges on the single closest pair, a sequence of points spaced closely together can 'chain' two otherwise-distinct clusters into one long, thin cluster. It is single linkage's main weakness.",
    "Single linkage can string points together like beads, joining separate blobs just because a few points bridge the gap between them.",
    "It's when single linkage glues distinct groups into one long snake because stepping-stone points connect them.")

  def("hier1",
    "What is a dendrogram inversion (non-monotonic merge)?",
    "A merge that occurs at a lower height than an earlier merge, crossing the tree.",
    ["A merge in which two clusters of exactly equal size are joined, producing a perfectly symmetric branch in the diagram.",
     "A rearrangement of the leaf order that keeps the tree structure the same but flips which branch is drawn on the left.",
     "A merge that combines a singleton point with an existing large cluster rather than joining two large clusters together.",
     "A situation where the tree is cut at a height that yields more clusters than the user originally intended to obtain."],
    "Dendrogram inversion",
    "An inversion occurs when a cluster forms at a height below one of the merges that created its parts, so merge heights are not monotonically increasing. Centroid and median linkage can produce them; single/complete/average/Ward cannot.",
    "It's when the tree folds back on itself: a later join happens lower down than an earlier one, which looks tangled.",
    "A weird dendrogram where a merge sits below an earlier merge instead of always going up.")

  def("hier1",
    "What is the proximity (distance) matrix in hierarchical clustering?",
    "The table of pairwise distances between all points, used to drive merges.",
    ["A square table recording, for every pair of clusters, the height at which they were eventually merged in the dendrogram.",
     "A table listing each point's distance only to its single nearest neighbour, updated after every merge that takes place.",
     "A matrix whose entries give the change in total within-cluster variance that each candidate merge would produce next.",
     "A rectangular table of the coordinates of every point after they have been projected onto their principal components."],
    "Proximity (distance) matrix",
    "Hierarchical clustering starts from an n-by-n matrix of pairwise distances (or similarities). Each merge collapses two rows/columns into one, updated by the linkage rule, until a single cluster remains.",
    "It's the big grid of how far every point is from every other point; the algorithm reads and shrinks it as it merges.",
    "A table of all point-to-point distances that the clustering keeps updating each time two groups join.")

  def("hier1",
    "What is the nearest-neighbour chain algorithm?",
    "An efficient way to build the same linkage clustering by following mutual nearest neighbours.",
    ["An algorithm that repeatedly merges the single globally closest pair of points, rescanning the full distance matrix each time.",
     "An algorithm that assigns each point to the cluster of its nearest labelled neighbour, similar to k-nearest-neighbour voting.",
     "An algorithm that grows one cluster at a time by adding the point that least increases the within-cluster variance measure.",
     "An algorithm that orders the dendrogram leaves so that adjacent leaves are always as similar as the tree structure allows."],
    "Nearest-neighbour chain algorithm",
    "The NN-chain algorithm follows a path of clusters, each the nearest neighbour of the last, until it finds a mutual (reciprocal) nearest pair, which it merges. For linkages satisfying reducibility it gives the same result in O(n^2) time without needing to store the whole priority queue.",
    "It's a faster recipe for the same tree: walk from cluster to nearest cluster until two point at each other, then merge them.",
    "A speed trick that builds the same hierarchy by chasing nearest neighbours until a pair mutually agrees.")

  def("hier1",
    "What is the ultrametric property of a dendrogram?",
    "Cophenetic distances satisfy d(x,z) <= max(d(x,y), d(y,z)) for all points.",
    ["The property that the distance between any two points equals the straight-line Euclidean distance in the original feature space.",
     "The property that every merge in the tree happens at a strictly greater height than all of the merges beneath it.",
     "The property that the sum of the two shorter sides of any triangle of points always exceeds the longest side of it.",
     "The property that cutting the tree at any height always yields clusters of roughly equal size across the whole dataset."],
    "Ultrametric property",
    "The cophenetic (tree) distances induced by a monotonic dendrogram form an ultrametric: they obey the strong triangle inequality d(x,z) <= max(d(x,y), d(y,z)). This is a stronger condition than the ordinary triangle inequality.",
    "It's a special rule the tree's implied distances obey, tighter than the usual triangle rule between three points.",
    "A dendrogram's merge-height distances follow an extra-strict triangle rule called being ultrametric.")

  def("hier1",
    "What are 'flat clusters' obtained from a hierarchy?",
    "The concrete cluster labels you get by cutting the dendrogram at some level.",
    ["The clusters that result when every point is treated as its own singleton before any of the merging has begun at all.",
     "The clusters formed only by single linkage, which tend to be flat and elongated rather than compact and rounded.",
     "The set of all intermediate clusters that ever appear at any height while the dendrogram is being constructed bottom-up.",
     "The clusters produced after the leaf ordering has been optimised so that adjacent leaves are maximally similar to each other."],
    "Flat clusters (fcluster)",
    "A dendrogram encodes clusterings at every level; extracting one usable partition (e.g. via scipy's fcluster, by a distance threshold or a target count) yields 'flat' clusters, a single non-nested set of labels.",
    "The tree shows all possible groupings at once; picking one cut turns it into an ordinary flat list of cluster labels.",
    "Flat clusters are the plain group labels you read off after slicing the tree at a chosen height.")

  def("hier1",
    "How does agglomerative clustering begin?",
    "With every point placed in its own singleton cluster, so the first step merges the two closest points into a pair.",
    ["With all of the points already placed together inside one single all-encompassing cluster that is then split apart repeatedly.",
     "With k randomly chosen points serving as the initial cluster centres, exactly as the k-means algorithm does at its start.",
     "With the two closest points already merged, so the first proper step joins a third point onto that initial pair of points.",
     "With the points sorted along their first principal component so that neighbouring points can be merged in order quickly."],
    "Singleton initialisation",
    "Agglomerative (bottom-up) clustering starts with n singleton clusters, one per point, then repeatedly merges the two closest until one cluster remains. This is the opposite of divisive clustering, which starts from one big cluster.",
    "Each point starts off alone in its own cluster, and then the closest ones keep pairing up from there.",
    "It begins with everyone in a group of one, then merges the nearest pairs step by step.")

  def("hier1",
    "How many merges does agglomerative clustering of n points perform?",
    "Exactly n - 1 merges to go from n singletons to one cluster.",
    ["Exactly n merges, because the final all-encompassing cluster must also be merged with the empty background cluster.",
     "Roughly n squared merges, since every pair of points is considered for merging at each of the successive rounds.",
     "As many merges as the chosen number of clusters k, after which the remaining unmerged clusters are simply returned.",
     "A number that depends on the linkage rule used, ranging from n over two up to n depending on cluster shapes."],
    "Number of merges (n - 1)",
    "Starting from n singletons and ending with one cluster, each merge reduces the cluster count by exactly one, so the full dendrogram takes n - 1 merges regardless of the linkage or data.",
    "To get from n lonely points down to one big group, you join two at a time, which takes n minus one joins.",
    "It always makes n-1 merges: each merge removes one cluster until just one is left.")

  def("hier1",
    "What is leaf ordering in a dendrogram?",
    "The left-to-right arrangement of the tree's leaves along the baseline.",
    ["The height at which each pair of leaves is merged together, which fixes how tall each branch of the tree is drawn.",
     "The order in which the algorithm decides to merge clusters, from the closest pair up to the final root of the tree.",
     "The assignment of a numeric cluster label to each leaf after the dendrogram has been cut at a particular height level.",
     "The choice of which linkage criterion determines the distance between clusters as the tree is being constructed upward."],
    "Leaf ordering",
    "A dendrogram's branches can be flipped at any internal node without changing the clustering, so the leaf order is not unique. Optimal-leaf-ordering algorithms choose flips that place similar leaves adjacent, improving heatmap readability.",
    "It's just how the points are lined up along the bottom of the tree; you can swap branches without changing the grouping.",
    "The order leaves appear left to right; branches can flip freely, so a nice ordering just makes the picture easier to read.")

  /* ---------------- DBSCAN (dbscan1) — 12 ---------------- */

  def("dbscan1",
    "What is a region query (neighbourhood query) in DBSCAN?",
    "Finding all of the points that lie within distance eps of a given point — the neighbourhood lookup DBSCAN runs for every point.",
    ["Finding the single nearest neighbour of a point so that its distance can be plotted on the sorted k-distance graph.",
     "Counting how many clusters currently contain at least one point lying within the eps radius of the query point given.",
     "Retrieving the points that are density-reachable from a point through an unbroken chain of core points in the cluster.",
     "Computing the average distance from the query point to every other point in the entire dataset before clustering begins."],
    "Region query",
    "The core operation of DBSCAN is the region (range) query: retrieving every point inside the eps-ball around a given point. If that set has at least min_samples members, the point is a core point. Spatial indexes speed these queries up.",
    "It's the basic lookup DBSCAN does over and over: who is within distance eps of this point?",
    "A region query just asks which points sit inside the eps circle around a given point.")

  def("dbscan1",
    "What is cluster expansion in DBSCAN?",
    "Growing a cluster from a core point by absorbing its density-reachable neighbours.",
    ["Merging two nearby clusters into one whenever the distance between their centroids drops below the eps parameter value.",
     "Increasing the eps radius gradually until every point in the dataset has finally been assigned to some cluster or other.",
     "Adding a new cluster label each time a point is found that has no neighbours within the eps radius around itself at all.",
     "Re-running the algorithm with a larger min_samples value so that small spurious clusters are absorbed into larger ones."],
    "Cluster expansion (seed growth)",
    "When DBSCAN finds a core point it starts a cluster and expands it: every point in the core's eps-neighbourhood is added, and if any of those are themselves core points, their neighbours are added too, until no more can be reached.",
    "Once DBSCAN finds a dense point, it keeps pulling in nearby points, and their nearby points, until the dense region is used up.",
    "Starting from one dense point, the cluster grows outward through the crowd of reachable neighbours.")

  def("dbscan1",
    "What is the core distance of a point in OPTICS?",
    "The smallest radius that makes the point a core point.",
    ["The distance from the point to the centroid of the cluster to which it is ultimately assigned once OPTICS has finished.",
     "The distance from the point to the nearest point that belongs to a different cluster than the one it is placed in.",
     "The average of the distances from the point to each of its min_samples closest neighbours within the dataset given.",
     "The maximum distance from the point to any other point that is still considered density-reachable from that point."],
    "Core distance (OPTICS)",
    "In OPTICS, a point's core distance is the distance to its min_samples-th nearest neighbour, i.e. the smallest eps at which it would qualify as a core point. If it has fewer than min_samples neighbours within eps it is undefined.",
    "It's the tightest radius that still gives the point enough neighbours to count as dense.",
    "The core distance is how far out you must reach to collect min_samples neighbours around a point.")

  def("dbscan1",
    "What is the reachability distance from one point to another in OPTICS?",
    "The larger of the core distance and the actual distance between them.",
    ["The number of intermediate core points that must be stepped through to travel from the first point to the second one.",
     "The distance between the two points after both have been rescaled so that every feature has unit standard deviation.",
     "The smallest eps radius at which the two points would both be placed together into the very same OPTICS cluster label.",
     "The distance from the second point outward to its own min_samples-th nearest neighbour within the whole dataset given."],
    "Reachability distance (OPTICS)",
    "The reachability distance of point q from core point p is max(core-distance(p), dist(p, q)). It smooths distances so that points inside p's dense core all appear at least core-distance away, producing the OPTICS reachability plot's valleys.",
    "It's the distance to a point, but never counted as closer than the source's own core distance.",
    "Reachability distance is just the real gap between two points, bumped up to at least the source's core distance.")

  def("dbscan1",
    "What is mean-shift clustering?",
    "A density method that moves points uphill to the nearest density peak (mode).",
    ["A density method that labels a point as noise whenever it has fewer than min_samples neighbours within a radius of eps.",
     "A method that repeatedly shifts each cluster's centroid to the mean of its members, exactly like the k-means update step.",
     "A method that grows clusters from core points by chaining together every neighbour that is density-reachable from them.",
     "A method that reduces dimensionality by shifting each point toward the mean of the whole dataset before clustering it."],
    "Mean-shift clustering",
    "Mean-shift places a kernel window over each point and iteratively shifts it toward the local mean (higher density) until it converges on a mode. Points converging to the same mode form a cluster; the bandwidth controls cluster count.",
    "Each point climbs toward the busiest nearby region; points that end up at the same peak become one cluster.",
    "It slides points toward where the crowd is densest, and everyone who arrives at the same peak forms a group.")

  def("dbscan1",
    "How does DBSCAN handle outliers?",
    "It labels low-density points as noise (-1) rather than forcing them into clusters.",
    ["It assigns every outlier to the nearest cluster centroid, exactly as k-means does when it partitions the whole dataset.",
     "It removes outliers before clustering by discarding any point whose distance to its nearest neighbour exceeds eps entirely.",
     "It grows the eps radius around each outlier until it eventually connects to a cluster somewhere else in the feature space.",
     "It creates a separate singleton cluster for each outlier so that no point is ever left without a cluster label of its own."],
    "Noise as a feature (outlier detection)",
    "Unlike k-means or hierarchical clustering, DBSCAN does not force every point into a cluster: points in sparse regions are given the noise label -1. This built-in outlier detection is a key advantage of density-based methods.",
    "Points out in the sparse middle of nowhere are simply called noise, not shoved into a group where they don't belong.",
    "DBSCAN can just say 'this point is an outlier' instead of forcing it into a cluster.")

  def("dbscan1",
    "In what sense is DBSCAN centroid-free?",
    "It defines clusters by density connectivity, not by a mean or centre point.",
    ["It uses medoids, meaning actual data points, as the centre of every cluster rather than a computed average location.",
     "It requires the number of cluster centres k to be fixed in advance before the algorithm can start running on the data.",
     "It represents each cluster by the single densest core point within it, treating that point as an implicit centroid value.",
     "It recomputes a moving centroid for every cluster on each pass, just as the mean-shift procedure does during its updates."],
    "Centroid-free clustering",
    "DBSCAN never computes cluster means or centres. A cluster is simply a maximal set of density-connected points, so clusters can take arbitrary shapes that no single centroid could summarise.",
    "There's no 'centre' of a DBSCAN cluster at all; a cluster is just a connected dense blob of whatever shape.",
    "DBSCAN groups by connected density, so it never needs or computes a centre point for a cluster.")

  def("dbscan1",
    "Why are DBSCAN's core points deterministic?",
    "A point's core status depends only on how many neighbours lie within eps.",
    ["Because the random seed is fixed at the start, so the same core points are chosen on every run over the dataset.",
     "Because core points are always processed in sorted order of their distance to the overall mean of the whole dataset.",
     "Because the algorithm reassigns core points on each iteration until their labels finally stop changing between passes.",
     "Because every core point must lie exactly on the boundary between two neighbouring clusters within the feature space."],
    "Core-point determinism",
    "Whether a point is a core point is fixed by the data, eps and min_samples: it is core iff at least min_samples points lie within eps. Only border points can be ambiguous (assigned to whichever core reaches them first), causing DBSCAN's mild order dependence.",
    "Being a core point is a simple yes/no count of neighbours, so it never changes between runs. Only edge points can flip.",
    "Core points are decided purely by neighbour counts, so they're the same every time; only border points can be ambiguous.")

  def("dbscan1",
    "How does DBSCAN differ from k-means in its assumptions?",
    "DBSCAN assumes density-connected clusters, not spherical equal-size blobs.",
    ["DBSCAN requires the number of clusters to be specified up front, whereas k-means discovers the cluster count on its own.",
     "DBSCAN assumes clusters are perfectly Gaussian, whereas k-means makes no assumption at all about the shape of clusters.",
     "DBSCAN needs the features to be standardised first, whereas k-means is completely invariant to the scaling of the features.",
     "DBSCAN minimises within-cluster variance, whereas k-means groups points purely by their local density in the space."],
    "DBSCAN vs k-means (assumptions)",
    "k-means assumes roughly spherical, similarly sized clusters and needs k in advance. DBSCAN instead assumes clusters are dense regions separated by sparse ones, so it finds arbitrary shapes, chooses the count itself, and flags noise.",
    "k-means expects round, evenly sized blobs; DBSCAN just expects dense areas separated by empty gaps, so it handles odd shapes.",
    "Where k-means wants tidy round groups of a preset number, DBSCAN finds dense regions of any shape and picks the count itself.")

  def("dbscan1",
    "Why does DBSCAN handle non-convex clusters that k-means cannot?",
    "Density connectivity can trace any shape, but k-means cuts space into convex cells.",
    ["Because DBSCAN uses a non-linear kernel to reshape the feature space, whereas k-means is restricted to purely linear boundaries.",
     "Because DBSCAN allows a point to belong partially to several clusters at once, whereas k-means forces one hard assignment only.",
     "Because DBSCAN merges clusters hierarchically from the bottom up, whereas k-means splits the whole space from the top down.",
     "Because DBSCAN recomputes centroids far more often than k-means, letting the centres bend around curved cluster shapes."],
    "Convex vs non-convex clusters",
    "k-means assigns each point to its nearest centroid, carving space into convex Voronoi cells, so it cannot represent a crescent or ring. DBSCAN chains together density-connected points, so a cluster can follow any connected shape.",
    "k-means can only make straight-edged, blob-like groups; DBSCAN follows the trail of dense points, so it can wrap around curves.",
    "Because it links neighbours by density instead of nearest-centre, DBSCAN can trace curved shapes k-means never could.")

  def("dbscan1",
    "Why can't standard DBSCAN predict the cluster of a new point directly?",
    "It only labels the points it was fitted on; there is no cluster model to apply.",
    ["Because assigning a new point would require recomputing the eps and min_samples parameters from scratch on the enlarged data.",
     "Because DBSCAN stores only the noise points from training and discards every point that was assigned to an actual cluster.",
     "Because the new point might turn a former border point into a core point, which would invalidate the whole clustering result.",
     "Because DBSCAN produces soft probabilistic memberships that cannot be collapsed into a single hard label for a fresh point."],
    "No native predict for new points",
    "DBSCAN is transductive: it clusters a fixed dataset and has no parametric model (no centroids, no boundaries) to score unseen points. To label new points you must either refit or apply a heuristic, e.g. assign to a cluster if within eps of one of its core points.",
    "DBSCAN just tags the points it saw; it doesn't build a rule you can reuse, so a brand-new point needs a refit or a workaround.",
    "There's no reusable model, so a new point can't just be dropped in, you'd have to run DBSCAN again.")

  def("dbscan1",
    "What limitation does DBSCAN's single global density scale cause?",
    "One eps can't fit clusters of very different densities at the same time.",
    ["It forces every cluster to contain exactly min_samples points, so unusually large clusters are split into several pieces.",
     "It makes the algorithm sensitive to the order in which the points are processed, changing the core points between runs.",
     "It requires the data to be low-dimensional, because distances become meaningless once there are too many features present.",
     "It causes the number of clusters to grow without bound as more points are added to a region of uniform high density."],
    "Single global density scale",
    "DBSCAN uses one eps and one min_samples everywhere, so a threshold tuned for dense clusters merges or drops sparse ones (and vice versa). Varying-density data is DBSCAN's main weakness; HDBSCAN and OPTICS address it by allowing multiple density scales.",
    "Using one density setting for the whole dataset fails when some real clusters are dense and others are loose.",
    "Because DBSCAN picks a single density level for everything, it struggles when different clusters have very different densities.")
})();
