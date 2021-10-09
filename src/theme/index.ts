import colors from "./colors";

const theme = {
  colors: colors,
}

export interface Theme {
  colors: typeof colors;
}

export default theme;

