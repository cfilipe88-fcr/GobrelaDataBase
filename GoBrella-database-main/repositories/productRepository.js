// Dependencies

// require the database connection
const { sql, dbConnPoolPromise } = require('../database/db.js');

// models
const Gobrella = require('../models/Gobrella.js');

// Define SQL statements here for use in function below
// These are parameterised queries note @named parameters.
// Input parameters are parsed and set before queries are executed

// Get all Gobrellas from the Gobrella table
// for json path - Tell MS SQL to return results as JSON (avoiding the need to convert here)
const SQL_SELECT_ALL = 'SELECT * FROM dbo.Gobrella ORDER BY _id ASC for json path;';
const SQL_INSERT = 'INSERT INTO dbo.Gobrella (_id, Station, Station_address, Gobrella_description) VALUES (@_id, @Station, @Station_address, @Gobrella_description); SELECT * from dbo.Gobrella WHERE _id = SCOPE_IDENTITY();';


// Get all Gobrellas
// This is an async function named getGobrella defined using ES6 => syntax
let getGobrella = async () => {

    // define variable to store Gobrellas
    let Gobrellas;

    // Get a DB connection and execute SQL (uses imported database module)
    // Note await in try/catch block
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // execute query
            .query(SQL_SELECT_ALL);
        
        // first element of the recordset contains Gobrellas
        Gobrellas = result.recordset[0];

    // Catch and log errors to cserver side console 
    } catch (err) {
        console.log('DB Error - get all Gobrellas: ', err.message);
    }

    // return Gobrellas
    return Gobrellas;
};

let createStation = async (Gobrella) => {

    // Declare constanrs and variables
    let insertedStation;

    // Insert a new product
    // Note: no Product yet
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()

            // set named parameter(s) in query
            // checks for potential sql injection
            .input('_Id', sql.Int, Gobrella._id)    
            .input('Station', sql.NVarChar, Gobrella.Station)
            .input('Station_address', sql.NVarChar, Gobrella.Station_address)
            .input('Gobrella_description', sql.Int,  Gobrella.Gobrella_description)

            // Execute Query
            .query(SQL_INSERT);  
            
        // The newly inserted product is returned by the query    
        insertedStation = result.recordset[0];

        // catch and log DB errors
        } catch (err) {
            console.log('DB Error - error inserting a new station: ', err.message);
        }

        // Return the product data
        return insertedStation;
};


// Export 
module.exports = {
    getGobrella,
    createStation,
};
