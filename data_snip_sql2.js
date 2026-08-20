/* Quickfire cards — SQL past the first interview question: dates, text, NULLs,
   windows in depth, and the statements that change data rather than read it. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var DTN = 'SQL · dates, text & nulls';
  var WIN = 'SQL · windows in depth';
  var SHP = 'SQL · shaping & writing data';

  window.SNIPPETS.push(

    /* ---- dates, text & nulls ---- */
    { id: 'sq2-extract-year', group: DTN, lvl: 2,
      ask: 'Pull the year out of order_date',
      a: 'EXTRACT(YEAR FROM order_date)',
      note: 'Standard SQL. Postgres also has DATE_PART, MySQL has YEAR(order_date), SQLite has strftime.' },

    { id: 'sq2-date-trunc', group: DTN, lvl: 2,
      ask: 'Round order_date down to the start of its month',
      a: "DATE_TRUNC('month', order_date)",
      note: 'The standard way to build a monthly grouping key without losing the date type.' },

    { id: 'sq2-monthly-totals', group: DTN, lvl: 2,
      ask: 'Total amount per month from orders, in date order',
      a: "SELECT DATE_TRUNC('month', order_date) AS month, SUM(amount) FROM orders GROUP BY month ORDER BY month",
      note: 'The single most-asked reporting query there is.' },

    { id: 'sq2-current-date', group: DTN, lvl: 1,
      ask: 'Get today\'s date in SQL',
      a: 'CURRENT_DATE',
      note: 'CURRENT_TIMESTAMP if you want the time too. Avoid NOW() in tests you want to be repeatable.' },

    { id: 'sq2-date-interval', group: DTN, lvl: 3,
      ask: 'Keep the orders from the last 30 days',
      a: "SELECT * FROM orders WHERE order_date >= CURRENT_DATE - INTERVAL '30 days'",
      note: 'Compare the column to a computed date, never wrap the COLUMN in a function — that stops the index being used.' },

    { id: 'sq2-date-diff', group: DTN, lvl: 3,
      ask: 'Work out the days between signup_date and first_order_date',
      a: 'first_order_date - signup_date',
      note: 'In Postgres subtracting dates gives days. Other engines: DATEDIFF(day, a, b).' },

    { id: 'sq2-upper', group: DTN, lvl: 1,
      ask: 'Return the name column in capitals',
      a: 'UPPER(name)',
      note: 'LOWER is the other half, and the usual way to compare text case-insensitively.' },

    { id: 'sq2-trim', group: DTN, lvl: 2,
      ask: 'Strip the leading and trailing spaces off name',
      a: 'TRIM(name)',
      note: 'Untrimmed keys are the reason a join silently matches nothing.' },

    { id: 'sq2-concat', group: DTN, lvl: 2,
      ask: 'Join first_name and last_name into one column with a space between',
      a: "first_name || ' ' || last_name",
      alts: ["CONCAT(first_name, ' ', last_name)"],
      note: '|| is the standard operator; CONCAT is friendlier about NULLs.' },

    { id: 'sq2-substring', group: DTN, lvl: 3,
      ask: 'Take the first three characters of postcode',
      a: 'SUBSTRING(postcode FROM 1 FOR 3)',
      alts: ['LEFT(postcode, 3)'],
      note: 'SQL counts characters from 1, not 0.' },

    { id: 'sq2-length', group: DTN, lvl: 2,
      ask: 'Get the number of characters in name',
      a: 'LENGTH(name)',
      note: 'A quick way to find the rows where a code is the wrong shape.' },

    { id: 'sq2-replace', group: DTN, lvl: 2,
      ask: 'Remove every dash from the phone column',
      a: "REPLACE(phone, '-', '')",
      note: 'Same three arguments as everywhere else: the column, the old text, the new text.' },

    { id: 'sq2-null-not-equal', group: DTN, lvl: 2,
      ask: 'Keep the rows where email is not missing',
      a: 'SELECT * FROM customers WHERE email IS NOT NULL',
      note: 'NULL is never equal to anything, not even NULL — so "!= NULL" returns nothing at all.' },

    { id: 'sq2-nullif', group: DTN, lvl: 3,
      ask: 'Divide total by count, giving NULL instead of an error when count is zero',
      a: 'total / NULLIF(count, 0)',
      note: 'NULLIF turns the offending value into NULL, and dividing by NULL is NULL rather than a crash.' },

    { id: 'sq2-count-col-vs-star', group: DTN, lvl: 3,
      ask: 'Count only the rows where email is filled in, using COUNT',
      a: 'COUNT(email)',
      note: 'COUNT(column) skips NULLs; COUNT(*) counts rows. The difference is a favourite interview question.' },

    { id: 'sq2-sum-nulls', group: DTN, lvl: 3,
      ask: 'Total amount treating missing amounts as zero',
      a: 'SUM(COALESCE(amount, 0))',
      note: 'SUM already ignores NULLs; write it out when the reader needs to see the decision.' },

    { id: 'sq2-cast', group: DTN, lvl: 2,
      ask: 'Convert the text column amount_text to a number',
      a: 'CAST(amount_text AS DECIMAL)',
      alts: ['amount_text::DECIMAL'],
      note: 'The :: form is Postgres shorthand. Use DECIMAL for money, never FLOAT.' },

    { id: 'sq2-round', group: DTN, lvl: 1,
      ask: 'Round the average amount to two decimal places',
      a: 'ROUND(AVG(amount), 2)',
      note: 'Round at the very end, for display — never partway through a calculation.' },

    { id: 'sq2-int-division', group: DTN, lvl: 3,
      ask: 'Get the fraction of rows that are flagged, forcing decimal division',
      a: 'SUM(flag) * 1.0 / COUNT(*)',
      note: 'Integer divided by integer is integer division in most engines: 3/4 gives 0. Multiplying by 1.0 fixes it.' },

    /* ---- windows in depth ---- */
    { id: 'sq2-dense-rank', group: WIN, lvl: 3,
      ask: 'Rank customers by total_spend so that ties share a rank and no numbers are skipped',
      a: 'DENSE_RANK() OVER (ORDER BY total_spend DESC)',
      note: 'RANK skips after a tie (1, 1, 3); DENSE_RANK does not (1, 1, 2); ROW_NUMBER never ties.' },

    { id: 'sq2-ntile', group: WIN, lvl: 3,
      ask: 'Split customers into four equal buckets by total_spend',
      a: 'NTILE(4) OVER (ORDER BY total_spend DESC)',
      note: 'Quartiles in one line — the SQL answer to pandas qcut.' },

    { id: 'sq2-lead', group: WIN, lvl: 3,
      ask: 'Get each order\'s NEXT order_date for the same customer',
      a: 'LEAD(order_date) OVER (PARTITION BY customer_id ORDER BY order_date)',
      note: 'LEAD looks forward, LAG looks back. Subtract the two for a gap between events.' },

    { id: 'sq2-first-value', group: WIN, lvl: 3,
      ask: 'Show each customer\'s very first order amount beside every one of their rows',
      a: 'FIRST_VALUE(amount) OVER (PARTITION BY customer_id ORDER BY order_date)',
      note: 'Useful for "how does this order compare to their first" without a self join.' },

    { id: 'sq2-frame-rows', group: WIN, lvl: 3,
      ask: 'Average amount over the current row and the two before it, per customer',
      a: 'AVG(amount) OVER (PARTITION BY customer_id ORDER BY order_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)',
      note: 'The frame clause is what turns a window into a moving average.' },

    { id: 'sq2-count-over', group: WIN, lvl: 3,
      ask: 'Show how many orders each customer has beside every one of their rows',
      a: 'COUNT(*) OVER (PARTITION BY customer_id)',
      note: 'A window keeps every row; GROUP BY collapses them. That is the whole distinction.' },

    { id: 'sq2-dedupe-rownumber', group: WIN, lvl: 3,
      ask: 'Number the duplicate rows within each customer_id so you can keep only the first',
      a: 'ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS rn',
      note: 'Then wrap it in a subquery or CTE and filter WHERE rn = 1. The standard deduplication.' },

    { id: 'sq2-cume-dist', group: WIN, lvl: 3,
      ask: 'Give each row its percentile position by amount',
      a: 'PERCENT_RANK() OVER (ORDER BY amount)',
      note: 'CUME_DIST is the close cousin: the fraction of rows at or below this one.' },

    /* ---- shaping & writing data ---- */
    { id: 'sq2-cte-name', group: SHP, lvl: 2,
      ask: 'Start a common table expression called recent',
      a: 'WITH recent AS (',
      note: 'CTEs turn a nest of subqueries into a readable sequence of steps. Interviewers notice.' },

    { id: 'sq2-cte-chain', group: SHP, lvl: 3,
      ask: 'Add a second CTE called ranked after the first one',
      a: '), ranked AS (',
      note: 'Comma between them, and each may refer to the ones before it.' },

    { id: 'sq2-self-join', group: SHP, lvl: 3,
      ask: 'Join employees to itself to put each person beside their manager',
      a: 'SELECT e.name, m.name AS manager FROM employees e JOIN employees m ON e.manager_id = m.id',
      note: 'Two aliases on the same table is all a self join is.' },

    { id: 'sq2-exists', group: SHP, lvl: 3,
      ask: 'Keep the customers who have at least one order, using EXISTS',
      a: 'SELECT * FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)',
      note: 'EXISTS stops at the first match and copes with NULLs better than NOT IN.' },

    { id: 'sq2-cross-join', group: SHP, lvl: 3,
      ask: 'Produce every combination of the rows in regions and months',
      a: 'SELECT * FROM regions CROSS JOIN months',
      note: 'How you build a complete calendar grid before filling in the gaps with a LEFT JOIN.' },

    { id: 'sq2-pivot-case', group: SHP, lvl: 3,
      ask: 'Total amount into one column per region using CASE',
      a: "SELECT SUM(CASE WHEN region = 'N' THEN amount ELSE 0 END) AS north FROM orders",
      note: 'Conditional aggregation: the portable way to pivot when the engine has no PIVOT.' },

    { id: 'sq2-union-distinct', group: SHP, lvl: 2,
      ask: 'Stack two result sets, removing duplicate rows',
      a: 'UNION',
      note: 'UNION deduplicates and therefore sorts; UNION ALL just concatenates and is much faster.' },

    { id: 'sq2-offset', group: SHP, lvl: 2,
      ask: 'Get rows 11 to 20 of a result ordered by amount',
      a: 'SELECT * FROM orders ORDER BY amount LIMIT 10 OFFSET 10',
      note: 'Pagination. Always ORDER BY as well, or "page 2" is not a stable idea.' },

    { id: 'sq2-insert', group: SHP, lvl: 2,
      ask: 'Insert one row into customers with an id of 1 and the name Ann',
      a: "INSERT INTO customers (id, name) VALUES (1, 'Ann')",
      note: 'Always name the columns — relying on their order breaks the day someone adds one.' },

    { id: 'sq2-update', group: SHP, lvl: 2,
      ask: 'Set the region to N for the customer whose id is 1',
      a: "UPDATE customers SET region = 'N' WHERE id = 1",
      note: 'Write the WHERE clause FIRST. An UPDATE without one changes every row in the table.' },

    { id: 'sq2-delete', group: SHP, lvl: 2,
      ask: 'Delete the orders with an amount of zero',
      a: 'DELETE FROM orders WHERE amount = 0',
      note: 'Run it as a SELECT first and read the count. There is no undo.' },

    { id: 'sq2-create-view', group: SHP, lvl: 3,
      ask: 'Save a query as a view called big_orders',
      a: 'CREATE VIEW big_orders AS',
      note: 'A view is a stored query, not stored data — it re-runs each time you select from it.' },

    { id: 'sq2-create-table-as', group: SHP, lvl: 3,
      ask: 'Save a query\'s results into a new table called summary',
      a: 'CREATE TABLE summary AS',
      note: 'Materialises the results, unlike a view. Good for an expensive aggregate you read many times.' },

    { id: 'sq2-index', group: SHP, lvl: 3,
      ask: 'Create an index on the customer_id column of orders',
      a: 'CREATE INDEX ON orders (customer_id)',
      note: 'Index the columns you filter and join on. Every index makes writes slower, so do not index everything.' },

    { id: 'sq2-explain', group: SHP, lvl: 3,
      ask: 'Ask the database how it plans to run a query',
      a: 'EXPLAIN',
      note: 'EXPLAIN ANALYZE actually runs it and reports the real timings. The first step in any "make it faster".' },

    { id: 'sq2-execution-order', group: SHP, lvl: 3,
      ask: 'Name the clause that runs FIRST when a query executes',
      a: 'FROM',
      note: 'FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT. That is why a SELECT alias cannot be used in WHERE.' }
  );
})();
