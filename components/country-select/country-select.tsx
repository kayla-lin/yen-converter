'use client'

import * as React from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

import currencyCountry from './countries.json'
import { useConversionRateStore } from '../converter/rates-store'
import { useCheckRate } from '../converter/use-check-rate'
import { Skeleton } from '../ui/skeleton'

export function CountrySelect() {
	const [open, setOpen] = React.useState(false)
	const { country, setCountry, validCountries } = useConversionRateStore()
	const { isRatesLoading } = useCheckRate()

	const countries = Object.entries(currencyCountry)
		.map(([key, country]) => {
			return { country: key, label: `${country}  ${key.toUpperCase()}` }
		})
		.filter(
			(country) =>
				!!validCountries.find(
					(validCountry) => validCountry === country.country.toLowerCase(),
				),
		)

	if (isRatesLoading) {
		return <Skeleton className='w-[120px]' />
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='w-[120px] justify-between'
				>
					{country
						? countries.find((c) => c.country === country)?.label
						: 'Select c...'}
					<CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0 font-sans'>
				<Command className='font-sans'>
					<CommandInput placeholder='Search country...' className='h-9' />
					<CommandList>
						<CommandEmpty>No country found.</CommandEmpty>
						<CommandGroup>
							{countries.map((c) => (
								<CommandItem
									key={c.country}
									value={c.country}
									onSelect={(currentValue) => {
										setCountry(currentValue === country ? '' : currentValue)
										setOpen(false)
									}}
								>
									{c.label}
									<CheckIcon
										className={cn(
											'ml-auto h-4 w-4',
											country === c.country ? 'opacity-100' : 'opacity-0',
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
