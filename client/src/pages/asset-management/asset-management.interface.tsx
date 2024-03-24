import { IDropdownItem } from 'components/dropdown/dropdown.interface'

export interface IAssetManagementFilter {
    name?: IDropdownItem
    brand?: IDropdownItem
    user?: IDropdownItem
    description?: string
}

export interface IAMFileterOptions {
    names?: IDropdownItem[]
    brands?: IDropdownItem[]
    users?: IDropdownItem[]
}
