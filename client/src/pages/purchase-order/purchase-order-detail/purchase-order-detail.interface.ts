/* eslint-disable no-unused-vars */
import { IButton } from 'components/button/button.interface'
import { IUseModal } from 'components/modal/modal.service'

export interface IPODetail {
    id: string
    poNo: string
    vendor: string
    piNumber: string
    piDelivery: string
    poDate: string
    status: string
    buyer: string
    shippers: any[]
    rejectedReason: string
    fillStatus: string
    createBy: string
    createdAt: string
    updatedAt: string
    contactInfo?: string
}

export interface IPoLineItem {
    id: string
    lineId: string
    poId: string
    poNo: string
    itemdesc: string
    qtyPo: string // total qty dari PO ini
    price: string
    amount: string
    colorcode: string
    size: string
    matcontents: string
    hsCode: string
    unit: string
    shipment: IItemShipment
    selected: boolean
    qtyAvailable: number
    poShipments: IPoShipment[] // Shipment related with this qty
    totalPoShipments: number // QTY In Ship
    goodFrom: string
    goodFromLabel: string
}

export interface IPoShipment {
    isInShip: boolean
    isReceived: boolean
    isReturned: boolean
    isToShip: boolean
    qty: number
    shipmentNo: string
    isConfirmed: boolean
}

export interface IItemShipment {
    totalQty?: string
    totalShipments?: number
    shipmentItem: {
        total?: number
        itemsInShip: number
        itemsToShip: number
    }
    deliveryStatus: {
        total?: number
        received: number
        returned: number
    }
}

export interface IComponentByStatus {
    label: string
    accessor: string
    className: string
    client: IIndexComponent
    dataPoLine: IPoLineItem[]
}

export interface IComponent {
    accessor?: string
    buttonPo?: IButtonPo
    modal?: any
    buttonViewCancelationReason?: boolean
    buttonProcessPo?: boolean
    buttonTrackShipment?: boolean
}

export interface IButtonPo extends IButton {
    modalClick?: (data: any) => void
}

export interface ITrackerPoHistory {
    statusPo: string
    description: string
    user: string
    date: string
}

export interface IModalContent {
    modal: (props: {
        data: any
        setDummyCancelReason: (reason: string) => void
        setData: (updateData: (data: any) => void) => void
        setToast: (value: boolean) => void
    }) => {
        modalUser: IUseModal
        content: () => JSX.Element
        toast: {
            header: string
            message: string
            type: string
        }
    }
}

export interface IIndexComponent {
    [accessor: string]: IComponent | null
}

export interface ITrackerPo {
    statusPo: string
    description: string
    user: string
    date: string
}

export interface IHistories {
    id: string
    poId: string
    title: string
    description: string
    byUserId: string
    byUserName: string
    at: string
}

export type IButtonStatusConfigTmp = Pick<IButton, 'variant' | 'label'>
export interface IButtonStatusConfig extends IButtonStatusConfigTmp {
    isButtonVisible?: boolean
    nextStatus?: string
    onClick?: () => void
}
