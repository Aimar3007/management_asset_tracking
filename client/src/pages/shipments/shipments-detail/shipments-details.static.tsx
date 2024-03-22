/* eslint-disable no-unused-vars */
import { ITabItem } from 'components/tab/tab.interface'
import StatusCard from 'components/status-card/status-card.component'
import { IPoLineItem } from 'pages/purchase-order/purchase-order-detail/purchase-order-detail.interface'
import { ISTColumn } from 'components/simple-table/simple-table.interface'
import {
    IAddressDetails,
    IContainer,
    IEDocumentationDetails,
    IGoodsOrPacks,
    IMilestone,
    IRelatedInvoice,
    IShipment2,
    ITransport,
} from '../shipments.interface'
import {
    IPillSAddressesDetailsHeader,
    IPillsShippingDetailsHeader,
    IShippingDetailsHeader,
} from './shipments-detail.interface'
import {
    formatDate,
    formatDateDash,
    formatDateTime,
    revertToTitleCase,
} from 'common/common.service'

export const contentShipDetailHeader: ITabItem[] = [
    {
        label: 'Details',
        key: 'status',
        value: 'details',
        textColorClassname: 'text-logistical-gray-ver4',
        lineColorClassname: 'bg-logistical-gray-ver4',
    },
    {
        label: 'List Purchase Orders',
        key: 'status',
        value: 'listPurchaseOrders',
        textColorClassname: 'text-logistical-gray-ver4',
        lineColorClassname: 'bg-logistical-gray-ver4',
    },
    {
        label: 'Milestones',
        key: 'status',
        value: 'milestones',
        textColorClassname: 'text-logistical-gray-ver4',
        lineColorClassname: 'bg-logistical-gray-ver4',
    },
    {
        label: 'Transport',
        key: 'status',
        value: 'transport',
        textColorClassname: 'text-logistical-gray-ver4',
        lineColorClassname: 'bg-logistical-gray-ver4',
    },
    {
        label: 'Goods/Packs',
        key: 'status',
        value: 'goodsPacks',
        textColorClassname: 'text-logistical-gray-ver4',
        lineColorClassname: 'bg-logistical-gray-ver4',
    },
    {
        label: 'Containers',
        key: 'status',
        value: 'containers',
        textColorClassname: 'text-logistical-gray-ver4',
        lineColorClassname: 'bg-logistical-gray-ver4',
    },
    {
        label: 'eDocumentation',
        key: 'status',
        value: 'eDocumentation',
        textColorClassname: 'text-logistical-gray-ver4',
        lineColorClassname: 'bg-logistical-gray-ver4',
    },
    {
        label: 'Related Invoice',
        key: 'status',
        value: 'relatedInvoice',
        textColorClassname: 'text-logistical-gray-ver4',
        lineColorClassname: 'bg-logistical-gray-ver4',
    },
]

export const shippingDetailsHeader: IShippingDetailsHeader = {
    shippingDetails: [
        {
            accessor: 'shipmentStatus',
            label: 'Status',
            customBuild: (data) => {
                const changeDataType = data as string
                return (
                    <div className="my-1">
                        <StatusCard
                            status={
                                changeDataType === 'InFactory'
                                    ? 'In Factory'
                                    : changeDataType
                            }
                        />{' '}
                    </div>
                )
            },
        },
        // {
        //     accessor: 'dataNull',
        //     label: '',
        //     customBuild: (data) => <div className="my-1"> </div>,
        // },
        {
            accessor: 'routeCode',
            label: 'Route Code',
        },
        // {
        //     accessor: 'dataNull',
        //     label: '',
        //     customBuild: (data) => <div className="my-1"></div>,
        // },
        {
            accessor: 'houseBill',
            label: 'HouseBill',
        },
        {
            accessor: 'supplierInvoice',
            label: 'Supplier Invoice',
        },
        {
            accessor: 'origin',
            label: 'Origin',
        },
        {
            accessor: 'etd',
            label: 'ETD',
            customBuild: (data) => {
                const changeDataType = data as string
                return <>{formatDateDash(changeDataType)}</>
            },
        },
        {
            accessor: 'destination',
            label: 'Destination',
        },
        {
            accessor: 'eta',
            label: 'ETA',
            customBuild: (data) => {
                const changeDataType = data as string
                return <>{formatDateDash(changeDataType)}</>
            },
        },
        {
            accessor: 'weight',
            label: 'Weight',
            customBuild: (data, x, y, z, rowData) => {
                return (
                    <>
                        {rowData?.weight} {rowData?.uw}
                    </>
                )
            },
        },
        {
            accessor: 'volume',
            label: 'Volume',
            customBuild: (data, x, y, z, rowData) => {
                return (
                    <>
                        {rowData?.volume} {rowData?.uv}
                    </>
                )
            },
        },
        // {
        //     accessor: 'wv',
        //     label: 'WV',
        // },
        {
            accessor: 'packs',
            label: 'Packs',
            customBuild: (data, x, y, z, rowData) => {
                return (
                    <>
                        {rowData?.packs} {rowData?.packsType}
                    </>
                )
            },
        },
        {
            accessor: 'inners',
            label: 'Inners',
            customBuild: (data, x, y, z, rowData) => {
                return (
                    <>
                        {rowData?.inners} {rowData?.innersType}
                    </>
                )
            },
        },
        {
            accessor: 'goodValue',
            label: 'Goods Value',
            customBuild: (data, x, y, z, rowData) => {
                return (
                    <>
                        {rowData?.goodValue} {rowData?.goodValueCurrency}
                    </>
                )
            },
        },
        {
            accessor: 'insuranceValue',
            label: 'Insurance Value',
            customBuild: (data, x, y, z, rowData) => {
                return (
                    <>
                        {rowData?.insuranceValue}{' '}
                        {rowData?.insuranceValueCurrency}
                    </>
                )
            },
        },
        {
            accessor: 'chargeable',
            label: 'Chargeable',
            customBuild: (data) => {
                return <>{data} M3</>
            },
        },
    ],
    mode: [
        {
            accessor: 'transport',
            label: 'Transport',
        },
        {
            accessor: 'containerType',
            label: 'Type',
        },
        {
            accessor: 'containerMode',
            label: 'Container',
        },
    ],
}

export const pillsShippingDetailsHeader: ISTColumn<IPillsShippingDetailsHeader>[] =
    [
        {
            label: 'INFORMATION',
            accessor: 'information',
        },
        {
            label: 'DESCRIPTIONS & INSTRUCTIONS',
            accessor: 'descriptionsAndIntructions',
        },
    ]

export const descriptionAndIntructionsHeader: ISTColumn<IShipment2>[] = [
    {
        accessor: 'description',
        label: 'Description',
    },
    {
        accessor: 'dataNull',
        label: 'Marks&Numbers',
        // customBuild: (data: any) =>
        //     data?.map((x: any) => (
        //         <div className="flex">
        //             <div className="max-w-[100px] min-w-[100px]">{x.date}</div>
        //             <div className="">{x.description}</div>
        //         </div>
        //     )),
    },
    {
        accessor: 'incoterm',
        label: 'Incoterm',
    },
    {
        accessor: 'dataNull',
        label: 'Additional Terms',
        // customBuild: (data: any) =>
        //     data?.map((x: any) => (
        //         <div className="flex">
        //             <div className="max-w-[100px] min-w-[100px]">{x.date}</div>
        //             <div className="">{x.description}</div>
        //         </div>
        //     )),
    },
    {
        accessor: 'spotRate',
        label: 'Spot Rate',
    },
    {
        accessor: 'serviceLevel',
        label: 'Service Level',
    },
    {
        accessor: 'entryDetails',
        label: 'Entry Details',
    },
    {
        accessor: 'shippingDate',
        label: 'Issue Date',
        customBuild: (data: any) => data?.issueDate,
    },
    {
        accessor: 'shippingDate',
        label: 'Expiry Date',
        customBuild: (data: any) => data?.expiryDate,
    },
    {
        accessor: 'releaseType',
        label: 'Release Type',
    },
    {
        accessor: 'chargesApply',
        label: 'Charges Apply',
    },
    {
        accessor: 'screeningStatus',
        label: 'Screening Status',
    },
]

export const pillSAddressesDetailsHeader: ISTColumn<IPillSAddressesDetailsHeader>[] =
    [
        {
            accessor: 'shipper',
            label: 'SHIPPER',
        },
        {
            accessor: 'consignee',
            label: 'CONSIGNEE',
        },
        {
            accessor: 'localClient',
            label: 'LOCAL CLIENT',
        },
    ]

export const addressesDetailsShipperHeader: ISTColumn<IAddressDetails>[] = [
    {
        accessor: 'companyName',
        label: 'Company',
    },
    {
        accessor: 'address',
        label: 'Address',
    },
    {
        accessor: 'phone',
        label: 'Phone',
    },
    {
        accessor: 'email',
        label: 'Email',
    },

    {
        accessor: 'fax',
        label: 'Fax',
    },
]

export const addressesDetailsConsigneeHeader: ISTColumn<IAddressDetails>[] = [
    {
        accessor: 'companyName',
        label: 'Company',
    },
    {
        accessor: 'address',
        label: 'Delivery Address',
    },
    {
        accessor: 'phone',
        label: 'Phone',
    },
    {
        accessor: 'email',
        label: 'Email',
    },
    {
        accessor: 'fax',
        label: 'Fax',
    },
]

export const poLinesHeaders: ISTColumn<IPoLineItem>[] = [
    {
        accessor: 'lineId',
        label: 'Line no.',
    },
    {
        accessor: 'itemdesc',
        label: 'Item Description',
    },
    {
        accessor: 'price',
        label: 'Price',
    },
    {
        accessor: 'amount',
        label: 'Amount',
    },
    {
        accessor: 'matcontents',
        label: 'Material',
    },
    // {
    //     accessor: 'hsCode',
    //     label: 'HS Code',
    // },
    {
        accessor: 'colorcode',
        label: 'Color',
    },
    {
        accessor: 'totalPoShipments',
        label: 'Qty in Ship',
    },
    {
        accessor: 'qtyPo',
        label: 'Qty to Ship',
    },
]

export const transportHeader: ISTColumn<ITransport>[] = [
    {
        accessor: 'legOrder',
        label: 'Leg',
    },
    {
        accessor: 'transportMode',
        label: 'Mode',
    },
    {
        accessor: 'legType',
        label: 'Type',
    },
    {
        accessor: 'forwardingConsole',
        label: 'Parent',
    },
    {
        accessor: 'waybillNumber',
        label: 'Bill',
    },
    {
        accessor: 'vesselName',
        label: 'Vessel',
    },
    {
        accessor: 'voyageFlightNo',
        label: 'Voyage/Flight',
    },
    {
        accessor: 'portOfLoading',
        label: 'Load',
        isTextValue: true,
    },
    {
        accessor: 'portOfDischarge',
        label: 'Discharge',
        isTextValue: true,
    },
    {
        accessor: 'etd',
        label: 'ETD',
        customBuild: (data) => {
            return <div>{data ? formatDate(data as string) : '-'}</div>
        },
    },
    {
        accessor: 'eta',
        label: 'ETA',
        customBuild: (data) => {
            return <div>{data ? formatDate(data as string) : '-'}</div>
        },
    },
    {
        accessor: 'ata',
        label: 'ATA',
        customBuild: (data) => {
            return <div>{data ? formatDate(data as string) : '-'}</div>
        },
    },
    {
        accessor: 'bookingStatus',
        label: 'Status',
    },
    {
        accessor: 'carrier',
        label: 'Carrier',
    },
]

export const containerHeader: ISTColumn<IContainer>[] = [
    {
        accessor: 'containerNo',
        label: 'Container No.',
    },
    {
        accessor: 'shipmentNo',
        label: 'Shipment No.',
    },
    {
        accessor: 'sealNo',
        label: 'Seal No.',
    },
    {
        accessor: 'containerType',
        label: 'Container Type',
    },
    {
        accessor: 'containerMode',
        label: 'Container Mode',
    },
    {
        accessor: 'emptyReturnedOn',
        label: 'Empty Returned On',
    },
    {
        accessor: 'tareWeight',
        label: 'Tare Weight',
    },
    {
        accessor: 'goodWeight',
        label: 'Weight',
    },
    {
        accessor: 'estDelivery',
        label: 'Delivery Mode',
    },
    {
        accessor: 'estReturn',
        label: 'Est. Delivery',
    },
    {
        accessor: 'actReturn',
        label: 'Est. Return',
    },
    {
        accessor: 'containerParkEmptyReturnGateIn',
        label: 'Act. Return',
    },
]

export const milestonesHeader: ISTColumn<IMilestone>[] = [
    {
        accessor: 'parrentJob',
        label: 'Parent Job',
    },
    {
        accessor: 'sequence',
        label: 'Sequence',
    },
    {
        accessor: 'description',
        label: 'Description',
    },
    {
        accessor: 'eventCode',
        label: 'Event Code',
    },
    {
        accessor: 'estimatedDate',
        label: 'Estimated Date (loc)',
        customBuild: (data) => {
            return <div>{data ? formatDate(data as string) : '-'}</div>
        },
    },
    {
        accessor: 'actualStart',
        label: 'Actual Start (loc)',
        customBuild: (data) => {
            return <div>{data ? formatDate(data as string) : '-'}</div>
        },
    },
    {
        accessor: 'conditionReference',
        label: 'Condition Reference',
    },
    {
        accessor: 'conditionType',
        label: 'Condition Type',
    },
]

export const goodsPacksHeader: ISTColumn<IGoodsOrPacks>[] = [
    {
        accessor: 'pieces',
        label: 'Pieces',
    },
    {
        accessor: 'packType',
        label: 'Pack Type',
    },
    {
        accessor: 'length',
        label: 'Length',
    },
    {
        accessor: 'width',
        label: 'Width',
    },
    {
        accessor: 'height',
        label: 'Height',
    },
    {
        accessor: 'ud',
        label: 'UD',
    },
    {
        accessor: 'weight',
        label: 'Weight',
    },
    {
        accessor: 'uw',
        label: 'UW',
    },
    {
        accessor: 'volume',
        label: 'Volume',
    },
    {
        accessor: 'uv',
        label: 'UV',
    },
    {
        accessor: 'description',
        label: 'Descriptions',
    },
    {
        accessor: 'marksAndNumber',
        label: 'Marks and Numbers',
    },
]

export const eDocumentationHeader: ISTColumn<IEDocumentationDetails>[] = [
    {
        accessor: 'datedAdded',
        label: 'Date Added',
        customBuild: (data) => <>{formatDateTime(data as string)}</>,
    },
    {
        accessor: 'documentType',
        label: 'Document Type',
        customBuild: (data) => <>{revertToTitleCase(data as string)}</>,
    },
    {
        accessor: 'fileName',
        label: 'File Name',
    },
]

export const relatedInvoiceHeader: ISTColumn<IRelatedInvoice>[] = [
    {
        accessor: 'invoiceNumber',
        label: 'Invoice Number',
    },
    {
        accessor: 'issue',
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
        label: 'Inv Date',
        customBuild: (data) => <>{data ? formatDate(data as string) : '-'}</>,
    },
    {
        accessor: 'dueDate',
        label: 'Due Date',
        customBuild: (data) => <>{data ? formatDate(data as string) : '-'}</>,
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
        label: 'Outstanding Amount',
    },
    {
        accessor: 'paidDate',
        label: 'Paid Date',
        customBuild: (data) => <>{data ? formatDate(data as string) : '-'}</>,
    },
]

export const eDocsTypeOptions = [
    {
        label: 'Agents Instruction',
        value: 'agentsInstruction',
    },
    {
        label: 'Airway Bill/Ocean Bill of Lading',
        value: 'airwayBill',
    },
    {
        label: 'Arrival Notice',
        value: 'arrivalNotice',
    },
    {
        label: 'Arrival Notice and Charge Sheet',
        value: 'arrivalNoticeAndChargeSheet',
    },
    {
        label: 'Beneficiary Certificate',
        value: 'beneficiaryCertificate',
    },
    {
        label: 'Bill Of Entry',
        value: 'billOfEntry',
    },
    {
        label: 'Booking Cartage Advice',
        value: 'bookingCartageAdvice',
    },
    {
        label: 'Booking Confirmation',
        value: 'bookingConfirmation',
    },
    {
        label: 'Cartage Advice With Receipt',
        value: 'cartageAdviceWithReceipt',
    },
    {
        label: 'Certificate of Origin',
        value: 'certificateOfOrigin',
    },
    {
        label: 'Commercial Invoice',
        value: 'commercialInvoice',
    },
    {
        label: 'Container Release',
        value: 'containerRelease',
    },
    {
        label: 'Container Summary Sheet',
        value: 'containerSummarySheet',
    },
    {
        label: 'Cotton Certificate',
        value: 'cottonCertificate',
    },
    {
        label: 'Customs Clearance Documents',
        value: 'customsClearanceDocuments',
    },
    {
        label: 'Customs Status Advice',
        value: 'customsStatusAdvice',
    },
    {
        label: 'Delivery Labels',
        value: 'deliveryLabels',
    },
    {
        label: 'Documents Available Notice',
        value: 'documentsAvailableNotice',
    },
    {
        label: 'Draft Bill of Lading',
        value: 'draftBillOfLading',
    },
    {
        label: 'Entry Print/ Customs Declaration Documents',
        value: 'entryPrint',
    },
    {
        label: 'Export Cartage Advice',
        value: 'exportCartageAdvice',
    },
    {
        label: 'Export Cartage Advice with Receipt',
        value: 'exportCartageAdviceWithReceipt',
    },
    {
        label: 'Export Coload Master Manifest',
        value: 'exportColoadMasterManifest',
    },
    {
        label: 'Exporter Documents',
        value: 'exporterDocuments',
    },
    {
        label: 'Food Control Certificate',
        value: 'foodControlCertificate',
    },
    {
        label: 'Forwarders Cargo Receipt',
        value: 'forwardersCargoReceipt',
    },
    {
        label: 'Fumigation Certificate',
        value: 'fumigationCertificate',
    },
    {
        label: 'Gate Pass',
        value: 'gatePass',
    },
    {
        label: 'Health Clearance Certificate',
        value: 'healthClearanceCertificate',
    },
    {
        label: 'House Bill Of Lading - Signed',
        value: 'houseBillOfLading',
    },
    {
        label: 'House Waybill/ Bill of Lading',
        value: 'houseWaybill',
    },
    {
        label: 'Identification Check',
        value: 'identificationCheck',
    },
    {
        label: 'Image',
        value: 'image',
    },
    {
        label: 'Image - Damage',
        value: 'imageDamage',
    },
    {
        label: 'Import Cartage Advice',
        value: 'importCartageAdvice',
    },
    {
        label: 'Import Cartage Advice with Receipt',
        value: 'importCartageAdviceWithReceipt',
    },
    {
        label: 'Import Coload Master Manifest',
        value: 'importColoadMasterManifest',
    },
    {
        label: 'Insurance Certificate',
        value: 'insuranceCertificate',
    },
    {
        label: 'Internally Created Public Document',
        value: 'internallyCreatedPublicDocument',
    },
    {
        label: 'Letter of Credit',
        value: 'letterOfCredit',
    },
    {
        label: 'Load List',
        value: 'loadList',
    },
    {
        label: "Manufacturer's Declaration",
        value: 'manufacturersDeclaration',
    },
    {
        label: 'Master House',
        value: 'masterHouse',
    },
    {
        label: 'Miscellaneous CFS Document',
        value: 'miscellaneousCfsDocument',
    },
    {
        label: 'Miscellaneous Custom Document',
        value: 'miscellaneousCustomDocument',
    },
    {
        label: 'Miscellaneous Freight Document',
        value: 'miscellaneousFreightDocument',
    },
    {
        label: 'Miscellaneous Order Management Document',
        value: 'miscellaneousOrderManagementDocument',
    },
    {
        label: 'Miscellaneous Sales Manager Document',
        value: 'miscellaneousSalesManagerDocument',
    },
    {
        label: 'Miscellaneous Shipping Manager Document',
        value: 'miscellaneousShippingManagerDocument',
    },
    {
        label: 'Motor Vehicle Certificate',
        value: 'motorVehicleCertificate',
    },
    {
        label: 'Multiple Copies',
        value: 'multipleCopies',
    },
    {
        label: 'NAFTA Certificate',
        value: 'naftaCertificate',
    },
    {
        label: 'Original Bill Of Lading',
        value: 'originalBillOfLading',
    },
    {
        label: 'Outturn Report',
        value: 'outturnReport',
    },
    {
        label: 'Packing Declaration',
        value: 'packingDeclaration',
    },
    {
        label: 'Packing List',
        value: 'packingList',
    },
    {
        label: 'Permit',
        value: 'permit',
    },
    {
        label: 'Power of Attorney',
        value: 'powerOfAttorney',
    },
    {
        label: 'Power of Attorney Customs',
        value: 'powerOfAttorneyCustoms',
    },
    {
        label: 'Power of Attorney Forwarding',
        value: 'powerOfAttorneyForwarding',
    },
    {
        label: 'Profit Share Calculation Worksheet',
        value: 'profitShareCalculationWorksheet',
    },
    {
        label: 'Proof of Delivery',
        value: 'proofOfDelivery',
    },
    {
        label: 'Proof of Pickup',
        value: 'proofOfPickup',
    },
    {
        label: 'Quarantine Application/Coversheet',
        value: 'quarantineApplicationCoversheet',
    },
    {
        label: 'Quarantine Certificate',
        value: 'quarantineCertificate',
    },
    {
        label: 'Quarantine Packing Declaration',
        value: 'quarantinePackingDeclaration',
    },
    {
        label: 'Quarantine Print Preview',
        value: 'quarantinePrintPreview',
    },
    {
        label: 'Quarantine Remote Print',
        value: 'quarantineRemotePrint',
    },
    {
        label: 'Release/ Removal Authority',
        value: 'releaseRemovalAuthority',
    },
    {
        label: 'Scheduled Report',
        value: 'scheduledReport',
    },
    {
        label: 'Shippers Departure Notice',
        value: 'shippersDepartureNotice',
    },
    {
        label: 'Shippers Letter of Instruction',
        value: 'shippersLetterOfInstruction',
    },
    {
        label: 'Shipping Advice',
        value: 'shippingAdvice',
    },
    {
        label: 'Time Slot Confirmation',
        value: 'timeSlotConfirmation',
    },
    {
        label: 'Time Slot Request',
        value: 'timeSlotRequest',
    },
    {
        label: 'Transit Declaration of Commitment',
        value: 'transitDeclarationOfCommitment',
    },
    {
        label: 'Veterinary Certificate',
        value: 'veterinaryCertificate',
    },
    {
        label: 'Warehouse Bill of Lading',
        value: 'warehouseBillOfLading',
    },
    {
        label: 'Warehouse Cartage Advice',
        value: 'warehouseCartageAdvice',
    },
    {
        label: 'Warehouse Pick Order Summary',
        value: 'warehousePickOrderSummary',
    },
    {
        label: 'Withholding Certificate',
        value: 'withholdingCertificate',
    },
    {
        label: 'Others',
        value: 'others',
    },
]
