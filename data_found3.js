/* ML Foundations — Part III: Advanced Study. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).found3 = [

{
  q: "Adding features feels like it should always help — more information! Yet in high dimensions, distance-based reasoning quietly breaks. What is the 'curse of dimensionality' actually doing to your data?",
  choices: ["With many dimensions, all points become nearly equidistant and the space is almost empty — 'nearest' loses meaning and models need exponentially more data", "Computers cannot store more than 100 columns", "Features beyond 10 are always redundant", "Distances become negative", "It only affects image data"],
  explain: "Two effects compound. Volume explodes: covering a 1-D interval needs 10 samples; the same coverage in 10-D needs 10¹⁰ — your data becomes a few grains in an empty warehouse. Distances concentrate: the gap between the nearest and farthest neighbour shrinks relative to their magnitude, so 'closest' is barely closer than 'average'. Remedies: feature selection, dimensionality reduction (Topic 15), and models with structural assumptions that tame the emptiness.",
  simple: "Picture finding your nearest neighbour in a street (easy — next door), then in a city grid (harder), then in a 100-dimensional apartment complex where every flat differs in a hundred independent ways. Eventually EVERYONE differs from you in most ways, and everyone is roughly equally 'far'. Meanwhile the space is so vast that your thousand data points rattle around like dust in a cathedral. More columns can mean less usable geometry — one of ML's most counterintuitive truths.",
  widget: {
    type: "curveStatic", title: "Dust in a cathedral",
    world: "Fixed dataset of 1,000 points, dimensions added one batch at a time. Watch the nearest/farthest distance ratio collapse — and a kNN model's accuracy with it.",
    xlab: "dimensions →", xs: [0,1,2,3,4,5], labels: ["2","5","10","30","100","300"], dec: 2, yunit: "",
    series: [
      { name: "nearest ÷ farthest distance", ys: [0.12, 0.31, 0.52, 0.74, 0.9, 0.96] },
      { name: "kNN accuracy (÷100)", ys: [0.9, 0.88, 0.83, 0.71, 0.58, 0.52] }
    ],
    knob: { label: "Dimensions", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "In 2–5 dimensions the nearest neighbour is 3–8× closer than the farthest point — 'near' genuinely means something, and kNN thrives.", tone: "info" },
      { max: 3, text: "By 30 dimensions the ratio hits 0.74: your nearest neighbour is barely closer than a random stranger. Every distance-based judgement is fading.", tone: "warn" },
      { max: 5, text: "🤯 At 300 dimensions the ratio is 0.96 — nearest and farthest nearly indistinguishable — and kNN has sunk toward coin-flip. Nothing was wrong with any single feature; the GEOMETRY itself gave out. This is why dimensionality reduction is a survival skill, not a luxury.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The curse of dimensionality", formula: "volume grows exponentially · distances concentrate · data density → 0",
      text: "Bites hardest on distance methods (kNN, k-means, DBSCAN, RBF kernels). Antidotes: feature selection, PCA/UMAP, regularisation, and models with strong structural priors." }
  }
},

{
  q: "A colleague insists gradient boosting is simply 'the best algorithm' and should be used everywhere. What does the No-Free-Lunch theorem — and practical experience — say about universal best models?",
  choices: ["Averaged over all possible problems, every algorithm performs the same — a model only wins by matching ITS assumptions to THIS problem's structure, so benchmark several", "XGBoost is provably optimal on tabular data", "Neural networks are best once data exceeds 1M rows", "The best algorithm is whichever trains fastest", "Model choice is aesthetic; all perform identically on any given problem"],
  explain: "Wolpert's theorem: no learner dominates over the space of all problems — superiority on some datasets is paid for with inferiority on others. Every algorithm is a bundle of assumptions (linearity, axis-aligned splits, smoothness, cluster shapes), and it wins exactly where those assumptions hold. Practically: boosting often wins on messy tabular data because its assumptions fit that world — but linear models win on wide sparse text, kNN on small clean geometric data, and so on. Hence the discipline: quick benchmark of diverse families first, then invest in the leader.",
  simple: "Every model carries a worldview: linear models believe in straight trends, trees in thresholds, kNN in 'similar things behave similarly'. A model wins when the world agrees with its beliefs — and there's no belief that's right about every possible world (that's the theorem). So 'which model is best?' is like 'which tool is best?' — best FOR WHAT? The professional habit: run four cheap, different worldviews on your problem, see whose beliefs fit, and only then commit resources.",
  widget: {
    type: "curveStatic", title: "No belief fits every world",
    world: "Four model families benchmarked on four very different problems. Slide across the problems and watch the podium reshuffle — no line stays on top.",
    xlab: "problem →", xs: [0,1,2,3], labels: ["messy tabular","wide sparse text","small geometric","smooth trend + extrapolation"], dec: 0, yunit: "%",
    series: [
      { name: "gradient boosting", ys: [92, 78, 84, 70] },
      { name: "linear/logistic", ys: [81, 90, 76, 88] },
      { name: "kNN", ys: [76, 52, 90, 65] },
      { name: "random forest", ys: [90, 74, 85, 69] }
    ],
    knob: { label: "Problem", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Messy tabular data: boosting leads, as the folklore promises — thresholds, interactions and noise-robustness are exactly its assumptions.", tone: "info" },
      { max: 1, text: "Wide sparse text: the linear model wins by 12 points; trees waste splits on single words (and kNN drowns in dimensions). Same algorithms, new world, new podium.", tone: "info" },
      { max: 3, text: "🤯 The trend problem: LINEAR wins — trees can't extrapolate at all. Four problems, three different champions. 'Best algorithm' is a category error; 'best for this structure' is engineering.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "No Free Lunch", formula: "∀ learners: equal average performance over all problems — wins come from matched assumptions",
      text: "Practical form: cheap diverse baseline sweep first (linear, tree ensemble, kNN, maybe NB), then invest in what leads. Distrust anyone whose answer never depends on the data." }
  }
},

{
  q: "Two models tie at 87% validation accuracy: a 4-feature logistic regression and a 30-model stacked ensemble. Beyond the score, what does the principle of parsimony (Occam's razor) say about which to ship — and why?",
  choices: ["Prefer the simplest model that performs comparably — it's cheaper to run, easier to debug, explain and monitor, and more likely to hold up under change", "Always ship the ensemble — complexity signals quality", "Ship both and average them", "Neither — 87% is never shippable", "The choice is pure preference with no engineering consequences"],
  explain: "At equal measured performance, complexity is pure liability: more code paths to break, more retraining cost, slower inference, harder debugging, and explanations regulators and stakeholders can't follow. Simpler models also tend to degrade more gracefully under distribution shift — fewer finely-tuned interactions to invalidate. Operationalised: the one-standard-error rule (pick the simplest model within one SE of the best) and 'never deploy complexity the validation data can't justify'.",
  simple: "Two bridges hold the same weight; one uses 40 girders, the other 400 finely-balanced ones. Same test result — but every girder is something that can rust, cost, and confuse the next engineer. Model complexity is girders: if the scoreboard can't tell the two apart, the simple one is strictly better at everything the scoreboard doesn't measure — cost, debuggability, explainability, resilience. Complexity must PAY for itself in measured performance, or it's just risk wearing a lab coat.",
  widget: {
    type: "curveStatic", title: "Complexity must pay rent",
    world: "Five models of growing complexity on the same task: validation accuracy vs total cost of ownership (serving + maintenance + debugging, indexed). Find where accuracy stops paying for the girders.",
    xlab: "model →", xs: [0,1,2,3,4], labels: ["4-feat logistic","small tree","tuned forest","tuned XGBoost","30-model stack"], dec: 1, yunit: "",
    series: [
      { name: "validation accuracy (%)", ys: [87, 86.5, 88.5, 89, 89.3] },
      { name: "cost of ownership (indexed)", ys: [1, 2, 8, 15, 60] }
    ],
    knob: { label: "Model", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "The logistic model: 87%, cost 1, and every prediction explainable in a sentence. This is the bar the fancy models must beat — meaningfully.", tone: "info" },
      { max: 3, text: "Tuned XGBoost: +2 points for 15× the ownership cost. Whether that's a good trade depends on what 2 points are WORTH here — a real business question, not a modelling one.", tone: "info" },
      { max: 4, text: "🤯 The stack: +0.3 over XGBoost for 4× its cost — well within noise, and 60× the logistic model's burden. The razor's practical edge: demand that each layer of complexity buy a measurable, needed improvement. Here, most of it doesn't.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Parsimony (Occam's razor)", formula: "ship the simplest model within one standard error of the best",
      text: "Complexity is a loan against future maintenance. The one-SE rule (from Breiman's CART) makes the razor quantitative — and defensible in a design review." }
  }
},

{
  q: "A credit model shipped in 2023 with 91% validation accuracy quietly decays to 78% by 2026 — with no code changes at all. What happened, and what's the standing defence?",
  choices: ["Distribution shift: the world drifted away from the training data — defend with monitoring, scheduled retraining, and alerts on input/prediction distributions", "A slow memory leak corrupted the weights", "Validation accuracy was never real", "Users learned to read the model's mind", "Nothing can degrade a deployed model"],
  explain: "Models are snapshots of P(y|x) at training time. Economies, products, fraud tactics and user behaviour all move: covariate shift (inputs drift — new customer demographics), concept drift (the RULE changes — inflation alters what 'risky' means), label shift (class mix changes). The model didn't break; its world expired. Defences: log inputs and predictions, monitor their distributions against training baselines (PSI, KS tests), track live performance where labels arrive, retrain on schedule or on alert.",
  simple: "A 2023 map of a growing city is perfect in 2023, subtly wrong by 2024, and dangerous by 2026 — though not one line on the map changed. Deployed models are maps of a moving world. The professional posture isn't 'ship and forget' but 'ship and WATCH': compare today's incoming data against the data the model learned from, watch its live hit-rate where you can, and redraw the map (retrain) before the potholes become sinkholes.",
  widget: {
    type: "curveStatic", title: "The map and the moving city",
    world: "A deployed model across three years: live accuracy, and how far the incoming data has drifted from the training distribution. Note which curve moves FIRST.",
    xlab: "time since deployment →", xs: [0,1,2,3,4], labels: ["launch","6 mo","12 mo","24 mo","36 mo"], dec: 0, yunit: "",
    series: [
      { name: "live accuracy (%)", ys: [91, 90, 88, 83, 78] },
      { name: "input drift score (0–100)", ys: [2, 9, 21, 45, 68] }
    ],
    knob: { label: "Time", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Six months in: accuracy looks fine (90%) but the drift score has quadrupled — the inputs are already sliding. Drift is the smoke; accuracy loss is the fire.", tone: "info" },
      { max: 3, text: "24 months: drift 45, accuracy down 8 points. Teams that only watch accuracy discover problems HERE — a year after the leading indicator fired.", tone: "warn" },
      { max: 4, text: "🤯 The drift curve led the accuracy curve by 12–18 months the whole way. That lead time is the entire value of monitoring: retrain triggered by drift keeps the map current BEFORE customers meet the potholes. Deployment is where model work starts, not ends.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Distribution shift & model decay", formula: "monitor inputs (PSI/KS) + predictions + live metrics → retrain on alert/schedule",
      text: "Covariate shift, concept drift, label shift — different anatomies, same defence. Every serious ML system budgets for retraining from day one." }
  }
},

{
  q: "Two customers have IDENTICAL features; one churned, one stayed. However good your model gets, cases like these guarantee errors. What is this floor called, and why does chasing scores below it backfire?",
  choices: ["Irreducible (Bayes) error — the noise floor set by information your features don't carry; pushing past it means fitting noise, i.e. overfitting", "A data-entry bug — identical rows are impossible", "Underfitting — a deeper model would separate them", "Class imbalance", "A rounding artefact of accuracy"],
  explain: "With the features you HAVE, the best possible prediction for that feature-profile is a probability (say 60/40) — and even the perfect model then errs 40% on those cases. That floor, the Bayes error, is a property of the FEATURES-TARGET relationship, not the algorithm. A model scoring above the floor on training data is memorising noise. Lowering the floor requires new INFORMATION (better features, more signals), not more capacity. Estimating the floor (via human performance, or strong-model plateaus) tells you when a problem is done.",
  simple: "If two identical-looking coins land differently, no coin-inspector can ever be 100% right — the information to distinguish them simply isn't in what you can see. Every prediction problem has such a floor: the part of the outcome your features genuinely don't determine. The mature questions are 'where is the floor?' and 'am I near it?' — because past it, 'improvements' are the model hallucinating patterns in randomness. When several strong, diverse models all plateau at the same score, you've probably found the floor: stop tuning and go find NEW information.",
  widget: {
    type: "curveStatic", title: "Finding the floor",
    world: "One problem attacked by ever-stronger models, with the (unknowable-in-advance) Bayes floor drawn in. Watch validation plateau while training keeps 'improving' straight through the floor.",
    xlab: "modelling effort →", xs: [0,1,2,3,4], labels: ["baseline","tuned model","ensemble","mega-ensemble","+ NEW features"], dec: 0, yunit: "%",
    series: [
      { name: "validation accuracy", ys: [78, 84, 86, 86.3, 91] },
      { name: "training accuracy", ys: [80, 90, 95, 99, 96] },
      { name: "Bayes floor (with old features)", ys: [86.5, 86.5, 86.5, 86.5, 92.5] }
    ],
    knob: { label: "Effort stage", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 2, text: "Baseline → ensemble: validation climbs toward 86 and the gains shrink each step — the floor is near, and honest progress is decelerating.", tone: "info" },
      { max: 3, text: "The mega-ensemble: training 99%, validation +0.3. Everything past the floor is memorised noise dressed as progress. This is where tuning becomes theatre.", tone: "warn" },
      { max: 4, text: "🤯 Adding genuinely NEW features (payment history) MOVED THE FLOOR itself — validation jumps to 91, dwarfing months of model work. Capacity fights over the same information; new information changes what's possible. Know which battle you're in.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Irreducible (Bayes) error", formula: "error floor = uncertainty left in y given your features · new info moves it, capacity doesn't",
      text: "Estimate it via human expert performance or the plateau of diverse strong models. Below the floor, gains on training data are definitionally overfitting." }
  }
},

{
  q: "Order these correctly for an honest project: (a) touch the test set, (b) establish a baseline, (c) split the data, (d) iterate models/features on validation, (e) monitor in production. What is the canonical sequence — and the one unbreakable rule inside it?",
  choices: ["c → b → d → a → e, and the test set is touched exactly ONCE, at the very end", "b → c → d → a → e, touching test after each model change", "a → c → b → d → e — test first to set targets", "c → d → b → a → e, baseline last for comparison", "Order doesn't matter if cross-validation is used"],
  explain: "Split first (before ANY analysis — even looking can leak). Baseline second: the dumb rule every model must beat. Iterate third: all feature/model/hyperparameter decisions scored on validation folds, never test. Test ONCE: the final, already-chosen model gets its unbiased grade — using the test set repeatedly turns it into a second validation set, silently overfit by your choices. Then monitor, because deployment begins the decay clock. This sequence IS applied machine learning; the algorithms are interchangeable parts inside it.",
  simple: "It's exam protocol. Lock the final exam in a safe before revision starts (split). Check what a guess scores (baseline). Practise and improve on mock papers only (validation iteration). Sit the real exam ONCE — resitting it until you like the mark makes the mark meaningless (test once). Keep checking your skills stay sharp on the job (monitor). Every scandal in ML measurement — leaked benchmarks, overfit leaderboards, models that die in production — is a violation of one line of this protocol.",
  widget: {
    type: "curveStatic", title: "What repeated test-peeking does",
    world: "A team that re-scores on the test set after every change, vs one that iterates on validation and tests once. Both plotted against TRUE deployment performance.",
    xlab: "test-set evaluations used →", xs: [0,1,2,3,4], labels: ["1 (once)","5","20","50","200"], dec: 0, yunit: "%",
    series: [
      { name: "reported test score", ys: [86, 87, 89, 91, 94] },
      { name: "true deployment performance", ys: [86, 86, 86.5, 86, 85.5] }
    ],
    knob: { label: "Test evaluations", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Tested once: report says 86, deployment delivers 86. The number MEANT something because no decision ever depended on it.", tone: "info" },
      { max: 2, text: "Twenty peeks: the report drifts to 89 while reality sits still. Each 'keep the change if test improves' decision quietly fit the test set's noise.", tone: "warn" },
      { max: 4, text: "🤯 Two hundred peeks: reported 94, delivered 85.5 — an 8.5-point fiction, built without a single line of buggy code. The test set didn't measure the model anymore; it BECAME training data for your decisions. Guard it like the exam in the safe.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The honest ML workflow", formula: "split → baseline → iterate on validation → test ONCE → monitor",
      text: "The protocol outranks any algorithm. Public-leaderboard overfitting and dead-on-arrival production models are both this protocol, violated." }
  }
}
];
