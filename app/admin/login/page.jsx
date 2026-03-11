"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [shake, setShake] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      localStorage.setItem("admin", "true");
      router.push("/admin/dashboard");
    } else {
      setErrorPopup(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className={`card ${shake ? "shake" : ""}`}>
        <h2 className="title">Admin Login</h2>

        <form onSubmit={handleLogin} className="form">
          <div className="inputBox">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="inputBox">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Please Wait..." : "Login"}
          </button>
        </form>
      </div>

      {errorPopup && (
        <div className="overlay">
          <div className="popup">
            <h3>Login Failed</h3>
            <p>Incorrect Email or Password</p>
            <button onClick={() => setErrorPopup(false)}>
              Try Again
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #141e30, #243b55);
          font-family: "Poppins", sans-serif;
        }

        .card {
          width: 400px;
          padding: 45px 35px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          text-align: center;
          transition: 0.3s ease;
        }

        .title {
          color: white;
          margin-bottom: 30px;
          font-size: 26px;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .inputBox {
          position: relative;
          width: 100%;
        }

        input {
          width: 100%;
          padding: 14px 15px;
          border-radius: 12px;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.12);
          color: white;
          font-size: 14px;
          transition: 0.3s ease;
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        input:focus {
          box-shadow: 0 0 10px #00f2fe;
          background: rgba(255, 255, 255, 0.18);
        }

        .inputBox span {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          font-size: 16px;
        }

        button {
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(45deg, #00f2fe, #4facfe);
          color: white;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 242, 254, 0.4);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup {
          background: white;
          padding: 35px;
          border-radius: 15px;
          text-align: center;
          animation: pop 0.3s ease;
        }

        .popup h3 {
          margin-bottom: 10px;
          color: red;
        }

        .popup p {
          margin-bottom: 15px;
        }

        .popup button {
          padding: 8px 20px;
          border-radius: 8px;
          background: #ff4d4d;
          color: white;
        }

        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          50% { transform: translateX(8px); }
          75% { transform: translateX(-8px); }
          100% { transform: translateX(0); }
        }

        .shake {
          animation: shake 0.4s;
        }

        @keyframes pop {
          from { transform: scale(0.7); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @media (max-width: 450px) {
          .card {
            width: 90%;
            padding: 35px 25px;
          }
        }
      `}</style>
    </div>
  );
}