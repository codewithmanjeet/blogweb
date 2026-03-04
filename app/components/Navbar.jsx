"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Check user on load + listen to auth changes
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ✅ Google Login
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  // ✅ Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <nav style={navStyle}>
        <h2 style={logoStyle}>Hunting_Coder73</h2>

        <div className="desktop-menu" style={desktopMenu}>
          <Link href="/" style={linkStyle}>Home</Link>
          <Link href="/about" style={linkStyle}>About</Link>
          <Link href="/blog" style={linkStyle}>Blog</Link>
          <Link href="/contact" style={linkStyle}>Contact</Link>

          {/* ✅ Profile Image + Logout */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {user.user_metadata?.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="profile"
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}

              <button onClick={handleLogout} style={loginButton}>
                Logout
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} style={loginButton}>
              Login
            </button>
          )}
        </div>

        <div
          className="hamburger"
          style={hamburgerStyle}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </div>
      </nav>

      {/* ✅ Mobile Menu */}
      <div className={`mobile-wrapper ${menuOpen ? "open" : ""}`}>
        <Link href="/" style={mobileLink}>Home</Link>
        <Link href="/about" style={mobileLink}>About</Link>
        <Link href="/blog" style={mobileLink}>Blog</Link>
        <Link href="/contact" style={mobileLink}>Contact</Link>

        {user ? (
          <>
            {user.user_metadata?.avatar_url && (
              <img
                src={user.user_metadata.avatar_url}
                alt="profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginTop: "10px",
                }}
              />
            )}
            <button onClick={handleLogout} style={mobileLoginButton}>
              Logout
            </button>
          </>
        ) : (
          <button onClick={handleLogin} style={mobileLoginButton}>
            Login with Google
          </button>
        )}
      </div>

      <style jsx>{`
        nav {
          position: fixed;
          top: 0;
          z-index: 1000;
        }

        .mobile-wrapper {
          background-color: #111827;
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 0 20px;
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .mobile-wrapper.open {
          padding: 20px;
          max-height: 350px;
        }

        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .hamburger {
            display: block !important;
          }
        }

        @media (min-width: 769px) {
          .hamburger {
            display: none !important;
          }
          .mobile-wrapper {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

const navStyle = {
  width: "100%",
  padding: "16px 40px",
  backgroundColor: "#111827",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
};

const logoStyle = {
  color: "#ffffff",
  fontSize: "22px",
  fontWeight: "600",
};

const desktopMenu = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

const hamburgerStyle = {
  fontSize: "26px",
  color: "#ffffff",
  cursor: "pointer",
  display: "none",
};

const linkStyle = {
  color: "#d1d5db",
  textDecoration: "none",
  fontSize: "16px",
};

const mobileLink = {
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "18px",
  padding: "5px 0",
};

const loginButton = {
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  cursor: "pointer",
};

const mobileLoginButton = {
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
};