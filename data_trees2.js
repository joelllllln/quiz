/* Decision Trees — Part II: Practice. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).trees2 = [

{
  q: "sklearn lets you grow trees with criterion='gini' or criterion='entropy'. Plot both impurity measures against a node's class mix — what do you find, and why is gini the default?",
  choices: ["Both peak at a 50/50 mix and hit zero when pure — they pick near-identical splits, and gini skips the logarithm so it's faster", "Entropy consistently grows deeper, more accurate trees while gini stops earlier, so swapping the criterion changes results a lot", "Gini is defined only for two-class problems, so you must switch to entropy the moment a third class appears", "Entropy is the impurity measure used for regression trees, while gini is reserved strictly for classification", "Gini peaks at a pure node and bottoms out at a 50/50 mix, the exact opposite of entropy's shape"],
  explain: "Gini = 2p(1−p), entropy = −p·log₂p − (1−p)·log₂(1−p). Both are zero at p=0 or 1 and maximal at p=0.5, with almost the same curvature — studies find they disagree on ~2% of splits with no consistent winner. Gini avoids computing logs, so CART (and sklearn) default to it; entropy is the ID3/C4.5 lineage.",
  simple: "Both curves are 'confusion meters' for a node: zero when everyone inside agrees, highest at a 50/50 argument. Since the two meters bulge in almost exactly the same way, the tree ends up asking almost exactly the same questions either way — so the tiebreaker is just that gini is cheaper to compute.",
  widget: {
    type: "curveStatic", title: "Two confusion meters, one shape",
    world: "A node's impurity under both criteria as its class mix goes from all-A, through a 50/50 muddle, to all-B. Slide the mix and watch the meters move in lockstep.",
    xlab: "share of class A in the node →", xs: [0,1,2,3,4,5,6,7,8,9,10], labels: ["0%","10%","20%","30%","40%","50%","60%","70%","80%","90%","100%"], dec: 2, yunit: "",
    series: [
      { name: "gini = 2p(1−p)", ys: [0, 0.18, 0.32, 0.42, 0.48, 0.5, 0.48, 0.42, 0.32, 0.18, 0] },
      { name: "entropy (bits)", ys: [0, 0.47, 0.72, 0.88, 0.97, 1, 0.97, 0.88, 0.72, 0.47, 0] }
    ],
    knob: { label: "Share of class A", min: 0, max: 10, step: 1, init: 5 },
    insights: [
      { max: 0, text: "A pure node scores exactly zero on BOTH meters — nothing left to split. This end of the curve is what every split is chasing.", tone: "info" },
      { max: 5, text: "Maximum muddle at 50/50: gini tops out at 0.5, entropy at 1 bit. Different heights, same hill — and it's the SHAPE that picks splits.", tone: "info" },
      { max: 10, text: "🤯 The two curves rise and fall together everywhere, so they rank candidate splits almost identically. The practical difference is that gini needs no logarithm — which is the whole reason it's the default.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Gini vs entropy", formula: "gini = 2p(1−p) · entropy = −Σ p·log₂p",
      text: "Same zeros, same peak, near-identical split rankings. Gini = CART's choice (sklearn default); entropy = ID3/C4.5's 'information gain'. Don't burn tuning budget on this switch." }
  }
},

{
  q: "min_samples_leaf is the classic pre-pruning knob. Sweep it from 1 to 100 and watch training vs validation accuracy. What is it actually forbidding, and where does validation peak?",
  choices: ["It forbids leaves smaller than N samples, so the tree can't memorise single points — validation peaks at a middle value", "It caps the tree's depth at N levels directly, so no branch can grow too deep, and validation therefore peaks at the smallest N", "It restricts how many features each split may consider, so validation just keeps climbing as N grows larger", "It strips the N most extreme outliers out of the data before training, so noisy points can't form leaves", "It sets the minimum accuracy every leaf must reach, forcing impure leaves to keep splitting until they comply"],
  explain: "With min_samples_leaf=1 the tree may carve a private leaf around every training point — 100% train accuracy, memorisation. Requiring, say, 10 samples per leaf forces each prediction to be backed by a small crowd, smoothing away noise. Push it too high and real structure gets flattened too: the usual U-shape, tuned on validation.",
  simple: "It's a rule that says 'no conclusions from fewer than N examples'. At N=1 the tree happily builds a special rule for every single weird training point — perfect memory, poor judgement. At N=100 it's only allowed big, mushy generalisations. The sweet spot in the middle is where rules are backed by enough evidence but still specific enough to be useful.",
  widget: {
    type: "curveStatic", title: "No conclusions from tiny crowds",
    world: "One tree retrained at six values of min_samples_leaf. Watch the memorisation gap — the space between the curves — close as leaves are forced to hold more evidence.",
    xlab: "min_samples_leaf →", xs: [0,1,2,3,4,5], labels: ["1","2","5","10","25","100"], dec: 0, yunit: "%",
    series: [
      { name: "training accuracy",   ys: [100, 99, 96, 93, 89, 81] },
      { name: "validation accuracy", ys: [83, 86, 89, 91, 88, 80] }
    ],
    knob: { label: "min_samples_leaf", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Leaf size 1: train 100%, validation 83%. That 17-point gap IS memorisation — leaves wrapped around individual noisy points.", tone: "warn" },
      { max: 3, text: "Around 10 samples per leaf, validation peaks: every prediction now rests on a small crowd rather than one point, and the gap has nearly closed.", tone: "info" },
      { max: 5, text: "🤯 At 100, BOTH curves sag — the rule now steamrolls real patterns too. Pre-pruning is a dial between memorising noise and blurring signal, and only validation can find the notch.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Pre-pruning (min_samples_leaf / min_samples_split / max_depth)", formula: "stop splitting when a rule would rest on too little evidence",
      text: "Pre-pruning constrains the tree DURING growth. min_samples_leaf is the most robust single knob — it directly bounds how little evidence a prediction may stand on." }
  }
},

{
  q: "Cost-complexity pruning (ccp_alpha) takes the opposite route: grow the tree fully FIRST, then cut. What does raising alpha do to the finished tree?",
  choices: ["Snips branches whose accuracy gain doesn't justify their added leaves — bigger alpha prunes harder", "Deletes only the single deepest level of the tree, so a bigger alpha simply removes one more layer each time", "Drops features whose importance scores fall below alpha, so a bigger alpha keeps fewer input columns around", "Restarts training from scratch on a smaller random subsample, with bigger alpha meaning fewer rows kept", "Merges the two rarest classes together, so a larger alpha collapses more minority classes into one"],
  explain: "Post-pruning scores every subtree as (error + alpha × number_of_leaves) and collapses any branch that doesn't pay its rent. alpha is the rent per leaf: at 0 nothing is cut, and as it rises the tree is progressively simplified — with validation accuracy typically rising (noise-fitting branches go first) then falling (real structure goes).",
  simple: "First let the tree grow wild, then walk through it with shears asking each branch one question: 'is the accuracy you add worth the complexity you cost?' Alpha is how expensive complexity is. Cheap rent keeps every twig; raise the rent and the freeloading branches — the ones that only memorised noise — get evicted first.",
  widget: {
    type: "curveStatic", title: "Raising the rent on branches",
    world: "A fully-grown 48-leaf tree pruned at increasing alpha. Track the leaf count collapsing alongside what it does to validation accuracy.",
    xlab: "ccp_alpha →", xs: [0,1,2,3,4,5], labels: ["0","0.001","0.005","0.01","0.03","0.1"], dec: 0, yunit: "",
    series: [
      { name: "leaves remaining",        ys: [48, 31, 17, 9, 4, 1] },
      { name: "validation accuracy (%)", ys: [84, 88, 91, 90, 85, 62] }
    ],
    knob: { label: "ccp_alpha", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "The first cuts remove 17 leaves and validation goes UP — those branches were pure noise-memorisation, paying no rent at all.", tone: "info" },
      { max: 3, text: "Down to 9 leaves and still near peak accuracy: a tree a human can read on one screen, performing better than the 48-leaf original.", tone: "info" },
      { max: 5, text: "🤯 At 0.1 only the stump survives — one leaf predicting the majority class at 62%. The sweep from 48 leaves to 1 is the full simplicity-vs-fit trade, and validation picks the stop.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Cost-complexity (post-)pruning", formula: "keep subtree iff error saved > α × leaves added",
      text: "sklearn: cost_complexity_pruning_path() lists the candidate alphas; cross-validate over them. Post-pruning sees the whole tree before cutting — often better than stopping growth early." }
  }
},

{
  q: "A decision tree is used for REGRESSION: predicting house price from floor area. What does its prediction curve actually look like across floor areas, and why?",
  choices: ["A staircase of flat steps — each leaf predicts the AVERAGE price of its training houses", "A smooth straight line fitted through the cloud of training houses by ordinary least squares", "A smooth flexible curve, much like a polynomial regression fit to the same points", "A jagged line that passes exactly through every single training house it saw", "One flat horizontal line pinned at the overall mean price of all the houses"],
  explain: "A regression tree splits the feature range into intervals (leaves) choosing splits that minimise squared error, and each leaf predicts the mean target of its training samples. Within a leaf the prediction is constant, so the curve is piecewise-flat — a staircase whose step edges are the split thresholds.",
  simple: "The tree chops floor area into bins — 'under 1,100 sqft', '1,100 to 1,800', 'over 1,800' — and inside each bin it predicts one number: the average price of the training houses that landed there. So the prediction doesn't slope, it JUMPS: flat, step, flat, step. Slide along the axis and feel the stairs.",
  widget: {
    type: "curveStatic", title: "Prices as a staircase",
    world: "A regression tree's price prediction across floor area, drawn against the true smooth trend. Slide a house along the axis — notice where the prediction moves, and where it stubbornly doesn't.",
    xlab: "floor area (sqft) →", xs: [0,1,2,3,4,5,6,7,8], labels: ["500","750","1000","1250","1500","1750","2000","2250","2500"], dec: 0, yunit: "k",
    series: [
      { name: "tree's predicted price (£k)", ys: [110, 110, 110, 168, 168, 168, 235, 235, 235] },
      { name: "true average trend (£k)",     ys: [95, 120, 145, 170, 195, 215, 232, 248, 262] }
    ],
    knob: { label: "House's floor area", min: 0, max: 8, step: 1, init: 0 },
    insights: [
      { max: 2, text: "Every house from 500 to 1,000 sqft gets the SAME £110k — that's one leaf speaking, and £110k is just the average of its training houses.", tone: "info" },
      { max: 3, text: "Cross a split threshold and the prediction jumps £58k in one step. The edges of the stairs ARE the tree's split points, chosen to minimise squared error.", tone: "info" },
      { max: 8, text: "🤯 The tree tracks the trend only in steps — more depth means more, finer stairs (and eventually a step per house: overfitting). Flat-within-a-leaf is the fingerprint of every tree-based regressor, forests and boosting included.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Regression trees", formula: "split to minimise MSE · leaf predicts mean(y) of its samples",
      text: "Classification trees vote; regression trees average. Prediction is piecewise-constant — powerful for thresholds and interactions, incapable of smooth slopes." }
  }
},

{
  q: "A tree was trained on sales data from 2016–2020, where sales grew ~10% every year. Ask it to predict 2024. What does it say, and what's the general lesson?",
  choices: ["It predicts a flat constant — roughly its 2020 leaf — because trees cannot extrapolate beyond the training range", "It carries the observed 10% yearly growth forward, extending the fitted upward trend cleanly out to the 2024 value and beyond", "It refuses outright and raises an error, since 2024 lies well outside every leaf it learned", "It predicts a value of zero for 2024, because that year never once appeared in the training data", "It interpolates smoothly between the 2020 leaf and the largest sales value it ever saw during training"],
  explain: "Every tree prediction is an average of TRAINING samples in some leaf. Inputs beyond the training range all fall into the outermost leaf, whose value is fixed — so the prediction goes flat exactly where the trend continues. Linear models happily extend a slope; trees structurally cannot. This matters for time series, growing markets, and any feature drifting outside its historical range.",
  simple: "A tree can only ever answer with an average of things it has already seen — it has no concept of 'keep going'. Ask about 2024 and it shrugs: '2024 lands in my rightmost bin, and that bin's average is 146.' The real world kept climbing; the tree's answer flatlined at the edge of its experience.",
  widget: {
    type: "curveStatic", title: "The edge of experience",
    world: "True sales keep compounding at ~10% a year. The tree trained only on 2016–2020. Slide time forward and watch the two curves part ways at the training boundary.",
    xlab: "year →", xs: [0,1,2,3,4,5,6,7,8], labels: ["2016","2017","2018","2019","2020","2021","2022","2023","2024"], dec: 0, yunit: "",
    series: [
      { name: "true sales",       ys: [100, 110, 121, 133, 146, 161, 177, 195, 214] },
      { name: "tree's prediction", ys: [102, 111, 120, 134, 146, 146, 146, 146, 146] }
    ],
    knob: { label: "Year", min: 0, max: 8, step: 1, init: 0 },
    insights: [
      { max: 4, text: "Inside 2016–2020 the tree tracks beautifully — its staircase has a step for each era it witnessed.", tone: "info" },
      { max: 6, text: "Past 2020, every year falls into the same rightmost leaf. The prediction is frozen at that leaf's average: 146. Meanwhile reality compounds on without it.", tone: "warn" },
      { max: 8, text: "🤯 By 2024 the tree is 32% under reality — not from noise, from ARCHITECTURE: leaf averages can never exceed the training data's range. Forests and gradient boosting inherit this exact ceiling; a linear model would have extended the slope.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Trees cannot extrapolate", formula: "prediction = mean of a leaf's TRAINING samples ⇒ bounded by seen values",
      text: "Outside the training range, tree output is constant. For trending targets: detrend first, model the trend linearly, or accept the flatline. Applies to RF and XGBoost too." }
  }
},

{
  q: "You retrain the same tree pipeline six times, changing only the random seed, and record the importance score of the feature 'income' each time. The scores land all over the place. What's the honest reading?",
  choices: ["Importances swing between retrains — especially with correlated features — so treat them as rough hints, not rankings", "The pipeline must contain a bug somewhere, because impurity-based importances are fully deterministic across identical retrains", "Income is clearly the single most important feature, since its score tops the list in most of the retrains", "The average of 27% is income's exact true importance, and the scatter around it is just harmless sampling noise", "Running many more retrains will make the scores steadily converge onto one stable, trustworthy value in the end"],
  explain: "Impurity-based importances are computed from which splits the fitted tree happened to choose. When features are correlated, near-identical trees can route credit to a proxy instead, and small data changes flip the choice. Report importances with spread (retrain several times), and prefer permutation importance on held-out data for decisions.",
  simple: "If 'income' and 'postcode' carry overlapping information, the tree only needs ONE of them at each fork — and which one it grabs can come down to a coin-flip deep in the training run. So one retrain credits income heavily, the next credits its stand-in. Flick through the six retrains: same data, same recipe, wildly different credit.",
  widget: {
    type: "foldPick", title: "Six retrains, one feature's credit",
    world: "The importance score of the SAME feature ('income') across six retrains that differ only in random seed. Flick through them, then land on the average — and mind the spread.",
    blurb: "Identical data and settings — only the random seed changes. Each bar is 'income's importance score in that retrain:",
    folds: [
      { name: "seed 1", acc: 34 },
      { name: "seed 2", acc: 18 },
      { name: "seed 3", acc: 41 },
      { name: "seed 4", acc: 22 },
      { name: "seed 5", acc: 37 },
      { name: "seed 6", acc: 12 }
    ],
    knob: { label: "Which retrain you look at", min: 1, max: 7, step: 1, init: 1 },
    insights: [
      { max: 3, text: "Seed 3 says income is the star of the model (41%); seed 2 says it's a bit player (18%). Nothing changed but the shuffle.", tone: "warn" },
      { max: 6, text: "The swings come from correlated features taking turns claiming the same predictive credit — whichever gets picked first at a fork walks away with it.", tone: "info" },
      { max: 7, text: "🤯 A 12–41% range around a 27% average. Quoting any single retrain's number as 'the' importance is quoting noise. Report the spread, or use permutation importance on held-out data.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Importance instability", formula: "impurity importances = artefacts of ONE fitted tree, not truths about the data",
      text: "Correlated features split credit arbitrarily; retrains reshuffle it. For real decisions: permutation importance, averaged over repeats, on data the model never trained on." }
  }
},

{
  q: "Your dataset has missing values in 25% of rows. One team drops incomplete rows before training a tree; another uses a tree that handles missing values natively. Sweep the missingness up — what happens?",
  choices: ["Dropping rows bleeds accuracy as data vanishes; native handling learns a default branch for missing values and degrades far slower", "Both approaches degrade at essentially the same rate, since a missing value hurts a tree the same way no matter how it happens to be handled", "Dropping incomplete rows is the safer choice at every missingness level, because imputing blanks only injects fresh noise", "Native handling works fine until about 10% missing, then breaks down sharply once too many rows carry a blank", "Missing values leave a tree essentially unusable either way, so the only real fix is to collect the data again"],
  explain: "Row-dropping throws away every complete feature in an incomplete row — at 25% missingness you may lose a third of your data, and worse, non-randomly. Trees have elegant alternatives: learn which branch missing values should follow (sklearn's DecisionTree since 1.3, HistGradientBoosting, XGBoost do this natively), or CART's classic surrogate splits (backup questions that mimic the primary split).",
  simple: "A missing value isn't a broken row — it's one blank cell in an otherwise useful row. Dropping the whole row burns the good cells with the bad. A tree can instead learn 'when age is blank, send them left — that's where blanks tended to belong during training'. Often the very FACT a field is blank is itself a clue, and the tree gets to use it.",
  widget: {
    type: "curveStatic", title: "Burn the row, or route the blank",
    world: "The same tree task at rising levels of missing data, solved two ways: delete incomplete rows vs let the tree route blanks down a learned default branch.",
    xlab: "share of rows with a missing value →", xs: [0,1,2,3,4], labels: ["0%","10%","25%","40%","60%"], dec: 0, yunit: "%",
    series: [
      { name: "native missing handling", ys: [90, 89, 87, 84, 79] },
      { name: "drop incomplete rows",    ys: [90, 86, 79, 70, 58] }
    ],
    knob: { label: "Missingness", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "At 10% the gap is already 3 points — every dropped row cost several perfectly good feature values.", tone: "info" },
      { max: 3, text: "At 40%, dropping rows has discarded almost half the training data (and rarely at random — missingness usually clusters in exactly the interesting cases).", tone: "warn" },
      { max: 4, text: "🤯 At 60% missing, native handling still scores 79% while row-dropping has collapsed to 58%. The blank cells even became features: 'income left blank' turned out to predict the target by itself.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Native missing-value handling", formula: "at each split, learn a default branch for blanks (or use surrogate splits)",
      text: "sklearn DecisionTree (≥1.3), HistGradientBoosting and XGBoost route missing values natively. Reach for row-dropping last — it burns data and biases the sample." }
  }
},

{
  q: "You call predict_proba on a decision tree and nearly every answer is exactly 0% or 100%. Where do a tree's probabilities actually come from, and what tames these extremes?",
  choices: ["A leaf's probability is just the class fraction of its training samples — tiny leaves give 0/1 answers, so enforce bigger leaves or calibrate", "The probability comes from a sigmoid applied to the depth of the leaf, so shallow leaves report the confident extremes", "It comes from each point's distance to the decision boundary, and points sitting far away get pushed to 0 or 100%", "The tree computes a genuine Bayesian posterior for each class, so the extreme 0/100 outputs are exact probabilities rather than mere counting artefacts", "Extremes simply mean the model is unusually confident and well-calibrated, so 0/100 answers need no correction"],
  explain: "predict_proba for a tree = the training-class proportions inside the landed leaf. A fully-grown tree drives leaves pure (often 1–3 samples), so every proportion is 0/1 — statements like '100% sure' backed by two data points. min_samples_leaf keeps proportions meaningful; CalibratedClassifierCV fixes what remains.",
  simple: "Ask the tree 'how sure are you?' and it just looks around the leaf you landed in: '3 of the 3 training examples here were fraud, so: 100%.' Three examples! That's a poll of three people reported as certainty. Force leaves to hold more samples and the same poll has 50 voters — suddenly the percentages mean something.",
  widget: {
    type: "curveStatic", title: "A poll of three, reported as certainty",
    world: "One tree at five leaf-size settings. Track how many of its stated probabilities are exactly 0%/100%, and what that does to log-loss (which savagely punishes confident errors — lower is better).",
    xlab: "min_samples_leaf →", xs: [0,1,2,3,4], labels: ["1","5","20","50","200"], dec: 0, yunit: "",
    series: [
      { name: "% of answers saying exactly 0 or 100", ys: [92, 61, 28, 9, 1] },
      { name: "log-loss ×100 (lower = better)",       ys: [141, 88, 52, 44, 63] }
    ],
    knob: { label: "min_samples_leaf", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Leaf size 1: 92% of answers are absolute certainty, and log-loss is dreadful — every confidently-wrong 100% costs a fortune.", tone: "warn" },
      { max: 3, text: "At 50 samples per leaf, probabilities come from real crowds: only 9% extremes and log-loss near its best.", tone: "info" },
      { max: 4, text: "🤯 At 200 log-loss worsens again — leaves so big they blur genuinely different risk groups together. And the fraction-of-a-leaf story explains BOTH ends: probabilities are only as good as the crowd they're counted from.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Tree probabilities", formula: "P(class | x) = class fraction in x's leaf",
      text: "No sigmoid, no distances — just counting inside the landed leaf. For honest probabilities: larger leaves, then CalibratedClassifierCV if it still matters." }
  }
},

{
  q: "Train two trees on datasets that overlap 95% — a tiny resample — and compare their test predictions as depth grows. What does this experiment expose about trees?",
  choices: ["Deep trees are unstable: tiny data changes rewrite them — exactly the variance that bagging and forests average away", "Deep trees converge to identical predictions as depth grows, since the added splits leave ever less room to disagree", "Shallow trees actually disagree far more than deep ones, since a single early split decides their whole verdict", "Any disagreement between the two proves that one of the trees was simply trained or configured incorrectly", "Depth affects only prediction speed, not stability, so the two trees track each other closely at every depth"],
  explain: "One changed sample can flip which split wins at the root, and everything below inherits the change — disagreement compounds with depth. High variance is THE structural weakness of single deep trees, and it's why averaging many decorrelated trees (bagging → random forests) improves them so much: the trees' individual instabilities cancel.",
  simple: "A deep tree is a tower of if-questions where each floor depends on the one below. Nudge the data and a different question wins at some floor — and every floor above it is rebuilt. Two almost-identical datasets can thus produce trees that argue about 1 test case in 3. That flakiness is precisely what forests fix: ask 100 flaky trees and take the vote — the flakiness averages out.",
  widget: {
    type: "curveStatic", title: "Two trees, almost the same data",
    world: "Two trees trained on 95%-overlapping samples of one dataset, compared at increasing depth: how often do they agree on test predictions, and how well does a single tree actually generalise?",
    xlab: "max depth →", xs: [0,1,2,3,4,5], labels: ["1","2","4","6","10","none"], dec: 0, yunit: "%",
    series: [
      { name: "the two trees agree on a test case", ys: [96, 90, 82, 74, 66, 58] },
      { name: "single-tree validation accuracy",    ys: [72, 80, 86, 88, 85, 82] }
    ],
    knob: { label: "Tree depth", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Stumps and depth-2 trees are stable (90%+ agreement) but weak — they haven't the capacity to capture much.", tone: "info" },
      { max: 3, text: "By depth 6, a 5% data change has the twins disagreeing on 1 test case in 4. Each disagreement is variance: predictions driven by WHICH sample you drew, not by the underlying pattern.", tone: "warn" },
      { max: 5, text: "🤯 Unlimited depth: 42% disagreement. Now imagine averaging 100 such trees, each unstable in its own random direction — the disagreements cancel and the shared signal remains. You've just derived the random forest.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Tree instability (high variance)", formula: "small Δdata ⇒ different root split ⇒ different tree",
      text: "Single deep trees are low-bias, HIGH-variance learners. Bagging exists because averaging independent instabilities cancels them — instability is the raw material forests are built from." }
  }
},

{
  q: "Fraud is 1 in 50 transactions, and a plain tree learns to wave nearly everything through. You set class_weight={fraud: 20}. What does this change inside the tree?",
  choices: ["Each fraud sample counts 20× in the impurity maths, so splits that isolate fraud become worth making — recall rises at precision's expense", "It physically duplicates every fraud row twenty times across the dataset before training begins, so the stored file grows twentyfold on disk", "It shifts the decision threshold at predict time, leaving the trained tree itself completely unchanged underneath", "It caps the majority class at twenty samples per leaf, forcing the tree to make room for the rarer fraud cases", "It quietly switches the split criterion from gini over to entropy, which happens to favour the minority class"],
  explain: "class_weight multiplies each sample's contribution inside the gini/entropy computation and in leaf majority votes. A split isolating 5 fraud cases used to be worth 5 points of purity; at weight 20 it's worth 100 — so fraud-catching splits now beat 'everything is fine' splits. The cost: legitimate transactions get swept up in fraud leaves. Precision falls as recall climbs; the weight is a dial you tune to your cost ratio.",
  simple: "The tree grows by chasing purity points, and at 49-to-1 the minority is barely worth chasing — calling everything 'fine' is already 98% pure. class_weight makes every fraud case worth 20 ordinary ones in that scoring, so hunting fraud finally pays. Naturally the tree gets trigger-happy: it catches far more fraud AND accuses more innocents. Slide the weight and pick your trade.",
  widget: {
    type: "curveStatic", title: "Making rare cases worth chasing",
    world: "The same fraud tree at five minority weights. Watch recall (fraud caught) climb and precision (accusations that were right) pay for it.",
    xlab: "class_weight on fraud →", xs: [0,1,2,3,4], labels: ["1","2","5","10","20"], dec: 0, yunit: "%",
    series: [
      { name: "fraud recall",    ys: [42, 58, 74, 85, 93] },
      { name: "fraud precision", ys: [88, 84, 76, 65, 51] }
    ],
    knob: { label: "Weight on fraud samples", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Weight 1: precision is a lovely 88% — but the tree only ever finds 42% of fraud. 'Wave everything through' was winning the purity contest.", tone: "warn" },
      { max: 2, text: "Weight 5: recall 74%. Splits that isolate fraud now score high enough in the weighted impurity maths to actually get made.", tone: "info" },
      { max: 4, text: "🤯 Weight 20: recall 93%, precision 51% — every second alarm is false, but barely any fraud escapes. Neither end is 'correct': the right weight is your cost ratio (missed fraud vs false alarm), set by the business, found on validation.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "class_weight (cost-sensitive splitting)", formula: "weighted gini: each minority sample counts w× in purity and votes",
      text: "class_weight='balanced' auto-sets weights inversely to class frequency. It changes what the tree LEARNS — unlike threshold-moving, which only changes how you read the same scores." }
  }
},

{
  q: "sklearn's DecisionTreeClassifier is an implementation of CART. Against the older ID3/C4.5 family, what marks a CART tree?",
  choices: ["Strictly binary splits, gini by default, and native support for numeric features and regression", "Multiway splits that fan out one branch for every distinct level of each categorical feature it meets", "Support for categorical features only, with numeric columns needing to be binned by hand first", "A design that, once the tree is fully grown, cannot be pruned back in any way afterwards", "A strict requirement that all input features be scaled before the tree is ever trained"],
  explain: "ID3 (1986) split categoricals multiway using information gain and handled neither numbers nor regression; C4.5 added numeric thresholds and gain-ratio. CART (Breiman et al., 1984) chose a different core: every split is a binary yes/no question, impurity is gini (classification) or MSE (regression), and cost-complexity pruning is built in. sklearn implements CART — which is why you never see a 5-way split in its trees.",
  simple: "Family tree of the tree algorithms: ID3 was the pioneer that asked multi-way questions about categories ('which colour: red/green/blue?'). CART rebuilt the idea on one strict habit — every question gets a yes/no answer — which turns out to handle numbers naturally ('area < 1,250?'), do regression, and make pruning clean. That strict-binary habit is what's inside sklearn. Compare the fingerprints below.",
  widget: {
    type: "curveStatic", title: "Three algorithms' fingerprints",
    world: "A capability checklist across the tree dynasties, scored 0 (no) to 2 (fully). Slide across the capabilities and watch which lineage lights up where.",
    xlab: "capability →", xs: [0,1,2,3,4], labels: ["binary splits","numeric feats","regression","pruning","gini criterion"], dec: 0, yunit: "",
    series: [
      { name: "CART (sklearn)", ys: [2, 2, 2, 2, 2] },
      { name: "C4.5",           ys: [1, 2, 0, 2, 0] },
      { name: "ID3",            ys: [0, 0, 0, 0, 0] }
    ],
    knob: { label: "Capability", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "ID3: multiway categorical splits only, via information gain. Numeric features had to be pre-binned by hand.", tone: "info" },
      { max: 2, text: "Regression is CART's alone in this family — same machinery, but leaves average a number and splits minimise MSE.", tone: "info" },
      { max: 4, text: "🤯 CART scores across the board, and that's the design sklearn adopted: binary-only splits, gini/MSE, cost-complexity pruning. When your mental model of 'a decision tree' is sklearn's, it's specifically CART you're picturing.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "CART (Classification And Regression Trees)", formula: "binary splits · gini/MSE · cost-complexity pruning",
      text: "Breiman, Friedman, Olshen & Stone, 1984. The lineage that leads directly to random forests and gradient boosting — both are built from CART trees." }
  }
},

{
  q: "One-hot encode a 50-level categorical (e.g. US state) and feed it to a tree, and performance often DROPS versus smarter encodings. Why do trees particularly dislike wide one-hot features?",
  choices: ["Each one-hot column can only split one level off at a time, so useful groupings need dozens of splits and each column looks weak at the fork", "Decision trees simply cannot process 0/1 indicator columns at all, so one-hot encoding must be undone before training", "One-hot encoding triggers the classic zero-frequency problem, so any unseen combination of states is assigned a predicted probability of exactly zero", "Spreading a feature across fifty columns makes the gini impurity impossible to compute at a split on that feature", "One-hot columns must be feature-scaled first, and trees behave badly whenever their inputs are left unscaled"],
  explain: "A split on 'state_TX < 0.5' peels off exactly one state — separating {TX, OK, LA} from the rest takes three consecutive splits, each individually scoring a tiny impurity gain that often loses to noisier-but-flashier numeric splits. Alternatives: target encoding (one ordered numeric column trees split naturally), CatBoost's native ordered encoding, or grouping rare levels.",
  simple: "Imagine sorting people by state, but you're only allowed questions like 'are you from Texas, yes or no?' — one state per question. Finding a useful group of twelve states takes twelve questions, and each question alone looks barely worth asking, so the tree keeps choosing other features instead. Encode the states as one 'average outcome per state' number, and the same grouping becomes ONE question: 'state average < 0.4?'",
  widget: {
    type: "curveStatic", title: "Fifty questions vs one",
    world: "The same 50-state feature offered to a tree three ways. Slide the tree's depth budget and see which encoding turns it into accuracy.",
    xlab: "depth budget →", xs: [0,1,2,3,4], labels: ["2","4","6","8","12"], dec: 0, yunit: "%",
    series: [
      { name: "target-encoded (1 column)",    ys: [79, 85, 88, 89, 89] },
      { name: "one-hot (50 columns)",         ys: [64, 69, 74, 78, 83] },
      { name: "ignore the state feature",     ys: [63, 66, 68, 68, 68] }
    ],
    knob: { label: "Depth budget", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Depth 2: one-hot has barely beaten 'ignore the feature entirely' — two splits can only peel off two individual states.", tone: "warn" },
      { max: 2, text: "Target encoding reaches 88% at depth 6: the states arrive pre-sorted by their average outcome, so one threshold isolates a whole meaningful group.", tone: "info" },
      { max: 4, text: "🤯 Even with depth 12, one-hot never catches up — it's spending its splits peeling states off one at a time. Same information, different shape: encoding is part of the model.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "High-cardinality categoricals in trees", formula: "one-hot ⇒ one level per split · target encoding ⇒ groups in one split",
      text: "Target/ordered encoding (mind leakage — fit it inside CV folds), rare-level grouping, or CatBoost's native handling. One-hot suits linear models far better than trees." }
  }
}
];
