/* Why-wrong notes: Machine Learning Foundations (found). Keyed by exact question stem; one entry per distractor, same order as choices[1..]. */
(function () {
  var W = (window.WHYNOT = window.WHYNOT || {});
  W["Traditional software follows rules a human wrote out by hand. What is fundamentally different about how a machine-learning system arrives at its rules?"] = [
    "Running fixed logic faster is still traditional programming — the rules were written by a human; speed changes nothing about where they came from.",
    "That's memorisation, and it fails on new inputs that match nothing stored; ML instead extracts a general pattern from the examples.",
    "ML needs no human sign-off on each rule; the training procedure derives the rules from labelled data entirely on its own.",
    "Learning is steered by measured error on data, not by random rule generation filtered through a human reviewer's approval."
  ];
  W["A colleague says: 'I ran a decision-tree algorithm on our data and it gave me a model.' In plain terms, what is the difference between the algorithm and the model?"] = [
    "It's exactly backwards: the algorithm exists before any data arrives, and the model is the trained result that comes out afterwards.",
    "They're distinct things: one algorithm run on different datasets produces different models, so they can't be two names for one object.",
    "The dataset is the algorithm's input, not the algorithm itself; and a model is a learned function, not cleaned-up data.",
    "Metrics and charts evaluate results after the fact; the algorithm is the learning recipe and the model its learned output."
  ];
  W["A spam filter is 'right 95% of the time', yet users are furious that real emails keep landing in the spam folder. Which pair of measures exposes the problem that a single accuracy number hides?"] = [
    "The train-test loss gap diagnoses overfitting, not which KIND of mistake — false spam flags versus missed spam — the filter is making.",
    "Speed and memory are engineering costs; they say nothing about whether real emails are being wrongly dumped in the spam folder.",
    "Bias and variance describe model rigidity versus instability, not the split between false alarms and missed spam that users feel.",
    "Learning rate and tree depth are hyperparameters set before training, not measures of a finished filter's mistakes."
  ];
  W["Before any model exists, you're handed a spreadsheet of past customer visits. In machine-learning language, what is this 'dataset', concretely?"] = [
    "A dataset is structured — rows as cases, columns as facts — not one unstructured text file read from start to finish.",
    "That confuses the dataset with a model's stored output; the dataset is recorded history that exists before any model does.",
    "A feature ranking is a product of later analysis; the dataset itself is the raw table of cases it would be computed from.",
    "Live predictions are what a deployed model emits later; the dataset is the record of past cases used before any model exists."
  ];
  W["Your spam dataset has one line for each email you've ever received. What is a single one of those lines called in machine learning, and what does it represent?"] = [
    "A feature is one column — a single fact measured across all cases — not the whole line recording one email.",
    "The label is just the answer cell (spam or not), one part of the line, not the entire recorded case.",
    "Parameters live inside the model and get adjusted by training; they aren't lines of the dataset at all.",
    "A batch is a group of several rows fed through together during training, not a single line of the table."
  ];
  W["People say the computer 'builds a model' from the data. Stripped of the mystique, what IS a model?"] = [
    "Keeping the whole table is memorisation; a model is the learned function distilled FROM the data, not the data itself.",
    "Settings picked before training are hyperparameters; the model is what training produces, not the knobs that steered it.",
    "The measure of wrongness is the loss function — it guides training but is not the input-to-prediction recipe itself.",
    "The held-out block is the test set, used to grade the model; it's data, not the learned function being graded."
  ];
  W["You feed a brand-NEW house's features into a trained model and it hands back a number. What is that step, and its output, called?"] = [
    "Training is the earlier phase where labelled examples adjust the internal numbers; here the finished model is used, not changed.",
    "Generalisation is the model's ABILITY to do well on new cases — a property, not the name of the act of producing one output.",
    "Validation scores the model on held-out rows whose labels you know; here the label is unknown and the guess itself is the goal.",
    "Labelling attaches known answers to past data before training; here no answer exists yet — the model is supplying it."
  ];
  W["A house-price dataset has columns: square footage, bedrooms, age, location score — and sold price. You want to predict prices for NEW houses. Which column plays a different role from the others, and why?"] = [
    "A location score is knowable for a new listing, so it's an input feature; being a human judgement doesn't make it the target.",
    "Data type doesn't decide the role: a whole-number count is still a feature you'd know for a new house.",
    "Being the strongest input doesn't change its role — square footage is still a feature, one clue among the others.",
    "Age at listing time is perfectly knowable, so it works fine as a feature; changing later doesn't disqualify it."
  ];
  W["Five projects land on your desk: a spam filter (with flagged examples), house-price prediction (with sold prices), customer grouping (no groups given), fraud detection via 'weirdness' (no fraud labels), and topic discovery in documents. What cleanly separates them into two camps?"] = [
    "Whether a human reviews the output doesn't define the camps; the ML divide is whether labelled answers exist to train on.",
    "Price prediction sits with spam in the labelled camp, so prediction-versus-description slices these projects the wrong way.",
    "How the data arrives is a plumbing detail; supervised versus unsupervised is about whether labels come attached.",
    "Category-versus-number splits classification from regression WITHIN supervised learning; it can't sort out the label-free projects."
  ];
  W["Both are supervised: 'will this customer churn — yes or no?' and 'how much will this customer spend next year — in pounds?'. What's the technical distinction, and why does it matter?"] = [
    "Churn yes/no is a category — a probability may appear internally, but the task's answer type is a class, so output range isn't the divide.",
    "Neither task asks for an ordering of customers; churn is classification and spend is regression, not ranking versus scoring.",
    "You can't reduce both to one regression plus post-processing — the two use different losses, outputs and evaluation metrics.",
    "Both questions produce one answer per customer; the divide is the KIND of answer (category versus number), not how many."
  ];
  W["Everyone says a model is 'trained'. Concretely — mechanically — what is happening during training?"] = [
    "Keeping examples for later comparison describes instance-based methods' storage, not training in general, which adjusts numbers to cut error.",
    "Dropping weak columns is feature selection, a separate preprocessing step — not what fitting does to a model's parameters.",
    "Batching and shuffling are just how data is fed in; the actual training is the parameter nudging those batches drive.",
    "A one-shot algebraic solve exists only for special cases like linear regression; training in general is an iterative error-shrinking loop."
  ];
  W["Your colleague trains a model and proudly reports 99% accuracy — measured on the same rows the model trained on. Why must some data be locked away BEFORE training, and the score taken there instead?"] = [
    "Models don't specially overfit the last rows they read; ANY row the model saw measures memory, not skill, wherever it appeared.",
    "Accuracy is a fraction, so re-scoring seen rows doesn't inflate sample size; the problem is that those rows shaped the model.",
    "Using held-out rows to tune weights would contaminate them — they exist precisely to stay out of all fitting.",
    "No averaging happens: the held-out score alone is the estimate, because only unseen rows preview future performance."
  ];
  W["Two failure modes bracket every model: one is too simple to capture the pattern, the other so flexible it 'learns' the noise. What are these called, and where does the best model sit?"] = [
    "A tiny train-test gap can just mean equally poor everywhere (underfitting); you want the highest held-out score, not the smallest gap.",
    "The named failure modes are underfitting and overfitting, and zero bias isn't the target — some rigidity is often worth its stability.",
    "The training score keeps rising with flexibility even as real performance falls, so maximising it points straight at overfitting.",
    "Maximum flexibility invites overfitting; the best model balances rigidity and flexibility, judged on held-out data, not hardware budget."
  ];
  W["In a decision tree, max_depth is set by YOU before training, while the split questions are found DURING training. What is this distinction called, and why does it matter for your workflow?"] = [
    "Priors and posteriors are Bayesian beliefs about the same quantities updated by evidence; max_depth never gets 'updated into' split rules.",
    "Training cannot adjust max_depth — it is fixed before fitting begins, which is exactly what makes it a hyperparameter.",
    "Grid search is something YOU run around training; the fitting procedure itself never searches your settings across folds.",
    "Scope isn't the distinction — what matters is who sets each value: you before training, or the fitting procedure during it."
  ];
  W["A lookup-table 'model' answers new cases by finding an identical past case and copying its answer. It scores 100% on training data. Why does it collapse in the real world, and what must a real model do instead?"] = [
    "Storage isn't the failure: even a table holding everything fails because new cases match nothing stored, and compression keeps that flaw.",
    "Search speed isn't the problem; the fastest lookup still finds no identical past case for a genuinely new input.",
    "Retraining on fresh rows still only memorises the past; the table would still miss cases it has never recorded.",
    "Blending nearest neighbours is one specific algorithm (kNN), not the core requirement — the essential feat is learning the rule itself."
  ];
  W["A dataset records age (18–70) and salary (£15,000–£150,000). Many algorithms compare examples by DISTANCE or combine features into weighted sums. What silently goes wrong with raw units, and what's the standard fix?"] = [
    "Small values don't round away in floating point; the real issue is salary's range dominating, and hand-multiplying features just guesses at scales.",
    "Nothing says age and salary are redundant; the failure is unit scale swamping the distance, not duplicated information.",
    "Age can't be expressed in pounds — the fix is statistical scaling (zero mean, unit variance), not a shared physical unit.",
    "No arithmetic overflow occurs; capping distorts genuine salary values, while standardising rescales every feature fairly."
  ];
  W["A fraud model scores 97.8% accuracy and the team celebrates — until someone computes the dumbest possible rule. On data where 2% of transactions are fraud, what does 'always predict NOT fraud' score, and what's the lesson?"] = [
    "'Always not fraud' is right on the 98% legitimate majority, so it scores 98% — not the 2% fraud rate.",
    "98% BEATS the model's 97.8%, and the lesson is that accuracy misleads on imbalanced data, not that it's a fair yardstick here.",
    "It scores exactly the majority share — 98%, above the model; do-nothing rules can genuinely beat 'real' models on skewed data.",
    "It is wrong on every actual fraud case, the 2%, so it can score at most 98%, never 100%."
  ];
  W["Statisticians decompose a model's error into two dueling sources. One comes from being systematically too simple; the other from swinging wildly with whichever training sample you happened to draw. Name them — and the trade they force."] = [
    "More data shrinks variance but leaves bias untouched — a too-rigid model stays wrong on average however many rows you feed it.",
    "Bias comes from model rigidity, not bad labels, and variance from sample-to-sample instability; data cleaning removes neither.",
    "They are not independent — flexibility that cuts bias raises variance, so you cannot drive both to zero at once.",
    "Bias isn't a uniform offset you subtract away; it's systematic mis-fit from rigidity, traded against variance rather than removed first."
  ];
  W["A model says '75% probability of churn'. Your product manager asks: 'so what are the odds?'. These two languages for uncertainty appear all over ML — how do they interconvert?"] = [
    "The denominator must be the probability of NOT churning, 1 − p; dividing by 1 + p has no probabilistic meaning.",
    "2p − 1 rescales probability onto a −1 to 1 range; odds are the ratio of event to non-event probability, giving 3 here.",
    "1/p is the expected number of trials per event, not odds; p/(1 − p) gives 3, not 1.33.",
    "75% is already the probability 0.75 — relabelling it isn't the ratio p/(1 − p) that defines odds."
  ];
  W["In machine learning, what is supervised learning?"] = [
    "Finding structure in unlabelled data is unsupervised learning; supervised learning requires each example to carry its correct answer.",
    "Learning from rewards and penalties while acting is reinforcement learning, not learning from labelled examples.",
    "Compressing to fewer columns is dimensionality reduction, an unsupervised technique, not learning an input-output mapping.",
    "Hand-writing if-then rules is traditional programming — nothing is learned from data at all."
  ];
  W["In machine learning, what is unsupervised learning?"] = [
    "Learning from examples with correct labels attached is supervised learning; unsupervised data has no answer column.",
    "Learning from rewards while taking actions is reinforcement learning, not pattern-finding in static unlabelled data.",
    "Tuning pre-training settings is hyperparameter tuning, a workflow step in any project, not a category of learning.",
    "Scoring a model on a held-back test set is evaluation; it grades a model rather than discovering unlabelled structure."
  ];
  W["In machine learning, what is a hyperparameter?"] = [
    "A weight the training algorithm adjusts is a parameter; hyperparameters are chosen by you before fitting begins.",
    "A column of the input data is a feature, not a setting that controls how learning proceeds.",
    "Final accuracy is an evaluation result measured after training, not a configuration chosen beforehand.",
    "A dataset row is an example the model learns from, not a knob controlling the learning process."
  ];
  W["In machine learning, what is a loss function?"] = [
    "The procedure that nudges weights downhill is the optimiser (e.g. gradient descent); the loss is the number it minimises, not the procedure.",
    "A setting fixed before training is a hyperparameter; the loss is a measurement of prediction error, not a configuration knob.",
    "The fraction of exactly-correct predictions is accuracy, an evaluation metric — not the training-time error signal being minimised.",
    "A table of predicted versus actual classes is a confusion matrix, an evaluation summary, not a single number to minimise."
  ];
  W["In machine learning, what is gradient descent?"] = [
    "Measuring how far predictions sit from the truth is the loss function; gradient descent is the method that uses its slope to update weights.",
    "Splitting data into train and test portions is a data-preparation step, not an optimisation method.",
    "A penalty keeping weights small is regularisation — something added to the loss, not the update procedure itself.",
    "Combining weak models by averaging votes is ensembling, not an iterative weight-update method."
  ];
  W["In machine learning, what is reinforcement learning?"] = [
    "Learning a mapping from labelled examples is supervised learning; reinforcement learning has no answer key, only rewards.",
    "Grouping unlabelled data into clusters is unsupervised learning, not trial-and-error learning from rewards.",
    "Reducing features while keeping information is dimensionality reduction, a data technique, not reward-driven learning.",
    "Copying a large model's predictions into a small one is distillation, a compression trick, not an agent learning from rewards."
  ];
  W["In machine learning, what is classification?"] = [
    "Predicting a continuous numeric value is regression, the other supervised task, not classification.",
    "Splitting unlabelled data into clusters is clustering, which is unsupervised; classification learns from labelled categories.",
    "Shrinking many features into a few components is dimensionality reduction, not predicting a class per input.",
    "How fast weights update is the learning rate, a training hyperparameter, not a task type."
  ];
  W["In machine learning, what is regression?"] = [
    "Predicting a discrete class label is classification, the other supervised task, not regression.",
    "Memorising training data is overfitting, a failure mode — not a task definition.",
    "Grouping points into clusters is unsupervised clustering, not predicting a numeric value.",
    "Encoding categories as binary columns is one-hot encoding, a preprocessing step, not a prediction task."
  ];
  W["In machine learning, what is a feature?"] = [
    "The known correct answer is the label (target); features are the inputs used to predict it.",
    "The final prediction is the model's output; a feature is an input variable, on the other side of the mapping.",
    "A row is a whole example — one complete case; a feature is a single column-wise input variable.",
    "Splitting into train and test sets is a workflow step, not an input variable describing examples."
  ];
  W["In machine learning, what is the label (or target)?"] = [
    "An input variable describing the example is a feature; the label is the output being learned.",
    "The learning rate is a hyperparameter controlling weight updates, unrelated to the answer attached to an example.",
    "Data held back to measure performance is the test set; the label is the answer column attached to each example.",
    "The number of passes over the data is the epoch count, a training setting, not the target value."
  ];
  W["In machine learning, what is the training set?"] = [
    "Data held back to estimate unseen performance is the test set; the training set is what the model fits on.",
    "A sample used to tune hyperparameters is the validation set; the training set fits the parameters themselves.",
    "The list of features describes columns, not a data split; the training set is a subset of rows.",
    "The model's final answer per example is a prediction, its output — not a portion of the data."
  ];
  W["In machine learning, what is the test set?"] = [
    "Data the model fits its parameters to is the training set; the test set must stay unseen during learning.",
    "A sample used to choose hyperparameters is the validation set; touching the test set during development spoils its honesty.",
    "Input variables describing examples are the features (columns); the test set is a held-back subset of rows.",
    "The rate of weight adjustment is the learning rate, a hyperparameter, not a data split."
  ];
  W["In machine learning, what is overfitting?"] = [
    "Being too simple to capture the pattern is underfitting — the opposite failure to fitting noise too closely.",
    "Relative split sizes don't define overfitting; it's about memorising training noise and failing on new data.",
    "Features on different scales is a preprocessing problem, separate from a model fitting noise.",
    "Wrong labels are label noise, a data-quality problem; overfitting is the model's behaviour, not the labels'."
  ];
  W["In machine learning, what is underfitting?"] = [
    "Memorising noise and failing on new data is overfitting; underfitting is being too simple to fit even the training data.",
    "Using the test set during training is data leakage, a methodology error, not a too-simple model.",
    "Turning categorical features into binary columns is one-hot encoding — ordinary preprocessing, not a failure mode.",
    "A too-high learning rate is an optimisation problem; underfitting names a model too simple for the pattern, hurting train and test alike."
  ];
  W["In machine learning, what is generalization?"] = [
    "Fitting parameters to the training data is training itself; generalisation is how well the result carries to unseen data.",
    "Encoding categorical features as numbers is preprocessing, not a property of performance on new data.",
    "Memorising the training examples is the opposite tendency — overfitting — not generalisation.",
    "Scaling features to a common range is a preprocessing step, not the ability to handle unseen cases."
  ];
  W["In machine learning, what is the learning rate?"] = [
    "The fraction of data set aside for testing is the test-split size, a data decision, not a step-size control.",
    "The number of complete passes over the data is the epoch count; the learning rate sets how big each update step is.",
    "The known correct output is the label, part of the data, not a training setting.",
    "The share of correct predictions is accuracy, an evaluation metric, not a knob controlling update size."
  ];
  W["In machine learning, what is one-hot encoding?"] = [
    "Scaling to zero mean and unit variance is standardisation of numeric features, not encoding of categories.",
    "Filling blanks with the column average is imputation, a missing-value fix, not categorical encoding.",
    "Reducing features to a few components is PCA (dimensionality reduction), not turning categories into indicator columns.",
    "Splitting into training and test portions is a workflow step, not a feature-encoding method."
  ];
  W["A pipeline computes the scaling statistics (means, standard deviations) on the FULL dataset, then splits into train and test. The test score comes out suspiciously good. What crime was committed?"] = [
    "Overfitting comes from model flexibility during fitting; here the flaw is preprocessing that consulted the test rows before the split.",
    "The split's luck isn't the issue — the scaler's means and deviations were computed using test rows, letting them influence training.",
    "Nothing was scaled twice; the crime is computing scaling statistics on data that later poses as 'unseen' test data.",
    "No answer-encoding column slipped into the features; the leak is test-row statistics seeping into preprocessing — a different leak entirely."
  ];
  W["Your churn model trains on data where only 3% of customers churned. It quickly learns to predict 'stays' for everyone and looks accurate. What is going on, and what are the standard countermeasures?"] = [
    "More depth and iterations don't help — the model already 'wins' by ignoring the 3% minority; the data balance, not capacity, is the problem.",
    "Nothing suggests the churn flags are wrong; churn is just rare, so the majority class dominates what training optimises.",
    "The features aren't the diagnosis — predicting 'stays' for everyone is the classic signature of class imbalance, whatever the columns.",
    "Moving the cutoff alone can't fix training that barely learned the churners; the root cause is the minority's tiny influence on the loss."
  ];
  W["A model finds that customers who buy ice cream churn less, so marketing proposes sending everyone free ice cream. What's the flaw in that leap?"] = [
    "Reverse causation is only one possible story — the model's finding can't establish ANY causal arrow, so this over-claims in the other direction.",
    "Nothing indicates a skewed sample was analysed; the flaw is treating an observed association as a lever you can pull.",
    "No subgroup reversal was shown; the leap fails simply because association doesn't mean the intervention will work.",
    "The pattern may be perfectly stable on new data and still not causal — mistaking correlation for cause is the flaw, not memorisation."
  ];
  W["Your model disappoints. One camp says 'we need more data'; another says 'we need a better model'. Which single plot settles the argument before anyone spends money?"] = [
    "The validation curve varies model complexity on fixed data, so it can't show whether MORE DATA would raise the score.",
    "ROC curves describe a classifier's threshold trade-offs; they say nothing about data quantity versus model choice.",
    "Residual plots diagnose error patterns against predictions, not whether performance is limited by data volume.",
    "Loss versus epoch tracks optimisation on a fixed dataset; it doesn't reveal how the score changes as the dataset grows."
  ];
  W["A quarter of your 'age' column is missing. A teammate deletes every incomplete row; another fills the blanks with the column's median and moves on. What's the mature view of these options?"] = [
    "There is no safe 5% rule — deleting a quarter of the rows both burns data and biases the sample whenever missingness isn't random.",
    "Computing the fill value on the full dataset leaks test information into training; the statistic must come from the training split alone.",
    "A was-missing indicator doesn't leak the target — missingness is often genuinely predictive and worth exposing to the model.",
    "Missingness is frequently informative rather than random noise, so discarding the indicator throws away real signal."
  ];
  W["Team A spends the sprint swapping algorithms: forest → boosting → neural net, gaining 0.4 points. Team B keeps logistic regression but crafts features: 'orders per month', 'days since last login', 'spend trend'. B gains 4 points. What general truth did B exploit?"] = [
    "B used a single logistic regression with no stacking; the gain came from better input features, not from more learners.",
    "Simplicity wasn't the lever — B won because its crafted features made real information reachable, not because it overfit less.",
    "B didn't tune penalties; it created new informative columns, which is feature engineering, not hyperparameter tuning.",
    "Ratios like 'orders per month' are legitimate derived inputs, not the answer in disguise; good features aren't automatically leakage."
  ];
  W["Adding features feels like it should always help — more information! Yet in high dimensions, distance-based reasoning quietly breaks. What is the 'curse of dimensionality' actually doing to your data?"] = [
    "Extra dimensions need not be correlated; the curse is that distances concentrate and space empties, so 'nearest' itself degrades.",
    "It's a geometric effect, not a precision one — higher-precision arithmetic cannot make nearly-equal distances meaningful again.",
    "The curse hits even parameter-free methods like kNN; the problem is the geometry of sparse, near-equidistant points, not parameter count.",
    "Even when every axis is useful, high-dimensional volume explodes and points spread thin; scaling cannot refill an almost-empty space."
  ];
  W["A colleague insists gradient boosting is simply 'the best algorithm' and should be used everywhere. What does the No-Free-Lunch theorem — and practical experience — say about universal best models?"] = [
    "Algorithms don't converge to equal accuracy on a given problem as data grows; their differing assumptions keep mattering at any size.",
    "Tuning can't give an algorithm assumptions it lacks — a linear model stays linear however hard you grid-search it.",
    "Ensembles often help but not always, and No-Free-Lunch is not a pro-stacking claim; it says no method wins across all problems.",
    "On simply-structured problems flexible models can lose to plainer ones; boosting is not best even on all 'hard' data."
  ];
  W["Two models tie at 87% validation accuracy: a 4-feature logistic regression and a 30-model stacked ensemble. Beyond the score, what does the principle of parsimony (Occam's razor) say about which to ship — and why?"] = [
    "A razor-thin validation lead is mostly noise, and shipping on it ignores the running, debugging and maintenance costs parsimony weighs.",
    "Unused capacity isn't future skill; at equal scores the complex model just costs more and has more ways to break.",
    "Parsimony is about operational simplicity — cost, debuggability, robustness — not only about which model overfits less.",
    "Averaging both doubles the operational burden for no demonstrated gain — the opposite of picking the simplest adequate model."
  ];
  W["A credit model shipped in 2023 with 91% validation accuracy quietly decays to 78% by 2026 — with no code changes at all. What happened, and what's the standing defence?"] = [
    "Overfitting shows up immediately on unseen data, not as slow decay years later; a drifting world is what erodes scores over time.",
    "A leaky feature would have inflated the original validation score, not caused a gradual decline across the years.",
    "Feedback loops are one special case, and freezing the model is the opposite of a defence — it guarantees growing staleness.",
    "Serving hardware doesn't accumulate rounding drift in stored weights; the inputs changed, not the arithmetic."
  ];
  W["Two customers have IDENTICAL features; one churned, one stayed. However good your model gets, cases like these guarantee errors. What is this floor called, and why does chasing scores below it backfire?"] = [
    "Identical inputs with different outcomes can't be separated by ANY model, so extra depth only lets it fit noise.",
    "This noise floor doesn't shrink with more rows — more data just confirms an ambiguity the features cannot resolve.",
    "The rows aren't mislabelled; the two customers genuinely differed in ways the features never captured.",
    "A bigger sample reduces estimation error but leaves this floor intact — the features simply lack the deciding information."
  ];
  W["Order these correctly for an honest project: (a) touch the test set, (b) establish a baseline, (c) split the data, (d) iterate models/features on validation, (e) monitor in production. What is the canonical sequence — and the one unbreakable rule inside it?"] = [
    "The split must come first: a baseline computed before splitting would use rows destined for the test set, contaminating the final check.",
    "Checking the test set early and tuning toward it quietly turns it into a validation set, spoiling the final honest estimate.",
    "The baseline belongs before iteration — it's the bar that tells you whether any of the tuning is achieving anything real.",
    "Reading the test set first destroys its purpose entirely; any peek lets its cases shape your choices and bias the final score."
  ];
})();
