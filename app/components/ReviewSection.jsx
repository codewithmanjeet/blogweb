"use client";

import { useEffect, useState } from "react";
import { supabaseReview } from "../../lib/supabaseReview.js";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // ================= GET USER SESSION =================
  useEffect(() => {
    getCurrentUser();
    fetchReviews();

    const { data: listener } = supabaseReview.auth.onAuthStateChange(() => {
      getCurrentUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const getCurrentUser = async () => {
    const {
      data: { session },
    } = await supabaseReview.auth.getSession();

    if (session?.user) {
      console.log("FULL USER DATA:", session.user);
      setUser(session.user);
    } else {
      setUser(null);
    }
  };

  // ================= FETCH REVIEWS =================
  const fetchReviews = async () => {
    const { data, error } = await supabaseReview
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Fetch Error:", error);
    }

    setReviews(data || []);
  };

  // ================= SUBMIT REVIEW =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      return;
    }

    if (!message || rating === 0) {
      alert("Please write message & select rating");
      return;
    }

    // ✅ STRONG AVATAR LOGIC
    const avatar =
      user.user_metadata?.avatar_url ||
      user.user_metadata?.picture ||
      user.identities?.[0]?.identity_data?.avatar_url ||
      user.identities?.[0]?.identity_data?.picture ||
      `https://ui-avatars.com/api/?name=${user.email}`;

    console.log("Saving Avatar URL:", avatar);

    const { error } = await supabaseReview.from("reviews").insert([
      {
        name: user.user_metadata?.full_name || user.email,
        message: message,
        rating: rating,
        avatar_url: avatar,
        user_id: user.id,
      },
    ]);

    if (error) {
      console.log("Insert Error:", error);
      alert("Error saving review");
    } else {
      console.log("Review Saved Successfully");
    }

    setMessage("");
    setRating(0);
    fetchReviews();
  };

  // ================= DELETE REVIEW =================
  const handleDelete = async (id) => {
    await supabaseReview.from("reviews").delete().eq("id", id);
    fetchReviews();
  };

  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>💬 Customer Reviews</h2>

      {!user && (
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Please login to write a review.
        </p>
      )}

      {user && (
        <form onSubmit={handleSubmit} style={formStyle}>
          <textarea
            placeholder="Write your review..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={textareaStyle}
          />

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
      )}

      <div style={cardContainer}>
        {reviews.map((review) => (
          <div key={review.id} style={cardStyle}>
            <div style={cardHeader}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <img
                  src={
                    review.avatar_url ||
                    `https://ui-avatars.com/api/?name=${review.name}`
                  }
                  alt="user"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                />
                <h4 style={{ margin: 0 }}>{review.name}</h4>
              </div>

              <div style={{ color: "#facc15" }}>
                {"★".repeat(review.rating)}
              </div>
            </div>

            <p style={{ marginTop: "10px", color: "#cbd5e1" }}>
              {review.message}
            </p>

            {user && review.user_id === user.id && (
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
  marginBottom: "70px",
};

const textareaStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #334155",
  background: "#1e293b",
  color: "white",
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
  background: "#0ea5e9",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
  color: "white",
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