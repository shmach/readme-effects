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

    const centerY = (height / 2).toFixed(1);

    const buildTextElements = (): string => {
      if (text.length === 1) {
        return `  <text x="50%" y="${centerY}" dominant-baseline="middle" text-anchor="middle" font-family="${font}" font-size="${size}" fill="#${pColor}" filter="url(#crt-glow)">${text[0]}</text>`;
      }

      const displayDuration = 2.5;
      const fadeDuration = Math.min(0.3, displayDuration / 4);
      const totalDuration = text.length * displayDuration;
      const dur = `${totalDuration.toFixed(2)}s`;

      return text
        .map((line, i) => {
          const lineStart = i * displayDuration;
          const lineEnd = lineStart + displayDuration;
          // Cap last line slightly before totalDuration to avoid duplicate keyTime=1
          const lineEndCapped = Math.min(lineEnd, totalDuration - 0.001);

          const t0 = lineStart / totalDuration;
          const tFadeIn = (lineStart + fadeDuration) / totalDuration;
          const tFadeOut = (lineEndCapped - fadeDuration) / totalDuration;
          const t1 = lineEndCapped / totalDuration;

          let keyTimes: string;
          let values: string;

          if (t0 < 1e-5) {
            // First line: fade in from the start of the cycle
            keyTimes = `0;${tFadeIn.toFixed(5)};${tFadeOut.toFixed(5)};${t1.toFixed(5)};1`;
            values = `0;1;1;0;0`;
          } else {
            keyTimes = `0;${t0.toFixed(5)};${tFadeIn.toFixed(5)};${tFadeOut.toFixed(5)};${t1.toFixed(5)};1`;
            values = `0;0;1;1;0;0`;
          }

          return `  <text x="50%" y="${centerY}" dominant-baseline="middle" text-anchor="middle" font-family="${font}" font-size="${size}" fill="#${pColor}" filter="url(#crt-glow)" opacity="0">
    <animate attributeName="opacity" values="${values}" keyTimes="${keyTimes}" dur="${dur}" repeatCount="indefinite"/>
    ${line}
  </text>`;
        })
        .join('\n');
    };

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

${buildTextElements()}

  <rect width="100%" height="100%" fill="url(#scanlines)"/>

  <rect x="0" y="-12" width="100%" height="12" fill="white" fill-opacity="0.06">
    <animate attributeName="y" from="-12" to="${height}" dur="3s" repeatCount="indefinite" calcMode="linear"/>
  </rect>
</svg>`.trim();
  }
}
