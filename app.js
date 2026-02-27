require('dotenv').config();

const express = require('express');
const app = express();

const port = 3000;

const schoolRouter = require('./routes/schoolRouter');
const teacherRouter = require('./routes/teacherRouter');
const studentRouter = require('./routes/studentRouter');
const studentTeacherRouter = require('./routes/studentTeacherRouter');

// Middleware to parse JSON
app.use(express.json());

// Log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/schools', schoolRouter);
app.use('/api/teachers', teacherRouter);
app.use('/api/students', studentRouter);
app.use('/api/students-teachers', studentTeacherRouter);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Teacher App Api (praveen@simpel.ai)' });
});

// Start server locally
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

// Export for Vercel
module.exports = app;