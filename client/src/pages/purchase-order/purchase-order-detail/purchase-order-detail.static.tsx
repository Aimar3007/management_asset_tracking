/* eslint-disable no-unused-vars */
import { IButtonPopupItem } from 'components/button-popup/button-popup.interface'
import CircleBadge from 'components/circle-badge/CircleBadge'
import ProgressBar from 'components/progress-bar/progress-bar.component'
import { ISTColumn } from 'components/simple-table/simple-table.interface'
import {
    IButtonStatusConfig,
    IPoLineItem,
    IPoShipment,
    ITrackerPo,
} from './purchase-order-detail.interface'
import { ITableColumn } from 'components/table/table.interface'
import { ToastProps } from 'components/toast/toast.interface'
import { formatCurrencyUsd, numberWithCommas } from 'common/common.service'

export const buttonAttached: IButtonPopupItem[] = [
    { icon: 'file-edit-line', label: 'New Shipment', onClick: () => {} },
    { icon: 'file-text-line', label: 'Existing Shipment', onClick: () => {} },
]

export const PODetailHeader: ITableColumn[] = [
    {
        label: 'Purchase Order No',
        accessor: 'poNo',
    },
    {
        label: 'Vendor',
        accessor: 'vendor',
    },
    // wait confirm from jpl
    // {
    //     label: 'Consignee',
    //     accessor: 'consignee',
    // },
    // {
    //     label: 'Shipper.',
    //     accessor: 'shippers[0]',
    // },
    {
        label: 'Supplier Contact',
        accessor: 'contactInfo',
        customBuild: (data, organization, customHandling) => {
            const value = data ?? (
                <div className="text-logistical-gray-ver3">NO CONTACT</div>
            )
            const isAbleEdit = organization === 'pan'
            const isAdd = data === '' || !data
            const val = isAdd ? 'NO CONTACT' : value
            const icon = isAdd ? 'ri-add-line' : 'ri-edit-line'
            const textColor = isAdd ? 'text-logistical-gray-ver3' : ''
            const textButton = isAdd ? 'ADD' : 'EDIT'

            return (
                <div>
                    <div className={`flex gap-4 justify-between ${textColor}`}>
                        {val}
                        {!isAbleEdit ? (
                            <></>
                        ) : (
                            <div
                                className="text-logistical-blue cursor-pointer -mt-[5px]"
                                onClick={() => {
                                    customHandling && customHandling()
                                }}
                            >
                                <i className={icon}></i> {textButton}
                            </div>
                        )}
                    </div>
                </div>
            )
        },
    },
    {
        label: 'Shipment in Progress',
        accessor: 'shipmentInProgress',
        customBuild: (data, x, y, rowData) => {
            let status
            switch (rowData?.status) {
                case 'Open':
                    status = 'WAITING FOR SHIPMENT'
                    break
                case 'In Progress':
                    if (parseInt(data) < 1) {
                        status = 'WAITING FOR SHIPMENT'
                    } else {
                        status = data + ' SHIPMENTS IN PROGRESS'
                    }
                    break
                case 'Canceled':
                    status = 'SHIPMENT CANCELED'
                    break
                case 'Closed':
                    status = 'SHIPMENT COMPLETED'
                    break
            }
            return <>{status}</>
        },
    },
    {
        label: 'Total Amount',
        accessor: 'totalAmount',
        customBuild: (data) => {
            return <div>{formatCurrencyUsd(data)}</div>
        },
    },
    {
        label: 'Total Qty',
        accessor: 'totalQty',
        customBuild: (data) => {
            return <div>{numberWithCommas(data)}</div>
        },
    },
    {
        label: 'Total Line Item',
        accessor: 'totalLineItem',
    },
    {
        label: 'Currency',
        accessor: 'currency',
    },
    {
        label: 'PO Date',
        accessor: 'poDate',
    },
    {
        label: 'Allocation Status',
        accessor: 'fillStatus',
    },
    {
        label: 'Last Updated',
        accessor: 'updatedAt',
    },
]

export const editPoLineItemsHeaders: ISTColumn<any>[] = [
    {
        accessor: 'lineId',
        label: 'Line no.',
        isTextValue: true,
    },
    {
        accessor: 'itemdesc',
        label: 'Item Desc',
        isTextValue: true,
    },
    {
        accessor: 'qtyPo',
        label: 'Qty',
        isTextValue: true,
        customBuild: (data) => {
            return <div>{numberWithCommas(data)}</div>
        },
    },
    {
        accessor: 'price',
        label: 'Price',
        customBuild: (data) => {
            return <div>${data}</div>
        },
        isTextValue: true,
    },
    {
        accessor: 'amount',
        label: 'Amount',
        isTextValue: true,
    },
    {
        accessor: 'colorcode',
        label: 'Color',
        isTextValue: true,
    },
    {
        accessor: 'shipment',
        label: 'Total Shipment',
        customBuild: (data, x, y, z, rowData) => {
            let className = ''
            let status = ''
            const { poShipments } = rowData as IPoLineItem
            const totalShipment = poShipments?.length ?? 0
            const totalCompletedShipment = poShipments.filter((data) => {
                return data.isConfirmed === true
            }).length
            const isAllShipmentCompleted =
                totalCompletedShipment === totalShipment && totalShipment !== 0
            if (isAllShipmentCompleted) {
                className = 'text-logistical-dark-green'
                status = `Shipment(s) completed`
            } else if (totalShipment > 0) {
                className = 'text-logistical-blue'
                status = `${totalShipment} Shipment in progress`
            } else {
                className = 'text-logistical-yellow'
                status = 'Waiting for Shipment'
            }

            return <div className={className}>{status}</div>
        },
        isTextValue: true,
    },
]

export const poLineItemsHeaders: ISTColumn<IPoLineItem>[] = [
    {
        accessor: 'lineId',
        label: 'Line no.',
        isTextValue: true,
    },
    {
        accessor: 'itemdesc',
        label: 'Item Desc',
        isTextValue: true,
    },
    {
        accessor: 'qtyPo',
        label: 'Qty',
        isTextValue: true,
        customBuild: (data) => {
            const qty = data as string
            return <div>{numberWithCommas(qty)}</div>
        },
    },
    {
        accessor: 'price',
        label: 'Price',
        customBuild: (data) => {
            const qty = data as string
            return <div>${qty}</div>
        },
        isTextValue: true,
    },
    {
        accessor: 'amount',
        label: 'Amount',
        isTextValue: true,
    },
    {
        accessor: 'colorcode',
        label: 'Color',
        isTextValue: true,
    },
    {
        accessor: 'size',
        label: 'Size',
        isTextValue: true,
    },
    {
        accessor: 'matcontents',
        label: 'Material',
        isTextValue: true,
    },
    // {
    //     accessor: 'hsCode',
    //     label: 'HS Code',
    //     isTextValue: true,
    // },
    {
        accessor: 'unit',
        label: 'Unit',
        isTextValue: true,
    },

    {
        accessor: 'goodFromLabel',
        label: 'Good From',
        isTextValue: true,
    },
    {
        accessor: 'shipment',
        label: 'Total Shipment',
        customBuild: (data, x, y, z, rowData) => {
            let className = ''
            let status = ''
            const { poShipments } = rowData as IPoLineItem
            const totalShipment = poShipments?.length ?? 0

            const totalCompletedShipment = poShipments.filter((data) => {
                return data.isConfirmed === true
            }).length
            const isAllShipmentCompleted =
                totalCompletedShipment === totalShipment && totalShipment !== 0

            if (isAllShipmentCompleted) {
                className = 'text-logistical-dark-green'
                status = `Shipment(s) completed`
            } else if (totalShipment > 0) {
                className = 'text-logistical-blue'
                status = `${totalShipment} Shipment in progress`
            } else {
                className = 'text-logistical-yellow'
                status = 'Waiting for Shipment'
            }

            return <div className={className}>{status}</div>
        },
        isTextValue: true,
    },
    {
        accessor: 'shipment',
        label: 'shipment Item',
        customBuild: (data, x, y, z, rowData) => {
            const { poShipments, qtyPo } = rowData as IPoLineItem
            const tempPoShipmnets: IPoShipment[] = poShipments ?? []
            let qtyInShip = 0
            tempPoShipmnets.forEach((data) => {
                qtyInShip += data.qty
            })
            return (
                <div className="">
                    <ProgressBar
                        total={parseInt(qtyPo)}
                        current={qtyInShip}
                        icon="ri-ship-2-line"
                    />
                </div>
            )
        },
        customHeader: () => {
            return (
                <div className="flex items-center justify-center">
                    <CircleBadge variant="blue" className="mr-1" />{' '}
                    <span>Qty in Ship</span>
                    <CircleBadge variant="yellow" className="ml-3 mr-1" />
                    <span>Qty to Ship</span>
                </div>
            )
        },
        isTextValue: false,
    },
    // {
    //     accessor: 'shipment',
    //     label: 'Delivary Status',
    //     customBuild: (data) => {
    //         const { deliveryStatus, totalQty } = data
    //         return (
    //             <div className="">
    //                 <ProgressBar
    //                     total={totalQty}
    //                     current={deliveryStatus.received}
    //                     returned={deliveryStatus.returned}
    //                     variant="outline-green"
    //                     icon="ri-check-line"
    //                 />
    //             </div>
    //         )
    //     },
    //     customHeader: () => {
    //         return (
    //             <div className="flex items-center justify-center">
    //                 <CircleBadge variant="green" className="mr-1" />{' '}
    //                 <span>Received</span>
    //                 <CircleBadge variant="red" className="ml-3 mr-1" />{' '}
    //                 <span>Returned</span>
    //             </div>
    //         )
    //     },
    //     isTextValue: false,
    // },
]

export const poChangesHistoryHeader: ITableColumn[] = [
    {
        label: 'Purchase Order No.',
        accessor: 'po_number',
    },
    {
        label: 'Vendor',
        accessor: 'vendor',
    },
    {
        label: 'Status',
        accessor: 'allocationStatus',
    },
]

export const trackerPoHistory: ITrackerPo[] = [
    {
        statusPo: 'PO CREATED',
        description: 'NEW PURCHASE ORDER NO 1233556677',
        user: 'PAN (USER A)',
        date: 'Dec 3, 2023, 07:00',
    },
    {
        statusPo: 'PO PROCESS UPDATED',
        description: 'PURCHASE ORDER IS IN PROGRESS',
        user: 'Jpl (Admin C)',
        date: 'Dec 4, 2023, 07:00',
    },
]

export const headerTrackerPoHistory: ITableColumn[] = [
    {
        accessor: 'user',
        label: 'By User',
    },
    {
        accessor: 'date',
        label: 'Date/Timestamp',
    },
]

export const buttonStatusConfigInitial: IButtonStatusConfig = {
    label: 'undefined',
    isButtonVisible: false,
}

export const toastOption: ToastProps = {
    header: '',
    message: '',
    type: 'default',
}
