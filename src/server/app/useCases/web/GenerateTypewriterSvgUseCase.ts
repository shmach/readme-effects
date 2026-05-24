import { escapeXML } from '@app/helpers/escapeXML';
import { extractDataFromUrl } from '@app/helpers/extractDataFromUrl';
import type { IUseCase } from '../../@types/IUseCase';

type GenerateTypewriterSvgUseCaseParams = {
  url: string;
};

export class GenerateTypewriterSvgUseCase implements IUseCase<
  GenerateTypewriterSvgUseCaseParams,
  string
> {
  async execute(params: GenerateTypewriterSvgUseCaseParams): Promise<string> {
    const { size, font, pColor, sColor, bgColor, width, height } =
      extractDataFromUrl(params.url);

    // Split raw text per character before escaping to avoid splitting XML entities
    const url = new URL(params.url);
    const rawText = url.searchParams.get('text') ?? 'Hello World!';
    const lines = rawText.split(';').map((line) => [...line].map(escapeXML));

    const charDelay = 0.07;

    const lineStartOffsets: number[] = [];
    let cumulative = 0;
    for (const chars of lines) {
      lineStartOffsets.push(cumulative);
      cumulative += chars.length;
    }
    const totalChars = cumulative;

    const lineHeight = size * 1.6;
    const startY = (height - lines.length * lineHeight) / 2 + size;

    const textElements = lines
      .map((chars, lineIndex) => {
        const lineOffset = lineStartOffsets[lineIndex];
        const y = startY + lineIndex * lineHeight;

        const charSpans = chars
          .map((char, charIndex) => {
            const begin = ((lineOffset + charIndex) * charDelay).toFixed(2);
            return `<tspan opacity="0"><animate attributeName="opacity" to="1" begin="${begin}s" dur="0.05s" fill="freeze"/>${char}</tspan>`;
          })
          .join('');

        const isLastLine = lineIndex === lines.length - 1;
        const cursorSpan = isLastLine
          ? `<tspan fill="#${sColor}" opacity="0"><animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.5;1" dur="0.8s" begin="${(totalChars * charDelay).toFixed(2)}s" repeatCount="indefinite"/>|</tspan>`
          : '';

        return `  <text x="50%" y="${y.toFixed(1)}" dominant-baseline="auto" text-anchor="middle" font-family="${font}" font-size="${size}" fill="#${pColor}">${charSpans}${cursorSpan}</text>`;
      })
      .join('\n');

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bgColor}"/>
${textElements}
</svg>`.trim();
  }
}
