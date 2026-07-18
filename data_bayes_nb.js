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

  /* ---------------- probability density: what GaussianNB's "curve height" really is ---------------- */
  var D = (window.DEFS = window.DEFS || {});
  var pd = {
    q: "GaussianNB scores a value by the 'height of the class's bell curve'. What exactly is that height — the probability density?",
    choices: [
      "How thickly probability is packed around that value — probability per unit of x, where real probabilities are AREAS under the curve, not heights",
      "The exact probability of observing precisely that value, which for a continuous measurement is always a tidy number sitting between zero and one",
      "The cumulative probability of seeing that value or anything smaller, read off the curve from the far left all the way up to the observed point",
      "The share of the class's training rows that took exactly that value, smoothed slightly so that never-seen values cannot score a literal zero",
      "The probability that the value belongs to this class rather than any other, already normalised so the heights across classes sum to exactly one"
    ],
    explain: "For a continuous feature, the probability of any EXACT value is zero — nonzero probability belongs to intervals, as area under the curve. The height is a density: probability per unit of x, describing how tightly probability is packed near that point. That is why a density can exceed 1 where the curve is a tall narrow spike (tiny variance). GaussianNB may still use raw densities as likelihoods because it only ever COMPARES classes at the same x: multiply each class's density by the same tiny interval width and the widths cancel in the argmax.",
    simple: "Think rainfall. Density is how hard it is raining at one spot; a real probability is how much water collects over a stretch of ground. At a single mathematical point the collected water is zero — yet the rain can still fall harder over one class's curve than another's, and 'harder here' is all Naive Bayes needs to pick a class.",
    widget: { reveal: { name: "Probability density", formula: "f(x) = probability per unit x · P(a ≤ x ≤ b) = area under f", text: "The bell-curve height GaussianNB reads is a density, not a probability: probability per unit of x. Any exact value has probability zero (areas carry the probability), and densities can top 1 in narrow spikes. Comparing classes' densities at the same x is valid — the interval widths cancel." } }
  };
  push("bayes1", pd); D[pd.q] = 1;

  /* ---------------- choosing alpha: big vs small smoothing ---------------- */
  push("bayes1", {
    q: "You set Naive Bayes' smoothing to a tiny value like alpha=0.001. What behaviour are you choosing?",
    choices: [
      "Trust the raw training counts almost completely — sharp evidence, but rare words get harsh near-zero likelihoods",
      "Ignore the training counts almost completely, so every word contributes the same likelihood to every class score",
      "Force every class toward the same prior probability regardless of what the training word counts actually said",
      "Guarantee that unseen words are treated as strong positive evidence for whichever class is rarest overall",
      "Turn the classifier deterministic so that retraining on the same data can never change any fitted likelihood"
    ],
    explain: "Alpha adds fake occurrences to every word's count, so a tiny alpha means the fitted likelihoods sit almost exactly on the raw training frequencies. That keeps the evidence sharp, but a word seen once or twice gets an extreme, overconfident likelihood, and a word never seen in a class still gets squashed to nearly zero — one step from the alpha=0 veto bug. Tiny alpha = low bias, high variance.",
    simple: "Small alpha says 'believe the counts as-is'. Great when the counts are trustworthy — risky when a word only appeared a couple of times, because the model takes those few sightings far too seriously.",
    widget: { reveal: { name: "Small alpha: trust the counts", formula: "α→0: P(word|class) ≈ count/total (sharp, risky)", text: "A tiny alpha keeps likelihoods glued to the raw training counts: sharp evidence, but rare and unseen words get extreme near-zero estimates — overconfident and one step from the zero-veto. Low bias, high variance." } }
  });

  push("bayes2", {
    q: "You crank Naive Bayes' smoothing up to a huge value like alpha=1000 on an ordinary spam filter. What does the model drift toward?",
    choices: [
      "Guessing mostly from the class priors — the fake counts swamp the real ones and every word's evidence flattens toward ×1",
      "Refusing to classify any email that contains a single word it never met during training, exactly like alpha=0 does",
      "Memorising the training emails perfectly, so that training accuracy and validation accuracy both climb together towards a flawless hundred",
      "Weighting rare words far more heavily than common ones, because the fake counts boost only the rare vocabulary",
      "Producing likelihoods above one for frequent words, which makes the multiplied class scores overflow to infinity"
    ],
    explain: "Each word's likelihood becomes (count + α)/(total + α·V). With α huge, the α terms dominate and every word's probability looks nearly identical in every class — likelihood ratios collapse toward ×1. Multiplying a wall of ×1s leaves only the priors, so the model slides toward always guessing the base rate. That is underfitting: high bias, low variance, evidence erased.",
    simple: "Big alpha buries the real counts under fake ones. Every word ends up looking equally spammy and equally hammy, so the only voice left is 'most email is ham' — the model becomes an amnesiac that guesses the majority.",
    widget: { reveal: { name: "Large alpha: flatten the evidence", formula: "α→∞: ratios → ×1, prediction → priors", text: "A huge alpha drowns real counts in fake ones: every word's likelihood ratio squashes toward ×1, the evidence cancels out, and predictions collapse to the class priors. Underfitting — high bias, low variance." } }
  });

  push("bayes2", {
    q: "Two spam filters: A trains on 200 emails full of rarely-seen words, B trains on 2 million emails covering its vocabulary thoroughly. Who benefits from the LARGER alpha?",
    choices: [
      "A — with skimpy counts per word, extra smoothing steadies the noisy estimates; B's counts are already reliable enough for a small alpha",
      "B — the bigger dataset always demands the bigger smoothing, so that its millions of accumulated counts cannot drown out the class priors during scoring",
      "Both need exactly the same alpha, because smoothing depends only on the vocabulary size and never on the corpus size",
      "Neither — alpha only matters for continuous features, and word-count features are immune to the smoothing setting entirely",
      "A should use alpha of exactly zero, since tiny datasets cannot afford to have any fake counts diluting their evidence"
    ],
    explain: "Smoothing is protection against unreliable counts. Filter A's per-word counts are tiny and noisy — one chance sighting shouldn't set an extreme likelihood, so a larger alpha usefully pulls estimates toward neutral. Filter B has seen so much data that its frequencies are already trustworthy; heavy smoothing would only blur real evidence. Rule of thumb: sparse, noisy counts → more smoothing; abundant, well-covered counts → less.",
    simple: "Alpha is benefit-of-the-doubt for words you barely know. The filter that barely knows its words (small, patchy data) needs more of it; the filter that has seen everything a million times needs hardly any.",
    widget: { reveal: { name: "Choosing alpha: the data-size rule", formula: "sparse/noisy counts → bigger α · plentiful counts → smaller α", text: "Pick alpha by how trustworthy the counts are: small or patchy training data needs a bigger alpha to steady noisy estimates; a large corpus that covers its vocabulary well earns a smaller alpha that keeps the evidence sharp." } }
  });

  push("bayes3", {
    q: "In practice, how should you actually set Naive Bayes' alpha, and what trade-off are you steering?",
    choices: [
      "Cross-validate a log-spaced grid (0.01, 0.1, 1, 10…) around the default 1.0 — alpha is a bias-variance dial, small = sharp but jumpy, large = stable but blurred",
      "Always keep the library default of exactly 1.0, because the smoothing strength has been proven mathematically incapable of changing validation accuracy on real data",
      "Set alpha equal to the vocabulary size, so that every word receives exactly one fake occurrence per document in the corpus",
      "Choose the alpha that maximises TRAINING accuracy, since smoothing exists purely to make the training fit as tight as possible",
      "Derive alpha in closed form from the class priors — the optimal value is always one divided by the number of classes"
    ],
    explain: "There is no formula for the best alpha — it depends on how noisy your counts are — so you tune it like any hyperparameter: a log-spaced grid through cross-validation, centred on the 1.0 default. What the dial trades is bias against variance: small alpha hugs the raw counts (low bias, high variance — jumpy on rare words), large alpha pulls toward uniform (high bias, low variance — evidence blurred). Training accuracy is the wrong compass: it is highest at alpha≈0, exactly where validation suffers.",
    simple: "Try a spread of values — a pinch, a spoonful, a cupful — and keep whichever scores best on held-out data. You're choosing between 'trust the counts' (sharp but twitchy) and 'doubt the counts' (calm but vague); the validation set tells you where the balance sits for YOUR data.",
    widget: { reveal: { name: "Tuning alpha", formula: "CV over log grid: α ∈ {0.01, 0.1, 1, 10} · bias ↔ variance", text: "Tune alpha by cross-validating a log-spaced grid around the default 1.0. Small alpha = low bias, high variance (trusts raw counts); large alpha = high bias, low variance (flattens evidence). Validation accuracy, never training accuracy, picks the winner." } }
  });
})();
