const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let latestData = {};

// Test route
app.get("/data", (req, res) => {
  const now = Date.now();

  // अगर 5 सेकंड से data नहीं आया → ESP32 OFF
  if (!lastUpdated || (now - lastUpdated > 5000)) {
    return res.json({
      status: "offline"
    });
  }

  res.json({
    status: "online",
    ...latestData
  });
});
// ESP32 data receive karega
app.post("/data", (req, res) => {
  latestData = req.body;
  console.log("Data Received:", latestData);
  res.send("OK");
});

// Frontend ko data dega
app.get("/data", (req, res) => {
  res.json(latestData);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
