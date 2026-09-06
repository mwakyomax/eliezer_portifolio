# Elieza Mwakyoma — Portfolio & System Architecture

A high-performance, full-stack portfolio and interactive engineering showcase built for **Elieza Mwakyoma**, a software developer and network specialist holding a Bachelor of Science in Computer Science from St. Joseph University in Tanzania (SJUIT).

The application pairs an editorial aesthetic inspired by luxury fashion catalogs with an interactive technical exploration suite featuring algorithm demos, network topologies, live project quick-views, and an administrative control panel.

---

## Key Features

- **Dual-Experience Showcase**:
  - **Editorial Boutique Mode**: Styled with warm neutral tones, signature burgundy accents, arched portrait framing, and responsive project collections.
  - **Engineering Architecture Mode**: Deep-dive breakdowns of full-stack implementations, system architecture diagrams, priority queue algorithms, and network topologies.
- **Dynamic Liquid Navigation Engine**:
  - Configurable floating liquid dock and header navigation with customizable liquid droplet animations, specular shimmer, and adaptive scroll states.
- **Interactive Project Discovery**:
  - Filter projects by technical domain (Full-Stack Web, Android Mobile, Networking, Databases, Algorithms).
  - Quick-view modals with problem statements, architectural solutions, and direct repository links.
  - Project bookmarking and export drawer for reviewing and sharing selected works.
- **Technical Knowledge & Journal**:
  - Articles and technical write-ups covering clean code, priority queue systems, cloud deployment, and system design.
- **Comprehensive Administration Portal**:
  - Password and token-authenticated dashboard (`/admin`) to manage projects, skills, education, experience, and contact inquiries.
- **System Optimizations**:
  - On-demand route splitting with `React.lazy` and `<Suspense>`.
  - Granular Vite chunk partitioning for persistent vendor caching.
  - Express payload compression (Gzip/Deflate) and long-term immutable asset caching.
  - Optimized Core Web Vitals with priority LCP image loading and native lazy-loading.

---

## Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite + Rollup
- **Styling**: Tailwind CSS v4
- **Animation**: `motion/react` (Framer Motion)
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Typography**: Google Fonts (*Plus Jakarta Sans*, *Playfair Display*, *Dancing Script*)

### Backend & Database
- **Server**: Node.js with Express (TypeScript via `tsx` and `esbuild`)
- **Security**: Helmet, CORS, and JWT authentication
- **Compression**: Compression middleware (Gzip / Deflate)
- **Database**: MongoDB with Mongoose ODM (with automatic in-memory fallback)

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or bun

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional for local dev):
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Default environment keys:
   - `PORT`: 3000
   - `MONGO_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret key for signing admin authentication tokens
   - `ADMIN_EMAIL`: Default administrator email
   - `ADMIN_PASSWORD`: Default administrator password

### Running the Application

- **Development Mode** (boots backend server with Vite middleware on port 3000):
  ```bash
  npm run dev
  ```

- **Production Build**:
  ```bash
  npm run build
  ```

- **Production Start**:
  ```bash
  npm start
  ```

- **Lint & Type Check**:
  ```bash
  npm run lint
  ```

---

## Project Structure

```
├── server/                 # Express backend API and configuration
│   ├── config/             # Database connection and fallback handlers
│   ├── middleware/         # Authentication and request middleware
│   ├── models/             # Mongoose data schemas
│   └── routes/             # REST API endpoints (projects, auth, contact)
├── src/
│   ├── assets/             # Images, project screenshots, and visual assets
│   ├── components/         # Modular React UI components
│   │   ├── Hero.tsx        # Developer introduction and portrait frame
│   │   ├── Navbar.tsx      # Liquid responsive navigation bar
│   │   ├── FeaturedItems.tsx # Project catalog and domain filter
│   │   ├── SpecialOffers.tsx # Featured engineering highlights
│   │   ├── TechnicalStack.tsx # Skills, experience, and education timeline
│   │   └── CartDrawer.tsx  # Saved projects bookmarking drawer
│   ├── context/            # Global state (Portfolio, LiquidNav, Auth, Shop)
│   ├── data/               # Static fallback datasets and articles
│   ├── pages/              # Primary route views (Home, Login, AdminDashboard)
│   ├── types.ts            # Shared TypeScript interfaces and types
│   ├── App.tsx             # Application routing and route-level suspense
│   ├── main.tsx            # Client entry point
│   └── index.css           # Tailwind CSS imports and global styling rules
├── server.ts               # Primary backend entry point with Vite middleware
├── vite.config.ts          # Vite build configuration and manual chunk splits
├── metadata.json           # Application metadata and platform capabilities
└── package.json            # Dependencies, scripts, and package metadata
```

---

## License

This project is open source and available under the [MIT License](LICENSE).
