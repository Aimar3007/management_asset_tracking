import { fetch, post } from 'common/common.service'
import {
    IAssetManagement,
    IAssetManagementPayload,
    IDAMFilter,
} from './interface/asset-management-data.interface'
import { IResponseData } from 'common/common.interface'
import { endpoints } from 'common/common.static'

export const getAssetsData = async (payload: IAssetManagementPayload) => {
    try {
        const response = await post<
            IResponseData<IAssetManagement[]>,
            IAssetManagementPayload
        >({
            endpoint: endpoints.asset_management_getAll,
            payload,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IAssetManagement[]>
        err.isSuccess = false
        return err
    }
}

export const getDAMfilter = async () => {
    try {
        const response = await fetch<IResponseData<IDAMFilter>, null>({
            endpoint: endpoints.AM_getDropdown,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IDAMFilter[]>
        err.isSuccess = false
        return err
    }
}

export const getADData = async (id: string) => {
    try {
        const response = await fetch<IResponseData<IAssetManagement>, string>({
            endpoint: `${endpoints.AM_getDetail}${id}`,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IAssetManagement>
        err.isSuccess = false
        return err
    }
}
