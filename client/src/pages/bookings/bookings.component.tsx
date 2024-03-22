import Table from 'components/table/table.component'
import Tab from 'components/tab/tab.component'
import { BHeader, TabHeader } from './bookings.static'
import { IBookings } from './bookings.interface'
import { DataBookings, metaDummy } from './bookings.dummy'
import { ITabItem } from 'components/tab/tab.interface'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BookingsPage = () => {
    const [tabFilter, setTabFilter] = useState<ITabItem>()
    const navigate = useNavigate()

    return (
        <div className="bookings container-global">
            <Tab items={TabHeader} onChange={(item) => setTabFilter(item)} />
            <Table<IBookings>
                headers={BHeader}
                data={DataBookings}
                loading={false}
                nextHandling={(page) => {
                    console.log('hit Next API -> ' + page)
                }}
                previousHandling={(page) => {
                    console.log('hit prev API -> ' + page)
                }}
                meta={metaDummy}
                moduleTitle={'Bookings'}
                onRowClick={function (data): void {
                    const id = data
                    navigate('/bookings-detail/' + id)
                }}
                checkboxVisible={true}
                checkboxDataHandling={(data) => {
                    console.log(data)
                }}
                tabFilterItem={tabFilter}
                enableExport={true}
            />
        </div>
    )
}

export default BookingsPage
