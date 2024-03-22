/* eslint-disable no-unused-vars */
import StatusCard from 'components/status-card/status-card.component'
import Button from 'components/button/button.component'
import { useShipmentDetails } from './shipments-details.service'
import { contentShipDetailHeader } from './shipments-details.static'
import Tab from 'components/tab/tab.component'
import Spinner from 'components/spinner/spinner.component'
import EditSupplierInvoice from './components/edit-supplier-modal.component'

const ShipmentDetails = () => {
    const {
        getContentShipmentDetails,
        setTabFilter,
        navigate,
        shipmentDetailsData,
        buttonAction1,
        loadingDetailData,
        buttonAction2,
        tabFilter,
        supplierInvoiceModalService,
        formikInvoiceNumber,
    } = useShipmentDetails()

    const spinnerShow = loadingDetailData ? '' : 'hidden'
    const detailShow = !loadingDetailData ? 'opacity-100' : 'opacity-0'
    const status =
        shipmentDetailsData.shipmentStatus === 'Confirmed'
            ? 'Confirmed'
            : 'In Progress'

    return (
        <div className="shipment-detail">
            <div
                className={`${spinnerShow} flex w-full items-center justify-center content-full-height`}
            >
                <Spinner label="Please Wait..." />
            </div>
            <div
                className={`${detailShow} container-global content-full-height sm:overflow-auto overflow-hidden`}
            >
                <div className="px-3 py-4">
                    SHIPMENT DETAILS {shipmentDetailsData?.shipmentID}{' '}
                    <StatusCard status={status} />
                </div>
                <div className="border-b border-solid border-logistical-gray-ver3"></div>
                <Tab
                    containerClassName="px-3 pt-3 overflow-auto"
                    items={contentShipDetailHeader ?? []}
                    tabFilter={tabFilter}
                    onChange={(item) => setTabFilter(item)}
                />
                <div className="border-b border-solid border-logistical-gray-ver3"></div>
                <div className="p-3 h-[calc(100vh-17rem)] flex">
                    <div className=" w-full">
                        {getContentShipmentDetails(tabFilter)}
                    </div>
                </div>
                <div className="border-b border-solid border-logistical-gray-ver3"></div>
                <div className="flex justify-between p-3">
                    <Button
                        label="Back"
                        variant="logistical-white"
                        className="w-btnRegularWidth"
                        onClick={() => navigate('/shipments')}
                    />
                    <div className="flex gap-x-3">
                        {buttonAction1 && (
                            <Button
                                label={buttonAction1?.label}
                                variant={buttonAction1?.variant}
                                onClick={buttonAction1?.onClick}
                                className="w-btnRegularWidth"
                            />
                        )}
                        {buttonAction2 && (
                            <Button
                                label={buttonAction2?.label}
                                variant={buttonAction2?.variant}
                                onClick={buttonAction2?.onClick}
                                className="w-btnRegularWidth"
                            />
                        )}
                    </div>
                </div>
            </div>
            <EditSupplierInvoice
                formik={formikInvoiceNumber}
                modalService={supplierInvoiceModalService}
            />
        </div>
    )
}

export default ShipmentDetails
