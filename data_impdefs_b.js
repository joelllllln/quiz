/* Important definitions (B): feature-engineering & text prep, ranking metrics,
   interpretability. Each is DEFS-tagged with a reveal. Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function def(qk, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1;
  }

  def("feng1",
    "What is label encoding?",
    "Mapping each category to an integer code",
    ["Creating a separate binary indicator column for every distinct category value", "Replacing each category with the mean of the target variable for that category", "Replacing each category by how often it occurs in the data", "Hashing category names into a fixed number of buckets"],
    "Label encoding",
    "Label encoding assigns each distinct category an integer (red to 0, green to 1, blue to 2), producing a single numeric column.",
    "Label encoding replaces categories with integer codes in one column. It's compact, but the integers imply an order and spacing that may not exist, which can mislead models that read the numbers as magnitudes, unlike one-hot encoding.",
    "Give each category a number, like red=0, green=1, blue=2.");

  def("feng1",
    "What is an outlier in a dataset?",
    "An observation lying far from the bulk of the data",
    ["A feature whose values are almost perfectly correlated with another feature in the dataset", "A category that appears only a handful of times across the entire dataset", "A row that is duplicated elsewhere in the dataset", "A missing entry in a numeric column"],
    "Outlier",
    "An outlier is a data point far from the majority; it can distort means, variances, and models sensitive to extreme values.",
    "An outlier sits far from the main mass of the data and can skew statistics and models, inflating a feature's range under min-max scaling or dragging a regression line. Outliers may be errors to fix or genuine rare events worth keeping, so they warrant inspection rather than automatic deletion.",
    "A value that sits way out on its own, far from where most of the data is.");

  def("feng1",
    "What is tokenisation in NLP?",
    "Splitting text into words or subword tokens",
    ["Chopping each word down to a crude root by stripping off its suffixes", "Mapping each word to a dense vector learned from its usage in context", "Removing very common words such as 'the' and 'is'", "Counting how often each word appears"],
    "Tokenisation",
    "Tokenisation breaks raw text into units (words or subword pieces) - the first step that turns a string into features.",
    "Tokenisation segments text into tokens (words, or subword units like WordPiece or BPE pieces), which downstream steps count, index, or embed. It's the entry point of an NLP pipeline; subword tokenisation helps handle rare and unseen words.",
    "Cut a sentence into pieces (usually words) so the computer can work with them.");

  def("feng1",
    "What is an n-gram in text processing?",
    "A contiguous sequence of n tokens",
    ["A dense vector that places words with similar meanings near each other", "A count of how many distinct words appear in a document", "A word reduced to its dictionary base form", "The rarest token in a document"],
    "N-gram",
    "An n-gram is a run of n consecutive tokens (bigrams are pairs); used as features, they capture short-range word order.",
    "An n-gram is n adjacent tokens - 'New York' is a bigram - so n-gram features let a bag-of-words model capture local phrasing that single words (unigrams) miss. Larger n captures more context but explodes the feature count and sparsity.",
    "A short run of n words in a row, like the two-word phrase 'ice cream'.");

  def("feng1",
    "What is stemming in NLP?",
    "Chopping words to a crude root form",
    ["Reducing a word to its dictionary form using vocabulary and grammar rules", "Splitting a document into individual sentences and then into words", "Removing punctuation and lowercasing the text", "Counting word frequencies"],
    "Stemming",
    "Stemming strips affixes to reach a rough root (studies to studi); it's fast but the stem may not be a real word.",
    "Stemming uses simple rules to cut words to a common root so related forms collapse together (running, runs to run). It's fast but crude - stems can be non-words and distinct meanings may collide - unlike lemmatisation, which returns valid dictionary forms.",
    "Hack the ends off words so 'running' and 'runs' both become the same stub.");

  def("feng1",
    "What is lemmatisation in NLP?",
    "Reducing a word to its dictionary lemma",
    ["Crudely cutting off word endings with rules, ignoring whether the result is a real word", "Grouping documents by their overall topic using word co-occurrence", "Translating words into another language", "Splitting text into tokens"],
    "Lemmatisation",
    "Lemmatisation maps a word to its base dictionary form (its lemma) using vocabulary and morphology: 'better' to 'good', 'ran' to 'run'.",
    "Lemmatisation uses a vocabulary and morphological analysis (often plus part-of-speech) to return a valid dictionary form, so 'ran' and 'running' both map to 'run'. It's more accurate but slower than stemming, whose rule-based cuts can yield non-words.",
    "Turn a word into its proper dictionary form, so 'ran' becomes 'run'.");

  def("feng1",
    "What is a word embedding?",
    "A dense vector representing a word's meaning",
    ["A one-hot column with a single 1 marking which word is present", "A count of how many times a word appears in each document", "A crude root produced by stripping a word's suffixes", "The integer index assigned to a word"],
    "Word embedding",
    "A word embedding is a dense, learned vector where semantically similar words sit close together in the vector space.",
    "Word embeddings (word2vec, GloVe) place each word at a point in a continuous space so that related words are nearby, capturing meaning that sparse one-hot or count features miss. The vectors are learned from how words co-occur in large text corpora.",
    "Represent each word as a list of numbers so words with similar meanings end up near each other.");

  def("interp",
    "What is a Shapley value?",
    "A feature's fair average marginal contribution",
    ["The drop in accuracy when a single feature's values are randomly shuffled", "A simple local model fitted around one prediction to explain it", "The average model prediction taken across the whole dataset", "The weight assigned to a feature by the model"],
    "Shapley value",
    "From cooperative game theory, a Shapley value splits a prediction among features as each feature's average marginal contribution over all orderings.",
    "The Shapley value comes from cooperative game theory: it assigns each player (feature) its average marginal contribution across all possible coalitions, the unique attribution satisfying fairness axioms. SHAP applies this idea to explain model predictions feature by feature.",
    "A fair way, from game theory, to split the credit for a prediction among the features.");

  def("interp",
    "What does model interpretability mean?",
    "How well a human can understand a model's decisions",
    ["How accurately a model predicts on data it was not trained on", "How quickly a model can produce predictions at serving time", "How consistent a model's outputs are when it is retrained on new samples", "How many parameters the model has"],
    "Model interpretability",
    "Interpretability is the degree to which a human can understand the cause of a model's decisions.",
    "Interpretability measures how readily a person can follow why a model produced a given output. Intrinsically interpretable models (linear models, shallow trees) offer it directly; complex models rely on post-hoc explainers such as SHAP or LIME to approximate it.",
    "How easily a person can understand why the model decided what it did.");

  def("imbal",
    "How does anomaly detection reframe a rare-class problem?",
    "As spotting points that deviate from normal",
    ["As generating synthetic minority examples to balance out the classes", "As reweighting the loss so that minority errors are penalised more heavily", "As lowering the decision threshold to catch more positive cases", "As deleting the rare class rows"],
    "Anomaly detection",
    "Anomaly (outlier) detection treats the rare class as deviations from a learned 'normal', useful when positives are scarce or ill-defined.",
    "When one class is extremely rare, anomaly detection models the normal majority and flags points that don't fit, rather than learning a boundary from balanced classes. This suits fraud or fault detection, where anomalies are few, varied, and sometimes unseen during training.",
    "Instead of learning both classes, learn what 'normal' looks like and flag anything that doesn't fit.");
})();
