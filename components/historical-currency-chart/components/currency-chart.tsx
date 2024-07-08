'use client'

import React from 'react'
import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	TooltipProps,
	YAxis,
} from 'recharts'
import { HistoricalCurrency30Days } from '../historical-currency-types'
import {
	NameType,
	ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

import moment from 'moment'

interface Props {
	history: HistoricalCurrency30Days
	country: string
}

import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig

export function CurrencyChart({ history, country }: Props) {
	const historyChartData = getHistoryByCurrency(history, country)

	return (
		<ChartContainer config={chartConfig}>
			<AreaChart
				accessibilityLayer
				data={historyChartData}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey='date'
					tickLine={false}
					axisLine={false}
					domain={['dataMin', 'dataMax']}
					tickMargin={8}
					type='number'
					tickFormatter={(unixTime) => moment(unixTime).format('MMM Do')}
				/>
				<YAxis
					tick={{ fontSize: '12px' }}
					tickLine={false}
					dataKey='value'
					name='Value'
					domain={['dataMin', 'dataMax']}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator='line' />}
				/>
				<Area
					dataKey='value'
					type='natural'
					fill='var(--color-desktop)'
					fillOpacity={0.4}
					stroke='var(--color-desktop)'
				/>
			</AreaChart>
		</ChartContainer>
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
