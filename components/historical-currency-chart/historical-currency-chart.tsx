import React, { useEffect } from 'react'
import { HistoricalCurrency30Days } from './historical-currency-types'
import { useHistoryCurrencyStore } from './historical-currency-store'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	TooltipProps,
	XAxis,
	YAxis,
} from 'recharts'
import { useConversionRateStore } from '../converter/rates-store'
import moment from 'moment'
import {
	NameType,
	ValueType,
} from 'recharts/types/component/DefaultTooltipContent'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card'

const HISTORY_URL = 'https://kayla_lin-getyenpriceblob.web.val.run'

export const HistoricalCurrencyChart = () => {
	const { setHistory, history } = useHistoryCurrencyStore()
	const { country } = useConversionRateStore()

	const CustomTooltip = ({
		active,
		payload,
		label,
	}: TooltipProps<ValueType, NameType>) => {
		if (active) {
			return (
				<Card>
					<CardHeader>
						<CardTitle> {moment(label).format('MMM Do')}</CardTitle>
						<CardDescription>
							{`${payload?.[0].value} ${country.toUpperCase()}`}
						</CardDescription>
					</CardHeader>
				</Card>
			)
		}
		return null
	}

	useEffect(() => {
		const getHistory = async () => {
			try {
				const historyRes = await fetch(HISTORY_URL)
				const history: HistoricalCurrency30Days = await historyRes.json()
				setHistory(history)
			} catch (e) {
				console.log(e)
			}
		}
		const currentDate = new Date().toISOString().split('T')[0]
		if (!history || currentDate !== history.lastUpdated) {
			getHistory()
		}
	}, [])

	const historyChartData = history
		? getHistoryByCurrency(history, country)
		: null

	if (!historyChartData) {
		return <div>error</div>
	}

	return (
		<Card className='md:w-[400px] w-[100%] mx-auto'>
			<CardHeader>
				<CardTitle>Past 30 Days of Yen to {country.toUpperCase()}</CardTitle>
			</CardHeader>
			<CardContent className='h-[150px]'>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart data={historyChartData}>
						<XAxis
							tick={{ fontSize: '12px' }}
							dataKey='date'
							domain={['auto', 'auto']}
							name='Time'
							tickFormatter={(unixTime) => moment(unixTime).format('MMM Do')}
							type='number'
						/>
						<Tooltip content={<CustomTooltip />} />
						<YAxis
							tick={{ fontSize: '12px' }}
							dataKey='value'
							name='Value'
							domain={['dataMin', 'dataMax']}
						/>
						<Line
							type='monotone'
							dataKey='value'
							stroke='hsl(var(--primary))'
							opacity={0.9}
						/>
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}

function getHistoryByCurrency(
	history: HistoricalCurrency30Days,
	currency: string,
) {
	const currencyHistory = history.data.map((day) => ({
		date: new Date(day.date).getTime(),
		value: day.rates.find(
			(history) => history.targetCurrency === currency.toUpperCase(),
		)?.exchangeRate,
	}))

	return currencyHistory
}
