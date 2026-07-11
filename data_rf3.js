/* Random Forests — Part III: Advanced Study. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).rf3 = [

{
  q: "A forest's feature_importances_ ranks a random 10,000-level customer ID hash ABOVE genuinely predictive features. What bias in impurity-based importances does this expose?",
  choices: ["High-cardinality features offer thousands of candidate cut points, so they win splits by sheer opportunity — impurity importance rewards splitting OPPORTUNITY, not real signal; permutation importance on held-out data is the fix", "The hash secretly encodes customer value", "Forests cannot handle categorical data", "Importances must be normalised first", "The forest needed more trees"],
  explain: "At each split the tree searches all candidate thresholds; a feature with 10,000 distinct values offers ~10,000 chances to find a spuriously good split on the training sample, while a binary flag offers one. Summed over a forest, the lottery-ticket feature piles up impurity credit — on TRAINING data. Permutation importance evaluates on held-out data: shuffle the ID column and accuracy doesn't drop (it never generalised), so its importance reads ≈0. Standing advice: treat feature_importances_ as a training-time split log, and audit anything decision-relevant with permutation importance (plus drop-column tests for finality).",
  simple: "Buy ten thousand lottery tickets and you'll win something — it proves nothing about your luck. A 10,000-value ID column buys ten thousand candidate cut points per split; SOME cut will fit the training data's noise, every time, so the column racks up 'importance' like a gambler bragging about gross winnings and hiding the losses. The audit is simple: on data the forest never trained on, scramble that column — if accuracy doesn't budge, the feature was never doing real work. Scramble income instead and watch the model collapse. Grade features by damage-when-removed, not by splits-won.",
  widget: {
    type: "curveStatic", title: "Gross winnings vs net worth",
    world: "Four features scored two ways: impurity importance (training split log) vs permutation importance (held-out damage test). Slide across the features and watch the ranking invert.",
    xlab: "feature →", xs: [0,1,2,3], labels: ["ID hash (10k levels)","income","age","has_mortgage (binary)"], dec: 2, yunit: "",
    series: [
      { name: "impurity importance", ys: [0.34, 0.28, 0.22, 0.16] },
      { name: "permutation importance", ys: [0.01, 0.41, 0.27, 0.19] }
    ],
    knob: { label: "Feature", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "The ID hash: impurity crowns it #1 (0.34); permutation reads 0.01 — shuffling it on held-out data changes nothing, because nothing real was ever learned from it.", tone: "warn" },
      { max: 2, text: "Income and age: modest split-credit (fewer cut points to win with), but shuffling them craters held-out accuracy — the honest definition of importance.", tone: "info" },
      { max: 3, text: "🤯 The binary flag placed LAST on impurity (one candidate split — no lottery tickets at all) yet holds solid permutation value. The impurity ranking wasn't just noisy; it was systematically inverted by cardinality. Any importance number that never touched held-out data is a training anecdote.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Cardinality bias in importances", formula: "impurity credit ∝ split opportunities · permutation importance = held-out damage when shuffled",
      text: "sklearn: permutation_importance(model, X_val, y_val). Also drop high-cardinality IDs entirely — they're leakage bait as well as importance bait." }
  }
},

{
  q: "Income and savings correlate at 0.9. Permutation importance gives income 0.31 and savings 0.02 — yet dropping BOTH craters the model far more than 0.33 suggests. What's the correlated-features trap, and its remedy?",
  choices: ["Shuffling one twin lets the model lean on the other, hiding shared signal — permute or drop correlated features as a GROUP to measure their joint contribution", "Permutation importance is simply broken", "Savings truly carries no information", "The forest should be retrained per feature", "Correlation only affects linear models"],
  explain: "Permutation importance asks 'what breaks if THIS column scrambles — everything else intact?'. With a 0.9-correlated partner intact, the model's trees route around the damage: savings-based splits substitute for income-based ones, so each twin individually looks droppable while the PAIR is load-bearing. This isn't a bug — it answers the marginal question exactly; it's the question that's wrong for correlated features. Remedies: permute correlated CLUSTERS together (group importance), drop-column retraining per group, or inspect a dendrogram of feature correlations first (sklearn docs demonstrate exactly this workflow). Report 'the income-savings group: 0.35', not two misleading singles.",
  simple: "Two stagehands hold up the same backdrop. Send either one on a break and the show runs fine — the other holds it alone. Conclude 'neither matters', send BOTH on break, and the set crashes down. Individual importance tests measure 'what if only this one leaves?' — the wrong question for teammates doing one shared job. Test the TEAM: shuffle both columns together and the model's collapse reveals their true joint weight. Correlated features must be audited as groups, or the audit will cheerfully tell you every member of a load-bearing team is expendable.",
  widget: {
    type: "curveStatic", title: "Stagehands covering for each other",
    world: "Held-out accuracy as different things get permuted: each twin alone, both together, and an honestly-independent feature for scale.",
    xlab: "what gets permuted →", xs: [0,1,2,3,4], labels: ["nothing","income only","savings only","BOTH twins","age (independent)"], dec: 1, yunit: "%",
    series: [
      { name: "held-out accuracy", ys: [91, 88.2, 90.8, 74, 84] }
    ],
    knob: { label: "Permutation target", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Income alone shuffled: −2.8 points. Looks minor — because savings (0.9-correlated) is still standing, and the trees quietly reroute through it.", tone: "info" },
      { max: 2, text: "Savings alone: −0.2. By the marginal test, savings is decorative. Both twins now look individually expendable. The audit is about to lie by omission.", tone: "warn" },
      { max: 3, text: "🤯 Both twins together: −17 points — five times the SUM of their solo damages. The shared signal was invisible to every one-at-a-time question. Group your correlated features (correlation dendrogram), permute per group, and report group importances. Solo numbers for teammates are fiction.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Group permutation importance", formula: "importance(correlated set) ≠ Σ importance(members) — permute the set jointly",
      text: "Workflow: cluster features by correlation → pick group representatives or permute clusters → report at group level. sklearn's docs walk this exact recipe." }
  }
},

{
  q: "A 500-tree forest almost never says '0%' or '100%' — its probabilities huddle between 10% and 90%, and reliability curves show an S-shape. Why does AVERAGING cause this signature, and when must you correct it?",
  choices: ["Unanimity is nearly impossible across 500 diverse trees, so averaged votes shrink toward the middle — under-confidence at the extremes; calibrate (isotonic/Platt) when downstream decisions consume the raw probabilities", "Forests are overconfident like boosting", "The trees vote strategically to avoid extremes", "This is perfect calibration by construction", "Probabilities need temperature scaling during training only"],
  explain: "Each tree votes from its own bootstrap sample and feature subsets; even on a case that's truly 98% positive, a decorrelated committee has dissenters — averaged, the forest outputs ~0.85. The vote-share compresses true extremes toward the centre: the OPPOSITE dialect from boosting/NB (overconfident). Consequences: rankings are fine (AUC unaffected — the compression is monotone-ish), but thresholds set at 0.9, expected-cost formulas, and risk prices all misfire. Fix: CalibratedClassifierCV(forest, method='isotonic') on validation data — it stretches the S back onto the diagonal without touching the ordering. Rule: any model's probabilities inherit the personality of its aggregation; audit before you arithmetic.",
  simple: "Ask 500 independent-minded experts and you will never get 500-to-0 — someone always dissents, however clear the case. So a committee's vote share tops out around 85-90% even for near-certainties: the committee is systematically too MODEST at the extremes (where a lone braggart model like boosting is too loud). The ranking of cases is still excellent — modesty is applied fairly to everyone — but the moment someone uses the raw number ('block transactions above 95%'), the modesty becomes a bug: nothing ever reaches 95%. The repair is the usual translator, learned on held-out data: 'when the committee says 85, reality says 96'.",
  widget: {
    type: "curveStatic", title: "The modest committee",
    world: "Reliability curve of the raw forest vs after isotonic calibration. Note the S-shape: too high at the bottom, too low at the top — averaging's fingerprint.",
    xlab: "stated P(positive) →", xs: [0,1,2,3,4], labels: ["10%","30%","50%","70%","90%"], dec: 0, yunit: "%",
    series: [
      { name: "actually positive (raw forest)", ys: [3, 22, 50, 79, 97] },
      { name: "after isotonic calibration", ys: [10, 29, 50, 71, 90] }
    ],
    knob: { label: "Stated probability", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "When the forest says 10%, reality is 3% — even its LOW votes are pulled toward the middle. (Boosting's curve bends the other way: know your model's dialect.)", tone: "info" },
      { max: 3, text: "Stated 70% → true 79%; stated 90% → true 97%. The forest never claims what it actually knows — a threshold at 0.95 would fire on nothing, ever.", tone: "warn" },
      { max: 4, text: "🤯 Isotonic calibration stretches the S onto the diagonal — same trees, same ranking, same AUC, honest numbers. One held-out-data lookup table separates 'good ranker' from 'usable probability engine'. Averaging bought you stability; calibration buys back the extremes.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Forest probability compression", formula: "diverse committee ⇒ vote shares shrink from 0/1 · isotonic on validation restores the diagonal",
      text: "Under-confidence (forests, bagging) vs over-confidence (boosting, NB, deep nets) — aggregation style writes the calibration signature. Audit with calibration_curve before consuming raw scores." }
  }
},

{
  q: "The OOB score promises 'free cross-validation' — each tree judged on the ~37% of rows its bootstrap missed. When is that promise honest, and in which two situations does OOB mislead?",
  choices: ["Honest for large forests on i.i.d. rows; misleading with FEW TREES (each row judged by a tiny, noisy sub-committee) and with GROUPED/temporal rows (a patient's other rows sit in training, so OOB inherits the leak)", "OOB is always exactly equal to 5-fold CV", "OOB overestimates error in all cases", "OOB only works for regression forests", "It fails only when classes are imbalanced"],
  explain: "Each row's OOB prediction aggregates only the trees that didn't sample it — ~37% of the forest. With 500 trees that's ~185 votes: a stable committee, and OOB tracks CV closely for free (no refits). With 30 trees it's ~11 votes: high-variance estimates that typically UNDERSTATE the full forest's skill (fewer voters than production will use). Deeper trap: OOB's honesty assumes rows are exchangeable — if the same patient/customer/day contributes many rows, a row's near-duplicates sit inside the very bootstraps being 'held out from', and OOB inherits exactly the leakage that GroupKFold exists to prevent. Rule: OOB replaces KFold, never GroupKFold/TimeSeriesSplit.",
  simple: "OOB's trick: every tree ignored about a third of the rows, so let those ignored rows be that tree's exam — free testing, no extra training. Two ways the trick sours. Small forest: each row's exam is marked by only a handful of trees — a committee of 11 giving noisy, slightly harsh grades for a forest that will deploy 500 strong. Related rows: if patient #7's OTHER visits are inside the training bootstraps, the 'held-out' visit is being examined by trees that practically memorised the patient — the exam is rigged, exactly the rig that grouped cross-validation was invented to prevent. Free is real; unconditional it is not.",
  widget: {
    type: "curveStatic", title: "Free exams, two asterisks",
    world: "OOB score vs proper evaluation in two regimes: sweeping tree count on i.i.d. data (asterisk one), then the grouped-data comparison at 500 trees (asterisk two, shown at far right as OOB vs GroupKFold truth).",
    xlab: "forest size → (far right: grouped-data case)", xs: [0,1,2,3,4], labels: ["30 trees","100","500","500 (i.i.d. truth)","500, grouped rows"], dec: 1, yunit: "%",
    series: [
      { name: "OOB score", ys: [83.1, 85.8, 86.9, 86.9, 91.5] },
      { name: "honest evaluation (KFold / GroupKFold)", ys: [86.0, 86.6, 87.0, 87.0, 84.2] }
    ],
    knob: { label: "Regime", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "30 trees: OOB reads 83.1 vs honest 86.0 — each row was graded by ~11 trees, a noisier and weaker committee than the full forest anyone will actually use.", tone: "info" },
      { max: 3, text: "500 trees, i.i.d. rows: OOB 86.9 vs CV 87.0 — the free lunch is real. This is OOB's home turf: big forest, exchangeable rows, zero extra fits.", tone: "info" },
      { max: 4, text: "🤯 Grouped rows (5 rows per customer): OOB claims 91.5 while GroupKFold reveals 84.2 — the 'held-out' rows were examined by trees trained on their siblings. OOB answers 'new ROW?' but production asks 'new CUSTOMER?'. Free CV inherits your data's dependence structure; it doesn't absolve it.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "OOB score: scope and limits", formula: "OOB ≈ KFold for many trees + i.i.d. rows · never a substitute for GroupKFold/TimeSeriesSplit",
      text: "oob_score=True costs nothing at ≥200 trees. The moment rows share a source or a timeline, evaluation design — not OOB — must carry the honesty." }
  }
},

{
  q: "Isolation Forest flips the forest idea to hunt anomalies WITHOUT labels: random splits, and a score based on each point's average PATH DEPTH. Why does depth measure weirdness?",
  choices: ["Random splits corner an isolated outlier in a few cuts, while points deep in dense crowds need many — short average path = easy to isolate = anomalous", "Deeper paths indicate anomalies", "It measures distance to the nearest centroid", "The trees vote on a learned 'anomaly' class", "Path depth measures feature importance per point"],
  explain: "Each isolation tree recursively picks a random feature and a random threshold, partitioning until points sit alone. A point far outside the data mass gets cornered fast — the first few random cuts likely separate it (few candidate cuts fall INSIDE a dense crowd, many fall in the empty space around an outlier). A point inside a tight cluster shares every early cell with hundreds of neighbours, needing many more cuts. Average depth over ~100 random trees, normalise, invert: the anomaly score. Beauties: no labels, no distances (so no scaling agony), O(n log n), and subsampling (256 rows/tree) actually HELPS. The forest machinery of 'many cheap random partitioners, averaged' — repurposed from prediction to isolation.",
  simple: "Play twenty questions with random yes/no cuts against a crowd of points. A hermit living alone in the far corner of the map is cornered in two or three lucky cuts — almost ANY random line separates empty space. Someone standing in the middle of a packed stadium shares every cut with thousands of others; isolating them takes ages. So 'how many random cuts until you're alone?' is a weirdness meter needing no labels and no notion of distance: hermits average short games, crowd-dwellers long ones. Run a hundred random games and trust the average — bagging logic, aimed at outliers instead of predictions.",
  widget: {
    type: "curveStatic", title: "How fast can randomness corner you?",
    world: "Average isolation depth across 100 random trees for five points, from a deep-cluster dweller to an extreme outlier — with the resulting anomaly score.",
    xlab: "point →", xs: [0,1,2,3,4], labels: ["cluster core","cluster edge","between clusters","mild outlier","extreme outlier"], dec: 1, yunit: "",
    series: [
      { name: "average path depth (cuts)", ys: [12.4, 10.1, 7.2, 4.8, 2.3] },
      { name: "anomaly score ×100", ys: [31, 38, 52, 67, 88] }
    ],
    knob: { label: "Point", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Core and edge points: 10–12 random cuts to isolate — every early cut lands them in a cell still teeming with neighbours. Long games = ordinary.", tone: "info" },
      { max: 3, text: "The mild outlier: 4.8 cuts on average. Emptiness around a point is opportunity for random lines — isolation speed IS local density, measured without ever computing a distance.", tone: "info" },
      { max: 4, text: "🤯 The extreme outlier: 2.3 cuts — random lines can hardly MISS it. No labels, no scaling worries, n log n on millions of rows, and each tree only ever saw 256 samples. The same two ideas that built the random forest — cheap randomness, averaged — here answer a question nobody labelled.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Isolation Forest", formula: "anomaly score ∝ 2^(−avg depth / expected depth) — short paths = outliers",
      text: "sklearn: IsolationForest(contamination=…). First-reach tool for unlabelled tabular anomaly detection; contrast one-class SVM (shape-based) and PCA error (linear normality)." }
  }
},

{
  q: "A demand-forecasting forest predicts 120 units, but ops needs 'we're 90% sure demand ≤ X' to set safety stock. Quantile Regression Forests answer this. What do they keep that ordinary forests throw away?",
  choices: ["Each leaf's full SET of training targets (not just their mean) — pooling those across trees gives a whole predictive distribution, from which any quantile is read off", "They train 99 separate forests, one per percentile", "They add Gaussian noise to each prediction", "They bootstrap the predictions at inference time", "They require labelled quantiles during training"],
  explain: "A regression forest's leaf normally stores one number — the mean of its training targets — and the forest averages leaf-means: a point estimate, with the spread discarded at source. QRF (Meinshausen 2006) stores each leaf's raw target list; at prediction time, a new case drops through all trees and pools every raw target it reaches into a weighted empirical distribution. Median = robust point forecast; 5th/95th percentiles = honest prediction interval; P(demand > 150) = read the tail. Crucially the intervals are HETEROSCEDASTIC — wide where training data was volatile, narrow where it was consistent — unlike a global ±RMSE band. sklearn ecosystem: quantile-forest package or HistGradientBoosting(loss='quantile') per-quantile.",
  simple: "An ordinary forest interviews hundreds of similar past days and reports only the average: '120 units'. But ops isn't asking for the average — they're asking about the BAD day: 'what's the most demand we might plausibly see?'. The average threw that answer away. The fix: keep the interviews. Every leaf remembers the actual demands of its past days; pool a few hundred of them for today's case and you hold a whole crowd of plausible outcomes — read the middle for a forecast, the 95th percentile for safety stock, any tail probability you like. Same trees; the leaves just stopped summarising prematurely.",
  widget: {
    type: "curveStatic", title: "Keep the crowd, not just its average",
    world: "The pooled leaf-target distribution for one Tuesday's forecast, read as quantiles — versus the single number an ordinary forest would report. Note the asymmetry: demand's upside risk is longer than its downside.",
    xlab: "quantile →", xs: [0,1,2,3,4], labels: ["5th","25th","50th","75th","95th"], dec: 0, yunit: " units",
    series: [
      { name: "QRF predictive distribution", ys: [78, 103, 118, 138, 172] },
      { name: "ordinary forest (mean only)", ys: [120, 120, 120, 120, 120] }
    ],
    knob: { label: "Quantile", min: 0, max: 4, step: 1, init: 2 },
    insights: [
      { max: 1, text: "5th percentile: 78 units — on a slow Tuesday like the training ones, demand fell this low. The mean-only forest contains no trace of this number.", tone: "info" },
      { max: 2, text: "Median 118 vs mean 120: close here, but the median shrugs off the freak spikes that drag means around — a sturdier point forecast for free.", tone: "info" },
      { max: 4, text: "🤯 95th percentile: 172 — the safety-stock answer ops actually asked for, 43% above the point forecast, and reflecting THIS case's volatility (a calmer product line would show a tighter fan). The information was in the leaves all along; ordinary forests average it into silence. Distributions > points, whenever decisions have asymmetric costs.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Quantile Regression Forests", formula: "leaves keep raw targets → pooled empirical distribution → any quantile/interval",
      text: "quantile-forest (sklearn-compatible) or GradientBoosting/HistGB with loss='quantile' per level. Heteroscedastic intervals: wide where the past was wild, narrow where it was calm." }
  }
}
];
