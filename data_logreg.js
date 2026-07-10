/* Logistic Regression — Part I: Foundations. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).logreg1 = [

{
  q: "A logistic regression model looks at a loan application. What does it actually output?",
  choices: ["A probability between 0 and 1", "A class label and nothing else", "A distance to the boundary", "An unbounded score", "A yes/no rule chain"],
  explain: "Logistic regression computes a weighted score, then squashes it through the sigmoid function into a probability. The label comes later, when YOU threshold that probability.",
  simple: "Think of it as a cautious expert: it never just says 'approve'. It says '82% likely to repay'. The S-shaped curve is the machine that turns any score into a percentage between 0 and 100.",
  widget: {
    type: "sigmoid", title: "The probability machine",
    world: "Students plotted by hours studied: failed (bottom), passed (top). The purple S-curve is the model. Drag its steepness and read the output at the dashed line.",
    classes: ["Failed", "Passed"], xlab: "hours studied", b: 5, qx: 6.2,
    points: [{x:1,c:0},{x:2,c:0},{x:2.8,c:0},{x:3.5,c:0},{x:4.6,c:0},{x:5.4,c:1},{x:6.4,c:1},{x:7.2,c:1},{x:8,c:1},{x:9,c:1}],
    knob: { label: "Curve steepness (the weight w)", min: 0.3, max: 8, step: 0.1, init: 1 },
    insights: [
      { max: 1.5, text: "A gentle curve: the model is humble. At the dashed line it says something like 70% — confident, not certain.", tone: "info" },
      { max: 5, text: "Steeper curve = stronger opinions. Same student, higher claimed probability. The output is ALWAYS a percentage though — never a bare yes/no.", tone: "info" },
      { max: 8, text: "🤯 At maximum steepness the curve is nearly a step: 0% or 100%, nothing between. The model has become arrogant — tiny changes in hours flip it completely.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The sigmoid (logistic) function", formula: "p = 1 / (1 + e^(−score)) — any score in, a probability out",
      text: "Logistic regression = a weighted score + this squashing curve. Everything it says is a probability; the curve's steepness comes from the learned weights." }
  }
},

{
  q: "The model computes a raw score of +4.2 for one customer and −7.9 for another. Why doesn't it report those numbers directly?",
  choices: ["Raw scores are unbounded — the sigmoid maps them into 0–1 first", "Raw scores are always wrong", "Negative scores would crash the maths", "Scores must be integers", "It does — scores ARE the output"],
  explain: "The weighted sum can be any number from −∞ to +∞. The sigmoid maps that whole range into (0, 1), so the output can be read as a probability.",
  simple: "The raw score is like a mood: +4.2 means 'pretty sure yes', −7.9 means 'very sure no'. But moods aren't percentages. The S-curve translates: big positive → near 100%, big negative → near 0%, zero → exactly 50%.",
  widget: {
    type: "sigmoid", title: "From any score to a percentage",
    world: "Emails scored by spamminess. The score axis runs on and on in both directions — but watch the curve's OUTPUT: it never escapes 0–100%.",
    classes: ["Legit", "Spam"], xlab: "raw spamminess score", b: 5, qx: 8.8,
    points: [{x:0.6,c:0},{x:1.6,c:0},{x:2.6,c:0},{x:3.4,c:0},{x:4.4,c:0},{x:5.8,c:1},{x:6.6,c:1},{x:7.6,c:1},{x:8.6,c:1},{x:9.4,c:1}],
    knob: { label: "Curve steepness (w)", min: 0.3, max: 8, step: 0.1, init: 1.2 },
    insights: [
      { max: 2, text: "Follow the curve to the far right: it flattens toward 100% but never crosses it. Same on the left with 0%. The output is trapped — usefully.", tone: "info" },
      { max: 5, text: "That trapping is the whole trick: any score, however extreme, becomes a legal probability.", tone: "info" },
      { max: 8, text: "🤯 Even at silly steepness the outputs stay inside 0–100%. A score of +400 would still just mean '≈100%'. The sigmoid is an unbreakable translator.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Squashing an unbounded score", formula: "score ∈ (−∞, ∞) → sigmoid → p ∈ (0, 1)",
      text: "The linear part of the model is free to produce any number; the sigmoid guarantees the final answer is always interpretable as a probability." }
  }
},

{
  q: "The model says a customer has a 62% probability of churning. How does that become a yes/no decision?",
  choices: ["Compare it to a cutoff — flag if above", "Round to the nearest whole number", "Ask the model a second time", "Average it with 50%", "It can't — probabilities aren't decisions"],
  explain: "You pick a threshold (0.5 by default) and flag everything above it. The probability is the model's work; the cutoff is YOUR policy decision.",
  simple: "The model hands you a percentage; you decide where to draw the line. 'Call every customer above 50%'? Above 30%? That line is a business choice — the model just supplies the numbers.",
  widget: {
    type: "threshold", title: "Drawing the line",
    world: "Twelve customers, placed by the model's churn probability (as a 0–10 score). Orange = really churned. Slide YOUR cutoff and watch decisions change while the model stays identical.",
    posName: "churner", negName: "stayer", axis: "churn score", show: ["accuracy", "recall"],
    items: [{s:0.8,c:0},{s:1.6,c:0},{s:2.4,c:0},{s:3.4,c:0},{s:4.2,c:0},{s:4.8,c:1},{s:5.6,c:0},{s:6.4,c:1},{s:7.2,c:1},{s:8,c:0},{s:8.6,c:1},{s:9.4,c:1}],
    knob: { label: "Your cutoff", min: 0, max: 10, step: 0.5, init: 5 },
    insights: [
      { max: 2, text: "Low cutoff: you flag nearly everyone. Every churner is caught — along with plenty of loyal customers.", tone: "warn" },
      { max: 7.5, text: "Mid cutoffs: reasonable trade-offs. Notice the model never changed — only your line did.", tone: "info" },
      { max: 10, text: "🤯 Highest cutoff: you flag nobody, and 'accuracy' can still look decent. Same model, wildly different behaviour — the cutoff is a genuine decision, not a default.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The decision threshold", formula: "predict positive if p ≥ t (default t = 0.5)",
      text: "Probability is the model's job; the threshold is yours. Cheap false alarms → lower it. Expensive false alarms → raise it." }
  }
},

{
  q: "In feature space, what shape is the decision boundary of plain logistic regression?",
  choices: ["A straight line (flat plane)", "A wiggly curve around each point", "A circle around each class", "A staircase of axis splits", "Whatever shape the data needs"],
  explain: "The score is a weighted SUM of features, and 'score = 0' defines a straight line (a plane in higher dimensions). Curvy problems need engineered features or a different model.",
  simple: "The model draws one straight ruler-line across the map: this side yes, that side no. It cannot bend the line — if the true border is a curve, plain logistic regression can only approximate it with a straight edge.",
  widget: {
    type: "sigmoid", title: "One straight cut",
    world: "In 1-D the 'boundary' is a single point: where the curve crosses 50%. Steepness changes confidence near it — but the crossing stays one clean cut, never several.",
    classes: ["Reject", "Approve"], xlab: "application score", b: 5.5, qx: 5.5,
    points: [{x:1,c:0},{x:2.2,c:0},{x:3,c:0},{x:4,c:0},{x:4.8,c:0},{x:6.2,c:1},{x:7,c:1},{x:7.8,c:1},{x:8.8,c:1},{x:9.6,c:1}],
    knob: { label: "Curve steepness (w)", min: 0.3, max: 8, step: 0.1, init: 2 },
    insights: [
      { max: 3, text: "One crossing point, always. Left of it: reject territory. Right: approve. In 2-D this becomes one straight line; in 3-D one flat plane.", tone: "info" },
      { max: 8, text: "🤯 Steepness moves confidence, never the SHAPE. No setting of w bends the boundary or adds a second cut. That's the model's built-in simplicity — its bias.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Linear decision boundary", formula: "boundary: w·x + b = 0 — a straight line / flat plane",
      text: "Fast, stable and interpretable — but straight. Compare KNN, which bends its boundary around the data freely. Every model buys flexibility with something." }
  }
},

{
  q: "One feature is 'emails sent per week'. Its learned weight is negative. What does that tell you?",
  choices: ["More emails pushes the probability DOWN", "The feature is broken", "The feature has no effect", "The model failed to converge", "Emails were measured in wrong units"],
  explain: "A negative weight means the feature lowers the score, and so lowers the probability of the positive class. The sign of each weight is readable, honest information.",
  simple: "Weights are dials with a direction. Positive weight: the more of this, the more likely 'yes'. Negative: the more of this, the more likely 'no'. A negative weight on emails just means active emailers churn less.",
  widget: {
    type: "sigmoid", title: "Flip the sign, flip the story",
    world: "Churn vs weekly emails sent. Your knob is the WEIGHT itself — and it can go negative. Watch what the sign does to the whole curve.",
    classes: ["Stays", "Churns"], xlab: "emails sent per week", b: 5, qx: 8,
    points: [{x:0.8,c:1},{x:1.8,c:1},{x:2.6,c:1},{x:3.6,c:1},{x:4.4,c:1},{x:5.6,c:0},{x:6.6,c:0},{x:7.4,c:0},{x:8.4,c:0},{x:9.2,c:0}],
    knob: { label: "The weight w (can be negative!)", min: -4, max: 4, step: 0.1, init: 2 },
    insights: [
      { max: -0.5, text: "🤯 Negative w: the curve runs DOWNHILL — more emails, lower churn probability. That matches the data: the active users (right side) are the ones who stay.", tone: "wow" },
      { max: 0.5, text: "Near zero: a flat line at 50%. Weight zero literally means 'this feature tells me nothing'.", tone: "info" },
      { max: 4, text: "Positive w says 'more emails, more churn' — look at the points: that story fits this data badly. The SIGN is a claim about direction, and training picks the sign that fits.", tone: "warn" }
    ],
    extreme: { at: "min" },
    reveal: { name: "Weight signs are directions", formula: "w > 0: feature raises P(positive) · w < 0: lowers it · w = 0: irrelevant",
      text: "This is logistic regression's superpower: you can read the model. Each weight says which way, and how strongly, a feature pushes the odds." }
  }
},

{
  q: "Training adjusts the weights. What exactly does training try to minimise?",
  choices: ["Log-loss — the penalty for confident wrong probabilities", "The number of wrong labels", "The distance to the class centres", "The sum of the weights", "The width of the margin"],
  explain: "Counting errors gives a flat, unhelpful signal (nudging a weight rarely flips a label). Log-loss is smooth: every nudge changes it a little, so gradient descent can follow it downhill.",
  simple: "Imagine tuning a radio. Counting errors is a dial that only clicks at rare positions — no feedback in between. Log-loss hums continuously: warmer, colder, warmer. Training follows the hum.",
  widget: {
    type: "curveStatic", title: "The smooth hill and the staircase",
    world: "One weight, swept from 0 to 4. Two ways to score it: count the errors (steppy) or measure log-loss (smooth). Which one could you follow downhill blindfolded?",
    xlab: "the weight w", xs: [0,0.5,1,1.5,2,2.5,3,3.5,4], dec: 1,
    series: [
      { name: "errors (out of 20)", ys: [10,10,6,6,3,3,3,4,4] },
      { name: "log-loss", ys: [13.9,10.2,7.6,6.1,5.3,5.1,5.4,6.2,7.4] }
    ],
    knob: { label: "Weight value w", min: 0, max: 8, step: 1, init: 0 },
    insights: [
      { max: 2, text: "The error count sits flat for long stretches — a nudge to w changes nothing it can feel. No gradient, no guidance.", tone: "warn" },
      { max: 5, text: "Log-loss slopes everywhere: each nudge is rewarded or punished immediately. Around here it bottoms out — that's the w training would find.", tone: "info" },
      { max: 8, text: "🤯 Past the bottom, log-loss RISES while errors barely move: the model is getting overconfident on borderline cases, and log-loss punishes confident mistakes hard.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Log-loss (cross-entropy)", formula: "loss = −Σ [ y·log(p) + (1−y)·log(1−p) ]",
      text: "Training minimises log-loss, not error count — a smooth surface that gradient descent can actually navigate, and one that cares about HOW confident you were, not just whether you were right." }
  }
},

{
  q: "Why not just fit ordinary linear regression to a 0/1 target and call it a day?",
  choices: ["A straight line predicts nonsense like −0.3 or 1.4", "Linear regression is too slow", "0/1 targets crash linear solvers", "It works identically in practice", "Lines can't pass through 0.5"],
  explain: "A straight line is unbounded: far from the middle it happily outputs probabilities below 0 or above 1, and outliers drag the whole line. The sigmoid fixes both.",
  simple: "Fit a ruler-straight line to yes/no data and follow it far enough: it will predict a −30% chance of rain. The S-curve bends the ends flat so predictions always stay between 0% and 100%.",
  widget: {
    type: "curveStatic", title: "The line that left the map",
    world: "Both models predict 'probability of passing' from hours studied. Slide across the range — especially to the edges — and compare what each one claims.",
    xlab: "hours studied", xs: [0,1,2,3,4,5,6,7,8,9,10], dec: 2,
    series: [
      { name: "straight line's 'probability'", ys: [-0.28,-0.13,0.02,0.17,0.32,0.5,0.65,0.8,0.95,1.1,1.25] },
      { name: "sigmoid's probability", ys: [0.02,0.05,0.1,0.2,0.35,0.5,0.68,0.82,0.91,0.96,0.98] }
    ],
    knob: { label: "Hours studied", min: 0, max: 10, step: 1, init: 5 },
    insights: [
      { max: 1, text: "🤯 At the left edge the straight line claims a probability of −28%. Minus twenty-eight percent. The sigmoid calmly says 2%.", tone: "wow" },
      { max: 8, text: "In the middle the two agree fairly well — that's why the temptation exists at all.", tone: "info" },
      { max: 10, text: "At the right edge the line claims 125%. The sigmoid: 98%. Bounded outputs aren't cosmetic — downstream systems consume these numbers as probabilities.", tone: "warn" }
    ],
    extreme: { at: "min" },
    reveal: { name: "Why the sigmoid, not a line", formula: "line: outputs ∈ (−∞,∞) · sigmoid: outputs ∈ (0,1)",
      text: "Logistic regression IS linear regression's idea — a weighted sum — passed through a curve that makes the output a legal probability." }
  }
},

{
  q: "You give the model total freedom and its weights grow huge. It scores 99% on training data, 78% on validation. What's the standard fix?",
  choices: ["Regularisation — penalise large weights", "Add more features", "Raise the decision threshold", "Switch to raw scores", "Train for longer"],
  explain: "Huge weights = near-vertical sigmoid = wild overconfidence fitted to noise. Regularisation adds a penalty for weight size, forcing the model to stay calm unless the data truly justifies it.",
  simple: "Big weights let the model scream 100%!! about borderline cases — great for memorising, terrible for the future. Regularisation is a tax on screaming: opinions cost weight-size, so the model only keeps the opinions worth paying for.",
  widget: {
    type: "curveStatic", title: "The overconfidence tax",
    world: "Sweep the regularisation strength from 'none' to 'crushing'. Two curves: score on seen data, score on held-back data. Find where the tax is set right.",
    xlab: "regularisation strength →", xs: [0,1,2,3,4,5], labels: ["none","light","medium","firm","heavy","crushing"], dec: 0, yunit: "%",
    series: [
      { name: "seen data", ys: [99,96,93,90,84,72] },
      { name: "held-back data", ys: [78,84,88,89,83,70] }
    ],
    knob: { label: "Regularisation strength", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 0, text: "No tax: a 21-point gap between the curves. The weights have memorised the training set's quirks.", tone: "warn" },
      { max: 3, text: "Light-to-firm tax: the gap closes and the held-back score PEAKS. Slightly worse memorisation, genuinely better predictions.", tone: "info" },
      { max: 5, text: "🤯 Crushing tax: the weights are pinned near zero and BOTH scores collapse — the model can't hold real opinions either. Regularisation is a dial between arrogance and lobotomy.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "L2 regularisation (the C parameter)", formula: "minimise log-loss + λ·Σw² (sklearn: smaller C = stronger penalty)",
      text: "The classic cure for logistic overfitting. Sweep the strength on validation data, exactly as you swept k in KNN — same U-shape, same logic." }
  }
},

{
  q: "A hospital uses the model's probabilities to order follow-ups. Missing a real case is far worse than a false alarm. What should change?",
  choices: ["Lower the threshold below 0.5", "Raise the threshold above 0.5", "Retrain with fewer features", "Report raw scores instead", "Nothing — 0.5 is standard"],
  explain: "The model is fine; the POLICY moves. Lowering the threshold flags patients at 30% or 20% risk — more false alarms, far fewer missed cases. Costs decide cutoffs.",
  simple: "If missing a sick patient is a catastrophe and a false alarm is just an extra check-up, you should act on weak evidence: flag at 25% risk, not 50%. Same model — you just moved your line toward caution.",
  widget: {
    type: "threshold", title: "The cautious cutoff",
    world: "Patients placed by the model's risk score. Orange = truly ill. Every ✗ is a missed patient. Set the cutoff as if the ✗s cost a hundred times more than false alarms.",
    posName: "case", negName: "healthy", axis: "risk score", show: ["recall", "precision"],
    items: [{s:1,c:0},{s:1.8,c:0},{s:2.6,c:0},{s:3.2,c:1},{s:4,c:0},{s:4.8,c:0},{s:5.4,c:1},{s:6.2,c:0},{s:7,c:1},{s:7.8,c:1},{s:8.8,c:1},{s:9.6,c:1}],
    knob: { label: "Follow-up cutoff", min: 0, max: 10, step: 0.5, init: 5 },
    insights: [
      { max: 3, text: "🤯 Down here you catch every real case — recall 100% — at the price of extra check-ups. Given the stakes, that's the RIGHT trade, and 0.5 was never sacred.", tone: "wow" },
      { max: 6.5, text: "The default zone: balanced-looking, but count the ✗ marks — each one is a person sent home.", tone: "warn" },
      { max: 10, text: "High cutoffs make tidy, precise flags and miss most real cases. Optimising the wrong thing, beautifully.", tone: "warn" }
    ],
    extreme: { at: "min" },
    reveal: { name: "Cost-sensitive thresholds", formula: "pick t to minimise: cost_FN × misses + cost_FP × false alarms",
      text: "Probabilities let you match decisions to consequences. This is why logistic regression's probability output matters — a bare label could never support this choice." }
  }
},

{
  q: "A stakeholder asks: 'What does a one-unit increase in income do to the odds of approval?' Which property of logistic regression answers this directly?",
  choices: ["Each weight is a readable odds multiplier (e^w)", "The sigmoid's steepness at zero", "The size of the training set", "The threshold you picked", "The number of iterations run"],
  explain: "Exponentiate a weight and you get an odds ratio: e^w = how much one unit of that feature MULTIPLIES the odds. w = 0.7 → e^0.7 ≈ 2: each unit doubles the odds.",
  simple: "Logistic regression can explain itself: 'each extra year of history multiplies your approval odds by 1.6; each missed payment multiplies them by 0.4'. Few models can be read out loud like that.",
  widget: {
    type: "bayesOdds", title: "Reading the model out loud",
    world: "One applicant's odds of approval, built factor by factor. Each chip is a feature's exponentiated weight — a multiplier. Add them one at a time and watch the odds compound.",
    posName: "approval", prior: [1, 1],
    features: [
      { name: "steady income (×e^0.9)", lr: 2.5 },
      { name: "5y credit history (×e^0.5)", lr: 1.6 },
      { name: "1 missed payment (×e^−0.9)", lr: 0.4 },
      { name: "low existing debt (×e^0.6)", lr: 1.8 }
    ],
    knob: { label: "Features included", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Before any evidence: 1:1 odds — a coin flip. This is the intercept's job in the real model.", tone: "info" },
      { max: 2, text: "Each feature MULTIPLIES the running odds — steady income ×2.5, history ×1.6. You are literally reading the model's mind.", tone: "info" },
      { max: 4, text: "🤯 The missed payment chip multiplies by 0.4 — it UNDOES the credit-history boost and more. Every claim auditable, every factor separable: this is why regulated industries love this model.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Odds ratios (interpretability)", formula: "e^w = the factor by which one unit of a feature multiplies the odds",
      text: "Logistic regression's weights, exponentiated, become plain-English statements. When you must explain WHY someone was declined, this beats a black box." }
  }
}
];
