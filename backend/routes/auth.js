// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');
// const cors = require('cors');
// const cloudinary = require('cloudinary').v2;
// require('dotenv').config();
// const cheerio = require('cheerio') 
// const axios = require('axios')



// // Requiring the connections
// require('../DB/db');
// const Buyer = require('../models/buyerSchema.js');
// const Product = require('../models/productSchema.js');
// const Seller = require('../models/sellerSchema.js');
// const Contact = require('../models/contactSchema.js');
// const Forum = require('../models/forumSchema.js');


// // Enable CORS for all routes or specific origins
// const corsOptions = {
//   origin: '*',
//   methods: ['GET','PUT','POST','DELETE'], 
// };

// router.use(cors(corsOptions));

// const upload = multer({ dest: './uploads' });



// router.get('/products', (req,res) => {
//     res.send("Products page")
// })
// router.get('/admin', (req,res) => {
//     res.send("Admin page")
// })


// router.get('/forums' , (req,res) => {
//   res.send("This is forums page")
// })



// //Buyers Page authentication
// //POST for register page


// //Web-Scrapper
router.get('/herbs', async (req, res) => {
  try {
    let varHerb = "red-clover";
    let url = `https://www.fiveprana.com/blog/ayurvedic-herbs-${varHerb}/`;
    const response = await axios.get(url); // Await the Axios GET request
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract information from the webpage using Cheerio selectors.
    const herbName = $('.entry-title').text();
    const herbDescription = $('.sqs-html-content').text();

    // You can format the data as needed and send it as JSON.
    const herbInfo = {
      name: herbName,
      description: herbDescription,
    };

    res.json(herbInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while scraping data.' });
  }
});


// module.exports = router;