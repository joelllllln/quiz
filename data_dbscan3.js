/* DBSCAN — Part III: Advanced Study. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).dbscan3 = [

{
  q: "HDBSCAN is billed as 'DBSCAN without the eps headache'. It replaces the fixed radius with a hierarchy built on MUTUAL REACHABILITY distance. What problem does that redefined distance specifically solve?",
  choices: ["It inflates distances in sparse regions (via each point's core-distance), so a single density threshold no longer shreds sparse clusters while merging dense ones — clusters at DIFFERENT densities coexist", "It shrinks distances within dense regions (via each point's core-distance), so a single global eps finally fits everywhere and an ordinary DBSCAN scan then recovers every cluster at one uniform density threshold", "It replaces raw distance with the number of neighbours two points share, so densely linked points count as close and the hierarchy groups by connectivity rather than by radius", "It averages each pair's distance with both points' core-distances, smoothing local noise so outliers stop distorting the minimum spanning tree the hierarchy is built on", "It rescales every feature by its local density before measuring distance, so dense and sparse clusters are stretched to the same apparent density and one threshold splits them all"],
  explain: "Plain DBSCAN's one eps encodes one density; on data with a dense downtown and a sparse countryside, no single eps is right (shred the sparse or merge the dense). HDBSCAN defines mutual reachability distance d_mreach(a,b) = max(core_dist_k(a), core_dist_k(b), d(a,b)) — where core_dist_k is the distance to a point's k-th neighbour. In sparse regions core distances are large, so mreach 'pushes points apart' there, normalising density across the space. Building a minimum spanning tree on mreach and condensing it yields a cluster hierarchy; HDBSCAN then extracts the most STABLE clusters (those persisting over the widest range of density levels) and marks the rest noise. Net: varying-density clusters are found, eps is gone, and the main knob is the intuitive min_cluster_size.",
  simple: "DBSCAN's single eps is one definition of 'crowded' stamped on the whole map — fatal when downtown and the countryside have different natural crowding. HDBSCAN's clever move: stretch the ruler in empty areas. It measures how lonely each point already is (distance to its k-th neighbour) and folds that into every distance, so two points in the sparse countryside are treated as 'far' even if physically close — evening out the densities so ONE analysis can find both the tight downtown cluster and the loose rural one. Then, instead of a fixed cutoff, it keeps whichever clusters survive across the widest range of crowding levels — the stable, real ones — and calls the flimsy rest noise. Eps replaced by 'how big is a real cluster', which anyone can answer.",
  widget: {
    type: "curveStatic", title: "Stretching the ruler where it's empty",
    world: "Data with clusters at very different densities. Best-effort single-eps DBSCAN vs HDBSCAN, as the density gap widens.",
    xlab: "density gap between clusters →", xs: [0,1,2,3,4], labels: ["equal","2×","5×","15×","50×"], dec: 0, yunit: "%",
    series: [
      { name: "HDBSCAN recovery (ARI ×100)", ys: [90, 89, 87, 85, 81] },
      { name: "DBSCAN best single eps (ARI ×100)", ys: [91, 82, 63, 44, 29] }
    ],
    knob: { label: "Density gap", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Equal densities: DBSCAN slightly ahead — when one eps genuinely fits, the simpler, cheaper method wins. HDBSCAN's machinery earns nothing here.", tone: "info" },
      { max: 2, text: "5× gap: DBSCAN at 63 (any eps either shreds the sparse cluster into noise or floods the dense one); HDBSCAN holds 87 because mutual-reachability already normalised the densities.", tone: "info" },
      { max: 4, text: "🤯 50× gap: 81 vs 29. HDBSCAN never chose an eps — it evened out density with core-distances, built a hierarchy, and kept the stable clusters. The core-distance term is the whole trick: it's what lets one run see downtown AND the countryside.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "HDBSCAN & mutual reachability", formula: "d_mreach(a,b)=max(core_k(a),core_k(b),d(a,b)) → density-normalised hierarchy → stable clusters",
      text: "sklearn: HDBSCAN(min_cluster_size=…). Handles varying density, abolishes eps, and even yields soft membership/outlier scores. The modern default over DBSCAN for messy data." }
  }
},

{
  q: "OPTICS doesn't output clusters directly — it produces a 'reachability plot', a 1-D bar chart from which clusters are then read. How does that plot encode the cluster structure at ALL density levels at once?",
  choices: ["It orders points so density-connected ones sit adjacent, plotting each point's reachability distance — VALLEYS are clusters, PEAKS are the sparse gaps between them, and cutting at any depth recovers a DBSCAN result for that eps", "It sorts points by their local density and plots each one's neighbour count — PEAKS are the dense cluster cores and VALLEYS are the empty gaps between them, so a horizontal cut at any height keeps only the peaks that rise above it", "It orders points by distance from the global centroid and plots that distance — VALLEYS are the points near the centre while PEAKS are the outliers, and a cut at any depth peels off one more outer shell of points", "It arranges points along the minimum spanning tree and plots each edge's weight — long edges mark cluster boundaries, and cutting the plot at any weight severs the tree into that many separate clusters", "It orders points by processing time and plots how far each was from the previously visited point — VALLEYS show where the scan slowed and PEAKS where it jumped, tracing the visit path"],
  explain: "OPTICS walks the data in a density-aware order (always expanding toward the closest-reachable unprocessed point), recording each point's reachability distance — roughly, how tight the neighbourhood was when it was reached. Plotted in that order, the bars form a landscape: a dense cluster becomes a contiguous VALLEY of low reachability, and the sparse space between clusters spikes into PEAKS. Because the ordering respects density everywhere, a horizontal cut at height ε reproduces exactly the DBSCAN clustering for that eps — but the full plot shows EVERY level simultaneously, so nested and varying-density clusters appear as valleys-within-valleys. Extraction: cut at a level (=DBSCAN-equivalent) or use the xi method to detect valley steepness (density-adaptive, like HDBSCAN). It's DBSCAN's information, unrolled into a browsable 1-D profile instead of a single hard answer.",
  simple: "Imagine walking the dataset in a special order that keeps each point next to its densest available neighbour, and at each step noting 'how cramped was it here?'. Draw those numbers as a skyline: cramped stretches (real clusters) show up as long low VALLEYS, and the empty gaps between clusters spike into PEAKS. Now you don't have to pre-commit to one 'crowdedness' setting — the whole skyline is in front of you. Slice it high and you get a few big clusters; slice it low and each splits into tighter sub-clusters; slice it at height ε and you've reproduced exactly what DBSCAN would have said for that eps. It's DBSCAN's every-possible-answer, laid out as a landscape you can read.",
  widget: {
    type: "curveStatic", title: "Reading the skyline",
    world: "An OPTICS reachability plot: points in OPTICS order (three clusters of different density, with noise between). Slide across and see valleys become clusters, peaks become gaps.",
    xlab: "points in OPTICS order →", xs: [0,1,2,3,4,5,6], labels: ["dense A","dense A","gap","cluster B","gap","sparse C","sparse C"], dec: 2, yunit: "",
    series: [
      { name: "reachability distance", ys: [0.15, 0.18, 0.95, 0.34, 1.1, 0.62, 0.66] }
    ],
    knob: { label: "Position in ordering", min: 0, max: 6, step: 1, init: 0 },
    insights: [
      { max: 1, text: "The opening valley (reachability ~0.16): tightly-packed cluster A. Low, flat stretches are dense clusters — the depth of the valley IS the cluster's density.", tone: "info" },
      { max: 4, text: "Spikes at positions 2 and 4 (0.95, 1.1): the sparse gaps BETWEEN clusters — you had to reach far to continue, so reachability jumps. Peaks are boundaries.", tone: "info" },
      { max: 6, text: "🤯 Cluster C is a shallower, higher valley (~0.64) than A (~0.16) — different density, same plot, both readable. A horizontal cut at 0.5 splits them DBSCAN-style; the xi method instead detects valley steepness, adapting to each. One 1-D profile holds every eps at once.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "OPTICS reachability plot", formula: "density-ordered points · valleys = clusters, peaks = gaps · cut at ε = DBSCAN(eps=ε)",
      text: "sklearn: OPTICS(min_samples=…, cluster_method='xi' or 'dbscan'). Explore structure across all densities visually before committing to any single clustering." }
  }
},

{
  q: "Under the curse of dimensionality, DBSCAN quietly stops working long before it errors: in 50-D, choosing eps becomes near-impossible. What breaks, mechanically?",
  choices: ["Distances concentrate — nearly all point-pairs sit at similar distances — so the k-distance plot flattens into no elbow, and any eps either captures everyone or no one: density stops being locally meaningful", "Distances explode — every pair of points sits impossibly far apart — so the k-distance plot climbs steeply everywhere with no flat shelf, and any workable eps must grow with the dimension count until it swallows the whole set", "The count of neighbours within any fixed eps grows exponentially with dimension, so every point clears its minPts quota and the whole dataset collapses into one enormous core cluster", "Each added dimension multiplies the cost of every radius query, so DBSCAN still finishes but the k-distance plot takes too long to compute and eps ends up guessed blind", "Empty space between clusters vanishes as volume concentrates near the hypersphere's surface, so adjacent clusters end up touching and no eps can hold them apart anymore"],
  explain: "DBSCAN rests on density = neighbours-within-eps being LOCALLY informative: dense regions much denser than sparse ones. High dimensions destroy that contrast (the same concentration-of-distances that hobbles kNN): the ratio of nearest to farthest neighbour distance approaches 1, so every point has roughly the same k-distance. The k-distance plot — your eps-selection tool — loses its elbow (it's nearly flat), and no eps separates 'dense' from 'sparse' because that distinction has evaporated. Symptoms: everything is one cluster, or everything is noise, with a razor-thin unstable eps between. Remedies: reduce dimensions first (PCA/UMAP to ~10-50D), use a domain-appropriate metric (cosine for text/embeddings restores contrast), switch to subspace/density methods built for high-D, or accept that global density clustering may be the wrong tool. Knowing WHEN density is meaningless is as important as knowing the algorithm.",
  simple: "DBSCAN's entire premise is that 'crowded here, empty there' means something. In very high dimensions, a strange thing happens: everybody ends up roughly equally far from everybody else (the same reason 'nearest neighbour' loses meaning for kNN). So there's no crowded-vs-empty contrast left to detect — the tool you use to pick eps (the k-distance curve) goes flat, and any eps you try flips between 'one giant cluster' and 'all noise' with nothing sensible in between. Nothing crashes; the concept of local density just quietly becomes meaningless. The fix isn't a better eps — it's fewer dimensions first (PCA/UMAP), or a metric like cosine that revives contrast, or admitting density clustering doesn't fit this space.",
  widget: {
    type: "curveStatic", title: "When density loses meaning",
    world: "The k-distance plot's ELBOW SHARPNESS (how readable eps is) and DBSCAN's cluster recovery as dimensions grow — with a 'PCA to 10-D first' remedy line.",
    xlab: "dimensions →", xs: [0,1,2,3,4], labels: ["2","5","15","50","200"], dec: 0, yunit: "%",
    series: [
      { name: "DBSCAN recovery, raw dims (%)", ys: [90, 84, 61, 28, 11] },
      { name: "elbow sharpness of k-dist plot (%)", ys: [95, 80, 45, 15, 4] },
      { name: "DBSCAN after PCA→10D (%)", ys: [90, 86, 83, 80, 76] }
    ],
    knob: { label: "Dimensions", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "2–5 dimensions: the k-distance plot has a crisp elbow (sharpness 80-95%), eps is easy to read, DBSCAN thrives. Its home turf.", tone: "info" },
      { max: 3, text: "50 dimensions: elbow sharpness 15% — the plot is nearly flat, so eps-selection is guesswork, and recovery has collapsed to 28. Nothing errored; density just stopped being local.", tone: "warn" },
      { max: 4, text: "🤯 The remedy line stays near 80 by reducing to 10-D FIRST — restoring the distance contrast DBSCAN needs. The deep lesson recurs across Topics 12–15: high-dimensional distance methods need dimensionality reduction as life support, and knowing a tool's failure regime is knowing the tool.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "DBSCAN in high dimensions", formula: "distance concentration → flat k-distance plot → eps ill-defined → density meaningless",
      text: "Reduce dimensions first (PCA/UMAP), use cosine for embeddings/text, or switch methods. Same concentration curse that hobbles kNN and inflates emptiness for k-means." }
  }
},

{
  q: "A geospatial team clusters GPS pings (latitude, longitude) with DBSCAN and Euclidean distance. Clusters near the poles come out distorted and eps means different real distances at different latitudes. What's the correct fix?",
  choices: ["Use the haversine metric (great-circle distance on a sphere) with eps in radians — Euclidean treats lat/long as a flat grid, which warps badly away from the equator", "Use the Manhattan metric (summed north-south and east-west gaps) with eps in kilometres — Euclidean's diagonals understate real travel distance across the dense street grid of a typical city centre", "Multiply longitude by the cosine of the latitude to stretch it back, so Euclidean on the adjusted grid gives one eps the same real-world meaning at every latitude", "Standardise latitude and longitude to zero mean and unit variance, so a single eps spans an equal spread of each and polar clusters stop squashing into ellipses", "Raise min_samples with latitude so denser polar neighbourhoods need more members, cancelling the grid distortion without touching the distance metric"],
  explain: "Latitude/longitude are angles on a sphere, not Cartesian coordinates: one degree of longitude is ~111km at the equator but shrinks to zero at the poles, so Euclidean distance on raw lat/long systematically distorts — a fixed eps spans different real distances at different latitudes, and near-polar clusters warp. The haversine formula computes true great-circle distance between two (lat, long) points on a sphere; feeding metric='haversine' (with coordinates in RADIANS, eps as arc-length in radians: eps_km / 6371) makes DBSCAN's neighbourhoods correspond to real physical distances everywhere. General principle: DBSCAN accepts ANY metric, and choosing the metric that matches your data's true geometry is as decisive as eps itself — cosine for text/embeddings, haversine for geo, precomputed distance matrices for graphs or custom similarities. The algorithm is metric-agnostic; correctness is metric-dependent.",
  simple: "Treating latitude and longitude as if they were flat x/y coordinates is like navigating with a map that's been stretched at the top — fine near the equator, badly warped near the poles, where a degree of longitude shrinks from 111km to almost nothing. So a single eps means '100km' in Kenya and '30km' in Norway: same number, different real distance. The fix is to tell DBSCAN the world is round: the haversine metric measures true distance along the globe's surface, so a neighbourhood of 'within 100km' means 100km everywhere. DBSCAN happily accepts any distance rule — the trick is feeding it the one that matches reality. Geography needs great-circle distance; text needs cosine; each domain, its metric.",
  widget: {
    type: "curveStatic", title: "The world is round; the grid isn't",
    world: "DBSCAN clustering GPS pings at increasing latitude, Euclidean-on-raw-degrees vs haversine. Cluster-quality tracks how badly the flat-grid assumption warps.",
    xlab: "latitude of the data →", xs: [0,1,2,3,4], labels: ["equator","30°","50°","70°","polar"], dec: 0, yunit: "%",
    series: [
      { name: "haversine metric (ARI ×100)", ys: [93, 92, 92, 91, 90] },
      { name: "Euclidean on raw lat/long (ARI ×100)", ys: [91, 84, 71, 52, 28] }
    ],
    knob: { label: "Latitude", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "At the equator both agree (~92) — a degree of longitude is at its widest and the flat-grid approximation is least wrong. This is where the bug hides during testing.", tone: "info" },
      { max: 2, text: "50° latitude (London, Vancouver): Euclidean drops to 71 — longitude degrees are now ~30% shorter than latitude degrees, so its neighbourhoods are squashed ellipses, not circles.", tone: "warn" },
      { max: 4, text: "🤯 Near the poles: haversine holds at 90 while Euclidean collapses to 28 — the flat grid's distortion is total where meridians converge. DBSCAN was never wrong; the METRIC was. Matching the metric to the data's true geometry (haversine for geo, cosine for embeddings) is a first-class modelling decision, not a detail.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Metric choice in DBSCAN", formula: "haversine for geo (radians, eps = km/6371) · cosine for embeddings · precomputed for graphs",
      text: "sklearn: DBSCAN(metric='haversine'), coordinates in radians. Any density method inherits this: the neighbourhood is only as meaningful as the distance defining it." }
  }
},

{
  q: "For a customer-similarity graph (nodes = customers, weighted edges = interaction strength), you want to find communities. Spectral clustering is the go-to. What is it fundamentally doing?",
  choices: ["Embedding the graph into a few dimensions using the eigenvectors of its Laplacian (which encode connectivity), then running k-means there — so 'clusters' become well-CONNECTED groups, not spatially compact ones", "Ranking nodes by the leading eigenvector of the adjacency matrix's largest eigenvalue (which scores influence), then splitting at the median value — so 'clusters' become the most CENTRAL nodes set against the peripheral ones", "Repeatedly cutting the single heaviest edge of the graph until it falls into pieces, then labelling each connected component a cluster — so 'clusters' become groups joined only by WEAK links", "Placing nodes by the eigenvectors of their feature covariance matrix (a PCA of the raw attributes), then running k-means there — so 'clusters' become groups that are COMPACT in the top principal directions", "Diffusing labels across edges from a few seed nodes until every node adopts its neighbours' majority — so 'clusters' become regions reachable by the strongest PROPAGATION paths"],
  explain: "Spectral clustering reframes clustering as graph partitioning: build a similarity graph (here it's given), form the graph Laplacian L = D − W (degree minus weights), and take the eigenvectors of its smallest nonzero eigenvalues. Those eigenvectors are a low-dimensional embedding in which connectivity becomes geometric proximity — nodes densely linked land near each other regardless of their original feature-space positions — and ordinary k-means on that embedding recovers the communities (approximating the normalised-cut objective: cut few edges, keep groups balanced). Why it matters: it clusters by RELATIONSHIP, so it handles non-convex, manifold, and purely graph-structured data that defeats k-means/GMM, and it's the natural tool when your data IS a network (social graphs, image segmentation via pixel-similarity graphs, community detection). Costs: eigendecomposition is O(n³) naively (use sparse/Nyström approximations at scale), and you still choose k. It's the bridge from geometric clustering to network science.",
  simple: "Sometimes 'similar' isn't about being close in space — it's about being well-CONNECTED. Two customers who never sit near each other in feature-space might be tightly linked by mutual interactions. Spectral clustering listens to the connections: it uses linear algebra (eigenvectors of the graph's Laplacian) to lay the network out in a new space where 'strongly connected' becomes 'physically near', and THEN runs ordinary k-means there. So a friend group that k-means could never find in raw features pops out as a tidy blob in the connectivity view. It's how you cluster things that are naturally networks — social groups, communities, even image regions (pixels linked by similarity) — by partitioning the graph into pieces that cut few edges. The eigenvectors do the translation from 'connected' to 'close'.",
  widget: {
    type: "curveStatic", title: "Clustering by connection, not location",
    world: "Community-detection quality across data types: spectral clustering vs k-means. The more the truth is about CONNECTIVITY rather than spatial compactness, the wider the gap.",
    xlab: "data character →", xs: [0,1,2,3,4], labels: ["compact blobs","two moons","concentric rings","social graph","image segments"], dec: 0, yunit: "%",
    series: [
      { name: "spectral clustering (ARI ×100)", ys: [90, 94, 93, 91, 88] },
      { name: "k-means (ARI ×100)", ys: [94, 38, 15, 30, 44] }
    ],
    knob: { label: "Data character", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Compact blobs: k-means wins (94 vs 90) — when clusters ARE spatial balls, the eigendecomposition is expensive overkill. Right tool, right terrain, again.", tone: "info" },
      { max: 2, text: "Two moons / rings: spectral 93+, k-means 15-38. The Laplacian embedding turns 'connected along the curve' into 'near', so k-means-in-the-embedding succeeds where k-means-on-raw-data can't draw a straight border.", tone: "info" },
      { max: 4, text: "🤯 Social graph & image segments: spectral 88-91, k-means flailing — because here the data IS a network, and connectivity, not coordinates, defines the groups. Spectral clustering is the bridge from geometry to graphs; when your data is relationships, cluster the relationships.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Spectral clustering", formula: "eigenvectors of Laplacian L=D−W → connectivity embedding → k-means there (≈ normalised cut)",
      text: "sklearn: SpectralClustering(affinity='precomputed' for graphs, 'rbf'/'nearest_neighbors' for points). O(n³) naively — use sparse graphs / Nyström at scale. The clusterer for networks and manifolds." }
  }
}
];
