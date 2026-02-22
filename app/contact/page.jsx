"use client";

import { useState } from "react";

export default function Contact() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const skillsList = ["HTML", "CSS", "JavaScript", "React", "Node.js"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]{1,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!nameRegex.test(formData.name)) {
      return "❌ Name must be only letters (Max 30 characters)";
    }

    if (!emailRegex.test(formData.email)) {
      return "❌ Please enter a valid email address";
    }

    if (!phoneRegex.test(formData.phone)) {
      return "❌ Phone number must be exactly 10 digits";
    }

    if (!selectedSkill) {
      return "❌ Please select a skill";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = validateForm();

    if (errorMessage) {
      setAlert({ type: "error", message: errorMessage });
      return;
    }

    setLoading(true);
    setAlert({ type: "", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          skill: selectedSkill,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert({
          type: "success",
          message: "✅ Message Sent Successfully!",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        setSelectedSkill(null);
      } else {
        setAlert({
          type: "error",
          message: data.message || "❌ Something went wrong",
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "❌ Server Error! Please try again.",
      });
    }

    setLoading(false);

    setTimeout(() => {
      setAlert({ type: "", message: "" });
    }, 4000);
  };

  return (
    <main style={mainStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={headingStyle}>Contact Me</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gap: "20px" }}>

            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                required
                maxLength="30"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Email Address</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Mobile Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                maxLength="10"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Your Skill</label>
              <div style={skillContainer}>
                {skillsList.map((skill) => (
                  <SkillToggle
                    key={skill}
                    label={skill}
                    active={selectedSkill === skill}
                    onClick={() => setSelectedSkill(skill)}
                  />
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                style={textareaStyle}
              />
            </div>

            <button type="submit" style={buttonStyle} disabled={loading}>
              {loading ? "Sending..." : "Send Message 🚀"}
            </button>

            {/* 🔥 ALERT NOW AT BOTTOM */}
            {alert.message && (
              <div
                style={{
                  marginTop: "10px",
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  textAlign: "center",
                  backgroundColor:
                    alert.type === "success" ? "#dcfce7" : "#fee2e2",
                  color:
                    alert.type === "success" ? "#166534" : "#991b1b",
                }}
              >
                {alert.message}
              </div>
            )}

          </div>
        </form>
      </div>
    </main>
  );
}

/* Skill Toggle */
function SkillToggle({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "10px 18px",
        borderRadius: "999px",
        border: active ? "1px solid #6366f1" : "1px solid #d1d5db",
        backgroundColor: active ? "#6366f1" : "#ffffff",
        color: active ? "#ffffff" : "#374151",
        fontSize: "14px",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

/* Styles */
const mainStyle = {
  minHeight: "100vh",
  backgroundColor: "#f9fafb",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
};

const cardStyle = {
  maxWidth: "700px",
  width: "100%",
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};

const headingStyle = {
  fontSize: "36px",
  fontWeight: "700",
  color: "#111827",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontSize: "14px",
  fontWeight: "500",
  color: "#374151",
};

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
};

const textareaStyle = {
  ...inputStyle,
  resize: "none",
};

const buttonStyle = {
  padding: "13px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#6366f1",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
};

const skillContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
};