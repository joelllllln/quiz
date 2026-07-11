/* PCA — Part III: Advanced Study. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).pca3 = [

{
  q: "Textbooks say PCA finds directions of maximum variance; other books say it finds the best low-rank reconstruction; a third says it's the SVD of the data matrix. Which is true?",
  choices: ["All three — maximum-variance directions, minimum reconstruction error, and the top singular vectors are the SAME thing, which is why SVD is how PCA is actually computed", "The three coincide only when the data has been perfectly centered AND every single feature has already been rescaled to unit variance first, otherwise they part ways completely", "Only the reconstruction-error definition is exact; the maximum-variance and SVD views are handy approximations to it that usually agree closely", "The variance and reconstruction views always agree, but the SVD gives different directions unless the data matrix happens to be square", "All three agree only for two-dimensional data; once you move to higher dimensions the three separate objectives diverge sharply"],
  explain: "For centred data, three problems have one answer. (1) Find orthogonal directions maximising projected variance. (2) Find the rank-k subspace minimising squared reconstruction error ‖X − X̂‖². (3) Compute X = UΣVᵀ (SVD); the right-singular vectors V are the principal directions, σᵢ² relate to explained variance. Maximising variance along a direction is IDENTICALLY minimising the perpendicular residuals (Pythagoras: total = projected + residual, and total is fixed), and both are read straight off the SVD. That's why sklearn's PCA calls an SVD internally rather than eigendecomposing the covariance matrix — SVD on X is more numerically stable than forming XᵀX. Understanding the equivalence lets you reason about PCA from whichever angle a problem hands you (variance for interpretation, reconstruction for compression/anomalies, SVD for computation).",
  simple: "Three descriptions of PCA sound like three different algorithms, but they're one thing seen from three sides. 'Keep the most spread' and 'lose the least when you flatten' are the SAME goal — because the total spread is fixed, so whatever you capture along your axis is exactly what you DON'T lose perpendicular to it (a right-triangle fact). And both are computed by one classic matrix operation, the SVD, which is why the library reaches for SVD under the hood. The payoff of seeing the equivalence: when a task is about compression, think reconstruction; when it's about meaning, think variance; when it's about computing it stably, think SVD — same PCA, three doors.",
  widget: {
    type: "curveStatic", title: "One thing, three doors",
    world: "As you rotate a candidate axis through a 2-D cloud, watch variance-captured and reconstruction-error move as exact mirror images — their sum pinned constant. The best axis maximises one and minimises the other simultaneously.",
    xlab: "candidate axis angle →", xs: [0,1,2,3,4,5,6], labels: ["0°","30°","60°","PC1 (79°)","120°","150°","180°"], dec: 2, yunit: "",
    series: [
      { name: "variance captured", ys: [0.31, 0.55, 0.82, 0.94, 0.71, 0.42, 0.31] },
      { name: "reconstruction error", ys: [0.69, 0.45, 0.18, 0.06, 0.29, 0.58, 0.69] }
    ],
    knob: { label: "Axis angle", min: 0, max: 6, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Any angle: variance captured + reconstruction error = 1.00, always. They're not two metrics — they're one quantity and its complement, tied by Pythagoras.", tone: "info" },
      { max: 3, text: "At 79° (PC1) variance peaks (0.94) and error bottoms (0.06) at the SAME angle. 'Most spread kept' and 'least detail lost' are literally the same optimum.", tone: "info" },
      { max: 6, text: "🤯 And this best axis is exactly the top right-singular vector of the data matrix — no rotation search needed, SVD hands it over directly (more stably than eigendecomposing the covariance). Variance, reconstruction, SVD: three doors, one room. Walk through whichever the problem opens.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "PCA's three equivalent definitions", formula: "max projected variance ≡ min reconstruction error ≡ top singular vectors (X = UΣVᵀ)",
      text: "sklearn computes PCA via SVD on centred X (stabler than covariance eigendecomposition). Reason from variance, reconstruction, or SVD as convenient — they never disagree." }
  }
},

{
  q: "You want the top 10 principal components of a 500,000 × 20,000 matrix. Exact PCA would eigendecompose a 20,000² covariance matrix — hopeless. Randomized SVD gets the top 10 in seconds. What's the trick?",
  choices: ["Project the data onto a few more than 10 RANDOM directions to cheaply capture the dominant subspace, then do an exact small SVD inside that captured subspace — accuracy for the top components with almost no cost", "Replace the enormous 20,000-square covariance matrix with a low-rank random approximation of it, then eigendecompose that tiny stand-in matrix exactly, reading the ten leading directions straight off the result at negligible cost", "Draw a random sample of a few thousand rows, run an exact PCA on just that subsample, and trust its top components to match the full matrix closely enough for practical use", "Run power iteration from a single random starting vector, peeling off one component at a time, until the top ten directions have each separately converged to high accuracy", "Compress every column down with a random hash function, decode the small sketch back out, then diagonalize the far smaller hashed matrix to recover the ten leading components"],
  explain: "Exact SVD costs O(min(mn², m²n)) — catastrophic when both dimensions are large, and wasteful when you want 10 of 20,000 components. Randomized SVD (Halko–Martinsson–Tropp): multiply X by a random n×(k+p) matrix (p a small oversampling buffer, ~5-10) to get a tall-skinny sketch Y whose columns span, with high probability, nearly the same space as the top-k singular vectors (random projection preserves the dominant directions — they have the most 'energy' to survive the projection); orthonormalise Y, project X into that small subspace, and run an EXACT SVD on the resulting tiny (k+p)-column matrix. Cost drops to roughly O(mn·k) with error controllably tiny for the leading components (a power-iteration step sharpens it further). This is what sklearn's PCA(svd_solver='randomized') does automatically for large inputs with small n_components — the standard way to get a few components from a huge matrix.",
  simple: "Finding the top 10 directions of a 20,000-dimensional cloud by examining all 20,000 is absurd when you only want 10. The randomized trick: shine light from a handful of RANDOM angles and photograph the cloud's shadow. The biggest, most stretched-out directions (the ones you want) have so much 'presence' that they show up clearly in almost any random shadow — the tiny directions vanish. So a few random shadows capture the important subspace almost perfectly; you then do the exact, expensive PCA math but only inside that tiny captured space, which is now cheap. A pinch of oversampling and one sharpening pass make the top components essentially exact. It's how you pull a few real directions out of a giant matrix in seconds instead of hours.",
  widget: {
    type: "curveStatic", title: "Catch the big directions in a random shadow",
    world: "Top-10 PCA of the 500k × 20k matrix: exact vs randomized SVD, as the matrix grows. Accuracy of the recovered components stays near-perfect while cost diverges.",
    xlab: "matrix size (features) →", xs: [0,1,2,3,4], labels: ["1k","5k","20k","50k","100k"], dec: 0, yunit: "",
    series: [
      { name: "exact SVD time (s)", ys: [3, 90, 2400, 30000, 200000] },
      { name: "randomized SVD time (s)", ys: [1, 4, 12, 35, 80] },
      { name: "top-10 accuracy: randomized (%)", ys: [100, 100, 99, 99, 99] }
    ],
    knob: { label: "Feature count", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "5k features: exact SVD already 90s, randomized 4s — and the top-10 components are identical to 4 significant figures. The random shadow caught the big directions perfectly.", tone: "info" },
      { max: 3, text: "50k features: 8+ hours vs 35 seconds. Exact SVD computes all 50,000 singular vectors to hand you 10; randomized targets only the subspace you asked for.", tone: "info" },
      { max: 4, text: "🤯 100k features: exact is effectively infeasible while randomized delivers 99%-accurate top components in 80 seconds — because dominant directions carry the most energy and thus survive random projection, while the discarded tiny directions were noise anyway. sklearn picks this solver automatically for big-matrix/small-k requests.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Randomized SVD", formula: "random projection → capture top-k subspace → exact SVD inside it (Halko–Martinsson–Tropp)",
      text: "sklearn: PCA(svd_solver='randomized') — auto-selected for large inputs with small n_components. Oversampling + power iterations trade a little compute for accuracy." }
  }
},

{
  q: "PCA gave a great low-dimensional embedding but the components are impossible to interpret — every one mixes all 200 features a little. A colleague suggests Non-negative Matrix Factorization (NMF) instead. What does NMF's constraint change?",
  choices: ["Forcing all factors to be NON-NEGATIVE yields PARTS-BASED, additive components (a face = nose + eyes + mouth; a document = topics) — sparse and interpretable, unlike PCA's cancelling ± mixtures", "Requiring the factors to instead be ORTHOGONAL yields perfectly uncorrelated components that, unlike PCA's, can be read straight off as independent named topics with no overlap whatsoever between any of them", "Constraining the factors to be SPARSE zeros out most of the loadings, so each component ends up keeping just one original feature and simply renames the columns you began with", "Forcing the factors to be PROBABILITIES turns each component into a distribution over the features, so the parts always sum to one and read as interpretable mixing weights", "Allowing the factors to take any SIGN but strictly bounding their magnitude keeps all of PCA's math while making every component small enough to name on its own"],
  explain: "PCA's components are orthogonal directions with arbitrary signs, so a component can ADD some features and SUBTRACT others — mathematically optimal for variance, often meaningless to read ('+income −age +0.3·postcode…'). NMF factorises X ≈ WH with W, H ≥ 0: no subtraction allowed, so the only way to build data is by ADDING non-negative parts. On faces this yields localized features (a nose part, an eyebrow part) that sum to a face; on documents, topics (word-groups) that sum to an article; on spectra, pure component signals. The result is naturally sparse and additive — you can name the parts. Trade-offs: applies only to non-negative data (pixel intensities, counts, magnitudes — not arbitrary signed features), the objective is non-convex (initialisation matters, no unique solution), and it optimises reconstruction, not variance-ordering. It's the interpretability-first cousin of PCA, and the classic tool for topic models and source separation.",
  simple: "PCA builds each pattern out of pluses AND minuses, so a component can say 'add a bit of this, subtract a bit of that' — brilliant for math, baffling to read, because things cancel. NMF bans subtraction: every pattern must be built by ADDING non-negative pieces, like assembling a face from a nose-piece plus an eyes-piece plus a mouth-piece. Because you can only add real parts, the parts turn out to be actual, nameable things — topics in documents, instruments in a mix, features in a face — instead of abstract cancelling directions. You trade PCA's tidy math (orthogonal, unique, variance-ordered) for parts you can point at and label. It only works when your data is naturally non-negative (counts, intensities, magnitudes), which is exactly where interpretability matters most.",
  widget: {
    type: "curveStatic", title: "Adding parts vs cancelling directions",
    world: "PCA and NMF on the same non-negative dataset (document word-counts), scored on reconstruction quality AND how interpretable/nameable the components are (human rating).",
    xlab: "aspect →", xs: [0,1,2,3], labels: ["reconstruction @ 10 comps","component sparsity","parts are nameable","handles signed data"], dec: 0, yunit: "",
    series: [
      { name: "NMF (0–100)", ys: [88, 82, 91, 0] },
      { name: "PCA (0–100)", ys: [93, 20, 25, 100] }
    ],
    knob: { label: "Aspect", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Reconstruction: PCA edges ahead (93 vs 88) — it's the variance-optimal factorisation, so no constrained method beats it on pure reconstruction. NMF pays a little accuracy for its constraint.", tone: "info" },
      { max: 2, text: "Interpretability flips the story: NMF's components are sparse (82) and nameable (91) — each is a recognisable TOPIC — while PCA's dense ± mixtures rate 25, unreadable to a domain expert.", tone: "warn" },
      { max: 3, text: "🤯 The catch: 'handles signed data' — PCA 100, NMF 0. NMF requires non-negative input (counts, intensities), which is exactly where additive parts make sense. Choose by what you need: PCA for signed data and max variance; NMF for non-negative data and parts you can name. Different constraints, different virtues.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "NMF (Non-negative Matrix Factorization)", formula: "X ≈ WH, W,H ≥ 0 → additive, parts-based, interpretable components",
      text: "sklearn: NMF(n_components=…). Non-negative data only (counts, pixels, magnitudes). The go-to for topic modelling (with TF-IDF), source separation, and interpretable decomposition." }
  }
},

{
  q: "A dataset has 100,000 mostly-empty columns (one-hot words, TF-IDF). You want to reduce dimensions, but sklearn's PCA errors or blows up memory. Why, and what's the drop-in fix?",
  choices: ["PCA CENTERS the data (subtracts the mean), which fills every zero and destroys sparsity → a dense 100k×100k blow-up; TruncatedSVD skips centering, runs on the sparse matrix directly (this is 'LSA' for text)", "PCA solves one full eigendecomposition that needs all 100,000 components computed at once, whereas TruncatedSVD asks only for the top k directions and therefore stays comfortably within the available memory budget the whole time", "PCA rescales every column to unit variance, which turns the many exact zeros into tiny nonzeros; TruncatedSVD leaves the scale untouched and so keeps the matrix sparse throughout", "PCA requires the input matrix to be square before it can decompose, so a 100k-wide matrix has to be padded out to full density; TruncatedSVD works on rectangular sparse data directly", "PCA must load the whole matrix densely to compute its covariance, while TruncatedSVD streams the nonzeros a row at a time and never forms any covariance matrix at all"],
  explain: "Sparsity — 99.9% zeros — is what makes huge text/count matrices tractable: only nonzeros are stored. PCA's first step is centering (subtract each column's mean), and since means are nonzero, EVERY zero becomes a nonzero: the matrix densifies to 100,000 × 100,000 dense floats, which is tens of gigabytes and instant death. TruncatedSVD computes the SVD directly on the raw (un-centered) sparse matrix, preserving sparsity throughout and returning the top-k components — mathematically it's PCA-without-centering, which for already-nearly-mean-zero sparse data is nearly equivalent and is exactly what you want. Applied to TF-IDF text, TruncatedSVD IS Latent Semantic Analysis (LSA), surfacing latent 'topics'. Rule of thumb: dense data → PCA; sparse data (text, one-hot, counts) → TruncatedSVD. Same SVD machinery, one skipped step that changes everything about scalability.",
  simple: "A giant text matrix is 99.9% zeros, and that emptiness is the ONLY reason it fits in memory — the computer stores just the handful of nonzeros. PCA's very first move is to subtract the average from every column, and since averages aren't zero, every single stored-as-empty cell suddenly becomes a real number: the matrix balloons from 'mostly nothing' to 'a hundred thousand by a hundred thousand of solid numbers', and your RAM dies. TruncatedSVD does the same dimensionality reduction but SKIPS the centering step, so the emptiness survives and everything stays tiny and fast. On text (TF-IDF), this exact tool is the classic 'Latent Semantic Analysis' that pulls out topics. The rule is simple: dense data → PCA; sparse data → TruncatedSVD.",
  widget: {
    type: "curveStatic", title: "The centering that fills every zero",
    world: "Reducing a sparse text matrix as its vocabulary grows: memory needed by PCA (which centers → densifies) vs TruncatedSVD (stays sparse). Same target: top 100 components.",
    xlab: "vocabulary size (columns) →", xs: [0,1,2,3,4], labels: ["1k","10k","50k","100k","500k"], dec: 0, yunit: "",
    series: [
      { name: "PCA memory after centering (GB)", ys: [0.1, 8, 200, 800, 20000] },
      { name: "TruncatedSVD memory (GB)", ys: [0.05, 0.2, 0.6, 1.1, 4] }
    ],
    knob: { label: "Vocabulary size", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "10k words: PCA already wants 8GB (centering turned a sparse matrix dense) while TruncatedSVD sips 0.2GB by leaving the zeros as zeros. Same reduction, one skipped subtraction.", tone: "info" },
      { max: 3, text: "100k words: PCA needs ~800GB of dense floats — a nonstarter — vs TruncatedSVD's 1.1GB. The blow-up is ENTIRELY the centering step filling in the emptiness.", tone: "warn" },
      { max: 4, text: "🤯 500k vocab: 20TB vs 4GB. And on TF-IDF, TruncatedSVD isn't just 'PCA that scales' — it's Latent Semantic Analysis, surfacing topics from the corpus. Dense → PCA; sparse → TruncatedSVD. One skipped step, a different tool, an entire application area (text) unlocked.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "TruncatedSVD (LSA)", formula: "SVD on raw sparse X — no centering → sparsity preserved · PCA-without-centering",
      text: "sklearn: TruncatedSVD(n_components=…) for text/one-hot/count matrices. On TF-IDF it's LSA. Rule: dense → PCA, sparse → TruncatedSVD — never densify a sparse matrix by centering." }
  }
},

{
  q: "You standardize features, run PCA, keep 10 components, and feed them to a classifier — accuracy DROPS versus using raw features. How can 'keeping the high-variance directions' hurt prediction?",
  choices: ["PCA is UNSUPERVISED — it ranks directions by variance, which needn't align with what predicts the LABEL; a low-variance direction can carry the signal, and PCA may discard it", "PCA is actually SUPERVISED but optimises the wrong label; feeding it the true target column would have reordered its components to match exactly what the classifier needs to see", "Standardizing before PCA erased the very scale differences that carried the class signal, so the one informative feature was flattened right down into the surrounding noise", "Keeping only 10 components merged several separately predictive features into one blended axis that the classifier can no longer pull back apart again", "PCA rotates all of the axes, and most classifiers simply cannot fit data whose features have been linearly recombined into brand-new directions"],
  explain: "PCA optimises a label-blind objective: capture input variance. But variance ≠ relevance — the direction separating your classes might be a low-variance one (small spread, big discriminative value), and PCA, ranking by variance, throws it out with the 'noise'. Classic failure: a feature with huge irrelevant variance (a noisy sensor) dominates PC1 while the quiet feature that actually predicts the label lands in PC15 and gets dropped. Fixes: (1) don't reduce blindly — treat n_components as a hyperparameter tuned on validation for DOWNSTREAM accuracy, not for explained-variance; (2) use SUPERVISED reduction — LDA (finds directions separating classes), or supervised feature selection (mutual information, L1); (3) sometimes skip reduction entirely and let a regularised model handle the dimensions. The meta-lesson: 'explains the most variance' and 'predicts the label best' are different objectives, and PCA only optimises the first.",
  simple: "PCA doesn't know or care what you're trying to predict — it only asks 'which directions have the most spread?'. But the direction that actually SEPARATES your classes might be a quiet, low-spread one, and PCA, sorting by spread, tosses it in the bin marked 'noise'. Imagine a loud broken thermometer (huge variance, useless) dominating the top components while the subtle signal that predicts the disease sits in a low-variance direction that gets dropped. The fix depends on the goal: if you want prediction, either tune how many components you keep by checking DOWNSTREAM accuracy (not explained variance), or use a label-AWARE reducer like LDA that hunts for class-separating directions. 'Most variance' and 'most predictive' are simply different questions — PCA answers the first.",
  widget: {
    type: "curveStatic", title: "Variance isn't relevance",
    world: "A classifier fed reductions of the same data: PCA (variance-ranked) vs LDA (label-aware) vs raw. The signal deliberately lives in a LOW-variance direction — watch PCA discard it.",
    xlab: "components kept →", xs: [0,1,2,3,4], labels: ["2","5","10","20","all raw"], dec: 0, yunit: "%",
    series: [
      { name: "LDA (supervised) → classifier", ys: [88, 89, 89, 89, 87] },
      { name: "raw features → classifier", ys: [87, 87, 87, 87, 87] },
      { name: "PCA (unsupervised) → classifier", ys: [61, 68, 74, 85, 87] }
    ],
    knob: { label: "Components kept", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "2 PCA components: 61% — catastrophic. The top-variance directions captured a loud irrelevant feature and MISSED the quiet class-separating one. High explained-variance, low predictive value.", tone: "warn" },
      { max: 2, text: "10 PCA components still trails raw features (74 vs 87) — the predictive direction is ranked ~15th by variance, so you must keep almost everything before PCA stumbles onto it. LDA, being label-aware, nails it with 2.", tone: "info" },
      { max: 4, text: "🤯 PCA only matches raw once it keeps ALL components (reducing nothing). The lesson: PCA ranks by a label-blind objective, so 'keep the top-k' can delete your signal. For prediction, tune n_components on downstream accuracy, or use supervised reduction (LDA). Variance and relevance are different targets.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "PCA is unsupervised", formula: "ranks by input variance, not label-relevance → may discard the predictive direction",
      text: "For prediction: tune n_components on downstream score (not explained variance), or use LDA / supervised selection. PCA shines for compression, denoising, visualisation — not automatically for accuracy." }
  }
}
];
