const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const knapsackRouter = require('./routes/knapsack');
const disasterRouter = require('./routes/disasters');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/knapsack', knapsackRouter);
app.use('/api/disasters', disasterRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints:`);
    console.log(`   - POST http://localhost:${PORT}/api/knapsack/calculate`);
    console.log(`   - GET  http://localhost:${PORT}/api/disasters`);
  });
}

// Export for Vercel serverless
module.exports = app;
