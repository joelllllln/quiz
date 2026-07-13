/* Model Selection — answer-breakdown ladders (ground-up). */
window.STEPS = window.STEPS || {};

/* ============================ msel1 — Part I · Foundations (15) ============================ */

window.STEPS["What is model selection?"] = [
  { "q": "When do you have more than one model to consider?", "ok": "When you have several algorithms, or one algorithm with different settings", "no": ["Only when a model fails to train", "Never — there is always one right model"] },
  { "q": "What makes a training-data score untrustworthy for choosing?", "ok": "Fit on data a model trained on is easy to fake", "no": ["Training scores are always too low", "It can only be measured for regression"] },
  { "q": "So which data should you judge candidates on?", "ok": "Data the candidate was NOT trained on", "no": ["The data it was trained on", "The largest slice available"] },
  { "q": "Once you have held-out scores, what do you do?", "ok": "Keep the candidate that scores best", "no": ["Keep the one that trained fastest", "Average all of them together"] },
  { "q": "So what is model selection?", "ok": "Choosing which model (and settings) to use, by comparing candidates on data they were not trained on", "no": ["Training one model until its training error hits zero", "Deploying whichever model trained fastest"] }
];

window.STEPS["What is a baseline model?"] = [
  { "q": "How complex should a baseline be?", "ok": "As simple as possible — a trivial guess", "no": ["The most complex model you can build", "Exactly as complex as your real model"] },
  { "q": "What might a baseline do on a classification task?", "ok": "Always predict the most common class", "no": ["Predict a different class each time at random forever", "Refuse to predict anything"] },
  { "q": "What does the baseline give your real model's score?", "ok": "Meaning — a reference point to beat", "no": ["A higher value automatically", "Legal approval"] },
  { "q": "If your model can't beat the baseline, then...", "ok": "Your fancy model is adding nothing", "no": ["Your model is still clearly better", "You should make the baseline stronger"] },
  { "q": "So what is a baseline model?", "ok": "A deliberately simple model whose score any serious model must beat to prove it is worth anything", "no": ["The final model you ship after tuning", "The model with the most parameters"] }
];

window.STEPS["What is a train / validation / test split?"] = [
  { "q": "How many piles do you cut the data into?", "ok": "Three", "no": ["Two", "As many as there are features"] },
  { "q": "What is the training set for?", "ok": "The model learns from it", "no": ["Reporting the final score", "Comparing candidate models"] },
  { "q": "What is the validation set for?", "ok": "Tuning settings and comparing candidates", "no": ["Learning the model's weights", "The one honest final grade"] },
  { "q": "What is the test set for?", "ok": "One final honest score, opened at the very end", "no": ["Tuning hyperparameters repeatedly", "Teaching the model"] },
  { "q": "So what is a train / validation / test split?", "ok": "Cutting the data into three roles: one to learn from, one to tune and compare on, one to report the final honest score", "no": ["Splitting into three equal thirds and training a model on each", "Dividing the data by date into calendar quarters"] }
];

window.STEPS["What is a holdout (validation) set?"] = [
  { "q": "Is the holdout set used to train the model?", "ok": "No — it is kept out of training", "no": ["Yes, it trains the final model", "Yes, it retrains after deployment"] },
  { "q": "What does keeping it out let you observe?", "ok": "How the model behaves on unseen examples", "no": ["How well it memorised the training rows", "How fast it trains"] },
  { "q": "What do you use it for during development?", "ok": "Compare candidates and pick settings", "no": ["Report the final honest score", "Collect new labels"] },
  { "q": "Why isn't it your final honest grade?", "ok": "You look at it repeatedly, so it loses innocence", "no": ["It is too small to grade on", "It contains no labels"] },
  { "q": "So what is a holdout (validation) set?", "ok": "A slice of data kept out of training, used to compare models and pick settings during development", "no": ["The portion used to train the final model", "The single hardest example held back"] }
];

window.STEPS["What is cross-validation?"] = [
  { "q": "What is risky about trusting one holdout split?", "ok": "That single split could be lucky or unlucky", "no": ["It uses too much training data", "Splits never vary in difficulty"] },
  { "q": "The fix: rotate which slice is held out so that...", "ok": "Every row gets a turn as validation", "no": ["Only the first slice is ever tested", "The same rows always validate"] },
  { "q": "After scoring on each rotation, what do you do?", "ok": "Average the scores", "no": ["Keep only the highest score", "Keep only the lowest score"] },
  { "q": "Why is the average better than one split?", "ok": "It kills the luck of a single draw", "no": ["It is always higher", "It is faster to compute"] },
  { "q": "So what is cross-validation?", "ok": "Rotating which slice of data is held out so every row gets a turn as validation, then averaging the scores", "no": ["Training the same model twice and keeping the higher run", "Testing on a different project's dataset"] }
];

window.STEPS["What is k-fold cross-validation?"] = [
  { "q": "First, how do you cut the data?", "ok": "Into k equal folds", "no": ["Into two unequal halves", "Into as many folds as there are rows, always"] },
  { "q": "How many times do you train?", "ok": "k times", "no": ["Once", "k squared times"] },
  { "q": "Each training run holds out which part?", "ok": "A different fold, while the rest train the model", "no": ["The same fold every time", "No fold — it uses everything"] },
  { "q": "What do you do with the k scores?", "ok": "Average them", "no": ["Keep only the best", "Multiply them together"] },
  { "q": "What do common choices of k look like?", "ok": "k = 5 or 10 balances a steady estimate against compute", "no": ["k = 1 is standard", "k must equal the number of features"] },
  { "q": "So what is k-fold cross-validation?", "ok": "Splitting data into k equal folds, then training k times, each time holding out a different fold as validation", "no": ["Training k times on the exact same data", "Running k algorithms and picking the fastest"] }
];

window.STEPS["What is hyperparameter tuning?"] = [
  { "q": "What is a hyperparameter?", "ok": "A setting you choose before training, like depth or k", "no": ["A weight the model learns on its own", "A prediction made after training"] },
  { "q": "Can the model learn these knobs by itself?", "ok": "No — you must pick them", "no": ["Yes, always automatically", "Only for neural networks"] },
  { "q": "How do you try candidate values?", "ok": "Systematically try values and measure each", "no": ["Guess one value and never revisit it", "Set them equal to the row count"] },
  { "q": "You measure each value on which data?", "ok": "Validation data", "no": ["The training data", "The sealed test set"] },
  { "q": "Then which value do you keep?", "ok": "The one that validated best", "no": ["The one with the highest training score", "The smallest value always"] },
  { "q": "So what is hyperparameter tuning?", "ok": "Trying different values for settings you choose (like depth or k) and keeping the value that validates best", "no": ["Letting the model learn its own weights from training data", "Adjusting predictions by hand after training"] }
];

window.STEPS["What is Occam's razor (parsimony) in modelling?"] = [
  { "q": "What does 'parsimony' favour?", "ok": "Not adding complexity you don't need", "no": ["Adding every feature you can", "Maximising parameter count"] },
  { "q": "When two models perform about equally on unseen data...", "ok": "They are essentially tied", "no": ["The complex one is automatically better", "The faster one must be worse"] },
  { "q": "Why prefer the simpler of two tied models?", "ok": "Easier to understand, cheaper to run, less likely to fit noise", "no": ["It always scores higher", "It has more parameters to tune"] },
  { "q": "What must extra complexity do to earn its place?", "ok": "Deliver a real, measurable gain", "no": ["Nothing — complexity is free", "Only run faster"] },
  { "q": "So what is Occam's razor in modelling?", "ok": "When two models fit about equally well, prefer the simpler one", "no": ["Always pick the model with the most features", "Choose the model that trains fastest"] }
];

window.STEPS["Why must you NOT use the test set to choose between models — only look at it once, at the very end?"] = [
  { "q": "What is the test set's only real value?", "ok": "Being untouched — standing in for future unseen data", "no": ["Being the largest slice", "Containing the labels"] },
  { "q": "What happens the moment you use it to pick a model?", "ok": "You start fitting to its particular noise", "no": ["It gets physically erased", "It becomes larger"] },
  { "q": "As you keep peeking, its score becomes...", "ok": "Optimistic — no longer honest", "no": ["More accurate", "Legally invalid"] },
  { "q": "So what should all comparisons use instead?", "ok": "The validation set", "no": ["The test set, carefully", "The training set"] },
  { "q": "So why look at the test set only once, at the end?", "ok": "Every peek lets you tune to the test set's quirks, so its score stops predicting real-world performance", "no": ["The test set is always too small to compare models", "Looking at it erases it technically"] }
];

window.STEPS["You compared two models with a single 80/20 holdout and model B won by 2 points. A colleague warns this could be luck. What is the more reliable way to compare them?"] = [
  { "q": "A single 80/20 holdout is like...", "ok": "One roll of the dice", "no": ["A rock-solid verdict", "The average of many splits"] },
  { "q": "Could a 2-point gap flip on a different split?", "ok": "Yes, easily", "no": ["No, it is fixed", "Only if the model changes"] },
  { "q": "What gives a more stable comparison?", "ok": "Scoring each model on several rotating folds", "no": ["Rerunning the same single split", "Comparing on the training data"] },
  { "q": "Then what do you compare?", "ok": "Their average scores across the folds", "no": ["Just the single best fold", "Their training times"] },
  { "q": "So what is the more reliable way to compare them?", "ok": "Use k-fold cross-validation and compare their AVERAGE scores across the folds", "no": ["Rerun the same single split a few times and trust whoever wins most", "Pick model B — a win is a win"] }
];

window.STEPS["Two models are essentially tied on validation accuracy: a 3-line logistic regression and a giant black-box ensemble. Which should you generally ship?"] = [
  { "q": "The two models score about the same, so accuracy is...", "ok": "Essentially a tie", "no": ["Clearly won by the ensemble", "Undecidable forever"] },
  { "q": "Which principle applies to a tie?", "ok": "Occam's razor — prefer the simpler model", "no": ["Always pick the biggest model", "Always retrain from scratch"] },
  { "q": "On what practical axes does the simple model win?", "ok": "Cheaper to serve, easier to debug and explain, less overfitting risk", "no": ["Higher accuracy guaranteed", "More impressive to reviewers"] },
  { "q": "When is heavy machinery actually worth it?", "ok": "When it delivers a real, measurable edge", "no": ["Always, for robustness", "Never, under any circumstance"] },
  { "q": "So which model should you generally ship?", "ok": "The simple logistic regression — a tie should go to the model that's easier to run, explain, and trust", "no": ["The giant ensemble — more complexity means more robustness", "Neither — retrain both until one clearly wins"] }
];

window.STEPS["What are the distinct roles of the validation set versus the test set?"] = [
  { "q": "How often do you consult the validation set?", "ok": "Again and again, during development", "no": ["Exactly once, at the very end", "Never"] },
  { "q": "What does the validation set do?", "ok": "Compare models and pick settings", "no": ["Give the final honest score", "Train the model's weights"] },
  { "q": "How often do you open the test set?", "ok": "Exactly once, at the very end", "no": ["Repeatedly while tuning", "Before training starts"] },
  { "q": "Why does the test set stay trustworthy?", "ok": "It stays sealed until read once", "no": ["It is bigger than validation", "It is used only for regression"] },
  { "q": "So what are their distinct roles?", "ok": "Validation is looked at repeatedly to choose models; test is opened once at the end for the honest score", "no": ["Validation gives the final score; test tunes hyperparameters", "They are interchangeable at any time"] }
];

window.STEPS["Your model reports 88% accuracy. Before celebrating, what single fact do you most need to judge whether that's good?"] = [
  { "q": "Is a raw score meaningful all by itself?", "ok": "No — it needs context", "no": ["Yes, 88% is always great", "Only for neural networks"] },
  { "q": "If 88% of the data is one class, what does always-guessing score?", "ok": "About 88% too", "no": ["About 0%", "About 50% always"] },
  { "q": "What is that always-guess score called?", "ok": "The baseline", "no": ["The test score", "The learning rate"] },
  { "q": "The baseline turns 88% from a number into...", "ok": "A judgement", "no": ["A guarantee", "A random value"] },
  { "q": "So what single fact do you most need?", "ok": "The baseline score — what a trivial always-guess model gets on the same problem", "no": ["How long the model took to train", "How many hyperparameters it has"] }
];

window.STEPS["You're tuning the number of neighbours k in k-NN. Concretely, what does 'tuning' this hyperparameter involve?"] = [
  { "q": "Can k-NN learn its own best k during training?", "ok": "No — you must choose k", "no": ["Yes, automatically", "Only if you add more features"] },
  { "q": "How do you explore k?", "ok": "Try several values like 1, 3, 5, 7", "no": ["Pick one value and never change it", "Set k to the number of features"] },
  { "q": "You score each k on which data?", "ok": "Held-out validation data", "no": ["The training data", "The sealed test set"] },
  { "q": "Why not judge k on training data?", "ok": "k=1 always fits the training set perfectly — a trap", "no": ["Training data is too small", "It's illegal"] },
  { "q": "Then which k do you keep?", "ok": "The one that scores best on validation", "no": ["The smallest k always", "The largest k always"] },
  { "q": "So what does tuning k involve?", "ok": "Trying several values of k, scoring each on validation data, and keeping the k that scores best", "no": ["Letting the model discover the best k during training", "Setting k equal to the number of features"] }
];

window.STEPS["Why can't you select the best model by simply picking whichever one scores highest on the training data?"] = [
  { "q": "What does a training score measure?", "ok": "Memorisation of the rows the model already saw", "no": ["Performance on new data", "The model's simplicity"] },
  { "q": "What can a flexible model do to its training rows?", "ok": "Fit them almost perfectly, including their noise", "no": ["Only fit half of them", "Never reach high accuracy"] },
  { "q": "Does acing the training data mean it generalises?", "ok": "No — it can still fail on new data", "no": ["Yes, always", "Only for small datasets"] },
  { "q": "So what should model selection reward?", "ok": "Learning the pattern, judged on held-out data", "no": ["Memorising the answers", "The fastest training time"] },
  { "q": "So why can't you select on the highest training score?", "ok": "A complex enough model can memorise the training data and score near 100% while failing on new data", "no": ["Training scores are always lower than validation scores", "The highest training score is always the simplest model"] }
];

/* ============================ msel2 — Part II · Practice (9) ============================ */

window.STEPS["What is grid search for hyperparameters?"] = [
  { "q": "First you lay out what?", "ok": "A grid of candidate values for each hyperparameter", "no": ["A single random value", "The model's learned weights"] },
  { "q": "How many combinations does grid search evaluate?", "ok": "Every combination on the grid", "no": ["Just one at random", "Only the corners"] },
  { "q": "You score each combination on which data?", "ok": "Validation data", "no": ["Training data", "The sealed test set"] },
  { "q": "What is the downside as you add hyperparameters?", "ok": "The number of combinations multiplies — it explodes", "no": ["It gets cheaper", "It stays constant"] },
  { "q": "So what is grid search?", "ok": "Trying every combination from a fixed grid of candidate values and keeping the best-scoring one", "no": ["Randomly sampling a few settings and stopping when one looks good", "Letting the model adjust its own hyperparameters"] }
];

window.STEPS["What is random search for hyperparameters?"] = [
  { "q": "Instead of a rigid grid, what do you draw?", "ok": "Random combinations from ranges you specify", "no": ["Every point on a lattice", "The model's weights"] },
  { "q": "How many do you try?", "ok": "A fixed budget of trials, say 30", "no": ["Exactly one", "Every possible value"] },
  { "q": "Which do you keep?", "ok": "The best-scoring combination", "no": ["The last one tried", "The first one tried"] },
  { "q": "Why can it beat grid search for the same budget?", "ok": "It explores more distinct values of the knobs that matter", "no": ["It trains each model faster", "It always finds the exact optimum"] },
  { "q": "So what is random search?", "ok": "Sampling random combinations of hyperparameter values for a fixed budget of trials, keeping the best", "no": ["Assigning every hyperparameter a random value once and shipping it", "Shuffling the training data before each epoch"] }
];

window.STEPS["What is stratified k-fold cross-validation?"] = [
  { "q": "With plain random folds and an imbalanced target, what can go wrong?", "ok": "A fold may get very few or zero minority-class examples", "no": ["Folds become too large", "The model trains too fast"] },
  { "q": "What does that do to such a fold's score?", "ok": "Makes it meaningless", "no": ["Makes it more accurate", "Has no effect"] },
  { "q": "What does stratified k-fold enforce in each fold?", "ok": "The same class proportions as the whole dataset", "no": ["Only one class per fold", "Folds sorted by target value"] },
  { "q": "So each fold becomes a fair...", "ok": "Miniature of the whole", "no": ["Copy of one class", "Random subset with no structure"] },
  { "q": "So what is stratified k-fold cross-validation?", "ok": "k-fold where each fold is built to keep the same class proportions as the whole dataset", "no": ["k-fold where folds are sorted by target value", "k-fold where each fold contains only one class"] }
];

window.STEPS["You're forecasting next month's sales from past months. Why is ordinary shuffled k-fold the wrong way to validate, and what should you use instead?"] = [
  { "q": "In a time series, what carries information?", "ok": "The order of the data", "no": ["Nothing — order is irrelevant", "Only the column names"] },
  { "q": "What does shuffled k-fold let the model do?", "ok": "Train on future months to predict earlier ones", "no": ["Only ever train on the past", "Ignore the target entirely"] },
  { "q": "What does that produce?", "ok": "Wildly optimistic, fake-good scores", "no": ["Honest scores", "Scores that are too low"] },
  { "q": "What should a time-based split always do?", "ok": "Train on earlier data, validate on later data", "no": ["Train on later, test on earlier", "Shuffle more times"] },
  { "q": "So why is shuffled k-fold wrong, and what should you use?", "ok": "Shuffling leaks the future into the training folds; use a time-based split that always trains on the past and tests on later data", "no": ["Shuffling is fine; just use more folds", "Time series can't be cross-validated at all"] }
];

window.STEPS["You have 6 hyperparameters to tune and a fixed compute budget. Why do practitioners often prefer random search over a full grid here?"] = [
  { "q": "With 6 knobs and 4 values each, how many grid points?", "ok": "4^6 = 4096 — often unaffordable", "no": ["Just 24", "Exactly 6"] },
  { "q": "How does grid cost grow with each added knob?", "ok": "It multiplies — exponentially", "no": ["It stays flat", "It shrinks"] },
  { "q": "What does random search spend on a fixed budget?", "ok": "The same number of trials, spread across the space", "no": ["An exploding number of trials", "Zero trials"] },
  { "q": "What does random search try many distinct values of?", "ok": "The hyperparameters that actually matter", "no": ["Only the irrelevant knobs", "The same few grid values"] },
  { "q": "So why prefer random search with many knobs?", "ok": "A grid's combinations explode with each knob, while random search covers the space far better for the same fixed budget", "no": ["Random search always finds the exact optimum grid misses", "Grid search can't handle more than two hyperparameters"] }
];

window.STEPS["You tried 200 model variants and picked the one with the best validation score. Why is that winning validation score likely too optimistic?"] = [
  { "q": "Does each validation score carry some randomness?", "ok": "Yes — some random noise", "no": ["No, they are exact", "Only for regression"] },
  { "q": "Try enough models and the 'winner' is often...", "ok": "The one that got the luckiest noise draw", "no": ["Genuinely the best by a wide margin", "The slowest to train"] },
  { "q": "What have you effectively overfit by comparing so much?", "ok": "The validation set", "no": ["The training set", "The test set"] },
  { "q": "So the winner's validation score...", "ok": "Overstates its true quality", "no": ["Understates its quality", "Is perfectly honest"] },
  { "q": "So why is the winning validation score too optimistic?", "ok": "With enough tries, some model looks best partly by fitting the validation set's random noise", "no": ["Validation sets are always smaller than test sets", "The 200th model always overfits by design"] }
];

window.STEPS["Your learning curve shows validation accuracy has flattened out and adding more training data barely helps. What does this tell you to do next?"] = [
  { "q": "What does a learning curve plot?", "ok": "Performance against training-set size", "no": ["Accuracy against training time", "Depth against number of leaves"] },
  { "q": "A flat plateau means you've hit the ceiling of...", "ok": "What THIS model can extract from THIS data", "no": ["How fast the model can train", "The size of the test set"] },
  { "q": "Would more rows help much at the plateau?", "ok": "No — they just retrace the flat line", "no": ["Yes, the curve shoots up again", "Yes, always"] },
  { "q": "What lever should you pull instead?", "ok": "Better features or a more capable model", "no": ["A simpler model", "A smaller training set"] },
  { "q": "So what should you do next?", "ok": "More data won't help much — invest in better features or a more capable model instead", "no": ["Keep collecting data; the curve will shoot up again", "Reduce the training set to train faster"] }
];

window.STEPS["On a 200-row test set, model A scores 84% and model B scores 85%. A teammate declares B the winner. What's the sound response?"] = [
  { "q": "How big is the gap between A and B?", "ok": "One point", "no": ["Ten points", "Fifty points"] },
  { "q": "On 200 rows, roughly how big is the margin of error?", "ok": "About plus or minus 5 points", "no": ["Less than 0.1 point", "Exactly zero"] },
  { "q": "Is the 1-point gap bigger or smaller than the noise?", "ok": "Much smaller — buried in the noise", "no": ["Much bigger", "Exactly equal"] },
  { "q": "Could the gap flip on a different 200 rows?", "ok": "Yes, easily", "no": ["No, it is fixed", "Only if the model changes"] },
  { "q": "So what's the sound response?", "ok": "A 1-point gap on 200 rows is well within noise — the difference isn't statistically meaningful", "no": ["B clearly wins; any positive gap settles it", "A wins because smaller models are safer"] }
];

window.STEPS["What is the one-standard-error rule in model selection?"] = [
  { "q": "What do cross-validation scores come with?", "ok": "A spread — a standard error", "no": ["A single exact value only", "A guaranteed ranking"] },
  { "q": "First, what do you find?", "ok": "The best average CV score", "no": ["The worst score", "The fastest model"] },
  { "q": "Which models count as statistically tied with the best?", "ok": "Those within one standard error of it", "no": ["Only the single top scorer", "All models regardless of score"] },
  { "q": "Among those tied models, which do you pick?", "ok": "The simplest one", "no": ["The most complex one", "The slowest one"] },
  { "q": "So what is the one-standard-error rule?", "ok": "Among models within one standard error of the best CV score, pick the simplest one", "no": ["Always pick the single highest CV score, ignoring variance", "Add one standard error to every score before comparing"] }
];

/* ============================ msel3 — Part III · Advanced Study (6) ============================ */

window.STEPS["What is nested cross-validation?"] = [
  { "q": "How many CV loops does nested CV have?", "ok": "Two — an inner and an outer", "no": ["Just one", "As many as there are folds"] },
  { "q": "What does the inner loop do?", "ok": "Tunes hyperparameters on each outer fold's training portion", "no": ["Reports the final score", "Trains the deployed model"] },
  { "q": "What does the outer loop do?", "ok": "Measures the tuned model on that fold's held-out data", "no": ["Tunes the hyperparameters", "Shuffles the data"] },
  { "q": "Why is the outer score unbiased?", "ok": "Tuning never touches that fold's test data", "no": ["Because it runs faster", "Because it uses more folds"] },
  { "q": "What is the price of this honesty?", "ok": "Many model fits — it's expensive", "no": ["It's actually cheaper", "No extra cost at all"] },
  { "q": "So what is nested cross-validation?", "ok": "A CV loop for estimating performance wrapped around an inner CV loop that does the tuning", "no": ["Cross-validation run twice on the same folds", "Averaging two unrelated CV runs"] }
];

window.STEPS["What is the bias-variance tradeoff?"] = [
  { "q": "How does a too-simple model err?", "ok": "It's too rigid to capture the truth — high bias", "no": ["It chases noise — high variance", "It never makes errors"] },
  { "q": "How does a too-complex model err?", "ok": "It fits the training noise — high variance", "no": ["It's too rigid — high bias", "It always underfits"] },
  { "q": "As you add complexity, bias and variance...", "ok": "Bias falls, variance rises (and vice versa)", "no": ["Both always fall together", "Both stay constant"] },
  { "q": "What shape is the total error curve?", "ok": "U-shaped — minimised at a balance point", "no": ["Always decreasing", "Always increasing"] },
  { "q": "So what is the bias-variance tradeoff?", "ok": "Simple models err by being too rigid (bias); complex ones err by chasing noise (variance); the best balances the two", "no": ["The tradeoff between training time and prediction time", "The balance between training and test data amounts"] }
];

window.STEPS["What does the No Free Lunch theorem say about model selection?"] = [
  { "q": "Averaged over ALL possible problems, how do algorithms compare?", "ok": "They all perform the same", "no": ["The most complex always wins", "The simplest always wins"] },
  { "q": "So is there a universally best algorithm?", "ok": "No — none is best for everything", "no": ["Yes, the trendy one", "Yes, the deepest network"] },
  { "q": "A model that shines on one problem may...", "ok": "Flop on another", "no": ["Win on every problem", "Never be beaten"] },
  { "q": "So how should you actually pick a model?", "ok": "Test several candidates on YOUR data and let evidence decide", "no": ["Pick by reputation alone", "Pick the most complex by default"] },
  { "q": "So what does the No Free Lunch theorem say?", "ok": "No single algorithm is best across all possible problems — which model wins depends on the problem", "no": ["Every model performs equally if you tune it long enough", "The most complex model always wins with enough compute"] }
];

window.STEPS["You want to BOTH tune hyperparameters AND report an honest performance estimate. Why isn't a single cross-validation loop enough — why add an outer loop?"] = [
  { "q": "What happens if you tune and report on the same folds?", "ok": "You selected on that data, so the score is inflated", "no": ["The score is perfectly honest", "The score comes out too low"] },
  { "q": "The inflated score rides the same noise you...", "ok": "Optimised against", "no": ["Never touched", "Averaged away"] },
  { "q": "This is just like overfitting what?", "ok": "A validation set", "no": ["The training weights", "The random seed"] },
  { "q": "What does the outer loop score the tuned model on?", "ok": "Folds the tuning never touched", "no": ["The same folds it tuned on", "The training data"] },
  { "q": "So why isn't a single loop enough — why the outer loop?", "ok": "If you tune and estimate on the same folds, the reported score is optimistic; the outer loop estimates on data the tuning never saw", "no": ["One loop is enough; the outer loop only speeds things up", "The outer loop just shuffles the data more"] }
];

window.STEPS["A deep tree nails the training data but flops on new data, while a stump underperforms on both. Through the bias-variance lens, what's the fix?"] = [
  { "q": "A deep tree that nails training but flops on new data has...", "ok": "High variance — it fits noise", "no": ["High bias — too rigid", "No error at all"] },
  { "q": "A stump that underperforms on both has...", "ok": "High bias — too rigid to capture the pattern", "no": ["High variance — fits noise", "Perfect balance"] },
  { "q": "Is either extreme the right choice?", "ok": "No — neither extreme wins", "no": ["Yes, the deep tree", "Yes, the stump"] },
  { "q": "What do you dial to fix it?", "ok": "Complexity — depth, pruning, regularisation", "no": ["The number of training rows only", "The random seed"] },
  { "q": "So through the bias-variance lens, what's the fix?", "ok": "Pick a middle complexity — the deep tree is high-variance, the stump high-bias; the best model balances them", "no": ["Always choose the deep tree; a perfect training fit is what matters", "Always choose the stump; simpler is correct by default"] }
];

window.STEPS["Given the No Free Lunch theorem, what's the practical strategy when starting a new prediction problem?"] = [
  { "q": "Does No Free Lunch make a famous model the safe bet?", "ok": "No — reputation isn't decisive for your problem", "no": ["Yes, always pick the famous one", "Yes, benchmarks settle it"] },
  { "q": "How many model families should you shortlist?", "ok": "A few genuinely different ones", "no": ["Exactly one", "Every family that exists"] },
  { "q": "How do you compare them fairly?", "ok": "With cross-validation on your own data", "no": ["On the training score", "On published benchmarks alone"] },
  { "q": "Who picks the winner?", "ok": "The evidence from your data", "no": ["Reputation", "The most complex model"] },
  { "q": "So what's the practical strategy on a new problem?", "ok": "Try a few diverse model families and compare them fairly with cross-validation on your own data", "no": ["Pick the model that won the most Kaggle competitions and skip comparison", "Always start with the most complex model available"] }
];
