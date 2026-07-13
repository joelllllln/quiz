/* Why-wrong notes: KNN (k-nearest neighbours). Keyed by exact question stem; one entry per distractor, same order as choices[1..]. */
(function () {
  var W = (window.WHYNOT = window.WHYNOT || {});
  W["Where does the value of k in KNN come from?"] = [
    "KNN has no training step that could learn settings; it just stores the examples, so it cannot discover k on its own.",
    "k = 1 is only one possible choice; you are free to set k to 3, 5 or any other number.",
    "k counts how many neighbours vote, which has nothing to do with how many features the data has.",
    "Neighbours cast votes using k; they cannot decide how many of themselves get consulted."
  ];
  W["In KNN, what is the 'feature space'?"] = [
    "That is the neighbourhood consulted for one prediction, not the space where all the points live.",
    "Labels are the answers attached to the points, not the coordinate space the points sit in.",
    "The feature space is the whole map, occupied and empty alike, not just the gap between clusters.",
    "KNN learns no splitting rule at training time; the feature space is where data lives, not a rule."
  ];
  W["A new point arrives with no label. KNN finds the k labelled points closest to it. What does KNN do with those k points to choose a label?"] = [
    "Averaging coordinates would give a location (a centroid), not a class label.",
    "KNN never fits a line or formula; it simply counts the neighbours' labels.",
    "Comparing to class centres is the nearest-centroid method, a different algorithm.",
    "KNN does not judge how typical points are; each of the k labels just gets one equal vote."
  ];
  W["You set k = 3. The three nearest neighbours of a mystery fruit are: apple, apple, lemon. What does KNN predict?"] = [
    "Lemon holds only 1 of the 3 votes, so it loses the majority vote to apple.",
    "2 votes against 1 is a clear majority, not a tie.",
    "Classification outputs a single label, never a blend of classes.",
    "KNN consults only the 3 local neighbours, not which fruit is commonest in the whole dataset."
  ];
  W["KNN measures the distance from the new point to every stored example. Which examples become its 'nearest neighbours'?"] = [
    "Using a radius is the radius-neighbours variant; standard KNN keeps a fixed count k instead.",
    "Distance is measured from each example to the new point, not to any class centre.",
    "The neighbours are the examples with the smallest distances, not the most average ones.",
    "Class membership and typicality are ignored; only distance to the new point matters."
  ];
  W["You set k = 1. KNN finds the one training point closest to the new arrival. What happens next?"] = [
    "With k = 1 exactly one neighbour is consulted; there are no runners-up to double-check anything.",
    "Plain KNN never abstains — it answers no matter how far away the nearest point is.",
    "A single voter cannot tie with itself; one neighbour always gives a clear answer.",
    "KNN performs no outlier checks; it trusts and copies the nearest label as-is."
  ];
  W["Most models do heavy work during training. What does KNN do with the training examples at training time?"] = [
    "Distances are computed fresh at prediction time; nothing is precomputed or cached during training.",
    "Learning a weight per feature is what parametric models do; KNN learns nothing at training time.",
    "KNN does no clustering; the examples are kept exactly as they arrived.",
    "Keeping one prototype per class is the nearest-centroid method, not KNN."
  ];
  W["KNN gets slower at predicting as the training set grows. Why? What must every single prediction do?"] = [
    "No full re-sort of the dataset is required; the cost comes from computing a distance to each stored point.",
    "KNN has no parameters to fit, so there is nothing to re-fit at prediction time.",
    "k stays whatever you chose; it never grows with the dataset.",
    "KNN never uses class centres; that idea belongs to nearest-centroid."
  ];
  W["Two points sit on a map. What is the Euclidean distance between them?"] = [
    "Adding the axis gaps is the Manhattan distance, not Euclidean.",
    "Taking the largest single gap is the Chebyshev distance.",
    "Counting grid steps is Manhattan-style movement; Euclidean cuts straight across.",
    "Euclidean squares the gaps, sums them and square-roots; it never averages them."
  ];
  W["Two points sit on a street grid. How is the Manhattan distance between them computed?"] = [
    "Square-rooting the summed squared gaps is the Euclidean formula, not Manhattan.",
    "The straight-line length is Euclidean; Manhattan follows the grid instead.",
    "Taking only the largest gap is the Chebyshev distance.",
    "No standard distance multiplies the coordinate gaps together."
  ];
  W["With two classes, people usually choose an odd k, like 3, 5 or 7. What does an odd k guarantee?"] = [
    "Odd k gives no accuracy guarantee; it only rules out tied votes.",
    "The neighbourhood's shape depends on the data, not on whether k is odd or even.",
    "All k neighbours can still come from one class, so no class is guaranteed a vote.",
    "Whether k is odd or even has no effect on how fast distances are computed."
  ];
  W["You set k to the size of the whole training set, so every point votes every time. What does KNN now predict for ANY new point?"] = [
    "The nearest point rules only when k = 1; here every point in the dataset votes.",
    "Density does not matter — every point gets exactly one equal vote wherever it sits.",
    "The outcome is deterministic: the class with the most points wins every single time.",
    "No single central point decides; the whole dataset's head-count does."
  ];
  W["One training point has the wrong label. A new point lands right next to it. Which k is most likely to copy the mistake?"] = [
    "With k = 3, the two other neighbours can outvote the single wrong label.",
    "With k = 5, four other voters usually swamp one mislabeled point.",
    "With k = 7, six other voters make one bad label even less decisive.",
    "Larger k dilutes a single wrong label, so the risk is greatest at k = 1, not equal everywhere."
  ];
  W["A dataset has age (18–70) and salary (£20,000–£90,000). You use the raw numbers. What happens when KNN computes distances?"] = [
    "It is the other way round: salary's far larger numeric range dominates the distance.",
    "Nothing cancels — the feature with the bigger range simply swamps the other.",
    "The ranking is not random; it is systematically driven by salary alone.",
    "Voting happens after distances are computed, so it cannot undo an already-skewed distance."
  ];
  W["You change one column from metres to kilometres (divide by 1,000). Nothing else changes. What can this alone do to unscaled KNN?"] = [
    "The ranking is not preserved: that feature's influence shrinks 1,000-fold, which can reorder who is nearest.",
    "It changes that feature's weight relative to the others, not just the overall size of distances.",
    "Whole neighbour rankings can flip, not merely exact ties.",
    "Speed is unchanged; the real danger is different neighbours and different predictions."
  ];
  W["KNN regression predicts a number, like a price. It finds the k nearest neighbours. How does it turn their values into one prediction?"] = [
    "Voting picks a category; regression needs a number, so the neighbours' values are combined numerically.",
    "KNN fits no trend line; it works directly from the k stored values.",
    "Copying the nearest value would be k = 1, and no adjustment step exists in plain KNN.",
    "Taking the most common value is a vote — that is the classification recipe, not regression."
  ];
  W["In KNN regression, you set k to the size of the whole dataset. What does every prediction become?"] = [
    "It ignores the input completely, so it is usually far from accurate.",
    "Including every value gives the mean, not the median.",
    "The result is only zero if the stored values happen to average zero.",
    "The nearest value dominates only when k is small, not when every point is included."
  ];
  W["What must the stored training examples have before KNN can classify anything at all?"] = [
    "KNN runs fine on imbalanced classes; balance is not a requirement.",
    "There is no minimum row count — KNN can run on a handful of examples.",
    "Scaling improves results but is not needed for the algorithm to run at all.",
    "Unlabelled examples cannot vote; extra unlabelled data is useless to KNN."
  ];
  W["You shrink k down towards 1. What does the boundary between the classes become?"] = [
    "Smoother, straighter boundaries come from a larger k, not a smaller one.",
    "The boundary traces the data points; no shape like a circle is ever guaranteed.",
    "k directly controls the boundary: small k makes it jagged, large k smooths it.",
    "Bias toward one class comes from large k favouring the majority; small k just tracks individual points."
  ];
  W["You test 1-NN on the same data it trained on. It scores 100%. Why does that score mean nothing?"] = [
    "1-NN scores 100% on its own training data even when that data is full of noise.",
    "It is memorisation, not smoothness: every point matches itself at distance zero.",
    "The 100% happens even with fully overlapping or random labels, so it proves no separation.",
    "Any metric gives the same 100%, because each point is distance zero from itself."
  ];
  W["You want to know how well your KNN model will do on future, unseen data. What is the standard way to check?"] = [
    "The gap between training and future performance is not a fixed 10%; that number is invented.",
    "A model can be confidently wrong — confidence scores are not accuracy.",
    "Training data is memorised, so beating a baseline there proves little about new data.",
    "Changing k does not help: you are still scoring on data the model has already seen."
  ];
  W["Classification predicts a category. Regression predicts a number. The neighbours are found the same way — so what differs in the last step?"] = [
    "Both tasks can use the same distance metrics; the difference lies in the final combining step.",
    "Odd versus even k is a tie-breaking detail, not what separates the two tasks.",
    "There is no rule that regression needs more neighbours than classification.",
    "That is backwards: classes get a vote, numbers get an average."
  ];
  W["You give KNN raw text categories like 'rock', 'jazz' and 'pop'. Why can't it work?"] = [
    "String length is not the issue; even same-length words have no numeric distance between them.",
    "Sorting words alphabetically still gives them no meaningful distances.",
    "Manhattan needs numbers too; no standard metric works on raw text.",
    "Hashing is not a KNN switch; the real fix is encoding the categories as numbers."
  ];
  W["In distance-weighted KNN, the neighbours' votes are no longer equal. Whose votes count the most?"] = [
    "How common a class is carries no weight; only each neighbour's distance does.",
    "When a point was added is irrelevant; recency plays no part in the weighting.",
    "Farther neighbours get smaller weights, not bigger ones.",
    "Typicality is never measured; closeness to the query point sets the weight."
  ];
  W["You set k = 4 and the vote splits 2–2. Which tie-break uses information you already have?"] = [
    "Falling back to the global majority throws away the local distance information you already computed.",
    "File order is arbitrary and says nothing about the query.",
    "The task is to output one label; reporting both is not a prediction.",
    "A coin flip uses no information at all, yet the distances you already have can break the tie."
  ];
  W["Your training set has exactly 6 examples. What is the biggest k that makes sense?"] = [
    "k can go as high as the number of stored examples, so 5 is not the biggest possible.",
    "7 would ask for more neighbours than the 6 examples that exist.",
    "3 is a perfectly usable k, but far from the biggest that still works.",
    "You cannot consult 12 neighbours when only 6 examples are stored."
  ];
  W["A trained linear model keeps a small formula and can delete its data. What must KNN keep to stay a working model?"] = [
    "One average point per class is the nearest-centroid method; KNN needs every stored example.",
    "Distances are computed fresh for each query; no distance table is stored.",
    "KNN never writes its boundary down — it exists only implicitly in the stored points.",
    "Neighbours depend on where the new query lands, so they cannot be precomputed in advance."
  ];
  W["An app uses daily steps (0–20,000) and sleep hours (0–12) in KNN. What should you do before computing any distances?"] = [
    "A log transform does not put steps and sleep onto a shared scale.",
    "Both features may carry signal; the fix is rescaling, not deleting one.",
    "Distances never self-correct — the huge range of steps would drown out sleep.",
    "k counts neighbours; multiplying a feature by it has nothing to do with fixing units."
  ];
  W["The data has a small, real pocket of one class inside the other class's area. What does a very large k do to that pocket?"] = [
    "A large k pulls in many voters from outside the pocket, so it gets outvoted rather than preserved.",
    "Once k exceeds the pocket's size, the surrounding class wins everywhere inside it — nothing is kept.",
    "Smoothing works against small regions; the surrounding class swallows the pocket, not the reverse.",
    "Changing k changes who votes; it never relocates regions on the map."
  ];
  W["Every algorithm relies on one big assumption about the world. What is KNN's?"] = [
    "Equal feature importance is a side effect of unscaled distances, not KNN's core belief about the world.",
    "KNN tolerates some noise through voting; its core bet is about similarity, not data purity.",
    "Correct labels help any method; KNN's defining assumption is that nearby points share labels.",
    "KNN makes no assumption of balance; imbalance is a practical nuisance, not the core premise."
  ];
  W["KNN makes a prediction in three steps. Which order is correct?"] = [
    "You cannot know who is nearest before the distances have been measured.",
    "Voting comes last — it needs measured distances and selected neighbours first.",
    "Neighbours are chosen by distance, never sampled at random.",
    "Plain KNN keeps the k nearest and has no outlier-dropping step."
  ];
  W["Four of these tasks predict a number. Which one is a classification task?"] = [
    "Tomorrow's temperature is a number on a scale, so predicting it is regression.",
    "A sale price is a continuous number, making that a regression task.",
    "Delivery minutes are a numeric quantity — that is regression.",
    "A percentage is a number, so estimating it is regression, not classification."
  ];
  W["What is the k-nearest neighbours (KNN) algorithm?"] = [
    "Fitting a straight line by minimising squared error is linear regression.",
    "Splitting data with a sequence of yes/no questions is a decision tree.",
    "Grouping unlabelled points into k clusters is k-means — the shared letter k causes this mix-up.",
    "Combining many weak trees into a strong ensemble is a random forest or boosting."
  ];
  W["In KNN, what is a distance metric?"] = [
    "The number of voting neighbours is k itself, not the distance metric.",
    "The fraction of correct predictions is accuracy, an evaluation score.",
    "The majority label is the prediction — the output of the vote, not the measuring rule.",
    "A step size for weight updates is a learning rate; KNN has no weights to update."
  ];
  W["In KNN, what is the Manhattan distance between two points?"] = [
    "The straight-line distance across open space is Euclidean, not Manhattan.",
    "The largest single coordinate difference is the Chebyshev distance.",
    "Manhattan is a geometric distance between coordinates, not a gap in a neighbour ranking.",
    "The angle between feature vectors belongs to cosine similarity, not Manhattan."
  ];
  W["In KNN, why is feature scaling important?"] = [
    "Scaling never touches k; it changes the distances, not how many neighbours vote.",
    "KNN barely trains at all — scaling is about fair distances, not training speed.",
    "Turning categories into numbers is encoding, a separate step from scaling numeric ranges.",
    "No preprocessing step chooses k; you always pick it yourself."
  ];
  W["In KNN, what is meant by 'lazy' (instance-based) learning?"] = [
    "'Lazy' is not about slow training or learning rates — KNN has no learning rate at all.",
    "Lazy learning uses all the features; it defers computation, it does not ignore data.",
    "Updating weights on mistakes describes perceptron-style learners; KNN has no weights.",
    "That is the opposite: KNN keeps all the training data and never really fits anything."
  ];
  W["In KNN, what is a decision boundary?"] = [
    "The number of neighbours is k — a setting, not a surface in feature space.",
    "The distance metric ranks neighbours; the boundary is where the predicted label flips.",
    "The average pairwise distance is a dataset statistic, not a dividing surface.",
    "The fraction of data used for training is a split choice, unrelated to any boundary."
  ];
  W["In KNN classification, what is majority vote?"] = [
    "Averaging numeric values is KNN regression, not a vote among class labels.",
    "Using only the single closest neighbour is k = 1, not a majority among k.",
    "Weighting by distance is the weighted-KNN variant, a step beyond the plain majority vote.",
    "The vote picks the most represented class, never the least."
  ];
  W["In KNN, what is the curse of dimensionality?"] = [
    "Memory grows with the number of rows, not dimensions; the curse is about distances losing contrast.",
    "Large k actually smooths the boundary, and the curse concerns feature count, not k.",
    "The curse is about having many features, not many classes causing tied votes.",
    "Scaling does not collapse distances to zero; the trouble comes from piling on dimensions."
  ];
  W["In KNN, what is weighted (distance-weighted) KNN?"] = [
    "Equal votes for every neighbour is plain KNN — exactly what the weighted variant changes.",
    "Using only the single nearest neighbour is just k = 1, not a weighting scheme.",
    "Rescaling features is feature scaling; distance weighting adjusts neighbours' votes instead.",
    "k stays fixed in weighted KNN; only each neighbour's influence changes."
  ];
  W["In KNN, what does it mean that the algorithm is non-parametric?"] = [
    "KNN does have hyperparameters (k, the metric); non-parametric means no fixed model form.",
    "A fixed number of weights is what parametric models have; KNN's complexity grows with the data.",
    "KNN handles regression perfectly well; non-parametric is not about the task type.",
    "Non-parametric methods make fewer distribution assumptions, not a normality requirement."
  ];
  W["You change k from large to small. The model now reacts more to individual points and less to the crowd. In bias–variance language, what did you trade?"] = [
    "That is backwards: small k gains twitchiness (variance) and gives up stability.",
    "Speed is not part of the bias-variance trade, and k barely changes query cost.",
    "Memory use is identical — the whole dataset is stored whatever k is.",
    "Small k increases locality; smoothness is what gets sacrificed, not locality."
  ];
  W["k is a setting you choose — the model can't learn it, and training accuracy would always point to k = 1. What is the right way to choose it?"] = [
    "Training accuracy always crowns k = 1, which merely memorises the data.",
    "√n is a rough starting heuristic, never a substitute for actually testing values of k.",
    "Watching training accuracy never shows the drop — k = 1 is perfect on training data by construction.",
    "A very large k underfits, drifting toward always predicting the majority class."
  ];
  W["Standardising a feature means turning each value x into a z-score. Which formula does that?"] = [
    "(x − min) ÷ (max − min) is min-max normalisation, not the z-score.",
    "Dividing by the mean rescales but neither centres the data nor uses its spread.",
    "(x − mean)² gives an ingredient of the variance, not a standardised value.",
    "rank(x) ÷ n is a rank or percentile transform, not standardisation."
  ];
  W["Commute distance appears in the data twice — once in km, once in minutes — and the two columns are nearly identical. Inside KNN's distance, commute now…"] = [
    "A duplicated feature contributes its gap twice, doubling its influence rather than halving it.",
    "Both copies pull in the same direction; identical columns reinforce each other, never cancel.",
    "KNN has no duplicate detection — every column feeds the distance as-is.",
    "Two near-identical copies add systematic double weight, which is bias, not random noise."
  ];
  W["The data is 90% 'normal' and 10% 'fraud'. You make k large. What happens to fraud predictions, even deep inside the fraud cluster?"] = [
    "Large k pulls in ever more 'normal' voters, so fraud calls shrink rather than increase.",
    "A big k reaches far beyond the fraud cluster, destroying exactly that locality.",
    "The fraud votes get diluted by majority-class voters, so confidence falls, not rises.",
    "Precision and recall do not swap places; fraud recall simply collapses."
  ];
  W["You want a big k, but you don't want far-away voters to drown out a tight, correct local cluster. Which KNN variant fixes this?"] = [
    "More data does not stop far-away voters from outvoting the tight local cluster.",
    "Switching to Manhattan still gives every neighbour an equal vote.",
    "Standardising fixes unit mismatches, not the equal-vote problem with distant neighbours.",
    "Whether k is even or odd has nothing to do with how much influence far voters get."
  ];
  W["Two points differ a lot on ONE feature and barely on the rest. Compared with Manhattan, how does Euclidean distance treat that one big gap?"] = [
    "The root comes after squaring, so a single big gap still dominates the total.",
    "They are not identical: squaring makes Euclidean punish one large gap far more than the plain sum does.",
    "No gap is ignored — the big one is emphasised most of all.",
    "Nothing is averaged across features; the squared gaps are summed."
  ];
  W["You keep adding features (dimensions), and the distances between random points all bunch together. What does the 'nearest neighbour' become?"] = [
    "Distance contrast collapses in high dimensions, so 'nearest' becomes less reliable, not sharper.",
    "The nearest point still varies by query; it just stops being meaningfully closer than the rest.",
    "A nearest neighbour exists whenever any point exists; definition is not the problem.",
    "Distances can never be negative, in any number of dimensions."
  ];
  W["Two features truly predict the label. You add 20 columns of random junk. What happens to KNN's accuracy?"] = [
    "Random columns add meaningless distance that hides the two useful features, so accuracy falls.",
    "Voting cannot rescue it: the junk has already scrambled who counts as near before any vote happens.",
    "Queries do slow down, but accuracy also drops as noise swamps the true signal.",
    "Whether k is even is irrelevant; junk features hurt at any k."
  ];
  W["An online checkout needs its fraud answer within 50 milliseconds. Why is plain KNN a bad choice for this job?"] = [
    "KNN trains almost instantly; its cost lands at prediction time, not in training.",
    "Distance scans parallelise easily; the issue is total work per query, not parallelism.",
    "No GPU is required — the problem is scanning every stored point inside the deadline.",
    "Accuracy does not decay with traffic; latency per query is the problem."
  ];
  W["A deployed linear model is just a few numbers. What must a deployed KNN model carry with it?"] = [
    "k and a metric are useless without the stored examples to measure distances against.",
    "One centroid per class describes nearest-centroid, a much smaller and different model.",
    "KNN has no explicit boundary equation that could be carried.",
    "A 1% sketch throws away the very points that predictions depend on."
  ];
  W["k-d trees and ball trees make exact neighbour search much faster in low dimensions. How?"] = [
    "The trees keep every training point; they organise the data, they never delete it.",
    "The speed-up is geometric per query, not a cache of answers to popular queries.",
    "k is untouched — the search returns the exact same k neighbours, just faster.",
    "Points in several dimensions cannot be put in one sorted line; the trees partition space instead."
  ];
  W["You try every k from 1 to n and plot the validation accuracy. What shape does the plot usually have?"] = [
    "A huge k underfits toward the majority class, so accuracy falls off at the end, not climbs.",
    "k = 1 usually overfits, so accuracy typically improves at first as k grows.",
    "k strongly controls over- and underfitting; the curve is far from flat.",
    "Odd/even tie effects are tiny and do not dominate the plot's shape."
  ];
  W["Your model scores 100% on training data and 70% on validation data. What is the diagnosis, and which way should k move?"] = [
    "A large train-validation gap is overfitting, and lowering k would make it even worse.",
    "Leakage inflates validation scores; a gap in this direction is classic overfitting instead.",
    "Nothing here signals class imbalance; the gap points to variance, fixed by raising k.",
    "A 30-point gap means the model memorised its training data — it is not ready to ship."
  ];
  W["Your model scores 65% on training data and 64% on validation data — both poor, no gap. What is the diagnosis, and which way should k move?"] = [
    "Overfitting would show a big train-validation gap; here both scores are equally poor.",
    "Leakage would inflate the validation score, not leave both scores low.",
    "Two matching but poor scores mean underfitting, not that tuning is finished.",
    "Nothing shown points to imbalance; the twin low scores signal too much smoothing."
  ];
  W["Instead of one train/validation split, you rotate the held-out slice five times and average the five scores. What do you gain?"] = [
    "Each fold still trains on roughly the same amount of data; only the estimate gets better.",
    "Cross-validation rotates validation folds; the final test set stays untouched, so nothing is tuned on it.",
    "The model itself is no better — you have only measured it more reliably.",
    "Stratification is a separate option; rotating folds alone does not balance the classes."
  ];
  W["The data file is sorted by class. You cut the first 20% off as a validation set, without shuffling. What have you created?"] = [
    "It is the opposite of stratified: the sorted slice contains only the first class.",
    "It is not slightly off — it is broken, because validation only ever sees one class.",
    "The speed is the same and the results are meaningless, not equivalent.",
    "The code runs fine; it just measures nothing useful."
  ];
  W["Two training points sit at EXACTLY the same distance from the query, but only one neighbour slot is left. What do most implementations do?"] = [
    "Most standard implementations keep exactly k neighbours rather than silently expanding to k + 1.",
    "Points are never merged; each stored example remains separate.",
    "There is no fallback to a second distance metric in standard implementations.",
    "Fractional votes are not standard; one of the two points simply gets the slot."
  ];
  W["A query lands far away from every training point — nothing in the data looks like it. What does plain KNN do?"] = [
    "Plain KNN has no 'unknown' output; some k points are always nearest, however far.",
    "No error is raised — distances exist no matter how remote the query is.",
    "It still takes just the k nearest and votes, paying no attention to how far away they are.",
    "k never adapts on its own; it stays exactly what you set."
  ];
  W["You use KNN regression with a small k. One stored value is a typo: £900 where £90 belongs. What happens to predictions near the typo?"] = [
    "With a small k the typo is a large share of the average, so it distorts strongly, not harmlessly.",
    "Plain KNN has no outlier filter; every stored value counts, typos included.",
    "Only queries whose neighbourhood contains the typo are affected — the shift is local, not uniform.",
    "Speed is untouched; it is the predicted numbers near the typo that change."
  ];
  W["k = 5, and the neighbours vote 4 spam, 1 normal. The fraction 4/5 gives you something extra, for free. What?"] = [
    "Neighbour fractions are rough and usually miscalibrated, especially with small k — not true probabilities.",
    "4/5 describes this one neighbourhood, not the model's overall error rate.",
    "The vote split says nothing about which k you should try next.",
    "It reflects the local neighbourhood, not the spam fraction across the whole training set."
  ];
  W["You need a colour column — red, green or blue — inside KNN's distance. What is the standard encoding?"] = [
    "Numbering the colours invents a fake order and spacing — blue would sit twice as far from red as green.",
    "Frequency encodes popularity, not identity, and two colours with equal counts would collide.",
    "Spelling overlap between colour names carries no information about the colours.",
    "The colour may be predictive; the fix is encoding it, not deleting it."
  ];
  W["Same data, same k. You only switch the metric from Euclidean to Manhattan. Why can the predictions change?"] = [
    "The rankings genuinely can differ — diagonal gaps cost relatively more under Manhattan than Euclidean.",
    "Nobody is excluded; every point is still measured, just with different numbers.",
    "Both metrics run on the same features; no extra rescaling is mandated by the switch.",
    "Tie-breaking rules do not change with the metric."
  ];
  W["You delete five features and accuracy goes UP. What were those five features, most likely?"] = [
    "Harmless redundant copies would not raise accuracy when removed.",
    "Leakage inflates accuracy, so removing leaking features would lower the score, not raise it.",
    "Computation speed does not affect accuracy; the gain means they were corrupting distances.",
    "Deleting genuinely predictive features would drop accuracy, not improve it."
  ];
  W["You're screening for a rare disease, and the minority class keeps getting outvoted. Which pair of fixes protects it most directly?"] = [
    "A bigger k lets the majority outvote the rare class even harder, and raw features add nothing.",
    "Neither the metric choice nor odd k touches the majority's built-in vote advantage.",
    "The bigger k in this pair is exactly what drowns the minority class.",
    "Shrinking the dataset does not rebalance the votes around minority points."
  ];
  W["Work it out by hand: what is the Euclidean distance between (1, 2) and (4, 6)?"] = [
    "7 is 3 + 4, the Manhattan sum, not the Euclidean root of squared gaps.",
    "25 is the sum of squares (9 + 16) before the square root is taken.",
    "3.5 is just the average of the gaps 3 and 4, which is no distance formula.",
    "12 is 3 × 4, and no distance multiplies the coordinate gaps."
  ];
  W["Work it out by hand: what is the Manhattan distance between (2, 3) and (6, 8)?"] = [
    "6.4 is roughly the Euclidean distance (√41); Manhattan adds the gaps instead.",
    "20 is 4 × 5 — Manhattan adds the gaps, it never multiplies them.",
    "4.5 is the average of the gaps, not their sum.",
    "41 is the sum of squared gaps (16 + 25), an ingredient of Euclidean, not Manhattan."
  ];
  W["You're building a KNN pipeline. When should feature scaling happen, compared with computing the distances?"] = [
    "The distances would already be contaminated; scaling raw distances cannot repair a skewed ranking.",
    "The steps do not commute — unscaled features skew the distances before any later fix can help.",
    "The query must be scaled with the same parameters, or its distances to the training rows are meaningless.",
    "Scaling only the query leaves the training rows on raw scales, so distances stay skewed."
  ];
  W["Every algorithm has a home turf. In which situation does KNN work best?"] = [
    "Every query scans the stored data, so billions of rows with hot queries is KNN's worst case.",
    "Thousands of sparse features invite the curse of dimensionality — distances lose meaning.",
    "KNN produces no compact global formula to hand to a regulator.",
    "KNN must store the entire training set, which will not fit in 256 KB."
  ];
  W["Your KNN scores 90% accuracy on data that is 90% 'normal'. Before celebrating, what should you compare that score against?"] = [
    "With 90% one class, a coin flip is the wrong bar — just guessing 'normal' already scores 90%.",
    "An expert comparison comes later; the first sanity check is the majority-class baseline.",
    "Training accuracy checks overfitting, not whether 90% is any good on this imbalanced data.",
    "Without the majority baseline you cannot tell whether either model beats 'always normal'."
  ];
  W["Push the number of dimensions towards infinity. Now divide the distance to the farthest point by the distance to the nearest point. What value does that ratio approach?"] = [
    "The farthest distance can never be smaller than the nearest, so the ratio cannot fall toward 0.",
    "Distance concentration squeezes the ratio all the way down to 1, not to a resting value of 2.",
    "√d grows without bound; the ratio instead settles at a constant.",
    "Distances bunch together in high dimensions, so the ratio shrinks toward 1 rather than diverging."
  ];
  W["k-d trees are fast in 2-D (about log n per query) but slow towards O(n) in high dimensions. What exactly stops working?"] = [
    "The tree's size is unchanged; what dies is the ability to rule branches out.",
    "Floating-point error is not the culprit — the pruning bounds simply stop excluding anything.",
    "Query time degrades, not insertion or balancing.",
    "log n stays small; the problem is that queries must visit far more than log n nodes."
  ];
  W["The two classes truly overlap: the same-looking point can carry either label. For ANY classifier on this data, what is perfect accuracy?"] = [
    "More data sharpens the estimates but cannot remove the overlap in the labels themselves.",
    "Scaling changes distances, not the fact that identical-looking points carry both labels.",
    "Weighting votes cannot disambiguate a point that genuinely belongs to either class.",
    "The ceiling (Bayes error) binds every classifier, not just KNN."
  ];
  W["Weighted KNN uses weight = 1/dᵖ. You push the power p towards infinity. What does your k-neighbour model turn into?"] = [
    "As p grows the closest neighbour's weight dwarfs all others — the opposite of equal votes.",
    "Distant voters get essentially zero weight, nothing like everyone voting equally.",
    "Ties vanish rather than multiply: one neighbour dominates every vote.",
    "The outcome is fully deterministic — the nearest neighbour always wins."
  ];
  W["A KNN regression curve is a staircase: flat, jump, flat, jump. When exactly do the jumps happen?"] = [
    "The prediction jumps whenever the neighbour set swaps, regardless of any value crossing zero.",
    "Nothing is rounded; the mean shifts because a different neighbour enters the set.",
    "Exact ties are rare; the jumps happen wherever the identity of the kth neighbour changes.",
    "The metric is fixed throughout; only the neighbourhood membership changes."
  ];
  W["Rule of thumb: how many effective parameters ('moving parts') does a KNN model have?"] = [
    "k alone ignores dataset size; KNN's flexibility grows with the data, roughly as n ÷ k.",
    "d + 1 counts the weights of a linear model, not KNN's moving parts.",
    "√(n · k) is not a recognised rule, and larger k should reduce complexity, not raise it.",
    "log₂ n is far too small; the flexibility scales like n ÷ k, not logarithmically."
  ];
  W["Prototype selection throws away deep-interior points and keeps mostly boundary-area points — yet accuracy barely changes. Why?"] = [
    "Interior points are not noisier; they are simply redundant for boundary decisions.",
    "Nothing is being compressed; boundary points are kept because they decide contested predictions.",
    "Nothing gets reconstructed — the interior votes were just never decisive to begin with.",
    "Fewer points do not strengthen k; accuracy holds because the discarded points never swung any outcome."
  ];
  W["Modern vector search runs on approximate methods like HNSW and LSH. What trade do they offer?"] = [
    "'Approximate' means occasionally missing the true nearest neighbour; exactness is what gets traded away.",
    "HNSW and LSH return any number of neighbours, not just the single nearest.",
    "They index raw vectors; labels play no role in the search.",
    "Duplicating the data costs memory without buying speed; the win comes from clever index structures."
  ];
  W["Two documents cover the same topic, but one is three times longer, so its word-count vector is three times bigger. Which measure ignores that size difference?"] = [
    "Tripling the vector triples the coordinate gaps, so Euclidean sees a large difference.",
    "The summed absolute gaps also scale with length, so Manhattan still separates the two.",
    "Standardising columns cannot cancel a row-wise length factor.",
    "Weighted Jaccard on counts still changes when all counts are tripled; it is not length-invariant here."
  ];
  W["One-hot columns (0 or 1) sit next to raw income (tens of thousands). You don't rescale. What happens to the categorical information?"] = [
    "It is the reverse: the 0/1 gaps are microscopic next to income differences in the tens of thousands.",
    "Each level does get a column, but its contribution is still numerically negligible against raw income.",
    "Nothing auto-normalises; the distance just uses the raw numbers as given.",
    "The maths runs fine — the categorical contribution is simply swamped, not undefined."
  ];
  W["KNN can also repair data. How does KNN imputation fill in a missing value?"] = [
    "A column mean, even class-weighted, ignores which rows actually resemble this one.",
    "No separate regression model is fitted; the value comes straight from similar rows.",
    "A random draw would ignore the similarity structure that the method exists to exploit.",
    "A whole-column median ignores row similarity, and no later refinement step exists."
  ];
  W["Radius neighbours uses 'everyone within distance r' instead of 'the k closest'. It has one failure that plain k-NN can never have. What is it?"] = [
    "Ties can occur in both variants and can always be broken by some rule — not unique to radius methods.",
    "Scale sensitivity affects plain k-NN too, so it is not the failure unique to a radius.",
    "Defaulting to the majority is what plain k-NN with a huge k does; not unique to radius methods.",
    "Neither variant ever counts the same stored point twice."
  ];
  W["You min-max scale income to [0, 1] — but one customer is a billionaire, so the divisor is enormous. What happens to ordinary income differences?"] = [
    "The billionaire stretches the divisor, so ordinary incomes crush into a tiny band rather than spreading.",
    "Ranks survive, but the gaps between ordinary incomes shrink to almost nothing — and gaps drive distance.",
    "Min-max maps the minimum to 0, so ordinary values end up near 0, not around 0.5.",
    "Min-max output stays inside [0, 1]; nothing goes negative."
  ];
  W["A sales forecaster scores 92% under random cross-validation but only 61% in production. The data is time-ordered. What is the classic cause?"] = [
    "Drift can hurt too, but the classic random-CV-on-time-series failure is validating with future rows available.",
    "Small folds add noise to the estimate, not a systematic 30-point collapse.",
    "Tuning bias is usually modest; the giveaway here is the time ordering of the data.",
    "A deployment scaling bug is possible but is not the classic time-ordered validation trap."
  ];
  W["Four classes, k = 7. The vote comes back 3–2–1–1. What does standard KNN predict?"] = [
    "KNN needs only a plurality (most votes), not an absolute majority.",
    "3-2-1-1 has a single clear leader; there is no tie of any kind.",
    "The nearest point decides only when the vote itself is tied — it is not here.",
    "k never changes mid-prediction; the class with 3 votes simply wins."
  ];
  W["Every feature is binary — just 0 or 1. On this data, Manhattan distance is exactly the same as which named distance?"] = [
    "On 0/1 data Euclidean gives the square root of the mismatch count, not the count itself.",
    "Cosine measures the angle between vectors, not a count of mismatched bits.",
    "Jaccard ignores positions where both vectors are 0, so it differs from a plain mismatch count.",
    "The dot product counts shared 1s — a similarity, not a count of differing positions."
  ];
  W["Set k = 1 and colour the whole map by prediction. What famous structure do the decision regions form?"] = [
    "Axis-aligned rectangles are the signature of decision trees, not 1-NN.",
    "The regions are cells around individual points, not concentric rings around anything.",
    "A minimum spanning tree connects points with edges; it does not carve the map into regions.",
    "Each cell belongs to a single point, and a class's territory is often not convex at all."
  ];
  W["Forget classification for a moment. The distance from a point to its kth nearest neighbour is widely used as what?"] = [
    "That distance uses no labels, so it cannot measure class purity.",
    "'Boundary leverage' is not a standard use; the distance measures how isolated a point is.",
    "No bound on test error follows from one point's neighbour distance.",
    "Class balance is about label counts, which this unlabelled distance never sees."
  ];
  W["Brute-force KNN stores n points with d features each. How does the cost of ONE prediction scale?"] = [
    "Selecting the k winners is minor; you still compute n distances of d features each.",
    "O(log n) needs a spatial index like a k-d tree; brute force touches every point.",
    "Each of the n distances itself costs d work, so the terms multiply rather than add.",
    "Nothing pairs features against features; the cost is n distances at d operations each."
  ];
  W["On a brand-new problem, experienced people run KNN before building anything fancy. What role does it play?"] = [
    "KNN does not rank or select features; it just predicts.",
    "It does not fix or clean the data; it produces a quick reference score.",
    "It does not verify labels; auditing labels is a different job entirely.",
    "KNN is slow at query time, so its value is a quick accuracy reference, never a speed test."
  ];
  W["Weights = 1/distance. The neighbours are: A at distance 1, B at distance 2, B at distance 4. Who wins the vote, and on what totals?"] = [
    "The votes are weighted: B's total is 1/2 + 1/4 = 0.75, which loses to A's 1.0.",
    "B's weights sum to 0.75 (1/2 + 1/4), not 1.0, so there is no tie.",
    "More total distance means less weight under 1/distance, not more.",
    "There is no tie to break: A's 1.0 beats B's 0.75 outright."
  ];
  W["Plain (unweighted) KNN regression with k = 3. The three nearest freelancers charged £10, £20 and £60 per hour. What rate does the model predict?"] = [
    "£20 is the median of the three rates; plain KNN regression takes the mean.",
    "£26.70 does not equal (10 + 20 + 60) ÷ 3, the equal-weight mean of the neighbours.",
    "£15 averages only the two cheapest neighbours; all three must count.",
    "£45 ignores the £10 neighbour; the mean of all three values is what is predicted."
  ];
  W["You want neighbourhoods to stay 'local' — covering about 10% of each feature's range. How must the amount of data grow for each added dimension?"] = [
    "Coverage is multiplicative: each new axis multiplies the data needed by about 10, far beyond linear.",
    "Each added dimension multiplies the requirement, so growth compounds past any polynomial.",
    "Logarithmic growth would mean less extra data per dimension — the opposite of what happens.",
    "Keeping 10% per axis shrinks the covered volume tenfold each time, so fixed data quickly leaves it empty."
  ];
  W["Metric learning (Mahalanobis, LMNN, NCA) makes KNN better without touching k. What does it learn to do?"] = [
    "k is untouched by metric learning; what changes is the distance computation, not vote counts.",
    "It learns a new metric from the data rather than choosing among presets per query.",
    "Labels guide the training, but what gets changed is how distance is computed, not label weights.",
    "No tree over metrics is involved; the result is a single learned transformation of the space."
  ];
  W["1-NN gets zero training error on ANY dataset — even one with completely random labels. What does that tell you about its training error?"] = [
    "A score every model earns on every dataset cannot distinguish good models from bad.",
    "Zero training error says nothing about test error, which can be arbitrarily bad.",
    "1-NN's training error is zero at any noise level, so it cannot reveal the noise rate.",
    "k = 1 tops training accuracy even on pure noise — that is memorisation, not evidence of a good k."
  ];
  W["The rule 'use an odd k' exists only to avoid tied votes. Why does it stop mattering once votes are distance-weighted?"] = [
    "Nothing forces k to change; it stays exactly what you set.",
    "Normalising the weights would not prevent ties; continuous totals rarely coinciding is what does.",
    "No flipping mechanism exists; the weighted totals are real numbers that essentially never land exactly equal.",
    "The class totals do not converge to equality; they are continuous values that rarely match."
  ];
  W["Before computing any distances, you multiply one feature by w. What have you effectively declared that feature to be?"] = [
    "Multiplying scales the feature's influence up; it adds no noise.",
    "'Better scaled' is not a thing — you have boosted its distance contribution w-fold.",
    "Standardising uses the mean and spread; a bare multiply does neither.",
    "Duplicating w columns changes the geometry differently (about √w under Euclidean); a multiply reweights directly."
  ];
  W["'Users like you also bought…' Strip away the marketing language. Which algorithm is that recommender running?"] = [
    "K-means builds fixed clusters of everyone; this recommender searches the neighbours of one specific user.",
    "No probability formula is fitted; the engine matches similar users directly.",
    "Market-basket rules link products to products, ignoring which users resemble you.",
    "A popularity chart shows everyone the same list; 'users like you' is personalised by similarity."
  ];
  W["Dataset A has clean labels. Dataset B is the same task but with many wrong labels. Where should B's best k sit, compared with A's?"] = [
    "A lower k trusts single points more — exactly what fails when many labels are wrong.",
    "Noisier labels need more votes to average the errors out, so the best k moves up, not stays put.",
    "k = 1 copies whichever label happens to be nearest, which is often a wrong one on noisy data.",
    "Whether k is even has nothing to do with label noise."
  ];
  W["You're building a production KNN system from scratch. Which order of steps is correct?"] = [
    "k tuned before scaling and selection goes stale the moment those steps change the distances.",
    "Scaling with the test rows included leaks their statistics across the split.",
    "Selecting features on the full dataset leaks test information into the model before the split.",
    "Tuning on training accuracy always crowns k = 1; tuning must use cross-validation."
  ];
})();
