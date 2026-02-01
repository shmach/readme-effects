import type { IController } from '../../@types/IController';
import type { IHttpRequest, IHttpResponse } from '../../@types/IHttp';
import type { GenerateWavyGlitchSvgUseCase } from '../../useCases/web/GenerateWavyGlitchSvgUseCase';

export class GenerateWavyGlitchSvgController implements IController<undefined> {
  constructor(
    private generateWavyGlitchSvgUseCase: GenerateWavyGlitchSvgUseCase,
  ) {}

  async handler(req: IHttpRequest<undefined>): Promise<IHttpResponse> {
    const svg = await this.generateWavyGlitchSvgUseCase.execute({
      url: req.query?.url as string,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'image/svg+xml' },
      body: { svg },
    };
  }
}
