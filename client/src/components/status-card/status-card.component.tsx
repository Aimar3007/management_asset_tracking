import { IStatusCard } from './status-card.interface'
import { getStatusClass } from './status-card.service'

const StatusCard = ({ status }: IStatusCard) => {
    const statusClass = getStatusClass(status)
    return (
        <span
            className={`${statusClass.bgClass} ${statusClass.textClass} font-normal py-2 px-[10px] rounded text-size-M`}
        >
            {status.toUpperCase()}
        </span>
    )
}

export default StatusCard
