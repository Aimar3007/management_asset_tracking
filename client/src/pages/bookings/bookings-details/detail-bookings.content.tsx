import { ITabContentItem } from 'components/tab-content/tab-content.interface'
import TabContent from 'components/tab-content/tab-content.component'
import DetailsContent from './content/details.component'
import AdditionalInformation from './content/additional-information.component'
import MilestonesContent from './content/milestones.component'
import GoodsContent from './content/goods.component'
import ReferenceNoContent from './content/reference.component'
import DocumentationContent from './content/documentation.component'

export const useContent = () => {
    const items: ITabContentItem[] = [
        {
            label: '1. Details',
            accessor: DetailsContent(),
        },
        {
            label: '2. Additional Information',
            accessor: AdditionalInformation(),
        },
        {
            label: '3. Milestones',
            accessor: MilestonesContent(),
        },
        {
            label: '4. Goods/Packs',
            accessor: GoodsContent(),
        },
        {
            label: '5. Reference No.',
            accessor: ReferenceNoContent(),
        },
        {
            label: '6. Documentation',
            accessor: DocumentationContent(),
        },
    ]

    return (
        <div className="p-4">
            <TabContent items={items} />
        </div>
    )
}
