/* Clustering — Part I: Foundations. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).clust1 = [

{
  q: "You have 10,000 customers and NO labels of any kind. Clustering promises to 'find the groups'. What is it actually looking for?",
  choices: ["Sets of points that sit close together, far from other sets", "The hidden true labels", "The best decision boundary", "The most profitable customers", "Outliers to delete"],
  explain: "With no labels there is nothing to predict — only structure to discover. Clustering formalises 'group' as geometry: points near each other, separated from other groups. Whether those groups MEAN anything is your job afterwards.",
  simple: "Supervised learning is marking homework against an answer key. Clustering has no answer key — it just notices that the dots on the map form huddles, and draws a circle round each huddle. What the huddles mean (students? bargain-hunters?) is for you to interpret.",
  widget: {
    type: "kmeansStep", title: "Finding huddles with no answer key",
    world: "Customers plotted by spend and visit frequency — no labels anywhere. Step the algorithm and watch it invent groups from geometry alone.",
    xlab: "monthly spend", ylab: "visits per month", k: 3, seed: 9, maxIter: 6,
    points: [{x:1.5,y:2},{x:2.2,y:1.4},{x:1,y:3},{x:2.6,y:2.6},{x:1.8,y:2.2},{x:5.2,y:8},{x:6,y:8.6},{x:5.6,y:7.2},{x:6.6,y:7.8},{x:6.2,y:8.9},{x:8.4,y:2.6},{x:9,y:3.4},{x:8,y:3.8},{x:9.4,y:2.2},{x:8.8,y:1.6}],
    knob: { label: "Algorithm step", min: 0, max: 6, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Step 0: the three diamond 'centres' were dropped at random. The colours mean nothing yet — no labels exist, remember.", tone: "info" },
      { max: 3, text: "Watch the centres migrate into the natural huddles and the colours settle. Nobody told the algorithm what a 'customer type' is — geometry did all the talking.", tone: "info" },
      { max: 6, text: "🤯 Converged: three tidy groups, discovered from raw positions alone. Naming them — 'big spenders', 'regulars', 'occasional' — is where the human comes back in.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Clustering (unsupervised learning)", formula: "no labels → find groups where within-group distances are small, between-group large",
      text: "The defining move of unsupervised learning: structure out, meaning added by you. Every algorithm in this topic is a different definition of 'huddle'." }
  }
},

{
  q: "K-means repeats two moves until nothing changes. Which two?",
  choices: ["Assign each point to its nearest centre, then move each centre to its group's mean", "Split the biggest cluster, then merge the smallest", "Pick k random points, then delete the outliers", "Sort points by density, then cut the tree", "Rotate the axes, then project the points"],
  explain: "That's the whole algorithm: assignment step (points choose their closest centroid), update step (each centroid jumps to the average of its members). Loop until assignments stop changing.",
  simple: "Imagine three pizza vans parking in a town. Every household walks to its nearest van; then each van moves to the middle of its own crowd; repeat. After a few rounds nobody switches vans and the vans stop moving — that's k-means, converged.",
  widget: {
    type: "kmeansStep", title: "Pizza vans finding their crowds",
    world: "Households and three vans (diamonds). Each step: households pick their nearest van, then vans re-park at the centre of their crowd. Step through to convergence.",
    xlab: "east–west", ylab: "north–south", k: 3, seed: 3, maxIter: 7,
    points: [{x:1.2,y:7.4},{x:2,y:8.2},{x:1.6,y:6.6},{x:2.6,y:7.8},{x:2.4,y:6.9},{x:4.8,y:2},{x:5.6,y:1.4},{x:5,y:3},{x:6.2,y:2.4},{x:5.8,y:3.2},{x:8,y:7},{x:8.8,y:7.8},{x:8.2,y:6.2},{x:9.2,y:6.8},{x:8.6,y:8.4}],
    knob: { label: "Algorithm step", min: 0, max: 7, step: 1, init: 0 },
    insights: [
      { max: 1, text: "First assignment: some households are clearly walking to the 'wrong' van — the random start put a van nowhere near its eventual crowd.", tone: "info" },
      { max: 4, text: "Each round: crowds re-choose, vans re-park. Two simple moves, alternating — there is genuinely nothing else in the algorithm.", tone: "info" },
      { max: 7, text: "🤯 Converged: re-running the two moves changes nothing. Assign-then-update is guaranteed to settle, because each move can only reduce the total walking distance.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Lloyd's algorithm (k-means)", formula: "repeat: assign points to nearest centroid → move centroid to members' mean",
      text: "Two moves, looped. Simple enough to memorise, fast enough for millions of points — which is why it's everyone's first clusterer." }
  }
},

{
  q: "Watch k-means' inertia — the total squared distance from points to their centres — across the steps. What does it do, and why does that matter?",
  choices: ["It only ever falls, which guarantees the loop settles", "It rises then falls", "It oscillates forever on some data", "It is constant after step one", "It tracks the number of clusters"],
  explain: "Both moves can only lower inertia: switching to a nearer centre lowers it, and the mean is the point that minimises a group's squared distances. A quantity that only falls and is bounded below must stop changing — convergence, proved in one sentence.",
  simple: "Inertia is the total 'walking distance' in the pizza-van town. Every re-choice shortens someone's walk; every re-park shortens the crowd's total. A number that can only shrink can't shrink forever — so the shuffling must eventually stop. That's why k-means never loops endlessly.",
  widget: {
    type: "kmeansStep", title: "The number that only falls",
    world: "Same two moves — but this time keep your eyes on the inertia readout below. Predict before each step: can it ever go up?",
    xlab: "feature 1", ylab: "feature 2", k: 3, seed: 11, maxIter: 7,
    points: [{x:2,y:2.4},{x:2.8,y:1.6},{x:1.4,y:3},{x:3.2,y:2.8},{x:2.2,y:3.4},{x:5,y:7.6},{x:5.8,y:8.4},{x:5.4,y:6.8},{x:6.4,y:7.4},{x:6,y:8.8},{x:8.6,y:3.4},{x:9.2,y:4.2},{x:8.2,y:4.6},{x:9.6,y:3},{x:9,y:2.4}],
    knob: { label: "Algorithm step", min: 0, max: 7, step: 1, init: 0 },
    insights: [
      { max: 1, text: "A big first drop: the random centres were terrible, so the first re-assignment saves a lot of 'walking'.", tone: "info" },
      { max: 4, text: "Diminishing drops — later steps fine-tune. But check the direction: down, down, down. Never up.", tone: "info" },
      { max: 7, text: "🤯 Flat: converged. A monotonically falling, bounded number is mathematics' favourite convergence proof — and k-means rides it every single run.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Inertia and guaranteed convergence", formula: "inertia = Σ ‖point − its centroid‖² — both k-means moves can only decrease it",
      text: "Convergence is guaranteed; convergence to the BEST answer is not — it settles into whichever valley the random start rolled toward. That caveat is the next exercises' whole story." }
  }
},

{
  q: "K-means needs k chosen in advance. You plot inertia for k = 1…8 and look for the 'elbow'. What are you actually looking for?",
  choices: ["The k where extra clusters stop buying much inertia — diminishing returns", "The k with the lowest inertia (always the biggest k)", "The k where inertia is highest", "The k equal to half the data size", "Any odd k"],
  explain: "Inertia ALWAYS falls as k grows (more centres = shorter distances), hitting zero at k = n. So you can't minimise it. The elbow marks where real structure is exhausted and further clusters just subdivide genuine groups.",
  simple: "More pizza vans always shortens walks — with a van per house, walks are zero. So 'fewest total steps' is a rigged question. Instead ask: when did adding a van stop helping MUCH? The bend in the curve — the elbow — marks where the town's real neighbourhoods ran out.",
  widget: {
    type: "curveStatic", title: "Hunting the elbow",
    world: "Inertia for k = 1 to 8 on data with three true groups. Slide along the curve and find where the returns go from dramatic to decorative.",
    xlab: "k (number of clusters)", xs: [1,2,3,4,5,6,7,8], dec: 0, yunit: "",
    series: [
      { name: "inertia", ys: [420,205,95,78,66,58,52,47] }
    ],
    knob: { label: "k", min: 0, max: 7, step: 1, init: 0 },
    insights: [
      { max: 1, text: "k=1→2: inertia halves. k=2→3: halves again. These clusters are earning their keep — each one claims a real group.", tone: "info" },
      { max: 2, text: "🤯 k=3→4 buys almost nothing — the bend. Three real groups existed; the fourth cluster could only split a genuine group in half. The elbow points at 3.", tone: "wow" },
      { max: 7, text: "After the elbow, the curve just drifts down forever — that's arithmetic, not structure. (The silhouette score is the elbow's more decisive cousin when the bend is vague.)", tone: "info" }
    ],
    extreme: { at: 2 },
    reveal: { name: "The elbow method", formula: "plot inertia vs k → pick the bend where marginal gains collapse",
      text: "Choosing k is a judgement call informed by curves, not an answer the data hands you. Elbow and silhouette are the two standard advisers." }
  }
},

{
  q: "You run k-means with k=2 on two crescent-moon shaped groups. It cuts straight across both moons. What did k-means assume that this data violates?",
  choices: ["Clusters are round-ish blobs around a central point", "Clusters must have equal sizes", "Data must be labelled", "Points must be positive", "There are always exactly three clusters"],
  explain: "K-means assigns by distance-to-centre, so its clusters are always convex, blob-shaped territories (Voronoi cells). A crescent has no meaningful centre — its own midpoint lies OUTSIDE the shape — so centre-based logic slices it apart.",
  simple: "K-means thinks every group is a crowd standing around a flagpole. A crescent moon isn't — its 'flagpole' would stand in empty space off the shape. So k-means plants two poles and splits the moons sideways, confidently and completely wrong. Wrong assumption, wrong answer, no error message.",
  widget: {
    type: "kmeansStep", title: "The flagpole fallacy",
    world: "Two crescents, k = 2. Step to convergence and study the final colouring: does it respect the moons — or the flagpoles?",
    xlab: "feature 1", ylab: "feature 2", k: 2, seed: 4, maxIter: 6,
    points: [{x:2,y:6},{x:2.8,y:6.8},{x:3.7,y:7.2},{x:4.6,y:7.3},{x:5.5,y:7},{x:6.3,y:6.4},{x:7,y:5.6},{x:3.5,y:3.9},{x:4.3,y:3.3},{x:5.2,y:3},{x:6.1,y:3},{x:7,y:3.3},{x:7.8,y:3.9},{x:8.5,y:4.7}],
    knob: { label: "Algorithm step", min: 0, max: 6, step: 1, init: 0 },
    insights: [
      { max: 3, text: "The centres settle where the AVERAGE positions are — which, for crescents, is nowhere useful. Watch the colours ignore the shapes.", tone: "warn" },
      { max: 6, text: "🤯 Converged — and wrong: each 'cluster' contains half of BOTH moons. Inertia is happily minimised; the geometry assumption was simply false. Algorithms don't warn you when their worldview doesn't fit.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "K-means' blob assumption", formula: "distance-to-centre assignment ⇒ convex, round-ish clusters only",
      text: "Every clusterer has a definition of 'group' baked in. K-means: crowds around flagpoles. For shapes, chains and rings you need a density thinker — DBSCAN, three exercises away." }
  }
},

{
  q: "Run k-means five times with different random starts and you get five different answers, some clearly worse. What's the standard defence?",
  choices: ["Multiple restarts (and k-means++ seeding), keeping the lowest-inertia run", "Always use the first run", "Increase k until runs agree", "Sort the data first", "Use a smaller learning rate"],
  explain: "K-means converges to a LOCAL optimum — whichever valley the random start rolls into. Restarting from many seeds and keeping the best inertia (sklearn's n_init) plus smarter seeding (k-means++) makes bad valleys rare.",
  simple: "Drop a marble on a bumpy landscape and it settles in the nearest dip — not necessarily the deepest one. So drop ten marbles from ten spots and keep the deepest result. k-means++ goes further: it picks starting spots spread far apart, so the marbles begin near the right dips.",
  widget: {
    type: "curveStatic", title: "Ten marbles beat one",
    world: "Final inertia from five random starts, plus k-means++ seeding. Lower is better. Slide across the runs and see how much start-luck was worth.",
    xlab: "run", xs: [0,1,2,3,4,5], labels: ["seed 1","seed 2","seed 3","seed 4","seed 5","k-means++"], dec: 0, yunit: "",
    series: [
      { name: "final inertia (lower = better)", ys: [96,142,98,178,101,95] }
    ],
    knob: { label: "Run", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 3, text: "Seeds 2 and 4 settled in bad valleys — one start put two centres inside the same true group and the run never recovered. Same data, same k, 85% worse answer.", tone: "warn" },
      { max: 4, text: "Three of five random runs found the good valley (~96–101). Restarting and keeping the best makes the bad-valley risk vanish exponentially.", tone: "info" },
      { max: 5, text: "🤯 k-means++ hit the best answer in ONE run — its trick is starting centres spread far apart. sklearn does both defences by default (init='k-means++', n_init=10). Now you know why.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Local optima, restarts & k-means++", formula: "run n_init times from k-means++ seeds → keep lowest inertia",
      text: "Guaranteed convergence ≠ guaranteed good answer. Cheap insurance — many starts, smart seeding — is baked into every serious implementation." }
  }
},

{
  q: "Agglomerative (hierarchical) clustering starts with every point alone in its own cluster. What happens next, over and over?",
  choices: ["The two closest clusters merge, until everything is one", "The biggest cluster splits in two", "Random pairs swap members", "Centres move to their group means", "Points beyond a radius are discarded"],
  explain: "It's a repeated wedding: find the two closest clusters, merge them, record the distance at which they merged. n−1 merges later everything is one family — and the recorded history IS the model.",
  simple: "Think family tree, built bottom-up: individuals pair into families, families into clans, clans into tribes — always joining the two closest groups next. The result isn't one grouping but the ENTIRE merge history, drawn as a tree.",
  widget: {
    type: "dendro", title: "The merge history, drawn",
    world: "Eight species arranged by a body-size trait. Below, the tree records every merge, low merges first. Slide the cut line and read the story at any depth.",
    linkage: "complete",
    items: [
      { name: "mouse", x: 0.5 }, { name: "rat", x: 1.2 }, { name: "rabbit", x: 2.2 },
      { name: "cat", x: 4.4 }, { name: "dog", x: 5.1 },
      { name: "pony", x: 8 }, { name: "horse", x: 8.9 }, { name: "moose", x: 9.7 }
    ],
    knob: { label: "Cut height", min: 0.3, max: 10, step: 0.1, init: 0.5 },
    insights: [
      { max: 1.5, text: "Low cut: only the very closest pairs have merged — mouse+rat, pony+horse. The tree's bottom records the earliest, most confident weddings.", tone: "info" },
      { max: 5, text: "Mid cut: three sensible families — rodents, pets, big beasts. Notice you didn't re-run anything; you just read the same tree at a different depth.", tone: "info" },
      { max: 10, text: "🤯 Highest cut: one family containing everything — the final merge. One run produced groupings at EVERY granularity simultaneously. That's the hierarchy in 'hierarchical'.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Agglomerative clustering", formula: "repeat n−1 times: merge the two closest clusters, record the merge distance",
      text: "The output is a tree of merges (a dendrogram), not one answer. Cutting the tree at a height is how an answer gets extracted — next exercise." }
  }
},

{
  q: "A dendrogram in hand, your colleague asks 'so how many clusters are there?'. What's the honest answer?",
  choices: ["Whatever the cut height yields — the tree offers every granularity; you choose", "Always the number of leaves", "Always two — the final merge", "The algorithm already decided", "The square root of n"],
  explain: "The dendrogram defers the k decision to reading time: cut low for many small clusters, high for few large ones. Long vertical stretches (big gaps between merge heights) mark natural, stable cuts.",
  simple: "A family tree doesn't say how many 'groups' the family has — it depends whether you ask at the household, clan, or tribe level. The tree holds all the answers at once; your cut height is the question you choose to ask.",
  widget: {
    type: "dendro", title: "Every answer at once",
    world: "Customer types by weekly spend. Slide the cut through the whole range and count the clusters at each height — then look for the heights where the answer is STABLE.",
    linkage: "complete",
    items: [
      { name: "Ana", x: 0.4 }, { name: "Ben", x: 1 }, { name: "Cai", x: 1.7 },
      { name: "Dee", x: 4.2 }, { name: "Eli", x: 4.9 }, { name: "Fay", x: 5.5 },
      { name: "Gus", x: 8.6 }, { name: "Hal", x: 9.4 }
    ],
    knob: { label: "Cut height", min: 0.3, max: 10, step: 0.1, init: 5 },
    insights: [
      { max: 2, text: "Down here the answer changes every fraction you slide — 8, 7, 6, 5 clusters. Unstable cuts = arbitrary answers.", tone: "warn" },
      { max: 6.5, text: "🤯 From about 2.5 to 6.5 the answer stays THREE — a long stretch where nothing merges. Stability over a wide range is the tree saying 'this grouping is real'.", tone: "wow" },
      { max: 10, text: "Cut higher and it snaps to 2, then 1. The long-vertical-gap heuristic is the dendrogram's version of the elbow.", tone: "info" }
    ],
    extreme: { at: 5 },
    reveal: { name: "Reading a dendrogram", formula: "clusters = branches crossed by the cut · stable ranges = trustworthy groupings",
      text: "Hierarchical clustering's gift: k becomes a readable choice, not a blind input. The price comes next — the bill." }
  }
},

{
  q: "Single linkage measures cluster distance by the CLOSEST pair; complete linkage by the FARTHEST pair. What's single linkage's famous failure?",
  choices: ["Chaining — stringy clusters that leak together through stepping-stone points", "It cannot merge more than ten items", "It requires labels", "It only works in one dimension", "It always produces equal-size clusters"],
  explain: "Under single linkage, one point between two groups makes them 'close', and merges cascade along chains of stepping stones — producing long straggly clusters. Complete linkage demands the ENTIRE groups be compatible, keeping clusters compact.",
  simple: "Single linkage says two clubs are close if ANY two members are friends — so one social butterfly merges the chess club into the rugby team. Complete linkage asks whether the two FURTHEST members could stand each other. One handshake versus whole-group compatibility.",
  widget: {
    type: "curveStatic", title: "The handshake problem",
    world: "Four linkage rules clustering the same customer data, scored by how compact and separated the resulting clusters are (silhouette, higher = better). One rule falls for the stepping stones.",
    xlab: "linkage rule", xs: [0,1,2,3], labels: ["single","complete","average","Ward"], dec: 2, yunit: "",
    series: [
      { name: "cluster quality (silhouette)", ys: [0.31,0.58,0.61,0.66] }
    ],
    knob: { label: "Linkage", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "🤯 Single linkage: 0.31 — a few stepping-stone customers chained two genuine groups into one straggly mess. One friendly handshake merged the clubs.", tone: "wow" },
      { max: 2, text: "Complete and average linkage resist the chain: a merge needs the whole groups to be near, not just one pair.", tone: "info" },
      { max: 3, text: "Ward linkage (merge whichever pair least increases inertia) usually wins on blobby data — it's the hierarchical cousin of k-means' objective, and sklearn's default.", tone: "info" }
    ],
    extreme: { at: "min" },
    reveal: { name: "Linkage criteria", formula: "single: min pair · complete: max pair · average: mean pair · Ward: least inertia growth",
      text: "'Distance between clusters' has several defensible definitions, and the choice changes the tree. Ward for blobs, single only when you WANT chains (e.g. elongated structures)." }
  }
},

{
  q: "Hierarchical clustering gives that lovely tree — so why does anyone still use k-means on large datasets?",
  choices: ["The tree costs roughly n² memory and time — hopeless at millions of rows", "K-means gives better trees", "Dendrograms are illegal in production", "Hierarchical needs labels", "K-means was invented later"],
  explain: "Agglomerative clustering needs pairwise distances — n² of them, repeatedly. At a million rows that's 10¹² distances. K-means touches each point k times per iteration: linear, streamable, fast.",
  simple: "The tree is built by comparing everyone with everyone — fine for 800 customers, fatal for 8 million (that's 32 trillion comparisons). K-means only ever compares each point with k centres. Beautiful tree for small data; brute pragmatism for big.",
  widget: {
    type: "curveStatic", title: "The n² bill again",
    world: "Runtime as the dataset grows. You've seen this curve shape before — with kernels. Slide the rows and find each method's ceiling.",
    xlab: "rows", xs: [0,1,2,3,4], labels: ["1k","10k","100k","1M","10M"], dec: 1, yunit: " min",
    series: [
      { name: "hierarchical (n²)", ys: [0.1,8,780,78000,7800000] },
      { name: "k-means (≈ linear)", ys: [0.02,0.2,2,20,200] }
    ],
    knob: { label: "Rows", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "10k rows: the tree takes 8 minutes — worth it for the interpretability. This is hierarchical clustering's comfortable habitat.", tone: "info" },
      { max: 2, text: "100k rows: 13 hours for the tree, 2 minutes for k-means. The n² wall arrives fast once it arrives.", tone: "warn" },
      { max: 4, text: "🤯 10M rows: the tree would run for ~15 YEARS. K-means: 3 hours. Same story as the kernel matrix — pairwise methods buy insight with quadratic money.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Hierarchical's O(n²) cost", formula: "pairwise distances ≈ n²/2 — tree methods cap out around 10⁴–10⁵ rows",
      text: "Choose by scale: dendrograms for thousands of rows, k-means (or MiniBatchKMeans) for millions. Or cluster a sample hierarchically to CHOOSE k, then run k-means on everything." }
  }
},

{
  q: "DBSCAN never asks for k. Instead it grows clusters from 'dense' points. What is its definition of a cluster?",
  choices: ["A connected region where points have enough neighbours within a radius", "A group around a central flagpole", "A branch of a merge tree", "Any set of exactly minPts points", "The convex hull of the data"],
  explain: "A core point has ≥ minPts neighbours within radius eps. Core points within reach of each other chain together, plus their borderline hangers-on — the cluster is whatever that flood-fill reaches. Shape doesn't matter; density does.",
  simple: "DBSCAN's rule: 'you're in a crowd if enough people stand within arm's reach — and your crowd includes everyone reachable through chains of such people.' Crowds can be any shape: crescents, rings, blobs. What matters is packed-together-ness, not roundness.",
  widget: {
    type: "dbscanScan", title: "Crowds, not flagpoles",
    world: "The same two crescents that broke k-means. Your knob is the arm's reach (radius). Find the reach where the crowds emerge — correctly this time.",
    xlab: "feature 1", ylab: "feature 2", minPts: 3, showEpsAt: 3,
    points: [{x:2,y:6},{x:2.8,y:6.8},{x:3.7,y:7.2},{x:4.6,y:7.3},{x:5.5,y:7},{x:6.3,y:6.4},{x:7,y:5.6},{x:3.5,y:3.9},{x:4.3,y:3.3},{x:5.2,y:3},{x:6.1,y:3},{x:7,y:3.3},{x:7.8,y:3.9},{x:8.5,y:4.7}],
    knob: { label: "Reach radius (eps)", min: 0.3, max: 3.5, step: 0.05, init: 0.4 },
    insights: [
      { max: 0.7, text: "Tiny reach: nobody has enough neighbours — everything is 'noise' (hollow rings). No crowds exist at this definition of close.", tone: "info" },
      { max: 1.6, text: "🤯 Around 1.0–1.4: TWO clusters appear, and they're the actual crescents — each moon found by chaining through its own dense interior. The shape k-means couldn't see, density sees effortlessly.", tone: "wow" },
      { max: 3.5, text: "Big reach: the moons chain into one mega-crowd. eps is DBSCAN's personality dial — the next exercises are about setting it.", tone: "warn" }
    ],
    extreme: { at: "max" },
    reveal: { name: "DBSCAN (density-based clustering)", formula: "core point: ≥ minPts neighbours within eps · cluster: everything density-reachable from a core",
      text: "Clusters as connected dense regions — any shape, count discovered not chosen, and a built-in notion of 'belongs to nothing'. The three gifts k-means lacks." }
  }
},

{
  q: "DBSCAN takes eps (radius) and minPts (neighbour quota). What happens as you grow eps from tiny to huge?",
  choices: ["Noise → many small clusters → true clusters → everything merges into one", "Clusters shrink steadily", "The cluster count stays fixed", "Points get deleted progressively", "minPts changes automatically"],
  explain: "Tiny eps: no one qualifies as core — all noise. Growing: dense pockets ignite separately, then knit into the true clusters, then bridge across gaps until one blob swallows all. The right eps lives on the plateau where the count is stable.",
  simple: "'Arm's reach' defines the crowd. Millimetre arms: everyone is a loner. Metre arms: real huddles appear. Ten-metre arms: the whole street is 'one crowd'. Somewhere in the middle the huddle count stops changing for a while — that plateau is where the truth sits.",
  widget: {
    type: "dbscanScan", title: "The whole story of eps",
    world: "Three blobs of different sizes plus a few loners. Sweep eps through its whole range slowly and narrate the phases: noise, ignition, truth, merger.",
    xlab: "feature 1", ylab: "feature 2", minPts: 3, showEpsAt: 6,
    points: [{x:1.4,y:7.6},{x:2,y:8.2},{x:1.6,y:8.8},{x:2.4,y:7.8},{x:5,y:2},{x:5.6,y:1.5},{x:5.3,y:2.7},{x:6.1,y:2.2},{x:5.8,y:3},{x:8.2,y:7},{x:8.8,y:7.6},{x:8.4,y:8.3},{x:9.2,y:7},{x:9,y:8},{x:3.6,y:5},{x:9.6,y:1}],
    knob: { label: "Reach radius (eps)", min: 0.3, max: 4.5, step: 0.05, init: 0.35 },
    insights: [
      { max: 0.6, text: "Phase 1 — noise: rings everywhere. At this reach, no point has its quota of neighbours.", tone: "info" },
      { max: 1.6, text: "Phase 2–3: the three real blobs ignite one by one and the loners stay ringed. Note how WIDE the range is where the answer is exactly 3 — that stability is your eps-picking signal.", tone: "wow" },
      { max: 4.5, text: "Phase 4 — merger: reaches bridge the gaps and the count collapses toward 1. The loners get swallowed last. One dial, four regimes.", tone: "warn" }
    ],
    extreme: { at: "max" },
    reveal: { name: "eps and minPts", formula: "sweep eps, trust the plateau · pick eps at the knee of the k-distance plot",
      text: "minPts sets how strict 'dense' is (rule of thumb: ≥ dimensions + 1, often 4–5); eps sets the scale. The stable plateau — not any single magic value — is what you're hunting." }
  }
},

{
  q: "Three of your points end up labelled −1 by DBSCAN. What is it telling you, and why is that a feature rather than a bug?",
  choices: ["They belong to no dense region — explicit outliers, honestly flagged", "The algorithm crashed on them", "They form their own cluster", "They must be duplicates", "Their features are negative"],
  explain: "K-means forces EVERY point into some cluster, however absurd the fit. DBSCAN has a vocabulary for 'this point is just noise' — which doubles as free anomaly detection and keeps outliers from dragging cluster shapes around.",
  simple: "Every crowd-finder meets the guy standing alone in a field. K-means shrugs and assigns him to the nearest crowd half a mile away — polluting that crowd's statistics. DBSCAN says the honest thing: 'he's not in a crowd'. Sometimes the loners ARE the finding — fraud, sensor glitches, rare cases.",
  widget: {
    type: "dbscanScan", title: "Permission to say 'nobody'",
    world: "One tight community, one loose one, and three genuine loners. Find an eps where both communities light up — and watch what stays ringed.",
    xlab: "feature 1", ylab: "feature 2", minPts: 3, showEpsAt: 0,
    points: [{x:2,y:3},{x:2.5,y:3.6},{x:2.2,y:2.5},{x:2.9,y:3},{x:2.6,y:4},{x:3.2,y:3.4},{x:7,y:6.6},{x:7.7,y:7.3},{x:7.3,y:6},{x:8.1,y:6.7},{x:7.8,y:7.8},{x:0.7,y:9},{x:9.5,y:1.2},{x:5,y:9.6}],
    knob: { label: "Reach radius (eps)", min: 0.3, max: 4, step: 0.05, init: 0.5 },
    insights: [
      { max: 0.7, text: "Too strict: even community members look like loners. Noise-labelling is only meaningful once real clusters exist.", tone: "info" },
      { max: 1.8, text: "🤯 Both communities found — and the three loners keep their hollow rings. The algorithm just did anomaly detection without being asked. k-means would have conscripted them.", tone: "wow" },
      { max: 4, text: "Stretch far enough and even the loners get absorbed. 'Outlier' is relative to your density scale — eps decides where honesty ends.", tone: "warn" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Noise points (label −1)", formula: "not density-reachable from any core point → outlier, member of nothing",
      text: "A clustering that can decline to cluster. In fraud, monitoring and cleaning pipelines, DBSCAN's −1 list is often the deliverable itself." }
  }
},

{
  q: "Unlike k-means, DBSCAN discovers HOW MANY clusters exist. When is that autonomy most valuable?",
  choices: ["When you genuinely don't know the group count — and it may change over time", "When you need exactly three clusters", "When the data is perfectly round", "When labels are available", "When n is astronomically large"],
  explain: "Segmentations, spatial hotspots, event detection: the count IS the unknown. DBSCAN reads it from density, and tomorrow's data can honestly yield a different count — no k to hard-code, no re-tuning ritual.",
  simple: "Asking 'find me the crime hotspots' shouldn't require announcing how many hotspots exist — that's the question! Density methods let the data volunteer the number. This week: four hotspots. Next month: two. The pipeline doesn't care.",
  widget: {
    type: "dbscanScan", title: "The count nobody typed",
    world: "City incident locations. At a sensible reach, count the hotspots the data volunteers — then re-imagine this exact pipeline next month, when the map changes.",
    xlab: "east–west", ylab: "north–south", minPts: 3, showEpsAt: 2,
    points: [{x:1.6,y:2},{x:2.2,y:2.6},{x:1.9,y:1.4},{x:2.6,y:2},{x:6.4,y:8},{x:7,y:8.6},{x:6.7,y:7.4},{x:7.4,y:8},{x:7.7,y:8.8},{x:4.8,y:5},{x:5.4,y:5.5},{x:5.1,y:4.4},{x:5.8,y:5},{x:9,y:2.4},{x:9.6,y:3},{x:9.3,y:1.8},{x:3.5,y:9.3},{x:0.8,y:6.8}],
    knob: { label: "Reach radius (eps)", min: 0.3, max: 3.5, step: 0.05, init: 0.4 },
    insights: [
      { max: 0.7, text: "All noise — the map has no hotspots at this density standard.", tone: "info" },
      { max: 1.4, text: "🤯 FOUR hotspots emerge, plus two isolated incidents left honestly unclustered. Nobody typed a 4 anywhere — the map confessed it.", tone: "wow" },
      { max: 3.5, text: "Push the reach and hotspots federate into districts, then one city. The count is a function of scale — which is honest: 'how many groups' always depends on how closely you look.", tone: "info" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Emergent cluster count", formula: "clusters = number of density-connected components at scale eps",
      text: "K-means answers 'divide this into k'; DBSCAN answers 'what groups exist?'. Different questions — pick the algorithm that matches yours." }
  }
},

{
  q: "One tight, dense cluster and one sparse, spread-out cluster share a dataset. Why does this defeat DBSCAN's single eps?",
  choices: ["Any one reach is too big for the tight cluster or too small for the sparse one", "minPts cannot exceed 3", "DBSCAN only finds even numbers of clusters", "Density methods need labels", "The clusters must first be scaled"],
  explain: "eps is GLOBAL: one density standard for the whole dataset. A reach that keeps the tight cluster separate reads the sparse cluster as scattered noise; a reach generous enough for the sparse one chains everything together. HDBSCAN exists precisely for this.",
  simple: "One arm's-reach rule for the whole city fails when one neighbourhood parties shoulder-to-shoulder and another spreads across picnic blankets. Strict rule: the picnic 'isn't a crowd'. Loose rule: the whole park merges. No single rule fits both — you need a method that adapts per neighbourhood.",
  widget: {
    type: "dbscanScan", title: "One rule, two neighbourhoods",
    world: "A tight huddle (left) and a sparse gathering (right), with stepping-stone points between. Try to find ONE reach that finds both groups cleanly. Take your time. It isn't there.",
    xlab: "feature 1", ylab: "feature 2", minPts: 3, showEpsAt: 8,
    points: [{x:1.5,y:5},{x:1.8,y:5.3},{x:2.1,y:5},{x:1.8,y:4.7},{x:2.2,y:5.4},{x:1.4,y:5.4},{x:3.2,y:4.8},{x:4.6,y:4.4},{x:6,y:2},{x:7.4,y:3.2},{x:8.6,y:2.2},{x:6.6,y:4.6},{x:8,y:4.8},{x:9.2,y:3.8}],
    knob: { label: "Reach radius (eps)", min: 0.3, max: 3, step: 0.05, init: 0.5 },
    insights: [
      { max: 0.8, text: "Strict reach: the tight huddle shines; the sparse gathering (and the stepping stones) are all 'noise'. Half the truth.", tone: "info" },
      { max: 1.7, text: "Loosening… the sparse group starts to ignite, but watch the stepping stones — they're threatening to bridge the two worlds.", tone: "warn" },
      { max: 3, text: "🤯 Loose enough for the sparse group = merged into ONE blob via the bridge. You've proven a theorem by slider: no global eps fits two densities. HDBSCAN adapts the density standard locally — that's its whole reason to exist.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The varying-density weakness", formula: "global eps ⇒ one density scale · varying densities → HDBSCAN / OPTICS",
      text: "Every clusterer's worldview fails somewhere: k-means on shapes, DBSCAN on mixed densities. Knowing each one's blind spot is what makes you the operator rather than the operated." }
  }
}
];
