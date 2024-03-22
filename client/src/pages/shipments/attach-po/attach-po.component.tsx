/* eslint-disable @typescript-eslint/no-unused-vars */ /* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from 'components/button/button.component'
import LabelData from 'components/label-data/label-data.component'
import TableExpandable from 'components/table-expandable/table-expandable.component'
import { attachPOHeader, attachPoLineItemsHeaders } from './attach-po.static'
import { IPurchaseOrder } from 'pages/purchase-order/purchase-order.interface'
import { IPoLineItem } from 'pages/purchase-order/purchase-order-detail/purchase-order-detail.interface'
import useAttachPo, { setHelperSelectedPoModal } from './attach-po.services'
import AttachPoModal from '../modal/attach-po-modal.component'
import AttachPoLinesModal from '../modal/attach-po-lines-modal.component'
import DeletPoModal from '../modal/delete-po-modal.component'
import DeletPoLineModal from '../modal/delete-po-line-modal.component'
import { FormikProvider } from 'formik'
import Spinner from 'components/spinner/spinner.component'
import { useNavigate } from 'react-router-dom'

const AttachPo = () => {
    const navigate = useNavigate()
    const attachPoService = useAttachPo()
    const { shipmentDetailsData } = attachPoService
    const labelHeaderClass = 'text-size-XS text-logistical-gray-ver8'
    const customBorderBottom = (
        <div className="border-b -mx-4 border-b border-logistical-gray-ver7"></div>
    )
    const spinnerShow = attachPoService.loadingDetailData ? '' : 'hidden'
    const detailShow = !attachPoService.loadingDetailData
        ? 'opacity-100'
        : 'opacity-0'

    console.log('attachPoService.selectedPO', attachPoService.selectedPO)

    return (
        <>
            <div
                className={`${spinnerShow} flex w-full items-center justify-center content-full-height`}
            >
                <Spinner label="Please Wait..." />
            </div>
            <FormikProvider value={attachPoService.formik}>
                <div
                    className={`${detailShow} content-full-height flex sm:flex-wrap gap-4 sm:gap-y-2 sm:!h-[70vh] opacity-0 transition-opacity duration-500 `}
                >
                    <div className="container-global flex flex-col flex-initial w-[350px]  sm:w-[calc(100vw-1rem)]  sm:h-[70vh] sm:basis-full sm:w-full ">
                        {/* Shipment Attach Summary*/}
                        <div className="p-4 font-bold text-size-M  border-b border-logistical-gray-ver7">
                            SHIPMENT SUMMARY
                        </div>

                        <div className="p-4 text-left flex flex-col gap-y-4   overflow-auto  h-full">
                            <div className="font-bold text-size-S">
                                Shipment Information
                            </div>

                            <LabelData
                                data={attachPoService.id ?? '-'}
                                label={'Shipment ID'}
                                headerClass={labelHeaderClass}
                            />
                            <LabelData
                                data={shipmentDetailsData.consignee}
                                label={'Consignee'}
                                headerClass={labelHeaderClass}
                            />
                            <LabelData
                                data={shipmentDetailsData.carrier}
                                label={'Carrier'}
                                headerClass={labelHeaderClass}
                            />
                            <LabelData
                                data={shipmentDetailsData.shipper}
                                label={'Shipper'}
                                headerClass={labelHeaderClass}
                            />
                            {customBorderBottom}
                            <div className="font-bold text-size-S">
                                Origin & Destination
                            </div>
                            <div className="flex gap-3 justify-between">
                                <LabelData
                                    containerClass="flex-1"
                                    data={shipmentDetailsData.origin}
                                    subData=" - "
                                    label={'Origin'}
                                    headerClass={labelHeaderClass}
                                />
                                <div className="text-logistical-blue flex-initial flex items-center w-[30px] ">
                                    <i className="ri-arrow-right-line"></i>
                                </div>
                                <LabelData
                                    containerClass="flex-1"
                                    data={shipmentDetailsData.destination}
                                    subData=" - "
                                    label={'Destination'}
                                    headerClass={labelHeaderClass}
                                />
                            </div>
                            {customBorderBottom}
                            <div className="font-bold text-size-S">
                                Transportation Details
                            </div>
                            <div className="flex gap-3 justify-between">
                                <LabelData
                                    containerClass="flex-1"
                                    data={shipmentDetailsData.transport}
                                    label={'Transport Mode'}
                                    headerClass={labelHeaderClass}
                                />
                                <LabelData
                                    containerClass="flex-1"
                                    data={shipmentDetailsData.containerType}
                                    label={'Container Type'}
                                    headerClass={labelHeaderClass}
                                />
                            </div>
                            {customBorderBottom}
                            <div className="font-bold text-size-S">
                                Scheduling Information
                            </div>
                            <div className="flex gap-3 justify-between">
                                <LabelData
                                    containerClass="flex-1"
                                    data={shipmentDetailsData.etd}
                                    label={'ETD'}
                                    headerClass={labelHeaderClass}
                                />
                                <LabelData
                                    containerClass="flex-1"
                                    data={shipmentDetailsData.eta}
                                    label={'ETA'}
                                    headerClass={labelHeaderClass}
                                />
                            </div>

                            {customBorderBottom}
                            <div className="font-bold text-size-S">
                                Weight and Volume
                            </div>
                            <LabelData
                                containerClass="flex-1"
                                data={`${shipmentDetailsData.weight} ${shipmentDetailsData.uw}`}
                                label={'WEIGHT'}
                                headerClass={labelHeaderClass}
                            />
                            <LabelData
                                containerClass="flex-1"
                                data={`${shipmentDetailsData.volume} ${shipmentDetailsData.uv}`}
                                label={'Volume'}
                                headerClass={labelHeaderClass}
                            />
                        </div>
                    </div>

                    <div className="p-4 container-global  md:w-[calc(100vw-900px)] sm:w-[calc(100vw-2rem)] flex flex-grow flex-col sm:w-full overflow-auto">
                        {/* Table Attach PO */}
                        <div className="flex justify-between font-bold text-size-M pb-4">
                            ATTACH PURCHASE ORDERS
                            <Button
                                className={`w-btnSmallWidth `}
                                variant="logistical-lightblue-invert"
                                label="ATTACH PO"
                                type="button"
                                onClick={() => {
                                    attachPoService.attachPoModalService.openModalHandling()
                                }}
                            />
                        </div>
                        {customBorderBottom}
                        <div className="flex-grow py-4 overflow-auto">
                            <TableExpandable<IPurchaseOrder, IPoLineItem>
                                headerParent={attachPOHeader}
                                headerChild={attachPoLineItemsHeaders}
                                childAccessor="poLines"
                                data={attachPoService.selectedPO}
                                highlightOnExpand={false}
                                addChildRowHandling={(val) => {
                                    setHelperSelectedPoModal(val)
                                }}
                            />
                        </div>

                        {customBorderBottom}
                        <div className="p-4 pb-0 pl-0 flex justify-between">
                            <Button
                                className={`w-btnSmallWidth `}
                                label="Back"
                                type="button"
                                onClick={() => {
                                    navigate(
                                        '/shipments-detail/' +
                                            attachPoService.id,
                                    )
                                }}
                            />
                            <Button
                                className={`w-btnSmallWidth `}
                                label="SUBMIT PO"
                                variant="logistical-lightblue"
                                type="submit"
                                isLoading={attachPoService.submitLoading}
                                onClick={() => {
                                    attachPoService.formik.submitForm()
                                }}
                                isDisabled={
                                    attachPoService.selectedPO.length === 0 ||
                                    !attachPoService.selectedPO.every(
                                        (value) =>
                                            value.poLines &&
                                            value.poLines.length > 0,
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* modal*/}
                <AttachPoModal attachPoService={attachPoService} />
                <AttachPoLinesModal attachPoService={attachPoService} />
                <DeletPoModal attachPoService={attachPoService} />
                <DeletPoLineModal attachPoService={attachPoService} />
            </FormikProvider>
        </>
    )
}

export default AttachPo
