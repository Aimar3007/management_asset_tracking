/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from 'components/button/button.component'
import Modal from 'components/modal/modal.component'
import { IUseModal } from 'components/modal/modal.service'
import { useState } from 'react'
import '../../purchase-order.style.css'
import { IPODetail } from '../purchase-order-detail.interface'

const CancelationInputModal = ({
    modalService,
    componentDetail,
    onSubmit,
}: {
    data: IPODetail
    modalService: IUseModal
    componentDetail: () => JSX.Element | JSX.Element[]
    onSubmit: (val: string) => void
}) => {
    const [reason, setReason] = useState('')

    return (
        <Modal
            isModalOpen={modalService.isModalOpen}
            className="!w-1/2 px-0 h-[calc(100vh-4.5rem)]"
        >
            <div className="flex flex-col gap-4 justify-content">
                <div className="font-bold px-4 flex">
                    <span className="text-size-M">CANCEL PURCHASE ORDER</span>
                    <span className="text-logistical-dark-green  bg-logistical-green-ver3 rounded text-size-M ml-2 px-2">
                        OPEN
                    </span>
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="text-logistical-gray-ver4 px-4 flex gap-3 ">
                    Are you sure you want to cancel to process this Purchase
                    Order? <br />
                    Please check the PO Details before you type the reason.
                </div>
                <div className="mx-4 flex bg-white ">
                    <div className="flex w-full gap-4 justify-between h-[calc(100vh-19rem)] ">
                        <div className="p-4 w-full text-left flex-1 flex flex-col gap-y-3 bg-logistical-blue-ver6 bg-opacity-40 overflow-auto rounded-logistical-radius border border-logistical-blue-ver1">
                            <label className="text-logistical-blue font-bold">
                                PO DETAILS
                            </label>
                            {componentDetail()}
                        </div>

                        <div className="flex-1">
                            <textarea
                                className="p-4 border rounded w-full h-full"
                                rows={15}
                                cols={30}
                                placeholder="Cancellation reasons..."
                                onChange={(e) => {
                                    setReason(e.target.value)
                                }}
                                value={reason}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="flex px-4 gap-2">
                    <Button
                        label="BACK"
                        className="w-1/3"
                        onClick={() => {
                            modalService.closeModalHandling()
                        }}
                    />
                    <div className="flex-grow"></div>
                    <Button
                        variant="danger"
                        label="CANCEL PO"
                        className="w-2/5"
                        onClick={() => {
                            modalService.toggleModalHandling()
                            onSubmit(reason)
                            setReason('')
                        }}
                        isDisabled={reason ? false : true}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default CancelationInputModal
