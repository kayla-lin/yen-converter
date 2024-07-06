import React from 'react'
import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	TooltipProps,
	XAxis,
	YAxis,
} from 'recharts'
import { HistoricalCurrency30Days } from '../historical-currency-types'
import {
	NameType,
	ValueType,
} from 'recharts/types/component/DefaultTooltipContent'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import moment from 'moment'

interface Props {
	history: HistoricalCurrency30Days
	country: string
}

export const CurrencyChart = ({ history, country }: Props) => {
	const historyChartData = history
		? getHistoryByCurrency(history, country)
		: null

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

	return (
		<>
			{historyChartData && (
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart data={historyChartData}>
						<XAxis
							tick={{ fontSize: '12px' }}
							dataKey='date'
							domain={['dataMin', 'dataMax']}
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
			)}
		</>
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
