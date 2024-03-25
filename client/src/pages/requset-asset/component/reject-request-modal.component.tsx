/* eslint-disable no-unused-vars */
import Button from 'components/button/button.component'
import Modal from 'components/modal/modal.component'
import { IUseModal } from 'components/modal/modal.service'
import Textarea from 'components/text-area/text-area.component'
import { useState } from 'react'
import {
    ITransactionAsset,
    IUpdateTransactionAssetPayload,
} from 'repository/interface/transaction-asset.interface'

const RejectRequestModal = ({
    modalService,
    onSubmit,
    data,
}: {
    modalService: IUseModal
    onSubmit: (data: IUpdateTransactionAssetPayload) => void

    data?: ITransactionAsset
}) => {
    const [reason, setReason] = useState<string>('')
    const message =
        data?.statusTransaction?.type === 'request'
            ? `Are you sure you want to reject the ${data.asset?.description} ${data.asset?.name} asset return request?`
            : `Are you sure you want to reject the ${data?.asset?.description} ${data?.asset?.name} asset loan request?`

    return (
        <Modal isModalOpen={modalService.isModalOpen} className="!w-1/3 !p-0">
            <div className="flex flex-col gap-4 justify-content">
                <div className="font-bold text-size-L px-4 pt-4">
                    REJECTION OF ASSET REQUESTS
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="text-logistical-gray-ver4 px-4 gap-x-2">
                    {message}
                    <div>
                        {/* <div className="font-bold mt-2">Reason</div>
                        <Textarea
                            className="h-[200px] w-full"
                            onChange={(e) => {
                                setReason(e.target.value)
                            }}
                        /> */}
                    </div>
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
                            variant="danger"
                            onClick={() => {
                                modalService.closeModalHandling()
                                onSubmit({
                                    id: data?.id as number,
                                    // reasonReject: reason,
                                    statusTransactionAssetId: 3,
                                })
                            }}
                            // isDisabled={reason.length === 0}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default RejectRequestModal
