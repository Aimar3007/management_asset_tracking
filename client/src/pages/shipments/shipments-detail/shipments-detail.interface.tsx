import { ISTColumn } from 'components/simple-table/simple-table.interface'
import { IShipment2 } from '../shipments.interface'

/* eslint-disable no-unused-vars */
export interface IShipmentDetails {}

export interface IPropertyUpdateStatus {
    onSubmit: () => void
    message: string
    action: string
}

export interface IPillSAddressesDetailsHeader {
    shipper: JSX.Element
    consignee: JSX.Element
    localClient: JSX.Element
}

export interface IPillsShippingDetailsHeader {
    information: JSX.Element
    descriptionsAndIntructions: JSX.Element
}

export interface IShippingDetails {}

export interface IShippingDetailsHeader {
    shippingDetails: ISTColumn<IShipment2>[]
    mode: ISTColumn<IShipment2>[]
}
