/* Why-wrong notes: Model Evaluation (metrics), Performance Optimisation (perf). Keyed by exact question stem; one entry per distractor, same order as choices[1..]. */
(function () {
  var W = (window.WHYNOT = window.WHYNOT || {});

  /* ===== metrics ===== */

  W["Out of every prediction a classifier makes, what fraction did it get right? Which metric is this?"] = [
    "That's precision — it looks only at the flagged pile, not at every prediction the model made.",
    "That's recall — caught positives out of actual positives, ignoring the negatives entirely.",
    "Balancing precision against recall is the F1 score's job, not a simple correct-over-total count.",
    "That's prevalence, a fact about the data itself — it says nothing about the model's predictions."
  ];

  W["Of all the genuinely negative cases (the truly innocent), what fraction did the model correctly clear? Which metric is this?"] = [
    "Sensitivity (recall) measures the truly POSITIVE cases caught, not the negatives correctly cleared.",
    "Precision judges the flagged pile — how many positive calls were right — not the true negatives.",
    "Prevalence is how common the condition is in the data; it describes the dataset, not model behaviour.",
    "Fallout is actually the FALSE-POSITIVE rate, and either way it counts errors, not correct clearances."
  ];

  W["In a probabilistic classifier, what is the decision 'threshold'?"] = [
    "That's a deployment quality bar, not the cutoff that turns a probability score into a yes/no label.",
    "That's accuracy, a measured result — the threshold is a setting you choose, not a score you compute.",
    "That's the break-even point on a precision-recall curve; the threshold can be set anywhere, not just there.",
    "The threshold is a cutoff you choose for decisions, not a limit on what scores the model can produce."
  ];

  W["A classifier's predictions are compared against the truth. Every single prediction lands in one of exactly four buckets. Which four?"] = [
    "Those four words are ingredients, not buckets — outcomes pair truth with verdict to give TP, FN, FP, TN.",
    "Those are metrics computed FROM the four counts, not the raw outcome categories themselves.",
    "Those are rates derived from the counts — and dropout is a neural-net trick, not an outcome at all.",
    "A binary classifier has no 'neutral' or 'unclassified' bucket; every prediction lands in one of four cells."
  ];

  W["Your fraud model scores 96% accuracy. Then you learn 96% of all transactions are legitimate. What has the model necessarily proven?"] = [
    "Accuracy pools both classes; the model could miss every fraud and still hit 96% on the legit majority alone.",
    "Precision on fraud could be anything, even 0% — overall accuracy says nothing about the flagged pile.",
    "The naive 'always legit' baseline also scores 96%, so the model hasn't shown it beats doing nothing.",
    "Accuracy blends the two error types; a 96% score is fully compatible with wildly lopsided errors."
  ];

  W["Of all the emails your filter FLAGGED as spam, what fraction really were spam? Which metric is this?"] = [
    "Sensitivity (recall) asks how many of the REAL spams were caught, not how trustworthy the flags are.",
    "F-measure blends precision with recall into one number; the question asks only about the flagged pile.",
    "Fall-out is the false-positive rate — legit mail wrongly flagged — not the share of flags that were right.",
    "Detection rate is another name for recall: real spams caught, not the correctness of what was flagged."
  ];

  W["Ten emails arrive; four are really spam. Of those four real spams, how many did the filter catch? Which metric asks this?"] = [
    "Precision asks how many FLAGGED emails were really spam; here we start from the real spams instead.",
    "The miss rate counts the real spams that slipped through — the complement of catching, not the catch fraction.",
    "Fall-out is the false-positive rate on legitimate mail; it never looks at the real spams at all.",
    "Lift compares a model's hit rate against random targeting; it isn't the caught fraction of actual positives."
  ];

  W["You lower the flag cutoff to catch more real cases. As recall rises, what does precision typically do — and why?"] = [
    "The extra flags come partly from negatives, so false alarms grow and dilute the flagged pile — both can't rise.",
    "Precision depends directly on the cutoff: lenient flagging adds false positives to its denominator, so it moves.",
    "A lower cutoff also sweeps in real negatives, not only true positives, so the new flags include false alarms.",
    "At 100% recall precision equals the base rate (everything flagged), not zero — it falls, but not to nothing."
  ];

  W["A model has precision 100% but recall 20%. Its F1 score is about 33%, far below the 60% average. Why is F1 built to punish this?"] = [
    "F1 is the harmonic mean 2PR/(P+R), not an arithmetic average cut in half — there's no halving step.",
    "F1 weights precision and recall equally; the low score comes from the harmonic mean, not favouring recall.",
    "F1 isn't a bare product — plain multiplication of 1.0 and 0.2 would give 20%, not the 33% F1 reports.",
    "There is no capping rule; the drag toward the smaller value falls naturally out of the harmonic-mean formula."
  ];

  W["Precision 100%, recall 20% again. Arithmetic mean says 60%; harmonic mean (F1) says 33%. What property of the harmonic mean causes the difference?"] = [
    "The harmonic mean never takes a geometric mean; it's 2PR/(P+R) — the reciprocal of the average of reciprocals.",
    "F1's harmonic mean treats precision and recall symmetrically; unequal weighting is the separate F-beta variant.",
    "Squaring then averaging is a quadratic (RMS-style) mean, which favours the LARGER number — the opposite pull.",
    "The harmonic mean inverts, averages, then correctly inverts back — that's its definition, not a bug."
  ];

  W["Two deployments of one cancer-screening model: clinic A hates missed cancers; clinic B is drowning in follow-up costs from false alarms. Who should run which cutoff?"] = [
    "Accuracy ignores WHICH errors happen; neither clinic's problem is total errors, so one accuracy-optimal cutoff fits neither.",
    "Backwards: raising A's cutoff creates more missed cancers, and lowering B's creates more of the alarms it can't afford.",
    "The cutoff is a free per-deployment dial; forcing one shared setting throws away the ability to match each clinic's costs.",
    "0.5 is just a default with no relation to either clinic's error costs; the cutoff is exactly the lever meant to absorb them."
  ];

  W["A ROC curve plots a model's behaviour as the cutoff sweeps from strict to lenient. What exactly are its two axes?"] = [
    "Precision against recall is the PR curve, a different plot; ROC's x-axis is the false-positive rate.",
    "The threshold isn't an axis — it's the hidden parameter swept along the curve; each cutoff gives one (FPR, TPR) point.",
    "Close, but ROC plots sensitivity against 1 − specificity (the false-positive rate), not specificity itself.",
    "Precision appears nowhere on a ROC plot; the y-axis is the true-positive rate."
  ];

  W["Model A has ROC-AUC 0.93; model B has 0.71. Without picking any threshold, what does that difference tell you?"] = [
    "AUC is threshold-free; it says nothing about behaviour at any particular cutoff like 0.5.",
    "AUC differences don't translate point-for-point into accuracy, and certainly not at every cutoff.",
    "AUC measures ranking order only, not how far apart the scores are or how calibrated they are.",
    "ROC-AUC doesn't determine the PR curve; under imbalance a higher-AUC model can still lose regions of PR space."
  ];

  W["A colleague's model reports ROC-AUC = 0.5. What have they built?"] = [
    "AUC 0.5 is about ranking pairs, not accuracy; on imbalanced data a model can label most cases right and still score 0.5.",
    "Erring equally on both classes is about error balance; AUC 0.5 instead means the ranking is no better than chance.",
    "Calibration is about probabilities matching reality — a different property; AUC 0.5 says the ranking itself is worthless.",
    "No cutoff can help: every point along a diagonal ROC curve is equally uninformative."
  ];

  W["A batch run produced: 8 caught (TP), 2 false alarms (FP), 4 missed (FN), 26 correct passes (TN). Compute the precision."] = [
    "67% is 8/12 — that's the recall, using the misses (FN) in the denominator instead of the false alarms.",
    "85% is (8+26)/40 — the overall accuracy, not the flagged-pile question precision asks.",
    "73% is roughly the F1 blend of 80% and 67%, not precision on its own.",
    "57% is 8/14, dividing by flags AND misses together — precision's denominator is only the 10 flagged cases."
  ];

  W["Same run: 8 caught (TP), 2 false alarms (FP), 4 missed (FN), 26 passes (TN). Compute the recall."] = [
    "80% is 8/10, the precision — that uses the 2 false alarms, not the 4 missed real positives.",
    "73% is roughly the F1 blend of precision and recall, not the raw catch rate of 8 out of 12.",
    "85% is the overall accuracy (34 of 40 calls right), not the fraction of real positives caught.",
    "93% is 26/28 — the specificity on the negative class, not the catch rate on the 12 real positives."
  ];

  W["Fraud detection: 1 positive per 1,000 transactions. The team debates which headline metric to track. Which choice respects the imbalance?"] = [
    "With 999 legit per fraud, accuracy sits near 99.9% even for a model that flags nothing — it can't see the rare class.",
    "The true-negative rate is nearly 100% for any timid model; it grades the easy majority, not the fraud you care about.",
    "Value-weighting changes which rows count most but still lets the ocean of easy legit transactions dominate the score.",
    "The mean predicted score measures neither catching fraud nor avoiding false alarms — it isn't an error metric at all."
  ];

  W["Your model is fixed and deployed. Next quarter, the business doubles the cost it assigns to false alarms. What should change — and what shouldn't?"] = [
    "The model's ranking ability didn't change — only the costs did; a new cutoff on the same model handles that without retraining.",
    "ROC-AUC is cost-blind by construction; costs pick your operating point on the curve, they don't alter the curve.",
    "Test data reflects reality's class mix, not your business costs; the same data can price any cost ratio.",
    "Raising the cutoff alone already answers the cost change; refitting adds expense without changing the trade-off menu."
  ];

  W["In machine learning, what is a confusion matrix?"] = [
    "That's the ROC curve, which is drawn FROM confusion counts at many thresholds — not the count table itself.",
    "That's accuracy, a single number computed from the matrix's cells.",
    "That describes regularisation, a training technique, not an evaluation table.",
    "That's feature importance, about which inputs matter — nothing to do with tabulating prediction outcomes."
  ];

  W["In machine learning, what is the F1 score?"] = [
    "That's accuracy; F1 ignores true negatives entirely and blends precision with recall instead.",
    "That's ROC-AUC, a threshold-sweeping ranking measure, not a blend of precision and recall.",
    "That's recall alone — only one of F1's two ingredients.",
    "That's mean squared error, a regression metric, not a classification score."
  ];

  W["In machine learning, what is an ROC curve?"] = [
    "That's the confusion matrix; a ROC curve sweeps thresholds and plots rates, not raw counts.",
    "That's a training loss curve, showing optimisation progress, not classification trade-offs.",
    "That's the F1 score — a single number, not a curve across thresholds.",
    "That's the bias-variance / model-complexity picture, about fitting, not threshold trade-offs."
  ];

  W["In classification, what is accuracy?"] = [
    "That's precision, which only examines the flagged cases, not every prediction.",
    "That's recall, restricted to the truly positive cases.",
    "That's mean squared error, for regression targets, not label counting.",
    "That's ROC-AUC, a threshold-free ranking summary, not the plain hit rate."
  ];

  W["In classification, what is precision?"] = [
    "That formula is recall — the denominator is the actual positives, not the model's flags.",
    "That's accuracy, mixing both classes and both kinds of correct call.",
    "F1 is the harmonic mean of precision and RECALL; this recall-specificity hybrid isn't precision or a standard metric.",
    "That describes a clustering quality measure from unsupervised learning, not classification."
  ];

  W["In classification, what is recall?"] = [
    "That's precision — it judges the flagged pile rather than the actual positives.",
    "That's accuracy, over every prediction, not just the real positives.",
    "That's mean squared error, a regression loss, unrelated to catching positives.",
    "That's support (a class count), a property of the data, not a model score."
  ];

  W["In classification, what is specificity?"] = [
    "That's recall (sensitivity) — the positive class's version, not the negative class's.",
    "That's precision, about the trustworthiness of positive calls.",
    "That's accuracy, pooled across both classes at once.",
    "That's mean absolute error, a regression error measure."
  ];

  W["In classification, what is the false-positive rate?"] = [
    "That's the false discovery rate (1 − precision), which divides by the flags, not by the actual negatives.",
    "That's the miss rate (false-negative rate), about the positive class instead.",
    "That's the overall error rate (1 − accuracy), pooling both classes.",
    "That's mean squared error, for regression, not a classification rate."
  ];

  W["In classification, what is AUC (area under the ROC curve)?"] = [
    "That's accuracy — AUC's whole point is summarising ALL thresholds, not one.",
    "That's the F1 score at one cutoff; AUC involves no cutoff at all.",
    "That's mean squared error, a regression loss.",
    "That's just the class count (support), a fact about the data, not a model grade."
  ];

  W["In classification, what is a precision-recall curve?"] = [
    "That's the ROC curve — its axes are the true- and false-positive rates, not precision and recall.",
    "That's the confusion matrix at a single threshold, not a curve.",
    "That's a training loss curve from optimisation, unrelated to classification trade-offs.",
    "That's a class-distribution plot describing the data, not model behaviour."
  ];

  W["In classification, what is log loss (cross-entropy loss)?"] = [
    "That's accuracy, which sees only hard labels and ignores confidence entirely.",
    "That's ROC-AUC, which grades ranking, not the honesty of probabilities.",
    "That's mean absolute error, a regression error on numeric targets, not a probability penalty.",
    "That's just a class tally, not a loss at all."
  ];

  W["In regression, what is R-squared (the coefficient of determination)?"] = [
    "That's mean squared error — an absolute error in squared units, not a variance-explained fraction.",
    "That's mean absolute error — an error size, not a comparison against the predict-the-mean baseline.",
    "Exact hits are essentially meaningless for continuous targets and are not what R-squared counts.",
    "That's ROC-AUC, a classification ranking measure, not regression fit."
  ];

  W["In regression, what is mean squared error (MSE)?"] = [
    "That's mean absolute error — no squaring, so big misses aren't amplified.",
    "That's R-squared, a relative fit measure, not an average of squared gaps.",
    "Exact-match counting isn't a regression metric; MSE measures the size of the gaps.",
    "That's the F1 score, a classification metric with no meaning for numeric errors."
  ];

  W["In regression, what is mean absolute error (MAE)?"] = [
    "That's mean squared error — squaring is exactly what MAE avoids.",
    "That's R-squared, not an average error size.",
    "MAE averages the size of the misses; it doesn't count perfect hits.",
    "That's AUC, for ranking classifiers, not numeric prediction error."
  ];

  W["In a scikit-learn classification report, what is 'support'?"] = [
    "That's precision for the class; support counts examples, it doesn't grade them.",
    "That's a model's predicted probability; support is a raw count from the labels.",
    "Support counts rows belonging to a class, not the input columns used.",
    "That's mean squared error, a regression metric that never appears in a classification report."
  ];

  W["A churn model validates at 91% on data from your UK customers, then launches in the new German market and scores 74%. The validation wasn't wrong — it answered a different question. Which?"] = [
    "Overfitting is about the train-vs-validation gap; the UK validation was honest about UK-like data — the market shifted.",
    "No validation run on UK-only data can speak to how the model ranks customers in markets it never sampled.",
    "Validation used a fixed setup; it made no claim about future retuned thresholds in another market.",
    "Validation only certifies data drawn from the same distribution; 'fresh' German data comes from a different one."
  ];

  W["You're splitting 2,000 rows into train and validation. A tiny validation set gives noisy scores; a huge one starves training. What's the actual trade-off you're tuning?"] = [
    "Bias vs variance decomposes a MODEL's error; this is about how you portion rows, not the model's complexity.",
    "Over- and underfitting are fit failures of the model; split sizing trades estimate noise against training-data supply.",
    "'Recall' belongs to classification metrics; an estimate has noise and precision, not recall.",
    "Split sizing barely changes compute; the cost of a big validation set is starving training of rows, not CPU."
  ];

  W["K-fold cross-validation: you must pick K. K=2 is cheap but pessimistic; leave-one-out (K=n) is exhaustive but expensive and jittery. What does K=5 or 10 buy you?"] = [
    "Each fold still trains on less than all the data, so a small pessimistic bias remains — nothing is guaranteed zero.",
    "No K is guaranteed lowest variance — leave-one-out is famously jittery; K=5/10 is a compromise, not an optimum.",
    "K-fold refits the model K times, not once — 5 or 10 full fits is exactly the compute you pay.",
    "Plain k-fold doesn't fix class imbalance; that needs stratified folds, a separate technique."
  ];

  W["You run 5-fold CV twice with different shuffle seeds and get means of 85.2% and 86.4%. Neither run is buggy. What's the professional response?"] = [
    "Hand-picking the prettier run is cherry-picking; the seed-to-seed spread is information, not a nuisance to hide.",
    "Different shuffles will still disagree at any K; more folds shrinks but never removes fold-assignment noise.",
    "Two samples of a noisy quantity is far too few to pin down the mean; several repeats are needed.",
    "Freezing one seed makes runs reproducible but hides the variance you just found — the number stays just as noisy."
  ];

  W["You tune hyperparameters with CV, then report that same CV score as the model's expected performance. A reviewer objects. What's the clean fix?"] = [
    "Searching harder makes selection bias worse, not better — more candidates means a luckier winner.",
    "However many folds, the score still judged the winner it selected — the optimism is structural, not noise to average away.",
    "Tuning against the test set spends the one split whose entire job is to stay untouched.",
    "Averaging the top configs still uses the same tuning data that picked them; the estimate stays entangled with selection."
  ];

  W["An AutoML run tries 2,000 configurations and proudly reports the best validation score: 94.1%. Before any retest, what should you EXPECT about that number?"] = [
    "Each score alone is unbiased, but the MAXIMUM of 2,000 noisy scores is systematically optimistic — the winner's curse.",
    "Selection pressure only inflates the winner's number; there is no cautious mechanism pushing it down.",
    "Nothing was averaged — one winner was picked out of 2,000, which harvests luck instead of cancelling it.",
    "Validation and training scores are different measurements; search convergence doesn't make them equal."
  ];

  W["Model A scores 86.1%, model B 85.4% — but A was measured on one random split and B on a different one. Why is this comparison close to worthless?"] = [
    "Small differences CAN be detected with paired evaluation on shared splits; the flaw is the mismatched splits, not the gap's size.",
    "No rule forbids seeds; the problem is each score carries different split luck, making the two numbers incomparable.",
    "Evaluation order has no effect on either model's score.",
    "The metric may be fine; even a perfect metric can't rescue a comparison made on two different test splits."
  ];

  W["Two models have identical AUC — yet the fraud team should still prefer model A. Their ROC curves cross. What's going on?"] = [
    "AUC is an average over all operating points; two curves can share the average yet differ sharply where you actually operate.",
    "Parameter counts appear nowhere on a ROC plot and aren't part of this choice.",
    "If A won at every point its AUC would be strictly larger; crossing is exactly how equal AUCs coexist with local wins.",
    "ROC curves cross all the time; nothing about their construction forbids it."
  ];

  W["Your model's overall accuracy is a healthy 89%. Then you slice the errors by customer segment and one slice reads 54%. What did the aggregate number do?"] = [
    "The aggregate can't tell noise from a real weak slice — that's exactly why you had to slice to see it.",
    "An average says nothing about equality across segments; wildly unequal slices can share one mean.",
    "The other segments were fine; the aggregate flattered the total by diluting the weak slice, it didn't malign the rest.",
    "The 54% surfaced only after slicing, and corrupt labels are just one possible cause among many — nothing is proven."
  ];

  W["The single highest-yield error-analysis activity is also the least glamorous. Which is it?"] = [
    "Finer grids polish hyperparameters for fractions of a point — they can't show you WHAT the model gets wrong.",
    "Swapping in a deeper network is a guess until you know the error patterns; glamour without diagnosis.",
    "Extra decimals add precision to the same ignorance — no new information about failures.",
    "Porting speeds up the pipeline; it teaches you nothing about why predictions fail."
  ];

  W["Model B beats model A by 1.5 points... on a test set of 200 examples. Statistically, what does that difference amount to?"] = [
    "With ±5-point noise at n=200, a 1.5-point gap is well inside what chance alone produces — no proof.",
    "Regression to the mean doesn't flip which model is better; it's not evidence for A at all.",
    "There is no universal one-point significance bar; the threshold depends on test-set size, and n=200 demands far more.",
    "Sharing a test set helps (paired comparison) but doesn't defeat noise this large at n=200."
  ];

  W["Two models disagree on only 40 of 5,000 test cases: A alone is right on 28 of them, B alone on 12. Which comparison logic do proper paired tests (like McNemar's) use?"] = [
    "Overall accuracies bury the signal under 4,960 shared outcomes that carry no information about which model is better.",
    "Averaging everything dilutes the 40 informative cases with thousands of ties; paired tests deliberately drop the ties.",
    "Agreement on easy cases says nothing about the disagreements, which is where one model shows superiority.",
    "Training loss is irrelevant to a paired statistical test of test-set predictions."
  ];

  W["Your fraud model's F1 improved from 0.71 to 0.74. The CFO asks what that means. What's the only fully satisfying kind of answer?"] = [
    "A formula lecture answers 'how is it computed', not the CFO's real question: what changed for the business.",
    "A promise about future scores is neither an explanation of the 0.03 nor something you can actually know.",
    "Raw cell counts still leave the CFO to translate into money and workload — the burden stays with them.",
    "Rival F1s come from different data and class mixes, so the comparison is meaningless and still not in business units."
  ];

  W["The team optimised click-through rate offline for six months; CTR rose 30%, but revenue and retention fell. What failed?"] = [
    "Random seeds don't drift over calendar time; runs are as reproducible in month six as in month one.",
    "A small validation set adds noise, but CTR genuinely rose 30% — the measurement held; the target was the failure.",
    "Calibration concerns probability honesty; the problem is the optimised metric parting ways with revenue.",
    "Significance tests check whether CTR really rose — it did; no test flags that CTR was the wrong thing to raise."
  ];

  W["A missed fraud costs £2,000; a false alarm costs a £50 review. With calibrated probabilities in hand, decision theory gives an OPTIMAL flagging threshold. Roughly where?"] = [
    "0.5 is only optimal when both errors cost the same; a 40:1 cost ratio pushes the cutoff far from symmetric.",
    "A high cutoff minimises the cheap error (alarms) while multiplying £2,000 misses — the opposite of the cost arithmetic.",
    "F1 weighs precision and recall equally and knows nothing about £2,000 vs £50; its peak is not cost-optimal here.",
    "The base rate says how common fraud is; the optimal threshold comes from the cost ratio, about 50/(50+2000), not prevalence."
  ];

  W["Beyond thresholds: with per-case costs, you can compare whole MODELS by a single number that isn't accuracy. Which number?"] = [
    "Mashing every metric into one mean has no decision-theoretic meaning and ignores what errors actually cost.",
    "That ratio measures model size per money spent — nothing about prediction quality or error costs.",
    "Training time is an engineering cost, not a measure of the value the model's decisions create.",
    "A plain sum weights both equally, in metric units rather than pounds; it can't express a 40:1 cost asymmetry."
  ];

  W["On a 0.5%-fraud dataset your model boasts ROC-AUC 0.97, yet analysts drown in false alarms. The PR curve tells the ugly truth. Why does ROC flatter while precision-recall exposes?"] = [
    "PR isn't merely gloomier-but-equivalent: dividing by your alerts answers the analysts' operational question, which ROC's negative-heavy FPR hides.",
    "TPR and FPR are rates within each true class and don't shrink with imbalance; ROC's axes are unchanged by the class mix.",
    "Both curves are on absolute scales; the difference is what each metric divides by, not a choice of no-skill reference lines.",
    "Precision is not a calibration measure — both curves are built from hard flag decisions at swept thresholds, no probability honesty involved."
  ];

  W["A 5-class ticket classifier scores F1: micro 0.86, macro 0.61, weighted 0.83. Why do the three averages disagree so badly — and which one is watching your rare classes?"] = [
    "It swaps the definitions: MICRO pools every decision and MACRO averages classes equally — built on that reversal, the story collapses.",
    "Even balanced classes leave micro (pooled decisions) and macro (mean per-class F1) free to differ; the spread locates failing rare classes, not just skew.",
    "Weighted-F1 multiplies by frequency, which DOWN-weights rare classes; macro's equal averaging is what gives them full voice.",
    "Micro isn't constrained to sit between the others (here 0.86 is the largest), so one number cannot reconstruct the rest."
  ];

  W["Two weather models both hit 83% accuracy, but model A says '90%' when it rains and model B says '55%'. Accuracy can't see the difference. Which metrics grade the PROBABILITIES themselves, and on what principle?"] = [
    "MAE on probabilities is improper — it's minimised by exaggerating toward 0 or 1, not by stating your true belief — so the stated principle fails.",
    "AUC and average precision are ranking metrics: any monotonic rescaling of scores leaves them unmoved, so wild overconfidence goes unpunished.",
    "Anything taken at the argmax throws the probabilities away — it grades hard calls, exactly what the question says accuracy already can't see past.",
    "Calibration alone isn't sufficient: always predicting the base rate is perfectly calibrated yet useless — proper rules also demand sharpness."
  ];

  W["On 95/5 imbalanced data, a lazy model that predicts 'negative' for everyone scores: accuracy 0.95, F1(positive) 0.0, MCC 0.0. Accuracy looked impressive — MCC called the bluff. What makes MCC the hardest single number to fool?"] = [
    "MCC isn't rescaled accuracy — the lazy model's 95% accuracy maps to MCC 0, not 0.90, because MCC is a correlation, not a hit rate.",
    "MCC uses ALL four cells symmetrically, true negatives included; ignoring cells is what other metrics do.",
    "MCC isn't an F1 variant with specificity folded in; it's a correlation coefficient and doesn't reduce to F1 under any such condition.",
    "The geometric mean of sensitivity and specificity is G-mean, a different statistic; MCC correlates the whole matrix, not two rates."
  ];

  W["Your model's '80% confident' predictions are correct only 65% of the time. The calibration curve makes this visible — and Expected Calibration Error (ECE) makes it one number. How are they built?"] = [
    "Cumulative recall against volume describes a gain/lift curve; calibration compares stated confidence to observed frequency per bin.",
    "Precision-vs-recall gaps aren't calibration; the curve plots stated confidence against actual frequency, and ECE averages that gap.",
    "Accuracy against epochs is a training curve diagnosing overfitting over time — nothing to do with binning predictions by confidence.",
    "Comparing deciles to the global base rate measures ranking lift; calibration compares each bin to its OWN stated confidence."
  ];

  W["You report 'test accuracy 94.2%' from 500 test rows. A reviewer asks for the uncertainty. Bootstrap gives 94.2% ± 2.1 — and suddenly your 'improvement' over last quarter's 93.1% looks shaky. How does the bootstrap produce that interval, and what's the lesson?"] = [
    "Bootstrap here never retrains — it resamples the fixed test set's results; retraining on fresh splits measures a different (training) variability.",
    "Accuracy over √n isn't even the right standard-error formula, and bootstrap's point is to read the spread empirically, not from a formula.",
    "Drawing new live test sets isn't bootstrap — resampling WITH REPLACEMENT from the existing 500 rows is what simulates fresh draws.",
    "Injecting invented Gaussian noise measures sensitivity to that noise; bootstrap uses only the real data, resampled, to estimate sampling spread."
  ];

  /* ===== perf ===== */

  W["A model scores 99% on the data it was trained on, but only 70% on fresh unseen data. What is this gap called?"] = [
    "Underfitting drags BOTH scores down; here the training score is a stellar 99%, so the model isn't too simple.",
    "Regularising is the CURE — a deliberate technique — not the name of the train-vs-fresh gap.",
    "Generalising is the success case of similar scores on both; a 29-point gap is its failure.",
    "A baseline is a do-nothing reference rule; it has nothing to do with a train/test score gap."
  ];

  W["In machine learning, what is a 'baseline'?"] = [
    "That's a ceiling; the baseline is the floor — the score you get with essentially no skill.",
    "The baseline comes FIRST and is deliberately trivial; the shipped model is what has to beat it.",
    "A baseline is one fixed trivial rule, not a rolling average of real models.",
    "That describes a hyperparameter — a knob on the model — not a reference score."
  ];

  W["What is a holdout (validation) set used for?"] = [
    "Validation rows are deliberately KEPT OUT of training; adding them in would destroy the honest comparison.",
    "That's the baseline; the validation set is data, not a rule.",
    "The final reported number is the TEST set's job; validation data gets spent on tuning decisions along the way.",
    "That's the training set; validation is precisely the slice the model never learns from."
  ];

  W["What does k-fold cross-validation do?"] = [
    "One model on one held-out slice is a plain holdout split; CV's point is rotating the held-out role and averaging.",
    "Folds are a scoring rotation, not extra data; nothing new is added into training.",
    "Cherry-picking the luckiest split is the exact bias CV exists to remove — it averages, never selects.",
    "Training until validation loss stalls is early stopping, a training technique, not a data-splitting scheme."
  ];

  W["What is data leakage in machine learning?"] = [
    "That's file corruption or data loss; leakage is forbidden information flowing IN, not rows falling out.",
    "That describes catastrophic forgetting, a training-dynamics issue, not information crossing the split.",
    "That's a privacy breach; ML leakage happens between your own data splits, not out of the company.",
    "A small test set gives noisy estimates, but noisy is not the same as contaminated."
  ];

  W["KNN's k, a tree's depth, SVM's C, logistic regression's regularisation — what do all of these have in common?"] = [
    "Weights and split points are what's learned FROM data; k, depth, C and the penalty must be set from outside.",
    "Gradient descent tunes internal weights; these knobs sit outside the loss and are swept, not descended.",
    "Training accuracy would endorse the most flexible setting every time — that's why held-out data must judge instead.",
    "Each model family has its own knobs with different meanings, and their values are choices, not shared constants."
  ];

  W["You have 3 candidate values of C and 4 of gamma. Grid search with 5-fold cross-validation trains how many models — and why is that price worth paying?"] = [
    "12 counts the combinations but forgets each one is trained 5 separate times, once per fold.",
    "35 treats the 7 values as independent runs; grid search crosses them into 3×4=12 combinations first.",
    "17 adds 12+5, but folds MULTIPLY the work rather than adding to it: every combination runs in every fold.",
    "20 (5×4) drops the three values of C from the count; both knobs' values multiply."
  ];

  W["You tuned hyperparameters for forty rounds, always scoring on the same validation set. Its score crept from 88% to 93%. Why does the team keep a THIRD, untouched test set?"] = [
    "Averaging folds removes split luck, not selection bias: forty pick-the-winner decisions still tune you to the validation data.",
    "The test set must never be trained or tuned on — using it for fitting would destroy its honesty.",
    "Score creep from repeated selection happens at any validation size; the forty decisions cause it, not the sample size.",
    "The test split exists to be withheld — the opposite of adding rows to training."
  ];

  W["Across models, regularisation (KNN's bigger k, tree pruning, SVM's small C, logistic's penalty) always does the same job. Which?"] = [
    "Backwards — regularisation REMOVES flexibility; chasing every training wiggle is the disease it treats.",
    "Any speed change is incidental; the purpose is limiting what the model can express, not making it cheap.",
    "Regularisation typically LOWERS training accuracy slightly — the price paid for generalising better.",
    "Rescaling inputs is feature scaling, a preprocessing step, not a constraint on model flexibility."
  ];

  W["Your model underperforms. Before buying more data, you plot scores against training-set size. The two curves have already converged, both around 78%. What does that tell you?"] = [
    "There is no gap left to close — the curves already touch, so extra rows feed a hunger the model doesn't have.",
    "Converged learning curves are the expected signature of a bias-limited model, not a small-validation fluke.",
    "Training accuracy falls or flattens as data grows; nothing about more rows makes a plateaued curve jump.",
    "Label noise is only one possible ceiling; converged curves show the model is limited, not why."
  ];

  W["Fraud is 1% of your training data, and the model learns to ignore it. Which two standard levers push back — before touching the threshold?"] = [
    "Longer training just entrenches the same cheap ignore-fraud strategy, and a bigger test set only measures the failure better.",
    "Scaling and PCA reshape the feature space; they leave the loss's incentives untouched, so ignoring the 1% stays the winning move.",
    "Capacity and dropout don't change what errors cost; the model still profits by ignoring the rare class.",
    "Dropping the fraud rows deletes the very signal you need — the rare class becomes invisible instead of merely ignored."
  ];

  W["In machine learning, what is the bias-variance tradeoff?"] = [
    "No such rule exists; more data narrows the train-test gap, but that statement describes no tradeoff at all.",
    "Precision versus recall is a threshold trade-off in classification metrics, not a tension over model complexity.",
    "Speed versus memory is an engineering resource trade-off, unrelated to underfitting and overfitting.",
    "Algorithm versus fitted model is a terminology distinction, not a tension between two error sources."
  ];

  W["In machine learning, what is cross-validation?"] = [
    "A weight-shrinking penalty is regularisation — a training technique, not an evaluation scheme.",
    "One split used once is a plain holdout; cross-validation's defining move is rotating splits and averaging.",
    "Stepping weights downhill is gradient descent, the optimisation algorithm.",
    "A predicted-vs-true table is the confusion matrix, a result summary, not a resampling method."
  ];

  W["In machine learning, what is regularization?"] = [
    "Zero-mean unit-variance rescaling is standardisation, a preprocessing step, not a complexity penalty.",
    "Rotating train/test splits is cross-validation, an evaluation method.",
    "Combining many models' predictions is ensembling — it fights variance by pooling, not by penalising weights.",
    "Turning categories into 0/1 columns is one-hot encoding, a data representation, not a penalty."
  ];

  W["In machine learning, what is a train/validation/test split?"] = [
    "Rotating folds and averaging is cross-validation, an alternative resampling scheme, not the fixed three-way split.",
    "Equal-width bins describe feature discretisation of columns, not splitting rows into roles.",
    "Splitting by label describes the classes in the data, not the three evaluation roles.",
    "Splitting the loss into bias and variance is a theoretical error decomposition, not a data split."
  ];

  W["In machine learning, what is the generalization gap?"] = [
    "Time from training to deployment is project logistics; the gap is measured in performance, not calendar days.",
    "Precision minus recall compares two metrics on the SAME data; the gap compares one metric across train vs unseen.",
    "Counting removed features describes dimensionality reduction, unrelated to train/test score differences.",
    "Centroid distance is a clustering geometry notion, nothing to do with generalisation."
  ];

  W["In machine learning, what is a learning curve?"] = [
    "TPR against FPR is the ROC curve, which sweeps thresholds, not training-set sizes.",
    "Precision falling as recall rises is the precision-recall curve, another threshold sweep.",
    "A table of outcome counts is the confusion matrix — a snapshot, not a curve over data volume.",
    "The S-shape is the sigmoid activation function, not a performance-versus-data plot."
  ];

  W["In hyperparameter tuning, what is grid search?"] = [
    "Sampling at random is random search — grid's whole contrast is trying EVERY combination, not a sample.",
    "Stepping down the gradient tunes the model's weights, not hyperparameters laid out on a grid.",
    "Folding and averaging is cross-validation — grid search's scoring companion, not the search itself.",
    "Stopping when validation stalls is early stopping, a training-time regulariser."
  ];

  W["In hyperparameter tuning, what is random search?"] = [
    "Exhaustively trying every combination is grid search; random search's point is NOT trying everything.",
    "Majority voting combines models — that's ensembling, not hyperparameter search.",
    "Rescaling features is standardisation, a preprocessing step.",
    "Halting when validation loss stalls is early stopping, about when to end one training run."
  ];

  W["In model training, what is early stopping?"] = [
    "Zero training loss is a symptom of memorising, and waiting for it is the opposite of stopping early.",
    "Removing weak features is feature selection, not a rule for when to halt training.",
    "Splitting into folds is cross-validation setup, unrelated to halting an iterative fit.",
    "A zero learning rate at the start means no training ever happens — that's not a stopping criterion."
  ];

  W["In machine learning, what is an L2 (ridge) penalty?"] = [
    "Absolute weights driven to exact zero is the L1 (lasso) penalty's signature, not ridge's smooth shrinkage.",
    "Stopping when validation plateaus is early stopping, a different regulariser.",
    "The average squared prediction error is MSE — the loss being penalised, not the penalty added to it.",
    "Averaging many models is ensembling, not a weight penalty."
  ];

  W["In machine learning, what is an L1 (lasso) penalty?"] = [
    "Squared weights with smooth, never-zero shrinkage is the L2 (ridge) penalty's signature, not lasso's.",
    "A stopping rule on validation loss is early stopping, not a loss penalty.",
    "The average absolute prediction error is MAE, an error metric on predictions, not a penalty on weights.",
    "Combining many weak models is boosting/ensembling, not a sparsity penalty."
  ];

  W["Team A spends a month swapping in fancier models. Team B spends a week adding one domain feature ('days since last login'). B wins by six points. What's the general lesson?"] = [
    "The lesson isn't about simplicity — B won by adding information, and 'simpler always generalises better' isn't true anyway.",
    "Model choice does matter — it just usually matters less than giving every model a stronger input signal.",
    "Six points is far beyond typical run-to-run noise on a fixed evaluation; the gain is real.",
    "Split luck is checkable with cross-validation, and it wouldn't explain why a known churn signal produced the jump."
  ];

  W["A pipeline scales features using statistics computed on ALL the data — including the test set — before splitting. Scores look great; production disappoints. What happened?"] = [
    "Standard scaling is reversible and signal-preserving; the issue isn't aggressiveness but WHEN the statistics were computed.",
    "A small test set gives noisy scores, not systematically great-then-disappointing ones.",
    "Production inputs pass through the same scaler inside the pipeline; scaling itself is fine and needed.",
    "The split ratio doesn't inflate scores; computing statistics across the split boundary does."
  ];

  W["During training you track validation loss after every epoch. It falls, bottoms out at epoch 30, then creeps upward while training loss keeps falling. What's the move?"] = [
    "Once the model starts memorising noise, validation loss keeps drifting up; it won't spontaneously recover.",
    "A smaller validation set makes the curve NOISIER, and the upward creep is real overfitting signal, not a wobble.",
    "The learning rate changes optimisation speed; it doesn't address a model now fitting training noise.",
    "Training loss always keeps falling as the model memorises — it's precisely the number that can't be trusted here."
  ];

  W["Five diverse models each score 84–88% alone. Averaging their predictions scores 91% — better than every member. What makes that possible?"] = [
    "Average five clones and you gain nothing; the boost depends on decorrelated mistakes, not the act of averaging.",
    "A plain average weights all five equally; no member dominates, and the pool beat even the best one.",
    "Shared weights would make the models similar — the opposite of the diversity that makes averaging work.",
    "A three-point jump over the best member is far beyond rounding; it comes from errors cancelling."
  ];

  W["First day on a new classification problem. Before any tuning, what two numbers should you establish to anchor everything that follows?"] = [
    "The achievable ceiling is unknowable up front; useful anchors are measurable floors, not hypothetical maxima.",
    "Row and feature counts describe the dataset's size, not skill; they give no reference for judging any score.",
    "Latency matters for shipping, but it can't tell you whether an accuracy number represents real skill.",
    "Deadlines and compute anchor the schedule, not the meaning of a model's score."
  ];

  W["Two candidates for a live support-ticket router: model A, 94% accurate at 900 ms per prediction; model B, 92% at 15 ms. The SLA gives you 100 ms. What's the right engineering call?"] = [
    "An answer arriving at 900 ms against a 100 ms SLA never gets used, so its extra accuracy is worth nothing.",
    "The SLA is the stated constraint; engineering to a hoped-for renegotiation ships a system that breaks its contract today.",
    "Any ensemble containing A must wait for A, so the combined system still blows the 100 ms budget.",
    "B already meets both requirements today; blocking on a distillation project surrenders value for no need."
  ];

  W["You tune 60 hyperparameter combos with 5-fold CV and report the winner's CV score as 'the model's performance'. A reviewer objects: that number is biased. Nested cross-validation fixes it — how?"] = [
    "More folds averages away split noise, not selection bias — the winner's score still judged the very choice it won.",
    "Running the search twice and averaging two winners is still self-selected scores; repetition doesn't create untouched data.",
    "Blending the best with the worst yields a meaningless number; the fix is scoring outside the selection, not averaging winners with losers.",
    "Fresh seeds reshuffle luck on the SAME data; the tuning decisions still saw every row that produced the score."
  ];

  W["Grid search burns 90% of its budget fully training obviously-bad configurations. Successive halving (and Hyperband) spend the same budget far better. What's the core mechanism?"] = [
    "Halving's whole trick is NOT fully training the losers; stopping the wall-clock early with full trainings is just less grid search.",
    "A smaller random sample up front is plain random search; halving starts with MANY configs cheap and prunes between rounds.",
    "One cheap stand-in extrapolating scores describes surrogate modelling; halving actually runs every config, just on small budgets first.",
    "No gradients are shared between configurations; the savings come from pruning losers early, not from reusing computation."
  ];

  W["Random search treats trial #200 exactly like trial #1 — learning nothing along the way. Bayesian optimisation (Optuna, etc.) does learn. What is it actually doing between trials?"] = [
    "Centring on past winners is pure exploitation with no uncertainty model — it can't reason about unexplored regions.",
    "Hyperparameter response surfaces are noisy, discontinuous and often discrete; no usable gradient exists to step along.",
    "Discarding half the space per trial is a bisection/pruning heuristic, not modelling the score surface and choosing where to look.",
    "Re-running the incumbent measures its stability; it learns nothing about where to try NEXT, which is the whole job."
  ];

  W["Model B beats model A by 0.4 points of CV accuracy and the team declares victory. You rerun both with different random seeds and the gap flips sign. What discipline separates real improvements from seed noise?"] = [
    "Single scores carry the very seed noise that just flipped your ranking; noise doesn't cancel in a one-shot comparison.",
    "Converged training doesn't remove randomness from initialisation, shuffling and fold assignment; scores still jitter run to run.",
    "Reporting each model's best seed institutionalises cherry-picking; the luckiest run overstates every candidate.",
    "No fixed point-threshold defines 'real'; significance depends on the spread you measure, which is why you must estimate it."
  ];

  W["GridSearchCV found C=10, gamma=0.1 — but the heat-map shows the winner sat on a sharp isolated spike, while a broad plateau of nearly-as-good settings lies elsewhere. Why do seasoned practitioners pick the PLATEAU?"] = [
    "Training speed has nothing to do with position on the heat-map; the case for the plateau is stability, not speed.",
    "Spikes usually signal validation luck or brittleness; leakage inflates scores broadly, not in one hot cell.",
    "Nothing says the plateau sits at smaller values, and smaller isn't automatically safer — over-regularising fails too.",
    "The logic isn't distrust of grid search; the same spike-vs-plateau reasoning applies whatever search produced the map."
  ];

  W["A month of tuning bought +0.3 accuracy; a fortnight on features bought +2.1; the intern's data-cleaning pass bought +3.4. What's the mature model of where performance actually comes from?"] = [
    "The story's own numbers refute it: tuning bought the least, and tuning early sets no ceiling for later data work.",
    "Returns were wildly unequal (+0.3 vs +3.4); pretending parity spends most hours on the weakest lever.",
    "The cleaning pass beat everything — dismissing data work as junior is precisely the immature model.",
    "Tuning shows diminishing returns on the same data; repeated rounds squeeze the same lemon rather than compounding."
  ];

})();
