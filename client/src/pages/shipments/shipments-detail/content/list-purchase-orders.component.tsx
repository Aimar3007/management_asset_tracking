/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { IPurchaseOrder } from 'pages/purchase-order/purchase-order.interface'
import {
    // listPurchaseOrdersHeader,
    poLinesHeaders,
} from '../shipments-details.static'
import TableExpandable from 'components/table-expandable/table-expandable.component'
import { ISTColumn } from 'components/simple-table/simple-table.interface'
import { useSelector } from 'react-redux'
import { IUserAuth } from 'repository/data/user-auth.interface'
import { userDataSelector } from 'pages/login/login.slice'

const ListPurchaseOrders = (
    data: any,
    listPurchaseOrdersHeader: ISTColumn<IPurchaseOrder>[],
) => {
    const user: IUserAuth = useSelector(userDataSelector)
    return (
        <TableExpandable
            headerParent={listPurchaseOrdersHeader}
            headerChild={poLinesHeaders}
            childAccessor="poLine"
            data={data || []}
            notFoundMessage={
                user.organizationCode === 'jpl'
                    ? 'Please Attach PO'
                    : 'No PO Attached'
            }
        />
    )
}

export default ListPurchaseOrders
