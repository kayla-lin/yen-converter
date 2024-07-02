import { useIsHydrated } from '@/hooks/use-is-hydrated'
import React from 'react'
import { PwaPrompt as ReactPWAPrompt } from 'react-ios-pwa-prompt-ts'

export const PWAPrompt = () => {
	const { isHydrated } = useIsHydrated()
	return <>{isHydrated && <ReactPWAPrompt />}</>
}
