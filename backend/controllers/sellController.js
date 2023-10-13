const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;

const Seller = require('../models/sellerSchema');

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret
});

const registerSeller = asyncHandler(async (req,res) => {
        const { id,name, email, phone, password, cpassword } = req.body;
  
    if ( !name || !email || !phone || !password || !cpassword) {
      return res.status(422).json({ error: "Please provide all the required information" });
    }
  
    try {
      const sellerExists = await Seller.findOne({ email: email , id:id});
  
      if (sellerExists) {
        return res.status(422).json({ error: "Email or ID already exists" });
      } else if (password != cpassword) {
        return res.status(422).json({ error: "Passwords are not matching" });
      } else {
        const seller = new Seller({ id,name, email, phone, password, cpassword });
  
        await seller.save();
  
        res.status(201).json({ message: "Seller registered successfully" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    }
})

const signinSellers = asyncHandler(async (req,res) => {
    try{
            let token;
             const {email,password} = req.body;
             
             
             if(!email || !password){
                return res.status(400).json({error:"Pleasefill in all the fields"})
             }
        
             const sellerLogin = await Seller.findOn({email:email})
        
             if(sellerLogin){
                const isMatch = await bcrypt.compare(passwordsellerLogin.password)
        
                token = await sellerLogin.generateAuthToken();
                console.log("The token for seller is ",token)
        
        
                if(!isMatch){
                    res.status(400).json({error:"InvalidCredentials"})
                }
                else {
                    console.log(`Seller login successful`)
                    res.json({message:"Seller signinsuccessful"})
                }
            }
            else{
                res.status(400).json({error:"InvalidCredentials"})
            }
            }
            catch(err){
                console.log(err)
            }
})


const sell = asyncHandler(async (req, res) => {
    const { id, name, price, volume, description } = req.body;
  
    try {
      if (req.file) {
        // File was uploaded to Cloudinary, you can access its details in req.file
        const imageDetails = req.file;
  
        // Upload the image to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(imageDetails.path);
  
        if (cloudinaryResponse && cloudinaryResponse.secure_url) {
          // Create a new product with image details
          const product = new Product({
            id: id,
            name: name,
            price: price,
            volume: volume,
            description: description,
            image: {
              url: cloudinaryResponse.secure_url, // Cloudinary URL of the uploaded image
              public_id: cloudinaryResponse.public_id, // Cloudinary public ID of the image
            },
          });
  
          // Save the product to your database
          await product.save();
  
          // Construct the Cloudinary URL using the public_id and send it in the response
          // const cloudinaryUrl = cloudinary.url(cloudinaryResponse.public_id, { secure: true });
          
          res.status(201).json({ message: 'Product registered successfully', imageUrl: cloudinaryResponse.secure_url });
          fs.unlinkSync(req.file.path);
        } else {
          res.status(400).json({ error: 'Image upload to Cloudinary failed' });
        }
      } else {
        res.status(400).json({ error: 'Image upload failed' });
      }
    } catch (err) {
      console.error('Error in processing', err);
      res.status(500).json({ error: err.message });
    }
  });

  const getSellers = asyncHandler(async (req,res) => {
          try {
            const allSellers = await Seller.find({});
            res.send({ data: allSellers });
          } catch (err) {
            console.log(err);
            res.status(500).json({ error: err });
          }
  })

  module.exports = {registerSeller,signinSellers,sell,getSellers}
  


