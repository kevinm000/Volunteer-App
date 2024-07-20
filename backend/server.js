const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./src/routes/auth');
const profileRoutes = require('./src/routes/profile');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
//app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
