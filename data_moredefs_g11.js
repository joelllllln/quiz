/* More definitions (batch 11): prerequisite and adjacent basics. Probability foundations
   for Naive Bayes, statistics and distributions for Core Definitions, calculus and
   optimisation basics for Logistic Regression, linear algebra basics for PCA, information
   basics for Decision Trees, probability reading of the confusion matrix for Evaluation.
   Each DEFS-tagged with a reveal so it flows into the Definitions filter, flashcards and
   read+recall. Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function def(qk, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1;
  }

  /* ============ Probability foundations for Naive Bayes (bayes1) — 10 ============ */

  def("bayes1",
    "What is a probability, in the most basic sense?",
    "A number between 0 and 1 measuring how likely an event is, with all possible outcomes summing to 1.",
    ["Any positive number that counts how many times an event has occurred in the past.",
     "A percentage that only applies to experiments that can be repeated infinitely often.",
     "The ratio of an event's payoff to its cost, as used in betting markets.",
     "A number between −1 and 1 measuring how strongly two events move together."],
    "Probability",
    "A measure of uncertainty on a 0-to-1 scale: 0 is impossible, 1 is certain, and the probabilities of all mutually exclusive outcomes of an experiment sum to exactly 1.",
    "Everything in Naive Bayes is arithmetic on these numbers — priors, likelihoods and posteriors are all probabilities, and the sum-to-1 rule is what lets the classifier normalise its class scores at the end.",
    "A likelihood dial from 0 (never) to 1 (always), where all the options together always fill the whole dial.");

  def("bayes1",
    "In probability theory, what are the sample space and an event?",
    "The sample space is the set of all possible outcomes; an event is any subset of them.",
    ["The sample space is the collected dataset, and an event is any single row within it.",
     "The sample space is the range of a feature; an event is one standard deviation of it.",
     "The sample space is the list of classes; an event is a misclassification error.",
     "The sample space is time itself, and an event is anything that happens at an instant."],
    "Sample space and event",
    "For one die roll the sample space is {1,2,3,4,5,6}; 'rolled an even number' is the event {2,4,6}. An event's probability is the total probability of the outcomes it contains.",
    "This vocabulary makes the rules precise: P(spam) is the probability of the event 'email is spam' inside the sample space of all emails — the frame in which priors, likelihoods and posteriors are all defined.",
    "The sample space is everything that could happen; an event is the slice of it you care about.");

  def("bayes1",
    "What does the complement rule of probability state?",
    "P(not A) = 1 − P(A): an event and its opposite share the whole probability.",
    ["P(not A) always equals P(A), because opposites are equally likely by symmetry.",
     "P(not A) = P(A)² whenever the event A is independent of itself.",
     "P(not A) is undefined unless the event A has already been observed.",
     "P(not A) = −P(A), with the sign marking the direction of the event."],
    "Complement rule",
    "Since 'A happens' and 'A does not happen' cover all outcomes without overlap, their probabilities sum to 1 — so one is always available from the other by subtraction.",
    "Binary classifiers lean on this constantly: P(not spam) = 1 − P(spam) is why a model only needs to output one number per binary decision, and why probabilities near 0.5 mean genuine uncertainty.",
    "If rain is 30% likely, no-rain is 70% — the two must add up to everything.");

  def("bayes1",
    "What is the joint probability P(A, B)?",
    "The probability that events A and B both happen together.",
    ["The probability that at least one of the two events A or B happens.",
     "The larger of the two individual probabilities P(A) and P(B).",
     "The probability of A happening immediately followed by B on the next trial.",
     "The average of the two probabilities, weighted by their variances."],
    "Joint probability",
    "P(A, B) — also written P(A ∩ B) — is the chance of the co-occurrence: an email being spam AND containing the word 'free'. Joints are the raw material from which conditionals and marginals are carved.",
    "Naive Bayes is at heart a claim about a joint: the probability of a class and all its features together, which the naive assumption lets it build from cheap per-feature pieces instead of impossible full tables.",
    "The chance of both things at once — spam and 'free' in the same email.");

  def("bayes1",
    "What is a marginal probability, and how is it obtained from a joint distribution?",
    "The probability of one event alone, found by summing the joint over all values of the other variable.",
    ["The smallest probability in the joint table, marking the rarest combination.",
     "The probability left over after subtracting all conditional probabilities from 1.",
     "The joint probability divided by the prior, as given by Bayes' theorem.",
     "The probability measured at the extreme edges of a variable's range."],
    "Marginal probability (marginalisation)",
    "P(A) = Σ_b P(A, B=b): to get one variable's probability, add the joint across everything the other variable could be — historically the totals written in a table's margins.",
    "This is exactly how Naive Bayes' denominator arises: the evidence P(x) is the joint P(x, class) summed over all classes — marginalising the class out — which is why it is also called the marginal likelihood.",
    "Collapse the table: add across the row and you get the row's own total probability.");

  def("bayes1",
    "What does the product rule (chain rule) of probability say?",
    "P(A, B) = P(A|B) × P(B): a joint probability factors into a conditional times a marginal.",
    ["P(A, B) = P(A) × P(B) always, whatever the relationship between the two events.",
     "P(A, B) = P(A) + P(B) − 1 whenever both probabilities exceed one half.",
     "P(A|B) = P(A, B) × P(B), so conditioning multiplies rather than divides.",
     "P(A, B) equals whichever of P(A|B) or P(B|A) happens to be smaller."],
    "Product rule (chain rule of probability)",
    "Any joint splits as 'chance of B, times chance of A given B' — and symmetrically P(A,B) = P(B|A)P(A). Chained over many variables it factors any joint into a cascade of conditionals.",
    "Equating its two symmetric forms and dividing is literally the derivation of Bayes' theorem; and the naive independence assumption is what collapses the chain P(x₁|c)P(x₂|c,x₁)… into a simple product of per-feature terms.",
    "Both-at-once = one of them, times the other given the first.");

  def("bayes1",
    "What does the law of total probability let you compute?",
    "An overall probability by averaging conditional probabilities over the scenarios, weighted by scenario probability.",
    ["The probability of an event given that every possible scenario occurred simultaneously.",
     "The exact number of outcomes in the sample space from conditional counts alone.",
     "An upper bound on any conditional probability from its reverse conditional.",
     "The variance of an event's indicator from its expectation alone."],
    "Law of total probability",
    "P(A) = Σᵢ P(A|Bᵢ)P(Bᵢ) over scenarios Bᵢ that cover all possibilities without overlap: the word 'free' appears with probability (rate in spam × spam share) + (rate in ham × ham share).",
    "It is the workhorse behind Bayes' denominator — the evidence is exactly this scenario-weighted sum — and behind every 'overall rate' calculation from per-group rates, from disease screening to error analysis.",
    "The overall chance is a weighted average of the chance in each world, weighted by how likely each world is.");

  def("bayes1",
    "When are two events statistically independent?",
    "When P(A, B) = P(A) × P(B) — knowing one happened tells you nothing about the other.",
    ["When the two events cannot possibly happen at the same time.",
     "When the two events have exactly equal probabilities of occurring.",
     "When one event always happens immediately after the other.",
     "When their probabilities sum to exactly one."],
    "Statistical independence",
    "Independence means conditioning changes nothing: P(A|B) = P(A). Multiplying marginals then gives the joint exactly — the only situation where that shortcut is legitimate.",
    "Note the classic trap in the distractor: mutually exclusive events are maximally dependent, not independent — if one happened, the other certainly didn't. Independence is informational irrelevance, not incompatibility.",
    "Two coins in different pockets: how one lands says nothing about the other.");

  def("bayes1",
    "What is conditional independence, the exact assumption Naive Bayes makes?",
    "Two variables may be dependent overall, yet independent once a third variable's value is known.",
    ["Two variables are independent only on the condition that the dataset is large enough.",
     "A weaker form of independence that holds for at least half of all possible conditions.",
     "The requirement that every feature be independent of the class label itself.",
     "Independence that holds in the training data but not necessarily in the test data."],
    "Conditional independence",
    "A ⊥ B | C means P(A,B|C) = P(A|C)P(B|C). 'Free' and 'winner' co-occur heavily across all email — but within the spam class alone, knowing one may add nothing about the other: the class explains their association.",
    "This is subtler and weaker than full independence, and it is the precise naive assumption: features are treated as independent given the class, letting the likelihood factor into per-feature terms learned by simple counting.",
    "Ice cream sales and drownings move together — until you fix the season; inside summer, they're strangers.");

  def("bayes1",
    "A test is 99% accurate for a disease affecting 1 in 10,000 people. Someone tests positive, and most people guess they're probably sick. What error is this?",
    "The base rate fallacy: ignoring the tiny prior, which makes false positives outnumber true ones.",
    ["The gambler's fallacy: assuming past negative tests make a positive one more likely.",
     "Overfitting: the test has memorised the training population's quirks.",
     "Simpson's paradox: the accuracy reverses when the data is split by age group.",
     "Regression to the mean: extreme test results drift back on retesting."],
    "Base rate fallacy",
    "Intuition fixates on the 99% and forgets the 0.01% prior. In a million people: ~99 sick people test positive, but ~10,000 healthy ones do too — a positive result means roughly a 1% chance of disease, not 99%.",
    "Bayes' theorem is the antidote: posterior odds = prior odds × likelihood ratio, and no likelihood ratio can rescue a vanishing prior. This is why prevalence-aware evaluation (precision, PR curves) matters on rare-event problems.",
    "When the condition is rare enough, most alarms are false alarms — however good the alarm is.");

  /* ============ Statistics & distribution basics (found1) — 13 ============ */

  def("found1",
    "What are the mean, median and mode of a set of values?",
    "The arithmetic average, the middle value when sorted, and the most frequent value.",
    ["Three synonyms for the same central value, used in different scientific fields.",
     "The smallest, central and largest values observed in the sample.",
     "The average, its standard error, and the sample size, respectively.",
     "The centre estimates for small, medium and large datasets respectively."],
    "Mean, median and mode",
    "Three answers to 'what is typical?': mean (sum ÷ count) uses every value's magnitude; median is the sorted midpoint; mode is the most common value. On symmetric data they agree; skew pulls them apart.",
    "The gap between mean and median is itself a diagnostic: average income far above median income signals a long right tail. The median's robustness to outliers is why it backs robust scaling and MAE-style losses.",
    "The average, the middle one, and the most popular one — three different 'typicals'.");

  def("found1",
    "What is the variance of a variable in statistics?",
    "The average squared deviation from the mean — spread, in squared units.",
    ["The difference between the maximum and minimum values in the data.",
     "The proportion of values that fall more than one unit from the mean.",
     "The sum of all values divided by the number of distinct values.",
     "The probability that a new observation exceeds the current mean."],
    "Variance (statistics)",
    "Var(X) = E[(X − mean)²]: deviations are squared (so spread can't cancel out) and averaged. Its square root, the standard deviation, restores the original units.",
    "Variance is the currency of much of ML: PCA ranks directions by it, the bias-variance decomposition trades it, feature selection thresholds it, and squaring is why outliers dominate variance-based methods.",
    "How spread out the data is — measured by how far values typically sit from the average, squared.");

  def("found1",
    "What are percentiles and quantiles?",
    "Cut points of the sorted data: the p-th percentile is the value below which p% of observations fall.",
    ["The percentage of observations that are missing or invalid in each column.",
     "Equal-width slices of a variable's range between its minimum and maximum.",
     "The values a variable takes most and least often, respectively.",
     "Rounding levels used when storing continuous values as integers."],
    "Percentiles and quantiles",
    "Quantiles slice the sorted data into equal-count portions — quartiles into four, percentiles into a hundred. The median is the 50th percentile; the IQR spans the 25th to the 75th.",
    "Rank-based summaries resist outliers where means do not, which is why robust scaling uses the IQR, why boxplots are drawn from quartiles, and why quantile binning gives evenly filled bins on skewed data.",
    "Sort everything, then read off milestones: the 90th percentile is the value that beats 90% of the data.");

  def("found1",
    "What is a random variable?",
    "A variable whose value is determined by chance, with a probability attached to each possible value.",
    ["A variable in a program whose value has not yet been initialised.",
     "A feature column that failed a statistical significance test.",
     "Any quantity that changes over time, such as a stock price.",
     "A variable chosen at random from the available feature columns."],
    "Random variable",
    "A quantity that takes different values across random outcomes — the number a die shows, tomorrow's rainfall, an email's class. Formally a function from outcomes to numbers, described entirely by its distribution.",
    "It is the bridge between data and probability: features and labels are modelled as random variables, which is what licenses talk of expectations, variances, likelihoods and everything built on them.",
    "A number that chance will fill in — with known odds for each possibility.");

  def("found1",
    "What is a probability distribution, and how do a PMF and a PDF differ?",
    "The map from possible values to their chances: a PMF gives point probabilities for discrete values, a PDF gives density for continuous ones.",
    ["A PMF describes the probabilities seen in the training data, while a PDF predicts the probabilities expected in the test data.",
     "A PMF is the empirical histogram counted from a finite sample, and a PDF is the theoretical curve that the histogram approaches.",
     "They are two names for the same object, except that a PDF must always be symmetric around zero while a PMF need not be.",
     "A distribution is the sorted list of every value a dataset actually contains, from the smallest observation to the largest."],
    "Probability distribution (PMF / PDF)",
    "A distribution says how probability spreads over possible values. Discrete variables get a probability mass function (P(X=3) is a real probability); continuous ones get a density, where only areas under the curve are probabilities and P(X = exactly x) is zero.",
    "The distinction is why MultinomialNB (counts, PMF) and GaussianNB (measurements, PDF) are different models, and why a Gaussian 'likelihood' can exceed 1 without contradiction — it's density, not probability.",
    "The complete menu of possible values with their chances — as exact points for countable things, as a smooth curve for measurements.");

  def("found1",
    "What is the expected value of a random variable?",
    "Its probability-weighted average — the long-run mean over many repetitions.",
    ["The single value the variable takes most often in any finite sample.",
     "The value you should expect on the very next observation with certainty.",
     "The midpoint between the variable's largest and smallest possible values.",
     "The value at which its probability density reaches its maximum."],
    "Expected value",
    "E[X] = Σ x·P(x) (or ∫x·f(x)dx): each possible value weighted by its probability. A lottery ticket paying £1000 with probability 0.001 has expected value £1 — even though no single ticket ever pays £1.",
    "Expectation is the quiet backbone of ML: expected loss is what training minimises, expected cost is what cost matrices compute, variance is an expectation of squared deviations, and 'the long run' is its operational meaning via the law of large numbers.",
    "The fair average of all outcomes, each counted in proportion to its chance.");

  def("found1",
    "What is a Bernoulli distribution?",
    "The distribution of a single yes/no trial: 1 with probability p, 0 with probability 1−p.",
    ["The distribution of the sum of many independent yes/no trials.",
     "A continuous bell-shaped distribution truncated to the interval [0, 1].",
     "The distribution of waiting times between rare independent events.",
     "A two-peaked distribution whose modes sit at the two class means."],
    "Bernoulli distribution",
    "The atom of probability: one trial, two outcomes, one parameter p. A coin flip, a single click/no-click, one email being spam or not.",
    "Binary classification is Bernoulli modelling in disguise: logistic regression predicts each label's p and log loss is exactly the Bernoulli negative log-likelihood; BernoulliNB models every binary feature this way per class.",
    "One coin flip's worth of randomness: heads with chance p, tails otherwise.");

  def("found1",
    "What is a binomial distribution?",
    "The distribution of the number of successes in n independent yes/no trials with the same probability p.",
    ["The distribution of a quantity influenced by exactly two independent causes.",
     "The continuous limit of any distribution once the sample grows large enough.",
     "The distribution of the proportion of a population that shares two traits.",
     "A distribution with two parameters that is always symmetric around n/2."],
    "Binomial distribution",
    "Count the 1s across n Bernoulli trials: heads in 20 flips, spam emails in a batch of 100, correct predictions in a test set. Mean np, variance np(1−p).",
    "It is the sampling model behind evaluation noise: a measured accuracy is a binomial proportion, so its uncertainty (±√(p(1−p)/n)) shrinks only with √n — the reason small test sets give shaky scores and A/B tests need volume.",
    "Flip the coin n times and count the heads — the binomial says how that count fluctuates.");

  def("found1",
    "What is a uniform distribution?",
    "A distribution where every value in the range is equally likely.",
    ["A distribution whose mean, median and mode are all forced to equal zero.",
     "The distribution of any variable measured in standardised units.",
     "A bell-shaped distribution with unusually thin, uniform tails.",
     "The distribution left over after all outliers are removed from a sample."],
    "Uniform distribution",
    "Flat probability: a fair die (discrete uniform over 1–6) or a random number in [0,1) (continuous uniform). No value is privileged over any other.",
    "It is the language of 'no preference': random search samples hyperparameters uniformly (often on a log scale), random splits pick rows uniformly, and a uniform prior is the classic starting point when nothing is known.",
    "Perfectly even odds across the whole range — the flat-line distribution.");

  def("found1",
    "What does the i.i.d. assumption say about a dataset?",
    "Examples are independent draws from one identical distribution.",
    ["Every feature is independent of every other feature within each class.",
     "The training and test sets contain identical numbers of each class.",
     "All features have been rescaled to be identically distributed.",
     "Each example was labelled independently by two identical annotators."],
    "i.i.d. assumption",
    "Independent and identically distributed: one row tells you nothing about another (independence), and all rows come from the same underlying source (identical distribution). It is the standing assumption beneath random splits and generalisation guarantees.",
    "Most real leaks are i.i.d. violations wearing disguises: duplicated rows, several rows per patient, time series (tomorrow depends on today), drift between collection periods. Grouped and temporal validation exist precisely for these breaches.",
    "Every row is a fresh, unrelated draw from the same urn — no siblings, no time travel, no urn-swapping.");

  def("found1",
    "What does the law of large numbers guarantee?",
    "Sample averages converge to the true expected value as the number of independent observations grows.",
    ["Any sufficiently large dataset contains at least one example of every class.",
     "Rare events become impossible once enough observations have been collected.",
     "The largest value in a sample grows in proportion to the sample size.",
     "After a run of heads, tails becomes more likely to restore the balance."],
    "Law of large numbers",
    "With enough independent draws, the running average settles onto E[X]: casino profits stabilise, measured frequencies approach true probabilities, and estimates firm up at rate ~1/√n.",
    "It is why more data helps and why probability estimates from counts (Naive Bayes' likelihoods, a leaf's class fractions) can be trusted at volume but are noisy when counts are small — the gap smoothing exists to patch. The last distractor is the gambler's fallacy, its popular corruption.",
    "Flip enough coins and the heads fraction hugs 50% — averages calm down as data piles up.");

  def("found1",
    "What is the difference between a population and a sample?",
    "The population is the entire group of interest; a sample is the subset actually observed.",
    ["The population is the labelled data and the sample is the unlabelled remainder.",
     "The population contains people while a sample contains their measurements.",
     "They are the same thing once a dataset exceeds a few thousand rows.",
     "The population is the test set from which training samples are drawn."],
    "Population vs sample",
    "Statistics' founding distinction: the truth lives in the population (all customers, all emails ever), but only a sample is measured. Sample statistics — means, accuracies, correlations — are estimates of population values, with sampling error attached.",
    "Every ML dataset is a sample, and generalisation is exactly the leap from sample to population; test-set scores deserve the same humility as any poll — they estimate, not reveal, true performance.",
    "You taste a spoonful (sample) to judge the pot (population) — and the spoonful can mislead.");

  def("found1",
    "What is sampling (selection) bias?",
    "The observed data systematically over- or under-represents parts of the population, skewing conclusions.",
    ["The random noise that makes two samples from one population differ slightly.",
     "The bias term of a model trained on a randomly selected subset of features.",
     "Using a sample so large that it includes nearly the entire population.",
     "Ordering the training data by label before fitting the model."],
    "Sampling (selection) bias",
    "When how the data was gathered decides what got in — survey volunteers, survivors, one hospital's patients, users who opted in — the sample stops resembling the population, and no amount of it fixes the distortion.",
    "Models inherit and amplify collection bias: a fraud model trained only on investigated cases learns who gets investigated. The classic emblem is survivorship bias — armouring returning planes where they were hit, missing the planes that never returned.",
    "If only the loudest voices got recorded, the recording misrepresents the room — however long it is.");

  /* ============ Calculus & optimisation basics (logreg1) — 6 ============ */

  def("logreg1",
    "What does the derivative of a function tell you?",
    "The instantaneous rate of change — the slope of the function at that exact point.",
    ["The area accumulated under the function's curve up to that point.",
     "The function's average value across its entire domain.",
     "The distance between the function's maximum and minimum.",
     "How many times the function crosses zero near that point."],
    "Derivative",
    "f'(x) measures how fast f changes as x nudges: positive slope means increasing, negative means decreasing, zero flags a flat point — a candidate minimum or maximum.",
    "Training is applied differentiation: the derivative of loss with respect to a weight says which way and how strongly to adjust it, and 'set the derivative to zero' is where closed-form solutions like least squares come from.",
    "The steepness of the curve right where you're standing.");

  def("logreg1",
    "What is the gradient of a multi-variable function?",
    "The vector of all partial derivatives — pointing in the direction of steepest increase.",
    ["The single largest partial derivative, indicating the most important variable.",
     "The average slope of the function computed across all of its variables.",
     "A measure of how curved the function is at its minimum point.",
     "The difference between the function's value at two neighbouring points."],
    "Gradient (vector of partial derivatives)",
    "∇f stacks one slope per variable into a vector that points uphill most steeply; its length says how steep. Downhill — the negative gradient — is the locally fastest way to reduce the function.",
    "This one object names the whole method: gradient descent nudges every weight opposite its partial derivative simultaneously, and 'gradient boosting' fits each new tree to exactly this vector computed on the loss.",
    "A compass needle on a hillside: it points straight up the slope, so walk backwards to descend.");

  def("logreg1",
    "What makes a function convex, and why does it matter for optimisation?",
    "It curves upward like a bowl, so any local minimum is the global one and descent can't get trapped.",
    ["It is symmetric about its minimum, so the optimum can be found by averaging endpoints.",
     "It is differentiable everywhere, which guarantees gradient descent will not diverge.",
     "It has exactly one variable, making its minimum findable by binary search.",
     "It grows without bound, ensuring the optimiser never leaves the search region."],
    "Convex function",
    "Convexity means every chord lies above the curve — one basin, no false valleys. Descending a convex function from anywhere reaches the unique bottom.",
    "Logistic regression's log loss (with L2) and SVM's hinge objective are convex — their training reliably finds the best weights. Neural networks and k-means objectives are not, which is why they need restarts, seeds and luck.",
    "A single bowl: drop a marble anywhere and it rolls to the one true bottom.");

  def("logreg1",
    "What is the difference between a local minimum and the global minimum?",
    "A local minimum beats only its neighbourhood; the global minimum is the lowest point anywhere.",
    ["A local minimum is found on a data subset while the global one uses all data.",
     "They differ only in scale: rescaling the axes turns one into the other.",
     "A global minimum is any point where the gradient is exactly zero.",
     "A local minimum moves with the starting point; the global one is the average of them."],
    "Global vs local minimum",
    "Non-convex landscapes ripple with valleys: descent stops in whichever it enters first (a local minimum), which may sit far above the deepest point (the global minimum).",
    "This gap drives real practice: k-means restarts (n_init), neural-net initialisation schemes, and simulated annealing all exist to avoid settling in a poor valley — while convex models sidestep the issue entirely.",
    "The nearest dip in the road isn't necessarily the lowest point in the country.");

  def("logreg1",
    "What is the exponential function e^x, and where does it appear in ML?",
    "A function that grows at a rate equal to its own value; it builds the sigmoid, softmax and Gaussian.",
    ["A polynomial of very high degree used to approximate smooth curves.",
     "The function that doubles its input, applied repeatedly n times.",
     "Any function whose graph increases from left to right without bound.",
     "The inverse of the square-root function, defined for positive inputs."],
    "Exponential function (e^x)",
    "e ≈ 2.718; e^x turns sums into products (e^(a+b) = e^a·e^b), is always positive, and is its own derivative — the tidiest function calculus has.",
    "It is the machinery inside the sigmoid 1/(1+e^{−z}), the softmax, the RBF kernel and the Gaussian density: whenever a model converts an unbounded score into something positive or probability-like, e^x is doing the converting.",
    "The compound-interest curve — and the engine that turns raw scores into probabilities.");

  def("logreg1",
    "What is a logarithm, and which of its properties makes it so useful in ML?",
    "The inverse of exponentiation; it turns products into sums, taming tiny probabilities and multiplicative effects.",
    ["A function that rounds any number down to its nearest power of ten.",
     "The reciprocal of a number, useful for inverting predicted probabilities.",
     "A transform that forces any distribution to become exactly normal.",
     "The derivative of the exponential, measuring its growth rate."],
    "Logarithm (and log rules)",
    "log(ab) = log a + log b, log(aⁿ) = n·log a, and log is monotonic — it preserves order. Natural log (base e) undoes e^x exactly.",
    "Those three properties power half of ML's plumbing: log-likelihoods replace vanishing products with stable sums, log loss and log-odds are logs of probabilities and their ratios, log transforms straighten multiplicative features, and monotonicity means maximising log-likelihood maximises likelihood.",
    "The times-tables translator: multiplication becomes addition, huge ranges become manageable, and order is never disturbed.");

  /* ============ Linear algebra basics (pca1) — 6 ============ */

  def("pca1",
    "In linear algebra, what is a vector, as used for data?",
    "An ordered list of numbers, viewable as a point or arrow in space.",
    ["A quantity that has magnitude but deliberately no defined direction.",
     "A one-column table whose entries must all share the same unit.",
     "The line segment connecting a dataset's two most distant points.",
     "Any variable that changes direction when the data is standardised."],
    "Vector",
    "[age=34, income=52000, tenure=3] is a vector: each feature is one coordinate, and the whole example becomes a single point (or arrow from the origin) in feature space.",
    "This identification is the founding move of ML geometry: once rows are vectors, 'similar examples' becomes 'nearby points', models become surfaces cutting the space, and PCA becomes a rotation of the axes.",
    "A row of numbers wearing geometric clothing — every example is a point in space.");

  def("pca1",
    "What is the dot product of two vectors, and what does it measure geometrically?",
    "The sum of coordinate-wise products; it measures alignment.",
    ["The vector connecting the tips of the two vectors being multiplied.",
     "The area of the parallelogram that the two vectors span between them.",
     "The larger of the two vectors' lengths, scaled by the smaller's direction.",
     "A matrix holding every pairwise product of the two vectors' entries."],
    "Dot product",
    "a·b = Σaᵢbᵢ = |a||b|cos θ: pure numbers on one side, lengths-times-alignment on the other. Positive means acute angle, zero means orthogonal, negative means opposing.",
    "It is ML's most-executed operation: a linear model's score is a dot product of weights and features, cosine similarity is a normalised dot product, kernels generalise it, and PCA projects data via dot products with each component.",
    "Multiply matching coordinates and add up — the total says how much two arrows agree.");

  def("pca1",
    "What is the norm of a vector?",
    "Its length: the L2 norm is the square root of the sum of squared coordinates.",
    ["The number of coordinates the vector contains, i.e. its dimension.",
     "The average of the vector's coordinates, ignoring their signs.",
     "The largest coordinate, which dominates the vector's direction.",
     "The angle the vector makes with the first coordinate axis."],
    "Vector norm (length)",
    "‖x‖₂ = √(Σxᵢ²) is Pythagoras in n dimensions; the L1 norm Σ|xᵢ| measures city-block length instead. Distance between points is the norm of their difference.",
    "Norms unify seemingly separate ideas: Euclidean and Manhattan distances are L2 and L1 norms of differences, ridge and lasso penalise the L2 and L1 norms of the weights, and a unit vector — norm 1 — is what PCA requires each component to be.",
    "The arrow's length — n-dimensional Pythagoras.");

  def("pca1",
    "What is a linear combination of vectors?",
    "A weighted sum of vectors — each scaled by a coefficient, then added together.",
    ["The vector whose coordinates are the medians of the input vectors' coordinates.",
     "Any product of vectors that yields a single scalar value.",
     "The concatenation of several vectors into one longer vector.",
     "A combination of vectors that preserves each one's original length."],
    "Linear combination",
    "3u − 2v + w: scale, then add. The set of all linear combinations of some vectors is everything they can 'reach' (their span).",
    "It is the word 'linear' in half of ML: a linear model's prediction is a linear combination of features; each principal component is a linear combination of the original columns, its coefficients called loadings — the recipe that makes components interpretable.",
    "A mix-by-weights recipe: two parts of this vector, minus one part of that.");

  def("pca1",
    "What is a basis, and what does PCA's change of basis accomplish?",
    "A minimal set of directions whose combinations express every point; PCA swaps the axes for the data's own variance-ranked directions.",
    ["The subset of training rows from which every other row in the dataset can be rebuilt; PCA selects the most representative examples.",
     "The origin point from which all vectors in the space are measured; PCA moves it to the densest region of the data cloud.",
     "The single largest vector in a dataset, against which all of the other vectors are normalised before any projection happens.",
     "A fixed physical scale that converts all of the features into the same units so that their variances can be compared fairly."],
    "Basis (change of basis)",
    "The standard basis is one axis per raw feature. Any other set of independent directions works too, and coordinates can be re-expressed in it — a change of basis, which for an orthonormal basis is just a rotation.",
    "PCA is exactly this: it finds a new orthonormal basis (the components) aligned with the data's variance, re-coordinates every point, and dimensionality reduction is then simply dropping the axes that carry least — same data, better-chosen axes.",
    "Swap the graph paper: PCA redraws the grid along the data's own natural directions.");

  def("pca1",
    "What is the rank of a matrix, in data terms?",
    "The number of genuinely independent directions its rows or columns span.",
    ["The number of rows the matrix contains after duplicates are removed.",
     "The position of the matrix when datasets are sorted by size.",
     "The largest single value appearing anywhere in the matrix.",
     "The number of columns whose entries are all non-zero."],
    "Matrix rank",
    "If one column is a combination of others (total = price × quantity), it adds no new direction: rank counts only independent ones. Rank below the column count means the data truly occupies a thinner slice of the space.",
    "Rank is the exact version of what PCA measures softly: eigenvalues near zero reveal near-redundant directions, and 'low-rank approximation' means keeping the few directions that matter. Perfect multicollinearity is precisely rank deficiency.",
    "How many independent ingredients the spreadsheet really has, once recipes-of-other-columns are unmasked.");

  /* ============ Information basics (trees1) — 1 ============ */

  def("trees1",
    "In information theory, what is the self-information (surprise) of an event?",
    "−log p: rare events carry many bits of information, certain events carry none.",
    ["The number of features needed to predict the event with perfect accuracy.",
     "The amount of memory required to store one occurrence of the event.",
     "p·(1−p): highest for events that are as likely as not.",
     "The count of yes/no questions the event answers about unrelated variables."],
    "Self-information (surprise)",
    "'The sun rose' (p≈1) tells you nothing: −log 1 = 0 bits. 'It snowed in July' (p tiny) tells you a lot. With log base 2, the units are bits — a fair coin flip carries exactly 1.",
    "Entropy, the tree-splitting criterion, is simply the expected surprise of a node's labels: pure nodes hold no surprise (0 bits), 50/50 nodes hold the most (1 bit) — so information gain literally measures how much surprise a split removes.",
    "Rarity = news value: the less likely the event, the more you learn when it happens.");

  /* ============ Probability reading of the confusion matrix (metrics1) — 1 ============ */

  def("metrics1",
    "How do precision and recall read as conditional probabilities?",
    "Precision is P(actually positive | predicted positive); recall is P(predicted positive | actually positive).",
    ["Precision is the joint probability of prediction and truth; recall is their marginal.",
     "Both are P(correct), computed on the positive and negative classes respectively.",
     "Precision is the prior probability of the positive class; recall is its posterior.",
     "They are the same probability estimated on the training and test sets."],
    "Precision and recall as conditional probabilities",
    "Same two events — 'predicted positive' and 'actually positive' — conditioned in opposite directions. That reversal is exactly a Bayes'-theorem relationship, with the class prior (prevalence) as the exchange rate between them.",
    "This reading explains the core phenomena in one stroke: why a high-recall test can have terrible precision on a rare class (the base rate fallacy, in metric form), and why precision shifts when prevalence does while recall stays put.",
    "Two directions of one question: 'when it alarms, is it right?' versus 'when it matters, does it alarm?'");

})();
