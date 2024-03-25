/* eslint-disable no-unused-vars */
import Button from 'components/button/button.component'
import Modal from 'components/modal/modal.component'
import { IUseModal } from 'components/modal/modal.service'
import {
    ITransactionAsset,
    IUpdateTransactionAssetPayload,
} from 'repository/interface/transaction-asset.interface'

const ApproveRequestModal = ({
    modalService,
    onSubmit,
    data,
}: {
    modalService: IUseModal
    onSubmit: (data: IUpdateTransactionAssetPayload) => void
    data?: ITransactionAsset
}) => {
    const message =
        data?.statusTransaction?.type === 'request'
            ? `Are you sure you want to approve this ${data?.asset?.description} ${data?.asset?.name} asset loan request?`
            : `Are you sure you want to approve this ${data?.asset?.description} ${data?.asset?.name} asset return request?`

    return (
        <Modal isModalOpen={modalService.isModalOpen} className="!w-1/3 !p-0">
            <div className="flex flex-col gap-4 justify-content">
                <div className="font-bold text-size-L px-4 pt-4">
                    ASSET REQUEST APPROVAL
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="text-logistical-gray-ver4 px-4 gap-x-2">
                    {message}
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="flex justify-content px-4 pb-4">
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
                            variant="logistical-white"
                            onClick={() => {
                                modalService.closeModalHandling()
                                onSubmit({
                                    id: data?.id as number,
                                    statusTransactionAssetId: 2,
                                })
                            }}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ApproveRequestModal
