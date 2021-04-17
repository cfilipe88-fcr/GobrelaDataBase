// Dependencies
// Input validation package
// https://www.npmjs.com/package/validator
const validator = require('validator');

// require the database connection
const productRepository = require('../repositories/productRepository.js');
const productValidator = require('../validators/productValidators.js');

// Get all Gobrellas via the repository
// return Gobrella
let getGobrella = async () => {
    const Gobrella = await productRepository.getGobrella();
    return Gobrella;
};

// Insert a new product
// This function accepts product data as a paramter from the controller.
let createStation = async (station) => {

    // declare variables
    let newlyInsertedStation;
    
    // Call the product validator - kept seperate to avoid clutter here
    let validatedStation = productValidator.validateNewStation(station);
    
    // If validation returned a product object - save to database
    if (validatedStation != null) {
    newlyInsertedStation = await productRepository.createStation(validatedStation);
    } else {
    
    // Product data failed validation
    newlyInsertedStation = {"error": "invalid station"};
    
    // log the result
    console.log("productService.createStation(): form data validate failed");
    }
    
    // return the newly inserted product
    return newlyInsertedStation;
    };

// Module exports
// expose these functions
    module.exports = {
    getGobrella,
    createStation,    
};