import { getCountryEmoji } from '@/util/get-country/get-country-emoji'
import React from 'react'

interface Props {
	country: string
	showEmoji?: boolean
}

export const CountryName = ({ country, showEmoji = true }: Props) => {
	const emoji = getCountryEmoji(country)

	return (
		<span className='flex space-x-2'>
			{showEmoji && <span>{emoji}</span>}
			<span>{country.toUpperCase()}</span>
		</span>
	)
}
