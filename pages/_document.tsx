import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<meta charSet='utf-8' />
				<link rel='icon' type='image/png' href='/images/favicon.png' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover'
				/>
				<meta
					name='theme-color'
					content='#18181b'
					media='(prefers-color-scheme: dark)'
				/>
				<meta name='theme-color' content='#f4f4f5' />
				<link rel='apple-touch-icon' href='/images/icon-maskable-512.png' />
				<link rel='manifest' href='/manifest.json' />

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
				<meta
					property='og:image'
					content={`https://www.yenny.app/images/opengraph.png'`}
				/>
				<meta name='twitter:card' content='summary_large_image' />
				<meta property='twitter:domain' content='yenny.app' />
				<meta property='twitter:url' content='https://www.yenny.app/' />
				<meta name='twitter:title' content='Yenny | Japanese Yen Converter' />
				<meta
					name='twitter:description'
					content='Yenny is a Japanese Yen (JPY) converter that can convert Japanese Yen to the US Dollar (USD), Euros (EUR), Great British Pound (GPB), and any other currency.'
				/>
				<meta
					name='twitter:image'
					content={`https://www.yenny.app/images/opengraph.png'`}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
