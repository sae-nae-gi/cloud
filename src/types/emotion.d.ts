
import '@emotion/react';
import type { Theme as CloudTheme} from "../theme";

declare module '@emotion/react' {
  export interface Theme extends CloudTheme{};
}