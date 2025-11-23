# UVU Autograder Demo

AI-powered code autograder prototype for UVU Computer Science Department. This demo showcases automated grading with Judge0 code execution and OpenRouter AI evaluation.

## Features

- 🎯 **LeetCode-Style Interface**: Split-pane code editor with Monaco
- ⚡ **Real-Time Execution**: Run code against test cases instantly
- 🤖 **AI-Powered Feedback**: Detailed evaluation using OpenRouter API
- 📊 **Rubric-Based Grading**: Comprehensive scoring across multiple criteria
- 📁 **Bulk Grading**: Upload CSV files to grade multiple submissions
- 🔒 **Secure Execution**: Sandboxed code execution with Judge0

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Code Editor**: Monaco Editor (VS Code)
- **Code Execution**: Judge0 CE (Docker)
- **AI Evaluation**: OpenRouter API (Claude 3.5 Sonnet)
- **CSV Processing**: PapaParse

## Prerequisites

- Node.js 18+ (with conda common_lt environment)
- Docker & Docker Compose
- OpenRouter API key

## Quick Start

### 1. Install Dependencies

```bash
conda activate common_lt
npm install
```

### 2. Start Judge0 Services

```bash
docker-compose up -d
```

Wait ~30 seconds for services to initialize, then verify:

```bash
curl http://localhost:2358/about
```

### 3. Configure Environment

Copy `.env.example` to `.env.local` and add your OpenRouter API key:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Usage

### Individual Grading

1. Select an assignment from the homepage
2. Write code in the Monaco editor
3. Click "Run Code" to test against visible test cases
4. Click "Submit" for full grading with AI feedback

### Bulk Grading

1. Navigate to "Bulk Grading" page
2. Upload CSV file (see `data/sample-submissions.csv` for format)
3. Click "Start Grading"
4. Export results as CSV when complete

## Deployment

### Vercel (Frontend Only - FREE)

⚠️ **Note**: Vercel doesn't support Docker, so Judge0 won't work. Use Judge0 public API or Railway for full functionality.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add environment variables in Vercel dashboard:
- `OPENROUTER_API_KEY`
- `JUDGE0_API_URL=https://api.judge0.com` (public API, rate-limited)

### Railway (Full Stack - $5 Free Credit)

1. Create account at [railway.app](https://railway.app)
2. Create new project → Deploy from GitHub
3. Connect this repository
4. Add environment variables in Railway dashboard
5. Railway auto-deploys with Docker Compose

**Yes, you can deploy for FREE on Vercel** (without code execution) or **Railway** (with $5 free credit for full features).

## Project Structure

```
├── app/
│   ├── page.tsx                    # Homepage
│   ├── assignment/[id]/page.tsx    # Code editor
│   ├── bulk/page.tsx               # Bulk grading
│   └── api/                        # API routes
├── components/ui/                  # UI components
├── lib/services/                   # Business logic
├── data/                           # Sample data
└── docker-compose.yml              # Judge0 setup
```

## Demo Script

1. **Homepage**: Show 5 coding problems
2. **Individual**: Solve FizzBuzz, show AI feedback
3. **Bulk Upload**: Upload `sample-submissions.csv`
4. **Export**: Download results CSV

## Git Workflow

Repository: `https://github.com/UVU-Autograder/autograder_demo.git`

```bash
# Initialize repo
git remote add origin https://github.com/UVU-Autograder/autograder_demo.git
git branch -M main
git push -u origin main

# Feature branches
git checkout -b feature/assignment-editor
git checkout -b feature/bulk-grading
git checkout -b feature/ai-evaluation
```

## Troubleshooting

### Judge0 Not Starting
```bash
docker-compose down
docker-compose up -d
docker-compose logs -f
```

### Monaco Editor Issues
```bash
rm -rf .next
npm run dev
```

## License

MIT - UVU Computer Science Department
