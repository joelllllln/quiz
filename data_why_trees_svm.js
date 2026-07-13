/* Why-wrong notes: Decision Trees, Support Vector Machines. Keyed by exact question stem; one entry per distractor, same order as choices[1..]. */
(function () {
  var W = (window.WHYNOT = window.WHYNOT || {});
  W["How does training actually build a decision tree from the data?"] = [
    "Searching every possible whole-tree shape is computationally intractable; trees are grown greedily, one split at a time, never comparing whole trees.",
    "That's bottom-up merging, like hierarchical clustering; trees grow top-down from the root, splitting groups rather than merging them.",
    "Adjusting weights over many passes is gradient training for logistic regression or neural nets; trees have no weights, only splits to pick.",
    "Trees never draw one smooth curve; each split is a single axis-aligned cut, added one at a time."
  ];
  W["The same decision tree can predict a category OR a number. What differs between the two?"] = [
    "Both kinds of tree can split on numeric features with thresholds; numeric questions aren't unique to either version.",
    "No tree ever tries to increase impurity; both versions pick splits that make groups purer.",
    "Every decision tree has exactly one root; regression trees don't grow extra roots.",
    "Neither version stores all training rows in every leaf; each leaf only summarises the cases that landed in it."
  ];
  W["In a decision tree, what is a 'node' (a split)?"] = [
    "Weights multiplied by features describe linear models or neural nets; a tree node just compares one feature to a threshold.",
    "An endpoint holding the prediction is a leaf; a node/split is an internal question, not the final answer.",
    "A node isn't a tally of anything; it's a single yes/no test on one feature.",
    "An averaged label is what a regression leaf outputs; a node routes cases onward, it doesn't hold a prediction."
  ];
  W["What is the 'root' of a decision tree?"] = [
    "That describes a leaf; the root is where every case starts, not where a prediction is stored.",
    "The root is the very top, seen by all cases; a deep, rarely-visited branch is its opposite.",
    "Training puts the MOST informative split at the root, not the feature with the least impurity reduction.",
    "Trees never average their leaves into one value; the root is a question, not an aggregate prediction."
  ];
  W["What do 'Gini' and 'entropy' measure in a decision tree?"] = [
    "Depth limits come from hyperparameters like max_depth; Gini and entropy score label mixed-ness, not tree size.",
    "Leaf sample counts measure size; impurity measures how mixed the labels are, not how many cases there are.",
    "Distance between cases is KNN/SVM territory; trees never measure it, and impurity is about label mix.",
    "Impurity is computed on training labels during growth; it says nothing about confidence on unseen cases."
  ];
  W["What does 'pruning' a decision tree mean?"] = [
    "That's the opposite of pruning — growing more; perfectly pure leaves are exactly the overfitting pruning fights.",
    "That's feature scaling, which trees don't even need; pruning changes the tree's branches, not its inputs.",
    "Averaging many trees is bagging (random forests), an ensemble method, not pruning a single tree.",
    "Pruning removes branches; it never reorders splits, and trees aren't optimised for question cost anyway."
  ];
  W["What does a decision tree's 'feature importance' tell you?"] = [
    "Impurity-based importance has no sign; it says how much a feature helped split, not which direction it pushes predictions.",
    "Importance sums contributions across the WHOLE tree, not just which feature won the root split.",
    "Correlation between two features is a data statistic; importance measures each feature's splitting work inside the trained tree.",
    "Column order is irrelevant to training; importance comes from impurity reductions, not the order features were supplied."
  ];
  W["A decision tree classifies a customer. What is the model actually made of?"] = [
    "A weighted sum passed to a curve is logistic regression; a tree has no weights, only yes/no questions.",
    "Storing all training examples for lookup is KNN; a tree keeps only its questions and leaf verdicts.",
    "Multiplying per-feature probability factors is naive Bayes, not a decision tree.",
    "One straight dividing line is a linear classifier; a tree stacks many axis-aligned cuts instead."
  ];
  W["Training must choose WHERE to place each question's cutoff. What makes one cutoff better than another?"] = [
    "Equal-sized sides can still be hopelessly mixed; the goal is purer sides, not balanced counts.",
    "The range midpoint is arbitrary; the best cutoff is wherever labels separate cleanest, which is rarely the centre.",
    "The feature's average has no special separating power; cutoffs are scored by impurity, not by matching means.",
    "Depth isn't the goal — a good cutoff purifies the two sides now; chasing the deepest tree is just overfitting."
  ];
  W["A trained tree routes a new customer down its branches to a leaf. What does the leaf actually contain?"] = [
    "Leaves hold no formulas or weights; they simply report the majority label of their training occupants.",
    "Nearest-point lookup is KNN at query time; a tree pre-sorted points into leaves and uses the group's majority.",
    "Cases never loop back to the root; a leaf is the end of the path, holding a verdict.",
    "All splits are fixed at training time; nothing is recomputed when a new case arrives."
  ];
  W["You let a tree grow deeper and deeper with no limit. What happens on the training data?"] = [
    "It doesn't plateau — with enough splits the tree isolates every point and reaches 100% on training data.",
    "Nothing halts growth automatically unless you set a limit; the tree keeps splitting until leaves are pure.",
    "Training accuracy can only rise (or hold) with more depth; it's VALIDATION accuracy that falls from overfitting.",
    "Trees never merge leaves during growth; splitting only carves groups finer."
  ];
  W["You sweep the tree's maximum depth and score each version on training AND validation data. What do you expect to see?"] = [
    "Validation doesn't keep climbing; past the sweet spot the extra depth fits noise and validation falls.",
    "Training accuracy never falls with more depth — a deeper tree always fits the training data at least as well.",
    "That's backwards: training is the curve that keeps climbing; validation is the one that peaks and then drops.",
    "Depth is the tree's main complexity dial; both curves respond to it strongly, they aren't flat."
  ];
  W["You forgot to standardise the features before training your tree — incomes in pounds, ages in years. How bad is it?"] = [
    "Nothing breaks: a tree never compares features against each other; it thresholds one feature at a time, so units don't matter.",
    "Big-scale features dominate in distance-based models like KNN or SVM; tree splits never mix features into one number.",
    "Scaling has no effect on tree training speed or its result; thresholds simply adapt to whatever units you use.",
    "Not even the root is affected — every split is scale-invariant because its threshold adjusts to the units."
  ];
  W["The true boundary between two classes is a smooth diagonal line. What does a decision tree's boundary look like there?"] = [
    "A tree can't draw a slanted line; each split cuts on one feature, so every boundary piece is horizontal or vertical.",
    "Trees produce no curves at all — every boundary segment is an axis-aligned straight cut.",
    "A circle needs a curved boundary; a tree only stacks right-angled cuts, and a diagonal truth wouldn't suggest one anyway.",
    "Trees CAN attempt diagonals; they approximate them with stair-steps, and more depth just makes the steps finer."
  ];
  W["A regulator asks WHY the model rejected application #4172. What can a decision tree offer that most models can't?"] = [
    "Trees have no learned weights; confidence intervals on coefficients belong to statistical linear models.",
    "Trees aren't trained by gradients, and a loss gradient wouldn't explain a decision to a regulator anyway.",
    "Nearest-example explanations fit KNN; a tree explains via its question path, not by pointing at a similar case.",
    "Saliency heat-maps explain image neural networks; a tree on tabular data offers its readable decision path instead."
  ];
  W["You retrain a tree after removing just three rows of training data — and get a visibly different tree. What is this property called?"] = [
    "High bias means too rigid to fit — the opposite problem; a tree that reshuffles with tiny data changes is high VARIANCE.",
    "This instability is inherent to greedy tree-building, not a symptom of misconfigured regularisation.",
    "Label leakage means the target snuck into the features; it has nothing to do with structure changing after removing rows.",
    "Drift is the incoming data's distribution changing over time; here the same data was used minus three rows."
  ];
  W["Random forests train many trees on random resamples and average their votes. What problem of single trees does this directly attack?"] = [
    "Single trees fit training data TOO well if anything; underfitting isn't their problem, instability is.",
    "Trees never needed feature scaling in the first place, so forests aren't fixing that.",
    "Single trees predict very fast; a forest actually slows prediction by running many trees.",
    "Forest trees still use axis-aligned splits; averaging softens boundaries but doesn't remove that constraint."
  ];
  W["What is a decision tree?"] = [
    "A widest-gap straight line is a support vector machine, not a tree.",
    "Averaging the labels of nearby points is k-nearest neighbours; a tree routes through questions instead.",
    "Multiplying independent feature probabilities is naive Bayes, not a tree.",
    "Nudging weights against a smooth loss is gradient training (logistic regression, neural nets); trees grow by discrete splits."
  ];
  W["In a decision tree, what is a 'leaf' node?"] = [
    "The top node making the first split is the root; a leaf sits at the bottom where questions stop.",
    "Internal nodes test and route cases onward; a leaf has no test and no branches — it just outputs the answer.",
    "A threshold is part of a split's rule, not a node type; the leaf is the terminal endpoint.",
    "How mixed the labels are is impurity, a score used to choose splits, not a kind of node."
  ];
  W["In a decision tree, what is a 'split'?"] = [
    "The final label at a terminal node is the leaf's prediction; a split is the routing test above it.",
    "Removing low-value branches is pruning; a split partitions cases, it doesn't remove anything.",
    "Levels from root to deepest leaf is the tree's depth, a size measure, not the test at a node.",
    "The fraction misclassified is the error rate, an evaluation metric, not part of the tree's structure."
  ];
  W["In a decision tree, what is 'node impurity'?"] = [
    "That's just the node's sample count; impurity measures label mix, not volume of examples.",
    "Depth is a node's position in the tree; impurity is about how blended the labels are at that node.",
    "Split ordering isn't scored by a probability; impurity looks at the labels present, not the sequence of tests.",
    "Features never used elsewhere are irrelevant; impurity depends only on the class mix of the node's examples."
  ];
  W["In a decision tree, what is 'Gini impurity'?"] = [
    "A sample count says nothing about label mix; Gini is computed from class PROPORTIONS, not totals.",
    "That's information gain — the impurity DROP a split achieves; Gini is a node's mixed-ness score itself.",
    "The maximum levels allowed is max_depth, a hyperparameter unrelated to impurity.",
    "Average path length measures tree shape; Gini is about the class mix inside one node."
  ];
  W["In a decision tree, what is 'entropy'?"] = [
    "The deepest leaf's depth is tree depth; entropy scores label disorder within a node.",
    "The number of splits measures tree size; entropy measures label mix, zero when pure and maximal at an even blend.",
    "Data reserved for validation is an evaluation choice; entropy has nothing to do with holdout proportions.",
    "A threshold triggering a branch is a split's cutoff value; entropy is a property of a node's labels, not a routing rule."
  ];
  W["In a decision tree, what is 'information gain'?"] = [
    "The number of available features is fixed by the dataset; gain measures how much one split purifies its children.",
    "Counting correct classifications is accuracy, an evaluation metric; gain is computed per split during growth.",
    "Gain isn't about depth; it's the parent-minus-children impurity drop for one candidate split.",
    "Split ordering emerges FROM comparing gains; gain itself is an impurity reduction, not a probability of ordering."
  ];
  W["In a decision tree, what does the 'max_depth' hyperparameter control?"] = [
    "The minimum examples needed before splitting is min_samples_split, a different pre-pruning knob.",
    "Features sampled per split is max_features, used notably in random forests, not a depth cap.",
    "The impurity criterion is the separate 'criterion' setting (gini vs entropy), not a growth limit.",
    "max_depth caps levels during growth; it reserves no data and has nothing to do with a pruning holdout."
  ];
  W["In decision-tree learning, what is 'greedy splitting'?"] = [
    "Exhaustively growing every tree is intractable, and picking by TEST accuracy would leak the test set; greedy means no global search at all.",
    "Missing-value counts play no role in choosing splits; candidates are ranked by impurity reduction.",
    "Removing branches after training is post-pruning, a cleanup step; greedy splitting is about how splits are chosen during growth.",
    "Leaves do report majority classes, but that's leaf labelling, not the greedy strategy for picking splits."
  ];
  W["In a decision tree, what does an 'axis-aligned decision boundary' mean?"] = [
    "Trees can't fit smooth curves; each split cuts perpendicular to one feature axis.",
    "A line at an arbitrary angle needs a weighted combination of features; a tree tests one feature at a time, so cuts stay axis-parallel.",
    "Distance-to-nearest-example boundaries describe KNN; tree boundaries come from feature thresholds.",
    "Following the greatest-variance direction is PCA's job; tree splits ignore variance directions and cut along raw axes."
  ];
  W["sklearn lets you grow trees with criterion='gini' or criterion='entropy'. Plot both impurity measures against a node's class mix — what do you find, and why is gini the default?"] = [
    "The two criteria pick nearly identical splits in practice; swapping them rarely changes the tree, let alone its accuracy.",
    "Gini's formula (1 minus the sum of squared proportions) works for any number of classes, not just two.",
    "Regression trees use variance-style criteria like squared error; gini and entropy are both classification measures.",
    "Backwards: both measures are ZERO at a pure node and peak at a 50/50 mix."
  ];
  W["min_samples_leaf is the classic pre-pruning knob. Sweep it from 1 to 100 and watch training vs validation accuracy. What is it actually forbidding, and where does validation peak?"] = [
    "Capping depth is max_depth's job; min_samples_leaf limits leaf SIZE, and validation at the smallest N is where overfitting lives, not the peak.",
    "Restricting features per split is max_features; and validation doesn't keep climbing — a very large N underfits.",
    "It removes no data at all; it only refuses splits that would create leaves smaller than N samples.",
    "There's no per-leaf accuracy requirement, and forcing impure leaves to keep splitting would be the opposite of pruning."
  ];
  W["Cost-complexity pruning (ccp_alpha) takes the opposite route: grow the tree fully FIRST, then cut. What does raising alpha do to the finished tree?"] = [
    "Pruning is by cost-effectiveness, not by layer; it snips whichever branches gain too little per added leaf, at any depth.",
    "ccp_alpha never touches input columns; it removes tree branches, not features.",
    "No retraining or resampling happens; the fully grown tree is trimmed in place.",
    "Classes are never merged; alpha weighs each branch's accuracy gain against the leaves it adds."
  ];
  W["A decision tree is used for REGRESSION: predicting house price from floor area. What does its prediction curve actually look like across floor areas, and why?"] = [
    "A least-squares line is linear regression; a tree predicts a constant per leaf, so its curve is flat steps, not a sloped line.",
    "Trees can't produce smooth curves; every leaf outputs one constant, so the plot is piecewise flat.",
    "Passing through every house needs one leaf per point (an unlimited tree); normal leaves average several houses into one step.",
    "One flat line is a tree with no splits; a real tree cuts floor area into ranges, each with its own step."
  ];
  W["A tree was trained on sales data from 2016–2020, where sales grew ~10% every year. Ask it to predict 2024. What does it say, and what's the general lesson?"] = [
    "Trees can't extend trends; any 2024 input falls into an edge leaf and receives that leaf's stored constant, not a projected +10%.",
    "It happily predicts — out-of-range inputs just route to an edge leaf; no error is raised.",
    "Unseen years don't map to zero; the splits route them to the nearest edge leaf's average.",
    "Trees never interpolate between leaves; a leaf returns its stored constant, full stop."
  ];
  W["You retrain the same tree pipeline six times, changing only the random seed, and record the importance score of the feature 'income' each time. The scores land all over the place. What's the honest reading?"] = [
    "No bug is needed: tie-breaks, subsampling and resampling make impurity importances legitimately seed-dependent.",
    "Topping a noisy list proves little; with correlated features the credit shuffles between them on every retrain.",
    "There is no single 'true' importance to recover — the quantity itself is unstable, especially with correlated features.",
    "More retrains steady the average but the run-to-run scatter remains; the instability is structural, not curable by repetition."
  ];
  W["Your dataset has missing values in 25% of rows. One team drops incomplete rows before training a tree; another uses a tree that handles missing values natively. Sweep the missingness up — what happens?"] = [
    "Dropping rows discards whole examples while native handling keeps them; the two degrade at very different rates.",
    "At high missingness dropping throws away huge chunks of data; native handling learns default branches and keeps the signal.",
    "Native handling has no cliff at 10%; it degrades gradually because rows with blanks still contribute to splits.",
    "Trees are among the models that cope BEST with missing values; recollecting the data is rarely necessary."
  ];
  W["You call predict_proba on a decision tree and nearly every answer is exactly 0% or 100%. Where do a tree's probabilities actually come from, and what tames these extremes?"] = [
    "No sigmoid or depth is involved; a tree's probability is simply the class fraction inside the leaf.",
    "Distance-to-boundary scores belong to SVMs and linear models; trees only count leaf class fractions.",
    "Trees compute no posterior; a pure 3-sample leaf says '100%' from counting alone — a small-sample artefact, not an exact probability.",
    "Tiny pure leaves are usually badly calibrated; 0/100 outputs reflect small counts, not genuine certainty."
  ];
  W["Train two trees on datasets that overlap 95% — a tiny resample — and compare their test predictions as depth grows. What does this experiment expose about trees?"] = [
    "Deeper trees fit finer noise, so tiny data differences make them disagree MORE, not converge.",
    "Shallow trees are the stable ones; their few splits rest on lots of data, while deep splits hinge on handfuls of points.",
    "Disagreement is exactly the expected behaviour of a high-variance learner; nothing was misconfigured.",
    "Depth is THE complexity dial; it changes what the tree learns, not just how fast it runs."
  ];
  W["Fraud is 1 in 50 transactions, and a plain tree learns to wave nearly everything through. You set class_weight={fraud: 20}. What does this change inside the tree?"] = [
    "class_weight reweights samples inside the impurity maths; no rows are copied and nothing grows on disk.",
    "The weights change TRAINING — which splits look worthwhile — not merely a threshold applied afterwards.",
    "There is no per-leaf cap on the majority class; every sample stays, the fraud ones just count 20x in the split scores.",
    "The criterion is untouched; the weights change the class proportions fed into whichever criterion you already chose."
  ];
  W["sklearn's DecisionTreeClassifier is an implementation of CART. Against the older ID3/C4.5 family, what marks a CART tree?"] = [
    "Multiway fan-out per categorical level is ID3/C4.5 behaviour; CART splits are strictly binary.",
    "Categorical-only is closer to ID3's limitation; CART handles numeric features natively via thresholds, plus regression.",
    "CART introduced cost-complexity pruning; trimming a fully grown tree is one of its signatures, not impossible.",
    "No tree variant needs feature scaling; one-feature threshold splits are scale-invariant."
  ];
  W["One-hot encode a 50-level categorical (e.g. US state) and feed it to a tree, and performance often DROPS versus smarter encodings. Why do trees particularly dislike wide one-hot features?"] = [
    "Trees split 0/1 indicator columns perfectly well; the problem is inefficiency, not inability.",
    "Zero-frequency is a naive Bayes issue with probability estimates; trees don't multiply probabilities at all.",
    "Gini computes fine on any binary column; nothing about having 50 of them breaks the maths.",
    "One-hot columns are already 0/1 and trees ignore scale anyway; scaling is irrelevant here."
  ];
  W["On bag-of-words text (30,000 sparse 0/1 columns), decision trees lag far behind plain logistic regression — reversing the usual tabular story. What makes wide, sparse data tree-hostile?"] = [
    "Trees can split on mostly-zero columns fine; the real issue is each split consults ONE word while the evidence is spread over thousands.",
    "Trees never need feature scaling; impurity works on raw counts without trouble.",
    "Gini is perfectly defined for 0/1 features; there is no fallback heuristic.",
    "Memory isn't the core problem; even with unlimited RAM, one-word-per-split trees can't sum thousands of weak clues like a linear model."
  ];
  W["You've grown a tree and want the right ccp_alpha. sklearn hands you cost_complexity_pruning_path() with a list of candidate alphas. What is the canonical selection procedure from there?"] = [
    "The smallest tree isn't the goal — maximum pruning usually underfits; you want the alpha that cross-validates best.",
    "Clinging to 100% training accuracy preserves the overfitting; pruning deliberately trades training fit for validation gain.",
    "Candidate alphas aren't meant to be averaged; each defines a different subtree that must be scored by cross-validation.",
    "There is no universal alpha; the right value is dataset-specific, which is exactly why the path plus CV procedure exists."
  ];
  W["A tree must learn 'risky when debt exceeds a third of income' from raw debt and income columns. It builds a big, mediocre staircase. Adding ONE engineered column fixes everything. Which, and why is this a general principle for trees?"] = [
    "A duplicate column adds zero information; the tree could already split on income, and copies don't create the diagonal rule.",
    "Debt squared still leaves a two-feature rule; the debt threshold still depends on income, so no single split captures it.",
    "Noise features can only be split on spuriously; they add overfitting risk, not regularisation.",
    "The rule compares debt TO income as a ratio; a threshold on debt+income doesn't correspond to 'debt over a third of income'."
  ];
  W["Compliance requires: 'higher income must never DECREASE the approval score'. Your tree ensemble occasionally violates this on odd segments. Modern libraries offer a clean fix. What is it?"] = [
    "Deleting your most relevant feature guts accuracy; the rule concerns the DIRECTION of income's effect, not its absence.",
    "Binning coarsens income but the model can still dip across bins; nothing enforces the required direction.",
    "Patching outputs afterwards is fragile and hard to keep consistent; the clean fix constrains the splits during training itself.",
    "A seed lottery guarantees nothing and can't be audited; compliance needs the property enforced by construction."
  ];
  W["A tree-based model forecasts daily sales. With random K-fold CV it scores 94%; deployed, it collapses to 71%. The features include 7-day rolling averages. Where did the evaluation lie?"] = [
    "Depth wasn't the issue; the 94% was inflated because random folds let the model train on days AFTER the ones it 'predicted'.",
    "A 23-point gap isn't rounding; it's temporal leakage — future information reached training via random folds and straddling rolling features.",
    "Trees can forecast with lag features; the failure here was the evaluation protocol, not the model class.",
    "Trees don't care about feature scale; scaling has nothing to do with the CV-versus-deployment gap."
  ];
  W["Final judgement: when should you reach for a tree/tree-ensemble, and when for a linear model? Distil the whole topic into the honest decision guide."] = [
    "Boosted trees lose on wide sparse data, extrapolation and tiny samples, and can't give coefficient explanations — 'always' overclaims.",
    "Linear models miss the thresholds and interactions that dominate messy tabular data, where tree ensembles routinely win.",
    "Both families do both tasks — regression trees and linear classifiers exist; the split is by data shape, not by task type.",
    "Their strengths differ systematically by data type; the choice often changes accuracy a lot, not just training speed."
  ];
  W["What kind of machine-learning task is a support vector machine (SVM) built for?"] = [
    "Grouping unlabelled points is clustering, which is unsupervised; an SVM needs labelled examples to learn its boundary.",
    "Predicting a continuous value is regression; the classic SVM is a classifier (SVR is a separate variant).",
    "Compressing features is dimensionality reduction, PCA's job, not an SVM's.",
    "Choosing actions for reward is reinforcement learning, a different paradigm entirely."
  ];
  W["In a support vector machine, what is the 'decision boundary'?"] = [
    "The empty street between the boundary and the nearest points is the MARGIN, not the boundary itself.",
    "The points that pin the model in place are the support vectors; the boundary is the surface they pin.",
    "The penalty per misclassified point is what C controls — a training cost, not a surface.",
    "The similarity function comparing pairs of points is the kernel; it shapes the boundary but isn't the boundary."
  ];
  W["What is the 'kernel trick' in an SVM?"] = [
    "Explicitly building and storing the mapped coordinates is exactly what the trick AVOIDS — only pairwise similarities are computed.",
    "Stacking many straight cuts is how decision trees approximate curves; kernels change the space instead.",
    "Widening the margin can't make curved classes separable; that takes a richer feature space, not a wider street.",
    "Gamma tunes one particular kernel's reach; it isn't the trick of skipping explicit feature construction."
  ];
  W["Many straight lines separate two classes perfectly. Which one does an SVM choose?"] = [
    "Class centroids ignore the borderline points; a line through them can pass dangerously close to boundary cases.",
    "Minimising squared error is regression's criterion; the SVM's tiebreaker is margin width, not squared error.",
    "All perfect separators can avoid touching points; the SVM wants the widest CLEARANCE, not the fewest touches.",
    "Aligning with the largest class spread is PCA-style thinking; the SVM only cares about distance to the nearest points."
  ];
  W["In a trained SVM, which training points actually determine where the boundary sits?"] = [
    "Points far from the boundary contribute nothing; remove them and the boundary doesn't move an inch.",
    "Training order doesn't matter; what counts is which points end up touching or violating the margin.",
    "Points near each class CENTRE are the safest and least influential; the boundary is set by the edge cases.",
    "Exactly backwards — the farthest points have zero influence; the closest ones pin the boundary."
  ];
  W["Real data is messy — one stray point sits inside the other class. A 'soft margin' SVM handles this how?"] = [
    "Wrapping the boundary tightly around one stray point is overfitting; the soft margin does the opposite and lets the point be wrong.",
    "No data is dropped; the stray point stays in training and simply incurs a penalty.",
    "Gamma is an RBF kernel knob, not the soft-margin mechanism — and raising it encourages overfitting strays, not ignoring them.",
    "A zero margin defeats the whole purpose; the soft margin keeps the street WIDE by paying for a few violations."
  ];
  W["One class forms a ring AROUND the other — no straight line can separate them. The kernel idea rescues SVM how?"] = [
    "A single SVM has one boundary; stacking many straight cuts is how trees work, not how SVMs handle rings.",
    "C only trades violations for width; no value of C lets a straight line separate a ring from its core.",
    "Swapping in a tree abandons the SVM rather than rescuing it; the kernel keeps the margin machinery and changes the space.",
    "Margin width can't fix inseparability; no straight line splits ring from core at any width."
  ];
  W["Why does a WIDER margin tend to mean better performance on future data?"] = [
    "The margin is an EMPTY buffer; it isn't about enclosing training points inside it.",
    "Prediction speed depends on the number of support vectors and features, not on how wide the margin is.",
    "Margin width has nothing to do with memory; a narrow margin's risk is misclassifying jittered new points.",
    "Nothing guarantees zero future errors; a wide margin only reduces the chance that noise flips points across."
  ];
  W["After training an SVM on 50,000 points, only 900 turn out to be support vectors. What does that mean for the deployed model?"] = [
    "Predictions use support vectors only; the other 49,100 points can be deleted with zero effect on the model.",
    "Those points weren't noise — they were easy, correctly classified cases that simply never influenced the boundary.",
    "Ending with few support vectors means training SUCCEEDED with a clean margin, not that it stalled.",
    "Support-vector count says nothing about how many future cases it can handle; it predicts for unlimited new points."
  ];
  W["You feed an SVM raw features: age (18–70) and salary (£20,000–£90,000). What happens to the margin calculation?"] = [
    "Margins are distances, and distances sum raw feature gaps — salary gaps in the thousands drown age gaps in the tens.",
    "Column order is irrelevant to a distance; magnitude is what dominates, and salary's numbers are far bigger.",
    "The RBF kernel is built ON distances, so it inherits the same scale sensitivity — it cancels nothing.",
    "Margins are measured in the feature space's units; unscaled, that geometry is warped by the biggest feature."
  ];
  W["With an RBF kernel, the gamma parameter controls each training point's radius of influence. What does a very LARGE gamma produce?"] = [
    "One smooth sweeping boundary is what a very SMALL gamma produces — broad influence, possible underfitting.",
    "RBF boundaries only approach straight lines at tiny gamma; a huge gamma makes them maximally wiggly.",
    "Gamma changes the fit itself, dramatically — it is not a speed-only knob.",
    "Tiny influence radii carve tight bubbles around points — the opposite of wide, forgiving margins."
  ];
  W["Logistic regression and SVM both draw linear boundaries, but their training goals differ. What does each care about?"] = [
    "You've swapped them: the widest margin is the SVM's goal, and calibrated probabilities are logistic regression's.",
    "Raw misclassification count is neither model's objective — it isn't even smoothly optimisable; they use log loss and hinge loss.",
    "Backwards: geometric distance (the margin) is SVM territory, and log-odds are logistic regression's currency.",
    "Log loss keeps penalising even safe points; hinge loss goes flat past the margin — genuinely different objectives."
  ];
  W["You have 5 million training rows and need probability outputs, retrained nightly. Why might you NOT reach for a kernel SVM?"] = [
    "Kernel SVMs handle many features fine; it's the ROW count that hurts, because training compares pairs of points.",
    "The C parameter is exactly the SVM's regulariser; regularisation is not the problem.",
    "Classic SVM solvers run on ordinary CPUs; the objection is the n²-ish scaling with rows, not hardware.",
    "SVMs are general-purpose (historically strong on text and tabular data); the issue here is scale, not domain."
  ];
  W["What is a support vector machine?"] = [
    "A chain of yes/no feature tests down to a leaf is a decision tree.",
    "Multiplying independent feature probabilities is naive Bayes.",
    "Averaging the labels of the k nearest points is k-nearest neighbours.",
    "Fitting an S-shaped probability curve is logistic regression."
  ];
  W["In an SVM, what is the 'separating hyperplane'?"] = [
    "The closest points that pin the boundary are the support vectors, not the hyperplane itself.",
    "The width of the empty gap is the margin; the hyperplane is the divider, not the gap around it.",
    "The mapping into a higher-dimensional space is the kernel/feature map, not the decision surface.",
    "The penalty for wrong-side points is the slack cost controlled by C, not a surface."
  ];
  W["In an SVM, what is the 'margin'?"] = [
    "The fraction misclassified is the training error rate; the margin is a geometric width, not an error count.",
    "The per-violation penalty is the C-scaled slack term; the margin is the gap that penalty trades against.",
    "Feature count is the data's dimensionality, unrelated to the buffer around the boundary.",
    "Kernels don't fit a curve through the data, and the margin is a distance, not a curve."
  ];
  W["In an SVM, what are the 'support vectors'?"] = [
    "Features are the axes describing every example; support vectors are specific training POINTS near the boundary.",
    "Per-feature weights are the model's coefficients; support vectors are data points, not weights.",
    "Backwards — the farthest points are the ones that don't matter; support vectors are the closest.",
    "Extra kernel dimensions belong to the feature space, not the training set; support vectors are actual examples."
  ];
  W["In an SVM, what is a 'kernel'?"] = [
    "A kernel is a function comparing PAIRS of examples, not any single training point.",
    "The per-misclassification penalty is C's job, not the similarity function's.",
    "The margin width is what the SVM maximises; the kernel defines the space that margin lives in.",
    "SVMs aren't trained with a learning-rate schedule; a kernel measures similarity, it doesn't set step sizes."
  ];
  W["In an SVM, what is the 'RBF kernel'?"] = [
    "A plain dot product is the LINEAR kernel; RBF similarity depends on distance and enables curved boundaries.",
    "Raising the dot product to a power is the POLYNOMIAL kernel, not RBF.",
    "No standard SVM term penalises the support-vector count; the RBF is a similarity function, not a penalty.",
    "Choosing how many neighbours to consult is KNN's hyperparameter; RBF's knob is gamma, not k."
  ];
  W["In an SVM, what does the 'C' (regularization) parameter control?"] = [
    "The implicit space's dimensionality comes from the kernel choice; C prices margin violations instead.",
    "The RBF similarity's decay rate is gamma, not C.",
    "The support-vector count emerges from training; C doesn't set a cap on it.",
    "The classification cutoff on the decision function is a predict-time choice; C shapes training itself."
  ];
  W["In an SVM with an RBF kernel, what does the 'gamma' parameter control?"] = [
    "The penalty per misclassified example is C, the violation-cost knob.",
    "Margin width emerges from the optimisation; gamma sets how quickly similarity decays with distance.",
    "The number of classes comes from the data and the multiclass wrapper, not from gamma.",
    "How much data to hold out for validation is your evaluation choice; gamma is a kernel parameter."
  ];
  W["In an SVM, what is a 'soft margin'?"] = [
    "Forbidding any crossing describes a HARD margin; soft margins exist precisely to allow some.",
    "Margin width is always optimised, never fixed in advance; softness is about tolerating violations.",
    "Kernels change the space for any margin, hard or soft; softness is about allowed violations, not where it's measured.",
    "The margin constraint applies to every training point; support vectors are just the ones that end up on or inside it."
  ];
  W["In an SVM, what is 'hinge loss'?"] = [
    "Squaring the prediction error is squared loss, regression's objective.",
    "Counting misclassifications with no gradient is 0/1 loss; hinge is its trainable stand-in with a slope.",
    "Cross-entropy between probabilities is log loss, logistic regression's objective.",
    "No standard loss penalises the support-vector count; hinge penalises margin violations."
  ];
  W["Mapping data into a rich feature space could mean computing millions of new features per point. The kernel TRICK avoids that how?"] = [
    "Sampling a fraction of the features is an approximation method (like random features); the exact trick builds NO features at all.",
    "Caching still requires constructing the giant vectors first; the trick's point is that they never exist anywhere.",
    "Even the support vectors are never explicitly mapped; only kernel values between pairs of points are computed.",
    "The support-vector count doesn't shrink the mapped space's dimensionality; the trick works regardless of how many there are."
  ];
  W["You must choose between a polynomial kernel and RBF for a new problem. What's the practical guidance?"] = [
    "Practice shows the reverse: RBF is the safer default, and high-degree polynomials are unstable.",
    "RBF is domain-agnostic — it works on any numeric features, not just images.",
    "Polynomial kernels have degree, coef0 and more to tune — arguably harder to deploy, not simpler.",
    "They define different similarity functions and different implicit spaces; results genuinely differ."
  ];
  W["An RBF-SVM's decision score for a new point is really a weighted sum of similarities to the support vectors. Which earlier algorithm does that make it resemble?"] = [
    "Least-squares fitting involves no similarity voting; the RBF score is a distance-weighted vote, which is KNN's flavour.",
    "Trees split on feature thresholds; nothing in a weighted similarity sum resembles axis-aligned splits.",
    "Naive Bayes multiplies per-feature likelihoods with priors; the RBF score sums similarities instead.",
    "K-means is unsupervised clustering; the RBF-SVM's score is a supervised weighted vote of labelled reference points."
  ];
  W["Tuning an RBF-SVM, you sweep gamma with C fixed — results look random. Colleagues say to sweep both together. Why?"] = [
    "Backwards — gamma is an RBF parameter; a linear kernel has no gamma at all.",
    "No library derives C from gamma; both are free hyperparameters you must set yourself.",
    "Joint tuning doesn't multiply accuracy; it finds good combinations that one-dimensional sweeps miss.",
    "They control different things — violation cost versus influence reach; they interact but are not one parameter."
  ];
  W["SVMs are inherently two-class machines. Your problem has 5 classes. What do libraries actually do?"] = [
    "Libraries transparently wrap binary SVMs; SVC trains on 5 classes without complaint.",
    "Slicing one score with thresholds assumes the classes are ordered along a scale; they aren't, so multiple binary machines are trained.",
    "The class label is the thing to PREDICT; feeding it in as an input feature would be leakage.",
    "Encoding labels 1-5 and regressing imposes a fake ordering and fake distances between classes."
  ];
  W["Your SVM outputs decision scores like +1.73, but the fraud team demands calibrated probabilities. What's the standard fix?"] = [
    "Rescaling scores into [0,1] doesn't make them behave like probabilities; calibration must be learned against actual outcomes.",
    "Decision scores aren't bounded in [0,1] (yours is +1.73) and don't track empirical frequencies.",
    "Adding a constant can't turn a margin distance into a probability; shifted scores stay unbounded and uncalibrated.",
    "The number of support vectors has nothing to do with calibration; the scores remain distances however many there are."
  ];
  W["Fraud is 2% of the data, and your SVM's boundary parks itself so deep in fraud territory that it flags almost nothing. Which built-in remedy targets this directly?"] = [
    "Gamma reshapes the boundary's smoothness for BOTH classes; it doesn't make rare-class mistakes cost more.",
    "Changing kernel changes the boundary's shape, not the cost asymmetry that lets fraud be sacrificed.",
    "The test set only measures the problem; it can't move the training boundary at all.",
    "Undersampling throws data away and isn't the built-in remedy; class_weight reweights without discarding anything."
  ];
  W["Support vector REGRESSION (SVR) flips the idea: instead of a street separating classes, it fits a tube around a curve. Which points become its support vectors?"] = [
    "Points comfortably inside the epsilon-tube incur zero loss and contribute nothing — SVR is sparse, like classification SVM.",
    "It's not just the single worst point; EVERY point on or outside the tube becomes a support vector.",
    "Closeness to the curve's mean is irrelevant; what matters is whether a point violates the tube.",
    "Support vectors fall out of the optimisation deterministically; they are not sampled at random."
  ];
  W["Training a kernel SVM on 200,000 rows, your machine runs out of MEMORY before it runs out of patience. What's the structural cause?"] = [
    "The kernel matrix grows with the ROW count squared; feature count barely affects the memory blow-up.",
    "Duplicated storage would only double memory; n-squared pairwise similarities on 200k rows is orders of magnitude worse.",
    "Labels take just n numbers — trivial next to an n-by-n kernel matrix.",
    "The blow-up happens inside optimised C libraries too; it's the 200,000-squared similarity matrix, not the interpreter."
  ];
  W["For text classification with 50,000 sparse TF-IDF features, seasoned practitioners reach for LinearSVC rather than an RBF-SVM. Why?"] = [
    "Neither LinearSVC nor RBF-SVC gives native probabilities; the real differentiators are separability and cost.",
    "RBF kernels operate on sparse matrices fine; they're just expensive and unnecessary here.",
    "LinearSVC has FEWER knobs (mainly C) — and having more hyperparameters would be a drawback, not a selling point.",
    "All SVMs are binary at heart and get multiclass wrappers; RBF isn't specially limited to two classes."
  ];
  W["SVM trains on HINGE loss; logistic regression on log loss. Both punish mistakes — but hinge has a flat zero region that log loss lacks. What does that flat region buy the SVM?"] = [
    "No loss provably wins on every dataset — that universal-speed claim is false; the flat region buys sparsity, not guaranteed convergence.",
    "Points far on the WRONG side sit on the rising part of the hinge — loss grows linearly there, so bad outliers still pull the boundary.",
    "The flat zone destroys probability information: all safe points look identical, which is exactly why SVMs need bolt-on calibration.",
    "They differ concretely: log loss never reaches zero and keeps caring about every point; hinge zeroes out past the margin, giving sparsity."
  ];
  W["You call predict_proba on sklearn's SVC and it works — but only because probability=True ran something extra at fit time. What is that machinery, and what should you know before trusting it?"] = [
    "SVMs natively output margin scores, not probabilities; probability=True fits an extra internal calibration model at real cost.",
    "No min-max squashing happens, and rescaling wouldn't calibrate anything; a cross-validated sigmoid (Platt scaling) is fitted instead.",
    "There is no nearest-neighbour step in SVC's predict_proba; probabilities come from a fitted sigmoid over decision scores.",
    "predict_proba returns genuine probability estimates from Platt scaling; it is not an alias for predict, and probability=True does real work."
  ];
  W["sklearn's SVC handles a 10-class problem by silently training 45 binary models — one-vs-one — while most other classifiers use one-vs-rest or native multiclass. Why does the SVM world prefer OvO?"] = [
    "No scheme is universally more accurate, and sklearn's other estimators mostly default to one-vs-rest or native multiclass.",
    "There is no patent story; the reason is training cost — many small kernel problems beat few big ones.",
    "Both schemes use exactly the same kernel machinery; kernels are not the differentiator.",
    "45 is MORE models than 10; OvO wins because each duel trains on a small slice and kernel cost grows superlinearly with rows."
  ];
  W["Kernel SVC was your best model at 30k rows; at 3M rows training would take weeks. Which escape routes keep (most of) the kernel magic at linear cost?"] = [
    "Kernel approximation (Nystroem, random Fourier features) plus a linear solver is a well-established escape; exact training isn't mandatory.",
    "The Gram matrix is n-by-n regardless of feature count — PCA to 2D still leaves a 3M-by-3M matrix, and destroys information besides.",
    "Any exact kernel SVM needs the same pairwise Gram machinery; polynomial kernels don't dodge it.",
    "Raising C fits training data harder and often yields MORE support vectors, not fewer; it is not a scaling remedy."
  ];
  W["A factory has thousands of recordings of NORMAL machine sound and almost no failure examples. One-class SVM is built for this. What does it learn, having only seen one class?"] = [
    "One-class SVM invents no synthetic fake class; its objective directly encloses the normal region, with nu setting the fraction left outside.",
    "A mean-plus-threshold rule is a simple centroid detector; one-class SVM learns a flexible kernel boundary, far richer than an average.",
    "One-class SVM is specifically formulated for a single class — that is the whole point of the variant.",
    "Compression-based anomaly detection describes autoencoders; one-class SVM flags points by boundary position, not reconstruction error."
  ];
  W["RBF-SVM tuning is a two-knob game: C (violation cost) and gamma (influence reach). The standard play is a log-scale grid. What does the resulting heat-map landscape teach about how the knobs interact?"] = [
    "One-at-a-time sweeps miss the diagonal ridge — the best C shifts as gamma changes, so the knobs are not independent.",
    "Gamma dramatically reshapes the boundary even with scaled features — from near-linear to memorised islands; the map is far from flat.",
    "No gamma-equals-1/C identity exists; the ridge's position depends on the dataset, which is why you search instead of computing it.",
    "The heat-map is structured and reproducible — a stable ridge of good models; grid search works and defaults are often far from optimal."
  ];
})();
