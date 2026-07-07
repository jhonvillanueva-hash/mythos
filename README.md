# VALMAX

A visual identity and portfolio landing page for **VALMAX** — a dark, atmospheric brand showcase built with React, TypeScript, Framer Motion, and Tailwind CSS v4.

## Overview

VALMAX is a meticulously crafted brand introduction experience. The page opens with a choreographed 5-second animation sequence: a white seed dot expands, rays of light radiate outward, and the VALMAX wordmark reveals itself at the center — all set against a twinkling starfield and subtle noise texture. The animation fades out cleanly to reveal a full photography portfolio section.

## Tech Stack

- **React 19** + **TypeScript** — component-driven architecture
- **Vite** — fast dev server and optimized builds
- **TanStack Router** — client-side routing
- **Framer Motion** — fluid animations and transitions
- **Tailwind CSS v4** — utility-first styling with `@theme` tokens
- **Canvas API** — real-time starfield particle system

## Features

- **Cinematic Intro Sequence** — 5-second synchronized animation (rays, circles, logo reveal, backdrop dissolve)
- **Animated Starfield** — canvas-based particle system with twinkling and orbital ring variants
- **Parallax Scrolling** — scroll-driven transforms using Framer Motion's `useScroll`
- **Responsive Design** — adaptive layout from mobile to desktop
- **Reduced Motion Support** — respects `prefers-reduced-motion` media query
- **Custom Typography** — Neue Haas Grotesk Display Pro + Poppins

## Getting Started

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`.

## Build

```bash
npm run build
```

Static output in `dist/`.

## Project Structure

```
src/
├── components/
│   ├── IntroSequence.tsx    # Full-screen intro animation
│   ├── TopBar.tsx           # Fixed header with navigation
│   ├── ValmaxLanding.tsx    # Main page layout and sections
│   ├── StarField.tsx        # Canvas-based particle system
│   └── LineField.tsx        # Decorative SVG line overlays
├── routes/
│   └── __root.tsx           # Root route with TanStack Router
├── assets/                  # Static images and SVGs
└── styles.css               # Tailwind imports and theme tokens
```
