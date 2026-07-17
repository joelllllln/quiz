/* Difficulty levels for every coding task: 1 = foundations, 2 = practice, 3 = advanced.
   Applied as a patch so task files stay focused on content. Loads after the task files. */
(function () {
  var L = {
    // 1 — foundations: the first moves everyone must know cold
    split: 1, scale: 1, knn: 1, cv: 1, logreg: 1, metrics: 1, prf: 1, impute: 1,
    baseline: 1, save: 1, kmeans: 1, fixnotfit: 1, fixstring: 1,
    // 2 — practice: the standard working toolkit
    pipeline: 2, grid: 2, rf: 2, encode: 2, pca: 2, threshold: 2, imbal: 2, tssplit: 2,
    kfold: 2, skfold: 2, dbscan: 2, hier: 2, regmetrics: 2, rocauc: 2, fsel: 2,
    rsearch: 2, cvmulti: 2, histgb: 2, silhouette: 2, fixshape: 2, fixconverge: 2, fixproba: 2,
    // 3 — advanced: the subtle machinery
    pipegrid: 3, calib: 3, lcurve: 3, permimp: 3, ridge: 3, nestedcv: 3, groupkfold: 3,
    valcurve: 3, logloss: 3, fixleak: 3, full: 3
  };
  (window.CODETASKS || []).forEach(function (t) { t.lvl = L[t.key] || 2; });
})();
