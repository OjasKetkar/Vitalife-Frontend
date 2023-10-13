const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: './uploads' });
const {
  registerSeller,
  signinSellers,
  sell,
  getSellers
} = require('../controllers/sellController');

router.post('/sell/register', registerSeller).get(getSellers);
router.post('/sell/signin', signinSellers);
router.post('/nav/sell', upload.single('image'), sell);
router.get('/getAllSellers', getSellers)

module.exports = router;