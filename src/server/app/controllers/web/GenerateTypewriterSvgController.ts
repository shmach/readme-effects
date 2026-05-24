import type { IController } from '../../@types/IController';
import type { IHttpRequest, IHttpResponse } from '../../@types/IHttp';
import type { GenerateTypewriterSvgUseCase } from '../../useCases/web/GenerateTypewriterSvgUseCase';

export class GenerateTypewriterSvgController implements IController<undefined> {
  constructor(
    private generateTypewriterSvgUseCase: GenerateTypewriterSvgUseCase,
  ) {}

  async handler(req: IHttpRequest<undefined>): Promise<IHttpResponse> {
    const svg = await this.generateTypewriterSvgUseCase.execute({
      url: req.query?.url as string,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'image/svg+xml' },
      body: { svg },
    };
  }
}
