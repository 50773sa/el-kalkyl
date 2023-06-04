import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const useViewStore = create(
	devtools(
		persist((set) => ({
			isCurrentView: { collection: false, createDoc: false },
			setIsCurrentView: (newState) => set((state) => ({
				...state,
				isCurrentView: { ...state.isCurrentView, ...newState },
			})),
		}), 
		{name: 'views'})
	),
)

export default useViewStore