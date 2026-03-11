"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function TopLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // 🔥 fast loader

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div style={container}>
      <div style={progress}></div>
    </div>
  );
}

/* STYLES */
const container = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "4px",
  backgroundColor: "transparent",
  zIndex: 9999,
};

const progress = {
  width: "100%",
  height: "100%",
  backgroundColor: "#6366f1",
  animation: "loadingBar 0.4s linear",
};
