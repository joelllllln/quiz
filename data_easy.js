/* KNN — Level 1: Foundations. 30 questions; choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).easy = [

/* E1 — the core idea */
{
  q: 'A new, unlabelled data point arrives. What does k-Nearest Neighbours actually do to decide its label?',
  choices: [
    'Finds the k closest labelled points and lets them vote',
    'Fits a straight line through all the data and reads the label off the line',
    'Splits the data with a series of yes/no rules learned in advance',
    'Picks the label that is most common in the whole dataset, ignoring position',
    'Multiplies each feature by a learned weight and adds them up'
  ],
  explain: 'KNN has no equation and no rules — it simply looks up the k most similar known examples and takes a vote among their labels.',
  widget: {
    type: 'scatterK', title: 'The mystery bird',
    world: 'A wildlife camera on a cliff snapped a bird nobody labelled. Rangers already labelled 10 birds by beak length and body weight. The purple ◆ is the mystery bird. You control ONE thing: how many nearby labelled birds get asked for their opinion.',
    classes: ['Puffin', 'Gannet'], xlab: 'beak length', ylab: 'body weight',
    points: [{x:2,y:2.5,c:0},{x:1.5,y:4,c:0},{x:3,y:3.2,c:0},{x:2.6,y:1.4,c:0},{x:4,y:2.2,c:0},{x:7,y:7.5,c:1},{x:8.2,y:6.4,c:1},{x:6.4,y:8.6,c:1},{x:8.8,y:8,c:1},{x:7.6,y:5.4,c:1}],
    query: {x:4.4,y:4.2},
    knob: { label: 'How many neighbours to ask', min: 1, max: 10, step: 1, init: 1 },
    insights: [
      { max: 2, text: 'With so few asked, one bird decides everything. Notice which points light up — only the closest ones get a say.', tone: 'info' },
      { max: 6, text: 'Now it\'s a little committee vote: count the coloured lines of each colour. Majority wins.', tone: 'info' },
      { max: 10, text: '🤯 You asked ALL 10 birds — even ones far across the cliff. The "neighbourhood" is gone; you\'re just counting which species is more common overall.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'k-Nearest Neighbours (KNN)', formula: 'prediction = majority label among the k closest points',
      text: 'What you were doing IS the algorithm: measure distance to every labelled point, keep the k closest, let them vote. The slider you dragged is the famous "k".' }
  }
},

/* E2 — majority vote walkthrough */
{
  q: 'With k = 3, the three nearest neighbours of a new fruit are labelled: apple, apple, lemon. What does KNN predict?',
  choices: [
    'Apple — two votes beat one',
    'Lemon — the single closest neighbour was a lemon, and it wins',
    'Nothing — 3 neighbours can\'t settle it, you need k = 5',
    'Half apple, half lemon — it averages the labels',
    'Whichever fruit is more common in the entire dataset'
  ],
  explain: 'Classification KNN is a simple show of hands among the k nearest: apple 2, lemon 1 → apple.',
  widget: {
    type: 'scatterK', title: 'The unlabelled fruit',
    world: 'A market scanner measured a fruit\'s sweetness and size but the sticker fell off. Ten labelled fruits sit in the crate. Drag the knob and watch the vote count change in the box below.',
    classes: ['Apple', 'Lemon'], xlab: 'sweetness', ylab: 'size',
    points: [{x:6.2,y:6.4,c:0},{x:7.4,y:5.6,c:0},{x:6.8,y:7.8,c:0},{x:8.3,y:7,c:0},{x:7.9,y:8.4,c:0},{x:2.2,y:3,c:1},{x:3.4,y:2.2,c:1},{x:1.6,y:1.8,c:1},{x:2.8,y:4.1,c:1},{x:4.6,y:4.6,c:1}],
    query: {x:5.4,y:5.4},
    knob: { label: 'Neighbours asked (k)', min: 1, max: 9, step: 1, init: 3 },
    insights: [
      { max: 1, text: 'One voter: the nearest fruit alone decides. Risky if that one fruit is odd.', tone: 'warn' },
      { max: 5, text: 'Count the lines: the colour with more lines wins the vote. That number in the box is the whole decision.', tone: 'info' },
      { max: 9, text: '🤯 At k = 9 nearly the whole crate votes — including fruit nothing like yours. The vote stops being "local".', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Majority vote', formula: 'label = most common class among the k nearest neighbours',
      text: 'KNN classification = counting hands. Apple 2 vs Lemon 1 → apple. Ties and far-away voters are the failure modes you just felt.' }
  }
},

/* E3 — what "nearest" means */
{
  q: 'In KNN, which points count as the "nearest" neighbours of a new point?',
  choices: [
    'The ones with the smallest distance to the new point',
    'The ones added to the dataset most recently',
    'The ones with the same label as the majority class',
    'The k points with the largest feature values',
    'A random sample of k points from the training set'
  ],
  explain: '"Near" is measured with a distance function (Euclidean by default): smaller distance = more similar = nearer.',
  widget: {
    type: 'scatterK', title: 'Who is actually closest?',
    world: 'A music app wants to recommend based on similarity. Each labelled song has a tempo and an energy score; your new song is the purple ◆. The numbers on the lines are the measured distances — smaller number = more similar song.',
    classes: ['Chill playlist', 'Workout playlist'], xlab: 'tempo', ylab: 'energy', showDists: true,
    points: [{x:2,y:3,c:0},{x:3.2,y:1.8,c:0},{x:1.4,y:4.6,c:0},{x:4.2,y:3.4,c:0},{x:7,y:7,c:1},{x:8.4,y:6.2,c:1},{x:6.2,y:8.4,c:1},{x:8,y:8.8,c:1},{x:5.6,y:6.4,c:1}],
    query: {x:4.8,y:5},
    knob: { label: 'Neighbours asked (k)', min: 1, max: 9, step: 1, init: 1 },
    insights: [
      { max: 1, text: 'Read the number on the line: that\'s a distance. The ONE song with the smallest distance is "nearest".', tone: 'info' },
      { max: 5, text: 'As k grows, songs join strictly in order of that number — 2nd smallest, 3rd smallest… never randomly.', tone: 'info' },
      { max: 9, text: '🤯 By the end you\'ve recruited songs with huge distances — barely similar at all. "Neighbour" only means something when the distance is small.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Distance = similarity', formula: 'nearest = argmin distance(new point, labelled point)',
      text: 'KNN ranks every labelled example by its distance number and takes the k smallest. Everything else in KNN builds on this ranking.' }
  }
},

/* E4 — k = 1 */
{
  q: 'With k = 1, how does KNN label a new point?',
  choices: [
    'It copies the label of the single closest training point',
    'It averages the labels of all training points',
    'It refuses to predict — one neighbour is not enough',
    'It picks the closest point of each class and flips a coin',
    'It uses the label of the farthest point as a sanity check'
  ],
  explain: 'k = 1 means one voter: whatever the single nearest neighbour is, that\'s your answer — fast, simple, and fragile.',
  widget: {
    type: 'scatterK', title: 'One-voter elections',
    world: 'A film site guesses whether you\'ll like a movie. Films are plotted by action level and romance level; colours show "liked" vs "disliked" by people with your taste. Start at k = 1 and pay attention to HOW MUCH power that single point has.',
    classes: ['Liked', 'Disliked'], xlab: 'action', ylab: 'romance',
    points: [{x:3,y:7,c:0},{x:2,y:5.6,c:0},{x:4.4,y:8,c:0},{x:1.6,y:7.8,c:0},{x:3.8,y:5,c:0},{x:7.2,y:2.6,c:1},{x:8.4,y:3.8,c:1},{x:6.6,y:1.6,c:1},{x:9,y:2,c:1},{x:5.8,y:3.4,c:1}],
    query: {x:5,y:4.4},
    knob: { label: 'Neighbours asked (k)', min: 1, max: 9, step: 2, init: 1 },
    insights: [
      { max: 1, text: 'One line, one voter, decision made. The other 9 films might as well not exist.', tone: 'warn' },
      { max: 5, text: 'More voters — the decision can flip when the committee outvotes that first film. Did yours flip?', tone: 'info' },
      { max: 9, text: '🤯 Same movie, opposite verdicts at k = 1 vs k = 9. The prediction was never "in the data" — it depends on how many you ask.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: '1-Nearest Neighbour (1-NN)', formula: 'k = 1  →  prediction = label of the closest point',
      text: '1-NN just photocopies the nearest example\'s label. You felt both its charm (simple, sharp) and its danger (one point rules everything).' }
  }
},

/* E5 — lazy learning / training = storing */
{
  q: 'What does KNN actually do during its "training" phase?',
  choices: [
    'Almost nothing — it just stores the training examples for later',
    'It learns a weight for every feature by gradient descent',
    'It builds a set of if/then rules from the data',
    'It compresses the data into a single equation and deletes the examples',
    'It computes, once, the distance between every pair of training points'
  ],
  explain: 'KNN is a "lazy" learner: training = memorise the data. All the real work (distance computing, voting) happens at prediction time.',
  widget: {
    type: 'speedLazy', title: 'The laziest student in class',
    world: 'Two ways to prepare for an exam: actually study (build understanding now), or photocopy every past paper and plan to riffle through them during the exam. KNN photocopies. Drag to change how many past papers it hoards.',
    itemName: 'past papers', storeLabel: 'What "training" produced', knobMax: 50000,
    knob: { label: 'Training examples stored', min: 100, max: 50000, step: 100, init: 500 },
    insights: [
      { max: 2000, text: 'Training time: still ~instant, no matter what. It\'s literally just saving the files.', tone: 'info' },
      { max: 20000, text: 'But look at the second bar: answering ONE question means checking your question against every stored paper.', tone: 'warn' },
      { max: 50000, text: '🤯 50,000 stored: training is STILL instant, but every single answer now needs 50,000 distance checks. The work never went away — it was postponed to exam time.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Lazy (instance-based) learning', formula: 'train: store data  ·  predict: do all the work',
      text: 'KNN never builds a model — it defers all computation to prediction time. That\'s why it\'s called lazy or instance-based learning.' }
  }
},

/* E6 — prediction cost */
{
  q: 'Why does basic KNN get slower at making predictions as the training set grows?',
  choices: [
    'Each prediction must measure the distance to every stored training point',
    'The value of k automatically grows with the dataset',
    'It retrains its equation from scratch before every prediction',
    'Larger datasets have more features, and features are slow',
    'It has to re-sort the entire dataset by label first'
  ],
  explain: 'To find the k nearest, plain KNN computes the distance from the query to all n stored points — so prediction cost grows with n.',
  widget: {
    type: 'speedLazy', title: 'Find my photo twin',
    world: 'A photo app finds the most similar face in its library each time you snap a picture. It never "learns" faces — it compares your photo to every stored one, one by one. Grow the library and watch which bar suffers.',
    itemName: 'photos', storeLabel: 'Photo library', knobMax: 40000,
    knob: { label: 'Photos in the library', min: 200, max: 40000, step: 200, init: 1000 },
    insights: [
      { max: 5000, text: 'Small library: comparing against every photo is cheap enough. Nobody notices.', tone: 'info' },
      { max: 25000, text: 'The compare-bar grows in a straight line with the library — double the photos, double the wait, every single time.', tone: 'warn' },
      { max: 40000, text: '🤯 Adding photos costs nothing at "training" time but taxes EVERY future prediction forever. The bill arrives when you can least afford it: while the user waits.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'O(n) prediction cost', formula: 'one prediction ≈ n distance computations',
      text: 'Plain KNN prediction scales linearly with the number of stored examples n. (Clever indexes like k-d trees exist to cut this — that\'s a later level.)' }
  }
},

/* E7 — Euclidean distance */
{
  q: 'Euclidean distance between two points is best described as…',
  choices: [
    'The length of the straight line connecting them',
    'The number of features on which they differ',
    'The sum of the absolute differences along each axis',
    'The difference between their two labels',
    'The time it takes to travel between them on a grid'
  ],
  explain: 'Euclidean distance is ruler distance: the straight-line length, √(Δx² + Δy²) in 2-D.',
  widget: {
    type: 'metricMorph', title: 'Drone vs delivery bike',
    world: 'A pizza leaves the kitchen (K) for a customer (C). A drone flies straight over the rooftops; a bike must follow the street grid. Your knob morphs the measuring rule from "streets only" to "straight line" — watch the measured distance change.',
    a: {x:1,y:2}, aName: 'Kitchen', b: {x:8,y:7}, bName: 'Customer', unit: 'blocks',
    knob: { label: 'How distance is measured', min: 1, max: 2, step: 0.05, init: 1 },
    insights: [
      { max: 1.05, text: 'Streets only: distance = blocks across + blocks up. The orange L-shaped path.', tone: 'info' },
      { max: 1.9, text: 'Sliding the rule bends reality: same two points, yet the "distance" number keeps changing. Distance is a CHOICE, not a fact.', tone: 'warn' },
      { max: 2, text: '🤯 Fully at "straight line": this is the shortest possible — the drone\'s route. No measuring rule can beat the straight line.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Euclidean distance', formula: 'd = √( (x₁−x₂)² + (y₁−y₂)² )',
      text: 'The straight-line ("as the crow flies") measure you ended on is Euclidean distance — KNN\'s default. The street-grid one you started on has a name too: Manhattan distance.' }
  }
},

/* E8 — Manhattan distance */
{
  q: 'Manhattan distance between two points is computed as…',
  choices: [
    'The sum of the absolute differences along each feature',
    'The square root of the sum of squared differences',
    'The largest single difference across all features',
    'The straight-line length between the points',
    'The product of the differences along each feature'
  ],
  explain: 'Manhattan (city-block) distance adds up |Δx| + |Δy| — the path a taxi must drive on a street grid, no diagonals allowed.',
  widget: {
    type: 'metricMorph', title: 'The warehouse robot',
    world: 'A picking robot (R) must reach a shelf (S), but it can only drive along aisles — never diagonally through shelving. Slide the measuring rule and see which measurement matches the robot\'s real life.',
    a: {x:2,y:1}, aName: 'Robot', b: {x:7,y:8}, bName: 'Shelf', unit: 'aisle units',
    knob: { label: 'How distance is measured', min: 1, max: 2, step: 0.05, init: 2 },
    insights: [
      { max: 1.05, text: '🤯 At "streets only" the distance is simply across-difference + up-difference: 5 + 7 = 12. No square roots — just adding the two gaps.', tone: 'wow' },
      { max: 1.9, text: 'In between the two rules the number slides smoothly — you\'re watching one distance formula morph into another.', tone: 'info' },
      { max: 2, text: 'The straight line is shorter, but the robot can\'t drive through shelves. The RIGHT distance depends on how your world actually works.', tone: 'warn' }
    ],
    extreme: { at: 'min' },
    reveal: { name: 'Manhattan (city-block) distance', formula: 'd = |x₁−x₂| + |y₁−y₂|',
      text: 'Add the gaps along each axis — done. Named after Manhattan\'s street grid. KNN lets you pick whichever distance matches your world.' }
  }
},

/* E9 — odd k avoids ties */
{
  q: 'When classifying into two classes, why is an odd value of k (like 3 or 5) usually preferred?',
  choices: [
    'An odd number of voters can never split evenly, so there\'s always a winner',
    'Odd numbers make the distance calculations more precise',
    'Even values of k are computationally slower',
    'Odd k guarantees the prediction is correct more often',
    'The algorithm crashes if k is even'
  ],
  explain: 'With two classes and even k, the vote can tie (2–2, 3–3…) and the answer becomes arbitrary. Odd k makes a tie impossible.',
  widget: {
    type: 'scatterK', title: 'The hung jury',
    world: 'Shelter staff guess whether a blurry photo shows a cat or a dog. Slide k through BOTH odd and even values and keep an eye on the verdict box — something breaks only on some values.',
    classes: ['Cat', 'Dog'], xlab: 'ear pointiness', ylab: 'snout length',
    points: [{x:2.4,y:3,c:0},{x:3.6,y:2,c:0},{x:2,y:4.8,c:0},{x:4.4,y:4,c:0},{x:3,y:6,c:0},{x:7,y:6.6,c:1},{x:8,y:5.2,c:1},{x:6.4,y:8,c:1},{x:8.8,y:7.4,c:1},{x:6,y:5,c:1}],
    query: {x:5.1,y:4.9},
    knob: { label: 'Jury size (k)', min: 1, max: 8, step: 1, init: 1 },
    insights: [
      { max: 1, text: 'k = 1: a jury of one. Verdict guaranteed, wisdom not.', tone: 'info' },
      { max: 3, text: 'Try k = 2 and k = 3. Notice: one of them can end in a 1–1 stalemate, the other cannot.', tone: 'info' },
      { max: 8, text: '🤯 Every even jury size risks a dead heat — 2–2, 3–3, 4–4 — and then WHAT is the answer? Odd sizes never have this problem.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Odd k (tie avoidance)', formula: 'two classes + odd k → a tie is impossible',
      text: 'A two-class vote with an odd number of voters always has a majority. That\'s the whole reason k = 3, 5, 7 are the classic choices.' }
  }
},

/* E10 — huge k → majority class */
{
  q: 'If k is set equal to the total number of training points, what will KNN predict for ANY new point?',
  choices: [
    'Always the most common class in the training set, wherever the point is',
    'Always the class of the single nearest neighbour',
    'A random class, changing on every prediction',
    'It always refuses to predict when k is that large',
    'The class of the farthest point, since everything is included'
  ],
  explain: 'With k = n, every training point votes every time, so position stops mattering — the overall majority class wins everywhere.',
  widget: {
    type: 'scatterK', title: 'When everyone votes, nobody\'s local',
    world: 'An inbox has 12 labelled emails: 7 normal, 5 spam. A new email (◆) sits right in the middle of the spam cluster. Surely it\'s spam… now slowly raise k to the maximum and watch the verdict.',
    classes: ['Normal', 'Spam'], xlab: 'exclamation marks!!!', ylab: 'links per line',
    points: [{x:1.6,y:2,c:0},{x:2.8,y:1.4,c:0},{x:2,y:3.6,c:0},{x:3.6,y:2.8,c:0},{x:1.2,y:5,c:0},{x:4.2,y:1,c:0},{x:3,y:4.6,c:0},{x:7.6,y:7,c:1},{x:8.6,y:8.2,c:1},{x:6.8,y:8.8,c:1},{x:8,y:6,c:1},{x:9.2,y:7.6,c:1}],
    query: {x:8,y:7.6},
    knob: { label: 'Neighbours asked (k)', min: 1, max: 12, step: 1, init: 3 },
    insights: [
      { max: 5, text: 'The email sits deep in spam territory and the local vote says so, loudly.', tone: 'info' },
      { max: 9, text: 'Distant normal emails are now voting on an email nothing like them… the margin is shrinking.', tone: 'warn' },
      { max: 12, text: '🤯 k = 12: the verdict flipped to Normal — purely because normal emails outnumber spam 7–5 overall. Location has become irrelevant; only the global headcount matters.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'k = n → majority-class predictor', formula: 'k = n  →  every prediction = most common class',
      text: 'At maximum k, KNN collapses into "always guess the biggest class". All the useful information — WHERE the point is — has been averaged away.' }
  }
},

/* E11 — small k and noise */
{
  q: 'One training point has an incorrect (mislabeled) class, and a new point lands right next to it. Which setting is most likely to give the wrong prediction?',
  choices: [
    'k = 1 — the single bad neighbour decides everything',
    'k = 5 — more voters always means more errors',
    'Any k — a mislabeled point always causes a wrong prediction',
    'k = 7 — large k amplifies noise',
    'None — KNN automatically detects and removes bad labels'
  ],
  explain: 'With k = 1 the mislabeled point IS the whole vote. A larger k lets its correct neighbours outvote it.',
  widget: {
    type: 'scatterK', title: 'One bad label',
    world: 'A foraging app: mushrooms labelled by cap width and stem height. One mushroom (⚠) was labelled "edible" by mistake — it\'s deep in poisonous territory. Your unknown mushroom lands right beside it. Choose how many neighbours to trust.',
    classes: ['Edible', 'Poisonous'], xlab: 'cap width', ylab: 'stem height', flag: 4,
    points: [{x:2,y:2.6,c:0},{x:3.2,y:1.6,c:0},{x:1.4,y:4,c:0},{x:2.8,y:3.8,c:0},{x:7.2,y:6.8,c:0},{x:7.8,y:7.8,c:1},{x:6.4,y:6,c:1},{x:8.6,y:6.6,c:1},{x:7,y:8.6,c:1},{x:8.2,y:5.4,c:1}],
    query: {x:7.3,y:7.2},
    knob: { label: 'Neighbours trusted (k)', min: 1, max: 7, step: 2, init: 1 },
    insights: [
      { max: 1, text: '☠️ k = 1: your only advisor is the mislabeled mushroom. Verdict: "edible". Enjoy the hospital.', tone: 'warn' },
      { max: 3, text: 'k = 3: the bad label is now outvoted 2–1 by honest neighbours. The verdict flips to poisonous — correctly.', tone: 'info' },
      { max: 7, text: '🤯 One wrong label lost all its power the moment it needed friends to win a vote. Bigger juries forgive bad data.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Noise sensitivity of small k', formula: 'small k → each neighbour has huge power → noise hurts',
      text: 'k = 1 memorises every mistake in your data. Raising k averages mistakes away — the first taste of the bias–variance trade-off you\'ll meet at Level 2.' }
  }
},

/* E12 — feature scaling */
{
  q: 'A dataset has age (18–70) and salary (£20,000–£90,000). Using raw values, why does KNN behave badly?',
  choices: [
    'Salary\'s huge numbers dominate the distance, so age barely matters',
    'Age dominates the distance because it comes first in the data',
    'KNN cannot mix two features in one distance at all',
    'Salaries are private, so KNN ignores that column',
    'It behaves fine — KNN automatically balances feature ranges'
  ],
  explain: 'Distance adds raw differences: a £10,000 salary gap contributes ~10,000 while a 30-year age gap contributes 30. Salary drowns age unless you rescale.',
  widget: {
    type: 'scaleFeature', title: 'The shouting feature',
    world: 'Find the customer most similar to Priya (age 30, salary £42,000). Distance = age difference + salary difference. Right now salary is measured in raw pounds. Your knob shrinks salary\'s units — divide it by more and more, and watch who counts as "nearest".',
    aName: 'age', bName: 'salary',
    target: { name: 'Priya', a: 30, b: 42000 },
    cands: [
      { name: 'Sam · 31, £58k', a: 31, b: 58000 },
      { name: 'Leah · 29, £44k', a: 29, b: 44000 },
      { name: 'Marco · 58, £43k', a: 58, b: 43000 },
      { name: 'Ada · 33, £41k', a: 33, b: 41000 }
    ],
    knob: { label: 'Shrink salary units by', min: 0, max: 4, step: 0.25, init: 0 },
    insights: [
      { max: 0.5, text: 'Raw pounds: the salary bars (orange) are so long the age bars (blue) are invisible. Marco — 28 years OLDER — ranks as very similar because his salary is close. Age has no voice.', tone: 'warn' },
      { max: 2.5, text: 'As you shrink salary\'s units, the blue age differences finally become visible in the bars. Watch the NEAREST tag move.', tone: 'info' },
      { max: 4, text: '🤯 Now the OPPOSITE problem: salary is squashed to nothing and only age matters. Fair comparison lives in the middle — both features need similar-sized units.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Feature scaling (normalisation)', formula: 'x′ = (x − min) / (max − min)   ·   or   x′ = (x − μ) / σ',
      text: 'Before KNN, rescale every feature to a comparable range so each one gets a fair voice in the distance. Whichever feature has the biggest raw numbers otherwise wins by default.' }
  }
},

/* E13 — units change neighbours */
{
  q: 'You record commute distance in metres, then switch the same column to kilometres (÷1000) without rescaling anything else. What happens to unscaled KNN?',
  choices: [
    'The nearest neighbours can completely change, so predictions change too',
    'Nothing — distance is unitless, so predictions are identical',
    'Predictions only change if k also changes',
    'KNN throws an error because units are inconsistent',
    'Only the speed changes: smaller numbers compute faster'
  ],
  explain: 'Raw distances depend on units. Shrinking one feature ×1000 shrinks its influence ×1000, which can reshuffle who counts as "nearest".',
  widget: {
    type: 'scaleFeature', title: 'The unit prank',
    world: 'Match Jo with a gym buddy. Similarity = difference in weekly gym hours + difference in commute. Commute starts in METRES (huge numbers). Your knob converts its units step by step towards kilometres. Nobody\'s behaviour changes — only the units. Watch the "nearest" tag anyway.',
    aName: 'gym hours', bName: 'commute',
    target: { name: 'Jo', a: 6, b: 2400 },
    cands: [
      { name: 'Kit · 5h, 2.5km', a: 5, b: 2500 },
      { name: 'Bo · 13h, 2.4km', a: 13, b: 2450 },
      { name: 'Ana · 6h, 7km', a: 6.5, b: 7000 },
      { name: 'Raj · 7h, 3.1km', a: 7, b: 3100 }
    ],
    knob: { label: 'Shrink commute units by', min: 0, max: 4, step: 0.25, init: 0 },
    insights: [
      { max: 0.5, text: 'In metres, commute differences are in the THOUSANDS and gym hours differ by single digits. Bo — who trains 13 hours to Jo\'s 6 — is "nearest" just because his commute matches.', tone: 'warn' },
      { max: 2.75, text: 'Same people, same lives — you\'re only relabelling metres → kilometres. Yet the nearest neighbour changes. The data didn\'t move; the ruler did.', tone: 'info' },
      { max: 4, text: '🤯 A cosmetic unit change silently changed the prediction. Any algorithm that flips its answer when you rename m → km NEEDS scaling to be trusted.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Unit sensitivity', formula: 'raw distance changes when units change → scale first',
      text: 'KNN\'s distances live in the units you happened to record. Standardising features (mean 0, spread 1) makes the answer unit-proof.' }
  }
},

/* E14 — KNN regression */
{
  q: 'How does KNN predict in a regression problem (predicting a number, like a price)?',
  choices: [
    'It averages the values of the k nearest neighbours',
    'It takes a majority vote among the k neighbours\' values',
    'It fits a straight line through the k nearest neighbours',
    'It returns the value of the farthest neighbour',
    'It multiplies the neighbours\' values together'
  ],
  explain: 'For numeric targets there\'s nothing to "vote" on — KNN outputs the mean (sometimes median) of the k nearest values.',
  widget: {
    type: 'knnRegress', title: 'Price my flat',
    world: 'You\'re selling a 52 m² flat and have 12 recent sales nearby, plotted by size → price. There\'s no formula — just comparable sales. Your knob: how many of the closest-in-size sales to average.',
    xlab: 'flat size', ylab: 'sale price (£k)', itemName: 'sales', prefix: '£', unit: 'k', decimals: 0,
    points: [{x:1,y:118},{x:1.8,y:132},{x:2.6,y:151},{x:3.4,y:160},{x:4.2,y:178},{x:5,y:196},{x:5.8,y:214},{x:6.6,y:222},{x:7.4,y:248},{x:8.2,y:255},{x:9,y:276},{x:9.8,y:295}],
    qx: 5.2,
    knob: { label: 'Comparable sales averaged (k)', min: 1, max: 12, step: 1, init: 3 },
    insights: [
      { max: 1, text: 'One comparable: your "valuation" is literally one neighbour\'s price, quirks included.', tone: 'warn' },
      { max: 6, text: 'Averaging a handful of similar-sized sales gives a steadier price. Note: it\'s an AVERAGE, not a vote — the output is a number.', tone: 'info' },
      { max: 12, text: '🤯 Averaging ALL sales — including studios and penthouses — your "valuation" became the citywide average price, useless for YOUR flat. The prediction line went totally flat.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'KNN regression', formula: 'ŷ = mean( values of k nearest neighbours )',
      text: 'Same neighbour-finding, different combiner: vote for classes, average for numbers. Estate agents call it "comparables" — you\'ve used KNN regression all along.' }
  }
},

/* E15 — regression with k = n → global mean */
{
  q: 'In KNN regression, what happens to predictions as k approaches the size of the whole training set?',
  choices: [
    'Every prediction approaches the overall average of all training values',
    'Predictions become perfectly accurate',
    'Every prediction approaches zero',
    'Predictions start following the single nearest neighbour exactly',
    'The predictions oscillate more and more wildly'
  ],
  explain: 'Averaging over everyone gives the same number everywhere: the global mean. The prediction curve flattens into a horizontal line.',
  widget: {
    type: 'knnRegress', title: 'The flatline machine',
    world: 'A pizza chain predicts delivery time from distance, using its 12 past deliveries. Watch the purple prediction LINE (not just the number) as you crank k — its shape is the whole story.',
    xlab: 'delivery distance', ylab: 'minutes', itemName: 'deliveries', unit: 'min', decimals: 0,
    points: [{x:0.8,y:12},{x:1.6,y:15},{x:2.4,y:14},{x:3.2,y:19},{x:4,y:23},{x:4.8,y:26},{x:5.6,y:24},{x:6.4,y:31},{x:7.2,y:34},{x:8,y:33},{x:8.8,y:39},{x:9.6,y:42}],
    qx: 2,
    knob: { label: 'Deliveries averaged (k)', min: 1, max: 12, step: 1, init: 1 },
    insights: [
      { max: 2, text: 'Tiny k: the line hugs every individual delivery, jagged and twitchy.', tone: 'info' },
      { max: 8, text: 'The line is smoothing out — nearby deliveries blur together. Useful smoothing… up to a point.', tone: 'info' },
      { max: 12, text: '🤯 k = 12: the line is perfectly FLAT. A 1-block delivery and a 10-block delivery get the same estimate: the overall average. The model has stopped listening to distance entirely.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'k → n collapses to the global mean', formula: 'k = n  →  ŷ = mean(all values), everywhere',
      text: 'Maximum smoothing = no pattern left. Between "copy one noisy neighbour" (k=1) and "same answer for everyone" (k=n) lies the sweet spot — finding it is what tuning k means.' }
  }
},

/* E16 — supervised learning */
{
  q: 'Before KNN can classify anything, what must its stored training examples have?',
  choices: [
    'Known labels — each stored example must already be classified',
    'At least 1,000 rows, or the vote is invalid',
    'Perfectly equal numbers of every class',
    'A trend line fitted through them in advance',
    'Nothing — KNN can label points using unlabelled data alone'
  ],
  explain: 'KNN is supervised: the vote only works because each neighbour brings a known label with it. Unlabelled neighbours would have nothing to vote with.',
  widget: {
    type: 'scatterK', title: 'The botanist\'s gift',
    world: 'A botanist spent a week hand-labelling 10 orchids by petal length and colour depth — that labour is the ONLY reason this works. A new orchid arrives. As you drag, remember: every vote you\'re counting is a label a human once wrote down.',
    classes: ['Orchid A', 'Orchid B'], xlab: 'petal length', ylab: 'colour depth',
    points: [{x:1.8,y:3,c:0},{x:3,y:2,c:0},{x:2.4,y:4.4,c:0},{x:4,y:3.6,c:0},{x:3.4,y:5.2,c:0},{x:6.8,y:7,c:1},{x:8,y:6,c:1},{x:7.2,y:8.4,c:1},{x:8.8,y:7.6,c:1},{x:6.2,y:5.8,c:1}],
    query: {x:5.2,y:5.2},
    knob: { label: 'Labelled orchids consulted (k)', min: 1, max: 10, step: 1, init: 3 },
    insights: [
      { max: 4, text: 'Each line you add pulls in one more LABELLED example. Imagine the dots were grey with no labels — the vote box below would be empty.', tone: 'info' },
      { max: 8, text: 'The algorithm contributes distance-measuring and counting. All the KNOWLEDGE is in the human-made labels.', tone: 'info' },
      { max: 10, text: '🤯 Even asking all 10, you\'re never doing more than recycling the botanist\'s week of work. No labels → no KNN. That\'s what "supervised learning" means.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Supervised learning', formula: 'training data = (features, LABEL) pairs',
      text: 'KNN learns from examples that come with answers attached. Algorithms that find structure in unlabelled data exist too — that\'s unsupervised learning (like clustering), a different game.' }
  }
},

/* E17 — small k, jagged boundary */
{
  q: 'How does the decision boundary of KNN typically change as k gets smaller?',
  choices: [
    'It becomes more jagged and wiggly, bending around individual points',
    'It becomes smoother and straighter',
    'It disappears entirely below k = 5',
    'It always becomes a perfect circle around the data',
    'It doesn\'t change — the boundary only depends on the data'
  ],
  explain: 'Small k lets single points carve out their own little territories, so the border between classes wiggles around individuals. Larger k smooths it out.',
  widget: {
    type: 'boundaryK', title: 'The border dispute',
    world: 'Two rival ice-cream vans serve a park; each dot is a spot where a customer chose Van Blue or Van Orange. The shading shows which van a NEW customer at each spot would be predicted to choose. Drag k and watch the shape of the border itself.',
    classes: ['Van Blue', 'Van Orange'], xlab: 'east–west', ylab: 'north–south',
    points: [{x:1.5,y:2,c:0},{x:2.5,y:3.5,c:0},{x:1,y:5,c:0},{x:3,y:6,c:0},{x:2,y:7.5,c:0},{x:4,y:1.5,c:0},{x:6.5,y:8,c:0},{x:7,y:2.5,c:1},{x:8.5,y:3.5,c:1},{x:6.5,y:4.5,c:1},{x:8,y:6,c:1},{x:9,y:7.5,c:1},{x:5.5,y:5.5,c:1},{x:4.5,y:8.5,c:1}],
    knob: { label: 'Neighbours per prediction (k)', min: 1, max: 13, step: 2, init: 13 },
    insights: [
      { max: 3, text: '🤯 At tiny k the map shatters: lone dots carve out private islands of territory, and the wiggliness number jumps. One customer = one kingdom.', tone: 'wow' },
      { max: 7, text: 'Middle k: the border follows the real shape of the two crowds without obsessing over individuals.', tone: 'info' },
      { max: 13, text: 'Huge k: one giant smooth split. Simple — maybe too simple to respect the pockets where orange customers really live.', tone: 'warn' }
    ],
    extreme: { at: 'min' },
    reveal: { name: 'Decision boundary vs k', formula: 'small k → jagged, local border · large k → smooth, global border',
      text: 'The invisible line where the prediction flips is the decision boundary. k is a smoothness dial for that line — you just watched it morph.' }
  }
},

/* E18 — k=1 train accuracy illusion */
{
  q: 'You evaluate 1-NN on the SAME data it was trained on and get 100% accuracy. What\'s going on?',
  choices: [
    'Each point\'s nearest neighbour is itself, so the score is meaningless',
    'The model is genuinely perfect and ready to ship',
    'The dataset must have no noise at all',
    'Accuracy was computed backwards',
    'k = 1 always gives 100% on any dataset, seen or unseen'
  ],
  explain: 'Asked about a training point, 1-NN finds that exact point at distance 0 and copies its own label — a perfect score by cheating, saying nothing about new data.',
  widget: {
    type: 'trainTestK', title: 'The open-book exam',
    world: 'A student "trains" on 10 flashcards (circles), then sits two exams: one re-using those flashcards, one with 6 brand-new questions (squares). Compare the two bars as you change k — especially at k = 1.',
    classes: ['Ships', 'Icebergs'], xlab: 'radar blob size', ylab: 'brightness',
    train: [{x:2,y:3,c:0},{x:3,y:1.8,c:0},{x:1.4,y:4.6,c:0},{x:3.8,y:3.4,c:0},{x:2.6,y:6,c:0},{x:7,y:6.6,c:1},{x:8.2,y:5.4,c:1},{x:6.4,y:8,c:1},{x:8.8,y:7.4,c:1},{x:5.6,y:5,c:1}],
    test: [{x:2.4,y:2.2,c:0},{x:4.6,y:4.2,c:0},{x:3.2,y:5.2,c:0},{x:7.6,y:7.8,c:1},{x:5.2,y:6.6,c:1},{x:6.8,y:4.4,c:1}],
    knob: { label: 'Neighbours asked (k)', min: 1, max: 9, step: 2, init: 1 },
    insights: [
      { max: 1, text: '🤯 k = 1: the top bar is 100% — every flashcard\'s closest neighbour is ITSELF, sitting at distance zero. The bottom bar tells the honest story.', tone: 'wow' },
      { max: 5, text: 'With more voters, self-recognition can be outvoted, and the two bars drift toward each other — the exam scores start being comparable.', tone: 'info' },
      { max: 9, text: 'The gap between the bars is the "memorising vs understanding" gap. Only the NEW-cases bar predicts real-world performance.', tone: 'warn' }
    ],
    extreme: { at: 'min' },
    reveal: { name: 'Training accuracy is not performance', formula: '1-NN on training data: nearest neighbour = the point itself → 100%',
      text: 'Scoring a memoriser on questions it memorised proves nothing. This is why data scientists never trust training accuracy — the next question shows what they use instead.' }
  }
},

/* E19 — held-out test set */
{
  q: 'What\'s the standard way to get an honest estimate of how well a KNN model will do on future data?',
  choices: [
    'Hold back some labelled data during training and score the model on it',
    'Score the model on the data it trained on — more data, better estimate',
    'Ask the model how confident it feels on average',
    'Use k = 1, which is always the most accurate',
    'Check whether the training data looks clean'
  ],
  explain: 'A held-out test set simulates the future: labelled examples the model has never seen. Its score there is an honest preview of real-world performance.',
  widget: {
    type: 'trainTestK', title: 'The dress rehearsal',
    world: 'A clinic\'s model flags scans as routine or urgent. It trained on 10 old scans (circles). Before going live, the team quietly kept back 6 labelled scans it NEVER saw (squares) — a dress rehearsal for reality. Tune k using the honest bar.',
    classes: ['Routine', 'Urgent'], xlab: 'shadow size', ylab: 'edge sharpness',
    train: [{x:1.8,y:2.4,c:0},{x:3,y:3.6,c:0},{x:2.2,y:5,c:0},{x:4.2,y:2,c:0},{x:3.6,y:6.2,c:0},{x:7.4,y:7,c:1},{x:8.6,y:5.8,c:1},{x:6.6,y:8.2,c:1},{x:9,y:7.8,c:1},{x:6,y:6,c:1}],
    test: [{x:2.8,y:3,c:0},{x:4.8,y:5,c:0},{x:1.6,y:6,c:0},{x:7.8,y:8.4,c:1},{x:5.4,y:7,c:1},{x:8.2,y:4.6,c:1}],
    knob: { label: 'Neighbours asked (k)', min: 1, max: 9, step: 2, init: 1 },
    insights: [
      { max: 1, text: 'Top bar says perfection. If the team believed it, they\'d ship a model that\'s never faced a new scan.', tone: 'warn' },
      { max: 5, text: 'The bottom bar — scans the model never saw — is the only number that predicts how it behaves on next week\'s patients.', tone: 'info' },
      { max: 9, text: '🤯 Notice you\'ve been choosing k by looking at the NEW-cases bar. That\'s exactly how practitioners tune k: pick the one that wins the dress rehearsal, not the open-book exam.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Train/test split', formula: 'fit on the training set · judge on the held-out test set',
      text: 'Splitting your labelled data (e.g. 80/20) buys you an honest preview of the future. Every serious evaluation you\'ll ever run starts with this move.' }
  }
},

/* E20 — classification vs regression outputs */
{
  q: 'What\'s the difference between what KNN outputs for classification versus regression?',
  choices: [
    'Classification outputs a category from a vote; regression outputs a number from an average',
    'Classification outputs a number; regression outputs a category',
    'There is no difference — both output probabilities',
    'Regression outputs the value of k; classification outputs a distance',
    'Classification averages labels; regression takes a majority vote'
  ],
  explain: 'Same neighbour-finding, different combiner: categories get voted on, numbers get averaged.',
  widget: {
    type: 'knnRegress', title: 'Guess my rating',
    world: 'You haven\'t rated a new song, but 12 songs with similar tempo have ratings from 0–10 stars. Notice the output here is a NUMBER on a sliding scale — nothing like "spam vs not spam". That difference is the whole question.',
    xlab: 'tempo', ylab: 'your rating (stars)', itemName: 'songs', unit: '★', decimals: 1,
    points: [{x:0.6,y:8.6},{x:1.4,y:8.1},{x:2.2,y:7.2},{x:3,y:7.6},{x:3.8,y:6},{x:4.6,y:5.2},{x:5.4,y:5.6},{x:6.2,y:4},{x:7,y:3.2},{x:7.8,y:3.6},{x:8.6,y:2.2},{x:9.4,y:1.6}],
    qx: 4.1,
    knob: { label: 'Similar songs averaged (k)', min: 1, max: 12, step: 1, init: 3 },
    insights: [
      { max: 3, text: 'The prediction is 6.3★, 5.9★… decimals! You can\'t "vote" your way to 6.3 — averaging is the only combiner that makes sense for numbers.', tone: 'info' },
      { max: 8, text: 'If these dots were labelled "like/dislike" instead, the same neighbours would VOTE and the output would be a category. Neighbour-finding identical; only the last step differs.', tone: 'info' },
      { max: 12, text: '🤯 Cranked to all 12 songs, the average slides to your overall mean rating — the regression version of "always predict the majority class".', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Vote vs average', formula: 'classification: mode(labels) · regression: mean(values)',
      text: 'One algorithm, two final steps. Ask "is the target a category or a quantity?" and you know which combiner — and which kind of problem — you have.' }
  }
},

/* E21 — numeric features required */
{
  q: 'Why can\'t KNN work directly on raw text categories like "rock", "jazz", "pop"?',
  choices: [
    'Distance needs numbers — you must first encode categories numerically',
    'Text takes too much memory to store',
    'KNN only works on images',
    'Categories are illegal in supervised learning',
    'It can — KNN computes the distance between words alphabetically'
  ],
  explain: 'KNN\'s core operation is arithmetic on feature values (subtract, square, add). "rock − jazz" means nothing until you represent each item as numbers.',
  widget: {
    type: 'metricMorph', title: 'Turning songs into places',
    world: 'How far apart are two songs? Meaningless — until you MEASURE each one: tempo and loudness turn "Song A" and "Song B" into two points on a map. Only now can a distance exist. Slide the measuring rule between the two classic ways to compute it.',
    a: {x:2,y:6}, aName: 'Song A (slow, loud)', b: {x:8,y:3}, bName: 'Song B (fast, soft)', unit: 'units apart',
    knob: { label: 'How distance is measured', min: 1, max: 2, step: 0.05, init: 2 },
    insights: [
      { max: 1.05, text: 'City-block rule: add the tempo gap and the loudness gap. Every part of this is arithmetic on NUMBERS the songs were converted into.', tone: 'info' },
      { max: 1.9, text: 'Try to imagine this slider working on the words "rock" and "jazz". Subtract WHAT from what? No numbers, no distance, no KNN.', tone: 'warn' },
      { max: 2, text: '🤯 The entire trick of KNN happened before the algorithm ran: describing each item with numbers so that "similar" becomes "close on a map".', tone: 'wow' }
    ],
    extreme: { at: 'min' },
    reveal: { name: 'Feature vectors (numeric encoding)', formula: 'item → (x₁, x₂, …, xₙ) → distances become computable',
      text: 'Turning things into lists of numbers is called feature engineering; categories get encoded (e.g. one-hot). KNN — like most ML — lives entirely in that numeric space.' }
  }
},

/* E22 — weighted KNN: closer neighbours, more say */
{
  q: 'In distance-weighted KNN, how is the neighbours\' vote changed?',
  choices: [
    'Closer neighbours get more influence; distant ones get less',
    'All k neighbours always get exactly one vote each',
    'Distant neighbours get more influence, since they add diversity',
    'Only neighbours of the majority class may vote',
    'The weights are random so predictions vary'
  ],
  explain: 'Weighted KNN scales each vote by closeness (often 1/distance): a next-door neighbour speaks louder than one at the edge of the neighbourhood.',
  widget: {
    type: 'voteWeight', title: 'Whisper or megaphone',
    world: 'Five neighbours already found for a new patient\'s diagnosis — two are very close matches, three are only vaguely similar. Right now everyone\'s voice is equal. Your knob turns up how much CLOSENESS amplifies a voice. Watch the circles and the verdict.',
    classes: ['Condition A', 'Condition B'],
    neighbors: [
      { name: 'twin case', d: 0.5, c: 0 },
      { name: 'close case', d: 0.8, c: 0 },
      { name: 'vague case 1', d: 3.0, c: 1 },
      { name: 'vague case 2', d: 3.4, c: 1 },
      { name: 'vague case 3', d: 3.8, c: 1 }
    ],
    knob: { label: 'How much closeness amplifies a vote', min: 0, max: 4, step: 0.1, init: 0 },
    insights: [
      { max: 0.05, text: 'Equal say: the three vague cases win 3–2, purely on headcount. But two of the voters barely resemble the patient…', tone: 'warn' },
      { max: 1.5, text: 'The close matches\' circles are swelling — their votes now count for more than one hand each.', tone: 'info' },
      { max: 4, text: '🤯 The verdict FLIPPED: two near-twins outvoted three strangers. Weighting by distance rebalanced the committee toward the most relevant evidence.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Distance-weighted KNN', formula: 'weight = 1 / distance (or 1/d²) · verdict = biggest weighted total',
      text: 'Instead of one-point-one-vote, each neighbour\'s vote is scaled by closeness. It softens the choice of k and respects that not all neighbours are equally relevant.' }
  }
},

/* E23 — breaking ties with weights */
{
  q: 'k = 4 produces a 2–2 tie between two classes. Which is a principled way to break it?',
  choices: [
    'Weight the votes by distance so the closer pair wins',
    'Always pick the class listed first alphabetically',
    'Report both classes as the answer',
    'Double k to 8 and hope the tie disappears',
    'Delete one of the four neighbours from the dataset'
  ],
  explain: 'A tie in headcount usually isn\'t a tie in evidence: weighting by distance lets the closer neighbours settle it meaningfully rather than arbitrarily.',
  widget: {
    type: 'voteWeight', title: 'Courtroom deadlock',
    world: 'A handwriting reader must decide: is this scribble a "4" or a "9"? Its four neighbours split 2–2 — deadlock. But look at the distances: the two "4" examples are much closer matches. Turn the knob and let closeness testify.',
    classes: ['It\'s a 4', 'It\'s a 9'],
    neighbors: [
      { name: 'neat 4', d: 0.7, c: 0 },
      { name: 'scruffy 4', d: 1.0, c: 0 },
      { name: 'curly 9', d: 2.6, c: 1 },
      { name: 'faint 9', d: 3.2, c: 1 }
    ],
    knob: { label: 'How much closeness amplifies a vote', min: 0, max: 4, step: 0.1, init: 0 },
    insights: [
      { max: 0.05, text: '2–2. With equal votes the algorithm would have to guess — flip a coin in a courtroom.', tone: 'warn' },
      { max: 1, text: 'The moment closeness matters even slightly, the deadlock breaks — and not randomly: it breaks toward the stronger evidence.', tone: 'info' },
      { max: 4, text: '🤯 The two nearby "4"s dominate completely. Same four voters, but the tie resolved itself the instant votes carried evidence-weight instead of headcount.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Tie-breaking via distance weights', formula: 'tie in counts → compare summed 1/d weights',
      text: 'Odd k avoids ties; weights dissolve them. Most libraries offer both (e.g. weights="distance") — now you know what that setting is actually doing.' }
  }
},

/* E24 — k bounded by n */
{
  q: 'A training set contains 6 examples. What\'s the largest value k can meaningfully take?',
  choices: [
    '6 — you can\'t consult more neighbours than exist',
    '36 — k can be any perfect square',
    '5 — k must always be strictly less than n minus one',
    '12 — k may double the dataset by reusing points',
    'Unlimited — missing neighbours are simulated'
  ],
  explain: 'Neighbours are real stored examples: with 6 points, "the 7 nearest" doesn\'t exist. k ranges from 1 to n.',
  widget: {
    type: 'scatterK', title: 'A very small village',
    world: 'A tiny startup has labelled only 6 support tickets: solved-by-FAQ vs needs-a-human. A new ticket arrives. Drag k to its ceiling — then imagine dragging further. Where would voter #7 even come from?',
    classes: ['FAQ fixes it', 'Needs a human'], xlab: 'message length', ylab: 'anger level',
    points: [{x:2,y:2,c:0},{x:3.4,y:1.4,c:0},{x:1.6,y:3.8,c:0},{x:7,y:7.4,c:1},{x:8.4,y:6.2,c:1},{x:6.4,y:8.6,c:1}],
    query: {x:5,y:5},
    knob: { label: 'Neighbours asked (k)', min: 1, max: 6, step: 1, init: 2 },
    insights: [
      { max: 3, text: 'Six villagers total. Each notch of k recruits one more of them into the vote.', tone: 'info' },
      { max: 5, text: 'Nearly everyone is voting already. There\'s no reserve of extra neighbours hiding somewhere.', tone: 'info' },
      { max: 6, text: '🤯 The slider ENDS at 6. Not a design choice — a law: neighbours are stored examples, and you own exactly six. k lives between 1 and n.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'k ≤ n', formula: '1 ≤ k ≤ number of training examples',
      text: 'k counts real, stored data points. Small datasets therefore cap k hard — one of many reasons tiny training sets limit what KNN can do.' }
  }
},

/* E25 — non-parametric / no equation */
{
  q: 'After training, a linear model keeps a small equation and can throw the data away. What does KNN keep?',
  choices: [
    'The entire training dataset — that IS the model',
    'Just the value of k and nothing else',
    'A compact formula with one weight per feature',
    'Only the average point of each class',
    'A compressed 10-row summary of the data'
  ],
  explain: 'KNN never distils the data into parameters. Its "model" is the memorised dataset itself, consulted from scratch at every prediction.',
  widget: {
    type: 'speedLazy', title: 'Two rival forecasters',
    world: 'Two weather forecasters: one studies history and writes a one-line formula (then recycles the archive); the other keeps EVERY past day on file and, each morning, hunts for the most similar days ever recorded. You\'re growing the second one\'s archive.',
    itemName: 'past days', storeLabel: 'The archive KNN must keep', knobMax: 30000,
    knob: { label: 'Days of weather history stored', min: 100, max: 30000, step: 100, init: 1000 },
    insights: [
      { max: 5000, text: 'The formula-forecaster\'s storage: one line, forever. Our archive-forecaster\'s storage: this ever-growing pile — deleting it would delete the model.', tone: 'info' },
      { max: 20000, text: 'More archive = potentially smarter matches, but the pile IS the model. There\'s no equation to extract, no summary to ship.', tone: 'info' },
      { max: 30000, text: '🤯 30,000 days stored and still not one line of "learned formula" exists. The memory requirement and the look-up work grow with the data, forever.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Non-parametric model', formula: 'model size grows with data (vs fixed parameters)',
      text: 'Models like linear regression compress data into a fixed set of parameters. KNN is non-parametric: its complexity and storage scale with the dataset itself.' }
  }
},

/* E26 — the fix: normalisation */
{
  q: 'A fitness app uses daily steps (0–20,000) and sleep hours (0–12) in KNN. What should you do before computing distances?',
  choices: [
    'Rescale both features to a comparable range, e.g. 0–1',
    'Delete the smaller feature — sleep clearly matters less',
    'Multiply steps by 1,000 so it matters even more',
    'Nothing — KNN handles different ranges automatically',
    'Sort the dataset by steps first'
  ],
  explain: 'Normalising (min-max to 0–1) or standardising (z-scores) puts steps and sleep on equal footing so both genuinely influence who counts as similar.',
  widget: {
    type: 'scaleFeature', title: 'Steps shout, sleep whispers',
    world: 'Match Dev (8,000 steps, 8h sleep) with the most similar user. Distance = step difference + sleep difference, in raw units. One knob shrinks the step counts toward a 0–1-ish scale. Watch who\'s "most similar" while you do it.',
    aName: 'sleep', bName: 'steps',
    target: { name: 'Dev', a: 8, b: 8000 },
    cands: [
      { name: 'Mia · 8.2h, 12k steps', a: 8.2, b: 12000 },
      { name: 'Tom · 3h, 8.3k steps', a: 3, b: 8300 },
      { name: 'Zoe · 7.5h, 9k steps', a: 7.5, b: 9000 },
      { name: 'Ben · 8h, 15k steps', a: 8.1, b: 15000 }
    ],
    knob: { label: 'Shrink step units by', min: 0, max: 4, step: 0.25, init: 0 },
    insights: [
      { max: 0.5, text: 'Raw units: Tom sleeps 3 HOURS to Dev\'s 8 — a totally different lifestyle — yet ranks most similar because his step count is close. Sleep\'s voice is 0.006% of the conversation.', tone: 'warn' },
      { max: 2.75, text: 'Shrinking the step numbers lets sleep\'s blue bars finally register. Somewhere along here the ranking flips to someone who actually lives like Dev.', tone: 'info' },
      { max: 4, text: '🤯 Too far! Steps are now silenced and ONLY sleep matters. The goal isn\'t to mute the big feature — it\'s equal microphones: that\'s what normalising to 0–1 does.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Min-max normalisation', formula: 'x′ = (x − min) / (max − min)  →  every feature lives in [0, 1]',
      text: 'Rescaling both features to [0,1] gives each an equal microphone. Standardisation (z-scores) is the other classic option. For KNN, one of them is almost always step one.' }
  }
},

/* E27 — large k underfits / blurs pattern */
{
  q: 'The data genuinely contains a small pocket of one class inside the other\'s region. What does a very large k do to that pocket?',
  choices: [
    'Smooths right over it — the pocket gets outvoted and vanishes from predictions',
    'Preserves it perfectly — large k respects fine detail',
    'Enlarges the pocket beyond its real size',
    'Moves the pocket to a different part of the map',
    'Splits the pocket into several smaller ones'
  ],
  explain: 'A large k asks so many (mostly outside) neighbours that the pocket\'s few residents are always outvoted: real structure gets blurred away. That\'s underfitting.',
  widget: {
    type: 'boundaryK', title: 'The village in the forest',
    world: 'A map of land use: forest, with a genuine small village in the middle — real houses, not noise. The shading shows what the model predicts at every spot. Crank k up and watch what happens to the village on the map.',
    classes: ['Village', 'Forest'], xlab: 'east–west', ylab: 'north–south',
    points: [{x:4.6,y:4.6,c:0},{x:5.4,y:5.2,c:0},{x:5,y:4,c:0},{x:4.2,y:5.4,c:0},{x:1,y:1.4,c:1},{x:2.2,y:8.6,c:1},{x:8.8,y:1.8,c:1},{x:9,y:8.8,c:1},{x:1.4,y:5,c:1},{x:5,y:9,c:1},{x:8.6,y:5,c:1},{x:5,y:0.8,c:1},{x:2.6,y:2.8,c:1},{x:7.4,y:7.6,c:1},{x:7,y:2.6,c:1}],
    knob: { label: 'Neighbours per prediction (k)', min: 1, max: 15, step: 2, init: 1 },
    insights: [
      { max: 3, text: 'Small k: the village shows up clearly on the prediction map — the model can represent it.', tone: 'info' },
      { max: 9, text: 'The blue patch is shrinking… villagers keep getting outvoted by the forest all around them.', tone: 'warn' },
      { max: 15, text: '🤯 The village is GONE from the map — yet its houses are still right there in the data. Huge k didn\'t just smooth noise; it erased true structure. That\'s underfitting.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Underfitting (too-large k)', formula: 'k too big → real local patterns get outvoted → oversmoothing',
      text: 'k tunes smoothing: too small memorises noise (overfitting), too large erases genuine detail (underfitting). Choosing k is choosing how much detail you believe.' }
  }
},

/* E28 — the similarity assumption */
{
  q: 'Which everyday assumption is KNN quietly betting everything on?',
  choices: [
    'Things that are similar tend to belong to the same category',
    'Bigger datasets always contain better examples',
    'The future is completely unpredictable',
    'Every category appears equally often',
    'Recent data matters more than old data'
  ],
  explain: '"Birds of a feather flock together": KNN assumes closeness in feature space implies sameness of label. When that\'s false, KNN fails.',
  widget: {
    type: 'scatterK', title: 'Birds of a feather',
    world: 'Houses on a street, plotted by garden size and building age; colours show heating type. You know NOTHING about the purple house except where it sits. Feel how confident the vote is here — where similar really does mean same.',
    classes: ['Gas heated', 'Heat pump'], xlab: 'garden size', ylab: 'building age',
    points: [{x:1.6,y:7.4,c:0},{x:2.8,y:8.2,c:0},{x:2.2,y:6.2,c:0},{x:3.6,y:7,c:0},{x:1.2,y:8.8,c:0},{x:7,y:2.6,c:1},{x:8.2,y:3.4,c:1},{x:6.6,y:1.6,c:1},{x:8.8,y:2,c:1},{x:7.6,y:4.2,c:1}],
    query: {x:2.6,y:7.6},
    knob: { label: 'Neighbours asked (k)', min: 1, max: 10, step: 1, init: 1 },
    insights: [
      { max: 5, text: 'Every neighbour you add agrees. The purple house sits in a tight cluster where "nearby" really does mean "alike" — KNN\'s home turf.', tone: 'info' },
      { max: 8, text: 'Still unanimous. When the world is clustered like this, even the choice of k barely matters.', tone: 'info' },
      { max: 10, text: '🤯 Only at k = 10 do the far-away heat-pump houses even get a voice — and they\'re outvoted. Now imagine labels sprinkled at random: no k would help. KNN works exactly as well as "near = alike" is true.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'The smoothness (locality) assumption', formula: 'close in features ⇒ (probably) same label',
      text: 'Every ML method bets on some assumption. KNN\'s bet is locality. Feature engineering is largely the art of building a space where that bet pays off.' }
  }
},

/* E29 — the prediction recipe */
{
  q: 'Put KNN\'s prediction steps in the right order.',
  choices: [
    'Measure distance to every stored point → keep the k smallest → combine their labels',
    'Keep the k smallest distances → measure them → vote',
    'Vote among all points → keep the k winners → measure their distances',
    'Pick k random points → measure distances → vote',
    'Measure distance to k points only → keep them all → average the distances'
  ],
  explain: 'Rank ALL stored points by distance first — only then can you know which k are nearest. The vote (or average) is always the final step.',
  widget: {
    type: 'scatterK', title: 'Watch the recipe run',
    world: 'A café guesses if a new customer will order tea or coffee, based on 9 regulars (plotted by arrival time and pastry orders). Every number you see on a line was computed FIRST, for everyone — then the smallest k get recruited, in order. Drag slowly and watch recruitment happen.',
    classes: ['Tea', 'Coffee'], xlab: 'arrival time', ylab: 'pastries per week', showDists: true,
    points: [{x:2.2,y:2.4,c:0},{x:3.4,y:1.6,c:0},{x:1.8,y:4,c:0},{x:4,y:3.2,c:0},{x:6.8,y:7,c:1},{x:8,y:6,c:1},{x:6.2,y:8.4,c:1},{x:8.6,y:7.8,c:1},{x:5.4,y:6.2,c:1}],
    query: {x:4.8,y:4.8},
    knob: { label: 'Step 2: keep the k closest', min: 1, max: 9, step: 1, init: 1 },
    insights: [
      { max: 3, text: 'Step 1 already happened before you touched anything: a distance to EVERY regular. Your slider is step 2 — keeping the smallest ones, always in ascending order.', tone: 'info' },
      { max: 6, text: 'Notice recruitment order never skips: 3rd closest joins before 4th closest, guaranteed. The final verdict box is step 3: combine the kept labels.', tone: 'info' },
      { max: 9, text: '🤯 Measure all → keep k smallest → combine. You just ran the entire algorithm by hand, three steps, no magic anywhere.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'The KNN prediction recipe', formula: '1) distances to all n points · 2) sort, take k nearest · 3) vote / average',
      text: 'That\'s the whole algorithm — which is why KNN is often the first classifier anyone learns, and why all its costs live at prediction time.' }
  }
},

/* E30 — classification task recognition */
{
  q: 'Which of these tasks would use KNN classification (rather than KNN regression)?',
  choices: [
    'Deciding whether a loan application is approved or rejected',
    'Predicting tomorrow\'s temperature in °C',
    'Estimating a house\'s sale price',
    'Predicting how many minutes a delivery will take',
    'Estimating a student\'s exam percentage'
  ],
  explain: 'Approve/reject is a choice between categories → classification (vote). All the others predict a quantity → regression (average).',
  widget: {
    type: 'scatterK', title: 'Approve or reject?',
    world: 'A lender compares each new application with 10 past ones, plotted by income and existing debt. The outcome isn\'t a number to estimate — it\'s a fork in the road: approve or reject. Feel how the vote answers a yes/no question.',
    classes: ['Approved', 'Rejected'], xlab: 'income', ylab: 'existing debt',
    points: [{x:6.8,y:2.4,c:0},{x:8,y:3.2,c:0},{x:7.4,y:1.4,c:0},{x:8.8,y:2,c:0},{x:6.2,y:3.8,c:0},{x:2.4,y:7,c:1},{x:3.6,y:8,c:1},{x:1.6,y:6.2,c:1},{x:2.8,y:8.8,c:1},{x:4.2,y:6.6,c:1}],
    query: {x:5.2,y:5},
    knob: { label: 'Past applications consulted (k)', min: 1, max: 10, step: 1, init: 3 },
    insights: [
      { max: 4, text: 'The output is always one of exactly two words — approve or reject. No decimals, no in-between. That\'s the signature of classification.', tone: 'info' },
      { max: 8, text: 'Compare: predicting the loan AMOUNT would need an average of numbers. Predicting the loan DECISION needs a vote between categories. Same neighbours, different question.', tone: 'info' },
      { max: 10, text: '🤯 Even with every applicant voting, the answer stays a category. The task decides the output type — "which kind?" → classify, "how much?" → regress.', tone: 'wow' }
    ],
    extreme: { at: 'max' },
    reveal: { name: 'Classification vs regression (task framing)', formula: '"which category?" → vote · "how much?" → average',
      text: 'Before choosing any algorithm setting, name your target: category or quantity. Every downstream choice — including KNN\'s final combining step — follows from that.' }
  }
}
];
