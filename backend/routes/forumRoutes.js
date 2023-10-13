const express = require('express');
const router = express.Router();

const {
    forums,
    forumReply,
    getForums
} = require('../controllers/forumController');

router.post('/forums', forums);
router.post('/forumReply/:forumId', forumReply);
router.get('/getAllForums',getForums);

module.exports = router;