/* Study notes for the expanded topics: Interpretability, Class Imbalance, Extra Evaluation Metrics,
   Regression & Boosting, Validation. Titles match the concept names so read+recall can use them as
   rich reads, and the Notes reader now lists these topics like every other. */
(function () {
  window.NOTES = window.NOTES || {};

  window.NOTES["interp"] = {
    key: "interp", name: "Interpretability & Explainability",
    intro: "Opening the black box: tools that explain what a model does — across the whole dataset, or for one single decision.",
    groups: [
      { h: "Explaining one prediction (local)", items: [
        { t: "SHAP values", d: "Borrowed from game theory: each feature's fair share of credit for one prediction. Start from a base value (the average prediction) and every feature's share nudges it up or down to land exactly on the output. Exact, consistent, and fast on tree models.", f: "base value + Σ contributions = prediction" },
        { t: "LIME", d: "Wiggle one input a little, watch how the answer moves, and fit a tiny readable model to that neighbourhood. Works on any model, but the explanation is only trustworthy right around that case." }
      ] },
      { h: "Explaining the whole model (global)", items: [
        { t: "Partial dependence plot (PDP)", d: "Slide one feature across its range, average the prediction over all other features at each step, and plot it — revealing the overall shape (rising, flat, U-shaped) of that feature's effect." },
        { t: "Global vs local explanation", d: "Global answers 'how does the model behave in general?' (importances, PDP); local answers 'why did it decide THIS for this case?' (SHAP, LIME). You usually want both." }
      ] },
      { h: "Choosing a tool & documenting", items: [
        { t: "SHAP vs LIME — which explainer?", d: "SHAP for exact, consistent per-feature credit (great on trees); LIME for a quick, model-agnostic local peek when SHAP is too slow." },
        { t: "Model card", d: "A short spec sheet that travels with a model: intended use, training data, metrics, and known limits and biases. Increasingly expected by regulators." }
      ] }
    ]
  };

  window.NOTES["imbal"] = {
    key: "imbal", name: "Class Imbalance",
    intro: "When one class massively outnumbers the others, accuracy flatters a useless model. Here's how to see it and fix it.",
    groups: [
      { h: "The problem", items: [
        { t: "Class imbalance", d: "One class swamps the rest, so 'always predict the majority' scores high on accuracy while catching none of the rare cases. Switch to recall, precision, PR-AUC, balanced accuracy or MCC." },
        { t: "Why accuracy lies on imbalanced data", d: "On a 99% / 1% split an always-negative model is 99% accurate and useless. Accuracy is swamped by the majority; judge the model on metrics that see the rare class." }
      ] },
      { h: "The three levers", items: [
        { t: "SMOTE", d: "Grow the minority class by interpolating new points between nearby minority examples, rather than photocopying existing rows — more variety, less overfitting. Fit on training data only." },
        { t: "Over/undersampling", d: "Duplicate minority rows (oversampling) or drop majority rows (undersampling) to even the classes. Simple but blunt, and applied only inside the training fold to avoid leakage." },
        { t: "Class weights", d: "Leave the data alone and tell the loss that minority mistakes cost more (often class_weight='balanced'). The model stops ignoring the rare class." },
        { t: "Fixing imbalance: resample vs reweight vs threshold", d: "Change the data (resample), change the loss (class weights), or change the cutoff (move the threshold). Weights and threshold-moving are gentlest — they don't distort the data." }
      ] }
    ]
  };

  window.NOTES["evalx"] = {
    key: "evalx", name: "Extra Evaluation Metrics",
    intro: "Beyond plain accuracy: balanced scores, agreement corrected for chance, honest probabilities, and metrics for rare positives.",
    groups: [
      { h: "Honest accuracy on skewed data", items: [
        { t: "Balanced accuracy", d: "The average recall across the classes. On a 99/1 split, always-majority scores 50% here (not 99%), exposing the useless model." },
        { t: "Matthews correlation coefficient (MCC)", d: "A correlation from all four confusion-matrix cells, from -1 to +1, only high when BOTH classes are handled well — the hardest single score to fool." },
        { t: "Cohen's kappa", d: "Agreement between predictions and truth, with the agreement you'd get by pure chance subtracted out. 0 = no better than guessing, 1 = perfect." }
      ] },
      { h: "Are the probabilities honest?", items: [
        { t: "Brier score", d: "The mean squared error of the predicted probabilities. Confident-and-wrong is punished hard; lower means better-calibrated confidence." },
        { t: "Calibration curve", d: "Bucket predictions by claimed probability and plot against the actual fraction of positives. On the diagonal, 'the model said 0.7' really happens 70% of the time." }
      ] },
      { h: "Rare positives & trade-offs", items: [
        { t: "Average precision (PR-AUC)", d: "The area under the precision–recall curve. Because it ignores the huge pile of true negatives, it stays informative when positives are rare." },
        { t: "ROC-AUC vs PR-AUC", d: "ROC-AUC's false-positive-rate axis is dominated by true negatives, so it can look high while positives are missed. Prefer PR-AUC when positives are scarce." },
        { t: "Precision vs recall — which to favour", d: "Favour recall when a miss is costly (disease screening, fraud); favour precision when a false alarm is costly (spam, flagging users). The threshold slides between them." },
        { t: "F1 vs balanced accuracy vs MCC", d: "F1 = precision & recall of the positive class; balanced accuracy = mean per-class recall; MCC = all four cells, the most fool-proof single number on skewed data." }
      ] }
    ]
  };

  window.NOTES["regr"] = {
    key: "regr", name: "Regression & Boosting",
    intro: "Predicting numbers — the baseline linear tools, their regularised cousins, and the fast modern boosting libraries.",
    groups: [
      { h: "Predicting a number", items: [
        { t: "Linear regression", d: "Fit a weighted sum of the features to a numeric target by minimising squared error — the fast, interpretable baseline to try first.", f: "ŷ = w·x + b" },
        { t: "RMSE", d: "Square the errors, average, then square-root back to the target's own units. Squaring first means big misses dominate, so it's outlier-sensitive." },
        { t: "RMSE vs MAE", d: "RMSE punishes large misses harder (outlier-sensitive); MAE averages absolute errors linearly (outlier-robust). Pick by whether big errors should dominate." }
      ] },
      { h: "Regularised linear models", items: [
        { t: "Elastic Net regularisation", d: "Blend L1 and L2 penalties — Lasso's feature-zeroing sparsity plus Ridge's stability on correlated features.", f: "L1 (sparse) + L2 (stable)" },
        { t: "Ridge vs Lasso vs Elastic Net", d: "Ridge (L2) shrinks all, keeps every feature (stable when correlated); Lasso (L1) zeroes some (sparse, but erratic under correlation); Elastic Net blends both. Correlated features → Elastic Net." }
      ] },
      { h: "Modern boosting libraries", items: [
        { t: "LightGBM", d: "Leaf-wise, histogram-based gradient boosting — the fastest and lightest choice on large tabular data." },
        { t: "CatBoost", d: "Gradient boosting with native categorical handling and ordered boosting to curb the target leakage that naive category encoding causes." },
        { t: "XGBoost vs LightGBM vs CatBoost", d: "XGBoost = robust default; LightGBM = speed on big tables; CatBoost = many categorical columns. Pick by data size and categorical load." }
      ] }
    ]
  };

  window.NOTES["valid"] = {
    key: "valid", name: "Validation",
    intro: "Splitting data honestly, so your validation score reflects truly unseen cases — matched to the way your data is NOT independent.",
    groups: [
      { h: "Splits that stop leakage", items: [
        { t: "Group k-fold", d: "Keep every row from the same entity (user, firm, patient) inside one fold, so the model can't recognise a subject it also trained on." },
        { t: "Time-series validation split", d: "Always train on the past and validate on the future, never shuffling time-ordered data — otherwise the model peeks at the future and fakes great scores." },
        { t: "Leave-one-out (LOOCV)", d: "k-fold taken to the extreme: each row is its own validation fold, so you train n times. Nearly unbiased but costly and high-variance." }
      ] },
      { h: "Choosing a split", items: [
        { t: "k-fold vs group k-fold vs time-series split", d: "Independent rows → plain k-fold. Repeated entities → group k-fold (stops same-subject leakage). Time order → time-series split (stops look-ahead leakage)." },
        { t: "When to use LOOCV", d: "Worth its n model fits only on very small datasets where every row is precious; otherwise 5–10-fold is cheaper and usually a better trade-off." }
      ] }
    ]
  };
})();
