import Head from 'next/head'
import Appbar from '@/components/appbar'
import BottomNav from '@/components/bottom-nav'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/router'

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})

interface Props {
	title?: string
	children: React.ReactNode
}

const Page = ({ title, children }: Props) => {
	const router = useRouter()
	const { slug } = router.query
	const ogImage = `${window.location.hostname}/images/opengraph.png'`

	return (
		<>
			{title ? (
				<Head>
					<title>Yenny | {title}</title>
					<title>Yenny | Japanese Yen Converter</title>
					<meta
						name='description'
						content='Yenny is a Japanese Yen (JPY) converter that can convert Japanese Yen to the US Dollar (USD), Euros (EUR), Great British Pound (GPB), and any other currency.'
					/>
					<meta property='og:url' content='https://www.yenny.app/' />
					<meta property='og:type' content='website' />
					<meta property='og:title' content='Yenny | Japanese Yen Converter' />
					<meta
						property='og:description'
						content='Yenny is a Japanese Yen (JPY) converter that can convert Japanese Yen to the US Dollar (USD), Euros (EUR), Great British Pound (GPB), and any other currency.'
					/>
					<meta property='og:image' content={ogImage} />
					<meta name='twitter:card' content='summary_large_image' />
					<meta property='twitter:domain' content='yenny.app' />
					<meta property='twitter:url' content='https://www.yenny.app/' />
					<meta name='twitter:title' content='Yenny | Japanese Yen Converter' />
					<meta
						name='twitter:description'
						content='Yenny is a Japanese Yen (JPY) converter that can convert Japanese Yen to the US Dollar (USD), Euros (EUR), Great British Pound (GPB), and any other currency.'
					/>
					<meta name='twitter:image' content={ogImage} />
				</Head>
			) : null}
			<div className={cn('font-sans antialiased', fontSans.variable)}>
				<Appbar />
				<div
					/**
					 * Padding top = `appbar` height
					 * Padding bottom = `bottom-nav` height
					 */
					className='animate-in fade-in duration-300 min-h-[100svh] bg-background mx-auto max-w-screen-md pt-20 pb-16 px-safe sm:pb-0'
				>
					<div className='p-8'>{children}</div>
				</div>
			</div>

			<BottomNav />
		</>
	)
}

export default Page
