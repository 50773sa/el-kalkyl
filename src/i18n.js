/**
 * https://react.i18next.com/
 */

import i18next from "i18next"
import { initReactI18next } from "react-i18next"
// en
import enTranslationHomepage from "./locales/english/enHomepage.json"
import enTranslationButtons from "./locales/english/enButtons.json"
import enTranslationSettingsPage from './locales/english/enSettingsPage.json'
import enTranslationNavigation from './locales/english/enNavigation.json'
import enTranslationTableHead from './locales/english/enTableHead.json'
import enTranslationOther from './locales/english/enOther.json'
import enTranslationProjects from './locales/english/enProjects.json'
import enTranslationMaterials from './locales/english/enMaterials.json'
import enTranslationModals from './locales/english/enModals.json'

// sv
import svTranslationHomepage from "./locales/swedish/svHomepage.json"
import svTranslationButtons from "./locales/swedish/svButtons.json"
import svTranslationSettingsPage from './locales/swedish/svSettingsPage.json'
import svTranslationNavigation from './locales/swedish/svNavigation.json'
import svTranslationTableHead from './locales/swedish/svTableHead.json'
import svTranslationOther from './locales/swedish/svOther.json'
import svTranslationProjects from './locales/swedish/svProjects.json'
import svTranslationMaterials from './locales/swedish/svMaterials.json'
import svTranslationModals from './locales/swedish/svModals.json'

i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: "en",
    resources: {
        en: {
            translation: {
                homepage: enTranslationHomepage,
                buttons: enTranslationButtons,
                settingsPage: enTranslationSettingsPage,
                navigation: enTranslationNavigation,
                tableHead: enTranslationTableHead,
                projects: enTranslationProjects,
                materials: enTranslationMaterials,
                modals: enTranslationModals,
                other: enTranslationOther,
            },
        },
        sv: {
            translation: {
                homepage: svTranslationHomepage,
                buttons: svTranslationButtons, 
                settingsPage: svTranslationSettingsPage,
                navigation: svTranslationNavigation,
                tableHead: svTranslationTableHead,
                projects: svTranslationProjects,
                materials: svTranslationMaterials,
                modals: svTranslationModals,
                other: svTranslationOther,
            },
        },
    }
})