/* Naive Bayes — Part III: Advanced Study. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).bayes3 = [

{
  q: "A 2,000-word email means multiplying 2,000 per-word probabilities, each perhaps 0.001. Every implementation refuses to do this literally. Why, and what do they do instead?",
  choices: ["The product underflows to exactly 0.0 in floating point — so implementations SUM LOG-probabilities, which is mathematically identical and numerically safe", "Multiplication is too slow for long emails", "Probabilities can't legally be multiplied that many times", "They sample 50 random words instead", "They cap the product at 10⁻³⁰⁰"],
  explain: "0.001²⁰⁰⁰ ≈ 10⁻⁶⁰⁰⁰, far below the ~10⁻³⁰⁸ floor of float64 — the product becomes literal zero for EVERY class, and the argmax compares 0 with 0. Logarithms fix it: log turns products into sums (log(ab) = log a + log b), and −6000 is a perfectly representable number. Since log is monotonic, the class with the biggest log-score is the class with the biggest probability. This trick — work in log-space, compare there, exponentiate only if needed — pervades ML: log-likelihoods, log-loss, logsumexp.",
  simple: "Multiply two thousand small numbers and the result is smaller than the smallest number a computer can write down — it rounds to zero, for every class, and the comparison becomes 0 vs 0: garbage. The escape is old and elegant: instead of multiplying the numbers, ADD their logarithms (the log of a product is the sum of the logs). Adding two thousand ordinary negative numbers is effortless, and whichever class ends up with the bigger total also had the bigger product. Same answer, no vanishing.",
  widget: {
    type: "curveStatic", title: "The vanishing product",
    world: "Score an email word by word, two ways: the raw product (watch it die) and the log-space sum (watch it stay healthy). Float64 dies near 1e−308 — marked by the product hitting the floor.",
    xlab: "words processed →", xs: [0,1,2,3,4], labels: ["10","50","150","400","2000"], dec: 0, yunit: "",
    series: [
      { name: "log-space score (sum of logs)", ys: [-30, -150, -450, -1200, -6000] },
      { name: "raw product's exponent (10^x)", ys: [-13, -65, -196, -308, -308] }
    ],
    knob: { label: "Words processed", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "50 words in: the raw product is already 10⁻⁶⁵ — fine for float64, but falling like a stone. The log-sum is just… −150. A number.", tone: "info" },
      { max: 3, text: "At 400 words the raw product slams into the 10⁻³⁰⁸ floor and flatlines: from here it reads exactly 0.0 for every class. Comparisons are now meaningless.", tone: "warn" },
      { max: 4, text: "🤯 At 2,000 words, log-space carries −6000 without blinking and the argmax works perfectly. One high-school identity (log ab = log a + log b) is the difference between a working classifier and silent nonsense. sklearn's predict_log_proba exists for exactly this reason.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Log-space computation", formula: "argmax Π p = argmax Σ log p — products become sums, underflow vanishes",
      text: "Universal ML plumbing: log-likelihood, log-loss, logsumexp for normalising. Whenever many probabilities multiply, the real computation happens in logs." }
  }
},

{
  q: "GaussianNB is often called a 'linear-ish' classifier, yet with per-class variances it can carve CURVED boundaries. When exactly is its boundary linear vs quadratic?",
  choices: ["Equal variances across classes → linear boundary; UNEQUAL variances → quadratic (the log of a bell-curve is a parabola, and unequal parabolas differ by a curve)", "It is always linear by definition", "It is always circular", "The boundary shape depends on the prior only", "Quadratic boundaries require a kernel"],
  explain: "The decision boundary is where log-likelihoods (plus log-priors) tie. log of a Gaussian = −(x−μ)²/2σ² + const: a parabola in x. Two classes sharing σ² have parabolas with identical curvature — the x² terms cancel, leaving a LINE (this shared-variance case is essentially LDA). Different σ² per class leaves a net x² term: a quadratic boundary (QDA's territory). Practically: GaussianNB can wrap a tight class inside a diffuse one — a curved feat logistic regression can't do without engineered features.",
  simple: "Each class is a bell: a centre (mean) and a width (variance). The boundary is where the bells' heights tie. Two equally-wide bells tie along a straight line — exactly halfway between centres. But a NARROW bell inside a WIDE one ties along a closed curve: step slightly away from the narrow bell's centre and its height plummets while the wide bell barely notices — so the narrow class owns only a bubble, and the wide class owns everywhere else, including BOTH far sides. Width differences are what buy the curves.",
  widget: {
    type: "curveStatic", title: "Where the bells tie",
    world: "Class A: narrow bell at 5. Class B: wide bell, also centred near 5. Slide a test reading along the axis and watch who wins — note A's territory is a BUBBLE, not a half-line.",
    xlab: "test reading →", xs: [0,1,2,3,4,5,6], labels: ["2","3","4","5","6","7","8"], dec: 1, yunit: "",
    series: [
      { name: "class A likelihood (narrow σ)", ys: [0.1, 1.5, 9, 16, 9, 1.5, 0.1] },
      { name: "class B likelihood (wide σ)", ys: [3.5, 4.5, 5.2, 5.5, 5.2, 4.5, 3.5] }
    ],
    knob: { label: "Test reading", min: 0, max: 6, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Reading 2–3: the wide bell B wins — the narrow A-bell is already microscopic this far from its centre. So far it looks like an ordinary 'left vs right' split…", tone: "info" },
      { max: 3, text: "Reading 4–6: A's tall narrow bell towers over B. A owns this middle BUBBLE — the boundary has already been crossed once and will be crossed again.", tone: "info" },
      { max: 6, text: "🤯 Reading 7–8: B wins AGAIN — the boundary is TWO points (a bubble), impossible for any single straight cut. That's the quadratic boundary of unequal variances: GaussianNB draws it natively, for free, from two numbers per bell.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Linear vs quadratic NB boundaries", formula: "shared σ² → linear (≈LDA) · per-class σ² → quadratic (≈QDA's cousin)",
      text: "log N(μ,σ²) is a parabola; boundaries are parabola differences. GaussianNB = QDA with a diagonal covariance (independence) assumption." }
  }
},

{
  q: "Your spam filter must learn continuously from a never-ending stream — full retraining each night is too slow. Why is Naive Bayes uniquely suited to this, and what's the sklearn mechanism?",
  choices: ["NB's 'parameters' are just counts, so new examples are absorbed by incrementing counters — partial_fit updates the model in O(new data) without revisiting anything", "NB stores all data and re-sorts it nightly", "It isn't — NB must always retrain from scratch", "A learning-rate schedule replays old emails", "Only neural networks support streaming"],
  explain: "MultinomialNB's entire knowledge is count tables: per-class document counts and per-class word counts. A new labelled email means '+1 to a few counters' — the model after the increment is EXACTLY the model a full retrain would produce (not an approximation). sklearn exposes this as partial_fit(X_batch, y_batch, classes=…), shared by a small family of online learners (SGDClassifier, MiniBatchKMeans). Contrast trees/forests, whose structure depends globally on all data and cannot be incrementally patched exactly.",
  simple: "NB never 'trained' in the gradient sense — it just counted: how many spam emails, how often each word appears in them. And counting has a magic property: to include a new email, add its words to the tallies. Done. No revisiting the ten million old emails, no drift from the 'true' retrained model — the tallies ARE the model, updated in a microsecond. Models whose knowledge is a delicate global structure (a tree's split hierarchy) can't do this; models whose knowledge is a ledger can.",
  widget: {
    type: "curveStatic", title: "The ledger model",
    world: "A day of streaming emails: cost to incorporate each new batch, for count-increment NB vs full nightly retrain — with accuracy tracked to show the increments lose nothing.",
    xlab: "batches absorbed →", xs: [0,1,2,3,4], labels: ["10","100","1k","10k","100k"], dec: 1, yunit: "",
    series: [
      { name: "partial_fit cost per batch (ms)", ys: [1, 1, 1, 1, 1] },
      { name: "full retrain cost (s)", ys: [2, 4, 15, 120, 1100] },
      { name: "accuracy gap vs full retrain (pts)", ys: [0, 0, 0, 0, 0] }
    ],
    knob: { label: "Batches", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Early on, retraining is cheap too — streaming design doesn't matter at toy scale. (A recurring theme: architecture decisions bite at scale, not in demos.)", tone: "info" },
      { max: 3, text: "By 10k batches a retrain costs 2 minutes and rising, while the increment is still 1 ms — flat forever, because it only touches the new batch's counters.", tone: "info" },
      { max: 4, text: "🤯 The green line is the punchline: the accuracy gap between incremental and full retrain is 0.0 at every scale — increments are EXACT, not approximate. When the model is a ledger, learning is bookkeeping. That's why NB still guards a niche no gradient method fully owns.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Online learning via partial_fit", formula: "counts += new counts — exact, O(batch), stream-ready",
      text: "sklearn: nb.partial_fit(X, y, classes=[0,1]) on the first call, then per batch. Pair with HashingVectorizer for a fully streaming text pipeline (no growing vocabulary)." }
  }
},

{
  q: "A fraud dataset mixes word counts (transaction notes), yes/no flags, and continuous amounts. No single NB variant fits all three. What's the principled way to still use NB?",
  choices: ["Exploit independence: score each feature GROUP with its matching variant (Multinomial/Bernoulli/Gaussian) and ADD their log-scores plus one log-prior — one coherent NB model", "Force everything through GaussianNB", "Round the amounts into words", "Train one variant per class instead", "NB fundamentally cannot handle mixed types"],
  explain: "NB's independence assumption makes the total log-score a SUM of per-feature terms — and sums don't care which distribution each term came from. So: MultinomialNB's log-likelihoods for the text block, BernoulliNB's for the flags, GaussianNB's for the amounts; add the three per-class scores (counting the prior once), argmax. Alternatives: discretise continuous features into bins (then Multinomial/Categorical everywhere), or sklearn's ColumnTransformer-style stacking of per-block predict_log_proba outputs. The modularity is a direct dividend of the 'naive' factorisation.",
  simple: "NB judges each clue separately and adds up the verdicts (in log form) — it never needs the clues to speak the same language, only to be scored honestly in their OWN language. So let each expert score its own evidence: the word-counter scores the notes, the yes/no specialist scores the flags, the bell-curve reader scores the amounts. Because the final decision was always just 'add all clue-scores to the starting belief', the three experts' subtotals combine into one verdict seamlessly. Independence, usually NB's embarrassing assumption, is here its superpower: it makes the model modular.",
  widget: {
    type: "curveStatic", title: "Three experts, one sum",
    world: "One transaction scored block by block: running log-odds of fraud as each feature group's expert weighs in. The final verdict is literally the sum of the three subtotals plus the prior.",
    xlab: "evidence blocks added →", xs: [0,1,2,3], labels: ["prior only","+ text (Multinomial)","+ flags (Bernoulli)","+ amount (Gaussian)"], dec: 1, yunit: "",
    series: [
      { name: "running log-odds of fraud", ys: [-4.6, -1.4, 0.4, 2.9] },
      { name: "P(fraud) implied (%)", ys: [1, 20, 60, 95] }
    ],
    knob: { label: "Blocks added", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Prior only: fraud is rare, log-odds −4.6 (≈1%). Every expert must argue uphill from here — as they should.", tone: "info" },
      { max: 2, text: "Text expert adds +3.2 (suspicious phrasing), flags expert +1.8 (new device, foreign IP): each block contributes a simple ADDITIVE term, computed by the variant that suits its type.", tone: "info" },
      { max: 3, text: "🤯 The Gaussian expert reads the amount (+2.5) and the sum crosses to 95% fraud. Nothing glued, nothing hacked: the independence factorisation means log-scores from DIFFERENT distributions add like ordinary numbers. Modular by mathematics, not by engineering.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Mixed-type Naive Bayes", formula: "total log-score = log prior + Σ_blocks log P(block | class), each block its own variant",
      text: "Implement by summing predict_log_proba outputs per block (prior counted once), or discretise continuous features (KBinsDiscretizer) and go fully Multinomial/Categorical." }
  }
},

{
  q: "On tweets (10–20 words), BernoulliNB often edges out MultinomialNB. The usual explanation involves what Bernoulli does with the words that DON'T appear. What is that mechanism?",
  choices: ["Bernoulli explicitly multiplies in P(word ABSENT | class) for every vocabulary word not present — absence is evidence too, and in short texts absence is most of the signal", "Bernoulli counts repeated words twice", "Bernoulli uses a bigger vocabulary", "Multinomial can't process short documents", "Bernoulli weights early words more heavily"],
  explain: "Multinomial models only the words that occur (and their counts); a word not in the tweet contributes nothing. Bernoulli models every vocabulary word as a present/absent coin — so a tweet about finance that does NOT contain 'crypto', 'giveaway' or 'DM' actively accumulates evidence from each absence. With 15 words present and 30,000 absent, the absences carry most of Bernoulli's information; on long documents this backfires (absence of any given word is uninformative when only 2,000 of 30,000 words could fit anyway) — which is why Multinomial rules long-form text.",
  simple: "Multinomial listens only to what was said. Bernoulli also weighs what was NOT said — and in a 15-word tweet, the silences are deafening: a scam tweet that somehow avoids 'FREE', 'winner', 'DM me' has passed thirty thousand tiny innocence tests, and Bernoulli credits every one. In a 5,000-word article the same silences mean nothing (no article contains most of the dictionary), so counting what appears — and how often — wins. Match the model to how much the silences actually say.",
  widget: {
    type: "curveStatic", title: "When silence speaks",
    world: "Spam detection across document lengths: BernoulliNB (presence/absence, absences scored) vs MultinomialNB (counts of what appears). Watch the crossover as documents grow.",
    xlab: "document length →", xs: [0,1,2,3,4], labels: ["10 words","30","100","500","3000"], dec: 0, yunit: "%",
    series: [
      { name: "BernoulliNB accuracy", ys: [88, 87, 84, 80, 76] },
      { name: "MultinomialNB accuracy", ys: [84, 85, 87, 90, 92] }
    ],
    knob: { label: "Document length", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Tweets: Bernoulli leads by 4 — with only ~15 words present, the 30,000 scored ABSENCES carry most of its evidence, and they genuinely discriminate.", tone: "info" },
      { max: 2, text: "At ~100 words the curves cross: absences are diluting (every document lacks most words, guilty or not) while counts start earning their keep.", tone: "info" },
      { max: 4, text: "🤯 Long documents: Multinomial by 16. Bernoulli is now multiplying thousands of near-meaningless 'absent' factors — pure noise — while counts of repeated giveaway words scream signal. One modelling choice (score absences or not) decides both ends of this plot.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "BernoulliNB vs MultinomialNB", formula: "Bernoulli: Π over ALL vocab (present AND absent) · Multinomial: Π over occurrences",
      text: "Rule of thumb: short texts / binary features → Bernoulli; longer text with meaningful counts → Multinomial (or ComplementNB under imbalance). Binarize=0.0 lets you A/B this in one line." }
  }
},

{
  q: "A strong team uses 'NB as a feature': they append MultinomialNB's log-odds output as an input column to a logistic regression (the NB-LR / NBSVM trick). Why does this hybrid beat both parents?",
  choices: ["NB contributes a powerful compressed summary of thousands of word features that LR could never estimate from small data — and LR learns how much to TRUST that summary, fixing NB's overconfidence", "It doubles the training data", "The models cancel each other's bugs randomly", "Log-odds columns are always beneficial", "It works only because of the softmax"],
  explain: "NB estimates 30,000 word likelihood-ratios robustly from tiny data (counting is sample-efficient) but multiplies them naively — correlated words double-count, so its log-odds have the right SIGN and inflated MAGNITUDE. LR downstream learns a coefficient on that log-odds column (typically ~0.3–0.6): a learned global shrinkage that repairs the overconfidence, while LR's other columns add signals NB can't see. It's a two-layer division of labour: generative counting for breadth, discriminative weighting for honesty — stacking in miniature, and the pattern behind NBSVM's long reign as a text baseline.",
  simple: "NB is the brilliant, excitable junior analyst: reads every one of 30,000 clues overnight (nobody else can), gets the direction right, but always TRIPLES the enthusiasm. LR is the sober manager who has learned exactly how much to discount the junior's reports — 'take 40% of whatever they say' — and blends in a few executive-level facts of their own. Junior alone: overconfident. Manager alone: can't read 30,000 clues. Junior-reporting-to-manager: reads everything, believes it the right amount. That's the hybrid.",
  widget: {
    type: "curveStatic", title: "The junior and the manager",
    world: "Text classification at growing training sizes: NB alone, LR alone on raw words, and LR given NB's log-odds as a feature. Watch who wins where — and who wins everywhere.",
    xlab: "training documents →", xs: [0,1,2,3,4], labels: ["200","1k","5k","25k","100k"], dec: 0, yunit: "%",
    series: [
      { name: "LR + NB-feature hybrid", ys: [81, 86, 89, 91, 92.5] },
      { name: "NB alone", ys: [79, 83, 85, 86, 86.5] },
      { name: "LR alone on raw words", ys: [71, 79, 85, 89, 91.5] }
    ],
    knob: { label: "Training size", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "200 documents: NB's counting head-start shines (79 vs LR's 71) — 30,000 word weights is far too many for LR to learn from 200 examples. The hybrid already leads: it inherits NB's head-start.", tone: "info" },
      { max: 2, text: "5k documents: LR alone catches NB — and the hybrid stays 4 ahead of both, because it was never forced to choose between breadth and honesty.", tone: "info" },
      { max: 4, text: "🤯 100k documents: the hybrid still leads. Its LR learned to weight the NB column at ~0.4 — a measured, learned distrust that repairs the double-counting — while using raw words for what NB misses. Two flawed experts, one honest hierarchy: the essence of stacking, in two lines of code.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "NB as a feature (NB-LR / NBSVM)", formula: "append NB log-odds as a column → downstream model learns its trust coefficient",
      text: "A legendary text baseline (Wang & Manning 2012). General pattern: generative models make superb FEATURES for discriminative ones — sample-efficient breadth, honestly reweighted." }
  }
}
];
