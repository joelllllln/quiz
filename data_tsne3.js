/* t-SNE — Part III: Advanced Study. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).tsne3 = [

{
  q: "t-SNE deliberately uses a t-distribution (heavy tails) for the LOW-dimensional map but a Gaussian for the HIGH-dimensional similarities. This asymmetry is the whole trick. What problem does the heavy tail solve?",
  choices: ["The 'crowding problem': a high-D neighbourhood has far more room than 2-D, so mapping it faithfully crushes points together — the t-distribution's heavy tail gives moderately-distant points more space, letting clusters spread out instead of collapsing", "It makes the optimisation converge faster", "It removes the need for perplexity", "It guarantees clusters are circular", "Heavy tails just reduce memory usage"],
  explain: "Volume grows explosively with dimension: a point in high-D can have many roughly-equidistant neighbours that simply DON'T FIT around it in 2-D at faithful distances — forced to place them all 'nearby', the map crushes everything into a blob (the crowding problem). t-SNE's asymmetry fixes it: high-D similarities use a Gaussian (sharp, local), but low-D similarities use a Student-t with 1 degree of freedom (Cauchy) — its heavy tail means a modest low-D similarity corresponds to a LARGER low-D distance than a Gaussian would allow. So points that are 'somewhat near' in high-D can be placed comfortably far apart in 2-D without penalty, giving clusters room to separate and gaps room to open. This single design choice is why t-SNE produces well-separated islands where earlier methods (SNE, with Gaussian-Gaussian) produced mush.",
  simple: "Cramming a high-dimensional neighbourhood into 2-D is like drawing a family reunion where everyone was standing an arm's length apart in a huge hall — on a small sheet of paper, 'everyone near everyone' becomes an unreadable pile. That's the crowding problem: 2-D just doesn't have enough room to honour all those high-D 'nearby's, so naive maps collapse into a blob. t-SNE's fix is a clever double standard: it's strict about closeness in high-D but GENEROUS about distance in the 2-D map (via a heavy-tailed distribution), so points that were merely 'sort of near' are allowed to sit comfortably far apart on paper. That generosity is exactly what lets clusters breathe and gaps appear — the reason t-SNE maps have those famous well-separated islands instead of one crushed clump.",
  widget: {
    type: "curveStatic", title: "Room to breathe in 2-D",
    world: "The same high-D data mapped with a Gaussian low-D kernel (old SNE) vs t-SNE's heavy-tailed kernel, as intrinsic dimensionality — hence crowding pressure — increases.",
    xlab: "intrinsic dimensionality of the data →", xs: [0,1,2,3,4], labels: ["3-D","10-D","30-D","100-D","500-D"], dec: 0, yunit: "",
    series: [
      { name: "t-SNE cluster separation (0–100)", ys: [88, 87, 85, 82, 78] },
      { name: "Gaussian-kernel SNE separation", ys: [82, 68, 47, 28, 15] }
    ],
    knob: { label: "Intrinsic dimensionality", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "3-D data → 2-D map: barely any crowding, so both kernels work and separation is similar. The heavy tail earns little when there's little to crowd.", tone: "info" },
      { max: 2, text: "30-D: the Gaussian map is collapsing (47) — too many high-D neighbours don't fit in 2-D, so it crushes them together — while t-SNE's heavy tail keeps clusters at 85, giving distant-ish points the room they need.", tone: "warn" },
      { max: 4, text: "🤯 500-D: Gaussian mush (15) vs t-SNE's readable islands (78). The ENTIRE difference is one distribution choice: heavy tails let 'moderately near' map to 'comfortably far'. This is why t-SNE, not its Gaussian predecessor, became the standard high-D visualiser.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The crowding problem & heavy tails", formula: "high-D: Gaussian (local) · low-D: Student-t (heavy tail) → distant points get room, clusters separate",
      text: "The t-distribution's tail is why t-SNE separates clusters where SNE blurred them. It's also why between-cluster distances aren't literal — the tail deliberately distorts them for readability." }
  }
},

{
  q: "A researcher runs t-SNE on genomic data and publishes the map as 'the structure of the data'. A statistician objects that t-SNE optimises a specific divergence that BAKES IN a bias. Which, and what does it imply?",
  choices: ["It minimises KL(high-D ‖ low-D), which is ASYMMETRIC: it heavily punishes putting true neighbours far apart but barely punishes putting non-neighbours close — so it preserves LOCAL structure and is free to distort GLOBAL structure", "It minimises squared error, which is unbiased", "It maximises variance like PCA", "The divergence is symmetric, so there's no bias", "It optimises classification accuracy on hidden labels"],
  explain: "t-SNE minimises KL(P‖Q) where P are high-D neighbour probabilities and Q are low-D ones. KL's asymmetry is the key: the cost is Σ P·log(P/Q). When P is large (true neighbours) but Q is small (placed far apart), the term blows up — heavily penalised. But when P is small (non-neighbours) and Q is large (wrongly placed close), P·log(P/Q) ≈ 0 — barely penalised. So t-SNE is DESPERATE to keep true neighbours together (local fidelity) but INDIFFERENT to whether distant things are correctly kept apart (global infidelity). Implications you must state when publishing: cluster membership is trustworthy; cluster SIZES, DENSITIES, and BETWEEN-cluster distances/arrangement are artifacts of the optimisation, not the data. 'The structure of the data' overclaims — t-SNE guarantees only the local structure. UMAP's cross-entropy loss trades some local sharpness for better (still-imperfect) global layout.",
  simple: "t-SNE's scoring rule is lopsided ON PURPOSE. It screams in pain if two points that were TRUE neighbours end up far apart on the map — so it fights hard to keep real neighbourhoods intact. But it barely notices if two STRANGERS end up sitting close together — that mistake costs almost nothing in its scoring. The consequence is a map you can only half-trust: 'these points cluster together' is reliable (local structure, fiercely protected), but 'this cluster is big', 'these two clusters are far apart', 'this one's denser' are all things the algorithm never promised to get right — it was free to distort them to satisfy the local constraints. So publishing a t-SNE map as 'the structure of the data' overclaims; it's 'the LOCAL neighbourhoods of the data', with the global layout as decoration.",
  widget: {
    type: "curveStatic", title: "The lopsided penalty",
    world: "The KL cost contributed by one point-pair, for the two kinds of error t-SNE can make. Watch how differently it punishes 'neighbours torn apart' vs 'strangers stuck together'.",
    xlab: "severity of the placement error →", xs: [0,1,2,3,4], labels: ["none","mild","moderate","severe","extreme"], dec: 2, yunit: "",
    series: [
      { name: "true neighbours placed far (P big, Q small)", ys: [0, 0.8, 2.1, 4.5, 8.9] },
      { name: "strangers placed close (P small, Q big)", ys: [0, 0.04, 0.09, 0.15, 0.22] }
    ],
    knob: { label: "Error severity", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Mild errors: tearing neighbours apart already costs 0.8; sticking strangers together costs 0.04 — a 20× asymmetry from the very first step. The loss cares almost only about the first kind.", tone: "info" },
      { max: 3, text: "Severe: 4.5 vs 0.15 — a 30× gap. t-SNE will contort the WHOLE global layout to avoid separating true neighbours, and cheerfully accept false adjacencies as collateral. That's the trade it was designed to make.", tone: "warn" },
      { max: 4, text: "🤯 The asymmetry IS the interpretation guide: cluster membership (local, fiercely protected) = trustworthy; cluster sizes, densities, and inter-cluster distances (global, barely penalised) = artifacts. Publish 'local neighbourhoods', never 'the structure'. UMAP's symmetric-ish loss recovers some global honesty — still not all.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "KL asymmetry in t-SNE", formula: "min KL(P‖Q): huge penalty for split neighbours, ~none for false adjacency → local preserved, global sacrificed",
      text: "Trust membership; distrust sizes, densities, inter-cluster distances. Validate structure in the ORIGINAL space. UMAP's cross-entropy improves — not perfects — global fidelity." }
  }
},

{
  q: "For a real-time dashboard you need to embed NEW data points onto an EXISTING map as they stream in. Standard t-SNE can't do this at all, while UMAP can. What's the fundamental reason?",
  choices: ["t-SNE has no reusable 'model' — it optimises all point positions jointly from scratch, so a new point would require re-running everything; UMAP learns a reusable mapping (fuzzy-topological structure) it can apply via .transform() to unseen points", "t-SNE is just slower, not incapable", "UMAP stores every training point and looks up the nearest", "t-SNE requires labels that streaming data lacks", "New points must be added in batches of 1000"],
  explain: "t-SNE's output is a specific configuration of the training points' 2-D coordinates, produced by jointly optimising a loss over ALL pairwise similarities — there is no function from input-space to map-space, just this one frozen arrangement. Adding a point would perturb everyone's optimal position, forcing a full re-run (and even then the map's arbitrary rotation/arrangement would shift). UMAP is built on a different foundation: it constructs a fuzzy topological representation (a weighted neighbour graph) and learns a mapping into low-D that can be RE-APPLIED — .transform(new_X) projects unseen points onto the existing embedding using the learned structure, in milliseconds, no re-optimisation. This is the same train/transform separation that lets PCA project new data (PCA even more cleanly, being linear). Practical upshot: t-SNE is a one-shot EXPLORATION tool; for production embeddings that must ingest new data — recommendation, monitoring, online viz — UMAP (or PCA, or a parametric/neural embedder) is required. It's the difference between a snapshot and a reusable camera.",
  simple: "t-SNE doesn't build a reusable machine — it hand-arranges THIS specific set of points into a pleasing layout and then stops. There's no 'recipe' to apply to a newcomer; to add one point you'd have to re-arrange everybody from scratch (and even the whole picture would rotate and shift). UMAP instead learns an actual mapping — a reusable recipe for turning any input into a map position — so when a new point streams in, it just runs the recipe (.transform) and drops the point onto the existing map in milliseconds. It's the same reason PCA can project new data: those methods learn a FUNCTION, while t-SNE only produces a one-off drawing. For a live dashboard ingesting new data forever, you need the reusable camera (UMAP/PCA), not the one-time snapshot (t-SNE).",
  widget: {
    type: "curveStatic", title: "Snapshot vs reusable camera",
    world: "Cost to place N new points onto an existing embedding, t-SNE vs UMAP, as new points arrive. One has a reusable transform; the other must re-optimise everything.",
    xlab: "new points to add →", xs: [0,1,2,3,4], labels: ["1","10","100","1k","10k"], dec: 0, yunit: "",
    series: [
      { name: "t-SNE: full re-run time (s)", ys: [45, 46, 52, 90, 400] },
      { name: "UMAP: .transform() time (s)", ys: [0.01, 0.02, 0.05, 0.3, 2.5] }
    ],
    knob: { label: "New points", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Add ONE new point: t-SNE must re-optimise all positions from scratch (45s) — there's no model to apply. UMAP runs its learned mapping in 10ms. The gap is qualitative, not just speed.", tone: "info" },
      { max: 2, text: "100 new points: t-SNE 52s (and the entire map shifts, so it's not even the 'same' embedding anymore); UMAP projects them onto the STABLE existing map in 50ms. Only one supports a live dashboard.", tone: "warn" },
      { max: 4, text: "🤯 The root cause isn't speed — it's that t-SNE learns no function, only a frozen arrangement, while UMAP (like PCA) learns a reusable input→map recipe. Snapshot vs camera. For streaming/production embeddings, that architectural fact — not the runtime — is why UMAP or PCA is mandatory.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Parametric mapping: t-SNE vs UMAP", formula: "t-SNE: joint optimisation, no reusable model · UMAP: learned mapping → .transform(new_X)",
      text: "t-SNE = one-shot exploration. Production/streaming embeddings need UMAP's transform, PCA's projection, or a parametric (neural) embedder. Same train/transform split as any deployable model." }
  }
},

{
  q: "Distilling Topics 15–16: PCA, t-SNE and UMAP all reduce dimensions, but a practitioner reaches for them in different situations. What's the honest three-way decision guide?",
  choices: ["PCA: linear, fast, reversible, for compression/denoising/preprocessing (features for models). t-SNE: non-linear, exploratory VISUALISATION of local structure, non-parametric. UMAP: non-linear, faster, better global layout, reusable transform — visualisation AND general reduction", "They're interchangeable; pick by habit", "Always UMAP — it dominates the other two", "PCA for images, t-SNE for text, UMAP for tables", "t-SNE for everything; the others are legacy"],
  explain: "Three tools, three jobs. PCA: LINEAR (components are interpretable directions), fast, deterministic, INVERTIBLE (reconstruct data), preserves global variance structure — the workhorse for compression, denoising, decorrelation, and making features for downstream models. Its limit: only linear structure. t-SNE: NON-LINEAR, superb at revealing LOCAL cluster structure for human eyes, but non-parametric (no transform), slow, stochastic, and it distorts global geometry (sizes/distances unreliable) — a pure EXPLORATION/VISUALISATION tool, not for making model features. UMAP: also non-linear and cluster-revealing, but faster, scales to millions, preserves more (not all) global structure, and crucially offers a reusable .transform() — so it serves both visualisation AND as a general-purpose reducer for downstream tasks. Decision flow: need interpretable/reversible/linear or model features from linear structure → PCA; need to SEE non-linear cluster structure once → t-SNE; need non-linear reduction that scales, transforms new data, or feeds models → UMAP. And often COMBINE: PCA to ~50-D first, then t-SNE/UMAP (denoise + speed). The meta-skill is matching the tool's guarantees to the task, exactly as with clustering and classification.",
  simple: "Three dimension-reducers, three genuinely different jobs — don't pick by habit. PCA is the reliable workhorse: linear, fast, reversible, and its components mean something — reach for it to compress, denoise, or make tidy features for a model, as long as the structure you care about is roughly linear. t-SNE is the microscope: it makes gorgeous pictures of LOCAL cluster structure for your eyes, but it's slow, can't process new points, and lies about global layout — use it to LOOK, once, never to build features. UMAP is the modern all-rounder: also draws clusters, but faster, scales huge, keeps more of the big-picture layout, and — unlike t-SNE — can project new data, so it doubles as both a visualiser and a real reducer for models. And a pro move: run PCA down to ~50 dimensions FIRST, then t-SNE/UMAP — denoise cheaply, then reduce. Match the tool's promises to what you actually need.",
  widget: {
    type: "curveStatic", title: "Three reducers, three jobs",
    world: "PCA, t-SNE and UMAP scored (0–100 suitability) across five real needs. No tool wins every column — the pattern IS the decision guide.",
    xlab: "your need →", xs: [0,1,2,3,4], labels: ["compress / features","see local clusters","embed new data (transform)","preserve global layout","scale to millions"], dec: 0, yunit: "",
    series: [
      { name: "PCA", ys: [90, 45, 95, 85, 95] },
      { name: "UMAP", ys: [70, 90, 88, 68, 85] },
      { name: "t-SNE", ys: [30, 93, 10, 25, 40] }
    ],
    knob: { label: "Need", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Compression / model features: PCA 90 — linear, fast, reversible, interpretable directions. t-SNE scores 30 (no transform, distorted geometry — never make model features from it).", tone: "info" },
      { max: 2, text: "Seeing local clusters: t-SNE and UMAP both ~90, PCA 45 (linear can't unfold non-linear structure). But 'embed NEW data' flips it: PCA 95, UMAP 88, t-SNE 10 — only the parametric methods have a transform.", tone: "info" },
      { max: 4, text: "🤯 Five needs, and the top tool changes across them — PCA owns compression/scale/transform, t-SNE owns pure local visualisation, UMAP is the versatile middle. 'Best reducer' is undefined; 'best for THIS need' always has an answer. And PCA→50D→(t-SNE/UMAP) combines their strengths. The meta-skill of the whole manual: match guarantees to the task.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Choosing a dimensionality reducer", formula: "PCA: linear, reversible, features/compression · t-SNE: local viz only · UMAP: scalable non-linear + transform",
      text: "Linear/reversible/features → PCA. See clusters once → t-SNE. Scalable non-linear reduction that transforms new data → UMAP. Often: PCA→50D, then t-SNE/UMAP." }
  }
}
];
