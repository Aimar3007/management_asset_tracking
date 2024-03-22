/* eslint-disable no-unused-vars */
import Modal from 'components/modal/modal.component'
import { IUseModal } from 'components/modal/modal.service'
import '../../purchase-order.style.css'
import { IPODetail } from '../purchase-order-detail.interface'
import moment from 'moment'

const CancelationReasonModal = ({
    modalService,
    data,
    componentDetail,
}: {
    modalService: IUseModal
    data: IPODetail
    componentDetail: () => JSX.Element | JSX.Element[]
}) => {
    const by = data.createBy
    const updatedAt = moment(data.updatedAt).format('MMM D, YYYY, HH:mm')
    return (
        <Modal isModalOpen={modalService.isModalOpen} className="!w-1/3 px-0">
            <div className="flex flex-col gap-4 ">
                <div className="font-bold px-4 flex   w-full ">
                    <div className="flex-1">
                        <span className="text-size-M">CANCELLATION REASON</span>
                    </div>
                    <div className="flex-end ">
                        <i
                            className="ri-close-line cursor-pointer"
                            onClick={() => {
                                modalService.closeModalHandling()
                            }}
                        />
                    </div>
                </div>
                <div className=" flex bg-white">
                    <div className="grid grid-cols-2 w-full justify-between ">
                        <div className="p-4 w-full text-left flex-1 flex flex-col gap-y-3  h-[394px] bg-opacity-40 overflow-auto border ">
                            <label className="font-bold">PO DETAILS</label>
                            {componentDetail()}
                        </div>
                        <div className="p-4 w-full text-left flex flex-col border ">
                            <div>
                                <label className="font-bold text-logistical-red-ver2">
                                    CANCELLATION DETAILS
                                </label>
                                <div className="grid grid-cols-2">
                                    <div>By User</div>
                                    <div>: JPL ({by})</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div>Date/Timestamp</div>
                                    <div>: {updatedAt}</div>
                                </div>
                            </div>
                            <div className="border rounded-logistical-radius-2 mt-4 flex-grow bg-logistical-red-ver2 bg-opacity-5 p-2">
                                {data.rejectedReason}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CancelationReasonModal
