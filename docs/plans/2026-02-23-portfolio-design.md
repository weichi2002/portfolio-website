# Terminal Portfolio Design

## Stack
- Astro + Tailwind CSS
- Single `index.astro`, two viewport-height sections
- Minimal JS: flip cards + smooth scroll

## Visual Theme
- Dark terminal / hacker aesthetic
- Palette: `#0a0a0a` bg, `#00ff41` green accent, `#e0e0e0` text, `#1a1a2e` card bg
- Typography: JetBrains Mono (headings/accent), Inter (body)
- Blinking cursor animations, terminal-style headers

## Section 1: Landing (full viewport)
- **Top:** Name + tagline with blinking terminal cursor
- **Middle:** Short about-me blurb (2-3 sentences) + 3 interactive flip cards (fun facts). Front: category/icon. Back: fact text. Click/tap to flip (CSS 3D transform).
- **Bottom-area:** Contact links styled as terminal commands (`> github`, `> email`, etc.)
- **Very bottom:** Bouncing down-arrow chevron, smooth-scrolls to projects

## Section 2: Projects (scrolls into view)
- `ls ~/projects` style header
- Responsive grid (2-3 cols desktop, 1 col mobile)
- Cards: project name, one-liner, tech tags. Hover expands to show full description + GitHub/demo links. Subtle green border glow on hover.
