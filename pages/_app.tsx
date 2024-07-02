import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css'
import { Inter } from '@next/font/google'
import { PWAPrompt } from '@/components/pwa-prompt'
import { RenderOnHydrate } from '@/components/render-on-hydrate'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
})
export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
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
					<RenderOnHydrate>
						<Component {...pageProps} />
					</RenderOnHydrate>
				</main>
			</ThemeProvider>
		</>
	)
}
