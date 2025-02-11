const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Handle user login via IBM SAML API
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
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
        'token': 'true',
      }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Authentication failed' });
    }

    const token = await response.text(); // IBM may return an HTML response or a token
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to connect to IBM SAML API' });
  }
});


app.listen(5000, () => console.log('Proxy server running on port 5000'));
