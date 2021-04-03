const mongoose  = require("mongoose")
const schema = mongoose.Schema

const stockSchema = new schema({
    ticker: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    jsonString: {
        type: String,
        required: true
    }
}, {timestamps: true}) 

const stock = mongoose.model('Stock')