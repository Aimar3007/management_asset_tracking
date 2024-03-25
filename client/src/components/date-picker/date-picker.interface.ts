/* eslint-disable no-unused-vars */
import { DateRange } from 'react-day-picker'

export interface IDatePickerHeader {
    changeDateHandler: (date: Date) => void
}

export interface IDatePicker {
    label?: string
    placeholder?: string
    className?: string
    onClear?: () => void
    disable?: boolean
    isRange: boolean
    setRange?: any
    range?: any
    iconPosition?: 'left' | 'right'
    disableDays?: 'future' | 'past'
}
export interface IDatePickerInput {
    selectedDate: Date
    disable?: boolean
    isRange: boolean
    range?: DateRange
    label?: string
    onClear?: () => void
    setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>
}
