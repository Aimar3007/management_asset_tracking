import { IResponseData } from 'common/common.interface'
import { endpoints } from 'common/common.static'
import { post } from 'common/common.service'
import { Toast } from 'components/toast/toast.component'

export const attachPoRepository = async (
    shipmentNo: string,
    payload: string[],
) => {
    try {
        const response = await post<IResponseData<any>, string[]>({
            endpoint: `${endpoints.attach_po}/${shipmentNo}`,
            payload,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const msg = error?.message ?? 'Failed update PO to database'
        Toast({ header: 'Error', message: msg, type: 'error' })
        throw error
    }
}

export const attachPoLineRepository = async (
    shipmentNo: string,
    payload: { poLineId: string; qty: string }[],
) => {
    try {
        const response = await post<IResponseData<any>, string[]>({
            endpoint: `${endpoints.attach_po}/${shipmentNo}/Line`,
            payload,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const msg = error?.message ?? 'Failed attach PO Lines'
        Toast({ header: 'Error', message: msg, type: 'error' })
        throw error
    }
}
