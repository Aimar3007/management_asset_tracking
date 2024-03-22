import SimpleTable from 'components/simple-table/simple-table.component'
import { goodsPacksHeader } from '../shipments-details.static'
import { IGoodsOrPacks } from 'pages/shipments/shipments.interface'

const GoodsPacks = (data: IGoodsOrPacks[] | null) => {
    return (
        <SimpleTable<IGoodsOrPacks>
            headers={goodsPacksHeader}
            data={data || []}
            variant="gray"
        />
    )
}

export default GoodsPacks
