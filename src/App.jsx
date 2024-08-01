import { useState } from "react";
import axios from "axios";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleGenerateImage = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: inputText,
          n: 1,
          size: "1024x1024",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );
      setImageUrl(response.data.data[0].url);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Text to Image Generator</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to generate image"
        style={{ width: "300px", padding: "10px", marginBottom: "20px" }}
      />
      <br />
      <button onClick={handleGenerateImage} style={{ padding: "10px 20px" }}>
        Generate Image
      </button>
      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <h2>Generated Image:</h2>
          <img src={imageUrl} alt="Generated" style={{ width: "50%" }} />
        </div>
      )}
    </div>
  );
};

export default App;
