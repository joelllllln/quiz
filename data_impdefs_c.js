/* Important definitions (C): cross-cutting ML foundations and the core statistics every
   practitioner needs. All become Core Definitions (found1). Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function def(qk, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1;
  }

  def("found1",
    "What is a learning algorithm's inductive bias?",
    "The set of assumptions it uses to generalise beyond the training data.",
    ["A deliberate imbalance introduced into the training labels so that the rarer class is not ignored during fitting.", "The systematic tendency of a model to underperform on whichever class appears least often in the data.", "The portion of test error that remains even with unlimited data and a perfectly tuned model.", "A penalty added to the loss that shrinks coefficients toward zero."],
    "Inductive bias",
    "The assumptions a learner builds in so it can generalise beyond the examples it has seen; without some bias, no generalisation is possible.",
    "Every learner needs assumptions (about smoothness, linearity, relevant features, and so on) to pick one generalisation from the infinitely many consistent with finite data. That built-in preference is its inductive bias, and it is what makes learning from limited examples possible at all.",
    "The built-in guesses a model makes so it can handle new examples it was never shown.");

  def("found1",
    "What is bootstrap sampling?",
    "Drawing samples with replacement to build resampled datasets of the same size.",
    ["Splitting the data once into a training portion and a held-out portion used only for the final evaluation.", "Selecting every k-th row after first sorting the whole dataset by the target variable's value.", "Drawing samples without replacement so that no single example can ever appear twice.", "Reserving the earliest observations for training and the latest ones for testing."],
    "Bootstrap sampling",
    "Repeated sampling with replacement from a dataset to form new datasets of equal size; it underpins bagging and bootstrap confidence intervals.",
    "Bootstrap sampling draws rows with replacement, so a resampled set is the same size as the original but repeats some rows and omits others (about 37% are left out each time). It lets us simulate many datasets from one, which is the basis of bagging and of bootstrap error bars.",
    "Make new datasets by drawing rows at random, putting each one back so it can be picked again.");

  def("found1",
    "What is a validation set used for?",
    "Tuning model choices and hyperparameters, kept separate from the final test set.",
    ["Fitting the model's parameters directly by minimising the training loss over exactly these examples.", "Providing the single untouched sample that reports the final, unbiased estimate of performance.", "Storing the rows that had missing values before they were imputed and returned to training.", "Balancing the classes by duplicating minority examples before the model is trained."],
    "Validation set",
    "Held-out data used to compare models and tune hyperparameters, kept distinct from the test set that gives the final performance estimate.",
    "The validation set guides development decisions, such as which hyperparameters or which model to pick, without touching the test set. Keeping the test set sealed until the very end preserves an honest, unbiased estimate of how the model will generalise.",
    "A practice exam you use to tune your choices, saving the real final exam for the end.");

  def("found1",
    "What is transfer learning?",
    "Reusing a model trained on one task as the starting point for a related task.",
    ["Training many separate models from scratch and then combining their predictions by a majority vote.", "Moving a trained model from a fast research machine onto slower production hardware for serving.", "Sharing one dataset between two teams so each can train its own independent model.", "Passing gradients backward through the network to update each layer's weights."],
    "Transfer learning",
    "Taking knowledge a model learned on one (often large) task and reusing it to jump-start learning on a related task that has less data.",
    "Transfer learning starts from a model already trained on a large source task and adapts it to a target task instead of training from scratch. The pretrained features carry over, so the new task reaches good performance with far less data and compute.",
    "Start from a model that already learned something useful, instead of learning from zero.");

  def("found1",
    "What does it mean to fine-tune a pretrained model?",
    "Continue training it on a smaller, task-specific dataset to adapt its weights.",
    ["Discard all of its learned weights and re-initialise the entire network randomly before training once more.", "Adjust only the visual layout of its outputs without changing any of the underlying parameters at all.", "Freeze every layer permanently so that none of the weights can change during further training.", "Search over hyperparameters such as the learning rate using cross-validation."],
    "Fine-tuning",
    "Taking a pretrained model and training it further on a smaller task-specific dataset so its weights specialise to the new task.",
    "Fine-tuning continues gradient training from pretrained weights rather than random ones, usually with a small learning rate, on the target task's data. This specialises the general features to the new task while retaining most of what was already learned.",
    "Take a model that already knows a lot and train it a bit more on your own data.");

  def("found1",
    "What is semi-supervised learning?",
    "Learning from a little labelled data together with a lot of unlabelled data.",
    ["Learning a policy purely from scalar rewards received while interacting with an environment over time.", "Learning only from fully labelled data, but with the labels deliberately corrupted by random noise.", "Learning from data that carries no labels of any kind whatsoever.", "Learning where a human supplies a correction after every single prediction."],
    "Semi-supervised learning",
    "A middle ground between supervised and unsupervised learning: a small labelled set and a large unlabelled set are used together.",
    "Labels are often expensive while raw data is cheap, so semi-supervised methods combine a few labelled examples with many unlabelled ones. The unlabelled data reveals structure, like clusters or a data manifold, that helps the model generalise from the scarce labels.",
    "Use your few labelled examples plus lots of unlabelled ones to learn better.");

  def("found1",
    "What is self-supervised learning?",
    "Creating training labels from the data itself, such as predicting held-out parts.",
    ["Paying human annotators to hand-label an enormous corpus before any model training can begin.", "Learning entirely from trial-and-error rewards without any fixed dataset of examples at all.", "Selecting which examples to label next by asking the model where it is least certain.", "Averaging the predictions of several supervised models to reduce their variance."],
    "Self-supervised learning",
    "Learning that manufactures its own supervision from unlabelled data, for example by hiding part of the input and predicting it.",
    "Self-supervised learning invents a pretext task whose labels come free from the data, such as predicting a masked word or a missing patch. The model learns rich representations from unlabelled data that transfer to downstream tasks, which is how most modern foundation models are pretrained.",
    "The data labels itself: hide a piece and train the model to guess it.");

  def("found1",
    "What is online learning?",
    "Updating the model incrementally as each new example arrives.",
    ["Training on the entire fixed dataset in one pass and then never updating the model again afterwards.", "Running a trained model on a remote server so that users can query it over the internet.", "Learning only from data that was collected while a device was connected to the network.", "Tuning hyperparameters by trying every combination on a grid."],
    "Online learning",
    "Learning that updates the model one example (or small batch) at a time as data streams in, rather than retraining on everything at once.",
    "Online learning processes data sequentially, adjusting the model with each incoming example or mini-batch. It suits streaming data and shifting distributions, since the model keeps adapting without storing or re-fitting the whole dataset each time.",
    "The model learns on the fly, updating itself with each new example.");

  def("found1",
    "What is batch learning?",
    "Training on the whole fixed dataset at once, offline.",
    ["Continuously updating the model as each new observation arrives one at a time in a stream.", "Splitting the data into many folds and rotating which fold serves as the validation set.", "Training on a small random subset drawn fresh from a stream at every single step.", "Learning from rewards gathered by acting inside an environment."],
    "Batch learning",
    "Training the model on the entire dataset in one offline pass; to learn from new data, the model is retrained from scratch.",
    "Batch (offline) learning uses the full dataset at training time and then deploys a fixed model. Incorporating new data means retraining on the enlarged dataset, in contrast to online learning which updates continuously. It is simpler when the data distribution is stable.",
    "Train once on all the data you have, then deploy a fixed model.");

  def("found1",
    "What is concept drift?",
    "The data's relationships changing over time, so a deployed model decays.",
    ["The gradual accumulation of tiny rounding errors in a model's weights each time it is saved to disk.", "A slow shift in a slider control that a user drags while interacting with a live dashboard.", "The tendency of gradient descent to overshoot the minimum when the learning rate is too high.", "The reshuffling of feature columns between the training file and the scoring file."],
    "Concept drift",
    "When the statistical relationship between inputs and target changes after deployment, so a once-accurate model steadily loses accuracy.",
    "Concept drift means the mapping the model learned no longer matches reality because the underlying relationship (or the input distribution) has shifted over time. A model that was accurate at launch degrades, which is why deployed models need monitoring and periodic retraining.",
    "The world changes after you train, so your model slowly goes stale.");

  def("found1",
    "What is model monitoring in production?",
    "Tracking a live model's inputs and performance to catch degradation.",
    ["Watching the training loss curve during fitting to decide the exact moment at which to stop early.", "Recording every hyperparameter combination that was tried during the offline tuning phase.", "Displaying a network diagram of the model's layers so engineers can inspect its architecture.", "Encrypting the model file so that only authorised services can load it."],
    "Model monitoring",
    "Continuously observing a deployed model's inputs, outputs and accuracy so that drift or failures are detected before they cause harm.",
    "Model monitoring watches production data and predictions for trouble, such as shifting input distributions, falling accuracy, or unusual outputs. Catching these early triggers investigation or retraining, closing the loop between deployment and maintenance.",
    "Keep an eye on your live model so you notice when it starts going wrong.");

  def("found1",
    "What does the covariance between two variables tell you?",
    "Whether they tend to move together, and by how much, in unstandardised units.",
    ["The proportion of the variance in one variable that a regression on the other manages to explain.", "The probability that the two variables are statistically independent of each other in the population.", "The straight-line distance between the two variables' mean values.", "The number of standard deviations separating the two variables' averages."],
    "Covariance",
    "A measure of how two variables vary together: positive when they rise together, negative when one rises as the other falls; its magnitude depends on their units.",
    "Covariance averages the product of each variable's deviations from its own mean, so its sign gives the direction of the linear relationship. Its magnitude, however, depends on the variables' units, which is why it is standardised into a correlation before being compared.",
    "It says whether two things go up and down together, but its size depends on their units.");

  def("found1",
    "What is a correlation coefficient?",
    "Covariance rescaled to lie in [-1, 1] so that it is unit-free.",
    ["The slope of the straight line fitted through the scatterplot of the two variables by least squares.", "The average of the two variables' individual standard deviations, reported on their original scale.", "The probability that one variable directly causes changes in the other variable.", "The count of data points that fall exactly on the fitted regression line."],
    "Correlation coefficient",
    "A standardised measure of association: covariance divided by the product of the two standard deviations, always between -1 and +1.",
    "Dividing covariance by both standard deviations removes the units, giving a number in [-1, 1] whose sign is the direction and whose magnitude is the strength of the linear association. Being scale-free, it can be compared across different pairs of variables.",
    "Covariance cleaned up onto a fixed -1 to +1 scale so you can compare it.");

  def("found1",
    "What does the Pearson correlation coefficient measure?",
    "The strength of the linear association between two continuous variables.",
    ["The strength of any monotonic association between two variables, computed after replacing values with their ranks.", "Whether two categorical variables occur together more often than independence would predict.", "The average squared distance between predictions and the values they aim to match.", "The proportion of concordant pairs minus the proportion of discordant pairs."],
    "Pearson correlation",
    "The standard correlation coefficient r, measuring how closely two continuous variables follow a straight-line relationship.",
    "Pearson's r captures linear association only: it sits near plus or minus one when points hug a straight line and near zero when there is no linear trend. It can miss strong non-linear relationships and assumes roughly continuous, interval-scaled variables.",
    "How closely two number columns fall along a straight line.");

  def("found1",
    "What does the Spearman correlation coefficient measure?",
    "Monotonic association, found by applying Pearson's formula to the ranks.",
    ["Linear association between two continuous variables, using their raw values rather than their ranks.", "Whether two variables are independent by comparing observed and expected counts in a table.", "The exact functional form of the curve that best relates the two variables to each other.", "The average absolute gap between the two variables after each has been standardised."],
    "Spearman correlation",
    "A rank-based correlation: Pearson's coefficient computed on the ranked data, so it detects any monotonic (not only linear) relationship.",
    "Spearman's coefficient replaces each value by its rank and then applies Pearson's formula, so it measures whether one variable consistently increases or decreases with the other, even along a curve. This makes it robust to outliers and to monotonic but non-linear relationships.",
    "Rank the values first, then check whether one rises whenever the other does.");

  def("found1",
    "What is a p-value?",
    "The chance of data at least this extreme if the null hypothesis were true.",
    ["The probability that the null hypothesis is true given the particular data that were actually observed.", "The probability that the alternative hypothesis is correct once the experiment has been completed.", "The fixed threshold, often 0.05, below which a result is declared significant.", "The size of the effect measured between the two experimental groups."],
    "P-value",
    "The probability, assuming the null hypothesis holds, of observing a result at least as extreme as the one obtained; small p-values cast doubt on the null.",
    "A p-value is computed assuming the null hypothesis is true and measures how surprising the data are in that world. It is not the probability that the null (or the alternative) is true, a very common misreading; it only quantifies incompatibility with the null.",
    "If nothing were really going on, how unlikely would data this extreme be?");

  def("found1",
    "What is a confidence interval?",
    "A range that would capture the true value in X% of repeated samples.",
    ["A range that has exactly a ninety-five percent probability of containing the true value given this one sample.", "The span between the smallest and the largest observation recorded anywhere in the dataset.", "The interval within which every future data point is guaranteed to fall.", "A band drawn one standard deviation on either side of a single prediction."],
    "Confidence interval",
    "An interval estimate whose construction, repeated over many samples, would contain the true parameter a stated percentage (e.g. 95%) of the time.",
    "The confidence level describes the long-run procedure: 95% of intervals built this way from repeated samples would contain the true parameter. For one computed interval the parameter is either in it or not, so the 95% is a property of the method, not a probability about that single interval.",
    "A range built so that, over many repeats, most such ranges cover the truth.");

  def("found1",
    "What is a Type I error?",
    "A false positive: rejecting a null hypothesis that is actually true.",
    ["A false negative, in which a genuinely false null hypothesis is nonetheless not rejected by the test.", "The mistake of collecting too small a sample to be able to detect any real effect at all.", "An error caused by choosing the wrong statistical test for the type of data.", "The difference between the estimated effect and the true effect size."],
    "Type I error",
    "Rejecting a true null hypothesis, i.e. a false positive; its probability is the significance level alpha.",
    "A Type I error happens when a test declares an effect that is not really there, rejecting a null hypothesis that is in fact true. Its rate is set by the chosen significance level alpha (for example 0.05), the false-positive rate you are willing to tolerate.",
    "Crying wolf: the test flags an effect that isn't actually real.");

  def("found1",
    "What is a Type II error?",
    "A false negative: failing to reject a null hypothesis that is actually false.",
    ["A false positive, in which a null hypothesis that is genuinely true ends up being wrongly rejected.", "The error of reporting a confidence interval that turns out to be far too wide to be useful.", "A mistake introduced when the data clearly violate the test's distributional assumptions.", "The gap between the chosen significance level and the achieved p-value."],
    "Type II error",
    "Failing to reject a false null hypothesis, i.e. a false negative; its probability is beta, and 1 minus beta is the test's power.",
    "A Type II error is a missed detection: a real effect exists but the test fails to find it, so the false null is not rejected. Its probability beta falls as sample size or effect size grows, and 1 minus beta is the power of the test.",
    "Missing it: there really is an effect, but the test fails to catch it.");

  def("found1",
    "What is the null hypothesis in a statistical test?",
    "The default claim of no effect or no difference that the test tries to refute.",
    ["The claim that a real effect or difference does exist, which the researcher hopes the data will support.", "The hypothesis that is automatically accepted whenever the sample size is judged to be large enough.", "The range of parameter values considered plausible before any data are collected.", "The assumption that all of the variables in the study are normally distributed."],
    "Null hypothesis",
    "The baseline hypothesis of no effect or no difference; a test looks for evidence to reject it in favour of the alternative.",
    "The null hypothesis states that nothing is going on, no effect, no difference, no association. A test assumes it is true and checks whether the data are too unlikely under it to sustain; rejecting the null is the evidence for the alternative. Failing to reject is not proof the null is true.",
    "The boring 'nothing is happening' assumption a test tries to knock down.");

  def("found1",
    "What does it mean for a result to be statistically significant?",
    "The evidence is strong enough that the result is unlikely to be mere chance.",
    ["The effect is large enough in size that it genuinely matters for a real-world decision or application.", "The finding has already been independently replicated by several other research teams.", "Every single data point in the sample agreed with the researcher's original prediction.", "The sample was drawn perfectly at random from the whole target population."],
    "Statistical significance",
    "A result is statistically significant when its p-value falls below a preset threshold, so it is unlikely to arise under the null hypothesis alone.",
    "Statistical significance means the observed data would be improbable if only chance (the null) were at work, so the null is rejected at a chosen level such as 0.05. It concerns the reliability of the effect, not its size or importance; significance is not the same as practical importance.",
    "Unlikely to be a fluke, though not necessarily big or important.");

  def("found1",
    "What is the normal distribution?",
    "The symmetric bell-shaped curve fixed by its mean and standard deviation.",
    ["A flat distribution in which every outcome across the whole range is exactly equally likely to occur.", "A right-skewed distribution used to model the waiting time between independent random events.", "A distribution defined only for whole-number counts of successes in fixed trials.", "The distribution of ranks produced after sorting a set of values."],
    "Normal distribution",
    "The Gaussian 'bell curve': a symmetric continuous distribution fully described by its mean (centre) and standard deviation (spread).",
    "The normal distribution is symmetric about its mean, with spread set by its standard deviation, and traces the familiar bell shape. It recurs throughout statistics partly because of the central limit theorem, and many methods assume approximate normality of errors or estimates.",
    "The classic bell curve, centred at its average and spread by its standard deviation.");

  def("found1",
    "What does the central limit theorem state?",
    "Sample means tend toward a normal distribution as the sample size grows.",
    ["Any sufficiently large sample drawn from a population will itself be shaped like a bell curve overall.", "Increasing the sample size always reduces the true variance of the underlying population itself.", "Every population eventually becomes normally distributed if you keep collecting data long enough.", "The mean and the median of any distribution always converge to one value."],
    "Central limit theorem",
    "The distribution of the sample mean approaches a normal distribution as sample size increases, whatever the population's shape (given finite variance).",
    "The central limit theorem says averages of many independent draws are approximately normal for large samples, even when the raw data are not normal. This is why normal-based confidence intervals and z or t tests for means work so widely; it concerns the distribution of the mean, not of the data.",
    "Averages of big samples look bell-shaped, even if the raw data don't.");

  def("found1",
    "What is A/B testing?",
    "A controlled experiment comparing two variants to measure a causal effect.",
    ["Splitting a dataset into two folds so that each half can take its turn serving as the test set.", "Grading a model on two separate metrics and then reporting whichever of the two happens to look better.", "Labelling the data in two passes so that disagreements between annotators can be resolved.", "Trying two learning rates in turn to see which one trains the network faster."],
    "A/B testing",
    "An online controlled experiment: users are randomly assigned to variant A or B and an outcome is compared to estimate the causal effect of the change.",
    "A/B testing randomly assigns subjects to a control (A) and a treatment (B), so any difference in the measured outcome can be attributed to the change rather than to confounders. Randomisation is what turns the comparison into a causal estimate, unlike passive observation.",
    "Randomly show two versions and compare results to see which truly works better.");
})();
