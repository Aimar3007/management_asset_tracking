/* eslint-disable no-unused-vars */
import Button from 'components/button/button.component'
import Modal from 'components/modal/modal.component'
import { IUseModal } from 'components/modal/modal.service'
import { ITransactionAsset } from 'repository/interface/transaction-asset.interface'

const TADModal = ({
    modalService,
    onSubmit,
    data,
    action,
}: {
    modalService: IUseModal
    onSubmit: (
        id: number,
        typeTransaction: string,
        statusTransaction: string,
    ) => void
    data: ITransactionAsset
    action: string
}) => {
    const getDetail = () => {
        let header: string = ''
        let message: string = ''
        let label: string = ''
        if (!data) return

        if (data?.statusTransaction?.type === 'pending') {
            if (action === 'edit') {
                if (data?.type?.type === 'request') {
                    label = 'YES, REMOVE'
                    header = 'REMOVE ASSET BORROWING REQUESTS'
                    message =
                        'Are you sure you want to delete the asset lending request?'
                } else {
                    header = 'REMOVE REQUESTS'
                    message =
                        'Are you sure you want to delete the asset return request?'
                }
            } else {
                if (data?.type?.type === 'request') {
                    header = 'ASSET BORROWING REQUESTS'
                    message =
                        'The asset loan request you submitted is currently in process. This process is estimated to take a maximum of 3 working days from date x.'
                } else {
                    header = 'ASSET RETURN REQUESTS'
                    message =
                        'Your requested return of assets is currently being processed. This process is estimated to take a maximum of 3 working days from date x.'
                }
            }
        } else if (data?.statusTransaction?.type === 'approve') {
            if (action === 'edit') {
                if (data?.type?.type === 'request') {
                    header = 'REQUEST FOR RETURN OF ASSETS'
                    message = `Are you sure you want to return ${data.asset?.name} ${data.asset?.description}?`
                    label = 'YES, RETURN IT'
                } else {
                    header = 'ASSET RETURN REQUESTS'
                    message =
                        'Your request for asset return has been approved. Please return the assets to the Asset Manager in your office.'
                }
            } else {
                if (data?.type?.type === 'request') {
                    header = 'ASSET BORROWING REQUESTS'
                    message =
                        'Your asset lending request has been approved. Asset handover will be carried out on January 19 2023 at your office.'
                } else {
                    header = 'ASSET RETURN REQUESTS'
                    message =
                        'Your request for asset return has been approved. Please return the assets to the Asset Manager in your office.'
                }
            }
        } else {
            if (data?.type?.type === 'request') {
                header = 'ASSET BORROWING REQUESTS'
                message =
                    'Sorry, we were unable to process your asset loan request. Please consult an Asset Manager.'
            } else {
                header = 'ASSET RETURN REQUESTS'
                message =
                    'Sorry, we were unable to process your asset return request. Please consult an Asset Manager.'
            }
        }
        return { header, message, label }
    }

    return (
        <Modal isModalOpen={modalService.isModalOpen} className="!w-1/3 !p-0">
            <div className="flex flex-col gap-4 justify-content">
                <div className="font-bold text-size-L px-4 pt-4">
                    {getDetail()?.header}
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="text-logistical-gray-ver4 px-4 gap-x-2">
                    {getDetail()?.message}
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
                    {getDetail()?.label && (
                        <div>
                            <Button
                                label={getDetail()?.label}
                                variant="danger"
                                onClick={() => {
                                    modalService.closeModalHandling()
                                    onSubmit(
                                        data?.id,
                                        data?.type?.type as string,
                                        data?.statusTransaction?.type as string,
                                    )
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    )
}

export default TADModal
