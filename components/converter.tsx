'use client'

import { useRef, useState } from 'react'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCheckRate } from '@/hook/use-check-rate'
import { useConversionRateStore } from '@/store/rates-store'
import { Separator } from './ui/separator'

export function Converter() {
	const [yenAmount, setYenAmount] = useState('0')
	const [usdAmount, setUsdAmount] = useState('0')
	const { yenRate, lastUpdated } = useConversionRateStore()
	const yenInputRef = useRef<HTMLInputElement | null>(null)

	useCheckRate()

	const onClearConverter = () => {
		setUsdAmount('0')
		setYenAmount('0')
		if (yenInputRef.current) {
			yenInputRef?.current?.focus()
		}
	}

	return (
		<div className='flex flex-col items-center justify-center'>
			<Card>
				<CardHeader>
					<CardTitle>Currency Converter</CardTitle>
					<CardDescription>Convert Japanese Yen to US Dollars</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='grid grid-cols-2 gap-4'>
						<div className='space-y-2'>
							<Label htmlFor='yen'>Japanese Yen (JPY)</Label>
							<Input
								min={0}
								ref={yenInputRef}
								id='yen'
								type='number'
								placeholder='Enter Yen amount'
								value={yenAmount}
								onChange={(e) => {
									const value = e.target.value
									setYenAmount(value)

									const yen = parseFloat(value)
									const convertedUSD = yen * yenRate

									setUsdAmount(convertedUSD.toFixed(2))
									if (value.length === 0) {
										setUsdAmount('0')
									}
								}}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='usd'>US Dollars</Label>
							<Input
								min={0}
								id='usd'
								type='number'
								placeholder='Converted USD amount'
								value={usdAmount}
								onChange={(e) => {
									const value = e.target.value
									setUsdAmount(value)

									const usd = parseFloat(value)
									const convertedYen = usd / yenRate
									setYenAmount(convertedYen.toFixed(2))

									if (value.length === 0) {
										setYenAmount('0')
									}
								}}
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter className='flex flex-col gap-4'>
					<Button onClick={onClearConverter} className='w-full'>
						Clear
					</Button>
					<Separator />
					<div className='flex flex-col w-full gap-1'>
						<div className='font-semibold text-sm'>1 Japanese Yen equals</div>
						<div className='font-semibold text-2xl'>
							{yenRate.toFixed(4)} USD
						</div>
						<div className='text-xs flex items-center justify-between text-muted-foreground'>
							Last Updated{' '}
							{lastUpdated && new Date(lastUpdated).toLocaleString('en-US')}
						</div>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
