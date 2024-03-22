import Button from 'components/button/button.component'
import ProgressBar from 'components/progress-bar/progress-bar.component'
import CircleColor from 'components/square-color/square-color'
import { ITableColumn } from 'components/table/table.interface'
import { IPoLineItem } from 'pages/purchase-order/purchase-order-detail/purchase-order-detail.interface'
import { IPurchaseOrder } from 'pages/purchase-order/purchase-order.interface'
import {
    removePo,
    removePoLine,
    setHelperSelectedPoModal,
} from './attach-po.services'
import CircleBadge from 'components/circle-badge/CircleBadge'
import FormInput from 'components/form-input/form-input.component'

export const attachPOHeader: ITableColumn<IPurchaseOrder>[] = [
    {
        label: 'Purchase No.',
        accessor: 'poNo',
        width: 20,
        className: 'w-full',
        customBuild: (data, rowData) => {
            const status = rowData?.status
            let classs = 'mr-2 '
            switch (status) {
                case 'Open':
                    classs += 'bg-logistical-green'
                    break
                case 'In Progress':
                    classs += 'bg-logistical-yellow'
                    break
                case 'Canceled':
                    classs += 'bg-logistical-red-ver2'
                    break
                case 'Closed':
                    classs += 'bg-logistical-gray-ver3'
                    break
            }

            return (
                <>
                    <CircleColor colorClass={classs} /> <div>{data}</div>
                </>
            )
        },
    },
    {
        label: 'Vendor',
        accessor: 'vendor',
        width: 170,
        ellipsis: true,
    },
    // wait confirm from jpl
    // {
    //     label: 'Consignee',
    //     accessor: 'consignee',
    //     width: 10,
    // },
    // {
    //     label: 'Shipper',
    //     accessor: 'shippers[0]',
    //     width: 10,
    // },
    {
        label: 'PO Date',
        width: 80,
        accessor: 'poDate',
    },
    {
        label: 'Allocation Status',
        accessor: 'fillStatus',
        width: 130,
    },
    {
        label: 'Total Qty',
        accessor: 'totalQty',
        className: 'flex justify-end',
        headerClassName: 'flex justify-end',
        width: 10,
        customBuild: (data) => {
            return <>{data}</>
        },
    },
    {
        label: 'space',
        accessor: 'null',
        showLabel: false,
        customBuild: () => {
            return <></>
        },
    },
    // Waiting for Backend
    // {
    //     label: 'Total Line Item',
    //     accessor: 'totalLineItem',
    // },
    {
        label: 'Action',
        accessor: 'action',
        headerClassName: 'flex justify-center',
        className: 'flex justify-center',
        width: 200,
        customBuild: (data, rowData) => {
            const id = rowData?.id
            if (!id) return <></>
            return (
                <div className="flex gap-2 -mt-[5px]">
                    <Button
                        onClick={() => {
                            removePo(rowData)
                        }}
                        style={{ height: '100%' }}
                        className="!p-0 !h-[30px] !w-[50px] "
                        variant="danger"
                        iconClassName="text-logistical-red-ver1"
                        icon="ri-delete-bin-line ri-1x"
                    />
                    <Button
                        onClick={() => {
                            setHelperSelectedPoModal(id)
                        }}
                        style={{ height: '100%' }}
                        iconClassName="text-logistical-blue"
                        className="!p-0 !h-[30px] !w-[50px]"
                        variant="logistical-lightblue-invert"
                        icon="ri-add-line ri-1x"
                    />{' '}
                </div>
            )
        },
    },
]

export const modalAttachPoLineItemsHeaders: ITableColumn<IPoLineItem>[] = [
    {
        accessor: 'lineId',
        label: 'Line no.',
    },
    {
        accessor: 'itemdesc',
        label: 'Item Desc',
    },
    {
        accessor: 'price',
        label: 'Price',
        customBuild: (data) => {
            return <div>${data}</div>
        },
    },
    {
        accessor: 'amount',
        label: 'Amount',
    },
    {
        accessor: 'colorcode',
        label: 'Color',
    },
    {
        accessor: 'size',
        label: 'Size',
    },
    {
        accessor: 'matcontents',
        label: 'Material',
    },
    {
        accessor: 'hsCode',
        label: 'HS Code',
    },
    {
        accessor: 'unit',
        label: 'Unit',
    },
    {
        accessor: 'shipment',
        label: 'shipment Item',
        customBuild: (data, row) => {
            if (!row?.shipment) return <></>

            const { totalQty } = row.shipment
            let qtyInShip = 0
            row.poShipments.forEach((val) => {
                qtyInShip += val.qty
            })
            return (
                <div className="">
                    <ProgressBar
                        total={parseInt(totalQty ?? '0')}
                        current={qtyInShip}
                        icon="ri-ship-2-line"
                    />
                </div>
            )
        },
        headerClassName: 'flex justify-center',
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
    },
]

export const attachPoLineItemsHeaders: ITableColumn<IPoLineItem>[] = [
    {
        accessor: 'lineId',
        label: 'Line no.',
        width: 0,
        height: 60,
    },
    {
        accessor: 'itemdesc',
        label: 'Item Description',
        width: 150,
        ellipsis: true,
    },
    {
        accessor: 'price',
        label: 'Price',
        width: 50,
        customBuild: (data) => {
            return <div>${data}</div>
        },
    },
    {
        accessor: 'amount',
        label: 'Amount',
        width: 50,
    },
    {
        accessor: 'matcontents',
        label: 'Material',
        width: 150,
        ellipsis: true,
    },
    {
        accessor: 'hsCode',
        label: 'HS Code',
        width: 20,
    },
    {
        accessor: 'size',
        label: 'Size',
        width: 20,
    },
    {
        accessor: 'unit',
        label: 'Unit',
        width: 30,
    },
    {
        accessor: 'colorcode',
        label: 'Color',
        width: 150,
        ellipsis: true,
    },
    {
        accessor: 'totalPoShipments',
        label: 'Qty In Ship',
        width: 20,
        customBuild: (data, rowData) => {
            return <>{rowData?.totalPoShipments}</>
        },
    },
    {
        accessor: 'qtyAvailable',
        label: 'Qty to Ship',
        width: 20,
        customBuild: (data, rowData) => {
            return <>{rowData?.qtyAvailable}</>
        },
    },
    {
        accessor: 'totalQtyToShip',
        label: 'Total Qty to Ship',
        className: '-mt-[20px]',
        // eslint-disable-next-line no-unused-vars
        customBuild: (data, rowData, indexPo, indexPoLines) => {
            const id = 'key-' + rowData?.lineId
            return (
                <FormInput
                    placeholder="Qty"
                    name={`data[${indexPo}].poLines[${indexPoLines}].qty`}
                    key={id + indexPo + indexPoLines}
                />
            )
        },
    },
    {
        label: 'Action',
        accessor: 'action',
        headerClassName: 'flex justify-center',
        customBuild: (data, rowData) => {
            const id = rowData?.id
            if (!id) return <></>
            return (
                <div className="w-full text-center gap-2 -mt-[5px]">
                    <Button
                        onClick={() => {
                            removePoLine(rowData)
                        }}
                        style={{ height: '100%' }}
                        className="!p-0 !h-[30px] !w-[50px] "
                        variant="danger"
                        iconClassName="text-logistical-red-ver1"
                        icon="ri-delete-bin-line ri-1x"
                    />
                </div>
            )
        },
    },
]
