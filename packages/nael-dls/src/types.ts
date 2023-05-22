export interface NaelDlsOptionsColorType {
  DEFAULT: string,
  50: string,
  100: string,
  200: string,
  300: string,
  400: string,
  500: string,
  600: string,
  700: string,
  800: string,
  900: string,
}

export interface NaelDlsOptions {
  css: boolean;
  colors?: {
    primary?: NaelDlsOptionsColorType,
    accent?: NaelDlsOptionsColorType,
    tertiary?: NaelDlsOptionsColorType,
    quaternary?: NaelDlsOptionsColorType
  }
}

/** Declare Vuestic module options in NuxtConfig */
declare module "@nuxt/schema" {
  interface NuxtConfig {
    naelDls?: Partial<NaelDlsOptions>;
  }
}
