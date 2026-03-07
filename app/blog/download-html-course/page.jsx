export default function DownloadHtmlCourse() {

  return (
    <div style={{padding:"40px", textAlign:"center"}}>

      <h1>HTML Course Download</h1>

      <p>Your payment was successful.</p>

      <p>Click below to download course files.</p>

      <a href="/api/download-html-course">
        <button style={{
          padding:"12px 20px",
          background:"green",
          color:"white",
          border:"none",
          borderRadius:"6px",
          cursor:"pointer"
        }}>
          Download Course
        </button>
      </a>

    </div>
  )
}