/* Definition questions batch g6 (pca1, tsne1). */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function add(qk, obj) { (Q[qk] = Q[qk] || []).push(obj); D[obj.q] = 1; }

  /* ============================ pca1 (11) ============================ */

  add("pca1", {
    q: "What is Principal Component Analysis (PCA)?",
    choices: [
      "A technique that finds new axes (principal components) capturing the directions of greatest variance, letting you describe the data with fewer coordinates",
      "A density-based clustering method that grows groups from crowded regions and tags the isolated points sitting in sparse gaps as leftover background noise points",
      "A supervised classifier that fits one straight decision boundary between two labelled classes, choosing the line that keeps the widest possible margin between them",
      "A resampling ensemble that builds hundreds of decision trees on bootstrap samples of the rows and averages their separate predictions into one vote",
      "A grid search over model hyper-parameters that trains one candidate per setting and keeps whichever combination scores best on held-out validation data"
    ],
    explain: "PCA is an unsupervised dimensionality-reduction method: it rotates the coordinate system so the new axes, the principal components, point along the directions in which the data varies most. Keeping only the first few components lets you represent high-dimensional data with far fewer numbers while losing as little variance as possible. It relies only on the data's own spread, so no labels are needed.",
    simple: "PCA finds the handful of directions in which your data spreads out the most and re-describes every point using just those. It is a way of squeezing many columns down to a few without throwing away much of the picture.",
    widget: {
      type: "curveStatic", title: "Variance kept as components add up",
      world: "Keeping the first 1, then 2, then more principal components and measuring how much of the data's total variance they capture.",
      xlab: "components kept →", xs: [0,1,2,3,4], labels: ["1","2","3","4","5"], dec: 0, yunit: "%",
      series: [ { name: "cumulative variance explained (%)", ys: [62, 81, 91, 97, 100] } ],
      knob: { label: "Components kept", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "The very first component already captures the biggest slice of the spread on its own.", tone: "info" },
        { max: 3, text: "Each extra component adds a little more, and the running total climbs steadily toward the whole picture.", tone: "info" },
        { max: 4, text: "🤯 That climb toward 100% is exactly what PCA buys you: a few new axes reconstruct almost all the variation.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Principal Component Analysis", formula: "rotate axes → keep directions of maximum variance",
        text: "PCA replaces many correlated columns with a few high-variance directions." }
    }
  });

  add("pca1", {
    q: "What is a principal component?",
    choices: [
      "One of the new axes PCA produces — a direction through the data, built as a weighted mix of the original features, along which the data varies as much as possible",
      "A single original column of the dataset that PCA decides to keep unchanged",
      "The average of all the data points, used as the origin of the new coordinate system",
      "A cluster centre that PCA assigns each point to during the projection",
      "The label PCA predicts for each row after it reduces the dimensions"
    ],
    explain: "A principal component is a direction in feature space, expressed as a linear combination of the original features, chosen so the data's variance along it is maximal (subject to being orthogonal to earlier components). The components are ordered: the first captures the most variance, the second the next most, and so on. Each data point's position along a component is its 'score' on that component.",
    simple: "A principal component is one of the fresh directions PCA discovers, made by blending your original columns. The first one points where the data is most spread out, and later ones capture whatever spread is left over.",
    widget: {
      type: "curveStatic", title: "Variance grabbed per component",
      world: "Looking at the first component, then the second, then later ones, and reading how much variance each single one captures.",
      xlab: "component number →", xs: [0,1,2,3,4], labels: ["1st","2nd","3rd","4th","5th"], dec: 0, yunit: "%",
      series: [ { name: "variance captured by that component (%)", ys: [62, 19, 10, 6, 3] } ],
      knob: { label: "Component number", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "The first component grabs the largest share of the spread by design.", tone: "info" },
        { max: 3, text: "Each later component is orthogonal to the ones before and captures steadily less.", tone: "info" },
        { max: 4, text: "🤯 That downhill staircase is why a few leading components describe most of the data — later ones carry little.", tone: "wow" }
      ],
      extreme: { at: "min" },
      reveal: { name: "Principal component", formula: "weighted mix of features along a max-variance direction",
        text: "Components are ranked by how much variance each one explains." }
    }
  });

  add("pca1", {
    q: "What is the first principal component (PC1)?",
    choices: [
      "The single direction through the data along which its variance is the largest of any possible direction",
      "The direction along which the data varies the least, used to discard noise",
      "The original feature that happens to have the biggest raw numbers",
      "The line connecting the two data points that are farthest apart",
      "The axis that is perpendicular to every other component but carries no variance"
    ],
    explain: "The first principal component is the direction in feature space that maximises the variance of the projected data — no other single direction spreads the points out more. It is the leading eigenvector of the covariance matrix, and its eigenvalue equals the variance captured along it. Every other component must be orthogonal to it and captures less.",
    simple: "PC1 is the one direction in which your data is most stretched out. If you had to summarise every point with a single number, projecting onto PC1 keeps as much of the spread as any single line can.",
    widget: {
      type: "curveStatic", title: "Rotating a line to find PC1",
      world: "Slowly rotating a candidate line and measuring how much the data spreads out when projected onto it.",
      xlab: "line angle toward PC1 →", xs: [0,1,2,3,4], labels: ["0°","23°","45°","68°","PC1"], dec: 0, yunit: "%",
      series: [ { name: "variance along the line (%)", ys: [24, 41, 62, 80, 91] } ],
      knob: { label: "Rotate the line", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Point the line the wrong way and the projected points barely spread at all.", tone: "info" },
        { max: 3, text: "As the line swings toward the data's long axis, the captured variance keeps rising.", tone: "info" },
        { max: 4, text: "🤯 The angle where variance peaks IS the first principal component — the single most spread-out direction.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "First principal component (PC1)", formula: "direction of maximum variance in the data",
        text: "No single direction captures more of the data's spread than PC1." }
    }
  });

  add("pca1", {
    q: "In PCA, what is an eigenvector of the covariance matrix?",
    choices: [
      "A special direction that the covariance matrix only stretches, not rotates — PCA uses these directions as its principal components",
      "The list of average values, one per feature, that centres the data",
      "A single data point that lies exactly on a principal component",
      "The amount of variance left unexplained after projection",
      "A random starting direction that PCA refines by gradient descent"
    ],
    explain: "An eigenvector of a matrix is a direction that the matrix maps onto a scalar multiple of itself: applying the matrix stretches or shrinks it but does not change where it points. For a covariance matrix these eigenvectors are the principal components, and each one's eigenvalue tells how much variance the data has along it. That is why PCA reduces to an eigen-decomposition of the covariance matrix.",
    simple: "An eigenvector is a direction that a matrix leaves pointing the same way, only longer or shorter. For PCA's covariance matrix, those unmoved directions are exactly the principal components.",
    widget: {
      type: "curveStatic", title: "A direction the matrix only stretches",
      world: "Feeding directions into the covariance matrix and measuring how far each output turns away from its input direction.",
      xlab: "direction, from off-axis to eigenvector →", xs: [0,1,2,3,4], labels: ["off","→","→","→","eigen"], dec: 0, yunit: "°",
      series: [ { name: "angle the matrix turns the direction (°)", ys: [38, 27, 16, 7, 0] } ],
      knob: { label: "Nudge toward eigenvector", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A generic direction gets both stretched AND rotated when the matrix acts on it.", tone: "info" },
        { max: 3, text: "Line the direction up more carefully and the rotation shrinks away.", tone: "info" },
        { max: 4, text: "🤯 At zero turning the matrix only stretches it — that unrotated direction is an eigenvector, a PCA component.", tone: "wow" }
      ],
      extreme: { at: "min" },
      reveal: { name: "Eigenvector", formula: "M·v = λ·v (direction unchanged, only scaled)",
        text: "The covariance matrix's eigenvectors are PCA's principal components." }
    }
  });

  add("pca1", {
    q: "In PCA, what does the eigenvalue of a principal component tell you?",
    choices: [
      "How much of the data's variance lies along that component — a bigger eigenvalue means the component captures more spread",
      "The angle between that component and the original feature axes",
      "How many data points were projected onto that component",
      "The weight each original feature contributes to that component",
      "Whether the component is orthogonal to the others"
    ],
    explain: "Each principal component (eigenvector) comes with an eigenvalue that equals the variance of the data along that direction. Ranking components by eigenvalue therefore ranks them by how much of the total variability they explain, which is why the leading components are kept and the tiny-eigenvalue ones discarded. Dividing an eigenvalue by the sum of all eigenvalues gives that component's explained-variance ratio.",
    simple: "The eigenvalue is the size of the spread along a component. Big eigenvalue means the data stretches a lot in that direction, so the component is worth keeping; tiny eigenvalue means barely any spread.",
    widget: {
      type: "curveStatic", title: "Eigenvalue = variance on that axis",
      world: "Reading the eigenvalue attached to the 1st component, then the 2nd, and so on down the ranking.",
      xlab: "component (by eigenvalue rank) →", xs: [0,1,2,3,4], labels: ["1st","2nd","3rd","4th","5th"], dec: 1, yunit: "",
      series: [ { name: "eigenvalue (variance along component)", ys: [4.6, 1.8, 0.9, 0.4, 0.2] } ],
      knob: { label: "Component rank", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "The top component's eigenvalue is largest — most variance lives there.", tone: "info" },
        { max: 3, text: "Eigenvalues fall off as you move down the ranking, mirroring shrinking variance.", tone: "info" },
        { max: 4, text: "🤯 The eigenvalue IS the variance along its component, so it directly measures how informative that axis is.", tone: "wow" }
      ],
      extreme: { at: "min" },
      reveal: { name: "Eigenvalue", formula: "λ = variance of the data along its eigenvector",
        text: "Rank components by eigenvalue to rank them by variance explained." }
    }
  });

  add("pca1", {
    q: "In PCA, what is the explained-variance ratio of a component?",
    choices: [
      "The fraction of the data's total variance that a single component accounts for, found by dividing its eigenvalue by the sum of all eigenvalues",
      "The proportion of data points that lie exactly on the component",
      "The angle, as a fraction of 90°, between two components",
      "The share of features that received a non-zero loading on the component",
      "The percentage of the dataset that was used to fit the component"
    ],
    explain: "The explained-variance ratio expresses each component's eigenvalue as a share of the total variance (the sum of all eigenvalues), so the ratios across all components add up to 1. It answers 'what fraction of the whole picture does this axis carry?' and, summed over the kept components, tells you how much information a reduced representation retains. It is the standard yardstick for deciding how many components to keep.",
    simple: "It is the slice of the total spread that one component covers, written as a fraction. Add up the fractions for the components you keep and you know how much of the data you are holding on to.",
    widget: {
      type: "curveStatic", title: "Each component's slice of the whole",
      world: "Reading the fraction of total variance carried by component 1, then 2, then the later ones.",
      xlab: "component number →", xs: [0,1,2,3,4], labels: ["1st","2nd","3rd","4th","5th"], dec: 0, yunit: "%",
      series: [ { name: "explained-variance ratio (%)", ys: [58, 22, 12, 5, 3] } ],
      knob: { label: "Component number", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "The first component alone explains well over half the variance here.", tone: "info" },
        { max: 3, text: "The ratios shrink down the list, and all of them together sum to exactly 100%.", tone: "info" },
        { max: 4, text: "🤯 Because the ratios add to one, summing the kept ones tells you the fraction of data you retain.", tone: "wow" }
      ],
      extreme: { at: "min" },
      reveal: { name: "Explained-variance ratio", formula: "component eigenvalue ÷ sum of all eigenvalues",
        text: "It reports each component's share of the total variance." }
    }
  });

  add("pca1", {
    q: "What is a scree plot in PCA?",
    choices: [
      "A chart of each component's eigenvalue (or explained variance) against its rank, used to spot the 'elbow' where extra components stop adding much",
      "A scatter of the data projected onto the first two principal components",
      "A bar chart of how much each original feature loads onto PC1",
      "A heatmap of the covariance matrix before decomposition",
      "A curve of training error against the number of trees in a model"
    ],
    explain: "A scree plot lists the components on the x-axis in order of importance and plots their eigenvalues (or explained-variance ratios) on the y-axis. The curve typically drops steeply and then flattens; the 'elbow' where it levels off suggests how many components are worth keeping, since components past it contribute little variance. The name evokes the loose rubble ('scree') that piles up at the flat base of a cliff.",
    simple: "A scree plot draws the importance of each component from biggest to smallest. You look for the bend where the line flattens out — components after that bend are barely worth keeping.",
    widget: {
      type: "curveStatic", title: "The scree curve and its elbow",
      world: "Plotting eigenvalue against component rank and watching where the steep drop turns into a flat tail.",
      xlab: "component rank →", xs: [0,1,2,3,4], labels: ["1st","2nd","3rd","4th","5th"], dec: 1, yunit: "",
      series: [ { name: "eigenvalue", ys: [5.1, 2.0, 0.6, 0.35, 0.25] } ],
      knob: { label: "Component rank", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "The first eigenvalues tower above the rest — the curve starts high.", tone: "info" },
        { max: 3, text: "After a couple of components the curve bends sharply and starts to flatten.", tone: "info" },
        { max: 4, text: "🤯 That flat tail is the 'scree'; the elbow just before it hints how many components to keep.", tone: "wow" }
      ],
      extreme: { at: "min" },
      reveal: { name: "Scree plot", formula: "eigenvalue vs component rank, look for the elbow",
        text: "The bend where the curve flattens suggests how many components to retain." }
    }
  });

  add("pca1", {
    q: "In PCA, what is a loading?",
    choices: [
      "The weight an original feature carries in the formula for a principal component — how much that feature contributes to the component's direction",
      "The coordinate of a data point along a principal component",
      "The eigenvalue attached to a principal component",
      "The number of components you choose to keep",
      "The amount of variance lost when the data is reconstructed"
    ],
    explain: "Each principal component is a weighted sum of the original features, and the loadings are those weights — one per feature per component. Large-magnitude loadings mark the features that most define a component's direction, so loadings are how you interpret what a component 'means'. They are the entries of the eigenvectors and are distinct from scores, which are the projected positions of the data points.",
    simple: "A loading tells you how much each original column pulls on a component. Big loadings show which features that component is really about, which is how you give the component a plain-language meaning.",
    widget: {
      type: "curveStatic", title: "How strongly a feature loads",
      world: "Reading the loading (weight) that five different original features contribute to one principal component.",
      xlab: "feature, weakest to strongest →", xs: [0,1,2,3,4], labels: ["F1","F2","F3","F4","F5"], dec: 2, yunit: "",
      series: [ { name: "loading magnitude on the component", ys: [0.05, 0.14, 0.31, 0.52, 0.78] } ],
      knob: { label: "Feature", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Some features barely register on this component — near-zero loadings.", tone: "info" },
        { max: 3, text: "Others carry more weight, tilting the component's direction toward them.", tone: "info" },
        { max: 4, text: "🤯 The features with the biggest loadings define what the component actually represents.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Loading", formula: "feature's weight in a component (an eigenvector entry)",
        text: "Loadings show which original features drive each component." }
    }
  });

  add("pca1", {
    q: "In PCA, what is the covariance matrix that gets decomposed?",
    choices: [
      "A square table whose entries record how each pair of features varies together, whose eigenvectors become the principal components",
      "A table of the raw data values with one row per example and one column per feature",
      "A list of the eigenvalues, one for each principal component",
      "The matrix of projected scores after dimensionality reduction",
      "A confusion matrix comparing predicted and true labels"
    ],
    explain: "The covariance matrix is a symmetric square matrix with one row and column per feature; its diagonal holds each feature's variance and its off-diagonal entries hold the covariance between feature pairs. PCA diagonalises this matrix: its eigenvectors give the directions of the principal components and its eigenvalues give the variance along them. Strong off-diagonal covariances are exactly the redundancy PCA exploits to compress the data.",
    simple: "It is a grid showing how every pair of columns moves together — do they rise and fall in sync or independently? PCA cracks this grid open to find the directions that summarise all that shared movement.",
    widget: {
      type: "curveStatic", title: "Off-diagonal covariance = redundancy",
      world: "Increasing how tightly two features move together and watching the off-diagonal covariance entry grow.",
      xlab: "how linked the two features are →", xs: [0,1,2,3,4], labels: ["none","weak","some","strong","locked"], dec: 2, yunit: "",
      series: [ { name: "off-diagonal covariance", ys: [0.0, 0.22, 0.45, 0.71, 0.95] } ],
      knob: { label: "Feature coupling", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Unrelated features have near-zero covariance off the diagonal.", tone: "info" },
        { max: 3, text: "As features move together, their covariance entry climbs — the matrix records the link.", tone: "info" },
        { max: 4, text: "🤯 Those large off-diagonal values are the redundancy PCA folds into a single component.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Covariance matrix", formula: "feature×feature table of how pairs vary together",
        text: "PCA decomposes it into eigenvectors (components) and eigenvalues (variances)." }
    }
  });

  add("pca1", {
    q: "In PCA, what does it mean that the principal components are orthogonal?",
    choices: [
      "Each component points at a right angle to all the others, so the new axes are mutually perpendicular and their scores are uncorrelated",
      "Each component is parallel to one of the original feature axes",
      "The components all have the same length of one unit",
      "The components are ranked from smallest to largest variance",
      "Each component passes exactly through the mean of the data"
    ],
    explain: "PCA constructs its components to be mutually orthogonal: every component is perpendicular to all the earlier ones. Geometrically this makes the new axes a rigid rotation of the original ones; statistically it means the projected scores on different components are uncorrelated, so each component adds genuinely new, non-overlapping information. This is why the components can be interpreted and their variances simply added.",
    simple: "The components all sit at right angles to each other, like a fresh set of perpendicular axes. Because none of them overlap in direction, each captures a different, non-repeating piece of the data.",
    widget: {
      type: "curveStatic", title: "Right angles mean zero overlap",
      world: "Turning the second component from lined-up with the first toward a full right angle, tracking the correlation between their scores.",
      xlab: "angle between the two components →", xs: [0,1,2,3,4], labels: ["0°","30°","60°","80°","90°"], dec: 2, yunit: "",
      series: [ { name: "correlation between component scores", ys: [1.0, 0.75, 0.42, 0.17, 0.0] } ],
      knob: { label: "Angle between components", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Two nearly-aligned directions carry almost the same information — high correlation.", tone: "info" },
        { max: 3, text: "Opening up the angle steadily strips away the overlap between them.", tone: "info" },
        { max: 4, text: "🤯 At a full 90° the scores are uncorrelated — that orthogonality is what makes each component non-redundant.", tone: "wow" }
      ],
      extreme: { at: "min" },
      reveal: { name: "Orthogonal components", formula: "components meet at right angles ⇒ uncorrelated scores",
        text: "Perpendicular axes ensure each component carries new information." }
    }
  });

  add("pca1", {
    q: "In PCA, what is whitening (sphering)?",
    choices: [
      "An optional post-step that rescales the components so each has unit variance, making the transformed features uncorrelated and equally scaled",
      "Deleting all components whose eigenvalue is below a chosen cut-off",
      "Adding random noise to the data before the decomposition",
      "Rotating the components back onto the original feature axes",
      "Converting the covariance matrix into a correlation matrix"
    ],
    explain: "After projecting onto the principal components, whitening divides each component's scores by the square root of its eigenvalue (its standard deviation), so every transformed feature ends up with variance one. The result is a set of uncorrelated features on a common scale — a spherical, or 'white', cloud with no preferred direction. This is useful when a downstream algorithm expects features of comparable magnitude and no correlation.",
    simple: "Whitening stretches or squeezes each component so they all have the same spread of one, turning the data into an even, ball-shaped cloud. It hands the next algorithm features that are uncorrelated and all on the same scale.",
    widget: {
      type: "curveStatic", title: "Equalising the spread across axes",
      world: "Reading the variance of each component before whitening, then seeing whitening flatten them all to one.",
      xlab: "component →", xs: [0,1,2,3,4], labels: ["1st","2nd","3rd","4th","5th"], dec: 1, yunit: "",
      series: [ { name: "variance after whitening", ys: [1.0, 1.0, 1.0, 1.0, 1.0] } ],
      knob: { label: "Component", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Whitening rescales the first component down to variance one.", tone: "info" },
        { max: 3, text: "Every other component is rescaled the same way — none dominates any more.", tone: "info" },
        { max: 4, text: "🤯 With all variances equal to one, the cloud is spherical: uncorrelated features on a shared scale.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Whitening", formula: "divide each component's scores by its standard deviation ⇒ unit variance",
        text: "It leaves uncorrelated features all scaled to variance one." }
    }
  });

  /* ============================ tsne1 (10) ============================ */

  add("tsne1", {
    q: "What is t-SNE (t-distributed Stochastic Neighbor Embedding)?",
    choices: [
      "A nonlinear method that places high-dimensional points on a 2-D or 3-D map so that near neighbours stay close, mainly for visualisation",
      "A linear method that keeps the directions of greatest variance in the data",
      "A supervised classifier that separates labelled points with a curved boundary",
      "A clustering rule that grows groups outward from dense seed points",
      "A search that tunes model settings to maximise a validation score"
    ],
    explain: "t-SNE is a nonlinear dimensionality-reduction technique designed for visualisation: it converts pairwise similarities among high-dimensional points into probabilities and lays the points out in low dimensions so that those neighbour relationships are preserved. It excels at revealing local structure and clusters but distorts global distances, so between-cluster gaps and sizes on a t-SNE map should not be read literally. It is unsupervised and uses no labels.",
    simple: "t-SNE draws a map of complicated, many-column data on a flat page so that things which were close together stay close together. It is great for spotting clusters by eye, though the distances between far-apart blobs do not mean much.",
    widget: {
      type: "curveStatic", title: "Keeping neighbours close on the map",
      world: "Running more optimisation and measuring how well each point's true near neighbours end up near it on the 2-D map.",
      xlab: "optimisation progress →", xs: [0,1,2,3,4], labels: ["start","¼","½","¾","done"], dec: 0, yunit: "%",
      series: [ { name: "neighbours preserved (%)", ys: [12, 44, 68, 84, 92] } ],
      knob: { label: "Optimisation progress", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "From a random start, neighbours are scattered all over the map.", tone: "info" },
        { max: 3, text: "As the layout is optimised, true neighbours are pulled together.", tone: "info" },
        { max: 4, text: "🤯 The finished map keeps local neighbourhoods intact — that is exactly what t-SNE optimises for.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "t-SNE", formula: "match neighbour probabilities in high-D and low-D, minimise their difference",
        text: "A nonlinear map that preserves local neighbourhoods for visualisation." }
    }
  });

  add("tsne1", {
    q: "In t-SNE, what is perplexity?",
    choices: [
      "A setting that fixes roughly how many nearby neighbours each point tries to keep, balancing attention to local versus broader structure",
      "The learning rate that controls how big each optimisation step is",
      "The number of output dimensions the map is drawn in",
      "The random seed that determines the starting layout",
      "The number of iterations the optimisation is allowed to run"
    ],
    explain: "Perplexity sets the effective number of neighbours each point considers when its similarities are computed — loosely, the size of the local neighbourhood the algorithm respects. Small perplexity emphasises very local structure and can fragment the data; large perplexity blends in more distant points and smooths clusters together. Typical values run from about 5 to 50, and the resulting map can change noticeably with the choice.",
    simple: "Perplexity is a dial for how many close neighbours each point pays attention to. Turn it low and t-SNE looks at tiny local groups; turn it high and it considers a wider circle around each point.",
    widget: {
      type: "curveStatic", title: "Perplexity sets the neighbourhood size",
      world: "Raising the perplexity setting and watching the effective number of neighbours each point keeps track of grow.",
      xlab: "perplexity setting →", xs: [0,1,2,3,4], labels: ["5","15","30","50","100"], dec: 0, yunit: "",
      series: [ { name: "effective neighbours per point", ys: [5, 15, 30, 50, 100] } ],
      knob: { label: "Perplexity", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Low perplexity means each point only listens to a tiny handful of close neighbours.", tone: "info" },
        { max: 3, text: "Raise it and each point takes a wider circle of neighbours into account.", tone: "info" },
        { max: 4, text: "🤯 Perplexity is essentially the target neighbourhood size — it trades local detail against broader structure.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Perplexity", formula: "target effective number of neighbours per point",
        text: "It controls how local or global t-SNE's view of the data is." }
    }
  });

  add("tsne1", {
    q: "What is nonlinear dimensionality reduction, the family t-SNE belongs to?",
    choices: [
      "Reducing many features to a few using curved, flexible mappings that can unfold structure a straight projection would flatten or tear",
      "Reducing features only by deleting the columns with the smallest values",
      "Reducing features strictly through weighted sums, so every new axis is a straight line through the data",
      "Increasing the number of features by adding polynomial combinations",
      "Splitting the data into clusters and keeping only the cluster labels"
    ],
    explain: "Nonlinear dimensionality reduction maps high-dimensional data to a low-dimensional representation using mappings that are not restricted to linear combinations of the features. This lets it capture curved structure — data lying on a bent surface (a manifold) — that a linear method like PCA would either flatten or split. t-SNE, UMAP, and Isomap are examples; the flexibility comes at the cost of harder-to-interpret, non-unique embeddings.",
    simple: "It is squeezing lots of columns down to a few using bendy, flexible mappings instead of straight ones. That flexibility lets it unroll data curled up on a curved surface, which a straight-line method would just squash.",
    widget: {
      type: "curveStatic", title: "Unfolding a curved surface",
      world: "Letting the mapping bend more freely and measuring how faithfully it unrolls data that lies on a curved (Swiss-roll) surface.",
      xlab: "mapping flexibility →", xs: [0,1,2,3,4], labels: ["linear","▹","▹","▹","full"], dec: 0, yunit: "%",
      series: [ { name: "curved structure recovered (%)", ys: [30, 52, 71, 86, 95] } ],
      knob: { label: "Mapping flexibility", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A strictly straight projection flattens the curved surface and loses its shape.", tone: "info" },
        { max: 3, text: "Allowing the mapping to bend recovers more and more of the true structure.", tone: "info" },
        { max: 4, text: "🤯 With a fully flexible mapping the curled-up manifold unrolls cleanly — the payoff of going nonlinear.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Nonlinear dimensionality reduction", formula: "curved mapping from many features to a few",
        text: "It unfolds curved structure that linear methods cannot." }
    }
  });

  add("tsne1", {
    q: "In t-SNE, what is neighbourhood preservation?",
    choices: [
      "The goal that points close together in the original high-dimensional space end up close together on the low-dimensional map",
      "The goal that the total distance between all pairs of points is kept exactly the same",
      "The goal that every cluster ends up the same physical size on the map",
      "The goal that the map's axes line up with the original features",
      "The goal that the number of points is reduced along with the dimensions"
    ],
    explain: "Neighbourhood preservation is the criterion t-SNE optimises: it tries to keep each point's set of nearby neighbours from the high-dimensional space nearby in the embedding. It deliberately sacrifices faithful global distances to do this, which is why local clusters look trustworthy but the gaps and sizes between clusters do not. Metrics like trustworthiness quantify how well neighbourhoods are retained.",
    simple: "It means the things that were close together in the original data stay close together on the map. t-SNE cares about getting the neighbours right, even if it means the big-picture distances get distorted.",
    widget: {
      type: "curveStatic", title: "Are your true neighbours still near?",
      world: "Checking, for each point, what fraction of its original nearest neighbours remain among its nearest neighbours on the map.",
      xlab: "embedding quality →", xs: [0,1,2,3,4], labels: ["poor","▹","▹","▹","good"], dec: 0, yunit: "%",
      series: [ { name: "true neighbours kept nearby (%)", ys: [20, 45, 66, 82, 93] } ],
      knob: { label: "Embedding quality", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A poor embedding scatters each point's real neighbours far away.", tone: "info" },
        { max: 3, text: "A better layout keeps more of those original neighbours close.", tone: "info" },
        { max: 4, text: "🤯 High neighbour retention is precisely what 'neighbourhood preservation' means — t-SNE's whole aim.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Neighbourhood preservation", formula: "close in high-D ⇒ close in low-D",
        text: "t-SNE keeps local neighbours together, trading away global accuracy." }
    }
  });

  add("tsne1", {
    q: "In t-SNE, what does the KL-divergence objective measure?",
    choices: [
      "The mismatch between the neighbour-similarity probabilities in the original space and those on the map, which t-SNE minimises",
      "The total variance retained by the low-dimensional map",
      "The distance from each point to the centre of its cluster",
      "The number of neighbours each point is allowed to keep",
      "The classification error of a model trained on the embedding"
    ],
    explain: "t-SNE turns pairwise closeness into probability distributions — one over neighbours in the high-dimensional space and one on the map — and uses the Kullback-Leibler (KL) divergence to measure how different those two distributions are. Optimisation moves the map's points to drive this divergence down, so the low-dimensional similarities match the high-dimensional ones as closely as possible. Because KL divergence penalises putting distant map points where near ones belong, it prioritises preserving local neighbourhoods.",
    simple: "t-SNE describes closeness as probabilities and then measures the gap between the original closeness pattern and the one on the map. That gap is the KL divergence, and t-SNE nudges points around to make it as small as possible.",
    widget: {
      type: "curveStatic", title: "Shrinking the mismatch each step",
      world: "Running more optimisation iterations and reading the KL-divergence loss between high-D and low-D neighbour probabilities.",
      xlab: "iterations →", xs: [0,1,2,3,4], labels: ["0","250","500","750","1000"], dec: 2, yunit: "",
      series: [ { name: "KL-divergence loss", ys: [3.10, 1.60, 0.90, 0.55, 0.40] } ],
      knob: { label: "Iterations", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "At the start the map's similarities barely match the originals — high loss.", tone: "info" },
        { max: 3, text: "Each step rearranges points to better match, and the divergence falls.", tone: "info" },
        { max: 4, text: "🤯 Minimising this KL divergence is the entire training objective of t-SNE.", tone: "wow" }
      ],
      extreme: { at: "min" },
      reveal: { name: "KL-divergence objective", formula: "KL( high-D neighbour probs ‖ low-D neighbour probs )",
        text: "t-SNE moves points to minimise this mismatch between the two similarity distributions." }
    }
  });

  add("tsne1", {
    q: "In t-SNE, what is the learning rate?",
    choices: [
      "A setting for how large each optimisation step is — too small and the map barely moves, too large and the points fly apart into a mess",
      "The number of neighbours each point tries to preserve",
      "The count of output dimensions for the map",
      "The threshold below which two points are called neighbours",
      "The fraction of the data used to build the embedding"
    ],
    explain: "The learning rate scales how far the points are moved on each gradient-descent step while t-SNE minimises its objective. If it is too low, optimisation crawls or gets stuck with points clumped in a dense ball; if it is too high, the points overshoot and the layout diverges into a scattered blob. A well-chosen value (often scaled to the dataset size) lets clusters form cleanly, which is why it is a key tuning knob.",
    simple: "The learning rate is the size of the steps t-SNE takes while arranging the map. Tiny steps and it hardly moves; huge steps and the points scatter chaotically — you want something in between.",
    widget: {
      type: "curveStatic", title: "Step size versus map quality",
      world: "Sweeping the learning rate from far too small up through far too large and rating how good the resulting map is.",
      xlab: "learning rate →", xs: [0,1,2,3,4], labels: ["tiny","low","good","high","huge"], dec: 0, yunit: "%",
      series: [ { name: "map quality (%)", ys: [25, 60, 92, 58, 22] } ],
      knob: { label: "Learning rate", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Too small a step and the points barely move — the map stays a clumped ball.", tone: "info" },
        { max: 3, text: "A moderate rate lets clusters settle out cleanly — quality peaks in the middle.", tone: "info" },
        { max: 4, text: "🤯 Push the rate too high and the points overshoot and scatter — quality collapses again.", tone: "wow" }
      ],
      extreme: { at: "min" },
      reveal: { name: "Learning rate (t-SNE)", formula: "size of each optimisation step",
        text: "Too small stalls, too large diverges — a middle value gives the best map." }
    }
  });

  add("tsne1", {
    q: "In t-SNE, what is meant by 'local structure'?",
    choices: [
      "The fine-grained relationships among nearby points — which points are each other's close neighbours — that t-SNE works hard to preserve",
      "The overall shape and spacing between far-apart clusters across the whole map",
      "The direction in which the data varies the most",
      "The total number of clusters present in the data",
      "The axes chosen to draw the final embedding"
    ],
    explain: "Local structure refers to the close-range relationships in the data — each point's immediate neighbourhood and which points cluster tightly together. t-SNE is built to preserve exactly this, at the deliberate expense of global structure (the arrangement and distances among far-apart groups). That trade-off is why t-SNE maps reveal clusters faithfully but should not be read for how far apart or how large those clusters are.",
    simple: "Local structure is the close-up detail: who your near neighbours are and which points huddle together. t-SNE protects this fine detail, even though it lets the big-picture layout get warped.",
    widget: {
      type: "curveStatic", title: "Local detail kept, global less so",
      world: "Comparing how faithfully t-SNE preserves near-neighbour relations versus far-apart, global distances as you zoom out.",
      xlab: "scale, from local to global →", xs: [0,1,2,3,4], labels: ["nearest","close","mid","far","global"], dec: 0, yunit: "%",
      series: [ { name: "relationships preserved (%)", ys: [94, 82, 60, 35, 18] } ],
      knob: { label: "Scale", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "At the nearest scale, t-SNE keeps almost all the neighbour relationships intact.", tone: "info" },
        { max: 3, text: "As you look at wider scales, fidelity drops — mid-range distances get distorted.", tone: "info" },
        { max: 4, text: "🤯 Global distances are barely preserved: t-SNE guards local structure and sacrifices the rest.", tone: "wow" }
      ],
      extreme: { at: "min" },
      reveal: { name: "Local structure", formula: "who is close to whom (near-neighbour relations)",
        text: "t-SNE preserves fine local detail at the cost of global geometry." }
    }
  });

  add("tsne1", {
    q: "In dimensionality reduction, what is the 'crowding problem' that t-SNE addresses?",
    choices: [
      "In high dimensions a point can have many roughly-equidistant neighbours, and there is not enough room in 2-D to place them all at their correct distances",
      "The optimisation running out of memory when the dataset has too many points",
      "Two clusters overlapping because the learning rate was set too high",
      "The map looking different every time because of a random seed",
      "Features being on wildly different scales before the reduction"
    ],
    explain: "The crowding problem arises because a high-dimensional space has room for many points to all sit a moderate distance from a given point, but a 2-D map cannot accommodate all those moderate distances at once — the neighbours get squeezed and pile up. t-SNE eases this by using a heavy-tailed Student-t distribution in the low-dimensional space, which allows moderately-distant points to spread further apart and prevents everything collapsing into a crowded lump.",
    simple: "In lots of dimensions there is space for a point to have many neighbours all about the same distance away, but a flat page just does not have room for them all. That squeeze is the crowding problem, and t-SNE's heavy-tailed curve is its fix.",
    widget: {
      type: "curveStatic", title: "No room to place all the neighbours",
      world: "Increasing the original number of dimensions and counting how many neighbours become impossible to place faithfully on a 2-D map.",
      xlab: "original dimensions →", xs: [0,1,2,3,4], labels: ["2","10","50","200","1000"], dec: 0, yunit: "%",
      series: [ { name: "neighbours that get crowded (%)", ys: [5, 22, 48, 72, 88] } ],
      knob: { label: "Original dimensions", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "In just a couple of dimensions everything fits — barely any crowding.", tone: "info" },
        { max: 3, text: "As dimensions climb, more neighbours are all equidistant and cannot all fit on the flat map.", tone: "info" },
        { max: 4, text: "🤯 That pile-up is the crowding problem — t-SNE's heavy-tailed low-D curve makes room by spreading points out.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Crowding problem", formula: "too many equidistant high-D neighbours for 2-D to hold",
        text: "t-SNE's Student-t tail spreads points out to relieve the crowding." }
    }
  });

  add("tsne1", {
    q: "In t-SNE, what is early exaggeration?",
    choices: [
      "An early-phase trick that temporarily amplifies the attraction between true neighbours, so clusters form tight and well-separated before normal optimisation continues",
      "Starting the map with the points laid out along the first principal component",
      "Running extra iterations at the very end to fine-tune the layout",
      "Increasing the perplexity partway through the run",
      "Adding random noise to prevent the points from overlapping"
    ],
    explain: "Early exaggeration multiplies the high-dimensional neighbour probabilities by a factor (commonly around 12) during the first phase of optimisation. This over-emphasises the pull between genuine neighbours, encouraging points to gather into tight clusters with clear gaps between them; the factor is then removed so the layout can settle normally. It helps t-SNE find a good global arrangement of clusters early and avoid getting tangled.",
    simple: "For the first stretch of training, t-SNE cranks up the pull between real neighbours so clusters snap together tightly with clear space around them. Then it turns the exaggeration off and lets the map relax into its final form.",
    widget: {
      type: "curveStatic", title: "Exaggeration sharpens the clusters",
      world: "Turning up the early-exaggeration factor and measuring how cleanly separated the clusters become in the early phase.",
      xlab: "exaggeration factor →", xs: [0,1,2,3,4], labels: ["1×","4×","8×","12×","20×"], dec: 0, yunit: "%",
      series: [ { name: "cluster separation (%)", ys: [30, 55, 74, 88, 90] } ],
      knob: { label: "Exaggeration factor", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With no exaggeration the early map is a mushy blob with weak gaps.", tone: "info" },
        { max: 3, text: "Amplifying neighbour attraction pulls true clusters tight and pushes them apart.", tone: "info" },
        { max: 4, text: "🤯 That early over-attraction is 'early exaggeration' — it seeds clean, well-separated clusters before normal optimisation.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Early exaggeration", formula: "scale up neighbour attractions early, then remove",
        text: "It forms tight, well-separated clusters at the start of the run." }
    }
  });

  add("tsne1", {
    q: "In t-SNE, what does initialising with init='pca' do?",
    choices: [
      "It starts the map from the data's first two PCA components instead of a random layout, giving more stable, reproducible embeddings that better retain global arrangement",
      "It replaces t-SNE entirely with PCA and skips the neighbour optimisation",
      "It sets the perplexity automatically from the PCA eigenvalues",
      "It whitens the data so every feature has equal variance before t-SNE runs",
      "It fixes the learning rate to match the largest principal component"
    ],
    explain: "By default t-SNE begins from a small random layout, so different runs can produce differently-oriented maps. Setting init='pca' instead seeds the starting positions with the data projected onto its first two principal components. Because that starting point already reflects the data's main axes of variation, the optimisation is more reproducible and tends to preserve more of the global structure than a random start.",
    simple: "Instead of scattering the points randomly to begin with, t-SNE can start them from a quick PCA layout. That head start makes the final map more repeatable run-to-run and keeps the big-picture arrangement a bit better.",
    widget: {
      type: "curveStatic", title: "PCA start vs random start",
      world: "Comparing embeddings that begin from a PCA layout against random starts, scoring how reproducible and globally faithful they are.",
      xlab: "starting layout →", xs: [0,1,2,3,4], labels: ["random","▹","mixed","▹","PCA"], dec: 0, yunit: "%",
      series: [ { name: "reproducibility & global fidelity (%)", ys: [45, 56, 68, 80, 90] } ],
      knob: { label: "Initialisation", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A random start can rotate or rearrange the map differently on every run.", tone: "info" },
        { max: 3, text: "Seeding from principal components anchors the layout to the data's main axes.", tone: "info" },
        { max: 4, text: "🤯 A PCA start makes t-SNE more reproducible and preserves more global structure than random.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "init='pca'", formula: "seed the map with the first two PCA components",
        text: "A PCA start yields more stable, globally faithful t-SNE maps." }
    }
  });

}());
