import { ModeToggle } from '@/components/mode-toggle'
import Page from '@/components/page'
import Section from '@/components/section'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { cx } from 'class-variance-authority'
import Link from 'next/link'

const Recipes = () => (
	<Page title='About'>
		<div className='flex flex-col space-y-8'>
			<Section>
				<div className='flex flex-col space-y-4'>
					<h2 className='text-xl font-semibold'>Settings</h2>
					<div className='flex flex-col space-y-2'>
						<div>
							<h3 className='text-md font-medium'>Theme Preference</h3>
							<p className='text-sm text-muted-foreground'>
								Change to dark and light mode
							</p>
						</div>
						<span>
							<ModeToggle />
						</span>
					</div>
				</div>
			</Section>
			<Separator />
			<Section>
				<h2 className='text-xl font-semibold'>Meet Yenny</h2>
				<div className='mt-2 flex flex-col space-y-8'>
					<p>
						Yenny is a Japanese Yen (JPY) converter that can convert Japanese
						Yen to the US Dollar (USD), Euros (EUR), British Pound Sterling
						(GBP), and more currencies.
					</p>
					<p>
						I made Yenny because I was going on vacation in Japan and just
						needed a Yen converter, and I wanted an application with no bloat--
						nothing else besides yen conversion.
					</p>
				</div>
			</Section>
			<Section>
				<h3 className='text-lg font-semibold'>Why Yenny?</h3>
				<ul className='list-disc space-y-2 px-6 py-2'>
					<li className='text-md font-medium'>
						✅ Free to use with no advertisements
					</li>
					<li className='text-md font-medium'>
						🛠 Supports offline mode (No wifi or cellular needed)
					</li>
					<li className='text-md font-medium'>
						🌎 Can be downloaded as an application for iOS, Android, and desktop
					</li>
				</ul>
			</Section>
			<Section>
				<a
					href='https://www.producthunt.com/posts/yenny?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-yenny'
					target='_blank'
				>
					<img
						src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=468146&theme=light'
						alt='Yenny - Simple&#0032;Japanese&#0032;Yen&#0032;currency&#0032;converter | Product Hunt'
						width='250'
						height='54'
					/>
				</a>
			</Section>
			<Section>
				<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4'>
					<div className='flex space-x-4'>
						<Avatar className='border w-[50px] h-[50px]'>
							<AvatarImage src='https://github.com/kayla-lin.png' />
							<AvatarFallback>KL</AvatarFallback>
						</Avatar>
						<div className='flex flex-col'>
							<h3 className='text-md font-medium'>Kayla Lin</h3>
							<h3 className='text-md text-muted-foreground'>@kayladotdev</h3>
						</div>
					</div>
					<h3 className='text-md font-semibold block sm:hidden'>
						Show your support on socials! ❤️
					</h3>
					<div className='flex space-x-2'>
						<Link
							href='https://twitter.com/kayladotdev'
							target='_blank'
							className={cx(
								buttonVariants({
									variant: 'outline',
								}),
								'w-[50px] h-[50px]',
							)}
						>
							<TwitterLogoIcon />
						</Link>
						<Link
							href='https://github.com/kayla-lin'
							target='_blank'
							className={cx(
								buttonVariants({
									variant: 'outline',
								}),
								'w-[50px] h-[50px]',
							)}
						>
							<GitHubLogoIcon />
						</Link>
					</div>
				</div>
			</Section>
		</div>
	</Page>
)

export default Recipes
