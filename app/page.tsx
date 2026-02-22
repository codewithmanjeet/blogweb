"use client";

import { useEffect, useState } from "react";
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
            <h1 className="hero-title" style={headingStyle}>
              Welcome To Hunting_Coder73 Blog Post
            </h1>

            <p className="hero-para" style={paragraphStyle}>
              <span className="highlight">Manjeet Chauhan</span> is a creative
              and hardworking individual from{" "}
              <span className="highlight">Village Devsar</span> with a strong
              interest in technology and digital innovation. He enjoys learning
              new skills and turning ideas into practical projects, especially
              in{" "}
              <span className="highlight-skill">
                Website Design, JavaScript, React, and Next.js
              </span>.
            </p>
          </div>
        </motion.main>
      )}

      <style jsx>{`
        .highlight {
          color: #facc15;
          font-weight: 600;
        }

        .highlight-skill {
          color: #38bdf8;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

const loaderStyle = {
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

const counterStyle = {
  fontSize: "60px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const progressContainer = {
  width: "250px",
  height: "6px",
  backgroundColor: "#374151",
  borderRadius: "10px",
  overflow: "hidden",
};

const progressBar = {
  height: "100%",
  backgroundColor: "#38bdf8",
  transition: "width 0.2s ease",
};

const mainStyle = {
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

const containerStyle = {
  maxWidth: "900px",
};

const headingStyle = {
  fontSize: "48px",
  fontWeight: "700",
  marginBottom: "20px",
  color: "#ffffff",
};

const paragraphStyle = {
  fontSize: "18px",
  lineHeight: "1.8",
  color: "#e5e7eb",
};
