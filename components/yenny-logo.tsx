import React, { SVGProps } from 'react'

export function YennyLogo(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='96'
			height='182'
			fill='none'
			viewBox='0 0 96 182'
			{...props}
		>
			<circle cx='48' cy='16.5' r='16.5' fill='#fff'></circle>
			<path
				stroke='#fff'
				strokeLinecap='round'
				strokeWidth='22'
				d='M84.07 63H11.93M84.07 93H11.93'
			></path>
			<path
				fill='url(#paint0_linear_48_209)'
				d='M61.629 123h-26.98L6.665 163.38c-1.954 2.932-2.834 5.814-2.638 8.648.097 2.834 1.172 5.179 3.224 7.035 2.052 1.857 4.935 2.785 8.648 2.785 2.931 0 5.472-.635 7.622-1.905 2.15-1.27 4.25-3.469 6.302-6.596l17.888-26.449 17.875 26.303c1.955 3.126 4.055 5.325 6.303 6.595 2.247 1.368 4.74 2.052 7.475 2.052 3.909 0 6.938-1.026 9.087-3.078 2.052-1.954 3.225-4.397 3.518-7.328.196-2.834-.537-5.423-2.198-7.769l-28.142-40.499V123z'
			></path>
			<defs>
				<linearGradient
					id='paint0_linear_48_209'
					x1='48'
					x2='48'
					y1='123'
					y2='181.848'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#fff'></stop>
					<stop offset='1' stopColor='#F7F7F7'></stop>
				</linearGradient>
			</defs>
		</svg>
	)
}
