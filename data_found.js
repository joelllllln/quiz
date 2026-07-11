/* Machine Learning Foundations — the base every other topic builds on. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).found1 = [

{
  q: "A house-price dataset has columns: square footage, bedrooms, age, location score — and sold price. You want to predict prices for NEW houses. Which column plays a different role from the others, and why?",
  choices: ["Sold price is the LABEL — it's what we predict, and it's exactly the column we won't have for new houses", "Location score is the LABEL — it's a human judgement, and a model must output a judgement rather than a hard fact", "Bedrooms is the odd column out — it's a whole count, while the others are all smooth continuous measurements", "Square footage is the key input — it's the feature the model leans on hardest, which sets it apart from the rest", "Age is different — it keeps ticking up after the sale, so unlike the fixed columns it can't feed a prediction"],
  explain: "Features are inputs you'll know at prediction time; the label is the output you're trying to produce. The split isn't about data types or sizes — it's about WHEN you know each column. For a new listing, footage/bedrooms/age/location are all knowable; the sold price is precisely the unknown the model exists to fill in.",
  simple: "Four of these columns are clues; one is the answer. The test is simple: imagine a brand-new house you want a prediction for. You can measure its size, count its bedrooms, check its age and location — but the sold price doesn't exist yet. That missing-for-new-cases column is the label; everything else is a feature. Every supervised model in this manual is the same shape: clues in, answer out.",
  widget: {
    type: "curveStatic", title: "Clues vs the answer",
    world: "The five columns of the dataset, scored on two questions: 'do we know this for a NEW house?' and 'is this what the model must output?' Slide across the columns.",
    xlab: "column →", xs: [0,1,2,3,4], labels: ["sq footage","bedrooms","age","location","SOLD PRICE"], dec: 0, yunit: "",
    series: [
      { name: "known for a new house (1 = yes)", ys: [1, 1, 1, 1, 0] },
      { name: "what the model must output",      ys: [0, 0, 0, 0, 1] }
    ],
    knob: { label: "Column", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Square footage, bedrooms: knowable the moment a house is listed. These are features — the inputs.", tone: "info" },
      { max: 3, text: "Age and location too — every column so far scores 1 on 'known in advance' and 0 on 'must be output'. Clues, all of them.", tone: "info" },
      { max: 4, text: "🤯 Sold price flips both scores at once: unknown for new houses, and exactly what we want produced. One column playing a different GAME, not just holding different numbers — that's what makes it the label.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Features vs the label", formula: "features = inputs known at prediction time · label = the output to learn",
      text: "In code: X (features) and y (label). Every supervised dataset in this manual splits exactly this way — spotting the split is always step one." }
  }
},

{
  q: "Five projects land on your desk: a spam filter (with flagged examples), house-price prediction (with sold prices), customer grouping (no groups given), fraud detection via 'weirdness' (no fraud labels), and topic discovery in documents. What cleanly separates them into two camps?",
  choices: ["Whether labelled answers exist to learn from: spam and prices are supervised; the other three must find structure without answers — unsupervised", "Whether a human must interpret the output: spam and fraud flags need review, while grouping, pricing and topics run automatically", "Whether the goal is prediction or description: spam and fraud actively predict future events, while grouping, pricing and topics merely describe the patterns already sitting in the data", "Whether examples stream in or arrive as a batch: spam and fraud flow in over time, while prices, groups and topics form a fixed set", "Whether the answer is a category or a number: spam and fraud are yes/no, while prices, groups and topics live on a numeric scale"],
  explain: "Supervised learning has a teacher: every training row comes with the right answer (spam/not, the sold price), and the model learns the mapping. Unsupervised learning has no answer column at all — the task is to expose structure: groups (clustering), unusual points (anomaly detection), themes (topic models). The question 'do I have labels?' decides which half of this manual you're in.",
  simple: "Ask one question of each project: 'do I have a stack of examples WITH the correct answer attached?' Spam filter — yes, flagged emails. Prices — yes, real sales. Customer groups — no one has ever handed you the 'true' groups; you're asking the data to reveal them. That single yes/no splits all of machine learning into its two great halves: learning from answers, and finding structure without them.",
  widget: {
    type: "curveStatic", title: "The one-question sorting hat",
    world: "The five projects, scored on 'labelled answers available?' — watch them fall into two clean camps, whatever else they differ in.",
    xlab: "project →", xs: [0,1,2,3,4], labels: ["spam filter","house prices","customer groups","weirdness alarm","topic discovery"], dec: 0, yunit: "",
    series: [
      { name: "labelled answers exist (1 = yes)", ys: [1, 1, 0, 0, 0] },
      { name: "output is itself the structure",   ys: [0, 0, 1, 1, 1] }
    ],
    knob: { label: "Project", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Spam and prices: history handed you graded examples. The model's job is to learn the grading. Supervised.", tone: "info" },
      { max: 3, text: "Customer groups and the weirdness alarm: nobody possesses the 'right answers' — the finding IS the output. Unsupervised.", tone: "info" },
      { max: 4, text: "🤯 Text vs numbers, big vs small, fast vs slow — none of it mattered. One question sorted all five: are there labels to learn from? It also sorts this manual: topics 01–11 supervised, 12–16 unsupervised.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Supervised vs unsupervised learning", formula: "labels present → supervised · absent → unsupervised",
      text: "Supervised: classification & regression. Unsupervised: clustering, anomaly detection, dimensionality reduction. Semi-supervised and self-supervised blends exist — but this split is the map." }
  }
},

{
  q: "Both are supervised: 'will this customer churn — yes or no?' and 'how much will this customer spend next year — in pounds?'. What's the technical distinction, and why does it matter?",
  choices: ["The first predicts a CATEGORY (classification), the second a NUMBER (regression) — the choice changes the algorithms, the outputs and the error measures", "Both actually predict NUMBERS, but the first is bounded between 0 and 1 while the second runs entirely open-ended — so it is the range of the output, not its underlying type, that drives the metric you report", "The first is a ranking task and the second a scoring one — you order customers by risk in one and assign each a raw value in the other", "The first needs a probability threshold and the second a rounding rule — otherwise the same regression machinery answers both alike", "The first outputs one class and the second outputs many — the count of possible answers, not their kind, is the real technical divide"],
  explain: "Classification outputs one of a fixed set of classes (often with a probability per class); regression outputs a quantity on a continuous scale. The same core algorithms usually come in both flavours (DecisionTreeClassifier / DecisionTreeRegressor), but the loss functions, output layers and evaluation metrics (accuracy/F1 vs MAE/RMSE) all change with the answer type. Misidentifying the type is a project-level bug.",
  simple: "Look at the SHAPE of the answer. 'Churn: yes/no' has two possible answers — you're sorting customers into buckets. '£ spent next year' has infinitely many possible answers along a scale — you're placing a pin on a ruler. Buckets = classification; ruler = regression. It's the second question you ask of any new problem (right after 'do I have labels?'), because everything downstream — algorithm flavour, error metric, how you report results — follows from it.",
  widget: {
    type: "curveStatic", title: "Buckets or a ruler?",
    world: "Five prediction targets, scored: is the answer a category (bucket) or a quantity (ruler)? Slide across and sort them.",
    xlab: "prediction target →", xs: [0,1,2,3,4], labels: ["churn yes/no","£ next year","spam or not","temperature °C","which species"], dec: 0, yunit: "",
    series: [
      { name: "category → classification (1)", ys: [1, 0, 1, 0, 1] },
      { name: "quantity → regression (1)",     ys: [0, 1, 0, 1, 0] }
    ],
    knob: { label: "Target", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Churn is two buckets; £-spent is a ruler. Same customer, same data — different answer shapes, different machinery.", tone: "info" },
      { max: 3, text: "Temperature is a ruler even though it 'feels' physical; species is buckets even with 200 of them. Count the possible answers: finite list vs continuous scale.", tone: "info" },
      { max: 4, text: "🤯 The answer's shape dictates the whole toolchain: losses (log-loss vs squared error), outputs (probabilities vs values), metrics (F1 vs RMSE). One glance at the label column sets up everything that follows.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Classification vs regression", formula: "finite categories → classification · continuous quantity → regression",
      text: "Most algorithms ship in both flavours. Edge cases exist (ordinal ratings, counts) — but bucket-vs-ruler is the correct first instinct." }
  }
},

{
  q: "Everyone says a model is 'trained'. Concretely — mechanically — what is happening during training?",
  choices: ["The model's internal numbers are repeatedly nudged in whatever direction shrinks its measured error on the training examples", "The algorithm scans its store of examples and keeps the ones nearest each decision boundary for fast comparison at prediction time", "The strongest features are selected and the weak ones dropped, until only the columns that truly predict the label remain in play", "The data is divided into batches and reshuffled many times so the model sees every possible ordering of the training examples", "A fixed formula is solved once with algebra, placing the parameters exactly where the training data demands them in a single step"],
  explain: "A model is a function with adjustable numbers (parameters — weights, split thresholds, centroid positions). Training is a loop: measure how wrong the current numbers are (the LOSS), work out which direction of adjustment would reduce that wrongness, nudge, repeat. Different algorithms fill in the details differently (gradient descent, greedy splitting, closed-form solutions), but 'iteratively reduce a measured error' is the shared skeleton.",
  simple: "Picture tuning an old radio: you can't see the signal, but you can HEAR the static (the error), so you turn the dial a little, listen, turn again — always in the direction of less static. Training is exactly that, automated: the model's dials are its parameters, the static-meter is the loss function, and the loop runs thousands of times. Nothing is memorised, nobody types in answers — dials turn until the error stops falling.",
  widget: {
    type: "curveStatic", title: "Turning dials toward less static",
    world: "One model in training: watch its error (loss) and its accuracy across the training loop's iterations. Note WHERE the improvement happens — early, fast, then flattening.",
    xlab: "training iterations →", xs: [0,1,2,3,4,5], labels: ["0","10","50","200","1k","5k"], dec: 2, yunit: "",
    series: [
      { name: "loss (the static meter)", ys: [0.69, 0.55, 0.38, 0.27, 0.22, 0.21] },
      { name: "accuracy (÷100)",         ys: [0.5, 0.62, 0.76, 0.86, 0.9, 0.91] }
    ],
    knob: { label: "Iterations", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Iteration 0: the dials are random, the loss is at its 'pure guessing' level (0.69 is exactly the log-loss of a 50/50 shrug), accuracy is a coin flip.", tone: "info" },
      { max: 2, text: "Early nudges are worth the most — the error signal is loud, so each adjustment is large and confident.", tone: "info" },
      { max: 5, text: "🤯 By 5,000 iterations the curves have flatlined: the dials barely move because the static barely drops. 'Trained' isn't a magic state — it just means further nudging stopped helping. That's the whole ceremony.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Training = iterative error reduction", formula: "repeat: measure loss → adjust parameters downhill → until it stops falling",
      text: "The loss function defines 'wrong'; the optimiser picks the nudges. Every trained model in this manual — logistic regression to XGBoost — is this loop wearing different clothes." }
  }
},

{
  q: "Your colleague trains a model and proudly reports 99% accuracy — measured on the same rows the model trained on. Why must some data be locked away BEFORE training, and the score taken there instead?",
  choices: ["Because scoring on training rows measures memory, not skill — only never-seen rows preview how the model will do on the future", "Because a model always overfits the last rows it reads, so a fresh block scored at the end corrects that recency bias in the number", "Because scoring the same rows twice double-counts them, inflating the effective sample size and making the accuracy look higher", "Because the held-out rows are needed to tune the weights a second time, sharpening the fit just before the final score is taken", "Because averaging one training score with one test score cancels the random noise in each and yields a far steadier estimate"],
  explain: "A flexible model can score near-perfectly on data it has seen — the way a student aces the exact past paper they revised from. The number you actually need is performance on cases that didn't shape the model, because that's what deployment is. Hence the iron ritual: split first, train on one part, report on the untouched part. The gap between the two scores is itself diagnostic — it measures how much of the 'skill' was memorisation.",
  simple: "Testing a student with the very questions they revised from proves they can remember, not that they understand. The model is that student, and the training set is its revision pack. So before any studying happens, you tear off a chunk of the data and lock it in a drawer. After training, THE DRAWER gives the honest grade. Watch the two grades diverge in the lab — the gap is the lie you'd have told yourself.",
  widget: {
    type: "curveStatic", title: "The revision pack vs the locked drawer",
    world: "The same model evaluated two ways as it grows more flexible: score on its own training rows vs score on the locked-away holdout. Watch the two stories separate.",
    xlab: "model flexibility →", xs: [0,1,2,3,4], labels: ["very simple","simple","moderate","flexible","memoriser"], dec: 0, yunit: "%",
    series: [
      { name: "score on locked-away data",  ys: [71, 81, 87, 84, 72] },
      { name: "score on its own training rows", ys: [73, 85, 93, 98, 100] }
    ],
    knob: { label: "Model flexibility", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Simple models: the two scores nearly agree — there isn't enough flexibility to memorise, so 'training score' hasn't learned to lie yet.", tone: "info" },
      { max: 3, text: "Flexible: training says 98%, the drawer says 84%. The 14-point gap is pure memorisation being mistaken for skill.", tone: "warn" },
      { max: 4, text: "🤯 The memoriser scores a perfect 100% on its revision pack — and 72% on reality, WORSE than the moderate model. Report the training score and you'd ship the worst model in the lineup, believing it the best.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The train/test split", formula: "split BEFORE training · fit on train · report on never-touched test",
      text: "train_test_split(X, y, test_size=0.2) is line one of every honest project. Cross-validation (Topic 10) is this ritual, rotated and averaged." }
  }
},

{
  q: "Two failure modes bracket every model: one is too simple to capture the pattern, the other so flexible it 'learns' the noise. What are these called, and where does the best model sit?",
  choices: ["Underfitting and overfitting — the best model sits between them, at the peak of performance on HELD-OUT data", "Underfitting and overfitting — the best model is the one with the smallest gap between its training and its test scores", "Bias and noise — the best model drives bias to zero and treats the leftover noise as a fixed cost it cannot ever touch", "Overfitting and underfitting — the best model is whichever scores the highest on the training set with the fewest errors", "Rigidity and flexibility — the best model is always as flexible as the data budget and the hardware will let you make it"],
  explain: "Underfitting: the model can't even fit the training data (a straight line through a curve) — both training and test scores are poor. Overfitting: the model contorts around every training point, noise included — training score excellent, test score sliding. Between them sits the sweet spot, and it is only visible on held-out data: the training score just keeps rising with flexibility, straight past the point where reality starts getting worse.",
  simple: "Fitting a suit: too small and it pinches everywhere (underfit — wrong for everyone, including the training customer). Tailored to every wrinkle of one person on one day, and it fits nobody else — not even them, tomorrow (overfit). The right suit follows the SHAPE without chasing the wrinkles. And here's the trap: the tailor's own mirror (training score) says the wrinkle-chasing suit is the best fit ever made. Only a second opinion (held-out data) tells the truth.",
  widget: {
    type: "curveStatic", title: "Pinching, fitting, wrinkle-chasing",
    world: "One model family swept from rigid to hyper-flexible. Training score and held-out score tell different stories — find where they part company.",
    xlab: "flexibility (e.g. tree depth) →", xs: [0,1,2,3,4,5], labels: ["1","2","4","8","16","unlimited"], dec: 0, yunit: "%",
    series: [
      { name: "held-out score", ys: [63, 74, 85, 88, 83, 76] },
      { name: "training score", ys: [65, 77, 89, 96, 99, 100] }
    ],
    knob: { label: "Flexibility", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Left side: BOTH scores poor. The model is too rigid to capture the real pattern — underfitting fails even on data it has seen.", tone: "info" },
      { max: 3, text: "Depth 8: held-out peaks at 88%. The training score offers no hint that this is the top — it just keeps climbing.", tone: "info" },
      { max: 5, text: "🤯 Unlimited flexibility: training 100%, held-out down 12 points. Past the sweet spot, added flexibility is spent memorising noise — improving the illusion while worsening the reality. This single picture recurs in EVERY topic of this manual: k in kNN, depth in trees, C in SVMs, rounds in boosting.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Underfitting vs overfitting", formula: "too rigid: both scores poor · too flexible: train ↑ while held-out ↓",
      text: "The most important curve in machine learning. Complexity knobs move you along it; validation data tells you where you are on it." }
  }
},

{
  q: "In a decision tree, max_depth is set by YOU before training, while the split questions are found DURING training. What is this distinction called, and why does it matter for your workflow?",
  choices: ["Hyperparameters (your settings) vs parameters (learned values) — you tune the first via validation experiments; training handles the second", "Priors vs posteriors — you assert the first from prior belief, and training then updates them into the second using the data's evidence", "Structural vs numeric settings — the first fixes the model's overall shape and the second its numbers, but training is free to adjust either one", "Coarse vs fine controls — you pick the first by intuition, then let training grid-search the second across the validation folds", "Global vs local values — you set the first once for the whole model, while training re-derives the second at every single split"],
  explain: "Parameters are what training adjusts: weights, thresholds, centroids — filled in automatically by the fitting loop. Hyperparameters shape HOW that fitting happens: depth limits, k, C, learning rate. Training cannot choose them (deeper always fits training data better, so training would always choose 'unlimited'). So the workflow splits: an outer loop where you try hyperparameter settings and compare on validation data, and an inner loop where fit() learns parameters.",
  simple: "Baking bread: the recipe's settings — oven temperature, baking time — are yours to choose before you start (hyperparameters). What the dough actually does inside — the crumb, the rise — is determined by the process (parameters). You can't ask the dough to pick the oven temperature; and if you asked the training score, it would always say 'hotter, longer, more' — because more flexibility always flatters the training data. So YOU run bake-offs (validation experiments) to pick settings, and the oven does the rest.",
  widget: {
    type: "curveStatic", title: "You set the dial, training fills the details",
    world: "One hyperparameter (max_depth) swept by hand. For each setting, training automatically learns hundreds of parameters (the splits) — and validation data judges each finished bake.",
    xlab: "max_depth (yours to set) →", xs: [0,1,2,3,4], labels: ["1","2","4","8","16"], dec: 0, yunit: "",
    series: [
      { name: "validation accuracy (%)",        ys: [70, 80, 88, 86, 80] },
      { name: "parameters learned (splits)",    ys: [1, 3, 15, 90, 400] }
    ],
    knob: { label: "max_depth", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Depth 1: you allowed one question; training found the best ONE split it could. Your dial capped the model; training filled in the detail.", tone: "info" },
      { max: 2, text: "Depth 4: training now learns 15 splits — every threshold chosen by the fitting loop, none by you. Validation says this is the best bake so far.", tone: "info" },
      { max: 4, text: "🤯 Depth 16: training happily learns 400 splits (it never says no to flexibility) — but validation says worse. That's WHY hyperparameters must be chosen by you + validation, never by the training process: training always votes for 'more'.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Hyperparameters vs parameters", formula: "hyperparameters: set before fit(), tuned on validation · parameters: learned by fit()",
      text: "sklearn mirrors it exactly: hyperparameters go in the constructor — DecisionTreeClassifier(max_depth=4) — parameters appear on the fitted object. GridSearchCV automates the outer loop." }
  }
},

{
  q: "A lookup-table 'model' answers new cases by finding an identical past case and copying its answer. It scores 100% on training data. Why does it collapse in the real world, and what must a real model do instead?",
  choices: ["New cases are almost never identical to old ones — a model must GENERALISE: capture the pattern so it can answer cases it never saw", "Lookup tables can never store enough rows — a model must COMPRESS: shrink the table until every past case still fits inside memory", "New cases arrive far too quickly to search — a model must INDEX: pre-sort the examples so the matching answer is found instantly", "Old answers steadily go stale over time — a model must REFRESH: retrain on the newest rows so its copied answers stay current", "Exact matches are almost always wrong — a model must AVERAGE: blend the answers of the ten closest past cases into one smoothed prediction"],
  explain: "The space of possible inputs is astronomically larger than any training set — a new customer matches no old row exactly. The lookup table has no answer (or copies a wrong near-miss). Generalisation means extracting the RULE that connects features to labels, so the model interpolates gracefully between its examples. Every technique in this manual — regularisation, pruning, validation — exists to push models away from memorising and toward generalising.",
  simple: "A student who memorised every past paper answers perfectly — IF the exam repeats a past question word for word. Real exams never do. The student who learned the METHOD can solve questions nobody has ever asked. Machine learning's whole difficulty is that memorising is easy and scores perfectly in rehearsal, while the only thing that matters — handling the genuinely new — requires learning the method. Watch both students face increasingly novel exams.",
  widget: {
    type: "curveStatic", title: "Past-paper memoriser vs method-learner",
    world: "Two 'models' scored on exams containing progressively fewer questions seen during revision. One memorised answers; one learned the method.",
    xlab: "share of exam questions seen in revision →", xs: [0,1,2,3,4], labels: ["100%","50%","20%","5%","0%"], dec: 0, yunit: "%",
    series: [
      { name: "method-learner (generalises)", ys: [92, 90, 89, 88, 88] },
      { name: "memoriser (lookup table)",     ys: [100, 74, 58, 51, 49] }
    ],
    knob: { label: "Exam novelty", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Exam = the revision pack: the memoriser's perfect 100% beats the method-learner. On seen data, memorisation always looks superior.", tone: "warn" },
      { max: 2, text: "At 20% repeats the memoriser is down 42 points — every unseen question is a coin flip for it. The method-learner barely notices the novelty.", tone: "info" },
      { max: 4, text: "🤯 Fully novel exam — which is what deployment IS — the memoriser scores 49%: literally a coin flip. The method-learner holds 88%. Generalisation isn't one desirable property among many; it is the product.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Generalisation", formula: "value of a model = performance on inputs it has never seen",
      text: "Deployment data is, by definition, new. Everything in this manual — validation, regularisation, pruning, ensembles — is machinery for buying generalisation." }
  }
},

{
  q: "A dataset records age (18–70) and salary (£15,000–£150,000). Many algorithms compare examples by DISTANCE or combine features into weighted sums. What silently goes wrong with raw units, and what's the standard fix?",
  choices: ["Salary's huge numeric range drowns age in every calculation — standardise features onto comparable scales before fitting", "Age's tiny numeric range rounds down to nothing in every calculation — multiply the small features up until they match salary", "Salary and age are correlated, so one of them is redundant — drop whichever feature carries the least variance before fitting", "Mixed units confuse the optimiser's gradients — convert every column into one shared physical unit, such as pounds, before fitting", "Large values overflow the distance formula's arithmetic — cap salary at a ceiling so no single number can dominate the sum"],
  explain: "A 30-year age gap contributes 30² to a squared distance; a £30,000 salary gap contributes 30,000² — a million times more. Any distance-based method (kNN, k-means, DBSCAN, SVM) and any penalised weighted-sum method (regularised regression) effectively ignores the small-unit feature. StandardScaler (subtract mean, divide by standard deviation) puts every feature on the same footing. It's the most common silent bug in beginner pipelines.",
  simple: "Two people shout their differences at the algorithm: age whispers 'we differ by 30!' while salary roars 'WE DIFFER BY 30,000!'. The algorithm — which only hears numbers, not meanings — concludes salary is basically all that matters. Nobody chose that; the UNITS chose it. Scaling gives each feature the same voice, so the data (not the currency) decides what similarity means. This one bug will stalk half the topics in this manual — meet it properly now.",
  widget: {
    type: "scaleFeature", title: "The units pick the winner",
    world: "One target person and four candidates. Who counts as 'most similar'? Shrink salary's units step by step — same people, same facts — and watch the verdict flip.",
    aName: "age", bName: "salary",
    target: { name: "person X", a: 30, b: 40000 },
    cands: [
      { name: "match A · 31y, £41k", a: 31, b: 41000 },
      { name: "match B · 65y, £40.4k", a: 65, b: 40400 },
      { name: "match C · 27y, £46k", a: 27, b: 46000 },
      { name: "match D · 34y, £54k", a: 34, b: 54000 }
    ],
    knob: { label: "Shrink salary units by", min: 0, max: 4, step: 0.25, init: 0 },
    insights: [
      { max: 0.5, text: "Raw units: the 65-year-old is 'most similar' to our 30-year-old — a £600 salary gap outweighs a 35-year age gap. The units decided, not the data.", tone: "warn" },
      { max: 2.5, text: "As salary's roar fades, age finally gets a hearing — the similarity ranking reshuffles with every step, though not one fact about the people changed.", tone: "info" },
      { max: 4, text: "🤯 On balanced scales, the 31-year-old on £41k wins — the genuinely similar person. Every distance, cluster, and regularised weight downstream inherits this choice. Scale first; it's one line: StandardScaler().", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Feature scaling (standardisation)", formula: "z = (x − mean) / std — every feature gets mean 0, spread 1",
      text: "Needed by anything distance-based or penalty-based (kNN, k-means, DBSCAN, SVM, regularised regression, PCA). Tree-based models are the notable exception — splits don't care about units." }
  }
},

{
  q: "A fraud model scores 97.8% accuracy and the team celebrates — until someone computes the dumbest possible rule. On data where 2% of transactions are fraud, what does 'always predict NOT fraud' score, and what's the lesson?",
  choices: ["98% — beating the celebrated model. Every result must be compared against the best 'dumb' baseline before it means anything", "2% — matching the fraud rate. A rule this blunt can only ever score as high as the share of the rare class it manages to ignore", "98% — but it merely ties the real model, which proves accuracy is a fair yardstick here so long as a baseline is reported too", "96% — falling just short. A do-nothing rule always lands a couple of points below any model that has genuinely learned something", "100% — because it never once raises a false alarm on the legitimate transactions that make up the overwhelming majority here"],
  explain: "With 98 legitimate transactions per 100, 'always say no' is right 98 times: 98% accuracy, zero intelligence, zero fraud caught. The 97.8% model is literally worse than doing nothing. Baselines calibrate every metric: majority-class for classification, predict-the-mean (or last value) for regression. sklearn ships DummyClassifier precisely so this comparison is one line. A number without a baseline is decoration.",
  simple: "A weather forecaster in the desert who says 'no rain' every single day is right 98% of the time — and knows nothing about weather. Impressive-sounding scores can be pure background: the shape of the data doing all the work. So the first model on any project should be the dumbest one — majority vote, the average, yesterday's value. It costs nothing, and every real model must beat it to deserve existence. The lab shows how 'impressive' collapses once the baseline enters the room.",
  widget: {
    type: "curveStatic", title: "First, hire the dummy",
    world: "Five 'models' on the 2%-fraud dataset — accuracy next to what actually matters (fraud caught). Note who beats the do-nothing baseline, and on which metric.",
    xlab: "model →", xs: [0,1,2,3,4], labels: ["always 'no'","random 50/50","celebrated 97.8%","tuned model","tuned + threshold"], dec: 0, yunit: "%",
    series: [
      { name: "accuracy",     ys: [98, 50, 97.8, 98.4, 97.9] },
      { name: "fraud caught", ys: [0, 50, 21, 62, 88] }
    ],
    knob: { label: "Model", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "The dummy: 98% accuracy, 0% of fraud caught. Remember this bar — it's what 'no intelligence whatsoever' scores here.", tone: "info" },
      { max: 2, text: "The celebrated model: BELOW the dummy on accuracy, and catching one fraud in five. Without the baseline in the room, nobody would have known.", tone: "warn" },
      { max: 4, text: "🤯 The tuned model with a chosen threshold: accuracy looks 'worse' than the dummy (97.9 vs 98) yet catches 88% of fraud — because accuracy was the wrong yardstick all along on imbalanced data. Baselines expose both bad models AND bad metrics.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Baselines", formula: "model value = score − best dumb rule's score",
      text: "DummyClassifier / DummyRegressor in sklearn. On imbalanced problems, pair the baseline with the right metric (precision/recall — Topic 09), or the comparison still lies." }
  }
},

{
  q: "Statisticians decompose a model's error into two dueling sources. One comes from being systematically too simple; the other from swinging wildly with whichever training sample you happened to draw. Name them — and the trade they force.",
  choices: ["Bias (rigidity: wrong on average) and variance (instability: different every retrain) — reducing one usually inflates the other", "Bias (a skewed sample) and variance (a noisy target) — gathering more data shrinks both of them at once, with no trade to manage", "Systematic error and random error — the first comes from bad labels and the second from too few rows, and cleaning lowers both", "Bias (underfitting) and variance (overfitting) — the two are fully independent, so each can be driven to zero without touching the other", "Offset and spread — the first shifts every prediction equally and the second widens them, and a good model removes the offset first"],
  explain: "Bias: the model's average prediction (across retrains on fresh samples) misses the truth — a straight line fit to a curve is wrong on average, however much data you give it. Variance: individual retrains scatter widely around that average — deep trees redraw themselves for every sample. Total error ≈ bias² + variance + irreducible noise. Flexibility spends bias to buy variance; the sweet spot minimises the sum. This one trade explains regularisation, pruning, k, C — and why forests (averaging kills variance) and boosting (sequential fitting kills bias) exist.",
  simple: "Two archers: one has a bent sight — every arrow lands left of the bullseye, in a tight, consistent group (bias: reliably wrong). The other has perfect aim but shaky hands — arrows scatter all around the bullseye, rarely in it (variance: inconsistently right). Model flexibility moves you from archer one toward archer two: rigid models are steady-but-off, flexible models are centred-but-scattered. You can rarely fix both at once — but you can find the flexibility where the COMBINED miss is smallest. That search is half of applied machine learning.",
  widget: {
    type: "curveStatic", title: "The bent sight and the shaky hand",
    world: "Error decomposed across a flexibility sweep: the bias part falls, the variance part rises, and their sum — the error you actually suffer — makes a U.",
    xlab: "model flexibility →", xs: [0,1,2,3,4], labels: ["rigid","simple","moderate","flexible","wild"], dec: 0, yunit: "",
    series: [
      { name: "total error",          ys: [32, 22, 16, 21, 35] },
      { name: "error from bias",      ys: [30, 18, 8, 3, 1] },
      { name: "error from variance",  ys: [2, 4, 8, 18, 34] }
    ],
    knob: { label: "Flexibility", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Rigid: almost all the error is bias — the bent sight. More data won't help; the model CAN'T represent the truth.", tone: "info" },
      { max: 2, text: "Moderate: bias and variance meet at 8 apiece, and their sum bottoms out at 16. This is the sweet spot the validation curve has been showing you all along.", tone: "info" },
      { max: 4, text: "🤯 Wild flexibility: bias nearly zero, variance 34 — the shaky hand dominates. And now you know WHY ensembles work: forests average away variance (steady the hand), boosting stacks corrections to remove bias (straighten the sight).", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The bias–variance trade-off", formula: "expected error ≈ bias² + variance + irreducible noise",
      text: "The theory under every complexity knob in this manual. Diagnosis: high bias → both scores poor (add flexibility/features); high variance → big train-test gap (regularise, simplify, or ensemble)." }
  }
},

{
  q: "A model says '75% probability of churn'. Your product manager asks: 'so what are the odds?'. These two languages for uncertainty appear all over ML — how do they interconvert?",
  choices: ["odds = p/(1−p): 75% ⇔ 3:1 — three churns per one stay; the same belief in ratio form", "odds = p/(1+p): 75% gives 0.43 — a bit under one churn per two stays; the ratio read backwards", "odds = 2p - 1: 75% gives 0.5 — the split tipped halfway from an even balance toward certain churn", "odds = 1/p: 75% gives 1.33 — the customers you must watch to expect a single churn among them", "odds = p/100: 75% gives 0.75 — the same figure probability already reported, wearing a new label"],
  explain: "Probability slices a whole into parts (75 of 100 churn). Odds compare the parts to each other (75 churn : 25 stay = 3:1). Conversions: odds = p/(1−p), p = odds/(1+odds). Odds are the native language of logistic regression (whose weights multiply odds) and naive Bayes (whose evidence multiplies odds); probability is the language of thresholds and reports. Fluency in both — and the conversion — pays off in Topics 02, 03 and 09.",
  simple: "Same belief, two grammars. Probability talks about the whole pie: '75% of these customers churn'. Odds talk about the ratio between the slices: 'three churners for every stayer — 3:1'. Tiny probabilities make the difference vivid: 1% probability is 1:99 odds — one yes against ninety-nine nos. Models like logistic regression and naive Bayes do their arithmetic in odds (because evidence MULTIPLIES odds cleanly), then translate back to probability for humans. Learn the exchange rate once; two entire topics get easier.",
  widget: {
    type: "curveStatic", title: "Two grammars, one belief",
    world: "The probability-to-odds exchange rate, point by point. Slide the probability and read the equivalent odds — notice how the ratio explodes near the top.",
    xlab: "probability →", xs: [0,1,2,3,4,5], labels: ["1%","10%","25%","50%","75%","90%"], dec: 2, yunit: "",
    series: [
      { name: "odds (yeses per one no)", ys: [0.01, 0.11, 0.33, 1, 3, 9] }
    ],
    knob: { label: "Probability", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "1% probability = odds 0.01 (i.e. 1:99). 10% = 1:9. At the low end, odds and probability nearly coincide — one reason rare-event models often report odds.", tone: "info" },
      { max: 3, text: "50% is the fixed landmark: odds exactly 1 (1:1, a fair coin). Below it odds are fractions; above it they're multiples.", tone: "info" },
      { max: 5, text: "🤯 75% → 3:1, but 90% → 9:1: the same 15-point probability step tripled the odds. The two scales stretch differently — which is exactly why logistic regression works in LOG-odds, where steps become even. You've just previewed Topic 02's central idea.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Probability ↔ odds", formula: "odds = p/(1−p) · p = odds/(1+odds)",
      text: "Odds are ML's working currency (logistic regression's e^w multipliers, naive Bayes' likelihood ratios); probability is the reporting currency. The conversion is one division." }
  }
}
];
