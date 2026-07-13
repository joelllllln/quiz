/* Study notes — Ensembles (Random Forests, Gradient Boosting, Stacking, XGBoost).
   Read-through revision, tiny chunks, in order. Grounded in the app's own content. */
(function () {
  window.NOTES = window.NOTES || {};

  window.NOTES["rf"] = {
    key: "rf", name: "Random Forests & Bagging",
    intro: "Grow many decorrelated decision trees on random samples, then pool their votes so their independent errors cancel out.",
    groups: [
      { h: "The idea", items: [
        { t: "Start from a tree", d: "A decision tree is a chain of yes/no threshold tests (income > 50k?) that send a row down branches to a leaf prediction." },
        { t: "The tree's flaw", d: "Grown deep, one tree fits almost anything but is unstable: nudge the data and its splits reshuffle. That is high variance." },
        { t: "What an ensemble is", d: "Many models combined into one prediction — a committee instead of a lone expert." },
        { t: "Why averaging helps", d: "Ensembles cure variance, not bias. Pooling many jumpy-but-unbiased trees steadies the answer without shifting it off-target." }
      ] },
      { h: "Bagging: the base recipe", items: [
        { t: "Bootstrap sample", d: "A new training set drawn from the original WITH replacement — same size, some rows repeated, about 37% left out." },
        { t: "Bagging in one line", d: "Bootstrap AGGregating: train one tree per bootstrap sample, then average (regression) or vote (classification) their outputs.", f: "bag = train on resamples → pool" },
        { t: "What it fixes", d: "Bagging targets the instability of single deep trees: independent errors partly cancel in the pool, so the crowd is calmer." }
      ] },
      { h: "From bagging to a forest", items: [
        { t: "The extra twist", d: "At every split each tree may only consider a RANDOM subset of the features, not all of them." },
        { t: "Why hide features", d: "Random rows alone leave trees too similar. Random features per split stops every tree chasing the same strong column." },
        { t: "Decorrelation", d: "Making trees genuinely different so their mistakes do not overlap — the real engine behind the forest's accuracy." },
        { t: "What a random forest is", d: "Many decorrelated deep trees, each on its own bootstrap sample with random per-split features, combined by vote or average." }
      ] },
      { h: "How it predicts", items: [
        { t: "Aggregating votes", d: "Classification takes a majority vote across trees; regression averages the trees' numbers.", f: "class → vote; number → mean" },
        { t: "The one condition", d: "Blending only beats a single model when members make DIFFERENT mistakes; five identical clones barely beat one." },
        { t: "Regressor shape", d: "Each tree is a staircase of flat steps; averaging 300 gives a smoother staircase, but it still cannot extrapolate past the training range." }
      ] },
      { h: "Knobs that matter", items: [
        { t: "n_estimators", d: "How many trees to grow. More trees only steady the vote; unlike a deeper single tree, adding trees never overfits." },
        { t: "max_features", d: "How many random features each split may weigh — the main diversity dial. sqrt(n) is the classification default.", f: "smaller → more diverse, weaker trees" },
        { t: "Tree depth", d: "Forests usually grow trees deep (low bias, high variance) on purpose, because the averaging cancels the variance." },
        { t: "ExtraTrees", d: "Extremely randomised trees pick split thresholds at RANDOM rather than searching the best — more randomness, faster, sometimes better." }
      ] },
      { h: "Reading the output", items: [
        { t: "OOB score", d: "Free validation: score each tree on the roughly 37% of rows its bootstrap missed. No separate test split needed." },
        { t: "Feature importance", d: "Impurity-reduction credit summed across all trees — a useful hint at which features drove splits." },
        { t: "Importance caveat", d: "It rewards splitting OPPORTUNITY: high-cardinality columns (IDs) win by sheer chances, not real signal." },
        { t: "The honest audit", d: "For any decision-relevant feature, use permutation importance on held-out data: shuffle it and see if accuracy actually drops." }
      ] },
      { h: "Strengths, limits, when to use", items: [
        { t: "Strengths", d: "Strong accuracy out of the box, few knobs to tune, resistant to overfitting, handles mixed features, gives OOB scores for free." },
        { t: "Weaknesses", d: "Slower and larger than one tree, less interpretable, cannot extrapolate beyond the training range in regression." },
        { t: "Forest vs boosting", d: "Random forest is the safe, low-tuning default; gradient boosting usually squeezes out higher accuracy but needs careful tuning." },
        { t: "When to reach for it", d: "A reliable first strong model on tabular data when you want good results without much tuning effort." }
      ] }
    ]
  };

  window.NOTES["gboost"] = {
    key: "gboost", name: "Gradient Boosting",
    intro: "Build trees one at a time, each new one fixing the errors left by the trees so far, taking small steps until the errors shrink.",
    groups: [
      { h: "The idea", items: [
        { t: "Ensemble, but sequential", d: "Like a forest it combines many trees, but boosting builds them in a relay, each correcting the last, not in parallel." },
        { t: "Weak learner", d: "A deliberately small model — usually a shallow tree of depth 3 to 6. Boosting's building block." },
        { t: "The overfitting gap", d: "The distance between training and test accuracy. Boosting's job is to close real error without widening this gap." }
      ] },
      { h: "How a round works", items: [
        { t: "Residual", d: "What is still wrong: actual minus predicted. Each new tree trains on these leftovers, not on the original labels.", f: "residual = actual − predicted" },
        { t: "One boosting round", d: "Measure the current errors, fit a small tree to them, add it to the ensemble. Repeat hundreds of times." },
        { t: "Why 'gradient'", d: "The residuals a tree fits are the negative GRADIENT of the loss, so boosting is gradient descent performed in function space." },
        { t: "Loss is a plug-in", d: "The loss is a swappable component: boosting works with any differentiable loss, and your choice defines what counts as error — squared error chases outliers, absolute error shrugs them off, Huber blends both." }
      ] },
      { h: "Boosting vs bagging", items: [
        { t: "The structural difference", d: "Bagging trains trees independently in parallel and averages; boosting trains them in sequence, each fixing the previous errors." },
        { t: "Opposite diseases", d: "Bagging cuts VARIANCE by averaging many strong deep trees; boosting cuts BIAS by adding many weak shallow ones." },
        { t: "Why weak learners here", d: "Each tree only needs to nudge the residual a little; deep trees would over-correct and the relay would chase noise fast." }
      ] },
      { h: "Knobs that matter", items: [
        { t: "Learning rate (shrinkage)", d: "How much of each new tree's correction is applied, e.g. 10%. Smaller steps need more rounds but land more precisely.", f: "F ← F + lr × tree" },
        { t: "Number of rounds", d: "How many trees. Unlike a forest, TOO many rounds overfits, so the count must be chosen, not maximised." },
        { t: "Tree depth", d: "Kept shallow (3 to 6) so each learner stays weak; depth interacts with the number of rounds you need." },
        { t: "Subsample", d: "Train each round's tree on a random fraction of rows (say 70%). This stochastic boosting adds bagging-style regularisation." }
      ] },
      { h: "Stopping and tuning", items: [
        { t: "Early stopping", d: "Watch validation error each round and stop when it stops improving — the honest way to pick the number of rounds." },
        { t: "The overfit signature", d: "If validation error rises while training error still falls, you have gone too far; stop at the validation low." },
        { t: "Rate–rounds trade", d: "Lower the learning rate and you must raise the round count to compensate; the two are tuned together." }
      ] },
      { h: "Explaining and trusting it", items: [
        { t: "Global importance", d: "Tells you which features mattered overall, but cannot say why one specific prediction came out as it did." },
        { t: "SHAP values", d: "Per-prediction attributions that fairly split each output among its features — answers 'why THIS applicant?' for a regulator." },
        { t: "Regularisation", d: "Penalties on tree size and leaf weights baked into the maths so each round resists chasing noise (the XGBoost angle)." }
      ] },
      { h: "Strengths, limits, when to use", items: [
        { t: "Strengths", d: "Often the highest accuracy on tabular data; flexible losses (quantile, Poisson, custom) all ride the same machinery." },
        { t: "Weaknesses", d: "Sensitive to tuning, can overfit if unchecked, trains sequentially so it is slower to fit than a forest." },
        { t: "Wrong tool when", d: "On very small tabular data (a few hundred rows) it overfits fast; simpler regularised models often win there." },
        { t: "The libraries", d: "XGBoost, LightGBM and CatBoost are industrial versions of this same idea, tuned for speed, categoricals or ubiquity." }
      ] }
    ]
  };

  window.NOTES["stacking"] = {
    key: "stacking", name: "Stacking & Voting",
    intro: "Combine several DIFFERENT trained models into one answer — by vote, by averaged probabilities, or by a learned meta-model on top.",
    groups: [
      { h: "The idea", items: [
        { t: "What an ensemble does", d: "Takes several trained models and combines their predictions into one final answer that beats any single member." },
        { t: "Base models", d: "The committee members — ideally DIFFERENT families (a tree, a linear model, a kNN) so they make different mistakes." },
        { t: "Diversity is the fuel", d: "Errors that do not overlap can cancel; clones agree on everything, including their mistakes, so they add nothing." },
        { t: "Where diversity comes from", d: "Strongest from different model FAMILIES, then different features or data, weakest from the same model with tweaked settings." }
      ] },
      { h: "Voting", items: [
        { t: "Hard voting", d: "Count the predicted labels; the majority wins. Simple, but throws away how confident each model was." },
        { t: "Soft voting", d: "Average the predicted PROBABILITIES; the highest average wins. One confident model can outweigh two lukewarm ones." },
        { t: "When they disagree", d: "If A says class 1 at 90% but B and C say class 0 at 55% and 60%, hard voting picks 0 (2 votes), soft voting picks 1 (higher mean)." },
        { t: "Weighted voting", d: "Give trusted models a larger say, so the final tally is a weighted count or weighted probability average rather than one-model-one-vote." },
        { t: "Averaging numbers", d: "For regression, an averaging ensemble simply takes the mean of the members' predicted numbers." }
      ] },
      { h: "Stacking", items: [
        { t: "The meta-model", d: "A small learned chairperson trained to combine the base models' outputs better than any fixed rule like plain averaging." },
        { t: "How it runs", d: "Base models each predict; those predictions become inputs to the meta-model, which outputs the final answer." },
        { t: "passthrough", d: "Optionally hand the meta-model the raw features alongside base predictions, so it can learn WHERE each base model is reliable." }
      ] },
      { h: "The leakage trap", items: [
        { t: "Out-of-fold predictions", d: "The meta-model's training data: each base model's predictions on rows it did NOT train on, collected via cross-validation." },
        { t: "Leakage defined", d: "The cardinal sin: letting the meta-model see predictions a base model made on its own training rows." },
        { t: "Why it is fatal", d: "On its own rows a memoriser looks perfect, so the meta-model just learns to trust the biggest overfitter, then fails in production." },
        { t: "Time-series caution", d: "With ordered data, shuffled CV leaks the future into the past; you must split by time to keep out-of-fold honest." }
      ] },
      { h: "Blending vs stacking", items: [
        { t: "Blending", d: "The quick version: base models predict on one held-out slice, and the meta-model trains on just that slice." },
        { t: "The distinction", d: "Both train a meta-model on base predictions; stacking uses cross-validated out-of-fold data, blending uses a single hold-out." },
        { t: "The trade", d: "Blending is simpler and leak-resistant but wastes data; stacking uses all data via folds but is fiddlier to wire correctly." }
      ] },
      { h: "Practical judgement", items: [
        { t: "Calibrate before soft voting", d: "Mixing a calibrated, an overconfident and an under-confident model skews the probability average; calibrate members first." },
        { t: "Deep stacks pay little", d: "Layer one earns most of the gain; extra layers add near-noise improvements while multiplying leakage risk, compute and fragility." },
        { t: "Is the gain worth it?", d: "A 1-point lift over your best single model can be worth it for a contest, rarely worth the complexity and latency in production." },
        { t: "Distillation", d: "To ship a heavy stack, train one small model to imitate the ensemble's outputs, keeping most of the gain at a fraction of the cost." }
      ] }
    ]
  };

  window.NOTES["xgb"] = {
    key: "xgb", name: "XGBoost",
    intro: "A fast, regularised gradient-boosting library that dominates tabular data by adding shallow trees with built-in overfitting controls.",
    groups: [
      { h: "The idea", items: [
        { t: "What XGBoost is", d: "An efficient, regularised implementation of gradient boosting: an ensemble of small trees added one at a time." },
        { t: "Boosting recap", d: "Build the model one small piece at a time, each new tree focused on fixing the mistakes the pieces so far still make." },
        { t: "What each tree predicts", d: "Not the label directly, but the gradient of the loss — the direction and size of nudge that reduces current error." },
        { t: "The 'regularized' part", d: "Penalties on tree complexity and leaf weights are baked into the objective, so trees resist chasing noise from the start." }
      ] },
      { h: "The objective", items: [
        { t: "Objective function", d: "What XGBoost minimises: a loss term (fit to data) plus a regularisation term (penalty on model complexity).", f: "obj = loss + Ω(complexity)" },
        { t: "Second-order (Hessian)", d: "XGBoost uses the loss's second derivative too, a Newton step that better estimates each leaf's weight and split gain." },
        { t: "Why regularise on top", d: "Plain boosting can memorise noise; the extra penalties trade a little training accuracy for much better generalisation." }
      ] },
      { h: "Core knobs", items: [
        { t: "Learning rate (eta)", d: "How much of each new tree's correction is applied. Smaller means slower, steadier learning that needs more trees.", f: "small eta → more rounds" },
        { t: "n_estimators", d: "The number of boosting rounds (trees). Too few underfits; too many overfits unless early stopping reins it in." },
        { t: "max_depth", d: "How deep each tree may grow. Shallow trees (3 to 6) stay weak and general; deeper trees fit more but overfit sooner." },
        { t: "Lower eta, then what", d: "When you drop eta (e.g. 0.3 to 0.03), raise n_estimators so the slower steps still reach a good fit." }
      ] },
      { h: "Regularisation knobs", items: [
        { t: "gamma (min_split_loss)", d: "A split must cut the loss by at least gamma or it is pruned; higher gamma keeps only clearly useful splits." },
        { t: "min_child_weight", d: "Requires enough instance weight in each leaf before splitting, stopping tiny leaves that fit a few noisy points." },
        { t: "reg_lambda (L2)", d: "L2 penalty on leaf weights: shrinks them smoothly toward zero, the standard smoothing regulariser." },
        { t: "reg_alpha (L1)", d: "L1 penalty on leaf weights: can push some to exactly zero, encouraging sparser, simpler trees." }
      ] },
      { h: "Randomness & speed", items: [
        { t: "subsample", d: "Fraction of rows drawn per tree (e.g. 0.8). Below 1.0 each tree sees a different slice, decorrelating trees and cutting overfitting." },
        { t: "colsample_bytree", d: "Fraction of feature columns sampled per tree, so no single dominant feature is used in every tree — forest-style decorrelation." },
        { t: "tree_method='hist'", d: "Bins each feature into buckets (say 256) and only considers bucket-edge splits, slashing candidate splits with little accuracy loss." },
        { t: "DMatrix", d: "XGBoost's own memory-efficient data container; loading features and labels into it lets training run much faster." }
      ] },
      { h: "Early stopping & imbalance", items: [
        { t: "Early stopping", d: "Watch a validation set each round and stop when it stops improving, so you never manually guess the tree count." },
        { t: "What it needs", d: "An eval/validation set plus early_stopping_rounds; set n_estimators high and let it halt at the validation low." },
        { t: "scale_pos_weight", d: "Up-weights the positive class for imbalanced data; a common start is the ratio of negatives to positives (about 99 for 1% fraud)." },
        { t: "Fraud first fix", d: "When the model predicts the majority class for everything, raising scale_pos_weight makes rare-class errors count more." }
      ] },
      { h: "Reading & judging", items: [
        { t: "gain importance", d: "Sums the loss improvement from every split using a feature — usually the most trustworthy 'which features matter' measure." },
        { t: "weight vs cover vs gain", d: "Weight counts how often a feature splits, cover counts rows those splits touch, gain sums their loss reduction; they can rank differently." },
        { t: "Importance caution", d: "A high-cardinality column like customer_id can top 'weight' by sheer split opportunities without carrying real signal." },
        { t: "Why it wins tabular", d: "Regularised boosting captures feature interactions and handles mixed, missing data; it learns default directions for missing values at each split." },
        { t: "Fighting overfitting", d: "No single knob: combine small eta plus early stopping, modest max_depth, row/column subsampling, and lambda/gamma penalties." }
      ] }
    ]
  };
})();
