import type { IController } from '../../@types/IController';
import type { IHttpRequest, IHttpResponse } from '../../@types/IHttp';
import type { GenerateScanlineSvgUseCase } from '../../useCases/web/GenerateScanlineSvgUseCase';

export class GenerateScanlineSvgController implements IController<undefined> {
  constructor(private generateScanlineSvgUseCase: GenerateScanlineSvgUseCase) {}

  async handler(req: IHttpRequest<undefined>): Promise<IHttpResponse> {
    const svg = await this.generateScanlineSvgUseCase.execute({
      url: req.query?.url as string,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'image/svg+xml' },
      body: { svg },
    };
  }
}
