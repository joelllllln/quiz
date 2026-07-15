/* Extra Naive Bayes depth questions: GaussianNB and BernoulliNB mechanics. Push onto bayes1/bayes2,
   so this loads AFTER the base bayes files. Distractors are lengthened to match the correct answer so
   the correct option is never the longest. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  function push(qk, o) { (Q[qk] = Q[qk] || []).push(o); }

  /* ---------------- GaussianNB ---------------- */
  push("bayes1", {
    q: "GaussianNB is fitted on a continuous feature. What exactly does it store for that feature within each class?",
    choices: [
      "Just the mean and the variance of that feature among the class's training rows",
      "The full sorted list of every value the feature took across that class's training rows",
      "A tally of how many times each distinct value of the feature appeared in the class",
      "Only the single smallest and largest value the feature reached anywhere in that class",
      "A fitted straight-line slope relating the feature to the class label across the rows"
    ],
    explain: "A normal distribution is fully described by its mean and variance, so those two numbers ARE the entire fitted model for that feature in that class. GaussianNB reads them straight off the class's rows — no iteration, no big tables — which is why it trains almost instantly and copes with very little data.",
    simple: "For each feature it just remembers two things about each class: the average value, and how spread out the values are. Two numbers per feature per class — that's the whole model.",
    widget: { reveal: { name: "GaussianNB: what it learns", formula: "params per class = (mean, variance) per feature", text: "GaussianNB stores only a mean and variance per feature per class — the two numbers that define a bell curve. That is why it trains almost instantly and needs very little data." } }
  });

  push("bayes2", {
    q: "At prediction time, how does GaussianNB turn one observed feature value into a likelihood for a class?",
    choices: [
      "It reads the height of that class's bell curve at the observed value",
      "It counts how many of the class's training rows held that exact same value",
      "It measures the straight-line distance from the value to the class mean",
      "It checks whether the value lands inside the class's min-to-max range or not",
      "It ranks the value against all the classes and keeps only the top-ranked class"
    ],
    explain: "GaussianNB stored a mean and variance per class, which define a bell curve. To score a value it evaluates that curve's height at the value: near the class mean the curve is tall (high likelihood), far out in the tails it is low. Those heights are the per-class likelihoods that go into Bayes' rule alongside the priors.",
    simple: "Each class has its own bell curve for the feature. Drop the observed value onto each curve and read how tall the curve is there — a tall reading means 'this value fits this class well'.",
    widget: { reveal: { name: "GaussianNB: bell-curve likelihood", formula: "P(x | class) = height of the class's bell at x", text: "The likelihood is the height of the class's Gaussian at the value: tall near the class mean, low in the tails. These heights are the likelihoods fed into Bayes' rule." } }
  });

  push("bayes2", {
    q: "You have patient records with continuous lab values (glucose, blood pressure). Which Naive Bayes variant fits, and why?",
    choices: [
      "GaussianNB — it models each continuous feature as a bell curve per class",
      "MultinomialNB — it reads each lab value as a count of events within the class",
      "BernoulliNB — it converts each lab value into a present-or-absent flag first",
      "ComplementNB — it estimates each class from every other class's lab readings",
      "No Naive Bayes variant can handle continuous inputs, so choose another model"
    ],
    explain: "Lab values are continuous numbers, which is exactly GaussianNB's job: it fits a mean and variance (a bell) per feature per class and scores by curve height. MultinomialNB and BernoulliNB expect counts and binary flags respectively, so they would mangle continuous readings; ComplementNB is a text-imbalance tool.",
    simple: "Continuous measurements → GaussianNB. It draws a bell curve for each measurement in each class; the other flavours are built for word counts or yes/no flags, not real-valued numbers.",
    widget: { reveal: { name: "GaussianNB: when to use", formula: "continuous features → GaussianNB", text: "Reach for GaussianNB when features are continuous numbers — measurements, sensor readings, lab values. It fits a mean and variance per feature per class; no binning or scaling needed." } }
  });

  /* ---------------- BernoulliNB ---------------- */
  push("bayes1", {
    q: "BernoulliNB expects each of its features in what form?",
    choices: [
      "A binary yes/no flag — the feature is present (1) or absent (0)",
      "A whole-number count of how many times the token occurs in the row",
      "A continuous real number spread along an unbounded numeric scale",
      "A ranked category ordered from the lowest level up to the highest",
      "A normalised proportion, with the row's features summing exactly to one"
    ],
    explain: "BernoulliNB models each feature as a Bernoulli (0/1) variable: present or absent. If you hand it counts it quietly thresholds them to present (>0) or absent, discarding how many times the token occurred. Counts belong to MultinomialNB; continuous numbers belong to GaussianNB.",
    simple: "Bernoulli only cares whether something is there or not — a tick-box, not a tally. Give it counts and it just asks 'was it present at all?' and forgets the number.",
    widget: { reveal: { name: "BernoulliNB: binary features", formula: "feature → 1 if present, else 0", text: "BernoulliNB works on binary presence/absence features (0/1). Hand it counts and it thresholds them to present or absent, discarding the magnitude." } }
  });

  push("bayes2", {
    q: "What does BernoulliNB do that MultinomialNB does NOT, which can help it on very short texts?",
    choices: [
      "It also scores the ABSENT features, so a missing but expected word becomes evidence",
      "It weights every present word by exactly how many times that word occurred in the row",
      "It fits a separate continuous bell curve to each word's frequency inside every class",
      "It estimates each class using the documents that belong to all of the other classes",
      "It drops the class prior completely and leans only on the per-word probabilities"
    ],
    explain: "Bernoulli's signature move is scoring absence. For each class it multiplies P(present|class) for the words that appear AND (1 − P(present|class)) for the words that don't. A word usually seen in spam but MISSING here counts against spam. MultinomialNB only sums over words that appear, so it ignores that absence signal — which matters most on short texts where most words simply don't appear.",
    simple: "Multinomial only looks at the words you DID use. Bernoulli also notices the telling words you DIDN'T use — and on a short tweet, what's missing says a lot.",
    widget: { reveal: { name: "BernoulliNB: the absence term", formula: "present → P(1|c) · absent → (1 − P(1|c))", text: "BernoulliNB scores absent features too: a word usually seen in a class but missing here counts against it. Multinomial ignores absent words; Bernoulli uses them, which helps on short texts." } }
  });

  push("bayes2", {
    q: "For classifying very short texts like tweets, why does BernoulliNB often edge out MultinomialNB?",
    choices: [
      "With so few words per tweet, presence or absence says more than raw counts do",
      "BernoulliNB will always train a great deal faster than MultinomialNB on any text length",
      "MultinomialNB simply cannot be applied to any document below a fixed minimum length",
      "BernoulliNB automatically corrects for class imbalance in a way Multinomial never can",
      "MultinomialNB requires every document to be padded to exactly the same length first"
    ],
    explain: "In a tweet a given word almost always appears zero or one times, so the extra information in MultinomialNB's counts largely vanishes — a count of 1 is just 'present'. Meanwhile Bernoulli's explicit absence term adds signal from all the expected words that are missing. When frequency genuinely matters (long documents), MultinomialNB is usually the better pick.",
    simple: "On a tweet, words show up once or not at all, so counting them adds nothing — but noticing which expected words are missing does. That's Bernoulli's edge here; on long text, counts matter again and Multinomial wins.",
    widget: { reveal: { name: "BernoulliNB vs MultinomialNB", formula: "counts (Multinomial) vs presence/absence (Bernoulli)", text: "Multinomial uses word counts and ignores absences; Bernoulli uses presence/absence and ignores counts. Short texts → Bernoulli's absence signal often wins; when frequency matters → Multinomial." } }
  });
})();
