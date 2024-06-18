import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface BearState {
	lastUpdated: number | null
	yenRate: number
	setYenRate: (by: number) => void
}

export const useConversionRateStore = create<BearState>()(
	devtools(
		persist(
			(set) => ({
				yenRate: 0.0063,
				lastUpdated: null,
				setYenRate: (by) =>
					set(() => ({ yenRate: by, lastUpdated: new Date().getTime() })),
			}),
			{
				name: 'rate-storage',
			},
		),
	),
)
