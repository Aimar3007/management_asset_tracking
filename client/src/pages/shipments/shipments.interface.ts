import { IDropdownItem } from 'components/dropdown/dropdown.interface'
import { DateRange } from 'react-day-picker'

export interface IDetailData {
    title: string
    value: string
}

// redesign
export interface IShipment2 {
    shipmentID: string
    transport: string
    origin: string | null
    destination: string | null
    shipper: string | null
    consignee: string | null
    etd: string | null
    eta: string | null
    weight: number
    uw: string
    volume: number
    uv: string
    houseBill: string
    chargeable: number
    goodValue: number
    containerMode: string
    shipmentType: string
    containerType: string | null
    voyageOrFlight: string | null
    wv: string | null
    inners: string | null
    insuranceValue: number
    description: string | null
    marksAndNumber: string | null
    incoterm: string | null
    additionalTerm: string | null
    spotRate: number
    serviceRate: string | null
    serviceLevel: string | null
    entryDetails: string | null
    issueDate: string | null
    expiryDate: string | null
    releaseType: string | null
    chargeApply: string | null
    packs: number
    screeningStatus: string
    shipmentStatus: string
    phase: string | null
    efreightStatus: string | null
    size: number
    milestone: IMilestone[] | null
    goodOrPacks: IGoodsOrPacks[] | null
    containers: IContainer[]
    poLines: string | null
    carrier: string | null
    transports: ITransport[]
    relatedInvoices: IRelatedInvoice[]
    poAttached: any
    eDocumentationDetails: IEDocumentationDetails[]
    routeCode: any
    supplierInvoice: string
    packsType: string
    innersType: string
    goodValueCurrency: string
    insuranceValueCurrency: string
    addressDetails: IAddressDetails[]

    // delete this field when there are no missing fields
    dataNull: null
    addressNull?: null
    shippingDate?: null
    chargesApply?: null
    atd?: string
    ata?: string
}

export interface IAddressDetails {
    companyName: string
    address: string[]
    addressType: string | null
    phone: string
    email: string
    fax: string
}
export interface IEDocumentationDetails {
    id: string
    shipmentNo: string
    fileName: string
    documentType: string
    datedAdded: string
}

export interface IRelatedInvoice {
    invoiceNumber: string
    issue: string
    type: string
    terms: null
    invDate: string
    dueDate: string
    currency: string
    amount: number
    outstandingAmount: number
    paidDate: string
}

export interface IContainer {
    containerNo: string
    shipmentNo: string | null
    sealNo: string
    containerType: string
    containerMode: string | null
    emptyReturnedOn: string | null
    tareWeight: number
    goodWeight: number
    deliveryMode: string
    estDelivery: string | null
    estReturn: string | null
    actReturn: string | null
    containerParkEmptyReturnGateIn: string
}

export interface ITransport {
    legOrder: number
    transportMode: string
    legType: string
    forwardingConsole: string
    waybillNumber: string
    vesselName: string
    voyageFlightNo: string
    portOfLoading: string
    portOfDischarge: string
    etd: string
    eta: string
    ata: string
    bookingStatus: string
    carrier: string
}

export interface IMilestone {
    description: string
    parrentJob: string
    sequence: number
    eventCode: string
    estimatedDate: string
    actualStart: string
    conditionReference: string
    conditionType: string
    leg: string | null
    mode: string | null
    parent: string | null
    bill: string | null
    vessel: string | null
}

export interface IGoodsOrPacks {
    pieces: string | null
    quantity: number
    packType: string
    length: number
    width: number
    height: number
    ud: string
    weight: number
    uw: string
    volume: number
    uv: string
    description: number
    marksAndNumber: string
    action: string | null
}

export interface IShipmentsFilter {
    status?: string
    inProgressStat?: string
    pageSize?: number
    pageNumber?: number
    search?: string
    shipmentId?: string
    SortBy?: string
    transport?: string[]
    origin?: string[]
    destination?: string[]
    consignee?: string[]
    shipper?: string[]
    ETAStart?: string
    ETAEnd?: string
    ETDStart?: string
    ETDEnd?: string
    ATDStart?: string
    ATDEnd?: string
    ATAStart?: string
    ATAEnd?: string
}

export interface IShipmentStatusTotal {
    inprogress: {
        count: number
        child: {
            booked: number
            shipped: number
            delivered: number
            infactory: number
        }
    }
    confirmed: number
}

export interface ITransportSchedule {
    from: Date | string
    to: Date | string
}

export interface IShipmentFilterDropdown {
    transportScheduleOption: IDropdownItem
    transportSchedule: Record<string, ITransportSchedule | DateRange>
    transport?: IDropdownItem[]
    origin?: IDropdownItem[]
    destination?: IDropdownItem[]
    consignee?: IDropdownItem[]
    shipper?: IDropdownItem[]
    sortBy?: IDropdownItem
}

export interface IGetShipmentFilterDropdownData {
    transport: string[]
    origin: string[]
    destination: string[]
    consignee: string[]
    shipper: string[]
}

export interface IGetShipmentFilterDropdownDataParams {
    transport?: string
    origin?: string
    destination?: string
    consignee?: string
    shipper?: string
}

export interface IShipmentFilterDropdownOptions {
    transport: IDropdownItem[]
    origin: IDropdownItem[]
    destination: IDropdownItem[]
    consignee: IDropdownItem[]
    shipper: IDropdownItem[]
}
