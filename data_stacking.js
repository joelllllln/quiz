/* Stacking & Voting — Parts I & II. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).stack1 = [
  {
    "q": "Stacking goes beyond averaging: a logistic regression, a forest and a boosted model each make predictions, and then… what happens?",
    "choices": [
      "A meta-model TRAINS on their predictions to learn the best combination",
      "The predictions are multiplied together",
      "The worst model is deleted each round",
      "Each model retrains on the others' errors",
      "Their weights are averaged into one model"
    ],
    "explain": "Stacking treats base models' predictions as FEATURES for a second-level learner, which learns whom to trust, when — e.g. 'trust the forest except when the logistic model is very confident'. Learned combination beats fixed averaging.",
    "simple": "Averaging gives every advisor an equal say forever. Stacking hires a chairperson who has watched the advisors' track records and learned each one's blind spots — weighting their opinions case by case. The chairperson is just another small model.",
    "widget": {
      "type": "curveStatic",
      "title": "Hiring the chairperson",
      "world": "Validation accuracy of three base models, their plain average, and a stacked meta-model. Slide across the ladder of sophistication.",
      "xlab": "combination strategy",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "logistic",
        "forest",
        "boosted",
        "plain average",
        "stacked meta"
      ],
      "dec": 1,
      "yunit": "%",
      "series": [
        { "name": "validation accuracy", "ys": [ 84, 87.5, 88.5, 90, 91.5 ] }
      ],
      "knob": { "label": "Strategy", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 2, "text": "The three base models: different strengths (and, crucially, different mistakes). Best individual: 88.5%.", "tone": "info" },
        { "max": 3, "text": "A plain average already beats every member — the diversity dividend you know from bagging.", "tone": "info" },
        { "max": 4, "text": "🤯 The stacked meta-model adds another 1.5 by LEARNING the combination — trusting the boosted model on dense regions, the logistic one near the linear edge. That final point-and-a-half is how competitions are won.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Stacking (stacked generalisation)", "formula": "level-0 models' predictions → features for a level-1 meta-model", "text": "The heavy artillery of ensembling. Costly and complex — reach for it when the last point of accuracy genuinely pays." }
    }
  },
  {
    "q": "Three classifiers vote on one case: model A says class 1 with 90% confidence; models B and C say class 0 — at 55% and 60%. Hard voting and soft voting now disagree. How does each decide?",
    "choices": [
      "Hard voting counts labels (class 0 wins 2–1); soft voting averages probabilities, so A's 90% overturns two lukewarm opinions",
      "Both pick class 0",
      "Both pick class 1",
      "Soft voting picks whichever model is most accurate",
      "Hard voting averages the probabilities"
    ],
    "explain": "Hard: count predicted labels → class 0 by 2–1. Soft: average P(class 1) = (0.90 + 0.45 + 0.40)/3 = 58.3% → class 1. Soft voting lets confidence carry information — one near-certain model outweighs two coin-flippers — and usually wins IF the probabilities are calibrated. With overconfident members (naive Bayes, deep trees), hard voting can be the safer count.",
    "simple": "Hard voting is a show of hands — a shrug counts the same as a pounding fist. Soft voting listens to HOW SURE everyone is: two mumbled 'probably not's can lose to one emphatic 'DEFINITELY yes'. That's usually smarter — unless your loudest member is a habitual exaggerator, which is exactly what uncalibrated models are.",
    "widget": {
      "type": "curveStatic",
      "title": "A shrug vs a pounding fist",
      "world": "Models B and C are fixed lukewarm no-votes (55%, 60% for class 0). Slide model A's confidence in class 1 and watch when each voting rule flips.",
      "xlab": "model A's confidence in class 1 →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "55%",
        "65%",
        "75%",
        "85%",
        "95%"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "soft vote: avg P(class 1)", "ys": [ 47, 50, 53, 57, 60 ] },
        { "name": "hard vote: share for class 1", "ys": [ 33, 33, 33, 33, 33 ] }
      ],
      "knob": { "label": "Model A's confidence", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "A barely leans class 1 (55%): soft average sits at 47% — below the 50% line, so both rules agree on class 0.", "tone": "info" },
        { "max": 2, "text": "A at 75%: the soft average crosses 50% and flips to class 1. The hard vote hasn't moved — labels are still 2 against 1, and labels are all it can see.", "tone": "info" },
        { "max": 4, "text": "🤯 A at 95%: soft voting is firmly class 1 while hard voting still reports 33% — flat across the ENTIRE slider. Hard voting threw away every drop of confidence information. That thrown-away information is precisely what soft voting (and stacking) run on.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Hard vs soft voting", "formula": "hard: argmax of label counts · soft: argmax of averaged probabilities", "text": "sklearn: VotingClassifier(voting='hard'|'soft'). Prefer soft with calibrated members; stacking goes one further and LEARNS how much to trust each member." }
    }
  },
  {
    "q": "An ensemble only helps if its members make DIFFERENT mistakes. Ranked honestly, where does the strongest diversity come from?",
    "choices": [
      "Different model families — a tree, a linear model and a kNN err in structurally different ways; reseeding one model barely helps",
      "Different random seeds of the same model",
      "Training the same model twice as long",
      "Renaming the features",
      "Averaging the same model's output twice"
    ],
    "explain": "Two seeds of one architecture share every structural blind spot — their errors correlate heavily, so averaging cancels little. Different families carve the feature space differently (axis-aligned boxes vs hyperplanes vs local neighbourhoods) and fail in different places. Error-correlation, not member count, is what limits an ensemble: five clones ≈ one model; three genuinely different views ≈ real gain.",
    "simple": "Ask the same critic five times and you get the same review with typos. Ask a chef, a farmer and a nutritionist and disagreements become informative — where one is blind, another sees. Model families are the professions here: trees think in boxes, linear models in slopes, kNN in neighbourhoods. Mixing professions is what makes the committee smarter than its chair.",
    "widget": {
      "type": "curveStatic",
      "title": "Five clones vs three professions",
      "world": "Ensembles assembled five ways from members of equal individual accuracy (85%). Watch ensemble accuracy against how much the members' ERRORS overlap.",
      "xlab": "how the ensemble is assembled →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "1 model",
        "3 seeds",
        "3 same-family",
        "3 families",
        "5 families"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "ensemble accuracy", "ys": [ 85, 86, 86.5, 90, 91 ] },
        { "name": "error overlap between members", "ys": [ 100, 81, 74, 45, 40 ] }
      ],
      "knob": { "label": "Ensemble makeup", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Three seeds of one model: error overlap 81%, gain one measly point. They're the same mind with different moods.", "tone": "warn" },
        { "max": 3, "text": "Tree + logistic + kNN: overlap drops to 45% and accuracy jumps to 90 — mistakes now happen in DIFFERENT places, so the vote can fix them.", "tone": "info" },
        { "max": 4, "text": "🤯 The accuracy curve mirrors the overlap curve upside-down, almost point for point. Ensemble gain is not about adding members — it's about subtracting shared blind spots. Recruit for disagreement.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Ensemble diversity", "formula": "gain ∝ member accuracy × (1 − error correlation)", "text": "Sources of diversity, strongest first: different families > different features/data views > different hyperparameters > different seeds. Stacking exploits exactly this." }
    }
  }
];

(window.QUESTIONS = window.QUESTIONS || {}).stack2 = [
  {
    "q": "When building the stacking meta-model's training data, the base models' predictions must come from OUT-OF-FOLD predictions. What goes wrong otherwise?",
    "choices": [
      "Base models predict their own training rows — the meta-model learns to trust memorisation",
      "The folds become unbalanced",
      "The meta-model trains too slowly",
      "The base models can't be retrained",
      "Nothing — it's only a convention"
    ],
    "explain": "A base model predicting rows it trained on looks artificially brilliant (a deep forest is near-perfect on them). The meta-model then over-trusts it — and collapses in production where that brilliance evaporates. Out-of-fold predictions show the meta-model each base model's HONEST behaviour.",
    "simple": "The chairperson must judge advisors by predictions they made about cases they hadn't seen — otherwise the advisor with the best memory (not the best judgement) gets all the trust, and the committee fails its first real client. Same leakage story as ever, one level up.",
    "widget": {
      "type": "foldPick",
      "title": "Grading the advisors fairly",
      "world": "Two ways to build the meta-model's training data, each scored on validation and then on a sealed test set. Flick through what each construction promised — and delivered.",
      "blurb": "Same base models, same meta-learner — different construction:",
      "folds": [
        { "name": "in-sample preds · validation", "acc": 94 },
        { "name": "in-sample preds · sealed test", "acc": 82 },
        { "name": "out-of-fold preds · validation", "acc": 91 },
        { "name": "out-of-fold preds · sealed test", "acc": 90 }
      ],
      "knob": { "label": "Construction & scoring", "min": 1, "max": 5, "step": 1, "init": 1 },
      "insights": [
        { "max": 2, "text": "In-sample construction: dazzling validation, then a 12-point collapse on the sealed test. The meta-model learned to worship the forest's memorisation.", "tone": "warn" },
        { "max": 4, "text": "🤯 Out-of-fold construction: 91 then 90 — one point of slippage. Slightly humbler promises, kept almost exactly.", "tone": "wow" },
        { "max": 5, "text": "The rule generalises: any time a model's OUTPUT feeds another model's TRAINING, that output must be produced out-of-fold. Leakage climbs levels if you let it.", "tone": "info" }
      ],
      "extreme": { "at": 4 },
      "reveal": { "name": "Out-of-fold stacking", "formula": "cross_val_predict for level-0 outputs → train level-1 on those", "text": "sklearn's StackingClassifier does this internally — now you know what it's protecting you from, and why hand-rolled stacking so often 'mysteriously' disappoints." }
    }
  },
  {
    "q": "Your best single model scores 91.0%. A carefully stacked 8-model ensemble reaches 92.1%. When is that 1.1-point gain worth shipping — and when isn't it?",
    "choices": [
      "Worth it when errors are expensive or you're competing; rarely worth 8× the serving cost for a routine business dashboard",
      "Always — accuracy is the only criterion",
      "Never — stacking gains are statistical noise",
      "Only when the ensemble also trains faster",
      "Only for image data"
    ],
    "explain": "Stacking's point or two is decisive on a leaderboard (Kaggle podiums are stacked ensembles almost by law) and in high-stakes screening where each error costs real money. Against that: 8× inference cost and latency, 8 models to version, monitor and retrain, and a harder story to explain to a regulator. Production practice often keeps the stack as a benchmark and ships the single model — or distils the stack into one model.",
    "simple": "Hiring eight consultants instead of one made the report 1% better. In a world championship, 1% is the trophy. For the weekly sales forecast, it's eight invoices, eight schedules and eight people who can be off sick — for a rounding error. The question is never 'is it better?', it's 'what does each extra point cost, and what is a point worth HERE?'",
    "widget": {
      "type": "curveStatic",
      "title": "What does a point cost?",
      "world": "Growing a stack from 1 to 32 base models: validation accuracy against serving cost (relative to the single model). Watch which curve is flattening and which is exploding.",
      "xlab": "base models in the stack →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "1",
        "4",
        "8",
        "16",
        "32"
      ],
      "dec": 1,
      "yunit": "",
      "series": [
        { "name": "validation accuracy (%)", "ys": [ 91, 91.8, 92.1, 92.3, 92.4 ] },
        { "name": "serving cost (× single)", "ys": [ 1, 4, 8, 16, 32 ] }
      ],
      "knob": { "label": "Stack size", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "The first few diverse models buy the biggest chunk — +0.8 points for 4× cost. If stacking is ever worth it, it's worth it HERE.", "tone": "info" },
        { "max": 2, "text": "8 models: +1.1 points total. On a Kaggle leaderboard this is often the entire distance from rank 40 to rank 3.", "tone": "info" },
        { "max": 4, "text": "🤯 32 models: cost curve at 32×, accuracy curve nearly flat (+0.3 since 8). Diminishing returns meet exploding bills. Common industry ending: keep the stack as the benchmark, ship the single model — or distil the stack into one.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "When stacking earns its keep", "formula": "value of a point vs (serving cost + ops burden + opacity) × N", "text": "Competitions and high-stakes screening: stack. Routine production: single strong model, or knowledge-distil the ensemble into it." }
    }
  },
  {
    "q": "Blending and stacking both train a meta-model on base-model predictions. The difference is WHERE those predictions come from. What's the actual distinction?",
    "choices": [
      "Blending predicts on one held-out slice (simple, wastes that data); stacking uses out-of-fold predictions covering ALL rows (thorough, more work)",
      "Blending uses hard labels, stacking uses probabilities",
      "Stacking has no meta-model",
      "Blending only works with two base models",
      "They are two names for exactly the same procedure"
    ],
    "explain": "Blending: hold out, say, 15% of training data, fit base models on the rest, and train the meta-model on their predictions for that slice — one fit per base model, but the meta-model learns from only 15% of rows. Stacking: run K-fold CV, collect each row's prediction from the fold that didn't train on it, so the meta-model gets a leak-free prediction for EVERY row — at K× the fitting cost. Both exist to stop the meta-model learning from predictions a model made on its own training rows.",
    "simple": "Both need a clean exam to grade the base models on — grading them on questions they've already memorised (their own training rows) would crown the biggest memoriser. Blending sets aside one small exam: quick, but the judge only sees a few grades. Stacking rotates: everyone sits an exam on the part they never studied, so the judge gets a clean grade for every single question. Same principle, different thoroughness.",
    "widget": {
      "type": "curveStatic",
      "title": "One small exam vs a full rotation",
      "world": "Blending (15% holdout) vs stacking (5-fold out-of-fold) at growing dataset sizes. Watch where the gap is worth the extra fits — and where it stops mattering.",
      "xlab": "training rows →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "500",
        "2k",
        "10k",
        "50k",
        "200k"
      ],
      "dec": 1,
      "yunit": "%",
      "series": [
        { "name": "stacking (out-of-fold)", "ys": [ 88, 90, 91.2, 91.8, 92 ] },
        { "name": "blending (15% holdout)", "ys": [ 85, 88.5, 90.6, 91.6, 91.9 ] }
      ],
      "knob": { "label": "Dataset size", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "500 rows: blending's meta-model trains on 75 examples — it's guessing. Stacking's sees all 500. A 3-point gap from data efficiency alone.", "tone": "info" },
        { "max": 2, "text": "10k rows: the gap narrows to 0.6 — blending's slice is now big enough for a decent meta-model, and it cost one fit per base model instead of five.", "tone": "info" },
        { "max": 4, "text": "🤯 200k rows: 0.1 apart. The lesson generalises past ensembles: out-of-fold machinery earns its 5× cost when data is scarce, and a plain holdout does fine when data is abundant.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Blending vs stacking", "formula": "blending: one holdout slice · stacking: K-fold out-of-fold, every row covered", "text": "sklearn's StackingClassifier does the out-of-fold dance via cv=. Either way, the iron rule: the meta-model must never see a prediction made on that prediction's own training row." }
    }
  }
];
