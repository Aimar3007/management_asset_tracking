import {
    IDropdown,
    IDropdownItem,
} from 'components/dropdown/dropdown.interface'

export interface IFormDropdown<T = undefined> extends IDropdown<T> {
    name: string
    parentDivClassName?: string
    disabled?: boolean
    showErrorMessage?: boolean
    onlyShowSelectedLabel?: boolean
    // eslint-disable-next-line no-unused-vars
    additionalOnClick?: (value: IDropdownItem<T> | undefined) => void
}
