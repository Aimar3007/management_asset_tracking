/* eslint-disable no-unused-vars */
export interface ICheckbox<T> {
    value?: T
    isChecked?: boolean
    onChecked: (data: T | boolean) => void
}
