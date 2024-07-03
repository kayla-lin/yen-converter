import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css'
import { Inter } from '@next/font/google'
import { PWAPrompt } from '@/components/pwa-prompt'
import Head from 'next/head'
import '@/service/firebase/firebase'
import { useTrackPageView } from '@/service/firebase/use-track-page-view'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
})
export default function App({ Component, pageProps }: AppProps) {
	useTrackPageView()

	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover'
				/>

				<meta property='og:url' content='https://www.yenny.app/' />
				<meta property='og:type' content='website' />
				<meta property='og:title' content='Yenny | Japanese Yen Converter' />
				<meta
					property='og:description'
					content='Yenny is a Japanese Yen (JPY) converter that can convert Japanese Yen to the US Dollar (USD), Euros (EUR), Great British Pound (GPB), and any other currency.'
				/>
				<meta property='og:image' content='https://i.imgur.com/3zwhIGT.png' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta property='twitter:domain' content='yenny.app' />
				<meta property='twitter:url' content='https://www.yenny.app/' />
				<meta name='twitter:title' content='Yenny | Japanese Yen Converter' />
				<meta
					name='twitter:description'
					content='Yenny is a Japanese Yen (JPY) converter that can convert Japanese Yen to the US Dollar (USD), Euros (EUR), Great British Pound (GPB), and any other currency.'
				/>
				<meta name='twitter:image' content='https://i.imgur.com/3zwhIGT.png' />
			</Head>
			<style jsx global>{`
				:root {
					--font-inter: ${inter.style.fontFamily};
				}
			`}</style>

			<PWAPrompt />
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				disableTransitionOnChange
			>
				<main className={`${inter.variable}`}>
					<Component {...pageProps} />
				</main>
			</ThemeProvider>
		</>
	)
}
