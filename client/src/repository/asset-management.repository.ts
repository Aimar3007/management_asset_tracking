import { post } from 'common/common.service'
import {
    IAssetManagement,
    IAssetManagementPayload,
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
        const err = error as IResponseData<IAssetManagementPayload[]>
        err.isSuccess = false
        return err
    }
}
