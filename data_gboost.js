/* Gradient Boosting & XGBoost — Parts I & II. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).gb1 = [
  {
    "q": "In gradient boosting, what happens during a single BOOSTING ROUND?",
    "choices": [
      "Measure the current errors, fit a small tree to them, then add it on",
      "Retrain every existing tree at once on the full original set of labels",
      "Average all current trees and discard the least accurate member so far",
      "Re-split the data into fresh folds and rerun cross-validation entirely",
      "Lower the learning rate slightly and reshuffle every single training row"
    ],
    "explain": "A boosting round is one iteration of the core loop: compute the residuals (the ensemble's current errors), fit a fresh weak learner to those leftovers, and add its shrunken prediction to the running total. Hundreds of these rounds stack tiny corrections into a strong model. It is not a retrain-everything step -- earlier trees are frozen the moment they are added.",
    "simple": "Think of one round as a single editing pass over a draft. You look at what's still wrong, write one small fix aimed only at those mistakes, and staple it onto the growing stack. Do that pass hundreds of times and a pile of tiny fixes becomes a polished result -- but you never rewrite the earlier passes.",
    "widget": {
      "type": "curveStatic",
      "title": "One round, one small fix",
      "world": "Each boosting round measures the leftover error, fits one small tree to it, and adds it on. Watch the error shrink round by round.",
      "xlab": "boosting rounds →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "0",
        "10",
        "30",
        "80",
        "200"
      ],
      "dec": 2,
      "yunit": "",
      "series": [
        { "name": "remaining error", "ys": [ 1, 0.55, 0.3, 0.14, 0.06 ] },
        { "name": "training accuracy (%)", "ys": [ 50, 76, 85, 92, 96 ] }
      ],
      "knob": { "label": "Rounds", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Round 0: nothing added yet, so the whole error is still on the table. The first round's small tree will attack the biggest leftovers.", "tone": "info" },
        { "max": 3, "text": "By round 30 each pass has trimmed a bit more: measure errors, fit a small tree, add it. That single loop, repeated, is all boosting does.", "tone": "info" },
        { "max": 4, "text": "🤯 After 200 rounds the leftover error is nearly gone -- hundreds of tiny per-round fixes have compounded into a strong model, every earlier tree left untouched.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Boosting round", "formula": "one round = measure errors → fit small tree → add scaled tree", "text": "Boosting is just this cycle repeated hundreds of times; early stopping decides how many rounds to keep." }
    }
  },
  {
    "q": "Boosting builds a 'weak learner' at each step. What does WEAK actually mean here?",
    "choices": [
      "A deliberately small model, like a shallow tree, only a bit better than guessing",
      "The most accurate model available, trained briefly",
      "A model trained on only the weakest features",
      "A model with its predictions scaled down by half",
      "A deep tree that is later pruned back hard"
    ],
    "explain": "A weak learner is intentionally low-capacity — typically a tree of depth 3–6 — just strong enough to capture a little signal. Boosting's power comes from adding many such small corrections in sequence, not from any single member being good.",
    "simple": "Weak means small on purpose. Each member is a stumpy little tree that alone barely beats a coin flip. The magic isn't in one member — it's in stacking hundreds of tiny corrections, each cleaning up what the last got wrong. Give boosting a strong deep tree instead and it overfits almost instantly.",
    "widget": {
      "type": "curveStatic",
      "title": "Small members, big ensemble",
      "world": "Boosted ensembles built from trees of different depth. Watch validation accuracy: the weak (shallow) learners win; the strong (deep) ones overfit.",
      "xlab": "depth of each member →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "1",
        "3",
        "6",
        "12",
        "20"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "boosted validation accuracy", "ys": [ 89, 92, 91, 86, 82 ] },
        { "name": "single member's own accuracy", "ys": [ 62, 74, 83, 92, 97 ] }
      ],
      "knob": { "label": "Member depth", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Depth-1 stumps barely beat guessing alone (62%) — yet boosted, they reach 89%. Weakness of the member is not weakness of the ensemble.", "tone": "info" },
        { "max": 2, "text": "Depth 3: the boosted sweet spot (92%). Each member captures a little, leaving honest work for the next round.", "tone": "info" },
        { "max": 4, "text": "🤯 Depth-20 members are strong alone (97%) but boosted they overfit to 82% — one greedy member memorises the noise, and the rest chase phantoms. Boosting NEEDS weak learners.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Weak learner", "formula": "small model, slightly better than chance · boosting sums many of them", "text": "In gradient boosting the weak learner is almost always a shallow tree (max_depth 3–6). Many small corrections beat one greedy fit." }
    }
  },
  {
    "q": "Gradient boosting trains its trees on the RESIDUALS. What is a residual, in plain terms?",
    "choices": [
      "The leftover error: how far the current prediction is from the truth",
      "The average prediction across all trees so far",
      "The slice of data held back for validation",
      "The confidence the model assigns to each guess",
      "The importance score of the most-used feature"
    ],
    "explain": "A residual is actual minus predicted — what the ensemble still gets wrong at this point. Each new tree is fitted to those leftovers, so it targets exactly the mistakes remaining, and adding it shrinks the error a little more.",
    "simple": "It's the gap between the right answer and the model's current guess. Boosting reads that gap and trains the next tree to close it. Round after round, the tree keeps aiming at whatever's still wrong — like an editor who only marks the remaining typos each pass. The residual is the to-do list.",
    "widget": {
      "type": "curveStatic",
      "title": "Chasing the leftovers",
      "world": "The ensemble's total error and the size of the residuals it's still chasing, round by round. Each tree fits the current leftovers.",
      "xlab": "boosting rounds →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "0",
        "5",
        "20",
        "60",
        "150"
      ],
      "dec": 2,
      "yunit": "",
      "series": [
        { "name": "average residual (leftover error)", "ys": [ 1, 0.62, 0.34, 0.16, 0.07 ] },
        { "name": "training accuracy", "ys": [ 50, 74, 86, 92, 96 ] }
      ],
      "knob": { "label": "Rounds", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Round 0: the residuals are the whole error — nothing's been corrected yet. This is the to-do list the first tree will attack.", "tone": "info" },
        { "max": 2, "text": "By round 20 the leftovers have halved: each tree fitted the current residuals, so the pile of remaining mistakes keeps shrinking.", "tone": "info" },
        { "max": 4, "text": "🤯 Residuals near zero: almost nothing left to correct. Fitting the LEFTOVERS (not the average, not the confidence) is the whole engine of gradient boosting.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Residual", "formula": "residual = actual − predicted · each new tree is fitted to it", "text": "In gradient boosting the residual is the (negative) gradient of the loss. Fit it, add a shrunken version, repeat." }
    }
  },
  {
    "q": "Bagging (forests) and boosting both combine trees. What is the ONE structural difference between them?",
    "choices": [
      "Boosting builds trees in sequence, each fixing the last; bagging builds them independently, in parallel",
      "Boosting uses deeper trees than bagging always does",
      "Boosting averages votes while bagging takes a majority",
      "Boosting needs labels while bagging does not",
      "Boosting works only for regression, bagging for classification"
    ],
    "explain": "Bagging trains many trees independently on random samples and averages them (attacking variance). Boosting trains trees one after another, each fitted to the previous ensemble's errors (attacking bias). Parallel-and-average vs sequential-and-correct is the core split.",
    "simple": "Bagging is a committee that all vote at once, never talking to each other — then you average. Boosting is a relay: each runner starts where the last stumbled, fixing the handed-over mistakes. Independent-and-averaged versus sequential-and-corrective. That single difference explains why forests are sturdy and boosting is sharp.",
    "widget": {
      "type": "curveStatic",
      "title": "Committee vs relay",
      "world": "The two ensembles scored on how they build and what they cure. Slide across the properties: they differ on exactly one axis of construction.",
      "xlab": "property →",
      "xs": [
        0,
        1,
        2,
        3
      ],
      "labels": [
        "how members build",
        "what it reduces",
        "safe to add more",
        "tuning needed"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "bagging / forest (0=indep,parallel...)", "ys": [ 0, 20, 95, 20 ] },
        { "name": "boosting (100=sequential...)", "ys": [ 100, 90, 40, 85 ] }
      ],
      "knob": { "label": "Property", "min": 0, "max": 3, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "How members build: bagging trains all trees at once, independently; boosting trains them one at a time, each depending on the last. This is THE structural difference.", "tone": "info" },
        { "max": 1, "text": "What each reduces: bagging averages away variance; boosting corrects away bias. Different diseases, different cures.", "tone": "info" },
        { "max": 3, "text": "🤯 Consequences follow from the one difference: more forest trees are always safe (parallel average), more boosting rounds eventually overfit (sequential chase), and boosting needs more careful tuning.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Bagging vs boosting", "formula": "bagging: parallel, independent, averages (↓variance) · boosting: sequential, corrective (↓bias)", "text": "Forests = bagging. XGBoost/LightGBM = boosting. Start with a forest for robustness; reach for tuned boosting when you need the extra accuracy." }
    }
  },
  {
    "q": "The learning rate in gradient boosting is set to 0.1. What does that small number do?",
    "choices": [
      "Shrinks each tree's correction so the ensemble improves in small, careful steps",
      "Drops 10% of the training rows from each tree",
      "Keeps only the 10% most important features",
      "Stops training once accuracy reaches 10% error",
      "Scales the final prediction down to a tenth"
    ],
    "explain": "The learning rate multiplies each new tree's contribution before adding it. Small steps (0.1) mean no single tree can dominate, so the ensemble corrects gradually and generalises better — at the cost of needing more rounds to get there.",
    "simple": "It's how big a bite of each correction you actually swallow. At 0.1 you take only a tenth of what each tree suggests, so you edge toward the answer carefully instead of lurching. Careful steps generalise better but need more of them — the classic trade of learning rate against number of trees.",
    "widget": {
      "type": "curveStatic",
      "title": "Small steps, steadier landing",
      "world": "The same problem boosted at different learning rates (rounds tuned for each). Watch how validation accuracy and overfitting risk trade off.",
      "xlab": "learning rate →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "0.01",
        "0.05",
        "0.1",
        "0.5",
        "1.0"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "best validation accuracy", "ys": [ 91, 92, 92, 89, 85 ] },
        { "name": "rounds needed (÷20)", "ys": [ 100, 40, 20, 6, 3 ] }
      ],
      "knob": { "label": "Learning rate", "min": 0, "max": 4, "step": 1, "init": 2 },
      "insights": [
        { "max": 1, "text": "Tiny rates (0.01) reach great accuracy but need thousands of rounds — careful to a fault, and slow.", "tone": "info" },
        { "max": 2, "text": "0.1: the common default — small enough to generalise well, not so small it never finishes. Note it doesn't drop rows or features; it scales corrections.", "tone": "info" },
        { "max": 4, "text": "🤯 Rate 1.0 takes each tree's full correction and lurches, overfitting to 85%. Smaller steps + more trees beats bigger steps + fewer. That's the learning-rate trade.", "tone": "wow" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Learning rate (shrinkage)", "formula": "add learning_rate × tree · smaller = steadier but more rounds", "text": "Typical values 0.01–0.1, paired with early stopping to choose the round count. Lower rate + more trees is the usual quality recipe." }
    }
  },
  {
    "q": "Unlike adding trees to a forest, adding boosting rounds CAN overfit. How do you pick when to stop?",
    "choices": [
      "Watch a validation score each round and stop when it stops improving — early stopping",
      "Always stop at exactly 100 rounds",
      "Stop when training accuracy reaches 100%",
      "Add rounds until the learning rate reaches zero",
      "Stop when every tree has the same depth"
    ],
    "explain": "Because each round chases the current residuals, late rounds start fitting noise — validation error falls, bottoms out, then rises. Early stopping monitors a held-out score every round and halts at the bottom, choosing the number of trees automatically and honestly.",
    "simple": "Boosting keeps sharpening, and past a point it sharpens into the noise. So you watch its score on held-back data round by round: while that keeps improving, keep going; when it stalls and starts slipping, stop. That 'stop at the bottom' rule — early stopping — picks the tree count for you, using evidence instead of a guess.",
    "widget": {
      "type": "curveStatic",
      "title": "Stop at the bottom",
      "world": "Training and validation error across boosting rounds. Training keeps falling forever; validation bottoms out then climbs — early stopping catches the turn.",
      "xlab": "boosting rounds →",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "labels": [
        "20",
        "80",
        "180",
        "300",
        "500",
        "900"
      ],
      "dec": 1,
      "yunit": "%",
      "series": [
        { "name": "validation error", "ys": [ 16, 13, 12.4, 13, 14.2, 16.5 ] },
        { "name": "training error", "ys": [ 14, 9, 5, 2.5, 1, 0.3 ] }
      ],
      "knob": { "label": "Rounds", "min": 0, "max": 5, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Early rounds: both errors fall together — genuine learning, keep going.", "tone": "info" },
        { "max": 2, "text": "Around round 180 validation bottoms out at 12.4%. This is where early stopping halts — the honest best number of trees.", "tone": "info" },
        { "max": 5, "text": "🤯 Past the bottom, training error keeps dropping toward zero while validation CLIMBS — the extra rounds are memorising noise. Early stopping (not a fixed 100, not training=100%) is how you avoid it.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Early stopping", "formula": "monitor validation each round · halt when it stops improving", "text": "XGBoost/LightGBM: early_stopping_rounds with an eval_set. It chooses n_estimators for you, using held-out evidence." }
    }
  },
  {
    "q": "Boosting also builds many models — but sequentially, not in parallel. What does each new member train to do?",
    "choices": [
      "Fix the mistakes the ensemble is still making",
      "Fit a fresh independent bootstrap sample",
      "Reweight the input features by their importance",
      "Average the predictions of prior members",
      "Predict the ensemble's confidence scores"
    ],
    "explain": "After each round, boosting looks at what the current ensemble still gets wrong and trains the next weak learner to target exactly those errors. Members are specialists in their predecessors' failures.",
    "simple": "Bagging hires many independent generalists. Boosting hires a chain of specialists: the first does its best, the second studies ONLY what the first got wrong, the third mops up what's still wrong, and so on. The team is built mistake by mistake.",
    "widget": {
      "type": "boostFit",
      "title": "The chain of specialists",
      "world": "Live gradient boosting on house prices: each round fits a tiny stump to the CURRENT errors (red stalks) and adds it to the team. Start at zero rounds and build the ensemble yourself.",
      "xlab": "house size",
      "itemName": "sales",
      "yunit": "£k",
      "lr": 0.6,
      "maxRounds": 12,
      "points": [
        { "x": 0.6, "y": 118 },
        { "x": 1.4, "y": 127 },
        { "x": 2.2, "y": 140 },
        { "x": 3, "y": 152 },
        { "x": 3.8, "y": 158 },
        { "x": 4.6, "y": 175 },
        { "x": 5.4, "y": 198 },
        { "x": 6.2, "y": 204 },
        { "x": 7, "y": 222 },
        { "x": 7.8, "y": 236 },
        { "x": 8.6, "y": 248 },
        { "x": 9.4, "y": 262 }
      ],
      "knob": { "label": "Boosting rounds", "min": 0, "max": 12, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Round zero: the ensemble is just the average — one flat guess. Look at the red error stalks: they're the next round's ENTIRE curriculum.", "tone": "info" },
        { "max": 9, "text": "Each round adds one crude step exactly where the errors were largest. Watch the stalks shrink where the last stump landed.", "tone": "info" },
        { "max": 12, "text": "🤯 A dozen crude stumps — each useless alone — have assembled into a smooth, accurate curve. Weak learners, chained through their errors, compound into a strong one.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Boosting", "formula": "F_new = F_old + η · (weak learner fitted to current errors)", "text": "Sequential error-chasing. Where bagging attacks variance with independence, boosting attacks bias with accumulation." }
    }
  },
  {
    "q": "Bagging and boosting both combine many trees, yet they cure opposite diseases. Which pairing is right?",
    "choices": [
      "Bagging fights variance (instability); boosting fights bias (weakness)",
      "Bagging fights bias (weakness); boosting fights variance (instability)",
      "Both cut variance by averaging independent bootstrap fits",
      "Both cut bias by stacking many progressively deeper trees",
      "Neither changes bias or variance, only the training speed"
    ],
    "explain": "Bagging averages many overfit (high-variance) models into stability. Boosting stacks many underfit (high-bias) weak learners into strength. Same ingredient — trees — pointed at opposite failure modes.",
    "simple": "Bagging calms down experts who are too excitable: deep trees, averaged. Boosting builds up helpers who are too simple: stumps, accumulated. One removes wobble, the other removes weakness — remember which by what the members look like: deep for bagging, shallow for boosting.",
    "widget": {
      "type": "curveStatic",
      "title": "Opposite medicines",
      "world": "Validation accuracy as members join. Bagging starts from strong-but-jumpy deep trees; boosting starts from one pathetic stump. Watch the two growth stories.",
      "xlab": "ensemble size",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "labels": [
        "1",
        "5",
        "10",
        "25",
        "50",
        "100"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "boosting (stumps)", "ys": [ 62, 74, 80, 86, 89, 90 ] },
        { "name": "bagging (deep trees)", "ys": [ 79, 84, 86, 87, 87.5, 87.5 ] }
      ],
      "knob": { "label": "Ensemble size", "min": 0, "max": 5, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "One member each: the deep tree (79%) crushes the lone stump (62%). Bagging starts strong; boosting starts embarrassing.", "tone": "info" },
        { "max": 3, "text": "Boosting climbs relentlessly — each stump repairs the last one's bias. Bagging plateaus once the wobble is averaged out: variance can only be removed once.", "tone": "info" },
        { "max": 5, "text": "🤯 Boosting overtakes and keeps going: accumulated corrections can reduce bias indefinitely (until they start fitting noise). Different diseases, different medicines, different growth curves.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Bagging vs boosting", "formula": "bagging: parallel + deep trees → less variance · boosting: sequential + weak learners → less bias", "text": "The two pillars of tree ensembling. Diagnose your model's disease first — wobbly or weak? — and the right ensemble follows." }
    }
  },
  {
    "q": "In GRADIENT boosting specifically, what does each new tree get fitted to?",
    "choices": [
      "The residuals — the gradient of the loss at current predictions",
      "A bootstrap resample drawn from the training labels",
      "The original labels, with the hardest misclassified cases upweighted",
      "The previous tree's leaf structure and split thresholds",
      "The features ranked by their split-gain importance"
    ],
    "explain": "For squared error, the loss gradient at each point IS the residual (actual − predicted). Fitting the next tree to residuals is doing gradient descent — in function space, one tree-shaped step at a time.",
    "simple": "After each round, compute how far off you still are on every example — those leftover gaps are the residuals. The next tree's training targets ARE those gaps. Prediction by instalments: each tree pays off a bit more of the remaining debt.",
    "widget": {
      "type": "boostFit",
      "title": "Paying off the residuals",
      "world": "Delivery times vs distance. The red stalks are the residuals — the debt still owed on each point. Add rounds and watch the debt get paid down, largest bills first.",
      "xlab": "delivery distance",
      "itemName": "deliveries",
      "yunit": "min",
      "lr": 0.5,
      "maxRounds": 12,
      "points": [
        { "x": 0.8, "y": 12 },
        { "x": 1.6, "y": 15 },
        { "x": 2.4, "y": 14 },
        { "x": 3.2, "y": 19 },
        { "x": 4, "y": 23 },
        { "x": 4.8, "y": 26 },
        { "x": 5.6, "y": 24 },
        { "x": 6.4, "y": 31 },
        { "x": 7.2, "y": 34 },
        { "x": 8, "y": 33 },
        { "x": 8.8, "y": 39 },
        { "x": 9.6, "y": 42 }
      ],
      "knob": { "label": "Boosting rounds", "min": 0, "max": 12, "step": 1, "init": 0 },
      "insights": [
        { "max": 2, "text": "The first rounds attack the biggest residuals — the far-right deliveries the flat average missed by 20 minutes.", "tone": "info" },
        { "max": 6, "text": "Each round: measure the leftover errors, fit a stump TO them, add it on. That loop, verbatim, is the algorithm.", "tone": "info" },
        { "max": 12, "text": "🤯 'Fit to residuals' is literally gradient descent where each step is a tree — hence GRADIENT boosting. Swap the loss and the same machinery does classification, ranking, quantiles…", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Gradient boosting", "formula": "residuals = −∂loss/∂prediction → next tree fits them → F += η·tree", "text": "The reigning champion family for tabular data. Everything XGBoost/LightGBM/CatBoost do is this loop, industrialised." }
    }
  },
  {
    "q": "Gradient boosting's learning rate is set to 0.1 instead of 1.0, so each tree's correction counts only a tenth. Why would anyone slow learning down on purpose?",
    "choices": [
      "Small steps + more trees generalise better than big confident jumps",
      "Shrinking each step lets far fewer total trees suffice",
      "It forces every tree to remain a single-split stump learner",
      "It makes each boosting round train dramatically faster",
      "It guarantees the validation curve can never bend back upward again"
    ],
    "explain": "Full-strength corrections chase each round's residuals — including their noise — aggressively. Shrunken steps force many trees to agree on a direction before the ensemble commits: regularisation via patience.",
    "simple": "Correcting mistakes at full force means over-correcting the noisy ones. Taking 10%-sized steps means a mistake only really gets fixed if round after round keeps voting to fix it. Slower, humbler — and reliably better on new data.",
    "widget": {
      "type": "curveStatic",
      "title": "The patient learner",
      "world": "Two boosting runs on the same data: learning rate 1.0 and 0.1. Validation accuracy per round. One sprints, one strolls — check who ends up ahead.",
      "xlab": "boosting rounds",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "labels": [
        "10",
        "25",
        "50",
        "100",
        "250",
        "500"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "learning rate 0.1", "ys": [ 74, 80, 85, 88, 90, 90.5 ] },
        { "name": "learning rate 1.0", "ys": [ 84, 87, 88, 86, 83, 81 ] }
      ],
      "knob": { "label": "Rounds", "min": 0, "max": 5, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Early rounds: the sprinter (1.0) is way ahead. Impatient corrections DO fix real errors first.", "tone": "info" },
        { "max": 3, "text": "The sprinter peaks and turns down — it's now confidently fitting noise. The stroller keeps climbing past it.", "tone": "warn" },
        { "max": 5, "text": "🤯 Final: 90.5% vs 81%. The classic recipe: small learning rate, many trees, early stopping to pick the round. Patience, mathematically enforced.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Shrinkage (learning rate)", "formula": "F += η·tree with η ≈ 0.01–0.1 · pair with n_estimators and early stopping", "text": "The most important knob in gradient boosting. Lower η almost always helps — you just pay for it in trees." }
    }
  },
  {
    "q": "Boosting keeps adding trees, and after round 180 validation accuracy starts sliding while training accuracy still climbs. What's the standard response?",
    "choices": [
      "Early stopping — keep the round where validation peaked",
      "Raise the learning rate so training finishes sooner",
      "Grow progressively deeper trees so later rounds still help",
      "Raise the per-tree subsample rate for fresh variety",
      "Discard the validation set and train on everything"
    ],
    "explain": "Boosting reduces bias indefinitely — eventually the only 'errors' left to fix are noise. Monitoring a validation set and stopping (or rolling back to) its best round is the built-in cure.",
    "simple": "The specialist chain eventually runs out of real mistakes and starts 'fixing' the data's random quirks. The honest curve tells you when: it stops improving. Freeze the team at that round — every tree after it is actively making the model worse.",
    "widget": {
      "type": "curveStatic",
      "title": "When the specialists run out of real work",
      "world": "Training and validation accuracy across boosting rounds. Find the round you'd freeze the ensemble at — and see what 300 more rounds of 'progress' would cost.",
      "xlab": "boosting rounds",
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
        "25",
        "50",
        "100",
        "180",
        "250",
        "350",
        "500"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "training accuracy", "ys": [ 82, 87, 92, 96, 98, 99, 100 ] },
        { "name": "validation accuracy", "ys": [ 80, 84, 88, 89, 87.5, 85, 83 ] }
      ],
      "knob": { "label": "Rounds", "min": 0, "max": 6, "step": 1, "init": 0 },
      "insights": [
        { "max": 2, "text": "Both curves climbing: the specialists are still fixing real, generalisable mistakes. Keep going.", "tone": "info" },
        { "max": 3, "text": "Round ~180: validation peaks at 89%. Checkpoint here. The remaining training errors are mostly noise wearing error costumes.", "tone": "info" },
        { "max": 6, "text": "🤯 Round 500: training 100%, validation down 6 points. Boosting WILL overfit if you let it run — unlike bagging, more members isn't automatically safe. Early stopping is non-negotiable.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Early stopping in boosting", "formula": "monitor validation each round → stop after no improvement for N rounds", "text": "Bagging saturates harmlessly; boosting overshoots. That asymmetry is why every boosting library ships early stopping as a first-class feature." }
    }
  }
];

(window.QUESTIONS = window.QUESTIONS || {}).gb2 = [
  {
    "q": "XGBoost took gradient boosting and made it the competition-winning standard. Which additions are its signature?",
    "choices": [
      "Regularisation inside the tree-building, plus clever engineering (histograms, parallelism, missing-value handling)",
      "Averaging many fully independent deep trees, built with bootstrap row and column sampling exactly like a random forest",
      "Replacing the shallow decision trees with small neural networks fitted to residuals each round",
      "Fixing every tree at depth exactly six and dropping the learning rate to converge much faster",
      "Relying only on first-order gradients with one global line search shared across all the leaves"
    ],
    "explain": "XGBoost penalises tree complexity (leaf count, leaf weights) inside the split objective itself, uses second-order gradients, and adds serious engineering: histogram splits, per-tree parallelism, native missing-value routing, column subsampling.",
    "simple": "XGBoost is gradient boosting with discipline and a race engine: every new leaf must EARN its place against a built-in complexity tax (so trees stay honest), and the whole thing is engineered to train fast on big data. Same idea as before — industrial grade.",
    "widget": {
      "type": "curveStatic",
      "title": "The complexity tax at work",
      "world": "Plain gradient boosting vs regularised (XGBoost-style) boosting, validation accuracy per round. Same data, same learning rate — one has the tax, one doesn't.",
      "xlab": "boosting rounds",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "labels": [
        "50",
        "100",
        "200",
        "300",
        "400",
        "500"
      ],
      "dec": 1,
      "yunit": "%",
      "series": [
        { "name": "regularised (XGBoost-style)", "ys": [ 85, 88, 90, 90.5, 90.5, 90.3 ] },
        { "name": "plain gradient boosting", "ys": [ 85.5, 88, 89, 88, 86.5, 85 ] }
      ],
      "knob": { "label": "Rounds", "min": 0, "max": 5, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Early on the two are neck-and-neck — regularisation costs almost nothing while there are real errors to fix.", "tone": "info" },
        { "max": 3, "text": "Past round 200 the plain version starts fitting noise; the taxed version declines to build leaves that don't pay for themselves and holds its peak.", "tone": "info" },
        { "max": 5, "text": "🤯 The tax makes overfitting SLOWER and shallower — more forgiving to tune, on top of being faster to train. That combination, not magic, is why XGBoost kept winning Kaggle.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "XGBoost's contributions", "formula": "objective = loss + γ·(leaves) + λ·Σ(leaf weights²), 2nd-order gradients, histogram splits", "text": "Regularised boosting + relentless engineering. LightGBM and CatBoost iterate on the same blueprint — learn one, you can operate all three." }
    }
  },
  {
    "q": "On 10 million rows, XGBoost-family libraries find splits dramatically faster than classic exact search. What's the core speed trick?",
    "choices": [
      "Bucket feature values into histograms and test bucket edges, not every value",
      "Presort each feature column once and reuse that stored ordering for every split",
      "Evaluate candidate splits on a random one-percent subsample of rows",
      "Cache each fully grown tree so that later rounds reuse its splits",
      "Test only the one feature with the highest gain from last round"
    ],
    "explain": "Exact split-finding sorts and scans every unique value of every feature. Histogram methods bin values into ~256 buckets and only test bucket boundaries — hundreds of candidates instead of millions, at negligible accuracy cost.",
    "simple": "To find where to cut a line of 10 million people by height, you don't compare every neighbouring pair — you sort them into 256 height buckets and test the bucket edges. Vastly fewer candidate cuts, near-identical final choice.",
    "widget": {
      "type": "curveStatic",
      "title": "Buckets beat brute force",
      "world": "Time to train 100 trees, exact splits vs histogram splits, as rows grow. Both produce near-identical accuracy — the bill is the story.",
      "xlab": "training rows",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "100k",
        "500k",
        "1M",
        "5M",
        "10M"
      ],
      "dec": 0,
      "yunit": " min",
      "series": [
        { "name": "exact split search", "ys": [ 4, 22, 48, 260, 560 ] },
        { "name": "histogram splits", "ys": [ 1, 3, 6, 28, 55 ] }
      ],
      "knob": { "label": "Rows", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Small data: both fine. The exact method's cost grows with UNIQUE VALUES; the histogram's grows with buckets — a constant.", "tone": "info" },
        { "max": 3, "text": "At 5M rows: 260 minutes vs 28. Same trees, near enough — the histogram trades invisible precision for a 10× bill cut.", "tone": "info" },
        { "max": 4, "text": "🤯 At 10M rows the exact method needs 9+ hours; histograms do it in under an hour, and parallelise beautifully. Engineering IS part of the algorithm at scale.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Histogram-based split finding", "formula": "bin each feature into ~256 buckets → test bucket edges only", "text": "The trick that makes LightGBM/XGBoost-hist feasible on huge tabular data — plus column subsampling and native missing-value routing for the full toolkit." }
    }
  },
  {
    "q": "Stochastic gradient boosting sets subsample=0.7, so each tree trains on a random 70% of rows. Why would deliberately showing each tree LESS data help?",
    "choices": [
      "The randomness decorrelates successive trees and acts as a regulariser — validation usually peaks below subsample=1.0",
      "It is purely a speed optimisation and leaves validation accuracy essentially unchanged from the full-data baseline run",
      "It guarantees that every training row is seen by exactly one tree, so no single example repeats",
      "It forces each tree to stay strictly binary rather than growing arbitrary multi-way splits per node",
      "It removes the need for a learning rate, since the sampling already shrinks each correction on its own"
    ],
    "explain": "With subsample=1 every round stares at the exact same residuals and can grind into noise deterministically. Sampling rows (and columns — colsample in XGBoost) makes each corrector see a slightly different picture, which stops the relay fixating on individual noisy points. It's bagging's randomness grafted onto boosting — plus it trains faster.",
    "simple": "A relay of perfectionists studying the same error report will eventually start 'fixing' typos in it — memorising noise. Give each runner a different random 70% of the report and no single noisy point gets obsessed over, because most runners never even see it. The genuine patterns appear in every sample, so they still get fixed.",
    "widget": {
      "type": "curveStatic",
      "title": "Show each corrector less, learn more",
      "world": "The same boosted model at five subsample rates. Watch validation accuracy and the train-validation gap (memorisation) move in opposite directions.",
      "xlab": "subsample (share of rows per tree) →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "0.3",
        "0.5",
        "0.7",
        "0.85",
        "1.0"
      ],
      "dec": 1,
      "yunit": "",
      "series": [
        { "name": "validation accuracy (%)", "ys": [ 88.5, 90, 91, 90.6, 89.5 ] },
        { "name": "train − val gap (pts)", "ys": [ 3, 4, 5, 7, 10 ] }
      ],
      "knob": { "label": "subsample", "min": 0, "max": 4, "step": 1, "init": 4 },
      "insights": [
        { "max": 0, "text": "0.3: each tree sees so little that corrections turn noisy-in-a-bad-way — the relay is passing rumours.", "tone": "warn" },
        { "max": 2, "text": "0.7: the sweet spot in this run — every real pattern still shows up in every sample, but no single noisy row appears often enough to be memorised.", "tone": "info" },
        { "max": 4, "text": "🤯 1.0 (no sampling): the gap doubles to 10 points. Determinism let the relay grind into the training set's noise. The fix wasn't more data or fewer rounds — it was showing each tree LESS.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Stochastic gradient boosting", "formula": "subsample rows (and colsample features) per tree → decorrelated correctors", "text": "Friedman's 1999 addition. In XGBoost/LightGBM: subsample & colsample_bytree, typically 0.6–0.9. Regularisation and a speed-up in one knob." }
    }
  },
  {
    "q": "Boosting libraries default to shallow trees — depth 3 to 6 — while a random forest happily grows its trees deep. Why does boosting specifically want WEAK learners?",
    "choices": [
      "Each round only needs a small corrective step; deep trees make each round too greedy and the relay overfits fast",
      "Shallow trees are the only tree shape whose leaf outputs can legitimately be summed across rounds",
      "Deep trees make it impossible to compute residual gradients, so boosting silently fails to converge",
      "It is purely a memory-saving constraint on very large datasets, with essentially no effect on the final accuracy",
      "Shallow trees fit the loss gradient exactly, while deep trees only approximate it per round"
    ],
    "explain": "Boosting's power comes from MANY small corrections compounding — bias falls round by round. A depth-16 tree can nearly memorise the residuals in one round, so there's nothing honest left for later rounds except noise. Forests are the opposite: each deep tree is a full low-bias model, and averaging attacks their variance. Depth 3–6 also caps feature-interaction order, a sensible prior for tabular data.",
    "simple": "Boosting is sculpting: a hundred light chisel taps, each fixing what the last left wrong. Swap the chisel for a sledgehammer (a deep tree) and the first swing does 'everything' — including smashing detail into the noise — and the remaining 99 swings just chase rubble. The forest is a different sport entirely: many finished sculptures, averaged.",
    "widget": {
      "type": "curveStatic",
      "title": "Chisels beat sledgehammers, in relays",
      "world": "Boosted ensembles built from trees of five different depths (rounds tuned fairly for each). Compare validation accuracy with how quickly training accuracy saturates.",
      "xlab": "depth of each boosted tree →",
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
        "4",
        "8",
        "16"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "validation accuracy", "ys": [ 89, 91, 92, 88, 84 ] },
        { "name": "training accuracy", "ys": [ 91, 94, 97, 99.5, 100 ] }
      ],
      "knob": { "label": "Tree depth", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Depth-1 stumps: even the weakest learner boosts to 89% — compounding tiny corrections is the engine, not tree strength.", "tone": "info" },
        { "max": 2, "text": "Depth 4: the peak. Each tree can capture small feature interactions, yet still leaves honest work for later rounds.", "tone": "info" },
        { "max": 4, "text": "🤯 Depth 16: training hits 100% almost immediately — round one memorised the residuals, and every later round modelled noise. Boosting NEEDS its learners weak; that's not a limitation, it's the design.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Weak learners (max_depth 3–6)", "formula": "many small low-variance corrections > one greedy fit", "text": "XGBoost defaults to max_depth=6, LightGBM caps leaves instead (num_leaves≈31). Depth also bounds interaction order: depth d ⇒ at most d features interacting per path." }
    }
  },
  {
    "q": "XGBoost, LightGBM, CatBoost — three battle-tested gradient-boosting libraries. They share the same core algorithm, so what actually distinguishes them?",
    "choices": [
      "Engineering trade-offs: LightGBM chases speed on big data, CatBoost handles categoricals natively, XGBoost is the regularised all-rounder",
      "Fundamentally different loss functions, since each library internally optimises its own distinct objective that no other library in the trio can support",
      "Only XGBoost genuinely uses decision trees; LightGBM and CatBoost boost linear models and shallow neural nets",
      "LightGBM is actually a bagging method, while XGBoost and CatBoost are the only true boosting implementations",
      "CatBoost is restricted to image and text inputs, while the other two libraries handle only purely numeric tables"
    ],
    "explain": "All three are gradient boosting over CART-style trees with histogram tricks. LightGBM's leaf-wise growth + sampling tricks make it typically fastest on large data. CatBoost's ordered target encoding makes raw categorical columns first-class citizens (and its ordered boosting resists target leakage). XGBoost, the original at scale, remains the most portable, documented, regularisation-rich default. Accuracy when tuned: usually within noise of each other.",
    "simple": "Three makes of the same engine. One is tuned for the motorway (LightGBM: raw speed on big tables), one has an automatic gearbox for messy streets (CatBoost: feed it categorical columns as-is), one is the reliable model every mechanic knows (XGBoost). Pick by your data and constraints — on a tuned benchmark they usually finish within a photo of each other.",
    "widget": {
      "type": "curveStatic",
      "title": "Three makes, one engine",
      "world": "The three libraries scored 0–100 on five practical criteria. Slide across and notice each library owns a different column — and one column where nobody wins.",
      "xlab": "criterion →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "speed, big data",
        "raw categoricals",
        "docs & ecosystem",
        "tuned accuracy",
        "small-data defaults"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "LightGBM", "ys": [ 95, 75, 82, 91, 62 ] },
        { "name": "CatBoost", "ys": [ 72, 97, 74, 91, 85 ] },
        { "name": "XGBoost", "ys": [ 80, 55, 95, 91, 72 ] }
      ],
      "knob": { "label": "Criterion", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "LightGBM owns the speed column (leaf-wise growth, histogram bins, clever sampling); CatBoost owns categoricals — no one-hot, no target-leakage foot-guns.", "tone": "info" },
        { "max": 3, "text": "Tuned accuracy: 91, 91, 91. On typical tabular data the algorithm is the same; benchmark wins trade places run to run.", "tone": "info" },
        { "max": 4, "text": "🤯 Small data flips the board again — CatBoost's cautious ordered boosting overfits least out of the box. The real skill isn't crowning one library; it's knowing WHICH column your project lives in.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "The gradient-boosting library landscape", "formula": "same algorithm · different engineering bets", "text": "Defaults: LightGBM for big tables, CatBoost for category-heavy or smaller data, XGBoost as the portable well-trodden path. sklearn's HistGradientBoosting is a capable built-in fourth option." }
    }
  }
];
