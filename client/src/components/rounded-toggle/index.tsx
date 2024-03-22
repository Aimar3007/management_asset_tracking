import './style.css'

interface IRoundedToggle {
    handleToggle: () => void
    isActive: boolean | undefined | null
    disable?: boolean
}

export default function RoundedToggle({
    isActive,
    handleToggle,
}: IRoundedToggle): React.ReactElement {
    return (
        <div
            onClick={() => {
                handleToggle()
            }}
            className={`rounded-full w-10 h-0 flex py-1 items-center cursor-pointer rounded-toggle ${
                !isActive ? 'bg-logistical-gray-ver6 ' : 'bg-logistical-blue'
            }`}
        >
            <div
                className={`w-5 h-5 border-2  bg-white rounded-full transform transition-transform ${
                    isActive ? 'translate-x-7 border-logistical-blue' : ''
                }`}
            />
        </div>
    )
}
