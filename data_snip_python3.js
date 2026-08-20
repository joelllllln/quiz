/* Quickfire cards — core Python, part 3: functions, errors, files, classes and the
   standard-library corners that turn up in real work and in coding tests. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var FUN = 'Python · functions';
  var ERR = 'Python · errors & files';
  var OOP = 'Python · classes & modules';
  var STD = 'Python · standard library';

  window.SNIPPETS.push(

    /* ---- functions ---- */
    { id: 'py-def', group: FUN, lvl: 1,
      ask: 'Define a function called greet taking one argument, name',
      a: 'def greet(name):' },

    { id: 'py-return', group: FUN, lvl: 1,
      ask: 'Return the value x from a function',
      a: 'return x',
      note: 'A function with no return gives back None.' },

    { id: 'py-default-arg', group: FUN, lvl: 1,
      ask: 'Define add taking a and b, where b defaults to 0',
      a: 'def add(a, b=0):',
      note: 'Never default to a list or dict — the same object is shared across every call.' },

    { id: 'py-args', group: FUN, lvl: 3,
      ask: 'Define a function total that takes any number of positional arguments',
      a: 'def total(*args):',
      note: 'args arrives as a tuple.' },

    { id: 'py-kwargs', group: FUN, lvl: 3,
      ask: 'Define a function setup that takes any number of keyword arguments',
      a: 'def setup(**kwargs):',
      note: 'kwargs arrives as a dict.' },

    { id: 'py-lambda', group: FUN, lvl: 2,
      ask: 'Write an anonymous function that doubles its argument',
      a: 'lambda x: x * 2',
      note: 'One expression only — anything longer wants a def.' },

    { id: 'py-typehint', group: FUN, lvl: 2,
      ask: 'Define add(a, b) with type hints saying both are ints and it returns an int',
      a: 'def add(a: int, b: int) -> int:',
      note: 'Hints are documentation, not enforcement — but interviewers notice them.' },

    { id: 'py-docstring', group: FUN, lvl: 2,
      ask: 'Write the opening of a docstring inside a function',
      a: '"""Return the sum of a and b."""',
      note: 'Triple quotes, first line a one-sentence summary.' },

    { id: 'py-func-multi-return', group: FUN, lvl: 2,
      ask: 'Return both the minimum and maximum of `nums` from a function',
      a: 'return min(nums), max(nums)',
      note: 'Returning several values really returns one tuple.' },

    { id: 'py-recursion', group: FUN, lvl: 3,
      ask: 'The base case of a recursive factorial: return 1 when n is 0 or 1',
      a: 'if n <= 1: return 1',
      note: 'Write the base case first — that is what stops the recursion.' },

    { id: 'py-yield', group: FUN, lvl: 3,
      ask: 'Produce a value from a generator function without ending it',
      a: 'yield x',
      note: 'yield makes the function lazy: values come out one at a time, on demand.' },

    { id: 'py-decorator-use', group: FUN, lvl: 3,
      ask: 'Apply the decorator `timer` to the function below it',
      a: '@timer',
      note: 'Sugar for f = timer(f).' },

    { id: 'py-lru-cache', group: FUN, lvl: 3,
      ask: 'Cache a function\'s results with the standard-library decorator',
      a: '@lru_cache',
      alts: ['@lru_cache(maxsize=None)', '@functools.lru_cache'],
      note: 'from functools import lru_cache. Turns exponential recursion into linear.' },

    { id: 'py-main-guard', group: FUN, lvl: 2,
      ask: 'Write the guard that runs code only when the file is executed directly',
      a: "if __name__ == '__main__':",
      note: 'Stops your script running when someone imports it.' },

    /* ---- errors & files ---- */
    { id: 'py-try', group: ERR, lvl: 1,
      ask: 'Start a try block',
      a: 'try:' },

    { id: 'py-except', group: ERR, lvl: 1,
      ask: 'Catch a ValueError and bind it to the name e',
      a: 'except ValueError as e:',
      note: 'Catch the narrowest exception you can — bare except: hides real bugs.' },

    { id: 'py-except-two', group: ERR, lvl: 2,
      ask: 'Catch either a ValueError or a TypeError in one clause',
      a: 'except (ValueError, TypeError):',
      note: 'A tuple of exception types.' },

    { id: 'py-finally', group: ERR, lvl: 2,
      ask: 'Write the block that runs whether or not an exception happened',
      a: 'finally:' },

    { id: 'py-raise', group: ERR, lvl: 2,
      ask: 'Raise a ValueError with the message "bad input"',
      a: "raise ValueError('bad input')",
      note: 'Fail loudly and early — a silent wrong answer is worse than a crash.' },

    { id: 'py-assert', group: ERR, lvl: 2,
      ask: 'Assert that `nums` is not empty, with the message: nums must not be empty',
      a: "assert nums, 'nums must not be empty'",
      note: 'Great in tests and notebooks; stripped out when Python runs with -O.' },

    { id: 'py-zerodiv', group: ERR, lvl: 2,
      ask: 'Catch a division-by-zero error',
      a: 'except ZeroDivisionError:' },

    { id: 'py-keyerror', group: ERR, lvl: 2,
      ask: 'Catch a missing-dictionary-key error',
      a: 'except KeyError:',
      note: 'IndexError is its list-shaped cousin.' },

    { id: 'py-open-read', group: ERR, lvl: 1,
      ask: 'Open "data.txt" for reading with a context manager, as f',
      a: "with open('data.txt') as f:",
      note: 'with closes the file for you, even if the block raises.' },

    { id: 'py-read-lines', group: ERR, lvl: 1,
      ask: 'Read every line of the open file f into a list',
      a: 'lines = f.readlines()',
      alts: ['lines = f.read().splitlines()'],
      note: 'Looping over f directly is the memory-friendly version.' },

    { id: 'py-open-write', group: ERR, lvl: 1,
      ask: 'Open "out.txt" for writing, as f',
      a: "with open('out.txt', 'w') as f:",
      note: "'w' truncates the file, 'a' appends to it." },

    { id: 'py-write-line', group: ERR, lvl: 2,
      ask: 'Write the string s followed by a newline to the open file f',
      a: "f.write(s + '\\n')",
      note: 'write does not add a newline of its own.' },

    { id: 'py-json-load', group: ERR, lvl: 2,
      ask: 'Parse the JSON in the open file f into a Python object',
      a: 'data = json.load(f)',
      note: 'json.loads (with an s) parses a string instead of a file.' },

    { id: 'py-json-dump', group: ERR, lvl: 2,
      ask: 'Write the object `data` to the open file f as JSON, indented by 2',
      a: 'json.dump(data, f, indent=2)' },

    { id: 'py-json-str', group: ERR, lvl: 2,
      ask: 'Turn the object `data` into a JSON string',
      a: 'json.dumps(data)' },

    { id: 'py-csv-reader', group: ERR, lvl: 3,
      ask: 'Read the open CSV file f row by row as dictionaries',
      a: 'reader = csv.DictReader(f)',
      note: 'The header row becomes the keys. csv.reader gives plain lists.' },

    /* ---- classes & modules ---- */
    { id: 'py-class', group: OOP, lvl: 2,
      ask: 'Define a class called Model',
      a: 'class Model:',
      note: 'Capitalised by convention.' },

    { id: 'py-init', group: OOP, lvl: 2,
      ask: 'Write the constructor of a class taking self and name',
      a: 'def __init__(self, name):',
      note: 'Runs when the object is created; self is the instance.' },

    { id: 'py-self-attr', group: OOP, lvl: 2,
      ask: 'Store the argument `name` on the instance',
      a: 'self.name = name' },

    { id: 'py-method', group: OOP, lvl: 2,
      ask: 'Define a method predict taking self and X',
      a: 'def predict(self, X):',
      note: 'Every instance method takes self as its first argument.' },

    { id: 'py-inherit', group: OOP, lvl: 3,
      ask: 'Define a class Child that inherits from Parent',
      a: 'class Child(Parent):' },

    { id: 'py-super', group: OOP, lvl: 3,
      ask: 'Call the parent class\'s constructor with the argument name',
      a: 'super().__init__(name)' },

    { id: 'py-repr', group: OOP, lvl: 3,
      ask: 'Define the method that gives a developer-readable string for an object',
      a: 'def __repr__(self):',
      note: '__repr__ is what the console shows; __str__ is what print() prefers.' },

    { id: 'py-dataclass', group: OOP, lvl: 3,
      ask: 'Import the decorator that writes __init__ and __repr__ for you',
      a: 'from dataclasses import dataclass',
      note: 'Then @dataclass above a class of annotated fields.' },

    { id: 'py-import-from', group: OOP, lvl: 1,
      ask: 'Import just the sqrt function from the math module',
      a: 'from math import sqrt' },

    { id: 'py-import-as', group: OOP, lvl: 1,
      ask: 'Import the module `statsmodels.api`, renaming it to sm on the way in',
      a: 'import statsmodels.api as sm',
      note: '"import X as Y" renames anything on import — pd, np, plt and sns all come from this one form.' },

    { id: 'py-type', group: OOP, lvl: 1,
      ask: 'Check the type of the object x',
      a: 'type(x)',
      note: 'isinstance(x, int) is the right check inside an if — it respects inheritance.' },

    { id: 'py-isinstance', group: OOP, lvl: 2,
      ask: 'Check whether x is a string',
      a: 'isinstance(x, str)' },

    { id: 'py-dir', group: OOP, lvl: 2,
      ask: 'List the attributes and methods available on the object x',
      a: 'dir(x)',
      note: 'help(x) prints the documentation instead.' },

    { id: 'py-pip-install', group: OOP, lvl: 1,
      ask: 'Install pandas from inside a Jupyter notebook cell',
      a: '!pip install pandas',
      note: 'The ! runs a shell command from the notebook.' },

    /* ---- standard library ---- */
    { id: 'py-datetime-import', group: STD, lvl: 1,
      ask: 'Import the datetime class from the datetime module',
      a: 'from datetime import datetime',
      note: 'The module and the class share a name — this import trips everyone up once.' },

    { id: 'py-datetime-now', group: STD, lvl: 1,
      ask: 'Get the current date and time',
      a: 'datetime.now()' },

    { id: 'py-date-today', group: STD, lvl: 2,
      ask: 'Get today\'s date with no time attached',
      a: 'date.today()',
      note: 'from datetime import date first.' },

    { id: 'py-strftime-py', group: STD, lvl: 2,
      ask: 'Format the datetime `dt` as YYYY-MM-DD',
      a: "dt.strftime('%Y-%m-%d')",
      note: 'strftime formats out; strptime parses in.' },

    { id: 'py-strptime', group: STD, lvl: 3,
      ask: 'Parse the string "2024-01-31" into a datetime',
      a: "datetime.strptime('2024-01-31', '%Y-%m-%d')" },

    { id: 'py-timedelta-py', group: STD, lvl: 2,
      ask: 'Make a 7-day timedelta',
      a: 'timedelta(days=7)',
      note: 'from datetime import timedelta. Add it to a datetime to move through time.' },

    { id: 'py-os-listdir', group: STD, lvl: 2,
      ask: 'List the filenames in the current directory',
      a: "os.listdir('.')",
      alts: ['os.listdir()'],
      note: 'import os first. pathlib is the modern alternative.' },

    { id: 'py-path-join', group: STD, lvl: 2,
      ask: 'Join a folder and a filename into a path, portably',
      a: "os.path.join(folder, filename)",
      note: 'Never build paths with string concatenation and slashes.' },

    { id: 'py-pathlib', group: STD, lvl: 3,
      ask: 'Import Path, the modern way to handle file paths',
      a: 'from pathlib import Path',
      note: 'Path(\'data\') / \'file.csv\' builds paths with a slash operator.' },

    { id: 'py-glob', group: STD, lvl: 3,
      ask: 'List every CSV file in the "data" folder using glob',
      a: "glob.glob('data/*.csv')",
      note: 'import glob. The classic first line of a "load every file" loop.' },

    { id: 'py-re-import', group: STD, lvl: 2,
      ask: 'Import the regular expression module',
      a: 'import re' },

    { id: 'py-re-findall', group: STD, lvl: 3,
      ask: 'Find every run of digits in the string s with a regex',
      a: "re.findall(r'\\d+', s)",
      note: 'The r prefix stops Python eating the backslashes.' },

    { id: 'py-re-sub', group: STD, lvl: 3,
      ask: 'Remove every non-letter character from s with a regex',
      a: "re.sub(r'[^a-zA-Z]', '', s)",
      note: 'sub(pattern, replacement, string) — the regex find-and-replace.' },

    { id: 'py-re-match', group: STD, lvl: 3,
      ask: 'Test whether the string s contains a match for `pattern`',
      a: 're.search(pattern, s)',
      note: 'search looks anywhere; match only anchors at the start.' },

    { id: 'py-time-now', group: STD, lvl: 2,
      ask: 'Record the current time to measure how long something takes',
      a: 'start = time.time()',
      note: 'import time. Subtract at the end for the elapsed seconds.' },

    { id: 'py-sleep', group: STD, lvl: 2,
      ask: 'Pause the program for 2 seconds',
      a: 'time.sleep(2)' },

    { id: 'py-warnings', group: STD, lvl: 3,
      ask: 'Silence Python warnings in a notebook',
      a: "warnings.filterwarnings('ignore')",
      note: 'import warnings. Use it late — warnings usually deserve a read first.' },

    { id: 'py-copy-deep', group: STD, lvl: 3,
      ask: 'Take a deep copy of the nested object `obj`',
      a: 'copy.deepcopy(obj)',
      note: 'import copy. A shallow copy still shares the inner lists.' },

    { id: 'py-pickle-dump', group: STD, lvl: 3,
      ask: 'Pickle the object `model` into the open binary file f',
      a: 'pickle.dump(model, f)',
      note: 'Open the file with \'wb\'. Never unpickle a file you did not create.' }
  );
})();
