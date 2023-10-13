const express = require('express');
const router = express.Router();
const {
  registerBuyer,
  getBuyers,
  catalogue,
  updateStock,
  deleteStock,
  getProducts
} = require('../controllers/catalogueController');

router.post('/catalogue/register', registerBuyer).get(getBuyers);
router.post('/catalogue', catalogue)
router.put('/updateStock/:productId', updateStock)
router.delete('/deleteProduct/:productId', deleteStock)
router.get('/getAllProducts',getProducts);

module.exports = router;