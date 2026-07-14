/* Performance Optimisation — Part III: Advanced Study. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).perf3 = [

{
  q: "You tune 60 hyperparameter combos with 5-fold CV and report the winner's CV score as 'the model's performance'. A reviewer objects: that number is biased. Nested cross-validation fixes it — how?",
  choices: ["An OUTER loop measures performance while the ENTIRE tuning search re-runs inside each outer fold — so the reported score comes from data no tuning decision ever saw", "It swaps 5-fold for 25-fold cross-validation, and averaging over so many more random splits shrinks the winning combo's selection bias all the way down to nothing at all", "It removes the need for a separate test set, because running the whole tuning search twice and averaging the two winners already yields an unbiased estimate", "It reports the average of the best and worst combinations rather than the maximum, which cancels the upward optimism you get from always quoting the winner", "It refits the winning combo on the full data and re-scores it under fresh random seeds, so the optimism from picking one lucky fold washes out of the number"],
  explain: "The winning combo's CV score is a maximum over 60 noisy estimates — selection bias guarantees optimism (you picked, in part, the combo whose folds got lucky). Nested CV separates the questions: outer folds (say 5) each hold out a test slice; WITHIN each outer training portion, the full inner CV search runs and picks its own winner; that winner is scored once on the outer slice. The outer average estimates 'the performance of my whole tuning PROCEDURE', unbiased because no outer test row ever influenced any choice. Cost: folds × search size fits. Use it when the reported number matters (papers, model sign-off); plain CV remains fine for choosing between combos.",
  simple: "Run 60 horses and quote the winner's time as 'what my stable runs' — the winner partly won by luck, so the quote flatters. Nested CV runs the WHOLE CONTEST several times on fresh tracks: each time, hold back a track the contest never touches, run the full 60-horse selection on the rest, then time whichever horse won on the held-back track. Average those honest times. You're no longer quoting a lucky winner's practice lap — you're measuring what your horse-picking PROCESS delivers on new ground, which is the number the reviewer (and reality) actually wants.",
  widget: {
    type: "curveStatic", title: "The winner's lap vs the process's truth",
    world: "Same tuning search, three ways of reporting, as the search grows — plus the true deployment performance. Watch selection bias grow with the number of combos tried.",
    xlab: "combos searched →", xs: [0,1,2,3,4], labels: ["5","20","60","200","1000"], dec: 1, yunit: "%",
    series: [
      { name: "winner's own CV score", ys: [86.1, 86.9, 87.6, 88.4, 89.5] },
      { name: "nested CV estimate", ys: [85.7, 85.8, 85.9, 85.9, 86.0] },
      { name: "true deployment performance", ys: [85.6, 85.7, 85.8, 85.8, 85.9] }
    ],
    knob: { label: "Search size", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "At 20 combos the winner's CV score is already 1.1 points optimistic — the max of 20 noisy numbers is biased upward by construction, before any leak or bug.", tone: "info" },
      { max: 3, text: "200 combos: 2.6 points of pure selection bias. Bigger searches make BETTER models but LESS honest winner-scores — two different quantities moving apart.", tone: "warn" },
      { max: 4, text: "🤯 The nested estimate hugs the truth at every search size — it prices in the picking. Report nested (or a untouched holdout) when the number leaves the room; use plain CV only to CHOOSE. Same data, same search: the honesty lives in the protocol.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Nested cross-validation", formula: "outer folds score the tuned PROCEDURE · inner folds do all the choosing",
      text: "sklearn: cross_val_score(GridSearchCV(...), X, y) — one line nests them. Cost = outer × inner × combos fits; halving/successive-halving tames it." }
  }
},

{
  q: "Grid search burns 90% of its budget fully training obviously-bad configurations. Successive halving (and Hyperband) spend the same budget far better. What's the core mechanism?",
  choices: ["Tournament rounds: start many configs on a SMALL budget (data or iterations), keep the best fraction, multiply the budget, repeat — losers cost a sliver, finalists get full resources", "It trains every configuration to completion as usual but stops the overall wall-clock earlier, so the same budget simply covers proportionally fewer full training runs than grid does", "It draws a much smaller random sample of configurations up front, so the fixed budget stretches across fewer trainings and each survivor gets the resources grid would have wasted", "It fits one small cheap model as a stand-in for every configuration, reads its score, and extrapolates each real config's likely performance without training the expensive ones", "It caches the gradients computed for the early configurations and reuses them to warm-start later ones, so each successive training reaches its final score for a fraction of the compute"],
  explain: "The insight: bad configs usually reveal themselves EARLY — on 10% of the data or 5% of the epochs — so full training on them is almost pure waste. Successive halving: round 1 gives all N configs a tiny budget; keep the top 1/η (e.g. third); round 2 gives survivors η× the budget; repeat until few configs get the full ride. Total cost ≈ one full training × log(N) rather than × N. Hyperband hedges the one risk (slow starters eliminated early) by running several halving brackets with different starting budgets. sklearn ships both: HalvingGridSearchCV / HalvingRandomSearchCV — typically 3–10× more search per compute-hour.",
  simple: "A singing contest doesn't give every applicant a 90-minute concert — auditions are 30 seconds, because most 'no's are obvious in 10. Budget tuning the same way: give 200 configurations a quick cheap trial (small data slice, few boosting rounds), cut the bottom two-thirds, triple the stage time for survivors, repeat. The hopeless die for pennies; the promising inherit their compute. Same total budget now buys a 200-wide search instead of 20 — the entire trick is refusing to fully fund failure. (Hyperband adds insurance for slow bloomers: a few parallel contests with longer first auditions.)",
  widget: {
    type: "curveStatic", title: "Auditions before concerts",
    world: "Fixed compute budget, two search strategies: how many configs each can evaluate, and the best validation score each finds. Successive halving trades full evaluations for breadth.",
    xlab: "compute budget (GPU-hours) →", xs: [0,1,2,3,4], labels: ["2","8","24","80","240"], dec: 1, yunit: "",
    series: [
      { name: "halving: best score found (%)", ys: [84.5, 86.2, 87.4, 88.1, 88.5] },
      { name: "grid: best score found (%)", ys: [83.1, 84.8, 85.9, 86.8, 87.6] },
      { name: "configs halving explores (÷10)", ys: [3, 12, 36, 120, 360] }
    ],
    knob: { label: "Budget", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "8 GPU-hours: grid fully trains 12 configs; halving auditions 120 and fully trains ~6 survivors — and its best find is already 1.4 points ahead. Breadth found a region grid's little lattice missed.", tone: "info" },
      { max: 3, text: "At every budget, halving's winner beats grid's — not by training smarter models, but by ELIMINATING dumber ones at 3% of their full cost.", tone: "info" },
      { max: 4, text: "🤯 240 GPU-hours: halving has screened 3,600 configurations — grid managed 360, most of them doomed variants it insisted on finishing. The compute didn't grow; the waste shrank. Add Hyperband's brackets if you fear slow starters, and this is simply how tuning is done at scale now.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Successive halving & Hyperband", formula: "budget rounds: all configs cheap → top 1/η advance with η× budget → repeat",
      text: "sklearn: HalvingGridSearchCV / HalvingRandomSearchCV (resource = n_samples or n_estimators). Assumes early performance predicts final — hedge with Hyperband when unsure." }
  }
},

{
  q: "Random search treats trial #200 exactly like trial #1 — learning nothing along the way. Bayesian optimisation (Optuna, etc.) does learn. What is it actually doing between trials?",
  choices: ["Fitting a cheap surrogate model of 'score vs hyperparameters' from past trials, then picking the next trial where the surrogate promises the best mix of high mean and high uncertainty — explore/exploit steering", "Averaging the ten best-scoring configurations found so far and centring the next batch of trials tightly around that running average, so the search keeps converging on what works without ever building a separate model of the score surface", "Estimating the gradient of the validation score with respect to each hyperparameter from the last few trials, then stepping the next trial downhill along that slope toward the optimum", "Halving the remaining search space after every trial by discarding whichever half scored below the current median, so each new trial explores a progressively smaller promising box", "Rerunning whichever trial currently holds the best score under several fresh random seeds, then keeping the configuration whose strong result proves the most stable across the repeats"],
  explain: "After each evaluation, the optimiser refits a surrogate (Gaussian process, or TPE's density trick) mapping hyperparameters → expected score with uncertainty bands. An acquisition function (expected improvement, etc.) scores candidate points by balancing 'predicted good' (exploit near known peaks) against 'unknown' (explore wide-uncertainty regions), and the next real trial goes to its argmax. Each expensive training run thus buys information that shapes all future runs. Wins over random search grow with expensive evaluations, continuous spaces and interaction structure; shrink when evaluations are cheap (just run more random) or spaces are tiny (grid is fine). Modern stacks (Optuna) add pruning of doomed trials mid-run — halving's trick folded in.",
  simple: "Random search drills for oil at 200 random spots, learning nothing from spot 1 when choosing spot 2. The Bayesian driller keeps a hand-drawn map: after each drill, it sketches 'probably rich here, definitely poor there, no idea over yonder' — with honest fog-of-war. The next hole goes where richness×uncertainty is most promising: sometimes doubling down near a gusher (exploit), sometimes probing the fog (explore). When each hole costs a day of GPU time, buying a map with every hole beats amnesia — that's the entire pitch, and the reason serious tuning frameworks all keep a map.",
  widget: {
    type: "curveStatic", title: "Drilling with a map",
    world: "Best score found so far vs trials spent, for random search and Bayesian optimisation, on an expensive-to-evaluate model (each trial = 1 GPU-hour). Same space, same seeds where shared.",
    xlab: "trials spent →", xs: [0,1,2,3,4,5], labels: ["5","10","20","40","80","160"], dec: 1, yunit: "%",
    series: [
      { name: "Bayesian (TPE) best-so-far", ys: [85.1, 86.4, 87.6, 88.3, 88.7, 88.8] },
      { name: "random search best-so-far", ys: [85.0, 85.6, 86.5, 87.3, 88.0, 88.5] }
    ],
    knob: { label: "Trials", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "First ~10 trials: nearly tied — the Bayesian map is still mostly fog, and its picks are barely better than random. The advantage is EARNED, trial by trial.", tone: "info" },
      { max: 3, text: "By 40 trials the map pays: +1.0 over random, concentrated drilling around two promising ridges the surrogate found. Random has no memory of ridges.", tone: "info" },
      { max: 5, text: "🤯 Random needs ~160 trials to match Bayesian's 40 — a 4× compute saving that scales with evaluation cost. Rules of thumb: cheap trials or <10 dims of simple structure → random is honestly fine; day-long trainings → never search without a map (and prune doomed trials mid-flight).", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Bayesian optimisation", formula: "surrogate(params → score ± σ) + acquisition (explore vs exploit) → next trial",
      text: "Optuna (TPE + pruning) is the practical default. The paradigm — spend cheap model-fits to steer expensive real-fits — recurs across AutoML, A/B design, and lab science." }
  }
},

{
  q: "Model B beats model A by 0.4 points of CV accuracy and the team declares victory. You rerun both with different random seeds and the gap flips sign. What discipline separates real improvements from seed noise?",
  choices: ["Treat every score as a distribution: multiple seeds/folds, report mean ± spread, and only believe differences that exceed the spread — ideally tested PAIRED on the same folds", "Trust the very first run of each model, since random seeds only add symmetric noise that averages itself to zero the moment you compare two single scores head to head", "Push both models to far more training epochs until each one's cross-validation score completely stops moving, then compare the two stabilised final numbers directly to see which is higher", "Report each model under its own best-performing seed, which is the fairest treatment because it shows what every candidate is genuinely capable of at its very best", "Rely on the rule that any accuracy difference under one point is real as long as it came out of a proper k-fold cross-validation rather than a single train-test split"],
  explain: "A CV score inherits randomness from fold assignment, model seeds (init, subsampling), and data order. Each score is one draw; a 0.4 gap between single draws from distributions with σ≈0.5 is a coin flip. Discipline: run k seeds × folds per model; report mean ± std; compare PAIRED (same folds for both models — differencing removes shared fold-difficulty variance, tightening the comparison enormously); a paired t-test (or simply: does the difference's interval exclude zero?) formalises it. Corollary of honesty: 'best seed' reporting is p-hacking. And when the CI straddles zero, the finding is 'indistinguishable' — pick by cost, simplicity or latency instead.",
  simple: "Every training run rolls dice — fold shuffles, weight seeds, row order. Score one run of A and one of B and you've compared two single dice rolls: a 0.4 gap means nothing if the dice wobble by ±0.5. So roll five times each and look at the CLOUDS, not points. And use the sharpest trick in the book: make both models sit the SAME five exams (same folds) and study the per-exam differences — shared exam difficulty cancels out, and the real gap, if any, stands out clean. If the clouds still overlap, the honest verdict is a tie — and ties are decided by cost, not by which point-estimate flattered whom.",
  widget: {
    type: "curveStatic", title: "Points lie, clouds testify",
    world: "Models A and B rerun over 10 seeds: each seed's score, plus the running paired difference with its uncertainty. Watch the single-run 'victory' dissolve into the cloud.",
    xlab: "seed →", xs: [0,1,2,3,4], labels: ["1","3","5","7","10"], dec: 2, yunit: "",
    series: [
      { name: "model B score (%)", ys: [87.4, 86.8, 87.1, 86.6, 87.0] },
      { name: "model A score (%)", ys: [87.0, 87.1, 86.5, 86.9, 86.8] },
      { name: "paired diff B−A ± noise", ys: [0.4, -0.1, 0.3, -0.2, 0.15] }
    ],
    knob: { label: "Seed", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Seed 1: B wins by 0.4 — the 'victory' that launched the meeting. One seed later B LOSES by 0.1. Both runs were bug-free; the dice just rolled.", tone: "warn" },
      { max: 2, text: "Across seeds, each model wobbles ±0.4 on its own — the between-model gap is smaller than the within-model noise. That single sentence should end most 'X beats Y by 0.3' claims.", tone: "info" },
      { max: 4, text: "🤯 Ten seeds, paired: mean difference +0.11 ± 0.25 — the interval straddles zero, verdict indistinguishable. Now decide by what IS distinguishable: B trains 3× slower. Statistics didn't kill the improvement; it revealed there was never one to kill.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Score distributions & paired comparison", formula: "k seeds × folds → mean ± std · paired differences on shared folds · CI excluding 0 or it didn't happen",
      text: "Cheap version: 5 seeds, paired folds, eyeball the interval. 'Best seed' reporting is self-deception with extra steps. Ties are real results — settle them on cost." }
  }
},

{
  q: "GridSearchCV found C=10, gamma=0.1 — but the heat-map shows the winner sat on a sharp isolated spike, while a broad plateau of nearly-as-good settings lies elsewhere. Why do seasoned practitioners pick the PLATEAU?",
  choices: ["A spike's excellence is fragile — likely part validation-luck, and gone the moment data drifts — while a plateau means performance is INSENSITIVE to the exact values: robustness you can ship", "A broad plateau of settings trains substantially faster than an isolated spike does, and in production that speed advantage matters more than the sliver of accuracy the spike adds", "An isolated spike in the heat-map is a reliable tell-tale fingerprint of data leakage, so seasoned practitioners avoid its whole region entirely and instead settle for the leak-free plateau lying nearby", "The plateau sits at systematically smaller values of C and gamma, and smaller hyperparameter values are inherently safer because they regularise the model more strongly against overfit", "Experienced practitioners have learned to distrust grid search itself, so they take the plateau as a hedge whenever the winning cell cannot be confirmed by an independent random search"],
  explain: "Two reasons, one statistical, one operational. Statistical: CV scores are noisy; an isolated spike (great score, poor neighbours) is exactly the signature of a lucky draw — the max over a grid is biased toward such flukes, and its true value likely sits near its neighbours'. Operational: production data drifts, and the loss landscape drifts with it — on a plateau, a shifted optimum still leaves you on high ground; on a spike, one step is a cliff. Practical heuristics: smooth/inspect the CV surface, prefer wide optima (some AutoML tools explicitly optimise for neighbourhood-average score), re-validate the chosen region with fresh seeds before shipping.",
  simple: "Two campsites score '9/10 views': one is a narrow ledge — one step left or right and you're off the cliff — the other a wide meadow where every direction stays lovely. Your map (CV) was drawn with shaky hands (noise), and the terrain itself shifts a little every season (data drift). Bet on the ledge and you're betting the shaky map is precise AND the ground won't move — two bets you'll lose. The meadow forgives both: mismeasurement and drift. In tuning, WIDTH of a good region is evidence of real structure; a lone spike is usually the map's shaky hand, not the terrain.",
  widget: {
    type: "curveStatic", title: "The ledge and the meadow",
    world: "A slice through the hyperparameter landscape: CV scores as measured, the same slice re-measured with new seeds, and after six months of data drift. Watch what survives where.",
    xlab: "hyperparameter (slice through the grid) →", xs: [0,1,2,3,4,5], labels: ["spike−1","THE SPIKE","spike+1","plateau edge","plateau mid","plateau far"], dec: 1, yunit: "%",
    series: [
      { name: "original CV scores", ys: [85.2, 88.9, 85.5, 87.6, 87.8, 87.5] },
      { name: "re-run, new seeds", ys: [85.4, 87.1, 85.3, 87.5, 87.7, 87.6] },
      { name: "after 6 months' drift", ys: [84.1, 84.9, 84.3, 86.8, 87.1, 86.9] }
    ],
    knob: { label: "Grid position", min: 0, max: 5, step: 1, init: 1 },
    insights: [
      { max: 1, text: "The spike: 88.9 measured, neighbours at 85 — that shape screams 'noise harvest'. Re-run with new seeds: 87.1. A third of its edge was never real.", tone: "warn" },
      { max: 3, text: "The plateau: 87.6-ish everywhere, and the re-run agrees to the decimal. Flatness = the same story told by many adjacent settings = real structure, measured twice.", tone: "info" },
      { max: 5, text: "🤯 After drift, the spike delivers 84.9 — now WORSE than anywhere on the plateau (86.8–87.1). The 'best' single cell lost to the robust region on every criterion that matters post-launch. Read landscapes, not leaderboard cells: width is worth more than height.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Prefer wide optima", formula: "value(setting) ≈ neighbourhood average, not cell max · spikes = noise + fragility",
      text: "Inspect cv_results_ as a surface; re-seed the finalists; when in doubt take the plateau's centre. The max of noisy numbers is systematically a liar." }
  }
},

{
  q: "A month of tuning bought +0.3 accuracy; a fortnight on features bought +2.1; the intern's data-cleaning pass bought +3.4. What's the mature model of where performance actually comes from?",
  choices: ["A hierarchy of leverage: data quality > features > model/loss choice > hyperparameters — tune LAST, time-box it, and let diminishing returns tell you when to move up the stack", "Hyperparameters come first because they are by far the cheapest lever to try, and squeezing them early sets a firm ceiling that later feature and data work then builds upward from", "All four levers return roughly equal accuracy per hour invested, so the mature approach simply rotates evenly through tuning, features, model choice and cleaning until the budget is gone", "Data cleaning is junior-level busywork that rarely moves the needle, whereas the real expert gains come almost entirely from model architecture and the careful hyperparameter tuning layered on top of it", "Tuning gains quietly compound across successive rounds, so given enough patient iterations they will eventually overtake the one-off boosts that data cleaning and feature work deliver"],
  explain: "Tuning adjusts how well a model exploits the information present; features and cleaning change WHAT information is present — a strictly more powerful lever. Mislabeled rows, leaking columns, unhandled duplicates put a hard ceiling on every downstream step (garbage in, tuned garbage out). The professional loop: verify data → engineer features → pick a sensible model family → THEN tune, time-boxed, with halving/Bayesian efficiency — and when tuning's marginal gain drops below what an hour of data work historically returns, climb back up the stack. Andrew Ng's 'data-centric AI' is this observation industrialised. Tuning feels productive because it's automatable; the leverage lives where the automation isn't.",
  simple: "A restaurant improves more by buying better ingredients than by micro-adjusting the oven. Hyperparameters are the oven dials: worth setting sensibly, incapable of rescuing a rotten tomato. The stack of leverage runs: fix wrong labels and leaks (the ingredients), craft features (the prep), choose an appropriate model (the recipe), then tune (the dials) — in that order, because each layer caps everything below it. The trap is psychological: dial-twiddling is comfortable, measurable and endless, while data work is unglamorous — so teams polish dials on rotten tomatoes for months. Budget by leverage, not by comfort.",
  widget: {
    type: "curveStatic", title: "Leverage per hour, audited",
    world: "One project's full history: cumulative accuracy gain per effort phase, with hours spent. The same team, the same problem — only the LAYER of work changes.",
    xlab: "project phase →", xs: [0,1,2,3,4], labels: ["baseline","+ data cleaning","+ features","+ model choice","+ hyperparameter tuning"], dec: 1, yunit: "%",
    series: [
      { name: "cumulative accuracy", ys: [78, 84.2, 88.1, 89.6, 90.1] },
      { name: "hours spent this phase (÷10)", ys: [0.4, 6, 8, 3, 12] }
    ],
    knob: { label: "Phase", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Cleaning: +6.2 points in 60 hours — dedup, fixed labels, removed a leaking column. Nothing 'clever' happened; the ceiling itself moved. Best rate on the whole chart.", tone: "info" },
      { max: 3, text: "Features +3.9, then model choice +1.5 in just 30 hours (swapping to gradient boosting: cheap, quick, done once). Each layer's gain was CAPPED by the layers above it being done first.", tone: "info" },
      { max: 4, text: "🤯 Tuning: 120 hours — the longest phase — for +0.5. Necessary polish, delivered at the stack's bottom, and it could never have substituted for the 6-point cleaning win. Read the two curves together: effort flowed DOWN the stack while leverage lived at the top. Budget like this chart, not like the tuning felt.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The leverage hierarchy", formula: "data quality > features > model family > hyperparameters — tune last, time-boxed",
      text: "Audit labels and leaks before anything. When an hour of tuning returns less than an hour of data work, climb the stack. Data-centric beats model-centric on most real tables." }
  }
}
];
