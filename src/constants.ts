const { innerWidth: width, innerHeight: height } = window;

const desktopWidth = width - (130 + 32 * 3);
const mobileWidth = width - 16 * 2 - 4 * 2;

const desktopHeight = height - 116;
const mobileHight = height - 208;

export const IS_MOBILE = desktopWidth < 320;
export const CANVAS_WIDTH = IS_MOBILE ? mobileWidth : desktopWidth;
export const CANVAS_HEIGHT = IS_MOBILE ? mobileHight : desktopHeight;
