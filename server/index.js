const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const db = require('./models'); // Import the models directory
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const noteRoutes = require('./routes/note');
const statsRoutes = require('./routes/stats');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use('/note', noteRoutes);
app.use('/stats', statsRoutes)

// Sync database and start the server
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
