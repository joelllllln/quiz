/* DBSCAN — Parts I & II. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).dbscan1 = [
  {
    "q": "DBSCAN is a 'density-based' clustering method. What does 'density' mean here?",
    "choices": [
      "How crowded a region is — how many points sit close together in a small area",
      "How far apart the two nearest clusters sit from each other in space",
      "How many clusters the algorithm decides to output across the whole run",
      "How evenly the points are spread across the entire feature space overall",
      "How close a point lies to the mean centre of the cluster it joins"
    ],
    "explain": "In DBSCAN a cluster is a region where points are packed closely together — high density — separated by sparser, emptier space. Density is made precise by two knobs: eps (how far to look) and min_samples (how many neighbours must be within that reach). Wherever enough points crowd within eps, DBSCAN grows a cluster, whatever its shape.",
    "simple": "Density just means 'how crowded'. Picture a party: some corners are packed shoulder to shoulder, others nearly empty. DBSCAN calls the packed corners clusters and the empty gaps between them 'not a cluster'. It hunts for crowds, not for tidy round blobs.",
    "widget": {
      "type": "curveStatic",
      "title": "Crowds vs empty space",
      "world": "One dataset viewed at rising density levels — watch how much of it counts as 'crowded'.",
      "xlab": "region crowdedness →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["empty", "sparse", "medium", "packed", "dense"],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "points in crowded regions (%)", "ys": [5, 25, 55, 80, 95] },
        { "name": "points in empty gaps (%)", "ys": [95, 75, 45, 20, 5] }
      ],
      "knob": { "label": "crowdedness", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Sparse regions: hardly any point has close company, so almost nothing counts as a crowd.", "tone": "info" },
        { "max": 3, "text": "As regions grow more crowded, more points sit inside genuine crowds and clusters take shape.", "tone": "info" },
        { "max": 4, "text": "🤯 Packed regions are pure density — DBSCAN calls these crowds clusters and the gaps between them empty space, whatever their shape.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Density", "formula": "cluster = crowded region; gaps between crowds = empty space", "text": "Density, set by eps and min_samples, is DBSCAN's whole definition of what a cluster is." }
    }
  },
  {
    "q": "DBSCAN labels some points 'border' points. What is a border point?",
    "choices": [
      "A point within a core point's neighbourhood but not crowded enough to be core itself",
      "A point sitting exactly on the line that divides two neighbouring clusters apart",
      "A point that belongs to no cluster at all and is left labelled as noise instead",
      "The outermost core point lying along the very edge of a dense cluster region",
      "A point that is equally distant from two different cluster centres at the same time"
    ],
    "explain": "A border point sits within eps of a core point, so it joins that core's cluster — but it doesn't have min_samples neighbours of its own, so it can't extend the cluster further. It belongs to the cluster's edge: included, but unable to recruit new members. Core points grow clusters; border points merely ride along.",
    "simple": "A border point is a cluster's hanger-on. It stands close enough to a member of the crowd to be counted in, but doesn't have a full crowd around itself, so it sits on the fringe. It gets to belong, but it can't pull anyone else in the way core points can.",
    "widget": {
      "type": "curveStatic",
      "title": "Standing on the fringe",
      "world": "Points sampled from a cluster's core outward — where does 'core' end and 'border' begin?",
      "xlab": "distance from the dense interior →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["centre", "inner", "edge", "fringe", "outside"],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "neighbours within eps", "ys": [12, 9, 5, 3, 1] },
        { "name": "min_samples threshold", "ys": [4, 4, 4, 4, 4] }
      ],
      "knob": { "label": "distance out", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Deep in the interior a point has many neighbours — well above the threshold, so it's a core point.", "tone": "info" },
        { "max": 3, "text": "Near the edge the neighbour count dips below min_samples: the point is now a border point, included but not core.", "tone": "info" },
        { "max": 4, "text": "🤯 Past the fringe a point has almost no neighbours and drops out entirely — border points are the last ones still attached to the crowd.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Border point", "formula": "within eps of a core point but < min_samples neighbours of its own", "text": "Border points belong to the cluster's edge — pulled in by a core neighbour, but unable to grow the cluster themselves." }
    }
  },
  {
    "q": "How does the 'k-distance plot' help you choose DBSCAN's eps?",
    "choices": [
      "Sort each point's distance to its k-th neighbour and read eps off the elbow",
      "Plot the distance between every pair of points and then take the maximum",
      "Count the clusters produced at each eps and keep the value with the largest count",
      "Average every point's nearest-neighbour distance and simply use that as eps",
      "Chart cluster sizes against eps and pick the value at the widest stable plateau"
    ],
    "explain": "For points inside a cluster, the distance to their k-th nearest neighbour is small and similar; for noise it is large. Sorting those distances gives a curve that stays low then bends sharply upward — the elbow marks the boundary between 'inside a cluster' and 'crossing empty space'. Reading eps off that bend replaces a blind guess with a value measured from the data.",
    "simple": "Ask every point 'how far to your k-th closest neighbour?'. People in crowds answer with small, similar numbers; loners answer with big ones. Sort the answers and the line crawls flat then suddenly shoots up — that corner is where crowd ends and emptiness begins, and that's your eps.",
    "widget": {
      "type": "curveStatic",
      "title": "Find the elbow",
      "world": "Every point's k-th-neighbour distance, sorted low to high — the bend tells you eps.",
      "xlab": "points, sorted by k-th-NN distance →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["10%", "40%", "70%", "90%", "99%"],
      "dec": 1,
      "yunit": "",
      "series": [
        { "name": "k-th-NN distance", "ys": [0.3, 0.4, 0.5, 1.2, 2.8] }
      ],
      "knob": { "label": "position along curve", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "The flat shelf: most points reach their k-th neighbour within about 0.4 — these are dense cluster interiors.", "tone": "info" },
        { "max": 3, "text": "Around 90% along, the curve starts lifting — border points reaching a little further for their neighbours.", "tone": "info" },
        { "max": 4, "text": "🤯 The last stretch rockets upward: noise points crossing empty space. eps sits at the elbow, about 0.5 — measured, not guessed.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "k-distance plot", "formula": "sort dist-to-kth-neighbour; eps = value at the elbow", "text": "The standard recipe for reading a sensible eps straight off the data instead of guessing." }
    }
  },
  {
    "q": "DBSCAN's first parameter is 'eps'. What does eps mean?",
    "choices": [
      "The radius that defines each point's neighbourhood — 'this close counts as near'",
      "The number of clusters DBSCAN should return",
      "The minimum size a cluster is allowed to be",
      "The fraction of points allowed to be noise",
      "The number of times the algorithm iterates"
    ],
    "explain": "eps is the neighbourhood radius: two points are neighbours if they sit within eps of each other. Together with minPts it defines what 'dense' means. Set eps too small and everything is noise; too large and everything merges into one cluster.",
    "simple": "eps is your definition of 'nearby'. Draw a circle of radius eps around a point, and whoever falls inside is a neighbour. That single distance sets the scale of the whole clustering — it's not a cluster count, a size limit, or an iteration count. It's how far 'near' reaches.",
    "widget": {
      "type": "curveStatic",
      "title": "How far does 'near' reach?",
      "world": "One dataset clustered at growing eps. Watch it swing from all-noise (radius too small) to one-blob (radius too big).",
      "xlab": "eps (neighbourhood radius) →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "tiny",
        "small",
        "right",
        "large",
        "huge"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "clusters found", "ys": [ 0, 5, 3, 2, 1 ] },
        { "name": "points marked noise (%)", "ys": [ 95, 30, 8, 2, 0 ] }
      ],
      "knob": { "label": "eps", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Tiny eps: nobody has enough neighbours, so almost everything is noise. 'Near' reaches too short.", "tone": "warn" },
        { "max": 2, "text": "The right eps: three clean clusters, little noise. The radius matches the data's real spacing.", "tone": "info" },
        { "max": 4, "text": "🤯 Huge eps: everyone is everyone's neighbour, so it all melts into one cluster. eps sets the SCALE of density — not a cluster count or an iteration count.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "eps (neighbourhood radius)", "formula": "two points are neighbours if their distance ≤ eps", "text": "Read a sensible eps off the 'k-distance plot' — sort each point's distance to its k-th neighbour and find the elbow." }
    }
  },
  {
    "q": "DBSCAN's second parameter is 'minPts' (or min_samples). What does it set?",
    "choices": [
      "How many neighbours a point needs within eps to count as being in a dense region",
      "The maximum number of points allowed in one cluster",
      "The number of clusters to search for",
      "The smallest distance two clusters must keep apart",
      "The number of features used to measure distance"
    ],
    "explain": "minPts is the crowd-size threshold: a point sitting in a region with at least minPts neighbours (within eps) is 'in the dense interior'. eps sets how far you look; minPts sets how many must be there. Together they define density.",
    "simple": "minPts is how big a crowd has to be before it counts as a crowd. Stand at a point, look within radius eps, and count the neighbours — if there are at least minPts of them, you're in a dense area. eps is the reach; minPts is the headcount. The two together are DBSCAN's whole definition of 'dense'.",
    "widget": {
      "type": "curveStatic",
      "title": "How big must the crowd be?",
      "world": "Same eps, rising minPts. As the required headcount grows, fewer points qualify as 'dense' and more become noise.",
      "xlab": "minPts (required neighbours) →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "2",
        "4",
        "8",
        "15",
        "30"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "points in dense interiors (%)", "ys": [ 92, 80, 62, 38, 15 ] },
        { "name": "points marked noise (%)", "ys": [ 3, 9, 22, 45, 74 ] }
      ],
      "knob": { "label": "minPts", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Low minPts: almost any point counts as dense — even thin, straggly regions form clusters.", "tone": "info" },
        { "max": 2, "text": "Moderate minPts: only genuinely crowded regions qualify, and sparse stragglers become noise.", "tone": "info" },
        { "max": 4, "text": "🤯 High minPts: the crowd bar is so high that most points are 'noise'. minPts is the headcount for density — not a cluster count or a size cap.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "minPts (density threshold)", "formula": "a point is dense if ≥ minPts neighbours lie within eps", "text": "A common rule of thumb: minPts ≈ 2 × number of features. Raise it to suppress noise, lower it to keep sparse clusters." }
    }
  },
  {
    "q": "DBSCAN sorts points into three roles. What is a 'core' point?",
    "choices": [
      "A point with at least minPts neighbours within eps — sitting inside a dense region",
      "The single centre of gravity of a cluster",
      "The first point DBSCAN happens to visit",
      "A point exactly on the boundary between two clusters",
      "The densest point in the entire dataset"
    ],
    "explain": "A core point has a full crowd around it (≥ minPts neighbours within eps), so it sits in a cluster's dense interior and can grow the cluster outward. Core points are the seeds and engine of every DBSCAN cluster.",
    "simple": "A core point is one standing in a crowd — enough neighbours nearby to count as dense. These are the cluster's beating heart: DBSCAN starts from a core point and expands outward through other core points. It's not a centroid, not the first point visited, not the single densest point — just any point with a full crowd around it.",
    "widget": {
      "type": "dbscanScan",
      "title": "Core, border, noise",
      "world": "Widen each point's reach (eps). Points that gather a full crowd (≥ minPts neighbours) become CORE and seed clusters; a couple of lonely stragglers stay noise.",
      "xlab": "feature 1",
      "ylab": "feature 2",
      "minPts": 3,
      "showEpsAt": 3,
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
        { "x": 1, "y": 1 }
      ],
      "knob": { "label": "Reach radius (eps)", "min": 0.3, "max": 3.5, "step": 0.05, "init": 0.4 },
      "insights": [
        { "max": 1, "text": "Small reach: nobody has ≥ 3 neighbours, so there are no core points yet — almost everything is noise.", "tone": "info" },
        { "max": 2, "text": "As the reach grows, points in the dense bands gather full crowds and turn CORE — those are the dense interiors that seed clusters.", "tone": "info" },
        { "max": 3.5, "text": "🤯 Core points chain outward into clusters, pulling in their neighbours (border points), while the lone straggler stays noise. Clusters are grown from core points outward — that's why 'core' is the key role.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Core point", "formula": "≥ minPts neighbours within eps → core (dense interior, grows the cluster)", "text": "Border points sit in a core point's neighbourhood but aren't dense themselves; noise points belong to no dense region at all." }
    }
  },
  {
    "q": "After DBSCAN runs, some points are labelled −1. What does that mean, and why is it a feature?",
    "choices": [
      "They're noise — in no dense region — and being allowed to belong to nothing is genuinely useful",
      "They form a hidden extra cluster numbered −1",
      "They are the core points that seeded the clusters",
      "They were skipped because the algorithm ran out of time",
      "They belong to every cluster at once, so can't be assigned"
    ],
    "explain": "−1 is DBSCAN's noise label: points reachable from no dense region. Unlike k-means, which forces every point into some cluster, DBSCAN can say 'this point belongs to nothing' — which is exactly right for outliers and makes it double as an anomaly detector.",
    "simple": "−1 means 'noise — this point isn't part of any crowd'. That's a strength, not a bug: k-means shoves every outlier into the nearest cluster whether it fits or not, but DBSCAN is allowed to shrug and leave true oddballs unassigned. That honesty is why DBSCAN doubles as an outlier finder.",
    "widget": {
      "type": "curveStatic",
      "title": "Allowed to say 'belongs to nothing'",
      "world": "A dataset with two clusters and scattered outliers, clustered by k-means (forces everyone in) vs DBSCAN (can label noise). Watch how each treats the outliers.",
      "xlab": "outlier fraction in the data →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "0%",
        "5%",
        "10%",
        "20%",
        "35%"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "DBSCAN: cluster quality", "ys": [ 92, 90, 88, 84, 78 ] },
        { "name": "k-means: cluster quality", "ys": [ 90, 80, 70, 55, 38 ] }
      ],
      "knob": { "label": "Outlier fraction", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "No outliers: both do fine — nobody needs a noise label yet.", "tone": "info" },
        { "max": 2, "text": "Add outliers and k-means degrades fast — each oddball is forced into a cluster, dragging its centroid. DBSCAN quarantines them as −1.", "tone": "info" },
        { "max": 4, "text": "🤯 Heavy outliers: DBSCAN holds up because it simply labels the junk −1, while k-means' forced assignments wreck its clusters. 'Belongs to nothing' is the feature.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Noise label (−1)", "formula": "reachable from no dense region → labelled −1 (noise)", "text": "This makes DBSCAN a natural outlier/anomaly detector — the noise set IS the anomalies." }
    }
  },
  {
    "q": "DBSCAN never asks for k. Instead it grows clusters from 'dense' points. What is its definition of a cluster?",
    "choices": [
      "A connected region where points have enough neighbours within a radius",
      "A ball of points centred on their mean and sized to contain minPts members",
      "The set of points each nearer to one centroid than to any other one",
      "A branch pruned from the data's density-based merge dendrogram",
      "Any maximal group of points all lying within a single eps of each other"
    ],
    "explain": "A core point has ≥ minPts neighbours within radius eps. Core points within reach of each other chain together, plus their borderline hangers-on — the cluster is whatever that flood-fill reaches. Shape doesn't matter; density does.",
    "simple": "DBSCAN's rule: 'you're in a crowd if enough people stand within arm's reach — and your crowd includes everyone reachable through chains of such people.' Crowds can be any shape: crescents, rings, blobs. What matters is packed-together-ness, not roundness.",
    "widget": {
      "type": "dbscanScan",
      "title": "Crowds, not flagpoles",
      "world": "The same two crescents that broke k-means. Your knob is the arm's reach (radius). Find the reach where the crowds emerge — correctly this time.",
      "xlab": "feature 1",
      "ylab": "feature 2",
      "minPts": 3,
      "showEpsAt": 3,
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
      "knob": { "label": "Reach radius (eps)", "min": 0.3, "max": 3.5, "step": 0.05, "init": 0.4 },
      "insights": [
        { "max": 0.7, "text": "Tiny reach: nobody has enough neighbours — everything is 'noise' (hollow rings). No crowds exist at this definition of close.", "tone": "info" },
        { "max": 1.6, "text": "🤯 Around 1.0–1.4: TWO clusters appear, and they're the actual crescents — each moon found by chaining through its own dense interior. The shape k-means couldn't see, density sees effortlessly.", "tone": "wow" },
        { "max": 3.5, "text": "Big reach: the moons chain into one mega-crowd. eps is DBSCAN's personality dial — the next exercises are about setting it.", "tone": "warn" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "DBSCAN (density-based clustering)", "formula": "core point: ≥ minPts neighbours within eps · cluster: everything density-reachable from a core", "text": "Clusters as connected dense regions — any shape, count discovered not chosen, and a built-in notion of 'belongs to nothing'. The three gifts k-means lacks." }
    }
  },
  {
    "q": "DBSCAN takes eps (radius) and minPts (neighbour quota). What happens as you grow eps from tiny to huge?",
    "choices": [
      "Noise → many small clusters → true clusters → everything merges into one",
      "One giant blob first, then true clusters, then many small ones, then noise",
      "Clusters keep splitting until every point forms its own cluster",
      "True clusters appear at once, then slowly shed their noise points",
      "The number of clusters rises without bound as eps keeps growing"
    ],
    "explain": "Tiny eps: no one qualifies as core — all noise. Growing: dense pockets ignite separately, then knit into the true clusters, then bridge across gaps until one blob swallows all. The right eps lives on the plateau where the count is stable.",
    "simple": "'Arm's reach' defines the crowd. Millimetre arms: everyone is a loner. Metre arms: real huddles appear. Ten-metre arms: the whole street is 'one crowd'. Somewhere in the middle the huddle count stops changing for a while — that plateau is where the truth sits.",
    "widget": {
      "type": "dbscanScan",
      "title": "The whole story of eps",
      "world": "Three blobs of different sizes plus a few loners. Sweep eps through its whole range slowly and narrate the phases: noise, ignition, truth, merger.",
      "xlab": "feature 1",
      "ylab": "feature 2",
      "minPts": 3,
      "showEpsAt": 6,
      "points": [
        { "x": 1.4, "y": 7.6 },
        { "x": 2, "y": 8.2 },
        { "x": 1.6, "y": 8.8 },
        { "x": 2.4, "y": 7.8 },
        { "x": 5, "y": 2 },
        { "x": 5.6, "y": 1.5 },
        { "x": 5.3, "y": 2.7 },
        { "x": 6.1, "y": 2.2 },
        { "x": 5.8, "y": 3 },
        { "x": 8.2, "y": 7 },
        { "x": 8.8, "y": 7.6 },
        { "x": 8.4, "y": 8.3 },
        { "x": 9.2, "y": 7 },
        { "x": 9, "y": 8 },
        { "x": 3.6, "y": 5 },
        { "x": 9.6, "y": 1 }
      ],
      "knob": { "label": "Reach radius (eps)", "min": 0.3, "max": 4.5, "step": 0.05, "init": 0.35 },
      "insights": [
        { "max": 0.6, "text": "Phase 1 — noise: rings everywhere. At this reach, no point has its quota of neighbours.", "tone": "info" },
        { "max": 1.6, "text": "Phase 2–3: the three real blobs ignite one by one and the loners stay ringed. Note how WIDE the range is where the answer is exactly 3 — that stability is your eps-picking signal.", "tone": "wow" },
        { "max": 4.5, "text": "Phase 4 — merger: reaches bridge the gaps and the count collapses toward 1. The loners get swallowed last. One dial, four regimes.", "tone": "warn" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "eps and minPts", "formula": "sweep eps, trust the plateau · pick eps at the knee of the k-distance plot", "text": "minPts sets how strict 'dense' is (rule of thumb: ≥ dimensions + 1, often 4–5); eps sets the scale. The stable plateau — not any single magic value — is what you're hunting." }
    }
  },
  {
    "q": "Three of your points end up labelled −1 by DBSCAN. What is it telling you, and why is that a feature rather than a bug?",
    "choices": [
      "They belong to no dense region — explicit outliers, honestly flagged",
      "They are border points DBSCAN could not confidently attach to a cluster",
      "They are core points whose neighbourhoods happened to overlap heavily",
      "They were reachable but arrived after the cluster had already closed",
      "They mark the low-density seams where two clusters meet and cancel"
    ],
    "explain": "K-means forces EVERY point into some cluster, however absurd the fit. DBSCAN has a vocabulary for 'this point is just noise' — which doubles as free anomaly detection and keeps outliers from dragging cluster shapes around.",
    "simple": "Every crowd-finder meets the guy standing alone in a field. K-means shrugs and assigns him to the nearest crowd half a mile away — polluting that crowd's statistics. DBSCAN says the honest thing: 'he's not in a crowd'. Sometimes the loners ARE the finding — fraud, sensor glitches, rare cases.",
    "widget": {
      "type": "dbscanScan",
      "title": "Permission to say 'nobody'",
      "world": "One tight community, one loose one, and three genuine loners. Find an eps where both communities light up — and watch what stays ringed.",
      "xlab": "feature 1",
      "ylab": "feature 2",
      "minPts": 3,
      "showEpsAt": 0,
      "points": [
        { "x": 2, "y": 3 },
        { "x": 2.5, "y": 3.6 },
        { "x": 2.2, "y": 2.5 },
        { "x": 2.9, "y": 3 },
        { "x": 2.6, "y": 4 },
        { "x": 3.2, "y": 3.4 },
        { "x": 7, "y": 6.6 },
        { "x": 7.7, "y": 7.3 },
        { "x": 7.3, "y": 6 },
        { "x": 8.1, "y": 6.7 },
        { "x": 7.8, "y": 7.8 },
        { "x": 0.7, "y": 9 },
        { "x": 9.5, "y": 1.2 },
        { "x": 5, "y": 9.6 }
      ],
      "knob": { "label": "Reach radius (eps)", "min": 0.3, "max": 4, "step": 0.05, "init": 0.5 },
      "insights": [
        { "max": 0.7, "text": "Too strict: even community members look like loners. Noise-labelling is only meaningful once real clusters exist.", "tone": "info" },
        { "max": 1.8, "text": "🤯 Both communities found — and the three loners keep their hollow rings. The algorithm just did anomaly detection without being asked. k-means would have conscripted them.", "tone": "wow" },
        { "max": 4, "text": "Stretch far enough and even the loners get absorbed. 'Outlier' is relative to your density scale — eps decides where honesty ends.", "tone": "warn" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Noise points (label −1)", "formula": "not density-reachable from any core point → outlier, member of nothing", "text": "A clustering that can decline to cluster. In fraud, monitoring and cleaning pipelines, DBSCAN's −1 list is often the deliverable itself." }
    }
  },
  {
    "q": "Unlike k-means, DBSCAN discovers HOW MANY clusters exist. When is that autonomy most valuable?",
    "choices": [
      "When you genuinely don't know the group count — and it may change over time",
      "When you can already supply k and simply want to confirm it independently",
      "When the clusters must all contain the same number of points",
      "When the data arrives already sorted by its true group labels",
      "When you want the fewest possible clusters the data will allow"
    ],
    "explain": "Segmentations, spatial hotspots, event detection: the count IS the unknown. DBSCAN reads it from density, and tomorrow's data can honestly yield a different count — no k to hard-code, no re-tuning ritual.",
    "simple": "Asking 'find me the crime hotspots' shouldn't require announcing how many hotspots exist — that's the question! Density methods let the data volunteer the number. This week: four hotspots. Next month: two. The pipeline doesn't care.",
    "widget": {
      "type": "dbscanScan",
      "title": "The count nobody typed",
      "world": "City incident locations. At a sensible reach, count the hotspots the data volunteers — then re-imagine this exact pipeline next month, when the map changes.",
      "xlab": "east–west",
      "ylab": "north–south",
      "minPts": 3,
      "showEpsAt": 2,
      "points": [
        { "x": 1.6, "y": 2 },
        { "x": 2.2, "y": 2.6 },
        { "x": 1.9, "y": 1.4 },
        { "x": 2.6, "y": 2 },
        { "x": 6.4, "y": 8 },
        { "x": 7, "y": 8.6 },
        { "x": 6.7, "y": 7.4 },
        { "x": 7.4, "y": 8 },
        { "x": 7.7, "y": 8.8 },
        { "x": 4.8, "y": 5 },
        { "x": 5.4, "y": 5.5 },
        { "x": 5.1, "y": 4.4 },
        { "x": 5.8, "y": 5 },
        { "x": 9, "y": 2.4 },
        { "x": 9.6, "y": 3 },
        { "x": 9.3, "y": 1.8 },
        { "x": 3.5, "y": 9.3 },
        { "x": 0.8, "y": 6.8 }
      ],
      "knob": { "label": "Reach radius (eps)", "min": 0.3, "max": 3.5, "step": 0.05, "init": 0.4 },
      "insights": [
        { "max": 0.7, "text": "All noise — the map has no hotspots at this density standard.", "tone": "info" },
        { "max": 1.4, "text": "🤯 FOUR hotspots emerge, plus two isolated incidents left honestly unclustered. Nobody typed a 4 anywhere — the map confessed it.", "tone": "wow" },
        { "max": 3.5, "text": "Push the reach and hotspots federate into districts, then one city. The count is a function of scale — which is honest: 'how many groups' always depends on how closely you look.", "tone": "info" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Emergent cluster count", "formula": "clusters = number of density-connected components at scale eps", "text": "K-means answers 'divide this into k'; DBSCAN answers 'what groups exist?'. Different questions — pick the algorithm that matches yours." }
    }
  },
  {
    "q": "One tight, dense cluster and one sparse, spread-out cluster share a dataset. Why does this defeat DBSCAN's single eps?",
    "choices": [
      "Any one reach is too big for the tight cluster or too small for the sparse one",
      "The two clusters would need different minPts values, which one run cannot give",
      "A tight cluster and a sparse one can never be density-reachable from each other",
      "The sparse cluster's points can never accumulate minPts neighbours at all",
      "One eps forces both clusters to hold the same number of core points"
    ],
    "explain": "eps is GLOBAL: one density standard for the whole dataset. A reach that keeps the tight cluster separate reads the sparse cluster as scattered noise; a reach generous enough for the sparse one chains everything together. HDBSCAN exists precisely for this.",
    "simple": "One arm's-reach rule for the whole city fails when one neighbourhood parties shoulder-to-shoulder and another spreads across picnic blankets. Strict rule: the picnic 'isn't a crowd'. Loose rule: the whole park merges. No single rule fits both — you need a method that adapts per neighbourhood.",
    "widget": {
      "type": "dbscanScan",
      "title": "One rule, two neighbourhoods",
      "world": "A tight huddle (left) and a sparse gathering (right), with stepping-stone points between. Try to find ONE reach that finds both groups cleanly. Take your time. It isn't there.",
      "xlab": "feature 1",
      "ylab": "feature 2",
      "minPts": 3,
      "showEpsAt": 8,
      "points": [
        { "x": 1.5, "y": 5 },
        { "x": 1.8, "y": 5.3 },
        { "x": 2.1, "y": 5 },
        { "x": 1.8, "y": 4.7 },
        { "x": 2.2, "y": 5.4 },
        { "x": 1.4, "y": 5.4 },
        { "x": 3.2, "y": 4.8 },
        { "x": 4.6, "y": 4.4 },
        { "x": 6, "y": 2 },
        { "x": 7.4, "y": 3.2 },
        { "x": 8.6, "y": 2.2 },
        { "x": 6.6, "y": 4.6 },
        { "x": 8, "y": 4.8 },
        { "x": 9.2, "y": 3.8 }
      ],
      "knob": { "label": "Reach radius (eps)", "min": 0.3, "max": 3, "step": 0.05, "init": 0.5 },
      "insights": [
        { "max": 0.8, "text": "Strict reach: the tight huddle shines; the sparse gathering (and the stepping stones) are all 'noise'. Half the truth.", "tone": "info" },
        { "max": 1.7, "text": "Loosening… the sparse group starts to ignite, but watch the stepping stones — they're threatening to bridge the two worlds.", "tone": "warn" },
        { "max": 3, "text": "🤯 Loose enough for the sparse group = merged into ONE blob via the bridge. You've proven a theorem by slider: no global eps fits two densities. HDBSCAN adapts the density standard locally — that's its whole reason to exist.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "The varying-density weakness", "formula": "global eps ⇒ one density scale · varying densities → HDBSCAN / OPTICS", "text": "Every clusterer's worldview fails somewhere: k-means on shapes, DBSCAN on mixed densities. Knowing each one's blind spot is what makes you the operator rather than the operated." }
    }
  }
];

(window.QUESTIONS = window.QUESTIONS || {}).dbscan2 = [
  {
    "q": "DBSCAN's eps is notoriously hard to guess. The standard recipe: compute every point's distance to its k-th nearest neighbour, sort those distances, and plot them. What are you looking for?",
    "choices": [
      "The elbow where the sorted curve shoots upward — distances below it are 'inside a cluster', above it 'crossing empty space'; set eps at the bend",
      "The flat plateau on the left where most distances agree — its height is the typical neighbour gap, so read eps straight off that shelf instead of the bend",
      "The steepest single point of the climb, where the slope is greatest — that maximum-gradient location marks the densest neighbourhood, and eps is its distance value",
      "The average of all the sorted k-th-neighbour distances, which balances dense interiors against noisy outliers and gives a robust, data-driven value for eps",
      "The far-right tail where the curve levels off again — those largest distances are the true outliers, so set eps just below them to capture every point"
    ],
    "explain": "For points inside clusters, the k-th-neighbour distance is small and similar — the flat left part of the sorted curve. Noise points and cluster borders must reach much further — the steep right tail. The bend between regimes estimates the natural neighbourhood radius: eps at the elbow (with min_samples = k, commonly 2×dims) makes cluster interiors dense and gaps sparse, which is exactly DBSCAN's working definition.",
    "simple": "Ask every resident 'how far to your 4th-closest neighbour?'. Townsfolk all answer 'a few doors down' — small, similar numbers. Hermits answer in miles. Sort all the answers and the curve crawls along low, then suddenly rockets — that corner is where town ends and wilderness begins. eps IS that boundary: it's the algorithm's definition of 'walking distance', read off the data instead of guessed.",
    "widget": {
      "type": "curveStatic",
      "title": "Where town ends and wilderness begins",
      "world": "Every point's 4th-nearest-neighbour distance, sorted ascending. Slide along the sorted points and find the corner where 'a few doors down' becomes 'miles'.",
      "xlab": "points, sorted by 4th-NN distance →",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "labels": [
        "10%",
        "30%",
        "50%",
        "70%",
        "85%",
        "99%"
      ],
      "dec": 2,
      "yunit": "",
      "series": [
        { "name": "4th-NN distance", "ys": [ 0.28, 0.33, 0.38, 0.48, 0.95, 2.6 ] }
      ],
      "knob": { "label": "Position along the sorted curve", "min": 0, "max": 5, "step": 1, "init": 0 },
      "insights": [
        { "max": 2, "text": "The flat shelf: half the dataset has its 4th neighbour within ~0.4 — these are cluster interiors, all agreeing on what 'dense' feels like.", "tone": "info" },
        { "max": 3, "text": "~70% along, the curve starts lifting: border points that have to stretch a little further. Still cluster material.", "tone": "info" },
        { "max": 5, "text": "🤯 The last 15% rockets from 0.5 to 2.6 — noise points reaching across empty space. eps ≈ 0.5, read straight off the bend. You just replaced a blind guess with a measurement.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "The k-distance plot", "formula": "sort dist-to-kth-neighbour; eps = value at the elbow · min_samples = k (≈ 2·dims)", "text": "sklearn: NearestNeighbors(n_neighbors=k).kneighbors(X), sort column k−1, plot. One picture turns DBSCAN's scariest knob into a reading exercise." }
    }
  },
  {
    "q": "Your data has one dense downtown cluster and one sprawling rural cluster. Any single eps either shreds the sprawl or merges the downtown. Which successors fix this, and how?",
    "choices": [
      "HDBSCAN/OPTICS — they sweep ALL density levels and extract clusters per region, instead of enforcing one global eps",
      "HDBSCAN/OPTICS — they rescale every feature to unit variance first, so one global eps finally fits both the dense and the sparse cluster",
      "HDBSCAN/OPTICS — they raise min_samples automatically until the sparse cluster stops fragmenting into isolated noise points",
      "HDBSCAN/OPTICS — they run DBSCAN on each region with a locally tuned eps, then stitch the partial clusterings back together",
      "HDBSCAN/OPTICS — they drop the sparse cluster as noise and cluster only the dense region, which any single eps can handle"
    ],
    "explain": "DBSCAN draws one density bar: neighbourhoods denser than eps are clusters, full stop. Varying-density data has no correct single bar. OPTICS orders points by reachability distance, encoding the clustering at EVERY eps at once; HDBSCAN builds the full density hierarchy and keeps the most STABLE clusters per branch — dense downtown and sparse sprawl each judged at their own natural level. HDBSCAN's main knob is just min_cluster_size, far friendlier than eps.",
    "simple": "One eps is one definition of 'crowded' applied to the whole map — but downtown-crowded and countryside-crowded are different things. The fix isn't a cleverer single answer; it's refusing the question: check every crowdedness level, watch which groups persist across many levels, and keep those. Stable-at-many-densities is the new definition of 'real cluster' — and it needs no eps at all.",
    "widget": {
      "type": "curveStatic",
      "title": "One density bar vs the whole staircase",
      "world": "Datasets with increasingly unequal cluster densities, clustered by single-eps DBSCAN (best eps found by search) vs HDBSCAN. Scores measure match with the true groups.",
      "xlab": "density mismatch between clusters →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "equal",
        "2×",
        "5×",
        "10×",
        "30×"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "HDBSCAN", "ys": [ 90, 89, 87, 84, 80 ] },
        { "name": "DBSCAN (best eps)", "ys": [ 91, 84, 68, 52, 35 ] }
      ],
      "knob": { "label": "Density mismatch", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Equal densities: plain DBSCAN slightly ahead — one bar suffices when one bar is true, and it's cheaper.", "tone": "info" },
        { "max": 2, "text": "5× mismatch: even the BEST single eps scores 68 — every candidate either shreds the sparse cluster into noise or floods the dense one into its surroundings.", "tone": "warn" },
        { "max": 4, "text": "🤯 30× mismatch: 80 vs 35. HDBSCAN never picked an eps — it judged each region at its own density and kept what persisted. When no single setting can be right, sweep the setting and harvest stability.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "HDBSCAN & OPTICS", "formula": "hierarchy over all eps values → keep the most stable clusters", "text": "sklearn ships both (HDBSCAN since 1.3). Default modern choice: HDBSCAN with min_cluster_size — varying density handled, eps abolished." }
    }
  },
  {
    "q": "DBSCAN on customers with age (18–70) and income (£15k–£150k), unscaled. eps is one number applied to distances. What has income's scale done to the neighbourhoods?",
    "choices": [
      "Distances are ~all income — eps effectively defines income bands, and age plays no part in who counts as neighbours",
      "Nothing lasting — DBSCAN rescales each axis internally, so neighbourhoods still weigh age and income equally",
      "Distances split evenly, so eps must be raised roughly a thousand-fold before anyone counts as a neighbour",
      "Income's wide range makes every customer a noise point, since no eps leaves anyone with minPts neighbours",
      "Age dominates because its 18-70 span cycles faster, so eps ends up defining age brackets and income is ignored"
    ],
    "explain": "Same disease as k-means and kNN: Euclidean distance sums squared differences, and income gaps (thousands) drown age gaps (tens) a million-fold. A single eps then slices income alone. Worse, DBSCAN can't even hide it — eps must be a NUMBER in the data's units, so the units decide everything: eps=5000 means '£5000', with age contributing nothing. StandardScaler first, always; then eps lives in comparable, meaningful units.",
    "simple": "eps is a ruler: 'within THIS distance, you're my neighbour'. But the ruler measures age-steps and pound-steps with the same markings, and a single pound is a step while a year is a stride of one. Any usable eps ends up spanning pennies of income and centuries of age — so neighbourhoods are income bands, and the age axis might as well not exist. Scale both features first, and the ruler finally measures 'similarity' instead of 'currency'.",
    "widget": {
      "type": "scaleFeature",
      "title": "A ruler that only reads pounds",
      "world": "One customer and four candidates. Who falls inside an eps-neighbourhood? Shrink income's units and watch the neighbourhood change occupants.",
      "aName": "age",
      "bName": "income",
      "target": { "name": "customer X", "a": 30, "b": 40000 },
      "cands": [
        { "name": "match A · 31y, £41k", "a": 31, "b": 41000 },
        { "name": "match B · 64y, £40.3k", "a": 64, "b": 40300 },
        { "name": "match C · 28y, £46k", "a": 28, "b": 46000 },
        { "name": "match D · 35y, £52k", "a": 35, "b": 52000 }
      ],
      "knob": { "label": "Shrink income units by", "min": 0, "max": 4, "step": 0.25, "init": 0 },
      "insights": [
        { "max": 0.5, "text": "Raw units: the 64-year-old with a matching income is the 'nearest neighbour' of our 30-year-old. Every DBSCAN neighbourhood inherits this verdict.", "tone": "warn" },
        { "max": 2.5, "text": "As income's shout fades, age enters the distance — and the neighbourhood roster reshuffles without a single customer moving.", "tone": "info" },
        { "max": 4, "text": "🤯 Balanced units: the genuinely similar 31-year-old is nearest. Core points, border points, noise — every DBSCAN label downstream flows from these distances, so scaling isn't preprocessing, it's the clustering itself.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Scaling before DBSCAN", "formula": "StandardScaler → eps in comparable units", "text": "All density methods share this: density = points per volume, and volume is meaningless with mixed units. Scale first, THEN read eps off the k-distance plot." }
    }
  },
  {
    "q": "Naive DBSCAN asks 'who is within eps of me?' for every point against every other point — O(n²). How do real implementations make this fast?",
    "choices": [
      "A spatial index (kd-tree/ball tree) answers each radius query in ~log n, making the whole run ~n log n",
      "They cache all n-squared distances after one pass, turning every later radius query into a constant-time lookup",
      "They sample a random subset to cluster first, then assign the remaining points to the nearest resulting cluster",
      "They sort every point along one axis so each radius query scans only a short contiguous window of neighbours",
      "They reduce the data to two dimensions with PCA, where radius queries over a small grid become far cheaper"
    ],
    "explain": "The only heavy operation in DBSCAN is the radius query. A kd-tree or ball tree partitions space so a query descends a few branches and prunes the rest — ~O(log n) per query instead of O(n), so the full run drops from O(n²) toward O(n log n). sklearn builds the index automatically (algorithm='auto'). Caveat: trees lose their pruning power in high dimensions, where distances concentrate — the curse of dimensionality again.",
    "simple": "Asking 'who lives within 500m of me?' by phoning every person in the country is n calls per resident. A street atlas fixes it: open to your neighbourhood's page and check only that page and its edges. The atlas is the spatial index — build it once, and every DBSCAN neighbourhood query becomes a page lookup instead of a national phone campaign.",
    "widget": {
      "type": "curveStatic",
      "title": "The street atlas",
      "world": "Radius queries per second (thousands) with brute force vs a kd-tree index, as the dataset grows. Both answer EXACTLY the same queries.",
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
      "dec": 1,
      "yunit": "k/s",
      "series": [
        { "name": "kd-tree index", "ys": [ 800, 400, 150, 60, 25 ] },
        { "name": "brute force", "ys": [ 500, 50, 5, 0.5, 0.05 ] }
      ],
      "knob": { "label": "Dataset size", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "At 1k points brute force is actually fine — the index's bookkeeping barely pays for itself on tiny data.", "tone": "info" },
        { "max": 2, "text": "100k points: 150k vs 5k queries/second. Brute force decays linearly with n; the tree decays like log n — the gap now decides feasibility.", "tone": "info" },
        { "max": 4, "text": "🤯 10M points: 500× apart — a 20-minute run vs a week. Same algorithm, same answers; the only change is HOW 'who's near me?' gets answered. In high dimensions the tree loses its magic though — then it's approximate indexes or reduce dimensions first.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Spatial indexes for DBSCAN", "formula": "kd-tree / ball tree: radius query in ~O(log n) ⇒ DBSCAN in ~O(n log n)", "text": "sklearn: DBSCAN(algorithm='auto') picks the index for you. Same structures accelerate kNN — one data structure, several algorithms fed." }
    }
  },
  {
    "q": "Run DBSCAN twice on the same data with the same settings but shuffled row order, and a few points swap cluster labels. Which points, and why is this considered harmless?",
    "choices": [
      "Border points reachable from TWO clusters go to whichever claimed them first — core points and noise never change, so the structure is stable",
      "Core points near a boundary get reassigned when expansion starts elsewhere — border points and noise are fixed, so the change is cosmetic",
      "Noise points just outside eps get swept into different clusters depending on scan order — core and border points stay put, so results are stable",
      "A few core points flip between core and border status as neighbours are visited in a new order — noise is untouched, so it barely moves",
      "Points exactly eps apart round differently each run, nudging cluster edges — interiors and outliers are safe, so labels stay effectively fixed"
    ],
    "explain": "Whether a point is core (≥ min_samples within eps) or noise (unreachable) depends only on geometry — order can't touch it. The single ambiguity: a border point within eps of core points from two different clusters joins whichever cluster's expansion reaches it first, and expansion order follows row order. Typically a handful of points on the seam between clusters — worth knowing so you don't mistake the flicker for instability, and worth fixing the seed/order if you need byte-identical outputs.",
    "simple": "Two towns expand street by street, and one farmhouse sits exactly on the boundary line between them. Whichever town's surveyor arrives first claims it — shuffle the survey order and the farmhouse changes towns. But the towns themselves — every core resident, every true hermit — are decided by geography, not by who knocked first. A couple of farmhouses flickering on the seam is the entire extent of DBSCAN's randomness.",
    "widget": {
      "type": "curveStatic",
      "title": "The farmhouse on the boundary",
      "world": "DBSCAN re-run six times on the same data, rows shuffled each time. Track what share of each point type changes its label versus run 1.",
      "xlab": "re-run (shuffled row order) →",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "labels": [
        "run 1",
        "run 2",
        "run 3",
        "run 4",
        "run 5",
        "run 6"
      ],
      "dec": 1,
      "yunit": "%",
      "series": [
        { "name": "border points changing label", "ys": [ 0, 1.4, 0.9, 1.6, 1.1, 1.3 ] },
        { "name": "core points changing label", "ys": [ 0, 0, 0, 0, 0, 0 ] },
        { "name": "noise points changing label", "ys": [ 0, 0, 0, 0, 0, 0 ] }
      ],
      "knob": { "label": "Re-run", "min": 0, "max": 5, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Run 2: 1.4% of BORDER points flipped — all of them seam-sitters within eps of two clusters' cores. First-come, first-claimed.", "tone": "info" },
        { "max": 3, "text": "Across every shuffle, the core and noise rows sit at exactly zero: core-ness and noise-ness are geometric facts, and geometry doesn't care about row order.", "tone": "info" },
        { "max": 5, "text": "🤯 Six runs, and the entire 'instability' is ~1% of points, all on cluster seams. Compare k-means, where a bad initialisation can rearrange EVERYTHING. Knowing which parts of an algorithm are deterministic tells you what to trust — and what to seed.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "DBSCAN's order dependence", "formula": "border point near 2 clusters → first expansion wins · core & noise: deterministic", "text": "A documented, bounded quirk. If exact reproducibility matters, fix the row order; if a point's flicker matters, it was a seam case your report should flag anyway." }
    }
  }
];
