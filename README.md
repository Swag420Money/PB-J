# pb&j

## Running the app (two processes)

The app now has a real backend (`server/`) that handles uploads, calls
Twelve Labs for video understanding, and runs ffmpeg to render the final
video. Both processes need to be running:

```bash
# terminal 1 — backend (uploads, Twelve Labs, ffmpeg rendering)
cd server
npm install        # first time only
cp .env.example .env   # first time only, then fill in TWELVE_LABS_API_KEY
npm run dev

# terminal 2 — frontend
npm install         # first time only
npm run dev
```

The frontend prints two URLs on startup — a `localhost` one for you, and a
`Network` one (e.g. `http://192.168.1.116:5173`) for anyone else on the
same WiFi. Send them the Network URL; they can upload their own footage
straight from their own device, no other setup needed on their end. The
backend must be reachable at the same hostname on port 4000 — it binds to
all interfaces automatically, so this works with zero configuration as
long as everyone's on the same network.

---

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
