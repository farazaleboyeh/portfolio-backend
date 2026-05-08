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

function getOptimizedUrl(publicId, width) {
    return cloudinary.url(publicId, {
        transformation: [
            { width, crop: "limit", dpr: "auto" },
            { fetch_format: "auto", quality: "auto:eco"}
        ]
    });
}

router.get('/', (req, res) => {});

//folders
router.get('/folders', async (req, res) => {
    try {
        
        const result = await cloudinary.api.root_folders();
        res.json(result.folders); 
    } 
    catch(error) {
        res.status(500).json({ error: error.message });
    }
});

//folder images
router.get('/folders/:folderName', async (req, res) => {
    console.log('received');
    try {
        const { folderName } = req.params;
        const result = await cloudinary.search
            .expression(`folder="${folderName}"/*`)
            .sort_by('public_id', 'desc')
            .max_results(500)
            .execute();
        
        const optimized_results = result.resources.map(img => ({
            id: img.public_id,
            name: img.filename,
            url: getOptimizedUrl(img.public_id, 800),
            fullscreenUrl: getOptimizedUrl(img.public_id, 1600)
        }))

        console.log(optimized_results);

        // console.log("folder:", folderName);
        // console.log("resources:", result.resources.length);

        res.json(optimized_results); //return image-object array
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




// export the router module so that server.js file can use it
module.exports = router;