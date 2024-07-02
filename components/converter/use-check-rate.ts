import { useConversionRateStore } from '@/components/converter/rates-store'
import { useCallback, useEffect, useState } from 'react'
import { CurrencyRate } from './converter-types'
import { isCacheOutdated } from '@/util/is-cache-outdated'

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

			const isOutdated = isCacheOutdated(yenRates, lastUpdated)

			if (isOutdated) {
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
