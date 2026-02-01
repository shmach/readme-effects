import { escapeXML } from './escapeXML';

interface ExtractDataFromUrlOutput {
  text: string[];
  pColor: string;
  sColor: string;
  bgColor: string;
  font: string;
  size: number;
  width: number;
  height: number;
}

export function extractDataFromUrl(
  unparsedUrl: string,
): ExtractDataFromUrlOutput {
  const url = new URL(unparsedUrl);
  const unformattedText = url.searchParams.get('text') ?? 'Hello World!';
  const text = unformattedText.split(';').map((part) => escapeXML(part));
  const pColor = url.searchParams.get('pColor')?.replace('#', '') ?? '00ff00';
  const sColor = url.searchParams.get('sColor')?.replace('#', '') ?? 'ff00ff';
  const bgColor = url.searchParams.get('bgColor') ?? 'transparent';
  const font = url.searchParams.get('font') ?? 'Fira Code, monospace';
  const size = Number(url.searchParams.get('size') ?? '18');
  const width = Number(url.searchParams.get('width') ?? '400');
  const height = Number(url.searchParams.get('height') ?? '80');

  return {
    text,
    pColor,
    sColor,
    bgColor,
    font,
    size,
    width,
    height,
  };
}
