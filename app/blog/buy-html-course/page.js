"use client"

import { useEffect } from "react"

export default function BuyCourse(){

const handlePayment = async () => {

if(!window.Razorpay){
alert("Razorpay SDK failed to load")
return
}

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

script.onload = () => {
console.log("Razorpay Loaded")
}

document.body.appendChild(script)

},[])

return(

<div style={{
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(135deg,#020617,#0f172a)"
}}>

<div style={{
width:"360px",
background:"#111827",
padding:"30px",
borderRadius:"14px",
boxShadow:"0px 15px 40px rgba(0,0,0,0.6)",
textAlign:"center",
color:"white",
marginBlock: "2%",
position: "absolute",
top: "12%",
}}>

<img 
src="/htmlcourse.png"
style={{
width:"28%",
borderRadius:"10px",
marginBottom:"20px",
}}
/>

<h1 style={{
fontSize:"24px",
marginBottom:"10px"
}}>
Complete HTML Course
</h1>

<p style={{
color:"#9ca3af",
fontSize:"14px",
marginBottom:"20px"
}}>
Learn HTML from beginner to advanced with notes and real projects.
</p>

<div style={{
textAlign:"left",
fontSize:"14px",
color:"#d1d5db",
marginBottom:"20px"
}}>
<p>✔ Beginner to Advanced</p>
<p>✔ Downloadable Notes</p>
<p>✔ Practice Projects</p>
<p>✔ Lifetime Access</p>
</div>

<h2 style={{
fontSize:"32px",
color:"#22c55e",
marginBottom:"20px"
}}>
₹1
</h2>

<button
onClick={handlePayment}
style={{
width:"100%",
background:"#22c55e",
border:"none",
padding:"12px",
borderRadius:"8px",
fontSize:"16px",
color:"white",
cursor:"pointer",
transition:"0.3s"
}}
>
Buy Now
</button>

<p style={{
marginTop:"15px",
fontSize:"12px",
color:"#9ca3af"
}}>
Secure payment powered by Razorpay
</p>

</div>

<div style={{padding:"100px"}}>

<h1>Buy HTML Course</h1>

<button onClick={handlePayment}>
Pay ₹1
</button>

</div>

</div>

)

}