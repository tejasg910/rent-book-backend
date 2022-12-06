
const Book = require('./model/Book')
const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');

const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()

const signUp = require('./userApi/signup.js')
const port  =process.env.PORT ||  5000;
app.use(cors({
    origin: "http://localhost:3000", 
}))
try {

    //https://rent-book-backend.vercel.app/   backend host url

// mongoose.connect('mongodb://localhost:27017/bookabook');
mongoose.connect("mongodb+srv://vercel-admin-user:bX3uM28wdUdXKgC8@cluster0.ytbgztf.mongodb.net/bookabook?retryWrites=true&w=majority").then(()=>{

    console.log('connected mongo')
}).catch((error)=>{
    console.log(error)
});

    
} catch (error) {
    console.log(error)
}






app.get('/', (req, res)=>{
res.json({success: true})
})
app.post("/addbook", express.json(), async(req, res)=>{
// name, writer, image, rating, pages, 

try {
    const {bookName, writer, image, rating, pages, price} = req.body;

const data =  new Book({bookName, writer, image, rating, pages, price});

await data.save()

res.status(200).json({success: true, message: "Product added successfully"})
    
} catch (error) {
    res.status(400).json({success: false, message: "Something went wrong"})
}

})



app.get('/getbooks',async (req, res)=>{

    try {

        const data  = await Book.find({});
        res.status(200).json({success: true, message: "got the data", data})
        
    } catch (error) {
        res.status(500).json({success: false, message: "something went wrong"})
    }
})


app.post("/getbookdetails",express.json(), async(req, res)=>{


    console.log(req.body)

    try {
        const {bookId} = req.body;
    const book = await Book.findById({_id: bookId});

    res.status(200).json({success: true, message: "book loaded successfully", book})
    } catch (error) {
        res.status(500).json({success: false, message: "something went wrong", error})
    }
    

})


app.post('/api/tokenemail', express.json(), async(req, res)=>{
    try {

        const {token} = req.body;
        
         jwt.verify(token, process.env.JWT_SECRET_KEY, (err, value)=>{
           
            if(err){
                res.status(500).json({success:false, message: "someting went wrong", err})
            }else{
                res.status(200).json({success:true, value})

            }
        });
      
        
    } catch (error) {
        res.status(400).json({success: false, message: "something went wrong", error})
      
        
    }
})

app.use('/api', require('./userApi/signup'))
app.use('/api', require('./userApi/signin'))
app.use('/api', require('./admin/check'))
app.use('/api', require('./admin/adminlogin'))





app.listen(port, ()=>{
    console.log("server started successfully on ", port)
})

