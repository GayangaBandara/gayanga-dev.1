# Hero section build

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/gayanga-bandaras-projects/v0-hero-section-build)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/vud72V0afZO)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/gayanga-bandaras-projects/v0-hero-section-build](https://vercel.com/gayanga-bandaras-projects/v0-hero-section-build)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/vud72V0afZO](https://v0.app/chat/projects/vud72V0afZO)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Projects Section (UI updates)

I've refactored the `Projects` section to use a `ProjectCard` model that supports:

- Screenshot preview image (place under `public/projects/` with the filename used in the project config)
- Optional project demo video (MP4 files under `public/videos/` or a hosted URL)
- Tech badges (simple initials are rendered by default; you can replace with icons)
- Live Demo and GitHub links (use full URLs in the project config)

To add/change project entries, edit `components/sections/projects-section.tsx` and update the `projects` array near the bottom of the file with fields: `id, title, subtitle, description, image, tech, demo, github, video`.

The video overlay uses a simple modal that opens an HTML5 `<video>` (controls enabled). For YouTube embeds, replace the modal's `<video>` with an iframe and adjust the source accordingly.
