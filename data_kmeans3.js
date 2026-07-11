/* K-Means — Part III: Advanced Study. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).kmeans3 = [

{
  q: "K-means is secretly a special case of fitting a Gaussian Mixture Model with EM. Which restrictions turn the general GMM into k-means, and what do you buy back by lifting them?",
  choices: ["K-means = GMM with spherical, equal-size, equal-weight components and HARD assignments — lifting them buys soft membership probabilities, elliptical clusters, and different cluster sizes", "K-means = GMM run for a single EM step rather than many — lifting that cap buys the full iterative refit, soft probabilities, and clusters that keep on sharpening well past the first pass", "K-means = GMM whose covariances update but whose means stay frozen — lifting the freeze lets the centres drift, giving elliptical clusters and honest soft membership scores", "K-means = GMM restricted to diagonal covariances with soft assignments — lifting that yields full rotated covariances and converts the soft memberships into hard ones", "K-means = GMM stripped of its free mixing weights alone — restoring those weights is what buys elliptical clusters, soft probabilities, and unequal cluster sizes together"],
  explain: "EM for a GMM alternates 'E: compute each point's membership probability under each Gaussian' and 'M: refit each Gaussian to its weighted members' — exactly assignment/update, generalised. Constrain every component to identical spherical covariance (σ²I), equal mixing weights, and round membership probabilities to 0/1, and EM collapses to Lloyd's algorithm. Lifting the constraints: full covariances → elliptical, rotated clusters; free weights → big and small clusters coexist; soft E-step → honest 'this point is 60/40 between segments'. Price: k·d·(d+1)/2 covariance parameters to estimate (needs more data), and covariance_type is a bias-variance dial ('spherical'→'diag'→'full'). BIC/AIC then give principled k selection — something inertia never offered.",
  simple: "K-means is a mixture model wearing a straitjacket: every cluster forced to be a circle, the same size, and every point forced to swear TOTAL allegiance to exactly one cluster. Unbuckle the jacket and you get the full Gaussian mixture: clusters may be stretched ellipses, some big, some small — and points may honestly say 'I'm 60% segment A, 40% segment B', which for borderline customers is the truth. The cost of the freedom is data-hunger: an ellipse in 20 dimensions has a lot of shape to estimate. Same two-step dance underneath — assign, refit — just with probabilities instead of oaths.",
  widget: {
    type: "curveStatic", title: "Unbuckling the straitjacket",
    world: "Elongated, unequal-sized clusters, fitted by k-means and by GMMs of increasing covariance freedom. Cluster-recovery quality vs parameters that must be estimated.",
    xlab: "model →", xs: [0,1,2,3], labels: ["k-means","GMM spherical","GMM diagonal","GMM full"], dec: 0, yunit: "",
    series: [
      { name: "cluster recovery (ARI ×100)", ys: [58, 66, 81, 93] },
      { name: "parameters per cluster", ys: [2, 3, 21, 210] }
    ],
    knob: { label: "Model", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "K-means at 58: it cuts the long thin clusters into round chunks — circles are the only shape in its vocabulary, by construction.", tone: "info" },
      { max: 2, text: "Diagonal covariances (axis-aligned ellipses): recovery jumps to 81 for 21 parameters per cluster — often the sweet spot on real mid-sized data.", tone: "info" },
      { max: 3, text: "🤯 Full covariances: 93 — the rotated ellipses are captured, plus every point now carries membership PROBABILITIES (and BIC can choose k on principle). K-means didn't fail; it was the maximally-constrained corner of this family all along. Know the family and you can dial constraints to your data budget.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "K-means ⊂ Gaussian mixtures", formula: "k-means = EM with σ²I, equal weights, hard E-step · GaussianMixture(covariance_type=…) lifts each",
      text: "sklearn: GaussianMixture(n_components, covariance_type='full'|'diag'|'spherical') + .predict_proba for soft membership, BIC/AIC for k. Reach for it when clusters aren't round blobs — or when 'how sure?' matters." }
  }
},

{
  q: "Lloyd's algorithm converges — but only to a LOCAL minimum of inertia, which is why sklearn runs n_init=10 restarts by default. What does the restart machinery actually protect you from?",
  choices: ["Bad initial centroid draws that trap the algorithm in visibly wrong solutions (two centroids sharing one blob, one straddling two) — run many seeded starts, keep the lowest-inertia finish", "Slow first passes on very large data, where a poor start forces many extra assign-update rounds before inertia flattens — the extra restarts amortise that warm-up cost away", "An elbow curve that reads falsely low at some k, which a single poor start can cause — averaging inertia across many restarts straightens out the whole curve so the real elbow clearly reappears", "Numerical overflow when two centroids land on one identical point and a distance collapses — reseeding away from the duplicates keeps every squared distance safely finite", "Centroids drifting outside the data's range in the first steps, which restarting pulls back inward so each centre stays inside the cloud of points it is meant to summarise"],
  explain: "Each assign/update step strictly decreases inertia, so the algorithm always converges — to the nearest basin of whatever start it was given. Bad basins are common and qualitatively wrong: two centroids splitting one true cluster while two true clusters share a centroid elsewhere. k-means++ (spread-out probabilistic seeding) makes good basins likelier and carries an O(log k) expected-quality guarantee, but it's probabilistic — hence belt AND braces: n_init independent runs, keep the best final inertia. Practical notes: inertia comparisons are only meaningful for the same k and same (scaled) data; sklearn 1.4+ defaults n_init='auto'; MiniBatchKMeans is noisier per run so restarts matter more. Cheap insurance against silently absurd clusterings.",
  simple: "K-means is a ball rolling downhill into the nearest valley — it always settles somewhere, but WHICH valley depends entirely on where you dropped it. Drop badly (two balls in the same blob) and it settles into an arrangement that's confidently, permanently wrong: it will never climb back out. The defence is embarrassingly effective: drop the balls ten times from different smart-random spots (k-means++ spreads the drops), keep the best-settled outcome. Ten restarts of a fast algorithm cost seconds; one bad clustering shipped to marketing costs a quarter. Randomised algorithms aren't run once — that's the whole liturgy.",
  widget: {
    type: "curveStatic", title: "Ten drops, keep the best",
    world: "Distribution of final inertia across 50 random starts on the same data (sorted best→worst), for naive random seeding vs k-means++ — and what n_init=10 effectively buys you.",
    xlab: "runs sorted best → worst →", xs: [0,1,2,3,4], labels: ["best","10th","25th","40th","worst"], dec: 0, yunit: "",
    series: [
      { name: "k-means++ starts: final inertia", ys: [100, 102, 105, 118, 141] },
      { name: "naive random starts: final inertia", ys: [100, 109, 127, 156, 208] }
    ],
    knob: { label: "Run rank", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "The best runs of both seeders find the same solution (inertia 100) — good basins exist everywhere; the question is only how often you land in one.", tone: "info" },
      { max: 3, text: "Mid-pack naive runs sit 27–56% above optimal — those are the two-centroids-in-one-blob outcomes, converged and confident. k-means++'s spread-out seeding keeps most runs within 5%.", tone: "warn" },
      { max: 4, text: "🤯 Worst naive run: DOUBLE the optimal inertia — a structurally wrong clustering that a single-run workflow would have shipped. n_init=10 with k-means++ makes the odds of ALL ten runs landing badly astronomically small. Seconds of compute as insurance against confident nonsense.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Local minima, k-means++ and n_init", formula: "converges to nearest basin · spread seeding + restarts ≈ global in practice",
      text: "KMeans(n_init=10, init='k-means++') is the liturgy. Compare inertia only within same k and scaling. MiniBatch runs are noisier — restart them more, not less." }
  }
},

{
  q: "K-means assigns each point to its nearest centroid, which carves space into Voronoi cells. This single geometric fact explains its two most notorious failure modes. Which are they?",
  choices: ["Boundaries between clusters are always STRAIGHT lines equidistant between centroids — so k-means cannot respect elongated/curved cluster shapes, and it tends to split big clusters to balance spatial extent", "Boundaries between clusters are always CURVED arcs that bow around the denser centroid — so k-means over-merges neighbouring clusters, and it tends to leave the sparser outlying points unassigned as background noise", "Every Voronoi cell is convex and must enclose its own centroid — so k-means can never place a centre outside its members, and it tends to ignore any cluster smaller than the average one", "Boundaries shift with the order the points arrive in — so k-means returns a different clustering on every pass, and it tends to chain nearby clusters into one long connected strand", "Voronoi cells all have equal area by construction — so k-means forces every cluster to hold the same point count, and it tends to fracture one dense cluster across several equal cells"],
  explain: "Assignment-by-nearest-centroid means every cluster occupies a convex Voronoi polytope; boundaries are perpendicular-bisector hyperplanes between centroid pairs. Consequences: (1) a banana/annulus/elongated cluster cannot fit inside one convex cell — k-means dices it; (2) minimising inertia rewards centroids that split spatially LARGE clusters (halving a wide cluster's spread saves more inertia than honouring a small one) — so a big diffuse cluster gets multiple centroids while compact ones merge with neighbours: the 'equal-extent' bias (often misnamed equal-size). Remedies map to the diagnosis: GMM-full for ellipses, spectral clustering or DBSCAN for curved/manifold shapes, whitening for global elongation. Reading the geometry tells you BEFORE running which data will betray k-means.",
  simple: "Every point pledges to the nearest capital city — so the map of clusters is a map of straight-line borders, each border exactly midway between two capitals. Study that map and both scandals follow. Curved nations are impossible: a banana-shaped crowd can't live inside straight borders, so it's carved between capitals. And the accounting favours splitting sprawl: planting a second capital inside one huge sprawling nation saves more total commuting than giving a tiny dense village its own — so the sprawl gets two capitals and the village gets annexed. Not bugs: theorems of nearest-capital geometry. Change the geometry (mixtures, density methods), not your hopes.",
  widget: {
    type: "curveStatic", title: "Straight borders, predictable scandals",
    world: "Datasets of increasingly non-convex cluster shape, clustered by k-means vs a density method (same k where applicable). Voronoi geometry predicts exactly where the red line falls off.",
    xlab: "true cluster shape →", xs: [0,1,2,3,4], labels: ["round, equal","round, mixed sizes","ellipses","crescents","rings"], dec: 0, yunit: "",
    series: [
      { name: "DBSCAN/spectral recovery (ARI ×100)", ys: [92, 90, 88, 91, 90] },
      { name: "k-means recovery (ARI ×100)", ys: [95, 78, 64, 41, 12] }
    ],
    knob: { label: "Shape", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Round, equal blobs: k-means WINS (95 vs 92) — when the truth is convex cells, nothing matches the method whose vocabulary is convex cells. Right tool, right terrain.", tone: "info" },
      { max: 2, text: "Mixed sizes and ellipses: recovery slides to 78, then 64 — the equal-extent bias is splitting the sprawling cluster and annexing the compact one, exactly as the inertia accounting predicts.", tone: "warn" },
      { max: 4, text: "🤯 Rings: 12 — near-total failure, foreseeable from pure geometry without running anything: no convex cell contains a ring. The skill isn't memorising 'k-means bad at rings'; it's deriving failures from the assignment rule. Every clusterer has a geometry; match it to your data's.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Voronoi geometry of k-means", formula: "nearest-centroid ⇒ convex cells, hyperplane borders ⇒ no curved/elongated clusters, extent-splitting bias",
      text: "Diagnose by plotting (or silhouette-per-cluster). Ellipses → GMM-full; manifolds/rings → DBSCAN or spectral clustering; global stretch → whiten first." }
  }
},

{
  q: "Marketing ran k-means twice (different seeds) and got 'different segments', sparking panic. The labels differ — but do the GROUPINGS? Adjusted Rand Index (ARI) answers this. What does it measure, and why 'adjusted'?",
  choices: ["Agreement between two clusterings over point PAIRS (together-vs-apart), renamed labels ignored — 'adjusted' subtracts the agreement random labelings would get by chance, so 0 = chance, 1 = identical groupings", "Agreement between two clusterings over the individual POINTS once their labels have been best-matched — 'adjusted' rescales by the largest cluster's size, so 0 = fully disjoint, 1 = perfectly identical groupings", "Overlap of two clusterings measured as the information they share in bits — 'adjusted' divides by the average entropy of the two labelings, so 0 = independent, 1 = identical groupings", "Distance between the two runs' centroid sets after optimal pairing — 'adjusted' subtracts the spread expected from random centres, so 0 = far apart, 1 = coincident centroid sets", "Fraction of point PAIRS the two runs place together — 'adjusted' subtracts the share a single run keeps together on its own, so 0 = never agree, 1 = always agree perfectly"],
  explain: "Cluster labels are arbitrary names — run 2 may call 'cluster 0' what run 1 called 'cluster 2', so comparing label integers is meaningless. Rand-style indices sidestep names by auditing every PAIR of points: do the two clusterings agree on 'same group' vs 'different groups'? Raw Rand is inflated (with many clusters, most pairs are 'apart' in both runs by luck) — ARI subtracts the expected chance agreement and rescales, making 0 = 'no better than random relabeling' and 1 = identical partitions, comparable across k. NMI is the information-theoretic sibling. Uses: stability auditing across seeds (the marketing panic), comparing algorithms, validating against known classes when they exist. Here: ARI 0.93 — same segments, different names; panic cancelled.",
  simple: "Two teachers sorted the same class into reading groups. Teacher A's 'group 1' is teacher B's 'group 3' — the NAMES will never match, and counting matching names measures nothing. The honest question ignores names entirely: for each PAIR of students, did both teachers keep them together, or both keep them apart? Mostly yes → same groupings in different costumes. One correction is needed: even random sorting gets lots of pairs 'right' by luck (most pairs end up separated under any sorting), so the score subtracts that luck — after adjustment, 0 means 'as similar as random', 1 means 'identical sortings'. Marketing's two runs score 0.93: same segments, different serial numbers.",
  widget: {
    type: "curveStatic", title: "Same groups, different names?",
    world: "Pairs of clusterings compared at increasing true divergence — raw label-matching, raw Rand, and ARI. Watch which metric tells the truth at both ends.",
    xlab: "how different the two clusterings truly are →", xs: [0,1,2,3,4], labels: ["identical (renamed)","1 border shifts","several shifts","half reorganised","unrelated"], dec: 2, yunit: "",
    series: [
      { name: "ARI", ys: [1.0, 0.93, 0.71, 0.34, 0.01] },
      { name: "raw Rand index", ys: [1.0, 0.97, 0.88, 0.72, 0.55] },
      { name: "naive label match rate", ys: [0.22, 0.2, 0.31, 0.18, 0.24] }
    ],
    knob: { label: "True divergence", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Identical groupings, shuffled names: naive label-matching reports 0.22 — nonsense — while ARI reads a clean 1.0. Names were never the object; pairs are.", tone: "info" },
      { max: 2, text: "A few border customers moving between segments: ARI 0.71 — quantified drift you can track per retrain, per month, as a stability KPI.", tone: "info" },
      { max: 4, text: "🤯 Totally unrelated clusterings: raw Rand still says 0.55 (most pairs are 'apart' under both, by pure arithmetic) while ARI reads 0.01 — the chance-adjustment is what makes zero MEAN zero. Marketing's panic case scored 0.93: same segments wearing different badges. Compare partitions, never label integers.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Adjusted Rand Index", formula: "pair-agreement, chance-corrected: 0 = random, 1 = identical partitions",
      text: "sklearn: adjusted_rand_score, plus NMI/AMI. Use for seed-stability audits, algorithm comparisons, and scoring against known classes. Label integers are costumes." }
  }
},

{
  q: "With only 50 labelled examples and 10,000 unlabelled ones, a team lifts accuracy by clustering FIRST and then spending labels per cluster. What's the semi-supervised mechanism at work?",
  choices: ["Cluster the unlabelled mass, then let each cluster's few labels speak for the whole cluster (or use distances-to-centroids as features) — unlabelled data reveals structure that makes 50 labels go a hundred times further", "Train on the 50 labels first, predict all 10,000 rows, then fold the most confident predictions back in as fresh labels and refit over several rounds — the model's own confident guesses grow the tiny training set a hundredfold", "Cluster only the 50 labelled points to fix their centres, then label each of the 10,000 by its nearest labelled centre — the handful of labels define the groups the unlabelled points must join", "Oversample the 50 labelled rows until they match the 10,000 in count, then cluster the balanced mixture so the rare labels are no longer swamped — rebalancing is what makes the few labels count", "Fit a single cluster over all the data, then rank the 10,000 by distance to its centre and hand-label the farthest points as a new minority class — the outliers become the fresh labels"],
  explain: "Labels are expensive; unlabelled rows are nearly free — and they carry the geometry: where the data masses, where the gaps run. Cluster-then-label exploits the cluster assumption (points in one dense group tend to share a class): k-means on all 10k rows, then either (a) assign each cluster its labelled members' majority class, (b) spend NEW labels on cluster MEDOIDS — one strategic label covers hundreds of rows, or (c) feed cluster ids/centroid distances as features into a supervised model trained on the 50. Related machinery: self-training, LabelPropagation/LabelSpreading (graph-based label diffusion). When the assumption holds, tiny-label regimes improve dramatically; when clusters straddle classes, the same mechanism confidently mislabels — so audit cluster purity on what labels you have.",
  simple: "Fifty name-tags for a party of ten thousand. Wasteful plan: fifty random tags, learn from those alone. Better: notice first that the crowd naturally stands in fifteen tight circles (clustering needs no tags at all) — then read the few tags inside each circle and let them name the whole circle. One tag inside a tight circle effectively labels two hundred people. Better still, spend tags deliberately: walk to each circle's CENTRE and ask that person. The unlabelled crowd was never useless — it showed you the party's structure, and structure is what converts fifty facts into ten thousand good guesses. (Caveat: if a circle mixes two classes, its tag lies for half of them — check the circles you can.)",
  widget: {
    type: "curveStatic", title: "Fifty tags, ten thousand guests",
    world: "Accuracy with 50 labels total, under four strategies for using the 10,000 unlabelled rows — swept over how well the cluster assumption holds (cluster purity).",
    xlab: "strategy →", xs: [0,1,2,3], labels: ["50 labels alone","+ cluster features","cluster-then-label","medoid labelling"], dec: 0, yunit: "%",
    series: [
      { name: "clean clusters (purity 95%)", ys: [61, 71, 83, 87] },
      { name: "muddled clusters (purity 70%)", ys: [61, 66, 64, 68] }
    ],
    knob: { label: "Strategy", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "50 labels alone: 61% either way — the supervised-only baseline never touches the 10,000 unlabelled rows, so cluster quality is irrelevant to it (and so is most of your data).", tone: "info" },
      { max: 2, text: "Cluster-then-label with clean clusters: 83% — each label is amplified across its cluster. With muddled clusters: 64%, barely above baseline, because impure clusters amplify ERRORS just as efficiently.", tone: "warn" },
      { max: 3, text: "🤯 Medoid labelling on clean clusters: 87% — the same 50-label budget, spent at the structure's centres instead of at random, closes most of the gap to full supervision. The unlabelled data didn't add answers; it showed where each answer would echo furthest. Semi-supervised learning in one sentence.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Cluster-then-label (semi-supervised)", formula: "unlabelled data → structure · labels → spent per cluster (medoids best) · works iff clusters ≈ classes",
      text: "sklearn: LabelPropagation/LabelSpreading automate the graph version; KMeans.transform gives cluster features. Always audit cluster purity on the labels you DO have." }
  }
},

{
  q: "Close the unsupervised loop: k-means, GMM, DBSCAN, agglomerative — a colleague asks 'which clusterer should I use?'. What's the honest decision procedure, given that no labels exist to arbitrate?",
  choices: ["Interrogate the data and the QUESTION: expected cluster shape, noise, k known?, scale, need for probabilities or hierarchy — then validate the finalists with stability checks and internal metrics, because 'best clusterer' is undefined without assumptions", "Run all four algorithms on the same data and keep whichever produces the highest silhouette score, since silhouette is a label-free internal metric that ranks any clustering fairly and can settle the entire choice cleanly with one clearly defensible number", "Start with k-means every single time for speed, and only reach for a heavier method once its silhouette falls below a fixed threshold, since the simplest algorithm that clears the bar is always the safest and right default", "Choose purely by dataset SIZE: MiniBatch for millions of rows, plain k-means for thousands, agglomerative for hundreds, since compute budget is really the only constraint a clustering decision ever has to respect in practice", "Cluster with all four, keep the points every method agrees on as a solid core, and label the remainder as noise, since agreement across independent algorithms is the closest thing to ground truth available without labels"],
  explain: "Clustering has no ground truth, so algorithm choice IS assumption choice: k-means (convex blobs, k known, huge scale, speed), GMM (ellipses, soft membership, BIC-driven k), DBSCAN/HDBSCAN (arbitrary shapes, noise points wanted, density meaningful), agglomerative (hierarchy wanted, small-to-mid n, dendrogram communication). Then validate what can be validated: stability under resampling/seeds (ARI between runs), internal metrics (silhouette — noting it favours convex shapes, so it can't referee k-means vs DBSCAN fairly), and above all downstream utility: do the clusters predict something, move a metric, survive expert review? A clustering that's stable, explicable and USEFUL is right in the only sense available. The question 'which clusterer' is really 'what do I believe a cluster IS, here?'.",
  simple: "'Which clusterer is best?' has the same answer as 'which vehicle is best?' — best for what terrain, carrying what? Round groups, know how many, millions of rows → k-means. Stretched groups, want 'how sure?' per point → mixtures. Weird shapes, noise to quarantine, unknown count → density methods. Want the whole family tree to browse → hierarchical. Then, since no answer key exists, test like an engineer: does the clustering come out the SAME on a resample (stability)? Do the groups mean something a domain expert nods at? Do they predict anything? Useful, stable, explicable — that's what 'correct' means in a world without labels. The algorithm was never the decision; the assumptions were.",
  widget: {
    type: "curveStatic", title: "Terrain map for clusterers",
    world: "Four clusterers scored (0–100 suitability) across five common terrains. No line wins everywhere — the pattern of WHERE each wins is the decision procedure.",
    xlab: "terrain →", xs: [0,1,2,3,4], labels: ["round blobs, k known, 10M rows","ellipses, need P(member)","odd shapes + noise","hierarchy for the report","tiny n, exploratory"], dec: 0, yunit: "",
    series: [
      { name: "k-means / MiniBatch", ys: [95, 55, 25, 30, 65] },
      { name: "GMM", ys: [70, 95, 30, 25, 60] },
      { name: "DBSCAN / HDBSCAN", ys: [35, 30, 95, 20, 55] },
      { name: "agglomerative + dendrogram", ys: [30, 25, 40, 95, 90] }
    ],
    knob: { label: "Terrain", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Blobs at scale: k-means/MiniBatch at 95 — speed, simplicity, and the data matches its convex-cell vocabulary. Everything else is paying for machinery this terrain doesn't need.", tone: "info" },
      { max: 2, text: "Odd shapes with noise: density methods at 95 while k-means sits at 25 — the exact inversion of column one. Two questions in, the 'best algorithm' has already changed twice.", tone: "info" },
      { max: 4, text: "🤯 Four terrains, four different champions. And the final referee is never silhouette alone (it favours the convex methods structurally) but the engineering triad: stable across reruns, explicable to domain owners, useful downstream. Clustering returns hypotheses; validation is where they become findings.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Choosing a clusterer", formula: "assumptions (shape, noise, k, scale, output) → shortlist · stability + utility → verdict",
      text: "The meta-lesson of Topics 12–14: every clusterer defines 'cluster' differently. State the definition you need, then pick the algorithm that embodies it." }
  }
}
];
