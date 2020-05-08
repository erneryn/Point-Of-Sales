const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = Schema({
    name:{
        type: String,
        required:[true, " Category must have name"]
    }
})

module.exports = mongoose.model('Categories', categorySchema)