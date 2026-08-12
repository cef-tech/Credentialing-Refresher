# TrackX Technology — Annual Compliance Credentialing Refresher

A Next.js 14 application providing an 8-module read-and-acknowledge credentialing refresher for TrackX Technology field representatives.

## Modules
1. HIPAA Training
2. Bloodborne Pathogens & Universal Precautions
3. X-Ray & Radiation Safety
4. OR Protocols
5. Fire Safety
6. National Patient Safety Goals
7. Compliance, AdvaMed Code & Fraud
8. Aseptic Awareness for Device Representatives

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel (Recommended — Free)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New → Project**
4. Select your repo → click **Deploy**
5. Your live URL is ready in ~60 seconds

## Deploy to GitHub Pages

GitHub Pages does not natively support Next.js server features.
Use Vercel or Netlify for easiest deployment.

If you need static export, add to `next.config.js`:
```js
output: 'export'
```
Then run `npm run build` — the `out/` folder can be deployed anywhere.

## Project Structure

```
app/
  layout.tsx       # Root layout + metadata
  page.tsx         # Main page with view state
  globals.css      # All styles

components/
  Landing.tsx      # Enrollment screen
  CourseShell.tsx  # Header, tabs, module renderer
  ModuleView.tsx   # Single module display
  Completion.tsx   # Attestation + signature
  Certificate.tsx  # Printable certificate
  TrackXLogo.tsx   # Logo with fallback

lib/
  modules.tsx      # All 8 module definitions + content
```

## Customization

- **Add/edit module content** → `lib/modules.tsx`
- **Change colors/fonts** → `app/globals.css` (`:root` variables)
- **Update metadata** → `app/layout.tsx`
