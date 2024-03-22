import { ISquareToggle } from './square-toggle.interface'
import './square-toggle.style.css'

export default function SquareToggle({
    setHandleToggle,
    ...props
}: ISquareToggle): React.ReactElement {
    return (
        <div
            className={`flex square-toggle absolute ${
                props.handleToggle
                    ? 'bg-logistical-gray-ver4'
                    : 'bg-logistical-gray-ver5'
            }`}
            onClick={() => setHandleToggle(!props.handleToggle)}
        >
            <div
                className={`inner-square ${
                    props.handleToggle
                        ? 'off bg-logistical-gray-ver6'
                        : 'on bg-white'
                } relative z-10`}
            ></div>
            <label
                className={`absolute z-20 -translate-x-10 font-bold text-size-M ${
                    props.handleToggle
                        ? 'text-logistical-gray-ver4'
                        : 'text-logistical-gray-ver3'
                }`}
            >
                {'Dark'}
            </label>
            <label
                className={`absolute z-20 translate-x-10 font-bold text-size-M ${
                    props.handleToggle
                        ? 'text-logistical-gray-ver3'
                        : 'text-logistical-gray-ver4'
                }`}
            >
                {'Light'}
            </label>
        </div>
    )
}
