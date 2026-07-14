/* Decision Trees — Part I: Foundations. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).trees1 = [

{
  q: "How does training actually build a decision tree from the data?",
  choices: [
    "It picks the best single split, then repeats on each resulting group",
    "It tests every possible whole-tree shape and keeps the highest scorer",
    "It starts at the leaves and merges groups upward until one root is left",
    "It adjusts numeric weights over many passes until the error stops falling",
    "It draws one smooth curved boundary that separates all the classes at once"
  ],
  explain: "Trees are built greedily and top-down: at each step the algorithm picks the split that reduces impurity the most right now, then recursively repeats the same procedure on each child group. It never looks ahead or revisits an earlier split, which makes training fast but does not guarantee the globally best tree.",
  simple: "Building a tree is like tidying a messy drawer by asking the single most useful question first, then treating each resulting pile as a smaller drawer and sorting it the same way. You keep zooming in, one best question at a time, until each pile is neat. You never go back to redo an earlier question.",
  widget: {
    type: "curveStatic", title: "One best split, then repeat",
    world: "Follow the greedy builder as it splits the messiest group, then recurses into each new group.",
    xlab: "splitting steps taken →", xs: [0,1,2,3,4], labels: ["start","1","2","3","4"], dec: 0, yunit: "",
    series: [ { name: "impurity remaining", ys: [100,60,35,18,8] } ],
    knob: { label: "Splitting steps taken", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Step zero: one big mixed group and no splits yet, so impurity sits at its highest.", tone: "info" },
      { max: 3, text: "Each step greedily takes the best available split, then recurses into the groups it creates.", tone: "info" },
      { max: 4, text: "🤯 The tree is grown one locally-best question at a time — never planned all at once.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Greedy top-down splitting", formula: "repeat: best split now → recurse on each child",
      text: "Trees grow one locally-best split at a time, then recurse into every group they create." }
  }
},

{
  q: "The same decision tree can predict a category OR a number. What differs between the two?",
  choices: [
    "Only what a leaf reports: the majority class, or the average value",
    "Whether the tree is allowed to ask questions about numeric features",
    "Whether the splits reduce impurity or instead increase it on purpose",
    "Whether the tree has one single root or grows several separate roots",
    "Whether the model keeps all the training rows stored inside every leaf"
  ],
  explain: "A classification tree and a regression tree share the same greedy split-and-recurse structure; the real difference is what a leaf outputs. Classification leaves report the majority class of their training cases, while regression leaves report the average target value. The split criterion adapts too (variance reduction instead of Gini), but the tree is built the same way.",
  simple: "Whether a tree guesses a category or a number, it is the same flowchart of yes/no questions. The only change is what happens at the end: a classification leaf votes for the most common label, and a regression leaf just averages the numbers that landed there. Same routing, different kind of answer.",
  widget: {
    type: "curveStatic", title: "Leaf: vote or average",
    world: "Watch what one regression leaf outputs as more training cases fall into it: their running average.",
    xlab: "cases collected in the leaf →", xs: [0,1,2,3,4], labels: ["1","2","3","4","5"], dec: 0, yunit: "",
    series: [ { name: "leaf's average target", ys: [200,180,190,185,186] } ],
    knob: { label: "Cases collected in the leaf", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "With one case in the leaf, the regression prediction is just that single value.", tone: "info" },
      { max: 3, text: "As more training cases land in the leaf, it reports their running average.", tone: "info" },
      { max: 4, text: "🤯 Swap 'average' for 'majority vote' and the very same leaf does classification instead.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Classification vs regression trees", formula: "leaf = majority class (classify) or mean value (regress)",
      text: "Same split-and-recurse tree; only the leaf's answer changes from a vote to an average." }
  }
},

{
  q: "In a decision tree, what is a 'node' (a split)?",
  choices: [
    "A yes/no question on one feature that sends a case left or right",
    "A stored weight the tree multiplies with an incoming feature value",
    "An endpoint that holds the final prediction for cases reaching it",
    "A tally of how many features the entire tree examines in total",
    "The averaged label across every training case the model has seen"
  ],
  explain: "A node (an internal node) is a single split: a threshold test on one feature, such as 'area < 1,250?'. Cases that answer yes flow down one branch and those that answer no flow down the other, repeating until they reach a leaf.",
  simple: "Think of each node as one fork in a choose-your-own-adventure book: it asks a single yes/no question and points you down one of two paths. Follow enough forks and you land on an ending. The whole tree is just forks stacked on forks.",
  widget: {
    type: "curveStatic", title: "One node per fork",
    world: "Start with everyone in one group and add splits; each node carves out one more group.",
    xlab: "splits (nodes) added →", xs: [0,1,2,3,4], labels: ["0","1","2","3","4"], dec: 0, yunit: "",
    series: [ { name: "distinct groups", ys: [1,2,3,4,5] } ],
    knob: { label: "Splits (nodes) added", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Zero splits: everyone sits in one undivided group, because no question has been asked yet.", tone: "info" },
      { max: 3, text: "Each node adds one yes/no question, carving the data into one more separate group.", tone: "info" },
      { max: 4, text: "🤯 Four nodes give five groups; every node is just one more fork routing cases left or right.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Node / split", formula: "node = test 'feature < threshold?' → left / right branch",
      text: "Every internal node asks about exactly one feature; stacking them builds the whole flowchart." }
  }
},

{
  q: "What is the 'root' of a decision tree?",
  choices: [
    "The first, most informative question, seen by every case",
    "The final endpoint that stores the tree's chosen prediction",
    "The deepest branch reached only by a few unusual cases",
    "The feature that earned the least impurity reduction overall",
    "The average of all leaf predictions gathered into one value"
  ],
  explain: "The root is the topmost node, the single split every case passes through first. Training picks it to be the most informative question available, the one whose split reduces impurity the most, so it sits at the very top of the tree.",
  simple: "The root is the very first question on the flowchart, the one nobody can skip. Because every case starts here, the tree spends its best question on it: the one that separates the groups most cleanly.",
  widget: {
    type: "curveStatic", title: "The top question does the most",
    world: "Read how much impurity each level of the tree removes, from the root downward.",
    xlab: "level (root = 0) →", xs: [0,1,2,3,4], labels: ["root","1","2","3","4"], dec: 0, yunit: "",
    series: [ { name: "impurity removed here", ys: [50,25,12,6,3] } ],
    knob: { label: "Level (root = 0)", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "The root (level 0) removes the most impurity of any node, which is exactly why it is chosen first.", tone: "info" },
      { max: 3, text: "Deeper levels split smaller, cleaner groups, so each one removes less than the root did.", tone: "info" },
      { max: 4, text: "🤯 Every case in the dataset passes through the root; later questions only refine what it started.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Root", formula: "root = top node, chosen to maximise impurity reduction",
      text: "One question every case sees first: the tree's single most valuable split." }
  }
},

{
  q: "What do 'Gini' and 'entropy' measure in a decision tree?",
  choices: [
    "How mixed a group's labels are, so splits can reduce it",
    "How deep the tree is permitted to grow before splitting stops",
    "How many training cases finally landed inside each leaf",
    "How far apart two cases sit when spread across the feature space",
    "How confident the final leaf vote is on brand-new cases"
  ],
  explain: "Gini and entropy are two near-identical formulas for impurity: how mixed a group's labels are, from 0 (all one class) up to a maximum at a 50/50 split. Training scores each candidate split by how much it lowers this number and keeps the split that reduces it most.",
  simple: "Both are just a mixed-ness score for a bucket of labels: all-same scores zero, a perfect 50/50 muddle scores highest. Gini and entropy disagree only in tiny details, like two thermometers reading almost the same temperature. The tree always tries to cut the mixed-ness down.",
  widget: {
    type: "curveStatic", title: "The mixed-ness hill",
    world: "Vary how mixed one group is and watch its impurity rise and fall.",
    xlab: "fraction of one class →", xs: [0,1,2,3,4], labels: ["0%","25%","50%","75%","100%"], dec: 0, yunit: "",
    series: [
      { name: "Gini", ys: [0,38,50,38,0] },
      { name: "entropy", ys: [0,81,100,81,0] }
    ],
    knob: { label: "Fraction of one class", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "At 0% (all one class) impurity is zero: the group is pure and needs no further splitting.", tone: "info" },
      { max: 3, text: "As the mix approaches 50/50 the score climbs; the group is as muddled as it can get.", tone: "info" },
      { max: 4, text: "🤯 Gini and entropy trace the same hill, peaking at 50/50: two formulas, one idea, mixed-ness.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Gini / entropy", formula: "Gini = 2p(1-p); entropy = -sum p*log2(p); both peak at 50/50",
      text: "Interchangeable impurity measures; splits are chosen to reduce whichever one you pick." }
  }
},

{
  q: "What does 'pruning' a decision tree mean?",
  choices: [
    "Cutting back branches that only memorised training noise",
    "Adding extra branches until every leaf is perfectly pure",
    "Rescaling each feature so the splits compare on equal footing",
    "Averaging many trees so their separate errors cancel out",
    "Reordering the questions so the cheapest ones are asked first"
  ],
  explain: "Pruning removes branches that fit noise rather than signal, either by limiting growth up front (pre-pruning, e.g. max_depth or min_samples_leaf) or by trimming a fully grown tree afterward (post-pruning, e.g. ccp_alpha). The smaller tree generalises better even though it fits the training data slightly worse.",
  simple: "A tree left to grow wild sprouts tiny branches around every oddball point, which is memorising rather than learning. Pruning is the gardener's shears: snip the branches that only serve noise and the plant is healthier. A leaner tree does better on cases it has never seen.",
  widget: {
    type: "curveStatic", title: "Snip back to the sweet spot",
    world: "Grow the tree from tiny to full and compare its training and validation scores.",
    xlab: "tree size (leaves) →", xs: [0,1,2,3,4], labels: ["4","8","16","32","64"], dec: 0, yunit: "",
    series: [
      { name: "training score", ys: [70,82,90,96,100] },
      { name: "validation score", ys: [68,80,85,80,72] }
    ],
    knob: { label: "Tree size (leaves)", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "A tiny, heavily pruned tree underfits: both scores are still low because it asks too few questions.", tone: "info" },
      { max: 3, text: "Around the middle the validation score peaks; this pruned size generalises best of all.", tone: "info" },
      { max: 4, text: "🤯 The full tree hits 100% training but validation sags: those last branches only memorised noise, so pruning cuts them.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Pruning", formula: "limit growth (max_depth, min_samples_leaf) or trim after (ccp_alpha)",
      text: "Cut the branches that fit noise; the smaller tree generalises better." }
  }
},

{
  q: "What does a decision tree's 'feature importance' tell you?",
  choices: [
    "How much total impurity each feature reduced across the tree",
    "The exact direction each feature pushes the final prediction",
    "Which single feature the root node itself always chooses to split on",
    "How strongly two features correlate with each other in data",
    "The order in which features were fed into the training call"
  ],
  explain: "Feature importance sums the impurity reduction each feature earned every time it was used to split, across the whole tree. A bigger total means the feature did more of the separating work. It is a useful hint rather than a verdict: the numbers shift between retrains and get unreliable when features are correlated.",
  simple: "Imagine tallying, for each question-topic, how much cleaner it made the groups every time it was asked. A topic that repeatedly tidied things up scores high. It tells you what the tree leaned on, but treat it as a clue rather than gospel, since shuffling the data can reshuffle the ranking.",
  widget: {
    type: "curveStatic", title: "Who did the sorting work",
    world: "Rank the features by how much impurity each one removed across the whole tree.",
    xlab: "feature (most to least important) →", xs: [0,1,2,3,4], labels: ["income","age","debts","region","zip"], dec: 0, yunit: "",
    series: [ { name: "impurity reduction credited", ys: [45,28,15,8,4] } ],
    knob: { label: "Feature (ranked)", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "The top feature earned the largest impurity reduction, so the tree leaned on it the most.", tone: "info" },
      { max: 3, text: "Importance falls off down the ranking; the lower features did little separating work.", tone: "info" },
      { max: 4, text: "🤯 It is only a hint: retrain on slightly different data and this ranking can reshuffle, especially with correlated features.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Feature importance", formula: "importance = total impurity reduction credited to each feature",
      text: "A useful hint about what the tree relied on, but it shifts between retrains." }
  }
},

{
  q: "A decision tree classifies a customer. What is the model actually made of?",
  choices: ["A chain of yes/no questions ending in a verdict", "A weighted sum of the features passed to a curve", "A stored table of all the examples it trained on", "A product of one probability factor per feature", "A single straight line dividing the two classes"],
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
  choices: ["It leaves the two sides purer — more single-class", "It balances the two sides to equal point counts", "It falls at the exact centre of the value range", "It matches the feature's average across all samples", "It grows the deepest, most detailed tree it can"],
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
  choices: ["The majority class of the training points that landed there", "A weighted scoring formula that grades each incoming customer", "The single closest stored training point, KNN-style, to it", "A back-pointer that routes the customer up to the root again", "A newly computed split chosen for each new arrival on the fly"],
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
  choices: ["It fits it perfectly — one pure leaf per stray point", "Training accuracy plateaus near the majority class ratio", "Growth halts automatically at a safe default depth", "Training accuracy starts to fall as depth increases", "Leaves begin merging back together to stay general"],
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
  choices: ["Training climbs to 100%; validation peaks early then falls", "Both curves climb together and simply never level off", "Both curves fall steadily and in parallel as depth increases", "Validation keeps climbing steadily while training falls away", "Two perfectly flat lines that never respond to added depth"],
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
  choices: ["Harmless — splits like 'income < 40,000?' don't care about scale", "Fatal - mismatched units stop the tree from comparing features", "The feature with the biggest units dominates every split it makes", "It trains far more slowly than usual but still predicts correctly", "Only the very first root split is thrown off by the raw scale"],
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
  choices: ["A staircase of horizontal and vertical steps", "A perfectly smooth diagonal matching the truth", "One gentle curve passing through the middle", "A tight circle drawn around one of the classes", "No boundary at all, trees simply can't attempt this"],
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
  choices: ["The exact path of questions that led to the verdict", "A confidence interval on each of the learned weights", "The gradient of the loss surface at that one data point", "The single nearest training example, KNN-style, to it", "A pixel-by-pixel saliency heat-map over the inputs"],
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
  choices: ["High variance — trees are unstable to small data changes", "High bias - the tree is far too rigid to fit the data well", "A plain failure of the model's regularisation settings", "Label leakage carried in from the removed training rows", "Feature drift that crept in between the two training runs"],
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
  choices: ["Their instability — averaging many jumpy trees cancels the wobble", "Their fundamental inability to fit the training data closely enough", "Their strict need for carefully scaled and centred input features", "Their painfully slow speed when making a single prediction", "Their heavy reliance on axis-aligned rectangular splits"],
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
