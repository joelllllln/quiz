/* XGBoost — answer-breakdown ladders (ground-up). */
window.STEPS = window.STEPS || {};

/* ===== xgb1 · Foundations ===== */

window.STEPS["What is XGBoost?"] = [
  { "q": "What kind of building block does XGBoost use?", "ok": "Decision trees", "no": ["Neural network layers", "Straight-line fits"] },
  { "q": "Does it use one tree or many?", "ok": "Many trees combined into an ensemble", "no": ["One very deep tree", "Exactly two trees"] },
  { "q": "How are the trees added together?", "ok": "One after another by gradient boosting", "no": ["All at once, then averaged", "Picked, keeping only the best"] },
  { "q": "What extra does XGBoost bake in for reliability?", "ok": "Speed engineering and regularization", "no": ["Image processing", "Clustering without labels"] },
  { "q": "So what is XGBoost?", "ok": "A fast, regularized library that builds an ensemble of decision trees by gradient boosting", "no": ["A single very deep decision tree that memorizes the data", "A neural network library for images and audio"] }
];

window.STEPS["What is gradient boosting (the idea XGBoost is built on)?"] = [
  { "q": "Does boosting build models together or one at a time?", "ok": "One at a time, in sequence", "no": ["All independently at once", "Only ever one model"] },
  { "q": "What does each new model focus on?", "ok": "The errors the ensemble still makes", "no": ["A fresh random relabeling", "The easiest rows already correct"] },
  { "q": "What is the effect of each added model?", "ok": "It nudges the prediction closer to the truth", "no": ["It replaces all earlier models", "It resets the ensemble"] },
  { "q": "So what is gradient boosting?", "ok": "Adding models in sequence, each new one trained to reduce the current ensemble's errors", "no": ["Training many independent trees and averaging their votes", "Picking the single best model and discarding the rest"] }
];

window.STEPS["What is regularized boosting (what the 'regularized' in XGBoost adds)?"] = [
  { "q": "What problem can plain boosting fall into?", "ok": "Overfitting by carving out noisy leaves", "no": ["Always underfitting", "Being too slow to finish"] },
  { "q": "What does 'regularization' add to the objective?", "ok": "A penalty on tree complexity", "no": ["A bonus for more leaves", "A guarantee of zero error"] },
  { "q": "What does that penalty discourage?", "ok": "Overly complex, memorizing trees", "no": ["Any use of features", "Using more than one tree"] },
  { "q": "So what is regularized boosting?", "ok": "Gradient boosting with an added penalty on tree complexity to fight overfitting", "no": ["Boosting that removes all randomness for repeatability", "Boosting that trains only on the hardest rows"] }
];

window.STEPS["What is the learning rate (eta) in XGBoost?"] = [
  { "q": "When a new tree is added, does its output go in raw or scaled?", "ok": "Scaled down first", "no": ["Always in raw", "Doubled first"] },
  { "q": "What does eta multiply?", "ok": "Each new tree's contribution", "no": ["The total number of trees", "The depth of each tree"] },
  { "q": "What does a small eta mean for each step?", "ok": "Small, cautious steps", "no": ["Bigger, riskier steps", "No steps at all"] },
  { "q": "What's the trade-off of a small eta?", "ok": "Needs more trees but generalizes better", "no": ["Needs fewer trees and less accuracy", "No trade-off at all"] },
  { "q": "So what is the learning rate (eta)?", "ok": "A factor that shrinks each new tree's contribution so the ensemble learns in small steps", "no": ["The number of trees the model will build", "The maximum depth any tree can reach"] }
];

window.STEPS["What does n_estimators (number of boosting rounds) control?"] = [
  { "q": "What is one boosting round producing?", "ok": "One new tree", "no": ["One new feature", "One new row"] },
  { "q": "So n_estimators counts what?", "ok": "The trees added in total", "no": ["The depth per tree", "The rows per leaf"] },
  { "q": "What happens with far too many trees?", "ok": "It starts fitting noise and overfits", "no": ["It always keeps improving", "It deletes earlier trees"] },
  { "q": "So what does n_estimators control?", "ok": "How many trees are added to the ensemble in total", "no": ["How deep each individual tree can grow", "How much each tree's prediction is shrunk"] }
];

window.STEPS["What does the max_depth hyperparameter control in XGBoost?"] = [
  { "q": "Does max_depth act on one tree or the whole ensemble?", "ok": "One individual tree", "no": ["The whole ensemble", "The dataset size"] },
  { "q": "What is it limiting inside a tree?", "ok": "The levels of splits", "no": ["The number of trees", "The learning rate"] },
  { "q": "What do deeper trees tend to do?", "ok": "Capture more but overfit faster", "no": ["Always generalize better", "Train faster"] },
  { "q": "So what does max_depth control?", "ok": "The maximum number of levels of splits in each individual tree", "no": ["The total number of trees in the ensemble", "The step size applied to each tree"] }
];

window.STEPS["What is the objective function in XGBoost?"] = [
  { "q": "What does training try to do to model error?", "ok": "Make it as small as possible", "no": ["Make it as large as possible", "Keep it exactly constant"] },
  { "q": "What form does 'how wrong' take?", "ok": "A loss formula, e.g. squared or logistic loss", "no": ["A list of features", "A random seed"] },
  { "q": "Do you pick the objective to match the task?", "ok": "Yes — regression, classification, etc.", "no": ["No, it is always fixed", "It is chosen randomly"] },
  { "q": "So what is the objective function?", "ok": "The formula measuring how wrong the model is, which training tries to minimize", "no": ["The list of features the model may split on", "The rule deciding how many trees to build"] }
];

window.STEPS["What is early stopping in XGBoost?"] = [
  { "q": "What score does early stopping watch?", "ok": "A validation metric", "no": ["The training error only", "The number of features"] },
  { "q": "What triggers it to halt?", "ok": "No improvement for a set number of rounds", "no": ["Training error hitting zero", "The first bad round"] },
  { "q": "Which model does it keep?", "ok": "The best iteration found", "no": ["The very last iteration", "The very first iteration"] },
  { "q": "What does it prevent?", "ok": "Overfitting from adding too many trees", "no": ["Any use of trees", "The model from training at all"] },
  { "q": "So what is early stopping?", "ok": "Halting training when validation error stops improving for a set number of rounds", "no": ["Removing the least important feature each round", "Stopping a tree once it reaches max_depth"] }
];

window.STEPS["Why does XGBoost add regularization on top of plain gradient boosting?"] = [
  { "q": "What can plain boosting do with many rounds?", "ok": "Carve fine leaves that fit noise", "no": ["Guarantee zero test error", "Refuse to add trees"] },
  { "q": "What does the penalty target?", "ok": "Number of leaves and leaf-weight size", "no": ["The number of rows", "The learning rate only"] },
  { "q": "What does simpler trees buy you?", "ok": "Better generalization to new data", "no": ["Perfect training accuracy", "No need for features"] },
  { "q": "So why add regularization?", "ok": "To penalize overly complex trees so the model overfits the training data less", "no": ["To make training slower and more careful", "To guarantee training error reaches zero"] }
];

window.STEPS["When XGBoost adds a new tree, what is that tree actually trained to predict?"] = [
  { "q": "Does the new tree start from scratch or build on the ensemble?", "ok": "Builds on the current ensemble", "no": ["Starts fully from scratch", "Ignores the data"] },
  { "q": "What is left over after the current prediction?", "ok": "The residual error", "no": ["The final answer", "Nothing at all"] },
  { "q": "What does XGBoost compute from the loss to guide the tree?", "ok": "The gradient (and Hessian)", "no": ["A random number", "The feature count"] },
  { "q": "So what is the new tree trained to predict?", "ok": "The gradient of the loss — essentially the current ensemble's leftover errors", "no": ["The original targets from scratch, ignoring prior trees", "A random relabeling of the rows"] }
];

window.STEPS["You lower the learning rate (eta) from 0.3 to 0.03. What else should you usually change?"] = [
  { "q": "With a smaller eta, how big is each tree's step?", "ok": "Smaller", "no": ["Larger", "Unchanged"] },
  { "q": "To reach the same fit with smaller steps, you need what?", "ok": "More steps (more trees)", "no": ["Fewer steps", "No steps"] },
  { "q": "Are eta and tree count related?", "ok": "Yes — they trade off directly", "no": ["No, totally independent", "Only for regression"] },
  { "q": "So what else should you change?", "ok": "Increase the number of trees, since smaller steps need more of them", "no": ["Decrease the number of trees", "Remove the validation set"] }
];

window.STEPS["A row has a missing value for one feature. How does XGBoost handle it at a split?"] = [
  { "q": "Does XGBoost need you to fill missing values first?", "ok": "No — it handles them natively", "no": ["Yes, always impute the mean", "Yes, or it errors out"] },
  { "q": "During training, what does it try for missing rows?", "ok": "Sending them both left and right", "no": ["Only ever left", "Deleting the split"] },
  { "q": "Which direction does it keep?", "ok": "The one that reduces loss more", "no": ["Always the left branch", "A random branch"] },
  { "q": "So how does it handle a missing value at a split?", "ok": "It learns a default direction per split and sends missing values that way", "no": ["It drops any row with a missing value", "It replaces it with the column mean first"] }
];

window.STEPS["Your XGBoost model scores 99% on training but 74% on validation. Which change is LEAST likely to help?"] = [
  { "q": "What does a big train-minus-validation gap indicate?", "ok": "Overfitting", "no": ["Underfitting", "Perfect generalization"] },
  { "q": "To fix overfitting, should the model get simpler or more complex?", "ok": "Simpler", "no": ["More complex", "Unchanged"] },
  { "q": "What does increasing max_depth do to complexity?", "ok": "Increases it — more room to memorize", "no": ["Decreases it", "Leaves it unchanged"] },
  { "q": "So which change is LEAST likely to help?", "ok": "Increasing max_depth further so trees can grow even deeper", "no": ["Lowering max_depth so trees are simpler", "Raising regularization to penalize complexity"] }
];

window.STEPS["Why does XGBoost tend to dominate on tabular (spreadsheet-like) data?"] = [
  { "q": "What kinds of relationships do tree ensembles capture well?", "ok": "Nonlinear feature interactions", "no": ["Only straight lines", "Only image pixels"] },
  { "q": "Do trees need heavy feature scaling first?", "ok": "No — little preprocessing", "no": ["Yes, must be normalized", "Yes, converted to images"] },
  { "q": "What does XGBoost add for practicality?", "ok": "Regularization, missing-value handling, speed", "no": ["Deep convolution layers", "Forced memorization"] },
  { "q": "So why does it dominate on tabular data?", "ok": "Boosted trees capture nonlinear feature interactions well and need little preprocessing", "no": ["It converts every table into an image", "It requires perfectly scaled, normal features"] }
];

window.STEPS["To use early stopping, what must you provide to XGBoost?"] = [
  { "q": "What data does early stopping need to judge honestly?", "ok": "A held-out validation set", "no": ["Only the training set", "A copy of the training set"] },
  { "q": "Why can't training data be used for this?", "ok": "It never looks like it's overfitting there", "no": ["It is too small", "It is always missing"] },
  { "q": "What number tells it how long to wait?", "ok": "A patience (stopping rounds)", "no": ["The exact final tree count", "The learning rate"] },
  { "q": "So what must you provide?", "ok": "A validation set the model does not train on, plus a patience (stopping rounds)", "no": ["Only the training set — nothing extra", "The exact final number of trees in advance"] }
];

/* ===== xgb2 · Practice ===== */

window.STEPS["What is a DMatrix in XGBoost?"] = [
  { "q": "Is a DMatrix about data or about predictions?", "ok": "Data", "no": ["Predictions", "Hyperparameters"] },
  { "q": "What does it hold?", "ok": "Features, labels, and optional weights", "no": ["Only the confusion matrix", "Distances between rows"] },
  { "q": "Why does XGBoost use its own container?", "ok": "For memory efficiency and speed", "no": ["To slow training down", "To store images"] },
  { "q": "So what is a DMatrix?", "ok": "XGBoost's optimized internal data structure for features, labels, and weights", "no": ["The confusion matrix produced after training", "A matrix of feature-importance scores"] }
];

window.STEPS["What does the scale_pos_weight parameter do?"] = [
  { "q": "What problem is scale_pos_weight for?", "ok": "Class imbalance", "no": ["Feature scaling", "Slow training"] },
  { "q": "Which class does it boost attention on?", "ok": "The positive (minority) class", "no": ["The majority class", "Both equally"] },
  { "q": "A common starting value is what?", "ok": "The ratio of negatives to positives", "no": ["Always 1.0", "The learning rate"] },
  { "q": "So what does scale_pos_weight do?", "ok": "It up-weights the positive (minority) class to counter class imbalance", "no": ["It scales all features into 0-to-1 range", "It rescales predicted probabilities after training"] }
];

window.STEPS["What does subsample = 0.8 do in XGBoost?"] = [
  { "q": "Does subsample act on rows or columns?", "ok": "Rows", "no": ["Columns", "Trees"] },
  { "q": "What fraction of rows does 0.8 use per tree?", "ok": "80%, chosen randomly", "no": ["80% of columns", "80% of trees"] },
  { "q": "Why show each tree a different sample?", "ok": "To decorrelate trees and reduce overfitting", "no": ["To speed up predictions only", "To guarantee zero error"] },
  { "q": "So what does subsample = 0.8 do?", "ok": "Each tree is trained on a random 80% of the rows, adding regularizing randomness", "no": ["Each tree is trained on 80% of the columns", "Only 80% of trees are used at prediction"] }
];

window.STEPS["What does colsample_bytree = 0.6 control?"] = [
  { "q": "Does colsample act on rows or columns?", "ok": "Columns", "no": ["Rows", "Trees"] },
  { "q": "What fraction of columns does 0.6 allow per tree?", "ok": "60%, chosen randomly", "no": ["60% of rows", "60% of trees"] },
  { "q": "Why limit columns per tree?", "ok": "So one strong feature doesn't dominate every tree", "no": ["To use more memory", "To speed up nothing"] },
  { "q": "So what does colsample_bytree = 0.6 control?", "ok": "Each tree can only consider a random 60% of the feature columns", "no": ["Each tree is trained on a random 60% of the rows", "Only 60% of trees vote on the prediction"] }
];

window.STEPS["What does the gamma (min_split_loss) parameter do?"] = [
  { "q": "Is gamma about splits or about tree count?", "ok": "Splits", "no": ["Tree count", "Learning rate"] },
  { "q": "What must a split earn before it's allowed?", "ok": "A minimum loss reduction", "no": ["A minimum row count only", "A maximum depth"] },
  { "q": "What does raising gamma do to trees?", "ok": "Prunes weak splits, keeping trees simpler", "no": ["Makes trees deeper", "Adds more trees"] },
  { "q": "So what does gamma do?", "ok": "It sets the minimum loss reduction required before a node is allowed to split", "no": ["It sets the learning rate for each new tree", "It caps the number of trees in the ensemble"] }
];

window.STEPS["What does min_child_weight do in XGBoost?"] = [
  { "q": "Is min_child_weight about leaves or about trees?", "ok": "Leaves", "no": ["Whole trees", "The learning rate"] },
  { "q": "What must a leaf hold to allow a split?", "ok": "A minimum instance weight (roughly rows)", "no": ["A maximum instance weight", "A minimum number of features"] },
  { "q": "What does a larger value block?", "ok": "Tiny leaves that fit a few noisy points", "no": ["All splits everywhere", "Any use of features"] },
  { "q": "So what does min_child_weight do?", "ok": "It sets the minimum total instance weight (roughly rows) needed in a leaf to keep splitting", "no": ["It sets the smallest learning rate allowed", "It limits child trees per parent tree"] }
];

window.STEPS["You are detecting fraud: 1% of transactions are fraud. Your XGBoost model predicts 'not fraud' for almost everything. Best first fix?"] = [
  { "q": "Why does predicting 'not fraud' score high accuracy?", "ok": "The majority class is 99% of rows", "no": ["The model is truly great", "Fraud is easy to catch"] },
  { "q": "What is the real problem here?", "ok": "The rare fraud class is being ignored", "no": ["Too many features", "The learning rate is too high"] },
  { "q": "Which parameter up-weights the rare class?", "ok": "scale_pos_weight", "no": ["max_depth", "n_estimators"] },
  { "q": "A good starting value is near what?", "ok": "The negative-to-positive ratio (~99)", "no": ["Exactly 1", "The learning rate"] },
  { "q": "So what's the best first fix?", "ok": "Set scale_pos_weight near the negative-to-positive ratio to up-weight fraud cases", "no": ["Increase max_depth to 30 to memorize fraud rows", "Remove the validation set to see more fraud"] }
];

window.STEPS["Why does XGBoost's histogram tree method (tree_method='hist') speed up training?"] = [
  { "q": "What is slow about the exact greedy method?", "ok": "It tests every possible split point", "no": ["It skips all splits", "It uses only 100 rows"] },
  { "q": "What does 'hist' do to feature values first?", "ok": "Groups them into a few bins", "no": ["Removes them", "Doubles them"] },
  { "q": "Where does it then consider splits?", "ok": "Only at bucket edges", "no": ["At every raw value", "Nowhere at all"] },
  { "q": "So why does the histogram method speed things up?", "ok": "It buckets feature values into a few bins so it tests far fewer split points", "no": ["It skips building trees and fits a linear model", "It trains on only the first 100 rows"] }
];

window.STEPS["You set n_estimators = 5000 but pass a validation set with early_stopping_rounds = 50. What happens?"] = [
  { "q": "With early stopping, is n_estimators a target or a ceiling?", "ok": "A ceiling (upper bound)", "no": ["An exact target", "Ignored entirely"] },
  { "q": "When does it stop adding trees?", "ok": "After 50 rounds without validation improvement", "no": ["After exactly 5000 trees", "After exactly 50 trees"] },
  { "q": "Which model does it keep?", "ok": "The best iteration found", "no": ["All 5000 trees", "The last tree only"] },
  { "q": "So what happens?", "ok": "Training stops early — often well before 5000 — once validation stalls for 50 rounds", "no": ["All 5000 trees are always built regardless", "The 5000 is ignored and exactly 50 trees are built"] }
];

/* ===== xgb3 · Advanced Study ===== */

window.STEPS["What is 'gain' as a feature-importance measure in XGBoost?"] = [
  { "q": "Gain measures a feature's effect on what?", "ok": "The loss (error)", "no": ["The row count only", "The tree depth"] },
  { "q": "Reduction is summed over what?", "ok": "Every split that uses the feature", "no": ["Only its first split", "Every tree, ignoring the feature"] },
  { "q": "A high-gain feature did what?", "ok": "Sharply reduced the loss where it split", "no": ["Was simply used most often", "Touched the most rows"] },
  { "q": "So what is 'gain'?", "ok": "The total loss reduction a feature contributes across all the splits that use it", "no": ["The number of times a feature appears in any tree", "The correlation between the feature and the target"] }
];

window.STEPS["XGBoost can report importance as gain, cover, or weight. How do these differ?"] = [
  { "q": "What does 'weight' count?", "ok": "How often the feature is used to split", "no": ["The loss reduction", "The rows affected"] },
  { "q": "What does 'cover' measure?", "ok": "How many rows the splits touch", "no": ["How often it's used", "The loss reduction"] },
  { "q": "What does 'gain' measure?", "ok": "The loss reduction produced", "no": ["The split count", "The tree depth"] },
  { "q": "So how do the three differ?", "ok": "Gain = loss reduction, cover = rows affected, weight = how often the feature is used", "no": ["They are three names for the same split count", "Gain = row count, cover = correlation, weight = depth"] }
];

window.STEPS["XGBoost offers both L2 (reg_lambda) and L1 (reg_alpha) regularization on leaf weights. How do they differ?"] = [
  { "q": "What do both L1 and L2 penalize?", "ok": "Large leaf weights", "no": ["The number of rows", "The tree count"] },
  { "q": "What does L2 (lambda) do to weights?", "ok": "Shrinks them all smoothly toward zero", "no": ["Sets some exactly to zero", "Removes trees"] },
  { "q": "What can L1 (alpha) do that L2 can't?", "ok": "Push some leaf weights exactly to zero", "no": ["Add rows to the data", "Set the learning rate"] },
  { "q": "So how do L1 and L2 differ?", "ok": "L2 shrinks all leaf weights smoothly; L1 can push some leaf weights exactly to zero", "no": ["L2 removes trees; L1 removes rows", "L1 only works for regression; L2 only for classification"] }
];

window.STEPS["XGBoost uses second-order information (the Hessian) when fitting each tree. What is the benefit?"] = [
  { "q": "What does plain boosting use from the loss?", "ok": "Only the first-order gradient (slope)", "no": ["Nothing at all", "Only the row count"] },
  { "q": "What does the Hessian describe?", "ok": "The loss's curvature", "no": ["The tree depth", "The number of features"] },
  { "q": "What kind of step does using both give?", "ok": "A Newton-style step", "no": ["A random step", "No step at all"] },
  { "q": "So what is the benefit?", "ok": "Using the loss's curvature, not just its slope, gives more accurate, stable split decisions", "no": ["It lets the model skip computing gradients", "It forces every tree to be one level deep"] }
];

window.STEPS["You must control overfitting on a noisy dataset. Which combined strategy is soundest?"] = [
  { "q": "Does one single knob reliably control overfitting?", "ok": "No — combine several", "no": ["Yes, just one is enough", "None can help"] },
  { "q": "What does low eta plus early stopping give?", "ok": "A good tree count without overfitting", "no": ["Maximum memorization", "Zero trees"] },
  { "q": "What do subsample and colsample add?", "ok": "Regularizing randomness that decorrelates trees", "no": ["Deeper trees", "More features per split guaranteed"] },
  { "q": "So which combined strategy is soundest?", "ok": "Lower eta with early stopping, modest max_depth, plus subsample/colsample and some lambda/gamma", "no": ["Max out max_depth, eta = 1.0, and no subsampling", "A single tree with unlimited depth and no regularization"] }
];

window.STEPS["A stakeholder points out feature 'customer_id' has the highest 'weight' importance in your XGBoost model. Why be cautious?"] = [
  { "q": "What does 'weight' importance actually count?", "ok": "How often the feature is split on", "no": ["Its true loss reduction", "Its correlation with the target"] },
  { "q": "Why does a near-unique ID get split on so often?", "ok": "It offers many split points", "no": ["It is the best predictor", "It has no split points"] },
  { "q": "Do those frequent splits mean real, general learning?", "ok": "No — they can just memorize rows", "no": ["Yes, always", "Only for numeric targets"] },
  { "q": "Which measure gives a more honest picture?", "ok": "Gain (or SHAP)", "no": ["Weight, always", "Row count"] },
  { "q": "So why be cautious?", "ok": "High weight only means it was split on often; a near-unique ID can overfit yet add little real gain", "no": ["Weight importance is always the most reliable", "It proves customer_id is genuinely the best predictor"] }
];
