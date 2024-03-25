import { IDropdownItem } from "components/dropdown/dropdown.interface"

export interface IRAFilter {
    typeTransactionAsset?: IDropdownItem
    statusTransactionAsset?: IDropdownItem
    user?: IDropdownItem
    description?: string
}

export interface IRAFileterOptions {
    typeTransactionAsset?: IDropdownItem[]
    statusTransactionAsset?: IDropdownItem[]
    user?: IDropdownItem[]
}