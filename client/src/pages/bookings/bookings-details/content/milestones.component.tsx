import SimpleTable from 'components/simple-table/simple-table.component'
import { milestonesData } from '../detail-bookings.dummy'
import { headerMilestones } from '../detail-bookings.static'
import { useBookingDetails } from '../detail-bookings.service'
import 'pages/bookings/bookings.style.css'

function MilestonesContent() {
    const { noData } = useBookingDetails()
    return (
        <div className="detail-table">
            {milestonesData.length !== 0 ? (
                <SimpleTable headers={headerMilestones} data={milestonesData} />
            ) : (
                noData()
            )}
        </div>
    )
}

export default MilestonesContent