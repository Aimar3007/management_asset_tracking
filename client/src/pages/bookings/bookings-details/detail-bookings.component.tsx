import { useNavigate } from 'react-router-dom'
import 'pages/bookings/bookings.style.css'
import Button from 'components/button/button.component'
import { useContent } from './detail-bookings.content'

const BookingsDetail = () => {
    const navigate = useNavigate()

    return (
        <div className="detail-container booking-detail">
            {useContent()}
            <div className="border-t-2 border-logistical-gray-ver3 flex justify-between">
                <div className="w-[125px] m-4">
                    <Button
                        label="Back"
                        variant="logistical-white"
                        className="w-btnSmallWidth"
                        onClick={() => {
                            navigate('/bookings')
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default BookingsDetail
