/* Advanced Scikit-learn — Part III: Advanced Study. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).skl3 = [

{
  q: "You need a preprocessing step sklearn doesn't ship — capping outliers at the 1st/99th percentile, learned from training data. What's the contract for writing a custom transformer that works inside Pipelines and GridSearchCV?",
  choices: ["A class with fit(X, y=None) that LEARNS and stores state (the percentiles) returning self, and transform(X) that APPLIES it — inherit BaseEstimator + TransformerMixin for get_params/set_params and fit_transform for free", "A class with one process(X) method that both learns the 1st/99th percentiles and clips the data in a single call — Pipelines detect it by method name and invoke process() during both fit and predict, so no fit/transform split is needed", "A function decorated with @sklearn.transformer whose percentiles live in closure variables — GridSearchCV then tunes them through the decorator's auto-registered parameter list, so no class is ever needed", "A class exposing learn(X) and apply(X) registered via Pipeline.register_step, so GridSearchCV can discover the percentile bounds and search over them as ordinary hyperparameters", "Subclass Pipeline and override its _fit to splice in the capping step, stashing the percentiles on the Pipeline instance where every later step can read and reuse them"],
  explain: "The estimator contract is what makes the whole ecosystem composable: fit learns from TRAINING data only and stashes state on self (convention: trailing-underscore attributes like self.caps_), transform applies that stored state to any data — which is exactly how Pipelines prevent leakage (fit called on train folds, transform on validation folds, automatically). BaseEstimator supplies get_params/set_params so GridSearchCV can tune your __init__ arguments (e.g. percentile=…); TransformerMixin derives fit_transform. For stateless transforms, FunctionTransformer(np.log1p) skips the class entirely. Honour the contract and your ten-line class rides every sklearn tool ever written.",
  simple: "sklearn's magic is that every part speaks one language: 'fit' means LEARN from this data and remember what you learned; 'transform' means APPLY what you remember. Your outlier-capper learns the 1%/99% fences from training data in fit, stores them, and clips any future data to those SAME fences in transform — never re-learning fences from test data, which is precisely the leak Pipelines exist to prevent. Add two standard mixins and your little class inherits the whole ecosystem: grid-searchable, pipeline-able, clone-able. Ten lines of convention buys interoperability with a decade of tooling.",
  widget: {
    type: "curveStatic", title: "One contract, whole ecosystem",
    world: "The custom capper inside a Pipeline during 5-fold CV: where fit and transform each run, and what leaks if you cap on the full dataset instead (the naive one-liner).",
    xlab: "pipeline stage →", xs: [0,1,2,3], labels: ["fit on train fold","transform train","transform val fold","score"], dec: 2, yunit: "",
    series: [
      { name: "contract: val score honesty (gap to production)", ys: [0, 0, 0, 0.1 ] },
      { name: "naive full-data capping: hidden optimism", ys: [0, 0.4, 1.1, 1.8] }
    ],
    knob: { label: "Stage", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "fit runs ONLY on the training fold: the fences (1st/99th percentiles) are learned there and stored as self.caps_ — validation rows had no vote.", tone: "info" },
      { max: 2, text: "transform applies those frozen fences to the validation fold — exactly what production will do to tomorrow's data. The naive version re-computed fences on ALL rows: validation outliers shaped the fences that then tamed them.", tone: "warn" },
      { max: 3, text: "🤯 End result: the contract version's CV score matches production within 0.1; the naive one-liner is 1.8 optimistic — a silent leak with no error message, prevented ENTIRELY by the fit/transform separation. The contract isn't bureaucracy; it's the leak-proofing.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The estimator contract", formula: "fit: learn → self.state_ · transform: apply state · BaseEstimator + TransformerMixin",
      text: "Stateless case: FunctionTransformer(func). Validate with sklearn.utils.estimator_checks. The trailing underscore (caps_) is the 'fitted state' convention tools rely on." }
  }
},

{
  q: "One GridSearchCV can tune your model's C — and simultaneously WHICH scaler to use, and whether PCA is worth having at all. What syntax unlocks searching over the pipeline's structure itself?",
  choices: ["Named-step parameter paths like 'scaler': [StandardScaler(), RobustScaler()] and 'pca': [PCA(20), 'passthrough'] in the grid — steps are parameters too, and 'passthrough' deletes a step", "Prefix each value with the step name, like 'scaler__use': [True, False] and 'pca__enabled': [1, 0] — every step exposes a hidden boolean that GridSearchCV flips to include or drop it", "Pass structure='search' to GridSearchCV together with a list of candidate Pipelines, and it cross-validates each full architecture and returns the single highest-scoring one", "Set the grid value to 'drop' for any step and 'auto' for the estimator slot, letting GridSearchCV assemble the pipeline layout itself from whatever steps remain", "Use RandomizedSearchCV instead, since only random search can sample over whole estimator objects rather than plain numeric hyperparameter values"],
  explain: "Pipeline exposes everything through one namespace: 'stepname__param' reaches inside a step (svc__C), while the bare step name ('scaler') treats the ENTIRE step object as a categorical parameter — grid values are alternative estimators, and the string 'passthrough' means 'skip this step'. So one search can compare {StandardScaler vs RobustScaler} × {PCA-20 vs PCA-50 vs none} × {C grid}, with every combination cross-validated under identical fold discipline and the winner refit on all data. Use a list of dicts for conditional subspaces (e.g. gamma only when kernel='rbf'). This turns 'should we even have a PCA step?' from an argument into a measured cell in cv_results_.",
  simple: "Teams argue for days about 'should we scale with the robust one?' and 'does PCA help here?'. sklearn's answer: those aren't debates, they're grid cells. Because a Pipeline names each stage, the search grid can hold not just knob values but WHOLE ALTERNATIVE PARTS — try this scaler or that one, try PCA or the special part called 'passthrough' (a hole where the step used to be). The search then fairly cross-validates every configuration of parts and knobs together and hands you the winner. Architecture becomes data. The meeting becomes a lookup in cv_results_.",
  widget: {
    type: "curveStatic", title: "Architecture as grid cells",
    world: "One GridSearchCV over structure: six pipeline configurations from the same search, ranked by CV score. Each 'cell' is a different MACHINE, not just a different knob value.",
    xlab: "configuration →", xs: [0,1,2,3,4,5], labels: ["Std+PCA20","Std+PCA50","Std+none","Robust+PCA20","Robust+none","none+none"], dec: 1, yunit: "%",
    series: [
      { name: "CV accuracy", ys: [86.2, 87.9, 88.4, 86.0, 88.6, 79.1] },
      { name: "fit time (s ÷10)", ys: [1.8, 2.4, 3.1, 1.9, 3.2, 2.9] }
    ],
    knob: { label: "Configuration", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "PCA-20 vs PCA-50: +1.7 for keeping more components — this dataset wasn't as compressible as assumed. A guess replaced by a measurement.", tone: "info" },
      { max: 4, text: "The winner: RobustScaler + NO PCA (88.6) — 'passthrough' beat both PCA variants. The step someone fought to include was measurably costing accuracy. cv_results_ ends that meeting.", tone: "info" },
      { max: 5, text: "🤯 No scaler at all: 79.1 — nine points off a cliff, quantifying what the scaling debate was actually worth. One search, one fold discipline, every architecture question answered side by side. Stop arguing about structure; enumerate it.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Searching pipeline structure", formula: "grid = {'step': [EstA(), EstB(), 'passthrough'], 'step__param': [...]} — steps are parameters",
      text: "Lists of dicts give conditional spaces (kernel-specific params). Every architecture choice becomes a cross-validated, recorded, reviewable cell." }
  }
},

{
  q: "You joblib.dump a trained pipeline, and eight months later production upgrades Python and scikit-learn — the pickle now refuses to load (or worse, loads and behaves oddly). What's the honest model of sklearn persistence?",
  choices: ["Pickles are snapshots of code+state tied to library versions — pin versions and store metadata for the short term; for longevity or cross-platform serving, export to a neutral format like ONNX, and always keep the training pipeline reproducible", "joblib.dump embeds the exact sklearn, numpy and Python versions and silently re-installs them at load time, so any target environment reconstructs the original model automatically — pinning is unnecessary as long as the machine has internet access", "Pickles store only the fitted arrays and not code, so they load under any Python version; the real risk is numeric drift, fixed by re-running predict once after loading to warm the internal caches", "Export with model.to_json() as Keras does — sklearn serialises the full architecture and weights to a text format that any version parses safely without ever executing embedded code", "Persistence is inherently unsafe, so the only correct approach is to retrain from scratch on every deploy and never serialise a fitted estimator to disk at all"],
  explain: "A pickle serialises live objects whose layout belongs to specific sklearn/numpy/Python versions — upgrades can break loading loudly (ImportError) or, nastier, change behaviour silently; unpickling also EXECUTES embedded code, so it's a security boundary (load only trusted files). Sane practice: pin exact versions in the serving image; dump alongside the model a manifest (versions, git commit, training-data hash, metrics); treat the pickle as a cache whose ultimate backup is the ability to retrain reproducibly. For long-lived, polyglot or locked-down serving: skl2onnx exports the pipeline's MATH to ONNX — version-independent, fast runtimes, no arbitrary code execution. sklearn's own docs say exactly this.",
  simple: "A pickle isn't a saved model — it's a frozen memory of live Python objects, and it only thaws correctly in an aquarium with the same water: same library versions, same Python. Upgrade anything and the memory may refuse to wake, or wake subtly different (the scary case). So: pin the aquarium (exact versions in the serving image), label the jar (versions, code commit, data hash — so future-you can audit or retrain), and for anything that must outlive upgrades or run outside Python, export the model's pure mathematics to a neutral format like ONNX — numbers and operations, no frozen Python inside. And never thaw jars from strangers: unpickling runs code.",
  widget: {
    type: "curveStatic", title: "How models rot",
    world: "The same dumped pipeline meeting four serving environments over two years — under three persistence strategies. Scores are 'loads and serves correctly' probability.",
    xlab: "serving environment →", xs: [0,1,2,3], labels: ["same image (day 1)","minor lib bump (6 mo)","major upgrade (18 mo)","non-Python service"], dec: 0, yunit: "%",
    series: [
      { name: "ONNX export", ys: [100, 100, 100, 100] },
      { name: "pickle + pinned versions + manifest", ys: [100, 100, 95, 0] },
      { name: "bare joblib.dump", ys: [100, 70, 25, 0] }
    ],
    knob: { label: "Environment", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Day 1, same image: everything works — which is why persistence bugs are never caught at ship time. The rot is scheduled for later.", tone: "info" },
      { max: 2, text: "Major upgrade: the bare pickle mostly fails (25%) — and the scariest slice is the loads-but-differs case, where predictions silently drift with no exception thrown. Pinning holds until someone HAS to upgrade (CVE, EOL).", tone: "warn" },
      { max: 3, text: "🤯 The non-Python column: pickles score zero by definition — they ARE Python. ONNX serves everywhere at 100 because it exported the arithmetic, not the objects. Strategy in one line: pickle as a cache, manifest as the audit trail, reproducible training as the real artefact, ONNX when the model must outlive its aquarium.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Model persistence strategy", formula: "pin + manifest for pickles · reproducible retraining as ground truth · ONNX for longevity/polyglot",
      text: "Unpickling executes code — trusted sources only. skl2onnx covers most pipelines; test exported outputs match to tolerance before switching runtimes." }
  }
},

{
  q: "The training table is 40M rows and won't fit in memory. sklearn still handles it — via partial_fit and a streaming pattern. What does that pattern look like, and which estimators play?",
  choices: ["Read data in chunks and call partial_fit(chunk) repeatedly — supported by SGD models, MultinomialNB, MiniBatchKMeans, IncrementalPCA etc.; pair with stateless/hashing feature steps so preprocessing streams too", "Wrap fit() in a warm_start=True loop that feeds a fresh chunk each iteration — because every sklearn estimator honours warm_start, the model keeps refining across chunks without ever holding the whole table", "Load the table as a memory-mapped numpy array and call fit once — sklearn reads it lazily from disk, so any estimator including RandomForest trains without the data entering RAM", "Call fit(chunk) repeatedly; each call resumes from the previous weights automatically, so plain fit is already incremental for both linear models and forests", "Use Pipeline's stream=True flag with an ordinary fit and sklearn batches the rows through each step internally, supporting all estimators including trees and boosting"],
  explain: "partial_fit is sklearn's out-of-core contract: each call updates the model from one batch and forgets the batch — memory stays constant while data streams past (classifiers need classes=… on the first call). The supporting cast matters: HashingVectorizer (no vocabulary state), FunctionTransformer-style stateless transforms, or scalers pre-fitted on a sample — a stateful fit-on-everything step would break the stream. Members: SGDClassifier/Regressor (linear models via stochastic updates), MultinomialNB/BernoulliNB (count increments), MiniBatchKMeans, IncrementalPCA, PassiveAggressive. Note the gap: trees/forests/boosting have no exact incremental update — at 40M rows with trees, you subsample or leave sklearn (Spark, LightGBM's external loaders). Streaming is also WHY these models rule online/continual settings.",
  simple: "You don't need the whole river in a bucket — you need to learn from it as it flows. partial_fit is sklearn's paddle-wheel: show the model a chunk, it updates and forgets the chunk, memory never grows. The wheel only fits models whose learning is incremental by nature — nudge weights a little (SGD), add to counts (NB), shift centroids (MiniBatchKMeans). Watch the preprocessing too: a vocabulary-builder that must see all words first would dam the river — use hashing tricks that treat every chunk identically. And know the missing guest: trees can't sip; they need the lake. Choose the streaming family, and 40M rows becomes a for-loop.",
  widget: {
    type: "curveStatic", title: "Learning from the river",
    world: "SGDClassifier + HashingVectorizer streaming 40M rows: accuracy climbing per chunk, memory flat — against the in-memory alternative's memory wall.",
    xlab: "rows streamed →", xs: [0,1,2,3,4], labels: ["1M","5M","10M","20M","40M"], dec: 1, yunit: "",
    series: [
      { name: "streaming model accuracy (%)", ys: [84.1, 86.8, 87.9, 88.7, 89.2] },
      { name: "streaming memory (GB)", ys: [2, 2, 2, 2, 2] },
      { name: "in-memory fit: RAM needed (GB)", ys: [8, 40, 80, 160, 320] }
    ],
    knob: { label: "Rows streamed", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "5M rows in: accuracy 86.8 and climbing, memory pinned at 2GB — the model is a fixed-size set of weights; the data just flows past it.", tone: "info" },
      { max: 3, text: "20M rows: the in-memory approach now 'needs' 160GB — a hardware ticket. The stream is still at 2GB, still learning, on the same laptop.", tone: "info" },
      { max: 4, text: "🤯 Full 40M: 89.2% from a machine that never held 1% of the data at once. The catch worth remembering: this club admits only incrementally-updatable models — SGD-linear, NB, MiniBatchKMeans, IncrementalPCA. Trees need the lake; when you must have both, subsample or change engines.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Out-of-core learning (partial_fit)", formula: "for chunk in stream: model.partial_fit(chunk) — constant memory, one pass or many",
      text: "First classifier call needs classes=. Keep preprocessing stateless (HashingVectorizer, precomputed scalers). No partial_fit for trees/forests — that's a genuine boundary of the library." }
  }
},

{
  q: "After a ColumnTransformer one-hot-encodes 30 categoricals, your model trains on 900 anonymous columns — and the importance report is useless. What's the modern sklearn way to keep human-readable names flowing end to end?",
  choices: ["get_feature_names_out() propagates names through every step, and set_output(transform='pandas') makes transformers emit named DataFrames — so downstream importances map straight back to 'city=Paris', not 'x412'", "columns= metadata rides along inside the numpy arrays automatically, so every transformer's output keeps its labels — just read array.columns after each transform to recover 'city=Paris' rather than 'x412'", "Pass keep_names=True to ColumnTransformer and it forwards the original 30 labels unchanged, so every one-hot column inherits its parent's name and importances group back to 'city'", "Call inverse_transform on the importance vector to project the 900 anonymous weights back onto the 30 named columns, summing each group into one human-readable score", "Fit the model on a pandas DataFrame and sklearn preserves df.columns throughout, so feature_importances_ comes out automatically indexed by the original names"],
  explain: "Every modern transformer implements get_feature_names_out(input_names) — OneHotEncoder emits 'city_Paris', PolynomialFeatures emits 'age income', and Pipeline/ColumnTransformer COMPOSE these across steps, so pipeline[:-1].get_feature_names_out() names the exact 900 columns your model consumed. Since 1.2, set_output(transform='pandas') goes further: transforms return DataFrames with those names attached, so a feature_importances_ or permutation_importance report zips directly to labels a stakeholder can read. It also hardens correctness: joins by name rather than position catch column-order bugs that silent NumPy arrays let through. Interpretability infrastructure, two method calls.",
  simple: "Your pipeline is a factory that turns 30 labelled ingredients into 900 processed parts — and by default the parts come out with serial numbers instead of labels. Then someone asks 'which ingredient mattered?' and the answer is 'x412': useless. sklearn now threads the labels through the machines: each step can report what it renamed things to ('city' became 'city_Paris', 'city_Tokyo'…), chains included, and you can ask the whole factory for its final parts list. Flip one switch and steps even hand each other labelled DataFrames instead of anonymous grids — so the importance chart at the end speaks human. Interpretability starts with knowing what the columns ARE.",
  widget: {
    type: "curveStatic", title: "From x412 to city=Paris",
    world: "The same trained pipeline's top-importance report, at three levels of name plumbing — measured by how actionable the report is for a domain reviewer (audit-panel scoring).",
    xlab: "name plumbing →", xs: [0,1,2], labels: ["raw arrays (x412…)","get_feature_names_out","set_output('pandas') end-to-end"], dec: 0, yunit: "",
    series: [
      { name: "report actionability (0–100)", ys: [15, 78, 95] },
      { name: "column-order bugs caught in review", ys: [0, 1, 3] }
    ],
    knob: { label: "Plumbing level", min: 0, max: 2, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Raw arrays: the top feature is 'x412'. The data scientist spends an afternoon reverse-engineering transformer output orders to discover it means city=Paris. Every audit repeats this archaeology.", tone: "warn" },
      { max: 1, text: "get_feature_names_out on the preprocessing stub: importances now read 'city_Paris: 0.14, days_since_login: 0.11' — the review meeting can actually happen.", tone: "info" },
      { max: 2, text: "🤯 Full pandas output: named frames flow BETWEEN steps too — and the review caught three latent bugs where code had relied on column POSITION (a reordered ColumnTransformer would have silently swapped features). Names aren't cosmetics; they're assertions checked at every join.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Feature-name propagation", formula: "get_feature_names_out() composes through Pipeline/ColumnTransformer · set_output(transform='pandas')",
      text: "pipeline[:-1].get_feature_names_out() names exactly what the model saw. Pair with permutation_importance for reports stakeholders can act on." }
  }
},

{
  q: "Rows belong to 500 patients, several rows each, and you also want honest hyperparameter tuning. Assemble the correct sklearn evaluation: which splitter, and where does it go?",
  choices: ["GroupKFold (via the groups= argument) so a patient never straddles train/validation — passed to BOTH the outer evaluation and the inner GridSearchCV's cv; shuffled KFold here would leak patients and flatter every score", "StratifiedKFold on patient_id as the label so each fold holds a balanced mix of patients — passed to both loops; because stratification keeps every patient's rows proportional, no single patient can dominate a fold", "GroupKFold in the outer loop only, with a plain shuffled KFold inside GridSearchCV — the outer group split already guarantees honesty, so the inner tuning split can stay simple without leaking patients", "GroupShuffleSplit for the outer loop and cross_val_predict inside the search — since cross_val_predict never scores a row on a model that trained on it, patient leakage in the inner tuning is impossible", "LeaveOneGroupOut for both loops so each patient is held out exactly once — the most rigorous design, and because folds equal patients it needs no groups= argument passed to fit at all"],
  explain: "The unit of generalisation is the PATIENT (deployment = new patients), so the split must move whole patients: GroupKFold/StratifiedGroupKFold with groups=patient_id. The subtle half: tuning inside must obey the same law — GridSearchCV(cv=GroupKFold(5)) and, critically, .fit(X, y, groups=…) so the groups reach the inner splitter; otherwise hyperparameters get chosen by leaky inner scores even when the outer loop is clean (the winning config is typically an overfit-friendly one, e.g. huge k or depth, that exploited sibling rows). Same pattern family: TimeSeriesSplit for temporal units, StratifiedGroupKFold when classes are rare. Splitter choice is a statement about WHAT a 'new case' is — sklearn just enforces whatever you declare.",
  simple: "Your model will meet NEW PATIENTS, so its exams must consist of new patients — if Mrs Alvarez's Monday visit is in the training set and her Thursday visit in the test set, the model is being graded on recognising Mrs Alvarez, not on medicine. GroupKFold moves people, not rows, across the exam boundary. And the trap everyone falls into once: the INNER contest that picks hyperparameters must follow the same rule — passed its own group-aware splitter AND the group labels — or the settings themselves get chosen for their skill at exploiting familiar patients. Declare what 'new' means; make every loop, inner and outer, honour it.",
  widget: {
    type: "curveStatic", title: "New rows are not new patients",
    world: "The same tuned pipeline evaluated four ways, against its true new-patient performance. Watch the score deflate as each loop learns what 'new' really means.",
    xlab: "evaluation design →", xs: [0,1,2,3], labels: ["KFold everywhere","GroupKFold outer only","GroupKFold both loops","truth (new patients)"], dec: 1, yunit: "%",
    series: [
      { name: "reported score", ys: [91.4, 87.9, 84.6, 84.2] },
      { name: "chosen k (inner search's pick)", ys: [3, 3, 11, 11] }
    ],
    knob: { label: "Design", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Shuffled KFold everywhere: 91.4 — seven points of patient-recognition dressed as medicine. Note the inner search chose k=3: small k is EXCELLENT at spotting a sibling row nearby.", tone: "warn" },
      { max: 1, text: "Fixing only the outer loop: 87.9 — still inflated, because the inner leak chose leak-loving hyperparameters (k=3 again), and the outer loop faithfully measures that flawed choice.", tone: "info" },
      { max: 3, text: "🤯 Groups in BOTH loops: the inner search now prefers k=11 (real generalisation) and the report reads 84.6 vs truth 84.2. The 7-point gap wasn't a bug anywhere — it was a wrong DEFINITION of 'new case', propagated through every loop that wasn't told otherwise.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Group-aware evaluation, end to end", formula: "GroupKFold in outer AND inner cv · fit(..., groups=ids) so the labels reach both",
      text: "Deployment defines the unit: patients → GroupKFold, time → TimeSeriesSplit, both rare-class and grouped → StratifiedGroupKFold. Every loop that splits data must know." }
  }
}
];
