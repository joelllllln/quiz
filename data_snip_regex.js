/* Quickfire cards — regular expressions, from the first import to the patterns
   that actually turn up in data work: extracting, cleaning, validating, splitting. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var RE1 = 'Regex · the basics';
  var RE2 = 'Regex · patterns worth knowing';
  var RE3 = 'Regex · in pandas';

  window.SNIPPETS.push(

    /* ---- the basics ---- */
    { id: 're-import', group: RE1, lvl: 1,
      ask: 'Import the regular expression module',
      a: 'import re',
      note: 'Everything regex in Python starts here. The module is called re, short for regular expressions.' },

    { id: 're-search', group: RE1, lvl: 1,
      ask: 'Look for the pattern `pat` anywhere in the string `text`',
      a: 're.search(pat, text)',
      note: 'search looks ANYWHERE; match only looks at the start. This is the one you almost always want.' },

    { id: 're-match-start', group: RE1, lvl: 2,
      ask: 'Test whether `text` STARTS with the pattern `pat`',
      a: 're.match(pat, text)',
      note: 'A common wrong answer in tests: re.match does not search the whole string.' },

    { id: 're-fullmatch', group: RE1, lvl: 2,
      ask: 'Test whether the WHOLE of `text` matches the pattern `pat` end to end',
      a: 're.fullmatch(pat, text)',
      note: 'The honest way to validate a postcode or an ID — without it, a match at the start passes anything after it.' },

    { id: 're-found-bool', group: RE1, lvl: 1,
      ask: 'Turn a search for `pat` in `text` into a plain True or False',
      a: 'bool(re.search(pat, text))',
      note: 'search returns a match object or None, and None is falsy — so bool() gives you the flag.' },

    { id: 're-group0', group: RE1, lvl: 2,
      ask: 'Get the matched text out of the match object `m`',
      a: 'm.group()',
      alts: ['m.group(0)'],
      note: 'group() with no argument is the whole match; group(1) is the first bracketed part.' },

    { id: 're-group1', group: RE1, lvl: 2,
      ask: 'Get the FIRST bracketed capture group out of the match object `m`',
      a: 'm.group(1)',
      note: 'Groups are numbered from 1 left to right, by their opening bracket.' },

    { id: 're-findall', group: RE1, lvl: 1,
      ask: 'Get a list of every match of `pat` in `text`',
      a: 're.findall(pat, text)',
      note: 'With one capture group findall returns the group, not the whole match — a classic surprise.' },

    { id: 're-finditer', group: RE1, lvl: 3,
      ask: 'Loop over every match of `pat` in `text` as match objects',
      a: 're.finditer(pat, text)',
      note: 'Use this when you need positions or groups; findall when you only need the text.' },

    { id: 're-sub', group: RE1, lvl: 1,
      ask: 'Replace every match of `pat` in `text` with the word gone',
      a: "re.sub(pat, 'gone', text)",
      note: 'Arguments in that order: pattern, replacement, string. Getting them the wrong way round is the usual slip.' },

    { id: 're-sub-count', group: RE1, lvl: 3,
      ask: 'Replace only the FIRST match of `pat` in `text` with an empty string',
      a: "re.sub(pat, '', text, count=1)",
      note: 'count caps how many replacements happen.' },

    { id: 're-split', group: RE1, lvl: 2,
      ask: 'Split `text` on any run of whitespace using a regex',
      a: "re.split(r'\\s+', text)",
      note: 'text.split() already does this — reach for re.split when the separator is more than one character class.' },

    { id: 're-raw-string', group: RE1, lvl: 1,
      ask: 'Write the pattern for a literal digit class as a raw string',
      a: "r'\\d'",
      note: 'Always write patterns as raw strings: without the r, Python eats the backslash before re ever sees it.' },

    { id: 're-ignorecase', group: RE1, lvl: 2,
      ask: 'Search `text` for `pat` ignoring upper and lower case',
      a: 're.search(pat, text, re.IGNORECASE)',
      alts: ['re.search(pat, text, flags=re.IGNORECASE)', 're.search(pat, text, re.I)'],
      note: 're.I is the short form.' },

    { id: 're-compile', group: RE1, lvl: 3,
      ask: 'Compile the pattern `pat` once into a reusable object called `rx`',
      a: 'rx = re.compile(pat)',
      note: 'Worth it inside a loop over many rows: the pattern is parsed once instead of every call.' },

    { id: 're-escape', group: RE1, lvl: 3,
      ask: 'Escape the user-supplied string `word` so its punctuation is treated literally',
      a: 're.escape(word)',
      note: 'Anything a user typed goes through re.escape, or a stray "." or "(" changes the meaning of your pattern.' },

    /* ---- patterns worth knowing ---- */
    { id: 're-digits-run', group: RE2, lvl: 1,
      ask: 'Pattern for one or more digits',
      a: "r'\\d+'",
      note: '+ means one or more, * means zero or more, ? means optional.' },

    { id: 're-word-chars', group: RE2, lvl: 2,
      ask: 'Pattern for one or more word characters — letters, digits or underscore',
      a: "r'\\w+'",
      note: '\\W is the opposite: anything that is not a word character.' },

    { id: 're-whitespace', group: RE2, lvl: 2,
      ask: 'Pattern for a single whitespace character',
      a: "r'\\s'",
      note: 'Covers spaces, tabs and newlines. \\S is anything that is not whitespace.' },

    { id: 're-anychar', group: RE2, lvl: 2,
      ask: 'Pattern for any single character except a newline',
      a: "r'.'",
      note: 'To make it match newlines too, pass the re.DOTALL flag.' },

    { id: 're-anchors', group: RE2, lvl: 2,
      ask: 'Pattern for a string that is nothing but digits, start to end',
      a: "r'^\\d+$'",
      note: '^ anchors the start, $ the end. Without both, "12abc" would pass.' },

    { id: 're-exactly-n', group: RE2, lvl: 2,
      ask: 'Pattern for exactly four digits',
      a: "r'\\d{4}'",
      note: '{4} is exactly four, {2,4} is two to four, {2,} is two or more.' },

    { id: 're-char-class', group: RE2, lvl: 2,
      ask: 'Pattern for one lower-case letter a to z',
      a: "r'[a-z]'",
      note: 'Inside square brackets, a dash means a range and most punctuation loses its special meaning.' },

    { id: 're-not-class', group: RE2, lvl: 3,
      ask: 'Pattern for any character that is NOT a digit, using a character class',
      a: "r'[^0-9]'",
      note: 'A ^ as the FIRST thing inside the brackets negates the class. Anywhere else it is a literal ^.' },

    { id: 're-alternation', group: RE2, lvl: 2,
      ask: 'Pattern matching either the word cat or the word dog',
      a: "r'cat|dog'",
      note: 'The pipe is alternation. Wrap it in brackets when it sits inside a longer pattern.' },

    { id: 're-optional', group: RE2, lvl: 2,
      ask: 'Pattern for the word colour with the u optional',
      a: "r'colou?r'",
      note: '? makes the thing immediately before it optional.' },

    { id: 're-group-capture', group: RE2, lvl: 2,
      ask: 'Pattern capturing the number out of the text "order 123"',
      a: "r'order (\\d+)'",
      note: 'The brackets are the capture; everything else just has to match.' },

    { id: 're-named-group', group: RE2, lvl: 3,
      ask: 'Pattern capturing a run of digits into a group named year',
      a: "r'(?P<year>\\d+)'",
      note: 'Then m.group("year") — far easier to read than group(1) six months later.' },

    { id: 're-noncapture', group: RE2, lvl: 3,
      ask: 'Group cat or dog WITHOUT capturing it',
      a: "r'(?:cat|dog)'",
      note: '(?: ... ) groups for the alternation but keeps the group numbers clean.' },

    { id: 're-lazy', group: RE2, lvl: 3,
      ask: 'Pattern matching as FEW characters as possible between two angle brackets',
      a: "r'<.*?>'",
      note: '.* is greedy and would run to the last bracket in the line; .*? stops at the first.' },

    { id: 're-word-boundary', group: RE2, lvl: 3,
      ask: 'Pattern matching the word cat only as a whole word',
      a: "r'\\bcat\\b'",
      note: '\\b is a word boundary — without it, "concatenate" matches.' },

    { id: 're-email-rough', group: RE2, lvl: 3,
      ask: 'A workable pattern for an email address: something, an at sign, a domain, a dot, a suffix',
      a: "r'^[^@\\s]+@[^@\\s]+\\.[a-z]{2,}$'",
      note: 'Nobody writes a perfect email regex. A rough one plus a confirmation email is the real answer.' },

    { id: 're-strip-punct', group: RE2, lvl: 2,
      ask: 'Remove every character from `text` that is not a letter, digit or space',
      a: "re.sub(r'[^A-Za-z0-9 ]', '', text)",
      note: 'The workhorse of text cleaning, one line before you lower() and split().' },

    { id: 're-squeeze-space', group: RE2, lvl: 2,
      ask: 'Collapse any run of whitespace in `text` down to a single space',
      a: "re.sub(r'\\s+', ' ', text)",
      note: 'Pair it with .strip() to tidy scraped text completely.' },

    { id: 're-sub-group-ref', group: RE2, lvl: 3,
      ask: 'Rewrite dates in `text` from 2024-05-01 into 01/05/2024 in one substitution',
      a: "re.sub(r'(\\d{4})-(\\d{2})-(\\d{2})', r'\\3/\\2/\\1', text)",
      note: 'In the replacement, \\1 \\2 \\3 refer back to the captured groups — and it is a raw string too.' },

    /* ---- in pandas ---- */
    { id: 're-pd-contains', group: RE3, lvl: 1,
      ask: 'Keep the rows of df where "email" matches the pattern `pat`',
      a: "df[df['email'].str.contains(pat, na=False)]",
      note: 'na=False stops missing values raising. str.contains treats its argument as a regex by default.' },

    { id: 're-pd-literal', group: RE3, lvl: 2,
      ask: 'Find rows where "code" contains a literal full stop, not any character',
      a: "df[df['code'].str.contains('.', regex=False)]",
      note: 'regex=False is the switch people forget — with it on, "." matches everything.' },

    { id: 're-pd-extract', group: RE3, lvl: 2,
      ask: 'Pull the first run of digits out of "ref" into a new column',
      a: "df['ref'].str.extract(r'(\\d+)')",
      note: 'extract needs at least one capture group and gives one column per group.' },

    { id: 're-pd-extract-named', group: RE3, lvl: 3,
      ask: 'Extract a four-digit year from "ref" into a column named year',
      a: "df['ref'].str.extract(r'(?P<year>\\d{4})')",
      note: 'Named groups become the column names, which saves a rename.' },

    { id: 're-pd-extractall', group: RE3, lvl: 3,
      ask: 'Get EVERY number in each "notes" cell, not just the first',
      a: "df['notes'].str.extractall(r'(\\d+)')",
      note: 'Returns a multi-indexed frame with one row per match — unstack or groupby it afterwards.' },

    { id: 're-pd-replace', group: RE3, lvl: 2,
      ask: 'Strip every non-digit character out of the "phone" column',
      a: "df['phone'].str.replace(r'\\D', '', regex=True)",
      note: 'Since pandas 2.0 you must say regex=True explicitly. \\D is any non-digit.' },

    { id: 're-pd-count', group: RE3, lvl: 3,
      ask: 'Count how many digits appear in each "notes" cell',
      a: "df['notes'].str.count(r'\\d')",
      note: 'Counts matches per cell — a quick numeric feature straight out of free text.' },

    { id: 're-pd-fullmatch', group: RE3, lvl: 3,
      ask: 'Flag rows where the whole of "postcode" matches the pattern `pat`',
      a: "df['postcode'].str.fullmatch(pat)",
      note: 'The validation version: contains would pass a postcode with rubbish glued to the end.' },

    { id: 're-pd-split-expand', group: RE3, lvl: 2,
      ask: 'Split "full_name" on whitespace into separate columns',
      a: "df['full_name'].str.split(r'\\s+', expand=True, regex=True)",
      note: 'expand=True is what turns the lists into columns.' }
  );
})();
