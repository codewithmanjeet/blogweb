"use client";

import { useEffect, useState } from "react";
import { supabaseReview } from "../../lib/supabaseReview.js";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  // unique user id (local storage)
  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("reviewUserId") ||
        localStorage.setItem(
          "reviewUserId",
          crypto.randomUUID()
        )
      : null;

  // Fetch Reviews
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

  // Submit Review
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !message) {
      alert("Please fill all fields");
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
    setRating(5);
    fetchReviews();
  };

  // Delete Review
  const handleDelete = async (id) => {
    await supabaseReview.from("reviews").delete().eq("id", id);
    fetchReviews();
  };

  return (
    <div style={{ padding: "50px 20px", background: "#111827", color: "white" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        ⭐ User Reviews
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        >
          <option value="5">5 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="1">1 ⭐</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#38bdf8",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit Review
        </button>
      </form>

      {/* Review List */}
      <div style={{ marginTop: "40px", maxWidth: "800px", marginInline: "auto" }}>
        {reviews.map((review) => (
          <div
            key={review.id}
            style={{
              background: "#1f2937",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h4>{review.name}</h4>
            <p>{review.message}</p>
            <p>{"⭐".repeat(review.rating)}</p>

            {review.user_id ===
              localStorage.getItem("reviewUserId") && (
              <button
                onClick={() => handleDelete(review.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}