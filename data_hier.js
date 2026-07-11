/* Hierarchical Clustering — Parts I & II. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).hier1 = [
  {
    "q": "Agglomerative (hierarchical) clustering starts with every point alone in its own cluster. What happens next, over and over?",
    "choices": [
      "The two closest clusters merge, until everything is one",
      "The biggest cluster splits in two",
      "Random pairs swap members",
      "Centres move to their group means",
      "Points beyond a radius are discarded"
    ],
    "explain": "It's a repeated wedding: find the two closest clusters, merge them, record the distance at which they merged. n−1 merges later everything is one family — and the recorded history IS the model.",
    "simple": "Think family tree, built bottom-up: individuals pair into families, families into clans, clans into tribes — always joining the two closest groups next. The result isn't one grouping but the ENTIRE merge history, drawn as a tree.",
    "widget": {
      "type": "dendro",
      "title": "The merge history, drawn",
      "world": "Eight species arranged by a body-size trait. Below, the tree records every merge, low merges first. Slide the cut line and read the story at any depth.",
      "linkage": "complete",
      "items": [
        { "name": "mouse", "x": 0.5 },
        { "name": "rat", "x": 1.2 },
        { "name": "rabbit", "x": 2.2 },
        { "name": "cat", "x": 4.4 },
        { "name": "dog", "x": 5.1 },
        { "name": "pony", "x": 8 },
        { "name": "horse", "x": 8.9 },
        { "name": "moose", "x": 9.7 }
      ],
      "knob": { "label": "Cut height", "min": 0.3, "max": 10, "step": 0.1, "init": 0.5 },
      "insights": [
        { "max": 1.5, "text": "Low cut: only the very closest pairs have merged — mouse+rat, pony+horse. The tree's bottom records the earliest, most confident weddings.", "tone": "info" },
        { "max": 5, "text": "Mid cut: three sensible families — rodents, pets, big beasts. Notice you didn't re-run anything; you just read the same tree at a different depth.", "tone": "info" },
        { "max": 10, "text": "🤯 Highest cut: one family containing everything — the final merge. One run produced groupings at EVERY granularity simultaneously. That's the hierarchy in 'hierarchical'.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Agglomerative clustering", "formula": "repeat n−1 times: merge the two closest clusters, record the merge distance", "text": "The output is a tree of merges (a dendrogram), not one answer. Cutting the tree at a height is how an answer gets extracted — next exercise." }
    }
  },
  {
    "q": "A dendrogram in hand, your colleague asks 'so how many clusters are there?'. What's the honest answer?",
    "choices": [
      "Whatever the cut height yields — the tree offers every granularity; you choose",
      "Always the number of leaves",
      "Always two — the final merge",
      "The algorithm already decided",
      "The square root of n"
    ],
    "explain": "The dendrogram defers the k decision to reading time: cut low for many small clusters, high for few large ones. Long vertical stretches (big gaps between merge heights) mark natural, stable cuts.",
    "simple": "A family tree doesn't say how many 'groups' the family has — it depends whether you ask at the household, clan, or tribe level. The tree holds all the answers at once; your cut height is the question you choose to ask.",
    "widget": {
      "type": "dendro",
      "title": "Every answer at once",
      "world": "Customer types by weekly spend. Slide the cut through the whole range and count the clusters at each height — then look for the heights where the answer is STABLE.",
      "linkage": "complete",
      "items": [
        { "name": "Ana", "x": 0.4 },
        { "name": "Ben", "x": 1 },
        { "name": "Cai", "x": 1.7 },
        { "name": "Dee", "x": 4.2 },
        { "name": "Eli", "x": 4.9 },
        { "name": "Fay", "x": 5.5 },
        { "name": "Gus", "x": 8.6 },
        { "name": "Hal", "x": 9.4 }
      ],
      "knob": { "label": "Cut height", "min": 0.3, "max": 10, "step": 0.1, "init": 5 },
      "insights": [
        { "max": 2, "text": "Down here the answer changes every fraction you slide — 8, 7, 6, 5 clusters. Unstable cuts = arbitrary answers.", "tone": "warn" },
        { "max": 6.5, "text": "🤯 From about 2.5 to 6.5 the answer stays THREE — a long stretch where nothing merges. Stability over a wide range is the tree saying 'this grouping is real'.", "tone": "wow" },
        { "max": 10, "text": "Cut higher and it snaps to 2, then 1. The long-vertical-gap heuristic is the dendrogram's version of the elbow.", "tone": "info" }
      ],
      "extreme": { "at": 5 },
      "reveal": { "name": "Reading a dendrogram", "formula": "clusters = branches crossed by the cut · stable ranges = trustworthy groupings", "text": "Hierarchical clustering's gift: k becomes a readable choice, not a blind input. The price comes next — the bill." }
    }
  },
  {
    "q": "Single linkage measures cluster distance by the CLOSEST pair; complete linkage by the FARTHEST pair. What's single linkage's famous failure?",
    "choices": [
      "Chaining — stringy clusters that leak together through stepping-stone points",
      "It cannot merge more than ten items",
      "It requires labels",
      "It only works in one dimension",
      "It always produces equal-size clusters"
    ],
    "explain": "Under single linkage, one point between two groups makes them 'close', and merges cascade along chains of stepping stones — producing long straggly clusters. Complete linkage demands the ENTIRE groups be compatible, keeping clusters compact.",
    "simple": "Single linkage says two clubs are close if ANY two members are friends — so one social butterfly merges the chess club into the rugby team. Complete linkage asks whether the two FURTHEST members could stand each other. One handshake versus whole-group compatibility.",
    "widget": {
      "type": "curveStatic",
      "title": "The handshake problem",
      "world": "Four linkage rules clustering the same customer data, scored by how compact and separated the resulting clusters are (silhouette, higher = better). One rule falls for the stepping stones.",
      "xlab": "linkage rule",
      "xs": [
        0,
        1,
        2,
        3
      ],
      "labels": [
        "single",
        "complete",
        "average",
        "Ward"
      ],
      "dec": 2,
      "yunit": "",
      "series": [
        { "name": "cluster quality (silhouette)", "ys": [ 0.31, 0.58, 0.61, 0.66 ] }
      ],
      "knob": { "label": "Linkage", "min": 0, "max": 3, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "🤯 Single linkage: 0.31 — a few stepping-stone customers chained two genuine groups into one straggly mess. One friendly handshake merged the clubs.", "tone": "wow" },
        { "max": 2, "text": "Complete and average linkage resist the chain: a merge needs the whole groups to be near, not just one pair.", "tone": "info" },
        { "max": 3, "text": "Ward linkage (merge whichever pair least increases inertia) usually wins on blobby data — it's the hierarchical cousin of k-means' objective, and sklearn's default.", "tone": "info" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Linkage criteria", "formula": "single: min pair · complete: max pair · average: mean pair · Ward: least inertia growth", "text": "'Distance between clusters' has several defensible definitions, and the choice changes the tree. Ward for blobs, single only when you WANT chains (e.g. elongated structures)." }
    }
  },
  {
    "q": "Hierarchical clustering gives that lovely tree — so why does anyone still use k-means on large datasets?",
    "choices": [
      "The tree costs roughly n² memory and time — hopeless at millions of rows",
      "K-means gives better trees",
      "Dendrograms are illegal in production",
      "Hierarchical needs labels",
      "K-means was invented later"
    ],
    "explain": "Agglomerative clustering needs pairwise distances — n² of them, repeatedly. At a million rows that's 10¹² distances. K-means touches each point k times per iteration: linear, streamable, fast.",
    "simple": "The tree is built by comparing everyone with everyone — fine for 800 customers, fatal for 8 million (that's 32 trillion comparisons). K-means only ever compares each point with k centres. Beautiful tree for small data; brute pragmatism for big.",
    "widget": {
      "type": "curveStatic",
      "title": "The n² bill again",
      "world": "Runtime as the dataset grows. You've seen this curve shape before — with kernels. Slide the rows and find each method's ceiling.",
      "xlab": "rows",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "1k",
        "10k",
        "100k",
        "1M",
        "10M"
      ],
      "dec": 1,
      "yunit": " min",
      "series": [
        { "name": "hierarchical (n²)", "ys": [ 0.1, 8, 780, 78000, 7800000 ] },
        { "name": "k-means (≈ linear)", "ys": [ 0.02, 0.2, 2, 20, 200 ] }
      ],
      "knob": { "label": "Rows", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "10k rows: the tree takes 8 minutes — worth it for the interpretability. This is hierarchical clustering's comfortable habitat.", "tone": "info" },
        { "max": 2, "text": "100k rows: 13 hours for the tree, 2 minutes for k-means. The n² wall arrives fast once it arrives.", "tone": "warn" },
        { "max": 4, "text": "🤯 10M rows: the tree would run for ~15 YEARS. K-means: 3 hours. Same story as the kernel matrix — pairwise methods buy insight with quadratic money.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Hierarchical's O(n²) cost", "formula": "pairwise distances ≈ n²/2 — tree methods cap out around 10⁴–10⁵ rows", "text": "Choose by scale: dendrograms for thousands of rows, k-means (or MiniBatchKMeans) for millions. Or cluster a sample hierarchically to CHOOSE k, then run k-means on everything." }
    }
  }
];

(window.QUESTIONS = window.QUESTIONS || {}).hier2 = [
  {
    "q": "Ward linkage is the default in sklearn's AgglomerativeClustering. What rule does Ward use to pick which two clusters merge next?",
    "choices": [
      "Merge the pair whose union INCREASES within-cluster variance the least — the same quantity k-means minimises",
      "Merge the pair with the closest two individual points",
      "Merge the pair with the closest centroids, ignoring spread",
      "Merge the two smallest clusters",
      "Merge the pair with the most similar sizes"
    ],
    "explain": "Single linkage looks at nearest points, complete at farthest, average at the mean pairwise distance. Ward instead asks: which merge grows the total within-cluster sum of squares (inertia!) by the least? Since inertia is exactly k-means' objective, Ward tends to make compact, similar-sized, roundish clusters — and a Ward tree cut at k usually agrees closely with a k-means run at the same k.",
    "simple": "Every linkage rule is a different definition of 'closest clusters'. Ward's definition is an accountant's: 'which wedding causes the least growth in total mess?' — mess being the same spread-around-the-centre score k-means chases. Same objective, different route: k-means jumps straight to one answer for a chosen k; Ward builds the entire merge tree while minimising that score at each step.",
    "widget": {
      "type": "curveStatic",
      "title": "Two roads up the same hill",
      "world": "Cut a Ward tree at k clusters and separately run k-means at the same k, then measure how often the two labelings agree (adjusted for chance). Single linkage shown for contrast.",
      "xlab": "k (clusters) →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "2",
        "3",
        "4",
        "6",
        "8"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "Ward cut vs k-means agreement", "ys": [ 88, 92, 90, 84, 80 ] },
        { "name": "single-link vs k-means agreement", "ys": [ 45, 40, 38, 31, 26 ] }
      ],
      "knob": { "label": "k", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Ward and k-means agree on ~9 points in 10 — they're minimising the SAME quantity (within-cluster variance), just by different procedures.", "tone": "info" },
        { "max": 2, "text": "Single linkage barely agrees with either: 'closest two points' builds chains and snakes, a completely different notion of cluster.", "tone": "info" },
        { "max": 4, "text": "🤯 The linkage choice matters more than 'hierarchical vs flat': Ward ≈ k-means with a tree attached; single linkage ≈ something else entirely. Choose linkage by the SHAPE you believe your clusters have.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Ward linkage", "formula": "merge the pair minimising Δ(within-cluster sum of squares)", "text": "sklearn default, needs Euclidean distance. Compact round-ish clusters → Ward; chains/filaments → single; a robust middle ground → average linkage." }
    }
  },
  {
    "q": "Agglomerative clustering builds its tree bottom-up (n−1 merges). There's a mirror-image strategy, divisive clustering, which is rarely used. What is it, and why the rarity?",
    "choices": [
      "Top-down: start with everything in one cluster and recursively split — each split is its own expensive optimisation, so it's costlier and rarely implemented",
      "Bottom-up but with random merge order",
      "It only works on 1-D data",
      "It's another name for k-means",
      "It produces no dendrogram"
    ],
    "explain": "Divisive methods (e.g. DIANA, or bisecting k-means) begin with one all-encompassing cluster and repeatedly choose a cluster to split in two. Finding the BEST binary split of a cluster is itself a hard optimisation (2^(n−1) possible splits, so heuristics like running 2-means inside), whereas 'find the closest pair and merge' is straightforward. Divisive can see global structure first — its early decisions are big-picture — but the cost and scarce library support keep agglomerative as the default; bisecting k-means is the practical survivor.",
    "simple": "Two ways to draw a family tree: start from individuals and marry the closest pairs upward (agglomerative), or start from 'all of humanity' and keep splitting into halves (divisive). Splitting sounds symmetric but isn't: there are astronomically many ways to cut a group in two, and you must choose well every time. Merging just asks 'who's closest?'. That asymmetry is why nearly every library ships the bottom-up version.",
    "widget": {
      "type": "curveStatic",
      "title": "Merging is easy, splitting is hard",
      "world": "The work per step for each strategy as cluster size grows: candidate pairs to compare when merging vs candidate two-way splits when dividing (log-ish scale, capped for display).",
      "xlab": "points in play →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "4",
        "8",
        "12",
        "16",
        "20"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "merge: pairs to compare", "ys": [ 6, 28, 66, 120, 190 ] },
        { "name": "split: ways to cut in two (capped)", "ys": [ 7, 127, 2047, 32767, 200000 ] }
      ],
      "knob": { "label": "Points in play", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Four points: 6 possible merges vs 7 possible splits — at toy scale the two strategies cost about the same.", "tone": "info" },
        { "max": 2, "text": "Twelve points: 66 merge candidates vs 2,047 ways to split. The split count doubles with EVERY added point; the merge count grows politely.", "tone": "warn" },
        { "max": 4, "text": "🤯 Twenty points: 190 vs ~half a million (capped here for display). Exhaustive splitting is hopeless — divisive methods must approximate (e.g. run 2-means inside each split), at which point most people just run… k-means. Hence the empty shelf.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Divisive (top-down) clustering", "formula": "2^(n−1)−1 binary splits vs n(n−1)/2 merge pairs", "text": "Bisecting k-means (repeatedly 2-means-split the worst cluster) is the practical divisive method — sklearn ships it as BisectingKMeans. Everything else hierarchical is agglomerative in practice." }
    }
  },
  {
    "q": "Agglomerative clustering needs the full pairwise-distance picture — memory and time grow roughly with n². Your dataset has 2 million rows. What's the standard workaround?",
    "choices": [
      "Cluster a sample (or k-means-compressed prototypes), build the tree on that, then assign the rest to the nearest cluster",
      "Buy more RAM until n² fits",
      "Run it on each half and concatenate the trees",
      "Sort the data first to make distances cheap",
      "Hierarchical clustering simply cannot be approximated"
    ],
    "explain": "n=2M means ~2×10¹² pairwise distances — hopeless. Practical recipe: draw a representative sample (10–50k) or first compress with MiniBatchKMeans into a few thousand centroids, run agglomerative on those, cut the tree, then label the remaining millions by nearest centroid/cluster. You keep the dendrogram's interpretability at tractable cost — the tree describes prototypes rather than every individual, which is usually all anyone reads anyway.",
    "simple": "You can't seat two million guests at one wedding-planning table, but you don't need to: invite a representative committee, work out the family structure among THEM, then slot everyone else in next to their nearest committee member. The tree you draw is about the committee — and since humans only ever read the top of a dendrogram anyway, that's the part worth paying for.",
    "widget": {
      "type": "curveStatic",
      "title": "The committee trick",
      "world": "Full agglomerative vs sample-then-assign on growing data: runtime (log-ish, capped) and how closely the shortcut's final clusters match the full run's.",
      "xlab": "dataset size →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "5k",
        "20k",
        "100k",
        "500k",
        "2M"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "full run: minutes (capped)", "ys": [ 1, 12, 300, 7000, 99000 ] },
        { "name": "sample+assign: minutes", "ys": [ 1, 2, 4, 9, 22 ] },
        { "name": "agreement with full run (%)", "ys": [ 99, 97, 95, 94, 93 ] }
      ],
      "knob": { "label": "Dataset size", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "At 20k rows the full run is still feasible (minutes) — below ~50k, just run the real thing.", "tone": "info" },
        { "max": 2, "text": "100k rows: five hours vs four minutes, and the shortcut still reproduces 95% of the full run's assignments — the sampled committee captured the structure.", "tone": "info" },
        { "max": 4, "text": "🤯 2M rows: the full run is a fiction (weeks, terabytes of distances) while the shortcut takes 22 minutes at 93% agreement. When the exact algorithm is impossible, 'approximate on prototypes' isn't a compromise — it's the method.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Scaling hierarchical clustering", "formula": "sample / compress to prototypes → tree on prototypes → nearest-assign the rest", "text": "MiniBatchKMeans-to-1000-centroids then Ward on the centroids is a robust recipe. BIRCH does the compression trick natively (a CF-tree of summaries) and ships in sklearn." }
    }
  },
  {
    "q": "sklearn's AgglomerativeClustering accepts a connectivity graph (e.g. each point linked to its 10 nearest neighbours). What does supplying it change about the merges?",
    "choices": [
      "Only clusters that are GRAPH-NEIGHBOURS may merge — clusters must grow through connected regions instead of jumping across gaps",
      "It only speeds things up; results are identical",
      "It fixes the number of final clusters",
      "It converts the method to divisive",
      "It replaces the distance metric with graph hops"
    ],
    "explain": "Unconstrained Ward will happily weld two far-apart blobs whose union keeps variance low — even if empty space separates them. With a connectivity constraint, a merge is legal only when the clusters contain graph-connected points, so clusters follow the data's actual shape (curved sheets, filaments, geographic regions). Bonus: restricting candidate pairs makes big-n runs far faster. Classic demo: the swiss-roll, where constrained Ward tracks the roll instead of cutting through it.",
    "simple": "Unconstrained clustering is allowed to say 'these two groups are similar overall — merge them' even when a canyon separates them. Handing it a neighbour graph adds one rule: you may only merge with groups you actually TOUCH. Clusters must now grow the way ink spreads through paper — along the material, never across a gap. For data that lives on curved sheets or maps, that one rule is the difference between shapes and shrapnel.",
    "widget": {
      "type": "curveStatic",
      "title": "Grow through the material, not across the gap",
      "world": "Ward with and without a 10-NN connectivity graph on datasets of increasingly curved/manifold shape, scored on how well clusters match the true regions.",
      "xlab": "how curved the data's shape is →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "round blobs",
        "ellipses",
        "arcs",
        "spirals",
        "swiss-roll"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "Ward + connectivity graph", "ys": [ 94, 92, 90, 87, 85 ] },
        { "name": "Ward unconstrained", "ys": [ 95, 88, 72, 51, 34 ] }
      ],
      "knob": { "label": "Data shape", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Round blobs: the constraint changes nothing — legal merges and desirable merges coincide, and both versions score ~95.", "tone": "info" },
        { "max": 2, "text": "Arcs: unconstrained Ward starts welding across gaps ('their union is compact!') while the constrained version, forced to grow along the arc, keeps tracking the true regions.", "tone": "warn" },
        { "max": 4, "text": "🤯 Swiss-roll: 85 vs 34. Same linkage, same distances — the only difference is one rule about WHO may marry WHOM. Constraints encode what you know about the data's shape; here that knowledge was worth 51 points.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Connectivity-constrained clustering", "formula": "connectivity = kneighbors_graph(X, 10) → merges allowed only between graph-neighbours", "text": "AgglomerativeClustering(connectivity=...). Use for manifold-shaped or geographic data; it also slashes runtime by shrinking the candidate-merge set." }
    }
  },
  {
    "q": "You must extract ONE clustering from a dendrogram for the report. Reading the tree's merge heights, what marks the most defensible number of clusters?",
    "choices": [
      "Cut through the tallest vertical gap — the longest distance-range where no merges happen marks well-separated clusters",
      "Always cut to get exactly three clusters",
      "Cut at the average merge height",
      "Cut just above the first merge",
      "The dendrogram cannot inform the choice of k"
    ],
    "explain": "Each merge happens at the distance where two clusters were forced together. A long vertical stretch with no merges means: below it, groups formed naturally; above it, only distant groups remained to weld. Cutting inside that tallest gap yields clusters that are internally tight and mutually far — and the cut is STABLE, since any height within the gap gives the same answer. It's the dendrogram's native version of the elbow/silhouette logic.",
    "simple": "Watch the merge heights like a film: tiny weddings, tiny weddings… then a long silence… then one giant forced wedding at the end. The silence is the story — for a huge stretch of distances, nothing wanted to merge, because the remaining groups were genuinely far apart. Cut anywhere inside the silence and you get the same, comfortable answer. Slide the cut through the tree and feel where the answer is stable versus twitchy.",
    "widget": {
      "type": "dendro",
      "title": "Cut through the silence",
      "world": "Nine sensor readings from three machines. Slide the cut line through the whole tree — count clusters at each height and notice where the count REFUSES to change.",
      "linkage": "complete",
      "items": [
        { "name": "s1", "x": 0.3 },
        { "name": "s2", "x": 0.8 },
        { "name": "s3", "x": 1.3 },
        { "name": "s4", "x": 4.6 },
        { "name": "s5", "x": 5 },
        { "name": "s6", "x": 5.5 },
        { "name": "s7", "x": 8.7 },
        { "name": "s8", "x": 9.2 },
        { "name": "s9", "x": 9.8 }
      ],
      "knob": { "label": "Cut height", "min": 0.2, "max": 10, "step": 0.1, "init": 0.2 },
      "insights": [
        { "max": 1.3, "text": "Low cut: the answer changes every nudge — 9 clusters, then 7, then 5. Cuts down here are twitchy: move a hair, get a different report.", "tone": "info" },
        { "max": 4.2, "text": "Now the long silence: from ~1.3 up to ~3.9 the count sits locked at 3. No merges live in this range because the three machine-groups are genuinely far apart.", "tone": "info" },
        { "max": 10, "text": "🤯 Above the gap, the tree forces the final weldings: 3 → 2 → 1 in quick succession, at huge merge distances. The tallest quiet stretch pointed at k=3 all along — that's the dendrogram's own elbow, read straight off the picture.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Choosing k from the dendrogram", "formula": "cut inside the tallest merge-free vertical gap", "text": "Equivalent intuition to the elbow/silhouette: big gap = tight-inside, far-apart clusters. If no tall gap exists, the data may simply not have distinct clusters — also an answer." }
    }
  }
];
