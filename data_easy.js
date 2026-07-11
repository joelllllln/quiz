/* KNN — Level 1: Foundations. 30 questions; choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).easy = [
  {
    q: "In KNN, what is the 'feature space'?",
    choices: [
      "A map where each example is a point, one axis per feature",
      "The set of k neighbours consulted for a single prediction",
      "The full list of labels attached to the stored examples",
      "The gap left empty between the two class clusters here",
      "The rule KNN learns at training time to split classes"
    ],
    explain: "Feature space is the coordinate system with one axis per feature, so every example becomes a point positioned by its feature values. KNN does all of its work here: 'similar' examples sit close together and distance between points measures dissimilarity. Neighbours, votes and boundaries are all defined relative to positions in this space.",
    simple: "Picture a map where left-right is one measurement and up-down is another. Every example gets pinned to a spot based on its numbers, so look-alikes end up as neighbours on the map. KNN never leaves this map — finding nearby points is the whole game.",
    widget: {
      type: "curveStatic", title: "One axis per feature",
      world: "Each feature you record adds one axis to the space every example lives in.",
      xlab: "features (axes) added →", xs: [0,1,2,3,4], labels: ["none","1","2","3","4"], dec: 0, yunit: "",
      series: [ { name: "Detail per example", ys: [0,25,50,75,100] }, { name: "Points that look identical", ys: [100,60,30,12,4] } ],
      knob: { label: "Features (axes) added", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "With zero or one axis every example is just a dot on a line — most of them look identical.", tone: "info" }, { max: 3, text: "Each new feature adds an axis, spreading examples apart so 'similar' becomes 'close'.", tone: "info" }, { max: 4, text: "🤯 With every feature as its own axis, each example gets a unique spot — and KNN measures similarity as plain distance between those spots.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Feature space", formula: "example -> point; one axis per feature", text: "KNN plots every example as a point in this space and reasons purely about who is near whom." }
    }
  },
  {
    "q": "A new point arrives with no label. KNN finds the k labelled points closest to it. What does KNN do with those k points to choose a label?",
    "choices": [
      "Lets their labels vote",
      "Averages their coordinates",
      "Fits a line through them",
      "Compares them to each class centre",
      "Ranks them by typicality"
    ],
    "explain": "KNN has no equation and no rules — it simply looks up the k most similar known examples and takes a vote among their labels.",
    "simple": "Imagine the new point asking its closest neighbours 'what are you?' and going with whatever most of them say. That's the whole algorithm — no formulas, no training. Just look at who's nearby and copy the majority.",
    "fig": { "at": 4, "cap": "Fig. — a new arrival (◆) among labelled neighbours" },
    "widget": {
      "type": "scatterK",
      "title": "The mystery bird",
      "world": "Rangers labelled 10 birds by beak and weight. The camera caught one more — the purple ◆. Drag: how many nearby birds get a vote.",
      "classes": [
        "Puffin",
        "Gannet"
      ],
      "xlab": "beak length",
      "ylab": "body weight",
      "points": [
        { "x": 2, "y": 2.5, "c": 0 },
        { "x": 1.5, "y": 4, "c": 0 },
        { "x": 3, "y": 3.2, "c": 0 },
        { "x": 2.6, "y": 1.4, "c": 0 },
        { "x": 4, "y": 2.2, "c": 0 },
        { "x": 7, "y": 7.5, "c": 1 },
        { "x": 8.2, "y": 6.4, "c": 1 },
        { "x": 6.4, "y": 8.6, "c": 1 },
        { "x": 8.8, "y": 8, "c": 1 },
        { "x": 7.6, "y": 5.4, "c": 1 }
      ],
      "query": { "x": 4.4, "y": 4.2 },
      "knob": { "label": "How many neighbours to ask", "min": 1, "max": 10, "step": 1, "init": 1 },
      "insights": [
        { "max": 2, "text": "With so few asked, one bird decides everything. Notice which points light up — only the closest ones get a say.", "tone": "info" },
        { "max": 6, "text": "Now it's a little committee vote: count the coloured lines of each colour. Majority wins.", "tone": "info" },
        { "max": 10, "text": "🤯 You asked ALL 10 birds — even ones far across the cliff. The \"neighbourhood\" is gone; you're just counting which species is more common overall.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "k-Nearest Neighbours (KNN)", "formula": "prediction = majority label among the k closest points", "text": "What you were doing IS the algorithm: measure distance to every labelled point, keep the k closest, let them vote. The slider you dragged is the famous \"k\"." }
    }
  },
  {
    "q": "You set k = 3. The three nearest neighbours of a mystery fruit are: apple, apple, lemon. What does KNN predict?",
    "choices": [
      "Apple",
      "Lemon",
      "A tie — no prediction",
      "Half apple, half lemon",
      "Whichever fruit is commoner overall"
    ],
    "explain": "Classification KNN is a simple show of hands among the k nearest: apple 2, lemon 1 → apple.",
    "simple": "Three neighbours voted: apple, apple, lemon. Two hands beat one hand, so the answer is apple. It's literally just counting.",
    "fig": { "at": 3, "cap": "Fig. — the three nearest neighbours of the mystery fruit" },
    "widget": {
      "type": "scatterK",
      "title": "The unlabelled fruit",
      "world": "A fruit lost its sticker. Ten labelled fruits sit in the crate. Drag k — watch the vote count in the box below.",
      "classes": [
        "Apple",
        "Lemon"
      ],
      "xlab": "sweetness",
      "ylab": "size",
      "points": [
        { "x": 6.2, "y": 6.4, "c": 0 },
        { "x": 7.4, "y": 5.6, "c": 0 },
        { "x": 6.8, "y": 7.8, "c": 0 },
        { "x": 8.3, "y": 7, "c": 0 },
        { "x": 7.9, "y": 8.4, "c": 0 },
        { "x": 2.2, "y": 3, "c": 1 },
        { "x": 3.4, "y": 2.2, "c": 1 },
        { "x": 1.6, "y": 1.8, "c": 1 },
        { "x": 2.8, "y": 4.1, "c": 1 },
        { "x": 4.6, "y": 4.6, "c": 1 }
      ],
      "query": { "x": 5.4, "y": 5.4 },
      "knob": { "label": "Neighbours asked (k)", "min": 1, "max": 9, "step": 1, "init": 3 },
      "insights": [
        { "max": 1, "text": "One voter: the nearest fruit alone decides. Risky if that one fruit is odd.", "tone": "warn" },
        { "max": 5, "text": "Count the lines: the colour with more lines wins the vote. That number in the box is the whole decision.", "tone": "info" },
        { "max": 9, "text": "🤯 At k = 9 nearly the whole crate votes — including fruit nothing like yours. The vote stops being \"local\".", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Majority vote", "formula": "label = most common class among the k nearest neighbours", "text": "KNN classification = counting hands. Apple 2 vs Lemon 1 → apple. Ties and far-away voters are the failure modes you just felt." }
    }
  },
  {
    "q": "KNN measures the distance from the new point to every stored example. Which examples become its 'nearest neighbours'?",
    "choices": [
      "Those with the smallest distances",
      "Those inside an automatic radius",
      "Those closest to their class centre",
      "Those with the most average distances",
      "The most typical majority-class points"
    ],
    "explain": "\"Near\" is measured with a distance function (Euclidean by default): smaller distance = more similar = nearer.",
    "simple": "'Nearest' just means the smallest distance number — like picking the shop closest to your house. KNN measures the distance to everyone, then keeps the smallest ones.",
    "widget": {
      "type": "scatterK",
      "title": "Who is actually closest?",
      "world": "A new song, nine labelled songs. The numbers on the lines are distances — smaller = more similar. Drag k and watch who joins, in order.",
      "classes": [
        "Chill playlist",
        "Workout playlist"
      ],
      "xlab": "tempo",
      "ylab": "energy",
      "showDists": true,
      "points": [
        { "x": 2, "y": 3, "c": 0 },
        { "x": 3.2, "y": 1.8, "c": 0 },
        { "x": 1.4, "y": 4.6, "c": 0 },
        { "x": 4.2, "y": 3.4, "c": 0 },
        { "x": 7, "y": 7, "c": 1 },
        { "x": 8.4, "y": 6.2, "c": 1 },
        { "x": 6.2, "y": 8.4, "c": 1 },
        { "x": 8, "y": 8.8, "c": 1 },
        { "x": 5.6, "y": 6.4, "c": 1 }
      ],
      "query": { "x": 4.8, "y": 5 },
      "knob": { "label": "Neighbours asked (k)", "min": 1, "max": 9, "step": 1, "init": 1 },
      "insights": [
        { "max": 1, "text": "Read the number on the line: that's a distance. The ONE song with the smallest distance is \"nearest\".", "tone": "info" },
        { "max": 5, "text": "As k grows, songs join strictly in order of that number — 2nd smallest, 3rd smallest… never randomly.", "tone": "info" },
        { "max": 9, "text": "🤯 By the end you've recruited songs with huge distances — barely similar at all. \"Neighbour\" only means something when the distance is small.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Distance = similarity", "formula": "nearest = argmin distance(new point, labelled point)", "text": "KNN ranks every labelled example by its distance number and takes the k smallest. Everything else in KNN builds on this ranking." }
    }
  },
  {
    "q": "You set k = 1. KNN finds the one training point closest to the new arrival. What happens next?",
    "choices": [
      "Its label is copied — done",
      "Two runners-up double-check it",
      "It abstains if the point is far",
      "A tie is declared",
      "Its label is flipped if it's an outlier"
    ],
    "explain": "k = 1 means one voter: whatever the single nearest neighbour is, that's your answer — fast, simple, and fragile.",
    "simple": "With k = 1 you're asking exactly one neighbour and copying their answer, full stop. Whatever the single closest point is labelled, that's the prediction.",
    "fig": { "at": 1, "cap": "Fig. — k = 1: the single closest point" },
    "widget": {
      "type": "scatterK",
      "title": "One-voter elections",
      "world": "Movies you'd like vs dislike. Start at k = 1 and feel how much power ONE point holds — then outvote it.",
      "classes": [
        "Liked",
        "Disliked"
      ],
      "xlab": "action",
      "ylab": "romance",
      "points": [
        { "x": 3, "y": 7, "c": 0 },
        { "x": 2, "y": 5.6, "c": 0 },
        { "x": 4.4, "y": 8, "c": 0 },
        { "x": 1.6, "y": 7.8, "c": 0 },
        { "x": 3.8, "y": 5, "c": 0 },
        { "x": 7.2, "y": 2.6, "c": 1 },
        { "x": 8.4, "y": 3.8, "c": 1 },
        { "x": 6.6, "y": 1.6, "c": 1 },
        { "x": 9, "y": 2, "c": 1 },
        { "x": 5.8, "y": 3.4, "c": 1 }
      ],
      "query": { "x": 5, "y": 4.4 },
      "knob": { "label": "Neighbours asked (k)", "min": 1, "max": 9, "step": 2, "init": 1 },
      "insights": [
        { "max": 1, "text": "One line, one voter, decision made. The other 9 films might as well not exist.", "tone": "warn" },
        { "max": 5, "text": "More voters — the decision can flip when the committee outvotes that first film. Did yours flip?", "tone": "info" },
        { "max": 9, "text": "🤯 Same movie, opposite verdicts at k = 1 vs k = 9. The prediction was never \"in the data\" — it depends on how many you ask.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "1-Nearest Neighbour (1-NN)", "formula": "k = 1  →  prediction = label of the closest point", "text": "1-NN just photocopies the nearest example's label. You felt both its charm (simple, sharp) and its danger (one point rules everything)." }
    }
  },
  {
    "q": "Most models do heavy work during training. What does KNN do with the training examples at training time?",
    "choices": [
      "Just stores them",
      "Caches all pairwise distances",
      "Learns one weight per feature",
      "Clusters them for fast lookup",
      "Keeps one prototype per class"
    ],
    "explain": "KNN is a \"lazy\" learner: training = memorise the data. All the real work (distance computing, voting) happens at prediction time.",
    "simple": "KNN doesn't study — it just saves all the examples, like stuffing every past paper into a drawer. All the actual thinking happens later, when a question arrives.",
    "widget": {
      "type": "speedLazy",
      "title": "The laziest student in class",
      "world": "Two students: one studies, one photocopies every past paper to riffle through in the exam. KNN photocopies. Drag the pile size.",
      "itemName": "past papers",
      "storeLabel": "What \"training\" produced",
      "knobMax": 50000,
      "knob": { "label": "Training examples stored", "min": 100, "max": 50000, "step": 100, "init": 500 },
      "insights": [
        { "max": 2000, "text": "Training time: still ~instant, no matter what. It's literally just saving the files.", "tone": "info" },
        { "max": 20000, "text": "But look at the second bar: answering ONE question means checking your question against every stored paper.", "tone": "warn" },
        { "max": 50000, "text": "🤯 50,000 stored: training is STILL instant, but every single answer now needs 50,000 distance checks. The work never went away — it was postponed to exam time.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Lazy (instance-based) learning", "formula": "train: store data  ·  predict: do all the work", "text": "KNN never builds a model — it defers all computation to prediction time. That's why it's called lazy or instance-based learning." }
    }
  },
  {
    "q": "KNN gets slower at predicting as the training set grows. Why? What must every single prediction do?",
    "choices": [
      "Measure distance to every stored point",
      "Re-sort the whole dataset",
      "Re-fit its parameters",
      "Grow k to match the data",
      "Recompute the class centres"
    ],
    "explain": "To find the k nearest, plain KNN computes the distance from the query to all n stored points — so prediction cost grows with n.",
    "simple": "To find the closest points it has to check the distance to EVERY stored point, one by one, every time you ask. More stored points = more checking = slower answers.",
    "widget": {
      "type": "speedLazy",
      "title": "Find my photo twin",
      "world": "A photo app compares your snap to every stored photo, one by one. Grow the library — watch which bar suffers.",
      "itemName": "photos",
      "storeLabel": "Photo library",
      "knobMax": 40000,
      "knob": { "label": "Photos in the library", "min": 200, "max": 40000, "step": 200, "init": 1000 },
      "insights": [
        { "max": 5000, "text": "Small library: comparing against every photo is cheap enough. Nobody notices.", "tone": "info" },
        { "max": 25000, "text": "The compare-bar grows in a straight line with the library — double the photos, double the wait, every single time.", "tone": "warn" },
        { "max": 40000, "text": "🤯 Adding photos costs nothing at \"training\" time but taxes EVERY future prediction forever. The bill arrives when you can least afford it: while the user waits.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "O(n) prediction cost", "formula": "one prediction ≈ n distance computations", "text": "Plain KNN prediction scales linearly with the number of stored examples n. (Clever indexes like k-d trees exist to cut this — that's a later level.)" }
    }
  },
  {
    "q": "Two points sit on a map. What is the Euclidean distance between them?",
    "choices": [
      "The straight-line length",
      "The sum of the axis gaps",
      "The largest single axis gap",
      "The count of grid steps",
      "The average axis gap"
    ],
    "explain": "Euclidean distance is ruler distance: the straight-line length, √(Δx² + Δy²) in 2-D.",
    "simple": "Euclidean distance is ruler distance: lay a ruler between the two points and read the straight-line length. That's the whole idea.",
    "widget": {
      "type": "metricMorph",
      "title": "Drone vs delivery bike",
      "world": "One pizza, two couriers: a drone flies straight, a bike follows streets. Slide the measuring rule between their two worlds.",
      "a": { "x": 1, "y": 2 },
      "aName": "Kitchen",
      "b": { "x": 8, "y": 7 },
      "bName": "Customer",
      "unit": "blocks",
      "knob": { "label": "How distance is measured", "min": 1, "max": 2, "step": 0.05, "init": 1 },
      "insights": [
        { "max": 1.05, "text": "Streets only: distance = blocks across + blocks up. The orange L-shaped path.", "tone": "info" },
        { "max": 1.9, "text": "Sliding the rule bends reality: same two points, yet the \"distance\" number keeps changing. Distance is a CHOICE, not a fact.", "tone": "warn" },
        { "max": 2, "text": "🤯 Fully at \"straight line\": this is the shortest possible — the drone's route. No measuring rule can beat the straight line.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Euclidean distance", "formula": "d = √( (x₁−x₂)² + (y₁−y₂)² )", "text": "The straight-line (\"as the crow flies\") measure you ended on is Euclidean distance — KNN's default. The street-grid one you started on has a name too: Manhattan distance." }
    }
  },
  {
    "q": "Two points sit on a street grid. How is the Manhattan distance between them computed?",
    "choices": [
      "Adding the absolute axis gaps",
      "Square-rooting the squared gaps",
      "Taking the straight-line length",
      "Taking the largest gap only",
      "Multiplying the gaps together"
    ],
    "explain": "Manhattan (city-block) distance adds up |Δx| + |Δy| — the path a taxi must drive on a street grid, no diagonals allowed.",
    "simple": "Manhattan distance is taxi distance: you can't drive through buildings, so you add the blocks across plus the blocks up. Add the gap in each direction — done.",
    "widget": {
      "type": "metricMorph",
      "title": "The warehouse robot",
      "world": "A warehouse robot can only drive along aisles, never through shelves. Slide the rule — which measurement matches its real life?",
      "a": { "x": 2, "y": 1 },
      "aName": "Robot",
      "b": { "x": 7, "y": 8 },
      "bName": "Shelf",
      "unit": "aisle units",
      "knob": { "label": "How distance is measured", "min": 1, "max": 2, "step": 0.05, "init": 2 },
      "insights": [
        { "max": 1.05, "text": "🤯 At \"streets only\" the distance is simply across-difference + up-difference: 5 + 7 = 12. No square roots — just adding the two gaps.", "tone": "wow" },
        { "max": 1.9, "text": "In between the two rules the number slides smoothly — you're watching one distance formula morph into another.", "tone": "info" },
        { "max": 2, "text": "The straight line is shorter, but the robot can't drive through shelves. The RIGHT distance depends on how your world actually works.", "tone": "warn" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Manhattan (city-block) distance", "formula": "d = |x₁−x₂| + |y₁−y₂|", "text": "Add the gaps along each axis — done. Named after Manhattan's street grid. KNN lets you pick whichever distance matches your world." }
    }
  },
  {
    "q": "With two classes, people usually choose an odd k, like 3, 5 or 7. What does an odd k guarantee?",
    "choices": [
      "The vote can never tie",
      "Higher accuracy on average",
      "A symmetric neighbourhood",
      "At least one vote per class",
      "Faster distance sums"
    ],
    "explain": "With two classes and even k, the vote can tie (2–2, 3–3…) and the answer becomes arbitrary. Odd k makes a tie impossible.",
    "simple": "With 3 voters you can get 2–1 but never a draw. With 4 voters you can get 2–2 — and then nobody wins. Odd numbers guarantee a winner.",
    "fig": { "at": 4, "cap": "Fig. — an even jury: k = 4" },
    "widget": {
      "type": "scatterK",
      "title": "The hung jury",
      "world": "Cat or dog? Slide k through odd AND even jury sizes — watch the verdict box for trouble.",
      "classes": [
        "Cat",
        "Dog"
      ],
      "xlab": "ear pointiness",
      "ylab": "snout length",
      "points": [
        { "x": 2.4, "y": 3, "c": 0 },
        { "x": 3.6, "y": 2, "c": 0 },
        { "x": 2, "y": 4.8, "c": 0 },
        { "x": 4.4, "y": 4, "c": 0 },
        { "x": 3, "y": 6, "c": 0 },
        { "x": 7, "y": 6.6, "c": 1 },
        { "x": 8, "y": 5.2, "c": 1 },
        { "x": 6.4, "y": 8, "c": 1 },
        { "x": 8.8, "y": 7.4, "c": 1 },
        { "x": 6, "y": 5, "c": 1 }
      ],
      "query": { "x": 5.1, "y": 4.9 },
      "knob": { "label": "Jury size (k)", "min": 1, "max": 8, "step": 1, "init": 1 },
      "insights": [
        { "max": 1, "text": "k = 1: a jury of one. Verdict guaranteed, wisdom not.", "tone": "info" },
        { "max": 3, "text": "Try k = 2 and k = 3. Notice: one of them can end in a 1–1 stalemate, the other cannot.", "tone": "info" },
        { "max": 8, "text": "🤯 Every even jury size risks a dead heat — 2–2, 3–3, 4–4 — and then WHAT is the answer? Odd sizes never have this problem.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Odd k (tie avoidance)", "formula": "two classes + odd k → a tie is impossible", "text": "A two-class vote with an odd number of voters always has a majority. That's the whole reason k = 3, 5, 7 are the classic choices." }
    }
  },
  {
    "q": "You set k to the size of the whole training set, so every point votes every time. What does KNN now predict for ANY new point?",
    "choices": [
      "The overall majority class",
      "The nearest point's class",
      "The densest cluster's class",
      "A random class each time",
      "The centre-most point's class"
    ],
    "explain": "With k = n, every training point votes every time, so position stops mattering — the overall majority class wins everywhere.",
    "simple": "If everyone votes, position stops mattering — the biggest group wins every time, everywhere. It's like deciding what one person likes by polling the entire country.",
    "fig": { "at": 3, "cap": "Fig. — the new email, deep in the spam cluster" },
    "widget": {
      "type": "scatterK",
      "title": "When everyone votes, nobody's local",
      "world": "A new email sits dead-centre in the spam cluster. Surely it's spam… now raise k to the maximum.",
      "classes": [
        "Normal",
        "Spam"
      ],
      "xlab": "exclamation marks!!!",
      "ylab": "links per line",
      "points": [
        { "x": 1.6, "y": 2, "c": 0 },
        { "x": 2.8, "y": 1.4, "c": 0 },
        { "x": 2, "y": 3.6, "c": 0 },
        { "x": 3.6, "y": 2.8, "c": 0 },
        { "x": 1.2, "y": 5, "c": 0 },
        { "x": 4.2, "y": 1, "c": 0 },
        { "x": 3, "y": 4.6, "c": 0 },
        { "x": 7.6, "y": 7, "c": 1 },
        { "x": 8.6, "y": 8.2, "c": 1 },
        { "x": 6.8, "y": 8.8, "c": 1 },
        { "x": 8, "y": 6, "c": 1 },
        { "x": 9.2, "y": 7.6, "c": 1 }
      ],
      "query": { "x": 8, "y": 7.6 },
      "knob": { "label": "Neighbours asked (k)", "min": 1, "max": 12, "step": 1, "init": 3 },
      "insights": [
        { "max": 5, "text": "The email sits deep in spam territory and the local vote says so, loudly.", "tone": "info" },
        { "max": 9, "text": "Distant normal emails are now voting on an email nothing like them… the margin is shrinking.", "tone": "warn" },
        { "max": 12, "text": "🤯 k = 12: the verdict flipped to Normal — purely because normal emails outnumber spam 7–5 overall. Location has become irrelevant; only the global headcount matters.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "k = n → majority-class predictor", "formula": "k = n  →  every prediction = most common class", "text": "At maximum k, KNN collapses into \"always guess the biggest class\". All the useful information — WHERE the point is — has been averaged away." }
    }
  },
  {
    "q": "One training point has the wrong label. A new point lands right next to it. Which k is most likely to copy the mistake?",
    "choices": [
      "k = 1",
      "k = 3",
      "k = 5",
      "k = 7",
      "All k equally"
    ],
    "explain": "With k = 1 the mislabeled point IS the whole vote. A larger k lets its correct neighbours outvote it.",
    "simple": "At k = 1, one bad label IS the entire decision — there's nobody to overrule it. Ask a few more neighbours and the honest ones outvote the mistake.",
    "fig": { "at": 1, "cap": "Fig. — a mislabeled point (⚠) right beside the query" },
    "widget": {
      "type": "scatterK",
      "title": "One bad label",
      "world": "One mushroom was labelled 'edible' by mistake (⚠) — and your unknown one sits right beside it. Choose how many neighbours to trust.",
      "classes": [
        "Edible",
        "Poisonous"
      ],
      "xlab": "cap width",
      "ylab": "stem height",
      "flag": 4,
      "points": [
        { "x": 2, "y": 2.6, "c": 0 },
        { "x": 3.2, "y": 1.6, "c": 0 },
        { "x": 1.4, "y": 4, "c": 0 },
        { "x": 2.8, "y": 3.8, "c": 0 },
        { "x": 7.2, "y": 6.8, "c": 0 },
        { "x": 7.8, "y": 7.8, "c": 1 },
        { "x": 6.4, "y": 6, "c": 1 },
        { "x": 8.6, "y": 6.6, "c": 1 },
        { "x": 7, "y": 8.6, "c": 1 },
        { "x": 8.2, "y": 5.4, "c": 1 }
      ],
      "query": { "x": 7.3, "y": 7.2 },
      "knob": { "label": "Neighbours trusted (k)", "min": 1, "max": 7, "step": 2, "init": 1 },
      "insights": [
        { "max": 1, "text": "☠️ k = 1: your only advisor is the mislabeled mushroom. Verdict: \"edible\". Enjoy the hospital.", "tone": "warn" },
        { "max": 3, "text": "k = 3: the bad label is now outvoted 2–1 by honest neighbours. The verdict flips to poisonous — correctly.", "tone": "info" },
        { "max": 7, "text": "🤯 One wrong label lost all its power the moment it needed friends to win a vote. Bigger juries forgive bad data.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Noise sensitivity of small k", "formula": "small k → each neighbour has huge power → noise hurts", "text": "k = 1 memorises every mistake in your data. Raising k averages mistakes away — the first taste of the bias–variance trade-off you'll meet at Level 2." }
    }
  },
  {
    "q": "A dataset has age (18–70) and salary (£20,000–£90,000). You use the raw numbers. What happens when KNN computes distances?",
    "choices": [
      "Salary drowns out age",
      "Age drowns out salary",
      "The two roughly cancel out",
      "The ranking turns random",
      "Nothing — the vote rebalances it"
    ],
    "explain": "Distance adds raw differences: a £10,000 salary gap contributes ~10,000 while a 30-year age gap contributes 30. Salary drowns age unless you rescale.",
    "simple": "Distance just adds up number gaps. A salary gap is in the thousands; an age gap is maybe 30. So salary shouts and age whispers — until you shrink them onto the same scale.",
    "widget": {
      "type": "scaleFeature",
      "title": "The shouting feature",
      "world": "Find Priya's most-similar customer. Salary is in raw pounds — huge numbers. Shrink its units and watch who counts as 'nearest'.",
      "aName": "age",
      "bName": "salary",
      "target": { "name": "Priya", "a": 30, "b": 42000 },
      "cands": [
        { "name": "Sam · 31, £58k", "a": 31, "b": 58000 },
        { "name": "Leah · 29, £44k", "a": 29, "b": 44000 },
        { "name": "Marco · 58, £43k", "a": 58, "b": 43000 },
        { "name": "Ada · 33, £41k", "a": 33, "b": 41000 }
      ],
      "knob": { "label": "Shrink salary units by", "min": 0, "max": 4, "step": 0.25, "init": 0 },
      "insights": [
        { "max": 0.5, "text": "Raw pounds: the salary bars (orange) are so long the age bars (blue) are invisible. Marco — 28 years OLDER — ranks as very similar because his salary is close. Age has no voice.", "tone": "warn" },
        { "max": 2.5, "text": "As you shrink salary's units, the blue age differences finally become visible in the bars. Watch the NEAREST tag move.", "tone": "info" },
        { "max": 4, "text": "🤯 Now the OPPOSITE problem: salary is squashed to nothing and only age matters. Fair comparison lives in the middle — both features need similar-sized units.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Feature scaling (normalisation)", "formula": "x′ = (x − min) / (max − min)   ·   or   x′ = (x − μ) / σ", "text": "Before KNN, rescale every feature to a comparable range so each one gets a fair voice in the distance. Whichever feature has the biggest raw numbers otherwise wins by default." }
    }
  },
  {
    "q": "You change one column from metres to kilometres (divide by 1,000). Nothing else changes. What can this alone do to unscaled KNN?",
    "choices": [
      "Change who counts as nearest",
      "Nothing — the ranking is preserved",
      "Only shrink the distance values",
      "At most break exact ties differently",
      "Slow the maths, nothing else"
    ],
    "explain": "Raw distances depend on units. Shrinking one feature ×1000 shrinks its influence ×1000, which can reshuffle who counts as \"nearest\".",
    "simple": "Change metres to kilometres and those numbers shrink 1000×, while other features stay put — so a different person can suddenly be 'closest'. Same world, different ruler, different answer.",
    "widget": {
      "type": "scaleFeature",
      "title": "The unit prank",
      "world": "Same people, same lives — only the commute units change (metres → km). Watch the 'nearest' tag anyway.",
      "aName": "gym hours",
      "bName": "commute",
      "target": { "name": "Jo", "a": 6, "b": 2400 },
      "cands": [
        { "name": "Kit · 5h, 2.5km", "a": 5, "b": 2500 },
        { "name": "Bo · 13h, 2.4km", "a": 13, "b": 2450 },
        { "name": "Ana · 6h, 7km", "a": 6.5, "b": 7000 },
        { "name": "Raj · 7h, 3.1km", "a": 7, "b": 3100 }
      ],
      "knob": { "label": "Shrink commute units by", "min": 0, "max": 4, "step": 0.25, "init": 0 },
      "insights": [
        { "max": 0.5, "text": "In metres, commute differences are in the THOUSANDS and gym hours differ by single digits. Bo — who trains 13 hours to Jo's 6 — is \"nearest\" just because his commute matches.", "tone": "warn" },
        { "max": 2.75, "text": "Same people, same lives — you're only relabelling metres → kilometres. Yet the nearest neighbour changes. The data didn't move; the ruler did.", "tone": "info" },
        { "max": 4, "text": "🤯 A cosmetic unit change silently changed the prediction. Any algorithm that flips its answer when you rename m → km NEEDS scaling to be trusted.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Unit sensitivity", "formula": "raw distance changes when units change → scale first", "text": "KNN's distances live in the units you happened to record. Standardising features (mean 0, spread 1) makes the answer unit-proof." }
    }
  },
  {
    "q": "KNN regression predicts a number, like a price. It finds the k nearest neighbours. How does it turn their values into one prediction?",
    "choices": [
      "Averages them",
      "Votes on them",
      "Fits a trend line through them",
      "Copies the nearest, adjusted",
      "Takes the most common value"
    ],
    "explain": "For numeric targets there's nothing to \"vote\" on — KNN outputs the mean (sometimes median) of the k nearest values.",
    "simple": "When predicting a number, the neighbours can't 'vote' — so you average them. Three similar flats sold for about £150k, £160k, £170k? Guess around £160k.",
    "fig": { "at": 3, "cap": "Fig. — recent sales by size; three comparables highlighted" },
    "widget": {
      "type": "knnRegress",
      "title": "Price my flat",
      "world": "Price a 52 m² flat from 12 nearby sales. Drag k: how many comparable sales get averaged.",
      "xlab": "flat size",
      "ylab": "sale price (£k)",
      "itemName": "sales",
      "prefix": "£",
      "unit": "k",
      "decimals": 0,
      "points": [
        { "x": 1, "y": 118 },
        { "x": 1.8, "y": 132 },
        { "x": 2.6, "y": 151 },
        { "x": 3.4, "y": 160 },
        { "x": 4.2, "y": 178 },
        { "x": 5, "y": 196 },
        { "x": 5.8, "y": 214 },
        { "x": 6.6, "y": 222 },
        { "x": 7.4, "y": 248 },
        { "x": 8.2, "y": 255 },
        { "x": 9, "y": 276 },
        { "x": 9.8, "y": 295 }
      ],
      "qx": 5.2,
      "knob": { "label": "Comparable sales averaged (k)", "min": 1, "max": 12, "step": 1, "init": 3 },
      "insights": [
        { "max": 1, "text": "One comparable: your \"valuation\" is literally one neighbour's price, quirks included.", "tone": "warn" },
        { "max": 6, "text": "Averaging a handful of similar-sized sales gives a steadier price. Note: it's an AVERAGE, not a vote — the output is a number.", "tone": "info" },
        { "max": 12, "text": "🤯 Averaging ALL sales — including studios and penthouses — your \"valuation\" became the citywide average price, useless for YOUR flat. The prediction line went totally flat.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "KNN regression", "formula": "ŷ = mean( values of k nearest neighbours )", "text": "Same neighbour-finding, different combiner: vote for classes, average for numbers. Estate agents call it \"comparables\" — you've used KNN regression all along." }
    }
  },
  {
    "q": "In KNN regression, you set k to the size of the whole dataset. What does every prediction become?",
    "choices": [
      "The global average",
      "Perfectly accurate",
      "The global median",
      "Zero",
      "The nearest value again"
    ],
    "explain": "Averaging over everyone gives the same number everywhere: the global mean. The prediction curve flattens into a horizontal line.",
    "simple": "Averaging EVERYONE gives one number: the overall average — the same answer for every question. That's why the prediction line goes completely flat.",
    "widget": {
      "type": "knnRegress",
      "title": "The flatline machine",
      "world": "Delivery time vs distance. Watch the purple prediction LINE, not just the number — its shape is the whole story.",
      "xlab": "delivery distance",
      "ylab": "minutes",
      "itemName": "deliveries",
      "unit": "min",
      "decimals": 0,
      "points": [
        { "x": 0.8, "y": 12 },
        { "x": 1.6, "y": 15 },
        { "x": 2.4, "y": 14 },
        { "x": 3.2, "y": 19 },
        { "x": 4, "y": 23 },
        { "x": 4.8, "y": 26 },
        { "x": 5.6, "y": 24 },
        { "x": 6.4, "y": 31 },
        { "x": 7.2, "y": 34 },
        { "x": 8, "y": 33 },
        { "x": 8.8, "y": 39 },
        { "x": 9.6, "y": 42 }
      ],
      "qx": 2,
      "knob": { "label": "Deliveries averaged (k)", "min": 1, "max": 12, "step": 1, "init": 1 },
      "insights": [
        { "max": 2, "text": "Tiny k: the line hugs every individual delivery, jagged and twitchy.", "tone": "info" },
        { "max": 8, "text": "The line is smoothing out — nearby deliveries blur together. Useful smoothing… up to a point.", "tone": "info" },
        { "max": 12, "text": "🤯 k = 12: the line is perfectly FLAT. A 1-block delivery and a 10-block delivery get the same estimate: the overall average. The model has stopped listening to distance entirely.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "k → n collapses to the global mean", "formula": "k = n  →  ŷ = mean(all values), everywhere", "text": "Maximum smoothing = no pattern left. Between \"copy one noisy neighbour\" (k=1) and \"same answer for everyone\" (k=n) lies the sweet spot — finding it is what tuning k means." }
    }
  },
  {
    "q": "What must the stored training examples have before KNN can classify anything at all?",
    "choices": [
      "Human-provided labels",
      "Balanced classes",
      "At least 1,000 rows",
      "Pre-scaled features",
      "An unlabelled practice pool"
    ],
    "explain": "KNN is supervised: the vote only works because each neighbour brings a known label with it. Unlabelled neighbours would have nothing to vote with.",
    "simple": "KNN's only knowledge is the labels humans attached earlier. No labels = the neighbours have nothing to say — like asking directions from people who don't know the area either.",
    "widget": {
      "type": "scatterK",
      "title": "The botanist's gift",
      "world": "Every vote below exists because a botanist spent a week hand-labelling these orchids. Drag k and count the borrowed knowledge.",
      "classes": [
        "Orchid A",
        "Orchid B"
      ],
      "xlab": "petal length",
      "ylab": "colour depth",
      "points": [
        { "x": 1.8, "y": 3, "c": 0 },
        { "x": 3, "y": 2, "c": 0 },
        { "x": 2.4, "y": 4.4, "c": 0 },
        { "x": 4, "y": 3.6, "c": 0 },
        { "x": 3.4, "y": 5.2, "c": 0 },
        { "x": 6.8, "y": 7, "c": 1 },
        { "x": 8, "y": 6, "c": 1 },
        { "x": 7.2, "y": 8.4, "c": 1 },
        { "x": 8.8, "y": 7.6, "c": 1 },
        { "x": 6.2, "y": 5.8, "c": 1 }
      ],
      "query": { "x": 5.2, "y": 5.2 },
      "knob": { "label": "Labelled orchids consulted (k)", "min": 1, "max": 10, "step": 1, "init": 3 },
      "insights": [
        { "max": 4, "text": "Each line you add pulls in one more LABELLED example. Imagine the dots were grey with no labels — the vote box below would be empty.", "tone": "info" },
        { "max": 8, "text": "The algorithm contributes distance-measuring and counting. All the KNOWLEDGE is in the human-made labels.", "tone": "info" },
        { "max": 10, "text": "🤯 Even asking all 10, you're never doing more than recycling the botanist's week of work. No labels → no KNN. That's what \"supervised learning\" means.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Supervised learning", "formula": "training data = (features, LABEL) pairs", "text": "KNN learns from examples that come with answers attached. Algorithms that find structure in unlabelled data exist too — that's unsupervised learning (like clustering), a different game." }
    }
  },
  {
    "q": "You shrink k down towards 1. What does the boundary between the classes become?",
    "choices": [
      "More jagged and wiggly",
      "Smoother and straighter",
      "A perfect circle",
      "Fixed — k doesn't affect it",
      "Biased toward the smaller class"
    ],
    "explain": "Small k lets single points carve out their own little territories, so the border between classes wiggles around individuals. Larger k smooths it out.",
    "simple": "Small k lets every single point grab its own patch of the map, so the border wiggles around individuals. Bigger k smooths those wiggles away.",
    "widget": {
      "type": "boundaryK",
      "title": "The border dispute",
      "world": "The shading is the prediction map for two ice-cream vans. Drag k — watch the shape of the border itself.",
      "classes": [
        "Van Blue",
        "Van Orange"
      ],
      "xlab": "east–west",
      "ylab": "north–south",
      "points": [
        { "x": 1.5, "y": 2, "c": 0 },
        { "x": 2.5, "y": 3.5, "c": 0 },
        { "x": 1, "y": 5, "c": 0 },
        { "x": 3, "y": 6, "c": 0 },
        { "x": 2, "y": 7.5, "c": 0 },
        { "x": 4, "y": 1.5, "c": 0 },
        { "x": 6.5, "y": 8, "c": 0 },
        { "x": 7, "y": 2.5, "c": 1 },
        { "x": 8.5, "y": 3.5, "c": 1 },
        { "x": 6.5, "y": 4.5, "c": 1 },
        { "x": 8, "y": 6, "c": 1 },
        { "x": 9, "y": 7.5, "c": 1 },
        { "x": 5.5, "y": 5.5, "c": 1 },
        { "x": 4.5, "y": 8.5, "c": 1 }
      ],
      "knob": { "label": "Neighbours per prediction (k)", "min": 1, "max": 13, "step": 2, "init": 13 },
      "insights": [
        { "max": 3, "text": "🤯 At tiny k the map shatters: lone dots carve out private islands of territory, and the wiggliness number jumps. One customer = one kingdom.", "tone": "wow" },
        { "max": 7, "text": "Middle k: the border follows the real shape of the two crowds without obsessing over individuals.", "tone": "info" },
        { "max": 13, "text": "Huge k: one giant smooth split. Simple — maybe too simple to respect the pockets where orange customers really live.", "tone": "warn" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Decision boundary vs k", "formula": "small k → jagged, local border · large k → smooth, global border", "text": "The invisible line where the prediction flips is the decision boundary. k is a smoothness dial for that line — you just watched it morph." }
    }
  },
  {
    "q": "You test 1-NN on the same data it trained on. It scores 100%. Why does that score mean nothing?",
    "choices": [
      "Each point's nearest neighbour is itself",
      "The data must be noise-free",
      "Smooth models always ace training",
      "It only proves the classes separate",
      "The metric happens to fit perfectly"
    ],
    "explain": "Asked about a training point, 1-NN finds that exact point at distance 0 and copies its own label — a perfect score by cheating, saying nothing about new data.",
    "simple": "Ask 'who's closest to this point?' when the point is already IN the data — the answer is itself, at distance zero. Of course it gets its own label right. It's an open-book exam.",
    "widget": {
      "type": "trainTestK",
      "title": "The open-book exam",
      "world": "A student sits an exam re-using the flashcards they memorised. Compare the two bars — especially at k = 1.",
      "classes": [
        "Ships",
        "Icebergs"
      ],
      "xlab": "radar blob size",
      "ylab": "brightness",
      "train": [
        { "x": 2, "y": 3, "c": 0 },
        { "x": 3, "y": 1.8, "c": 0 },
        { "x": 1.4, "y": 4.6, "c": 0 },
        { "x": 3.8, "y": 3.4, "c": 0 },
        { "x": 2.6, "y": 6, "c": 0 },
        { "x": 7, "y": 6.6, "c": 1 },
        { "x": 8.2, "y": 5.4, "c": 1 },
        { "x": 6.4, "y": 8, "c": 1 },
        { "x": 8.8, "y": 7.4, "c": 1 },
        { "x": 5.6, "y": 5, "c": 1 }
      ],
      "test": [
        { "x": 2.4, "y": 2.2, "c": 0 },
        { "x": 4.6, "y": 4.2, "c": 0 },
        { "x": 3.2, "y": 5.2, "c": 0 },
        { "x": 7.6, "y": 7.8, "c": 1 },
        { "x": 5.2, "y": 6.6, "c": 1 },
        { "x": 6.8, "y": 4.4, "c": 1 }
      ],
      "knob": { "label": "Neighbours asked (k)", "min": 1, "max": 9, "step": 2, "init": 1 },
      "insights": [
        { "max": 1, "text": "🤯 k = 1: the top bar is 100% — every flashcard's closest neighbour is ITSELF, sitting at distance zero. The bottom bar tells the honest story.", "tone": "wow" },
        { "max": 5, "text": "With more voters, self-recognition can be outvoted, and the two bars drift toward each other — the exam scores start being comparable.", "tone": "info" },
        { "max": 9, "text": "The gap between the bars is the \"memorising vs understanding\" gap. Only the NEW-cases bar predicts real-world performance.", "tone": "warn" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Training accuracy is not performance", "formula": "1-NN on training data: nearest neighbour = the point itself → 100%", "text": "Scoring a memoriser on questions it memorised proves nothing. This is why data scientists never trust training accuracy — the next question shows what they use instead." }
    }
  },
  {
    "q": "You want to know how well your KNN model will do on future, unseen data. What is the standard way to check?",
    "choices": [
      "Score it on held-out data",
      "Score training data, minus 10%",
      "Average its confidence scores",
      "Beat the baseline on training data",
      "Score training data with larger k"
    ],
    "explain": "A held-out test set simulates the future: labelled examples the model has never seen. Its score there is an honest preview of real-world performance.",
    "simple": "Hide some labelled examples in a drawer, build the model without them, then test on them. The model never saw them, so its score there is an honest preview of the real world.",
    "widget": {
      "type": "trainTestK",
      "title": "The dress rehearsal",
      "world": "The clinic kept 6 labelled scans hidden from the model — a dress rehearsal for reality. Tune k using the honest bar.",
      "classes": [
        "Routine",
        "Urgent"
      ],
      "xlab": "shadow size",
      "ylab": "edge sharpness",
      "train": [
        { "x": 1.8, "y": 2.4, "c": 0 },
        { "x": 3, "y": 3.6, "c": 0 },
        { "x": 2.2, "y": 5, "c": 0 },
        { "x": 4.2, "y": 2, "c": 0 },
        { "x": 3.6, "y": 6.2, "c": 0 },
        { "x": 7.4, "y": 7, "c": 1 },
        { "x": 8.6, "y": 5.8, "c": 1 },
        { "x": 6.6, "y": 8.2, "c": 1 },
        { "x": 9, "y": 7.8, "c": 1 },
        { "x": 6, "y": 6, "c": 1 }
      ],
      "test": [
        { "x": 2.8, "y": 3, "c": 0 },
        { "x": 4.8, "y": 5, "c": 0 },
        { "x": 1.6, "y": 6, "c": 0 },
        { "x": 7.8, "y": 8.4, "c": 1 },
        { "x": 5.4, "y": 7, "c": 1 },
        { "x": 8.2, "y": 4.6, "c": 1 }
      ],
      "knob": { "label": "Neighbours asked (k)", "min": 1, "max": 9, "step": 2, "init": 1 },
      "insights": [
        { "max": 1, "text": "Top bar says perfection. If the team believed it, they'd ship a model that's never faced a new scan.", "tone": "warn" },
        { "max": 5, "text": "The bottom bar — scans the model never saw — is the only number that predicts how it behaves on next week's patients.", "tone": "info" },
        { "max": 9, "text": "🤯 Notice you've been choosing k by looking at the NEW-cases bar. That's exactly how practitioners tune k: pick the one that wins the dress rehearsal, not the open-book exam.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Train/test split", "formula": "fit on the training set · judge on the held-out test set", "text": "Splitting your labelled data (e.g. 80/20) buys you an honest preview of the future. Every serious evaluation you'll ever run starts with this move." }
    }
  },
  {
    "q": "Classification predicts a category. Regression predicts a number. The neighbours are found the same way — so what differs in the last step?",
    "choices": [
      "Vote for classes, average for numbers",
      "Different distance metrics",
      "Odd k versus even k",
      "More neighbours for regression",
      "Average for classes, vote for numbers"
    ],
    "explain": "Same neighbour-finding, different combiner: categories get voted on, numbers get averaged.",
    "simple": "If the answer is a WORD (spam / not spam), the neighbours vote. If the answer is a NUMBER (price, minutes), the neighbours get averaged. Same neighbours, different final step.",
    "widget": {
      "type": "knnRegress",
      "title": "Guess my rating",
      "world": "Predict a RATING for a new song. Notice the output: a number with decimals — nothing like 'spam vs not spam'.",
      "xlab": "tempo",
      "ylab": "your rating (stars)",
      "itemName": "songs",
      "unit": "★",
      "decimals": 1,
      "points": [
        { "x": 0.6, "y": 8.6 },
        { "x": 1.4, "y": 8.1 },
        { "x": 2.2, "y": 7.2 },
        { "x": 3, "y": 7.6 },
        { "x": 3.8, "y": 6 },
        { "x": 4.6, "y": 5.2 },
        { "x": 5.4, "y": 5.6 },
        { "x": 6.2, "y": 4 },
        { "x": 7, "y": 3.2 },
        { "x": 7.8, "y": 3.6 },
        { "x": 8.6, "y": 2.2 },
        { "x": 9.4, "y": 1.6 }
      ],
      "qx": 4.1,
      "knob": { "label": "Similar songs averaged (k)", "min": 1, "max": 12, "step": 1, "init": 3 },
      "insights": [
        { "max": 3, "text": "The prediction is 6.3★, 5.9★… decimals! You can't \"vote\" your way to 6.3 — averaging is the only combiner that makes sense for numbers.", "tone": "info" },
        { "max": 8, "text": "If these dots were labelled \"like/dislike\" instead, the same neighbours would VOTE and the output would be a category. Neighbour-finding identical; only the last step differs.", "tone": "info" },
        { "max": 12, "text": "🤯 Cranked to all 12 songs, the average slides to your overall mean rating — the regression version of \"always predict the majority class\".", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Vote vs average", "formula": "classification: mode(labels) · regression: mean(values)", "text": "One algorithm, two final steps. Ask \"is the target a category or a quantity?\" and you know which combiner — and which kind of problem — you have." }
    }
  },
  {
    "q": "You give KNN raw text categories like 'rock', 'jazz' and 'pop'. Why can't it work?",
    "choices": [
      "You can't do arithmetic on words",
      "The strings differ in length",
      "Text must be sorted alphabetically",
      "Only Manhattan handles text",
      "Hashing wasn't enabled"
    ],
    "explain": "KNN's core operation is arithmetic on feature values (subtract, square, add). \"rock − jazz\" means nothing until you represent each item as numbers.",
    "simple": "You can't subtract 'jazz' from 'rock'. Distance is arithmetic, and arithmetic needs numbers — so first describe each item with numbers, and then distances exist.",
    "widget": {
      "type": "metricMorph",
      "title": "Turning songs into places",
      "world": "How far is 'rock' from 'jazz'? Meaningless — until each song becomes numbers. Then distance exists. Slide the rule.",
      "a": { "x": 2, "y": 6 },
      "aName": "Song A (slow, loud)",
      "b": { "x": 8, "y": 3 },
      "bName": "Song B (fast, soft)",
      "unit": "units apart",
      "knob": { "label": "How distance is measured", "min": 1, "max": 2, "step": 0.05, "init": 2 },
      "insights": [
        { "max": 1.05, "text": "City-block rule: add the tempo gap and the loudness gap. Every part of this is arithmetic on NUMBERS the songs were converted into.", "tone": "info" },
        { "max": 1.9, "text": "Try to imagine this slider working on the words \"rock\" and \"jazz\". Subtract WHAT from what? No numbers, no distance, no KNN.", "tone": "warn" },
        { "max": 2, "text": "🤯 The entire trick of KNN happened before the algorithm ran: describing each item with numbers so that \"similar\" becomes \"close on a map\".", "tone": "wow" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Feature vectors (numeric encoding)", "formula": "item → (x₁, x₂, …, xₙ) → distances become computable", "text": "Turning things into lists of numbers is called feature engineering; categories get encoded (e.g. one-hot). KNN — like most ML — lives entirely in that numeric space." }
    }
  },
  {
    "q": "In distance-weighted KNN, the neighbours' votes are no longer equal. Whose votes count the most?",
    "choices": [
      "The closest neighbours",
      "The most common class",
      "The most recent points",
      "The farthest neighbours",
      "The most typical points"
    ],
    "explain": "Weighted KNN scales each vote by closeness (often 1/distance): a next-door neighbour speaks louder than one at the edge of the neighbourhood.",
    "simple": "Instead of every neighbour getting one equal vote, closer neighbours get louder voices. A next-door twin counts for more than a vague acquaintance.",
    "widget": {
      "type": "voteWeight",
      "title": "Whisper or megaphone",
      "world": "Five neighbours: two near-twins, three vague matches. Turn up how much closeness amplifies a voice.",
      "classes": [
        "Condition A",
        "Condition B"
      ],
      "neighbors": [
        { "name": "twin case", "d": 0.5, "c": 0 },
        { "name": "close case", "d": 0.8, "c": 0 },
        { "name": "vague case 1", "d": 3, "c": 1 },
        { "name": "vague case 2", "d": 3.4, "c": 1 },
        { "name": "vague case 3", "d": 3.8, "c": 1 }
      ],
      "knob": { "label": "How much closeness amplifies a vote", "min": 0, "max": 4, "step": 0.1, "init": 0 },
      "insights": [
        { "max": 0.05, "text": "Equal say: the three vague cases win 3–2, purely on headcount. But two of the voters barely resemble the patient…", "tone": "warn" },
        { "max": 1.5, "text": "The close matches' circles are swelling — their votes now count for more than one hand each.", "tone": "info" },
        { "max": 4, "text": "🤯 The verdict FLIPPED: two near-twins outvoted three strangers. Weighting by distance rebalanced the committee toward the most relevant evidence.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Distance-weighted KNN", "formula": "weight = 1 / distance (or 1/d²) · verdict = biggest weighted total", "text": "Instead of one-point-one-vote, each neighbour's vote is scaled by closeness. It softens the choice of k and respects that not all neighbours are equally relevant." }
    }
  },
  {
    "q": "You set k = 4 and the vote splits 2–2. Which tie-break uses information you already have?",
    "choices": [
      "Weight the votes by closeness",
      "Take the overall majority class",
      "Take the first class in the file",
      "Report both classes",
      "Flip a fair coin"
    ],
    "explain": "A tie in headcount usually isn't a tie in evidence: weighting by distance lets the closer neighbours settle it meaningfully rather than arbitrarily.",
    "simple": "2–2 is a tie in HANDS, but not in evidence: the closer pair look more like your point. Let closeness carry weight and the tie breaks itself — sensibly, not randomly.",
    "widget": {
      "type": "voteWeight",
      "title": "Courtroom deadlock",
      "world": "The vote is 2–2: deadlock. But look at the distances — the two '4's are much closer. Let closeness testify.",
      "classes": [
        "It's a 4",
        "It's a 9"
      ],
      "neighbors": [
        { "name": "neat 4", "d": 0.7, "c": 0 },
        { "name": "scruffy 4", "d": 1, "c": 0 },
        { "name": "curly 9", "d": 2.6, "c": 1 },
        { "name": "faint 9", "d": 3.2, "c": 1 }
      ],
      "knob": { "label": "How much closeness amplifies a vote", "min": 0, "max": 4, "step": 0.1, "init": 0 },
      "insights": [
        { "max": 0.05, "text": "2–2. With equal votes the algorithm would have to guess — flip a coin in a courtroom.", "tone": "warn" },
        { "max": 1, "text": "The moment closeness matters even slightly, the deadlock breaks — and not randomly: it breaks toward the stronger evidence.", "tone": "info" },
        { "max": 4, "text": "🤯 The two nearby \"4\"s dominate completely. Same four voters, but the tie resolved itself the instant votes carried evidence-weight instead of headcount.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Tie-breaking via distance weights", "formula": "tie in counts → compare summed 1/d weights", "text": "Odd k avoids ties; weights dissolve them. Most libraries offer both (e.g. weights=\"distance\") — now you know what that setting is actually doing." }
    }
  },
  {
    "q": "Your training set has exactly 6 examples. What is the biggest k that makes sense?",
    "choices": [
      "6",
      "5",
      "7",
      "3",
      "12"
    ],
    "explain": "Neighbours are real stored examples: with 6 points, \"the 7 nearest\" doesn't exist. k ranges from 1 to n.",
    "simple": "Neighbours are real stored examples. If you only have 6, 'the 7 nearest' doesn't exist — like inviting 7 friends when you only know 6 people.",
    "fig": { "at": 2, "cap": "Fig. — the entire training set: six examples" },
    "widget": {
      "type": "scatterK",
      "title": "A very small village",
      "world": "A tiny startup has labelled only 6 tickets. Drag k to its ceiling — then imagine dragging further. Where would voter #7 come from?",
      "classes": [
        "FAQ fixes it",
        "Needs a human"
      ],
      "xlab": "message length",
      "ylab": "anger level",
      "points": [
        { "x": 2, "y": 2, "c": 0 },
        { "x": 3.4, "y": 1.4, "c": 0 },
        { "x": 1.6, "y": 3.8, "c": 0 },
        { "x": 7, "y": 7.4, "c": 1 },
        { "x": 8.4, "y": 6.2, "c": 1 },
        { "x": 6.4, "y": 8.6, "c": 1 }
      ],
      "query": { "x": 5, "y": 5 },
      "knob": { "label": "Neighbours asked (k)", "min": 1, "max": 6, "step": 1, "init": 2 },
      "insights": [
        { "max": 3, "text": "Six villagers total. Each notch of k recruits one more of them into the vote.", "tone": "info" },
        { "max": 5, "text": "Nearly everyone is voting already. There's no reserve of extra neighbours hiding somewhere.", "tone": "info" },
        { "max": 6, "text": "🤯 The slider ENDS at 6. Not a design choice — a law: neighbours are stored examples, and you own exactly six. k lives between 1 and n.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "k ≤ n", "formula": "1 ≤ k ≤ number of training examples", "text": "k counts real, stored data points. Small datasets therefore cap k hard — one of many reasons tiny training sets limit what KNN can do." }
    }
  },
  {
    "q": "A trained linear model keeps a small formula and can delete its data. What must KNN keep to stay a working model?",
    "choices": [
      "The entire training set",
      "One average point per class",
      "A distance table plus k",
      "Its learned boundary",
      "Each point's precomputed neighbours"
    ],
    "explain": "KNN never distils the data into parameters. Its \"model\" is the memorised dataset itself, consulted from scratch at every prediction.",
    "simple": "A linear model boils the data down to a little formula and can bin the data afterwards. KNN has no formula — the saved examples ARE the model. Delete them and nothing is left.",
    "widget": {
      "type": "speedLazy",
      "title": "Two rival forecasters",
      "world": "One forecaster keeps a one-line formula; the other keeps every past day on file. You're growing the second one's archive.",
      "itemName": "past days",
      "storeLabel": "The archive KNN must keep",
      "knobMax": 30000,
      "knob": { "label": "Days of weather history stored", "min": 100, "max": 30000, "step": 100, "init": 1000 },
      "insights": [
        { "max": 5000, "text": "The formula-forecaster's storage: one line, forever. Our archive-forecaster's storage: this ever-growing pile — deleting it would delete the model.", "tone": "info" },
        { "max": 20000, "text": "More archive = potentially smarter matches, but the pile IS the model. There's no equation to extract, no summary to ship.", "tone": "info" },
        { "max": 30000, "text": "🤯 30,000 days stored and still not one line of \"learned formula\" exists. The memory requirement and the look-up work grow with the data, forever.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Non-parametric model", "formula": "model size grows with data (vs fixed parameters)", "text": "Models like linear regression compress data into a fixed set of parameters. KNN is non-parametric: its complexity and storage scale with the dataset itself." }
    }
  },
  {
    "q": "An app uses daily steps (0–20,000) and sleep hours (0–12) in KNN. What should you do before computing any distances?",
    "choices": [
      "Rescale both to a shared range",
      "Log-transform sleep",
      "Drop the weaker feature",
      "Do nothing — it self-corrects",
      "Multiply steps by k"
    ],
    "explain": "Normalising (min-max to 0–1) or standardising (z-scores) puts steps and sleep on equal footing so both genuinely influence who counts as similar.",
    "simple": "Squash both features onto the same 0-to-1 scale, so a 'big' step difference and a 'big' sleep difference count about the same. Now both features get a fair say.",
    "widget": {
      "type": "scaleFeature",
      "title": "Steps shout, sleep whispers",
      "world": "Steps are counted in thousands; sleep in single hours. Shrink the step units — watch 'most similar' change.",
      "aName": "sleep",
      "bName": "steps",
      "target": { "name": "Dev", "a": 8, "b": 8000 },
      "cands": [
        { "name": "Mia · 8.2h, 12k steps", "a": 8.2, "b": 12000 },
        { "name": "Tom · 3h, 8.3k steps", "a": 3, "b": 8300 },
        { "name": "Zoe · 7.5h, 9k steps", "a": 7.5, "b": 9000 },
        { "name": "Ben · 8h, 15k steps", "a": 8.1, "b": 15000 }
      ],
      "knob": { "label": "Shrink step units by", "min": 0, "max": 4, "step": 0.25, "init": 0 },
      "insights": [
        { "max": 0.5, "text": "Raw units: Tom sleeps 3 HOURS to Dev's 8 — a totally different lifestyle — yet ranks most similar because his step count is close. Sleep's voice is 0.006% of the conversation.", "tone": "warn" },
        { "max": 2.75, "text": "Shrinking the step numbers lets sleep's blue bars finally register. Somewhere along here the ranking flips to someone who actually lives like Dev.", "tone": "info" },
        { "max": 4, "text": "🤯 Too far! Steps are now silenced and ONLY sleep matters. The goal isn't to mute the big feature — it's equal microphones: that's what normalising to 0–1 does.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Min-max normalisation", "formula": "x′ = (x − min) / (max − min)  →  every feature lives in [0, 1]", "text": "Rescaling both features to [0,1] gives each an equal microphone. Standardisation (z-scores) is the other classic option. For KNN, one of them is almost always step one." }
    }
  },
  {
    "q": "The data has a small, real pocket of one class inside the other class's area. What does a very large k do to that pocket?",
    "choices": [
      "Votes it out of existence",
      "Preserves it — smoothing keeps structure",
      "Shrinks it but keeps it",
      "Expands it",
      "Moves it toward the map's edge"
    ],
    "explain": "A large k asks so many (mostly outside) neighbours that the pocket's few residents are always outvoted: real structure gets blurred away. That's underfitting.",
    "simple": "A giant k means a giant crowd votes on every spot — and a small real cluster always gets outvoted by the crowd around it. The map paints straight over it.",
    "widget": {
      "type": "boundaryK",
      "title": "The village in the forest",
      "world": "A real village sits inside a forest — houses, not noise. Crank k and watch what the map does to the village.",
      "classes": [
        "Village",
        "Forest"
      ],
      "xlab": "east–west",
      "ylab": "north–south",
      "points": [
        { "x": 4.6, "y": 4.6, "c": 0 },
        { "x": 5.4, "y": 5.2, "c": 0 },
        { "x": 5, "y": 4, "c": 0 },
        { "x": 4.2, "y": 5.4, "c": 0 },
        { "x": 1, "y": 1.4, "c": 1 },
        { "x": 2.2, "y": 8.6, "c": 1 },
        { "x": 8.8, "y": 1.8, "c": 1 },
        { "x": 9, "y": 8.8, "c": 1 },
        { "x": 1.4, "y": 5, "c": 1 },
        { "x": 5, "y": 9, "c": 1 },
        { "x": 8.6, "y": 5, "c": 1 },
        { "x": 5, "y": 0.8, "c": 1 },
        { "x": 2.6, "y": 2.8, "c": 1 },
        { "x": 7.4, "y": 7.6, "c": 1 },
        { "x": 7, "y": 2.6, "c": 1 }
      ],
      "knob": { "label": "Neighbours per prediction (k)", "min": 1, "max": 15, "step": 2, "init": 1 },
      "insights": [
        { "max": 3, "text": "Small k: the village shows up clearly on the prediction map — the model can represent it.", "tone": "info" },
        { "max": 9, "text": "The blue patch is shrinking… villagers keep getting outvoted by the forest all around them.", "tone": "warn" },
        { "max": 15, "text": "🤯 The village is GONE from the map — yet its houses are still right there in the data. Huge k didn't just smooth noise; it erased true structure. That's underfitting.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Underfitting (too-large k)", "formula": "k too big → real local patterns get outvoted → oversmoothing", "text": "k tunes smoothing: too small memorises noise (overfitting), too large erases genuine detail (underfitting). Choosing k is choosing how much detail you believe." }
    }
  },
  {
    "q": "Every algorithm relies on one big assumption about the world. What is KNN's?",
    "choices": [
      "Similar things share labels",
      "Features are equally important",
      "Data is mostly signal",
      "Labels are mostly correct",
      "Classes are balanced"
    ],
    "explain": "\"Birds of a feather flock together\": KNN assumes closeness in feature space implies sameness of label. When that's false, KNN fails.",
    "simple": "KNN's one big bet: things that look similar usually ARE similar — birds of a feather. When that's true of your data, it works; when it isn't, no k can save it.",
    "widget": {
      "type": "scatterK",
      "title": "Birds of a feather",
      "world": "You know nothing about the purple house except where it sits. Drag k and feel how confident the vote is here.",
      "classes": [
        "Gas heated",
        "Heat pump"
      ],
      "xlab": "garden size",
      "ylab": "building age",
      "points": [
        { "x": 1.6, "y": 7.4, "c": 0 },
        { "x": 2.8, "y": 8.2, "c": 0 },
        { "x": 2.2, "y": 6.2, "c": 0 },
        { "x": 3.6, "y": 7, "c": 0 },
        { "x": 1.2, "y": 8.8, "c": 0 },
        { "x": 7, "y": 2.6, "c": 1 },
        { "x": 8.2, "y": 3.4, "c": 1 },
        { "x": 6.6, "y": 1.6, "c": 1 },
        { "x": 8.8, "y": 2, "c": 1 },
        { "x": 7.6, "y": 4.2, "c": 1 }
      ],
      "query": { "x": 2.6, "y": 7.6 },
      "knob": { "label": "Neighbours asked (k)", "min": 1, "max": 10, "step": 1, "init": 1 },
      "insights": [
        { "max": 5, "text": "Every neighbour you add agrees. The purple house sits in a tight cluster where \"nearby\" really does mean \"alike\" — KNN's home turf.", "tone": "info" },
        { "max": 8, "text": "Still unanimous. When the world is clustered like this, even the choice of k barely matters.", "tone": "info" },
        { "max": 10, "text": "🤯 Only at k = 10 do the far-away heat-pump houses even get a voice — and they're outvoted. Now imagine labels sprinkled at random: no k would help. KNN works exactly as well as \"near = alike\" is true.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "The smoothness (locality) assumption", "formula": "close in features ⇒ (probably) same label", "text": "Every ML method bets on some assumption. KNN's bet is locality. Feature engineering is largely the art of building a space where that bet pays off." }
    }
  },
  {
    "q": "KNN makes a prediction in three steps. Which order is correct?",
    "choices": [
      "Measure all → keep k nearest → combine",
      "Keep k nearest → measure → combine",
      "Vote → keep winners → measure",
      "Sample k at random → measure → vote",
      "Measure all → drop outliers → average"
    ],
    "explain": "Rank ALL stored points by distance first — only then can you know which k are nearest. The vote (or average) is always the final step.",
    "simple": "The recipe: measure the distance to everyone → keep the k smallest → let those labels vote (or average, for numbers). Three steps, always in that order.",
    "widget": {
      "type": "scatterK",
      "title": "Watch the recipe run",
      "world": "Tea or coffee? Watch the recipe run: distances measured first (for everyone), then recruitment strictly in order, then the vote.",
      "classes": [
        "Tea",
        "Coffee"
      ],
      "xlab": "arrival time",
      "ylab": "pastries per week",
      "showDists": true,
      "points": [
        { "x": 2.2, "y": 2.4, "c": 0 },
        { "x": 3.4, "y": 1.6, "c": 0 },
        { "x": 1.8, "y": 4, "c": 0 },
        { "x": 4, "y": 3.2, "c": 0 },
        { "x": 6.8, "y": 7, "c": 1 },
        { "x": 8, "y": 6, "c": 1 },
        { "x": 6.2, "y": 8.4, "c": 1 },
        { "x": 8.6, "y": 7.8, "c": 1 },
        { "x": 5.4, "y": 6.2, "c": 1 }
      ],
      "query": { "x": 4.8, "y": 4.8 },
      "knob": { "label": "Step 2: keep the k closest", "min": 1, "max": 9, "step": 1, "init": 1 },
      "insights": [
        { "max": 3, "text": "Step 1 already happened before you touched anything: a distance to EVERY regular. Your slider is step 2 — keeping the smallest ones, always in ascending order.", "tone": "info" },
        { "max": 6, "text": "Notice recruitment order never skips: 3rd closest joins before 4th closest, guaranteed. The final verdict box is step 3: combine the kept labels.", "tone": "info" },
        { "max": 9, "text": "🤯 Measure all → keep k smallest → combine. You just ran the entire algorithm by hand, three steps, no magic anywhere.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "The KNN prediction recipe", "formula": "1) distances to all n points · 2) sort, take k nearest · 3) vote / average", "text": "That's the whole algorithm — which is why KNN is often the first classifier anyone learns, and why all its costs live at prediction time." }
    }
  },
  {
    "q": "Four of these tasks predict a number. Which one is a classification task?",
    "choices": [
      "Approving or rejecting a loan",
      "Predicting tomorrow's temperature",
      "Estimating a house's sale price",
      "Predicting delivery minutes",
      "Estimating an exam percentage"
    ],
    "explain": "Approve/reject is a choice between categories → classification (vote). All the others predict a quantity → regression (average).",
    "simple": "'Approve or reject?' has two possible answers — you're picking a CATEGORY, so it's classification. Temperature, price, minutes are NUMBERS — those are regression.",
    "widget": {
      "type": "scatterK",
      "title": "Approve or reject?",
      "world": "The output here is a fork in the road — approve or reject — never a number. Feel how a vote answers a yes/no question.",
      "classes": [
        "Approved",
        "Rejected"
      ],
      "xlab": "income",
      "ylab": "existing debt",
      "points": [
        { "x": 6.8, "y": 2.4, "c": 0 },
        { "x": 8, "y": 3.2, "c": 0 },
        { "x": 7.4, "y": 1.4, "c": 0 },
        { "x": 8.8, "y": 2, "c": 0 },
        { "x": 6.2, "y": 3.8, "c": 0 },
        { "x": 2.4, "y": 7, "c": 1 },
        { "x": 3.6, "y": 8, "c": 1 },
        { "x": 1.6, "y": 6.2, "c": 1 },
        { "x": 2.8, "y": 8.8, "c": 1 },
        { "x": 4.2, "y": 6.6, "c": 1 }
      ],
      "query": { "x": 5.2, "y": 5 },
      "knob": { "label": "Past applications consulted (k)", "min": 1, "max": 10, "step": 1, "init": 3 },
      "insights": [
        { "max": 4, "text": "The output is always one of exactly two words — approve or reject. No decimals, no in-between. That's the signature of classification.", "tone": "info" },
        { "max": 8, "text": "Compare: predicting the loan AMOUNT would need an average of numbers. Predicting the loan DECISION needs a vote between categories. Same neighbours, different question.", "tone": "info" },
        { "max": 10, "text": "🤯 Even with every applicant voting, the answer stays a category. The task decides the output type — \"which kind?\" → classify, \"how much?\" → regress.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Classification vs regression (task framing)", "formula": "\"which category?\" → vote · \"how much?\" → average", "text": "Before choosing any algorithm setting, name your target: category or quantity. Every downstream choice — including KNN's final combining step — follows from that." }
    }
  }
];
