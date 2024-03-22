import { IRoleModule } from 'repository/interface/role-module.interface'
import * as YUP from 'yup'
import { requiredMessage } from './validation-message.static'

export interface IFRoleModule {
    roleType: string
    moduleAccessList: IRoleModule[]
}

export const updateRoleModuleValidation = YUP.object().shape({
    roleType: YUP.string().required(requiredMessage('role')),
} as Record<keyof IFRoleModule, any>)

// form user initial data
export const updateRoleInitial: IFRoleModule = {
    roleType: '',
    moduleAccessList: [],
}
