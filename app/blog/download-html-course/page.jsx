export default function DownloadHtmlCourse() {

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        minHeight: "100vh",
        background: "#f3f4f6"
      }}
    >

      <h1>HTML Course Download</h1>

      <p>Your payment was successful.</p>

      <p>Click the button below to download your course file.</p>

      <a href="/api/download-html-course?key=huntingcoder123">

        <button
          style={{
            padding: "12px 20px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          Download Course
        </button>

      </a>

    </div>
  );
}

