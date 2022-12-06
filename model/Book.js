
const mongoose  = require("mongoose")


const BookSchema  =new  mongoose.Schema({
    bookName: {type: String, required:true},
    writer: {type: String},
    image: {type: String},
    description: {type: String},
    rating: {type:String},
    pages: {type:String}, 
    price: {type: Number}, 
    quantity: {type:Number, default:1}
})

mongoose.models = {}
module.exports = mongoose.model("Book", BookSchema)
// export default mongoose.model('Book', BookSchema);