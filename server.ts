import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { connectDB } from "./server/config/db.js";

// Routes
import authRoutes from "./server/routes/authRoutes.js";
import projectRoutes from "./server/routes/projectRoutes.js";
import skillRoutes from "./server/routes/skillRoutes.js";
import experienceRoutes from "./server/routes/experienceRoutes.js";
import educationRoutes from "./server/routes/educationRoutes.js";
import certificationRoutes from "./server/routes/certificationRoutes.js";
import serviceRoutes from "./server/routes/serviceRoutes.js";
import messageRoutes from "./server/routes/messageRoutes.js";
import settingsRoutes from "./server/routes/settingsRoutes.js";
import articleRoutes from "./server/routes/articleRoutes.js";
import categoryRoutes from "./server/routes/categoryRoutes.js";
import { errorHandler } from "./server/middleware/errorMiddleware.js";

dotenv.config();

process.on('uncaughtException', (err) => {
  console.error('Server Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Server Unhandled Rejection at:', promise, 'reason:', reason);
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security & Body Parsers with iframe/preview embedding support
  app.use(
    helmet({
      contentSecurityPolicy: false,
      frameguard: false,
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );
  app.use(cors({ origin: true, credentials: true }));
  app.use(compression());
  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ limit: '25mb', extended: true }));

  // Connect Database (with automatic graceful in-memory store fallback)
  await connectDB();

  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/skills', skillRoutes);
  app.use('/api/experience', experienceRoutes);
  app.use('/api/education', educationRoutes);
  app.use('/api/certifications', certificationRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/messages', messageRoutes);
  app.use('/api/settings', settingsRoutes);
  app.use('/api/articles', articleRoutes);
  app.use('/api/categories', categoryRoutes);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Elieza Mwakyoma Portfolio API', timestamp: new Date() });
  });

  // Static public assets (robots.txt, sitemap.xml, site.webmanifest, etc.)
  const publicPath = path.join(process.cwd(), 'public');
  app.use(express.static(publicPath));

  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.sendFile(path.join(publicPath, 'robots.txt'));
  });

  app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    res.sendFile(path.join(publicPath, 'sitemap.xml'));
  });

  // Error Handler Middleware
  app.use(errorHandler);

  // Serve Frontend with Vite in Development or Static files in Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // Long term immutable caching for fingerprinted assets
    app.use('/assets', express.static(path.join(distPath, 'assets'), {
      maxAge: '1y',
      immutable: true,
    }));
    app.use(express.static(distPath, { maxAge: '1h' }));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });

  // Optimize keep-alive timeouts for Cloud Run ingress reverse proxy
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
}

startServer();
