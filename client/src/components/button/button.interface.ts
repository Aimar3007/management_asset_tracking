/* eslint-disable no-unused-vars */
export interface IButton
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    onClick: () => void
    label?: string
    icon?: string // Icon Prefix
    iconSuffix?: string
    type?: 'button' | 'submit'
    variant?:
        | 'logistical-lightblue'
        | 'logistical-lightblue-invert'
        | 'logistical-breadcrumb'
        | 'logistical-darkblue'
        | 'logistical-white'
        | 'secondary'
        | 'danger'
        | 'danger-fill'
        | 'primary'
    isDisabled?: boolean
    isLoading?: boolean
    className?: string
    iconClassName?: string
    toggle?: boolean
    isActive?: boolean
    useUpperCase?: boolean
}
