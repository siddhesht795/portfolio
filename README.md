# Siddhesh Todi - Portfolio

Developer-workspace portfolio built with React, Vite, Tailwind CSS, and Lenis.
The interface includes file-style navigation, light and dark themes, and an interactive
portfolio terminal.

## Local development

Use Node.js 24.15 or newer, then run:

```sh
npm ci
npm run dev
```

## Verification

```sh
npm test
npm run build
npm run preview
```

Tests cover returning from posts to the original page and scroll position, nested
blog-index navigation, browser Back/Forward, route-aware navbar links, section
observer reattachment, smooth-scroll synchronization, and direct-entry fallbacks.
The DOM tests simulate layout; check real desktop and mobile browsers before release.

## Content

Portfolio data and blog posts live in `src/data/index.js`. The homepage and blog
index share the blog-list component. Return links retain the originating route and
position; direct post visits fall back to the blog index.

The embedded and downloaded resume is `public/resume.pdf`. Keep that file and the
portfolio's experience and achievements consistent when updating either.

## Hosting

The portfolio is hosted on GitHub Pages at https://siddheshtodi.me.
The custom domain is recorded in `public/CNAME` and copied into the build output.

`npm run build` generates `dist/blog/index.html`, an entry page for every post,
and a general `404.html`, so known blog URLs work when opened directly on GitHub
Pages. The workflow derives the asset base path from the GitHub Pages configuration.
For a manual build under a subdirectory, set `VITE_BASE_PATH` to that path, ending
with `/`. Builds for `siddheshtodi.me` use the root path `/`.

## Portfolio terminal

Click or tap the terminal to focus the prompt, type a command, and press Enter.
A subtle pointer-following "Try me!" hint appears on mouse hover until the terminal
is focused. Touch devices show a tap-to-type cue instead.

The terminal supports `help`, `whoami`, `ls`, `skills`, `projects`, `blog`, `resume`,
`contact`, `theme`, and `clear`. Use the up/down arrows for command history, Tab to
complete a unique command, or Ctrl+L to clear the output. It navigates and displays
portfolio content; it does not execute operating-system commands.

Terminal behavior lives in `src/lib/terminal.js`; shared workspace styling is in
`src/index.css`. The interface uses IBM Plex Mono throughout, with system monospace fallbacks.
The default dark palette pairs near-black surfaces with neon-green accents and
high-contrast text; the theme toggle also offers a light green palette.
