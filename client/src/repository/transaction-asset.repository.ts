import { IResponseData } from 'common/common.interface'
import {
    ICrateTransactionAssetpayload,
    IDTAFilter,
    IGetTransactionAssetPayload,
    ITransactionAsset,
    IUpdateTransactionAssetPayload,
} from './interface/transaction-asset.interface'
import { fetch, post, put } from 'common/common.service'
import { endpoints } from 'common/common.static'

export const getTransactionAsset = async (
    payload: IGetTransactionAssetPayload,
) => {
    try {
        const response = await post<
            IResponseData<ITransactionAsset[]>,
            IGetTransactionAssetPayload
        >({
            endpoint: endpoints.TA_getAll,
            payload,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<ITransactionAsset[]>
        err.isSuccess = false
        return err
    }
}

export const createTransactionAsset = async (
    payload: ICrateTransactionAssetpayload,
) => {
    try {
        const response = await post<
            IResponseData<any>,
            ICrateTransactionAssetpayload
        >({
            endpoint: endpoints.TA_createTA,
            payload,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<any>
        err.isSuccess = false
        return err
    }
}

export const updateTransactionAsset = async (
    payload: IUpdateTransactionAssetPayload,
) => {
    try {
        const response = await put<
            IResponseData<ITransactionAsset>,
            IUpdateTransactionAssetPayload
        >({
            endpoint: endpoints.TA_getAll,
            payload,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<ITransactionAsset>
        err.isSuccess = false
        return err
    }
}

export const getTAfilter = async () => {
    try {
        const response = await fetch<IResponseData<IDTAFilter>, null>({
            endpoint: endpoints.TA_getDropdown,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IDTAFilter>
        err.isSuccess = false
        return err
    }
}