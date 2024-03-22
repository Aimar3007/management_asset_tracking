import { IButton } from './button.interface'
import './button.style.css'

const Button = ({
    type = 'button',
    isDisabled = false,
    onClick,
    isLoading = false,
    variant = 'logistical-white',
    useUpperCase,
    label = '',
    ...props
}: IButton) => {
    const disableButton = isLoading ? true : isDisabled
    const newLabel = useUpperCase ? label?.toUpperCase() : label
    const customLabel = isLoading ? (
        'PLEASE WAIT'
    ) : (
        <>
            {!props.icon ? undefined : (
                <>
                    <i className={`${props.icon} ${props.iconClassName}`} />
                </>
            )}
            {newLabel}

            {!props.iconSuffix ? undefined : (
                <div>
                    <i
                        className={`${props.iconSuffix} ${props.iconClassName}`}
                    />
                </div>
            )}
        </>
    )
    const buttonVariant = 'variant-' + variant
    return (
        <button
            {...props}
            type={type}
            disabled={disableButton}
            onClick={() => {
                onClick()
            }}
            className={`${buttonVariant} ${props.className}`}
        >
            {customLabel}
        </button>
    )
}
export default Button
