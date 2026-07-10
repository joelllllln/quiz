/* KNN — Level 3: Advanced. 30 questions; choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).hard = [
  {
    "q": "Send the number of dimensions toward infinity and track the ratio (distance to farthest point) ÷ (distance to nearest point). It tends toward…",
    "choices": [
      "1",
      "0",
      "2",
      "√d",
      "Infinity"
    ],
    "explain": "Distances concentrate around their mean as dimensions grow: max/min → 1. When that ratio is ~1, ranking by distance carries almost no information.",
    "simple": "In high dimensions the farthest point ends up barely farther than the nearest — their ratio slides toward 1. And when near and far look alike, ranking by distance tells you nothing.",
    "widget": {
      "type": "dimCurse",
      "title": "The shrinking contrast",
      "world": "Ten items, one query. Stalk one number below: farthest ÷ nearest. Take it from a rich 3× down to nearly 1×.",
      "itemName": "item",
      "n": 10,
      "seed": 99,
      "knob": { "label": "Dimensions compared", "min": 1, "max": 64, "step": 1, "init": 3 },
      "insights": [
        { "max": 5, "text": "Low dimensions: the ratio sits around 2–4×. \"Nearest\" is a strong, meaningful title — the ranking has contrast.", "tone": "info" },
        { "max": 30, "text": "The ratio is sliding toward 1×. Note it never reaches exactly 1 — but every drop makes the top of the ranking more arbitrary.", "tone": "warn" },
        { "max": 64, "text": "🤯 ~1.2× and falling: swap the \"nearest\" for the 5th-nearest and barely anything changes. Any decision built on this ranking is built on noise.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Distance concentration", "formula": "as d → ∞ : Dmax / Dmin → 1 (for i.i.d. dimensions)", "text": "The precise form of the curse: it's not that distances get big, it's that they all become the SAME size. Contrast — not closeness — is what KNN eats." }
    }
  },
  {
    "q": "k-d trees answer queries in ~log(n) time in 2-D, yet degrade toward brute-force O(n) in high dimensions. What exactly breaks?",
    "choices": [
      "Pruning — nothing is provably far",
      "Memory — the tree overflows",
      "Precision — float error accumulates",
      "Balance — inserts dominate runtime",
      "Depth — log n stops being small"
    ],
    "explain": "Index speed comes from skipping regions that provably can't contain the nearest neighbour. Distance concentration destroys those proofs: every region might contain it, so the search visits nearly everything.",
    "simple": "An index gets its speed from skipping regions that are PROVABLY too far. When all distances are nearly equal, nothing is provably too far — so the 'smart' search ends up checking almost everything.",
    "widget": {
      "type": "dimCurse",
      "title": "Nothing left to skip",
      "world": "An index may skip a region only if it can PROVE nothing nearer lives there. That proof needs contrast between the bars — watch it vanish.",
      "itemName": "candidate",
      "n": 10,
      "seed": 31,
      "knob": { "label": "Dimensions in the index", "min": 2, "max": 64, "step": 1, "init": 2 },
      "insights": [
        { "max": 6, "text": "Big contrast: most bars are FAR longer than the shortest. An index can dismiss those regions wholesale — that's where log(n) speed comes from.", "tone": "info" },
        { "max": 30, "text": "The bars are converging. Fewer and fewer candidates can be provably dismissed, so the \"smart\" search quietly checks more and more of them.", "tone": "warn" },
        { "max": 64, "text": "🤯 Near-equal bars: to be SURE of the nearest, the index must inspect nearly everything — congratulations, you've reinvented brute force. High-dimensional search is why approximate methods exist.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Index pruning fails under concentration", "formula": "no provable \"can't-be-nearer\" regions → visit ~n nodes", "text": "k-d/ball trees are only as fast as their ability to skip. Past ~15–20 effective dimensions, practitioners switch to approximate nearest-neighbour search (LSH, HNSW)." }
    }
  },
  {
    "q": "The two classes genuinely overlap: identical-looking points occur with either label. For ANY classifier on this data, perfect accuracy is…",
    "choices": [
      "Impossible — some error is irreducible",
      "Reachable with enough data",
      "Reachable after standardising",
      "Reachable with weighted votes",
      "Impossible only for KNN"
    ],
    "explain": "Where the classes truly overlap, the best possible decision still loses on some points (Bayes error). A model scoring 100% on such training data is memorising coin flips.",
    "simple": "If identical-looking points can genuinely carry either label, some error is simply unavoidable — for ANY model. That floor is the Bayes error. Scoring 100% on such data means you memorised coin flips.",
    "widget": {
      "type": "boundaryK",
      "title": "The honest ceiling",
      "world": "Two species genuinely overlap in the middle band. Try every k: can ANY map get everyone right? Should it even try?",
      "classes": [
        "Species A",
        "Species B"
      ],
      "xlab": "wing length",
      "ylab": "body mass",
      "points": [
        { "x": 1.5, "y": 3, "c": 0 },
        { "x": 2.5, "y": 5, "c": 0 },
        { "x": 2, "y": 7, "c": 0 },
        { "x": 3.5, "y": 2.5, "c": 0 },
        { "x": 3, "y": 6.5, "c": 0 },
        { "x": 4.5, "y": 5.5, "c": 0 },
        { "x": 5, "y": 3.5, "c": 1 },
        { "x": 4.8, "y": 7.5, "c": 0 },
        { "x": 5.5, "y": 5, "c": 0 },
        { "x": 5.2, "y": 6.8, "c": 1 },
        { "x": 5.8, "y": 2.8, "c": 0 },
        { "x": 6, "y": 6, "c": 1 },
        { "x": 6.5, "y": 4, "c": 1 },
        { "x": 7, "y": 7.5, "c": 1 },
        { "x": 7.5, "y": 3, "c": 1 },
        { "x": 8, "y": 5.5, "c": 1 },
        { "x": 8.5, "y": 7, "c": 1 },
        { "x": 9, "y": 4.5, "c": 1 }
      ],
      "knob": { "label": "Neighbours per prediction (k)", "min": 1, "max": 17, "step": 2, "init": 1 },
      "insights": [
        { "max": 3, "text": "Small k: the map draws heroic little islands around every contested point — \"explaining\" outcomes that were effectively coin flips. That's memorised noise, not knowledge.", "tone": "warn" },
        { "max": 9, "text": "Moderate k: the map accepts a clean border and CONCEDES the contested points near it. Accepting known losses is the optimal move here.", "tone": "info" },
        { "max": 17, "text": "🤯 No k anywhere on this slider produced a perfect map — nor can any model, ever, on truly overlapping classes. The best achievable error has a name; hitting it (not 0%) is the actual goal.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Bayes error (irreducible error)", "formula": "best possible error > 0 when classes overlap · (classic result: 1-NN error ≤ 2 × Bayes error, given infinite data)", "text": "Every problem has a floor set by genuine ambiguity. Knowing it exists changes your goal from \"get 100%\" to \"get close to the floor without fitting noise\"." }
    }
  },
  {
    "q": "Weighted KNN with weight = 1/dᵖ. Crank the power p toward infinity, and your k-neighbour model behaves exactly like…",
    "choices": [
      "1-NN, whatever k is",
      "Plain unweighted k-NN",
      "k = n majority voting",
      "A permanent tie machine",
      "A uniformly random voter"
    ],
    "explain": "Raising p amplifies closeness differences: the smallest d wins by an ever-bigger factor until the nearest point's weight swamps everyone. p is a dial from uniform-vote (p=0) to pure 1-NN (p→∞).",
    "simple": "Weight = 1 over distance-to-the-power-p. Crank p and the closest neighbour's advantage gets amplified until it outshouts everyone else combined — your k-neighbour vote quietly becomes a 1-neighbour vote.",
    "widget": {
      "type": "voteWeight",
      "title": "The dial between two algorithms",
      "world": "Five neighbours: the closest says edible, four say toxic. Your knob is p in weight = 1/dᵖ. Morph one algorithm into another.",
      "classes": [
        "Edible",
        "Toxic"
      ],
      "neighbors": [
        { "name": "closest", "d": 0.6, "c": 0 },
        { "name": "2nd", "d": 1.1, "c": 1 },
        { "name": "3rd", "d": 1.3, "c": 1 },
        { "name": "4th", "d": 1.6, "c": 1 },
        { "name": "5th", "d": 1.9, "c": 1 }
      ],
      "knob": { "label": "Weight exponent p (weight = 1/dᵖ)", "min": 0, "max": 4, "step": 0.1, "init": 0 },
      "insights": [
        { "max": 0.05, "text": "p = 0: every weight is 1 — this IS plain unweighted KNN. Toxic wins 4–1.", "tone": "info" },
        { "max": 2.5, "text": "The closest neighbour's circle is inflating fast — 1/d rewards closeness linearly, but 1/d⁴ rewards it savagely. Watch for the flip.", "tone": "warn" },
        { "max": 4, "text": "🤯 The nearest neighbour now outweighs all four others combined: your \"5-NN\" is behaving exactly like 1-NN. Same k, different p — a whole family of algorithms lives on this one dial.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "The weight exponent p", "formula": "p = 0 → uniform k-NN · p → ∞ → 1-NN. Common picks: p = 1, 2", "text": "k and p together set how local the model is. High p re-concentrates influence no matter how big k is — useful, but it resurrects 1-NN's noise-sensitivity too." }
    }
  },
  {
    "q": "KNN regression's prediction curve is a staircase — flat stretch, sudden jump, flat stretch. The jumps happen at exactly the moments when…",
    "choices": [
      "The k-member club changes",
      "A value crosses zero",
      "The mean gets rounded",
      "Two ties re-order",
      "The metric switches"
    ],
    "explain": "As the query slides along x, the prediction is the mean of a FIXED set of neighbours until one drops out and another drops in — then the average jumps. Flat, jump, flat, jump: a staircase.",
    "simple": "The prediction is the average of a fixed club of k members. Slide along and nothing changes until one member swaps out — then the average jumps. Flat, jump, flat, jump: a staircase.",
    "widget": {
      "type": "knnRegress",
      "title": "Anatomy of a staircase",
      "world": "Watch the purple prediction LINE. Why is it flat in places — and what happens at the exact moment it jumps?",
      "xlab": "engine size",
      "ylab": "mpg",
      "itemName": "cars",
      "decimals": 1,
      "points": [
        { "x": 0.7, "y": 52 },
        { "x": 1.5, "y": 47 },
        { "x": 2.3, "y": 44 },
        { "x": 3.1, "y": 38 },
        { "x": 3.9, "y": 35 },
        { "x": 4.7, "y": 30 },
        { "x": 5.5, "y": 28 },
        { "x": 6.3, "y": 24 },
        { "x": 7.1, "y": 22 },
        { "x": 7.9, "y": 18 },
        { "x": 8.7, "y": 16 },
        { "x": 9.5, "y": 13 }
      ],
      "qx": 4.3,
      "knob": { "label": "Cars averaged (k)", "min": 1, "max": 12, "step": 1, "init": 1 },
      "insights": [
        { "max": 1, "text": "k = 1: pure staircase — each flat step is \"the territory where THIS car is the nearest one\". The jump is the instant the crown changes heads.", "tone": "info" },
        { "max": 5, "text": "Bigger k: steps get smaller and more frequent (any of k members swapping causes a small jump) — smoother-looking, but still never a sloped line. Zoom your eyes in on a jump.", "tone": "info" },
        { "max": 12, "text": "🤯 The line NEVER tilts — it only ever steps, because a mean over a fixed set is constant. KNN regression is piecewise-constant by construction; if the truth is a smooth slope, KNN approximates it with stairs.", "tone": "wow" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Piecewise-constant predictions", "formula": "ŷ(x) = mean of a set that changes only at switchover points → step function", "text": "Fixed membership between switchovers = flat prediction. Distance-weighted KNN softens the jumps (weights change continuously) — one more reason weighting is popular." }
    }
  },
  {
    "q": "A useful rule of thumb: the effective number of parameters ('moving parts') of a KNN model is roughly…",
    "choices": [
      "n ÷ k",
      "k",
      "d + 1",
      "√(n · k)",
      "log₂ n"
    ],
    "explain": "The input space fragments into roughly n/k regions, each free to take its own value — like a model with n/k independent parameters. k=1 gives n regions (very complex); k=n gives 1 (a constant).",
    "simple": "The map splits into about n÷k patches that can each pick their own colour. k = 1: every point gets a patch (14 moving parts). k = n: one patch (1 moving part). Patch count ≈ parameter count.",
    "widget": {
      "type": "boundaryK",
      "title": "Counting the model's moving parts",
      "world": "Count the separately-colourable patches: the model's moving parts. Your knob divides n = 14 by k.",
      "classes": [
        "Alert",
        "Normal"
      ],
      "xlab": "vibration",
      "ylab": "temperature",
      "points": [
        { "x": 1.2, "y": 1.8, "c": 0 },
        { "x": 2.6, "y": 3.2, "c": 0 },
        { "x": 1.8, "y": 5.4, "c": 0 },
        { "x": 3.4, "y": 1.2, "c": 0 },
        { "x": 4.4, "y": 4.2, "c": 0 },
        { "x": 2.2, "y": 7.6, "c": 0 },
        { "x": 6.8, "y": 8.4, "c": 0 },
        { "x": 6.2, "y": 2.4, "c": 1 },
        { "x": 7.8, "y": 3.8, "c": 1 },
        { "x": 8.8, "y": 2, "c": 1 },
        { "x": 7.2, "y": 5.6, "c": 1 },
        { "x": 8.4, "y": 7, "c": 1 },
        { "x": 9.2, "y": 5, "c": 1 },
        { "x": 5.4, "y": 6.6, "c": 1 }
      ],
      "knob": { "label": "k (complexity ≈ 14 / k)", "min": 1, "max": 13, "step": 2, "init": 1 },
      "insights": [
        { "max": 1, "text": "k = 1: complexity ≈ 14/1 = 14 moving parts — every point commands its own patch. Maximum flexibility, maximum capacity to memorise.", "tone": "warn" },
        { "max": 7, "text": "k = 5: ≈ 3 effective parts. The map can still express \"two main territories and an exclave\", but no single point gets private treatment.", "tone": "info" },
        { "max": 13, "text": "🤯 k = 13: ≈ 1 part — the model is one notch above predicting a constant. You've watched a 14-parameter model dissolve into a 1-parameter model with one slider.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Effective parameters ≈ n/k", "formula": "complexity(KNN) ≈ n / k regions that can vary independently", "text": "This is why k fights overfitting: it doesn't \"add smoothing\" abstractly, it literally deletes degrees of freedom. Compare models by effective complexity, not parameter counts." }
    }
  },
  {
    "q": "Prototype selection keeps mostly boundary-area points and throws away the deep interior — yet accuracy barely moves. Why?",
    "choices": [
      "Interior points never swing votes",
      "Interior points carry more noise",
      "Boundary points compress better",
      "The interior can be reconstructed",
      "Fewer points make k stronger"
    ],
    "explain": "A query lands near the boundary or it doesn't: deep-interior points only ever confirm landslide votes. Dropping them barely moves any prediction, while slashing storage and query cost.",
    "simple": "Points deep inside a class only pile onto votes that were already won. The disputed cases live near the border — keep those, drop the redundant interior, and the answers barely change.",
    "widget": {
      "type": "speedLazy",
      "title": "The great pruning",
      "world": "40,000 stored letters — most deep inside their class, confirming votes already won. Prune toward the disputed boundary examples.",
      "itemName": "stored letters",
      "storeLabel": "Example archive",
      "knobMax": 40000,
      "knob": { "label": "Examples kept after pruning", "min": 800, "max": 40000, "step": 400, "init": 40000 },
      "insights": [
        { "max": 4000, "text": "🤯 Kept only the ~10% of examples that ever influence a contested vote: queries answer 10× faster, memory is a tenth — and accuracy is nearly untouched, because you kept the DECIDERS.", "tone": "wow" },
        { "max": 20000, "text": "Pruning interior examples: each one you drop was only ever piling onto votes already won. The bill shrinks; the boundary — the thing that decides hard cases — survives.", "tone": "info" },
        { "max": 40000, "text": "The full archive: maximum cost, and most of it is redundant confirmation. Slide LEFT to prune it and see what actually mattered.", "tone": "warn" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Prototype selection (CNN / ENN editing)", "formula": "keep boundary-region points, drop redundant interior → ~same boundary, fraction of the cost", "text": "Condensed NN keeps points that change votes; Edited NN also deletes noisy ones (bonus: that trims overfitting too). Same idea powers modern vector-database compaction." }
    }
  },
  {
    "q": "HNSW, LSH and friends (approximate nearest-neighbour search) power modern vector search. The deal they offer is…",
    "choices": [
      "Rarely miss the nearest; hugely faster",
      "Exact results at fixed latency",
      "Full speed, but only for k = 1",
      "Full speed, but labels required",
      "Speed by storing the data twice"
    ],
    "explain": "ANN methods answer \"a very-near neighbour, almost always the nearest\" instead of \"the provably nearest\" — recall ~95–99% at a tiny fraction of the cost. At web scale, exactness is a luxury nobody buys.",
    "simple": "Approximate search occasionally returns the 2nd-nearest instead of the very nearest — in exchange for being hundreds of times faster. At web scale nobody notices, and nobody pays for exact.",
    "widget": {
      "type": "speedLazy",
      "title": "Close enough, a thousand times faster",
      "world": "Similar-song search at catalogue scale. Exact search checks everything; the third bar follows a graph of shortcuts instead.",
      "itemName": "song vectors",
      "storeLabel": "Song catalogue",
      "knobMax": 64000,
      "indexed": true,
      "knob": { "label": "Songs in the catalogue", "min": 2000, "max": 64000, "step": 2000, "init": 8000 },
      "insights": [
        { "max": 16000, "text": "The exact scan is already thousands of checks per query. The approximate route: a couple dozen hops through the shortcut graph.", "tone": "info" },
        { "max": 48000, "text": "The user cannot tell the 1st-nearest song from the 2nd-nearest. The exact-search bar is paying an enormous premium for a difference below human perception.", "tone": "warn" },
        { "max": 64000, "text": "🤯 64,000 checks vs ~16 hops. In high dimensions exact indexes collapse back to the big bar, so approximate search isn't a cheap hack — it's the only thing that works at scale.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Approximate Nearest Neighbours (ANN)", "formula": "recall ≈ 95–99% of true neighbours · cost ≈ O(log n) even in high dimensions", "text": "HNSW graphs, LSH buckets, IVF cells: different tricks, same trade. Every \"similar items\" feature you've used ran KNN's idea through an ANN engine." }
    }
  },
  {
    "q": "Two documents share a topic, but one is 3× longer — its word-count vector points the same way, just 3× farther out. The measure that ignores that is…",
    "choices": [
      "Cosine similarity",
      "Raw Euclidean",
      "Raw Manhattan",
      "Standardised Euclidean",
      "Jaccard on the counts"
    ],
    "explain": "Scaling a vector by 3 leaves its direction unchanged but moves it far away in Euclidean terms. Cosine measures the angle between vectors — same topic mix = same direction = similar, at any length.",
    "simple": "Double a document and its word-count vector doubles too: same direction, longer arrow. Cosine compares DIRECTIONS (the topic mix) and ignores arrow length (the word count). Same topic = small angle = similar.",
    "widget": {
      "type": "metricSwitch",
      "title": "The long-winded twin",
      "world": "'Football Weekly XL' is the same KIND of article as the short match report — just 3× longer. Watch which twin the standard rulers pick.",
      "classes": [
        "Sports desk",
        "Politics desk"
      ],
      "xlab": "mentions of \"goals\"",
      "ylab": "mentions of \"elections\"",
      "queryLabel": "short match report",
      "points": [
        { "x": 2.4, "y": 4.2, "c": 1, "name": "Election brief" },
        { "x": 9, "y": 1.5, "c": 0, "name": "Football Weekly XL" },
        { "x": 1, "y": 8.5, "c": 1, "name": "Campaign special" },
        { "x": 6.5, "y": 7.5, "c": 0, "name": "Sport & society essay" }
      ],
      "query": { "x": 3, "y": 0.5 },
      "knob": { "label": "The ruler (city-block → straight-line)", "min": 1, "max": 2, "step": 0.05, "init": 2 },
      "insights": [
        { "max": 1.05, "text": "Same problem under city-block: the politics brief still beats the long football article. Both standard rulers punish LENGTH, not topic difference.", "tone": "warn" },
        { "max": 1.9, "text": "Slide all you like — no p fixes this. The match report and Football Weekly XL point the SAME WAY from the origin (goals-heavy, election-light); what differs is only how far along that direction they sit.", "tone": "info" },
        { "max": 2, "text": "🤯 Euclidean picks the ELECTION brief as the sports report's twin, purely because both are short. The fix isn't another p — it's a ruler that measures ANGLE: same direction = similar, regardless of length.", "tone": "wow" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Cosine similarity", "formula": "cos(θ) = (A·B) / (|A||B|) — compares direction, ignores magnitude", "text": "For text, embeddings and any \"profile-shaped\" data, cosine (or normalising vectors to length 1, which makes Euclidean rank the same way) is the standard KNN metric." }
    }
  },
  {
    "q": "One-hot columns (0 or 1) sit beside raw income (tens of thousands). Without rescaling, the categorical information is…",
    "choices": [
      "Effectively invisible",
      "Completely dominant",
      "Counted once per level",
      "Normalised automatically",
      "Mathematically undefined"
    ],
    "explain": "A one-hot mismatch contributes at most ~1 to the distance; a £20k income gap contributes 20,000. Unscaled, the categorical column may as well not exist.",
    "simple": "A smoker/non-smoker mismatch adds at most 1 to the distance; a £20,000 income gap adds 20,000. Without rescaling, the one-bit column is a whisper in a storm.",
    "widget": {
      "type": "scaleFeature",
      "title": "The one-bit whisper",
      "world": "'Smoker' is a one-hot column: 0 or 1. Medically huge, numerically tiny. Shrink income's units until that one bit gets a voice.",
      "aName": "smoker flag (×10)",
      "bName": "income",
      "target": { "name": "Ira", "a": 0, "b": 38000 },
      "cands": [
        { "name": "Jo · smoker, £38.5k", "a": 10, "b": 38500 },
        { "name": "Ash · non-smoker, £45k", "a": 0, "b": 45000 },
        { "name": "Kim · smoker, £39k", "a": 10, "b": 39000 },
        { "name": "Lee · non-smoker, £52k", "a": 0, "b": 52000 }
      ],
      "knob": { "label": "Shrink income units by", "min": 0, "max": 4, "step": 0.25, "init": 0 },
      "insights": [
        { "max": 0.5, "text": "Raw pounds: Jo — a SMOKER with a nearly identical income — is Ira's \"twin\". The smoker column is contributing a rounding error to the distance.", "tone": "warn" },
        { "max": 2.5, "text": "As income's units shrink, the smoker mismatch starts costing real distance. Watch the non-smokers climb the ranking.", "tone": "info" },
        { "max": 4, "text": "🤯 Now smoker-status rules and income barely matters. There's no free lunch: with mixed types YOU choose the exchange rate between \"one category apart\" and \"one pound apart\". Choosing it deliberately is the whole game.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Mixed-type distances (scaling as exchange rate)", "formula": "standardise numerics + weight one-hots · or use Gower distance for mixed data", "text": "After standardising, a one-hot mismatch ≈ a one-standard-deviation numeric gap — a defensible default. Gower distance formalises mixed-type comparison; either way, the exchange rate is a modelling decision." }
    }
  },
  {
    "q": "KNN imputation (e.g. sklearn's KNNImputer) fills a missing value with…",
    "choices": [
      "The most-similar rows' average",
      "The class-weighted column mean",
      "A regression model's estimate",
      "A random draw from the column",
      "The column median, refined later"
    ],
    "explain": "The KNN idea works for repair, not just prediction: rows similar in every other respect probably resemble the broken row in the missing feature too.",
    "simple": "A row is missing one value? Find the rows most similar on everything else, and average what THEY have in that slot. It's the same 'ask the neighbours' trick, used to repair data instead of predict.",
    "widget": {
      "type": "knnRegress",
      "title": "The torn page",
      "world": "One day's humidity got corrupted; temperature survived. Repair the gap using the most similar intact days.",
      "xlab": "temperature",
      "ylab": "humidity (%)",
      "itemName": "intact days",
      "decimals": 0,
      "unit": "%",
      "points": [
        { "x": 0.8, "y": 88 },
        { "x": 1.6, "y": 84 },
        { "x": 2.4, "y": 80 },
        { "x": 3.2, "y": 74 },
        { "x": 4, "y": 70 },
        { "x": 4.8, "y": 66 },
        { "x": 5.6, "y": 62 },
        { "x": 6.4, "y": 55 },
        { "x": 7.2, "y": 50 },
        { "x": 8, "y": 46 },
        { "x": 8.8, "y": 41 },
        { "x": 9.6, "y": 36 }
      ],
      "qx": 5.1,
      "knob": { "label": "Similar days averaged (k)", "min": 1, "max": 12, "step": 1, "init": 3 },
      "insights": [
        { "max": 2, "text": "One or two look-alike days give a plausible repair, but you're trusting individual days — one sensor glitch among them and the \"repair\" is damage.", "tone": "warn" },
        { "max": 7, "text": "A handful of similar days: stable, sensible fill values. This exact procedure is sklearn's KNNImputer.", "tone": "info" },
        { "max": 12, "text": "🤯 Averaging ALL days fills the gap with the yearly average — ignoring that this was a warm day. Even for repair-work, \"similar\" beats \"everything\": the same k trade-off follows KNN everywhere it goes.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "KNN imputation", "formula": "missing value ← mean of that feature over the k most-similar complete rows", "text": "One algorithm, three jobs so far: classify (vote), regress (average), impute (average into the gaps). Distance-based reasoning is a Swiss army knife." }
    }
  },
  {
    "q": "Radius-based neighbours ('everyone within distance r') has one failure mode that plain k-NN can never have. Which?",
    "choices": [
      "Zero voters — no prediction",
      "Ties that cannot be broken",
      "A scale-dependent neighbourhood",
      "Defaulting to the majority class",
      "The same voter counted twice"
    ],
    "explain": "k-NN always finds exactly k voters, however far away. A fixed radius adapts the voter COUNT to local density instead — great where data is dense, but an empty circle where data is sparse.",
    "simple": "'Everyone within radius r' can be… nobody, if the point sits in an empty area. No voters, no prediction. Plain k-NN never fails that way — it just quietly grabs faraway voters instead.",
    "widget": {
      "type": "radiusScatter",
      "title": "The circle that came back empty",
      "world": "This model asks 'everyone within walking distance r' — the dashed circle. The query sits at the edge of town. Shrink the circle.",
      "classes": [
        "Solar roof",
        "No solar"
      ],
      "xlab": "street position",
      "ylab": "plot size",
      "queryLabel": "edge-of-town house",
      "points": [
        { "x": 1.2, "y": 7.8, "c": 0 },
        { "x": 2.2, "y": 8.6, "c": 0 },
        { "x": 1.8, "y": 6.6, "c": 0 },
        { "x": 3, "y": 7.4, "c": 0 },
        { "x": 2.6, "y": 9.2, "c": 0 },
        { "x": 3.6, "y": 8.2, "c": 1 },
        { "x": 1, "y": 9, "c": 1 },
        { "x": 4.2, "y": 6.8, "c": 1 },
        { "x": 3.4, "y": 5.8, "c": 1 },
        { "x": 2, "y": 5.2, "c": 1 }
      ],
      "query": { "x": 7.8, "y": 2.2 },
      "knob": { "label": "Radius r (walking distance)", "min": 0.5, "max": 9, "step": 0.25, "init": 7 },
      "insights": [
        { "max": 5.5, "text": "🤯 The circle is EMPTY — zero voters, no prediction, undefined. k-NN would have quietly recruited far-away voters; radius-NN instead admits \"nobody comparable lives here\". Sometimes that honesty is a feature!", "tone": "wow" },
        { "max": 7.5, "text": "The circle finally reaches town and picks up voters — note the count varies with local density rather than being pinned at k.", "tone": "info" },
        { "max": 9, "text": "Huge r: half the town votes on a house nothing like theirs — the radius version of \"k too large\". Both knobs, r and k, tune the same thing: how local is \"local\".", "tone": "warn" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Radius neighbours (fixed-radius NN)", "formula": "voters = all points with distance ≤ r (count varies; can be zero)", "text": "k fixes the voter count and lets distance float; r fixes the distance and lets the count float. Density-adaptive but can come back empty — which doubles as a built-in \"out of distribution\" alarm." }
    }
  },
  {
    "q": "You min-max scale income to [0, 1] — but one customer is a billionaire, so the denominator is enormous. Ordinary income differences become…",
    "choices": [
      "A microscopic sliver near 0",
      "Spread evenly across [0, 1]",
      "Unchanged — scaling keeps ranks",
      "Centred around 0.5",
      "Negative for most rows"
    ],
    "explain": "Min-max divides by (max − min). With max = £2bn, ordinary incomes (£20k–£90k) all land within a hair of 0 — effectively erased. Robust scalers (median/IQR) resist this.",
    "simple": "Min-max divides by (max − min). If the max is a billionaire, ordinary income gaps become ~0.00004 — invisible. Scale with median and quartiles instead: they don't care how extreme the extremes are.",
    "widget": {
      "type": "scaleFeature",
      "title": "The billionaire in the denominator",
      "world": "Income was min-max scaled — but a billionaire set the ceiling, so normal gaps start microscopic. Drag LEFT to undo the squash.",
      "aName": "age",
      "bName": "income (billionaire-squashed)",
      "target": { "name": "Tess", "a": 33, "b": 0.4 },
      "cands": [
        { "name": "Mo · 34y, £43k", "a": 34, "b": 0.6 },
        { "name": "Cy · 61y, £41.5k", "a": 61, "b": 0.45 },
        { "name": "Fern · 35y, £75k", "a": 35, "b": 3.8 },
        { "name": "Dot · 30y, £58k", "a": 30, "b": 2.1 }
      ],
      "knob": { "label": "Squash income differences by", "min": 0, "max": 4, "step": 0.25, "init": 4 },
      "insights": [
        { "max": 0.75, "text": "Income restored to a sensible scale: Mo (similar age AND income) is the match. This is what a robust scaler — median and IQR instead of min and max — would have produced directly.", "tone": "info" },
        { "max": 2.75, "text": "Partially squashed: income still whispers. Note the ranking churn as you drag — the entire similarity structure hinges on one extreme individual in the denominator.", "tone": "warn" },
        { "max": 4, "text": "🤯 Fully squashed (what min-max + billionaire actually produced): 61-year-old Cy is \"most similar\" because ONLY age can speak — every normal income difference was crushed into a sliver near 0.", "tone": "wow" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Robust scaling", "formula": "x′ = (x − median) / IQR — quantiles ignore how extreme the extremes are", "text": "Min-max hands your scale to the most extreme point in the data. When outliers exist (they do), scale with medians and quartiles, or clip/winsorise before scaling." }
    }
  },
  {
    "q": "A sales forecaster scores 92% under random cross-validation but 61% once deployed. With time-ordered data, the classic culprit is…",
    "choices": [
      "Neighbours drawn from the future",
      "Concept drift after launch",
      "Validation folds too small",
      "k tuned on the test folds",
      "A missing rescale at deployment"
    ],
    "explain": "With time-ordered data, random splits are a séance: the model consults the future. Honest evaluation must train on the past and test on the future — like deployment will.",
    "simple": "Shuffled splits let the model answer Tuesday's question using data from Friday — consulting the future. A deployed model can never do that, hence 92% in the lab and 61% in real life. Train on the past, test on the future.",
    "widget": {
      "type": "foldPick",
      "title": "The fortune teller's exam",
      "world": "Five exam designs for one sales model. Four shuffle time randomly; the fifth trains on the past and tests on the future.",
      "blurb": "Same model — five different examination designs:",
      "folds": [
        { "name": "random split #1", "acc": 91 },
        { "name": "random split #2", "acc": 93 },
        { "name": "random split #3", "acc": 90 },
        { "name": "random split #4", "acc": 92 },
        { "name": "train past → test future", "acc": 61 }
      ],
      "knob": { "label": "Which exam design", "min": 1, "max": 6, "step": 1, "init": 1 },
      "insights": [
        { "max": 4, "text": "The random splits agree: ~92%, low variance, very reassuring. All four share the same flaw: when predicting a Tuesday, the neighbours could include the following Friday.", "tone": "warn" },
        { "max": 5, "text": "🤯 The forward-in-time exam: 61%. Not \"one unlucky fold\" — it's the only design where the model can't consult days that hadn't happened yet. It disagrees with the other four because THEY were cheating.", "tone": "wow" },
        { "max": 6, "text": "The average launders four cheating exams with one honest one — worse than useless. With time series, don't average designs: use walk-forward validation, full stop.", "tone": "warn" }
      ],
      "extreme": { "at": 5 },
      "reveal": { "name": "Temporal leakage & walk-forward validation", "formula": "time data → train on [t₀, t], test on (t, t+Δ] — never shuffle across time", "text": "A deployed model only ever knows the past. Any evaluation that lets neighbours arrive from the future measures a fantasy. This bites KNN especially hard: neighbours are literal rows, so future rows = open cheating." }
    }
  },
  {
    "q": "Four classes, k = 7, and the vote comes back 3–2–1–1. Standard KNN predicts…",
    "choices": [
      "The 3-vote class",
      "Nothing — no majority exists",
      "A four-way tie",
      "The single nearest point's class",
      "A fresh vote at k = 8"
    ],
    "explain": "KNN uses plurality: the biggest vote count wins, majority or not. With many classes, outright majorities get rare — and near-ties get common, so vote margins deserve attention.",
    "simple": "The biggest pile of votes wins even if it's under half — 3 beats 2, 1 and 1. That's plurality. But a 3-of-7 winner is a shaky answer, so report the split, not just the name.",
    "widget": {
      "type": "scatterK",
      "title": "Winning without a majority",
      "world": "Watch the winning MARGIN, not just the winner. A 5–4 and a 9–0 print the same label — are they the same answer?",
      "classes": [
        "Northern",
        "Southern"
      ],
      "xlab": "vowel length",
      "ylab": "speech rate",
      "points": [
        { "x": 2.2, "y": 2.8, "c": 0 },
        { "x": 3.4, "y": 2, "c": 0 },
        { "x": 2.6, "y": 4.4, "c": 0 },
        { "x": 4.2, "y": 3.6, "c": 0 },
        { "x": 3, "y": 5.8, "c": 0 },
        { "x": 5.8, "y": 5.2, "c": 1 },
        { "x": 7, "y": 6.4, "c": 1 },
        { "x": 6.2, "y": 7.8, "c": 1 },
        { "x": 7.8, "y": 5.6, "c": 1 },
        { "x": 8.2, "y": 7.2, "c": 1 }
      ],
      "query": { "x": 4.9, "y": 4.7 },
      "knob": { "label": "Neighbours asked (k)", "min": 1, "max": 9, "step": 1, "init": 7 },
      "insights": [
        { "max": 3, "text": "Small juries produce lopsided counts. Note the verdict needs only MORE votes than the runner-up — that's plurality, not majority.", "tone": "info" },
        { "max": 6, "text": "Mid-range k: the count here runs close (3–2, 4–2…). Now imagine 4 classes splitting 7 votes: 3–2–1–1 crowns a winner with under half the votes.", "tone": "info" },
        { "max": 9, "text": "🤯 A 5–4 verdict and a 9–0 verdict print the same label but are utterly different answers. With multiple classes, margins shrink further — report the vote split, not just the winner.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Plurality voting (multi-class KNN)", "formula": "prediction = argmax over classes of vote count — no majority required", "text": "More classes = thinner margins = more near-ties (odd k no longer saves you). Distance weighting and vote-fraction confidence go from nice-to-have to essential." }
    }
  },
  {
    "q": "On binary feature vectors (every feature 0 or 1), Manhattan distance is exactly the same thing as…",
    "choices": [
      "Hamming distance",
      "Euclidean distance",
      "Cosine similarity",
      "Jaccard distance",
      "The dot product"
    ],
    "explain": "For 0/1 values, |a−b| is 1 exactly when the bits differ, 0 otherwise. Summing gives the count of differing positions — the definition of Hamming distance.",
    "simple": "For 0/1 answers, the gap |a − b| is 1 exactly when the two disagree. Add the gaps and you have literally counted the disagreements. That count has a name: Hamming distance.",
    "widget": {
      "type": "metricMorph",
      "title": "Counting the disagreements",
      "world": "Each unit step = one question the two users answered differently (3 across, 2 up). One end of this slider simply counts them correctly.",
      "a": { "x": 2, "y": 3 },
      "aName": "User A",
      "b": { "x": 5, "y": 5 },
      "bName": "User B",
      "unit": "differing answers",
      "knob": { "label": "How distance is measured", "min": 1, "max": 2, "step": 0.05, "init": 2 },
      "insights": [
        { "max": 1.05, "text": "🤯 City-block reads exactly 5 — the true count of differing answers (3 + 2). On binary data, Manhattan IS the disagreement-counter. It has a special name here: Hamming distance.", "tone": "wow" },
        { "max": 1.9, "text": "In between: fractional \"distances\" like 4.1 disagreements — meaningless for yes/no data. A metric must fit the TYPE of the data, not just its scale.", "tone": "warn" },
        { "max": 2, "text": "Euclidean: √13 ≈ 3.6 \"disagreements\" — a number with no interpretation for binary answers. Geometrically fine, semantically broken.", "tone": "info" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Hamming distance", "formula": "binary vectors: L1(a, b) = # of positions where a ≠ b = Hamming(a, b)", "text": "Metrics carry meaning, not just numbers. Binary/one-hot data → Hamming (= L1). Counts → often L1. Continuous, scaled → L2. Profiles/text → cosine. Choose by data type first." }
    }
  },
  {
    "q": "Set k = 1 and colour the map by prediction. The decision regions form a famous geometric structure:",
    "choices": [
      "A Voronoi diagram",
      "An axis-aligned grid",
      "Concentric distance bands",
      "A minimum spanning tree",
      "Convex hulls per class"
    ],
    "explain": "With one voter, space belongs to whoever is closest: each training point gets a polygonal cell (all locations nearer to it than to anyone else). The class map is those cells, coloured by label.",
    "simple": "With one voter, each training point owns the region where it is the closest — space carves into polygons, one per point, with edges exactly halfway between neighbours. That tiling is a Voronoi diagram.",
    "widget": {
      "type": "boundaryK",
      "title": "The mosaic underneath",
      "world": "At k = 1 the map is secretly a tiling: every beacon owns a polygon of 'my turf'. Study the straight edges — then dissolve them.",
      "classes": [
        "Router East",
        "Router West"
      ],
      "xlab": "building x",
      "ylab": "building y",
      "points": [
        { "x": 1.2, "y": 2.2, "c": 0 },
        { "x": 3, "y": 1.4, "c": 0 },
        { "x": 2.2, "y": 4.6, "c": 0 },
        { "x": 4.4, "y": 3.8, "c": 0 },
        { "x": 1.6, "y": 7, "c": 0 },
        { "x": 3.8, "y": 6.4, "c": 0 },
        { "x": 5.2, "y": 8.6, "c": 0 },
        { "x": 6, "y": 1.8, "c": 1 },
        { "x": 7.4, "y": 3.2, "c": 1 },
        { "x": 8.6, "y": 1.2, "c": 1 },
        { "x": 6.8, "y": 5.4, "c": 1 },
        { "x": 8.2, "y": 6.8, "c": 1 },
        { "x": 9.2, "y": 4.4, "c": 1 },
        { "x": 7.8, "y": 8.8, "c": 1 }
      ],
      "knob": { "label": "Neighbours per prediction (k)", "min": 1, "max": 13, "step": 2, "init": 1 },
      "insights": [
        { "max": 1, "text": "🤯 Look closely at the borders: straight segments meeting at corners. Each segment is the exact halfway line between two beacons — the perpendicular bisector. Space has been carved into \"closest-to-me\" polygons.", "tone": "wow" },
        { "max": 7, "text": "With more voters, borders stop being single bisectors and become blends of many — the crisp polygon edges soften.", "tone": "info" },
        { "max": 13, "text": "The mosaic is gone entirely. But underneath every 1-NN system you'll ever meet — including \"nearest store\" maps — that same polygon tiling is doing the work.", "tone": "info" }
      ],
      "extreme": { "at": "min" },
      "reveal": {
        "name": "Voronoi tessellation",
        "formula": "cell(pᵢ) = { x : dist(x, pᵢ) ≤ dist(x, pⱼ) for all j } — 1-NN regions",
        "text": "The 1-NN decision boundary is piecewise-linear: a union of Voronoi cell edges. Voronoi diagrams appear everywhere from cell-tower coverage to soap bubbles — 1-NN is their machine-learning incarnation."
      }
    }
  },
  {
    "q": "Beyond classification entirely: the distance to a point's kth nearest neighbour is widely used as…",
    "choices": [
      "An anomaly score",
      "A class-purity proxy",
      "A boundary-leverage score",
      "A lower bound on test error",
      "A class-balance measure"
    ],
    "explain": "Normal points live in crowds (small kth-neighbour distance); anomalies are far even from their closest peers. That single number is a classic outlier detector.",
    "simple": "Normal points have close neighbours; weird points are far even from their nearest. So 'distance to your kth neighbour' doubles as a weirdness score — the bigger it is, the more likely an outlier.",
    "widget": {
      "type": "scatterK",
      "title": "The loneliness detector",
      "world": "A login lands far from every previous session. Forget the vote — read the DISTANCES on the lines. They're about to become a security feature.",
      "classes": [
        "Office login",
        "Home login"
      ],
      "xlab": "login hour",
      "ylab": "data volume",
      "showDists": true,
      "points": [
        { "x": 1.6, "y": 7.6, "c": 0 },
        { "x": 2.8, "y": 8.4, "c": 0 },
        { "x": 2.2, "y": 6.4, "c": 0 },
        { "x": 3.4, "y": 7.8, "c": 0 },
        { "x": 1.2, "y": 8.8, "c": 0 },
        { "x": 3.2, "y": 5.6, "c": 1 },
        { "x": 4.4, "y": 6.8, "c": 1 },
        { "x": 4, "y": 8.6, "c": 1 },
        { "x": 5, "y": 7.4, "c": 1 },
        { "x": 4.6, "y": 5.4, "c": 1 }
      ],
      "query": { "x": 8.6, "y": 1.4 },
      "knob": { "label": "Which neighbour's distance to read (k)", "min": 1, "max": 10, "step": 1, "init": 1 },
      "insights": [
        { "max": 3, "text": "Even this login's NEAREST neighbour is ~7 units away — while every normal login has a twin within ~1.5. That gap is the anomaly signal, no labels needed.", "tone": "info" },
        { "max": 7, "text": "Reading the kth-nearest distance (rather than the 1st) makes the score robust: a lucky single close point can't hide an outlier from k = 5.", "tone": "info" },
        { "max": 10, "text": "🤯 You've turned KNN inside out: instead of asking the neighbours to VOTE, you measured how far away the neighbourhood IS. Same machinery, brand-new job: anomaly detection.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "kNN-distance anomaly detection", "formula": "anomaly score(x) = distance to x's kth nearest neighbour", "text": "Big kth-neighbour distance = far from every crowd = suspicious. This underpins classic outlier detectors (kNN-outlier, LOF) — and doubles as the \"too far to trust the vote\" alarm from earlier levels." }
    }
  },
  {
    "q": "Brute-force KNN with n stored points and d features. The cost of ONE prediction scales as…",
    "choices": [
      "O(n · d)",
      "O(k)",
      "O(log n)",
      "O(n + d)",
      "O(d²)"
    ],
    "explain": "Each of the n stored points needs a distance: d subtractions/squares each. Both dataset size AND feature count multiply into every single query.",
    "simple": "One prediction = n stored points × d numbers each = n·d operations. Two levers to cheapen it: store fewer points, or use fewer dimensions. Serious systems pull both.",
    "widget": {
      "type": "speedLazy",
      "title": "The bill has two factors",
      "world": "Each stored image is 512 numbers, so ONE distance check = 512 operations. The knob scales n; every bar unit is 512 wide.",
      "itemName": "images",
      "storeLabel": "Image library (×512 numbers each)",
      "knobMax": 50000,
      "knob": { "label": "Stored images (n)", "min": 1000, "max": 50000, "step": 1000, "init": 5000 },
      "insights": [
        { "max": 12000, "text": "The bar counts distance checks (n) — but the REAL operation count is n × 512. Two dials multiply: double either one, double the bill.", "tone": "info" },
        { "max": 35000, "text": "Compare cures: halving d (feature selection, PCA) cuts the true cost exactly as much as halving n (condensing). The formula tells you both levers exist.", "tone": "info" },
        { "max": 50000, "text": "🤯 50,000 checks × 512 numbers = 25.6 MILLION multiply-adds for ONE query. n·d is why real vector search always ships with dimensionality reduction AND an index — attack both factors.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "O(n·d) query complexity", "formula": "one brute-force query = n distance computations × d operations each", "text": "Complexity analysis isn't academic here — it's the menu of remedies: shrink n (condense, index), shrink d (select, project), or approximate. Every production KNN system does at least two." }
    }
  },
  {
    "q": "On a brand-new classification problem, experienced practitioners run KNN before building anything fancy. Its job is to serve as…",
    "choices": [
      "The baseline to beat",
      "A feature selector",
      "A data cleaner",
      "A label auditor",
      "A speed benchmark"
    ],
    "explain": "KNN needs no training, assumes almost nothing, and captures any smooth boundary given decent features. It sets the bar: a complex model that can't clear it is complexity for nothing.",
    "simple": "KNN takes minutes to set up, assumes almost nothing, and handles curvy patterns. If a week of fancy modelling can't beat it, the fancy model isn't earning its keep. Run the cheap thing first — it keeps everyone honest.",
    "widget": {
      "type": "boundaryK",
      "title": "The bar to clear",
      "world": "A new dataset, zero training, one hyperparameter — and you already have a working map. Anything built later must beat this.",
      "classes": [
        "Upgrades",
        "Cancels"
      ],
      "xlab": "usage hours",
      "ylab": "support tickets",
      "points": [
        { "x": 1.4, "y": 2, "c": 0 },
        { "x": 2.8, "y": 1.4, "c": 0 },
        { "x": 2, "y": 3.8, "c": 0 },
        { "x": 3.6, "y": 3, "c": 0 },
        { "x": 4.6, "y": 1.8, "c": 0 },
        { "x": 3, "y": 5.4, "c": 0 },
        { "x": 5, "y": 4.4, "c": 0 },
        { "x": 4.2, "y": 6.6, "c": 1 },
        { "x": 5.8, "y": 6, "c": 1 },
        { "x": 6.8, "y": 4.8, "c": 1 },
        { "x": 6.2, "y": 7.6, "c": 1 },
        { "x": 7.6, "y": 6.4, "c": 1 },
        { "x": 8.4, "y": 8, "c": 1 },
        { "x": 8.8, "y": 5.2, "c": 1 }
      ],
      "knob": { "label": "Neighbours per prediction (k)", "min": 1, "max": 13, "step": 2, "init": 5 },
      "insights": [
        { "max": 3, "text": "Thirty seconds of \"work\" and the structure of the problem is already visible — including the curvy border region where the hard cases live.", "tone": "info" },
        { "max": 9, "text": "A couple of knob positions in, you know roughly what accuracy is achievable and where the difficulty is. That's reconnaissance no architecture diagram gives you.", "tone": "info" },
        { "max": 13, "text": "🤯 Suppose a week-long deep-learning effort scores 2 points BELOW this free map — it happens constantly. Without the baseline you'd never know. \"Beat KNN first\" is cheap insurance against expensive nonsense.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "The baseline discipline", "formula": "value(fancy model) = score(fancy) − score(strong simple baseline)", "text": "A model's worth is measured relative to the simplest thing that works. KNN (and majority-class) baselines take minutes and keep everyone honest — run them first, always." }
    }
  },
  {
    "q": "Weights = 1/distance. The neighbours: A at distance 1; B at distance 2; B at distance 4. Who wins, and on what totals?",
    "choices": [
      "A — 1.0 beats 0.75",
      "B — 2 voters beat 1",
      "A tie — 1.0 versus 1.0",
      "B — more total distance",
      "A — ties favour the closest"
    ],
    "explain": "Weights: A = 1/1 = 1.0; B = 1/2 + 1/4 = 0.75. A wins despite being outnumbered 2 to 1 — closeness converted to influence.",
    "simple": "Work it out: A gets 1/1 = 1.0. B gets 1/2 + 1/4 = 0.75. Biggest total wins, so A — despite being outnumbered two-to-one. Closeness was converted into influence.",
    "widget": {
      "type": "voteWeight",
      "title": "Do the arithmetic with your thumb",
      "world": "The exact neighbours from the question: A at distance 1; B at 2 and 4. Slide to p = 1 and watch the bars do the arithmetic.",
      "classes": [
        "Class A",
        "Class B"
      ],
      "neighbors": [
        { "name": "A · dist 1", "d": 1, "c": 0 },
        { "name": "B · dist 2", "d": 2, "c": 1 },
        { "name": "B · dist 4", "d": 4, "c": 1 }
      ],
      "knob": { "label": "Weight exponent p (1/dᵖ)", "min": 0, "max": 4, "step": 0.1, "init": 0 },
      "insights": [
        { "max": 0.05, "text": "p = 0: headcount rules, B wins 2–1. Now slide to exactly p = 1 — the question's setting.", "tone": "info" },
        { "max": 1.2, "text": "🤯 At p = 1: A's bar = 1.0; B's bar = 0.5 + 0.25 = 0.75. The flip happened — one close voter outweighs two distant ones. This is the exam answer, computed by your thumb.", "tone": "wow" },
        { "max": 4, "text": "Push further and A's dominance only grows (1 vs 0.31 at p = 2). Once weights enter, \"how many neighbours\" matters far less than \"how close\".", "tone": "info" }
      ],
      "extreme": { "at": 1 },
      "reveal": { "name": "Weighted vote arithmetic", "formula": "A: 1/1 = 1.0 · B: 1/2 + 1/4 = 0.75 → A wins", "text": "Weighted KNN is just this sum, per class, biggest total wins. Being able to hand-compute one vote means you truly own the algorithm." }
    }
  },
  {
    "q": "Unweighted KNN regression with k = 3. The three nearest freelancers charged £10, £20 and £60 per hour. The predicted rate is…",
    "choices": [
      "£30",
      "£20",
      "£26.70",
      "£15",
      "£45"
    ],
    "explain": "(10 + 20 + 60) / 3 = £30/h. Note the £60 outlier dragged the mean above both other values — the median (£20) would have resisted it.",
    "simple": "Plain average: (10 + 20 + 60) ÷ 3 = 30. Notice the £60 outlier dragged the answer above two of the three values — means chase outliers. (A median would have said 20 and shrugged.)",
    "widget": {
      "type": "knnRegress",
      "title": "Quote me a rate",
      "world": "Your gig sits at the dashed line; its 3 nearest comparables charged £10, £20 and £60. Set k = 3 and check the quote by hand.",
      "xlab": "project size",
      "ylab": "rate (£/h)",
      "itemName": "projects",
      "prefix": "£",
      "unit": "/h",
      "decimals": 0,
      "points": [
        { "x": 1, "y": 14 },
        { "x": 1.8, "y": 18 },
        { "x": 2.6, "y": 16 },
        { "x": 4.7, "y": 10 },
        { "x": 5.3, "y": 20 },
        { "x": 5.6, "y": 60 },
        { "x": 7.4, "y": 28 },
        { "x": 8.2, "y": 26 },
        { "x": 9, "y": 32 },
        { "x": 3.4, "y": 15 },
        { "x": 9.6, "y": 35 },
        { "x": 0.4, "y": 12 }
      ],
      "qx": 5,
      "knob": { "label": "Comparable projects averaged (k)", "min": 1, "max": 12, "step": 1, "init": 1 },
      "insights": [
        { "max": 1, "text": "k = 1: quote = £10/h, the single nearest project. One comparable, zero protection.", "tone": "info" },
        { "max": 3, "text": "🤯 k = 3: (10 + 20 + 60) / 3 = £30/h — check the readout. Also notice: £30 is HIGHER than 2 of the 3 comparables, because the £60 agency dragged the mean up. Means chase outliers.", "tone": "wow" },
        { "max": 12, "text": "Larger k dilutes the agency's pull but starts averaging in projects nothing like yours. (The robust alternative at k = 3: take the MEDIAN — £20 — which shrugs at the outlier.)", "tone": "info" }
      ],
      "extreme": { "at": 3 },
      "reveal": { "name": "KNN regression arithmetic (mean vs median)", "formula": "ŷ = (10 + 20 + 60)/3 = 30 · median alternative = 20", "text": "The combiner is a choice: mean is standard but outlier-sensitive; median is robust. Being able to compute both by hand tells you exactly what you're trading." }
    }
  },
  {
    "q": "To keep neighbourhoods 'local' (covering ~10% of each feature's range), how must the training data grow per added dimension?",
    "choices": [
      "Exponentially",
      "Linearly",
      "Quadratically",
      "Logarithmically",
      "It needn't grow"
    ],
    "explain": "A box covering 10% of each of d axes contains (0.1)^d of the space: 1 dimension needs ~10 points for coverage, 6 dimensions ~10⁶. Local neighbourhoods starve exponentially fast.",
    "simple": "A neighbourhood covering 10% of each feature covers 0.1 × 0.1 × … of the space — a share that shrinks exponentially with every dimension. No one can collect data that fast; shrink the dimensions instead.",
    "widget": {
      "type": "dimCurse",
      "title": "The starving neighbourhood",
      "world": "Ten shoppers must fill every space the knob creates. Each added fact multiplies the space to fill; the population stays ten.",
      "itemName": "shopper",
      "n": 10,
      "seed": 77,
      "knob": { "label": "Facts (dimensions) compared", "min": 1, "max": 64, "step": 1, "init": 1 },
      "insights": [
        { "max": 3, "text": "In 1–3 dimensions, 10 shoppers are plenty: some are genuinely close. The neighbourhood is well fed.", "tone": "info" },
        { "max": 20, "text": "Each added dimension multiplies the space to fill while the population stays 10. Closeness is being diluted exponentially, and the bars show it.", "tone": "warn" },
        { "max": 64, "text": "🤯 At 64 dimensions you'd need astronomically many shoppers for anyone to be truly \"nearby\" — with 10, everyone is equally remote. To use KNN here you must shrink the space (select/project), because you can NEVER collect (0.1)⁻⁶⁴ people.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Exponential sample complexity", "formula": "covering 10% per axis in d dims → need ~10ᵈ points", "text": "The curse, restated as a bill: local methods need data exponential in dimension. Since data never grows that fast, the practical fix is always to reduce d, not to increase n." }
    }
  },
  {
    "q": "Metric learning (Mahalanobis, LMNN, NCA) improves KNN not by tuning k, but by learning to…",
    "choices": [
      "Reshape the space itself",
      "Pick a different k per region",
      "Pick a preset metric per query",
      "Reweight the training labels",
      "Grow a tree over the metrics"
    ],
    "explain": "Instead of hand-picking Euclidean vs Manhattan, metric learning fits the ruler itself: directions that separate classes get amplified, irrelevant directions get squashed. KNN then runs in the improved geometry.",
    "simple": "Instead of you hand-picking Euclidean vs Manhattan, an algorithm learns to stretch and rotate the space so that same-class points land near each other. Then ordinary KNN runs inside the improved geometry.",
    "widget": {
      "type": "metricSwitch",
      "title": "Fitting the ruler itself",
      "world": "You've seen the ruler flip verdicts. Now imagine not choosing it by hand — letting the DATA pull same-class points together.",
      "classes": [
        "Legitimate",
        "Intrusion"
      ],
      "xlab": "typing speed",
      "ylab": "commands per min",
      "queryLabel": "new session",
      "points": [
        { "x": 6, "y": 6, "c": 0, "name": "usual session" },
        { "x": 7.5, "y": 3, "c": 1, "name": "known intrusion" },
        { "x": 8.5, "y": 8.5, "c": 0, "name": "late-night session" },
        { "x": 1, "y": 7.5, "c": 1, "name": "bot probe" }
      ],
      "query": { "x": 3, "y": 3 },
      "knob": { "label": "The ruler (city-block → straight-line)", "min": 1, "max": 2, "step": 0.05, "init": 1 },
      "insights": [
        { "max": 1.05, "text": "City-block ruler: the known intrusion is \"nearest\" — verdict: intrusion. But is this ruler RIGHT for login behaviour? Nobody checked.", "tone": "warn" },
        { "max": 1.85, "text": "The verdict flips along this slider — proof that the ruler is a free parameter. So far you've tuned it by hand between two presets. Presets are not the ceiling.", "tone": "info" },
        { "max": 2, "text": "🤯 The generalisation: let an algorithm LEARN the ruler — stretch axes that distinguish intruders, shrink axes that don't, even rotate. Same KNN afterwards, but running in a space engineered so that \"close\" MEANS \"same class\".", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Metric learning (Mahalanobis, LMNN, NCA)", "formula": "d(x, y) = √((x−y)ᵀ M (x−y)) — learn the matrix M from labels", "text": "The endpoint of everything this course said about scaling, weighting and metric choice: make the DATA pick the geometry. Modern face recognition is exactly this — deep embeddings + cosine KNN." }
    }
  },
  {
    "q": "1-NN reaches zero training error on ANY dataset — even one with purely random labels. The lesson: its training error…",
    "choices": [
      "Carries no information",
      "Proves model quality",
      "Bounds the test error",
      "Reveals the noise rate",
      "Shows k is optimal"
    ],
    "explain": "A model that can fit ANYTHING — including nonsense — gets no credit for fitting your data. High capacity makes training scores meaningless; generalisation must be measured out-of-sample.",
    "simple": "1-NN can 'fit' anything perfectly — even pure nonsense — because every training point is its own nearest neighbour. A model that can ace nonsense earns no credit for acing your data. Judge it only on unseen data.",
    "widget": {
      "type": "trainTestK",
      "title": "The model that can memorise anything",
      "world": "Two of these training labels are pure noise. Watch 1-NN 'achieve' perfection on the left bar — then ask the right bar what it was worth.",
      "classes": [
        "Pass",
        "Fail"
      ],
      "xlab": "hours studied",
      "ylab": "lectures attended",
      "train": [
        { "x": 2, "y": 2.6, "c": 1 },
        { "x": 3, "y": 1.6, "c": 1 },
        { "x": 1.4, "y": 4, "c": 1 },
        { "x": 2.6, "y": 3.4, "c": 1 },
        { "x": 3.8, "y": 2.4, "c": 1 },
        { "x": 2.4, "y": 4.8, "c": 0 },
        { "x": 4.2, "y": 4.2, "c": 1 },
        { "x": 3.2, "y": 5.6, "c": 1 },
        { "x": 7, "y": 7, "c": 0 },
        { "x": 8.2, "y": 6, "c": 0 },
        { "x": 6.4, "y": 8.2, "c": 0 },
        { "x": 8.8, "y": 7.6, "c": 0 },
        { "x": 7.6, "y": 6.6, "c": 1 },
        { "x": 6, "y": 6.2, "c": 0 },
        { "x": 5.4, "y": 5, "c": 0 },
        { "x": 6.8, "y": 5.6, "c": 0 }
      ],
      "test": [
        { "x": 2.2, "y": 4.4, "c": 1 },
        { "x": 3, "y": 2.8, "c": 1 },
        { "x": 1.8, "y": 3.2, "c": 1 },
        { "x": 3.6, "y": 4.8, "c": 1 },
        { "x": 2.8, "y": 5.2, "c": 1 },
        { "x": 7.2, "y": 6.2, "c": 0 },
        { "x": 6.2, "y": 7, "c": 0 },
        { "x": 8, "y": 8, "c": 0 },
        { "x": 5.8, "y": 5.6, "c": 0 },
        { "x": 7.8, "y": 5.4, "c": 0 }
      ],
      "knob": { "label": "Neighbours asked (k)", "min": 1, "max": 9, "step": 2, "init": 1 },
      "insights": [
        { "max": 1, "text": "🤯 100% on seen data — including the two nonsense labels, faithfully memorised. A model that can fit noise perfectly earns ZERO credit for a perfect training score.", "tone": "wow" },
        { "max": 5, "text": "Raising k forces the model to stop honouring individual (possibly nonsense) labels — training score drops, new-student score climbs. Capacity is being spent more wisely.", "tone": "info" },
        { "max": 9, "text": "The principle: the more a model CAN memorise, the less its training performance MEANS. Judge high-capacity models (1-NN, deep nets) only on data they've never seen.", "tone": "info" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Capacity and the worthlessness of training error", "formula": "1-NN training error ≡ 0 for any labelling → measure generalisation out-of-sample", "text": "This tiny observation about 1-NN foreshadows the central puzzle of deep learning: models that can interpolate anything, judged only by held-out performance." }
    }
  },
  {
    "q": "'Use odd k' exists purely to dodge tied votes. Why does that rule retire the moment votes become distance-weighted?",
    "choices": [
      "Real-number totals almost never tie",
      "Weights force odd k internally",
      "The weights normalise to one",
      "Ties now flip to the closest anyway",
      "The class totals converge"
    ],
    "explain": "A 2–2 headcount tie is common; 1/0.83 + 1/2.9 exactly equalling 1/1.4 + 1/2.2 is a measure-zero coincidence. Continuous weights dissolve the tie problem that odd k existed to solve.",
    "simple": "Headcounts tie easily: 2–2. Sums of messy decimals like 1.25 vs 0.83 + 0.41 essentially never land EXACTLY equal. Once votes carry weights, ties stop existing — and the 'use odd k' rule retires.",
    "widget": {
      "type": "voteWeight",
      "title": "The tie that can't survive",
      "world": "A perfect 2–2 deadlock — but all four distances differ. Nudge the knob just off zero and watch the tie dissolve.",
      "classes": [
        "Genuine",
        "Forgery"
      ],
      "neighbors": [
        { "name": "close genuine", "d": 0.8, "c": 0 },
        { "name": "mid genuine", "d": 1.2, "c": 0 },
        { "name": "close forgery", "d": 1, "c": 1 },
        { "name": "far forgery", "d": 1.5, "c": 1 }
      ],
      "knob": { "label": "Weight exponent p (1/dᵖ)", "min": 0, "max": 4, "step": 0.1, "init": 0 },
      "insights": [
        { "max": 0.05, "text": "p = 0: a perfect 2–2 tie. Under plain voting this needs an arbitrary tie-break rule — exactly why \"use odd k\" became folklore.", "tone": "warn" },
        { "max": 0.5, "text": "🤯 One tick of weight and the deadlock is GONE — 50.0% vs 50.0% became 51-something vs 48-something. Real-valued totals essentially never collide exactly.", "tone": "wow" },
        { "max": 4, "text": "Any p > 0 keeps it tie-free, and higher p just widens the margin. The odd-k rule was a patch for counting; weights fix the disease instead of the symptom.", "tone": "info" }
      ],
      "extreme": { "at": 0.3 },
      "reveal": { "name": "Weights dissolve ties", "formula": "P(Σ 1/dᵖ ties exactly) ≈ 0 for continuous distances", "text": "Design lesson: replacing discrete counts with continuous scores removes whole categories of edge cases. \"Odd k\" survives as folklore; weighted voting is why practitioners stopped worrying." }
    }
  },
  {
    "q": "You multiply one feature by w before computing any distances. In effect, you have just declared that feature…",
    "choices": [
      "w times more important",
      "w times noisier",
      "w times better scaled",
      "Fully standardised",
      "Duplicated w times"
    ],
    "explain": "Distance treats one unit of every feature equally, so rescaling a feature by w rescales its influence by w (w² in squared terms). Scaling isn't just cleanup — it's an importance dial.",
    "simple": "Multiply a feature by 3 and its gaps count 3× in every distance — you've just declared it 3× more important. All scaling is secretly importance-setting; better to set it on purpose.",
    "widget": {
      "type": "scaleFeature",
      "title": "Importance is a number you choose",
      "world": "The site believes rating matters more than openings. That belief is just a multiplier on one axis. Turn the belief up and down.",
      "aName": "opening overlap",
      "bName": "rating gap (weighted)",
      "target": { "name": "you", "a": 6, "b": 1500 },
      "cands": [
        { "name": "Ari · rating twin, diff openings", "a": 1, "b": 1520 },
        { "name": "Bea · similar all round", "a": 5, "b": 1580 },
        { "name": "Cal · same openings, weaker", "a": 6.5, "b": 1150 },
        { "name": "Dee · close rating, some overlap", "a": 4, "b": 1560 }
      ],
      "knob": { "label": "Shrink rating's weight by", "min": 0, "max": 4, "step": 0.25, "init": 0 },
      "insights": [
        { "max": 0.5, "text": "Rating dominating: Ari — who plays completely different openings — is your \"ideal partner\" because the ratings match. The designers' weighting made this choice, not the data.", "tone": "info" },
        { "max": 2.5, "text": "Equal-ish importance: Bea (decent on both axes) takes the lead. Every position of this knob is a different THEORY of what makes players similar.", "tone": "info" },
        { "max": 4, "text": "🤯 Openings-only: now Cal, 350 points weaker, is \"most similar\". None of these rankings is wrong — each encodes a different importance judgement. Someone always chooses the weights; the question is whether they choose consciously.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Weighted distance (feature importance)", "formula": "d(x,y)² = Σ wᵢ² (xᵢ − yᵢ)² — scaling IS weighting", "text": "Standardisation sets all weights equal; domain knowledge (or metric learning, H24) sets them better. Every preprocessing choice you've made in this course was secretly an importance decision." }
    }
  },
  {
    "q": "'Users like you also bought…' — strip away the business language, and that recommender is running…",
    "choices": [
      "KNN over users",
      "K-means clustering",
      "Logistic regression",
      "Market-basket rules",
      "A popularity chart"
    ],
    "explain": "User-based collaborative filtering IS KNN: distance = dissimilarity of rating/purchase histories, neighbours = look-alike users, prediction = aggregate of their choices.",
    "simple": "'Users like you also bought…' means: find the k users whose taste is most like yours, and recommend what they liked. That is KNN wearing a business suit.",
    "widget": {
      "type": "scatterK",
      "title": "The algorithm behind \"customers also bought\"",
      "world": "'Users like you also bought…' — you're the ◆. The recommendation is nothing more than the vote you're about to run.",
      "classes": [
        "Loved the new show",
        "Dropped it"
      ],
      "xlab": "sci-fi hours",
      "ylab": "comedy hours",
      "points": [
        { "x": 6.6, "y": 2.4, "c": 0 },
        { "x": 7.8, "y": 3.2, "c": 0 },
        { "x": 7.2, "y": 1.4, "c": 0 },
        { "x": 8.6, "y": 2, "c": 0 },
        { "x": 6, "y": 3.8, "c": 0 },
        { "x": 2.4, "y": 7, "c": 1 },
        { "x": 3.6, "y": 8, "c": 1 },
        { "x": 1.6, "y": 6.2, "c": 1 },
        { "x": 2.8, "y": 8.8, "c": 1 },
        { "x": 4.2, "y": 6.6, "c": 1 }
      ],
      "query": { "x": 5.6, "y": 4.4 },
      "knob": { "label": "Look-alike users consulted (k)", "min": 1, "max": 10, "step": 1, "init": 3 },
      "insights": [
        { "max": 4, "text": "Your taste-neighbours mostly loved it → recommend. That sentence, plus a distance function over viewing histories, is user-based collaborative filtering. All of it.", "tone": "info" },
        { "max": 7, "text": "Real systems tweak the ingredients — cosine similarity on sparse rating vectors, weighted votes, millions of users via ANN search (H8) — but the skeleton is exactly this slider.", "tone": "info" },
        { "max": 10, "text": "🤯 At k = 10 you've rediscovered the recommender failure mode too: ask EVERYONE and you recommend whatever's merely popular. Every KNN lesson from this course maps straight onto a production recommender issue.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "User-based collaborative filtering = KNN", "formula": "recommend(you) = aggregate(choices of k most similar users)", "text": "KNN concepts run the modern web: taste-distance, neighbourhood size, popularity bias, ANN at scale. You now know the algorithm behind the \"For You\" tab." }
    }
  },
  {
    "q": "Dataset A has clean labels. Dataset B is the same task with many mislabeled points. Where should B's best-performing k sit, relative to A's?",
    "choices": [
      "Higher than A's",
      "Lower than A's",
      "Exactly at A's",
      "Pinned at k = 1",
      "At any even number"
    ],
    "explain": "Every mislabeled point is a saboteur in the jury pool. The dirtier the labels, the more honest voters you need per decision — the optimal k shifts right with noise.",
    "simple": "Every mislabeled point is a saboteur in the jury pool. The more saboteurs, the more honest jurors you need per decision — so noisier labels push the best k higher.",
    "widget": {
      "type": "kCurve",
      "title": "Dirty data demands bigger juries",
      "world": "FOUR of 16 labels are wrong — 25% noise. Sweep k: where does the purple curve finally recover, compared to cleaner datasets?",
      "kmax": 16,
      "train": [
        { "x": 2, "y": 2.6, "c": 0 },
        { "x": 3, "y": 1.6, "c": 0 },
        { "x": 1.4, "y": 4, "c": 0 },
        { "x": 2.6, "y": 3.4, "c": 1 },
        { "x": 3.8, "y": 2.4, "c": 0 },
        { "x": 2.4, "y": 4.8, "c": 1 },
        { "x": 4.2, "y": 4.2, "c": 0 },
        { "x": 3.2, "y": 5.6, "c": 0 },
        { "x": 7, "y": 7, "c": 1 },
        { "x": 8.2, "y": 6, "c": 1 },
        { "x": 6.4, "y": 8.2, "c": 1 },
        { "x": 8.8, "y": 7.6, "c": 1 },
        { "x": 7.6, "y": 6.6, "c": 0 },
        { "x": 6, "y": 6.2, "c": 1 },
        { "x": 5.4, "y": 5, "c": 1 },
        { "x": 7, "y": 8.8, "c": 0 }
      ],
      "val": [
        { "x": 2.2, "y": 4.4, "c": 0 },
        { "x": 3, "y": 2.8, "c": 0 },
        { "x": 1.8, "y": 3.2, "c": 0 },
        { "x": 3.6, "y": 4.8, "c": 0 },
        { "x": 2.8, "y": 5.2, "c": 0 },
        { "x": 7.2, "y": 6.2, "c": 1 },
        { "x": 6.2, "y": 7, "c": 1 },
        { "x": 8, "y": 8, "c": 1 },
        { "x": 5.8, "y": 5.6, "c": 1 },
        { "x": 7.8, "y": 5.4, "c": 1 }
      ],
      "knob": { "label": "Candidate k", "min": 1, "max": 16, "step": 1, "init": 1 },
      "insights": [
        { "max": 2, "text": "k = 1–2 on 25%-noisy labels: held-back score stuck around 70% — every fourth \"advisor\" is a saboteur, and tiny juries keep electing them.", "tone": "warn" },
        { "max": 5, "text": "k = 3–5: partial recovery (90%), but unlike the cleaner datasets, the peak hasn't arrived yet — the noise is still winning some local votes.", "tone": "info" },
        { "max": 15, "text": "🤯 Full recovery only at k ≈ 6+: it takes that many honest voters to reliably outvote four saboteurs. Rule of thumb confirmed by your own thumb: noisier labels → bigger optimal k.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Noise level sets the optimal k", "formula": "more label noise → optimal k shifts higher (more smoothing needed)", "text": "The right k isn't a property of KNN — it's a property of YOUR data's noise level. This is why no lookup table for k exists and why validation curves must be re-run per dataset." }
    }
  },
  {
    "q": "Order the production KNN pipeline correctly, start to finish.",
    "choices": [
      "Encode → scale → select → tune on CV → index",
      "Tune k first → scale → choose features",
      "Scale all data together → select → tune",
      "Select on full data → split → scale → tune",
      "Encode → scale → tune on training accuracy → index"
    ],
    "explain": "Foundations before tuning, tuning before serving: features must exist and be scaled before distances mean anything; hyperparameters are chosen on validation data; the index is a serving optimisation added last.",
    "simple": "Each step feeds the next: make features numeric → put them on one scale (fitted on training data only) → drop junk features → choose k, metric and weights by honest validation → bolt on a fast index for serving.",
    "widget": {
      "type": "kCurve",
      "title": "The final dress rehearsal",
      "world": "The finished pipeline's LAST step: choosing k on an honest validation curve. You've personally triggered every failure this system prevents.",
      "kmax": 16,
      "train": [
        { "x": 2, "y": 2.6, "c": 0 },
        { "x": 3, "y": 1.6, "c": 0 },
        { "x": 1.4, "y": 4, "c": 0 },
        { "x": 2.6, "y": 3.4, "c": 0 },
        { "x": 3.8, "y": 2.4, "c": 0 },
        { "x": 2.4, "y": 4.8, "c": 1 },
        { "x": 4.2, "y": 4.2, "c": 0 },
        { "x": 3.2, "y": 5.6, "c": 0 },
        { "x": 7, "y": 7, "c": 1 },
        { "x": 8.2, "y": 6, "c": 1 },
        { "x": 6.4, "y": 8.2, "c": 1 },
        { "x": 8.8, "y": 7.6, "c": 1 },
        { "x": 7.6, "y": 6.6, "c": 0 },
        { "x": 6, "y": 6.2, "c": 1 },
        { "x": 5.4, "y": 5, "c": 1 },
        { "x": 6.8, "y": 5.6, "c": 1 }
      ],
      "val": [
        { "x": 2.2, "y": 4.4, "c": 0 },
        { "x": 3, "y": 2.8, "c": 0 },
        { "x": 1.8, "y": 3.2, "c": 0 },
        { "x": 3.6, "y": 4.8, "c": 0 },
        { "x": 2.8, "y": 5.2, "c": 0 },
        { "x": 7.2, "y": 6.2, "c": 1 },
        { "x": 6.2, "y": 7, "c": 1 },
        { "x": 8, "y": 8, "c": 1 },
        { "x": 5.8, "y": 5.6, "c": 1 },
        { "x": 7.8, "y": 5.4, "c": 1 }
      ],
      "knob": { "label": "Final choice: k", "min": 1, "max": 16, "step": 1, "init": 1 },
      "insights": [
        { "max": 1, "text": "The gap at k = 1 (perfect blue, weaker purple): overfitting — you can now diagnose it on sight. Slide on.", "tone": "info" },
        { "max": 11, "text": "The plateau: pick k here, note the score you expect in production, and remember it was measured on data the model never saw. Scaling happened BEFORE this chart existed — it had to.", "tone": "info" },
        { "max": 16, "text": "🤯 And the cliff at k = n: the majority-class collapse where this course began. Foundations → practice → production: you've derived every piece of this system by dragging sliders. That's the whole topic.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": {
        "name": "The KNN production recipe",
        "formula": "encode → scale (train-fit) → select features → tune {k, metric, weights} on CV → serve via ANN index",
        "text": "Each stage exists because of a failure you've personally triggered: unscaled features, junk dimensions, k=1 memorisation, k=n collapse, slow queries. That's the deepest way to know an algorithm. Topic complete. 🎓"
      }
    }
  }
];
