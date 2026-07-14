/* Definition questions batch g5 (kmeans1, hier1, dbscan1). */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function add(qk, obj) { (Q[qk] = Q[qk] || []).push(obj); D[obj.q] = 1; }

  /* ===================== kmeans1 (10) ===================== */

  add("kmeans1", {
    q: "What is k-means clustering?",
    choices: [
      "An unsupervised algorithm that partitions data into a preset number k of clusters, each represented by its mean point, by repeatedly assigning points to the nearest mean and recomputing the means",
      "A supervised algorithm that learns a decision boundary between two labelled classes by maximising the margin between the closest training examples sitting on either side of the separating gap itself",
      "A method that builds a whole tree of nested clusters by repeatedly merging the two closest groups together, one pair at a time, until a single all-encompassing cluster is left alone at the very top",
      "A density-based algorithm that grows clusters outward from crowded regions and leaves the sparse points sitting alone out in the empty gaps unassigned, labelling every one of them as noise instead",
      "A dimensionality-reduction technique that projects the whole dataset down onto a few orthogonal directions of maximum variance to shrink the feature count while retaining most of the original spread"
    ],
    explain: "K-means splits a dataset into k groups so that each point belongs to the cluster whose mean (centroid) is nearest. It alternates two moves — assign every point to its closest centroid, then move each centroid to the average of its members — until the assignments stop changing. It is unsupervised: no labels are used, only the geometry of the points.",
    simple: "K-means sorts your points into k piles, where each pile has a centre. It keeps nudging the centres and re-sorting the points until everything settles. Nobody tells it the right answer; it just groups by closeness.",
    widget: {
      type: "curveStatic", title: "Points settling into k piles",
      world: "Running more rounds of assign-then-recentre, watching how tightly the points cluster around their means.",
      xlab: "rounds of assign + recentre →", xs: [0,1,2,3,4], labels: ["start","1","2","4","done"], dec: 0, yunit: "",
      series: [ { name: "cluster tightness (silhouette ×100)", ys: [8, 34, 52, 63, 66] } ],
      knob: { label: "Rounds run", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "From random starting centres the grouping is rough — points are only loosely near their nearest mean.", tone: "info" },
        { max: 3, text: "Each round re-assigns points and re-centres the means, and the piles get tighter and cleaner.", tone: "info" },
        { max: 4, text: "🤯 The assignments stop changing and the k means sit at the heart of k tight groups — that settled partition IS k-means clustering.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "K-means clustering", formula: "partition into k groups · minimise distance to each group's mean",
        text: "Alternate assign-to-nearest-mean and recompute-the-mean until the groups stabilise." }
    }
  });

  add("kmeans1", {
    q: "In k-means, what is 'inertia' (the within-cluster sum of squares)?",
    choices: [
      "The total of the squared distances from every point to its own cluster's centroid — a single number measuring how tight the clusters are",
      "The number of iterations the algorithm takes before the point assignments finally stop changing and the whole loop settles into convergence",
      "The average straight-line distance measured between the centroids of every possible pair of different clusters once the fitting has finished",
      "The count of the data points that end up assigned to the wrong cluster when compared with their true underlying group labels afterward",
      "The share of the data's total variance that ends up captured by the clustering once the centroids have fully settled into their places"
    ],
    explain: "Inertia (also called WCSS) sums the squared distance from each point to the centroid of the cluster it belongs to. Lower inertia means points sit closer to their centroids, so the clusters are tighter. K-means works by driving this quantity down; it is the objective the algorithm minimises.",
    simple: "Inertia adds up how far every point sits from its own group's centre, squared. A small number means each group is tight and compact. K-means tries to make this number as small as it can.",
    widget: {
      type: "curveStatic", title: "How tight are the clusters?",
      world: "Splitting the same data into more and more clusters and reading the total squared distance to the nearest centre.",
      xlab: "number of clusters k →", xs: [0,1,2,3,4], labels: ["1","2","3","5","8"], dec: 0, yunit: "",
      series: [ { name: "inertia (WCSS)", ys: [100, 55, 30, 18, 11] } ],
      knob: { label: "Clusters k", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With one big cluster, points are far from the single centre, so the summed squared distance is huge.", tone: "info" },
        { max: 3, text: "Add more centroids and every point sits closer to one of them, so the total falls.", tone: "info" },
        { max: 4, text: "🤯 That falling total of squared point-to-centroid distances IS inertia — the tightness score k-means drives down.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Inertia (WCSS)", formula: "Σ (distance from point to its centroid)²",
        text: "One number for cluster tightness; smaller is tighter. K-means minimises it." }
    }
  });

  add("kmeans1", {
    q: "What is the 'elbow method' for choosing k in k-means?",
    choices: [
      "A heuristic that plots inertia against k and picks the k where the curve bends sharply, because adding more clusters past that point barely reduces inertia",
      "A rule that always fixes the number of clusters k at the square root of the total count of the data points contained in the whole dataset being clustered",
      "A method that runs k-means over and over again from several different random seeds and simply keeps whichever finished run happens to report the lowest inertia",
      "A test that measures how far apart the final centroids end up sitting from one another out in space once all of the point assignments have finally converged",
      "A cleaning procedure that strips the outliers out of the data before clustering begins so the centroids are never dragged off toward stray far-away points"
    ],
    explain: "As you increase k, inertia always drops, but the gains shrink once you pass the natural number of groups. Plotting inertia versus k typically shows a sharp bend — the 'elbow' — where extra clusters stop helping much. The elbow method picks the k at that bend as a reasonable trade-off between tight clusters and too many of them.",
    simple: "Try k = 1, 2, 3, ... and draw how much tighter the clusters get each time. The line drops fast then flattens, making an elbow shape. The bend is a good place to stop adding clusters.",
    widget: {
      type: "curveStatic", title: "Where does the gain flatten?",
      world: "Increasing k and watching how much each extra cluster reduces the total within-cluster distance.",
      xlab: "number of clusters k →", xs: [0,1,2,3,4], labels: ["1","2","3","4","6"], dec: 0, yunit: "",
      series: [ { name: "inertia", ys: [100, 60, 28, 24, 21] } ],
      knob: { label: "Clusters k", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Going from 1 to 2 clusters slashes inertia — a big, worthwhile improvement.", tone: "info" },
        { max: 3, text: "At k = 3 the curve suddenly flattens: extra clusters after this barely reduce inertia.", tone: "info" },
        { max: 4, text: "🤯 That sharp bend where the drop stops paying off is the 'elbow' — reading k off it IS the elbow method.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Elbow method", formula: "plot inertia vs k · choose k at the bend",
        text: "Pick the k where more clusters stop meaningfully tightening the fit." }
    }
  });

  add("kmeans1", {
    q: "What is the 'silhouette score' in clustering?",
    choices: [
      "A measure, from −1 to 1, of how well each point fits its own cluster versus the nearest other cluster, averaged over all points",
      "The total squared distance summed up from every single data point to the particular centroid it has been assigned to in its cluster",
      "The number of clusters that still happen to contain at least one assigned point once the whole algorithm has completely finished running",
      "The fraction of all the data points that switched over to a different cluster on the very final iteration just before convergence",
      "The straight-line distance measured between the two particular centroids that end up sitting closest together after the run settles"
    ],
    explain: "For each point the silhouette compares its average distance to points in its own cluster with its average distance to points in the nearest neighbouring cluster. Values near 1 mean the point is snugly in its cluster and far from others; near 0 means it sits on a boundary; negative means it is probably in the wrong cluster. The mean over all points scores the whole clustering, and it often peaks at the best k.",
    simple: "For every point it asks: am I closer to my own group or to the next group over? A score near 1 means it clearly belongs where it is. Averaging this across all points tells you how good the clustering is.",
    widget: {
      type: "curveStatic", title: "Right number of groups?",
      world: "Clustering the same data with different k and scoring how cleanly each point sits inside its group.",
      xlab: "number of clusters k →", xs: [0,1,2,3,4], labels: ["2","3","4","5","7"], dec: 2, yunit: "",
      series: [ { name: "mean silhouette", ys: [0.32, 0.66, 0.48, 0.36, 0.22] } ],
      knob: { label: "Clusters k", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Too few clusters lumps distinct groups together, so points are only moderately at home.", tone: "info" },
        { max: 3, text: "At the natural number of groups the score peaks — points sit far inside their own cluster.", tone: "info" },
        { max: 4, text: "🤯 Split into too many and the score sags. That own-vs-neighbour fit averaged over all points IS the silhouette score.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Silhouette score", formula: "(b − a) / max(a, b), averaged  ·  a = own-cluster dist, b = nearest-other",
        text: "Near 1 = tight, well-separated clusters; peaks at a good choice of k." }
    }
  });

  add("kmeans1", {
    q: "What is 'k-means++'?",
    choices: [
      "A smarter way to choose the initial centroids, spreading the starting seeds far apart so k-means is less likely to get stuck in a poor solution",
      "A version of k-means that inspects the data on its very own and automatically decides on the single best number of clusters k to use for you",
      "A soft variant of the algorithm that lets each data point belong partly to several different clusters at once instead of just to exactly one",
      "An algorithm that speeds ordinary k-means up considerably by clustering only a small random sample of the data drawn out from the full whole dataset",
      "A scoring metric that rates just how good the final clustering actually turned out to be once the whole algorithm has fully converged and stopped"
    ],
    explain: "Plain k-means starts from random centroids, and a bad random start can trap it in a poor local minimum. K-means++ instead picks the first centroid at random, then chooses each later seed with probability proportional to its squared distance from the nearest existing seed, spreading the starting points out. This clever seeding usually gives lower final inertia and faster convergence, and it is the default in most libraries.",
    simple: "K-means can start in a bad spot if its first centres are chosen carelessly. K-means++ picks starting centres that are spread far apart on purpose. Better starting points usually lead to a better, faster result.",
    widget: {
      type: "curveStatic", title: "Better starting seeds",
      world: "Making the initial centroids progressively more spread out instead of clumped, then letting k-means finish.",
      xlab: "how spread the initial seeds are →", xs: [0,1,2,3,4], labels: ["clumped","near","mixed","spread","far apart"], dec: 0, yunit: "",
      series: [ { name: "final cluster quality (silhouette ×100)", ys: [30, 42, 55, 63, 68] } ],
      knob: { label: "Seed spread", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Seeds bunched together often trap k-means in a poor grouping it cannot escape.", tone: "info" },
        { max: 3, text: "Spreading the initial centres apart gives each real group its own seed, and the final result improves.", tone: "info" },
        { max: 4, text: "🤯 Choosing well-separated starting seeds by squared-distance probability IS k-means++ — the standard smart initialisation.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "k-means++", formula: "seed centroids ∝ squared distance from nearest chosen seed",
        text: "Spread the initial centres apart so k-means avoids bad local minima." }
    }
  });

  add("kmeans1", {
    q: "In k-means, what is the 'assignment step'?",
    choices: [
      "The step that labels each data point with the cluster whose centroid is currently nearest to it",
      "The step that shifts each centroid over to the mean position of the points now assigned to it",
      "The step that decides how many clusters k the whole algorithm should actually look for overall",
      "The step that scores the finished clustering once all of the centroids have finally stopped moving",
      "The step that randomly scatters the initial centroids across the space before the main loop begins"
    ],
    explain: "K-means alternates two steps. In the assignment step, every point is attached to the closest centroid, forming k groups given the centroids' current positions. This is followed by the update step, which recomputes the centroids. Repeating the pair until assignments stop changing is the whole algorithm.",
    simple: "The assignment step looks at each point and puts it with the nearest centre. It is the 'sort the points' half of k-means. The other half then moves the centres.",
    widget: {
      type: "curveStatic", title: "Send each point to its nearest centre",
      world: "Holding the centroids fixed and letting more of the points snap to whichever centre is closest.",
      xlab: "points assigned to nearest centroid →", xs: [0,1,2,3,4], labels: ["0%","25%","50%","75%","all"], dec: 0, yunit: "%",
      series: [ { name: "points correctly with nearest centre (%)", ys: [0, 25, 50, 75, 100] } ],
      knob: { label: "Points assigned", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Before the step, points have no home — the grouping is undefined.", tone: "info" },
        { max: 3, text: "One by one each point is compared to the fixed centroids and joins the closest one.", tone: "info" },
        { max: 4, text: "🤯 When every point has been attached to its nearest centroid, the clusters are set — that IS the assignment step.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Assignment step", formula: "each point → argmin distance to a centroid",
        text: "With centroids fixed, label every point by its closest centre." }
    }
  });

  add("kmeans1", {
    q: "In k-means, what is the 'update step'?",
    choices: [
      "The step that moves each centroid to the mean position of all the points currently assigned to its cluster",
      "The step that attaches every single data point to whichever one of the centroids happens to sit nearest to it",
      "The step that merges together the two clusters whose two centroids happen to sit closest to one another",
      "The step that removes away any clusters that have ended up containing no assigned points at all this round",
      "The step that picks out the value of k the whole algorithm will use before the clustering loop even begins"
    ],
    explain: "After points are assigned, the update step recomputes each centroid as the average of the points in its cluster, so the centre moves to the middle of its current members. Because the mean minimises squared distance, this move lowers inertia. Alternating assignment and update until nothing changes is Lloyd's algorithm.",
    simple: "Once the points are sorted, the update step slides each centre to the average location of its points. The centre moves to the middle of its group. Then the points get re-sorted and it repeats.",
    widget: {
      type: "curveStatic", title: "Slide each centre to the middle",
      world: "Recomputing each centroid as the mean of its members, round after round, and watching the fit tighten.",
      xlab: "recentre rounds →", xs: [0,1,2,3,4], labels: ["start","1","2","3","settled"], dec: 0, yunit: "",
      series: [ { name: "inertia", ys: [90, 55, 34, 24, 20] } ],
      knob: { label: "Recentre rounds", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Before recentring, the centroids sit off to the side of their members, so inertia is high.", tone: "info" },
        { max: 3, text: "Each recompute moves a centroid to the mean of its points, pulling it into the group and lowering inertia.", tone: "info" },
        { max: 4, text: "🤯 Moving every centroid to the average of its assigned points IS the update step — the mean-shift half of k-means.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Update step", formula: "centroid ← mean of the points assigned to it",
        text: "With assignments fixed, move each centre to its cluster's average." }
    }
  });

  add("kmeans1", {
    q: "In k-means, what is a 'Voronoi cell'?",
    choices: [
      "The region of space consisting of all points closer to one particular centroid than to any other — the territory that centroid owns",
      "The smallest possible circle that still manages to enclose every single one of the points that are assigned to one cluster in the plane",
      "The straight-line segment that connects two neighbouring centroids together right across the boundary lying between them in the plane",
      "The set of all the points that happen to lie exactly halfway along the line drawn between two adjacent centroids in space itself",
      "The average position, or mean point, taken over every single one of the data points that are assigned to one particular cluster"
    ],
    explain: "Given the centroids, space divides into regions where each region is the set of locations nearest to one centroid — these are the Voronoi cells, and their boundaries are the k-means decision boundaries. Any new point is assigned to a cluster simply by which cell it falls in. The cells are convex and tile the whole space.",
    simple: "Draw lines so that every spot in the map belongs to its nearest centre. Each centre gets its own patch of territory. That patch is the Voronoi cell.",
    widget: {
      type: "curveStatic", title: "Territory of a centroid",
      world: "Filling in the region of the plane that is closer to one centroid than to any of the others.",
      xlab: "space claimed by nearest-centre rule →", xs: [0,1,2,3,4], labels: ["0%","25%","50%","75%","full"], dec: 0, yunit: "%",
      series: [ { name: "space partitioned into cells (%)", ys: [0, 25, 50, 75, 100] } ],
      knob: { label: "Space partitioned", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With no rule yet, no location knows which centroid it belongs to.", tone: "info" },
        { max: 3, text: "Assign every location to its nearest centroid and the plane carves into non-overlapping regions.", tone: "info" },
        { max: 4, text: "🤯 Each centroid's region of 'points closer to me than to anyone else' IS its Voronoi cell — the k-means decision region.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Voronoi cell", formula: "{ x : centroid c is the nearest centroid to x }",
        text: "The territory of nearest points around each centroid; boundaries are the decision lines." }
    }
  });

  add("kmeans1", {
    q: "What is 'Lloyd's algorithm' in the context of k-means?",
    choices: [
      "The standard iterative procedure that runs k-means by alternating the assignment and update steps until the assignments no longer change",
      "A method for automatically selecting the single best number of clusters k directly from the underlying shape of the data on its own",
      "A rule for initialising the centroids by deliberately spreading them far apart from one another before any of the clustering begins at all",
      "A distance measure that is used to compare two entirely different clusterings of the very same dataset against each other and score them",
      "A way to speed the clustering up by processing the points in small randomly drawn mini-batches instead of all of them at once each round"
    ],
    explain: "Lloyd's algorithm is the classic implementation of k-means: fix k, initialise centroids, then repeat 'assign each point to its nearest centroid' and 'move each centroid to the mean of its points' until nothing changes. Each iteration cannot increase inertia, so it converges — though only to a local minimum, which is why initialisation matters. When people say 'the k-means algorithm', this loop is usually what they mean.",
    simple: "Lloyd's algorithm is just the repeat-loop at the heart of k-means: sort the points, move the centres, sort again, move again, until it settles. It is the recipe the computer actually follows. It always stops, but not always at the perfect answer.",
    widget: {
      type: "curveStatic", title: "The loop settling down",
      world: "Letting the assign-then-recentre loop run for more iterations and watching inertia converge.",
      xlab: "iterations of the loop →", xs: [0,1,2,3,4], labels: ["0","1","2","4","8"], dec: 0, yunit: "",
      series: [ { name: "inertia", ys: [100, 52, 30, 22, 21] } ],
      knob: { label: "Iterations", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "The first pass over the data already cuts inertia sharply from the random start.", tone: "info" },
        { max: 3, text: "Each iteration alternates assign and update, and inertia keeps dropping but by less and less.", tone: "info" },
        { max: 4, text: "🤯 The assignments stop changing and inertia levels off — that convergent assign/update loop IS Lloyd's algorithm.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Lloyd's algorithm", formula: "repeat { assign to nearest centroid ; recentre } until stable",
        text: "The standard k-means iteration; converges to a local minimum of inertia." }
    }
  });

  add("kmeans1", {
    q: "Why does k-means usually require 'feature scaling' first?",
    choices: [
      "Because k-means uses distances, a feature on a large numeric range would dominate the distance and the clusters, so features are rescaled to comparable ranges beforehand",
      "Because k-means simply cannot run at all unless every single one of the features has first been carefully turned into a whole number lying strictly between 0 and 1 each time",
      "Because the scaling step is really what automatically chooses the single correct number of clusters k for the whole algorithm to go and look for on your behalf",
      "Because leaving the features left completely unscaled would otherwise make the whole algorithm just carry on running forever without ever quite managing to converge at all",
      "Because the scaling is really what converts the categorical class labels into the numeric target values that the k-means algorithm needs to have in order to learn"
    ],
    explain: "K-means measures closeness with Euclidean distance, which sums the squared differences across features. If one feature ranges over thousands and another over a handful, the large-range feature swamps the distance and effectively decides the clusters on its own. Standardising or normalising features so they share a comparable scale lets every feature contribute fairly.",
    simple: "K-means groups points by distance, and distance is unfair when one column is measured in huge numbers and another in tiny ones. The big column would decide everything. Rescaling the columns to a similar range fixes that.",
    widget: {
      type: "curveStatic", title: "Letting every feature count",
      world: "Rescaling features from wildly different ranges toward a common range, then reading cluster quality.",
      xlab: "how comparable the feature scales are →", xs: [0,1,2,3,4], labels: ["raw","little","some","most","matched"], dec: 0, yunit: "",
      series: [ { name: "cluster quality (silhouette ×100)", ys: [24, 38, 52, 62, 67] } ],
      knob: { label: "Scale matching", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "On raw data the widest-range feature alone drives the distances, so the clusters ignore the rest.", tone: "info" },
        { max: 3, text: "Bring the features onto comparable ranges and each one starts contributing to the grouping.", tone: "info" },
        { max: 4, text: "🤯 Rescaling so no single feature dominates the distance IS why k-means needs feature scaling.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Feature scaling for k-means", formula: "standardise / normalise features → comparable ranges",
        text: "Distance-based clustering is fair only when features share a scale." }
    }
  });

  /* ===================== hier1 (10) ===================== */

  add("hier1", {
    q: "What is hierarchical clustering?",
    choices: [
      "A clustering approach that builds a nested tree of clusters, merging or splitting groups by similarity, so you can read off clusters at any level of the hierarchy",
      "A clustering approach that fixes the number of clusters k in advance and then repeatedly nudges its moving centroids around to minimise the total within-cluster distance",
      "A clustering approach that grows clusters outward from dense crowded regions of the data and then marks the leftover sparse points as unclustered background noise instead",
      "A supervised approach that learns the decision boundary lying between labelled classes directly from a set of hand-annotated training examples handed over up front",
      "A method that first reduces the data down to just a few principal directions of maximum variance before any of the actual grouping work is even carried out at all"
    ],
    explain: "Hierarchical clustering organises data into a tree of clusters rather than a single flat partition. The agglomerative form starts with each point alone and repeatedly merges the two most similar groups; the divisive form starts with one cluster and splits it. Because the whole tree is produced, you can choose how many clusters you want afterward by cutting the tree at a chosen level.",
    simple: "Instead of picking a number of groups up front, this method builds a whole family tree of groups — small ones nested inside bigger ones. You can then slice the tree wherever you like to get however many clusters you want.",
    widget: {
      type: "curveStatic", title: "Building a tree of groups",
      world: "Merging the two most similar groups over and over, so many tiny clusters become a few big ones.",
      xlab: "merge steps completed →", xs: [0,1,2,3,4], labels: ["all singletons","many","some","few","one"], dec: 0, yunit: "",
      series: [ { name: "number of clusters", ys: [40, 18, 8, 3, 1] } ],
      knob: { label: "Merges done", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Start with every point in its own tiny cluster — the leaves of the tree.", tone: "info" },
        { max: 3, text: "Each step joins the two closest groups, so clusters nest inside larger clusters as you climb.", tone: "info" },
        { max: 4, text: "🤯 The full nested tree of groups, readable at any level, IS hierarchical clustering.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Hierarchical clustering", formula: "nested tree of clusters (merge up or split down)",
        text: "Produces a hierarchy, not one fixed partition; cut it to get k clusters." }
    }
  });

  add("hier1", {
    q: "In hierarchical clustering, what is 'linkage'?",
    choices: [
      "The rule that defines the distance between two clusters, deciding which pair of clusters is 'closest' and therefore merged next",
      "The line that is drawn across a dendrogram to connect two individual points which both belong to the very same cluster together",
      "The number of separate clusters that are left remaining over after the whole algorithm has completely finished all of its merging",
      "The particular order in which the original raw data points happened to be fed into the clustering algorithm at the very start",
      "The threshold height at which the finished tree is finally cut straight across to produce the final set of flat clusters"
    ],
    explain: "Agglomerative clustering repeatedly merges the two closest clusters, but 'closest' between groups of points needs a definition — that is the linkage. Single linkage uses the nearest pair of points, complete linkage the farthest pair, average linkage the mean pairwise distance, and Ward the increase in variance. The linkage choice strongly shapes the clusters you get.",
    simple: "To merge the two closest clusters you first need to say what 'distance between two clusters' even means. Linkage is that rule. Different linkage rules give different-looking clusters.",
    widget: {
      type: "curveStatic", title: "How to measure group-to-group distance",
      world: "Comparing the same two clusters under linkage rules that look at ever more of the points between them.",
      xlab: "linkage rule (points it considers) →", xs: [0,1,2,3,4], labels: ["nearest pair","few","average","most","farthest pair"], dec: 0, yunit: "",
      series: [ { name: "measured distance between the two clusters", ys: [12, 28, 45, 62, 80] } ],
      knob: { label: "Linkage rule", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "One rule calls two clusters close if just their nearest points touch.", tone: "info" },
        { max: 3, text: "Another averages all the pairwise distances between the two groups — a middle-ground measure.", tone: "info" },
        { max: 4, text: "🤯 Each rule for turning point distances into a between-cluster distance IS a linkage — and it decides what merges next.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Linkage", formula: "a rule mapping (cluster A, cluster B) → a distance",
        text: "Defines 'closest clusters' so the algorithm knows which pair to merge." }
    }
  });

  add("hier1", {
    q: "What is 'single linkage' in hierarchical clustering?",
    choices: [
      "A linkage rule that defines the distance between two clusters as the distance between their two closest points",
      "A linkage rule that instead uses the distance between the two single farthest-apart points of the two clusters",
      "A linkage rule that averages the distances taken over every possible pair of points spanning the two clusters",
      "A linkage rule that merges clusters so as to minimise the resulting increase in the total within-cluster variance",
      "A linkage rule that simply compares the two centroids, the mean points, of the two clusters that are being merged"
    ],
    explain: "Single linkage measures cluster distance by the closest pair of points, one from each cluster. This lets clusters merge as soon as any two members are near, so it can trace long, chain-like or non-spherical shapes — but it is also prone to 'chaining', where distinct clusters get bridged by a thin trail of points. It is the most optimistic of the standard linkages.",
    simple: "Single linkage says two groups are close if their nearest edges touch, even if the rest is far away. It happily links long stringy shapes, but it can also chain separate blobs together through a few in-between points.",
    widget: {
      type: "curveStatic", title: "Merge when nearest edges touch",
      world: "Raising the merge threshold and watching single linkage join clusters as soon as any nearest pair is within reach.",
      xlab: "merge threshold →", xs: [0,1,2,3,4], labels: ["tiny","low","mid","high","large"], dec: 0, yunit: "",
      series: [ { name: "clusters merged so far", ys: [0, 3, 9, 16, 24] } ],
      knob: { label: "Merge threshold", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "At a tiny threshold only points almost on top of each other join.", tone: "info" },
        { max: 3, text: "Because only the nearest pair matters, clusters link the moment any two members come close.", tone: "info" },
        { max: 4, text: "🤯 Defining cluster distance by the single closest pair of points IS single linkage — great for chains, prone to chaining.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Single linkage", formula: "d(A, B) = min over a∈A, b∈B of dist(a, b)",
        text: "Nearest-pair distance; traces elongated shapes but can chain clusters together." }
    }
  });

  add("hier1", {
    q: "What is 'complete linkage' in hierarchical clustering?",
    choices: [
      "A linkage rule that defines the distance between two clusters as the distance between their two farthest points",
      "A linkage rule that instead uses the distance between the two single closest-together points of the two clusters",
      "A linkage rule that averages the distances taken across all of the pairs of points spanning the two clusters",
      "A linkage rule that merges clusters so as to minimise the resulting growth in the total within-cluster variance",
      "A linkage rule based only on the straight-line distance measured between the two clusters' own mean centroids"
    ],
    explain: "Complete linkage measures cluster distance by the farthest pair of points, one from each cluster, so two clusters merge only when even their most distant members are reasonably close. This makes it favour compact, roughly equal-sized, ball-shaped clusters and resist the chaining that single linkage suffers. It can, however, break up large or elongated true clusters.",
    simple: "Complete linkage is the cautious opposite of single linkage: two groups count as close only if even their most far-apart members are near. That keeps clusters tight and round, but it can split up big stretched-out groups.",
    widget: {
      type: "curveStatic", title: "Merge only when even far edges are close",
      world: "Raising the merge threshold under complete linkage, which waits until the farthest pair between clusters is within reach.",
      xlab: "merge threshold →", xs: [0,1,2,3,4], labels: ["tiny","low","mid","high","large"], dec: 0, yunit: "",
      series: [ { name: "clusters merged so far", ys: [0, 1, 4, 11, 22] } ],
      knob: { label: "Merge threshold", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Nothing merges early because the farthest members of any two clusters are still far apart.", tone: "info" },
        { max: 3, text: "Only once whole groups are compact and close do they join, keeping clusters tight and round.", tone: "info" },
        { max: 4, text: "🤯 Defining cluster distance by the farthest pair of points IS complete linkage — compact clusters, no chaining.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Complete linkage", formula: "d(A, B) = max over a∈A, b∈B of dist(a, b)",
        text: "Farthest-pair distance; yields compact clusters and resists chaining." }
    }
  });

  add("hier1", {
    q: "What is 'average linkage' in hierarchical clustering?",
    choices: [
      "A linkage rule that defines the distance between two clusters as the average distance over all pairs of points, one from each cluster",
      "A linkage rule that uses only the single closest pair of points between the clusters",
      "A linkage rule that uses only the single farthest pair of points between the clusters",
      "A linkage rule that merges to minimise the increase in within-cluster variance",
      "A linkage rule that measures the distance between the clusters' mean points"
    ],
    explain: "Average linkage (UPGMA) takes every pair of points with one member in each cluster, computes their distances, and averages them to score how close the clusters are. By using all pairs it sits between the extremes of single (nearest pair) and complete (farthest pair) linkage, giving a balanced compromise that is less prone to chaining yet not as aggressive at splitting as complete linkage.",
    simple: "Average linkage looks at the distance between every point in one group and every point in the other, then takes the average. It is the middle path between the nearest-pair and farthest-pair rules. That balance makes it a popular default.",
    widget: {
      type: "curveStatic", title: "Average of all the pair distances",
      world: "Bringing two clusters gradually together and reading the mean distance across all cross-cluster point pairs.",
      xlab: "how much the clusters overlap →", xs: [0,1,2,3,4], labels: ["far","apart","near","close","touching"], dec: 0, yunit: "",
      series: [ { name: "mean cross-cluster distance", ys: [80, 60, 42, 25, 12] } ],
      knob: { label: "Cluster closeness", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "When the clusters are far apart, averaging every cross pair gives a large distance.", tone: "info" },
        { max: 3, text: "As the groups approach, that average of all the pairwise distances steadily falls.", tone: "info" },
        { max: 4, text: "🤯 Scoring two clusters by the mean over all their cross-pair distances IS average linkage — the balanced middle rule.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Average linkage", formula: "d(A, B) = mean over a∈A, b∈B of dist(a, b)",
        text: "All-pairs average distance; a balanced compromise between single and complete." }
    }
  });

  add("hier1", {
    q: "What is 'Ward linkage' (Ward's method) in hierarchical clustering?",
    choices: [
      "A linkage rule that merges the pair of clusters whose union increases the total within-cluster variance the least",
      "A linkage rule that merges the pair of clusters with the closest single pair of points",
      "A linkage rule that merges the pair of clusters with the farthest single pair of points",
      "A linkage rule that merges the pair whose centroids are exactly a fixed distance apart",
      "A linkage rule that merges clusters purely in the order the data was supplied"
    ],
    explain: "Ward's method chooses, at each step, the merge that adds the least to the total within-cluster sum of squares (variance). In effect it prefers joining clusters that keep the resulting groups tight, analogous to k-means' objective but applied hierarchically. It tends to produce compact, similarly sized, roughly spherical clusters and is one of the most widely used linkages.",
    simple: "Ward linkage merges the two groups that, once combined, keep the total spread smallest. It always makes the tightest possible join at each step. This tends to give neat, evenly sized clusters.",
    widget: {
      type: "curveStatic", title: "Merge that stays tightest",
      world: "Considering candidate merges and reading how much each one would inflate the total within-cluster variance.",
      xlab: "candidate merges, worst kept last →", xs: [0,1,2,3,4], labels: ["best","good","ok","poor","worst"], dec: 0, yunit: "",
      series: [ { name: "variance added by the merge", ys: [4, 12, 26, 48, 80] } ],
      knob: { label: "Merge considered", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "One candidate merge barely raises the total spread — the groups fit snugly together.", tone: "info" },
        { max: 3, text: "Other merges would balloon the within-cluster variance, so Ward avoids them.", tone: "info" },
        { max: 4, text: "🤯 Always picking the merge that adds the least within-cluster variance IS Ward linkage — it favours tight, even clusters.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Ward linkage", formula: "merge the pair with the smallest increase in within-cluster variance",
        text: "Variance-minimising merges; produces compact, similarly sized clusters." }
    }
  });

  add("hier1", {
    q: "What is 'divisive' hierarchical clustering?",
    choices: [
      "A top-down approach that starts with all points in one cluster and repeatedly splits clusters into smaller ones",
      "A bottom-up approach that starts with each point alone and repeatedly merges the closest clusters",
      "An approach that fixes the number of clusters k in advance and refines centroids",
      "An approach that grows clusters from dense seed regions and discards sparse noise",
      "An approach that clusters points by projecting them onto their principal components first"
    ],
    explain: "Divisive clustering works in the opposite direction to the common agglomerative method. It begins with every point in a single all-encompassing cluster and, step by step, divides clusters into smaller groups, moving down the hierarchy. Both directions build the same kind of tree, but divisive splits from the top while agglomerative merges from the bottom.",
    simple: "Divisive clustering starts with everything in one big group and keeps splitting it into smaller groups. It builds the tree from the top down. That is the reverse of the more common merge-from-the-bottom approach.",
    widget: {
      type: "curveStatic", title: "Splitting from the top down",
      world: "Starting from one big cluster and repeatedly dividing clusters, so the number of groups grows.",
      xlab: "split steps completed →", xs: [0,1,2,3,4], labels: ["one","2","4","8","many"], dec: 0, yunit: "",
      series: [ { name: "number of clusters", ys: [1, 2, 4, 8, 20] } ],
      knob: { label: "Splits done", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "It begins with a single cluster holding every point — the root of the tree.", tone: "info" },
        { max: 3, text: "Each step splits a cluster in two, moving downward through the hierarchy.", tone: "info" },
        { max: 4, text: "🤯 Building the tree top-down by repeatedly splitting one cluster into many IS divisive clustering.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Divisive clustering", formula: "one cluster → repeatedly split → many clusters",
        text: "Top-down hierarchy building; the mirror image of agglomerative merging." }
    }
  });

  add("hier1", {
    q: "In a dendrogram, what is the 'merge height'?",
    choices: [
      "The vertical level at which two clusters are joined, equal to the distance (dissimilarity) between them when they merged",
      "The number of points contained in the cluster formed by a merge",
      "The horizontal position of a leaf along the bottom axis of the tree",
      "The total number of merges performed to build the whole tree",
      "The height at which the analyst decides to cut the tree into clusters"
    ],
    explain: "In a dendrogram the vertical axis records dissimilarity, and the height at which two branches join is the linkage distance between those clusters at the moment they merged. Low merges join very similar groups; high merges join dissimilar ones. Big vertical gaps between successive merges suggest natural, well-separated clusters.",
    simple: "In the tree diagram, the higher up two branches join, the less alike those groups were. That joining level is the merge height. Tall jumps mean you are combining things that are quite different.",
    widget: {
      type: "curveStatic", title: "How high did they join?",
      world: "Reading successive merges in a dendrogram from the earliest (most similar) to the latest (most different).",
      xlab: "merges in order they happen →", xs: [0,1,2,3,4], labels: ["1st","2nd","3rd","4th","5th"], dec: 0, yunit: "",
      series: [ { name: "merge height (dissimilarity)", ys: [4, 9, 18, 34, 60] } ],
      knob: { label: "Merge order", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "The first merges join near-identical points, so they sit very low on the tree.", tone: "info" },
        { max: 3, text: "Later merges combine groups that are more different, so the join happens higher up.", tone: "info" },
        { max: 4, text: "🤯 The dissimilarity at which two clusters join, drawn as the vertical level of the join, IS the merge height.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Merge height", formula: "vertical level of a join = linkage distance at merge time",
        text: "Higher joins = more dissimilar groups; big gaps hint at natural clusters." }
    }
  });

  add("hier1", {
    q: "What is the 'cophenetic distance' between two points in hierarchical clustering?",
    choices: [
      "The merge height in the dendrogram at which the two points first end up in the same cluster",
      "The straight-line distance between the two points in the original feature space",
      "The number of merge steps that separate the two points in the tree",
      "The difference between the two points' distances to the nearest centroid",
      "The average distance from each point to all other points in its cluster"
    ],
    explain: "The cophenetic distance between two points is the height in the dendrogram at which they are first joined into a common cluster — essentially how far up the tree you must go before they meet. Comparing these cophenetic distances with the original pairwise distances (the cophenetic correlation) measures how faithfully the tree preserves the real structure of the data.",
    simple: "Trace two points up the tree until their branches first meet; the height of that meeting point is the cophenetic distance. Points that join low are treated as close by the tree. It is the tree's own idea of how far apart two points are.",
    widget: {
      type: "curveStatic", title: "How far up until they meet?",
      world: "Looking at pairs of points that only join into the same cluster higher and higher up the dendrogram.",
      xlab: "pairs that join further up the tree →", xs: [0,1,2,3,4], labels: ["same leaf","low","mid","high","root"], dec: 0, yunit: "",
      series: [ { name: "cophenetic distance (join height)", ys: [3, 10, 22, 40, 65] } ],
      knob: { label: "Join level", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Two points that merge almost immediately have a tiny cophenetic distance.", tone: "info" },
        { max: 3, text: "Points that only share a cluster far up the tree have a large cophenetic distance.", tone: "info" },
        { max: 4, text: "🤯 The dendrogram height at which two points first share a cluster IS their cophenetic distance.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Cophenetic distance", formula: "height at which two points first join the same cluster",
        text: "The tree's notion of point distance; its match to real distances gauges fit." }
    }
  });

  add("hier1", {
    q: "What does 'cutting the dendrogram' mean?",
    choices: [
      "Drawing a horizontal line across the tree at a chosen height and taking the branches below it as the final flat clusters",
      "Removing the points that merge highest up the tree because they are outliers",
      "Deleting the longest branches so the diagram fits on the page",
      "Choosing the linkage rule that will be used to build the tree",
      "Merging the last two clusters into a single root at the top"
    ],
    explain: "A dendrogram encodes clusterings at every level, so to get one flat set of clusters you cut it horizontally at some height. Every branch the cut crosses becomes one cluster, gathering all the leaves beneath it. Cutting low yields many small clusters; cutting high yields few large ones — so the cut height sets the number of clusters after the tree is built.",
    simple: "The tree contains every possible number of groups at once. To pick one answer, you slice straight across at some height and each branch you cut becomes a cluster. Slice low for many groups, high for few.",
    widget: {
      type: "curveStatic", title: "Slice the tree to pick k",
      world: "Sliding a horizontal cut from the top of the dendrogram down toward the leaves.",
      xlab: "cut height (high → low) →", xs: [0,1,2,3,4], labels: ["top","high","mid","low","leaves"], dec: 0, yunit: "",
      series: [ { name: "clusters produced by the cut", ys: [1, 2, 4, 9, 25] } ],
      knob: { label: "Cut height", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Cut near the top and everything falls into one or two big clusters.", tone: "info" },
        { max: 3, text: "Lower the cut and each branch it crosses becomes a separate cluster, so you get more of them.", tone: "info" },
        { max: 4, text: "🤯 Slicing the tree horizontally and taking the branches below as clusters IS cutting the dendrogram — it sets k after the fact.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Cutting the dendrogram", formula: "horizontal cut at height h → clusters = branches crossed",
        text: "Turns the full hierarchy into a flat clustering; cut height chooses the number." }
    }
  });

  /* ===================== dbscan1 (9) ===================== */

  add("dbscan1", {
    q: "What is DBSCAN?",
    choices: [
      "A density-based clustering algorithm that groups points packed closely together and labels points in low-density regions as noise, without needing the number of clusters in advance",
      "A clustering algorithm that fixes the number of clusters k and iteratively moves centroids to minimise distance",
      "A clustering algorithm that builds a full nested tree of clusters by merging the closest groups",
      "A supervised algorithm that classifies points by a majority vote of their nearest labelled neighbours",
      "A method that reduces the number of features by projecting data onto directions of maximum variance"
    ],
    explain: "DBSCAN (Density-Based Spatial Clustering of Applications with Noise) forms clusters from regions where points are densely packed, connecting nearby dense points and treating isolated points as noise. It needs two parameters, eps and min_samples, but not the number of clusters, and it can find clusters of arbitrary shape. Points that are not reachable from any dense region are simply left unclustered.",
    simple: "DBSCAN finds groups by looking for crowded regions of points and joining them up. You do not tell it how many groups to find. Points sitting off on their own in empty space are labelled as noise rather than forced into a cluster.",
    widget: {
      type: "curveStatic", title: "Clusters from crowded regions",
      world: "Feeding data with denser and denser cluster cores and watching DBSCAN recover well-formed groups.",
      xlab: "how dense the true clusters are →", xs: [0,1,2,3,4], labels: ["sparse","thin","some","dense","packed"], dec: 0, yunit: "%",
      series: [ { name: "clusters correctly recovered (%)", ys: [10, 30, 55, 78, 92] } ],
      knob: { label: "Cluster density", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "When points are spread thinly, no region is dense enough to seed a cluster.", tone: "info" },
        { max: 3, text: "As true clusters get denser, DBSCAN links the crowded points into groups and flags the gaps as noise.", tone: "info" },
        { max: 4, text: "🤯 Grouping dense regions, ignoring sparse noise, and never being told k — that whole recipe IS DBSCAN.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "DBSCAN", formula: "dense neighbourhoods → clusters ; sparse points → noise",
        text: "Density-based clustering; finds arbitrary shapes and needs no preset cluster count." }
    }
  });

  add("dbscan1", {
    q: "In DBSCAN, what is 'min_samples' (minPts)?",
    choices: [
      "The minimum number of points that must lie within a point's eps-neighbourhood for it to count as a core point",
      "The total number of clusters DBSCAN is allowed to create",
      "The smallest cluster size that DBSCAN will report as a valid cluster",
      "The number of points DBSCAN samples from the data before it starts",
      "The maximum distance two points may be apart to be neighbours"
    ],
    explain: "min_samples (called minPts in the original paper) is the density threshold: a point qualifies as a core point only if at least this many points, including itself, fall within its eps-neighbourhood. Larger values demand denser regions to form clusters and push more points into the noise category, while smaller values make clustering more permissive. It is chosen together with eps.",
    simple: "min_samples is how many neighbours a point needs nearby to be considered in a 'crowded' spot. Set it high and only very dense areas form clusters. Set it low and looser groups qualify too.",
    widget: {
      type: "curveStatic", title: "How crowded must a core be?",
      world: "Raising the neighbour count required for a point to count as being in a dense region.",
      xlab: "min_samples required →", xs: [0,1,2,3,4], labels: ["2","3","5","8","12"], dec: 0, yunit: "%",
      series: [ { name: "points labelled as noise (%)", ys: [4, 9, 18, 34, 55] } ],
      knob: { label: "min_samples", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A low requirement lets almost any small cluster of neighbours count as dense.", tone: "info" },
        { max: 3, text: "Raise the required neighbour count and only genuinely crowded points qualify as cores.", tone: "info" },
        { max: 4, text: "🤯 That minimum neighbour count inside eps needed to be a core point IS min_samples (minPts).", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "min_samples (minPts)", formula: "core point ⇔ ≥ min_samples points within eps",
        text: "The density threshold; higher values demand denser regions and yield more noise." }
    }
  });

  add("dbscan1", {
    q: "In DBSCAN, what is a point's 'eps-neighbourhood'?",
    choices: [
      "The set of all points lying within distance eps of that point",
      "The single closest point to that point regardless of how far it is",
      "The cluster that the point is eventually assigned to",
      "The average distance from the point to every other point in the data",
      "The region of space that is closer to that point than to any centroid"
    ],
    explain: "The eps-neighbourhood of a point is every other point within the radius eps of it (under the chosen distance metric). Counting how many points fall in this neighbourhood is how DBSCAN measures local density: if the count reaches min_samples the point is a core point. All of DBSCAN's core/border/noise decisions rest on these neighbourhoods.",
    simple: "Draw a circle of radius eps around a point; everything inside is its eps-neighbourhood. DBSCAN counts how many points land in that circle to see how crowded the spot is. More neighbours means denser.",
    widget: {
      type: "curveStatic", title: "Who is inside the circle?",
      world: "Growing the radius eps around a fixed point and counting how many other points fall inside it.",
      xlab: "radius eps →", xs: [0,1,2,3,4], labels: ["tiny","small","mid","large","wide"], dec: 0, yunit: "",
      series: [ { name: "neighbours within eps", ys: [0, 2, 6, 13, 22] } ],
      knob: { label: "Radius eps", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A tiny radius captures no neighbours — the point looks isolated.", tone: "info" },
        { max: 3, text: "Widening eps pulls in more nearby points, revealing how crowded the region is.", tone: "info" },
        { max: 4, text: "🤯 The collection of all points within radius eps of a point IS its eps-neighbourhood — DBSCAN's unit of density.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "eps-neighbourhood", formula: "{ q : dist(p, q) ≤ eps }",
        text: "All points within eps of p; its size is the local density DBSCAN reads." }
    }
  });

  add("dbscan1", {
    q: "In DBSCAN, what does it mean for a point to be 'directly density-reachable' from a core point?",
    choices: [
      "The point lies within the eps-neighbourhood of a core point",
      "The point is itself a core point with enough neighbours of its own",
      "The point is the closest neighbour to a core point among all points",
      "The point can be reached from a core point through a chain of several other core points",
      "The point lies exactly at distance eps from a border point"
    ],
    explain: "A point q is directly density-reachable from a point p when p is a core point and q lies within p's eps-neighbourhood. It is the one-hop building block of DBSCAN's connectivity: clusters grow by starting at a core point and pulling in everything directly density-reachable from it. Note the requirement that p be a core point, which makes the relation asymmetric.",
    simple: "A point is directly density-reachable from a core point if it sits inside that core point's eps circle. It is the single-step way DBSCAN reaches out from a crowded point to its neighbours. The starting point has to be a core point.",
    widget: {
      type: "curveStatic", title: "One hop out from a core point",
      world: "Widening a core point's eps circle so more surrounding points become directly reachable from it in one step.",
      xlab: "core point's eps reach →", xs: [0,1,2,3,4], labels: ["none","few","some","more","many"], dec: 0, yunit: "",
      series: [ { name: "points directly reachable from the core", ys: [0, 3, 7, 12, 18] } ],
      knob: { label: "eps reach", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With a small reach, only points right beside the core point are grabbed.", tone: "info" },
        { max: 3, text: "As the core point's eps-neighbourhood covers more points, each of those is one hop away.", tone: "info" },
        { max: 4, text: "🤯 A point lying inside a core point's eps-neighbourhood IS directly density-reachable from it — DBSCAN's one-step link.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Directly density-reachable", formula: "p is core AND dist(p, q) ≤ eps",
        text: "The single-hop reach from a core point to a neighbour inside its eps circle." }
    }
  });

  add("dbscan1", {
    q: "In DBSCAN, what does it mean for a point to be 'density-reachable' from a core point?",
    choices: [
      "The point can be reached through a chain of directly density-reachable steps that passes only through core points",
      "The point lies within eps of exactly one core point and no others",
      "The point is within eps of any point at all, core or not",
      "The point shares a cluster with a core point but may be arbitrarily far from it",
      "The point is a noise point that happens to sit near a cluster"
    ],
    explain: "Density-reachability extends the one-hop 'directly density-reachable' relation into a chain: q is density-reachable from p if there is a sequence of points, each directly density-reachable from the previous, linking p to q — and every intermediate point must be a core point. This transitive chaining is how a cluster spreads across a dense region even when its two ends are far apart.",
    simple: "Density-reachable is like stepping stones: you hop from core point to core point, each hop staying inside an eps circle, until you reach the target point. It lets one cluster stretch across a whole dense area. Every stepping stone in the middle has to be a core point.",
    widget: {
      type: "curveStatic", title: "Stepping-stone chain of cores",
      world: "Allowing longer chains of directly-reachable core-point hops and seeing how far a cluster can stretch.",
      xlab: "hops allowed along core points →", xs: [0,1,2,3,4], labels: ["0","1","2","3","many"], dec: 0, yunit: "",
      series: [ { name: "points pulled into the cluster", ys: [1, 5, 12, 22, 40] } ],
      knob: { label: "Chain length", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With no chaining, only a core point's immediate neighbours belong.", tone: "info" },
        { max: 3, text: "Allow hops from core point to core point and the reach extends across the dense region.", tone: "info" },
        { max: 4, text: "🤯 Being linked to a core point by a chain of directly-reachable core-point hops IS density-reachability.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Density-reachable", formula: "chain p → … → q, each hop directly density-reachable via core points",
        text: "Transitive reach along core points; lets a cluster span an elongated dense region." }
    }
  });

  add("dbscan1", {
    q: "In DBSCAN, what does it mean for two points to be 'density-connected'?",
    choices: [
      "There exists a core point from which both points are density-reachable",
      "The two points lie within eps of each other directly",
      "Both points are core points with the same number of neighbours",
      "The two points are the two farthest members of the same cluster",
      "One of the points is noise and the other is a border point"
    ],
    explain: "Two points are density-connected if some core point can reach both of them via density-reachability, even if neither can reach the other directly. Unlike density-reachability, this relation is symmetric, and it is the exact criterion DBSCAN uses to define a cluster: a cluster is a maximal set of mutually density-connected points. This is what lets border points on opposite sides of a blob belong to the same cluster.",
    simple: "Two points are density-connected if there is a crowded core point that can reach both of them through chains of neighbours. They need not touch each other directly — a shared hub links them. This is exactly what DBSCAN uses to decide two points are in the same cluster.",
    widget: {
      type: "curveStatic", title: "Linked through a shared core",
      world: "Extending the reach of a common core point until it connects two points on opposite sides of a dense blob.",
      xlab: "reach of the shared core point →", xs: [0,1,2,3,4], labels: ["none","one side","half","most","both ends"], dec: 0, yunit: "%",
      series: [ { name: "chance the two points share a cluster (%)", ys: [0, 20, 45, 72, 100] } ],
      knob: { label: "Shared-core reach", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A short-reaching core point touches at most one of the two points.", tone: "info" },
        { max: 3, text: "Extend its density-reachability and a single core point can reach both points at once.", tone: "info" },
        { max: 4, text: "🤯 Two points both density-reachable from one common core point ARE density-connected — DBSCAN's definition of one cluster.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Density-connected", formula: "∃ core o : p and q are both density-reachable from o",
        text: "Symmetric link through a shared core; a cluster is a maximal density-connected set." }
    }
  });

  add("dbscan1", {
    q: "In DBSCAN, what is a 'cluster'?",
    choices: [
      "A maximal set of density-connected points — every pair connected through core points, and nothing more can be added",
      "The set of all points that happen to fall within a fixed radius of a chosen centre",
      "A group of exactly min_samples points chosen as the cluster's seed",
      "The collection of points assigned the same label −1 by the algorithm",
      "Any group of points that share the same nearest centroid"
    ],
    explain: "In DBSCAN a cluster is defined as a maximal set of density-connected points: it contains every point density-reachable from its core points and cannot be extended further. Such a cluster consists of its core points plus the border points attached to them, and it can take on any shape a dense region has. Points that belong to no such set are noise.",
    simple: "A DBSCAN cluster is a whole crowd of points all linked together through dense core points, grown until nothing more can join. It has no fixed shape — it just follows wherever the density goes. Anything left over is noise.",
    widget: {
      type: "curveStatic", title: "Grow until nothing more joins",
      world: "Expanding a cluster from its core points by pulling in every density-connected point until it is maximal.",
      xlab: "cluster expansion →", xs: [0,1,2,3,4], labels: ["seed","grow","more","most","maximal"], dec: 0, yunit: "%",
      series: [ { name: "of the dense region captured (%)", ys: [8, 30, 55, 80, 100] } ],
      knob: { label: "Expansion", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "It begins as a single core point and its immediate neighbours.", tone: "info" },
        { max: 3, text: "Density-connected points keep getting absorbed, and the group follows the dense region's shape.", tone: "info" },
        { max: 4, text: "🤯 The maximal set of density-connected points, unable to grow further, IS a DBSCAN cluster.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "DBSCAN cluster", formula: "maximal set of mutually density-connected points",
        text: "Core points plus their border points; any shape, grown until it can grow no more." }
    }
  });

  add("dbscan1", {
    q: "What is the 'k-distance graph' used to choose eps in DBSCAN?",
    choices: [
      "A plot of each point's distance to its k-th nearest neighbour, sorted ascending, whose 'knee' suggests a good eps value",
      "A plot of inertia against the number of clusters k to find the elbow",
      "A histogram of how many points fall in each cluster after DBSCAN runs",
      "A chart of the silhouette score against different values of min_samples",
      "A map showing the straight-line distances between every pair of clusters"
    ],
    explain: "To pick eps, a common heuristic computes, for every point, the distance to its k-th nearest neighbour (with k typically set to min_samples), then plots these values sorted from smallest to largest. Most points inside clusters have small k-distances, so the curve stays low and then bends sharply upward where noise points begin — the 'knee'. Reading eps off that knee separates dense regions from sparse ones.",
    simple: "For each point you measure how far away its k-th closest neighbour is, then line those numbers up from small to large. The curve stays flat then suddenly shoots up; that bend is a good eps. Below it are the crowded points, above it the loners.",
    widget: {
      type: "curveStatic", title: "Find the knee for eps",
      world: "Walking along points sorted by their k-th-nearest-neighbour distance, from the densest to the sparsest.",
      xlab: "points sorted by k-distance →", xs: [0,1,2,3,4], labels: ["densest","dense","mid","sparse","noise"], dec: 0, yunit: "",
      series: [ { name: "distance to k-th nearest neighbour", ys: [3, 5, 8, 14, 40] } ],
      knob: { label: "Sorted position", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Points deep inside clusters have very small distances to their k-th neighbour.", tone: "info" },
        { max: 3, text: "The sorted curve stays low across the dense points, then bends sharply upward at the sparse ones.", tone: "info" },
        { max: 4, text: "🤯 That sorted plot of k-th-neighbour distances, whose knee marks a good eps, IS the k-distance graph.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "k-distance graph", formula: "sort points by distance to k-th nearest neighbour · read eps at the knee",
        text: "The bend separates dense points from noise, suggesting eps for DBSCAN." }
    }
  });

  add("dbscan1", {
    q: "What is 'HDBSCAN'?",
    choices: [
      "A hierarchical extension of DBSCAN that varies the density threshold and extracts the most stable clusters, removing the need to pick a single eps",
      "A faster version of DBSCAN that only samples half the data before clustering",
      "A supervised classifier trained on the clusters that DBSCAN discovers",
      "A rule for setting min_samples equal to the number of features in the data",
      "A method that forces every point, including noise, into exactly one cluster"
    ],
    explain: "HDBSCAN (Hierarchical DBSCAN) builds on DBSCAN by considering a whole range of density levels instead of one fixed eps. It constructs a hierarchy of clusters across densities and then selects the clusters that persist most stably over that range. This lets it find clusters of differing densities and spares the user from choosing eps, while still labelling sparse points as noise.",
    simple: "HDBSCAN is DBSCAN's smarter cousin: instead of making you pick one eps, it tries many density levels and keeps the groups that stay solid across them. That means it can handle clusters that are not all equally dense. It still calls the leftover sparse points noise.",
    widget: {
      type: "curveStatic", title: "Keep the clusters that persist",
      world: "Scanning across density levels and measuring how stable each candidate cluster stays as the threshold changes.",
      xlab: "range of density levels considered →", xs: [0,1,2,3,4], labels: ["one","few","some","many","full sweep"], dec: 0, yunit: "%",
      series: [ { name: "clusters found across varied density (%)", ys: [40, 55, 68, 80, 90] } ],
      knob: { label: "Density levels swept", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "At a single fixed density (like plain DBSCAN) clusters of other densities are missed.", tone: "info" },
        { max: 3, text: "Sweeping many density levels reveals a hierarchy, and the most persistent clusters stand out.", tone: "info" },
        { max: 4, text: "🤯 Building a density hierarchy and keeping the most stable clusters, no eps required, IS HDBSCAN.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "HDBSCAN", formula: "vary density → cluster hierarchy → extract most stable clusters",
        text: "Hierarchical DBSCAN; handles varied densities and needs no single eps." }
    }
  });

}());
