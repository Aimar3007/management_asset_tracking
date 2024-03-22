import { transportHeader } from '../shipments-details.static'
import SimpleTable from 'components/simple-table/simple-table.component'
import { ITransport } from 'pages/shipments/shipments.interface'

const Transport = (data: ITransport[]) => {
    return (
        <SimpleTable<ITransport>
            headers={transportHeader}
            data={data || []}
            variant="gray"
        />
    )
}

export default Transport
