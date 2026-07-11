/* Model Evaluation — Part II: Pragmatic Practice. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).metrics2 = [

{
  q: "A churn model validates at 91% on data from your UK customers, then launches in the new German market and scores 74%. The validation wasn't wrong — it answered a different question. Which?",
  choices: ["How the model performs on data like the validation data — which Germany isn't", "Whether the model had overfit its UK training rows", "How well the model ranks customers regardless of market", "How the model behaves once its threshold is retuned for Germany", "How the model performs on any fresh data, regardless of which market it later serves"],
  explain: "A validation score is a promise about data drawn from the same population. Deploy onto a different population — new market, new season, new sensors — and the promise simply doesn't apply. Validate on data that looks like deployment.",
  simple: "A driving test passed in a quiet village says little about rush-hour Berlin. The test was fair — it just tested the wrong roads. Before launch, ask the blunt question: does my validation data actually resemble the traffic I'm about to face?",
  widget: {
    type: "foldPick", title: "Which roads did you test on?",
    world: "One model, validated four ways, then deployed to Germany. Flick through what each validation setup 'promised' — and which one saw the launch coming.",
    blurb: "Same model — different validation populations:",
    folds: [
      { name: "random UK rows", acc: 91 },
      { name: "UK, last quarter only", acc: 89 },
      { name: "UK, new customers only", acc: 84 },
      { name: "small German pilot sample", acc: 76 },
      { name: "actual German launch", acc: 74 }
    ],
    knob: { label: "Validation setup", min: 1, max: 6, step: 1, init: 1 },
    insights: [
      { max: 2, text: "The comfortable numbers came from data most LIKE the training set. True — and useless for a German launch.", tone: "warn" },
      { max: 4, text: "🤯 The tiny German pilot — just a few hundred rows — predicted the launch within 2 points. A small sample of the RIGHT population beats a huge sample of the wrong one.", tone: "wow" },
      { max: 6, text: "Rule: validation data should be a dress rehearsal for deployment — same population, same time-direction, same conditions. Otherwise you've validated a different product.", tone: "info" }
    ],
    extreme: { at: 5 },
    reveal: { name: "Validation–deployment match", formula: "a validation score generalises only to data from the same distribution",
      text: "The most pragmatic evaluation question isn't 'what's the score?' but 'on WHAT?'. Match the rehearsal to the show." }
  }
},

{
  q: "You're splitting 2,000 rows into train and validation. A tiny validation set gives noisy scores; a huge one starves training. What's the actual trade-off you're tuning?",
  choices: ["Precision of the ESTIMATE versus quality of the MODEL", "Bias of the estimate against the model's variance", "How much the model overfits versus how much it underfits", "Precision of the estimate against its own recall", "The compute you spend versus the accuracy you gain"],
  explain: "Hold out 5% and your score swings points on luck; hold out 50% and you've crippled the model you're measuring. The split size buys estimate-precision with model-quality, and 20–30% (or better, cross-validation) is the usual compromise.",
  simple: "You have one pile of sand for a castle and its photo. Use nearly all sand for the castle and the photo is too blurry to judge it; use half for the photo setup and the castle is a stump. Small datasets escape the dilemma with cross-validation: every grain plays both roles in turn.",
  widget: {
    type: "curveStatic", title: "Sand for the castle, sand for the photo",
    world: "Sweep the held-out fraction of 2,000 rows. Two consequences move against each other: how wobbly the score is (±), and how good the trained model can be.",
    xlab: "held out for validation", xs: [0,1,2,3,4], labels: ["2%","10%","25%","50%","80%"], dec: 1, yunit: "",
    series: [
      { name: "score wobble (± points)", ys: [7,3.2,2,1.4,1.1] },
      { name: "model accuracy %", ys: [88,87.5,86.5,83,74] }
    ],
    knob: { label: "Validation fraction", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "2% held out = 40 rows: the score wobbles ±7 points. You can't tell an 84 model from a 90 with a photo that blurry.", tone: "warn" },
      { max: 2, text: "Around 25%: wobble ±2, model barely harmed. This is why 70/30 and 80/20 became folklore.", tone: "info" },
      { max: 4, text: "🤯 80% held out: a beautifully precise measurement… of a starved, bad model. On 2,000 rows the real answer is cross-validation — every row trains AND judges.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The holdout-size trade-off", formula: "bigger validation → tighter estimate, weaker model · small data → use CV instead",
      text: "Estimate quality and model quality draw from the same budget. Cross-validation is the trick that lets small datasets refuse the trade." }
  }
},

{
  q: "K-fold cross-validation: you must pick K. K=2 is cheap but pessimistic; leave-one-out (K=n) is exhaustive but expensive and jittery. What does K=5 or 10 buy you?",
  choices: ["The practical sweet spot: near-honest estimates at a sane compute cost", "A guarantee the estimate carries essentially zero bias", "The lowest-variance estimate that any choice of K can offer", "Near-honest estimates while refitting the model only a single extra time", "Full immunity to the class imbalance that wrecks a single split"],
  explain: "Tiny K trains on half the data, understating the full-data model. Huge K costs n fits and its folds' scores correlate heavily. K=5–10 trains on 80–90% of rows, costs 5–10 fits, and estimates well — hence the default.",
  simple: "K is how many times you re-deal the cards to check your game. Two deals: quick but each uses half a deck. Two thousand deals: exhausting and the answers barely differ. Five to ten deals: enough to trust the average, cheap enough to actually run. That's the whole debate.",
  widget: {
    type: "curveStatic", title: "Choosing K",
    world: "Sweep K on a 2,000-row problem. Watch the estimate's honesty (how close to the true full-data score) against the compute bill.",
    xlab: "K (folds)", xs: [0,1,2,3,4], labels: ["2","5","10","50","2000 (LOO)"], dec: 1, yunit: "",
    series: [
      { name: "estimated score %", ys: [83.5,86,86.8,87.1,87.2] },
      { name: "model fits required", ys: [2,5,10,50,2000] }
    ],
    knob: { label: "K", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "K=2: each fold trains on only half the data, so the estimate (83.5) is unfairly gloomy about the full-data model (~87).", tone: "info" },
      { max: 2, text: "K=5–10: within a point of the truth, for 5–10 fits. This is why sklearn's default cv=5 rarely needs changing.", tone: "info" },
      { max: 4, text: "🤯 Leave-one-out: 2,000 fits to gain 0.1 of honesty over K=10 — and its per-fold scores are so correlated the extra precision is partly an illusion. Diminishing returns, industrialised.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Choosing K in K-fold", formula: "K = 5 or 10: trains on 80–90% of rows, affordable, near-unbiased",
      text: "A genuinely settled question in practice: use 5 or 10, stratified. Spend your saved compute on repeats or better search instead." }
  }
},

{
  q: "You run 5-fold CV twice with different shuffle seeds and get means of 85.2% and 86.4%. Neither run is buggy. What's the professional response?",
  choices: ["Repeat CV several times and average — the fold assignment is itself a source of noise", "Pick the seed whose folds look most balanced, then report that run", "Keep raising K until the two seeded runs finally land on one number", "Average just those two runs; two seeds is more than enough to settle it", "Fix a single shuffle seed across the whole project so every future run reproduces exactly"],
  explain: "Which rows share a fold is random, and it moves the mean by real fractions of a point. RepeatedStratifiedKFold (e.g. 5×5) averages over that randomness too — and tells you the spread that remains.",
  simple: "Shuffling the deck differently deals different hands, and different hands score a bit differently — no one cheated. If a 1-point difference matters to your decision, average over several shuffles. If you can't afford to, treat 1-point differences as weather, not climate.",
  widget: {
    type: "foldPick", title: "Five shuffles, five 'truths'",
    world: "The same model, 5-fold CV run with five different seeds. Flick through the means you might have reported — then land on the honest summary.",
    blurb: "Identical model and data — only the shuffle seed changes:",
    folds: [
      { name: "seed 0", acc: 85 },
      { name: "seed 1", acc: 86 },
      { name: "seed 7", acc: 87 },
      { name: "seed 13", acc: 85 },
      { name: "seed 42", acc: 86 }
    ],
    knob: { label: "Shuffle seed", min: 1, max: 6, step: 1, init: 1 },
    insights: [
      { max: 5, text: "A two-point range from pure shuffle luck. Any model comparison inside that range is comparing seeds, not models.", tone: "warn" },
      { max: 6, text: "🤯 The average across shuffles — 85.8 ± ~0.8 — is the number with a defensible error bar. Now you know your measurement's resolution, and which differences to take seriously.", tone: "wow" }
    ],
    extreme: { at: 6 },
    reveal: { name: "Repeated cross-validation", formula: "RepeatedStratifiedKFold(n_splits=5, n_repeats=5) → mean ± sd over 25 scores",
      text: "CV is a measurement instrument; repeats tell you its resolution. Never claim a difference smaller than your instrument can see." }
  }
},

{
  q: "You tune hyperparameters with CV, then report that same CV score as the model's expected performance. A reviewer objects. What's the clean fix?",
  choices: ["Nested CV — an outer loop scores the WHOLE tuning procedure on data it never touched", "Search a far larger hyperparameter grid so the winner is truly optimal", "Add many more folds to the same CV until the reported estimate settles", "Hold out one final test set and tune the model straight against it instead", "Average the top few configurations' CV scores together to cancel the selection luck out"],
  explain: "The winning configuration won partly by fitting the CV folds' quirks — its own score is a biased estimate. Nested CV wraps tuning inside an outer loop: each outer fold sees a model tuned WITHOUT it, so the final number is honest.",
  simple: "You ran a contest and now quote the winner's contest score as their future performance — but they won partly by suiting THIS contest. Nested CV holds a second, sealed contest that the whole selection process never saw. Score the procedure, not the lucky winner.",
  widget: {
    type: "foldPick", title: "Scoring the contest vs the winner",
    world: "One tuning pipeline, reported three ways — then the deployment truth. Flick through and see which reporting method told the truth in advance.",
    blurb: "Same tuning run — different reporting:",
    folds: [
      { name: "best config's own CV score", acc: 90 },
      { name: "top-3 configs averaged", acc: 89 },
      { name: "nested CV (outer loop)", acc: 86 },
      { name: "deployment, first month", acc: 86 }
    ],
    knob: { label: "Reporting method", min: 1, max: 5, step: 1, init: 1 },
    insights: [
      { max: 2, text: "The winner's own score (90) includes its selection luck — it beat 60 rivals partly by suiting these exact folds. Averaging the top 3 barely helps.", tone: "warn" },
      { max: 4, text: "🤯 Nested CV said 86. Deployment said 86. The outer loop measured the entire PROCEDURE — search, selection and all — on untouched data, so its promise held.", tone: "wow" },
      { max: 5, text: "Cost: K_outer × K_inner × grid fits. When that's too dear, a single untouched test set delivers the same honesty once.", tone: "info" }
    ],
    extreme: { at: 4 },
    reveal: { name: "Nested cross-validation", formula: "outer folds score { inner CV → tune → refit } as one unit",
      text: "Selection is part of the model. Nested CV (or a sealed test set) is how the selection's luck gets excluded from the claim." }
  }
},

{
  q: "An AutoML run tries 2,000 configurations and proudly reports the best validation score: 94.1%. Before any retest, what should you EXPECT about that number?",
  choices: ["It's inflated — the maximum of 2,000 noisy scores overstates the winner's true skill", "It's exact, since validation scores are unbiased no matter how many trials run", "It understates the winner, because AutoML searches unusually cautiously by design", "It's trustworthy, because averaging over 2,000 trials cancels the luck out completely", "It equals the model's training accuracy now that the search has converged"],
  explain: "Each config's score = true skill + luck. Taking the MAX of 2,000 draws systematically selects for positive luck — the winner's true skill is almost surely lower. More trials = more inflation. This is the winner's curse.",
  simple: "Let 2,000 people guess coin flips and the best guesser will look psychic — 60% right! — by luck alone. The more candidates you try, the luckier your champion's score. Expect the retest to come in lower; that's not failure, that's arithmetic.",
  widget: {
    type: "curveStatic", title: "The winner's curse",
    world: "As the search tries more configurations: the best-found validation score, and that same winner's TRUE skill measured on fresh data. Watch the gap grow with the trial count.",
    xlab: "configurations tried", xs: [0,1,2,3,4], labels: ["10","50","200","1000","2000"], dec: 1, yunit: "%",
    series: [
      { name: "best validation score found", ys: [90.5,91.8,92.8,93.7,94.1] },
      { name: "that winner, on fresh data", ys: [90,90.8,91.2,91.4,91.4] }
    ],
    knob: { label: "Configurations tried", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Few trials: the best score is honest-ish — not much luck to select from yet.", tone: "info" },
      { max: 3, text: "The 'best found' keeps climbing while true skill plateaus at ~91.4. Everything above the plateau is selected luck, compounding with every extra trial.", tone: "warn" },
      { max: 4, text: "🤯 2,000 trials: 2.7 points of pure winner's curse. The fix you already know — sealed test set or nested CV — plus the discipline to expect the drop rather than mourn it.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The winner's curse in model search", formula: "E[max of n noisy scores] > true skill of the argmax — inflation grows with n",
      text: "Whenever a number was CHOSEN for being the biggest, distrust it by default. The bigger the search, the bigger the discount." }
  }
},

{
  q: "Model A scores 86.1%, model B 85.4% — but A was measured on one random split and B on a different one. Why is this comparison close to worthless?",
  choices: ["Split luck differs between them — compare on the SAME folds so the luck cancels", "The 0.7-point gap is far too small for accuracy to ever detect at all", "Using two different random seeds is simply forbidden in a fair benchmark", "Whichever model happened to be evaluated first always holds an unfair edge", "Accuracy is the wrong metric for comparing any two models against each other here"],
  explain: "Each score = skill + that split's luck. On different splits, the luck terms differ by more than 0.7 points — the difference could be entirely luck. Same folds for both models makes the comparison PAIRED: luck hits both equally and subtracts out.",
  simple: "Two runners, two different racecourses, times 0.7% apart — who's faster? No idea: one course was downhill. Put them on the SAME course (same folds) and every bump affects both equally, so the gap you see is the runners, not the roads.",
  widget: {
    type: "curveStatic", title: "Same course, fair race",
    world: "Both models scored on the SAME five folds. The folds themselves are bumpy — but watch the gap between the lines, fold by fold. That gap is the real comparison.",
    xlab: "fold (shared by both models)", xs: [1,2,3,4,5], dec: 1, yunit: "%",
    series: [
      { name: "model B", ys: [84,88.5,83,87,86.5] },
      { name: "model A", ys: [82.5,87,81.5,85.5,85] }
    ],
    knob: { label: "Fold", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "The folds swing 5+ points — fold 2 was easy for BOTH, fold 3 hard for BOTH. Unpaired, that swing drowns any model difference.", tone: "info" },
      { max: 3, text: "But look at the GAP: B beats A by ~1.5 on every single fold. The bumps moved both lines together; the difference stayed steady.", tone: "info" },
      { max: 4, text: "🤯 Five out of five folds agree on the winner — THAT consistency, not the raw means, is the evidence. Pairing turned an unanswerable question into a clear one.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Paired model comparison", formula: "same folds for all candidates → compare per-fold DIFFERENCES",
      text: "Fix the randomness, difference it away. The paired design is the single biggest upgrade you can make to any model bake-off." }
  }
},

{
  q: "Two models have identical AUC — yet the fraud team should still prefer model A. Their ROC curves cross. What's going on?",
  choices: ["A is better in the low-false-alarm region where the business operates; B wins where nobody operates", "Equal AUC means the two models are effectively identical, so pick either one", "Model B quietly uses more parameters, so simpler model A is the safer bet", "A actually wins at every operating point, so its AUC merely rounded down to a tie", "The crossing must be a plotting artifact, because two honest ROC curves on one dataset can never cross"],
  explain: "AUC averages over ALL thresholds — including absurd ones. Crossing curves mean each model wins in a different region. If policy caps false alarms at 5%, only the low-FPR region matters; judge the curves THERE.",
  simple: "Two cars, same average speed over a whole track — but one is faster in the corners, the other on the straights. If your race is all corners, the average is a distraction. Look at the model's performance in the region you'll actually drive.",
  widget: {
    type: "curveStatic", title: "Where the curves cross",
    world: "Catch rate at each false-alarm budget for two models with equal AUC. Your business allows at most a 5% false-alarm rate. Slide across the budgets and pick like an operator.",
    xlab: "false-alarm budget", xs: [0,1,2,3,4], labels: ["1%","5%","10%","25%","50%"], dec: 0, yunit: "% caught",
    series: [
      { name: "model A", ys: [58,74,80,88,95] },
      { name: "model B", ys: [35,58,74,92,98] }
    ],
    knob: { label: "False-alarm budget", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "🤯 At the 1–5% budgets — where the business actually lives — A catches 16-23 points more fraud than B. Same AUC, decisively different tool.", tone: "wow" },
      { max: 2, text: "The crossover: past 10% false alarms the ranking flips. B's strength lives in a region policy forbids you from using.", tone: "info" },
      { max: 4, text: "AUC integrated over all budgets and called it a tie. Partial AUC — or simply reading the curve at YOUR budget — is the pragmatic comparison.", tone: "info" }
    ],
    extreme: { at: "min" },
    reveal: { name: "Comparing at the operating region", formula: "when ROC curves cross, compare TPR at your FPR budget (partial AUC)",
      text: "Summary numbers average over decisions you'll never make. Zoom the comparison into the region your policy actually inhabits." }
  }
},

{
  q: "Your model's overall accuracy is a healthy 89%. Then you slice the errors by customer segment and one slice reads 54%. What did the aggregate number do?",
  choices: ["Averaged a badly-served subgroup into invisibility", "Confirmed the weak slice is only sampling noise", "Proved every customer segment performs about equally", "Overstated how badly the other segments were doing", "Revealed that the small segment's labels are corrupt"],
  explain: "A small segment can fail catastrophically while barely denting the average. Slicing performance by segment, source, time and class is how real problems — and sometimes real harms — surface from under a good headline number.",
  simple: "A restaurant with a 4.5-star average can still poison every twentieth customer. Averages bury minorities of any kind. The first move of error analysis is always the same: break the score apart and find who the model is failing.",
  widget: {
    type: "curveStatic", title: "Breaking the average apart",
    world: "One model, one 89% headline — sliced five ways. Slide across the segments and find where the failure has been hiding.",
    xlab: "customer segment", xs: [0,1,2,3,4], labels: ["long-term","new signups","mobile-only","overseas","corporate"], dec: 0, yunit: "%",
    series: [
      { name: "segment accuracy", ys: [93,88,90,54,91] },
      { name: "overall average", ys: [89,89,89,89,89] }
    ],
    knob: { label: "Segment", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 2, text: "Most segments hover near the headline — the average describes THEM fine.", tone: "info" },
      { max: 3, text: "🤯 Overseas customers: 54%. A coin flip, hidden inside an 89% average because the segment is only 8% of the data. No aggregate metric would ever have told you.", tone: "wow" },
      { max: 4, text: "Now the fix can be TARGETED — maybe overseas addresses parse differently, or a feature is missing there. Slicing converts 'improve the model' into a specific, findable bug.", tone: "info" }
    ],
    extreme: { at: 3 },
    reveal: { name: "Sliced evaluation", formula: "report metrics per segment / class / time window / data source — not just overall",
      text: "Aggregates hide failures in proportion to how much you need to see them. Slicing is error analysis step one — and a fairness audit for free." }
  }
},

{
  q: "The single highest-yield error-analysis activity is also the least glamorous. Which is it?",
  choices: ["Reading actual misclassified examples until patterns emerge", "Rerunning the grid search across a much finer parameter mesh", "Swapping in a deeper network with several more layers", "Rounding the reported metrics to three additional decimals", "Porting the whole training pipeline to a faster language"],
  explain: "Confusion matrices count errors; reading them EXPLAINS errors. Twenty minutes of looking at real failures typically surfaces a labelling glitch, a broken feature, or a missing signal — fixes no hyperparameter can deliver.",
  simple: "Metrics tell you HOW MANY you got wrong; the examples tell you WHY. Open thirty misclassified rows and patterns leap out — 'they're all refunds', 'the dates are American format', 'these labels are just wrong'. Machines count; you diagnose.",
  widget: {
    type: "curveStatic", title: "An afternoon of reading errors",
    world: "A stuck project, and five ways the team considered spending the next week. The bars show what each actually bought. Slide through — the order is by effort, not payoff.",
    xlab: "intervention", xs: [0,1,2,3,4], labels: ["finer grid search","bigger model","read 50 errors: fix date bug","read errors: fix 40 bad labels","add feature errors suggested"], dec: 1, yunit: "% gained",
    series: [
      { name: "validation points gained", ys: [0.3,0.6,2.8,1.9,3.4] }
    ],
    knob: { label: "Intervention", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "A week of search and model-swapping: under a point. The model wasn't the bottleneck — the data was, and nobody had looked.", tone: "warn" },
      { max: 3, text: "Reading 50 misclassified examples found a date-parsing bug (+2.8) and 40 mislabeled rows (+1.9). Total cost: one afternoon and some humility.", tone: "info" },
      { max: 4, text: "🤯 The errors also revealed WHAT the model couldn't see — motivating one new feature worth +3.4. Your misclassified examples are a to-do list written by the problem itself.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Error analysis by inspection", formula: "sample misclassifications → group by pattern → fix the biggest group first",
      text: "The highest-ROI habit in applied ML. Andrew Ng teaches it with a spreadsheet; the tooling doesn't matter — the looking does." }
  }
},

{
  q: "Model B beats model A by 1.5 points... on a test set of 200 examples. Statistically, what does that difference amount to?",
  choices: ["Roughly nothing — with n=200 the noise is about ±5 points", "Solid proof that model B is genuinely the stronger one", "Evidence that A is better, by regression to the mean", "A significant win, since 1.5 clears the one-point bar", "Enough to decide, given both ran on the very same test set"],
  explain: "A proportion measured on n examples has standard error ≈ √(p(1−p)/n) — about ±2.6 points per model at n=200, more for a difference. A 1.5-point gap is well inside the noise; you've measured a coin wobble.",
  simple: "Flip a fair coin 200 times and you'll often get 55 heads in a hundred — pure chance. Accuracy on 200 examples wobbles the same way. Small test sets can only detect BIG differences; a 1.5-point gap needs thousands of examples before it means anything.",
  widget: {
    type: "curveStatic", title: "How big must a difference be?",
    world: "The smallest accuracy difference your test set can reliably distinguish from luck, as the test set grows. Slide the size and check your 1.5-point claim against it.",
    xlab: "test-set size", xs: [0,1,2,3,4], labels: ["100","200","1,000","5,000","20,000"], dec: 1, yunit: " pts",
    series: [
      { name: "smallest detectable difference", ys: [9.8,6.9,3.1,1.4,0.7] },
      { name: "your observed difference", ys: [1.5,1.5,1.5,1.5,1.5] }
    ],
    knob: { label: "Test-set size", min: 0, max: 4, step: 1, init: 1 },
    insights: [
      { max: 1, text: "🤯 At n=200 you'd need ~7 points of difference before it out-shouts the noise. Your 1.5 is a whisper in a storm — worth exactly nothing yet.", tone: "wow" },
      { max: 2, text: "At n=1,000 the detection floor drops to ~3 points. Still above your 1.5 — collect more data or run paired CV before claiming victory.", tone: "info" },
      { max: 4, text: "At n=5,000+ a 1.5-point gap finally becomes distinguishable from luck. Sample size isn't bureaucracy — it's the resolution of your measuring device.", tone: "info" }
    ],
    extreme: { at: "min" },
    reveal: { name: "Statistical noise in accuracy", formula: "SE ≈ √(p(1−p)/n) — detectable gap shrinks with √n",
      text: "Before comparing models, know your test set's resolution. Differences below it are weather; report them as ties." }
  }
},

{
  q: "Two models disagree on only 40 of 5,000 test cases: A alone is right on 28 of them, B alone on 12. Which comparison logic do proper paired tests (like McNemar's) use?",
  choices: ["Only the disagreements count — 28 vs 12 is the entire evidence", "The two overall accuracies, 86.2% against 85.9%, settle it", "All 5,000 case outcomes averaged into a single paired score", "The 4,960 agreements prove the two models are effectively identical", "The ratio of each model's training loss to its final accuracy"],
  explain: "On the 4,960 cases where both models answer alike, they provide zero information about which is better. McNemar's test throws them away and asks: among disagreements, is the 28–12 split too lopsided for a fair coin? (Here: yes, p≈0.02.)",
  simple: "If two students give identical answers on 4,960 questions, those questions can't rank them. Look only at the 40 where they differ: one student won 28 of those little duels. Forty duels, 70% won by the same side — that's real signal, and it was hiding inside a 0.3-point accuracy gap.",
  widget: {
    type: "curveStatic", title: "The 40 questions that matter",
    world: "Vary how lopsided the disagreements are (total disagreements fixed at 40). Watch when the split stops looking like coin-flip luck — the essence of McNemar's test.",
    xlab: "duels won by model A (of 40)", xs: [0,1,2,3,4], labels: ["20","24","28","32","36"], dec: 2, yunit: "",
    series: [
      { name: "chance a fair coin does this (p)", ys: [0.5,0.27,0.02,0.001,0.0001] }
    ],
    knob: { label: "A's duel wins", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "20 of 40: a perfectly fair coin. The models are statistically indistinguishable, whatever their headline accuracies say.", tone: "info" },
      { max: 1, text: "24 of 40: p ≈ 0.27 — a fair coin does this all the time. Still nothing.", tone: "info" },
      { max: 4, text: "🤯 28+ of 40: p drops below 0.05 — the lopsidedness is now hard to blame on luck. Notice the ENTIRE verdict came from 40 rows, not 5,000. That's the power of pairing.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "McNemar's test (paired comparison)", formula: "test whether wins among DISAGREEMENTS split like a fair coin",
      text: "The standard significance test for two classifiers on one test set. Agreements are dead weight; the disagreements carry all the evidence." }
  }
},

{
  q: "Your fraud model's F1 improved from 0.71 to 0.74. The CFO asks what that means. What's the only fully satisfying kind of answer?",
  choices: ["Translate it: '≈£40k less fraud and 300 fewer wasted reviews per month'", "Walk them carefully through how the harmonic mean fuses precision and recall", "Reassure them the F1 score will keep climbing over next quarter", "Display the entire confusion matrix and let the raw numbers speak", "Benchmark the 0.74 against rival firms' recently published F1 scores"],
  explain: "Model metrics are internal engineering units. Each TP, FP and FN has an approximate business value — multiply them out and the improvement becomes money, hours, or customers: units the organisation can weigh against costs.",
  simple: "Nobody budgets in F1. But 'catches £40k more fraud and saves 300 review-hours a month' can be weighed against the project's cost in one sentence. The conversion is just counting: each error type, times what it costs, summed. Do the multiplication before the meeting.",
  widget: {
    type: "threshold", title: "From counts to pounds",
    world: "Each missed fraud costs £2,000; each false alarm wastes a £50 review. Slide the cutoff and watch the mistakes priced in real money — then find the cheapest spot.",
    posName: "fraud", negName: "legit", axis: "risk score", show: ["cost", "recall"], costs: { fn: 2000, fp: 50 },
    items: [{s:0.8,c:0},{s:1.6,c:0},{s:2.4,c:0},{s:3.2,c:1},{s:4,c:0},{s:4.8,c:0},{s:5.6,c:1},{s:6.4,c:0},{s:7.2,c:1},{s:8,c:0},{s:8.8,c:1},{s:9.6,c:1}],
    knob: { label: "Flag cutoff", min: 0, max: 10, step: 0.5, init: 8 },
    insights: [
      { max: 3, text: "Aggressive flagging: reviews pile up at £50 each, but look how cheap that is next to a £2,000 miss. The money says: be aggressive.", tone: "info" },
      { max: 7, text: "Each fraud that slips past the cutoff adds £2,000 in one jump — watch the cost lurch as an orange dot exits the zone.", tone: "warn" },
      { max: 10, text: "🤯 The 'tidy' high cutoff is the most EXPENSIVE place on the dial: £8,000 of missed fraud to save a few £50 reviews. Money makes the right operating point obvious in a way F1 never could.", tone: "wow" }
    ],
    extreme: { at: "min" },
    reveal: { name: "Business-metric translation", formula: "value = ΔTP×value_TP − ΔFP×cost_FP − ΔFN×cost_FN, per period",
      text: "The bridge between model land and budget land. Build it once per project and every future improvement explains itself." }
  }
},

{
  q: "The team optimised click-through rate offline for six months; CTR rose 30%, but revenue and retention fell. What failed?",
  choices: ["The proxy — the offline metric stopped agreeing with the business outcome it stood for", "The random seeds slowly drifted apart across the six months of work", "The offline validation set was simply far too small to trust here", "The model quietly lost its probability calibration somewhere over the six long months of tuning", "The significance tests behind the launch were never actually run at all"],
  explain: "Offline metrics are proxies chosen to correlate with business value. Optimise a proxy hard enough and the correlation breaks — clickbait raises clicks while destroying trust. Proxies need periodic re-validation against the real outcome.",
  simple: "You paid the team by clicks, so you got clicks — from ever-trashier recommendations that made people click today and leave next month. Any stand-in measure, pushed hard enough, stops standing in. Regularly check the proxy still points at the thing you actually want.",
  widget: {
    type: "curveStatic", title: "When the proxy breaks",
    world: "Six months of optimising the offline proxy (CTR) — tracked against the real goal (revenue). Watch the two lines part company, and find the month things went wrong.",
    xlab: "months of proxy optimisation", xs: [0,1,2,3,4,5], labels: ["0","1","2","3","4","6"], dec: 0, yunit: "",
    series: [
      { name: "click-through rate (index)", ys: [100,108,115,121,126,130] },
      { name: "revenue (index)", ys: [100,104,107,106,101,92] }
    ],
    knob: { label: "Month", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 2, text: "Months 1–2: proxy and reality rise together — this is the healthy correlation the proxy was chosen for.", tone: "info" },
      { max: 3, text: "Month 3: CTR still climbing, revenue flat. The divergence has begun — the model is now finding clicks that don't lead anywhere.", tone: "warn" },
      { max: 5, text: "🤯 Month 6: proxy +30%, revenue −8%. Goodhart's law in one chart: when a measure becomes a target, it ceases to be a good measure. Audit the proxy-to-outcome link on a schedule.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Proxy metrics & Goodhart's law", formula: "optimise proxy ⇒ proxy–outcome correlation decays — re-validate with A/B tests",
      text: "Every offline metric is a bet that it tracks value. Bets expire. Online experiments are how the bet gets re-underwritten." }
  }
},

{
  q: "A missed fraud costs £2,000; a false alarm costs a £50 review. With calibrated probabilities in hand, decision theory gives an OPTIMAL flagging threshold. Roughly where?",
  choices: ["Very low — about 2.4%, since misses cost 40× more than alarms", "Exactly 50%, since predicted probabilities are symmetric by nature", "Very high, near 97.6%, to keep the costly false alarms rare", "Wherever the F1 score happens to reach its peak on the curve", "At the fraud base rate, because that setting balances both classes"],
  explain: "Flag when p × £2,000 > (1−p) × £50 → p > 50/2050 ≈ 2.4%. When one error is 40× dearer, you act on faint suspicion. The formula t = cost_FP/(cost_FP + cost_FN) turns a cost matrix straight into a threshold.",
  simple: "Would you spend £50 to check a 5% chance of losing £2,000? Of course — the expected loss is £100. The break-even works out at about 2.4%: above that, checking is profitable. The 'right' threshold was never a modelling question — it's an expected-value question.",
  widget: {
    type: "curveStatic", title: "The break-even threshold",
    world: "Expected monthly cost across thresholds, under two different cost worlds: misses at £2,000 vs misses at £100. Watch the optimal threshold MOVE when the costs change.",
    xlab: "flagging threshold", xs: [0,1,2,3,4,5], labels: ["1%","2.4%","10%","33%","50%","80%"], dec: 0, yunit: " £k/mo",
    series: [
      { name: "cost if a miss = £2,000", ys: [21,18,24,38,52,74] },
      { name: "cost if a miss = £100", ys: [46,38,22,14,12,19] }
    ],
    knob: { label: "Threshold", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "🤯 With £2,000 misses, the cost curve bottoms out at ~2.4% — flag on the faintest suspicion, exactly what the formula predicts.", tone: "wow" },
      { max: 3, text: "With cheap (£100) misses, the same model's best threshold jumps to ~50%. Identical probabilities, different economics, different right answer.", tone: "info" },
      { max: 5, text: "Both curves punish the 'defaults': 50% is badly wrong in one world, 2.4% in the other. The cost matrix — not convention — sets the dial.", tone: "info" }
    ],
    extreme: { at: 1 },
    reveal: { name: "The optimal decision threshold", formula: "flag when p > cost_FP / (cost_FP + cost_FN)",
      text: "Calibrated probabilities + a cost matrix = decisions on autopilot. This one line is why calibration (and honest probabilities) earn their keep." }
  }
},

{
  q: "Beyond thresholds: with per-case costs, you can compare whole MODELS by a single number that isn't accuracy. Which number?",
  choices: ["Total expected cost (or saved value) on representative data", "The harmonic mean of every metric the model reports", "Parameter count divided by the total training cost in pounds", "Total training time measured in GPU-hours consumed", "The plain sum of precision and recall for the model"],
  explain: "Score each model's confusion outcomes with the cost matrix and sum: model A costs £31k/month, model B £26k. One business-true number — it can even justify choosing a model with LOWER accuracy but cheaper mistakes.",
  simple: "Accuracy counts mistakes as if they were all equal; your ledger knows they aren't. Price every mistake, total it up, and compare totals. Sometimes the 'less accurate' model makes cheaper mistakes — and the ledger, not the leaderboard, is what the business feels.",
  widget: {
    type: "curveStatic", title: "The ledger, not the leaderboard",
    world: "Four candidate models: accuracy on top, total monthly cost of their mistakes below. Slide across and pick a winner by each measure — they disagree.",
    xlab: "candidate model", xs: [0,1,2,3], labels: ["logistic","forest","boosted A","boosted B"], dec: 1, yunit: "",
    series: [
      { name: "accuracy %", ys: [89,91,93,92] },
      { name: "mistake cost £k/month", ys: [38,31,34,24] }
    ],
    knob: { label: "Candidate", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 1, text: "The forest beats logistic on both counts — so far the leaderboard and the ledger agree.", tone: "info" },
      { max: 2, text: "Boosted A: the accuracy champion at 93% — but its errors skew toward expensive misses. The ledger ranks it mid-table.", tone: "warn" },
      { max: 3, text: "🤯 Boosted B: a point LESS accurate than A, £10k/month CHEAPER — its mistakes are mostly £50 alarms, not £2,000 misses. Ship B, bank the difference, and let the leaderboard sulk.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Cost-sensitive model selection", formula: "score = Σ counts × cost matrix — choose the cheapest, not the most accurate",
      text: "The course's closing move: evaluation that speaks the organisation's language. A model is good when its mistakes are affordable — and now you can prove it." }
  }
}
];
