import { routeAdapter } from '@main/adapters/routeAdapter';
import { makeGenerateWavyGlitchSvgController } from '@main/factories/makeGenerateWavyGlitchSvgController';

Bun.serve({
  routes: {
    '/': () => new Response('Hello, World!'),
    '/generate/wavy-glitch': (req) =>
      routeAdapter(makeGenerateWavyGlitchSvgController())(req),
  },
  fetch() {
    return new Response('Not Found', { status: 404 });
  },
});

console.log('Server is running on http://localhost:3000');
