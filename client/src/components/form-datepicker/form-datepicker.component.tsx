/* eslint-disable no-unused-vars */
import { ErrorMessage, useField } from 'formik'
import { IFormInput } from './form-datepicker.interface'
import Input from 'components/input/input.component'
import TogglePassword from 'components/toggle-password/toggle-password.component'
import { useState } from 'react'
import DatePicker from 'components/date-picker/date-picker.component'

const FormDatepicker = ({
    readonly = false,
    disabled = false,
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

    return (
        <div className={`${parentDivClassName} mb-3`}>
            <div className="flex relative">
                {/* <Input
                    {...props}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                    placeholder={props.placeholder}
                    className={`${borderColorClass} ${props.className}`}
                    readonly={readonly}
                /> */}
                <DatePicker isRange={false} {...props} />
            </div>

            <div
                className={`ml-small-x text-size-XS text-red-500 ${errorClassMessage}`}
            >
                <ErrorMessage name={props.name} component="p" />
            </div>
        </div>
    )
}

export default FormDatepicker
