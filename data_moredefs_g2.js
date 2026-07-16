/* More definitions: Decision Trees, Support Vector Machines, Random Forests. Standard glossary
   terms, each DEFS-tagged with a reveal so it flows into the Definitions filter, flashcards and
   read+recall. Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function def(qk, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1;
  }

  /* ===== Decision Trees (trees1) — 10 ===== */

  def("trees1",
    "What is the gain ratio used by the C4.5 tree algorithm?",
    "Information gain divided by the split's own intrinsic information",
    ["The total reduction in Gini impurity summed over every node in the fully grown tree",
     "The fraction of training rows that reach a leaf whose predicted class matches the true label",
     "The number of leaves created by a split divided by the depth at which that split occurs",
     "A running average of impurity measured across all candidate thresholds for a numeric feature"],
    "Gain ratio (C4.5)",
    "Gain ratio = information gain / split information. Dividing by the split's intrinsic information penalises features with many distinct values, which plain information gain unfairly favours.",
    "Plain information gain loves high-cardinality features because splitting them many ways looks informative. Gain ratio divides that gain by how much the split itself fragments the data, correcting the bias.",
    "It stops the tree from cheating by picking columns that just have lots of different values.");

  def("trees1",
    "What are surrogate splits in a decision tree?",
    "Backup rules on other features that route a row whose split value is missing",
    ["Extra copies of the best split stored at each node so the tree can be rebuilt quickly after pruning",
     "Randomly chosen alternative splits that add diversity when many trees are combined into a forest",
     "Splits that replace the root once the tree detects that the target distribution has shifted over time",
     "Duplicate leaf nodes kept in reserve to smooth the predicted probabilities near a decision boundary"],
    "Surrogate splits",
    "A surrogate split is an alternative rule (on a different feature) that best reproduces the primary split's partition, so a row missing the primary feature can still be sent down the tree.",
    "When the feature a node splits on is missing for some row, the tree falls back on a stand-in rule that usually sends rows the same way.",
    "If the main question can't be answered for a row, the tree asks a similar backup question instead.");

  def("trees1",
    "What does the min_samples_leaf hyperparameter control?",
    "The minimum number of training samples that a split must leave in each resulting leaf",
    ["The minimum improvement in impurity that any candidate split must achieve before it is accepted",
     "The smallest number of features the algorithm is allowed to consider when searching for a split",
     "The minimum number of leaves the finished tree must contain before pruning is permitted to stop",
     "The minimum count of trees an ensemble must hold before out-of-bag error becomes trustworthy"],
    "min_samples_leaf",
    "min_samples_leaf sets a floor on how many training samples may end up in any leaf; a split is rejected if it would create a leaf below that size. It is a pre-pruning regulariser.",
    "Raising it forbids tiny leaves, so the tree stops carving out one- or two-example pockets that usually just memorise noise.",
    "It refuses to make leaves that hold too few examples, which keeps the tree from overfitting.");

  def("trees1",
    "What does the min_samples_split hyperparameter require?",
    "That a node hold at least that many samples before it is even considered for splitting",
    ["That every leaf below a node contain an equal share of the classes present in the training set",
     "That the impurity of a node fall below a fixed level before the algorithm allows it to split",
     "That at least that many distinct features be tried as candidate split points at each internal node",
     "That a minimum number of validation samples confirm the split before it is added to the tree"],
    "min_samples_split",
    "min_samples_split is the minimum number of samples a node must contain to be eligible for splitting. Nodes with fewer samples automatically become leaves.",
    "A node with too few examples is simply turned into a leaf instead of being split further, which limits how deep and specific the tree gets.",
    "Small groups aren't split any further; they just become an answer.");

  def("trees1",
    "What does the max_leaf_nodes setting do?",
    "It caps the total number of leaves, growing the tree best-first until that cap is reached",
    ["It fixes how many samples each leaf must hold before the tree stops expanding any branch",
     "It limits the number of features that can appear anywhere along a single root-to-leaf path",
     "It bounds the depth of the deepest branch while leaving the number of leaves unconstrained",
     "It sets how many candidate thresholds are evaluated when a numeric feature is being split"],
    "max_leaf_nodes",
    "max_leaf_nodes limits the tree to a fixed number of leaves. The tree is grown in best-first order, adding the split that most reduces impurity until the leaf budget runs out.",
    "Instead of limiting depth, you cap how many final buckets the tree may have, and it spends that budget on the most useful splits first.",
    "You give the tree a set number of answer-boxes and it fills the most helpful ones.");

  def("trees1",
    "What does min_impurity_decrease require of a split?",
    "That the split reduce weighted impurity by at least a set amount, or it is not made",
    ["That the impurity of the parent node already exceed a threshold before any split is attempted",
     "That every child node end up with impurity lower than the average impurity across the whole tree",
     "That the decrease in impurity be larger than the decrease achieved by any competing feature's split",
     "That the total impurity of the tree fall by a fixed percentage each time a new level is added"],
    "min_impurity_decrease",
    "A node is split only if the split lowers the (sample-weighted) impurity by at least min_impurity_decrease. Splits with tiny gains are rejected, acting as pre-pruning.",
    "If a split barely improves purity, it isn't worth it, so the tree skips it and makes a leaf instead.",
    "Splits that hardly help are thrown out before they happen.");

  def("trees1",
    "What is the variance-reduction criterion for splitting a regression tree?",
    "Choosing the split that most lowers the weighted variance of the target within the child nodes",
    ["Choosing the split whose child nodes have target means that differ from the parent mean by the most",
     "Choosing the split that maximises the correlation between the feature and the target across the node",
     "Choosing the split that leaves the largest number of samples in the purer of the two child nodes",
     "Choosing the split that minimises the absolute deviation of predictions on a held-out validation fold"],
    "Reduction in variance (regression splitting)",
    "Regression trees split to minimise within-node variance of the target (equivalently, to reduce mean squared error). The best split is the one whose children have the lowest combined weighted variance.",
    "For predicting numbers, a good split is one that makes the target values inside each resulting group as tightly clustered as possible.",
    "The tree splits so that the numbers in each branch end up close together.");

  def("trees1",
    "What is the twoing criterion in CART?",
    "A split rule that groups classes into two superclasses to find the split separating them best",
    ["A rule that always produces exactly two child nodes regardless of how many classes are present",
     "A method that builds two independent trees and keeps whichever one scores higher on validation data",
     "A pruning step that merges any two sibling leaves whose predicted classes happen to be identical",
     "A criterion that requires each split to double the purity of the node it is applied to before use"],
    "Twoing criterion",
    "Twoing is an alternative CART splitting rule that, at each node, forms two superclasses of the target categories and picks the split that best separates them, useful with many classes.",
    "Instead of scoring purity directly, it repeatedly lumps the categories into two teams and finds the split that best tells the two teams apart.",
    "It turns a many-class problem into a best two-way split at each step.");

  def("trees1",
    "What is recursive binary partitioning?",
    "Repeatedly splitting each region into two by a single feature threshold until a stop rule fires",
    ["Splitting the feature space into many equal boxes and assigning the majority class to each box",
     "Dividing the training data in half at random and fitting a separate small tree to each portion",
     "Cutting a node into as many children as the feature has distinct values, then repeating downward",
     "Alternating between splitting on features and merging leaves until the impurity stops decreasing"],
    "Recursive binary partitioning",
    "CART-style trees are built by recursive binary partitioning: each node is divided into two child regions by one feature/threshold, and the same procedure recurses on each child until a stopping rule halts it.",
    "The tree keeps chopping each group into two smaller groups, over and over, until it decides to stop.",
    "Split in two, then split each half in two, again and again.");

  def("trees1",
    "What is the split threshold at a decision node on a numeric feature?",
    "The cutoff value that sends samples below it one way and the rest the other way",
    ["The minimum impurity reduction a numeric feature must yield to be selected over a categorical one",
     "The proportion of samples that must lie on each side of the cut for the split to be considered valid",
     "The point on the feature axis where the predicted target value equals the overall node average",
     "The confidence level a split must exceed on validation data before it is written into the tree"],
    "Split threshold",
    "For a numeric feature, a decision node stores a threshold t and tests feature <= t; samples satisfying it go to one child and the rest to the other. Candidate thresholds usually sit between sorted feature values.",
    "At a numeric split the tree just asks 'is this value below the cutoff?' and branches accordingly.",
    "It's the dividing line, like 'age below 30 goes left, otherwise right.'");

  /* ===== Support Vector Machines (svm1) — 10 ===== */

  def("svm1",
    "What is a polynomial kernel in an SVM?",
    "A kernel of the form (x·z + c) raised to a degree d, giving polynomial feature interactions",
    ["A kernel that measures the shortest polynomial curve connecting two points in the input space",
     "A kernel that fits a separate polynomial regression to each feature before the margin is computed",
     "A kernel whose value falls off smoothly with the squared distance between the two input vectors",
     "A kernel that raises each individual feature to a chosen power before any dot product is taken"],
    "Polynomial kernel",
    "The polynomial kernel K(x,z) = (x·z + c)^d implicitly maps inputs into a space of feature products up to degree d, letting a linear SVM fit polynomial decision boundaries without forming those features.",
    "It lets the SVM draw curved, polynomial-shaped boundaries by pretending it has all the feature-product terms, without ever building them.",
    "It gives the SVM curved boundaries by mixing features together up to some power.");

  def("svm1",
    "What is the geometric margin of an SVM?",
    "The actual perpendicular distance from the hyperplane to the nearest training point",
    ["The signed score a point receives before it is scaled by the length of the weight vector",
     "The number of training points that lie exactly on the wrong side of the separating boundary",
     "The width of the region where the model refuses to make a prediction because it is uncertain",
     "The average distance from the hyperplane to every training point, weighted by its class label"],
    "Geometric margin",
    "The geometric margin is the true Euclidean distance from the decision hyperplane to the closest sample, obtained by normalising the functional margin by the norm of the weight vector. SVMs maximise it.",
    "It's the real, ruler-measured gap between the boundary and the nearest data point.",
    "How far, in actual distance, the closest point sits from the dividing line.");

  def("svm1",
    "What is the functional margin of a training point?",
    "The quantity y·(w·x + b), a sign-and-confidence score not normalised by the weight norm",
    ["The perpendicular distance from the point to the hyperplane after the weights are scaled to unit length",
     "The count of support vectors that share the same class label as the point being scored",
     "The slack a point is granted before it starts contributing a penalty to the soft-margin objective",
     "The probability, estimated by Platt scaling, that the point belongs to its assigned class"],
    "Functional margin",
    "The functional margin of (x, y) is y(w·x + b): positive when correctly classified and larger when farther on the right side. It is not a true distance because scaling w and b inflates it; dividing by ||w|| gives the geometric margin.",
    "It's a raw score of how confidently and correctly a point is classified, before turning it into an actual distance.",
    "A rough confidence number that goes up if you just scale the weights, which is why we normalise it.");

  def("svm1",
    "What is the linear kernel in an SVM?",
    "A kernel equal to the plain dot product x·z, giving a straight-line decision boundary",
    ["A kernel that projects inputs onto the single most discriminative straight line before classifying",
     "A kernel that connects each pair of points with a line and scores them by the line's slope",
     "A kernel whose response decreases linearly as the distance between two inputs grows larger",
     "A kernel that averages the features of the two inputs and compares the result to a threshold"],
    "Linear kernel",
    "The linear kernel K(x,z) = x·z performs no implicit mapping, so the SVM finds a plain hyperplane in the original feature space. It is fast and effective when data is already high-dimensional or roughly linearly separable.",
    "It's the SVM with no fancy transformation, just a straight dividing plane in the original features.",
    "The simplest SVM, drawing a straight boundary in the data as-is.");

  def("svm1",
    "What is the sigmoid kernel in an SVM?",
    "A kernel of the form tanh(a·(x·z) + c), loosely resembling a two-layer neural net",
    ["A kernel that passes the SVM's raw output through a logistic function to yield probabilities",
     "A kernel that squashes every feature into the zero-to-one range before the dot product is taken",
     "A kernel whose similarity score rises smoothly along an S-shaped curve as inputs move apart",
     "A kernel used only after training to calibrate the decision scores into well-behaved probabilities"],
    "Sigmoid kernel",
    "The sigmoid (hyperbolic-tangent) kernel K(x,z) = tanh(a x·z + c) behaves somewhat like a two-layer perceptron. It is not positive-definite for all parameters, so it is used less often than the RBF or polynomial kernels.",
    "It's a kernel shaped like the tanh function that makes the SVM act a bit like a small neural network.",
    "A less common kernel that mimics a simple neural net.");

  def("svm1",
    "What are slack variables in a soft-margin SVM?",
    "Non-negative terms that let individual points violate the margin, each adding to the penalty",
    ["Auxiliary weights the optimiser assigns to features so that scaling no longer affects the margin",
     "Extra support vectors introduced whenever the training data turns out not to be linearly separable",
     "The Lagrange multipliers that measure how strongly each constraint pushes on the final hyperplane",
     "Random offsets added to the labels so that the margin can be widened past the closest data points"],
    "Slack variables",
    "Slack variables (one per training point) measure how far a point falls inside or across the margin. The soft-margin objective minimises ||w||^2 plus C times the total slack, trading margin width against violations.",
    "They give each point permission to sit inside the margin or on the wrong side, at a cost the model tries to keep small.",
    "Little allowances that let some points break the margin, penalised so there aren't too many.");

  def("svm1",
    "What is the dual formulation of the SVM optimisation problem?",
    "Rewriting the problem in terms of per-point multipliers so inputs appear only as dot products",
    ["Solving two separate optimisation problems and averaging their hyperplanes to reduce variance",
     "Training one SVM per class and combining them so a multi-class decision can be produced at test time",
     "Expressing the margin as the difference between two parallel hyperplanes fit to the two classes",
     "Replacing the hinge loss with its squared version so the objective becomes twice differentiable"],
    "Dual formulation (Lagrangian)",
    "Via Lagrangian duality the SVM is rephrased in terms of multipliers (alphas) on the constraints; inputs enter only through dot products x_i·x_j. This is what makes the kernel trick possible, replacing those dot products with a kernel.",
    "Rewriting the problem so data shows up only as dot products, which is exactly the hook the kernel trick plugs into.",
    "A restated version of the math where you can swap in kernels.");

  def("svm1",
    "What is the one-vs-rest strategy for multi-class SVMs?",
    "Training one binary SVM per class against all other classes and picking the highest score",
    ["Training a binary SVM for every pair of classes and letting the pairwise winners cast votes",
     "Splitting the classes into two balanced superclasses and recursing until each class is isolated",
     "Fitting a single SVM whose output layer produces one margin score for each class at once",
     "Ranking the classes by frequency and comparing each in turn against the next most common one"],
    "One-vs-rest (OvR) multiclass",
    "One-vs-rest trains K binary SVMs, each separating one class from all the others, and assigns a new point to the class whose classifier gives the largest decision value. It needs only K models, versus K(K-1)/2 for one-vs-one.",
    "You build one 'this class or not' SVM per class and go with whichever is most confident.",
    "Each class gets its own yes/no detector, and the strongest yes wins.");

  def("svm1",
    "What is a hard-margin SVM?",
    "An SVM that permits no margin violations, requiring the classes to be perfectly separable",
    ["An SVM whose margin is fixed in advance rather than learned from the training data itself",
     "An SVM that uses a high value of C so that only a handful of misclassifications are tolerated",
     "An SVM that replaces the hinge loss with a squared penalty to make the boundary more rigid",
     "An SVM restricted to the linear kernel so that its decision boundary can never become curved"],
    "Hard-margin SVM",
    "A hard-margin SVM demands that every training point lie on the correct side of the margin with no slack. It only has a solution when the data is linearly separable; otherwise the soft-margin version (with slack) is required.",
    "It's the strict SVM that allows zero mistakes, which only works when the classes can be split cleanly.",
    "The no-exceptions version that needs perfectly separable data.");

  def("svm1",
    "What is Mercer's condition for a valid SVM kernel?",
    "That the kernel correspond to a dot product in some feature space, i.e. be positive semi-definite",
    ["That the kernel return values scaled between zero and one so they can be read as similarities",
     "That the kernel be symmetric and additionally decrease monotonically with the distance between inputs",
     "That the kernel matrix have full rank so the resulting optimisation problem has a unique solution",
     "That the kernel be differentiable everywhere so that gradient-based solvers can optimise the margin"],
    "Mercer's condition (valid kernels)",
    "A function is a valid kernel if it satisfies Mercer's condition: its Gram matrix is symmetric positive semi-definite for any inputs. This guarantees the kernel equals an inner product in some (possibly infinite) feature space.",
    "It's the mathematical rule a kernel must pass to genuinely stand in for a dot product in a hidden feature space.",
    "The test that says a kernel is legit and really represents similarity in some space.");

  /* ===== Random Forests (rf1) — 9 ===== */

  def("rf1",
    "What is mean decrease in impurity (MDI) feature importance?",
    "Importance from totalling a feature's impurity reductions over all its splits",
    ["Importance scored by shuffling a feature's values and measuring how much accuracy then drops",
     "Importance scored by counting how often a feature is chosen as the very first split in each tree",
     "Importance scored by the average depth at which a feature first appears along any root-to-leaf path",
     "Importance measured by removing a feature entirely and refitting the whole forest from scratch"],
    "Mean decrease in impurity (MDI)",
    "MDI (the default sklearn importance) sums, for each feature, the weighted impurity decreases of all splits that use it, averaged over the trees. It is fast but biased toward high-cardinality and continuous features.",
    "It rewards a feature for every split it powers, adding up how much purity those splits bought.",
    "A feature scores high if it does a lot of the tree's useful splitting work.");

  def("rf1",
    "What is permutation (mean decrease in accuracy) importance?",
    "The drop in accuracy when a feature's values are randomly shuffled",
    ["The total impurity a feature removes, summed over every node where it is used to split the data",
     "The share of trees in which a given feature is selected as the split at the root of the tree",
     "The correlation between a feature and the model's residuals measured on the training data",
     "The number of out-of-bag samples that change their predicted class when a feature is dropped"],
    "Permutation importance (MDA)",
    "Permutation importance shuffles a single feature's column (usually on held-out or OOB data) and records how much the score falls. A large fall means the model relied on that feature. It is model-agnostic and less biased than MDI.",
    "Scramble one column and see how much worse the model gets; a big drop means that feature mattered.",
    "If jumbling a feature wrecks predictions, it was important.");

  def("rf1",
    "What is a proximity matrix in a random forest?",
    "How often each pair of samples lands in the same leaf across the trees",
    ["A matrix of the pairwise distances between every tree's predictions on the training set",
     "A matrix listing, for each feature pair, how frequently they are chosen together in the same split",
     "A matrix that stores the correlation of errors between every two trees making up the ensemble",
     "A matrix giving the fraction of out-of-bag samples shared between each pair of bootstrap draws"],
    "Proximity matrix",
    "A random forest's proximity between two samples is the fraction of trees in which they fall into the same leaf. The resulting N x N matrix serves as a learned similarity, useful for clustering, outlier detection and missing-value imputation.",
    "It measures how alike two rows are by how often the forest's trees put them in the same final bucket.",
    "Two points are 'close' if the forest keeps landing them in the same leaves.");

  def("rf1",
    "What does the max_samples setting control in a bagged forest?",
    "How many samples are drawn for each tree's bootstrap draw",
    ["How many features are offered as split candidates at each node inside every individual tree",
     "The maximum number of samples any single leaf is permitted to contain before it must split",
     "The largest number of trees the forest may grow before out-of-bag error is finally evaluated",
     "The count of held-out samples reserved to estimate the forest's generalisation performance"],
    "max_samples (bootstrap size)",
    "max_samples sets the size of each bootstrap draw used to train a tree. Smaller draws make trees more diverse and speed up training on large datasets, at the cost of each tree seeing less data.",
    "It decides how big each tree's random sample is, letting you trade a little accuracy for more speed and diversity.",
    "How many rows each tree gets to train on.");

  def("rf1",
    "What does the 63.2% rule describe about a bootstrap sample?",
    "That a size-n bootstrap holds about 63.2% of the distinct original rows",
    ["That roughly 63.2% of the trees in a forest must agree before a prediction is deemed confident",
     "That about 63.2% of the features should be sampled at each node to best decorrelate the trees",
     "That a forest reaches most of its accuracy once about 63.2% of the planned trees are built",
     "That around 63.2% of out-of-bag samples are enough to give an unbiased error estimate"],
    "The 63.2% rule (bootstrap coverage)",
    "Sampling n items with replacement leaves each specific row out with probability (1 - 1/n)^n, which tends to 1/e as n grows. So about 36.8% are never drawn and roughly 63.2% distinct rows appear, the rest being the out-of-bag set.",
    "Because sampling with replacement repeats some rows, each tree ends up seeing only about two-thirds of the unique data; the missing third is its out-of-bag set.",
    "Each tree naturally sees about 63% of the rows and skips the rest.");

  def("rf1",
    "What is soft voting in a random forest classifier?",
    "Averaging the per-class probabilities from all trees and predicting the class with the highest mean",
    ["Letting each tree cast one vote for its top class and taking whichever class collects the most votes",
     "Weighting each tree's vote by its individual out-of-bag accuracy before the votes are tallied",
     "Discarding the least confident trees and only counting votes from those above a probability cutoff",
     "Choosing the class whose predicted probability exceeds a tuned threshold rather than a simple majority"],
    "Soft voting (probability averaging)",
    "In soft voting the forest averages the class-probability estimates from every tree and picks the class with the largest average. Because it uses graded probabilities rather than one-vote-per-tree, it often edges out hard majority voting.",
    "Instead of each tree shouting a single answer, the forest averages their confidence for each class and picks the top one.",
    "The forest blends the trees' probabilities rather than just counting winners.");

  def("rf1",
    "Why is training a random forest called embarrassingly parallel?",
    "Because each tree is built independently, so all trees can be grown at once",
    ["Because the trees must be grown one after another, each correcting the errors of the previous one",
     "Because every tree shares a single global impurity table that all cores update simultaneously",
     "Because the bootstrap samples overlap so heavily that the trees can reuse each other's computations",
     "Because parallel hardware is required before a forest can reach a usable level of accuracy at all"],
    "Embarrassingly parallel training",
    "A random forest's trees are fit on independent bootstrap samples with no communication between them, so training distributes trivially across cores or machines (n_jobs in sklearn). This is unlike boosting, which is inherently sequential.",
    "Since no tree needs any other tree to be built first, you can grow them all at once across many processors.",
    "The trees don't depend on each other, so you can build them all in parallel.");

  def("rf1",
    "How does bagging affect a model's bias and variance?",
    "It mainly cuts variance by averaging while leaving each learner's bias roughly unchanged",
    ["It lowers bias sharply by letting each successive tree focus on the previous tree's mistakes",
     "It reduces both bias and variance equally as long as enough bootstrap samples are drawn",
     "It trades lower variance for a large rise in bias, which is why the base trees are kept shallow",
     "It removes variance entirely once the number of trees exceeds the number of training features"],
    "Bagging cuts variance, not bias",
    "Averaging many high-variance, low-bias trees over bootstrap samples shrinks variance while the ensemble's bias stays close to that of a single tree. This is why bagging pairs best with deep, unpruned (low-bias) trees.",
    "Averaging steadies the wobble (variance) but doesn't fix any built-in offset (bias), so you feed it deep trees that already have low bias.",
    "Bagging smooths out noise, not systematic error, so it wants deep trees.");

  def("rf1",
    "What does the warm_start option let you do with a random forest?",
    "Add more trees to an already-fitted forest instead of refitting it",
    ["Resume training from a checkpoint after the process was interrupted partway through fitting",
     "Reuse the splits found by an earlier forest as a starting point for a differently tuned one",
     "Initialise the trees with the feature importances learned by a previously trained model",
     "Keep the bootstrap samples fixed across runs so that results are exactly reproducible each time"],
    "warm_start (growing the forest)",
    "With warm_start=True, increasing n_estimators and refitting appends new trees to the existing ensemble rather than rebuilding it. This makes it cheap to search for how many trees are enough without repeating earlier work.",
    "It lets you keep the trees you already grew and just tack on more, which is handy for finding the right forest size.",
    "You can grow extra trees onto the forest you already have.");
})();
