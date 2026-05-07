require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const { resume, selfDescription, jobDescription } = require('./data')
const { generateInterviewReport } = require('./services/ai.service')

connectDB();
generateInterviewReport({resume,selfDescription,jobDescription})

app.listen(3000, () => {
    console.log('server running in port 3000')
})