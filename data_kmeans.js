/* K-Means — Part I: Foundations. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).kmeans1 = [
  {
    "q": "You have 10,000 customers and NO labels of any kind. Clustering promises to 'find the groups'. What is it actually looking for?",
    "choices": [
      "Sets of points that sit close together, far from other sets",
      "The hidden true labels",
      "The best decision boundary",
      "The most profitable customers",
      "Outliers to delete"
    ],
    "explain": "With no labels there is nothing to predict — only structure to discover. Clustering formalises 'group' as geometry: points near each other, separated from other groups. Whether those groups MEAN anything is your job afterwards.",
    "simple": "Supervised learning is marking homework against an answer key. Clustering has no answer key — it just notices that the dots on the map form huddles, and draws a circle round each huddle. What the huddles mean (students? bargain-hunters?) is for you to interpret.",
    "widget": {
      "type": "kmeansStep",
      "title": "Finding huddles with no answer key",
      "world": "Customers plotted by spend and visit frequency — no labels anywhere. Step the algorithm and watch it invent groups from geometry alone.",
      "xlab": "monthly spend",
      "ylab": "visits per month",
      "k": 3,
      "seed": 9,
      "maxIter": 6,
      "points": [
        { "x": 1.5, "y": 2 },
        { "x": 2.2, "y": 1.4 },
        { "x": 1, "y": 3 },
        { "x": 2.6, "y": 2.6 },
        { "x": 1.8, "y": 2.2 },
        { "x": 5.2, "y": 8 },
        { "x": 6, "y": 8.6 },
        { "x": 5.6, "y": 7.2 },
        { "x": 6.6, "y": 7.8 },
        { "x": 6.2, "y": 8.9 },
        { "x": 8.4, "y": 2.6 },
        { "x": 9, "y": 3.4 },
        { "x": 8, "y": 3.8 },
        { "x": 9.4, "y": 2.2 },
        { "x": 8.8, "y": 1.6 }
      ],
      "knob": { "label": "Algorithm step", "min": 0, "max": 6, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Step 0: the three diamond 'centres' were dropped at random. The colours mean nothing yet — no labels exist, remember.", "tone": "info" },
        { "max": 3, "text": "Watch the centres migrate into the natural huddles and the colours settle. Nobody told the algorithm what a 'customer type' is — geometry did all the talking.", "tone": "info" },
        { "max": 6, "text": "🤯 Converged: three tidy groups, discovered from raw positions alone. Naming them — 'big spenders', 'regulars', 'occasional' — is where the human comes back in.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Clustering (unsupervised learning)", "formula": "no labels → find groups where within-group distances are small, between-group large", "text": "The defining move of unsupervised learning: structure out, meaning added by you. Every algorithm in this topic is a different definition of 'huddle'." }
    }
  },
  {
    "q": "K-means repeats two moves until nothing changes. Which two?",
    "choices": [
      "Assign each point to its nearest centre, then move each centre to its group's mean",
      "Split the biggest cluster, then merge the smallest",
      "Pick k random points, then delete the outliers",
      "Sort points by density, then cut the tree",
      "Rotate the axes, then project the points"
    ],
    "explain": "That's the whole algorithm: assignment step (points choose their closest centroid), update step (each centroid jumps to the average of its members). Loop until assignments stop changing.",
    "simple": "Imagine three pizza vans parking in a town. Every household walks to its nearest van; then each van moves to the middle of its own crowd; repeat. After a few rounds nobody switches vans and the vans stop moving — that's k-means, converged.",
    "widget": {
      "type": "kmeansStep",
      "title": "Pizza vans finding their crowds",
      "world": "Households and three vans (diamonds). Each step: households pick their nearest van, then vans re-park at the centre of their crowd. Step through to convergence.",
      "xlab": "east–west",
      "ylab": "north–south",
      "k": 3,
      "seed": 3,
      "maxIter": 7,
      "points": [
        { "x": 1.2, "y": 7.4 },
        { "x": 2, "y": 8.2 },
        { "x": 1.6, "y": 6.6 },
        { "x": 2.6, "y": 7.8 },
        { "x": 2.4, "y": 6.9 },
        { "x": 4.8, "y": 2 },
        { "x": 5.6, "y": 1.4 },
        { "x": 5, "y": 3 },
        { "x": 6.2, "y": 2.4 },
        { "x": 5.8, "y": 3.2 },
        { "x": 8, "y": 7 },
        { "x": 8.8, "y": 7.8 },
        { "x": 8.2, "y": 6.2 },
        { "x": 9.2, "y": 6.8 },
        { "x": 8.6, "y": 8.4 }
      ],
      "knob": { "label": "Algorithm step", "min": 0, "max": 7, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "First assignment: some households are clearly walking to the 'wrong' van — the random start put a van nowhere near its eventual crowd.", "tone": "info" },
        { "max": 4, "text": "Each round: crowds re-choose, vans re-park. Two simple moves, alternating — there is genuinely nothing else in the algorithm.", "tone": "info" },
        { "max": 7, "text": "🤯 Converged: re-running the two moves changes nothing. Assign-then-update is guaranteed to settle, because each move can only reduce the total walking distance.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Lloyd's algorithm (k-means)", "formula": "repeat: assign points to nearest centroid → move centroid to members' mean", "text": "Two moves, looped. Simple enough to memorise, fast enough for millions of points — which is why it's everyone's first clusterer." }
    }
  },
  {
    "q": "Watch k-means' inertia — the total squared distance from points to their centres — across the steps. What does it do, and why does that matter?",
    "choices": [
      "It only ever falls, which guarantees the loop settles",
      "It rises then falls",
      "It oscillates forever on some data",
      "It is constant after step one",
      "It tracks the number of clusters"
    ],
    "explain": "Both moves can only lower inertia: switching to a nearer centre lowers it, and the mean is the point that minimises a group's squared distances. A quantity that only falls and is bounded below must stop changing — convergence, proved in one sentence.",
    "simple": "Inertia is the total 'walking distance' in the pizza-van town. Every re-choice shortens someone's walk; every re-park shortens the crowd's total. A number that can only shrink can't shrink forever — so the shuffling must eventually stop. That's why k-means never loops endlessly.",
    "widget": {
      "type": "kmeansStep",
      "title": "The number that only falls",
      "world": "Same two moves — but this time keep your eyes on the inertia readout below. Predict before each step: can it ever go up?",
      "xlab": "feature 1",
      "ylab": "feature 2",
      "k": 3,
      "seed": 11,
      "maxIter": 7,
      "points": [
        { "x": 2, "y": 2.4 },
        { "x": 2.8, "y": 1.6 },
        { "x": 1.4, "y": 3 },
        { "x": 3.2, "y": 2.8 },
        { "x": 2.2, "y": 3.4 },
        { "x": 5, "y": 7.6 },
        { "x": 5.8, "y": 8.4 },
        { "x": 5.4, "y": 6.8 },
        { "x": 6.4, "y": 7.4 },
        { "x": 6, "y": 8.8 },
        { "x": 8.6, "y": 3.4 },
        { "x": 9.2, "y": 4.2 },
        { "x": 8.2, "y": 4.6 },
        { "x": 9.6, "y": 3 },
        { "x": 9, "y": 2.4 }
      ],
      "knob": { "label": "Algorithm step", "min": 0, "max": 7, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "A big first drop: the random centres were terrible, so the first re-assignment saves a lot of 'walking'.", "tone": "info" },
        { "max": 4, "text": "Diminishing drops — later steps fine-tune. But check the direction: down, down, down. Never up.", "tone": "info" },
        { "max": 7, "text": "🤯 Flat: converged. A monotonically falling, bounded number is mathematics' favourite convergence proof — and k-means rides it every single run.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Inertia and guaranteed convergence", "formula": "inertia = Σ ‖point − its centroid‖² — both k-means moves can only decrease it", "text": "Convergence is guaranteed; convergence to the BEST answer is not — it settles into whichever valley the random start rolled toward. That caveat is the next exercises' whole story." }
    }
  },
  {
    "q": "K-means needs k chosen in advance. You plot inertia for k = 1…8 and look for the 'elbow'. What are you actually looking for?",
    "choices": [
      "The k where extra clusters stop buying much inertia — diminishing returns",
      "The k with the lowest inertia (always the biggest k)",
      "The k where inertia is highest",
      "The k equal to half the data size",
      "Any odd k"
    ],
    "explain": "Inertia ALWAYS falls as k grows (more centres = shorter distances), hitting zero at k = n. So you can't minimise it. The elbow marks where real structure is exhausted and further clusters just subdivide genuine groups.",
    "simple": "More pizza vans always shortens walks — with a van per house, walks are zero. So 'fewest total steps' is a rigged question. Instead ask: when did adding a van stop helping MUCH? The bend in the curve — the elbow — marks where the town's real neighbourhoods ran out.",
    "widget": {
      "type": "curveStatic",
      "title": "Hunting the elbow",
      "world": "Inertia for k = 1 to 8 on data with three true groups. Slide along the curve and find where the returns go from dramatic to decorative.",
      "xlab": "k (number of clusters)",
      "xs": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "inertia", "ys": [ 420, 205, 95, 78, 66, 58, 52, 47 ] }
      ],
      "knob": { "label": "k", "min": 0, "max": 7, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "k=1→2: inertia halves. k=2→3: halves again. These clusters are earning their keep — each one claims a real group.", "tone": "info" },
        { "max": 2, "text": "🤯 k=3→4 buys almost nothing — the bend. Three real groups existed; the fourth cluster could only split a genuine group in half. The elbow points at 3.", "tone": "wow" },
        { "max": 7, "text": "After the elbow, the curve just drifts down forever — that's arithmetic, not structure. (The silhouette score is the elbow's more decisive cousin when the bend is vague.)", "tone": "info" }
      ],
      "extreme": { "at": 2 },
      "reveal": { "name": "The elbow method", "formula": "plot inertia vs k → pick the bend where marginal gains collapse", "text": "Choosing k is a judgement call informed by curves, not an answer the data hands you. Elbow and silhouette are the two standard advisers." }
    }
  },
  {
    "q": "You run k-means with k=2 on two crescent-moon shaped groups. It cuts straight across both moons. What did k-means assume that this data violates?",
    "choices": [
      "Clusters are round-ish blobs around a central point",
      "Clusters must have equal sizes",
      "Data must be labelled",
      "Points must be positive",
      "There are always exactly three clusters"
    ],
    "explain": "K-means assigns by distance-to-centre, so its clusters are always convex, blob-shaped territories (Voronoi cells). A crescent has no meaningful centre — its own midpoint lies OUTSIDE the shape — so centre-based logic slices it apart.",
    "simple": "K-means thinks every group is a crowd standing around a flagpole. A crescent moon isn't — its 'flagpole' would stand in empty space off the shape. So k-means plants two poles and splits the moons sideways, confidently and completely wrong. Wrong assumption, wrong answer, no error message.",
    "widget": {
      "type": "kmeansStep",
      "title": "The flagpole fallacy",
      "world": "Two crescents, k = 2. Step to convergence and study the final colouring: does it respect the moons — or the flagpoles?",
      "xlab": "feature 1",
      "ylab": "feature 2",
      "k": 2,
      "seed": 4,
      "maxIter": 6,
      "points": [
        { "x": 2, "y": 6 },
        { "x": 2.8, "y": 6.8 },
        { "x": 3.7, "y": 7.2 },
        { "x": 4.6, "y": 7.3 },
        { "x": 5.5, "y": 7 },
        { "x": 6.3, "y": 6.4 },
        { "x": 7, "y": 5.6 },
        { "x": 3.5, "y": 3.9 },
        { "x": 4.3, "y": 3.3 },
        { "x": 5.2, "y": 3 },
        { "x": 6.1, "y": 3 },
        { "x": 7, "y": 3.3 },
        { "x": 7.8, "y": 3.9 },
        { "x": 8.5, "y": 4.7 }
      ],
      "knob": { "label": "Algorithm step", "min": 0, "max": 6, "step": 1, "init": 0 },
      "insights": [
        { "max": 3, "text": "The centres settle where the AVERAGE positions are — which, for crescents, is nowhere useful. Watch the colours ignore the shapes.", "tone": "warn" },
        { "max": 6, "text": "🤯 Converged — and wrong: each 'cluster' contains half of BOTH moons. Inertia is happily minimised; the geometry assumption was simply false. Algorithms don't warn you when their worldview doesn't fit.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "K-means' blob assumption", "formula": "distance-to-centre assignment ⇒ convex, round-ish clusters only", "text": "Every clusterer has a definition of 'group' baked in. K-means: crowds around flagpoles. For shapes, chains and rings you need a density thinker — DBSCAN, three exercises away." }
    }
  },
  {
    "q": "Run k-means five times with different random starts and you get five different answers, some clearly worse. What's the standard defence?",
    "choices": [
      "Multiple restarts (and k-means++ seeding), keeping the lowest-inertia run",
      "Always use the first run",
      "Increase k until runs agree",
      "Sort the data first",
      "Use a smaller learning rate"
    ],
    "explain": "K-means converges to a LOCAL optimum — whichever valley the random start rolls into. Restarting from many seeds and keeping the best inertia (sklearn's n_init) plus smarter seeding (k-means++) makes bad valleys rare.",
    "simple": "Drop a marble on a bumpy landscape and it settles in the nearest dip — not necessarily the deepest one. So drop ten marbles from ten spots and keep the deepest result. k-means++ goes further: it picks starting spots spread far apart, so the marbles begin near the right dips.",
    "widget": {
      "type": "curveStatic",
      "title": "Ten marbles beat one",
      "world": "Final inertia from five random starts, plus k-means++ seeding. Lower is better. Slide across the runs and see how much start-luck was worth.",
      "xlab": "run",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "labels": [
        "seed 1",
        "seed 2",
        "seed 3",
        "seed 4",
        "seed 5",
        "k-means++"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "final inertia (lower = better)", "ys": [ 96, 142, 98, 178, 101, 95 ] }
      ],
      "knob": { "label": "Run", "min": 0, "max": 5, "step": 1, "init": 0 },
      "insights": [
        { "max": 3, "text": "Seeds 2 and 4 settled in bad valleys — one start put two centres inside the same true group and the run never recovered. Same data, same k, 85% worse answer.", "tone": "warn" },
        { "max": 4, "text": "Three of five random runs found the good valley (~96–101). Restarting and keeping the best makes the bad-valley risk vanish exponentially.", "tone": "info" },
        { "max": 5, "text": "🤯 k-means++ hit the best answer in ONE run — its trick is starting centres spread far apart. sklearn does both defences by default (init='k-means++', n_init=10). Now you know why.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Local optima, restarts & k-means++", "formula": "run n_init times from k-means++ seeds → keep lowest inertia", "text": "Guaranteed convergence ≠ guaranteed good answer. Cheap insurance — many starts, smart seeding — is baked into every serious implementation." }
    }
  },

{
  q: "Inertia always falls as k grows, so it can't choose k by itself. The silhouette score can. What does a point's silhouette actually compare?",
  choices: ["Its average distance to its OWN cluster vs to the NEAREST OTHER cluster — so the score peaks at good k instead of always falling", "Its distance to the global mean", "The cluster's size vs the biggest cluster", "Inertia before vs after adding a cluster", "Its distance to the two nearest centroids"],
  explain: "silhouette = (b − a) / max(a, b), where a = mean distance to own cluster-mates and b = mean distance to the nearest foreign cluster. Near +1: snug at home, far from the neighbours. Near 0: sitting on a border. Negative: probably mis-assigned. Because it rewards separation as well as tightness, splitting a genuine cluster in two HURTS the score — which is exactly why it peaks where inertia just keeps sliding.",
  simple: "Ask every point two questions: 'how close are you to your own gang?' and 'how close is the next-nearest gang?'. A happy point is snug among its own AND far from the rivals. Split a real gang in half and its members are suddenly suspiciously close to a 'rival' — the score drops. That built-in penalty for over-splitting is what inertia lacks.",
  widget: {
    type: "curveStatic", title: "The score that's allowed to say 'worse'",
    world: "A dataset with three natural groups, clustered at k = 2…8. Inertia falls forever; watch what the silhouette does instead.",
    xlab: "k (clusters asked for) →", xs: [0,1,2,3,4,5], labels: ["2","3","4","5","6","8"], dec: 0, yunit: "",
    series: [
      { name: "silhouette ×100",      ys: [55, 71, 62, 48, 41, 33] },
      { name: "inertia (scaled)",     ys: [82, 55, 40, 31, 25, 18] }
    ],
    knob: { label: "k", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 0, text: "k=2: two natural groups got welded together — points in the welded pair sit far from their own 'cluster-mates', and silhouette feels it.", tone: "info" },
      { max: 1, text: "k=3: silhouette peaks at 71 — everyone snug at home, rivals far away. Inertia meanwhile just says 'less than k=2', as it would for ANY increase.", tone: "info" },
      { max: 5, text: "🤯 From k=4 on, silhouette FALLS while inertia keeps rewarding the split: carving real clusters puts members near 'foreign' points that were their gang-mates a moment ago. A score that can go down is a score that can choose.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Silhouette score", formula: "s = (b − a) / max(a, b) · a = own-cluster dist, b = nearest-other dist",
      text: "sklearn.metrics.silhouette_score. Peaks at good k, flags borderline points (s≈0) and mis-assignments (s<0). Costs O(n²) distances — sample on big data." }
  }
},

{
  q: "You cluster customers on age (18–70) and income (£15k–£150k) without scaling. What has k-means silently done with these two features?",
  choices: ["Income's huge numeric range dominates every distance — the clusters are income bands with age effectively ignored", "Both features contribute equally by definition", "Age dominates because it comes first", "k-means auto-normalises internally", "The clusters fail to converge"],
  explain: "k-means lives entirely on Euclidean distance, and a £30k income gap contributes (30000)² to the squared distance while a 30-year age gap contributes (30)² — a million times less. Whatever feature has the biggest units OWNS the clustering. StandardScaler before KMeans is not a nicety; it decides what 'similar customers' even means.",
  simple: "Distance adds up feature differences, and income differences are numbers in the tens of thousands while age differences are two digits. It's shouting versus whispering: the algorithm literally cannot hear age. Scale both features to comparable ranges first — otherwise you haven't chosen your clustering, your UNITS have.",
  widget: {
    type: "scaleFeature", title: "The feature that shouts",
    world: "One target customer and four candidates. Who counts as their 'nearest' fellow customer? Shrink income's units step by step and watch the answer change hands.",
    aName: "age", bName: "income",
    target: { name: "customer X", a: 30, b: 40000 },
    cands: [
      { name: "match A · 31y, £41k", a: 31, b: 41000 },
      { name: "match B · 62y, £40.5k", a: 62, b: 40500 },
      { name: "match C · 29y, £47k", a: 29, b: 47000 },
      { name: "match D · 33y, £55k", a: 33, b: 55000 }
    ],
    knob: { label: "Shrink income units by", min: 0, max: 4, step: 0.25, init: 0 },
    insights: [
      { max: 0.5, text: "Raw units: match B — a 62-year-old! — ranks as most similar to our 30-year-old, because their incomes differ by only £500. Age was inaudible.", tone: "warn" },
      { max: 2.5, text: "Shrinking income's units, age starts getting a vote — the ranking reshuffles even though not a single customer changed.", tone: "info" },
      { max: 4, text: "🤯 Fully rebalanced, match A (31y, £41k) wins — the genuinely similar person. Every k-means centroid and boundary is built from this same distance, so scaling silently decides ALL of it.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Scaling before k-means", formula: "StandardScaler → each feature contributes comparably to distance",
      text: "Any distance-based method (k-means, kNN, DBSCAN, SVM-RBF) inherits this. Pipeline(StandardScaler(), KMeans(...)) should be muscle memory." }
  }
},

{
  q: "Clustering 10 million rows, full k-means grinds. MiniBatchKMeans finishes in minutes with near-identical clusters. What corner does it cut?",
  choices: ["Each iteration updates centroids using a small random batch instead of every point — tiny quality loss, huge speed-up", "It clusters only the first million rows", "It reduces the data to 2-D first", "It merges similar clusters early", "It skips convergence checking"],
  explain: "Lloyd's algorithm touches all n points every iteration. MiniBatchKMeans samples a batch (say 1,024 rows), assigns just those, and nudges the affected centroids toward them with a decaying per-centroid learning rate. Each step is noisier but thousands of times cheaper, and over many steps the noise averages out — inertia typically lands within a percent or two of full k-means.",
  simple: "To find the average opinion of a city you don't interview everyone every day — you poll. Each small random batch tugs the centroids roughly the right way; the tugs are individually sloppy but their errors cancel over hundreds of batches. You trade a sliver of polish for a massive speed-up, which is often the difference between 'runs' and 'doesn't'.",
  widget: {
    type: "curveStatic", title: "Polling instead of a census",
    world: "Full k-means vs MiniBatchKMeans as the dataset grows: speed-up factor and how much worse the minibatch clusters actually are.",
    xlab: "dataset size →", xs: [0,1,2,3,4], labels: ["10k","100k","1M","10M","100M"], dec: 1, yunit: "",
    series: [
      { name: "speed-up (×)",                 ys: [3, 8, 20, 45, 70] },
      { name: "inertia gap vs full (%)",      ys: [0.4, 0.6, 0.9, 1.3, 1.8] }
    ],
    knob: { label: "Dataset size", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "At 10k rows the speed-up is modest and full k-means is comfortable — no reason to poll when the census is cheap.", tone: "info" },
      { max: 2, text: "At a million rows: 20× faster for under 1% worse inertia. The batches' noisy tugs have averaged into essentially the same centroids.", tone: "info" },
      { max: 4, text: "🤯 100M rows: 70× faster, 1.8% worse — and the honest comparison isn't 'slightly worse clusters', it's 'clusters vs no clusters', because the full run stopped fitting in the night. Stochastic beats exact when exact doesn't finish.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "MiniBatchKMeans", formula: "per batch: assign, then nudge centroids with a decaying learning rate",
      text: "sklearn.cluster.MiniBatchKMeans(batch_size=1024). The same stochastic-approximation idea that powers SGD in deep learning, applied to Lloyd's algorithm." }
  }
},

{
  q: "A 16-million-colour photo is squeezed to 16 colours using k-means, and it still looks surprisingly good. What is the compression scheme?",
  choices: ["Cluster all pixel colours, keep only the 16 centroid colours, and store each pixel as a 4-bit cluster id", "Delete every second pixel", "Store colour differences between neighbours", "Blur then sharpen the image", "Keep the 16 commonest original colours"],
  explain: "Each pixel is a point in 3-D colour space. k=16 k-means finds the 16 colours that best represent the photo's actual palette (better than the 16 most frequent — centroids cover the space), then every pixel stores just its cluster index: 4 bits instead of 24, plus a 16-colour codebook. This is vector quantization — the same replace-each-point-with-its-centroid idea behind classic codecs and modern embedding-index compression.",
  simple: "The photo uses millions of colours, but MOST are near-duplicates — thirty shades of the same sky blue. k-means finds the 16 shades that stand in best for everyone, then each pixel just points at its nearest stand-in: 'I'm a number 7'. A pointer to a shade is far smaller than the shade itself. That's compression by clustering: keep the representatives, discard the crowd.",
  widget: {
    type: "curveStatic", title: "How many shades does a photo need?",
    world: "The same photo quantised with k = 2…256 colours: visual quality against file size. Find where the eye stops noticing.",
    xlab: "k (palette colours kept) →", xs: [0,1,2,3,4], labels: ["2","8","16","64","256"], dec: 0, yunit: "",
    series: [
      { name: "visual quality (0–100)",   ys: [38, 72, 85, 94, 98] },
      { name: "file size (% of original)", ys: [4, 13, 17, 25, 33] }
    ],
    knob: { label: "Palette size k", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "k=2: every pixel snapped to one of two colours — a woodcut print. The codebook is too small for the photo's real variety.", tone: "info" },
      { max: 2, text: "k=16: 85% quality at 17% of the size. The centroids landed on the photo's true palette — skies, skin, shadows — because that's where the pixel-points cluster.", tone: "info" },
      { max: 4, text: "🤯 k=256 is nearly indistinguishable at a third of the size. The exact same trick — replace vectors with their centroid's id — now compresses LLM embeddings in vector databases. 1960s idea, 2020s workload.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Vector quantization", formula: "store: k centroids (codebook) + per point its centroid id",
      text: "k-means as compression: centroids = codebook, assignments = the data. Image palettes, audio codecs, and product-quantized vector search all run on it." }
  }
},

{
  q: "A colleague one-hot encodes city, favourite brand and subscription tier, then runs k-means. The clusters come out as mush. What's structurally wrong?",
  choices: ["Averaging one-hot vectors gives meaningless 'means' (a centroid that's 0.3 London, 0.4 Paris) — k-means needs a space where means make sense; use k-modes or embeddings", "k cannot exceed the number of cities", "One-hot values are too small for distances", "k-means only accepts two features", "Nothing — more iterations will fix it"],
  explain: "k-means alternates 'assign to nearest centroid' with 'set centroid = MEAN of members'. The mean of one-hot rows isn't a valid category — it's a fractional ghost, and distances to ghosts barely separate anyone (any two different cities are the same √2 apart). k-modes swaps means for modes and Hamming distance for Euclidean; alternatives: Gower distance, k-prototypes for mixed data, or learned embeddings that give categories a genuine geometry.",
  simple: "k-means' core move is taking averages. What's the average of London, Paris and Tokyo? There isn't one — and the algorithm's answer ('0.3 London + 0.4 Paris + 0.3 Tokyo') is a place nobody lives. Every centroid becomes such a ghost, every distance-to-ghost is equally bland, and the clusters turn to mush. Categorical data needs a method whose core move makes sense for categories — voting for the most common value, not averaging.",
  widget: {
    type: "curveStatic", title: "The average of London and Paris",
    world: "Datasets blending numeric and one-hot categorical features, clustered by vanilla k-means vs k-prototypes (means for numbers, modes for categories). Slide the categorical share up.",
    xlab: "share of features that are categorical →", xs: [0,1,2,3,4], labels: ["0%","25%","50%","75%","100%"], dec: 0, yunit: "%",
    series: [
      { name: "k-prototypes cluster quality", ys: [80, 78, 76, 74, 72] },
      { name: "vanilla k-means quality",      ys: [82, 71, 60, 48, 35] }
    ],
    knob: { label: "Categorical share", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "All-numeric: vanilla k-means is at home — means are meaningful, and it even edges ahead of the hybrid.", tone: "info" },
      { max: 2, text: "Half categorical: k-means has slid 22 points. Its centroids are now half-ghost — fractional cities that separate nobody.", tone: "warn" },
      { max: 4, text: "🤯 All categorical: k-means at 35 is barely above random, while k-modes-style clustering holds at 72. The lesson generalises: an algorithm's core operation (here, the MEAN) must be meaningful for your data type, or the whole method quietly voids.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "k-means and categorical data", formula: "centroid = mean ⇒ needs continuous space · categories ⇒ k-modes / k-prototypes / Gower / embeddings",
      text: "One-hot + k-means also makes all unequal category pairs equidistant (√2) — no gradation of similarity. Mixed data: k-prototypes; rich data: learn embeddings, then cluster those." }
  }
},

{
  q: "Beyond exploration, k-means has a workhorse use INSIDE supervised pipelines: fit clusters, then hand the classifier extra columns. Which columns, and why do they help?",
  choices: ["The cluster id and/or distances to each centroid — unsupervised structure becomes features a simple model can exploit", "The inertia value repeated per row", "Random noise to prevent overfitting", "The value of k as a constant column", "A copy of the label leaked from training"],
  explain: "Fit KMeans on the training features (labels never involved), then append transform() outputs: distance-to-each-centroid (k new continuous features) and/or the cluster id. A linear model can't carve 'suburban families vs urban singles' from raw coordinates, but given distances to those discovered prototypes, the segments become linearly separable. Fit inside the CV fold like any transformer to avoid leakage across folds.",
  simple: "The clusters found in your customer data are real structure — segments that exist whether or not anyone labels them. Telling the classifier 'this row belongs to segment 3, and here's how far it sits from every segment's centre' hands it a map it could never draw itself if it's a simple model. Unsupervised learning here isn't the destination; it's a feature factory for the supervised step.",
  widget: {
    type: "curveStatic", title: "Clusters as a feature factory",
    world: "A logistic regression on a segmented customer dataset, fed increasingly rich k-means-derived features. Same classifier, same raw data — only the added columns change.",
    xlab: "features handed to the classifier →", xs: [0,1,2,3], labels: ["raw only","+ cluster id","+ centroid dists","+ both"], dec: 1, yunit: "%",
    series: [
      { name: "validation accuracy", ys: [84, 86.5, 88.2, 88.7] }
    ],
    knob: { label: "Feature set", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Raw features only: the linear model can't bend around the customer segments — 84% is its ceiling on this geometry.", tone: "info" },
      { max: 1, text: "Adding the cluster id: +2.5 points. One categorical column just told the model which discovered segment each row lives in.", tone: "info" },
      { max: 3, text: "🤯 Distances to all centroids add nearly 2 more — richer than the id alone, because 'how close to segment 3' carries gradation, not just membership. KMeans.transform() exists precisely for this. Fit it inside the fold, or the distances leak.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Cluster features for supervised models", formula: "KMeans.transform(X) → k distance columns · labels never touched",
      text: "A classic tabular trick: prototypes make non-linear structure linearly reachable. Same pattern powers RBF networks and modern retrieval-augmented features." }
  }
}
];
