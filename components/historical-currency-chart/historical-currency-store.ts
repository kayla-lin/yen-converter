import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { HistoricalCurrency30Days } from './historical-currency-types'

interface StoreState {
	history: HistoricalCurrency30Days | null
	setHistory: (history: HistoricalCurrency30Days) => void
}

export const useHistoryCurrencyStore = create<StoreState>()(
	devtools(
		persist(
			(set) => ({
				history: null,
				setHistory: (by) => set(() => ({ history: by })),
			}),
			{
				name: 'rate-history-storage',
			},
		),
	),
)
