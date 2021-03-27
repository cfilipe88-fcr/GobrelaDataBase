// Dependencies
// Input validation package
// https://www.npmjs.com/package/validator
const validator = require('validator');

// require the database connection
const productRepository = require('../repositories/productRepository.js');

// Get all Gobrellas via the repository
// return Gobrella
let getGobrella = async () => {
    const Gobrella = await productRepository.getGobrella();
    return Gobrella;
};



// Module exports
// expose these functions
    module.exports = {
    getGobrella,
    
};