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
    const color = url.searchParams.get('color')?.replace('#', '') ?? '2cb67d';
    const size = Number(url.searchParams.get('size') ?? '36');
    const width = Number(url.searchParams.get('width') ?? '130');
    const height = Number(url.searchParams.get('height') ?? '80');

    const safeText = escapeXML(decodeURIComponent(text));

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

  <rect width="100%" height="100%" fill="transparent"/>

    <text x="50%" y="50%"
    dominant-baseline="middle"
    text-anchor="middle"
    font-family="Fira Code, monospace"
    font-size="${size}"
    fill="#${color}"
    filter="url(#glitch)">
    ${safeText}
  </text>

  <text x="50%" y="50%"
    dominant-baseline="middle"
    text-anchor="middle"
    font-family="Fira Code, monospace"
    font-size="${size}"
    fill="#ff2e63"
    opacity="0.6"
    filter="url(#rgb)">
    ${safeText}
  </text>
</svg>
`;

    return svg.trim();
  }
}
