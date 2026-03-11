"use client"

export default function Download(){

const download = async () => {

const token = localStorage.getItem("token")

const res = await fetch("/api/download-course",{

headers:{
token
}

})

const blob = await res.blob()

const url = window.URL.createObjectURL(blob)

const a = document.createElement("a")

a.href = url
a.download = "html-course.zip"

a.click()

}

return(

<div style={{padding:"100px"}}>

<h1>Download HTML Course</h1>

<button onClick={download}>
Download Course
</button>

</div>

)

}