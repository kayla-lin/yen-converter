import React, { SVGProps } from 'react'

export function YennyLogo(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='95'
			height='190'
			fill='none'
			viewBox='0 0 95 190'
			{...props}
		>
			<path fill='#fff' d='M33.07 0H61.07V28H33.07z'></path>
			<path
				fill='#fff'
				fillRule='evenodd'
				d='M94.14 75H0V53h94.14v22zM94.14 122H0v-22h94.14v22z'
				clipRule='evenodd'
			></path>
			<path
				fill='url(#paint0_linear_58_57)'
				fillRule='evenodd'
				d='M33.58 147h26.85l.13.174L88.7 187.673a12.53 12.53 0 011.31 2.327H59.624l-12.982-19.102L33.722 190H4.13c.393-.869.882-1.742 1.467-2.62L33.58 147z'
				clipRule='evenodd'
			></path>
			<defs>
				<linearGradient
					id='paint0_linear_58_57'
					x1='46.931'
					x2='46.931'
					y1='147'
					y2='205.848'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#fff'></stop>
					<stop offset='1' stopColor='#F7F7F7'></stop>
				</linearGradient>
			</defs>
		</svg>
	)
}
