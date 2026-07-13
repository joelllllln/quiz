/* Order-the-steps exercises: put an algorithm's steps back in sequence. steps[] is the CORRECT order (shuffled at render). */
(function () {
  window.ORDERS = [
    { key: 'found', title: 'The supervised learning workflow', level: 1, steps: [
      'Collect labelled examples (features + the right answers)',
      'Split the data into training and test sets',
      'Train the model on the training set only',
      'Evaluate on the held-out test set',
      'Deploy and monitor on genuinely new data'
    ] },
    { key: 'found', title: 'Diagnosing overfitting', level: 2, steps: [
      'Train the model and record training accuracy',
      'Evaluate on held-out data and record test accuracy',
      'Compare: training far above test means overfitting',
      'Simplify the model or add regularisation / data',
      'Re-evaluate on held-out data to confirm the gap closed'
    ] },
    { key: 'kmeans', title: 'One K-Means run', level: 1, steps: [
      'Choose k and place k initial centroids',
      'Assign every point to its nearest centroid',
      'Move each centroid to the mean of its assigned points',
      'Repeat assign-and-average until assignments stop changing',
      'Report the final clusters and centroids'
    ] },
    { key: 'knn', title: 'Classifying one point with k-NN', level: 1, steps: [
      'Scale the features so no column dominates the distance',
      'Compute the distance from the new point to every training point',
      'Take the k nearest neighbours',
      'Let the neighbours vote on the class',
      'Assign the majority class to the new point'
    ] },
    { key: 'trees', title: 'Growing a decision tree', level: 2, steps: [
      'Start with all training rows at the root',
      'Try candidate splits and score each by impurity reduction',
      'Apply the best split, creating child nodes',
      'Recurse on each child with its subset of rows',
      'Stop when nodes are pure or a depth/size limit is hit'
    ] },
    { key: 'gboost', title: 'One gradient boosting round', level: 3, steps: [
      'Start from the current ensemble prediction',
      'Compute each example’s residual error (negative gradient)',
      'Fit a small tree to those residuals',
      'Scale the new tree by the learning rate',
      'Add it to the ensemble and repeat on the new errors'
    ] },
    { key: 'rf', title: 'Building a random forest', level: 2, steps: [
      'Draw a bootstrap sample of the training rows for each tree',
      'Grow each tree, sampling a random feature subset at every split',
      'Leave the trees deep and unpruned',
      'Repeat until you have hundreds of independent trees',
      'Predict by voting (or averaging) across all trees'
    ] },
    { key: 'pca', title: 'Running PCA properly', level: 2, steps: [
      'Standardise every feature (mean 0, variance 1)',
      'Compute the covariance between all feature pairs',
      'Find the eigenvectors and eigenvalues of that covariance',
      'Sort components by explained variance and keep the top ones',
      'Project the data onto the kept components'
    ] },
    { key: 'msel', title: 'Honest model selection', level: 2, steps: [
      'Lock away a final test set and don’t touch it',
      'Choose candidate models and hyperparameter grids',
      'Compare candidates with cross-validation on the training data',
      'Pick the winner and retrain it on all training data',
      'Measure the final model ONCE on the locked-away test set'
    ] },
    { key: 'metrics', title: 'From confusion matrix to F1', level: 2, steps: [
      'Fill the confusion matrix: TP, FP, FN, TN',
      'Precision = TP ÷ (TP + FP)',
      'Recall = TP ÷ (TP + FN)',
      'F1 = the harmonic mean of precision and recall',
      'Report F1 alongside the raw counts, not instead of them'
    ] },
    { key: 'dbscan', title: 'How DBSCAN labels points', level: 2, steps: [
      'Pick eps (the neighbourhood radius) and minPts',
      'Count each point’s neighbours within eps',
      'Mark points with at least minPts neighbours as core points',
      'Grow clusters by connecting core points that reach each other',
      'Label non-core points near a cluster as border, the rest as noise'
    ] },
    { key: 'feng', title: 'A leak-free preprocessing pipeline', level: 3, steps: [
      'Split into train and test FIRST',
      'Fit the scaler and encoders on the training set only',
      'Transform the training set with those fitted steps',
      'Transform the test set using the SAME fitted steps',
      'Train and evaluate — no test-set statistics ever leaked in'
    ] }
  ];
})();
