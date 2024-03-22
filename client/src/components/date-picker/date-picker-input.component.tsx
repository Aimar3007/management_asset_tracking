/* eslint-disable no-unused-vars */
import Input from 'components/input/input.component'
import './date-picker.style.css'
import { formatDate } from 'common/common.service'
import { IDatePickerInput } from './date-picker.interface'

const DatePickerInput = ({
    selectedDate,
    disable,
    isRange,
    range,
    label,
    onClear,
    setShowDatePicker,
}: IDatePickerInput) => {
    return (
        <div>
            {isRange ? (
                <div
                    className={`flex rounded-[5px] bg-transparent relative gap-2`}
                >
                    <div className="flex w-full relative">
                        <i className="ri-calendar-2-fill absolute left-2 top-[6px] z-[2]"></i>
                        <Input
                            label="Start Date"
                            onClick={() => {
                                setShowDatePicker(true)
                            }}
                            value={
                                range?.from &&
                                formatDate(range?.from?.toString())
                            }
                            className={`text-sm placeholder:text-sm !h-[45px] !w-full pl-8 !text-size-M  ${
                                disable ? 'bg-obo-main-background' : 'bg-white'
                            }`}
                            placeholder={'DD/MM/YYYY'}
                        />
                        {range?.from && (
                            <i
                                className="ri-close-circle-fill absolute right-3 top-2 cursor-pointer"
                                onClick={onClear}
                            ></i>
                        )}
                    </div>
                    <div className="flex w-full relative">
                        <i className="ri-calendar-2-fill absolute left-2 top-[6px] z-[2]"></i>
                        <Input
                            label="End Date"
                            onClick={() => {
                                setShowDatePicker(true)
                            }}
                            value={range?.to && formatDate(range.to.toString())}
                            className={`text-sm placeholder:text-sm !h-[45px] !w-full pl-8 !text-size-M ${
                                disable ? 'bg-obo-main-background' : 'bg-white'
                            }`}
                            placeholder={'DD/MM/YYYY'}
                        />
                        {range?.to && (
                            <i
                                className="ri-close-circle-fill absolute right-3 top-2 cursor-pointer"
                                onClick={onClear}
                            ></i>
                        )}
                    </div>
                </div>
            ) : (
                <div className={`flex`}>
                    <Input
                        onChange={() => {}}
                        onClick={() => {
                            setShowDatePicker(true)
                        }}
                        value={formatDate(selectedDate.toString()) || ''}
                        className={`text-sm placeholder:text-sm caret-transparent !w-[180px] ${
                            disable ? 'bg-obo-main-background' : 'bg-white'
                        }`}
                        label={label}
                        placeholder={'DD/MM/YYYY'}
                    />
                    <div className="icon flex items-center ml-[-2rem] z-[1]"></div>
                </div>
            )}
        </div>
    )
}

export default DatePickerInput
