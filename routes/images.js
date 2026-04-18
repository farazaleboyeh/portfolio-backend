const express = require('express');
const router = express.Router();

const cloudinary = require('cloudinary').v2;

let cache = null;

const dotenv = require('dotenv');
dotenv.config();

//setting up credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.KEY,
  api_secret: process.env.SECRET
});

// Define a route
router.get('/', (req, res) => {
    
});

http://localhost:3000/images/about
router.get('/about', async (req, res) => {

    if (cache) return res.json(cache);

    try{
        const results = await cloudinary.search
            .expression('folder:gallery')
            .sort_by('public_id', 'desc')
            .max_results(500)
            .execute();
        const images = results.resources.map(file => ({
            id: file.public_id,
            url: file.secure_url,
            title: file.filename
        }));

        cache = images;

        res.json(cache);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch images" });
    }
});

router.get('/102', (req, res) => {
    res.send('this is uss ser 102 route');// this gets executed when user visit http://localhost:3000/user/102
});

// export the router module so that server.js file can use it
module.exports = router;