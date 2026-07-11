/* Logistic Regression — Part III: Advanced Study. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).logreg3 = [

{
  q: "Two near-duplicate features — 'income' and 'declared salary' (correlation 0.98) — enter a logistic regression. Predictions stay fine, but the coefficients go haywire: +8.2 on one, −7.9 on the other. What's happening?",
  choices: ["Multicollinearity: near-duplicates make individual weights unidentifiable — only their SUM is pinned down, so huge opposite weights are 'free' — while predictions remain stable", "The solver diverged and the model is unusable", "One feature is leaking the target", "The features need one-hot encoding", "The intercept absorbed the difference"],
  explain: "The model needs the pair's combined effect ≈ +0.3; infinitely many splits achieve it (+8.2 & −7.9, +0.15 & +0.15…), and tiny data changes flip between them. Predictions barely move (the sum is stable), but per-feature interpretation is destroyed — and coefficient standard errors balloon. Fixes: drop or combine the duplicates, use L2 (shares the weight across the pair) — and never read individual weights of correlated features as 'importance'.",
  simple: "Two people always shout the same message in unison. The model must decide how much to credit each — but any split of credit works, as long as it adds up right. So one retrain says 'A is a hero, B a villain', the next says the opposite; the SHOW (predictions) is identical either way. The lesson: when features move together, their individual weights are bookkeeping fiction. Read the pair's combined effect, or break up the duo.",
  widget: {
    type: "curveStatic", title: "Credit games between twins",
    world: "The same model retrained on five bootstrap samples. Watch the two twin features' weights swing wildly and oppositely — while their SUM and the model's accuracy never move.",
    xlab: "retrain →", xs: [0,1,2,3,4], labels: ["run 1","run 2","run 3","run 4","run 5"], dec: 1, yunit: "",
    series: [
      { name: "weight: income", ys: [8.2, -3.1, 4.6, -6.8, 1.9] },
      { name: "weight: declared salary", ys: [-7.9, 3.4, -4.3, 7.1, -1.6] },
      { name: "their sum", ys: [0.3, 0.3, 0.3, 0.3, 0.3] }
    ],
    knob: { label: "Retrain", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Run 1 vs 2: income's weight swings from +8.2 to −3.1. Anyone 'interpreting' run 1 would have told a confident, wrong story.", tone: "warn" },
      { max: 3, text: "Every run: the two weights mirror each other almost perfectly — the model only ever cared about their total.", tone: "info" },
      { max: 4, text: "🤯 The green line never moves: sum = 0.3 in all five runs, and accuracy is identical too. Multicollinearity breaks INTERPRETATION, not prediction — know which one your project needs before you panic (or worse, don't).", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Multicollinearity", formula: "correlated features ⇒ only combined effects identifiable · L2 stabilises, VIF diagnoses",
      text: "Check with correlation matrices/VIF. For interpretation: drop/combine duplicates or use L2 and report grouped effects. Predictions were never in danger." }
  }
},

{
  q: "Medication helps young patients but harms elderly ones. A logistic regression with features [medication, age] insists the medication effect is one number for everyone. What's missing, and what's the classical fix?",
  choices: ["An INTERACTION term (medication × age): plain logistic regression is additive in its features and cannot express 'the effect of X depends on Y' unless you hand it the product", "A deeper network — logistic regression can't be fixed", "More training data", "A smaller learning rate", "Removing age from the model"],
  explain: "In log-odds space the model is w₁·med + w₂·age + b — medication's contribution w₁ is the same at every age by construction. Adding the product column med×age gives the effect an age-dependent slope: w₁ + w₃·age. This is feature engineering for expressiveness: polynomial/interaction features (PolynomialFeatures) let a linear model draw curves and conditionals, at the price of more features to regularise. Trees and boosting, by contrast, discover interactions automatically — a key reason they win on interaction-heavy tabular data.",
  simple: "The model's grammar only has sentences like 'medication adds +2, age adds −1' — every ingredient contributes its fixed amount, no matter the company it keeps. 'Medication helps YOUNG patients' isn't sayable in that grammar. The trick: create a new ingredient that literally IS the combination (medication×age), so the fixed-contribution grammar can now price the combination itself. Same model, richer vocabulary — you write the sentences, it learns the numbers.",
  widget: {
    type: "curveStatic", title: "Teaching an additive model to say 'it depends'",
    world: "True benefit of the medication by age, vs what the model predicts — without and with the interaction column. Slide across patient age.",
    xlab: "patient age →", xs: [0,1,2,3,4], labels: ["25","40","55","70","85"], dec: 1, yunit: "",
    series: [
      { name: "true effect on log-odds", ys: [2, 1.2, 0.3, -0.6, -1.5] },
      { name: "model WITH med×age", ys: [1.9, 1.15, 0.35, -0.55, -1.4] },
      { name: "model without interaction", ys: [0.3, 0.3, 0.3, 0.3, 0.3] }
    ],
    knob: { label: "Age", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Young patients: true effect +2, the interaction-free model says +0.3 — its single number is the AVERAGE effect over everyone, wrong for almost everyone individually.", tone: "warn" },
      { max: 3, text: "The interaction model tracks the flip from helpful to harmful — one extra column made 'it depends on age' expressible.", tone: "info" },
      { max: 4, text: "🤯 At 85 the flat model still says +0.3 while the truth is −1.5 — a recommendation with the SIGN wrong. Additivity is a strong, silent assumption; interactions are how you selectively repeal it. (Trees repeal it automatically — that's their trade.)", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Interaction terms", formula: "add x₁·x₂ ⇒ effect of x₁ becomes w₁ + w₃·x₂ (depends on x₂)",
      text: "sklearn: PolynomialFeatures(interaction_only=True) inside a pipeline, then regularise — interactions multiply feature counts fast. Domain knowledge picks the few that matter." }
  }
},

{
  q: "sklearn's LogisticRegression offers solvers: liblinear, lbfgs, saga, newton-cg. Training hangs or warns 'failed to converge' on your 2M-row, L1-penalised job. What's the practical solver map?",
  choices: ["lbfgs = default for L2 on medium data; saga = the one for L1/elastic-net on BIG data; liblinear = small binary problems; and scale your features — unscaled data is the #1 cause of non-convergence", "Solvers are interchangeable; the warning is cosmetic", "newton-cg is required for L1", "liblinear is always fastest at scale", "Convergence warnings mean the data is unlearnable"],
  explain: "All solvers minimise the same convex loss — they differ in HOW: liblinear (coordinate descent) suits small/binary, doesn't do true multinomial; lbfgs (quasi-Newton) is the robust L2 default; saga (stochastic) scales to millions of rows and is the only one supporting elastic-net; newton-cg handles multinomial L2 well. Convergence trouble is usually preprocessing, not solver: unscaled features create a badly-conditioned loss surface that any solver crawls across. StandardScaler + max_iter bump solves 90% of warnings.",
  simple: "Same mountain, different hiking styles: a careful map-reader (lbfgs) for normal terrain, a sprinter taking many small random steps (saga) when the mountain is enormous, a specialist for small hills (liblinear). They all reach the same summit — the loss is one smooth bowl — but pick the wrong style for the terrain and you'll wait forever. And the 'failed to converge' warning usually means the mountain was made absurdly steep-and-flat by unscaled features: fix the terrain (scale), not just the hiker.",
  widget: {
    type: "curveStatic", title: "Same summit, different hikers",
    world: "Training time (log-ish, seconds) for three solvers as rows grow, on an L1 problem with scaled features. One line stops early — that solver doesn't support the penalty at scale.",
    xlab: "training rows →", xs: [0,1,2,3,4], labels: ["10k","100k","500k","2M","10M"], dec: 0, yunit: "s",
    series: [
      { name: "saga", ys: [2, 8, 25, 80, 340] },
      { name: "lbfgs (L2 only)", ys: [1, 6, 35, 190, 1400] },
      { name: "liblinear", ys: [1, 12, 110, 900, 6000] }
    ],
    knob: { label: "Rows", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Under 100k rows, everything finishes over coffee — solver choice is a non-issue on small data (use the default and move on).", tone: "info" },
      { max: 3, text: "At 2M rows the stochastic saga is 2–10× faster — and it's the ONLY solver here that actually supports your L1/elastic-net penalty properly at this scale.", tone: "info" },
      { max: 4, text: "🤯 10M rows: saga 6 minutes, liblinear 100. Same bowl, same optimum — pure algorithmics. And had the features been unscaled, ALL these times would explode: conditioning beats solver choice every time.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The solver map", formula: "lbfgs: L2 default · saga: L1/elastic-net + big n · liblinear: small binary · always scale",
      text: "Convergence warnings: scale features, raise max_iter, THEN consider solvers. The loss is convex — failures are conditioning, not local minima." }
  }
},

{
  q: "You need honest p-values and confidence intervals on coefficients for a regulatory report, and reach for sklearn's LogisticRegression. Two traps await. What are they?",
  choices: ["sklearn regularises BY DEFAULT (C=1.0 shrinks every coefficient) and provides no standard errors — for inference, disable the penalty or use statsmodels", "sklearn caps coefficients at ±1", "p-values require scaled features only", "Confidence intervals only exist for linear regression", "There are no traps; coef_ is publication-ready"],
  explain: "Trap 1: sklearn is a prediction library — LogisticRegression silently applies L2 with C=1.0, biasing every coefficient toward zero. Shrunken coefficients are great for generalisation and invalid for classical inference. Trap 2: sklearn computes no standard errors, so no p-values or CIs exist to report. For inference use statsmodels' Logit (unpenalised, full inferential output) or set penalty=None knowingly. The deeper lesson: prediction and inference are different games with different optimal tools.",
  simple: "sklearn quietly puts every coefficient on a leash (regularisation) because leashed coefficients PREDICT better — but your report asks what the data says about each coefficient, and a leashed answer is a biased answer. And even unleashed, sklearn won't tell you the uncertainty around each number, which is the entire substance of a p-value or interval. Different job, different tool: statsmodels was built for exactly this report. Using sklearn's defaults there is like submitting a photo through a beauty filter as evidence.",
  widget: {
    type: "curveStatic", title: "The silent leash",
    world: "One coefficient's estimate across regularisation strengths, with the truth marked. See what sklearn's default (C=1) does — and what the report should have contained.",
    xlab: "regularisation strength (1/C) →", xs: [0,1,2,3,4], labels: ["0 (none)","0.1","1 (sklearn default)","10","100"], dec: 2, yunit: "",
    series: [
      { name: "estimated coefficient", ys: [0.82, 0.74, 0.55, 0.21, 0.04] },
      { name: "true coefficient", ys: [0.8, 0.8, 0.8, 0.8, 0.8] }
    ],
    knob: { label: "Penalty strength", min: 0, max: 4, step: 1, init: 2 },
    insights: [
      { max: 0, text: "Unpenalised: 0.82 vs truth 0.8 — an honest estimate (with honest sampling noise), the kind classical inference is built on.", tone: "info" },
      { max: 2, text: "sklearn's default: 0.55 — the leash has already shrunk the estimate by a third. Excellent for prediction; as 'the effect of income', it's simply biased.", tone: "warn" },
      { max: 4, text: "🤯 Heavy penalty: 0.04 — the effect has been regularised nearly out of existence. Same data, same model family; the DEFAULT settings answered a different question than the report asked. Prediction tools optimise generalisation; inference tools optimise honesty about parameters. Know which game you're in.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Prediction vs inference", formula: "sklearn: penalised, no SEs · statsmodels Logit: unpenalised + p-values/CIs",
      text: "For coefficients-as-findings: statsmodels (or penalty=None + bootstrap). For predictions: keep the leash — it's why the model generalises." }
  }
},

{
  q: "For a 4-class problem, logistic regression can be trained as one multinomial (softmax) model or as four one-vs-rest binary models. How do the two schemes actually differ in behaviour?",
  choices: ["Multinomial optimises one joint softmax whose probabilities are coherent by construction; OvR trains independent yes/no models whose scores can disagree and need renormalising — usually similar accuracy, cleaner probabilities from multinomial", "OvR is always more accurate", "Multinomial only works for 2 classes", "OvR trains one model total", "They are mathematically identical in every case"],
  explain: "OvR asks four separate questions ('cat vs not-cat', …) — each model never sees the full competition, so their four independent sigmoid outputs can sum to anything (renormalised after the fact) and calibration suffers near boundaries. Multinomial trains all classes jointly under one softmax: probabilities compete in one budget and sum to 1 natively. Accuracy differences are usually small; probability QUALITY and boundary coherence favour multinomial — which is why sklearn switched its default. OvR retains value for huge class counts (parallel, incremental per-class training).",
  simple: "OvR is four referees, each judging only 'is it my class, yes or no?', never conferring — then someone glues their four confident-in-isolation verdicts together and hopes they're consistent. Softmax is one referee ranking all four classes in a single judgement, forced to distribute 100% of belief among them. Both usually pick the same winner; but ask 'HOW confident, in each class?' and the panel of non-conferring referees gives you numbers that don't quite add up — because nobody made them.",
  widget: {
    type: "curveStatic", title: "Four referees vs one judgement",
    world: "A test point slides from deep inside class A toward the A/B border. Compare each scheme's P(A): softmax stays coherent; OvR's glued-together score misbehaves near the boundary.",
    xlab: "position: A-heartland → A/B border →", xs: [0,1,2,3,4], labels: ["deep A","","midway","","on the border"], dec: 0, yunit: "%",
    series: [
      { name: "P(A), multinomial softmax", ys: [96, 88, 72, 58, 50] },
      { name: "P(A), one-vs-rest (renormalised)", ys: [97, 91, 80, 69, 61] }
    ],
    knob: { label: "Position", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Deep in A's heartland both schemes agree: ~96%. Easy cases hide the difference — as usual.", tone: "info" },
      { max: 3, text: "Approaching the border the curves separate: OvR's 'A vs everyone' referee never learned where B specifically begins, so its confidence decays too slowly.", tone: "info" },
      { max: 4, text: "🤯 ON the border, softmax says 50% (correct — it's a coin flip between A and B) while OvR still claims 61%. Same data, same family — the joint objective is what makes probabilities MEAN something at the boundaries, where decisions actually happen.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Multinomial vs one-vs-rest", formula: "softmax: joint, coherent probabilities · OvR: independent binaries, glued after",
      text: "sklearn's LogisticRegression is multinomial by default now. Reach for OvR when classes number in the thousands or must be trained/updated independently." }
  }
},

{
  q: "Lasso (L1) on data with a GROUP of five correlated useful features behaves oddly: it picks one of the five at random and zeroes the rest. Elastic net was invented for exactly this. What does it do differently?",
  choices: ["It blends L1 + L2: the L2 part spreads weight across the correlated group (keeping or dropping it together), while the L1 part still zeroes genuinely useless features", "It doubles the L1 penalty", "It removes the need for feature scaling", "It applies L1 to half the features and L2 to the other half", "It is L1 with a higher learning rate"],
  explain: "Pure L1's solution is unstable under correlation: any one of the five twins can carry the group's signal, so the winner is arbitrary (and flips between retrains — terrible for reproducible science or stable pipelines). Adding an L2 component makes the penalty strictly convex, and the optimum shares weight smoothly across correlated features: the 'grouping effect'. You keep L1's sparsity for irrelevant features and gain L2's stability for correlated ones. Ratio controlled by l1_ratio; solver must be saga in sklearn.",
  simple: "Five witnesses saw the same thing. Lasso's rule — 'testimony is taxed per witness, so use as few as possible' — makes it put ONE witness on the stand, chosen basically by coin flip, and dismiss the rest. Rerun the trial, different witness. Elastic net adds a second rule — 'no single witness should carry everything' — so the five share the stand with smaller roles each, while witnesses with nothing to say still get dismissed entirely. Sparser than ridge, more stable and more honest than lasso.",
  widget: {
    type: "curveStatic", title: "One witness or the whole group",
    world: "Five correlated useful features (+ 20 useless ones), fitted repeatedly. Compare how many of the five each penalty keeps — and how often retrains agree on WHICH features survived.",
    xlab: "penalty →", xs: [0,1,2,3], labels: ["L2 (ridge)","elastic net 0.5","elastic net 0.9","L1 (lasso)"], dec: 0, yunit: "",
    series: [
      { name: "of the 5 twins kept", ys: [5, 5, 4, 1] },
      { name: "retrain agreement (%)", ys: [98, 94, 82, 41] },
      { name: "useless features kept (of 20)", ys: [20, 2, 1, 0] }
    ],
    knob: { label: "Penalty", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Ridge: keeps all five twins (good, stable) — but also all 20 useless features, just with small weights. No sparsity, no feature selection.", tone: "info" },
      { max: 1, text: "Elastic net at l1_ratio 0.5: the twins ALL survive with shared weight, the 20 duds are nearly all zeroed, and retrains agree 94% of the time. Both penalties' virtues, one model.", tone: "info" },
      { max: 3, text: "🤯 Pure lasso: one twin survives — a different one on 59% of retrains. Any 'the model selected income, not salary' story is a coin-flip narrated with confidence. Under correlation, lasso's selections are unstable BY DESIGN; elastic net is the fix, not a compromise.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Elastic net", formula: "penalty = α(l1_ratio·Σ|w| + (1−l1_ratio)/2·Σw²) — sparsity + grouping",
      text: "sklearn: LogisticRegression(penalty='elasticnet', solver='saga', l1_ratio=…). Default choice when you want selection AND your features (like all real features) are correlated." }
  }
}
];
