import { formatDate } from 'common/common.service'
import { IHeaderExport } from 'components/button-export/button-export.interface'
import { ITabItem } from 'components/tab/tab.interface'

// for refactor
export const deliveryManagementStatusHeader: ITabItem[] = [
    {
        label: 'Shipment In Progress',
        totalData: 5,
        key: 'status',
        value: 'shipmentInProgress',
        colorClassname: 'bg-logistical-yellow-ver1',
        textColorClassname: 'text-logistical-yellow-dark-ver1',
        lineColorClassname: 'bg-logistical-yellow-dark-ver1',
        childStatus: [
            {
                label: 'Booked',
                totalData: 24,
                key: 'status',
                value: 'Booked',
                colorClassname: 'bg-logistical-gray-ver5',
                textColorClassname: 'text-logistical-gray-ver8',
                lineColorClassname: 'bg-logistical-gray-ver8',
            },
            {
                label: 'Shipped',
                totalData: 34,
                key: 'status',
                value: 'Shipped',
                colorClassname: 'bg-logistical-gray-ver5',
                textColorClassname: 'text-logistical-gray-ver8',
                lineColorClassname: 'bg-logistical-gray-ver8',
            },
            {
                label: 'Delivered',
                totalData: 14,
                key: 'status',
                value: 'Delivered',
                colorClassname: 'bg-logistical-gray-ver5',
                textColorClassname: 'text-logistical-gray-ver8',
                lineColorClassname: 'bg-logistical-gray-ver8',
            },
            {
                label: 'In Factory',
                totalData: 14,
                key: 'status',
                value: 'In Factory',
                colorClassname: 'bg-logistical-gray-ver5',
                textColorClassname: 'text-logistical-gray-ver8',
                lineColorClassname: 'bg-logistical-gray-ver8',
            },
        ],
    },
    {
        label: 'Confirmed',
        totalData: 4,
        key: 'status',
        value: 'confirmed',
        colorClassname: 'bg-logistical-green-ver2',
        textColorClassname: 'text-logistical-green-dark-ver1',
        lineColorClassname: 'bg-logistical-green-dark-ver1',
    },
]

export const deliveryStageStatusHeader = [
    {
        label: 'Booked',
        totalData: 24,
        key: 'status',
        value: 'Booked',
        colorClassname: 'bg-logistical-gray-ver5',
        textColorClassname: 'text-logistical-gray-ver8',
        lineColorClassname: 'bg-logistical-gray-ver8',
    },
    {
        label: 'Shipped',
        totalData: 34,
        key: 'status',
        value: 'Shipped',
        colorClassname: 'bg-logistical-gray-ver5',
        textColorClassname: 'text-logistical-gray-ver8',
        lineColorClassname: 'bg-logistical-gray-ver8',
    },
    {
        label: 'Delivered',
        totalData: 14,
        key: 'status',
        value: 'Delivered',
        colorClassname: 'bg-logistical-gray-ver5',
        textColorClassname: 'text-logistical-gray-ver8',
        lineColorClassname: 'bg-logistical-gray-ver8',
    },
    {
        label: 'In Factory',
        totalData: 14,
        key: 'status',
        value: 'In Factory',
        colorClassname: 'bg-logistical-gray-ver5',
        textColorClassname: 'text-logistical-gray-ver8',
        lineColorClassname: 'bg-logistical-gray-ver8',
    },
]

export const transportScheduleOption = [
    {
        value: 'etd',
        label: 'ETD (Estimation Time Delivery)',
    },
    {
        value: 'eta',
        label: 'ETA (Estimation Time Arrival)',
    },
    //  hide because there is no data yet
    // {
    //     value: 'atd',
    //     label: 'ATD (Actual Time Delivery)',
    // },
    // {
    //     value: 'ata',
    //     label: 'ATA (Actual Time Arrival)',
    // },
]

export const shipmentSortByOption = [
    {
        label: 'Shipment ID',
        value: 'shipmentID',
    },
    {
        label: 'Transport',
        value: 'transport',
    },
    {
        label: 'Origin',
        value: 'origin',
    },
    {
        label: 'Destination',
        value: 'destination',
    },
    {
        label: 'Shipper',
        value: 'shipper',
    },
    {
        label: 'Consignee',
        value: 'consignee',
    },
    {
        value: 'etd',
        label: 'ETD (Estimation Time Delivery)',
    },
    {
        value: 'eta',
        label: 'ETA (Estimation Time Arrival)',
    },
    {
        value: 'atd',
        label: 'ATD (Actual Time Delivery)',
    },
    {
        value: 'ata',
        label: 'ATA (Actual Time Arrival)',
    },
]

export const ShipmentGenerateReportHeader: IHeaderExport[] = [
    {
        label: 'Shipment ID',
        accessor: 'shipmentID',
        widthCol: '25',
    },
    {
        label: 'Transport',
        accessor: 'transport',
        widthCol: '25',
    },
    {
        label: 'Origin',
        accessor: 'origin',
        widthCol: '25',
    },
    {
        label: 'Destination',
        accessor: 'destination',
        widthCol: '25',
    },
    {
        label: 'Shipper',
        accessor: 'shipper',
        widthCol: '25',
    },
    {
        label: 'Consignee',
        accessor: 'consignee',
        widthCol: '25',
    },
    {
        label: 'Weight',
        accessor: 'weight',
        widthCol: '25',
    },
    {
        label: 'UW',
        accessor: 'uw',
        widthCol: '25',
    },
    {
        label: 'Volume',
        accessor: 'volume',
        widthCol: '25',
    },
    {
        label: 'UV',
        accessor: 'uv',
        widthCol: '25',
    },
    {
        label: 'Last Updated',
        accessor: 'lastUpdated',
        widthCol: '25',
        customBuild: (data) => (data ? formatDate(data) : ''),
    },
    {
        label: 'ETD',
        accessor: 'etd',
        widthCol: '25',
        customBuild: (data) => (data ? formatDate(data) : ''),
    },
    {
        label: 'ATD',
        accessor: 'atd',
        widthCol: '25',
        customBuild: (data) => (data ? formatDate(data) : ''),
    },
    {
        label: 'ETA',
        accessor: 'eta',
        widthCol: '25',
        customBuild: (data) => (data ? formatDate(data) : ''),
    },
    {
        label: 'ATA',
        accessor: 'ata',
        widthCol: '25',
        customBuild: (data) => (data ? formatDate(data) : ''),
    },
]
