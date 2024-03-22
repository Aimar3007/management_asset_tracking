import moment from 'moment'
import { useEffect, useRef, useState } from 'react'

export function useDatePicker({ range }: any) {
    // state
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    // variable
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // handle event listener
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscapeKey)
    }, [])

    // handle close range selected date
    useEffect(() => {
        if (range.to && range.from) setShowDatePicker(false)
    }, [range.to, range.from])

    // fucntion event listener
    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as HTMLDivElement)
        ) {
            setShowDatePicker(false)
        }
    }
    // fucntion event listener
    const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setShowDatePicker(false)
        }
    }

    // function set feature date
    function isFutureDate(date: Date) {
        return moment(date).isAfter(moment())
    }

    // function set past date
    function isPastDate(date: Date) {
        return moment(date).isBefore(moment())
    }

    // change date
    const changeDateHandler = (date: Date) => {
        setSelectedDate(date)
    }

    return {
        isFutureDate,
        isPastDate,
        setShowDatePicker,
        setSelectedDate,
        changeDateHandler,
        showDatePicker,
        selectedDate,
        dropdownRef,
    }
}
