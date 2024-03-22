import { IResponseData } from 'common/common.interface'
import { fetch } from 'common/common.service'
import { endpoints } from 'common/common.static'
import { IRole } from './data/role.interface'
import { IRoleModule } from './data/role-module.interface'

export const getRole = async () => {
    try {
        let response = await fetch<IResponseData<IRole[]>, any>({
            endpoint: endpoints.role_getAll,
        })

        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IRole[]>
        err.isSuccess = false
        return err
    }
}

export const getRoleModule = async (roleId: string) => {
    try {
        const response = await fetch<IResponseData<IRoleModule[]>, any>({
            endpoint: endpoints.role_getAllModule + roleId,
        })
        return response
    } catch (error: any) {
        console.error(error)
        const err = error as IResponseData<IRoleModule[]>
        err.isSuccess = false
        return err
    }
}
