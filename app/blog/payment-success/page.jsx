export default function PaymentSuccess() {
  return (
    <div style={{textAlign:"center",padding:"80px"}}>

      <h1>Payment Successful 🎉</h1>

      <p>Your HTML course notes are now unlocked.</p>

      <a href="/blog/download-html-course">

        <button
          style={{
            padding:"12px 20px",
            background:"#6366f1",
            color:"white",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer"
          }}
        >
          Download HTML Notes
        </button>

      </a>

    </div>
  );
}