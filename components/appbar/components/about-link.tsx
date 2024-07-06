import { buttonVariants } from '@/components/ui/button'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { cx } from 'class-variance-authority'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const AboutLink = () => {
	const router = useRouter()

	const isAboutPage = router.pathname === '/about'

	return (
		<Link
			href={isAboutPage ? '/' : '/about'}
			className={buttonVariants({
				variant: isAboutPage ? 'secondary' : 'ghost',
				className: 'w-[50px] h-[50px]',
			})}
		>
			<QuestionMarkCircledIcon className='w-[50px] h-[50px]' />
		</Link>
	)
}
