import { ICheckbox } from './checkbox.interface'
import { useEffect, useState } from 'react'

function Checkbox<T>({ isChecked = false, value, onChecked }: ICheckbox<T>) {
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(isChecked)
    }, [isChecked])

    return (
        <input
            className={`rounded-logistical-radius-2 cursor-pointer checked:bg-none checked:bg-logistical-blue-ver3 border-logistical-gray-ver1`}
            type="checkbox"
            checked={checked}
            onClick={() => {
                const val: boolean = !checked
                setChecked(val)
                if (val === true) {
                    onChecked(value ?? true)
                } else {
                    onChecked(false)
                }
            }}
            onChange={() => {}}
        />
    )
}

export default Checkbox
