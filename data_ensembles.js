/* Ensemble Methods — Part I: Foundations. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).ens1 = [

{
  q: "Five models each score 86% alone, yet their combined vote scores 91%. What single condition made that possible?",
  choices: ["They make DIFFERENT mistakes, so the majority corrects each one", "They were trained for longer together", "They share the same weights", "One of them secretly scores 91%", "Voting always adds five points"],
  explain: "Ensembles profit from error diversity: if members are wrong on different cases, each mistake gets outvoted. Five clones of one model gain nothing — they repeat the same errors in chorus.",
  simple: "Ask five friends who err in DIFFERENT ways, and the group fixes each person's blind spot. Ask one friend five times and you just get his blind spot louder. Diversity of mistakes — not individual brilliance — is the fuel of every ensemble.",
  widget: {
    type: "curveStatic", title: "Diverse voices vs an echo chamber",
    world: "Two committees grow member by member: one adds DIVERSE models, the other adds near-clones of the same model. Same individual skill — watch the gap open.",
    xlab: "committee size", xs: [0,1,2,3,4], labels: ["1","3","5","9","15"], dec: 0, yunit: "%",
    series: [
      { name: "diverse members", ys: [86,89,91,92,92.5] },
      { name: "near-clones", ys: [86,86.4,86.6,86.7,86.7] }
    ],
    knob: { label: "Committee size", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "One member each: identical skill, 86%. Everything that happens next is about HOW they differ, not how good they are.", tone: "info" },
      { max: 2, text: "The diverse committee climbs — each member's errors get outvoted by colleagues who happen to be right there. The clones barely move: same errors, louder.", tone: "info" },
      { max: 4, text: "🤯 Fifteen members: +6.5 points for diversity, +0.7 for the echo chamber. The entire field of ensembling is engineering DISAGREEMENT between accurate models.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Error decorrelation", formula: "ensemble gain ∝ member accuracy × error diversity",
      text: "The one law under every method in this topic. Bagging, forests, boosting and stacking are just four different ways of manufacturing useful disagreement." }
  }
},

{
  q: "Bagging trains each model on a 'bootstrap sample': n rows drawn from the n training rows WITH replacement. What does one such sample look like?",
  choices: ["Some rows repeated, and roughly a third left out entirely", "The exact original data, reshuffled", "Half the rows, each used once", "Only the hardest rows", "All rows plus synthetic ones"],
  explain: "Drawing n times with replacement picks some rows twice or thrice and misses others — about 37% of rows never get drawn (the limit is 1/e). Every model sees a different, overlapping version of the data.",
  simple: "Imagine refilling a bag of 100 marbles after every draw, drawing 100 times. Some marbles come out three times, and about 37 never come out at all. Each model trains on its own lumpy version of reality — that's where their disagreement comes from.",
  widget: {
    type: "curveStatic", title: "The lumpy sample",
    world: "Drawing from 100 rows with replacement. Watch how many UNIQUE rows the sample has captured as the draws mount — and where the curve stalls.",
    xlab: "draws made (out of 100)", xs: [0,1,2,3,4,5], labels: ["10","25","50","75","100","150"], dec: 0, yunit: " unique rows",
    series: [
      { name: "unique rows captured", ys: [10,22,39,53,63,78] },
      { name: "if drawn WITHOUT replacement", ys: [10,25,50,75,100,100] }
    ],
    knob: { label: "Draws made", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 2, text: "With replacement, duplicates start early — 50 draws have only captured 39 distinct rows. The repeats are features, not bugs: they re-weight the data randomly.", tone: "info" },
      { max: 4, text: "🤯 A full n = 100 draws captures only ~63 unique rows. The other ~37 were never seen by this model — remember that number, it's about to become useful.", tone: "wow" },
      { max: 5, text: "Even 150 draws can't reach everyone. Each bootstrap sample is a genuinely different world, which is exactly what makes each trained model genuinely different.", tone: "info" }
    ],
    extreme: { at: 4 },
    reveal: { name: "Bootstrap sampling", formula: "n draws with replacement → E[unique] = n(1 − 1/e) ≈ 63% of rows",
      text: "The randomness engine of bagging. Cheap, principled variation: every member model gets its own re-weighted view of the same dataset." }
  }
},

{
  q: "Bagging: many trees, each trained on its own bootstrap sample, votes averaged. Which weakness of single trees is this aimed squarely at?",
  choices: ["Their instability — averaging cancels each tree's jumpy quirks", "Their axis-aligned splits", "Their need for scaled features", "Their slow training", "Their inability to fit noise"],
  explain: "Single deep trees are high-variance: tiny data changes rebuild them. Bagging embraces that — each bootstrapped tree is differently wrong, and the average is steadier than any member.",
  simple: "One deep tree is a jumpy expert. Bagging hires thirty jumpy experts, gives each a slightly different casefile, and takes the room's vote. The jumpiness — the thing that made one tree unreliable — becomes raw material for a calm committee.",
  widget: {
    type: "forestMap", title: "Watch the committee calm down",
    world: "A real bagged forest, grown live: each tree trains on its own bootstrap sample of these points. Slide the tree count from a lone tree to a full committee and watch the map's mood.",
    classes: ["Type A", "Type B"], xlab: "sensor 1", ylab: "sensor 2", depth: 4, seed: 7, maxTrees: 25,
    points: [{x:1.5,y:2,c:0},{x:2.5,y:3.5,c:0},{x:1.2,y:5,c:0},{x:3,y:6,c:0},{x:2,y:7.5,c:0},{x:4,y:1.5,c:0},{x:3.4,y:4.4,c:0},{x:7,y:2.5,c:1},{x:8.5,y:3.5,c:1},{x:6.5,y:4.5,c:1},{x:8,y:6,c:1},{x:9,y:7.5,c:1},{x:5.5,y:5.5,c:1},{x:6.2,y:8,c:1},{x:2.8,y:8.6,c:1},{x:7.6,y:1,c:0}],
    knob: { label: "Trees in the committee", min: 1, max: 25, step: 1, init: 1 },
    insights: [
      { max: 2, text: "One or two trees: hard-edged, opinionated territory — including confident claims around the noisy points. Classic single-tree behaviour.", tone: "warn" },
      { max: 18, text: "The shading is softening: where trees disagree, the map hedges. Disagreement between members literally becomes uncertainty in the output.", tone: "info" },
      { max: 25, text: "🤯 A full committee: smooth, calm borders, and the noisy points no longer own private kingdoms — most trees never saw them, and the rest get outvoted. Variance averaged away, live.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Bagging (bootstrap aggregating)", formula: "B trees on B bootstrap samples → average / majority vote",
      text: "Turn one unstable learner into many and let the average do the stabilising. Works best on high-variance models — which is why trees are the classic ingredient." }
  }
},

{
  q: "Each bagged tree never saw ~37% of the rows. Those left-out rows enable a famous free lunch. Which?",
  choices: ["Out-of-bag evaluation — honest scoring without a held-out set", "Free extra training data", "Automatic feature scaling", "A guaranteed accuracy boost", "Faster prediction"],
  explain: "For every row, some trees never trained on it — so their vote on that row is an honest, unseen-data prediction. Score every row using only its non-training trees: a built-in validation estimate.",
  simple: "Every row has a jury of trees that never studied it. Ask only THAT jury to judge the row, and you get an unbiased test — for the whole dataset, without setting aside a single row. Free honesty, courtesy of the bootstrap's leftovers.",
  widget: {
    type: "curveStatic", title: "The free validation set",
    world: "The forest's out-of-bag score tracked against a real held-out test set as trees are added. Watch how closely the free estimate shadows the expensive one.",
    xlab: "trees in the forest", xs: [0,1,2,3,4], labels: ["5","10","25","50","100"], dec: 1, yunit: "%",
    series: [
      { name: "out-of-bag estimate", ys: [81.5,84,86.5,87.5,87.8] },
      { name: "true held-out test", ys: [82.5,84.5,86.8,87.6,87.9] }
    ],
    knob: { label: "Trees in the forest", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "With few trees, each row's 'unseen jury' is small, so the OOB estimate is a little noisy — but already close to the truth.", tone: "info" },
      { max: 3, text: "The two curves are nearly on top of each other. The OOB score is doing a held-out test's job using zero held-out data.", tone: "info" },
      { max: 4, text: "🤯 Final gap: 0.1 points. When data is scarce, OOB means you don't have to sacrifice rows for validation at all — a genuinely free lunch, one of very few in ML.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Out-of-bag (OOB) evaluation", formula: "score each row using only the trees that never trained on it",
      text: "sklearn: oob_score=True. The bootstrap's 37% leftovers, recycled into an honest validation estimate — bagging's elegant bonus." }
  }
},

{
  q: "A random forest goes one step beyond bagging: at every split, each tree may only consider a RANDOM SUBSET of the features. Why add that?",
  choices: ["To decorrelate the trees — otherwise they all lean on the same strong feature", "To make each tree train faster only", "To remove the need for bootstrapping", "To guarantee deeper trees", "To make the forest deterministic"],
  explain: "With all features available, every bagged tree grabs the same dominant feature at the root — the trees end up near-clones, and averaging clones gains little. Restricting each split's menu forces genuinely different trees.",
  simple: "If every chef gets the whole pantry, they all cook the same signature dish. Hand each a random half of the pantry and you get real variety. The forest deliberately handicaps its trees to make them disagree — because disagreement is what averaging feeds on.",
  widget: {
    type: "curveStatic", title: "Handicapped chefs, better banquet",
    world: "Two forests of identical size: one where trees see all features (plain bagging), one with random feature subsets per split (random forest). Compare as members join.",
    xlab: "trees", xs: [0,1,2,3,4], labels: ["5","10","25","50","100"], dec: 1, yunit: "%",
    series: [
      { name: "random feature subsets", ys: [83,85.5,87.5,88.5,89] },
      { name: "all features every split", ys: [83.5,84.5,85.5,86,86.2] }
    ],
    knob: { label: "Trees", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "At five trees the plain-bagging forest is slightly AHEAD — each of its trees is individually stronger. Watch what matters more in the long run.", tone: "info" },
      { max: 2, text: "The feature-restricted forest overtakes: its trees are individually weaker but collectively more diverse, and diversity compounds with size.", tone: "info" },
      { max: 4, text: "🤯 At 100 trees: +2.8 for the handicapped chefs. Deliberately weakening members to strengthen the committee — the counterintuitive heart of random forests.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Random forests", formula: "bagging + max_features (e.g. √d per split) → decorrelated trees",
      text: "Breiman's insight: bagging's ceiling is member correlation. Randomising the feature menu smashes that ceiling — and made forests a default model for a decade." }
  }
},

{
  q: "A random forest reports feature importances: income 0.41, age 0.22, postcode-ID 0.19… What is that impurity-based number actually measuring?",
  choices: ["How much each feature's splits reduced impurity across the forest", "Each feature's correlation with the label", "The order features appear in the data", "How expensive each feature is to collect", "Each feature's units and scale"],
  explain: "Every split credits its impurity reduction to the feature it used; sum over all splits in all trees and normalise. Useful — but biased toward high-cardinality features and blind to redundancy.",
  simple: "Each time a feature makes a useful cut, it earns points for the mess it cleaned up. The importance score is each feature's career total. Read it as 'who did the work in THIS forest' — not as a certified truth about the world.",
  widget: {
    type: "curveStatic", title: "Who did the cleaning?",
    world: "Career totals for five features in one forest — alongside what a fairer method (permutation on validation data) says. Note where the two rankings disagree, and which feature is suspicious.",
    xlab: "feature", xs: [0,1,2,3,4], labels: ["income","age","postcode-ID","tenure","random noise"], dec: 0, yunit: "%",
    series: [
      { name: "impurity-based importance", ys: [34,22,24,15,5] },
      { name: "permutation importance", ys: [38,25,6,19,0] }
    ],
    knob: { label: "Feature", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Income and age: both methods agree — genuinely useful features look useful under any light.", tone: "info" },
      { max: 2, text: "🤯 Postcode-ID: impurity says 24%, permutation says 6%. High-cardinality ID-like columns offer thousands of split points, so impurity over-credits them — a known bias.", tone: "wow" },
      { max: 4, text: "The random-noise column scores 5% by impurity but 0% by permutation. When importances drive decisions, cross-examine them with a second method.", tone: "warn" }
    ],
    extreme: { at: 2 },
    reveal: { name: "Feature importance (and its bias)", formula: "impurity importance = Σ impurity reductions · verify with permutation importance",
      text: "Forest importances are a quick x-ray, not a verdict. Permutation importance — shuffle a feature, watch validation drop — is the honest cross-check." }
  }
},

{
  q: "Boosting also builds many models — but sequentially, not in parallel. What does each new member train to do?",
  choices: ["Fix the mistakes the ensemble is still making", "Fit a fresh random sample", "Copy the previous member", "Vote against the majority", "Compress the earlier members"],
  explain: "After each round, boosting looks at what the current ensemble still gets wrong and trains the next weak learner to target exactly those errors. Members are specialists in their predecessors' failures.",
  simple: "Bagging hires many independent generalists. Boosting hires a chain of specialists: the first does its best, the second studies ONLY what the first got wrong, the third mops up what's still wrong, and so on. The team is built mistake by mistake.",
  widget: {
    type: "boostFit", title: "The chain of specialists",
    world: "Live gradient boosting on house prices: each round fits a tiny stump to the CURRENT errors (red stalks) and adds it to the team. Start at zero rounds and build the ensemble yourself.",
    xlab: "house size", itemName: "sales", yunit: "£k", lr: 0.6, maxRounds: 12,
    points: [{x:0.6,y:118},{x:1.4,y:127},{x:2.2,y:140},{x:3,y:152},{x:3.8,y:158},{x:4.6,y:175},{x:5.4,y:198},{x:6.2,y:204},{x:7,y:222},{x:7.8,y:236},{x:8.6,y:248},{x:9.4,y:262}],
    knob: { label: "Boosting rounds", min: 0, max: 12, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Round zero: the ensemble is just the average — one flat guess. Look at the red error stalks: they're the next round's ENTIRE curriculum.", tone: "info" },
      { max: 9, text: "Each round adds one crude step exactly where the errors were largest. Watch the stalks shrink where the last stump landed.", tone: "info" },
      { max: 12, text: "🤯 A dozen crude stumps — each useless alone — have assembled into a smooth, accurate curve. Weak learners, chained through their errors, compound into a strong one.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Boosting", formula: "F_new = F_old + η · (weak learner fitted to current errors)",
      text: "Sequential error-chasing. Where bagging attacks variance with independence, boosting attacks bias with accumulation." }
  }
},

{
  q: "Bagging and boosting both combine many trees, yet they cure opposite diseases. Which pairing is right?",
  choices: ["Bagging fights variance (instability); boosting fights bias (weakness)", "Bagging fights bias; boosting fights variance", "Both fight only variance", "Both fight only bias", "Neither affects bias or variance"],
  explain: "Bagging averages many overfit (high-variance) models into stability. Boosting stacks many underfit (high-bias) weak learners into strength. Same ingredient — trees — pointed at opposite failure modes.",
  simple: "Bagging calms down experts who are too excitable: deep trees, averaged. Boosting builds up helpers who are too simple: stumps, accumulated. One removes wobble, the other removes weakness — remember which by what the members look like: deep for bagging, shallow for boosting.",
  widget: {
    type: "curveStatic", title: "Opposite medicines",
    world: "Validation accuracy as members join. Bagging starts from strong-but-jumpy deep trees; boosting starts from one pathetic stump. Watch the two growth stories.",
    xlab: "ensemble size", xs: [0,1,2,3,4,5], labels: ["1","5","10","25","50","100"], dec: 0, yunit: "%",
    series: [
      { name: "boosting (stumps)", ys: [62,74,80,86,89,90] },
      { name: "bagging (deep trees)", ys: [79,84,86,87,87.5,87.5] }
    ],
    knob: { label: "Ensemble size", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 0, text: "One member each: the deep tree (79%) crushes the lone stump (62%). Bagging starts strong; boosting starts embarrassing.", tone: "info" },
      { max: 3, text: "Boosting climbs relentlessly — each stump repairs the last one's bias. Bagging plateaus once the wobble is averaged out: variance can only be removed once.", tone: "info" },
      { max: 5, text: "🤯 Boosting overtakes and keeps going: accumulated corrections can reduce bias indefinitely (until they start fitting noise). Different diseases, different medicines, different growth curves.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Bagging vs boosting", formula: "bagging: parallel + deep trees → less variance · boosting: sequential + weak learners → less bias",
      text: "The two pillars of tree ensembling. Diagnose your model's disease first — wobbly or weak? — and the right ensemble follows." }
  }
},

{
  q: "In GRADIENT boosting specifically, what does each new tree get fitted to?",
  choices: ["The residuals — the gradient of the loss at current predictions", "A bootstrap sample of the labels", "The original labels, reweighted", "The previous tree's structure", "The features, sorted by importance"],
  explain: "For squared error, the loss gradient at each point IS the residual (actual − predicted). Fitting the next tree to residuals is doing gradient descent — in function space, one tree-shaped step at a time.",
  simple: "After each round, compute how far off you still are on every example — those leftover gaps are the residuals. The next tree's training targets ARE those gaps. Prediction by instalments: each tree pays off a bit more of the remaining debt.",
  widget: {
    type: "boostFit", title: "Paying off the residuals",
    world: "Delivery times vs distance. The red stalks are the residuals — the debt still owed on each point. Add rounds and watch the debt get paid down, largest bills first.",
    xlab: "delivery distance", itemName: "deliveries", yunit: "min", lr: 0.5, maxRounds: 12,
    points: [{x:0.8,y:12},{x:1.6,y:15},{x:2.4,y:14},{x:3.2,y:19},{x:4,y:23},{x:4.8,y:26},{x:5.6,y:24},{x:6.4,y:31},{x:7.2,y:34},{x:8,y:33},{x:8.8,y:39},{x:9.6,y:42}],
    knob: { label: "Boosting rounds", min: 0, max: 12, step: 1, init: 0 },
    insights: [
      { max: 2, text: "The first rounds attack the biggest residuals — the far-right deliveries the flat average missed by 20 minutes.", tone: "info" },
      { max: 6, text: "Each round: measure the leftover errors, fit a stump TO them, add it on. That loop, verbatim, is the algorithm.", tone: "info" },
      { max: 12, text: "🤯 'Fit to residuals' is literally gradient descent where each step is a tree — hence GRADIENT boosting. Swap the loss and the same machinery does classification, ranking, quantiles…", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Gradient boosting", formula: "residuals = −∂loss/∂prediction → next tree fits them → F += η·tree",
      text: "The reigning champion family for tabular data. Everything XGBoost/LightGBM/CatBoost do is this loop, industrialised." }
  }
},

{
  q: "Gradient boosting's learning rate is set to 0.1 instead of 1.0, so each tree's correction counts only a tenth. Why would anyone slow learning down on purpose?",
  choices: ["Small steps + more trees generalise better than big confident jumps", "It reduces the total number of trees", "It makes each tree deeper", "It speeds up training tenfold", "It prevents residuals from being computed"],
  explain: "Full-strength corrections chase each round's residuals — including their noise — aggressively. Shrunken steps force many trees to agree on a direction before the ensemble commits: regularisation via patience.",
  simple: "Correcting mistakes at full force means over-correcting the noisy ones. Taking 10%-sized steps means a mistake only really gets fixed if round after round keeps voting to fix it. Slower, humbler — and reliably better on new data.",
  widget: {
    type: "curveStatic", title: "The patient learner",
    world: "Two boosting runs on the same data: learning rate 1.0 and 0.1. Validation accuracy per round. One sprints, one strolls — check who ends up ahead.",
    xlab: "boosting rounds", xs: [0,1,2,3,4,5], labels: ["10","25","50","100","250","500"], dec: 0, yunit: "%",
    series: [
      { name: "learning rate 0.1", ys: [74,80,85,88,90,90.5] },
      { name: "learning rate 1.0", ys: [84,87,88,86,83,81] }
    ],
    knob: { label: "Rounds", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Early rounds: the sprinter (1.0) is way ahead. Impatient corrections DO fix real errors first.", tone: "info" },
      { max: 3, text: "The sprinter peaks and turns down — it's now confidently fitting noise. The stroller keeps climbing past it.", tone: "warn" },
      { max: 5, text: "🤯 Final: 90.5% vs 81%. The classic recipe: small learning rate, many trees, early stopping to pick the round. Patience, mathematically enforced.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Shrinkage (learning rate)", formula: "F += η·tree with η ≈ 0.01–0.1 · pair with n_estimators and early stopping",
      text: "The most important knob in gradient boosting. Lower η almost always helps — you just pay for it in trees." }
  }
},

{
  q: "Boosting keeps adding trees, and after round 180 validation accuracy starts sliding while training accuracy still climbs. What's the standard response?",
  choices: ["Early stopping — keep the round where validation peaked", "Raise the learning rate to finish faster", "Add deeper trees to compensate", "Remove the validation set", "Restart with fewer features"],
  explain: "Boosting reduces bias indefinitely — eventually the only 'errors' left to fix are noise. Monitoring a validation set and stopping (or rolling back to) its best round is the built-in cure.",
  simple: "The specialist chain eventually runs out of real mistakes and starts 'fixing' the data's random quirks. The honest curve tells you when: it stops improving. Freeze the team at that round — every tree after it is actively making the model worse.",
  widget: {
    type: "curveStatic", title: "When the specialists run out of real work",
    world: "Training and validation accuracy across boosting rounds. Find the round you'd freeze the ensemble at — and see what 300 more rounds of 'progress' would cost.",
    xlab: "boosting rounds", xs: [0,1,2,3,4,5,6], labels: ["25","50","100","180","250","350","500"], dec: 0, yunit: "%",
    series: [
      { name: "training accuracy", ys: [82,87,92,96,98,99,100] },
      { name: "validation accuracy", ys: [80,84,88,89,87.5,85,83] }
    ],
    knob: { label: "Rounds", min: 0, max: 6, step: 1, init: 0 },
    insights: [
      { max: 2, text: "Both curves climbing: the specialists are still fixing real, generalisable mistakes. Keep going.", tone: "info" },
      { max: 3, text: "Round ~180: validation peaks at 89%. Checkpoint here. The remaining training errors are mostly noise wearing error costumes.", tone: "info" },
      { max: 6, text: "🤯 Round 500: training 100%, validation down 6 points. Boosting WILL overfit if you let it run — unlike bagging, more members isn't automatically safe. Early stopping is non-negotiable.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Early stopping in boosting", formula: "monitor validation each round → stop after no improvement for N rounds",
      text: "Bagging saturates harmlessly; boosting overshoots. That asymmetry is why every boosting library ships early stopping as a first-class feature." }
  }
},

{
  q: "XGBoost took gradient boosting and made it the competition-winning standard. Which additions are its signature?",
  choices: ["Regularisation inside the tree-building, plus clever engineering (histograms, parallelism, missing-value handling)", "Replacing trees with neural networks", "Removing the learning rate", "Bootstrap sampling of labels", "A fixed depth of exactly 6"],
  explain: "XGBoost penalises tree complexity (leaf count, leaf weights) inside the split objective itself, uses second-order gradients, and adds serious engineering: histogram splits, per-tree parallelism, native missing-value routing, column subsampling.",
  simple: "XGBoost is gradient boosting with discipline and a race engine: every new leaf must EARN its place against a built-in complexity tax (so trees stay honest), and the whole thing is engineered to train fast on big data. Same idea as before — industrial grade.",
  widget: {
    type: "curveStatic", title: "The complexity tax at work",
    world: "Plain gradient boosting vs regularised (XGBoost-style) boosting, validation accuracy per round. Same data, same learning rate — one has the tax, one doesn't.",
    xlab: "boosting rounds", xs: [0,1,2,3,4,5], labels: ["50","100","200","300","400","500"], dec: 1, yunit: "%",
    series: [
      { name: "regularised (XGBoost-style)", ys: [85,88,90,90.5,90.5,90.3] },
      { name: "plain gradient boosting", ys: [85.5,88,89,88,86.5,85] }
    ],
    knob: { label: "Rounds", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Early on the two are neck-and-neck — regularisation costs almost nothing while there are real errors to fix.", tone: "info" },
      { max: 3, text: "Past round 200 the plain version starts fitting noise; the taxed version declines to build leaves that don't pay for themselves and holds its peak.", tone: "info" },
      { max: 5, text: "🤯 The tax makes overfitting SLOWER and shallower — more forgiving to tune, on top of being faster to train. That combination, not magic, is why XGBoost kept winning Kaggle.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "XGBoost's contributions", formula: "objective = loss + γ·(leaves) + λ·Σ(leaf weights²), 2nd-order gradients, histogram splits",
      text: "Regularised boosting + relentless engineering. LightGBM and CatBoost iterate on the same blueprint — learn one, you can operate all three." }
  }
},

{
  q: "On 10 million rows, XGBoost-family libraries find splits dramatically faster than classic exact search. What's the core speed trick?",
  choices: ["Bucket feature values into histograms and test bucket edges, not every value", "Skip half the trees at random", "Train on a 1% sample only", "Cache every possible tree in advance", "Use fewer boosting rounds"],
  explain: "Exact split-finding sorts and scans every unique value of every feature. Histogram methods bin values into ~256 buckets and only test bucket boundaries — hundreds of candidates instead of millions, at negligible accuracy cost.",
  simple: "To find where to cut a line of 10 million people by height, you don't compare every neighbouring pair — you sort them into 256 height buckets and test the bucket edges. Vastly fewer candidate cuts, near-identical final choice.",
  widget: {
    type: "curveStatic", title: "Buckets beat brute force",
    world: "Time to train 100 trees, exact splits vs histogram splits, as rows grow. Both produce near-identical accuracy — the bill is the story.",
    xlab: "training rows", xs: [0,1,2,3,4], labels: ["100k","500k","1M","5M","10M"], dec: 0, yunit: " min",
    series: [
      { name: "exact split search", ys: [4,22,48,260,560] },
      { name: "histogram splits", ys: [1,3,6,28,55] }
    ],
    knob: { label: "Rows", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Small data: both fine. The exact method's cost grows with UNIQUE VALUES; the histogram's grows with buckets — a constant.", tone: "info" },
      { max: 3, text: "At 5M rows: 260 minutes vs 28. Same trees, near enough — the histogram trades invisible precision for a 10× bill cut.", tone: "info" },
      { max: 4, text: "🤯 At 10M rows the exact method needs 9+ hours; histograms do it in under an hour, and parallelise beautifully. Engineering IS part of the algorithm at scale.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Histogram-based split finding", formula: "bin each feature into ~256 buckets → test bucket edges only",
      text: "The trick that makes LightGBM/XGBoost-hist feasible on huge tabular data — plus column subsampling and native missing-value routing for the full toolkit." }
  }
},

{
  q: "Stacking goes beyond averaging: a logistic regression, a forest and a boosted model each make predictions, and then… what happens?",
  choices: ["A meta-model TRAINS on their predictions to learn the best combination", "The predictions are multiplied together", "The worst model is deleted each round", "Each model retrains on the others' errors", "Their weights are averaged into one model"],
  explain: "Stacking treats base models' predictions as FEATURES for a second-level learner, which learns whom to trust, when — e.g. 'trust the forest except when the logistic model is very confident'. Learned combination beats fixed averaging.",
  simple: "Averaging gives every advisor an equal say forever. Stacking hires a chairperson who has watched the advisors' track records and learned each one's blind spots — weighting their opinions case by case. The chairperson is just another small model.",
  widget: {
    type: "curveStatic", title: "Hiring the chairperson",
    world: "Validation accuracy of three base models, their plain average, and a stacked meta-model. Slide across the ladder of sophistication.",
    xlab: "combination strategy", xs: [0,1,2,3,4], labels: ["logistic","forest","boosted","plain average","stacked meta"], dec: 1, yunit: "%",
    series: [
      { name: "validation accuracy", ys: [84,87.5,88.5,90,91.5] }
    ],
    knob: { label: "Strategy", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 2, text: "The three base models: different strengths (and, crucially, different mistakes). Best individual: 88.5%.", tone: "info" },
      { max: 3, text: "A plain average already beats every member — the diversity dividend you know from bagging.", tone: "info" },
      { max: 4, text: "🤯 The stacked meta-model adds another 1.5 by LEARNING the combination — trusting the boosted model on dense regions, the logistic one near the linear edge. That final point-and-a-half is how competitions are won.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Stacking (stacked generalisation)", formula: "level-0 models' predictions → features for a level-1 meta-model",
      text: "The heavy artillery of ensembling. Costly and complex — reach for it when the last point of accuracy genuinely pays." }
  }
},

{
  q: "When building the stacking meta-model's training data, the base models' predictions must come from OUT-OF-FOLD predictions. What goes wrong otherwise?",
  choices: ["Base models predict their own training rows — the meta-model learns to trust memorisation", "The folds become unbalanced", "The meta-model trains too slowly", "The base models can't be retrained", "Nothing — it's only a convention"],
  explain: "A base model predicting rows it trained on looks artificially brilliant (a deep forest is near-perfect on them). The meta-model then over-trusts it — and collapses in production where that brilliance evaporates. Out-of-fold predictions show the meta-model each base model's HONEST behaviour.",
  simple: "The chairperson must judge advisors by predictions they made about cases they hadn't seen — otherwise the advisor with the best memory (not the best judgement) gets all the trust, and the committee fails its first real client. Same leakage story as ever, one level up.",
  widget: {
    type: "foldPick", title: "Grading the advisors fairly",
    world: "Two ways to build the meta-model's training data, each scored on validation and then on a sealed test set. Flick through what each construction promised — and delivered.",
    blurb: "Same base models, same meta-learner — different construction:",
    folds: [
      { name: "in-sample preds · validation", acc: 94 },
      { name: "in-sample preds · sealed test", acc: 82 },
      { name: "out-of-fold preds · validation", acc: 91 },
      { name: "out-of-fold preds · sealed test", acc: 90 }
    ],
    knob: { label: "Construction & scoring", min: 1, max: 5, step: 1, init: 1 },
    insights: [
      { max: 2, text: "In-sample construction: dazzling validation, then a 12-point collapse on the sealed test. The meta-model learned to worship the forest's memorisation.", tone: "warn" },
      { max: 4, text: "🤯 Out-of-fold construction: 91 then 90 — one point of slippage. Slightly humbler promises, kept almost exactly.", tone: "wow" },
      { max: 5, text: "The rule generalises: any time a model's OUTPUT feeds another model's TRAINING, that output must be produced out-of-fold. Leakage climbs levels if you let it.", tone: "info" }
    ],
    extreme: { at: 4 },
    reveal: { name: "Out-of-fold stacking", formula: "cross_val_predict for level-0 outputs → train level-1 on those",
      text: "sklearn's StackingClassifier does this internally — now you know what it's protecting you from, and why hand-rolled stacking so often 'mysteriously' disappoints." }
  }
}
];
