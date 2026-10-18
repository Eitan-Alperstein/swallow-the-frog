# Swallow the Frog: Knapsack Problem Visualizer

An interactive, in-browser visualizer for the classic **0/1 knapsack problem**: given items with weights and values and a bag with a weight limit, which items give the most value?

It solves the problem with dynamic programming (`knapsack.js` builds the full DP table, item by item and capacity by capacity), so you can see how the optimal answer is put together.

## Run it

No build step. Just open `index.html` in a browser.

## Files

- `index.html`: UI (styled with Tailwind via CDN)
- `knapsack.js`: the DP solver
