/* Ground definitions shown before each topic's exercises. Plain English, bottom-up. */
window.PRIMERS = {

found: { terms: [
  { t: "Dataset", d: "A table of past cases. Each row is one thing that happened; each column records one fact about it." },
  { t: "Example (row)", d: "One recorded case — one email, one house sale, one patient visit. Models learn by seeing many of these." },
  { t: "Feature", d: "An input column: a fact you will KNOW at prediction time (square footage, word count, age). The model's raw material." },
  { t: "Label", d: "The answer column: the thing you want predicted (sold price, spam or not). Known for past rows, unknown for new ones." },
  { t: "Model", d: "A function the computer builds from data: features in, prediction out. Nothing more mystical than a learned recipe." },
  { t: "Training", d: "The process of adjusting the model's internal numbers to shrink its error on the examples it is shown." },
  { t: "Prediction", d: "Running a NEW row (features only, no label) through the trained model to get its best guess at the missing label." },
  { t: "Generalisation", d: "Performing well on cases the model never saw during training. The entire goal — memorising the past is easy and worthless." }
]},

knn: { terms: [
  { t: "Feature space", d: "Imagine every example plotted as a point, one axis per feature. Similar things land near each other. All of kNN happens in this space." },
  { t: "Distance", d: "A number saying how far apart two points are — usually straight-line (Euclidean). Small distance = similar examples." },
  { t: "Neighbour", d: "A training point close to the one you are trying to classify. Its label is evidence about yours." },
  { t: "k", d: "How many nearest neighbours get consulted. k=1 asks only the single closest; k=15 polls a committee of fifteen." },
  { t: "Majority vote", d: "The k neighbours each 'vote' their own label; the most common label wins and becomes the prediction." },
  { t: "Decision boundary", d: "The invisible line where the predicted label flips from one class to another. Small k draws it jagged; big k smooths it." },
  { t: "Lazy learning", d: "kNN does no work at training time — it just stores the data. All the effort happens at prediction time, searching for neighbours." },
  { t: "Feature scaling", d: "Putting features on comparable ranges first. Without it, the feature with the biggest units silently decides every distance." }
]},

logreg: { terms: [
  { t: "Weight", d: "The number multiplying each feature — how much (and in which direction) that feature pushes the prediction." },
  { t: "Weighted score", d: "Multiply each feature by its weight and add everything up (plus the intercept). One number summarising the case." },
  { t: "Intercept (bias)", d: "The starting score before any features speak — the model's baseline opinion when all features are zero." },
  { t: "Probability", d: "A belief between 0% and 100%. Logistic regression's output: not a verdict, but 'how likely'." },
  { t: "Odds", d: "The same belief written as a ratio: 75% probability = odds of 3:1 (three yeses per no)." },
  { t: "Log-odds (logit)", d: "The logarithm of the odds — the currency the model actually thinks in. In log-odds, the model is a perfectly straight line." },
  { t: "Sigmoid", d: "The S-shaped exchange rate that converts any raw score into a probability between 0 and 1." },
  { t: "Threshold", d: "The cutoff (often 50%) where probability becomes decision. Moving it trades one kind of mistake for the other." },
  { t: "Regularisation", d: "A penalty on big weights that stops the model over-trusting any single feature. L2 shrinks them; L1 zeroes the weak ones out." }
]},

bayes: { terms: [
  { t: "Base rate (prior)", d: "How common each class is before looking at any evidence. If 4 emails in 10 are spam, the prior odds are 4:6." },
  { t: "Evidence", d: "An observed clue — a word in the email, a symptom, a reading. Each piece nudges the belief." },
  { t: "Likelihood", d: "How probable a clue is under each class: P(word 'FREE' | spam) vs P(word 'FREE' | not spam)." },
  { t: "Likelihood ratio", d: "Those two likelihoods divided — the clue's multiplier. 'FREE' being 4× more common in spam multiplies the odds by 4." },
  { t: "Posterior", d: "The updated belief after evidence: prior odds × all the multipliers. Bayes' rule is exactly this bookkeeping." },
  { t: "The 'naive' assumption", d: "Treating every clue as independent, so their multipliers can simply be multiplied together. Wrong in detail, useful in practice." },
  { t: "Smoothing (alpha)", d: "Adding tiny fake counts so a never-seen word cannot multiply the whole product by zero and veto everything." },
  { t: "Generative model", d: "A model that learns what each class LOOKS like (its word patterns), then asks which class better explains the new case." }
]},

trees: { terms: [
  { t: "Node / split", d: "A yes/no question about one feature ('is area < 1,250?'). Cases flow left or right depending on their answer." },
  { t: "Root", d: "The first, most informative question — the top of the tree, seen by every case." },
  { t: "Leaf", d: "An end point with no further questions. Whatever training cases landed here decide the prediction (their majority label, or their average)." },
  { t: "Depth", d: "How many questions deep the tree may go. More depth = more detail = more risk of memorising noise." },
  { t: "Impurity", d: "How mixed a group's labels are. All-same = pure (0); a 50/50 muddle = maximally impure." },
  { t: "Gini / entropy", d: "Two near-identical formulas for measuring impurity. Splits are chosen to reduce it the most." },
  { t: "Pruning", d: "Cutting back branches that memorised noise — either while growing (min_samples_leaf) or after (ccp_alpha)." },
  { t: "Feature importance", d: "How much impurity-reduction each feature earned across the tree. A hint, not a verdict — it shifts between retrains." }
]},

svm: { terms: [
  { t: "Decision boundary", d: "The line (in higher dimensions, a plane) separating the two classes. SVM's whole job is placing it well." },
  { t: "Margin", d: "The empty 'street' between the boundary and the nearest points of each class. SVM picks the boundary with the WIDEST street." },
  { t: "Support vector", d: "A point sitting right on the street's kerb. These few points alone determine the boundary; every other point could vanish." },
  { t: "Soft margin", d: "Allowing a few points inside the street (or misclassified) in exchange for a wider, steadier street overall." },
  { t: "C", d: "The strictness dial: big C punishes every violation (narrow street, overfit risk); small C tolerates violations (wide street, smoother)." },
  { t: "Kernel", d: "A similarity function that lets the maths behave AS IF the data were mapped into a richer space — where a curve becomes a straight cut." },
  { t: "Kernel trick", d: "Getting that richer space without ever computing it: only similarities between pairs of points are needed." },
  { t: "Gamma (RBF)", d: "How far one training point's influence reaches. Big gamma = tight local islands; small gamma = broad smooth regions." }
]},

rf: { terms: [
  { t: "Ensemble", d: "Many models combined into one prediction — a committee instead of a lone expert." },
  { t: "Variance (instability)", d: "How much a model changes when the training sample changes slightly. Deep trees have lots of it; averaging cancels it." },
  { t: "Bootstrap sample", d: "A new training set drawn from the original WITH replacement — same size, some rows repeated, ~37% left out." },
  { t: "Bagging", d: "Bootstrap AGGregating: train one model per bootstrap sample, then average (or vote) their predictions." },
  { t: "Decorrelation", d: "Making the trees genuinely different (random rows AND random features per split) so their mistakes don't overlap." },
  { t: "max_features", d: "How many randomly-chosen features each split may consider. The main diversity dial — sqrt(n) is the classification default." },
  { t: "Out-of-bag (OOB) score", d: "Free validation: score each tree on the ~37% of rows its bootstrap missed. No separate test split needed." },
  { t: "Feature importance", d: "Impurity-reduction credit summed across all trees. Useful hint; unstable with correlated features." }
]},

gboost: { terms: [
  { t: "Weak learner", d: "A deliberately small model — usually a shallow tree (depth 3–6). Boosting's building block." },
  { t: "Residual", d: "What's still wrong: actual minus predicted. Each new tree is trained on these leftovers, not on the original labels." },
  { t: "Boosting round", d: "One cycle: measure the current errors, fit a small tree to them, add it to the ensemble. Repeat hundreds of times." },
  { t: "Learning rate (shrinkage)", d: "How much of each new tree's correction gets applied — e.g. 10%. Smaller steps need more rounds but land more precisely." },
  { t: "Early stopping", d: "Watching validation error each round and stopping when it stops improving — the honest way to pick the number of rounds." },
  { t: "Subsample", d: "Training each round's tree on a random fraction of rows. Adds bagging-style randomness that regularises the relay." },
  { t: "Regularisation (XGBoost)", d: "Penalties on tree size and leaf weights baked into the maths, so each round resists chasing noise." },
  { t: "XGBoost / LightGBM / CatBoost", d: "Industrial implementations of the same idea, tuned for speed (LightGBM), categoricals (CatBoost), or ubiquity (XGBoost)." }
]},

stacking: { terms: [
  { t: "Base models", d: "The committee members — ideally DIFFERENT families (a tree, a linear model, a kNN) so they make different mistakes." },
  { t: "Diversity", d: "The property that makes ensembles work: errors that don't overlap can cancel. Clones agree on everything, including their mistakes." },
  { t: "Hard voting", d: "Count the predicted labels; majority wins. Simple, but throws away how confident each model was." },
  { t: "Soft voting", d: "Average the predicted PROBABILITIES; highest average wins. One very confident model can outweigh two lukewarm ones." },
  { t: "Meta-model", d: "Stacking's learned chairperson: a small model trained to combine the base models' outputs better than any fixed rule." },
  { t: "Out-of-fold predictions", d: "The meta-model's training data: each base model's predictions on rows it did NOT train on, collected via cross-validation." },
  { t: "Blending", d: "The quick version: base models predict on one held-out slice, and the meta-model trains on just that slice." },
  { t: "Leakage (here)", d: "The cardinal sin: letting the meta-model learn from predictions a base model made on its own training rows. It would just learn to trust the biggest memoriser." }
]},

metrics: { terms: [
  { t: "TP / FP / FN / TN", d: "The four outcomes of a yes/no prediction: true positive (caught it), false positive (false alarm), false negative (missed it), true negative (correctly ignored)." },
  { t: "Confusion matrix", d: "Those four counts in a 2×2 grid — the complete record of what the classifier did. Every metric below is computed from it." },
  { t: "Accuracy", d: "Share of all predictions that were right. Misleading on imbalanced data: 'always say no' scores 99% when yeses are 1%." },
  { t: "Precision", d: "Of the cases you FLAGGED, how many were real? The 'false alarm' metric — high precision means few wasted alerts." },
  { t: "Recall", d: "Of the real cases out there, how many did you CATCH? The 'missed case' metric — high recall means little slips through." },
  { t: "F1 score", d: "The harmonic mean of precision and recall — one number that stays low unless BOTH are decent." },
  { t: "Threshold", d: "The probability cutoff for saying 'yes'. Lowering it catches more (recall ↑) but flags more falsely (precision ↓)." },
  { t: "ROC curve & AUC", d: "The catch-rate vs false-alarm-rate trade at EVERY threshold, drawn as a curve. AUC (area under it) summarises ranking skill: 1.0 perfect, 0.5 coin-flip." }
]},

perf: { terms: [
  { t: "Baseline", d: "The dumbest sensible rule ('always predict the majority', 'predict last year's value'). Your model only matters by how much it beats this." },
  { t: "Holdout / validation set", d: "Data hidden from training, used to compare settings honestly. The test set is hidden even from THESE comparisons." },
  { t: "Cross-validation", d: "Rotate which slice is held out (5 or 10 folds), score each rotation, average. Removes the luck of a single split." },
  { t: "Hyperparameter", d: "A setting YOU choose before training (k, depth, C, learning rate) — as opposed to parameters the training learns." },
  { t: "Grid / random search", d: "Trying many hyperparameter combinations and keeping the best validation score. Random search covers wide spaces surprisingly well." },
  { t: "Overfitting the validation set", d: "Try 1,000 settings and the winner is partly lucky. That's why the final number must come from data no decision ever touched." },
  { t: "Data leakage", d: "Information from the test set (or the future) sneaking into training — e.g. scaling before splitting. Produces glorious scores that evaporate in production." },
  { t: "Learning curve", d: "Score vs training-set size. Tells you whether more data would help, or whether the model has hit its ceiling." }
]},

sklearn: { terms: [
  { t: "Estimator", d: "Any sklearn object that learns from data. One shared grammar: create it, fit it, use it." },
  { t: ".fit(X, y)", d: "The learning step: show the estimator features X (and labels y, if supervised). Everything learned gets stored on the object." },
  { t: ".predict / .predict_proba", d: "Apply the fitted model to new rows: hard labels from predict, probabilities from predict_proba." },
  { t: "Transformer & .transform", d: "Estimators that reshape data rather than predict — scalers, encoders, PCA. fit learns the recipe; transform applies it." },
  { t: "Pipeline", d: "Preprocessing steps and a final model chained into ONE estimator — so every step fits only on training data, automatically, even inside cross-validation." },
  { t: "GridSearchCV", d: "An estimator that wraps another, tries hyperparameter combinations with cross-validation, and refits the best on all training data." },
  { t: "Calibration", d: "Remapping a model's scores so that '70%' really comes true 70% of the time. CalibratedClassifierCV wraps any classifier." },
  { t: "Permutation importance", d: "Shuffle one feature's column and measure how much the score drops — a model-agnostic, held-out-data measure of what the model relies on." }
]},

kmeans: { terms: [
  { t: "Cluster", d: "A group of points more similar to each other than to the rest. No labels involved — the structure IS the finding." },
  { t: "Centroid", d: "A cluster's centre of gravity: the average position of its members. Each cluster is represented by this one point." },
  { t: "Assignment step", d: "Every point joins its NEAREST centroid. This carves the data into k groups." },
  { t: "Update step", d: "Each centroid moves to the average of the points that just joined it. Assign, update, repeat — until nothing moves." },
  { t: "Inertia", d: "The total squared distance from every point to its centroid — the 'spread' k-means tries to minimise. Lower = tighter clusters." },
  { t: "k", d: "How many clusters to find. YOU must choose it — the algorithm never volunteers a number." },
  { t: "k-means++", d: "The standard smart initialisation: spread the starting centroids out, so the algorithm rarely gets stuck in a bad arrangement." },
  { t: "Elbow & silhouette", d: "Two ways to choose k: the bend in the inertia curve (elbow), or the score comparing own-cluster vs neighbour-cluster distance (silhouette peaks at good k)." }
]},

hier: { terms: [
  { t: "Agglomerative", d: "Bottom-up clustering: every point starts alone, then the two closest clusters merge, again and again, until one remains." },
  { t: "Linkage", d: "The definition of 'distance between two CLUSTERS': nearest points (single), farthest (complete), average, or variance-growth (Ward)." },
  { t: "Ward linkage", d: "Merge the pair whose union least increases within-cluster spread — the same objective k-means chases. The sklearn default." },
  { t: "Dendrogram", d: "The tree recording every merge and the distance at which it happened. Not one clustering — ALL of them, at every granularity." },
  { t: "Merge height", d: "How far apart two clusters were when forced together. Low merges are confident; high merges are shotgun weddings." },
  { t: "Cutting the tree", d: "Draw a horizontal line at some height: everything still separate below it becomes your clusters. Different heights, different k — same tree." },
  { t: "The tallest gap", d: "A long stretch of heights where nothing merges = naturally separated groups. Cutting inside it gives the most defensible k." },
  { t: "Connectivity constraint", d: "An optional neighbour-graph rule: clusters may only merge if they actually touch — so they grow along the data's shape." }
]},

dbscan: { terms: [
  { t: "Density", d: "DBSCAN's core idea: a cluster is a CROWDED region, whatever its shape. Sparse space between crowds is just… space." },
  { t: "eps", d: "The neighbourhood radius: 'within THIS distance, you count as near me'. The definition of walking distance." },
  { t: "min_samples", d: "How many points must sit within eps for a spot to count as 'crowded'. Together with eps, this defines density." },
  { t: "Core point", d: "A point with at least min_samples neighbours within eps — it's standing in a crowd, and can extend the cluster." },
  { t: "Border point", d: "In a core point's neighbourhood but not crowded itself — the cluster's edge. It belongs, but can't recruit." },
  { t: "Noise", d: "Reachable from no crowd at all. DBSCAN's superpower: it is ALLOWED to say 'this point belongs to nothing'." },
  { t: "No k needed", d: "Clusters emerge wherever density supports them — you never say how many. The count is an OUTPUT, not an input." },
  { t: "k-distance plot", d: "Sort every point's distance to its k-th neighbour and find the elbow — the standard way to read a sensible eps off the data." }
]},

pca: { terms: [
  { t: "Dimension", d: "One feature = one axis. A dataset with 50 columns lives in 50-dimensional space — unvisualisable, but the maths doesn't mind." },
  { t: "Projection", d: "Flattening points onto a chosen axis (like casting shadows). Information off-axis is lost; the art is choosing the axis that loses least." },
  { t: "Variance", d: "How spread out the data is along a direction. Spread = information: an axis where everything projects to the same spot tells you nothing." },
  { t: "Principal component", d: "The direction of greatest remaining variance. PC1 captures the most spread; PC2 the most of what's left (at right angles); and so on." },
  { t: "Loading", d: "A component's recipe: how much of each original feature it blends. Same-sign block = shared factor; mixed signs = a contrast." },
  { t: "Explained variance ratio", d: "The share of total spread each component carries. 'PC1: 62%' means one axis holds nearly two-thirds of the story." },
  { t: "Scree plot", d: "Explained variance per component, plotted. The elbow suggests how many components are worth keeping." },
  { t: "Reconstruction error", d: "Compress with few components, rebuild, measure the damage. Normal points survive the round trip; anomalies don't — hence PCA-based anomaly detection." }
]},

tsne: { terms: [
  { t: "Embedding", d: "A low-dimensional (usually 2-D) arrangement of high-dimensional points, built so similar items land near each other. A map, not a measurement." },
  { t: "Local neighbourhood", d: "What t-SNE actually preserves: WHO IS NEAR WHOM. Everything else — sizes, gaps, positions — is negotiable." },
  { t: "Perplexity", d: "Roughly, how many neighbours each point tries to keep close. Small = fine local detail (and fake islands); large = broader structure." },
  { t: "Learning rate", d: "The step size of the layout optimisation. Too small: everything stays in a ball. Too large: clusters shatter. 'auto' behaves." },
  { t: "init='pca'", d: "Start the layout from PCA coordinates instead of randomness — re-runs agree, and the islands' arrangement inherits real geometry." },
  { t: "Global vs local structure", d: "t-SNE nails local (cluster membership) and shrugs at global (which island is near which). Read it accordingly." },
  { t: "The cardinal sins", d: "Reading cluster SIZE, DENSITY, or between-cluster DISTANCE off a t-SNE plot. None of the three is preserved." },
  { t: "UMAP", d: "The modern cousin: much faster, better global layout, can place new points on an existing map. Same caveats about literal distances." }
]}

};
