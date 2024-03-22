import { IAlert } from './alert.interface'
import './alert.style.css'

const Alert = ({ label, type, className }: IAlert) => {
    const alertClass = 'alert-' + type
    return (
        <div className={`${className} ${alertClass} px-4 py-2 rounded-md mb-2`}>
            {label}
        </div>
    )
}

export default Alert
