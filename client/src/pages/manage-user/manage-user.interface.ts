import { IDropdownItem } from "components/dropdown/dropdown.interface"

export interface IUMFilter {
    status?: IDropdownItem
    city?: IDropdownItem
    userName?: string
}

export interface IMUFileterOptions {
    status?: IDropdownItem[]
    city?: IDropdownItem[]
}