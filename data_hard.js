/* KNN — Level 3: Advanced. 30 questions; choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).hard = [

/* H1 — distance concentration, quantified */
{
  q: 'In very high dimensions, the ratio (distance to farthest point) / (distance to nearest point) tends toward…',
  choices: [
    '1 — nearest and farthest become almost indistinguishable',
    'Infinity — the farthest point races away',
    '0 — the nearest point becomes infinitely closer',
    '2 — exactly double, in any dimension',
    'The number of dimensions, d'
  ],
  explain: 'Distances concentrate around their mean as dimensions grow: max/min → 1. When that ratio is ~1, ranking by distance carries almost no information.',
  widget: {
    type: 'dimCurse', title: 'The shrinking contrast',
    world: 'Ten warehouse items compared to a query item, one bar per item. The single number to stalk this time is in the box below: farthest ÷ nearest. Take it from a rich 3× down to nearly 1× and feel the information drain out.',
    itemName: 'item', n: 10, seed: 99,
    knob: { label: 'Dimensions compared', min: 1, max: 64, step: 1, init: 3 },
    insights: [
      { max: 5, text: 'Low dimensions: the ratio sits around 2–4×. "Nearest" is a strong, meaningful title — the ranking has contrast.', tone: 'info' },
      { max: 30, text: 'The ratio is sliding toward 1×. Note it never reaches exactly 1 — but every drop makes the top of the ranking more arbitrary.', tone: 'warn' },
      { max: 64, text: '🤯 ~1.2× and falling: swap the "nearest" for the 5th-nearest and barely anything changes. Any decision built on this ranking is built on noise.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Distance concentration', formula: 'as d → ∞ : Dmax / Dmin → 1 (for i.i.d. dimensions)',
      text: 'The precise form of the curse: it\'s not that distances get big, it\'s that they all become the SAME size. Contrast — not closeness — is what KNN eats.' }
  }
},

/* H2 — why spatial indexes die in high dimensions */
{
  q: 'k-d trees answer queries in ~log(n) time in 2-D but degrade toward brute-force O(n) in high dimensions. Why?',
  choices: [
    'Pruning depends on ruling out far-away regions — but when all distances are similar, almost no region can be safely ruled out',
    'The tree runs out of memory above 10 dimensions',
    'High-dimensional numbers are slower to subtract',
    'The tree can only split on two features total',
    'Log(n) stops being smaller than n in high dimensions'
  ],
  explain: 'Index speed comes from skipping regions that provably can\'t contain the nearest neighbour. Distance concentration destroys those proofs: every region might contain it, so the search visits nearly everything.',
  widget: {
    type: 'dimCurse', title: 'Nothing left to skip',
    world: 'An index skips a stored item when it can PROVE the item is farther than your current best candidate. That proof needs contrast — a clear gap between near and far. Watch the bars: whenever they\'re all similar lengths, imagine trying to rule any of them out without checking.',
    itemName: 'candidate', n: 10, seed: 31,
    knob: { label: 'Dimensions in the index', min: 2, max: 64, step: 1, init: 2 },
    insights: [
      { max: 6, text: 'Big contrast: most bars are FAR longer than the shortest. An index can dismiss those regions wholesale — that\'s where log(n) speed comes from.', tone: 'info' },
      { max: 30, text: 'The bars are converging. Fewer and fewer candidates can be provably dismissed, so the "smart" search quietly checks more and more of them.', tone: 'warn' },
      { max: 64, text: '🤯 Near-equal bars: to be SURE of the nearest, the index must inspect nearly everything — congratulations, you\'ve reinvented brute force. High-dimensional search is why approximate methods exist.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Index pruning fails under concentration', formula: 'no provable "can\'t-be-nearer" regions → visit ~n nodes',
      text: 'k-d/ball trees are only as fast as their ability to skip. Past ~15–20 effective dimensions, practitioners switch to approximate nearest-neighbour search (LSH, HNSW).' }
  }
},

/* H3 — irreducible error / overlapping classes */
{
  q: 'Two classes genuinely overlap: identical-looking points can carry either label. What\'s true of ANY classifier here, including well-tuned KNN?',
  choices: [
    'Some error is irreducible — no setting of k can score perfectly, and chasing 100% means fitting noise',
    'A large enough k will eventually reach 100% accuracy',
    'Only deep learning can reach 100% on overlapping classes',
    'KNN fails completely on overlap, scoring 0%',
    'Overlap can always be removed by scaling features'
  ],
  explain: 'Where the classes truly overlap, the best possible decision still loses on some points (Bayes error). A model scoring 100% on such training data is memorising coin flips.',
  widget: {
    type: 'boundaryK', title: 'The honest ceiling',
    world: 'Two bird species whose sizes genuinely overlap — in the middle band, near-identical measurements occur with BOTH labels. Try every k and attempt to find a map that gets everyone right. Notice what happens in the overlap zone at small k: is that "skill"?',
    classes: ['Species A', 'Species B'], xlab: 'wing length', ylab: 'body mass',
    points: [{x:1.5,y:3,c:0},{x:2.5,y:5,c:0},{x:2,y:7,c:0},{x:3.5,y:2.5,c:0},{x:3,y:6.5,c:0},{x:4.5,y:5.5,c:0},{x:5,y:3.5,c:1},{x:4.8,y:7.5,c:0},{x:5.5,y:5,c:0},{x:5.2,y:6.8,c:1},{x:5.8,y:2.8,c:0},{x:6,y:6,c:1},{x:6.5,y:4,c:1},{x:7,y:7.5,c:1},{x:7.5,y:3,c:1},{x:8,y:5.5,c:1},{x:8.5,y:7,c:1},{x:9,y:4.5,c:1}],
    knob: { label: 'Neighbours per prediction (k)', min: 1, max: 17, step: 2, init: 1 },
    insights: [
      { max: 3, text: 'Small k: the map draws heroic little islands around every contested point — "explaining" outcomes that were effectively coin flips. That\'s memorised noise, not knowledge.', tone: 'warn' },
      { max: 9, text: 'Moderate k: the map accepts a clean border and CONCEDES the contested points near it. Accepting known losses is the optimal move here.', tone: 'info' },
      { max: 17, text: '🤯 No k anywhere on this slider produced a perfect map — nor can any model, ever, on truly overlapping classes. The best achievable error has a name; hitting it (not 0%) is the actual goal.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Bayes error (irreducible error)', formula: 'best possible error > 0 when classes overlap · (classic result: 1-NN error ≤ 2 × Bayes error, given infinite data)',
      text: 'Every problem has a floor set by genuine ambiguity. Knowing it exists changes your goal from "get 100%" to "get close to the floor without fitting noise".' }
  }
},

/* H4 — weight power as a dial from uniform to 1-NN */
{
  q: 'In weighted KNN with weight = 1/dᵖ, what happens as the power p grows very large?',
  choices: [
    'The single nearest neighbour dominates totally — it behaves like 1-NN regardless of k',
    'All neighbours converge to equal influence',
    'The farthest neighbour dominates',
    'All weights become zero and prediction fails',
    'It behaves like k = n, predicting the majority class'
  ],
  explain: 'Raising p amplifies closeness differences: the smallest d wins by an ever-bigger factor until the nearest point\'s weight swamps everyone. p is a dial from uniform-vote (p=0) to pure 1-NN (p→∞).',
  widget: {
    type: 'voteWeight', title: 'The dial between two algorithms',
    world: 'Five neighbours of a mystery mushroom: the closest says "edible", the other four (a bit farther) say "toxic". Your knob is the exponent p in weight = 1/dᵖ. You\'re about to morph one algorithm into another without changing k at all.',
    classes: ['Edible', 'Toxic'],
    neighbors: [
      { name: 'closest', d: 0.6, c: 0 },
      { name: '2nd', d: 1.1, c: 1 },
      { name: '3rd', d: 1.3, c: 1 },
      { name: '4th', d: 1.6, c: 1 },
      { name: '5th', d: 1.9, c: 1 }
    ],
    knob: { label: 'Weight exponent p (weight = 1/dᵖ)', min: 0, max: 4, step: 0.1, init: 0 },
    insights: [
      { max: 0.05, text: 'p = 0: every weight is 1 — this IS plain unweighted KNN. Toxic wins 4–1.', tone: 'info' },
      { max: 2.5, text: 'The closest neighbour\'s circle is inflating fast — 1/d rewards closeness linearly, but 1/d⁴ rewards it savagely. Watch for the flip.', tone: 'warn' },
      { max: 4, text: '🤯 The nearest neighbour now outweighs all four others combined: your "5-NN" is behaving exactly like 1-NN. Same k, different p — a whole family of algorithms lives on this one dial.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'The weight exponent p', formula: 'p = 0 → uniform k-NN · p → ∞ → 1-NN. Common picks: p = 1, 2',
      text: 'k and p together set how local the model is. High p re-concentrates influence no matter how big k is — useful, but it resurrects 1-NN\'s noise-sensitivity too.' }
  }
},

/* H5 — step-function predictions */
{
  q: 'Why does a KNN regression curve look like a staircase (flat stretches with sudden jumps)?',
  choices: [
    'The prediction only changes when the set of k nearest neighbours changes — between those switchovers it\'s constant',
    'KNN rounds every prediction to the nearest integer',
    'The training data must have been collected in steps',
    'Averaging always produces discontinuous functions',
    'It doesn\'t — KNN regression is perfectly smooth'
  ],
  explain: 'As the query slides along x, the prediction is the mean of a FIXED set of neighbours until one drops out and another drops in — then the average jumps. Flat, jump, flat, jump: a staircase.',
  widget: {
    type: 'knnRegress', title: 'Anatomy of a staircase',
    world: 'Fuel efficiency vs engine size, 12 cars. Fix your eyes on the purple prediction LINE this time, not the number. Slide k and explain to yourself: why is it flat in places, and what happens at the exact moment it jumps?',
    xlab: 'engine size', ylab: 'mpg', itemName: 'cars', decimals: 1,
    points: [{x:0.7,y:52},{x:1.5,y:47},{x:2.3,y:44},{x:3.1,y:38},{x:3.9,y:35},{x:4.7,y:30},{x:5.5,y:28},{x:6.3,y:24},{x:7.1,y:22},{x:7.9,y:18},{x:8.7,y:16},{x:9.5,y:13}],
    qx: 4.3,
    knob: { label: 'Cars averaged (k)', min: 1, max: 12, step: 1, init: 1 },
    insights: [
      { max: 1, text: 'k = 1: pure staircase — each flat step is "the territory where THIS car is the nearest one". The jump is the instant the crown changes heads.', tone: 'info' },
      { max: 5, text: 'Bigger k: steps get smaller and more frequent (any of k members swapping causes a small jump) — smoother-looking, but still never a sloped line. Zoom your eyes in on a jump.', tone: 'info' },
      { max: 12, text: '🤯 The line NEVER tilts — it only ever steps, because a mean over a fixed set is constant. KNN regression is piecewise-constant by construction; if the truth is a smooth slope, KNN approximates it with stairs.', tone: 'wow' }
    ],
    extreme: { at: 'min' },
    reveal: { name: 'Piecewise-constant predictions', formula: 'ŷ(x) = mean of a set that changes only at switchover points → step function',
      text: 'Fixed membership between switchovers = flat prediction. Distance-weighted KNN softens the jumps (weights change continuously) — one more reason weighting is popular.' }
  }
},

/* H6 — effective complexity ≈ n/k */
{
  q: 'A useful rule of thumb: the effective complexity ("effective number of parameters") of KNN is roughly…',
  choices: [
    'n / k — the number of training points divided by k',
    'k — more neighbours, more parameters',
    'Always 1, since there\'s a single hyperparameter',
    'n × k — points times neighbours',
    'The number of features, d'
  ],
  explain: 'The input space fragments into roughly n/k regions, each free to take its own value — like a model with n/k independent parameters. k=1 gives n regions (very complex); k=n gives 1 (a constant).',
  widget: {
    type: 'boundaryK', title: 'Counting the model\'s moving parts',
    world: 'Fourteen labelled sensor readings. Think of every separately-colourable patch of the map as one "moving part" the model can bend. Your knob divides n = 14 by k: watch the number of independent patches — and the wiggliness number below — collapse as k grows.',
    classes: ['Alert', 'Normal'], xlab: 'vibration', ylab: 'temperature',
    points: [{x:1.2,y:1.8,c:0},{x:2.6,y:3.2,c:0},{x:1.8,y:5.4,c:0},{x:3.4,y:1.2,c:0},{x:4.4,y:4.2,c:0},{x:2.2,y:7.6,c:0},{x:6.8,y:8.4,c:0},{x:6.2,y:2.4,c:1},{x:7.8,y:3.8,c:1},{x:8.8,y:2,c:1},{x:7.2,y:5.6,c:1},{x:8.4,y:7,c:1},{x:9.2,y:5,c:1},{x:5.4,y:6.6,c:1}],
    knob: { label: 'k (complexity ≈ 14 / k)', min: 1, max: 13, step: 2, init: 1 },
    insights: [
      { max: 1, text: 'k = 1: complexity ≈ 14/1 = 14 moving parts — every point commands its own patch. Maximum flexibility, maximum capacity to memorise.', tone: 'warn' },
      { max: 7, text: 'k = 5: ≈ 3 effective parts. The map can still express "two main territories and an exclave", but no single point gets private treatment.', tone: 'info' },
      { max: 13, text: '🤯 k = 13: ≈ 1 part — the model is one notch above predicting a constant. You\'ve watched a 14-parameter model dissolve into a 1-parameter model with one slider.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Effective parameters ≈ n/k', formula: 'complexity(KNN) ≈ n / k regions that can vary independently',
      text: 'This is why k fights overfitting: it doesn\'t "add smoothing" abstractly, it literally deletes degrees of freedom. Compare models by effective complexity, not parameter counts.' }
  }
},

/* H7 — condensing / editing the training set */
{
  q: 'Prototype selection ("condensing/editing") shrinks KNN\'s training set by keeping mainly the points near class boundaries. Why does this work?',
  choices: [
    'Deep-interior points rarely change any vote — the boundary shape is decided by points near the boundary',
    'Interior points are usually mislabeled',
    'Fewer points always means better accuracy',
    'It converts KNN into a parametric model',
    'Boundary points are cheaper to store in memory'
  ],
  explain: 'A query lands near the boundary or it doesn\'t: deep-interior points only ever confirm landslide votes. Dropping them barely moves any prediction, while slashing storage and query cost.',
  widget: {
    type: 'speedLazy', title: 'The great pruning',
    world: 'A handwriting classifier stores 40,000 example letters, but most are deep inside their class — the ten-thousandth perfectly ordinary "e" changes no vote. Prune the archive down toward just the disputed, boundary-area examples and watch what you pay (and what you don\'t).',
    itemName: 'stored letters', storeLabel: 'Example archive', knobMax: 40000,
    knob: { label: 'Examples kept after pruning', min: 800, max: 40000, step: 400, init: 40000 },
    insights: [
      { max: 4000, text: '🤯 Kept only the ~10% of examples that ever influence a contested vote: queries answer 10× faster, memory is a tenth — and accuracy is nearly untouched, because you kept the DECIDERS.', tone: 'wow' },
      { max: 20000, text: 'Pruning interior examples: each one you drop was only ever piling onto votes already won. The bill shrinks; the boundary — the thing that decides hard cases — survives.', tone: 'info' },
      { max: 40000, text: 'The full archive: maximum cost, and most of it is redundant confirmation. Slide LEFT to prune it and see what actually mattered.', tone: 'warn' }
    ],
    extreme: { at: 'min' },
    reveal: { name: 'Prototype selection (CNN / ENN editing)', formula: 'keep boundary-region points, drop redundant interior → ~same boundary, fraction of the cost',
      text: 'Condensed NN keeps points that change votes; Edited NN also deletes noisy ones (bonus: that trims overfitting too). Same idea powers modern vector-database compaction.' }
  }
},

/* H8 — approximate nearest neighbours */
{
  q: 'Modern vector search (recommendations, semantic search) uses Approximate Nearest Neighbour methods like HNSW or LSH. What\'s the core trade they make?',
  choices: [
    'A tiny chance of missing the true nearest neighbour, in exchange for orders-of-magnitude faster queries',
    'Lower accuracy on ALL queries in exchange for exact timing guarantees',
    'They only work when k = 1',
    'They require labels for every stored vector',
    'They store the data twice to halve the search time'
  ],
  explain: 'ANN methods answer "a very-near neighbour, almost always the nearest" instead of "the provably nearest" — recall ~95–99% at a tiny fraction of the cost. At web scale, exactness is a luxury nobody buys.',
  widget: {
    type: 'speedLazy', title: 'Close enough, a thousand times faster',
    world: 'A music app finds similar songs among a huge catalogue of embeddings. Exact search checks everything; the indexed bar is an approximate searcher following a "small-world" graph of shortcuts instead. Scale the catalogue and decide which bill you\'d pay for a 1–5% chance of returning the 2nd-nearest song instead of the 1st.',
    itemName: 'song vectors', storeLabel: 'Song catalogue', knobMax: 64000, indexed: true,
    knob: { label: 'Songs in the catalogue', min: 2000, max: 64000, step: 2000, init: 8000 },
    insights: [
      { max: 16000, text: 'The exact scan is already thousands of checks per query. The approximate route: a couple dozen hops through the shortcut graph.', tone: 'info' },
      { max: 48000, text: 'The user cannot tell the 1st-nearest song from the 2nd-nearest. The exact-search bar is paying an enormous premium for a difference below human perception.', tone: 'warn' },
      { max: 64000, text: '🤯 64,000 checks vs ~16 hops. In high dimensions exact indexes collapse back to the big bar, so approximate search isn\'t a cheap hack — it\'s the only thing that works at scale.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Approximate Nearest Neighbours (ANN)', formula: 'recall ≈ 95–99% of true neighbours · cost ≈ O(log n) even in high dimensions',
      text: 'HNSW graphs, LSH buckets, IVF cells: different tricks, same trade. Every "similar items" feature you\'ve used ran KNN\'s idea through an ANN engine.' }
  }
},

/* H9 — direction vs length: cosine similarity */
{
  q: 'Two documents are about the same topic, but one is three times longer, making its word-count vector three times larger. Which measure best captures their similarity?',
  choices: [
    'Cosine similarity — it compares direction (topic mix) and ignores vector length (document size)',
    'Euclidean distance on raw counts — length differences are meaningful signal',
    'Manhattan distance on raw counts — it sums the length difference fairly',
    'Hamming distance on the raw counts',
    'No measure can compare documents of different lengths'
  ],
  explain: 'Scaling a vector by 3 leaves its direction unchanged but moves it far away in Euclidean terms. Cosine measures the angle between vectors — same topic mix = same direction = similar, at any length.',
  widget: {
    type: 'metricSwitch', title: 'The long-winded twin',
    world: 'Articles plotted by how often they mention "goals" vs "elections". "Football Weekly XL" is the SAME kind of article as the short match report — just 3× longer, so it sits 3× farther along the same direction from the origin. Watch which article standard rulers pick as the match report\'s nearest neighbour.',
    classes: ['Sports desk', 'Politics desk'], xlab: 'mentions of "goals"', ylab: 'mentions of "elections"', queryLabel: 'short match report',
    points: [
      { x: 2.4, y: 4.2, c: 1, name: 'Election brief' },
      { x: 9, y: 1.5, c: 0, name: 'Football Weekly XL' },
      { x: 1, y: 8.5, c: 1, name: 'Campaign special' },
      { x: 6.5, y: 7.5, c: 0, name: 'Sport & society essay' }
    ],
    query: {x:3,y:0.5},
    knob: { label: 'The ruler (city-block → straight-line)', min: 1, max: 2, step: 0.05, init: 2 },
    insights: [
      { max: 1.05, text: 'Same problem under city-block: the politics brief still beats the long football article. Both standard rulers punish LENGTH, not topic difference.', tone: 'warn' },
      { max: 1.9, text: 'Slide all you like — no p fixes this. The match report and Football Weekly XL point the SAME WAY from the origin (goals-heavy, election-light); what differs is only how far along that direction they sit.', tone: 'info' },
      { max: 2, text: '🤯 Euclidean picks the ELECTION brief as the sports report\'s twin, purely because both are short. The fix isn\'t another p — it\'s a ruler that measures ANGLE: same direction = similar, regardless of length.', tone: 'wow' }
    ],
    extreme: { at: 'min' },
    reveal: { name: 'Cosine similarity', formula: 'cos(θ) = (A·B) / (|A||B|) — compares direction, ignores magnitude',
      text: 'For text, embeddings and any "profile-shaped" data, cosine (or normalising vectors to length 1, which makes Euclidean rank the same way) is the standard KNN metric.' }
  }
},

/* H10 — mixed types: binary + numeric */
{
  q: 'A dataset mixes one-hot categories (0/1 columns) with numeric features like income (in pounds). Without rescaling, what happens to the categorical information in KNN?',
  choices: [
    'It\'s nearly invisible — a 0-vs-1 gap is microscopic next to raw income gaps',
    'It dominates — binary gaps always outweigh numeric ones',
    'One-hot columns are automatically ignored by distance metrics',
    'The distance becomes undefined for mixed types',
    'Categorical information doubles in weight'
  ],
  explain: 'A one-hot mismatch contributes at most ~1 to the distance; a £20k income gap contributes 20,000. Unscaled, the categorical column may as well not exist.',
  widget: {
    type: 'scaleFeature', title: 'The one-bit whisper',
    world: 'Match Ira (non-smoker, income £38k) with the most similar insurance applicant. "Smoker" is a one-hot column — 0 or 1: medically huge, numerically tiny. Shrink income\'s raw units and listen for the moment the one-bit column finally gets a voice.',
    aName: 'smoker flag (×10)', bName: 'income',
    target: { name: 'Ira', a: 0, b: 38000 },
    cands: [
      { name: 'Jo · smoker, £38.5k', a: 10, b: 38500 },
      { name: 'Ash · non-smoker, £45k', a: 0, b: 45000 },
      { name: 'Kim · smoker, £39k', a: 10, b: 39000 },
      { name: 'Lee · non-smoker, £52k', a: 0, b: 52000 }
    ],
    knob: { label: 'Shrink income units by', min: 0, max: 4, step: 0.25, init: 0 },
    insights: [
      { max: 0.5, text: 'Raw pounds: Jo — a SMOKER with a nearly identical income — is Ira\'s "twin". The smoker column is contributing a rounding error to the distance.', tone: 'warn' },
      { max: 2.5, text: 'As income\'s units shrink, the smoker mismatch starts costing real distance. Watch the non-smokers climb the ranking.', tone: 'info' },
      { max: 4, text: '🤯 Now smoker-status rules and income barely matters. There\'s no free lunch: with mixed types YOU choose the exchange rate between "one category apart" and "one pound apart". Choosing it deliberately is the whole game.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Mixed-type distances (scaling as exchange rate)', formula: 'standardise numerics + weight one-hots · or use Gower distance for mixed data',
      text: 'After standardising, a one-hot mismatch ≈ a one-standard-deviation numeric gap — a defensible default. Gower distance formalises mixed-type comparison; either way, the exchange rate is a modelling decision.' }
  }
},

/* H11 — KNN imputation */
{
  q: 'KNN imputation fills a missing value by…',
  choices: [
    'Finding the k rows most similar on the OTHER features and averaging their values for the missing one',
    'Replacing it with zero, since missing means absent',
    'Copying the value from the row directly above in the file',
    'Deleting every row that has any missing value',
    'Training a separate model for every missing cell'
  ],
  explain: 'The KNN idea works for repair, not just prediction: rows similar in every other respect probably resemble the broken row in the missing feature too.',
  widget: {
    type: 'knnRegress', title: 'The torn page',
    world: 'A weather station\'s humidity reading for one day got corrupted — but temperature survived. Twelve intact days provide (temperature → humidity) pairs. Estimate the torn value from the days most similar in temperature. You\'re not predicting the future — you\'re repairing the past with the same algorithm.',
    xlab: 'temperature', ylab: 'humidity (%)', itemName: 'intact days', decimals: 0, unit: '%',
    points: [{x:0.8,y:88},{x:1.6,y:84},{x:2.4,y:80},{x:3.2,y:74},{x:4,y:70},{x:4.8,y:66},{x:5.6,y:62},{x:6.4,y:55},{x:7.2,y:50},{x:8,y:46},{x:8.8,y:41},{x:9.6,y:36}],
    qx: 5.1,
    knob: { label: 'Similar days averaged (k)', min: 1, max: 12, step: 1, init: 3 },
    insights: [
      { max: 2, text: 'One or two look-alike days give a plausible repair, but you\'re trusting individual days — one sensor glitch among them and the "repair" is damage.', tone: 'warn' },
      { max: 7, text: 'A handful of similar days: stable, sensible fill values. This exact procedure is sklearn\'s KNNImputer.', tone: 'info' },
      { max: 12, text: '🤯 Averaging ALL days fills the gap with the yearly average — ignoring that this was a warm day. Even for repair-work, "similar" beats "everything": the same k trade-off follows KNN everywhere it goes.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'KNN imputation', formula: 'missing value ← mean of that feature over the k most-similar complete rows',
      text: 'One algorithm, three jobs so far: classify (vote), regress (average), impute (average into the gaps). Distance-based reasoning is a Swiss army knife.' }
  }
},

/* H12 — radius neighbours */
{
  q: 'Radius-based neighbours (use everyone within distance r, instead of exactly k points) has which failure mode that plain KNN avoids?',
  choices: [
    'In sparse regions the radius can contain zero points, leaving no prediction at all',
    'It always includes the entire dataset',
    'It cannot be used for classification',
    'The radius must equal k at all times',
    'It only works with Manhattan distance'
  ],
  explain: 'k-NN always finds exactly k voters, however far away. A fixed radius adapts the voter COUNT to local density instead — great where data is dense, but an empty circle where data is sparse.',
  widget: {
    type: 'radiusScatter', title: 'The circle that came back empty',
    world: 'Instead of "ask the k closest", this model asks "everyone within walking distance r" — the dashed circle. The query sits at the edge of town where houses thin out. Grow and shrink the circle and watch the voter count change — all the way down to a failure k-NN can never have.',
    classes: ['Solar roof', 'No solar'], xlab: 'street position', ylab: 'plot size', queryLabel: 'edge-of-town house',
    points: [{x:1.2,y:7.8,c:0},{x:2.2,y:8.6,c:0},{x:1.8,y:6.6,c:0},{x:3,y:7.4,c:0},{x:2.6,y:9.2,c:0},{x:3.6,y:8.2,c:1},{x:1,y:9,c:1},{x:4.2,y:6.8,c:1},{x:3.4,y:5.8,c:1},{x:2,y:5.2,c:1}],
    query: {x:7.8,y:2.2},
    knob: { label: 'Radius r (walking distance)', min: 0.5, max: 9, step: 0.25, init: 7 },
    insights: [
      { max: 5.5, text: '🤯 The circle is EMPTY — zero voters, no prediction, undefined. k-NN would have quietly recruited far-away voters; radius-NN instead admits "nobody comparable lives here". Sometimes that honesty is a feature!', tone: 'wow' },
      { max: 7.5, text: 'The circle finally reaches town and picks up voters — note the count varies with local density rather than being pinned at k.', tone: 'info' },
      { max: 9, text: 'Huge r: half the town votes on a house nothing like theirs — the radius version of "k too large". Both knobs, r and k, tune the same thing: how local is "local".', tone: 'warn' }
    ],
    extreme: { at: 'min' },
    reveal: { name: 'Radius neighbours (fixed-radius NN)', formula: 'voters = all points with distance ≤ r (count varies; can be zero)',
      text: 'k fixes the voter count and lets distance float; r fixes the distance and lets the count float. Density-adaptive but can come back empty — which doubles as a built-in "out of distribution" alarm.' }
  }
},

/* H13 — robust scaling with outliers */
{
  q: 'One customer in the data is a billionaire. After min-max scaling to [0,1], what happens to the income feature in KNN distances?',
  choices: [
    'Everyone normal gets squashed into a tiny sliver near 0, so income differences among them barely count',
    'It works fine — min-max scaling is immune to outliers',
    'The billionaire is automatically removed',
    'All incomes become exactly 0.5',
    'The feature becomes negative for most customers'
  ],
  explain: 'Min-max divides by (max − min). With max = £2bn, ordinary incomes (£20k–£90k) all land within a hair of 0 — effectively erased. Robust scalers (median/IQR) resist this.',
  widget: {
    type: 'scaleFeature', title: 'The billionaire in the denominator',
    world: 'Match Tess (£41k, age 33) with a similar customer. Income was min-max scaled — but the scale\'s ceiling was set by a billionaire, so ordinary income gaps start microscopic. Your knob re-inflates the income axis toward what it would be WITHOUT the billionaire stretching it. (Drag LEFT to re-inflate.)',
    aName: 'age', bName: 'income (billionaire-squashed)',
    target: { name: 'Tess', a: 33, b: 0.4 },
    cands: [
      { name: 'Mo · 34y, £43k', a: 34, b: 0.6 },
      { name: 'Cy · 61y, £41.5k', a: 61, b: 0.45 },
      { name: 'Fern · 35y, £75k', a: 35, b: 3.8 },
      { name: 'Dot · 30y, £58k', a: 30, b: 2.1 }
    ],
    knob: { label: 'Squash income differences by', min: 0, max: 4, step: 0.25, init: 4 },
    insights: [
      { max: 0.75, text: 'Income restored to a sensible scale: Mo (similar age AND income) is the match. This is what a robust scaler — median and IQR instead of min and max — would have produced directly.', tone: 'info' },
      { max: 2.75, text: 'Partially squashed: income still whispers. Note the ranking churn as you drag — the entire similarity structure hinges on one extreme individual in the denominator.', tone: 'warn' },
      { max: 4, text: '🤯 Fully squashed (what min-max + billionaire actually produced): 61-year-old Cy is "most similar" because ONLY age can speak — every normal income difference was crushed into a sliver near 0.', tone: 'wow' }
    ],
    extreme: { at: 'min' },
    reveal: { name: 'Robust scaling', formula: 'x′ = (x − median) / IQR — quantiles ignore how extreme the extremes are',
      text: 'Min-max hands your scale to the most extreme point in the data. When outliers exist (they do), scale with medians and quartiles, or clip/winsorise before scaling.' }
  }
},

/* H14 — temporal leakage */
{
  q: 'A KNN model predicting next-week sales scores 92% with random cross-validation but 61% deployed. The most likely cause?',
  choices: [
    'Temporal leakage — random splits let the model\'s neighbours include data from AFTER the prediction date',
    'The servers run a different version of Python',
    'k was set to an even number',
    'Deployment always halves any model\'s accuracy',
    'The features were scaled twice by accident'
  ],
  explain: 'With time-ordered data, random splits are a séance: the model consults the future. Honest evaluation must train on the past and test on the future — like deployment will.',
  widget: {
    type: 'foldPick', title: 'The fortune teller\'s exam',
    world: 'Five ways to examine the same sales model. Four use random shuffled splits (past and future mixed together). The fifth is the only exam that matches the model\'s real job: given only the past, predict the future. Compare what each exam reports.',
    blurb: 'Same model — five different examination designs:',
    folds: [
      { name: 'random split #1', acc: 91 },
      { name: 'random split #2', acc: 93 },
      { name: 'random split #3', acc: 90 },
      { name: 'random split #4', acc: 92 },
      { name: 'train past → test future', acc: 61 }
    ],
    knob: { label: 'Which exam design', min: 1, max: 6, step: 1, init: 1 },
    insights: [
      { max: 4, text: 'The random splits agree: ~92%, low variance, very reassuring. All four share the same flaw: when predicting a Tuesday, the neighbours could include the following Friday.', tone: 'warn' },
      { max: 5, text: '🤯 The forward-in-time exam: 61%. Not "one unlucky fold" — it\'s the only design where the model can\'t consult days that hadn\'t happened yet. It disagrees with the other four because THEY were cheating.', tone: 'wow' },
      { max: 6, text: 'The average launders four cheating exams with one honest one — worse than useless. With time series, don\'t average designs: use walk-forward validation, full stop.', tone: 'warn' }
    ],
    extreme: { at: 5 },
    reveal: { name: 'Temporal leakage & walk-forward validation', formula: 'time data → train on [t₀, t], test on (t, t+Δ] — never shuffle across time',
      text: 'A deployed model only ever knows the past. Any evaluation that lets neighbours arrive from the future measures a fantasy. This bites KNN especially hard: neighbours are literal rows, so future rows = open cheating.' }
  }
},

/* H15 — multi-class: plurality, not majority */
{
  q: 'With 4 classes and k = 7, the neighbour vote is 3–2–1–1. What does standard KNN predict?',
  choices: [
    'The class with 3 votes — the largest count wins, even without an overall majority',
    'Nothing — a class needs more than half the votes (4+) to win',
    'A tie is declared among all four classes',
    'The class of the single nearest neighbour overrides the count',
    'It re-runs the vote with k = 8'
  ],
  explain: 'KNN uses plurality: the biggest vote count wins, majority or not. With many classes, outright majorities get rare — and near-ties get common, so vote margins deserve attention.',
  widget: {
    type: 'scatterK', title: 'Winning without a majority',
    world: 'A dialect classifier (two dialects shown here of a larger set). At several k values, watch how narrow the winning margin gets — in multi-class problems a "winner" often holds barely a third of the votes. The verdict box shows the count; treat the margin as part of the answer.',
    classes: ['Northern', 'Southern'], xlab: 'vowel length', ylab: 'speech rate',
    points: [{x:2.2,y:2.8,c:0},{x:3.4,y:2,c:0},{x:2.6,y:4.4,c:0},{x:4.2,y:3.6,c:0},{x:3,y:5.8,c:0},{x:5.8,y:5.2,c:1},{x:7,y:6.4,c:1},{x:6.2,y:7.8,c:1},{x:7.8,y:5.6,c:1},{x:8.2,y:7.2,c:1}],
    query: {x:4.9,y:4.7},
    knob: { label: 'Neighbours asked (k)', min: 1, max: 9, step: 1, init: 7 },
    insights: [
      { max: 3, text: 'Small juries produce lopsided counts. Note the verdict needs only MORE votes than the runner-up — that\'s plurality, not majority.', tone: 'info' },
      { max: 6, text: 'Mid-range k: the count here runs close (3–2, 4–2…). Now imagine 4 classes splitting 7 votes: 3–2–1–1 crowns a winner with under half the votes.', tone: 'info' },
      { max: 9, text: '🤯 A 5–4 verdict and a 9–0 verdict print the same label but are utterly different answers. With multiple classes, margins shrink further — report the vote split, not just the winner.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Plurality voting (multi-class KNN)', formula: 'prediction = argmax over classes of vote count — no majority required',
      text: 'More classes = thinner margins = more near-ties (odd k no longer saves you). Distance weighting and vote-fraction confidence go from nice-to-have to essential.' }
  }
},

/* H16 — Hamming distance on binary vectors */
{
  q: 'For binary feature vectors (each feature is 0 or 1), Manhattan distance is identical to…',
  choices: [
    'Hamming distance — it simply counts the features on which the two vectors differ',
    'Euclidean distance — squares don\'t matter for any real numbers',
    'Cosine similarity — angles equal sums for binary data',
    'Zero — binary vectors are all identical',
    'The dot product of the vectors'
  ],
  explain: 'For 0/1 values, |a−b| is 1 exactly when the bits differ, 0 otherwise. Summing gives the count of differing positions — the definition of Hamming distance.',
  widget: {
    type: 'metricMorph', title: 'Counting the disagreements',
    world: 'Two users\' yes/no answers, packed into coordinates: each unit step = one question they answered differently (3 disagreements across, 2 up — 5 total). Slide the ruler and notice something odd: for counting DISAGREEMENTS, one end of the slider is simply… correct.',
    a: {x:2,y:3}, aName: 'User A', b: {x:5,y:5}, bName: 'User B', unit: 'differing answers',
    knob: { label: 'How distance is measured', min: 1, max: 2, step: 0.05, init: 2 },
    insights: [
      { max: 1.05, text: '🤯 City-block reads exactly 5 — the true count of differing answers (3 + 2). On binary data, Manhattan IS the disagreement-counter. It has a special name here: Hamming distance.', tone: 'wow' },
      { max: 1.9, text: 'In between: fractional "distances" like 4.1 disagreements — meaningless for yes/no data. A metric must fit the TYPE of the data, not just its scale.', tone: 'warn' },
      { max: 2, text: 'Euclidean: √13 ≈ 3.6 "disagreements" — a number with no interpretation for binary answers. Geometrically fine, semantically broken.', tone: 'info' }
    ],
    extreme: { at: 'min' },
    reveal: { name: 'Hamming distance', formula: 'binary vectors: L1(a, b) = # of positions where a ≠ b = Hamming(a, b)',
      text: 'Metrics carry meaning, not just numbers. Binary/one-hot data → Hamming (= L1). Counts → often L1. Continuous, scaled → L2. Profiles/text → cosine. Choose by data type first.' }
  }
},

/* H17 — Voronoi cells at k=1 */
{
  q: 'At k = 1, KNN\'s decision regions form a specific geometric structure. Which one?',
  choices: [
    'A Voronoi diagram — each training point owns the region of space closer to it than to any other point',
    'A rectangular grid aligned with the axes',
    'Concentric circles around the data\'s centre',
    'A single straight line through the middle',
    'Randomly shaped regions that change on every prediction'
  ],
  explain: 'With one voter, space belongs to whoever is closest: each training point gets a polygonal cell (all locations nearer to it than to anyone else). The class map is those cells, coloured by label.',
  widget: {
    type: 'boundaryK', title: 'The mosaic underneath',
    world: 'Fourteen wifi beacons in a building, each labelled by which router serves it best. At k = 1 the prediction map is secretly a tiling: every beacon owns a polygon of "my turf". Study the straight-edged patches at k = 1, then raise k and watch the mosaic dissolve into curves.',
    classes: ['Router East', 'Router West'], xlab: 'building x', ylab: 'building y',
    points: [{x:1.2,y:2.2,c:0},{x:3,y:1.4,c:0},{x:2.2,y:4.6,c:0},{x:4.4,y:3.8,c:0},{x:1.6,y:7,c:0},{x:3.8,y:6.4,c:0},{x:5.2,y:8.6,c:0},{x:6,y:1.8,c:1},{x:7.4,y:3.2,c:1},{x:8.6,y:1.2,c:1},{x:6.8,y:5.4,c:1},{x:8.2,y:6.8,c:1},{x:9.2,y:4.4,c:1},{x:7.8,y:8.8,c:1}],
    knob: { label: 'Neighbours per prediction (k)', min: 1, max: 13, step: 2, init: 1 },
    insights: [
      { max: 1, text: '🤯 Look closely at the borders: straight segments meeting at corners. Each segment is the exact halfway line between two beacons — the perpendicular bisector. Space has been carved into "closest-to-me" polygons.', tone: 'wow' },
      { max: 7, text: 'With more voters, borders stop being single bisectors and become blends of many — the crisp polygon edges soften.', tone: 'info' },
      { max: 13, text: 'The mosaic is gone entirely. But underneath every 1-NN system you\'ll ever meet — including "nearest store" maps — that same polygon tiling is doing the work.', tone: 'info' }
    ],
    extreme: { at: 'min' },
    reveal: { name: 'Voronoi tessellation', formula: 'cell(pᵢ) = { x : dist(x, pᵢ) ≤ dist(x, pⱼ) for all j } — 1-NN regions',
      text: 'The 1-NN decision boundary is piecewise-linear: a union of Voronoi cell edges. Voronoi diagrams appear everywhere from cell-tower coverage to soap bubbles — 1-NN is their machine-learning incarnation.' }
  }
},

/* H18 — kth-neighbour distance as anomaly score */
{
  q: 'Beyond classification, the DISTANCE to a point\'s kth nearest neighbour is commonly used as…',
  choices: [
    'An anomaly score — points far even from their nearest neighbours are likely outliers',
    'A replacement for the learning rate',
    'An estimate of the number of classes',
    'A way to compress the training data',
    'The model\'s accuracy on that point'
  ],
  explain: 'Normal points live in crowds (small kth-neighbour distance); anomalies are far even from their closest peers. That single number is a classic outlier detector.',
  widget: {
    type: 'scatterK', title: 'The loneliness detector',
    world: 'Network logins, labelled by past behaviour type. A new login (◆) appears far from every previous session. Forget the vote for a moment — READ THE DISTANCES on the lines. Those numbers are about to become a security feature.',
    classes: ['Office login', 'Home login'], xlab: 'login hour', ylab: 'data volume', showDists: true,
    points: [{x:1.6,y:7.6,c:0},{x:2.8,y:8.4,c:0},{x:2.2,y:6.4,c:0},{x:3.4,y:7.8,c:0},{x:1.2,y:8.8,c:0},{x:3.2,y:5.6,c:1},{x:4.4,y:6.8,c:1},{x:4,y:8.6,c:1},{x:5,y:7.4,c:1},{x:4.6,y:5.4,c:1}],
    query: {x:8.6,y:1.4},
    knob: { label: 'Which neighbour\'s distance to read (k)', min: 1, max: 10, step: 1, init: 1 },
    insights: [
      { max: 3, text: 'Even this login\'s NEAREST neighbour is ~7 units away — while every normal login has a twin within ~1.5. That gap is the anomaly signal, no labels needed.', tone: 'info' },
      { max: 7, text: 'Reading the kth-nearest distance (rather than the 1st) makes the score robust: a lucky single close point can\'t hide an outlier from k = 5.', tone: 'info' },
      { max: 10, text: '🤯 You\'ve turned KNN inside out: instead of asking the neighbours to VOTE, you measured how far away the neighbourhood IS. Same machinery, brand-new job: anomaly detection.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'kNN-distance anomaly detection', formula: 'anomaly score(x) = distance to x\'s kth nearest neighbour',
      text: 'Big kth-neighbour distance = far from every crowd = suspicious. This underpins classic outlier detectors (kNN-outlier, LOF) — and doubles as the "too far to trust the vote" alarm from earlier levels.' }
  }
},

/* H19 — O(n·d) per query */
{
  q: 'For brute-force KNN with n training points and d features, the cost of ONE prediction scales as…',
  choices: [
    'O(n · d) — every stored point requires a d-dimensional distance computation',
    'O(k) — only the k neighbours are ever touched',
    'O(log n) — thanks to sorting done at training time',
    'O(d²) — features are compared pairwise',
    'O(1) — lookups are constant time'
  ],
  explain: 'Each of the n stored points needs a distance: d subtractions/squares each. Both dataset size AND feature count multiply into every single query.',
  widget: {
    type: 'speedLazy', title: 'The bill has two factors',
    world: 'An image-similarity service: each stored image is a 512-number vector (that\'s d), so ONE distance check = 512 multiply-adds. The knob scales n, the number of stored images. As you drag, remember every unit of that orange bar is itself 512 operations wide.',
    itemName: 'images', storeLabel: 'Image library (×512 numbers each)', knobMax: 50000,
    knob: { label: 'Stored images (n)', min: 1000, max: 50000, step: 1000, init: 5000 },
    insights: [
      { max: 12000, text: 'The bar counts distance checks (n) — but the REAL operation count is n × 512. Two dials multiply: double either one, double the bill.', tone: 'info' },
      { max: 35000, text: 'Compare cures: halving d (feature selection, PCA) cuts the true cost exactly as much as halving n (condensing). The formula tells you both levers exist.', tone: 'info' },
      { max: 50000, text: '🤯 50,000 checks × 512 numbers = 25.6 MILLION multiply-adds for ONE query. n·d is why real vector search always ships with dimensionality reduction AND an index — attack both factors.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'O(n·d) query complexity', formula: 'one brute-force query = n distance computations × d operations each',
      text: 'Complexity analysis isn\'t academic here — it\'s the menu of remedies: shrink n (condense, index), shrink d (select, project), or approximate. Every production KNN system does at least two.' }
  }
},

/* H20 — KNN as a baseline */
{
  q: 'Why do experienced practitioners often run KNN FIRST on a new classification problem, even when they plan to use something fancier?',
  choices: [
    'It\'s a strong, nearly assumption-free baseline: if fancy models can\'t beat it, they\'re not adding value',
    'KNN is always the most accurate algorithm available',
    'Regulations require KNN before neural networks',
    'KNN automatically cleans the data for later models',
    'Fancier models can only be trained on KNN\'s output'
  ],
  explain: 'KNN needs no training, assumes almost nothing, and captures any smooth boundary given decent features. It sets the bar: a complex model that can\'t clear it is complexity for nothing.',
  widget: {
    type: 'boundaryK', title: 'The bar to clear',
    world: 'A brand-new dataset lands on your desk: two customer types, curvy-but-clean structure. Before architecting anything, you run KNN — zero training, one hyperparameter. Look at the map it gives you for free. Any model you build after this has to BEAT it to justify itself.',
    classes: ['Upgrades', 'Cancels'], xlab: 'usage hours', ylab: 'support tickets',
    points: [{x:1.4,y:2,c:0},{x:2.8,y:1.4,c:0},{x:2,y:3.8,c:0},{x:3.6,y:3,c:0},{x:4.6,y:1.8,c:0},{x:3,y:5.4,c:0},{x:5,y:4.4,c:0},{x:4.2,y:6.6,c:1},{x:5.8,y:6,c:1},{x:6.8,y:4.8,c:1},{x:6.2,y:7.6,c:1},{x:7.6,y:6.4,c:1},{x:8.4,y:8,c:1},{x:8.8,y:5.2,c:1}],
    knob: { label: 'Neighbours per prediction (k)', min: 1, max: 13, step: 2, init: 5 },
    insights: [
      { max: 3, text: 'Thirty seconds of "work" and the structure of the problem is already visible — including the curvy border region where the hard cases live.', tone: 'info' },
      { max: 9, text: 'A couple of knob positions in, you know roughly what accuracy is achievable and where the difficulty is. That\'s reconnaissance no architecture diagram gives you.', tone: 'info' },
      { max: 13, text: '🤯 Suppose a week-long deep-learning effort scores 2 points BELOW this free map — it happens constantly. Without the baseline you\'d never know. "Beat KNN first" is cheap insurance against expensive nonsense.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'The baseline discipline', formula: 'value(fancy model) = score(fancy) − score(strong simple baseline)',
      text: 'A model\'s worth is measured relative to the simplest thing that works. KNN (and majority-class) baselines take minutes and keep everyone honest — run them first, always.' }
  }
},

/* H21 — compute a weighted vote */
{
  q: 'Weighted KNN, weights = 1/distance. Neighbours: class A at distance 1, class B at distance 2, class B at distance 4. Who wins?',
  choices: [
    'A — its weight 1.0 beats B\'s combined 0.5 + 0.25 = 0.75',
    'B — two neighbours always beat one',
    'It\'s an exact tie',
    'B — 6 total distance beats 1 total distance',
    'Neither — weighted KNN needs at least 5 neighbours'
  ],
  explain: 'Weights: A = 1/1 = 1.0; B = 1/2 + 1/4 = 0.75. A wins despite being outnumbered 2 to 1 — closeness converted to influence.',
  widget: {
    type: 'voteWeight', title: 'Do the arithmetic with your thumb',
    world: 'Exactly the three neighbours from the question: one "A" at distance 1, two "B"s at distances 2 and 4. At the left end everyone weighs 1 (B wins 2–1). Slide right to weights = 1/d and watch the bars recompute the question\'s arithmetic live.',
    classes: ['Class A', 'Class B'],
    neighbors: [
      { name: 'A · dist 1', d: 1, c: 0 },
      { name: 'B · dist 2', d: 2, c: 1 },
      { name: 'B · dist 4', d: 4, c: 1 }
    ],
    knob: { label: 'Weight exponent p (1/dᵖ)', min: 0, max: 4, step: 0.1, init: 0 },
    insights: [
      { max: 0.05, text: 'p = 0: headcount rules, B wins 2–1. Now slide to exactly p = 1 — the question\'s setting.', tone: 'info' },
      { max: 1.2, text: '🤯 At p = 1: A\'s bar = 1.0; B\'s bar = 0.5 + 0.25 = 0.75. The flip happened — one close voter outweighs two distant ones. This is the exam answer, computed by your thumb.', tone: 'wow' },
      { max: 4, text: 'Push further and A\'s dominance only grows (1 vs 0.31 at p = 2). Once weights enter, "how many neighbours" matters far less than "how close".', tone: 'info' }
    ],
    extreme: { at: 1 },
    reveal: { name: 'Weighted vote arithmetic', formula: 'A: 1/1 = 1.0 · B: 1/2 + 1/4 = 0.75 → A wins',
      text: 'Weighted KNN is just this sum, per class, biggest total wins. Being able to hand-compute one vote means you truly own the algorithm.' }
  }
},

/* H22 — compute a regression prediction */
{
  q: 'KNN regression, k = 3, unweighted. The three nearest freelancers charged £10/h, £20/h and £60/h. What rate does the model predict?',
  choices: [
    '£30/h — the mean of 10, 20 and 60',
    '£20/h — the median of the three',
    '£60/h — the maximum, to be safe',
    '£10/h — the single nearest value',
    '£90/h — the sum of the three'
  ],
  explain: '(10 + 20 + 60) / 3 = £30/h. Note the £60 outlier dragged the mean above both other values — the median (£20) would have resisted it.',
  widget: {
    type: 'knnRegress', title: 'Quote me a rate',
    world: 'You\'re pricing a freelance gig by comparable projects (plotted by project size → hourly rate). Your project sits at the dashed line; its 3 nearest comparables charged £10, £20 and £60 (one fancy agency in the mix). Set k = 3 and check the model\'s quote against your own arithmetic.',
    xlab: 'project size', ylab: 'rate (£/h)', itemName: 'projects', prefix: '£', unit: '/h', decimals: 0,
    points: [{x:1,y:14},{x:1.8,y:18},{x:2.6,y:16},{x:4.7,y:10},{x:5.3,y:20},{x:5.6,y:60},{x:7.4,y:28},{x:8.2,y:26},{x:9,y:32},{x:3.4,y:15},{x:9.6,y:35},{x:0.4,y:12}],
    qx: 5,
    knob: { label: 'Comparable projects averaged (k)', min: 1, max: 12, step: 1, init: 1 },
    insights: [
      { max: 1, text: 'k = 1: quote = £10/h, the single nearest project. One comparable, zero protection.', tone: 'info' },
      { max: 3, text: '🤯 k = 3: (10 + 20 + 60) / 3 = £30/h — check the readout. Also notice: £30 is HIGHER than 2 of the 3 comparables, because the £60 agency dragged the mean up. Means chase outliers.', tone: 'wow' },
      { max: 12, text: 'Larger k dilutes the agency\'s pull but starts averaging in projects nothing like yours. (The robust alternative at k = 3: take the MEDIAN — £20 — which shrugs at the outlier.)', tone: 'info' }
    ],
    extreme: { at: 3 },
    reveal: { name: 'KNN regression arithmetic (mean vs median)', formula: 'ŷ = (10 + 20 + 60)/3 = 30 · median alternative = 20',
      text: 'The combiner is a choice: mean is standard but outlier-sensitive; median is robust. Being able to compute both by hand tells you exactly what you\'re trading.' }
  }
},

/* H23 — exponential data requirements */
{
  q: 'To keep neighbourhoods "local" (covering, say, 10% of each feature\'s range), how must training data grow as dimensions are added?',
  choices: [
    'Exponentially — roughly multiplying by another factor for every added dimension',
    'Linearly — 10 more points per dimension',
    'It doesn\'t — the same n works in any dimension',
    'Logarithmically — high dimensions need relatively less data',
    'Quadratically — n² points for n dimensions'
  ],
  explain: 'A box covering 10% of each of d axes contains (0.1)^d of the space: 1 dimension needs ~10 points for coverage, 6 dimensions ~10⁶. Local neighbourhoods starve exponentially fast.',
  widget: {
    type: 'dimCurse', title: 'The starving neighbourhood',
    world: 'A supermarket app finds shoppers similar to you among 10 others. Every extra fact you compare on (added by the knob) is another dimension the same 10 shoppers must fill. Watch how quickly "my true neighbours" stops existing — the bars flatten because 10 people cannot populate a 40-dimensional space.',
    itemName: 'shopper', n: 10, seed: 77,
    knob: { label: 'Facts (dimensions) compared', min: 1, max: 64, step: 1, init: 1 },
    insights: [
      { max: 3, text: 'In 1–3 dimensions, 10 shoppers are plenty: some are genuinely close. The neighbourhood is well fed.', tone: 'info' },
      { max: 20, text: 'Each added dimension multiplies the space to fill while the population stays 10. Closeness is being diluted exponentially, and the bars show it.', tone: 'warn' },
      { max: 64, text: '🤯 At 64 dimensions you\'d need astronomically many shoppers for anyone to be truly "nearby" — with 10, everyone is equally remote. To use KNN here you must shrink the space (select/project), because you can NEVER collect (0.1)⁻⁶⁴ people.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Exponential sample complexity', formula: 'covering 10% per axis in d dims → need ~10ᵈ points',
      text: 'The curse, restated as a bill: local methods need data exponential in dimension. Since data never grows that fast, the practical fix is always to reduce d, not to increase n.' }
  }
},

/* H24 — learned metrics */
{
  q: 'Metric learning (e.g. Mahalanobis-style methods) improves KNN by…',
  choices: [
    'Learning from data how to stretch, shrink and rotate the space so that same-class points end up closer together',
    'Learning the best value of k for each query',
    'Replacing distance with the alphabetical order of labels',
    'Removing the need for training data',
    'Making all features binary'
  ],
  explain: 'Instead of hand-picking Euclidean vs Manhattan, metric learning fits the ruler itself: directions that separate classes get amplified, irrelevant directions get squashed. KNN then runs in the improved geometry.',
  widget: {
    type: 'metricSwitch', title: 'Fitting the ruler itself',
    world: 'A login-security system asks: is this new session more like the analyst\'s usual behaviour, or like the known intrusion? You\'ve seen that sliding the ruler flips the verdict. Now imagine not choosing this slider by hand — but letting the DATA choose it, by pulling same-class sessions together. That\'s the leap this widget points at.',
    classes: ['Legitimate', 'Intrusion'], xlab: 'typing speed', ylab: 'commands per min', queryLabel: 'new session',
    points: [
      { x: 6, y: 6, c: 0, name: 'usual session' },
      { x: 7.5, y: 3, c: 1, name: 'known intrusion' },
      { x: 8.5, y: 8.5, c: 0, name: 'late-night session' },
      { x: 1, y: 7.5, c: 1, name: 'bot probe' }
    ],
    query: {x:3,y:3},
    knob: { label: 'The ruler (city-block → straight-line)', min: 1, max: 2, step: 0.05, init: 1 },
    insights: [
      { max: 1.05, text: 'City-block ruler: the known intrusion is "nearest" — verdict: intrusion. But is this ruler RIGHT for login behaviour? Nobody checked.', tone: 'warn' },
      { max: 1.85, text: 'The verdict flips along this slider — proof that the ruler is a free parameter. So far you\'ve tuned it by hand between two presets. Presets are not the ceiling.', tone: 'info' },
      { max: 2, text: '🤯 The generalisation: let an algorithm LEARN the ruler — stretch axes that distinguish intruders, shrink axes that don\'t, even rotate. Same KNN afterwards, but running in a space engineered so that "close" MEANS "same class".', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Metric learning (Mahalanobis, LMNN, NCA)', formula: 'd(x, y) = √((x−y)ᵀ M (x−y)) — learn the matrix M from labels',
      text: 'The endpoint of everything this course said about scaling, weighting and metric choice: make the DATA pick the geometry. Modern face recognition is exactly this — deep embeddings + cosine KNN.' }
  }
},

/* H25 — 1-NN capacity / interpolation */
{
  q: '1-NN reaches zero training error on ANY dataset, even pure random labels. What does this tell us?',
  choices: [
    '1-NN has enormous capacity — training error says nothing about it; only held-out data can measure it',
    '1-NN is the best possible classifier',
    'Every dataset contains learnable structure',
    'Zero training error guarantees zero test error',
    'Random labels are easier to learn than real ones'
  ],
  explain: 'A model that can fit ANYTHING — including nonsense — gets no credit for fitting your data. High capacity makes training scores meaningless; generalisation must be measured out-of-sample.',
  widget: {
    type: 'trainTestK', title: 'The model that can memorise anything',
    world: 'A study-app predicts pass/fail. Secretly, two training labels are pure noise (data-entry errors). Circles: the 16 memorised students; squares: 10 new ones. Watch 1-NN "achieve" perfection on the left bar — then ask the right bar what that perfection was worth.',
    classes: ['Pass', 'Fail'], xlab: 'hours studied', ylab: 'lectures attended',
    train: [{x:2,y:2.6,c:1},{x:3,y:1.6,c:1},{x:1.4,y:4,c:1},{x:2.6,y:3.4,c:1},{x:3.8,y:2.4,c:1},{x:2.4,y:4.8,c:0},{x:4.2,y:4.2,c:1},{x:3.2,y:5.6,c:1},{x:7,y:7,c:0},{x:8.2,y:6,c:0},{x:6.4,y:8.2,c:0},{x:8.8,y:7.6,c:0},{x:7.6,y:6.6,c:1},{x:6,y:6.2,c:0},{x:5.4,y:5,c:0},{x:6.8,y:5.6,c:0}],
    test: [{x:2.2,y:4.4,c:1},{x:3,y:2.8,c:1},{x:1.8,y:3.2,c:1},{x:3.6,y:4.8,c:1},{x:2.8,y:5.2,c:1},{x:7.2,y:6.2,c:0},{x:6.2,y:7,c:0},{x:8,y:8,c:0},{x:5.8,y:5.6,c:0},{x:7.8,y:5.4,c:0}],
    knob: { label: 'Neighbours asked (k)', min: 1, max: 9, step: 2, init: 1 },
    insights: [
      { max: 1, text: '🤯 100% on seen data — including the two nonsense labels, faithfully memorised. A model that can fit noise perfectly earns ZERO credit for a perfect training score.', tone: 'wow' },
      { max: 5, text: 'Raising k forces the model to stop honouring individual (possibly nonsense) labels — training score drops, new-student score climbs. Capacity is being spent more wisely.', tone: 'info' },
      { max: 9, text: 'The principle: the more a model CAN memorise, the less its training performance MEANS. Judge high-capacity models (1-NN, deep nets) only on data they\'ve never seen.', tone: 'info' }
    ],
    extreme: { at: 'min' },
    reveal: { name: 'Capacity and the worthlessness of training error', formula: '1-NN training error ≡ 0 for any labelling → measure generalisation out-of-sample',
      text: 'This tiny observation about 1-NN foreshadows the central puzzle of deep learning: models that can interpolate anything, judged only by held-out performance.' }
  }
},

/* H26 — even k is fine with weights */
{
  q: '"Always use odd k" stops mattering once you switch to distance-weighted voting. Why?',
  choices: [
    'Weighted totals are real numbers that almost never come out exactly equal, so ties effectively vanish',
    'Weighted KNN only accepts even k',
    'Odd k becomes harmful with weights',
    'Weights force all votes to the same class',
    'It still matters exactly as much as before'
  ],
  explain: 'A 2–2 headcount tie is common; 1/0.83 + 1/2.9 exactly equalling 1/1.4 + 1/2.2 is a measure-zero coincidence. Continuous weights dissolve the tie problem that odd k existed to solve.',
  widget: {
    type: 'voteWeight', title: 'The tie that can\'t survive',
    world: 'Four neighbours, perfectly split 2–2: a genuine deadlock under counting. But their distances are all different — 0.8, 1.0, 1.2, 1.5 — and the moment votes carry ANY amount of distance-weight, "equal" becomes impossible. Nudge the knob just off zero.',
    classes: ['Genuine', 'Forgery'],
    neighbors: [
      { name: 'close genuine', d: 0.8, c: 0 },
      { name: 'mid genuine', d: 1.2, c: 0 },
      { name: 'close forgery', d: 1.0, c: 1 },
      { name: 'far forgery', d: 1.5, c: 1 }
    ],
    knob: { label: 'Weight exponent p (1/dᵖ)', min: 0, max: 4, step: 0.1, init: 0 },
    insights: [
      { max: 0.05, text: 'p = 0: a perfect 2–2 tie. Under plain voting this needs an arbitrary tie-break rule — exactly why "use odd k" became folklore.', tone: 'warn' },
      { max: 0.5, text: '🤯 One tick of weight and the deadlock is GONE — 50.0% vs 50.0% became 51-something vs 48-something. Real-valued totals essentially never collide exactly.', tone: 'wow' },
      { max: 4, text: 'Any p > 0 keeps it tie-free, and higher p just widens the margin. The odd-k rule was a patch for counting; weights fix the disease instead of the symptom.', tone: 'info' }
    ],
    extreme: { at: 0.3 },
    reveal: { name: 'Weights dissolve ties', formula: 'P(Σ 1/dᵖ ties exactly) ≈ 0 for continuous distances',
      text: 'Design lesson: replacing discrete counts with continuous scores removes whole categories of edge cases. "Odd k" survives as folklore; weighted voting is why practitioners stopped worrying.' }
  }
},

/* H27 — feature weighting generalises scaling */
{
  q: 'Multiplying one feature by a weight w before computing distances is equivalent to…',
  choices: [
    'Telling KNN that feature is w times more important when judging similarity',
    'Changing k by a factor of w',
    'Adding w new features to the dataset',
    'Removing that feature when w > 1',
    'Nothing — distances are unaffected by scaling one feature'
  ],
  explain: 'Distance treats one unit of every feature equally, so rescaling a feature by w rescales its influence by w (w² in squared terms). Scaling isn\'t just cleanup — it\'s an importance dial.',
  widget: {
    type: 'scaleFeature', title: 'Importance is a number you choose',
    world: 'A chess site matches you with sparring partners using rating and favourite-opening overlap. The site\'s designers believe rating matters MUCH more. Here\'s the twist: that belief is just a multiplier on one axis. Turn the knob and watch "your ideal partner" change with the designers\' opinion.',
    aName: 'opening overlap', bName: 'rating gap (weighted)',
    target: { name: 'you', a: 6, b: 1500 },
    cands: [
      { name: 'Ari · rating twin, diff openings', a: 1, b: 1520 },
      { name: 'Bea · similar all round', a: 5, b: 1580 },
      { name: 'Cal · same openings, weaker', a: 6.5, b: 1150 },
      { name: 'Dee · close rating, some overlap', a: 4, b: 1560 }
    ],
    knob: { label: 'Shrink rating\'s weight by', min: 0, max: 4, step: 0.25, init: 0 },
    insights: [
      { max: 0.5, text: 'Rating dominating: Ari — who plays completely different openings — is your "ideal partner" because the ratings match. The designers\' weighting made this choice, not the data.', tone: 'info' },
      { max: 2.5, text: 'Equal-ish importance: Bea (decent on both axes) takes the lead. Every position of this knob is a different THEORY of what makes players similar.', tone: 'info' },
      { max: 4, text: '🤯 Openings-only: now Cal, 350 points weaker, is "most similar". None of these rankings is wrong — each encodes a different importance judgement. Someone always chooses the weights; the question is whether they choose consciously.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Weighted distance (feature importance)', formula: 'd(x,y)² = Σ wᵢ² (xᵢ − yᵢ)² — scaling IS weighting',
      text: 'Standardisation sets all weights equal; domain knowledge (or metric learning, H24) sets them better. Every preprocessing choice you\'ve made in this course was secretly an importance decision.' }
  }
},

/* H28 — collaborative filtering is KNN */
{
  q: '"Users like you also bought…" recommendation systems are, at their core, running which algorithm?',
  choices: [
    'KNN — find the k users most similar to you and aggregate what they liked',
    'Linear regression on product prices',
    'A rules engine written by marketers',
    'K-means clustering of product images',
    'Alphabetical sorting of the catalogue'
  ],
  explain: 'User-based collaborative filtering IS KNN: distance = dissimilarity of rating/purchase histories, neighbours = look-alike users, prediction = aggregate of their choices.',
  widget: {
    type: 'scatterK', title: 'The algorithm behind "customers also bought"',
    world: 'A streaming service plots users by taste (sci-fi hours vs comedy hours); colours show who ended up loving the new release. You\'re the ◆. The "recommendation" for you is nothing more than the vote you\'re about to run — same slider, same lines, new billion-dollar industry.',
    classes: ['Loved the new show', 'Dropped it'], xlab: 'sci-fi hours', ylab: 'comedy hours',
    points: [{x:6.6,y:2.4,c:0},{x:7.8,y:3.2,c:0},{x:7.2,y:1.4,c:0},{x:8.6,y:2,c:0},{x:6,y:3.8,c:0},{x:2.4,y:7,c:1},{x:3.6,y:8,c:1},{x:1.6,y:6.2,c:1},{x:2.8,y:8.8,c:1},{x:4.2,y:6.6,c:1}],
    query: {x:5.6,y:4.4},
    knob: { label: 'Look-alike users consulted (k)', min: 1, max: 10, step: 1, init: 3 },
    insights: [
      { max: 4, text: 'Your taste-neighbours mostly loved it → recommend. That sentence, plus a distance function over viewing histories, is user-based collaborative filtering. All of it.', tone: 'info' },
      { max: 7, text: 'Real systems tweak the ingredients — cosine similarity on sparse rating vectors, weighted votes, millions of users via ANN search (H8) — but the skeleton is exactly this slider.', tone: 'info' },
      { max: 10, text: '🤯 At k = 10 you\'ve rediscovered the recommender failure mode too: ask EVERYONE and you recommend whatever\'s merely popular. Every KNN lesson from this course maps straight onto a production recommender issue.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'User-based collaborative filtering = KNN', formula: 'recommend(you) = aggregate(choices of k most similar users)',
      text: 'KNN concepts run the modern web: taste-distance, neighbourhood size, popularity bias, ANN at scale. You now know the algorithm behind the "For You" tab.' }
  }
},

/* H29 — noise level moves the optimal k */
{
  q: 'Dataset A has clean labels; dataset B is the same task with many mislabeled points. How should the best-performing k compare?',
  choices: [
    'B needs a larger k — more voters are required to outvote the more frequent noise',
    'Both need exactly the same k, since the task is the same',
    'B needs k = 1 to react quickly to the noise',
    'A needs the larger k, since clean data supports bigger votes',
    'k is irrelevant when labels are noisy'
  ],
  explain: 'Every mislabeled point is a saboteur in the jury pool. The dirtier the labels, the more honest voters you need per decision — the optimal k shifts right with noise.',
  widget: {
    type: 'kCurve', title: 'Dirty data demands bigger juries',
    world: 'A sentiment classifier trained on 16 reviews — FOUR of them mislabeled by a rushed annotator (25% noise!). Sweep k and study where the purple held-back curve finally recovers, compared to the cleaner datasets you\'ve seen (which peaked by k ≈ 3).',
    kmax: 16,
    train: [{x:2,y:2.6,c:0},{x:3,y:1.6,c:0},{x:1.4,y:4,c:0},{x:2.6,y:3.4,c:1},{x:3.8,y:2.4,c:0},{x:2.4,y:4.8,c:1},{x:4.2,y:4.2,c:0},{x:3.2,y:5.6,c:0},{x:7,y:7,c:1},{x:8.2,y:6,c:1},{x:6.4,y:8.2,c:1},{x:8.8,y:7.6,c:1},{x:7.6,y:6.6,c:0},{x:6,y:6.2,c:1},{x:5.4,y:5,c:1},{x:7,y:8.8,c:0}],
    val: [{x:2.2,y:4.4,c:0},{x:3,y:2.8,c:0},{x:1.8,y:3.2,c:0},{x:3.6,y:4.8,c:0},{x:2.8,y:5.2,c:0},{x:7.2,y:6.2,c:1},{x:6.2,y:7,c:1},{x:8,y:8,c:1},{x:5.8,y:5.6,c:1},{x:7.8,y:5.4,c:1}],
    knob: { label: 'Candidate k', min: 1, max: 16, step: 1, init: 1 },
    insights: [
      { max: 2, text: 'k = 1–2 on 25%-noisy labels: held-back score stuck around 70% — every fourth "advisor" is a saboteur, and tiny juries keep electing them.', tone: 'warn' },
      { max: 5, text: 'k = 3–5: partial recovery (90%), but unlike the cleaner datasets, the peak hasn\'t arrived yet — the noise is still winning some local votes.', tone: 'info' },
      { max: 15, text: '🤯 Full recovery only at k ≈ 6+: it takes that many honest voters to reliably outvote four saboteurs. Rule of thumb confirmed by your own thumb: noisier labels → bigger optimal k.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Noise level sets the optimal k', formula: 'more label noise → optimal k shifts higher (more smoothing needed)',
      text: 'The right k isn\'t a property of KNN — it\'s a property of YOUR data\'s noise level. This is why no lookup table for k exists and why validation curves must be re-run per dataset.' }
  }
},

/* H30 — the full production recipe */
{
  q: 'A production-grade KNN system is being built from scratch. Which ordering of steps is correct?',
  choices: [
    'Clean & encode features → scale (fit on train only) → select/reduce features → tune k, metric and weights on validation folds → add an ANN index for serving',
    'Tune k first → then scale features → then decide what the features are',
    'Add an ANN index → tune k on the training score → skip scaling if accuracy looks fine',
    'Select features using the test set → scale everything together → deploy with k = 3',
    'Scale the test set first → tune the metric on training accuracy → drop validation to save time'
  ],
  explain: 'Foundations before tuning, tuning before serving: features must exist and be scaled before distances mean anything; hyperparameters are chosen on validation data; the index is a serving optimisation added last.',
  widget: {
    type: 'kCurve', title: 'The final dress rehearsal',
    world: 'Everything in one picture: a properly built pipeline (encoded, scaled, feature-selected data; honest validation split) doing its LAST step — choosing k before the ANN index gets bolted on for serving. You\'ve used every part of this machine across 90 questions. Run the final sweep.',
    kmax: 16,
    train: [{x:2,y:2.6,c:0},{x:3,y:1.6,c:0},{x:1.4,y:4,c:0},{x:2.6,y:3.4,c:0},{x:3.8,y:2.4,c:0},{x:2.4,y:4.8,c:1},{x:4.2,y:4.2,c:0},{x:3.2,y:5.6,c:0},{x:7,y:7,c:1},{x:8.2,y:6,c:1},{x:6.4,y:8.2,c:1},{x:8.8,y:7.6,c:1},{x:7.6,y:6.6,c:0},{x:6,y:6.2,c:1},{x:5.4,y:5,c:1},{x:6.8,y:5.6,c:1}],
    val: [{x:2.2,y:4.4,c:0},{x:3,y:2.8,c:0},{x:1.8,y:3.2,c:0},{x:3.6,y:4.8,c:0},{x:2.8,y:5.2,c:0},{x:7.2,y:6.2,c:1},{x:6.2,y:7,c:1},{x:8,y:8,c:1},{x:5.8,y:5.6,c:1},{x:7.8,y:5.4,c:1}],
    knob: { label: 'Final choice: k', min: 1, max: 16, step: 1, init: 1 },
    insights: [
      { max: 1, text: 'The gap at k = 1 (perfect blue, weaker purple): overfitting — you can now diagnose it on sight. Slide on.', tone: 'info' },
      { max: 11, text: 'The plateau: pick k here, note the score you expect in production, and remember it was measured on data the model never saw. Scaling happened BEFORE this chart existed — it had to.', tone: 'info' },
      { max: 16, text: '🤯 And the cliff at k = n: the majority-class collapse where this course began. Foundations → practice → production: you\'ve derived every piece of this system by dragging sliders. That\'s the whole topic.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'The KNN production recipe', formula: 'encode → scale (train-fit) → select features → tune {k, metric, weights} on CV → serve via ANN index',
      text: 'Each stage exists because of a failure you\'ve personally triggered: unscaled features, junk dimensions, k=1 memorisation, k=n collapse, slow queries. That\'s the deepest way to know an algorithm. Topic complete. 🎓' }
  }
}
];
