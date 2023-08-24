import i18next from "i18next"
import { initReactI18next } from "react-i18next"
// en
import enTranslationHomepage from "./locales/english/enHomepage.json"
import enTranslationButtons from "./locales/english/enButtons.json"
import enTranslationSettingsPage from './locales/english/enSettingsPage.json'
import enTranslationNavigation from './locales/english/enNavigation.json'

// sv
import svTranslationHomepage from "./locales/swedish/svHomepage.json"
import svTranslationButtons from "./locales/swedish/svButtons.json"
import svTranslationSettingsPage from './locales/swedish/svSettingsPage.json'
import svTranslationNavigation from './locales/swedish/svNavigation.json'


await i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: "en",
    resources: {
        en: {
            translation: {
                homepage: enTranslationHomepage,
                buttons: enTranslationButtons,
                settingsPage: enTranslationSettingsPage,
                navigation: enTranslationNavigation
            },
        },
        sv: {
            translation: {
                homepage: svTranslationHomepage,
                buttons: svTranslationButtons, 
                settingsPage: svTranslationSettingsPage,
                navigation: svTranslationNavigation
            },
        },
    }

})