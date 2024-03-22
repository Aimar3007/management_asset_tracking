import { IResponseData } from 'common/common.interface'
import { fetch } from 'common/common.service'
import { endpoints } from 'common/common.static'

export const getCountry = async () => {
    try {
        const response = await fetch<any, any>({
            endpoint: endpoints.country,
        })
        return response
    } catch (error: any) {
        const err = error as IResponseData<any>
        err.isSuccess = false
        return err
    }
}

export const getOrganization = async () => {
    try {
        const response = await fetch<any, any>({
            endpoint: endpoints.organization,
        })
        return response
    } catch (error: any) {
        const err = error as IResponseData<any>
        err.isSuccess = false
        return err
    }
}
