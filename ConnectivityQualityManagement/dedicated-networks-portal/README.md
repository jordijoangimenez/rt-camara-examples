# 5G-MAG · CAMARA Dedicated Networks Portal

## Quick start

### 1. Copy and fill in your credentials
```bash
cp .env.example .env
# Edit .env — set CLIENT_ID, CLIENT_SECRET, TOKEN_URL, and the API URLs
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the server
```bash
node server.js
```

Open **http://localhost:3001** — the portal loads directly.

### 4. (Optional) Expose for webhook notifications
```bash
npx localtunnel --port 3001
# Paste the tunnel URL into .env as SINK_BASE_URL, then restart
```

## Project structure
```
dedicated-networks-portal/
  .env.example              All required environment variables
  server.js                 Express entry point (port 3001)
  public/
    index.html              Portal UI (served at /)
  services/
    tokenService.js         OAuth2 token cache + auto-refresh
    apiService.js           Authenticated fetch wrapper
    webhookService.js       Inbound notification store
  routes/
    areas.js                /api/areas
    networks.js             /api/networks
    accesses.js             /api/accesses + devices
    profiles.js             /api/profiles
    sessions.js             /api/sessions
    webhooks.js             /webhooks (inbound) + /api/webhooks (polling)
```

## API routes
| Method | Path | Description |
|--------|------|-------------|
| POST | /api/areas/retrieve | Retrieve service areas |
| GET  | /api/areas/:id | Get a specific area |
| GET  | /api/networks | List networks |
| POST | /api/networks | Create network |
| GET  | /api/networks/:id | Get network |
| DELETE | /api/networks/:id | Delete network |
| GET  | /api/accesses | List accesses |
| POST | /api/accesses | Create access |
| GET/DELETE | /api/accesses/:id | Get/delete access |
| GET  | /api/accesses/:id/devices | List devices in access |
| POST | /api/accesses/:id/devices/add | Add devices to access |
| POST | /api/accesses/:id/devices/remove | Remove devices from access |
| GET  | /api/profiles/network | List network profiles |
| GET  | /api/profiles/qos | List QoS profiles |
| POST | /api/sessions | Create QoS session |
| GET/DELETE | /api/sessions/:id | Get/delete session |
| POST | /api/sessions/:id/extend | Extend session |
| POST | /webhooks/:resource | Inbound notifications from CAMARA |
| GET  | /api/webhooks/notifications | Poll notifications (frontend) |
