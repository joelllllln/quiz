/* Model Selection — full topic (3 levels) + primer. choices[0] always correct (shuffled at render). */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  window.PRIMERS = window.PRIMERS || {};
  window.PRIMERS.msel = { terms: [
    { t: "Hyperparameter", d: "A setting you choose BEFORE training — like a tree's depth or the k in k-NN. The model does not learn it; you pick it." },
    { t: "Training set", d: "The rows the model learns from. It adjusts its internal numbers to fit these examples as well as it can." },
    { t: "Validation set", d: "Held-out rows you peek at during development to compare models and pick settings — never used for the final honest score." },
    { t: "Test set", d: "Rows locked in a vault, touched exactly once at the very end, to estimate how the chosen model will do on brand-new data." },
    { t: "Fold", d: "One equal slice of your data when you cut it into k parts. Each fold takes a turn being the mini validation set." },
    { t: "Overfitting", d: "Learning the training data's quirks and noise so the model looks great on it but stumbles on anything new." },
    { t: "Baseline", d: "A dead-simple model (guess the average, always say the common class) whose score any real model must beat to earn its keep." },
    { t: "Generalisation", d: "Performing well on data never seen during training. This is the whole goal — memorising the past is easy and worthless." }
  ] };
  function def(qk,o){ (Q[qk]=Q[qk]||[]).push(o); D[o.q]=1; }
  function q(qk,o){ (Q[qk]=Q[qk]||[]).push(o); }

  /* ============================ msel1 — Part I · Foundations (15) ============================ */

  def("msel1", {
    q: "What is model selection?",
    choices: [
      "Choosing which model (and settings) to use, by comparing candidates on data they were not trained on",
      "Training a single model until its error on the training data reaches zero",
      "Collecting more features so one model can fit the data more tightly",
      "Deploying whichever model was fastest to train, regardless of accuracy",
      "Averaging the predictions of every model you tried into one output"
    ],
    explain: "Model selection is the decision step: you have several candidates — different algorithms, or one algorithm with different hyperparameters — and you pick the one that performs best on held-out data. The key is that the judging happens on data the candidate never trained on, because fit on training data is easy to fake.",
    simple: "You have a few models to choose from. Model selection is trying them out on fresh examples and keeping the one that does best. Judging them on the data they memorised would be like grading students on the exact questions they studied.",
    widget: {
      type: "curveStatic", title: "Picking the winner",
      world: "Five candidate models, scored on the same held-out validation set. Slide across them and find the peak.",
      xlab: "candidate model →", xs: [0,1,2,3,4], labels: ["tiny","small","medium","large","huge"], dec: 0, yunit: "%",
      series: [ { name: "validation score", ys: [72,79,85,83,78] } ],
      knob: { label: "Candidate", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "The tiniest model scores 72% — it is too simple to capture the pattern (underfitting).", tone: "info" },
        { max: 3, text: "Scores climb to a peak at the medium model, then start slipping as the models get bigger.", tone: "info" },
        { max: 4, text: "🤯 The biggest model is NOT the best — it overfits. Model selection is finding that peak, not chasing size.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Model selection", formula: "pick argmax(held-out score) over candidates", text: "Compare candidates on data they didn't train on, then keep the best. Bigger is not automatically better." }
    }
  });

  def("msel1", {
    q: "What is a baseline model?",
    choices: [
      "A deliberately simple model whose score any serious model must beat to prove it is worth anything",
      "The final model you ship to production after all tuning is finished",
      "The model with the most parameters, used as the gold standard",
      "A model trained only on the test set to set an upper bound",
      "The average of all candidate models' predictions"
    ],
    explain: "A baseline is something trivial: always predict the most common class, or always predict the average value. Its job is to give your real model's score a meaning — 85% sounds great until you learn a baseline already gets 84%. If you can't beat the baseline, your fancy model is adding nothing.",
    simple: "A baseline is the laziest possible guess. It tells you what an easy score looks like, so you know whether your real model is actually clever or just lucky. Beat the baseline first, or go back to the drawing board.",
    widget: {
      type: "curveStatic", title: "Beat the lazy guess",
      world: "Your model always scores 85%. Watch what that means as the always-guess baseline for this problem gets stronger.",
      xlab: "how easy the problem is →", xs: [0,1,2,3,4], labels: ["hard","medium","easy","easier","trivial"], dec: 0, yunit: "%",
      series: [ { name: "your model", ys: [85,85,85,85,85] }, { name: "lazy baseline", ys: [50,70,84,86,90] } ],
      knob: { label: "Problem", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "On the hard problem the baseline gets 50%; your 85% is a big, real improvement.", tone: "info" },
        { max: 3, text: "As the baseline creeps up to 84%, your impressive-looking 85% suddenly means almost nothing.", tone: "info" },
        { max: 4, text: "🤯 When the lazy guess scores 90%, your 85% model is WORSE than doing nothing. A score has no meaning without a baseline.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Baseline model", formula: "always-common-class / always-mean prediction", text: "The reference point that turns a raw score into a judgement. Beat it, or your model earns nothing." }
    }
  });

  def("msel1", {
    q: "What is a train / validation / test split?",
    choices: [
      "Cutting the data into three roles: one to learn from, one to tune and compare on, one to report the final honest score",
      "Splitting the data into three equal thirds and training a separate model on each",
      "Using two-thirds of the columns to train and one-third to test",
      "Randomly reshuffling the data three times and averaging the results",
      "Dividing the data by date into three calendar quarters"
    ],
    explain: "Three piles, three jobs. The training set teaches the model; the validation set is where you compare candidates and tune settings; the test set is opened once, at the very end, to estimate real-world performance. Keeping them separate is what stops you from fooling yourself.",
    simple: "Split your data into three: one part to learn from, one part to pick the best model on, and one part you don't touch until the end to see how you really did. Mixing these jobs is how people trick themselves into thinking a model is better than it is.",
    widget: {
      type: "curveStatic", title: "Three piles, three jobs",
      world: "Shrink the test set to grab more training data, and watch how shaky the final estimate becomes.",
      xlab: "test-set size →", xs: [0,1,2,3,4], labels: ["20 rows","50","100","300","1000"], dec: 0, yunit: "%",
      series: [ { name: "wobble in final estimate (±)", ys: [15,10,7,5,3] } ],
      knob: { label: "Test size", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A 20-row test set: the reported score could easily be off by ±15 points. Almost useless as a verdict.", tone: "info" },
        { max: 3, text: "Bigger test sets shrink the wobble — the score you report becomes something you can trust.", tone: "info" },
        { max: 4, text: "🤯 The split is a balancing act: too little test data and your final number is noise; too little training data and the model itself suffers.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Train/validation/test split", formula: "learn · tune · report — kept separate", text: "Three piles with three distinct jobs. Blur them and your scores stop meaning anything." }
    }
  });

  def("msel1", {
    q: "What is a holdout (validation) set?",
    choices: [
      "A slice of data kept out of training, used to compare models and pick settings during development",
      "The portion of data used to train the final model once tuning is done",
      "A copy of the training data used to double-check the model memorised it",
      "The single hardest example, held back to stress-test the model",
      "Extra data collected after deployment to retrain the model"
    ],
    explain: "A holdout set is data you set aside and do NOT train on, so you can see how the model behaves on unseen examples. You use it to compare candidates and choose hyperparameters. Because you look at it repeatedly, it slowly loses its innocence — which is why you keep a separate test set for the final word.",
    simple: "A holdout set is practice-exam data the model never studied. You use it to see which model looks best. But because you check it again and again, it can't be your final honest grade — that's the test set's job.",
    widget: {
      type: "curveStatic", title: "The practice exam",
      world: "Train and validation scores as the model grows more complex. Watch where the validation line peaks.",
      xlab: "model complexity →", xs: [0,1,2,3,4], labels: ["v.low","low","medium","high","v.high"], dec: 0, yunit: "%",
      series: [ { name: "training score", ys: [70,82,90,95,98] }, { name: "validation score", ys: [68,80,86,82,74] } ],
      knob: { label: "Complexity", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Both scores start low: the model is too simple and underfits everything.", tone: "info" },
        { max: 3, text: "Training keeps climbing, but validation peaks at medium complexity — the sweet spot the holdout reveals.", tone: "info" },
        { max: 4, text: "🤯 At high complexity training hits 98% while validation FALLS to 74%. Training score alone would have lied; the holdout caught the overfitting.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Holdout (validation) set", formula: "data withheld from training, used to choose", text: "Your practice exam. It exposes overfitting that the training score happily hides." }
    }
  });

  def("msel1", {
    q: "What is cross-validation?",
    choices: [
      "Rotating which slice of data is held out so every row gets a turn as validation, then averaging the scores",
      "Training the same model twice and keeping whichever run scored higher",
      "Testing a model on a completely different dataset from another project",
      "Checking that two different models agree on every prediction",
      "Validating the data for typos and missing values before training"
    ],
    explain: "Instead of trusting one lucky (or unlucky) holdout split, cross-validation splits the data several ways, each time holding out a different slice, and averages the results. This gives a far more stable estimate of how the model generalises, because the answer no longer depends on which single split you happened to draw.",
    simple: "One practice exam might be easy or hard by chance. Cross-validation gives the model several practice exams, each using a different chunk as the test, and averages the grades. The average is much more trustworthy than any single try.",
    widget: {
      type: "curveStatic", title: "Don't trust one lucky split",
      world: "The SAME model scored on five different random holdout splits. Watch how much a single split can swing.",
      xlab: "which random split →", xs: [0,1,2,3,4], labels: ["split A","split B","split C","split D","split E"], dec: 0, yunit: "%",
      series: [ { name: "score from this one split", ys: [78,85,74,88,80] } ],
      knob: { label: "Split", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Split A says 78%. If you'd stopped here, that's your whole verdict — from one roll of the dice.", tone: "info" },
        { max: 3, text: "Different splits of the SAME model give 85%, 74%, 88%... the single-split score is all over the place.", tone: "info" },
        { max: 4, text: "🤯 One model, scores from 74% to 88% depending only on luck. Cross-validation averages them to ~81% — a number you can actually trust.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Cross-validation", formula: "average of scores over rotating held-out slices", text: "Every row takes a turn being validation. Averaging kills the luck of a single split." }
    }
  });

  def("msel1", {
    q: "What is k-fold cross-validation?",
    choices: [
      "Splitting data into k equal folds, then training k times, each time holding out a different fold as validation",
      "Training the model k times on the exact same data to reduce randomness",
      "Keeping k percent of the data for testing and the rest for training",
      "Running k different algorithms and picking the fastest one",
      "Folding the data in half k times until only one row remains"
    ],
    explain: "k-fold is the standard recipe for cross-validation. You cut the data into k equal folds (k=5 or 10 is common); each fold gets one turn as the validation set while the other k-1 folds train the model. You average the k scores. Higher k means more training data per run and a steadier estimate, at the cost of more compute.",
    simple: "Cut the data into k equal slices. Train k times, each time testing on a different slice and learning from the rest. Average the k scores. It's cross-validation with a fixed, tidy recipe.",
    widget: {
      type: "curveStatic", title: "More folds, steadier estimate",
      world: "How much the cross-validation estimate wobbles between runs, as you raise the number of folds k.",
      xlab: "number of folds k →", xs: [0,1,2,3,4], labels: ["k=2","k=3","k=5","k=10","k=20"], dec: 0, yunit: "%",
      series: [ { name: "wobble in the estimate (±)", ys: [14,9,6,5,4] } ],
      knob: { label: "k", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "k=2 trains on only half the data each time, and the estimate wobbles by ±14 points.", tone: "info" },
        { max: 3, text: "Raising k to 5 lets each run train on 80% of the data; the wobble shrinks to ±6.", tone: "info" },
        { max: 4, text: "🤯 k=10 is the popular sweet spot — steady estimates without paying to train 20+ times. More folds cost more compute for shrinking returns.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "k-fold cross-validation", formula: "k folds → train k times, hold out one each time, average", text: "The workhorse recipe. k=5 or 10 balances a steady estimate against compute cost." }
    }
  });

  def("msel1", {
    q: "What is hyperparameter tuning?",
    choices: [
      "Trying different values for settings you choose (like depth or k) and keeping the value that validates best",
      "Letting the model learn its own weights from the training data",
      "Adjusting the model's predictions by hand after it is trained",
      "Adding more rows to the dataset until accuracy stops improving",
      "Rewriting the model's code to run faster on new hardware"
    ],
    explain: "Hyperparameters are the knobs you set before training — tree depth, number of neighbours, regularisation strength. Tuning means systematically trying values and measuring each on validation data, then keeping whichever scored best. Unlike the model's learned weights, these knobs won't set themselves.",
    simple: "Some settings the model can't learn on its own — you have to pick them. Tuning is trying a bunch of values, seeing which does best on the validation set, and going with that one. It's turning knobs and reading the dial.",
    widget: {
      type: "curveStatic", title: "Turning the knob",
      world: "Validation score as you sweep one hyperparameter (say, tree depth) from too-shallow to too-deep.",
      xlab: "hyperparameter value →", xs: [0,1,2,3,4], labels: ["1","3","5","7","9"], dec: 0, yunit: "%",
      series: [ { name: "validation score", ys: [70,80,86,81,72] } ],
      knob: { label: "Setting", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A depth of 1 is too shallow to capture the pattern: 70%, underfitting.", tone: "info" },
        { max: 3, text: "The score peaks at depth 5 (86%), then falls again as deeper trees start memorising noise.", tone: "info" },
        { max: 4, text: "🤯 Both extremes are bad — too small underfits, too big overfits. Tuning is finding the value at the peak, and you can only see the peak on validation data.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Hyperparameter tuning", formula: "search settings → keep best validation score", text: "The model learns its weights; YOU choose its knobs by trying values and reading the validation dial." }
    }
  });

  def("msel1", {
    q: "What is Occam's razor (parsimony) in modelling?",
    choices: [
      "When two models fit about equally well, prefer the simpler one",
      "Always pick the model with the most features and parameters",
      "Shave away any model that scores below the baseline",
      "Choose the model that trains in the shortest time",
      "Combine every model you built into one large ensemble"
    ],
    explain: "Occam's razor says: don't add complexity you don't need. If a simple model and a complex one perform about the same on unseen data, the simple one is the better choice — it's easier to understand, cheaper to run, and less likely to be fitting noise. Complexity should have to earn its place with a real, measurable gain.",
    simple: "If two models are basically tied, go with the simpler one. Extra complexity that doesn't buy you real improvement is just extra ways to overfit and extra headaches. Simpler is a feature, not a compromise.",
    widget: {
      type: "curveStatic", title: "Simpler, when it's a tie",
      world: "New-data accuracy as models get more complex. Watch where the gains flatten out.",
      xlab: "model complexity →", xs: [0,1,2,3,4], labels: ["v.simple","simple","medium","complex","v.complex"], dec: 0, yunit: "%",
      series: [ { name: "new-data accuracy", ys: [80,85,86,86,84] } ],
      knob: { label: "Complexity", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "The very simple model already reaches 80% — a solid start.", tone: "info" },
        { max: 3, text: "The 'simple' model hits 85%, and the medium and complex ones tie at 86% — a rounding-error better.", tone: "info" },
        { max: 4, text: "🤯 The complex model matches the medium one but costs far more and risks overfitting. When scores tie, the razor says take the simpler model.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Occam's razor (parsimony)", formula: "tie on accuracy → choose the simpler model", text: "Complexity must earn its place with a real gain. A tie goes to simplicity." }
    }
  });

  q("msel1", {
    q: "Why must you NOT use the test set to choose between models — only look at it once, at the very end?",
    choices: [
      "Every peek lets you tune to the test set's quirks, so its score stops predicting real-world performance",
      "The test set is always too small to compare models reliably",
      "Test sets contain the labels, so comparing on them is cheating by definition",
      "Looking at the test set erases it and you can't use it again technically",
      "Models are legally required to be evaluated on validation data instead"
    ],
    explain: "The test set's only value is being untouched: it stands in for future, unseen data. The moment you use it to pick a model, you start (even unconsciously) fitting to its particular noise, and its score becomes optimistic. Use the validation set for all comparisons; open the test set once, report the number, and stop.",
    simple: "The test set is your one honest final exam. If you keep peeking to decide things, you start memorising that exam, and the grade no longer reflects the real world. Look once, at the end, then leave it alone.",
    widget: {
      type: "curveStatic", title: "The vanishing honesty of a reused test set",
      world: "You keep going back to the test set to pick your model. Watch the gap between its rosy score and the true score grow.",
      xlab: "times you peeked at the test set →", xs: [0,1,2,3,4], labels: ["once","a few","many","lots","obsessive"], dec: 0, yunit: "%",
      series: [ { name: "optimism gap (reported − true)", ys: [0,2,5,9,14] } ],
      knob: { label: "Peeks", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Look once and report: the gap is 0 — the test score is honest.", tone: "info" },
        { max: 3, text: "Each time you pick a model based on the test set, you fit its noise a little more; the gap grows to 5, then 9 points.", tone: "info" },
        { max: 4, text: "🤯 After obsessive reuse, you report 14 points better than reality. The test set is spent — its whole value was being untouched.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Touch the test set once", formula: "select on validation · report on test · then stop", text: "The test set predicts the future only while it stays unseen. Every peek spends that honesty." }
    }
  });

  q("msel1", {
    q: "You compared two models with a single 80/20 holdout and model B won by 2 points. A colleague warns this could be luck. What is the more reliable way to compare them?",
    choices: [
      "Use k-fold cross-validation and compare their AVERAGE scores across the folds",
      "Rerun the same single split a few times and trust whichever wins most",
      "Pick model B — a win is a win, regardless of how it was measured",
      "Compare them on the training data instead, where more rows are available",
      "Choose the model that trained faster, since their scores are close"
    ],
    explain: "A single holdout is one roll of the dice — a 2-point gap can easily flip on a different split. Cross-validation scores each model on several rotating folds and averages, so the comparison rests on the whole dataset rather than one lucky slice. Compare the averages (and ideally the spread) rather than a single number.",
    simple: "One practice exam can go either way by chance. Give both models several exams (cross-validation) and compare their averages. A 2-point win on a single split often disappears once you look at more splits.",
    widget: {
      type: "curveStatic", title: "Does the winner survive more folds?",
      world: "Model B's lead over model A, measured on each of five different folds. Watch the lead flicker.",
      xlab: "fold →", xs: [0,1,2,3,4], labels: ["fold 1","fold 2","fold 3","fold 4","fold 5"], dec: 0, yunit: "%",
      series: [ { name: "B minus A on this fold", ys: [2,-1,3,0,1] } ],
      knob: { label: "Fold", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Fold 1: B leads by 2 — the same result the single holdout gave.", tone: "info" },
        { max: 3, text: "But fold 2 has A winning, and fold 4 is a tie. The 'lead' bounces around zero.", tone: "info" },
        { max: 4, text: "🤯 Averaged over folds, B leads by about 1 point — well inside the noise. The single-split '2-point win' was mostly luck.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Compare with cross-validation", formula: "compare average CV scores, not one split", text: "A gap that appears on one split and vanishes on others was never real. Average across folds." }
    }
  });

  q("msel1", {
    q: "Two models are essentially tied on validation accuracy: a 3-line logistic regression and a giant black-box ensemble. Which should you generally ship?",
    choices: [
      "The simple logistic regression — a tie should go to the model that's easier to run, explain, and trust",
      "The giant ensemble — more complexity always means more real-world robustness",
      "Neither — retrain both from scratch until one clearly wins",
      "Whichever one scored higher on the training set",
      "Alternate between them in production to hedge your bets"
    ],
    explain: "This is Occam's razor in action. When two models perform about the same on unseen data, the simpler one wins on every practical axis: it's cheaper to serve, easier to debug and explain, and less prone to overfitting quirks. Save the heavy machinery for when it delivers a real, measurable edge.",
    simple: "If a tiny model and a monster model tie, ship the tiny one. It's easier to run, easier to explain, and less likely to break in weird ways. Complexity is only worth it when it actually wins you something.",
    widget: {
      type: "curveStatic", title: "What complexity actually buys",
      world: "Validation accuracy versus the cost of running and maintaining the model, as complexity rises.",
      xlab: "model complexity →", xs: [0,1,2,3,4], labels: ["3-line","small","medium","big","giant"], dec: 0, yunit: "%",
      series: [ { name: "validation accuracy", ys: [85,86,86,86,87] }, { name: "running cost", ys: [5,15,30,55,90] } ],
      knob: { label: "Complexity", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "The 3-line model already scores 85% at almost no cost.", tone: "info" },
        { max: 3, text: "Bigger models barely move accuracy (86%) while cost climbs steeply.", tone: "info" },
        { max: 4, text: "🤯 The giant model wins ONE point for 18x the cost and complexity. A near-tie in accuracy is a landslide for the simple model.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Simplest model that works", formula: "tie on accuracy → simpler wins on cost, clarity, risk", text: "Accuracy is only one axis. When it ties, everything else favours the simple model." }
    }
  });

  q("msel1", {
    q: "What are the distinct roles of the validation set versus the test set?",
    choices: [
      "Validation is looked at repeatedly to choose models; test is opened once at the end for the honest score",
      "Validation gives the final score; test is used to tune hyperparameters",
      "They are interchangeable — any held-out data can play either role at any time",
      "Validation is for classification and test is for regression problems",
      "Validation trains the model; test also trains it but with fewer rows"
    ],
    explain: "The two held-out sets do different jobs. You consult the validation set again and again to compare models and pick settings — so it slowly becomes 'used up' and optimistic. The test set stays sealed until the very end and is read exactly once, which is what makes its number a trustworthy estimate of future performance.",
    simple: "The validation set is where you shop around and compare models — you look at it a lot. The test set is the sealed envelope you open only at the end. Keeping the jobs separate is what keeps the final grade honest.",
    widget: {
      type: "curveStatic", title: "One gets tired, one stays honest",
      world: "How honest each held-out set stays as you make more and more model decisions during development.",
      xlab: "decisions made during development →", xs: [0,1,2,3,4], labels: ["few","some","many","lots","tons"], dec: 0, yunit: "%",
      series: [ { name: "validation optimism", ys: [0,3,6,9,12] }, { name: "test optimism (opened once)", ys: [0,0,0,0,0] } ],
      knob: { label: "Decisions", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Early on, both sets are honest — you've barely used the validation data yet.", tone: "info" },
        { max: 3, text: "As you make more choices against the validation set, its score drifts optimistic (+6, +9).", tone: "info" },
        { max: 4, text: "🤯 The test set stays flat at 0 because you never touched it while deciding. That's exactly why you keep it in reserve for the final number.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Validation vs test roles", formula: "validation = choose (many looks) · test = report (one look)", text: "The validation set wears out from repeated use. The test set stays honest because it stays sealed." }
    }
  });

  q("msel1", {
    q: "Your model reports 88% accuracy. Before celebrating, what single fact do you most need to judge whether that's good?",
    choices: [
      "The baseline score — what a trivial always-guess model gets on the same problem",
      "How many lines of code the model took to write",
      "How long the model took to train on your laptop",
      "The number of hyperparameters the model has",
      "Whether the model is a neural network or a decision tree"
    ],
    explain: "A raw score is meaningless in isolation. If the classes are 88% one type, a model that always guesses that type also scores 88% — your model adds nothing. The baseline converts '88%' from a number into a judgement: impressive if the baseline is 60%, embarrassing if it's 87%.",
    simple: "88% could be amazing or terrible — you can't tell until you know what an easy guess scores. If always guessing gets 87%, your 88% is nothing special. The baseline is the context that gives the number meaning.",
    widget: {
      type: "curveStatic", title: "88% — good or not?",
      world: "Your fixed 88% model against baselines from different versions of the problem. When does 88% impress?",
      xlab: "baseline strength →", xs: [0,1,2,3,4], labels: ["50%","65%","80%","87%","90%"], dec: 0, yunit: "%",
      series: [ { name: "your model", ys: [88,88,88,88,88] }, { name: "baseline", ys: [50,65,80,87,90] } ],
      knob: { label: "Baseline", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Baseline 50%: your 88% is a huge, genuine win over guessing.", tone: "info" },
        { max: 3, text: "Baseline 87%: your model beats the lazy guess by a single point — barely worth the effort.", tone: "info" },
        { max: 4, text: "🤯 Baseline 90%: your 88% is actually WORSE than doing nothing. Same score, opposite verdict — the baseline decides which.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "A score needs a baseline", formula: "judge model score against the trivial baseline", text: "88% is not a verdict until you know what the easy guess scores. Always name the baseline." }
    }
  });

  q("msel1", {
    q: "You're tuning the number of neighbours k in k-NN. Concretely, what does 'tuning' this hyperparameter involve?",
    choices: [
      "Trying several values of k, scoring each on validation data, and keeping the k that scores best",
      "Letting the model discover the best k on its own during training",
      "Setting k equal to the number of features in the dataset",
      "Picking the k that gives the highest score on the training data",
      "Choosing k at random once and never revisiting it"
    ],
    explain: "Tuning is a search over candidate values. You try k=1, 3, 5, 7, ..., train and score each on held-out validation data, and keep the value at the peak. Note the scoring must be on validation, not training data — k=1 always fits the training set perfectly, which is exactly the trap.",
    simple: "You don't guess k once — you try a bunch of values and see which does best on the validation set. The model can't pick k for you; that's your knob to turn. And you judge on fresh data, because k=1 always looks perfect on the training data.",
    widget: {
      type: "curveStatic", title: "Searching for the best k",
      world: "Validation accuracy as you try different values of k in k-NN, from memorising to over-smoothing.",
      xlab: "k (neighbours) →", xs: [0,1,2,3,4], labels: ["1","5","15","35","75"], dec: 0, yunit: "%",
      series: [ { name: "validation accuracy", ys: [74,86,88,83,76] } ],
      knob: { label: "k", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "k=1 copies the single nearest point — jumpy and overfit, only 74% on new data.", tone: "info" },
        { max: 3, text: "Around k=15 the vote is steady but still local: the peak at 88%.", tone: "info" },
        { max: 4, text: "🤯 k=75 averages over too many neighbours and blurs the classes (76%). Tuning found the peak in between — by testing values, not guessing.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Tuning a hyperparameter", formula: "try values → score on validation → keep the best", text: "A search you run, not something the model learns. Judge each candidate on held-out data." }
    }
  });

  q("msel1", {
    q: "Why can't you select the best model by simply picking whichever one scores highest on the training data?",
    choices: [
      "A complex enough model can memorise the training data and score near 100% while failing on new data",
      "Training scores are always lower than validation scores, so they mislead",
      "The training data usually has more errors than the validation data",
      "Training scores can only be computed for regression, not classification",
      "The model with the highest training score is always the simplest one"
    ],
    explain: "Training score measures memorisation, not understanding. A flexible model can fit the training rows almost perfectly — including their noise — and still generalise terribly. That's why model selection judges candidates on held-out data: it rewards the model that learned the pattern, not the one that memorised the answers.",
    simple: "Any model can ace the exam it already studied. A fancy model can memorise the training data and look perfect, then bomb on new cases. So you compare models on data they haven't seen, not on their training score.",
    widget: {
      type: "curveStatic", title: "Training score is a liar",
      world: "Training score versus true new-data score as models get more flexible. Watch them pull apart.",
      xlab: "model flexibility →", xs: [0,1,2,3,4], labels: ["rigid","low","medium","high","extreme"], dec: 0, yunit: "%",
      series: [ { name: "training score", ys: [72,84,92,98,100] }, { name: "new-data score", ys: [70,82,86,80,68] } ],
      knob: { label: "Flexibility", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "For rigid models the two scores agree: nothing is being memorised yet.", tone: "info" },
        { max: 3, text: "As flexibility rises, training score races to 98% while new-data score already peaked at 86% and starts falling.", tone: "info" },
        { max: 4, text: "🤯 At extreme flexibility, training hits a perfect 100% but new-data score collapses to 68%. Pick by training score and you'd choose the worst model.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Never select on training score", formula: "training score rewards memorisation, not generalisation", text: "A perfect training score can hide total failure on new data. Always judge on held-out data." }
    }
  });

  /* ============================ msel2 — Part II · Practice (9) ============================ */

  def("msel2", {
    q: "What is grid search for hyperparameters?",
    choices: [
      "Trying every combination from a fixed grid of candidate values and keeping the best-scoring one",
      "Randomly sampling a handful of settings and stopping when one looks good enough",
      "Letting the model adjust its own hyperparameters during training",
      "Searching the internet for hyperparameters other people used",
      "Increasing one hyperparameter until the score stops improving, then freezing it"
    ],
    explain: "Grid search lays out a grid — e.g. depth in {3,5,7} crossed with learning rate in {0.01, 0.1} — and evaluates every single combination on validation data, keeping the winner. It's exhaustive and simple, but the number of combinations multiplies with each hyperparameter, so it gets expensive fast.",
    simple: "List the values you want to try for each setting, then test every possible combination and keep the best. Thorough and easy to understand — but the combinations pile up quickly when you have several knobs.",
    widget: {
      type: "curveStatic", title: "Every combination on the grid",
      world: "A grid over two hyperparameters. Watch how many models you must train as the grid gets finer.",
      xlab: "grid resolution per knob →", xs: [0,1,2,3,4], labels: ["2x2","3x3","4x4","5x5","6x6"], dec: 0, yunit: "",
      series: [ { name: "models to train", ys: [4,9,16,25,36] } ],
      knob: { label: "Resolution", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A 2x2 grid over two knobs is just 4 models — cheap and quick.", tone: "info" },
        { max: 3, text: "A 4x4 grid is already 16 models, and 5x5 is 25. The count is resolution multiplied across knobs.", tone: "info" },
        { max: 4, text: "🤯 6x6 = 36 models for just TWO hyperparameters. Add a third knob and it's 216. Grid search is exhaustive but explodes.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Grid search", formula: "evaluate all combinations on a fixed grid", text: "Exhaustive and simple, but the cost multiplies with every hyperparameter you add." }
    }
  });

  def("msel2", {
    q: "What is random search for hyperparameters?",
    choices: [
      "Sampling random combinations of hyperparameter values for a fixed budget of trials, keeping the best",
      "Assigning every hyperparameter a random value once and shipping that model",
      "Randomly shuffling the training data before each epoch of training",
      "Letting a random forest choose the hyperparameters automatically",
      "Trying every grid combination but in a randomised order"
    ],
    explain: "Random search picks hyperparameter values at random (from ranges you specify) for a set number of trials — say 30 — and keeps the best. Surprisingly, for the same budget it often beats grid search, because when only a few hyperparameters really matter, random sampling explores more distinct values of those important ones instead of wasting trials on a rigid lattice.",
    simple: "Instead of a rigid grid, just try random combinations for a fixed number of attempts and keep the best. It sounds crude, but for the same budget it often finds a better setting than grid search, especially when only a couple of knobs really matter.",
    widget: {
      type: "curveStatic", title: "Best-so-far as trials pile up",
      world: "The best validation score found so far as random search draws more random hyperparameter combinations.",
      xlab: "random trials drawn →", xs: [0,1,2,3,4], labels: ["5","10","20","40","80"], dec: 0, yunit: "%",
      series: [ { name: "best score found so far", ys: [80,84,86,87,88] } ],
      knob: { label: "Trials", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Just 5 random tries already land a decent 80% — random sampling gets lucky quickly.", tone: "info" },
        { max: 3, text: "By 20 trials you're at 86%; the best-so-far curve rises fast, then flattens.", tone: "info" },
        { max: 4, text: "🤯 Going from 40 to 80 trials buys only one more point. Random search finds most of the gain early — a real bargain versus an exhaustive grid.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Random search", formula: "sample random settings for a fixed trial budget", text: "Cheap, simple, and often better than a grid for the same budget when few knobs matter." }
    }
  });

  def("msel2", {
    q: "What is stratified k-fold cross-validation?",
    choices: [
      "k-fold where each fold is built to keep the same class proportions as the whole dataset",
      "k-fold where the folds are sorted by the target value from lowest to highest",
      "k-fold applied separately to each feature and then averaged",
      "k-fold that uses more folds for the majority class than the minority class",
      "k-fold where each fold contains examples from only one class"
    ],
    explain: "With plain random folds and an imbalanced target, some folds can end up with very few (or zero) minority-class examples, making their scores meaningless. Stratified k-fold ensures every fold mirrors the overall class balance, so each fold is a fair miniature of the whole. It's the sensible default for classification.",
    simple: "If only 5% of your data is the rare class, a random fold might get none of it. Stratified k-fold makes sure every fold has roughly the same class mix as the full dataset, so no fold is lopsided. Use it by default for classification.",
    widget: {
      type: "curveStatic", title: "Don't let a fold lose the rare class",
      world: "As the rare class gets rarer, the chance a plain random fold contains ZERO of it climbs — stratifying stops that.",
      xlab: "how imbalanced the data is →", xs: [0,1,2,3,4], labels: ["30%","15%","8%","4%","1%"], dec: 0, yunit: "%",
      series: [ { name: "plain fold with zero rare cases", ys: [1,8,20,45,70] }, { name: "stratified fold with zero", ys: [0,0,0,0,0] } ],
      knob: { label: "Imbalance", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "At 30% minority, plain random folds almost never miss the rare class — barely a difference.", tone: "info" },
        { max: 3, text: "At 8% minority, a plain fold has a 1-in-5 chance of containing none of the rare class, wrecking that fold's score.", tone: "info" },
        { max: 4, text: "🤯 At 1% minority, most plain folds miss the rare class entirely. Stratified folds keep every one at 0% risk — that's why it's the default.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Stratified k-fold", formula: "each fold mirrors the overall class balance", text: "Keeps every fold a fair miniature of the whole. The sensible default for imbalanced classification." }
    }
  });

  q("msel2", {
    q: "You're forecasting next month's sales from past months. Why is ordinary shuffled k-fold the wrong way to validate, and what should you use instead?",
    choices: [
      "Shuffling leaks the future into the training folds; use a time-based split that always trains on the past and tests on later data",
      "Shuffling is fine; time series just need more folds than usual",
      "Shuffling is wrong only because it's slower; use a random 80/20 split instead",
      "Use leave-one-out on random rows to squeeze out more folds",
      "Time series can't be cross-validated at all, so just use the training score"
    ],
    explain: "In a time series, order carries information. Shuffled k-fold lets the model train on June to predict May — using future data to predict the past, which never happens in deployment and produces wildly optimistic scores. A time-based (forward-chaining) split always trains on earlier data and validates on later data, matching how you'll actually use the model.",
    simple: "You can't peek at the future to predict the past. Shuffling mixes future months into training and gives fake-good scores. Instead, always train on earlier data and test on later data, the way you'd really use the model.",
    widget: {
      type: "curveStatic", title: "The cost of peeking at the future",
      world: "How optimistic your validation score becomes as more future data leaks into the training folds via shuffling.",
      xlab: "future data leaked into training →", xs: [0,1,2,3,4], labels: ["none","little","some","lots","all"], dec: 0, yunit: "%",
      series: [ { name: "shuffled-CV reported score", ys: [72,78,85,91,96] }, { name: "true forward-in-time score", ys: [72,72,72,72,72] } ],
      knob: { label: "Leakage", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With no leakage the reported score matches the true score: an honest 72%.", tone: "info" },
        { max: 3, text: "As shuffling mixes future months into training, the reported score inflates to 85%, then 91% — pure illusion.", tone: "info" },
        { max: 4, text: "🤯 Full shuffling reports 96% while the real, deploy-it score is still 72%. A time-based split refuses to peek and keeps you honest.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Time-series split", formula: "train on the past, validate on the future — never shuffle", text: "Order carries information. Shuffling leaks the future and fakes great scores." }
    }
  });

  q("msel2", {
    q: "You have 6 hyperparameters to tune and a fixed compute budget. Why do practitioners often prefer random search over a full grid here?",
    choices: [
      "A grid's combinations explode with each knob, while random search covers the space far better for the same fixed budget",
      "Random search always finds the exact optimum that grid search misses",
      "Grid search cannot handle more than two hyperparameters at all",
      "Random search trains each model faster than grid search does",
      "Grid search only works on regression, not classification"
    ],
    explain: "With 6 knobs, even 4 values each is 4^6 = 4096 grid points — often unaffordable. Random search spends the same budget sampling widely, and crucially it tries many distinct values of the hyperparameters that actually matter, instead of repeating the same few grid values. That's why for the same number of trials it usually finds a comparable or better setting in high dimensions.",
    simple: "With lots of knobs, a full grid has too many combinations to afford. Random search spreads the same budget across the space and tends to hit good values of the knobs that matter, so it's the better bet when you have many hyperparameters.",
    widget: {
      type: "curveStatic", title: "Grid explodes, random stays flat",
      world: "Models you'd need to train with a grid (4 values per knob) versus a fixed random-search budget, as knobs pile up.",
      xlab: "number of hyperparameters →", xs: [0,1,2,3,4], labels: ["1","2","3","4","5"], dec: 0, yunit: "",
      series: [ { name: "grid (4 values each)", ys: [4,16,64,256,1024] }, { name: "random budget", ys: [40,40,40,40,40] } ],
      knob: { label: "Knobs", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With one knob, a 4-point grid (4 models) is cheaper than 40 random trials — grid wins.", tone: "info" },
        { max: 3, text: "By 3 knobs the grid needs 64 models; by 4 it's 256. Random search still spends its flat 40.", tone: "info" },
        { max: 4, text: "🤯 At 5 knobs the grid demands 1024 models. Random search covers the space on a fixed budget — which is why it wins in high dimensions.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Grid vs random cost", formula: "grid = values^knobs (exponential) · random = fixed budget", text: "Grids explode with dimensions. Random search spends a flat budget and usually wins when knobs are many." }
    }
  });

  q("msel2", {
    q: "You tried 200 model variants and picked the one with the best validation score. Why is that winning validation score likely too optimistic?",
    choices: [
      "With enough tries, some model looks best partly by fitting the validation set's random noise",
      "Validation sets are always smaller than test sets, so they read low",
      "The 200th model always overfits more than the first one by design",
      "Validation scores drift upward simply because time has passed",
      "Comparing many models corrupts the training data they share"
    ],
    explain: "Each validation score has some random noise. Try enough models and the 'winner' is often the one that got the luckiest draw of that noise, not the one that's genuinely best — you've overfit the validation set through sheer number of comparisons. That's why the winner's validation score overstates its true quality, and you need a fresh test set to confirm.",
    simple: "If you try 200 models and keep the best score, some of that top score is just luck — the winner rode the validation set's noise. The more you compare, the more optimistic that best number gets. Confirm it on a fresh test set.",
    widget: {
      type: "curveStatic", title: "Luck of the best-of-many",
      world: "The gap between the winning model's validation score and its true score, as you compare more and more models.",
      xlab: "number of models compared →", xs: [0,1,2,3,4], labels: ["1","10","50","200","1000"], dec: 0, yunit: "%",
      series: [ { name: "winner's optimism (validation − true)", ys: [0,1,3,6,10] } ],
      knob: { label: "Comparisons", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Compare just one model and its validation score is honest — no cherry-picking yet.", tone: "info" },
        { max: 3, text: "Pick the best of 50, then 200, and the winner's score is inflated by 3, then 6 points of pure luck.", tone: "info" },
        { max: 4, text: "🤯 Best-of-1000: the winner looks 10 points better than it truly is. You overfit the validation set just by comparing too much.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Overfitting the validation set", formula: "more comparisons → luckier 'winner' → optimistic score", text: "The best-of-many score rides noise. Confirm the winner on data you haven't compared on." }
    }
  });

  q("msel2", {
    q: "Your learning curve shows validation accuracy has flattened out and adding more training data barely helps. What does this tell you to do next?",
    choices: [
      "More data won't help much — invest in better features or a more capable model instead",
      "Keep collecting data; the curve will eventually shoot up again",
      "Reduce the training set size to make the model train faster",
      "Switch to a simpler model since data has stopped mattering",
      "Nothing — a flat learning curve means the model is already perfect"
    ],
    explain: "A learning curve plots performance against training-set size. When it plateaus, you've hit the ceiling of what THIS model can extract from THIS data — more rows just retrace the flat line. The lever to pull is a richer representation: better features, or a more expressive model. If instead the curve were still climbing, more data would be the cheaper win.",
    simple: "The learning curve shows whether more data would help. If it's still rising, collect more data. If it's flat, more data is wasted effort — you need better features or a stronger model to break through.",
    widget: {
      type: "curveStatic", title: "Read the plateau",
      world: "Validation accuracy as you feed the model more and more training rows. Watch where the gains die out.",
      xlab: "training-set size →", xs: [0,1,2,3,4], labels: ["1k","2k","5k","10k","20k"], dec: 0, yunit: "%",
      series: [ { name: "validation accuracy", ys: [60,72,80,83,84] } ],
      knob: { label: "Data", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Going from 1k to 2k rows jumps accuracy from 60% to 72% — data is clearly the bottleneck here.", tone: "info" },
        { max: 3, text: "From 5k to 10k rows buys only 3 points. The curve is bending over; returns are fading.", tone: "info" },
        { max: 4, text: "🤯 Doubling from 10k to 20k adds a single point. The plateau says: more data is spent — change the model or the features.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Learning curves", formula: "still rising → get data · flat → get a better model/features", text: "The curve tells you which lever pays off: more data, or a more capable model." }
    }
  });

  q("msel2", {
    q: "On a 200-row test set, model A scores 84% and model B scores 85%. A teammate declares B the winner. What's the sound response?",
    choices: [
      "A 1-point gap on 200 rows is well within noise — the difference isn't statistically meaningful",
      "B clearly wins; any positive gap settles it regardless of sample size",
      "A wins, because smaller models are always safer to deploy",
      "Retrain B ten times and ship it if it wins most rounds on the same 200 rows",
      "The gap proves B generalises better to all future data"
    ],
    explain: "On 200 rows, the margin of error on an accuracy estimate is roughly plus or minus 5 points — far larger than the 1-point gap. That gap could easily flip on a different 200 rows. To claim B is really better you'd need a bigger test set, cross-validation across folds, or a proper significance check. Treat tiny gaps on small data as ties.",
    simple: "On only 200 rows, scores naturally wobble by several points, so a 1-point lead is basically a coin flip. Don't crown a winner over noise. Either get more test data or compare across many folds before believing the gap.",
    widget: {
      type: "curveStatic", title: "How big is the noise band?",
      world: "The wobble (margin of error) on an accuracy estimate shrinks only as the test set grows. Compare it to a 1-point gap.",
      xlab: "test-set size →", xs: [0,1,2,3,4], labels: ["100","200","500","2000","10000"], dec: 0, yunit: "%",
      series: [ { name: "noise band on the score (±)", ys: [10,7,4,2,1] } ],
      knob: { label: "Test size", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "At 100 rows the score can swing by ±10 points — a 1-point gap is invisible in that fog.", tone: "info" },
        { max: 3, text: "Even at 500 rows the band is ±4, still wider than a 1-point difference. The gap is not yet real.", tone: "info" },
        { max: 4, text: "🤯 You'd need thousands of test rows for a 1-point gap to poke above the noise. On 200 rows, 84% vs 85% is a tie.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Small gaps are noise", formula: "margin of error ≈ shrinks like 1/√n — compare gap to it", text: "A difference smaller than the noise band isn't a difference. On small data, tiny gaps are ties." }
    }
  });

  def("msel2", {
    q: "What is the one-standard-error rule in model selection?",
    choices: [
      "Among models within one standard error of the best CV score, pick the simplest one",
      "Always pick the model with the single highest CV score, ignoring its variance",
      "Reject any model whose error is more than one standard deviation from zero",
      "Add one standard error to every score before comparing models",
      "Keep only models that trained within one standard error of the fastest time"
    ],
    explain: "Cross-validation scores come with a spread (a standard error). The one-standard-error rule says: find the best average score, then among all models whose score is within one standard error of it — statistically tied with the best — choose the simplest. It's a principled way to favour parsimony without meaningfully sacrificing performance.",
    simple: "The top model and a few simpler ones are often statistically tied. The one-standard-error rule tells you to take the simplest model that's close enough to the best. You lose almost nothing in score and gain simplicity.",
    widget: {
      type: "curveStatic", title: "Simplest within one standard error",
      world: "Cross-validation scores across models of rising complexity. The best is at 86%; one standard error is ±1.5.",
      xlab: "model complexity →", xs: [0,1,2,3,4], labels: ["v.simple","simple","medium","complex","v.complex"], dec: 0, yunit: "%",
      series: [ { name: "CV score", ys: [82,85,86,85,84] } ],
      knob: { label: "Complexity", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "The very simple model scores 82% — more than one standard error below the best, so it's genuinely worse.", tone: "info" },
        { max: 3, text: "The 'simple' model scores 85%, within 1.5 points of the 86% best — statistically a tie.", tone: "info" },
        { max: 4, text: "🤯 The rule says take that simple 85% model, not the peak. Within one standard error, simpler wins — same performance, less risk.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "One-standard-error rule", formula: "simplest model within 1 SE of the best CV score", text: "Statistically-tied models are a tie; break it toward simplicity. Parsimony, made rigorous." }
    }
  });

  /* ============================ msel3 — Part III · Advanced Study (6) ============================ */

  def("msel3", {
    q: "What is nested cross-validation?",
    choices: [
      "A CV loop for estimating performance wrapped around an inner CV loop that does the tuning",
      "Cross-validation run twice on the same folds to reduce randomness",
      "Cross-validation where each fold is itself split into a train and test set once",
      "Averaging the results of two unrelated cross-validation runs",
      "Cross-validation applied only to the hyperparameters, not the model"
    ],
    explain: "Nested CV has two loops. The inner loop does hyperparameter tuning on the training portion of each outer fold; the outer loop then measures the tuned model on that fold's held-out data. Because tuning happens fresh inside each outer fold — never touching that fold's test data — the outer scores give an unbiased estimate of a tuned model's performance. The price is many model fits.",
    simple: "It's cross-validation inside cross-validation. The inner loop tunes the settings; the outer loop grades the tuned model on data the tuning never saw. That separation is what makes the final estimate honest — but it's expensive.",
    widget: {
      type: "curveStatic", title: "The price of an honest tuned estimate",
      world: "Total model fits for nested CV (5 outer x 5 inner folds) as the hyperparameter grid grows.",
      xlab: "grid points to tune over →", xs: [0,1,2,3,4], labels: ["1","2","3","4","5"], dec: 0, yunit: "",
      series: [ { name: "model fits required", ys: [25,50,75,100,125] } ],
      knob: { label: "Grid size", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With one setting to check, 5 outer x 5 inner folds already means 25 fits.", tone: "info" },
        { max: 3, text: "Three grid points triples the inner work: 75 fits. The two loops multiply together.", tone: "info" },
        { max: 4, text: "🤯 Five grid points and it's 125 fits — for the honesty of not letting tuning peek at the test folds. Correctness has a compute bill.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Nested cross-validation", formula: "outer loop estimates · inner loop tunes", text: "Tuning lives inside each outer fold, so the outer score never sees data the tuning used. Honest, but costly." }
    }
  });

  def("msel3", {
    q: "What is the bias-variance tradeoff?",
    choices: [
      "Simple models err by being too rigid (bias); complex ones err by chasing noise (variance); the best balances the two",
      "The tradeoff between training time and prediction time for a model",
      "The choice between biased and unbiased estimators of the mean",
      "The balance between how much data goes to training versus testing",
      "The conflict between a model's accuracy and its interpretability"
    ],
    explain: "Prediction error splits into bias (error from a model too simple to capture the truth) and variance (error from a model so flexible it fits the training data's noise). Making a model more complex lowers bias but raises variance, and vice versa. Total error is U-shaped, minimised at the complexity that balances the two — which is exactly what model selection hunts for.",
    simple: "Too-simple models miss the real pattern (high bias). Too-complex models memorise noise (high variance). The best model sits in the middle, and finding that middle is the whole game of model selection.",
    widget: {
      type: "curveStatic", title: "The U-shaped total error",
      world: "How bias, variance, and their sum change as a model gets more complex. Watch the total dip then rise.",
      xlab: "model complexity →", xs: [0,1,2,3,4], labels: ["v.low","low","medium","high","v.high"], dec: 0, yunit: "%",
      series: [ { name: "total error", ys: [45,35,33,40,53] }, { name: "bias", ys: [40,25,15,10,8] }, { name: "variance", ys: [5,10,18,30,45] } ],
      knob: { label: "Complexity", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Very simple: bias is huge (40) — the model is too rigid to fit the pattern. Underfitting.", tone: "info" },
        { max: 3, text: "As complexity rises, bias falls but variance climbs. Total error bottoms out at medium complexity (33).", tone: "info" },
        { max: 4, text: "🤯 Very complex: variance explodes to 45 and total error climbs back to 53. Overfitting. The best model lives at the bottom of the U.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Bias-variance tradeoff", formula: "error = bias² + variance + noise", text: "Rigid models are biased; flexible ones are high-variance. Model selection finds the balance point." }
    }
  });

  def("msel3", {
    q: "What does the No Free Lunch theorem say about model selection?",
    choices: [
      "No single algorithm is best across all possible problems — which model wins depends on the problem",
      "Every model performs equally well if you tune it long enough",
      "The most complex model always wins, given enough compute",
      "You can always get a better model for free by adding more data",
      "Cross-validation guarantees you find the globally optimal model"
    ],
    explain: "The No Free Lunch theorem states that, averaged over all possible problems, every algorithm performs the same — so no method is universally superior. The practical lesson: there's no 'best model' in the abstract. You have to try several candidates on YOUR data and let evidence, not reputation, pick the winner.",
    simple: "There's no single best algorithm for everything. A model that shines on one problem can flop on another. So you can't just pick the trendy model — you have to test a few on your actual data and compare.",
    widget: {
      type: "curveStatic", title: "Different champions on different problems",
      world: "Two algorithms across five different problem types. Notice neither one wins everywhere.",
      xlab: "problem type →", xs: [0,1,2,3,4], labels: ["images","tabular","text","time-series","graphs"], dec: 0, yunit: "%",
      series: [ { name: "algorithm A", ys: [90,60,85,55,72] }, { name: "algorithm B", ys: [55,88,60,90,72] } ],
      knob: { label: "Problem", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "On images, algorithm A crushes B (90 vs 55). Easy call — here.", tone: "info" },
        { max: 3, text: "But on tabular and time-series data, algorithm B wins decisively. The champion flips with the problem.", tone: "info" },
        { max: 4, text: "🤯 Averaged across all five problems, A and B tie. No algorithm is best everywhere — you must test on YOUR problem.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "No Free Lunch theorem", formula: "averaged over all problems, all algorithms tie", text: "There is no universally best model. Let evidence on your own data choose the winner." }
    }
  });

  q("msel3", {
    q: "You want to BOTH tune hyperparameters AND report an honest performance estimate. Why isn't a single cross-validation loop enough — why add an outer loop?",
    choices: [
      "If you tune and estimate on the same folds, the reported score is optimistic; the outer loop estimates on data the tuning never saw",
      "One loop is enough; the outer loop only speeds up the computation",
      "The outer loop is needed only to shuffle the data more times",
      "A single loop can't handle more than one hyperparameter at a time",
      "The outer loop retrains the final model on the full dataset for deployment"
    ],
    explain: "If you pick the best hyperparameters using the same CV scores you then report, you've selected on that data — the winning score is inflated by the same noise you optimised against, just like overfitting a validation set. Nested CV fixes this: the inner loop tunes, and the outer loop scores the tuned model on folds the tuning never touched, giving an unbiased estimate.",
    simple: "If you use the same scores to both pick the settings and report the result, the result is too rosy — you optimised against that very data. The outer loop grades the tuned model on fresh folds, so the number you report is honest.",
    widget: {
      type: "curveStatic", title: "Why tuning needs its own outer judge",
      world: "The gap between a plain tuned-CV score and the truth, versus nested CV, as you tune over more settings.",
      xlab: "hyperparameter settings tuned over →", xs: [0,1,2,3,4], labels: ["1","5","20","50","100"], dec: 0, yunit: "%",
      series: [ { name: "plain tuned-CV optimism", ys: [0,2,5,8,12] }, { name: "nested-CV optimism", ys: [0,0,1,1,1] } ],
      knob: { label: "Settings tuned", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Tuning over a single setting, both approaches are honest — nothing was cherry-picked.", tone: "info" },
        { max: 3, text: "Tuning over 20 settings, the plain single-loop score is already inflated by 5 points; nested CV stays near 0.", tone: "info" },
        { max: 4, text: "🤯 Tune over 100 settings and the single loop overstates by 12 points, while nested CV holds at ~1. The outer loop is what buys the honesty.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Why the outer loop", formula: "tune inside · estimate outside → unbiased score", text: "Selecting and reporting on the same folds inflates the score. The outer loop scores on untouched data." }
    }
  });

  q("msel3", {
    q: "A deep tree nails the training data but flops on new data, while a stump underperforms on both. Through the bias-variance lens, what's the fix?",
    choices: [
      "Pick a middle complexity — the deep tree is high-variance, the stump high-bias; the best model balances them",
      "Always choose the deep tree; a perfect training fit is what matters",
      "Always choose the stump; simpler models are correct by default",
      "Add more features to the deep tree so it overfits even harder",
      "Train the deep tree longer until its test error catches up"
    ],
    explain: "The deep tree has low bias but high variance — it fits noise, so it generalises poorly. The stump has high bias — too rigid to capture the pattern. Neither extreme is right; the fix is to dial complexity (tree depth, pruning, regularisation) to the point where validation error is lowest, balancing the two error sources.",
    simple: "The deep tree memorises noise (high variance); the stump is too simple to learn the pattern (high bias). The answer is a tree in between — deep enough to learn, shallow enough not to memorise. That balance point is what you tune toward.",
    widget: {
      type: "curveStatic", title: "Dial complexity to the valley",
      world: "Validation error as tree depth grows from stump to fully-grown. Find the bottom of the valley.",
      xlab: "tree depth →", xs: [0,1,2,3,4], labels: ["stump","shallow","medium","deep","v.deep"], dec: 0, yunit: "%",
      series: [ { name: "validation error", ys: [30,18,15,22,35] } ],
      knob: { label: "Depth", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "The stump errs 30% — too rigid to capture the pattern. That's bias.", tone: "info" },
        { max: 3, text: "Medium depth reaches the lowest validation error, 15%. This is the balance point.", tone: "info" },
        { max: 4, text: "🤯 Very deep, error climbs back to 35% — the tree memorised noise. That's variance. Neither extreme wins; the valley does.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Bias-variance in selection", formula: "tune complexity to minimise validation error", text: "Underfitting and overfitting are two sides of one dial. Turn it to the valley, not the extremes." }
    }
  });

  q("msel3", {
    q: "Given the No Free Lunch theorem, what's the practical strategy when starting a new prediction problem?",
    choices: [
      "Try a few diverse model families and compare them fairly with cross-validation on your own data",
      "Pick the model that won the most Kaggle competitions and skip comparison",
      "Always start with the most complex model available and simplify only if it fails",
      "Choose whichever model your last project used, to save time",
      "Trust published benchmarks and never test on your own data"
    ],
    explain: "No Free Lunch means no model is best in the abstract, so reputation and benchmarks from other problems aren't decisive for yours. The sound move is to shortlist a few genuinely different model families, evaluate them fairly with cross-validation on your data, and let the evidence choose. Trying more families helps at first, then plateaus.",
    simple: "Since no model is best for everything, don't just pick the famous one. Try a handful of different models on your actual data and compare them fairly with cross-validation. Let your data pick the winner.",
    widget: {
      type: "curveStatic", title: "Trying a few families pays off",
      world: "The best cross-validated score you've found as you evaluate more distinct model families on your own data.",
      xlab: "model families tried →", xs: [0,1,2,3,4], labels: ["1","2","3","5","8"], dec: 0, yunit: "%",
      series: [ { name: "best CV score so far", ys: [72,80,84,86,86] } ],
      knob: { label: "Families", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Betting on a single family lands 72% — fine, but you don't know if it's the right tool.", tone: "info" },
        { max: 3, text: "Trying a second and third family jumps you to 80%, then 84%. Diversity finds a better fit.", tone: "info" },
        { max: 4, text: "🤯 Beyond about 5 families the best score plateaus at 86%. Try a few, compare fairly, then stop — evidence, not reputation, decides.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "No Free Lunch, applied", formula: "shortlist diverse families → compare by CV → let data pick", text: "No model is best a priori. Test a few on your data and let cross-validation choose." }
    }
  });

}());
