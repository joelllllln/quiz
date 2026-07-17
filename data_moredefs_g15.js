/* More core definitions (batch 15): feature selection, model selection, XGBoost,
   interpretability, class imbalance, extra evaluation metrics, regression, validation.
   Simple, central vocabulary each topic was still missing. DEFS-tagged with reveals.
   Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function def(qk, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1;
  }

  /* ===== Feature Selection (fsel1) — 7 ===== */

  def("fsel1",
    "What are the main benefits of selecting fewer features?",
    "Less overfitting, faster training and prediction, cheaper data collection, and clearer models.",
    ["Guaranteed higher accuracy, since fewer features always fit the data better.",
     "Automatic class balancing, since dropped features carry the imbalance.",
     "Immunity to data leakage, which only enters through extra features.",
     "Larger effective sample size, as rows are freed by removing columns."],
    "Why select features",
    "Every kept column costs something: noise for the model to overfit, milliseconds at inference, a pipeline to maintain, sometimes a licence fee. Selection trims all four at once.",
    "The accuracy story is a curve, not a slogan — dropping noise helps, dropping signal hurts — which is why selection is validated like any other modelling decision.",
    "Fewer columns: leaner, faster, cheaper, clearer.");

  def("fsel1",
    "In methods like SelectKBest, how should the number of features to keep be chosen?",
    "Treat k as a hyperparameter — tune it with cross-validation like any other setting.",
    ["Always keep exactly half of the original features, rounded down.",
     "Keep features until the training accuracy reaches one hundred percent.",
     "Use the number of classes as k, since they must correspond.",
     "Let the model choose at prediction time, varying k per example."],
    "How many features to keep (k as a hyperparameter)",
    "There is no universal right k: score a grid of values inside CV (the selector as a pipeline step) and read the validation curve — typically flat, then a cliff where signal starts being cut.",
    "The flat region is useful information in itself: it shows how much redundancy the data carries, and the curve's cliff marks the genuinely load-bearing features.",
    "Don't guess how many to keep — audition several k's and let validation vote.");

  def("fsel1",
    "What is the difference between feature selection and feature extraction?",
    "Selection keeps a subset of original columns; extraction builds new combined features like PCA components.",
    ["Selection is manual while extraction is always fully automated.",
     "Selection works on rows while extraction operates on columns.",
     "Extraction keeps more features than selection by definition.",
     "They are synonyms used by different research communities."],
    "Feature selection vs feature extraction",
    "Two routes to fewer dimensions: selection deletes (survivors keep their names and meanings); extraction transforms (components compress more but are blends).",
    "The choice is interpretability versus compression: a regulated credit model wants named survivors; a speed-hungry pipeline may prefer PCA's tighter squeeze.",
    "Prune the garden, or blend the smoothie.");

  def("fsel1",
    "What distinguishes univariate from multivariate feature selection?",
    "Univariate scores each feature alone; multivariate judges features in combination.",
    ["Univariate handles numeric features while multivariate handles categorical ones.",
     "Univariate requires labels while multivariate is fully unsupervised.",
     "Multivariate is the parallelised implementation of univariate scoring.",
     "They differ only in whether scores are normalised to [0, 1]."],
    "Univariate vs multivariate selection",
    "Univariate filters (correlation, chi-square, mutual information) are fast but blind to teamwork: two features useless alone can be decisive together, and redundant twins both score high.",
    "Multivariate methods (wrappers, RFE, L1) see interactions and redundancy at real compute cost — the axis along which the whole filter/wrapper/embedded taxonomy is organised.",
    "Judge soloists, or judge the band.");

  def("fsel1",
    "What role does domain knowledge play in feature selection?",
    "Expert judgement legitimately excludes nonsense and leak-prone features before any algorithm runs.",
    ["None; only data-driven criteria are scientifically valid for selection.",
     "It replaces validation, since experts already know the best subset.",
     "It applies only to medical data, where regulations require review.",
     "It is used to name the features that algorithms have selected."],
    "Domain-knowledge selection",
    "The cheapest, most reliable filter is a colleague saying 'that column is filled in after the outcome' (leakage) or 'that ID is arbitrary'. Algorithms rank what remains.",
    "Human-first selection catches what statistics can't: a leaky feature often looks maximally predictive, so the screen that removes it must operate on meaning, not scores.",
    "Ask someone who knows the data before asking the algorithm.");

  def("fsel1",
    "How does feature selection serve model interpretability?",
    "A model on 10 named features can be explained and audited far more easily than one on 500.",
    ["It doesn't; interpretability depends only on the algorithm chosen.",
     "Selected features are automatically documented by the pipeline.",
     "Fewer features guarantee the model becomes a white-box tree.",
     "It hides the unimportant features from auditors' view."],
    "Selection for interpretability",
    "Every explanation artefact — coefficient tables, importance plots, SHAP summaries — gets sharper as the feature list shrinks to things stakeholders recognise.",
    "In regulated settings this is often the binding constraint: a slightly weaker model on a short, defensible feature list beats a stronger one no committee can review.",
    "Ten understandable inputs beat five hundred mysterious ones.");

  def("fsel1",
    "Where does feature selection speed actually pay off in production?",
    "At every prediction, forever: fewer features to collect, compute, store and monitor per request.",
    ["Only during training; prediction cost is independent of feature count.",
     "Only in the cloud, where columns are billed individually.",
     "Nowhere measurable; modern hardware makes width free.",
     "Only for linear models, whose cost is exactly proportional to width."],
    "Speed benefits of selection",
    "Training happens occasionally; inference runs per user, per transaction. Halving the features halves the data each request must fetch, validate and transform — latency, cost and failure surface all shrink.",
    "Some features are also expensive at source (API calls, lab tests): selection that drops one paid-per-query column can fund the whole project — a benefit no accuracy metric displays.",
    "The savings compound on every single prediction the system ever makes.");

  /* ===== Model Selection (msel1) — 7 ===== */

  def("msel1",
    "What are candidate models in a model-selection process?",
    "The shortlist of algorithms and configurations being compared for the task.",
    ["The models that previous projects at the company have already deployed.",
     "Simplified versions of the final model used to speed up development.",
     "The cross-validation folds, each of which trains one candidate.",
     "Models published in papers on datasets similar to yours."],
    "Candidate models",
    "The explicit menu — logistic regression, a forest, XGBoost, each perhaps at several settings — that selection will score under identical conditions.",
    "Writing the menu down matters: a diverse shortlist (linear + tree + boosted) probes different assumptions about the data, and 'the winner' only means anything relative to who competed.",
    "The contenders you've entered into the bake-off.");

  def("msel1",
    "What makes a comparison between candidate models fair?",
    "Same data splits, same metric, same preprocessing — differing only in the model itself.",
    ["Giving each model the preprocessing that flatters it most individually.",
     "Evaluating each model on a different random split for independence.",
     "Allowing stronger models fewer tuning trials to level the field.",
     "Comparing each model's training accuracy on its own terms."],
    "Fair comparison (same folds, same metric)",
    "One variable at a time: identical CV folds (fix the seed or pass the splitter), identical scoring, preprocessing inside the pipeline — so score differences reflect models, not conditions.",
    "Sharing folds also pairs the scores (each model faces the same hard fold), sharpening comparisons exactly like a paired experiment — and it's one cross_validate call per candidate.",
    "Same course, same judges, same weather — then the best model wins on merit.");

  def("msel1",
    "Why start each candidate model at its default hyperparameters?",
    "Defaults are sensible baselines; they establish the ranking cheaply before any tuning budget is spent.",
    ["Defaults are guaranteed optimal for datasets under a million rows.",
     "Libraries penalise non-default settings with slower execution paths.",
     "Tuning before comparing is statistically invalid and must be avoided.",
     "Defaults must be reported to regulators before changes are allowed."],
    "Defaults first",
    "Library defaults encode maintainer experience and behave reasonably on most data. A default-settings pass over the shortlist reveals the landscape — often 90% of the final answer — for minutes of compute.",
    "It also sequences the work rationally: tune only the one or two leaders, since tuning rarely reverses a large default-performance gap between model families.",
    "See who's ahead in trainers before buying anyone racing shoes.");

  def("msel1",
    "When should you stop tuning hyperparameters?",
    "When validation gains fall within noise, or further gains aren't worth the compute and complexity.",
    ["When every combination in the full grid has been evaluated once.",
     "When training accuracy reaches one hundred percent exactly.",
     "After precisely one hundred trials, the statistical standard.",
     "Never; tuning must continue for as long as the project runs."],
    "When to stop tuning",
    "Tuning has sharply diminishing returns: the first coarse search finds the right region; subsequent refinement polishes decimals that fold-to-fold noise already exceeds.",
    "The stopping test is honest arithmetic — is the gain bigger than the noise band, and worth its GPU-hours? — plus the quiet risk that endless tuning starts overfitting the validation signal itself.",
    "Stop when you're polishing noise.");

  def("msel1",
    "After model selection concludes, what data does the chosen model get trained on?",
    "Everything available for training — train plus validation — before the final test evaluation.",
    ["Only the original training fold, to keep the comparison unchanged.",
     "The test set alone, since it is the cleanest available data.",
     "A fresh dataset that played no role in any earlier stage.",
     "Nothing; the fold model from selection is used as-is."],
    "Final training after selection",
    "Validation data's selecting job is done; withholding it from the final fit wastes labelled examples. Refit the winning configuration on train+validation, then touch the test set once.",
    "The sequence — select on splits, refit on all, report on test — is the standard endgame; GridSearchCV's refit does the middle step automatically.",
    "Once the vote is over, the winner trains on every ballot.");

  def("msel1",
    "What does the test set measure that the validation score cannot?",
    "Unbiased final performance — validation scores are inflated by having guided the selection.",
    ["The model's training speed under realistic production conditions.",
     "Nothing extra; it exists only to satisfy reporting conventions.",
     "Which features the final model weighted most heavily.",
     "The variance of the model across random initialisations."],
    "The test set's unique job",
    "The best validation score is a maximum over many tries — optimistically biased by construction. The test set, having influenced nothing, gives the one uncontaminated estimate.",
    "This is why 'touch it once' has teeth: the first peek spends its innocence, and every decision it influences afterwards converts it into another validation set.",
    "The one exam nobody got to study for.");

  def("msel1",
    "Why is 'best model' always relative to a dataset and metric, not absolute?",
    "Rankings flip across data and metrics — the choice of yardstick partly decides the winner.",
    ["Because licensing terms restrict which model may be called best.",
     "It isn't; benchmark leaderboards define the globally best models.",
     "Because the best model is whichever trained most recently.",
     "Because all models achieve equal accuracy given enough tuning."],
    "'Best' is task-relative",
    "XGBoost may top accuracy while logistic regression tops calibration and a smaller model tops latency; on the next dataset the order reshuffles — No Free Lunch made concrete.",
    "The practical discipline: fix the metric (and constraints like latency or explainability) before the bake-off, or the bake-off quietly optimises the wrong thing.",
    "Champions hold titles in a weight class, not in all of boxing.");

  /* ===== XGBoost (xgb1) — 7 ===== */

  def("xgb1",
    "Why did XGBoost become so dominant for tabular machine learning?",
    "Regularised, fast, scalable gradient boosting that wins accuracy benchmarks with modest tuning.",
    ["It is the only library able to train on datasets that contain text columns.",
     "Its models are the most interpretable, satisfying regulators everywhere.",
     "It guarantees the global optimum, which other libraries approximate.",
     "It was the first algorithm capable of multiclass classification."],
    "Why XGBoost is popular",
    "It industrialised boosting: built-in regularisation (lambda, gamma), parallel and cache-aware split finding, sparsity handling, early stopping — accuracy plus engineering in one package.",
    "Its Kaggle-era dominance made it the default strong baseline for structured data — the thing neural approaches are still measured against on tables.",
    "Boosting, but engineered to win — fast, regularised, battle-tested.");

  def("xgb1",
    "What is XGBoost's underlying model, stripped of the engineering?",
    "Gradient-boosted decision trees — a sequential ensemble where each tree corrects the running total.",
    ["A deep neural network whose layers are disguised as tree structures.",
     "A random forest with unusually aggressive bootstrap sampling.",
     "A single very deep tree grown with a specialised impurity measure.",
     "A kernel machine that uses trees only to approximate its kernel."],
    "Boosted trees under the hood",
    "Everything from the gradient-boosting chapter applies verbatim: additive model, residual-chasing rounds, shrinkage, early stopping — XGBoost adds second-order gradients and system speed.",
    "Seeing through the brand prevents siloed knowledge: intuitions about learning rate or round counts transfer to LightGBM, CatBoost and sklearn's HistGradientBoosting unchanged.",
    "Under the racing livery, it's the familiar relay of error-fixing trees.");

  def("xgb1",
    "For what kind of data is XGBoost typically the right first choice?",
    "Structured, tabular data — rows and columns of mixed numeric and categorical features.",
    ["Raw images, where its trees detect edges better than convolutions.",
     "Streaming audio, due to its native handling of waveforms.",
     "Small text corpora, where it parses grammar automatically.",
     "Any data type equally; it has no characteristic strength."],
    "Tabular-data strength",
    "On tables — churn, credit, pricing, fraud — boosted trees exploit sharp thresholds and interactions that neural nets must burn data to learn; on images/audio/text, deep learning's inductive biases win.",
    "'Tables → boosting first' is one of applied ML's most reliable routing rules, and knowing WHERE a tool is strong is half of model selection.",
    "Spreadsheet-shaped problems are its home turf.");

  def("xgb1",
    "Which three knobs form the core of everyday XGBoost tuning?",
    "Learning rate (eta), number of rounds (with early stopping), and tree depth.",
    ["The DMatrix cache size, thread count and histogram bin width.",
     "The random seed, the GPU flag and the verbosity level.",
     "The booster name, the objective string and the metric string.",
     "Feature names, label encoding and the missing-value marker."],
    "The three key knobs",
    "The capacity triangle: how big each step (eta), how many steps (n_estimators, best set by early stopping), how complex each step (max_depth). Most gains live here.",
    "Standard recipe: fix eta low-ish (0.05–0.1), let early stopping choose the rounds, tune depth — then refine with subsampling and penalties only if validation still asks.",
    "Step size, step count, step complexity — tune those first.");

  def("xgb1",
    "How does XGBoost compare with a random forest in behaviour and tuning?",
    "Boosting cuts bias sequentially and needs careful tuning; forests cut variance in parallel and barely need any.",
    ["They are identical in behaviour, differing only in training speed.",
     "Forests are strictly more accurate; XGBoost trades accuracy for speed.",
     "XGBoost is immune to overfitting while forests overfit readily.",
     "Forests need more hyperparameter tuning than boosting does."],
    "XGBoost vs random forest",
    "The two ensemble philosophies in production form: the forest is robust, parallel, near-tuning-free; boosting reaches higher ceilings but hands you a learning rate, round count and overfitting risk.",
    "A practical heuristic: forest for a quick strong baseline and noisy data; boosting when you'll invest tuning time for the extra points — and their disagreement is itself diagnostic.",
    "The forest is the reliable estate car; XGBoost is the faster machine that wants a driver.");

  def("xgb1",
    "What is the XGBClassifier / XGBRegressor interface?",
    "XGBoost's sklearn-compatible wrapper — fit/predict, pipelines and searches all work normally.",
    ["A web dashboard for monitoring training runs in the browser.",
     "A compatibility layer that converts XGBoost models into SQL.",
     "The distributed version of XGBoost for compute clusters.",
     "A deprecated interface kept only for legacy codebases."],
    "XGBClassifier (sklearn API)",
    "The estimator-style entry point: drop it into Pipelines, GridSearchCV and cross_val_score like any sklearn model, keeping XGBoost extras (early_stopping_rounds, eval_set) as fit parameters.",
    "It means the entire sklearn methodology you've learned — CV, pipelines, leak-safe preprocessing — applies unchanged to XGBoost; the native DMatrix API remains for power users.",
    "XGBoost wearing the standard sklearn uniform.");

  def("xgb1",
    "Summarised in one view, which XGBoost parameters fight overfitting?",
    "Lower eta, fewer/early-stopped rounds, shallower trees, min_child_weight, subsampling, and lambda/gamma penalties.",
    ["Only the random seed, which controls all regularisation internally.",
     "Raising eta and depth together, which cancels their individual risks.",
     "The thread count, since parallelism reduces memorisation.",
     "None; XGBoost's design makes overfitting impossible."],
    "Overfitting-control toolkit (XGBoost)",
    "Same four families as generic boosting — step size, step count, tree complexity, randomness — plus explicit penalties: lambda (L2 on leaf weights) and gamma (price per split).",
    "Organising the dozen-odd parameters into these five drawers turns an intimidating docs page into a checklist, and validation curves tell you which drawer to open.",
    "Smaller, fewer, simpler, randomer, penalised — pick your lever.");

  /* ===== Interpretability (interp) — 7 ===== */

  def("interp",
    "Why does model interpretability matter beyond curiosity?",
    "Trust, debugging, fairness auditing, regulatory compliance, and safe deployment all depend on it.",
    ["It is a purely academic concern with no impact on deployed systems.",
     "Interpretable models legally cannot make errors, reducing liability.",
     "It matters only for models with fewer than ten input features.",
     "Interpretability's only use is producing figures for papers."],
    "Why interpretability matters",
    "Explanations catch leakage before launch, expose bias in lending or hiring, satisfy regulators who demand reasons, and tell stakeholders when to trust — none of which accuracy alone provides.",
    "The need scales with stakes: a movie recommender can stay opaque; a parole or credit model cannot — which is why the field exists as more than aesthetics.",
    "You can't trust, fix or defend what you can't explain.");

  def("interp",
    "What is a black-box model?",
    "One whose internal logic isn't humanly followable — accurate perhaps, but opaque, like large ensembles.",
    ["A model whose source code is proprietary and cannot be licensed.",
     "Any model that runs on GPU hardware rather than ordinary CPUs.",
     "A model trained on confidential data that cannot be published.",
     "One that produces no probability estimates with its predictions."],
    "Black-box model",
    "You can read every weight of a 500-tree ensemble and still not 'see' why one prediction happened — distributed logic without a followable story. Contrast the white-box tree or small linear model.",
    "The black/white distinction sets up the field's two strategies: build interpretable models where stakes demand it, or wrap black boxes in post-hoc explainers (SHAP, LIME) where accuracy demands them.",
    "The answers come out; the reasoning stays inside the box.");

  def("interp",
    "What is the 'right to explanation' in the regulatory context?",
    "Rules like GDPR push toward individuals receiving meaningful reasons for automated decisions about them.",
    ["A researcher's right to inspect any published model's training data.",
     "The obligation to open-source every model used commercially.",
     "A patent-law doctrine covering machine learning algorithms.",
     "The right of models to refuse explanation requests."],
    "Right to explanation (regulation)",
    "Credit, employment and insurance decisions increasingly carry legal duties to justify automated outcomes to the person affected — 'the model said so' does not satisfy an adverse-action notice.",
    "This converts interpretability from a preference into a design requirement, driving real deployments toward intrinsically interpretable models or audited local-explanation tooling.",
    "'Why was I refused?' is becoming a question the system must answer.");

  def("interp",
    "How are explanations used for debugging a model?",
    "Importances and attributions expose nonsense — leaked features, spurious signals — before deployment.",
    ["They speed up training by identifying which epochs to skip.",
     "They automatically patch the model's weights when errors appear.",
     "They cannot help debugging, being post-hoc approximations.",
     "They compress the model by deleting unimportant neurons."],
    "Debugging with explanations",
    "A patient-ID topping the importance chart, a wolf classifier attending to snow, a churn model leaning on a post-outcome field — explanation tools catch these where test accuracy applauds them.",
    "This is interpretability's most immediate ROI: 'does the model's reasoning make sense?' finds the failures that only surface later as production incidents.",
    "The explanation is where the model confesses it's been cheating.");

  def("interp",
    "What does a local explanation of one prediction look like in practice?",
    "A per-feature breakdown for that case — e.g. 'income +0.3, missed payments −0.5' — summing to the decision.",
    ["The full list of every parameter the model holds, printed exactly as they stood at prediction time.",
     "A ranking of all of the training examples by how much overall influence each had on the fitted model.",
     "The model's accuracy measured on the subset of test cases that most resemble the one in question.",
     "A statement of which algorithm family produced the model, with its hyperparameter settings attached."],
    "Anatomy of a local explanation",
    "One case, itemised: each feature's push toward or away from the outcome (SHAP waterfall, LIME weights), grounding the abstract method in an artefact a case-worker can read aloud.",
    "This per-decision receipt is the unit regulators, complaint handlers and affected individuals actually consume — global importances answer a different (population-level) question.",
    "An itemised bill for a single verdict.");

  def("interp",
    "How can feature importances sanity-check a model against domain expectations?",
    "Experts review the ranking: expected drivers should rank high, and surprises demand investigation.",
    ["If the top feature explains under half the variance, the model is invalid.",
     "Importances are compared against a universal reference ranking.",
     "Sanity requires all features to have exactly equal importance.",
     "Importances cannot be compared with human expectations."],
    "Expectation-checking via importances",
    "A pricing model ignoring square footage, a medical model led by an admin code — mismatches between the learned ranking and expert priors are either discoveries or defects, and both deserve a look.",
    "This review is the cheapest form of model audit, and its two possible outcomes are both wins: confidence in the model, or a caught problem before deployment.",
    "Show the ranking to someone who knows the territory — raised eyebrows are data.");

  def("interp",
    "What is the supposed interpretability-accuracy trade-off, and is it absolute?",
    "Flexible opaque models often score higher, but on many tabular problems interpretable models tie — test, don't assume.",
    ["It is absolute: every gain in accuracy costs exactly that much clarity.",
     "It is reversed: interpretable models are always the most accurate.",
     "It applies only to unsupervised learning, never to classification.",
     "It concerns training speed, not predictive performance."],
    "Interpretability vs accuracy (a trade-off, sometimes)",
    "The gap is real on perception tasks, but on structured data well-engineered logistic regressions and small trees regularly match ensembles — and the Rashomon effect says accurate-AND-simple models often exist.",
    "The honest workflow prices the gap empirically: fit both, measure the accuracy difference, then decide whether it buys enough to justify opacity where explanations matter.",
    "Sometimes clarity is free — check the price before paying in opacity.");

  /* ===== Class Imbalance (imbal) — 7 ===== */

  def("imbal",
    "Why does plain accuracy mislead on imbalanced data?",
    "Predicting only the majority class scores high while achieving nothing on the class that matters.",
    ["Accuracy cannot be computed when class counts differ between splits.",
     "Minority examples are weighted double in the accuracy formula.",
     "Accuracy is only defined for perfectly balanced datasets.",
     "It doesn't mislead; accuracy is reliable at any imbalance."],
    "Why accuracy misleads under imbalance",
    "At 99:1, the do-nothing classifier scores 99% — the metric saturates on the easy majority and barely registers the minority performance you actually care about.",
    "This single observation motivates the whole topic: precision/recall, PR curves, balanced accuracy and MCC all exist to make the minority class count.",
    "A 99% score for catching zero frauds — that's the trap.");

  def("imbal",
    "How do you detect class imbalance in a dataset?",
    "Count the labels — value_counts on the target reveals the ratio immediately.",
    ["Train a model and check whether its accuracy exceeds ninety percent.",
     "Look for missing values, which occur mainly in minority rows.",
     "Compare the feature variances between the largest classes.",
     "It cannot be detected until after cross-validation completes."],
    "Spotting imbalance (count the labels)",
    "One line — y.value_counts() — before any modelling: the ratio dictates metric choice, split stratification, and whether resampling or weighting belongs in the plan.",
    "The point is sequencing: imbalance discovered after a suspiciously high accuracy has already wasted a modelling round; the count belongs in the first look at any dataset.",
    "Step one, always: count how many of each.");

  def("imbal",
    "Which application domains are inherently imbalanced?",
    "Fraud, disease screening, defect detection, churn, ad clicks — anywhere the event of interest is rare.",
    ["Handwriting recognition, where all digits occur equally often.",
     "Weather forecasting, since rain and sun alternate evenly.",
     "None; imbalance is always an artefact of bad data collection.",
     "Only medical data; commercial datasets are naturally balanced."],
    "Rare-event domains",
    "The interesting class is rare by nature: fraud per transaction, tumours per scan, failures per machine-day. Imbalance is the problem's shape, not a data-quality accident.",
    "Recognising this reframes the goal — you cannot 'fix' the imbalance away; you build models and metrics that function within it, which is what the whole toolkit serves.",
    "Needles are rare in haystacks — that's what makes them needles.");

  def("imbal",
    "Beyond resampling tricks, what is the most direct remedy for minority-class scarcity?",
    "Collect more real minority examples — genuine data beats synthetic wherever it's obtainable.",
    ["Delete majority examples until the dataset becomes perfectly balanced.",
     "Duplicate the test set's minority examples into the training data.",
     "Relabel some majority examples as minority to fill the gap.",
     "Train longer, which compensates for any amount of scarcity."],
    "More minority data (the direct fix)",
    "SMOTE interpolates what exists; targeted collection adds what doesn't — new fraud cases carry genuinely new patterns no resampler can invent. Sometimes it's cheap: mine history, buy labels, extend the window.",
    "The hierarchy is worth remembering — real data > reweighting > synthetic — with resampling as the fallback when the direct route is exhausted, not the reflex.",
    "Synthetic copies are a substitute; more real needles are the cure.");

  def("imbal",
    "Why is stratification especially important when splitting imbalanced data?",
    "Random splits can leave a fold with almost no minority examples, wrecking training or evaluation.",
    ["Stratification increases the minority class's size in every fold.",
     "It is required by sklearn, which rejects unstratified imbalanced splits.",
     "It converts the problem into a balanced one within each fold.",
     "It only matters for regression targets, not classification."],
    "Stratified splits under imbalance",
    "At 2% positives, an unlucky 20% test split can hold a handful of positives — recall computed on 6 cases is noise. Stratification pins the ratio in every split (StratifiedKFold, stratify=y).",
    "The rarer the class, the more binding the rule — for extreme rarity even stratified folds get thin, motivating repeated CV to stabilise the estimates.",
    "Make sure every slice of the cake contains its share of the cherries.");

  def("imbal",
    "Why must the test set never be resampled?",
    "It must mirror deployment reality — oversampling it inflates metrics into fiction.",
    ["Resampling the test set is fine and commonly done for stability.",
     "Because test rows are read-only in most storage systems.",
     "It may be undersampled but never oversampled, by convention.",
     "Because metrics libraries reject duplicated identifiers."],
    "Never resample the test set",
    "Balancing helps a model TRAIN; evaluation must face the true 99:1 world it will serve. A test set SMOTEd to 50:50 reports precision from a universe that doesn't exist.",
    "The rule is one edge of the wider law — resampling lives inside the training folds only (imblearn's Pipeline exists for exactly this) — and violating it is among the most common imbalance mistakes.",
    "Train in the gym however you like; the exam happens in the real world.");

  def("imbal",
    "What is the sensible order of remedies to try on an imbalanced problem?",
    "Right metrics first, then class weights, then threshold tuning, with resampling as the later resort.",
    ["Always SMOTE first, since synthetic balance fixes the metrics too.",
     "Start by discarding majority rows until accuracy becomes meaningful.",
     "Begin with focal loss, escalating to class weights only if it fails.",
     "The order is irrelevant; all remedies produce identical results."],
    "Imbalance playbook (order of remedies)",
    "Cheapest and least distorting first: score with PR-AUC/recall-at-precision, flip on class_weight='balanced', tune the threshold to the cost trade-off — three lines, no data surgery. Resample only if validation still demands it.",
    "The ordering respects both effort and risk (resampling adds leakage hazards and synthetic artefacts), and in practice weights-plus-threshold matches SMOTE surprisingly often.",
    "Measure right, weight, move the cutoff — surgery last.");

  /* ===== Extra Evaluation Metrics (evalx) — 6 ===== */

  def("evalx",
    "What governs the choice of evaluation metric for a task?",
    "The real-world costs and goals — which errors hurt, whether ranking, probability or label quality matters.",
    ["The library default, which encodes the statistically correct choice.",
     "Whichever metric produces the highest number for your model.",
     "Alphabetical order of the metrics implemented in the library.",
     "The metric used by the most-cited paper in the field."],
    "Choosing the right metric",
    "Metric choice is requirements engineering: screening wants recall at fixed false alarms, ad ranking wants AUC or NDCG, risk pricing wants calibration — each metric operationalises a different 'good'.",
    "It precedes modelling because it steers it: tuning optimises whatever you measure, so the wrong metric quietly builds the wrong model — the costliest silent error in applied ML.",
    "Decide what winning means before training anyone to win.");

  def("evalx",
    "What do ranking metrics (AUC, NDCG, MAP, MRR) have in common?",
    "They score the ordering of predictions rather than thresholded labels or probability values.",
    ["They all require the model to output calibrated probabilities.",
     "They apply only to search engines, never to classification.",
     "They are all bounded between minus one and plus one.",
     "They measure how quickly the ranking can be computed."],
    "The ranking-metric family",
    "One question — 'are the right items sorted toward the top?' — answered at different depths: AUC over all pairs, precision@k and MRR at the head of the list, NDCG with graded relevance.",
    "Grouping them clarifies applicability: whenever the product consumes an ordering (triage queues, search, recommendations), a ranking metric matches the deliverable and threshold metrics don't.",
    "All of them grade the sort order, not the yes/no calls.");

  def("evalx",
    "What do agreement metrics like Cohen's and Fleiss' kappa measure, as a family?",
    "Chance-corrected agreement between raters or ratings — how much accord exceeds coincidence.",
    ["The internal consistency of one model across bootstrap resamples.",
     "The fraction of examples on which all classes are predicted equally.",
     "Agreement between training and test distributions of features.",
     "The correlation between model confidence and human confidence."],
    "The agreement-metric family",
    "Raw agreement flatters — two random raters on a skewed task agree often by luck. Kappas subtract that luck, scoring only the accord that means something.",
    "In ML they audit the ground truth itself: low annotator kappa caps every model's measurable ceiling and warns that 'accuracy against these labels' has limited meaning.",
    "Do the judges really agree, or just coincide?");

  def("evalx",
    "What do probability-quality metrics like log loss and the Brier score assess?",
    "How good the predicted probabilities are — confidence honesty, not just which side of 0.5 they fall.",
    ["The numerical precision of the floating-point probability values.",
     "The share of predictions whose probability is exactly one half.",
     "The speed at which predict_proba executes per thousand rows.",
     "Whether probabilities are stored in log space internally."],
    "The probability-metric family",
    "Accuracy treats 0.51 and 0.99 identically; log loss and Brier punish being confidently wrong and reward honest uncertainty — proper scoring rules that incentivise truthful probabilities.",
    "They matter wherever probabilities are consumed as numbers (pricing, expected costs, triage) and pair with calibration curves: one number for quality, one picture for diagnosis.",
    "Not just right or wrong — was the confidence deserved?");

  def("evalx",
    "What splits threshold-dependent metrics from threshold-free ones?",
    "Precision/recall/F1 change with the cutoff; AUC-style metrics evaluate all cutoffs at once.",
    ["Threshold-free metrics work without labels, using features alone.",
     "Threshold-dependent metrics apply only to balanced datasets.",
     "The distinction concerns training-time versus test-time computation.",
     "Threshold-free metrics are those bounded between zero and one."],
    "Threshold-dependent vs threshold-free",
    "Report F1 and you've reported one operating point; report AUC and you've reported the whole curve with the operating decision deferred. Different claims, often confused.",
    "The distinction schedules evaluation: compare models threshold-free while exploring, then fix the threshold from costs and report the operating-point metrics that deployment will live at.",
    "One metric grades your chosen cutoff; the other grades every possible cutoff.");

  def("evalx",
    "Why do regression and classification need different metric families?",
    "Regression errors have sizes (how far off); classification errors have kinds (which confusion).",
    ["They don't; accuracy applies equally well to both problem types.",
     "Regression metrics exist only because targets can be negative.",
     "Classification metrics are newer and will replace regression ones.",
     "The difference is historical convention with no technical basis."],
    "Regression vs classification metrics",
    "'Off by £20 or £20,000?' is a magnitude question (MAE, RMSE, R²); 'false alarm or miss?' is a category question (precision, recall, cost matrices) — the error objects differ in kind.",
    "Mapping metric family to target type is the first fork in every evaluation decision, and it explains why discretising a regression target changes not just the model but the entire meaning of 'good'.",
    "Distance-wrong versus kind-of-wrong — different questions, different rulers.");

  /* ===== Regression & Boosting (regr) — 7 ===== */

  def("regr",
    "In a simple linear regression y = a·x + b, what are the slope and intercept?",
    "The slope a is the change in y per unit of x; the intercept b is y's value when x is zero.",
    ["The slope is the model's accuracy and the intercept its error rate.",
     "The slope counts the features while the intercept counts the rows.",
     "Both are properties of the data that exist before any model is fitted.",
     "The slope is always positive while the intercept is always negative."],
    "Slope and intercept",
    "The two learned numbers of the simplest model: 'each extra year adds £1,200 (slope); the baseline is £22,000 (intercept)'. In multiple regression, one slope per feature plus one intercept.",
    "Every linear model's interpretability flows from here — coefficients ARE slopes — and the intercept generalises to the bias term appearing throughout ML.",
    "How steep the line climbs, and where it starts.");

  def("regr",
    "What makes a line the 'best-fit' line through a scatter of points?",
    "It minimises the chosen total error — classically the sum of squared vertical distances to the points.",
    ["It passes through the greatest possible number of points exactly.",
     "It connects the leftmost point to the rightmost point directly.",
     "It has the steepest slope that stays inside the data's range.",
     "It divides the points into two groups of exactly equal size."],
    "The best-fit line",
    "'Best' is defined by a loss: OLS crowns the line whose squared residuals sum smallest — a definition, not a discovery, and other losses (absolute, Huber) crown different lines.",
    "Grasping that 'best' is loss-relative is the doorway to all of ML: change the definition of error and the optimal model changes with it.",
    "The line that owes the points the least total apology — as 'apology' is defined by the loss.");

  def("regr",
    "What does the sign of a residual tell you about a prediction?",
    "Positive: the model predicted too low; negative: too high (residual = actual − predicted).",
    ["Positive residuals mark predictions that used imputed feature values.",
     "The sign shows whether the example came from the training or test set.",
     "Positive means the prediction was correct within one standard error.",
     "The sign is arbitrary and carries no information about the error."],
    "Over- vs under-prediction (residual sign)",
    "actual − predicted > 0 means reality beat the forecast (under-prediction). Systematic sign patterns — always low for one region, one season — reveal bias no average error shows.",
    "Signed analysis is how residuals become diagnostics: a model that's 'accurate on average' may be +10% on weekends and −10% on weekdays, which matters and is fixable.",
    "Plus: it lowballed. Minus: it overshot.");

  def("regr",
    "Why is extrapolation beyond the training range dangerous for regression models?",
    "The fitted relationship is only evidenced inside the seen range — outside it, models guess by their own shape.",
    ["Because most libraries clip predictions to the training minimum and maximum.",
     "Extrapolation is safe for linear models and risky only for tree models.",
     "It is dangerous only when the features were standardised before fitting.",
     "It isn't; a good fit extends indefinitely in both directions."],
    "Extrapolation risk",
    "A line fitted on ages 20–60 says something at age 90 only by assumption; trees flatline outside the range; polynomials explode. The data never testified about out-there.",
    "Deployment discipline follows: know the training range, flag out-of-range inputs, and distrust forecasts far beyond observed history — a top silent failure in production regressors.",
    "The map ends where the data ended — beyond that, it's drawing, not knowing.");

  def("regr",
    "What is the predict-the-mean baseline in regression?",
    "Always predicting the training mean — the zero-skill floor that R² measures against.",
    ["Predicting each example's own true value, the perfect-skill ceiling.",
     "Predicting the median of the test targets after they are revealed.",
     "A model that predicts the mean of the features rather than the target.",
     "The strongest possible linear model, used as an upper reference."],
    "Predict-the-mean baseline",
    "The regression analogue of the majority-class baseline: constant output, no features consulted (DummyRegressor). Its RMSE equals the target's standard deviation.",
    "R² is literally 'improvement over this baseline' (R²=0 matches it, negative loses to it) — so the humble mean-guesser is silently present in every R² you've ever read.",
    "First ask: how wrong is just guessing the average?");

  def("regr",
    "Why plot the target against features before fitting any regression?",
    "The shapes reveal linearity, curvature, outliers and spread — dictating model and transform choices.",
    ["Plots are required by sklearn before regression estimators will fit.",
     "To verify the dataset contains more rows than it has columns.",
     "Plotting is decorative; summary statistics carry all information.",
     "To check that the target variable is perfectly normally distributed."],
    "Scatter-plot first",
    "Ten seconds of plotting shows what R² can't: a curve wanting a log transform, one leverage point about to own the slope, variance fanning out with size (heteroscedasticity).",
    "Anscombe's quartet is the canonical warning — four identical regression summaries, four wildly different pictures — look before you fit.",
    "Eyes before equations.");

  def("regr",
    "How do you choose between MAE and RMSE as a regression metric?",
    "RMSE punishes large errors disproportionately; MAE treats all sizes evenly — pick by how costly big misses are.",
    ["RMSE is reserved for large datasets and MAE for small ones, following a long-standing statistical convention.",
     "MAE applies only to strictly positive targets while RMSE handles targets that can take negative values.",
     "They always rank competing models identically on the same data, so the choice between them is purely cosmetic.",
     "RMSE has been deprecated by the major libraries and MAE is its officially recommended modern replacement."],
    "Choosing MAE vs RMSE",
    "Squaring makes one 10-unit miss cost as much as a hundred 1-unit misses: RMSE when catastrophic errors dominate the real cost, MAE when a miss is a miss (and robustness to outliers is wanted).",
    "The two can rank models differently on the same data, and the choice doubles back into training: optimising squared vs absolute loss fits the mean vs the median of y|x.",
    "Do big misses hurt extra? RMSE. All misses equal per unit? MAE.");

  /* ===== Validation (valid) — 7 ===== */

  def("valid",
    "What is the fundamental purpose of validation in machine learning?",
    "Estimating how a model will perform on data it has never seen, before real decisions rely on it.",
    ["Proving mathematically that the model's parameters are optimal.",
     "Checking that the code runs without exceptions on all inputs.",
     "Documenting the model for the benefit of future maintainers.",
     "Increasing the training set size through clever reuse of rows."],
    "Why validation exists",
    "Training scores measure memorisation; validation simulates the future by quarantining data the model never touched — the only honest preview of deployment.",
    "Every technique in the topic — splits, k-fold, stratification, time-aware schemes — is a refinement of this one simulation, each fixing a way the simple version can lie.",
    "A dress rehearsal in front of an audience the actor has never met.");

  def("valid",
    "What are typical train/test split proportions, and what governs the choice?",
    "Around 80/20 or 70/30 — balancing training data hunger against evaluation stability, with size context deciding.",
    ["Exactly 50/50 in every project, since the two halves must be statistically identical for the metrics to be valid.",
     "95/5 in all circumstances, because models always benefit from receiving the maximum possible training data.",
     "The proportions must match the golden ratio, which is what guarantees the performance estimate is unbiased.",
     "Any proportions work identically regardless of dataset size, so the choice never affects the estimate."],
    "Common split ratios",
    "The tension: rows in training make the model better; rows in test make the estimate steadier. 80/20 is the customary compromise; huge datasets can spare 1%, tiny ones should switch to cross-validation.",
    "Ratios are rules of thumb, not laws — the governing quantity is absolute counts (a 1,000-row test set is stable at any ratio; a 30-row one is noise at any ratio).",
    "Four parts to learn from, one part to grade with — adjusted by how much you have.");

  def("valid",
    "Why is data usually shuffled before a train/test split?",
    "Stored order often hides structure — sorted labels or dates — that would make the halves unrepresentative.",
    ["Shuffling increases the effective dataset size through reordering.",
     "Because sklearn refuses to split data that has not been shuffled.",
     "To guarantee both halves have identical means on every feature.",
     "Shuffling is cosmetic; the split's quality never depends on order."],
    "Shuffle before splitting",
    "A file sorted by class, region or time makes 'the last 20%' a biased sample (all one class, or all recent). Random shuffling restores exchangeability before cutting — train_test_split's default.",
    "The habit has one crucial exception (time series, where order IS meaning), which is why shuffle exists as an explicit, controllable parameter rather than magic.",
    "Cut a shuffled deck, not a sorted one.");

  def("valid",
    "In k-fold cross-validation, what exactly is a fold?",
    "One of the k equal parts — each takes one turn as the held-out set while the rest train.",
    ["One complete pass through the training data during optimisation.",
     "A duplicate copy of the dataset used to stabilise the estimates.",
     "The subset of features assigned to each parallel training job.",
     "A failed training run that is repeated with a fresh seed."],
    "What a fold is",
    "Cut the data into k slices; run k rounds, each holding out a different slice; every example trains k−1 times and is evaluated exactly once. The k scores' mean and spread are the output.",
    "Precision with the word pays off — fold (data slice) vs round (training run) vs epoch (optimisation pass) are distinct ideas that blur together in sloppy usage.",
    "One slice of the cake, and everyone's slice gets a turn as the judge.");

  def("valid",
    "What distinguishes the validation set's role from the test set's role?",
    "Validation guides development decisions repeatedly; the test set is touched once for the final verdict.",
    ["Validation contains synthetic rows while test contains only real ones.",
     "The validation set is always larger than the test set by convention.",
     "The test set trains the final model while validation never trains anything.",
     "Nothing; the terms are interchangeable across all of machine learning."],
    "Validation vs test set",
    "Both are held out, but their innocence differs: validation is consulted throughout (tuning, selection) and slowly absorbs your choices; the test set stays sealed until the end.",
    "The distinction exists because consulting a set biases it — the whole three-way split (and its CV variants) is bookkeeping to keep one estimate uncontaminated.",
    "One advisor you consult all along; one examiner you meet only once.");

  def("valid",
    "When is shuffling before a split exactly the wrong thing to do?",
    "With time-ordered data — shuffling leaks the future into training; split by time instead.",
    ["With small datasets, where shuffling wastes precious randomness.",
     "With categorical targets, which shuffling would re-encode.",
     "Never; shuffling is always beneficial regardless of structure.",
     "With standardised features, whose order encodes the scaling."],
    "When not to shuffle (time series)",
    "Forecasting tomorrow with a model trained on next week is fiction: temporal problems demand train-on-past, test-on-future (TimeSeriesSplit), preserving the arrow of time.",
    "The same logic extends to any 'future-shaped' dependency (versions, sessions) — the question to ask is always 'at prediction time, what would genuinely be known?'.",
    "You can't study for Monday's exam using Wednesday's newspaper.");

  def("valid",
    "Beyond time, what grouping structure commonly breaks naive random splits?",
    "Multiple rows per entity — patients, users, devices — which must stay on one side of the split.",
    ["Rows with many features, which need proportionally larger test sets.",
     "Rows with missing values, which random splits handle incorrectly.",
     "Alphabetical clusters of names, which shuffle poorly in practice.",
     "No other structure; randomness handles everything except time."],
    "Entity grouping (rows that travel together)",
    "Five visits from one patient split across train and test lets the model recognise the patient, not the disease — near-duplicate leakage through identity. GroupKFold keeps each entity whole.",
    "The generalisation question defines the split: 'new visits from known users' permits sharing; 'entirely new users' demands grouping — most production asks the second, stricter question.",
    "Keep each person's chapters in one book — don't let the model meet them twice.");

})();
