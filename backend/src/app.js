const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true}));

app.use(express.json());
app.use(cookieParser());

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const interviewRoutes = require('./routes/interview.routes');
app.use('/api/interview', interviewRoutes);

module.exports = app;
