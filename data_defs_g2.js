/* Definition questions batch g2 (bayes1, trees1, svm1). */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function add(qk, obj) { (Q[qk] = Q[qk] || []).push(obj); D[obj.q] = 1; }

  /* ===================== bayes1 (Naive Bayes) — 10 ===================== */

  add("bayes1", {
    q: "What is Bayes' theorem?",
    choices: [
      "A rule that updates the probability of a hypothesis given new evidence by multiplying its prior by the likelihood of that evidence and dividing by the evidence's overall probability",
      "A rule that assumes every feature contributes exactly equally and simply averages their individual probabilities together, reporting that plain mean as the decision without ever consulting a prior belief or a normalising term",
      "A method that counts how often two events happen to occur together in the data and reports that raw co-occurrence count directly as the final probability, without ever multiplying by a prior or dividing by the evidence term",
      "A technique for drawing the single straight line that best separates two classes by maximising the geometric gap to the nearest points on each side, a boundary rule that ignores any notion of prior or likelihood",
      "A procedure that repeatedly splits the data on the single most informative feature until every resulting group is perfectly pure, then reads the label off the leaf without any probability update at all"
    ],
    explain: "Bayes' theorem states P(H|E) = P(E|H)·P(H) / P(E): it converts a prior belief about a hypothesis into a posterior belief after seeing evidence. The likelihood P(E|H) says how expected the evidence is if the hypothesis holds, and dividing by P(E) normalises the result. It is the mathematical engine underneath every Naive Bayes classifier.",
    simple: "It is a formula for changing your mind with evidence: start with how likely something was, then adjust it up or down based on the new clue you just saw. The stronger and rarer the clue, the bigger the update.",
    widget: {
      type: "curveStatic", title: "Updating belief with evidence",
      world: "One clue arrives; the knob sweeps how strongly that clue points at the hypothesis, and we watch the posterior move off the prior.",
      xlab: "strength of evidence for H →", xs: [0,1,2,3,4], labels: ["none","weak","fair","strong","decisive"], dec: 0, yunit: "%",
      series: [ { name: "posterior P(H|E) (%)", ys: [20, 34, 55, 78, 94] } ],
      knob: { label: "Evidence strength", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With no real evidence the posterior barely moves off the 20% prior.", tone: "info" },
        { max: 3, text: "As the clue becomes more expected under H, the prior gets multiplied up toward a confident posterior.", tone: "info" },
        { max: 4, text: "🤯 Prior × likelihood ÷ evidence — that single reweighting IS Bayes' theorem.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Bayes' theorem", formula: "P(H|E) = P(E|H)·P(H) / P(E)",
        text: "It turns a prior belief into a posterior one by scaling with how well the evidence fits the hypothesis." }
    }
  });

  add("bayes1", {
    q: "In Naive Bayes, what is the 'prior probability' of a class?",
    choices: [
      "The probability of the class before any features are observed, estimated from how common that class is in the training data",
      "The probability of the class computed after every one of a specific case's features has been observed and folded in, read off the fully updated posterior at the very end of the calculation",
      "The chance of seeing one particular feature value given that the class is already known to hold, a per-feature likelihood estimated from the counts inside that single class alone",
      "The overall probability of the observed evidence summed across every possible class, the normalising denominator that makes the class probabilities finally add up to one",
      "The ratio by which one single feature multiplies the running odds in favour of the class, a likelihood factor applied on top of whatever starting belief already existed"
    ],
    explain: "The prior P(class) reflects your belief in a class before you look at any of the current example's features; it is usually just the fraction of training examples in that class. Naive Bayes multiplies this prior by the likelihoods of the observed features to form the posterior. A class that is rare in training starts with a small prior and needs stronger evidence to win.",
    simple: "It is the head start each answer gets before you look at any clues, based only on how common that answer normally is. If 90% of email is spam, spam begins the race in the lead.",
    widget: {
      type: "curveStatic", title: "The head start before any clue",
      world: "No features seen yet; the knob sweeps how common the class is in training, which sets its starting probability.",
      xlab: "class frequency in training →", xs: [0,1,2,3,4], labels: ["5%","20%","50%","80%","95%"], dec: 0, yunit: "%",
      series: [ { name: "prior P(class) (%)", ys: [5, 20, 50, 80, 95] } ],
      knob: { label: "Base rate", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A rare class starts far behind before any evidence arrives.", tone: "info" },
        { max: 3, text: "The more common the class in the data, the higher its starting probability.", tone: "info" },
        { max: 4, text: "🤯 This pre-evidence base rate IS the prior probability.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Prior probability", formula: "P(class) ≈ (# examples in class) / (total examples)",
        text: "It is the belief in a class before seeing any features, read straight off how common the class is." }
    }
  });

  add("bayes1", {
    q: "In Naive Bayes, what is the 'naive independence assumption'?",
    choices: [
      "The assumption that, given the class, every feature is conditionally independent of the others, so their likelihoods can simply be multiplied",
      "The assumption that all classes occur exactly equally often in the world, so the prior term can be dropped entirely and the posterior read straight off the likelihoods alone",
      "The assumption that each and every feature is drawn from the same bell-shaped Gaussian distribution, so one shared mean and variance can describe them all across the classes",
      "The assumption that the training data contains no errors or mislabelled examples at all, so every observed count can be trusted as a perfectly clean estimate of the truth",
      "The assumption that the features are all highly correlated with one another and therefore must be combined into a single joint term before any likelihood is computed"
    ],
    explain: "Naive Bayes treats each feature as conditionally independent of the rest once the class is fixed, which lets it estimate P(features|class) as the product of the individual P(feature|class) terms. Real features are rarely truly independent, so the assumption is 'naive', yet the classifier often works well anyway. This simplification is exactly what makes the model fast and easy to train.",
    simple: "It pretends each clue speaks for itself and none of them lean on each other, so you can just multiply their odds together. It is often untrue, but it keeps the maths simple and usually still works.",
    widget: {
      type: "curveStatic", title: "Multiplying clues as if separate",
      world: "The knob adds more features, each assumed independent given the class, so their evidence multiplies together.",
      xlab: "independent clues combined →", xs: [0,1,2,3,4], labels: ["0","1","2","3","4"], dec: 0, yunit: "%",
      series: [ { name: "posterior for the class (%)", ys: [50, 67, 80, 89, 95] } ],
      knob: { label: "Clues multiplied", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With no extra clue the posterior sits at the prior.", tone: "info" },
        { max: 3, text: "Each clue is multiplied in as if it carried fresh, non-overlapping information.", tone: "info" },
        { max: 4, text: "🤯 Treating clues as conditionally independent and multiplying them IS the naive assumption.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Naive independence assumption", formula: "P(f1,f2,…|C) ≈ P(f1|C)·P(f2|C)·…",
        text: "Given the class, features are treated as independent so their likelihoods just multiply." }
    }
  });

  add("bayes1", {
    q: "In Naive Bayes, what is a 'class-conditional probability'?",
    choices: [
      "The probability of observing a particular feature value given that the example belongs to a specific class, written P(feature | class)",
      "The probability that an example belongs to a given class once all of its features have been observed and multiplied in, the fully updated posterior the classifier reports at the end",
      "The overall probability of a class before any feature at all is taken into account, the base-rate head start read straight off how common that class is across the training set",
      "The probability of the observed evidence averaged over every class in the dataset, the marginal denominator that rescales the numerators so the posteriors sum to one",
      "The fixed probability that the classifier makes a mistake on any given example, an overall error rate estimated once from how often it slips on the held-out data"
    ],
    explain: "A class-conditional probability P(feature|class) measures how likely a given feature value is within a particular class, and it is the model's 'likelihood' term. Naive Bayes estimates one such probability per feature per class from the training counts, then multiplies them under the independence assumption. These conditionals are what distinguish, say, the word 'free' appearing in spam versus in ham.",
    simple: "It answers: if this were spam, how often would I see this exact clue? You learn one such number for every clue inside every class, straight from the training data.",
    widget: {
      type: "curveStatic", title: "How typical a clue is inside a class",
      world: "Fix the class to 'spam'; the knob sweeps how often a chosen word shows up among spam messages.",
      xlab: "word frequency within the class →", xs: [0,1,2,3,4], labels: ["rare","low","mid","high","typical"], dec: 0, yunit: "%",
      series: [ { name: "P(word | spam) (%)", ys: [4, 18, 40, 66, 88] } ],
      knob: { label: "Within-class rate", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A word almost never seen in spam gives a tiny class-conditional value.", tone: "info" },
        { max: 3, text: "The more common the word is among spam, the larger P(word | spam).", tone: "info" },
        { max: 4, text: "🤯 This 'how likely inside the class' number IS the class-conditional probability.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Class-conditional probability", formula: "P(feature | class)",
        text: "The likelihood of a feature value within one specific class, learned from that class's training counts." }
    }
  });

  add("bayes1", {
    q: "In Naive Bayes, what is Laplace (additive) smoothing?",
    choices: [
      "Adding a small constant to every feature count so that no probability is ever exactly zero, preventing an unseen value from wiping out a class",
      "Rescaling every feature value so that it lies between exactly zero and one before training the classifier, a normalisation step meant to put all the counts on one common scale",
      "Averaging the predictions of many separately trained Naive Bayes models together so that their combined variance drops and the final class estimate becomes steadier on new data",
      "Removing the very rarest features from the vocabulary so that the model only ever keeps the handful of most informative clues and never wastes probability mass on noise",
      "Replacing any missing feature value with the mean of the observed values in that same column, an imputation trick that fills gaps before the counts are turned into probabilities"
    ],
    explain: "Laplace or additive smoothing adds a pseudo-count (often 1) to every observed count before turning counts into probabilities, so a feature value that never appeared with a class still gets a small non-zero likelihood. Without it, a single unseen word would multiply the whole class probability to zero. The smoothing parameter alpha controls how strong this nudge toward uniformity is.",
    simple: "It pretends you saw every clue at least once, so a brand-new word can't slam a class down to zero probability. A tiny fake count keeps the maths from breaking.",
    widget: {
      type: "curveStatic", title: "Rescuing zero-count clues",
      world: "A word never seen with a class; the knob raises the smoothing constant added to every count.",
      xlab: "smoothing amount α →", xs: [0,1,2,3,4], labels: ["0","0.1","0.5","1","2"], dec: 0, yunit: "%",
      series: [ { name: "P(unseen word | class) (%)", ys: [0, 6, 18, 28, 40] } ],
      knob: { label: "Smoothing α", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With α = 0 an unseen word gives probability zero and kills the class outright.", tone: "info" },
        { max: 3, text: "Adding a pseudo-count lifts the estimate off zero so the class survives.", tone: "info" },
        { max: 4, text: "🤯 That added constant guarding against zeros IS Laplace smoothing.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Laplace (additive) smoothing", formula: "P = (count + α) / (total + α·K)",
        text: "A pseudo-count added to every tally so no feature value ever gets probability zero." }
    }
  });

  add("bayes1", {
    q: "What is MultinomialNB (Multinomial Naive Bayes)?",
    choices: [
      "A Naive Bayes variant for discrete count features, such as word counts, that models how often each feature occurs in a class",
      "A Naive Bayes variant that assumes each feature follows a continuous bell-shaped Gaussian distribution, learning a separate mean and variance per feature per class to score real-valued measurements",
      "A Naive Bayes variant built only for binary present-or-absent features that actively penalises the features that are absent, adding a term for every word that fails to appear in the document",
      "A boosting method that combines many deliberately shallow decision trees, each fitted in turn on the residual errors left over by the ensemble that was built before it",
      "A distance-based classifier that stores the whole training set and simply votes among the labels of the nearest examples to whatever new point it is asked to classify"
    ],
    explain: "MultinomialNB is the Naive Bayes flavour built for count data, most famously word counts in text classification: it estimates the probability of each feature (term) within each class from how many times it occurs. It works with a multinomial event model and pairs naturally with bag-of-words or TF-IDF features. It differs from GaussianNB (continuous features) and BernoulliNB (binary features).",
    simple: "It is the Naive Bayes you use when your features are counts, like how many times each word appears in a document. It learns how frequently each word shows up in each category.",
    widget: {
      type: "curveStatic", title: "Counting words per class",
      world: "The knob sweeps how many times a signature word appears in a document, feeding the multinomial count model.",
      xlab: "count of a class-signature word →", xs: [0,1,2,3,4], labels: ["0","1","3","6","10"], dec: 0, yunit: "%",
      series: [ { name: "P(class | counts) (%)", ys: [40, 55, 72, 86, 95] } ],
      knob: { label: "Word count", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Zero occurrences leave the class probability near its prior.", tone: "info" },
        { max: 3, text: "Each additional count of a telling word pushes the class probability up.", tone: "info" },
        { max: 4, text: "🤯 Modelling discrete counts like these IS MultinomialNB's job.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "MultinomialNB", formula: "Naive Bayes over count features (e.g. word counts)",
        text: "The count-based Naive Bayes variant, the default choice for bag-of-words text classification." }
    }
  });

  add("bayes1", {
    q: "What is GaussianNB (Gaussian Naive Bayes)?",
    choices: [
      "A Naive Bayes variant for continuous features that models each feature within a class as a normal (Gaussian) distribution with its own mean and variance",
      "A Naive Bayes variant that expects only integer word counts and models them with a multinomial distribution, estimating the frequency of each term inside each class from the raw training tallies",
      "A Naive Bayes variant that only ever accepts binary yes-or-no features, adding an explicit penalty term for each attribute that is absent as well as each one that is present in the example",
      "A clustering method that fits a mixture of several Gaussian blobs to entirely unlabelled data, assigning each point a soft membership across the components without ever using a class label",
      "A regression method that fits a single straight line through the points by minimising the summed squared error, producing a continuous numeric prediction rather than a discrete class"
    ],
    explain: "GaussianNB assumes each continuous feature, conditioned on the class, is normally distributed, so it learns a mean and variance per feature per class and evaluates the Gaussian density to get likelihoods. This makes it suitable for real-valued measurements rather than counts. It keeps the same independence assumption and prior-times-likelihood machinery as any Naive Bayes.",
    simple: "It is the Naive Bayes for measured numbers like height or temperature. For each class it learns the average and spread of each number and uses a bell curve to score new values.",
    widget: {
      type: "curveStatic", title: "Bell-curve fit per feature",
      world: "The knob moves a measured value from a class's mean outward toward its tails on the fitted Gaussian.",
      xlab: "value's distance from class mean →", xs: [0,1,2,3,4], labels: ["0σ","1σ","2σ","3σ","4σ"], dec: 0, yunit: "%",
      series: [ { name: "Gaussian likelihood (%)", ys: [100, 61, 14, 1, 0] } ],
      knob: { label: "Distance from mean", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A value near the class mean gets a high Gaussian likelihood.", tone: "info" },
        { max: 3, text: "As the value drifts into the tails, the bell-curve density falls fast.", tone: "info" },
        { max: 4, text: "🤯 Scoring continuous features with a per-class bell curve IS GaussianNB.", tone: "wow" }
      ],
      extreme: { at: "min" },
      reveal: { name: "GaussianNB", formula: "P(x | class) = Normal(x; μ_class, σ²_class)",
        text: "The Naive Bayes variant that models continuous features as class-specific bell curves." }
    }
  });

  add("bayes1", {
    q: "In Naive Bayes, what is the 'evidence' (marginal likelihood) term?",
    choices: [
      "The overall probability of the observed features, summed over all classes, that appears in the denominator and normalises the posteriors",
      "The probability of a single class before any features are seen at all, the base-rate head start read straight off how common that class happens to be in the training data",
      "The likelihood of observing one particular feature value given that the class is already fixed and known, a per-feature term estimated from the counts inside that class alone",
      "The final class label that the model ultimately outputs for an example, the single winning hypothesis chosen once the posterior has been compared across every candidate class",
      "The count of training examples that belong to the largest majority class, a raw tally used to decide which label the model should fall back on when no clue is available"
    ],
    explain: "The evidence P(features) = Σ_class P(features|class)·P(class) is the denominator of Bayes' theorem; it is the total probability of the observed data across every hypothesis. It rescales the numerators so the posteriors across classes sum to one. Because it is the same constant for every class, Naive Bayes can pick the winning class by comparing numerators alone and ignore it.",
    simple: "It is the grand total probability of the clues you saw, adding up every possible answer. It divides the result so all the class probabilities add up to 100%.",
    widget: {
      type: "curveStatic", title: "The normalising grand total",
      world: "The knob adds more candidate classes, each contributing its share to the total probability of the evidence.",
      xlab: "classes summed into the total →", xs: [0,1,2,3,4], labels: ["1","2","3","4","5"], dec: 0, yunit: "%",
      series: [ { name: "share of evidence covered (%)", ys: [40, 62, 78, 90, 100] } ],
      knob: { label: "Classes summed", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "One class alone accounts for only part of the total probability.", tone: "info" },
        { max: 3, text: "Summing more classes' contributions builds up the full evidence total.", tone: "info" },
        { max: 4, text: "🤯 That sum over all classes in the denominator IS the evidence term.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Evidence (marginal likelihood)", formula: "P(E) = Σ_c P(E | c)·P(c)",
        text: "The total probability of the features over all classes, used to normalise the posteriors." }
    }
  });

  add("bayes1", {
    q: "In Bayesian classification, what is the MAP (maximum a posteriori) estimate?",
    choices: [
      "The class with the highest posterior probability, which is the label Naive Bayes ultimately predicts",
      "The class carrying the highest prior probability, chosen before any features are seen, using only the base rates",
      "The single feature value that occurs most frequently across the whole training set, picked out by raw count alone",
      "The plain average of the posterior probabilities taken over all of the candidate classes rather than the maximum",
      "The class that maximises the likelihood term alone while deliberately ignoring the prior head start entirely"
    ],
    explain: "The MAP estimate picks the hypothesis (class) that maximises the posterior P(class|features), i.e. the argmax over classes of prior times likelihood. It is exactly the decision rule Naive Bayes uses to output a single label. When priors are equal it reduces to the maximum-likelihood choice, but in general it incorporates the prior.",
    simple: "It is the winner: after weighing the clues and the head start, you pick the answer with the highest final probability. That most-probable class is what the model announces.",
    widget: {
      type: "curveStatic", title: "Picking the most probable class",
      world: "The knob sweeps how far the top class's posterior pulls ahead of the runner-up before we declare a winner.",
      xlab: "lead of top class's posterior →", xs: [0,1,2,3,4], labels: ["tie","slim","clear","big","huge"], dec: 0, yunit: "%",
      series: [ { name: "confidence in the MAP pick (%)", ys: [50, 60, 74, 87, 97] } ],
      knob: { label: "Posterior lead", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "When two classes tie on posterior, the MAP choice is barely decided.", tone: "info" },
        { max: 3, text: "As one class's posterior pulls ahead, it becomes the clear argmax.", tone: "info" },
        { max: 4, text: "🤯 Taking the class with the largest posterior IS the MAP estimate.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "MAP estimate", formula: "class* = argmax_c P(c | features)",
        text: "The class with the highest posterior probability — Naive Bayes's final prediction rule." }
    }
  });

  add("bayes1", {
    q: "In text classification, what is the 'bag-of-words' representation?",
    choices: [
      "A representation of a document as the counts of the words it contains, ignoring word order and grammar",
      "A representation that carefully preserves the exact sequence and grammar of every sentence in a document, keeping word order intact so that phrasing and syntax are fully retained",
      "A representation that stores only the single most frequent word found in each document and throws away every other term, keeping just that one headline token as the whole feature",
      "A representation that maps each document to a fixed dense vector learned by a neural network, packing its meaning into a few hundred continuous coordinates rather than plain counts",
      "A representation that records the pairwise distances between every pair of documents in a corpus, describing each text only by how far it sits from all of the others"
    ],
    explain: "Bag-of-words turns a document into a vector of word counts (or presence flags), discarding order, syntax and position so only which words appear and how often matters. It is the classic feature representation feeding MultinomialNB and other text classifiers. Its simplicity is its strength and its limitation: fast to compute, but blind to phrasing and context.",
    simple: "You dump all the words of a document into a bag and just count them, forgetting the order they came in. 'Dog bites man' and 'man bites dog' look identical this way.",
    widget: {
      type: "curveStatic", title: "Documents as word counts",
      world: "The knob grows the vocabulary tracked, expanding the count vector that stands in for each document.",
      xlab: "vocabulary size tracked →", xs: [0,1,2,3,4], labels: ["10","100","1k","5k","20k"], dec: 0, yunit: "%",
      series: [ { name: "text classifier accuracy (%)", ys: [58, 72, 84, 90, 92] } ],
      knob: { label: "Vocabulary size", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A tiny vocabulary of word counts captures little of the document.", tone: "info" },
        { max: 3, text: "Counting more distinct words gives the classifier richer signals, order aside.", tone: "info" },
        { max: 4, text: "🤯 Representing a document purely by its word counts IS bag-of-words.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Bag-of-words", formula: "document → vector of word counts (order discarded)",
        text: "A text is reduced to how often each word appears, ignoring sequence and grammar." }
    }
  });

  /* ===================== trees1 (Decision trees) — 10 ===================== */

  add("trees1", {
    q: "What is a decision tree?",
    choices: [
      "A model that predicts by following a series of yes/no tests on features from a root down to a leaf that gives the answer",
      "A model that draws the single straight line best separating two classes with the widest possible gap to the nearest points, fixing that boundary from only the handful of borderline examples",
      "A model that stores every training point and classifies a new one by averaging the labels of its nearest neighbours, letting the closest few examples cast the deciding vote",
      "A model that multiplies together the independent probabilities of each feature to score every class, treating the clues as separate and picking whichever class ends up most probable",
      "A model that repeatedly nudges a set of weights by gradient descent to minimise a smooth loss function, sliding them a little downhill on each pass until the error settles"
    ],
    explain: "A decision tree is a flowchart-like model: each internal node asks a test about one feature, each branch is an outcome of that test, and each leaf carries a prediction. To classify an example you route it from the root through the tests until it lands in a leaf. Trees are easy to read and can capture non-linear, interaction-heavy patterns.",
    simple: "It is like a game of twenty questions that ends in an answer. Each step asks a simple yes/no about your data and sends you down a branch until you reach a final label.",
    widget: {
      type: "curveStatic", title: "Answering by asking questions",
      world: "The knob deepens the tree, letting it ask more yes/no questions before it commits to an answer at a leaf.",
      xlab: "questions asked before deciding →", xs: [0,1,2,3,4], labels: ["0","1","2","4","8"], dec: 0, yunit: "%",
      series: [ { name: "training fit (%)", ys: [55, 68, 79, 90, 98] } ],
      knob: { label: "Questions asked", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With no questions the tree just guesses the majority class.", tone: "info" },
        { max: 3, text: "Each extra yes/no test carves the data into purer groups.", tone: "info" },
        { max: 4, text: "🤯 A cascade of feature tests ending in leaf answers IS a decision tree.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Decision tree", formula: "root → feature tests → leaf prediction",
        text: "A branching set of yes/no questions that routes each example to a leaf holding the answer." }
    }
  });

  add("trees1", {
    q: "In a decision tree, what is a 'leaf' node?",
    choices: [
      "A terminal node with no further splits that assigns the final prediction to every example reaching it",
      "The single top node where the very first split of the whole dataset is made, the root from which every branch of the tree ultimately descends before any answer is reached",
      "An internal decision node that applies a feature test and sends the arriving examples down two separate branches, routing them onward rather than ever handing out a final label",
      "The particular threshold value chosen to divide a numeric feature at a split, the cut point such as age below thirty that decides which branch each example is sent down",
      "The numeric measure of how mixed the class labels happen to be within a node, high for an even blend and zero once every example there shares a single class"
    ],
    explain: "A leaf (terminal node) is where a decision tree stops branching; every example that reaches it receives the leaf's prediction, typically the majority class or average value of the training points there. Leaves are the tree's output layer, while internal nodes only route examples. The purity of leaves is what training tries to improve.",
    simple: "It is the end of a branch where the tree stops asking questions and just gives its answer. Whoever lands there gets that leaf's label.",
    widget: {
      type: "curveStatic", title: "Where the answer is given",
      world: "The knob grows the tree, and we track how pure the leaf each example lands in becomes.",
      xlab: "tree depth →", xs: [0,1,2,3,4], labels: ["0","1","2","3","4"], dec: 0, yunit: "%",
      series: [ { name: "average leaf purity (%)", ys: [52, 66, 78, 88, 95] } ],
      knob: { label: "Depth", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A shallow tree's single leaf lumps many classes together.", tone: "info" },
        { max: 3, text: "Deeper splits create leaves that are more and more one-class.", tone: "info" },
        { max: 4, text: "🤯 The terminal node handing out the final label IS a leaf.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Leaf node", formula: "terminal node → assigns final prediction",
        text: "The end of a branch where the tree stops and outputs its answer for arriving examples." }
    }
  });

  add("trees1", {
    q: "In a decision tree, what is a 'split'?",
    choices: [
      "The test on a single feature at a node that divides the arriving examples into subgroups sent down different branches",
      "The final label attached to a terminal node at the very bottom of the tree, the prediction handed to every example that finishes its journey and lands in that leaf",
      "The removal of branches that add little predictive value once the tree has been fully grown, a pruning step that trims back overgrown subtrees to fight overfitting",
      "The number of levels sitting between the root and the deepest leaf of the tree, a depth count that measures how tall and elaborate the whole structure has become",
      "The fraction of examples that the finished tree ends up classifying incorrectly overall, an error rate read off the mistakes it makes across the held-out data"
    ],
    explain: "A split is the decision rule at an internal node, such as 'age < 30?', that partitions the examples reaching that node into child groups. Tree-growing algorithms pick each split to make the resulting children as pure as possible according to a criterion like Gini or entropy. Chaining many splits is how a tree carves the feature space into regions.",
    simple: "It is one question the tree asks that divides your data into groups, like sorting people by whether they are over 30. Good splits put similar labels together.",
    widget: {
      type: "curveStatic", title: "Dividing data at a node",
      world: "The knob sweeps how well-chosen the split is, from a useless cut to one that cleanly separates the classes.",
      xlab: "quality of the chosen split →", xs: [0,1,2,3,4], labels: ["random","poor","ok","good","clean"], dec: 0, yunit: "%",
      series: [ { name: "purity gain from split (%)", ys: [2, 15, 34, 58, 82] } ],
      knob: { label: "Split quality", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A random cut barely separates the classes at all.", tone: "info" },
        { max: 3, text: "A better-chosen feature and threshold send more like-with-like down each branch.", tone: "info" },
        { max: 4, text: "🤯 That feature test partitioning the data at a node IS a split.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Split", formula: "node test on one feature → child subgroups",
        text: "The rule at a node that partitions arriving examples into branches, chosen to purify the children." }
    }
  });

  add("trees1", {
    q: "In a decision tree, what is 'node impurity'?",
    choices: [
      "A measure of how mixed the class labels are within a node, which is high when classes are evenly blended and zero when all examples share one class",
      "The raw number of training examples that happen to pass through a node on their way down to a leaf, a headcount of the traffic flowing through that point in the tree",
      "The depth of the node measured purely as its distance from the root, counting how many splits had to be applied before an example could ever arrive at it",
      "The probability that the node's feature test ends up being applied in the wrong order relative to the other tests, a sequencing error that scrambles the routing of examples",
      "The count of features that are never once used anywhere in the whole tree, a tally of the unused columns that no split ever bothered to threshold on"
    ],
    explain: "Impurity quantifies how heterogeneous the labels are at a node: a node where every example is the same class has zero impurity, while an even 50/50 mix is maximally impure. Criteria like Gini impurity and entropy put a number on it. Splitting aims to reduce total impurity, so children are purer than their parent.",
    simple: "It measures how mixed-up the labels are in a group. All one class is perfectly pure; a 50/50 jumble is as impure as it gets.",
    widget: {
      type: "curveStatic", title: "How mixed the labels are",
      world: "The knob shifts a node's class mix from all-one-class toward an even split, tracking impurity.",
      xlab: "class balance in the node →", xs: [0,1,2,3,4], labels: ["100/0","90/10","70/30","55/45","50/50"], dec: 0, yunit: "%",
      series: [ { name: "impurity (Gini ×100)", ys: [0, 18, 42, 50, 50] } ],
      knob: { label: "Class mix", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A one-class node has zero impurity — perfectly pure.", tone: "info" },
        { max: 3, text: "The more evenly the classes are blended, the higher the impurity.", tone: "info" },
        { max: 4, text: "🤯 This mixed-ness of labels in a node IS its impurity.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Node impurity", formula: "0 when one class, max at an even class mix",
        text: "How blended the labels are in a node; splits try to drive it down toward zero." }
    }
  });

  add("trees1", {
    q: "In a decision tree, what is 'Gini impurity'?",
    choices: [
      "The probability that a randomly chosen example in a node would be misclassified if labelled by the node's class distribution, equal to 1 minus the sum of squared class proportions",
      "The total number of training examples that fall into a node during training, a plain headcount of the points routed there that grows larger the nearer the node sits to the root of the tree",
      "The amount of information gained about the label by learning the value of one feature, equal to the parent node's entropy minus the size-weighted entropy of the children the split produces",
      "The maximum number of levels the tree is permitted to grow to, a ceiling set in advance that caps how deep and elaborate the branching may become before splitting is forced to stop",
      "The average path length measured from the root down to every leaf in the finished tree, a mean depth that summarises how many feature tests a typical example must pass through"
    ],
    explain: "Gini impurity is a specific impurity measure, 1 − Σ p_k², where p_k is the proportion of class k in the node. It equals the chance of mislabelling a random example if you guessed labels according to the node's class frequencies. It is zero for a pure node and is CART's default splitting criterion, favouring splits that lower it most.",
    simple: "It is one way to score how mixed a group is: the odds you would mislabel a random member by guessing from the group's makeup. Zero means everyone shares one class.",
    widget: {
      type: "curveStatic", title: "Odds of a wrong random guess",
      world: "The knob moves a node from pure toward a 50/50 mix, tracking the Gini impurity score.",
      xlab: "class balance in the node →", xs: [0,1,2,3,4], labels: ["100/0","80/20","65/35","55/45","50/50"], dec: 2, yunit: "",
      series: [ { name: "Gini impurity", ys: [0, 0.32, 0.46, 0.50, 0.50] } ],
      knob: { label: "Class mix", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A pure node scores Gini 0 — no chance of a wrong guess.", tone: "info" },
        { max: 3, text: "As the mix evens out, 1 − Σp² climbs toward its 0.5 maximum for two classes.", tone: "info" },
        { max: 4, text: "🤯 That 1 − Σp² misclassification chance IS Gini impurity.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Gini impurity", formula: "Gini = 1 − Σ_k p_k²",
        text: "The chance of mislabelling a random example from the node's own class mix." }
    }
  });

  add("trees1", {
    q: "In a decision tree, what is 'entropy'?",
    choices: [
      "An impurity measure of the disorder in a node's class labels, maximal when classes are evenly mixed and zero when the node is pure",
      "The depth of the single deepest leaf in the finished tree, counting how many feature tests had to be chained together before that longest branch finally reached its answer",
      "The total count of splits performed while the tree was being grown, a tally of every feature test added at every internal node from the root all the way down to the leaves",
      "The proportion of the data deliberately reserved for validating the tree, the held-out slice used to check its accuracy rather than to choose any of the splits during training",
      "The threshold value above which a numeric feature triggers the right-hand branch, the cut point at a node that decides whether an arriving example is sent left or right"
    ],
    explain: "Entropy, −Σ p_k log₂ p_k, measures the uncertainty or disorder in a node's label distribution: it is zero when all examples share one class and peaks (1 bit for two equal classes) at an even mix. Decision trees can use it as the impurity criterion, choosing splits that reduce it. The reduction in entropy from a split is called information gain.",
    simple: "It measures how disordered a group's labels are, in bits. All one class is zero disorder; a perfect 50/50 mix is the most disordered.",
    widget: {
      type: "curveStatic", title: "Disorder in the labels",
      world: "The knob shifts a two-class node from pure toward an even split, tracking its entropy in bits.",
      xlab: "class balance in the node →", xs: [0,1,2,3,4], labels: ["100/0","85/15","70/30","60/40","50/50"], dec: 2, yunit: "bits",
      series: [ { name: "entropy (bits)", ys: [0, 0.61, 0.88, 0.97, 1.00] } ],
      knob: { label: "Class mix", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A pure node has zero entropy — no uncertainty about the label.", tone: "info" },
        { max: 3, text: "The more even the mix, the more bits of disorder the node holds.", tone: "info" },
        { max: 4, text: "🤯 This −Σp·log p disorder of the labels IS entropy.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Entropy", formula: "H = −Σ_k p_k·log₂ p_k",
        text: "A measure of label disorder in a node, peaking at an even class mix and zero when pure." }
    }
  });

  add("trees1", {
    q: "In a decision tree, what is 'information gain'?",
    choices: [
      "The reduction in impurity (such as entropy) achieved by a split, equal to the parent's impurity minus the weighted impurity of its children",
      "The total number of features made available for the tree to split on, a count of the candidate columns the algorithm may choose among when deciding each node's test",
      "The count of examples correctly classified by the finished tree, a raw tally of the points it labels right that is read off the data once all the splitting is done",
      "The depth at which the tree first manages to reach a perfectly pure leaf, counting how many chained feature tests it took before one branch became fully one-class",
      "The probability that one feature test happens to be applied before another one in the routing order, a sequencing chance that governs which split an example meets first"
    ],
    explain: "Information gain scores a candidate split by how much it lowers impurity: parent impurity minus the size-weighted average impurity of the resulting children. A split that produces much purer children has high gain, so tree algorithms greedily choose the split with the largest gain at each node. With entropy as the impurity, it is literally the bits of uncertainty removed.",
    simple: "It is how much cleaner a split makes your groups — how much confusion it removes. The tree picks the question that gains the most clarity at each step.",
    widget: {
      type: "curveStatic", title: "Clarity a split buys",
      world: "The knob sweeps how much purer a split makes the children versus the parent node.",
      xlab: "purity improvement of the split →", xs: [0,1,2,3,4], labels: ["none","tiny","some","large","max"], dec: 2, yunit: "bits",
      series: [ { name: "information gain (bits)", ys: [0.00, 0.12, 0.34, 0.62, 0.90] } ],
      knob: { label: "Split improvement", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A split that leaves children as mixed as the parent gains nothing.", tone: "info" },
        { max: 3, text: "The purer a split makes the children, the more impurity it removes.", tone: "info" },
        { max: 4, text: "🤯 Parent impurity minus children's impurity IS information gain.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Information gain", formula: "IG = impurity(parent) − Σ (n_child/n)·impurity(child)",
        text: "The drop in impurity a split produces; trees greedily pick the split with the most." }
    }
  });

  add("trees1", {
    q: "In a decision tree, what does the 'max_depth' hyperparameter control?",
    choices: [
      "The maximum number of levels of splits allowed from the root, capping how deep and complex the tree can grow",
      "The minimum number of examples a node must still hold before the algorithm is allowed to split it any further, a floor that stops tiny groups from being carved up",
      "The number of features randomly sampled as candidates at each split, a subset drawn afresh at every node so that no single dominant column controls the whole tree",
      "The impurity criterion, such as Gini or entropy, used to score and compare the candidate splits at a node, deciding which feature test purifies the children the most",
      "The fraction of the training data deliberately held out for pruning the tree after it has been grown, the slice used to decide which weak branches should be trimmed away"
    ],
    explain: "max_depth limits how many layers of splits the tree may have below the root; a small value forces a shallow, simpler tree while a large value lets it grow deep and fit fine detail. It is a key regularisation knob: too deep and the tree overfits, too shallow and it underfits. It caps complexity independently of how the data happens to split.",
    simple: "It sets how many rounds of questions the tree is allowed to ask. Keep it small and the tree stays simple; let it grow tall and it can memorise the training data.",
    widget: {
      type: "curveStatic", title: "Capping how deep it grows",
      world: "The knob raises the allowed depth, and we watch test accuracy rise then fall as the tree overfits.",
      xlab: "max_depth allowed →", xs: [0,1,2,3,4], labels: ["1","3","5","10","20"], dec: 0, yunit: "%",
      series: [ { name: "test accuracy (%)", ys: [68, 82, 88, 84, 76] } ],
      knob: { label: "max_depth", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A very shallow cap underfits — too few questions to separate the classes.", tone: "info" },
        { max: 3, text: "Allowing more depth improves fit up to a point.", tone: "info" },
        { max: 4, text: "🤯 That cap on how many split-levels are allowed IS max_depth.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "max_depth", formula: "cap on levels of splits below the root",
        text: "A limit on tree depth that trades underfitting (too shallow) against overfitting (too deep)." }
    }
  });

  add("trees1", {
    q: "In decision-tree learning, what is 'greedy splitting'?",
    choices: [
      "Choosing the locally best split at each node without reconsidering earlier choices, rather than searching for the globally optimal tree",
      "Exhaustively growing every possible tree that the features permit and then keeping only the single one that scores the highest test accuracy, a global search over all structures",
      "Splitting always and only on whichever feature currently has the most missing values first, prioritising the gappiest column at every node regardless of how much it purifies anything",
      "Removing branches from the tree after it has finished training, snipping them back one by one until the validation accuracy stops improving, a post-hoc pruning rather than a growing rule",
      "Assigning the plain majority class to every single leaf regardless of the particular splits sitting above it, ignoring the feature tests and labelling purely by the overall base rate"
    ],
    explain: "Standard tree algorithms are greedy: at each node they pick the single split that most reduces impurity right now, then move on, never backtracking to revise a chosen split. Finding the truly optimal tree is computationally intractable, so this locally optimal, step-by-step strategy is used instead. It is fast but can miss combinations a global search would find.",
    simple: "The tree grabs the best-looking question at each step and never looks back. It is quick, though the best move now isn't always best for the whole tree.",
    widget: {
      type: "curveStatic", title: "Best move at each step",
      world: "The knob follows the tree as it greedily adds the single best split at each successive node.",
      xlab: "greedy splits added in sequence →", xs: [0,1,2,3,4], labels: ["0","1","2","3","4"], dec: 0, yunit: "%",
      series: [ { name: "impurity removed so far (%)", ys: [0, 38, 62, 79, 90] } ],
      knob: { label: "Splits added", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Before any split, no impurity has been removed.", tone: "info" },
        { max: 3, text: "Each node grabs the locally best split and never revisits earlier ones.", tone: "info" },
        { max: 4, text: "🤯 Taking the locally best split without backtracking IS greedy splitting.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Greedy splitting", formula: "pick the best split now; never backtrack",
        text: "Trees are built by locally optimal choices at each node, not a global search." }
    }
  });

  add("trees1", {
    q: "In a decision tree, what does an 'axis-aligned decision boundary' mean?",
    choices: [
      "A boundary made of horizontal and vertical cuts, because each split thresholds a single feature at a time",
      "A boundary that can bend into any smooth curve fitted through the data points, flexing freely in every direction to trace whatever winding shape best separates the two classes",
      "A single straight line drawn at an arbitrary slanted angle chosen to separate the classes, tilted however the geometry demands rather than being locked to the horizontal or vertical",
      "A boundary defined entirely by the distance to the nearest training example, so that each new point is labelled by whichever stored example it happens to sit closest to",
      "A boundary that follows the direction of greatest variance found in the data, aligning itself along the principal axis that the spread of the points stretches out the most"
    ],
    explain: "Because each split tests one feature against a threshold (e.g. x < 3), a decision tree carves the feature space with cuts perpendicular to one axis at a time. The overall boundary is therefore a staircase of axis-parallel segments rather than a slanted line or curve. This is why trees can approximate diagonal boundaries only in blocky steps.",
    simple: "Every question splits on just one feature, so the tree draws only straight up-down or left-right lines. A slanted boundary comes out looking like a staircase of little steps.",
    widget: {
      type: "curveStatic", title: "Boundaries built from straight cuts",
      world: "The knob adds more single-feature splits, and the blocky staircase creeps closer to a true diagonal boundary.",
      xlab: "axis-aligned cuts used →", xs: [0,1,2,3,4], labels: ["1","2","4","8","16"], dec: 0, yunit: "%",
      series: [ { name: "match to a diagonal boundary (%)", ys: [55, 68, 80, 89, 95] } ],
      knob: { label: "Cuts used", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A single vertical or horizontal cut can't follow a slanted boundary.", tone: "info" },
        { max: 3, text: "Stacking more single-feature cuts builds a finer staircase.", tone: "info" },
        { max: 4, text: "🤯 Boundaries made only of horizontal/vertical cuts ARE axis-aligned.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Axis-aligned decision boundary", formula: "each split thresholds one feature → perpendicular cuts",
        text: "Trees split one feature at a time, so their boundaries are staircases of axis-parallel segments." }
    }
  });

  /* ===================== svm1 (Support Vector Machines) — 10 ===================== */

  add("svm1", {
    q: "What is a support vector machine?",
    choices: [
      "A classifier that separates classes with the hyperplane placed to leave the widest possible margin to the nearest points of each class",
      "A classifier that follows a branching chain of yes-or-no feature tests from a root node down to a leaf, routing each example through the questions until it lands on a final label",
      "A classifier that multiplies together the independent probabilities of each feature to score every class, treating the clues as separate and picking whichever class ends up most probable",
      "A classifier that stores the whole training set and averages the labels of the k nearest points to a query, letting its closest neighbours cast the deciding vote on its class",
      "A classifier that fits a smooth S-shaped logistic curve to model the probability of a class, squashing a weighted sum of the features through a sigmoid to produce that estimate"
    ],
    explain: "A support vector machine finds the decision boundary (hyperplane) that maximises the margin, the distance to the closest training points of either class. Only those closest points, the support vectors, determine the boundary. Kernels let the same idea produce non-linear boundaries by working in a higher-dimensional space.",
    simple: "It draws the dividing line that sits as far as possible from the closest examples of each class, giving the widest safety gap. Only the borderline points really decide where it goes.",
    widget: {
      type: "curveStatic", title: "The widest safe divider",
      world: "The knob widens the gap the SVM insists on keeping between the classes and their separating line.",
      xlab: "margin width the SVM enforces →", xs: [0,1,2,3,4], labels: ["none","narrow","med","wide","max"], dec: 0, yunit: "%",
      series: [ { name: "test accuracy (%)", ys: [70, 80, 88, 91, 89] } ],
      knob: { label: "Margin width", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A boundary hugging the points generalises poorly.", tone: "info" },
        { max: 3, text: "Pushing the line to leave a wide margin improves robustness on new data.", tone: "info" },
        { max: 4, text: "🤯 The maximum-margin separating hyperplane IS a support vector machine.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Support vector machine", formula: "maximise the margin around the separating hyperplane",
        text: "A classifier that separates classes with the widest-margin boundary, fixed by the closest points." }
    }
  });

  add("svm1", {
    q: "In an SVM, what is the 'separating hyperplane'?",
    choices: [
      "The flat decision surface the SVM places between the classes, on one side of which examples are assigned to one class and on the other to the other",
      "The small set of training points that lie closest to the boundary and pin it firmly in place, the critical examples on the margin's edge that alone determine where the surface sits",
      "The width of the empty gap the model deliberately keeps between the two classes, the buffer stretching from the boundary out to the nearest points that the SVM works to maximise",
      "The function that maps the original features up into a higher-dimensional space, letting a curved split in the input become a flat separation once the coordinates have been transformed",
      "The penalty applied to each example that falls on the wrong side of the margin, a slack cost scaled by the C parameter that the training procedure tries to keep as small as it can"
    ],
    explain: "The separating hyperplane is the SVM's decision boundary: a point in 1-D, a line in 2-D, a plane in 3-D, and a flat 'hyperplane' in higher dimensions. Examples are classified by which side of it they fall on. The SVM chooses the particular hyperplane that maximises the margin to the nearest points.",
    simple: "It is the flat divider the model puts between the two groups. Land on one side and you're class A, on the other you're class B.",
    widget: {
      type: "curveStatic", title: "The flat class divider",
      world: "The knob rotates and shifts the candidate hyperplane toward the orientation that best separates the classes.",
      xlab: "how well the plane separates classes →", xs: [0,1,2,3,4], labels: ["bad","poor","ok","good","best"], dec: 0, yunit: "%",
      series: [ { name: "points correctly split (%)", ys: [52, 66, 78, 90, 98] } ],
      knob: { label: "Plane orientation", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A badly placed plane splits the classes almost at random.", tone: "info" },
        { max: 3, text: "Rotating it toward the true divide separates more points correctly.", tone: "info" },
        { max: 4, text: "🤯 The flat surface dividing the classes IS the separating hyperplane.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Separating hyperplane", formula: "w·x + b = 0",
        text: "The flat decision surface of an SVM; each example's class is set by which side it falls on." }
    }
  });

  add("svm1", {
    q: "In an SVM, what is the 'margin'?",
    choices: [
      "The width of the empty band between the separating hyperplane and the nearest training points of either class, which the SVM tries to maximise",
      "The fraction of training examples the model ends up classifying incorrectly, an overall error rate read off the mistakes it makes rather than any distance to the boundary",
      "The penalty term added to the objective for each misclassified point during training, a slack cost scaled by C that the optimiser tries to keep small while fitting the boundary",
      "The total number of features used to describe each example, a dimension count of the input vector that fixes how many coordinates the separating surface must live within",
      "The particular curve that the chosen kernel function fits through the data, the winding shape a non-linear kernel traces as it bends the decision surface around the points"
    ],
    explain: "The margin is the perpendicular distance from the decision boundary to the closest points on each side; those closest points sit on the margin's edges. An SVM is a maximum-margin classifier because a wider margin tends to generalise better. The points touching the margin are the support vectors that define it.",
    simple: "It is the width of the no-man's-land gap on each side of the dividing line. The SVM tries to make that gap as wide as it can.",
    widget: {
      type: "curveStatic", title: "The gap around the boundary",
      world: "The knob widens the empty band the SVM keeps between the boundary and the nearest points.",
      xlab: "margin width →", xs: [0,1,2,3,4], labels: ["0","thin","med","wide","widest"], dec: 0, yunit: "%",
      series: [ { name: "generalisation to new data (%)", ys: [72, 81, 88, 92, 90] } ],
      knob: { label: "Margin width", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A near-zero margin leaves no safety buffer around the boundary.", tone: "info" },
        { max: 3, text: "Widening the gap to the closest points makes the boundary more robust.", tone: "info" },
        { max: 4, text: "🤯 That empty band to the nearest points IS the margin.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Margin", formula: "distance from hyperplane to nearest points, maximised",
        text: "The width of the buffer between the boundary and the closest examples on each side." }
    }
  });

  add("svm1", {
    q: "In an SVM, what are the 'support vectors'?",
    choices: [
      "The training points lying closest to the boundary, on or inside the margin, that alone determine where the hyperplane sits",
      "The full set of input features used to describe each training example, the complete list of measured attributes that together form the coordinate vector fed into the model",
      "The weights the trained model assigns to each input feature, the coefficients in the vector w that tilt and orient the separating surface across the space of attributes",
      "The points that lie farthest from the decision boundary within each class, the comfortably classified examples sitting deep in their own region well away from the dividing line",
      "The extra dimensions that a kernel quietly adds to make the classes separable, the higher-dimensional coordinates in which a curved split becomes a plain flat separation"
    ],
    explain: "Support vectors are the critical training examples that touch the margin's edges (or violate it); the optimal hyperplane depends only on them. Points far from the boundary can be moved or removed without changing the model. This is why SVMs are often memory-efficient at prediction time: only the support vectors matter.",
    simple: "They are the handful of borderline examples sitting right next to the dividing line. Move them and the line moves; the far-away points don't matter.",
    widget: {
      type: "curveStatic", title: "The points that pin the line",
      world: "The knob sweeps how close a point sits to the boundary, raising its influence on where the line goes.",
      xlab: "closeness to the boundary →", xs: [0,1,2,3,4], labels: ["far","near","edge","on-margin","violating"], dec: 0, yunit: "%",
      series: [ { name: "influence on the hyperplane (%)", ys: [0, 8, 40, 85, 100] } ],
      knob: { label: "Closeness", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A far-away point has essentially no say in where the boundary sits.", tone: "info" },
        { max: 3, text: "The closer a point is to the margin, the more it constrains the line.", tone: "info" },
        { max: 4, text: "🤯 Those boundary-hugging points that fix the hyperplane ARE the support vectors.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Support vectors", formula: "closest points on/inside the margin",
        text: "The few borderline examples that alone determine the SVM's boundary." }
    }
  });

  add("svm1", {
    q: "In an SVM, what is a 'kernel'?",
    choices: [
      "A function that computes the similarity between two examples as if in a higher-dimensional space, letting the SVM form non-linear boundaries",
      "The single training point that lies exactly on the decision boundary",
      "The penalty applied to each misclassified example during training",
      "The width of the margin the SVM tries to maximise",
      "The learning rate that controls how fast the optimiser converges"
    ],
    explain: "A kernel is a function K(x, x') that returns the inner product of two examples in some (possibly very high-dimensional) feature space without ever computing the coordinates there. Swapping in different kernels (linear, polynomial, RBF) lets the SVM draw curved boundaries in the original space. It is the mechanism behind the SVM's flexibility.",
    simple: "It is a similarity gadget that measures how alike two points are as if they lived in a richer space. Different kernels let the SVM bend its dividing line into curves.",
    widget: {
      type: "curveStatic", title: "Similarity in a richer space",
      world: "The knob swaps in kernels of growing flexibility, letting the boundary bend to fit a curved class split.",
      xlab: "kernel flexibility →", xs: [0,1,2,3,4], labels: ["linear","poly-2","poly-3","RBF","RBF+"], dec: 0, yunit: "%",
      series: [ { name: "fit to a curved boundary (%)", ys: [62, 74, 83, 92, 96] } ],
      knob: { label: "Kernel flexibility", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A linear kernel can only draw a straight boundary.", tone: "info" },
        { max: 3, text: "Richer kernels measure similarity as if in higher dimensions, curving the boundary.", tone: "info" },
        { max: 4, text: "🤯 That similarity function standing in for a high-dim space IS a kernel.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Kernel", formula: "K(x, x') = ⟨φ(x), φ(x')⟩",
        text: "A similarity function that lets an SVM act in a high-dimensional space to form non-linear boundaries." }
    }
  });

  add("svm1", {
    q: "In an SVM, what is the 'RBF kernel'?",
    choices: [
      "A kernel whose similarity between two points falls off smoothly with their distance, allowing flexible, localised curved boundaries",
      "A kernel that computes a plain dot product and only ever yields a straight boundary",
      "A kernel that raises the dot product of two points to an integer power",
      "A penalty term that grows with the number of support vectors",
      "A rule for choosing the number of nearest neighbours to consult"
    ],
    explain: "The radial basis function (Gaussian) kernel, K(x,x') = exp(−γ‖x−x'‖²), gives a similarity that is highest for nearby points and decays with distance. It is a popular default because it can carve highly flexible, curved boundaries and depends only on distances. Its reach is controlled by the gamma parameter.",
    simple: "It is a kernel that says two points are similar only if they are close together, with similarity fading as they get farther apart. It lets the SVM draw smooth, curvy borders.",
    widget: {
      type: "curveStatic", title: "Similarity that fades with distance",
      world: "The knob increases the distance between two points, and the RBF similarity between them decays.",
      xlab: "distance between two points →", xs: [0,1,2,3,4], labels: ["0","0.5","1","2","3"], dec: 2, yunit: "",
      series: [ { name: "RBF similarity", ys: [1.00, 0.78, 0.37, 0.02, 0.00] } ],
      knob: { label: "Distance", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Two points on top of each other have similarity 1.", tone: "info" },
        { max: 3, text: "As they separate, the exp(−γ·dist²) similarity fades toward zero.", tone: "info" },
        { max: 4, text: "🤯 A similarity that decays with distance IS the RBF kernel.", tone: "wow" }
      ],
      extreme: { at: "min" },
      reveal: { name: "RBF kernel", formula: "K(x,x') = exp(−γ‖x−x'‖²)",
        text: "A distance-based kernel giving high similarity to nearby points, enabling smooth curved boundaries." }
    }
  });

  add("svm1", {
    q: "In an SVM, what does the 'C' (regularization) parameter control?",
    choices: [
      "The trade-off between a wider margin and fewer training misclassifications, with larger C penalising margin violations more heavily",
      "The number of dimensions the kernel maps the data into",
      "The rate at which the RBF similarity decays with distance",
      "The number of support vectors the model is allowed to keep",
      "The threshold on the decision function used to assign a class"
    ],
    explain: "C sets how much the SVM penalises points that fall inside or across the margin: a large C forces the boundary to classify training points correctly (narrow margin, risk of overfitting), while a small C tolerates violations for a wider, smoother margin. It is the regularisation knob balancing fit against margin width.",
    simple: "It is a strictness dial. High C means 'don't you dare misclassify training points', giving a tight margin; low C relaxes and allows a wider, more forgiving gap.",
    widget: {
      type: "curveStatic", title: "Strictness vs margin width",
      world: "The knob raises C, tightening the penalty on margin violations and shrinking the margin.",
      xlab: "C (penalty on violations) →", xs: [0,1,2,3,4], labels: ["0.01","0.1","1","10","100"], dec: 0, yunit: "%",
      series: [ { name: "test accuracy (%)", ys: [74, 85, 90, 86, 78] } ],
      knob: { label: "C", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Very small C tolerates many violations for a wide, soft margin — underfitting.", tone: "info" },
        { max: 3, text: "Raising C penalises violations more, tightening the fit up to a point.", tone: "info" },
        { max: 4, text: "🤯 This trade-off between margin width and errors IS the C parameter.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "C parameter", formula: "large C → fewer violations, narrow margin",
        text: "The regularisation knob trading margin width against training misclassifications." }
    }
  });

  add("svm1", {
    q: "In an SVM with an RBF kernel, what does the 'gamma' parameter control?",
    choices: [
      "How far the influence of a single training point reaches, with larger gamma making each point's reach shorter and the boundary wigglier",
      "The penalty charged for each misclassified training example",
      "The width of the margin the model tries to maximise",
      "The number of classes the SVM can distinguish at once",
      "The fraction of data reserved for validating the model"
    ],
    explain: "Gamma sets the reach of the RBF kernel: a large gamma makes similarity decay quickly with distance, so each point influences only its close neighbourhood and the boundary becomes highly wiggly (risking overfitting); a small gamma gives each point a broad reach and a smoother boundary. It works together with C to control model complexity.",
    simple: "It sets how far each training point's influence spreads. Big gamma means each point only affects its immediate area, making a jagged boundary; small gamma spreads influence wide and smooth.",
    widget: {
      type: "curveStatic", title: "Reach of each point's influence",
      world: "The knob raises gamma, shrinking how far each point's influence reaches and making the boundary wigglier.",
      xlab: "gamma →", xs: [0,1,2,3,4], labels: ["0.01","0.1","1","10","100"], dec: 0, yunit: "%",
      series: [ { name: "test accuracy (%)", ys: [76, 86, 91, 82, 68] } ],
      knob: { label: "gamma", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Tiny gamma spreads each point's influence wide for a smooth boundary.", tone: "info" },
        { max: 3, text: "Raising gamma shortens each point's reach, letting the boundary curve more tightly.", tone: "info" },
        { max: 4, text: "🤯 This reach of each point's influence IS the gamma parameter.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "gamma", formula: "large γ → short reach, wigglier boundary",
        text: "The RBF kernel's reach knob, controlling how local each training point's influence is." }
    }
  });

  add("svm1", {
    q: "In an SVM, what is a 'soft margin'?",
    choices: [
      "A margin that permits some training points to fall inside it or be misclassified, trading a few violations for a wider, more robust boundary",
      "A margin that forbids any point from crossing into it under any circumstance",
      "A margin whose width is fixed in advance and never optimised",
      "A margin measured in a higher-dimensional space created by a kernel",
      "A margin that only applies to the support vectors and not other points"
    ],
    explain: "A soft-margin SVM allows some slack: points may sit within the margin or on the wrong side, each incurring a penalty scaled by C. This tolerance is what lets SVMs handle data that is not perfectly separable and noisy. It contrasts with a hard margin, which permits no violations at all.",
    simple: "It is a forgiving margin that lets a few examples sneak inside the gap or onto the wrong side, in exchange for a wider, sturdier boundary. Real, messy data needs this give.",
    widget: {
      type: "curveStatic", title: "Allowing a few violations",
      world: "The knob loosens the margin, allowing more points to slip inside it in exchange for a wider boundary.",
      xlab: "violations tolerated →", xs: [0,1,2,3,4], labels: ["0","few","some","more","many"], dec: 0, yunit: "%",
      series: [ { name: "test accuracy on noisy data (%)", ys: [74, 85, 91, 89, 82] } ],
      knob: { label: "Violations tolerated", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Allowing zero violations forces a brittle fit on noisy data.", tone: "info" },
        { max: 3, text: "Letting a few points slip inside the margin yields a wider, sturdier boundary.", tone: "info" },
        { max: 4, text: "🤯 A margin that tolerates some violations IS a soft margin.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Soft margin", formula: "allow slack (penalised violations) for a wider margin",
        text: "A margin that tolerates some misclassified or inside-margin points to handle non-separable data." }
    }
  });

  add("svm1", {
    q: "In an SVM, what is 'hinge loss'?",
    choices: [
      "The loss that is zero when a point is correctly classified beyond the margin and grows linearly with how far it falls short of it",
      "The loss that squares the difference between predicted and true numeric values",
      "The loss that counts the raw number of misclassified points with no gradient",
      "The loss that measures the cross-entropy between predicted and true probabilities",
      "The loss that penalises the total number of support vectors used"
    ],
    explain: "Hinge loss, max(0, 1 − y·f(x)), is the SVM's training objective term: a point classified correctly and safely past the margin incurs zero loss, while a point on the wrong side or inside the margin incurs a penalty that rises linearly with the violation. Minimising it, plus a margin-maximising regulariser, is what trains a linear SVM.",
    simple: "It gives zero penalty to points that are correctly on the right side with room to spare, and a rising penalty to points that stray toward or past the line. It is what the SVM tries to minimise.",
    widget: {
      type: "curveStatic", title: "Penalty for being too close or wrong",
      world: "The knob moves a point from safely beyond the margin toward and past the boundary, tracking the hinge loss.",
      xlab: "signed margin y·f(x) →", xs: [0,1,2,3,4], labels: ["+2","+1","0","−1","−2"], dec: 1, yunit: "",
      series: [ { name: "hinge loss", ys: [0.0, 0.0, 1.0, 2.0, 3.0] } ],
      knob: { label: "Signed margin", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A point safely past the margin (y·f ≥ 1) has zero hinge loss.", tone: "info" },
        { max: 3, text: "Once inside the margin or on the wrong side, the loss rises linearly.", tone: "info" },
        { max: 4, text: "🤯 That max(0, 1 − y·f(x)) penalty IS hinge loss.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Hinge loss", formula: "L = max(0, 1 − y·f(x))",
        text: "Zero when a point is correctly beyond the margin, rising linearly as it violates it — the SVM's loss." }
    }
  });

}());
