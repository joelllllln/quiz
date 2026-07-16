/* Important definitions (A): logistic-regression training terms, Naive Bayes and SVM.
   Each is DEFS-tagged with a reveal so it flows into the Definitions filter, flashcards
   and read+recall. Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function def(qk, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1;
  }

  def("logreg1",
    "What is a cost function in machine learning?",
    "The overall quantity a learning algorithm minimises over the training set",
    ["The measured share of a model's predictions that turn out to be correct on a held-out validation sample", "The extra term added to a model's objective specifically to discourage overly large weights", "The learning rate multiplied by the current gradient at each step", "The gap between training and test performance"],
    "Cost function",
    "The single scalar objective a learning algorithm tries to minimise over the training data, typically the average loss plus any regularisation.",
    "A cost (or objective) function collapses the model's errors into one number, usually the average per-example loss and sometimes a regularisation term as well. Training is the search for the parameter values that make this number as small as possible.",
    "It is the single badness score that training tries to push as low as it can.");

  def("logreg1",
    "What is stochastic gradient descent (SGD)?",
    "Updating the weights from one training example at a time",
    ["Computing the gradient over the entire training set before making a single weight update", "Averaging the gradients from a small handful of examples before each weight update", "Perturbing the weights at random and keeping whichever changes reduce the loss", "Solving for the optimal weights in closed form"],
    "Stochastic gradient descent",
    "Gradient descent that updates the weights using the gradient from a single example (or a few) at a time, giving noisy but fast, frequent updates.",
    "SGD estimates the gradient from just one training example per step instead of the whole dataset, so updates are cheap and happen very often. The per-step noise adds variance but lets the model start improving immediately and can help it escape shallow minima.",
    "Instead of reading the whole dataset before each nudge, it learns a little from every single example.");

  def("logreg1",
    "What is mini-batch gradient descent?",
    "Updating the weights from a small batch of examples each step",
    ["Updating the weights using the gradient from just one randomly chosen example each step", "Updating the weights only once per complete pass through the whole training dataset", "Selecting the batch size automatically by cross-validation on every epoch", "Discarding any batch whose loss is too high"],
    "Mini-batch gradient descent",
    "Gradient descent that updates weights from small batches (e.g. 32 to 256 examples): the practical middle ground between full-batch and single-example SGD.",
    "Mini-batch gradient descent averages the gradient over a small subset of examples per update. This smooths the noise of pure SGD while staying far cheaper than full-batch descent, and the batched matrix maths maps efficiently onto modern hardware, which is why it is the default in practice.",
    "It learns from small groups of examples at a time (not one, not all), which is fast and stable.");

  def("logreg1",
    "What is batch (full-batch) gradient descent?",
    "One weight update per full pass over all the training data",
    ["One weight update computed from a single training example chosen at random each step", "One weight update computed from a small subset of the training examples each step", "One update whose direction is chosen at random and accepted only if it helps", "One update using a fixed rule with no gradient"],
    "Batch gradient descent",
    "Gradient descent that computes the gradient over the entire training set and makes one update per full pass: stable but slow on large data.",
    "Batch (full-batch) gradient descent uses every training example to compute an exact gradient before each update. The updates are smooth and deterministic, but each one is expensive, so on large datasets it improves far more slowly per step than the mini-batch or stochastic variants.",
    "It reads the whole dataset before taking each single step, so every step is accurate but slow.");

  def("bayes1",
    "What is the expectation-maximisation (EM) algorithm?",
    "An iterative fit for latent variables alternating an E-step and an M-step",
    ["A one-shot closed-form calculation that directly maximises the complete-data likelihood in a single pass", "A method that removes latent variables by integrating them out analytically before any fitting is done", "A search that tries many random parameter settings and simply keeps whichever one scores best", "A rule for picking the number of clusters"],
    "Expectation-maximisation",
    "An iterative algorithm for fitting models with hidden variables: an E-step estimates the latent values, an M-step re-estimates parameters to maximise the expected likelihood, repeating to convergence.",
    "EM handles latent (unobserved) variables by alternating two steps: the E-step computes the expected values of the hidden variables under the current parameters, and the M-step updates the parameters to maximise the expected complete-data log-likelihood. Each round cannot decrease the likelihood, so it converges to a local optimum; it underlies Gaussian mixtures and semi-supervised Naive Bayes.",
    "It guesses the missing information, updates the model to fit, then re-guesses, looping until things settle.");
})();
