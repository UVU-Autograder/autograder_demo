# Quick Start Guide

Get the UVU Autograder running in 5 minutes!

## Prerequisites

- ✅ Node.js 18+ installed (via conda common_lt)
- ✅ Docker Desktop running
- ✅ OpenRouter API key

## Step 1: Clone & Install (2 min)

```bash
git clone https://github.com/UVU-Autograder/autograder_demo.git
cd autograder_demo
conda activate common_lt
npm install
```

## Step 2: Start Judge0 (1 min)

```bash
docker-compose up -d
```

Wait 30 seconds, then verify:
```bash
curl http://localhost:2358/about
```

You should see Judge0 version info.

## Step 3: Configure API Key (1 min)

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your OpenRouter key:
```
OPENROUTER_API_KEY=sk-or-v1-YOUR-KEY-HERE
```

Don't have a key? Get one free at [openrouter.ai](https://openrouter.ai)

## Step 4: Run the App (1 min)

```bash
npm run dev
```

Open http://localhost:3000 🎉

## What to Try

### 1. Individual Grading (2 min)
- Click "FizzBuzz" problem
- Modify the starter code
- Click "Run Code" to test
- Click "Submit" for AI feedback

### 2. Bulk Grading (3 min)
- Click "Bulk Grading" button
- Upload `data/sample-submissions.csv`
- Click "Start Grading"
- Watch 10 submissions get graded automatically
- Export results as CSV

## Troubleshooting

### "Judge0 not responding"
```bash
docker-compose logs judge0-server
# Wait 30 more seconds, services take time to start
```

### "Cannot connect to Docker daemon"
- Start Docker Desktop
- On Linux: `sudo systemctl start docker`

### "OpenRouter API error"
- Check your API key is correct
- Verify you have credits at openrouter.ai
- Fallback evaluation will activate if API fails

## Next Steps

1. **Customize Assignments**: Edit `data/assignments.json`
2. **Deploy**: See `DEPLOYMENT.md` for Vercel/Railway
3. **Add More Problems**: Follow the JSON structure
4. **Integrate with LMS**: Add authentication later

## Demo Script for Committee

### 5-Minute Demo

**Minute 1-2: Show the Problem**
- Homepage with 5 coding problems
- Click FizzBuzz
- Explain the LeetCode-style interface

**Minute 3: Live Coding**
- Write a simple solution
- Run code → show test results
- Submit → show AI feedback with rubric scores

**Minute 4: Bulk Grading**
- Navigate to bulk grading
- Upload sample CSV
- Show real-time progress
- Display results table

**Minute 5: Export & Discuss**
- Export results to CSV
- Show feedback quality
- Discuss scalability and cost

### Key Points to Emphasize

✨ **No Manual Grading**: Automated test execution
✨ **Intelligent Feedback**: AI provides personalized suggestions
✨ **Scalable**: Handle 100+ students with bulk upload
✨ **Cost-Effective**: ~$0.01 per submission for AI
✨ **Familiar UX**: LeetCode-style interface students know
✨ **Flexible Rubrics**: Customize grading criteria per assignment

## Project Stats

- 📁 21 TypeScript/React files
- 🎯 5 sample coding problems
- 👥 10 sample student submissions
- 🐳 3 Docker services (Judge0, PostgreSQL, Redis)
- 🤖 AI-powered evaluation with Claude 3.5 Sonnet
- 💰 FREE to deploy on Vercel

## Architecture Highlights

### Clean & Modular
```
lib/services/
  ├── judge0.service.ts      # Code execution
  ├── openrouter.service.ts  # AI evaluation  
  └── grading.service.ts     # Orchestration
```

### MVC Pattern
- **Models**: `lib/types.ts` (TypeScript interfaces)
- **Views**: `app/**/*.tsx` (React components)
- **Controllers**: `app/api/**/*.ts` (API routes)

### Best Practices
- ✅ TypeScript for type safety
- ✅ Service layer for business logic
- ✅ Docker for reproducible environments
- ✅ Environment-based configuration
- ✅ RESTful API design

## Resource Links

- **OpenRouter**: https://openrouter.ai (Get API key)
- **Judge0**: https://ce.judge0.com (Documentation)
- **Vercel**: https://vercel.com (Free deployment)
- **Railway**: https://railway.app ($5 credit)
- **GitHub Repo**: https://github.com/UVU-Autograder/autograder_demo

## Questions?

Check the main `README.md` for detailed documentation or review `DEPLOYMENT.md` for hosting options.

Happy grading! 🎓

