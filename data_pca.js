/* PCA — Parts I & II. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).pca1 = [
  {
    "q": "PCA scans your data to find directions of greatest spread. Does it use the target labels (the values you are trying to predict)?",
    "choices": [
      "No — PCA ignores labels and reads only the features",
      "Yes — it points the first axis toward the labels",
      "Yes — labels decide which features to keep first",
      "Only when the labels are numeric, not categories",
      "Only after you standardise the labels with the features"
    ],
    "explain": "PCA is an unsupervised method: it computes directions of maximum variance from the feature matrix alone and never touches the target column. Because of this, the exact same components come out whether or not a label exists. This also means high-variance directions are not guaranteed to be the ones that help prediction.",
    "simple": "Imagine sorting a pile of photos purely by how different they look from each other, without ever being told the categories. That is PCA: it studies how the data spreads and never peeks at the answer key. Give it labels or hide them and it draws exactly the same axes.",
    "widget": {
      "type": "curveStatic",
      "title": "The labels sit unused",
      "world": "Keep adding label columns next to the data and watch how many of them PCA actually reads while choosing its axes.",
      "xlab": "label columns available →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["0 labels", "1 label", "2 labels", "3 labels", "4 labels"],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "labels PCA uses", "ys": [0, 0, 0, 0, 0] },
        { "name": "features PCA uses", "ys": [8, 8, 8, 8, 8] }
      ],
      "knob": { "label": "Label columns added", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "One label available — PCA ignores it and reads only the feature spread.", "tone": "info" },
        { "max": 3, "text": "Three labels sitting right there, still unused; the axes depend only on the features.", "tone": "info" },
        { "max": 4, "text": "🤯 However many labels you add, PCA uses zero of them — it is unsupervised, so the same components come out with or without a target.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "PCA is unsupervised", "formula": "components = f(features only); labels ignored", "text": "PCA builds its axes from feature variance alone, so it never looks at the target labels." }
    }
  },
  {
    "q": "Your data has 40 features, far too many to plot. How does PCA let you SEE the cloud on a 2-D scatter plot?",
    "choices": [
      "Project every point onto the top 2 components and plot those",
      "Drop every feature except the two whose raw numeric range across the whole dataset is widest",
      "Average the 40 features down into 2 summary columns",
      "Plot the 2 features that correlate most with the rest",
      "Cluster the points first, then plot the 2 largest groups"
    ],
    "explain": "To visualise high-dimensional data, PCA keeps only the first two principal components and gives each point its coordinates along them. Plotting PC1 against PC2 puts every row on a single 2-D scatter that preserves as much of the total spread as any two axes can. It is the standard first look at an unlabelled dataset's structure.",
    "simple": "Picture a tangled 3-D sculpture: photograph it from the one angle that shows the most detail and you get a flat picture you can actually study. PCA finds that best 'camera angle' for 40-dimensional data and shrinks it to two axes. You lose some depth, but you finally get a picture you can look at.",
    "widget": {
      "type": "curveStatic",
      "title": "Many features, still 2 axes",
      "world": "Grow the number of features in the dataset and watch how many axes PCA needs to draw the picture you actually look at.",
      "xlab": "features in the data →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["2 feat", "10 feat", "20 feat", "30 feat", "40 feat"],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "original features", "ys": [2, 10, 20, 30, 40] },
        { "name": "PCs used to plot", "ys": [2, 2, 2, 2, 2] }
      ],
      "knob": { "label": "Features in data", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "2 features already plot as a scatter — no PCA needed yet.", "tone": "info" },
        { "max": 3, "text": "20-30 features cannot be plotted directly, but projecting onto PC1 and PC2 still gives one 2-D scatter.", "tone": "info" },
        { "max": 4, "text": "🤯 40 features, still just 2 axes to draw — plot PC1 vs PC2 and you SEE the whole cloud's main structure.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "PCA for visualisation", "formula": "plot = points projected onto PC1 and PC2", "text": "Keeping the top two components turns any high-dimensional dataset into one readable 2-D scatter." }
    }
  },
  {
    "q": "PCA talks about a dataset's 'dimensions'. In this sense, what are the dimensions?",
    "choices": [
      "The number of features (columns), one axis per feature",
      "The number of data points (rows) gathered for the dataset",
      "The count of principal components worth keeping after PCA",
      "The number of separate clusters hidden inside the cloud",
      "The spread of values along the most variable feature"
    ],
    "explain": "Each feature is a coordinate axis, so a table with 50 columns describes points in 50-dimensional space, no matter how many rows it has. Dimensionality is about width (features), not height (samples). PCA's job is to replace those many axes with a few blended ones.",
    "simple": "Describing a person by height alone puts them on a line (1-D); add weight and they live on a flat sheet (2-D); add age and it becomes a room (3-D). Every new measurement is a new direction to move in. Fifty measurements means a 50-directional space no eye can picture, which is exactly why PCA wants to shrink it.",
    "widget": {
      "type": "curveStatic",
      "title": "One feature, one axis",
      "world": "Start with one measurement and keep adding more; each new feature opens a brand-new direction the data can vary in.",
      "xlab": "features described →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["1 feature", "2 features", "3 features", "4 features", "5 features"],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "axes in the space", "ys": [1, 2, 3, 4, 5] }
      ],
      "knob": { "label": "Features added", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "One or two features: a line or a flat sheet, easy to picture and easy to plot.", "tone": "info" },
        { "max": 3, "text": "Four features already means a 4-axis space; your eyes give out at three.", "tone": "info" },
        { "max": 4, "text": "🤯 Each feature is literally another axis, so 50 columns build a 50-dimensional space. PCA exists to swap those many axes for a handful.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Dimension", "formula": "one feature = one axis; d features = d-dimensional space", "text": "Dimensionality counts features, not samples; PCA replaces many axes with a few high-variance ones." }
    }
  },
  {
    "q": "PCA produces a 'scree plot'. What does it show, and what is it for?",
    "choices": [
      "Each component's variance, plotted; the elbow hints how many to keep",
      "Each feature's loading, plotted; used to name what a component means",
      "The data points projected onto the first two principal components, mapped",
      "Each point's reconstruction error, plotted to flag anomalous rows",
      "Features ranked by correlation, used to drop redundant columns"
    ],
    "explain": "A scree plot draws each component's explained variance in descending order. The curve usually drops steeply and then flattens; the elbow where it levels off marks the point beyond which extra components add little, guiding how many to retain.",
    "simple": "Picture a mountainside of loose rubble (scree) that starts steep and then eases into a gentle slope. The steep part is your few important components; the flat tail is the rubble, small and interchangeable leftovers. You keep the axes before the bend and let the rest slide.",
    "widget": {
      "type": "curveStatic",
      "title": "Find the elbow",
      "world": "Variance carried by each component, biggest first; watch where the steep drop turns into a flat tail.",
      "xlab": "component number →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["PC1", "PC2", "PC3", "PC4", "PC5"],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "variance explained (%)", "ys": [62, 21, 9, 5, 3] }
      ],
      "knob": { "label": "Component", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "PC1 and PC2 tower over the rest, the steep face of the slope where most of the story lives.", "tone": "info" },
        { "max": 3, "text": "By PC3 and PC4 the bars have shrunk to single digits; the curve is bending into its flat tail.", "tone": "info" },
        { "max": 4, "text": "🤯 The elbow after the second or third bar is the whole point: keep the axes before it, discard the flat rubble after.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Scree plot", "formula": "plot variance explained per component; keep the axes before the elbow", "text": "The elbow is a visual rule of thumb for how many components to retain." }
    }
  },
  {
    "q": "In PCA-based anomaly detection you compute a point's 'reconstruction error'. What is it?",
    "choices": [
      "How much a point changes after being compressed and then rebuilt",
      "How far a point sits from the overall mean of the whole dataset",
      "How many components are needed before the point is captured",
      "How much variance the discarded components would have added back",
      "How poorly a trained classifier predicts the label of that point"
    ],
    "explain": "PCA compresses a point onto a few components, then reconstructs it back in the original space; the gap between the original and the rebuilt version is the reconstruction error. Ordinary points live in the space the top components span, so they survive the round trip almost unchanged, while anomalies lie off those directions and come back distorted, and that large error flags them.",
    "simple": "Imagine summarising a photo in ten words, then asking a friend to redraw it from your words. A typical scene comes back close to the original; a bizarre one-off scene comes back mangled, because your ten words never planned for it. PCA does the same round trip, and the points that rebuild badly are the odd ones out.",
    "widget": {
      "type": "curveStatic",
      "title": "Survive the round trip?",
      "world": "Compress each point to a few components and rebuild it; measure how far the rebuilt version lands from the original.",
      "xlab": "points, typical → unusual →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["typical", "typical", "mixed", "unusual", "anomaly"],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "reconstruction error", "ys": [3, 5, 12, 34, 71] }
      ],
      "knob": { "label": "Point", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Typical points rebuild almost perfectly, a tiny error, because they lie in the space the top components describe.", "tone": "info" },
        { "max": 3, "text": "As points drift off the main directions, the rebuilt version lands further away and the error climbs.", "tone": "info" },
        { "max": 4, "text": "🤯 The anomaly cannot be rebuilt from the kept components, so its error spikes, and that large reconstruction error is exactly the alarm PCA anomaly detection listens for.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Reconstruction error", "formula": "error = ||x - rebuild(compress(x))||; large error means anomaly", "text": "Normal points survive compression but anomalies do not, so reconstruction error doubles as an outlier score." }
    }
  },
  {
    "q": "PCA works by 'projecting' data onto fewer directions. What does projecting a point onto a line mean?",
    "choices": [
      "Dropping it straight onto the line, like a shadow — keeping its position along the line, losing the rest",
      "Moving the point sideways to the nearest already-existing data point that happens to sit on the line",
      "Rounding every one of the point's coordinates to the closest whole number before it is plotted",
      "Deleting the point from the dataset entirely whenever it happens to fall somewhere off to the side of the line",
      "Rotating the whole dataset around until it finally comes to lie completely flat on the floor"
    ],
    "explain": "Projection casts each point onto a chosen line (or lower-dimensional space) — like a shadow falling onto the floor. You keep the point's position ALONG the line and discard the perpendicular part. PCA's job is choosing the line that loses the least.",
    "simple": "Think of shadows. Shine a light straight down and every point drops onto the floor, keeping its left-right position but losing its height. That's projection: squash onto a line, keep the along-the-line position, throw away the rest. Reducing dimensions IS projecting — and PCA just picks the smartest direction to cast the shadow.",
    "widget": {
      "type": "pcaSpin",
      "title": "Casting the shadow",
      "world": "An oval cloud of points. Rotate the line and watch each point drop onto it (its shadow). Some angles keep the points spread out; others squash them together.",
      "xlab": "x",
      "ylab": "y",
      "points": [
        { "x": 1, "y": 2.4 },
        { "x": 2, "y": 3.1 },
        { "x": 3, "y": 3.4 },
        { "x": 3.5, "y": 4.4 },
        { "x": 4.5, "y": 4.2 },
        { "x": 5, "y": 5.6 },
        { "x": 5.5, "y": 5.1 },
        { "x": 6.5, "y": 6.3 },
        { "x": 7, "y": 5.9 },
        { "x": 8, "y": 7.4 },
        { "x": 8.5, "y": 6.9 },
        { "x": 9, "y": 7.8 }
      ],
      "knob": { "label": "Axis angle", "min": 0, "max": 180, "step": 2, "init": 90 },
      "insights": [
        { "max": 60, "text": "Project onto this line and the shadows bunch up — points that were far apart land near each other. Lots of information lost.", "tone": "info" },
        { "max": 120, "text": "Rotate toward the cloud's long direction and the shadows spread out again — the projection keeps more of how the points differ.", "tone": "info" },
        { "max": 180, "text": "🤯 Projection is just 'drop each point onto the line'. It's not rounding, not snapping to a nearby point, not deleting — it's a shadow, and the angle decides how much survives.", "tone": "wow" }
      ],
      "extreme": { "at": 34 },
      "reveal": { "name": "Projection", "formula": "cast each point onto a line/subspace, keep the along-axis position", "text": "Dimensionality reduction is projection onto fewer directions. PCA chooses the directions that keep the most spread." }
    }
  },
  {
    "q": "PCA's first output is the 'first principal component' (PC1). What is it?",
    "choices": [
      "The single direction along which the data is most spread out",
      "The one most important original feature, kept exactly as it is and unchanged",
      "The single average position of every one of the data points combined",
      "The straight line that connects up the two single farthest-apart points",
      "The one direction that happens to carry the very least variation in all the data"
    ],
    "explain": "PC1 is the direction of MAXIMUM variance — the line along which the cloud is stretched most. Projecting onto it preserves as much spread (information) as any single direction can. PC2 is the most-spread direction at right angles to it, and so on.",
    "simple": "PC1 is the cloud's long axis — the direction it's stretched the most. Flatten the data onto that one line and you keep more of how the points differ than any other line could manage. It's a new blended direction, not an original column, not the average, and definitely not the FLATTEST direction (that's the one PCA throws away).",
    "widget": {
      "type": "pcaSpin",
      "title": "The long axis of the cloud",
      "world": "Rotate the line and watch how spread-out the projected shadows are. PC1 is the angle where that spread is greatest.",
      "xlab": "x",
      "ylab": "y",
      "points": [
        { "x": 1, "y": 2.4 },
        { "x": 2, "y": 3.1 },
        { "x": 3, "y": 3.4 },
        { "x": 3.5, "y": 4.4 },
        { "x": 4.5, "y": 4.2 },
        { "x": 5, "y": 5.6 },
        { "x": 5.5, "y": 5.1 },
        { "x": 6.5, "y": 6.3 },
        { "x": 7, "y": 5.9 },
        { "x": 8, "y": 7.4 },
        { "x": 8.5, "y": 6.9 },
        { "x": 9, "y": 7.8 }
      ],
      "knob": { "label": "Axis angle", "min": 0, "max": 180, "step": 2, "init": 90 },
      "insights": [
        { "max": 20, "text": "Across the cloud's short direction: the shadows squash together — minimal spread. This is the direction PCA would DISCARD.", "tone": "info" },
        { "max": 60, "text": "Rotating toward the long diagonal, the spread of shadows grows — we're approaching PC1.", "tone": "info" },
        { "max": 180, "text": "🤯 The angle of maximum spread IS PC1 — the direction that best preserves how the points differ. Not a raw feature, not the average, not the flattest line.", "tone": "wow" }
      ],
      "extreme": { "at": 34 },
      "reveal": { "name": "Principal component (PC1)", "formula": "direction of maximum variance · PC2 = max variance at right angles · etc.", "text": "Each component is a blended direction. Keeping the top few is how PCA compresses while losing the least spread." }
    }
  },
  {
    "q": "PCA ranks components by 'variance'. Why does more variance mean more useful information?",
    "choices": [
      "A direction where points barely differ tells you almost nothing; spread is what distinguishes them",
      "Variance is really just a direct measure of how accurate the model's predictions turn out to be",
      "High variance simply means that the feature happens to be measured in much larger, coarser units",
      "Variance really just counts how many of the data points lie exactly on top of the line",
      "More variance in a direction always means that the data lying there is far noisier rather than richer"
    ],
    "explain": "If every point projects to nearly the same spot along a direction, that direction can't tell the points apart — it carries little information. Spread (variance) is exactly what separates one point from another, so PCA keeps the high-variance directions and drops the flat ones.",
    "simple": "Imagine a direction where everyone lands on the same spot — it distinguishes nobody, so it's useless for telling points apart. A direction where points spread out widely separates them clearly. Spread is information. That's why PCA ranks directions by variance and keeps the spread-out ones, discarding the flat directions where nothing varies.",
    "widget": {
      "type": "curveStatic",
      "title": "Spread is information",
      "world": "Two directions through the data: one where points spread widely, one where they bunch up. See how much each helps tell points apart.",
      "xlab": "direction, low-spread → high-spread →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "flat",
        "",
        "medium",
        "",
        "long axis"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "variance kept (%)", "ys": [ 4, 18, 45, 72, 94 ] },
        { "name": "how well points stay distinguishable", "ys": [ 6, 22, 48, 74, 95 ] }
      ],
      "knob": { "label": "Direction", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "The flat direction: points collapse onto nearly one spot — 4% of the variance, and you can barely tell them apart. Useless to keep.", "tone": "info" },
        { "max": 2, "text": "As spread grows, the projection keeps points more distinguishable — variance and 'usefulness' rise together.", "tone": "info" },
        { "max": 4, "text": "🤯 The long axis keeps 94% of the spread and almost all the distinguishing power. Variance IS information here — not accuracy, not units, not noise. That's why PCA keeps the high-variance directions.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Variance as information", "formula": "no spread → points indistinguishable → no information · PCA keeps high-variance directions", "text": "The 'explained variance ratio' reports how much of the total spread each component keeps — your guide to how many to retain." }
    }
  },
  {
    "q": "Each principal component comes with 'loadings'. What do loadings tell you?",
    "choices": [
      "How much each original feature contributes to that component — its recipe",
      "How many of the original data points happen to fall exactly on the component",
      "The classification accuracy that this one component alone gives a classifier",
      "The order in which the individual components were originally computed",
      "The straight-line distance between the two single nearest points in the data"
    ],
    "explain": "A component is a weighted blend of the original features, and the loadings are those weights — the recipe. Several features loading strongly with the same sign means they rise together and the component tracks their shared theme; that's how you NAME a component.",
    "simple": "Loadings are the component's recipe card: how much of each original feature it stirs in. If height, weight and arm-span all load heavily and positively on a component, you can name it 'body size'. Loadings turn an abstract direction into something interpretable — they're weights, not point counts or accuracy scores.",
    "widget": {
      "type": "curveStatic",
      "title": "The component's recipe",
      "world": "PC1's loading on each original feature. Slide across the features and read which ones the component actually blends — and which it ignores.",
      "xlab": "original feature →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "height",
        "weight",
        "arm span",
        "shoe size",
        "hair colour"
      ],
      "dec": 2,
      "yunit": "",
      "series": [
        { "name": "PC1 loading", "ys": [ 0.52, 0.55, 0.5, 0.42, 0.03 ] }
      ],
      "knob": { "label": "Feature", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Height and weight load ~0.5 each, same sign — PC1 rises when both rise. They share whatever it measures.", "tone": "info" },
        { "max": 3, "text": "Arm span and shoe size join at the same sign: four size features, one shared axis. PC1 has earned the name 'body size'.", "tone": "info" },
        { "max": 4, "text": "🤯 Hair colour loads ~0.03 — invisible to PC1. The loadings are the recipe: they say what each component is MADE of, and let you name it.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Loadings", "formula": "component = Σ (loading × feature) · the weights are the recipe", "text": "sklearn: pca.components_. Same-sign block of strong loadings = a shared factor you can name; near-zero = irrelevant." }
    }
  },
  {
    "q": "Your dataset has 300 columns. Before any modelling, why would you deliberately throw dimensions away?",
    "choices": [
      "Distances degrade, models overfit and nothing can be visualised in 300-D",
      "High dimensions force nearly every pair of features to correlate",
      "Each extra column quietly halves the rows available to train a model",
      "Dropping features is the only dependable way to erase dataset outliers",
      "Most storage engines silently truncate any table beyond a hundred columns"
    ],
    "explain": "High dimensions poison distance-based reasoning (everything becomes equally far), multiply overfitting room, slow everything, and defeat the human eye. Reduction trades a little information for geometry that works again.",
    "simple": "Three hundred columns is a description so long that everything sounds unique and nothing looks similar. Boil it down to the few directions that actually vary and suddenly: distances mean something, plots become possible, and models stop drowning. You met this villain before — the curse of dimensionality. Reduction is the counter-spell.",
    "widget": {
      "type": "dimCurse",
      "title": "The villain, revisited",
      "world": "Ten products compared to yours. The knob adds descriptive columns. Watch 'nearest' dissolve as the count climbs — then imagine running this film BACKWARDS. That reverse direction is this whole topic.",
      "itemName": "product",
      "n": 10,
      "seed": 63,
      "knob": { "label": "Columns compared", "min": 2, "max": 60, "step": 1, "init": 2 },
      "insights": [
        { "max": 8, "text": "Few well-chosen columns: crisp neighbours, meaningful distances. This is the state reduction tries to RETURN you to.", "tone": "info" },
        { "max": 30, "text": "The contrast is draining away — same disease you met in the KNN volume, now framed as the problem this topic cures.", "tone": "warn" },
        { "max": 60, "text": "🤯 At 60 columns similarity is mush. PCA and friends run this slider in reverse: squeeze 300 columns into the handful of directions that carry the story.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Why reduce dimensions", "formula": "fewer, information-dense axes → healthy distances, less overfitting, visualisable data", "text": "Dimensionality reduction is the curse's antidote: keep the variation, drop the bulk. The next exercises build the two classic tools — PCA and t-SNE." }
    }
  },
  {
    "q": "PCA must choose its FIRST axis — the single best line to flatten the data onto. Which line does it pick?",
    "choices": [
      "The one preserving the most spread (variance) after flattening",
      "The line minimising the total spread of the projected points",
      "The line best fitting the data by ordinary least-squares regression",
      "The line joining the overall mean to the single farthest point",
      "The direction along which the projected points cluster most tightly"
    ],
    "explain": "Projecting onto a line squashes everything else away, so PCA keeps the line along which the data varies MOST — the direction that loses least. That's the first principal component, found exactly (no search needed) via eigenvectors.",
    "simple": "Photograph a shoal of fish so the photo tells you most: shoot along the shoal's longest axis and the fish spread across your frame; shoot end-on and they pile into a dot. PCA computes the perfect camera angle — the one where the flattened shadow stays as spread out as possible.",
    "widget": {
      "type": "pcaSpin",
      "title": "Hunt the camera angle",
      "world": "A stretched data cloud and one rotatable axis. The purple dots are each point's shadow on your axis. Rotate and chase the percentage — find the angle that keeps the most spread.",
      "xlab": "feature 1",
      "ylab": "feature 2",
      "points": [
        { "x": 1, "y": 2.4 },
        { "x": 2, "y": 3.1 },
        { "x": 3, "y": 3.4 },
        { "x": 3.5, "y": 4.4 },
        { "x": 4.5, "y": 4.2 },
        { "x": 5, "y": 5.6 },
        { "x": 5.5, "y": 5.1 },
        { "x": 6.5, "y": 6.3 },
        { "x": 7, "y": 5.9 },
        { "x": 8, "y": 7.4 },
        { "x": 8.5, "y": 6.9 },
        { "x": 9, "y": 7.8 }
      ],
      "knob": { "label": "Axis angle", "min": 0, "max": 180, "step": 2, "init": 90 },
      "insights": [
        { "max": 20, "text": "Near-horizontal: decent but not best — the cloud leans uphill, and your axis isn't leaning with it.", "tone": "info" },
        { "max": 50, "text": "🤯 Around 34°: the shadows spread widest — ~95% of the spread survives the flattening. You just found the first principal component by hand. PCA finds it by algebra, exactly, in any dimension.", "tone": "wow" },
        { "max": 180, "text": "Near 125° the shadows collapse into a clump — barely 5% survives. That worst direction isn't junk though: it's exactly what the SECOND component will claim.", "tone": "info" }
      ],
      "extreme": { "at": 34 },
      "reveal": { "name": "The first principal component", "formula": "PC1 = the direction u maximising Var(X·u) — the top eigenvector of the covariance", "text": "PCA's whole game: flatten with minimum regret. You searched by slider; eigen-decomposition hands the answer in closed form, for 300 dimensions as easily as 2." }
    }
  },
  {
    "q": "PC1 is fixed. Where does PCA put its SECOND component?",
    "choices": [
      "Perpendicular to PC1, capturing the most of the remaining spread",
      "Aligned with PC1 but shorter, deliberately reinforcing the main signal",
      "Through the region of the cloud where the points are densest",
      "At a fixed forty-five degrees from PC1 whatever the data shows",
      "Along the line joining the two closest points in the cloud"
    ],
    "explain": "Components are orthogonal by construction: PC2 lives in the directions PC1 can't express, and grabs the most variance available there. Each successive component repeats the trick in what's left — ranked, non-overlapping axes.",
    "simple": "The first camera angle captured the shoal's length. The second photo must add NEW information — so it shoots at a right angle, capturing the shoal's width. No overlap, no wasted film: each component owns a direction the others can't see.",
    "widget": {
      "type": "pcaSpin",
      "title": "The leftovers direction",
      "world": "Same stretched cloud. PC1 was at ~34°. Rotate the axis and find where the percentage BOTTOMS OUT — the direction holding only what PC1 left behind.",
      "xlab": "feature 1",
      "ylab": "feature 2",
      "points": [
        { "x": 1, "y": 2.4 },
        { "x": 2, "y": 3.1 },
        { "x": 3, "y": 3.4 },
        { "x": 3.5, "y": 4.4 },
        { "x": 4.5, "y": 4.2 },
        { "x": 5, "y": 5.6 },
        { "x": 5.5, "y": 5.1 },
        { "x": 6.5, "y": 6.3 },
        { "x": 7, "y": 5.9 },
        { "x": 8, "y": 7.4 },
        { "x": 8.5, "y": 6.9 },
        { "x": 9, "y": 7.8 }
      ],
      "knob": { "label": "Axis angle", "min": 0, "max": 180, "step": 2, "init": 20 },
      "insights": [
        { "max": 60, "text": "Angles near PC1 (~34°) score high — but that spread is already PC1's property. A second axis here would be redundant film.", "tone": "info" },
        { "max": 140, "text": "🤯 Around 124° — exactly 90° from PC1 — the percentage bottoms out at ~5%. In 2-D, that leftover direction IS PC2: perpendicular, owning everything PC1 couldn't say.", "tone": "wow" },
        { "max": 180, "text": "Notice the two percentages: ~95% + ~5% = 100%. Orthogonal components split the total variance into non-overlapping shares — that accounting is next.", "tone": "info" }
      ],
      "extreme": { "at": 124 },
      "reveal": { "name": "Orthogonal components", "formula": "PC2 ⊥ PC1, maximising the residual variance — and so on down the ranks", "text": "PCA delivers a full replacement coordinate system: perpendicular axes, sorted by how much of the data's story each one carries." }
    }
  },
  {
    "q": "You run PCA on 50 features and get 50 components with their 'explained variance ratios'. How do you decide how many to KEEP?",
    "choices": [
      "Keep the top components until the cumulative ratio is high enough (say 90%)",
      "Keep only the components whose explained-variance ratio exceeds fifty percent",
      "Keep every component whose individual ratio falls below the mean ratio",
      "Keep exactly as many components as there are class labels in the data",
      "Keep the components lying past the flattest stretch of the scree curve"
    ],
    "explain": "The ratios say what share of total variance each component carries, sorted descending. Cumulate them: if 8 components cover 92%, the other 42 axes hold 8% — mostly noise and redundancy. The scree/cumulative plot makes the cut visible.",
    "simple": "It's a talent show ranking: the first few components carry most of the show, the long tail contributes shrugs. Add up shares from the top until you've kept 'enough of the story' — often 90–95% — and send the rest home. Fifty columns in, eight axes out, story intact.",
    "widget": {
      "type": "curveStatic",
      "title": "How much story per axis",
      "world": "Cumulative variance captured as components are added, for a 50-feature dataset. Slide and find where 'more axes' stops meaning 'more story'.",
      "xlab": "components kept",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "labels": [
        "1",
        "2",
        "4",
        "8",
        "16",
        "50"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "cumulative variance kept", "ys": [ 46, 64, 81, 92, 97, 100 ] }
      ],
      "knob": { "label": "Components kept", "min": 0, "max": 5, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Two components: 64% of everything 50 columns had to say. The data was never really 50-dimensional — it just wore 50 columns.", "tone": "info" },
        { "max": 3, "text": "🤯 Eight components: 92%. The remaining FORTY-TWO axes share 8% between them — noise, duplication, trivia. Keep 8, discard 42, lose almost nothing.", "tone": "wow" },
        { "max": 5, "text": "The march from 92% to 100% costs 42 more dimensions. Whether that 8% matters is a judgement call — but now it's an INFORMED one, which is the plot's whole job.", "tone": "info" }
      ],
      "extreme": { "at": 3 },
      "reveal": { "name": "Explained variance & the scree plot", "formula": "keep the smallest m with cumulative ratio ≥ target (e.g. 0.90) — sklearn: PCA(n_components=0.9)", "text": "PCA turns 'how many dimensions do I need?' into a readable curve. Most real datasets collapse dramatically — their columns are correlated echoes of a few true factors." }
    }
  },
  {
    "q": "You run PCA on raw features: income (tens of thousands) and satisfaction (1–10). PC1 comes out pointing almost exactly along income. Why?",
    "choices": [
      "Variance is measured in raw units, so the big-unit feature owns the 'largest spread' by default",
      "Income has far more unique values, and PCA always follows whichever column has the highest cardinality",
      "Bigger numbers yield bigger covariances, which PCA treats as the more reliable signal",
      "PCA subtracts each column's mean but never rescales, so income's mean dominates PC1",
      "Income happens to correlate with every other feature, forcing PC1 to align with it"
    ],
    "explain": "PCA maximises variance, and variance inherits units: income's spread is millions (of squared pounds), satisfaction's is single digits. Unstandardised PCA just rediscover which column has the biggest numbers. Scale first — always.",
    "simple": "Same shouting-contest bug you met with KNN and SVM: the feature with the biggest raw numbers wins any contest measured in raw numbers. 'Direction of most variance' becomes 'direction of the loudest unit'. Standardise, and PCA measures structure instead of units.",
    "widget": {
      "type": "scaleFeature",
      "title": "The loudest unit wins again",
      "world": "PCA hunts the biggest spread — so whichever feature dominates raw differences will own PC1. Shrink income's units and watch the 'most similar' structure change, exactly as PC1's direction would.",
      "aName": "satisfaction",
      "bName": "income",
      "target": { "name": "customer X", "a": 7, "b": 45000 },
      "cands": [
        { "name": "A · sat 7.2, £46k", "a": 7.2, "b": 46000 },
        { "name": "B · sat 2.1, £45.5k", "a": 2.1, "b": 45500 },
        { "name": "C · sat 6.8, £52k", "a": 6.8, "b": 52000 },
        { "name": "D · sat 7.1, £60k", "a": 7.1, "b": 60000 }
      ],
      "knob": { "label": "Shrink income units by", "min": 0, "max": 4, "step": 0.25, "init": 0 },
      "insights": [
        { "max": 0.5, "text": "Raw units: customer B — utterly different satisfaction — looks 'nearest' because income drowns everything. Raw-unit PCA sees the same world: PC1 = income, full stop.", "tone": "warn" },
        { "max": 2.5, "text": "As the units even out, satisfaction re-enters the geometry — the direction of 'most variation' becomes a genuine blend of both signals.", "tone": "info" },
        { "max": 4, "text": "🤯 The 'principal direction' depended entirely on unit bookkeeping. StandardScaler before PCA isn't a style preference — without it PCA is a unit detector, not a structure detector.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Standardise before PCA", "formula": "z-score every feature first (or use correlation-matrix PCA)", "text": "The third algorithm in this course felled by the same axe: any method built on raw distances or variances needs features on a common scale. It will never stop being true." }
    }
  },
  {
    "q": "The data lies along a curved arc — like a bent wire. PCA keeps disappointing: no single axis captures it well. What's the structural reason?",
    "choices": [
      "PCA only offers STRAIGHT axes, and no straight line hugs a curve",
      "PCA needs uncorrelated inputs, and points on an arc are far too correlated",
      "Variance along a curve is undefined, so PCA cannot rank the directions",
      "PCA discards the curved component as noise before it picks its axes",
      "A curve spreads its variance evenly, leaving PCA no direction to prefer"
    ],
    "explain": "PCA is linear: it can rotate and flatten, never bend. A curved manifold spreads its variance across multiple straight directions, so every single axis captures only a slice. Nonlinear methods (t-SNE, UMAP, kernel PCA) exist precisely for this.",
    "simple": "Try summarising a banana with one straight skewer: whichever way you push it through, much of the banana bulges away from it. Straight tools summarise straight-ish things. For bent shapes you need a tool allowed to bend — that's your bridge to t-SNE.",
    "widget": {
      "type": "pcaSpin",
      "title": "One skewer, one banana",
      "world": "Points along a curved arc. Rotate the axis and try to find an angle that keeps most of the spread. Notice the ceiling you keep hitting — and why it exists.",
      "xlab": "feature 1",
      "ylab": "feature 2",
      "points": [
        { "x": 1.4, "y": 3 },
        { "x": 2, "y": 4.6 },
        { "x": 2.9, "y": 6 },
        { "x": 4, "y": 7 },
        { "x": 5.2, "y": 7.4 },
        { "x": 6.4, "y": 7.2 },
        { "x": 7.5, "y": 6.4 },
        { "x": 8.4, "y": 5.2 },
        { "x": 9, "y": 3.8 },
        { "x": 9.3, "y": 2.2 }
      ],
      "knob": { "label": "Axis angle", "min": 0, "max": 180, "step": 2, "init": 90 },
      "insights": [
        { "max": 60, "text": "Whatever the angle, a chunk of spread always escapes — the arc bends AWAY from any straight line you choose.", "tone": "info" },
        { "max": 120, "text": "The best you'll find hovers around 60-70% — compare the ~95% the straight cloud gave you two exercises ago. The gap is the curvature itself.", "tone": "warn" },
        { "max": 180, "text": "🤯 No angle wins because no straight axis CAN. The data is 1-dimensional — but along a bent path. Linear tools see 2-D; a bendy tool would see the wire. Enter t-SNE.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "PCA's linearity limit", "formula": "PCA = rotation + truncation — curved manifolds need nonlinear maps", "text": "PCA answers 'which straight directions matter?'. When the truth is curved — spirals, arcs, rolled-up sheets — the honest answer is 'none alone', and you reach for nonlinear reducers." }
    }
  }
];

(window.QUESTIONS = window.QUESTIONS || {}).pca2 = [
  {
    "q": "You compress 100 sensor channels to 12 principal components and reconstruct. The reconstruction is imperfect — yet often CLEANER than the original. How?",
    "choices": [
      "The discarded low-variance components held mostly noise, so dropping them denoises",
      "Averaging the 100 channels into 12 cancels random noise via the central limit theorem",
      "The top components amplify the strong signal while actively shrinking the weak channels",
      "Reconstruction snaps each value to its nearest component, smoothing away the sharp spikes",
      "Keeping fewer components lifts the signal-to-noise ratio of every channel equally"
    ],
    "explain": "Real signals concentrate in a few strong directions; sensor noise sprinkles evenly across ALL directions. Keeping the top components keeps most signal and only a sliver of noise — reconstruction filters the static by omission.",
    "simple": "Imagine summarising a noisy choir recording by its 12 strongest harmonics and replaying: the hiss — spread thinly across thousands of frequencies — mostly vanishes, while the melody survives. Throwing away the quiet parts threw away mostly static. Lossy compression, acting as a noise filter.",
    "widget": {
      "type": "curveStatic",
      "title": "Compression that cleans",
      "world": "Reconstructing 100 noisy channels from k components: how much true SIGNAL survives, and how much NOISE sneaks through with it. Find the sweet spot.",
      "xlab": "components kept",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "labels": [
        "2",
        "6",
        "12",
        "25",
        "50",
        "100"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "true signal retained", "ys": [ 58, 84, 94, 97, 99, 100 ] },
        { "name": "noise retained", "ys": [ 4, 9, 14, 32, 61, 100 ] }
      ],
      "knob": { "label": "Components kept", "min": 0, "max": 5, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Six components: 84% of the signal, 9% of the noise. The signal lives in few directions; the static lives everywhere thinly.", "tone": "info" },
        { "max": 2, "text": "🤯 Twelve components: 94% signal, 14% noise — the reconstruction is objectively CLEANER than the raw recording. Deleting dimensions added quality.", "tone": "wow" },
        { "max": 5, "text": "Keep everything and you faithfully reconstruct… all the noise too. Perfect fidelity to a flawed original is not the goal — one more echo of the overfitting lesson.", "tone": "warn" }
      ],
      "extreme": { "at": 2 },
      "reveal": { "name": "PCA compression & denoising", "formula": "reconstruct from top-k components → keeps concentrated signal, drops diffuse noise", "text": "The same maths powers eigenfaces, sensor cleanup and embedding compression. Losing the right information is a feature." }
    }
  },
  {
    "q": "Two roads to fewer dimensions: feature SELECTION (keep 10 original columns) versus feature EXTRACTION like PCA (build 10 new blended axes). What's the real trade?",
    "choices": [
      "Selection keeps meaning; extraction keeps more variance per dimension",
      "Selection maximises variance per axis; extraction preserves the original meaning",
      "Selection blends every column; extraction keeps a subset of the originals intact",
      "Selection removes correlation; extraction leaves the correlations fully in place",
      "Both keep identical variance and differ only in how the axes are named"
    ],
    "explain": "Selected columns stay interpretable ('income', 'age') and cheap to collect, but correlated information gets crudely dropped. PCA components pack maximal variance per axis by blending everything — at the price of axes named 'PC3' that no stakeholder recognises.",
    "simple": "Downsizing a library: selection keeps the 10 best original books — readable, familiar, but some plots are lost. Extraction rebinds the whole collection into 10 dense anthologies — more story per shelf, but no book has a recognisable title anymore. Explaining to humans? Select. Feeding a model? Extract often wins.",
    "widget": {
      "type": "curveStatic",
      "title": "Ten books or ten anthologies",
      "world": "From 50 features down to k dimensions, both ways. Compare how much information each road keeps at every budget — and remember what each axis is called afterwards.",
      "xlab": "dimensions kept",
      "xs": [
        0,
        1,
        2,
        3
      ],
      "labels": [
        "5",
        "10",
        "20",
        "50"
      ],
      "dec": 0,
      "yunit": "% variance kept",
      "series": [
        { "name": "PCA extraction", "ys": [ 78, 92, 98, 100 ] },
        { "name": "best-column selection", "ys": [ 55, 74, 90, 100 ] }
      ],
      "knob": { "label": "Dimensions kept", "min": 0, "max": 3, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "At 5 dimensions: PCA keeps 78% vs selection's 55% — blends carry more per axis, because one component can summarise several correlated columns at once.", "tone": "info" },
        { "max": 1, "text": "🤯 At 10, PCA's axes hold 92%… but they're called PC1–PC10. The selected columns hold 74% and are called 'income' and 'tenure'. The gap you close is the meaning you spend.", "tone": "wow" },
        { "max": 3, "text": "The roads converge at 50 (keep everything). In practice: regulated or human-facing → select; pure predictive power in a pipeline → extract. Many teams do both and compare.", "tone": "info" }
      ],
      "extreme": { "at": "min" },
      "reveal": { "name": "Selection vs extraction", "formula": "selection: subset of columns (interpretable) · extraction: new axes (dense)", "text": "Both are dimensionality reduction; they optimise different currencies — meaning versus variance. Choose by who has to understand the result." }
    }
  },
  {
    "q": "You add PCA before a classifier. Where must the PCA be FITTED, and why does this question feel familiar?",
    "choices": [
      "On training data only, inside the pipeline — PCA is preprocessing, and the leakage rule never sleeps",
      "On the full dataset just once, because PCA is unsupervised and therefore cannot possibly leak the labels",
      "On the training and validation folds together, holding only the final test set aside",
      "On each incoming test fold at prediction time, so the components fit that data exactly",
      "After the classifier is fit, so the components can be tuned to the model's errors"
    ],
    "explain": "PCA learns directions FROM data (means, covariances, eigenvectors) — fit it on everything and test-set information leaks into your features. Same law as scalers, selectors and imputers: anything with a .fit() goes inside the pipeline, trained on the training fold.",
    "simple": "PCA studies the data to choose its angles — that's learning, and learning from the test set is peeking, whatever the tool. You've now seen this rule catch scalers, feature selectors, imputers, calibrators, stacking… and today PCA. It's the closest thing applied ML has to a law of physics.",
    "widget": {
      "type": "foldPick",
      "title": "The leakage rule's final cameo",
      "world": "The same PCA-then-classifier system, evaluated with the PCA fitted at different scopes. One last time: flick through the promises and find the one that will survive deployment.",
      "blurb": "Same pipeline — different PCA fitting scope:",
      "folds": [
        { "name": "PCA fit on train+test", "acc": 90 },
        { "name": "PCA fit on all, CV after", "acc": 91 },
        { "name": "PCA inside the pipeline", "acc": 85 },
        { "name": "deployment, month one", "acc": 85 }
      ],
      "knob": { "label": "Fitting scope", "min": 1, "max": 5, "step": 1, "init": 1 },
      "insights": [
        { "max": 2, "text": "Fitting PCA with test rows in the pot inflates the score by ~5 points — the components were angled using data the model would later be 'tested' on.", "tone": "warn" },
        { "max": 4, "text": "🤯 Pipeline-fitted PCA: 85 promised, 85 delivered. The honest number, produced by structure rather than vigilance — make_pipeline(StandardScaler(), PCA(0.9), clf).", "tone": "wow" },
        { "max": 5, "text": "The rule, once and forever: if it has .fit(), it fits inside the fold. You are now qualified to be annoying about this in code reviews.", "tone": "info" }
      ],
      "extreme": { "at": 4 },
      "reveal": { "name": "PCA in pipelines", "formula": "make_pipeline(StandardScaler(), PCA(n_components=0.9), model) — fit on train only", "text": "The course's most repeated lesson closes its final topic. Preprocessing is part of the model; evaluate them as one sealed unit — always." }
    }
  },
  {
    "q": "PCA on body measurements returns a first component with loadings: height 0.52, weight 0.55, arm span 0.50, shoe size 0.42, hair colour 0.03. How do you read this component?",
    "choices": [
      "As an 'overall body size' axis — all the size features load together with the same sign, hair colour contributes nothing",
      "As a ranking of the original features by importance, with height the most important input and hair colour the least important",
      "As simply the average of the five body measurements, each one weighted by how frequently its values happen to occur",
      "As a contrast between the large and the small individuals, since these loadings all carry differing signs",
      "As clear evidence that the five features are just redundant copies, so four of them ought to be dropped"
    ],
    "explain": "A component IS its loadings: the recipe of original features it blends. Several features loading strongly with the same sign = they rise together, and the component tracks their shared cause ('size'). Near-zero loadings = that feature is irrelevant to this axis. Mixed signs would read as a contrast (e.g. 'long-limbed vs stocky'). Naming components from their loading patterns is how PCA becomes interpretation, not just compression.",
    "simple": "Each component comes with a recipe card: how much of every original feature it stirs in. This one says 'roughly equal parts height, weight, arm span, shoe size — hold the hair colour'. Everything on the card grows together, so the axis is measuring whatever makes ALL of them grow: body size. Read the card, name the axis — that's the skill.",
    "widget": {
      "type": "curveStatic",
      "title": "Reading the recipe card",
      "world": "PC1's loading on each original feature. Slide across the features and watch which ones the component actually blends — and which it ignores.",
      "xlab": "original feature →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "height",
        "weight",
        "arm span",
        "shoe size",
        "hair colour"
      ],
      "dec": 2,
      "yunit": "",
      "series": [
        { "name": "PC1 loading", "ys": [ 0.52, 0.55, 0.5, 0.42, 0.03 ] },
        { "name": "PC2 loading", "ys": [ 0.3, -0.35, 0.45, -0.28, 0.05 ] }
      ],
      "knob": { "label": "Feature", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Height and weight load ~0.5 each, same sign: PC1 rises when BOTH rise. Whatever it measures, they share it.", "tone": "info" },
        { "max": 3, "text": "Arm span and shoe size join at the same sign too — four size features, one shared axis. PC1 has earned the name 'body size'.", "tone": "info" },
        { "max": 4, "text": "🤯 Hair colour: 0.03 — invisible to PC1. And look at PC2: SAME features but with mixed signs (+height, −weight, +arm span): a 'lanky vs stocky' CONTRAST. Same recipe format, opposite kind of story — signs matter as much as sizes.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Component loadings", "formula": "PC = Σ (loading_i × feature_i) — the recipe defines the meaning", "text": "sklearn: pca.components_[k]. Same-sign block = shared factor; mixed signs = contrast; near-zero = irrelevant. Name your components or they're just coordinates." }
    }
  },
  {
    "q": "On one dataset PC1 captures 50% of the variance; on another it captures 99.5%. What property of the FEATURES drives how much variance one component can absorb?",
    "choices": [
      "Their correlation — the more the features move together, the more of the total variance a single shared axis can soak up",
      "Their raw scale — features with the widest raw numeric range allow a single axis to absorb nearly all of the total variance",
      "Their count — with fewer features present, each surviving component is forced to carry a larger share of the variance",
      "Their skewness — the more skewed the feature distributions are, the more a single axis can come to dominate them",
      "Their independence — the less the features overlap, the more of the variance one axis can summarise for you"
    ],
    "explain": "PCA is a redundancy harvester. Uncorrelated features each carry independent information — no single direction can represent them, so variance spreads across many components. Highly correlated features are near-copies of one underlying signal, and the component aligned with that signal absorbs almost everything. That's why PCA compresses sensor arrays and pixel images so well (massive redundancy) and does little for carefully engineered, decorrelated feature sets.",
    "simple": "Think of features as interview questions. If every question probes something different, you can't summarise the interview in one number. If ten questions are re-wordings of 'how big is it?', one number nails all ten. PCA's compression is exactly a measure of how much your features repeat each other — slide the correlation up and watch one axis swallow the dataset.",
    "widget": {
      "type": "curveStatic",
      "title": "Redundancy is compressibility",
      "world": "Ten features with adjustable mutual correlation, PCA applied. Watch how much of the total variance PC1 alone captures — and how many components you'd need to keep 95%.",
      "xlab": "correlation between the features →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "0.0",
        "0.3",
        "0.6",
        "0.9",
        "0.99"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "variance in PC1 (%)", "ys": [ 10, 37, 64, 91, 99 ] },
        { "name": "components for 95% (count)", "ys": [ 10, 8, 5, 2, 1 ] }
      ],
      "knob": { "label": "Feature correlation", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Zero correlation: PC1 holds 10% — exactly 1/10th. No shared signal exists, so no direction is special, and 'compression' would just delete information.", "tone": "info" },
        { "max": 2, "text": "At 0.6 correlation, PC1 already absorbs nearly two-thirds, and 95% of the data fits in 5 components instead of 10 — the redundancy is being harvested.", "tone": "info" },
        { "max": 4, "text": "🤯 At 0.99, ONE axis carries 99% of ten features. PCA didn't create that compression — it just found the one signal your ten features were all echoing. Compressibility is a fact about the data; PCA merely reveals it.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "PCA eats correlation", "formula": "shared signal → one dominant eigenvalue → few components suffice", "text": "Quick self-test: if your scree plot has no elbow, your features weren't redundant and PCA has little to offer. If PC1 towers, your dataset was secretly low-dimensional." }
    }
  },
  {
    "q": "A fraud team compresses normal transactions with PCA (keeping a few components), then reconstructs each incoming transaction and measures the reconstruction error. Why does this catch anomalies?",
    "choices": [
      "The components encode how NORMAL data varies — normal points survive the compress-reconstruct round trip, anomalies lose what makes them odd and come back distorted",
      "PCA sorts every transaction along PC1, and fraud cases naturally pile up at the extreme high end of that one axis, where they clearly stand out from the crowd",
      "The components store only the average transaction, so anything sitting far from that average gets flagged well before any reconstruction even happens",
      "Fraudulent transactions carry far higher variance across their features, so they land in exactly the low-ranked components that PCA deliberately holds onto and keeps for them",
      "Reconstruction assigns each transaction a class probability, and anomalies are simply those scoring below the operator's chosen cutoff value on it"
    ],
    "explain": "Fit PCA on normal data only. The kept components span the subspace of normal variation; whatever a transaction has OUTSIDE that subspace is discarded on projection. Normal points barely lie outside it → tiny error. An anomaly deviates in directions normal data never uses → its projection snaps back to the nearest 'normal-looking' point, and the distance between original and reconstruction is precisely its abnormality score. Threshold that error and you have an unsupervised fraud alarm.",
    "simple": "PCA learns a stencil of normal. Compressing a transaction means tracing it with the stencil; reconstructing means redrawing it from that tracing. Normal transactions redraw almost perfectly — the stencil was made for them. A weird transaction can't be traced with the stencil, so its redrawing comes back 'normalised' — and the gap between the original and the redraw is exactly HOW weird it was. No fraud labels needed; normal data defined its own alarm.",
    "widget": {
      "type": "curveStatic",
      "title": "The stencil of normal",
      "world": "PCA fitted on normal transactions, keeping more or fewer components. Compare the reconstruction error of typical points vs known anomalies — the GAP is the alarm's signal.",
      "xlab": "components kept →",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "1",
        "2",
        "5",
        "10",
        "20"
      ],
      "dec": 1,
      "yunit": "",
      "series": [
        { "name": "anomaly reconstruction error", "ys": [ 40, 35, 28, 22, 12 ] },
        { "name": "normal reconstruction error", "ys": [ 8, 5, 2, 1, 0.5 ] }
      ],
      "knob": { "label": "Components kept", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Few components: normal points reconstruct at error ~5, anomalies at ~35 — a 7× gap. The stencil is strict, and only normal shapes fit it.", "tone": "info" },
        { "max": 2, "text": "5 components: the sweet spot here — normal error nearly zero, anomaly error still high. Threshold anywhere in the gap and the alarm works.", "tone": "info" },
        { "max": 4, "text": "🤯 20 components: the stencil is now so detailed it can trace the anomalies too — their error falls to 12 and the gap narrows. Keeping MORE of the data made the alarm WORSE. The components you throw away were the detector.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "PCA reconstruction-error anomaly detection", "formula": "score(x) = ‖x − reconstruct(project(x))‖ — big = abnormal", "text": "Fit on normal data; keep few components; threshold the error on a validation set. The same idea, upgraded with autoencoders, powers modern anomaly detection." }
    }
  },
  {
    "q": "Vanilla PCA chokes: one dataset is 10M rows and won't fit in memory, another needs eigenvectors of a 20k-feature matrix, a third has structure that's curved, not linear. Which toolbox variants map to these three walls?",
    "choices": [
      "IncrementalPCA for out-of-core batches, randomized SVD for huge matrices, KernelPCA for curved structure",
      "IncrementalPCA for huge matrices, KernelPCA for streaming batches, and randomized SVD for curved structure",
      "TruncatedSVD for out-of-core batches, SparsePCA for huge matrices, KernelPCA for curved structure",
      "SparsePCA for streaming batches, FastICA for huge matrices, and TruncatedSVD for curved structure",
      "KernelPCA for out-of-core batches, IncrementalPCA for huge matrices, randomized SVD for curves"
    ],
    "explain": "Same objective, three engines. IncrementalPCA consumes data in mini-batches, updating components as it streams — nothing ever needs to fit in RAM. svd_solver='randomized' approximates just the top-k components via random projections instead of a full eigendecomposition — sklearn auto-picks it for big matrices when you ask for few components. KernelPCA applies the kernel trick so 'directions of maximal variance' can be measured in an implicit non-linear feature space — curved manifolds unroll. Know the walls, know which engine.",
    "simple": "One idea — find the directions where the data varies most — and three engineering escapes for when the naive recipe hits a wall. Data too big for memory? Feed it in spoonfuls (Incremental). Matrix too big to fully decompose? Estimate just the top few directions with clever randomness (randomized). Structure bends? Do PCA in a stretched space where the bend is straight (Kernel). Slide through the scenarios and match the engine.",
    "widget": {
      "type": "curveStatic",
      "title": "Three walls, three engines",
      "world": "Four PCA engines scored (0–100: from fails to excels) against four scenarios. Slide across the scenarios and watch a different engine top each one.",
      "xlab": "scenario →",
      "xs": [
        0,
        1,
        2,
        3
      ],
      "labels": [
        "fits in RAM",
        "10M rows, no RAM",
        "20k features, top-10 PCs",
        "curved manifold"
      ],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "vanilla PCA", "ys": [ 95, 5, 40, 20 ] },
        { "name": "IncrementalPCA", "ys": [ 85, 92, 45, 20 ] },
        { "name": "randomized SVD", "ys": [ 90, 30, 95, 20 ] },
        { "name": "KernelPCA", "ys": [ 60, 5, 15, 90 ] }
      ],
      "knob": { "label": "Scenario", "min": 0, "max": 3, "step": 1, "init": 0 },
      "insights": [
        { "max": 0, "text": "Comfortable data: vanilla PCA wins — exact, fast, no moving parts. The variants exist for the walls, not for every day.", "tone": "info" },
        { "max": 2, "text": "Out-of-core streaming is IncrementalPCA's column; 'huge matrix, few components wanted' is randomized SVD's — it never computes the thousands of components you'd throw away.", "tone": "info" },
        { "max": 3, "text": "🤯 Curved structure: the linear engines all score ~20 — no straight axis captures a spiral — while KernelPCA's implicit feature space unrolls it. One objective, four engines: pick by which wall you're facing, and note the costs (KernelPCA is O(n²) memory — its own wall).", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "The PCA variant toolbox", "formula": "IncrementalPCA · svd_solver='randomized' · KernelPCA(kernel='rbf')", "text": "sklearn picks randomized automatically for large inputs with small n_components. TruncatedSVD is the sibling for sparse text matrices (no centering). Vanilla first; variants at the walls." }
    }
  }
];
