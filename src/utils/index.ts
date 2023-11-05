export function pxToRem(
  px: number | string,
  baseFontSize: number = 16
): string {
  if (typeof px === "string") {
    const parsedPx = Number(px.replace("px", ""));
    if (isNaN(parsedPx)) {
      px = 1;
    }
    px = parsedPx;
  }

  return `${px / baseFontSize}rem`;
}
