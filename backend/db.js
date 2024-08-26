const mongoose  = require('mongoose');


const mongoUri = "mongodb://localhost:27017/"

const connectToMongo = async () => {
    await mongoose.connect(mongoUri)
    console.log("Connected to Mongo Successfully")
}

module.exports = connectToMongo

