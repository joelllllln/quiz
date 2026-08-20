/* Quickfire cards — data structures and algorithms, the way a coding test asks about them.
   Complexity you can quote, the structures Python actually gives you, and the handful of
   patterns that solve most screening questions. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var BIG = 'Algorithms · cost & complexity';
  var STR = 'Algorithms · the structures';
  var PAT = 'Algorithms · the patterns';
  var REC = 'Algorithms · recursion & trees';

  window.SNIPPETS.push(

    /* ---- complexity ---- */
    { id: 'dsa-o-list-in', group: BIG, lvl: 1,
      ask: 'What is the cost of `x in my_list` for a list of n items? (write it as O(...))',
      a: 'O(n)',
      note: 'It scans until it finds x. On a set or dict key it is O(1) — that swap is the most common speed-up there is.' },

    { id: 'dsa-o-set-in', group: BIG, lvl: 1,
      ask: 'Cost of `x in my_set` for a set of n items',
      a: 'O(1)',
      note: 'Hashing jumps straight to the bucket. The same for a dict key.' },

    { id: 'dsa-o-sort', group: BIG, lvl: 1,
      ask: 'Cost of sorted(items) for n items',
      a: 'O(n log n)',
      note: 'Python uses Timsort — and it is already O(n) on data that is nearly sorted.' },

    { id: 'dsa-o-nested', group: BIG, lvl: 1,
      ask: 'Cost of a loop inside a loop, each over n items',
      a: 'O(n^2)',
      alts: ['O(n²)', 'O(n*n)'],
      note: 'Fine at 100 items, hopeless at 100,000. Any hidden test that mentions size is checking for this.' },

    { id: 'dsa-o-binary', group: BIG, lvl: 1,
      ask: 'Cost of binary search on a sorted list of n items',
      a: 'O(log n)',
      note: 'Each step throws half of what is left away — 20 steps covers a million items.' },

    { id: 'dsa-o-append', group: BIG, lvl: 2,
      ask: 'Cost of list.append(x)',
      a: 'O(1)',
      note: 'Amortised: it occasionally reallocates, but the average cost per append is constant.' },

    { id: 'dsa-o-insert-front', group: BIG, lvl: 2,
      ask: 'Cost of items.insert(0, x) on a list of n items',
      a: 'O(n)',
      note: 'Everything shifts up one. A collections.deque does the same job in O(1).' },

    { id: 'dsa-o-dict-get', group: BIG, lvl: 1,
      ask: 'Cost of looking a key up in a dict',
      a: 'O(1)',
      note: 'Average case. It degrades only with pathological hash collisions, which you will not meet.' },

    { id: 'dsa-o-slice', group: BIG, lvl: 2,
      ask: 'Cost of copying a list with items[:]',
      a: 'O(n)',
      note: 'Slicing always copies, so a slice inside a loop quietly makes the loop O(n²).' },

    { id: 'dsa-o-space-dict', group: BIG, lvl: 2,
      ask: 'Extra SPACE used by the "remember what you have seen" dict trick, for n items',
      a: 'O(n)',
      note: 'The standard trade: memory for speed. Say it out loud in an interview — they are listening for it.' },

    { id: 'dsa-o-string-concat', group: BIG, lvl: 3,
      ask: 'Cost of building a string by += inside a loop over n pieces',
      a: 'O(n^2)',
      alts: ['O(n²)'],
      note: 'Each += copies the whole string so far. Collect into a list and join once — that is O(n).' },

    { id: 'dsa-o-heap-push', group: BIG, lvl: 3,
      ask: 'Cost of pushing onto a heap of n items',
      a: 'O(log n)',
      note: 'Which is why "top k of n" is O(n log k) with a heap rather than O(n log n) with a sort.' },

    { id: 'dsa-recursion-space', group: BIG, lvl: 2,
      ask: 'Extra memory a recursion n calls deep uses',
      a: 'O(n)',
      note: 'Every open call keeps a frame on the stack. A good complexity answer always covers space as well as time.' },

    { id: 'dsa-o-drop-constants', group: BIG, lvl: 2,
      ask: 'Simplify O(2n + 5) to its big-O form',
      a: 'O(n)',
      note: 'Constants and lower-order terms drop out — big-O describes how it GROWS, not how long it takes.' },

    { id: 'dsa-o-two-loops', group: BIG, lvl: 2,
      ask: 'Two separate loops over n, one after the other: what is the complexity?',
      a: 'O(n)',
      note: 'Sequential loops ADD (2n, so O(n)); nested loops MULTIPLY (n², so O(n²)).' },

    /* ---- the structures ---- */
    { id: 'dsa-stack-push', group: STR, lvl: 1,
      ask: 'Push x onto a stack held in the list `stack`',
      a: 'stack.append(x)',
      note: 'A plain list IS a stack: append to push, pop() to pop. Both O(1) at the end.' },

    { id: 'dsa-stack-pop', group: STR, lvl: 1,
      ask: 'Take the top item off the stack `stack`',
      a: 'stack.pop()',
      note: 'Last in, first out. Check `if stack:` first — popping an empty list raises IndexError.' },

    { id: 'dsa-stack-peek', group: STR, lvl: 2,
      ask: 'Look at the top of `stack` without removing it',
      a: 'stack[-1]' },

    { id: 'dsa-deque-make', group: STR, lvl: 2,
      ask: 'Make a queue called `queue` using collections',
      a: 'queue = deque()',
      note: 'from collections import deque. O(1) at both ends, unlike a list.' },

    { id: 'dsa-queue-push', group: STR, lvl: 2,
      ask: 'Add x to the back of the deque `queue`',
      a: 'queue.append(x)' },

    { id: 'dsa-queue-pop', group: STR, lvl: 2,
      ask: 'Take the next item off the FRONT of the deque `queue`',
      a: 'queue.popleft()',
      note: 'First in, first out — the line that makes a breadth-first search a breadth-first search.' },

    { id: 'dsa-deque-appendleft', group: STR, lvl: 3,
      ask: 'Add x to the front of the deque `queue`',
      a: 'queue.appendleft(x)' },

    { id: 'dsa-deque-maxlen', group: STR, lvl: 3,
      ask: 'Make a deque called `window` that only ever keeps the last 5 items added',
      a: 'window = deque(maxlen=5)',
      note: 'A sliding window that throws away the old end for you.' },

    { id: 'dsa-heap-import', group: STR, lvl: 2,
      ask: 'Import the heap module',
      a: 'import heapq',
      note: 'A min-heap over a plain list. For a max-heap, push negated values.' },

    { id: 'dsa-heap-push', group: STR, lvl: 3,
      ask: 'Push x onto the heap `heap`',
      a: 'heapq.heappush(heap, x)' },

    { id: 'dsa-heap-pop', group: STR, lvl: 3,
      ask: 'Take the SMALLEST item off the heap `heap`',
      a: 'heapq.heappop(heap)',
      note: 'Python heaps are min-heaps: the smallest comes out first.' },

    { id: 'dsa-heap-nlargest', group: STR, lvl: 2,
      ask: 'Get the 3 largest items of `nums` with heapq',
      a: 'heapq.nlargest(3, nums)',
      note: 'O(n log k) — better than sorting the whole list when k is small.' },

    { id: 'dsa-heapify', group: STR, lvl: 3,
      ask: 'Turn the list `nums` into a heap in place',
      a: 'heapq.heapify(nums)',
      note: 'O(n), which is cheaper than pushing them one at a time.' },

    { id: 'dsa-counter-make', group: STR, lvl: 1,
      ask: 'Count how often each item appears in `items`, using collections',
      a: 'Counter(items)',
      note: 'from collections import Counter. It is a dict that starts every key at 0.' },

    { id: 'dsa-defaultdict-int', group: STR, lvl: 2,
      ask: 'Make a dict called `counts` whose missing keys start at 0',
      a: 'counts = defaultdict(int)',
      note: 'Then counts[k] += 1 needs no setup. defaultdict(list) does the same for grouping.' },

    { id: 'dsa-set-seen', group: STR, lvl: 1,
      ask: 'Make an empty set called seen to remember what you have passed',
      a: 'seen = set()',
      note: 'The single most useful line in a screening test: it turns a backwards search into a lookup.' },

    { id: 'dsa-set-add-check', group: STR, lvl: 2,
      ask: 'Inside a loop, skip the item if it is already in `seen`',
      a: 'if item in seen:\n    continue',
      note: 'Then seen.add(item) afterwards. Check before you add, or everything looks like a duplicate.' },

    { id: 'dsa-tuple-key', group: STR, lvl: 3,
      ask: 'Use the pair (row, col) as a dictionary key for the position `pos`',
      a: 'grid[(row, col)] = pos',
      alts: ['grid[row, col] = pos'],
      note: 'Tuples are hashable, so they make perfect keys — the usual way to store a sparse grid.' },

    { id: 'dsa-namedtuple', group: STR, lvl: 3,
      ask: 'Import namedtuple from collections',
      a: 'from collections import namedtuple',
      note: 'A tuple whose fields have names — a dataclass with less ceremony.' },

    { id: 'dsa-graph-dict', group: STR, lvl: 2,
      ask: 'Represent a graph where node a leads to b and c',
      a: "graph = {'a': ['b', 'c']}",
      note: 'An adjacency list: a dict of node → neighbours. That is all a graph question needs.' },

    /* ---- the patterns ---- */
    { id: 'dsa-two-pointer', group: PAT, lvl: 2,
      ask: 'Start the two pointers for a walk in from both ends of `items`',
      a: 'left, right = 0, len(items) - 1',
      note: 'Then `while left < right:` and move whichever end you have finished with.' },

    { id: 'dsa-two-pointer-loop', group: PAT, lvl: 2,
      ask: 'Write the loop header for a two-pointer walk that stops when they meet',
      a: 'while left < right:',
      note: '`<` not `<=`, or the two pointers land on the same element and compare it with itself.' },

    { id: 'dsa-window-slide', group: PAT, lvl: 3,
      ask: 'Slide a window of size k along `nums`: update the running total for step i',
      a: 'window += nums[i] - nums[i - k]',
      note: 'Add what came in, subtract what went out. This is what turns O(n·k) into O(n).' },

    { id: 'dsa-prefix-sum', group: PAT, lvl: 3,
      ask: 'Build the running totals of `nums` with itertools',
      a: 'list(accumulate(nums))',
      note: 'from itertools import accumulate. Prefix sums answer "the total between i and j" in O(1).' },

    { id: 'dsa-seen-index', group: PAT, lvl: 2,
      ask: 'Record that `n` was seen at position `i` in the dict `seen`',
      a: 'seen[n] = i',
      note: 'Value → position. Look up `target - n` in it and two-sum falls out in one pass.' },

    { id: 'dsa-sort-key-tuple', group: PAT, lvl: 2,
      ask: 'Sort `rows` by count descending, breaking ties by name ascending',
      a: 'sorted(rows, key=lambda r: (-r.count, r.name))',
      note: 'Negate the field you want descending. Sorting by a tuple sorts by each part in turn.' },

    { id: 'dsa-groupby-dict', group: PAT, lvl: 2,
      ask: 'Group `rows` into the defaultdict `groups` by each row\'s `key`',
      a: 'groups[row.key].append(row)',
      note: 'With groups = defaultdict(list) above it. Grouping is a dict, not a sort.' },

    { id: 'dsa-early-return', group: PAT, lvl: 1,
      ask: 'Return True from inside a loop the moment you find a match',
      a: 'return True',
      note: 'Returning inside the loop exits the whole function — that is what makes a search stop early.' },

    { id: 'dsa-any-generator', group: PAT, lvl: 2,
      ask: 'Ask whether any item in `items` is over the limit, in one line',
      a: 'any(item > limit for item in items)',
      note: 'any stops at the first True, so it is the one-line version of an early return.' },

    { id: 'dsa-min-max-track', group: PAT, lvl: 2,
      ask: 'Start a "best so far" variable at infinity, for a search for the SMALLEST value',
      a: "best = float('inf')",
      note: 'Start at infinity so the first real value always wins. Use -inf when hunting a maximum.' },

    { id: 'dsa-swap', group: PAT, lvl: 1,
      ask: 'Swap items at positions i and j in the list `items`',
      a: 'items[i], items[j] = items[j], items[i]',
      note: 'The right side is built first, so no temporary variable is needed.' },

    { id: 'dsa-walk-backwards', group: PAT, lvl: 2,
      ask: 'Loop over `items` from the last element back to the first',
      a: 'for x in reversed(items):',
      alts: ['for x in items[::-1]:'],
      note: 'reversed() walks the list without copying it; items[::-1] builds a whole new list first.' },

    { id: 'dsa-count-distinct', group: PAT, lvl: 1,
      ask: 'Count how many DISTINCT values `items` holds',
      a: 'len(set(items))',
      note: 'The one-line answer to "how many unique". Only works when the values are hashable.' },

    { id: 'dsa-binary-mid', group: PAT, lvl: 2,
      ask: 'Work out the middle index between low and high, in a binary search',
      a: 'mid = (low + high) // 2',
      note: 'Floor division keeps it a valid index. Move to mid + 1 or mid - 1 afterwards, never to mid.' },

    { id: 'dsa-bisect', group: PAT, lvl: 3,
      ask: 'Find where x would slot into the sorted list `items`, using the standard library',
      a: 'bisect.bisect_left(items, x)',
      note: 'import bisect. Binary search you do not have to write — and insort keeps a list sorted as you add.' },

    { id: 'dsa-matrix-dims', group: PAT, lvl: 2,
      ask: 'Get the number of rows and columns of the list-of-lists `grid`',
      a: 'rows, cols = len(grid), len(grid[0])',
      note: 'Guard the empty grid first — grid[0] raises on an empty list.' },

    { id: 'dsa-matrix-loop', group: PAT, lvl: 2,
      ask: 'Loop over every cell of `grid` by position',
      a: 'for r in range(rows):\n    for c in range(cols):',
      note: 'Row first, then column — the same order as grid[r][c].' },

    { id: 'dsa-transpose', group: PAT, lvl: 3,
      ask: 'Transpose the list-of-lists `grid`',
      a: 'list(zip(*grid))',
      note: 'The star unpacks the rows as arguments, and zip pairs them up column-wise.' },

    { id: 'dsa-neighbours', group: PAT, lvl: 3,
      ask: 'List the four up/down/left/right moves as (dr, dc) pairs',
      a: 'moves = [(-1, 0), (1, 0), (0, -1), (0, 1)]',
      note: 'The standard opening of any grid walk. Add the diagonals for eight-way movement.' },

    /* ---- recursion, trees and search ---- */
    { id: 'dsa-base-case', group: REC, lvl: 1,
      ask: 'Write the base case that stops a countdown recursion once n hits 0, returning 1',
      a: 'if n == 0:\n    return 1',
      note: 'Write it first. Without one you get RecursionError — Python stops you at about 1000 frames.' },

    { id: 'dsa-recursion-limit', group: REC, lvl: 3,
      ask: 'Which error does Python raise when a recursion never bottoms out?',
      a: 'RecursionError',
      note: 'The default limit is around 1000 frames. Deep recursion is usually a sign to use a stack instead.' },

    { id: 'dsa-memo-cache', group: REC, lvl: 2,
      ask: 'Memoise a recursive function with one functools line, with no cache size limit',
      a: '@lru_cache(maxsize=None)',
      alts: ['@cache', '@functools.cache'],
      note: 'from functools import lru_cache. It turns exponential recursion into linear — the whole of easy dynamic programming.' },

    { id: 'dsa-memo-dict', group: REC, lvl: 3,
      ask: 'Return the memoised answer for n if it is already in the dict `memo`',
      a: 'if n in memo:\n    return memo[n]',
      note: 'The hand-rolled version of the same idea, for when the arguments are not hashable.' },

    { id: 'dsa-dfs-stack', group: REC, lvl: 3,
      ask: 'Start a depth-first search from `start` using an explicit stack',
      a: 'stack = [start]',
      note: 'Then pop() each node and push its neighbours. Swap the list for a deque and popleft() and it becomes breadth-first.' },

    { id: 'dsa-bfs-queue', group: REC, lvl: 3,
      ask: 'Start the BFS `queue` off as a deque holding just `start`',
      a: 'queue = deque([start])',
      note: 'BFS finds the SHORTEST path in an unweighted graph; DFS does not.' },

    { id: 'dsa-visited', group: REC, lvl: 2,
      ask: 'Mark `node` as visited in the set `visited`',
      a: 'visited.add(node)',
      note: 'Without a visited set, a graph with a cycle loops forever.' },

    { id: 'dsa-neighbour-loop', group: REC, lvl: 3,
      ask: 'Loop over the neighbours of `node` in the adjacency dict `graph`',
      a: 'for neighbour in graph[node]:',
      alts: ['for neighbour in graph.get(node, []):'],
      note: 'Use .get(node, []) when a node might have no entry at all.' },

    { id: 'dsa-tree-node', group: REC, lvl: 3,
      ask: 'Represent a binary tree node as a dict with keys value, left and right',
      a: "node = {'value': v, 'left': None, 'right': None}",
      note: 'A test will usually hand you this shape, or a small class — the traversal is the same either way.' },

    { id: 'dsa-inorder', group: REC, lvl: 3,
      ask: 'Write the recursive in-order line for a node dict of value, left and right',
      a: "return walk(node['left']) + [node['value']] + walk(node['right'])",
      note: 'In-order on a binary SEARCH tree comes out sorted — that is the trick most tree questions turn on.' },

    { id: 'dsa-depth', group: REC, lvl: 3,
      ask: 'The recursive step for the depth of a node dict with left and right children',
      a: "return 1 + max(depth(node['left']), depth(node['right']))",
      note: 'With a base case returning 0 for a missing node.' },

    { id: 'dsa-factorial', group: REC, lvl: 2,
      ask: 'The recursive step of factorial(n)',
      a: 'return n * factorial(n - 1)',
      note: 'With `if n <= 1: return 1` above it. Every recursion is: base case, then a smaller version of itself.' },

    { id: 'dsa-fib-iterative', group: REC, lvl: 2,
      ask: 'The line that steps a Fibonacci pair forward',
      a: 'a, b = b, a + b',
      note: 'Both sides update at once, using the OLD a on the right. Two variables replace the whole recursion.' },

    { id: 'dsa-permutations', group: REC, lvl: 3,
      ask: 'Get every ordering of `items` using itertools',
      a: 'list(permutations(items))',
      note: 'from itertools import permutations. There are n! of them — fine for 8 items, hopeless for 20.' },

    { id: 'dsa-combinations', group: REC, lvl: 3,
      ask: 'Get every pair of `items` using itertools',
      a: 'list(combinations(items, 2))',
      note: 'Order does not matter and each pair appears once — the right tool for "every pair" questions.' }
  );
})();
