import Modal from 'components/modal/modal.component'
import { IUseModal } from 'components/modal/modal.service'
import Button from 'components/button/button.component'
import { IPurchaseOrder } from 'pages/purchase-order/purchase-order.interface'

const PoBulkUpdateModal = ({
    modalService,
    onSubmit,
    data,
}: {
    modalService: IUseModal
    onSubmit: () => void
    data: IPurchaseOrder[]
}) => {
    return (
        //for PAN
        <Modal isModalOpen={modalService.isModalOpen} className="!w-1/3">
            <div className="flex flex-col gap-4 justify-content">
                <div className="font-bold text-size-L">
                    RE-OPEN {data?.length} PO
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="text-logistical-gray-ver4 flex gap-x-2">
                    <div className="w-1/2">
                        Are you sure you want to reopen in total {data?.length}{' '}
                        Purchase Orders?
                    </div>
                    <div className="flex-grow grid gap-y-2 bg-logistical-blue-ver6 p-2 overflow-auto max-h-[calc(100vh-358px)]">
                        <div>Purchase Order No. </div>
                        {data.map((x: any) => (
                            <div>{x?.poNo}</div>
                        ))}
                    </div>
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="flex justify-content ">
                    <div className="flex-grow">
                        <Button
                            label="BACK"
                            variant="logistical-white"
                            onClick={() => {
                                modalService.closeModalHandling()
                            }}
                        />
                    </div>
                    <div>
                        <Button
                            label="YES"
                            variant="logistical-lightblue"
                            onClick={() => {
                                modalService.closeModalHandling()
                                onSubmit()
                            }}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default PoBulkUpdateModal
