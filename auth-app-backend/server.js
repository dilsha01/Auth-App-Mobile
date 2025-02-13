// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const https = require("https");

// const app = express();
// const PORT = 4000;

// // Ignore self-signed SSL certificate errors
// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });

// app.use(express.json());
// app.use(cors());

// // Step 01 - Get Authentication Cookie
// app.post("/api/auth/init", async (req, res) => {
//   try {
//     const response = await axios.post(
//       "https://www.myidp.ibm.com/mga/sps/apiauthsvc/policy/password",
//       {},
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Cookie: process.env.AUTH_COOKIE,
//         },
//         httpsAgent: agent,
//       }
//     );

//     console.log("Init Response:", response.data);

//     // Extract `stateId` from the response's `location`
//     const stateId = response.data.location
//       ? new URL(response.data.location).searchParams.get("StateId")
//       : null;

//     if (!stateId) {
//       return res.status(400).json({ error: "StateId not found in response" });
//     }

//     res.json({ stateId });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// // Step 02 - Authenticate User
// app.post("/api/auth/login", async (req, res) => {
//   try {
//     const { username, password, stateId } = req.body;
    
//     if (!stateId) {
//       return res.status(400).json({ error: "StateId is required" });
//     }

//     console.log("Login Request:", { username, password, stateId });

//     const response = await axios.put(
//       `https://www.myidp.ibm.com/mga/sps/apiauthsvc?StateId=${stateId}`,
//       { username, password }, // Use actual input, not hardcoded values
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Cookie: process.env.AUTH_COOKIE,
//         },
//         httpsAgent: agent,
//       }
//     );

//     console.log("Login Response Status:", response.status);

//     if (response.status === 204) {
//       res.json({ message: "Authentication successful" });
//     } else {
//       res.json(response.data);
//     }
//   } catch (error) {
//     console.error("Login Error:", error.response?.data || error.message);
//     res.status(500).json({ error: error.response?.data || error.message });
//   }
// });


// // Step 03 - Fetch User Info
// // Step 03 - Fetch User Info
// // Step 03 - Fetch User Info
// app.get("/api/user/me", async (req, res) => {
//   try {
//     const authCookie = req.headers.cookie || process.env.AUTH_COOKIE;

//     if (!authCookie || !authCookie.includes("IV_JCT") || !authCookie.includes("JSESSIONID") || !authCookie.includes("PD-S-SESSION-ID")) {
//       return res.status(400).json({ error: "Invalid or missing authentication cookies" });
//     }

//     console.log("Fetching User Info - Headers:", { Cookie: authCookie });

//     const response = await axios.get("https://www.myidp.ibm.com/scim/Me", {
//       headers: {
//         Cookie: authCookie,
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       httpsAgent: agent,
//     });

//     console.log("User Info Response:", response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.error("User Info Fetch Error:", error.response?.data || error.message);
//     res.status(500).json({ error: error.response?.data || error.message });
//   }
// });



// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// const https = require("https");
// const axios = require("axios");
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = 4000;

// // Ignore self-signed SSL certificate errors (not recommended for production)
// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });

// app.use(express.json());
// app.use(cors());

// // Utility function to set common axios configurations
// const getAxiosConfig = (cookie) => ({
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Cookie: cookie,
//   },
//   httpsAgent: agent,
// });

// // Step 01 - Get Authentication Cookie
// app.post("/api/auth/init", async (req, res) => {
//   try {
//     const response = await axios.post(
//       "https://www.myidp.ibm.com/mga/sps/apiauthsvc/policy/password",
//       {},
//       getAxiosConfig(process.env.AUTH_COOKIE)
//     );

//     console.log("Init Response:", response.data);

//     const stateId = response.data.location
//       ? new URL(response.data.location).searchParams.get("StateId")
//       : null;

//     if (!stateId) {
//       return res.status(400).json({ error: "StateId not found in response" });
//     }

//     res.json({ stateId });
//   } catch (error) {
//     console.error("Init Error:", error.response?.data || error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Step 02 - Authenticate User
// // Step 2 - Authenticate User and Store Cookies
// app.post("/api/auth/login", async (req, res) => {
//   try {
//     const { username, password, stateId } = req.body;

//     if (!stateId) {
//       return res.status(400).json({ error: "StateId is required" });
//     }

//     const response = await axios.put(
//       `https://www.myidp.ibm.com/mga/sps/apiauthsvc?StateId=${stateId}`,
//       { username, password },
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Cookie: process.env.AUTH_COOKIE, // Initial auth cookie
//         },
//         httpsAgent: agent,
//       }
//     );

//     // Extract new cookies from response
//     const setCookieHeader = response.headers["set-cookie"];
//     if (!setCookieHeader) {
//       return res.status(500).json({ error: "Authentication failed, no session cookies received" });
//     }

//     const sessionCookies = setCookieHeader.join("; "); // Combine cookies
//     console.log("Updated Session Cookies:", sessionCookies);

//     // Store the updated cookies dynamically (in-memory)
//     process.env.AUTH_COOKIE = sessionCookies;

//     res.json({ message: "Authentication successful", cookies: sessionCookies });
//   } catch (error) {
//     console.error("Login Error:", error.response?.data || error.message);
//     res.status(500).json({ error: error.response?.data || error.message });
//   }
// });


// // Step 03 - Fetch User Info
// app.get("/api/user/me", async (req, res) => {
//   try {
//     const authCookie = req.headers.cookie || process.env.AUTH_COOKIE;

//     if (!authCookie || !authCookie.includes("IV_JCT") || !authCookie.includes("JSESSIONID") || !authCookie.includes("PD-S-SESSION-ID")) {
//       return res.status(400).json({ error: "Invalid or missing authentication cookies" });
//     }

//     const response = await axios.get("https://www.myidp.ibm.com/scim/Me", getAxiosConfig(authCookie));

//     res.json(response.data);
//   } catch (error) {
//     console.error("User Info Fetch Error:", error.response?.data || error.message);
//     res.status(500).json({ error: error.response?.data || error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const https = require("https");
const axios = require("axios");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 4000;

// Ignore self-signed SSL certificate errors (⚠️ Not recommended for production)
const agent = new https.Agent({ rejectUnauthorized: false });

app.use(express.json());
app.use(cors());

let sessionCookies = ""; // Store session cookies in memory

// Utility function to set common axios configurations
const getAxiosConfig = (cookie) => ({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Cookie: cookie || sessionCookies, // Use latest session cookies
  },
  httpsAgent: agent,
});

// Step 01 - Get Authentication Cookie
// Store cookies dynamically

app.post("/api/auth/init", async (req, res) => {
  try {
    const response = await axios.post(
      "https://www.myidp.ibm.com/mga/sps/apiauthsvc/policy/password",
      {},
      getAxiosConfig()
    );

    console.log("Init Response Headers:", response.headers);
    console.log("Init Response Data:", response.data);

    const stateId = response.data.location
      ? new URL(`https://www.myidp.ibm.com${response.data.location}`).searchParams.get("StateId")
      : null;

    if (!stateId) {
      return res.status(400).json({ error: "StateId not found in response" });
    }

    // Store session cookies
    sessionCookies = response.headers["set-cookie"]?.join("; ") || "";
    console.log("Stored Session Cookies:", sessionCookies);

    res.json({ stateId });
  } catch (error) {
    console.error("Init Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});



// Step 02 - Authenticate User and Store Cookies
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password, stateId } = req.body;

    if (!stateId) {
      return res.status(400).json({ error: "StateId is required" });
    }

    if (!sessionCookies) {
      return res.status(400).json({ error: "Session cookies missing from init request" });
    }

    console.log("Using StateId:", stateId);
    console.log("Sending Cookies:", sessionCookies);

    const response = await axios.put(
      `https://www.myidp.ibm.com/mga/sps/apiauthsvc?StateId=${stateId}`,
      { username, password },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cookie: sessionCookies, // Use stored cookies
        },
        httpsAgent: agent,
      }
    );

    // Update session cookies
    const setCookieHeader = response.headers["set-cookie"];
    if (!setCookieHeader) {
      return res.status(500).json({ error: "Authentication failed, no session cookies received" });
    }

    sessionCookies = setCookieHeader.join("; ");
    console.log("Updated Session Cookies:", sessionCookies);

    res.json({ message: "Authentication successful", cookies: sessionCookies });
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});



// Step 03 - Fetch User Info
function extractEssentialCookies(rawCookies) {
  const requiredCookies = ["IV_JCT", "JSESSIONID", "PD-S-SESSION-ID"];

  return rawCookies
    .split("; ")
    .map(cookie => cookie.split(";")[0]) // Remove attributes (e.g., Secure, Path)
    .map(cookie => {
      let [key, value] = cookie.split("=");
      if (requiredCookies.includes(key.trim())) {
        return `${key.trim()}=${value}`;
      }
      return null;
    })
    .filter(Boolean) // Remove null values
    .join("; ");
}

app.get("/api/auth/user", async (req, res) => {
  try {
    console.log("=== Step 03: Fetching User Info ===");

    if (!sessionCookies) {
      console.error("❌ Error: Session cookies missing.");
      return res.status(400).json({ error: "Session cookies missing. Login required." });
    }

    // Strip attributes and send only key-value pairs
    const formattedCookies = extractEssentialCookies(sessionCookies);
    console.log("🔍 Sending Cookies:", formattedCookies);

    const axiosConfig = {
      headers: {
        Accept: "application/json",
        Cookie: formattedCookies,
      },
      httpsAgent: agent, // Ensure HTTPS handling
    };

    const response = await axios.get("https://www.myidp.ibm.com/scim/Me", axiosConfig);

  
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.put("/api/auth/user", async (req, res) => {
  try {
    console.log("=== Step 04: Updating User Info ===");

    if (!sessionCookies) {
      
      return res.status(400).json({ error: "Session cookies missing. Login required." });
    }

    const userData = req.body; // JSON payload from request

    // Strip unnecessary attributes and send only key-value pairs for cookies
    const formattedCookies = extractEssentialCookies(sessionCookies);
    

    const axiosConfig = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: formattedCookies,
      },
      httpsAgent: agent, // Ensure HTTPS handling
    };

    const response = await axios.put("https://www.myidp.ibm.com/scim/Me", userData, axiosConfig);

    
    res.json(response.data);
  } catch (error) {
    console.error("Update User Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
