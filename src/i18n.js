import i18next from "i18next"
import { initReactI18next } from "react-i18next"

i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    resources: {
        en: {
            translation: {
                homepageCards: {
                    title: {
                        projects: 'Projects',
                        newProject: 'New Project',
                        material: 'Material',
                        newMaterial: 'New Material'
                    }, 
                    subtitle: {
                        projects: 'projects',
                        newProject: 'Create new project',
                        material: 'Edit material',
                        newMaterial: 'Create new material'
                    },
                }, 
                homepageTable: {
                    head: {
                        projects: 'Projects',
                        created: 'Created',
                        workHours: 'Working hours',
                        active: 'Active'
                    },
                },
            },
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