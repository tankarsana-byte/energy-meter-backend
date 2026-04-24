const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let latestData = {
  voltage: 230,
  current: 2.5,
  power: 575,
  energy: 120
};

// 🔥 हर 2 सेकंड में dummy data update होगा
setInterval(() => {
  latestData = {
    voltage: (220 + Math.random() * 10).toFixed(2),
    current: (1 + Math.random() * 2).toFixed(2),
    power: (200 + Math.random() * 500).toFixed(2),
    energy: (100 + Math.random() * 50).toFixed(2)
  };

  console.log("Live Data:", latestData);
}, 2000);

// Test route
app.get("/", (req, res) => {
  res.send("Server Running ✅");
});

// ESP32 data receive karega (optional)
app.post("/data", (req, res) => {
  latestData = req.body;
  console.log("Data Received from ESP32:", latestData);
  res.send("OK");
});

// Frontend ko data dega
app.get("/data", (req, res) => {
  res.json(latestData);
});

// 🔥 Render fix (important)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
