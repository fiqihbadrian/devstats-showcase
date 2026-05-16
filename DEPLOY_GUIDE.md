# 🚀 LANGKAH-LANGKAH DEPLOY GITHUB PROFILE SHOWCASE

## Step 1: Buat GitHub OAuth App

1. Buka https://github.com/settings/developers
2. Klik **"New OAuth App"**
3. Isi form:
   - **Application name:** GitHub Profile Showcase
   - **Homepage URL:** http://localhost:3000
   - **Authorization callback URL:** http://localhost:3000/api/auth/callback/github
4. Klik **"Register application"**
5. Copy **Client ID**
6. Klik **"Generate a new client secret"**
7. Copy **Client Secret** (simpan baik-baik!)

## Step 2: Setup Environment Variables

1. Buka terminal di folder project
2. Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

3. Edit file `.env.local` dan isi:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=hasil-dari-openssl-rand-tadi
GITHUB_CLIENT_ID=client-id-dari-github
GITHUB_CLIENT_SECRET=client-secret-dari-github
```

## Step 3: Test Lokal

```bash
cd ~/Documents/Project/github-profile-showcase
npm run dev
```

Buka http://localhost:3000 dan test login dengan GitHub

## Step 4: Push ke GitHub

1. Buat repo baru di GitHub: https://github.com/new
   - Nama: **github-profile-showcase**
   - Public
   - Jangan centang "Initialize with README"

2. Push code:
```bash
cd ~/Documents/Project/github-profile-showcase
git remote set-url origin https://github.com/fiqihbadrian/github-profile-showcase.git
git push -u origin main
```

## Step 5: Deploy ke Vercel

1. Buka https://vercel.com
2. Login dengan GitHub
3. Klik **"Add New Project"**
4. Import **github-profile-showcase**
5. Di **Environment Variables**, tambahkan:
   - `NEXTAUTH_URL` = https://your-app.vercel.app (ganti setelah deploy)
   - `NEXTAUTH_SECRET` = (sama seperti lokal)
   - `GITHUB_CLIENT_ID` = (sama seperti lokal)
   - `GITHUB_CLIENT_SECRET` = (sama seperti lokal)
6. Klik **"Deploy"**

## Step 6: Update GitHub OAuth App

1. Setelah deploy, copy URL Vercel kamu (misal: https://github-profile-showcase.vercel.app)
2. Kembali ke https://github.com/settings/developers
3. Edit OAuth App kamu
4. Update:
   - **Homepage URL:** https://github-profile-showcase.vercel.app
   - **Authorization callback URL:** https://github-profile-showcase.vercel.app/api/auth/callback/github
5. Save

## Step 7: Update Environment di Vercel

1. Di Vercel dashboard, masuk ke project settings
2. Environment Variables
3. Edit `NEXTAUTH_URL` jadi URL production kamu
4. Redeploy

## Step 8: Apply GitHub Developer Program

1. Buka https://github.com/developer/register
2. Isi form dengan:
   - Link ke repo: https://github.com/fiqihbadrian/github-profile-showcase
   - Link ke live app: https://github-profile-showcase.vercel.app
   - Jelaskan: "OAuth app untuk visualisasi GitHub profile stats"
3. Submit!

---

## Troubleshooting

**Error: "Invalid client"**
- Pastikan Client ID dan Secret benar
- Pastikan callback URL sama persis

**Error: "NEXTAUTH_SECRET not set"**
- Generate ulang dengan `openssl rand -base64 32`
- Pastikan ada di .env.local dan Vercel

**Login redirect error**
- Pastikan NEXTAUTH_URL sesuai dengan domain
- Check callback URL di GitHub OAuth settings

---

Dibuat oleh **Fiqih Badrian** © 2026
