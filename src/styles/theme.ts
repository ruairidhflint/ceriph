export const darkTheme = {
  backgroundColor: "#27282C",
  fontColor: "#EEEEEE",
  accentColor: "#E9B85A",
  underlineColor: "rgba(255, 255, 255, 0.8)",
  errorColor: "#ad2d2d",
  serifFont: "Roboto Slab",
  textFont: "Roboto",
  mutedColor: "rgba(255, 255, 255, 0.4)",
};

export const lightTheme = {
  backgroundColor: "#F5F3EF",
  fontColor: "#2A2A2A",
  accentColor: "#C49A3C",
  underlineColor: "rgba(0, 0, 0, 0.3)",
  errorColor: "#c0392b",
  serifFont: "Roboto Slab",
  textFont: "Roboto",
  mutedColor: "rgba(0, 0, 0, 0.35)",
};

export type AppTheme = typeof darkTheme;

export const Theme = darkTheme;
