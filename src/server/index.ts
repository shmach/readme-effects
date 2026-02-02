import { routeAdapter } from '@main/adapters/routeAdapter';
import { makeGenerateWavyGlitchSvgController } from '@main/factories/web/makeGenerateWavyGlitchSvgController';
import homepage from '@ui/index.html';

Bun.serve({
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  routes: {
    '/': homepage,
    '/generate/wavy-glitch': (req) =>
      routeAdapter(makeGenerateWavyGlitchSvgController())(req),
    // '/generate/typing': (req) =>
    // routeAdapter(makeGenerateTypingSvgController())(req),
  },
  fetch() {
    return new Response('Not Found', { status: 404 });
  },
});

console.log('Server is running on http://localhost:3000');
