/* Hierarchical Clustering — Parts I & II. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).hier1 = [
  {
    "q": "Before hierarchical clustering can merge anything, it needs the distance between two individual data points. For ordinary numeric features, how is that distance most commonly measured?",
    "choices": [
      "The straight-line (Euclidean) distance between them",
      "The number of features on which they disagree most",
      "The count of other points sitting between the two",
      "The difference between their two feature averages",
      "The height at which the two points end up merging"
    ],
    "explain": "Agglomerative clustering is built on a pairwise distance (dissimilarity) matrix, and for continuous features the default is Euclidean distance — the ordinary straight-line gap between two points across all their features. Every linkage rule (single, complete, average, Ward) is just a different way of summarising these point-to-point distances into a distance between whole clusters.",
    "simple": "Think of each data point as a pin on a map that has many directions instead of just two. The distance between two pins is simply how far you would walk in a straight line from one to the other. The whole method is just repeatedly asking 'which two things are closest?', so it needs that basic ruler first.",
    "widget": {
      "type": "curveStatic",
      "title": "A ruler between two points",
      "world": "Two data points pinned in feature space; slide to stretch the gap between them and watch their straight-line distance grow.",
      "xlab": "gap between the two points →",
      "xs": [ 0, 1, 2, 3, 4 ],
      "labels": [ "touching", "near", "apart", "far", "very far" ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "Euclidean distance", "ys": [ 0, 2, 4, 6, 8 ] }
      ],
      "knob": { "label": "Gap", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "At the smallest gap the distance is about 0 — the two points sit almost on top of each other, so clustering treats them as nearly identical.", "tone": "info" },
        { "max": 3, "text": "As the points slide apart the straight-line distance climbs (2 → 6), and they look less and less alike to the algorithm.", "tone": "info" },
        { "max": 4, "text": "🤯 At the widest gap the distance peaks (8) — this single point-to-point ruler is what every linkage rule is built on top of.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Distance between points", "formula": "Euclidean distance = straight-line gap across all features", "text": "The base ruler; linkage rules only summarise these point distances into cluster distances." }
    }
  },
  {
    "q": "k-means makes you choose the number of clusters k before it runs. How does hierarchical clustering differ on this point?",
    "choices": [
      "It builds the whole tree first, so you choose k after",
      "It also makes you fix the number of clusters first",
      "It always settles on exactly three clusters in the end",
      "It refuses to split the points into clusters at all",
      "It needs the number of features decided before it runs"
    ],
    "explain": "Agglomerative clustering merges points all the way up into a single tree (dendrogram) without ever being told how many clusters to find. You choose the number of clusters afterwards by cutting the tree at a chosen height, and you can try many values of k from the one tree — unlike k-means, which commits to k before it starts.",
    "simple": "k-means is like being asked 'how many teams?' before you have even met the players. Hierarchical clustering meets everyone first, drawing a full family tree of who is related to whom, and only then lets you decide how many groups to slice it into. You can change your mind about the number without redoing the work.",
    "widget": {
      "type": "curveStatic",
      "title": "Decide the count later",
      "world": "One dendrogram, cut at different heights; slide the cut and watch how many clusters fall out — all from the same tree.",
      "xlab": "where you cut the tree →",
      "xs": [ 0, 1, 2, 3, 4 ],
      "labels": [ "very high", "high", "middle", "low", "very low" ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "clusters you get", "ys": [ 1, 2, 3, 5, 8 ] }
      ],
      "knob": { "label": "Cut height", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Cut way up high and the whole dataset is still one cluster (1) — the tree already exists; you are only choosing where to slice.", "tone": "info" },
        { "max": 3, "text": "Slide the cut down and more groups appear (2 → 5), all read off the SAME tree without re-running anything.", "tone": "info" },
        { "max": 4, "text": "🤯 At the lowest cut you get many clusters (8); k was never chosen up front — hierarchical clustering hands you every k at once.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "No need to pre-specify k", "formula": "build the tree once, choose k by where you cut", "text": "Unlike k-means, the number of clusters is decided after fitting, and any k comes from the one tree." }
    }
  },
  {
    "q": "Your dataset has 'age' (0-100) and 'height in metres' (0-2). Why should you scale the features before hierarchical clustering?",
    "choices": [
      "Otherwise the large-range feature dominates the distances",
      "Otherwise the algorithm cannot build a dendrogram at all",
      "Otherwise the number of clusters is chosen automatically",
      "Otherwise every merge happens at exactly the same height",
      "Otherwise the smallest-range feature decides the distances"
    ],
    "explain": "Hierarchical clustering merges by distance, and Euclidean distance adds up each feature's contribution. A feature on a big numeric range (age spanning 0-100) swamps one on a small range (height spanning 0-2), so the clusters end up reflecting age alone. Standardising each feature to a comparable scale lets every feature pull its fair weight.",
    "simple": "Imagine judging how similar two people are by adding up the difference in their age (in years) and their height (in metres). Age differences come out as big numbers and height differences as tiny ones, so the tape measure basically ignores height. Rescaling both onto the same footing lets each trait count equally.",
    "widget": {
      "type": "curveStatic",
      "title": "One feature drowns the rest",
      "world": "The distance between two people split into an age part and a height part before any scaling; slide up the age gap and watch it swamp the total.",
      "xlab": "age gap between the two (years) →",
      "xs": [ 0, 1, 2, 3, 4 ],
      "labels": [ "0 yrs", "10 yrs", "25 yrs", "50 yrs", "80 yrs" ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "distance from age", "ys": [ 0, 10, 25, 50, 80 ] },
        { "name": "distance from height", "ys": [ 1, 1, 1, 1, 1 ] }
      ],
      "knob": { "label": "Age gap", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "With no age gap the tiny height difference (1) is all that is left — here the two features are comparable.", "tone": "info" },
        { "max": 3, "text": "As the age gap grows (10 → 50) it towers over the height difference (still 1), so distance tracks age almost alone.", "tone": "info" },
        { "max": 4, "text": "🤯 At an 80-year gap age (80) utterly drowns height (1); without scaling, the big-range feature decides every merge.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Feature scaling", "formula": "standardise features so their ranges are comparable before clustering", "text": "Distance-based clustering is dominated by large-range features unless each feature is rescaled first." }
    }
  },
  {
    "q": "In hierarchical clustering, what does 'Ward linkage' do when deciding which two clusters to merge?",
    "choices": [
      "Merges the pair whose union least increases within-cluster spread",
      "Merges the pair whose closest two points are nearest together",
      "Merges the pair whose farthest two points are closest together",
      "Merges the pair with the largest average pairwise distance",
      "Merges the two clusters that currently hold the fewest points"
    ],
    "explain": "At each step Ward evaluates every candidate merge by how much it would raise the total within-cluster variance (inertia), and picks the one that raises it least. This is exactly the objective k-means minimises, so Ward tends to produce compact, roundish clusters — which is why it is sklearn's default linkage.",
    "simple": "Ward is a tidiness-obsessed matchmaker. Of all the clusters that could merge next, it joins the pair that keeps each resulting group as tight and undivided as possible — it hates spreading the members out. That instinct for compact groups is the same one k-means follows.",
    "widget": {
      "type": "curveStatic",
      "title": "The least-spread merge wins",
      "world": "Five candidate merges Ward could make this round, each scored by how much it would grow within-cluster spread. Slide across them and see which one Ward actually picks.",
      "xlab": "candidate merge →",
      "xs": [ 0, 1, 2, 3, 4 ],
      "labels": [ "a+b", "a+c", "b+d", "c+e", "d+e" ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "extra within-cluster spread", "ys": [ 2, 6, 9, 11, 14 ] }
      ],
      "knob": { "label": "Candidate merge", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "a+b barely raises spread (2) — Ward's pick is the merge that adds the least within-cluster variance.", "tone": "info" },
        { "max": 3, "text": "Other candidate pairs raise spread more (6-11). Ward skips them, however near their closest points happen to sit.", "tone": "info" },
        { "max": 4, "text": "🤯 d+e balloons the variance most (14); Ward chooses the pair that grows spread LEAST — the same objective k-means minimises.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Ward linkage", "formula": "merge the pair with the smallest increase in within-cluster variance", "text": "sklearn's default. Gives compact, roundish clusters — the hierarchical cousin of k-means' objective." }
    }
  },
  {
    "q": "On a dendrogram, what does the 'merge height' of a join tell you?",
    "choices": [
      "How far apart the two clusters were when they merged",
      "How many points sit inside the newly formed cluster",
      "How many merges happened before this one occurred",
      "How much variance the new cluster removes overall",
      "How close the merged cluster sits to the tree root"
    ],
    "explain": "Every join in a dendrogram is drawn at a vertical height equal to the linkage distance between the two clusters it fused. Low joins mean the clusters were close (a confident merge); high joins mean they were far apart (a reluctant, shotgun merge forced only because nothing closer was left).",
    "simple": "Read the tree like a thermometer for reluctance. A join near the bottom means the two groups were practically neighbours — an easy, obvious pairing. A join way up high means they were strangers dragged together only because everyone else had already paired off.",
    "widget": {
      "type": "curveStatic",
      "title": "How reluctant was each join?",
      "world": "The merges of one small dataset, in the order they happened, each plotted at the distance the two clusters sat apart. Slide from the first merge to the last.",
      "xlab": "merge order →",
      "xs": [ 0, 1, 2, 3, 4 ],
      "labels": [ "1st", "2nd", "3rd", "4th", "5th" ],
      "dec": 1,
      "yunit": "",
      "series": [
        { "name": "merge height (distance)", "ys": [ 0.3, 0.6, 1.0, 4.2, 7.5 ] }
      ],
      "knob": { "label": "Merge order", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "The first joins sit low (0.3) — the two clusters were almost touching, so this merge is confident.", "tone": "info" },
        { "max": 3, "text": "Heights climb as clustering proceeds: each pair forced together is a little farther apart than the last.", "tone": "info" },
        { "max": 4, "text": "🤯 The final merge is way up at 7.5 — a shotgun wedding of two clusters that were never really close.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Merge height", "formula": "join height = linkage distance between the two clusters merged", "text": "Low merges are trustworthy; high merges are suspicious. Big jumps in height are where you cut the tree." }
    }
  },
  {
    "q": "When reading a dendrogram, what does 'the tallest gap' (a long stretch of height where nothing merges) tell you?",
    "choices": [
      "Naturally separated groups, so cutting there gives the most defensible k",
      "The exact centre of the tree, so cutting there balances the two halves",
      "A patch of noisy points, so cutting there discards the weakest merges",
      "The busiest part of the history, where most of the clusters join at once",
      "The place the linkage rule switched, so cutting there is always required"
    ],
    "explain": "A wide vertical band with no merges means every remaining group had to travel a long way before joining anything — a sign the groups below are genuinely far apart. Cutting inside that gap yields a cluster count that stays stable across a wide range of heights, which is the most defensible choice of k.",
    "simple": "Imagine the tree pauses, holding its breath: for a long stretch of height, nothing merges. That silence means the groups already formed are truly far from each other. Slice anywhere in that quiet band and you get the same answer — which is why it is the safest place to cut.",
    "widget": {
      "type": "curveStatic",
      "title": "Listen for the silence",
      "world": "The merges of one dataset in order, each at the height it happened. Slide through them and watch for the long jump where the tree goes quiet.",
      "xlab": "merge order →",
      "xs": [ 0, 1, 2, 3, 4 ],
      "labels": [ "1st", "2nd", "3rd", "4th", "5th" ],
      "dec": 1,
      "yunit": "",
      "series": [
        { "name": "merge height (distance)", "ys": [ 0.4, 0.9, 1.3, 4.6, 5.1 ] }
      ],
      "knob": { "label": "Merge order", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Down low the merges come thick and fast (0.4, 0.9) — points inside a genuine group joining up.", "tone": "info" },
        { "max": 3, "text": "Then a long empty stretch: nothing merges between 1.3 and 4.6. That silence is the tallest gap.", "tone": "info" },
        { "max": 4, "text": "🤯 Cut anywhere inside that gap and the clusters stay the same — the widest gap marks the most defensible k.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "The tallest gap", "formula": "widest height range with no merges = most separated groups = best place to cut", "text": "The dendrogram's version of the elbow: cut in the gap, not at an arbitrary height." }
    }
  },
  {
    "q": "What does adding a 'connectivity constraint' do to agglomerative clustering?",
    "choices": [
      "Lets clusters merge only if they actually touch on a neighbour graph",
      "Forces every resulting cluster to contain the same number of points",
      "Requires the number of clusters to be fixed before merging starts",
      "Limits each cluster to points that share an identical class label",
      "Speeds up merging by ignoring the farthest pairs of points"
    ],
    "explain": "A connectivity constraint supplies a neighbour graph (e.g. k-nearest-neighbours) and forbids any merge between clusters that are not connected in it. Merges then propagate only along the data's local structure, so clusters grow to follow curved manifolds instead of jumping across empty space.",
    "simple": "Normally two clusters can merge if they are close as the crow flies, even with a void between them. The connectivity constraint hands the algorithm a map of who-touches-whom and says: you may only join hands with a neighbour you can actually reach. Clusters then snake along the data's real shape.",
    "widget": {
      "type": "curveStatic",
      "title": "Follow the shape, don't jump the gap",
      "world": "The same agglomerative method on five dataset shapes, scored by cluster quality, with and without a neighbour-graph constraint. Slide across the shapes.",
      "xlab": "dataset shape →",
      "xs": [ 0, 1, 2, 3, 4 ],
      "labels": [ "blobs", "2 moons", "swiss roll", "spiral", "rings" ],
      "dec": 2,
      "yunit": "",
      "series": [
        { "name": "with connectivity", "ys": [ 0.66, 0.72, 0.80, 0.78, 0.75 ] },
        { "name": "without (plain)", "ys": [ 0.64, 0.30, 0.18, 0.22, 0.28 ] }
      ],
      "knob": { "label": "Dataset shape", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "On round blobs both do fine — the neighbour graph barely matters when clusters are already compact.", "tone": "info" },
        { "max": 3, "text": "On curved shapes plain linkage jumps across gaps; the constraint keeps clusters following the data.", "tone": "info" },
        { "max": 4, "text": "🤯 On rings and spirals the constraint wins big — clusters may only grow along points that actually touch.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Connectivity constraint", "formula": "merges allowed only between neighbours in a supplied graph (e.g. kNN)", "text": "sklearn: AgglomerativeClustering(connectivity=...). Lets clusters grow along manifolds instead of leaping empty space." }
    }
  },
  {
    "q": "The output of hierarchical clustering is a 'dendrogram'. What is a dendrogram?",
    "choices": [
      "A tree diagram recording which groups merged, and at what distance",
      "A scatter plot of the points with each final cluster shaded its own colour",
      "A flat table listing every single point next to its final cluster number",
      "A line chart showing clustering accuracy plotted against the cluster count",
      "A square grid holding the distance between every possible pair of points"
    ],
    "explain": "A dendrogram is the tree of merges: leaves are individual points, and each branch shows two clusters joining at the height equal to their distance. It captures the entire merge history, not one fixed grouping.",
    "simple": "Picture a family tree built upward: individuals join into pairs, pairs into groups, groups into one root — and the HEIGHT of each join shows how far apart the two were. That tree is the dendrogram. It's not a scatter plot or a label table; it's the whole record of what merged with what, and when.",
    "widget": {
      "type": "dendro",
      "title": "The merge history, drawn",
      "world": "Eight items by a size trait. Below, the tree records every merge, lowest first. Slide the cut line to read the grouping at any height.",
      "linkage": "complete",
      "items": [
        { "name": "a", "x": 0.4 },
        { "name": "b", "x": 1.1 },
        { "name": "c", "x": 2 },
        { "name": "d", "x": 4.5 },
        { "name": "e", "x": 5.1 },
        { "name": "f", "x": 8.2 },
        { "name": "g", "x": 8.9 },
        { "name": "h", "x": 9.6 }
      ],
      "knob": { "label": "Cut height", "min": 0.3, "max": 10, "step": 0.1, "init": 0.4 },
      "insights": [
        { "max": 1.5, "text": "Low: only the closest pairs have merged — a+b, g+h. The tree's bottom records the earliest, most confident joins.", "tone": "info" },
        { "max": 5, "text": "Mid: three sensible families appear, read straight off the same tree — no re-running needed.", "tone": "info" },
        { "max": 10, "text": "🤯 High: one family holding everything — the final merge. One diagram encodes groupings at EVERY granularity. That's what a dendrogram is.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Dendrogram", "formula": "tree of merges · leaf = point · branch height = merge distance", "text": "It holds all groupings at once. You extract one by cutting the tree at a chosen height — the next idea." }
    }
  },
  {
    "q": "A dendrogram holds every possible grouping. How do you turn it into an actual set of clusters?",
    "choices": [
      "Cut the tree at a chosen height — everything still separate below it becomes a cluster",
      "Keep only the two separate branches that happened to merge together last, right at the very top of the tree",
      "Take the plain arithmetic average of all the recorded merge heights in the tree",
      "Count how many leaves the tree has and simply divide that total by two",
      "Re-run the whole algorithm again from scratch with the number of clusters fixed"
    ],
    "explain": "Drawing a horizontal line at some height splits the tree: each branch that hasn't yet merged below that line is one cluster. Cut low for many small clusters, high for a few big ones — the tree already contains them all.",
    "simple": "You slice the tree horizontally. Everything that has joined up BELOW your slice counts as one group; the slice height decides how many groups you get. Low slice, lots of little clusters; high slice, a few big ones. You never re-run anything — the answer was always in the tree, waiting for a cut.",
    "widget": {
      "type": "dendro",
      "title": "One cut, one answer",
      "world": "Customer types by weekly spend. Slide the cut through the range and count the clusters at each height — and spot the heights where the count is stable.",
      "linkage": "complete",
      "items": [
        { "name": "A", "x": 0.5 },
        { "name": "B", "x": 1 },
        { "name": "C", "x": 1.6 },
        { "name": "D", "x": 4.3 },
        { "name": "E", "x": 4.9 },
        { "name": "F", "x": 5.4 },
        { "name": "G", "x": 8.6 },
        { "name": "H", "x": 9.3 }
      ],
      "knob": { "label": "Cut height", "min": 0.3, "max": 10, "step": 0.1, "init": 5 },
      "insights": [
        { "max": 1.5, "text": "A low cut leaves many tiny clusters — and the count changes with every small nudge (unstable).", "tone": "info" },
        { "max": 4, "text": "A mid cut gives three clusters, and the count holds steady across a wide band of heights — a natural choice.", "tone": "info" },
        { "max": 10, "text": "🤯 A high cut collapses everything to one group. Same tree, different cut, different k — cutting the tree is how a dendrogram becomes clusters.", "tone": "wow" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Cutting the dendrogram", "formula": "horizontal cut at height h → branches unmerged below h are the clusters", "text": "A tall gap between merges (no joins over a wide height range) marks a natural, stable place to cut." }
    }
  },
  {
    "q": "Hierarchical clustering repeatedly merges the two 'closest' clusters. But clusters are groups, not points — so how is the distance between two CLUSTERS defined?",
    "choices": [
      "By a linkage rule — e.g. their closest pair, farthest pair, or average pairwise distance",
      "Always by the straight-line distance between the first point added to each cluster",
      "By subtracting the two clusters' member counts and taking the absolute difference",
      "By whichever of the two clusters happens to have the larger internal spread",
      "By simply counting up how many other stray points happen to physically separate the two clusters"
    ],
    "explain": "Point-to-point distance is obvious, but cluster-to-cluster needs a rule for summarising many pairwise distances into one number. That rule is the 'linkage': single (closest pair), complete (farthest pair), average (mean pair), or Ward (variance growth).",
    "simple": "Two crowds — how far apart are they? You must pick a rule. Nearest two people (single linkage)? Farthest two (complete)? The average over all pairs? Each rule is a 'linkage', and it quietly decides the whole shape of your clusters. Distance between groups isn't one obvious number; it's a choice you make.",
    "widget": {
      "type": "curveStatic",
      "title": "Which pair defines the gap?",
      "world": "Two clusters and the several 'distances' you could report between them. Slide across the linkage rules — each gives a different number, and a different clustering.",
      "xlab": "linkage rule →",
      "xs": [
        0,
        1,
        2,
        3
      ],
      "labels": [
        "single (closest)",
        "average (mean)",
        "complete (farthest)",
        "Ward (variance)"
      ],
      "dec": 1,
      "yunit": "",
      "series": [
        { "name": "reported cluster distance", "ys": [ 1.2, 3.4, 5.8, 4.1 ] }
      ],
      "knob": { "label": "Linkage", "min": 0, "max": 3, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Single linkage reports the CLOSEST pair (1.2) — so clusters merge easily and can chain into long snakes.", "tone": "info" },
        { "max": 2, "text": "Complete linkage reports the FARTHEST pair (5.8) — so clusters merge only when compact, keeping tight balls.", "tone": "info" },
        { "max": 3, "text": "🤯 Same two clusters, four different 'distances'. The linkage rule — not the data alone — defines cluster distance, and quietly shapes every merge.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Linkage", "formula": "single = min pair · complete = max pair · average = mean pair · Ward = Δvariance", "text": "sklearn: AgglomerativeClustering(linkage=...). Ward (compact, roundish clusters) is the common default." }
    }
  },
  {
    "q": "Hierarchical clustering is usually 'agglomerative'. What does that mean, and what's the alternative?",
    "choices": [
      "Agglomerative builds bottom-up by merging; the rare alternative, divisive, splits top-down",
      "Agglomerative works only on numeric features, while divisive is built for categories",
      "Agglomerative needs the number of clusters k set in advance; divisive discovers it alone",
      "Agglomerative is meant for small data, while divisive is the version that scales to millions",
      "Agglomerative averages the cluster centroids, while divisive keeps shifting them around"
    ],
    "explain": "Agglomerative = bottom-up: start with every point alone and repeatedly merge the two closest clusters until one remains. Divisive = top-down: start with everything in one cluster and recursively split. Agglomerative is far more common because merging is cheaper than deciding how to split.",
    "simple": "Agglomerative starts from the bottom — every point solo — and marries the closest pairs upward into a tree. Divisive does the mirror image: start with one giant group and keep splitting it. Almost everyone uses agglomerative, because 'find the closest pair to merge' is easy, while 'find the best way to cut a group in two' is hard.",
    "widget": {
      "type": "curveStatic",
      "title": "Bottom-up vs top-down",
      "world": "The two directions of building the tree, and the work each step costs. Slide across to see why bottom-up wins in practice.",
      "xlab": "aspect →",
      "xs": [
        0,
        1,
        2
      ],
      "labels": [
        "direction",
        "cost per step",
        "how common"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "agglomerative (bottom-up)", "ys": [ 10, 20, 95 ] },
        { "name": "divisive (top-down)", "ys": [ 90, 85, 10 ] }
      ],
      "knob": { "label": "Aspect", "min": 0, "max": 2, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Direction: agglomerative merges upward from single points; divisive splits downward from one big cluster. Mirror images.", "tone": "info" },
        { "max": 1, "text": "Cost: 'find the closest pair to merge' is cheap; 'find the best split of a group' is expensive — there are astronomically many ways to cut a group in two.", "tone": "info" },
        { "max": 2, "text": "🤯 So agglomerative is what nearly every library ships. The direction (not data type, not k, not scale) is the real difference.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Agglomerative vs divisive", "formula": "agglomerative: merge bottom-up · divisive: split top-down (rare)", "text": "sklearn ships agglomerative. Bisecting k-means is the practical divisive method." }
    }
  },
  {
    "q": "Given that hierarchical clustering produces a whole tree, why do people still reach for k-means on large datasets?",
    "choices": [
      "Hierarchical needs all pairwise distances (~n²), so it's too slow and memory-hungry at scale",
      "Hierarchical clustering can only ever discover exactly two separate clusters at any single moment",
      "Hierarchical clustering requires fully labelled data before it can begin building its tree",
      "Hierarchical clustering cannot cope with datasets that carry more than three features",
      "Hierarchical clustering always produces strictly worse clusters than k-means ever does"
    ],
    "explain": "Building the full merge tree needs the distances between all pairs of points — memory and time grow like n², which is fine for thousands of points but hopeless for millions. k-means scales roughly linearly, so it wins on big data despite giving only one flat grouping.",
    "simple": "The lovely tree isn't free: to build it you compare every point with every other point, and that cost explodes as the dataset grows (n² is brutal at a million rows). k-means only compares points to a handful of centroids, so it scales. On big data you trade the tree for speed.",
    "widget": {
      "type": "curveStatic",
      "title": "The price of the tree",
      "world": "Time to cluster as the dataset grows: hierarchical (all pairwise distances) vs k-means (points to centroids). Watch the gap explode.",
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
        "100k",
        "1M",
        "10M"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "hierarchical time (s)", "ys": [ 1, 90, 9000, 900000, 90000000 ] },
        { "name": "k-means time (s)", "ys": [ 1, 3, 12, 80, 500 ] }
      ],
      "knob": { "label": "Dataset size", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "At a few thousand points both are fast, and the tree's extra insight is worth having.", "tone": "info" },
        { "max": 2, "text": "At 100k, hierarchical needs ~10 billion pairwise distances — hours and gigabytes — while k-means is still seconds.", "tone": "warn" },
        { "max": 4, "text": "🤯 At millions of rows the tree is simply infeasible (n² blows up), so k-means wins on scale. It's the cost, not cluster count, labels, or feature limits.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Why k-means at scale", "formula": "hierarchical ≈ O(n²) memory/time · k-means ≈ linear in n", "text": "For big data: k-means or MiniBatchKMeans, or sample-then-tree. Hierarchical shines on smaller data where the dendrogram's full structure is the prize." }
    }
  },
  {
    "q": "Agglomerative (hierarchical) clustering starts with every point alone in its own cluster. What happens next, over and over?",
    "choices": [
      "The two closest clusters merge, until everything is one",
      "The largest cluster keeps recursively splitting into two",
      "Each cluster's centre drifts toward its members' mean",
      "Every point jumps to its nearest centre each round",
      "Sparse points beyond a set radius get pruned away"
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
      "Always n clusters, one per leaf, since every point begins alone",
      "Exactly two clusters, matching the tree's single final root merge",
      "It is fixed the moment you choose a linkage rule; the algorithm decides for you",
      "Roughly the square root of n, a common rule of thumb for cluster counts"
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
      "It shatters long, elongated clusters into many small over-compact little balls",
      "It forces all resulting clusters to share nearly identical diameters",
      "It needs class labels supplied before any two clusters may merge",
      "It works only when every feature is first reduced to one dimension"
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
      "The dendrogram requires class labels that huge datasets seldom carry",
      "Only k-means can recover nested, multi-level cluster structure",
      "The tree's cost is only n log n, yet still slower than k-means' linear pass",
      "A dendrogram stays statistically valid only below a thousand points"
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
      "Merge the pair of clusters whose two nearest individual members are closest, disregarding every single other point",
      "Merge the pair with the nearest centroids, using centre distance alone and ignoring each cluster's spread",
      "Merge the two smallest clusters first, so that cluster sizes stay balanced as the tree grows upward",
      "Merge the pair of clusters whose member counts are most similar, keeping every merge size-matched"
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
      "Bottom-up exactly like agglomerative, except it merges clusters in a random order, so its dendrogram is unstable and almost never trusted",
      "Top-down splitting that stays rare only because the earliest library authors happened to implement the merging version first, and it simply stuck",
      "Top-down, but it is avoided because each recursive split discards the global structure that patient agglomerative merging so carefully preserves",
      "Top-down splitting whose one true drawback is that it can never yield a dendrogram at all, so you completely forfeit the whole multi-granularity cluster tree"
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
      "Rent enough RAM to hold the entire n-by-n distance matrix, then run the exact tree completely unchanged",
      "Split the rows into several equal parts, cluster each part on its own, then simply concatenate all the separate dendrograms",
      "Pre-sort every row so that nearby points sit adjacent, which makes all the pairwise distances cheap to compute",
      "Switch the linkage rule to single, whose nearest-pair shortcut lets the entire tree be built in linear time"
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
      "It merely speeds the run up by pruning candidate merge pairs, while the final clusters come out exactly identical",
      "It pins the final cluster count to the number of connected components found in the neighbour graph you supply",
      "It swaps the Euclidean metric for the count of graph hops between points as the new distance used in merging",
      "It quietly converts the whole agglomerative procedure into a top-down divisive method that recursively splits along the graph edges"
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
      "Cut through the shortest vertical gap, where merges pack most tightly together, since that is where the structure is strongest",
      "Cut at the mean merge height, averaging across every join so that no single large gap can bias the choice",
      "Cut just above the very first merge, isolating the two closest points together as their own tiny cluster",
      "Cut wherever a burst of merges happens fastest, since rapid merging is the clearest sign of a real boundary"
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
