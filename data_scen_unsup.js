/* Applied Scenarios — unsupervised learning & ML foundations. choices[0] always correct (shuffled at render). */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  function q(qk, o) { (Q[qk] = Q[qk] || []).push(o); }
  function W(title, world, xlab, labels, name, ys, kl, insights, reveal, extra) {
    var w = { type: "curveStatic", title: title, world: world, xlab: xlab, xs: labels.map(function (_, i) { return i; }),
      labels: labels, dec: 0, yunit: "%", series: [{ name: name, ys: ys }],
      knob: { label: kl, min: 0, max: labels.length - 1, step: 1, init: 0 },
      insights: insights, extreme: { at: "max" }, reveal: reveal };
    if (extra && extra.series) w.series = w.series.concat(extra.series);
    if (extra && extra.extreme) w.extreme = extra.extreme;
    return w;
  }

  /* ===================== scen1 — Clear Calls (6) ===================== */

  q("scen1", {
    q: "You run K-Means on customer data for k = 1..8 and plot the total within-cluster sum of squares (inertia). It drops steeply until k = 3, then flattens into a gentle slope. What k should you pick?",
    choices: [
      "k = 3 — the 'elbow' where adding clusters stops buying much reduction in inertia",
      "k = 8 — the largest k gives the lowest inertia, so it fits best",
      "k = 1 — the simplest model is always safest for clustering",
      "Any k works equally; inertia is not informative about cluster count",
      "k = 5 — always choose the midpoint of the range you tested"
    ],
    explain: "Inertia always falls as k rises (with k = n it reaches zero), so lowest inertia never picks k. The elbow method looks for the k where the curve bends — extra clusters past that point shave off only marginal inertia, meaning you are now splitting genuine groups rather than separating real ones. Here the bend is at k = 3, so that is the natural cluster count. Confirming with a silhouette score is good practice.",
    simple: "Adding clusters always tightens the fit a little, so you cannot just pick the lowest score. Look for where the curve stops dropping fast — that bend is your answer.",
    widget: W("The elbow tells you k", "Watch total within-cluster distance (inertia) fall as you add clusters.",
      "number of clusters k →", ["1", "2", "3", "5", "8"],
      "inertia (lower = tighter)", [100, 62, 30, 24, 15], "k",
      [{ max: 1, text: "Inertia drops sharply while you are still separating genuinely different groups.", tone: "info" },
       { max: 2, text: "At k = 3 the steep fall ends — the elbow.", tone: "info" },
       { max: 4, text: "🤯 Past the elbow the curve barely moves: you are just cutting real clusters in half for tiny gains.", tone: "wow" }],
      { name: "Elbow method for k", formula: "pick k at the bend, not the minimum", text: "Choose the k where inertia stops falling steeply — extra clusters beyond it barely help." })
  });

  q("scen1", {
    q: "Your 2D sensor data forms two interleaved crescent (half-moon) shapes plus a scatter of stray outlier points. You want to recover the two crescents and flag the strays. Which algorithm fits best?",
    choices: [
      "DBSCAN — it grows clusters by density, so it can trace arbitrary shapes and label sparse points as noise",
      "K-Means with k = 2 — it will cleanly separate the two crescents",
      "K-Means with k = 3, using the third cluster for the outliers",
      "Ward hierarchical clustering, which always recovers non-convex shapes",
      "PCA to two components, then read the clusters off directly"
    ],
    explain: "K-Means assigns each point to the nearest centroid, which carves space into convex (roughly spherical) regions — it cannot follow a curved crescent and has no notion of noise, so every stray point is forced into a cluster. DBSCAN instead links points that are densely packed together, letting a cluster snake along any shape, and points in low-density regions stay unlabeled as noise. That matches interleaved crescents plus outliers exactly.",
    simple: "K-Means draws round blobs and must give every point a home. DBSCAN follows the crowd wherever it winds and lets loners be loners.",
    widget: W("Density beats centroids on odd shapes", "How well each method recovers two crescent shapes with scattered noise.",
      "method →", ["K-Means k=2", "K-Means k=3", "Ward linkage", "DBSCAN"],
      "crescents recovered correctly", [40, 45, 55, 95], "Method",
      [{ max: 1, text: "K-Means splits space into convex blobs — it slices the crescents the wrong way.", tone: "info" },
       { max: 2, text: "Convex-shape methods still cannot follow a curve or isolate noise.", tone: "info" },
       { max: 3, text: "🤯 DBSCAN traces each crescent by density and drops the strays into a noise label.", tone: "wow" }],
      { name: "Shape & noise handling", formula: "arbitrary shapes + outliers → density (DBSCAN)", text: "For curved clusters and genuine noise, density-based DBSCAN beats centroid-based K-Means." })
  });

  q("scen1", {
    q: "You have 60 gene-expression samples, no idea how many groups exist, and you want to see how samples merge at every level of similarity. Which approach gives you that view directly?",
    choices: [
      "Agglomerative hierarchical clustering, then read the dendrogram to choose where to cut",
      "K-Means with k = 5, because five is a common default",
      "DBSCAN with default eps, which will report the exact number of groups",
      "PCA alone, since the principal components are the clusters",
      "t-SNE, which prints the correct number of clusters as its output"
    ],
    explain: "Agglomerative clustering builds a full merge tree (dendrogram) from individual samples up to one group, so you literally see which samples join first and at what distance. You do not need to pre-commit to k: you inspect the tree and cut it at a height that yields well-separated branches. With only 60 samples the quadratic cost is trivial, and the dendrogram is exactly the 'how do they merge' view you asked for.",
    simple: "A dendrogram is a family tree of your data — it shows who is most closely related and lets you decide afterwards where to draw the line for 'separate families'.",
    widget: W("A dendrogram lets you choose k after the fact", "Cluster separation quality as you cut the merge tree at different heights.",
      "cut height →", ["very low", "low", "medium", "high", "very high"],
      "separation quality", [30, 60, 88, 55, 20], "Cut height",
      [{ max: 1, text: "Cut too low and you get many tiny fragments.", tone: "info" },
       { max: 2, text: "A mid-height cut yields a few clean, well-separated groups.", tone: "info" },
       { max: 4, text: "🤯 The tree is built once; you slide the cut to reveal 2, 3 or 10 clusters without re-running.", tone: "wow" }],
      { name: "Dendrogram cutting", formula: "build tree once, cut where branches are longest", text: "Hierarchical clustering gives a full merge tree; you pick the number of clusters by where you cut it." })
  });

  q("scen1", {
    q: "You will run PCA on a table where 'annual income' spans 0-200000 and 'age' spans 18-90. What must you do first for PCA to be meaningful?",
    choices: [
      "Standardise the features (e.g. z-score) so each contributes on a comparable scale",
      "Nothing — PCA automatically corrects for differing feature scales",
      "Convert income to a categorical band so PCA can handle it",
      "Drop age because it has a much smaller range than income",
      "Run PCA first, then standardise the resulting components"
    ],
    explain: "PCA finds directions of maximum variance, and variance is measured in each feature's own units. Income, with values in the tens of thousands, has vastly larger raw variance than age, so an unstandardised PCA would let income dominate the first component almost entirely — regardless of whether income is actually more informative. Standardising each feature to unit variance first puts them on equal footing so PCA reflects structure, not measurement units.",
    simple: "PCA chases the biggest spread. If one column is measured in huge numbers, it wins by default. Rescale every column to the same footing first so the comparison is fair.",
    widget: W("Scale before you PCA", "Share of PC1 captured by 'income' alone, as you rescale the features.",
      "preprocessing →", ["raw units", "log income", "min-max", "standardised"],
      "income's grip on PC1", [97, 75, 55, 50], "Preprocessing",
      [{ max: 1, text: "In raw units, high-magnitude income nearly owns the first component.", tone: "info" },
       { max: 2, text: "Partial rescaling loosens its grip.", tone: "info" },
       { max: 3, text: "🤯 After standardising, each feature competes on structure, not on unit size.", tone: "wow" }],
      { name: "Standardise before PCA", formula: "unequal scales → z-score first", text: "Standardise features before PCA so variance reflects real structure, not the size of the units." })
  });

  q("scen1", {
    q: "You want a 2D picture to eyeball whether your 50-dimensional dataset contains distinct groups, preserving which points are near-neighbours. Which tool is designed for that?",
    choices: [
      "t-SNE — a nonlinear method built to place similar points near each other in 2D for visual inspection",
      "PCA to 2 components, which is guaranteed to reveal every cluster",
      "K-Means, which produces a 2D scatter plot as its main output",
      "Standardisation alone, which reduces the data to two dimensions",
      "A correlation heatmap of the 50 features"
    ],
    explain: "t-SNE is a nonlinear embedding whose explicit goal is to keep near-neighbours near in the low-dimensional map, which makes tight groups pop out visually — ideal for exploring whether clusters exist. PCA is linear and optimises for variance, so clusters separated along nonlinear or low-variance directions can be smeared together in its top-2 view. For a faithful 'do groups exist' picture of high-dimensional data, t-SNE (or UMAP) is the purpose-built choice.",
    simple: "t-SNE is a map-maker for high-dimensional data: it tries to keep neighbours as neighbours so clumps look like clumps. PCA just flattens along the widest directions and can hide groupings.",
    widget: W("t-SNE is built to show clusters", "How clearly separated groups appear in a 2D view from each method.",
      "method →", ["raw 2 features", "PCA 2D", "PCA 3D", "t-SNE 2D"],
      "visual cluster clarity", [25, 55, 62, 92], "Method",
      [{ max: 1, text: "Picking two raw features throws away most of the structure.", tone: "info" },
       { max: 2, text: "PCA captures variance but can blur nonlinear separations.", tone: "info" },
       { max: 3, text: "🤯 t-SNE bends the map to keep neighbours together, so real groups stand out.", tone: "wow" }],
      { name: "t-SNE for visualisation", formula: "explore high-D groups → t-SNE / UMAP", text: "To visually check for clusters in high-dimensional data, use t-SNE, which preserves local neighbourhoods." })
  });

  q("scen1", {
    q: "You trained a classifier and want an honest estimate of how it will perform on future unseen data. What is the essential discipline?",
    choices: [
      "Hold out a test set the model never sees during training or tuning, and report its score only on that",
      "Report accuracy on the same data the model was trained on — that is the true performance",
      "Tune hyperparameters on the test set until its score is highest, then report that",
      "Use every row for training so the model learns as much as possible, then estimate error by eye",
      "Trust the training accuracy as long as it is above 95%"
    ],
    explain: "A model can memorise its training data, so training accuracy overstates real performance. To estimate generalisation you must evaluate on data untouched during training and tuning — a held-out test set (or cross-validation for the training portion). If you tune choices to maximise the test score, that set leaks into your decisions and stops being an honest estimate; keep it locked until the very end. This train/test discipline is the foundation of trustworthy evaluation.",
    simple: "Grading students on the exact questions you drilled them on tells you nothing. Save a fresh exam they have never seen — that score is the one that predicts the real world.",
    widget: W("Test on data the model never saw", "Gap between training score and true unseen-data score as a model overfits.",
      "model complexity →", ["simple", "moderate", "rich", "over-rich", "memorising"],
      "score gap (train minus test)", [3, 8, 20, 40, 60], "Complexity",
      [{ max: 1, text: "A simple model scores about the same on train and test.", tone: "info" },
       { max: 2, text: "As it grows richer, training score races ahead of test score.", tone: "info" },
       { max: 4, text: "🤯 A model can hit near-100% on training data and fail on new data — only the held-out set reveals it.", tone: "wow" }],
      { name: "Train/test discipline", formula: "generalisation = score on untouched data", text: "Estimate real performance only on a held-out test set the model never saw during training or tuning." })
  });

  /* ===================== scen2 — Weighing Trade-offs (6) ===================== */

  q("scen2", {
    q: "For K-Means on your data, the elbow plot is ambiguous (no sharp bend), but silhouette scores are 0.61 at k = 4 and 0.38 at k = 6. Business wants finer segments (k = 6). How do you weigh this?",
    choices: [
      "Favor k = 4: its far higher silhouette means genuinely better-separated clusters; adopt k = 6 only if the extra segments are validated as useful",
      "Always pick k = 6 because the business asked for more segments",
      "Pick k = 4 and refuse to ever discuss more granular segments",
      "Ignore silhouette entirely; only the elbow plot is valid for choosing k",
      "Pick the k with the highest inertia, since higher is better"
    ],
    explain: "Silhouette measures how tight and well-separated clusters are (roughly -1 to 1); 0.61 versus 0.38 says k = 4 yields substantially cleaner structure, while k = 6 is starting to carve into groups that are not truly distinct. That is the trade-off: statistical cohesion (k = 4) versus business granularity (k = 6). The defensible move is to lead with k = 4 and only split further if those finer segments prove actionable — chasing granularity that the data does not support produces flimsy, unstable clusters.",
    simple: "The data says four clean groups; the business wants six. More boxes are only worth it if the extra splits mean something real — otherwise you are inventing segments the data cannot back up.",
    widget: W("Granularity vs cluster quality", "Silhouette (separation quality) as you demand more K-Means clusters.",
      "number of clusters k →", ["2", "3", "4", "6", "8"],
      "silhouette quality", [45, 58, 61, 38, 25], "k",
      [{ max: 2, text: "Separation peaks around k = 4 where clusters are genuinely distinct.", tone: "info" },
       { max: 3, text: "Pushing to k = 6 splits real groups; silhouette drops.", tone: "info" },
       { max: 4, text: "🤯 More segments can look 'finer' while being statistically worse-separated.", tone: "wow" }],
      { name: "Silhouette vs business granularity", formula: "extra clusters only if separation holds", text: "Balance the business wish for finer segments against silhouette; do not split beyond what the data supports." })
  });

  q("scen2", {
    q: "For hierarchical clustering you must choose a linkage. Single linkage can 'chain' distant points into one straggly cluster; Ward tends to make compact, balanced clusters but assumes roughly convex groups. Your data has fairly round, similar-sized blobs. How do you decide?",
    choices: [
      "Prefer Ward here: for compact convex blobs it gives tight balanced clusters, accepting that it would struggle on chained or elongated shapes",
      "Always use single linkage because it is the fastest and simplest",
      "Use single linkage so the clusters can chain — chaining is always desirable",
      "Linkage choice never affects the result; pick any at random",
      "Use complete linkage only, since it is the theoretical best in every case"
    ],
    explain: "Linkage defines how the distance between two clusters is measured, and it strongly shapes the outcome. Single linkage joins clusters by their two closest points, so a thin bridge of points can chain unrelated blobs together — great for elongated shapes, bad for clean separation. Ward merges the pair that least increases within-cluster variance, producing compact, similarly-sized clusters that fit convex blobs well. Since your data is round and balanced, Ward is the better trade-off; you would reconsider if the shapes were stringy.",
    simple: "Single linkage is a chain of stepping stones — good for long shapes, but one stone in the wrong place links two islands. Ward keeps clusters round and tidy, which suits round, tidy data.",
    widget: W("Linkage shapes the clusters", "Quality of recovered blobs by linkage rule, on compact convex data.",
      "linkage →", ["single", "average", "complete", "ward"],
      "blob recovery on convex data", [40, 70, 80, 92], "Linkage",
      [{ max: 0, text: "Single linkage risks chaining separate blobs through stray points.", tone: "info" },
       { max: 2, text: "Average and complete linkage tighten things up.", tone: "info" },
       { max: 3, text: "🤯 Ward minimises within-cluster variance — ideal for round balanced blobs, weaker on stringy shapes.", tone: "wow" }],
      { name: "Choosing linkage", formula: "match linkage to cluster shape", text: "Ward suits compact convex blobs; single linkage suits chained shapes but risks bridging separate groups." })
  });

  q("scen2", {
    q: "PCA on your 200-feature dataset shows the first 10 components explain 95% of variance, the first 30 explain 99%. You want fast downstream training but minimal information loss. How many components is a reasonable pick?",
    choices: [
      "Around 10 — capturing 95% of variance with a 20x dimensionality cut is a strong compression/fidelity balance; go higher only if that last 5% matters",
      "Keep all 200 components, since dropping any loses information",
      "Keep exactly 2 components because PCA is only for 2D plots",
      "Keep 1 component, since PC1 already explains the most variance",
      "Keep 30 components because more is always safer regardless of cost"
    ],
    explain: "This is a compression-versus-fidelity trade-off. Ten components retain 95% of the total variance while cutting dimensionality 20-fold, which usually speeds training and reduces noise with negligible loss. Jumping to 30 buys only another 4% of variance for triple the size — worthwhile only if that residual signal is genuinely predictive. Keeping all 200 defeats the purpose, and 1-2 components throws away too much. A cumulative-variance curve makes the sweet spot visible.",
    simple: "Ten components already hold 95% of the picture at a fraction of the size. Paying for 20 more components to recover the last few percent is only worth it if that detail actually helps.",
    widget: W("How many components to keep", "Cumulative variance explained as you keep more principal components.",
      "components kept →", ["2", "5", "10", "30", "200"],
      "variance explained", [60, 85, 95, 99, 100], "Components",
      [{ max: 1, text: "The first few components already recover most of the variance.", tone: "info" },
       { max: 2, text: "By 10 components you have 95% at a 20x size cut.", tone: "info" },
       { max: 4, text: "🤯 The last 5% of variance costs 20x more components — diminishing returns.", tone: "wow" }],
      { name: "Compression vs fidelity", formula: "pick components at the knee of cumulative variance", text: "Keep enough components to hit your variance target; chasing the final few percent costs disproportionate size." })
  });

  q("scen2", {
    q: "Your model scores 92% on training data but only 68% on validation. A colleague suggests a much simpler model that scores 74% on training and 72% on validation. Which is the better bet and why?",
    choices: [
      "The simpler model — its train and validation scores are close, so it generalises; the first model is overfitting (high variance)",
      "The first model — 92% training accuracy proves it learned the problem better",
      "The first model, because a bigger train-validation gap means it is more powerful",
      "Neither; you should pick whichever has the higher training score always",
      "The simpler model, but only because simpler models are always more accurate"
    ],
    explain: "The first model's 24-point train-validation gap is the signature of overfitting: it memorised training quirks (high variance) and fails on new data. The simpler model sacrifices a little training fit (slightly higher bias) but its scores are close together and its validation score is actually higher — it generalises better, which is what matters. This is the bias-variance trade-off: the goal is the lowest error on unseen data, not the highest training score.",
    simple: "A student who aces the practice sheet but bombs the real test only memorised. The one who does solidly on both actually understands. Pick the model that does well on the exam that counts.",
    widget: W("Bias-variance and the generalisation gap", "Training vs validation error as model complexity rises.",
      "model complexity →", ["too simple", "balanced", "complex", "over-complex"],
      "validation error", [38, 26, 30, 45], "Complexity",
      [{ max: 0, text: "Too simple: high bias, both errors high (underfitting).", tone: "info" },
       { max: 1, text: "Balanced: lowest validation error — the sweet spot.", tone: "info" },
       { max: 3, text: "🤯 Too complex: training error keeps falling but validation error climbs — variance takes over.", tone: "wow" }],
      { name: "Bias-variance trade-off", formula: "minimise validation error, not training error", text: "A small train-validation gap signals good generalisation; a large gap signals overfitting (high variance)." },
      { series: [{ name: "training error", ys: [36, 20, 10, 4] }] })
  });

  q("scen2", {
    q: "You must cluster 5 million points. DBSCAN handles noise and odd shapes but needs a good eps and can be memory-heavy; K-Means is fast and scales linearly but assumes round clusters and no noise. Clusters look roughly spherical and speed matters most. What is the sensible call?",
    choices: [
      "Use K-Means (or MiniBatch K-Means): with spherical clusters and a tight compute budget its speed and scalability win, accepting it will not flag noise",
      "Use DBSCAN regardless, because it is always more accurate than K-Means",
      "Use hierarchical clustering, which scales best to millions of points",
      "Use K-Means but set k equal to the number of points for maximum detail",
      "Avoid clustering entirely; 5 million points cannot be clustered"
    ],
    explain: "This trades cluster flexibility against scalability. DBSCAN's strengths — arbitrary shapes and explicit noise — are not needed when clusters are already roughly spherical, and its neighbourhood search plus eps tuning are costly at 5M points. K-Means (especially MiniBatch K-Means) scales near-linearly and converges fast, matching the spherical assumption. Given that speed is the priority and the shape assumption holds, K-Means is the pragmatic choice; you would switch to DBSCAN if shapes were irregular or noise-flagging were essential.",
    simple: "When the clusters are already round and you have millions of points on a deadline, the fast round-blob finder wins. Save the shape-tracing method for when the shapes are actually weird.",
    widget: W("Scalability vs shape flexibility", "Relative wall-clock speed on millions of points by method.",
      "method →", ["hierarchical", "DBSCAN", "K-Means", "MiniBatch K-Means"],
      "speed at scale", [10, 40, 85, 97], "Method",
      [{ max: 0, text: "Hierarchical clustering's cost explodes with n — impractical at millions.", tone: "info" },
       { max: 1, text: "DBSCAN is flexible but its neighbourhood search gets heavy at scale.", tone: "info" },
       { max: 3, text: "🤯 On spherical clusters, MiniBatch K-Means clusters millions of points in a fraction of the time.", tone: "wow" }],
      { name: "Speed vs flexibility", formula: "spherical + huge n → (MiniBatch) K-Means", text: "When clusters are round and scale dominates, K-Means beats DBSCAN; use DBSCAN when shape and noise matter." })
  });

  q("scen2", {
    q: "Running t-SNE, a low perplexity (~5) emphasises very local structure and can fabricate tiny scattered clumps, while a high perplexity (~50) preserves more global layout but can blur fine groups together. You have ~2000 points and want a faithful cluster picture. How do you set it?",
    choices: [
      "Try a moderate perplexity (~30) and compare a few values — it balances local detail against global structure, and stable groups across settings are the trustworthy ones",
      "Always use the lowest perplexity, since more local detail is strictly better",
      "Always use the highest perplexity, since preserving global layout is all that matters",
      "Perplexity has no effect on the plot, so leave it at any value",
      "Set perplexity equal to the number of points for maximum resolution"
    ],
    explain: "Perplexity roughly sets how many neighbours each point balances, trading local against global fidelity. Too low and t-SNE overfits noise into spurious little clusters; too high and distinct groups smear together. There is no single correct value, so the sound practice is a moderate default (often 20-50, and comfortably below the point count) and checking several values — structure that persists across perplexities is real, while clusters that appear at only one setting are suspect. That comparison, not one lucky plot, is what you trust.",
    simple: "Perplexity is a zoom dial between fine detail and the big picture. Turn it too far either way and the map lies; try a few settings and trust the groupings that stay put.",
    widget: W("Perplexity trades local vs global", "Faithfulness of the t-SNE map as perplexity rises.",
      "perplexity →", ["5", "15", "30", "50", "500"],
      "map faithfulness", [45, 75, 90, 80, 30], "Perplexity",
      [{ max: 0, text: "Very low perplexity invents tiny scattered clumps from noise.", tone: "info" },
       { max: 2, text: "A moderate value balances local detail with global layout.", tone: "info" },
       { max: 4, text: "🤯 Perplexity near the point count collapses the structure — no setting is 'the' right one, so compare several.", tone: "wow" }],
      { name: "Tuning t-SNE perplexity", formula: "moderate perplexity + compare several runs", text: "Perplexity trades local detail for global structure; use a moderate value and trust groups stable across settings." })
  });

  /* ===================== scen3 — Subtle Traps (6) ===================== */

  q("scen3", {
    q: "In your t-SNE plot, cluster A looks twice as wide as cluster B, and A sits far from B while C sits close to B. A teammate concludes A is more 'spread out' and that B and C are more similar than A. What is the correct caution?",
    choices: [
      "t-SNE distorts cluster sizes and between-cluster distances — relative sizes and gaps are not reliable; only the existence of separated groups is trustworthy",
      "The teammate is right: t-SNE preserves true distances and densities exactly",
      "A larger cluster in t-SNE always means higher variance in the original space",
      "The gaps between t-SNE clusters equal the real distances, so B and C are truly closest",
      "t-SNE axes have units you can read off directly to compare spreads"
    ],
    explain: "t-SNE optimises to preserve local neighbourhoods, not global geometry. It actively expands dense regions and contracts sparse ones, so a cluster's rendered size reflects the algorithm's crowding correction, not the group's true spread. Likewise the distances between separated clusters are largely meaningless — a big gap does not mean 'far apart' in the original space. The honest reading is only that distinct, separated blobs suggest distinct groups; do not interpret their sizes or spacing.",
    simple: "A t-SNE plot is like a subway map: it shows which stops connect, but not real distances or how big each area is. Trust that groups are separate — do not trust how far apart or how large they look.",
    widget: W("Read t-SNE honestly", "How much you can trust different features of a t-SNE plot.",
      "what you read off →", ["cluster sizes", "gaps between clusters", "global layout", "groups exist"],
      "trustworthiness", [20, 25, 30, 90], "Feature read",
      [{ max: 1, text: "Cluster sizes and between-cluster gaps are distorted by design.", tone: "info" },
       { max: 2, text: "Global arrangement is unreliable too, and shifts with perplexity.", tone: "info" },
       { max: 3, text: "🤯 The one solid takeaway: separated blobs mean separate groups — nothing about size or distance.", tone: "wow" }],
      { name: "Interpreting t-SNE", formula: "trust separation, not size or distance", text: "In t-SNE, cluster sizes and inter-cluster distances are not meaningful; only the presence of distinct groups is." })
  });

  q("scen3", {
    q: "To reduce dimensions you fit PCA (and the standardiser) on the ENTIRE dataset, then split into train and test and report a strong test score. Why is this a subtle problem?",
    choices: [
      "Data leakage — fitting PCA and scaling on all rows lets test-set statistics inform the transform, so the test score is optimistically biased",
      "There is no problem; PCA is unsupervised so it can safely see all the data",
      "The problem is only that PCA is slower when fit on more rows",
      "It is fine as long as you do not look at the test labels during PCA",
      "The issue is that PCA should always be fit after, not before, standardising"
    ],
    explain: "Even though PCA and standardisation ignore labels, they still learn parameters — component directions, feature means and variances — from the data they are fit on. Fitting them on the full dataset lets information from the test rows shape the transform applied to the training rows, so the test set is no longer truly unseen. The correct procedure is to split first, fit the scaler and PCA on the training set only, then apply those fixed transforms to the test set (a Pipeline enforces this). Otherwise your reported score is optimistically inflated.",
    simple: "If your dimension-reduction step peeked at the test data while learning, the test is no longer a surprise. Split first, then let PCA learn only from the training half.",
    widget: W("Unsupervised steps can still leak", "Gap between reported and true test accuracy as more preprocessing is fit on all data.",
      "steps fit on full data →", ["none", "scaler only", "scaler + PCA", "scaler + PCA + selection"],
      "optimistic score inflation", [0, 6, 14, 25], "Leaky steps",
      [{ max: 0, text: "Fit everything on train only and the test score is honest.", tone: "info" },
       { max: 1, text: "Each transform fit on all rows leaks a little test information.", tone: "info" },
       { max: 3, text: "🤯 Unsupervised preprocessing leaks too — no labels needed, the score still inflates.", tone: "wow" }],
      { name: "Preprocessing leakage", formula: "split first, fit transforms on train only", text: "Fitting PCA or scaling on the whole dataset before splitting leaks test statistics and inflates the score." })
  });

  q("scen3", {
    q: "You run K-Means on customers using 'age' (18-90) and 'income' (0-200000) in raw units. The clusters end up split almost entirely by income bands, ignoring age. What went wrong?",
    choices: [
      "Features were not scaled — K-Means uses Euclidean distance, so the large-magnitude income dwarfs age and dominates the distance",
      "K-Means simply decided income is the more important feature on its own",
      "Age is irrelevant to customers, so K-Means correctly dropped it",
      "You used too few clusters; more clusters would have brought age back in",
      "K-Means always ignores the second feature you give it"
    ],
    explain: "K-Means groups by Euclidean distance, which sums squared differences across features. A difference of 10000 in income utterly swamps a difference of 40 in age, so distances are effectively income-only and the clusters reflect income alone. K-Means has no built-in scaling and no concept of feature importance — it just measures raw distance. Standardising each feature to comparable scale before clustering lets age and income both influence the grouping.",
    simple: "Distance adds up the columns, and a column measured in the tens of thousands drowns out one measured in tens. Put both on the same scale first or the big-numbers column decides everything.",
    widget: W("Unscaled features hijack K-Means", "Share of the clustering driven by 'income' as you rescale, versus age.",
      "preprocessing →", ["raw units", "log income", "robust scale", "standardised"],
      "income's control of clusters", [96, 78, 58, 50], "Preprocessing",
      [{ max: 0, text: "In raw units the high-magnitude feature owns the distance metric.", tone: "info" },
       { max: 1, text: "Rescaling gradually lets the smaller-range feature matter.", tone: "info" },
       { max: 3, text: "🤯 After standardising, age and income share influence — the clusters change meaning entirely.", tone: "wow" }],
      { name: "Scale before distance-based clustering", formula: "K-Means uses distance → standardise features", text: "K-Means distance is dominated by large-magnitude features; standardise before clustering so all features count." })
  });

  q("scen3", {
    q: "You add hundreds of extra features to a small dataset expecting better clustering and nearest-neighbour results, but everything gets worse. Which effect explains this?",
    choices: [
      "The curse of dimensionality — in very high dimensions distances concentrate, so 'nearest' and 'farthest' points look almost equally distant and neighbourhoods lose meaning",
      "More features always help; the real cause must be a coding bug",
      "High dimensions make Euclidean distance impossible to compute",
      "The extra features increased the sample size, which hurts clustering",
      "Clustering and kNN are unaffected by the number of features"
    ],
    explain: "As dimensionality grows, data becomes sparse and the contrast between the nearest and farthest neighbour distances shrinks toward zero — distances 'concentrate'. Since K-Means, DBSCAN and kNN all rely on distances being meaningful, their notion of a neighbourhood degrades, and irrelevant added features inject noise that dilutes any real signal. This is the curse of dimensionality. The fix is fewer, more relevant features: feature selection or dimensionality reduction such as PCA before clustering.",
    simple: "Pile on enough dimensions and everything ends up roughly the same distance from everything else, so 'nearest neighbour' stops meaning anything. More columns can bury the signal instead of adding it.",
    widget: W("The curse of dimensionality", "Contrast between nearest and farthest neighbour distances as dimensions grow.",
      "number of dimensions →", ["2", "10", "50", "200", "1000"],
      "near vs far distance contrast", [90, 65, 40, 20, 8], "Dimensions",
      [{ max: 1, text: "In low dimensions, near and far neighbours are clearly different distances.", tone: "info" },
       { max: 2, text: "As dimensions climb, that contrast steadily collapses.", tone: "info" },
       { max: 4, text: "🤯 In very high dimensions every point is almost equidistant — distance-based methods lose their grip.", tone: "wow" }],
      { name: "Curse of dimensionality", formula: "too many features → distances concentrate", text: "Adding features to a small dataset makes distances meaningless; reduce dimensions before distance-based methods." })
  });

  q("scen3", {
    q: "Your data has two clusters of very different density: one tight, one loose. You pick a single DBSCAN eps that nicely captures the tight cluster. On the loose cluster it fails badly. What is the trap?",
    choices: [
      "A single global eps cannot fit clusters of differing density — an eps tight enough for the dense cluster shatters the sparse one into noise",
      "DBSCAN never works on more than one cluster at a time",
      "The loose cluster is simply noise and should always be discarded",
      "eps only affects speed, not which points cluster together",
      "You must set eps to zero so DBSCAN finds every cluster automatically"
    ],
    explain: "DBSCAN uses one global eps (neighbourhood radius) and minPts threshold for the whole dataset. An eps small enough to keep the dense cluster from merging with its surroundings is too small for the sparse cluster, whose points are simply farther apart, so most of them fall below the density threshold and get labeled noise. This varying-density weakness is inherent to classic DBSCAN. Remedies include tuning eps via a k-distance plot, or using HDBSCAN, which adapts to varying density.",
    simple: "DBSCAN uses one 'how close counts as together' setting for the whole map. Tune it for the crowded neighbourhood and the spread-out one looks empty; the single radius cannot serve both.",
    widget: W("One eps cannot fit two densities", "Points correctly clustered in the sparse cluster as you widen a single global eps.",
      "eps (global radius) →", ["tiny", "small", "medium", "large"],
      "sparse cluster recovered", [10, 30, 65, 40], "eps",
      [{ max: 1, text: "An eps tuned for the dense cluster leaves the sparse cluster as scattered noise.", tone: "info" },
       { max: 2, text: "Widen eps and the sparse cluster forms — but now the dense one starts merging with neighbours.", tone: "info" },
       { max: 3, text: "🤯 No single eps serves both densities at once — that is DBSCAN's varying-density blind spot.", tone: "wow" }],
      { name: "DBSCAN and varying density", formula: "one global eps fails on mixed densities", text: "A single eps cannot fit clusters of different density; use a k-distance plot or HDBSCAN for varying density." })
  });

  q("scen3", {
    q: "Two species in your data form two long, parallel, slightly-curved bands that nearly touch at one point. You use single-linkage hierarchical clustering and it merges both bands into one cluster. Why?",
    choices: [
      "Single linkage's chaining effect — it merges clusters via their closest pair, so the near-touching point bridges the two bands into one",
      "Single linkage is buggy and should never be used for any data",
      "The two bands are genuinely one cluster, so the result is correct",
      "Hierarchical clustering cannot handle elongated shapes under any linkage",
      "The merge happened because you used too many features"
    ],
    explain: "Single linkage defines the distance between two clusters as the distance between their two nearest points, so clusters merge as soon as any pair of points is close. Where the two bands nearly touch, that minimal gap is tiny, so single linkage links them through that bridge — the classic chaining effect that strings together groups connected by a thin path. Here it wrongly fuses two species. Complete or Ward linkage, which consider farthest points or variance, would resist this bridging.",
    simple: "Single linkage joins groups the moment any two points get close, like a chain that only needs one link. Where the two bands almost touch, that single link welds them into one.",
    widget: W("Chaining bridges near-touching clusters", "Chance single linkage wrongly fuses two bands as their closest gap shrinks.",
      "gap between bands →", ["wide", "medium", "narrow", "touching"],
      "wrong merge probability", [10, 30, 70, 95], "Gap",
      [{ max: 0, text: "With a wide gap, single linkage keeps the two bands separate.", tone: "info" },
       { max: 1, text: "As the closest points approach, a thin bridge starts to form.", tone: "info" },
       { max: 3, text: "🤯 One near-touching pair is enough for single linkage to chain both bands into one cluster.", tone: "wow" }],
      { name: "Single-linkage chaining", formula: "nearest-pair merge → chaining across bridges", text: "Single linkage merges via closest points, so near-touching clusters chain together; prefer complete or Ward to resist it." })
  });
})();
