import Razorpay from "razorpay";

export const runtime = "nodejs";

export async function POST() {

  try {

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const options = {
      amount: 100, // ₹1 (Razorpay paisa में लेता है)
      currency: "INR",
      receipt: "html_course_order"
    };

    const order = await razorpay.orders.create(options);

    return Response.json(order);

  } catch (error) {

    console.error("Razorpay Error:", error);

    return Response.json(
      { error: "Order creation failed" },
      { status: 500 }
    );

  }

}