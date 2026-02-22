"use client";

export default function Blog() {
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
        <BlogCard
          title="HTML (HyperText Markup Language)"
          desc="HTML is the foundation of every website. It structures web content using headings, paragraphs, images and links. It is the skeleton of a webpage."
          date="HTML Basics"
        />

        <BlogCard
          title="CSS (Cascading Style Sheets)"
          desc="CSS is used to design and style websites. It controls colors, layout, spacing, fonts and responsiveness."
          date="CSS Styling"
        />

        <BlogCard
          title="JavaScript (JS)"
          desc="JavaScript adds interactivity to websites like sliders, popups, form validation and dynamic updates."
          date="JavaScript Power"
        />
      </div>
    </main>
  );
}

function BlogCard({ title, desc, date }) {
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
        height: "100%",   // important
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

      {/* Button Always Bottom */}
      <button
        style={{
          marginTop: "auto",   // 🔥 magic line
          padding: "10px 18px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#6366f1",
          color: "#ffffff",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        Read More →
      </button>

      <style jsx>{`
        .card:hover {
          transform: translateY(-8px);
        }
      `}</style>
    </div>
  );
}