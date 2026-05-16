# DevStats Showcase

Visualize your developer stats and share your profile with beautiful, interactive cards.

## Features

- GitHub OAuth authentication
- Real-time GitHub stats (stars, forks, repos)
- Top languages visualization
- Top repositories showcase
- Clean, modern UI
- Responsive design

## Tech Stack

- Next.js 15 (App Router)
- NextAuth.js for GitHub OAuth
- Octokit (GitHub API)
- Tailwind CSS
- TypeScript

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a GitHub OAuth App:
   - Go to https://github.com/settings/developers
   - Click "New OAuth App"
   - Set Homepage URL: `http://localhost:3000`
   - Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
   - Copy Client ID and Client Secret

4. Create `.env.local` file:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

5. Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

6. Run development server:
```bash
npm run dev
```

7. Open http://localhost:3000

## Deploy to Vercel

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Update GitHub OAuth App callback URL to your Vercel domain

---

Dibuat oleh **Fiqih Badrian** © 2026
