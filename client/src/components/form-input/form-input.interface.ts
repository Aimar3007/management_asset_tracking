import { IInput } from 'components/input/input.interface'

export interface IFormInput extends IInput {
    name: string
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    className?: string
    parentDivClassName?: string
    type?: string
    icon?: string
    hideError?: boolean
}
