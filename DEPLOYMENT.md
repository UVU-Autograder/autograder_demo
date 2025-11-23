# Deployment Guide

## Overview

The UVU Autograder can be deployed in several ways depending on your needs:

1. **Vercel** - FREE (Frontend only, no code execution)
2. **Railway** - $5 free credit (Full stack with Docker)
3. **Local Development** - Full features

## Option 1: Vercel Deployment (Recommended for Demo)

### Pros
- ✅ Free forever
- ✅ Instant deployment
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ GitHub integration

### Cons
- ❌ No Docker support (can't run Judge0 locally)
- ❌ Must use external Judge0 API

### Steps

1. **Prepare Repository**
   ```bash
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub: `UVU-Autograder/autograder_demo`
   - Vercel auto-detects Next.js

3. **Add Environment Variables**
   In Vercel Dashboard → Settings → Environment Variables:
   
   ```
   OPENROUTER_API_KEY=sk-or-v1-your-key-here
   JUDGE0_API_URL=https://api.judge0.com
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

4. **Use Judge0 Public API**
   
   The free public Judge0 API has limitations:
   - Rate limited (50 requests/day)
   - Slower execution
   - Good for demos
   
   For production, consider:
   - Judge0 Paid API: https://rapidapi.com/judge0-official/api/judge0-ce
   - Self-hosted Judge0 on Railway/AWS

5. **Deploy**
   ```bash
   vercel --prod
   ```

### Vercel CLI Alternative

```bash
npm i -g vercel
cd /home/qratul/rnd_projects/uvu-grading-demo
vercel login
vercel
```

---

## Option 2: Railway Deployment (Full Features)

### Pros
- ✅ Full Docker support
- ✅ Runs Judge0 locally
- ✅ $5 free credit
- ✅ Auto-deploys from GitHub
- ✅ No rate limits

### Cons
- ❌ Costs money after free credit ($5-20/month)
- ❌ Slightly slower than Vercel

### Steps

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `UVU-Autograder/autograder_demo`

3. **Configure Services**
   Railway auto-detects `docker-compose.yml` and creates:
   - Next.js app
   - Judge0 server
   - PostgreSQL
   - Redis

4. **Add Environment Variables**
   In Railway Dashboard → Variables:
   
   ```
   OPENROUTER_API_KEY=sk-or-v1-your-key-here
   JUDGE0_API_URL=http://judge0-server:2358
   NEXT_PUBLIC_APP_URL=${{RAILWAY_PUBLIC_DOMAIN}}
   ```

5. **Deploy**
   - Railway auto-deploys on git push
   - Get public URL from dashboard

---

## Option 3: Local Development

### Full Setup

1. **Start Judge0**
   ```bash
   docker-compose up -d
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local`:
   ```
   JUDGE0_API_URL=http://localhost:2358
   OPENROUTER_API_KEY=sk-or-v1-your-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Run Dev Server**
   ```bash
   conda activate common_lt
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

---

## Cost Comparison

| Platform | Monthly Cost | Features |
|----------|--------------|----------|
| **Vercel** | $0 | Frontend only, external API |
| **Railway** | $5-20 | Full stack, Docker support |
| **AWS EC2** | $10-50 | Full control, scalable |
| **DigitalOcean** | $6-20 | Droplet with Docker |

---

## Recommended Setup for Committee Demo

### Phase 1: Prototype Demo (Use Vercel)
- Deploy to Vercel for free
- Use Judge0 public API
- Show UI/UX and AI feedback
- Note: Code execution may be slow due to public API

### Phase 2: Internal Testing (Use Railway)
- Deploy to Railway with $5 credit
- Full Judge0 integration
- Test with real student submissions
- Evaluate performance

### Phase 3: Production (Scale as Needed)
- Move to AWS/GCP for custom scaling
- Dedicated Judge0 infrastructure
- Database optimization
- CDN for global access

---

## Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `JUDGE0_API_URL` | Judge0 API endpoint | `http://localhost:2358` |
| `OPENROUTER_API_KEY` | OpenRouter API key | `sk-or-v1-...` |
| `OPENROUTER_MODEL` | AI model to use | `anthropic/claude-3.5-sonnet` |
| `NEXT_PUBLIC_APP_URL` | Public app URL | `https://app.vercel.app` |

---

## Troubleshooting Deployment

### Vercel: "Judge0 not responding"
- Using public API: Wait 30s, retry
- Check `JUDGE0_API_URL` is correct
- Verify Judge0 public API is online

### Railway: "Services not starting"
- Check Docker Compose syntax
- Verify environment variables
- Review Railway logs

### Local: "Port 2358 already in use"
```bash
docker-compose down
sudo lsof -i :2358
kill -9 <PID>
docker-compose up -d
```

---

## Next Steps After Deployment

1. **Test All Features**
   - Individual grading
   - Bulk upload
   - AI feedback generation

2. **Load Test**
   - Use sample-submissions.csv
   - Measure response times
   - Monitor API costs

3. **Share with Committee**
   - Prepare demo script
   - Show live grading
   - Export results

4. **Gather Feedback**
   - Instructor usability
   - Student experience
   - Feature requests

---

## Production Considerations

### Security
- [ ] Add authentication (NextAuth.js)
- [ ] Rate limiting on API routes
- [ ] Input sanitization
- [ ] CORS configuration

### Scalability
- [ ] Add Redis caching
- [ ] Queue system for bulk processing (BullMQ)
- [ ] Database connection pooling
- [ ] CDN for static assets

### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Cost tracking (OpenRouter usage)
- [ ] Uptime monitoring

---

## Support

For deployment issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Judge0 Documentation](https://ce.judge0.com)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

