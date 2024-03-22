import SimpleTable from 'components/simple-table/simple-table.component'
import { IContainer } from 'pages/shipments/shipments.interface'
import { containerHeader } from '../shipments-details.static'

const Containers = (data: IContainer[]) => {
    return (
        <SimpleTable<IContainer>
            headers={containerHeader}
            data={data || []}
            variant="gray"
        />
    )
}

export default Containers
