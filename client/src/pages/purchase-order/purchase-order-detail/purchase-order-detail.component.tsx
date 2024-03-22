/* eslint-disable no-unused-vars */
import '../purchase-order.style.css'
import Button from 'components/button/button.component'
import SimpleTable from 'components/simple-table/simple-table.component'
import { usePODetail } from './purchase-order-detail.service'
import { IPoLineItem } from './purchase-order-detail.interface'
import Pagination from 'components/pagination/pagination.component'
import './purchase-order-detail.style.css'
import StatusCard from 'components/status-card/status-card.component'
import PoHistoryModal from './modal/po-history-modal.component'
import { useNavigate } from 'react-router-dom'
import UpdatePOStatusModal from './modal/update-po-confirmation.component'
import CancelationInputModal from './modal/cancelation-input-po.components'
import CancelationReasonModal from './modal/cancelation-reason-po.components'
import { Toast } from 'components/toast/toast.component'
import Spinner from 'components/spinner/spinner.component'
import { FormikProvider } from 'formik'
import FormDropdown from 'components/form-dropdown/form-dropdown.component'
import EditModalSupplierModal from './modal/edit-supplier-modal.component'

const PurchaseOrderDetail = () => {
    const navigate = useNavigate()
    const {
        poDetailData,
        loadingDetailData,
        poHistoryModalService,
        poHistoryError,
        poStatusModalService,
        loadingHistoryData,
        poHistoryData,
        buttonStatus,
        organization,
        poCancelInputModalService,
        poCancelodalService,
        poLinesData,
        poLinesMeta,
        headerLineItems,
        formik,
        user,
        isEditLineItems,
        countryList,
        toast,
        formikContactSupplier,
        editContactSupplierModalService,
        loadingUpdatePoLine,
        loadingLineData,
        getComponentDetail,
        changeStatus,
        setIsEditLineItems,
        chageFromGoodsAll,
    } = usePODetail()
    const spinnerShow = loadingDetailData ? '' : 'hidden'
    const detailShow = !loadingDetailData ? 'opacity-100' : 'opacity-0'
    const editLineItemButton = () => {
        if (!isEditLineItems) {
            return (
                <Button
                    onClick={() => {
                        setIsEditLineItems(true)
                    }}
                    label="Edit Line Items"
                    useUpperCase={true}
                    className="w-[180px] font-bold"
                    icon="ri-edit-2-line"
                />
            )
        } else {
            return (
                <div className="flex gap-3">
                    <div className="flex items-center  ">
                        <FormDropdown
                            key={'change-all'}
                            parentDivClassName="w-[200px] !mb-0 "
                            options={countryList}
                            name={`data-header`}
                            dropDownIndicator={true}
                            isSearchable={true}
                            onClick={(value: any) => {
                                chageFromGoodsAll(value)
                            }}
                        />
                    </div>
                    <Button
                        onClick={() => {
                            formik.handleSubmit()
                        }}
                        isLoading={loadingUpdatePoLine}
                        label="save"
                        useUpperCase={true}
                        className="w-[180px]"
                        icon="ri-save-line"
                        variant="logistical-lightblue"
                    />
                    <Button
                        onClick={() => {
                            setIsEditLineItems(false)
                        }}
                        useUpperCase={true}
                        className="font-bold"
                        icon="ri-close-line"
                    />
                </div>
            )
        }
    }
    return (
        <>
            <div
                className={`${spinnerShow} flex w-full items-center justify-center content-full-height`}
            >
                <Spinner label="Please Wait..." />
            </div>
            <div
                className={`${detailShow} flex flex-wrap gap-x-4 sm:gap-y-2 h-[calc(100vh-131px)] purchase-order-detail opacity-0 transition-opacity duration-500 `}
            >
                {/* Flex 1 */}
                <div className="flex-initial min-w-[250px]  sm:w-[calc(100vw-1rem)] flex bg-white container-border container-global">
                    <div className="w-full h-full flex flex-col justify-between">
                        <div>
                            <div className="font-bold p-4 border-b border-gray-400 text-size-L">
                                {loadingDetailData ? (
                                    'Loading Data'
                                ) : (
                                    <>
                                        PO-{poDetailData.poNo}{' '}
                                        <StatusCard
                                            status={poDetailData.status}
                                        />
                                    </>
                                )}
                            </div>

                            <div className=" p-4 text-left flex flex-col gap-y-4 h-[calc(100vh-255px)] overflow-auto">
                                {getComponentDetail()}
                                <div
                                    className="text-logistical-blue cursor-pointer"
                                    onClick={() => {
                                        poHistoryModalService.openModalHandling()
                                    }}
                                >
                                    VIEW PO HISTORY
                                </div>
                            </div>
                        </div>

                        <div className="p-4 flex justify-between text-size-L border-t border-gray-400">
                            <Button
                                label="BACK"
                                onClick={() => {
                                    navigate('/purchase-order')
                                }}
                            />
                            {!buttonStatus.isButtonVisible ? null : (
                                <Button
                                    label={buttonStatus.label}
                                    onClick={() => {
                                        buttonStatus.onClick &&
                                            buttonStatus.onClick()
                                    }}
                                    variant={buttonStatus.variant}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-grow flex md:gap-y-4 gap-x-4 md:w-[calc(100vw-900px)]  sm:w-[calc(100vw-1rem)]  bg-white container-border p-4 container-global">
                    {/* Flex 2.1 */}
                    <div className="flex flex-grow flex-col justify-between border rounded border-logistical-gray-ver7 overflow-auto h-[calc(100vh-151px)]">
                        <FormikProvider value={formik}>
                            <div className="p-4 font-normal text-size-L border-b border-logistical-gray-ver7 flex justify-between">
                                <div>Line Items</div>
                                <div>
                                    {user.organizationCode === 'jpl' ? (
                                        <></>
                                    ) : (
                                        editLineItemButton()
                                    )}
                                </div>
                            </div>
                            <div className="h-full overflow-auto">
                                <SimpleTable<IPoLineItem>
                                    data={poLinesData || []}
                                    headers={headerLineItems}
                                    loading={loadingLineData}
                                />
                            </div>
                            <div className="border-t border-logistical-gray-ver3 flex justify-between">
                                <Pagination
                                    meta={poLinesMeta}
                                    previousHandling={(page) => {
                                        console.log('hit prev API -> ' + page)
                                    }}
                                    nextHandling={(page) => {
                                        console.log('hit Next API -> ' + page)
                                    }}
                                />
                            </div>
                        </FormikProvider>
                    </div>
                </div>

                {/* Modal Section */}
                <PoHistoryModal
                    modalService={poHistoryModalService}
                    componentDetail={getComponentDetail}
                    status={poDetailData.status}
                    isLoading={loadingHistoryData}
                    errorMessage={poHistoryError}
                    data={poHistoryData}
                />

                <UpdatePOStatusModal
                    data={poDetailData}
                    modalService={poStatusModalService}
                    onSubmit={() => {
                        changeStatus()
                        if (toast) Toast(toast)
                    }}
                    organization={organization}
                />

                <CancelationInputModal
                    componentDetail={getComponentDetail}
                    data={poDetailData}
                    modalService={poCancelInputModalService}
                    onSubmit={(val) => {
                        console.log(val)

                        changeStatus(val)
                        if (toast) Toast(toast)
                    }}
                />

                <CancelationReasonModal
                    componentDetail={getComponentDetail}
                    data={poDetailData}
                    modalService={poCancelodalService}
                />
                <EditModalSupplierModal
                    formik={formikContactSupplier}
                    modalService={editContactSupplierModalService}
                />
            </div>
        </>
    )
}

export default PurchaseOrderDetail
