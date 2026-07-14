/* Logistic Regression — Part I: Foundations. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).logreg1 = [

{
  q: "Logistic regression has 'regression' in its name. What kind of task is it actually used for?",
  choices: ["Classification - assigning each case to a category", "Regression - predicting a continuous number for each case", "Clustering - grouping unlabelled cases into natural groups", "Ranking - ordering cases from most to least probable one", "Forecasting - projecting a numeric value into the future"],
  explain: "Logistic regression fits a linear model to the log-odds (that is the 'regression' part), but the sigmoid turns that score into a class probability, and a threshold converts it into a category label. So the machinery is regression-style while the delivered task is classification. It predicts a discrete class, not a continuous value.",
  simple: "The name is a historical leftover. Under the hood it does regression-style arithmetic on a score, but the job you hire it for is a yes/no sorting decision, like a bouncer deciding who gets in. You care about the category it hands back, not the raw number.",
  widget: {
    type: "curveStatic", title: "Regression inside, classification out",
    world: "As the raw linear score rises, the model's probability climbs past the 50% line and the predicted label flips to YES.",
    xlab: "raw score →", xs: [0,1,2,3,4], labels: ["-2","-1","0","+1","+2"], dec: 0, yunit: "%",
    series: [ { name: "probability of YES", ys: [12,27,50,73,88] }, { name: "50% threshold", ys: [50,50,50,50,50] } ],
    knob: { label: "Raw score", min: 0, max: 4, step: 1, init: 0 },
    insights: [ { max: 1, text: "At a low score the probability sits near 12% - the model firmly predicts the NO class.", tone: "info" }, { max: 3, text: "As the score climbs the probability rises toward the 50% threshold line.", tone: "info" }, { max: 4, text: "🤯 Once probability passes 50% the label flips to YES - a regression-style score has produced a classification.", tone: "wow" } ],
    extreme: { at: "max" },
    reveal: { name: "Regression in name, classification in job", formula: "linear score → probability → class label", text: "The 'regression' fits a line to the log-odds; the sigmoid and threshold turn it into a category decision." }
  }
},

{
  q: "What is the 'weighted score' that logistic regression computes for each case?",
  choices: ["Each feature times its weight, all summed with the intercept", "The probability each feature gets after the sigmoid squash", "The count of features that push toward the positive class", "The largest single feature-times-weight term, with the rest ignored", "The average of every feature value multiplied together, unweighted"],
  explain: "The model multiplies every feature by its learned weight, adds those products together, and adds the intercept. This single number, the linear combination w.x + b, is then handed to the sigmoid. It summarises the whole case in one value before any probability is formed.",
  simple: "It is like a scorecard: each answer is worth some points (its weight), and you add all the points up plus a starting bonus. One person, one final tally. That tally is the only thing the model reacts to next.",
  widget: {
    type: "curveStatic", title: "Adding up the score",
    world: "Features are added one at a time to build a single applicant's running score.",
    xlab: "features added →", xs: [0,1,2,3,4], labels: ["start","+income","+history","+debt","+age"], dec: 0, yunit: "",
    series: [ { name: "running score", ys: [0,2,3.5,3,4] } ],
    knob: { label: "Features added", min: 0, max: 4, step: 1, init: 0 },
    insights: [ { max: 1, text: "At the start the score is just the intercept - no features have spoken yet.", tone: "info" }, { max: 3, text: "Each feature adds (or subtracts) its own weighted contribution to the running total.", tone: "info" }, { max: 4, text: "🤯 The final number is the whole case boiled down to one value - that single score is all the sigmoid ever sees.", tone: "wow" } ],
    extreme: { at: "max" },
    reveal: { name: "Weighted score", formula: "score = w1x1 + w2x2 + ... + b", text: "One number summing every feature's weighted push plus the baseline, ready for the sigmoid." }
  }
},

{
  q: "What role does the intercept (bias) term play in logistic regression?",
  choices: ["It sets the baseline score when every feature is zero", "It rescales each feature so the weights can stay small", "It marks the cutoff where a probability becomes a label", "It measures how steep the sigmoid curve becomes overall", "It counts how many features push toward the positive class"],
  explain: "The intercept is added to the weighted sum no matter the feature values, so it fixes the score (and thus the probability) when all features are zero. It shifts the whole sigmoid left or right along the score axis. It captures the model's baseline lean toward one class before any evidence is weighed.",
  simple: "Think of a race where one runner gets a head start before the gun fires. The intercept is that head start: the model's opening lean toward yes or no, already in place before any feature runs. Features then add to or subtract from it.",
  widget: {
    type: "curveStatic", title: "The head start",
    world: "Sweeping the intercept slides the baseline score up while all features stay fixed.",
    xlab: "intercept value →", xs: [0,1,2,3,4], labels: ["-2","-1","0","+1","+2"], dec: 0, yunit: "",
    series: [ { name: "baseline score", ys: [-2,-1,0,1,2] } ],
    knob: { label: "Intercept value", min: 0, max: 4, step: 1, init: 0 },
    insights: [ { max: 1, text: "A strongly negative intercept means the model leans NO before any feature is seen.", tone: "info" }, { max: 3, text: "At zero the baseline is neutral - a coin flip until features tip it.", tone: "info" }, { max: 4, text: "🤯 A positive intercept pre-loads the score toward YES; the same features then decide from a biased start.", tone: "wow" } ],
    extreme: { at: "max" },
    reveal: { name: "Intercept (bias)", formula: "score = w.x + b  (b is the intercept)", text: "The baseline score added to every case, setting the model's default lean before features speak." }
  }
},

{
  q: "In logistic regression, what are the 'odds' of an outcome?",
  choices: ["The ratio of the yes-chance to the no-chance", "The probability rescaled onto a 0-to-100 range", "The raw score before the sigmoid squashes it", "The chance of yes minus the chance of no", "The logarithm of the probability of the outcome"],
  explain: "Odds express a belief as a ratio: probability divided by (1 minus probability). A 75% chance is odds of 3:1, meaning three expected yeses for every no. Odds run from 0 to infinity, unlike probability's 0-to-1, which is why the model finds them convenient to multiply.",
  simple: "A bookie does not say '75% chance'; they say '3 to 1'. Odds are the same belief written as a head-to-head ratio: how many yeses you expect for each no. A fair coin sits at 1:1.",
  widget: {
    type: "curveStatic", title: "Probability as a ratio",
    world: "As the yes-probability climbs, the odds ratio stretches upward far faster.",
    xlab: "probability of yes →", xs: [0,1,2,3,4], labels: ["50%","67%","75%","80%","90%"], dec: 0, yunit: "",
    series: [ { name: "odds (yes:no)", ys: [1,2,3,4,9] } ],
    knob: { label: "Probability level", min: 0, max: 4, step: 1, init: 0 },
    insights: [ { max: 1, text: "At 50% the odds are 1:1 - a dead heat, one yes per no.", tone: "info" }, { max: 3, text: "75% is 3:1 - the ratio grows faster than the probability does.", tone: "info" }, { max: 4, text: "🤯 By 90% the odds are 9:1; near certainty the ratio races toward infinity while probability barely moves.", tone: "wow" } ],
    extreme: { at: "max" },
    reveal: { name: "Odds", formula: "odds = p / (1 - p)", text: "The belief rewritten as a yes-to-no ratio, running from 0 to infinity instead of 0 to 1." }
  }
},

{
  q: "What is the log-odds (logit) in logistic regression?",
  choices: ["The logarithm of the odds, where the model is linear", "The probability left over after the sigmoid squashes it", "The ratio of the yes-chance to the no-chance directly", "The penalty added to the loss for large weight values", "The cutoff that turns a probability into a class label"],
  explain: "The log-odds is log(p / (1 - p)), the natural scale on which logistic regression is a straight line: log-odds = w.x + b. The sigmoid is exactly the inverse map that pulls this unbounded quantity back into a 0-to-1 probability. Weights add together on this scale, which is what makes them interpretable.",
  simple: "Odds stretch from 0 to infinity and bunch up awkwardly. Take their logarithm and the scale turns symmetric and straight: yes and no sit an equal distance either side of zero. That straight ruler is where the model actually does its adding.",
  widget: {
    type: "curveStatic", title: "The straight-line scale",
    world: "Converting odds to log-odds turns a lopsided ratio into an evenly spaced straight line.",
    xlab: "odds (yes:no) →", xs: [0,1,2,3,4], labels: ["1:4","1:2","1:1","2:1","4:1"], dec: 0, yunit: "",
    series: [ { name: "log-odds", ys: [-1.4,-0.7,0,0.7,1.4] } ],
    knob: { label: "Odds level", min: 0, max: 4, step: 1, init: 0 },
    insights: [ { max: 1, text: "Odds of 1:4 map to a negative log-odds - the NO side of zero.", tone: "info" }, { max: 3, text: "Even odds (1:1) sit exactly at zero: the natural centre of the log-odds scale.", tone: "info" }, { max: 4, text: "🤯 The steps are now evenly spaced - each doubling of the odds adds the same fixed amount. On THIS ruler the model is a straight line.", tone: "wow" } ],
    extreme: { at: "max" },
    reveal: { name: "Log-odds (logit)", formula: "logit = log( p / (1 - p) ) = w.x + b", text: "The straight-line scale the model thinks in; the sigmoid is just its inverse back to probability." }
  }
},

{
  q: "A logistic regression model looks at a loan application. What does it actually output?",
  choices: ["A probability between 0 and 1", "The single most likely class label", "A signed distance from the boundary", "The raw weighted sum, unsquashed", "A hard 0 or 1 decision value"],
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
  choices: ["Raw scores are unbounded — the sigmoid maps them into 0–1 first", "Probabilities simply read more naturally to people than signed raw scores", "The sigmoid step also filters random noise out of the score", "Negative scores are meaningless and would confuse the users", "The two scores sit on different scales and can't be compared"],
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
  choices: ["Compare it to a cutoff — flag if above", "Flag it whenever it beats the base rate of churn", "The model already decided; 62% just reports it", "Average it with the previous customer's score", "Scale it up until it clears 100%, then flag"],
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
  choices: ["A straight line (flat plane)", "A smooth curve bending toward the data", "One circular region per class", "A staircase of axis-aligned cuts", "As many segments as the classes need"],
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
  choices: ["More emails pushes the probability DOWN", "More emails pushes the probability UP", "The feature contributes almost nothing", "The weight's sign flips at the threshold", "Emails must be rescaled before it's valid"],
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
  choices: ["Log-loss — the penalty for confident wrong probabilities", "The raw count of mislabelled training examples", "The squared error between the true labels and probabilities", "The total distance from points to their class centre", "The size of the margin separating the two classes"],
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
  choices: ["A straight line predicts nonsense like −0.3 or 1.4", "Least squares can't properly optimise a two-class target", "The fitted line would rank the classes backwards", "The intercept can't be estimated from 0/1 data", "A line can never cross the 0.5 probability mark"],
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
  choices: ["Regularisation — penalise large weights", "Gather many more input features to fit", "Raise the decision threshold above 0.5", "Lower the learning rate and keep training", "Standardise the features before refitting"],
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
  choices: ["Lower the threshold below 0.5", "Raise the threshold well above 0.5", "Retrain the model on more features", "Report the raw scores to the doctors", "Make the sigmoid curve much steeper"],
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
  choices: ["Each weight is a readable odds multiplier (e^w)", "The sigmoid's slope at the decision boundary", "The intercept term shifted up by one unit", "The raw weight read straight off as a percentage", "The correlation between income and approval"],
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
