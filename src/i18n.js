import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import enTranslation from './locales/en.json'

i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    resources: {
        en: {
            translation: enTranslation
        },
        sv: {
            translation: {
                homepageCards: {
                    title: {
                        projects: 'Projekt',
                        newProject: 'Nytt projekt',
                        material: 'Material',
                        newMaterial: 'Nytt Material'

                    }, 
                    subtitle: {
                        projects: 'Projekt',
                        newProject: 'Skapa nytt projekt',
                        material: 'Redigera material',
                        newMaterial: 'Skapa nytt material'

                    },
                }, 
                homepageTable: {
                    head: {
                        projects: 'Pågående projekt',
                        created: 'Skapad',
                        workHours: 'Arbetstimmar',
                        active: 'Aktiv'
                    },
                },         
            },
        },
    }

})