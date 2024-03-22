import { goodsData } from '../detail-bookings.dummy'
import SimpleTable from 'components/simple-table/simple-table.component'
import { headerGoods } from '../detail-bookings.static'
import { useBookingDetails } from '../detail-bookings.service'
import 'pages/bookings/bookings.style.css'

function GoodsContent() {
    const { noData } = useBookingDetails()
    return (
        <div className="detail-table">
            {goodsData.length !== 0 ? (
                <SimpleTable headers={headerGoods} data={goodsData} />
            ) : (
                noData()
            )}
        </div>
    )
}

export default GoodsContent