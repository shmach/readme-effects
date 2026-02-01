import type { IUseCase } from '@app/@types/IUseCase';
import { extractDataFromUrl } from '@app/helpers/extractDataFromUrl';

type GenerateTypingSvgUseCaseParams = {
  url: string;
};

export class GenerateTypingSvgUseCase implements IUseCase<
  GenerateTypingSvgUseCaseParams,
  string
> {
  async execute(params: GenerateTypingSvgUseCaseParams): Promise<string> {
    const { text, size, font, pColor, bgColor, width, height } =
      extractDataFromUrl(params.url);

    // TODO: Remove this mock implementation and create a real SVG generator for typing effect
    const svg = ` <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="100%" height="100%" fill="${bgColor}" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="${font}" font-size="${size}" fill="${pColor}">
      ${text}
      <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
    </text>
  </svg> `;
    return svg.trim();
  }
}
