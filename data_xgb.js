/* XGBoost — full topic (3 levels) + primer. choices[0] always correct (shuffled at render). */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  window.PRIMERS = window.PRIMERS || {};
  window.PRIMERS.xgb = { terms: [
    { t:"Boosting", d:"Building a model one small piece at a time, where each new piece focuses on fixing the mistakes the pieces so far still make." },
    { t:"Weak learner", d:"A deliberately simple model — here a small decision tree — that alone predicts only a little better than guessing, but shines in a team." },
    { t:"Residual (error)", d:"The gap between the true answer and the ensemble's current prediction: how wrong the model still is on each row." },
    { t:"Gradient", d:"A number saying which direction and how hard to nudge a prediction to reduce the loss; XGBoost's new trees chase these gradients." },
    { t:"Ensemble", d:"A team of models whose predictions are added or combined into one final answer that beats any single member." },
    { t:"Regularization", d:"A penalty that discourages an overly complex model, trading a little training accuracy for much better performance on new data." },
    { t:"Hyperparameter", d:"A setting you choose before training (like tree depth or learning rate) that shapes how the model learns, rather than being learned itself." },
    { t:"Validation set", d:"Held-out rows the model never trains on, used to watch honest performance and decide when to stop adding trees." }
  ] };
  function def(qk,o){ (Q[qk]=Q[qk]||[]).push(o); D[o.q]=1; }
  function q(qk,o){ (Q[qk]=Q[qk]||[]).push(o); }

  /* =====================  xgb1 · Part I · Foundations  (15: 8 def + 7 q)  ===================== */

  def("xgb1", {
    q:"What is XGBoost?",
    choices:[
      "A fast, regularized library that builds an ensemble of decision trees by gradient boosting",
      "A single very deep decision tree tuned to memorize the entire training dataset flawlessly, row by row",
      "A neural network library specialized for classifying images, raw audio waveforms, and video frames",
      "A clustering method that groups similar rows into tidy clusters without ever using any labels at all",
      "A linear regression solver that fits one straight line through the data by minimizing squared error"
    ],
    explain:"XGBoost (eXtreme Gradient Boosting) is a popular open-source library that implements gradient-boosted decision trees with heavy engineering for speed and built-in regularization. It builds an ensemble of many small trees added one after another, each correcting the combined errors of the trees before it. It is the go-to tool for tabular (spreadsheet-like) data.",
    simple:"XGBoost builds a team of small decision trees, adding them one at a time so each new tree fixes the team's leftover mistakes. It is famous for being fast and for winning competitions on table-shaped data.",
    widget:{ type:"curveStatic", title:"Trees add up", world:"Add more boosting trees and watch accuracy climb toward a ceiling.", xlab:"trees in ensemble →", xs:[0,1,2,3,4], labels:["1","10","50","150","400"], dec:0, yunit:"%",
      series:[{ name:"accuracy", ys:[63,79,88,92,93] }],
      knob:{ label:"Trees", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"One tiny tree is only 63% -- barely better than guessing.",tone:"info"}, {max:3,text:"By 150 trees the team reaches 92%. Each tree fixes leftover errors.",tone:"info"}, {max:4,text:"🤯 The strength comes from the crowd of small trees, not one big one.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"XGBoost", formula:"prediction = sum of many small trees", text:"A fast, regularized gradient-boosting library for tabular data." } }
  });

  def("xgb1", {
    q:"What is gradient boosting (the idea XGBoost is built on)?",
    choices:[
      "Adding models in sequence, each new one trained to reduce the current ensemble's errors",
      "Training many fully independent trees on random subsets and then averaging all of their votes at once",
      "Picking the single best-performing model from a large candidate pool and simply throwing the rest away",
      "Growing one enormous tree as deep as it can possibly go until every single leaf becomes perfectly pure",
      "Adjusting the internal weights of a fixed pretrained neural network with repeated backpropagation passes"
    ],
    explain:"Gradient boosting builds an ensemble additively: it starts with a rough prediction and then repeatedly adds a new model that points in the direction that most reduces the loss (the negative gradient). Each round nudges the combined prediction closer to the truth. XGBoost is one highly optimized implementation of this general recipe.",
    simple:"Gradient boosting makes a first rough guess, then keeps adding small models that each clean up whatever error is left. It is like drafting an essay and improving it edit by edit, one focused fix at a time.",
    widget:{ type:"curveStatic", title:"Error shrinks each round", world:"Each boosting round adds a tree aimed at the leftover error.", xlab:"boosting rounds →", xs:[0,1,2,3,4], labels:["0","1","3","10","30"], dec:0, yunit:"",
      series:[{ name:"training error", ys:[100,72,50,28,14] }],
      knob:{ label:"Rounds", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"Round 1 already knocks error down sharply.",tone:"info"}, {max:3,text:"Each round targets the remaining mistakes, so error keeps falling.",tone:"info"}, {max:4,text:"🤯 Many weak corrections stack into one strong model.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"Gradient boosting", formula:"new tree ≈ negative gradient of the loss", text:"Add models in sequence, each reducing the current error." } }
  });

  def("xgb1", {
    q:"What is regularized boosting (what the 'regularized' in XGBoost adds)?",
    choices:[
      "Gradient boosting with an added penalty on tree complexity to fight overfitting",
      "Boosting that strips out every possible source of randomness so the results are perfectly repeatable each run",
      "Boosting that trains only on the single hardest 10% of the rows and completely ignores all of the easy rest",
      "Boosting where every tree is forced to share exactly the same shape, depth, and identical split structure",
      "Boosting that skips validation entirely because the added penalty is said to guarantee zero overfitting"
    ],
    explain:"Regularized boosting adds a penalty term to the objective for how complex each tree is — the number of leaves and the size of the leaf weights. This discourages the model from carving out tiny over-specific leaves that just memorize noise. It is a key reason XGBoost generalizes better than plain gradient boosting out of the box.",
    simple:"Regularization is a built-in fine for being too complicated. XGBoost adds this fine so trees stay simpler and the model works better on new data instead of just memorizing the training rows.",
    widget:{ type:"curveStatic", title:"Penalty tames complexity", world:"Turn up the regularization penalty and watch the train/test gap close.", xlab:"regularization strength →", xs:[0,1,2,3,4], labels:["0","0.5","2","8","30"], dec:0, yunit:"%",
      series:[{ name:"test accuracy", ys:[78,84,89,88,80] }, { name:"train accuracy", ys:[100,97,92,86,79] }],
      knob:{ label:"Penalty", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"No penalty: train is perfect but test lags -- overfitting.",tone:"info"}, {max:3,text:"A moderate penalty lifts test accuracy and shrinks the gap.",tone:"info"}, {max:4,text:"🤯 Too much penalty underfits -- both scores fall. There's a sweet spot.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"Regularized boosting", formula:"objective = loss + penalty(tree complexity)", text:"A complexity penalty on top of boosting to control overfitting." } }
  });

  def("xgb1", {
    q:"What is the learning rate (eta) in XGBoost?",
    choices:[
      "A factor that shrinks each new tree's contribution so the ensemble learns in small steps",
      "The total number of boosting trees the model will build before training finally comes to a stop",
      "The maximum depth of splits that any single individual tree in the ensemble is ever allowed to reach",
      "The fraction of training rows randomly sampled without replacement to build each separate tree",
      "The threshold probability used to convert predicted scores into final positive or negative class labels"
    ],
    explain:"The learning rate (called eta) multiplies the output of every new tree before it is added to the ensemble, typically to a value like 0.1 or 0.05. Smaller steps mean each tree changes the prediction only a little, so the model is less likely to overshoot and overfit — but it needs more trees to reach the same accuracy. It is one of the most important knobs to tune.",
    simple:"The learning rate says how big a step each new tree takes. Small steps are safer and usually more accurate, but you need many more trees to get there.",
    widget:{ type:"curveStatic", title:"Step size vs test error", world:"Sweep the learning rate (with trees fixed) and watch test error.", xlab:"learning rate (eta) →", xs:[0,1,2,3,4], labels:["0.01","0.05","0.1","0.3","1.0"], dec:0, yunit:"%",
      series:[{ name:"test error", ys:[18,12,11,15,26] }],
      knob:{ label:"eta", min:0, max:4, step:1, init:2 },
      insights:[ {max:1,text:"Very tiny eta underfits here -- too few steps taken with these trees.",tone:"info"}, {max:3,text:"Around 0.05-0.1 gives the lowest error, a common default range.",tone:"info"}, {max:4,text:"🤯 eta = 1.0 takes reckless full steps and overshoots badly.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"Learning rate (eta)", formula:"ensemble += eta × new_tree", text:"Shrinks each tree's step; small eta needs more trees but generalizes better." } }
  });

  def("xgb1", {
    q:"What does n_estimators (number of boosting rounds) control?",
    choices:[
      "How many trees are added to the ensemble in total",
      "How deep each individual tree is allowed to grow",
      "How much each tree's prediction is shrunk before being added",
      "How many features each split is allowed to consider",
      "How many rows must land in a leaf before a split is allowed"
    ],
    explain:"n_estimators (also called the number of boosting rounds) sets how many trees XGBoost builds. More trees can keep lowering error, but past a point they start fitting noise and hurt performance on new data. It works hand-in-hand with the learning rate: a smaller eta usually needs a larger n_estimators.",
    simple:"n_estimators is simply how many trees you add. Too few and the model is weak; too many and it starts memorizing noise. This is what early stopping helps you pick.",
    widget:{ type:"curveStatic", title:"More rounds, then overfit", world:"Add more boosting rounds and watch validation error dip then rise.", xlab:"boosting rounds →", xs:[0,1,2,3,4], labels:["10","50","150","400","1000"], dec:0, yunit:"%",
      series:[{ name:"validation error", ys:[22,14,11,13,19] }],
      knob:{ label:"Rounds", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"Too few rounds: the model hasn't learned enough yet.",tone:"info"}, {max:3,text:"Around 150 rounds validation error bottoms out.",tone:"info"}, {max:4,text:"🤯 Push to 1000 and error climbs again -- extra trees fit noise.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"n_estimators", formula:"total trees added to the ensemble", text:"More helps up to a point, then overfits -- pair with eta and early stopping." } }
  });

  def("xgb1", {
    q:"What does the max_depth hyperparameter control in XGBoost?",
    choices:[
      "The maximum number of levels of splits in each individual tree",
      "The total number of boosting trees the finished ensemble will end up containing overall",
      "The smallest loss reduction required before any node inside a tree is allowed to split further",
      "The step-size shrinkage factor applied to each tree's output before it is added onto the ensemble",
      "The fraction of feature columns randomly sampled when constructing each individual tree in turn"
    ],
    explain:"max_depth limits how many levels of splits each tree can have, which caps how complex a single tree gets. Deeper trees can capture richer feature interactions but overfit quickly and cost more memory and time. XGBoost's trees are usually kept shallow (often 3–8) because the boosting ensemble combines many of them.",
    simple:"max_depth is how many question-levels deep each tree can go. Shallow trees are simple and safe; deep trees capture more but easily memorize noise.",
    widget:{ type:"curveStatic", title:"Deeper isn't always better", world:"Increase max_depth and watch validation accuracy peak then drop.", xlab:"max_depth →", xs:[0,1,2,3,4], labels:["2","4","6","10","16"], dec:0, yunit:"%",
      series:[{ name:"validation accuracy", ys:[84,90,91,86,79] }, { name:"train accuracy", ys:[86,93,97,100,100] }],
      knob:{ label:"Depth", min:0, max:4, step:1, init:1 },
      insights:[ {max:1,text:"Very shallow trees slightly underfit here.",tone:"info"}, {max:3,text:"Depth 4-6 is the sweet spot for this data.",tone:"info"}, {max:4,text:"🤯 Depth 16 memorizes training data but validation collapses.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"max_depth", formula:"max levels of splits per tree", text:"Caps single-tree complexity; shallow trees resist overfitting." } }
  });

  def("xgb1", {
    q:"What is the objective function in XGBoost?",
    choices:[
      "The formula measuring how wrong the model is, which training tries to minimize",
      "The ordered list of feature columns the model is permitted to split on during its training",
      "The scheduling rule that decides exactly how many boosting trees to build before halting",
      "The random seed value that makes every single training run fully reproducible and repeatable",
      "The fixed order in which the individual training rows are fed one by one into each new tree"
    ],
    explain:"The objective function defines what 'good' means for the task — for example squared error for regression, or logistic loss for binary classification. XGBoost adds trees that reduce this objective (plus its regularization term). You pick the objective to match your problem, such as 'reg:squarederror' or 'binary:logistic'.",
    simple:"The objective function is the scoreboard for how wrong the model is. Training just keeps adding trees to push that score down. You choose it to fit your task -- regression, classification, and so on.",
    widget:{ type:"curveStatic", title:"Objective drives training", world:"Each round lowers the objective (loss) value.", xlab:"boosting rounds →", xs:[0,1,2,3,4], labels:["0","2","5","15","40"], dec:2, yunit:"",
      series:[{ name:"objective (loss)", ys:[0.69,0.52,0.41,0.30,0.24] }],
      knob:{ label:"Rounds", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"Start at log-loss 0.69 -- the value of pure guessing.",tone:"info"}, {max:3,text:"Each round lowers the objective the model is minimizing.",tone:"info"}, {max:4,text:"🤯 The objective is the target; everything else serves lowering it.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"Objective function", formula:"objective = loss + regularization", text:"The measure of wrongness that training minimizes; choose it to match the task." } }
  });

  def("xgb1", {
    q:"What is early stopping in XGBoost?",
    choices:[
      "Halting training when validation error stops improving for a set number of rounds",
      "Removing the single least important feature from the whole dataset after every boosting round",
      "Stopping one individual tree from growing any further the moment it reaches its max_depth limit",
      "Ending all of the training the instant the training-set error first happens to hit exactly zero",
      "Skipping over any rows whose current prediction already happens to match their true label correctly"
    ],
    explain:"Early stopping watches a validation metric while trees are added and stops once it has not improved for a chosen patience (say 50 rounds), keeping the best iteration. This automatically finds a good number of trees and prevents the overfitting that comes from adding too many. It requires an eval set the model does not train on.",
    simple:"Early stopping keeps adding trees only while a held-out validation score is still improving, then stops. It saves you from guessing how many trees to use and from overfitting with too many.",
    widget:{ type:"curveStatic", title:"Stop at the dip", world:"Track validation error; early stopping halts after it stops improving.", xlab:"boosting rounds →", xs:[0,1,2,3,4], labels:["20","80","160","300","600"], dec:0, yunit:"%",
      series:[{ name:"validation error", ys:[19,13,10,12,18] }],
      knob:{ label:"Rounds", min:0, max:4, step:1, init:2 },
      insights:[ {max:1,text:"Early on, error is still falling -- keep going.",tone:"info"}, {max:3,text:"Around 160 rounds error bottoms out: the best iteration.",tone:"info"}, {max:4,text:"🤯 Beyond the dip error rises -- early stopping saves the best model.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"Early stopping", formula:"stop when val metric hasn't improved for N rounds", text:"Auto-picks the tree count and prevents over-boosting." } }
  });

  q("xgb1", {
    q:"Why does XGBoost add regularization on top of plain gradient boosting?",
    choices:[
      "To penalize overly complex trees so the model overfits the training data less",
      "To deliberately make each training round slower so that the results are more carefully computed",
      "To guarantee that the model's training error will always eventually reach exactly zero every time",
      "To completely remove the need for any held-out validation data during hyperparameter tuning",
      "To force every single tree in the ensemble to make use of all of the available input features"
    ],
    explain:"Plain gradient boosting can keep carving out finer and finer leaves that fit noise, especially with many rounds. XGBoost adds an explicit penalty on the number of leaves and the magnitude of leaf weights, which biases it toward simpler trees. This trades a little training accuracy for noticeably better generalization to new data.",
    simple:"Boosting alone can get greedy and memorize noise. The extra regularization is a fine for being too complex, so the model stays simpler and does better on data it hasn't seen.",
    widget:{ type:"curveStatic", title:"Regularization vs the gap", world:"Increase the complexity penalty and watch overfitting shrink.", xlab:"regularization →", xs:[0,1,2,3,4], labels:["off","low","med","high","max"], dec:0, yunit:"%",
      series:[{ name:"train-minus-test gap", ys:[22,14,7,4,3] }],
      knob:{ label:"Penalty", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"No penalty: a 22-point gap between train and test -- classic overfit.",tone:"info"}, {max:3,text:"More penalty steadily closes the gap.",tone:"info"}, {max:4,text:"🤯 Regularization is why XGBoost generalizes so well by default.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"Why regularize", formula:"simpler trees ⇒ smaller train/test gap", text:"The penalty fights the overfitting that plain boosting invites." } }
  });

  q("xgb1", {
    q:"When XGBoost adds a new tree, what is that tree actually trained to predict?",
    choices:[
      "The gradient of the loss — essentially the current ensemble's leftover errors",
      "The original raw target values entirely from scratch, completely ignoring all of the previous trees",
      "A random relabeling of the training rows introduced purely to add extra diversity to the ensemble",
      "The plain average of the predictions made by every single earlier tree in the ensemble combined",
      "The single most important feature's raw unprocessed value taken directly from each individual row"
    ],
    explain:"At each round the ensemble already has a prediction for every row, and there is a residual error. XGBoost computes the gradient (and second derivative) of the loss with respect to the current prediction and fits the new tree to that. In effect the new tree learns 'how to correct what we have so far,' which is why boosting improves step by step.",
    simple:"Each new tree doesn't restart -- it learns to fix the mistakes the team is still making right now. It fits the leftover error, then gets added on top.",
    widget:{ type:"curveStatic", title:"Chasing the leftover error", world:"Each round the tree targets the current residual; error shrinks.", xlab:"boosting rounds →", xs:[0,1,2,3,4], labels:["0","1","3","8","20"], dec:0, yunit:"",
      series:[{ name:"remaining error", ys:[100,66,42,22,9] }],
      knob:{ label:"Rounds", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"The first tree tackles the biggest chunk of error.",tone:"info"}, {max:3,text:"Later trees fit smaller and smaller leftovers.",tone:"info"}, {max:4,text:"🤯 Every tree's job is to correct the team, not predict from scratch.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"Fitting gradients", formula:"new tree ≈ current residual / gradient", text:"Each tree learns to correct the ensemble's remaining error." } }
  });

  q("xgb1", {
    q:"You lower the learning rate (eta) from 0.3 to 0.03. What else should you usually change?",
    choices:[
      "Increase the number of trees, since smaller steps need more of them",
      "Decrease the total number of trees, since each individual one now ends up doing much more work",
      "Remove the held-out validation set, since such a low learning rate simply cannot ever overfit",
      "Increase max_depth to exactly 20 levels in order to fully compensate for the smaller step size",
      "Nothing at all, since the learning rate and the total tree count are completely unrelated knobs"
    ],
    explain:"A smaller learning rate means each tree changes the prediction only slightly, so the ensemble needs many more trees to reach the same fit. Lower eta with enough trees usually gives better final accuracy but takes longer to train. The two knobs trade off directly, which is why early stopping is handy to find the right tree count.",
    simple:"Tiny steps get you there more accurately but you need many more of them. Drop eta and you should add trees to compensate -- slower to train, usually better results.",
    widget:{ type:"curveStatic", title:"Small eta needs more trees", world:"Trees required to hit target accuracy as eta shrinks.", xlab:"learning rate (eta) →", xs:[0,1,2,3,4], labels:["0.5","0.3","0.1","0.05","0.02"], dec:0, yunit:"",
      series:[{ name:"trees needed", ys:[40,70,180,380,950] }],
      knob:{ label:"eta", min:0, max:4, step:1, init:2 },
      insights:[ {max:1,text:"Big eta reaches target with few trees, but risks overshooting.",tone:"info"}, {max:3,text:"Halving eta roughly doubles the trees you need.",tone:"info"}, {max:4,text:"🤯 eta 0.02 needs ~950 trees -- accurate but slow. It's a trade-off.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"eta ↔ trees", formula:"smaller eta ⇒ more trees needed", text:"Lower learning rate plus more trees = better but slower." } }
  });

  q("xgb1", {
    q:"A row has a missing value for one feature. How does XGBoost handle it at a split?",
    choices:[
      "It learns a default direction per split and sends missing values that way",
      "It silently drops any training row that has even a single missing value before training begins",
      "It replaces each missing value with that column's overall mean before any of the splitting starts",
      "It halts training and raises a hard runtime error until you manually fill in every missing gap",
      "It always sends missing values straight down the left branch of every split purely by convention"
    ],
    explain:"XGBoost handles missing values natively: for each split it tries sending the missing rows both left and right during training and keeps whichever default direction reduces the loss more. At prediction time, a missing value simply follows that learned default. This means you often do not need to impute missing data yourself.",
    simple:"You don't have to fill in the blanks. At each split XGBoost learns which way missing values should go -- left or right -- based on what works best, and just sends them there.",
    widget:{ type:"curveStatic", title:"Missing handled natively", world:"Accuracy as more values go missing, with vs without native handling.", xlab:"fraction missing →", xs:[0,1,2,3,4], labels:["0%","10%","25%","40%","60%"], dec:0, yunit:"%",
      series:[{ name:"XGBoost default direction", ys:[92,91,89,86,81] }, { name:"drop rows with gaps", ys:[92,86,77,64,48] }],
      knob:{ label:"Missing", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"With few gaps both approaches look fine.",tone:"info"}, {max:3,text:"As gaps grow, dropping rows throws away too much data.",tone:"info"}, {max:4,text:"🤯 Learning a default direction stays strong even at 60% missing.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"Missing values", formula:"per split: send missing to the better branch", text:"XGBoost learns a default direction for missing data automatically." } }
  });

  q("xgb1", {
    q:"Your XGBoost model scores 99% on training but 74% on validation. Which change is LEAST likely to help?",
    choices:[
      "Increasing max_depth further so trees can grow even deeper",
      "Lowering max_depth so each tree is simpler",
      "Reducing the learning rate and using early stopping",
      "Adding subsample and colsample so each tree sees only part of the data",
      "Raising the regularization (lambda/gamma) to penalize complexity"
    ],
    explain:"A big train-minus-validation gap is overfitting, so you want to make the model simpler, not more complex. Deeper trees add capacity and make overfitting worse — the opposite of what you need. Shallower trees, lower eta with early stopping, row/column subsampling, and stronger regularization all reduce overfitting.",
    simple:"That 25-point gap means the model memorized the training set. Making trees deeper gives it even more room to memorize, so it's the wrong move. Everything else simplifies the model and helps.",
    widget:{ type:"curveStatic", title:"Depth widens the gap", world:"How the train/validation gap responds to deeper trees.", xlab:"max_depth →", xs:[0,1,2,3,4], labels:["3","5","8","12","20"], dec:0, yunit:"%",
      series:[{ name:"train-minus-val gap", ys:[5,9,16,22,27] }],
      knob:{ label:"Depth", min:0, max:4, step:1, init:2 },
      insights:[ {max:1,text:"Shallow trees keep train and validation close.",tone:"info"}, {max:3,text:"Deeper trees widen the overfitting gap steadily.",tone:"info"}, {max:4,text:"🤯 To fix overfitting you go simpler, not deeper.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"Overfitting control", formula:"less depth/eta + more subsampling ⇒ smaller gap", text:"Simplify the model to close a large train/validation gap." } }
  });

  q("xgb1", {
    q:"Why does XGBoost tend to dominate on tabular (spreadsheet-like) data?",
    choices:[
      "Boosted trees capture nonlinear feature interactions well and need little preprocessing",
      "It always ingests far more training data than any other machine learning method could ever handle",
      "It converts every data table into a color image and then applies deep convolutional filters to it",
      "It requires that all input features be perfectly scaled and follow a clean normal distribution first",
      "It memorizes the entire training set exactly, which happens to be ideal for tabular spreadsheet data"
    ],
    explain:"Tabular data has mixed feature types, nonlinear relationships, and interactions that tree ensembles model naturally, without needing feature scaling or heavy preprocessing. XGBoost adds strong regularization, native missing-value handling, and fast training, making it accurate and practical. For structured data it routinely beats or matches deep learning with far less tuning.",
    simple:"Tables have messy, mixed columns and tangled relationships, and trees handle those out of the box -- no scaling needed. XGBoost makes trees fast and well-regularized, so it's the default winner on spreadsheet-style data.",
    widget:{ type:"curveStatic", title:"Strong on structured data", world:"Typical accuracy across method families on mixed tabular data.", xlab:"method →", xs:[0,1,2,3,4], labels:["linear","single tree","random forest","neural net","XGBoost"], dec:0, yunit:"%",
      series:[{ name:"typical accuracy", ys:[80,78,88,86,91] }],
      knob:{ label:"Method", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"A single tree or linear model leaves accuracy on the table.",tone:"info"}, {max:3,text:"Ensembles like random forests already do well here.",tone:"info"}, {max:4,text:"🤯 On tabular data XGBoost usually edges everything out.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"Tabular dominance", formula:"trees + boosting + regularization", text:"Handles interactions and mixed features with minimal preprocessing." } }
  });

  q("xgb1", {
    q:"To use early stopping, what must you provide to XGBoost?",
    choices:[
      "A validation set the model does not train on, plus a patience (stopping rounds)",
      "Only the training set itself, since early stopping genuinely needs nothing at all extra to work",
      "The exact final number of boosting trees, fully decided and fixed well in advance of any training",
      "A second identical copy of the same training data, reused once again for the evaluation metric",
      "A fully separate second model that XGBoost compares itself against after every single boosting round"
    ],
    explain:"Early stopping needs an evaluation set (validation data) that is separate from the training rows, so the metric it watches is an honest estimate of generalization. You also set early_stopping_rounds — the patience — which is how many rounds of no improvement to tolerate before halting. The model then keeps the best iteration found.",
    simple:"You give XGBoost a held-out validation set to watch, plus how many stalled rounds to wait before quitting. Evaluating on the training data itself wouldn't work -- it never looks like it's overfitting there.",
    widget:{ type:"curveStatic", title:"Watch the honest score", world:"Training keeps improving; only validation reveals when to stop.", xlab:"boosting rounds →", xs:[0,1,2,3,4], labels:["20","80","160","320","640"], dec:0, yunit:"%",
      series:[{ name:"validation accuracy", ys:[82,88,90,88,84] }, { name:"training accuracy", ys:[85,92,96,99,100] }],
      knob:{ label:"Rounds", min:0, max:4, step:1, init:2 },
      insights:[ {max:1,text:"Both scores rise early -- keep training.",tone:"info"}, {max:3,text:"Validation peaks near 160 rounds while training keeps climbing.",tone:"info"}, {max:4,text:"🤯 Only the held-out set shows the peak; training alone would mislead.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"Early stopping setup", formula:"needs eval set + early_stopping_rounds", text:"Watch a held-out metric and halt at its best point." } }
  });

  /* =====================  xgb2 · Part II · Practice  (9: 2 def + 7 q)  ===================== */

  def("xgb2", {
    q:"What is a DMatrix in XGBoost?",
    choices:[
      "XGBoost's optimized internal data structure for features, labels, and weights",
      "The confusion matrix of class predictions that is produced right after all the training finishes",
      "A large matrix holding all the feature-importance scores computed for every tree in the model",
      "The complete list of hyperparameters and configuration settings passed into the main training call",
      "A distance matrix recording the pairwise distance between every possible pair of training rows"
    ],
    explain:"DMatrix is XGBoost's own data container, built for memory efficiency and training speed. You load your features and labels (and optional weights) into it, and XGBoost can then train much faster than on a raw array, including caching split information. The scikit-learn wrapper hides it, but the native API uses DMatrix directly.",
    simple:"A DMatrix is just how XGBoost packages your data internally so it can train fast. You pour in your features and labels, and XGBoost stores them in a form it can crunch efficiently.",
    widget:{ type:"curveStatic", title:"Optimized data format", world:"Relative training speed as data is packed into a DMatrix.", xlab:"data size →", xs:[0,1,2,3,4], labels:["10k","50k","200k","1M","5M"], dec:0, yunit:"×",
      series:[{ name:"DMatrix speedup vs raw", ys:[1,2,3,4,5] }],
      knob:{ label:"Rows", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"On tiny data the format barely matters.",tone:"info"}, {max:3,text:"As data grows, the optimized layout pays off more.",tone:"info"}, {max:4,text:"🤯 At millions of rows the efficient DMatrix format really shines.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"DMatrix", formula:"features + labels ⇒ fast internal store", text:"XGBoost's efficient data container for speedy training." } }
  });

  def("xgb2", {
    q:"What does the scale_pos_weight parameter do?",
    choices:[
      "It up-weights the positive (minority) class to counter class imbalance",
      "It scales every single feature value into the 0-to-1 range before any of the training actually begins",
      "It sets a separate, fully independent learning rate that applies only to the positive-labeled rows",
      "It strictly limits how many positive-class rows are ever allowed to land inside any single tree leaf",
      "It rescales all of the final predicted probabilities upward after the training has fully completed"
    ],
    explain:"scale_pos_weight multiplies the gradient contribution of the positive class, effectively telling XGBoost to care more about getting the minority class right. A common starting value is the ratio of negative to positive examples. It is the standard lever for imbalanced binary classification, such as fraud or rare-disease detection.",
    simple:"When one class is rare, scale_pos_weight tells XGBoost to pay extra attention to it so it isn't ignored. A common setting is how many negatives there are per positive.",
    widget:{ type:"curveStatic", title:"Rebalancing rare positives", world:"Recall of the rare class as scale_pos_weight increases.", xlab:"scale_pos_weight →", xs:[0,1,2,3,4], labels:["1","5","20","50","150"], dec:0, yunit:"%",
      series:[{ name:"minority-class recall", ys:[31,55,74,83,88] }],
      knob:{ label:"Weight", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"At weight 1 the rare class is mostly missed -- recall only 31%.",tone:"info"}, {max:3,text:"Up-weighting positives sharply improves recall.",tone:"info"}, {max:4,text:"🤯 Setting it near the negative/positive ratio balances the classes.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"scale_pos_weight", formula:"≈ (# negatives) / (# positives)", text:"Up-weights the minority class to handle imbalance." } }
  });

  q("xgb2", {
    q:"What does subsample = 0.8 do in XGBoost?",
    choices:[
      "Each tree is trained on a random 80% of the rows, adding regularizing randomness",
      "Each tree is instead trained on a randomly chosen 80% of all the available feature columns",
      "Only 80% of the fully built trees are actually used together at the final prediction time",
      "Training automatically stops the very moment 80% validation accuracy is first reached on the data",
      "Fully 80% of all leaf weights are deliberately reset to exactly zero after each boosting round"
    ],
    explain:"subsample controls the fraction of training rows randomly drawn (without replacement) to grow each tree. Values below 1.0, like 0.5–0.9, mean each tree sees a different slice of the data, which decorrelates the trees and reduces overfitting — a form of stochastic gradient boosting. It also speeds up training.",
    simple:"subsample = 0.8 means every tree is built on a random 80% of your rows. Showing each tree a slightly different sample keeps them from all making the same mistakes, which fights overfitting.",
    widget:{ type:"curveStatic", title:"Row sampling regularizes", world:"Validation error as the row-sample fraction changes.", xlab:"subsample →", xs:[0,1,2,3,4], labels:["0.3","0.5","0.7","0.9","1.0"], dec:0, yunit:"%",
      series:[{ name:"validation error", ys:[16,12,11,12,14] }],
      knob:{ label:"subsample", min:0, max:4, step:1, init:4 },
      insights:[ {max:1,text:"Sampling too few rows (0.3) starves each tree.",tone:"info"}, {max:3,text:"Around 0.7-0.9 gives the lowest error -- helpful randomness.",tone:"info"}, {max:4,text:"🤯 Using all rows (1.0) overfits slightly more than sampling.",tone:"wow"} ],
      extreme:{ at:"min" },
      reveal:{ name:"subsample", formula:"fraction of rows per tree", text:"Row sampling below 1.0 adds regularizing randomness." } }
  });

  q("xgb2", {
    q:"What does colsample_bytree = 0.6 control?",
    choices:[
      "Each tree can only consider a random 60% of the feature columns",
      "Each individual tree is instead trained on a random 60% sample drawn from all of the data rows",
      "Only 60% of the fully trained trees actually get to vote on each final ensemble prediction",
      "Every split is required to improve the training loss by at least a full 60% before it is kept",
      "Fully 60% of all the leaf values in each tree are gradually shrunk toward zero every round"
    ],
    explain:"colsample_bytree sets the fraction of feature columns randomly sampled for each tree. Like column sampling in random forests, it decorrelates the trees so no single dominant feature is used in every tree, which reduces overfitting and can improve accuracy. XGBoost also offers colsample_bylevel and colsample_bynode for finer control.",
    simple:"colsample_bytree = 0.6 gives each tree only a random 60% of the columns to work with. That stops every tree leaning on the same strong feature, so the trees stay varied and the model generalizes better.",
    widget:{ type:"curveStatic", title:"Column sampling adds variety", world:"Validation error as each tree sees fewer columns.", xlab:"colsample_bytree →", xs:[0,1,2,3,4], labels:["0.2","0.4","0.6","0.8","1.0"], dec:0, yunit:"%",
      series:[{ name:"validation error", ys:[17,12,11,12,14] }],
      knob:{ label:"colsample", min:0, max:4, step:1, init:4 },
      insights:[ {max:1,text:"Too few columns (0.2) and trees miss useful signal.",tone:"info"}, {max:3,text:"Around 0.6-0.8 balances variety and signal best.",tone:"info"}, {max:4,text:"🤯 Using every column each time lets one feature dominate -- more overfit.",tone:"wow"} ],
      extreme:{ at:"min" },
      reveal:{ name:"colsample_bytree", formula:"fraction of columns per tree", text:"Column sampling decorrelates trees and curbs overfitting." } }
  });

  q("xgb2", {
    q:"What does the gamma (min_split_loss) parameter do?",
    choices:[
      "It sets the minimum loss reduction required before a node is allowed to split",
      "It sets the shrinking learning rate factor that is applied to each and every newly added tree",
      "It places a firm hard cap on the total number of trees ever added to the boosting ensemble",
      "It scales up the weight given to the rare minority class in order to counteract class imbalance",
      "It fixes exactly how many training rows must be present inside each and every resulting leaf node"
    ],
    explain:"gamma (also called min_split_loss) requires a split to reduce the loss by at least that amount before XGBoost will make it. Higher gamma means the algorithm only makes splits that clearly help, pruning weak splits and producing simpler, more conservative trees. It is one of the regularization knobs used to fight overfitting.",
    simple:"gamma is the minimum improvement a split must earn to be allowed. Raise it and XGBoost only splits when it really helps, keeping trees simpler and less prone to overfitting.",
    widget:{ type:"curveStatic", title:"Pruning weak splits", world:"Number of leaves per tree as gamma rises.", xlab:"gamma →", xs:[0,1,2,3,4], labels:["0","0.5","2","5","15"], dec:0, yunit:"",
      series:[{ name:"leaves per tree", ys:[62,44,28,16,7] }],
      knob:{ label:"gamma", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"gamma 0 allows every split -- big, complex trees.",tone:"info"}, {max:3,text:"Raising gamma prunes splits that barely help.",tone:"info"}, {max:4,text:"🤯 High gamma leaves only the strongest splits -- simple, robust trees.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"gamma (min_split_loss)", formula:"split only if loss drop ≥ gamma", text:"A minimum-gain threshold that prunes weak splits." } }
  });

  q("xgb2", {
    q:"What does min_child_weight do in XGBoost?",
    choices:[
      "It sets the minimum total instance weight (roughly rows) needed in a leaf to keep splitting",
      "It sets the very smallest learning rate value that XGBoost is allowed to use at any point in training",
      "It strictly limits the total number of child trees that each parent tree in the ensemble may spawn off",
      "It weights the most recently added, youngest training rows far more heavily than all of the older ones",
      "It caps exactly how many distinct feature columns any single child node in a tree is ever permitted to use"
    ],
    explain:"min_child_weight requires a certain amount of instance weight (in simple cases, a number of rows) in each resulting leaf before a split is allowed. Larger values stop the tree from creating tiny leaves that fit just a few noisy points, so it acts as a regularizer. Raising it makes trees more conservative and reduces overfitting.",
    simple:"min_child_weight is the minimum 'amount of data' a leaf must hold. Set it higher and XGBoost won't split off tiny leaves that only fit a handful of noisy rows, so it overfits less.",
    widget:{ type:"curveStatic", title:"Bigger leaves, less noise", world:"Validation error as min_child_weight increases.", xlab:"min_child_weight →", xs:[0,1,2,3,4], labels:["1","3","7","20","60"], dec:0, yunit:"%",
      series:[{ name:"validation error", ys:[15,12,11,12,16] }],
      knob:{ label:"min_child_weight", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"Weight 1 allows leaves of a single row -- easy to overfit.",tone:"info"}, {max:3,text:"Requiring more data per leaf lowers error.",tone:"info"}, {max:4,text:"🤯 Too high (60) forces leaves so big the model underfits.",tone:"wow"} ],
      extreme:{ at:"min" },
      reveal:{ name:"min_child_weight", formula:"min instance weight per leaf", text:"Blocks tiny noisy leaves; larger = more conservative." } }
  });

  q("xgb2", {
    q:"You are detecting fraud: 1% of transactions are fraud. Your XGBoost model predicts 'not fraud' for almost everything. Best first fix?",
    choices:[
      "Set scale_pos_weight near the negative-to-positive ratio to up-weight fraud cases",
      "Increase max_depth all the way to 30 levels so that the trees can simply memorize the fraud rows",
      "Remove the held-out validation set entirely so that training gets to see even more fraud examples",
      "Switch the objective function over to plain squared-error regression instead of binary classification",
      "Lower the learning rate down to just 0.001 while keeping the number of trees fixed at only 10 total"
    ],
    explain:"With 1% positives, the model can score high accuracy by always predicting the majority class, ignoring fraud. scale_pos_weight up-weights the rare positive class so its errors count more, pushing XGBoost to actually catch fraud. Setting it near the ratio of negatives to positives (about 99 here) is the standard starting point.",
    simple:"When fraud is only 1%, guessing 'not fraud' looks accurate but is useless. Tell XGBoost the rare class matters more with scale_pos_weight -- roughly the count of normal cases per fraud case -- so it stops ignoring them.",
    widget:{ type:"curveStatic", title:"Catching the rare class", world:"Fraud caught (recall) as scale_pos_weight climbs toward the ratio.", xlab:"scale_pos_weight →", xs:[0,1,2,3,4], labels:["1","10","40","99","300"], dec:0, yunit:"%",
      series:[{ name:"fraud recall", ys:[8,38,66,84,89] }],
      knob:{ label:"Weight", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"At weight 1 the model catches almost no fraud.",tone:"info"}, {max:3,text:"Near the 99:1 ratio, recall on fraud jumps to ~84%.",tone:"info"}, {max:4,text:"🤯 Push far past the ratio and you flag too many false alarms.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"Imbalance fix", formula:"scale_pos_weight ≈ neg/pos ratio", text:"Up-weight the rare class so the model stops ignoring it." } }
  });

  q("xgb2", {
    q:"Why does XGBoost's histogram tree method (tree_method='hist') speed up training?",
    choices:[
      "It buckets feature values into a few bins so it tests far fewer split points",
      "It skips building any decision trees entirely and instead just fits one single linear model",
      "It trains using only the very first 100 rows of the dataset and ignores everything that comes after",
      "It removes all of the regularization terms from the objective in order to save computation time",
      "It caches the final round predictions and simply reuses them again during each of the later rounds"
    ],
    explain:"The exact greedy method evaluates every possible split point on every feature, which is slow on large data. The histogram method first bins each feature's values into a fixed number of buckets (say 256), then only considers splits at bucket edges. This dramatically cuts the number of candidate splits with little loss in accuracy, and it is the default for large datasets.",
    simple:"Instead of checking every single value as a possible split, the histogram method groups values into a handful of bins and only splits between bins. Far fewer things to check means much faster training.",
    widget:{ type:"curveStatic", title:"Binning cuts the work", world:"Training time as split candidates are reduced by binning.", xlab:"method →", xs:[0,1,2,3,4], labels:["exact","1024 bins","256 bins","128 bins","64 bins"], dec:0, yunit:"s",
      series:[{ name:"training time", ys:[100,42,22,14,9] }],
      knob:{ label:"Binning", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"Exact splits check every value -- slowest.",tone:"info"}, {max:3,text:"Binning into 256 buckets cuts time massively with tiny accuracy cost.",tone:"info"}, {max:4,text:"🤯 Fewer bins = faster still; 'hist' is default for big data.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"Histogram method", formula:"bin values ⇒ test far fewer splits", text:"Binning candidate splits makes training much faster." } }
  });

  q("xgb2", {
    q:"You set n_estimators = 5000 but pass a validation set with early_stopping_rounds = 50. What happens?",
    choices:[
      "Training stops early — often well before 5000 — once validation stalls for 50 rounds",
      "All of the full 5000 trees are always built every single time, regardless of the validation score",
      "The 5000 setting is completely ignored and instead exactly 50 boosting trees end up getting built",
      "It immediately raises a runtime error because these two conflicting settings simply cannot coexist",
      "Only the very first 50 trees are ever kept, while all of the remaining trees are discarded unused"
    ],
    explain:"With early stopping, n_estimators is just an upper bound. XGBoost keeps adding trees while the validation metric improves and halts once it has not improved for 50 consecutive rounds, remembering the best iteration. So you can safely set a large n_estimators and let early stopping choose the real tree count.",
    simple:"Think of 5000 as a ceiling, not a target. Early stopping quits as soon as the validation score has gone 50 rounds without improving, so you usually end up with far fewer trees -- and the best one.",
    widget:{ type:"curveStatic", title:"Cap high, stop smart", world:"Where early stopping actually halts as the round cap rises.", xlab:"n_estimators cap →", xs:[0,1,2,3,4], labels:["100","500","1000","2000","5000"], dec:0, yunit:"",
      series:[{ name:"trees actually built", ys:[100,320,340,340,340] }],
      knob:{ label:"Cap", min:0, max:4, step:1, init:4 },
      insights:[ {max:1,text:"A cap of 100 stops before validation even peaks -- too low.",tone:"info"}, {max:3,text:"Past ~1000, early stopping settles near 340 trees anyway.",tone:"info"}, {max:4,text:"🤯 Raising the cap to 5000 changes nothing -- early stopping decides.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"Cap vs early stop", formula:"n_estimators = upper bound, not target", text:"Set it high and let early stopping pick the real tree count." } }
  });

  /* =====================  xgb3 · Part III · Advanced Study  (6: 1 def + 5 q)  ===================== */

  def("xgb3", {
    q:"What is 'gain' as a feature-importance measure in XGBoost?",
    choices:[
      "The total loss reduction a feature contributes across all the splits that use it",
      "The raw number of separate times that a given feature happens to appear across any of the trees",
      "The average number of training rows that end up passing through the splits made on that feature",
      "The plain statistical correlation measured between the feature's values and the target label column",
      "The feature's fitted coefficient in an equivalent ordinary linear regression model of the same data"
    ],
    explain:"Gain measures how much each feature improved the objective, summed over every split where that feature was used. A high-gain feature is one whose splits sharply reduced the loss, making it the most meaningful default importance type in XGBoost. It differs from 'weight' (how often a feature is used) and 'cover' (how many rows its splits affect).",
    simple:"Gain asks: how much did splitting on this feature actually reduce error, added up everywhere it was used? Features that make the biggest dents in the loss get the highest gain scores.",
    widget:{ type:"curveStatic", title:"Ranking by loss reduction", world:"Gain scores for features from most to least useful.", xlab:"feature (ranked) →", xs:[0,1,2,3,4], labels:["f1","f2","f3","f4","f5"], dec:0, yunit:"",
      series:[{ name:"gain", ys:[100,62,38,15,4] }],
      knob:{ label:"Rank", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"The top feature drove the biggest loss reductions.",tone:"info"}, {max:3,text:"Gain falls off quickly -- a few features usually dominate.",tone:"info"}, {max:4,text:"🤯 Gain surfaces which features truly moved the model.",tone:"wow"} ],
      extreme:{ at:"min" },
      reveal:{ name:"Gain importance", formula:"gain = total loss drop from a feature's splits", text:"Ranks features by how much they reduced the objective." } }
  });

  q("xgb3", {
    q:"XGBoost can report importance as gain, cover, or weight. How do these differ?",
    choices:[
      "Gain = loss reduction, cover = rows affected, weight = how often the feature is used",
      "They are really just three different names for the exact same underlying count of the tree splits",
      "Gain equals the plain row count, cover equals the correlation, and weight equals the overall tree depth",
      "Gain and cover apply only to regression tasks, while weight applies only to classification tasks instead",
      "All three of these different measures always come out perfectly identical for any fully trained model"
    ],
    explain:"Weight (frequency) counts how many times a feature is used to split, cover measures the number of observations touched by those splits, and gain sums the loss improvement they produced. They can rank features quite differently: a feature used often (high weight) may still contribute little loss reduction (low gain). Gain is usually the most trustworthy for 'which features matter most.'",
    simple:"Weight just counts how often a feature is used, cover counts how many rows its splits touch, and gain measures how much error those splits removed. They can disagree, and gain is usually the one to trust for real importance.",
    widget:{ type:"curveStatic", title:"Same feature, three scores", world:"One feature's rank under each importance type.", xlab:"importance type →", xs:[0,1,2,3,4], labels:["weight","cover","gain","—","—"], dec:0, yunit:"",
      series:[{ name:"rank of feature X (1=top)", ys:[1,3,6,6,6] }],
      knob:{ label:"Type", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"By weight, feature X looks like the #1 feature (used most often).",tone:"info"}, {max:3,text:"By gain it's only 6th -- used a lot but rarely helpful.",tone:"info"}, {max:4,text:"🤯 The importance type you pick changes the story. Prefer gain.",tone:"wow"} ],
      extreme:{ at:"min" },
      reveal:{ name:"Importance types", formula:"weight ≠ cover ≠ gain", text:"Frequency, coverage, and loss reduction can rank features differently." } }
  });

  q("xgb3", {
    q:"XGBoost offers both L2 (reg_lambda) and L1 (reg_alpha) regularization on leaf weights. How do they differ?",
    choices:[
      "L2 shrinks all leaf weights smoothly; L1 can push some leaf weights exactly to zero",
      "L2 deletes whole trees from the ensemble, while L1 instead removes individual rows from the dataset",
      "L2 quietly sets the model's overall learning rate, while L1 sets the total number of trees to build",
      "L1 regularization only ever works for regression, while L2 only works for classification tasks instead",
      "They are completely identical in their effect and, moreover, only one of them can be used at any time"
    ],
    explain:"L2 regularization (lambda) penalizes the squared leaf weights, shrinking them all toward zero smoothly and stabilizing the model. L1 regularization (alpha) penalizes absolute leaf weights and can drive some to exactly zero, adding sparsity. Both discourage large leaf values that fit noise; they can be combined, and tuning them helps control overfitting.",
    simple:"Both penalize big leaf values so the model stays humble. L2 gently shrinks every leaf weight; L1 can zero some out entirely. You can use both, and they help fight overfitting.",
    widget:{ type:"curveStatic", title:"Shrinking leaf weights", world:"Average leaf-weight size as L2 (lambda) penalty grows.", xlab:"reg_lambda (L2) →", xs:[0,1,2,3,4], labels:["0","1","5","20","100"], dec:2, yunit:"",
      series:[{ name:"avg |leaf weight|", ys:[1.00,0.72,0.44,0.22,0.08] }],
      knob:{ label:"lambda", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"No penalty: leaf weights are large and can chase noise.",tone:"info"}, {max:3,text:"More L2 shrinks the weights smoothly toward zero.",tone:"info"}, {max:4,text:"🤯 L1 (alpha) goes further and can zero some out entirely.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"L1 vs L2", formula:"L2: smooth shrink · L1: sparse (some = 0)", text:"lambda and alpha penalize leaf weights to reduce overfitting." } }
  });

  q("xgb3", {
    q:"XGBoost uses second-order information (the Hessian) when fitting each tree. What is the benefit?",
    choices:[
      "Using the loss's curvature, not just its slope, gives more accurate, stable split decisions",
      "It conveniently lets the model skip computing any of the first-order gradients entirely during training",
      "It forces every single tree in the entire ensemble to be built exactly one single level deep each time",
      "It completely removes the need for the user to ever choose any objective or loss function at all for it",
      "It quietly converts the entire boosting problem into one single straightforward linear regression fit"
    ],
    explain:"Plain gradient boosting uses only first-order gradients (the slope of the loss). XGBoost also uses the second derivative (the Hessian, the curvature), giving a Newton-style step that better estimates how much a leaf's weight should change. This yields more precise split gains and leaf values, contributing to XGBoost's strong accuracy and fast convergence.",
    simple:"Instead of just knowing which way the loss slopes, XGBoost also knows how sharply it curves. That extra information lets it pick better splits and leaf values, so it learns more accurately in fewer steps.",
    widget:{ type:"curveStatic", title:"Curvature helps convergence", world:"Loss per round: second-order steps vs first-order only.", xlab:"boosting rounds →", xs:[0,1,2,3,4], labels:["0","5","15","40","100"], dec:2, yunit:"",
      series:[{ name:"XGBoost (2nd-order)", ys:[0.69,0.40,0.28,0.22,0.20] }, { name:"first-order only", ys:[0.69,0.52,0.40,0.30,0.24] }],
      knob:{ label:"Rounds", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"Both start at the same loss.",tone:"info"}, {max:3,text:"Second-order steps drive the loss down faster per round.",tone:"info"}, {max:4,text:"🤯 Using curvature, XGBoost reaches a lower loss in fewer trees.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"Second-order boosting", formula:"uses gradient AND Hessian (curvature)", text:"Newton-style steps give sharper splits and faster convergence." } }
  });

  q("xgb3", {
    q:"You must control overfitting on a noisy dataset. Which combined strategy is soundest?",
    choices:[
      "Lower eta with early stopping, modest max_depth, plus subsample/colsample and some lambda/gamma",
      "Max out max_depth to its highest ceiling, set eta all the way up to 1.0, and use no subsampling for maximum fit",
      "Use just one single decision tree grown out to unlimited depth with absolutely no regularization applied at all",
      "Only raise n_estimators to a full 100000 trees and deliberately change nothing else at all about the model",
      "Disable the held-out validation set completely so that the model simply gets to train on all of the data"
    ],
    explain:"No single knob controls overfitting; the reliable approach combines several. A small learning rate with early stopping finds a good tree count, a modest max_depth caps single-tree complexity, row and column subsampling decorrelate trees, and lambda/gamma penalize complexity. Tuning these together on a validation set gives robust generalization on noisy data.",
    simple:"Fighting overfitting works best with several gentle knobs at once: small learning rate plus early stopping, shallow-ish trees, sampling rows and columns, and a bit of regularization. Cranking one setting to the extreme just trades one problem for another.",
    widget:{ type:"curveStatic", title:"Layering the defenses", world:"Validation error as you stack overfitting controls one by one.", xlab:"controls applied →", xs:[0,1,2,3,4], labels:["none","+low eta","+shallow","+subsample","+reg"], dec:0, yunit:"%",
      series:[{ name:"validation error", ys:[22,18,15,12,10] }],
      knob:{ label:"Controls", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"With no controls the noisy data is badly overfit.",tone:"info"}, {max:3,text:"Each added control chips away at validation error.",tone:"info"}, {max:4,text:"🤯 Combined, the knobs generalize far better than any one alone.",tone:"wow"} ],
      extreme:{ at:"max" },
      reveal:{ name:"Overfitting toolkit", formula:"eta + depth + subsample + reg + early stop", text:"Combine several mild controls rather than maxing one." } }
  });

  q("xgb3", {
    q:"A stakeholder points out feature 'customer_id' has the highest 'weight' importance in your XGBoost model. Why be cautious?",
    choices:[
      "High weight only means it was split on often; a near-unique ID can overfit yet add little real gain",
      "Weight importance is essentially always the single most reliable of all the measures, so no caution is needed here",
      "It clearly proves that customer_id is genuinely the very best and strongest predictor of the target variable overall",
      "Weight-based importance can only ever be computed at all for models that happen to predict a purely numeric target",
      "It plainly means that customer_id should be immediately and permanently dropped from every single model you ever build"
    ],
    explain:"Weight (frequency) just counts how often a feature is used for splitting. A high-cardinality identifier like customer_id offers many split points, so it gets used a lot even when each split memorizes individual rows rather than learning a general pattern. Checking gain (loss reduction) and using permutation or SHAP importance gives a more honest picture, and such leakage-prone IDs often should be excluded.",
    simple:"A near-unique ID gives the tree tons of places to split, so it racks up a high 'weight' count without truly helping. Look at gain instead, and be wary that IDs can leak or just memorize rows.",
    widget:{ type:"curveStatic", title:"Used often ≠ useful", world:"customer_id's importance under weight vs gain vs honest SHAP.", xlab:"importance method →", xs:[0,1,2,3,4], labels:["weight","cover","gain","SHAP","—"], dec:0, yunit:"",
      series:[{ name:"customer_id importance", ys:[100,40,12,5,5] }],
      knob:{ label:"Method", min:0, max:4, step:1, init:0 },
      insights:[ {max:1,text:"By weight, customer_id looks like the star feature.",tone:"info"}, {max:3,text:"By gain and SHAP it barely helps -- the weight was misleading.",tone:"info"}, {max:4,text:"🤯 High-cardinality IDs inflate weight importance and often leak.",tone:"wow"} ],
      extreme:{ at:"min" },
      reveal:{ name:"Importance caution", formula:"high weight ≠ high gain", text:"Frequent splits can mean overfitting, not real predictive value." } }
  });

}());
