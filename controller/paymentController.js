
 const Razorpay = require('razorpay')

 const checkout =async (req, res)=>{
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_PAYMENT_ID,
        key_secret: process.env.RAZORPAY_SECRET_KEY,
      });
    const options = {
        amount: 50000,  // amount in the smallest currency unit
        currency: "INR",
        // receipt: "order_rcptid_11"
      };
      
    const order = await  instance.orders.create(options)
      console.log(order)
      res.status(200).json({success: true})
    }

module.exports = checkout