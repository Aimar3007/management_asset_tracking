import Button from 'components/button/button.component'
import Modal from 'components/modal/modal.component'
import { IUseModal } from 'components/modal/modal.service'
import Textarea from 'components/text-area/text-area.component'

const RequestAssetModal = ({
    modalService,
    onSubmit,
    description,
    isDisabled,
    setReason,
}: {
    modalService: IUseModal
    onSubmit: () => void
    description: string
    isDisabled: boolean
    setReason: React.Dispatch<React.SetStateAction<string>>
}) => {
    return (
        <Modal isModalOpen={modalService.isModalOpen} className="!w-1/3 !p-0">
            <div className="flex flex-col gap-4 justify-content">
                <div className="font-bold text-size-L px-4 pt-4">
                    REQUEST ASSET
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="text-logistical-gray-ver4 px-4 gap-x-2">
                    Are you sure you want to request borrowing{' '}
                    <span className="font-bold">{description}</span> ? Please
                    provide a reason for requesting the item in the input field
                    below.
                    <div>
                        <div className="font-bold mt-2">Reason</div>
                        <Textarea
                            className="h-[200px] w-full"
                            onChange={(e) => {
                                setReason(e.target.value)
                            }}
                        />
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
                            label="REQUEST ASSET"
                            variant="logistical-lightblue"
                            onClick={() => {
                                modalService.closeModalHandling()
                                onSubmit()
                            }}
                            isDisabled={isDisabled}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default RequestAssetModal
