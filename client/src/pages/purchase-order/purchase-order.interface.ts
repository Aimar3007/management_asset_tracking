import { IDropdownItem } from 'components/dropdown/dropdown.interface'
import { DateRange } from 'react-day-picker'
import { IPoLineItem } from './purchase-order-detail/purchase-order-detail.interface'

export interface IPurchaseOrder {
    statusTransaction: string
    id: string
    po_number: number | string
    material: string
    material_desc: string
    hs_code: number | string
    color: string
    size: string
    quantity: string
    status: string
    vendor: string
    consignee: string
    shipper: string
    shipmentInProgress: string
    totalAmount: string
    totalQty: string
    totalLineItem: number
    currency: string
    poDate: string
    fillStatus: string
    updatedAt: string
    poNo: string
    poLines: IPoLineItem[]
    selected: boolean
}

export interface IPurchaseOrderStatusTotal {
    all: number
    open: number
    inProgress: number
    canceled: number
    closed: number
}

export interface IPurchaseOrderFilterParams {
    search?: string
    status?: string
    pageSize?: number
    pageNumber?: number
}

export interface IPurchaseOrderFilterBody {
    poNo?: string
    vendors?: string[]
    consignees?: string[]
    shippers?: string[]
    creators?: string[]
    fillStatuses?: string[]
    statuses?: string[]
    poDateFrom?: Date | null
    poDateTo?: Date | null
    updaters?: string[]
}

export interface IPoFilterDropdownOptions {
    vendors: IDropdownItem[]
    updatedsBy: IDropdownItem[]
    fillStatuses: IDropdownItem[]
}

export interface IPoFilterDropdown {
    vendors: IDropdownItem[]
    updatedByUsers: IDropdownItem[]
    fillStatuses: IDropdownItem[]
    range: { from: Date | string; to: Date | string } | DateRange
    poStatus: IDropdownItem[]
}

export interface IPurchaseOrderStatusPayload {
    id: string
    status: string
    reason?: string
}

export interface IPurchaseOrderDetailPayload {
    uuid: string
}

export interface ISetFilter {
    vendors?: IDropdownItem | null
    fillStatuses?: IDropdownItem | null
    updatedByUsers?: IDropdownItem | null
    range?: DateRange
    poStatus?: IDropdownItem | null

    setState?: React.Dispatch<React.SetStateAction<any>>
}
