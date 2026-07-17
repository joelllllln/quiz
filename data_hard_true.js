/* Hard mode: "which statement is actually TRUE?" questions. The hardest MCQ format —
   every option is a subtle technical claim that must be evaluated on its own; four are
   quietly false. Added to Part III question sets, one topic batch per hardening pass.
   Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  function tq(qk, q, correct, distractors, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple });
  }

  /* ===== K-Means (kmeans3) — pass 1 ===== */

  tq("kmeans3",
    "Which ONE of these statements about k-means convergence is actually TRUE?",
    "K-means always terminates, but only at a local optimum — the result can depend entirely on the starting centroids.",
    ["Given enough iterations, k-means is guaranteed to reach the globally optimal clustering for the chosen k.",
     "K-means can oscillate forever between two assignments unless an iteration cap forces it to stop.",
     "The k-means objective can increase during an update step whenever a cluster loses several members at once.",
     "Runs restarted from different seeds always converge to the same final inertia, just via different paths."],
    "Both steps can only lower inertia, and a bounded quantity that never increases must settle — so termination is guaranteed. But it settles in whichever basin the initial centroids chose: local optimum, not global, which is why different seeds give different answers (and why n_init exists).",
    "It always stops — but where it stops depends on where it started.");

  tq("kmeans3",
    "Which ONE of these statements about inertia and choosing k is actually TRUE?",
    "The best achievable inertia never increases as k grows — and at k = n it reaches exactly zero.",
    ["Inertia is minimised at the elbow, rising again once k passes the number of true clusters in the data.",
     "The silhouette score behaves like inertia, improving steadily as more clusters are added.",
     "Inertia is scale-invariant, so standardising the features beforehand leaves its value unchanged.",
     "When two runs use different k, the run with lower inertia found the better cluster structure."],
    "Each extra centroid can only help the objective, so best-case inertia falls monotonically until every point is its own centroid at zero. That's exactly why raw inertia can't choose k (there is no minimum at the 'right' k — only a bend), why silhouette (which can peak) exists, and why comparing inertia across different k is meaningless.",
    "More centroids can only ever tighten the fit — which is precisely why inertia alone can't pick k.");

  tq("kmeans3",
    "Which ONE of these statements about empty clusters in k-means is actually TRUE?",
    "A centroid can end an assignment step with no points at all — implementations must handle the empty-cluster case explicitly.",
    ["Every centroid always retains at least the single point that lies nearest to it after each assignment step.",
     "Empty clusters can only ever occur when k has been set larger than the number of data points.",
     "Using k-means++ initialisation makes empty clusters mathematically impossible in later iterations.",
     "An empty cluster makes the mean update undefined, so the algorithm automatically restarts from new seeds."],
    "Nothing reserves points for a centroid — every point goes to its nearest centre, and an unlucky centroid can be closest to nobody even with k far below n and k-means++ seeding. Libraries patch the case by re-seeding that centroid (commonly on a far point); it is a handled edge case, not an automatic restart.",
    "A centre can be left with an empty room even in a crowded house — the algorithm needs a rule for it.");

  tq("kmeans3",
    "Which ONE of these statements about k-means on one-hot encoded categoricals is actually TRUE?",
    "The computation runs fine — but the centroids stop being interpretable, becoming fractional blends like 0.3 London, 0.4 Paris.",
    ["Scikit-learn's KMeans raises an error when it detects that input columns contain only zeros and ones.",
     "Euclidean distance is mathematically undefined between binary vectors, so the assignment step cannot run.",
     "On one-hot data, k-means and k-modes are equivalent and always return identical cluster assignments.",
     "Centroids computed on one-hot columns always snap to valid category patterns of a single 1 per group."],
    "Means of 0/1 columns are perfectly computable — that's the trap. The result is a 'centroid' that is 30% one city and 40% another: not a customer that can exist. Nothing errors, nothing snaps to legal patterns, and k-modes (which uses modes and matching distance) genuinely differs — which is why it exists.",
    "The maths runs happily; it's the meaning that breaks.");

  tq("kmeans3",
    "Which ONE of these statements about MiniBatchKMeans is actually TRUE?",
    "It typically lands at slightly higher inertia than full k-means — the speed-up is bought with a small quality cost.",
    ["With the same random seed it is guaranteed to produce exactly the same clustering as full k-means.",
     "It usually reaches lower inertia than full k-means, because batch noise helps it escape local minima.",
     "It processes each data point exactly once, which is what makes its running time predictable.",
     "It requires class labels to construct balanced batches, making it partially supervised."],
    "Mini-batches give noisy centroid updates, so the final objective is usually a little worse than Lloyd's full passes — a trade the documentation states openly. The noise does not systematically beat full k-means, points can be sampled repeatedly across batches, and no labels are involved anywhere.",
    "Minutes instead of hours, in exchange for a slightly looser fit — that's the deal.");

})();
