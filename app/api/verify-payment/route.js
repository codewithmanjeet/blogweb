import crypto from "crypto";

export async function POST(req){

const body = await req.json()

const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

const sign = razorpay_order_id + "|" + razorpay_payment_id

const expected = crypto
.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
.update(sign)
.digest("hex")

if(expected === razorpay_signature){

return Response.json({
success:true,
downloadToken: razorpay_payment_id
})

}else{

return Response.json({ success:false })

}

}