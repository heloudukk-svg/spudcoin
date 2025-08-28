# $SPUD Landing

## Īsā versija — kā palaist lokāli
1) Instalē Node.js (LTS). Atver terminali šajā mapē.
2) Komandas:
```
npm install
npm run dev
```
3) Atver: http://localhost:5173

## Kas jāaizpilda
- `src/App.tsx` → `CONFIG.contract`, `CONFIG.links.buy/contract/twitter/telegram/dexscreener`
- `public/spud-logo.png` vari nomainīt pret savu logo

## Build
```
npm run build
```

## Publicēšana (GitHub Pages, ar Actions)
1) `vite.config.ts` -> ja publicē zem `/repo/`, iestati `base: '/repo/'`.
2) Git komandas:
```
git init
git add .
git commit -m "initial"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```
3) Repo Settings → Pages → Source = GitHub Actions. Gatavs.
