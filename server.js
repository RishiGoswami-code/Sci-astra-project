// Import required modules for creating the server and handling data
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // To allow cross-origin requests

// Initialize Express app
const app = express();

// Use body-parser to handle JSON data in requests
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for cross-origin requests

// Create a MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',          
    password: 'password',  
    database: 'sciastra'  
});

// Connect to the database and log the status
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Route to fetch discounted courses
app.get('/api/courses', (req, res) => {
    const query = 'SELECT * FROM courses WHERE discount > 0';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            res.status(500).json({ error: 'Failed to fetch courses' });
            return;
        }
        res.json(results); // Send course data as JSON response
    });
});

// Route to fetch published blog posts
app.get('/api/blogs', (req, res) => {
    const query = 'SELECT * FROM blogs WHERE publish_date <= NOW()';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching blogs:', err);
            res.status(500).json({ error: 'Failed to fetch blogs' });
            return;
        }
        res.json(results); // Send blog data as JSON response
    });
});

// Route to handle a dummy purchase request
app.post('/api/purchase', (req, res) => {
    const { courseId, userId } = req.body;
    
    // Check if required fields are provided
    if (!courseId || !userId) {
        return res.status(400).json({ error: 'Course ID and User ID are required' });
    }

    // For a dummy purchase, simply return a confirmation message
    res.json({ message: 'Payment processed successfully for course ID ' + courseId });
});

// Start the server and listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
