import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

// Set up translations
const translations = {
  en: {
    hello: 'Hello',
    world: 'World',
    // Add other English translations here
  },
  // Add other language translations here
};

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a translation file, it will fall back to English
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

// If you want to use a different fallback locale than the default,
// you can set it with `i18n.fallback = 'es';`

// This is a placeholder for the function that was causing the error.
// In a real scenario, you would import this from a library or define it appropriately.
export function RegisterClientLocalizations(config) {
  if (!config || !config.translations) {
    console.error("RegisterClientLocalizations: 'translations' object is undefined.");
    throw new Error("RegisterClientLocalizationsError: Cannot read properties of undefined (reading 'translations')");
  }
  // Simulate registration logic
  console.log("Client localizations registered successfully:", config.translations);
}

export { i18n, translations };
