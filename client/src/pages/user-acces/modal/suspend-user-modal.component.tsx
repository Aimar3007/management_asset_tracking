import Modal from 'components/modal/modal.component'
import { IUseModal } from 'components/modal/modal.service'
import Button from 'components/button/button.component'
import { IUserDetail } from 'repository/data/user.interface'

const SuspendUserModal = ({
    isActive,
    modalService,
    data,
    onSubmit,
}: {
    isActive: boolean
    data: IUserDetail | undefined
    modalService: IUseModal
    onSubmit: () => void
}) => {
    const label = !isActive ? 'Unsuspend User' : 'Suspend User'
    const subs = !isActive ? 'unsuspend' : 'suspend'
    return (
        //for JPL
        <Modal isModalOpen={modalService.isModalOpen} className="!w-1/3">
            <div className="flex flex-col gap-4 justify-content">
                <div className="font-bold text-size-L">{label}</div>
                <div className="border-b border-gray-40"></div>
                <div className="text-logistical-gray-ver4">
                    Are you sure want to {subs} user `{data?.fullName ?? '-'}` ?
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

export default SuspendUserModal
