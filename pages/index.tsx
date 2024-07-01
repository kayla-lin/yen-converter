import { Converter } from '@/components/converter/converter'
import Page from '@/components/page'
import { Separator } from '@/components/ui/separator'

const Index = () => (
	<Page title='Yen Converter'>
		<section className='flex flex-col space-y-8'>
			<Converter />
			<Separator />
		</section>
	</Page>
)

export default Index
