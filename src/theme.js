import { Platform } from "react-native";

export const COLORS = {
  light: "#F5F5F5",
  dark: "#202020",
  accent: "#EE6C4D",
};

export const TYPESCALE = {
  h1: 106.31,
  h2: 70.88,
  h3: 47.25,
  h4: 31.5,
  h5: 21,
  body: 14,
};

export const THEME = {
  bg: COLORS.light,
  cardBg: COLORS.dark,
  cardBorder: COLORS.light,
  text: COLORS.dark,
  accent: COLORS.accent,
  emptyDot: COLORS.light,
  emptyDotBorder: COLORS.dark,
  fontFamily: Platform.select({
    web: "'Bitcount Prop Single', monospace",
    default: "Bitcount Prop Single",
  }),
  type: TYPESCALE,
};
