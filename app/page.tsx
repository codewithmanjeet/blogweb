"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={loaderStyle}
          >
            <motion.h1
              style={counterStyle}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {count}%
            </motion.h1>

            <div style={progressContainer}>
              <motion.div
                style={{
                  ...progressBar,
                  width: `${count}%`,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.main
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={mainStyle}
        >
          <div style={containerStyle}>
            <h1 style={headingStyle}>
              Welcome To Hunting_Coder73 Blog Post
            </h1>

            <p style={paragraphStyle}>
              <span style={highlightStyle}>Manjeet Chauhan</span> is a creative
              and hardworking individual from{" "}
              <span style={highlightStyle}>Village Devsar</span> with a strong
              interest in technology and digital innovation. He enjoys learning
              new skills and turning ideas into practical projects, especially
              in{" "}
              <span style={skillHighlightStyle}>
                Website Design, JavaScript, React, and Next.js
              </span>.
            </p>
          </div>
        </motion.main>
      )}
    </>
  );
}

/* ================= STYLES ================= */

const loaderStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "#111827",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  color: "white",
};

const counterStyle: CSSProperties = {
  fontSize: "60px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const progressContainer: CSSProperties = {
  width: "250px",
  height: "6px",
  backgroundColor: "#374151",
  borderRadius: "10px",
  overflow: "hidden",
};

const progressBar: CSSProperties = {
  height: "100%",
  backgroundColor: "#38bdf8",
  transition: "width 0.2s ease",
};

const mainStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "40px",
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('/bg.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const containerStyle: CSSProperties = {
  maxWidth: "900px",
};

const headingStyle: CSSProperties = {
  fontSize: "48px",
  fontWeight: "700",
  marginBottom: "20px",
  color: "#ffffff",
};

const paragraphStyle: CSSProperties = {
  fontSize: "18px",
  lineHeight: "1.8",
  color: "#e5e7eb",
};

const highlightStyle: CSSProperties = {
  color: "#facc15",
  fontWeight: 600,
};

const skillHighlightStyle: CSSProperties = {
  color: "#38bdf8",
  fontWeight: 600,
};