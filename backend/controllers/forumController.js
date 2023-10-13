// forums,
// forumReply

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Forum = require('../models/forumSchema');

const forums = asyncHandler(async (req,res) => {
    const { forumtitle, forumContent, forumAuth, forumDate } = req.body;

  try {
      if (!forumtitle || !forumContent || !forumDate) {
          return res.status(422).json({ message: "Please check the title / content / date" });
      } else {
          // Create a new forum without specifying forumid
          const forum = new Forum({
              forumtitle,
              forumContent,
              forumAuth,
              forumDate
          });

          await forum.save();

          return res.status(200).json({ message: "Forum entered successfully" });
      }
  } catch (err) {
      // Handle any errors
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
  }
})

const forumReply = asyncHandler(async (req,res) => {
    const { forumRep } = req.body;
  const forumId = req.params.forumId; // Use req.params.forumId directly

  try {
    // Find the forum based on its unique identifier (e.g., forumId)
    const forum = await Forum.findOne({ id: forumId });

    if (!forum) {
      return res.status(404).json({ error: 'Forum not found' });
    }

    // Add the new reply to the existing replies
    forum.forumReplies.push(forumRep);

    // Save the updated forum
    await forum.save();

    res.status(200).json({ message: 'Reply sent!' });
  } catch (error) {
    console.error('Error replying:', error);
    res.status(500).json({ error: 'Error replying' });
  }
})

const getForums = asyncHandler(async (req,res) => {
      try{
        const allForums = await Forum.find({})
        res.send({ data : allForums})
      }catch(err){
        console.log(err)
      }
})

module.exports = {forums,forumReply,getForums}