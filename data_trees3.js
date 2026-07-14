/* Decision Trees — Part III: Advanced Study. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).trees3 = [

{
  q: "On bag-of-words text (30,000 sparse 0/1 columns), decision trees lag far behind plain logistic regression — reversing the usual tabular story. What makes wide, sparse data tree-hostile?",
  choices: ["Each split can consult only ONE word, and evidence in text is spread thinly across thousands of words — a linear model sums all those tiny clues at once; a tree would need thousands of levels", "Decision trees cannot process columns that are overwhelmingly zeros, so the extreme sparsity of a 30,000-word matrix starves every candidate split of usable signal and the tree effectively never gets off the ground", "Text features first have to be scaled to unit variance before a tree will work at all, and bag-of-words counts left completely raw make the impurity calculation wildly unreliable at every candidate split", "The gini criterion is simply undefined, mathematically, for binary 0/1 word features, so a tree grown on one-hot word columns must fall back on far weaker heuristics to choose all of its splits", "Sparse matrices quietly overwhelm most tree implementations, which densify them internally, so 30,000 columns exhaust available memory long before the tree can ever find the words that matter"],
  explain: "Text classification is the sum of many weak signals: each word nudges the verdict slightly. A linear model is EXACTLY that — a weighted sum over all 30,000 columns simultaneously. A tree consumes evidence one feature per split; capturing 500 weak word-signals needs a path asking about 500 words, but paths are short and greedy splitting can't even find weak features (each single word barely reduces impurity alone). Structural mismatch, not a tuning problem — which is why NB/LR/linear-SVM ruled text for decades, and why trees rule dense tabular data where individual features are strong.",
  simple: "A verdict on an email is a democracy of thousands of tiny votes — every word nudges a little. A linear model tallies the whole election in one pass. A tree holds a bizarre sequential referendum: 'does it contain viagra? … now does it contain winner? …' — one word per question, and it can only ask a few hundred questions. Worse, no SINGLE word looks important enough to ask about first. The tree isn't badly tuned; it's the wrong shape for evidence that lives in the sum rather than in any individual feature.",
  widget: {
    type: "curveStatic", title: "Democracy vs twenty questions",
    world: "Text task where the signal is spread across N weak word-features. Sweep how concentrated vs diffuse the signal is and watch the tree and the linear model trade places.",
    xlab: "signal spread across how many words →", xs: [0,1,2,3,4], labels: ["3 strong words","20","200","2,000","20,000"], dec: 0, yunit: "%",
    series: [
      { name: "logistic regression", ys: [90, 90, 89, 88, 87] },
      { name: "decision tree", ys: [93, 86, 74, 63, 55] }
    ],
    knob: { label: "Signal spread", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Signal in 3 strong words: the TREE wins — three crisp splits nail it, and thresholds are its native art. Concentration favours trees.", tone: "info" },
      { max: 2, text: "200 weak words: the tree is down 15 — its greedy splitter can't even identify which single word to ask about, since none reduces impurity much alone.", tone: "warn" },
      { max: 4, text: "🤯 20,000 words each whispering: linear 87, tree 55. The linear model literally IS 'sum all whispers'; the tree structurally cannot be. Model choice by data shape: dense + strong features → trees; wide + diffuse evidence → linear. (Boosted SHALLOW trees split the difference — many trees, each grabbing a few words.)", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Trees vs wide sparse data", formula: "tree: one feature per split, depth-bounded · linear: weighted sum over ALL features at once",
      text: "The deep reason text pipelines default to linear/NB models and tabular pipelines to tree ensembles. Match the aggregation style to where the evidence lives." }
  }
},

{
  q: "You've grown a tree and want the right ccp_alpha. sklearn hands you cost_complexity_pruning_path() with a list of candidate alphas. What is the canonical selection procedure from there?",
  choices: ["For each candidate alpha, cross-validate a tree pruned at that alpha; pick the alpha with the best CV score (or the simplest within one SE) and refit on all training data", "Pick the candidate alpha that leaves the tree with the fewest leaves, since the whole point of pruning is to make the final tree as small and readable as it can possibly be", "Choose the single largest alpha that still keeps training accuracy pinned firmly at 100%, so you prune away only those branches that were never really contributing much to the fit", "Simply average all of the candidate alphas the path returns and then prune the fully grown tree exactly once, in one pass, at that single averaged value", "Skip the whole search entirely and just set alpha to 0.01, the one universal default that works perfectly acceptably across essentially every dataset"],
  explain: "The pruning path is the exact sequence of alphas where the optimal subtree changes — evaluating anything between them is redundant, so the candidate list is finite and complete. Loop: for each alpha, fit/prune, score by k-fold CV; plot score vs alpha. Choose the max — or apply the one-standard-error rule and take the SIMPLEST tree within one SE of the max, buying interpretability and shift-robustness for statistically-invisible cost. Then refit that alpha on the full training set. It's the standard hyperparameter ritual, with the twist that the algorithm itself enumerates the only alphas worth trying.",
  simple: "Pruning strength is a dial, but not a continuous one: as you turn it, the tree only changes at specific click-points — and sklearn tells you exactly where the clicks are. So the search is honest and finite: at each click, ask held-out data 'how good is this tree?'. The scores rise (noise-branches removed), peak, then fall (real branches removed). Take the peak — or, wiser, the SIMPLEST tree that's statistically tied with the peak: when two trees can't be told apart on evidence, the smaller one is cheaper, clearer, and sturdier.",
  widget: {
    type: "curveStatic", title: "Click through the pruning path",
    world: "The pruning path's candidate alphas, each cross-validated. Find the peak — then see what the one-standard-error rule chooses instead, and why.",
    xlab: "candidate ccp_alpha (path order) →", xs: [0,1,2,3,4,5], labels: ["0","0.0008","0.003","0.009","0.02","0.08"], dec: 1, yunit: "",
    series: [
      { name: "CV accuracy (%)", ys: [84.2, 87.1, 88.9, 88.6, 86.0, 78.5] },
      { name: "leaves in the tree", ys: [61, 34, 15, 8, 4, 1] }
    ],
    knob: { label: "Path position", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "First clicks: CV rises as pure noise-branches fall away — 27 leaves gone, accuracy UP 3 points. Those branches were memorisation, certified by held-out data.", tone: "info" },
      { max: 3, text: "The peak sits at alpha 0.003 (15 leaves, 88.9%). But look one click right: 8 leaves at 88.6% — within one standard error, i.e. statistically the same performance at half the size.", tone: "info" },
      { max: 5, text: "🤯 The one-SE choice: the 8-leaf tree — printable on a slide, explainable to a regulator, LESS likely to lean on fragile micro-patterns — for a difference (0.3) smaller than the noise in the measurement. When the scoreboard can't distinguish, complexity is the tiebreaker, and it always votes 'smaller'.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "CV over the pruning path", formula: "cost_complexity_pruning_path → CV each alpha → max (or simplest within 1 SE) → refit",
      text: "The path enumerates every alpha where the subtree changes — the search space is exact, not sampled. The one-SE rule is Breiman's own recommendation from the CART book." }
  }
},

{
  q: "A tree must learn 'risky when debt exceeds a third of income' from raw debt and income columns. It builds a big, mediocre staircase. Adding ONE engineered column fixes everything. Which, and why is this a general principle for trees?",
  choices: ["The RATIO debt/income — a tree can only cut axis-by-axis, so a diagonal rule costs dozens of splits, while the precomputed ratio makes it ONE split", "A duplicate copy of the income column, which lets the tree split on income from two angles at once and so reach the risk rule faster", "Debt squared, since raising debt to a power bends the axis so that the diagonal risk rule straightens out into something a single clean split can readily capture", "A column of pure random noise, which acts as a regulariser that stops the tree from carving its wasteful, wobbly staircase at all", "The SUM debt+income, since adding the two columns collapses them onto one axis, turning the diagonal threshold into a single clean cut"],
  explain: "The rule debt > income/3 is a diagonal line in (debt, income) space; axis-aligned splits can only approximate diagonals with staircases whose accuracy is bought leaf by data-hungry leaf. The column ratio = debt/income transforms the diagonal into the axis-parallel rule ratio > 0.33 — one split, perfectly placed, generalising cleanly. General principle: trees excel at thresholds ON the features you give them; any relationship that lives BETWEEN features (ratios, differences, rates, durations) should be handed over precomputed. This is why domain-driven ratio features dominate winning tabular pipelines even with boosted trees.",
  simple: "Trees ask questions about one column at a time. 'Is debt over a third of income?' involves two columns at once — so the tree fakes it with a staircase of one-column questions: 'debt over 20k? income under 50k? debt over 30k?…' — expensive, wobbly, and wrong between the steps. Compute debt÷income yourself and the forbidden two-column question becomes a legal one-column question: 'ratio over 0.33?' — one clean cut. You know which combinations matter in your domain; the tree doesn't. Precompute the combinations; let the tree do what it's great at — finding the threshold.",
  widget: {
    type: "curveStatic", title: "One column, one cut",
    world: "The same credit task with and without the engineered ratio column, across tree depth budgets. Note what the ratio does to the depth REQUIRED.",
    xlab: "max depth allowed →", xs: [0,1,2,3,4], labels: ["1","2","4","8","16"], dec: 0, yunit: "%",
    series: [
      { name: "with debt/income column", ys: [89, 91, 92, 92, 91] },
      { name: "raw debt & income only", ys: [61, 68, 77, 84, 86] }
    ],
    knob: { label: "Depth budget", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Depth 1: WITH the ratio, one split scores 89% — the entire rule fits in a single question. Raw columns at depth 1: 61%, one step of a long staircase.", tone: "info" },
      { max: 2, text: "The raw-column tree climbs slowly, spending every extra level buying more stairs — and each stair fits fewer training points than the last.", tone: "info" },
      { max: 4, text: "🤯 Even at depth 16 the raw tree (86%) never catches the depth-1 ratio tree (89%) — and its staircase wobbles under resampling while 'ratio > 0.33' is rock-stable. One engineered column beat fifteen levels of structure. Feature engineering isn't a garnish for trees; it's how you tell them where to look.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Engineered ratios for trees", formula: "cross-feature rules (x/y, x−y, rates) → precompute → diagonal becomes one axis cut",
      text: "Applies to forests and boosting too — they inherit axis-aligned splits. Ratios, differences, velocities and durations are the highest-yield tabular features." }
  }
},

{
  q: "Compliance requires: 'higher income must never DECREASE the approval score'. Your tree ensemble occasionally violates this on odd segments. Modern libraries offer a clean fix. What is it?",
  choices: ["Monotonic constraints: declare income as monotone-increasing and the trainer only accepts splits whose predictions respect the direction — enforced by construction, not post-hoc patching", "Delete income from the model entirely: with the very feature that keeps violating the rule removed from the inputs, the ensemble simply can no longer produce a monotonicity breach on any segment", "Round income into nice clean bins of 10k before any training, so the much coarser feature can no longer wiggle up and down within a narrow slice and thereby break the required direction", "Add a dedicated post-processing layer that detects any single violating prediction and quietly flips it straight back into line, guaranteeing a monotone output without any retraining", "Retrain the whole ensemble over and over with fresh random seeds until you finally land on a run whose splits happen, purely by luck, to respect the income direction everywhere"],
  explain: "Trees fit noise-pockets: in some sliver, richer applicants in the TRAINING data happened to default more, and the tree learns a locally-decreasing step. Monotonic constraints (XGBoost/LightGBM monotone_constraints, sklearn HistGradientBoosting monotonic_cst) modify training itself: any candidate split whose two leaf values would violate the declared direction is rejected/clipped, and the guarantee holds over the whole feature range — provable, auditable, no exceptions. Cost: a small accuracy price for smoother, domain-consistent behaviour; often it IMPROVES test performance by blocking noise-chasing. This is domain knowledge entering the model as a constraint rather than a feature.",
  simple: "The training data contains flukes — a handful of wealthy defaulters in one corner — and a flexible tree dutifully learns 'income 80–85k: slightly riskier', which is noise, embarrassing, and possibly illegal to act on. A monotonic constraint is a house rule during training: 'whatever splits you make, the income direction may never point down'. The trainer then simply refuses fluke-splits that would break the rule. You lose the model's freedom to chase those flukes (good riddance) and gain something rare in ML: a mathematical guarantee about the model's behaviour you can hand to an auditor.",
  widget: {
    type: "curveStatic", title: "The house rule",
    world: "Approval score vs income, from an unconstrained ensemble (see the noise-dips) and a monotone-constrained one. Same data, one added rule at training time.",
    xlab: "applicant income (£k) →", xs: [0,1,2,3,4,5], labels: ["20","40","60","80","100","140"], dec: 0, yunit: "",
    series: [
      { name: "constrained score", ys: [22, 38, 51, 62, 71, 84] },
      { name: "unconstrained score", ys: [22, 40, 48, 66, 60, 85] }
    ],
    knob: { label: "Income", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 2, text: "Around £60k the unconstrained model DIPS (48 after 40 at £40k... then back up): a training-noise pocket, learned as if real. Try explaining that dip to a declined applicant.", tone: "warn" },
      { max: 4, text: "£80k→£100k: the unconstrained score drops 66→60 — a straight compliance violation ('earn more, score less'). The constrained curve rises through the same region, by construction.", tone: "warn" },
      { max: 5, text: "🤯 The constrained model isn't a patched version of the other — it TRAINED differently, rejecting every noise-split that pointed the wrong way. Test accuracy: within 0.4 points. You bought a provable guarantee with statistical pocket change. Constraints are how domain truth outranks training-set flukes.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Monotonic constraints", formula: "declare direction per feature → violating splits rejected during growth",
      text: "XGBoost/LightGBM: monotone_constraints=(1,0,-1,…); sklearn: HistGradientBoosting(monotonic_cst=…). Use for prices, risk scores, dosages — anywhere domain direction is law." }
  }
},

{
  q: "A tree-based model forecasts daily sales. With random K-fold CV it scores 94%; deployed, it collapses to 71%. The features include 7-day rolling averages. Where did the evaluation lie?",
  choices: ["Random folds put FUTURE days in training while 'predicting' past days — and rolling features straddle fold boundaries — so CV rehearsed with tomorrow's newspaper; use time-based splits (TimeSeriesSplit)", "The tree was simply too shallow to capture temporal structure, so raising its maximum depth and adding a handful more lag and rolling features would have closed almost the entire gap between the two scores", "The 94% was little more than a rounding artefact of one unusually tiny validation set, and a properly larger held-out sample would surely have reported something much closer to the real 71%", "Sales that genuinely move with time cannot be modelled by trees at all well, since their flat leaf predictions can never track a series that keeps steadily trending upward year on year", "The rolling averages were simply never scaled to one common range, and a tree fed these unscaled window features silently overfits them badly, thereby inflating the reported CV score"],
  explain: "Two leaks compound. Shuffled folds ignore time's arrow: the model trains on June while 'predicting' March — interpolation between known dates, not forecasting. And windowed features (rolling means, lags) computed over the full series carry future values into training rows near boundaries. Deployment offers neither luxury: the future is genuinely absent. Honest protocol: TimeSeriesSplit / walk-forward validation (train on past, validate on the NEXT block, roll forward), and compute windowed features causally (each row uses only its own past). The 23-point gap was the difference between interpolation and forecasting.",
  simple: "Shuffling time data before splitting is handing the student a history exam where half the 'future' questions were in the revision pack — of course they ace it. The model wasn't forecasting; it was filling gaps BETWEEN dates it had already seen, with rolling-average features that had literally averaged-in tomorrow. Real deployment is the one exam where the future is guaranteed absent, and the score fell to what forecasting actually earns. The fix is embarrassingly simple: always train on the past, test on the future, roll forward — the way time actually works.",
  widget: {
    type: "curveStatic", title: "Rehearsing with tomorrow's newspaper",
    world: "The same pipeline evaluated four ways, against its true deployment performance. Watch the reported score converge to reality as the evaluation respects time.",
    xlab: "evaluation scheme →", xs: [0,1,2,3], labels: ["random K-fold","random + causal feats","TimeSeriesSplit","walk-forward"], dec: 0, yunit: "%",
    series: [
      { name: "reported score", ys: [94, 87, 78, 73] },
      { name: "true deployment score", ys: [71, 71, 71, 71] }
    ],
    knob: { label: "Scheme", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Random folds: 94 reported vs 71 real — a 23-point fiction. Both leaks active: future rows in training, future values inside the rolling features.", tone: "warn" },
      { max: 2, text: "Fixing the features (causal windows) cuts the lie to 16 points; fixing the SPLITS (TimeSeriesSplit) cuts it to 7. Each respects a different half of time's arrow.", tone: "info" },
      { max: 3, text: "🤯 Walk-forward — train on months 1–12, test on 13, roll — reports 73 vs reality's 71. The remaining 2 points are honest optimism (retraining cadence), not leakage. On temporal data, the SPLIT design matters more than the model: a worse model honestly evaluated beats a better one evaluated on fiction.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Temporal validation", formula: "train past → test future · TimeSeriesSplit / walk-forward · causal feature windows",
      text: "Applies to any data with time (churn, fraud, demand). Grouped data has the same disease (GroupKFold): rows that share a source must share a fold-side." }
  }
},

{
  q: "Final judgement: when should you reach for a tree/tree-ensemble, and when for a linear model? Distil the whole topic into the honest decision guide.",
  choices: ["Trees: thresholds, interactions, mixed/messy tabular data, no scaling worries. Linear: wide sparse data, smooth additive trends, extrapolation, small samples, and when coefficients must be explained", "Always reach for trees: across essentially every modern tabular benchmark the boosted-tree ensembles win so consistently and by such margins that fitting a linear model is rarely worth the bother anymore", "Always reach for linear models first: trees are essentially a dated legacy technique now, and a well-regularised linear fit matches or beats them on any dataset that actually matters in practice", "Use trees whenever the task happens to be classification and linear models whenever it is instead regression, since each family was originally designed around just one of those two problem types", "Just flip a fair coin between the two: on average across most datasets their accuracy comes out virtually identical, so the choice only ever affects raw training speed, never quality"],
  explain: "Trees (and their ensembles) natively capture thresholds ('risk jumps above 0.33'), interactions (effect of X depends on Y), and mixed types — no scaling, no encoding gymnastics — and dominate dense messy tabular problems. Linear models win where their shape fits: additive smooth effects, wide sparse features (text!), tiny datasets (fewer parameters), targets that trend beyond the training range (trees flatline), and settings where 'one unit of X adds w to the score' must be defended to a human. The professional default: try both cheap, read the learning curves, and remember the answer is a property of the DATA, not of fashion.",
  simple: "Two artists: the tree draws in straight-edged blocks — brilliant at cliffs, corners and 'it depends' rules, hopeless beyond the edge of what it saw. The linear model draws in smooth slopes — brilliant at trends, sums of many small clues, and continuing a line past the data, hopeless at cliffs unless you pre-draw them (feature engineering). Your dataset is a landscape: is it cliffs or slopes? Dense strong columns or thousands of whispers? Must the model explain itself in coefficients, or extrapolate into next year? Answer those, and the model chooses itself.",
  widget: {
    type: "curveStatic", title: "The decision guide, scored",
    world: "Tree ensembles vs linear models scored (0–100 typical suitability) across six situations. Slide through and watch the lead change — the pattern IS the guide.",
    xlab: "situation →", xs: [0,1,2,3,4,5], labels: ["dense tabular, interactions","wide sparse text","must extrapolate trend","300-row dataset","explain to regulator","messy mixed types"], dec: 0, yunit: "",
    series: [
      { name: "tree ensemble", ys: [93, 55, 25, 60, 55, 92] },
      { name: "linear model", ys: [72, 90, 88, 85, 92, 63] }
    ],
    knob: { label: "Situation", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Dense tabular with interactions: trees 93 — thresholds and 'it depends' rules are their native tongue, and boosting sharpens it further.", tone: "info" },
      { max: 2, text: "Extrapolation: trees 25 — leaf averages flatline outside the training range, full stop. A trend that continues belongs to a model with a slope.", tone: "info" },
      { max: 5, text: "🤯 Neither line dominates: three situations each. That's the entire lesson of model selection — 'which is better?' has no answer, 'which fits THIS data's shape?' always does. Cheap benchmark of both, learning curves, then commit.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Trees vs linear: the decision guide", formula: "cliffs/interactions/messy → trees · sparse/smooth/extrapolate/explain → linear",
      text: "The two families' failure modes are complementary — which is why NB-LR hybrids, linear-in-leaves models, and 'linear + boosted residuals' stacks keep winning in practice." }
  }
}
];
