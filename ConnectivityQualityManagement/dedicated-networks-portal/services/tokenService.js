const fetch = require('node-fetch');

let cachedToken = null;
let tokenExpiresAt = 0;

async function getToken() {
  const now = Date.now();

  // Return cached token if still valid (with 30s safety margin)
  if (cachedToken && now < tokenExpiresAt - 30000) {
    return cachedToken;
  }

  console.log('[token] Fetching new access token...');

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', process.env.CLIENT_ID);
  params.append('client_secret', process.env.CLIENT_SECRET);

  const res = await fetch(process.env.TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token request failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;

  // expires_in is in seconds; default to 3600 if not provided
  const expiresIn = (data.expires_in || 3600) * 1000;
  tokenExpiresAt = now + expiresIn;

  console.log(`[token] Token acquired, expires in ${data.expires_in || 3600}s`);
  return cachedToken;
}

function clearToken() {
  cachedToken = null;
  tokenExpiresAt = 0;
}

module.exports = { getToken, clearToken };
