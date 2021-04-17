const router = require('express').Router();
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


// POST - Insert a new product.
// This async function sends a HTTP POST request
router.post('/', async (req, res) => {

  // the request body contains the new product values - copy it
  const newStation = req.body;
  
  // show what was copied in the console (server side)
  console.log("productController: ", newStation);
  
  // Pass the new product data to the service and await the result
  try {
  
  // Send response with JSON result
  result = await productService.createStation(newStation);
  
  // send a json response back to the client
  res.json(result);
  
  // handle server (status 500) errors
  } catch (err) {
  res.status(500)
  res.send(err.message)
  }
  });

// Export as a module
module.exports = router;