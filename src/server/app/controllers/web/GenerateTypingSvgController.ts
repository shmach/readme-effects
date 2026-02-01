import type { IController } from '@app/@types/IController';
import type { IHttpRequest, IHttpResponse } from '@app/@types/IHttp';
import type { GenerateTypingSvgUseCase } from '@app/useCases/web/GenerateTypingSvgUseCase';

export class GenerateTypingSvgController implements IController<undefined> {
  constructor(private generateTypingSvgUseCase: GenerateTypingSvgUseCase) {}

  async handler(req: IHttpRequest<undefined>): Promise<IHttpResponse> {
    const svg = await this.generateTypingSvgUseCase.execute({
      url: req.query?.url as string,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'image/svg+xml' },
      body: { svg },
    };
  }
}
