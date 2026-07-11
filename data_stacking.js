/* Stacking & Voting — Parts I & II. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).stack1 = [
  {
    "q": "The simplest way to combine models is VOTING. What does a voting ensemble actually do?",
    "choices": [
      "Runs several models and picks the answer most of them agree on",
      "Runs several models and keeps only the most accurate one",
      "Trains one model on the outputs of the others",
      "Averages the training data before fitting a model",
      "Chains models so each corrects the previous one"
    ],
    "explain": "A voting ensemble asks several trained models the same question and combines their verdicts — majority label for 'hard' voting, or averaged probabilities for 'soft' voting. It's the most basic ensemble: no extra model, just a tally.",
    "simple": "It's a show of hands. Several finished models each cast a vote, and the crowd's answer wins. No new model is trained, nobody is chained to anyone — you just count. That plainness is the point: voting is the entry-level ensemble, and stacking is the smarter upgrade on top of it.",
    "widget": {
      "type": "curveStatic",
      "title": "The show of hands",
      "world": "Three models of similar accuracy, combined by voting. Watch the vote beat the members when they disagree in different places.",
      "xlab": "how differently the models err →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "identical",
        "",
        "somewhat",
        "",
        "very diverse"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "voting ensemble accuracy", "ys": [ 85, 87, 89, 90.5, 91.5 ] },
        { "name": "average single member", "ys": [ 85, 85, 85, 85, 85 ] }
      ],
      "knob": { "label": "Diversity of errors", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Identical models: the vote equals a single model (85%) — three copies of one opinion is still one opinion.", "tone": "info" },
        { "max": 2, "text": "As the members start making DIFFERENT mistakes, the majority covers each member's blind spots and the vote pulls ahead.", "tone": "info" },
        { "max": 4, "text": "🤯 Diverse members: 91.5% from a simple tally — no new model trained, just counting. Voting is the plain baseline; stacking learns HOW to weight the votes.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Voting ensemble", "formula": "combine several models: majority label (hard) or averaged probability (soft)", "text": "sklearn: VotingClassifier(voting='hard' or 'soft'). The simplest ensemble; stacking replaces the fixed tally with a learned combiner." }
    }
  },
  {
    "q": "Voting comes in 'hard' and 'soft' flavours. What's the difference?",
    "choices": [
      "Hard counts predicted labels; soft averages the predicted probabilities",
      "Hard uses trees; soft uses linear models",
      "Hard trains faster; soft is just its slower version",
      "Hard needs labels; soft works without any",
      "Hard is for two classes; soft is for many"
    ],
    "explain": "Hard voting tallies each model's final label and takes the majority. Soft voting averages the models' probability outputs and picks the highest — so a very confident model can outweigh two lukewarm ones. Soft usually wins when the probabilities are trustworthy.",
    "simple": "Hard voting is a raw show of hands: each model says one word — 'spam' or 'not' — and the majority wins. Soft voting listens to HOW SURE each model is and averages that confidence. Two mild 'probably not's can lose to one emphatic 'definitely yes'. Soft is smarter when the models' confidence is well-calibrated.",
    "widget": {
      "type": "curveStatic",
      "title": "Counting hands vs weighing confidence",
      "world": "One case: two models lean weakly one way, a third is very confident the other way. Watch where hard and soft voting disagree as the third model's confidence rises.",
      "xlab": "confident model's certainty →",
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
        { "name": "soft vote: averaged probability", "ys": [ 47, 50, 53, 57, 60 ] },
        { "name": "hard vote: share of labels", "ys": [ 33, 33, 33, 33, 33 ] }
      ],
      "knob": { "label": "Third model's certainty", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "The hard vote is stuck at 33% — it only counts labels, and it's outvoted 2-to-1 no matter how sure the third model gets.", "tone": "info" },
        { "max": 2, "text": "Soft voting crosses 50% as the confident model's certainty climbs: its emphatic vote outweighs two lukewarm ones.", "tone": "info" },
        { "max": 4, "text": "🤯 At 95% certainty they flatly disagree: soft says one class, hard says the other. Hard throws away confidence; soft uses it. Neither uses trees-vs-linear or two-vs-many classes — it's labels vs probabilities.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Hard vs soft voting", "formula": "hard: majority of labels · soft: argmax of averaged probabilities", "text": "Prefer soft voting when member probabilities are well-calibrated; hard voting when they're not to be trusted." }
    }
  },
  {
    "q": "Stacking trains a 'meta-model' on the base models' predictions. What job does the meta-model do?",
    "choices": [
      "Learns how much to trust each base model and combines them accordingly",
      "Retrains the weakest base model until it improves",
      "Averages the base models with equal fixed weights",
      "Picks the single base model with the best accuracy",
      "Splits the data so each base model sees a third"
    ],
    "explain": "Instead of a fixed tally, stacking adds a small second-level model that takes the base models' outputs as its inputs and learns the best way to combine them — effectively learning which model to trust, and when.",
    "simple": "The meta-model is a learned chairperson. Voting weights every member equally forever; the chairperson studies the members' track records and learns 'trust the forest here, the linear model there'. It doesn't retrain members or just pick the best one — it learns the smartest blend of all their opinions.",
    "widget": {
      "type": "curveStatic",
      "title": "A learned chairperson",
      "world": "Combining the same base models three ways: pick-the-best, equal-weight vote, and a learned meta-model. Scored on held-out accuracy.",
      "xlab": "combiner →",
      "xs": [
        0,
        1,
        2
      ],
      "labels": [
        "best single model",
        "equal-weight vote",
        "learned meta-model"
      ],
      "dec": 1,
      "yunit": "%",
      "series": [
        { "name": "ensemble accuracy", "ys": [ 88, 89.5, 91 ] }
      ],
      "knob": { "label": "Combiner", "min": 0, "max": 2, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Best single model: 88%. Throwing away the other members' views leaves accuracy on the table.", "tone": "info" },
        { "max": 1, "text": "Equal-weight vote: 89.5% — better, but it trusts a weak member exactly as much as a strong one.", "tone": "info" },
        { "max": 2, "text": "🤯 The learned meta-model: 91% — it discovered which base model to trust where, instead of weighting them all the same. That learned combining is what makes stacking more than voting.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Meta-model (stacking)", "formula": "second-level model: inputs = base models' predictions → learns the best blend", "text": "sklearn: StackingClassifier(estimators=[...], final_estimator=...). Keep the meta-model simple (often logistic regression) to avoid overfitting." }
    }
  },
  {
    "q": "Stacking has a trap: how you generate the base predictions the meta-model trains on. What's the golden rule?",
    "choices": [
      "Use out-of-fold predictions — each base model predicts rows it never trained on",
      "Let each base model predict its own training rows for speed",
      "Train the meta-model on the raw features instead",
      "Average the base predictions before the meta-model sees them",
      "Give the meta-model the true labels as an extra input"
    ],
    "explain": "If the meta-model learns from predictions a base model made on its OWN training rows, those predictions are unrealistically good and the meta-model learns to over-trust that model. Out-of-fold predictions (via cross-validation) give each row a prediction from a model that didn't see it — an honest picture.",
    "simple": "The meta-model must judge the base models on a fair exam, not on questions they memorised. If a base model 'predicts' rows it trained on, it looks like a genius, and the chairperson over-trusts it. Out-of-fold prediction rotates the data so every row is scored by a model that never saw it — the same honesty as a proper test set.",
    "widget": {
      "type": "curveStatic",
      "title": "Grade on unseen rows",
      "world": "The stack built two ways: base predictions from own-training rows (leaky) vs out-of-fold (honest). Reported score vs what it actually delivers.",
      "xlab": "how base predictions were made →",
      "xs": [
        0,
        1
      ],
      "labels": [
        "own training rows (leaky)",
        "out-of-fold (honest)"
      ],
      "dec": 1,
      "yunit": "%",
      "series": [
        { "name": "reported CV score", "ys": [ 95, 90 ] },
        { "name": "true deployment accuracy", "ys": [ 86, 90 ] }
      ],
      "knob": { "label": "Method", "min": 0, "max": 1, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Leaky method: reports a dazzling 95% but delivers 86% — the meta-model over-trusted base models that looked perfect on their own memorised rows.", "tone": "warn" },
        { "max": 1, "text": "🤯 Out-of-fold: reports 90% and DELIVERS 90%. Every base prediction came from a model that hadn't seen that row, so the chairperson's trust is calibrated honestly. The golden rule of stacking.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Out-of-fold predictions", "formula": "each row scored by a base model trained WITHOUT it (via cross-validation)", "text": "sklearn's StackingClassifier does this automatically via its cv argument. Never train a meta-model on a base model's in-sample predictions." }
    }
  },
  {
    "q": "An ensemble of five copies of the same model barely beats one copy. What single ingredient makes ensembles pay off?",
    "choices": [
      "Diversity — the members must make DIFFERENT mistakes for combining to help",
      "Depth — the members must each be as deep as possible",
      "Size — you simply need enough members, however alike",
      "Speed — the members must train quickly to be worth adding",
      "Accuracy — every member must already be near-perfect alone"
    ],
    "explain": "Combining only helps when members err in different places, so their mistakes cancel. Five identical models make identical mistakes — averaging changes nothing. Diversity (different algorithms, data samples, or features) is the fuel that makes voting and stacking work.",
    "simple": "Ask the same expert five times and you get the same answer, mistakes included. Ask five DIFFERENT experts and where one is blind another sees — now combining helps. That's the whole secret: an ensemble is only as good as its members' disagreements. Not depth, not sheer count, not speed — different mistakes.",
    "widget": {
      "type": "curveStatic",
      "title": "Different mistakes, not more members",
      "world": "Ensembles built from members of equal accuracy but varying diversity. Watch accuracy track how differently the members err — not how many there are.",
      "xlab": "member diversity →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "5 clones",
        "5 same-family",
        "3 families",
        "5 families",
        "6 diverse"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "ensemble accuracy", "ys": [ 85, 86, 90, 91, 91.5 ] },
        { "name": "how much members' errors overlap", "ys": [ 100, 78, 45, 40, 37 ] }
      ],
      "knob": { "label": "Diversity", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Five clones: error overlap 100%, accuracy 85% — identical members make identical mistakes, so combining is pointless.", "tone": "warn" },
        { "max": 2, "text": "Mixing model families drops the error overlap to 45% and lifts accuracy to 90% — now the members cover each other's blind spots.", "tone": "info" },
        { "max": 4, "text": "🤯 The accuracy curve mirrors the overlap curve upside down: gains come from lower error overlap, not more members. Recruit for disagreement — that's the ensemble's fuel.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Ensemble diversity", "formula": "gain ∝ member accuracy × (1 − error overlap)", "text": "Sources of diversity, strongest first: different model families > different features/data > different seeds. No diversity, no ensemble benefit." }
    }
  },
  {
    "q": "Stacking goes beyond averaging: a logistic regression, a forest and a boosted model each make predictions, and then… what happens?",
    "choices": [
      "A meta-model TRAINS on their predictions to learn the best combination",
      "Their probabilities are multiplied together and renormalised to sum to one",
      "The single most accurate base model is kept and the rest are discarded",
      "Each model is retrained on the residual errors of the one before it",
      "Their outputs are averaged with fixed equal weights into one final vote"
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
      "Soft voting counts the labels (class 0 wins 2-1); hard voting averages the probabilities, so A's 90% carries the vote to class 1",
      "Hard voting sums the stated confidences (class 0 leads 1.15 to 0.90); soft voting averages the same numbers and still lands on class 0",
      "Both average the probabilities, but soft voting first weights each member by its own validation accuracy, so model A dominates",
      "Hard voting sides with the single most confident member; soft voting needs a majority to agree before it will overturn the labels"
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
      "Different random seeds of one model — each seed explores a fresh region and decorrelates the errors enough to matter the most",
      "Training one strong model far longer — a lower-bias member is what contributes the most useful diversity to the committee vote",
      "Feeding every member the identical rows and features, so their disagreements isolate pure differences in modelling assumptions",
      "Adding many copies of the single best model — sheer member count drives the ensemble gain far more than any disagreement does"
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
      "The base models overlap on shared rows, so their prediction columns become almost perfectly correlated",
      "The meta-model ends up with far fewer training rows than the base models had, starving it of signal",
      "The fold splits skew the class balance, so the meta-model inherits a distorted prior over the labels",
      "In-sample predictions are noisier, so the meta-model underfits and trusts every base model equally"
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
      "Worth it whenever the measured cross-validation gain clears statistical significance, whatever the serving cost happens to be",
      "Worth it only once you have distilled the eight models down into a single fast student that fits the latency budget",
      "Worth it when latency is uncritical; otherwise the extra models add noise that quietly erases the accuracy gain",
      "Worth it for classification but not regression, where stacked gains rarely survive to the held-out test set"
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
      "Stacking predicts on one small held-out slice (fast but wasteful); blending rotates through K folds so every training row gets a leak-free prediction",
      "Blending averages the base predictions directly; stacking instead trains a meta-model on out-of-fold predictions gathered across all the rows",
      "Blending refits the base models on the full data first; stacking keeps each fold's base model frozen for the meta-step",
      "Blending combines at most two base models; stacking scales the very same holdout trick up to any number of diverse members"
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
