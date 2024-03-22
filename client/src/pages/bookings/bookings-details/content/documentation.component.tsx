import { documentData } from '../detail-bookings.dummy'
import SimpleTable from 'components/simple-table/simple-table.component'
import { useBookingDetails } from '../detail-bookings.service'
import 'pages/bookings/bookings.style.css'

function DocumentationContent() {
    const {
        reArrangeDocumentTable,
        docData,
        noData,
    } = useBookingDetails()
    return (
            <div className="detail-table">
                {documentData.length !== 0 ? (
                    <div>
                        <SimpleTable
                            headers={reArrangeDocumentTable()}
                            data={docData}
                            disableLastRowHover={true}
                        />
                    </div>
                ) : (
                    noData()
                )}
            </div>
    )
}

export default DocumentationContent