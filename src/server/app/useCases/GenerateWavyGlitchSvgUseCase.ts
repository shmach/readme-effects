import { extractDataFromUrl } from '@app/helpers/extractDataFromUrl';
import type { IUseCase } from '../@types/IUseCase';

type GenerateWavyGlitchSvgUseCaseParams = {
  url: string;
};
export class GenerateWavyGlitchSvgUseCase implements IUseCase<
  GenerateWavyGlitchSvgUseCaseParams,
  string
> {
  async execute(params: GenerateWavyGlitchSvgUseCaseParams): Promise<string> {
    const { text, size, font, pColor, sColor, bgColor, width, height } =
      extractDataFromUrl(params.url);

    const lineDuration = 4;
    const fadeDuration = 0.5;
    const totalDuration = Math.max(text.length * lineDuration, lineDuration);

    const buildGlitchAnimation = (index: number, maxOpacity: number) => {
      if (text.length === 1) {
        return null;
      }

      const start = index * lineDuration;
      const end = start + lineDuration;
      const fade = Math.min(fadeDuration, lineDuration / 2);

      const keyTimes = [
        0,
        start / totalDuration,
        (start + fade * 0.2) / totalDuration,
        (start + fade * 0.4) / totalDuration,
        (start + fade) / totalDuration,
        (end - fade) / totalDuration,
        (end - fade * 0.6) / totalDuration,
        (end - fade * 0.3) / totalDuration,
        end / totalDuration,
        1,
      ];

      const opacityValues = `0;0;${maxOpacity};0;${maxOpacity};${maxOpacity};0;${maxOpacity};0;0`;
      const jitterValues = '0 0;0 0;-1 0;2 0;-1 0;0 0;2 -1;-2 1;0 0;0 0';

      return {
        opacityValues,
        jitterValues,
        keyTimes: keyTimes.join(';'),
      };
    };

    const textElements = text
      .map((line, index) => {
        const primary = buildGlitchAnimation(index, 1);
        const secondary = buildGlitchAnimation(index, 0.6);

        const primaryAnimate = primary
          ? `\n      <animate attributeName="opacity" dur="${totalDuration}s" values="${primary.opacityValues}" keyTimes="${primary.keyTimes}" repeatCount="indefinite"/>\n      <animateTransform attributeName="transform" type="translate" dur="${totalDuration}s" values="${primary.jitterValues}" keyTimes="${primary.keyTimes}" repeatCount="indefinite"/>`
          : '';
        const secondaryAnimate = secondary
          ? `\n      <animate attributeName="opacity" dur="${totalDuration}s" values="${secondary.opacityValues}" keyTimes="${secondary.keyTimes}" repeatCount="indefinite"/>\n      <animateTransform attributeName="transform" type="translate" dur="${totalDuration}s" values="${secondary.jitterValues}" keyTimes="${secondary.keyTimes}" repeatCount="indefinite"/>`
          : '';

        const primaryOpacity = primary ? '0' : '1';
        const secondaryOpacity = secondary ? '0' : '0.6';

        return `
    <text x="50%" y="50%"
      dominant-baseline="middle"
      text-anchor="middle"
      font-family="${font}"
      font-size="${size}"
      fill="#${pColor}"
      filter="url(#glitch)"
      opacity="${primaryOpacity}">
      ${line}
      ${primaryAnimate}
    </text>

    <text x="50%" y="50%"
      dominant-baseline="middle"
      text-anchor="middle"
      font-family="${font}"
      font-size="${size}"
      fill="#${sColor}"
      opacity="${secondaryOpacity}"
      filter="url(#rgb)">
      ${line}
      ${secondaryAnimate}
    </text>`;
      })
      .join('\n');

    const svg = `
  <svg xmlns="http://www.w3.org/2000/svg"
     width="${width}"
     height="${height}"
     viewBox="0 0 ${width} ${height}">

  <defs>
    <filter id="glitch">
      <feTurbulence type="fractalNoise"
        baseFrequency="0.01"
        numOctaves="1"
        result="noise">
        <animate attributeName="baseFrequency"
          dur="2s"
          values="0.01;0.03;0.01"
          repeatCount="indefinite"/>
      </feTurbulence>

      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="10"/>
    </filter>

    <filter id="rgb">
      <feOffset dx="-2" dy="0" result="r"/>
      <feOffset dx="2" dy="0" result="b"/>
      <feMerge>
        <feMergeNode in="r"/>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="b"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="100%" height="100%" fill="${bgColor}"/>

  ${textElements}
</svg>
`;

    return svg.trim();
  }
}
