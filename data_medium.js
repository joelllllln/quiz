/* KNN — Level 2: Practitioner. 30 questions; choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).medium = [
  {
    "q": "You move k from large to small: the model reacts more to individual points, less to the crowd. In bias–variance terms, you traded…",
    "choices": [
      "Stability for twitchiness",
      "Twitchiness for stability",
      "Bias for speed",
      "Accuracy for memory",
      "Locality for smoothness"
    ],
    "explain": "Small k = flexible, twitchy, sensitive to single points (high variance). Large k = rigid and stable but potentially too crude (high bias). k is the dial between them.",
    "simple": "Small k = the decision hangs on one or two points, so predictions jump around (twitchy = high variance). Big k = steady but crude (stubborn = high bias). k is the dial between the two.",
    "widget": {
      "type": "boundaryK",
      "title": "The twitchy map",
      "world": "Two depots' delivery territories, learned from 14 orders. Sweep k end to end — watch how NERVOUS vs how STUBBORN the map is.",
      "classes": [
        "Depot A",
        "Depot B"
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
      "knob": { "label": "Neighbours per prediction (k)", "min": 1, "max": 13, "step": 2, "init": 7 },
      "insights": [
        { "max": 3, "text": "Tiny k: every single order bends the border. Add one noisy order and whole streets would switch depot — that instability is what \"high variance\" means.", "tone": "warn" },
        { "max": 9, "text": "Middle k: the map follows the crowd shapes but ignores individuals. This is the trade-off zone.", "tone": "info" },
        { "max": 13, "text": "🤯 Max k: the map barely has a shape at all — stable, yes, but too crude to be right in the tricky spots. Stability bought with bluntness is \"high bias\".", "tone": "wow" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "The bias–variance trade-off", "formula": "small k → low bias, HIGH variance · large k → high bias, LOW variance", "text": "Every ML model has this dial somewhere. In KNN it's k itself: you just watched variance (twitchiness) turn into bias (bluntness) as you dragged." }
    }
  },
  {
    "q": "k is a hyperparameter — the training data can't learn it for you, and training accuracy would just say 'k = 1 forever'. The defensible way to choose it is by…",
    "choices": [
      "Best score on held-out data",
      "Best score on training data",
      "Always √n, no testing needed",
      "k = 1 until accuracy drops",
      "The largest affordable odd k"
    ],
    "explain": "k is a hyperparameter: sweep it, score each candidate on data the model didn't train on, and keep the winner. Training accuracy would always point to k=1.",
    "simple": "Try k = 1, 2, 3… and score each one on examples the model never saw. Keep whichever k scores best there. Training-data scores are useless for this — they'd say k = 1 forever.",
    "widget": {
      "type": "kCurve",
      "title": "Shopping for k",
      "world": "A leaf classifier, 16 samples (2 mislabeled). Blue curve: score on seen leaves. Purple: on 10 held-back ones. Where would YOU set k?",
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
      "knob": { "label": "Candidate k", "min": 1, "max": 16, "step": 1, "init": 1 },
      "insights": [
        { "max": 1, "text": "k = 1: the blue curve says 100% — perfection! The purple curve says 80%. One of these two numbers is lying to you.", "tone": "warn" },
        { "max": 11, "text": "In the middle the purple (held-back) curve sits at its peak while blue relaxes. THIS gap-free plateau is what a good k looks like.", "tone": "info" },
        { "max": 16, "text": "🤯 At k = 16 both curves fall off a cliff — the vote went global. You've now seen why we shop for k with the purple curve: it's the only one that behaves like the future.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Hyperparameter tuning (validation curve)", "formula": "k* = argmax over k of validation-set score", "text": "k isn't learned from training data — it's chosen by you, using held-out data as the judge. Settings chosen this way are called hyperparameters." }
    }
  },
  {
    "q": "Standardising a feature (turning it into z-scores) replaces each value x with which formula?",
    "choices": [
      "(x − mean) ÷ standard deviation",
      "(x − min) ÷ (max − min)",
      "x ÷ mean",
      "(x − mean)²",
      "rank(x) ÷ n"
    ],
    "explain": "z = (x − μ) / σ recentres each feature at 0 and rescales its spread to 1, so all features contribute comparably to distances.",
    "simple": "A z-score asks 'how many typical steps from average is this value?' Subtract the mean, divide by the usual spread. Afterwards every feature speaks the same language: 'typical steps'.",
    "widget": {
      "type": "scaleFeature",
      "title": "Same ruler for everyone",
      "world": "Find Kai's most-similar athlete. Jump length is in centimetres — huge numbers. Shrink its units toward a fair fight.",
      "aName": "sprint time",
      "bName": "jump length",
      "target": { "name": "Kai", "a": 12.1, "b": 610 },
      "cands": [
        { "name": "Ana · 12.3s, 640cm", "a": 12.3, "b": 640 },
        { "name": "Joe · 14.8s, 615cm", "a": 14.8, "b": 615 },
        { "name": "Liv · 12.2s, 585cm", "a": 12.2, "b": 585 },
        { "name": "Sol · 13.5s, 700cm", "a": 13.5, "b": 700 }
      ],
      "knob": { "label": "Shrink jump units by", "min": 0, "max": 4, "step": 0.25, "init": 0 },
      "insights": [
        { "max": 0.5, "text": "Raw units: Joe — nearly 3 SECONDS slower, a different league of athlete — ranks similar because his jump is close in raw centimetres. Sprint time is whispering.", "tone": "warn" },
        { "max": 2.5, "text": "There's a band in the middle where a 0.5s sprint gap and a 30cm jump gap feel about equally important — that's what \"both features have spread 1\" buys you.", "tone": "info" },
        { "max": 4, "text": "🤯 Overshot: now jump is muted and sprint is the only voice. Standardising isn't about shrinking big features — it's about giving every feature the SAME spread: z = (x − mean) / std.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Standardisation (z-scores)", "formula": "z = (x − μ) / σ  →  every feature: mean 0, spread 1", "text": "Dividing by the standard deviation is the principled version of what your knob was doing by hand. After it, \"1 unit\" means \"1 typical variation\" in every feature." }
    }
  },
  {
    "q": "Commute distance accidentally appears in the data TWICE — once in km, once in minutes, almost perfectly correlated. Inside KNN's distance, commute now…",
    "choices": [
      "Counts double",
      "Counts half",
      "Cancels itself out",
      "Gets deduplicated automatically",
      "Adds noise but no bias"
    ],
    "explain": "Distance just sums feature differences. Two near-copies of the same signal = that signal gets two votes. KNN has no notion of \"redundant columns\".",
    "simple": "If commute appears twice, its gap gets added into the distance twice — one opinion counted double. KNN can't tell it's the same information wearing two hats.",
    "widget": {
      "type": "scaleFeature",
      "title": "The feature that voted twice",
      "world": "Commute snuck into the data TWICE (km and minutes), so here it votes with double strength. Dial the double-counting back down.",
      "aName": "age",
      "bName": "commute (×2 copies)",
      "target": { "name": "Noor", "a": 29, "b": 60 },
      "cands": [
        { "name": "Pia · 30y, commute 64", "a": 30, "b": 64 },
        { "name": "Gus · 52y, commute 58", "a": 52, "b": 58 },
        { "name": "Rae · 27y, commute 78", "a": 27, "b": 78 },
        { "name": "Vik · 31y, commute 90", "a": 31, "b": 90 }
      ],
      "knob": { "label": "Shrink commute's double weight by", "min": 0, "max": 4, "step": 0.25, "init": 0 },
      "insights": [
        { "max": 0.5, "text": "With commute counting double, Gus (23 years older!) looks like Noor's twin because his commute matches. The duplicated column is drowning out age.", "tone": "warn" },
        { "max": 2.5, "text": "As you dial the duplication down, age gets its voice back and the ranking reshuffles.", "tone": "info" },
        { "max": 4, "text": "🤯 One redundant column silently rigged every similarity in the dataset. That's why practitioners drop or merge correlated features before KNN.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Redundant features double-count", "formula": "distance sums per-feature gaps → copies of a signal multiply its weight", "text": "KNN weighs whatever you feed it, duplicates included. Feature auditing — dropping near-copies or combining them — is part of preparing data for any distance-based method." }
    }
  },
  {
    "q": "The data is 90% 'normal' and 10% 'fraud'. As k grows large, what happens to fraud predictions — even for points deep inside the fraud cluster?",
    "choices": [
      "They fade away",
      "They increase",
      "They stay local and unchanged",
      "They only get more confident",
      "Precision and recall swap"
    ],
    "explain": "A big neighbourhood around ANY point contains mostly majority-class examples, so minority votes get swamped. Imbalance + large k = the minority class disappears.",
    "simple": "A big neighbourhood around ANY point fills up with the common class, because there's simply more of it. So the rare class loses big votes even on its home turf.",
    "widget": {
      "type": "scatterK",
      "title": "The outnumbered minority",
      "world": "9 normal transactions, 4 fraud — and a new one dead-centre in the fraud cluster. Grow the neighbourhood and watch the verdict.",
      "classes": [
        "Normal",
        "Fraud"
      ],
      "xlab": "amount",
      "ylab": "hour of day",
      "points": [
        { "x": 1.6, "y": 2, "c": 0 },
        { "x": 2.8, "y": 1.4, "c": 0 },
        { "x": 2, "y": 3.6, "c": 0 },
        { "x": 3.6, "y": 2.8, "c": 0 },
        { "x": 1.2, "y": 5, "c": 0 },
        { "x": 4.2, "y": 1.2, "c": 0 },
        { "x": 3, "y": 4.6, "c": 0 },
        { "x": 4.6, "y": 3.6, "c": 0 },
        { "x": 2.4, "y": 6, "c": 0 },
        { "x": 7.6, "y": 7, "c": 1 },
        { "x": 8.6, "y": 8.2, "c": 1 },
        { "x": 6.8, "y": 8.8, "c": 1 },
        { "x": 8, "y": 6.4, "c": 1 }
      ],
      "query": { "x": 7.8, "y": 7.8 },
      "knob": { "label": "Neighbourhood size (k)", "min": 1, "max": 13, "step": 1, "init": 3 },
      "insights": [
        { "max": 4, "text": "Local vote: fraud, unanimously. The transaction is surrounded by fraud cases.", "tone": "info" },
        { "max": 8, "text": "The neighbourhood now reaches into normal territory. Fraud's lead is shrinking — count the lines.", "tone": "warn" },
        { "max": 13, "text": "🤯 The verdict flipped to NORMAL for a transaction sitting dead-centre in the fraud cluster. The minority didn't get outargued — it got outnumbered. This is why imbalance + large k is dangerous.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Class imbalance swamps large-k votes", "formula": "P(majority in neighbourhood) grows with k when classes are imbalanced", "text": "With rare classes, keep k modest, weight votes by distance, or rebalance the data — otherwise the rare class you care most about is exactly the one that vanishes." }
    }
  },
  {
    "q": "You want the safety of a big k without letting far-away voters drown a tight, correct local cluster. Which variant does exactly that?",
    "choices": [
      "Distance-weighted voting",
      "A larger training set",
      "Manhattan distance",
      "Standardised features",
      "An even k"
    ],
    "explain": "With weights like 1/d, the far-away voters you accidentally included carry almost no weight, so growing k stops being destructive.",
    "simple": "With weights like 1-over-distance, far neighbours barely count for anything. So accidentally including a bunch of far voters (a too-big k) can no longer flip the answer.",
    "widget": {
      "type": "voteWeight",
      "title": "Democracy with earplugs",
      "world": "3 near-identical cases say Condition A; 4 distant ones say B. Plain voting loses 3–4. Turn up how much closeness matters.",
      "classes": [
        "Condition A",
        "Condition B"
      ],
      "neighbors": [
        { "name": "near twin", "d": 0.4, "c": 0 },
        { "name": "very close", "d": 0.6, "c": 0 },
        { "name": "close", "d": 0.9, "c": 0 },
        { "name": "far case 1", "d": 3.2, "c": 1 },
        { "name": "far case 2", "d": 3.6, "c": 1 },
        { "name": "far case 3", "d": 4, "c": 1 },
        { "name": "far case 4", "d": 4.4, "c": 1 }
      ],
      "knob": { "label": "How much closeness amplifies a vote", "min": 0, "max": 4, "step": 0.1, "init": 0 },
      "insights": [
        { "max": 0.05, "text": "One-person-one-vote: the four distant cases win on headcount, 4–3, despite barely resembling the patient.", "tone": "warn" },
        { "max": 1.5, "text": "The far circles are shrinking toward dots. Their votes still exist — they just weigh less and less.", "tone": "info" },
        { "max": 4, "text": "🤯 The three near-twins dominate and the verdict is theirs. Distant voters became harmless — which means a too-big k becomes harmless too. That's the point of weighting.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Distance-weighted KNN (dilution defence)", "formula": "weight = 1/d or 1/d² → far neighbours ≈ 0 influence", "text": "Weighted voting makes KNN far less sensitive to the exact k: including extra faraway neighbours barely changes the totals. In sklearn: weights=\"distance\"." }
    }
  },
  {
    "q": "Two points differ hugely on ONE feature and barely on the rest. Compared with Manhattan, how does Euclidean treat that one big gap?",
    "choices": [
      "Amplifies it — gaps are squared",
      "Dampens it — the root compresses",
      "Identically to Manhattan",
      "Ignores it entirely",
      "Averages it across features"
    ],
    "explain": "Squaring amplifies large differences: a gap of 8 contributes 64 to Euclidean's sum while a gap of 1 contributes just 1. L2 is dominated by its largest coordinate gap.",
    "simple": "Euclidean squares each gap first: a gap of 8 becomes 64 while a gap of 1 stays 1. Squaring makes big gaps enormous, so one huge gap ends up running the whole show.",
    "widget": {
      "type": "metricMorph",
      "title": "One enormous gap",
      "world": "Two houses: tiny age gap, huge size gap. Slide the ruler — watch how much of the total that one big gap gets awarded.",
      "a": { "x": 1, "y": 4.6 },
      "aName": "House A",
      "b": { "x": 9, "y": 5.6 },
      "bName": "House B",
      "unit": "units",
      "knob": { "label": "How distance is measured", "min": 1, "max": 2, "step": 0.05, "init": 1 },
      "insights": [
        { "max": 1.05, "text": "City-block: total = 8 + 1 = 9. The big gap contributes its plain size — 8 parts out of 9.", "tone": "info" },
        { "max": 1.9, "text": "Sliding toward straight-line, the total sinks toward the big gap's length alone: √(8² + 1²) ≈ 8.06. The small gap has nearly stopped mattering.", "tone": "info" },
        { "max": 2, "text": "🤯 Under Euclidean the small gap adds almost nothing: squaring made the big gap worth 64 against the small gap's 1. One outlier feature can own the entire distance.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "L1 vs L2 sensitivity", "formula": "L2 squares gaps → big gaps dominate · L1 adds gaps → more even-handed", "text": "Rule of thumb: expect outliers or spiky features? Manhattan (L1) is more forgiving. Smooth, well-scaled features? Euclidean (L2) is the default." }
    }
  },
  {
    "q": "Keep adding dimensions and the distances between random points concentrate around one value. 'The nearest neighbour' becomes…",
    "choices": [
      "Barely nearer than the farthest",
      "Sharper and more reliable",
      "Always the same point",
      "Undefined below k points",
      "Negative in some dimensions"
    ],
    "explain": "In high dimensions, distances concentrate: everyone is roughly the same distance from everyone. KNN's core signal — \"this one is clearly closest\" — dissolves.",
    "simple": "Add enough dimensions and everyone becomes roughly the same distance from everyone — like a huge dark warehouse where every shelf feels 'kind of far'. 'Nearest' stops meaning anything.",
    "widget": {
      "type": "dimCurse",
      "title": "Everyone is a stranger",
      "world": "Ten dating profiles. The knob adds facts to compare on. Watch the gap between nearest and farthest — that gap is the algorithm's food.",
      "itemName": "profile",
      "n": 10,
      "seed": 7,
      "knob": { "label": "Facts compared per profile", "min": 1, "max": 64, "step": 1, "init": 2 },
      "insights": [
        { "max": 4, "text": "Few facts: the bars differ a lot — the nearest profile is clearly closer than the farthest. Plenty of signal to pick neighbours with.", "tone": "info" },
        { "max": 24, "text": "The bars are evening out. Each extra fact adds a little random difference to EVERY pair, blurring the contrast.", "tone": "warn" },
        { "max": 64, "text": "🤯 64 facts in: the farthest profile is barely further than the nearest. \"Your closest match\" is now practically a coin toss among strangers — distance has lost its meaning.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "The curse of dimensionality", "formula": "d → ∞ : (farthest − nearest) / nearest → 0", "text": "High-dimensional space is unintuitively empty and uniform. Distance-based methods like KNN need dimensionality kept low: select features or project down (e.g. PCA) first." }
    }
  },
  {
    "q": "Two features genuinely predict the label. You add 20 columns of random junk. KNN's accuracy…",
    "choices": [
      "Drops — junk noise drowns the signal",
      "Rises — more information helps",
      "Holds — junk gets outvoted",
      "Holds, but queries slow down",
      "Drops only when k is even"
    ],
    "explain": "Every feature contributes to the distance, junk included. Columns of noise add random distance between genuinely similar points until true neighbours stop being nearest.",
    "simple": "Junk columns add random amounts to every distance. With enough random noise, the truly-similar points stop being the closest ones — the real signal drowns.",
    "widget": {
      "type": "dimCurse",
      "title": "Drowning the signal",
      "world": "Ten patients. The first 2 facts are medical signal; everything after is admin junk. Watch what junk does to 'most similar'.",
      "itemName": "patient",
      "n": 10,
      "seed": 23,
      "knob": { "label": "Facts in the comparison (first 2 = real signal)", "min": 2, "max": 60, "step": 1, "init": 2 },
      "insights": [
        { "max": 6, "text": "Mostly signal: the nearest patient is clearly nearer than the rest. This ordering is what KNN's vote depends on.", "tone": "info" },
        { "max": 30, "text": "Junk piling up: watch the green \"nearest\" tag — has it jumped to a different patient? Random columns are reshuffling the ranking.", "tone": "warn" },
        { "max": 60, "text": "🤯 The ranking is now mostly noise-made. Unlike models that can learn a weight of zero for junk, KNN gives every column a full vote in the distance. Garbage in, neighbours out.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Irrelevant features hurt KNN", "formula": "distance² = Σ gaps² — junk columns add noise terms to every pair", "text": "KNN cannot down-weight a useless feature by itself. Feature selection before KNN isn't optional polish — it's often the difference between working and broken." }
    }
  },
  {
    "q": "An online checkout needs its fraud answer inside 50 ms. Why is vanilla KNN a poor fit for that job?",
    "choices": [
      "It pays its whole cost per query",
      "It needs days of training first",
      "Its scan cannot be parallelised",
      "It needs a GPU per request",
      "Its accuracy decays under load"
    ],
    "explain": "KNN defers all computation to prediction time. A model that must answer NOW is exactly the wrong place for an algorithm whose cost is paid per-query.",
    "simple": "KNN does its heavy lifting when you ASK it something: it scans all stored examples per question. A checkout that needs an answer in milliseconds can't sit through that scan.",
    "widget": {
      "type": "speedLazy",
      "title": "The checkout timeout",
      "world": "A checkout fraud-check must answer in 50 ms — and it's KNN over past transactions. Grow the history. The customer is waiting.",
      "itemName": "transactions",
      "storeLabel": "Transaction history",
      "knobMax": 60000,
      "knob": { "label": "Stored past transactions", "min": 500, "max": 60000, "step": 500, "init": 2000 },
      "insights": [
        { "max": 10000, "text": "Small history: the scan fits in the time budget. Ship it… for now.", "tone": "info" },
        { "max": 40000, "text": "Every new day of business adds transactions, and EVERY checkout pays to scan all of them. The cost of success is pointed at your latency budget.", "tone": "warn" },
        { "max": 60000, "text": "🤯 The better the business does, the slower every checkout gets — a model whose cost grows with success, charged at the worst possible moment. Eager models pay once at training; KNN pays at every query.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Query-time cost (lazy learning's bill)", "formula": "per-prediction cost = O(n · features)", "text": "Match the algorithm to where you can afford to pay: KNN is cheap to build and expensive to ask; parametric models are the reverse. Latency-critical paths favour the latter — or an indexed KNN." }
    }
  },
  {
    "q": "Once deployed, a linear model ships as a handful of coefficients. To keep working, KNN must ship…",
    "choices": [
      "Its whole training set",
      "Only k and the metric",
      "One centroid per class",
      "Its boundary equation",
      "A 1% compressed sketch"
    ],
    "explain": "KNN's \"model\" IS the dataset — deleting it deletes the model. A trained linear model is a handful of coefficients; the data can be archived.",
    "simple": "KNN's model IS the whole dataset, so deploying it means shipping the whole dataset. The linear model ships a handful of numbers and travels light.",
    "widget": {
      "type": "speedLazy",
      "title": "Shipping the suitcase",
      "world": "Deploying to a tiny chip: the linear model ships as 4 numbers; KNN must pack ALL its records. Grow the dataset it came from.",
      "itemName": "tasting records",
      "storeLabel": "What KNN must ship to the chip",
      "knobMax": 40000,
      "knob": { "label": "Tasting records in the dataset", "min": 100, "max": 40000, "step": 100, "init": 500 },
      "insights": [
        { "max": 5000, "text": "A few thousand records — annoying but shippable. (The linear model is still 4 numbers.)", "tone": "info" },
        { "max": 25000, "text": "The suitcase grows one-for-one with the data. There is no \"summary\" to extract — the records ARE the model.", "tone": "warn" },
        { "max": 40000, "text": "🤯 40,000 records on a chip with 256KB of RAM: impossible. Meanwhile the linear model still fits in a text message. Non-parametric models trade compactness for flexibility.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "O(n) memory (non-parametric storage)", "formula": "KNN model size = the training set · parametric model size = fixed", "text": "KNN never compresses experience into parameters. If deployment memory is tight — edge devices, phones — that alone can rule it out." }
    }
  },
  {
    "q": "k-d trees and ball trees make exact neighbour search dramatically faster in low dimensions. What is the trick?",
    "choices": [
      "Skip regions that provably can't win",
      "Delete redundant training points",
      "Cache answers for popular queries",
      "Lower k automatically for big data",
      "Sort the points once by size"
    ],
    "explain": "A spatial index partitions space (like a postcode system): the search descends to the query's region and safely skips far-away branches, doing ~log(n) work instead of n.",
    "simple": "It's the postcode trick: check your local area first instead of measuring the distance to every shop in the country. The tree safely skips whole regions that can't possibly win.",
    "widget": {
      "type": "speedLazy",
      "title": "The postcode trick",
      "world": "You wouldn't find the nearest coffee shop by measuring the distance to every shop in the country. The third bar is KNN with a k-d tree.",
      "itemName": "shops",
      "storeLabel": "Shops in the database",
      "knobMax": 60000,
      "indexed": true,
      "knob": { "label": "Shops stored", "min": 1000, "max": 60000, "step": 1000, "init": 4000 },
      "insights": [
        { "max": 10000, "text": "Brute force already does thousands of checks. The indexed search: ~13. Same answer, both exact.", "tone": "info" },
        { "max": 40000, "text": "Double the shops → brute force doubles; the indexed search adds ONE extra check (log₂ grows by 1 per doubling).", "tone": "info" },
        { "max": 60000, "text": "🤯 60,000 checks vs ~16. The trick: organise points into nested regions once, then skip every region that provably can't contain your nearest neighbour.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Spatial indexes (k-d tree, ball tree)", "formula": "brute force O(n) → indexed ≈ O(log n) per query (low dimensions)", "text": "Pre-organising space rescues KNN's query cost. One caveat for later: in high dimensions these indexes lose their edge — the curse of dimensionality strikes again." }
    }
  },
  {
    "q": "Sweep k from 1 to n and plot the VALIDATION accuracy at each value. The typical shape is…",
    "choices": [
      "Rise, plateau, then cliff",
      "A steady climb toward k = n",
      "A steady fall from k = 1",
      "Flat — k barely matters",
      "A sawtooth by odd/even k"
    ],
    "explain": "Tiny k memorises noise, huge k blurs into the majority class; validation accuracy usually peaks at a moderate k between the two failure modes.",
    "simple": "Tiny k copies noise (bad). Huge k averages everything into mush (bad). In between sits a comfortable plateau (good). The curve is a hill with a cliff at each end.",
    "widget": {
      "type": "kCurve",
      "title": "Goldilocks and the 16 neighbours",
      "world": "A churn model on messy data. Sweep k across its whole range and find all three zones: too twitchy, just right, too blunt.",
      "kmax": 16,
      "train": [
        { "x": 1.6, "y": 2, "c": 0 },
        { "x": 2.8, "y": 1.4, "c": 0 },
        { "x": 2, "y": 3.6, "c": 0 },
        { "x": 3.6, "y": 2.8, "c": 0 },
        { "x": 1.2, "y": 5, "c": 0 },
        { "x": 4.2, "y": 1.2, "c": 0 },
        { "x": 3, "y": 4.6, "c": 0 },
        { "x": 4.6, "y": 3.6, "c": 0 },
        { "x": 2.4, "y": 6, "c": 0 },
        { "x": 5.2, "y": 4.4, "c": 1 },
        { "x": 7.6, "y": 7, "c": 1 },
        { "x": 8.6, "y": 8.2, "c": 1 },
        { "x": 6.8, "y": 8.8, "c": 1 },
        { "x": 8, "y": 6, "c": 1 },
        { "x": 9.2, "y": 7.6, "c": 1 },
        { "x": 6.6, "y": 6.2, "c": 0 }
      ],
      "val": [
        { "x": 2.6, "y": 2.4, "c": 0 },
        { "x": 3.4, "y": 4, "c": 0 },
        { "x": 1.6, "y": 4.4, "c": 0 },
        { "x": 4.4, "y": 2.2, "c": 0 },
        { "x": 2, "y": 6.4, "c": 0 },
        { "x": 3.8, "y": 5.6, "c": 0 },
        { "x": 7, "y": 7.6, "c": 1 },
        { "x": 8.4, "y": 6.8, "c": 1 },
        { "x": 6.2, "y": 7.2, "c": 1 },
        { "x": 7.4, "y": 5.6, "c": 1 }
      ],
      "knob": { "label": "Candidate k", "min": 1, "max": 16, "step": 1, "init": 8 },
      "insights": [
        { "max": 2, "text": "Left edge: the purple score dips — single mislabeled customers are steering predictions. Too twitchy.", "tone": "warn" },
        { "max": 11, "text": "The plateau: a wide range of \"reasonable\" k all score well. (Folk heuristics like k ≈ √n land here — a starting point, never a law.)", "tone": "info" },
        { "max": 16, "text": "🤯 Right edge: the minority \"churn\" class gets permanently outvoted and the score cliff-dives. You've traced the full Goldilocks curve: noise → sweet spot → majority takeover.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "The validation curve's U-shape", "formula": "score(k): rises from noisy k=1, plateaus, collapses toward k=n", "text": "Both ends of the k range fail for opposite reasons; the middle plateau is where real models live. Always sweep k and look at the whole curve, not one point." }
    }
  },
  {
    "q": "Training score 100%, validation score 70%. Name the diagnosis — and the direction of the cure.",
    "choices": [
      "Overfitting — raise k",
      "Underfitting — lower k",
      "Leakage — reshuffle the split",
      "Imbalance — resample classes",
      "Healthy — ship it"
    ],
    "explain": "A big train-validation gap is overfitting's signature. For KNN it screams \"k too small\" — likely k=1, where training score is 100% by construction.",
    "simple": "100% on questions it memorised, 70% on new ones = it memorised rather than learned. The GAP between the two numbers is the tell. A bigger k forces it to generalise.",
    "widget": {
      "type": "trainTestK",
      "title": "The gap that diagnoses",
      "world": "16 bottles, two mislabeled by a tired intern. The GAP between the bars is the diagnostic instrument. Find where it's widest — then close it.",
      "classes": [
        "Red blend",
        "White blend"
      ],
      "xlab": "acidity",
      "ylab": "sugar",
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
      "test": [
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
      "knob": { "label": "Neighbours asked (k)", "min": 1, "max": 9, "step": 2, "init": 1 },
      "insights": [
        { "max": 1, "text": "🤯 k = 1: top bar perfect, bottom bar mediocre — the model \"learned\" the intern's two mistakes by heart. A wide gap = memorisation, not knowledge.", "tone": "wow" },
        { "max": 5, "text": "Raising k, the gap narrows: mislabeled bottles get outvoted, training score falls (good!), new-bottle score rises.", "tone": "info" },
        { "max": 9, "text": "Gap nearly closed: what the model knows about old bottles now transfers to new ones. Diagnosis by gap, treatment by k.", "tone": "info" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Overfitting (and its KNN cure)", "formula": "train score ≫ validation score → overfit → increase k", "text": "Overfitting = modelling the noise. In KNN the treatment is more smoothing: bigger k, or distance weights. You just administered it and watched the gap close." }
    }
  },
  {
    "q": "Training score 65%, validation score 64% — both poor, no gap. Name the diagnosis — and the direction of the cure.",
    "choices": [
      "Underfitting — lower k",
      "Overfitting — raise k",
      "Leakage — reshuffle the split",
      "Optimal — stop tuning",
      "Imbalance — resample classes"
    ],
    "explain": "Both-scores-low with no gap means the model can't even fit what it saw: too much smoothing. In KNN that's an oversized k erasing real structure.",
    "simple": "When even the training score is bad, the model is too blunt to draw what's really there — like painting a portrait with a broom. Shrink k so it can express detail again.",
    "widget": {
      "type": "boundaryK",
      "title": "The blurry model",
      "world": "A genuine premium cluster inside a budget sea. Start at the SMOOTH end and try to make the model see the cluster at all.",
      "classes": [
        "Premium",
        "Budget"
      ],
      "xlab": "basket size",
      "ylab": "visit frequency",
      "points": [
        { "x": 4.6, "y": 4.6, "c": 0 },
        { "x": 5.4, "y": 5.2, "c": 0 },
        { "x": 5, "y": 4, "c": 0 },
        { "x": 4.2, "y": 5.4, "c": 0 },
        { "x": 5.8, "y": 4.4, "c": 0 },
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
      "knob": { "label": "Neighbours per prediction (k)", "min": 1, "max": 15, "step": 2, "init": 15 },
      "insights": [
        { "max": 3, "text": "Now the premium cluster gets its territory — the model finally fits the structure that's really there.", "tone": "info" },
        { "max": 9, "text": "The blue region is being squeezed. The model is getting stabler and WRONGER at the same time.", "tone": "warn" },
        { "max": 15, "text": "🤯 All orange: the model literally cannot express \"there's a premium cluster here\" at this k. It fails on training data itself — both scores low, no gap. That's underfitting.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Underfitting (both scores low, no gap)", "formula": "train ≈ validation ≈ poor → model too crude → decrease k", "text": "Overfitting shows a GAP; underfitting shows a CEILING. The fix runs the other way: less smoothing — smaller k — so the model can express the structure it's missing." }
    }
  },
  {
    "q": "Instead of one train/validation split, you rotate the held-out slice five times and average the five scores. What does that buy you?",
    "choices": [
      "A score that doesn't depend on luck",
      "Five times more training data",
      "Bias-free tuning on the test data",
      "A guaranteed accuracy boost",
      "Stratified classes for free"
    ],
    "explain": "A single split is one roll of the dice — which points landed in validation? K-fold rotates the held-out slice and averages, shrinking the luck factor.",
    "simple": "One split might hide the easy examples (lucky score) or the hard ones (cruel score). Rotate which slice is hidden, score each rotation, and average — the luck cancels out.",
    "widget": {
      "type": "foldPick",
      "title": "Five rolls of the dice",
      "world": "Same model, same 50 emails, split 5 ways. Each bar = the score you'd have reported if THAT slice had been held out.",
      "blurb": "Same model, same data — the only thing changing is WHICH slice was held back for scoring:",
      "folds": [
        { "name": "slice 1 held out", "acc": 72 },
        { "name": "slice 2 held out", "acc": 88 },
        { "name": "slice 3 held out", "acc": 80 },
        { "name": "slice 4 held out", "acc": 92 },
        { "name": "slice 5 held out", "acc": 76 }
      ],
      "knob": { "label": "Which slice is held back", "min": 1, "max": 6, "step": 1, "init": 1 },
      "insights": [
        { "max": 5, "text": "Identical model — yet you could honestly report anywhere from 72% to 92% depending on an arbitrary split. Which number would YOU have put in the report?", "tone": "warn" },
        { "max": 6, "text": "🤯 Averaging all five rotations: 81.6%. No single lucky (or cruel) split decides the story — and the spread between folds even tells you how uncertain the estimate is.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "K-fold cross-validation", "formula": "score = mean over folds( train on k−1 slices, score on the held-out one )", "text": "Rotate which slice is hidden, score each rotation, average. Costlier than one split, but the number you report stops depending on luck." }
    }
  },
  {
    "q": "The data file is sorted by class, and you slice the first 20% off as a validation set without shuffling. What have you actually built?",
    "choices": [
      "A one-class, useless validation set",
      "A perfectly stratified split",
      "A slightly pessimistic split",
      "A faster but equivalent split",
      "Nothing — the split won't run"
    ],
    "explain": "Slicing a sorted file gives a validation set full of one class and a training set starved of it. Shuffle (and ideally stratify) before splitting.",
    "simple": "Slice the top off a file sorted by class and your validation set is all one class — while the training set barely contains that class at all. Shuffle first, so every slice looks like the real mix.",
    "widget": {
      "type": "foldPick",
      "title": "The sorted-file disaster",
      "world": "The file was sorted by class, and validation slices were cut straight off it. Read the fold scores — then the average.",
      "blurb": "Slices cut from a file SORTED BY CLASS (no shuffling first):",
      "folds": [
        { "name": "slice 1 (all spam)", "acc": 15 },
        { "name": "slice 2 (all spam)", "acc": 20 },
        { "name": "slice 3 (mixed)", "acc": 65 },
        { "name": "slice 4 (all normal)", "acc": 90 },
        { "name": "slice 5 (all normal)", "acc": 85 }
      ],
      "knob": { "label": "Which slice is held back", "min": 1, "max": 6, "step": 1, "init": 1 },
      "insights": [
        { "max": 2, "text": "Slice 1 held out = the training data barely contains ANY spam — the model has hardly seen the class it's being tested on. 15%.", "tone": "warn" },
        { "max": 5, "text": "The scores swing wildly with WHICH block of the sorted file was hidden. None of these numbers describes the model — they describe the sorting.", "tone": "warn" },
        { "max": 6, "text": "🤯 Even the average (55%) is meaningless here. The cure costs one line: SHUFFLE before splitting — or better, stratify so every slice keeps the true class mix.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Shuffle & stratify before splitting", "formula": "shuffle(data) → split · stratified split keeps class ratios in every slice", "text": "Row order often encodes something (time, class, source). Honest evaluation needs every slice to look like the real mix — shuffling and stratification are how you get it." }
    }
  },
  {
    "q": "Two training points sit at EXACTLY the same distance from the query, but only one neighbour slot remains. Typical implementations…",
    "choices": [
      "Pick arbitrarily (e.g. file order)",
      "Include both, using k + 1",
      "Average the two into one point",
      "Re-measure with a second metric",
      "Give each half a vote"
    ],
    "explain": "Something must break the tie, and it's usually as mundane as data order. Harmless — but it means the \"k nearest\" set isn't always uniquely defined.",
    "simple": "Two points tied exactly for the last seat — something has to choose, so libraries just take whichever appears first in the file. Harmless, but good to know the choice is arbitrary.",
    "widget": {
      "type": "scatterK",
      "title": "Perfectly torn",
      "world": "Two candidates sit at EXACTLY the same distance — check the lines. Slide k up from 1: who gets the single slot?",
      "classes": [
        "Household A",
        "Household B"
      ],
      "xlab": "size score",
      "ylab": "fluffiness",
      "showDists": true,
      "points": [
        { "x": 3, "y": 5, "c": 0 },
        { "x": 7, "y": 5, "c": 1 },
        { "x": 2.4, "y": 2.6, "c": 0 },
        { "x": 7.8, "y": 7.2, "c": 1 },
        { "x": 1.8, "y": 6.8, "c": 0 },
        { "x": 8.4, "y": 3.2, "c": 1 }
      ],
      "query": { "x": 5, "y": 5 },
      "knob": { "label": "Neighbours asked (k)", "min": 1, "max": 6, "step": 1, "init": 1 },
      "insights": [
        { "max": 1, "text": "Both nearest candidates show the identical distance: 2. Only one can be \"the\" nearest — and the algorithm quietly picked the one stored earlier in the file.", "tone": "warn" },
        { "max": 4, "text": "At k = 2 both tied points are in and fairness returns. The tie only bites when the cut-off lands exactly between them.", "tone": "info" },
        { "max": 6, "text": "🤯 The model's answer at k = 1 depended on ROW ORDER in a file — pure arbitrariness dressed as confidence. Knowing where hidden tie-breaks live is part of trusting your tools.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Distance ties & tie-breaking", "formula": "equal distances → arbitrary rule decides (e.g. data order)", "text": "Real implementations must break exact ties somehow. It rarely matters — but reproducibility notes (\"results may depend on row order\") come exactly from spots like this." }
    }
  },
  {
    "q": "A query lands miles away from every training point — nothing in the data resembles it. Plain KNN…",
    "choices": [
      "Answers confidently anyway",
      "Returns 'unknown'",
      "Raises an out-of-range error",
      "Averages all the classes",
      "Widens k until it feels sure"
    ],
    "explain": "KNN always finds SOME k nearest points — even if they're all miles away — and votes as confidently as ever. Distance-to-neighbours isn't checked unless you add that check yourself.",
    "simple": "KNN always finds SOME k nearest points — even if they're miles away — and votes with full confidence. It has no built-in way to say 'this is nothing like anything I've seen'.",
    "widget": {
      "type": "scatterK",
      "title": "Confidently clueless",
      "world": "A plant app meets a deep-sea anglerfish (◆, far from everything). It answers anyway. Note what never appears: 'I don't know'.",
      "classes": [
        "Fern",
        "Moss"
      ],
      "xlab": "leaf width",
      "ylab": "greenness",
      "showDists": true,
      "points": [
        { "x": 1.4, "y": 8.2, "c": 0 },
        { "x": 2.6, "y": 9, "c": 0 },
        { "x": 2, "y": 7.2, "c": 0 },
        { "x": 3.2, "y": 8.6, "c": 0 },
        { "x": 1, "y": 9.4, "c": 0 },
        { "x": 3.8, "y": 9.2, "c": 1 },
        { "x": 4.6, "y": 8, "c": 1 },
        { "x": 5.4, "y": 9, "c": 1 },
        { "x": 4.2, "y": 7.4, "c": 1 },
        { "x": 5, "y": 9.8, "c": 1 }
      ],
      "query": { "x": 8.8, "y": 1 },
      "knob": { "label": "Neighbours asked (k)", "min": 1, "max": 10, "step": 1, "init": 3 },
      "insights": [
        { "max": 4, "text": "Look at those distances — enormous. The \"neighbours\" have nothing in common with the query. The vote happens anyway, with full confidence.", "tone": "warn" },
        { "max": 8, "text": "More voters, same farce: every voter is miles away, and the verdict box still declares a winner as if this were business as usual.", "tone": "warn" },
        { "max": 10, "text": "🤯 The app just classified an anglerfish as a plant, unanimously. Plain KNN has no \"too far to say\" reflex — if you need one, YOU must add a distance threshold or outlier check.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "No built-in abstention (out-of-distribution blindness)", "formula": "KNN votes among the k nearest — however far \"nearest\" is", "text": "Models answer the question they're built for, not the question you meant. Production systems pair KNN with a sanity check: if the nearest neighbour is beyond some distance, route to a human." }
    }
  },
  {
    "q": "KNN regression with a small k, and one stored value is a wild typo (£900 where £90 belongs). Queries landing near the typo get…",
    "choices": [
      "Predictions dragged toward it",
      "Averages that absorb it harmlessly",
      "The typo automatically excluded",
      "A small uniform shift everywhere",
      "Slower but unchanged answers"
    ],
    "explain": "An average over 1–2 values has no protection: if one is a typo (£3,000,000 instead of £300,000), nearby predictions inherit the madness.",
    "simple": "An average over one or two values has no protection: if one of them is a typo, your prediction basically IS the typo. More values dilute it; a median simply ignores it.",
    "widget": {
      "type": "knnRegress",
      "title": "The typo in the ledger",
      "world": "One host typed an extra zero (the spike) — and your rental sits right beside it. Start at k = 1, then buy yourself safety.",
      "xlab": "distance from beach",
      "ylab": "price per night (£)",
      "itemName": "rentals",
      "prefix": "£",
      "decimals": 0,
      "points": [
        { "x": 0.5, "y": 180 },
        { "x": 1.3, "y": 165 },
        { "x": 2.1, "y": 150 },
        { "x": 2.9, "y": 900 },
        { "x": 3.7, "y": 130 },
        { "x": 4.5, "y": 120 },
        { "x": 5.3, "y": 110 },
        { "x": 6.1, "y": 100 },
        { "x": 6.9, "y": 95 },
        { "x": 7.7, "y": 85 },
        { "x": 8.5, "y": 80 },
        { "x": 9.3, "y": 70 }
      ],
      "qx": 3.1,
      "knob": { "label": "Rentals averaged (k)", "min": 1, "max": 12, "step": 1, "init": 1 },
      "insights": [
        { "max": 1, "text": "🤯 k = 1: your beach flat is \"worth\" £900 a night — the estimate IS the typo. Look at the prediction line spiking around it.", "tone": "wow" },
        { "max": 4, "text": "A few honest neighbours dilute the typo, but it's still inflating your estimate — one bad number in a 3-value average is a third of the answer.", "tone": "warn" },
        { "max": 12, "text": "Big k flattens the spike's influence… at the price of blurring the real beach-distance pattern too. (A sneak peek at a better cure: average the MEDIAN instead of the mean.)", "tone": "info" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Outlier sensitivity of small-k averages", "formula": "mean of k values — one wild value shifts it by (wild − true)/k", "text": "Means are democratic but gullible. Defences: bigger k, distance weights, median instead of mean, or cleaning outliers before they vote." }
    }
  },
  {
    "q": "k = 5 and the neighbours vote 4 spam, 1 normal. Beyond the label 'spam', the fraction 4/5 hands you a free…",
    "choices": [
      "Rough confidence score",
      "Calibrated true probability",
      "Estimate of the model's error rate",
      "Recommendation for the next k",
      "Estimate of the training spam rate"
    ],
    "explain": "The vote fraction (4/5) acts as a rough confidence estimate — that's exactly what predict_proba returns for KNN. Useful, though not a calibrated true probability.",
    "simple": "4 of 5 neighbours said spam → you can report '80% of similar cases were spam'. It's not a guarantee, but it's far more useful than a bare label with no hint of doubt.",
    "widget": {
      "type": "scatterK",
      "title": "How sure is the committee?",
      "world": "Billing or Tech? This ticket is borderline. Don't just read the WINNER — read the SPLIT (3–2? 5–0?). The split is information.",
      "classes": [
        "Billing",
        "Tech"
      ],
      "xlab": "mentions of money",
      "ylab": "mentions of errors",
      "points": [
        { "x": 2, "y": 3, "c": 0 },
        { "x": 3.4, "y": 2.2, "c": 0 },
        { "x": 2.8, "y": 4.6, "c": 0 },
        { "x": 4.4, "y": 3.8, "c": 0 },
        { "x": 5.2, "y": 2.8, "c": 0 },
        { "x": 4.8, "y": 5.6, "c": 1 },
        { "x": 6, "y": 4.6, "c": 1 },
        { "x": 5.6, "y": 6.8, "c": 1 },
        { "x": 7, "y": 5.8, "c": 1 },
        { "x": 6.6, "y": 7.4, "c": 1 }
      ],
      "query": { "x": 5, "y": 4.6 },
      "knob": { "label": "Neighbours asked (k)", "min": 1, "max": 9, "step": 2, "init": 1 },
      "insights": [
        { "max": 1, "text": "k = 1 says \"Tech\" with what looks like total certainty — 1 out of 1. The split is invisible at k = 1; certainty here is an illusion of sample size.", "tone": "warn" },
        { "max": 5, "text": "Now the vote is close — 3–2-ish. The label says one thing; the SPLIT says \"this one's genuinely borderline, maybe don't auto-route it\".", "tone": "info" },
        { "max": 9, "text": "🤯 The fraction of votes (3/5 = 60%, 5/9 = 56%…) is a free confidence readout hiding inside the algorithm. Borderline tickets can go to a human; landslide tickets can be automated.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Vote fractions ≈ confidence (predict_proba)", "formula": "P(class) ≈ votes for class / k", "text": "KNN's vote split doubles as a confidence score. It's crude and uncalibrated — but \"80% of similar cases were spam\" is far more useful than a bare label." }
    }
  },
  {
    "q": "You need a colour column — {red, green, blue} — inside KNN's distance. The standard encoding is…",
    "choices": [
      "One 0/1 column per colour",
      "red=1, green=2, blue=3",
      "Each colour's frequency",
      "Character-overlap similarity",
      "Dropping the column"
    ],
    "explain": "Numbering categories invents a fake ordering (it makes red \"closer\" to green than to blue). One-hot encoding gives every pair of different colours the same distance.",
    "simple": "Numbering colours (red=1, green=2, blue=3) invents a lie: it makes red 'closer' to green than to blue. One-hot gives each colour its own yes/no column, so all colours are equally different.",
    "widget": {
      "type": "metricMorph",
      "title": "The accidental ranking",
      "world": "Colour was lazily encoded as a NUMBER (red=1 … blue=9). Two size-M shirts now sit miles apart. No ruler can fix an encoding.",
      "a": { "x": 1, "y": 5 },
      "aName": "Red shirt, size M",
      "b": { "x": 9, "y": 5.8 },
      "bName": "Blue shirt, size M",
      "unit": "encoded units",
      "knob": { "label": "How distance is measured", "min": 1, "max": 2, "step": 0.05, "init": 1 },
      "insights": [
        { "max": 1.05, "text": "Two size-M shirts, \"distance 8.8 apart\" — almost all of it from the made-up colour numbers. Had we coded blue=2, they'd be neighbours. The data didn't decide this; the encoding did.", "tone": "warn" },
        { "max": 1.9, "text": "Changing the RULER doesn't fix it — the invented ordering poisons every metric. The fix has to happen in the ENCODING, before distance is ever computed.", "tone": "info" },
        { "max": 2, "text": "🤯 One-hot fixes it: red=(1,0,0), blue=(0,0,1) — every different-colour pair sits at the SAME distance, √2, and no colour is \"between\" others. No fake geometry.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "One-hot encoding", "formula": "red→(1,0,0) · green→(0,1,0) · blue→(0,0,1)", "text": "Categories have no order, so give each its own axis. Any two different categories are then equidistant — the geometry finally matches the meaning." }
    }
  },
  {
    "q": "Same data, same k — you only switch the metric from Euclidean to Manhattan. Predictions can genuinely change, because…",
    "choices": [
      "'Nearest' itself can change",
      "They can't — the rankings match",
      "Diagonal neighbours get excluded",
      "Manhattan requires rescaling first",
      "Ties start breaking alphabetically"
    ],
    "explain": "Metrics disagree about diagonal vs axis-aligned gaps, so point A can be nearer under L2 while point B is nearer under L1 — flipping the 1-NN prediction entirely.",
    "simple": "The straight-line ruler and the street-grid ruler can honestly disagree about who's closest — diagonal shortcuts are cheap for one and pricey for the other. Different ruler → different neighbour → different answer.",
    "widget": {
      "type": "metricSwitch",
      "title": "The ruler picks the winner",
      "world": "Which café is 'nearest' — cosy (diagonal across the park) or chain (straight down one road)? Only the RULER changes. Watch the crown move.",
      "classes": [
        "Independent café",
        "Chain café"
      ],
      "xlab": "streets east",
      "ylab": "streets north",
      "queryLabel": "your office",
      "points": [
        { "x": 5, "y": 5, "c": 0, "name": "Cosy Corner" },
        { "x": 6.5, "y": 2, "c": 1, "name": "BeanCo" },
        { "x": 9, "y": 8, "c": 0, "name": "Leaf & Loaf" },
        { "x": 0.5, "y": 9, "c": 1, "name": "BeanCo Express" }
      ],
      "query": { "x": 2, "y": 2 },
      "knob": { "label": "The ruler (city-block → straight-line)", "min": 1, "max": 2, "step": 0.05, "init": 1 },
      "insights": [
        { "max": 1.05, "text": "City-block ruler: BeanCo wins — 4.5 blocks of honest walking vs Cosy Corner's 6. The 1-NN prediction is \"Chain\".", "tone": "info" },
        { "max": 1.85, "text": "Somewhere along this slide the crown JUMPS. Neither café moved a millimetre — only the definition of \"near\" changed.", "tone": "warn" },
        { "max": 2, "text": "🤯 Straight-line ruler: Cosy Corner (diagonal) is now nearest — 4.24 vs 4.5 — and the prediction flipped with it. Diagonal gaps are cheap under L2, expensive under L1.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": {
        "name": "The metric is a hyperparameter",
        "formula": "metric ∈ {euclidean, manhattan, minkowski(p), …} — tune it like k",
        "text": "Distance is a modelling choice with real consequences. Treat the metric like k: try candidates, validate, and pick what matches how similarity works in YOUR domain."
      }
    }
  },
  {
    "q": "You DELETE five features and KNN's accuracy goes UP. Most likely, those five features were…",
    "choices": [
      "Noise distorting the distances",
      "Redundant but harmless copies",
      "Secretly leaking the label",
      "Merely slow to compute",
      "The most predictive ones"
    ],
    "explain": "For distance-based models, an irrelevant feature isn't neutral — it actively injects noise into every distance. Removing it purifies the similarity signal.",
    "simple": "Deleting junk columns removes random noise from every distance, so the genuinely-similar points become the closest ones again. Less garbage in, better neighbours out.",
    "widget": {
      "type": "dimCurse",
      "title": "Addition by subtraction",
      "world": "A song recommender with 50 facts — most are junk. Drag DOWN from the max, deleting junk, and watch 'nearest' regain meaning.",
      "itemName": "song",
      "n": 10,
      "seed": 51,
      "knob": { "label": "Facts kept in the comparison", "min": 2, "max": 50, "step": 1, "init": 50 },
      "insights": [
        { "max": 5, "text": "🤯 Down at the true signal: crisp separation — the nearest song is unambiguously nearest. You made the model smarter by giving it LESS.", "tone": "wow" },
        { "max": 25, "text": "Keep deleting: with every junk fact removed, the gap between nearest and farthest widens — the ranking is starting to mean something.", "tone": "info" },
        { "max": 50, "text": "All 50 facts: the bars are nearly equal — your \"top recommendation\" is basically random. This is where you started; now go delete some junk (drag left).", "tone": "warn" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Feature selection", "formula": "fewer, relevant features → cleaner distances → better neighbours", "text": "For KNN, deleting bad features is often the single highest-impact tuning step — ahead of adjusting k. Signal-to-noise beats quantity." }
    }
  },
  {
    "q": "Rare-disease screening with KNN: the minority class keeps getting outvoted. Which pairing most directly protects it?",
    "choices": [
      "Distance weights + resampling",
      "Bigger k + raw features",
      "Manhattan distance + odd k",
      "Fewer features + bigger k",
      "Deduplication + a smaller n"
    ],
    "explain": "Weighted votes stop distant majority neighbours from swamping close minority ones; over/under-sampling fixes the headcount problem at its source. Large k does the opposite.",
    "simple": "Two fixes for the same disease: give close matches louder voices (distance weights), or fix the headcount itself (resample until the classes arrive balanced). Both stop 'rare' meaning 'automatically outvoted'.",
    "widget": {
      "type": "voteWeight",
      "title": "Saving the rare signal",
      "world": "Rare-condition screening: 2 close 'positive' cases vs 4 distant 'healthy' ones. The plain vote misses it. You have one dial. Save the diagnosis.",
      "classes": [
        "Has condition",
        "Healthy"
      ],
      "neighbors": [
        { "name": "very similar patient", "d": 0.5, "c": 0 },
        { "name": "similar patient", "d": 0.9, "c": 0 },
        { "name": "healthy far 1", "d": 2.8, "c": 1 },
        { "name": "healthy far 2", "d": 3.2, "c": 1 },
        { "name": "healthy far 3", "d": 3.6, "c": 1 },
        { "name": "healthy far 4", "d": 4.2, "c": 1 }
      ],
      "knob": { "label": "How much closeness amplifies a vote", "min": 0, "max": 4, "step": 0.1, "init": 0 },
      "insights": [
        { "max": 0.05, "text": "Headcount democracy: 4–2, \"healthy\". The two patients most LIKE this one — both positive — were simply outnumbered by background population.", "tone": "warn" },
        { "max": 1.8, "text": "As closeness gains power, the two truly similar cases claw back influence. Somewhere here, the diagnosis flips.", "tone": "info" },
        { "max": 4, "text": "🤯 The near-twins now dominate: \"has condition\". The other fix works on the data instead: resample so the classes reach the vote with equal numbers. Both attack the same failure — headcount ≠ evidence.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Imbalance defences: weights & resampling", "formula": "weights = 1/d · or oversample minority / undersample majority", "text": "When one class is rare, plain voting encodes \"rare things don't happen\" — fatal for exactly the cases you care about. Weight by distance, rebalance the data, or both." }
    }
  },
  {
    "q": "Compute it by hand: the EUCLIDEAN distance between (1, 2) and (4, 6) is…",
    "choices": [
      "5",
      "7",
      "25",
      "3.5",
      "12"
    ],
    "explain": "Gaps are 3 and 4; Euclidean squares, sums, and roots them: √(9 + 16) = √25 = 5. (7 would be the Manhattan distance.)",
    "simple": "The gaps are 3 and 4. Square them (9 and 16), add (25), take the square root: 5. It's the school triangle rule — Pythagoras — doing all the work.",
    "widget": {
      "type": "metricMorph",
      "title": "The 3-4-5 walk",
      "world": "Checkpoints at (1,2) and (4,6): gaps of 3 and 4. Slide the ruler and catch BOTH classic numbers this famous pair produces.",
      "a": { "x": 1, "y": 2 },
      "aName": "(1, 2)",
      "b": { "x": 4, "y": 6 },
      "bName": "(4, 6)",
      "unit": "units",
      "knob": { "label": "How distance is measured", "min": 1, "max": 2, "step": 0.05, "init": 1 },
      "insights": [
        { "max": 1.05, "text": "City-block: 3 + 4 = 7. That's the Manhattan answer — a correct distance, just not the Euclidean one.", "tone": "info" },
        { "max": 1.9, "text": "The number is sliding from 7 down toward something rounder…", "tone": "info" },
        { "max": 2, "text": "🤯 Exactly 5. The 3-4-5 right triangle — √(3² + 4²) = 5. You've known this distance formula since Pythagoras came up in school; KNN just runs it millions of times.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Euclidean distance = Pythagoras", "formula": "d = √((4−1)² + (6−2)²) = √(9+16) = 5", "text": "Euclidean distance IS the Pythagorean theorem, applied to feature gaps. In more dimensions you just add more squared gaps under the root." }
    }
  },
  {
    "q": "Compute it by hand: the MANHATTAN distance between (2, 3) and (6, 8) is…",
    "choices": [
      "9",
      "6.4",
      "20",
      "4.5",
      "41"
    ],
    "explain": "Manhattan adds absolute gaps: |6−2| + |8−3| = 4 + 5 = 9. (6.4 is the Euclidean answer.)",
    "simple": "Just add the gaps: |6−2| = 4 and |8−3| = 5, so 4 + 5 = 9. No squaring, no square roots — taxi maths.",
    "widget": {
      "type": "metricMorph",
      "title": "Four across, five up",
      "world": "Depot (2,3) to flat (6,8): 4 blocks east, 5 north. Find the courier's true pedalling distance — and the pigeon's shortcut.",
      "a": { "x": 2, "y": 3 },
      "aName": "Depot (2,3)",
      "b": { "x": 6, "y": 8 },
      "bName": "Flat (6,8)",
      "unit": "blocks",
      "knob": { "label": "How distance is measured", "min": 1, "max": 2, "step": 0.05, "init": 2 },
      "insights": [
        { "max": 1.05, "text": "🤯 The courier's truth: 4 + 5 = 9 blocks, no square roots involved. Absolute gaps, added — that's the whole formula.", "tone": "wow" },
        { "max": 1.9, "text": "Between the extremes the number interpolates between the pigeon's 6.4 and the courier's 9.", "tone": "info" },
        { "max": 2, "text": "The pigeon's shortcut: √(16+25) ≈ 6.4. Same two addresses — the \"distance\" depends on who's travelling.", "tone": "info" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Manhattan distance, computed", "formula": "d = |6−2| + |8−3| = 4 + 5 = 9", "text": "Sum of absolute gaps — done. When someone asks which to use: it's about the geometry of your features, and yes, you can just try both and validate." }
    }
  },
  {
    "q": "In a correctly built KNN pipeline, when does feature scaling happen, relative to computing any distances?",
    "choices": [
      "Before — always",
      "After, applied to the distances",
      "Either — the two steps commute",
      "Only on the training rows",
      "Only on the query point"
    ],
    "explain": "Distance is computed FROM feature values, so any repair to those values must happen first. Scaling distances after the fact can't undo a wrong neighbour ranking.",
    "simple": "Distances are computed FROM the feature values, so any repair to the values must happen first. You can't unsalt a soup after serving it — fix upstream, then measure.",
    "widget": {
      "type": "scaleFeature",
      "title": "Repair before you measure",
      "world": "The knob is your pipeline's scaling step, applied BEFORE the distances you see. Set it wrong and every ranking downstream inherits the mistake.",
      "aName": "age",
      "bName": "mileage",
      "target": { "name": "your car", "a": 4, "b": 42000 },
      "cands": [
        { "name": "Car A · 4y, 68k mi", "a": 4.5, "b": 68000 },
        { "name": "Car B · 12y, 43k mi", "a": 12, "b": 43500 },
        { "name": "Car C · 5y, 51k mi", "a": 5, "b": 51000 },
        { "name": "Car D · 3y, 30k mi", "a": 3.5, "b": 30000 }
      ],
      "knob": { "label": "Pipeline scaling: shrink mileage by", "min": 0, "max": 4, "step": 0.25, "init": 0 },
      "insights": [
        { "max": 0.5, "text": "No scaling step: Car B — twelve years old! — ranks as your car's twin on mileage alone. Every distance on screen is already contaminated.", "tone": "warn" },
        { "max": 2.5, "text": "With the scaling step set sensibly, the ranking finally reflects both age AND mileage. Note the order of events: scale → THEN measure.", "tone": "info" },
        { "max": 4, "text": "🤯 There was no knob you could turn AFTER the distances to fix Car B's false ranking — the repair had to happen upstream. That's why sklearn pipelines bolt the scaler before the model.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Pipeline order: scale → distance", "formula": "Pipeline([(\"scaler\", StandardScaler()), (\"knn\", KNeighborsClassifier())])", "text": "Preprocessing must precede the computation that consumes it. Bonus rule you'll meet again: fit the scaler on training data only, then apply it to everything." }
    }
  },
  {
    "q": "Every algorithm has a home turf. Where does KNN genuinely shine?",
    "choices": [
      "Small clean data, curvy boundary",
      "Billions of rows, hot queries",
      "Thousands of sparse text features",
      "A regulator-ready global formula",
      "A 256 KB microcontroller"
    ],
    "explain": "KNN's strengths: no training, no assumed formula, and boundaries as curvy as the data itself. Its weaknesses (cost, memory, high dimensions) are absent in small, low-dimensional problems.",
    "simple": "KNN is happiest with: small data (scanning stays fast), a few meaningful features (distances stay honest), curvy class boundaries (no formula to constrain it), and no rush at answer time.",
    "widget": {
      "type": "boundaryK",
      "title": "The shape no line can draw",
      "world": "Faulty parts CURL around the good ones — no straight line can separate these. Watch KNN draw the ring at sensible k.",
      "classes": [
        "Good part",
        "Faulty part"
      ],
      "xlab": "temperature",
      "ylab": "pressure",
      "points": [
        { "x": 3.5, "y": 4, "c": 0 },
        { "x": 4.5, "y": 3.2, "c": 0 },
        { "x": 5.5, "y": 3.6, "c": 0 },
        { "x": 6.2, "y": 4.6, "c": 0 },
        { "x": 5.8, "y": 5.8, "c": 0 },
        { "x": 4.6, "y": 6.2, "c": 0 },
        { "x": 1.6, "y": 2, "c": 1 },
        { "x": 3, "y": 1.2, "c": 1 },
        { "x": 5, "y": 0.9, "c": 1 },
        { "x": 7, "y": 1.4, "c": 1 },
        { "x": 8.4, "y": 3, "c": 1 },
        { "x": 8.8, "y": 5, "c": 1 },
        { "x": 8.2, "y": 7, "c": 1 },
        { "x": 6.8, "y": 8.4, "c": 1 },
        { "x": 4.8, "y": 8.8, "c": 1 },
        { "x": 2.8, "y": 8.2, "c": 1 },
        { "x": 1.4, "y": 6.6, "c": 1 },
        { "x": 1, "y": 4.4, "c": 1 }
      ],
      "knob": { "label": "Neighbours per prediction (k)", "min": 1, "max": 17, "step": 2, "init": 3 },
      "insights": [
        { "max": 5, "text": "Look at that boundary: a smooth ring hugging the good-parts island. No equation was fitted — the data itself drew this shape.", "tone": "info" },
        { "max": 11, "text": "Even as k rises the ring survives for a while — with enough local data, KNN's flexibility is robust.", "tone": "info" },
        { "max": 17, "text": "🤯 Push far enough and even here the ring drowns. But in its working range, KNN drew a boundary a linear model could NEVER draw, using zero training time. Know your tool's home turf.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "KNN's sweet spot", "formula": "small n + few good features + curvy boundary + relaxed latency = KNN territory", "text": "Every algorithm has a habitat. KNN thrives on small, clean, low-dimensional problems with complex boundaries — and suffers everywhere its costs (per-query work, memory, dimensionality) compound." }
    }
  },
  {
    "q": "Your KNN reports 90% accuracy on data that is 90% 'normal' and 10% 'fraud'. Before celebrating, you should compare that score against…",
    "choices": [
      "The always-'normal' baseline",
      "A fair coin flip (50%)",
      "A human expert's accuracy",
      "Its own training accuracy",
      "Last year's model"
    ],
    "explain": "Accuracy is judged against the majority-class baseline. On 90/10 data, 90% is the score of the laziest possible model; the interesting question is performance on the 10%.",
    "simple": "If 90% of the data is 'normal', a rock that always says 'normal' also scores 90%. The real test is beating that do-nothing baseline — not the raw score.",
    "widget": {
      "type": "scatterK",
      "title": "The lazy genius",
      "world": "10 repaid, 2 defaulted — and a new applicant right among the defaulters. Crank k to the top and meet the '90% accurate' model.",
      "classes": [
        "Repaid",
        "Defaulted"
      ],
      "xlab": "debt ratio",
      "ylab": "missed payments",
      "points": [
        { "x": 1.6, "y": 1.4, "c": 0 },
        { "x": 2.8, "y": 2.2, "c": 0 },
        { "x": 2, "y": 3.4, "c": 0 },
        { "x": 3.4, "y": 1, "c": 0 },
        { "x": 1, "y": 2.6, "c": 0 },
        { "x": 4, "y": 2.8, "c": 0 },
        { "x": 3, "y": 4.2, "c": 0 },
        { "x": 4.6, "y": 1.8, "c": 0 },
        { "x": 2.4, "y": 5, "c": 0 },
        { "x": 5, "y": 3.6, "c": 0 },
        { "x": 8, "y": 7.6, "c": 1 },
        { "x": 8.8, "y": 8.6, "c": 1 }
      ],
      "query": { "x": 8.4, "y": 8 },
      "knob": { "label": "Neighbours asked (k)", "min": 1, "max": 12, "step": 1, "init": 1 },
      "insights": [
        { "max": 3, "text": "Small k: the applicant is correctly flagged as default-risk — the two orange cases are their obvious twins.", "tone": "info" },
        { "max": 8, "text": "The blue majority is flooding in. Notice the verdict flip — and realise this model will now say \"repaid\" for EVERYONE, everywhere.", "tone": "warn" },
        { "max": 12, "text": "🤯 At max k this model gets 10 of 12 training cases \"right\" (83%) while being USELESS — it's just the majority-class answering machine. High accuracy, zero insight. Always compare against the do-nothing baseline.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "The majority-class baseline", "formula": "baseline accuracy = share of the biggest class — beat THIS, not 50%", "text": "On imbalanced problems, accuracy flatters lazy models. Check the baseline, then look at per-class metrics (recall on the rare class) — the fraud you catch matters more than the normals you wave through." }
    }
  }
];
