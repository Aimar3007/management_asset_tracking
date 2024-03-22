import {
    formatCurrencyUsd,
    formatDate,
    numberWithCommas,
} from 'common/common.service'
import { IHeaderExport } from 'components/button-export/button-export.interface'
import { IDropdownItem } from 'components/dropdown/dropdown.interface'
import { ISTColumn } from 'components/simple-table/simple-table.interface'
import SquareColor from 'components/square-color/square-color'
import { ITableColumn } from 'components/table/table.interface'

export const POHeader: ITableColumn[] = [
    {
        label: 'Color Status',
        accessor: 'status',
        showLabel: false,
        sort: false,
        exportColumn: false,
        customBuild: (data) => {
            let classs = ''
            switch (data) {
                case 'Open':
                    classs = 'bg-logistical-green'
                    break
                case 'In Progress':
                    classs = 'bg-logistical-yellow'
                    break
                case 'Canceled':
                    classs = 'bg-logistical-red-ver2'
                    break
                case 'Closed':
                    classs = 'bg-logistical-gray-ver3'
                    break
            }

            return <SquareColor colorClass={classs} />
        },
    },
    {
        label: 'Purchase No.',
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
    //     label: 'Shipper',
    //     accessor: 'shippers[0]',
    // },
    {
        label: 'PO Date',
        accessor: 'poDate',
    },
    {
        label: 'Allocation Status',
        accessor: 'fillStatus',
    },
    {
        label: 'Total Qty',
        accessor: 'totalQty',
        className: 'flex justify-end',
        headerClassName: 'flex justify-end',
    },
    {
        label: 'Total Amount',
        accessor: 'totalAmount',
        className: 'flex justify-end',
        headerClassName: 'flex justify-end',
    },
    {
        label: 'Currency',
        accessor: 'currency',
    },
    {
        label: 'Last Updated',
        accessor: 'updatedAt',
    },
    {
        label: 'Created By',
        accessor: 'createdBy',
    },
    {
        label: 'Updated By',
        accessor: 'updatedBy',
    },
]

export const HeaderPODetail = [
    {
        label: 'Material',
        accessor: 'material',
    },
    {
        label: 'HS Code',
        accessor: 'hs_code',
    },
    {
        label: 'Color',
        accessor: 'color',
    },
    {
        label: 'Size',
        accessor: 'size',
    },
    {
        label: 'Quantity',
        accessor: 'quantity',
    },
    {
        label: 'Status',
        accessor: 'status',
    },
    {
        label: 'Progress',
        accessor: 'progress',
    },
    {
        label: 'Material Description',
        accessor: 'material_description',
    },
]

export const headers: ISTColumn<any>[] = [
    { accessor: 'po_number', label: 'PO No.' },
    { accessor: 'material', label: 'Material' },
    { accessor: 'hs_code', label: 'HS Code' },
    { accessor: 'color', label: 'Color' },
    { accessor: 'quantity', label: 'Quantity' },
    { accessor: 'status', label: 'Status' },
    { accessor: 'progress', label: 'Progress' },
    { accessor: 'material_description', label: 'Material Description' },
]

export const poStatus: IDropdownItem[] = [
    { label: 'Open', value: 'Open' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Canceled', value: 'Canceled' },
    { label: 'Closed', value: 'Closed' },
]

export const POGenerateReportHeader: IHeaderExport[] = [
    {
        label: 'Purchase No.',
        accessor: 'poNo',
        widthCol: '15',
    },
    {
        label: 'Status',
        accessor: 'status',
        widthCol: '15',
    },
    {
        label: 'Vendor',
        accessor: 'vendor',
        widthCol: '25',
    },
    // {
    //     label: 'Consignee',
    //     accessor: 'consignee',
    // },
    // {
    //     label: 'Shipper',
    //     accessor: 'shippers[0]',
    // },
    {
        label: 'PO Date',
        accessor: 'poDate',
        customBuild: (data) => formatDate(data),
        widthCol: '14',
    },
    {
        label: 'Allocation Status',
        accessor: 'fillStatus',
        widthCol: '21',
    },
    {
        label: 'Total Qty',
        accessor: 'totalQty',
        customBuild: (data) => numberWithCommas(data),
        styleXlxs: {
            alignment: { horizontal: 'right' },
        },
        widthCol: '15',
    },
    {
        label: 'Total Amount',
        accessor: 'totalAmount',
        customBuild: (data) => formatCurrencyUsd(data),
        styleXlxs: {
            alignment: { horizontal: 'right' },
        },
        widthCol: '20',
    },
    // {
    //     label: 'Currency',
    //     accessor: 'currency',
    // },
    // {
    //     label: 'Last Updated',
    //     accessor: 'updatedAt',
    //     customBuild: (data) => formatDateTime(data),
    // },
    {
        label: 'Created By',
        accessor: 'createdBy',
        widthCol: '20',
    },
    {
        label: 'Updated By',
        accessor: 'updatedBy',
        widthCol: '20',
    },
]
