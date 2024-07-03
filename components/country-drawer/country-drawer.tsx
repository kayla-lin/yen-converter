import * as React from 'react'
import { Button } from '@/components/ui/button'
import { useConversionRateStore } from '../converter/rates-store'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Input } from '../ui/input'
import { CheckIcon } from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog'
import { CountryName } from '../country-name'
import { analytics } from '@/service/firebase/firebase'
import { logEvent } from 'firebase/analytics'

export function CountryDrawer() {
	const { country, setCountry, validCountries } = useConversionRateStore()

	const [isOpen, setIsOpen] = React.useState<boolean>(false)

	const [countryQuery, setCountryQuery] = React.useState<string>('')

	const filteredCountries = validCountries.filter((c) =>
		c.toLowerCase().includes(countryQuery.toLowerCase()),
	)

	const onCloseDrawer = () => {
		setIsOpen(false)
		setCountryQuery('')
	}

	const countryListContainer = React.useRef<HTMLDivElement | null>(null)

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				setIsOpen(open)
				setCountryQuery('')
			}}
		>
			<Button
				variant='outline'
				onClick={() => {
					setIsOpen(true)
				}}
			>
				<CountryName country={country} />
			</Button>
			<DialogContent className='sm:h-auto h-[100svh] sm:w-auto w-full '>
				<div className='mx-auto w-[95%] max-w-sm p-2'>
					<DialogHeader>
						<DialogTitle>Convert to Currency</DialogTitle>
						<DialogDescription>
							Select currency to compare to Japanese Yen price
						</DialogDescription>
					</DialogHeader>
					<div className='flex flex-col space-y-4  py-4'>
						<Input
							className='text-lg'
							placeholder='Search for currency...'
							value={countryQuery}
							onChange={(e) => {
								const value = e.currentTarget.value
								setCountryQuery(value)

								if (countryListContainer.current) {
									countryListContainer.current.scrollTop = 0
								}
							}}
						/>
						<ul className='w-[100%]'>
							<ScrollArea
								className='sm:h-96 h-[77svh] w-[100%] rounded-md border'
								ref={countryListContainer}
							>
								{filteredCountries.map((c, idx) => (
									<li key={c} className='w-[100%]'>
										<Button
											onClick={() => {
												setCountry(c)
												if (analytics) {
													logEvent(analytics, 'select_item', {
														items: [{ name: `Change currency to ${c}` }],
													})
												}

												onCloseDrawer()
											}}
											size='lg'
											variant='ghost'
											className='rounded-none w-[100%] flex items-center text-left justify-between px-4'
										>
											<CountryName country={c} />
											{c === country && <CheckIcon />}
										</Button>
										{idx < validCountries.length - 1 && <Separator />}
									</li>
								))}
							</ScrollArea>
						</ul>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
