import { IDropdownItem } from 'components/dropdown/dropdown.interface'
import { IModuleAdjustment } from './user-access-form.interface'

export const userLevelItems: IDropdownItem[] = [
    { label: 'ADMIN USER', value: 'admin' },
    { label: 'SUPER USER', value: 'admin' },
    { label: 'REGULAR USER', value: 'admin' },
]

export const clientItems: IDropdownItem[] = [
    { label: 'ONEBYONEAUS', value: 'oboaus' },
    { label: 'ONEBYONESG', value: 'obosg' },
]
export const siteItems: IDropdownItem[] = [
    { label: 'SITE A', value: 'site_a' },
    { label: 'SITE B', value: 'site_b' },
    { label: 'SITE C', value: 'site_c' },
]

export const menuAdjustmentList: IModuleAdjustment[] = [
    { label: 'Dashboard', key: 'dashboard', selected: false },
    { label: 'Warehouse', key: 'warehouse', selected: false },
    { label: 'Quatation', key: 'quatation', selected: false },
    { label: 'Port Transport', key: 'portTransport', selected: false },
    { label: 'Forwarding', key: 'forwarding', selected: false },
    { label: 'Accounts', key: 'accounts', selected: false },
    { label: 'Linear Agency', key: 'linearAgency', selected: false },
    { label: 'User', key: 'user', selected: false },
]
