export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* Left Section */}
        <div style={sectionStyle}>
          <h2 style={logoStyle}>Hunting_Coder73</h2>
          <p style={textStyle}>
            Building modern web experiences with passion and creativity.
          </p>
        </div>

        {/* Middle Section */}
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Quick Links</h3>
          <ul style={listStyle}>
            <li><a href="/" style={linkStyle}>Home</a></li>
            <li><a href="/about" style={linkStyle}>About</a></li>
            <li><a href="/contact" style={linkStyle}>Contact</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Follow Me</h3>
          <div style={socialContainer}>
            <a href="#" style={socialStyle}>Instagram</a>
            <a href="#" style={socialStyle}>LinkedIn</a>
            <a href="#" style={socialStyle}>GitHub</a>
          </div>
        </div>
      </div>

      <div style={bottomBar}>
        © {new Date().getFullYear()} Hunting_Coder73. All rights reserved.
      </div>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: "#111827",
  color: "#e5e7eb",
  padding: "60px 40px 20px 40px",
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "auto",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "40px",
};

const sectionStyle = {
  flex: "1 1 250px",
};

const logoStyle = {
  fontSize: "22px",
  marginBottom: "15px",
  color: "#ffffff",
};

const headingStyle = {
  fontSize: "18px",
  marginBottom: "15px",
  color: "#ffffff",
};

const textStyle = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#9ca3af",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};

const linkStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#9ca3af",
  textDecoration: "none",
};

const socialContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const socialStyle = {
  color: "#9ca3af",
  textDecoration: "none",
};

const bottomBar = {
  borderTop: "1px solid #374151",
  marginTop: "40px",
  paddingTop: "15px",
  textAlign: "center",
  fontSize: "14px",
  color: "#6b7280",
};
