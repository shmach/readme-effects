import { routeAdapter } from '@main/adapters/routeAdapter';
import { makeGenerateWavyGlitchSvgController } from '@main/factories/web/makeGenerateWavyGlitchSvgController';

/**
 * Static files
 * Serving index.html, main.js, and style.css
 */
const homepage = Bun.file('src/public/index.html');
const mainJs = Bun.file('src/public/main.js');
const styleCss = Bun.file('src/public/style.css');

const staticFiles = {
  '/': () =>
    new Response(homepage, { headers: { 'Content-Type': 'text/html' } }),
  '/main.js': () =>
    new Response(mainJs, {
      headers: { 'Content-Type': 'application/javascript' },
    }),
  '/style.css': () =>
    new Response(styleCss, { headers: { 'Content-Type': 'text/css' } }),
};

Bun.serve({
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  routes: {
    ...staticFiles,
    '/generate/wavy-glitch': (req) =>
      routeAdapter(makeGenerateWavyGlitchSvgController())(req),
  },
  fetch() {
    return new Response('Not Found', { status: 404 });
  },
});

console.log('Server is running on http://localhost:3000');
