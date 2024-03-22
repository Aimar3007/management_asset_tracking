/* eslint-disable no-unused-vars */
import { IUseModal } from 'components/modal/modal.service'
import { eDocumentationHeader } from '../shipments-details.static'
import SimpleTable from 'components/simple-table/simple-table.component'
import { IEDocumentationDetails } from 'pages/shipments/shipments.interface'

const EDocumentation = ({
    modalComponent,
    modalService,
    data,
    downloadEdcos,
}: {
    modalComponent: JSX.Element
    modalService: IUseModal
    data: IEDocumentationDetails[]
    downloadEdcos: (nameFile: string, shipmentId: string) => void
}) => {
    return (
        <>
            <SimpleTable<IEDocumentationDetails>
                headers={eDocumentationHeader}
                data={data || []}
                variant="gray"
                isRemoveRow={true}
                isAddRow={true}
                addRowClick={() => {
                    modalService.openModalHandling()
                }}
                enableActionButton={true}
                onClickAcitonButton={downloadEdcos}
                loading={false}
            />
            {modalComponent}
        </>
    )
}

export default EDocumentation
