import { logEvent } from 'firebase/analytics'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { analytics } from './firebase'

export const useTrackPageView = () => {
	const router = useRouter()

	useEffect(() => {
		analytics &&
			logEvent(analytics, 'page_view', {
				page_path: router.pathname,
			})
	}, [router.pathname])
}
