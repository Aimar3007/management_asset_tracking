import { useEffect, useRef, useState } from 'react'
import { IInput } from './input.interface'
import './input.style.css'

const Input = ({
    disabled = false,
    readonly = false,
    required = false,
    type = 'text',
    ...props
}: IInput) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [focus, setFocus] = useState(false)
    const showLabelClass = !props.label || props.label === '' ? 'hidden' : ''
    const isRequired = required
        ? 'before:content-["*"] before:text-logistical-red-ver1 before:pr-[3px]'
        : ''
    const isFocus = focus ? 'text-green' : 'text-dark-green'
    const isDisabled = disabled ? 'disabled' : ''
    const handleFocusEvent = () => {
        setFocus(true)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setFocus(false)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <div className={`inputParent-style flex`}>
            <label className={`${showLabelClass}`}>
                <div>
                    <p className={`${isRequired} ${isFocus}`}>{props.label}</p>
                </div>
            </label>
            <input
                {...props}
                ref={inputRef}
                disabled={disabled}
                className={`${props.className} ${isDisabled}`}
                placeholder={props.placeholder}
                type={type}
                value={props.value}
                readOnly={readonly}
                onChange={(e) => {
                    if (props.onChange) props.onChange(e)
                }}
                onFocus={handleFocusEvent}
            />
            {props?.className && (
                <i className={`${props.icon} mt-[5px] ml-[-2.3rem]`}></i>
            )}
        </div>
    )
}

export default Input
