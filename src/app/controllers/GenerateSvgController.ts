import type { GenerateSvgUseCase } from '../useCases/GenerateSvgUseCase';

export class GenerateSvgController {
  constructor(private generateSvgUseCase: GenerateSvgUseCase) {}
  async handler(req: Request): Promise<Record<string, any>> {
    console.log('GenerateSvgController handler called with request:', req.url);
    const svg = this.generateSvgUseCase.execute();
    return {
      status: 200,
      headers: { 'Content-Type': 'image/svg+xml' },
      body: svg,
    };
  }
}
