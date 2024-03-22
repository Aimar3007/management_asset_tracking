import Modal from 'components/modal/modal.component'
import { IUseAttachPO } from '../attach-po/attach-po.interface'
import { useSelector } from 'react-redux'
import {
    removeSelectedPoLine,
    selectedPoLineIdDeleteHelperSelector,
    setHelperDeletePoLine,
} from '../attach-po/attach-po.slice'
import Button from 'components/button/button.component'
import { useDispatch } from 'react-redux'

const DeletPoLineModal = ({
    attachPoService,
}: {
    attachPoService: IUseAttachPO
}) => {
    const dispatch = useDispatch()
    const poLineSelected = useSelector(selectedPoLineIdDeleteHelperSelector)
    const modalService = attachPoService.deletePoLineModalService

    return (
        <Modal isModalOpen={modalService.isModalOpen} className="!w-1/3">
            <div className="flex flex-col gap-4 justify-content">
                <div className="font-bold text-size-L">
                    REMOVE LINE ITEM NO {poLineSelected?.lineId} (PO{' '}
                    {poLineSelected?.poNo})
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="text-logistical-gray-ver4">
                    Are you sure you want to remove Line Item no{' '}
                    {poLineSelected?.lineId}?
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="flex justify-content ">
                    <div className="flex-grow">
                        <Button
                            label="Cancel"
                            variant="logistical-white"
                            onClick={() => {
                                modalService.closeModalHandling()
                                dispatch(setHelperDeletePoLine(undefined))
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
                                    removeSelectedPoLine({
                                        setFormik:
                                            attachPoService.setFormikValues,
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

export default DeletPoLineModal
