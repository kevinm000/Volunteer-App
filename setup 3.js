const mongoose = require('mongoose');
const app = require('../server'); // Adjust the path to your server file

let server;

beforeAll(async () => {
  server = app.listen(4001); // Use a different port for testing
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  server.close();
});

module.exports = app;
