import { headerCreateBooking } from './create-booking.static'
import Button from 'components/button/button.component'
import { useNavigate } from 'react-router-dom'
import TabContent from 'components/tab-content/tab-content.component'
import './create-booking.style.css'

const CreateBooking = () => {
    const navigate = useNavigate()
    const footerComponent = (activeIndex: number, setActiveIndex: any) => {
        return (
            <div className="footer flex justify-between mt-4">
                <Button
                    label={`CANCEL CREATE`}
                    variant="logistical-white"
                    type="button"
                    className=""
                    onClick={() => {
                        navigate('/bookings')
                    }}
                />
                <Button
                    label={`NEXT STEP`}
                    variant="logistical-white"
                    type="button"
                    className=""
                    onClick={() => {
                        const length = headerCreateBooking.length - 1
                        if (activeIndex < length)
                            setActiveIndex(activeIndex + 1)
                    }}
                />
            </div>
        )
    }
    return (
        <div className="create-booking">
            <div className="header-create-booking flex mx-3 mt-3">
                <TabContent
                    items={headerCreateBooking}
                    className="w-full pb-3"
                    footerComponent={footerComponent}
                />
            </div>
        </div>
    )
}

export default CreateBooking
