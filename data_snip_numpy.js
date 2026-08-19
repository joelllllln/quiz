/* Quickfire cards — NumPy: arrays, maths and the vectorised habits underneath pandas. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var MK = 'NumPy · make & inspect arrays';
  var OPS = 'NumPy · indexing & maths';
  var RND = 'NumPy · random & statistics';

  window.SNIPPETS.push(

    { id: 'np-import', group: MK, lvl: 1,
      ask: 'Import NumPy under its usual short name',
      a: 'import numpy as np' },

    { id: 'np-array', group: MK, lvl: 1,
      ask: 'Make an array from the list [1, 2, 3]',
      a: 'np.array([1, 2, 3])',
      note: 'One dtype for the whole array — mix ints and strings and everything becomes text.' },

    { id: 'np-zeros', group: MK, lvl: 1,
      ask: 'Make an array of ten zeros',
      a: 'np.zeros(10)',
      note: 'np.zeros((3, 4)) gives a 3×4 matrix — note the tuple.' },

    { id: 'np-ones', group: MK, lvl: 1,
      ask: 'Make a 3 by 4 array of ones',
      a: 'np.ones((3, 4))' },

    { id: 'np-full', group: MK, lvl: 2,
      ask: 'Make a 2 by 2 array filled with the value 7',
      a: 'np.full((2, 2), 7)' },

    { id: 'np-eye', group: MK, lvl: 2,
      ask: 'Make a 3 by 3 identity matrix',
      a: 'np.eye(3)' },

    { id: 'np-arange', group: MK, lvl: 1,
      ask: 'Make an array of the numbers 0 to 9',
      a: 'np.arange(10)',
      note: 'Same rules as range(): start inclusive, stop exclusive, optional step.' },

    { id: 'np-arange-step', group: MK, lvl: 2,
      ask: 'Make an array from 0 to 100 in steps of 5',
      a: 'np.arange(0, 101, 5)',
      note: 'The stop is excluded, so 101 to include 100.' },

    { id: 'np-linspace', group: MK, lvl: 2,
      ask: 'Make 50 evenly spaced numbers between 0 and 1',
      a: 'np.linspace(0, 1, 50)',
      note: 'linspace counts points and includes both ends; arange counts steps and excludes the stop.' },

    { id: 'np-shape', group: MK, lvl: 1,
      ask: 'Get the shape of the array a',
      a: 'a.shape',
      note: 'A tuple. a.ndim is how many dimensions, a.size how many elements in total.' },

    { id: 'np-dtype', group: MK, lvl: 1,
      ask: 'Check the data type of the array a',
      a: 'a.dtype',
      note: 'int64, float64, bool, <U5 for short strings, object for anything else.' },

    { id: 'np-reshape', group: MK, lvl: 1,
      ask: 'Reshape the array a into 3 rows and 4 columns',
      a: 'a.reshape(3, 4)',
      note: 'The element count must match exactly.' },

    { id: 'np-reshape-auto', group: MK, lvl: 2,
      ask: 'Reshape a into 2 rows, letting NumPy work out the number of columns',
      a: 'a.reshape(2, -1)',
      note: '-1 means "you do the arithmetic".' },

    { id: 'np-reshape-col', group: MK, lvl: 2,
      ask: 'Turn the 1-D array a into a single column (n rows, 1 column)',
      a: 'a.reshape(-1, 1)',
      note: 'The exact fix for scikit-learn\'s "Expected 2D array, got 1D array instead".' },

    { id: 'np-ravel', group: MK, lvl: 2,
      ask: 'Flatten the array a into one dimension',
      a: 'a.ravel()',
      alts: ['a.flatten()'],
      note: 'ravel gives a view when it can; flatten always copies.' },

    { id: 'np-astype-np', group: MK, lvl: 2,
      ask: 'Convert the array a to floats',
      a: 'a.astype(float)' },

    { id: 'np-copy', group: MK, lvl: 2,
      ask: 'Take a real copy of the array a',
      a: 'a.copy()',
      note: 'NumPy slices are views — writing to one changes the original.' },

    { id: 'np-concat', group: MK, lvl: 2,
      ask: 'Join arrays a and b end to end',
      a: 'np.concatenate([a, b])',
      note: 'axis=0 stacks rows, axis=1 glues columns side by side.' },

    { id: 'np-vstack', group: MK, lvl: 3,
      ask: 'Stack a and b as two rows',
      a: 'np.vstack([a, b])',
      note: 'hstack is the side-by-side twin, column_stack turns 1-D arrays into columns.' },

    /* ---- indexing & maths ---- */
    { id: 'np-index2d', group: OPS, lvl: 1,
      ask: 'Get the element in row 0, column 2 of the 2-D array a',
      a: 'a[0, 2]',
      note: 'One bracket, comma separated — a[0][2] works but makes an intermediate array.' },

    { id: 'np-row', group: OPS, lvl: 1,
      ask: 'Get the whole first row of the 2-D array a',
      a: 'a[0]',
      alts: ['a[0, :]'] },

    { id: 'np-col', group: OPS, lvl: 1,
      ask: 'Get the whole second column of the 2-D array a',
      a: 'a[:, 1]',
      note: 'Colon for "every row", then the column index.' },

    { id: 'np-slice', group: OPS, lvl: 2,
      ask: 'Get the first three elements of the 1-D array a',
      a: 'a[:3]' },

    { id: 'np-bool-mask', group: OPS, lvl: 1,
      ask: 'Keep only the elements of a that are greater than 5',
      a: 'a[a > 5]',
      note: 'Boolean masking — the same idea pandas borrows for row filtering.' },

    { id: 'np-mask-set', group: OPS, lvl: 2,
      ask: 'Set every negative element of a to zero',
      a: 'a[a < 0] = 0',
      note: 'Assignment through a mask edits in place.' },

    { id: 'np-where', group: OPS, lvl: 1,
      ask: 'Make an array that is 1 where a is over 5 and 0 elsewhere',
      a: 'np.where(a > 5, 1, 0)',
      note: 'Vectorised if/else: condition, value if true, value if false.' },

    { id: 'np-where-idx', group: OPS, lvl: 3,
      ask: 'Get the positions where a is greater than 5',
      a: 'np.where(a > 5)',
      note: 'With one argument, where returns indices rather than values.' },

    { id: 'np-fancy', group: OPS, lvl: 2,
      ask: 'Get elements 0, 2 and 4 of a in one go',
      a: 'a[[0, 2, 4]]',
      note: 'Fancy indexing with a list of positions; the result is always a copy.' },

    { id: 'np-add-scalar', group: OPS, lvl: 1,
      ask: 'Add 10 to every element of a',
      a: 'a + 10',
      note: 'Broadcasting: no loop needed, and it runs in C.' },

    { id: 'np-elementwise', group: OPS, lvl: 1,
      ask: 'Multiply arrays a and b element by element',
      a: 'a * b',
      note: '* is elementwise; @ is matrix multiplication. Mixing them up is a classic bug.' },

    { id: 'np-dot', group: OPS, lvl: 2,
      ask: 'Matrix-multiply a and b',
      a: 'a @ b',
      alts: ['np.dot(a, b)', 'a.dot(b)'],
      note: '@ has been the readable spelling since Python 3.5.' },

    { id: 'np-transpose', group: OPS, lvl: 2,
      ask: 'Transpose the 2-D array a',
      a: 'a.T' },

    { id: 'np-sqrt', group: OPS, lvl: 1,
      ask: 'Take the square root of every element of a',
      a: 'np.sqrt(a)' },

    { id: 'np-exp', group: OPS, lvl: 2,
      ask: 'Raise e to the power of every element of a',
      a: 'np.exp(a)',
      note: 'np.log is the inverse; np.log1p(x) is safer for tiny x.' },

    { id: 'np-log', group: OPS, lvl: 2,
      ask: 'Take the natural log of every element of a',
      a: 'np.log(a)',
      note: 'log of 0 is -inf and of a negative is NaN, both with a warning.' },

    { id: 'np-round-np', group: OPS, lvl: 2,
      ask: 'Round every element of a to 2 decimal places',
      a: 'np.round(a, 2)' },

    { id: 'np-abs-np', group: OPS, lvl: 1,
      ask: 'Absolute value of every element of a',
      a: 'np.abs(a)' },

    { id: 'np-clip-np', group: OPS, lvl: 3,
      ask: 'Clip every element of a to lie between 0 and 1',
      a: 'np.clip(a, 0, 1)' },

    { id: 'np-sum-axis', group: OPS, lvl: 2,
      ask: 'Sum the 2-D array a down the rows, giving one number per column',
      a: 'a.sum(axis=0)',
      note: 'axis=0 collapses rows (a per-column answer); axis=1 collapses columns.' },

    { id: 'np-mean-axis', group: OPS, lvl: 2,
      ask: 'Mean of each row of the 2-D array a',
      a: 'a.mean(axis=1)' },

    { id: 'np-argmax', group: OPS, lvl: 2,
      ask: 'Position of the largest element of a',
      a: 'a.argmax()',
      alts: ['np.argmax(a)'],
      note: 'argmax gives the index, max gives the value. Predicting a class from probabilities is argmax(axis=1).' },

    { id: 'np-argsort', group: OPS, lvl: 3,
      ask: 'Get the indices that would sort a',
      a: 'np.argsort(a)',
      note: 'Sort one array by another: b[np.argsort(a)].' },

    { id: 'np-sort-np', group: OPS, lvl: 1,
      ask: 'Return a sorted copy of a',
      a: 'np.sort(a)',
      note: 'a.sort() sorts in place and returns None.' },

    { id: 'np-unique', group: OPS, lvl: 2,
      ask: 'Get the distinct values of a',
      a: 'np.unique(a)',
      note: 'return_counts=True gives you the frequencies as a second array.' },

    { id: 'np-unique-counts', group: OPS, lvl: 3,
      ask: 'Get the distinct values of a together with how often each appears',
      a: 'np.unique(a, return_counts=True)',
      note: 'The NumPy answer to value_counts().' },

    { id: 'np-isnan', group: OPS, lvl: 2,
      ask: 'Make a boolean array marking where a is NaN',
      a: 'np.isnan(a)',
      note: 'a == np.nan is False everywhere — NaN never equals itself.' },

    { id: 'np-nanmean', group: OPS, lvl: 2,
      ask: 'Mean of a, ignoring NaNs',
      a: 'np.nanmean(a)',
      note: 'Plain np.mean returns NaN if a single value is missing. nansum, nanstd, nanmax follow.' },

    { id: 'np-any-all', group: OPS, lvl: 2,
      ask: 'Check whether every element of a is positive',
      a: '(a > 0).all()',
      note: '.any() asks whether at least one is.' },

    { id: 'np-count-mask', group: OPS, lvl: 2,
      ask: 'Count how many elements of a are above 5',
      a: '(a > 5).sum()',
      note: 'Booleans sum as 1 and 0.' },

    /* ---- random & stats ---- */
    { id: 'np-seed', group: RND, lvl: 1,
      ask: 'Fix the NumPy random seed to 42 so results repeat',
      a: 'np.random.seed(42)',
      alts: ['rng = np.random.default_rng(42)'],
      note: 'default_rng(42) is the modern generator API and is preferred in new code.' },

    { id: 'np-rand-uniform', group: RND, lvl: 2,
      ask: 'Draw 10 random numbers uniformly between 0 and 1',
      a: 'np.random.rand(10)',
      alts: ['np.random.random(10)'] },

    { id: 'np-rand-normal', group: RND, lvl: 2,
      ask: 'Draw 100 numbers from a standard normal distribution',
      a: 'np.random.randn(100)',
      alts: ['np.random.normal(size=100)'],
      note: 'np.random.normal(loc, scale, size) lets you set the mean and spread.' },

    { id: 'np-rand-int', group: RND, lvl: 2,
      ask: 'Draw 5 random whole numbers between 0 and 9 inclusive',
      a: 'np.random.randint(0, 10, 5)',
      note: 'The high end is exclusive — 10 gives you 0 to 9.' },

    { id: 'np-choice', group: RND, lvl: 2,
      ask: 'Pick 3 random elements from the array a without replacement',
      a: 'np.random.choice(a, 3, replace=False)' },

    { id: 'np-shuffle-np', group: RND, lvl: 3,
      ask: 'Shuffle the array a in place',
      a: 'np.random.shuffle(a)',
      note: 'Returns None — it edits a. np.random.permutation(a) returns a shuffled copy.' },

    { id: 'np-mean-np', group: RND, lvl: 1,
      ask: 'Mean of the array a',
      a: 'a.mean()',
      alts: ['np.mean(a)'] },

    { id: 'np-median-np', group: RND, lvl: 1,
      ask: 'Median of the array a',
      a: 'np.median(a)',
      note: 'There is no a.median() method — this one only exists as a function.' },

    { id: 'np-std-np', group: RND, lvl: 1,
      ask: 'Standard deviation of the array a',
      a: 'a.std()',
      alts: ['np.std(a)'],
      note: 'NumPy defaults to the population sd (ddof=0); pandas defaults to the sample one.' },

    { id: 'np-percentile', group: RND, lvl: 2,
      ask: 'The 90th percentile of a',
      a: 'np.percentile(a, 90)',
      note: 'np.quantile(a, 0.9) is the same number on a 0–1 scale.' },

    { id: 'np-corrcoef', group: RND, lvl: 3,
      ask: 'Correlation coefficient between arrays x and y',
      a: 'np.corrcoef(x, y)[0, 1]',
      note: 'corrcoef returns the whole 2×2 matrix; the off-diagonal is the number you want.' },

    { id: 'np-histogram', group: RND, lvl: 3,
      ask: 'Bin the array a into 10 bins, returning counts and edges',
      a: 'np.histogram(a, bins=10)' },

    { id: 'np-allclose', group: RND, lvl: 3,
      ask: 'Check two float arrays are equal to within rounding error',
      a: 'np.allclose(a, b)',
      note: 'Never compare floats with == ; 0.1 + 0.2 is not 0.3.' },

    { id: 'np-array-equal', group: RND, lvl: 3,
      ask: 'Check whether arrays a and b are exactly identical',
      a: 'np.array_equal(a, b)',
      note: 'a == b gives an elementwise array, which will not work in an if-statement.' }
  );
})();
