/* Random Forests & Bagging — Parts I & II. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).rf1 = [
  {
    "q": "Five models each score 86% alone, yet their combined vote scores 91%. What single condition made that possible?",
    "choices": [
      "They make DIFFERENT mistakes, so the majority corrects each one",
      "They were trained for longer together",
      "They share the same weights",
      "One of them secretly scores 91%",
      "Voting always adds five points"
    ],
    "explain": "Ensembles profit from error diversity: if members are wrong on different cases, each mistake gets outvoted. Five clones of one model gain nothing — they repeat the same errors in chorus.",
    "simple": "Ask five friends who err in DIFFERENT ways, and the group fixes each person's blind spot. Ask one friend five times and you just get his blind spot louder. Diversity of mistakes — not individual brilliance — is the fuel of every ensemble.",
    "widget": {
      "type": "curveStatic",
      "title": "Diverse voices vs an echo chamber",
      "world": "Two committees grow member by member: one adds DIVERSE models, the other adds near-clones of the same model. Same individual skill — watch the gap open.",
      "xlab": "committee size",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "1",
        "3",
        "5",
        "9",
        "15"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "diverse members", "ys": [ 86, 89, 91, 92, 92.5 ] },
        { "name": "near-clones", "ys": [ 86, 86.4, 86.6, 86.7, 86.7 ] }
      ],
      "knob": { "label": "Committee size", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "One member each: identical skill, 86%. Everything that happens next is about HOW they differ, not how good they are.", "tone": "info" },
        { "max": 2, "text": "The diverse committee climbs — each member's errors get outvoted by colleagues who happen to be right there. The clones barely move: same errors, louder.", "tone": "info" },
        { "max": 4, "text": "🤯 Fifteen members: +6.5 points for diversity, +0.7 for the echo chamber. The entire field of ensembling is engineering DISAGREEMENT between accurate models.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Error decorrelation", "formula": "ensemble gain ∝ member accuracy × error diversity", "text": "The one law under every method in this topic. Bagging, forests, boosting and stacking are just four different ways of manufacturing useful disagreement." }
    }
  },
  {
    "q": "Bagging trains each model on a 'bootstrap sample': n rows drawn from the n training rows WITH replacement. What does one such sample look like?",
    "choices": [
      "Some rows repeated, and roughly a third left out entirely",
      "The exact original data, reshuffled",
      "Half the rows, each used once",
      "Only the hardest rows",
      "All rows plus synthetic ones"
    ],
    "explain": "Drawing n times with replacement picks some rows twice or thrice and misses others — about 37% of rows never get drawn (the limit is 1/e). Every model sees a different, overlapping version of the data.",
    "simple": "Imagine refilling a bag of 100 marbles after every draw, drawing 100 times. Some marbles come out three times, and about 37 never come out at all. Each model trains on its own lumpy version of reality — that's where their disagreement comes from.",
    "widget": {
      "type": "curveStatic",
      "title": "The lumpy sample",
      "world": "Drawing from 100 rows with replacement. Watch how many UNIQUE rows the sample has captured as the draws mount — and where the curve stalls.",
      "xlab": "draws made (out of 100)",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "labels": [
        "10",
        "25",
        "50",
        "75",
        "100",
        "150"
      ],
      "dec": 0,
      "yunit": " unique rows",
      "series": [
        { "name": "unique rows captured", "ys": [ 10, 22, 39, 53, 63, 78 ] },
        { "name": "if drawn WITHOUT replacement", "ys": [ 10, 25, 50, 75, 100, 100 ] }
      ],
      "knob": { "label": "Draws made", "min": 0, "max": 5, "step": 1, "init": 0 },
      "insights": [
        { "max": 2, "text": "With replacement, duplicates start early — 50 draws have only captured 39 distinct rows. The repeats are features, not bugs: they re-weight the data randomly.", "tone": "info" },
        { "max": 4, "text": "🤯 A full n = 100 draws captures only ~63 unique rows. The other ~37 were never seen by this model — remember that number, it's about to become useful.", "tone": "wow" },
        { "max": 5, "text": "Even 150 draws can't reach everyone. Each bootstrap sample is a genuinely different world, which is exactly what makes each trained model genuinely different.", "tone": "info" }
      ],
      "extreme": { "at": 4 },
      "reveal": { "name": "Bootstrap sampling", "formula": "n draws with replacement → E[unique] = n(1 − 1/e) ≈ 63% of rows", "text": "The randomness engine of bagging. Cheap, principled variation: every member model gets its own re-weighted view of the same dataset." }
    }
  },
  {
    "q": "Bagging: many trees, each trained on its own bootstrap sample, votes averaged. Which weakness of single trees is this aimed squarely at?",
    "choices": [
      "Their instability — averaging cancels each tree's jumpy quirks",
      "Their axis-aligned splits",
      "Their need for scaled features",
      "Their slow training",
      "Their inability to fit noise"
    ],
    "explain": "Single deep trees are high-variance: tiny data changes rebuild them. Bagging embraces that — each bootstrapped tree is differently wrong, and the average is steadier than any member.",
    "simple": "One deep tree is a jumpy expert. Bagging hires thirty jumpy experts, gives each a slightly different casefile, and takes the room's vote. The jumpiness — the thing that made one tree unreliable — becomes raw material for a calm committee.",
    "widget": {
      "type": "forestMap",
      "title": "Watch the committee calm down",
      "world": "A real bagged forest, grown live: each tree trains on its own bootstrap sample of these points. Slide the tree count from a lone tree to a full committee and watch the map's mood.",
      "classes": [
        "Type A",
        "Type B"
      ],
      "xlab": "sensor 1",
      "ylab": "sensor 2",
      "depth": 4,
      "seed": 7,
      "maxTrees": 25,
      "points": [
        { "x": 1.5, "y": 2, "c": 0 },
        { "x": 2.5, "y": 3.5, "c": 0 },
        { "x": 1.2, "y": 5, "c": 0 },
        { "x": 3, "y": 6, "c": 0 },
        { "x": 2, "y": 7.5, "c": 0 },
        { "x": 4, "y": 1.5, "c": 0 },
        { "x": 3.4, "y": 4.4, "c": 0 },
        { "x": 7, "y": 2.5, "c": 1 },
        { "x": 8.5, "y": 3.5, "c": 1 },
        { "x": 6.5, "y": 4.5, "c": 1 },
        { "x": 8, "y": 6, "c": 1 },
        { "x": 9, "y": 7.5, "c": 1 },
        { "x": 5.5, "y": 5.5, "c": 1 },
        { "x": 6.2, "y": 8, "c": 1 },
        { "x": 2.8, "y": 8.6, "c": 1 },
        { "x": 7.6, "y": 1, "c": 0 }
      ],
      "knob": { "label": "Trees in the committee", "min": 1, "max": 25, "step": 1, "init": 1 },
      "insights": [
        { "max": 2, "text": "One or two trees: hard-edged, opinionated territory — including confident claims around the noisy points. Classic single-tree behaviour.", "tone": "warn" },
        { "max": 18, "text": "The shading is softening: where trees disagree, the map hedges. Disagreement between members literally becomes uncertainty in the output.", "tone": "info" },
        { "max": 25, "text": "🤯 A full committee: smooth, calm borders, and the noisy points no longer own private kingdoms — most trees never saw them, and the rest get outvoted. Variance averaged away, live.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Bagging (bootstrap aggregating)", "formula": "B trees on B bootstrap samples → average / majority vote", "text": "Turn one unstable learner into many and let the average do the stabilising. Works best on high-variance models — which is why trees are the classic ingredient." }
    }
  },
  {
    "q": "Each bagged tree never saw ~37% of the rows. Those left-out rows enable a famous free lunch. Which?",
    "choices": [
      "Out-of-bag evaluation — honest scoring without a held-out set",
      "Free extra training data",
      "Automatic feature scaling",
      "A guaranteed accuracy boost",
      "Faster prediction"
    ],
    "explain": "For every row, some trees never trained on it — so their vote on that row is an honest, unseen-data prediction. Score every row using only its non-training trees: a built-in validation estimate.",
    "simple": "Every row has a jury of trees that never studied it. Ask only THAT jury to judge the row, and you get an unbiased test — for the whole dataset, without setting aside a single row. Free honesty, courtesy of the bootstrap's leftovers.",
    "widget": {
      "type": "curveStatic",
      "title": "The free validation set",
      "world": "The forest's out-of-bag score tracked against a real held-out test set as trees are added. Watch how closely the free estimate shadows the expensive one.",
      "xlab": "trees in the forest",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "5",
        "10",
        "25",
        "50",
        "100"
      ],
      "dec": 1,
      "yunit": "%",
      "series": [
        { "name": "out-of-bag estimate", "ys": [ 81.5, 84, 86.5, 87.5, 87.8 ] },
        { "name": "true held-out test", "ys": [ 82.5, 84.5, 86.8, 87.6, 87.9 ] }
      ],
      "knob": { "label": "Trees in the forest", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "With few trees, each row's 'unseen jury' is small, so the OOB estimate is a little noisy — but already close to the truth.", "tone": "info" },
        { "max": 3, "text": "The two curves are nearly on top of each other. The OOB score is doing a held-out test's job using zero held-out data.", "tone": "info" },
        { "max": 4, "text": "🤯 Final gap: 0.1 points. When data is scarce, OOB means you don't have to sacrifice rows for validation at all — a genuinely free lunch, one of very few in ML.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Out-of-bag (OOB) evaluation", "formula": "score each row using only the trees that never trained on it", "text": "sklearn: oob_score=True. The bootstrap's 37% leftovers, recycled into an honest validation estimate — bagging's elegant bonus." }
    }
  },
  {
    "q": "A random forest goes one step beyond bagging: at every split, each tree may only consider a RANDOM SUBSET of the features. Why add that?",
    "choices": [
      "To decorrelate the trees — otherwise they all lean on the same strong feature",
      "To make each tree train faster only",
      "To remove the need for bootstrapping",
      "To guarantee deeper trees",
      "To make the forest deterministic"
    ],
    "explain": "With all features available, every bagged tree grabs the same dominant feature at the root — the trees end up near-clones, and averaging clones gains little. Restricting each split's menu forces genuinely different trees.",
    "simple": "If every chef gets the whole pantry, they all cook the same signature dish. Hand each a random half of the pantry and you get real variety. The forest deliberately handicaps its trees to make them disagree — because disagreement is what averaging feeds on.",
    "widget": {
      "type": "curveStatic",
      "title": "Handicapped chefs, better banquet",
      "world": "Two forests of identical size: one where trees see all features (plain bagging), one with random feature subsets per split (random forest). Compare as members join.",
      "xlab": "trees",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "5",
        "10",
        "25",
        "50",
        "100"
      ],
      "dec": 1,
      "yunit": "%",
      "series": [
        { "name": "random feature subsets", "ys": [ 83, 85.5, 87.5, 88.5, 89 ] },
        { "name": "all features every split", "ys": [ 83.5, 84.5, 85.5, 86, 86.2 ] }
      ],
      "knob": { "label": "Trees", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "At five trees the plain-bagging forest is slightly AHEAD — each of its trees is individually stronger. Watch what matters more in the long run.", "tone": "info" },
        { "max": 2, "text": "The feature-restricted forest overtakes: its trees are individually weaker but collectively more diverse, and diversity compounds with size.", "tone": "info" },
        { "max": 4, "text": "🤯 At 100 trees: +2.8 for the handicapped chefs. Deliberately weakening members to strengthen the committee — the counterintuitive heart of random forests.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Random forests", "formula": "bagging + max_features (e.g. √d per split) → decorrelated trees", "text": "Breiman's insight: bagging's ceiling is member correlation. Randomising the feature menu smashes that ceiling — and made forests a default model for a decade." }
    }
  }
];

(window.QUESTIONS = window.QUESTIONS || {}).rf2 = [
  {
    "q": "A random forest reports feature importances: income 0.41, age 0.22, postcode-ID 0.19… What is that impurity-based number actually measuring?",
    "choices": [
      "How much each feature's splits reduced impurity across the forest",
      "Each feature's correlation with the label",
      "The order features appear in the data",
      "How expensive each feature is to collect",
      "Each feature's units and scale"
    ],
    "explain": "Every split credits its impurity reduction to the feature it used; sum over all splits in all trees and normalise. Useful — but biased toward high-cardinality features and blind to redundancy.",
    "simple": "Each time a feature makes a useful cut, it earns points for the mess it cleaned up. The importance score is each feature's career total. Read it as 'who did the work in THIS forest' — not as a certified truth about the world.",
    "widget": {
      "type": "curveStatic",
      "title": "Who did the cleaning?",
      "world": "Career totals for five features in one forest — alongside what a fairer method (permutation on validation data) says. Note where the two rankings disagree, and which feature is suspicious.",
      "xlab": "feature",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "income",
        "age",
        "postcode-ID",
        "tenure",
        "random noise"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "impurity-based importance", "ys": [ 34, 22, 24, 15, 5 ] },
        { "name": "permutation importance", "ys": [ 38, 25, 6, 19, 0 ] }
      ],
      "knob": { "label": "Feature", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Income and age: both methods agree — genuinely useful features look useful under any light.", "tone": "info" },
        { "max": 2, "text": "🤯 Postcode-ID: impurity says 24%, permutation says 6%. High-cardinality ID-like columns offer thousands of split points, so impurity over-credits them — a known bias.", "tone": "wow" },
        { "max": 4, "text": "The random-noise column scores 5% by impurity but 0% by permutation. When importances drive decisions, cross-examine them with a second method.", "tone": "warn" }
      ],
      "extreme": { "at": 2 },
      "reveal": { "name": "Feature importance (and its bias)", "formula": "impurity importance = Σ impurity reductions · verify with permutation importance", "text": "Forest importances are a quick x-ray, not a verdict. Permutation importance — shuffle a feature, watch validation drop — is the honest cross-check." }
    }
  },
  {
    "q": "max_features controls how many features each split may consider. Sweep it from 1 to all 8 on a random forest — what is this knob really trading?",
    "choices": [
      "Tree diversity vs individual tree strength — fewer features per split decorrelates the trees, until they get too weak",
      "Training speed vs memory",
      "Depth vs number of trees",
      "Precision vs recall",
      "Bias of the bootstrap vs its variance"
    ],
    "explain": "Give every split all features and every tree grabs the same dominant predictors — strong trees, but near-clones whose shared mistakes survive the vote. Restrict each split to a random few and trees are forced down different routes: individually weaker, collectively stronger. sqrt(n_features) is the classification default for good reason.",
    "simple": "A committee only beats its best member if the members think DIFFERENTLY. Letting every tree use every feature builds eight copies of the same expert — averaging clones changes nothing. Rationing the features forces each tree to develop its own perspective. Ration too hard, though, and you get a committee of people guessing. Slide to feel both cliffs.",
    "widget": {
      "type": "curveStatic",
      "title": "A committee of clones is one person",
      "world": "The same forest retrained at five values of max_features (8 features total). Watch tree-to-tree correlation climb with the feature budget — and where the forest's accuracy actually peaks.",
      "xlab": "max_features per split →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "1",
        "3 (sqrt)",
        "5",
        "7",
        "8 (all)"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "forest validation accuracy", "ys": [ 86, 91, 89, 87, 84 ] },
        { "name": "tree-to-tree correlation", "ys": [ 22, 45, 61, 74, 92 ] }
      ],
      "knob": { "label": "max_features", "min": 0, "max": 4, "step": 1, "init": 4 },
      "insights": [
        { "max": 0, "text": "One random feature per split: trees are wonderfully diverse (22% correlation) but each is nearly guessing — diversity with nothing worth averaging.", "tone": "warn" },
        { "max": 1, "text": "sqrt(8)≈3: the classic default, and the peak. Trees are decent AND different — the vote cancels their disagreements and keeps the shared signal.", "tone": "info" },
        { "max": 4, "text": "🤯 All 8 features: 92% correlation — the 'forest' is basically one tree photocopied. Averaging clones cancels nothing, and accuracy sags to near single-tree level. The knob was never about strength; it was about disagreement.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "max_features (the decorrelation knob)", "formula": "ensemble error ↓ when trees are accurate AND uncorrelated", "text": "Defaults: sqrt(n_features) for classification, ~n/3 or 1.0 for regression. If your forest barely beats one tree, correlation — not tree quality — is usually the culprit." }
    }
  },
  {
    "q": "ExtraTrees ('extremely randomized trees') looks like a random forest with the dials turned further. What exactly does it randomise that a random forest doesn't?",
    "choices": [
      "The split THRESHOLDS — cut points are drawn at random instead of optimised, making trees faster to grow and even less correlated",
      "The class labels during training",
      "The number of trees per prediction",
      "The loss function per tree",
      "The test set for each tree"
    ],
    "explain": "A random forest still searches for the best threshold on each candidate feature. ExtraTrees skips that search: it draws a random cut point per feature and keeps the best of those few random cuts (and by default grows each tree on the full dataset, no bootstrap). Result: much cheaper splits, higher randomness, often comparable accuracy — sometimes better on noisy data.",
    "simple": "A random forest rations WHICH questions a tree may ask, but still lets it fine-tune the wording. ExtraTrees also randomises the wording: 'income < 43,182?' isn't optimised, it's rolled. Sloppier individual questions, but the sloppiness is different in every tree — and the vote launders it away, at a fraction of the training cost.",
    "widget": {
      "type": "curveStatic",
      "title": "Sloppy questions, honest committee",
      "world": "Random forest vs ExtraTrees vs a single tuned tree, as label noise is added to the training data. Same features, same tree counts — only the split-choosing habit differs.",
      "xlab": "label noise in training data →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "none",
        "5%",
        "10%",
        "20%",
        "30%"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "ExtraTrees", "ys": [ 91, 89, 87, 83, 78 ] },
        { "name": "random forest", "ys": [ 92, 89, 86, 81, 75 ] },
        { "name": "one tuned tree", "ys": [ 87, 82, 76, 68, 60 ] }
      ],
      "knob": { "label": "Label noise", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Clean data: the forest's optimised splits edge ahead by a point. Optimising cut points helps a little when the data can be trusted.", "tone": "info" },
        { "max": 2, "text": "Add noise and the ranking flips: optimised thresholds lock onto noisy artefacts, while ExtraTrees' random cuts never trusted any exact boundary in the first place.", "tone": "info" },
        { "max": 4, "text": "🤯 At heavy noise ExtraTrees leads the forest by 3 points — and it trained ~3× faster, because 'pick a random threshold' costs nothing. Extra randomness is a regulariser you get PAID to use.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "ExtraTrees (extremely randomized trees)", "formula": "random thresholds + (usually) no bootstrap → cheaper, less correlated trees", "text": "sklearn: ExtraTreesClassifier/Regressor. Try it whenever you'd try a random forest — especially with noisy features or a training-time budget." }
    }
  },
  {
    "q": "A random forest REGRESSOR predicts house prices. Each tree is a staircase of flat steps — so what does averaging 300 of them produce, and which tree limitation survives the averaging?",
    "choices": [
      "A much smoother curve — but still flat beyond the training range, because every tree still predicts leaf averages",
      "A perfectly smooth line with full extrapolation",
      "A staircase identical to one tree's",
      "A curve that oscillates wildly",
      "A straight line through the mean"
    ],
    "explain": "Each tree's step edges land in different places (different bootstraps, different features), so their average blurs into a near-smooth curve — one of bagging's quiet gifts. But every tree's output is still an average of training targets, so outside the seen range all 300 staircases go flat at once. Smoothing is fixed by averaging; extrapolation is not.",
    "simple": "One staircase is jagged. Lay 300 staircases on top of each other, each with its steps in slightly different places, and the average looks like a ramp — lovely. But ask all 300 about a mansion bigger than anything they trained on and they all shrug the same shrug: 'biggest bin I have says £520k'. Averaging shrugs still gives a shrug.",
    "widget": {
      "type": "curveStatic",
      "title": "300 staircases and one shared shrug",
      "world": "True price trend vs one tree vs the 300-tree forest, across floor area. Training data ran out at 2,000 sqft — keep sliding past it.",
      "xlab": "floor area (sqft) →",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
      ],
      "labels": [
        "500",
        "750",
        "1000",
        "1250",
        "1500",
        "1750",
        "2000",
        "2250",
        "2500"
      ],
      "dec": 0,
      "yunit": "k",
      "series": [
        { "name": "true trend (£k)", "ys": [ 95, 120, 145, 170, 195, 215, 232, 248, 262 ] },
        { "name": "forest average (£k)", "ys": [ 99, 118, 143, 168, 193, 213, 228, 231, 231 ] },
        { "name": "single tree (£k)", "ys": [ 110, 110, 168, 168, 168, 235, 235, 235, 235 ] }
      ],
      "knob": { "label": "House's floor area", "min": 0, "max": 8, "step": 1, "init": 0 },
      "insights": [
        { "max": 3, "text": "Inside the training range the forest hugs the trend — each tree's step edges land differently, and the average irons the staircase nearly flat.", "tone": "info" },
        { "max": 6, "text": "Approaching 2,000 sqft (the biggest training house), the forest still tracks. Every prediction so far was an interpolation between seen examples.", "tone": "info" },
        { "max": 8, "text": "🤯 Past 2,000 sqft the forest flatlines at 231 while reality climbs — all 300 trees hit their outermost leaf together. Averaging fixed the JAGGEDNESS, not the architecture: leaf means cannot exceed seen values. XGBoost inherits the same ceiling.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Forest regression = averaged staircases", "formula": "smooth inside the training range · constant outside it", "text": "Bagging fixes variance (jaggedness), never structural bias (no extrapolation). For trending targets, detrend first or use a model with a slope." }
    }
  },
  {
    "q": "Same tabular dataset, two strong candidates: random forest or gradient boosting. What's the honest one-line decision guide between them?",
    "choices": [
      "RF = robust with almost no tuning and parallel training; boosting = higher ceiling but needs careful tuning and overfits more easily",
      "Boosting is better in every respect",
      "RF is better in every respect",
      "RF for regression, boosting for classification",
      "They always produce identical results"
    ],
    "explain": "RF's trees are independent — train them in parallel, defaults barely need touching, extra trees never overfit. Boosting's trees are sequential correctors — the accuracy ceiling is usually higher (it reduces bias AND variance), but learning rate, depth, rounds and regularisation interact, and it will happily chase noise if you let it. Common play: RF as the day-one baseline, tuned boosting when the last points matter.",
    "simple": "The forest is a committee of independents: hire them all at once, no coordination needed, very hard to embarrass. Boosting is a relay of specialists, each fixing the previous one's mistakes: better peak performance, but the relay needs choreography, and a specialist chasing mistakes will also chase noise. Deadline tomorrow → forest. Leaderboard → boosting.",
    "widget": {
      "type": "curveStatic",
      "title": "Committee vs relay",
      "world": "Both models scored 0–100 on five practical criteria. Slide across the criteria — neither line stays on top the whole way, and WHERE they cross is the decision guide.",
      "xlab": "criterion →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "works untuned",
        "noise robustness",
        "parallel training",
        "peak accuracy",
        "safe to overtrain"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "random forest", "ys": [ 90, 88, 95, 82, 88 ] },
        { "name": "gradient boosting", "ys": [ 45, 68, 35, 93, 55 ] }
      ],
      "knob": { "label": "Criterion", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Untuned, out of the box: the forest scores 90. Boosting with default knobs is routinely mediocre — its power is locked behind tuning.", "tone": "info" },
        { "max": 2, "text": "Parallel training: forest trees don't depend on each other; boosting's round N needs round N−1 finished. On big data that's hours vs coffee-break.", "tone": "info" },
        { "max": 4, "text": "🤯 Peak accuracy is boosting's column (93 vs 82) — sequential error-correction reduces bias in a way averaging independent trees cannot. But 'safe to overtrain' flips back: more forest trees never hurt, more boosting rounds eventually memorise noise. Two tools, not one winner.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "RF vs gradient boosting", "formula": "RF: variance ↓ via averaging · boosting: bias ↓ via sequential correction", "text": "Start with RF for a robust baseline; reach for tuned boosting (XGBoost/LightGBM) when accuracy is worth the tuning budget. On tabular data these two remain the champions to beat." }
    }
  }
];
