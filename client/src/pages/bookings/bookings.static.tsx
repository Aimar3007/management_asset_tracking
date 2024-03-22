import { ISTColumn } from 'components/simple-table/simple-table.interface'
import SquareColor from 'components/square-color/square-color'
import { ITabItem } from 'components/tab/tab.interface'
import { ITableColumn } from 'components/table/table.interface'

export const BHeader: ITableColumn[] = [
    {
        label: 'Color Status',
        accessor: 'statusTransaction',
        showLabel: false,
        sort: false,
        exportColumn: false,
        customBuild: (data) => {
            let classs = ''
            switch (data) {
                case 'atdestinationport':
                    classs = 'bg-logistical-green'
                    break
                case 'intransit':
                    classs = 'bg-logistical-yellow'
                    break
                case 'atoriginport':
                    classs = 'bg-logistical-pink'
                    break
                default:
                    classs = 'bg-logistical-gray-ver3'
                    break
            }

            return <SquareColor colorClass={classs} />
        },
    },
    {
        label: 'Booking No.',
        accessor: 'bookingNo',
    },
    {
        label: 'Shipper',
        accessor: 'shipper',
    },
    {
        label: 'Consignee',
        accessor: 'consignee',
    },
    {
        label: 'Origin',
        accessor: 'origin',
    },
    {
        label: 'ETD',
        accessor: 'etd',
    },
    {
        label: 'Destination',
        accessor: 'destination',
    },
    {
        label: 'ETA',
        accessor: 'eta',
    },
]

export const TabHeader: ITabItem[] = [
    {
        label: 'All Bookings',
        key: 'statusTransaction',
        totalData: 25,
        value: 'all',
        colorClassname: 'bg-logistical-blue-ver1',
        textColorClassname: 'text-logistical-blue-ver5',
        lineColorClassname: 'bg-logistical-blue-ver5',
    },
    {
        label: 'At destination port',
        key: 'statusTransaction',
        totalData: 5,
        value: 'atdestinationport',
        colorClassname: 'bg-logistical-green-ver2',
        textColorClassname: 'text-logistical-green-dark-ver1',
        lineColorClassname: 'bg-logistical-green-dark-ver1',
    },
    {
        label: 'In Transit',
        key: 'statusTransaction',
        totalData: 5,
        value: 'intransit',
        colorClassname: 'bg-logistical-yellow-ver1',
        textColorClassname: 'text-logistical-yellow-dark-ver1',
        lineColorClassname: 'bg-logistical-yellow-dark-ver1',
    },
    {
        label: 'At Origin Port',
        key: 'statusTransaction',
        totalData: 5,
        value: 'atoriginport',
        colorClassname: 'bg-logistical-red-ver2',
        textColorClassname: 'text-logistical-red-dark-ver1',
        lineColorClassname: 'bg-logistical-red-dark-ver1',
    },
    {
        label: 'Others',
        key: 'statusTransaction',
        totalData: 5,
        value: 'others',
        colorClassname: 'bg-logistical-gray-ver5',
        textColorClassname: 'text-logistical-gray-ver4',
        lineColorClassname: 'bg-logistical-gray-ver4',
    },
]

export const HeaderBDetail = [
    {
        label: 'Shipper',
        accessor: 'shipper',
    },
    {
        label: 'Origin',
        accessor: 'origin',
    },
    {
        label: 'ETD',
        accessor: 'etd',
    },
    {
        label: 'Destination',
        accessor: 'destination',
    },
    {
        label: 'ETA',
        accessor: 'eta',
    },
    {
        label: 'Status',
        accessor: 'status',
    },
    {
        label: 'Consignee',
        accessor: 'consignee',
    },
]

export const headers: ISTColumn<any>[] = [
    { accessor: 'bookingno', label: 'Booking No' },
    { accessor: 'shipper', label: 'Shipper' },
    { accessor: 'consignee', label: 'Consignee' },
    { accessor: 'origin', label: 'Origin' },
    { accessor: 'etd', label: 'ETD' },
    { accessor: 'destination', label: 'Destination' },
    { accessor: 'eta', label: 'ETA' },
]
