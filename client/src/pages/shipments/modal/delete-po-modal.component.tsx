import Modal from 'components/modal/modal.component'
import { IUseAttachPO } from '../attach-po/attach-po.interface'
import { useSelector } from 'react-redux'
import {
    removeSelectedPo,
    selectedPoIdDeleteHelperSelector,
    setHelperDeletePo,
} from '../attach-po/attach-po.slice'
import Button from 'components/button/button.component'
import { useDispatch } from 'react-redux'

const DeletPoModal = ({
    attachPoService,
}: {
    attachPoService: IUseAttachPO
}) => {
    const dispatch = useDispatch()
    const poSelected = useSelector(selectedPoIdDeleteHelperSelector)
    const modalService = attachPoService.deletePoModalService
    return (
        <Modal isModalOpen={modalService.isModalOpen} className="!w-1/3">
            <div className="flex flex-col gap-4 justify-content">
                <div className="font-bold text-size-L">
                    REMOVE PO {poSelected?.poNo}
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="text-logistical-gray-ver4">
                    Are you sure you want to remove PO NO.{' '}
                    <b>{poSelected?.poNo}</b>? <br />
                    All attached line items will be also removed.
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="flex justify-content ">
                    <div className="flex-grow">
                        <Button
                            label="Cancel"
                            variant="logistical-white"
                            onClick={() => {
                                modalService.closeModalHandling()
                                dispatch(setHelperDeletePo(undefined))
                            }}
                        />
                    </div>
                    <div>
                        <Button
                            label="YES, REMOVE"
                            variant="danger-fill"
                            onClick={() => {
                                modalService.closeModalHandling()
                                dispatch(
                                    removeSelectedPo({
                                        removeAllLinesFormik:
                                            attachPoService.removeFormikAllLines,
                                    }),
                                )
                            }}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default DeletPoModal
