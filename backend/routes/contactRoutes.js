const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts
} = require('../controllers/contactController');

router.post('/', createContact);
router.get('/getAllContacts',getContacts);

module.exports = router;