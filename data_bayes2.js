/* Naive Bayes — Part II: Practice. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).bayes2 = [

{
  q: "sklearn ships three Naive Bayes flavours — MultinomialNB, BernoulliNB, GaussianNB. You're staring at a new dataset. What actually decides which one to use?",
  choices: ["The TYPE of your features: counts → Multinomial, yes/no flags → Bernoulli, continuous numbers → Gaussian", "The training SIZE: tiny sets -> GaussianNB, medium sets -> BernoulliNB, and large corpora -> MultinomialNB", "The number of CLASSES: two -> Bernoulli, several -> Multinomial, and very many -> Gaussian", "The class BALANCE: even split -> Multinomial, skewed -> Bernoulli, and very rare -> Gaussian", "The feature COUNT: a few -> Gaussian, dozens -> Bernoulli, and thousands -> Multinomial"],
  explain: "Each variant assumes a different shape for P(feature | class): Multinomial models how often things occur, Bernoulli models whether they occur at all, Gaussian fits a bell curve to continuous values. Match the assumption to the data and NB shines; mismatch it and accuracy craters.",
  simple: "The three flavours are the same recipe with different ideas about what a 'clue' looks like. If your clues are counts (word appeared 3 times), use Multinomial. If they're on/off (word appeared: yes/no), use Bernoulli. If they're measurements (temperature 38.2°), use Gaussian. Pick by looking at your columns, nothing else.",
  widget: {
    type: "curveStatic", title: "Three flavours, five datasets",
    world: "The same three NB variants scored on five very different datasets. Slide across the datasets and watch the winner change with the FEATURE TYPE — never with anything else.",
    xlab: "dataset →", xs: [0,1,2,3,4], labels: ["word counts","yes/no words","sensor readings","pixel counts","height & weight"], dec: 0, yunit: "%",
    series: [
      { name: "MultinomialNB", ys: [92, 84, 55, 88, 58] },
      { name: "BernoulliNB",   ys: [87, 89, 52, 80, 50] },
      { name: "GaussianNB",    ys: [71, 68, 89, 74, 91] }
    ],
    knob: { label: "Dataset", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Count data: Multinomial leads. Short yes/no texts: Bernoulli edges ahead — it also learns from a word's ABSENCE.", tone: "info" },
      { max: 3, text: "Continuous sensor readings and the count-based models collapse to near coin-flip — their likelihood formulas simply don't describe measurements.", tone: "warn" },
      { max: 4, text: "🤯 The winner flips three times across the slider, and every flip is explained by one thing: what shape the features are. Nothing about size, classes, or speed ever mattered.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Choosing the NB variant", formula: "counts → Multinomial · binary → Bernoulli · continuous → Gaussian",
      text: "Each variant is a different assumption about P(feature | class). The choice is a data-audit question, not a tuning question." }
  }
},

{
  q: "A test email contains the word 'zumba', which never once appeared in your spam training emails. With no smoothing, what does this single word do to the spam score?",
  choices: ["Multiplies the whole product by ~zero — one unseen word vetoes every other clue", "Gets quietly skipped as an unknown token, so only the other clues decide the class", "Adds a small fixed penalty but lets the strong clues still carry the verdict", "Is counted as weak evidence nudging the email slightly toward spam", "Falls back to a default likelihood so the running product stays sensible"],
  explain: "NB multiplies P(word | class) across all words. An unseen word has an estimated probability of 0 in that class, and anything times zero is zero — so one novel word annihilates arbitrarily strong evidence from every other word. This is the zero-frequency problem, and it's why smoothing is not optional.",
  simple: "Naive Bayes multiplies clue after clue. Multiplication has a famous weakness: one zero wipes out everything. 'Never saw this word in spam' becomes 'spam is IMPOSSIBLE' — an insanely strong conclusion from one missing word. Watch three strong spam clues get vetoed by a single word about a dance class.",
  widget: {
    type: "bayesOdds", title: "One zero beats three fours",
    world: "A blatant spam email being scored clue by clue. The first three words scream spam. The fourth word never appeared in spam training data — feed it in last and watch what a raw zero does.",
    posName: "spam", prior: [4, 6],
    features: [
      { name: "'FREE' ×4", lr: 4 },
      { name: "'winner' ×3", lr: 3 },
      { name: "'!!!' ×2.5", lr: 2.5 },
      { name: "'zumba' (never seen in spam) ×0.001", lr: 0.001 }
    ],
    knob: { label: "Clues considered", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 2, text: "Two clues in and the odds are already heavily spam — the evidence is compounding exactly as designed.", tone: "info" },
      { max: 3, text: "Three clues: ~95% spam. Any human would agree. Now add the one word the training set never paired with spam…", tone: "info" },
      { max: 4, text: "🤯 One unseen word multiplied the odds by ~0.001 and dragged 95% down to ~2%. That's not scepticism, that's a veto — the zero-frequency problem in one move.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The zero-frequency problem", formula: "P(word|class) = 0 ⇒ whole product = 0",
      text: "Any word absent from one class's training data becomes an absolute veto. The fix — smoothing — adds fake counts so no probability is ever exactly zero." }
  }
},

{
  q: "Laplace smoothing fixes the zero-veto by pretending every word was seen alpha extra times. Sweep alpha from 0 to 100 — what shape does validation accuracy trace?",
  choices: ["A hump: too little leaves deadly zeros, too much blurs real evidence — the sweet spot is in between", "Steadily up: more smoothing always kills more of the deadly zeros, so validation accuracy just keeps climbing", "Steadily down: any fake counts dilute the real evidence, so accuracy only ever falls", "Flat: alpha changes only the training speed and never the validation accuracy at all", "A valley: both extremes stay safe while the middle alpha over-blurs the real counts"],
  explain: "alpha=0 keeps the zero-veto bug. Huge alpha drowns the real counts in fake ones, dragging every word's likelihood ratio toward 1 — the model forgets what it learned. In between sits a maximum, which is why alpha is a hyperparameter you tune (default 1.0 is usually near it).",
  simple: "Smoothing is adding a pinch of 'benefit of the doubt' to every word count. No pinch: one unseen word still vetoes everything. A truckload: every word looks equally common everywhere, and the model becomes an amnesiac. Somewhere between 'pinch' and 'truckload' is a best value — slide and find it.",
  widget: {
    type: "curveStatic", title: "From veto bug to amnesia",
    world: "One spam filter, retrained at six smoothing strengths. Watch validation accuracy rise as the zero-vetoes disappear — then fall as the fake counts start erasing real evidence.",
    xlab: "alpha (fake counts per word) →", xs: [0,1,2,3,4,5], labels: ["0","0.01","0.1","1","10","100"], dec: 0, yunit: "%",
    series: [
      { name: "validation accuracy", ys: [78, 88, 91, 92, 87, 74] },
      { name: "training accuracy",   ys: [99, 97, 95, 93, 88, 75] }
    ],
    knob: { label: "alpha", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 0, text: "alpha=0: training accuracy is stellar, validation isn't — every email containing one novel word is being vetoed into the wrong class.", tone: "warn" },
      { max: 3, text: "Around alpha=1 (the sklearn default) validation peaks: zeros are gone, real evidence still intact.", tone: "info" },
      { max: 5, text: "🤯 alpha=100: fake counts now outnumber real ones, every likelihood ratio is squashed toward ×1, and the model slides toward guessing the base rate. Smoothing is a dial between two failure modes.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Laplace (additive) smoothing", formula: "P(word|class) = (count + α) / (total + α·V)",
      text: "α fake occurrences of every vocabulary word (V = vocabulary size). α→0 restores the veto bug; α→∞ erases the evidence. Tune it like any hyperparameter." }
  }
},

{
  q: "GaussianNB is scoring a patient whose temperature is 99.5°F against two classes, healthy and flu. Mechanically, what did it learn per class, and how does it score?",
  choices: ["A bell curve (mean + spread) per class per feature — it asks which class's bell explains 99.5° better", "A single threshold temperature per class that cleanly splits the healthy from the flu cases", "A stored lookup table holding every training temperature, matched against the new reading", "A linear weight for each feature, summed across all features and squashed through a logistic curve to a probability", "The labels of the k nearest past patients by temperature, then a majority vote among them"],
  explain: "GaussianNB stores just two numbers per class per feature: the mean and variance of that feature among that class's training rows. At prediction time it reads each class's bell-curve height at the observed value and uses those as the likelihoods in Bayes' rule. Two numbers per curve is why it trains almost instantly.",
  simple: "For each class, the model remembers 'temperatures of healthy people pile up around 98.2, flu around 100.3' — a bell shape each. A new reading of 99.5 is then a simple question: under which pile is this value less surprising? Slide the thermometer and watch the two bells trade places.",
  widget: {
    type: "curveStatic", title: "Which bell explains the reading?",
    world: "The two bell curves GaussianNB fitted to body temperature — healthy (mean 98.2) and flu (mean 100.3). Slide the patient's reading along the axis and compare the bells' heights at that point.",
    xlab: "patient's temperature (°F) →", xs: [0,1,2,3,4,5,6,7,8], labels: ["96.5","97","97.5","98","98.5","99","99.5","100","100.5"], dec: 1, yunit: "",
    series: [
      { name: "healthy bell height", ys: [2, 8, 20, 30, 22, 9, 3, 1, 0.3] },
      { name: "flu bell height",     ys: [0.2, 0.5, 1.5, 4, 9, 17, 26, 20, 10] }
    ],
    knob: { label: "Patient's temperature", min: 0, max: 8, step: 1, init: 0 },
    insights: [
      { max: 2, text: "Cool readings sit high under the healthy bell and near the floor of the flu bell — likelihoods point firmly at healthy.", tone: "info" },
      { max: 4, text: "Around 98.5° the bells nearly cross — the temperature alone barely discriminates, and the prior (plus other features) decides.", tone: "info" },
      { max: 8, text: "🤯 The model never stored a single patient — just a mean and a spread per class. Two numbers per bell, multiplied across features by the usual NB rule. That's the entire mechanism.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "GaussianNB likelihoods", formula: "P(x|class) = bell(x; μ_class, σ_class) per feature",
      text: "Fit a Gaussian per class per feature, read its height at the observed value, multiply across features. Continuous data handled with two parameters per curve." }
  }
},

{
  q: "A marketing dataset has features 'sale', 'discount', '% off' and 'bargain' — four near-synonyms that almost always appear together. Why does this specifically hurt Naive Bayes?",
  choices: ["NB assumes clues are independent, so it counts the same signal four times and becomes wildly overconfident", "NB simply can't hold that many correlated features in memory at once, so it silently drops all but one of the extra synonyms", "The four near-synonyms collide inside the shared count table and repeatedly trigger zero-frequency vetoes on the final score", "Correlated features make NB's training time grow exponentially, so on a dataset like this one it slows right down to a crawl", "It doesn't actually hurt at all - NB quietly averages the four near-synonyms back into one clean signal"],
  explain: "The 'naive' assumption is conditional independence: each feature multiplies the odds as if it were fresh information. Four rewordings of one signal therefore multiply four times, when the honest update is roughly one. The ranking often survives (everything inflates together) but the probabilities become caricatures.",
  simple: "Imagine four witnesses who all heard the SAME rumour. Naive Bayes treats them as four independent confirmations and gets four times as convinced — but really there's one piece of information wearing four hats. Watch one clue, reworded three times, snowball the odds.",
  widget: {
    type: "bayesOdds", title: "One rumour, four witnesses",
    world: "An email being scored. All four chips are essentially the SAME clue — 'this email mentions a price cut' — dressed in different words. NB multiplies each as if it were brand new evidence.",
    posName: "promo email", prior: [1, 1],
    features: [
      { name: "'sale' ×3", lr: 3 },
      { name: "'discount' ×3 (same signal)", lr: 3 },
      { name: "'% off' ×3 (same signal)", lr: 3 },
      { name: "'bargain' ×3 (same signal)", lr: 3 }
    ],
    knob: { label: "Repeated clues counted", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "The first chip is legitimate: mentioning a price cut genuinely triples the odds. So far, honest.", tone: "info" },
      { max: 3, text: "Chips two and three are the same fact reworded — but the maths can't know that, so the odds triple again and again.", tone: "warn" },
      { max: 4, text: "🤯 Four rewordings compound to ×81 — near-certainty built from ONE real observation. Overconfident probabilities on correlated features is NB's signature failure; dropping near-duplicates or calibrating afterwards is the standard remedy.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The conditional-independence assumption", formula: "P(x₁,x₂,…|class) ≈ P(x₁|class)·P(x₂|class)·…",
      text: "The approximation that makes NB fast is exactly what double-counts correlated features. Rankings usually survive; trust the ORDER of scores, not their sizes." }
  }
},

{
  q: "Your filter trained on a 50/50 spam/ham corpus, but in production only 1% of mail is spam. The same email now deserves a different probability. What's the correct, cheap fix?",
  choices: ["Reset the class prior to the deployment mix — the learned word evidence carries over unchanged", "Retrain the entire model from scratch on the production mail only, throwing away all the old counts", "Slide the decision threshold down to 1% so the classifier matches the new base rate", "Drop the rarest words from the vocabulary so the skew stops distorting the counts", "Nothing at all - Naive Bayes is inherently immune to any shift in the class balance"],
  explain: "NB's score factorises cleanly: prior odds × word likelihood ratios. The likelihood ratios (what each word says) don't depend on the class mix; only the prior does. So you can swap in honest deployment priors (sklearn: the `priors`/`class_prior` argument) without touching the learned counts.",
  simple: "The model's verdict is 'starting odds × what the words say'. Training on a 50/50 corpus set the starting odds to a coin flip, but in the real inbox spam starts as a 1-in-100 longshot. The word evidence is still perfectly valid — only the starting line moved. Slide the assumed spam share and watch the same email's score swing.",
  widget: {
    type: "curveStatic", title: "Same words, different starting line",
    world: "One fixed email, scored under different assumed base rates. Its words multiply the odds ×20 (strong evidence) — or ×4 in the second curve (moderate). Only the PRIOR changes along the slider.",
    xlab: "assumed spam share of all mail →", xs: [0,1,2,3,4], labels: ["1%","10%","30%","50%","70%"], dec: 0, yunit: "%",
    series: [
      { name: "P(spam), strong words (×20)",  ys: [17, 69, 90, 95, 98] },
      { name: "P(spam), moderate words (×4)", ys: [4, 31, 63, 80, 90] }
    ],
    knob: { label: "Assumed spam share", min: 0, max: 4, step: 1, init: 3 },
    insights: [
      { max: 0, text: "Honest 1% prior: even ×20 evidence only reaches 17%. Rare things need overwhelming evidence — that's Bayes working correctly.", tone: "info" },
      { max: 3, text: "The 50/50 training prior reports 95% for the same email — a number that was only true inside the artificially balanced training set.", tone: "warn" },
      { max: 4, text: "🤯 The word evidence (×20) never changed across this whole slider — only the starting odds did. Because NB factorises this way, fixing the prior is a one-argument change, no retraining.", tone: "wow" }
    ],
    extreme: { at: "min" },
    reveal: { name: "Priors vs deployment class mix", formula: "posterior odds = (deployment prior odds) × Π likelihood ratios",
      text: "Word evidence transfers across class mixes; priors don't. sklearn's `class_prior=` lets you set the honest base rate directly." }
  }
},

{
  q: "Your Naive Bayes spam filter ranks emails brilliantly (great ROC-AUC), yet its stated probabilities cluster at 0.0001% and 99.999%. How should you treat its output?",
  choices: ["Trust the ORDER of scores, not their sizes — calibrate before using the numbers as probabilities", "Discard the model entirely - stated probabilities that extreme are a sign it is fundamentally broken", "Average each stated probability with a flat 50% to pull the extremes back inward", "Act only on the predictions above 99.999% and treat every other email as pure noise", "Keep retraining on far more data until the stated probabilities stop clustering"],
  explain: "Double-counted correlated evidence pushes NB's products to extremes, but it inflates all scores fairly consistently, so ranking survives. Wrap the model in a calibrator (CalibratedClassifierCV — Platt scaling or isotonic regression) when downstream decisions need honest probabilities.",
  simple: "The filter is like a friend with great instincts who talks in absolutes: everything is 'definitely' or 'no chance'. Their ORDERING of suspects is excellent; their confidence levels are theatre. You can keep the instincts and fix the theatre with a calibration step that remaps stated confidence onto observed reality.",
  widget: {
    type: "curveStatic", title: "Stated confidence vs reality",
    world: "Bucket emails by the filter's STATED spam probability, then measure how many in each bucket truly were spam. A perfectly honest model would sit on the diagonal.",
    xlab: "model's stated P(spam) →", xs: [0,1,2,3,4], labels: ["1%","25%","50%","75%","99%"], dec: 0, yunit: "%",
    series: [
      { name: "actually spam (honest model)", ys: [1, 25, 50, 75, 99] },
      { name: "actually spam (naive Bayes)",  ys: [8, 32, 50, 68, 90] }
    ],
    knob: { label: "Stated probability bucket", min: 0, max: 4, step: 1, init: 2 },
    insights: [
      { max: 1, text: "When NB says 1%, reality is 8% — its supposed near-impossibilities aren't that rare. The extremes are exaggerated.", tone: "warn" },
      { max: 2, text: "At 50% the curves touch: mid-range statements are roughly honest. It's specifically the confident tails that drift.", tone: "info" },
      { max: 4, text: "🤯 The NB curve is a squashed diagonal — systematically overconfident, yet perfectly MONOTONIC: higher stated score always means genuinely more likely spam. Ranking intact, numbers theatrical. Calibration just un-squashes the curve.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Calibration (of NB scores)", formula: "CalibratedClassifierCV(nb) — remap scores → honest probabilities",
      text: "Independence violations exaggerate confidence but preserve order. Sort/rank freely; calibrate before betting money on the raw numbers." }
  }
},

{
  q: "Inside a trained spam filter, the word 'viagra' multiplies the odds ×40 while 'the' multiplies by ×1.0. What property of a word determines its evidential power?",
  choices: ["The RATIO of its frequency in spam vs ham — words equally common in both multiply by ≈1 and say nothing", "How RARE the word is across the whole corpus - the scarcer it is, the harder it swings the odds", "Its RAW count inside the spam class alone - the more spam emails it happens to turn up in, the stronger it is", "How EARLY it appears in the email - words near the start carry far more weight than later ones", "How LONG the token is - longer, more unusual words are inherently the most discriminative ones"],
  explain: "Each word's factor is P(word|spam)/P(word|ham) — a likelihood ratio. 'the' appears in essentially every email of both classes, so its ratio is ~1: multiplying by 1 changes nothing. Discriminative words are lopsided ACROSS classes, not merely frequent or rare. This is also why stop-word removal barely helps NB — stop words neutralise themselves.",
  simple: "A clue is only a clue if it's more common among the guilty than the innocent. 'the' shows up everywhere, so hearing it tells you nothing — its multiplier is ×1, the do-nothing number. 'viagra' is 40 times more at home in spam, so it swings the odds hard. Feed the words in and watch who actually moves the needle.",
  widget: {
    type: "bayesOdds", title: "Words that whisper, words that shout",
    world: "Four words from one email, each carrying its learned spam-vs-ham ratio. Two are among the commonest words in English — watch how much of the final verdict they contribute.",
    posName: "spam", prior: [1, 1],
    features: [
      { name: "'the' ×1.0", lr: 1.0 },
      { name: "'and' ×1.02", lr: 1.02 },
      { name: "'viagra' ×40", lr: 40 },
      { name: "'unsubscribe' ×6", lr: 6 }
    ],
    knob: { label: "Words considered", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 2, text: "Two of the commonest words in the language have moved the odds from 1:1 to… 1.02:1. Frequent everywhere = informative nowhere.", tone: "info" },
      { max: 3, text: "'viagra' lands: ×40 in one hit. Its power isn't rarity — it's the LOPSIDEDNESS of where it appears.", tone: "info" },
      { max: 4, text: "🤯 Final odds ~245:1, of which the two 'big common words' contributed a factor of 1.02. Evidence lives in the frequency RATIO between classes — the whole idea of the likelihood ratio in one email.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The likelihood ratio", formula: "word's factor = P(word|spam) / P(word|ham)",
      text: "Equal frequency across classes ⇒ ratio 1 ⇒ zero information. TF-IDF and stop-word tricks matter less for NB than people expect — uninformative words already multiply by ~1." }
  }
},

{
  q: "A support-ticket classifier must spot a category that's only 2% of tickets. Plain MultinomialNB keeps under-calling it. Which purpose-built variant targets exactly this, and how?",
  choices: ["ComplementNB — it learns each class's word profile from all OTHER classes' documents, stabilising starved classes", "GaussianNB - fitting a bell curve to each word's counts smooths right over the class imbalance", "BernoulliNB - scoring every vocabulary word's ABSENCE hands the starved class enough extra signal to recover fully", "A second MultinomialNB trained only on the rare class's documents, then blended in by majority vote", "WeightedNB - it scales the rare class's prior upward until its recall matches the majority class"],
  explain: "With 2% of documents, the rare class's word counts are noisy and its estimates poor. ComplementNB estimates, for each class, the word distribution of its COMPLEMENT (everything else) — which is data-rich even when the class is starved — then scores against that. It's the standard NB pick for imbalanced text.",
  simple: "Trying to describe a tiny class from its own handful of documents is like sketching a face you glimpsed once. ComplementNB flips the problem: instead of 'what do refund tickets look like?' (few examples), it asks 'what does everything EXCEPT refunds look like?' (thousands of examples) and flags tickets that don't fit. More data per estimate, steadier answers.",
  widget: {
    type: "curveStatic", title: "Describing a class by its complement",
    world: "Minority-class F1 for plain MultinomialNB vs ComplementNB as the class mix grows more lopsided. Both see identical data — only the estimation trick differs.",
    xlab: "class balance (majority/minority) →", xs: [0,1,2,3,4], labels: ["50/50","70/30","90/10","95/5","99/1"], dec: 0, yunit: "%",
    series: [
      { name: "ComplementNB minority F1",  ys: [88, 86, 81, 76, 68] },
      { name: "MultinomialNB minority F1", ys: [88, 84, 72, 61, 42] }
    ],
    knob: { label: "Class imbalance", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Balanced data: the two are identical — the complement trick has nothing to add when every class has plenty of documents.", tone: "info" },
      { max: 3, text: "As the minority starves, MultinomialNB's estimates for it get noisy and its F1 slides fast. ComplementNB's estimates come from the data-rich majority side, so they stay steady.", tone: "info" },
      { max: 4, text: "🤯 At 99/1 the gap is 26 points — same model family, same data, different question asked of it. 'Describe what you're NOT' beats 'describe yourself from 1% of the data'.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "ComplementNB", formula: "score class c using word stats of NOT-c (its complement)",
      text: "sklearn.naive_bayes.ComplementNB — designed for imbalanced text. The complement of a starved class is data-rich, so its estimates are stable." }
  }
},

{
  q: "You have 40 labelled examples — a weekend's hand-labelling — and a deadline. Logistic regression and Naive Bayes are both candidates. What does the classic learning-curve comparison say?",
  choices: ["NB wins when data is scarce — its strong assumptions act like a head start — but flexible models overtake as data grows", "Logistic regression wins at every training size - a model carrying fewer assumptions always comes out ahead of one with more", "NB wins at every training size - its counting head start is a lead it never gives up to any rival", "The two stay essentially tied until a few thousand examples, then plateau at the same accuracy", "Neither model does anything useful below a hundred examples, so the whole comparison is moot"],
  explain: "Ng & Jordan's classic result: generative NB reaches its (higher) asymptotic error much faster — its independence assumption is a strong prior that substitutes for data — while discriminative logistic regression needs more examples but converges to a lower error. Rule of thumb: tiny data → NB; plenty → discriminative.",
  simple: "Strong assumptions are borrowed knowledge. NB shows up already 'knowing' how features behave (independently), so 40 examples are enough to fill in the blanks — while logistic regression is still guessing. But borrowed knowledge has a ceiling: once real data is abundant, the model with fewer assumptions learns things NB's shortcut can never express, and glides past it.",
  widget: {
    type: "curveStatic", title: "The head start and the ceiling",
    world: "Both models trained on growing slices of the same dataset. Watch who's ahead at 20 examples — and who's ahead at 10,000.",
    xlab: "training examples →", xs: [0,1,2,3,4,5], labels: ["20","50","150","500","2k","10k"], dec: 0, yunit: "%",
    series: [
      { name: "naive Bayes accuracy",         ys: [72, 79, 84, 86, 87, 88] },
      { name: "logistic regression accuracy", ys: [58, 68, 80, 87, 90, 92] }
    ],
    knob: { label: "Training set size", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "At 20–50 examples NB leads by double digits: the independence assumption fills the gaps that data can't yet.", tone: "info" },
      { max: 3, text: "Around a few hundred examples the curves cross — the discriminative model has finally out-learned the borrowed assumptions.", tone: "info" },
      { max: 5, text: "🤯 NB flatlines at 88% — its ceiling is set by the independence assumption, and no amount of data raises it. Assumptions trade asymptotic accuracy for sample efficiency. Choose by how much data you actually have.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Generative vs discriminative learning curves", formula: "NB: fast rise, lower ceiling · LogReg: slow rise, higher ceiling",
      text: "The Ng–Jordan comparison. NB also remains a superb same-day baseline: one counting pass, no tuning, instantly retrained." }
  }
}
];
