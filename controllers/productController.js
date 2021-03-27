const router = require('express').Router();

// require the product service
const productService = require('../services/productService.js');

// GET listing of all products
// Address http://server:port/Gobrella
// returns JSON
router.get('/', async (req, res) => {

    // Get products
    try {
        // Call the product service to get a list of products
        // getProducts() is an async function so use await
        const result = await productService.getGobrella();
        // send json result via HTTP
        res.json(result);

      // Catch and send any errors  
      } catch (err) {
        res.status(500);
        res.send(err.message);
      }
});


// Export as a module
module.exports = router;