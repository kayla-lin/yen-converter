import { Home, Info } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const BottomNav = () => {
	const router = useRouter()

	return (
		<div className='sm:hidden'>
			<nav className='fixed bottom-0 w-full border-t pb-safe border bg-background'>
				<div className='mx-auto flex h-16 max-w-md items-center justify-around px-6'>
					{links.map(({ href, label, icon }) => (
						<Link
							key={label}
							href={href}
							className={`flex h-full w-full flex-col items-center justify-center space-y-1 ${`text-sm ${
								router.pathname === href
									? 'text-primary hover:text-muted-foreground'
									: 'text-muted-foreground hover:text-primary'
							}`}`}
						>
							{icon}
							<span className='text-xs text-zinc-600 dark:text-zinc-400'>
								{label}
							</span>
						</Link>
					))}
				</div>
			</nav>
		</div>
	)
}

export default BottomNav

const links = [
	{
		label: 'Home',
		href: '/',
		icon: <Home />,
	},
	{
		label: 'About',
		href: '/about',
		icon: <Info />,
	},
]
