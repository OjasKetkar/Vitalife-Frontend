const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Buyer = require('../models/buyerSchema');

const registerBuyer = asyncHandler(async (req,res) => {
        try {
            const allRegisters = await Buyer.find({});
            res.send({ data: allRegisters });
          } catch (err) {
            console.log(err);
            res.status(500).json({ error: err });
          }
})

const catalogue = asyncHandler(async (req,res) => {
    try{
        let token;
         const {email,password} = req.body;
         
         
         if(!email || !password){
            return res.status(400).json({error:"Please fill in all the fields"})
         }
    
         const buyerLogin = await Buyer.findOne({email:email})
    
         if(buyerLogin){
            const isMatch = await bcrypt.compare(password,buyerLogin.password)
    
            token = await buyerLogin.generateAuthToken();
            console.log("The token for buyer is ",token)
    
            //storing a takon into a cookie
            res.cookie("jwtoken",token,{
                //expires in 25892000000 milliseconds that is 30 days after that day when the cookie is stored
                expires: new Date(Date.now()+25892000000),
                //so that it does not just work on http secure 
                httpOnly:true
            })
    
            if(!isMatch){
                res.status(400).json({error:"Invalid Credentials"})
            }
            else {
                console.log(`Buyer login successful`)
                res.json({message:"Buyer signin successful"})
            }
        }
        else{
            res.status(400).json({error:"Invalid Credentials"})
        }
    }
    catch(err){
        console.log(err)
    }
})

const getBuyers = asyncHandler(async (req,res) => {
  try {
          const allBuyers = await Buyer.find({});
          res.send({ data: allBuyers });
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: err });
        }
})

const updateStock = asyncHandler(async (req,res) => {
    const productId = req.params.productId;
  const { quantity } = req.body;

  try {
    // Find the product in the database based on the productId
    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the stock based on the selected quantity
    product.volume -= quantity;

    // Save the updated product with the new stock value
    await product.save();

    res.status(200).json({ message: 'Stock updated successfully' });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ error: 'Error updating stock' });
  }
})

const deleteStock = asyncHandler(async (req,res) => {
    const productId = req.params.productId;

  try {
    // Find that product in the database
    const product = await Product.findOne({ id: productId }).exec();

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete the product if its volume is zero
    if (product.volume === 0) {
      // Delete the associated image from Cloudinary
      if (product.image && product.image.public_id) {
        const cloudinaryResponse = await cloudinary.uploader.destroy(product.image.public_id);

        if (cloudinaryResponse.result === 'ok') {
          // Image deleted from Cloudinary, now delete the product from your database
          await product.remove();
          res.status(200).json({ message: 'Product deleted successfully' });
        } else {
          res.status(500).json({ error: 'Error deleting image from Cloudinary' });
        }
      } else {
        // No image associated with the product
        await product.remove();
        res.status(200).json({ message: 'Product deleted successfully' });
      }
    } else {
      res.status(400).json({ message: 'Product volume is not zero' });
    }
  } catch (error) {
    console.error('Error deleting the product', error);
    res.status(500).json({ error: 'Error deleting the product' });
  }
})

const getProducts = asyncHandler(async (req,res) => {
      try {
          const allProducts = await Product.find({});
          res.send({ data: allProducts });
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: err });
        }
})

module.exports = {registerBuyer,catalogue,getBuyers,updateStock,deleteStock,getProducts}