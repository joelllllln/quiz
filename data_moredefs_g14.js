/* More core definitions (batch 14): k-means, hierarchical clustering, DBSCAN, PCA,
   t-SNE, feature engineering. Simple, central vocabulary each topic was still missing.
   DEFS-tagged with reveals. Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function def(qk, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1;
  }

  /* ===== K-Means (kmeans1) — 8 ===== */

  def("kmeans1",
    "What does a fitted KMeans model's labels_ attribute contain?",
    "One cluster index per training row — which cluster each point was assigned to.",
    ["The human-readable names the algorithm invented for each cluster.",
     "The true class labels it recovered from the unsupervised structure.",
     "The list of rows it identified as outliers and excluded from clustering.",
     "The importance ranking of the features used to form the clusters."],
    "labels_ (cluster assignments)",
    "After fit, labels_ is an array like [2, 0, 0, 1, …]: row i belongs to cluster labels_[i]. The numbers identify groups — they carry no meaning or order.",
    "labels_ is the clustering's primary output — what you join back onto the data for analysis, colour scatterplots by, and feed to evaluation indices like silhouette.",
    "The group number stamped on every row.");

  def("kmeans1",
    "How does a fitted k-means model assign a brand-new point to a cluster?",
    "It gives it the label of the nearest centroid — no retraining involved.",
    ["It cannot; k-means must be entirely refitted whenever new data arrives.",
     "It finds the new point's nearest neighbour and copies that point's label.",
     "It assigns the cluster whose members have the closest average label.",
     "It places it in the smallest cluster to keep the sizes balanced."],
    "Assigning new points (predict)",
    "The centroids ARE the model: predict(x) measures distance from x to each of the k centroids and returns the closest. Cheap, instant, no refit.",
    "This gives k-means something density methods like DBSCAN lack natively — a predict method — and makes it usable as a live component (e.g. routing new customers to segments).",
    "New arrival? Walk to the nearest flag.");

  def("kmeans1",
    "What comparison defines a good clustering in the k-means sense?",
    "Points close to their own centroid (tight within) and centroids far apart (separated between).",
    ["Every cluster containing exactly the same number of assigned points.",
     "Cluster labels matching the alphabetical order of the training rows.",
     "The total distance between all pairs of points being minimised.",
     "Each feature contributing equally to every cluster's centroid."],
    "Within- vs between-cluster distance",
    "Quality has two ingredients: cohesion (small distances inside a cluster — what inertia measures) and separation (large distances between clusters — what inertia ignores but silhouette includes).",
    "The pair explains the metrics zoo: inertia only sees cohesion (so it always improves with k), while silhouette, Davies-Bouldin and Calinski-Harabasz all score cohesion against separation.",
    "Tight teams, far apart — both halves matter.");

  def("kmeans1",
    "Why do outliers cause trouble for k-means specifically?",
    "Centroids are means, and means get dragged toward extreme points, distorting clusters.",
    ["Outliers crash the algorithm because distances to them cannot be computed.",
     "Outliers always form their own clusters, which is the desired behaviour.",
     "K-means deletes outliers automatically, silently shrinking the dataset.",
     "They only affect the colours used when the clusters are plotted."],
    "Outliers drag centroids",
    "A single far-away point pulls its cluster's mean off the group's true centre — squared distances amplify the pull. The distorted centroid then mis-assigns border points.",
    "The mean/median distinction ports straight into clustering: k-medoids and trimming exist precisely because k-means inherits the mean's outlier fragility.",
    "One eccentric guest drags the table's average — and the whole seating plan warps.");

  def("kmeans1",
    "How do you interpret what a k-means cluster means?",
    "Read its centroid — the average feature values describe the cluster's typical member.",
    ["Look up the cluster's meaning in the metadata k-means generates during fit.",
     "Interpretation is impossible because clustering is an unsupervised method.",
     "Take the first member of the cluster as its definitive representative.",
     "Average the cluster's labels to recover its underlying true class."],
    "Interpreting centroids",
    "Each centroid is a profile: 'cluster 2 averages high spend, low tenure, many support calls'. Comparing centroid values across clusters (on the standardised scale) names the segments.",
    "This is where clustering meets business value — the centroid table is the deliverable — and why running k-means on interpretable features beats clustering opaque embeddings when humans consume the result.",
    "Each cluster's average member is its self-portrait.");

  def("kmeans1",
    "Besides statistical indices, what often decides the number of clusters in practice?",
    "Domain needs — like how many segments a team can actually act on.",
    ["The square root of the number of rows, which is provably optimal.",
     "The number of CPU cores available for the training computation.",
     "The count of features, since k must never exceed dimensionality.",
     "Whatever k makes all clusters exactly the same size."],
    "Choosing k from domain needs",
    "The elbow and silhouette advise, but 'we can run five distinct campaigns' or 'the wards have four staffing tiers' legitimately fixes k. Usefulness is a valid criterion in unsupervised work.",
    "There is usually no single true k — data supports several granularities — so the honest workflow brackets a range with indices, then lets the use-case pick within it.",
    "Sometimes k is a business decision the maths just has to respect.");

  def("kmeans1",
    "In the k-means loop, what makes an iteration 'improve' the clustering?",
    "Both steps can only lower inertia: reassignment finds closer centroids, updating recentres them.",
    ["Each iteration adds one new centroid until the elbow point is reached.",
     "Random mutations to the centroids are kept only if a human approves.",
     "The learning rate shrinks the centroids' coordinates toward the origin.",
     "Iterations alternate between increasing and decreasing the objective."],
    "Monotone descent (why the loop converges)",
    "Assign points to their nearest centroid: inertia can't rise. Move each centroid to its members' mean: inertia can't rise. A bounded quantity that never increases must settle — hence guaranteed convergence.",
    "The same argument shows what ISN'T guaranteed: it stops at the first basin it reaches — a local minimum — which is exactly the gap n_init and k-means++ exist to cover.",
    "Every move goes downhill, so the walk must end — though maybe in the wrong valley.");

  def("kmeans1",
    "What does an extremely small or empty cluster in a k-means result usually indicate?",
    "Too many centroids, an outlier capturing its own cluster, or an unlucky initialisation.",
    ["A perfectly healthy clustering; sizes are expected to vary this way.",
     "That the data was insufficiently shuffled before the algorithm ran.",
     "A bug in the library, since k-means guarantees balanced clusters.",
     "That the features were scaled when they should not have been."],
    "Degenerate clusters (reading the sizes)",
    "Cluster sizes are a free diagnostic: a two-point cluster is often one outlier plus its echo; several near-empty clusters suggest k is too high or a poor start survived.",
    "Checking value_counts on labels_ takes seconds and catches pathologies indices can miss — the habit of inspecting the clustering, not just scoring it.",
    "A club with two members is usually a sign something's off — check k and the outliers.");

  /* ===== Hierarchical Clustering (hier1) — 8 ===== */

  def("hier1",
    "What practical advantage does hierarchical clustering have over k-means regarding the number of clusters?",
    "No k is needed upfront — build the full tree once, then choose the granularity afterwards.",
    ["It computes the single provably correct number of clusters automatically.",
     "It always produces exactly two clusters, removing the choice entirely.",
     "It lets each feature specify its own preferred number of clusters.",
     "It requires k in advance but tolerates wrong values more gracefully."],
    "No k required upfront",
    "The dendrogram contains every clustering from n singletons to one blob; cutting it at different heights yields any k you like — one fit, many granularities.",
    "This inverts the k-means workflow (choose k → fit): here you fit → explore → choose, which suits exploratory analysis where the right granularity is part of what you're discovering.",
    "Grow the whole family tree first; decide how many branches to keep later.");

  def("hier1",
    "What is the big-jump rule for choosing where to cut a dendrogram?",
    "Cut where the merge distance jumps sharply — clusters below that were natural, above it forced.",
    ["Always cut at exactly half the height of the dendrogram's tallest merge.",
     "Cut immediately below the first merge that combines more than two points.",
     "Choose the height at which every cluster contains the same population.",
     "Cut at the average of all the merge heights recorded in the tree."],
    "The big-jump rule",
    "Merge heights grow gradually while similar groups combine, then leap when the algorithm is forced to weld genuinely different clusters. The leap marks the natural stopping point.",
    "It's the dendrogram's version of the elbow: read the gaps in merge heights (the linkage matrix's third column) rather than eyeballing — the largest gap suggests the cut.",
    "Cut the tree just below its biggest growth spurt.");

  def("hier1",
    "What input does hierarchical clustering fundamentally operate on?",
    "Pairwise distances between points — it needs no coordinates, only a distance for every pair.",
    ["The raw labels of a previous supervised model, which it refines into groups.",
     "A grid discretisation of the feature space into equal-sized cells.",
     "The class balance of the dataset, which fixes the linkage order.",
     "A target variable, since the hierarchy is built to predict it."],
    "Pairwise-distance input",
    "Agglomeration only ever asks 'how far apart are these two (groups of) points?' — so a precomputed distance matrix suffices: strings with edit distance, genomes, questionnaires.",
    "This is a real superpower over k-means, which needs coordinates to average into centroids; hierarchical clustering works wherever any sensible pairwise dissimilarity can be defined.",
    "Give it the table of gaps between everything — coordinates optional.");

  def("hier1",
    "What is the main scalability limitation of classic agglomerative clustering?",
    "The pairwise distance matrix and merge bookkeeping scale ~quadratically, choking on large n.",
    ["It cannot handle datasets with more than about twenty feature columns.",
     "Its recursion depth is limited by the programming language's stack size.",
     "It must store one copy of the dataset for every cluster it produces.",
     "Random initialisation forces dozens of restarts on large datasets."],
    "Quadratic scalability limit",
    "n points mean ~n²/2 pairwise distances just to start — a million points implies half a trillion pairs. Tens of thousands of rows is the comfortable ceiling for the classic algorithm.",
    "The limit defines its niche (rich analysis of modest datasets) and its workarounds: subsample first, or switch to scalable relatives like BIRCH or MiniBatchKMeans when n explodes.",
    "Comparing everyone with everyone is lovely — until there are a million everyones.");

  def("hier1",
    "What structural property do hierarchical clusterings have that flat clusterings lack?",
    "Nesting: every cluster sits inside a larger parent cluster, forming levels of granularity.",
    ["Every cluster is guaranteed to contain exactly the same number of points.",
     "Clusters are convex shapes that can never overlap in feature space.",
     "Each cluster is assigned a probability rather than a hard membership.",
     "The clusters align with the axes of the original feature space."],
    "Nested clusters (the hierarchy property)",
    "Species within genus within family: the output is not one partition but a tree of partitions, coarse to fine, each level refining the one above.",
    "Nesting matches how many domains actually organise (taxonomies, org charts, product catalogues), which is why 'hierarchical' is often chosen for the structure, not just the clusters.",
    "Groups inside groups inside groups — a zoom lens, not a single snapshot.");

  def("hier1",
    "How should you choose which linkage to use in practice?",
    "Ward as the general default for compact clusters; single for chains; validate visually with the dendrogram.",
    ["Always single linkage, since it is the only one with a theoretical guarantee.",
     "The linkage never changes results, so choose whichever runs the fastest.",
     "Choose by dataset size: complete under a thousand rows, Ward above.",
     "Use whichever linkage produces clusters of exactly equal size."],
    "Which linkage to choose",
    "Ward (variance-minimising) is the robust default and sklearn's; single linkage uniquely finds elongated chains but collapses via chaining; complete/average sit between. Different linkages = different cluster-shape beliefs.",
    "Because each linkage answers 'how far apart are two groups?' differently, trying two or three and comparing dendrograms is cheap due diligence, not indecision.",
    "Ward for blobs, single for snakes — and let the dendrogram referee.");

  def("hier1",
    "In a dendrogram plot, what do the leaves along the bottom represent?",
    "The individual data points, each starting as its own cluster before any merging.",
    ["The features of the dataset, ordered by their importance to the clustering.",
     "The final clusters remaining after the tree has been cut at the top.",
     "The outliers that the algorithm refused to merge into any cluster.",
     "Checkpoints saved during training for later resumption."],
    "Dendrogram leaves",
    "Reading from the bottom: every leaf is one observation; moving upward, vertical joins record merges at the height (distance) where they happened, until one root remains.",
    "Orienting the axes — leaves are points, height is dissimilarity — is the prerequisite for every dendrogram skill: cutting, the big-jump rule, spotting outliers as late-merging singletons.",
    "The bottom row is the individuals; the tree above is the story of their joining.");

  def("hier1",
    "What does it mean that agglomerative merges are greedy and irreversible?",
    "Each merge is locally best and never undone — one early misstep propagates up the tree.",
    ["The algorithm retries every merge until a globally optimal tree is found.",
     "Merges can be rolled back whenever a later, better partner appears.",
     "Greedy refers to memory consumption, not to the merge decisions.",
     "It means ties between equal merges are broken by coin flip."],
    "Greedy, irreversible merging",
    "At each step the closest pair merges, permanently. No backtracking: if noise glues two clusters early, every level above inherits the weld.",
    "This is the same greedy character as decision-tree splitting — fast, sensible, not globally optimal — and a reason to sanity-check dendrograms rather than trust them as ground truth.",
    "Weddings, not dates: once merged, forever merged — even the hasty ones.");

  /* ===== DBSCAN (dbscan1) — 8 ===== */

  def("dbscan1",
    "What are the three roles DBSCAN assigns to points?",
    "Core (dense interior), border (near a core, not dense itself), and noise (neither).",
    ["Anchor, satellite, and ghost — assigned by their distance to the data mean.",
     "Training, validation, and test — a split it performs automatically.",
     "Leader, follower, and independent — based on the arrival order of points.",
     "Heavy, light, and empty — based on each point's feature magnitudes."],
    "The three point roles",
    "Every point ends up exactly one of: core (≥ min_samples neighbours within eps), border (within eps of a core but not core itself), or noise (labelled −1).",
    "The trio IS the algorithm's vocabulary: clusters are built from cores, edged by borders, and everything else is honestly declared noise — the taxonomy to check first when a result surprises.",
    "Insiders, hangers-on, and loners.");

  def("dbscan1",
    "What symptoms distinguish an eps set too small from one set too large?",
    "Too small: most points become noise, clusters shatter. Too large: everything fuses into one blob.",
    ["Too small: training never terminates. Too large: it finishes instantly.",
     "Too small: clusters overlap heavily. Too large: too many tiny clusters.",
     "Both errors produce identical results, which is why eps is untunable.",
     "Too small: memory explodes. Too large: the labels become random."],
    "eps too small vs too large",
    "eps defines 'nearby'. Stingy eps finds density nowhere — noise everywhere, fragments; generous eps finds density everywhere — one mega-cluster. Between lies the informative range.",
    "The symptom table turns tuning into diagnosis: lots of −1 labels → raise eps; one giant cluster → lower it; and the k-distance plot proposes the starting value.",
    "Too tight: everyone's a stranger. Too loose: the whole city is one crowd.");

  def("dbscan1",
    "What effect does raising min_samples have on a DBSCAN result?",
    "Stricter density demands: fewer core points, more noise, and only solid clusters survive.",
    ["It increases the number of clusters by allowing smaller ones to form.",
     "It has no effect unless eps is simultaneously lowered by the same factor.",
     "It speeds up the algorithm by skipping that many points between queries.",
     "It forces every cluster to contain at least that many border points."],
    "Raising min_samples (stricter density)",
    "min_samples is the evidence bar for calling a region dense. Raising it dissolves thin, straggly clusters into noise and keeps only convincing concentrations.",
    "It's the robustness dial: noisy data earns a higher bar. Tune it coarsely first (rule of thumb ≈ 2 × dims), then read eps off the matching k-distance plot.",
    "Demand a bigger quorum before declaring a crowd.");

  def("dbscan1",
    "What does it mean if DBSCAN labels almost every point as noise (−1)?",
    "No region met the density bar — eps/min_samples are mistuned for the data's scale, or there are no dense clusters.",
    ["The clustering succeeded: noise-majority outputs are the expected result.",
     "The dataset contains too many features for density to be defined.",
     "The algorithm ran out of iterations before finishing its expansion.",
     "The points were processed in an unlucky order and need reshuffling."],
    "The all-noise outcome",
    "An honest but unhelpful answer: under the current definition of 'dense', nothing qualifies. Usual culprits: unscaled features distorting eps, eps far below the k-distance elbow, or genuinely diffuse data.",
    "Unlike k-means — which always returns k clusters, meaningful or not — DBSCAN can say 'I found nothing', and reading that as a tuning signal rather than a failure is part of using it well.",
    "'Everyone is a loner' usually means your ruler is wrong, not your data.");

  def("dbscan1",
    "How does the number of clusters get determined in DBSCAN?",
    "It emerges from the data — however many dense regions exist at the given eps and min_samples.",
    ["It is passed as the parameter k, exactly as in the k-means algorithm.",
     "It always equals the number of core points divided by min_samples.",
     "The user caps it, and extra clusters are merged into the largest one.",
     "It equals the number of features unless the data is standardised."],
    "Cluster count is discovered",
    "DBSCAN never asks for k: expansion from core points finds however many separate dense islands the density definition implies — three today, seven on richer data.",
    "The count is output, not input — the deepest contrast with k-means — though it's indirectly steered by eps/min_samples, so 'no k' doesn't mean 'no tuning'.",
    "You don't order a number of clusters; the density serves what it finds.");

  def("dbscan1",
    "Why does feature scaling matter for DBSCAN in particular?",
    "One global eps must fit every dimension, so unscaled features warp all neighbourhoods at once.",
    ["It doesn't; density definitions are invariant to any feature scaling.",
     "Scaling matters only when min_samples is smaller than the dimensionality.",
     "DBSCAN requires values in [0,1] or its region queries return errors.",
     "Scaling merely speeds up the spatial index without changing results."],
    "Feature scaling for DBSCAN",
    "eps is a single radius applied in every direction: with income in thousands and age in years, the sphere of radius eps is effectively an income-only interval — age stops mattering.",
    "Same law as KNN and k-means (distance methods share their preprocessing), but stricter here: eps is global and absolute, so standardise first, then tune eps on the standardised scale.",
    "One radius for all directions only works when all directions speak the same units.");

  def("dbscan1",
    "In sklearn's DBSCAN output, how are noise points reported?",
    "With the special label −1 in labels_, distinct from all real cluster indices.",
    ["They are silently removed, so labels_ is shorter than the input data.",
     "They receive the label of the nearest cluster, flagged in a second array.",
     "They are collected into a cluster of their own with the highest index.",
     "They cause fit to raise an exception unless allow_noise is enabled."],
    "The −1 noise label",
    "labels_ mixes cluster ids (0, 1, 2, …) with −1 for noise. Cluster count = number of distinct non-negative labels; noise share = fraction of −1s.",
    "Forgetting the convention corrupts analyses — a groupby that treats −1 as 'cluster minus-one' averages the outliers into a phantom segment. Filter or handle it explicitly.",
    "Minus one means 'filed under: belongs nowhere'.");

  def("dbscan1",
    "As a summary, when is DBSCAN the right tool to reach for?",
    "Arbitrary-shaped clusters, unknown k, and outliers you want isolated — at roughly uniform density.",
    ["Whenever the clusters are known to be spherical and equal in size.",
     "When the dataset is enormous and only linear-time algorithms are viable.",
     "When every point must be assigned to a cluster with no exceptions.",
     "When cluster probabilities rather than hard labels are required."],
    "When to use DBSCAN",
    "Its sweet spot combines three needs no other basic method covers at once: non-convex shapes (moons, rings), k discovered rather than declared, and native noise isolation.",
    "Its weaknesses complete the decision: varying densities (one global eps fails), high dimensions (distance concentration), and the need to label new points cheaply favour alternatives.",
    "Weird shapes, unknown count, real outliers — that's DBSCAN weather.");

  /* ===== PCA (pca1) — 8 ===== */

  def("pca1",
    "What are the main practical reasons to reduce dimensionality?",
    "Speed and memory, noise removal, fighting the curse of dimensionality, and visualisation.",
    ["To increase the number of parameters available for the model to learn.",
     "To guarantee that all features become statistically independent.",
     "To make the dataset larger by interpolating between the rows.",
     "To convert unsupervised problems into supervised ones."],
    "Why reduce dimensions",
    "Fewer columns mean faster training, smaller models, distances that behave better, less noise for downstream models to overfit — and, at 2–3 dimensions, pictures humans can read.",
    "Naming the goal first matters because it picks the tool and the budget: visualisation wants 2 components, preprocessing wants 'enough for 95% variance' — same method, different dials.",
    "Fewer columns: faster, cleaner, plottable.");

  def("pca1",
    "How is PCA used to visualise a high-dimensional dataset?",
    "Project onto the first two components and scatter-plot them — the least-lossy 2-D linear view.",
    ["Plot every pairwise feature scatter and overlay them in a single figure.",
     "Draw one bar chart per component showing its loading magnitudes.",
     "Map the first three features to red, green and blue colour channels.",
     "PCA cannot visualise data; that requires t-SNE or UMAP instead."],
    "PCA for 2-D visualisation",
    "fit, take components one and two, scatter, colour by any label of interest: the standard first picture of any wide dataset, showing clumps, gradients and outliers.",
    "Check the two components' explained-variance share before trusting the picture — 80% means a faithful sketch, 15% means most structure is invisible — an honesty check t-SNE can't offer.",
    "Squash to the two best axes and just look at it.");

  def("pca1",
    "What is lost when you keep only the top components of a PCA?",
    "The variation along the dropped directions — gone from the data and from any reconstruction.",
    ["Nothing; PCA compression is exactly reversible from the kept components.",
     "Only the feature names, which can be restored from the loadings matrix.",
     "The ordering of the rows, which must be re-sorted after transforming.",
     "The scale of the data, which the inverse transform cannot recover."],
    "Information loss (dropped variance)",
    "Keeping 10 of 50 components keeps the 10 highest-variance directions; whatever distinguished points along the other 40 is flattened away — reconstruction returns only the kept part.",
    "The loss is measured, not mysterious: it's exactly 1 − cumulative explained variance, and whether it's 'noise removed' or 'signal destroyed' depends on whether variance tracks importance for your task.",
    "Compression pays in detail — and the receipt says exactly how much.");

  def("pca1",
    "What is the common variance-based rule for choosing n_components?",
    "Keep enough components to cover a target like 95% of total variance — or pass 0.95 to sklearn directly.",
    ["Always keep exactly ten components, the standard across all datasets.",
     "Keep components until each remaining one explains at least half the total.",
     "Use the square root of the original number of features, rounded up.",
     "Keep every component whose loadings are all positive numbers."],
    "The 95% variance rule",
    "Sort components by variance, take the smallest prefix whose cumulative share clears the bar (90/95/99% by taste); sklearn's PCA(n_components=0.95) does it in one argument.",
    "It's a defensible default rather than an optimum — for a downstream model, cross-validating n_components directly measures what actually matters; the scree plot's elbow offers a second opinion.",
    "Keep enough axes to hold 95% of the story.");

  def("pca1",
    "What do PCA's transform and inverse_transform do?",
    "transform maps data into component coordinates; inverse_transform maps back, minus the dropped detail.",
    ["transform standardises the features; inverse_transform de-standardises them.",
     "transform trains the rotation; inverse_transform undoes the training.",
     "transform compresses the rows; inverse_transform restores deleted rows.",
     "They encrypt and decrypt the dataset using the components as a key."],
    "transform / inverse_transform",
    "transform projects each row onto the kept components (new coordinates); inverse_transform re-expands to the original feature space — landing on the low-dimensional approximation, not the original point.",
    "The round trip is the reconstruction: its per-row error powers PCA anomaly detection, and its gap from the original is precisely the discarded variance made visible.",
    "Into the summary coordinates, and back out — slightly smoothed.");

  def("pca1",
    "Why are principal components often hard to interpret?",
    "Each is a blend of all original features, so it has no ready-made real-world name.",
    ["Their values are encrypted to protect the original data's privacy.",
     "They are stored in a binary format that resists inspection.",
     "Because they are random directions redrawn on every fit.",
     "They aren't; each component equals exactly one original feature."],
    "Interpretation loss (components are blends)",
    "PC1 might be 0.4·income + 0.35·spend − 0.2·age + …: a direction, not a variable. Naming it ('affluence?') is a human act of reading the loadings, not a property of the maths.",
    "This is the standing trade against feature selection, which keeps meaningful columns; loadings inspection (or a biplot) partially recovers meaning, and sometimes 'fast and accurate' rightly outranks 'nameable'.",
    "The new axes are smoothies — nutritious, but no single ingredient.");

  def("pca1",
    "Does PCA use the target variable y?",
    "No — it is unsupervised, maximising variance with no regard for what predicts the target.",
    ["Yes; components are ranked by their correlation with the target.",
     "Only in classification tasks, where it separates class means.",
     "Yes, but only to decide how many components to retain.",
     "Only when whitening is enabled, which requires labels."],
    "PCA ignores the target",
    "fit(X) never sees y: components chase variance, and a direction can be huge in variance yet useless for prediction (or small yet decisive).",
    "The caveat governs its use as preprocessing — cross-validate the pipeline to confirm the kept components help — and points to supervised siblings (LDA, PLS) when target-aware axes are wanted.",
    "It organises the inputs beautifully, without ever asking what you're predicting.");

  def("pca1",
    "How does PCA act as a speed-up for downstream models?",
    "It shrinks the feature count, so everything after it trains and predicts on far less data width.",
    ["It caches the model's gradients so later epochs can skip computation.",
     "It compiles the downstream model into faster native machine code.",
     "It reduces the number of training rows by merging similar examples.",
     "It doesn't; PCA always slows pipelines down for accuracy's sake."],
    "PCA as preprocessing (speed-up)",
    "500 columns → 30 components can turn an hours-long kernel-method or search grid into minutes, often with negligible accuracy cost — and sometimes a gain, via the noise it sheds.",
    "The pattern 'PCA → estimator' inside a Pipeline (with n_components cross-validated) is the standard template; fit PCA on training folds only, like any learned transform.",
    "Shrink the width first; everything downstream gets lighter.");

  /* ===== t-SNE (tsne1) — 7 ===== */

  def("tsne1",
    "What is t-SNE actually for?",
    "Visual exploration: making 2-D maps of high-dimensional data — not general preprocessing.",
    ["Producing compressed features that improve downstream model accuracy.",
     "Imputing missing values by placing points near their neighbours.",
     "Selecting the most informative features from wide datasets.",
     "Balancing imbalanced classes by generating synthetic points."],
    "Visualisation-only tool",
    "t-SNE's objective, distortions and non-parametric nature are all tuned for one deliverable: a picture that reveals neighbourhood structure to a human eye.",
    "Its outputs make poor model features (unstable, non-transferable to new points, distance-distorting) — PCA or UMAP serve pipelines; t-SNE serves understanding.",
    "It draws maps for eyes, not features for models.");

  def("tsne1",
    "What is the typical useful range for t-SNE's perplexity?",
    "Roughly 5 to 50, and always below the number of points.",
    ["Exactly 1000, regardless of the size or nature of the dataset.",
     "Between 0 and 1, since perplexity is expressed as a probability.",
     "Above the number of features, or the algorithm fails to converge.",
     "Any value works identically; perplexity is a display setting."],
    "Typical perplexity range (5–50)",
    "The maps degenerate outside it: below ~5, fragmentation artifacts; above ~50 (or near n), oversmoothed blobs. Default 30 suits most mid-sized datasets.",
    "The range is a guardrail, not a target — the deeper habit is the sweep (try 5/30/50) with n's size in mind, trusting only what persists.",
    "Single digits to a few dozen — and never bigger than your dataset.");

  def("tsne1",
    "How do t-SNE and PCA differ in what they preserve?",
    "PCA preserves global variance linearly; t-SNE sacrifices global layout to keep local neighbourhoods.",
    ["They are numerically identical whenever the data has two clusters.",
     "t-SNE preserves the original axes while PCA invents new ones.",
     "PCA keeps neighbours together while t-SNE keeps distances exact.",
     "t-SNE is PCA plus a final rotation for aesthetic reasons."],
    "t-SNE vs PCA",
    "PCA: one honest linear projection — global distances roughly meaningful, clusters may overlap. t-SNE: a nonlinear layout where neighbours stay adjacent but large-scale geometry is fiction.",
    "Complementary, not competing — the standard workflow literally chains them (PCA to ~50 dims, then t-SNE), and reading each map requires knowing which promises it makes.",
    "PCA keeps the world map roughly right; t-SNE redraws it so every friend group sits together.");

  def("tsne1",
    "How does t-SNE behave on large datasets, and what is the standard mitigation?",
    "It gets slow quickly; subsample the rows and/or PCA-reduce the columns before running it.",
    ["It becomes faster per point as the dataset grows, due to caching.",
     "It streams data in mini-batches natively, so size is never an issue.",
     "It automatically switches itself off above one million rows.",
     "Large data only affects memory, never the running time."],
    "Slow on large data (subsample first)",
    "Even Barnes-Hut t-SNE strains beyond ~50–100k points. A random 10k subsample usually reveals the same cluster structure in a fraction of the time.",
    "Sampling is statistically safe for the purpose — a map of a representative sample shows the same neighbourhoods — and pairing it with PCA pre-reduction is the standard big-data recipe (or switch to UMAP).",
    "Don't map every grain of sand — a good handful shows the beach.");

  def("tsne1",
    "What do the x and y axes of a t-SNE plot mean?",
    "Nothing individually — only local proximity carries meaning; the axes are arbitrary.",
    ["x is the first principal component and y the second, rescaled.",
     "They are the two features the algorithm found most important.",
     "x encodes cluster identity and y encodes outlier score.",
     "They are longitude and latitude in the data's natural geometry."],
    "Map axes have no meaning",
    "Unlike PCA (where axes are variance-ranked directions with loadings), t-SNE coordinates are free-floating: rotate, flip or translate the map and it's the same solution.",
    "So: no reading 'high on axis 1', no axis labels, no comparing coordinates across runs — neighbourhood membership is the only currency the plot trades in.",
    "It's a seating chart, not a graph — the room has no north.");

  def("tsne1",
    "What is the standard way to actually read a t-SNE map?",
    "Colour points by known labels or attributes and see whether they organise into coherent regions.",
    ["Measure the areas of the clusters to estimate class probabilities.",
     "Read each point's coordinates as its two most important features.",
     "Count the white space between clusters to quantify their separation.",
     "Overlay a regression line to detect trends across the embedding."],
    "Colouring by labels (reading the map)",
    "The map gives positions; meaning arrives when you paint it — by class, cluster id, or a metadata column. Labels gathering into islands = features encode that structure locally.",
    "Colouring by metadata like batch or date is also the classic artefact detector (batch effects appear as islands) — while sizes, densities and inter-island gaps stay off-limits for conclusions.",
    "The map is a colouring book — the insight appears when you fill it in.");

  def("tsne1",
    "Two classes form separate islands in a t-SNE plot. What can you reasonably conclude?",
    "Their feature neighbourhoods are locally distinct — a hopeful sign, not a classifier guarantee.",
    ["A classifier will achieve at least 95% accuracy separating these classes.",
     "The distance between the islands equals the classes' true separation.",
     "The larger island's class must contain more training examples.",
     "Nothing at all; t-SNE plots carry no usable information."],
    "Reading separation honestly",
    "Islands mean same-class points are one another's neighbours in feature space — genuine, useful signal. But t-SNE exaggerates gaps and a classifier faces the raw dimensions, not the map.",
    "The honest chain: separation suggests learnable structure → validate with an actual model and CV. Overlap is similarly a hint (features may be insufficient), not a verdict.",
    "Islands are encouragement, not a promise — the model still has to prove it.");

  /* ===== Feature Engineering (feng1) — 8 ===== */

  def("feng1",
    "What does 'garbage in, garbage out' mean for machine learning?",
    "Model quality is capped by input quality — no algorithm rescues wrong or meaningless features.",
    ["Models should delete their worst features automatically during training.",
     "Outputs are unreliable until a model has been retrained at least twice.",
     "Datasets must be emptied and rebuilt between every experiment.",
     "Predictions degrade over time unless servers are regularly cleaned."],
    "Garbage in, garbage out",
    "An algorithm can only rearrange the information you feed it: mislabelled targets, leaky columns and meaningless encodings pass straight through to predictions, however sophisticated the model.",
    "The principle allocates effort — data auditing and feature work before algorithm shopping — and explains why feature engineering remains the highest-leverage stage of most tabular projects.",
    "A gourmet chef can't save rotten ingredients.");

  def("feng1",
    "Why must all features ultimately become numbers?",
    "Models compute — distances, weights, splits — and computation needs numeric inputs.",
    ["Regulations require datasets to be stored in numeric form for auditing.",
     "Strings consume too much memory to be practical during training.",
     "Numbers compress better, which shortens the training time.",
     "They must not; most models operate on raw text directly."],
    "Why models need numbers",
    "Every mechanism downstream — dot products, distance metrics, threshold splits, gradients — is arithmetic. 'Red' can't be multiplied by a weight until it's encoded.",
    "This is feature engineering's founding constraint: encodings (one-hot, ordinal, target, embeddings) are all answers to 'how do we make this numeric without inventing false structure?'.",
    "The machine speaks arithmetic — everything must be translated first.");

  def("feng1",
    "What are the two basic strategies for handling missing values?",
    "Drop the affected rows/columns, or impute — fill the gaps with estimated values.",
    ["Encrypt them or compress them, depending on the column's data type.",
     "Shuffle them into the test set where they cannot affect training.",
     "Replace them with the largest value the column has ever contained.",
     "Report them to the data vendor and pause the project until fixed."],
    "Drop vs impute",
    "Dropping is safe but wasteful (a 5%-missing column can cost 40% of rows if dropped row-wise); imputing keeps the data but injects assumptions. The choice hinges on how much is missing and why.",
    "'Why' is the deeper question — values missing not-at-random (income refusals) carry signal that dropping destroys and naive imputing hides, which is where missingness indicators earn their keep.",
    "Cut out the holes, or fill them in.");

  def("feng1",
    "What is mean/median imputation?",
    "Filling a numeric column's gaps with that column's mean (or the outlier-robust median).",
    ["Replacing the entire column with its average, discarding the real values.",
     "Filling gaps with the mean of the row's other feature values.",
     "Predicting the target's mean for every row that has any gap.",
     "Removing values near the mean to balance the distribution."],
    "Mean/median imputation",
    "The workhorse default (SimpleImputer): cheap, safe, unbiased for the column's centre. Median wins on skewed data, where a few extremes distort the mean.",
    "Its cost is flattened variance and broken correlations at the filled cells — acceptable at low missingness, worth upgrading (KNN or model-based imputation) when gaps are widespread.",
    "Patch the holes with the column's typical value.");

  def("feng1",
    "What is the standard first pipeline for turning raw text into features?",
    "Tokenise, then count word occurrences (bag-of-words), then reweight with TF-IDF.",
    ["Sort the documents alphabetically and use their rank as the feature.",
     "Measure each document's length and use it as the only predictor.",
     "Hash entire documents into single integers to preserve privacy.",
     "Translate all text to English and count only the vowels."],
    "Text-to-features pipeline",
    "The classical stack: split into tokens → count them per document → down-weight ubiquitous words (TF-IDF). Sklearn's TfidfVectorizer does all three in one estimator.",
    "It remains the strong, fast baseline for text classification — embeddings improve on it when meaning-beyond-words matters, at real cost in complexity — and its output pairs perfectly with NB or linear models.",
    "Chop, count, reweight — text becomes a (very wide) table.");

  def("feng1",
    "How do you decide between one-hot and ordinal encoding for a categorical feature?",
    "One-hot for unordered categories; ordinal only when the categories have a genuine order.",
    ["Ordinal always, because it produces fewer columns and trains faster.",
     "One-hot for tree models and ordinal for all linear models, always.",
     "Alternate between them across features to balance the design matrix.",
     "Flip a coin; encoders differ in speed but never in model quality."],
    "Encoding choice (one-hot vs ordinal)",
    "The question is 'is there a real order?': sizes S<M<L, yes → ordinal preserves it; colours red/green/blue, no → one-hot avoids inventing red < green.",
    "A false order misleads distance- and weight-based models badly (trees forgive it more), while one-hot's cost is width on high-cardinality columns — which is where target/frequency encodings enter.",
    "Real ranking → keep it as numbers; mere names → separate switches.");

  def("feng1",
    "What is the high-cardinality problem with categorical features?",
    "Columns like zip code have thousands of values — one-hot explodes and rare levels lack data.",
    ["Categories with long names overflow the feature-name length limit.",
     "High-cardinality features are always leaky and must be deleted.",
     "Models refuse categorical features that exceed 64 distinct values.",
     "It only affects visualisation, since plots run out of colours."],
    "High cardinality",
    "One-hot on 10,000 merchants = 10,000 near-empty columns, most seen a handful of times — memory waste plus severe overfitting risk on the rare levels.",
    "The standard escalation: group rare levels → frequency encoding → target encoding (out-of-fold) or hashing — the whole ladder exists because of this one problem.",
    "A column with ten thousand flavours can't get ten thousand switches.");

  def("feng1",
    "Which models actually need feature scaling, and which don't?",
    "Distance- and gradient-based models (KNN, SVM, k-means, linear/logistic) do; trees and their ensembles don't.",
    ["Every model needs scaling; skipping it always invalidates the results.",
     "No modern model needs scaling; libraries handle it internally now.",
     "Only regression models need it; classifiers are scale-invariant.",
     "Only neural networks need it, and only for image inputs."],
    "Scaling: who needs it",
    "Anything comparing or summing across features (distances, dot products, penalties) inherits their scales; anything thresholding features one at a time (trees, forests, boosting) is scale-blind.",
    "The rule compresses hours of preprocessing doubt into one question — 'does this model mix features arithmetically?' — and explains why pipelines for SVMs start with StandardScaler while XGBoost pipelines skip it.",
    "Rulers and weights need common units; question-askers don't.");

})();
