export interface HistoricalCurrency {
	targetCurrency: string
	exchangeRate: number
}

export interface HistoricalCurrencyDate {
	rates: HistoricalCurrency[]
	date: string
}

export interface HistoricalCurrency30Days {
	data: HistoricalCurrencyDate[]
	lastUpdated: string
}
