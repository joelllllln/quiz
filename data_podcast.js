/* Podcast corner — probability ideas worth knowing from beyond the core syllabus:
   Markov chains, Bayesian probability, Benford's law and Monte Carlo methods.
   One Part-I level only, every card tagged as a definition → everything sits at
   difficulty L1 (defs rank 1 in data_defs_rank.js). choices[0] is always correct
   (shuffled at render); distractors sized so the correct option is never longest. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  var list = [];
  function add(q) { list.push(q); D[q.q] = 1; }

  /* ---------------- Markov chains ---------------- */
  add({
    q: "What is a Markov chain?",
    choices: [
      "A system that hops between states, where the chance of each next state depends only on the current one",
      "A chain of if-then rules learned from data, applied strictly in the order they were first written down",
      "A sequence of coin flips that are all completely independent of everything, including the present flip",
      "A linked list of models where each one is trained on the errors of the model that came just before it",
      "A queue of events replayed in exact historical order so that the full past always decides the future"
    ],
    explain: "A Markov chain is a set of states (sunny/rainy, page A/B/C, win/lose) plus probabilities for moving between them — with the defining rule that the next move depends only on where you ARE now, not on the route you took to get there. That one simplification makes long-run behaviour computable with nothing but multiplication.",
    simple: "Think of a board game where your next move only depends on the square you're standing on — never on how you got there. That's the whole idea, and it's enough to model weather, websites and word sequences.",
    widget: { reveal: { name: "Markov chain", formula: "states + transition probabilities · next depends only on now", text: "A system hopping between states where the probability of each next state depends only on the current state. The workhorse model for weather, text, games and web navigation." } }
  });
  add({
    q: "The 'Markov property' is often called memorylessness. What exactly is forgotten?",
    choices: [
      "The route taken — given the current state, the whole earlier history adds nothing to predicting the next step",
      "The current state — predictions are made from the long-run average of the states visited so far instead",
      "The transition probabilities — they are re-estimated completely fresh after every single step is taken",
      "The state labels — the chain only remembers how many steps it has made since the process started running from its very first state",
      "Nothing at all — the property says the chain remembers everything but chooses to weight it all equally"
    ],
    explain: "Formally: P(next | present, entire past) = P(next | present). The present state is a sufficient summary — once you know today is 'rainy', knowing the previous fortnight's weather changes nothing about tomorrow's forecast under the model. This is an assumption, not a law of nature: you CHOOSE state definitions rich enough to make it roughly true.",
    simple: "Where you're standing tells you everything that matters; the footprints behind you are irrelevant. If they aren't irrelevant, your 'state' was defined too small — put more into it.",
    widget: { reveal: { name: "Markov property (memorylessness)", formula: "P(next | now, past) = P(next | now)", text: "The defining assumption: given the present state, the past adds no further information about the future. If history still matters, enrich the state until it doesn't." } }
  });
  add({
    q: "What is a Markov chain's transition matrix?",
    choices: [
      "A table with one row per state, giving the probability of moving from that state to every other — each row summing to 1",
      "A table counting how many times each state occurred in the training data, with one grand total in each column of the completed table",
      "A distance matrix recording how many steps separate every pair of states along the shortest possible route",
      "A calendar of scheduled state changes, listing the exact time step at which each transition must happen",
      "A correlation matrix between the states, showing which of them tend to rise and fall together over time"
    ],
    explain: "Row i, column j holds P(next = j | now = i): the whole model in one grid. Each row is a probability distribution (sums to 1). Its power is algebraic — multiply a current-state vector by the matrix to step forward one tick; multiply repeatedly (matrix powers) and you fast-forward the system many steps at once.",
    simple: "It's the game board's rulebook as a grid: from THIS square, here's the chance of landing on each other square next. Multiply by the grid once per turn and you can play the whole game on paper.",
    widget: { reveal: { name: "Transition matrix", formula: "M[i][j] = P(j | i) · rows sum to 1 · step = vector × M", text: "The Markov chain as a grid: each row is a state's next-step distribution. Matrix multiplication advances time — powers of M fast-forward many steps." } }
  });
  add({
    q: "Run a Markov chain for a very long time and the fraction of time spent in each state settles down. What is that called?",
    choices: [
      "The stationary distribution — long-run state proportions that no further stepping changes",
      "The terminal state — the single square where every sufficiently long random walk must end",
      "The overfitting point — where the chain has memorised its own transition probabilities",
      "The convergence failure — chains that settle have, by definition, stopped being random",
      "The prior distribution — the belief about states held before any transitions were seen"
    ],
    explain: "For well-behaved chains, the long-run share of time in each state converges to fixed proportions — the stationary distribution π, satisfying π = πM (stepping doesn't change it). Remarkably, it usually doesn't depend on where you started. Google's PageRank is exactly this: a web surfer clicking random links is a Markov chain, and a page's rank is its share of the stationary distribution.",
    simple: "Wander the board long enough and the percentage of visits to each square stops changing — that settled scoreboard is the chain's fingerprint. PageRank ranked the web by asking: where does a random clicker end up spending their time?",
    widget: { reveal: { name: "Stationary distribution", formula: "π = πM — the long-run share of time in each state", text: "The proportions a long-running chain settles into, independent of the start. PageRank is the web's stationary distribution under random clicking." } }
  });
  add({
    q: "Which of these is a classic real-world use of Markov chains?",
    choices: [
      "Google PageRank, weather models, predictive text and modelling customer journeys between subscription states",
      "Proving that two datasets have equal variance before the running of a t-test on their combined means and their variances",
      "Compressing images by removing the pixels whose colour values repeat in consecutive video frames",
      "Splitting a dataset into train and test halves so that both preserve the original class balance",
      "Encrypting messages by scrambling letters with a secret key agreed between sender and receiver"
    ],
    explain: "Anything that moves between states with roughly memoryless hops fits: PageRank (pages as states, links as transitions), weather (sunny/rainy day-to-day), predictive text and n-gram language models (words as states), customer lifecycle modelling (free → paid → churned), board games, queueing systems, and genetics (DNA base sequences). One idea, remarkable mileage.",
    simple: "Whenever something wanders between a handful of situations — pages, weather, words, subscription statuses — a Markov chain gives you tomorrow's odds and the long-run picture from one simple table.",
    widget: { reveal: { name: "Markov chains: use cases", formula: "PageRank · weather · predictive text · customer states · queues", text: "Use wherever a process hops between states roughly memorylessly: web ranking, weather, language models, churn modelling, queues, genetics." } }
  });

  /* ---------------- Bayesian probability ---------------- */
  add({
    q: "What does 'probability' MEAN to a Bayesian?",
    choices: [
      "A degree of belief in a statement, which evidence should update — applicable even to one-off events",
      "The long-run frequency of an outcome over infinitely many identical repeats of the same experiment or trial",
      "A physical property of objects, like mass, that can be measured directly with the right instrument",
      "A number that only exists once a dataset is large enough for the law of large numbers to engage",
      "The proportion of experts who agree with the statement when they are surveyed independently"
    ],
    explain: "The Bayesian reading: probability quantifies how strongly you believe something given what you currently know — so it applies to one-shot questions ('will THIS rocket launch succeed?', 'is this email spam?') where 'infinite repeats' make no sense. The frequentist reading (long-run frequency) is the other classical school; the Bayesian one is what lets evidence formally update belief.",
    simple: "It's a confidence dial, not a tally of repeats. 'I'm 80% sure it'll rain at the picnic' is a perfectly good probability about a day that will only happen once.",
    widget: { reveal: { name: "Bayesian probability", formula: "probability = degree of belief, updated by evidence", text: "Probability as quantified belief given current knowledge — meaningful for one-off events, and updatable the moment new evidence arrives." } }
  });
  add({
    q: "What is the Bayesian updating loop?",
    choices: [
      "Start from a prior belief, weigh new evidence by its likelihood, get a posterior — which becomes the next prior",
      "Collect all conceivable evidence first, then form one final belief that must never be revised again afterwards by anyone",
      "Average your belief with everyone else's until the group converges on one single consensus number",
      "Discard the prior whenever evidence arrives, so each conclusion rests purely on the newest data alone",
      "Alternate between maximising and minimising the likelihood until the two procedures finally agree"
    ],
    explain: "Bayes' rule is the update engine: posterior ∝ prior × likelihood. You start with what you believed (prior), score how well each hypothesis explains the new evidence (likelihood), and emerge with a revised belief (posterior). Crucially it's a LOOP — today's posterior is tomorrow's prior, so belief tracks the accumulating evidence piece by piece.",
    simple: "Belief in, evidence weighed, belief out — then round again. Every new clue nudges the dial, and the dial's position always reflects everything seen so far.",
    widget: { reveal: { name: "Bayesian updating", formula: "posterior ∝ prior × likelihood · posterior → next prior", text: "The engine of Bayesian reasoning: revise belief by weighing evidence through Bayes' rule, then feed the posterior back in as the next prior." } }
  });
  add({
    q: "A Bayesian and a frequentist both see a coin land heads 8 of 10 times. How do their questions differ?",
    choices: [
      "The Bayesian asks 'given this evidence, what should I now believe about the coin?'; the frequentist asks 'how surprising is this data if the coin were fair?'",
      "The Bayesian refuses to conclude anything from only ten flips; the frequentist happily concludes from any sample no matter how small it happens to be, even one flip",
      "The Bayesian uses the mean while the frequentist uses the median of the observed sequence of flips",
      "They differ only in notation — the two schools always compute identical numbers about the coin",
      "The frequentist updates a prior belief with the flips; the Bayesian computes a p-value against fairness"
    ],
    explain: "Same data, different directions. The Bayesian puts a probability distribution over the coin's bias and updates it: 'given 8/10 heads, here's my belief about the bias now'. The frequentist treats the bias as fixed-but-unknown and asks about the DATA: 'if it were fair, data this extreme happens X% of the time' (the p-value). Both are coherent; they answer different questions — and the Bayesian one is usually the question people think they asked.",
    simple: "One updates a belief about the coin; the other measures how surprised a fair coin would be by the data. Notice most people WANT the first answer — and accidentally read the second as if it were.",
    widget: { reveal: { name: "Bayesian vs frequentist", formula: "belief about hypothesis given data ↔ surprise of data given hypothesis", text: "Two readings of probability: Bayesians put beliefs on hypotheses and update them; frequentists fix the hypothesis and ask how likely such data would be. Different questions, often confused." } }
  });
  add({
    q: "Which is a celebrated real-world win for Bayesian reasoning?",
    choices: [
      "Search teams finding the lost submarine USS Scorpion — and lost aircraft since — by updating a probability map of locations with each search result",
      "Proving mathematically that all coins used in official coin tosses are exactly fair before any game begins anywhere, using nothing but the laws of probability",
      "Compressing sound files by predicting each sample as the average of the two neighbouring samples",
      "Sorting databases faster by keeping the records in the order they are most frequently requested",
      "Rendering 3D graphics by tracing the path of individual light rays through a modelled scene"
    ],
    explain: "Bayesian search theory drew a prior map of where the Scorpion could be, then updated it after every unsuccessful sweep — 'we searched cell A and found nothing' is evidence that shifts belief elsewhere. It found the sub, and the same machinery located Air France 447's wreckage. Everyday wins: spam filters, medical test interpretation (why a positive test on a rare disease is still probably negative), A/B testing, and — via Naive Bayes — half this app's syllabus.",
    simple: "Draw a treasure map of beliefs, and let every empty dig politely move the X. It found a lost submarine, it finds crashed planes, and a smaller version of it sorts your spam.",
    widget: { reveal: { name: "Bayesian probability: use cases", formula: "search & rescue maps · spam filters · diagnostics · A/B tests", text: "Where updating-beliefs-with-evidence shines: Bayesian search (Scorpion, AF447), spam filtering, interpreting medical tests against base rates, A/B testing." } }
  });

  /* ---------------- Benford's law ---------------- */
  add({
    q: "What does Benford's law say about naturally-occurring numbers?",
    choices: [
      "Their FIRST digits are heavily skewed: about 30% start with 1, falling steadily to under 5% starting with 9",
      "Their first digits are uniform: each digit from 1 to 9 leads almost exactly one ninth of the values",
      "Their last digits repeat in cycles of ten, so any digit's share is fixed by its position in the cycle of ten",
      "They cluster around round numbers, because humans record measurements to the nearest ten or hundred",
      "They are usually even, since natural processes tend to double quantities rather than triple them"
    ],
    explain: "Across astonishingly varied datasets — river lengths, populations, invoice amounts, physical constants — the leading digit d appears with probability log10(1 + 1/d): 1 leads ~30.1% of the time, 2 ~17.6%, down to 9 at ~4.6%. First noticed in worn logarithm-table pages (the '1' pages were grubbiest), it feels impossible and is everywhere.",
    simple: "In real-world numbers, 1 is the most common first digit by miles — nearly a third of everything — and 9 is the rarest. Your intuition says 'surely equal'; the data laughs.",
    widget: { reveal: { name: "Benford's law", formula: "P(first digit = d) = log₁₀(1 + 1/d) · P(1) ≈ 30.1%", text: "Naturally-occurring numbers start with small digits far more often than large ones: 1 leads ~30% of values, 9 under 5%. Uncanny, and reliably so." } }
  });
  add({
    q: "WHY do so many real datasets follow Benford's law?",
    choices: [
      "Quantities that grow multiplicatively spend far longer with a leading 1 — doubling from 1 to 2 takes as long as from 5 to 10 covers 5–9",
      "Because humans unconsciously prefer writing the digit 1 when they record any kind of measurement by hand into a paper ledger or a spreadsheet",
      "Because rounding to significant figures always pushes the first digit of any number down towards one",
      "It is a consequence of base-10 arithmetic errors and disappears when data is stored in binary instead",
      "Nobody knows — it is an unexplained empirical coincidence with no mathematical account at all"
    ],
    explain: "Think in growth: something compounding steadily spends the same TIME in each equal ratio — and the ratio 1→2 (leading digit 1) is as wide, logarithmically, as 2→4 or 5→10. So processes spanning several orders of magnitude linger longest at leading digit 1. Equivalently: Benford is what scale-invariance forces — the only first-digit law that survives changing units (miles to km, £ to $) is the logarithmic one.",
    simple: "A quantity doubling every year spends a whole year with a 1 in front (1M→2M), but races from 5M to 10M through the big digits. Growth loiters at 1 — so 1 leads the parade.",
    widget: { reveal: { name: "Why Benford's law holds", formula: "multiplicative growth + scale invariance → logarithmic digits", text: "Multiplicative processes spend equal time in equal RATIOS, and the 1→2 stretch is the widest — plus only the log law survives a change of units. Growth loiters at leading digit 1." } }
  });
  add({
    q: "Which datasets should you NOT expect to obey Benford's law?",
    choices: [
      "Assigned or tightly-ranged numbers — phone numbers, adult heights, lottery draws — that don't span orders of magnitude",
      "Financial data of any kind, since money is designed by humans and cannot follow natural laws",
      "Any dataset with more than a thousand rows, where the law breaks down under its own weight",
      "Numbers recorded in metric units, because the law only functions with imperial measurements",
      "Datasets containing the digit zero anywhere, which invalidates the leading-digit count entirely and beyond any statistical repair"
    ],
    explain: "Benford needs data that spreads across several orders of magnitude and arises from natural accumulation or growth. It fails where numbers are ASSIGNED (phone numbers, IDs, postcodes), CONSTRAINED to a narrow band (adult heights: 1.5–2.0m — almost everything leads with 1 for the wrong reason), or drawn uniformly (lottery balls). Knowing when the law applies is half of using it honestly.",
    simple: "It works on numbers nature grew, not numbers people assigned or squeezed into a narrow range. Invoices yes; phone numbers no; heights no — they're all stuck near the same size.",
    widget: { reveal: { name: "When Benford applies (and doesn't)", formula: "needs: growth + several orders of magnitude · not assigned/narrow data", text: "Expect Benford in accumulated, wide-ranging data (invoices, populations); never in assigned numbers (IDs, phones), narrow ranges (heights) or uniform draws (lotteries)." } }
  });
  add({
    q: "How is Benford's law used in fraud detection?",
    choices: [
      "Fabricated figures are written by humans, whose invented first digits drift toward uniform — a Benford test flags accounts worth auditing",
      "Fraudulent transactions always start with the digit 9, so auditors simply count the nines in the ledger to measure how much money has gone missing",
      "It decrypts hidden messages in the accounts, revealing the fraudster's name in the digit sequence",
      "It proves fraud in court by itself, convicting whenever the digit distribution deviates from the law",
      "It recovers the true figures from the fake ones by inverting the logarithmic digit distribution"
    ],
    explain: "People inventing numbers unconsciously spread first digits too evenly (and favour 'plausible-looking' middles) — real invoices, expenses and tax figures lean hard on 1s and 2s. Auditors compare a ledger's first-digit histogram against log10(1+1/d); big deviations mark WHERE to dig, famously in accounting fraud, expense fiddles, and screening suspect election or scientific datasets. It's a smoke detector, not a conviction: legitimate quirks (price points at £4.99) also trip it.",
    simple: "Fraudsters spread their made-up digits evenly because that FEELS random — but real money leans on 1s. Compare the lean, and cooked books glow. Then a human goes and checks why.",
    widget: { reveal: { name: "Benford's law: fraud detection", formula: "compare first-digit histogram vs log₁₀(1+1/d) → flag outliers", text: "Invented numbers drift toward uniform first digits; genuine accounts follow Benford. Auditors use the mismatch as a screening flag — a smoke detector that tells you where to audit, never a verdict." } }
  });

  /* ---------------- Monte Carlo ---------------- */
  add({
    q: "What is a Monte Carlo method?",
    choices: [
      "Answering a hard question by running many RANDOM simulations and reading the answer off the results' average",
      "A gambling strategy that guarantees long-run profit by doubling the stake after every single loss",
      "An exhaustive search that tries every possible outcome exactly once and tallies up the full total of all the outcomes it visited",
      "A closed-form algebra technique for solving integrals symbolically without any numbers involved",
      "A way of encrypting simulations so that competitors cannot reproduce your model's predictions"
    ],
    explain: "When the maths is intractable — a weird integral, a portfolio's risk, a project timeline with a dozen uncertain steps — you SIMULATE: draw random inputs, compute the outcome, repeat thousands of times, and let the distribution of results BE the answer. Named after the casino because its engine is chance; powered by the law of large numbers, which guarantees the average converges on the truth.",
    simple: "Can't solve it? Play it out ten thousand times with dice and look at the pile of results. The shape of the pile IS your answer — no cleverness required, just repetition.",
    widget: { reveal: { name: "Monte Carlo method", formula: "simulate randomly, many times → average ≈ answer", text: "Estimate what you can't derive: run many random simulations and read the answer from the results. The law of large numbers does the heavy lifting." } }
  });
  add({
    q: "What is the classic 'estimate π by throwing darts' Monte Carlo demonstration?",
    choices: [
      "Scatter random points in a square holding a quarter-circle: the fraction landing inside, times 4, converges to π",
      "Throw darts at a circular board and count the bullseyes, whose share equals π divided by ten exactly on any board size",
      "Drop darts along a ruler and measure the average gap between them, which tends toward π over time",
      "Arrange darts into ever-larger polygons and measure each perimeter against its longest diagonal",
      "Throw one dart perfectly at the centre of a circle and compute π from its coordinates alone"
    ],
    explain: "Random points in a unit square land inside the inscribed quarter-circle with probability (area of quarter-circle)/(area of square) = π/4. So: throw N random points, count the fraction inside, multiply by 4 — and watch the estimate wander toward 3.14159… as N grows. It's the whole Monte Carlo idea in one picture: turn a geometry question into a counting question via randomness.",
    simple: "Rain random dots onto a square with a pizza slice drawn inside. The share of dots on the pizza tells you the slice's area — and the slice's area happens to contain π. Count dots, learn π.",
    widget: { reveal: { name: "Monte Carlo π estimate", formula: "4 × (points inside quarter-circle ÷ total points) → π", text: "The canonical demo: random points in a square estimate the quarter-circle's area, and with it π. Geometry answered by counting — that's Monte Carlo in one image." } }
  });
  add({
    q: "How does a Monte Carlo estimate's accuracy improve as you add more simulations?",
    choices: [
      "Error shrinks like 1/√N — each extra decimal place of accuracy costs roughly 100× more simulations",
      "Error halves with every single additional simulation, so a few dozen runs give perfect answers",
      "Error stays constant until a critical N is reached, at which point the estimate snaps exactly true",
      "Error GROOWS with N as rounding mistakes accumulate across the many simulated runs",
      "Error depends only on the random seed chosen, and no amount of extra runs can change it"
    ],
    explain: "The standard error of the mean falls as σ/√N: quadruple the simulations to halve the error, 100× them for one more decimal digit. Slow — but magnificently INDIFFERENT to dimension, which is why Monte Carlo owns high-dimensional problems (a 100-variable integral) where grid methods explode. Practical reading: cheap runs buy you the first digits fast, and precision beyond that gets expensive.",
    simple: "More dice, better answer — but with diminishing returns: to be twice as sure you need four times the throws. The consolation prize is huge: the rule doesn't care how complicated the problem is.",
    widget: { reveal: { name: "Monte Carlo convergence (1/√N)", formula: "error ∝ 1/√N — 4× runs → ½ error, dimension-independent", text: "Accuracy improves with the square root of the run count: slow but dimension-proof, which is exactly why Monte Carlo wins on high-dimensional problems." } }
  });
  add({
    q: "Where do Monte Carlo simulations earn their keep in the real world?",
    choices: [
      "Portfolio risk and option pricing, project-timeline forecasts, physics simulations and game AIs like AlphaGo's tree search",
      "Alphabetising large document collections faster than comparison sorting could ever manage to do on the same hardware in the same time",
      "Compressing photographs by replacing pixel regions with random noise of the same average colour",
      "Automatically labelling training data so that supervised models no longer need any human labels",
      "Serving web pages from the geographically nearest data centre to minimise the round-trip time"
    ],
    explain: "Finance runs it constantly: simulate thousands of market paths to price options or ask 'what's the 5% worst case for this portfolio?' (Value at Risk). Project managers simulate task-duration uncertainty into delivery-date distributions. Physics and engineering simulate particle transport and reliability. Game AI (MCTS in AlphaGo) evaluates moves by random playouts. Anywhere uncertainty compounds beyond algebra's reach, simulation answers.",
    simple: "Whenever many uncertainties pile up — market moves, task overruns, particle paths, game futures — you stop calculating and start rolling dice at scale. The pile of outcomes is the forecast.",
    widget: { reveal: { name: "Monte Carlo: use cases", formula: "risk (VaR) · option pricing · project timelines · physics · MCTS", text: "The go-to when compounded uncertainty defeats algebra: financial risk and pricing, delivery forecasts, physical simulation, and random-playout game AI." } }
  });
  add({
    q: "MCMC — Markov chain Monte Carlo — marries this section's two big ideas. To do what?",
    choices: [
      "Sample from distributions too complex to sample directly, by building a Markov chain whose stationary distribution IS the target",
      "Speed up any Markov chain by replacing its transition matrix with independent Monte Carlo draws",
      "Prove that a Markov chain has converged by simulating it once from every possible starting state that the chain could ever begin from",
      "Estimate π more accurately than plain Monte Carlo by correlating the darts with each other",
      "Remove the randomness from Monte Carlo so that every run returns exactly the same answer"
    ],
    explain: "Bayesian posteriors are often easy to write down but impossible to sample directly. MCMC's trick: construct a Markov chain (e.g. Metropolis-Hastings, Gibbs) whose STATIONARY distribution equals the target — then just run it and collect states. The wandering chain becomes a sampler; the samples become your posterior estimates. It's the computational engine that made modern Bayesian statistics practical.",
    simple: "Want samples from an impossible distribution? Build a board game whose long-run visiting pattern IS that distribution, play it for a while, and write down where you land. Markov's walk plus Monte Carlo's dice — hence the name.",
    widget: { reveal: { name: "MCMC (Markov chain Monte Carlo)", formula: "design chain with π = target → run it → states are samples", text: "Sampling the unsampleable: a Markov chain engineered so its stationary distribution is your target (say, a Bayesian posterior). Running the chain generates the samples — the engine of practical Bayesian statistics." } }
  });

  Q.podcast = list;
})();
