/* Machine Learning Foundations — the base every other topic builds on. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).found1 = [

{
  q: "Traditional software follows rules a human wrote out by hand. What is fundamentally different about how a machine-learning system arrives at its rules?",
  choices: ["It infers the rules automatically from many labelled examples instead of a human writing them out", "It runs the human's rules far faster by spreading the very same fixed logic across many processors", "It stores every example it is shown so it can look up an exact match whenever a new case arrives", "It asks a human to confirm each rule before applying it, learning only which rules to trust most", "It generates rules at random and simply keeps whichever ones a human reviewer happens to approve of"],
  explain: "In traditional programming a person specifies the logic step by step; in machine learning you supply examples of inputs paired with correct outputs, and the learning procedure discovers the rules that map one to the other. That is why ML shines on problems too messy to hand-code — spotting spam, recognising faces — where nobody can write the rules explicitly. The machine is not memorising cases; it extracts a general pattern it can apply to brand-new inputs.",
  simple: "Normally a programmer types out every 'if this, then that' by hand. Machine learning flips this around: you show the computer thousands of solved examples and let it work the rules out for itself. It is like teaching a child to spot dogs by pointing at many dogs, rather than trying to write a perfect word-definition of 'dog'.",
  widget: {
    type: "curveStatic", title: "When hand-coding gives out",
    world: "The same task attempted two ways — rules a human writes by hand, versus rules a model learns from examples — as the task gets messier.",
    xlab: "task messiness →", xs: [0,1,2,3,4], labels: ["trivial","simple","moderate","messy","chaotic"], dec: 0, yunit: "%",
    series: [
      { name: "hand-coded rules (accuracy %)", ys: [95, 84, 64, 40, 20] },
      { name: "learned from examples (accuracy %)", ys: [92, 90, 88, 85, 82] }
    ],
    knob: { label: "Task messiness", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "On a trivial task the hand-written rules are fine — even a touch better. When a person CAN state the rules, just state them; you do not need ML.", tone: "info" },
      { max: 3, text: "As the task gets messier the hand-coded rules crack: nobody can enumerate every case. The learned model barely notices — it soaks the pattern from examples.", tone: "info" },
      { max: 4, text: "🤯 On the chaotic real-world task, hand-coding collapses while learning-from-data holds up. That gap IS machine learning's reason to exist: it writes rules no human could.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Machine learning vs traditional programming", formula: "traditional: human writes the rules · ML: rules learned from examples",
      text: "Reach for ML only when the rules are too complex or too fuzzy for a person to write out by hand." }
  }
},

{
  q: "A colleague says: 'I ran a decision-tree algorithm on our data and it gave me a model.' In plain terms, what is the difference between the algorithm and the model?",
  choices: ["The algorithm is the procedure that learns; the model is the finished result it produces from data", "The algorithm is the trained result; the model is the raw procedure you run before any data arrives", "They are two names for one trained object — 'algorithm' in theory and 'model' when written in code", "The algorithm is the input dataset; the model is that very same dataset once it has been fully cleaned", "The algorithm is the metric that scores accuracy; the model is the chart you draw from those scores"],
  explain: "An algorithm — a decision tree, linear regression, gradient descent — is a fixed recipe for turning data into a model, and it is the same before you ever see the data. Running that algorithm on a specific dataset produces a model: the concrete learned function with particular numbers baked in. So one algorithm can yield countless different models, one for every dataset you train it on.",
  simple: "Think of the algorithm as a recipe and the model as the cake it bakes. The recipe stays the same every time; the cake depends on the ingredients — your data — you put in. Swap in different data and the same recipe gives you a different cake, that is, a different model.",
  widget: {
    type: "curveStatic", title: "One recipe, many cakes",
    world: "A single fixed algorithm run on the same kind of data in growing amounts — watch the MODEL it produces change while the algorithm never does.",
    xlab: "data fed to the same algorithm →", xs: [0,1,2,3,4], labels: ["tiny","small","medium","large","huge"], dec: 0, yunit: "%",
    series: [
      { name: "resulting model accuracy (%)", ys: [55, 68, 79, 86, 89] }
    ],
    knob: { label: "Data fed in", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Tiny data, same recipe: the algorithm still runs, but the model it bakes is weak — thin ingredients, thin cake.", tone: "info" },
      { max: 3, text: "Feed the identical algorithm more data and it turns out a stronger model. The recipe never changed; the result did.", tone: "info" },
      { max: 4, text: "🤯 The algorithm was one fixed procedure the whole way across — every point here is a DIFFERENT model it produced. Algorithm is the recipe; model is the cake.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Algorithm vs model", formula: "algorithm (recipe) + data → model (result)",
      text: "One algorithm can produce endless models. You choose the algorithm, but what you deploy is the model." }
  }
},

{
  q: "A spam filter is 'right 95% of the time', yet users are furious that real emails keep landing in the spam folder. Which pair of measures exposes the problem that a single accuracy number hides?",
  choices: ["Precision and recall — how many spam catches were correct, and how much real spam slipped through", "Training loss and test loss — the error the model made on the rows it saw versus brand-new rows", "Speed and memory — how fast the model scores one email and how much storage space it takes up on disk", "Bias and variance — how much the model underfits versus how wildly it swings across samples", "Learning rate and tree depth — how big each training step is and how deep the decision tree may grow"],
  explain: "Accuracy is just the fraction of predictions that are correct, which crushes two very different mistakes into one number. Precision asks: of everything the filter flagged as spam, how much really was spam? Recall asks: of all the real spam, how much did it catch? A filter that dumps good email into the spam folder has poor precision even when overall accuracy looks high — so classifiers are judged on precision and recall together, not accuracy alone.",
  simple: "Saying a filter is '95% accurate' hides WHICH mistakes it makes. Precision is how trustworthy its 'spam!' calls are; recall is how much of the real spam it actually grabs. A filter can look accurate while quietly tossing your genuine emails in the bin — only precision and recall reveal that.",
  widget: {
    type: "curveStatic", title: "The precision-recall tug of war",
    world: "One spam filter with a strictness dial, turned from lenient to aggressive — the same model, judged by two measures at once.",
    xlab: "filter strictness →", xs: [0,1,2,3,4], labels: ["lax","mild","balanced","strict","extreme"], dec: 0, yunit: "%",
    series: [
      { name: "recall (% of spam caught)", ys: [40, 62, 80, 92, 98] },
      { name: "precision (% of flags correct)", ys: [98, 94, 85, 65, 40] }
    ],
    knob: { label: "Filter strictness", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Lax filter: almost every 'spam!' flag is right (high precision), but heaps of spam slips past (low recall). Accuracy alone can't see this split.", tone: "info" },
      { max: 3, text: "Turn up strictness and recall climbs — more spam caught — but precision starts falling as real emails get wrongly flagged. One number can't capture both.", tone: "info" },
      { max: 4, text: "🤯 At the extreme it catches nearly all spam yet mislabels piles of genuine mail — precision craters. This trade-off is exactly what a lone accuracy score hides.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Precision and recall", formula: "precision = correct flags / all flags · recall = spam caught / all real spam",
      text: "Report both (or their F1 blend); a single accuracy number can quietly hide expensive mistakes." }
  }
},

{
  q: "Before any model exists, you're handed a spreadsheet of past customer visits. In machine-learning language, what is this 'dataset', concretely?",
  choices: ["A table of past cases where each row is one recorded event and each column holds one fact about it", "A single large file of raw text the model reads from start to finish to absorb the patterns inside it", "The trained model's memory, storing every answer it has produced so it can look those answers up later", "A ranked list of the features that matter most, ordered so the strongest predictor sits right at the top", "The stream of live predictions a deployed model emits, gathered together for monitoring and later review"],
  explain: "A dataset is just an organised record of the past: rows are individual cases (one visit, one sale, one email) and columns are the facts recorded about each case. Models learn nothing from the world directly — they learn from this table, so its rows-are-cases, columns-are-facts shape is the starting point of every project. Get the table right and everything downstream has something honest to stand on.",
  simple: "Think of an ordinary spreadsheet of things that already happened: one line per event, one column per fact you wrote down. That's all a dataset is — no magic, just tidy history. Everything the model ever 'knows' comes from staring at this table, so the very first skill is reading it: which line is a case, and which column is a fact about that case.",
  widget: {
    type: "curveStatic", title: "Rows pile into knowledge",
    world: "One dataset growing over time: as more past cases get recorded, more of the real pattern becomes learnable from the table.",
    xlab: "rows recorded →", xs: [0,1,2,3,4], labels: ["10","100","1k","10k","100k"], dec: 0, yunit: "%",
    series: [
      { name: "pattern captured (%)", ys: [20, 55, 78, 90, 94] }
    ],
    knob: { label: "Rows recorded", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Ten rows: barely a sketch of the truth. A handful of cases can't reveal a pattern — the table is too thin to learn from.", tone: "info" },
      { max: 3, text: "By ten thousand rows the shape fills in: every extra row is one more past case the model can generalise from.", tone: "info" },
      { max: 4, text: "🤯 A hundred thousand rows and the curve flattens near the ceiling: the dataset now holds most of the recoverable pattern. The model never touched the world — only this table. Rows are cases, columns are facts, and that is the whole raw material.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Dataset", formula: "rows = past cases · columns = facts recorded about each case",
      text: "In code it becomes X (feature columns) and y (the label column). Every topic in this manual begins by reading one of these tables." }
  }
},

{
  q: "Your spam dataset has one line for each email you've ever received. What is a single one of those lines called in machine learning, and what does it represent?",
  choices: ["An example (or row) — one recorded case, like a single email, that the model learns from by seeing many", "A feature — one measurable fact about the data, like word count, that the model reads as input for its guess", "A label — the correct answer for the case, like spam or not, that the model is being trained to reproduce", "A parameter — one internal number the model adjusts during training so its error on the data keeps shrinking", "A batch — a small group of cases fed through the model together before its numbers are nudged just once"],
  explain: "An example (spoken of as a 'row') is one complete case in the dataset: one email, one house sale, one patient visit, with all its facts on a single line. Models don't learn from one example — they learn by seeing many, extracting what the cases have in common. The other options are real ML terms, but each names a PART of the setup (a column, an answer, an internal number), not the whole recorded case.",
  simple: "Picture the spam spreadsheet again: each row is one email, laid out with all its details. That single row is an 'example' — one thing that happened, written down. The model becomes smart not from any one row but from flipping through thousands of them, the way you'd learn what 'spam' feels like after seeing a few hundred junk messages.",
  widget: {
    type: "curveStatic", title: "One row, then a thousand",
    world: "A dataset seen as a stack of individual examples — watch how many rows the model needs before it stops guessing.",
    xlab: "examples seen →", xs: [0,1,2,3,4], labels: ["1","10","100","1k","10k"], dec: 0, yunit: "%",
    series: [
      { name: "test accuracy (%)", ys: [50, 58, 74, 86, 90] }
    ],
    knob: { label: "Examples seen", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "One or ten examples: the model has almost nothing to generalise from — barely above a coin flip at 50-58%.", tone: "info" },
      { max: 3, text: "A thousand examples and the picture sharpens to 86%: each row was one more case the model could learn from.", tone: "info" },
      { max: 4, text: "🤯 Ten thousand examples, 90% accuracy: no single row taught the model 'spam' — the pattern lived across the whole pile. That's why one example is the atom of learning, and why datasets are measured in rows.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Example (row)", formula: "one example = one complete case, all its facts on a single line",
      text: "Rows are what you count when you ask 'how much data do I have?'. More independent examples almost always means better generalisation." }
  }
},

{
  q: "People say the computer 'builds a model' from the data. Stripped of the mystique, what IS a model?",
  choices: ["A function the computer builds from data: features go in, a prediction comes out — a learned recipe", "The full table of training examples, kept in memory so each new case can be matched against it and copied", "The set of settings a person picks before training, such as depth or learning rate, that steer the fitting", "The measure of how wrong each guess is, which training keeps pushing downward until it stops improving", "The held-out block of data used at the very end to grade how well the finished system handles unseen cases"],
  explain: "A model is a function with adjustable internal numbers: you feed it feature values and it returns a prediction. Training is what fills in those numbers from data, but the model itself is just the resulting input-output recipe — logistic regression, a decision tree, and a neural net differ only in the shape of that recipe. The distractors name things AROUND the model (the data, the hyperparameters, the loss, the test set), not the recipe itself.",
  simple: "Forget the word 'model' sounding clever. It's a machine with dials: put a house's size and location in one end, and a price guess comes out the other. Training is the process that set the dials; the dialled-in machine IS the model. Nothing mystical — a recipe the computer wrote by looking at examples, that turns inputs into an answer.",
  widget: {
    type: "curveStatic", title: "Features in, prediction out",
    world: "A model treated as a recipe: feed it a house size and read the price it returns — the same recipe applied across sizes.",
    xlab: "input feature: house size (1000s sqft) →", xs: [0,1,2,3,4], labels: ["1.0","1.5","2.0","2.5","3.0"], dec: 0, yunit: "k",
    series: [
      { name: "predicted price (GBP k)", ys: [180, 240, 300, 360, 420] }
    ],
    knob: { label: "House size", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Smallest house in, 180k out. The model isn't thinking — it's applying the recipe training baked into its numbers.", tone: "info" },
      { max: 3, text: "Feed larger sizes and the price climbs steadily: same recipe, different input, a fresh prediction each time.", tone: "info" },
      { max: 4, text: "🤯 The biggest house maps to 420k by the same rule as the smallest. A model is exactly this: a fixed function, features in and a prediction out. Every algorithm in this manual is just a different SHAPE of that function.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Model", formula: "model = a learned function · features in → prediction out",
      text: "Training chooses the function's internal numbers; the model is the finished input-output recipe. In sklearn it's the fitted estimator object." }
  }
},

{
  q: "You feed a brand-NEW house's features into a trained model and it hands back a number. What is that step, and its output, called?",
  choices: ["A prediction — running a new row of features (no label) through the trained model to get its best guess", "Training — adjusting the model's internal numbers so that its error on the examples it is shown keeps shrinking", "Generalisation — the model's knack for performing well on the fresh cases it never once saw while it was learning", "Validation — scoring the model on held-out rows to compare settings before any final number is chosen or reported", "Labelling — attaching the known correct answer to each past row so the model has something concrete to learn from"],
  explain: "A prediction is the model's forward use: hand it a new case's features (the label is unknown — that's the whole point) and it returns its best guess at that missing label. It's the opposite direction from training: training consumes examples WITH answers to set the model's numbers; prediction consumes features WITHOUT an answer and produces one. The distractors are all real, adjacent steps, but none names the act of turning a new feature row into a guess.",
  simple: "Training is the studying; prediction is sitting the actual exam. You show the finished model a house it has never seen — just its size, age, location — and it fills in the one blank it was built to fill: the price. No answer key is attached to that new house; producing the missing answer is exactly what predicting means.",
  widget: {
    type: "curveStatic", title: "One new row, one guess",
    world: "A trained model applied to brand-new houses of increasing size — each input row produces one predicted price, shown against what the house truly sold for.",
    xlab: "new house size (1000s sqft) →", xs: [0,1,2,3,4], labels: ["1.0","1.5","2.0","2.5","3.0"], dec: 0, yunit: "k",
    series: [
      { name: "model's prediction (GBP k)", ys: [210, 255, 300, 345, 390] },
      { name: "true sold price (GBP k)",    ys: [205, 250, 305, 350, 395] }
    ],
    knob: { label: "New house size", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Smallest new house: the model predicts 210k with no answer key in hand — it's filling the blank, not checking one.", tone: "info" },
      { max: 3, text: "Across mid-sized houses the prediction shadows the true price closely: a good model's guesses track reality on cases it never saw.", tone: "info" },
      { max: 4, text: "🤯 The largest house: predicted 390k, actually 395k — a guess made from features alone, the label supplied by the model, not the data. That forward step, features-in-guess-out on a new row, is prediction. It's the whole reason a model exists.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Prediction", formula: "new features (no label) → trained model → best guess at the label",
      text: "In code it's model.predict(X_new). Training sets the model up; prediction is what you actually deploy it to do." }
  }
},

{
  q: "A house-price dataset has columns: square footage, bedrooms, age, location score — and sold price. You want to predict prices for NEW houses. Which column plays a different role from the others, and why?",
  choices: ["Sold price is the LABEL — it's what we predict, and it's exactly the column we won't have for new houses", "Location score is the LABEL — it's a human judgement, and a model must output a judgement rather than a hard fact", "Bedrooms is the odd column out — it's a whole count, while the others are all smooth continuous measurements", "Square footage is the key input — it's the feature the model leans on hardest, which sets it apart from the rest", "Age is different — it keeps ticking up after the sale, so unlike the fixed columns it can't feed a prediction"],
  explain: "Features are inputs you'll know at prediction time; the label is the output you're trying to produce. The split isn't about data types or sizes — it's about WHEN you know each column. For a new listing, footage/bedrooms/age/location are all knowable; the sold price is precisely the unknown the model exists to fill in.",
  simple: "Four of these columns are clues; one is the answer. The test is simple: imagine a brand-new house you want a prediction for. You can measure its size, count its bedrooms, check its age and location — but the sold price doesn't exist yet. That missing-for-new-cases column is the label; everything else is a feature. Every supervised model in this manual is the same shape: clues in, answer out.",
  widget: {
    type: "curveStatic", title: "Clues vs the answer",
    world: "The five columns of the dataset, scored on two questions: 'do we know this for a NEW house?' and 'is this what the model must output?' Slide across the columns.",
    xlab: "column →", xs: [0,1,2,3,4], labels: ["sq footage","bedrooms","age","location","SOLD PRICE"], dec: 0, yunit: "",
    series: [
      { name: "known for a new house (1 = yes)", ys: [1, 1, 1, 1, 0] },
      { name: "what the model must output",      ys: [0, 0, 0, 0, 1] }
    ],
    knob: { label: "Column", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Square footage, bedrooms: knowable the moment a house is listed. These are features — the inputs.", tone: "info" },
      { max: 3, text: "Age and location too — every column so far scores 1 on 'known in advance' and 0 on 'must be output'. Clues, all of them.", tone: "info" },
      { max: 4, text: "🤯 Sold price flips both scores at once: unknown for new houses, and exactly what we want produced. One column playing a different GAME, not just holding different numbers — that's what makes it the label.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Features vs the label", formula: "features = inputs known at prediction time · label = the output to learn",
      text: "In code: X (features) and y (label). Every supervised dataset in this manual splits exactly this way — spotting the split is always step one." }
  }
},

{
  q: "Five projects land on your desk: a spam filter (with flagged examples), house-price prediction (with sold prices), customer grouping (no groups given), fraud detection via 'weirdness' (no fraud labels), and topic discovery in documents. What cleanly separates them into two camps?",
  choices: ["Whether labelled answers exist to learn from: spam and prices are supervised; the other three must find structure without answers — unsupervised", "Whether a human must interpret the output: spam and fraud flags need review, while grouping, pricing and topics run automatically", "Whether the goal is prediction or description: spam and fraud actively predict future events, while grouping, pricing and topics merely describe the patterns already sitting in the data", "Whether examples stream in or arrive as a batch: spam and fraud flow in over time, while prices, groups and topics form a fixed set", "Whether the answer is a category or a number: spam and fraud are yes/no, while prices, groups and topics live on a numeric scale"],
  explain: "Supervised learning has a teacher: every training row comes with the right answer (spam/not, the sold price), and the model learns the mapping. Unsupervised learning has no answer column at all — the task is to expose structure: groups (clustering), unusual points (anomaly detection), themes (topic models). The question 'do I have labels?' decides which half of this manual you're in.",
  simple: "Ask one question of each project: 'do I have a stack of examples WITH the correct answer attached?' Spam filter — yes, flagged emails. Prices — yes, real sales. Customer groups — no one has ever handed you the 'true' groups; you're asking the data to reveal them. That single yes/no splits all of machine learning into its two great halves: learning from answers, and finding structure without them.",
  widget: {
    type: "curveStatic", title: "The one-question sorting hat",
    world: "The five projects, scored on 'labelled answers available?' — watch them fall into two clean camps, whatever else they differ in.",
    xlab: "project →", xs: [0,1,2,3,4], labels: ["spam filter","house prices","customer groups","weirdness alarm","topic discovery"], dec: 0, yunit: "",
    series: [
      { name: "labelled answers exist (1 = yes)", ys: [1, 1, 0, 0, 0] },
      { name: "output is itself the structure",   ys: [0, 0, 1, 1, 1] }
    ],
    knob: { label: "Project", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Spam and prices: history handed you graded examples. The model's job is to learn the grading. Supervised.", tone: "info" },
      { max: 3, text: "Customer groups and the weirdness alarm: nobody possesses the 'right answers' — the finding IS the output. Unsupervised.", tone: "info" },
      { max: 4, text: "🤯 Text vs numbers, big vs small, fast vs slow — none of it mattered. One question sorted all five: are there labels to learn from? It also sorts this manual: topics 01–11 supervised, 12–16 unsupervised.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Supervised vs unsupervised learning", formula: "labels present → supervised · absent → unsupervised",
      text: "Supervised: classification & regression. Unsupervised: clustering, anomaly detection, dimensionality reduction. Semi-supervised and self-supervised blends exist — but this split is the map." }
  }
},

{
  q: "Both are supervised: 'will this customer churn — yes or no?' and 'how much will this customer spend next year — in pounds?'. What's the technical distinction, and why does it matter?",
  choices: ["The first predicts a CATEGORY (classification), the second a NUMBER (regression) — the choice changes the algorithms, the outputs and the error measures", "Both actually predict NUMBERS, but the first is bounded between 0 and 1 while the second runs entirely open-ended — so it is the range of the output, not its underlying type, that drives the metric you report", "The first is a ranking task and the second a scoring one — you order customers by risk in one and assign each a raw value in the other", "The first needs a probability threshold and the second a rounding rule — otherwise the same regression machinery answers both alike", "The first outputs one class and the second outputs many — the count of possible answers, not their kind, is the real technical divide"],
  explain: "Classification outputs one of a fixed set of classes (often with a probability per class); regression outputs a quantity on a continuous scale. The same core algorithms usually come in both flavours (DecisionTreeClassifier / DecisionTreeRegressor), but the loss functions, output layers and evaluation metrics (accuracy/F1 vs MAE/RMSE) all change with the answer type. Misidentifying the type is a project-level bug.",
  simple: "Look at the SHAPE of the answer. 'Churn: yes/no' has two possible answers — you're sorting customers into buckets. '£ spent next year' has infinitely many possible answers along a scale — you're placing a pin on a ruler. Buckets = classification; ruler = regression. It's the second question you ask of any new problem (right after 'do I have labels?'), because everything downstream — algorithm flavour, error metric, how you report results — follows from it.",
  widget: {
    type: "curveStatic", title: "Buckets or a ruler?",
    world: "Five prediction targets, scored: is the answer a category (bucket) or a quantity (ruler)? Slide across and sort them.",
    xlab: "prediction target →", xs: [0,1,2,3,4], labels: ["churn yes/no","£ next year","spam or not","temperature °C","which species"], dec: 0, yunit: "",
    series: [
      { name: "category → classification (1)", ys: [1, 0, 1, 0, 1] },
      { name: "quantity → regression (1)",     ys: [0, 1, 0, 1, 0] }
    ],
    knob: { label: "Target", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Churn is two buckets; £-spent is a ruler. Same customer, same data — different answer shapes, different machinery.", tone: "info" },
      { max: 3, text: "Temperature is a ruler even though it 'feels' physical; species is buckets even with 200 of them. Count the possible answers: finite list vs continuous scale.", tone: "info" },
      { max: 4, text: "🤯 The answer's shape dictates the whole toolchain: losses (log-loss vs squared error), outputs (probabilities vs values), metrics (F1 vs RMSE). One glance at the label column sets up everything that follows.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Classification vs regression", formula: "finite categories → classification · continuous quantity → regression",
      text: "Most algorithms ship in both flavours. Edge cases exist (ordinal ratings, counts) — but bucket-vs-ruler is the correct first instinct." }
  }
},

{
  q: "Everyone says a model is 'trained'. Concretely — mechanically — what is happening during training?",
  choices: ["The model's internal numbers are repeatedly nudged in whatever direction shrinks its measured error on the training examples", "The algorithm scans its store of examples and keeps the ones nearest each decision boundary for fast comparison at prediction time", "The strongest features are selected and the weak ones dropped, until only the columns that truly predict the label remain in play", "The data is divided into batches and reshuffled many times so the model sees every possible ordering of the training examples", "A fixed formula is solved once with algebra, placing the parameters exactly where the training data demands them in a single step"],
  explain: "A model is a function with adjustable numbers (parameters — weights, split thresholds, centroid positions). Training is a loop: measure how wrong the current numbers are (the LOSS), work out which direction of adjustment would reduce that wrongness, nudge, repeat. Different algorithms fill in the details differently (gradient descent, greedy splitting, closed-form solutions), but 'iteratively reduce a measured error' is the shared skeleton.",
  simple: "Picture tuning an old radio: you can't see the signal, but you can HEAR the static (the error), so you turn the dial a little, listen, turn again — always in the direction of less static. Training is exactly that, automated: the model's dials are its parameters, the static-meter is the loss function, and the loop runs thousands of times. Nothing is memorised, nobody types in answers — dials turn until the error stops falling.",
  widget: {
    type: "curveStatic", title: "Turning dials toward less static",
    world: "One model in training: watch its error (loss) and its accuracy across the training loop's iterations. Note WHERE the improvement happens — early, fast, then flattening.",
    xlab: "training iterations →", xs: [0,1,2,3,4,5], labels: ["0","10","50","200","1k","5k"], dec: 2, yunit: "",
    series: [
      { name: "loss (the static meter)", ys: [0.69, 0.55, 0.38, 0.27, 0.22, 0.21] },
      { name: "accuracy (÷100)",         ys: [0.5, 0.62, 0.76, 0.86, 0.9, 0.91] }
    ],
    knob: { label: "Iterations", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Iteration 0: the dials are random, the loss is at its 'pure guessing' level (0.69 is exactly the log-loss of a 50/50 shrug), accuracy is a coin flip.", tone: "info" },
      { max: 2, text: "Early nudges are worth the most — the error signal is loud, so each adjustment is large and confident.", tone: "info" },
      { max: 5, text: "🤯 By 5,000 iterations the curves have flatlined: the dials barely move because the static barely drops. 'Trained' isn't a magic state — it just means further nudging stopped helping. That's the whole ceremony.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Training = iterative error reduction", formula: "repeat: measure loss → adjust parameters downhill → until it stops falling",
      text: "The loss function defines 'wrong'; the optimiser picks the nudges. Every trained model in this manual — logistic regression to XGBoost — is this loop wearing different clothes." }
  }
},

{
  q: "Your colleague trains a model and proudly reports 99% accuracy — measured on the same rows the model trained on. Why must some data be locked away BEFORE training, and the score taken there instead?",
  choices: ["Because scoring on training rows measures memory, not skill — only never-seen rows preview how the model will do on the future", "Because a model always overfits the last rows it reads, so a fresh block scored at the end corrects that recency bias in the number", "Because scoring the same rows twice double-counts them, inflating the effective sample size and making the accuracy look higher", "Because the held-out rows are needed to tune the weights a second time, sharpening the fit just before the final score is taken", "Because averaging one training score with one test score cancels the random noise in each and yields a far steadier estimate"],
  explain: "A flexible model can score near-perfectly on data it has seen — the way a student aces the exact past paper they revised from. The number you actually need is performance on cases that didn't shape the model, because that's what deployment is. Hence the iron ritual: split first, train on one part, report on the untouched part. The gap between the two scores is itself diagnostic — it measures how much of the 'skill' was memorisation.",
  simple: "Testing a student with the very questions they revised from proves they can remember, not that they understand. The model is that student, and the training set is its revision pack. So before any studying happens, you tear off a chunk of the data and lock it in a drawer. After training, THE DRAWER gives the honest grade. Watch the two grades diverge in the lab — the gap is the lie you'd have told yourself.",
  widget: {
    type: "curveStatic", title: "The revision pack vs the locked drawer",
    world: "The same model evaluated two ways as it grows more flexible: score on its own training rows vs score on the locked-away holdout. Watch the two stories separate.",
    xlab: "model flexibility →", xs: [0,1,2,3,4], labels: ["very simple","simple","moderate","flexible","memoriser"], dec: 0, yunit: "%",
    series: [
      { name: "score on locked-away data",  ys: [71, 81, 87, 84, 72] },
      { name: "score on its own training rows", ys: [73, 85, 93, 98, 100] }
    ],
    knob: { label: "Model flexibility", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Simple models: the two scores nearly agree — there isn't enough flexibility to memorise, so 'training score' hasn't learned to lie yet.", tone: "info" },
      { max: 3, text: "Flexible: training says 98%, the drawer says 84%. The 14-point gap is pure memorisation being mistaken for skill.", tone: "warn" },
      { max: 4, text: "🤯 The memoriser scores a perfect 100% on its revision pack — and 72% on reality, WORSE than the moderate model. Report the training score and you'd ship the worst model in the lineup, believing it the best.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The train/test split", formula: "split BEFORE training · fit on train · report on never-touched test",
      text: "train_test_split(X, y, test_size=0.2) is line one of every honest project. Cross-validation (Topic 10) is this ritual, rotated and averaged." }
  }
},

{
  q: "Two failure modes bracket every model: one is too simple to capture the pattern, the other so flexible it 'learns' the noise. What are these called, and where does the best model sit?",
  choices: ["Underfitting and overfitting — the best model sits between them, at the peak of performance on HELD-OUT data", "Underfitting and overfitting — the best model is the one with the smallest gap between its training and its test scores", "Bias and noise — the best model drives bias to zero and treats the leftover noise as a fixed cost it cannot ever touch", "Overfitting and underfitting — the best model is whichever scores the highest on the training set with the fewest errors", "Rigidity and flexibility — the best model is always as flexible as the data budget and the hardware will let you make it"],
  explain: "Underfitting: the model can't even fit the training data (a straight line through a curve) — both training and test scores are poor. Overfitting: the model contorts around every training point, noise included — training score excellent, test score sliding. Between them sits the sweet spot, and it is only visible on held-out data: the training score just keeps rising with flexibility, straight past the point where reality starts getting worse.",
  simple: "Fitting a suit: too small and it pinches everywhere (underfit — wrong for everyone, including the training customer). Tailored to every wrinkle of one person on one day, and it fits nobody else — not even them, tomorrow (overfit). The right suit follows the SHAPE without chasing the wrinkles. And here's the trap: the tailor's own mirror (training score) says the wrinkle-chasing suit is the best fit ever made. Only a second opinion (held-out data) tells the truth.",
  widget: {
    type: "curveStatic", title: "Pinching, fitting, wrinkle-chasing",
    world: "One model family swept from rigid to hyper-flexible. Training score and held-out score tell different stories — find where they part company.",
    xlab: "flexibility (e.g. tree depth) →", xs: [0,1,2,3,4,5], labels: ["1","2","4","8","16","unlimited"], dec: 0, yunit: "%",
    series: [
      { name: "held-out score", ys: [63, 74, 85, 88, 83, 76] },
      { name: "training score", ys: [65, 77, 89, 96, 99, 100] }
    ],
    knob: { label: "Flexibility", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Left side: BOTH scores poor. The model is too rigid to capture the real pattern — underfitting fails even on data it has seen.", tone: "info" },
      { max: 3, text: "Depth 8: held-out peaks at 88%. The training score offers no hint that this is the top — it just keeps climbing.", tone: "info" },
      { max: 5, text: "🤯 Unlimited flexibility: training 100%, held-out down 12 points. Past the sweet spot, added flexibility is spent memorising noise — improving the illusion while worsening the reality. This single picture recurs in EVERY topic of this manual: k in kNN, depth in trees, C in SVMs, rounds in boosting.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Underfitting vs overfitting", formula: "too rigid: both scores poor · too flexible: train ↑ while held-out ↓",
      text: "The most important curve in machine learning. Complexity knobs move you along it; validation data tells you where you are on it." }
  }
},

{
  q: "In a decision tree, max_depth is set by YOU before training, while the split questions are found DURING training. What is this distinction called, and why does it matter for your workflow?",
  choices: ["Hyperparameters (your settings) vs parameters (learned values) — you tune the first via validation experiments; training handles the second", "Priors vs posteriors — you assert the first from prior belief, and training then updates them into the second using the data's evidence", "Structural vs numeric settings — the first fixes the model's overall shape and the second its numbers, but training is free to adjust either one", "Coarse vs fine controls — you pick the first by intuition, then let training grid-search the second across the validation folds", "Global vs local values — you set the first once for the whole model, while training re-derives the second at every single split"],
  explain: "Parameters are what training adjusts: weights, thresholds, centroids — filled in automatically by the fitting loop. Hyperparameters shape HOW that fitting happens: depth limits, k, C, learning rate. Training cannot choose them (deeper always fits training data better, so training would always choose 'unlimited'). So the workflow splits: an outer loop where you try hyperparameter settings and compare on validation data, and an inner loop where fit() learns parameters.",
  simple: "Baking bread: the recipe's settings — oven temperature, baking time — are yours to choose before you start (hyperparameters). What the dough actually does inside — the crumb, the rise — is determined by the process (parameters). You can't ask the dough to pick the oven temperature; and if you asked the training score, it would always say 'hotter, longer, more' — because more flexibility always flatters the training data. So YOU run bake-offs (validation experiments) to pick settings, and the oven does the rest.",
  widget: {
    type: "curveStatic", title: "You set the dial, training fills the details",
    world: "One hyperparameter (max_depth) swept by hand. For each setting, training automatically learns hundreds of parameters (the splits) — and validation data judges each finished bake.",
    xlab: "max_depth (yours to set) →", xs: [0,1,2,3,4], labels: ["1","2","4","8","16"], dec: 0, yunit: "",
    series: [
      { name: "validation accuracy (%)",        ys: [70, 80, 88, 86, 80] },
      { name: "parameters learned (splits)",    ys: [1, 3, 15, 90, 400] }
    ],
    knob: { label: "max_depth", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Depth 1: you allowed one question; training found the best ONE split it could. Your dial capped the model; training filled in the detail.", tone: "info" },
      { max: 2, text: "Depth 4: training now learns 15 splits — every threshold chosen by the fitting loop, none by you. Validation says this is the best bake so far.", tone: "info" },
      { max: 4, text: "🤯 Depth 16: training happily learns 400 splits (it never says no to flexibility) — but validation says worse. That's WHY hyperparameters must be chosen by you + validation, never by the training process: training always votes for 'more'.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Hyperparameters vs parameters", formula: "hyperparameters: set before fit(), tuned on validation · parameters: learned by fit()",
      text: "sklearn mirrors it exactly: hyperparameters go in the constructor — DecisionTreeClassifier(max_depth=4) — parameters appear on the fitted object. GridSearchCV automates the outer loop." }
  }
},

{
  q: "A lookup-table 'model' answers new cases by finding an identical past case and copying its answer. It scores 100% on training data. Why does it collapse in the real world, and what must a real model do instead?",
  choices: ["New cases are almost never identical to old ones — a model must GENERALISE: capture the pattern so it can answer cases it never saw", "Lookup tables can never store enough rows — a model must COMPRESS: shrink the table until every past case still fits inside memory", "New cases arrive far too quickly to search — a model must INDEX: pre-sort the examples so the matching answer is found instantly", "Old answers steadily go stale over time — a model must REFRESH: retrain on the newest rows so its copied answers stay current", "Exact matches are almost always wrong — a model must AVERAGE: blend the answers of the ten closest past cases into one smoothed prediction"],
  explain: "The space of possible inputs is astronomically larger than any training set — a new customer matches no old row exactly. The lookup table has no answer (or copies a wrong near-miss). Generalisation means extracting the RULE that connects features to labels, so the model interpolates gracefully between its examples. Every technique in this manual — regularisation, pruning, validation — exists to push models away from memorising and toward generalising.",
  simple: "A student who memorised every past paper answers perfectly — IF the exam repeats a past question word for word. Real exams never do. The student who learned the METHOD can solve questions nobody has ever asked. Machine learning's whole difficulty is that memorising is easy and scores perfectly in rehearsal, while the only thing that matters — handling the genuinely new — requires learning the method. Watch both students face increasingly novel exams.",
  widget: {
    type: "curveStatic", title: "Past-paper memoriser vs method-learner",
    world: "Two 'models' scored on exams containing progressively fewer questions seen during revision. One memorised answers; one learned the method.",
    xlab: "share of exam questions seen in revision →", xs: [0,1,2,3,4], labels: ["100%","50%","20%","5%","0%"], dec: 0, yunit: "%",
    series: [
      { name: "method-learner (generalises)", ys: [92, 90, 89, 88, 88] },
      { name: "memoriser (lookup table)",     ys: [100, 74, 58, 51, 49] }
    ],
    knob: { label: "Exam novelty", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Exam = the revision pack: the memoriser's perfect 100% beats the method-learner. On seen data, memorisation always looks superior.", tone: "warn" },
      { max: 2, text: "At 20% repeats the memoriser is down 42 points — every unseen question is a coin flip for it. The method-learner barely notices the novelty.", tone: "info" },
      { max: 4, text: "🤯 Fully novel exam — which is what deployment IS — the memoriser scores 49%: literally a coin flip. The method-learner holds 88%. Generalisation isn't one desirable property among many; it is the product.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Generalisation", formula: "value of a model = performance on inputs it has never seen",
      text: "Deployment data is, by definition, new. Everything in this manual — validation, regularisation, pruning, ensembles — is machinery for buying generalisation." }
  }
},

{
  q: "A dataset records age (18–70) and salary (£15,000–£150,000). Many algorithms compare examples by DISTANCE or combine features into weighted sums. What silently goes wrong with raw units, and what's the standard fix?",
  choices: ["Salary's huge numeric range drowns age in every calculation — standardise features onto comparable scales before fitting", "Age's tiny numeric range rounds down to nothing in every calculation — multiply the small features up until they match salary", "Salary and age are correlated, so one of them is redundant — drop whichever feature carries the least variance before fitting", "Mixed units confuse the optimiser's gradients — convert every column into one shared physical unit, such as pounds, before fitting", "Large values overflow the distance formula's arithmetic — cap salary at a ceiling so no single number can dominate the sum"],
  explain: "A 30-year age gap contributes 30² to a squared distance; a £30,000 salary gap contributes 30,000² — a million times more. Any distance-based method (kNN, k-means, DBSCAN, SVM) and any penalised weighted-sum method (regularised regression) effectively ignores the small-unit feature. StandardScaler (subtract mean, divide by standard deviation) puts every feature on the same footing. It's the most common silent bug in beginner pipelines.",
  simple: "Two people shout their differences at the algorithm: age whispers 'we differ by 30!' while salary roars 'WE DIFFER BY 30,000!'. The algorithm — which only hears numbers, not meanings — concludes salary is basically all that matters. Nobody chose that; the UNITS chose it. Scaling gives each feature the same voice, so the data (not the currency) decides what similarity means. This one bug will stalk half the topics in this manual — meet it properly now.",
  widget: {
    type: "scaleFeature", title: "The units pick the winner",
    world: "One target person and four candidates. Who counts as 'most similar'? Shrink salary's units step by step — same people, same facts — and watch the verdict flip.",
    aName: "age", bName: "salary",
    target: { name: "person X", a: 30, b: 40000 },
    cands: [
      { name: "match A · 31y, £41k", a: 31, b: 41000 },
      { name: "match B · 65y, £40.4k", a: 65, b: 40400 },
      { name: "match C · 27y, £46k", a: 27, b: 46000 },
      { name: "match D · 34y, £54k", a: 34, b: 54000 }
    ],
    knob: { label: "Shrink salary units by", min: 0, max: 4, step: 0.25, init: 0 },
    insights: [
      { max: 0.5, text: "Raw units: the 65-year-old is 'most similar' to our 30-year-old — a £600 salary gap outweighs a 35-year age gap. The units decided, not the data.", tone: "warn" },
      { max: 2.5, text: "As salary's roar fades, age finally gets a hearing — the similarity ranking reshuffles with every step, though not one fact about the people changed.", tone: "info" },
      { max: 4, text: "🤯 On balanced scales, the 31-year-old on £41k wins — the genuinely similar person. Every distance, cluster, and regularised weight downstream inherits this choice. Scale first; it's one line: StandardScaler().", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Feature scaling (standardisation)", formula: "z = (x − mean) / std — every feature gets mean 0, spread 1",
      text: "Needed by anything distance-based or penalty-based (kNN, k-means, DBSCAN, SVM, regularised regression, PCA). Tree-based models are the notable exception — splits don't care about units." }
  }
},

{
  q: "A fraud model scores 97.8% accuracy and the team celebrates — until someone computes the dumbest possible rule. On data where 2% of transactions are fraud, what does 'always predict NOT fraud' score, and what's the lesson?",
  choices: ["98% — beating the celebrated model. Every result must be compared against the best 'dumb' baseline before it means anything", "2% — matching the fraud rate. A rule this blunt can only ever score as high as the share of the rare class it manages to ignore", "98% — but it merely ties the real model, which proves accuracy is a fair yardstick here so long as a baseline is reported too", "96% — falling just short. A do-nothing rule always lands a couple of points below any model that has genuinely learned something", "100% — because it never once raises a false alarm on the legitimate transactions that make up the overwhelming majority here"],
  explain: "With 98 legitimate transactions per 100, 'always say no' is right 98 times: 98% accuracy, zero intelligence, zero fraud caught. The 97.8% model is literally worse than doing nothing. Baselines calibrate every metric: majority-class for classification, predict-the-mean (or last value) for regression. sklearn ships DummyClassifier precisely so this comparison is one line. A number without a baseline is decoration.",
  simple: "A weather forecaster in the desert who says 'no rain' every single day is right 98% of the time — and knows nothing about weather. Impressive-sounding scores can be pure background: the shape of the data doing all the work. So the first model on any project should be the dumbest one — majority vote, the average, yesterday's value. It costs nothing, and every real model must beat it to deserve existence. The lab shows how 'impressive' collapses once the baseline enters the room.",
  widget: {
    type: "curveStatic", title: "First, hire the dummy",
    world: "Five 'models' on the 2%-fraud dataset — accuracy next to what actually matters (fraud caught). Note who beats the do-nothing baseline, and on which metric.",
    xlab: "model →", xs: [0,1,2,3,4], labels: ["always 'no'","random 50/50","celebrated 97.8%","tuned model","tuned + threshold"], dec: 0, yunit: "%",
    series: [
      { name: "accuracy",     ys: [98, 50, 97.8, 98.4, 97.9] },
      { name: "fraud caught", ys: [0, 50, 21, 62, 88] }
    ],
    knob: { label: "Model", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "The dummy: 98% accuracy, 0% of fraud caught. Remember this bar — it's what 'no intelligence whatsoever' scores here.", tone: "info" },
      { max: 2, text: "The celebrated model: BELOW the dummy on accuracy, and catching one fraud in five. Without the baseline in the room, nobody would have known.", tone: "warn" },
      { max: 4, text: "🤯 The tuned model with a chosen threshold: accuracy looks 'worse' than the dummy (97.9 vs 98) yet catches 88% of fraud — because accuracy was the wrong yardstick all along on imbalanced data. Baselines expose both bad models AND bad metrics.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Baselines", formula: "model value = score − best dumb rule's score",
      text: "DummyClassifier / DummyRegressor in sklearn. On imbalanced problems, pair the baseline with the right metric (precision/recall — Topic 09), or the comparison still lies." }
  }
},

{
  q: "Statisticians decompose a model's error into two dueling sources. One comes from being systematically too simple; the other from swinging wildly with whichever training sample you happened to draw. Name them — and the trade they force.",
  choices: ["Bias (rigidity: wrong on average) and variance (instability: different every retrain) — reducing one usually inflates the other", "Bias (a skewed sample) and variance (a noisy target) — gathering more data shrinks both of them at once, with no trade to manage", "Systematic error and random error — the first comes from bad labels and the second from too few rows, and cleaning lowers both", "Bias (underfitting) and variance (overfitting) — the two are fully independent, so each can be driven to zero without touching the other", "Offset and spread — the first shifts every prediction equally and the second widens them, and a good model removes the offset first"],
  explain: "Bias: the model's average prediction (across retrains on fresh samples) misses the truth — a straight line fit to a curve is wrong on average, however much data you give it. Variance: individual retrains scatter widely around that average — deep trees redraw themselves for every sample. Total error ≈ bias² + variance + irreducible noise. Flexibility spends bias to buy variance; the sweet spot minimises the sum. This one trade explains regularisation, pruning, k, C — and why forests (averaging kills variance) and boosting (sequential fitting kills bias) exist.",
  simple: "Two archers: one has a bent sight — every arrow lands left of the bullseye, in a tight, consistent group (bias: reliably wrong). The other has perfect aim but shaky hands — arrows scatter all around the bullseye, rarely in it (variance: inconsistently right). Model flexibility moves you from archer one toward archer two: rigid models are steady-but-off, flexible models are centred-but-scattered. You can rarely fix both at once — but you can find the flexibility where the COMBINED miss is smallest. That search is half of applied machine learning.",
  widget: {
    type: "curveStatic", title: "The bent sight and the shaky hand",
    world: "Error decomposed across a flexibility sweep: the bias part falls, the variance part rises, and their sum — the error you actually suffer — makes a U.",
    xlab: "model flexibility →", xs: [0,1,2,3,4], labels: ["rigid","simple","moderate","flexible","wild"], dec: 0, yunit: "",
    series: [
      { name: "total error",          ys: [32, 22, 16, 21, 35] },
      { name: "error from bias",      ys: [30, 18, 8, 3, 1] },
      { name: "error from variance",  ys: [2, 4, 8, 18, 34] }
    ],
    knob: { label: "Flexibility", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Rigid: almost all the error is bias — the bent sight. More data won't help; the model CAN'T represent the truth.", tone: "info" },
      { max: 2, text: "Moderate: bias and variance meet at 8 apiece, and their sum bottoms out at 16. This is the sweet spot the validation curve has been showing you all along.", tone: "info" },
      { max: 4, text: "🤯 Wild flexibility: bias nearly zero, variance 34 — the shaky hand dominates. And now you know WHY ensembles work: forests average away variance (steady the hand), boosting stacks corrections to remove bias (straighten the sight).", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The bias–variance trade-off", formula: "expected error ≈ bias² + variance + irreducible noise",
      text: "The theory under every complexity knob in this manual. Diagnosis: high bias → both scores poor (add flexibility/features); high variance → big train-test gap (regularise, simplify, or ensemble)." }
  }
},

{
  q: "A model says '75% probability of churn'. Your product manager asks: 'so what are the odds?'. These two languages for uncertainty appear all over ML — how do they interconvert?",
  choices: ["odds = p/(1−p): 75% ⇔ 3:1 — three churns per one stay; the same belief in ratio form", "odds = p/(1+p): 75% gives 0.43 — a bit under one churn per two stays; the ratio read backwards", "odds = 2p - 1: 75% gives 0.5 — the split tipped halfway from an even balance toward certain churn", "odds = 1/p: 75% gives 1.33 — the customers you must watch to expect a single churn among them", "odds = p/100: 75% gives 0.75 — the same figure probability already reported, wearing a new label"],
  explain: "Probability slices a whole into parts (75 of 100 churn). Odds compare the parts to each other (75 churn : 25 stay = 3:1). Conversions: odds = p/(1−p), p = odds/(1+odds). Odds are the native language of logistic regression (whose weights multiply odds) and naive Bayes (whose evidence multiplies odds); probability is the language of thresholds and reports. Fluency in both — and the conversion — pays off in Topics 02, 03 and 09.",
  simple: "Same belief, two grammars. Probability talks about the whole pie: '75% of these customers churn'. Odds talk about the ratio between the slices: 'three churners for every stayer — 3:1'. Tiny probabilities make the difference vivid: 1% probability is 1:99 odds — one yes against ninety-nine nos. Models like logistic regression and naive Bayes do their arithmetic in odds (because evidence MULTIPLIES odds cleanly), then translate back to probability for humans. Learn the exchange rate once; two entire topics get easier.",
  widget: {
    type: "curveStatic", title: "Two grammars, one belief",
    world: "The probability-to-odds exchange rate, point by point. Slide the probability and read the equivalent odds — notice how the ratio explodes near the top.",
    xlab: "probability →", xs: [0,1,2,3,4,5], labels: ["1%","10%","25%","50%","75%","90%"], dec: 2, yunit: "",
    series: [
      { name: "odds (yeses per one no)", ys: [0.01, 0.11, 0.33, 1, 3, 9] }
    ],
    knob: { label: "Probability", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "1% probability = odds 0.01 (i.e. 1:99). 10% = 1:9. At the low end, odds and probability nearly coincide — one reason rare-event models often report odds.", tone: "info" },
      { max: 3, text: "50% is the fixed landmark: odds exactly 1 (1:1, a fair coin). Below it odds are fractions; above it they're multiples.", tone: "info" },
      { max: 5, text: "🤯 75% → 3:1, but 90% → 9:1: the same 15-point probability step tripled the odds. The two scales stretch differently — which is exactly why logistic regression works in LOG-odds, where steps become even. You've just previewed Topic 02's central idea.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Probability ↔ odds", formula: "odds = p/(1−p) · p = odds/(1+odds)",
      text: "Odds are ML's working currency (logistic regression's e^w multipliers, naive Bayes' likelihood ratios); probability is the reporting currency. The conversion is one division." }
  }
}
];
