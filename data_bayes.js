/* Naive Bayes — Part I: Foundations. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).bayes1 = [

{
  q: "An email arrives containing the words 'FREE', 'winner' and 'meeting'. How does Naive Bayes decide whether it's spam?",
  choices: ["Combines each word's evidence with the base rate and picks the likelier class", "Counts which class has more emails overall", "Measures the distance to the nearest email", "Checks the email against a rule list", "Averages the labels of similar emails"],
  explain: "Naive Bayes starts from the prior (how common spam is) and multiplies in each word's likelihood ratio — how much more often it appears in spam than in legit mail. Biggest resulting probability wins.",
  simple: "It works like a detective adding up clues: start with 'how common is spam anyway?', then let each word push the odds up or down. 'FREE' pushes hard toward spam; 'meeting' pushes back. Multiply all the pushes together and read off the verdict.",
  widget: {
    type: "bayesOdds", title: "The clue multiplier",
    world: "One suspicious email. Start with the base rate, then feed in one word of evidence at a time. Watch the odds — and the final probability — compound.",
    posName: "spam", prior: [4, 6],
    features: [
      { name: "'FREE' ×4", lr: 4 },
      { name: "'winner' ×3", lr: 3 },
      { name: "'meeting' ×0.25", lr: 0.25 },
      { name: "3 exclamation marks ×2.5", lr: 2.5 }
    ],
    knob: { label: "Clues considered", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "No clues yet: just the base rate, 4 spam for every 6 legit. Even doing nothing, the model already has an opinion.", tone: "info" },
      { max: 2, text: "Each word MULTIPLIES the odds: ×4, then ×3. Two spammy words and the probability has jumped dramatically — evidence compounds.", tone: "info" },
      { max: 4, text: "🤯 'meeting' multiplied by 0.25 — evidence can push DOWN too. The final verdict is the tug of war between all the clues and the base rate. That's the whole algorithm.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Naive Bayes (Bayes' rule + evidence)", formula: "posterior odds = prior odds × Π likelihood ratios",
      text: "Prior belief, times one multiplier per piece of evidence, gives the posterior. Fast, tiny, and shockingly effective on text." }
  }
},

{
  q: "The 'naive' in Naive Bayes refers to one specific assumption. Which?",
  choices: ["Features are independent of each other, given the class", "The classes appear equally often", "All features are numeric", "The data has no noise", "Every word matters equally"],
  explain: "Multiplying likelihood ratios is only strictly valid if each feature adds INDEPENDENT information within a class. Real features correlate — the model naively multiplies anyway.",
  simple: "The model assumes every clue is a separate witness. But 'FREE' and 'FREE!!!' are basically the same witness testifying twice — and naive multiplication counts them twice. That over-trust of repeated evidence is the 'naive' part.",
  widget: {
    type: "bayesOdds", title: "The witness who testified twice",
    world: "This email says 'FREE' — and also 'FREE!!!'. Nearly the same clue. Watch what happens to the verdict when the model multiplies both in as if they were independent.",
    posName: "spam", prior: [1, 1],
    features: [
      { name: "'FREE' ×4", lr: 4 },
      { name: "'FREE!!!' ×4 (same clue again)", lr: 4 },
      { name: "'free gift' ×3.5 (again!)", lr: 3.5 }
    ],
    knob: { label: "Copies of the same clue counted", min: 0, max: 3, step: 1, init: 1 },
    insights: [
      { max: 1, text: "One 'FREE': odds ×4. Reasonable — that word genuinely is 4× more common in spam.", tone: "info" },
      { max: 2, text: "The second copy multiplies AGAIN: ×16 total, from what is really one fact about the email. The model can't tell correlated clues from fresh ones.", tone: "warn" },
      { max: 3, text: "🤯 Three near-copies: ×56, probability ≈98% — manufactured certainty from a single underlying clue. This is why NB's probabilities run overconfident even when its VERDICTS stay decent.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The independence assumption", formula: "assumes P(word₁, word₂ | class) = P(word₁|class) × P(word₂|class)",
      text: "Usually false, naively assumed, surprisingly harmless for picking the winning class — but treat NB's probability VALUES with suspicion." }
  }
},

{
  q: "A disease affects 1 person in 100. A test multiplies the odds of having it by 20 when positive. Someone tests positive. Roughly how worried should they be?",
  choices: ["Moderately — the low base rate keeps the probability well under 50%", "Near-certain — the test is strong", "Exactly 95% — the test's strength", "Zero — one test proves nothing", "It's 50/50 after any single test"],
  explain: "Prior odds 1:99, times 20, gives 20:99 — about 17%. Strong evidence applied to a rare condition still leaves the odds against. Ignoring this is the classic base-rate fallacy.",
  simple: "Start honest: before the test, it's 1 against 99. The test multiplies your side by 20 — now it's 20 against 99. That's still less than a 1-in-5 chance. Rare things stay fairly unlikely even after impressive evidence.",
  widget: {
    type: "bayesOdds", title: "The stubborn base rate",
    world: "One patient, one rare condition. Start from the honest 1:99 prior, then add test results one at a time. Watch how much evidence it takes to overcome rarity.",
    posName: "condition", prior: [1, 99],
    features: [
      { name: "positive test A ×20", lr: 20 },
      { name: "positive test B ×15", lr: 15 },
      { name: "matching symptom ×5", lr: 5 }
    ],
    knob: { label: "Evidence included", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Before any test: 1%. This number is doing more work than most people ever give it credit for.", tone: "info" },
      { max: 1, text: "🤯 After a ×20 test: about 17%. Most people guess 90%+. The base rate absorbed most of the punch — that surprise has a name: the base-rate fallacy.", tone: "wow" },
      { max: 3, text: "Stack a second test and a symptom and NOW the odds overwhelm the prior — certainty is earned by ACCUMULATED evidence, not one dramatic result.", tone: "info" }
    ],
    extreme: { at: 1 },
    reveal: { name: "The prior (base rate)", formula: "posterior odds = (1:99) × 20 = 20:99 ≈ 17%",
      text: "Naive Bayes bakes the base rate in from the start — one of the few models that automatically resists the most famous mistake in probabilistic reasoning." }
  }
},

{
  q: "Where does Naive Bayes get a number like \"'FREE' is 4× more common in spam\" in the first place?",
  choices: ["By counting word frequencies per class in the training data", "By gradient descent on a loss function", "From a built-in dictionary of spam words", "By measuring distances between emails", "From the analyst, by hand"],
  explain: "Training NB is just counting: 'FREE' appeared in 20% of spam and 5% of legit mail → ratio 4. One pass over the data, no iterations, no optimiser.",
  simple: "Training couldn't be simpler: read every email once and keep tallies. What fraction of spam contains 'FREE'? What fraction of normal mail does? Divide the two — that's the multiplier. The whole model is a table of counts.",
  widget: {
    type: "bayesOdds", title: "A model made of tallies",
    world: "Every multiplier below came from counting the training mail. 'FREE': in 20% of spam, 5% of legit → ×4. Feed the clues in and remember: each chip is just two counts divided.",
    posName: "spam", prior: [3, 7],
    features: [
      { name: "'FREE' (20% ÷ 5%) ×4", lr: 4 },
      { name: "'invoice' (6% ÷ 12%) ×0.5", lr: 0.5 },
      { name: "'£££' (9% ÷ 1%) ×9", lr: 9 }
    ],
    knob: { label: "Clues included", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Each multiplier is literally (frequency in spam) ÷ (frequency in legit). Training = filling in that table, in one pass.", tone: "info" },
      { max: 2, text: "'invoice' is ×0.5 because it's TWICE as common in legit mail. The counts encode direction automatically.", tone: "info" },
      { max: 3, text: "🤯 No loss function, no learning rate, no iterations — the entire 'training' was counting. That's why NB trains on a million emails in seconds.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Likelihoods from counting", formula: "P(word | class) = count(word in class) / count(class)",
      text: "NB's parameters are frequency tables. Training is one linear pass — which is why it's the classic first model for huge text datasets." }
  }
},

{
  q: "The word 'blockchain' never appeared in any training spam. A new spam email contains it. What does raw (unsmoothed) Naive Bayes do?",
  choices: ["Multiplies by zero — one unseen word vetoes everything", "Skips the unknown word gracefully", "Treats it as neutral evidence (×1)", "Asks for more training data", "Crashes with an error"],
  explain: "P('blockchain' | spam) = 0/1000 = 0, and anything × 0 = 0. One never-seen word forces P(spam) to exactly zero, no matter how damning the other 50 words are. Laplace smoothing (+1 to every count) fixes this.",
  simple: "One clue the model has never seen acts like a veto: multiply the odds by zero and the verdict is locked at 'definitely not spam', even if every other word screams spam. The fix is charmingly simple: pretend you saw every word once.",
  widget: {
    type: "bayesOdds", title: "The zero that vetoes everything",
    world: "This email is dripping with spam clues — and one word the training spam never contained. Add the clues in order. The last chip multiplies by zero.",
    posName: "spam", prior: [1, 1],
    features: [
      { name: "'FREE' ×4", lr: 4 },
      { name: "'winner!!!' ×5", lr: 5 },
      { name: "'wire transfer' ×6", lr: 6 },
      { name: "'blockchain' ×0 (never seen)", lr: 0 }
    ],
    knob: { label: "Clues included", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 3, text: "Three strong clues: odds 120:1, probability ≈99%. This email is as spammy as they come.", tone: "info" },
      { max: 4, text: "🤯 One multiplication by zero and 99% collapses to EXACTLY 0%. A single unseen word out-voted 120:1 odds. That absurdity is the zero-frequency problem.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Laplace smoothing", formula: "P(word|class) = (count + 1) / (total + vocabulary) — no count is ever zero",
      text: "Add one imaginary sighting of every word to every class. 'Never seen' becomes 'rare' instead of 'impossible', and the veto disappears." }
  }
},

{
  q: "A long email has 300 words, each contributing a probability like 0.02. Multiplying 300 such numbers directly causes a practical problem. Which — and what's the standard fix?",
  choices: ["The product underflows to zero — so add logarithms instead", "The product overflows to infinity — so cap it", "Multiplication is too slow — so sample words", "The order of words gets lost — so use pairs", "Rounding makes it random — so average twice"],
  explain: "0.02³⁰⁰ is around 10⁻⁵¹⁰ — far below what floating point can hold, so it becomes exactly 0. Since log(a×b) = log(a)+log(b), working with sums of logs keeps every digit safe.",
  simple: "Multiply three hundred tiny numbers and your computer eventually rounds the result to plain zero — every email 'scores' zero for every class. The trick: instead of multiplying tiny numbers, ADD their logarithms. Same comparison, no vanishing.",
  widget: {
    type: "curveStatic", title: "The vanishing product",
    world: "Score an email word by word. One curve multiplies raw probabilities; the other adds their logs. Slide the word count up and watch which representation survives.",
    xlab: "words processed", xs: [1,25,50,100,150,200,250,300], dec: 1,
    series: [
      { name: "raw product (×10⁻²⁰ scale)", ys: [90,42,11,0.9,0.05,0,0,0] },
      { name: "sum of logs (negated)", ys: [1.7,42,85,170,255,340,425,510] }
    ],
    knob: { label: "Words processed", min: 0, max: 7, step: 1, init: 0 },
    insights: [
      { max: 2, text: "Early on, both representations carry the same information — you can convert one to the other freely.", tone: "info" },
      { max: 4, text: "The raw product is plummeting toward the floor of what a computer can store. Every extra word multiplies it smaller.", tone: "warn" },
      { max: 7, text: "🤯 By 200 words the raw product IS zero — for every class, all information destroyed. The log-sum just keeps climbing steadily, happy to handle a 10,000-word document.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Log-probabilities", formula: "log(P₁ × P₂ × …) = log P₁ + log P₂ + … — compare sums, not products",
      text: "Every real NB implementation works in log-space. Same winner, no underflow — a beautiful example of maths saving engineering." }
  }
},

{
  q: "You have only 200 labelled documents and 5,000 word-features. Which property makes Naive Bayes a strong first choice here?",
  choices: ["Its counts need little data — it performs well long before flexible models do", "It ignores features until data is plentiful", "It automatically collects more data", "It reduces the vocabulary to 10 words", "It is the most accurate model at any size"],
  explain: "NB estimates one frequency per word per class — simple, stable statistics that converge fast. Flexible models need far more data before their extra capacity pays off.",
  simple: "Counting is data-cheap: even a small pile of emails gives usable word frequencies. A flexible model with thousands of knobs starves on 200 examples, while the humble counter is already doing honest work.",
  widget: {
    type: "curveStatic", title: "The head start",
    world: "Accuracy vs training-set size for the humble counter and a flexible model. Slide the data budget and see who wins where — and where they cross.",
    xlab: "training documents", xs: [0,1,2,3,4,5], labels: ["50","200","500","2k","10k","50k"], dec: 0, yunit: "%",
    series: [
      { name: "Naive Bayes", ys: [74,81,84,86,87,87] },
      { name: "flexible model", ys: [58,70,80,88,92,94] }
    ],
    knob: { label: "Training documents", min: 0, max: 5, step: 1, init: 1 },
    insights: [
      { max: 1, text: "🤯 At 200 documents NB leads by 11 points. Its simplicity isn't a weakness here — it's exactly what tiny datasets can support.", tone: "wow" },
      { max: 3, text: "Around a few thousand documents the curves cross: the flexible model's capacity finally has enough data to feed on.", tone: "info" },
      { max: 5, text: "At scale the flexible model wins — but NB plateaued at a respectable 87% for a fraction of the cost. Knowing WHERE each model wins is the real skill.", tone: "info" }
    ],
    extreme: { at: "min" },
    reveal: { name: "Sample efficiency", formula: "simple estimators converge fast: NB shines when data is scarce and dimensions are many",
      text: "The classic result: NB reaches its (lower) plateau quickly; discriminative models reach a higher plateau slowly. Small data → start with the counter." }
  }
},

{
  q: "A feature is continuous — say, transaction amount — rather than a word count. How does Gaussian Naive Bayes handle it?",
  choices: ["Fits a bell curve per class and compares their heights at the value", "Splits the amount into words", "Rounds it to 0 or 1", "Refuses continuous features", "Ranks it against the training set"],
  explain: "Gaussian NB models each class's values for a feature as a normal distribution. For a new value, the likelihood ratio is bell-height(class A) versus bell-height(class B) at that point.",
  simple: "For each class, draw the bell curve of typical values: fraud amounts cluster high, normal amounts cluster low. A new transaction lands somewhere; whichever class's bell is TALLER right there is claiming this value more strongly.",
  widget: {
    type: "curveStatic", title: "Two bells, one transaction",
    world: "The bell curves of transaction amounts for legit and fraudulent purchases. Slide a new transaction along the axis and compare the two bells' heights at that exact spot.",
    xlab: "transaction amount (£00s)", xs: [0,1,2,3,4,5,6,7,8,9,10], dec: 2,
    series: [
      { name: "legit bell height", ys: [0.05,0.18,0.38,0.52,0.45,0.27,0.12,0.05,0.02,0.01,0] },
      { name: "fraud bell height", ys: [0,0.01,0.03,0.07,0.14,0.26,0.4,0.48,0.42,0.28,0.14] }
    ],
    knob: { label: "New transaction amount", min: 0, max: 10, step: 1, init: 3 },
    insights: [
      { max: 3, text: "At low amounts the legit bell towers over the fraud bell — the likelihood ratio strongly favours legit.", tone: "info" },
      { max: 6, text: "In the crossover zone the bells are similar heights: genuinely ambiguous amounts, weak evidence either way.", tone: "warn" },
      { max: 10, text: "🤯 Far right: the fraud bell is many times taller. The RATIO of heights at a point — that's the continuous version of a word's ×4 multiplier.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Gaussian Naive Bayes", formula: "P(x | class) = normal density with that class's mean and spread",
      text: "Same Bayes machinery — the frequency table is replaced by a fitted bell curve per feature per class. Counts for words, bells for numbers." }
  }
},

{
  q: "Naive Bayes outputs P(spam) for each email. The security team wants to auto-delete only when very sure. What do they control?",
  choices: ["The decision cutoff on the probability", "The prior counts", "The number of features", "The smoothing constant", "The vocabulary size"],
  explain: "Same lesson as every probabilistic classifier: the model supplies probabilities, the operator picks the cutoff. Auto-delete might trigger at 99%, a spam-folder move at 70%.",
  simple: "Deleting real mail is a disaster, so act only on near-certainty: auto-delete at 99%+, just flag at 70%. The model didn't change — the team simply placed two lines through its output.",
  widget: {
    type: "threshold", title: "Two lines through one model",
    world: "Emails placed by NB's spam probability (0–10 scale). Orange = actually spam. Find a cutoff strict enough that nothing legit ever gets deleted — then see what it costs.",
    posName: "spam", negName: "legit", axis: "P(spam)×10", show: ["precision", "recall"],
    items: [{s:0.6,c:0},{s:1.4,c:0},{s:2.2,c:0},{s:3,c:0},{s:4,c:1},{s:4.8,c:0},{s:5.6,c:1},{s:6.4,c:0},{s:7.4,c:1},{s:8.2,c:1},{s:9,c:1},{s:9.6,c:1}],
    knob: { label: "Auto-delete cutoff", min: 0, max: 10, step: 0.5, init: 5 },
    insights: [
      { max: 4, text: "Loose cutoffs delete legit mail — look for blue dots inside the shaded zone. For auto-delete, even one is unacceptable.", tone: "warn" },
      { max: 7.5, text: "Tightening: precision climbs toward 100% while recall falls. You delete less spam, but you delete ONLY spam.", tone: "info" },
      { max: 10, text: "🤯 At the strictest setting: everything flagged is truly spam (perfect precision), and most spam escapes to the folder instead. For this use-case that's the correct trade — certainty first.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Operating points on a probability", formula: "different actions at different cutoffs: delete ≥ 0.99 · flag ≥ 0.7 · allow otherwise",
      text: "One probabilistic model supports a whole policy ladder. This pattern — model supplies p, policy supplies cutoffs — recurs across all of ML." }
  }
},

{
  q: "Despite its false independence assumption, Naive Bayes often picks the RIGHT class anyway. Why?",
  choices: ["Picking a winner only needs the ordering right, not the probabilities", "The assumption is usually true after all", "Smoothing repairs the correlations", "It secretly learns feature interactions", "Errors in both directions always cancel"],
  explain: "Classification only asks which class's score is BIGGER. Double-counted evidence inflates probabilities but often inflates the winner most, leaving the ranking — and the verdict — intact.",
  simple: "To win a race you only need to be in front — the stopwatch can be wrong. NB's probability values are often exaggerated, but the exaggeration usually keeps the right class in front, and the verdict is all we asked for.",
  widget: {
    type: "bayesOdds", title: "Wrong numbers, right verdict",
    world: "Correlated clues exaggerate this email's odds. Watch the probability shoot past anything defensible — while asking yourself: did the VERDICT ever change?",
    posName: "spam", prior: [1, 1],
    features: [
      { name: "'offer' ×3", lr: 3 },
      { name: "'special offer' ×3 (correlated)", lr: 3 },
      { name: "'offer ends' ×2.5 (correlated)", lr: 2.5 },
      { name: "'meeting' ×0.3", lr: 0.3 }
    ],
    knob: { label: "Clues included", min: 1, max: 4, step: 1, init: 1 },
    insights: [
      { max: 1, text: "One honest clue: 75%. A defensible number.", tone: "info" },
      { max: 3, text: "The correlated copies inflate it to ≈96%, then ≈98% — numbers you should NOT trust. But note: spam was already winning at chip one.", tone: "warn" },
      { max: 4, text: "🤯 Even after counter-evidence, the verdict never flipped. The probabilities were nonsense; the ORDER was robust. Use NB's labels freely — quote its confidence carefully.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Good classifier, bad probabilities", formula: "argmax is robust: only the ranking of class scores must be right",
      text: "The deep reason NB survives its naive assumption. If you need trustworthy probability VALUES, recalibrate them (e.g. Platt scaling) — or use logistic regression." }
  }
}
];
