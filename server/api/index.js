const { app,server } = require('../server');

require('dotenv').config();
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Fleet Battle Server is running! 🚀');
  });
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
module.exports = (req, res) => {
  if (!res.socket.server) {
    console.log("Starting WebSocket server...");
    res.socket.server = server;
  }
  res.end("Fleet Battle Server is running! 🚀");
};
