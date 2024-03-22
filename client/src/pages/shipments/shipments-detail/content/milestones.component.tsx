import SimpleTable from 'components/simple-table/simple-table.component'
import { milestonesHeader } from '../shipments-details.static'
import { IMilestone } from 'pages/shipments/shipments.interface'

const Milestones = (data: IMilestone[] | null) => {
    return (
        <SimpleTable<IMilestone>
            headers={milestonesHeader}
            data={data || []}
            variant="gray"
        />
    )
}

export default Milestones
