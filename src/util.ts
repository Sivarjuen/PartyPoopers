import Color from "color";

export const RGB = (r: number, g: number, b: number) => {
    return Color([r, g, b], "rgb").rgbNumber();
};

export const HEX = (hex: number | string) => {
    return Color(hex, "hex").rgbNumber();
};

export const HSL = (h: number, s: number, l: number) => {
    return Color([h, s, l], "hsl").rgbNumber();
};

export const HSV = (h: number, s: number, v: number) => {
    return Color([h, s, v], "hsv").rgbNumber();
};

export const COLOR = (name: string) => {
    return Color(name).rgbNumber();
};
