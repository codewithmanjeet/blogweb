import fs from "fs"
import path from "path"

export async function GET(req){

const { searchParams } = new URL(req.url)

const token = searchParams.get("token")

if(!token){
return new Response("Access Denied",{status:403})
}

const filePath = path.join(process.cwd(),"secure_courses","html-course.zip")

const fileBuffer = fs.readFileSync(filePath)

return new Response(fileBuffer,{
headers:{
"Content-Type":"application/zip",
"Content-Disposition":"attachment; filename=html-course.zip"
}
})

}