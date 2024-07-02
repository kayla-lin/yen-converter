import Link from 'next/link'
import { useRouter } from 'next/router'
import { CountryDrawer } from './country-drawer/country-drawer'
import { YennyLogo } from './yenny-logo'
import { useCheckRate } from './converter/use-check-rate'
import { Skeleton } from './ui/skeleton'
import { Button, buttonVariants } from './ui/button'
import { cx } from 'class-variance-authority'
import { Info } from 'lucide-react'
import { RenderOnHydrate } from './render-on-hydrate'

const links = [{ label: 'About', href: '/about' }]

const Appbar = () => {
	const router = useRouter()
	const { isRatesLoading } = useCheckRate()

	return (
		<div className='fixed top-0 left-0 z-20 w-full  pt-safe'>
			<header className='border-b px-safe bg-background'>
				<div className='mx-auto flex h-20 max-w-screen-md items-center justify-between px-6'>
					<Link href='/' className='flex space-x-2 items-center'>
						<YennyLogo height={20} width='auto' />
						<h1 className='font-bold'>Yenny</h1>
					</Link>
					<nav className='flex items-center space-x-4'>
						{/* <div className='hidden sm:block'>
							<div className='flex items-center space-x-6'>
								{links.map(({ label, href }) => (
									<Link
										key={label}
										href={href}
										className={`text-sm ${
											router.pathname === href
												? 'text-primary hover:text-muted-foreground'
												: 'text-muted-foreground hover:text-primary'
										}`}
									>
										{label}
									</Link>
								))}
							</div>
						</div> */}
						<Link
							href='/about'
							className={`hidden sm:block text-sm ${
								router.pathname === '/about'
									? 'text-primary hover:text-muted-foreground'
									: 'text-muted-foreground hover:text-primary'
							}`}
						>
							About
						</Link>
						<Link
							href='/about'
							className={cx(
								buttonVariants({
									variant: 'ghost',
								}),
								'w-[50px] h-[50px] block sm:hidden',
							)}
						>
							<Info />
						</Link>
						<RenderOnHydrate>
							{isRatesLoading ? <Skeleton /> : <CountryDrawer />}
						</RenderOnHydrate>
					</nav>
				</div>
			</header>
		</div>
	)
}

export default Appbar
