import { IDropdownItem } from 'components/dropdown/dropdown.interface'

// export interface IAssetManagementPayload {
//     name?: string
//     brand?: string
//     user?: string
//     description?: string
// }

export interface IAssetManagementFilter {
    name?: IDropdownItem
    brand?: IDropdownItem
    user?: IDropdownItem
    description?: string
}
