"use client";

import { useEffect, useState } from "react";
import { supabaseReview } from "../../lib/supabaseReview.js";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // Create unique user id once
  useEffect(() => {
    if (!localStorage.getItem("reviewUserId")) {
      localStorage.setItem("reviewUserId", crypto.randomUUID());
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data } = await supabaseReview
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    setReviews(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !message || rating === 0) {
      alert("Please fill all fields and select rating");
      return;
    }

    await supabaseReview.from("reviews").insert([
      {
        name,
        message,
        rating,
        user_id: localStorage.getItem("reviewUserId"),
      },
    ]);

    setName("");
    setMessage("");
    setRating(0);
    fetchReviews();
  };

  const handleDelete = async (id) => {
    await supabaseReview.from("reviews").delete().eq("id", id);
    fetchReviews();
  };

  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>💬 Customer Reviews</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Write your review..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={textareaStyle}
        />

        {/* STAR RATING */}
        <div style={starContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              style={{
                fontSize: "28px",
                cursor: "pointer",
                transition: "0.2s",
                transform:
                  star <= (hover || rating) ? "scale(1.2)" : "scale(1)",
                color:
                  star <= (hover || rating) ? "#facc15" : "#475569",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <button type="submit" style={buttonStyle}>
          Submit Review
        </button>
      </form>

      {/* REVIEWS */}
      <div style={cardContainer}>
        {reviews.map((review) => (
          <div key={review.id} style={cardStyle}>
            <div style={cardHeader}>
              <h4 style={{ margin: 0 }}>{review.name}</h4>
              <div style={{ color: "#facc15" }}>
                {"★".repeat(review.rating)}
              </div>
            </div>

            <p style={{ marginTop: "10px", color: "#cbd5e1" }}>
              {review.message}
            </p>

            {review.user_id ===
              localStorage.getItem("reviewUserId") && (
              <button
                onClick={() => handleDelete(review.id)}
                style={deleteBtn}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= STYLES ================= */

const sectionStyle = {
  padding: "80px 20px",
  background: "linear-gradient(135deg, #0f172a, #1e293b)",
  color: "white",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "34px",
  marginBottom: "50px",
};

const formStyle = {
  maxWidth: "600px",
  margin: "auto",
  background: "rgba(255,255,255,0.06)",
  padding: "30px",
  borderRadius: "16px",
  backdropFilter: "blur(15px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  marginBottom: "70px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #334155",
  background: "#1e293b",
  color: "white",
};

const textareaStyle = {
  ...inputStyle,
  height: "110px",
  resize: "none",
};

const starContainer = {
  marginBottom: "20px",
  display: "flex",
  gap: "8px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(90deg, #38bdf8, #0ea5e9)",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
  color: "white",
  transition: "0.3s",
};

const cardContainer = {
  maxWidth: "900px",
  margin: "auto",
  display: "grid",
  gap: "25px",
};

const cardStyle = {
  background: "rgba(255,255,255,0.06)",
  padding: "25px",
  borderRadius: "16px",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  transition: "0.3s",
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const deleteBtn = {
  marginTop: "15px",
  padding: "6px 14px",
  background: "#ef4444",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
};