"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseOver = () => setIsHovering(true);
    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener("mousemove", mouseMove);

    const links = document.querySelectorAll("a, button");
    links.forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      links.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver);
        el.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, []);

  return (
    <>
      {/* Main Small Cursor */}
      <motion.div
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={smallCursor}
      />

      {/* Blob Effect Cursor */}
      <motion.div
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        style={blobCursor}
      />
    </>
  );
}

const smallCursor = {
  position: "fixed",
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: "#38bdf8",
  pointerEvents: "none",
  zIndex: 9999,
};

const blobCursor = {
  position: "fixed",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "rgba(56, 189, 248, 0.3)",
  pointerEvents: "none",
  zIndex: 9998,
  backdropFilter: "blur(5px)",
};
