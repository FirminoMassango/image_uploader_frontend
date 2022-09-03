import { useState } from "react";
import axios from "axios";

function ImageUploader() {
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("Choose Image");
  const [uploadedImage, setUploadedImage] = useState<any>({});
  const [uploadPercentage, setUploadPercentage] = useState(0);

  function onChange(e: any) {
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  }

  async function onSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
        // onUploadProgress: (progressEvent): any => {
        //   setUploadPercentage(
        //     parseInt(
        //     //   Math.round((progressEvent.loaded * 100) / progressEvent.total)
        //     )
        //   );
        // },
      });

      const { imageName, imagePath } = res.data;

      setUploadedImage({ imageName, imagePath });
    } catch (err: any) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="file" id="customImage" onChange={onChange} />
        <label htmlFor="customImage">{imageName}</label>
        <input type="submit" value="Upload" />
      </form>
      {uploadedImage ? (
        <div>
          <h3>{uploadedImage.fileName}</h3>
          <img src={uploadedImage.filePath} alt="" />
        </div>
      ) : null}
    </>
  );
}

export default ImageUploader;
