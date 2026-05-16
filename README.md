# Lucid - Rebuild Your Focus

A modern, immersive web application designed to help users rebuild focus and mental clarity in a hyper-distracting world.

## Project Overview

Lucid provides evidence-based tools for:
- **Focus Training** - Structured deep work sessions with progressive difficulty
- **Mental Recovery** - Guided rest periods and mindfulness exercises
- **AI Guidance** - Personalized coaching (backend integration required)
- **Progress Tracking** - Visual analytics and insights
- **Clarity Insights** - Understanding how habits affect mental performance

## Current Status

**Frontend Complete** ✅ | **Backend Pending** ⏳

This repository contains the complete frontend implementation. All backend functionality is clearly marked with `BACKEND TODO` comments.

## Pages Implemented

1. **Landing Page** (`index.html`) - Hero section, features, testimonials, CTA
2. **Dashboard** (`pages/dashboard.html`) - Daily stats, goals, recent sessions, energy check-in
3. **Focus Session** (`pages/focus.html`) - Configurable timer, ambient sounds, distraction tracking
4. **Mental Clarity Tracker** (`pages/clarity.html`) - Mood/energy sliders, habit correlations
5. **AI Coach** (`pages/coach.html`) - Chat interface with suggested prompts
6. **Progress Analytics** (`pages/analytics.html`) - Charts, heatmaps, streaks, milestones
7. **Settings** (`pages/settings.html`) - Appearance, accessibility, preferences

## Tech Stack

- **HTML5** - Semantic structure
- **CSS3** - Custom properties, glassmorphism, animations
- **Vanilla JavaScript** - No framework dependencies
- **Google Fonts** - Inter + JetBrains Mono

## Design Features

- Dark modern UI with soft gradients
- Glassmorphism effects (in moderation)
- Smooth CSS animations and transitions
- Fully responsive design
- Dyslexia-friendly mode
- Reduced motion support
- Accessible color contrast

## File Structure

```
/workspace
├── index.html          # Landing page
├── css/
│   └── styles.css      # Global styles (~900 lines)
├── js/
│   └── main.js         # Shared utilities
├── pages/
│   ├── dashboard.html
│   ├── focus.html
│   ├── clarity.html
│   ├── coach.html
│   ├── analytics.html
│   └── settings.html
└── assets/             # (Future: images, icons)
```

## Quick Start

1. Open `index.html` in a modern browser
2. Navigate through pages using the top navigation
3. All interactions work locally (no server required)

## Backend Integration Points

Key areas requiring backend implementation:

### Authentication
- User registration/login
- Session management
- Protected routes

### Data Storage
- Focus session history
- Daily check-ins
- User preferences
- Achievement tracking

### AI Coach
- LLM API integration (OpenAI, Anthropic, etc.)
- Conversation history
- Context-aware responses

### Analytics
- Real data visualization
- Trend calculations
- Habit correlation analysis

### Notifications
- Email/push notifications
- Reminder scheduling
- Streak protection alerts

See inline `BACKEND TODO` comments throughout the codebase for specific integration points.

## Accessibility

- Dyslexia-friendly typography mode
- Reduced motion support
- High contrast option
- Screen reader optimized
- Keyboard navigation
- ARIA labels throughout

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment Ready

This frontend is production-ready and can be deployed immediately to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting

## License

MIT License - See LICENSE file for details

---

**Built with care for better mental health in the digital age.**
