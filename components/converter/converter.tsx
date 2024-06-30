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
import { useCheckRate } from '@/components/converter/use-check-rate'
import { useConversionRateStore } from '@/components/converter/rates-store'
import { Separator } from '../ui/separator'
import { Banknote } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'

export function Converter() {
	const [yenAmount, setYenAmount] = useState('0')
	const [localizedAmount, setLocalizedAmount] = useState('0')
	const { yenRate, lastUpdated, country } = useConversionRateStore()
	const yenInputRef = useRef<HTMLInputElement | null>(null)
	const { isRatesLoading } = useCheckRate()

	const onClearConverter = () => {
		setLocalizedAmount('0')
		setYenAmount('0')
		if (yenInputRef.current) {
			yenInputRef?.current?.focus()
		}
	}

	if (isRatesLoading) {
		return (
			<div className='flex flex-col items-center justify-center'>
				<Skeleton className='h-[350px] md:w-[400px] w-[100%] base rounded-xl' />
			</div>
		)
	}

	return (
		<div className='flex flex-col items-center justify-center'>
			<Card className='md:w-[400px] w-[100%]'>
				<CardHeader>
					<CardTitle>Currency Converter</CardTitle>
					<CardDescription>Convert Japanese Yen to {country}</CardDescription>
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

									if (
										value.length === 2 &&
										value[0] === '0' &&
										value[1] !== '.'
									) {
										setYenAmount(value[1])
									} else {
										setYenAmount(value)
									}

									const yen = parseFloat(value)
									const convertedUSD = yen * yenRate

									setLocalizedAmount(convertedUSD.toFixed(2))
									if (value.length === 0) {
										setLocalizedAmount('0')
										setYenAmount('0')
									}
								}}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='currency-convert-input'>{country}</Label>
							<Input
								min={0}
								id='currency-convert-input'
								type='number'
								placeholder={`Converted ${country} amount`}
								value={localizedAmount}
								onChange={(e) => {
									const value = e.target.value

									if (
										value.length === 2 &&
										value[0] === '0' &&
										value[1] !== '.'
									) {
										setLocalizedAmount(value[1])
									} else {
										setLocalizedAmount(value)
									}

									const usd = parseFloat(value)
									const convertedYen = usd / yenRate

									setYenAmount(convertedYen.toFixed(2))

									if (value.length === 0) {
										setLocalizedAmount('0')
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
					<div className='flex items-center space-x-4 rounded-md border p-4 w-full'>
						<Banknote />
						<div className='flex-1 space-y-1'>
							<p className='text-sm font-medium leading-none flex gap-2 items-center'>
								1 Japanese Yen = {yenRate.toFixed(4)} {country}
							</p>
							<p className='text-xs text-muted-foreground'>
								Updated{' '}
								{lastUpdated && new Date(lastUpdated).toLocaleString('en-US')}
							</p>
						</div>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
