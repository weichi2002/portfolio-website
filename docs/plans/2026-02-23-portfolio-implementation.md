# Terminal Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a dark, terminal-themed portfolio with Astro + Tailwind — a landing page (about, fun facts, contact) and a projects section below.

**Architecture:** Single-page Astro site with two viewport sections. Landing section has hero/about, 3 flip cards, and contact links. Scroll down to projects grid. Minimal client-side JS for flip cards and smooth scroll only.

**Tech Stack:** Astro 5, Tailwind CSS 4 (via @tailwindcss/vite), Google Fonts (JetBrains Mono, Inter)

---

### Task 1: Scaffold Astro project with Tailwind

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/pages/index.astro`

**Step 1: Initialize Astro project**

Run from `/Users/weichi2002/Projects/Personal Website`:
```bash
npm create astro@latest . -- --template minimal --no-install --no-git
```

**Step 2: Install dependencies**

```bash
npm install
npm install @tailwindcss/vite tailwindcss
```

**Step 3: Configure Tailwind Vite plugin**

Edit `astro.config.mjs`:
```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Step 4: Create global.css**

Create `src/styles/global.css`:
```css
@import "tailwindcss";

@theme {
  --color-terminal-bg: #0a0a0a;
  --color-terminal-green: #00ff41;
  --color-terminal-text: #e0e0e0;
  --color-terminal-card: #1a1a2e;
  --font-mono: 'JetBrains Mono', monospace;
  --font-sans: 'Inter', sans-serif;
}
```

**Step 5: Create BaseLayout.astro**

Create `src/layouts/BaseLayout.astro`:
```astro
---
interface Props {
  title: string;
}
const { title } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
    <title>{title}</title>
  </head>
  <body class="bg-terminal-bg text-terminal-text font-sans">
    <slot />
  </body>
</html>
```

Import `global.css` at top of frontmatter:
```astro
---
import '../styles/global.css';
// ...rest of frontmatter
---
```

**Step 6: Create minimal index.astro**

Create `src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Portfolio">
  <main>
    <p class="text-terminal-green font-mono">Hello, world.</p>
  </main>
</BaseLayout>
```

**Step 7: Verify dev server runs**

```bash
npm run dev
```
Expected: Site loads at localhost:4321 with green "Hello, world." on dark background.

**Step 8: Init git and commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Astro project with Tailwind CSS 4"
```

---

### Task 2: Build Landing Section — Hero + About

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`

**Step 1: Create Hero component**

Create `src/components/Hero.astro` with:
- Large name in JetBrains Mono with blinking cursor
- Tagline below
- Short about-me paragraph (2-3 sentences)
- Use placeholder text the user can customize later

**Step 2: Add blinking cursor animation to global.css**

```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

**Step 3: Wire Hero into index.astro**

Replace the placeholder `<p>` with the Hero component inside a full-height section.

**Step 4: Verify**

```bash
npm run dev
```
Expected: Full-viewport dark page with name, blinking cursor, tagline, and about text.

**Step 5: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro src/styles/global.css
git commit -m "feat: add hero section with about me and blinking cursor"
```

---

### Task 3: Build Fun Facts Flip Cards

**Files:**
- Create: `src/components/FunFacts.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`

**Step 1: Create FunFacts component**

Create `src/components/FunFacts.astro`:
- 3 flip cards in a row (responsive: stack on mobile)
- Each card has a front (category + icon) and back (fact text)
- CSS 3D flip on click using `perspective`, `rotateY(180deg)`, `backface-visibility: hidden`
- Minimal inline `<script>` to toggle a `.flipped` class on click

**Step 2: Add flip card CSS to global.css**

```css
.flip-card {
  perspective: 1000px;
}
.flip-card-inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}
.flip-card.flipped .flip-card-inner {
  transform: rotateY(180deg);
}
.flip-card-front,
.flip-card-back {
  backface-visibility: hidden;
}
.flip-card-back {
  transform: rotateY(180deg);
}
```

**Step 3: Add click handler script**

Inside FunFacts.astro, add:
```html
<script>
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });
</script>
```

**Step 4: Wire into index.astro**

Add FunFacts below the Hero in the landing section.

**Step 5: Verify**

```bash
npm run dev
```
Expected: 3 cards visible, clicking each flips to reveal fun fact.

**Step 6: Commit**

```bash
git add src/components/FunFacts.astro src/pages/index.astro src/styles/global.css
git commit -m "feat: add interactive fun facts flip cards"
```

---

### Task 4: Build Contact Links + Down Arrow

**Files:**
- Create: `src/components/Contact.astro`
- Create: `src/components/ScrollArrow.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`

**Step 1: Create Contact component**

Create `src/components/Contact.astro`:
- Terminal-style links: `> github.com/you`, `> linkedin.com/in/you`, `> email@you.com`
- Each link is an `<a>` with monospace font, green `>` prefix
- Hover: text gets a green underline or highlight slide-in

**Step 2: Create ScrollArrow component**

Create `src/components/ScrollArrow.astro`:
- A down chevron (`v` or SVG arrow)
- Bouncing animation via CSS keyframes
- On click: `document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })`

**Step 3: Add bounce animation to global.css**

```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}
```

**Step 4: Wire into index.astro**

Add Contact and ScrollArrow at the bottom of the landing section. Ensure the landing section is `min-h-screen` with flex column layout so the arrow sits at the bottom.

**Step 5: Verify**

```bash
npm run dev
```
Expected: Contact links visible, arrow bounces, clicking arrow scrolls smoothly down.

**Step 6: Commit**

```bash
git add src/components/Contact.astro src/components/ScrollArrow.astro src/pages/index.astro src/styles/global.css
git commit -m "feat: add contact links and scroll arrow"
```

---

### Task 5: Build Projects Section

**Files:**
- Create: `src/components/Projects.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create Projects component**

Create `src/components/Projects.astro`:
- `ls ~/projects` header in monospace green
- Responsive grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Each card: project name, one-line description, tech tags as small badges
- Hover: card expands (max-height transition) to show full description + links
- Green border glow on hover: `hover:shadow-[0_0_15px_rgba(0,255,65,0.3)]`
- Placeholder data for 3-4 projects the user can edit

**Step 2: Wire into index.astro**

Add a `<section id="projects">` with the Projects component below the landing section.

**Step 3: Verify**

```bash
npm run dev
```
Expected: Scrolling down reveals project grid. Hovering cards expands them with green glow.

**Step 4: Commit**

```bash
git add src/components/Projects.astro src/pages/index.astro
git commit -m "feat: add projects section with expandable cards"
```

---

### Task 6: Polish and Responsive Fixes

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/pages/index.astro`
- Modify: various components as needed

**Step 1: Mobile responsiveness pass**

- Ensure flip cards stack vertically on small screens
- Ensure project grid is single-column on mobile
- Check font sizes scale down on mobile
- Test scroll arrow positioning

**Step 2: Add smooth scroll behavior globally**

In global.css:
```css
html {
  scroll-behavior: smooth;
}
```

**Step 3: Add subtle fade-in animations on scroll (optional)**

Use CSS `@keyframes fadeInUp` with Intersection Observer for project cards.

**Step 4: Verify full flow**

```bash
npm run dev
```
Expected: Full site works on desktop and mobile. Landing -> scroll -> projects. All interactions work.

**Step 5: Final commit**

```bash
git add -A
git commit -m "feat: polish responsive layout and animations"
```
