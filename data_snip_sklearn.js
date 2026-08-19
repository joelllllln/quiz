/* Quickfire cards — scikit-learn: the imports, the four verbs, and the lines you type
   in every project. Deliberately small bits; the Practice tasks build the whole workflow. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var IMP = 'scikit-learn · imports';
  var FIT = 'scikit-learn · fit & predict';
  var PRE = 'scikit-learn · preprocessing';
  var EVA = 'scikit-learn · evaluation & tuning';

  window.SNIPPETS.push(

    /* ---- imports: where everything lives ---- */
    { id: 'sk-tts-import', group: IMP, lvl: 1,
      ask: 'Import the train/test splitter',
      a: 'from sklearn.model_selection import train_test_split' },

    { id: 'sk-logreg-import', group: IMP, lvl: 1,
      ask: 'Import logistic regression',
      a: 'from sklearn.linear_model import LogisticRegression',
      note: 'Classification lives in linear_model despite the name.' },

    { id: 'sk-linreg-import', group: IMP, lvl: 1,
      ask: 'Import linear regression',
      a: 'from sklearn.linear_model import LinearRegression' },

    { id: 'sk-rf-import', group: IMP, lvl: 1,
      ask: 'Import the random forest classifier',
      a: 'from sklearn.ensemble import RandomForestClassifier',
      note: 'Every ensemble — forests, boosting, bagging, voting, stacking — is in sklearn.ensemble.' },

    { id: 'sk-tree-import', group: IMP, lvl: 1,
      ask: 'Import the decision tree classifier',
      a: 'from sklearn.tree import DecisionTreeClassifier' },

    { id: 'sk-knn-import', group: IMP, lvl: 1,
      ask: 'Import the k-nearest-neighbours classifier',
      a: 'from sklearn.neighbors import KNeighborsClassifier' },

    { id: 'sk-svm-import', group: IMP, lvl: 2,
      ask: 'Import the support vector classifier',
      a: 'from sklearn.svm import SVC' },

    { id: 'sk-gb-import', group: IMP, lvl: 2,
      ask: 'Import the gradient boosting classifier',
      a: 'from sklearn.ensemble import GradientBoostingClassifier' },

    { id: 'sk-nb-import', group: IMP, lvl: 2,
      ask: 'Import Gaussian Naive Bayes',
      a: 'from sklearn.naive_bayes import GaussianNB' },

    { id: 'sk-kmeans-import', group: IMP, lvl: 2,
      ask: 'Import KMeans',
      a: 'from sklearn.cluster import KMeans',
      note: 'DBSCAN and AgglomerativeClustering share the cluster module.' },

    { id: 'sk-pca-import', group: IMP, lvl: 2,
      ask: 'Import PCA',
      a: 'from sklearn.decomposition import PCA' },

    { id: 'sk-scaler-import', group: IMP, lvl: 1,
      ask: 'Import the standard scaler',
      a: 'from sklearn.preprocessing import StandardScaler' },

    { id: 'sk-metrics-import', group: IMP, lvl: 1,
      ask: 'Import accuracy_score',
      a: 'from sklearn.metrics import accuracy_score',
      note: 'Every metric lives in sklearn.metrics.' },

    { id: 'sk-pipeline-import', group: IMP, lvl: 2,
      ask: 'Import Pipeline',
      a: 'from sklearn.pipeline import Pipeline' },

    { id: 'sk-grid-import', group: IMP, lvl: 2,
      ask: 'Import GridSearchCV',
      a: 'from sklearn.model_selection import GridSearchCV' },

    /* ---- the four verbs ---- */
    { id: 'sk-split', group: FIT, lvl: 1,
      ask: 'Split X and y into an 80/20 train/test split, reproducibly',
      a: 'X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)',
      note: 'The return order is X_train, X_test, y_train, y_test — X halves first.' },

    { id: 'sk-split-strat', group: FIT, lvl: 2,
      ask: 'Split X and y keeping the class balance the same in both halves',
      a: 'X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)',
      note: 'stratify=y is essential on imbalanced data.' },

    { id: 'sk-xy', group: FIT, lvl: 1,
      ask: 'Split df into features X (everything but "target") and labels y',
      a: "X = df.drop(columns=['target'])\ny = df['target']",
      note: 'Two lines, one idea: the questions and the answers.' },

    { id: 'sk-instantiate', group: FIT, lvl: 1,
      ask: 'Create a random forest with 200 trees and a fixed seed',
      a: 'model = RandomForestClassifier(n_estimators=200, random_state=42)' },

    { id: 'sk-fit', group: FIT, lvl: 1,
      ask: 'Train the model on the training data',
      a: 'model.fit(X_train, y_train)',
      note: 'fit only ever sees training data. Everything else is evaluation.' },

    { id: 'sk-predict', group: FIT, lvl: 1,
      ask: 'Predict the labels for the test set',
      a: 'y_pred = model.predict(X_test)' },

    { id: 'sk-proba', group: FIT, lvl: 1,
      ask: 'Get the predicted probability of the positive class for the test set',
      a: 'y_proba = model.predict_proba(X_test)[:, 1]',
      note: 'predict_proba returns one column per class; column 1 is the positive class.' },

    { id: 'sk-score', group: FIT, lvl: 1,
      ask: 'Get the model\'s built-in score on the test set',
      a: 'model.score(X_test, y_test)',
      note: 'Accuracy for classifiers, R² for regressors.' },

    { id: 'sk-coef', group: FIT, lvl: 2,
      ask: 'Look at a fitted linear model\'s coefficients',
      a: 'model.coef_',
      note: 'The trailing underscore means "learned during fit" — it does not exist beforehand.' },

    { id: 'sk-intercept', group: FIT, lvl: 2,
      ask: 'Look at a fitted linear model\'s intercept',
      a: 'model.intercept_' },

    { id: 'sk-importances', group: FIT, lvl: 2,
      ask: 'Get a fitted tree model\'s feature importances',
      a: 'model.feature_importances_',
      note: 'Pair with X.columns to read them: pd.Series(model.feature_importances_, index=X.columns).' },

    { id: 'sk-importances-series', group: FIT, lvl: 3,
      ask: 'Show the feature importances as a named, sorted Series',
      a: 'pd.Series(model.feature_importances_, index=X.columns).sort_values(ascending=False)',
      note: 'Numbers without names are useless — always attach the column labels.' },

    { id: 'sk-classes', group: FIT, lvl: 3,
      ask: 'See what class order a fitted classifier is using',
      a: 'model.classes_',
      note: 'This is the column order of predict_proba — check it before you slice.' },

    /* ---- preprocessing ---- */
    { id: 'sk-scale-fit', group: PRE, lvl: 1,
      ask: 'Fit the scaler on the training features and transform them',
      a: 'X_train_s = scaler.fit_transform(X_train)',
      note: 'fit_transform on train only — it learns the means and spreads.' },

    { id: 'sk-scale-test', group: PRE, lvl: 1,
      ask: 'Apply the already-fitted scaler to the test features',
      a: 'X_test_s = scaler.transform(X_test)',
      note: 'transform, never fit_transform. Refitting here leaks test information.' },

    { id: 'sk-minmax', group: PRE, lvl: 2,
      ask: 'Import the scaler that squashes features into 0–1',
      a: 'from sklearn.preprocessing import MinMaxScaler' },

    { id: 'sk-ohe-import', group: PRE, lvl: 2,
      ask: 'Import the one-hot encoder',
      a: 'from sklearn.preprocessing import OneHotEncoder',
      note: 'handle_unknown=\'ignore\' stops unseen categories crashing prediction.' },

    { id: 'sk-imputer', group: PRE, lvl: 2,
      ask: 'Import the simple missing-value imputer',
      a: 'from sklearn.impute import SimpleImputer',
      note: 'strategy takes mean, median, most_frequent or constant.' },

    { id: 'sk-imputer-median', group: PRE, lvl: 2,
      ask: 'Create an imputer that fills gaps with the median',
      a: "imputer = SimpleImputer(strategy='median')" },

    { id: 'sk-label-encoder', group: PRE, lvl: 2,
      ask: 'Import the encoder that turns class labels into numbers',
      a: 'from sklearn.preprocessing import LabelEncoder',
      note: 'For the TARGET only — using it on features invents a fake ordering.' },

    { id: 'sk-pipeline', group: PRE, lvl: 2,
      ask: 'Build a pipeline that scales then fits a logistic regression',
      a: "pipe = Pipeline([('scaler', StandardScaler()), ('model', LogisticRegression())])",
      note: 'A list of (name, step) tuples. The pipeline makes leakage almost impossible.' },

    { id: 'sk-pipeline-fit', group: PRE, lvl: 2,
      ask: 'Fit the pipeline on the training data',
      a: 'pipe.fit(X_train, y_train)',
      note: 'Every step is fitted on train, in order, in one call.' },

    { id: 'sk-coltrans', group: PRE, lvl: 3,
      ask: 'Import the transformer that applies different steps to different columns',
      a: 'from sklearn.compose import ColumnTransformer',
      note: 'Numbers scaled, categories one-hot encoded, in one object.' },

    { id: 'sk-pca-fit', group: PRE, lvl: 2,
      ask: 'Reduce the scaled training features to 2 components with PCA',
      a: 'X_pca = PCA(n_components=2).fit_transform(X_train_s)',
      note: 'Always scale before PCA — it follows variance, and unscaled units dominate.' },

    { id: 'sk-explained-var', group: PRE, lvl: 3,
      ask: 'See how much variance each PCA component explains',
      a: 'pca.explained_variance_ratio_',
      note: '.cumsum() on that tells you how many components you actually need.' },

    /* ---- evaluation & tuning ---- */
    { id: 'sk-accuracy', group: EVA, lvl: 1,
      ask: 'Compute accuracy from the true and predicted labels',
      a: 'accuracy_score(y_test, y_pred)',
      note: 'Truth first, predictions second — every sklearn metric takes that order.' },

    { id: 'sk-precision', group: EVA, lvl: 1,
      ask: 'Compute precision from the true and predicted labels',
      a: 'precision_score(y_test, y_pred)',
      note: 'Of the ones we flagged, how many were right.' },

    { id: 'sk-recall', group: EVA, lvl: 1,
      ask: 'Compute recall from the true and predicted labels',
      a: 'recall_score(y_test, y_pred)',
      note: 'Of the ones that mattered, how many we caught.' },

    { id: 'sk-f1', group: EVA, lvl: 1,
      ask: 'Compute the F1 score',
      a: 'f1_score(y_test, y_pred)',
      note: 'The harmonic mean of precision and recall.' },

    { id: 'sk-report', group: EVA, lvl: 1,
      ask: 'Print precision, recall and F1 for every class in one go',
      a: 'print(classification_report(y_test, y_pred))',
      note: 'The single most useful line in a classification notebook.' },

    { id: 'sk-confusion', group: EVA, lvl: 1,
      ask: 'Compute the confusion matrix',
      a: 'confusion_matrix(y_test, y_pred)',
      note: 'Reads [[TN, FP], [FN, TP]] for a binary problem.' },

    { id: 'sk-rocauc', group: EVA, lvl: 2,
      ask: 'Compute ROC-AUC from the true labels and predicted probabilities',
      a: 'roc_auc_score(y_test, y_proba)',
      note: 'Probabilities, not hard predictions — feeding it 0/1 labels quietly understates it.' },

    { id: 'sk-rmse', group: EVA, lvl: 2,
      ask: 'Compute the root mean squared error of a regression',
      a: 'mean_squared_error(y_test, y_pred, squared=False)',
      alts: ['root_mean_squared_error(y_test, y_pred)'],
      note: 'squared=False gives RMSE directly; newer sklearn has root_mean_squared_error.' },

    { id: 'sk-mae', group: EVA, lvl: 2,
      ask: 'Compute the mean absolute error',
      a: 'mean_absolute_error(y_test, y_pred)',
      note: 'In the units of the target, and far less sensitive to outliers than RMSE.' },

    { id: 'sk-r2', group: EVA, lvl: 2,
      ask: 'Compute R² for a regression',
      a: 'r2_score(y_test, y_pred)' },

    { id: 'sk-cv', group: EVA, lvl: 1,
      ask: 'Run 5-fold cross-validation of the model on X and y',
      a: 'scores = cross_val_score(model, X, y, cv=5)',
      note: 'Returns one score per fold. Report scores.mean() and scores.std() together.' },

    { id: 'sk-cv-metric', group: EVA, lvl: 2,
      ask: 'Cross-validate the model with 5 folds, scoring on ROC-AUC',
      a: "scores = cross_val_score(model, X, y, cv=5, scoring='roc_auc')",
      note: 'scoring takes accuracy, f1, roc_auc, neg_root_mean_squared_error and many more.' },

    { id: 'sk-skfold', group: EVA, lvl: 3,
      ask: 'Create a 5-fold stratified splitter, shuffled, with a fixed seed',
      a: 'cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)',
      note: 'Stratified keeps the class balance in every fold.' },

    { id: 'sk-grid', group: EVA, lvl: 2,
      ask: 'Set up a grid search over `param_grid` with 5-fold CV',
      a: 'grid = GridSearchCV(model, param_grid, cv=5)',
      note: 'n_jobs=-1 uses every core; scoring= picks what "best" means.' },

    { id: 'sk-grid-best', group: EVA, lvl: 2,
      ask: 'Read the winning hyperparameters out of a fitted grid search',
      a: 'grid.best_params_',
      note: 'best_score_ is its cross-validated score, best_estimator_ the refitted model.' },

    { id: 'sk-random-search', group: EVA, lvl: 3,
      ask: 'Import the randomised hyperparameter search',
      a: 'from sklearn.model_selection import RandomizedSearchCV',
      note: 'Better value than a grid once you have more than two or three parameters.' },

    { id: 'sk-baseline', group: EVA, lvl: 2,
      ask: 'Import the dummy classifier used for a baseline',
      a: 'from sklearn.dummy import DummyClassifier',
      note: 'strategy=\'most_frequent\' is the score your real model must beat.' },

    { id: 'sk-threshold', group: EVA, lvl: 3,
      ask: 'Turn predicted probabilities into labels using a 0.3 threshold',
      a: 'y_pred = (y_proba >= 0.3).astype(int)',
      note: '0.5 is a default, not a law — move it to buy recall at the cost of precision.' },

    { id: 'sk-joblib-save', group: EVA, lvl: 2,
      ask: 'Save the fitted model to "model.joblib"',
      a: "joblib.dump(model, 'model.joblib')",
      note: 'import joblib. Save the whole pipeline, not just the estimator.' },

    { id: 'sk-joblib-load', group: EVA, lvl: 2,
      ask: 'Load the saved model back from "model.joblib"',
      a: "model = joblib.load('model.joblib')" },

    { id: 'sk-perm-imp', group: EVA, lvl: 3,
      ask: 'Import permutation importance',
      a: 'from sklearn.inspection import permutation_importance',
      note: 'Model-agnostic and measured on held-out data — more trustworthy than impurity importance.' },

    { id: 'sk-class-weight', group: EVA, lvl: 2,
      ask: 'Create a logistic regression that compensates for class imbalance',
      a: "model = LogisticRegression(class_weight='balanced')",
      note: 'Weights each class by its inverse frequency — free, and usually the first thing to try.' },

    { id: 'sk-max-iter', group: EVA, lvl: 2,
      ask: 'Create a logistic regression allowed 1000 iterations to converge',
      a: 'model = LogisticRegression(max_iter=1000)',
      note: 'The standard cure for ConvergenceWarning — that, or scaling your features.' }
  );
})();
