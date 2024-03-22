import { ErrorMessage, useField } from 'formik'
import { IFormDropdown } from './form-dropdown.interface'
import Dropdown from 'components/dropdown/dropdown.component'

function FormDropdown<T>({
    options = [],
    parentDivClassName = '',
    showErrorMessage = true,
    additionalOnClick,
    onlyShowSelectedLabel,
    ...props
}: IFormDropdown<T>) {
    //formik
    // eslint-disable-next-line no-unused-vars
    const [field, meta, helpers] = useField(props.name)

    const selectedItem = options.find((x) => {
        return x.value === field.value
    })

    const borderColorClass =
        meta.error && meta.touched ? '!border-logistical-red-ver1' : ''

    const isError = !(!meta.error || (meta.error && !meta.touched))
    const errorClassMessage = isError ? '' : 'hidden'

    if (onlyShowSelectedLabel)
        return (
            <div className={`${parentDivClassName}`}>
                {selectedItem?.label ?? '-'}
            </div>
        )
    return (
        <div className={`${parentDivClassName} mb-3`}>
            <Dropdown<T>
                options={options}
                onClick={(change) => {
                    helpers.setValue(change?.value)
                    additionalOnClick && additionalOnClick(change)
                }}
                className={` ${props.className}`}
                parentDivClassname={borderColorClass}
                value={selectedItem}
                {...props}
            />
            <div
                className={`ml-small-x text-size-XS text-red-500 ${!showErrorMessage ? 'hidden' : errorClassMessage}`}
            >
                <ErrorMessage name={props.name} component="p" />
            </div>
        </div>
    )
}

export default FormDropdown
