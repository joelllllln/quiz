/* Stacking & Voting — Part III: Advanced Study. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).stack3 = [

{
  q: "Kaggle winners sometimes stack in LAYERS: base models → meta-models → a final blender. Each extra layer adds less and risks more. What's the honest economics of deep stacks?",
  choices: ["Layer 1 captures most of the gain; each further layer adds noise-level improvements while multiplying leakage risk, compute and fragility — competitions tolerate that, production almost never should", "Every layer adds as much as the first", "Deep stacks reduce overfitting automatically", "Three layers is the proven optimum everywhere", "Layers beyond one are mathematically impossible"],
  explain: "The first meta-layer earns real gains: it learns which base model to trust where, from genuinely diverse errors. But its OUTPUT is already near the achievable ceiling — layer 2 learns corrections of corrections estimated from the same finite out-of-fold data, so its 'signal' is increasingly resampling noise. Meanwhile every layer must maintain the out-of-fold discipline end-to-end (one slip = leakage that inflates CV and dies on the private leaderboard), retraining cost multiplies, and the artifact becomes unmaintainable. Competition economics (0.01% = prize money, ship-once) tolerate this; production economics (maintenance, latency, debugging) rarely do. The graveyard of ML systems is full of second layers.",
  simple: "The first committee-of-committees genuinely helps: a chairperson who has learned 'trust the forest on messy segments, the linear model on smooth ones'. Now appoint a chairperson to oversee the chairperson. What's left to learn? Corrections of corrections — read from the same limited exam papers, which at this depth are mostly noise wearing a pattern costume. In a contest where third place loses by 0.02%, harvesting even noise-level crumbs pays. In production, every layer is one more thing that breaks at 3am for a gain nobody's dashboard can even see. Depth one: engineering. Depth three: sport.",
  widget: {
    type: "curveStatic", title: "Crumbs at altitude",
    world: "A real competition pipeline built layer by layer: leaderboard gain per added layer, against total pipeline fragility (fits required, leak surfaces, retrain hours — indexed).",
    xlab: "stack depth →", xs: [0,1,2,3,4], labels: ["best single","+ layer 1 (meta)","+ layer 2","+ layer 3","+ mega-blend"], dec: 2, yunit: "",
    series: [
      { name: "score (%)", ys: [91.2, 92.4, 92.55, 92.61, 92.63] },
      { name: "fragility index", ys: [1, 6, 20, 55, 140] }
    ],
    knob: { label: "Depth", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Layer 1: +1.2 points — the real, reproducible stacking dividend: diverse errors, learned trust. Fragility 6× but arguably worth it even in production sometimes.", tone: "info" },
      { max: 2, text: "Layer 2: +0.15 for 3× more fragility. That gain is within CV noise — you can't even be sure it's real without the private leaderboard to confirm.", tone: "warn" },
      { max: 4, text: "🤯 Full tower: +0.08 more at 140× fragility — in a competition, that 0.08 was the prize margin; in production it's negative value with a pager attached. Same maths, opposite verdicts: economics, not algorithms, decide stack depth.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Multi-layer stacking economics", formula: "gain per layer ↓ geometrically · fragility ↑ multiplicatively",
      text: "Competitions: stack until the leaderboard stops moving. Production: one meta-layer, strong out-of-fold hygiene, and a distillation plan (train one model to mimic the stack)." }
  }
},

{
  q: "StackingClassifier has passthrough=True, which hands the meta-model the RAW FEATURES alongside the base predictions. When does that flag genuinely earn its keep?",
  choices: ["When trust in base models should be CONTEXT-DEPENDENT — raw features let the meta-model learn 'believe the forest on segment X, the linear model elsewhere', not just fixed global weights", "It never helps; predictions contain everything", "Only when base models are identical", "It replaces the need for out-of-fold predictions", "Only for regression problems"],
  explain: "Without passthrough the meta-model sees only prediction columns — it can learn global weights ('forest 0.6, logistic 0.4') but cannot condition on WHERE the case lives. With raw features it can learn interactions between context and trust: the forest is reliable for high-activity customers, the linear model for sparse new accounts, NB for text-heavy rows. That's a routing function (soft mixture-of-experts), not just a weighting. Costs: the meta-problem gets wider (overfit risk on small data — keep the meta-model regularised), and the leak discipline is unchanged (raw features are fine; base predictions must stay out-of-fold). Use when base models have complementary REGIONS of strength, and enough meta-training rows to learn the map.",
  simple: "A chairperson who only ever sees the experts' verdicts can learn one thing: whose word to weight, on average. Give the chairperson the case FILE too, and they can learn something better: 'on corporate clients, the accountant is nearly always right; on startups, listen to the scout'. Trust becomes conditional on context — a routing rule instead of a fixed recipe. The price is a harder job (more to overfit, same leak rules), so it pays exactly when the experts genuinely have different home turfs and you have enough cases to learn the map of who owns which turf.",
  widget: {
    type: "curveStatic", title: "From fixed weights to a routing map",
    world: "Meta-model accuracy across customer segments: predictions-only stacking (fixed global weights) vs passthrough (context-aware routing). The base models have opposite home turfs.",
    xlab: "customer segment →", xs: [0,1,2,3], labels: ["heavy users","regular","sparse/new","text-heavy"], dec: 1, yunit: "%",
    series: [
      { name: "passthrough stack", ys: [93, 90.5, 88, 91] },
      { name: "predictions-only stack", ys: [91, 90, 84, 86.5] },
      { name: "best single model per segment", ys: [92, 89, 87, 90] }
    ],
    knob: { label: "Segment", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Heavy and regular users: the two stacks nearly tie — when one base model dominates everywhere, a global weight is all you need and passthrough adds little.", tone: "info" },
      { max: 2, text: "Sparse/new accounts: predictions-only (84) falls BELOW the best single model (87) — its global weights average in the forest exactly where the forest is weakest. Passthrough learned to route around it: 88.", tone: "warn" },
      { max: 3, text: "🤯 Passthrough beats the per-segment best single model on every segment — it isn't picking winners, it's BLENDING with context-dependent weights: a soft mixture of experts. That's the real upgrade passthrough buys, and it needed the raw features to see the context at all.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Passthrough stacking (context-aware trust)", formula: "meta-input = [base predictions ⊕ raw features] → learned routing, not fixed weights",
      text: "sklearn: StackingClassifier(passthrough=True), regularise the meta-model. Wins when base models have different home turfs; skip it when one model dominates uniformly." }
  }
},

{
  q: "Stacking a demand forecaster, you generate out-of-fold predictions with standard shuffled 5-fold CV — on TIME-SERIES data. The stack's CV is stellar; production is a disaster. Where exactly did the time leak enter?",
  choices: ["Shuffled folds let base models train on the FUTURE of the rows they predict — the meta-model then learns to trust base models at an accuracy they'll never have in production; use walk-forward out-of-fold generation", "Stacking is inherently invalid for time series", "The meta-model needed more folds", "Demand data cannot be predicted", "The leak is in the final refit, not the folds"],
  explain: "The oof mechanics were followed to the letter — each base prediction came from a model that didn't train on that row. But with shuffled folds, the model DID train on that row's neighbours in time, including its future: interpolation dressed as forecasting. The base oof columns are therefore unrealistically accurate, and the meta-model calibrates its trust to that fiction — trust that shatters when production offers genuine forecasts. Fix: generate oof predictions with expanding-window walk-forward (train on past block, predict next block, roll), stack on THOSE, and validate the whole stack on a final untouched future window. General law: every layer of a pipeline must respect the data's dependence structure; oof discipline handles row-reuse, not time's arrow.",
  simple: "You followed the sacred stacking rule — no model grades a row it trained on. But your folds were shuffled in time, so each model trained on next week while 'forecasting' last Tuesday: gap-filling, not forecasting, and eerily accurate. The chairperson (meta-model) watched these fake-brilliant experts and learned to lean on them hard. In production the experts became honest — merely decent forecasters — but the chairperson still trusts like it's the fake era. The whole training theatre must run under production's rules: only ever predict FORWARD, even when generating the practice material.",
  widget: {
    type: "curveStatic", title: "Experts brilliant only in rehearsal",
    world: "The stack built two ways, tracked from oof-generation through production. Watch WHERE the shuffled version's numbers detach from reality.",
    xlab: "measurement →", xs: [0,1,2,3], labels: ["base oof accuracy","meta CV score","final holdout (future)","production"], dec: 0, yunit: "%",
    series: [
      { name: "walk-forward oof stack", ys: [78, 82, 81, 80] },
      { name: "shuffled oof stack", ys: [91, 93, 79, 76] }
    ],
    knob: { label: "Measurement", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Base oof accuracy: 91 shuffled vs 78 walk-forward. The 13-point gap IS the interpolation subsidy — models filling gaps between dates they'd seen both sides of.", tone: "warn" },
      { max: 2, text: "On the untouched future window the shuffled stack crashes to 79 — BELOW the walk-forward stack: its meta-model over-trusts base models at rehearsal-only accuracy, and even mis-weights them relative to each other.", tone: "info" },
      { max: 3, text: "🤯 Production: honest stack 80 (as its CV promised), shuffled stack 76 (its 93 was fiction). Note the honest stack's numbers barely move across the row — THAT stability is what a trustworthy evaluation looks like. Time leaks don't just inflate scores; they corrupt the learned trust itself.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Walk-forward out-of-fold stacking", formula: "oof for temporal data = expanding-window forecasts, layer by layer",
      text: "Same discipline for grouped data: GroupKFold-based oof. The oof rule prevents self-grading; the SPLIT design must separately respect time and groups." }
  }
},

{
  q: "Soft voting averages predict_proba across members — but your committee mixes a calibrated logistic, an overconfident boosted model, and an under-confident forest. What silently goes wrong, and what's the pre-vote fix?",
  choices: ["Averaging treats every stated probability as equally honest, so the loudest (most extreme) member dominates every vote regardless of skill — calibrate each member first, THEN average", "Soft voting requires identical model families", "Nothing; averaging cancels calibration errors", "Use hard voting, which reads probabilities more carefully", "Divide each probability by the member's accuracy"],
  explain: "Soft voting's mean is pulled hardest by whoever strays furthest from 0.5 — and distance from 0.5 reflects a model's calibration DIALECT, not its skill: boosting shouts (0.98s), forests mumble (0.7s), logistic speaks plainly. Uncalibrated, the committee is a weighted vote where weight = overconfidence. Fix: wrap each member in CalibratedClassifierCV so every stated 0.9 means the same thing (true 90%), then average — now disagreements resolve by evidence, not by volume. (Stacking learns per-member trust weights, which partially compensates — one more reason it beats naive voting; but calibrated inputs help it too.) Committee rule: standardise the language before counting the votes.",
  simple: "Three doctors vote on a diagnosis by averaging their stated confidence. One habitually says 99% when they mean 'probably'; another says 65% when they mean 'almost certain'; the third means exactly what they say. The average is dominated by the braggart every single time — not because he's right more, but because he speaks in extremes. Fix the dialects first: learn from track records that this doctor's '99' historically means 80, that one's '65' means 90, and translate before averaging. Same doctors, same opinions — now the vote measures evidence instead of volume.",
  widget: {
    type: "curveStatic", title: "Volume vs evidence",
    world: "One disputed case: the true probability is 30% positive. Watch each member's raw statement, the raw soft-vote, and the calibrated soft-vote — and who actually swung the raw result.",
    xlab: "committee stage →", xs: [0,1,2,3], labels: ["boosted says","forest says","logistic says","the votes"], dec: 0, yunit: "%",
    series: [
      { name: "raw stated P(positive)", ys: [92, 55, 33, 60] },
      { name: "after per-member calibration", ys: [64, 38, 32, 45] },
      { name: "true probability", ys: [30, 30, 30, 30] }
    ],
    knob: { label: "Stage", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "The boosted model shouts 92% — its dialect: on cases where it says 92, reality historically says ~64. Skill and volume are different axes.", tone: "info" },
      { max: 2, text: "The logistic model — the best calibrated member — says 33%, nearly the truth. In the raw average it gets exactly one-third of the say, same as the shouter.", tone: "warn" },
      { max: 3, text: "🤯 Raw soft-vote: 60% → the committee flags a case that's truly 30% — the braggart singlehandedly flipped the decision. Calibrated soft-vote: 45%, correct side of the threshold. Calibration didn't change anyone's ranking skill; it took away the megaphone. Standardise the language, then count.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Calibrate before you average", formula: "soft vote assumes shared probability language · CalibratedClassifierCV per member restores it",
      text: "Applies to any probability averaging: ensembles, model merging, human-AI teams. Stacking's learned weights are the general fix; calibrated inputs make even it better." }
  }
},

{
  q: "Your 12-model stack wins offline but can't ship: 40ms latency budget, one model's worth of memory. Knowledge distillation promises to keep (most of) the gain. What's the mechanism?",
  choices: ["Train ONE student model to mimic the stack's PROBABILITY outputs (soft targets) on abundant unlabelled data — the soft labels carry the ensemble's learned dark knowledge, and the student often lands within a fraction of the teacher", "Delete the 11 weakest models", "Compress the models' weights with gzip", "Cache the stack's predictions for all possible inputs", "Ship the stack to a bigger server — distillation is a server upgrade"],
  explain: "Hinton's insight: an ensemble's value at inference time is the FUNCTION it computes, and its probability outputs are far richer training targets than 0/1 labels — a stated 0.7/0.25/0.05 encodes similarity structure ('this case resembles class B somewhat') that hard labels destroy. Procedure: run the stack over lots of input data (unlabelled works — the teacher labels it), train a single fast model on those soft targets (optionally temperature-smoothed), validate against the teacher AND the original task. Students routinely recover 80–95% of the ensemble's edge at 1/10th the cost — and the same trick compresses giant neural nets into phone-sized ones. The stack becomes a training-time tool rather than a runtime liability.",
  simple: "The committee of twelve is brilliant but too slow to bring to the meeting. So have one bright apprentice shadow it: for thousands of cases, the committee doesn't just say 'approve/deny' — it says 'approve, 71% sure, and the hesitation is about the debt ratio'. Those graded, nuanced verdicts teach the apprentice HOW the committee thinks, far faster than raw right/wrong answers ever could (and the cases don't even need true labels — the committee provides them). Soon the apprentice alone scores nearly as well, fits the latency budget, and the committee retires to the training room, where slowness doesn't matter.",
  widget: {
    type: "curveStatic", title: "The apprentice and the committee",
    world: "Distilling the 12-model stack into one gradient-boosted student: accuracy vs unlabelled distillation data used — against the teacher, the same student trained on hard labels only, and the latency budget reality.",
    xlab: "distillation examples →", xs: [0,1,2,3,4], labels: ["10k","50k","200k","1M","5M"], dec: 1, yunit: "%",
    series: [
      { name: "student on soft targets", ys: [89.5, 91, 91.9, 92.3, 92.5] },
      { name: "teacher stack (40× over budget)", ys: [92.8, 92.8, 92.8, 92.8, 92.8] },
      { name: "student on hard labels", ys: [88.8, 89.6, 90.1, 90.3, 90.4] }
    ],
    knob: { label: "Distillation data", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "50k examples: the soft-target student (91) already beats the hard-label student (89.6) by 1.4 — same architecture, same data, richer labels. That gap is the dark knowledge.", tone: "info" },
      { max: 3, text: "1M examples — cheap, since the teacher labels them itself: student at 92.3, within half a point of the 12-model committee, at 1/40th the latency.", tone: "info" },
      { max: 4, text: "🤯 The ceiling: 92.5 vs teacher's 92.8 — 88% of the stacking gain, shippable in one model. The hard-label student NEVER gets there (90.4 plateau): the probabilities, not just the data volume, carried the ensemble's knowledge. Ensembles as teachers, not tenants: that's how stacks reach production.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Knowledge distillation", formula: "student trained on teacher's soft probabilities (± temperature) over abundant data",
      text: "Hinton et al. 2015. Works stack→GBM, BERT→DistilBERT, GPT→phone model. The ensemble's function is portable; its architecture never was." }
  }
},

{
  q: "Caruana's classic 'ensemble selection': from a library of 200 assorted fitted models, greedily add (WITH replacement) whichever model most improves the validation-set ensemble average; stop when nothing helps. Why does this crude loop beat elegant weight optimisation so often?",
  choices: ["Greedy selection with replacement IS coarse weight learning (counts = weights) but searches a tiny discrete space, so it barely overfits the validation set — and it prunes harmful models to exact zero automatically", "It uses the test set for selection", "Because 200 models always beat 10", "It optimises the weights analytically", "It works only when all 200 models are good"],
  explain: "Fitting 200 continuous weights on a few thousand validation rows is a recipe for overfitting the validation set — the 'optimal' weights harvest its noise. The greedy loop restricts the search brutally: each step has 200 discrete choices, each evaluated by a full-ensemble score; models get picked repeatedly (a model chosen 5 times in 25 steps carries weight 0.2), useless or harmful models simply never get picked (implicit L0 exact-zero pruning). With bagged selection (Caruana's refinement: random subsets of the library per step) it wins benchmarks to this day, needs no gradients or convexity, works with any metric — including non-differentiable ones like AUC. Sometimes the strongest optimiser is the one too constrained to fool itself.",
  simple: "You have 200 singers auditioning for a choir, and a short rehearsal tape to judge with. 'Compute each singer's mathematically optimal volume' sounds smart — but with 200 knobs and one short tape, the knobs end up tuned to the tape's quirks (its coughs and echoes), not to music. The dumb-looking alternative: repeatedly ask 'which ONE singer, added to the choir right now, makes the tape sound best?' — same singer may join twice (louder = more weight); most never join at all (volume zero). Two hundred simple yes-questions can't memorise a tape the way two hundred continuous dials can. Constraint is the anti-overfitting device.",
  widget: {
    type: "curveStatic", title: "Greedy steps vs 200 dials",
    world: "Ensemble selection's greedy loop, step by step — validation and TEST scores tracked — against full continuous weight optimisation on the same library and validation data.",
    xlab: "greedy additions →", xs: [0,1,2,3,4,5], labels: ["1","3","8","15","25","40 (stop)"], dec: 1, yunit: "%",
    series: [
      { name: "greedy ensemble: test", ys: [88, 90.2, 91.4, 91.9, 92.1, 92.1] },
      { name: "greedy ensemble: validation", ys: [88.3, 90.6, 91.8, 92.3, 92.5, 92.6] },
      { name: "200 optimised weights: test", ys: [90.9, 90.9, 90.9, 90.9, 90.9, 90.9] }
    ],
    knob: { label: "Greedy step", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Steps 1–3: the loop grabbed a boosted model, a forest, then the boosted model AGAIN — a repeat pick is a weight increase, no calculus involved.", tone: "info" },
      { max: 3, text: "By step 15, only 9 distinct models of the 200 have ever been chosen — 191 sit at exact weight zero, including several that would have HURT. The continuous optimiser gave 74 of them nonzero weights… fitted to validation noise.", tone: "info" },
      { max: 5, text: "🤯 Endgame: greedy 92.1 on test vs 90.9 for the 'optimal' weights — and note greedy's validation-test gap is 0.5 while the optimiser's weights were 1.6 optimistic. The elegant method had 200 degrees of freedom to fool itself with; the crude one had 40 yes/no choices. Search-space humility IS regularisation.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Greedy ensemble selection", formula: "repeat: add argmax-improvement model (with replacement) · counts become weights · zero by omission",
      text: "Caruana et al. 2004; still the backbone of AutoML enembling (auto-sklearn). Refinements: bagged candidate subsets, initialisation with the top-N models." }
  }
}
];
