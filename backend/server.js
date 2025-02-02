const express = require("express");
const axios = require("axios");
const cors = require("cors");  // Import cors

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5173',  // Allow only this origin
}));

// Proxy route to fetch quiz data
app.get("/api/quiz", async (req, res) => {
    try {
      const response = await axios.get("https://api.jsonserve.com/Uw5CrX");
      res.json(response.data); // Send the fetched data as a response
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      res.status(500).json({ error: "Failed to fetch quiz data" });
    }
});
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
