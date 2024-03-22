import { ErrorMessage, useField } from 'formik'
import { IFormInput } from './form-input.interface'
import Input from 'components/input/input.component'
import TogglePassword from 'components/toggle-password/toggle-password.component'
import { useState } from 'react'

const FormInput = ({
    readonly = false,
    disabled = false,
    type = 'text',
    parentDivClassName = '',
    hideError = false,
    ...props
}: IFormInput) => {
    //formik
    const [field, meta] = useField(props.name)
    const borderColorClass =
        meta.error && meta.touched ? '!border-logistical-red-ver1 ' : ''
    const isError = !(!meta.error || (meta.error && !meta.touched))
    const errorClassMessage = isError && !hideError ? '' : 'hidden'

    // PasswordVisible
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    return (
        <div className={`${parentDivClassName} mb-3`}>
            <div className="flex relative">
                <Input
                    {...props}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                    type={
                        type !== 'password'
                            ? type
                            : isPasswordVisible
                              ? 'text'
                              : 'password'
                    }
                    placeholder={props.placeholder}
                    className={`${borderColorClass} ${props.className}`}
                    readonly={readonly}
                />

                {type === 'password' ? (
                    <TogglePassword
                        isPasswordVisible={isPasswordVisible}
                        toggleVisibility={togglePasswordVisibility}
                    />
                ) : (
                    <></>
                )}
            </div>

            <div
                className={`ml-small-x text-size-XS text-red-500 ${errorClassMessage}`}
            >
                <ErrorMessage name={props.name} component="p" />
            </div>
        </div>
    )
}

export default FormInput
