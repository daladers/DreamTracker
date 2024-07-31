const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const path = require('path');
const db = require('./models');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const noteRoutes = require('./routes/note');
const statsRoutes = require('./routes/stats');
const friendRoutes = require('./routes/friend');
const imageRoutes = require('./routes/image');
const profileRoutes = require('./routes/profile');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use('/note', noteRoutes);
app.use('/stats', statsRoutes)
app.use('/friends', friendRoutes);
app.use('/image', imageRoutes);
app.use('/profile', profileRoutes);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
