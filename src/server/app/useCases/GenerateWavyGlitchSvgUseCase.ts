import type { IUseCase } from '../@types/IUseCase';
import { escapeXML } from '../helpers/escapeXML';

type GenerateWavyGlitchSvgUseCaseParams = {
  url: string;
};
export class GenerateWavyGlitchSvgUseCase implements IUseCase<
  GenerateWavyGlitchSvgUseCaseParams,
  string
> {
  async execute(params: GenerateWavyGlitchSvgUseCaseParams): Promise<string> {
    const url = new URL(params.url);

    const text = url.searchParams.get('text') ?? 'Hello World!';
    const pColor = url.searchParams.get('pColor')?.replace('#', '') ?? '00ff00';
    const sColor = url.searchParams.get('sColor')?.replace('#', '') ?? 'ff00ff';
    const bgColor = url.searchParams.get('bgColor') ?? 'transparent';
    const font = url.searchParams.get('font') ?? 'Fira Code, monospace';
    const size = Number(url.searchParams.get('size') ?? '18');
    const width = Number(url.searchParams.get('width') ?? '400');
    const height = Number(url.searchParams.get('height') ?? '80');

    const safeText = escapeXML(text);

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

    <text x="50%" y="50%"
    dominant-baseline="middle"
    text-anchor="middle"
    font-family="${font}"
    font-size="${size}"
    fill="#${pColor}"
    filter="url(#glitch)">
    ${safeText}
  </text>

  <text x="50%" y="50%"
    dominant-baseline="middle"
    text-anchor="middle"
    font-family="${font}"
    font-size="${size}"
    fill="#${sColor}"
    opacity="0.6"
    filter="url(#rgb)">
    ${safeText}
  </text>
</svg>
`;

    return svg.trim();
  }
}
