const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = Schema({
    name:{
        type: String,
        required:[true, " Category must have name"]
    },
    items:[
        {
            type: Schema.Types.ObjectId,
            ref: "Items"
        }
    ]
})

module.exports = mongoose.model('Categories', categorySchema)