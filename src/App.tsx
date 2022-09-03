import { useState } from "react";
import ImageUploader from "./assets/components/ImageUploader";

function App() {
  const [uploaded, setUploaded] = useState(null);

  return <ImageUploader />;
}

export default App;
