/* Dimensionality Reduction — Part I: Foundations. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).dimred1 = [

{
  q: "Your dataset has 300 columns. Before any modelling, why would you deliberately throw dimensions away?",
  choices: ["Distances degrade, models overfit and nothing can be visualised in 300-D", "Fewer columns always means more information", "Databases cap tables at 100 columns", "Gradient descent requires under 50 features", "It's purely to save disk space"],
  explain: "High dimensions poison distance-based reasoning (everything becomes equally far), multiply overfitting room, slow everything, and defeat the human eye. Reduction trades a little information for geometry that works again.",
  simple: "Three hundred columns is a description so long that everything sounds unique and nothing looks similar. Boil it down to the few directions that actually vary and suddenly: distances mean something, plots become possible, and models stop drowning. You met this villain before — the curse of dimensionality. Reduction is the counter-spell.",
  widget: {
    type: "dimCurse", title: "The villain, revisited",
    world: "Ten products compared to yours. The knob adds descriptive columns. Watch 'nearest' dissolve as the count climbs — then imagine running this film BACKWARDS. That reverse direction is this whole topic.",
    itemName: "product", n: 10, seed: 63,
    knob: { label: "Columns compared", min: 2, max: 60, step: 1, init: 2 },
    insights: [
      { max: 8, text: "Few well-chosen columns: crisp neighbours, meaningful distances. This is the state reduction tries to RETURN you to.", tone: "info" },
      { max: 30, text: "The contrast is draining away — same disease you met in the KNN volume, now framed as the problem this topic cures.", tone: "warn" },
      { max: 60, text: "🤯 At 60 columns similarity is mush. PCA and friends run this slider in reverse: squeeze 300 columns into the handful of directions that carry the story.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Why reduce dimensions", formula: "fewer, information-dense axes → healthy distances, less overfitting, visualisable data",
      text: "Dimensionality reduction is the curse's antidote: keep the variation, drop the bulk. The next exercises build the two classic tools — PCA and t-SNE." }
  }
},

{
  q: "PCA must choose its FIRST axis — the single best line to flatten the data onto. Which line does it pick?",
  choices: ["The one preserving the most spread (variance) after flattening", "The horizontal axis, always", "The line through the two farthest points", "The line hitting the most points", "A random line, refined later"],
  explain: "Projecting onto a line squashes everything else away, so PCA keeps the line along which the data varies MOST — the direction that loses least. That's the first principal component, found exactly (no search needed) via eigenvectors.",
  simple: "Photograph a shoal of fish so the photo tells you most: shoot along the shoal's longest axis and the fish spread across your frame; shoot end-on and they pile into a dot. PCA computes the perfect camera angle — the one where the flattened shadow stays as spread out as possible.",
  widget: {
    type: "pcaSpin", title: "Hunt the camera angle",
    world: "A stretched data cloud and one rotatable axis. The purple dots are each point's shadow on your axis. Rotate and chase the percentage — find the angle that keeps the most spread.",
    xlab: "feature 1", ylab: "feature 2",
    points: [{x:1,y:2.4},{x:2,y:3.1},{x:3,y:3.4},{x:3.5,y:4.4},{x:4.5,y:4.2},{x:5,y:5.6},{x:5.5,y:5.1},{x:6.5,y:6.3},{x:7,y:5.9},{x:8,y:7.4},{x:8.5,y:6.9},{x:9,y:7.8}],
    knob: { label: "Axis angle", min: 0, max: 180, step: 2, init: 90 },
    insights: [
      { max: 20, text: "Near-horizontal: decent but not best — the cloud leans uphill, and your axis isn't leaning with it.", tone: "info" },
      { max: 50, text: "🤯 Around 34°: the shadows spread widest — ~95% of the spread survives the flattening. You just found the first principal component by hand. PCA finds it by algebra, exactly, in any dimension.", tone: "wow" },
      { max: 180, text: "Near 125° the shadows collapse into a clump — barely 5% survives. That worst direction isn't junk though: it's exactly what the SECOND component will claim.", tone: "info" }
    ],
    extreme: { at: 34 },
    reveal: { name: "The first principal component", formula: "PC1 = the direction u maximising Var(X·u) — the top eigenvector of the covariance",
      text: "PCA's whole game: flatten with minimum regret. You searched by slider; eigen-decomposition hands the answer in closed form, for 300 dimensions as easily as 2." }
  }
},

{
  q: "PC1 is fixed. Where does PCA put its SECOND component?",
  choices: ["Perpendicular to PC1, capturing the most of the remaining spread", "Parallel to PC1, for redundancy", "Wherever variance is smallest", "Through the two nearest points", "At exactly 45° to PC1"],
  explain: "Components are orthogonal by construction: PC2 lives in the directions PC1 can't express, and grabs the most variance available there. Each successive component repeats the trick in what's left — ranked, non-overlapping axes.",
  simple: "The first camera angle captured the shoal's length. The second photo must add NEW information — so it shoots at a right angle, capturing the shoal's width. No overlap, no wasted film: each component owns a direction the others can't see.",
  widget: {
    type: "pcaSpin", title: "The leftovers direction",
    world: "Same stretched cloud. PC1 was at ~34°. Rotate the axis and find where the percentage BOTTOMS OUT — the direction holding only what PC1 left behind.",
    xlab: "feature 1", ylab: "feature 2",
    points: [{x:1,y:2.4},{x:2,y:3.1},{x:3,y:3.4},{x:3.5,y:4.4},{x:4.5,y:4.2},{x:5,y:5.6},{x:5.5,y:5.1},{x:6.5,y:6.3},{x:7,y:5.9},{x:8,y:7.4},{x:8.5,y:6.9},{x:9,y:7.8}],
    knob: { label: "Axis angle", min: 0, max: 180, step: 2, init: 20 },
    insights: [
      { max: 60, text: "Angles near PC1 (~34°) score high — but that spread is already PC1's property. A second axis here would be redundant film.", tone: "info" },
      { max: 140, text: "🤯 Around 124° — exactly 90° from PC1 — the percentage bottoms out at ~5%. In 2-D, that leftover direction IS PC2: perpendicular, owning everything PC1 couldn't say.", tone: "wow" },
      { max: 180, text: "Notice the two percentages: ~95% + ~5% = 100%. Orthogonal components split the total variance into non-overlapping shares — that accounting is next.", tone: "info" }
    ],
    extreme: { at: 124 },
    reveal: { name: "Orthogonal components", formula: "PC2 ⊥ PC1, maximising the residual variance — and so on down the ranks",
      text: "PCA delivers a full replacement coordinate system: perpendicular axes, sorted by how much of the data's story each one carries." }
  }
},

{
  q: "You run PCA on 50 features and get 50 components with their 'explained variance ratios'. How do you decide how many to KEEP?",
  choices: ["Keep the top components until the cumulative ratio is high enough (say 90%)", "Always keep exactly two", "Keep the bottom half", "Keep components with negative variance", "Keep all 50 — that's the point"],
  explain: "The ratios say what share of total variance each component carries, sorted descending. Cumulate them: if 8 components cover 92%, the other 42 axes hold 8% — mostly noise and redundancy. The scree/cumulative plot makes the cut visible.",
  simple: "It's a talent show ranking: the first few components carry most of the show, the long tail contributes shrugs. Add up shares from the top until you've kept 'enough of the story' — often 90–95% — and send the rest home. Fifty columns in, eight axes out, story intact.",
  widget: {
    type: "curveStatic", title: "How much story per axis",
    world: "Cumulative variance captured as components are added, for a 50-feature dataset. Slide and find where 'more axes' stops meaning 'more story'.",
    xlab: "components kept", xs: [0,1,2,3,4,5], labels: ["1","2","4","8","16","50"], dec: 0, yunit: "%",
    series: [
      { name: "cumulative variance kept", ys: [46,64,81,92,97,100] }
    ],
    knob: { label: "Components kept", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Two components: 64% of everything 50 columns had to say. The data was never really 50-dimensional — it just wore 50 columns.", tone: "info" },
      { max: 3, text: "🤯 Eight components: 92%. The remaining FORTY-TWO axes share 8% between them — noise, duplication, trivia. Keep 8, discard 42, lose almost nothing.", tone: "wow" },
      { max: 5, text: "The march from 92% to 100% costs 42 more dimensions. Whether that 8% matters is a judgement call — but now it's an INFORMED one, which is the plot's whole job.", tone: "info" }
    ],
    extreme: { at: 3 },
    reveal: { name: "Explained variance & the scree plot", formula: "keep the smallest m with cumulative ratio ≥ target (e.g. 0.90) — sklearn: PCA(n_components=0.9)",
      text: "PCA turns 'how many dimensions do I need?' into a readable curve. Most real datasets collapse dramatically — their columns are correlated echoes of a few true factors." }
  }
},

{
  q: "You run PCA on raw features: income (tens of thousands) and satisfaction (1–10). PC1 comes out pointing almost exactly along income. Why?",
  choices: ["Variance is measured in raw units, so the big-unit feature owns the 'largest spread' by default", "Income is genuinely 1,000× more informative", "PCA always picks the first column", "Satisfaction is categorical", "The data must be mislabeled"],
  explain: "PCA maximises variance, and variance inherits units: income's spread is millions (of squared pounds), satisfaction's is single digits. Unstandardised PCA just rediscover which column has the biggest numbers. Scale first — always.",
  simple: "Same shouting-contest bug you met with KNN and SVM: the feature with the biggest raw numbers wins any contest measured in raw numbers. 'Direction of most variance' becomes 'direction of the loudest unit'. Standardise, and PCA measures structure instead of units.",
  widget: {
    type: "scaleFeature", title: "The loudest unit wins again",
    world: "PCA hunts the biggest spread — so whichever feature dominates raw differences will own PC1. Shrink income's units and watch the 'most similar' structure change, exactly as PC1's direction would.",
    aName: "satisfaction", bName: "income",
    target: { name: "customer X", a: 7, b: 45000 },
    cands: [
      { name: "A · sat 7.2, £46k", a: 7.2, b: 46000 },
      { name: "B · sat 2.1, £45.5k", a: 2.1, b: 45500 },
      { name: "C · sat 6.8, £52k", a: 6.8, b: 52000 },
      { name: "D · sat 7.1, £60k", a: 7.1, b: 60000 }
    ],
    knob: { label: "Shrink income units by", min: 0, max: 4, step: 0.25, init: 0 },
    insights: [
      { max: 0.5, text: "Raw units: customer B — utterly different satisfaction — looks 'nearest' because income drowns everything. Raw-unit PCA sees the same world: PC1 = income, full stop.", tone: "warn" },
      { max: 2.5, text: "As the units even out, satisfaction re-enters the geometry — the direction of 'most variation' becomes a genuine blend of both signals.", tone: "info" },
      { max: 4, text: "🤯 The 'principal direction' depended entirely on unit bookkeeping. StandardScaler before PCA isn't a style preference — without it PCA is a unit detector, not a structure detector.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Standardise before PCA", formula: "z-score every feature first (or use correlation-matrix PCA)",
      text: "The third algorithm in this course felled by the same axe: any method built on raw distances or variances needs features on a common scale. It will never stop being true." }
  }
},

{
  q: "The data lies along a curved arc — like a bent wire. PCA keeps disappointing: no single axis captures it well. What's the structural reason?",
  choices: ["PCA only offers STRAIGHT axes, and no straight line hugs a curve", "The wire has too few points", "Variance can't be computed on curves", "The arc must first be labelled", "PCA requires at least 3 dimensions"],
  explain: "PCA is linear: it can rotate and flatten, never bend. A curved manifold spreads its variance across multiple straight directions, so every single axis captures only a slice. Nonlinear methods (t-SNE, UMAP, kernel PCA) exist precisely for this.",
  simple: "Try summarising a banana with one straight skewer: whichever way you push it through, much of the banana bulges away from it. Straight tools summarise straight-ish things. For bent shapes you need a tool allowed to bend — that's your bridge to t-SNE.",
  widget: {
    type: "pcaSpin", title: "One skewer, one banana",
    world: "Points along a curved arc. Rotate the axis and try to find an angle that keeps most of the spread. Notice the ceiling you keep hitting — and why it exists.",
    xlab: "feature 1", ylab: "feature 2",
    points: [{x:1.4,y:3},{x:2,y:4.6},{x:2.9,y:6},{x:4,y:7},{x:5.2,y:7.4},{x:6.4,y:7.2},{x:7.5,y:6.4},{x:8.4,y:5.2},{x:9,y:3.8},{x:9.3,y:2.2}],
    knob: { label: "Axis angle", min: 0, max: 180, step: 2, init: 90 },
    insights: [
      { max: 60, text: "Whatever the angle, a chunk of spread always escapes — the arc bends AWAY from any straight line you choose.", tone: "info" },
      { max: 120, text: "The best you'll find hovers around 60-70% — compare the ~95% the straight cloud gave you two exercises ago. The gap is the curvature itself.", tone: "warn" },
      { max: 180, text: "🤯 No angle wins because no straight axis CAN. The data is 1-dimensional — but along a bent path. Linear tools see 2-D; a bendy tool would see the wire. Enter t-SNE.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "PCA's linearity limit", formula: "PCA = rotation + truncation — curved manifolds need nonlinear maps",
      text: "PCA answers 'which straight directions matter?'. When the truth is curved — spirals, arcs, rolled-up sheets — the honest answer is 'none alone', and you reach for nonlinear reducers." }
  }
},

{
  q: "You compress 100 sensor channels to 12 principal components and reconstruct. The reconstruction is imperfect — yet often CLEANER than the original. How?",
  choices: ["The discarded low-variance components held mostly noise, so dropping them denoises", "Reconstruction adds new information", "PCA sharpens edges deliberately", "The sensors improve during PCA", "It isn't — compression always degrades"],
  explain: "Real signals concentrate in a few strong directions; sensor noise sprinkles evenly across ALL directions. Keeping the top components keeps most signal and only a sliver of noise — reconstruction filters the static by omission.",
  simple: "Imagine summarising a noisy choir recording by its 12 strongest harmonics and replaying: the hiss — spread thinly across thousands of frequencies — mostly vanishes, while the melody survives. Throwing away the quiet parts threw away mostly static. Lossy compression, acting as a noise filter.",
  widget: {
    type: "curveStatic", title: "Compression that cleans",
    world: "Reconstructing 100 noisy channels from k components: how much true SIGNAL survives, and how much NOISE sneaks through with it. Find the sweet spot.",
    xlab: "components kept", xs: [0,1,2,3,4,5], labels: ["2","6","12","25","50","100"], dec: 0, yunit: "%",
    series: [
      { name: "true signal retained", ys: [58,84,94,97,99,100] },
      { name: "noise retained", ys: [4,9,14,32,61,100] }
    ],
    knob: { label: "Components kept", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Six components: 84% of the signal, 9% of the noise. The signal lives in few directions; the static lives everywhere thinly.", tone: "info" },
      { max: 2, text: "🤯 Twelve components: 94% signal, 14% noise — the reconstruction is objectively CLEANER than the raw recording. Deleting dimensions added quality.", tone: "wow" },
      { max: 5, text: "Keep everything and you faithfully reconstruct… all the noise too. Perfect fidelity to a flawed original is not the goal — one more echo of the overfitting lesson.", tone: "warn" }
    ],
    extreme: { at: 2 },
    reveal: { name: "PCA compression & denoising", formula: "reconstruct from top-k components → keeps concentrated signal, drops diffuse noise",
      text: "The same maths powers eigenfaces, sensor cleanup and embedding compression. Losing the right information is a feature." }
  }
},

{
  q: "t-SNE makes those famous 2-D maps of high-dimensional data. What does it work hardest to preserve?",
  choices: ["Neighbourhoods — who is close to whom, not global distances", "Exact pairwise distances", "The variance of every axis", "The original coordinates", "Cluster sizes and spacings"],
  explain: "t-SNE converts distances into neighbour probabilities and matches those between high-D and 2-D. Local friendship circles survive; long-range geometry is sacrificed. It's a map of WHO'S NEAR WHOM, not of how far anything is.",
  simple: "Drawing the Earth on flat paper forces a choice of what to distort. t-SNE chooses: keep every town next to its true neighbours, even if continents drift to odd places. Perfect for spotting communities; useless for measuring the ocean between them.",
  widget: {
    type: "curveStatic", title: "What survives the flattening",
    world: "Two reducers squash the same 50-D data to 2-D, scored on two different promises: keeping neighbourhoods vs keeping global distances. Neither keeps both — compare their choices.",
    xlab: "method", xs: [0,1], labels: ["PCA","t-SNE"], dec: 0, yunit: "%",
    series: [
      { name: "local neighbourhoods preserved", ys: [54,91] },
      { name: "global distances preserved", ys: [83,31] }
    ],
    knob: { label: "Method", min: 0, max: 1, step: 1, init: 0 },
    insights: [
      { max: 0, text: "PCA: global structure holds (83%) because it's a rigid rotation — but fine local friendships blur (54%).", tone: "info" },
      { max: 1, text: "🤯 t-SNE: 91% of friendship circles intact, 31% of global distances — it happily tears the map's large-scale geometry to keep every huddle together. Opposite sacrifices, by design.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "t-SNE (t-distributed Stochastic Neighbour Embedding)", formula: "match neighbour probabilities between high-D and 2-D — local fidelity über alles",
      text: "Use PCA to understand directions and compress; use t-SNE (or UMAP) to SEE cluster structure. Different promises — read each map accordingly." }
  }
},

{
  q: "t-SNE's main knob is 'perplexity' — roughly, how many neighbours each point considers its circle. What does setting it far too LOW do?",
  choices: ["Shatters real groups into many spurious mini-clusters", "Merges everything into one blob", "Makes the plot perfectly accurate", "Deletes outliers", "Has no visible effect"],
  explain: "Perplexity ~2–5 means each point only bonds with a couple of neighbours, so one true cluster fragments into archipelagos of tiny cliques — structure that looks meaningful and is pure artefact. Too high, and genuinely distinct groups smear together.",
  simple: "Perplexity is 'how big is a friendship circle?'. Set it to 2 and a real community of 60 people renders as thirty separate couples — the map invents clusters that don't exist. Set it to 500 and distinct communities blur into one crowd. The map changes with the knob; the DATA never did.",
  widget: {
    type: "curveStatic", title: "The knob that invents clusters",
    world: "Data with exactly 5 true groups, mapped by t-SNE at different perplexities. The curve counts the clusters the MAP appears to show. The truth never changes; the picture does.",
    xlab: "perplexity", xs: [0,1,2,3,4], labels: ["2","5","30","100","500"], dec: 0, yunit: " apparent clusters",
    series: [
      { name: "clusters visible in the map", ys: [23,11,5,5,2] },
      { name: "true group count", ys: [5,5,5,5,5] }
    ],
    knob: { label: "Perplexity", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "🤯 Perplexity 2: the map shows 23 'clusters' of data that contains five. Every one of those extra 18 is an artefact you could easily have presented as a discovery.", tone: "wow" },
      { max: 3, text: "Perplexity 30–100: the map stabilises at the true 5. Stability across a RANGE of perplexities is the credibility test — one pretty map proves nothing.", tone: "info" },
      { max: 4, text: "Perplexity 500: friendship circles so huge that distinct groups merge — 2 blobs from 5 truths. Always run several perplexities before believing any of them.", tone: "warn" }
    ],
    extreme: { at: "min" },
    reveal: { name: "Perplexity", formula: "≈ effective neighbourhood size · try 5–50 · trust structure stable across settings",
      text: "t-SNE maps are hypotheses, not photographs. The perplexity sweep is the replication study." }
  }
},

{
  q: "On a finished t-SNE map, cluster A looks twice as big as cluster B, and C sits far away from both. What may you safely conclude?",
  choices: ["Only that the clusters are distinct — sizes and between-cluster distances are artefacts", "A has twice B's variance", "C is the most different group", "The axes are the top two components", "Everything the map shows, exactly"],
  explain: "t-SNE equalises densities (spreading tight clusters, shrinking loose ones) and its long-range distances are nearly meaningless — different seeds shuffle the layout. The grouping is real; the geometry between and within groups is decoration.",
  simple: "Read a t-SNE map like a seating chart, not a floor plan: it tells you who sits together, nothing about how large the tables are or how far apart. Re-run with a new seed and the tables rearrange — but the guests at each table stay together. Trust the guest lists only.",
  widget: {
    type: "curveStatic", title: "Five seeds, five 'floor plans'",
    world: "The same data, t-SNE run with five random seeds. Two things are measured off each map: the apparent A–C distance, and the guest lists' consistency. Slide across the runs.",
    xlab: "random seed", xs: [0,1,2,3,4], labels: ["run 1","run 2","run 3","run 4","run 5"], dec: 0, yunit: "",
    series: [
      { name: "apparent A–C distance (map units)", ys: [38,12,55,21,44] },
      { name: "cluster memberships identical (%)", ys: [98,98,97,98,98] }
    ],
    knob: { label: "Run", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 2, text: "The A–C 'distance' swings from 12 to 55 across seeds — a number with no stable meaning. Anyone measuring it was measuring the random seed.", tone: "warn" },
      { max: 4, text: "🤯 Meanwhile the memberships — who clusters with whom — are ~98% identical every run. The reliable layer and the decorative layer, cleanly separated.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Reading t-SNE honestly", formula: "trust: groupings · distrust: sizes, inter-cluster distances, axes, exact positions",
      text: "The most-misread plot in data science. Now you hold the reading rules — which puts you ahead of a worrying share of published figures." }
  }
},

{
  q: "Why is t-SNE almost never used to make FEATURES for a downstream model, while PCA constantly is?",
  choices: ["t-SNE has no transform for new data and is slow — PCA is a fast reusable projection", "t-SNE features are too accurate", "PCA is nonlinear and richer", "t-SNE only outputs images", "Downstream models refuse 2-D inputs"],
  explain: "PCA learns a fixed linear map: store it, apply it to tomorrow's data in microseconds. Standard t-SNE optimises a layout for THIS dataset only — new points have no defined coordinates, and the optimisation is costly and seed-dependent.",
  simple: "PCA hands you a reusable recipe: 'combine the columns like so' — apply it forever. t-SNE hands you one finished painting of today's data: gorgeous, but there's no recipe, so tomorrow's customer has no place on it. Recipes go in pipelines; paintings go on walls.",
  widget: {
    type: "curveStatic", title: "Recipe vs painting",
    world: "The practical scorecard: time to reduce a new batch of 10k rows, and whether new points can be embedded at all. Slide across the tools.",
    xlab: "tool", xs: [0,1,2], labels: ["PCA","UMAP","t-SNE"], dec: 1, yunit: "",
    series: [
      { name: "new-batch transform time (s)", ys: [0.1,4,1200] },
      { name: "can embed new points (1 = yes)", ys: [1,1,0] }
    ],
    knob: { label: "Tool", min: 0, max: 2, step: 1, init: 0 },
    insights: [
      { max: 0, text: "PCA: 0.1s, fully reusable — a matrix multiply. That's why 'PCA then classifier' is a standard pipeline and appears in sklearn as exactly that.", tone: "info" },
      { max: 1, text: "UMAP: the middle ground — nonlinear like t-SNE, but with a .transform() for new data. Increasingly the pragmatic pick for visual maps.", tone: "info" },
      { max: 2, text: "🤯 t-SNE: 20 minutes to redo the whole layout, and 'embed this new point' isn't even defined. Wrong tool for pipelines — the right tool for a one-off look at your data's soul.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "PCA for pipelines, t-SNE for eyes", formula: "PCA: fit once, transform forever · t-SNE: per-dataset visual, no transform",
      text: "Match the tool to the job: features and compression → PCA; exploratory pictures → t-SNE/UMAP. Using either for the other's job is a category error." }
  }
},

{
  q: "Two roads to fewer dimensions: feature SELECTION (keep 10 original columns) versus feature EXTRACTION like PCA (build 10 new blended axes). What's the real trade?",
  choices: ["Selection keeps meaning; extraction keeps more variance per dimension", "Extraction is always better", "Selection is always better", "They produce identical results", "Selection only works on images"],
  explain: "Selected columns stay interpretable ('income', 'age') and cheap to collect, but correlated information gets crudely dropped. PCA components pack maximal variance per axis by blending everything — at the price of axes named 'PC3' that no stakeholder recognises.",
  simple: "Downsizing a library: selection keeps the 10 best original books — readable, familiar, but some plots are lost. Extraction rebinds the whole collection into 10 dense anthologies — more story per shelf, but no book has a recognisable title anymore. Explaining to humans? Select. Feeding a model? Extract often wins.",
  widget: {
    type: "curveStatic", title: "Ten books or ten anthologies",
    world: "From 50 features down to k dimensions, both ways. Compare how much information each road keeps at every budget — and remember what each axis is called afterwards.",
    xlab: "dimensions kept", xs: [0,1,2,3], labels: ["5","10","20","50"], dec: 0, yunit: "% variance kept",
    series: [
      { name: "PCA extraction", ys: [78,92,98,100] },
      { name: "best-column selection", ys: [55,74,90,100] }
    ],
    knob: { label: "Dimensions kept", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "At 5 dimensions: PCA keeps 78% vs selection's 55% — blends carry more per axis, because one component can summarise several correlated columns at once.", tone: "info" },
      { max: 1, text: "🤯 At 10, PCA's axes hold 92%… but they're called PC1–PC10. The selected columns hold 74% and are called 'income' and 'tenure'. The gap you close is the meaning you spend.", tone: "wow" },
      { max: 3, text: "The roads converge at 50 (keep everything). In practice: regulated or human-facing → select; pure predictive power in a pipeline → extract. Many teams do both and compare.", tone: "info" }
    ],
    extreme: { at: "min" },
    reveal: { name: "Selection vs extraction", formula: "selection: subset of columns (interpretable) · extraction: new axes (dense)",
      text: "Both are dimensionality reduction; they optimise different currencies — meaning versus variance. Choose by who has to understand the result." }
  }
},

{
  q: "You add PCA before a classifier. Where must the PCA be FITTED, and why does this question feel familiar?",
  choices: ["On training data only, inside the pipeline — PCA is preprocessing, and the leakage rule never sleeps", "On all data, for the best components", "On the test set, for realism", "PCA needs no fitting", "Only on the labels"],
  explain: "PCA learns directions FROM data (means, covariances, eigenvectors) — fit it on everything and test-set information leaks into your features. Same law as scalers, selectors and imputers: anything with a .fit() goes inside the pipeline, trained on the training fold.",
  simple: "PCA studies the data to choose its angles — that's learning, and learning from the test set is peeking, whatever the tool. You've now seen this rule catch scalers, feature selectors, imputers, calibrators, stacking… and today PCA. It's the closest thing applied ML has to a law of physics.",
  widget: {
    type: "foldPick", title: "The leakage rule's final cameo",
    world: "The same PCA-then-classifier system, evaluated with the PCA fitted at different scopes. One last time: flick through the promises and find the one that will survive deployment.",
    blurb: "Same pipeline — different PCA fitting scope:",
    folds: [
      { name: "PCA fit on train+test", acc: 90 },
      { name: "PCA fit on all, CV after", acc: 91 },
      { name: "PCA inside the pipeline", acc: 85 },
      { name: "deployment, month one", acc: 85 }
    ],
    knob: { label: "Fitting scope", min: 1, max: 5, step: 1, init: 1 },
    insights: [
      { max: 2, text: "Fitting PCA with test rows in the pot inflates the score by ~5 points — the components were angled using data the model would later be 'tested' on.", tone: "warn" },
      { max: 4, text: "🤯 Pipeline-fitted PCA: 85 promised, 85 delivered. The honest number, produced by structure rather than vigilance — make_pipeline(StandardScaler(), PCA(0.9), clf).", tone: "wow" },
      { max: 5, text: "The rule, once and forever: if it has .fit(), it fits inside the fold. You are now qualified to be annoying about this in code reviews.", tone: "info" }
    ],
    extreme: { at: 4 },
    reveal: { name: "PCA in pipelines", formula: "make_pipeline(StandardScaler(), PCA(n_components=0.9), model) — fit on train only",
      text: "The course's most repeated lesson closes its final topic. Preprocessing is part of the model; evaluate them as one sealed unit — always." }
  }
}
];
