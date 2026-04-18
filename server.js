const express = require('express');
const app = express();
const port = 3000;


// 1. Import your route file
// Ensure ./routes/users.js exists and uses module.exports
const imagesRoute = require('./routes/images');

// 2. Use the routes
// This means all URLs starting with /images will be handled by that file
app.use('/images', imagesRoute);

// 3. Simple test route for the home page
app.get('/', (req, res) => {
    res.send('<h1>Hello, Node.js Express Server!</h1>');
});

// 4. Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});