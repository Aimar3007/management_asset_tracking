/* eslint-disable no-unused-vars */
export interface IDropdownItem<T = undefined> {
    label: string | number
    value: string | number
    selected?: boolean
    disable?: boolean
    additionalData?: T
}

export interface IDropdown<T = undefined> {
    required?: boolean
    label?: string
    options?: IDropdownItem<T>[]
    onClick?: (value: IDropdownItem<T> | undefined) => void
    additionalDataHandling?: (value: T | null) => void
    className?: string
    parentDivClassname?: string
    placeholder?: string
    selectedItem?: (value: IDropdownItem<T> | IDropdownItem<T>[]) => void
    readonly?: boolean
    disabled?: boolean
    isLoading?: boolean
    isClearable?: boolean
    isSearchable?: boolean
    onInputChange?: (value: string) => void
    dropDownIndicator?: boolean
    selectedProps?: IDropdownItem
    value?: any
    isMultiSelect?: boolean
    useBorder?: boolean
    isAsync?: boolean
    loadOptions?: any
    defaultOptions?: any
    onChange?: any
}
