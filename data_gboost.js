/* Gradient Boosting & XGBoost — Parts I & II. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).gb1 = [
  {
    "q": "Boosting also builds many models — but sequentially, not in parallel. What does each new member train to do?",
    "choices": [
      "Fix the mistakes the ensemble is still making",
      "Fit a fresh random sample",
      "Copy the previous member",
      "Vote against the majority",
      "Compress the earlier members"
    ],
    "explain": "After each round, boosting looks at what the current ensemble still gets wrong and trains the next weak learner to target exactly those errors. Members are specialists in their predecessors' failures.",
    "simple": "Bagging hires many independent generalists. Boosting hires a chain of specialists: the first does its best, the second studies ONLY what the first got wrong, the third mops up what's still wrong, and so on. The team is built mistake by mistake.",
    "widget": {
      "type": "boostFit",
      "title": "The chain of specialists",
      "world": "Live gradient boosting on house prices: each round fits a tiny stump to the CURRENT errors (red stalks) and adds it to the team. Start at zero rounds and build the ensemble yourself.",
      "xlab": "house size",
      "itemName": "sales",
      "yunit": "£k",
      "lr": 0.6,
      "maxRounds": 12,
      "points": [
        { "x": 0.6, "y": 118 },
        { "x": 1.4, "y": 127 },
        { "x": 2.2, "y": 140 },
        { "x": 3, "y": 152 },
        { "x": 3.8, "y": 158 },
        { "x": 4.6, "y": 175 },
        { "x": 5.4, "y": 198 },
        { "x": 6.2, "y": 204 },
        { "x": 7, "y": 222 },
        { "x": 7.8, "y": 236 },
        { "x": 8.6, "y": 248 },
        { "x": 9.4, "y": 262 }
      ],
      "knob": { "label": "Boosting rounds", "min": 0, "max": 12, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Round zero: the ensemble is just the average — one flat guess. Look at the red error stalks: they're the next round's ENTIRE curriculum.", "tone": "info" },
        { "max": 9, "text": "Each round adds one crude step exactly where the errors were largest. Watch the stalks shrink where the last stump landed.", "tone": "info" },
        { "max": 12, "text": "🤯 A dozen crude stumps — each useless alone — have assembled into a smooth, accurate curve. Weak learners, chained through their errors, compound into a strong one.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Boosting", "formula": "F_new = F_old + η · (weak learner fitted to current errors)", "text": "Sequential error-chasing. Where bagging attacks variance with independence, boosting attacks bias with accumulation." }
    }
  },
  {
    "q": "Bagging and boosting both combine many trees, yet they cure opposite diseases. Which pairing is right?",
    "choices": [
      "Bagging fights variance (instability); boosting fights bias (weakness)",
      "Bagging fights bias; boosting fights variance",
      "Both fight only variance",
      "Both fight only bias",
      "Neither affects bias or variance"
    ],
    "explain": "Bagging averages many overfit (high-variance) models into stability. Boosting stacks many underfit (high-bias) weak learners into strength. Same ingredient — trees — pointed at opposite failure modes.",
    "simple": "Bagging calms down experts who are too excitable: deep trees, averaged. Boosting builds up helpers who are too simple: stumps, accumulated. One removes wobble, the other removes weakness — remember which by what the members look like: deep for bagging, shallow for boosting.",
    "widget": {
      "type": "curveStatic",
      "title": "Opposite medicines",
      "world": "Validation accuracy as members join. Bagging starts from strong-but-jumpy deep trees; boosting starts from one pathetic stump. Watch the two growth stories.",
      "xlab": "ensemble size",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "labels": [
        "1",
        "5",
        "10",
        "25",
        "50",
        "100"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "boosting (stumps)", "ys": [ 62, 74, 80, 86, 89, 90 ] },
        { "name": "bagging (deep trees)", "ys": [ 79, 84, 86, 87, 87.5, 87.5 ] }
      ],
      "knob": { "label": "Ensemble size", "min": 0, "max": 5, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "One member each: the deep tree (79%) crushes the lone stump (62%). Bagging starts strong; boosting starts embarrassing.", "tone": "info" },
        { "max": 3, "text": "Boosting climbs relentlessly — each stump repairs the last one's bias. Bagging plateaus once the wobble is averaged out: variance can only be removed once.", "tone": "info" },
        { "max": 5, "text": "🤯 Boosting overtakes and keeps going: accumulated corrections can reduce bias indefinitely (until they start fitting noise). Different diseases, different medicines, different growth curves.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Bagging vs boosting", "formula": "bagging: parallel + deep trees → less variance · boosting: sequential + weak learners → less bias", "text": "The two pillars of tree ensembling. Diagnose your model's disease first — wobbly or weak? — and the right ensemble follows." }
    }
  },
  {
    "q": "In GRADIENT boosting specifically, what does each new tree get fitted to?",
    "choices": [
      "The residuals — the gradient of the loss at current predictions",
      "A bootstrap sample of the labels",
      "The original labels, reweighted",
      "The previous tree's structure",
      "The features, sorted by importance"
    ],
    "explain": "For squared error, the loss gradient at each point IS the residual (actual − predicted). Fitting the next tree to residuals is doing gradient descent — in function space, one tree-shaped step at a time.",
    "simple": "After each round, compute how far off you still are on every example — those leftover gaps are the residuals. The next tree's training targets ARE those gaps. Prediction by instalments: each tree pays off a bit more of the remaining debt.",
    "widget": {
      "type": "boostFit",
      "title": "Paying off the residuals",
      "world": "Delivery times vs distance. The red stalks are the residuals — the debt still owed on each point. Add rounds and watch the debt get paid down, largest bills first.",
      "xlab": "delivery distance",
      "itemName": "deliveries",
      "yunit": "min",
      "lr": 0.5,
      "maxRounds": 12,
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
      "knob": { "label": "Boosting rounds", "min": 0, "max": 12, "step": 1, "init": 0 },
      "insights": [
        { "max": 2, "text": "The first rounds attack the biggest residuals — the far-right deliveries the flat average missed by 20 minutes.", "tone": "info" },
        { "max": 6, "text": "Each round: measure the leftover errors, fit a stump TO them, add it on. That loop, verbatim, is the algorithm.", "tone": "info" },
        { "max": 12, "text": "🤯 'Fit to residuals' is literally gradient descent where each step is a tree — hence GRADIENT boosting. Swap the loss and the same machinery does classification, ranking, quantiles…", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Gradient boosting", "formula": "residuals = −∂loss/∂prediction → next tree fits them → F += η·tree", "text": "The reigning champion family for tabular data. Everything XGBoost/LightGBM/CatBoost do is this loop, industrialised." }
    }
  },
  {
    "q": "Gradient boosting's learning rate is set to 0.1 instead of 1.0, so each tree's correction counts only a tenth. Why would anyone slow learning down on purpose?",
    "choices": [
      "Small steps + more trees generalise better than big confident jumps",
      "It reduces the total number of trees",
      "It makes each tree deeper",
      "It speeds up training tenfold",
      "It prevents residuals from being computed"
    ],
    "explain": "Full-strength corrections chase each round's residuals — including their noise — aggressively. Shrunken steps force many trees to agree on a direction before the ensemble commits: regularisation via patience.",
    "simple": "Correcting mistakes at full force means over-correcting the noisy ones. Taking 10%-sized steps means a mistake only really gets fixed if round after round keeps voting to fix it. Slower, humbler — and reliably better on new data.",
    "widget": {
      "type": "curveStatic",
      "title": "The patient learner",
      "world": "Two boosting runs on the same data: learning rate 1.0 and 0.1. Validation accuracy per round. One sprints, one strolls — check who ends up ahead.",
      "xlab": "boosting rounds",
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
        "100",
        "250",
        "500"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "learning rate 0.1", "ys": [ 74, 80, 85, 88, 90, 90.5 ] },
        { "name": "learning rate 1.0", "ys": [ 84, 87, 88, 86, 83, 81 ] }
      ],
      "knob": { "label": "Rounds", "min": 0, "max": 5, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Early rounds: the sprinter (1.0) is way ahead. Impatient corrections DO fix real errors first.", "tone": "info" },
        { "max": 3, "text": "The sprinter peaks and turns down — it's now confidently fitting noise. The stroller keeps climbing past it.", "tone": "warn" },
        { "max": 5, "text": "🤯 Final: 90.5% vs 81%. The classic recipe: small learning rate, many trees, early stopping to pick the round. Patience, mathematically enforced.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Shrinkage (learning rate)", "formula": "F += η·tree with η ≈ 0.01–0.1 · pair with n_estimators and early stopping", "text": "The most important knob in gradient boosting. Lower η almost always helps — you just pay for it in trees." }
    }
  },
  {
    "q": "Boosting keeps adding trees, and after round 180 validation accuracy starts sliding while training accuracy still climbs. What's the standard response?",
    "choices": [
      "Early stopping — keep the round where validation peaked",
      "Raise the learning rate to finish faster",
      "Add deeper trees to compensate",
      "Remove the validation set",
      "Restart with fewer features"
    ],
    "explain": "Boosting reduces bias indefinitely — eventually the only 'errors' left to fix are noise. Monitoring a validation set and stopping (or rolling back to) its best round is the built-in cure.",
    "simple": "The specialist chain eventually runs out of real mistakes and starts 'fixing' the data's random quirks. The honest curve tells you when: it stops improving. Freeze the team at that round — every tree after it is actively making the model worse.",
    "widget": {
      "type": "curveStatic",
      "title": "When the specialists run out of real work",
      "world": "Training and validation accuracy across boosting rounds. Find the round you'd freeze the ensemble at — and see what 300 more rounds of 'progress' would cost.",
      "xlab": "boosting rounds",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5,
        6
      ],
      "labels": [
        "25",
        "50",
        "100",
        "180",
        "250",
        "350",
        "500"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "training accuracy", "ys": [ 82, 87, 92, 96, 98, 99, 100 ] },
        { "name": "validation accuracy", "ys": [ 80, 84, 88, 89, 87.5, 85, 83 ] }
      ],
      "knob": { "label": "Rounds", "min": 0, "max": 6, "step": 1, "init": 0 },
      "insights": [
        { "max": 2, "text": "Both curves climbing: the specialists are still fixing real, generalisable mistakes. Keep going.", "tone": "info" },
        { "max": 3, "text": "Round ~180: validation peaks at 89%. Checkpoint here. The remaining training errors are mostly noise wearing error costumes.", "tone": "info" },
        { "max": 6, "text": "🤯 Round 500: training 100%, validation down 6 points. Boosting WILL overfit if you let it run — unlike bagging, more members isn't automatically safe. Early stopping is non-negotiable.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Early stopping in boosting", "formula": "monitor validation each round → stop after no improvement for N rounds", "text": "Bagging saturates harmlessly; boosting overshoots. That asymmetry is why every boosting library ships early stopping as a first-class feature." }
    }
  }
];

(window.QUESTIONS = window.QUESTIONS || {}).gb2 = [
  {
    "q": "XGBoost took gradient boosting and made it the competition-winning standard. Which additions are its signature?",
    "choices": [
      "Regularisation inside the tree-building, plus clever engineering (histograms, parallelism, missing-value handling)",
      "Replacing trees with neural networks",
      "Removing the learning rate",
      "Bootstrap sampling of labels",
      "A fixed depth of exactly 6"
    ],
    "explain": "XGBoost penalises tree complexity (leaf count, leaf weights) inside the split objective itself, uses second-order gradients, and adds serious engineering: histogram splits, per-tree parallelism, native missing-value routing, column subsampling.",
    "simple": "XGBoost is gradient boosting with discipline and a race engine: every new leaf must EARN its place against a built-in complexity tax (so trees stay honest), and the whole thing is engineered to train fast on big data. Same idea as before — industrial grade.",
    "widget": {
      "type": "curveStatic",
      "title": "The complexity tax at work",
      "world": "Plain gradient boosting vs regularised (XGBoost-style) boosting, validation accuracy per round. Same data, same learning rate — one has the tax, one doesn't.",
      "xlab": "boosting rounds",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "labels": [
        "50",
        "100",
        "200",
        "300",
        "400",
        "500"
      ],
      "dec": 1,
      "yunit": "%",
      "series": [
        { "name": "regularised (XGBoost-style)", "ys": [ 85, 88, 90, 90.5, 90.5, 90.3 ] },
        { "name": "plain gradient boosting", "ys": [ 85.5, 88, 89, 88, 86.5, 85 ] }
      ],
      "knob": { "label": "Rounds", "min": 0, "max": 5, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Early on the two are neck-and-neck — regularisation costs almost nothing while there are real errors to fix.", "tone": "info" },
        { "max": 3, "text": "Past round 200 the plain version starts fitting noise; the taxed version declines to build leaves that don't pay for themselves and holds its peak.", "tone": "info" },
        { "max": 5, "text": "🤯 The tax makes overfitting SLOWER and shallower — more forgiving to tune, on top of being faster to train. That combination, not magic, is why XGBoost kept winning Kaggle.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "XGBoost's contributions", "formula": "objective = loss + γ·(leaves) + λ·Σ(leaf weights²), 2nd-order gradients, histogram splits", "text": "Regularised boosting + relentless engineering. LightGBM and CatBoost iterate on the same blueprint — learn one, you can operate all three." }
    }
  },
  {
    "q": "On 10 million rows, XGBoost-family libraries find splits dramatically faster than classic exact search. What's the core speed trick?",
    "choices": [
      "Bucket feature values into histograms and test bucket edges, not every value",
      "Skip half the trees at random",
      "Train on a 1% sample only",
      "Cache every possible tree in advance",
      "Use fewer boosting rounds"
    ],
    "explain": "Exact split-finding sorts and scans every unique value of every feature. Histogram methods bin values into ~256 buckets and only test bucket boundaries — hundreds of candidates instead of millions, at negligible accuracy cost.",
    "simple": "To find where to cut a line of 10 million people by height, you don't compare every neighbouring pair — you sort them into 256 height buckets and test the bucket edges. Vastly fewer candidate cuts, near-identical final choice.",
    "widget": {
      "type": "curveStatic",
      "title": "Buckets beat brute force",
      "world": "Time to train 100 trees, exact splits vs histogram splits, as rows grow. Both produce near-identical accuracy — the bill is the story.",
      "xlab": "training rows",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "100k",
        "500k",
        "1M",
        "5M",
        "10M"
      ],
      "dec": 0,
      "yunit": " min",
      "series": [
        { "name": "exact split search", "ys": [ 4, 22, 48, 260, 560 ] },
        { "name": "histogram splits", "ys": [ 1, 3, 6, 28, 55 ] }
      ],
      "knob": { "label": "Rows", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Small data: both fine. The exact method's cost grows with UNIQUE VALUES; the histogram's grows with buckets — a constant.", "tone": "info" },
        { "max": 3, "text": "At 5M rows: 260 minutes vs 28. Same trees, near enough — the histogram trades invisible precision for a 10× bill cut.", "tone": "info" },
        { "max": 4, "text": "🤯 At 10M rows the exact method needs 9+ hours; histograms do it in under an hour, and parallelise beautifully. Engineering IS part of the algorithm at scale.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Histogram-based split finding", "formula": "bin each feature into ~256 buckets → test bucket edges only", "text": "The trick that makes LightGBM/XGBoost-hist feasible on huge tabular data — plus column subsampling and native missing-value routing for the full toolkit." }
    }
  },
  {
    "q": "Stochastic gradient boosting sets subsample=0.7, so each tree trains on a random 70% of rows. Why would deliberately showing each tree LESS data help?",
    "choices": [
      "The randomness decorrelates successive trees and acts as a regulariser — validation usually peaks below subsample=1.0",
      "It's purely a speed trick with no effect on accuracy",
      "It guarantees each row is seen exactly once",
      "It prevents trees from being binary",
      "It replaces the need for a learning rate"
    ],
    "explain": "With subsample=1 every round stares at the exact same residuals and can grind into noise deterministically. Sampling rows (and columns — colsample in XGBoost) makes each corrector see a slightly different picture, which stops the relay fixating on individual noisy points. It's bagging's randomness grafted onto boosting — plus it trains faster.",
    "simple": "A relay of perfectionists studying the same error report will eventually start 'fixing' typos in it — memorising noise. Give each runner a different random 70% of the report and no single noisy point gets obsessed over, because most runners never even see it. The genuine patterns appear in every sample, so they still get fixed.",
    "widget": {
      "type": "curveStatic",
      "title": "Show each corrector less, learn more",
      "world": "The same boosted model at five subsample rates. Watch validation accuracy and the train-validation gap (memorisation) move in opposite directions.",
      "xlab": "subsample (share of rows per tree) →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "0.3",
        "0.5",
        "0.7",
        "0.85",
        "1.0"
      ],
      "dec": 1,
      "yunit": "",
      "series": [
        { "name": "validation accuracy (%)", "ys": [ 88.5, 90, 91, 90.6, 89.5 ] },
        { "name": "train − val gap (pts)", "ys": [ 3, 4, 5, 7, 10 ] }
      ],
      "knob": { "label": "subsample", "min": 0, "max": 4, "step": 1, "init": 4 },
      "insights": [
        { "max": 0, "text": "0.3: each tree sees so little that corrections turn noisy-in-a-bad-way — the relay is passing rumours.", "tone": "warn" },
        { "max": 2, "text": "0.7: the sweet spot in this run — every real pattern still shows up in every sample, but no single noisy row appears often enough to be memorised.", "tone": "info" },
        { "max": 4, "text": "🤯 1.0 (no sampling): the gap doubles to 10 points. Determinism let the relay grind into the training set's noise. The fix wasn't more data or fewer rounds — it was showing each tree LESS.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Stochastic gradient boosting", "formula": "subsample rows (and colsample features) per tree → decorrelated correctors", "text": "Friedman's 1999 addition. In XGBoost/LightGBM: subsample & colsample_bytree, typically 0.6–0.9. Regularisation and a speed-up in one knob." }
    }
  },
  {
    "q": "Boosting libraries default to shallow trees — depth 3 to 6 — while a random forest happily grows its trees deep. Why does boosting specifically want WEAK learners?",
    "choices": [
      "Each round only needs a small corrective step; deep trees make each round too greedy and the relay overfits fast",
      "Shallow trees are the only ones that can be summed",
      "Deep trees can't compute residuals",
      "It's a memory constraint with no accuracy effect",
      "Shallow trees train the gradient exactly"
    ],
    "explain": "Boosting's power comes from MANY small corrections compounding — bias falls round by round. A depth-16 tree can nearly memorise the residuals in one round, so there's nothing honest left for later rounds except noise. Forests are the opposite: each deep tree is a full low-bias model, and averaging attacks their variance. Depth 3–6 also caps feature-interaction order, a sensible prior for tabular data.",
    "simple": "Boosting is sculpting: a hundred light chisel taps, each fixing what the last left wrong. Swap the chisel for a sledgehammer (a deep tree) and the first swing does 'everything' — including smashing detail into the noise — and the remaining 99 swings just chase rubble. The forest is a different sport entirely: many finished sculptures, averaged.",
    "widget": {
      "type": "curveStatic",
      "title": "Chisels beat sledgehammers, in relays",
      "world": "Boosted ensembles built from trees of five different depths (rounds tuned fairly for each). Compare validation accuracy with how quickly training accuracy saturates.",
      "xlab": "depth of each boosted tree →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "1",
        "2",
        "4",
        "8",
        "16"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "validation accuracy", "ys": [ 89, 91, 92, 88, 84 ] },
        { "name": "training accuracy", "ys": [ 91, 94, 97, 99.5, 100 ] }
      ],
      "knob": { "label": "Tree depth", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Depth-1 stumps: even the weakest learner boosts to 89% — compounding tiny corrections is the engine, not tree strength.", "tone": "info" },
        { "max": 2, "text": "Depth 4: the peak. Each tree can capture small feature interactions, yet still leaves honest work for later rounds.", "tone": "info" },
        { "max": 4, "text": "🤯 Depth 16: training hits 100% almost immediately — round one memorised the residuals, and every later round modelled noise. Boosting NEEDS its learners weak; that's not a limitation, it's the design.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Weak learners (max_depth 3–6)", "formula": "many small low-variance corrections > one greedy fit", "text": "XGBoost defaults to max_depth=6, LightGBM caps leaves instead (num_leaves≈31). Depth also bounds interaction order: depth d ⇒ at most d features interacting per path." }
    }
  },
  {
    "q": "XGBoost, LightGBM, CatBoost — three battle-tested gradient-boosting libraries. They share the same core algorithm, so what actually distinguishes them?",
    "choices": [
      "Engineering trade-offs: LightGBM chases speed on big data, CatBoost handles categoricals natively, XGBoost is the regularised all-rounder",
      "Completely different loss functions",
      "Only XGBoost uses decision trees",
      "LightGBM is bagging, not boosting",
      "CatBoost only works on images"
    ],
    "explain": "All three are gradient boosting over CART-style trees with histogram tricks. LightGBM's leaf-wise growth + sampling tricks make it typically fastest on large data. CatBoost's ordered target encoding makes raw categorical columns first-class citizens (and its ordered boosting resists target leakage). XGBoost, the original at scale, remains the most portable, documented, regularisation-rich default. Accuracy when tuned: usually within noise of each other.",
    "simple": "Three makes of the same engine. One is tuned for the motorway (LightGBM: raw speed on big tables), one has an automatic gearbox for messy streets (CatBoost: feed it categorical columns as-is), one is the reliable model every mechanic knows (XGBoost). Pick by your data and constraints — on a tuned benchmark they usually finish within a photo of each other.",
    "widget": {
      "type": "curveStatic",
      "title": "Three makes, one engine",
      "world": "The three libraries scored 0–100 on five practical criteria. Slide across and notice each library owns a different column — and one column where nobody wins.",
      "xlab": "criterion →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "speed, big data",
        "raw categoricals",
        "docs & ecosystem",
        "tuned accuracy",
        "small-data defaults"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "LightGBM", "ys": [ 95, 75, 82, 91, 62 ] },
        { "name": "CatBoost", "ys": [ 72, 97, 74, 91, 85 ] },
        { "name": "XGBoost", "ys": [ 80, 55, 95, 91, 72 ] }
      ],
      "knob": { "label": "Criterion", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "LightGBM owns the speed column (leaf-wise growth, histogram bins, clever sampling); CatBoost owns categoricals — no one-hot, no target-leakage foot-guns.", "tone": "info" },
        { "max": 3, "text": "Tuned accuracy: 91, 91, 91. On typical tabular data the algorithm is the same; benchmark wins trade places run to run.", "tone": "info" },
        { "max": 4, "text": "🤯 Small data flips the board again — CatBoost's cautious ordered boosting overfits least out of the box. The real skill isn't crowning one library; it's knowing WHICH column your project lives in.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "The gradient-boosting library landscape", "formula": "same algorithm · different engineering bets", "text": "Defaults: LightGBM for big tables, CatBoost for category-heavy or smaller data, XGBoost as the portable well-trodden path. sklearn's HistGradientBoosting is a capable built-in fourth option." }
    }
  }
];
