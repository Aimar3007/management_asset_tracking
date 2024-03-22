import SimpleTable from 'components/simple-table/simple-table.component'
import { relatedInvoiceHeader } from '../shipments-details.static'

const RelatedInvoice = (data: any) => {
    return (
        <SimpleTable
            headers={relatedInvoiceHeader}
            data={data || []}
            variant="gray"
        />
    )
}

export default RelatedInvoice
