/* t-SNE — Parts I & II. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).tsne1 = [
  {
    "q": "t-SNE is called a 'nonlinear' method, while PCA is 'linear'. In plain terms, what does being nonlinear let t-SNE do?",
    "choices": [
      "Unfold curved, tangled shapes that a straight-line method flattens",
      "Run much faster on very large datasets than almost any other method",
      "Reproduce the very same picture from every random starting seed",
      "Return true distances you can measure straight off the final map",
      "Learn a fixed formula that projects any brand-new point instantly"
    ],
    "explain": "PCA can only apply a linear projection — rotations and rescalings of straight axes — so it flattens data that lies on a curved manifold and lets separate groups overlap. t-SNE instead models pairwise neighbour probabilities, so it can bend and unroll curved structure while keeping nearby points nearby. That is why t-SNE often separates classes that PCA leaves smeared together.",
    "simple": "PCA is like photographing a rolled-up poster from one angle — the curves get squashed and things overlap. t-SNE is like carefully unrolling the poster flat before you look. Because it is allowed to bend, it untangles shapes that a straight camera never could.",
    "widget": {
      "type": "curveStatic",
      "title": "Linear vs nonlinear separation",
      "world": "The same curved, Swiss-roll-like data seen by PCA versus t-SNE as the structure gets more and more tangled.",
      "xlab": "how tangled the data is →",
      "xs": [ 0, 1, 2, 3, 4 ],
      "labels": [ "flat", "slight", "curved", "rolled", "knotted" ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "PCA (linear)", "ys": [ 90, 70, 45, 25, 10 ] },
        { "name": "t-SNE (nonlinear)", "ys": [ 92, 90, 88, 85, 82 ] }
      ],
      "knob": { "label": "Tangle level", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Nearly flat data: both PCA and t-SNE separate the classes just fine.", "tone": "info" },
        { "max": 3, "text": "As the data curls, PCA's straight axes smear the classes together while t-SNE keeps them apart.", "tone": "info" },
        { "max": 4, "text": "🤯 Knotted data: PCA collapses to 10% while t-SNE holds ~82% — bending beats straightening.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Nonlinear dimensionality reduction", "formula": "PCA = straight projection · t-SNE = bends to unfold curved manifolds", "text": "Because t-SNE is nonlinear it untangles curved structure that PCA's straight-line projection flattens." }
    }
  },
  {
    "q": "How does t-SNE's running time behave as you feed it more and more data points?",
    "choices": [
      "It grows steeply, so huge datasets get slow or need subsampling",
      "It stays flat, since the layout cost never depends on point count",
      "It falls off, because bigger samples let it settle in fewer steps",
      "It grows only with the number of input dimensions, not the points",
      "It is fixed once you choose the perplexity, whatever the sample size"
    ],
    "explain": "t-SNE compares each point against many neighbours on every optimisation iteration, so its cost climbs sharply — roughly quadratically in the naive form — with the number of points. On datasets of hundreds of thousands of points it becomes slow, which is why people subsample or first reduce dimensions with PCA. Faster variants like Barnes-Hut t-SNE and UMAP exist partly to ease this.",
    "simple": "Imagine everyone at a party trying to shake hands with everyone else — double the guests and the handshakes explode. t-SNE works a bit like that as points pile up, so it crawls on very large datasets. That is why people often shrink the data with PCA first or just run it on a sample.",
    "widget": {
      "type": "curveStatic",
      "title": "Points vs running time",
      "world": "The same algorithm timed as the dataset grows from a thousand points up to a million.",
      "xlab": "number of points →",
      "xs": [ 0, 1, 2, 3, 4 ],
      "labels": [ "1k", "10k", "100k", "500k", "1M" ],
      "dec": 0,
      "yunit": "s",
      "series": [
        { "name": "run time (s)", "ys": [ 1, 10, 120, 700, 3600 ] }
      ],
      "knob": { "label": "Number of points", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "A few thousand points: t-SNE finishes in about a second — no problem.", "tone": "info" },
        { "max": 3, "text": "At 100k–500k points the wait climbs from a couple of minutes into many minutes as comparisons pile up.", "tone": "info" },
        { "max": 4, "text": "🤯 One million points can take roughly an hour — subsample or PCA-reduce first.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Computational cost", "formula": "run time grows ~quadratically with the number of points", "text": "t-SNE gets slow on very large datasets, so subsample or reduce dimensions with PCA before running it." }
    }
  },
  {
    "q": "In t-SNE, what does the 'learning rate' control?",
    "choices": [
      "The step size taken while optimising point positions",
      "How many neighbours each point keeps close as it trains",
      "The number of passes made over the dataset before stopping",
      "How strongly distant clusters are pulled toward the centre",
      "The fraction of points sampled to speed up each update"
    ],
    "explain": "The learning rate sets how big a step each point moves on every optimisation iteration. Too small and points barely budge, leaving everything stuck in one ball; too large and clusters overshoot and shatter. Modern implementations use 'auto' to pick a sensible value from the dataset size.",
    "simple": "Imagine nudging pieces into place on a board. Tiny nudges and nothing ever spreads out — one clump forever; huge nudges and pieces fly apart into chaos. The learning rate is the size of each nudge, and 'auto' usually picks a good one so you do not have to.",
    "widget": {
      "type": "curveStatic",
      "title": "Step size vs layout quality",
      "world": "The same data run at rising learning rates: watch the map go from one stuck ball, through a clean spread, to shattered debris.",
      "xlab": "learning rate →",
      "xs": [ 0, 1, 2, 3, 4 ],
      "labels": [ "1", "10", "auto", "1000", "50000" ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "layout quality (%)", "ys": [ 15, 55, 95, 80, 20 ] }
      ],
      "knob": { "label": "Learning rate", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Learning rate 1–10: steps too small, points barely move — everything stays balled up.", "tone": "info" },
        { "max": 3, "text": "'auto' and moderate values: points spread into clean, separated clusters — the sweet spot at 95%.", "tone": "info" },
        { "max": 4, "text": "🤯 Learning rate 50000: steps so big clusters overshoot and shatter into meaningless debris. Right in the middle wins.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Learning rate", "formula": "step size of the layout optimisation · too small = one ball, too big = shattered", "text": "Leave it at 'auto', which scales the step to your dataset size and behaves." }
    }
  },
  {
    "q": "What does setting init='pca' do when you run t-SNE?",
    "choices": [
      "Starts the layout from PCA coordinates, not randomness",
      "Runs PCA afterwards to clean up the finished t-SNE layout",
      "Replaces t-SNE's neighbour probabilities with PCA's variances",
      "Picks the perplexity automatically from the PCA components",
      "Reduces the data to two PCA axes and skips t-SNE entirely"
    ],
    "explain": "Instead of scattering points randomly to begin with, t-SNE places them at their PCA positions and optimises from there. Because that starting point already encodes real large-scale geometry, re-runs agree with each other and the arrangement of the clusters inherits meaningful global structure. It makes results more stable and reproducible.",
    "simple": "A random start is like tipping a jigsaw onto the table and sorting from chaos — every dump looks different. Starting from PCA is like laying the pieces roughly where they belong first, then tidying. You get the same sensible picture every time, and the big regions sit where they should.",
    "widget": {
      "type": "curveStatic",
      "title": "Random start vs PCA start",
      "world": "Five re-runs of t-SNE: a random init lands somewhere new each time, while init='pca' reproduces almost the same map.",
      "xlab": "run →",
      "xs": [ 0, 1, 2, 3, 4 ],
      "labels": [ "run 1", "run 2", "run 3", "run 4", "run 5" ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "layout agreement, random init (%)", "ys": [ 100, 42, 55, 38, 60 ] },
        { "name": "layout agreement, init='pca' (%)", "ys": [ 100, 97, 98, 97, 98 ] }
      ],
      "knob": { "label": "Run", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Run 1 is the reference; both starts match themselves at 100%.", "tone": "info" },
        { "max": 3, "text": "Random init drifts to 40–60% agreement — a different-looking map each run.", "tone": "warn" },
        { "max": 4, "text": "🤯 init='pca' holds ~97% across every run: reproducible maps whose global arrangement inherits real geometry.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "init='pca'", "formula": "start layout from PCA coordinates, not randomness", "text": "Re-runs agree and the islands' arrangement inherits real global geometry." }
    }
  },
  {
    "q": "What is UMAP, the method often mentioned alongside t-SNE?",
    "choices": [
      "A newer reducer: much faster, with better global layout than t-SNE",
      "A tool that measures exact distances between t-SNE's finished clusters",
      "An algorithm that automatically picks the best perplexity for t-SNE",
      "A method that turns t-SNE maps into reusable features for models",
      "A newer reducer that only works on data already reduced by PCA"
    ],
    "explain": "UMAP is a more recent dimensionality-reduction method in the same family as t-SNE. It runs much faster on large datasets, tends to preserve global structure better, and — unlike standard t-SNE — can place brand-new points onto an existing map. The same warning holds: do not read literal distances off it.",
    "simple": "UMAP is t-SNE's younger cousin. It draws the same kind of similarity map but usually quicker, keeps the big-picture arrangement a bit truer, and can drop a new arrival onto an existing map without redrawing everything. Just like t-SNE, though, the exact gaps on it are not to be trusted.",
    "widget": {
      "type": "curveStatic",
      "title": "t-SNE vs UMAP as data grows",
      "world": "The same dataset put through both methods at rising sizes; watch the running-time gap explode.",
      "xlab": "dataset size →",
      "xs": [ 0, 1, 2, 3, 4 ],
      "labels": [ "1k", "10k", "100k", "500k", "1M" ],
      "dec": 0,
      "yunit": "s",
      "series": [
        { "name": "t-SNE time (s)", "ys": [ 5, 60, 900, 6000, 15000 ] },
        { "name": "UMAP time (s)", "ys": [ 2, 12, 90, 400, 800 ] }
      ],
      "knob": { "label": "Dataset size", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "On small data both finish quickly — a few seconds either way.", "tone": "info" },
        { "max": 3, "text": "At 100k–500k rows the gap explodes: UMAP in minutes, t-SNE in hours.", "tone": "info" },
        { "max": 4, "text": "🤯 At a million points UMAP still runs while t-SNE is impractical — plus UMAP embeds new points and keeps global layout truer. Same distance caveat, though.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "UMAP", "formula": "faster · better global layout · can embed new points · same distance caveats", "text": "The modern cousin of t-SNE — read cluster membership from it, not literal distances." }
    }
  },
  {
    "q": "t-SNE and PCA both do 'dimensionality reduction'. In plain terms, what is that?",
    "choices": [
      "Turning data with many features into fewer, so it's easier to visualise or model",
      "Deleting rows until the dataset is small enough to load",
      "Rounding every feature value to one decimal place",
      "Merging duplicate columns that hold the same values",
      "Reducing the number of clusters the data contains"
    ],
    "explain": "Dimensionality reduction squeezes many feature-columns down to a few new ones that keep most of the structure — for visualisation (usually 2-D), speed, denoising, or as compact inputs to a model. It's about columns (features), not rows.",
    "simple": "Real data can have hundreds of columns, and you can't see or easily model in hundreds of dimensions. Dimensionality reduction boils those down to a handful of new directions that still capture most of what matters — often just two, so you can plot it. It compresses FEATURES, not rows, and isn't rounding or de-duplicating.",
    "widget": {
      "type": "curveStatic",
      "title": "Many columns down to a few",
      "world": "How much of the data's structure survives as you compress from many features to few. A little compression keeps almost everything; two dimensions keep enough to see.",
      "xlab": "dimensions kept →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "2 (plot)",
        "5",
        "20",
        "100",
        "all 500"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "structure preserved (%)", "ys": [ 70, 85, 95, 99, 100 ] }
      ],
      "knob": { "label": "Dimensions kept", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Squeezed to 2 dimensions: you lose some detail but can finally SEE the data on a plot — the whole point of t-SNE.", "tone": "info" },
        { "max": 2, "text": "Keep ~20 of 500 and 95% of the structure survives — most real datasets are far simpler than their column count suggests.", "tone": "info" },
        { "max": 4, "text": "🤯 Reduction compresses COLUMNS (features) into fewer new directions — not deleting rows, rounding, or merging duplicates. Two dimensions is the special case that lets you visualise.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Dimensionality reduction", "formula": "many features → few new directions keeping most structure", "text": "For visualisation (2-D), speed, denoising, or compact model inputs. PCA (linear) and t-SNE/UMAP (non-linear) are the workhorses." }
    }
  },
  {
    "q": "t-SNE produces a 2-D 'embedding' of the data. What is an embedding?",
    "choices": [
      "Each item turned into coordinates in a low-dimensional space, positioned so similar items land near each other",
      "A copy of the dataset saved in a compressed file",
      "A single number summarising each data point",
      "The list of features ranked by importance",
      "A model trained to predict the 2-D coordinates"
    ],
    "explain": "An embedding represents each item as coordinates — a short vector of numbers — in a low-dimensional space, arranged so that items similar in the original data sit close together. Distance in that space is the whole point: near = alike. t-SNE draws a 2-D embedding you can look at; word2vec learns word embeddings in ~300 dimensions you compute with. Same idea either way: complex thing → point in space, closeness = similarity.",
    "simple": "An embedding turns each item — a data point, a word, an image — into a short list of numbers, which is just a point in space. The trick is that similar things get placed close together, so distance means 'alike'. t-SNE squeezes that down to 2-D so your eye can read the neighbourhoods; other embeddings (like word2vec) use more dimensions you do maths on rather than look at. It's not a zip file, not one single number per point, and not a ranking of features.",
    "widget": {
      "type": "curveStatic",
      "title": "A map of similarity",
      "world": "As t-SNE optimises the layout, how well does 'near on the map' match 'similar in the original data'? Watch neighbourhoods lock into place.",
      "xlab": "optimisation progress →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "start",
        "",
        "",
        "",
        "done"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "neighbours preserved on the map (%)", "ys": [ 12, 45, 74, 88, 93 ] }
      ],
      "knob": { "label": "Progress", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "At the start, points are scattered randomly — the map means nothing yet.", "tone": "info" },
        { "max": 2, "text": "As it optimises, similar points migrate together: the map starts to reflect real neighbourhoods.", "tone": "info" },
        { "max": 4, "text": "🤯 Finished, 93% of each point's true neighbours sit nearby on the 2-D map. That similarity-preserving layout IS the embedding — a map, not a file or a ranking.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Embedding", "formula": "each item → coordinates in a low-D space; distance = similarity", "text": "t-SNE/UMAP make 2-D embeddings for the eye; word2vec-style embeddings use many dimensions you compute with. Same deal: closeness encodes similarity." }
    }
  },
  {
    "q": "Run t-SNE twice on the same data and the two pictures can look different. Why, and how should you treat that?",
    "choices": [
      "It's stochastic — random starts give different layouts, so confirm any pattern across several runs",
      "It's a bug — identical inputs must give identical pictures",
      "The data secretly changed between the two runs",
      "The second run always overfits more than the first",
      "It means the data has no real structure at all"
    ],
    "explain": "t-SNE starts from random positions and optimises, so different runs (and different perplexities) yield different-looking maps. Clusters that are real reappear across runs; a shape that only shows up once is not to be trusted. Re-run before believing.",
    "simple": "t-SNE begins from a random scatter and rearranges from there, so each run lands somewhere slightly different — that's expected, not a bug. The rule: trust a pattern only if it survives several runs and settings. A blob that appears in one run and vanishes in the next was an accident of the random start, not a finding.",
    "widget": {
      "type": "curveStatic",
      "title": "Trust what survives re-runs",
      "world": "The same data, five t-SNE runs with different random starts. Watch which structures reappear every time (real) and which flicker in and out (noise).",
      "xlab": "run →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "run 1",
        "run 2",
        "run 3",
        "run 4",
        "run 5"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "real clusters shown (of 3)", "ys": [ 3, 3, 3, 3, 3 ] },
        { "name": "spurious blobs shown", "ys": [ 1, 0, 2, 1, 0 ] }
      ],
      "knob": { "label": "Run", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "The three genuine clusters appear in every run — reproducible structure you can trust.", "tone": "info" },
        { "max": 3, "text": "The spurious blobs flicker: one run shows two, the next shows none. Those are artefacts of the random start.", "tone": "warn" },
        { "max": 4, "text": "🤯 t-SNE is stochastic by design — different runs differ. Confirm patterns across runs (and perplexities); never publish a shape that only appeared once.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Stochastic embeddings", "formula": "random init → runs differ · trust only what recurs across runs/settings", "text": "Set init='pca' and a fixed seed for stability; still, validate structure across several runs before believing it." }
    }
  },
  {
    "q": "t-SNE makes those famous 2-D maps of high-dimensional data. What does it work hardest to preserve?",
    "choices": [
      "Neighbourhoods — who is close to whom, not global distances",
      "Exact pairwise distances between every pair of points",
      "The variance captured along each of the original axes",
      "Cluster sizes and the spacing between separate groups",
      "Faithful global geometry — how far apart distant clusters sit"
    ],
    "explain": "t-SNE converts distances into neighbour probabilities and matches those between high-D and 2-D. Local friendship circles survive; long-range geometry is sacrificed. It's a map of WHO'S NEAR WHOM, not of how far anything is.",
    "simple": "Drawing the Earth on flat paper forces a choice of what to distort. t-SNE chooses: keep every town next to its true neighbours, even if continents drift to odd places. Perfect for spotting communities; useless for measuring the ocean between them.",
    "widget": {
      "type": "curveStatic",
      "title": "What survives the flattening",
      "world": "Two reducers squash the same 50-D data to 2-D, scored on two different promises: keeping neighbourhoods vs keeping global distances. Neither keeps both — compare their choices.",
      "xlab": "method",
      "xs": [
        0,
        1
      ],
      "labels": [
        "PCA",
        "t-SNE"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "local neighbourhoods preserved", "ys": [ 54, 91 ] },
        { "name": "global distances preserved", "ys": [ 83, 31 ] }
      ],
      "knob": { "label": "Method", "min": 0, "max": 1, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "PCA: global structure holds (83%) because it's a rigid rotation — but fine local friendships blur (54%).", "tone": "info" },
        { "max": 1, "text": "🤯 t-SNE: 91% of friendship circles intact, 31% of global distances — it happily tears the map's large-scale geometry to keep every huddle together. Opposite sacrifices, by design.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "t-SNE (t-distributed Stochastic Neighbour Embedding)", "formula": "match neighbour probabilities between high-D and 2-D — local fidelity über alles", "text": "Use PCA to understand directions and compress; use t-SNE (or UMAP) to SEE cluster structure. Different promises — read each map accordingly." }
    }
  },
  {
    "q": "t-SNE's main knob is 'perplexity' — roughly, how many neighbours each point considers its circle. What does setting it far too LOW do?",
    "choices": [
      "Shatters real groups into many spurious mini-clusters",
      "Merges every distinct group into one undifferentiated blob",
      "Makes the map's pairwise distances perfectly accurate",
      "Silently discards the outlier points before drawing",
      "Locks the layout so re-runs come out perfectly identical"
    ],
    "explain": "Perplexity ~2–5 means each point only bonds with a couple of neighbours, so one true cluster fragments into archipelagos of tiny cliques — structure that looks meaningful and is pure artefact. Too high, and genuinely distinct groups smear together.",
    "simple": "Perplexity is 'how big is a friendship circle?'. Set it to 2 and a real community of 60 people renders as thirty separate couples — the map invents clusters that don't exist. Set it to 500 and distinct communities blur into one crowd. The map changes with the knob; the DATA never did.",
    "widget": {
      "type": "curveStatic",
      "title": "The knob that invents clusters",
      "world": "Data with exactly 5 true groups, mapped by t-SNE at different perplexities. The curve counts the clusters the MAP appears to show. The truth never changes; the picture does.",
      "xlab": "perplexity",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "2",
        "5",
        "30",
        "100",
        "500"
      ],
      "dec": 0,
      "yunit": " apparent clusters",
      "series": [
        { "name": "clusters visible in the map", "ys": [ 23, 11, 5, 5, 2 ] },
        { "name": "true group count", "ys": [ 5, 5, 5, 5, 5 ] }
      ],
      "knob": { "label": "Perplexity", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "🤯 Perplexity 2: the map shows 23 'clusters' of data that contains five. Every one of those extra 18 is an artefact you could easily have presented as a discovery.", "tone": "wow" },
        { "max": 3, "text": "Perplexity 30–100: the map stabilises at the true 5. Stability across a RANGE of perplexities is the credibility test — one pretty map proves nothing.", "tone": "info" },
        { "max": 4, "text": "Perplexity 500: friendship circles so huge that distinct groups merge — 2 blobs from 5 truths. Always run several perplexities before believing any of them.", "tone": "warn" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Perplexity", "formula": "≈ effective neighbourhood size · try 5–50 · trust structure stable across settings", "text": "t-SNE maps are hypotheses, not photographs. The perplexity sweep is the replication study." }
    }
  },
  {
    "q": "On a finished t-SNE map, cluster A looks twice as big as cluster B, and C sits far away from both. What may you safely conclude?",
    "choices": [
      "Only that the clusters are distinct — sizes and between-cluster distances are artefacts",
      "That cluster A has roughly twice the internal variance that cluster B does",
      "That C is the most different group, since it sits farthest from both others",
      "That the plot's two axes are the top two principal components of the data",
      "Everything the map depicts — the cluster sizes, the between-group gaps, and every position"
    ],
    "explain": "t-SNE equalises densities (spreading tight clusters, shrinking loose ones) and its long-range distances are nearly meaningless — different seeds shuffle the layout. The grouping is real; the geometry between and within groups is decoration.",
    "simple": "Read a t-SNE map like a seating chart, not a floor plan: it tells you who sits together, nothing about how large the tables are or how far apart. Re-run with a new seed and the tables rearrange — but the guests at each table stay together. Trust the guest lists only.",
    "widget": {
      "type": "curveStatic",
      "title": "Five seeds, five 'floor plans'",
      "world": "The same data, t-SNE run with five random seeds. Two things are measured off each map: the apparent A–C distance, and the guest lists' consistency. Slide across the runs.",
      "xlab": "random seed",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "run 1",
        "run 2",
        "run 3",
        "run 4",
        "run 5"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "apparent A–C distance (map units)", "ys": [ 38, 12, 55, 21, 44 ] },
        { "name": "cluster memberships identical (%)", "ys": [ 98, 98, 97, 98, 98 ] }
      ],
      "knob": { "label": "Run", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 2, "text": "The A–C 'distance' swings from 12 to 55 across seeds — a number with no stable meaning. Anyone measuring it was measuring the random seed.", "tone": "warn" },
        { "max": 4, "text": "🤯 Meanwhile the memberships — who clusters with whom — are ~98% identical every run. The reliable layer and the decorative layer, cleanly separated.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Reading t-SNE honestly", "formula": "trust: groupings · distrust: sizes, inter-cluster distances, axes, exact positions", "text": "The most-misread plot in data science. Now you hold the reading rules — which puts you ahead of a worrying share of published figures." }
    }
  },
  {
    "q": "Why is t-SNE almost never used to make FEATURES for a downstream model, while PCA constantly is?",
    "choices": [
      "t-SNE has no transform for new data and is slow — PCA is a fast reusable projection",
      "t-SNE's coordinates are too precise and detailed, so any downstream model just overfits them",
      "PCA is the nonlinear method, so it captures far richer structure than t-SNE does",
      "t-SNE can only emit rendered pictures, never reusable numeric coordinates",
      "Downstream models flatly refuse two-dimensional inputs like a t-SNE map"
    ],
    "explain": "PCA learns a fixed linear map: store it, apply it to tomorrow's data in microseconds. Standard t-SNE optimises a layout for THIS dataset only — new points have no defined coordinates, and the optimisation is costly and seed-dependent.",
    "simple": "PCA hands you a reusable recipe: 'combine the columns like so' — apply it forever. t-SNE hands you one finished painting of today's data: gorgeous, but there's no recipe, so tomorrow's customer has no place on it. Recipes go in pipelines; paintings go on walls.",
    "widget": {
      "type": "curveStatic",
      "title": "Recipe vs painting",
      "world": "The practical scorecard: time to reduce a new batch of 10k rows, and whether new points can be embedded at all. Slide across the tools.",
      "xlab": "tool",
      "xs": [
        0,
        1,
        2
      ],
      "labels": [
        "PCA",
        "UMAP",
        "t-SNE"
      ],
      "dec": 1,
      "yunit": "",
      "series": [
        { "name": "new-batch transform time (s)", "ys": [ 0.1, 4, 1200 ] },
        { "name": "can embed new points (1 = yes)", "ys": [ 1, 1, 0 ] }
      ],
      "knob": { "label": "Tool", "min": 0, "max": 2, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "PCA: 0.1s, fully reusable — a matrix multiply. That's why 'PCA then classifier' is a standard pipeline and appears in sklearn as exactly that.", "tone": "info" },
        { "max": 1, "text": "UMAP: the middle ground — nonlinear like t-SNE, but with a .transform() for new data. Increasingly the pragmatic pick for visual maps.", "tone": "info" },
        { "max": 2, "text": "🤯 t-SNE: 20 minutes to redo the whole layout, and 'embed this new point' isn't even defined. Wrong tool for pipelines — the right tool for a one-off look at your data's soul.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "PCA for pipelines, t-SNE for eyes", "formula": "PCA: fit once, transform forever · t-SNE: per-dataset visual, no transform", "text": "Match the tool to the job: features and compression → PCA; exploratory pictures → t-SNE/UMAP. Using either for the other's job is a category error." }
    }
  }
];

(window.QUESTIONS = window.QUESTIONS || {}).tsne2 = [
  {
    "q": "UMAP is t-SNE's younger rival and often its replacement. In practice, what are UMAP's headline advantages — and what stays the same?",
    "choices": [
      "Much faster on big data, better at preserving global layout, and can embed NEW points — but distances/densities in the picture are still not literal",
      "It finally preserves exact pairwise distances, so unlike t-SNE its map reads as a true scale drawing with real mileage between the clusters",
      "It needs no hyperparameters at all — no n_neighbors, no min_dist — so there is never anything left to tune or sweep across",
      "It is essentially t-SNE rebranded — the identical loss and algorithm, only with a quicker implementation and a fresh name",
      "It preserves global structure so perfectly that cluster sizes, densities, and inter-cluster distances can all now be read literally and to scale off the picture"
    ],
    "explain": "UMAP builds a k-neighbour graph and optimises a layout preserving its topology — typically 5–50× faster than t-SNE, scaling to millions of rows, with noticeably more meaningful between-cluster arrangement, and a .transform() to project unseen points (t-SNE must re-fit). But it remains a neighbour-preserving projection: cluster sizes, densities and long-range distances are still artefacts to distrust. n_neighbors plays the perplexity role; min_dist controls how tightly points pack.",
    "simple": "Same species of tool — squash high-dimensional data into a picture by keeping neighbours together — with three practical upgrades: it finishes while t-SNE is still stretching (big data), the ARRANGEMENT of islands on its map means a bit more, and it can place new arrivals on an existing map instead of redrawing from scratch. What it does NOT upgrade: the map is still a neighbourhood cartoon, not a scale drawing. Read cluster membership, never mileage.",
    "widget": {
      "type": "curveStatic",
      "title": "The upgrade that kept the caveat",
      "world": "t-SNE vs UMAP runtime (minutes, log-ish) as dataset size grows, with UMAP's neighbourhood-preservation quality alongside. Watch which curve becomes unusable first.",
      "xlab": "dataset size →",
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
        "50k",
        "200k",
        "1M"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "t-SNE runtime (min)", "ys": [ 1, 4, 26, 180, 1400 ] },
        { "name": "UMAP runtime (min)", "ys": [ 1, 1, 3, 9, 42 ] },
        { "name": "UMAP neighbour quality (%)", "ys": [ 93, 92, 92, 91, 90 ] }
      ],
      "knob": { "label": "Dataset size", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Small data: both finish over coffee and produce similar pictures — at this scale the choice barely matters.", "tone": "info" },
        { "max": 3, "text": "200k rows: three hours vs nine minutes — and UMAP's map can also .transform() tomorrow's data onto today's picture, which t-SNE simply cannot.", "tone": "info" },
        { "max": 4, "text": "🤯 A million rows: t-SNE needs a day; UMAP, 42 minutes at undiminished quality. Yet the caveat survived every upgrade: neither map's distances or densities are literal. Faster cartoon, same cartoon.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "UMAP vs t-SNE", "formula": "UMAP: k-NN graph + topological layout → speed, global structure, .transform()", "text": "Default choice for big embeddings today (umap-learn). Knobs: n_neighbors ≈ perplexity's role, min_dist = packing tightness. All neighbour-embedding caveats still apply." }
    }
  },
  {
    "q": "Two t-SNE runs on the same data: one comes out as a single dense ball, the other as confetti of micro-fragments. Both used extreme learning rates. Which failure belongs to which extreme?",
    "choices": [
      "Too LOW a learning rate under-spreads into a compressed ball; too HIGH tears clusters into scattered shards — modern 'auto' settings avoid both",
      "Too LOW a rate scatters points into shards while too HIGH compresses them into a ball — precisely the reverse of the pairing you would naively guess",
      "The learning rate only affects how long the optimisation runs; both strange pictures still reflect genuine structure in the data itself",
      "The single dense ball is honest — it means the data really does collapse to one true cluster with no separable subgroups at all",
      "The confetti of fragments is honest — it means the data genuinely holds hundreds of tiny, distinct clusters that are worth reporting"
    ],
    "explain": "t-SNE is gradient descent on point positions. Steps too small: points can't escape the initial huddle before the optimisation settles — everything stays balled up (often with early exaggeration failing to separate groups). Steps too large: points overshoot every attraction, genuine clusters shatter into fragments. Both pictures LOOK like discoveries — that's the trap. sklearn's learning_rate='auto' (scaled to n) and sensible early-exaggeration defaults make both pathologies rare today.",
    "simple": "Laying out the map is a physical process: neighbours pull, strangers push, and the learning rate is how big a step each point takes per nudge. Baby steps — nobody gets anywhere, the crowd stays huddled in the middle: one fake blob. Giant leaps — everyone constantly overshoots, groups rip apart: fake confetti. Neither picture is about your data; both are about your step size. When a t-SNE looks bizarre, suspect the optimiser before the biology.",
    "widget": {
      "type": "curveStatic",
      "title": "Baby steps and giant leaps",
      "world": "The same 4-cluster dataset embedded at five learning rates. Track embedding quality and what the picture qualitatively shows — only the middle tells the truth.",
      "xlab": "learning rate →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "10",
        "50",
        "200 (auto-ish)",
        "1000",
        "5000"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "neighbourhood preservation (%)", "ys": [ 41, 74, 91, 68, 29 ] },
        { "name": "visual clusters shown (true: 4)", "ys": [ 1, 3, 4, 7, 23 ] }
      ],
      "knob": { "label": "Learning rate", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Rate 10: one ball, quality 41%. The points never escaped their initial huddle — the picture shows the optimiser's laziness, not the data.", "tone": "warn" },
        { "max": 2, "text": "Around 200 (what learning_rate='auto' lands near for this n): 4 visual clusters, 91% quality — the true structure, findable because steps matched the landscape.", "tone": "info" },
        { "max": 4, "text": "🤯 Rate 5000: twenty-three 'clusters' — pure shrapnel from overshooting, at 29% quality. Same data produced 1, 4, or 23 clusters depending on ONE knob. Any t-SNE conclusion you can't reproduce across settings isn't a conclusion.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "t-SNE optimisation pathologies", "formula": "rate ≪ → compressed ball · rate ≫ → shattered fragments", "text": "Use learning_rate='auto' and default early exaggeration (sklearn ≥1.1); if a picture looks odd, re-run at other rates before believing it." }
    }
  },
  {
    "q": "By default t-SNE scatters its initial point positions randomly, and two runs can put the islands in totally different places. What does init='pca' change, and why is it now the recommended default?",
    "choices": [
      "Points start at their PCA coordinates, anchoring the global arrangement — runs become reproducible and the large-scale layout inherits real meaning",
      "It makes t-SNE fully deterministic by internally fixing the random seed, which is the sole reason two separate runs can ever agree with one another at all",
      "It skips the gradient-descent optimisation entirely and simply returns the plain PCA projection itself as the finished embedding",
      "It replaces the perplexity knob, so you no longer have to choose a neighbourhood size before running the embedding at all",
      "It gradually converts the t-SNE objective into UMAP's loss, and that is what actually recovers the global structure in the layout"
    ],
    "explain": "t-SNE's loss barely cares where clusters sit relative to each other, so from a random start that arrangement is frozen accident — run twice, get mirror-image or reshuffled maps. Initialising at the (first two) PCA coordinates seeds the layout with the data's true coarse geometry: things far apart in PCA start far apart and tend to stay so. Kobak & Berens showed this materially improves global-structure preservation; sklearn made init='pca' the default (1.2+). Seeds fix randomness; PCA init fixes MEANING.",
    "simple": "t-SNE only sweats the neighbourhoods — which points huddle together — and shrugs about where each huddle lands on the page. Started randomly, the islands' positions are dice rolls. Starting from a PCA sketch instead means the page ALREADY holds the data's honest rough geography, and t-SNE then sharpens neighbourhoods on top of it. Result: re-runs agree, and 'these two islands are on opposite shores' finally carries some information instead of being an accident of the seed.",
    "widget": {
      "type": "curveStatic",
      "title": "Dice-roll islands vs a sketched map",
      "world": "Five re-runs (different seeds) with random init vs PCA init, measuring how much each run's GLOBAL island arrangement matches run 1's.",
      "xlab": "re-run →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "run 1",
        "run 2",
        "run 3",
        "run 4",
        "run 5"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "PCA init: layout agreement", "ys": [ 100, 96, 95, 97, 96 ] },
        { "name": "random init: layout agreement", "ys": [ 100, 55, 48, 61, 42 ] }
      ],
      "knob": { "label": "Re-run", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Second run, random init: only 55% of the island arrangement survives — clusters are intact but live on different shores. PCA init: 96%.", "tone": "info" },
        { "max": 3, "text": "The clusters THEMSELVES are stable in both columns — it's specifically the between-cluster geography that random init rolls fresh each time.", "tone": "info" },
        { "max": 4, "text": "🤯 Five runs: random init averages ~50% layout agreement, PCA init ~96%. If you plan to interpret which islands are near which — at all — the init isn't a detail, it's the licence to do so.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "init='pca'", "formula": "seed positions = PCA coords → global layout anchored to real geometry", "text": "sklearn's default since 1.2 (with learning_rate='auto'). Cheap, strictly better for interpretation; UMAP's spectral init plays the same role." }
    }
  },
  {
    "q": "The standard recipe for t-SNE on 784-dimensional image data starts with a PCA step down to ~50 dimensions. Why preprocess with the 'rival' method first?",
    "choices": [
      "PCA strips noise dimensions and slashes the distance computations — faster AND cleaner embeddings, since t-SNE's distances stop being diluted by noise",
      "Because standard t-SNE simply crashes or outright refuses to run on any input above roughly a hundred dimensions, so the PCA step is a mandatory workaround",
      "Because the final picture must come out exactly two-dimensional, and only the PCA step is what actually reduces the data down that far",
      "PCA pre-labels the clusters first, and t-SNE then merely arranges those already-discovered groups into a readable picture on the page",
      "It is really just cargo-cult ritual — the PCA step changes neither the runtime nor the quality of the final embedding in any way"
    ],
    "explain": "t-SNE's input is pairwise distances, computed on every dimension. In 784-d, hundreds of near-noise dimensions both cost time and — via the curse of dimensionality — dilute the very neighbour contrasts t-SNE needs. PCA to ~50 keeps the real variance (natural images are intrinsically low-dimensional), denoises the metric, and cuts the distance bill ~16×. They're not rivals but a pipeline: linear PCA does honest bulk reduction, non-linear t-SNE spends its effort on the structure that's actually there. sklearn's docs recommend exactly this.",
    "simple": "784 columns of pixels are mostly hiss — a few dozen directions carry the actual picture-ness. Asking t-SNE to measure similarity through all that hiss is like judging voices over a crackly line: slow, and the crackle blurs who sounds like whom. PCA is the noise filter: keep the 50 directions where the signal lives, discard the crackle, THEN let t-SNE do its delicate neighbourhood work on a clean line. Cheaper and better, not cheaper but worse.",
    "widget": {
      "type": "curveStatic",
      "title": "Filter the hiss, then listen",
      "world": "t-SNE on 784-d image data, preceded by PCA to various widths. Watch runtime AND embedding quality as the pre-reduction gets more aggressive.",
      "xlab": "PCA dimensions kept before t-SNE →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "none (784)",
        "300",
        "100",
        "50",
        "10"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "runtime (min)", "ys": [ 120, 55, 22, 12, 6 ] },
        { "name": "embedding quality (%)", "ys": [ 86, 88, 90, 90, 82 ] }
      ],
      "knob": { "label": "PCA width", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "No pre-reduction: two hours, and quality is actually LOWER than with PCA-50 — the noise dimensions were diluting every distance t-SNE relied on.", "tone": "warn" },
        { "max": 3, "text": "PCA to 50: ten times faster and quality up to 90%. Nothing of value was lost — images never really had 784 independent dimensions.", "tone": "info" },
        { "max": 4, "text": "🤯 PCA to 10 finally overshoots: real structure gets crushed and quality drops to 82. The pipeline logic: linear method for honest bulk reduction, non-linear method for the last, hard mile. ~50 is the folklore sweet spot for a reason.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "PCA-then-t-SNE", "formula": "PCA to ~50 dims → t-SNE/UMAP to 2 — denoise + speed, no rivalry", "text": "Standard for images, embeddings, single-cell data. The two methods answer different questions and stack beautifully; sklearn's TSNE docs recommend it explicitly." }
    }
  },
  {
    "q": "Your t-SNE plot shows five crisp islands and the team is ready to announce 'five customer types'. What must happen before that becomes a claim rather than a picture?",
    "choices": [
      "Treat the islands as hypotheses: re-run across seeds and perplexities, and confirm with checks OUTSIDE the picture — labels, held-out features, or cluster validity stats",
      "Nothing further is needed — crisp, well-separated t-SNE islands are definitive clusters, and simply counting the five of them is already all the validation any claim requires",
      "Simply re-count the islands at a much higher zoom and a finer resolution, to be certain the five separate groups were not accidentally miscounted",
      "Re-colour the very same plot by each candidate feature and re-inspect it by eye until the five islands clearly line up with something meaningful",
      "Average each point's coordinates across many seeded runs, then re-count the islands on that single stabilised, averaged embedding to confirm five"
    ],
    "explain": "t-SNE is an eager cluster-shower: perplexity and optimisation quirks can carve continuous data into convincing islands (and shatter real groups). Validation ladder: (1) stability — do the same points co-locate across seeds and a perplexity sweep? (2) external evidence — do the islands align with known labels, or differ on features/metadata HELD OUT of the embedding? (3) quantitative — silhouette or a classifier on the ORIGINAL high-dimensional data using the proposed groups. A cluster that only exists at perplexity 30, seed 42, in 2-D, does not exist.",
    "simple": "The map is an artist's impression, and this artist LOVES drawing islands — sometimes where there's only open water. Before shipping 'five customer types': redraw the map several ways (seeds, perplexities) and check the same customers keep washing up together; then — the real test — step off the map entirely and ask whether the groups differ on facts the map never saw (spending, churn, demographics). Structure that survives outside its own picture is a finding. Structure that doesn't is décor.",
    "widget": {
      "type": "curveStatic",
      "title": "Islands or open water?",
      "world": "The same continuous, cluster-less control data embedded at five perplexities, next to genuinely 4-clustered data. Count the islands each shows — one of these datasets is lying to you.",
      "xlab": "perplexity →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "2",
        "5",
        "30",
        "100",
        "500"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "islands shown: cluster-less data", "ys": [ 19, 9, 4, 2, 1 ] },
        { "name": "islands shown: truly 4-cluster data", "ys": [ 11, 6, 4, 4, 4 ] }
      ],
      "knob": { "label": "Perplexity", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Perplexity 2: BOTH datasets shatter into a dozen-plus islands — at tiny perplexity, t-SNE draws archipelagos from anything, including pure noise.", "tone": "warn" },
        { "max": 2, "text": "Perplexity 30: both show 4 islands. One of them truly has 4 groups; the other is smooth, cluster-less data wearing a convincing costume. The PICTURE cannot tell you which is which.", "tone": "warn" },
        { "max": 4, "text": "🤯 Sweep on: the real clusters hold at 4 across perplexities while the fake ones melt away to 1. Stability under the sweep — plus evidence from outside the plot — is the difference between a finding and wallpaper.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Validating embedding structure", "formula": "survives seeds + perplexity sweep + external evidence ⇒ believable", "text": "t-SNE/UMAP generate hypotheses; they never confirm them. Confirm on held-out labels/features or validity stats computed in the ORIGINAL space — never in the 2-D picture itself." }
    }
  }
];
