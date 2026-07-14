/* Logistic Regression — Part II: Practice. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).logreg2 = [

{
  q: "Logistic regression is 'linear' — but the probability curve is clearly S-shaped. What exactly is linear about it?",
  choices: ["The LOG-ODDS: logit(p) is a straight-line function of the features", "The predicted probability climbs in a straight line as a feature grows", "The sigmoid is genuinely a straight line near the middle", "The raw score converts linearly into the output probability", "The error rate falls linearly as you add training data"],
  explain: "log(p/(1−p)) = w·x + b. The model is a straight line in log-odds space; the sigmoid merely translates that line into probability space, where it looks like an S.",
  simple: "The model thinks in a currency called log-odds, and in that currency it's a perfectly straight line: each unit of a feature adds a fixed amount. The S-shape you see is just the exchange rate back into percentages — straight line in, curve out.",
  widget: {
    type: "curveStatic", title: "Straight in one currency, curved in the other",
    world: "The same model plotted twice: its log-odds (the currency it thinks in) and its probability (the currency you read). Slide along the feature and compare the two shapes.",
    xlab: "feature value", xs: [0,1,2,3,4,5,6,7,8], dec: 2, yunit: "",
    series: [
      { name: "log-odds (model's currency)", ys: [-4,-3,-2,-1,0,1,2,3,4] },
      { name: "probability (yours)", ys: [0.02,0.05,0.12,0.27,0.5,0.73,0.88,0.95,0.98] }
    ],
    knob: { label: "Feature value", min: 0, max: 8, step: 1, init: 0 },
    insights: [
      { max: 2, text: "The log-odds climb by exactly +1 per step — a ruler-straight line. That constant step IS the weight.", tone: "info" },
      { max: 5, text: "Meanwhile probability moves fastest near 50% and barely at the ends — the same straight line, viewed through the sigmoid exchange rate.", tone: "info" },
      { max: 8, text: "🤯 One more feature unit takes probability from 95% to 98% here, but took it from 27% to 50% in the middle. Constant in log-odds, variable in probability — knowing WHICH space is linear unlocks every interpretation question.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Linearity in log-odds", formula: "log(p / (1−p)) = w·x + b",
      text: "The defining equation. Every property of the model — odds ratios, linear boundaries, calibration behaviour — falls out of this one line." }
  }
},

{
  q: "Three classes — cat, dog, fox — and logistic regression still works, via softmax. What does softmax guarantee about the three outputs?",
  choices: ["They're all positive and sum to exactly 1 — a proper probability split", "Each of the three outputs lands between 0 and 1 but they need not sum to 1", "The top class always captures more than half the total mass", "They match how frequently each class appears in the data", "They are just the three raw scores rescaled onto 0 to 100"],
  explain: "Multinomial logistic regression scores each class, then softmax exponentiates and normalises: eᶻⁱ/Σeᶻʲ. Raising one class's score necessarily drains the others — the outputs are one budget split three ways.",
  simple: "Softmax turns three raw scores into shares of a single pie. Boost the cat score and the cat slice grows — but ONLY by shrinking dog's and fox's, because the pie is always exactly 100%. That's what makes the outputs readable as 'probability of each class'.",
  widget: {
    type: "curveStatic", title: "One pie, three slices",
    world: "Dog and fox scores are frozen; you raise only the CAT score. Watch all three probabilities — especially who pays for cat's rise.",
    xlab: "cat's raw score", xs: [0,1,2,3,4], labels: ["−2","−1","0","+1","+2"], dec: 0, yunit: "%",
    series: [
      { name: "P(cat)", ys: [6,15,33,58,79] },
      { name: "P(dog)", ys: [63,57,45,28,14] },
      { name: "P(fox)", ys: [31,28,22,14,7] }
    ],
    knob: { label: "Cat's raw score", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Low cat score: dog dominates. Check the sum at any slider position — always 100.", tone: "info" },
      { max: 3, text: "Cat's rise is funded entirely by dog and fox shrinking, in proportion to their own sizes. No slice can grow without the others paying.", tone: "info" },
      { max: 4, text: "🤯 The pie constraint is the whole design: softmax is the sigmoid's many-class generalisation (with two classes it IS the sigmoid). One idea, any number of classes.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Softmax (multinomial logistic regression)", formula: "P(class i) = e^{score_i} / Σ_j e^{score_j}",
      text: "sklearn's LogisticRegression does this automatically for 3+ classes. Everything you know about the binary case carries over, slice by slice." }
  }
},

{
  q: "Training runs gradient descent on the log-loss. What does each update step actually do to the weights?",
  choices: ["Nudges them a little in the direction that reduces the loss most steeply", "Tries many random weight sets on each step and keeps whichever scores best", "Jumps them straight to the values where the loss gradient is zero", "Scales every weight upward until the loss stops improving", "Shrinks each weight toward zero to hold overfitting back"],
  explain: "The gradient says which way the loss slopes; each step moves the weights a learning-rate-sized nudge downhill. Log-loss is convex for logistic regression, so the downhill walk reaches THE global minimum.",
  simple: "Training is walking downhill in fog: feel the slope under your feet (the gradient), take a small step down, repeat. Logistic regression's landscape is one smooth bowl — no fake valleys — so the walk always ends at the true bottom. That's a luxury most models don't get.",
  widget: {
    type: "curveStatic", title: "Downhill in a smooth bowl",
    world: "One weight, tracked across gradient-descent steps: its value and the loss. Watch both settle — and notice the loss NEVER goes back up.",
    xlab: "training step", xs: [0,1,2,3,4,5,6], labels: ["0","5","10","20","40","80","160"], dec: 2, yunit: "",
    series: [
      { name: "loss", ys: [0.69,0.52,0.43,0.35,0.31,0.3,0.3] },
      { name: "the weight w", ys: [0,0.6,1,1.4,1.62,1.69,1.7] }
    ],
    knob: { label: "Training step", min: 0, max: 6, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Early steps are big: the slope is steep, so the same rule ('step ∝ slope') moves fast.", tone: "info" },
      { max: 4, text: "Nearing the bottom, the slope flattens and the steps shrink automatically — the walk brakes itself.", tone: "info" },
      { max: 6, text: "🤯 Converged at w = 1.7, and because the log-loss bowl is CONVEX, this is the unique best answer — any starting point ends here. Contrast k-means' many valleys. Convexity is why logistic regression is so reliable.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Gradient descent on a convex loss", formula: "w ← w − η·∇loss — convexity ⇒ one global minimum",
      text: "The optimiser under logistic regression (and most of deep learning). Here the landscape is a single bowl, which is why solvers 'just work'." }
  }
},

{
  q: "You switch the penalty from L2 (sum of squared weights) to L1 (sum of absolute weights). What famous behaviour appears?",
  choices: ["Weights hit EXACTLY zero — the model performs feature selection", "Weights shrink smoothly toward zero but never actually reach it", "The loss surface sprouts several local minima that trap the solver", "Every surviving weight is dragged toward one shared central value", "Some predicted probabilities begin to exceed 1 and get clipped"],
  explain: "L2 shrinks weights smoothly toward zero but never to it; L1's corner at zero makes exact zeros optimal for weakly-useful features. The surviving nonzero weights ARE a feature selection, done by the optimiser.",
  simple: "L2 is a tax proportional to the square of each opinion — big opinions shrink, small ones linger tiny. L1 taxes the absolute size, which makes 'exactly zero' a genuinely attractive option: weak features get switched off entirely. You get a sparser, more readable model for free.",
  widget: {
    type: "curveStatic", title: "The tax that switches features off",
    world: "Fifty features, penalty strength swept upward, under both taxes. Count the surviving nonzero weights — and watch validation accuracy along the way.",
    xlab: "penalty strength →", xs: [0,1,2,3,4], labels: ["none","light","medium","firm","heavy"], dec: 0, yunit: "",
    series: [
      { name: "nonzero weights (L1)", ys: [50,31,14,7,3] },
      { name: "nonzero weights (L2)", ys: [50,50,50,50,50] },
      { name: "L1 validation acc %", ys: [84,87,89,88,82] }
    ],
    knob: { label: "Penalty strength", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Light L1: 19 features already switched off — the weakly-informative ones went first. L2 still carries all 50, just smaller.", tone: "info" },
      { max: 2, text: "🤯 Medium L1: a 14-feature model at PEAK validation accuracy. The optimiser did feature selection and regularisation in one move.", tone: "wow" },
      { max: 4, text: "Heavy: down to 3 features and accuracy sags — the tax is now switching off real signal. Sparsity is a dial, tuned like everything else on validation.", tone: "warn" }
    ],
    extreme: { at: "max" },
    reveal: { name: "L1 (lasso) regularisation", formula: "penalty = λ·Σ|w| → exact zeros · L2 = λ·Σw² → small-but-alive",
      text: "Use L1 when you suspect most features are irrelevant or need a compact, explainable model; L2 as the smooth default; elastic net blends both." }
  }
},

{
  q: "On a perfectly separable dataset, UNregularised logistic regression never quite finishes training. What's happening to the weights?",
  choices: ["They grow without bound — bigger weights always score a bit better on separable data", "They climb to large but finite values and stop once every point is correctly classified", "They swing back and forth and never settle on a stable direction", "They collapse to zero since the loss has already been minimised", "They freeze the instant the final training error disappears"],
  explain: "With zero training errors, the loss can always be reduced further by scaling the weights up — pushing probabilities toward 0/1. The optimum is 'at infinity'. Any regularisation caps the escape and restores a finite, calibrated solution.",
  simple: "If the data is perfectly separable, the model can always look 'more right' by shouting louder — 99% becomes 99.9% becomes 99.99%, forever. The loss keeps trickling down as weights balloon. Regularisation is the hand on its shoulder: 'you're right, stop shouting.'",
  widget: {
    type: "curveStatic", title: "The model that won't stop shouting",
    world: "Separable data, no penalty: watch the weight size and training loss across epochs. Then imagine the same run with even a whisper of L2.",
    xlab: "training epochs", xs: [0,1,2,3,4,5], labels: ["10","50","200","1k","5k","25k"], dec: 2, yunit: "",
    series: [
      { name: "weight magnitude", ys: [1.2,3.5,7,13,24,45] },
      { name: "training loss", ys: [0.3,0.09,0.02,0.005,0.001,0.0002] }
    ],
    knob: { label: "Epochs", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Loss falls fast at first — legitimate learning. The boundary's POSITION settled long ago.", tone: "info" },
      { max: 3, text: "From here on, only the SCALE grows: same boundary, ever-louder confidence. Loss still creeps down, so the optimiser keeps going.", tone: "warn" },
      { max: 5, text: "🤯 25k epochs: weights at 45 and climbing forever, probabilities pinned at 0/1 — maximal overconfidence with zero extra knowledge. This is why sklearn regularises BY DEFAULT (C=1.0). Now you know what it's quietly preventing.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Weight divergence on separable data", formula: "separable + no penalty → ‖w‖ → ∞ · any λ > 0 restores a finite optimum",
      text: "A famous gotcha: your cleanest datasets are exactly where unregularised logistic regression misbehaves. Default regularisation is a feature, not paternalism." }
  }
},

{
  q: "The fitted model is: log-odds = −3 + 0.8·(years of history). What does the intercept −3 mean, concretely?",
  choices: ["The baseline log-odds for an applicant with ZERO years — odds of about 1:20", "It is the baseline probability of approval, which works out to about minus three", "The log-odds fall by 3 for each extra year of credit history", "Approval requires at least three years of history first", "The intercept simply cancels out the mean of the feature"],
  explain: "Set the feature to zero and the equation reads log-odds = −3, i.e. odds e⁻³ ≈ 1:20, probability ≈ 4.7%. The intercept anchors the baseline; the weights move you away from it per unit of each feature.",
  simple: "The intercept is the model's opinion of a blank applicant — all features at zero. Here: odds 1-to-20 against, roughly 5%. Every year of history then multiplies those odds by e^0.8 ≈ 2.2. Baseline plus multipliers: you can read the whole model aloud from two numbers.",
  widget: {
    type: "bayesOdds", title: "Baseline, then multipliers",
    world: "The fitted model, rebuilt chip by chip: the intercept sets the starting odds, then each year of history multiplies. Follow the odds from a blank slate to a strong file.",
    posName: "approval", prior: [1, 20],
    features: [
      { name: "year 1 (×e^0.8)", lr: 2.23 },
      { name: "year 2 (×e^0.8)", lr: 2.23 },
      { name: "year 3 (×e^0.8)", lr: 2.23 },
      { name: "year 4 (×e^0.8)", lr: 2.23 }
    ],
    knob: { label: "Years of history applied", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Zero years: the intercept alone speaks — odds 1:20, about 4.7%. THAT is what −3 means, in cash terms.", tone: "info" },
      { max: 2, text: "Each year multiplies the odds by the same e^0.8 ≈ 2.2 — the log-odds line's constant slope, heard as compound interest.", tone: "info" },
      { max: 4, text: "🤯 Four years compound to ×24.6: the 1:20 underdog is now the favourite. Intercept = starting point; weights = growth rates. The entire model in one sentence.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Reading the intercept", formula: "x = 0 ⇒ log-odds = b ⇒ baseline odds = e^b",
      text: "Intercepts only mean something when 'all features zero' means something — one more argument for centring/standardising features before interpreting." }
  }
},

{
  q: "Income's weight is 0.00004 and age's weight is 0.3 — a colleague concludes age matters vastly more. Why is that comparison bogus?",
  choices: ["The features have wildly different scales — weights are per-unit, and a 'unit' of income is one pound", "Income's weight is so small the optimiser has effectively dropped that feature from the model", "Weights across differently-scaled features can never be compared, no matter how much you preprocess them", "The two weights must be summed together before either coefficient can be interpreted at all", "The bigger weight always belongs to whichever feature happened to enter the model first"],
  explain: "A weight is 'log-odds per unit'. One pound is a microscopic unit; one year is a big one. Multiply each weight by its feature's spread (or standardise first) and income may dominate. Raw-weight comparisons measure units, not importance.",
  simple: "Saying income's 0.00004 is 'small' is like saying a car is slow because it moves 0.00003 kilometres per millisecond. Per POUND, of course the effect is tiny — there are a lot of pounds. Standardise the features and the weights become directly comparable: log-odds per typical variation.",
  widget: {
    type: "scaleFeature", title: "Per-unit is not per-importance",
    world: "The familiar shouting-units bug, one last costume: comparing raw weights across differently-scaled features. Shrink income's units and watch its apparent 'importance' transform.",
    aName: "age", bName: "income",
    target: { name: "applicant", a: 35, b: 40000 },
    cands: [
      { name: "match A · 36y, £41k", a: 36, b: 41000 },
      { name: "match B · 58y, £40.2k", a: 58, b: 40200 },
      { name: "match C · 34y, £48k", a: 34, b: 48000 },
      { name: "match D · 37y, £55k", a: 37, b: 55000 }
    ],
    knob: { label: "Shrink income units by", min: 0, max: 4, step: 0.25, init: 0 },
    insights: [
      { max: 0.5, text: "In raw units, income differences are numerically enormous — so its per-unit weight HAS to be microscopic to compensate. The weight is small because the unit is small.", tone: "info" },
      { max: 2.5, text: "Rescale income to sensible units and its weight would rescale up in exact proportion — same model, same predictions, utterly different-looking coefficient.", tone: "info" },
      { max: 4, text: "🤯 Raw weights are unit-bookkeeping, not importance. Standardise features first and each weight becomes 'log-odds per standard deviation' — finally an apples-to-apples importance reading.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Standardised coefficients", formula: "comparable importance: w_j × sd(x_j), or fit on z-scored features",
      text: "The interpretability superpower has a precondition: common scale. Skip it and coefficient tables mislead confidently." }
  }
},

{
  q: "Fraud is 1% of your data and logistic regression learns to predict tiny probabilities for everyone. What does class_weight='balanced' change inside training?",
  choices: ["Each rare-class error costs proportionally more in the loss, forcing the model to take fraud seriously", "The rare fraud examples are duplicated inside the training set until the two classes are equal in size", "New synthetic fraud rows are generated so that both classes finish with roughly the same count", "The decision threshold is automatically lowered so that far more fraud ends up getting flagged", "The majority legit rows are quietly dropped until the two classes finally match in size"],
  explain: "Balanced weighting scales each example's loss by the inverse of its class frequency — one fraud error ≈ 99 normal errors. The optimum shifts: probabilities for fraud-like cases rise, effectively moving the model's operating balance.",
  simple: "By default the model minimises TOTAL error, and ignoring a 1% class is a great way to do that. Class weights change the prices: each fraud mistake now costs 99×. Same optimiser, new incentives — suddenly the rare class is worth learning. (Note: predicted probabilities then reflect the WEIGHTED world — recalibrate if you need true frequencies.)",
  widget: {
    type: "threshold", title: "New prices, new behaviour",
    world: "Model scores for a 1%-fraud world (compressed here). First read it as the unweighted model would — everything scored low. The weighted model effectively shifts scores up for fraud-like cases: slide the cutoff to see the behavioural difference weights buy.",
    posName: "fraud", negName: "legit", axis: "risk score", show: ["recall", "precision"],
    items: [{s:0.5,c:0},{s:1.2,c:0},{s:1.9,c:0},{s:2.6,c:0},{s:3.3,c:0},{s:4,c:0},{s:4.7,c:0},{s:5.6,c:1},{s:6.4,c:0},{s:7.4,c:1},{s:8.4,c:0},{s:9.2,c:1}],
    knob: { label: "Effective operating point", min: 0, max: 10, step: 0.5, init: 9.5 },
    insights: [
      { max: 4, text: "Down here — where the weighted model effectively operates — fraud recall is strong and the false alarms are the accepted cost of the new prices.", tone: "info" },
      { max: 8, text: "The middle ground: this is roughly what moderate class weights buy — a compromise position no unweighted model would choose on 1% data.", tone: "info" },
      { max: 10, text: "🤯 Up here lives the unweighted model: near-zero recall, great 'accuracy'. class_weight moved the model AWAY from this corner during training itself — a deeper fix than post-hoc threshold surgery, and they compose well together.", tone: "wow" }
    ],
    extreme: { at: "min" },
    reveal: { name: "class_weight in the loss", formula: "loss = Σ w_class(y_i) · logloss_i — 'balanced': w ∝ n / (k · count_class)",
      text: "Reweighting changes what 'optimal' means during training; thresholding changes decisions after it. Serious imbalance work usually uses both, knowingly." }
  }
},

{
  q: "Among common classifiers, logistic regression's predicted probabilities tend to be unusually trustworthy out of the box. Why?",
  choices: ["Training minimises log-loss, which is only optimised by honestly calibrated probabilities", "The sigmoid squashes every output into a range that happens to line up with real frequencies", "A simple linear model is too weak to ever become overconfident in the first place", "Its probabilities are averaged across many sub-models, which cancels the bias out", "It clips extreme probabilities back toward 0.5 so it never overcommits"],
  explain: "Log-loss is a 'proper scoring rule': the expected loss is minimised exactly when predicted probabilities equal true frequencies. The model is literally trained to be calibrated. Trees and SVMs optimise other things and need post-hoc calibration.",
  simple: "Some models are graded on being RIGHT; logistic regression is graded on being HONEST — the log-loss punishes both overconfidence and underconfidence about probability itself. Trained on honesty, it tends to deliver it: when it says 70%, about 70% happen.",
  widget: {
    type: "curveStatic", title: "Honest by upbringing",
    world: "Reliability check on fresh data: for each claimed probability, how often it actually happened — logistic regression vs a boosted tree, both uncalibrated. The diagonal is perfect honesty.",
    xlab: "claimed probability", xs: [0,1,2,3,4], labels: ["10%","30%","50%","70%","90%"], dec: 0, yunit: "%",
    series: [
      { name: "logistic regression (actual)", ys: [11,29,51,69,88] },
      { name: "boosted trees, raw (actual)", ys: [3,22,50,79,97] }
    ],
    knob: { label: "Claimed probability", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "At the low end, logistic regression's claims land within a point or two of reality. The raw booster is overconfident — its '10%' cases happen 3% of the time.", tone: "info" },
      { max: 3, text: "Across the board: LogReg hugs the honesty diagonal; the booster bows away from it at both ends (the classic overconfident S).", tone: "info" },
      { max: 4, text: "🤯 Nothing was calibrated here — LogReg is simply TRAINED on a loss that rewards honest probabilities. When downstream systems consume probabilities, this property alone can decide the model choice.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Proper scoring rules & native calibration", formula: "log-loss is minimised ⇔ predicted p = true frequency",
      text: "The quiet reason logistic regression anchors so many risk systems. Other models can match it — but only after a calibration step it never needed." }
  }
},

{
  q: "The true boundary is curved, but you want to keep logistic regression. What's the classic trick?",
  choices: ["Engineer nonlinear features (x², interactions) — a linear model in a richer space draws curves in the original one", "Run gradient descent for far more epochs so that the straight boundary gradually bends itself to fit the curved data", "Crank the L2 penalty up until the straight boundary is forced to wrap around the curved region", "Lower the decision threshold so the flagged area curls around the true curved class boundary", "Chain several logistic regressions together so their combined cut forms one smooth curve"],
  explain: "The model is linear in its INPUTS — so change the inputs. Add x², x₁·x₂ and friends: the boundary stays a flat plane in the expanded space, but maps back to a curve in the original features. The kernel idea, done by hand, with interpretability intact.",
  simple: "A straight-edge ruler can still draw a circle — on folded paper. Feature engineering folds the paper: give the model 'distance-from-centre' or 'age × income' as columns, and its straight cut through THOSE becomes a curve through the originals. Same trusty model, richer worldview.",
  widget: {
    type: "treeSplit", title: "Fold the paper, keep the ruler",
    world: "The bullseye problem again — hopeless for a straight cut on raw x, y. But here it's re-described by ONE engineered feature: distance from centre. Slide a single straight cut on that new axis.",
    classes: ["Inner group", "Outer ring"], feat: "engineered: distance from centre",
    items: [{x:0.5,c:0},{x:1,c:0},{x:1.4,c:0},{x:1.9,c:0},{x:2.3,c:0},{x:2.7,c:0},{x:5.9,c:1},{x:6.5,c:1},{x:7.1,c:1},{x:7.8,c:1},{x:8.4,c:1},{x:9.1,c:1}],
    knob: { label: "Cut: distance < ?", min: 0.5, max: 10, step: 0.25, init: 1 },
    insights: [
      { max: 2.8, text: "On the engineered axis the two groups sit in separate camps — the curvature was absorbed by the FEATURE, not the model.", tone: "info" },
      { max: 5.5, text: "🤯 One straight cut: perfect separation of a problem no line could touch in raw coordinates. Logistic regression with this feature stays linear, interpretable — and correct.", tone: "wow" },
      { max: 10, text: "PolynomialFeatures automates the folding (x², x₁x₂, …). The cost is feature-count explosion — engineer with intent, or switch to models that bend natively.", tone: "info" }
    ],
    extreme: { at: 4 },
    reveal: { name: "Nonlinear features for linear models", formula: "expand x → [x, x², x₁x₂, …] → linear boundary there = curve here",
      text: "The manual sibling of the SVM kernel trick. Domain-driven engineered features often beat both — a lesson this course keeps re-earning." }
  }
}
];
