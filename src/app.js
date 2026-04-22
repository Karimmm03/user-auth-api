const express = require('express');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const {errorHandler} = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.status(200).json({status: 'ok', message: 'API is running'});
});

app.use(errorHandler);

module.exports = app;
