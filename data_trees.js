/* Decision Trees — Part I: Foundations. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).trees1 = [

{
  q: "A decision tree classifies a customer. What is the model actually made of?",
  choices: ["A chain of yes/no questions ending in a verdict", "A weighted sum of the features", "A table of stored examples", "A probability multiplier per feature", "A straight boundary line"],
  explain: "A tree is questions all the way down: 'age < 30?' → 'income < 40k?' → verdict. Each answer routes you down a branch until you hit a leaf holding the prediction.",
  simple: "It's a flowchart, the same kind you'd draw on a whiteboard: ask a question, follow the arrow, ask the next, land on an answer. Training's only job is choosing WHICH questions to ask and WHERE to draw the lines.",
  widget: {
    type: "treeSplit", title: "One question, made of a slider",
    world: "Customers by age: bought (orange) or browsed (blue). The dashed line is a single yes/no question. Slide the question around and read the verdicts it produces.",
    classes: ["Browsed", "Bought"], feat: "age",
    items: [{x:1,c:0},{x:1.8,c:0},{x:2.6,c:0},{x:3.2,c:0},{x:4,c:0},{x:4.8,c:1},{x:5.4,c:0},{x:6.2,c:1},{x:7,c:1},{x:7.8,c:1},{x:8.6,c:1},{x:9.4,c:1}],
    knob: { label: "The question: age < ?", min: 0.5, max: 10, step: 0.25, init: 2 },
    insights: [
      { max: 3, text: "The question splits everyone into two rooms; each room predicts its own majority. That pair of rooms IS the model.", tone: "info" },
      { max: 7, text: "Around the middle the split separates the colours well — the accuracy readout agrees. Good trees are built from good questions.", tone: "info" },
      { max: 10, text: "🤯 Pushed to the end, one room is empty and the question is useless — everyone gets the same verdict. A question is only as good as the split it makes.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The decision tree", formula: "root question → branch → … → leaf = predicted class",
      text: "Everything a tree does reduces to sliding questions like this one until each group is as pure as possible — then asking more questions inside each group." }
  }
},

{
  q: "Training must choose WHERE to place each question's cutoff. What makes one cutoff better than another?",
  choices: ["It leaves the two sides purer — more single-class", "It puts the same number on each side", "It sits at the middle of the range", "It uses the feature's average", "It creates the deepest tree"],
  explain: "Splits are scored by impurity (Gini or entropy): how mixed each side is. Training tries every candidate cutoff and keeps the one whose two sides are, on weighted average, purest.",
  simple: "Imagine sorting laundry with one divider: the best divider position leaves whites on one side and colours on the other, as unmixed as possible. Trees try every divider position and keep the cleanest separation — the 'impurity' number is just mixed-ness.",
  widget: {
    type: "treeSplit", title: "Hunting the cleanest cut",
    world: "Loan applicants by income: repaid vs defaulted. Slide the cutoff and watch the impurity number — your job is to make it as LOW as possible.",
    classes: ["Defaulted", "Repaid"], feat: "income",
    items: [{x:0.8,c:0},{x:1.6,c:0},{x:2.4,c:0},{x:3,c:0},{x:3.8,c:0},{x:4.4,c:1},{x:5.2,c:0},{x:5.8,c:1},{x:6.6,c:1},{x:7.4,c:1},{x:8.2,c:1},{x:9,c:1}],
    knob: { label: "Cutoff: income < ?", min: 0.5, max: 10, step: 0.25, init: 1.2 },
    insights: [
      { max: 2, text: "A lazy cutoff: one side pure but tiny, the other still thoroughly mixed. Impurity stays high.", tone: "warn" },
      { max: 6.5, text: "Somewhere in the middle the impurity bottoms out — both rooms nearly single-colour. THAT position is what training would pick, automatically.", tone: "info" },
      { max: 10, text: "🤯 You just did, by hand, exactly what tree training does by brute force: try every cutoff on every feature, keep the purity winner, repeat inside each room.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Impurity (Gini / entropy)", formula: "Gini = 2p(1−p) per side, weighted by size — pick the split that minimises it",
      text: "'Best question' has a number: the split that leaves children purest. Greedy, simple, and repeated recursively — that's CART." }
  }
},

{
  q: "A trained tree routes a new customer down its branches to a leaf. What does the leaf actually contain?",
  choices: ["The majority class of the training points that landed there", "A weighted formula for final scoring", "A pointer back to the root", "The single nearest training point", "A freshly computed split"],
  explain: "Each leaf remembers which training points fell into it during training; its prediction is simply their majority class (or their class proportions, if you want probabilities).",
  simple: "Every leaf is a little room, and during training some examples ended up in each room. The room's verdict is whatever most of its occupants were. New arrivals routed to that room inherit the verdict.",
  widget: {
    type: "treeSplit", title: "Rooms and their verdicts",
    world: "One split creates two leaf rooms. Read each room's occupants and its verdict in the box below — including how CONFIDENT each room is (4/5 vs 7/7).",
    classes: ["Cancelled", "Renewed"], feat: "months subscribed",
    items: [{x:0.6,c:0},{x:1.4,c:0},{x:2.2,c:0},{x:2.8,c:1},{x:3.6,c:0},{x:4.6,c:1},{x:5.4,c:1},{x:6.2,c:1},{x:7,c:1},{x:7.8,c:1},{x:8.8,c:1},{x:9.6,c:1}],
    knob: { label: "Split: months < ?", min: 0.5, max: 10, step: 0.25, init: 4 },
    insights: [
      { max: 3, text: "Left room: mostly cancellations → it predicts 'cancelled' for anyone routed here. The count (e.g. 4/5) doubles as a confidence.", tone: "info" },
      { max: 7, text: "Rooms with mixed occupants give shaky verdicts — 5/8 is barely a majority. Further questions inside that room would purify it.", tone: "info" },
      { max: 10, text: "🤯 The leaf proportions ARE the tree's probabilities: an 11/12 room says 92%. Trees give you confidence for free, straight from the occupants.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Leaves = majority verdicts", formula: "leaf prediction = mode of its training points · P(class) = leaf proportion",
      text: "The tree's knowledge lives in its leaves. Route down, read the room. (KNN asks neighbours at query time; a tree pre-sorts them into rooms at training time.)" }
  }
},

{
  q: "You let a tree grow deeper and deeper with no limit. What happens on the training data?",
  choices: ["It fits it perfectly — one pure leaf per stray point", "Accuracy plateaus at the class ratio", "The tree refuses to grow past depth 10", "Training accuracy falls", "Leaves start merging"],
  explain: "An unlimited tree can keep asking questions until every leaf is pure — including private leaves around noise. 100% training accuracy, purchased by memorisation.",
  simple: "Given enough questions, you can isolate ANY single point: 'age exactly 37.2 AND income exactly £41,301?' A deep enough tree does exactly that for every stray point — perfect on what it saw, brittle on everything else.",
  widget: {
    type: "treeDepth", title: "Watch it memorise",
    world: "A real tiny tree trained live on this map (two noisy points included). Raise the depth limit and watch the map — and the training fit — chase every last point.",
    classes: ["Type A", "Type B"], xlab: "sensor 1", ylab: "sensor 2",
    points: [{x:1.5,y:2,c:0},{x:2.5,y:3.5,c:0},{x:1.2,y:5,c:0},{x:3,y:6,c:0},{x:2,y:7.5,c:0},{x:4,y:1.5,c:0},{x:3.4,y:4.4,c:0},{x:7,y:2.5,c:1},{x:8.5,y:3.5,c:1},{x:6.5,y:4.5,c:1},{x:8,y:6,c:1},{x:9,y:7.5,c:1},{x:5.5,y:5.5,c:1},{x:6.2,y:8,c:1},{x:2.8,y:8.6,c:1},{x:7.6,y:1,c:0}],
    knob: { label: "Maximum depth", min: 1, max: 6, step: 1, init: 1 },
    insights: [
      { max: 1, text: "Depth 1: a single question, two big rooms. Honest, blunt, misses the two stray points — probably correctly.", tone: "info" },
      { max: 3, text: "Depth 2–3: the map captures the real structure. This is usually the sweet spot for data like this.", tone: "info" },
      { max: 6, text: "🤯 Full depth: 100% training fit, and look at the map — little private boxes carved around single noisy points. That box IS overfitting, drawn in ink.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Unlimited depth = memorisation", formula: "deep enough trees always reach 100% training accuracy",
      text: "Like k=1 in KNN, an unbounded tree can memorise anything — so its training score means nothing. Depth is the tree's complexity dial." }
  }
},

{
  q: "You sweep the tree's maximum depth and score each version on training AND validation data. What do you expect to see?",
  choices: ["Training climbs to 100%; validation peaks early then falls", "Both climb together forever", "Both fall as depth grows", "Validation climbs while training falls", "Two flat lines"],
  explain: "More depth always fits the training data better. Validation improves only while the extra questions capture real structure — then falls as the tree starts memorising noise.",
  simple: "It's the same U-shaped story as KNN's k, mirrored: deeper = more flexible. The training curve loves flexibility endlessly; the honest curve loves it up to a point and then quietly starts paying for it.",
  widget: {
    type: "curveStatic", title: "Depth's two report cards",
    world: "One tree, seven depth limits, two scores. Find the depth you'd actually ship — and notice which curve you had to ignore to pick it.",
    xlab: "maximum depth", xs: [1,2,3,4,5,6,7], dec: 0, yunit: "%",
    series: [
      { name: "training score", ys: [72,84,91,95,98,99,100] },
      { name: "validation score", ys: [70,81,87,86,82,78,75] }
    ],
    knob: { label: "Maximum depth", min: 0, max: 6, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Shallow: both scores rise together — every question added is capturing something real.", tone: "info" },
      { max: 3, text: "Depth 3: validation peaks at 87% while training keeps climbing. The curves have started disagreeing — trust the honest one.", tone: "info" },
      { max: 6, text: "🤯 Depth 7: training 100%, validation 75%. Every point of training 'improvement' after depth 3 was memorised noise, paid for with real performance.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Depth tuning (pre-pruning)", formula: "cap max_depth / min_samples_leaf — pick by validation, never by training",
      text: "Controlling growth is called pruning. The tuning ritual is identical to KNN's k and logistic regression's C: sweep, validate, pick the honest peak." }
  }
},

{
  q: "You forgot to standardise the features before training your tree — incomes in pounds, ages in years. How bad is it?",
  choices: ["Harmless — splits like 'income < 40,000?' don't care about scale", "Fatal — the tree can't compare features", "The big-unit feature dominates every split", "The tree trains slower but predicts fine", "Only the root split is affected"],
  explain: "A tree never mixes features into one distance — it asks about one feature at a time, and 'income < 40000' works identically whether income is in pounds or thousands. Scaling is a non-event for trees.",
  simple: "KNN adds features together into a distance, so units matter enormously. A tree only ever asks one-feature questions — 'is income under 40 grand?' — and that question means the same thing in any units. Trees simply don't care.",
  widget: {
    type: "treeSplit", title: "The question that ignores units",
    world: "Salaries in RAW POUNDS (huge numbers, shown in £k here). Slide the cutoff: the split's quality depends only on WHERE it falls relative to the points — never on the units.",
    classes: ["Declined", "Approved"], feat: "salary (£0,000s)",
    items: [{x:1,c:0},{x:1.8,c:0},{x:2.6,c:0},{x:3.4,c:0},{x:4.2,c:0},{x:5,c:1},{x:5.8,c:0},{x:6.6,c:1},{x:7.4,c:1},{x:8.2,c:1},{x:9,c:1},{x:9.8,c:1}],
    knob: { label: "Cutoff: salary < ?", min: 0.5, max: 10, step: 0.25, init: 5.5 },
    insights: [
      { max: 5, text: "Multiply every salary by 1,000 in your head — the picture is identical, just relabelled. The same cutoff (relabelled too) makes the same split.", tone: "info" },
      { max: 8, text: "Impurity depends on which POINTS land on each side — a rank-based fact, immune to units, logs, or currency conversions.", tone: "info" },
      { max: 10, text: "🤯 This is why tree models are the forgiving choice for messy tabular data: no scaling, no encoding agonies for ordered values, monotone transforms change nothing.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Scale invariance of trees", formula: "splits use one feature at a time → monotone rescaling never changes the tree",
      text: "A genuine practical advantage over KNN, SVM and logistic regression, which all mix features and therefore all need scaling." }
  }
},

{
  q: "The true boundary between two classes is a smooth diagonal line. What does a decision tree's boundary look like there?",
  choices: ["A staircase of horizontal and vertical steps", "A perfectly smooth diagonal", "A single curve through the middle", "A circle around one class", "No boundary — trees can't try"],
  explain: "Each split is a question about ONE feature, so every boundary piece is either horizontal or vertical. Diagonals get approximated by axis-aligned stair-steps — more depth, finer stairs.",
  simple: "Tree questions are always 'left/right of this value?' or 'above/below that value?' — never 'which side of this slanted line?'. So a slanted truth gets rebuilt out of little right-angled steps, like drawing a ramp in Minecraft.",
  widget: {
    type: "treeDepth", title: "Drawing a ramp out of boxes",
    world: "The two classes are separated by a clean diagonal. Watch the tree approximate it: raise the depth and count the stair-steps.",
    classes: ["Below the line", "Above the line"], xlab: "feature 1", ylab: "feature 2",
    points: [{x:1,y:2.2,c:0},{x:2,y:1,c:0},{x:3,y:2,c:0},{x:4,y:3,c:0},{x:5,y:4,c:0},{x:6,y:5,c:0},{x:7,y:6,c:0},{x:8,y:7,c:0},{x:1.6,y:3.4,c:1},{x:2.6,y:4.4,c:1},{x:3.6,y:5.4,c:1},{x:4.6,y:6.4,c:1},{x:5.6,y:7.4,c:1},{x:6.6,y:8.4,c:1},{x:7.6,y:9.2,c:1},{x:8.8,y:8.2,c:0}],
    knob: { label: "Maximum depth", min: 1, max: 6, step: 1, init: 1 },
    insights: [
      { max: 1, text: "Depth 1: one giant step. The diagonal truth is approximated by a single right angle.", tone: "info" },
      { max: 3, text: "More depth, more steps — the staircase hugs the diagonal more closely, but every edge stays horizontal or vertical.", tone: "info" },
      { max: 6, text: "🤯 Even at full depth: stairs, never a slope. For diagonal truths, a rotated feature (like x−y) or a different model wins — every model has shapes it draws badly.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Axis-aligned boundaries", formula: "each split tests one feature → boundaries are unions of rectangles",
      text: "Trees excel at box-shaped truths and struggle with slanted ones. Compare: logistic regression draws one perfect diagonal but can't do boxes." }
  }
},

{
  q: "A regulator asks WHY the model rejected application #4172. What can a decision tree offer that most models can't?",
  choices: ["The exact path of questions that led to the verdict", "A confidence interval on the weights", "The gradient of the loss", "The nearest training example", "A saliency heat-map"],
  explain: "Follow the application down the tree: 'income < 30k? yes → missed payments ≥ 2? yes → REJECT'. The path IS the explanation, readable by a non-technical audience verbatim.",
  simple: "A tree's answer comes with its reasoning attached: the exact questions asked and the answers given. You can read the rejection out loud as a sentence, which is why banks and hospitals like trees.",
  widget: {
    type: "treeSplit", title: "The reason, out loud",
    world: "One question of a loan tree. Set the cutoff and READ the model: 'if income below the line → decline'. That sentence is the audit trail.",
    classes: ["Decline", "Approve"], feat: "income (£0,000s)",
    items: [{x:0.8,c:0},{x:1.6,c:0},{x:2.4,c:0},{x:3.2,c:0},{x:4,c:1},{x:4.8,c:0},{x:5.6,c:1},{x:6.4,c:1},{x:7.2,c:1},{x:8,c:1},{x:9,c:1},{x:9.8,c:1}],
    knob: { label: "Cutoff: income < ?", min: 0.5, max: 10, step: 0.25, init: 4.4 },
    insights: [
      { max: 4, text: "The readout below is already a policy sentence: 'below this income, decline (4/5 of history agrees)'. No translation needed.", tone: "info" },
      { max: 7, text: "A full tree is a handful of these sentences chained. Each rejection quotes its exact path — question, answer, question, answer, verdict.", tone: "info" },
      { max: 10, text: "🤯 Contrast a 5,000-weight model: accurate, but its 'reason' is a vector. When explanations are legally required, tree-shaped models keep entire industries compliant.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Interpretability by path", formula: "explanation = the sequence of satisfied conditions root → leaf",
      text: "Trees trade some accuracy for total transparency. Where decisions must be justified to humans, that trade often wins." }
  }
},

{
  q: "You retrain a tree after removing just three rows of training data — and get a visibly different tree. What is this property called?",
  choices: ["High variance — trees are unstable to small data changes", "High bias — trees are too rigid", "Regularisation failure", "Label leakage", "Feature drift"],
  explain: "Greedy splitting means one early borderline decision cascades: change a few rows, the best root split flips, and everything below rebuilds differently. Individual trees are high-variance models.",
  simple: "The first question a tree asks determines every later question. Nudge the data slightly and a DIFFERENT first question wins — and the whole flowchart reshuffles. Same forest of facts, wildly different tree.",
  widget: {
    type: "foldPick", title: "Five nearly-identical datasets, five trees",
    world: "The same data, five times, each with three random rows removed. Each bar is the retrained tree's validation score; the labels show what its ROOT question became. Flick through.",
    blurb: "Same task — three rows removed at random each time:",
    folds: [
      { name: "root: income<38k", acc: 84 },
      { name: "root: age<29", acc: 78 },
      { name: "root: income<41k", acc: 86 },
      { name: "root: debts≥2", acc: 74 },
      { name: "root: income<38k", acc: 83 }
    ],
    knob: { label: "Which resample", min: 1, max: 6, step: 1, init: 1 },
    insights: [
      { max: 3, text: "Three rows moved, and the ROOT QUESTION itself changes — sometimes to a different feature entirely. Everything downstream reshuffles with it.", tone: "warn" },
      { max: 5, text: "Scores wobble by 12 points across trivially different datasets. This wobble is the textbook signature of a high-variance model.", tone: "warn" },
      { max: 6, text: "🤯 The average is steadier than any single tree — and that observation is worth a fortune: it's the idea behind random forests, next question.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Tree instability (high variance)", formula: "greedy splits → small data changes can rebuild the whole tree",
      text: "A single tree is interpretable but jumpy. Tame the variance with depth limits — or by averaging many trees, which is where forests come in." }
  }
},

{
  q: "Random forests train many trees on random resamples and average their votes. What problem of single trees does this directly attack?",
  choices: ["Their instability — averaging many jumpy trees cancels the wobble", "Their inability to fit training data", "Their need for feature scaling", "Their slow prediction speed", "Their axis-aligned splits"],
  explain: "Each tree overfits differently; their errors are partly independent, so voting averages the noise away while keeping the signal. Variance drops, accuracy stabilises.",
  simple: "One jumpy expert is unreliable; a hundred jumpy experts who err in DIFFERENT ways make a steady committee. The forest keeps each tree wild on purpose and lets the averaging do the calming.",
  widget: {
    type: "curveStatic", title: "The committee effect",
    world: "Validation accuracy as trees join the committee. One deep, overfit tree scores 78% alone. Slide the forest size upward.",
    xlab: "trees in the forest", xs: [0,1,2,3,4,5], labels: ["1","5","10","25","50","100"], dec: 0, yunit: "%",
    series: [
      { name: "forest (validation)", ys: [78,84,86,88,89,89] },
      { name: "single tree baseline", ys: [78,78,78,78,78,78] }
    ],
    knob: { label: "Trees in the forest", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 0, text: "One deep tree: 78%, and remember — retrain it on slightly different data and you'd get a different 78%.", tone: "info" },
      { max: 2, text: "Even 5–10 trees voting together beat any individual member. Their private mistakes disagree; their shared signal agrees.", tone: "info" },
      { max: 5, text: "🤯 The curve plateaus around 89%: once the wobble is averaged away, more trees add little. Variance was the disease; the committee was the cure.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Bagging → random forests", formula: "many trees on bootstrap resamples + feature randomness → average the votes",
      text: "The forest gives up the single tree's readable path and buys stability and accuracy. It remains one of the strongest default models for tabular data." }
  }
}
];
