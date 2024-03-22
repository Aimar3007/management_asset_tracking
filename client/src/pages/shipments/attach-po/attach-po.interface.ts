/* eslint-disable no-unused-vars */
import { IMeta } from 'common/common.interface'
import { IUseModal } from 'components/modal/modal.service'
import { FormikContextType } from 'formik'
import { IPoLineItem } from 'pages/purchase-order/purchase-order-detail/purchase-order-detail.interface'
import { IPurchaseOrder } from 'pages/purchase-order/purchase-order.interface'
import { IShipment2 } from '../shipments.interface'

export interface IUseAttachPO {
    //shipment
    id?: string
    shipmentDetailsData: IShipment2

    //PO
    attachPoModalService: IUseModal
    attachPoLinesModalService: IUseModal
    deletePoModalService: IUseModal
    deletePoLineModalService: IUseModal
    temporarySelectedPO: IPurchaseOrder[]
    selectedPO: IPurchaseOrder[]
    poData: IPurchaseOrder[]
    poDataMeta: IMeta
    loading: boolean
    proceedPurchaseOrder: () => void
    setTemporarySelectedPO: (values: IPurchaseOrder[]) => void
    loadData: (search?: string) => void
    setPageData: (page: number) => void
    setPagePoLineData: (page: number) => void

    // PO Lines
    poLinesData: IPoLineItem[]
    poLinesMeta: IMeta
    poLinesSelected: IPoLineItem[]
    poLinesSelectedTemporary: IPoLineItem[]
    poLinesLoading: boolean
    searchPoLines: (search: string) => void
    proceedPurchaseOrderLines: () => void
    setTemporarySelectedPoLines: (values: IPoLineItem[]) => void

    // helper
    loadingDetailData: boolean
    submitLoading: boolean
    poLinesResetCheckedData: boolean
    resetPoLinesCheckedData: (values: boolean) => void
    formik: FormikContextType<any>
    setFormikValues: (
        poIndex: number,
        poId: string,
        newLines: IPoLineItem[],
    ) => void
    removeFormikAllLines: (poIndex: number) => void
}
