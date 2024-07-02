import Head from 'next/head'
import Appbar from '@/components/appbar'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})

interface Props {
	title?: string
	children: React.ReactNode
}

const Page = ({ title, children }: Props) => {
	return (
		<>
			{title ? (
				<Head>
					<title>Yenny | {title}</title>
					<title>Yenny | Japanese Yen Converter</title>
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
		</>
	)
}

export default Page
