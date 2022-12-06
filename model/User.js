const mongoose  = require('mongoose');


const UserSchema  = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String},

    email: {type: String, required: true},
    address: {type: String},
    mobile: {type:String},
    password: {type:String, required: true}, 
    role: {type: String, default: "user"}
})

mongoose.models = {};
module.exports = mongoose.model("User", UserSchema)
