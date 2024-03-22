import { useBookingDetails } from '../detail-bookings.service'
import 'pages/bookings/bookings.style.css'

function AdditionalInformationContent() {
    const { getAdditionalInformation } = useBookingDetails()

    return (
        <div className="detail-content">
             <div className='additional-information'>{getAdditionalInformation()}</div>
        </div>
    )
}

export default AdditionalInformationContent