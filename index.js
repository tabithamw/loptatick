const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rute GET untuk root path
app.get('/', (req, res) => {
  res.send('Welcome to the Loptatick server!');
});

app.post('/api/tickets', (req, res) => {
  const { name, email, ticketType } = req.body;

  // Check if all fields are provided
  if (!name || !email || !ticketType) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Simple email validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Simulate ticket processing
  // You can replace this with actual database or ticketing logic in the future
  res.status(200).json({
    message: 'Ticket successfully purchased',
    data: { name, email, ticketType },
  });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
