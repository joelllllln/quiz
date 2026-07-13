/* Feature Engineering — answer-breakdown ladders (ground-up). */
window.STEPS = window.STEPS || {};

/* ===== feng1 — Part I · Foundations ===== */

window.STEPS["What is feature engineering?"] = [
  { "q": "What is a model fed to learn from?", "ok": "Input columns describing each example", "no": ["Only the final answer", "Nothing at all"] },
  { "q": "Does raw data usually arrive ready for a model?", "ok": "No — it often needs cleaning and reshaping", "no": ["Yes, always perfect", "Only if it is a picture"] },
  { "q": "What do we call reshaping raw data into good inputs?", "ok": "Working on the features", "no": ["Picking the algorithm", "Buying more servers"] },
  { "q": "When does this work happen?", "ok": "Before training, to prepare the inputs", "no": ["After the model is deployed", "Only during prediction"] },
  { "q": "So what is feature engineering?", "ok": "Transforming raw data into input columns (features) that help a model learn better", "no": ["Choosing which ML algorithm to train", "Tuning hyperparameters like the learning rate"] }
];

window.STEPS["In machine learning, what is a 'feature'?"] = [
  { "q": "Picture a spreadsheet of data. What is a row?", "ok": "One example", "no": ["One column", "The whole table"] },
  { "q": "What is a column in that table?", "ok": "One property measured for every example", "no": ["A single example", "The model's guess"] },
  { "q": "Is age (a column) an input or an output?", "ok": "An input the model reads", "no": ["The output it predicts", "The training algorithm"] },
  { "q": "So what is a 'feature'?", "ok": "A single measurable input column the model reads, like age or price", "no": ["The final prediction the model outputs", "The error between prediction and truth"] }
];

window.STEPS["What does one-hot encoding do to a categorical column like Color (red / green / blue)?"] = [
  { "q": "Can a model do math on the word 'red' directly?", "ok": "No — it needs numbers", "no": ["Yes, words are fine", "Only if red is capitalized"] },
  { "q": "If we number red=0, green=1, blue=2, what problem appears?", "ok": "It invents a fake order (blue > red)", "no": ["It uses too much memory", "Nothing, it's perfect"] },
  { "q": "How can we mark a category without ordering it?", "ok": "Give each category its own on/off column", "no": ["Sort them alphabetically", "Delete the column"] },
  { "q": "For a red row, which columns are 1?", "ok": "Only the 'red' column; others are 0", "no": ["All three columns", "None of them"] },
  { "q": "So what does one-hot encoding do?", "ok": "Creates one new 0/1 column per category, with a 1 marking the row's category", "no": ["Replaces each category with a single integer code", "Scales the column to mean 0 and std 1"] }
];

window.STEPS["What is ordinal encoding?"] = [
  { "q": "Do sizes S, M, L have a natural order?", "ok": "Yes — small is less than large", "no": ["No, they're random", "Only sometimes"] },
  { "q": "If order is real, can numbers reflect it?", "ok": "Yes — bigger number = bigger size", "no": ["No, numbers can't show order", "Only with one-hot"] },
  { "q": "What integers fit S < M < L?", "ok": "0, 1, 2 in rank order", "no": ["Random integers", "All zeros"] },
  { "q": "So what is ordinal encoding?", "ok": "Replacing ordered categories with integers that reflect their rank (small=0, medium=1, large=2)", "no": ["Creating a separate 0/1 column for every category", "Rescaling numbers to the range 0 to 1"] }
];

window.STEPS["What is feature scaling?"] = [
  { "q": "Income runs to 100,000 and age to 100. Are their ranges similar?", "ok": "No — income's range is far bigger", "no": ["Yes, identical", "Age is bigger"] },
  { "q": "For distance-based models, what does a huge-range feature do?", "ok": "It dominates and drowns out small ones", "no": ["It gets ignored", "It has no effect"] },
  { "q": "What would fix that imbalance?", "ok": "Put features on a comparable range", "no": ["Delete the small feature", "Add more rows"] },
  { "q": "Does rescaling change the information in a feature?", "ok": "No — only its numeric scale", "no": ["Yes, it erases the data", "It flips the values"] },
  { "q": "So what is feature scaling?", "ok": "Putting numeric features onto a comparable range so no single one dominates by sheer size", "no": ["Selecting which features to keep and delete", "Turning categories into 0/1 columns"] }
];

window.STEPS["What is standardization (z-score scaling) of a feature?"] = [
  { "q": "To center a column on zero, what do you subtract?", "ok": "The mean", "no": ["The maximum", "Zero"] },
  { "q": "After subtracting the mean, what is the new average?", "ok": "0", "no": ["1", "The old mean"] },
  { "q": "To make the spread equal 1, what do you divide by?", "ok": "The standard deviation", "no": ["The range", "The mean"] },
  { "q": "A standardized value of +2 means what?", "ok": "Two standard deviations above average", "no": ["The number 2 exactly", "200%"] },
  { "q": "So what is standardization?", "ok": "Subtracting the mean and dividing by the standard deviation, so it has mean 0 and spread 1", "no": ["Squeezing the values into the fixed range 0 to 1", "Replacing the values with their rank order"] }
];

window.STEPS["What is min-max normalization?"] = [
  { "q": "We want a feature bounded between two fixed numbers. Which pair is common?", "ok": "0 and 1", "no": ["-100 and 100", "1 and 10"] },
  { "q": "Which raw value should map to 0?", "ok": "The smallest value", "no": ["The largest value", "The average"] },
  { "q": "Which raw value should map to 1?", "ok": "The largest value", "no": ["The smallest value", "The median"] },
  { "q": "One extreme outlier can do what to this scaling?", "ok": "Stretch the range and squash everything else", "no": ["Have no effect", "Center the data"] },
  { "q": "So what is min-max normalization?", "ok": "Rescaling a feature so its smallest value becomes 0 and its largest becomes 1", "no": ["Subtracting the mean and dividing by the standard deviation", "Replacing each value with its logarithm"] }
];

window.STEPS["What is imputation?"] = [
  { "q": "A cell is blank. What's one crude option?", "ok": "Throw away the whole row", "no": ["Retrain from scratch", "Ignore the dataset"] },
  { "q": "What's the downside of dropping rows?", "ok": "You lose otherwise-good data", "no": ["Nothing, it's free", "It adds fake rows"] },
  { "q": "What sensible stand-in could fill a numeric blank?", "ok": "The column's mean or median", "no": ["A giant random number", "The row number"] },
  { "q": "So what is imputation?", "ok": "Filling in missing values with a substitute such as the column's mean or median", "no": ["Deleting every column that contains any blank", "Scaling features to the range 0 to 1"] }
];

window.STEPS["A k-nearest-neighbours model uses income (0–100,000) and age (0–100) with no scaling. Why do its distances become almost meaningless?"] = [
  { "q": "How does kNN decide who is 'near'?", "ok": "By summing differences across features", "no": ["By category counts", "By alphabetical order"] },
  { "q": "Income differs by thousands, age by tens. Which difference is bigger?", "ok": "The income difference, by far", "no": ["The age difference", "They're equal"] },
  { "q": "So which feature controls the distance?", "ok": "Income — age barely registers", "no": ["Age — income is ignored", "Neither counts"] },
  { "q": "Then 'nearest neighbour' really means what?", "ok": "Similar income, regardless of age", "no": ["Similar age only", "A random point"] },
  { "q": "So why do the distances become meaningless?", "ok": "Income's huge range dominates the distance, so age barely counts", "no": ["kNN cannot read numbers without one-hot encoding", "Age and income are correlated, breaking distance"] }
];

window.STEPS["You switch from kNN to a decision tree / random forest. Do you still need to scale income and age first?"] = [
  { "q": "How does a tree use a feature?", "ok": "It asks 'is feature > threshold?'", "no": ["It measures straight-line distance", "It sums all features"] },
  { "q": "Does a tree look at one feature or many at each split?", "ok": "One feature at a time", "no": ["All at once as a distance", "None"] },
  { "q": "If you rescale a feature, what happens to the split point?", "ok": "The threshold just moves to match", "no": ["The tree breaks", "Predictions change"] },
  { "q": "So do the tree's decisions change after scaling?", "ok": "No — same splits, same results", "no": ["Yes, completely", "Only for age"] },
  { "q": "So do you need to scale for a tree?", "ok": "No — trees split one feature at a time by thresholds, so feature scale does not matter", "no": ["Yes — trees also measure straight-line distances", "Yes — trees fail unless features are 0 to 1"] }
];

window.STEPS["House prices are heavily right-skewed: most are cheap, a few are enormous. Which transform usually makes the distribution more symmetric and easier to model?"] = [
  { "q": "'Right-skewed' means the tail is on which side?", "ok": "The high (large-value) side", "no": ["The low side", "There is no tail"] },
  { "q": "We want a transform that shrinks big values more than small ones. Does multiplying by 1000 do that?", "ok": "No — it scales everything equally", "no": ["Yes, perfectly", "It shrinks small ones"] },
  { "q": "What math function compresses large numbers strongly?", "ok": "The logarithm", "no": ["Squaring", "Rounding"] },
  { "q": "After logging, what happens to the skew?", "ok": "The long tail pulls in toward symmetry", "no": ["It gets more skewed", "It disappears entirely"] },
  { "q": "So which transform helps?", "ok": "Take the logarithm of price", "no": ["Square every price", "One-hot encode the price"] }
];

window.STEPS["A numeric column is missing 3% of its values. Which is a reasonable, simple first strategy?"] = [
  { "q": "Only 3% is missing. Should you delete the whole column?", "ok": "No — that wastes lots of signal", "no": ["Yes, delete it", "Delete every column"] },
  { "q": "Would filling blanks with 0 or a huge number be safe?", "ok": "No — it distorts the column's statistics", "no": ["Yes, totally fine", "Only 0 is fine"] },
  { "q": "Which stand-in barely moves the column's center and resists outliers?", "ok": "The median", "no": ["A random huge number", "Zero"] },
  { "q": "So what's a reasonable first strategy?", "ok": "Fill the blanks with the column's median (impute)", "no": ["Delete the entire column", "Replace every value with 0"] }
];

window.STEPS["Your data has a raw timestamp like 2026-07-13 09:00. Which engineered features are most likely to help predict store sales?"] = [
  { "q": "Do store sales follow calendar patterns?", "ok": "Yes — weekends and seasons differ", "no": ["No, sales are random", "Only the year matters"] },
  { "q": "Does a raw timestamp string expose those patterns to a model?", "ok": "No — the structure is hidden", "no": ["Yes, fully", "Only its length matters"] },
  { "q": "What can you pull out of the timestamp?", "ok": "Day-of-week, month, weekend flag", "no": ["Its character count", "The row number"] },
  { "q": "Would 'is-weekend' help predict sales?", "ok": "Yes — weekends often sell differently", "no": ["No, it's useless", "Only on holidays"] },
  { "q": "So which engineered features help most?", "ok": "Day-of-week, month, and is-weekend pulled from the timestamp", "no": ["The raw timestamp string fed in as text", "The number of characters in the timestamp"] }
];

window.STEPS["A column City has values New York, Paris, and Tokyo with no natural order. Which encoding is appropriate?"] = [
  { "q": "Is one city 'greater than' another?", "ok": "No — they have no natural rank", "no": ["Yes, by population", "Yes, alphabetically"] },
  { "q": "If you code them 0, 1, 2, what does the model wrongly assume?", "ok": "That Tokyo (2) outranks New York (0)", "no": ["Nothing wrong", "That they're equal"] },
  { "q": "How do you encode categories without an order?", "ok": "Give each its own 0/1 column", "no": ["Number them by rank", "Standardize them"] },
  { "q": "So which encoding is appropriate?", "ok": "One-hot encoding — the categories have no rank", "no": ["Ordinal encoding 0, 1, 2 — the model needs an order", "Standardization — subtract the mean city"] }
];

window.STEPS["Why might you bin a continuous 'age' feature into groups like child / adult / senior?"] = [
  { "q": "Does age affect an outcome in a perfectly straight line?", "ok": "Often not — effects jump at life stages", "no": ["Yes, always linear", "Age never matters"] },
  { "q": "What does grouping ages into stages let a simple model do?", "ok": "React to the stage, not a straight line", "no": ["Train slower", "Read dates"] },
  { "q": "What happens to a weird outlier age like 130?", "ok": "It lands in the 'senior' bucket, softening its sway", "no": ["It crashes the model", "It becomes the mean"] },
  { "q": "So why bin 'age'?", "ok": "To capture non-linear effects and blunt the impact of outliers", "no": ["To make the model train more slowly on purpose", "Because models cannot read any numeric column"] }
];

/* ===== feng2 — Part II · Practice ===== */

window.STEPS["What is binning (discretization)?"] = [
  { "q": "Start with a continuous number like age. Is it one exact value or a range?", "ok": "An exact value along a range", "no": ["A category already", "A 0/1 flag"] },
  { "q": "What if we sort ages into boxes like child / adult / senior?", "ok": "Each value becomes 'which box'", "no": ["Each stays exact", "They all merge to one"] },
  { "q": "What are those boxes called?", "ok": "Bins or buckets", "no": ["Layers", "Weights"] },
  { "q": "So what is binning?", "ok": "Grouping a continuous number into a small set of ranges or buckets", "no": ["Scaling a feature to mean 0 and std 1", "Creating a 0/1 column for each category"] }
];

window.STEPS["What is an interaction feature?"] = [
  { "q": "Price alone and quantity alone each predict revenue how well?", "ok": "Poorly — neither is the whole story", "no": ["Perfectly on their own", "Not at all, ever"] },
  { "q": "What single quantity actually equals total spend?", "ok": "Price times quantity", "no": ["Price plus quantity", "Price minus quantity"] },
  { "q": "Can a plain linear model see that product unless you build it?", "ok": "No — you must create it", "no": ["Yes, automatically", "Only trees can't"] },
  { "q": "So what is an interaction feature?", "ok": "A new feature made by combining two others (e.g., price × quantity) to capture their joint effect", "no": ["A feature scaled to the range 0 to 1", "The single most predictive feature in the dataset"] }
];

window.STEPS["What is a log transform of a feature?"] = [
  { "q": "Which values does a logarithm shrink the most?", "ok": "The very large ones", "no": ["The very small ones", "None of them"] },
  { "q": "What kind of skew does that help fix?", "ok": "A long right tail (right-skew)", "no": ["Left-skew only", "No skew at all"] },
  { "q": "Does log(x) work on zero or negative values?", "ok": "No — it needs positive inputs (use log(x+1))", "no": ["Yes, any value", "Only on negatives"] },
  { "q": "So what is a log transform?", "ok": "Replacing each value with its logarithm to compress large values and reduce right-skew", "no": ["Scaling the feature to the range 0 to 1", "Splitting the feature into equal-width bins"] }
];

window.STEPS["What is feature extraction?"] = [
  { "q": "Is raw text or a raw date easy for a model to use directly?", "ok": "No — it needs to be turned into columns", "no": ["Yes, models read text fine", "Only dates are usable"] },
  { "q": "Can you derive word counts from text or day-of-week from a date?", "ok": "Yes — new informative columns", "no": ["No, that's impossible", "Only by deleting data"] },
  { "q": "How does this differ from feature selection?", "ok": "Selection keeps existing columns; extraction creates new ones", "no": ["They're the same thing", "Extraction deletes columns"] },
  { "q": "So what is feature extraction?", "ok": "Deriving new, more informative features from raw data such as text, images, or dates", "no": ["Selecting a subset of existing features and deleting the rest", "Removing rows that contain missing values"] }
];

window.STEPS["Hour-of-day runs 0…23, but hour 23 and hour 0 are actually adjacent. How do you encode this so the model knows midnight wraps around?"] = [
  { "q": "On a raw 0–23 line, how far apart look 23 and 0?", "ok": "23 apart — but they're really neighbours", "no": ["1 apart, correct", "0 apart"] },
  { "q": "What shape puts 23:00 next to 00:00 naturally?", "ok": "A circle", "no": ["A straight line", "A square"] },
  { "q": "Which two functions map an angle onto that circle?", "ok": "Sine and cosine", "no": ["Log and exp", "Min and max"] },
  { "q": "Does plain one-hot into 24 columns keep the wrap-around order?", "ok": "No — it treats every hour as unrelated", "no": ["Yes, perfectly", "Only for even hours"] },
  { "q": "So how do you encode hour-of-day?", "ok": "Use the sine and cosine of the hour (cyclical encoding)", "no": ["Feed the raw hour 0–23 as a single number", "One-hot encode into 24 unrelated columns and stop"] }
];

window.STEPS["A column has 5,000 unique product IDs. Why is plain one-hot encoding a poor choice here?"] = [
  { "q": "How many columns does one-hot make for 5,000 categories?", "ok": "5,000 columns", "no": ["Just 1 column", "About 50"] },
  { "q": "In each row, how many of those columns are 1?", "ok": "Just one — the rest are 0", "no": ["All of them", "None"] },
  { "q": "So the resulting table is mostly what?", "ok": "Zeros — huge and sparse", "no": ["Full of ones", "Tiny and dense"] },
  { "q": "What does that do to memory and learning?", "ok": "Bloats memory and starves each column of examples", "no": ["Speeds everything up", "Nothing at all"] },
  { "q": "So why is plain one-hot a poor choice here?", "ok": "It explodes into 5,000 sparse columns, bloating memory and hurting learning", "no": ["One-hot only works on numeric columns, not IDs", "One-hot would rank the products in the wrong order"] }
];

window.STEPS["You standardize your features using the mean and standard deviation of the ENTIRE dataset, then split into train/test. What is wrong?"] = [
  { "q": "The test set is supposed to be what?", "ok": "Unseen data, like a real exam", "no": ["Extra training data", "Useless data"] },
  { "q": "If the mean/std use ALL data, has the scaler seen the test set?", "ok": "Yes — it peeked at test data", "no": ["No, never", "Only train data"] },
  { "q": "What does that peeking do to your test score?", "ok": "Inflates it dishonestly — it won't hold up", "no": ["Makes it more accurate", "Has no effect"] },
  { "q": "What's the correct fix?", "ok": "Fit the scaler on train only, then apply to test", "no": ["Fit it on test only", "Refit it per row"] },
  { "q": "So what is wrong?", "ok": "Test information leaks into training; fit the scaler on train only, then apply it to test", "no": ["Nothing — using all data makes scaling more accurate", "You should never standardize features at all"] }
];

window.STEPS["A category column has 50 values, but 40 of them appear fewer than 5 times each. A common fix is to…"] = [
  { "q": "Can a model learn much from a category seen only 4 times?", "ok": "No — too few examples", "no": ["Yes, plenty", "Only if scaled"] },
  { "q": "What risk do such rare categories create?", "ok": "Overfitting or unseen values at test time", "no": ["Faster training", "Perfect accuracy"] },
  { "q": "Instead of dropping those rows, what can you do with the rare labels?", "ok": "Merge them into one shared group", "no": ["Give each its own column", "Turn them into numbers 0"] },
  { "q": "So a common fix is to…", "ok": "Group the rare categories into a single 'Other' bucket", "no": ["Delete every row that has a rare category", "Give each rare category its own one-hot column and keep them all"] }
];

window.STEPS["A straight-line model underfits data that clearly curves. Adding x² and x³ as new features lets it…"] = [
  { "q": "A straight line can't match a curve. What extra inputs might help?", "ok": "Powers like x² and x³", "no": ["Fewer features", "The target as an input"] },
  { "q": "Does the model itself have to change, or just its inputs?", "ok": "Just the inputs — it stays a linear model", "no": ["The algorithm must change", "Nothing changes"] },
  { "q": "With x² and x³ available, what can the model now draw?", "ok": "Curved (bending) fits", "no": ["Only straight lines", "Only categories"] },
  { "q": "If you push the degree very high, what risk appears?", "ok": "Overfitting — chasing noise", "no": ["It can never overfit", "It underfits more"] },
  { "q": "So adding x² and x³ lets it…", "ok": "Fit curved (non-linear) relationships while still using a linear model", "no": ["Reduce the number of features it must consider", "Guarantee that it will never overfit"] }
];

/* ===== feng3 — Part III · Advanced Study ===== */

window.STEPS["What is a polynomial feature?"] = [
  { "q": "Take a feature x. What is x² called relative to x?", "ok": "A power of x", "no": ["A category of x", "A scaled x"] },
  { "q": "What about multiplying two features, x·y?", "ok": "A product (cross term)", "no": ["A one-hot column", "An average"] },
  { "q": "What do such powers and products let a linear model do?", "ok": "Fit curves and interactions", "no": ["Only straight lines", "Read text"] },
  { "q": "So what is a polynomial feature?", "ok": "A feature built by raising an existing feature to a power (x², x³) or multiplying features together", "no": ["A feature rescaled to the range 0 to 1", "A category turned into 0/1 indicator columns"] }
];

window.STEPS["What is target (mean) encoding of a categorical feature?"] = [
  { "q": "One-hot on 5,000 categories gives many columns. Can we use fewer?", "ok": "Yes — even a single number", "no": ["No, always thousands", "Only zero columns"] },
  { "q": "What informative statistic could summarize a category?", "ok": "The average target seen for it", "no": ["Its alphabetical rank", "Its character count"] },
  { "q": "So 'City = Paris' becomes what?", "ok": "The mean outcome for Paris", "no": ["A random number", "The count of Paris rows only, ignoring outcome"] },
  { "q": "Because it uses the label, what must you watch for?", "ok": "Leakage — compute it carefully", "no": ["Nothing at all", "Slow training only"] },
  { "q": "So what is target (mean) encoding?", "ok": "Replacing each category with the average target value seen for that category", "no": ["Creating one 0/1 column per category", "Ranking the categories alphabetically as integers"] }
];

window.STEPS["What does TF-IDF do to a piece of text?"] = [
  { "q": "'TF' (term frequency) measures what?", "ok": "How often a word appears in this document", "no": ["How long the document is", "The word's spelling"] },
  { "q": "'IDF' rewards words that are what across all documents?", "ok": "Rare (distinctive)", "no": ["Common everywhere", "Longest"] },
  { "q": "So a word in every document, like 'the', gets…", "ok": "Down-weighted toward zero", "no": ["The highest weight", "Deleted from text"] },
  { "q": "A distinctive word like 'refund' gets…", "ok": "A high weight", "no": ["Zero weight", "Removed"] },
  { "q": "So what does TF-IDF do?", "ok": "Weights each word by how often it appears here but how rare it is across all documents", "no": ["Counts only the total number of characters in the text", "Translates the text into another language"] }
];

window.STEPS["What is feature hashing (the 'hashing trick')?"] = [
  { "q": "One-hot's width grows with the number of categories. Can we cap the width?", "ok": "Yes — fix it in advance", "no": ["No, never", "Only by deleting categories"] },
  { "q": "What tool maps any category to a slot number?", "ok": "A hash function", "no": ["A sort function", "A random shuffle"] },
  { "q": "With a fixed number of slots, what happens to the column count as categories grow?", "ok": "It stays constant", "no": ["It keeps exploding", "It drops to zero"] },
  { "q": "What's the small cost of hashing?", "ok": "Occasional collisions (two categories share a slot)", "no": ["It leaks the label", "It needs the target"] },
  { "q": "So what is feature hashing?", "ok": "Mapping categories to a fixed number of columns via a hash function, avoiding a giant one-hot matrix", "no": ["Encrypting the feature values for security", "Sorting the features by their importance"] }
];

window.STEPS["Target encoding uses the label, so it can leak information from the target into the features. What is the standard defense?"] = [
  { "q": "If Paris's mean includes today's Paris row, what leaks in?", "ok": "That row's own label (the answer)", "no": ["Nothing leaks", "Only the city name"] },
  { "q": "To avoid seeing its own label, a row's mean should come from where?", "ok": "Other rows / other folds only", "no": ["The same row", "The test set"] },
  { "q": "What technique gives you 'other folds' cleanly?", "ok": "Cross-validation (out-of-fold)", "no": ["Using all data at once", "No splitting at all"] },
  { "q": "And you fit these means on which data?", "ok": "Training data only", "no": ["The test set", "The full dataset"] },
  { "q": "So what is the standard defense?", "ok": "Compute each category's mean out-of-fold (via cross-validation) and fit on train only", "no": ["Compute the category means on the test set instead", "Use the whole dataset including test for extra stability"] }
];

window.STEPS["What is the cleanest way to guarantee every transform — scaling, imputation, encoding — is fit on training data only during cross-validation?"] = [
  { "q": "If you transform all data before splitting, what sneaks in?", "ok": "Test info leaks into the transforms", "no": ["Nothing leaks", "The data gets cleaner"] },
  { "q": "So each transform should be fit on which part of every fold?", "ok": "Only that fold's training portion", "no": ["The validation portion", "The whole dataset"] },
  { "q": "What object chains transforms and the model into one unit?", "ok": "A Pipeline", "no": ["A spreadsheet", "A loop counter"] },
  { "q": "If you fit that Pipeline inside cross-validation, when is prep re-learned?", "ok": "On each fold's training split", "no": ["Once, before splitting", "Never"] },
  { "q": "So what's the cleanest way?", "ok": "Wrap all transforms and the model in a single Pipeline and fit it inside cross-validation", "no": ["Transform the full dataset once, before you ever split it", "Fit each transform by hand on all the data first, then split"] }
];
