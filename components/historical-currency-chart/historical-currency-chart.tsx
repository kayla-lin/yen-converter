import React, { useEffect } from 'react'
import { HistoricalCurrency30Days } from './historical-currency-types'
import { useHistoryCurrencyStore } from './historical-currency-store'
import { useConversionRateStore } from '../converter/rates-store'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card'
import { isCacheOutdated } from '@/util/is-cache-outdated'
import { useCheckRate } from '../converter/use-check-rate'
import { useBoolean } from '@/hooks/use-boolean'
import { CurrencyChart } from './components/currency-chart'
import { Skeleton } from '../ui/skeleton'
import { Alert } from '../ui/alert'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import moment from 'moment'
import { TrendingDown, TrendingUp } from 'lucide-react'

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

	const minMax = history ? getMinMaxChart(history, country) : null

	const isTrendingUp =
		minMax?.earliestExchangeRate?.exchangeRate &&
		minMax?.latestExchangeRate?.exchangeRate
			? minMax?.earliestExchangeRate?.exchangeRate <
			  minMax?.latestExchangeRate?.exchangeRate
			: false

	const differenceInRate =
		minMax?.earliestExchangeRate?.exchangeRate &&
		minMax?.latestExchangeRate?.exchangeRate
			? calculateDifference(
					minMax.earliestExchangeRate.exchangeRate,
					minMax.latestExchangeRate.exchangeRate,
			  )
			: -1

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
				<CardTitle>JPY to {country.toUpperCase()}</CardTitle>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<Skeleton className='w-[100%] h-[380px]' />
				) : (
					<>
						{history && <CurrencyChart history={history} country={country} />}
					</>
				)}
			</CardContent>
			<CardFooter>
				{minMax?.earliestExchangeRate && minMax?.latestExchangeRate && (
					<div className='flex w-full items-start gap-2 text-sm'>
						<div className='grid gap-2'>
							<div className='flex items-center gap-2 font-medium leading-none'>
								{`Trending ${
									isTrendingUp ? 'up' : 'down'
								} by ${differenceInRate.toFixed(2)}%`}
								{isTrendingUp ? (
									<TrendingUp className='h-4 w-4' />
								) : (
									<TrendingDown />
								)}
							</div>

							<div className='flex items-center gap-2 leading-none text-muted-foreground'>
								{`From ${moment(minMax.earliestExchangeRate.date).format(
									'MMM Do',
								)}

								- 

								${moment(minMax.latestExchangeRate.date).format('MMM Do')}`}
							</div>
						</div>
					</div>
				)}
			</CardFooter>
		</Card>
	)
}

function getMinMaxChart(history: HistoricalCurrency30Days, country: string) {
	const earliestExchangeRates = history
		? history.data[history.data.length - 1]
		: null
	const latestExchangeRates = history ? history.data[0] : null

	const earliestExchangeRate =
		earliestExchangeRates?.rates?.find(
			(rate) => rate.targetCurrency.toUpperCase() === country.toUpperCase(),
		) ?? null
	const latestExchangeRate =
		latestExchangeRates?.rates?.find(
			(rate) => rate.targetCurrency.toUpperCase() === country.toUpperCase(),
		) ?? null

	return {
		earliestExchangeRate: {
			...earliestExchangeRate,
			date: earliestExchangeRates?.date,
		},
		latestExchangeRate: {
			...latestExchangeRate,
			date: latestExchangeRates?.date,
		},
	}
}

function calculateDifference(num1: number, num2: number) {
	if (num1 > num2) {
		return calculateTrendingDown(num1, num2)
	}

	return calculateTrendingUp(num1, num2)
}

function calculateTrendingUp(num1: number, num2: number) {
	return (num1 / num2) * 100
}

function calculateTrendingDown(num1: number, num2: number) {
	const decrease = num1 - num2
	return (decrease / num1) * 100
}
