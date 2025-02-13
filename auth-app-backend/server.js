require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const https = require("https");

const app = express();
const PORT = 4000;

// Ignore self-signed SSL certificate errors
const agent = new https.Agent({
  rejectUnauthorized: false,
});

app.use(express.json());
app.use(cors());

// Step 01 - Get Authentication Cookie
app.post("/api/auth/init", async (req, res) => {
  try {
    const response = await axios.post(
      "https://www.myidp.ibm.com/mga/sps/apiauthsvc/policy/password",
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cookie: process.env.AUTH_COOKIE,
        },
        httpsAgent: agent,
      }
    );

    console.log("Init Response:", response.data);

    // Extract `stateId` from the response's `location`
    const stateId = response.data.location
      ? new URL(response.data.location).searchParams.get("StateId")
      : null;

    if (!stateId) {
      return res.status(400).json({ error: "StateId not found in response" });
    }

    res.json({ stateId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Step 02 - Authenticate User
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password, stateId } = req.body;
    
    if (!stateId) {
      return res.status(400).json({ error: "StateId is required" });
    }

    console.log("Login Request:", { username, password, stateId });

    const response = await axios.put(
      `https://www.myidp.ibm.com/mga/sps/apiauthsvc?StateId=${stateId}`,
      { username, password }, // Use actual input, not hardcoded values
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cookie: process.env.AUTH_COOKIE,
        },
        httpsAgent: agent,
      }
    );

    console.log("Login Response Status:", response.status);

    if (response.status === 204) {
      res.json({ message: "Authentication successful" });
    } else {
      res.json(response.data);
    }
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});


// Step 03 - Fetch User Info
// Step 03 - Fetch User Info
// Step 03 - Fetch User Info
app.get("/api/user/me", async (req, res) => {
  try {
    const authCookie = req.headers.cookie || process.env.AUTH_COOKIE;

    if (!authCookie || !authCookie.includes("IV_JCT") || !authCookie.includes("JSESSIONID") || !authCookie.includes("PD-S-SESSION-ID")) {
      return res.status(400).json({ error: "Invalid or missing authentication cookies" });
    }

    console.log("Fetching User Info - Headers:", { Cookie: authCookie });

    const response = await axios.get("https://www.myidp.ibm.com/scim/Me", {
      headers: {
        Cookie: authCookie,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      httpsAgent: agent,
    });

    console.log("User Info Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("User Info Fetch Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
