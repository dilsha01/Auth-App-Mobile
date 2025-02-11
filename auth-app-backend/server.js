const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Add this line
const cookieParser = require('cookie-parser'); // Ensure cookie-parser is also imported
const fs = require('fs');
const path = require('path');
const saml2 = require('saml2-js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Frontend origin

// Load certificates and keys from files
const privateKeyPath = path.join(__dirname, "bin", "private_key.pem");
const certificatePath = path.join(__dirname, "bin", "certificate.pem");
const idpCertificatePath = path.join(__dirname, "bin", "idp_certificate.pem");

const privateKey = fs.readFileSync(privateKeyPath, "utf-8");
const certificate = fs.readFileSync(certificatePath, "utf-8");
const idpCertificate = fs.readFileSync(idpCertificatePath, "utf-8");

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

// Assertion Consumer Service (ACS)
app.post("/assert", (req, res) => {
  console.log("Full SAML Response:", JSON.stringify(req.body, null, 2))
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

    // Set user session or token
    res.cookie("user", JSON.stringify(saml_response.user || {}), { httpOnly: true });

    // Redirect to frontend dashboard
    res.redirect("http://localhost:3000/dashboard");
  });
});

// Handle user login via IBM SAML API
app.post('/api/login', async (req, res) => {
  const { username, password, token} = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });

  }
  else{
    console.log("username", username)
    console.log("password", password)
    console.log("token", token)
    console.log("response.body", res.body)
  }

  try {
    const response = await fetch('https://www.myidp.ibm.com/isam/sps/saml20idp/saml20/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: new URLSearchParams({
        'username': username,
        'password': password,
        'login-form-type': 'pwd', // This may vary depending on IBM's API
        'token': true,
      }),
     
    });

    console.log(`Response Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Authentication failed' });
      console.log(response, "response")
    }

    const token = await response.text(); // IBM may return an HTML response or a token
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to connect to IBM SAML API' });
  }
});


app.listen(4000, () => console.log('Proxy server running on port 4000'));
