const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = Schema({
    name:{
        type: String,
        required:[true, " item must have name"]
    },
    stock:{
        type: Number
    },
    prize:{
        type: Number,
        required:[true, " item must have prize"]
    },
    cost:{
        type: Number,
        required:[true, " item must have cost"]
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Categories"
    },

    
}, { timestamps : true})

module.exports = mongoose.model('Items', itemSchema)