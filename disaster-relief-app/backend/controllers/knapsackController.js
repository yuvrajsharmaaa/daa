/**
 * 0/1 Knapsack Algorithm using Dynamic Programming
 * Time Complexity: O(n * W) where n is number of items and W is capacity
 * Space Complexity: O(n * W)
 */
function knapsack01(items, capacity) {
  const n = items.length;
  
  if (n === 0 || capacity <= 0) {
    return { 
      maxValue: 0, 
      selectedItems: [],
      totalWeight: 0,
      capacityUsed: 0,
      dpTable: []
    };
  }

  const cap = Math.floor(capacity);
  
  // Create DP table
  const dp = Array(n + 1).fill(null).map(() => Array(cap + 1).fill(0));

  // Fill DP table
  for (let i = 1; i <= n; i++) {
    const item = items[i - 1];
    const weight = Math.floor(item.weight);
    const value = item.value;

    for (let w = 0; w <= cap; w++) {
      if (weight <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + value);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // Backtrack to find selected items
  const selectedItems = [];
  let w = cap;
  
  for (let i = n; i > 0 && w > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedItems.push({
        ...items[i - 1],
        index: i - 1
      });
      w -= Math.floor(items[i - 1].weight);
    }
  }

  const totalWeight = selectedItems.reduce((sum, item) => sum + item.weight, 0);
  const maxValue = dp[n][cap];

  return {
    maxValue,
    selectedItems: selectedItems.reverse(),
    totalWeight,
    capacityUsed: (totalWeight / capacity) * 100,
    dpTable: dp
  };
}

/**
 * Controller function to handle knapsack calculation requests
 */
exports.calculate01Knapsack = (req, res) => {
  try {
    const { items, capacity } = req.body;

    // Validation
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ 
        error: 'Invalid input: items must be an array' 
      });
    }

    if (typeof capacity !== 'number' || capacity <= 0) {
      return res.status(400).json({ 
        error: 'Invalid input: capacity must be a positive number' 
      });
    }

    // Validate each item
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.name || typeof item.value !== 'number' || typeof item.weight !== 'number') {
        return res.status(400).json({ 
          error: `Invalid item at index ${i}: must have name, value, and weight` 
        });
      }
      if (item.value < 0 || item.weight <= 0) {
        return res.status(400).json({ 
          error: `Invalid item at index ${i}: value must be non-negative and weight must be positive` 
        });
      }
    }

    // Calculate
    const startTime = Date.now();
    const result = knapsack01(items, capacity);
    const executionTime = Date.now() - startTime;

    res.json({
      success: true,
      result: {
        maxValue: result.maxValue,
        totalWeight: result.totalWeight,
        capacityUsed: result.capacityUsed,
        selectedItems: result.selectedItems,
        itemsCount: items.length,
        selectedCount: result.selectedItems.length
      },
      metadata: {
        executionTime: `${executionTime}ms`,
        algorithm: '0/1 Knapsack (Dynamic Programming)',
        complexity: 'O(n * W)'
      }
    });

  } catch (error) {
    console.error('Error in calculate01Knapsack:', error);
    res.status(500).json({ 
      error: 'Internal server error during calculation',
      message: error.message 
    });
  }
};
