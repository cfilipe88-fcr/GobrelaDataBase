// Input validation package
// https://www.npmjs.com/package/validator
const validator = require('validator');

// models
const Station = require('../models/Gobrella.js');

// Validate the body data, sent by the client, for a new product
// formProduct represents the data filled in a form
// It needs to be validated before using in gthe application
let validateNewStation = (formStation) => {

// Declare constants and variables
let validatedStation;

// debug to console - if no data
if (formStation === null) {
console.log("validateNewStation(): Parameter is null");
}

// Validate form data for new product fields
// Creating a product does not need a product id
// Adding '' to the numeric values makes them strings for validation purposes ()
// appending + '' to numbers as the validator only works with strings

if (

validator.isNumeric(formStation._id + '', { no_symbols: true, allow_negatives: false }) &&
!validator.isEmpty(formStation.Station) &&
!validator.isEmpty(formStation.Station_address) &&
validator.isNumeric(formStation.Gobrella_description + '', { no_symbols: true, allow_negatives: false }))
{

// Validation passed
// create a new Product instance based on Product model object
// no value for product id (passed as null)
validatedStation = new Station(
null,
formStation._id,

// escape is to sanitize - it removes/ encodes any html tags
validator.escape(formStation._id),
validator.escape(formStation.Station),
formStation.Station_address,
formStation.Gobrella_description
);

} else {

// debug
console.log("validateNewStation(): Validation failed");
}

// return new validated product object
return validatedStation;
}

// Module exports
// expose these functions

module.exports = {
validateNewStation,

}