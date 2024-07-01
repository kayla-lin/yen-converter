import { useConversionRateStore } from '@/components/converter/rates-store'
import { useCallback, useEffect, useState } from 'react'
import { CurrencyRate } from './converter-types'

export const useCheckRate = () => {
	const {
		lastUpdated,
		setYenRate,
		setYenRates,
		yenRates,
		setValidCountries,
		country,
	} = useConversionRateStore()
	const [isRatesLoading, setIsRatesLoading] = useState<boolean>(true)

	const getCurrentYenPriceFromAPI = useCallback(async () => {
		try {
			const res = await fetch('https://www.floatrates.com/daily/jpy.json')
			const rates: Record<string, CurrencyRate> = await res.json()

			const localizedRates: CurrencyRate = rates[country.toLowerCase()]
			const validCountries = Object.keys(rates)
			setValidCountries(validCountries)
			setYenRate(localizedRates.rate)
			setYenRates(rates)
		} catch (e) {
			console.log(e)
		}
	}, [country])

	const updateYenRateFromCache = useCallback(() => {
		if (!yenRates) {
			throw new Error('Could not find cache of localized rates')
		}
		const localizedRates = yenRates[country.toLowerCase()]
		setYenRate(localizedRates.rate)
	}, [country, yenRates])

	useEffect(() => {
		const getRate = async () => {
			setIsRatesLoading(true)
			const isCacheNotFound =
				lastUpdated === null || lastUpdated === undefined || yenRates === null
			const isCacheOutdated =
				lastUpdated !== null && isMoreThan12Hours(lastUpdated)

			if (isCacheNotFound || isCacheOutdated) {
				await getCurrentYenPriceFromAPI()
			} else {
				updateYenRateFromCache()
			}
			setIsRatesLoading(false)
		}
		getRate()
	}, [country, yenRates])

	return { isRatesLoading }
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
