import { useState } from 'react'
import axios from 'axios'

function App() {
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState(""); // Define fileUrl state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fileData = new FormData();
      fileData.append("file", file)
      
      const responseData = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: fileData,
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
          "Content-Type": "multipart/form-data",
        }
      })
      const url = "https://gateway.pinata.cloud/ipfs/" + responseData.data.IpfsHash;
      setFileUrl(url); // Update fileUrl state with the fetched URL
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>IPFS Tutorial-Upload your PDF File </h1>
      <form>
        <input type='file' accept='application/pdf' onChange={(e) => setFile(e.target.files[0])} />
        <button type='submit' onClick={handleSubmit}>Upload</button>
      </form>

      {fileUrl && (
        <div>
          <iframe src={fileUrl} title="Uploaded PDF" width="100%" height="500px"></iframe>
        </div>
      )}
    </div>
  )
}

export default App;
