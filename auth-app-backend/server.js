const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const saml2 = require("saml2-js");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Frontend origin

// Load certificates and keys
const privateKey = fs.readFileSync(path.join(__dirname, "bin", "private_key.pem"), "utf-8");
const certificate = fs.readFileSync(path.join(__dirname, "bin", "certificate.pem"), "utf-8");
const idpCertificate = fs.readFileSync(path.join(__dirname, "bin", "idp_certificate.pem"), "utf-8");

// IdP Configuration
const idp = new saml2.IdentityProvider({
  sso_login_url: "https://www.myidp.ibm.com/isam/sps/saml20idp/saml20/login",
  sso_logout_url: "https://www.myidp.ibm.com/isam/sps/saml20idp/saml20/sloinitial?RequestBinding=HTTPRedirect",
  certificates: [idpCertificate],
});

// SP Configuration
const sp = new saml2.ServiceProvider({
  entity_id: "http://localhost:4000/metadata.xml",
  private_key: privateKey,
  certificate: certificate,
  assert_endpoint: "http://localhost:4000/assert",
  allow_unencrypted_assertion: true,
});

// Serve SP Metadata
app.get("/metadata.xml", (req, res) => {
  res.type("application/xml");
  res.send(sp.create_metadata());
});

// Login Route (SP-Initiated SSO)
app.get("/login", (req, res) => {
  sp.create_login_request_url(idp, {}, (err, login_url) => {
    if (err) {
      console.error("Error creating login request:", err);
      return res.status(500).send("Error creating login request");
    }
    res.redirect(login_url);
  });
});

// Assertion Consumer Service (ACS)
app.post("/assert", (req, res) => {
  console.log("Full SAML Response:", JSON.stringify(req.body, null, 2));
  const options = { request_body: req.body };

  sp.post_assert(idp, options, (err, saml_response) => {
    if (err) {
      console.error("Error processing SAML response:", err);
      return res.status(500).send("Error processing SAML response");
    }

    console.log("SAML response received:", saml_response);

    if (!saml_response.user) {
      console.error("No user information found in SAML response");
      return res.status(500).send("Invalid SAML response");
    }

    console.log("User information:", saml_response.user);
    // Store user information in a cookie
    res.cookie("user", JSON.stringify(saml_response.user), { httpOnly: true });
    
    // Redirect to frontend dashboard
    res.redirect("http://localhost:3000/dashboard");
  });
});

// Logout Route (SP-Initiated Logout)
app.get("/logout", (req, res) => {
  const name_id = req.cookies.user ? JSON.parse(req.cookies.user).name_id : null;
  const session_index = req.cookies.user ? JSON.parse(req.cookies.user).session_index : null;

  if (!name_id || !session_index) {
    console.warn("No valid SAML session found for logout.");
    return res.redirect("http://localhost:3000");
  }

  const options = { name_id, session_index };

  sp.create_logout_request_url(idp, options, (err, logout_url) => {
    if (err) {
      console.error("Error creating logout request:", err);
      return res.status(500).send("Error processing logout");
    }
    
    // Clear session and cookies
    res.clearCookie("user");

    // Redirect user to IdP logout URL
    res.redirect(logout_url);
  });
});

// Handle Logout Response (from IdP)
app.post("/logout/callback", (req, res) => {
  const options = { request_body: req.body };

  sp.process_logout_response(idp, options, (err) => {
    if (err) {
      console.error("Error processing logout response:", err);
      return res.status(500).send("Error processing logout response");
    }

    console.log("SAML logout successful");

    // Clear user session and cookies
    res.clearCookie("user");

    // Redirect user to the login page after logout
    res.redirect("http://localhost:3000");
  });
});

// Start the server
app.listen(4000, () => {
  console.log("SAML backend running on http://localhost:4000");
});
