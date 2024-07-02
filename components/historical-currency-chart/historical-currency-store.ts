import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { HistoricalCurrency30Days } from './historical-currency-types'

interface StoreState {
	history: HistoricalCurrency30Days | null
	lastUpdated: number | null
	setHistory: (history: HistoricalCurrency30Days) => void
}

export const useHistoryCurrencyStore = create<StoreState>()(
	devtools(
		persist(
			(set) => ({
				history: null,
				lastUpdated: null,
				setHistory: (by) => {
					return set(() => ({ history: by, lastUpdated: new Date().getTime() }))
				},
			}),
			{
				name: 'rate-history-storage',
			},
		),
	),
)
