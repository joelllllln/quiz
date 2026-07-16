/* More definitions: Gradient Boosting, Stacking/ensembles, XGBoost. Standard glossary terms,
   each DEFS-tagged with a reveal so it flows into the Definitions filter, flashcards and
   read+recall. Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function def(qk, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1;
  }

  /* ============================ Gradient Boosting (gb1) ============================ */

  def("gb1",
    "What is functional gradient descent in gradient boosting?",
    "Viewing boosting as gradient descent in function space, where each tree fits the negative gradient of the loss and is added to the model",
    [
      "A variant of stochastic gradient descent that repeatedly nudges the individual connection weights of a single deep neural network one mini-batch at a time",
      "The optimisation of a single tree's split thresholds by taking analytic derivatives of the Gini impurity with respect to every candidate feature value",
      "Rescaling each input feature along its own gradient direction before the very first regression tree in the ensemble is grown",
      "A rule that stops adding trees the moment the training loss gradient becomes exactly zero"
    ],
    "Functional gradient descent",
    "Gradient boosting is gradient descent performed in the space of functions: at each round a new base learner is fit to the negative gradient of the loss, then added to the running model.",
    "The whole ensemble is built by taking steps that reduce the loss, but each 'step' is a whole new tree rather than a tweak to a number. That reframing is why any differentiable loss can be boosted.",
    "Instead of nudging numbers downhill, you add a small tree each round that pushes predictions in the direction that lowers the error.");

  def("gb1",
    "What does 'forward stage-wise additive modelling' describe?",
    "Building the model one learner at a time, adding each new term without ever revising the learners already fixed in the ensemble",
    [
      "Fitting every base learner in the ensemble simultaneously and then jointly re-optimising all of their parameters together in one final global pass",
      "A staged pipeline that first standardises the data, then selects features, and only afterwards trains a single large tree on what remains",
      "Growing one very deep tree in stages and pruning it backwards from the leaves toward the root until validation error stops improving",
      "Training separate models on separate folds and averaging them"
    ],
    "Forward stage-wise additive modelling",
    "Gradient boosting is a forward stage-wise procedure: it adds one base learner at a time to greedily reduce the loss and never re-fits the terms already added.",
    "Because earlier trees are frozen once added, the algorithm only ever solves the small problem of 'what one tree helps most now', which keeps each step cheap and greedy.",
    "You keep tacking on one more small model to fix the leftover mistakes, and you never rewrite the ones you already placed.");

  def("gb1",
    "What is 'negative-gradient fitting' at each boosting round?",
    "Fitting the next learner to the negative gradient of the loss at the current predictions, which for squared error equals the residuals",
    [
      "Fitting the next base learner to the raw target values directly while ignoring the predictions that the ensemble has produced so far this round",
      "Choosing the learning rate by numerically differentiating the validation loss and moving in the steepest downhill direction each iteration",
      "Reversing the sign of every leaf value in the previous tree so the new tree cancels out the mistakes of the one before it",
      "Fitting a tree to the target labels weighted by their class frequencies"
    ],
    "Negative-gradient fitting",
    "Each round computes the negative gradient of the loss at the current predictions (the pseudo-target) and fits the new tree to it; under squared-error loss these negative gradients are exactly the residuals.",
    "Rather than fit the outcome, each tree fits the direction in which the loss most wants the prediction to move. For plain regression that direction is just the leftover error.",
    "The new tree learns to predict 'how wrong we are and which way', which for ordinary regression is simply the current mistakes.");

  def("gb1",
    "What is the 'line search' step in gradient boosting?",
    "After fitting a tree's shape, choosing the optimal multiplier or leaf values that best reduce the loss along the direction that tree points",
    [
      "Scanning every feature column left to right to find the single split point that produces the largest reduction in node impurity for that tree",
      "Searching along a straight line in feature space to locate the decision boundary that separates the two classes with the widest possible margin",
      "A grid search over the number of trees and the maximum depth performed on a held-out validation line of the learning curve",
      "Picking the tree that lies closest to the diagonal of the ROC curve"
    ],
    "Line search (leaf value optimisation)",
    "Once a tree defines a direction, a line search sets the step size (or per-leaf output values) that most reduces the loss along that direction; boosting libraries solve this in closed form per leaf.",
    "Fitting the tree tells you which way to move; the line search tells you how far, by picking the leaf outputs that squeeze out the most loss reduction.",
    "After deciding the shape of the new tree, you scale its outputs to the size that lowers the error the most.");

  def("gb1",
    "What is 'deviance' loss in a gradient boosting classifier?",
    "The log-loss (binomial or multinomial cross-entropy) used as the objective, whose negative gradient drives the trees in a boosting classifier",
    [
      "The total number of misclassified training rows counted after every boosting round and used directly as the quantity that the next tree minimises",
      "The gap between training accuracy and validation accuracy that widens as more and more trees are progressively added to the ensemble over time",
      "A penalty added to each split equal to the standard deviation of the target values falling inside the resulting child node of the tree",
      "The variance of the leaf predictions across the trees of the ensemble"
    ],
    "Deviance loss (GB classification)",
    "For classification, gradient boosting minimises deviance, i.e. logistic/cross-entropy log-loss; its smooth gradient yields the pseudo-residuals the trees are fit to and produces probability outputs.",
    "Classification boosting doesn't count errors; it minimises a smooth log-loss, and the gradient of that loss is what each new tree chases.",
    "The classifier's yardstick is log-loss, a smooth score that rewards confident-and-correct probabilities and can be pushed down step by step.");

  def("gb1",
    "What distinguishes AdaBoost from gradient boosting?",
    "AdaBoost re-weights training examples each round so later learners focus on misclassified points, rather than fitting learners to loss gradients",
    [
      "AdaBoost trains all of its weak learners completely independently on bootstrap samples and then combines them by a simple unweighted majority vote at the end",
      "AdaBoost grows one single unpruned decision tree to full depth and relies entirely on cost-complexity pruning to control the model's variance afterwards",
      "AdaBoost reduces variance by averaging many deep trees, whereas gradient boosting instead reduces bias by adding shallow trees very slowly over time",
      "AdaBoost can only be applied to regression targets, never to classification"
    ],
    "AdaBoost (adaptive boosting)",
    "AdaBoost is an early boosting algorithm that increases the weights of misclassified examples each round so subsequent weak learners concentrate on hard cases; it is equivalent to gradient boosting with an exponential loss.",
    "Both are boosting, but AdaBoost's mechanism is re-weighting the hard examples rather than explicitly fitting to a loss gradient, which the general gradient-boosting framework later generalised.",
    "AdaBoost keeps turning up the volume on the examples it keeps getting wrong so the next weak model pays them more attention.");

  def("gb1",
    "Why is boosting described as a bias-reduction method?",
    "Each new learner corrects the ensemble's systematic errors, so successive rounds mainly drive down bias rather than variance",
    [
      "Because averaging a very large number of independently bootstrapped deep trees cancels their random fluctuations and thereby lowers the ensemble's variance",
      "Because bagging the training rows before every boosting round removes the correlation between the trees and so eliminates almost all of the model's bias",
      "Because the learning rate is set close to one, which forces every individual tree to fit the noise in the training data and thereby reduces bias",
      "Because deeper trees always reduce bias regardless of how many rounds are run"
    ],
    "Boosting reduces bias",
    "Boosting combines many high-bias weak learners, each fixing the residual errors of the current ensemble; the sequential correction mainly attacks bias, in contrast with bagging, which mainly attacks variance.",
    "Because every new tree targets what the ensemble still gets systematically wrong, boosting steadily removes bias — which is why the base learners can afford to be weak (shallow).",
    "Bagging fights the wobble; boosting fights the being-wrong-on-average, by stacking up small fixes.");

  def("gb1",
    "What does a 'warm start' allow when training a boosting model?",
    "Continuing to add trees to an already-fitted ensemble instead of retraining from scratch when you raise the number of estimators",
    [
      "Initialising every tree in the ensemble with the leaf values learned by a completely separate model that was trained earlier on a different dataset entirely",
      "Pre-heating the optimiser by running several throw-away boosting rounds on random noise before the real training data is ever presented to the algorithm",
      "Resetting the model's state and the random seed at the start of every fold so that cross-validation runs are perfectly reproducible from one to the next",
      "Loading the training data into memory once and reusing it across folds"
    ],
    "Warm start (incremental trees)",
    "A warm start reuses an already-trained ensemble as the starting point and simply appends further trees, which makes it cheap to explore how performance changes as the number of estimators grows.",
    "Instead of throwing away a fitted booster when you want more trees, warm-start just keeps building on top of what's already there.",
    "You can keep adding rounds to a model you already trained rather than starting over each time.");

  def("gb1",
    "What is the learning-rate / n_estimators trade-off in boosting?",
    "A smaller learning rate shrinks each tree's contribution, so it usually needs more trees to reach the same fit; the two knobs must be tuned together",
    [
      "A larger learning rate always requires proportionally fewer training examples, so you can safely shrink the dataset whenever you raise the shrinkage value",
      "The number of estimators controls the depth of each tree, while the learning rate independently controls how many features each split is allowed to consider",
      "Increasing the number of trees automatically decreases the learning rate through an internal schedule, so only one of the two ever needs to be set by hand",
      "The learning rate sets the test-set size and n_estimators sets the fold count"
    ],
    "The learning-rate / n_estimators trade-off",
    "Shrinkage and the number of trees interact: halving the learning rate roughly doubles the trees needed for the same training fit, so lower rates with more (early-stopped) trees usually generalise better.",
    "Turn each tree's influence down (small learning rate) and you'll need more trees — but that slow-and-many recipe typically generalises better than fast-and-few.",
    "Small steps mean you need more of them; it's the classic 'go slow but go far' setting, tuned as a pair.");

  def("gb1",
    "What does feature subsampling (max_features) do in gradient boosting?",
    "Restricting each tree or split to a random subset of the features, adding randomness that decorrelates trees and curbs overfitting",
    [
      "Permanently removing the least important features from the dataset before any boosting begins, based on a preliminary run of a single shallow decision tree",
      "Sampling a random subset of the training rows without replacement before each boosting round so that different trees see different examples of the data",
      "Choosing which features receive a monotonic constraint by ranking them according to their correlation with the target variable at the start of training",
      "Scaling every feature to unit variance so no single column can dominate a split"
    ],
    "Feature subsampling (max_features in GB)",
    "Column subsampling makes each tree (or split) look at only a random fraction of the features; the extra randomness reduces correlation between trees and acts as a regulariser, much like it does in random forests.",
    "By hiding some columns from each tree, the model is forced to find varied ways to reduce error, which fights overfitting — this is feature (column) subsampling, not row subsampling.",
    "Each tree only gets to peek at a random handful of the columns, which keeps the trees from all making the same mistakes.");

  /* ============================ Stacking / ensembles (stack1) ============================ */

  def("stack1",
    "What are 'level-0' versus 'level-1' learners in stacking?",
    "Level-0 learners are the base models whose predictions become inputs; the level-1 learner is the meta-model trained on those predictions",
    [
      "Level-0 learners are trained on the first half of the dataset and level-1 learners are trained on the second half, after which their probability outputs are simply averaged",
      "Level-0 refers to the shallowest trees in a boosting ensemble and level-1 refers to the deeper trees that are added during the later rounds of that same ensemble",
      "Level-0 is the raw untransformed feature matrix and level-1 is that same matrix after standardisation and one-hot encoding have both been applied to it",
      "Level-0 is the training fold and level-1 is the held-out test fold"
    ],
    "Level-0 vs level-1 learners",
    "In stacked generalisation the level-0 models are the base learners; their out-of-fold predictions form the inputs to a level-1 meta-learner that learns how best to combine them.",
    "Stacking is layered: the first layer of models makes predictions, and a second small model on top learns how to weigh and combine those predictions.",
    "Bottom layer: several models guess. Top layer: one model learns whom to trust when.");

  def("stack1",
    "What are 'meta-features' in a stacking ensemble?",
    "The predictions output by the base models, which are used as the input columns for training the meta-learner instead of (or alongside) the original features",
    [
      "Hand-engineered interaction and polynomial columns created from the original features before any of the base models in the ensemble are ever trained on the data",
      "Summary statistics such as the mean and variance of each original feature, computed per fold and fed to every base model to help it calibrate its predictions",
      "The hyperparameters of each base model, gathered into a table so the meta-learner can decide which configuration performed best across the cross-validation folds",
      "Metadata describing the dataset, such as its number of rows and columns"
    ],
    "Meta-features",
    "Meta-features are the base learners' predictions (class probabilities or regression outputs) that serve as the training inputs for the second-level meta-learner in a stacked model.",
    "The meta-learner doesn't see the raw data — it sees a new table whose columns are 'what each base model predicted'. Those columns are the meta-features.",
    "You turn each model's guesses into new columns, and the top model learns from those columns.");

  def("stack1",
    "What is 'holdout blending'?",
    "Training base models on one split, then training the blender on their predictions over a separate holdout split instead of using cross-validation",
    [
      "Averaging the predictions of several base models after each of them has been trained on the full dataset, with the averaging weights fixed equally in advance",
      "Repeatedly resampling the training set with replacement and blending together the predictions of a model refit on each of the resulting bootstrap samples",
      "Combining two datasets from different sources into one blended training set before splitting it into the usual training, validation, and test partitions",
      "Blurring the decision boundary of a classifier by adding noise to its outputs"
    ],
    "Holdout blending",
    "Blending is a simpler cousin of stacking: base models are fit on the training portion, then their predictions on a separate holdout set are used to train the meta-model, avoiding full out-of-fold cross-validation.",
    "Blending just carves off a holdout slice, lets the base models predict on it, and trains the combiner there — quicker to set up than proper out-of-fold stacking, but it wastes some data.",
    "You set aside a chunk, get the base models' guesses on it, and train the combiner on just that chunk.");

  def("stack1",
    "Why does training the meta-learner on in-sample base predictions cause leakage?",
    "Because base models predict their own training rows over-optimistically, so the meta-learner learns from unrealistically good inputs and overfits",
    [
      "Because the meta-learner sees the true labels of the test set during its training phase and can therefore memorise them instead of learning to combine predictions",
      "Because the base models are all trained on exactly the same rows, which makes their predictions perfectly correlated and so removes all diversity from the ensemble",
      "Because in-sample predictions are computed before feature scaling is applied, so the meta-learner receives inputs on inconsistent and incompatible numeric scales",
      "Because using training rows twice simply doubles the effective size of the dataset"
    ],
    "In-sample stacking leakage",
    "If the meta-learner is trained on base predictions for rows the base models already saw, those predictions are unrealistically accurate; the meta-learner over-trusts the base models and generalises poorly. Out-of-fold predictions fix this.",
    "A base model looks like a genius on data it was trained on. If the combiner learns from that flattering view, it gets fooled — so you must feed it predictions on unseen (out-of-fold) rows.",
    "Grading models on questions they already studied makes them look too good, and the combiner believes the hype.");

  def("stack1",
    "What guides the choice of meta-learner in stacking?",
    "It is usually kept simple, such as a regularised linear model, so it can weigh the base predictions without itself overfitting the small meta-feature table",
    [
      "It should always be the single most accurate base learner in the ensemble, retrained a second time using the other models' predictions as its only additional inputs",
      "It must be a deep neural network, because only a high-capacity model can capture the complex nonlinear interactions that exist among the base model predictions",
      "It has to match the algorithm family of the base learners exactly, so a forest of trees can only ever be stacked underneath another tree-based meta-learner",
      "It is chosen at random from the base models to keep the ensemble unbiased"
    ],
    "Choosing the meta-learner",
    "The meta-learner sits on a small, low-dimensional table of base predictions, so a simple regularised model (e.g. logistic/linear regression) is a common, robust choice that resists overfitting the blender.",
    "The combiner's job is just to weigh a few model outputs, so keeping it simple usually beats a fancy one that would overfit the tiny meta-feature set.",
    "The top model only has a few columns to work with, so something plain and well-regularised is the safe pick.");

  def("stack1",
    "What is 'rank averaging' as an ensembling technique?",
    "Converting each model's scores to ranks and averaging the ranks, which combines models robustly even when their raw outputs live on very different scales",
    [
      "Sorting the models by their validation accuracy and then keeping only the single top-ranked model while discarding all of the lower-ranked ones from the ensemble",
      "Assigning each model a fixed weight proportional to its rank on the leaderboard and computing a weighted average of the raw probability outputs accordingly",
      "Ranking the training examples by difficulty and giving the highest-ranked examples the largest weight when the base models are being fit to the data",
      "Averaging the feature importance ranks produced by each model in the ensemble"
    ],
    "Rank averaging",
    "Rank averaging replaces each model's raw predictions with their rank order before averaging; because ranks are scale-free, it blends models whose score distributions differ without needing calibration.",
    "If two models' scores aren't on the same scale, averaging them directly is unfair. Turning scores into positions (ranks) first puts everyone on equal footing.",
    "Instead of averaging the numbers, you average the finishing positions, which sidesteps mismatched scales.");

  def("stack1",
    "What is a 'Super Learner'?",
    "A stacking framework that uses cross-validation to fit the optimal weighted combination of a library of base learners",
    [
      "A single very large model with billions of parameters that is trained to replace an entire ensemble of smaller models by imitating all of their combined outputs",
      "The base learner in an ensemble that achieves the highest cross-validated score and is therefore promoted to make the final prediction on its own for every row",
      "An automated system that searches over thousands of hyperparameter settings for one model and returns the configuration with the best validation performance",
      "A boosting algorithm that adds one super-deep tree per round to the ensemble"
    ],
    "Super Learner",
    "The Super Learner is a formalised stacking method that builds an optimal convex or regression-based combination of a library of candidate models using cross-validated (out-of-fold) predictions, with asymptotic optimality guarantees.",
    "Super Learner is stacking done rigorously: it uses cross-validation to find the best mix of a whole library of models, and there's theory proving the mix is near-optimal.",
    "It's a principled way of letting cross-validation decide the best blend of many models.");

  def("stack1",
    "What is a 'bucket of models' selection strategy?",
    "Training several candidate models and using a selection rule (often cross-validation) to pick the single best one for the task at hand, rather than blending them",
    [
      "Splitting the training data into several buckets and training a separate copy of the same model on each bucket before averaging their predictions together at the end",
      "Grouping the features into buckets by type and training one specialised base model on each bucket, then concatenating all of their predictions into the final output",
      "Discretising a continuous target into buckets so that a regression problem can be reframed and solved as a multi-class classification problem instead",
      "Storing many trained models on disk so the fastest one can be loaded at serving time"
    ],
    "Bucket of models",
    "A bucket of models keeps a collection of candidate learners and uses a meta-selection procedure (typically cross-validation) to choose the best single model per problem, in contrast with stacking, which combines them all.",
    "Rather than merge models, a bucket-of-models approach simply runs a bake-off and keeps the winner for the job.",
    "You try several models and, using cross-validation, just keep whichever one wins.");

  def("stack1",
    "Why are probability (soft) outputs preferred as meta-features over hard labels?",
    "Because a base model's predicted probabilities carry its confidence, giving the meta-learner richer, more informative inputs than a collapsed 0/1 class decision",
    [
      "Because probability outputs are always perfectly calibrated by default, so the meta-learner never needs to apply any further correction to the base model scores",
      "Because hard class labels cannot be stored as columns in a table, whereas floating-point probabilities can be concatenated with the original feature matrix easily",
      "Because probabilities reduce the number of base models that are required, since a single probabilistic model can stand in for several hard-voting classifiers at once",
      "Because hard labels leak the target whereas soft probabilities do not"
    ],
    "Probability meta-features (soft outputs)",
    "Feeding the meta-learner class probabilities (soft outputs) rather than hard labels preserves each base model's confidence and the margin of its decision, which typically improves the blended model's accuracy.",
    "A 0/1 answer throws away how sure the model was; a probability keeps it. The combiner learns more from '0.92' than from a bare 'yes'.",
    "Soft scores tell the top model not just what each model guessed but how confident it was.");

  def("stack1",
    "What is meta-learner overfitting in stacking?",
    "When the second-level model latches onto noise in the small table of base predictions, so it must be kept simple and regularised",
    [
      "When the base learners are all so accurate that the meta-learner has nothing left to learn and therefore simply copies the prediction of the strongest base model",
      "When too many base models are added to the ensemble, which increases the training time of the meta-learner beyond the point of any practical usefulness at all",
      "When the meta-learner is trained on the raw features instead of the base predictions and so ends up duplicating the work already done by the base learners",
      "When the meta-learner and a base learner share the same random seed by accident"
    ],
    "Meta-learner overfitting",
    "Because the meta-feature table is small and low-dimensional, a flexible meta-learner can overfit it; using out-of-fold predictions and a simple, regularised blender guards against this.",
    "The combiner sits on very little data, so a complicated combiner can memorise quirks. Keeping it simple and feeding it honest out-of-fold inputs prevents that.",
    "Give the top model too much freedom over a tiny table and it overfits, so keep it plain.");

  /* ============================ XGBoost (xgb1) ============================ */

  def("xgb1",
    "What does 'cover' measure for a split or leaf in XGBoost?",
    "The sum of the second-order gradients (Hessians) of the examples in a node, roughly the amount of data 'mass' or weight supporting that split or leaf",
    [
      "The fraction of the total training examples that fall into the node, expressed as a simple percentage of the whole dataset independent of any loss information",
      "The number of features that were still available to be considered as candidate split points at that particular node after column subsampling had been applied",
      "The improvement in the loss that the split achieves, measured as the gain of the parent minus the gains of its two resulting child nodes combined together",
      "The depth of the node counted as the number of edges from the root of the tree"
    ],
    "Cover (hessian sum)",
    "In XGBoost, cover is the sum of the Hessians (second-order gradients) of the instances in a node; it reflects how much weighted evidence supports a split or leaf and underlies the min_child_weight constraint.",
    "Cover is a weighted count of the examples under a node — weighted by how much each one contributes curvature to the loss. Thin coverage means a shaky split.",
    "Think of cover as 'how much solid data is standing behind this split', measured through the loss's curvature.");

  def("xgb1",
    "What is the 'similarity' (structure) score in XGBoost?",
    "A per-node score computed from the summed gradients and Hessians (plus lambda) that XGBoost uses to score a tree structure and derive each split's gain",
    [
      "A measure of how closely two different trees in the ensemble agree with each other, used to prune away any trees that are too redundant with earlier ones",
      "The cosine similarity between the feature vector of a new query point and the average feature vector of the training examples that fall into the same leaf",
      "The correlation between a feature and the target, calculated at every node so the algorithm can pick the feature that is most similar to what it predicts",
      "A normalised distance between a leaf's prediction and the true label averaged over the node"
    ],
    "Similarity (structure) score",
    "XGBoost scores a candidate structure with a similarity/structure score, (sum of gradients)^2 / (sum of Hessians + lambda), per node; the gain of a split is the sum of the children's scores minus the parent's, less gamma.",
    "Each node gets a score built from the gradients and Hessians it contains; comparing parent and child scores tells XGBoost whether a split is worth making.",
    "It's the internal 'goodness' number XGBoost assigns to a node, and splits are judged by how much they raise it.");

  def("xgb1",
    "What is the role of the second-order Taylor approximation in XGBoost?",
    "It approximates the loss at each round using both its gradient and Hessian, so the optimal leaf weights and split gains have exact closed-form solutions",
    [
      "It expands each input feature into second-degree polynomial terms so that the trees can capture curved, nonlinear relationships that a single split could not",
      "It smooths the loss curve by fitting a parabola through the last three validation scores in order to decide automatically when training should be stopped early",
      "It replaces the true loss with the squared error for every objective, which is the only loss for which a decision tree can be fit efficiently in practice",
      "It doubles the learning rate on the second pass through the data to speed convergence"
    ],
    "Second-order Taylor approximation",
    "XGBoost expands the loss to second order (gradient g and Hessian h) around the current predictions each round; this Newton-style approximation yields closed-form optimal leaf weights and the gain used to evaluate splits.",
    "By using not just the slope (gradient) but also the curvature (Hessian) of the loss, XGBoost can solve for the best leaf values directly instead of guessing.",
    "It looks at both the tilt and the bend of the error, which lets it jump straight to good leaf values.");

  def("xgb1",
    "What does XGBoost's 'regularised objective' consist of?",
    "A training loss plus a complexity penalty over the trees: gamma per leaf and an L2 (optionally L1) penalty on the leaf weights",
    [
      "Only the training loss summed over all examples, with no additional penalty term, because the tree depth limit alone is relied upon to control the model complexity",
      "The training loss plus a penalty proportional to the total number of boosting rounds, which pushes the algorithm to reach a good fit in as few trees as possible",
      "A weighted average of the training loss and the validation loss, combined so the model optimises directly for generalisation rather than for training performance",
      "The training loss divided by the number of leaves to normalise across trees of differing size"
    ],
    "The regularised objective",
    "XGBoost minimises loss plus a regularisation term Omega over each tree: gamma times the number of leaves plus half-lambda times the sum of squared leaf weights (and optional alpha for L1), explicitly penalising complexity.",
    "Unlike plain gradient boosting, XGBoost writes model complexity right into what it optimises — more leaves and larger leaf values cost it something, so it prefers simpler trees.",
    "Its goal isn't only 'fit the data' but 'fit the data and stay simple', with penalties on extra leaves and big leaf values.");

  def("xgb1",
    "What does the 'lambda' (reg_lambda) parameter do in XGBoost?",
    "It applies an L2 penalty on the leaf weights, shrinking them toward zero to smooth the model and reduce overfitting",
    [
      "It sets the minimum loss reduction that a split must achieve before XGBoost will allow that split to be made at all, effectively pruning unhelpful branches",
      "It controls the fraction of training rows randomly sampled without replacement before each new tree is grown, which injects stochasticity into the boosting",
      "It bounds the maximum change in prediction that any single tree is permitted to make, which is especially helpful when classes are severely imbalanced",
      "It selects the number of features sampled at each split"
    ],
    "lambda (L2 leaf-weight penalty)",
    "reg_lambda adds an L2 penalty on the leaf output weights in the objective; larger values shrink the leaf values, producing a smoother, more conservative model that is less prone to overfitting.",
    "Lambda is the L2 knob: it keeps the leaf outputs from growing too large, which regularises the trees. (gamma, subsample, and max_delta_step are different knobs.)",
    "Turn lambda up and each leaf's output is pulled toward zero, making the model gentler.");

  def("xgb1",
    "What does the 'alpha' (reg_alpha) parameter do in XGBoost?",
    "It applies an L1 penalty on the leaf weights, which can drive some leaf outputs exactly to zero and yield a sparser model",
    [
      "It sets the learning rate that scales down the contribution of every tree that is added to the ensemble in order to make the boosting process more gradual",
      "It controls the number of boosting rounds after which training is halted automatically if the validation metric has not improved for that many iterations",
      "It applies an L2 penalty on the leaf weights, shrinking them smoothly toward zero without ever setting any of the individual leaf outputs exactly to zero",
      "It sets the base score used as the model's initial prediction before boosting"
    ],
    "alpha (L1 leaf-weight penalty)",
    "reg_alpha adds an L1 penalty on the leaf weights; like lasso, it can shrink some leaf outputs to exactly zero, encouraging sparsity, whereas reg_lambda (L2) shrinks smoothly without zeroing.",
    "Alpha is the L1 knob. Where lambda softly shrinks leaves, alpha can switch some off entirely, giving a sparser model.",
    "Alpha can zero out some leaf outputs, unlike lambda which just makes them smaller.");

  def("xgb1",
    "What is 'sparsity-aware' split finding in XGBoost?",
    "A method that learns a default branch at each split for missing or zero entries, so trees handle sparse data without imputation",
    [
      "A preprocessing step that removes every feature column whose values are more than a fixed percentage missing before any of the trees are grown on the data",
      "A technique that stores the feature matrix in a compressed sparse format purely to save memory, without changing how any of the splits are actually chosen",
      "A rule that always sends missing values down the left branch of a split, chosen because the left branch is conventionally reserved for the smaller feature values",
      "A method that fills missing entries with the column mean computed once from the training set"
    ],
    "Sparsity-aware split finding",
    "XGBoost's sparsity-aware algorithm learns, for each split, a default branch to which missing (or absent/zero) values are routed, chosen to maximise gain; this handles missing data natively and speeds up training on sparse matrices.",
    "Instead of imputing missing values, XGBoost learns which way each split should send them, picking whichever direction improves the fit the most.",
    "Missing? XGBoost figures out, split by split, whether such rows should go left or right.");

  def("xgb1",
    "What do 'monotonic constraints' enforce in XGBoost?",
    "They force the model's predicted output to move only non-decreasingly (or non-increasingly) with a chosen feature, embedding known domain relationships",
    [
      "They require every decision tree in the ensemble to grow to exactly the same fixed depth so that the model's structure stays perfectly balanced across all rounds",
      "They restrict which pairs of features are allowed to appear together on the same root-to-leaf path, thereby limiting the interactions the trees can represent",
      "They guarantee that the training loss decreases monotonically from one boosting round to the next by rejecting any tree that would increase the loss",
      "They keep the leaf weights sorted in increasing order within each tree"
    ],
    "Monotonic constraints",
    "A monotonic constraint tells XGBoost that predictions must be a monotone (non-decreasing or non-increasing) function of a given feature; splits that would violate the required direction are pruned, encoding prior knowledge.",
    "If you know 'more of this feature should never lower the prediction', a monotonic constraint bakes that rule in so the model can't contradict it.",
    "It locks in a 'this feature only pushes the prediction one way' rule you already know to be true.");

  def("xgb1",
    "What do 'interaction constraints' control in XGBoost?",
    "They specify which groups of features may interact, so only features in the same allowed group can appear together on one root-to-leaf path",
    [
      "They set the maximum number of features that any individual tree in the whole ensemble is allowed to use across all of its splits taken together at once",
      "They force two chosen features to always be split in a fixed order, with the first one required to appear nearer the root than the second in every tree",
      "They penalise the model whenever two correlated features are both selected, in order to reduce the multicollinearity present among the input variables",
      "They cap how many times a single feature may be reused within one tree"
    ],
    "Interaction constraints",
    "Interaction constraints restrict which features may jointly appear on the same decision path, so the model can only form interactions among features you explicitly allow to be grouped together, improving interpretability and control.",
    "By grouping features, you tell XGBoost which ones are allowed to combine within a tree, preventing spurious interactions between unrelated variables.",
    "You draw fences around groups of features so only the ones you permit can interact inside a tree.");

  def("xgb1",
    "What does the 'max_delta_step' parameter do in XGBoost?",
    "It caps the maximum change in the leaf weight each tree may make, which stabilises training on very imbalanced logistic problems",
    [
      "It sets the maximum number of boosting rounds after which the algorithm stops adding trees regardless of whether the validation metric is still improving or not",
      "It limits the maximum depth to which any individual tree in the ensemble is permitted to grow, thereby directly bounding the complexity of each base learner",
      "It defines the maximum step size taken by the internal line search when it optimises the learning rate between one boosting iteration and the next one",
      "It bounds the maximum number of leaves that a single tree may contain"
    ],
    "max_delta_step",
    "max_delta_step constrains the size of each leaf-weight update; it is usually 0 (no limit) but setting a finite value (e.g. 1-10) makes updates more conservative, which helps convergence on extremely imbalanced logistic-regression objectives.",
    "It's a safety cap on how big a jump each tree can make to a prediction, mostly used to keep training stable when classes are wildly imbalanced.",
    "It stops any single tree from shoving a prediction too far in one step, useful for lopsided data.");

  def("xgb1",
    "What does the 'tree_method' parameter select in XGBoost?",
    "The algorithm used to find splits, such as exact greedy search or the fast histogram method that buckets feature values first",
    [
      "The criterion used to measure node impurity when growing each tree, letting the user switch between Gini impurity, entropy, and mean-squared-error reduction",
      "The strategy for combining the individual trees at prediction time, choosing between summing their outputs, averaging them, or taking a majority vote among them",
      "The order in which the trees are grown, either level-wise from the root downward or leaf-wise by always expanding the leaf that promises the largest gain next",
      "The data structure used to store the model on disk for later loading and serving"
    ],
    "tree_method",
    "tree_method chooses the split-finding algorithm: 'exact' evaluates every candidate split, while 'hist' (and 'approx') bin continuous features into histograms first, trading a little precision for large gains in speed and memory on big data.",
    "It picks how XGBoost searches for splits — the exact-but-slow way, or the histogram way that buckets values first and runs much faster on large datasets.",
    "It's the setting that decides whether XGBoost checks every split exactly or uses quick value-buckets.");

  def("xgb1",
    "What is the 'weighted quantile sketch' in XGBoost?",
    "An algorithm that proposes candidate split points using quantiles weighted by each example's Hessian, for fast approximate splits",
    [
      "A visualisation that plots the distribution of each feature as a set of quantiles so a user can decide by eye where the most informative split points lie",
      "A resampling scheme that draws training rows in proportion to their gradient magnitude so that the hardest examples are more likely to appear in each tree",
      "A compression method that stores only a fixed number of quantiles of the model's leaf weights in order to shrink the final model file for deployment",
      "A calibration step that maps raw scores to quantiles of the observed label distribution"
    ],
    "Weighted quantile sketch",
    "For approximate split finding on large data, XGBoost proposes candidate split thresholds using a quantile sketch in which each instance is weighted by its second-order gradient (Hessian), so candidates reflect loss curvature, not just counts.",
    "To avoid testing every possible threshold, XGBoost summarises each feature by a set of quantiles — weighted by how much each point matters to the loss — and only tries those.",
    "It cleverly picks a small set of candidate cut-points by summarising the data, weighting rows by their importance to the loss.");

})();
