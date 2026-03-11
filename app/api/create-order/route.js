import Razorpay from "razorpay";

export async function POST(req) {

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: 100, 
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  try {

    const order = await razorpay.orders.create(options);

    return Response.json(order);

  } catch (error) {

    return Response.json({ error: error.message });

  }
}