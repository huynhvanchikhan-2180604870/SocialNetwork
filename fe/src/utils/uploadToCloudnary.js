export const uploadToCloudnary = async(pics) =>{
    if(pics){
        const data = new FormData()
        data.append("file", pics)
        data.append("upload_preset", "social");
        data.append("cloud_name", "dcc239rej");
// CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dcc239rej
        // const res = await fetch(
        //   "cloudinary://376165253461279:JAY4vGGSD4Kr4IlpfJHYT5JhRqU@dcc239rej"
        // );
        const res = await fetch("https://api.cloudinary.com/v1_1/dcc239rej/image/upload",
           { method: 'post',
            body:data
           }
        );

        const fileData = await res.json()
        return fileData.url.toString()
    }else{
        console.log("error from upload function")
    }
}