import { Converter } from '@/components/converter/converter'
import { HistoricalCurrencyChart } from '@/components/historical-currency-chart/historical-currency-chart'
import Page from '@/components/page'
import { RenderOnHydrate } from '@/components/render-on-hydrate'

const Index = () => (
	<>
		<h1 className='w-[1px] h-[1px] overflow-clip absolute'>
			Convert any currency to Japanese Yen with beautiful currency converter |
			Yenny
		</h1>
		<RenderOnHydrate>
			<Page title='Yen Converter'>
				<section className='flex flex-col space-y-8'>
					<Converter />
					<HistoricalCurrencyChart />
				</section>
			</Page>
		</RenderOnHydrate>
	</>
)

export default Index
