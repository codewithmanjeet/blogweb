"use client";

import Script from "next/script";

export default function BuyHtmlCourse() {

  const handlePayment = async () => {

    const res = await fetch("/api/create-order", {
      method: "POST"
    });

    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      name: "HuntingCoder",
      description: "HTML Course Notes",
      order_id: data.id,

      handler: function (response) {

        console.log(response);

        alert("Payment Successful!");

        window.location.href = "/blog/payment-success";
      },

      theme: {
        color: "#6366f1"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f3f4f6",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "12px",
            width: "400px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            Buy HTML Course Notes
          </h2>

          <p style={{ marginBottom: "20px", color: "#6b7280" }}>
            Pay ₹10 to unlock HTML notes and download them.
          </p>

          <button
            onClick={handlePayment}
            style={{
              width: "100%",
              padding: "12px",
              background: "#6366f1",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Pay ₹10
          </button>
        </div>
      </div>
    </>
  );
}