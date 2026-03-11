export default function About() {
  return (
    <main style={{ fontFamily: "Arial, sans-serif" }}>
      
      {/* SECTION 1 */}
      <section
        style={{
          backgroundColor: "#eef2f3",
          padding: "80px 40px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            gap: "60px",
            flexWrap: "wrap",
          }}
        >
          {/* Left Image */}
          <div style={{ flex: "1 1 450px" }}>
            <img
              src="/about1.jpg"
              alt="About Image"
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          {/* Right Text */}
          <div style={{ flex: "1 1 500px" }}>
            <h2
              style={{
                fontSize: "32px",
                marginBottom: "20px",
                color: "#111827",
              }}
            >
              Our Founding
            </h2>

            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.8",
                color: "#4b5563",
              }}
            >
              Hello! My name is <strong>Manjeet</strong>. I am passionate about
              building modern and user-friendly web applications using
              JavaScript, React, and Next.js.
              <br /><br />
              My journey started with curiosity and turned into a deep love for
              development. Every project helps me grow and improve my skills.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section
        style={{
          backgroundColor: "#ffffff",
          padding: "80px 40px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            gap: "60px",
            flexWrap: "wrap",
            flexDirection: "row-reverse",
          }}
        >
          {/* Image Right */}
          <div style={{ flex: "1 1 450px" }}>
            <img
              src="/about2.jpg"
              alt="Office Image"
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          {/* Text Left */}
          <div style={{ flex: "1 1 500px" }}>
            <h2
              style={{
                fontSize: "32px",
                marginBottom: "20px",
                color: "#111827",
              }}
            >
              Early Growth & Funding
            </h2>

            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.8",
                color: "#4b5563",
              }}
            >
              With dedication and continuous learning, I expanded my knowledge
              in frontend and backend development.
              <br /><br />
              Today, I focus on building scalable and meaningful digital
              products that help people learn and grow in technology.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
