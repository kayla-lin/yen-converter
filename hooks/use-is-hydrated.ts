import { useEffect } from 'react'
import { useBoolean } from './use-boolean'

export const useIsHydrated = () => {
	const { value: isHydrated, setTrue: onHydrate } = useBoolean()
	useEffect(() => {
		onHydrate()
	}, [])

	return { isHydrated }
}
