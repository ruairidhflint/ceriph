export const SPECIAL_CHARS = /[.,/#!$%?^&*;:{}=_`~()]/g;
export const ALPHA_ONLY = /[^a-zA-Z]/g;
export const ALPHA_SPACE = /[^a-zA-Z ]/g;

export const stripSpecialChars = (str: string) =>
  str.replace(SPECIAL_CHARS, "");

export const toAlphaOnly = (str: string) => str.replace(ALPHA_ONLY, "");

export const toAlphaSpace = (str: string) =>
  str.replace(ALPHA_SPACE, "").toLowerCase();
