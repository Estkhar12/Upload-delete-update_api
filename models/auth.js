const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const authSchema = new Schema({
    fileUrl:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Auth", authSchema);