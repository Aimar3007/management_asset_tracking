import { useState, ChangeEvent } from 'react'
import Input from 'components/input/input.component'
import { ITimePicker } from './time-picker.interface'
import './time-picker.style.css'

const TimePicker = (props: ITimePicker) => {
    const [time, setTime] = useState<string>('')

    function handleTimeChange(e: ChangeEvent<HTMLInputElement>) {
        setTime(e.target.value)
    }

    return (
        <div className="time-picker-container w-full">
            <Input
                type="time"
                value={time}
                onChange={handleTimeChange}
                className={`${props.className}`}
                label={props.label}
            />
        </div>
    )
}

export default TimePicker
