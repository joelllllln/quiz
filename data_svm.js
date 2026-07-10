/* Support Vector Machines — Part I: Foundations. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).svm1 = [

{
  q: "Many straight lines separate two classes perfectly. Which one does an SVM choose?",
  choices: ["The one leaving the widest gap to the nearest points", "The one through the data's centre", "The one closest to the bigger class", "Any of them — they're equivalent", "The one minimising training error"],
  explain: "All separating lines score 100% on training data — SVM breaks the tie by maximising the MARGIN: the distance to the closest point on each side. Widest street wins.",
  simple: "Picture drawing a street between two crowds. Lots of streets avoid stepping on anyone — but the SAFEST street is the widest one, with the most breathing room to the nearest person on each side. SVM finds exactly that street.",
  widget: {
    type: "marginSVM", title: "The widest street",
    world: "Two clusters, one boundary you control. The dashed kerbs mark the street's edges. Slide the boundary and hunt for the position with the WIDEST street.",
    classes: ["Cats", "Dogs"], xlab: "ear pointiness", ylab: "",
    points: [{x:1,y:2,c:0},{x:1.8,y:5,c:0},{x:2.4,y:7.6,c:0},{x:3,y:3.6,c:0},{x:3.6,y:6,c:0},{x:6.6,y:2.6,c:1},{x:7.2,y:6.8,c:1},{x:7.8,y:4.4,c:1},{x:8.6,y:7.6,c:1},{x:9.2,y:3,c:1}],
    knob: { label: "Boundary position", min: 0.5, max: 10, step: 0.1, init: 4 },
    insights: [
      { max: 4.2, text: "The boundary separates the classes fine — but look at the street width. Hugging one cluster leaves almost no room for error.", tone: "warn" },
      { max: 6, text: "Around the middle the street opens right up. Every position here classifies the training data identically — the WIDTH is what distinguishes them.", tone: "info" },
      { max: 10, text: "🤯 Too far and the street collapses into the other cluster. Somewhere behind you was one special position: maximum width. That's the SVM solution — unique, and chosen by geometry, not error-counting.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Maximum-margin classifier", formula: "choose the boundary maximising the distance to the nearest point of each class",
      text: "A wide street means new, slightly-shifted points still land on the correct side. Margin is a geometric bet on generalisation — and it pays." }
  }
},

{
  q: "In a trained SVM, which training points actually determine where the boundary sits?",
  choices: ["Only the few points touching the street's edges", "All points, weighted equally", "The class centre points", "The most recently added points", "A random sample per class"],
  explain: "The maximum-margin boundary is pinned in place by the points AT the margin — the support vectors. Every other point could move (or vanish) without changing the model at all.",
  simple: "The street's position is set by the people standing right at its kerbs. Everyone deeper in the crowd could go home and the street wouldn't move an inch. Those kerb-standers are the 'support vectors' — the only points the model actually needs.",
  widget: {
    type: "marginSVM", title: "The points that pin the street",
    world: "Slide the boundary to the widest-street position and watch which points get ringed and labelled 'support'. Then imagine deleting every OTHER point — would anything change?",
    classes: ["Genuine", "Forged"], xlab: "stroke pressure", ylab: "",
    points: [{x:0.8,y:3,c:0},{x:1.6,y:6.4,c:0},{x:2.2,y:2,c:0},{x:3,y:7.4,c:0},{x:3.8,y:4.6,c:0},{x:6.4,y:5.4,c:1},{x:7.2,y:2.4,c:1},{x:7.8,y:7,c:1},{x:8.6,y:4,c:1},{x:9.4,y:6.2,c:1}],
    knob: { label: "Boundary position", min: 0.5, max: 10, step: 0.1, init: 2 },
    insights: [
      { max: 3, text: "Off-centre positions: the nearest points (ringed) are doing all the constraining. The far points are pure spectators.", tone: "info" },
      { max: 6, text: "At the widest-street position, typically just one or two points per side touch the kerbs. THOSE are the support vectors.", tone: "info" },
      { max: 10, text: "🤯 A model defined by ~3 points out of 10 — delete the rest and retraining reproduces the identical boundary. The model IS its support vectors; everything else is furniture.", tone: "wow" }
    ],
    extreme: { at: "min" },
    reveal: { name: "Support vectors", formula: "the boundary depends only on points with margin-touching (or violating) positions",
      text: "This sparsity is SVM's signature: compact models, and total indifference to easy points far from the border. Compare KNN, which hoards everything." }
  }
},

{
  q: "Real data is messy — one stray point sits inside the other class. A 'soft margin' SVM handles this how?",
  choices: ["It tolerates some margin violations in exchange for a wider street", "It deletes the stray point first", "It refuses to train until separable", "It bends the boundary around the point", "It reweights the stray point's class"],
  explain: "Soft-margin SVM pays a penalty per violation instead of demanding perfection. The C parameter prices those violations: it buys a wide, calm street at the cost of a few points on the wrong side.",
  simple: "Demanding a street that avoids literally everyone means a cramped, twisted street dictated by one weirdo. The soft margin says: fine — step past a couple of people, pay a small fine each, and keep the street wide for everyone else.",
  widget: {
    type: "curveStatic", title: "Pricing the violations",
    world: "Sweep the violation price C from nearly-free to brutal. Watch the street width, and the score that actually matters.",
    xlab: "violation price C →", xs: [0,1,2,3,4,5], labels: ["0.01","0.1","1","10","100","1000"], dec: 0, yunit: "",
    series: [
      { name: "street width (×10)", ys: [38,30,22,14,7,3] },
      { name: "validation accuracy %", ys: [78,86,90,88,82,79] }
    ],
    knob: { label: "Violation price C", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Cheap violations: an enormous, relaxed street that shrugs at stray points — sometimes TOO relaxed to separate the classes properly.", tone: "info" },
      { max: 3, text: "Mid-priced C: the sweet spot — a decently wide street that ignores the one weirdo but respects the real structure. Validation peaks here.", tone: "info" },
      { max: 5, text: "🤯 Brutal C: violations are unaffordable, so the street contorts itself around every noisy point — narrow, nervous, overfit. C is SVM's bias–variance dial, exactly like k or depth.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Soft margin & the C parameter", formula: "minimise: narrowness + C × (margin violations) — tune C on validation",
      text: "Small C = wide and forgiving (more bias). Big C = strict and twitchy (more variance). Same U-shaped tuning story as every complexity dial." }
  }
},

{
  q: "One class forms a ring AROUND the other — no straight line can separate them. The kernel idea rescues SVM how?",
  choices: ["Add a computed feature (like distance from centre) that makes them separable", "Use many straight lines at once", "Convert the SVM into a tree", "Delete the inner class", "Lower C until the ring vanishes"],
  explain: "In the original features, no line works. Add a new axis — say r = distance from the centre — and the ring sits at high r, the core at low r: one straight cut on r separates them perfectly. Kernels do this transformation implicitly.",
  simple: "You can't cut a bullseye in two with one straight slice — in flat 2-D. But describe each point by 'how far from the centre is it?' and suddenly the two groups sit at different distances: one simple cut on THAT number wins. New viewpoint, easy problem.",
  widget: {
    type: "treeSplit", title: "The feature that unbends the ring",
    world: "The bullseye data, re-described by ONE new feature: distance from the centre. The core sits left, the ring sits right. Slide a single straight cut on this new axis.",
    classes: ["Inner core", "Outer ring"], feat: "distance from centre",
    items: [{x:0.6,c:0},{x:1.1,c:0},{x:1.5,c:0},{x:1.9,c:0},{x:2.3,c:0},{x:2.8,c:0},{x:5.8,c:1},{x:6.4,c:1},{x:7,c:1},{x:7.7,c:1},{x:8.3,c:1},{x:9,c:1}],
    knob: { label: "Cut: distance < ?", min: 0.5, max: 10, step: 0.25, init: 1 },
    insights: [
      { max: 2.5, text: "In the ORIGINAL x-y space these classes were hopelessly entangled. On the engineered axis they've fallen into two tidy camps.", tone: "info" },
      { max: 5.5, text: "🤯 One straight cut, 100% separation — of data that no straight line could touch before. Nothing about the points changed; only the DESCRIPTION did.", tone: "wow" },
      { max: 10, text: "The kernel trick automates this: it lets the SVM behave as if such extra features exist, without ever computing them explicitly. Curvy problems become straight ones in a richer space.", tone: "info" }
    ],
    extreme: { at: 4 },
    reveal: { name: "The kernel idea", formula: "map x → φ(x) into a richer space; a straight cut there = a curve back home",
      text: "SVM + kernels: keep the maximum-margin machinery, swap the space it works in. The RBF kernel is the everything-bagel version of this move." }
  }
},

{
  q: "Why does a WIDER margin tend to mean better performance on future data?",
  choices: ["New points land near old ones — a wide buffer absorbs the scatter", "Wide margins always contain more points", "Width speeds up prediction", "Narrow margins overflow memory", "Width is aesthetic, not functional"],
  explain: "Tomorrow's points are noisy copies of today's: each lands near where a similar training point stood. A boundary with a wide buffer keeps those jittered arrivals on the correct side; a tight one flips them.",
  simple: "Future customers won't land exactly on today's dots — they'll land NEARBY. If the boundary passes a hair's width from today's dots, tomorrow's near-misses fall on the wrong side. A wide street forgives the wobble.",
  widget: {
    type: "marginSVM", title: "Room for tomorrow's wobble",
    world: "Today's points, one boundary. Imagine each point jittering a step in any direction tomorrow. Which boundary position keeps ALL the jittered versions on the right side?",
    classes: ["Returning", "Churning"], xlab: "engagement score", ylab: "",
    points: [{x:1.2,y:2.6,c:0},{x:2,y:6,c:0},{x:2.6,y:4,c:0},{x:3.2,y:7.4,c:0},{x:3.9,y:2,c:0},{x:6.3,y:5,c:1},{x:7,y:2.8,c:1},{x:7.7,y:7,c:1},{x:8.4,y:4.2,c:1},{x:9.2,y:6.4,c:1}],
    knob: { label: "Boundary position", min: 0.5, max: 10, step: 0.1, init: 4.1 },
    insights: [
      { max: 4.3, text: "The street's kerb almost touches a point. A tiny future wobble pushes that customer across — instant misclassification.", tone: "warn" },
      { max: 6, text: "Wide-street territory: every point could wobble a whole step and still stay on its own side. The margin is literally a noise budget.", tone: "info" },
      { max: 10, text: "🤯 That's the whole generalisation argument in one picture — no probability theory needed. Maximum margin = maximum tolerance for the unknown.", tone: "wow" }
    ],
    extreme: { at: "min" },
    reveal: { name: "Margin = robustness to noise", formula: "wider margin → larger perturbations survive → better generalisation",
      text: "SVM optimises for the wobble directly. This geometric safety margin is why it generalises well even from modest training sets." }
  }
},

{
  q: "After training an SVM on 50,000 points, only 900 turn out to be support vectors. What does that mean for the deployed model?",
  choices: ["It only needs those 900 points to make every future prediction", "It must still store all 50,000", "It failed to converge properly", "900 points were mislabeled", "It will only work on 900 test cases"],
  explain: "Predictions are computed from support vectors alone — everything else contributed nothing to the final boundary and can be discarded. The model is naturally sparse.",
  simple: "The 49,100 easy points — deep inside their own crowds — never influenced the street's position. Ship just the 900 kerb-standers and the model behaves identically. A crowd summarised by its edge cases.",
  widget: {
    type: "marginSVM", title: "The model you actually ship",
    world: "Ten training points, but watch how few end up ringed as 'support' at the widest-street position. Everything unringed is dead weight in the shipped model.",
    classes: ["Silent", "Faulty"], xlab: "vibration level", ylab: "",
    points: [{x:0.7,y:4,c:0},{x:1.4,y:7,c:0},{x:2,y:2.4,c:0},{x:2.7,y:5.6,c:0},{x:3.5,y:3.4,c:0},{x:6.5,y:6,c:1},{x:7.1,y:3,c:1},{x:7.9,y:7.4,c:1},{x:8.7,y:5,c:1},{x:9.3,y:2.2,c:1}],
    knob: { label: "Boundary position", min: 0.5, max: 10, step: 0.1, init: 5 },
    insights: [
      { max: 4, text: "Count the rings: at most positions, one or two per side. The other points never touch the optimisation's answer.", tone: "info" },
      { max: 7, text: "The prediction rule is built ONLY from ringed points — mathematically, all other points carry zero weight.", tone: "info" },
      { max: 10, text: "🤯 50,000 in, 900 out: a 55× smaller deployed model with identical answers. Compare KNN, which must lug the entire dataset to every prediction, forever.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Sparsity of SVMs", formula: "prediction = Σ over support vectors only — non-SVs have weight 0",
      text: "SVM compresses the training set down to its difficult cases. Memory-light deployment is a real, bankable advantage." }
  }
},

{
  q: "You feed an SVM raw features: age (18–70) and salary (£20,000–£90,000). What happens to the margin calculation?",
  choices: ["Salary's huge scale dominates it — scale features first", "Nothing — margins ignore units", "Age dominates, being first in the data", "The kernel removes the units", "Training refuses to start"],
  explain: "Margins are DISTANCES, and distances add feature gaps — exactly like KNN. Raw salary gaps (thousands) swamp age gaps (tens), so the 'widest street' is computed in a warped space. Standardise first, always.",
  simple: "The street's width is measured with a ruler across all features at once. If one feature's numbers are a thousand times bigger, the ruler basically only measures THAT feature — the street ignores age entirely. Put the features on the same scale and the geometry becomes honest.",
  widget: {
    type: "scaleFeature", title: "The warped ruler",
    world: "Which training point is 'nearest the boundary' decides everything in an SVM. Watch that judgement change as salary's raw units get rescaled — same points, different geometry.",
    aName: "age", bName: "salary",
    target: { name: "the boundary zone", a: 40, b: 45000 },
    cands: [
      { name: "Ana · 41y, £58k", a: 41, b: 58000 },
      { name: "Bo · 62y, £46k", a: 62, b: 46000 },
      { name: "Cai · 39y, £44k", a: 39, b: 44500 },
      { name: "Dee · 45y, £70k", a: 45, b: 70000 }
    ],
    knob: { label: "Shrink salary units by", min: 0, max: 4, step: 0.25, init: 0 },
    insights: [
      { max: 0.5, text: "Raw pounds: Bo — 22 years older — counts as 'closest to the boundary' because his salary is near it. The margin is being measured with a broken ruler.", tone: "warn" },
      { max: 2.5, text: "As the scales even out, a different point becomes the margin-setter — meaning a different SUPPORT VECTOR, meaning a different model.", tone: "info" },
      { max: 4, text: "🤯 The support vectors themselves depend on scaling. An unscaled SVM isn't slightly off — it optimises the wrong street entirely. StandardScaler is not optional here.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "SVMs require feature scaling", formula: "margin = geometric distance → standardise features before fitting",
      text: "Any distance-based method — KNN, SVM, anything with kernels — inherits the same rule: same-scale features, or meaningless geometry." }
  }
},

{
  q: "With an RBF kernel, the gamma parameter controls each training point's radius of influence. What does a very LARGE gamma produce?",
  choices: ["Tiny islands around individual points — overfitting", "One smooth global boundary — underfitting", "A perfectly linear boundary", "Slower training but the same fit", "Wider margins everywhere"],
  explain: "Large gamma = each point's influence dies off within a tiny radius, so the boundary is stitched from hyper-local bumps around individual points — flexible to the point of memorisation.",
  simple: "Gamma sets how far each point's opinion carries. Huge gamma = every point only vouches for its immediate doorstep, so the model draws a little bubble around each example — including every noisy one. It's k=1 syndrome, SVM edition.",
  widget: {
    type: "curveStatic", title: "The radius of influence",
    world: "Sweep gamma from tiny to huge and watch the two scores. Somewhere in the middle, the boundary is curvy enough — and no curvier.",
    xlab: "gamma →", xs: [0,1,2,3,4,5], labels: ["0.01","0.1","0.5","2","10","50"], dec: 0, yunit: "%",
    series: [
      { name: "training score", ys: [74,85,92,97,99,100] },
      { name: "validation score", ys: [72,83,89,87,79,68] }
    ],
    knob: { label: "gamma", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Tiny gamma: influence spreads so wide the boundary is nearly a straight line — often too simple.", tone: "info" },
      { max: 3, text: "Mid gamma: validation peaks. The boundary bends with the true structure but can't afford private bubbles for noise.", tone: "info" },
      { max: 5, text: "🤯 Huge gamma: training hits 100% while validation collapses 21 points — the boundary has become a bubble-wrap of memorised islands. Gamma and C tune together, both on validation.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "RBF gamma", formula: "influence ∝ e^(−γ·distance²) — big γ = local & twitchy, small γ = global & smooth",
      text: "The RBF kernel's flexibility dial. With C, it spans everything from near-linear to full memorisation — validation curves keep you honest." }
  }
},

{
  q: "Logistic regression and SVM both draw linear boundaries, but their training goals differ. What does each care about?",
  choices: ["LogReg: honest probabilities everywhere · SVM: the margin at the border", "LogReg: the margin · SVM: probabilities", "Both: counting errors only", "LogReg: distance · SVM: odds ratios", "They optimise identical objectives"],
  explain: "Log-loss keeps caring about every point — even easy ones — because probabilities must be right everywhere. Hinge loss goes flat once a point is comfortably past the margin: SVM spends all its attention on the border cases.",
  simple: "LogReg is a perfectionist teacher: even a 99%-safe point should be 99.9%. SVM is a bouncer: once you're safely inside, it stops caring about you entirely and watches the doorway. Same door position, different philosophies about the crowd.",
  widget: {
    type: "curveStatic", title: "Two losses, two personalities",
    world: "One correctly-classified point, slid from 'barely right' to 'deep in safe territory'. Watch how much each loss still complains.",
    xlab: "how safely correct the point is →", xs: [0,1,2,3,4,5,6], dec: 2,
    series: [
      { name: "hinge loss (SVM)", ys: [1,0.5,0,0,0,0,0] },
      { name: "log-loss (LogReg)", ys: [0.69,0.47,0.31,0.2,0.13,0.08,0.05] }
    ],
    knob: { label: "Safety of the point", min: 0, max: 6, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Near the boundary, both losses complain loudly — border points matter to everyone.", tone: "info" },
      { max: 3, text: "🤯 Past the margin, hinge loss hits EXACTLY zero and never looks back — that indifference is why only support vectors matter. Log-loss keeps nagging forever.", tone: "wow" },
      { max: 6, text: "The nagging buys LogReg calibrated probabilities across the whole space; the indifference buys SVM sparsity and margin focus. Pick by what you need: probabilities → LogReg, hard margins → SVM.", tone: "info" }
    ],
    extreme: { at: 2 },
    reveal: { name: "Hinge loss vs log-loss", formula: "hinge: max(0, 1 − margin) · log-loss: −log(p) — flat vs never-flat",
      text: "The loss function IS the model's personality. SVMs don't produce natural probabilities for the same reason they're sparse: past the margin, they've stopped caring." }
  }
},

{
  q: "You have 5 million training rows and need probability outputs, retrained nightly. Why might you NOT reach for a kernel SVM?",
  choices: ["Kernel SVM training scales badly with rows, and probabilities aren't native", "SVMs can't handle more than two features", "SVMs need GPUs to train at all", "Kernel SVMs can't be regularised", "They only work on images"],
  explain: "Kernel SVM training costs roughly between n² and n³ — brutal at millions of rows — and its outputs are margins, not probabilities (calibration is a bolt-on). Linear models or trees fit this brief better.",
  simple: "Kernel SVMs compare points with points, so the work explodes as rows pile up — 5 million rows means a very long night. And when the business asks 'what's the probability?', the SVM shrugs: it deals in distances, not percentages. Right tool, wrong job.",
  widget: {
    type: "curveStatic", title: "The training bill",
    world: "Fit time as the dataset grows, for a kernel SVM and a linear model. The retrain window is 60 minutes. Slide the data size.",
    xlab: "training rows", xs: [0,1,2,3,4,5], labels: ["10k","50k","100k","500k","1M","5M"], dec: 0, yunit: " min",
    series: [
      { name: "kernel SVM fit time", ys: [1,8,25,190,700,4000] },
      { name: "linear model fit time", ys: [0.1,0.4,0.8,4,8,35] }
    ],
    knob: { label: "Training rows", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Small data: the kernel SVM is perfectly practical — and often wins on accuracy with a good kernel.", tone: "info" },
      { max: 3, text: "The SVM's bill is bending upward viciously — pairwise comparisons compound. The linear model's grows politely.", tone: "warn" },
      { max: 5, text: "🤯 At 5M rows: ~66 hours vs 35 minutes. Past the 60-minute window since 100k rows. Model choice is an engineering decision, not just an accuracy contest.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "SVM's operating envelope", formula: "kernel SVM ≈ O(n²–n³) training · shines: small-to-medium n, clear margins, no probability needs",
      text: "Every algorithm in this course has a habitat. Kernel SVMs: thousands-to-tens-of-thousands of rows, geometry-friendly problems — not nightly-retrained web-scale pipelines." }
  }
}
];
