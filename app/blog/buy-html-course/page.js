"use client"

import { useEffect } from "react"

export default function BuyCourse(){

const handlePayment = async () => {

const order = await fetch("/api/create-order",{
method:"POST"
})

const data = await order.json()

const options = {

key:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
amount:data.amount,
currency:"INR",
order_id:data.id,

handler: async function(response){

const verify = await fetch("/api/verify-payment",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

razorpay_order_id: response.razorpay_order_id,
razorpay_payment_id: response.razorpay_payment_id,
razorpay_signature: response.razorpay_signature

})

})

const result = await verify.json()

if(result.success){

// payment successful → secure download
window.location.href=`/api/download-course?token=${result.downloadToken}`

}else{

alert("Payment verification failed")

}

}

}

const rzp = new window.Razorpay(options)
rzp.open()

}

useEffect(()=>{

const script = document.createElement("script")

script.src="https://checkout.razorpay.com/v1/checkout.js"

script.async=true

document.body.appendChild(script)

},[])

return(

<div style={{padding:"100px"}}>

<h1>Buy HTML Course</h1>

<button onClick={handlePayment}>
Pay ₹1
</button>

</div>

)

}