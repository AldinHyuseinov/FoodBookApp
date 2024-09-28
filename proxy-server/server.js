import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/proxy", async (req, res) => {
  try {
    let { url } = req.query;

    if (!url.startsWith("https://www.")) {
      if (url.startsWith("www.")) {
        url = `https://${url}`;
      } else {
        url = `https://www.${url}`;
      }
    }

    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching the page");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
