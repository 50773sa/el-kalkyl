import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const useLanguageStore = create(
	devtools(
		persist((set) => ({
			currLanguage: "en",
			setLanguage: (newState) => set({ currLanguage: newState }),
		}), { name: 'language' })
	),
)

export default useLanguageStore