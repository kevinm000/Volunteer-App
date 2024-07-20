const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const authRoutes = require('./src/routes/auth')
const profileRoutes = require('./src/routes/profile')
const eventRoutes = require('./src/routes/event')
const volunteerhistoryRoutes = require('./src/routes/volunteerhistory')
const volunteermatchRoutes = require('./src/routes/volunteermatch')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/volunteerhistory', volunteerhistoryRoutes)
app.use('/api/volunteermatch', volunteermatchRoutes)


const PORT = process.env.PORT || 3800

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

