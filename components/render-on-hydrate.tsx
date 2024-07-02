import { useIsHydrated } from '@/hooks/use-is-hydrated'
import { ReactNode } from 'react'

interface Props {
	children: ReactNode
}

export const RenderOnHydrate = ({ children }: Props) => {
	const { isHydrated } = useIsHydrated()
	if (!isHydrated) {
		return null
	}
	return children
}
