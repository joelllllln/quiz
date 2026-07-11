/* Performance Optimisation — Parts I & II. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).perf1 = [
  {
    "q": "In machine learning, what is a 'baseline'?",
    "choices": [
      "A dead-simple rule your real model must beat to prove its worth",
      "The highest accuracy any model could possibly reach on the data",
      "The final tuned model you actually ship to production users",
      "The average score across every model your team has trained so far",
      "A setting you pick before training to control the model's complexity"
    ],
    "explain": "A baseline is a trivial predictor — always guess the majority class, or repeat last period's value. It marks what zero skill looks like, so an impressive 92% means nothing until you know the baseline already scored 91%. Every later improvement is measured as points gained over this anchor.",
    "simple": "Before praising a runner's time, you need to know what a casual jog scores. The baseline is that casual jog: the laziest sensible guess. If your fancy model barely beats it, all your effort bought almost nothing.",
    "widget": {
      "type": "curveStatic",
      "title": "Points over the rock",
      "world": "A project's model score next to the flat do-nothing baseline as effort grows.",
      "xlab": "effort →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["baseline", "logistic", "tuned tree", "ensemble", "+features"],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "your model", "ys": [84, 88, 90, 91, 92] },
        { "name": "baseline (majority guess)", "ys": [84, 84, 84, 84, 84] }
      ],
      "knob": { "label": "Project stage", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Effort zero: the model is just the baseline — 84%, the majority-class guess. Zero skill, by definition.", "tone": "info" },
        { "max": 3, "text": "As effort grows the model pulls above the flat baseline. The GAP is the only part that is real skill.", "tone": "info" },
        { "max": 4, "text": "🤯 92% sounds great — but the baseline already scored 84%, so you actually earned 8 points. Always read a score as distance above the baseline, never alone.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Baseline", "formula": "real skill = model score − baseline score", "text": "The cheapest, highest-return habit in ML: establish the do-nothing score on day one, so every later number means something." }
    }
  },
  {
    "q": "What is a holdout (validation) set used for?",
    "choices": [
      "Data kept out of training, used to compare settings fairly",
      "Extra rows added into training so the model sees more cases",
      "The dumb rule a model must beat before it is worth shipping",
      "Data used to compute the final number reported to the world",
      "The slice the model trains on to learn its own parameters"
    ],
    "explain": "A validation (holdout) set is data withheld during training so you can compare hyperparameter choices on cases the model never learned from. It gives an honest read on which setting generalises best. The test set is held back even further — untouched by these comparisons — for the final verdict.",
    "simple": "You don't practise for an exam using the exact exam questions — you'd only prove you can memorise. The validation set is a stack of practice questions kept in a drawer: you check yourself on them to pick your best approach, fairly.",
    "widget": {
      "type": "curveStatic",
      "title": "Judged on unseen rows",
      "world": "One model's score on data it trained on versus held-out validation data as complexity rises.",
      "xlab": "model complexity →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["min", "low", "med", "high", "max"],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "training score", "ys": [70, 82, 90, 96, 99] },
        { "name": "validation (holdout)", "ys": [68, 80, 86, 82, 74] }
      ],
      "knob": { "label": "Complexity setting", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "At low complexity both scores sit close — but only the held-out number tells you how the model treats NEW rows.", "tone": "info" },
        { "max": 3, "text": "Validation peaks in the middle while training keeps climbing. Trust the holdout, not the training enthusiasm.", "tone": "info" },
        { "max": 4, "text": "🤯 At max complexity training hits 99% but validation sinks to 74% — the model memorised. Without a holdout set you'd never see the crash coming.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Holdout / validation set", "formula": "split off rows before training → score candidate settings on them", "text": "The honest referee for every tuning decision. Keep a separate test set sealed for the final number." }
    }
  },
  {
    "q": "What does k-fold cross-validation do?",
    "choices": [
      "Rotates which slice is held out, scores each, then averages",
      "Trains one model and tests it on a single held-out slice",
      "Adds more folds of data into training to reduce the bias",
      "Picks the single split that gives the best possible score",
      "Repeats training until the validation loss stops improving"
    ],
    "explain": "Cross-validation splits the data into k folds, then rotates: each fold takes a turn as the held-out test while the rest train, and the k scores are averaged. This removes the luck of any single split, since one lucky or unlucky slice can't dominate. The averaged score is a far more stable estimate of real performance.",
    "simple": "Judging a student on one random quiz is unfair — they might draw an easy or a nasty set. Cross-validation gives five different quizzes, each covering a different part, and averages the marks. No single lucky or unlucky day decides the grade.",
    "widget": {
      "type": "curveStatic",
      "title": "Rotating the held-out fold",
      "world": "Each single fold's score versus the stable 5-fold average for the same model.",
      "xlab": "fold used as test →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["fold 1", "fold 2", "fold 3", "fold 4", "fold 5"],
      "dec": 1,
      "yunit": "%",
      "series": [
        { "name": "single-fold score", "ys": [86, 79, 88, 82, 84] },
        { "name": "5-fold average", "ys": [83.8, 83.8, 83.8, 83.8, 83.8] }
      ],
      "knob": { "label": "Fold shown", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Fold 1 alone says 86%. Judge on that one slice and you'd overrate the model.", "tone": "info" },
        { "max": 3, "text": "Each fold gives a different verdict — 79% to 88%. Any single split is partly luck.", "tone": "info" },
        { "max": 4, "text": "🤯 The five folds average to ~84%, steady no matter which slice you look at. THAT average is the number you trust, not any lucky single split.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Cross-validation", "formula": "k folds: each takes a turn as test → average the k scores", "text": "Removes single-split luck. 5 or 10 folds is standard; it's the honest way to compare settings." }
    }
  },
  {
    "q": "What is data leakage in machine learning?",
    "choices": [
      "Test-set or future info sneaking into training by mistake",
      "Losing rows of your data when a file is saved incorrectly",
      "A model slowly forgetting old data as it trains for longer",
      "Sharing private user records outside the company's servers",
      "Splitting off too little data to test the model fairly on"
    ],
    "explain": "Data leakage is when information the model shouldn't have at training time — test-set statistics or facts from the future — slips into training. A classic case is scaling features using the whole dataset before splitting. Scores look wonderful in testing, then collapse in production because the leak isn't there anymore.",
    "simple": "It's like studying with a copy of the real exam hidden in your notes: your practice scores soar, but they're a lie. When the real test arrives without the cheat sheet, reality bites. Leakage flatters you now and betrays you later.",
    "widget": {
      "type": "curveStatic",
      "title": "The score that evaporates",
      "world": "Offline test score versus true production score as more leakage creeps in.",
      "xlab": "amount of leakage →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["none", "a little", "some", "a lot", "severe"],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "offline score", "ys": [84, 88, 91, 94, 97] },
        { "name": "production score", "ys": [84, 83, 83, 82, 82] }
      ],
      "knob": { "label": "Leakage amount", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "No leak: offline and production agree at 84%. Honest, if unglamorous.", "tone": "info" },
        { "max": 3, "text": "As leakage grows the offline score inflates while production stays flat — the gap is pure illusion.", "tone": "warn" },
        { "max": 4, "text": "🤯 Severe leakage: 97% offline, 82% live. Every point above the flat production line was borrowed from data the model won't have in the real world.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Data leakage", "formula": "fit every preprocessing step on the training split ONLY", "text": "The most common silent bug in applied ML. A too-good-to-be-true score usually is — hunt the leak before celebrating." }
    }
  },
  {
    "q": "KNN's k, a tree's depth, SVM's C, logistic regression's regularisation — what do all of these have in common?",
    "choices": [
      "They're hyperparameters — chosen by you, judged on validation data",
      "They're parameters the model fits to the data during training itself",
      "They're tuned by minimising the loss with gradient descent each step",
      "They're read straight off the training accuracy as the model learns",
      "They're fixed constants shared identically across all model types"
    ],
    "explain": "Parameters are learned FROM data (weights, split positions). Hyperparameters are settings ABOUT the learning — the model can't choose them for itself, so you sweep candidates and let held-out data judge.",
    "simple": "Every model has knobs it cannot turn on its own — how flexible to be, how hard to press. You turn them, and the fair judge of each position is data the model never saw. This one ritual — sweep, validate, pick — is half of applied machine learning.",
    "widget": {
      "type": "curveStatic",
      "title": "Every knob tells the same story",
      "world": "One complexity knob (any model, any name). Two verdicts at every setting. You've seen this shape for k, depth, C and gamma — because it's the same underlying law.",
      "xlab": "complexity knob →",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5,
        6
      ],
      "labels": [
        "min",
        "low",
        "med-",
        "med",
        "med+",
        "high",
        "max"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "training score", "ys": [ 68, 78, 86, 92, 96, 99, 100 ] },
        { "name": "validation score", "ys": [ 66, 76, 83, 86, 84, 79, 73 ] }
      ],
      "knob": { "label": "Complexity setting", "min": 0, "max": 6, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Too simple: both scores low — the model can't even express the pattern. Underfitting, any model, any knob.", "tone": "info" },
        { "max": 4, "text": "Validation peaks at 'med'. The training curve keeps climbing — ignore its enthusiasm.", "tone": "info" },
        { "max": 6, "text": "🤯 Max complexity: training 100%, validation 73%. Swap the axis label to k, depth, C or gamma and NOTHING else changes. Learn the shape once, tune everything forever.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Hyperparameters & the validation ritual", "formula": "for each candidate setting: fit on train, score on validation → keep the honest peak", "text": "The universal tuning loop. Every model in this course is operated with the exact same ritual — only the knob's name changes." }
    }
  },
  {
    "q": "You have 3 candidate values of C and 4 of gamma. Grid search with 5-fold cross-validation trains how many models — and why is that price worth paying?",
    "choices": [
      "60 — every combination × every fold, for a luck-proof comparison",
      "12 — one fit per combination, since the folds just reshuffle rows",
      "35 — the seven distinct values each retried across five random splits",
      "17 — the twelve combinations plus one extra fit for each of the folds",
      "20 — the five folds times the four gamma values you swept over"
    ],
    "explain": "3 × 4 = 12 combinations, each scored by 5-fold CV = 60 fits. Expensive — but each combination's score is an average over 5 splits, so the winner won a fair, luck-free tournament.",
    "simple": "Try every combination of knob settings, and score each one five times on rotated held-out slices so no setting wins by a lucky split. It's brute force with good manners — slow, boring, and extremely hard to fool.",
    "widget": {
      "type": "curveStatic",
      "title": "The tournament bracket",
      "world": "Cross-validated score for each of 12 (C, gamma) combinations, sorted. Slide across the bracket — and notice how close the top few are, which is exactly why the averaging mattered.",
      "xlab": "combination (sorted by CV score)",
      "xs": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "dec": 1,
      "yunit": "%",
      "series": [
        { "name": "mean CV score", "ys": [ 88.4, 88.1, 87.6, 86.9, 85.8, 84.6, 83.1, 81.2, 78.8, 75.9, 72.1, 67.4 ] },
        { "name": "single lucky-split score", "ys": [ 90.1, 86.4, 91.2, 85.1, 88.9, 82.2, 86, 79.5, 81, 74, 75.8, 65 ] }
      ],
      "knob": { "label": "Combination rank", "min": 0, "max": 11, "step": 1, "init": 0 },
      "insights": [
        { "max": 2, "text": "The top three combinations sit within 1 point of each other. A single split's noise (the jagged line) could easily crown the wrong one.", "tone": "info" },
        { "max": 7, "text": "Compare the lines: the lucky-split score disagrees with the fair average all over the bracket. That disagreement is what 5-fold averaging buys you out of.", "tone": "warn" },
        { "max": 11, "text": "🤯 60 model fits to make one trustworthy decision. Compute is cheap; shipping the wrong hyperparameters is not. (Random search covers big grids even better — same ritual, sampled.)", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Grid search + cross-validation", "formula": "GridSearchCV: combinations × folds fits → pick the best mean", "text": "The industrial-strength version of the tuning ritual. For large grids, random search finds near-winners at a fraction of the fits." }
    }
  },
  {
    "q": "You tuned hyperparameters for forty rounds, always scoring on the same validation set. Its score crept from 88% to 93%. Why does the team keep a THIRD, untouched test set?",
    "choices": [
      "Forty rounds of choices slowly overfit the validation set — only untouched data gives an honest final number",
      "Cross-validating across those forty rounds averages the creep away, so a third split really adds nothing",
      "The final model is retrained on the test set once the validation search has settled on its winning setting",
      "Validation scores only creep upward here because the held-out set was simply far too small to stay stable",
      "A third split exists mainly to triple your training rows once the tuning on the other sets has finished"
    ],
    "explain": "Every 'keep this setting' decision leaked a little information about the validation set into your choices. After forty rounds, part of that 93% is memorised validation quirks. The final exam must be data no decision ever touched.",
    "simple": "Grade yourself on the same page of questions forty times, adjusting each time, and your score rises whether or not you're learning. The untouched test set is the sealed exam — opened once, trusted precisely because you never got to adapt to it.",
    "widget": {
      "type": "foldPick",
      "title": "The creeping validation score",
      "world": "Five snapshots of the same project: four tuning rounds scored on the (reused) validation set, then the sealed test set opened at the end. Flick through the story.",
      "blurb": "Same project over time — where each score came from:",
      "folds": [
        { "name": "round 5 (val, reused)", "acc": 88 },
        { "name": "round 15 (val, reused)", "acc": 90 },
        { "name": "round 28 (val, reused)", "acc": 92 },
        { "name": "round 40 (val, reused)", "acc": 93 },
        { "name": "sealed test, opened once", "acc": 86 }
      ],
      "knob": { "label": "Project snapshot", "min": 1, "max": 6, "step": 1, "init": 1 },
      "insights": [
        { "max": 4, "text": "The validation score climbs every round — some of that is real progress, and some is your choices quietly moulding themselves to that one dataset.", "tone": "warn" },
        { "max": 5, "text": "🤯 The sealed test says 86% — seven points below the tuned-up validation number. THAT is the honest figure for the outside world.", "tone": "wow" },
        { "max": 6, "text": "Averaging reused scores can't fix this — the contamination is in the choices, not the arithmetic. Train / validate / test, and open the vault once.", "tone": "info" }
      ],
      "extreme": { "at": 5 },
      "reveal": { "name": "Train / validation / test discipline", "formula": "tune on validation · report from a test set used exactly once", "text": "Validation data spends its innocence a little with every decision it judges. The sealed test set is how your final claim stays believable." }
    }
  },
  {
    "q": "Across models, regularisation (KNN's bigger k, tree pruning, SVM's small C, logistic's penalty) always does the same job. Which?",
    "choices": [
      "Restrains flexibility so the model fits signal, not noise",
      "Boosts flexibility so the model can chase every training wiggle",
      "Cuts the training time by shrinking the model's parameter count",
      "Lifts training accuracy by letting the fit tighten on the data",
      "Rescales the input features onto a common, comparable range"
    ],
    "explain": "Regularisation deliberately limits how hard a model can contort itself. Training score drops slightly; generalisation usually improves — the model can no longer afford to memorise noise.",
    "simple": "Every model would love to explain every last wiggle in the training data — including the wiggles that are just noise. Regularisation is the leash: short enough to stop noise-chasing, long enough to reach the real pattern. Set the length on validation data.",
    "widget": {
      "type": "curveStatic",
      "title": "The leash length",
      "world": "One model, its regularisation swept from none to crushing. You've now seen this dial wearing four different names — read it one more time, fluently.",
      "xlab": "regularisation strength →",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "labels": [
        "none",
        "light",
        "medium",
        "firm",
        "heavy",
        "crushing"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "training score", "ys": [ 100, 97, 94, 91, 85, 74 ] },
        { "name": "validation score", "ys": [ 79, 85, 89, 90, 84, 72 ] }
      ],
      "knob": { "label": "Strength", "min": 0, "max": 5, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "No leash: a 21-point train/validation gap. All that training brilliance is memorised noise.", "tone": "warn" },
        { "max": 3, "text": "Firm leash: validation peaks while training gives up its fake perfection. This trade — training pain for real gain — is the whole point.", "tone": "info" },
        { "max": 5, "text": "🤯 Crushing: the model can't fit the signal either, and both scores sink. Underfitting and overfitting are the two ditches; regularisation steers between them.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Regularisation (the unified view)", "formula": "penalise complexity → trade training fit for generalisation", "text": "k, depth, C, gamma, λ — one idea in five costumes. If you can tune one, you can tune them all." }
    }
  },
  {
    "q": "Your model underperforms. Before buying more data, you plot scores against training-set size. The two curves have already converged, both around 78%. What does that tell you?",
    "choices": [
      "More data won't help — the model has hit its ceiling; change the model or features",
      "Doubling the training rows should close the gap and lift both curves noticeably higher",
      "The validation set is clearly too small, so the two curves only converged by accident",
      "Training accuracy is about to climb again as soon as a few more rows come in",
      "The labels must be noisy, which is why neither curve manages to reach a higher score"
    ],
    "explain": "Converged learning curves mean the model has extracted everything it can express: its bias is the bottleneck. More rows feed a hunger it doesn't have. A gap between the curves — that's when more data pays.",
    "simple": "The learning curve is a hunger test. Curves still far apart = the model is hungry, feed it rows. Curves already touching at 78% = it's full, and 78% is all this model can digest — improve the recipe (features, model class), not the portion size.",
    "widget": {
      "type": "curveStatic",
      "title": "The hunger test",
      "world": "Training and validation scores as the dataset grows. Slide the data budget and decide: is this model hungry, or full?",
      "xlab": "training rows",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "labels": [
        "500",
        "1k",
        "5k",
        "20k",
        "50k",
        "200k"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "training score", "ys": [ 95, 90, 84, 80, 79, 78 ] },
        { "name": "validation score", "ys": [ 62, 68, 74, 77, 78, 78 ] }
      ],
      "knob": { "label": "Training rows", "min": 0, "max": 5, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Small data: a huge gap. The model memorises what it has and generalises poorly — HUNGRY. Here, more rows genuinely help.", "tone": "info" },
        { "max": 3, "text": "The curves are closing. Each extra batch of rows buys less than the last — hunger is fading.", "tone": "info" },
        { "max": 5, "text": "🤯 Converged at 78%: another 150k rows bought one point. The bottleneck is the model's expressiveness now. Learning curves tell you WHERE to spend — data, features, or model — before you spend it.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Learning curves", "formula": "gap between curves = variance (data helps) · converged-but-low = bias (data won't)", "text": "One plot that prices your options. Teams that skip it routinely spend months collecting data their model cannot use." }
    }
  },
  {
    "q": "Fraud is 1% of your training data, and the model learns to ignore it. Which two standard levers push back — before touching the threshold?",
    "choices": [
      "Class weights in the loss, or resampling the training data",
      "More epochs on the loss, plus a larger held-out test set",
      "Feature scaling first, followed by PCA on the inputs",
      "A deeper network paired with heavier dropout regularisation",
      "Dropping the rare fraud rows as noisy, unhelpful outliers"
    ],
    "explain": "Class weights make each fraud error cost, say, 99× more in the loss; over/under-sampling rebalances what the model sees. Both force the training process itself to take the rare class seriously.",
    "simple": "The model ignores fraud because ignoring it is cheap: 1% wrong, 99% smug. Make fraud mistakes expensive (weights) or make fraud commonplace in the training diet (resampling) — either way, indifference stops being the winning strategy.",
    "widget": {
      "type": "curveStatic",
      "title": "Making the rare class expensive",
      "world": "Fraud recall and overall accuracy as the fraud-error penalty rises from 1× to 100×. Watch what the model 'chooses' to care about as the prices change.",
      "xlab": "penalty on fraud errors →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "1×",
        "5×",
        "20×",
        "50×",
        "100×"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "fraud recall", "ys": [ 12, 41, 68, 84, 93 ] },
        { "name": "overall accuracy", "ys": [ 99, 98, 96, 93, 89 ] }
      ],
      "knob": { "label": "Fraud-error penalty", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Equal penalties: recall 12%. The model has rationally concluded fraud isn't worth its attention. The loss function told it so.", "tone": "warn" },
        { "max": 2, "text": "At 20×, recall reaches 68% and accuracy dips a hair — the model is reallocating attention exactly as priced.", "tone": "info" },
        { "max": 4, "text": "🤯 At 100×: recall 93%, accuracy 89%. You didn't make the model smarter — you made it care. Class weights are priorities, written in maths.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Class weights & resampling", "formula": "class_weight='balanced' (weights) · or SMOTE / under-sampling (data)", "text": "Fix imbalance where the incentives live: in the loss or the data mix. Threshold-moving afterwards is the final polish, not the cure." }
    }
  }
];

(window.QUESTIONS = window.QUESTIONS || {}).perf2 = [
  {
    "q": "Team A spends a month swapping in fancier models. Team B spends a week adding one domain feature ('days since last login'). B wins by six points. What's the general lesson?",
    "choices": [
      "Better inputs usually beat better algorithms — features first, models second",
      "Simpler models nearly always generalise better than more complex ones do",
      "Swapping model families almost never changes real-world accuracy at all",
      "A six-point jump like that sits comfortably inside normal run-to-run noise",
      "Team B just drew a lucky validation split that flattered its final score"
    ],
    "explain": "Models can only recombine the information you feed them. One feature that directly encodes the signal ('recency') hands every model — even the simplest — what no amount of algorithmic sophistication could reconstruct from weak inputs.",
    "simple": "An algorithm is a chef; features are ingredients. A month of fancier chefs can't rescue a pantry with no seasoning — one right ingredient upgrades every dish at once. When stuck, ask 'what does the model not KNOW?' before 'what smarter model exists?'.",
    "widget": {
      "type": "curveStatic",
      "title": "Ingredients vs chefs",
      "world": "The same three models, before and after one well-chosen feature is added. Slide across the models and compare the two lines' gap with the gaps between models.",
      "xlab": "model",
      "xs": [
        0,
        1,
        2
      ],
      "labels": [
        "logistic",
        "tree ensemble",
        "kernel SVM"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "with the new feature", "ys": [ 86, 89, 88 ] },
        { "name": "original features", "ys": [ 79, 83, 82 ] }
      ],
      "knob": { "label": "Model", "min": 0, "max": 2, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "The humble logistic model WITH the feature (86%) beats every model WITHOUT it. One ingredient outran a month of chef upgrades.", "tone": "wow" },
        { "max": 1, "text": "The gap between the lines (~6 points) dwarfs the gap between models (~3). That ratio is typical of real tabular projects.", "tone": "info" },
        { "max": 2, "text": "Every model gains from the feature — information lifts all boats. Model choice fine-tunes; features move mountains.", "tone": "info" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Feature engineering first", "formula": "performance ≈ information in features × model's ability to use it — the first factor usually binds", "text": "The highest-leverage hour in most projects is spent asking domain experts what signals exist — not reading model documentation." }
    }
  },
  {
    "q": "A pipeline scales features using statistics computed on ALL the data — including the test set — before splitting. Scores look great; production disappoints. What happened?",
    "choices": [
      "Data leakage — test-set information seeped into training through the scaler",
      "The scaler was simply too aggressive and squashed the useful signal away",
      "The test set was far too small to give a stable estimate of accuracy",
      "Production traffic arrives unscaled, so the model never needed scaling",
      "The train-test split ratio was wrong, leaving too little data to test on"
    ],
    "explain": "The scaler's means and spreads were computed WITH the test rows, so training silently used facts about data it was supposed to never see. Every preprocessing step must be fitted on training data only.",
    "simple": "It's like glimpsing the exam paper while writing your study notes — even a peek at 'the average answer' helps unfairly. The fix is mechanical: fit every preprocessing step inside the training fold only. Pipelines exist to make that automatic.",
    "widget": {
      "type": "foldPick",
      "title": "The peek that flattered the score",
      "world": "The same model evaluated five ways: four with subtle leaks (scaler, feature selection, imputation fitted on all data), one with an airtight pipeline. Compare what each 'evaluation' promised.",
      "blurb": "Same model — five evaluation setups:",
      "folds": [
        { "name": "scaler fit on all data", "acc": 91 },
        { "name": "features picked on all data", "acc": 93 },
        { "name": "imputer fit on all data", "acc": 90 },
        { "name": "all three leaks at once", "acc": 95 },
        { "name": "airtight pipeline", "acc": 84 }
      ],
      "knob": { "label": "Evaluation setup", "min": 1, "max": 6, "step": 1, "init": 1 },
      "insights": [
        { "max": 4, "text": "Each leak adds a few flattering points — and the leaks STACK. None of these numbers will survive contact with production.", "tone": "warn" },
        { "max": 5, "text": "🤯 The airtight pipeline: 84%. That's the real model. Everything above it was the evaluation grading its own homework.", "tone": "wow" },
        { "max": 6, "text": "Rule of thumb: if a score jumps when you 'simplify' preprocessing outside the CV loop, you've found a leak, not an improvement.", "tone": "info" }
      ],
      "extreme": { "at": 5 },
      "reveal": { "name": "Preprocessing leakage", "formula": "fit scalers/selectors/imputers on the training fold only — sklearn Pipeline inside CV", "text": "The most common silent bug in applied ML. Too-good-to-be-true scores usually are — audit the pipeline before celebrating." }
    }
  },
  {
    "q": "During training you track validation loss after every epoch. It falls, bottoms out at epoch 30, then creeps upward while training loss keeps falling. What's the move?",
    "choices": [
      "Stop at (or roll back to) the validation minimum — early stopping",
      "Keep training until the validation loss turns back down on its own",
      "Shrink the validation set so its loss curve stops wobbling upward",
      "Raise the learning rate to push the model past the validation plateau",
      "Disregard it — only the falling training loss reflects real learning"
    ],
    "explain": "The upward creep is overfitting happening live: the model is now memorising training noise. Early stopping freezes the model at its best-generalising moment — regularisation implemented as a stopwatch.",
    "simple": "Training is like toasting bread: underdone, perfect, burnt — in that order, always. The validation curve tells you the moment of perfect toast. Early stopping is simply taking the toast out then, instead of admiring how 'done' it can get.",
    "widget": {
      "type": "curveStatic",
      "title": "The moment of perfect toast",
      "world": "Training and validation loss across epochs (lower is better). Find the epoch you'd stop at — then watch what patience 'buys' you after it.",
      "xlab": "training epochs",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5,
        6
      ],
      "labels": [
        "5",
        "10",
        "20",
        "30",
        "45",
        "60",
        "80"
      ],
      "dec": 2,
      "series": [
        { "name": "validation loss", "ys": [ 0.62, 0.48, 0.39, 0.35, 0.38, 0.43, 0.5 ] },
        { "name": "training loss", "ys": [ 0.6, 0.45, 0.33, 0.24, 0.16, 0.1, 0.06 ] }
      ],
      "knob": { "label": "Epochs trained", "min": 0, "max": 6, "step": 1, "init": 0 },
      "insights": [
        { "max": 2, "text": "Both losses falling together: genuine learning. Keep going.", "tone": "info" },
        { "max": 3, "text": "Epoch 30: validation bottoms out at 0.35. This is the model you want — photograph it (checkpoint!) right here.", "tone": "info" },
        { "max": 6, "text": "🤯 By epoch 80, training loss looks glorious (0.06) while validation is WORSE than epoch 10. Every epoch past 30 actively damaged the shipped model. Patience isn't a virtue here.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Early stopping", "formula": "checkpoint each epoch · stop when validation stops improving · keep the best", "text": "Free regularisation with a built-in tuning dial (when to stop). Standard practice for anything trained iteratively — boosting included." }
    }
  },
  {
    "q": "Five diverse models each score 84–88% alone. Averaging their predictions scores 91% — better than every member. What makes that possible?",
    "choices": [
      "Their errors differ — where one stumbles, the others outvote it",
      "Averaging predictions reliably adds a few points to any set of models",
      "The single strongest member quietly dominates the pooled average",
      "The five models shared weights, letting them reinforce one another",
      "It is just a rounding artefact of averaging five nearby probabilities"
    ],
    "explain": "Ensembling works when errors are DECORRELATED: each model is wrong on different cases, so the majority is right more often than any individual. Diversity, not individual brilliance, is the fuel.",
    "simple": "Five friends who make DIFFERENT mistakes correct each other; five clones of the best friend just repeat his mistakes louder. That's why ensembles mix model types, features and data views — disagreement among the right answers is harmless; disagreement among the errors is gold.",
    "widget": {
      "type": "curveStatic",
      "title": "The committee premium",
      "world": "Ensemble accuracy as diverse members join, versus the best single member. Watch where the premium comes from — and where it saturates.",
      "xlab": "models in the ensemble",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "1",
        "2",
        "3",
        "5",
        "9"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "ensemble (diverse members)", "ys": [ 86, 88, 90, 91, 91.5 ] },
        { "name": "best single model", "ys": [ 88, 88, 88, 88, 88 ] }
      ],
      "knob": { "label": "Ensemble size", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Two members already edge past the best individual — their disagreements are being settled correctly more often than not.", "tone": "info" },
        { "max": 3, "text": "Five diverse members: +3 over the best single model. This is the margin that wins competitions.", "tone": "info" },
        { "max": 4, "text": "🤯 Nine members ≈ five members. Once errors are averaged out, more of the SAME diversity adds nothing — you'd need a genuinely new kind of member. Diversity saturates; manage it deliberately.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Ensembling", "formula": "combine models with decorrelated errors: voting, averaging, stacking, forests, boosting", "text": "Random forests bake this into trees; stacking does it across model families. The prerequisite is always the same: members that fail differently." }
    }
  },
  {
    "q": "First day on a new classification problem. Before any tuning, what two numbers should you establish to anchor everything that follows?",
    "choices": [
      "The majority-class baseline and a simple model's honest score",
      "The highest accuracy and AUC the problem could ever possibly reach",
      "The dataset's total row count and its full number of features",
      "The best-case and worst-case prediction latency you can budget for",
      "The project's final deadline and its total available compute budget"
    ],
    "explain": "The do-nothing baseline tells you what zero skill looks like; a quick simple model (logistic regression, small tree) tells you what cheap skill looks like. Every later 'improvement' is measured against these anchors — without them, 90% might mean nothing.",
    "simple": "Numbers only mean something next to other numbers. '92% accurate!' — but the always-say-no rock scores 91%, so you've bought one point. Plant the two flags first: what does doing nothing score, what does something trivial score. THEN start climbing.",
    "widget": {
      "type": "curveStatic",
      "title": "Planting the flags",
      "world": "A project's models in order of effort, from the do-nothing rock to a tuned ensemble. Slide along and judge each step's REAL contribution — relative to the flags, not to zero.",
      "xlab": "effort →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "baseline rock",
        "logistic (1h)",
        "tuned tree (1d)",
        "ensemble (1w)",
        "+features (2w)"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "validation accuracy", "ys": [ 91, 93.5, 94.5, 95, 96.5 ] }
      ],
      "knob": { "label": "Project stage", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "The rock scores 91% (majority class). Any model scoring near 91% has learned approximately nothing — now you know that BEFORE being impressed.", "tone": "warn" },
        { "max": 2, "text": "The one-hour logistic model claims 2.5 real points over the rock. Cheap skill, honestly measured — your second flag.", "tone": "info" },
        { "max": 4, "text": "🤯 A week of ensembling bought 0.5 points; two weeks of feature work bought 1.5. With flags planted, every claim converts to points-over-baseline-per-week — and priorities set themselves.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Baselines before brilliance", "formula": "report every score as (model − baseline), never in isolation", "text": "The cheapest habit with the highest return in all of ML: two anchor numbers, day one, before anyone falls in love with a model." }
    }
  },
  {
    "q": "Two candidates for a live support-ticket router: model A, 94% accurate at 900 ms per prediction; model B, 92% at 15 ms. The SLA gives you 100 ms. What's the right engineering call?",
    "choices": [
      "Ship B — A's accuracy is worthless if its answers arrive too late",
      "Ship A — its two extra accuracy points outweigh any latency cost",
      "Ship A and negotiate the SLA up to a more forgiving latency limit",
      "Ship both and average their outputs to split the difference fairly",
      "Ship neither until A has been distilled back under the time budget"
    ],
    "explain": "A model that violates its latency budget doesn't have 94% accuracy in production — it has 0% availability. Serving constraints (latency, memory, cost) are hard requirements that shortlist the models BEFORE accuracy ranks them.",
    "simple": "The brilliant expert who answers every question in fifteen minutes is useless on a live phone line. Production models are hired for a JOB: right enough, fast enough, cheap enough — in that combined order, not accuracy alone.",
    "widget": {
      "type": "curveStatic",
      "title": "Right enough, fast enough",
      "world": "Four candidate models: accuracy and latency side by side. The SLA line is 100 ms. Slide across the menu and pick as an engineer, not a leaderboard.",
      "xlab": "candidate model",
      "xs": [
        0,
        1,
        2,
        3
      ],
      "labels": [
        "logistic",
        "small forest",
        "distilled model",
        "kernel SVM"
      ],
      "dec": 0,
      "series": [
        { "name": "accuracy %", "ys": [ 90, 92, 93, 94 ] },
        { "name": "latency ms", "ys": [ 4, 15, 40, 900 ] }
      ],
      "knob": { "label": "Candidate", "min": 0, "max": 3, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "The small forest: 92% at 15 ms — comfortably inside budget with headroom for traffic spikes. A strong professional answer.", "tone": "info" },
        { "max": 2, "text": "The distilled model buys another point at 40 ms — still legal. Distillation (training a fast model to mimic a slow one) is how teams keep accuracy AND speed.", "tone": "info" },
        { "max": 3, "text": "🤯 The 94% champion needs 900 ms — nine times the budget. On the leaderboard it wins; in production it doesn't exist. Constraints first, accuracy second.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Serving constraints", "formula": "shortlist by latency/memory/cost → THEN maximise accuracy within the shortlist", "text": "The closing lesson of the course: a model is a component in a system. The best model is the best system — measured where users live." }
    }
  }
];
