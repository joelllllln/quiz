/* Why-wrong notes: Advanced Scikit-learn, K-Means, Hierarchical Clustering. Keyed by exact question stem; one entry per distractor, same order as choices[1..]. */
(function () {
  var W = (window.WHYNOT = window.WHYNOT || {});
  // ---- Advanced Scikit-learn (37) ----
  W["Why do many scikit-learn functions like train_test_split and RandomForestClassifier accept a random_state argument?"] = [
    "That's max_features, a separate tree hyperparameter; random_state only seeds the random generator.",
    "No sklearn function adds noise to labels; random_state changes no data values, only the shuffle sequence.",
    "Restart counts are set by parameters like n_init; random_state just makes each restart repeatable.",
    "Nothing is ever discarded; random_state changes no rows, it only fixes which random ordering you get."
  ];
  W["Why do you hold out a test set with train_test_split instead of scoring the model on the same data it trained on?"] = [
    "Speed isn't the goal of splitting; you give up training data to gain an honest score, not a faster fit.",
    "They can - model.score(X_train, y_train) runs fine; the problem is that score is deceptively high.",
    "The model must never learn from the test set; feeding it test rows is exactly the leakage the split prevents.",
    "train_test_split only partitions rows randomly; it never inspects or removes outliers."
  ];
  W["What does k-fold cross-validation (as in cross_val_score with cv=5) actually do?"] = [
    "Speed is never the criterion; all k fitted models are scored and their scores averaged, none 'kept'.",
    "CV varies which data is held out, not the learning rate; hyperparameters stay fixed across folds.",
    "Folds split the rows, not the labels, and the model makes real predictions, not running averages.",
    "That describes early stopping during training, not cross-validation; CV runs a fixed k rotations."
  ];
  W["A column contains the text values 'red', 'green', and 'blue'. Why must you one-hot encode it before a scikit-learn model can use it?"] = [
    "Row or category order is irrelevant to models; the real issue is that strings aren't numbers.",
    "One-hot adds a column per category, making the table wider and often larger, not smaller.",
    "Feature columns repeat values all the time; there's no uniqueness requirement anywhere.",
    "One-hot never merges or balances categories; each one simply gets its own indicator column."
  ];
  W["In scikit-learn, what is an 'estimator'?"] = [
    "Scalers and encoders are estimators too; the term covers anything with .fit, not just the last pipeline step.",
    "That's a metric or scorer; estimators learn from data rather than measure prediction quality.",
    "Hyperparameters configure an estimator, but the estimator is the learning object itself, not its settings.",
    "That's the output of .predict, not the object that produced it."
  ];
  W["What does calling .fit(X, y) do to a scikit-learn estimator?"] = [
    "Prediction is .predict's job; .fit returns the fitted estimator itself, not labels.",
    ".fit uses everything you pass it; fold splitting is done by CV utilities, not by fit.",
    "Scoring is .score's job; fit uses y to learn from, not to grade against.",
    "Hyperparameters are set in the constructor before fitting; .fit learns parameters from the data instead."
  ];
  W["After fitting a classifier, how do .predict and .predict_proba differ?"] = [
    "That's exactly backwards: predict_proba gives the probabilities and predict gives the hard labels.",
    "Both methods accept any rows, seen or unseen; the difference is output type, not which data.",
    "Neither method retrains anything; both just apply the already-fitted model.",
    "Both are classifier methods; regressors have predict but no predict_proba at all."
  ];
  W["In scikit-learn, what is a 'transformer' and what does .transform do?"] = [
    "Predicting labels is a model's .predict; transformers reshape features and never score anything.",
    "Combining estimators is an ensemble like VotingClassifier, not a transformer.",
    "Hyperparameter tuning is GridSearchCV's job; .transform never refits anything.",
    "Fold splitting is done by CV splitters like KFold; transform reshapes features, not partitions."
  ];
  W["What does GridSearchCV do?"] = [
    "Random sampling is RandomizedSearchCV; GridSearchCV exhaustively tries every combination, never stopping early.",
    "The folds are for scoring each combo, not for building an ensemble of averaged predictions.",
    "Feature selection is a different tool (e.g. SelectKBest); GridSearchCV tunes hyperparameters.",
    "It scores each combo with k-fold cross-validation, not one single train/validation split."
  ];
  W["What does it mean to 'calibrate' a classifier's probabilities?"] = [
    "That's feature standardisation (StandardScaler), which touches the inputs, not the output probabilities.",
    "Threshold tuning changes the label cut-off; calibration fixes the probability values themselves.",
    "Calibration neither retrains the model nor targets accuracy; it remaps scores so confidence matches reality.",
    "Shrinking coefficients is regularisation, a training-time constraint, not a fix for probability outputs."
  ];
  W["What does permutation importance measure?"] = [
    "Coefficient size is a model-internal quantity; permutation importance re-scores predictions after shuffling.",
    "Feature-to-feature correlation is a data property; permutation importance measures impact on the model's score.",
    "Split counts describe tree impurity importance, a different (and more biased) measure.",
    "It only tests features already in the model; it never evaluates adding new ones."
  ];
  W["In sklearn you wrap StandardScaler and a classifier into one Pipeline object, then cross-validate the pipeline. What does that buy that separate steps don't?"] = [
    "That whole-dataset fit is precisely the leakage a Pipeline prevents; each fold refits the scaler on its own training part.",
    "A Pipeline applies each step exactly as configured; it never decides which features deserve scaling.",
    "Cross-validation still runs all its folds; the pipeline just refits its steps inside each one.",
    "Nothing gets tuned unless you wrap the pipeline in a search; plain CV only fits and scores."
  ];
  W["Your dataframe mixes numeric columns (scale them) and categorical columns (one-hot them). Which sklearn tool routes each column to its own preprocessing?"] = [
    "TransformedTargetRegressor transforms the target y around a regressor, not different feature columns.",
    "FeatureUnion applies every transformer to the whole input and stacks results; it doesn't route specific columns.",
    "make_column_selector only picks which columns match a pattern; it must sit inside a ColumnTransformer to route them.",
    "OneHotEncoder only encodes categoricals; it has no flag that scales numeric columns."
  ];
  W["Your search space has 6 hyperparameters. GridSearchCV would need 15,000 fits to cover it. What does RandomizedSearchCV offer instead?"] = [
    "RandomizedSearchCV runs the fixed n_iter you set; it has no automatic stop-when-flat rule.",
    "Successive halving is HalvingGridSearchCV / HalvingRandomSearchCV, a different search strategy.",
    "It never enumerates the grid; the saving comes from sampling fewer combos, not reordering folds.",
    "Every sampled combo is still cross-validated on all folds; it cuts combinations, not folds."
  ];
  W["cross_val_score(model, X, y, cv=5) returns [0.84, 0.79, 0.86, 0.81, 0.85]. What's the professional way to report this?"] = [
    "Dropping the spread hides your uncertainty - and spread matters just as much for classification as regression.",
    "Testing against zero accuracy is meaningless; any real model clears it, and it says nothing about fold variability.",
    "Reporting the luckiest split is cherry-picking; CV's entire point is averaging over all folds.",
    "0.79 and 0.81 are normal fold variation, not outliers, and the median still discards the spread information."
  ];
  W["train_test_split(X, y, test_size=0.2, stratify=y) — what does the stratify argument guarantee?"] = [
    "stratify only preserves label proportions; feature distributions are left to random chance.",
    "Stratification preserves the existing class mix; it never duplicates rows or rebalances anything.",
    "Both splits get their proportional share of each class; nothing moves wholesale to one side.",
    "A majority-only test set would make evaluating the rare class impossible; stratify keeps every class in both splits."
  ];
  W["In scikit-learn, what does an estimator's .fit() method do?"] = [
    "Producing predictions is .predict; fit is the learning step, not the answering step.",
    "Applying a learned transformation is .transform; fit learns the parameters that transform later applies.",
    "Splitting data is train_test_split, a utility function, not an estimator method.",
    "Computing a score is .score; fit learns from data rather than measuring performance."
  ];
  W["In scikit-learn, what does an estimator's .predict() method do?"] = [
    "Training is .fit; predict only applies what fit already learned.",
    "Rescaling features is a scaler's .transform, not a prediction method.",
    "Dividing data is train_test_split; predict never touches how data is partitioned.",
    "Class probabilities come from .predict_proba; plain predict returns one hard label per sample."
  ];
  W["In scikit-learn, what does .fit_transform() do?"] = [
    "fit_transform belongs to transformers; training and scoring a classifier uses .fit and .score.",
    "It never splits anything; you split first, then fit_transform only the training part.",
    "Probabilities come from a classifier's predict_proba; fit_transform returns transformed features.",
    "Ensembling is VotingClassifier/StackingClassifier territory; fit_transform learns and applies one transformation."
  ];
  W["In scikit-learn, what is a Pipeline?"] = [
    "A Pipeline is a runnable chain of estimators, not a visualisation tool.",
    "A grid of values is the param_grid you hand to GridSearchCV, not a Pipeline.",
    "A single train/test split is train_test_split's output; a Pipeline chains processing steps.",
    "A predicted-vs-actual table is a confusion matrix, an evaluation artifact, not a Pipeline."
  ];
  W["In scikit-learn, what is StandardScaler?"] = [
    "Predicting a numeric target is a regressor's job; StandardScaler transforms features and predicts nothing.",
    "Splitting data is train_test_split; the scaler rescales columns, it doesn't partition rows.",
    "Combining classifiers is VotingClassifier, unrelated to scaling.",
    "Grid searching is GridSearchCV; StandardScaler is a transformer with nothing to search."
  ];
  W["In scikit-learn, what does train_test_split do?"] = [
    "It never fits or evaluates anything; it only partitions arrays into two aligned subsets.",
    "Rescaling is StandardScaler's job; splitting leaves every value untouched.",
    "Hyperparameter search is GridSearchCV, not a data-splitting utility.",
    "Rotating through folds and averaging is cross_val_score; train_test_split makes one single split."
  ];
  W["In scikit-learn, what is GridSearchCV?"] = [
    "Scaling is StandardScaler; GridSearchCV wraps an estimator to tune its settings, not its data.",
    "A single split is train_test_split; GridSearchCV uses k-fold CV inside a hyperparameter search.",
    "Class probabilities come from predict_proba; GridSearchCV's product is the best hyperparameter combination.",
    "A TPR-vs-FPR curve is the ROC curve, an evaluation plot, not a tuning tool."
  ];
  W["In scikit-learn, what does cross_val_score do?"] = [
    "A permanent split is train_test_split; CV rotates temporary folds and keeps no split around.",
    "Rescaling is StandardScaler, a transformer, not an evaluation function.",
    "Coefficients live on a fitted estimator as coef_; cross_val_score returns fold scores instead.",
    "Grid searching is GridSearchCV; cross_val_score evaluates one fixed configuration."
  ];
  W["In scikit-learn, what does a classifier's predict_proba return?"] = [
    "A single hard label per sample is what plain .predict returns.",
    "Overall accuracy comes from .score or accuracy_score; predict_proba is per-sample, not a summary.",
    "Coefficients are the coef_ attribute of the fitted model, not a prediction output.",
    "Feature rankings come from feature_importances_ or permutation importance, not from predict_proba."
  ];
  W["In scikit-learn, what is the random_state parameter?"] = [
    "Model complexity is set by hyperparameters like max_depth or C; the seed changes nothing about capacity.",
    "The test fraction is the test_size argument of train_test_split, a separate setting.",
    "The fold count is the cv parameter; random_state only seeds the shuffling.",
    "A class probability is a model output from predict_proba, not a constructor setting."
  ];
  W["GridSearchCV(model, params, scoring='recall') and the same search with scoring='accuracy' return DIFFERENT best models. Why is that expected?"] = [
    "refit retrains the winner chosen by YOUR scoring metric; it never re-ranks candidates on accuracy.",
    "They often disagree - a majority-class predictor gets high accuracy but terrible recall - so different winners are normal.",
    "scoring IS the selection criterion; it decides which candidate wins, not just what number gets printed.",
    "With the same cv setting the folds are identical across runs; the metric, not fold luck, changes the winner."
  ];
  W["Some sklearn classifiers offer predict_proba, others decision_function, some both. What's the difference?"] = [
    "Backwards: decision_function gives the raw margins, and predict_proba gives the 0-1 values.",
    "Neither happens: decision_function's scores are unbounded, and predict_proba returns probabilities, not rounded labels.",
    "decision_function isn't bounded to 0-1 at all; an SVM margin can be any real number, like -3.7.",
    "Both support multiclass; availability depends on the model type, not the number of classes."
  ];
  W["Your gradient-boosted model says '90% confident' but such cases turn out positive only 70% of the time. Which sklearn tool repairs the numbers without retraining the model?"] = [
    "Fitting the remap on the model's own training predictions leaks - it's overconfident exactly on rows it memorised; held-out folds are required.",
    "That's retraining, which the question rules out, and gradient-boosted models have no bolt-on sigmoid layer option in sklearn.",
    "Platt scaling is the right idea, but reusing the original training data corrupts the mapping; held-out data is the essential part.",
    "Moving the decision threshold changes which labels you output, not the probability values - the false '90%' stays wrong."
  ];
  W["A forest's feature_importances_ ranks user_id_hash third most important. Permutation importance on validation data scores it at zero. Which do you believe, and why?"] = [
    "Correlation only mildly complicates permutation; a zero held-out score for an ID hash is the classic memorisation sign - impurity importance is the fooled one.",
    "If the column carried real signal, shuffling it would DROP the validation score; a zero drop means there was no generalisable signal to destroy.",
    "The other features' permutation scores remain valid; one memorised ID column doesn't invalidate the held-out measurement.",
    "Impurity importances ARE normalised to sum to one; their real flaw is training-data bias toward high-cardinality columns."
  ];
  W["sklearn offers VotingClassifier(voting='hard'/'soft') and StackingClassifier. Rank them by how much information each combination strategy uses."] = [
    "Swapped: HARD voting counts labels only, soft averages probabilities - and stacking learns rather than averages.",
    "Hard voting never sees probabilities - it counts label votes; and stacking trains a combiner instead of averaging.",
    "Reversed: stacking is the one that trains a meta-model; hard and soft voting use fixed rules with no learning.",
    "Neither voting mode learns weights (any weights are user-set), and stacking is precisely not a majority vote."
  ];
  W["You need a preprocessing step sklearn doesn't ship — capping outliers at the 1st/99th percentile, learned from training data. What's the contract for writing a custom transformer that works inside Pipelines and GridSearchCV?"] = [
    "No process() protocol exists - Pipelines call fit and transform by name, and merging them would relearn percentiles from test data.",
    "There is no @sklearn.transformer decorator; the contract is a class with fit/transform, and closures can't expose get_params for tuning.",
    "Pipeline.register_step doesn't exist; the method names must literally be fit and transform for Pipelines to call them.",
    "Hacking Pipeline internals is fragile and unnecessary; a small transformer class plugs into any Pipeline unmodified."
  ];
  W["One GridSearchCV can tune your model's C — and simultaneously WHICH scaler to use, and whether PCA is worth having at all. What syntax unlocks searching over the pipeline's structure itself?"] = [
    "Steps expose no hidden enable boolean; you swap the step object itself, or use 'passthrough' to remove it.",
    "No structure='search' argument exists; grids over named steps already cover architecture search.",
    "GridSearchCV never invents a layout; you list explicit candidates per named step ('passthrough' is the removal token, not 'auto').",
    "GridSearchCV handles lists of estimator objects fine; nothing about objects requires random sampling."
  ];
  W["You joblib.dump a trained pipeline, and eight months later production upgrades Python and scikit-learn — the pickle now refuses to load (or worse, loads and behaves oddly). What's the honest model of sklearn persistence?"] = [
    "joblib records nothing about the environment and certainly never installs packages; matching versions is your job.",
    "Pickles reference the exact classes and module paths - that's why version changes break them - and there are no caches to warm.",
    "sklearn has no to_json; its estimators aren't architecture-plus-weights networks, and the neutral-format route is ONNX.",
    "Retraining on every deploy is wasteful and often infeasible; pinned-version pickles or ONNX exports are standard safe practice."
  ];
  W["The training table is 40M rows and won't fit in memory. sklearn still handles it — via partial_fit and a streaming pattern. What does that pattern look like, and which estimators play?"] = [
    "warm_start continues fitting on the same data (e.g. adding trees); most estimators lack it, and it isn't a correct streaming protocol.",
    "Memmap eases I/O, but algorithms like RandomForest still need the whole dataset inside one fit; it doesn't make them incremental.",
    "fit always starts from scratch, discarding previous state; only partial_fit accumulates learning across calls.",
    "No stream=True flag exists, and trees and boosting can't stream regardless; only certain incremental estimators support it."
  ];
  W["After a ColumnTransformer one-hot-encodes 30 categoricals, your model trains on 900 anonymous columns — and the importance report is useless. What's the modern sklearn way to keep human-readable names flowing end to end?"] = [
    "numpy arrays carry no column names at all; that's exactly why get_feature_names_out and set_output exist.",
    "ColumnTransformer has no keep_names parameter; names flow via get_feature_names_out or pandas output.",
    "inverse_transform maps data back to input space, not importance scores; it can't rename or group importances.",
    "Transformers emit bare numpy arrays by default; names survive only if you opt in via set_output(transform='pandas')."
  ];
  W["Rows belong to 500 patients, several rows each, and you also want honest hyperparameter tuning. Assemble the correct sklearn evaluation: which splitter, and where does it go?"] = [
    "Stratifying on patient_id spreads each patient's rows ACROSS folds - the exact leakage you must prevent.",
    "A plain inner KFold still leaks patients across train and validation, inflating tuning scores and picking wrong hyperparameters.",
    "cross_val_predict with a non-group splitter still puts a patient's rows on both sides; the prediction helper doesn't fix leakage.",
    "LeaveOneGroupOut absolutely requires the groups array - without it, it cannot know which rows share a patient."
  ];
  // ---- K-Means (37) ----
  W["When k-means finishes, how many clusters does each single data point belong to?"] = [
    "Fractional membership is soft clustering (e.g. Gaussian mixtures); plain k-means is strictly hard-assignment.",
    "Even a borderline point goes wholly to the marginally nearer centroid; membership is never shared.",
    "There is no threshold step in k-means; every point is always assigned to some cluster.",
    "K-means clusters partition space into non-overlapping Voronoi cells, so multi-membership is impossible."
  ];
  W["In each round of k-means, what does the 'assignment step' do?"] = [
    "Moving centroids to their members' mean is the update step; assignment holds them still and only sorts points.",
    "Merging clusters is hierarchical clustering's move; k-means keeps exactly k centroids throughout.",
    "K-means never discards points; even distant ones are assigned to their nearest centroid.",
    "Spreading starting centroids is initialisation (k-means++), done once before the loop, not each round."
  ];
  W["After the points are assigned, what does the k-means 'update step' do?"] = [
    "Reassigning points is the assignment step; the update step holds assignments fixed and moves centres.",
    "Standard k-means never deletes centroids; all k survive to the end.",
    "No splitting happens in the loop; the cluster count stays fixed at k.",
    "Spreading initial centroids is k-means++ seeding, done once before iterating, not per round."
  ];
  W["What does the 'k-means++' initialisation do?"] = [
    "Iteration count is a separate setting (max_iter); k-means++ only changes where centroids START.",
    "You still pick k yourself; k-means++ places the k seeds you asked for, nothing more.",
    "Cluster shape is fixed by the distance-to-centroid rule; smarter seeding can't create non-blob shapes.",
    "Scaling is preprocessing you must do yourself; initialisation never touches feature units."
  ];
  W["In clustering, what exactly is a 'cluster'?"] = [
    "Picking columns is feature selection; clusters group rows (data points), not features.",
    "Clustering uses no labels, and a cluster is a group of points, not one reference example.",
    "The centre point is the centroid - the cluster's summary - not the cluster itself.",
    "A label-predicting rule is a supervised classifier; clustering discovers groups without predicting."
  ];
  W["K-means represents each cluster by a 'centroid'. What is a centroid?"] = [
    "The centroid is the middle, not an edge point - and usually not a real data point at all.",
    "Assignment order is irrelevant; the centroid is recomputed as the mean at every update.",
    "There are no labels in k-means, and the centroid is a computed average, not an actual example (that would be a medoid).",
    "Boundaries lie between Voronoi cells; the centroid is the centre those boundaries are equidistant from."
  ];
  W["K-means needs you to set 'k' before it runs. What is k?"] = [
    "The repeat count is the iteration limit (max_iter), not k.",
    "Feature count comes from your data; k is the number of clusters you request.",
    "A minimum point count per cluster is DBSCAN's min_samples, a different algorithm's knob.",
    "A neighbour radius is DBSCAN's eps; k-means has no radius parameter."
  ];
  W["Before running k-means on 'age' (years) and 'income' (pounds), why is scaling the features essential?"] = [
    "Column names never matter to k-means; only the numeric ranges of the values do.",
    "Means are computable on any numeric data, scaled or not; the issue is fairness of distances, not computability.",
    "k is your explicit input; scaling changes distance contributions, never the cluster count.",
    "Convergence is guaranteed regardless of scale; unscaled data gives biased clusters, not an endless loop."
  ];
  W["You have 10,000 customers and NO labels of any kind. Clustering promises to 'find the groups'. What is it actually looking for?"] = [
    "There are no hidden true labels; clusters are geometric groups whose meaning you supply afterwards.",
    "Separating known classes is supervised classification; with no labels there are no target classes.",
    "A line of best fit is regression - summarising a trend, not finding groups.",
    "Hunting outliers is anomaly detection; clustering's product is groups, not a discard list."
  ];
  W["K-means repeats two moves until nothing changes. Which two?"] = [
    "Merging the nearest clusters is agglomerative hierarchical clustering, not k-means.",
    "Growing clusters from dense seeds within a radius is DBSCAN's expansion, a different algorithm.",
    "Random seeding happens once, not repeatedly, and k-means never discards points as outliers.",
    "Projecting onto top directions is PCA - dimensionality reduction, not clustering."
  ];
  W["Watch k-means' inertia — the total squared distance from points to their centres — across the steps. What does it do, and why does that matter?"] = [
    "Within one run inertia never rises; the elbow lives on the inertia-vs-k plot across separate runs, not the iteration trace.",
    "Both steps provably lower (or keep) inertia, so it cannot bounce; that's exactly why the loop must settle.",
    "Later centroid moves and reassignments keep lowering inertia until convergence; it doesn't freeze after one step.",
    "Across growing k inertia FALLS (more centres, shorter distances) - and the question is about the within-run trace anyway."
  ];
  W["K-means needs k chosen in advance. You plot inertia for k = 1…8 and look for the 'elbow'. What are you actually looking for?"] = [
    "Inertia keeps falling all the way to k = n, so minimising it just picks the largest k.",
    "Inertia never peaks - it monotonically decreases as k grows.",
    "Silhouette is a separate criterion; the elbow reads the bend in the inertia curve, not a silhouette maximum.",
    "That square-root rule of thumb ignores the data's actual structure; the elbow is read from the curve."
  ];
  W["You run k-means with k=2 on two crescent-moon shaped groups. It cuts straight across both moons. What did k-means assume that this data violates?"] = [
    "Cluster size balance isn't the issue; the moons fail because of their curved shape, not their point counts.",
    "K-means makes no independence assumption about features; centre-based geometry is what fails on crescents.",
    "Scaling wouldn't help - a crescent is still a crescent after standardising.",
    "The straight boundary is a consequence of centroid logic, not an assumption about the data; the violated premise is that groups huddle round a centre."
  ];
  W["Run k-means five times with different random starts and you get five different answers, some clearly worse. What's the standard defence?"] = [
    "Every run already converges; more iterations just polish the same bad local optimum.",
    "Changing k changes the question; the disagreement comes from random starts, not too few clusters.",
    "Scaling is good practice but doesn't remove local optima; different starts can still settle in different valleys.",
    "Averaging mismatched solutions - whose clusters don't even correspond - produces meaningless centres."
  ];
  W["In k-means clustering, what is inertia?"] = [
    "k is a setting you choose beforehand; inertia is a computed quality measure of the fit.",
    "Inertia measures point-to-own-centroid spread, not centre-to-centre separation.",
    "K-means never leaves points unassigned; that concept belongs to DBSCAN's noise label.",
    "Iteration count measures runtime behaviour, not the tightness of the final clusters."
  ];
  W["What is k-means clustering?"] = [
    "Margin-maximising on labelled classes is an SVM; k-means is unsupervised and uses no labels.",
    "Merging the closest groups into a nested tree is agglomerative hierarchical clustering.",
    "Growing clusters from dense regions and leaving noise is DBSCAN.",
    "Projecting onto directions of maximum variance is PCA, a dimensionality-reduction technique."
  ];
  W["In k-means, what is 'inertia' (the within-cluster sum of squares)?"] = [
    "Iteration count is about convergence speed; inertia measures the spatial tightness of the final clusters.",
    "Distance between centroids would gauge separation BETWEEN clusters; inertia is within-cluster spread.",
    "'Wrong cluster' needs ground-truth labels, which unsupervised k-means doesn't have.",
    "A share of variance is a ratio like PCA's explained variance; inertia is an absolute sum of squared distances."
  ];
  W["What is the 'elbow method' for choosing k in k-means?"] = [
    "The square-root rule is data-blind; the elbow method reads the actual inertia curve instead.",
    "Multiple seeds keeping the lowest-inertia run is the n_init defence against local optima, not a way to choose k.",
    "Centroid separation isn't the elbow's input; the method plots inertia against k.",
    "Outlier removal is separate preprocessing; the elbow method only concerns picking k."
  ];
  W["What is the 'silhouette score' in clustering?"] = [
    "Total squared distance to centroids is inertia; silhouette compares own-cluster vs neighbour-cluster distances on a -1 to 1 scale.",
    "Counting non-empty clusters says nothing about fit quality; silhouette scores each point's placement.",
    "At convergence no points change cluster, so that fraction is trivially zero; silhouette is computed from distances after fitting.",
    "One centroid-to-centroid gap ignores every point's placement; silhouette averages a per-point comparison."
  ];
  W["What is 'k-means++'?"] = [
    "You still supply k; the ++ only chooses WHERE the k starting seeds go.",
    "Partial membership is fuzzy c-means / GMM territory; k-means++ keeps hard assignment.",
    "Clustering a random sample for speed is MiniBatchKMeans; k-means++ uses all the data, just smarter seeds.",
    "It acts BEFORE clustering starts (initialisation), not as a score after convergence."
  ];
  W["In k-means, what is the 'assignment step'?"] = [
    "Moving each centroid to its members' mean is the update step, the other half of the loop.",
    "k is fixed by you before running; no step of the algorithm chooses it.",
    "Scoring the result (inertia, silhouette) happens after fitting; the assignment step is inside the loop.",
    "Random placement of centroids is initialisation, done once before the first assignment."
  ];
  W["In k-means, what is the 'update step'?"] = [
    "Attaching points to their nearest centroid is the assignment step, which comes before the update.",
    "Merging the closest clusters is hierarchical clustering; k-means never merges.",
    "Standard k-means keeps all k clusters; the update step recomputes means, it doesn't prune.",
    "k is chosen by the user before anything runs; no step selects it."
  ];
  W["In k-means, what is a 'Voronoi cell'?"] = [
    "A bounding circle covers only the members; the Voronoi cell is the whole territory nearer that centroid, points or not.",
    "A segment between centroids is just a line; the cell is a region of space.",
    "The halfway set is the BOUNDARY between two cells, not a cell itself.",
    "The average of a cluster's points is the centroid; the Voronoi cell is the region around it."
  ];
  W["What is 'Lloyd's algorithm' in the context of k-means?"] = [
    "Lloyd's loop needs k already given; choosing k is a separate problem (elbow, silhouette).",
    "Spreading initial centres apart is k-means++ seeding; Lloyd's is the iterate-after-seeding loop.",
    "Comparing two clusterings is a metric like the adjusted Rand index, not a fitting procedure.",
    "Mini-batch processing is MiniBatchKMeans, a speed variant; Lloyd's uses all points each iteration."
  ];
  W["Why does k-means usually require 'feature scaling' first?"] = [
    "K-means runs on any real-valued numbers; there's no integer or 0-1 range requirement.",
    "k stays your choice; scaling only equalises how much each feature contributes to distance.",
    "Convergence is guaranteed either way; the harm of skipping scaling is biased clusters, not non-termination.",
    "Scaling rescales numeric columns; encoding categories is a different step, and k-means has no targets to learn."
  ];
  W["Inertia always falls as k grows, so it can't choose k by itself. The silhouette score can. What does a point's silhouette actually compare?"] = [
    "The global data mean plays no role in silhouette; the comparison is own cluster versus nearest other cluster.",
    "Inertia-drop-per-cluster is elbow-style thinking; silhouette is computed per point from distances, not inertia deltas.",
    "Backwards twice: silhouette averages distances to member points (not centroids), and boundary points score near 0, not highest.",
    "Silhouette never counts cluster sizes; balance between clusters is irrelevant to it."
  ];
  W["You cluster customers on age (18–70) and income (£15k–£150k) without scaling. What has k-means silently done with these two features?"] = [
    "Distinct-value counts don't enter Euclidean distance; the magnitude of differences does, and income's are thousands of times bigger.",
    "sklearn's KMeans does no internal scaling; you must standardise explicitly (e.g. StandardScaler).",
    "Convergence is guaranteed regardless of units; the outcome is a biased clustering, not empty clusters.",
    "Equal weighting of dimensions is exactly the trap: equal weight on wildly unequal RANGES lets the big-range feature dominate."
  ];
  W["Clustering 10 million rows, full k-means grinds. MiniBatchKMeans finishes in minutes with near-identical clusters. What corner does it cut?"] = [
    "It draws random batches from ALL the data throughout; it never fixates on a leading slice of rows.",
    "No dimensionality reduction happens; distances stay in the original feature space.",
    "The cluster count stays fixed at k; nothing merges or stops splitting.",
    "Its saving is per-iteration mini-batches, not skipped checks - it still tracks convergence and needs no full passes."
  ];
  W["A 16-million-colour photo is squeezed to 16 colours using k-means, and it still looks surprisingly good. What is the compression scheme?"] = [
    "A frequency top-list ignores colour-space geometry; centroids summarise ALL pixels, including shades that never repeat exactly.",
    "Storing differences from a neighbour is delta/predictive coding, a different compression idea with no clustering in it.",
    "Averaging blocks is downsampling, which cuts resolution, not palette size; k-means keeps every pixel and just recolours it.",
    "Sampling along sorted hue ignores brightness, saturation and pixel frequency; centroids fit the image's actual colour distribution."
  ];
  W["A colleague one-hot encodes city, favourite brand and subscription tier, then runs k-means. The clusters come out as mush. What's structurally wrong?"] = [
    "Scale isn't the flaw - multiplying one-hot columns changes nothing structural; the problem is that means of category indicators aren't meaningful positions.",
    "k is whatever you set; no cap tied to the number of distinct cities exists.",
    "One-hot exists precisely to AVOID false ordering - that's integer encoding's sin; the trouble here is averaging the binary vectors.",
    "All the features here are categorical, so there are no numeric columns to drown; the structural issue is meaningless centroids."
  ];
  W["Beyond exploration, k-means has a workhorse use INSIDE supervised pipelines: fit clusters, then hand the classifier extra columns. Which columns, and why do they help?"] = [
    "A constant column is identical for every row, so it carries zero information a classifier can use to discriminate.",
    "Noise adds no signal at all; the useful additions carry structure - cluster ids and centroid distances.",
    "Like the inertia idea, a constant k column tells the model nothing that distinguishes one row from another.",
    "A point's silhouette describes clustering fit quality, not segment identity; the workhorse features are the cluster id and centroid distances."
  ];
  W["K-means is secretly a special case of fitting a Gaussian Mixture Model with EM. Which restrictions turn the general GMM into k-means, and what do you buy back by lifting them?"] = [
    "K-means also runs many iterations; the restriction lives in the model (spherical, equal, hard), not the iteration count.",
    "K-means moves its means at every update step; it's the covariances that are effectively frozen (spherical and equal) - the reverse.",
    "K-means uses HARD assignments, not soft; and its implied covariances are spherical-equal, a stronger restriction than merely diagonal.",
    "Equal mixing weights are only one restriction; sphericity and hard assignment must also be lifted to get elliptical soft clusters."
  ];
  W["Lloyd's algorithm converges — but only to a LOCAL minimum of inertia, which is why sklearn runs n_init=10 restarts by default. What does the restart machinery actually protect you from?"] = [
    "Restarts multiply the work rather than saving it; they buy solution quality, not faster warm-ups.",
    "n_init keeps the single best (lowest-inertia) run, not an average, and it exists to escape bad local minima, not smooth elbow curves.",
    "Coincident centroids give harmless zero distances, not overflow; restarts target bad optima, not arithmetic safety.",
    "Centroids are means of member points, so they can never leave the data's convex hull; that failure mode doesn't exist."
  ];
  W["K-means assigns each point to its nearest centroid, which carves space into Voronoi cells. This single geometric fact explains its two most notorious failure modes. Which are they?"] = [
    "With Euclidean k-means the boundaries are straight hyperplanes, not curved arcs, and k-means never leaves points unassigned as noise.",
    "The convexity fact is true, but k-means doesn't ignore small clusters - its real failures are straight boundaries and splitting spatially large clusters.",
    "Lloyd's algorithm is order-independent; run-to-run variation comes from random initialisation, and chaining is single linkage's failure, not k-means'.",
    "Voronoi cells have no equal-area property and clusters routinely hold different counts; cell sizes vary with centroid spacing."
  ];
  W["Marketing ran k-means twice (different seeds) and got 'different segments', sparking panic. The labels differ — but do the GROUPINGS? Adjusted Rand Index (ARI) answers this. What does it measure, and why 'adjusted'?"] = [
    "Best-matching labels and scoring points is a different measure; ARI works on point PAIRS, and its adjustment is chance expectation, not largest-cluster size.",
    "Shared information divided by entropy is (adjusted) mutual information, a sibling metric, not the Rand index.",
    "ARI never touches centroids; it compares the partitions themselves through point pairs.",
    "The plain Rand index counts pair agreements; the adjustment subtracts expected CHANCE agreement between the two labelings, not one run's own rate."
  ];
  W["With only 50 labelled examples and 10,000 unlabelled ones, a team lifts accuracy by clustering FIRST and then spending labels per cluster. What's the semi-supervised mechanism at work?"] = [
    "Bootstrapping from the model's own confident guesses is self-training/pseudo-labelling - a real method, but not the cluster-then-label mechanism described.",
    "Clustering only the 50 labelled points squanders the 10,000 unlabelled rows - the very data that reveals the structure.",
    "Duplicating rows adds no new information, and clustering ignores labels anyway; rebalancing solves a different, supervised problem.",
    "A single cluster finds no group structure, and its farthest points are just outliers, not a meaningful new class."
  ];
  W["Close the unsupervised loop: k-means, GMM, DBSCAN, agglomerative — a colleague asks 'which clusterer should I use?'. What's the honest decision procedure, given that no labels exist to arbitrate?"] = [
    "Silhouette presumes compact convex clusters - it systematically favours k-means-style output and punishes DBSCAN's correct answer on shapes like moons.",
    "A fixed silhouette bar inherits that same blob bias and ignores requirements like noise handling, probabilities or hierarchy.",
    "Scale matters but is one constraint among several; expected shape, noise, and whether k is known matter just as much.",
    "Ensemble agreement isn't ground truth - all four can agree while sharing the same wrong assumption, and the disagreements may be the interesting structure."
  ];
  // ---- Hierarchical Clustering (35) ----
  W["Before hierarchical clustering can merge anything, it needs the distance between two individual data points. For ordinary numeric features, how is that distance most commonly measured?"] = [
    "Counting disagreements suits categorical data (Hamming-style), not the default for continuous numeric features.",
    "Distance is measured through space between the two points; how many other points lie between is irrelevant.",
    "Averaging each point's features collapses it to one number and throws away the geometry; Euclidean compares dimension by dimension.",
    "Merge height is an OUTPUT of the clustering (the cophenetic distance), not the base input ruler."
  ];
  W["k-means makes you choose the number of clusters k before it runs. How does hierarchical clustering differ on this point?"] = [
    "The merge tree is built with no cluster count at all; k is chosen afterwards by where you cut.",
    "No fixed count exists; any k from 1 to n is available by cutting the tree at different heights.",
    "It produces every possible grouping in one tree; you extract whichever one you want with a cut.",
    "Feature count comes from the data and has nothing to do with when the cluster count is chosen."
  ];
  W["Your dataset has 'age' (0-100) and 'height in metres' (0-2). Why should you scale the features before hierarchical clustering?"] = [
    "The tree gets built either way; the danger is subtler - it's silently dominated by the big-range feature.",
    "Scaling has nothing to do with choosing the number of clusters; that's your cut decision.",
    "Merge heights vary with the data whether or not you scale; scaling doesn't flatten them.",
    "Backwards: it's the LARGE-range feature (age) whose big numeric differences swamp the distance."
  ];
  W["In hierarchical clustering, what does 'Ward linkage' do when deciding which two clusters to merge?"] = [
    "Merging by the closest pair of points is single linkage, not Ward.",
    "Merging by the farthest pair is complete linkage, not Ward.",
    "Choosing the LARGEST average distance would merge the most separated pair - nonsense; and Ward uses variance growth, not averages.",
    "Cluster size alone never drives Ward; it evaluates the variance increase each candidate union would cause."
  ];
  W["On a dendrogram, what does the 'merge height' of a join tell you?"] = [
    "Cluster size isn't encoded in the height; the vertical axis is distance (dissimilarity).",
    "Merge order loosely tracks height, but the height literally equals the linkage distance, not a merge counter.",
    "Merging increases within-cluster spread rather than removing variance; the axis records linkage distance.",
    "Closeness to the root is a by-product of late merging; the height's meaning is the clusters' distance at the merge."
  ];
  W["When reading a dendrogram, what does 'the tallest gap' (a long stretch of height where nothing merges) tell you?"] = [
    "The gap can sit anywhere on the height axis; it marks separation between groups, not the tree's midpoint.",
    "A quiet stretch means the groups below are genuinely far apart, not noisy - and cutting discards nothing.",
    "The opposite: a gap is a stretch where NO merges happen, not the busiest region.",
    "The linkage rule is fixed for the whole run; it never switches partway up the tree."
  ];
  W["What does adding a 'connectivity constraint' do to agglomerative clustering?"] = [
    "No size equality is imposed; the constraint governs which merges are allowed, not cluster counts.",
    "Connectivity is independent of choosing the cluster count; you still cut the tree wherever you like.",
    "There are no class labels in unsupervised clustering; the graph encodes neighbourhood, not labels.",
    "Any speed-up is a side effect; the defined behaviour is forbidding merges between unconnected clusters, not pruning far pairs."
  ];
  W["The output of hierarchical clustering is a 'dendrogram'. What is a dendrogram?"] = [
    "A coloured scatter shows one final grouping; the dendrogram records the entire merge history as a tree.",
    "A label table is one flat answer; the dendrogram holds every granularity at once.",
    "Clustering has no accuracy (there are no labels), and a dendrogram is a tree, not a performance curve.",
    "A grid of pairwise distances is the distance matrix - the INPUT the tree is built from, not the output."
  ];
  W["A dendrogram holds every possible grouping. How do you turn it into an actual set of clusters?"] = [
    "Keeping the last two branches always yields exactly 2 clusters; a height cut lets you extract any number.",
    "Averaging merge heights gives a number, not a grouping; you still have to slice the tree somewhere.",
    "Leaf arithmetic says nothing about which points belong together.",
    "No re-run is needed - the tree already contains every grouping; that's its main advantage over k-means."
  ];
  W["Hierarchical clustering repeatedly merges the two 'closest' clusters. But clusters are groups, not points — so how is the distance between two CLUSTERS defined?"] = [
    "Which member joined first is arbitrary bookkeeping; linkages summarise ALL pairwise distances between the groups.",
    "The difference in cluster sizes says nothing about how far apart the groups sit in space.",
    "One cluster's internal spread is not a between-cluster distance.",
    "Points lying between two clusters don't define their distance; linkage aggregates point-pair distances across the groups."
  ];
  W["Hierarchical clustering is usually 'agglomerative'. What does that mean, and what's the alternative?"] = [
    "Both directions work on the same data types; the real difference is merge-up versus split-down.",
    "Neither needs k up front - both build a full tree; the difference is the direction of construction.",
    "Divisive doesn't scale better; each split is its own expensive optimisation, which is why it's the RARE one.",
    "Moving centroids around is k-means; hierarchical methods merge or split whole groups in both variants."
  ];
  W["Given that hierarchical clustering produces a whole tree, why do people still reach for k-means on large datasets?"] = [
    "It merges two clusters per STEP, but the finished tree offers any number of clusters at once.",
    "It's unsupervised; the tree is built from pairwise distances alone, no labels needed.",
    "Euclidean distance works in any number of dimensions; feature count is not the barrier.",
    "Cluster quality depends on the data; the real objection at scale is the ~n-squared cost, not accuracy."
  ];
  W["Agglomerative (hierarchical) clustering starts with every point alone in its own cluster. What happens next, over and over?"] = [
    "Recursively splitting the largest cluster is top-down divisive clustering; agglomerative only merges.",
    "Centres drifting to their members' mean is k-means' update step; agglomerative has no moving centres.",
    "Points jumping to their nearest centre is k-means' assignment step, not a merge process.",
    "Pruning sparse points is DBSCAN-style noise handling; agglomerative keeps every point in the tree."
  ];
  W["A dendrogram in hand, your colleague asks 'so how many clusters are there?'. What's the honest answer?"] = [
    "n singleton clusters is only the starting state at the bottom of the tree, not the answer.",
    "The root merge is just the last event; cut lower and you get any other count you like.",
    "Linkage shapes WHICH merges happen, but the cluster count still comes from your chosen cut height.",
    "The square-root rule is a data-blind formula; the tree lets you choose from the actual merge structure instead."
  ];
  W["Single linkage measures cluster distance by the CLOSEST pair; complete linkage by the FARTHEST pair. What's single linkage's famous failure?"] = [
    "Shattering elongated clusters is complete linkage's failure; single linkage follows elongated shapes only too well.",
    "No linkage equalises diameters; complete linkage merely leans toward compact clusters.",
    "All linkages are unsupervised; class labels never enter the merging.",
    "Single linkage works in any number of dimensions; its flaw is chaining, not dimensionality."
  ];
  W["Hierarchical clustering gives that lovely tree — so why does anyone still use k-means on large datasets?"] = [
    "Dendrograms are built from pairwise distances alone; no class labels are involved.",
    "Backwards: the dendrogram IS the nested multi-level structure; k-means gives only a flat partition.",
    "The pairwise-distance requirement makes the cost roughly n-squared, far worse than n log n.",
    "No statistical validity limit exists; the barrier is compute and memory, not statistics."
  ];
  W["What is hierarchical clustering?"] = [
    "Fixing k and moving centroids to minimise within-cluster distance is k-means.",
    "Growing clusters from dense regions and marking noise is DBSCAN.",
    "Learning boundaries from labelled classes is supervised classification, not clustering.",
    "Projecting onto a few principal directions is PCA, a dimensionality-reduction method."
  ];
  W["In hierarchical clustering, what is 'linkage'?"] = [
    "The drawn lines depict merges; 'linkage' names the distance RULE that decides which merge happens next.",
    "Linkage is a rule used during merging, not a count of clusters at the end.",
    "Input order is irrelevant to the algorithm; linkage is a between-cluster distance definition.",
    "The cutting height is your extraction choice afterwards; linkage governs how the tree is built."
  ];
  W["What is 'single linkage' in hierarchical clustering?"] = [
    "Using the two FARTHEST points is complete linkage.",
    "Averaging over all pairs is average linkage.",
    "Minimising the variance increase is Ward's method.",
    "Comparing the clusters' centroids is centroid linkage, another rule entirely."
  ];
  W["What is 'complete linkage' in hierarchical clustering?"] = [
    "Using the two CLOSEST points is single linkage.",
    "Averaging over all pairs is average linkage.",
    "Minimising variance growth is Ward's method.",
    "Comparing only the centroids is centroid linkage, a different rule."
  ];
  W["What is 'average linkage' in hierarchical clustering?"] = [
    "Using only the closest pair is single linkage.",
    "Using only the farthest pair is complete linkage.",
    "Minimising the variance increase is Ward's method.",
    "Distance between the two mean points is centroid linkage - not the same as the mean of all pairwise distances."
  ];
  W["What is 'Ward linkage' (Ward's method) in hierarchical clustering?"] = [
    "Merging by the closest single pair is single linkage.",
    "Merging by the farthest single pair is complete linkage.",
    "No linkage waits for centroids at some magic fixed distance; Ward ranks candidate merges by variance growth.",
    "Input order plays no role; merges are chosen by the variance criterion, not data-supply order."
  ];
  W["What is 'divisive' hierarchical clustering?"] = [
    "Starting from singletons and merging upward is agglomerative - the common opposite.",
    "Fixing k and refining centroids is k-means.",
    "Growing from dense seeds and discarding noise is DBSCAN.",
    "Projecting onto principal components first is PCA preprocessing, not divisive clustering."
  ];
  W["In a dendrogram, what is the 'merge height'?"] = [
    "Cluster size isn't what the vertical axis records; dissimilarity at the moment of joining is.",
    "A leaf's horizontal position is just layout for readability; the meaningful axis is vertical.",
    "The total merge count is always n-1 for n points; merge height is a per-join distance, not a tally.",
    "The cut height is the analyst's later choice; merge height is a property the tree records for each join."
  ];
  W["What is the 'cophenetic distance' between two points in hierarchical clustering?"] = [
    "The straight-line gap is the original feature-space distance; cophenetic distance is read off the TREE instead.",
    "It's a height (a dissimilarity value), not a count of merge steps.",
    "Centroids belong to k-means; a dendrogram has none to measure against.",
    "Average distance to cluster-mates is the 'a' term in a silhouette, not the cophenetic distance."
  ];
  W["What does 'cutting the dendrogram' mean?"] = [
    "Cutting removes nothing; every point ends up in one of the clusters below the line.",
    "It's how you extract clusters, not a plotting or page-layout trick.",
    "The linkage rule is chosen before building the tree; cutting happens after it's built.",
    "The final root merge is part of BUILDING the tree; cutting is how you read a flat answer out of it."
  ];
  W["Ward linkage is the default in sklearn's AgglomerativeClustering. What rule does Ward use to pick which two clusters merge next?"] = [
    "Merging by the nearest individual members is single linkage, not Ward.",
    "Centroid distance alone ignores each cluster's size and spread; Ward's criterion is the growth in within-cluster variance.",
    "Ward never sorts by size; any balance in cluster sizes is a side effect of the variance criterion, not a rule.",
    "Similarity of member counts is never the criterion; the variance increase of the union is."
  ];
  W["Agglomerative clustering builds its tree bottom-up (n−1 merges). There's a mirror-image strategy, divisive clustering, which is rarely used. What is it, and why the rarity?"] = [
    "Divisive is top-down splitting, not a bottom-up merge in randomised order.",
    "The rarity is computational: each split must search an enormous space of possible bipartitions - it's not a historical accident.",
    "If anything divisive sees the global picture FIRST; its handicap is the cost of choosing good splits, not lost structure.",
    "Recursive splitting builds a tree just as merging does, so the dendrogram is not forfeited."
  ];
  W["Agglomerative clustering needs the full pairwise-distance picture — memory and time grow roughly with n². Your dataset has 2 million rows. What's the standard workaround?"] = [
    "2 million rows means trillions of pairwise distances - hardware can't rescue an n-squared blow-up, and time explodes too.",
    "Separate trees know nothing about cross-part distances, and dendrograms can't be meaningfully concatenated.",
    "No 1-D sort preserves multi-dimensional proximity, and all pairwise distances would still be needed.",
    "Single linkage can be accelerated (MST tricks), but not to linear time - and switching linkage changes the answer's character anyway."
  ];
  W["sklearn's AgglomerativeClustering accepts a connectivity graph (e.g. each point linked to its 10 nearest neighbours). What does supplying it change about the merges?"] = [
    "The results genuinely change: merges across unconnected gaps become impossible, so the tree itself is different.",
    "The graph only limits which merges are legal; the final count still comes from your n_clusters or cut, not the component count.",
    "Distances stay in your chosen metric; the graph gates WHICH merges are permitted, it isn't a new distance.",
    "The procedure stays bottom-up merging; only the set of candidate merges shrinks."
  ];
  W["You must extract ONE clustering from a dendrogram for the report. Reading the tree's merge heights, what marks the most defensible number of clusters?"] = [
    "Tightly packed merges mean clusters kept joining readily - evidence of NO natural boundary there.",
    "The mean is dragged around by many uninformative low merges; separation shows in the biggest gap, not an average.",
    "Cutting just above the first merge yields n-1 clusters, nearly all singletons - no report-worthy structure.",
    "A burst of rapid merging signals similar groups happily fusing; a real boundary is where merging STALLS."
  ];
  W["Single linkage can chain two well-separated clusters together through a thin bridge of stray points; complete linkage refuses to, but then shatters elongated clusters. Why do the two linkages fail in exactly opposite ways?"] = [
    "It states the definitions backwards: single linkage uses the closest pair and complete the farthest.",
    "Neither linkage averages; they take the minimum and maximum pairwise distance respectively - a difference in kind, not degree.",
    "Neither rule uses centroids or bounding radii; both operate on extreme point-pair distances.",
    "Merge choice is by distance in both rules, never by cluster size."
  ];
  W["Ward linkage's formula for the distance between merged clusters is usually computed via the Lance–Williams recurrence, not by re-scanning all points. What does that recurrence buy, and what does it require of your metric?"] = [
    "The recurrence's whole point is AVOIDING re-scans; and Ward's version is tied to Euclidean geometry, not metric-agnostic.",
    "Cutting the tree remains your decision; the recurrence is purely a computational shortcut, it reveals no natural k.",
    "The recurrence expresses each linkage with DIFFERENT coefficients; the resulting trees still differ by linkage.",
    "It updates distances incrementally rather than relying on a giant cache, and the saving grows with data size, not just small sets."
  ];
  W["The cophenetic correlation coefficient is the standard way to ask 'does my dendrogram faithfully represent the original distances?'. What two distances does it correlate, and what does a low value tell you?"] = [
    "Cophenetic correlation involves no held-out data; it compares the tree's implied distances with the original ones.",
    "Comparing pre- and post-scaling distances is a separate preprocessing check; this coefficient tests the DENDROGRAM's faithfulness.",
    "Restart stability is a different diagnostic - and agglomerative clustering is deterministic, so restarts change nothing.",
    "No second k-means-seeded tree is involved; the comparison is tree-implied (cophenetic) versus original pairwise distances."
  ];
  W["BIRCH clusters 50 million rows in one pass using a 'CF-tree' — yet it's still building an agglomerative-style summary. What is the CF-tree, and what's the fundamental trade it makes?"] = [
    "CF nodes store summary statistics, not raw points, and the result is approximate - exactness is precisely what gets traded away.",
    "There is no linkage matrix to serialise; the CF-tree is built incrementally from running sums, not saved pairwise distances.",
    "BIRCH is unsupervised; no labels, samples-for-training, or decision-tree classifiers are involved.",
    "BIRCH's whole point is avoiding the n-squared matrix; computing it faster on a GPU is not the algorithm."
  ];
})();
