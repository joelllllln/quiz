/* Definition questions batch g1 (found1, easy/KNN, logreg1). */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function add(qk, obj) { (Q[qk] = Q[qk] || []).push(obj); D[obj.q] = 1; }

  /* ===================== found1 (12) ===================== */

  add("found1", {
    q: "In machine learning, what is reinforcement learning?",
    choices: [
      "Learning by trial and error, where an agent takes actions and is guided by rewards and penalties",
      "Learning a fixed mapping from many labelled examples to their known correct outputs, with no reward signal at all",
      "Grouping unlabelled data into clusters of similar points using only distances, with no actions or rewards involved",
      "Reducing the number of input features while preserving most of the variance, done before any model is trained",
      "Copying the predictions of a larger trained model into a smaller student network purely to compress it"
    ],
    explain: "Reinforcement learning trains an agent that interacts with an environment: it chooses actions, receives numerical rewards or penalties, and adjusts its behaviour to maximise long-run reward. Unlike supervised learning there are no labelled correct answers, only feedback signals. It underlies game-playing and robotics systems.",
    simple: "It is learning like training a dog: the agent tries things, gets a treat or a scolding, and slowly learns which actions pay off. Nobody hands it the right answer; it discovers it by experimenting.",
    widget: {
      type: "curveStatic", title: "Reward guides behaviour",
      world: "An agent replays a task many times; average reward climbs as it learns from feedback.",
      xlab: "practice episodes →", xs: [0,1,2,3,4], labels: ["0","50","200","800","3000"], dec: 0, yunit: "pts",
      series: [ { name: "avg reward", ys: [5,18,45,72,90] } ],
      knob: { label: "Practice episodes", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "With almost no experience the agent stumbles: reward is low.", tone: "info" }, { max: 3, text: "Reward rises as the agent repeats actions that earned treats and drops ones that earned penalties.", tone: "info" }, { max: 4, text: "🤯 No labels were ever given — the agent learned purely from reward feedback. That is reinforcement learning.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Reinforcement learning", formula: "agent → action → reward/penalty → better policy", text: "An agent learns which actions to take by maximising rewards received from its environment." }
    }
  });

  add("found1", {
    q: "In machine learning, what is classification?",
    choices: [
      "A supervised task whose goal is to predict a discrete category or class label for each input",
      "A supervised task whose goal is to predict a continuous numeric value on an unbounded sliding scale",
      "An unsupervised task that splits unlabelled data into clusters of similar points without any target",
      "A method for shrinking many correlated features down to a few uncorrelated components before training",
      "A tuning rule that decides how fast a model updates its weights during gradient descent optimisation"
    ],
    explain: "Classification is supervised learning where the target is categorical: spam vs not-spam, digit 0-9, disease vs healthy. The model learns from labelled examples and outputs one of a fixed set of classes. It contrasts with regression, whose target is a number.",
    simple: "It is sorting things into named buckets: is this email spam or not? Is this photo a cat, dog, or bird? The answer is always one of a fixed list of labels, never a measured amount.",
    widget: {
      type: "curveStatic", title: "Picking a bucket",
      world: "As a spam score rises, the model's chosen class flips from 'not spam' to 'spam'.",
      xlab: "spamminess score →", xs: [0,1,2,3,4], labels: ["0.1","0.3","0.5","0.7","0.9"], dec: 0, yunit: "",
      series: [ { name: "predicted class (0=ham,1=spam)", ys: [0,0,0,1,1] } ],
      knob: { label: "Spamminess score", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "Low score: the output is the discrete label 'not spam' (0).", tone: "info" }, { max: 3, text: "The output never takes an in-between value — it jumps from one category to another.", tone: "info" }, { max: 4, text: "🤯 The answer is always a named bucket, not a number. That discrete-label prediction is classification.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Classification", formula: "input → one of a fixed set of class labels", text: "Classification predicts which discrete category an input belongs to." }
    }
  });

  add("found1", {
    q: "In machine learning, what is regression?",
    choices: [
      "A supervised task whose goal is to predict a continuous numeric value for each input",
      "A supervised task whose goal is to predict a discrete class label from a fixed list of categories",
      "The tendency of an over-complex model to memorise noise in its training data instead of the signal",
      "An unsupervised task that groups unlabelled points into clusters of similar examples without targets",
      "A preprocessing technique for encoding nominal categories as several binary indicator columns"
    ],
    explain: "Regression is supervised learning where the target is a real-valued number: house price, temperature, tomorrow's demand. The model learns from labelled examples and outputs a quantity on a continuous scale. It contrasts with classification, whose output is a category.",
    simple: "It is predicting an amount, like a price or a temperature, rather than a category. The answer can be any number on a sliding scale, not one of a short list of labels.",
    widget: {
      type: "curveStatic", title: "Predicting an amount",
      world: "As house size grows, the model outputs a continuous predicted price.",
      xlab: "house size →", xs: [0,1,2,3,4], labels: ["60m²","90m²","120m²","150m²","180m²"], dec: 0, yunit: "k",
      series: [ { name: "predicted price", ys: [180,240,300,370,450] } ],
      knob: { label: "House size", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "The output is a number on a scale, not a bucket.", tone: "info" }, { max: 3, text: "As the input rises the predicted value moves smoothly along a continuum.", tone: "info" }, { max: 4, text: "🤯 Any real number is a valid answer here — predicting a continuous quantity is regression.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Regression", formula: "input → a continuous numeric value", text: "Regression predicts a numeric quantity on a continuous scale." }
    }
  });

  add("found1", {
    q: "In machine learning, what is a feature?",
    choices: [
      "An individual measurable input variable used to describe each example",
      "The known correct answer or target label attached to each training example for it",
      "The final numeric or class prediction the model eventually produces at inference time",
      "A single complete row of the dataset representing one whole labelled example",
      "The fixed rule used to split the data into separate train and test sets"
    ],
    explain: "A feature is one input attribute the model reads to make predictions — a column in the dataset, such as age, pixel intensity, or word count. Each example is described by a vector of feature values. Choosing and transforming good features is central to model performance.",
    simple: "A feature is one piece of information you know about each item, like a person's height or age. It is a column in your spreadsheet — one of the clues the model uses to guess the answer.",
    widget: {
      type: "curveStatic", title: "More clues, better guesses",
      world: "Adding informative features to a model and watching accuracy respond.",
      xlab: "features used →", xs: [0,1,2,3,4], labels: ["0","1","2","4","8"], dec: 0, yunit: "%",
      series: [ { name: "accuracy", ys: [50,64,72,82,88] } ],
      knob: { label: "Features used", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "With no input columns the model can only guess the base rate.", tone: "info" }, { max: 3, text: "Each added feature gives the model another measurable clue about the example.", tone: "info" }, { max: 4, text: "🤯 Every column you add is one feature — an input variable describing the example.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Feature", formula: "one input variable (column) describing an example", text: "A feature is a single measurable attribute the model uses as input." }
    }
  });

  add("found1", {
    q: "In machine learning, what is the label (or target)?",
    choices: [
      "The known correct output attached to an example that the model learns to predict",
      "An individual input variable describing the example",
      "The learning rate that controls weight updates",
      "The set of examples held back to measure final performance",
      "The number of passes made over the training data"
    ],
    explain: "The label, also called the target or ground-truth output, is the answer the model is trained to reproduce: the class of an image, the price of a house. Supervised learning needs labelled examples to learn the mapping from features to label. At prediction time the model outputs its estimate of this label.",
    simple: "The label is the right answer written next to each training example, like 'this photo = cat'. The model studies the clues and the answers together so it can guess the answer on new items.",
    widget: {
      type: "curveStatic", title: "Learning from answers",
      world: "How much of the labelled data the model is allowed to learn from, versus accuracy.",
      xlab: "labelled examples seen →", xs: [0,1,2,3,4], labels: ["0","50","500","5k","50k"], dec: 0, yunit: "%",
      series: [ { name: "accuracy", ys: [50,66,78,86,91] } ],
      knob: { label: "Labelled examples", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "With no answers to learn from, the model cannot map clues to outcomes.", tone: "info" }, { max: 3, text: "Each labelled example pairs features with the correct output the model aims to predict.", tone: "info" }, { max: 4, text: "🤯 The 'correct answer' column is the label — the target the model learns to reproduce.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Label (target)", formula: "the known correct output for an example", text: "The label is the ground-truth answer a supervised model learns to predict." }
    }
  });

  add("found1", {
    q: "In machine learning, what is the training set?",
    choices: [
      "The portion of data the model learns from by fitting its parameters",
      "The portion of data held back to estimate performance on unseen data",
      "A small sample used only to tune hyperparameters",
      "The complete list of features available in the dataset",
      "The final answer the model outputs for each example"
    ],
    explain: "The training set is the subset of labelled data the model actually fits to, adjusting its parameters to minimise error on these examples. It is kept separate from the test set so that evaluation reflects generalisation, not memorisation. Larger, more representative training sets usually improve learning.",
    simple: "It is the practice material the model studies from, like the questions with answers you revise before an exam. The model tunes itself to do well on these examples.",
    widget: {
      type: "curveStatic", title: "Studying the practice set",
      world: "Growing the number of examples the model is allowed to train on.",
      xlab: "training set size →", xs: [0,1,2,3,4], labels: ["100","500","2k","10k","50k"], dec: 0, yunit: "%",
      series: [ { name: "test accuracy", ys: [62,72,80,86,90] } ],
      knob: { label: "Training set size", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "A tiny training set gives the model little to learn from.", tone: "info" }, { max: 3, text: "More training examples let the model fit a better mapping from features to labels.", tone: "info" }, { max: 4, text: "🤯 This is the data the model fits its parameters on — the training set.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Training set", formula: "the data the model fits its parameters to", text: "The training set is the labelled data a model learns from." }
    }
  });

  add("found1", {
    q: "In machine learning, what is the test set?",
    choices: [
      "Held-out data, never used in training, used to estimate performance on unseen examples",
      "The data the model fits its parameters to during learning",
      "A sample used to choose hyperparameters during development",
      "The list of input variables describing each example",
      "The rate at which the model adjusts its weights"
    ],
    explain: "The test set is data set aside and never touched during training or tuning, used once at the end to estimate how the model will perform on new, unseen data. Because it is untouched, its error is an honest measure of generalisation. Reusing it for tuning would leak information and inflate the estimate.",
    simple: "It is the final exam the model has never seen before. You keep these questions locked away while it studies, then use them once to check how well it really learned.",
    widget: {
      type: "curveStatic", title: "The honest final exam",
      world: "As a model is trained longer, training accuracy and untouched test accuracy diverge.",
      xlab: "training effort →", xs: [0,1,2,3,4], labels: ["low","","","","high"], dec: 0, yunit: "%",
      series: [ { name: "train accuracy", ys: [70,82,90,96,99] }, { name: "test accuracy", ys: [68,78,84,85,83] } ],
      knob: { label: "Training effort", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "Early on, train and test accuracy agree.", tone: "info" }, { max: 3, text: "Train accuracy keeps climbing, but the untouched test set reveals the true, lower ability.", tone: "info" }, { max: 4, text: "🤯 The gap only shows because the test set was never trained on — that is its whole purpose.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Test set", formula: "held-out data used once to estimate generalisation", text: "The test set is untouched data used to measure performance on unseen examples." }
    }
  });

  add("found1", {
    q: "In machine learning, what is overfitting?",
    choices: [
      "When a model learns the training data's noise and detail so closely that it generalises poorly to new data",
      "When a model is too simple to capture the underlying pattern in the data",
      "When the training set is much larger than the test set",
      "When features are measured on very different scales",
      "When class labels are wrong in the training data"
    ],
    explain: "Overfitting happens when a model fits the training data too well, memorising noise and idiosyncrasies rather than the true signal. It shows as low training error but high test error. Remedies include more data, regularisation, and simpler models.",
    simple: "It is like memorising the exact practice questions instead of understanding the topic: you ace the practice but flunk the real exam. The model learned the quirks, not the lesson.",
    widget: {
      type: "curveStatic", title: "Memorising the noise",
      world: "Increasing model complexity while watching training vs test error.",
      xlab: "model complexity →", xs: [0,1,2,3,4], labels: ["low","","just right","","high"], dec: 0, yunit: "%",
      series: [ { name: "train error", ys: [40,22,12,5,1] }, { name: "test error", ys: [42,26,15,24,45] } ],
      knob: { label: "Model complexity", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "Simple model: both errors are high (that is underfitting).", tone: "info" }, { max: 3, text: "Past the sweet spot, train error keeps falling but test error climbs again.", tone: "warn" }, { max: 4, text: "🤯 Near-zero train error yet soaring test error — the model memorised noise. That is overfitting.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Overfitting", formula: "low train error, high test error", text: "Overfitting is fitting noise in the training data so the model fails on new data." }
    }
  });

  add("found1", {
    q: "In machine learning, what is underfitting?",
    choices: [
      "When a model is too simple to capture the underlying pattern, giving high error on both training and test data",
      "When a model memorises noise in the training data and fails on new data",
      "When the test set is accidentally used during training",
      "When categorical features are turned into binary columns",
      "When the learning rate is set too high to converge"
    ],
    explain: "Underfitting occurs when a model lacks the capacity or is trained too little to represent the true relationship, so it performs poorly even on training data. Both training and test error are high. Remedies include a richer model, better features, or more training.",
    simple: "It is like using a straight ruler to trace a curvy line: the model is too basic to follow the real shape, so it gets things wrong everywhere, even on the practice set.",
    widget: {
      type: "curveStatic", title: "Too simple to fit",
      world: "Increasing model capacity from far too simple upward, tracking error.",
      xlab: "model capacity →", xs: [0,1,2,3,4], labels: ["tiny","low","fair","good","high"], dec: 0, yunit: "%",
      series: [ { name: "train error", ys: [45,38,25,12,6] }, { name: "test error", ys: [46,39,27,16,14] } ],
      knob: { label: "Model capacity", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "At tiny capacity both train and test error are high together.", tone: "warn" }, { max: 3, text: "Errors fall as the model gains enough flexibility to capture the pattern.", tone: "info" }, { max: 4, text: "🤯 High error even on training data, because the model was too simple — that is underfitting.", tone: "wow" } ],
      extreme: { at: "min" },
      reveal: { name: "Underfitting", formula: "high train error AND high test error", text: "Underfitting is a model too simple to capture the underlying pattern." }
    }
  });

  add("found1", {
    q: "In machine learning, what is generalization?",
    choices: [
      "A model's ability to perform well on new, unseen data rather than just the data it trained on",
      "The process of fitting a model's parameters to the training data",
      "The act of encoding categorical features as numbers",
      "The tendency of a model to memorise the training examples",
      "The step of scaling features to a common range"
    ],
    explain: "Generalization is how well a model's learned pattern transfers to data it has never seen. It is the true goal of learning: low error on unseen data, not merely on training data. The gap between training and test performance measures how well a model generalises.",
    simple: "It is whether the model actually learned the lesson or just memorised the practice. Good generalisation means it handles brand-new examples well, not only the ones it studied.",
    widget: {
      type: "curveStatic", title: "Doing well on new data",
      world: "As overfitting grows, the gap between training and unseen-data accuracy widens.",
      xlab: "overfitting →", xs: [0,1,2,3,4], labels: ["none","","","","severe"], dec: 0, yunit: "%",
      series: [ { name: "train accuracy", ys: [85,90,95,98,100] }, { name: "unseen accuracy", ys: [84,86,85,78,68] } ],
      knob: { label: "Overfitting", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "Early on, performance on seen and unseen data matches — good generalisation.", tone: "info" }, { max: 3, text: "As the model overfits, unseen accuracy stalls then falls while train accuracy soars.", tone: "warn" }, { max: 4, text: "🤯 Perfect on training data but weak on unseen data — poor generalisation. Generalisation is that unseen-data ability.", tone: "wow" } ],
      extreme: { at: "min" },
      reveal: { name: "Generalization", formula: "performance on unseen data", text: "Generalization is how well a model performs on new data it did not train on." }
    }
  });

  add("found1", {
    q: "In machine learning, what is the learning rate?",
    choices: [
      "A hyperparameter that controls how big a step the model takes when updating its parameters each iteration",
      "The fraction of data set aside for testing",
      "The number of complete passes made over the training data",
      "The known correct output attached to each example",
      "The share of predictions the model gets correct"
    ],
    explain: "The learning rate scales the size of each parameter update during gradient-based optimisation. Too small and training crawls; too large and it overshoots or diverges. It is one of the most important hyperparameters to tune.",
    simple: "It is the size of the steps the model takes while learning. Tiny steps are slow but safe; huge steps are fast but can leap right past the answer.",
    widget: {
      type: "curveStatic", title: "Step size matters",
      world: "Sweeping the learning rate from tiny to huge, measuring final model quality.",
      xlab: "learning rate →", xs: [0,1,2,3,4], labels: ["1e-4","1e-3","1e-2","0.1","1.0"], dec: 0, yunit: "%",
      series: [ { name: "final accuracy", ys: [62,80,90,74,40] } ],
      knob: { label: "Learning rate", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "Too small: steps are tiny and training barely moves in the time given.", tone: "info" }, { max: 3, text: "There is a sweet spot where step size is just right.", tone: "info" }, { max: 4, text: "🤯 Too large: the updates overshoot and accuracy collapses. That step size is the learning rate.", tone: "wow" } ],
      extreme: { at: "min" },
      reveal: { name: "Learning rate", formula: "size of each parameter-update step", text: "The learning rate controls how large a step the optimiser takes on each update." }
    }
  });

  add("found1", {
    q: "In machine learning, what is one-hot encoding?",
    choices: [
      "Representing a categorical variable as several binary columns, one per category, with a single 1 marking the value",
      "Scaling a numeric feature to have zero mean and unit variance",
      "Replacing missing values with the column's average",
      "Reducing many features to a few principal components",
      "Splitting data into training and test portions"
    ],
    explain: "One-hot encoding turns a categorical feature with k categories into k binary columns; each row has a 1 in the column for its category and 0 elsewhere. This lets models that expect numbers handle categories without imposing a false numeric order. It is standard preprocessing for nominal variables.",
    simple: "Instead of writing 'colour = red', you make a checkbox for each colour and tick exactly one. Red becomes [1,0,0], green [0,1,0], blue [0,0,1] — so the model never thinks blue is 'bigger' than red.",
    widget: {
      type: "curveStatic", title: "One checkbox lights up",
      world: "For a colour feature, the binary column that equals 1 as the category changes.",
      xlab: "category →", xs: [0,1,2,3,4], labels: ["red","green","blue","red","green"], dec: 0, yunit: "",
      series: [ { name: "is_green column", ys: [0,1,0,0,1] } ],
      knob: { label: "Category", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "The 'is_green' column is 0 for red and 1 for green — a single bit per category.", tone: "info" }, { max: 3, text: "Exactly one column is 'hot' (1) for each row; the rest are 0.", tone: "info" }, { max: 4, text: "🤯 Each category gets its own binary column with a lone 1 — that is one-hot encoding.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "One-hot encoding", formula: "category → k binary columns, one 1 per row", text: "One-hot encoding represents a category as binary indicator columns with a single 1." }
    }
  });

  /* ===================== easy / KNN (10) ===================== */

  add("easy", {
    q: "What is the k-nearest neighbours (KNN) algorithm?",
    choices: [
      "A method that classifies or predicts a point using the labels of its k closest examples in the training data",
      "A method that fits a straight line through the data by minimising squared error",
      "A method that splits data with a sequence of yes/no questions",
      "A method that groups unlabelled points into k clusters",
      "A method that combines many weak trees into a strong ensemble"
    ],
    explain: "KNN makes a prediction for a query point by finding the k training examples closest to it (by some distance metric) and letting them vote (classification) or average (regression). It stores all training data and does the work at prediction time. The choice of k and distance metric drives its behaviour.",
    simple: "To label something new, KNN asks its nearest neighbours what they are and goes with the majority. It is 'you are who you hang out with' turned into an algorithm.",
    widget: {
      type: "curveStatic", title: "Ask the neighbours",
      world: "How many nearest neighbours (k) vote on a query point, versus accuracy.",
      xlab: "k →", xs: [0,1,2,3,4], labels: ["1","3","5","15","50"], dec: 0, yunit: "%",
      series: [ { name: "accuracy", ys: [82,88,90,86,78] } ],
      knob: { label: "Number of neighbours k", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "With k=1 the single closest example decides the label.", tone: "info" }, { max: 3, text: "A moderate k lets a small neighbourhood vote, smoothing out noise.", tone: "info" }, { max: 4, text: "🤯 Every prediction comes from the labels of the k closest points — that is KNN.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "K-nearest neighbours", formula: "predict from the k closest training examples", text: "KNN predicts a point's label from the labels of its k nearest neighbours." }
    }
  });

  add("easy", {
    q: "In KNN, what is a distance metric?",
    choices: [
      "A rule that measures how far apart two points are so 'nearest' neighbours can be found",
      "The number of neighbours that vote on each prediction",
      "The fraction of predictions the model gets right",
      "The label assigned to the majority of neighbours",
      "The step size used when updating model weights"
    ],
    explain: "A distance metric defines closeness in feature space — for example Euclidean or Manhattan distance. KNN depends entirely on it to decide which training points count as 'nearest'. Changing the metric can change which neighbours are chosen and therefore the prediction.",
    simple: "It is the ruler KNN uses to measure how close two points are. Different rulers can give different 'nearest' neighbours, so the choice matters.",
    widget: {
      type: "curveStatic", title: "Measuring closeness",
      world: "The measured distance to one fixed point under increasingly stretched coordinates.",
      xlab: "coordinate stretch →", xs: [0,1,2,3,4], labels: ["1x","2x","3x","4x","5x"], dec: 1, yunit: "",
      series: [ { name: "distance to point A", ys: [2.0,3.2,4.6,6.1,7.6] } ],
      knob: { label: "Coordinate stretch", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "The metric turns two points' coordinates into a single closeness number.", tone: "info" }, { max: 3, text: "Change how distance is measured and the same points become 'nearer' or 'farther'.", tone: "info" }, { max: 4, text: "🤯 That closeness rule is the distance metric — it decides who counts as a neighbour.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Distance metric", formula: "a rule d(x, y) giving the closeness of two points", text: "A distance metric measures how far apart points are so KNN can find nearest neighbours." }
    }
  });

  add("easy", {
    q: "In KNN, what is the Manhattan distance between two points?",
    choices: [
      "The sum of the absolute differences of their coordinates, like walking along a city grid",
      "The straight-line distance between them measured across open space",
      "The largest single coordinate difference between them",
      "The number of neighbours separating them in the ranking",
      "The angle between the two points' feature vectors"
    ],
    explain: "Manhattan (L1) distance adds up the absolute differences along each axis: |x1-x2| + |y1-y2| + .... It is the distance you travel on a grid of streets where you cannot cut diagonally. It differs from Euclidean distance, which takes the straight-line hypotenuse.",
    simple: "Imagine walking city blocks: you can only go along streets, not through buildings. Add up the blocks east-west and north-south, and that total is the Manhattan distance.",
    widget: {
      type: "curveStatic", title: "Walking the grid",
      world: "Two points move apart along the streets; the summed block-distance grows.",
      xlab: "blocks apart →", xs: [0,1,2,3,4], labels: ["(0,0)","(1,1)","(2,2)","(3,3)","(4,4)"], dec: 0, yunit: "",
      series: [ { name: "Manhattan distance", ys: [0,2,4,6,8] } ],
      knob: { label: "Grid separation", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "From (0,0) to (1,1) you walk 1 across + 1 up = 2 blocks.", tone: "info" }, { max: 3, text: "Distance is the sum of the horizontal and vertical gaps, never a diagonal.", tone: "info" }, { max: 4, text: "🤯 Adding absolute coordinate differences like city blocks is Manhattan distance.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Manhattan distance", formula: "Σ |xᵢ − yᵢ|", text: "Manhattan distance sums the absolute coordinate differences, like grid-walking." }
    }
  });

  add("easy", {
    q: "In KNN, why is feature scaling important?",
    choices: [
      "Because distances are dominated by large-range features unless all features are put on comparable scales",
      "Because scaling changes how many neighbours vote on each prediction",
      "Because unscaled features make the algorithm train faster but less accurately",
      "Because scaling converts categorical labels into numbers",
      "Because it decides the value of k automatically"
    ],
    explain: "KNN measures distance across all features, so a feature with a large numeric range (e.g. salary in the thousands) can swamp one with a small range (e.g. age). Scaling — such as standardisation or min-max — puts features on comparable footing so each contributes fairly to the distance. Without it, KNN effectively ignores small-range features.",
    simple: "If one column is in the thousands and another in single digits, the big one bullies the distance and the small one is ignored. Scaling shrinks them to the same size so every feature gets a fair say.",
    widget: {
      type: "curveStatic", title: "Fair say for every feature",
      world: "A salary feature's range grows relative to age; KNN accuracy without scaling drops.",
      xlab: "salary range vs age →", xs: [0,1,2,3,4], labels: ["1x","10x","100x","1000x","10000x"], dec: 0, yunit: "%",
      series: [ { name: "accuracy (unscaled)", ys: [88,84,74,62,55] } ],
      knob: { label: "Salary-to-age scale gap", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "When ranges are similar, both features contribute to the distance.", tone: "info" }, { max: 3, text: "As one feature's range balloons, it dominates the distance and accuracy slips.", tone: "warn" }, { max: 4, text: "🤯 The large-range feature drowns out the rest — which is exactly why KNN needs feature scaling.", tone: "wow" } ],
      extreme: { at: "min" },
      reveal: { name: "Feature scaling (for KNN)", formula: "put features on comparable scales before measuring distance", text: "Scaling stops large-range features from dominating KNN's distance calculation." }
    }
  });

  add("easy", {
    q: "In KNN, what is meant by 'lazy' (instance-based) learning?",
    choices: [
      "The algorithm does no real training up front; it just stores the data and computes at prediction time",
      "The algorithm trains slowly because it uses a small learning rate",
      "The algorithm ignores most features to save computation",
      "The algorithm updates its weights only when it makes a mistake",
      "The algorithm discards the training data after fitting a model"
    ],
    explain: "KNN is 'lazy' because it builds no explicit model during training — it simply memorises the training examples. All the work happens at query time, when it searches for neighbours and votes. This makes training trivial but prediction potentially slow on large datasets.",
    simple: "KNN does its homework at the last minute. It just remembers all the examples, and only when you ask it a question does it scramble to find the closest ones and answer.",
    widget: {
      type: "curveStatic", title: "Work deferred to query time",
      world: "As the stored dataset grows, KNN's per-prediction time rises (training stays ~free).",
      xlab: "stored examples →", xs: [0,1,2,3,4], labels: ["1k","10k","100k","1M","10M"], dec: 0, yunit: "ms",
      series: [ { name: "time per prediction", ys: [1,5,40,300,2500] } ],
      knob: { label: "Stored examples", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "Training just stores the points, so it is essentially instant.", tone: "info" }, { max: 3, text: "But every prediction must scan the stored data to find neighbours.", tone: "warn" }, { max: 4, text: "🤯 No model is built up front; the cost lives at query time. That is lazy, instance-based learning.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Lazy (instance-based) learning", formula: "store data now, compute at prediction time", text: "A lazy learner does no upfront fitting; it defers all work to query time." }
    }
  });

  add("easy", {
    q: "In KNN, what is a decision boundary?",
    choices: [
      "The surface in feature space where the predicted class changes from one label to another",
      "The number of neighbours used to make each prediction",
      "The distance metric used to rank neighbours",
      "The average distance between all pairs of points",
      "The fraction of the data used for training"
    ],
    explain: "The decision boundary is the dividing line (or surface) separating regions the model assigns to different classes. For KNN it is generally jagged, shaped by where neighbour votes tip from one class to another. Its smoothness depends on k: small k gives a wiggly boundary, large k a smoother one.",
    simple: "It is the line on the map where the answer flips from one class to the other. Step across it and KNN changes its guess.",
    widget: {
      type: "curveStatic", title: "Where the answer flips",
      world: "Increasing k in KNN smooths the jaggedness of the class-dividing boundary.",
      xlab: "k →", xs: [0,1,2,3,4], labels: ["1","3","7","20","60"], dec: 0, yunit: "",
      series: [ { name: "boundary roughness", ys: [95,70,45,25,12] } ],
      knob: { label: "Number of neighbours k", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "At k=1 the dividing surface is very jagged, hugging individual points.", tone: "info" }, { max: 3, text: "Larger k averages more votes, so the class-changing surface smooths out.", tone: "info" }, { max: 4, text: "🤯 That surface where the predicted label switches is the decision boundary.", tone: "wow" } ],
      extreme: { at: "min" },
      reveal: { name: "Decision boundary", formula: "the surface where the predicted class changes", text: "The decision boundary separates feature-space regions assigned to different classes." }
    }
  });

  add("easy", {
    q: "In KNN classification, what is majority vote?",
    choices: [
      "Assigning the query point the class that is most common among its k nearest neighbours",
      "Averaging the numeric values of the k nearest neighbours",
      "Choosing the single closest neighbour's label and ignoring the rest",
      "Weighting each neighbour by its distance before summing",
      "Picking the class with the fewest neighbours to avoid bias"
    ],
    explain: "In KNN classification, the k neighbours each 'vote' for their own class, and the query is assigned whichever class receives the most votes. Ties are broken by rules such as reducing k or using distance. It is the mechanism that turns neighbour labels into a single prediction.",
    simple: "The nearest neighbours each shout out their class, and KNN goes with whatever the crowd says most. Democracy among the closest points.",
    widget: {
      type: "curveStatic", title: "The crowd decides",
      world: "Among 5 neighbours, how many are class A; the prediction flips at the majority.",
      xlab: "class-A neighbours (of 5) →", xs: [0,1,2,3,4], labels: ["1","2","3","4","5"], dec: 0, yunit: "",
      series: [ { name: "predicted class (0=B,1=A)", ys: [0,0,1,1,1] } ],
      knob: { label: "Class-A neighbours", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "With only 1–2 of 5 neighbours in class A, class B wins the vote.", tone: "info" }, { max: 3, text: "Once class A holds the majority (3+ of 5), the prediction flips to A.", tone: "info" }, { max: 4, text: "🤯 The label with the most neighbour votes wins — that is majority vote.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Majority vote", formula: "predict the most common class among the k neighbours", text: "Majority vote assigns the class held by most of the k nearest neighbours." }
    }
  });

  add("easy", {
    q: "In KNN, what is the curse of dimensionality?",
    choices: [
      "As feature dimensions grow, points become nearly equidistant and 'nearest' loses meaning",
      "As the dataset grows, KNN runs out of memory to store the points",
      "As k grows, the decision boundary becomes too jagged to use",
      "As classes multiply, majority votes end in frequent ties",
      "As features are scaled, distances shrink toward zero"
    ],
    explain: "In high-dimensional spaces, the volume grows so fast that data becomes sparse and the distances between points concentrate: the nearest and farthest neighbours become almost equally far. This undermines KNN, whose whole premise is that nearby points are similar. It motivates dimensionality reduction and careful feature selection.",
    simple: "Add too many features and everything ends up roughly the same distance from everything else. 'Nearest neighbour' stops meaning much when nothing is really near.",
    widget: {
      type: "curveStatic", title: "Everything is far in high-D",
      world: "As feature count grows, the ratio of nearest to farthest neighbour distance rises toward 1.",
      xlab: "dimensions →", xs: [0,1,2,3,4], labels: ["2","10","50","200","1000"], dec: 2, yunit: "",
      series: [ { name: "nearest / farthest distance", ys: [0.15,0.45,0.72,0.88,0.97] } ],
      knob: { label: "Feature dimensions", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "In 2-D the closest point is far nearer than the farthest — 'nearest' is meaningful.", tone: "info" }, { max: 3, text: "As dimensions grow the ratio climbs: near and far distances converge.", tone: "warn" }, { max: 4, text: "🤯 At high dimensions all points are nearly equidistant, so KNN breaks. That is the curse of dimensionality.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Curse of dimensionality", formula: "distances concentrate as dimensions grow", text: "In high dimensions points become near-equidistant, so 'nearest' loses meaning." }
    }
  });

  add("easy", {
    q: "In KNN, what is weighted (distance-weighted) KNN?",
    choices: [
      "A variant where closer neighbours count more toward the prediction than farther ones",
      "A variant that gives every neighbour an equal vote regardless of distance",
      "A variant that uses only the single nearest neighbour",
      "A variant that reweights features to be equally scaled",
      "A variant that increases k automatically for rare classes"
    ],
    explain: "In distance-weighted KNN, each neighbour's vote (or value) is multiplied by a weight that decreases with distance — often 1/distance. Nearer neighbours therefore have more influence than distant ones. This can improve accuracy and reduces sensitivity to the exact choice of k.",
    simple: "Instead of every neighbour getting one equal vote, the closer ones shout louder. A neighbour right next door counts for more than one across town.",
    widget: {
      type: "curveStatic", title: "Closer neighbours shout louder",
      world: "A neighbour's vote weight as its distance from the query point increases.",
      xlab: "distance to neighbour →", xs: [0,1,2,3,4], labels: ["0.5","1","2","4","8"], dec: 2, yunit: "",
      series: [ { name: "vote weight (1/d)", ys: [2.0,1.0,0.5,0.25,0.13] } ],
      knob: { label: "Distance to neighbour", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "A very close neighbour carries a large weight.", tone: "info" }, { max: 3, text: "As distance grows, that neighbour's influence shrinks smoothly.", tone: "info" }, { max: 4, text: "🤯 Weighting votes by closeness instead of counting equally is weighted KNN.", tone: "wow" } ],
      extreme: { at: "min" },
      reveal: { name: "Weighted KNN", formula: "vote ∝ 1 / distance", text: "Weighted KNN lets nearer neighbours influence the prediction more than farther ones." }
    }
  });

  add("easy", {
    q: "In KNN, what does it mean that the algorithm is non-parametric?",
    choices: [
      "It makes no fixed assumption about the data's form and its complexity grows with the data itself",
      "It has no hyperparameters that need to be chosen",
      "It fits a fixed number of weights regardless of dataset size",
      "It cannot be used for regression, only classification",
      "It requires the data to follow a normal distribution"
    ],
    explain: "A non-parametric method does not summarise the data into a fixed set of parameters or assume a particular functional form; instead it keeps the data and lets model complexity scale with the number of examples. KNN is the classic example: it stores every training point rather than fitting coefficients. This flexibility comes at the cost of memory and prediction speed.",
    simple: "KNN doesn't boil the data down to a handful of numbers or assume a shape for it. It keeps all the examples, so the more data you give it, the more detailed it gets.",
    widget: {
      type: "curveStatic", title: "Complexity grows with data",
      world: "Contrast: a parametric model's parameter count stays flat while KNN's stored points grow.",
      xlab: "training size →", xs: [0,1,2,3,4], labels: ["100","1k","10k","100k","1M"], dec: 0, yunit: "",
      series: [ { name: "KNN stored points", ys: [100,1000,10000,100000,1000000] }, { name: "linear model params", ys: [5,5,5,5,5] } ],
      knob: { label: "Training size", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "A parametric model keeps the same fixed handful of parameters no matter the data.", tone: "info" }, { max: 3, text: "KNN, by contrast, keeps every point, so its 'size' grows with the data.", tone: "info" }, { max: 4, text: "🤯 No fixed form, complexity scaling with data — that is what non-parametric means.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Non-parametric model", formula: "no fixed functional form; complexity grows with data", text: "A non-parametric model like KNN keeps the data instead of fitting fixed parameters." }
    }
  });

  /* ===================== logreg1 (10) ===================== */

  add("logreg1", {
    q: "What is logistic regression?",
    choices: [
      "A model that predicts the probability of a class by passing a weighted sum of features through the logistic (sigmoid) function",
      "A model that predicts a continuous value by fitting a straight line to the data",
      "A model that splits data using a tree of yes/no questions",
      "A model that labels points by the vote of their nearest neighbours",
      "A model that groups unlabelled points into clusters"
    ],
    explain: "Despite its name, logistic regression is a classification model. It computes a linear combination of the features and squashes it through the sigmoid to produce a probability between 0 and 1, then thresholds it to pick a class. Its weights are learned by maximising the likelihood of the observed labels.",
    simple: "It is a classifier that outputs a probability, like '80% chance this email is spam'. It adds up weighted clues and bends the total into a 0-to-1 chance.",
    widget: {
      type: "curveStatic", title: "From score to probability",
      world: "As the weighted feature score rises, logistic regression's output probability follows an S-curve.",
      xlab: "weighted score →", xs: [0,1,2,3,4], labels: ["-4","-2","0","2","4"], dec: 2, yunit: "",
      series: [ { name: "P(class = 1)", ys: [0.02,0.12,0.50,0.88,0.98] } ],
      knob: { label: "Weighted score", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "A very negative score gives a probability near 0.", tone: "info" }, { max: 3, text: "At a score of 0 the probability is exactly 0.5; the S-curve rises through it.", tone: "info" }, { max: 4, text: "🤯 A weighted sum squashed into a 0–1 probability — that is logistic regression.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Logistic regression", formula: "P = σ(w·x + b)", text: "Logistic regression maps a weighted feature sum through the sigmoid to a class probability." }
    }
  });

  add("logreg1", {
    q: "In logistic regression, what is the sigmoid (logistic) function?",
    choices: [
      "An S-shaped function that squashes any real number into a value between 0 and 1",
      "A function that sums the absolute differences of two vectors",
      "A function that returns the most common class among neighbours",
      "A function that scales features to zero mean and unit variance",
      "A straight-line function mapping inputs directly to outputs"
    ],
    explain: "The sigmoid, σ(z) = 1 / (1 + e^-z), maps the unbounded linear score z into the interval (0, 1), so it can be read as a probability. It is near 0 for very negative z, near 1 for very positive z, and 0.5 at z = 0. It is what converts logistic regression's linear score into a probability.",
    simple: "It is an S-shaped squasher: feed it any number and it hands back something between 0 and 1. Big positive numbers come out near 1, big negatives near 0, and zero comes out at one-half.",
    widget: {
      type: "curveStatic", title: "The S-shaped squasher",
      world: "Feeding increasing input values into the sigmoid and reading its bounded output.",
      xlab: "input z →", xs: [0,1,2,3,4], labels: ["-6","-3","0","3","6"], dec: 3, yunit: "",
      series: [ { name: "σ(z)", ys: [0.002,0.047,0.500,0.953,0.998] } ],
      knob: { label: "Input z", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "A large negative input is squashed to almost 0.", tone: "info" }, { max: 3, text: "The curve passes through 0.5 at z=0 and never leaves the 0–1 band.", tone: "info" }, { max: 4, text: "🤯 Any real number in, a 0–1 value out via an S-curve — that is the sigmoid.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Sigmoid (logistic) function", formula: "σ(z) = 1 / (1 + e^−z)", text: "The sigmoid squashes any real number into a probability between 0 and 1." }
    }
  });

  add("logreg1", {
    q: "In logistic regression, what is the decision threshold?",
    choices: [
      "The probability cutoff above which a case is assigned to the positive class",
      "The weighted sum of features before the sigmoid is applied",
      "The rate at which the model updates its weights",
      "The number of features included in the model",
      "The intercept term added to the linear score"
    ],
    explain: "Logistic regression outputs a probability; the decision threshold (default 0.5) is the value above which the prediction becomes the positive class. Raising or lowering it trades off precision and recall to suit the application. It converts a continuous probability into a hard class decision.",
    simple: "The model gives a probability, and the threshold is the line you draw to say 'above this, call it positive'. Move the line and you change how cautious the model is.",
    widget: {
      type: "curveStatic", title: "Drawing the cutoff line",
      world: "Raising the probability threshold makes the model predict 'positive' less often.",
      xlab: "threshold →", xs: [0,1,2,3,4], labels: ["0.1","0.3","0.5","0.7","0.9"], dec: 0, yunit: "%",
      series: [ { name: "% flagged positive", ys: [72,55,40,24,9] } ],
      knob: { label: "Decision threshold", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "A low threshold flags many cases as positive.", tone: "info" }, { max: 3, text: "Raising the cutoff makes the model stricter about calling something positive.", tone: "info" }, { max: 4, text: "🤯 That probability cutoff turning a chance into a yes/no is the decision threshold.", tone: "wow" } ],
      extreme: { at: "min" },
      reveal: { name: "Decision threshold", formula: "predict positive if P ≥ threshold", text: "The threshold is the probability cutoff that turns a predicted chance into a class." }
    }
  });

  add("logreg1", {
    q: "In logistic regression, what is a coefficient (weight)?",
    choices: [
      "A learned number multiplying a feature that sets how strongly it pushes the prediction",
      "The probability the model assigns to the positive class",
      "The cutoff used to convert a probability into a class",
      "The count of training examples in each class",
      "The distance between two examples in feature space"
    ],
    explain: "Each feature has a coefficient (weight) learned during training; the model multiplies the feature by its coefficient and sums the results to form the linear score. A larger magnitude means the feature has more influence, and the sign tells which class it favours. In log-odds terms, a coefficient is the change in log-odds per unit of the feature.",
    simple: "Each clue gets a dial that says how much it matters and in which direction. A big positive dial means 'this clue strongly points to yes'; a negative one points to 'no'.",
    widget: {
      type: "curveStatic", title: "How hard a feature pushes",
      world: "Increasing one feature's coefficient magnitude while its value is held fixed; the output probability shifts.",
      xlab: "coefficient →", xs: [0,1,2,3,4], labels: ["0","0.5","1","2","4"], dec: 2, yunit: "",
      series: [ { name: "P(class = 1)", ys: [0.50,0.62,0.73,0.88,0.98] } ],
      knob: { label: "Coefficient size", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "A coefficient of 0 means the feature has no effect on the score.", tone: "info" }, { max: 3, text: "Larger coefficients make the same feature value push the probability harder.", tone: "info" }, { max: 4, text: "🤯 That per-feature multiplier controlling its influence is the coefficient (weight).", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Coefficient (weight)", formula: "score = Σ wᵢ·xᵢ + b", text: "A coefficient is the learned multiplier setting how strongly a feature affects the prediction." }
    }
  });

  add("logreg1", {
    q: "In logistic regression, what is an odds ratio?",
    choices: [
      "The factor by which the odds of the outcome multiply for a one-unit increase in a feature",
      "The probability the model assigns to the positive class",
      "The difference between two predicted probabilities",
      "The ratio of correct to incorrect predictions on the test set",
      "The sum of all the model's coefficients"
    ],
    explain: "For a logistic regression coefficient w, the odds ratio is e^w: increasing that feature by one unit multiplies the odds of the positive outcome by e^w. An odds ratio above 1 means the feature raises the odds; below 1 means it lowers them. It is the standard way to interpret a coefficient's effect.",
    simple: "It says 'bump this feature up by one and the odds change by this multiplier'. An odds ratio of 2 means one more unit doubles the odds of a yes.",
    widget: {
      type: "curveStatic", title: "Multiplying the odds",
      world: "How the odds of the outcome grow as a feature with a fixed coefficient increases by units.",
      xlab: "feature increase (units) →", xs: [0,1,2,3,4], labels: ["0","1","2","3","4"], dec: 1, yunit: "x",
      series: [ { name: "odds multiplier", ys: [1.0,2.0,4.0,8.0,16.0] } ],
      knob: { label: "Feature increase", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "One unit up multiplies the odds by e^w — here, a factor of 2.", tone: "info" }, { max: 3, text: "Each further unit multiplies the odds again by the same factor.", tone: "info" }, { max: 4, text: "🤯 That per-unit multiplier on the odds is the odds ratio, e^w.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Odds ratio", formula: "OR = e^w (odds multiplier per unit)", text: "The odds ratio is the factor by which a one-unit feature change multiplies the odds." }
    }
  });

  add("logreg1", {
    q: "In logistic regression, what is the softmax function?",
    choices: [
      "A function that turns a vector of scores into class probabilities that are positive and sum to 1",
      "A function that squashes a single score into a 0-to-1 value",
      "A function that picks the single largest score and discards the rest",
      "A function that measures distance between two feature vectors",
      "A function that scales each feature to unit variance"
    ],
    explain: "Softmax generalises the sigmoid to multiple classes: given one score per class, it exponentiates each and normalises so the outputs are non-negative and sum to 1, forming a probability distribution over classes. Multinomial (multiclass) logistic regression uses it to produce class probabilities. The largest score gets the largest probability.",
    simple: "When there are several classes, softmax turns each class's score into a slice of a pie that adds up to 100%. Bigger scores get bigger slices, and all the slices together make one whole.",
    widget: {
      type: "curveStatic", title: "Scores into a probability pie",
      world: "One class's score rises while the others stay fixed; its softmax probability climbs and the rest shrink.",
      xlab: "class-A score →", xs: [0,1,2,3,4], labels: ["0","1","2","3","4"], dec: 2, yunit: "",
      series: [ { name: "P(class A)", ys: [0.33,0.47,0.62,0.75,0.85] } ],
      knob: { label: "Class-A score", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "With equal scores, the classes share the probability evenly.", tone: "info" }, { max: 3, text: "As one score grows, its share of the total probability rises while others fall.", tone: "info" }, { max: 4, text: "🤯 Scores turned into positive probabilities that sum to 1 — that is softmax.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Softmax", formula: "softmax(z)ᵢ = e^{zᵢ} / Σⱼ e^{zⱼ}", text: "Softmax converts a vector of scores into a probability distribution over classes." }
    }
  });

  add("logreg1", {
    q: "In logistic regression, what is the log loss (cross-entropy) cost function?",
    choices: [
      "A loss that penalises predicted probabilities by how far and how confidently they miss the true label",
      "A loss equal to the count of misclassified examples",
      "A loss that squares the difference between predicted and true numeric values",
      "A loss that measures the distance between nearest neighbours",
      "A loss that rewards the model for large coefficients"
    ],
    explain: "Log loss (binary cross-entropy) is −[y·log(p) + (1−y)·log(1−p)] averaged over examples, where p is the predicted probability. It grows sharply when the model is confidently wrong and is small when confident and right, so it rewards well-calibrated probabilities. Logistic regression is trained by minimising it (equivalently, maximising likelihood).",
    simple: "It scores the model on its probabilities, not just right/wrong. Being confidently wrong ('99% sure' but wrong) is punished brutally; being confidently right is barely penalised.",
    widget: {
      type: "curveStatic", title: "Confidently wrong hurts most",
      world: "The true label is 1; as the model's predicted probability for it falls, the loss explodes.",
      xlab: "predicted P(true class) →", xs: [0,1,2,3,4], labels: ["0.9","0.6","0.4","0.1","0.02"], dec: 2, yunit: "",
      series: [ { name: "log loss", ys: [0.11,0.51,0.92,2.30,3.91] } ],
      knob: { label: "Predicted P(true class)", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "Predicting 0.9 for the true class gives a small loss.", tone: "info" }, { max: 3, text: "As the predicted probability for the truth drops, the penalty climbs steeply.", tone: "warn" }, { max: 4, text: "🤯 A confident 0.02 on the true class is punished hardest — that is log loss.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Log loss (cross-entropy)", formula: "−[y·log p + (1−y)·log(1−p)]", text: "Log loss penalises predicted probabilities by how confidently they miss the truth." }
    }
  });

  add("logreg1", {
    q: "In logistic regression, what is the (linear) decision boundary?",
    choices: [
      "The flat surface where the weighted score is zero, separating the two predicted classes",
      "The S-curve that maps scores to probabilities",
      "The probability cutoff applied to the model's output",
      "The average of the training examples in each class",
      "The set of coefficients learned during training"
    ],
    explain: "Logistic regression predicts the positive class when the linear score w·x + b exceeds zero (probability above 0.5). The set of points where the score is exactly zero forms a flat boundary — a line in 2-D, a hyperplane in general — that separates the two class regions. This linearity is a defining property of the model.",
    simple: "It is the straight dividing line the model draws between the two classes. On one side it predicts yes, on the other no, and the line itself is where it is perfectly undecided.",
    widget: {
      type: "curveStatic", title: "A straight dividing line",
      world: "Moving across the boundary: the weighted score crosses zero and the predicted class flips.",
      xlab: "position across boundary →", xs: [0,1,2,3,4], labels: ["-2","-1","0","1","2"], dec: 0, yunit: "",
      series: [ { name: "weighted score", ys: [-2,-1,0,1,2] } ],
      knob: { label: "Position", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "On one side the score is negative, so the model predicts class 0.", tone: "info" }, { max: 3, text: "The score crosses exactly zero at one flat surface — probability 0.5 there.", tone: "info" }, { max: 4, text: "🤯 That zero-score hyperplane splitting the classes is the linear decision boundary.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Linear decision boundary", formula: "w·x + b = 0", text: "The boundary is the flat surface where the score is zero, dividing the two classes." }
    }
  });

  add("logreg1", {
    q: "In logistic regression, what is the intercept (bias) term?",
    choices: [
      "A constant added to the weighted feature sum that shifts the score when all features are zero",
      "A coefficient that multiplies one of the input features",
      "The probability output for the positive class",
      "The threshold used to assign a final class",
      "The learning rate controlling weight updates"
    ],
    explain: "The intercept (bias) b is a learned constant added to the weighted sum of features: score = w·x + b. It sets the model's baseline log-odds when every feature is zero, effectively shifting the sigmoid left or right. Without it, the boundary would be forced through the origin.",
    simple: "It is the model's starting point before any feature speaks up — the baseline tilt toward yes or no. It lets the dividing line sit anywhere, not just through zero.",
    widget: {
      type: "curveStatic", title: "Shifting the baseline",
      world: "Raising the intercept while all features are zero lifts the baseline output probability.",
      xlab: "intercept b →", xs: [0,1,2,3,4], labels: ["-2","-1","0","1","2"], dec: 2, yunit: "",
      series: [ { name: "P at x=0", ys: [0.12,0.27,0.50,0.73,0.88] } ],
      knob: { label: "Intercept b", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "A negative intercept gives a low baseline probability when features are zero.", tone: "info" }, { max: 3, text: "At b=0 the baseline probability is exactly 0.5.", tone: "info" }, { max: 4, text: "🤯 That constant setting the score when all features are zero is the intercept (bias).", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Intercept (bias)", formula: "score = w·x + b", text: "The intercept is the constant that sets the baseline score independent of the features." }
    }
  });

  add("logreg1", {
    q: "In logistic regression, what is maximum likelihood estimation?",
    choices: [
      "Choosing the coefficients that make the observed labels as probable as possible under the model",
      "Choosing the coefficients that minimise the number of misclassified points directly",
      "Choosing the coefficients that keep all weights as small as possible",
      "Choosing the threshold that balances precision and recall",
      "Choosing the features that are most correlated with the label"
    ],
    explain: "Logistic regression is fit by maximum likelihood: it selects the weights that maximise the probability the model assigns to the actual training labels. Equivalently, this minimises the log loss. There is no closed-form solution, so it is solved by iterative optimisation such as gradient descent.",
    simple: "It picks the dials that make the real answers look as likely as possible. Among all settings, choose the one under which the data you actually saw is least surprising.",
    widget: {
      type: "curveStatic", title: "Finding the most likely weights",
      world: "Sweeping a coefficient toward its best value; the likelihood of the observed labels peaks.",
      xlab: "coefficient value →", xs: [0,1,2,3,4], labels: ["-2","-1","best","1","2"], dec: 3, yunit: "",
      series: [ { name: "likelihood of data", ys: [0.02,0.18,0.61,0.20,0.03] } ],
      knob: { label: "Coefficient value", min: 0, max: 4, step: 1, init: 0 },
      insights: [ { max: 1, text: "Far from the best value, the observed labels look improbable.", tone: "info" }, { max: 3, text: "The likelihood rises to a single peak at the best-fitting coefficient.", tone: "info" }, { max: 4, text: "🤯 Picking the weights at that peak — where the data is most probable — is maximum likelihood.", tone: "wow" } ],
      extreme: { at: "max" },
      reveal: { name: "Maximum likelihood estimation", formula: "argmax_w  P(labels | features, w)", text: "MLE chooses the coefficients that make the observed labels most probable." }
    }
  });

}());
