"use client";

import { useRouter } from "next/navigation";

export default function Blog() {

  const router = useRouter();

  const goToPayment = () => {
    router.push("/blog/buy-html-course"); // ✅ Correct path
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "60px 40px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1
          style={{
            fontSize: "44px",
            fontWeight: "700",
            color: "#111827",
            marginBottom: "10px",
          }}
        >
          Web Development Basics
        </h1>

        <p style={{ fontSize: "16px", color: "#6b7280" }}>
          Learn the building blocks of modern websites
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* HTML CARD */}
        <BlogCard
          title="HTML Course Notes"
          desc="If you want basic HTML notes to start your web development journey, click the button below and pay a small amount. After payment you will be able to read and download the HTML notes."
          date="HTML Basics"
          buttonText="Buy HTML Notes"
          onClick={goToPayment}
        />

        {/* CSS CARD */}
        <BlogCard
          title="CSS (Cascading Style Sheets)"
          desc="CSS course notes are currently under development. These notes will help you learn styling, layouts and responsive design."
          date="Coming Soon"
          buttonText="Coming Soon"
          disabled={true}
        />

        {/* JS CARD */}
        <BlogCard
          title="JavaScript (JS)"
          desc="JavaScript course notes are currently under development. Soon you will be able to learn JavaScript concepts and build interactive websites."
          date="Coming Soon"
          buttonText="Coming Soon"
          disabled={true}
        />
      </div>
    </main>
  );
}

function BlogCard({ title, desc, date, buttonText, onClick, disabled }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "28px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      className="card"
    >
      <p style={{ fontSize: "14px", color: "#6366f1", marginBottom: "8px" }}>
        {date}
      </p>

      <h2
        style={{
          fontSize: "22px",
          fontWeight: "600",
          color: "#111827",
          marginBottom: "12px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          fontSize: "16px",
          color: "#4b5563",
          lineHeight: "1.7",
        }}
      >
        {desc}
      </p>

      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          marginTop: "auto",
          padding: "10px 18px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: disabled ? "#9ca3af" : "#6366f1",
          color: "#ffffff",
          fontSize: "14px",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {buttonText}
      </button>

      <style jsx>{`
        .card:hover {
          transform: translateY(-8px);
        }
      `}</style>
    </div>
  );
}