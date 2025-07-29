const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

// مثال: روت GET
app.get('/api/hello', (req, res) => {
  res.json({ message: 'سلام از سمت سرور!' });
});

// مثال: روت POST
app.post('/api/data', (req, res) => {
  const { name } = req.body;
  res.json({ received: name });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
