/* Hierarchical Clustering — Part III: Advanced Study. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).hier3 = [

{
  q: "Single linkage can chain two well-separated clusters together through a thin bridge of stray points; complete linkage refuses to, but then shatters elongated clusters. Why do the two linkages fail in exactly opposite ways?",
  choices: ["Single linkage measures cluster distance by the CLOSEST pair (one bridge point suffices to merge), complete by the FARTHEST pair (one distant member blocks merging) — so single chains, complete fragments", "Single linkage actually uses the FARTHEST pair, so a lone outlier chains clusters together, while complete uses the CLOSEST pair, so a single near point fragments them — the two roles are simply swapped around", "Both linkages really just average every pairwise distance; single merely weights the near pairs a bit more and complete the far pairs, so the two failures differ only in degree, never in kind", "Single linkage compares the cluster centroids while complete compares their bounding radii, so single tends to drift into long chains and complete into compact balls of one fixed size", "Single linkage always merges the two smallest clusters and complete the two largest, so single grows long winding snakes while complete keeps chopping the elongated shapes into pieces"],
  explain: "Cluster-to-cluster distance must summarise many point-pair distances into one number, and the summary choice IS the algorithm's personality. Single = min over pairs: two clusters merge as soon as ANY member of one is near ANY member of the other, so a trail of intermediate points 'chains' distinct clusters into one snake (great for genuine filaments/manifolds, disastrous with bridging noise). Complete = max over pairs: two clusters merge only when their most DISTANT members are close, so one far-flung member vetoes the merge, keeping clusters compact but slicing anything elongated. Average and Ward sit between (mean pair distance; variance growth). The lesson generalises: whenever you compress a set of distances to a scalar, min/max/mean encode opposite biases.",
  simple: "To decide if two crowds should merge, you need one number for 'how far apart are these crowds' — but a crowd has many members, so you must pick a rule. Single linkage asks 'how close are the NEAREST two people?' — so a single hand-holding chain of stragglers welds two separate crowds into one conga line. Complete linkage asks 'how far are the FURTHEST two people?' — so one crowd-member standing way out at the edge single-handedly blocks any merge, and long crowds get chopped up. Same data, opposite sins, and the only difference is min-versus-max. The summary rule is the whole worldview.",
  widget: {
    type: "curveStatic", title: "Nearest-pair vs farthest-pair",
    world: "Datasets ranging from chained-with-noise to elongated, clustered by single, complete and average linkage. Watch the two extremes trade catastrophes.",
    xlab: "data character →", xs: [0,1,2,3,4], labels: ["blobs + noise bridge","compact blobs","slightly oval","elongated","filaments/spirals"], dec: 0, yunit: "",
    series: [
      { name: "average linkage (ARI ×100)", ys: [74, 92, 88, 76, 58] },
      { name: "single linkage (ARI ×100)", ys: [28, 90, 84, 82, 91] },
      { name: "complete linkage (ARI ×100)", ys: [86, 93, 82, 47, 22] }
    ],
    knob: { label: "Data character", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Blobs joined by a noise bridge: single linkage collapses to 28 (it chains across the bridge into one blob) while complete holds at 86 — max-distance won't cross the gap. Single's fatal flaw, on display.", tone: "warn" },
      { max: 3, text: "Elongated clusters: the verdict FLIPS — complete crashes to 47 (its farthest-member rule chops the long shapes) while single tracks them at 82. Neither is 'better'; they're mirror images.", tone: "info" },
      { max: 4, text: "🤯 Filaments/spirals: single 91, complete 22 — total role reversal from column one. The bias you WANT depends entirely on whether your true clusters are compact (complete) or stringy (single); average hedges. Choose linkage by believed shape, exactly as you choose a clusterer.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Linkage as a distance summary", formula: "single = min pair · complete = max pair · average = mean pair · Ward = Δvariance",
      text: "Min chains (loves filaments, hates bridges); max fragments (loves compactness, hates elongation). The min/max/mean choice recurs anywhere sets get reduced to one number." }
  }
},

{
  q: "Ward linkage's formula for the distance between merged clusters is usually computed via the Lance–Williams recurrence, not by re-scanning all points. What does that recurrence buy, and what does it require of your metric?",
  choices: ["It updates cluster-distances incrementally after each merge from the PREVIOUS distances alone — turning repeated full recomputation into O(1) updates — but Ward's version is valid only with Euclidean distance", "It recomputes every new cluster-distance by fully re-scanning all the member points at each merge, which is slower yet lets Ward run correctly under absolutely any metric you like, cosine and Manhattan included", "It removes the need to choose k altogether, because the incremental distance updates quietly reveal the natural number of clusters as a by-product of every single merge", "It rewrites the update so that single, complete, average and Ward all collapse to one identical linear combination, which makes the linkage choice irrelevant to the resulting tree", "It caches the entire pairwise distance matrix in memory so that later merges can reuse it directly, a trick that only pays off on small datasets well under a thousand points"],
  explain: "Naively, after each of n−1 merges you'd recompute distances from the new cluster to all others by scanning members — O(n) per pair, crippling at scale. Lance–Williams expresses the new distance d(A∪B, C) as a fixed linear combination of the ALREADY-KNOWN d(A,C), d(B,C), d(A,B) with coefficients that encode the linkage (single/complete/average/Ward each have their own coefficients) — an O(1) algebraic update, dropping a full agglomerative run toward O(n²). The catch specific to Ward: its recurrence assumes squared Euclidean geometry (it's minimising variance, a Euclidean notion), so 'Ward + cosine/Manhattan' is mathematically ill-posed — sklearn enforces affinity='euclidean' for linkage='ward'. Know which linkages are metric-flexible (single/complete/average accept any distance) and which aren't.",
  simple: "After merging two clusters, you need distances from the new combined cluster to everyone else. The slow way: walk through all the members again, every merge, forever. Lance–Williams is a shortcut recipe: the new distances are just a fixed blend of distances you ALREADY computed before the merge — a little algebra, no re-walking. Each linkage rule is simply a different blend recipe. Ward's recipe, though, is written in the language of squared straight-line distance (it's really minimising spread, a straight-line idea) — so it only makes sense with Euclidean distance. Try to pair Ward with cosine similarity and the recipe is meaningless; that's why the library forbids it.",
  widget: {
    type: "curveStatic", title: "Re-walk everyone, or reuse the algebra",
    world: "Time to complete an agglomerative run as points grow: naive per-merge rescan vs Lance–Williams O(1) updates. (Ward shown; the recurrence requires Euclidean.)",
    xlab: "points →", xs: [0,1,2,3,4], labels: ["500","2k","8k","30k","100k"], dec: 0, yunit: "",
    series: [
      { name: "Lance–Williams updates (s)", ys: [0.1, 1, 12, 150, 1500] },
      { name: "naive per-merge rescan (s)", ys: [1, 40, 2500, 130000, 4000000] }
    ],
    knob: { label: "Points", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "At 2k points: 1s vs 40s. The recurrence reuses prior distances; the naive method re-scans cluster members after every one of the ~2000 merges. The gap is a whole complexity class.", tone: "info" },
      { max: 3, text: "30k points: minutes vs a day and a half. This is the difference between 'hierarchical clustering is feasible here' and 'it isn't' — created purely by not recomputing what you already knew.", tone: "info" },
      { max: 4, text: "🤯 The Ward-specific catch: this speed rests on a recurrence that assumes squared-Euclidean geometry, so Ward + cosine is ill-posed and sklearn rejects it. Single/complete/average recurrences accept any metric. Knowing which linkage is metric-locked is knowing why your 'Ward + Manhattan' call errored.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Lance–Williams recurrence", formula: "d(A∪B,C) = αₐd(A,C)+α_b d(B,C)+βd(A,B)+γ|d(A,C)−d(B,C)| · Ward ⇒ Euclidean only",
      text: "Per-linkage coefficients turn agglomeration into O(1) updates. sklearn ties linkage='ward' to affinity='euclidean'; other linkages accept metric=. Fast-clustering libraries (fastcluster) implement exactly this." }
  }
},

{
  q: "The cophenetic correlation coefficient is the standard way to ask 'does my dendrogram faithfully represent the original distances?'. What two distances does it correlate, and what does a low value tell you?",
  choices: ["Original pairwise distances vs COPHENETIC distances (the merge height at which each pair first joins the same cluster) — low correlation means the tree is distorting the real geometry, so distrust its cuts", "Training-set pairwise distances vs held-out validation distances — a low value warns that the dendrogram has overfit the sample and will not generalise cleanly to fresh, unseen points", "The pairwise distances measured before scaling vs those measured after standardising every single feature — a low value flags that your preprocessing has badly reshaped and distorted the data's real geometry", "Two silhouette scores computed on separate random restarts of the run — a low correlation means the clustering is unstable and so its chosen cut heights cannot really be trusted", "Your tree's merge heights vs the merge heights of a k-means-seeded tree — a low value means the two methods disagree badly about the data's true underlying cluster count"],
  explain: "A dendrogram claims to encode all pairwise dissimilarities via merge heights: two points' cophenetic distance is the height at which they first land in a common cluster. The cophenetic correlation is Pearson's r between the original distance matrix and this cophenetic matrix — how faithfully the tree's heights preserve the true distances. High (>~0.75) = the hierarchy is a trustworthy summary; low = the chosen linkage/metric is forcing the data into a tree shape it doesn't fit (or the data isn't really hierarchical), so any k you cut is built on a distorted picture. Practical use: compute it per linkage (scipy cophenet) and prefer the linkage that maximises it for THIS data — an internal, label-free way to choose linkage rather than guessing.",
  simple: "A dendrogram is a claim: 'the height at which two points finally join the same branch reflects how far apart they really are'. The cophenetic correlation audits that claim — it lines up every pair's true distance against the height the tree married them at, and asks how well the two agree. High agreement: the tree is an honest map, cut it with confidence. Low agreement: the tree crammed your data into a branching shape that doesn't suit it, and every 'natural' cut you read off it is reading a funhouse mirror. Bonus: compute it for each linkage rule and let the data pick the linkage that lies least — no labels required.",
  widget: {
    type: "curveStatic", title: "Does the tree tell the truth?",
    world: "The same dataset built into dendrograms with four linkages; each scored by cophenetic correlation — the label-free way to pick the linkage that least distorts THIS data.",
    xlab: "linkage →", xs: [0,1,2,3], labels: ["single","complete","average","ward"], dec: 2, yunit: "",
    series: [
      { name: "cophenetic correlation", ys: [0.61, 0.78, 0.86, 0.74] }
    ],
    knob: { label: "Linkage", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Single linkage: 0.61 — its chaining warped the true distances badly, so its dendrogram is a distorted map and any cut inherits the distortion. A low score is a warning, not a detail.", tone: "warn" },
      { max: 2, text: "Average linkage: 0.86 — for THIS data it preserves the real pairwise distances best. Note we chose a linkage using NO labels, just fidelity to the distance matrix.", tone: "info" },
      { max: 3, text: "🤯 Ward scores 0.74 despite often giving the prettiest, most balanced-looking trees — 'looks clean' and 'faithful to the data' are different virtues. Report the cophenetic correlation alongside any dendrogram; a beautiful tree with r=0.6 is a beautiful lie, and its cluster count is built on sand.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Cophenetic correlation", formula: "corr(original distances, merge-height distances) — fidelity of the tree to the data",
      text: "scipy: cophenet(linkage_matrix, original_distances). Maximise it over linkages to choose one objectively; a low value means the data may not be hierarchical at all." }
  }
},

{
  q: "BIRCH clusters 50 million rows in one pass using a 'CF-tree' — yet it's still building an agglomerative-style summary. What is the CF-tree, and what's the fundamental trade it makes?",
  choices: ["A memory-bounded tree of Clustering Features (per-subcluster count + linear-sum + squared-sum) built in one streaming pass — it summarises dense regions into compact stats, trading exactness for O(n) single-pass scalability", "A height-balanced tree that stores every single raw point at its leaves but keeps them all fully pre-sorted, so that one streaming pass can read off the exact clusters, needing no pairwise distance matrix at all, none whatsoever", "A compact serialised copy of the full linkage matrix, streamed from disk on demand, that lets the exact agglomerative tree be rebuilt lazily without ever once holding all of it in RAM", "A shallow decision tree, trained on a small labelled sample, that then predicts a cluster label for each of the remaining streaming points in a single fast pass over the whole data stream", "A GPU reimplementation of Ward linkage that computes the entire full O(n^2) pairwise distance matrix in parallel, so that fifty million rows can be squeezed through within a single fast hardware pass"],
  explain: "Classic agglomerative clustering needs the full O(n²) distance matrix — impossible at 50M rows. BIRCH instead streams the data once, inserting each point into a height-balanced CF-tree whose nodes hold Clustering Features: the triple (N, LS, SS) = count, linear sum, sum of squares. From that triple alone you can compute a subcluster's centroid, radius and merge statistics WITHOUT the underlying points — so nearby points collapse into leaf CFs bounded by a radius threshold, and the tree size is capped by a memory budget (splitting/merging nodes as needed). A final global clustering runs on the few thousand leaf-CF summaries. Trade: you never see individual points after summarisation, so fine structure inside a dense region is lost and results depend on insertion order and the threshold — but you get single-pass, bounded-memory clustering of arbitrarily large streams. It's the same 'compress to prototypes, then cluster the prototypes' idea as sample-then-tree, formalised into a data structure.",
  simple: "You can't hold 50 million points in memory, let alone the trillion pairwise distances agglomerative clustering wants. BIRCH's trick: as points stream past, it doesn't remember them individually — it remembers tiny SUMMARIES of dense neighbourhoods (just three running totals per blob: how many, their sum, their sum-of-squares), which is enough to know each blob's centre and size. Nearby points melt into the same summary; the whole structure is kept under a fixed memory budget. At the end you cluster a few thousand summaries instead of 50 million points. The cost: once points melt into a blob-summary, you've thrown away their individual positions, so delicate structure inside a dense region is gone, and the order points arrived in nudges the result. Bounded memory and one pass, paid for in fine detail.",
  widget: {
    type: "curveStatic", title: "Remember summaries, not points",
    world: "Clustering 50M rows: memory and pass count for full agglomerative (infeasible), sample-then-tree, and BIRCH — with cluster-quality kept in view.",
    xlab: "approach →", xs: [0,1,2,3], labels: ["full agglomerative","sample 50k + tree","BIRCH one-pass","BIRCH + fine threshold"], dec: 0, yunit: "",
    series: [
      { name: "peak memory (GB)", ys: [999, 3, 2, 6] },
      { name: "cluster quality (ARI ×100)", ys: [100, 88, 84, 91] }
    ],
    knob: { label: "Approach", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Full agglomerative on 50M rows needs the ~10^15-entry distance matrix — 'memory 999GB' is a polite way of writing 'impossible'. This is the wall BIRCH exists to climb.", tone: "info" },
      { max: 2, text: "BIRCH: one pass, 2GB, ARI 84 — every point melted into a leaf CF triple (N, LS, SS), and only a few thousand summaries were finally clustered. Bounded memory regardless of stream length.", tone: "info" },
      { max: 3, text: "🤯 Tighten the radius threshold (finer summaries): ARI up to 91, memory up to 6GB — the exactness/scalability dial made explicit. The permanent trade: summarised points lose their individual positions, so intra-blob detail and insertion-order independence are what you paid. Same 'cluster the prototypes' idea as sample-then-tree, hardened into a streaming data structure.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "BIRCH & the CF-tree", formula: "Clustering Feature = (N, LS, SS) → centroid/radius without the points · one pass, bounded memory",
      text: "sklearn: Birch(threshold=…, n_clusters=…). For massive or streaming data when hierarchical structure is wanted; MiniBatchKMeans is the flat-clustering counterpart at scale." }
  }
}
];
