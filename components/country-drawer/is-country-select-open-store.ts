import { create } from 'zustand'

interface State {
	isOpen: boolean
	setIsOpen: (by: boolean) => void
}

export const useIsCountrySelectOpenStore = create<State>()((set) => ({
	isOpen: false,
	setIsOpen: (by) => set(() => ({ isOpen: by })),
}))
