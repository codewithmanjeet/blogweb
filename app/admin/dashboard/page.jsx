"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetch("/api/admin-entries")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEntries(data);
        } else {
          setEntries([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setEntries([]);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Delete this entry?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/delete-entry/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setEntries((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert("Delete Failed ❌");
    }
  };

  return (
    <div className="container">
      <div className="topBar">
        <h1>📊 Admin Dashboard</h1>
        <div className="countBox">
          Total Entries <span>{entries.length}</span>
        </div>
      </div>

      {loading && <p className="loading">Loading...</p>}

      {!loading && entries.length > 0 && (
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Skill</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {entries.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <span className="skillBadge">{item.skill}</span>
                  </td>

                  <td
                    className="messageCell"
                    onClick={() => setSelectedMessage(item.message)}
                  >
                    {item.message}
                  </td>

                  <td>
                    <button
                      className="deleteBtn"
                      onClick={() => handleDelete(item.id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedMessage && (
        <div className="overlay" onClick={() => setSelectedMessage(null)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h3>Full Message</h3>
            <p>{selectedMessage}</p>
            <button onClick={() => setSelectedMessage(null)}>Close</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 40px;
          background: linear-gradient(135deg, #141e30, #243b55);
          color: white;
          font-family: "Segoe UI", sans-serif;
        }

        .topBar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .countBox {
          background: rgba(255,255,255,0.1);
          padding: 10px 18px;
          border-radius: 10px;
          font-size: 14px;
        }

        .countBox span {
          color: #00f2fe;
          font-weight: bold;
          margin-left: 6px;
        }

        .tableWrapper {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(15px);
          border-radius: 15px;
          padding: 20px;
          overflow-x: auto;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 900px;
        }

        thead {
          background: linear-gradient(45deg, #00f2fe, #4facfe);
        }

        th {
          padding: 15px;
          text-align: left;
          font-size: 14px;
          color: black;
          position: sticky;
          top: 0;
        }

        td {
          padding: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          font-size: 14px;
        }

        tbody tr {
          transition: 0.3s;
        }

        tbody tr:hover {
          background: rgba(255,255,255,0.08);
          transform: scale(1.01);
        }

        .skillBadge {
          background: linear-gradient(45deg, #00f2fe, #4facfe);
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          color: black;
        }

        .messageCell {
          max-width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
          color: #00f2fe;
        }

        .deleteBtn {
          padding: 6px 14px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(45deg, #ff4d4d, #ff0000);
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }

        .deleteBtn:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(255,0,0,0.4);
        }

        .loading {
          text-align: center;
          margin-top: 40px;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup {
          background: white;
          color: black;
          padding: 25px;
          border-radius: 12px;
          width: 400px;
          max-width: 90%;
        }

        .popup button {
          margin-top: 15px;
          padding: 8px 15px;
          background: #00f2fe;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}