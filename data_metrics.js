/* Model Evaluation — Part I: Foundations. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).metrics1 = [

{
  q: "A classifier's predictions are compared against the truth. Every single prediction lands in one of exactly four buckets. Which four?",
  choices: ["Caught, missed, false alarm, correct pass", "Right, wrong, unsure, skipped", "High, low, over, under", "Train, test, validate, deploy", "Precise, recalled, filtered, flagged"],
  explain: "True positive (caught it), false negative (missed it), false positive (false alarm), true negative (correctly left alone). Every metric you'll ever meet is built from these four counts.",
  simple: "Think of a guard dog: it can bark at a burglar (caught), sleep through a burglar (missed), bark at the postman (false alarm), or ignore the postman (correct pass). Four buckets — every judgement of any classifier starts by counting them.",
  widget: {
    type: "threshold", title: "The four buckets, live",
    world: "Twelve parcels scanned for contraband, placed by the scanner's suspicion score. Orange = actually contraband. Slide the cutoff and watch parcels move between the four cells of the grid.",
    posName: "contraband", negName: "clean", axis: "suspicion", show: ["accuracy"],
    items: [{s:0.8,c:0},{s:1.6,c:0},{s:2.4,c:0},{s:3.2,c:0},{s:4,c:1},{s:4.8,c:0},{s:5.6,c:1},{s:6.4,c:0},{s:7.2,c:1},{s:8,c:1},{s:8.8,c:1},{s:9.6,c:1}],
    knob: { label: "Flag cutoff", min: 0, max: 10, step: 0.5, init: 5 },
    insights: [
      { max: 3, text: "Aggressive flagging: the 'caught' cell fills up — and so does 'false alarm'. Cells trade with each other; they never all improve at once.", tone: "info" },
      { max: 7, text: "Watch one parcel as you slide: it can only ever move between two cells (caught↔missed if orange; alarm↔pass if blue).", tone: "info" },
      { max: 10, text: "🤯 Every metric in this topic — accuracy, precision, recall, F1, ROC — is just arithmetic on these four cells. Master the grid and the rest is division.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The confusion matrix", formula: "TP (caught) · FN (missed) · FP (false alarm) · TN (correct pass)",
      text: "The 2×2 grid that underlies all of classification evaluation. Named for showing where the model gets confused." }
  }
},

{
  q: "Your fraud model scores 96% accuracy. Then you learn 96% of all transactions are legitimate. What has the model necessarily proven?",
  choices: ["Nothing — saying 'legit' every time also scores 96%", "It catches most fraud", "It beats any simpler model", "Its precision is at least 96%", "Its errors are balanced"],
  explain: "Accuracy = (TP+TN)/all. On 96/4 data, a model that never flags anything gets 96% from true negatives alone. Accuracy on imbalanced data mostly measures the imbalance.",
  simple: "A rock with 'LEGIT' painted on it scores 96% here. Until your model beats the rock, its accuracy is decor. On lopsided data, ask what happened to the rare class — accuracy won't tell you.",
  widget: {
    type: "threshold", title: "Beating the rock",
    world: "Twelve transactions, only two fraudulent (orange). Slide the cutoff all the way high — flag nothing — and read the accuracy. Then find a cutoff that actually earns its keep.",
    posName: "fraud", negName: "legit", axis: "risk score", show: ["accuracy", "recall"],
    items: [{s:0.6,c:0},{s:1.4,c:0},{s:2.2,c:0},{s:3,c:0},{s:3.8,c:0},{s:4.6,c:0},{s:5.4,c:0},{s:6.2,c:0},{s:7,c:0},{s:7.8,c:0},{s:8.6,c:1},{s:9.4,c:1}],
    knob: { label: "Flag cutoff", min: 0, max: 10, step: 0.5, init: 10 },
    insights: [
      { max: 5, text: "Lower cutoffs catch the fraud — recall rises — while accuracy barely moves. Accuracy just can't see the rare class clearly.", tone: "info" },
      { max: 8, text: "Around here you can catch BOTH fraud cases and still hold high accuracy. This is what 'earning it' looks like.", tone: "info" },
      { max: 10, text: "🤯 Flagging nothing: accuracy 83% (and on 96/4 data it'd be 96%) with recall ZERO. Highest-accuracy settings can be the most useless ones. Always name the baseline.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The accuracy trap", formula: "baseline accuracy = share of the majority class — beat THAT, not 50%",
      text: "On imbalanced problems accuracy flatters do-nothing models. The next metrics — precision and recall — were invented to see what accuracy hides." }
  }
},

{
  q: "Of all the emails your filter FLAGGED as spam, what fraction really were spam? Which metric is this?",
  choices: ["Precision", "Recall", "Accuracy", "F1 score", "Specificity"],
  explain: "Precision = TP / (TP + FP): of everything flagged, how much was right. It's the 'trustworthiness of the alarm' — high precision means when it fires, you believe it.",
  simple: "Precision answers: 'when the dog barks, is it really a burglar?' A barky dog that cries wolf has low precision. It says nothing about burglars it slept through — that's the other metric's job.",
  widget: {
    type: "threshold", title: "When the alarm fires, is it right?",
    world: "Emails by spamminess score; orange = truly spam. Precision only looks INSIDE the shaded flag zone: what fraction of it is orange? Slide and watch.",
    posName: "spam", negName: "legit", axis: "spamminess", show: ["precision"],
    items: [{s:1,c:0},{s:1.8,c:0},{s:2.6,c:1},{s:3.4,c:0},{s:4.2,c:0},{s:5,c:1},{s:5.8,c:0},{s:6.6,c:1},{s:7.4,c:0},{s:8.2,c:1},{s:9,c:1},{s:9.6,c:1}],
    knob: { label: "Flag cutoff", min: 0, max: 10, step: 0.5, init: 2 },
    insights: [
      { max: 3, text: "A big greedy flag zone: plenty of blue caught inside it. Precision is mediocre — the alarm cries wolf.", tone: "warn" },
      { max: 7.5, text: "Tighter zones keep mostly orange inside: precision climbs. Notice it NEVER looks outside the shaded area — misses are invisible to it.", tone: "info" },
      { max: 10, text: "🤯 Flag only the single most obvious email: precision 100% — a perfectly trustworthy alarm that ignores nearly all the spam. Precision alone can be gamed by cowardice.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Precision", formula: "precision = TP / (TP + FP) — of the flagged, how many were real",
      text: "The purity of your positive calls. Maximise it when false alarms are expensive — and never read it without its partner, recall." }
  }
},

{
  q: "Ten emails arrive; four are really spam. Of those four real spams, how many did the filter catch? Which metric asks this?",
  choices: ["Recall", "Precision", "Accuracy", "Specificity", "Lift"],
  explain: "Recall = TP / (TP + FN): of the things that were actually positive, the fraction you caught. It's the 'how much slipped past' metric — every miss hurts it directly.",
  simple: "Recall answers: 'of the four real burglars, how many did the dog bark at?' Sleep through one and recall drops to 3/4. It doesn't care how often the dog barked at postmen — only how many burglars got through.",
  widget: {
    type: "threshold", title: "Of the real ones, how many did we catch?",
    world: "The classic setup: 10 emails, 4 really spam (orange). The knob is how aggressive the filter is. Chase the recall number — and find out what it costs to reach 100%.",
    posName: "spam", negName: "legit", axis: "spamminess", show: ["recall"],
    items: [{s:1,c:0},{s:2,c:0},{s:3,c:0},{s:3.8,c:1},{s:4.6,c:0},{s:5.4,c:1},{s:6.4,c:0},{s:7.2,c:1},{s:8.2,c:0},{s:9,c:1}],
    knob: { label: "Filter aggressiveness (flag ≥ cutoff… lower = more aggressive)", min: 0, max: 10, step: 0.5, init: 8 },
    insights: [
      { max: 3.5, text: "🤯 Flag everything and recall hits 100% — but look at the wreckage: real mail flagged everywhere. A perfect recall bought by pure aggression is gameable, not good.", tone: "wow" },
      { max: 7, text: "Middle cutoffs: recall counts the orange dots INSIDE the zone against all four orange dots. Every ✗ outside is a miss, and each one costs 25 points of recall.", tone: "info" },
      { max: 10, text: "Timid filtering: hardly anything flagged, recall near zero. The spam sails through politely.", tone: "warn" }
    ],
    extreme: { at: "min" },
    reveal: { name: "Recall (sensitivity)", formula: "recall = TP / (TP + FN) — caught spam ÷ all real spam",
      text: "The metric of missed cases. Maximise it when a miss is what you fear — and never read it without precision, because flagging everything games it to 100%." }
  }
},

{
  q: "You lower the flag cutoff to catch more real cases. As recall rises, what does precision typically do — and why?",
  choices: ["Falls — the wider net also scoops up more false alarms", "Rises with it — both love aggression", "Stays fixed by definition", "Becomes equal to recall", "Turns negative"],
  explain: "One knob, two metrics, opposite appetites: aggression catches more positives (recall up) but drags in more negatives (precision down). You choose a point on the trade-off, not a victory over it.",
  simple: "Cast a wider fishing net: you'll catch more of the fish you want (recall up) AND more old boots (precision down). No net size gives you all fish, no boots — you pick the compromise your kitchen can live with.",
  widget: {
    type: "threshold", title: "One knob, two rivals",
    world: "Watch both numbers at once as you slide. Try to make them BOTH high — and feel exactly where the data stops letting you.",
    posName: "positive", negName: "negative", axis: "model score", show: ["precision", "recall"],
    items: [{s:0.8,c:0},{s:1.8,c:0},{s:2.6,c:0},{s:3.4,c:1},{s:4.2,c:0},{s:5,c:1},{s:5.8,c:0},{s:6.8,c:1},{s:7.6,c:1},{s:8.4,c:0},{s:9,c:1},{s:9.6,c:1}],
    knob: { label: "Flag cutoff", min: 0, max: 10, step: 0.5, init: 5 },
    insights: [
      { max: 2.5, text: "Far left: recall 100%, precision sagging. You've caught everything — including things you shouldn't have.", tone: "info" },
      { max: 7, text: "The middle is negotiation territory: each notch of cutoff buys one metric by selling the other.", tone: "info" },
      { max: 10, text: "🤯 Far right: precision perfect, recall dismal. There is no cutoff where both peak — that's a property of the DATA, not a flaw in the model. The trade-off is the terrain.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The precision–recall trade-off", formula: "same threshold moves them in opposite directions",
      text: "Precision and recall are two ends of one see-saw. Reporting either alone hides the see-saw — which is exactly why F1 and curves exist." }
  }
},

{
  q: "A model has precision 100% but recall 20%. Its F1 score is about 33%, far below the 60% average. Why is F1 built to punish this?",
  choices: ["A model great at one and awful at the other is awful in practice", "F1 always halves the average", "Recall matters more than precision", "The maths prevents scores above 50%", "F1 rewards only balanced datasets"],
  explain: "F1 is the HARMONIC mean, which is dragged toward the smaller number. A pathologically cautious model (perfect precision, terrible recall) shouldn't score 'medium' — F1 makes lopsidedness expensive.",
  simple: "Would you hire a guard who barks only once a year — always correctly — while forty burglars stroll past? The simple average says '60%, not bad'. F1 says 'one great skill can't excuse one useless one' and scores it 33%.",
  widget: {
    type: "threshold", title: "The lopsidedness detector",
    world: "Slide to the extremes and compare F1 with what a naive average of precision and recall would say. F1 refuses to be fooled by one-sided brilliance.",
    posName: "defect", negName: "fine", axis: "defect score", show: ["precision", "recall", "f1"],
    items: [{s:0.8,c:0},{s:1.8,c:0},{s:2.8,c:1},{s:3.6,c:0},{s:4.4,c:1},{s:5.2,c:0},{s:6,c:1},{s:6.8,c:0},{s:7.6,c:1},{s:8.4,c:1},{s:9.2,c:0},{s:9.8,c:1}],
    knob: { label: "Flag cutoff", min: 0, max: 10, step: 0.5, init: 5 },
    insights: [
      { max: 2.5, text: "Recall-heavy corner: precision suffers, and F1 sits near the LOWER of the two — not the middle.", tone: "info" },
      { max: 7, text: "Balanced zone: precision ≈ recall, and F1 ≈ both. When the two agree, F1 simply agrees with them.", tone: "info" },
      { max: 10, text: "🤯 Precision-perfect corner: recall collapses and F1 collapses WITH it, ignoring the shiny 100%. One number that can't be gamed by hiding behind one good metric.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "F1 score", formula: "F1 = 2·P·R / (P + R) — the harmonic mean of precision and recall",
      text: "A single summary that stays honest about lopsided models. Use it to compare models when you need one number and both error types matter." }
  }
},

{
  q: "Precision 100%, recall 20% again. Arithmetic mean says 60%; harmonic mean (F1) says 33%. What property of the harmonic mean causes the difference?",
  choices: ["It is dominated by the smaller of the two numbers", "It squares both numbers first", "It ignores precision entirely", "It subtracts the difference", "It rounds down aggressively"],
  explain: "Harmonic mean = 2PR/(P+R). If R is tiny, the product PR is tiny no matter how big P is — so the result hugs the weak number. Arithmetic mean lets a strong number carry a weak one; harmonic refuses.",
  simple: "Arithmetic averaging lets a 100 rescue a 20. The harmonic mean works like resistors in parallel or speeds over a round trip: the slow leg dominates. Drive 100 mph out and 20 mph back — your average speed is 33, not 60. F1 is that same maths.",
  widget: {
    type: "curveStatic", title: "Why 100 can't rescue 20",
    world: "Fix recall at 20% and sweep precision from 20% to 100%. Watch how little F1 moves — then compare against the arithmetic average's cheerful climb.",
    xlab: "precision (recall fixed at 20%)", xs: [20,40,60,80,100], dec: 0, yunit: "%",
    series: [
      { name: "arithmetic average", ys: [20,30,40,50,60] },
      { name: "F1 (harmonic)", ys: [20,27,30,32,33] }
    ],
    knob: { label: "Precision", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "When both numbers are equal, the two means agree exactly. No drama at 20/20.", tone: "info" },
      { max: 3, text: "As precision soars, the arithmetic mean soars with it. F1 crawls: the weak recall is a bottleneck it refuses to average away.", tone: "info" },
      { max: 4, text: "🤯 Precision 100, recall 20: arithmetic says 60, F1 says 33. The harmonic mean treats the metrics like a chain — as strong as the weakest link.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Harmonic vs arithmetic mean", formula: "harmonic(a,b) = 2ab/(a+b) ≤ arithmetic(a,b), equality only when a = b",
      text: "F1's punishing behaviour isn't a design quirk bolted on — it falls straight out of choosing the harmonic mean, the mean of rates and bottlenecks." }
  }
},

{
  q: "Two deployments of one cancer-screening model: clinic A hates missed cancers; clinic B is drowning in follow-up costs from false alarms. Who should run which cutoff?",
  choices: ["A runs a low cutoff (recall first); B runs a higher one (precision first)", "Both run 0.5 — it's the standard", "A runs high, B runs low", "Both run whatever maximises accuracy", "Cutoffs can't differ on one model"],
  explain: "A's nightmare is a false negative → flag aggressively, accept false alarms. B's constraint is false-positive cost → flag conservatively. One model, two cutoffs, both correct FOR THEIR COSTS.",
  simple: "The question 'what's the right cutoff?' is really 'which mistake hurts more HERE?'. Missing cancer is catastrophic → bark at shadows. Follow-ups bankrupting the clinic → only bark when sure. Same dog, different houses, different training.",
  widget: {
    type: "threshold", title: "Two clinics, one dial",
    world: "Patients by risk score; orange = real cases, ✗ = a missed one. First set the dial as clinic A (misses are catastrophic). Then re-set it as clinic B (alarms are ruinous). Feel the dial mean different things.",
    posName: "case", negName: "healthy", axis: "risk score", show: ["recall", "precision"],
    items: [{s:1,c:0},{s:1.8,c:0},{s:2.6,c:1},{s:3.4,c:0},{s:4.2,c:0},{s:5,c:1},{s:6,c:0},{s:6.8,c:1},{s:7.6,c:0},{s:8.4,c:1},{s:9,c:1},{s:9.6,c:1}],
    knob: { label: "Flag cutoff", min: 0, max: 10, step: 0.5, init: 5 },
    insights: [
      { max: 3, text: "Clinic A's zone: recall near 100%, precision paying for it. Every orange dot caught; every ✗ eliminated. For A, correct.", tone: "info" },
      { max: 7, text: "No man's land: neither clinic's costs are being respected. 'Default 0.5' often lives here — a decision made by nobody.", tone: "warn" },
      { max: 10, text: "🤯 Clinic B's zone: precision high, some cases missed — defensible ONLY because B's cost structure says so. The cutoff is a moral and economic decision wearing a maths costume.", tone: "wow" }
    ],
    extreme: { at: "min" },
    reveal: { name: "Cost-driven operating points", formula: "choose t to minimise cost_FN·FN + cost_FP·FP — costs come from the domain, not the data",
      text: "There is no universally right cutoff. Write down what each error costs, then the dial sets itself. Refusing to choose IS a choice — usually a bad one." }
  }
},

{
  q: "A ROC curve plots a model's behaviour as the cutoff sweeps from strict to lenient. What exactly are its two axes?",
  choices: ["Catch rate (TPR) against false-alarm rate (FPR)", "Precision against recall", "Accuracy against cutoff", "Errors against training size", "Score against probability"],
  explain: "Each cutoff produces one (FPR, TPR) pair; sweeping the cutoff traces the whole curve. Up = catching more real positives; right = false-alarming on more real negatives.",
  simple: "The ROC curve is your model's entire menu of trade-offs on one plot: every point is 'at some cutoff, we catch this % of the real ones while falsely alarming on that % of the innocent'. Moving the cutoff just walks you along the menu.",
  widget: {
    type: "rocCurve", title: "Walking the menu",
    world: "The purple curve is every trade-off this model can offer. Your knob is the cutoff — watch the dot walk the curve. The diagonal is what guessing would achieve.",
    posName: "intrusions", negName: "normal sessions",
    items: [{s:1,c:0},{s:1.8,c:0},{s:2.6,c:0},{s:3.4,c:1},{s:4.2,c:0},{s:5,c:0},{s:5.8,c:1},{s:6.6,c:0},{s:7.4,c:1},{s:8.2,c:1},{s:9,c:1},{s:9.6,c:1}],
    knob: { label: "Flag cutoff", min: 0, max: 10, step: 0.25, init: 5 },
    insights: [
      { max: 3, text: "Lenient cutoffs live at the top-right: catch nearly everything, false-alarm plenty. Strict cutoffs live bottom-left: quiet and timid.", tone: "info" },
      { max: 7, text: "The dream corner is TOP-LEFT: catch everything, alarm on nothing. Good models bulge toward it; guessing hugs the diagonal.", tone: "info" },
      { max: 10, text: "🤯 The dot moves but the CURVE never changes — the curve is the model's character, the dot is merely today's policy. Two different things, one picture.", tone: "wow" }
    ],
    extreme: { at: "min" },
    reveal: { name: "The ROC curve", formula: "x = FPR = FP/(FP+TN) · y = TPR = TP/(TP+FN), traced over all cutoffs",
      text: "One curve summarises every threshold at once — which is why ROC comparisons don't depend on choosing a cutoff first." }
  }
},

{
  q: "Model A has ROC-AUC 0.93; model B has 0.71. Without picking any threshold, what does that difference tell you?",
  choices: ["A ranks a random positive above a random negative far more reliably", "A is 22% more accurate", "A has higher precision at 0.5", "B was trained on less data", "A's cutoff is better placed"],
  explain: "AUC has a beautiful meaning: pick one random positive and one random negative — AUC is the probability the model scores the positive higher. It measures RANKING quality, before any threshold exists.",
  simple: "Hand the model one real fraud and one legit transaction and ask 'which is which?'. Model A gets that little duel right 93% of the time; B only 71%. AUC is the duel-winning rate — a threshold-free measure of whether the model's scores mean anything.",
  widget: {
    type: "rocCurve", title: "The area under the menu",
    world: "A strong ranker: its curve bulges toward the top-left, and the area beneath it (AUC) is large. Slide the cutoff anywhere you like — try to change the AUC. You can't.",
    posName: "frauds", negName: "legit payments",
    items: [{s:0.8,c:0},{s:1.6,c:0},{s:2.4,c:0},{s:3.2,c:0},{s:4,c:0},{s:4.8,c:1},{s:5.6,c:0},{s:6.4,c:1},{s:7.2,c:1},{s:8,c:1},{s:8.8,c:1},{s:9.6,c:1}],
    knob: { label: "Flag cutoff", min: 0, max: 10, step: 0.25, init: 5 },
    insights: [
      { max: 3, text: "The AUC label sits still while you slide. Threshold choices are downstream of it — AUC judges the scores themselves.", tone: "info" },
      { max: 7, text: "A bulgy curve means: at ANY false-alarm budget you choose later, this model offers a high catch rate. Good ranking is good everywhere on the menu.", tone: "info" },
      { max: 10, text: "🤯 AUC ≈ P(random positive outranks random negative). 0.93 = the model wins 93 of 100 blind duels. One number, no thresholds, pure ranking skill.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "ROC-AUC", formula: "AUC = P(score(random positive) > score(random negative))",
      text: "The standard threshold-free comparison between models. Caveat for later: under heavy imbalance, precision-recall curves can be more informative." }
  }
},

{
  q: "A colleague's model reports ROC-AUC = 0.5. What have they built?",
  choices: ["A coin-flip — its scores carry no ranking information", "A perfectly calibrated model", "A model with 50% accuracy at best", "An excellent model for balanced data", "A model needing a higher cutoff"],
  explain: "AUC 0.5 means a random positive outranks a random negative exactly half the time — pure chance. The ROC curve lies on the diagonal. No threshold anywhere along it can rescue uninformative scores.",
  simple: "AUC 0.5 is the duel-winning rate of a shrug. The model's scores might as well be lottery numbers: shown one fraud and one legit case, it picks correctly half the time — same as flipping a coin with a lab coat on.",
  widget: {
    type: "rocCurve", title: "The diagonal of despair",
    world: "This model's scores are noise — real positives and negatives are shuffled together evenly. Watch the curve hug the guessing diagonal, and try in vain to find a good cutoff.",
    posName: "positives", negName: "negatives",
    items: [{s:1,c:1},{s:1.8,c:0},{s:2.6,c:1},{s:3.4,c:0},{s:4.2,c:1},{s:5,c:0},{s:5.8,c:1},{s:6.6,c:0},{s:7.4,c:1},{s:8.2,c:0},{s:9,c:1},{s:9.6,c:0}],
    knob: { label: "Flag cutoff", min: 0, max: 10, step: 0.25, init: 5 },
    insights: [
      { max: 3, text: "Lenient: you catch more positives AND false-alarm proportionally more. The two rates rise in lockstep — the definition of no skill.", tone: "warn" },
      { max: 7, text: "Everywhere on the diagonal, catch-rate ≈ false-alarm-rate. The scores simply don't separate the classes.", tone: "warn" },
      { max: 10, text: "🤯 No cutoff escapes the diagonal — threshold-tuning a skill-less model is rearranging deck chairs. Fix the features or the model; the dial can't create information.", tone: "wow" }
    ],
    extreme: { at: "min" },
    reveal: { name: "AUC = 0.5 (no skill)", formula: "diagonal ROC ⇔ scores independent of the truth",
      text: "The floor of the AUC scale (and below 0.5 means your scores are informative but flipped!). First question for any new model: how far off the diagonal is it?" }
  }
},

{
  q: "A batch run produced: 8 caught (TP), 2 false alarms (FP), 4 missed (FN), 26 correct passes (TN). Compute the precision.",
  choices: ["80%", "67%", "40%", "94%", "25%"],
  explain: "Precision = TP/(TP+FP) = 8/(8+2) = 8/10 = 80%. Only the flagged pile matters: 10 flags, 8 of them right.",
  simple: "Count what the model FLAGGED: 8 real + 2 false = 10 flags. Right flags out of all flags: 8 out of 10 — 80%. (The 4 misses belong to recall's question, not this one.)",
  widget: {
    type: "threshold", title: "Read the grid, do the division",
    world: "A live grid to practise on. Set any cutoff, read TP and FP from the cells, and verify: precision = TP ÷ (TP + FP). The readout will confirm your arithmetic.",
    posName: "positive", negName: "negative", axis: "score", show: ["precision"],
    items: [{s:0.8,c:0},{s:1.8,c:0},{s:2.8,c:0},{s:3.6,c:1},{s:4.4,c:0},{s:5.2,c:1},{s:6,c:0},{s:6.8,c:1},{s:7.6,c:1},{s:8.4,c:0},{s:9.2,c:1},{s:9.8,c:1}],
    knob: { label: "Flag cutoff", min: 0, max: 10, step: 0.5, init: 6.5 },
    insights: [
      { max: 4, text: "Grab TP and FP from the grid's left column and divide. The denominator is the FLAGGED column only.", tone: "info" },
      { max: 8, text: "Notice FN never enters the formula — precision is blind to misses by design.", tone: "info" },
      { max: 10, text: "🤯 The 26 true negatives never mattered either. Two cells in, two cells ignored: knowing WHICH cells feed WHICH metric is the entire skill.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Precision, computed", formula: "precision = 8 / (8 + 2) = 80%",
      text: "TP over the flagged column. If you can find the two cells, you can never be bluffed by a metrics slide again." }
  }
},

{
  q: "Same run: 8 caught (TP), 2 false alarms (FP), 4 missed (FN), 26 passes (TN). Compute the recall.",
  choices: ["67%", "80%", "50%", "89%", "31%"],
  explain: "Recall = TP/(TP+FN) = 8/(8+4) = 8/12 ≈ 67%. The denominator is everything that was REALLY positive: the 8 you caught plus the 4 you missed.",
  simple: "Count what was REALLY there: 8 caught + 4 missed = 12 real positives. Caught 8 of 12 — two-thirds, 67%. (The 2 false alarms belong to precision's question.)",
  widget: {
    type: "threshold", title: "The other division",
    world: "Same live grid, other formula. Read TP and FN — the top ROW this time — and verify recall = TP ÷ (TP + FN) against the readout.",
    posName: "positive", negName: "negative", axis: "score", show: ["recall"],
    items: [{s:0.8,c:0},{s:1.8,c:0},{s:2.8,c:0},{s:3.6,c:1},{s:4.4,c:0},{s:5.2,c:1},{s:6,c:0},{s:6.8,c:1},{s:7.6,c:1},{s:8.4,c:0},{s:9.2,c:1},{s:9.8,c:1}],
    knob: { label: "Flag cutoff", min: 0, max: 10, step: 0.5, init: 6.5 },
    insights: [
      { max: 4, text: "This time read ACROSS the top row: caught + missed = all the real positives. That row is recall's whole world.", tone: "info" },
      { max: 8, text: "False alarms don't appear anywhere in this formula — a wildly barky model can still have perfect recall.", tone: "info" },
      { max: 10, text: "🤯 Precision reads the left COLUMN; recall reads the top ROW. Same grid, perpendicular questions. That one sentence untangles the two forever.", tone: "wow" }
    ],
    extreme: { at: "min" },
    reveal: { name: "Recall, computed", formula: "recall = 8 / (8 + 4) ≈ 67%",
      text: "TP over the truly-positive row. Column question vs row question — precision and recall in four words each." }
  }
},

{
  q: "Fraud detection: 1 positive per 1,000 transactions. The team debates which headline metric to track. Which choice respects the imbalance?",
  choices: ["Precision and recall on the fraud class", "Overall accuracy", "True-negative rate", "Mean score across all rows", "Training log-loss"],
  explain: "With 999:1 imbalance, accuracy and TN-rate are ~99.9% for a do-nothing model. Precision and recall interrogate the rare class directly: of our fraud flags, how many are real? Of real frauds, how many do we catch?",
  simple: "When the interesting thing is rare, judge the model ONLY on how it treats the rare thing. Precision and recall never even glance at the ocean of easy negatives — which is exactly what makes them the right lens here.",
  widget: {
    type: "threshold", title: "The lens that sees the rare class",
    world: "Heavily imbalanced data: two frauds hiding among ten legit payments. Watch accuracy stay smug while precision and recall tell the real story.",
    posName: "fraud", negName: "legit", axis: "risk score", show: ["accuracy", "precision", "recall"],
    items: [{s:0.6,c:0},{s:1.4,c:0},{s:2.2,c:0},{s:3,c:0},{s:3.8,c:0},{s:4.6,c:0},{s:5.6,c:0},{s:6.4,c:0},{s:7.2,c:1},{s:8,c:0},{s:8.8,c:1},{s:9.6,c:0}],
    knob: { label: "Flag cutoff", min: 0, max: 10, step: 0.5, init: 10 },
    insights: [
      { max: 4, text: "Aggressive flagging: recall perfect, precision honest about the false-alarm pile — and accuracy still hovering high, learning nothing.", tone: "info" },
      { max: 8, text: "Watch a single fraud slip out of the zone: recall drops 50 points; accuracy drops ~8. One metric SCREAMS, the other shrugs.", tone: "warn" },
      { max: 10, text: "🤯 Flag nothing: accuracy 83% and both fraud metrics at zero or undefined. On imbalanced problems, precision/recall are not optional extras — they're the only instruments that register the signal.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Metrics for imbalance", formula: "rare positives → track precision & recall (and PR-AUC), not accuracy",
      text: "Pick metrics that can SEE your problem. If the thing you care about is 0.1% of the data, accuracy is legally blind." }
  }
},

{
  q: "Your model is fixed and deployed. Next quarter, the business doubles the cost it assigns to false alarms. What should change — and what shouldn't?",
  choices: ["Move the cutoff; the model and its ROC curve stay the same", "Retrain from scratch immediately", "Change the test set", "Recompute the AUC downward", "Nothing at all can change"],
  explain: "Cost changes move you to a different point on the SAME curve — raise the cutoff, trade recall for precision. The model's ranking ability (the curve, the AUC) is untouched by business arithmetic.",
  simple: "The model is the menu; the cutoff is your order. When prices change you order a different dish — you don't burn down the restaurant. Slide along the curve; retrain only when the CURVE itself isn't good enough anywhere.",
  widget: {
    type: "rocCurve", title: "Same menu, new order",
    world: "The false-alarm budget just got halved. Walk the dot along the fixed curve to a stricter operating point — and notice everything about the model that didn't change.",
    posName: "escalations", negName: "routine tickets",
    items: [{s:1.2,c:0},{s:2,c:0},{s:2.8,c:0},{s:3.6,c:1},{s:4.4,c:0},{s:5.2,c:1},{s:6,c:0},{s:6.8,c:1},{s:7.6,c:0},{s:8.4,c:1},{s:9.2,c:1},{s:9.8,c:1}],
    knob: { label: "Flag cutoff", min: 0, max: 10, step: 0.25, init: 3 },
    insights: [
      { max: 4, text: "The old operating point: generous catching, generous alarming. Under the new costs, this point is now the wrong ORDER — not a wrong MODEL.", tone: "info" },
      { max: 7.5, text: "Sliding right along the curve: fewer alarms, fewer catches, same AUC. The adjustment took one config change and zero retraining.", tone: "info" },
      { max: 10, text: "🤯 Separate the two layers forever: the CURVE is the model's skill (change it by retraining); the DOT is policy (change it by config). Most 'model problems' are dot problems.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Model vs operating point", formula: "skill lives in the curve · policy lives in the threshold",
      text: "The closing idea of this topic: evaluation separates what the model CAN do from what you CHOOSE to do with it. Keep those two conversations apart and metrics stop being confusing." }
  }
}
];
