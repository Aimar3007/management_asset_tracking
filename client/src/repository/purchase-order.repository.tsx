import { IResponseData } from 'common/common.interface'
import { endpoints } from 'common/common.static'
import {
    IPurchaseOrder,
    IPurchaseOrderDetailPayload,
    IPurchaseOrderFilterParams,
    IPurchaseOrderFilterBody,
    IPurchaseOrderStatusPayload,
    IPoFilterDropdownOptions,
} from 'pages/purchase-order/purchase-order.interface'
import { fetch, post, put } from 'common/common.service'
import {
    IHistories,
    IPODetail,
} from 'pages/purchase-order/purchase-order-detail/purchase-order-detail.interface'
import { AxiosError } from 'axios'
import { SetStateAction } from 'react'
import {
    IContactSupplierSchema,
    IGoodsFromSchema,
} from 'form-validation/po-detail.validation'
import { Toast } from 'components/toast/toast.component'

export const getPoData = async (
    filter: IPurchaseOrderFilterParams,
    payload?: IPurchaseOrderFilterBody,
) => {
    try {
        const response = await post<
            IResponseData<IPurchaseOrder[]> | SetStateAction<any>,
            IPurchaseOrderFilterParams
        >({
            endpoint: endpoints.po_getAll,
            params: filter,
            payload,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IPurchaseOrder[]>
        err.isSuccess = false
        return err
    }
}

export const bulkUpdatePoStatus = async (payload: string[]) => {
    try {
        const response = await put<
            IResponseData<IPurchaseOrder[]>,
            IPurchaseOrderFilterParams
        >({
            endpoint: endpoints.po_bulkUpdateToOpen,
            payload,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IPurchaseOrder[]>
        err.isSuccess = false
        return err
    }
}

export const getPoFilterDropdownData = async () => {
    try {
        const response = await fetch<
            IResponseData<IPoFilterDropdownOptions>,
            null
        >({
            endpoint: endpoints.po_getFilterDropdownData,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IPoFilterDropdownOptions>
        err.isSuccess = false
        return err
    }
}

export const changePoStatus = async (
    poId: string,
    status: string,
    payload: { reason: string },
) => {
    try {
        const response = await put<
            IResponseData<IPurchaseOrder>,
            IPurchaseOrder
        >({
            endpoint: `${endpoints.po_getDetail + poId}/Status/${status}`,
            payload,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IPurchaseOrder>
        err.isSuccess = false
        return err
    }
}

export const getPoDetailData = async (props: IPurchaseOrderDetailPayload) => {
    const url: string = `${endpoints.po_getDetail}/${props.uuid}`
    const urlSyncPo: string = `${endpoints.po_sync}` //temporary

    try {
        //sync po temporary
        await fetch<IResponseData<any>, any>({
            endpoint: urlSyncPo,
        })

        const response = await fetch<
            IResponseData<IPODetail>,
            IPurchaseOrderDetailPayload
        >({
            endpoint: url,
        })

        return response
    } catch (e) {
        throw new AxiosError('No Data Found')
    }
}
export const getHistory = async (props: IPurchaseOrderDetailPayload) => {
    const url: string = `${endpoints.po_getDetail}/${props.uuid}/Histories`
    try {
        const response = await fetch<
            IResponseData<IHistories[]>,
            IPurchaseOrderDetailPayload
        >({
            endpoint: url,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IHistories[]>
        err.isSuccess = false
        return err
    }
}

export const setStatus = async (props: IPurchaseOrderStatusPayload) => {
    const url: string = `${endpoints.po_getDetail}/${props.id}/Status/${props.status}`
    try {
        const response = await put<
            IResponseData<any>,
            IPurchaseOrderStatusPayload
        >({
            endpoint: url,
            payload: props,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IPurchaseOrder[]>
        err.isSuccess = false
        return err
    }
}

export const getPoLineItems = async (
    filter: IPurchaseOrderFilterParams,
    id: string,
) => {
    try {
        const response = await fetch<
            IResponseData<any>,
            IPurchaseOrderFilterParams
        >({
            endpoint: `${endpoints.po_getDetail}/${id}/Lines`,
            params: filter,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IPurchaseOrder>
        err.isSuccess = false
        return err
    }
}

export const updateSupplierContact = async (
    id: string,
    props: IContactSupplierSchema,
) => {
    const url: string = `${endpoints.po_getDetail}/${id}/ContactInfo`
    try {
        await put<IResponseData<any>, string>({
            endpoint: url,
            payload: props.contactSupplier,
        })

        Toast({
            header: 'Success',
            message: 'Success update contact supplier',
            type: 'success',
        })
    } catch (error: any) {
        console.error(error)
        Toast({
            header: 'Failed!',
            message: 'Failed Update Contact Supplier',
            type: 'error',
        })
    }
}

export const updateGoodsFrom = async (props: IGoodsFromSchema) => {
    try {
        const url: string = `${endpoints.po_lineGoods}`
        await put<IResponseData<any>, string>({
            endpoint: url,
            payload: props.data,
        })
        Toast({
            header: 'Success',
            message: 'Success update po lines',
            type: 'success',
        })
    } catch (error: any) {
        Toast({
            header: 'Failed!',
            message: 'Failed Update po lines',
            type: 'error',
        })
    }
}
