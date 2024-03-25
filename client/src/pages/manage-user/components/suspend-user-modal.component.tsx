import Button from 'components/button/button.component'
import Modal from 'components/modal/modal.component'
import { IUseModal } from 'components/modal/modal.service'
import { IUser } from 'repository/interface/user.interface'

const ChangeStatusUserModal = ({
    modalService,
    data,
    onSubmit
}: {
    modalService: IUseModal
    data: IUser
    onSubmit: () => void
}) => {
    return (
        <Modal isModalOpen={modalService.isModalOpen} className="!w-1/3 !p-0">
            <div className="flex flex-col gap-4 justify-content">
                <div className="font-bold text-size-L px-4 pt-4">
                    SUSPEND USER
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="text-logistical-gray-ver4 px-4 gap-x-2">
                    Are you sure you want to suspend user {data.userName}?
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
                    <Button
                        label="YES"
                        variant="danger"
                        onClick={() => {
                            modalService.closeModalHandling()
                            onSubmit()
                        }}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default ChangeStatusUserModal
