import mongoose from "mongoose"

const PaymentSchema = new mongoose.Schema({

email:String,

course:String,

paymentId:String,

orderId:String,

date:{
type:Date,
default:Date.now
}

})

export default mongoose.models.Payment ||
mongoose.model("Payment",PaymentSchema)