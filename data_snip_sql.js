/* Quickfire cards — SQL, because a data-role test nearly always has a SQL half and
   because it is the same set of questions you have been answering in pandas.
   Standard SQL: anything dialect-specific is called out in the note. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var Q = 'SQL · querying';
  var AGG = 'SQL · grouping & aggregates';
  var J = 'SQL · joins & subqueries';
  var W = 'SQL · window functions';

  window.SNIPPETS.push(

    /* ---- querying ---- */
    { id: 'sq-select-all', group: Q, lvl: 1,
      ask: 'Select every column and row from the table orders',
      a: 'SELECT * FROM orders',
      note: 'Fine while exploring, and something to avoid in anything that runs regularly — name the columns you need.' },

    { id: 'sq-select-cols', group: Q, lvl: 1,
      ask: 'Select just the customer_id and amount columns from orders',
      a: 'SELECT customer_id, amount FROM orders' },

    { id: 'sq-where', group: Q, lvl: 1,
      ask: 'Select every order with an amount over 100',
      a: 'SELECT * FROM orders WHERE amount > 100',
      note: 'WHERE filters rows before any grouping happens — the same job as a pandas boolean mask.' },

    { id: 'sq-where-and', group: Q, lvl: 1,
      ask: 'Select orders over 100 in the region N',
      a: "SELECT * FROM orders WHERE amount > 100 AND region = 'N'",
      note: 'One equals sign to compare in SQL, and single quotes round text.' },

    { id: 'sq-where-in', group: Q, lvl: 2,
      ask: 'Select orders whose region is N, S or E',
      a: "SELECT * FROM orders WHERE region IN ('N', 'S', 'E')",
      note: 'IN is the SQL twin of pandas isin().' },

    { id: 'sq-where-between', group: Q, lvl: 2,
      ask: 'Select orders with an amount between 10 and 100 inclusive',
      a: 'SELECT * FROM orders WHERE amount BETWEEN 10 AND 100',
      note: 'BETWEEN includes both ends.' },

    { id: 'sq-where-like', group: Q, lvl: 2,
      ask: 'Select customers whose name starts with Sm',
      a: "SELECT * FROM customers WHERE name LIKE 'Sm%'",
      note: '% matches any run of characters, _ matches exactly one. ILIKE is case-insensitive in Postgres.' },

    { id: 'sq-where-null', group: Q, lvl: 1,
      ask: 'Select customers with no email recorded',
      a: 'SELECT * FROM customers WHERE email IS NULL',
      note: 'NULL is never equal to anything, so `= NULL` matches nothing at all. Always IS NULL / IS NOT NULL.' },

    { id: 'sq-coalesce', group: Q, lvl: 2,
      ask: 'Select the email, showing the text unknown where it is NULL',
      a: "SELECT COALESCE(email, 'unknown') FROM customers",
      note: 'COALESCE takes the first non-NULL of its arguments — the SQL fillna().' },

    { id: 'sq-order', group: Q, lvl: 1,
      ask: 'Select every order, biggest amount first',
      a: 'SELECT * FROM orders ORDER BY amount DESC',
      note: 'ASC is the default; DESC reverses it. Sorting happens after WHERE and GROUP BY.' },

    { id: 'sq-limit', group: Q, lvl: 1,
      ask: 'Select the ten biggest orders',
      a: 'SELECT * FROM orders ORDER BY amount DESC LIMIT 10',
      note: 'LIMIT in Postgres, MySQL and SQLite; TOP 10 after SELECT in SQL Server.' },

    { id: 'sq-distinct', group: Q, lvl: 1,
      ask: 'List the distinct regions in orders',
      a: 'SELECT DISTINCT region FROM orders' },

    { id: 'sq-alias', group: Q, lvl: 2,
      ask: 'Select amount renamed to value',
      a: 'SELECT amount AS value FROM orders',
      note: 'Aliases name a calculated column — and are how you refer to it in the outer query.' },

    { id: 'sq-case', group: Q, lvl: 2,
      ask: 'Label each order big when the amount is over 100, otherwise small',
      a: "SELECT CASE WHEN amount > 100 THEN 'big' ELSE 'small' END AS size FROM orders",
      note: 'CASE WHEN is SQL\'s if/else. Chain more WHENs for more bands — first match wins.' },

    { id: 'sq-arith', group: Q, lvl: 2,
      ask: 'Select the amount with 20% VAT added, as gross',
      a: 'SELECT amount * 1.2 AS gross FROM orders' },

    { id: 'sq-not-in', group: Q, lvl: 3,
      ask: 'Select orders whose region is NOT N or S',
      a: "SELECT * FROM orders WHERE region NOT IN ('N', 'S')",
      note: 'Careful: if the list can contain NULL, NOT IN returns nothing at all. That is a genuine interview question.' },

    /* ---- grouping ---- */
    { id: 'sq-count', group: AGG, lvl: 1,
      ask: 'Count the rows in orders',
      a: 'SELECT COUNT(*) FROM orders',
      note: 'COUNT(*) counts rows; COUNT(column) skips NULLs in that column. The gap between them is the missing-value count.' },

    { id: 'sq-count-distinct', group: AGG, lvl: 2,
      ask: 'Count how many different customers appear in orders',
      a: 'SELECT COUNT(DISTINCT customer_id) FROM orders' },

    { id: 'sq-sum-group', group: AGG, lvl: 1,
      ask: 'Total the amount for each region',
      a: 'SELECT region, SUM(amount) FROM orders GROUP BY region',
      note: 'The pandas equivalent is df.groupby("region")["amount"].sum().' },

    { id: 'sq-avg-group', group: AGG, lvl: 1,
      ask: 'Average amount per region, with the column named avg_amount',
      a: 'SELECT region, AVG(amount) AS avg_amount FROM orders GROUP BY region' },

    { id: 'sq-group-two', group: AGG, lvl: 2,
      ask: 'Total the amount for each combination of region and product',
      a: 'SELECT region, product, SUM(amount) FROM orders GROUP BY region, product',
      note: 'Every non-aggregated column in the SELECT must appear in the GROUP BY.' },

    { id: 'sq-having', group: AGG, lvl: 2,
      ask: 'Show only the regions whose total amount is over 1000',
      a: 'SELECT region, SUM(amount) FROM orders GROUP BY region HAVING SUM(amount) > 1000',
      note: 'WHERE filters rows BEFORE grouping; HAVING filters groups after. That distinction is asked in almost every SQL screen.' },

    { id: 'sq-group-order', group: AGG, lvl: 2,
      ask: 'Total amount per region, biggest total first',
      a: 'SELECT region, SUM(amount) AS total FROM orders GROUP BY region ORDER BY total DESC',
      note: 'You can order by the alias, because ORDER BY runs after SELECT.' },

    { id: 'sq-count-group', group: AGG, lvl: 1,
      ask: 'Count how many orders each customer has placed',
      a: 'SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id' },

    { id: 'sq-min-max', group: AGG, lvl: 1,
      ask: 'Show the smallest and largest amount in orders',
      a: 'SELECT MIN(amount), MAX(amount) FROM orders' },

    { id: 'sq-group-filter-first', group: AGG, lvl: 3,
      ask: 'Total the 2024 amounts per region (filter before grouping)',
      a: "SELECT region, SUM(amount) FROM orders WHERE order_date >= '2024-01-01' GROUP BY region",
      note: 'Filtering first is both correct and faster — the group only ever sees the rows you want.' },

    { id: 'sq-avg-null', group: AGG, lvl: 3,
      ask: 'Which SQL aggregate ignores NULLs — AVG or COUNT(*)?',
      a: 'AVG',
      note: 'AVG, SUM, MIN and MAX skip NULLs; COUNT(*) counts every row regardless. So AVG divides by the non-NULL count, exactly like pandas mean().' },

    /* ---- joins & subqueries ---- */
    { id: 'sq-inner-join', group: J, lvl: 1,
      ask: 'Join orders to customers on customer id, keeping only matches',
      a: 'SELECT * FROM orders JOIN customers ON orders.customer_id = customers.id',
      note: 'A bare JOIN is an INNER JOIN. Unmatched rows on either side disappear — quietly.' },

    { id: 'sq-left-join', group: J, lvl: 1,
      ask: 'Join customers onto orders keeping every order, matched or not',
      a: 'SELECT * FROM orders LEFT JOIN customers ON orders.customer_id = customers.id',
      note: 'LEFT JOIN keeps every row of the left table, filling the right side with NULLs.' },

    { id: 'sq-join-alias', group: J, lvl: 2,
      ask: 'Join orders o to customers c on the customer id, using table aliases',
      a: 'SELECT * FROM orders o JOIN customers c ON o.customer_id = c.id',
      note: 'Short aliases keep a multi-table query readable.' },

    { id: 'sq-join-select', group: J, lvl: 2,
      ask: 'From that join, select the customer name and the order amount',
      a: 'SELECT c.name, o.amount FROM orders o JOIN customers c ON o.customer_id = c.id',
      note: 'Qualify the columns with the alias whenever both tables could have that name.' },

    { id: 'sq-join-group', group: J, lvl: 3,
      ask: 'Total order amount per customer NAME, across a join',
      a: 'SELECT c.name, SUM(o.amount) FROM orders o JOIN customers c ON o.customer_id = c.id GROUP BY c.name',
      note: 'Join first, then group — the classic two-table reporting query.' },

    { id: 'sq-left-join-null', group: J, lvl: 3,
      ask: 'Find the customers who have never placed an order',
      a: 'SELECT c.* FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL',
      note: 'The anti-join: keep everything, then keep only the rows where the right side came back empty.' },

    { id: 'sq-subquery-where', group: J, lvl: 3,
      ask: 'Select orders whose amount is above the overall average amount',
      a: 'SELECT * FROM orders WHERE amount > (SELECT AVG(amount) FROM orders)',
      note: 'A scalar subquery — it returns one value, so it can sit on either side of a comparison.' },

    { id: 'sq-subquery-in', group: J, lvl: 3,
      ask: 'Select customers who appear in the orders table',
      a: 'SELECT * FROM customers WHERE id IN (SELECT customer_id FROM orders)',
      note: 'EXISTS does the same job and often runs faster on a big inner table.' },

    { id: 'sq-cte', group: J, lvl: 3,
      ask: 'Start a common table expression called totals',
      a: 'WITH totals AS (',
      note: 'A CTE names a subquery so the main query reads top to bottom instead of inside out.' },

    { id: 'sq-union', group: J, lvl: 3,
      ask: 'Stack the rows of two SELECTs, keeping duplicates',
      a: 'UNION ALL',
      note: 'Plain UNION removes duplicates and pays to sort for it; UNION ALL is what you want unless you need the deduplication.' },

    /* ---- window functions ---- */
    { id: 'sq-row-number', group: W, lvl: 3,
      ask: 'Number the orders within each customer, newest first',
      a: 'ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC)',
      note: 'PARTITION BY is the window equivalent of GROUP BY, but it keeps every row instead of collapsing them.' },

    { id: 'sq-latest-per-group', group: W, lvl: 3,
      ask: 'Keep only the newest order per customer, using a numbered subquery',
      a: 'SELECT * FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn FROM orders) t WHERE rn = 1',
      note: 'The single most-asked advanced SQL question there is. Number the rows, then keep number one.' },

    { id: 'sq-rank', group: W, lvl: 3,
      ask: 'Rank customers by total spend, letting ties share a rank',
      a: 'RANK() OVER (ORDER BY total_spend DESC)',
      note: 'RANK leaves gaps after a tie (1, 1, 3); DENSE_RANK does not (1, 1, 2); ROW_NUMBER never ties.' },

    { id: 'sq-lag', group: W, lvl: 3,
      ask: 'Get the previous order amount for each customer',
      a: 'LAG(amount) OVER (PARTITION BY customer_id ORDER BY order_date)',
      note: 'LAG looks back, LEAD looks forward — the SQL twin of pandas shift().' },

    { id: 'sq-running-total', group: W, lvl: 3,
      ask: 'Running total of amount per customer, in date order',
      a: 'SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date)',
      note: 'An ORDER BY inside OVER turns the aggregate into a running one.' },

    { id: 'sq-share-of-total', group: W, lvl: 3,
      ask: "Each row's amount as a share of its region's total",
      a: 'amount / SUM(amount) OVER (PARTITION BY region)',
      note: 'Without an ORDER BY, the window aggregate covers the whole partition — the SQL version of groupby transform.' },

    { id: 'sq-window-avg', group: W, lvl: 3,
      ask: 'Show each order alongside its region average, keeping every row',
      a: 'SELECT *, AVG(amount) OVER (PARTITION BY region) AS region_avg FROM orders',
      note: 'This is exactly groupby("region")["amount"].transform("mean") — one value per row, not per group.' },

    { id: 'sq-order-of-execution', group: W, lvl: 3,
      ask: 'Which clause runs first in SQL — SELECT or WHERE?',
      a: 'WHERE',
      note: 'The order is FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. It explains why you cannot use a SELECT alias in WHERE, but can in ORDER BY.' }
  );
})();
