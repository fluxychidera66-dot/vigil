# Vigil – Deployment Guide

## What You're Deploying

| Service | Port | Purpose |
|---------|------|---------|
| `vigil-api` | 3013 | REST API (Stripe, auth, sites/flows/incidents) |
| `vigil-crawler` | 3010 | Playwright browser crawler (uses BullMQ + Redis) |
| `vigil-transaction-runner` | 3011 | Runs user-defined transaction flows |
| `vigil-alert-manager` | 3012 | Sends Slack/email/webhook alerts |
| `redis` | 6379 | Job queue for crawler & transaction runner |

---

## Step 1 — Fill in `.env.vigil`

Before deploying, fill in these remaining values:

| Variable | Where to get it |
|----------|----------------|
| `DATABASE_URL` | Supabase → Settings → Database → Connection string (URI mode) — replace `[YOUR-DB-PASSWORD]` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → `service_role` (secret) key |
| `STRIPE_SECRET_KEY` | [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys) |
| `STRIPE_PUBLISHABLE_KEY` | Same as above |
| `STRIPE_WEBHOOK_SECRET` | See Step 3 below |
| `JWT_SECRET` | Your OpenReplay instance → `/etc/openreplay/vars.yaml` → `jwt_secret` |
| `SMTP_USER` / `SMTP_PASS` | Your email provider credentials |
| `SLACK_WEBHOOK_URL` | [Slack API → Incoming Webhooks](https://api.slack.com/apps) |
| `DASHBOARD_URL` | Your production frontend URL (e.g., `https://app.yourdomain.com`) |
| `ALLOWED_ORIGINS` | Same as DASHBOARD_URL |

---

## Step 2 — Option A: Deploy with Docker (your own server)

```bash
# Copy your env file
cp .env.vigil .env

# Build and start all services
docker-compose -f docker-compose.vigil.yml up -d --build

# Check health
curl http://localhost:3013/health
curl http://localhost:3010/health
curl http://localhost:3011/health
curl http://localhost:3012/health
```

---

## Step 2 — Option B: Deploy to Railway

Railway deploys each service as a separate container.

### Services to create on Railway:
1. **Redis** → Add a Redis plugin from the Railway dashboard
2. **vigil-api** → Root dir: `vigil/api`, Port: `3013`
3. **vigil-crawler** → Root dir: `vigil/crawler`, Port: `3010`
4. **vigil-transaction-runner** → Root dir: `vigil/transaction-runner`, Port: `3011`
5. **vigil-alert-manager** → Root dir: `vigil/alert-manager`, Port: `3012`

### For each service, add these env vars from `.env.vigil`
(Railway's Redis plugin will give you a `REDIS_URL` automatically)

### For vigil-api, also set:
- `VIGIL_API_PORT=3013`

---

## Step 3 — Set Up Stripe Webhook

After deploying vigil-api, register your Stripe webhook:

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. URL: `https://your-vigil-api-domain.railway.app/webhooks/stripe`
4. Events to listen for:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Signing secret** → paste as `STRIPE_WEBHOOK_SECRET` in your env

---

## Step 4 — Update Frontend Config

In your frontend code, update the API base URL to point to your deployed `vigil-api`:

```ts
// frontend/app/services/VigilService.ts (or wherever Vigil API calls are made)
const VIGIL_API_URL = 'https://your-vigil-api-domain.railway.app';
```

Also update the `UpgradeModal.tsx` to use real Stripe Checkout links instead of `https://stripe.com`.

---

## Step 5 — Verify Everything Works

```bash
# Test API health
curl https://your-vigil-api-domain.railway.app/health

# Check DB connection (should return sites list)
curl -H "Authorization: Bearer YOUR_JWT" \
     https://your-vigil-api-domain.railway.app/api/vigil/sites

# Trigger a test alert
curl -X POST http://your-alert-manager:3012/alert/test
```

---

## Supabase Details

| Item | Value |
|------|-------|
| Project | Vigil |
| Project ID | `ctuifjonnpbsdrdcukrl` |
| Region | `us-east-1` |
| API URL | `https://ctuifjonnpbsdrdcukrl.supabase.co` |
| Storage Bucket | `vigil-failures` |
| Dashboard | https://supabase.com/dashboard/project/ctuifjonnpbsdrdcukrl |

## Stripe Products

| Plan | Price | Price ID |
|------|-------|----------|
| Growth | $50/mo | `price_1TGqVOCinBycNhITBgvN65j1` |
| Business | $150/mo | `price_1TGqVPCinBycNhITdzojvIg3` |
| Pro | $300/mo | `price_1TGqVPCinBycNhITGqFVPYh2` |
