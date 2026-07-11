/* Model Evaluation — Part III: Advanced Study. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).metrics3 = [

{
  q: "On a 0.5%-fraud dataset your model boasts ROC-AUC 0.97, yet analysts drown in false alarms. The PR curve tells the ugly truth. Why does ROC flatter while precision-recall exposes?",
  choices: ["ROC's false-positive RATE divides by the ocean of negatives, so thousands of false alarms barely move it — precision divides by YOUR ALERTS, where those same false alarms dominate", "PR-AUC simply drops the true negatives that dominate imbalanced data, so its precision numbers come out mechanically smaller, while ROC keeps those easy negatives -- PR is merely the gloomier of two equally valid views", "On rare-positive data both ROC axes shrink toward zero together, so the curve hugs the top-left corner and looks flawless, whereas precision stays put and only appears to tell a darker story", "ROC-AUC scores every model against a 0.5 no-skill line while PR scores against the tiny positive rate, so the same model is read on two scales and only PR's harsher yardstick looks bad", "ROC measures how the scores rank cases while precision measures how well they are calibrated, so an accurate ranker with drifted probabilities earns a high AUC yet a low precision at once"],
  explain: "FPR = FP / all-negatives: with 199,000 negatives, 2,000 false alarms is FPR 1% — invisible on the ROC's x-axis. Precision = TP / (TP+FP): with 900 true catches and those same 2,000 false alarms, precision is 31% — two of three alerts are wasted analyst time. Same errors, different denominators; only precision's denominator matches the workload your team experiences. Rule: heavy imbalance + you care about the positive class → PR curve and average precision (PR-AUC), with ROC-AUC as a secondary ranking sanity check.",
  simple: "ROC grades false alarms against everyone who COULD have been falsely accused — one wrongful arrest per 100,000 innocents, gold star. Your analysts grade false alarms against the arrests actually made — two of every three arrests wrongful, catastrophe. Identical policing, two denominators. When positives are rare, the innocent ocean makes any false-alarm count look tiny to ROC, while the alert queue — the thing your team actually processes — is mostly noise. Judge rare-event models by what's IN the queue: precision and the PR curve.",
  widget: {
    type: "curveStatic", title: "Two denominators, two verdicts",
    world: "One model, thresholds swept. At each recall level, compare the metric each curve reports — and the alert queue your analysts would face.",
    xlab: "recall (fraud caught) →", xs: [0,1,2,3,4], labels: ["50%","70%","85%","95%","99%"], dec: 0, yunit: "%",
    series: [
      { name: "precision (of alerts, real)", ys: [78, 55, 31, 12, 3] },
      { name: "ROC's view: 100 − FPR", ys: [99.9, 99.7, 99, 96.5, 88] }
    ],
    knob: { label: "Recall target", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "At 70% recall ROC still reads 99.7 ('virtually no false-positive rate!') while precision has already sunk to 55% — nearly half the queue is noise.", tone: "info" },
      { max: 3, text: "95% recall: FPR is a saintly 3.5%, and precision is 12% — eight junk alerts per real fraud. Both numbers are TRUE; only one describes your analysts' Tuesday.", tone: "warn" },
      { max: 4, text: "🤯 99% recall: precision 3%. The ROC curve barely flinched the whole way — its denominator (199k negatives) absorbed every mistake. Under heavy imbalance, ROC-AUC answers 'can it rank?'; PR answers 'can we afford to act on it?'. Ship decisions on the second.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "PR vs ROC under imbalance", formula: "FPR = FP/N_neg (flattered by the ocean) · precision = TP/(TP+FP) (your queue)",
      text: "sklearn: precision_recall_curve, average_precision_score. Baseline for PR-AUC is the positive rate (0.5% here!) — not 0.5. Report both curves; decide on PR." }
  }
},

{
  q: "A 5-class ticket classifier scores F1: micro 0.86, macro 0.61, weighted 0.83. Why do the three averages disagree so badly — and which one is watching your rare classes?",
  choices: ["Micro pools all decisions (majority classes dominate), macro averages per-class scores EQUALLY (rare classes count full weight), weighted sits between — macro is the rare-class watchdog", "Micro averages the per-class F1 scores equally while macro pools all predictions so big classes dominate, and weighted is the odd one out -- even after the swap, macro still tracks the rare classes best", "The three disagree only because the classes are imbalanced; on balanced data all three collapse to one value, so the spread here just restates the class-frequency skew and carries no further meaning", "Weighted-F1 multiplies each class by its frequency and so up-weights the rare classes, making it the real minority watchdog, while macro's equal averaging quietly hands the majority classes the loudest vote", "Micro-F1 always lands between macro and weighted by construction, so reading any single one of the three tells you the other two, and the rare classes are covered whichever number you happen to report"],
  explain: "Micro-F1 aggregates every prediction into one global count — a class with 60% of the traffic contributes 60% of the influence (for single-label classification micro-F1 equals accuracy). Macro computes F1 per class then averages the five NUMBERS: the 1%-of-traffic class counts exactly as much as the 60% one, so its 0.15 F1 drags the average to 0.61. Weighted re-multiplies per-class F1 by class frequency — mostly echoing the majority. The gap micro−macro is itself a diagnostic: big gap = your small classes are failing. Choose by what the product needs: overall throughput (micro) vs every-category-must-work (macro).",
  simple: "Three ways to grade a school. Micro: pool every exam answer in the building — the giant year-groups decide the grade. Macro: grade each CLASS separately, then average the report cards — the five-student class counts as much as the five-hundred-student one. Weighted: report cards averaged by class size — the giants again. Your school scores 86 by pooling but 61 by report cards: the tiny classes are failing, invisibly to any size-weighted view. Which grade is 'right'? Depends whether tiny classes matter to the mission. If they do, macro is the only honest number.",
  widget: {
    type: "curveStatic", title: "Who drags the average",
    world: "Per-class F1 for the five ticket types (sorted by traffic share), with the three averages as reference lines. Slide across the classes and see who each average listens to.",
    xlab: "class (traffic share) →", xs: [0,1,2,3,4], labels: ["billing (60%)","login (20%)","bugs (12%)","refunds (7%)","legal (1%)"], dec: 2, yunit: "",
    series: [
      { name: "per-class F1", ys: [0.93, 0.88, 0.72, 0.38, 0.15] },
      { name: "micro-F1 (pooled)", ys: [0.86, 0.86, 0.86, 0.86, 0.86] },
      { name: "macro-F1 (equal-vote)", ys: [0.61, 0.61, 0.61, 0.61, 0.61] }
    ],
    knob: { label: "Class", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Billing + login = 80% of traffic at F1 ≈ 0.9 — micro is essentially their private property: pooled counting equals traffic-share voting.", tone: "info" },
      { max: 3, text: "Refunds: F1 0.38. Micro hasn't moved (7% of traffic can't budge a pooled count), but macro — where refunds own a full fifth of the vote — is bleeding.", tone: "warn" },
      { max: 4, text: "🤯 Legal: 1% of tickets, F1 0.15, probably the class with lawyers attached. Micro-F1 0.86 says 'ship it'; macro 0.61 says 'the categories that rarely appear — and most matter — are broken'. The 25-point micro-macro gap IS the finding. Always read per-class F1 before any average.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Micro vs macro vs weighted averaging", formula: "micro: pool counts (≈accuracy) · macro: mean of per-class scores · weighted: frequency-weighted mean",
      text: "sklearn: f1_score(average='micro'|'macro'|'weighted') and classification_report for the per-class table. Big micro−macro gap = minority classes failing." }
  }
},

{
  q: "Two weather models both hit 83% accuracy, but model A says '90%' when it rains and model B says '55%'. Accuracy can't see the difference. Which metrics grade the PROBABILITIES themselves, and on what principle?",
  choices: ["Log-loss and the Brier score — proper scoring rules, minimised only by reporting your true belief, so they reward calibrated confidence and punish confident errors savagely", "RMSE and mean absolute error on the predicted probabilities -- regression-style losses that shrink as the numbers approach the labels, so they reward tighter forecasts and punish any large gap directly", "AUC together with average precision -- both read the probabilities directly, so a model that ranks perfectly but states wildly overconfident numbers will still be caught and scored down by them", "Cross-entropy accuracy and a confusion-matrix F1 taken at the argmax -- these look past the raw numbers to the final call, rewarding the model whose hard predictions land right most often", "Calibration error alone -- since a perfectly calibrated model must also minimise every other probability loss, the gap between stated and actual frequencies is a complete and sufficient grade"],
  explain: "Brier = mean (p − y)²; log-loss = −mean log p(true class). Both are PROPER: your expected score is optimised by announcing your genuine probability — hedging or exaggerating always costs in expectation, so they're unfakeable. Temperaments differ: log-loss explodes toward infinity as confident errors approach p→0 (one 99.9%-wrong prediction can dominate a test set) — brutal but attentive to tails; Brier is bounded and gentler. Use them when probabilities feed decisions (pricing, triage, betting odds); pair with calibration curves to see WHERE the probabilities bend. Accuracy/AUC only see the ranking or the argmax — an overconfident and a calibrated model can tie on both.",
  simple: "A forecaster who says '90% rain' when it rains 60% of the time is lying with confidence — and accuracy can't catch them, because accuracy only checks the umbrella decision, not the number. Proper scoring rules grade the NUMBER: they're designed so the best possible long-run score comes from saying exactly what you believe — inflate or hedge and you bleed points, mathematically guaranteed. Log-loss is the ruthless version: one 'IMPOSSIBLE!' that then happens costs more than a hundred mild mistakes. If anything downstream multiplies, prices or bets on your probabilities, grade the probabilities — with a rule that can't be gamed.",
  widget: {
    type: "curveStatic", title: "The cost of confident nonsense",
    world: "The penalty each rule assigns to ONE prediction as your stated confidence in the true class varies. Watch what happens to loud wrongness under log-loss.",
    xlab: "stated P(true class) →", xs: [0,1,2,3,4,5], labels: ["1%","10%","30%","50%","80%","99%"], dec: 2, yunit: "",
    series: [
      { name: "log-loss penalty", ys: [4.61, 2.3, 1.2, 0.69, 0.22, 0.01] },
      { name: "Brier penalty", ys: [0.98, 0.81, 0.49, 0.25, 0.04, 0.0] }
    ],
    knob: { label: "Stated confidence in the truth", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 0, text: "You said 1% — and it happened. Log-loss: 4.61, worth ~23 average predictions. Brier: 0.98, bounded at 1. Same sin, very different tempers.", tone: "warn" },
      { max: 3, text: "At 50% both penalties are moderate — honest uncertainty is affordable under either rule. That affordability is the point: hedging when GENUINELY unsure is never punished.", tone: "info" },
      { max: 5, text: "🤯 The asymmetry is the design: going from 80%→99% confidence saves you 0.21 log-loss when right, but costs 2.3 extra when wrong. Announce 99% only if it's TRUE 99 times in 100 — that's what 'proper' means: the maths makes your honest belief your best strategy. Unfakeable metrics for numbers that must be trusted.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Proper scoring rules", formula: "log-loss = −log p(truth) · Brier = (p−y)² — honesty is the optimal policy",
      text: "sklearn: log_loss, brier_score_loss. Log-loss for training/tails, Brier for bounded reporting. Pair with calibration_curve to locate WHERE probabilities bend." }
  }
},

{
  q: "On 95/5 imbalanced data, a junk model scores: accuracy 0.95, F1(positive) 0.42 — and MCC ≈ 0.0. Matthews correlation called the bluff. What makes MCC the hardest single number to fool?",
  choices: ["It's the correlation between predicted and true labels using ALL FOUR confusion cells, symmetrically — so it's high only when BOTH classes are predicted well, and any degenerate strategy scores ≈ 0", "It rescales plain accuracy onto a -1 to 1 axis, so a familiar 95% simply becomes about 0.90, and the negative end just flags a model that is systematically worse than random guessing", "It deliberately ignores the huge true-negative cell and focuses only on the three cells involving the rare positive class, which is exactly why the base rate can no longer inflate the score", "It equals the F1 score whenever precision and recall match, but unlike F1 it also folds in specificity, so balanced and imbalanced models all end up on one common comparable scale", "It reports the geometric mean of sensitivity and specificity, so a model that neglects either class is dragged all the way toward zero, and only genuinely strong performance on both directions can lift it near one"],
  explain: "MCC = (TP·TN − FP·FN) / √((TP+FP)(TP+FN)(TN+FP)(TN+FN)) — literally Pearson correlation between the binary prediction and truth vectors. Every cell participates: 'predict all negative' zeroes TP and FN's partner terms → MCC 0; 'predict all positive' likewise. F1, by contrast, never looks at TN, so it can be gamed on the negative side and flips value if you relabel which class is 'positive'; accuracy is a hostage to the base rate. MCC = 1 perfect, 0 = no better than chance, −1 = perfectly wrong. Under imbalance, or when both classes matter, it's the strongest single-number summary — with kappa its chance-corrected cousin.",
  simple: "Every simple metric has a blind spot a lazy model can hide in: accuracy never checks the rare class, F1 never checks the negatives. MCC checks the entire ledger — hits, misses, false alarms, correct rejections — and asks one unfudgeable question: 'do your predictions actually CORRELATE with reality?'. Predict 'no' for everyone and your predictions are a constant — a constant correlates with nothing, score zero, bluff called. It rewards nothing except genuinely tracking both classes at once. If the report only has room for one number on imbalanced data, make it this one.",
  widget: {
    type: "curveStatic", title: "One number that checks the whole ledger",
    world: "Four models on the 95/5 data — from degenerate to genuinely good — scored by all three metrics. Watch which metrics can be bluffed, and which can't.",
    xlab: "model →", xs: [0,1,2,3], labels: ["always 'no'","always 'yes'","random 50/50","genuine model"], dec: 2, yunit: "",
    series: [
      { name: "MCC", ys: [0, 0, 0.01, 0.71] },
      { name: "accuracy", ys: [0.95, 0.05, 0.5, 0.96] },
      { name: "F1 (positive class)", ys: [0, 0.1, 0.09, 0.74] }
    ],
    knob: { label: "Model", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "'Always no': accuracy 0.95 (bluff working), F1 0 (caught — no positives predicted), MCC 0 (caught — constant predictions correlate with nothing).", tone: "info" },
      { max: 2, text: "'Always yes' and random: MCC pins both at ≈0. Note F1 gives 'always yes' a free 0.1 — recall is perfect and F1 never audits the 95% of negatives mislabelled. Every metric except MCC has SOME degenerate friend.", tone: "warn" },
      { max: 3, text: "🤯 The genuine model: accuracy 0.96 — one point above the do-nothing bluff (accuracy's scale is broken here) — while MCC leaps 0→0.71, a scale on which zero MEANS zero skill. Chance-anchored, both-classes-audited, single number: that's why MCC headlines imbalanced benchmarks.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Matthews correlation coefficient", formula: "MCC = correlation(ŷ, y) from all four cells · 0 = chance, ±1 = perfect/inverted",
      text: "sklearn: matthews_corrcoef. Cohen's kappa is the chance-corrected relative; both resist base-rate bluffs that accuracy and (one-sided) F1 fall for." }
  }
},

{
  q: "Your model's '80% confident' predictions are correct only 65% of the time. The calibration curve makes this visible — and Expected Calibration Error (ECE) makes it one number. How are they built?",
  choices: ["Bin predictions by stated confidence; per bin, plot stated vs ACTUAL frequency (curve below diagonal = overconfident) — ECE is the traffic-weighted average gap between the two", "Sort predictions by confidence and plot cumulative recall against cumulative volume; the more the curve bows above the diagonal the better calibrated it is, and ECE is the area beneath it", "Bin the predictions by confidence, then plot each bin's precision against its recall; a curve sagging below the diagonal means overconfidence, and ECE sums those precision-recall gaps over the bins", "Plot the model's accuracy against training epochs and watch where validation peels away; ECE is the vertical distance between train and validation confidence at the epoch of best fit", "Rank every prediction, split it into deciles, and compare each decile's mean score to the global base rate; ECE is how far the top decile's confidence sits above that overall positive rate"],
  explain: "Reliability diagram: bucket test predictions by confidence (e.g. 10 bins), compute each bin's mean stated probability vs empirical positive rate, plot pairs; the diagonal is perfect honesty. ECE = Σ (bin weight × |stated − actual|): the average size of the lie, weighted by how often it's told. Diagnosis reads shape: below diagonal = overconfident (deep nets, boosted trees, NB); S-shaped = under-confident at extremes (bagged/averaged models). Remedy: fit Platt/isotonic on VALIDATION scores (CalibratedClassifierCV) — cheap post-processing that straightens the curve without touching ranking. Audit calibration whenever a human or system treats scores as real probabilities.",
  simple: "Round up every '80% sure' claim the model ever made and check: how many came true? If it's 65%, the model exaggerates — and now you can SEE it: plot claimed-vs-true for each confidence level and honest models hug the diagonal; braggarts sag below it. ECE compresses the picture: 'on average, claims are off by 6 points'. The repair is almost anticlimactic — a lookup table learned on held-out data ('when it says 80, read 65') that translates the model's dialect into honest percentages. But you can't fix — or trust — what you haven't plotted.",
  widget: {
    type: "curveStatic", title: "Claimed vs true, bin by bin",
    world: "A boosted model's reliability curve before and after isotonic calibration, against the diagonal of perfect honesty. Slide across the confidence bins.",
    xlab: "model's stated confidence →", xs: [0,1,2,3,4], labels: ["10%","30%","50%","70%","90%"], dec: 0, yunit: "%",
    series: [
      { name: "perfectly honest (diagonal)", ys: [10, 30, 50, 70, 90] },
      { name: "after calibration", ys: [11, 29, 50, 69, 88] },
      { name: "raw model: actually correct", ys: [4, 21, 44, 58, 71] }
    ],
    knob: { label: "Confidence bin", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "The raw model's '30%' claims come true 21% of the time — even its DOUBTS are exaggerated. The whole raw curve sags below the diagonal: the signature of systematic overconfidence.", tone: "info" },
      { max: 3, text: "'70%' claims: true 58% of the time — a 12-point lie in the range where triage decisions live. ECE totals these gaps, weighted by bin traffic: raw ECE ≈ 0.11.", tone: "warn" },
      { max: 4, text: "🤯 After isotonic calibration the curve hugs the diagonal (ECE 0.013) — and not one prediction changed RANK: same ROC-AUC, same ordering, honest numbers. Calibration is a translation layer, not a new model. Whenever scores feed thresholds, prices or people, audit first, calibrate second, trust third.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Calibration curves & ECE", formula: "bin by confidence → |stated − actual| per bin → ECE = weighted mean gap",
      text: "sklearn: calibration_curve + CalibratedClassifierCV (isotonic needs ~1k+ points; Platt for less). Averaging models (forests) under-confide; boosting/NB over-confide — know your model's dialect." }
  }
},

{
  q: "You report 'test accuracy 94.2%' from 500 test rows. A reviewer asks for the uncertainty. Bootstrap gives 94.2% ± 2.1 — and suddenly your 'improvement' over last quarter's 93.1% looks shaky. How does the bootstrap produce that interval, and what's the lesson?",
  choices: ["Resample the test set with replacement thousands of times, recompute the metric each time, and read the spread of results — any single test score is one draw from that spread, so differences inside it are noise", "Retrain the model on a thousand fresh random splits of the data, collect the accuracy from every run, and take the width of that spread as the uncertainty on your single reported score", "Divide the observed accuracy by the square root of the test-set size to get a standard error, then widen the point estimate by two of those on each side to form the interval you report", "Draw a thousand brand-new test sets from live production traffic, score the frozen model separately on each one, and report the middle 95% of those fresh scores as the confidence interval around the reported metric", "Perturb each stored prediction by a small amount of Gaussian noise, rescore many times, and read the resulting spread; the wider it turns out, the less you should trust the headline accuracy"],
  explain: "Your 500 test rows are one sample from the case universe; a different 500 would give a different score. Bootstrap simulates that: draw 500 rows WITH replacement from the test set, recompute accuracy, repeat ~10,000 times (seconds — no retraining, the predictions are fixed); the 2.5th–97.5th percentiles form a 95% CI. Here: [92.1%, 96.3%]. Last quarter's 93.1% sits comfortably inside — the 'improvement' is indistinguishable from resampling luck. For honest model comparison: bootstrap the DIFFERENCE on the same rows (paired), which nets out shared difficulty. Small test sets make wide intervals: 94.2% on 500 rows knows less than 93.5% on 50,000.",
  simple: "Measuring accuracy on 500 cases is polling 500 voters: informative, but a different 500 would say something different, and pretending otherwise is how teams celebrate noise. The bootstrap asks 'what would other test sets of 500 have said?' by reshuffling the one you have — drawing 500 rows with repeats, rescoring, ten thousand times. The scores fan out into a bell, and that bell's width is your honest error bar: 94.2 ± 2.1. Last quarter's 93.1 is inside the bell — so the party is premature. One free habit — error bars on every reported metric — quietly prevents most false victories.",
  widget: {
    type: "curveStatic", title: "The bell behind the number",
    world: "Bootstrap distribution of your test accuracy (10,000 resamples of the 500 rows), shown as percentiles — with last quarter's model marked. Slide through the distribution.",
    xlab: "percentile of bootstrap distribution →", xs: [0,1,2,3,4], labels: ["2.5th","25th","50th","75th","97.5th"], dec: 1, yunit: "%",
    series: [
      { name: "your model's accuracy", ys: [92.1, 93.4, 94.2, 95.0, 96.3] },
      { name: "last quarter's score (fixed)", ys: [93.1, 93.1, 93.1, 93.1, 93.1] }
    ],
    knob: { label: "Percentile", min: 0, max: 4, step: 1, init: 2 },
    insights: [
      { max: 0, text: "2.5th percentile: 92.1%. A fifth of plausible test sets would have scored your model BELOW last quarter's number. That fact was invisible in '94.2%'.", tone: "warn" },
      { max: 2, text: "The median matches your reported 94.2 — the point estimate isn't wrong, it's just alone: a coordinate without a confidence region.", tone: "info" },
      { max: 4, text: "🤯 The full 95% interval [92.1, 96.3] swallows last quarter's 93.1 whole — on this evidence the models are statistically indistinguishable. The stronger test (bootstrapping the paired DIFFERENCE) might still separate them; the point estimate never could. Numbers without intervals aren't findings; they're anecdotes with decimals.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Bootstrap confidence intervals", formula: "resample test rows with replacement → metric distribution → percentile CI",
      text: "Free (no retraining), works for any metric. Compare models by bootstrapping the paired difference on shared rows. Interval width ∝ 1/√n: budget test sets accordingly." }
  }
}
];
