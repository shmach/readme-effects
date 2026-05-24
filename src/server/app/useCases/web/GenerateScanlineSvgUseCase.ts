import { extractDataFromUrl } from '@app/helpers/extractDataFromUrl';
import type { IUseCase } from '../../@types/IUseCase';

type GenerateScanlineSvgUseCaseParams = {
  url: string;
};

export class GenerateScanlineSvgUseCase implements IUseCase<
  GenerateScanlineSvgUseCaseParams,
  string
> {
  async execute(params: GenerateScanlineSvgUseCaseParams): Promise<string> {
    const { text, size, font, pColor, bgColor, width, height } =
      extractDataFromUrl(params.url);

    const lineHeight = size * 1.6;
    const startY = (height - text.length * lineHeight) / 2 + size;

    const textElements = text
      .map((line, i) => {
        const y = startY + i * lineHeight;
        return `  <text x="50%" y="${y.toFixed(1)}" dominant-baseline="auto" text-anchor="middle" font-family="${font}" font-size="${size}" fill="#${pColor}" filter="url(#crt-glow)">${line}</text>`;
      })
      .join('\n');

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <pattern id="scanlines" x="0" y="0" width="${width}" height="4" patternUnits="userSpaceOnUse">
      <rect x="0" y="0" width="${width}" height="2" fill="black" fill-opacity="0.25"/>
    </pattern>
    <filter id="crt-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="100%" height="100%" fill="${bgColor}"/>

${textElements}

  <rect width="100%" height="100%" fill="url(#scanlines)"/>

  <rect x="0" y="-12" width="100%" height="12" fill="white" fill-opacity="0.06">
    <animate attributeName="y" from="-12" to="${height}" dur="3s" repeatCount="indefinite" calcMode="linear"/>
  </rect>
</svg>`.trim();
  }
}
