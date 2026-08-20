/* Step-by-step ladders, 9 — second pass. Nothing new here: the same lines you have
   already met, asked again about different data, so the shape comes before the words. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  function ladder(group, prefix, rows) {
    rows.forEach(function (r, i) {
      var card = { id: prefix + '-' + (i + 1), group: group, lvl: 1, ask: r[0], a: r[1] };
      if (r[2]) card.note = r[2];
      if (r[3]) card.alts = r[3];
      window.SNIPPETS.push(card);
    });
  }

  ladder('Step by step · again, with a bank account', 'sp-a1', [
    ['Store the starting balance 100 in a name called balance', 'balance = 100'],
    ['Add the amount in deposit onto balance', 'balance += deposit'],
    ['Take the amount in withdrawal off balance', 'balance -= withdrawal'],
    ['Print the balance to 2 decimal places with a pound sign', "print(f'£{balance:.2f}')"],
    ['Test whether the balance has gone below zero', 'balance < 0'],
    ['If the balance is below zero, print overdrawn', "if balance < 0:\n    print('overdrawn')"],
    ['If withdrawal is bigger than balance, print not enough money', "if withdrawal > balance:\n    print('not enough money')"],
    ['Add up every amount in the list transactions', 'sum(transactions)'],
    ['Count how many transactions there were', 'len(transactions)'],
    ['Find the largest transaction', 'max(transactions)'],
    ['Build a list of only the transactions that were payments in (above 0)', '[t for t in transactions if t > 0]'],
    ['Build a list of only the transactions that were payments out (below 0)', '[t for t in transactions if t < 0]'],
    ['Add up only the payments in', 'sum(t for t in transactions if t > 0)'],
    ['Count how many payments out there were', 'sum(1 for t in transactions if t < 0)'],
    ['Work out the balance by adding every transaction to a running total', 'balance = 0\nfor t in transactions:\n    balance += t'],
    ['Print a running balance after each transaction', 'balance = 0\nfor t in transactions:\n    balance += t\n    print(balance)'],
    ['Write a function apply_fee that takes 2.50 off a balance and gives it back', 'def apply_fee(balance):\n    return balance - 2.50'],
    ['Write a function can_afford that says whether balance covers cost', 'def can_afford(balance, cost):\n    return balance >= cost'],
    ['Store each account name and its balance in a dictionary called accounts', "accounts = {'Ann': 100, 'Bob': 50}"],
    ['Get Ann\'s balance out of the accounts dictionary', "accounts['Ann']"],
    ['Add 10 to Ann\'s balance in the accounts dictionary', "accounts['Ann'] += 10"],
    ['Add up every balance in the accounts dictionary', 'sum(accounts.values())'],
    ['Find the account name with the biggest balance', 'max(accounts, key=accounts.get)'],
    ['Print every account name and balance, one per line', 'for name, amount in accounts.items():\n    print(name, amount)'],
    ['Build a list of the account names that are overdrawn', '[name for name, amount in accounts.items() if amount < 0]']
  ]);

  ladder('Step by step · again, with a recipe', 'sp-a2', [
    ['Store the list of ingredients flour, eggs and milk in a name', "ingredients = ['flour', 'eggs', 'milk']"],
    ['Count how many ingredients there are', 'len(ingredients)'],
    ['Add butter to the end of the ingredients list', "ingredients.append('butter')"],
    ['Test whether eggs are in the ingredients list', "'eggs' in ingredients"],
    ['Print every ingredient on its own line', 'for item in ingredients:\n    print(item)'],
    ['Print every ingredient numbered from 1', "for i, item in enumerate(ingredients, start=1):\n    print(i, item)"],
    ['Put the ingredients into alphabetical order', 'ingredients.sort()'],
    ['Join the ingredients into one line separated by commas', "', '.join(ingredients)"],
    ['Build a list of the ingredients in capitals', '[item.upper() for item in ingredients]'],
    ['Build a list of only the ingredients longer than 4 letters', '[item for item in ingredients if len(item) > 4]'],
    ['Store how much of each ingredient is needed, in a dictionary called amounts', "amounts = {'flour': 200, 'eggs': 2}"],
    ['Get how much flour is needed out of amounts', "amounts['flour']"],
    ['Add sugar at 50 to the amounts dictionary', "amounts['sugar'] = 50"],
    ['Double every amount in the amounts dictionary', '{key: value * 2 for key, value in amounts.items()}', 'A dictionary comprehension: same shape as a list one, with a key and a value.'],
    ['Print each ingredient and how much is needed', 'for item, amount in amounts.items():\n    print(item, amount)'],
    ['Write a function double_recipe that doubles a number of servings', 'def double_recipe(servings):\n    return servings * 2'],
    ['Write a function scale that multiplies an amount by a factor', 'def scale(amount, factor):\n    return amount * factor'],
    ['Ask the user how many servings and store it as a whole number', "servings = int(input('how many servings? '))"],
    ['Print the recipe title in capitals with a line of dashes under it', "print(title.upper())\nprint('-' * len(title))"],
    ['Test whether the amounts dictionary has an entry for sugar', "'sugar' in amounts"]
  ]);

  ladder('Step by step · again, with football scores', 'sp-a3', [
    ['Store the list of goals 2, 0 and 3 in a name called goals', 'goals = [2, 0, 3]'],
    ['Add up all the goals', 'sum(goals)'],
    ['Find the highest score', 'max(goals)'],
    ['Work out the average goals per game', 'sum(goals) / len(goals)'],
    ['Count how many games ended with no goals', 'sum(1 for g in goals if g == 0)'],
    ['Count how many games had 2 or more goals', 'sum(1 for g in goals if g >= 2)'],
    ['Build a list saying win when goals are above 1, otherwise loss', "['win' if g > 1 else 'loss' for g in goals]"],
    ['Count how many wins there were, when a win is more than 1 goal', 'wins = 0\nfor g in goals:\n    if g > 1:\n        wins += 1'],
    ['Store the points for each team in a dictionary called table', "table = {'Leeds': 10, 'York': 8}"],
    ['Add 3 points to Leeds in the table', "table['Leeds'] += 3"],
    ['Find the team at the top of the table', 'max(table, key=table.get)'],
    ['Sort the teams by points, highest first', 'sorted(table, key=table.get, reverse=True)'],
    ['Print every team and its points', 'for team, points in table.items():\n    print(team, points)'],
    ['Build a list of the teams on 10 points or more', '[team for team, points in table.items() if points >= 10]'],
    ['Write a function points_for that gives 3 for a win, 1 for a draw, 0 for a loss', "def points_for(result):\n    if result == 'win':\n        return 3\n    if result == 'draw':\n        return 1\n    return 0"],
    ['Work out the goal difference between scored and conceded', 'scored - conceded'],
    ['Print the score as a line like 2 - 1 using an f-string', "print(f'{home} - {away}')"],
    ['Test whether the home team scored more than the away team', 'home > away'],
    ['Print home win, away win or draw depending on the two scores', "if home > away:\n    print('home win')\nelif away > home:\n    print('away win')\nelse:\n    print('draw')"],
    ['Count how many of the results in results are the word win', "results.count('win')"]
  ]);

  ladder('Step by step · again, with a spreadsheet of sales', 'sp-a4', [
    ['Read the file orders.csv into a frame called orders', "orders = pd.read_csv('orders.csv')"],
    ['Look at the first five rows of orders', 'orders.head()'],
    ['See how many rows and columns orders has', 'orders.shape'],
    ['Count the missing values in each column of orders', 'orders.isna().sum()'],
    ['Add up the total column of orders', "orders['total'].sum()"],
    ['Get the average of the total column of orders', "orders['total'].mean()"],
    ['Keep only the orders where total is over 50', "orders[orders['total'] > 50]"],
    ['Keep only the orders from the region North', "orders[orders['region'] == 'North']"],
    ['Keep the orders over 50 from the region North', "orders[(orders['total'] > 50) & (orders['region'] == 'North')]"],
    ['Add up the total for each region', "orders.groupby('region')['total'].sum()"],
    ['Get the average total for each region', "orders.groupby('region')['total'].mean()"],
    ['Count how many orders each region had', "orders.groupby('region').size()"],
    ['Put orders in order of total, biggest first', "orders.sort_values('total', ascending=False)"],
    ['Get the ten biggest orders by total', "orders.nlargest(10, 'total')"],
    ['Add a column called with_vat holding total times 1.2', "orders['with_vat'] = orders['total'] * 1.2"],
    ['Count how many different customers the orders frame holds', "orders['customer'].nunique()"],
    ['See which products appear most often in orders', "orders['product'].value_counts()"],
    ['Drop the rows of orders where total is missing', "orders = orders.dropna(subset=['total'])"],
    ['Save orders to tidy.csv without the index', "orders.to_csv('tidy.csv', index=False)"],
    ['Work out what fraction of orders were over 50', "(orders['total'] > 50).mean()"]
  ]);
})();
