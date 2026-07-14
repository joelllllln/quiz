/* Feature Selection — full topic (3 levels) + primer. choices[0] always correct (shuffled at render). */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  window.PRIMERS = window.PRIMERS || {};
  window.PRIMERS.fsel = { terms: [
    { t: "Feature", d: "One input column the model reads — a fact you know at prediction time, like age, price, or word count." },
    { t: "Target", d: "The answer column you want to predict. Features are judged by how much they help predict this." },
    { t: "Feature selection", d: "Keeping a useful SUBSET of the columns and throwing the rest away, before or during training." },
    { t: "Relevant feature", d: "A column that genuinely carries information about the target — knowing it changes your best guess." },
    { t: "Redundant feature", d: "A column that IS relevant but just repeats what another kept column already tells you — no new information." },
    { t: "Overfitting", d: "When a model memorises quirks of the training data and does worse on new data. Extra useless columns make this worse." },
    { t: "Cross-validation", d: "Splitting data into folds, training on some and testing on the rest, to estimate honest performance on unseen data." },
    { t: "Dimensionality", d: "The number of feature columns. More dimensions means data spreads thin, which is the 'curse of dimensionality'." }
  ]};
  function def(qk,o){ (Q[qk]=Q[qk]||[]).push(o); D[o.q]=1; }
  function q(qk,o){ (Q[qk]=Q[qk]||[]).push(o); }

  /* ============================ fsel1 — Part I · Foundations (15) ============================ */

  def("fsel1", {
    q:"What is feature selection?",
    choices:[
      "Choosing a useful subset of the input columns to keep, and discarding the rest, before or during training",
      "Creating brand-new columns by combining, multiplying, or transforming the existing ones into engineered inputs",
      "Rescaling every column to the same 0-to-1 range so no single column dominates just because of its measurement units",
      "Splitting the rows of the dataset into a training portion and a separate held-out test portion for final scoring",
      "Filling in the missing values within a column by substituting the average computed from all of the other rows"
    ],
    explain:"Feature selection is about columns: you pick a subset of the available features to feed the model and drop the rest. It is different from feature engineering (which creates new columns) and from scaling (which changes a column's units). The goal is a smaller, cleaner input that trains faster, overfits less, and is easier to explain.",
    simple:"Feature selection is picking which input columns to keep and which to throw away. You want the handful that actually help and none of the clutter.",
    widget:{ type:"curveStatic", title:"Fewer, better columns", world:"Keep more features and watch validation accuracy rise, peak, then slip as junk gets added.", xlab:"features kept →", xs:[0,1,2,3,4], labels:["2","5","10","20","50"], dec:0, yunit:"%",
      series:[{ name:"validation accuracy (%)", ys:[70,82,88,86,80] }],
      knob:{ label:"Features kept", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"With only 2 features the model is starved of information and sits at 70%.", tone:"info" },
        { max:3, text:"Around 10 well-chosen features it peaks near 88% — that's the sweet spot.", tone:"info" },
        { max:4, text:"🤯 Cramming in 50 columns DROPS accuracy to 80% — the extra ones are noise the model overfits.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Feature selection", formula:"best subset > all features", text:"A carefully chosen subset usually beats keeping every column." } }
  });

  q("fsel1", {
    q:"Why bother REMOVING features instead of just keeping every column you have?",
    choices:[
      "Fewer, well-chosen features reduce overfitting, cut compute cost, and make the model easier to interpret",
      "More features always help accuracy, so you should only ever remove a column when it happens to contain missing values",
      "Removing features is mathematically guaranteed to raise the accuracy you measure on the training data you already collected",
      "The only genuine reason to drop columns is to save disk space when storing the raw dataset on a server somewhere",
      "Dropping features conveniently removes any need to ever perform a train/test split on the data afterwards at all"
    ],
    explain:"Extra columns are not free: irrelevant ones give the model more ways to latch onto noise (overfitting), they slow training and prediction, and they clutter any explanation of what the model does. In high dimensions data also becomes sparse, which hurts many algorithms. A lean feature set generalises better and is cheaper to run.",
    simple:"Useless columns give the model junk to memorise, cost time, and make it harder to understand. Cutting them usually helps on new data.",
    widget:{ type:"curveStatic", title:"Junk columns hurt", world:"Add purely useless random columns and watch accuracy on new data slide.", xlab:"junk features added →", xs:[0,1,2,3,4], labels:["0","10","50","200","1000"], dec:0, yunit:"%",
      series:[{ name:"validation accuracy (%)", ys:[88,86,82,74,63] }],
      knob:{ label:"Junk added", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"A handful of junk columns barely dents accuracy — the model mostly ignores them.", tone:"info" },
        { max:3, text:"By 200 junk columns accuracy has fallen to 74%; the noise is now crowding out signal.", tone:"info" },
        { max:4, text:"🤯 With 1000 useless columns accuracy crashes to 63% — the model overfits pure noise.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Why select", formula:"less noise = less overfit", text:"Removing irrelevant columns curbs overfitting and speeds everything up." } }
  });

  def("fsel1", {
    q:"What is a FILTER method for feature selection?",
    choices:[
      "It scores each feature with a quick statistic (like correlation with the target) independently of any model, then keeps the top scorers",
      "It trains and re-trains a fresh model on many different candidate feature subsets and keeps whichever subset the model happens to score best on",
      "It lets one model select its own features automatically as a built-in side effect of its ordinary training procedure, with no separate step",
      "It removes any ROW whose values look like statistical outliers before the model is ever allowed to see or train on the data at all",
      "It smooths each column out with a rolling moving average in order to filter measurement noise out of the raw sensor readings first"
    ],
    explain:"Filter methods rank features using a cheap statistic — correlation, a chi-squared score, mutual information — computed once, without training a model. You then keep the highest-ranked features. Because no model is trained during selection, filters are very fast, but they judge each feature in isolation and can miss features that only help in combination.",
    simple:"A filter method gives each column a quick score against the target and keeps the best-scoring ones. It's fast because no model is trained to decide.",
    widget:{ type:"curveStatic", title:"Score, then keep the top", world:"Features sorted by their filter score — pick a cutoff and keep everything above it.", xlab:"feature rank →", xs:[0,1,2,3,4], labels:["#1","#5","#10","#20","#50"], dec:2, yunit:"",
      series:[{ name:"filter score (corr with target)", ys:[0.85,0.55,0.35,0.12,0.02] }],
      knob:{ label:"Rank", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"The #1 feature scores 0.85 — strongly related to the target and an easy keep.", tone:"info" },
        { max:3, text:"By rank #20 the score is only 0.12; these features barely relate to the target.", tone:"info" },
        { max:4, text:"🤯 Rank #50 scores 0.02 — essentially noise, computed in a flash without ever training a model.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Filter method", formula:"rank by cheap statistic, keep top", text:"Filters score features once, fast, with no model in the loop." } }
  });

  def("fsel1", {
    q:"What is a WRAPPER method for feature selection?",
    choices:[
      "It repeatedly trains a model on different feature subsets and keeps the subset that gives the best validation score",
      "It scores each feature just once with a cheap statistic and never actually trains any model at all during the selection step",
      "It relies entirely on a single model's own built-in training penalty to shrink the useless features away automatically as it fits",
      "It wraps every feature inside a standard scaler so that all of the columns end up sharing exactly the same numeric range",
      "It selects the rows rather than the columns by wrapping the outlier records out of the dataset before any training begins"
    ],
    explain:"Wrapper methods treat selection as a search over feature subsets, using the actual model's validation performance as the score for each candidate subset. Because they train the model many times, they capture how features work together and often find strong subsets — but they are slow and can overfit the search itself. Forward selection and RFE are common wrappers.",
    simple:"A wrapper method tries out different sets of columns by actually training the model on each set and keeping whichever set scores best. It's smarter but much slower than a filter.",
    widget:{ type:"curveStatic", title:"Greedily add the best feature", world:"Forward selection adds one feature at a time, always the one that helps validation most.", xlab:"features selected →", xs:[0,1,2,3,4], labels:["1","2","3","5","8"], dec:0, yunit:"%",
      series:[{ name:"validation accuracy (%)", ys:[68,80,86,88,88] }],
      knob:{ label:"Features chosen", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"The single best feature alone already reaches 68%.", tone:"info" },
        { max:3, text:"Adding the next best each round climbs to 88% by feature 5 — the model is retrained every step.", tone:"info" },
        { max:4, text:"🤯 Feature 8 adds nothing more; the wrapper found a strong subset by testing the real model repeatedly.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Wrapper method", formula:"search subsets, score with the model", text:"Wrappers train the model on many subsets — accurate but expensive." } }
  });

  def("fsel1", {
    q:"What is an EMBEDDED method for feature selection?",
    choices:[
      "Selection happens automatically DURING a single model's training, as part of how that model fits",
      "Selection is carried out with a cheap statistic that is computed just once before any model has been trained at all",
      "Selection requires training the very same model many separate times, each run on a different candidate feature subset",
      "Selection is delegated entirely to a human domain expert who hand-picks the columns by intuition before any modelling starts",
      "Selection means embedding the raw categorical text columns as dense numeric vectors that the network can read directly"
    ],
    explain:"Embedded methods build selection into the training process itself. Lasso (L1) regression shrinks weak coefficients to exactly zero as it fits; tree ensembles produce feature importances as they grow. You get selection almost for free with one training run — a middle ground between fast filters and expensive wrappers.",
    simple:"An embedded method picks features while it trains, as a natural part of fitting one model. You get selection and a model together in a single run.",
    widget:{ type:"curveStatic", title:"Selection while it trains", world:"As one L1 model trains, weak features' weights shrink toward zero and drop out.", xlab:"training progress →", xs:[0,1,2,3,4], labels:["start","10","50","100","200"], dec:0, yunit:"",
      series:[{ name:"active (nonzero) features", ys:[50,42,30,18,12] }],
      knob:{ label:"Training steps", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"At the start all 50 features are active — nothing has been pruned yet.", tone:"info" },
        { max:3, text:"By step 100 the penalty has zeroed out the weakest, leaving 18 active features.", tone:"info" },
        { max:4, text:"🤯 One training run both fits the model AND settles on 12 features — no separate selection step needed.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Embedded method", formula:"fit and select in one run", text:"Embedded methods select features as a side effect of training." } }
  });

  def("fsel1", {
    q:"What is UNIVARIATE feature selection?",
    choices:[
      "Testing each feature ONE AT A TIME against the target and keeping those that pass a statistical threshold",
      "Testing every possible combination of the features together all at once to find the single best-performing group",
      "Selecting features purely by how strongly they correlate with each OTHER rather than with the actual target column itself",
      "Reducing many of the columns down into just a few new combined columns, much like principal components analysis does",
      "Choosing the features completely at random and then simply keeping whichever set happens to score well by sheer luck"
    ],
    explain:"Univariate selection examines each feature separately, scoring its relationship with the target using a test like an F-test, chi-squared, or mutual information, then keeping the top-scoring ones. It is a filter approach: simple and fast, but blind to interactions because it never looks at features together. SelectKBest is a common implementation.",
    simple:"Univariate selection checks each column on its own against the target and keeps the ones with a strong relationship. It never looks at columns in combination.",
    widget:{ type:"curveStatic", title:"Stricter test, fewer survivors", world:"Tighten the significance threshold and fewer features pass the one-at-a-time test.", xlab:"significance cutoff (alpha) →", xs:[0,1,2,3,4], labels:["0.001","0.01","0.05","0.1","0.5"], dec:0, yunit:"",
      series:[{ name:"features passing", ys:[4,9,15,22,40] }],
      knob:{ label:"Alpha", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"A very strict cutoff of 0.001 lets only 4 rock-solid features through.", tone:"info" },
        { max:3, text:"At the usual 0.05 threshold 15 features pass their individual test.", tone:"info" },
        { max:4, text:"🤯 Loosen to 0.5 and 40 features 'pass' — many are just noise sneaking through a lax test.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Univariate selection", formula:"score each feature alone, keep the best", text:"Each feature is tested on its own — fast but blind to combinations." } }
  });

  def("fsel1", {
    q:"What does a VARIANCE THRESHOLD do?",
    choices:[
      "It drops features whose values barely change across rows, since a near-constant column carries almost no information",
      "It drops any feature that correlates too strongly with the target, on the grounds that such columns cause data leakage",
      "It drops the individual rows whose target value happens to show an unusually high variance right across the dataset",
      "It keeps only the handful of features with the very LOWEST variance, because those steady columns are the most stable",
      "It rescales every feature up or down so that they all end up sharing exactly the same variance before any training"
    ],
    explain:"A variance threshold removes columns whose variance falls below a set level. A feature that is the same (or nearly the same) for every row cannot help distinguish rows, so it is safe to drop. It is the simplest filter, needs no target at all, and is handy for clearing out constant or near-constant columns before real selection.",
    simple:"A variance threshold throws out columns that hardly change from row to row. If a column is almost always the same value, it can't help predict anything.",
    widget:{ type:"curveStatic", title:"Drop the near-constant columns", world:"Raise the variance cutoff and low-variability columns get removed first.", xlab:"variance threshold →", xs:[0,1,2,3,4], labels:["0","0.01","0.1","0.5","1.0"], dec:0, yunit:"",
      series:[{ name:"features kept", ys:[50,44,30,12,3] }],
      knob:{ label:"Threshold", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"At threshold 0 nothing is dropped — all 50 features survive.", tone:"info" },
        { max:3, text:"By 0.5 the constant and near-constant columns are gone, leaving 12.", tone:"info" },
        { max:4, text:"🤯 A high cutoff of 1.0 keeps only the 3 most variable columns — set it too high and you lose useful ones too.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Variance threshold", formula:"drop columns that barely vary", text:"Near-constant columns carry no signal and are the easiest to remove." } }
  });

  q("fsel1", {
    q:"A column records the temperature on Mars for each of your loan applicants. It has nothing to do with whether they repay. What kind of feature is this?",
    choices:[
      "An IRRELEVANT feature — it carries no information about the target and only adds noise",
      "A REDUNDANT feature — it simply repeats the very same information that another kept column already provides you with",
      "A leaky feature — it secretly contains the exact answer that the model is actually trying its best to predict here",
      "A high-variance feature that must always be kept precisely because its value happens to change a lot between the rows",
      "An interaction feature that only ever matters at all once it has been combined together with some other column"
    ],
    explain:"An irrelevant feature has no real relationship with the target — knowing it never changes your best guess. Keeping irrelevant columns can only hurt: they give the model extra chances to fit noise. This is different from a redundant feature, which IS related to the target but merely duplicates information another kept column already provides.",
    simple:"An irrelevant feature has nothing to do with what you're predicting. It's pure clutter — the model can only misuse it.",
    widget:{ type:"curveStatic", title:"Irrelevant means no help", world:"Add more purely irrelevant columns and accuracy on new data flattens then sags.", xlab:"irrelevant features added →", xs:[0,1,2,3,4], labels:["+0","+1","+5","+20","+100"], dec:0, yunit:"%",
      series:[{ name:"validation accuracy (%)", ys:[85,85,84,82,78] }],
      knob:{ label:"Irrelevant added", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"One irrelevant column does no measurable good — accuracy holds at 85%.", tone:"info" },
        { max:3, text:"Twenty of them start to erode the model, nudging accuracy down to 82%.", tone:"info" },
        { max:4, text:"🤯 A hundred irrelevant columns drag it to 78% — they never helped, they only added noise to overfit.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Irrelevant feature", formula:"no relationship = only noise", text:"Irrelevant columns cannot help and quietly invite overfitting." } }
  });

  def("fsel1", {
    q:"A REDUNDANT feature differs from an IRRELEVANT one because a redundant feature is...",
    choices:[
      "Related to the target, but it only repeats information another kept feature already gives you",
      "Completely unrelated to the target column and therefore nothing more than pure, unhelpful noise sitting in the data",
      "A feature that simply happens to have far too many missing values scattered right through its rows to be usable at all",
      "A feature that happens to be measured on entirely the wrong numeric scale and so must be carefully normalised first",
      "The single most important feature of them all, kept only because it completely dominates every last prediction made"
    ],
    explain:"A redundant feature genuinely relates to the target — on its own it looks useful — but once you already have a correlated sibling column, it adds no NEW information. An irrelevant feature, by contrast, relates to nothing. Both are candidates for removal, but for different reasons: redundancy is about duplication, irrelevance is about having no signal at all.",
    simple:"Redundant means useful-but-duplicate: it tells you the same thing a column you already kept does. Irrelevant means it tells you nothing at all.",
    widget:{ type:"curveStatic", title:"Duplicates add nothing", world:"Start with 5 near-identical copies of one signal and remove duplicates — accuracy stays flat.", xlab:"redundant copies kept →", xs:[0,1,2,3,4], labels:["5 copies","4","3","2","1"], dec:0, yunit:"%",
      series:[{ name:"validation accuracy (%)", ys:[86,86,86,86,86] }],
      knob:{ label:"Copies kept", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"Five copies of the same signal — accuracy is 86%.", tone:"info" },
        { max:3, text:"Drop down to 2 copies and accuracy is unchanged at 86%; the extras were pure duplication.", tone:"info" },
        { max:4, text:"🤯 One copy is enough: still 86%. The redundant copies never added information — only clutter.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Redundant vs irrelevant", formula:"redundant = useful but duplicate", text:"Redundant columns repeat known info; irrelevant columns carry none." } }
  });

  q("fsel1", {
    q:"A feature is strongly correlated with the target. Does that guarantee it will improve your model?",
    choices:[
      "No — it may just duplicate a feature you already have, or the link may vanish once other features are present",
      "Yes — any feature that is correlated with the target is always automatically worth keeping purely on its own merit",
      "Yes — correlation with the target column is essentially the textbook definition of a feature that the model truly needs",
      "No — correlation with the target is basically meaningless and so it should never once be used to judge a feature at all",
      "Only when the correlation is exactly 1.0 across every single row, because otherwise the feature is completely useless"
    ],
    explain:"Correlation with the target flags a feature as promising, but usefulness is about MARGINAL value: what does it add given the features you already keep? A column highly correlated with the target may simply echo another kept column, contributing nothing new. Correlation is a helpful screen, not a promise of improvement.",
    simple:"A column can line up nicely with the target and still be useless if another column already says the same thing. Correlation flags candidates; it doesn't guarantee value.",
    widget:{ type:"curveStatic", title:"Correlation vs real payoff", world:"Add features in order of their correlation with the target and track what each ACTUALLY adds.", xlab:"feature added (by correlation) →", xs:[0,1,2,3,4], labels:["#1","#2","#3","#4","#5"], dec:0, yunit:"%",
      series:[
        { name:"correlation with target (%)", ys:[80,78,76,74,72] },
        { name:"extra accuracy it adds (%)", ys:[15,8,3,1,0] }
      ],
      knob:{ label:"Feature added", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"Feature #1 is 80% correlated and adds a real 15% — genuinely useful.", tone:"info" },
        { max:3, text:"Feature #4 is still 74% correlated yet adds only 1%; its info is already covered.", tone:"info" },
        { max:4, text:"🤯 Feature #5 correlates 72% with the target but adds 0% — high correlation, zero payoff.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Correlation ≠ usefulness", formula:"value = what it adds, not raw correlation", text:"Judge features by marginal gain, not correlation alone." } }
  });

  def("fsel1", {
    q:"What is FEATURE IMPORTANCE?",
    choices:[
      "A score for each feature saying how much it contributed to the model's predictions",
      "The plain correlation coefficient measured between two different features, used mainly to spot near-duplicate columns",
      "The total number of missing or blank values that a given feature happens to contain across all of the rows in the data",
      "The particular order in which the columns happen to appear from left to right within the original raw data file",
      "A firm guarantee that whichever single feature ranks at the very top must therefore directly cause the predicted outcome"
    ],
    explain:"Feature importance assigns each feature a number reflecting how much the model relied on it. Tree ensembles derive it from how much each feature reduced error at its splits; other methods use coefficient sizes or permutation. High importance means the model leaned on that feature — though importance reflects predictive contribution, not proof of causation.",
    simple:"Feature importance is a score of how much each column mattered to the model's predictions. Bigger score, more the model leaned on it.",
    widget:{ type:"curveStatic", title:"A few features do the work", world:"Features ranked by importance — most of the predictive weight sits in the top few.", xlab:"feature rank →", xs:[0,1,2,3,4], labels:["#1","#2","#3","#5","#10"], dec:2, yunit:"",
      series:[{ name:"importance score", ys:[0.40,0.25,0.15,0.05,0.01] }],
      knob:{ label:"Rank", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"The top feature alone accounts for 0.40 of the importance.", tone:"info" },
        { max:3, text:"By rank #5 importance is down to 0.05 — a minor contributor.", tone:"info" },
        { max:4, text:"🤯 Rank #10 sits at 0.01 — a handful of features carry the model and the long tail barely matters.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Feature importance", formula:"score = contribution to predictions", text:"Importance ranks how much the model relied on each feature." } }
  });

  q("fsel1", {
    q:"Besides accuracy, why do teams often prefer a model built on FEWER features?",
    choices:[
      "It predicts faster, costs less to collect data for, and is far easier to explain to stakeholders",
      "A smaller feature set always produces a strictly and mathematically higher accuracy score on any dataset you try",
      "Fewer features conveniently removes the entire need to ever validate the finished model on any held-out data at all",
      "Models that are built on fewer features simply never require any hyperparameter tuning of any kind before deployment",
      "The number of features that a model uses has absolutely no effect on its final prediction speed whatsoever at all"
    ],
    explain:"A leaner model has practical advantages beyond accuracy: each feature it needs is a column someone must collect, clean, and store, and every feature adds compute at prediction time. Fewer inputs also make the model's behaviour easier to describe and audit. In regulated or high-stakes settings, interpretability and low cost can matter as much as raw performance.",
    simple:"Fewer columns means quicker predictions, less data to gather, and a model you can actually explain. That's often worth as much as a tiny accuracy bump.",
    widget:{ type:"curveStatic", title:"More features, slower predictions", world:"Grow the feature count and prediction latency climbs.", xlab:"features used →", xs:[0,1,2,3,4], labels:["5","20","100","500","2000"], dec:0, yunit:"ms",
      series:[{ name:"prediction latency (ms)", ys:[2,5,18,70,300] }],
      knob:{ label:"Features", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"With 5 features a prediction takes about 2 ms — instant.", tone:"info" },
        { max:3, text:"At 500 features latency is 70 ms and each feature is a column you must collect and maintain.", tone:"info" },
        { max:4, text:"🤯 2000 features means 300 ms per prediction — 150x slower, and far harder to explain.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Cost & interpretability", formula:"fewer features = cheaper, clearer", text:"Lean models predict faster and are easier to trust and explain." } }
  });

  def("fsel1", {
    q:"What does scikit-learn's SelectKBest do?",
    choices:[
      "It scores every feature with a chosen statistic and keeps the K highest-scoring ones",
      "It trains K entirely different models one after another and then simply keeps the single best-performing one of them",
      "It selects the K individual rows out of the data that are judged to be the most representative of the overall dataset",
      "It builds K brand-new engineered features by carefully combining the original columns together in various ways",
      "It picks K of the features completely at random to serve as a simple baseline for comparison against real selection"
    ],
    explain:"SelectKBest is a univariate filter: you give it a scoring function (like f_classif or mutual_info_classif) and a number K, and it keeps the K features with the highest scores. It is fast and simple, but because it scores each feature independently, choosing K too small can drop features that only help in combination, and too large keeps noise.",
    simple:"SelectKBest scores each column and keeps the K with the best scores. You just tell it how many features to keep.",
    widget:{ type:"curveStatic", title:"Choosing K", world:"Sweep K and watch validation accuracy rise to a peak then fall.", xlab:"K (features kept) →", xs:[0,1,2,3,4], labels:["2","5","10","20","all"], dec:0, yunit:"%",
      series:[{ name:"validation accuracy (%)", ys:[74,84,88,85,80] }],
      knob:{ label:"K", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"K=2 is too few — the model misses useful signal and sits at 74%.", tone:"info" },
        { max:3, text:"K=10 hits the peak of 88%; K=20 already starts letting noise back in.", tone:"info" },
        { max:4, text:"🤯 Keeping ALL features drops to 80% — SelectKBest with the right K beats using everything.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"SelectKBest", formula:"keep the K top-scoring features", text:"Pick K by validation — too small starves, too large adds noise." } }
  });

  q("fsel1", {
    q:"You must choose between a FILTER method and a WRAPPER method on a big dataset with limited time. What is the core trade-off?",
    choices:[
      "Filters are much faster but ignore feature interactions; wrappers are slower but can find stronger subsets",
      "Filters are consistently slower but far more accurate, whereas wrappers are much faster yet somehow always end up worse",
      "There is genuinely no practical difference at all — both approaches train the underlying model the exact same number of times",
      "Wrappers never actually train any model at all during the search, which is precisely why they are the far cheaper option here",
      "Filters can only ever be used for regression tasks, while wrappers are strictly limited to classification problems alone"
    ],
    explain:"Filters score features with cheap statistics and never train the model, so they scale to huge feature sets in seconds — but they judge features in isolation and miss combinations. Wrappers use the model's own validation score over many subsets, capturing interactions and often finding better sets, at the cost of training the model many times. It is speed versus thoroughness.",
    simple:"Filters are fast but shallow; wrappers are slow but thorough. On a big dataset with little time, filters win on speed.",
    widget:{ type:"curveStatic", title:"Speed cost as features grow", world:"Grow the number of candidate features and compare selection time for each approach.", xlab:"candidate features →", xs:[0,1,2,3,4], labels:["10","20","50","100","200"], dec:0, yunit:"s",
      series:[
        { name:"wrapper time (s)", ys:[5,20,80,200,500] },
        { name:"filter time (s)", ys:[1,1,2,2,3] }
      ],
      knob:{ label:"Features", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"With 10 features both are cheap — wrapper 5s, filter 1s.", tone:"info" },
        { max:3, text:"At 100 features the wrapper needs 200s of repeated training; the filter is still ~2s.", tone:"info" },
        { max:4, text:"🤯 By 200 features the wrapper takes 500s while the filter finishes in 3s — speed vs thoroughness laid bare.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Filter vs wrapper", formula:"filter = fast+shallow, wrapper = slow+deep", text:"Choose by budget: filters scale, wrappers dig deeper." } }
  });

  q("fsel1", {
    q:"What is the 'curse of dimensionality' and why does it motivate feature selection?",
    choices:[
      "As feature count grows with fixed data, points spread thin so patterns get harder to learn — fewer features help",
      "Adding more features will always make the training process crash outright the very moment you happen to pass one thousand columns",
      "It means that high-dimensional data is simply impossible to store on any modern computer at all, no matter how large its disk is",
      "It refers to models steadily running out of memory, a problem that can be fixed only by continually buying more and more RAM",
      "It is the reliable rule stating that adding more and more features to any model will always yield a strictly higher accuracy score"
    ],
    explain:"In high dimensions, the same number of rows is scattered across a vastly larger space, so every point looks far from every other and 'nearby' loses meaning. Distance-based and density-based methods degrade, and models need exponentially more data to fill the space. Cutting features shrinks the space, packing the data more densely and making patterns learnable.",
    simple:"The more columns you add, the emptier the space gets around each data point, so the model has less to lean on. Fewer features keep the data dense enough to learn from.",
    widget:{ type:"curveStatic", title:"Data spreads thin", world:"Hold the number of rows fixed and increase dimensions — accuracy erodes.", xlab:"dimensions (features) →", xs:[0,1,2,3,4], labels:["5","20","100","500","2000"], dec:0, yunit:"%",
      series:[{ name:"validation accuracy (%)", ys:[86,84,78,68,55] }],
      knob:{ label:"Dimensions", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"With 5 dimensions the fixed data fills the space well — 86%.", tone:"info" },
        { max:3, text:"At 500 dimensions the same rows are spread thin and accuracy falls to 68%.", tone:"info" },
        { max:4, text:"🤯 2000 dimensions on the same data drops to 55% — the space is nearly empty around each point.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Curse of dimensionality", formula:"more dims = sparser data", text:"High dimensions scatter data thin; selection restores density." } }
  });

  /* ============================ fsel2 — Part II · Practice (9) ============================ */

  def("fsel2", {
    q:"What is MUTUAL INFORMATION as a feature-selection score?",
    choices:[
      "A measure of how much knowing a feature reduces uncertainty about the target, capturing even non-linear links",
      "A measure that only detects straight-line (linear) relationships, like Pearson correlation",
      "The number of times two features take the same value",
      "The variance of a feature divided by the variance of the target",
      "A count of how many rows are missing values in both a feature and the target"
    ],
    explain:"Mutual information measures the reduction in uncertainty about the target once you know a feature — it is zero only when they are fully independent. Unlike correlation, it captures non-linear and non-monotonic relationships, so it can flag a useful feature whose link to the target is curved or U-shaped. That makes it a powerful filter score.",
    simple:"Mutual information asks: how much does knowing this column tell me about the target? It catches curvy relationships that plain correlation would miss.",
    widget:{ type:"curveStatic", title:"Catching curved links", world:"Bend the feature-target relationship from linear to a closed circle and compare two scores.", xlab:"relationship shape →", xs:[0,1,2,3,4], labels:["linear","slight curve","U-shape","V-shape","circle"], dec:0, yunit:"",
      series:[
        { name:"mutual information", ys:[80,78,75,74,72] },
        { name:"Pearson correlation", ys:[80,55,20,5,0] }
      ],
      knob:{ label:"Shape", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"For a linear link both scores agree — around 80.", tone:"info" },
        { max:3, text:"For a V-shape correlation collapses to 5 while mutual information stays at 74.", tone:"info" },
        { max:4, text:"🤯 On a circular relationship correlation reads 0 (looks useless!) but mutual information still sees 72 of real signal.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Mutual information", formula:"MI = uncertainty removed about target", text:"MI catches non-linear dependence that correlation misses." } }
  });

  def("fsel2", {
    q:"What is CORRELATION-BASED feature selection?",
    choices:[
      "Keeping features that correlate well with the target while removing ones that are highly correlated with each other",
      "Keeping only the features that correlate strongly with each other and ignoring the target",
      "Removing every feature that has any correlation with the target to avoid leakage",
      "Selecting features purely by how many unique values they contain",
      "Combining correlated features into principal components"
    ],
    explain:"Correlation-based selection has two goals at once: relevance and low redundancy. It favours features strongly correlated with the target, but among a group of features that are highly correlated with EACH OTHER, it keeps just one — the rest are redundant. This yields a compact set that covers the signal without duplication.",
    simple:"Correlation-based selection keeps columns that track the target but drops ones that just echo each other. You want relevant, non-duplicate features.",
    widget:{ type:"curveStatic", title:"Prune the duplicates", world:"Lower the inter-feature correlation cutoff and redundant twins get merged away.", xlab:"drop if pairwise corr above →", xs:[0,1,2,3,4], labels:["1.0","0.95","0.9","0.8","0.6"], dec:0, yunit:"",
      series:[{ name:"features kept", ys:[50,45,38,25,12] }],
      knob:{ label:"Cutoff", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"A cutoff of 1.0 removes nothing — all 50 features stay, duplicates and all.", tone:"info" },
        { max:3, text:"Dropping features that correlate above 0.8 with a kept one leaves 25 — redundancy is falling.", tone:"info" },
        { max:4, text:"🤯 A strict 0.6 cutoff keeps only 12 low-redundancy features — but set it too tight and you lose useful ones.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Correlation-based selection", formula:"relevant to target, uncorrelated with each other", text:"Keep signal, cut duplicated information." } }
  });

  def("fsel2", {
    q:"What is Recursive Feature Elimination (RFE)?",
    choices:[
      "It trains a model, drops the weakest feature, retrains, and repeats until the desired number of features remains",
      "It scores every feature once and keeps the top ones without ever retraining",
      "It adds features one at a time starting from an empty set",
      "It removes rows with recursive outliers until the data is clean",
      "It randomly deletes features until accuracy drops"
    ],
    explain:"RFE is a wrapper that works backwards: fit the model, rank features by importance or coefficient size, remove the least important, then refit and repeat. By retraining after each removal it accounts for how the remaining features interact. It often finds strong compact subsets, but the repeated retraining makes it computationally heavy.",
    simple:"RFE trains the model, kicks out the weakest feature, trains again, and keeps going until only the best few remain. It's thorough but slow.",
    widget:{ type:"curveStatic", title:"Eliminate down to the core", world:"RFE removes features from many down to a few — accuracy peaks at the right size.", xlab:"features remaining →", xs:[0,1,2,3,4], labels:["50","30","15","8","3"], dec:0, yunit:"%",
      series:[{ name:"validation accuracy (%)", ys:[80,84,88,87,78] }],
      knob:{ label:"Remaining", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"With all 50 features accuracy is 80% — cluttered with weak ones.", tone:"info" },
        { max:3, text:"Eliminating down to 8 features climbs to 87%, retraining at every step.", tone:"info" },
        { max:4, text:"🤯 Cut too far to 3 features and accuracy falls to 78% — RFE can overshoot if you eliminate too many.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"RFE", formula:"drop weakest, refit, repeat", text:"RFE peels features off backwards, retraining each round." } }
  });

  q("fsel2", {
    q:"Why is RFE often described as computationally EXPENSIVE?",
    choices:[
      "It retrains the whole model once for (roughly) every feature it removes, so cost grows with the feature count",
      "It stores the entire dataset in memory many times over",
      "It requires a GPU that most laptops do not have",
      "It uses a slow statistical test that filters cannot use",
      "It has to label the data by hand before each step"
    ],
    explain:"RFE removes features one (or a few) at a time and refits the model after each removal. With many features that means many full training runs — remove-and-retrain repeated dozens or hundreds of times. Each retrain has the model's normal cost, so total time scales with the number of features being eliminated, which is why RFE is slow on wide datasets.",
    simple:"RFE trains the model again every time it drops a feature. With hundreds of features that's hundreds of trainings, so it gets slow fast.",
    widget:{ type:"curveStatic", title:"Retrains pile up", world:"Grow the feature count and count how many model trainings RFE needs.", xlab:"starting features →", xs:[0,1,2,3,4], labels:["10","20","50","100","200"], dec:0, yunit:"",
      series:[{ name:"model trainings needed", ys:[10,20,50,100,200] }],
      knob:{ label:"Features", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"10 features means about 10 retrains — quick enough.", tone:"info" },
        { max:3, text:"100 features means around 100 full trainings just to select.", tone:"info" },
        { max:4, text:"🤯 200 features balloons to ~200 retrains — cost scales straight up with feature count.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"RFE cost", formula:"trainings ≈ features removed", text:"Each elimination step retrains the model, so wide data is costly." } }
  });

  def("fsel2", {
    q:"How does LASSO (L1) regression perform feature selection?",
    choices:[
      "Its L1 penalty shrinks weak coefficients to EXACTLY zero, so those features drop out automatically",
      "It ranks features by correlation and deletes the bottom half before training",
      "It averages the coefficients of correlated features so none is ever zero",
      "It adds a squared penalty that shrinks coefficients but never reaches zero",
      "It removes rows whose target is an outlier during fitting"
    ],
    explain:"Lasso adds an L1 penalty (the sum of absolute coefficient values) to the loss. The geometry of this penalty drives many coefficients to precisely zero as the penalty strength grows, effectively removing those features. This makes Lasso an embedded method: it fits a model and selects features in one step. (Ridge's L2 penalty only shrinks toward zero, never to it.)",
    simple:"Lasso adds a penalty that pushes weak feature weights all the way to zero. A zero weight means that feature is dropped — selection happens as it trains.",
    widget:{ type:"curveStatic", title:"Penalty zeros features out", world:"Increase the L1 penalty strength and count how many features keep a nonzero weight.", xlab:"penalty strength (lambda) →", xs:[0,1,2,3,4], labels:["0.001","0.01","0.1","1","10"], dec:0, yunit:"",
      series:[{ name:"nonzero (kept) features", ys:[50,40,22,6,1] }],
      knob:{ label:"Lambda", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"A tiny penalty barely selects — 50 features stay nonzero.", tone:"info" },
        { max:3, text:"At lambda 1 only 6 features survive; the rest were driven to exactly zero.", tone:"info" },
        { max:4, text:"🤯 Crank lambda to 10 and just 1 feature remains — too strong a penalty can zero out useful ones too.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Lasso (L1) selection", formula:"L1 penalty → coefficients hit zero", text:"Lasso selects by shrinking weak weights all the way to zero." } }
  });

  q("fsel2", {
    q:"As you raise Lasso's penalty, which coefficients hit exactly zero FIRST, and what does that tell you?",
    choices:[
      "The weakest, least useful features zero out first while strong ones survive — so survival order ranks features",
      "The strongest features zero out first because the penalty targets big coefficients",
      "All coefficients hit zero at the same penalty value simultaneously",
      "Only features with missing values are ever set to zero",
      "The penalty zeros features at random, revealing nothing about their usefulness"
    ],
    explain:"Because the L1 penalty costs the same per unit of coefficient regardless of the feature, weak features — whose small coefficients buy little accuracy — are the cheapest to sacrifice, so they zero out at low penalty. Strong features hold on until much higher penalties. The order in which features drop out along the penalty path is itself a useful importance ranking.",
    simple:"Weak features die first as the penalty grows; the important ones cling on. So the order they drop out tells you which columns matter most.",
    widget:{ type:"curveStatic", title:"Weak dies first, strong survives", world:"Raise the penalty and watch a weak feature's weight vanish long before a strong one's.", xlab:"penalty strength (lambda) →", xs:[0,1,2,3,4], labels:["0.001","0.01","0.1","1","10"], dec:2, yunit:"",
      series:[
        { name:"strong feature |weight|", ys:[0.90,0.85,0.60,0.30,0.05] },
        { name:"weak feature |weight|", ys:[0.30,0.15,0.02,0.00,0.00] }
      ],
      knob:{ label:"Lambda", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"At low penalty both features carry weight — 0.90 and 0.30.", tone:"info" },
        { max:3, text:"By lambda 1 the weak feature is already zeroed while the strong one still holds 0.30.", tone:"info" },
        { max:4, text:"🤯 The weak feature vanished long ago; the strong feature is the last to fade — drop-out order IS a ranking.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Lasso path", formula:"weak coefficients zero out first", text:"Survival order along the penalty path ranks feature usefulness." } }
  });

  q("fsel2", {
    q:"You run feature selection on the WHOLE dataset, then do cross-validation on the selected features. Why is your reported accuracy too optimistic?",
    choices:[
      "The selection already peeked at the test folds, so information leaked and each fold is no longer truly unseen",
      "Cross-validation always overestimates accuracy regardless of when you select features",
      "Selecting first makes the model train on fewer rows, which inflates the score",
      "The problem is only that selection is slow, not that the score is biased",
      "There is no problem — selecting once up front is the recommended approach"
    ],
    explain:"When selection uses the entire dataset, it has already seen the rows that later serve as test folds, so those folds are no longer independent — information has leaked from test into training. The cross-validation score then reflects features hand-picked to fit that very test data, inflating it. Correct practice: perform selection INSIDE each training fold, so the test fold stays truly unseen.",
    simple:"If you pick features using all the data first, the test folds already influenced the choice. The score looks great but won't hold up on genuinely new data.",
    widget:{ type:"curveStatic", title:"The leakage gap", world:"Select from more features using the whole dataset — reported score inflates while true test accuracy sinks.", xlab:"features screened on full data →", xs:[0,1,2,3,4], labels:["10","50","200","1000","5000"], dec:0, yunit:"%",
      series:[
        { name:"reported CV accuracy (%)", ys:[85,88,91,94,97] },
        { name:"true test accuracy (%)", ys:[84,84,80,72,60] }
      ],
      knob:{ label:"Features screened", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"Screening 10 features leaks little — reported 85% vs true 84%.", tone:"info" },
        { max:3, text:"Screen 1000 on the full data and it reports a rosy 94% while the truth is 72%.", tone:"info" },
        { max:4, text:"🤯 With 5000 features the leaky score claims 97% but real performance is 60% — a huge illusion.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Selection leakage", formula:"select inside the training folds only", text:"Selecting on all data leaks test info and inflates the score." } }
  });

  q("fsel2", {
    q:"Two features in your data are correlated 0.98 (near-duplicates). What is the sensible move?",
    choices:[
      "Drop one of them — keeping both adds almost no information but doubles cost and can destabilise coefficients",
      "Always keep both, since a 0.98 correlation means both are extremely important",
      "Drop both, because any correlation between features means they are useless",
      "Multiply them together to create one combined feature and keep that plus the originals",
      "Keep both but delete every row where they disagree"
    ],
    explain:"When two features carry nearly the same information, one is redundant: the second adds negligible new signal while inflating dimensionality and, for linear models, causing unstable coefficients (multicollinearity). Dropping one typically leaves accuracy essentially unchanged while making the model leaner and more stable. Keep the one that is cheaper or easier to interpret.",
    simple:"If two columns say almost the same thing, keep one and toss the other. You lose nothing and get a simpler, steadier model.",
    widget:{ type:"curveStatic", title:"Keeping duplicates is pointless", world:"A cluster of 5 near-identical features — remove copies and accuracy holds steady.", xlab:"copies of the signal kept →", xs:[0,1,2,3,4], labels:["all 5","4","3","2","1"], dec:0, yunit:"%",
      series:[{ name:"validation accuracy (%)", ys:[87,87,87,86,86] }],
      knob:{ label:"Copies kept", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"All 5 near-duplicates give 87% — but four of them are dead weight.", tone:"info" },
        { max:3, text:"Down to 2 copies and accuracy is still 86% — the extras never earned their keep.", tone:"info" },
        { max:4, text:"🤯 A single copy holds 86%; you shed four redundant columns for basically free.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Correlated pair", formula:"near-duplicate → keep one", text:"Drop one of two highly correlated features; you lose almost nothing." } }
  });

  def("fsel2", {
    q:"What is MULTICOLLINEARITY?",
    choices:[
      "When two or more features are so correlated that a linear model can't tell their effects apart, making coefficients unstable",
      "When a single feature is strongly correlated with the target",
      "When the target has more than two possible classes",
      "When features are measured on different numeric scales",
      "When the dataset has more rows than columns"
    ],
    explain:"Multicollinearity occurs when predictors are highly correlated with each other. A linear model then cannot separate their individual contributions — it can shift weight between them almost freely — so the coefficients become large, unstable, and flip sign with small data changes. Predictions may still be fine, but the coefficients become unreliable for interpretation, which is a reason to drop redundant features.",
    simple:"Multicollinearity is when columns are so alike the model can't decide which deserves the credit. Their weights swing wildly and stop being trustworthy.",
    widget:{ type:"curveStatic", title:"Coefficients go haywire", world:"Increase the correlation between two predictors and watch coefficient instability explode.", xlab:"correlation between two features →", xs:[0,1,2,3,4], labels:["0","0.5","0.8","0.95","0.99"], dec:0, yunit:"",
      series:[{ name:"coefficient instability", ys:[1,2,5,20,80] }],
      knob:{ label:"Correlation", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"Uncorrelated predictors give stable, trustworthy coefficients (instability 1).", tone:"info" },
        { max:3, text:"At 0.95 correlation instability jumps to 20 — the weights start swinging.", tone:"info" },
        { max:4, text:"🤯 At 0.99 instability hits 80: tiny data changes flip the coefficients wildly, wrecking interpretation.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Multicollinearity", formula:"correlated predictors = unstable weights", text:"Highly correlated features make linear coefficients untrustworthy." } }
  });

  /* ============================ fsel3 — Part III · Advanced Study (6) ============================ */

  def("fsel3", {
    q:"What is PERMUTATION IMPORTANCE?",
    choices:[
      "Shuffle one feature's values and measure how much the model's accuracy drops — a bigger drop means a more important feature",
      "Count how many times a feature is used to split in a decision tree",
      "The size of a feature's coefficient in a linear model",
      "The correlation of a feature with the target before any model is trained",
      "The number of unique values a feature takes across the rows"
    ],
    explain:"Permutation importance is measured on a trained model: randomly shuffle one feature's column (breaking its link to the target) and see how much a validation metric falls. A large drop means the model genuinely relied on that feature; near-zero means it did not. It is model-agnostic and uses real predictive impact, but it can be misleading when features are correlated.",
    simple:"Permutation importance scrambles one column and checks how much worse the model gets. If accuracy tanks, that column mattered; if nothing happens, it didn't.",
    widget:{ type:"curveStatic", title:"Shuffle and see what breaks", world:"Shuffle each feature in turn and record how far accuracy falls.", xlab:"feature shuffled →", xs:[0,1,2,3,4], labels:["A","B","C","D","E"], dec:0, yunit:"%",
      series:[{ name:"accuracy drop when shuffled (%)", ys:[12,7,3,1,0] }],
      knob:{ label:"Feature", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"Shuffling feature A costs 12% accuracy — the model leaned on it heavily.", tone:"info" },
        { max:3, text:"Feature D costs only 1% when scrambled — barely used.", tone:"info" },
        { max:4, text:"🤯 Feature E's shuffle changes nothing (0%) — the model ignored it entirely, so it's a drop candidate.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Permutation importance", formula:"importance = accuracy lost when shuffled", text:"Break a feature's signal and measure the damage to rank it." } }
  });

  q("fsel3", {
    q:"A random ID-like column with thousands of unique values gets a HIGH tree impurity importance. Why is this a known trap?",
    choices:[
      "Impurity importance is biased toward high-cardinality features, which offer many split points to fit noise",
      "High-cardinality features are always genuinely the most predictive columns",
      "Impurity importance can only be computed for low-cardinality features",
      "The tree ran out of memory and defaulted that column to the top",
      "Random columns are given high importance on purpose as a baseline check"
    ],
    explain:"Impurity-based (Gini/entropy) importance rewards features that reduce impurity at splits. A high-cardinality feature offers many possible split points, so even a random one can carve the training data into pure little groups by chance, earning inflated importance that does not generalise. Permutation importance on held-out data or unbiased importance measures avoid this trap.",
    simple:"Columns with tons of unique values give trees many places to split, so even a useless ID column can look important on training data. It's an artifact, not real signal.",
    widget:{ type:"curveStatic", title:"Cardinality inflates importance", world:"Give a purely RANDOM feature more unique values and watch its (spurious) impurity importance climb.", xlab:"unique values in a random feature →", xs:[0,1,2,3,4], labels:["2","10","50","500","5000"], dec:0, yunit:"",
      series:[{ name:"spurious impurity importance", ys:[1,3,8,18,30] }],
      knob:{ label:"Unique values", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"A binary random feature earns almost no importance — the tree can't overfit it.", tone:"info" },
        { max:3, text:"With 500 unique values the same random column already scores 18 out of pure luck.", tone:"info" },
        { max:4, text:"🤯 At 5000 unique values a totally random feature tops out at 30 importance — cardinality alone, no real signal.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Impurity bias", formula:"more split points → inflated importance", text:"Impurity importance overrates high-cardinality features." } }
  });

  q("fsel3", {
    q:"You screen 10,000 candidate columns on the full dataset, keep the 20 that best predict the target, then report cross-validated accuracy. Why can this look great yet be worthless?",
    choices:[
      "With enough random columns, some will fit the target by chance; screening on all data bakes that luck into every fold",
      "Screening 10,000 columns is simply too slow, but the resulting score is valid",
      "Keeping 20 features is too few, which is the only issue here",
      "Cross-validation cannot be used after any feature screening at all",
      "The score is fine as long as the 20 features are scaled first"
    ],
    explain:"Among thousands of random columns, pure chance guarantees some will correlate with the target in THIS dataset. If you screen using all the data before cross-validation, that chance correlation is present in every fold, so the model looks accurate while having learned noise. The fix is nested selection: screen features inside each training fold, keeping test folds untouched.",
    simple:"Search 10,000 random columns and a few will match the target by luck. If you pick them using all your data, every test fold is already tainted, so the score is a mirage.",
    widget:{ type:"curveStatic", title:"Luck masquerading as signal", world:"Screen from more noise columns on the full data — reported score soars while honest accuracy falls.", xlab:"noise columns screened →", xs:[0,1,2,3,4], labels:["10","100","1000","5000","20000"], dec:0, yunit:"%",
      series:[
        { name:"reported (leaky) accuracy (%)", ys:[80,84,88,93,98] },
        { name:"honest nested-CV accuracy (%)", ys:[80,79,76,68,55] }
      ],
      knob:{ label:"Noise screened", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"With 10 candidate columns there's little to exploit — 80% either way.", tone:"info" },
        { max:3, text:"Screen 5000 noise columns on all the data and it brags 93% while honest CV says 68%.", tone:"info" },
        { max:4, text:"🤯 At 20000 noise columns the leaky method reports 98% — pure luck; nested CV reveals the true 55%.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Nested selection", formula:"screen inside each training fold", text:"Screen features per-fold or chance correlations fake success." } }
  });

  q("fsel3", {
    q:"You rerun feature selection on several random subsamples of your data and each run picks a DIFFERENT set. What does this instability mean?",
    choices:[
      "The selection is unstable — often from small data or correlated features — so the chosen set may not generalise",
      "It proves the features are all equally useless and should be discarded",
      "It is expected and irrelevant; only the final accuracy on one split matters",
      "It means the model has too few features and you should add more",
      "It guarantees the very first run found the correct set"
    ],
    explain:"Selection stability measures how consistent the chosen feature set is across resamples of the data. Instability signals that the choice is driven by noise — common with small samples or when several correlated features are near-interchangeable, so tiny data changes swap one for another. Unstable selections are fragile; techniques like stability selection (aggregating over many resamples) yield more reliable sets.",
    simple:"If every data subsample picks a different feature set, your selection is riding on noise, not real signal. A trustworthy selection stays roughly the same across resamples.",
    widget:{ type:"curveStatic", title:"Stability grows with data", world:"Increase the sample size and measure how consistently the same features get selected.", xlab:"training rows →", xs:[0,1,2,3,4], labels:["50","200","1000","5000","20000"], dec:0, yunit:"%",
      series:[{ name:"features consistently selected (%)", ys:[30,55,75,88,95] }],
      knob:{ label:"Rows", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"With only 50 rows, resamples agree on just 30% of features — selection is mostly noise.", tone:"info" },
        { max:3, text:"At 5000 rows agreement rises to 88% — the choice is becoming reproducible.", tone:"info" },
        { max:4, text:"🤯 With 20000 rows 95% of selected features are stable across resamples — now you can trust the set.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Selection stability", formula:"consistent picks across resamples = trust", text:"Unstable selections ride noise; stable ones generalise." } }
  });

  q("fsel3", {
    q:"Two features are nearly perfect copies of each other, and both truly drive the target. What does PERMUTATION importance report for each, and why?",
    choices:[
      "Both look UNimportant, because shuffling one leaves its twin to compensate, so accuracy barely drops",
      "Both look extremely important, because each is highly correlated with the target",
      "One is randomly assigned all the importance and the other exactly zero",
      "Both are automatically dropped before importance is computed",
      "The importances add up to more than 100% because the signal is counted twice"
    ],
    explain:"Permutation importance shuffles one feature at a time. When a shuffled feature has a near-identical twin still intact, the model reads the same information from the twin, so accuracy hardly falls — the feature scores as unimportant despite driving the target. Both correlated features can look weak individually. This is why you must interpret permutation importance carefully under correlation, ideally shuffling correlated groups together.",
    simple:"Scramble one of two identical columns and the other still tells the model everything, so accuracy barely moves. Both end up looking useless even though they matter.",
    widget:{ type:"curveStatic", title:"Twins hide each other's value", world:"Raise how similar a feature is to its twin and watch its permutation importance collapse.", xlab:"correlation with its twin →", xs:[0,1,2,3,4], labels:["0","0.5","0.8","0.95","0.99"], dec:0, yunit:"%",
      series:[{ name:"permutation importance (accuracy drop %)", ys:[10,7,4,1,0] }],
      knob:{ label:"Correlation with twin", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"With no twin, shuffling the feature costs 10% — its true importance shows.", tone:"info" },
        { max:3, text:"At 0.95 correlation the twin covers for it and the drop is just 1%.", tone:"info" },
        { max:4, text:"🤯 At 0.99 the importance reads 0% — a genuinely useful feature looks worthless because its clone fills in.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Importance under correlation", formula:"twins mask each other's importance", text:"Correlated features can each look unimportant to permutation." } }
  });

  q("fsel3", {
    q:"Your target depends on an INTERACTION between two features (their combination flips the answer). A univariate FILTER keeps missing them. Why, and what selects them better?",
    choices:[
      "Filters score each feature alone and can't see interactions; embedded or wrapper methods that use the model can",
      "Filters are simply too slow to reach the interacting features in time",
      "Univariate filters only work on regression, not on interaction targets",
      "Interactions can never be captured by any feature-selection method",
      "The filter needs the features scaled first and would then find the interaction"
    ],
    explain:"A univariate filter tests each feature's own relationship with the target, so a feature that only matters in combination with another shows weak individual signal and gets dropped. Methods that evaluate features THROUGH a model — embedded (trees, Lasso on interaction terms) or wrappers (RFE, forward selection) — can detect that the pair helps together. This is the classic blind spot of univariate selection.",
    simple:"A filter judges each column by itself, so it misses columns that only help in combination. Model-based methods that test features together can catch the interaction.",
    widget:{ type:"curveStatic", title:"Filters miss interactions", world:"Strengthen a feature interaction and compare a univariate filter against a model-based selector.", xlab:"interaction strength →", xs:[0,1,2,3,4], labels:["none","weak","medium","strong","extreme"], dec:0, yunit:"%",
      series:[
        { name:"model-based selection accuracy (%)", ys:[85,85,84,83,82] },
        { name:"univariate filter accuracy (%)", ys:[85,82,75,65,55] }
      ],
      knob:{ label:"Interaction strength", min:0, max:4, step:1, init:0 },
      insights:[
        { max:1, text:"With no interaction both approaches agree — the filter does fine at 85%.", tone:"info" },
        { max:3, text:"As the interaction grows strong the filter drops the pair and falls to 65%.", tone:"info" },
        { max:4, text:"🤯 At extreme interaction the filter hits 55% while the model-based selector holds 82% — filters are blind to combinations.", tone:"wow" }
      ],
      extreme:{ at:"max" },
      reveal:{ name:"Interactions", formula:"univariate can't see combined effects", text:"Use model-based selection when features matter together." } }
  });

}());
