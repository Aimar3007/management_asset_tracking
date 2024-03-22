import Modal from 'components/modal/modal.component'
import { IPODetail } from '../purchase-order-detail.interface'
import { IUseModal } from 'components/modal/modal.service'
import Button from 'components/button/button.component'

const UpdatePOStatusModal = ({
    modalService,
    data,
    onSubmit,
    organization,
}: {
    organization: string
    data: IPODetail
    modalService: IUseModal
    onSubmit: () => void
}) => {
    const statusPO = data.status

    const getMessage = () => {
        if (statusPO === 'Open' && organization === 'jpl')
            return 'Are you sure you want to proceed with this Purchase Order? \nOnce confirmed, the order will be marked as ready for shipment (In Progress)'
        if (statusPO === 'In Progress' && organization === 'jpl')
            return "Are you sure you want to change the status of this Purchase Order back to 'Open'?"
        if (statusPO === 'In Progress' && organization === 'pan')
            return "Are you sure you want to change the status of this Purchase Order to 'Close'?"
        if (statusPO === 'Canceled' && organization === 'pan')
            return "Are you sure you want to change the status of this Purchase Order back to 'Open'?"
    }

    const getBtnConfirmationText = () => {
        if (statusPO === 'Open' && organization === 'jpl') return 'UPDATE PO'
        if (statusPO === 'In Progress' && organization === 'jpl')
            return 'RE-OPEN PO'
        if (statusPO === 'In Progress' && organization === 'pan')
            return 'CLOSE PO'
        if (statusPO === 'Canceled' && organization === 'pan')
            return 'RE-OPEN PO'
    }

    return (
        //for JPL
        <Modal isModalOpen={modalService.isModalOpen} className="!w-1/3">
            <div className="flex flex-col gap-4 justify-content">
                <div className="font-bold text-size-L">
                    UPDATE STATUS PURCHASE ORDER NO {data.poNo}
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="text-logistical-gray-ver4 whitespace-pre-wrap">
                    {getMessage()}
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="flex justify-content gap-4">
                    <div className="w-full">
                        <Button
                            label="CANCEL"
                            variant="logistical-white"
                            onClick={() => {
                                modalService.closeModalHandling()
                            }}
                            className="w-full"
                        />
                    </div>
                    <div className="w-full">
                        <Button
                            label={getBtnConfirmationText()}
                            variant="logistical-lightblue"
                            onClick={() => {
                                modalService.closeModalHandling()
                                onSubmit()
                            }}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default UpdatePOStatusModal
