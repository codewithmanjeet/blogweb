import Razorpay from "razorpay";

export async function POST() {

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });

  const options = {
    amount: 1000, // ₹10 (Razorpay paisa में लेता है)
    currency: "INR",
    receipt: "html_course_order"
  };

  const order = await razorpay.orders.create(options);

  return Response.json(order);
}