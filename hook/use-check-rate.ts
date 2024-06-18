import { useConversionRateStore } from '@/store/rates-store'
import { useEffect } from 'react'

interface CurrencyRate {
	code: string
	alphaCode: string
	numericCode: string
	name: string
	rate: number
	date: string
	inverseRate: number
}

export const useCheckRate = () => {
	const { lastUpdated, setYenRate } = useConversionRateStore()

	async function getCurrentYenPrice() {
		try {
			const res = await fetch('https://www.floatrates.com/daily/jpy.json')
			const rates: Record<string, CurrencyRate> = await res.json()
			const usdRates: CurrencyRate = rates['usd']
			setYenRate(usdRates.rate)
		} catch (e) {
			console.log('Could not get rates at this time')
			console.log(e)
		}
	}

	useEffect(() => {
		const getRate = async () => {
			if (lastUpdated === null || lastUpdated === undefined) {
				getCurrentYenPrice()
			}
			if (lastUpdated !== null && isMoreThan12Hours(lastUpdated)) {
				getCurrentYenPrice()
			}
		}
		getRate()
	}, [])
}

function isMoreThan12Hours(lastUpdatedTime: number) {
	const time1Millis = lastUpdatedTime
	const time2Millis = new Date().getTime()

	// Calculate the absolute difference in milliseconds
	const differenceInMillis = Math.abs(time2Millis - time1Millis)

	// Convert milliseconds to hours
	const differenceInHours = differenceInMillis / (1000 * 60 * 60)

	// Check if the difference is more than 12 hours
	return differenceInHours > 12
}
