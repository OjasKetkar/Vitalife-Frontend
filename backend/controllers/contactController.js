const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Contact = require('../models/contactSchema');

const createContact = asyncHandler(async (req,res) => {
    const { name, email, message } = req.body;

    // Check if all fields are filled
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill in    all the fields' });
    }

    try {
      // Save the contact form data to the database
      const contact = new Contact({
        name,
        email,
        message,
      });
      await contact.save();

      res.status(200).json({ message: 'Thank you for the  message! I will get back to you as soon as I can' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Encountered a glitch.    Please try sending it again' });
    }
})

const getContacts = asyncHandler(async (req,res) => {
    try{
        const allContacts = await Contact.find({})
        res.send({ data: allContacts})
    }catch(err){
        console.log(err)
    }
})

module.exports = {createContact,getContacts}