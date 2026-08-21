/* The coding path, one small lesson at a time — stages 07 to 13. */
(function () {
  window.CODETASKS = window.CODETASKS || [];
  function T(o) { o.lvl = o.lvl || 1; window.CODETASKS.push(o); }
  var S7 = '07 · Keep some rows';
  var S8 = '08 · More than one condition';
  var S9 = '09 · Sort it and take the top';
  var S10 = '10 · Add a column';
  var S11 = '11 · Tidy up the text';
  var S12 = '12 · Fix the types';
  var S13 = '13 · Group and total';

  /* ---- 07 · Keep some rows ---- */
  T({ key: 's-mask', group: S7, title: 'The true/false column',
    ask: 'Build the column of True and False saying which rows of df have an amount over 100.',
    why: 'Every filter in pandas is this one idea. Meet it on its own before using it.',
    mcq: { q: 'Which line gives one True or False per row?',
      correct: "mask = df['amount'] > 100",
      wrong: ["mask = df['amount'].max() > 100", "mask = df[df['amount'] > 100]", "mask = 'amount' > 100"],
      whyWrong: [
        'That compares ONE number — the biggest amount — with 100, giving a single True or False for the whole frame.',
        'That is the filtered FRAME. The mask is the ingredient that makes it.',
        "Comparing text with a number raises TypeError."],
      explain: "df['amount'] > 100 compares every row at once and gives back a Series of True and False, the same length as the frame." },
    lines: ["mask = df['amount'] > 100"],
    decoys: ["mask = df[df['amount'] > 100]", "mask = df['amount'].max() > 100"],
    written: { prompt: 'Write the line that stores the over-100 mask in a name called mask.', solution: "mask = df['amount'] > 100", must: ['mask =', "df['amount'] > 100"] },
    walk: [["mask = df['amount'] > 100", 'One True or False per row, in the same order as the frame.']] });

  T({ key: 's-filter', group: S7, title: 'Use the mask to keep rows',
    ask: 'Keep only the rows of df where amount is over 100.',
    why: 'The mask goes inside the brackets. That is the whole move.',
    mcq: { q: 'Which line keeps those rows?',
      correct: "big = df[df['amount'] > 100]",
      wrong: ["big = df['amount'] > 100", "big = df.filter(df['amount'] > 100)", "big = df.where(df['amount'] > 100)"],
      whyWrong: [
        'That is the mask on its own — True and False, not rows.',
        'df.filter selects by column NAME patterns, not by a row condition.',
        'where() keeps every row and blanks the failures into NaN, so the row count does not change.'],
      explain: 'df[mask] keeps the rows where the mask is True. Reading it inside out is the trick: condition first, brackets second.' },
    lines: ["big = df[df['amount'] > 100]"],
    decoys: ["big = df.where(df['amount'] > 100)", "big = df.filter(df['amount'] > 100)"],
    written: { prompt: 'Write the line that filters df to amounts over 100, into big.', solution: "big = df[df['amount'] > 100]", must: ["df[df['amount'] > 100]"] },
    walk: [["big = df[df['amount'] > 100]", 'Same brackets you used to pick a column — with a condition inside instead of a name.']] });

  T({ key: 's-filter-eq', group: S7, title: 'Filter on text',
    ask: 'Keep only the rows of df where city is London.',
    why: 'The same line with == instead of >, which is the only thing that changed.',
    mcq: { q: 'Which keeps the London rows?',
      correct: "df[df['city'] == 'London']",
      wrong: ["df[df['city'] = 'London']", "df[df['city'] is 'London']", "df[df['city'] == London]"],
      whyWrong: [
        'One equals sign is assignment, and inside brackets it is a syntax error.',
        '`is` compares identity, not value — it can be False even for identical text.',
        'Without quotes Python looks for a variable called London.'],
      explain: "== compares values row by row. The text goes in quotes, spelled exactly as it appears in the data." },
    lines: ["df[df['city'] == 'London']"],
    decoys: ["df[df['city'] = 'London']", "df[df['city'] is 'London']"],
    written: { prompt: 'Write the expression that keeps rows where city is London.', solution: "df[df['city'] == 'London']", must: ["df['city'] == 'London'"] },
    walk: [["df[df['city'] == 'London']", 'Text is case- and space-sensitive. Tidy the column first if the match comes back empty.']] });

  T({ key: 's-filter-isin', group: S7, title: 'One of several values',
    ask: 'Keep the rows of df whose city is London, Leeds or York.',
    why: 'isin replaces a chain of ORs and reads like the sentence you would say.',
    mcq: { q: 'Which keeps all three cities?',
      correct: "df[df['city'].isin(['London', 'Leeds', 'York'])]",
      wrong: ["df[df['city'] in ['London', 'Leeds', 'York']]", "df[df['city'] == ['London', 'Leeds', 'York']]", "df[df['city'].contains('London|Leeds|York')]"],
      whyWrong: [
        '`in` asks one yes/no question about the whole column and raises "truth value is ambiguous".',
        'Comparing a column with a list compares element by element and needs matching lengths — it raises.',
        'contains lives behind .str, and a substring match would also catch "New London".'],
      explain: 'isin takes a list and answers True for each row whose value appears in it.' },
    lines: ["df[df['city'].isin(['London', 'Leeds', 'York'])]"],
    decoys: ["df[df['city'] in ['London', 'Leeds']]", "df[df['city'] == ['London', 'Leeds']]"],
    written: { prompt: 'Write the expression that keeps rows whose city is London, Leeds or York.', solution: "df[df['city'].isin(['London', 'Leeds', 'York'])]", must: ['isin(', "'London'", "'Leeds'", "'York'"] },
    walk: [["df[df['city'].isin(['London', 'Leeds', 'York'])]", 'Put the list in a named variable when it gets long — the filter line stays readable.']] });

  T({ key: 's-filter-not', group: S7, lvl: 2, title: 'Everything except',
    ask: 'Keep the rows of df whose city is NOT London.',
    why: 'The tilde is the elementwise "not", and it is the one nobody guesses.',
    mcq: { q: 'Which keeps everything except London?',
      correct: "df[df['city'] != 'London']",
      wrong: ["df[not df['city'] == 'London']", "df[!df['city'] == 'London']", "df[df['city'].not_equals('London')]"],
      whyWrong: [
        '`not` on a Series raises — it wants one true-or-false answer, and there are thousands.',
        '! is not a Python operator at all; the elementwise not is ~.',
        'There is no .not_equals method.'],
      explain: "!= is the direct way for one value. For the opposite of a longer condition, put ~ in front of it: df[~df['city'].isin(cities)]." },
    lines: ["df[df['city'] != 'London']"],
    decoys: ["df[not df['city'] == 'London']", "df[!df['city'] == 'London']"],
    written: { prompt: 'Write the expression that keeps rows where city is not London.', solution: "df[df['city'] != 'London']", must: ["df['city'] != 'London'"] },
    walk: [["df[df['city'] != 'London']", 'Missing cities count as "not London" here — check whether that is what you meant.']] });

  T({ key: 's-count-mask', group: S7, title: 'How many match',
    ask: 'Count how many rows of df have an amount over 100.',
    why: 'A count is a mask with .sum() on the end, because True counts as 1.',
    mcq: { q: 'Which counts the matching rows?',
      correct: "(df['amount'] > 100).sum()",
      wrong: ["(df['amount'] > 100).count()", "df['amount'].sum() > 100", "len(df['amount'] > 100)"],
      whyWrong: [
        'count() counts every row of the mask, True and False alike — so it always gives the frame length.',
        'That totals the column and compares the total with 100: one true-or-false answer.',
        'The mask has one entry per row, so its length is always the row count.'],
      explain: 'Summing a mask counts the Trues. Averaging it gives the PROPORTION, which is often the more useful number.' },
    lines: ["(df['amount'] > 100).sum()"],
    decoys: ["(df['amount'] > 100).count()", "len(df['amount'] > 100)"],
    written: { prompt: 'Write the expression that counts rows with amount over 100.', solution: "(df['amount'] > 100).sum()", must: ["(df['amount'] > 100).sum()"] },
    walk: [["(df['amount'] > 100).sum()", 'Swap .sum() for .mean() and you get the share instead of the count.']] });

  /* ---- 08 · More than one condition ---- */
  T({ key: 's-and', group: S8, title: 'Two conditions, both true',
    ask: 'Keep the rows of df where amount is over 100 AND city is London.',
    why: 'The & and the brackets are where nearly everyone slips the first few times.',
    mcq: { q: 'Which combines them correctly?',
      correct: "df[(df['amount'] > 100) & (df['city'] == 'London')]",
      wrong: ["df[df['amount'] > 100 and df['city'] == 'London']", "df[df['amount'] > 100 & df['city'] == 'London']", "df[(df['amount'] > 100), (df['city'] == 'London')]"],
      whyWrong: [
        '`and` wants one answer from a whole column and raises "The truth value of a Series is ambiguous".',
        'Right operator, missing brackets — & binds tighter than >, so Python tries 100 & df[...] first.',
        'A comma inside df[...] is read as (rows, columns), so this asks for columns that do not exist.'],
      explain: 'Use & for and, and put brackets round each half. Both halves are non-negotiable.' },
    lines: ["df[(df['amount'] > 100) & (df['city'] == 'London')]"],
    decoys: ["df[df['amount'] > 100 and df['city'] == 'London']", "df[df['amount'] > 100 & df['city'] == 'London']"],
    written: { prompt: 'Write the expression keeping rows over 100 in London.', solution: "df[(df['amount'] > 100) & (df['city'] == 'London')]", must: ['&', "(df['amount'] > 100)", "(df['city'] == 'London')"] },
    walk: [["df[(df['amount'] > 100) & (df['city'] == 'London')]", 'Brackets, ampersand, brackets. Say it out loud once and it sticks.']] });

  T({ key: 's-or', group: S8, title: 'Two conditions, either one',
    ask: 'Keep the rows of df where amount is over 100 OR city is London.',
    why: 'Same shape, different pipe — and worth doing straight after the AND so the pair are learned together.',
    mcq: { q: 'Which keeps rows matching either condition?',
      correct: "df[(df['amount'] > 100) | (df['city'] == 'London')]",
      wrong: ["df[(df['amount'] > 100) or (df['city'] == 'London')]", "df[(df['amount'] > 100) + (df['city'] == 'London')]", "df[(df['amount'] > 100) || (df['city'] == 'London')]"],
      whyWrong: [
        '`or` raises for the same reason `and` does — it wants a single answer.',
        'Adding masks turns True into 1 and gives 0, 1 or 2 per row, which is not a mask.',
        '|| is not a Python operator; the single pipe is the elementwise or.'],
      explain: '| is or, & is and, ~ is not. Three symbols cover every filter you will ever write.' },
    lines: ["df[(df['amount'] > 100) | (df['city'] == 'London')]"],
    decoys: ["df[(df['amount'] > 100) or (df['city'] == 'London')]", "df[(df['amount'] > 100) || (df['city'] == 'London')]"],
    written: { prompt: 'Write the expression keeping rows over 100 or in London.', solution: "df[(df['amount'] > 100) | (df['city'] == 'London')]", must: ['|', "(df['amount'] > 100)"] },
    walk: [["df[(df['amount'] > 100) | (df['city'] == 'London')]", 'An OR always keeps at least as many rows as either condition alone. Check the count.']] });

  T({ key: 's-between', group: S8, title: 'Between two values',
    ask: 'Keep the rows of df where amount is between 50 and 100.',
    why: 'Two conditions in one method, and it reads like English.',
    mcq: { q: 'Which keeps the middle band?',
      correct: "df[df['amount'].between(50, 100)]",
      wrong: ["df[50 < df['amount'] < 100]", "df[df['amount'].between(100, 50)]", "df[df['amount'] > 50 & df['amount'] < 100]"],
      whyWrong: [
        'Chained comparison on a Series raises — Python tries to combine the two halves with `and`.',
        'The bounds are the wrong way round, so nothing matches and you get an empty frame.',
        'Missing brackets round each half, so & is applied to the wrong things.'],
      explain: 'between(50, 100) includes BOTH ends by default. Pass inclusive="neither" to exclude them.' },
    lines: ["df[df['amount'].between(50, 100)]"],
    decoys: ["df[50 < df['amount'] < 100]", "df[df['amount'].between(100, 50)]"],
    written: { prompt: 'Write the expression keeping amounts between 50 and 100.', solution: "df[df['amount'].between(50, 100)]", must: ['between(50, 100)'] },
    walk: [["df[df['amount'].between(50, 100)]", 'Both ends included. Say so when you report the number, because it changes the count.']] });

  T({ key: 's-mask-name', group: S8, lvl: 2, title: 'Name the mask',
    ask: 'Build a named mask for "over 100 and in London", then use it to filter df.',
    why: 'Once there are two conditions, naming the mask is what keeps the filter line readable — and lets you count the matches.',
    mcq: { q: 'Which pair is the readable version?',
      correct: "mask = (df['amount'] > 100) & (df['city'] == 'London')\nbig_london = df[mask]",
      wrong: ["mask = df[(df['amount'] > 100) & (df['city'] == 'London')]\nbig_london = df[mask]", "mask = 'amount > 100 and city == London'\nbig_london = df[mask]", "big_london = df[mask = (df['amount'] > 100)]"],
      whyWrong: [
        'That already filtered, so mask holds a FRAME — using it as a mask raises.',
        'A condition written as text does nothing unless you pass it to .query(), which is a different call.',
        'You cannot assign inside the brackets; that is a syntax error.'],
      explain: 'A named mask can be reused, counted with mask.sum(), and read at a glance six months later.' },
    lines: ["mask = (df['amount'] > 100) & (df['city'] == 'London')", 'big_london = df[mask]', "print(mask.sum(), 'rows match')"],
    decoys: ["mask = df[(df['amount'] > 100)]", "big_london = df[mask = mask]"],
    written: { prompt: 'Write three lines: build the named mask, filter df with it, and print how many rows matched.', solution: "mask = (df['amount'] > 100) & (df['city'] == 'London')\nbig_london = df[mask]\nprint(mask.sum(), 'rows match')", must: ['mask =', '&', 'df[mask]', 'mask.sum()'] },
    walk: [["mask = (df['amount'] > 100) & (df['city'] == 'London')", 'The condition, named.'],
           ['big_london = df[mask]', 'The filter, now short enough to read.'],
           ["print(mask.sum(), 'rows match')", 'And the count, free, because the mask still exists.']] });

  /* ---- 09 · Sort it and take the top ---- */
  T({ key: 's-sort-asc', group: S9, title: 'Sort by a column',
    ask: 'Put df in order of amount, smallest first.',
    why: 'Sorting is half of every "top ten" question.',
    mcq: { q: 'Which sorts smallest first?',
      correct: "df.sort_values('amount')",
      wrong: ["df.sort('amount')", "df.sort_values(by='amount', ascending=False)", "df.sort_index('amount')"],
      whyWrong: [
        '.sort() was removed from pandas years ago; the method is sort_values.',
        'That sorts biggest first — right method, wrong direction.',
        'sort_index sorts by the INDEX and takes no column name.'],
      explain: "sort_values('amount') gives a NEW frame in ascending order. The original is untouched." },
    lines: ["df.sort_values('amount')"],
    decoys: ["df.sort('amount')", "df.sort_index('amount')"],
    written: { prompt: 'Write the expression that sorts df by amount, smallest first.', solution: "df.sort_values('amount')", must: ["sort_values('amount')"] },
    walk: [["df.sort_values('amount')", 'Assign it to something, or the sorted version is thrown away immediately.']] });

  T({ key: 's-sort-desc', group: S9, title: 'Sort the other way',
    ask: 'Put df in order of amount, biggest first.',
    why: 'One argument different — and it is the direction you want nine times out of ten.',
    mcq: { q: 'Which sorts biggest first?',
      correct: "df.sort_values('amount', ascending=False)",
      wrong: ["df.sort_values('amount', reverse=True)", "df.sort_values('amount', desc=True)", "df.sort_values('-amount')"],
      whyWrong: [
        'reverse=True is what the built-in sorted() takes. pandas calls it ascending.',
        'There is no desc argument.',
        'A minus in front of the name is SQL thinking; pandas would look for a column called -amount.'],
      explain: 'ascending=False. The same argument works on sort_index and on a Series.' },
    lines: ["df.sort_values('amount', ascending=False)"],
    decoys: ["df.sort_values('amount', reverse=True)", "df.sort_values('-amount')"],
    written: { prompt: 'Write the expression that sorts df by amount, biggest first.', solution: "df.sort_values('amount', ascending=False)", must: ['sort_values(', "'amount'", 'ascending=False'] },
    walk: [["df.sort_values('amount', ascending=False)", 'Sort descending, then head(10), and you have a top ten.']] });

  T({ key: 's-nlargest', group: S9, title: 'The top ten, in one call',
    ask: 'Get the ten rows of df with the biggest amount.',
    why: 'Sorting the whole frame to look at ten rows is wasteful — there is a call for exactly this.',
    mcq: { q: 'Which gives the top ten?',
      correct: "df.nlargest(10, 'amount')",
      wrong: ["df.nlargest('amount', 10)", "df.largest(10, 'amount')", "df.sort_values('amount').head(10)"],
      whyWrong: [
        'The count comes first, then the column.',
        'The method is nlargest, with an n.',
        'That gives the ten SMALLEST, because the sort is ascending by default.'],
      explain: "nlargest(10, 'amount') does the sort and the head in one, and only sorts as much as it needs to." },
    lines: ["df.nlargest(10, 'amount')"],
    decoys: ["df.nlargest('amount', 10)", "df.largest(10, 'amount')"],
    written: { prompt: 'Write the expression giving the ten biggest-amount rows of df.', solution: "df.nlargest(10, 'amount')", must: ["nlargest(10, 'amount')"] },
    walk: [["df.nlargest(10, 'amount')", 'nsmallest is the other end. Both keep the whole row, so you can see who it belonged to.']] });

  T({ key: 's-sort-two', group: S9, lvl: 2, title: 'Sort by two columns',
    ask: 'Sort df by city, and within each city by amount, biggest first.',
    why: 'Two keys, one call — and the second list is what people forget.',
    mcq: { q: 'Which sorts by city then by amount descending?',
      correct: "df.sort_values(['city', 'amount'], ascending=[True, False])",
      wrong: ["df.sort_values(['city', 'amount'], ascending=False)", "df.sort_values('city', 'amount')", "df.sort_values(['city', 'amount']).sort_values('amount', ascending=False)"],
      whyWrong: [
        'A single False applies to BOTH columns, so the cities come out Z to A as well.',
        'The second positional argument is not another column — the names go in one list.',
        'The second sort undoes the first, leaving the frame ordered by amount alone.'],
      explain: 'A list of columns, and a matching list of directions. They line up position by position.' },
    lines: ["df.sort_values(['city', 'amount'], ascending=[True, False])"],
    decoys: ["df.sort_values(['city', 'amount'], ascending=False)", "df.sort_values('city', 'amount')"],
    written: { prompt: 'Write the expression sorting df by city ascending and amount descending.', solution: "df.sort_values(['city', 'amount'], ascending=[True, False])", must: ["['city', 'amount']", 'ascending=[True, False]'] },
    walk: [["df.sort_values(['city', 'amount'], ascending=[True, False])", 'First key groups, second key orders within it — the shape of every league table.']] });

  /* ---- 10 · Add a column ---- */
  T({ key: 's-newcol-mult', group: S10, title: 'A column from two others',
    ask: 'Add a total column to df holding price times quantity.',
    why: 'Whole-column arithmetic, no loop — the thing pandas exists for.',
    mcq: { q: 'Which adds the column?',
      correct: "df['total'] = df['price'] * df['quantity']",
      wrong: ["df.total = df['price'] * df['quantity']", "df['total'] = df['price'] * df['quantity'] for each row", "df['total'] = df.apply(lambda r: r['price'] * r['quantity'])"],
      whyWrong: [
        'Assigning with a dot creates an ATTRIBUTE, not a column — df["total"] then raises KeyError.',
        'That is not Python; the loop is already implied by working on whole columns.',
        'Without axis=1 apply walks the columns, not the rows — and even correct, it is far slower than multiplying.'],
      explain: 'Two columns multiplied row by row, in C. Assigning to a new name creates the column.' },
    lines: ["df['total'] = df['price'] * df['quantity']"],
    decoys: ["df.total = df['price'] * df['quantity']", "df['total'] = df.apply(lambda r: r['price'] * r['quantity'])"],
    written: { prompt: 'Write the line that adds a total column of price times quantity.', solution: "df['total'] = df['price'] * df['quantity']", must: ["df['total'] =", "df['price'] * df['quantity']"] },
    walk: [["df['total'] = df['price'] * df['quantity']", 'Check five rows with df[[\'price\', \'quantity\', \'total\']].head() before moving on.']] });

  T({ key: 's-newcol-round', group: S10, title: 'Round the new column',
    ask: 'Add that total column rounded to 2 decimal places.',
    why: 'The brackets decide what gets rounded — and getting them wrong is silent.',
    mcq: { q: 'Which rounds the TOTAL?',
      correct: "df['total'] = (df['price'] * df['quantity']).round(2)",
      wrong: ["df['total'] = df['price'] * df['quantity'].round(2)", "df['total'] = round(df['price'] * df['quantity'], 2)", "df['total'] = df['price'].round(2) * df['quantity'].round(2)"],
      whyWrong: [
        'Without the brackets the rounding lands on QUANTITY, and the total is not rounded at all.',
        "Python's built-in round on a Series raises TypeError.",
        'Rounding the inputs changes the arithmetic — 2.005 × 3 is not the same as 2.01 × 3.'],
      explain: 'Wrap the whole calculation in brackets, then round it. Round the answer, never the ingredients.' },
    lines: ["df['total'] = (df['price'] * df['quantity']).round(2)"],
    decoys: ["df['total'] = df['price'] * df['quantity'].round(2)", "df['total'] = round(df['price'] * df['quantity'], 2)"],
    written: { prompt: 'Write the line adding a rounded total column.', solution: "df['total'] = (df['price'] * df['quantity']).round(2)", must: ["(df['price'] * df['quantity']).round(2)"] },
    walk: [["df['total'] = (df['price'] * df['quantity']).round(2)", 'One pair of brackets is the entire lesson.']] });

  T({ key: 's-newcol-flag', group: S10, title: 'A 0/1 flag column',
    ask: 'Add a big_order column to df: 1 where total is over 100, 0 otherwise.',
    why: 'A flag can be summed (how many) and averaged (what share) — two answers from one column.',
    mcq: { q: 'Which makes the flag?',
      correct: "df['big_order'] = (df['total'] > 100).astype(int)",
      wrong: ["df['big_order'] = int(df['total'] > 100)", "df['big_order'] = (df['total'] > 100).astype(str)", "df['big_order'] = df['total'] > 100 ? 1 : 0"],
      whyWrong: [
        'int() on a whole Series raises — it wants one value.',
        'As text the flag can no longer be summed or averaged, which is the whole point of it.',
        'Python has no ternary ?: operator; the equivalent is "1 if cond else 0", and even that needs to be vectorised.'],
      explain: 'The comparison already gives True/False; .astype(int) turns those into 1 and 0.' },
    lines: ["df['big_order'] = (df['total'] > 100).astype(int)"],
    decoys: ["df['big_order'] = int(df['total'] > 100)", "df['big_order'] = (df['total'] > 100).astype(str)"],
    written: { prompt: 'Write the line adding a 0/1 big_order flag for totals over 100.', solution: "df['big_order'] = (df['total'] > 100).astype(int)", must: ["(df['total'] > 100)", 'astype(int)'] },
    walk: [["df['big_order'] = (df['total'] > 100).astype(int)", 'Then .sum() counts them and .mean() gives the share.']] });

  T({ key: 's-newcol-where', group: S10, lvl: 2, title: 'A column with two outcomes',
    ask: 'Add a band column to df saying high where score is over 50 and low otherwise.',
    why: 'The vectorised if/else. One line instead of a loop or an apply.',
    mcq: { q: 'Which sets the two labels?',
      correct: "df['band'] = np.where(df['score'] > 50, 'high', 'low')",
      wrong: ["df['band'] = np.where(df['score'] > 50, 'low', 'high')", "df['band'] = 'high' if df['score'] > 50 else 'low'", "df['band'] = np.where(df['score'] > 50)"],
      whyWrong: [
        'The outcomes are swapped: the TRUE result comes first.',
        'A plain if wants one true-or-false answer, so on a column it raises.',
        'np.where needs all three: the condition, the value when true, and the value when false.'],
      explain: "np.where(condition, value_if_true, value_if_false) — read left to right, exactly like the sentence." },
    lines: ["df['band'] = np.where(df['score'] > 50, 'high', 'low')"],
    decoys: ["df['band'] = np.where(df['score'] > 50, 'low', 'high')", "df['band'] = 'high' if df['score'] > 50 else 'low'"],
    written: { prompt: 'Write the line adding a band column: high over 50, low otherwise.', solution: "df['band'] = np.where(df['score'] > 50, 'high', 'low')", must: ['np.where(', "df['score'] > 50", "'high'", "'low'"] },
    walk: [["df['band'] = np.where(df['score'] > 50, 'high', 'low')", 'For more than two outcomes: np.select, or pd.cut for numeric bands.']] });

  T({ key: 's-drop-col', group: S10, title: 'Remove a column',
    ask: 'Drop the notes column from df.',
    why: 'The mirror of adding one — and columns= is the argument that stops it dropping a row instead.',
    mcq: { q: 'Which drops the column?',
      correct: "df = df.drop(columns=['notes'])",
      wrong: ["df = df.drop('notes')", "df.drop(columns=['notes'])", "del df.notes"],
      whyWrong: [
        'Without columns=, drop looks for a ROW labelled notes and raises KeyError.',
        'drop returns a new frame; without assigning it back, nothing changes.',
        "del works with df['notes'], not with attribute syntax."],
      explain: "drop(columns=[...]) and assign the result back. df.drop(columns=[...], inplace=True) is the other spelling." },
    lines: ["df = df.drop(columns=['notes'])"],
    decoys: ["df = df.drop('notes')", 'del df.notes'],
    written: { prompt: 'Write the line that drops the notes column from df.', solution: "df = df.drop(columns=['notes'])", must: ['drop(columns=', "'notes'"] },
    walk: [["df = df.drop(columns=['notes'])", 'Pass a list and you can drop several at once.']] });

  T({ key: 's-rename', group: S10, title: 'Rename a column',
    ask: 'Rename the column amt to amount in df.',
    why: 'A dict of old name to new name — and it only touches the ones you list.',
    mcq: { q: 'Which renames it?',
      correct: "df = df.rename(columns={'amt': 'amount'})",
      wrong: ["df = df.rename({'amt': 'amount'})", "df = df.rename(columns={'amount': 'amt'})", "df.columns = ['amount']"],
      whyWrong: [
        'Without columns=, rename tries to rename INDEX labels instead.',
        'The dict is old name first, new name second — this way round renames nothing.',
        'Assigning to df.columns replaces EVERY name, so it raises unless the frame has exactly one column.'],
      explain: "rename(columns={'old': 'new'}) — as many pairs as you like, and anything not listed is left alone." },
    lines: ["df = df.rename(columns={'amt': 'amount'})"],
    decoys: ["df = df.rename({'amt': 'amount'})", "df = df.rename(columns={'amount': 'amt'})"],
    written: { prompt: 'Write the line that renames amt to amount.', solution: "df = df.rename(columns={'amt': 'amount'})", must: ['rename(columns=', "'amt': 'amount'"] },
    walk: [["df = df.rename(columns={'amt': 'amount'})", 'Old on the left, new on the right — the same way round as a dictionary lookup.']] });

  /* ---- 11 · Tidy up the text ---- */
  T({ key: 's-str-lower', group: S11, title: 'Lower-case a column',
    ask: 'Make every value in the city column of df lower case.',
    why: '"London" and "LONDON" are two groups in a groupby and one city in real life.',
    mcq: { q: 'Which lower-cases the column?',
      correct: "df['city'] = df['city'].str.lower()",
      wrong: ["df['city'] = df['city'].lower()", "df['city'] = lower(df['city'])", "df['city'].str.lower()"],
      whyWrong: [
        'Text methods on a whole column live behind .str — without it you get AttributeError.',
        'There is no bare lower() function in Python.',
        'Right method, but the result is never assigned, so the column is unchanged.'],
      explain: 'df[col].str.lower() applies the string method to every value. Assign it back.' },
    lines: ["df['city'] = df['city'].str.lower()"],
    decoys: ["df['city'] = df['city'].lower()", "df['city'].str.lower()"],
    written: { prompt: 'Write the line that lower-cases the city column.', solution: "df['city'] = df['city'].str.lower()", must: ["df['city'] =", 'str.lower()'] },
    walk: [["df['city'] = df['city'].str.lower()", 'Every text method you know works this way: .str, then the method.']] });

  T({ key: 's-str-strip', group: S11, title: 'Trim the spaces off',
    ask: 'Remove the leading and trailing spaces from every city in df.',
    why: 'A trailing space is invisible and splits a group in two. This is the most valuable one-liner in cleaning.',
    mcq: { q: 'Which trims the column?',
      correct: "df['city'] = df['city'].str.strip()",
      wrong: ["df['city'] = df['city'].strip()", "df['city'] = df['city'].str.replace(' ', '')", "df['city'] = df['city'].str.trim()"],
      whyWrong: [
        'Missing .str, so it raises.',
        'That removes EVERY space, including the ones inside "New York".',
        'The method is called strip in Python, not trim.'],
      explain: 'strip() takes whitespace off both ends and leaves the middle alone.' },
    lines: ["df['city'] = df['city'].str.strip()"],
    decoys: ["df['city'] = df['city'].str.trim()", "df['city'] = df['city'].str.replace(' ', '')"],
    written: { prompt: 'Write the line that trims whitespace from the city column.', solution: "df['city'] = df['city'].str.strip()", must: ['str.strip()'] },
    walk: [["df['city'] = df['city'].str.strip()", 'Run nunique() before and after — the drop is the number of phantom cities you just merged.']] });

  T({ key: 's-str-chain', group: S11, lvl: 2, title: 'Trim and lower in one line',
    ask: 'Trim and lower-case the city column of df in a single line.',
    why: 'Methods chain left to right, and each one needs its own .str',
    mcq: { q: 'Which chains them correctly?',
      correct: "df['city'] = df['city'].str.strip().str.lower()",
      wrong: ["df['city'] = df['city'].str.strip().lower()", "df['city'] = df['city'].str.strip.lower", "df['city'] = df['city'].str(strip, lower)"],
      whyWrong: [
        'The second method also needs .str — after strip() you still have a Series, not a string.',
        'No brackets, so nothing runs at all.',
        '.str is an accessor, not a function you call with a list of methods.'],
      explain: 'Each text method needs its own .str: .str.strip().str.lower(). It reads left to right in the order it happens.' },
    lines: ["df['city'] = df['city'].str.strip().str.lower()"],
    decoys: ["df['city'] = df['city'].str.strip().lower()", "df['city'] = df['city'].str(strip, lower)"],
    written: { prompt: 'Write the line that strips and lower-cases the city column.', solution: "df['city'] = df['city'].str.strip().str.lower()", must: ['str.strip()', 'str.lower()'] },
    walk: [["df['city'] = df['city'].str.strip().str.lower()", 'Trim first, then lower. Order rarely matters here, but reading order does.']] });

  T({ key: 's-str-replace', group: S11, title: 'Swap something out',
    ask: 'Replace every dash in the code column of df with a space.',
    why: 'The same shape again, with two arguments instead of none.',
    mcq: { q: 'Which does the replacement?',
      correct: "df['code'] = df['code'].str.replace('-', ' ', regex=False)",
      wrong: ["df['code'] = df['code'].replace('-', ' ')", "df['code'] = df['code'].str.replace(' ', '-')", "df['code'] = df['code'].str.sub('-', ' ')"],
      whyWrong: [
        'Series.replace without .str swaps whole VALUES, so it only changes cells that are exactly "-".',
        'The arguments are the wrong way round — this puts dashes in.',
        'There is no .str.sub; that is the regex module.'],
      explain: "str.replace(old, new). Pass regex=False when the text is literal — it is faster and avoids surprises with . and *." },
    lines: ["df['code'] = df['code'].str.replace('-', ' ', regex=False)"],
    decoys: ["df['code'] = df['code'].replace('-', ' ')", "df['code'] = df['code'].str.sub('-', ' ')"],
    written: { prompt: 'Write the line replacing dashes with spaces in the code column.', solution: "df['code'] = df['code'].str.replace('-', ' ', regex=False)", must: ['str.replace(', "'-'", 'regex=False'] },
    walk: [["df['code'] = df['code'].str.replace('-', ' ', regex=False)", 'Without regex=False a dot or a bracket in the search text would be read as a pattern.']] });

  T({ key: 's-str-contains', group: S11, lvl: 2, title: 'Rows whose text contains something',
    ask: 'Keep the rows of df whose city contains the letters don.',
    why: 'The filter and the text accessor meeting — and na=False is the argument that saves you.',
    mcq: { q: 'Which keeps the matching rows?',
      correct: "df[df['city'].str.contains('don', na=False)]",
      wrong: ["df[df['city'].str.contains('don')]", "df[df['city'].contains('don')]", "df[df['city'] in 'don']"],
      whyWrong: [
        'If any city is missing, contains gives NaN for that row and the filter raises "cannot mask with non-boolean array".',
        'contains lives behind .str.',
        '`in` on a Series raises, and it would be asking the question backwards anyway.'],
      explain: "na=False treats missing values as 'no match' instead of letting them break the filter." },
    lines: ["df[df['city'].str.contains('don', na=False)]"],
    decoys: ["df[df['city'].str.contains('don')]", "df[df['city'].contains('don')]"],
    written: { prompt: 'Write the expression keeping rows whose city contains don.', solution: "df[df['city'].str.contains('don', na=False)]", must: ['str.contains(', "'don'", 'na=False'] },
    walk: [["df[df['city'].str.contains('don', na=False)]", 'It is a SUBSTRING match, so it also catches "New London". Use == when you mean exactly.']] });

  /* ---- 12 · Fix the types ---- */
  T({ key: 's-astype-int', group: S12, title: 'Turn a column into whole numbers',
    ask: 'Convert the count column of df to integers.',
    why: 'Types decide what a column can do. This is the simplest conversion there is.',
    mcq: { q: 'Which converts the column?',
      correct: "df['count'] = df['count'].astype(int)",
      wrong: ["df['count'] = int(df['count'])", "df['count'].astype(int)", "df['count'] = df['count'].astype('integer')"],
      whyWrong: [
        'int() wants a single value and raises on a whole column.',
        'astype gives back a new column; without assigning it, nothing changes.',
        "The name is int (or 'int64'), not 'integer'."],
      explain: "astype(int) converts the whole column. It raises if any value cannot be converted — including NaN." },
    lines: ["df['count'] = df['count'].astype(int)"],
    decoys: ["df['count'] = int(df['count'])", "df['count'].astype(int)"],
    written: { prompt: 'Write the line converting the count column to integers.', solution: "df['count'] = df['count'].astype(int)", must: ['astype(int)'] },
    walk: [["df['count'] = df['count'].astype(int)", "If the column has gaps, use astype('Int64') — the capital I version can hold missing values."]] });

  T({ key: 's-to-numeric', group: S12, lvl: 2, title: 'Convert text that might be rubbish',
    ask: 'Convert the amount column of df to numbers, turning anything unconvertible into a missing value.',
    why: 'Real files contain "n/a" and "£12". This is how you find out how many, without the script dying.',
    mcq: { q: 'Which converts and survives bad values?',
      correct: "df['amount'] = pd.to_numeric(df['amount'], errors='coerce')",
      wrong: ["df['amount'] = df['amount'].astype(float)", "df['amount'] = pd.to_numeric(df['amount'], errors='ignore')", "df['amount'] = pd.to_numeric(df['amount'], errors='raise')"],
      whyWrong: [
        'astype raises on the first bad value and stops, telling you nothing about how many there were.',
        "errors='ignore' leaves the WHOLE column as text if anything fails — it looks like it worked, and nothing downstream does.",
        "errors='raise' is the default: same crash, spelled out."],
      explain: "errors='coerce' turns the unconvertible values into NaN, so you can count them and decide what to do." },
    lines: ["df['amount'] = pd.to_numeric(df['amount'], errors='coerce')"],
    decoys: ["df['amount'] = pd.to_numeric(df['amount'], errors='ignore')", "df['amount'] = df['amount'].astype(float)"],
    written: { prompt: 'Write the line converting amount to numeric, coercing bad values to NaN.', solution: "df['amount'] = pd.to_numeric(df['amount'], errors='coerce')", must: ['pd.to_numeric', "errors='coerce'"] },
    walk: [["df['amount'] = pd.to_numeric(df['amount'], errors='coerce')", "Then df['amount'].isna().sum() tells you how many failed — which is the actual finding."]] });

  T({ key: 's-to-datetime', group: S12, title: 'Turn text into dates',
    ask: 'Convert the date column of df into real dates.',
    why: 'Until this line runs, your dates sort alphabetically and 2024-10 comes before 2024-2.',
    mcq: { q: 'Which converts the column to dates?',
      correct: "df['date'] = pd.to_datetime(df['date'])",
      wrong: ["df['date'] = df['date'].astype('date')", "df['date'] = pd.Timestamp(df['date'])", "df['date'] = datetime(df['date'])"],
      whyWrong: [
        "There is no 'date' dtype in pandas — the type is datetime64[ns].",
        'Timestamp converts a SINGLE value, not a column.',
        "datetime() builds one date from year, month and day numbers."],
      explain: 'pd.to_datetime parses the whole column. Add format= when the dates are British and pandas guesses American.' },
    lines: ["df['date'] = pd.to_datetime(df['date'])"],
    decoys: ["df['date'] = df['date'].astype('date')", "df['date'] = pd.Timestamp(df['date'])"],
    written: { prompt: 'Write the line converting the date column to real dates.', solution: "df['date'] = pd.to_datetime(df['date'])", must: ['pd.to_datetime', "df['date']"] },
    walk: [["df['date'] = pd.to_datetime(df['date'])", 'Now .dt.year, sorting and date filtering all work.']] });

  T({ key: 's-astype-str', group: S12, title: 'Keep an id as text',
    ask: 'Convert the id column of df to text.',
    why: 'Ids are labels, not quantities — as text they keep their leading zeros and never get averaged by accident.',
    mcq: { q: 'Which makes the column text?',
      correct: "df['id'] = df['id'].astype(str)",
      wrong: ["df['id'] = str(df['id'])", "df['id'] = df['id'].astype('string_')", "df['id'] = df['id'].to_string()"],
      whyWrong: [
        'str() on a whole column gives one long printed representation of the frame, not a converted column.',
        "The dtype is str or 'string', not 'string_'.",
        'to_string() renders the whole Series as one block of text for printing.'],
      explain: "astype(str) per value. The newer astype('string') gives a nullable text type that keeps NaN as NA." },
    lines: ["df['id'] = df['id'].astype(str)"],
    decoys: ["df['id'] = str(df['id'])", "df['id'] = df['id'].to_string()"],
    written: { prompt: 'Write the line converting the id column to text.', solution: "df['id'] = df['id'].astype(str)", must: ['astype(str)'] },
    walk: [["df['id'] = df['id'].astype(str)", 'Do this on read with dtype={"id": "str"} and the zeros never get lost in the first place.']] });

  /* ---- 13 · Group and total ---- */
  T({ key: 's-group-sum', group: S13, title: 'Total per group',
    ask: 'Total the amount column of df for each region.',
    why: 'The single most-asked question in analytics, in one line.',
    mcq: { q: 'Which totals amount per region?',
      correct: "df.groupby('region')['amount'].sum()",
      wrong: ["df.groupby('amount')['region'].sum()", "df.groupby('region').sum('amount')", "df['amount'].groupby('region').sum()"],
      whyWrong: [
        'Grouping by amount makes one group per distinct amount and then tries to add up text.',
        'The column is chosen with brackets before the statistic; sum() takes an axis, not a name.',
        'A single column has no idea what region is — group the FRAME, then pick the column.'],
      explain: 'Group by the label column, pick the number column, then say what to work out. Three decisions, left to right.' },
    lines: ["df.groupby('region')['amount'].sum()"],
    decoys: ["df.groupby('amount')['region'].sum()", "df['amount'].groupby('region').sum()"],
    written: { prompt: 'Write the expression totalling amount per region.', solution: "df.groupby('region')['amount'].sum()", must: ["groupby('region')", "['amount']", '.sum()'] },
    walk: [["df.groupby('region')['amount'].sum()", 'The result is a Series with the regions as its index.']] });

  T({ key: 's-group-mean', group: S13, title: 'Average per group',
    ask: 'Get the average amount for each region of df.',
    why: 'One word different from the last lesson. That is the whole ladder.',
    mcq: { q: 'Which averages amount per region?',
      correct: "df.groupby('region')['amount'].mean()",
      wrong: ["df.groupby('region')['amount'].average()", "df.groupby('region').mean()", "df.groupby('region')['amount'].sum() / len(df)"],
      whyWrong: [
        'There is no .average() on a groupby.',
        'That averages EVERY numeric column at once — more than you asked for, and it raises on text in older pandas.',
        'Dividing the group total by the WHOLE row count gives a number that is not any group\'s average.'],
      explain: 'Swap sum for mean. Every statistic works the same way: median, max, min, std, count.' },
    lines: ["df.groupby('region')['amount'].mean()"],
    decoys: ["df.groupby('region')['amount'].average()", "df.groupby('region').mean()"],
    written: { prompt: 'Write the expression giving the average amount per region.', solution: "df.groupby('region')['amount'].mean()", must: ["groupby('region')", '.mean()'] },
    walk: [["df.groupby('region')['amount'].mean()", 'Try .median() too when the groups have long tails.']] });

  T({ key: 's-group-size', group: S13, title: 'How many rows per group',
    ask: 'Count how many rows of df fall in each region.',
    why: 'A count per group is the other half of every summary table.',
    mcq: { q: 'Which counts rows per region?',
      correct: "df.groupby('region').size()",
      wrong: ["df.groupby('region').count()", "df.groupby('region').sum()", "df.groupby('region').nunique()"],
      whyWrong: [
        'count() gives one number PER COLUMN — a wide table of nearly identical numbers.',
        'sum() adds the numeric columns up rather than counting rows.',
        'nunique() counts distinct values in each column, which is a different question again.'],
      explain: 'size() counts rows, including ones with missing values. count() counts non-missing values per column.' },
    lines: ["df.groupby('region').size()"],
    decoys: ["df.groupby('region').count()", "df.groupby('region').nunique()"],
    written: { prompt: 'Write the expression counting rows per region.', solution: "df.groupby('region').size()", must: ["groupby('region').size()"] },
    walk: [["df.groupby('region').size()", 'Add .reset_index(name="orders") to turn it into a proper two-column table.']] });

  T({ key: 's-group-sort', group: S13, lvl: 2, title: 'Sort the group totals',
    ask: 'Total amount per region and put the biggest first.',
    why: 'Nobody reads an unsorted league table — and the sort goes on the END of the chain.',
    mcq: { q: 'Which gives the sorted totals?',
      correct: "df.groupby('region')['amount'].sum().sort_values(ascending=False)",
      wrong: ["df.groupby('region')['amount'].sum().sort_values()", "df.sort_values('amount', ascending=False).groupby('region')['amount'].sum()", "df.groupby('region')['amount'].sum().sort_index(ascending=False)"],
      whyWrong: [
        'That sorts smallest first — the default.',
        'Sorting before grouping changes nothing: the groupby re-orders by group key anyway.',
        'sort_index sorts by the REGION NAME, Z to A, not by the totals.'],
      explain: 'Group, aggregate, then sort what comes out. Each step works on the result of the last.' },
    lines: ["df.groupby('region')['amount'].sum().sort_values(ascending=False)"],
    decoys: ["df.groupby('region')['amount'].sum().sort_index(ascending=False)", "df.groupby('region')['amount'].sum().sort_values()"],
    written: { prompt: 'Write the expression giving region totals, biggest first.', solution: "df.groupby('region')['amount'].sum().sort_values(ascending=False)", must: ["groupby('region')", '.sum()', 'sort_values(ascending=False)'] },
    walk: [["df.groupby('region')['amount'].sum().sort_values(ascending=False)", 'Three steps chained. Read it left to right as a sentence.']] });

  T({ key: 's-group-reset', group: S13, lvl: 2, title: 'Turn the result back into a table',
    ask: 'Total amount per region and make it an ordinary two-column table.',
    why: 'A grouped result has the group as its INDEX, which trips up charting, joining and exporting.',
    mcq: { q: 'Which gives a normal table?',
      correct: "df.groupby('region')['amount'].sum().reset_index()",
      wrong: ["df.groupby('region')['amount'].sum().to_frame()", "df.groupby('region')['amount'].sum().reset_index(drop=True)", "pd.DataFrame(df.groupby('region')['amount'].sum())"],
      whyWrong: [
        'to_frame() makes it a DataFrame but leaves the regions as the index.',
        'drop=True THROWS THE REGIONS AWAY, leaving a column of numbers with no labels.',
        'Same as to_frame: a frame, still indexed by region.'],
      explain: 'reset_index() moves the group labels back into an ordinary column, which is what everything downstream expects.' },
    lines: ["df.groupby('region')['amount'].sum().reset_index()"],
    decoys: ["df.groupby('region')['amount'].sum().reset_index(drop=True)", "df.groupby('region')['amount'].sum().to_frame()"],
    written: { prompt: 'Write the expression giving region totals as a two-column table.', solution: "df.groupby('region')['amount'].sum().reset_index()", must: ["groupby('region')", 'reset_index()'] },
    walk: [["df.groupby('region')['amount'].sum().reset_index()", 'Two columns: region and amount. Now it charts, merges and exports like anything else.']] });
})();
