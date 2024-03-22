import { useBookingDetails } from '../detail-bookings.service'
import 'pages/bookings/bookings.style.css'

const DetailsContent = () => {
    const { getBookingDetail, getCompanyDetail } = useBookingDetails()

    return (
        <div className="detail-content">
            <div className="content-left">{getBookingDetail()}</div>
            <div className="content-right">{getCompanyDetail()}</div>
        </div>
    )
}

export default DetailsContent