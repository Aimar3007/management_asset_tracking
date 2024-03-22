export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    name?: string
    label?: string
    type?: string
    value?: string
    readonly?: boolean
    required?: boolean
    disabled?: boolean
    icon?: string
}
