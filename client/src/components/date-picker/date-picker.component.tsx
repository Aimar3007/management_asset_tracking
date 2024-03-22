/* eslint-disable no-unused-vars */
import { DayPicker } from 'react-day-picker'
import DatePickerHeader from './date-picker-header.component'
import { IDatePicker } from './date-picker.interface'
import { useDatePicker } from './date-picker.service'
import './date-picker.style.css'
import DatePickerInput from './date-picker-input.component'

const DatePicker = ({
    placeholder,
    disable,
    isRange = false,
    ...props
}: IDatePicker) => {
    const {
        dropdownRef,
        isFutureDate,
        isPastDate,
        showDatePicker,
        setShowDatePicker,
        selectedDate,
        setSelectedDate,
        changeDateHandler,
    } = useDatePicker({
        range: props?.range,
    })

    const disabledBackground = disable ? 'bg-[#e4e7ea]' : 'bg-white'

    return (
        <div>
            <div ref={dropdownRef} className={`w-full`}>
                <DatePickerInput
                    range={props?.range}
                    selectedDate={selectedDate}
                    disable={disable}
                    isRange={isRange}
                    label={props?.label}
                    onClear={() => {
                        props?.onClear && props.onClear()
                        setShowDatePicker(false)
                    }}
                    setShowDatePicker={setShowDatePicker}
                />
                {showDatePicker && (
                    <div className={`${isRange && 'flex justify-center'}`}>
                        <div
                            className={`pickerStyle ${disabledBackground} ${isRange && 'absolute'}`}
                        >
                            <DayPicker
                                month={new Date(selectedDate)}
                                mode={isRange ? 'range' : 'default'}
                                onDayClick={(date) => {
                                    setSelectedDate(date)
                                }}
                                disabled={
                                    props.disableDays === 'future'
                                        ? isFutureDate
                                        : isPastDate
                                }
                                selected={props?.range}
                                components={{
                                    Caption: (props) =>
                                        DatePickerHeader({
                                            ...props,
                                            changeDateHandler,
                                        }),
                                }}
                                onSelect={props?.setRange}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DatePicker
