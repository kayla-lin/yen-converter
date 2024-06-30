import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { CurrencyRate } from './converter-types'

interface BearState {
	lastUpdated: number | null
	yenRate: number
	yenRates: Record<string, CurrencyRate> | null
	setYenRate: (by: number) => void
	setYenRates: (yenRates: Record<string, CurrencyRate>) => void
	country: string
	validCountries: string[]
	setCountry: (by: string) => void
	setValidCountries: (by: string[]) => void
}

export const useConversionRateStore = create<BearState>()(
	devtools(
		persist(
			(set) => ({
				yenRates: null,
				yenRate: 0.0063,
				lastUpdated: null,
				setYenRate: (by) =>
					set(() => ({ yenRate: by, lastUpdated: new Date().getTime() })),
				setYenRates: (by) => set(() => ({ yenRates: by })),
				country: 'USD',
				validCountries: [],
				setCountry: (by) => set(() => ({ country: by })),
				setValidCountries: (by) => set(() => ({ validCountries: by })),
			}),
			{
				name: 'rate-storage',
			},
		),
	),
)
