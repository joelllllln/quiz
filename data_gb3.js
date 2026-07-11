/* Gradient Boosting — Part III: Advanced Study. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).gb3 = [

{
  q: "Gradient boosting is 'gradient descent in function space' — the loss is a plug-in module. Squared error, absolute error, Huber: how does the loss choice change what each boosting round chases?",
  choices: ["The residuals each tree fits are the loss's GRADIENT: squared error chases raw errors (outliers scream), absolute error chases only signs (outliers whisper), Huber switches between the two at a threshold", "The loss only sets how the final scores are reported; every round still fits the same plain residual, so squared, absolute and Huber all chase identical targets and differ only in the printed metric", "Absolute error forces each tree to grow deeper, since ranking by signs needs more splits, while squared error keeps its trees shallow, so the loss really sets the tree depth rather than the residual target it fits", "Squared error is the only loss whose gradient a tree can actually split on, so absolute error and Huber must both be converted into squared error internally before any round can fit its residuals", "Loss choice only starts to matter once you switch to classification; for plain regression every loss reduces to the same residual, so squared, absolute and Huber all behave identically on any target"],
  explain: "Each round fits the negative gradient of the loss at current predictions. Squared error's gradient IS the residual (y−F): a point 100 off pulls 100× harder than a point 1 off — outliers hijack whole rounds. Absolute error's gradient is sign(y−F): every point pulls ±1 equally — outliers get exactly one vote. Huber interpolates: quadratic inside δ, linear outside. Practical reading: label noise/fat tails → absolute or Huber; clean targets where big misses truly cost quadratically → squared. The mechanism (fit-gradient, add, repeat) never changes; the loss decides whose complaints get amplified. This modularity is the 'gradient' in the name — and the reason quantile, Poisson and custom losses all ride the same machinery.",
  simple: "Boosting is a complaints department: every round, it reads the current complaints and dispatches a tree to appease them. The loss function is the policy for HOW LOUD each complaint reads. Squared error: volume proportional to the error — one deranged customer who's off by 100 screams louder than a hundred customers off by 1, and the department spends whole rounds serving the maniac. Absolute error: everyone gets the same one-decibel voice, however extreme — outliers wait in line like the rest. Huber: normal voices for reasonable complaints, capped volume for maniacs. Same department, same trees; the policy decides who gets served.",
  widget: {
    type: "curveStatic", title: "Complaint volume policies",
    world: "One training point's pull on the next boosting round, as its error grows — under the three losses (Huber threshold δ=5). This pull IS what the next tree gets fitted to.",
    xlab: "point's current error →", xs: [0,1,2,3,4], labels: ["1","5","10","25","100"], dec: 0, yunit: "",
    series: [
      { name: "squared error's pull", ys: [1, 5, 10, 25, 100] },
      { name: "Huber's pull (δ=5)", ys: [1, 5, 5, 5, 5] },
      { name: "absolute error's pull", ys: [1, 1, 1, 1, 1] }
    ],
    knob: { label: "Point's error", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Small errors: all three policies agree — near the target, every loss is roughly quadratic-ish and everyone's voice is proportional.", tone: "info" },
      { max: 3, text: "Error 25: squared error gives this point 25 votes; absolute gives 1; Huber caps at 5. If that point is a typo (someone logged 2500 instead of 25.00), squared error just donated a round of trees to a typo.", tone: "warn" },
      { max: 4, text: "🤯 Error 100: a single point pulling 100× under squared loss — whole rounds bent around one row. Under absolute loss the same row pulls exactly 1. The loss is the model's theory of WHICH mistakes matter; pick it from your error economics (and your faith in the labels), not from the default.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Loss functions as gradient policies", formula: "round t fits −∂loss/∂F: L2→residual · L1→sign · Huber→clipped residual",
      text: "sklearn HistGB: loss='squared_error'|'absolute_error'|'quantile'|'poisson'. Fat tails or label noise → L1/Huber. The loss plugs in; the boosting loop never changes." }
  }
},

{
  q: "XGBoost's stated edge over classic gradient boosting: it uses the loss's SECOND derivative too (Newton boosting). What do the second-order terms buy at each round?",
  choices: ["Curvature-aware steps: leaf values become gradient-sum ÷ (hessian-sum + λ) — bigger steps where the loss is flat, cautious steps where it curves, per leaf, with regularisation folded into the same formula", "Twice as many trees per round: the second derivative spawns a companion tree beside each first-order tree, so every round adds one matched pair of trees and the whole ensemble simply grows at double the usual rate", "Exact global optimisation of the entire ensemble at once: the hessian lets XGBoost re-solve every tree already built, so each round re-optimises all previous trees instead of only adding one more", "It removes any need for a learning rate, because the hessian already rescales each step to unit size, so shrinkage becomes redundant and the eta parameter is simply ignored whenever Newton boosting runs", "Second-order terms only matter for regression losses; in classification the hessian is constant, so Newton boosting collapses back to ordinary gradient fitting and buys nothing over the plain method"],
  explain: "Classic GBM fits the gradient, then a line-search picks step size — one scalar per tree. XGBoost expands the loss to second order per point: gᵢ (gradient) and hᵢ (hessian). Each leaf's optimal value has closed form −Σg/(Σh+λ), and split quality (gain) is scored by the same quantities — so EVERY leaf gets its own curvature-calibrated step, and L1/L2 regularisation enters the identical formula (λ shrinks steps where evidence is thin). For log-loss, h = p(1−p): near-certain points (p≈0 or 1) have tiny hessians, and the formula automatically damps their influence... where the loss is flat, confidence is cheap, so steps are guarded by λ. Net effect: fewer rounds to converge, principled regularisation, one framework for any twice-differentiable loss.",
  simple: "Walking downhill in fog, the gradient tells you which way is down; the second derivative tells you the SHAPE underfoot — gentle ramp or knife-edge gully. Classic boosting knows only the direction and picks one stride length per tree. Newton boosting reads the shape at every leaf: long confident strides down broad ramps, tiny careful steps in tight gullies — and where the shape says 'barely any slope, barely any information', the built-in λ term says 'then barely move'. Direction plus curvature plus caution, computed per leaf from one clean formula: that's the arithmetic under XGBoost's speed and its famous resistance to overfitting-per-round.",
  widget: {
    type: "curveStatic", title: "Stride length from curvature",
    world: "Five leaves in one boosting round: their gradient evidence, their curvature (hessian sum), and the leaf step XGBoost's formula −Σg/(Σh+λ) actually takes (λ=1).",
    xlab: "leaf →", xs: [0,1,2,3,4], labels: ["flat & strong","flat & weak","curved & strong","curved & weak","3 points only"], dec: 1, yunit: "",
    series: [
      { name: "gradient sum Σg (evidence)", ys: [-40, -6, -40, -6, -4] },
      { name: "hessian sum Σh (curvature)", ys: [4, 4, 39, 39, 1] },
      { name: "leaf step taken ×10", ys: [80, 12, 10, 1.5, 20] }
    ],
    knob: { label: "Leaf", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Flat loss + strong evidence: step 8.0 — the formula strides out, because flat curvature says overshooting is nearly impossible here.", tone: "info" },
      { max: 2, text: "Same strong evidence but high curvature: step 1.0 — an eighth the stride, same gradient. Classic GBM's single per-tree step size cannot make this distinction; the hessian makes it per leaf.", tone: "info" },
      { max: 4, text: "🤯 The 3-point leaf: decent-looking gradient, but Σh+λ ≈ 2 with λ contributing half — the regulariser literally sits inside the denominator, shrinking steps exactly where evidence is thin. Optimisation and regularisation in ONE formula: that's the engineering elegance the 'X' is famous for.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Newton boosting (second-order)", formula: "leaf value = −Σgᵢ / (Σhᵢ + λ) · split gain from the same g,h sums",
      text: "Why XGBoost converges in fewer rounds and regularises coherently. Any twice-differentiable custom loss plugs in by supplying g and h — the whole API asks for exactly those two." }
  }
},

{
  q: "Your GBM denies a loan and the regulator asks 'why, for THIS applicant?'. Global importances can't answer. SHAP values can. What do they guarantee that ad-hoc explanations don't?",
  choices: ["A fair per-prediction decomposition: each feature gets a signed contribution and they sum EXACTLY from the baseline to this prediction — with TreeSHAP computing it efficiently for tree ensembles", "A ranking of features by how often the ensemble split on them during training, so the applicant sees the globally most-used columns rather than any figure tailored to their own particular case", "A calibrated confidence interval around this applicant's score, telling the regulator how uncertain the model is rather than which features pushed the decision one way or the other for them", "The single decisive feature behind each case, collapsing the decision to one headline cause so the regulator receives exactly one clean reason per applicant instead of a full signed breakdown", "A small interpretable surrogate model retrained around this applicant, whose coefficients approximate the local boundary and stand in for the black-box GBM's reasoning on that one particular row"],
  explain: "SHAP applies Shapley values (cooperative game theory) to prediction: a feature's contribution is its value-added averaged over all orders in which features could join the explanation coalition. Guarantees: efficiency (contributions sum baseline→prediction exactly — the explanation is complete, nothing hidden), symmetry and consistency (a feature that helps more never scores less). Naive computation is exponential; TreeSHAP exploits tree structure for polynomial time, which is why GBMs are the best-explained complex models in industry. Local answer: 'income +0.9, debt-ratio −1.4, history −0.8: score 0.2 vs baseline 1.5'. Averaging |SHAP| over rows also yields global importances more trustworthy than impurity credit. Caveats: explains the MODEL's arithmetic, not causality; correlated features can share credit in unintuitive ways.",
  simple: "The regulator's question is about ONE person, and 'income is generally important' is not an answer. SHAP produces an itemised receipt for this exact prediction: start from the average applicant's score, then — averaging over every order the facts could have been revealed — this income added 0.9, this debt ratio subtracted 1.4, this payment history subtracted 0.8… and the items provably sum to the final score, to the penny. No cherry-picking a flattering story, no leftover unexplained gap: complete, signed, additive. The fine print: it's an honest receipt for what the MODEL computed — not proof about the applicant's real life, and not a promise that changing a feature changes fate.",
  widget: {
    type: "curveStatic", title: "The itemised receipt",
    world: "One applicant's SHAP decomposition: the running score from the population baseline, feature by feature, down to the model's final output. The receipt must — and does — add up exactly.",
    xlab: "explanation builds →", xs: [0,1,2,3,4], labels: ["baseline (avg)","+ income","+ debt ratio","+ history","+ employment"], dec: 2, yunit: "",
    series: [
      { name: "running log-odds of approval", ys: [1.5, 2.4, 1.0, 0.2, 0.35] }
    ],
    knob: { label: "Receipt line", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Income: +0.9 for THIS applicant. The same feature could be negative on the next row — per-prediction, not global, is the whole point.", tone: "info" },
      { max: 3, text: "Debt ratio −1.4, then payment history −0.8: the two lines that actually drove the denial, quantified and signed. This is the regulator's answer.", tone: "info" },
      { max: 4, text: "🤯 The receipt lands at exactly 0.35 — the model's true output. Efficiency GUARANTEES no unexplained remainder, symmetric fairness guarantees no cherry-picked story, and TreeSHAP delivers it in milliseconds per row. One caution to keep repeating: this explains the model's arithmetic, not the world's causality.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "SHAP values (TreeSHAP)", formula: "Shapley: φᵢ averaged over coalition orders · Σφᵢ = prediction − baseline, exactly",
      text: "shap library: TreeExplainer for XGBoost/LightGBM/forests. Waterfalls for single cases, beeswarm for global patterns. Explains the model — causal claims need causal methods." }
  }
},

{
  q: "You have 400 labelled examples and 40 features. XGBoost overfits within 30 rounds, whatever you set. When is gradient boosting the WRONG tool, and what actually wins on tiny tabular data?",
  choices: ["Boosting's sequential error-chasing needs enough data to distinguish signal from noise — with hundreds of rows, heavily-regularised simple models (logistic/ridge), NB, or a shallow forest usually win; invest in features and CV discipline instead", "Boosting always wins once it is tuned long enough: with only hundreds of rows you simply need many more rounds, a much lower learning rate and slightly deeper trees, after which XGBoost overtakes any linear or naive-Bayes baseline you try", "Synthesise thousands of extra rows with SMOTE or a generative model until the dataset is large enough for boosting, then train XGBoost exactly as you normally would, because the extra augmented rows effectively remove the small-sample problem altogether", "Reach for a deep neural network instead: with only hundreds of rows a well-regularised deep multilayer network beats almost any tree ensemble and reliably outperforms both logistic regression and shallow random forests on small tabular data", "Prune down to the two strongest features and keep boosting hard on just those; with the noisy columns gone XGBoost stops overfitting and comfortably beats the simpler models even on a few hundred rows"],
  explain: "Each boosting round fits the previous rounds' residuals — on 400 rows, those residuals are mostly noise after a handful of rounds, and the machine begins confidently modelling sampling accidents (subsample/colsample randomness barely helps: the signal:noise per round is the issue). Bias-variance in plain form: tiny data can't fund a low-bias/high-variance learner. What wins: models with strong assumptions (regularised linear, NB — Ng-Jordan's small-data result), shallow forests (variance-averaging without sequential noise-chasing), and above all careful CV (repeated/nested — on 400 rows a single 5-fold split is itself noisy). Boosting re-enters the race around thousands of rows. Knowing a tool's DOMAIN is part of knowing the tool.",
  simple: "Boosting is a detective who keeps re-interrogating the unexplained residue of the case. With ten thousand cases, the residue holds real patterns; with 400, the residue after a few rounds IS coincidence — and the detective, incapable of shrugging, starts building elaborate theories about noise. Tiny datasets reward the opposite temperament: humble models with strong prior beliefs (a straight line, a naive multiplier), which is exactly what regularised regression and NB are. The craft isn't knowing the strongest tool; it's knowing the terrain where each tool's strength inverts into its failure mode.",
  widget: {
    type: "curveStatic", title: "Where the champion's strength inverts",
    world: "Tuned XGBoost vs tuned ridge-logistic vs shallow forest across training sizes, same task. Watch the crossover — and how wide the tiny-data gap is.",
    xlab: "training rows →", xs: [0,1,2,3,4], labels: ["200","400","1.5k","6k","25k"], dec: 0, yunit: "%",
    series: [
      { name: "regularised logistic", ys: [79, 82, 84, 85, 86] },
      { name: "shallow random forest", ys: [76, 80, 84, 86, 87.5] },
      { name: "tuned XGBoost", ys: [71, 76, 83, 87, 90] }
    ],
    knob: { label: "Training rows", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "At 200–400 rows the ridge-logistic leads XGBoost by 6–8 points — the linear model's rigid assumptions are doing the work the data can't fund.", tone: "info" },
      { max: 2, text: "Around 1.5k rows the three curves nearly touch: the crossover zone, where boosting's flexibility stops being a liability.", tone: "info" },
      { max: 4, text: "🤯 At 25k rows XGBoost leads by 4 — the exact reversal of the tiny-data picture. Neither result contradicts the other: capacity is funded by data. The benchmark-winning default below ~1k rows is embarrassment-resistant simplicity, plus every drop of feature engineering and CV rigour you own.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Boosting's data floor", formula: "sequential residual-fitting needs residuals ≠ noise · tiny n → strong-assumption models win",
      text: "Ng-Jordan generalises: sample-efficient (biased) learners win small-n; flexible learners win large-n. On 400 rows, spend effort on features and repeated CV, not on rounds." }
  }
},

{
  q: "LightGBM grows trees LEAF-WISE (always split the best leaf anywhere) while XGBoost historically grew LEVEL-WISE (complete each depth). Same split criterion — different growth order. What's the actual trade?",
  choices: ["Leaf-wise reaches lower loss with the same leaf budget by spending splits where gain is highest — but builds deep lopsided trees that overfit small data unless capped (num_leaves, min_data_in_leaf)", "Level-wise trees are strictly more accurate in every case, because completing each depth guarantees a balanced tree that generalises better, so leaf-wise only ever trades accuracy away for a little speed", "Leaf-wise growth only works for classification tasks, since splitting the single best leaf relies on class-probability gain, so regression is forced back onto the slower level-wise growth every time", "The two policies always build the identical tree in a different order, so the distinction is purely cosmetic and changes neither the training loss reached nor the model's tendency to overfit small data", "Leaf-wise trees cannot be regularised at all, since there is no depth to cap; only level-wise growth exposes max_depth, so LightGBM has to lean entirely on the learning rate to control any overfitting"],
  explain: "Level-wise expands every node at the current depth — spending splits on mediocre nodes just because they exist at that level (easier to parallelise by level, naturally balanced). Leaf-wise is greedy-global: among ALL current leaves, split the single best one — the same budget of, say, 31 leaves lands where the loss falls fastest, typically producing deep, asymmetric trees that fit more per leaf. Risk mirrors reward: on small/noisy data the best-leaf chase digs deep into noise pockets — hence LightGBM's cardinal knobs num_leaves (cap total leaves, NOT depth) and min_data_in_leaf. Modern engines converge: XGBoost offers grow_policy='lossguide'; the lesson is the principle — same criterion + different search order = different inductive behaviour.",
  simple: "Two gardeners with a budget of 31 cuts. The level-wise gardener prunes every branch at height 1, then every branch at height 2 — tidy, symmetric, and half the cuts go to branches that didn't need it 'because it was their row's turn'. The leaf-wise gardener always makes the single most valuable cut anywhere on the tree — the budget chases value, and the tree grows deep and lopsided wherever the action is. More value per cut; also, on a small garden, a fast track to obsessively carving one noisy corner. That's why LightGBM's most important dial is simply 'how many leaves total' — it caps the greed.",
  widget: {
    type: "curveStatic", title: "Same budget, different gardeners",
    world: "Training loss achieved per leaf budget under each growth policy, plus their validation scores on a SMALL noisy dataset — where leaf-wise greed shows its teeth.",
    xlab: "leaf budget →", xs: [0,1,2,3,4], labels: ["7","15","31","63","127"], dec: 1, yunit: "",
    series: [
      { name: "leaf-wise: training loss ×100", ys: [38, 29, 21, 14, 8] },
      { name: "level-wise: training loss ×100", ys: [44, 36, 28, 21, 15] },
      { name: "leaf-wise: validation acc (%)", ys: [84, 86.5, 87, 85, 82] }
    ],
    knob: { label: "Leaf budget", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "At every budget, leaf-wise sits ~7 points lower on training loss — the same cuts, spent where gain is highest instead of where the level said. That efficiency is why LightGBM is fast AND accurate at scale.", tone: "info" },
      { max: 2, text: "31 leaves: leaf-wise validation peaks (87%). The default num_leaves=31 is exactly this point in LightGBM's design lore.", tone: "info" },
      { max: 4, text: "🤯 127 leaves on small noisy data: leaf-wise training loss keeps plunging while its validation slides to 82% — the greedy search found the noise pockets level-wise couldn't reach at equal depth. Cap num_leaves and min_data_in_leaf FIRST on small data; depth was never the real dial here.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Leaf-wise vs level-wise growth", formula: "leaf-wise: argmax-gain leaf anywhere · level-wise: complete each depth · same criterion, different search",
      text: "LightGBM: num_leaves & min_data_in_leaf are the primary regularisers (not max_depth). XGBoost grow_policy='lossguide' adopts the same idea. Search order is inductive bias." }
  }
},

{
  q: "You wire early stopping to your final TEST set ('stop when test error bottoms out') and report that bottom as the model's performance. The number is beautiful — and worthless. Why, and what's the clean protocol?",
  choices: ["Choosing the stopping round ON the test set makes it a tuning set — the reported minimum is selection bias, optimistically biased by construction; early-stop on a separate VALIDATION slice and touch test once at the end", "Early stopping is simply invalid methodology in general: halting before the training loss bottoms out always underfits, so the reported number is unreliable no matter which data split you happen to monitor it on", "The learning rate has to be lowered whenever the test set drives early stopping, because a large step size interacts with the test curve and inflates its minimum; a small enough eta keeps the number honest", "Test sets can be used freely for early stopping as long as they are large, since a big test set averages out the random wiggle and its selected minimum then becomes an essentially unbiased estimate of the true performance", "The optimistic bias simply vanishes once you run enough boosting rounds, because the test curve flattens at the end and its minimum stops depending on noise, so the reported bottom is perfectly safe to quote"],
  explain: "Validation-style error curves wobble; picking their minimum retro-actively harvests downward noise. Do that on the TEST set and the reported number inherits the harvest — the set that chose the stopping round can no longer certify it (same disease as tuning any hyperparameter on test; n_estimators-via-early-stopping IS a hyperparameter). Clean protocol: three-way split — early-stop each fit on a validation slice (or fold-internal validation inside CV), select everything, then ONE final test evaluation. Subtlety inside CV: early stopping must use each fold's own internal validation, never the fold's test half. The bias is small when curves are smooth and test sets huge — but the protocol costs nothing and is never wrong.",
  simple: "Boosting's error on held-out data wiggles as rounds pass — down, down, wobble, up. 'Stop at the lowest wiggle' means you selected the moment the dice happened to favour you, and quoting that trough as your skill is quoting a lucky bounce. Do this on data whose whole job was to be the final untouched exam, and the exam is spent — it helped BUILD the model (it chose when to stop), so it can't grade it. Keep three rooms: train in one, watch-and-stop in the second, and grade exactly once in the third. The moment any number from a room influences the model, that room stops being an exam hall.",
  widget: {
    type: "curveStatic", title: "Harvesting the lucky wiggle",
    world: "Error curves across boosting rounds on validation and test. Early-stop on validation (the honest protocol), then compare what 'stop at test's own minimum' would have reported.",
    xlab: "boosting rounds →", xs: [0,1,2,3,4,5], labels: ["50","150","300","450","600","900"], dec: 1, yunit: "%",
    series: [
      { name: "validation error", ys: [16.2, 13.8, 12.9, 13.1, 13.6, 14.8] },
      { name: "test error", ys: [16.0, 14.1, 13.3, 12.7, 13.4, 14.9] }
    ],
    knob: { label: "Rounds", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 2, text: "Validation bottoms at round 300 (12.9): the honest protocol stops here and then reads TEST once — 13.3. That 13.3 is the reportable number.", tone: "info" },
      { max: 3, text: "Test's own curve happens to dip to 12.7 at round 450 — a wobble. 'Stop where test is lowest' would report 12.7: a number chosen BY the test set, no longer certified by it.", tone: "warn" },
      { max: 5, text: "🤯 The gap (13.3 vs 12.7) looks tiny — 0.6 points — but it's pure selection bias, it compounds with every other decision you let test data influence, and it's exactly how leaderboard scores rot. The stopping round is a hyperparameter; hyperparameters eat validation data, never test. Three rooms, one exam, once.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Early-stopping discipline", formula: "stop on VALIDATION curves · inside CV: fold-internal validation · test = one reading, at the end",
      text: "APIs make it easy to do right: eval_set/early_stopping_rounds with a val slice (XGBoost/LightGBM), validation_fraction (sklearn HistGB). The minimum of a curve you selected is not an unbiased estimate of anything." }
  }
}
];
