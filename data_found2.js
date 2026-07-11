/* ML Foundations — Part II: Practice. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).found2 = [

{
  q: "A pipeline computes the scaling statistics (means, standard deviations) on the FULL dataset, then splits into train and test. The test score comes out suspiciously good. What crime was committed?",
  choices: ["Data leakage — the test rows influenced the preprocessing, so 'unseen' data had already left fingerprints on the model", "Underfitting — the scaler was too simple", "Nothing — scaling is harmless before splitting", "Class imbalance", "The test set was too large"],
  explain: "Any statistic computed on all rows — scaling means, imputation values, vocabulary, selected features — carries information about the test rows into training. Individually tiny, collectively it inflates test scores that then evaporate in production, where genuinely-new data has left no fingerprints. Rule: split FIRST; fit every preprocessing step on training data only (Pipelines enforce this automatically).",
  simple: "The test set is supposed to be the future — and the future must not help prepare the past. Computing 'the average' over ALL rows means the test rows whispered their values into the model's preparation. Each whisper is tiny, but they add up to a test score that flatters. In real deployment nobody can whisper, and the score drops. Split first, then let every preparation step see only the training side.",
  widget: {
    type: "curveStatic", title: "The whispering test set",
    world: "The same pipeline built two ways — preprocessing fitted on everything vs on training data only — compared on the test score AND what actually happens in production.",
    xlab: "how much preprocessing touched the test rows →", xs: [0,1,2,3], labels: ["none (clean)","scaling only","+ imputation","+ feature selection"], dec: 1, yunit: "%",
    series: [
      { name: "reported test score", ys: [86, 87.5, 89, 93] },
      { name: "true production score", ys: [86, 86, 86, 86] }
    ],
    knob: { label: "Leakage amount", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Clean split: the test score and production agree at 86%. This is what an honest number looks like — the two curves touching.", tone: "info" },
      { max: 2, text: "Scaling and imputation fitted on all rows: the report drifts up to 89% while reality hasn't moved. The gap is pure leakage.", tone: "warn" },
      { max: 3, text: "🤯 Add feature selection done on the full data and the report says 93% for a model that still delivers 86. Leakage doesn't make models better — it makes MEASUREMENTS lie. Pipelines exist to make this crime structurally impossible.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Data leakage", formula: "split FIRST · fit all preprocessing on train only · Pipeline enforces it",
      text: "Also watch for target leakage (features that encode the answer, like 'refund issued' when predicting fraud) and temporal leakage (training on the future)." }
  }
},

{
  q: "Your churn model trains on data where only 3% of customers churned. It quickly learns to predict 'stays' for everyone and looks accurate. What is going on, and what are the standard countermeasures?",
  choices: ["Class imbalance: the rare class barely influences training — fix with class weights, resampling, and metrics that watch the minority", "The model is broken and must be replaced", "The data needs more columns", "Churners must be deleted for balance", "Accuracy proves the model is fine"],
  explain: "Most losses count every row equally, so 97 easy 'stays' outvote 3 hard 'churns' — ignoring the minority is the mathematically laziest way to score well. Countermeasures work at three levels: reweight the loss (class_weight='balanced'), rebalance the data (oversample minority / undersample majority / SMOTE), and — always — evaluate with precision/recall/PR-AUC on the minority rather than accuracy.",
  simple: "Imagine training a guard dog by showing it 97 friendly visitors for every 3 burglars — and rewarding it equally per correct call. The dog learns that waving everyone through is a 97% strategy. You don't fix this with a better dog; you fix the incentives: make each burglar 'count' as much as thirty visitors (weights), show burglars more often (resampling), and stop grading on overall politeness (accuracy) — grade on burglars caught (recall) and false accusations (precision).",
  widget: {
    type: "curveStatic", title: "Rebalancing the incentives",
    world: "The same model trained at increasing minority weight on the 3%-churn data. Watch what happens to churners caught, false alarms, and the now-useless accuracy.",
    xlab: "weight on each churner →", xs: [0,1,2,3,4], labels: ["1×","5×","10×","20×","50×"], dec: 0, yunit: "%",
    series: [
      { name: "churners caught (recall)", ys: [8, 42, 63, 79, 92] },
      { name: "flags that were right (precision)", ys: [85, 74, 62, 48, 30] },
      { name: "accuracy", ys: [97, 96, 95, 92, 85] }
    ],
    knob: { label: "Minority weight", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Weight 1×: accuracy 97%, churners caught 8%. The headline number is majestic; the business value is nearly zero.", tone: "warn" },
      { max: 2, text: "10×: two-thirds of churners caught at 62% precision — and accuracy DROPPED to 95%. The metric that fell was the one that was lying.", tone: "info" },
      { max: 4, text: "🤯 There is no free lunch along this slider — only a trade between missed churners and false alarms. The right point is a business decision (cost of each error), not a maths one. Imbalance isn't fixed; it's priced.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Class imbalance", formula: "reweight (class_weight) · resample (SMOTE etc.) · evaluate on the minority",
      text: "Never trust accuracy on imbalanced data. Precision, recall and PR curves (Topic 09) are the honest instruments." }
  }
},

{
  q: "A model finds that customers who buy ice cream churn less, so marketing proposes sending everyone free ice cream. What's the flaw in that leap?",
  choices: ["Correlation isn't causation — the model found that the two go TOGETHER (likely via a hidden common cause), not that one produces the other", "The sample of ice-cream buyers was too small", "Ice cream features should be scaled first", "The model needed more trees", "Churn cannot be predicted from behaviour"],
  explain: "Models learn associations: P(churn | features). That is exactly what prediction needs and says nothing about intervention: what happens if WE change a feature. Ice-cream buying likely proxies something (season, disposable income, app engagement) that drives both. Acting on a correlation as if it were a lever is the classic analytic failure; causal questions need experiments (A/B tests) or causal-inference methods, not better classifiers.",
  simple: "Umbrella sales predict traffic accidents beautifully — because rain causes both. Banning umbrellas won't make roads safer. Your model is a superb spotter of 'these things travel together'; it is silent on 'pulling this lever changes that outcome'. Prediction (who WILL churn) and intervention (what MAKES them stay) are different questions, and only the first one is answered by fitting a model to logs. The second needs an experiment.",
  widget: {
    type: "curveStatic", title: "The umbrella and the accident",
    world: "Ice-cream buying vs churn, sliced by the hidden common cause (app engagement). Watch the 'ice cream effect' evaporate once you compare like with like.",
    xlab: "customer group →", xs: [0,1,2,3], labels: ["all customers","low engagement","medium","high engagement"], dec: 0, yunit: "%",
    series: [
      { name: "churn: ice-cream buyers", ys: [8, 22, 11, 4] },
      { name: "churn: non-buyers", ys: [19, 23, 12, 4.5] }
    ],
    knob: { label: "Slice", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Pooled, the gap is dramatic: 8% vs 19% churn. This is the correlation the model found — real, useful for PREDICTION.", tone: "info" },
      { max: 2, text: "Slice by engagement and the gap nearly vanishes: within each engagement level, buyers and non-buyers churn alike. Engagement drives BOTH behaviours.", tone: "info" },
      { max: 3, text: "🤯 Among matched customers the ice-cream 'effect' is under 1 point. Free ice cream would change nothing except the budget. The model was never wrong — it answered 'who churns?', and got misread as 'what causes churn?'.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Correlation vs causation", formula: "models learn P(y|x), not the effect of CHANGING x",
      text: "Prediction: use the correlation freely. Intervention: run an A/B test or use causal methods. Confusing the two is the most expensive mistake in applied analytics." }
  }
},

{
  q: "Your model disappoints. One camp says 'we need more data'; another says 'we need a better model'. Which single plot settles the argument before anyone spends money?",
  choices: ["The learning curve — score vs training-set size: still-rising curves say buy data; converged-but-low curves say improve the model or features", "The ROC curve", "The confusion matrix", "A histogram of the labels", "The loss curve of the final model"],
  explain: "Train on growing fractions (10%, 25%, 50%, 100%) and plot train and validation scores vs size. If validation is still climbing at 100%, more data has visible headroom. If the curves have converged — train and validation close together and flat — more of the same data buys nothing: the model family (or the features) is the ceiling, and effort should go to capacity, features, or different data. Ten minutes of compute replaces a quarter of guesswork.",
  simple: "Before buying a bigger library for a student, check: are they still improving with every book (curve rising → more books help), or have they plateaued with books to spare (curve flat → books aren't the bottleneck; the study METHOD is)? The learning curve is that check for models. It converts 'I feel we need more data' into a readable picture with an actual answer.",
  widget: {
    type: "curveStatic", title: "Will more data help? Ask the curve",
    world: "Two projects' learning curves. Slide along the training-set size and diagnose each: one is data-starved, the other has hit its model ceiling.",
    xlab: "training rows used →", xs: [0,1,2,3,4], labels: ["1k","3k","10k","30k","100k"], dec: 0, yunit: "%",
    series: [
      { name: "project A: validation", ys: [71, 76, 81, 85, 88] },
      { name: "project B: validation", ys: [79, 82, 83, 83.5, 83.5] },
      { name: "project B: training", ys: [86, 85, 84.5, 84, 84] }
    ],
    knob: { label: "Training rows", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "At small sizes both projects improve with data — everything looks data-starved when data is tiny.", tone: "info" },
      { max: 3, text: "By 30k the stories split: A is still climbing (buy data!), while B's validation has flattened AND nearly touches its training score.", tone: "info" },
      { max: 4, text: "🤯 B's curves converged at ~84%: train ≈ validation ≈ flat. More rows of the same data cannot help — the model/features are the ceiling. A, meanwhile, gained 3 points in the last doubling and hasn't finished. Same complaint, opposite remedies, one plot.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Learning curves", formula: "rising validation → more data · converged low curves → better model/features",
      text: "sklearn: learning_curve(). Big train-validation gap on the same plot diagnoses overfitting; both-low diagnoses underfitting. One picture, three diagnoses." }
  }
},

{
  q: "A quarter of your 'age' column is missing. A teammate deletes every incomplete row; another fills the blanks with the column's median and moves on. What's the mature view of these options?",
  choices: ["Dropping rows burns data and biases the sample; imputation keeps rows but invents values — impute thoughtfully AND add a 'was missing' indicator, since missingness itself is often informative", "Deleting rows is always correct", "Median filling is always correct and complete", "Missing values should be replaced with zero", "Columns with any missing values must be discarded"],
  explain: "Rows rarely go missing at random — self-employed people skip income fields, sick patients miss checkups — so deletion doesn't just shrink the data, it WARPS it. Simple imputation (median/mode) preserves rows but flattens variance and can blur real patterns; model-based imputation (KNN/iterative) does better. The underrated move: a binary was_missing column, because the FACT of absence frequently predicts the target all by itself. And always fit imputers on training data only — imputation is preprocessing, and preprocessing leaks.",
  simple: "A blank on a form is not noise — it's often a message. Who leaves income blank? Not a random sample of people. So deleting incomplete rows quietly deletes a TYPE of customer, and your model never learns they exist. Filling blanks with the median keeps the row but pretends the message never happened. The craftsman's move does both jobs: fill the blank sensibly so the maths works, AND add a little flag saying 'this was blank' — letting the model read the message too.",
  widget: {
    type: "curveStatic", title: "The blank is a message",
    world: "The same model under four missing-data strategies, as missingness grows. Note which strategy degrades slowest — and why the indicator column earns its keep.",
    xlab: "share of rows with missing age →", xs: [0,1,2,3], labels: ["5%","15%","30%","50%"], dec: 0, yunit: "%",
    series: [
      { name: "impute + missing-indicator", ys: [88, 87, 86, 84] },
      { name: "median impute only", ys: [88, 86, 83, 79] },
      { name: "drop incomplete rows", ys: [87, 84, 77, 66] }
    ],
    knob: { label: "Missingness", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "At 5% missing, everything works — missing-data strategy barely matters when little is missing. This is where bad habits form.", tone: "info" },
      { max: 2, text: "At 30%, dropping rows has discarded a third of the data — and not a random third. The sample itself is now warped.", tone: "warn" },
      { max: 3, text: "🤯 At 50%, indicator+impute leads median-only by 5 points: it turned out customers who SKIP the age field churn differently — the blank itself was a feature. Deletion scored 66 by throwing that signal (and half the data) away.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Missing-value strategy", formula: "impute (fit on train!) + add was_missing indicator · drop rows only as a last resort",
      text: "sklearn: SimpleImputer(add_indicator=True), KNNImputer, IterativeImputer. Trees can often route blanks natively (Topic 04)." }
  }
},

{
  q: "Team A spends the sprint swapping algorithms: forest → boosting → neural net, gaining 0.4 points. Team B keeps logistic regression but crafts features: 'orders per month', 'days since last login', 'spend trend'. B gains 4 points. What general truth did B exploit?",
  choices: ["Feature engineering usually moves the needle more than model swapping — a model can only use the information you make reachable for it", "Neural networks always need more sprints", "Logistic regression is secretly the strongest model", "More algorithms should have been tried", "B got lucky and it won't repeat"],
  explain: "Models interpolate over the representation they're given. Raw logs bury the signal ('customer engagement') in dozens of columns; a crafted ratio or trend hands it over directly. The gap between a mediocre and excellent representation routinely dwarfs the gap between algorithms on tabular data — which is also why domain knowledge beats model zoo tourism, and why the biggest wins in Kaggle write-ups are usually features, not architectures.",
  simple: "A model is a reader, and features are the language the data is written in. Swapping readers (models) helps a little; translating the book into a language the reader actually speaks (features) helps enormously. 'Total spend' and 'account age' whisper about engagement; 'orders per month, trending down' says it out loud. Team B didn't find a smarter reader — they wrote a clearer book.",
  widget: {
    type: "curveStatic", title: "A clearer book beats a smarter reader",
    world: "The same churn problem attacked two ways: better models on raw features vs one plain model on progressively crafted features.",
    xlab: "effort spent →", xs: [0,1,2,3], labels: ["baseline","step 1","step 2","step 3"], dec: 0, yunit: "%",
    series: [
      { name: "plain model + feature work", ys: [82, 85, 87.5, 88.5] },
      { name: "fancier models, raw features", ys: [82, 82.6, 83, 83.2] }
    ],
    knob: { label: "Effort step", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 1, text: "First feature step (+3): 'orders per month' — a ratio no model could easily build from the raw columns — beats the entire model-swap program in one move.", tone: "info" },
      { max: 2, text: "The model-swapping curve crawls: every algorithm faces the same wall — the signal isn't REACHABLE in the raw representation.", tone: "info" },
      { max: 3, text: "🤯 Final score: features +6.5, model swaps +1.2. The order of operations for tabular ML: features first, then model choice, then tuning. Most teams do it exactly backwards.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Feature engineering", formula: "make the signal reachable: ratios, trends, aggregates, domain flags",
      text: "Ratios (spend/visit), recency (days since X), velocity (Δ per month), and domain flags routinely beat algorithm upgrades. Deep learning automates some of this for images/text; for tables, it's still your job." }
  }
}
];
