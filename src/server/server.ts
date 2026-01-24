import { routeAdapter } from '@main/adapters/routeAdapter';
import { makeGenerateWavyGlitchSvgController } from '@main/factories/makeGenerateWavyGlitchSvgController';
import homepage from '@ui/index.html';

Bun.serve({
  routes: {
    '/': homepage,
    '/generate/wavy-glitch': (req) =>
      routeAdapter(makeGenerateWavyGlitchSvgController())(req),
  },
  fetch() {
    return new Response('Not Found', { status: 404 });
  },
});

console.log('Server is running on http://localhost:3000');
