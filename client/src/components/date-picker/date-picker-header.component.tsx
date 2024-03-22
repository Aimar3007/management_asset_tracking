import moment from 'moment'
import { useNavigation } from 'react-day-picker'
import { IDatePickerHeader } from './date-picker.interface'

export default function DatePickerHeader({
    changeDateHandler,
}: IDatePickerHeader) {
    const { currentMonth, nextMonth, previousMonth } = useNavigation()

    // set next month
    const nextMonthHandler = () => {
        const next = nextMonth ?? currentMonth
        changeDateHandler(next)
    }

    // set prev month
    const prevMonthHandler = () => {
        const prev = previousMonth ?? currentMonth
        changeDateHandler(prev)
    }

    // set next year
    const nextYearHandler = () => {
        const nextYear = Number(moment(nextMonth).format('YYYY')) + 1
        const parseToDate = new Date(nextYear, moment(currentMonth).month())
        changeDateHandler(parseToDate)
    }

    // set prev year
    const prevYearHandler = () => {
        const prevYear = Number(moment(previousMonth).format('YYYY')) - 1
        const parseToDate = new Date(prevYear, moment(currentMonth).month())
        changeDateHandler(parseToDate)
    }

    return (
        <div>
            <div className="flex items-center w-[280px] mb-2 mt-2 justify-evenly">
                <ul className="header">
                    <li onClick={prevMonthHandler}>
                        <i className="ri-arrow-left-s-line"></i>
                    </li>

                    <li className="w-[45px] text-size-XS font-bold text-logistical-blue-ver3">
                        <label>{moment(currentMonth).format('MMM')}</label>
                    </li>

                    <li onClick={nextMonthHandler}>
                        <i className="ri-arrow-right-s-line"></i>
                    </li>
                </ul>

                <ul className="header">
                    <li onClick={prevYearHandler}>
                        <i className="ri-arrow-left-s-line"></i>
                    </li>

                    <li className="w-[45px] text-size-XS font-bold text-logistical-blue-ver3">
                        <label>{moment(currentMonth).format('YYYY')}</label>
                    </li>

                    <li onClick={nextYearHandler}>
                        <i className="ri-arrow-right-s-line"></i>
                    </li>
                </ul>
            </div>
        </div>
    )
}
