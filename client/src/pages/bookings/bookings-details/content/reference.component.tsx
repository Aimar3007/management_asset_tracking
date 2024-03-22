import { referenceNoData } from '../detail-bookings.dummy'
import SimpleTable from 'components/simple-table/simple-table.component'
import { headerReferenceNo } from '../detail-bookings.static'
import { useBookingDetails } from '../detail-bookings.service'
import 'pages/bookings/bookings.style.css'

function ReferenceNoContent() {
    const { noData } = useBookingDetails()
    return (
        <div className="detail-table">
            {referenceNoData.length !== 0 ? (
                <SimpleTable
                    headers={headerReferenceNo}
                    data={referenceNoData}
                />
            ) : (
                noData()
            )}
        </div>
    )
}

export default ReferenceNoContent