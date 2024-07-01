import currencyCountry from './countries.json'

export function getCountryEmoji(country: string) {
	return currencyCountry[country?.toUpperCase() as keyof typeof currencyCountry]
}
