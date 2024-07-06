import React, { useEffect } from 'react'
import { HistoricalCurrency30Days } from './historical-currency-types'
import { useHistoryCurrencyStore } from './historical-currency-store'
import { useConversionRateStore } from '../converter/rates-store'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { isCacheOutdated } from '@/util/is-cache-outdated'
import { useCheckRate } from '../converter/use-check-rate'
import { useBoolean } from '@/hooks/use-boolean'
import { CurrencyChart } from './components/currency-chart'
import { Skeleton } from '../ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'

const HISTORY_URL = 'https://kayla_lin-getyenpriceblob.web.val.run'

export const HistoricalCurrencyChart = () => {
	const { setHistory, history, lastUpdated } = useHistoryCurrencyStore()
	const { country } = useConversionRateStore()
	const { isRatesLoading } = useCheckRate()
	const isHistoricDataLoading = useBoolean()
	const isHistoricDataError = useBoolean()

	const isLoading = isRatesLoading || isHistoricDataLoading.value
	const getHistory = async () => {
		isHistoricDataLoading.setTrue()
		try {
			const historyRes = await fetch(HISTORY_URL)
			const history: HistoricalCurrency30Days = await historyRes.json()
			setHistory(history)
		} catch (e) {
			console.log(e)
			isHistoricDataError.setTrue()
		}

		isHistoricDataLoading.setFalse()
	}

	useEffect(() => {
		if (isCacheOutdated(history, lastUpdated)) {
			getHistory()
		}
	}, [])

	if (isHistoricDataError.value) {
		return (
			<Alert variant='destructive'>
				<div className='flex space-y-4 flex-col items-center justify-center'>
					<ExclamationTriangleIcon className='h-[30px] w-[30px] ' />
					<h2 className='text-xl '>Historic chart failed to load</h2>
					<Button
						onClick={() => {
							getHistory()
							isHistoricDataError.setFalse()
						}}
						variant='destructive'
					>
						Retry
					</Button>
				</div>
			</Alert>
		)
	}

	return (
		<Card className='md:w-[400px] w-[100%] mx-auto'>
			<CardHeader>
				<CardTitle>Yen to {country.toUpperCase()} from Past 30 Days</CardTitle>
			</CardHeader>
			<CardContent className='h-[150px]'>
				{isLoading ? (
					<Skeleton className='w-[100%] h-[100%]' />
				) : (
					<>
						{history && <CurrencyChart history={history} country={country} />}
					</>
				)}
			</CardContent>
		</Card>
	)
}
