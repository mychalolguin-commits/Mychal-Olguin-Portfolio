# Mychal Olguin - Growth Marketing Portfolio

A modern, responsive portfolio website showcasing growth marketing case studies, paid social campaigns, and analytics expertise.

## Tech Stack

- **React 19** + **TypeScript**
- **Tailwind CSS** (via CDN)
- **Framer Motion** for animations
- **React Router** for navigation
- **Vite** for build tooling

## Features

- Dark/Light theme with system preference detection
- Responsive design (mobile-first)
- SEO optimized with meta tags, Open Graph, and structured data
- Smooth page transitions and reveal animations
- Interactive case study dashboards with data visualizations
- Accessible and performant

## Project Structure

```
├── components/          # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── MediaTile.tsx
│   ├── CaseStudyDashboard.tsx
│   └── ...
├── pages/               # Page components
│   ├── Home.tsx
│   ├── Work.tsx
│   ├── WorkDetail.tsx
│   ├── Resume.tsx
│   └── Contact.tsx
├── hooks/               # Custom React hooks
│   ├── useSEO.ts
│   ├── useTheme.ts
│   └── useReducedMotion.ts
├── public/              # Static assets
│   ├── images/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── favicon.svg
├── constants.ts         # Project data and content
├── types.ts             # TypeScript type definitions
└── index.html           # Entry point with theme tokens
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mychalolguin-commits/Mychal-Olguin-Portfolio.git

# Navigate to the project
cd Mychal-Olguin-Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Deployment

This site can be deployed to:

- **Vercel** (recommended) - Connect your GitHub repo
- **Netlify** - Drag and drop the `dist/` folder
- **GitHub Pages** - Use the `gh-pages` branch

## Customization

### Theme Colors

Theme tokens are defined in `index.html` under the `<style>` tag. Key variables:

- `--color-bg-base` - Main background
- `--color-accent` - Primary accent (mint green)
- `--card-border` - Card borders
- `--shadow-card` - Card shadows

### Content

All project data, experience, and content is managed in `constants.ts`.

## License

MIT License - Feel free to use this as a template for your own portfolio.

## Contact

- **Email:** mychalolguin@gmail.com
- **LinkedIn:** [linkedin.com/in/mychalolguin](https://www.linkedin.com/in/mychalolguin/)
