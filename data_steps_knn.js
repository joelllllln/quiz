/* Answer breakdowns for k-Nearest Neighbours. Keyed by exact question stem.
   Each entry: an array of 2-3 guided sub-questions (ok = correct) that build up to the correct answer. */
(window.STEPS = window.STEPS || {})["Where does the value of k in KNN come from?"] = [
  { q: "Is k decided while KNN trains, or before it runs?", ok: "Before it runs", no: ["While it trains on the data", "After it makes each prediction"] },
  { q: "Who fixes the value of k?", ok: "The person using the model", no: ["The algorithm, on its own", "The nearest training point"] },
  { q: "So where does k come from?", ok: "You choose it yourself before running KNN", no: ["KNN learns it from the training data", "It is always fixed at one"] }
];
