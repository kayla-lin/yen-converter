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
	const ogTitle = `Yenny | ${slug}`
	const ogDescription = `Yenny is a Japanese Yen (JPY) converter that can convert Japanese
						Yen to the US Dollar (USD), Euros (EUR), Great British Pound (GPB),
						and more currencies.`
	const ogUrl = `https://yenny.app${router.asPath}`
	const ogImage = '/images/opengraph.png'

	return (
		<>
			{title ? (
				<Head>
					<title>Yenny | {title}</title>
					<meta property='og:title' content={ogTitle} />
					<meta property='og:description' content={ogDescription} />
					<meta property='og:image' content={ogImage} />
					<meta property='og:url' content={ogUrl} />
					<meta property='og:type' content='website' />
					<meta property='og:image:alt' content='About Yenny' />
					<meta name='twitter:image' content={ogImage} />
					<meta property='twitter:image:alt' content='About Yenny' />
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
