import { Converter } from '@/components/converter/converter'
import { HistoricalCurrencyChart } from '@/components/historical-currency-chart/historical-currency-chart'
import Page from '@/components/page'
import { RenderOnHydrate } from '@/components/render-on-hydrate'

const Index = () => (
	<RenderOnHydrate>
		<Page title='Yen Converter'>
			<section className='flex flex-col space-y-8'>
				<Converter />
				<HistoricalCurrencyChart />
			</section>
		</Page>
	</RenderOnHydrate>
)

export default Index
