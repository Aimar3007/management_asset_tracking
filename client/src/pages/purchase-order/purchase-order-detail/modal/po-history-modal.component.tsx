import Modal from 'components/modal/modal.component'
import { IUseModal } from 'components/modal/modal.service'
import Tracker from 'components/tracker/tracker.component'
import { headerTrackerPoHistory } from '../purchase-order-detail.static'
import StatusCard from 'components/status-card/status-card.component'
import { IHistories } from '../purchase-order-detail.interface'

const PoHistoryModal = ({
    modalService,
    status,
    componentDetail,
    errorMessage,
    isLoading,
    data,
}: {
    data: IHistories[]
    errorMessage: string | null
    modalService: IUseModal
    isLoading: boolean
    status: string
    componentDetail: () => JSX.Element | JSX.Element[]
}) => {
    return (
        <Modal
            isModalOpen={modalService.isModalOpen}
            className="!w-1/2 h-2/2 px-0"
        >
            <div className="flex flex-col gap-4 justify-content">
                <div className="font-bold text-size-L px-4 flex justify-between">
                    <div>PO CHANGES HISTORY</div>
                    <i
                        className="ri-close-fill cursor-pointer"
                        onClick={() => modalService.closeModalHandling()}
                    ></i>
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="text-logistical-gray-ver4 px-4 flex gap-3 h-[calc(100vh-405px)] ">
                    <div className=" px-3 w-full flex flex-col gap-y-2 overflow-auto">
                        <div className="my-2">
                            <StatusCard status={status} />
                        </div>
                        {componentDetail()}
                    </div>
                    <div className="w-full">
                        {errorMessage ? <div>{errorMessage}</div> : <></>}
                        {!errorMessage ? (
                            <Tracker
                                statusIcon={''}
                                data={data}
                                headers={headerTrackerPoHistory}
                                bgColor="blue"
                                isLoading={isLoading}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default PoHistoryModal
