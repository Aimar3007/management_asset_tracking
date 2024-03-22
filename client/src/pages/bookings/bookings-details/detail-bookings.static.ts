import { ISTColumn } from 'components/simple-table/simple-table.interface'
import { IDetailData } from '../bookings.interface'

export const HeaderDetailTab = [
    {
        header: 'Details',
    },
    {
        header: 'Additional Information',
    },
    {
        header: 'Milestones',
    },
    {
        header: 'Goods / Packs',
    },
    {
        header: 'Reference No.',
    },
    {
        header: 'Documentation',
    },
]

export const contentLeftTitle: IDetailData[] = [
    {
        value: 'transportMode',
        title: 'Transport Mode',
    },
    {
        value: 'bookingDate',
        title: "Booking Date",
    },
    {
        value: 'shipperRef',
        title: "Shipper's Ref Number",
    },
    {
        value: 'orderNumber',
        title: 'Order Ref Number',
    },
    {
        value: 'etd',
        title: 'ETD',
    },
    {
        value: 'eta',
        title: 'Dest.ETA',
    },
    {
        value: 'packs',
        title: 'Packs',
    },
    {
        value: 'weight',
        title: 'Weight',
    },
    {
        value: 'volume',
        title: 'Volume',
    },
    {
        value: 'weight',
        title: 'Weight',
    },
    {
        value: 'vessel',
        title: 'Vessel',
    },
    {
        value: 'voyageFlight',
        title: 'Voyage/Flight',
    },
    {
        value: 'goodsValue',
        title: 'Goods Value',
    },
    {
        value: 'weight',
        title: 'Weight',
    },
    {
        value: 'insuranceValue',
        title: 'Insurance Value',
    },
    {
        value: 'shipperCodAmount',
        title: 'Shipper COD Amount',
    }
]

export const contentRightTitle: IDetailData[] = [
    {
        value: 'serviceLevel',
        title: 'Service Level',
    },
    {
        value: 'paymentTerm',
        title: 'Payment Term',
    },
    {
        value: 'billing',
        title: 'Req. Billing Party',
    },
    {
        value: 'shipper',
        title: 'Shipper',
    },
    {
        value: 'consignee',
        title: 'Consignee',
    },
    {
        value: 'shipperContact',
        title: 'Shipper Contact',
    },
    {
        value: 'consigneeContact',
        title: 'Consignee Contact',
    },
    {
        value: 'goodsDescription',
        title: 'Goods Description',
    },
    {
        value: 'detailedDescription',
        title: 'Detailed Goods Description',
    },
    {
        value: 'marksNumber',
        title: 'Marks & Numbers',
    },
    {
        value: 'specialInstructions',
        title: 'Special Instructions',
    },
    {
        value: 'notes',
        title: 'Notes',
    }
]

export const headerAdditionalInformation: IDetailData[] = [
    {
        value: 'pickupAddress',
        title: 'Pickup Address'
    },
    {
        value: 'estimatedPickup',
        title: 'Estimated Pickup'
    },
    {
        value: 'requiredPickUp',
        title: 'Pickup Required By'
    },
    {
        value: 'pickupEquipment',
        title: 'Pickup Equipment'
    },
    {
        value: 'pickupAgent',
        title: 'Pickup Agent'
    },
    {
        value: 'deliveryAddress',
        title: 'Delivery Address'
    },
    {
        value: 'estimatedDelivery',
        title: 'Estimated Delivery'
    },
    {
        value: 'deliveryRequiredBy',
        title: 'Delivery Required By'
    },
    {
        value: 'cartageDropMode',
        title: 'Delivery Required By'
    },
    {
        value: 'deliveryAgent',
        title: 'Delivery Agent'
    },
    {
        value: 'chargesApply',
        title: 'Charges Apply'
    },
    {
        value: 'releaseType',
        title: 'Release Type'
    },
    {
        value: 'onBoard',
        title: 'On Board'
    }
]

export const headerMilestones: ISTColumn<any>[] = [
    {
        accessor: 'parentJob',
        label: 'Parent Job',
    },
    {
        accessor: 'milestoneDesc',
        label: 'Description',
    },
    {
        accessor: 'milestoneDate',
        label: 'Date',
    },
    {
        accessor: 'milestoneStatus',
        label: 'Status',
    },
]

export const headerGoods: ISTColumn<any>[] = [
    {
        accessor: 'goodsPiece',
        label: 'Pieces',
    },
    {
        accessor: 'goodsPackType',
        label: 'Pack Type',
    },
    {
        accessor: 'goodsLength',
        label: 'Length',
    },
    {
        accessor: 'goodsWidth',
        label: 'Width',
    },
    {
        accessor: 'goodsHeight',
        label: 'Height',
    },
    {
        accessor: 'goodsHeightUD',
        label: 'UD',
    },
    {
        accessor: 'goodsWeight',
        label: 'Weight',
    },
    {
        accessor: 'goodsWeightUQ',
        label: 'UQ',
    },
    {
        accessor: 'goodsVolume',
        label: 'Volume',
    },
    {
        accessor: 'goodsVolumeUQ',
        label: 'UQ',
    },
    {
        accessor: 'goodsDescription',
        label: 'Description',
    },
    {
        accessor: 'goodsMarksAndNumbers',
        label: 'Marks and Numbers',
    }
]

export const headerReferenceNo: ISTColumn<any>[] = [
    {
        accessor: 'refCountry',
        label: 'Country/Region',
    },
    {
        accessor: 'refNumberType',
        label: 'Number Type',
    },
    {
        accessor: 'refNumber',
        label: 'Number',
    },
    {
        accessor: 'refTypeDescription',
        label: 'Type Description',
    },
]

export const headerRelatedInvoices: ISTColumn<any>[] = [
    {
        accessor: 'invoiceNo',
        label: '',
    },
    {
        accessor: 'invoiceNo',
        label: 'Invoice No.',
    },
    {
        accessor: 'issuer',
        label: 'Issuer',
    },
    {
        accessor: 'type',
        label: 'Type',
    },
    {
        accessor: 'terms',
        label: 'Terms',
    },
    {
        accessor: 'invDate',
        label: 'Inv. Date',
    },
    {
        accessor: 'dueDate',
        label: 'Due Date',
    },
    {
        accessor: 'currency',
        label: 'Currency',
    },
    {
        accessor: 'amount',
        label: 'Amount',
    },
    {
        accessor: 'outstandingAmount',
        label: 'Outstanding Amt.',
    },
    {
        accessor: 'paidDate',
        label: 'Paid Date',
    },
]

export const headerDocuments: ISTColumn<any>[] = [
    {
        accessor: 'date',
        label: '',
    },
    {
        accessor: 'date',
        label: 'Date',
    },
    {
        accessor: 'description',
        label: 'Description',
    },
    {
        accessor: 'type',
        label: 'Type',
    },
]