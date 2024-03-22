/* eslint-disable no-unused-vars */
import Button from 'components/button/button.component'
import Modal from 'components/modal/modal.component'
import { IUseModal } from 'components/modal/modal.service'
import { IPropertyUpdateStatus } from '../shipments-detail.interface'

const UpdateStatusShipmentModal = ({
    shipmentId,
    modalService,
    propertyUpdateStatus,
}: {
    shipmentId: string
    modalService: IUseModal
    propertyUpdateStatus: IPropertyUpdateStatus | null | undefined
}) => {
    return (
        <Modal
            isModalOpen={modalService.isModalOpen}
            className="!w-1/3 h-2/2 px-0"
        >
            <div className="flex flex-col gap-4 justify-content">
                <div className="font-bold text-size-L px-4 flex justify-between">
                    <div>
                        {propertyUpdateStatus?.action} No. {shipmentId}
                    </div>
                    <i
                        className="ri-close-fill cursor-pointer"
                        onClick={() => modalService.closeModalHandling()}
                    ></i>
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="text-logistical-gray-ver4 px-4 flex flex-col gap-y-4  w-full overflow-auto">
                    {propertyUpdateStatus?.message}
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="flex justify-between mx-3 gap-x-4 ">
                    <Button
                        label="CANCEL"
                        variant="logistical-white"
                        onClick={() => {
                            modalService.closeModalHandling()
                        }}
                        className="w-full"
                    />
                    <Button
                        label={`YES, ${propertyUpdateStatus?.action?.toUpperCase()}`}
                        variant="logistical-lightblue"
                        onClick={() => {
                            modalService.closeModalHandling()
                            propertyUpdateStatus?.onSubmit()
                        }}
                        className="w-full"
                    />
                </div>
            </div>
        </Modal>
    )
}

export default UpdateStatusShipmentModal
